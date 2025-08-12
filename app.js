/*
   const express = require('express')
   const app = express()
   const port = 3000
*/


import express from "express";
import fs from "fs";
import { api } from './routes/peliculas.routes.js'

// Vamos a crear una instancia de nuestro servidor
const app = express();
// Siempre un servidor va a tener un puerto
const port = 3000;
// Midleware
app.use(express.json());
app.use(api);

/*
   Siempre va a correr en la siguiente ruta:
   http://localhost:3000
*/
app.listen(port, () => {
   console.log(`💚 Mi servidor esta corriendo en el puerto ${port}`);
})

/**
 * Endpoint - Ruta o Link
 * Metodo - HTTP
 * GET - Obtener Información
 * POST - Crear Información
 * PUT - Actualizar Información
 * PATCH - Actualizar Información Especifica
 * DELETE - Eliminar Información
 */

/*
   Endpoint- Ruta o Link
 */
app.get("/saludo", (req, res) => {
   res.json({
      "saludo": "Hola amigos"
   })
})

/*
   Crear un endpoit de tipo GET, que retorne todo el json de peliculas
   El endpoint debe de llamarse /peliculas
*/



/**
 * RETO 01 - 02
   Crear un endpoint de tipo GET, que retorne las peliculas con un imdb_rating mayor a 9
   El endpoint debe de llamarse /peliculas/rating-top
   Crear un endpoint de tipo GET, que retorne las peliculas con un imdb_rating menor a 5
   El endpoint debe de llamarse /peliculas/rating-low
   🍏 TIP:
   Deben de usar el metodo filter de los arrays para poder traer las peliculas con rating
   mayor o menor segun corresponda
 */



/**
 * POST
 * Cuando creamos un endpoint de tipo POST, se espera que el cliente
 * nos envie información.
 * El cliente nos envia la información en un body con formato JSON
 *
 * Para poder leer la información de un body de tipo JSON
 * debemos de agregar un middleware (una tuberia que procesa información)
 *
 *app.use(express.json());
 *
 * Ya podemos comenzar a crear nuestro endpoint de tipo POST
 *
 * req.body
 * Accedemos a la información que nos enviar el cliente
 */


/**
 * Realizar el PUT
 * Sirve para poder actualizar toda la información de una pelicula
 */



/**
 * Realizar el DELETE
 * Sirve para poder eliminar una pelicula
 */
