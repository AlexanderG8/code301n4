import fs from 'fs';

export function ratingLowPeliculas(req, res){
    try{
      const data = fs.readFileSync("./data/movies.json", "utf8");
      const peliculas = JSON.parse(data);
      const peliculasLow = peliculas.filter((pelicula) => {
         return pelicula.imdb_rating < 5
      });
      res.json(peliculasLow);
   }catch (error){
      res.status(500).json({ error: "No se pudo leer el archivo de películas" });
   }
}