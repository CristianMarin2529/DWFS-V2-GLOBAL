import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductsFilter.css';

export default function ProductsFilter({ filters, onFiltersChange, aggregations = [], products = [] }) {
    const [localFilters, setLocalFilters] = useState(filters);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const nameInputRef = useRef(null);
    const suggestionsRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        setLocalFilters(filters);
    }, [filters]);

    // Verificar si hay filtros aplicados
    const hasActiveFilters = localFilters.name.trim().length > 0 || localFilters.type.length > 0;

    // Función para resaltar texto
    const highlightText = (text, searchTerm) => {
        if (!searchTerm) return text;

        const regex = new RegExp(`(${searchTerm})`, 'gi');
        const parts = text.split(regex);

        return parts.map((part, index) =>
            regex.test(part) ?
                <strong key={index} style={{ color: '#389cd1', fontWeight: 700 }}>{part}</strong> :
                part
        );
    };

    const handleNameChange = (e) => {
        const value = e.target.value;
        const newFilters = { ...localFilters, name: value };
        setLocalFilters(newFilters);

        // Mostrar sugerencias si hay 3+ caracteres
        setShowSuggestions(value.trim().length >= 3);

        // Aplicar filtros para la búsqueda principal
        if (value === '' || value.length >= 3) {
            onFiltersChange(newFilters);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            setShowSuggestions(false);
            onFiltersChange(localFilters);
        }
    };

    const handleSuggestionClick = (productId) => {
        setShowSuggestions(false);
        navigate(`/products/${productId}`);
    };

    const handleSearchClick = (searchTerm) => {
        setShowSuggestions(false);
        const newFilters = { ...localFilters, name: searchTerm };
        setLocalFilters(newFilters);
        onFiltersChange(newFilters);
    };

    const handleTypeClick = (selectedType) => {
        setShowSuggestions(false);
        const newType = localFilters.type === selectedType ? '' : selectedType;
        const newFilters = { ...localFilters, type: newType };
        setLocalFilters(newFilters);
        onFiltersChange(newFilters);
    };

    const clearFilters = () => {
        setShowSuggestions(false);
        const clearedFilters = {
            name: '',
            type: ''
        };
        setLocalFilters(clearedFilters);
        onFiltersChange(clearedFilters);

        if (nameInputRef.current) {
            nameInputRef.current.focus();
        }
    };

    // Cerrar sugerencias al hacer clic fuera
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (suggestionsRef.current && !suggestionsRef.current.contains(event.target) &&
                nameInputRef.current && !nameInputRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="products-filter">
            <div className="search-bar-container">
                <div className="search-bar">
                    <input
                        ref={nameInputRef}
                        type="text"
                        placeholder="Buscar productos... (mínimo 3 caracteres)"
                        value={localFilters.name}
                        onChange={handleNameChange}
                        onKeyDown={handleKeyDown}
                        className="search-input"
                        autoComplete="off"
                    />
                    <div className="search-icon">🔍</div>

                    {/* Sugerencias de búsqueda */}
                    {showSuggestions && localFilters.name.trim().length >= 3 && (
                        <div ref={suggestionsRef} className="suggestions-dropdown">
                            {products.length > 0 && (
                                <>
                                    {products.slice(0, 8).map(product => (
                                        <div
                                            key={product.id}
                                            className="suggestion-item clickable"
                                            onClick={() => handleSuggestionClick(product.id)}
                                        >
                                            <div className="suggestion-icon">📦</div>
                                            <div className="suggestion-text">
                                                {highlightText(product.name, localFilters.name.trim())}
                                            </div>
                                        </div>
                                    ))}
                                </>
                            )}

                            {products.length === 0 && (
                                <div
                                    className="suggestion-item search-fallback clickable"
                                    onClick={() => handleSearchClick(localFilters.name.trim())}
                                >
                                    <div className="suggestion-icon">🔍</div>
                                    <div className="suggestion-text">
                                        Buscar por "<strong>{localFilters.name.trim()}</strong>"
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <div className="filters-container">
                <h3>Filtros de búsqueda</h3>

                <div className="filters-grid">
                    <div className="filter-group">
                        <label>Categorías:</label>
                        <div className="type-buttons-container">
                            {aggregations.map(agg => (
                                <button
                                    key={agg.key}
                                    onClick={() => handleTypeClick(agg.key)}
                                    className={`type-button ${localFilters.type === agg.key ? 'active' : ''}`}
                                    type="button"
                                >
                                    {agg.key} ({agg.count})
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="filter-group">
                        <button
                            onClick={clearFilters}
                            className={`clear-filters-btn ${!hasActiveFilters ? 'disabled' : ''}`}
                            type="button"
                            disabled={!hasActiveFilters}
                        >
                            Limpiar filtros
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
