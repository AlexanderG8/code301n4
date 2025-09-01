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
      return movies.filter((movie) => movie.year === year);
    } catch (error) {
      throw new Error("Error al buscar películas por año");
    }
  }

  /**
   * Busca películas por nombre y año
   * @param {string} title - Título de la película
   * @param {number} year - Año de la película
   * @returns {Array} Lista de películas que coinciden
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
}