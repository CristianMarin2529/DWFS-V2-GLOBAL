## Diseño de API REST: Gestion de una biblioteca

En este ejercicio vamos a diseñar la API REST de una biblioteca online. Concretamente nos centraremos en operaciones que los trabajadores de la biblioteca estarán realizando.

Las operaciones que la API debe soportar son las siguientes:
- Obtener un listado de todos los libros de la biblioteca.
- Filtrar los libros por título y autor.
- Registrar un nuevo préstamo 
- Dar de baja un préstamo.
- Obtener un listado de todos los préstamos de un usuario.
- Modificar título, autor o año de un libro.
- Generar un reporte de los libros prestados a un usuario. Este reporte quedará almacenado en el sistema y podrá ser consultado posteriormente.

Para solucionar este ejercicio, se recomienda seguir los siguientes pasos:
1. **Identificar los recursos principales**: Analiza el enunciado y determina sobre qué recursos tiene sentido ejecutar operaciones.
2. **Definir los endpoints**: Crea una lista de endpoints que representen las operaciones que se pueden realizar sobre los recursos identificados. Para cada endpoint, indica el método HTTP que se utilizará y los parámetros necesarios (path params) u opcionales (query params), así como el cuerpo de la petición y la respuesta esperada.

Si lo deseas, puedes utilizar el siguiente formato para tu solución:

(Los path params, al ser obligatorios, se pueden incluir directamente en el endpoint, mientras que los query params se pueden indicar como opcionales)

| Método Http | Endpoint  | Query Params | Cuerpo JSON de la petición | Respuesta JSON de la petición | Códigos HTTP de respuesta posibles |
|-------------|-----------|--------------|----------------------------|-------------------------------|------------------------------------|
| Método      | /endpoint | nombreParam1 | `{ }`                      | `{ }`                         | 201 Created <br/>400 Bad Request   |
