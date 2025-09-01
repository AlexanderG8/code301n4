/** 
 * Aquí se va a definir las rutas de mi api
*/

import { Router } from "express";
import { moviesController } from "../controllers/moviesController.js";

/**
 * @swagger
 * tags:
 *   name: Películas
 *   description: API para gestionar películas
 */

/**
 * @swagger
 * tags:
 *   name: Métricas
 *   description: API para obtener métricas y estadísticas
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Metricas:
 *       type: object
 *       properties:
 *         totalMovies:
 *           type: integer
 *           description: Total de películas
 *         totalGenres:
 *           type: integer
 *           description: Total de géneros únicos
 *         averageRating:
 *           type: number
 *           format: float
 *           description: Calificación promedio de todas las películas
 *         longestMovie:
 *           $ref: '#/components/schemas/Pelicula'
 *         shortestMovie:
 *           $ref: '#/components/schemas/Pelicula'
 *         newestMovie:
 *           $ref: '#/components/schemas/Pelicula'
 *         oldestMovie:
 *           $ref: '#/components/schemas/Pelicula'
 *       example:
 *         totalMovies: 100
 *         totalGenres: 15
 *         averageRating: 8.2
 *         longestMovie: {}
 *         shortestMovie: {}
 *         newestMovie: {}
 *         oldestMovie: {}
 */

// Creo mi instancia del router
export const api = Router();

/**
 * @swagger
 * /peliculas/metrics:
 *   get:
 *     summary: Obtiene métricas sobre las películas
 *     tags: [Métricas]
 *     responses:
 *       200:
 *         description: Métricas de películas
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Metricas'
 */
api.get("/peliculas/metrics", moviesController.getMovieMetrics);

/**
 * @swagger
 * /peliculas:
 *   get:
 *     summary: Obtiene todas las películas
 *     tags: [Películas]
 *     responses:
 *       200:
 *         description: Lista de películas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pelicula'
 */
api.get("/peliculas", moviesController.getAllMovies);

/**
 * @swagger
 * /peliculas/top:
 *   get:
 *     summary: Obtiene películas con rating mayor a 9
 *     tags: [Películas]
 *     responses:
 *       200:
 *         description: Lista de películas con alto rating
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pelicula'
 */
api.get("/peliculas/top", moviesController.getTopRatedMovies);

/**
 * @swagger
 * /peliculas/low:
 *   get:
 *     summary: Obtiene películas con rating menor a 5
 *     tags: [Películas]
 *     responses:
 *       200:
 *         description: Lista de películas con bajo rating
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pelicula'
 */
api.get("/peliculas/low", moviesController.getLowRatedMovies);

/**
 * @swagger
 * /peliculas/buscar/id/{id}:
 *   get:
 *     summary: Obtiene una película por su ID
 *     tags: [Películas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la película
 *     responses:
 *       200:
 *         description: Película encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pelicula'
 *       404:
 *         description: Película no encontrada
 */
api.get("/peliculas/buscar/id/:id", moviesController.getMovieById);

/**
 * @swagger
 * /peliculas/buscar/anio/{year}:
 *   get:
 *     summary: Obtiene películas por año
 *     tags: [Películas]
 *     parameters:
 *       - in: path
 *         name: year
 *         schema:
 *           type: integer
 *         required: true
 *         description: Año de la película
 *     responses:
 *       200:
 *         description: Películas encontradas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pelicula'
 */
api.get("/peliculas/buscar/anio/:year", moviesController.getMoviesByYear);

/**
 * @swagger
 * /peliculas/crear:
 *   post:
 *     summary: Crea una nueva película
 *     tags: [Películas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Pelicula'
 *     responses:
 *       201:
 *         description: Película creada exitosamente
 *       400:
 *         description: Datos inválidos
 */
api.post("/peliculas/crear", moviesController.createMovie);

