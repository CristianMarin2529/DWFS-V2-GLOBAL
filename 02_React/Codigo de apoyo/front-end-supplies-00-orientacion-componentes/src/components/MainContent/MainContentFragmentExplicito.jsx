import React from "react";
import "./MainContent.css";

export default function MainContentFragmentExplicito() {
    return (<React.Fragment>
        <div className="main-content">
            <h1>UNIR Supplies</h1>
            <p>Bienvenido a la plataforma de suministros para tiendas UNIR.</p>
            <p>Selecciona una opción en el menú para comenzar.</p>
        </div>
        <div className="main-content">
            <h1>Información Adicional</h1>
            <p>Esta plataforma te permite gestionar tus suministros de manera eficiente.</p>
            <p>Explora las diferentes secciones para conocer más sobre nuestros servicios.</p>
        </div>
    </React.Fragment>);
}