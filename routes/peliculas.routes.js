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


// Creo mi instancia del router
export const api = Router();

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
 * /peliculas/buscar/{id}:
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
api.get("/peliculas/buscar/:id", moviesController.getMovieById);

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
api.get("/peliculas/buscarNombreAnio/nombre/:nombre/anio/:anio", (req, res) => {
  // Adaptamos la ruta para usar el método getMoviesByTitleAndYear
  req.query = {
    title: req.params.nombre,
    year: req.params.anio
  };
  moviesController.getMoviesByTitleAndYear(req, res);
});


