import fs from 'fs';

export function buscarPeliculaAnio(req, res){
    try {
      const year = req.params.year;
      const data = fs.readFileSync("./data/movies.json", "utf8");
      const peliculas = JSON.parse(data);
      const peliculasYear = peliculas.filter((peli) => peli.year === Number(year));
      if (!peliculasYear){
         return res.json({
            msg: "No se encontro la pelicula"
         })
      }
      res.json(peliculasYear);
   } catch (error) {
      res.status(500).json({
         error: "Hubo un error inesperado en el servidor"
      })
   }
}