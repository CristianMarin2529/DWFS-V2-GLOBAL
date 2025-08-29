import React from "react";
import "./Menu.css";

export default function MenuPropsDestructuring({backgroundColor}) {

    const menuBackgroundColor = backgroundColor || "";

    return (
        <nav className={`menu ${menuBackgroundColor}`}>
            <ul className="menu-list">
                <li><a href="#">Inicio</a></li>
                <li><a href="#">Suministros</a></li>
                <li><a href="#">Tiendas</a></li>
                <li><a href="#">Contacto</a></li>
            </ul>
        </nav>
    );
}