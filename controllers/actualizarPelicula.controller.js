import fs from 'fs';

export function actualizarPelicula (req, res) {
    try {
      // 1. Capturo el id
      const id = req.params.id;
      // 2. Capturo la información que me envio el cliente
      const dataRecibida = req.body;
      const data = fs.readFileSync("./data/movies.json", "utf8");
      const peliculas = JSON.parse(data); // Parsear el JSON a un objeto

      // 3. Busco la pelicula que se va actualizar
      const peliculaEncontrada = peliculas.find((peli) => peli.id === id);
      // 4. Actualizo la información especifica
      peliculaEncontrada.title = dataRecibida.title;
      // 5. Actualizamos el archivo de peliculas
      fs.writeFileSync("./data/movies.json", JSON.stringify(peliculas));

      res.json({
         msg: "Pelicula actualizada correctamente",
         pelicula: peliculaEncontrada
      })
   } catch (error) {
      res.status(500).json({
         error: "No se pudo actualizar la pelicula"
      })
   }
}
