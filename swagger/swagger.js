import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

// Configuración de Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Películas',
      version: '1.0.0',
      description: 'Documentación de la API de Películas desarrollado por Alexander Gomez',
      contact: {
        name: 'API Support',
        email: 'mpalexanderg@outlook.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor de desarrollo'
      }
    ],
    components: {
      schemas: {
        Pelicula: {
          type: 'object',
          required: ['id', 'title', 'year', 'genre', 'director'],
          properties: {
            id: {
              type: 'string',
              description: 'ID único de la película'
            },
            title: {
              type: 'string',
              description: 'Título de la película'
            },
            year: {
              type: 'integer',
              description: 'Año de lanzamiento'
            },
            genre: {
              type: 'string',
              description: 'Género de la película'
            },
            director: {
              type: 'string',
              description: 'Director de la película'
            },
            actors: {
              type: 'string',
              description: 'Actores principales'
            },
            plot: {
              type: 'string',
              description: 'Sinopsis de la película'
            },
            imdb_rating: {
              type: 'number',
              format: 'float',
              description: 'Calificación en IMDB'
            },
            runtime_minutes: {
              type: 'integer',
              description: 'Duración en minutos'
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              description: 'Mensaje de error'
            }
          }
        },
        ResponseOk: {
          type: 'object',
          properties: {
            ok: {
              type: 'boolean',
              description: 'Indicador de éxito',
              default: true
            }
          }
        }
      }
    }
  },
  apis: ['./routes/*.js', './controllers/*.js', './app.js']
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export const setupSwagger = (app) => {
  // Ruta para la documentación de Swagger
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  
  // Ruta para obtener el JSON de la especificación de Swagger
  app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
  
  console.log('📚 Documentación Swagger disponible en /api-docs');
};