**Recursos identificados:**
- Películas (movies)
- Salas (rooms)
- Usuarios (users)
- Reservas (bookings)
- Pagos (payments)

| Método Http | Endpoint                                      | Query Params | Cuerpo JSON de la petición                                  | Respuesta JSON de la petición                                                              | Códigos HTTP de respuesta posibles          |
|-------------|-----------------------------------------------|--------------|-------------------------------------------------------------|--------------------------------------------------------------------------------------------|---------------------------------------------|
| POST        | /movies                                       |              | `{ "title": "Matrix", "duration": 120, "genre": "Sci-Fi" }` | `{ "id": 1, "title": "Matrix", "duration": 120, "genre": "Sci-Fi" }`                       | 201 Created, 400 Bad Request                |
| PATCH       | /movies/{movieId}                             |              | `{ "title": "Matrix Reloaded" }`                            | `{ "id": 1, "title": "Matrix Reloaded", "duration": 120, "genre": "Sci-Fi" }`              | 200 OK, 400 Bad Request, 404 Not Found      |
| DELETE      | /movies/{movieId}                             |              |                                                             | `{ "message": "Movie deleted successfully" }`                                              | 200 OK, 404 Not Found                       |
| POST        | /rooms                                        |              | `{ "name": "Sala 1", "capacity": 100 }`                     | `{ "id": 1, "name": "Sala 1", "capacity": 100 }`                                           | 201 Created, 400 Bad Request                |
| PATCH       | /rooms/{roomId}                               |              | `{ "capacity": 120 }`                                       | `{ "id": 1, "name": "Sala 1", "capacity": 120 }`                                           | 200 OK, 400 Bad Request, 404 Not Found      |
| DELETE      | /rooms/{roomId}                               |              |                                                             | `{ "message": "Room deleted successfully" }`                                               | 200 OK, 404 Not Found                       |
| POST        | /users                                        |              | `{ "name": "Ana", "email": "ana@email.com" }`               | `{ "id": 1, "name": "Ana", "email": "ana@email.com" }`                                     | 201 Created, 400 Bad Request                |
| PATCH       | /users/{userId}                               |              | `{ "email": "ana.nueva@email.com" }`                        | `{ "id": 1, "name": "Ana", "email": "ana.nueva@email.com" }`                               | 200 OK, 400 Bad Request, 404 Not Found      |
| DELETE      | /users/{userId}                               |              |                                                             | `{ "message": "User deleted successfully" }`                                               | 200 OK, 404 Not Found                       |
| POST        | /users/{userId}/bookings                      |              | `{ "room_id": 1, "movie_id": 1, "seats": 2 }`               | `{ "id": 1, "user_id": 1, "room_id": 1, "movie_id": 1, "seats": 2, "status": "reserved" }` | 201 Created, 400 Bad Request, 404 Not Found |
| PATCH       | /users/{userId}/bookings/{bookingId}          |              | `{ "seats": 3 }`                                            | `{ "id": 1, "user_id": 1, "room_id": 1, "movie_id": 1, "seats": 3, "status": "reserved" }` | 200 OK, 400 Bad Request, 404 Not Found      |
| DELETE      | /users/{userId}/bookings/{bookingId}          |              |                                                             | `{ "message": "Booking cancelled successfully" }`                                          | 200 OK, 404 Not Found                       |
| POST        | /users/{userId}/bookings/{bookingId}/payments |              | `{ "amount": 15.00, "method": "card" }`                     | `{ "id": 1, "booking_id": 1, "amount": 15.00, "method": "card", "status": "paid" }`        | 201 Created, 400 Bad Request, 404 Not Found |

Consideraciones:
- Los endpoints PATCH permiten modificaciones parciales. Nunca uses PUT para actualizaciones parciales.
- Las reservas y pagos están asociadas a usuarios, salas y películas mediante sus IDs.
