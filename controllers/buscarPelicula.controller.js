import fs from 'fs';

export function buscarPelicula (req, res){
    try {
      const id = req.params.id; // Valor capturado del parametro dinamico
      const data = fs.readFileSync("./data/movies.json", "utf8");
      const peliculas = JSON.parse(data); // Parser el JSON a un objeto
      const peliculaUnica = peliculas.find((peli) => peli.id === id);
      if (!peliculaUnica){
         return res.json({
            msg: "No se encontro la pelicula"
         })
      }
      res.json(peliculaUnica);
   } catch (error) {
      res.status(500).json({
         error: "Hubo un error inesperado en el servidor"
      })
   }
}