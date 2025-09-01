import fs from 'fs';

/**
 * Servicio para gestionar las operaciones relacionadas con películas
 */
export class MovieService {
  constructor() {
    this.filePath = process.env.DATA_PATH || "./data/movies.json";
  }

  /**
   * Obtiene todas las películas
   * @returns {Array} Lista de películas
   */
  getAllMovies() {
    try {
      const data = fs.readFileSync(this.filePath, "utf8");
      return JSON.parse(data);
    } catch (error) {
      throw new Error("No se pudo obtener las películas");
    }
  }

  /**
   * Busca una película por su ID
   * @param {string} id - ID de la película
   * @returns {Object|null} Película encontrada o null
   */
  getMovieById(id) {
    try {
      const movies = this.getAllMovies();
      return movies.find((movie) => movie.id === id) || null;
    } catch (error) {
      throw new Error("Error al buscar la película");
    }
  }

  /**
   * Crea una nueva película
   * @param {Object} movieData - Datos de la película
   * @returns {Object} Película creada
   */
  createMovie(movieData) {
    try {
      const movies = this.getAllMovies();
      movies.push(movieData);
      fs.writeFileSync(this.filePath, JSON.stringify(movies));
      return movieData;
    } catch (error) {
      throw new Error("No se pudo crear la película");
    }
  }

  /**
   * Actualiza una película existente
   * @param {string} id - ID de la película
   * @param {Object} movieData - Nuevos datos de la película
   * @returns {Object} Película actualizada
   */
  updateMovie(id, movieData) {
    try {
      const movies = this.getAllMovies();
      const movieIndex = movies.findIndex((movie) => movie.id === id);
      
      if (movieIndex === -1) {
        throw new Error("Película no encontrada");
      }
      
      // Actualizar solo los campos proporcionados
      movies[movieIndex] = { ...movies[movieIndex], ...movieData };
      
      fs.writeFileSync(this.filePath, JSON.stringify(movies));
      return movies[movieIndex];
    } catch (error) {
      throw new Error("No se pudo actualizar la película");
    }
  }

  /**
   * Elimina una película
   * @param {string} id - ID de la película
   * @returns {boolean} true si se eliminó correctamente
   */
  deleteMovie(id) {
    try {
      const movies = this.getAllMovies();
      const filteredMovies = movies.filter((movie) => movie.id !== id);
      
      if (filteredMovies.length === movies.length) {
        throw new Error("Película no encontrada");
      }
      
      fs.writeFileSync(this.filePath, JSON.stringify(filteredMovies));
      return true;
    } catch (error) {
      throw new Error("No se pudo eliminar la película");
    }
  }

  /**
   * Obtiene películas con rating superior al especificado
   * @param {number} rating - Rating mínimo
   * @returns {Array} Lista de películas filtradas
   */
  getMoviesByMinRating(rating) {
    try {
      const movies = this.getAllMovies();
      return movies.filter((movie) => movie.imdb_rating >= rating);
    } catch (error) {
      throw new Error("Error al filtrar películas por rating");
    }
  }

  /**
   * Busca películas por año
   * @param {number} year - Año de la película
   * @returns {Array} Lista de películas del año especificado
   */
  getMoviesByYear(year) {
    try {
      const movies = this.getAllMovies();
      return movies.filter((movie) => movie.year === parseInt(year));
    } catch (error) {
      throw new Error("Error al buscar películas por año");
    }
  }

  /**
   * Obtiene películas por rango de años
   * @param {number} fromYear - Año inicial del rango
   * @param {number} toYear - Año final del rango
   * @returns {Array} - Lista de películas que están dentro del rango de años
   */
  getMoviesByYearRange(fromYear, toYear) {
    try {
      const movies = this.getAllMovies();
      const fromYearInt = parseInt(fromYear);
      const toYearInt = parseInt(toYear);
      
      // Agregar log para depuración
      console.log(`Buscando películas entre ${fromYearInt} y ${toYearInt}`);
      console.log(`Total de películas en la base de datos: ${movies.length}`);
      
      // Verificar que los años sean números válidos
      if (isNaN(fromYearInt) || isNaN(toYearInt)) {
        console.error('Años inválidos:', { fromYear, toYear, fromYearInt, toYearInt });
        return [];
      }
      
      const filteredMovies = movies.filter(movie => {
        // Asegurarse de que movie.year sea un número
        const movieYear = typeof movie.year === 'number' ? movie.year : parseInt(movie.year);
        const inRange = movieYear >= fromYearInt && movieYear <= toYearInt;
        
        // Para depuración
        if (inRange) {
          console.log(`Película en rango: ${movie.title} (${movieYear})`);
        }
        
        return inRange;
      });
      
      console.log(`Películas encontradas en el rango: ${filteredMovies.length}`);
      return filteredMovies;
    } catch (error) {
      console.error("Error en getMoviesByYearRange:", error);
      throw new Error("Error al buscar películas por rango de años");
    }
  }

