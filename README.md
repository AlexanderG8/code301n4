# API de Películas

Este proyecto es una API RESTful para gestionar una colección de películas, desarrollada con Node.js y Express. Proporciona endpoints para crear, leer, actualizar y eliminar películas, así como búsquedas por diferentes criterios.

## Estructura del Proyecto

El proyecto sigue una arquitectura modular y organizada para facilitar el mantenimiento y la escalabilidad:

```
├── .env.example          # Plantilla para variables de entorno
├── .gitignore            # Archivos y carpetas ignorados por git
├── README.md             # Documentación del proyecto
├── app.js                # Punto de entrada de la aplicación
├── controllers/          # Controladores de la aplicación
│   └── moviesController.js  # Controlador para las operaciones de películas
├── data/                 # Datos de la aplicación
│   └── movies.json       # Base de datos JSON de películas
├── middlewares/          # Middlewares personalizados
│   ├── errorHandler.js   # Manejo centralizado de errores
│   ├── logger.js         # Registro de solicitudes
│   └── resHandler.js     # Formato estándar de respuestas
├── package.json          # Dependencias y scripts
├── routes/               # Definición de rutas
│   └── peliculas.routes.js  # Rutas para la API de películas
├── services/             # Servicios de la aplicación
│   └── movieService.js   # Servicio para operaciones con películas
└── swagger/              # Documentación de la API
    └── swagger.js        # Configuración de Swagger
```

### Beneficios de esta estructura

- **Separación de responsabilidades**: Cada componente tiene una función específica.
- **Mantenibilidad**: Facilita la localización y corrección de errores.
- **Escalabilidad**: Permite agregar nuevas funcionalidades sin afectar las existentes.
- **Testabilidad**: Facilita la escritura de pruebas unitarias e integración.

## Variables de Entorno

El proyecto utiliza variables de entorno para la configuración. Crea un archivo `.env` basado en `.env.example` con los siguientes valores:

```
# Puerto del servidor
PORT=3000
# Entorno de ejecución
NODE_ENV=development
# Ruta de los datos
DATA_PATH=./data/movies.json
# Configuración de CORS
CORS_ORIGIN=*
```

## Instalación

1. Clona el repositorio:

```bash
git clone <url-del-repositorio>
cd code301n4
```

2. Instala las dependencias:

```bash
npm install
```

3. Crea el archivo `.env` basado en `.env.example`.

4. Inicia el servidor en modo desarrollo:

```bash
npm run dev
```

## Dependencias Principales

- **express**: Framework web para Node.js
- **cors**: Middleware para habilitar CORS
- **dotenv**: Carga variables de entorno desde archivo .env
- **swagger-jsdoc** y **swagger-ui-express**: Generación de documentación API
- **nodemon** (dev): Reinicio automático del servidor durante desarrollo

## Características

### Middlewares

- **Logger**: Registra todas las solicitudes HTTP con timestamp, método y URL.
- **Error Handler**: Manejo centralizado de errores con respuestas consistentes.
- **Response Handler**: Formato estándar para respuestas exitosas con `{ok: true, ...data}`.

### Servicios

El proyecto implementa el patrón de servicios para la lógica de negocio:

- **MovieService**: Gestiona todas las operaciones relacionadas con películas:
  - Obtener todas las películas
  - Buscar película por ID
  - Crear nueva película
  - Actualizar película existente
  - Eliminar película
  - Filtrar películas por rating
  - Buscar películas por año
  - Buscar películas por título y año

### Controladores

Los controladores manejan las solicitudes HTTP y utilizan los servicios para ejecutar la lógica de negocio:

- **moviesController**: Implementa todos los métodos necesarios para la API de películas.

### Rutas

Las rutas definen los endpoints disponibles en la API:

