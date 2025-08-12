import fs from 'fs';

export function eliminarPelicula(req, res){
    try {
      const id = req.params.id;
      const data = fs.readFileSync("./data/movies.json","utf8");
      const peliculas = JSON.parse(data);

      const peliculaEncontrada = peliculas.find((peli) => peli.id === id);
      if(!peliculaEncontrada){
         return res.json({
            msg: "No se encontro la pelicula"
         });
      }
      const newListPeliculas = peliculas.filter((peli) => peli.id !== id);
      fs.writeFileSync("./data/movies.json", JSON.stringify(newListPeliculas));
      res.json({
         msg : "Pelicula eliminada correctamente"
      })
   } catch (error) {
      res.status(500).json({
         error: "No se pudo eliminar la pelicula"
      })
   }
}