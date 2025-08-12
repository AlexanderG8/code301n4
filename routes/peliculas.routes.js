/** 
 * Aquí se va a definir las rutas de mi api
*/

import { Router } from "express";
import { traerPeliculas } from "../controllers/traerPeliculas.controller.js";
import { ratingTopPeliculas } from "../controllers/ratinTopPeliculas.controller.js";
import { ratingLowPeliculas } from "../controllers/ratingLowPeliculas.controller.js";
import { buscarPelicula } from '../controllers/buscarPelicula.controller.js';
import { buscarPeliculaAnio } from '../controllers/buscarPeliculaAnio.controller.js';
import { crearPelicula } from '../controllers/crearPelicula.controller.js';
import { actualizarPelicula } from '../controllers/actualizarPelicula.controller.js'
import { eliminarPelicula } from '../controllers/eliminarPelicula.controller.js';

// Creo mi instancia del router
export const api = Router();

api.get("/peliculas", traerPeliculas);
api.get("/peliculas/top", ratingTopPeliculas);
api.get("/peliculas/low", ratingLowPeliculas);
api.get("/peliculas/buscar/:id", buscarPelicula);
api.get("/peliculas/buscar/anio/:year", buscarPeliculaAnio);
api.post("/peliculas/crear", crearPelicula);
api.put("/peliculas/actualizar/:id", actualizarPelicula);
api.delete("/peliculas/eliminar/:id", eliminarPelicula);