- `GET /peliculas`: Obtiene todas las películas
- `GET /peliculas/top`: Películas con rating mayor a 9
- `GET /peliculas/low`: Películas con rating menor a 5
- `GET /peliculas/buscar/:id`: Busca película por ID
- `GET /peliculas/buscar/anio/:year`: Busca películas por año
- `POST /peliculas/crear`: Crea una nueva película
- `PUT /peliculas/actualizar/:id`: Actualiza una película existente
- `DELETE /peliculas/eliminar/:id`: Elimina una película
- `GET /peliculas/buscarNombreAnio/nombre/:nombre/anio/:anio`: Busca películas por nombre y año

## Documentación de la API

El proyecto incluye documentación interactiva de la API utilizando Swagger:

- Accede a la documentación en: `http://localhost:3000/api-docs`
- La documentación incluye todos los endpoints disponibles, parámetros requeridos, esquemas de datos y ejemplos de respuestas.
- Puedes probar los endpoints directamente desde la interfaz de Swagger.

## Modelo de Datos

El modelo principal es `Película` con los siguientes campos:

```json
{
  "id": "string",
  "title": "string",
  "year": "number",
  "genre": "string",
  "director": "string",
  "actors": "string",
  "plot": "string",
  "imdb_rating": "number",
  "runtime_minutes": "number"
}
```

## Ejecución

- **Desarrollo**: `npm run dev` (con nodemon para reinicio automático)
- **Producción**: `npm start`

## Ejemplos de Uso

### Obtener todas las películas

```bash
curl -X GET http://localhost:3000/peliculas
```

Respuesta:

```json
{
  "ok": true,
  "0": [
    {
      "id": "tt0111161",
      "title": "The Shawshank Redemption",
      "year": 1994,
      "genre": "Drama",
      "director": "Frank Darabont",
      "actors": "Tim Robbins, Morgan Freeman, Bob Gunton",
      "plot": "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
      "imdb_rating": 9.3,
      "runtime_minutes": 142
    },
    // ... más películas
  ]
}
```

### Crear una nueva película

```bash
curl -X POST http://localhost:3000/peliculas/crear \
  -H "Content-Type: application/json" \
  -d '{
    "id": "tt9999999",
    "title": "Nueva Película",
    "year": 2023,
    "genre": "Sci-Fi",
    "director": "Director Ejemplo",
    "actors": "Actor 1, Actor 2",
    "plot": "Descripción de la película",
    "imdb_rating": 8.5,
    "runtime_minutes": 120
  }'
```

Respuesta:

```json
{
  "ok": true,
  "msg": "Película creada correctamente",
  "pelicula": {
    "id": "tt9999999",
    "title": "Nueva Película",
    "year": 2023,
    "genre": "Sci-Fi",
    "director": "Director Ejemplo",
    "actors": "Actor 1, Actor 2",
    "plot": "Descripción de la película",
    "imdb_rating": 8.5,
    "runtime_minutes": 120
  }
}
```

## Manejo de Errores

La API utiliza un sistema centralizado de manejo de errores que proporciona respuestas consistentes:

```json
{
  "error": "Mensaje descriptivo del error"
}
```

Códigos de estado HTTP utilizados:

- **200**: Operación exitosa
- **201**: Recurso creado exitosamente
- **400**: Solicitud incorrecta (datos inválidos)
- **404**: Recurso no encontrado
- **500**: Error interno del servidor

## Seguridad y Buenas Prácticas

- Las variables sensibles se gestionan mediante variables de entorno
- El archivo `.env` está incluido en `.gitignore` para evitar exponer información sensible
- Se implementa CORS para controlar el acceso desde diferentes orígenes
- Se utiliza un formato de respuesta estandarizado para facilitar el consumo de la API

## Contribución

1. Haz un fork del repositorio
2. Crea una rama para tu feature: `git checkout -b feature/nueva-funcionalidad`
3. Haz commit de tus cambios: `git commit -m 'Añade nueva funcionalidad'`
4. Haz push a la rama: `git push origin feature/nueva-funcionalidad`
5. Abre un Pull Request