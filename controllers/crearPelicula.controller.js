import fs from 'fs';

export function crearPelicula(req, res){
    try {
      const body = req.body;
      const data = fs.readFileSync("./data/movies.json", "utf8");
      const peliculas = JSON.parse(data);
      // peliculas.push(body);
      fs.writeFileSync("./data/movies.json", JSON.stringify([...peliculas,body]));
      res.json({
         "msg": "Pelicula creada",
         "body": body
      })
   } catch (error) {
      res.status(500).json({
         "error": "No se pudo crear la pelicula"
      })
   }
}