/**
 * @swagger
 * /peliculas/actualizar/{id}:
 *   put:
 *     summary: Actualiza una película existente
 *     tags: [Películas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la película
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Pelicula'
 *     responses:
 *       200:
 *         description: Película actualizada exitosamente
 *       404:
 *         description: Película no encontrada
 */
api.put("/peliculas/actualizar/:id", moviesController.updateMovie);

/**
 * @swagger
 * /peliculas/eliminar/{id}:
 *   delete:
 *     summary: Elimina una película
 *     tags: [Películas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la película
 *     responses:
 *       200:
 *         description: Película eliminada exitosamente
 *       404:
 *         description: Película no encontrada
 */
api.delete("/peliculas/eliminar/:id", moviesController.deleteMovie);

/**
 * @swagger
 * /peliculas/buscarNombreAnio/nombre/{nombre}/anio/{anio}:
 *   get:
 *     summary: Busca películas por nombre y año
 *     tags: [Películas]
 *     parameters:
 *       - in: path
 *         name: nombre
 *         schema:
 *           type: string
 *         required: true
 *         description: Nombre de la película
 *       - in: path
 *         name: anio
 *         schema:
 *           type: integer
 *         required: true
 *         description: Año de la película
 *     responses:
 *       200:
 *         description: Películas encontradas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pelicula'
 */
api.get("/peliculas/buscarNombreAnio/nombre/:nombre/anio/:anio",moviesController.getMoviesByTitleAndYear);

/**
 * @swagger
 * /metrics:
 *   get:
 *     summary: Obtiene métricas sobre las películas
 *     tags: [Métricas]
 *     responses:
 *       200:
 *         description: Métricas de películas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total_movies:
 *                   type: integer
 *                   description: Número total de películas
 *                 average_rating:
 *                   type: number
 *                   format: float
 *                   description: Promedio de calificación IMDB
 *                 highest_rated_movie:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: ID de la película
 *                     title:
 *                       type: string
 *                       description: Título de la película
 *                     rating:
 *                       type: number
 *                       format: float
 *                       description: Calificación IMDB
 *                 lowest_rated_movie:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: ID de la película
 *                     title:
 *                       type: string
 *                       description: Título de la película
 *                     rating:
 *                       type: number
 *                       format: float
 *                       description: Calificación IMDB
 *                 movies_by_decade:
 *                   type: object
 *                   additionalProperties:
 *                     type: integer
 *                   description: Distribución de películas por década
 *                 movies_by_genre:
 *                   type: object
 *                   additionalProperties:
 *                     type: integer
 *                   description: Distribución de películas por género
 *       500:
 *         description: Error al obtener métricas
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
api.get("/metrics", moviesController.getMovieMetrics);

/**
 * @swagger
 * /peliculas/buscar/anios:
 *   get:
 *     summary: Busca películas por rango de años
 *     tags: [Películas]
 *     parameters:
 *       - in: query
 *         name: fromYear
 *         schema:
 *           type: integer
 *         required: true
 *         description: Año inicial del rango
 *       - in: query
 *         name: toYear
 *         schema:
 *           type: integer
 *         required: true
 *         description: Año final del rango
 *     responses:
 *       200:
 *         description: Lista de películas dentro del rango de años
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pelicula'
 *       400:
 *         description: Faltan parámetros requeridos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error al buscar películas
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
api.get("/peliculas/buscar/anios", moviesController.getMoviesByYearRange);

/**
 * @swagger
 * /peliculas/buscar/duracion:
 *   get:
 *     summary: Busca películas por duración mínima
 *     tags: [Películas]
 *     parameters:
 *       - in: query
 *         name: minDuration
 *         schema:
 *           type: integer
 *         required: true
 *         description: Duración mínima en minutos
 *     responses:
 *       200:
 *         description: Lista de películas con duración mayor o igual a la especificada
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pelicula'
 *       400:
 *         description: Falta el parámetro requerido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error al buscar películas
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
api.get("/peliculas/buscar/duracion", moviesController.getMoviesByMinDuration);


