import fs from 'fs';

export function buscarPorNombreAnio(req,res) {
    try {
        const nombre = req.params.nombre;
        const anio = req.params.anio;

        const data = fs.readFileSync("./data/movies.json","utf8");
        const peliculas = JSON.parse(data);
        const peliculasEncontradas = peliculas.filter((peli) => {
            // Manejar parámetros de búsqueda vacíos de manera más eficiente
            const hasNombre = nombre !== "";
            const hasAnio = anio !== "";

            if (!hasNombre && !hasAnio) {
                return true; // Retornar todas las películas si no hay criterios de búsqueda
            }

            const titleMatch = !hasNombre || peli.title.toLowerCase().includes(nombre.toLowerCase());
            const yearMatch = !hasAnio || peli.year === Number(anio);

            return titleMatch && yearMatch;
        });
        if(peliculasEncontradas.length > 0) {
            res.json({
                msg: "Peliculas encontradas",
                peliculas: peliculasEncontradas
            })
        }else{
            res.status(404).json({
                msg: "No se encontraron resultados para la búsqueda."
            })
        }
    } catch (error) {
        res.status(500).json({
            error: "No se pudo buscar la pelicula"
        })
    }
}

/**
 * Ejemplo: http://localhost:3000/peliculas/buscarNombreAnio/nombre/Apocalypse Now/anio/1979
 */