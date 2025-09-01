import { MovieService } from '../services/movieService.js';

const movieService = new MovieService();

/**
 * Controlador para gestionar las operaciones relacionadas con películas
 */
export const moviesController = {
  /**
   * Obtiene todas las películas
   */
  getAllMovies: (req, res) => {
    try {
      const movies = movieService.getAllMovies();
      res.json(movies);
    } catch (error) {
      res.status(500).json({
        error: "No se pudo obtener las películas"
      });
    }
  },

  /**
   * Obtiene una película por su ID
   */
  getMovieById: (req, res) => {
    try {
      const id = req.params.id;
      const movie = movieService.getMovieById(id);
      
      if (!movie) {
        return res.json({
          msg: "No se encontró la película"
        });
      }
      
      res.json(movie);
    } catch (error) {
      res.status(500).json({
        error: "Hubo un error inesperado en el servidor"
      });
    }
  },

  /**
   * Crea una nueva película
   */
  createMovie: (req, res) => {
    try {
      const movieData = req.body;
      const newMovie = movieService.createMovie(movieData);
      
      res.status(201).json({
        msg: "Película creada correctamente",
        pelicula: newMovie
      });
    } catch (error) {
      res.status(500).json({
        error: "No se pudo crear la película"
      });
    }
  },

  /**
   * Actualiza una película existente
   */
  updateMovie: (req, res) => {
    try {
      const id = req.params.id;
      const movieData = req.body;
      
      const updatedMovie = movieService.updateMovie(id, movieData);
      
      res.json({
        msg: "Película actualizada correctamente",
        pelicula: updatedMovie
      });
    } catch (error) {
      res.status(500).json({
        error: "No se pudo actualizar la película"
      });
    }
  },

  /**
   * Elimina una película
   */
  deleteMovie: (req, res) => {
    try {
      const id = req.params.id;
      movieService.deleteMovie(id);
      
      res.json({
        msg: "Película eliminada correctamente"
      });
    } catch (error) {
      res.status(500).json({
        error: "No se pudo eliminar la película"
      });
    }
  },

  /**
   * Obtiene películas con rating superior
   */
  getTopRatedMovies: (req, res) => {
    try {
      const minRating = 9;
      const movies = movieService.getMoviesByMinRating(minRating);
      res.json(movies);
    } catch (error) {
      res.status(500).json({
        error: "No se pudieron obtener las películas con mejor rating"
      });
    }
  },

  /**
   * Obtiene películas con rating inferior
   */
  getLowRatedMovies: (req, res) => {
    try {
      const maxRating = 6;
      const movies = movieService.getAllMovies();
      const filteredMovies = movies.filter(movie => movie.imdb_rating <= maxRating);
      res.json(filteredMovies);
    } catch (error) {
      res.status(500).json({
        error: "No se pudieron obtener las películas con menor rating"
      });
    }
  },

  /**
   * Busca películas por año
   */
  getMoviesByYear: (req, res) => {
    try {
      const year = parseInt(req.params.year);
      const movies = movieService.getMoviesByYear(year);
      res.json(movies);
    } catch (error) {
      res.status(500).json({
        error: "No se pudieron obtener las películas por año"
      });
    }
  },

  /**
   * Busca películas por título y año
   */
  getMoviesByTitleAndYear: (req, res) => {
    try {
      const title = req.query.title || req.params.nombre;
      const year = req.query.year || req.params.anio;
      const parsedYear = parseInt(year);
      
      const movies = movieService.getMoviesByTitleAndYear(title, parsedYear);
      res.json(movies);
    } catch (error) {
      res.status(500).json({
        error: "No se pudieron obtener las películas por título y año"
      });
    }
  }
};