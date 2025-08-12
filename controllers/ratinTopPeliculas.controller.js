import fs from 'fs';

export function ratingTopPeliculas(req, res){
    try{
      const data = fs.readFileSync("./data/movies.json", "utf8");
      const peliculas = JSON.parse(data);
      const peliculasTop = peliculas.filter((pelicula) => {
         return pelicula.imdb_rating > 9
      });
      res.json(peliculasTop);
   }catch (error){
      res.status(500).json({ error: "No se pudo leer el archivo de películas" });
   }
}