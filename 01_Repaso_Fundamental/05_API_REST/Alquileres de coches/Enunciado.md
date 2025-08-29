## Diseño de API REST: Alquileres de coches

En esta ocasión diseñaremos una API REST para gestionar el alquiler de coches. La API estará enfocada en las operaciones que pueden realizar los usuarios finales a través de web o app y no incluirá endpoints para el personal de administración del sistema. Los usuarios podrán registrarse, actualizar su información, eliminar sus cuentas, buscar coches disponibles y gestionar sus propios alquileres de coches. Tu API debe incluir las siguientes funcionalidades:

**Gestión de Usuarios:**

•  **Crear Usuario:** Un endpoint que permita a nuevos usuarios registrarse proporcionando nombre, correo electrónico y contraseña.

•  **Obtener Información de Usuario:** Un endpoint que permita a un usuario obtener su información usando su ID de usuario. Se utilizará para obtener la información del usuario cuando se dirija a su página de perfil.

•  **Actualizar Usuario:** Un endpoint que permita a un usuario actualizar parcialmente su información. Se usará cuando el usuario quiera modificar su nombre, correo electrónico o contraseña.

•  **Eliminar Usuario:** Un endpoint que permita a un usuario eliminar su cuenta. Se usará cuando el usuario quiera borrar sus datos de la aplicación de alquileres.

**Gestión de Alquileres:**

Dado que estamos creando alquileres dentro de la sesión del usuario y desde dicho punto de vista los alquileres siempre estarán ligados a ese usuario, no se diseñará un endpoint donde el propio alquiler sea un recurso de primer nivel.

•  **Crear Alquiler:** Un endpoint que permita a un usuario alquilar un coche proporcionando el ID del coche y la fecha de alquiler.

•  **Listar Alquileres de un Usuario:** Un endpoint que permita a un usuario listar todos sus alquileres.

**Búsqueda de Coches:**

•  **Buscar Coches Disponibles:** Un endpoint que permita a los usuarios buscar coches disponibles utilizando parámetros de consulta como marca, modelo, tipo de combustible, tipo de caja de cambios y número de plazas.

Para solucionar este ejercicio, se recomienda seguir los siguientes pasos:
1. **Identificar los recursos principales**: Analiza el enunciado y determina sobre qué recursos tiene sentido ejecutar operaciones.
2. **Definir los endpoints**: Crea una lista de endpoints que representen las operaciones que se pueden realizar sobre los recursos identificados. Para cada endpoint, indica el método HTTP que se utilizará y los parámetros necesarios (path params) u opcionales (query params), así como el cuerpo de la petición y la respuesta esperada.

Si lo deseas, puedes utilizar el siguiente formato para tu solución:

(Los path params, al ser obligatorios, se pueden incluir directamente en el endpoint, mientras que los query params se pueden indicar como opcionales)

| Método Http | Endpoint  | Query Params | Cuerpo JSON de la petición | Respuesta JSON de la petición | Códigos HTTP de respuesta posibles |
|-------------|-----------|--------------|----------------------------|-------------------------------|------------------------------------|
| Método      | /endpoint | nombreParam1 | `{ }`                      | `{ }`                         | 201 Created <br/>400 Bad Request   |
