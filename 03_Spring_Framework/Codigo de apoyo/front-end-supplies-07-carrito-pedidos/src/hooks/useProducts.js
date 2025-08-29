import { useState, useEffect } from "react";
import { mockProducts } from "../utils/mockData";

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError("");
      try {
        // Simular petición HTTP que siempre falla
        const response = await fetch('http://localhost:8080/api/v1/supplies');

        if (!response.ok) {
          throw new Error('Error al cargar productos del servidor');
        }

        const data = await response.json();
        setProducts(data.supplies);
        setLoading(false);
      } catch (err) {
        console.log("Error en petición HTTP:", err.message);
        console.log("Cargando datos de respaldo...");

        // Cargar datos de respaldo con un pequeño delay para simular carga
        setTimeout(() => {
          setProducts(mockProducts);
          setError("Datos cargados desde caché local");
          setLoading(false);
        }, 1000);
      }
    };
    fetchProducts();
  }, []); // Se ejecuta en cada montaje del componente
  return {products, loading, error};
}
