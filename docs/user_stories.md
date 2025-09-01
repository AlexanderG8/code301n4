# Historias de Usuario y Criterios de Aceptación

## 1. Endpoint de Métricas (/metrics)

### Historia de Usuario

Como administrador del sistema, quiero tener acceso a un endpoint de métricas para poder monitorear estadísticas importantes sobre las películas en la base de datos.

### Criterios de Aceptación

1. Debe existir un endpoint GET `/metrics` que devuelva estadísticas sobre las películas.
2. Las métricas deben incluir:
   - Número total de películas
   - Promedio de calificación IMDB
   - Película con mayor calificación
   - Película con menor calificación
   - Distribución de películas por década
   - Distribución de películas por género
3. La respuesta debe estar en formato JSON.
4. El endpoint debe estar documentado en Swagger.
5. El tiempo de respuesta debe ser menor a 500ms.

### Implementación Técnica

Se creará un nuevo método en el servicio de películas para calcular las métricas requeridas. Este método procesará los datos de todas las películas para generar estadísticas agregadas. Se implementará un nuevo endpoint en el controlador que utilizará este servicio para devolver las métricas en formato JSON.

## 2. Búsqueda de Películas por Rango de Año

### Historia de Usuario

Como usuario de la API, quiero poder buscar películas dentro de un rango específico de años para encontrar películas lanzadas en un período determinado.

### Criterios de Aceptación

1. Debe existir un endpoint GET `/peliculas/buscar/anios` que acepte dos parámetros de consulta: `fromYear` y `toYear`.
2. Ambos parámetros deben ser opcionales:
   - Si solo se proporciona `fromYear`, se deben devolver todas las películas desde ese año hasta el presente.
   - Si solo se proporciona `toYear`, se deben devolver todas las películas hasta ese año.
   - Si se proporcionan ambos, se deben devolver las películas dentro del rango inclusivo.
3. Los años deben ser números enteros válidos.
4. La respuesta debe ser una lista de películas en formato JSON.
5. Si no hay películas en el rango especificado, se debe devolver un array vacío.
6. El endpoint debe estar documentado en Swagger.

### Implementación Técnica

Se implementará un nuevo método en el servicio de películas que filtrará las películas según el rango de años proporcionado. Se creará un nuevo endpoint en el controlador que utilizará este servicio para procesar los parámetros de consulta y devolver los resultados filtrados.

## 3. Búsqueda de Películas por Duración Mínima

### Historia de Usuario

Como usuario de la API, quiero poder filtrar películas por una duración mínima en minutos para encontrar películas que se ajusten a mi disponibilidad de tiempo.

### Criterios de Aceptación

1. Debe existir un endpoint GET `/peliculas/buscar/duracion` que acepte un parámetro de consulta `minDuration`.
2. El parámetro `minDuration` debe ser un número entero que represente la duración mínima en minutos.
3. El endpoint debe devolver todas las películas cuya duración sea mayor o igual al valor especificado.
4. La respuesta debe ser una lista de películas en formato JSON.
5. Si no hay películas que cumplan con el criterio, se debe devolver un array vacío.
6. El endpoint debe estar documentado en Swagger.

### Implementación Técnica

Se implementará un nuevo método en el servicio de películas que filtrará las películas según la duración mínima especificada. Se creará un nuevo endpoint en el controlador que utilizará este servicio para procesar el parámetro de consulta y devolver los resultados filtrados.