**Recursos identificados:**
- Usuarios (users)
- Partidas (games)
- Jugadores de partida (players)
- Barcos (ships)
- Disparos (shots)

| Método Http | Endpoint                                          | Query Params | Cuerpo JSON de la petición                                             | Respuesta JSON de la petición                                                                          | Códigos HTTP de respuesta posibles          |
|-------------|---------------------------------------------------|--------------|------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------|---------------------------------------------|
| POST        | /users                                            |              | `{ "name": "Pedro" }`                                                  | `{ "id": 1, "name": "Pedro" }`                                                                         | 201 Created, 400 Bad Request                |
| GET         | /users/{userId}                                   |              |                                                                        | `{ "id": 1, "name": "Pedro" }`                                                                         | 200 OK, 404 Not Found                       |
| DELETE      | /users/{userId}                                   |              |                                                                        | `{ "message": "User deleted successfully" }`                                                           | 200 OK, 404 Not Found                       |
| POST        | /games                                            |              | `{ "players": [1, 2] }`                                                | `{ "id": 10, "players": [1, 2], "status": "created" }`                                                 | 201 Created, 400 Bad Request                |
| PATCH       | /games/{gameId}                                   |              | `{ "status": "started" }`                                              | `{ "id": 10, "players": [1, 2], "status": "started" }`                                                 | 200 OK, 400 Bad Request, 404 Not Found      |
| DELETE      | /games/{gameId}                                   |              |                                                                        | `{ "message": "Game deleted successfully" }`                                                           | 200 OK, 404 Not Found                       |
| GET         | /games/{gameId}                                   |              |                                                                        | `{ "id": 10, "players": [1, 2], "status": "started", "winner": null, "ships": {...}, "shots": {...} }` | 200 OK, 404 Not Found                       |
| POST        | /games/{gameId}/players/{playerId}/ships          |              | `{ "type": "destroyer", "positions": [ [0,0], [0,1], [0,2], [0,3] ] }` | `{ "id": 100, "type": "destroyer", "positions": [ [0,0], [0,1], [0,2], [0,3] ] }`                      | 201 Created, 400 Bad Request, 404 Not Found |
| DELETE      | /games/{gameId}/players/{playerId}/ships/{shipId} |              |                                                                        | `{ "message": "Ship deleted successfully" }`                                                           | 200 OK, 404 Not Found                       |
| GET         | /games/{gameId}/players/{playerId}/ships          |              |                                                                        | `[ { "id": 100, "type": "destroyer", "positions": [ [0,0], [0,1], [0,2], [0,3] ] } ]`                  | 200 OK, 404 Not Found                       |
| POST        | /games/{gameId}/shots                             |              | `{ "from": 1, "to": 2, "position": [5,7] }`                            | `{ "id": 200, "from": 1, "to": 2, "position": [5,7], "result": "hit" }`                                | 201 Created, 400 Bad Request, 404 Not Found |

Consideraciones:
- Los barcos se añaden y eliminan por jugador y partida.
- Los disparos se registran por partida, indicando origen, destino y posición. Como sub-recursos que son, no es lógico que a nivel API puedan recuperarse a un nivel superior.
- La consulta de partida devuelve todos los datos relevantes (jugadores, barcos, disparos, ganador).
- Los endpoints PATCH permiten modificaciones parciales (estado de partida, finalizar partida). Imagina que el juego tuviese 50 estados intermedios, como "esperando jugadores", "jugando", "finalizado", etc. Sería muy complicado crear un endpoint para cada uno de esos estados, por lo que se opta por un endpoint genérico que permita modificar el estado de la partida. Recuerda que al ser PATCH un método de modificación parcial, no es necesario enviar todos los datos de la partida, sino solo aquellos que se desean modificar.
