**Recursos identificados:**
- Espacios (spaces): espacio de trabajo individual, sala de reuniones, auditorio.
- Reservas (bookings)
- Eventos (events)
- Usuarios (users)

| Método Http | Endpoint                             | Query Params         | Cuerpo JSON de la petición                                       | Respuesta JSON de la petición                                                                       | Códigos HTTP de respuesta posibles          |
|-------------|--------------------------------------|----------------------|------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------|---------------------------------------------|
| GET         | /spaces                              | location, date, type |                                                                  | `[ { "id": 1, "type": "auditorio", "location": "Madrid", "capacity": 100 } ]`                       | 200 OK, 400 Bad Request                     |
| POST        | /spaces                              |                      | `{ "type": "sala", "location": "Madrid", "capacity": 10 }`       | `{ "id": 2, "type": "sala", "location": "Madrid", "capacity": 10 }`                                 | 201 Created, 400 Bad Request                |
| PATCH       | /spaces/{spaceId}                    |                      | `{ "capacity": 12 }`                                             | `{ "id": 2, "type": "sala", "location": "Madrid", "capacity": 12 }`                                 | 200 OK, 400 Bad Request, 404 Not Found      |
| DELETE      | /spaces/{spaceId}                    |                      |                                                                  | `{ "message": "Space deleted successfully" }`                                                       | 200 OK, 404 Not Found                       |
| POST        | /users/{userId}/bookings             |                      | `{ "space_id": 2, "date": "2025-08-10", "hours": 2 }`            | `{ "id": 10, "user_id": 1, "space_id": 2, "date": "2025-08-10", "hours": 2, "status": "reserved" }` | 201 Created, 400 Bad Request, 404 Not Found |
| PATCH       | /users/{userId}/bookings/{bookingId} |                      | `{ "hours": 3 }`                                                 | `{ "id": 10, "user_id": 1, "space_id": 2, "date": "2025-08-10", "hours": 3, "status": "reserved" }` | 200 OK, 400 Bad Request, 404 Not Found      |
| DELETE      | /users/{userId}/bookings/{bookingId} |                      |                                                                  | `{ "message": "Booking cancelled successfully" }`                                                   | 200 OK, 404 Not Found                       |
| POST        | /events                              |                      | `{ "name": "Tech Meetup", "space_id": 1, "date": "2025-08-20" }` | `{ "id": 100, "name": "Tech Meetup", "space_id": 1, "date": "2025-08-20" }`                         | 201 Created, 400 Bad Request, 404 Not Found |
| PATCH       | /events/{eventId}                    |                      | `{ "name": "Tech Meetup 2.0" }`                                  | `{ "id": 100, "name": "Tech Meetup 2.0", "space_id": 1, "date": "2025-08-20" }`                     | 200 OK, 400 Bad Request, 404 Not Found      |
| DELETE      | /events/{eventId}                    |                      |                                                                  | `{ "message": "Event deleted successfully" }`                                                       | 200 OK, 404 Not Found                       |

Consideraciones:
- Los eventos solo pueden crearse si el espacio asociado es un auditorio. Pero esta comprobación se realiza en el backend, no es necesario incluirla en la API.