  /**
   * Obtiene películas por duración mínima
   * @param {number} minDuration - Duración mínima en minutos
   * @returns {Array} - Lista de películas con duración mayor o igual a la especificada
   */
  getMoviesByMinDuration(minDuration) {
    try {
      const movies = this.getAllMovies();
      const minDurationInt = parseInt(minDuration);
      
      return movies.filter(movie => {
        // Verificamos que la película tenga la propiedad runtime_minutes y que sea un número
        if (movie.runtime_minutes && !isNaN(parseInt(movie.runtime_minutes))) {
          return movie.runtime_minutes >= minDurationInt;
        }
        return false;
      });
    } catch (error) {
      throw new Error("Error al buscar películas por duración mínima");
    }
  }

  /**
   * Busca películas por nombre y año
   * @param {string} title - Título de la película
   * @param {number} year - Año de la película
   * @returns {Array} - Lista de películas que coinciden con el título y año
   */
  getMoviesByTitleAndYear(title, year) {
    try {
      const movies = this.getAllMovies();
      return movies.filter(
        (movie) => 
          movie.title.toLowerCase().includes(title.toLowerCase()) && 
          movie.year === year
      );
    } catch (error) {
      throw new Error("Error al buscar películas por nombre y año");
    }
  }

  /**
   * Obtiene métricas sobre las películas
   * @returns {Object} Objeto con métricas de películas
   */
  getMovieMetrics() {
    try {
      const movies = this.getAllMovies();
      
      // Número total de películas
      const totalMovies = movies.length;
      
      // Calcular rating promedio
      let totalRating = 0;
      let moviesWithRating = 0;
      let highestRatedMovie = null;
      let lowestRatedMovie = null;
      let longestMovie = null;
      let shortestMovie = null;
      let newestMovie = null;
      let oldestMovie = null;
      
      // Conjunto para almacenar géneros únicos
      const uniqueGenres = new Set();
      
      movies.forEach(movie => {
        // Procesar rating
        if (movie.imdb_rating) {
          totalRating += movie.imdb_rating;
          moviesWithRating++;
          
          // Actualizar película con mayor rating
          if (!highestRatedMovie || movie.imdb_rating > highestRatedMovie.imdb_rating) {
            highestRatedMovie = movie;
          }
          
          // Actualizar película con menor rating
          if (!lowestRatedMovie || movie.imdb_rating < lowestRatedMovie.imdb_rating) {
            lowestRatedMovie = movie;
          }
        }
        
        // Procesar duración
        if (movie.runtime_minutes) {
          // Actualizar película más larga
          if (!longestMovie || movie.runtime_minutes > longestMovie.runtime_minutes) {
            longestMovie = movie;
          }
          
          // Actualizar película más corta
          if (!shortestMovie || movie.runtime_minutes < shortestMovie.runtime_minutes) {
            shortestMovie = movie;
          }
        }
        
        // Procesar año
        if (movie.year) {
          // Actualizar película más reciente
          if (!newestMovie || movie.year > newestMovie.year) {
            newestMovie = movie;
          }
          
          // Actualizar película más antigua
          if (!oldestMovie || movie.year < oldestMovie.year) {
            oldestMovie = movie;
          }
        }
        
        // Procesar géneros
        if (movie.genre) {
          // Algunos géneros pueden venir como "Drama, Action"
          const genres = movie.genre.split(',').map(g => g.trim());
          genres.forEach(genre => {
            uniqueGenres.add(genre);
          });
        }
      });
      
      const averageRating = moviesWithRating > 0 ? (totalRating / moviesWithRating).toFixed(2) : 0;
      
      // Distribución por década
      const moviesByDecade = {};
      movies.forEach(movie => {
        if (movie.year) {
          const decade = Math.floor(movie.year / 10) * 10;
          moviesByDecade[decade] = (moviesByDecade[decade] || 0) + 1;
        }
      });
      
      // Distribución por género
      const moviesByGenre = {};
      movies.forEach(movie => {
        if (movie.genre) {
          // Algunos géneros pueden venir como "Drama, Action"
          const genres = movie.genre.split(',').map(g => g.trim());
          genres.forEach(genre => {
            moviesByGenre[genre] = (moviesByGenre[genre] || 0) + 1;
          });
        }
      });
      
      return {
        total_movies: totalMovies,
        total_genres: uniqueGenres.size,
        average_rating: parseFloat(averageRating),
        longest_movie: longestMovie ? {
          id: longestMovie.id,
          title: longestMovie.title,
          runtime_minutes: longestMovie.runtime_minutes
        } : null,
        shortest_movie: shortestMovie ? {
          id: shortestMovie.id,
          title: shortestMovie.title,
          runtime_minutes: shortestMovie.runtime_minutes
        } : null,
        newest_movie: newestMovie ? {
          id: newestMovie.id,
          title: newestMovie.title,
          year: newestMovie.year
        } : null,
        oldest_movie: oldestMovie ? {
          id: oldestMovie.id,
          title: oldestMovie.title,
          year: oldestMovie.year
        } : null,
        highest_rated_movie: highestRatedMovie ? {
          id: highestRatedMovie.id,
          title: highestRatedMovie.title,
          rating: highestRatedMovie.imdb_rating
        } : null,
        lowest_rated_movie: lowestRatedMovie ? {
          id: lowestRatedMovie.id,
          title: lowestRatedMovie.title,
          rating: lowestRatedMovie.imdb_rating
        } : null,
        movies_by_decade: moviesByDecade,
        movies_by_genre: moviesByGenre
      };
    } catch (error) {
      throw new Error("Error al obtener métricas de películas");
    }
  }
}