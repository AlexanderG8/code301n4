# Guía Básica de Node.js 

## ¿Qué es Node.js y por qué lo necesitamos?

### Antes de Node.js
- JavaScript solo funcionaba en navegadores web
- Para crear un servidor necesitabas otros lenguajes como PHP, Python, Java

### Con Node.js
- Puedes usar JavaScript para crear servidores
- **Ventaja**: Un solo lenguaje para frontend y backend

### Analogía simple
JavaScript era como un chef que solo podía cocinar en la cocina del restaurante (navegador). Node.js le dio su propia cocina completa donde puede preparar cualquier comida (servidores, APIs, aplicaciones).

---

## Estructura de Carpetas

El proyecto sigue una estructura organizada para facilitar el mantenimiento y la escalabilidad:

```
proyecto/
├── controllers/          ← Lógica de negocio para las entidades
│   └── moviesController.js
├── data/                 ← Archivos de datos
│   └── movies.json
├── routes/               ← Definición de rutas API
│   └── peliculas.routes.js
├── middlewares/          ← Middlewares personalizados
│   ├── logger.js         ← Logging de peticiones
│   ├── errorHandler.js   ← Manejo centralizado de errores
│   └── resHandler.js     ← Modificación de respuestas
├── services/             ← Servicios para acceso a datos
│   └── movieService.js
├── swagger/              ← Documentación de la API
│   └── swagger.js
├── .env                  ← Variables de entorno (no incluido en Git)
├── .env.example          ← Ejemplo de variables de entorno
├── .gitignore            ← Archivos ignorados por Git
├── app.js                ← Punto de entrada de la aplicación
├── package.json          ← Dependencias del proyecto
└── README.md             ← Documentación
```

**Beneficios de esta estructura:**
- **Organizada**: Separación clara de responsabilidades
- **Mantenible**: Cada componente tiene un propósito específico
- **Escalable**: Facilita la adición de nuevas características
- **Documentada**: Incluye documentación con Swagger

---

## Documentación de la API

El proyecto incluye documentación de la API utilizando Swagger. Para acceder a la documentación:

1. Inicia el servidor: `npm run dev`
2. Abre en tu navegador: `http://localhost:3000/api-docs`

Desde la interfaz de Swagger podrás:
- Ver todos los endpoints disponibles
- Probar las operaciones directamente
- Consultar los esquemas de datos

---

## Variables de Entorno

El proyecto utiliza variables de entorno para la configuración. Copia el archivo `.env.example` a `.env` y ajusta los valores según sea necesario:

```
# Puerto del servidor
PORT=3000

# Entorno de ejecución
NODE_ENV=development

# Ruta de los datos
DATA_PATH=./data/movies.json

# Configuración de CORS
CORS_ORIGIN=*
```

---

## Paso 1: Configuración Inicial

### 1.1 Crear la carpeta del proyecto
```bash
mkdir mi-primer-backend
cd mi-primer-backend
```

### 1.2 Inicializar el proyecto
```bash
npm init
```

**¿Qué hace `npm init`?**
- Crea el archivo `package.json`
- Te hace preguntas sobre tu proyecto
- Es como llenar un formulario de "identidad" de tu proyecto

**Respuestas sugeridas:**
- name: `mi-primer-backend`
- version: `1.0.0` (ya viene por defecto)
- description: `Mi primer servidor con Node.js`
- entry point: `app.js` (cambia de index.js a app.js)
- El resto presiona Enter para usar valores por defecto

### 1.3 Instalar Express
```bash
npm install express
```

**¿Qué es Express y por qué lo usamos?**
- Express es como una "caja de herramientas" para crear servidores
- Sin Express tendrías que escribir mucho más código
- **Analogía**: Es como usar un destornillador eléctrico vs uno manual

### 1.4 Instalar Nodemon (opcional pero recomendado)
```bash
npm install --save-dev nodemon
```

**¿Qué es Nodemon y por qué lo usamos?**
- Reinicia automáticamente tu servidor cuando haces cambios
- Sin Nodemon: Guardas código → Paras servidor → Inicias servidor
- Con Nodemon: Guardas código → Se reinicia solo ✨

---

## Paso 2: Configurar package.json

Después de instalar todo, tu `package.json` debe verse así:

```json
{
  "name": "mi-primer-backend",
  "version": "1.0.0",
  "description": "Mi primer servidor con Node.js",
  "type": "module",
  "main": "app.js",
  "scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js"
  },
  "dependencies": {
    "express": "^4.19.2"
  },
  "devDependencies": {
    "nodemon": "^3.1.4"
  }
}
```

**Cambios importantes que debes hacer:**

1. **Agregar `"type": "module"`**
   - **¿Por qué?** Permite usar `import` en lugar de `require`
   - **Analogía**: Es como cambiar de español antiguo a español moderno

2. **Agregar script `"dev"`**
   - **¿Por qué?** Para usar nodemon fácilmente
   - **Cómo usarlo:** `npm run dev`

---

## Paso 3: Crear nuestros datos (JSON)

### 3.1 Crear la carpeta data
```bash
mkdir data
```

### 3.2 Crear el archivo data/productos.json
```json
[
  {
    "id": 1,
    "nombre": "Smartphone",
    "precio": 999.99,
    "categoria": "Electrónicos"
  },
  {
    "id": 2,
    "nombre": "Camiseta",
    "precio": 19.99,
    "categoria": "Ropa"
  },
  {
    "id": 3,
    "nombre": "Mesa",
    "precio": 299.99,
    "categoria": "Hogar"
  }
]
```

**¿Por qué usar JSON y no una base de datos?**
- **Simplicidad**: JSON es fácil de entender
- **No necesita instalación**: Las bases de datos requieren configuración extra
- **Enfoque**: Nos concentramos en aprender Node.js, no bases de datos

---

## Paso 4: Crear nuestro primer servidor

### app.js - Versión básica
```javascript
// 1. Importar Express
import express from "express";

// 2. Crear la aplicación
const app = express();

// 3. Definir el puerto
const port = 3000;

// 4. Configurar Express para entender JSON
app.use(express.json());

// 5. Crear nuestra primera ruta
app.get('/', (req, res) => {
  res.json({ 
    mensaje: '¡Hola! Mi primer servidor funciona 🎉' 
  });
});

// 6. Iniciar el servidor
app.listen(port, () => {
  console.log(`🚀 Servidor funcionando en http://localhost:${port}`);
});
```

**Explicación línea por línea:**

1. **`import express from "express"`**
   - Traemos las herramientas de Express a nuestro archivo
   - **Analogía**: Como sacar las herramientas de una caja

2. **`const app = express()`**
   - Creamos nuestra aplicación/servidor
   - **Analogía**: Como encender un robot que va a recibir órdenes

3. **`const port = 3000`**
   - Definimos en qué "puerta" va a escuchar nuestro servidor
   - **¿Por qué 3000?** Es una convención, como usar la puerta principal de una casa

4. **`app.use(express.json())`**
   - Decimos al servidor que entienda datos en formato JSON
   - **¿Por qué?** Porque las aplicaciones web hablan en JSON

5. **`app.get('/', (req, res) => {...})`**
   - Creamos una "ruta" que responde cuando alguien visita nuestro servidor
   - **`req`**: La pregunta que nos hacen
   - **`res`**: Nuestra respuesta

6. **`app.listen(port, () => {...})`**
   - Ponemos al servidor a "escuchar" en el puerto 3000
   - **Analogía**: Como poner a un empleado en la recepción

---

## Paso 5: ¿Qué son req y res?

Antes de continuar, necesitas entender dos conceptos fundamentales:

### req (request) - La Petición
```javascript
app.get('/productos', (req, res) => {
  // req = la información que nos envía el cliente
})
```

**¿Qué contiene req?**
- `req.params`: Parámetros de la URL (como /productos/1, el "1" está en params)
- `req.body`: Datos que envía el cliente (en POST, PUT)
- `req.query`: Parámetros de consulta (?nombre=Juan&edad=25)

**Analogía**: req es como un sobre que contiene la carta que te envían

### res (response) - La Respuesta
```javascript
app.get('/productos', (req, res) => {
  // res = nuestra respuesta hacia el cliente
  res.json({ mensaje: 'Hola' });
})
```

**¿Qué podemos hacer con res?**
- `res.json()`: Enviar datos en formato JSON
- `res.status()`: Definir código de estado (200, 404, 500, etc.)
- `res.send()`: Enviar texto simple

**Analogía**: res es como escribir una carta de respuesta y enviarla de vuelta

---

## Paso 6: ¿REALMENTE necesitamos async/await?

### Versión SIN async/await (más simple para empezar)

**¿Es necesario async/await para leer JSON?** 
- **Respuesta corta**: NO, para archivos pequeños
- **¿Por qué lo usamos entonces?** Para prepararnos para el mundo real

### Comparación práctica:

#### Opción A: SIN async/await (más simple)
```javascript
import express from "express";
import fs from 'fs';

const app = express();
const port = 3000;

app.use(express.json());

// Función SÍNCRONA para leer productos
const leerProductos = () => {
  try {
    const data = fs.readFileSync('./data/productos.json', 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error leyendo productos:', error);
    return [];
  }
};

// GET - Versión simple sin async
app.get('/productos', (req, res) => {
  const productos = leerProductos(); // No necesita await
  res.json({
    mensaje: 'Productos obtenidos exitosamente',
    data: productos
  });
});
```

#### Opción B: CON async/await (preparándose para el futuro)
```javascript
import express from "express";
import fs from 'fs/promises'; // promises version

const app = express();

// Función ASÍNCRONA para leer productos
const leerProductos = async () => {
  try {
    const data = await fs.readFile('./data/productos.json', 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error leyendo productos:', error);
    return [];
  }
};

// GET - Versión con async/await
app.get('/productos', async (req, res) => {
  const productos = await leerProductos(); // Necesita await
  res.json({
    mensaje: 'Productos obtenidos exitosamente',
    data: productos
  });
});
```

### ¿Cuál usar en esta primera clase?

**Para máxima simplicidad: Opción A (sin async/await)**
**Para prepararse para bases de datos: Opción B (con async/await)**

### ¿Por qué enseñar async/await desde el principio?

1. **Preparación para el futuro**: Las bases de datos SÍ requieren async/await
2. **Buenas prácticas**: Es mejor aprenderlo desde el inicio
3. **Mundo real**: Casi todas las operaciones de servidor son asíncronas

**Analogía**: Es como aprender a manejar con cinturón de seguridad desde el primer día, aunque no planees salir de tu barrio.

---

## Paso 7: Métodos HTTP Básicos

### ¿Qué son los métodos HTTP?
Son como "verbos" que indican qué queremos hacer:
- **GET**: "Dame información" (como preguntar)
- **POST**: "Crea algo nuevo" (como entregar un formulario)
- **PUT**: "Actualiza esto completamente" (como reemplazar)
- **DELETE**: "Elimina esto" (como tirar a la basura)

### Versión completa con explicaciones

```javascript
import express from "express";
import fs from 'fs'; // Usamos la versión simple

const app = express();
const port = 3000;

app.use(express.json());

// Función helper para leer productos (VERSIÓN SIMPLE)
const leerProductos = () => {
  try {
    const data = fs.readFileSync('./data/productos.json', 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error leyendo productos:', error);
    return [];
  }
};

// Función helper para escribir productos (VERSIÓN SIMPLE)
const escribirProductos = (productos) => {
  try {
    fs.writeFileSync('./data/productos.json', JSON.stringify(productos, null, 2));
    return true;
  } catch (error) {
    console.error('Error escribiendo productos:', error);
    return false;
  }
};

// RUTA PRINCIPAL
app.get('/', (req, res) => {
  res.json({
    mensaje: '🚀 Mi primer servidor con Node.js',
    rutas_disponibles: {
      obtener_productos: 'GET /productos',
      crear_producto: 'POST /productos',
      obtener_producto_especifico: 'GET /productos/:id',
      actualizar_producto: 'PUT /productos/:id',
      eliminar_producto: 'DELETE /productos/:id'
    }
  });
});

// GET - Obtener todos los productos
app.get('/productos', (req, res) => {
  // req = petición del cliente (qué nos pide)
  // res = nuestra respuesta (qué le devolvemos)
  
  const productos = leerProductos(); // Sin await porque es síncrono
  
  res.json({
    mensaje: 'Productos obtenidos exitosamente',
    data: productos
  });
});

// GET - Obtener un producto específico
app.get('/productos/:id', (req, res) => {
  // req.params contiene los parámetros de la URL
  // Si la URL es /productos/1, entonces req.params.id = "1"
  const { id } = req.params;
  
  const productos = leerProductos();
  const producto = productos.find(p => p.id === parseInt(id));
  
  if (!producto) {
    return res.status(404).json({
      mensaje: 'Producto no encontrado'
    });
  }
  
  res.json({
    mensaje: 'Producto encontrado',
    data: producto
  });
});

// POST - Crear un nuevo producto
app.post('/productos', (req, res) => {
  // req.body contiene los datos que nos envía el cliente
  const { nombre, precio, categoria } = req.body;
  
  // Validación básica
  if (!nombre || !precio || !categoria) {
    return res.status(400).json({
      mensaje: 'Nombre, precio y categoría son obligatorios'
    });
  }
  
  const productos = leerProductos();
  
  // Generar nuevo ID
  const nuevoId = productos.length > 0 
    ? Math.max(...productos.map(p => p.id)) + 1 
    : 1;
  
  const nuevoProducto = {
    id: nuevoId,
    nombre,
    precio: parseFloat(precio),
    categoria
  };
  
  productos.push(nuevoProducto);
  escribirProductos(productos);
  
  // res.status(201) = "Creado exitosamente"
  res.status(201).json({
    mensaje: 'Producto creado exitosamente',
    data: nuevoProducto
  });
});

// PUT - Actualizar un producto
app.put('/productos/:id', (req, res) => {
  const { id } = req.params; // ID del producto a actualizar
  const { nombre, precio, categoria } = req.body; // Nuevos datos
  
  const productos = leerProductos();
  const indiceProducto = productos.findIndex(p => p.id === parseInt(id));
  
  if (indiceProducto === -1) {
    return res.status(404).json({
      mensaje: 'Producto no encontrado'
    });
  }
  
  // Actualizar solo los campos enviados
  if (nombre) productos[indiceProducto].nombre = nombre;
  if (precio) productos[indiceProducto].precio = parseFloat(precio);
  if (categoria) productos[indiceProducto].categoria = categoria;
  
  escribirProductos(productos);
  
  res.json({
    mensaje: 'Producto actualizado exitosamente',
    data: productos[indiceProducto]
  });
});

// DELETE - Eliminar un producto
app.delete('/productos/:id', (req, res) => {
  const { id } = req.params;
  
  const productos = leerProductos();
  const indiceProducto = productos.findIndex(p => p.id === parseInt(id));
  
  if (indiceProducto === -1) {
    return res.status(404).json({
      mensaje: 'Producto no encontrado'
    });
  }
  
  // splice() elimina elementos del array
  const productoEliminado = productos.splice(indiceProducto, 1)[0];
  escribirProductos(productos);
  
  res.json({
    mensaje: 'Producto eliminado exitosamente',
    data: productoEliminado
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`🔥 Servidor funcionando en http://localhost:${port}`);
  console.log(`📖 Ve a http://localhost:${port}/ para ver las rutas disponibles`);
});
```

---

## Paso 6: Probar tu API

### 6.1 Iniciar el servidor
```bash
npm run dev
```

**¿Qué deberías ver?**
```
🔥 Servidor funcionando en http://localhost:3000
📖 Ve a http://localhost:3000/ para ver las rutas disponibles
```

### 6.2 Probar en el navegador
Ve a `http://localhost:3000/` y deberías ver:
```json
{
  "mensaje": "🚀 Mi primer servidor con Node.js",
  "rutas_disponibles": {
    "obtener_productos": "GET /productos",
    "crear_producto": "POST /productos",
    "obtener_producto_especifico": "GET /productos/:id",
    "actualizar_producto": "PUT /productos/:id",
    "eliminar_producto": "DELETE /productos/:id"
  }
}
```

### 6.3 Probar obtener productos
Ve a `http://localhost:3000/productos` y deberías ver tus productos.

---

## Conceptos Clave que Aprendimos

### 1. **req y res explicados con ejemplos**

#### req (request) - Lo que recibimos
```javascript
app.get('/productos/:id', (req, res) => {
  const { id } = req.params; // Parámetros de URL: /productos/1
})

app.post('/productos', (req, res) => {
  const { nombre, precio } = req.body; // Datos del formulario
})
```

**Analogía**: req es como un sobre que contiene:
- **La dirección** (¿a qué ruta va?)
- **El contenido** (¿qué datos envía?)
- **El tipo de carta** (GET, POST, PUT, DELETE)

#### res (response) - Lo que devolvemos
```javascript
res.json({ mensaje: 'Todo bien' });     // Enviar datos
res.status(404);                         // Código de error
res.status(201).json({ data: producto }); // Código + datos
```

**Analogía**: res es como escribir una carta de respuesta:
- **El mensaje** (JSON con datos)
- **El código postal** (200, 404, 500)
- **Enviarla de vuelta** al cliente

### 2. **¿POR QUÉ no usamos async/await aquí?**

**Razón principal**: Para archivos JSON pequeños NO es necesario

```javascript
// SÍNCRONO (más simple para empezar)
const productos = leerProductos(); // Ejecuta inmediatamente

// ASÍNCRONO (para bases de datos)
const productos = await leerProductos(); // Espera a que termine
```

**¿Cuándo SÍ necesitas async/await?**
- Bases de datos (MySQL, MongoDB)
- APIs externas (consultar otra página web)
- Archivos muy grandes
- Operaciones que toman tiempo

**Analogía**: 
- **Síncrono**: Como preparar un sandwich (rápido, inmediato)
- **Asíncrono**: Como hornear un pastel (toma tiempo, hay que esperar)

### 3. **¿Por qué separamos en funciones?**
```javascript
const leerProductos = () => { ... }
```
- **Reutilización**: Usamos la misma función en varias rutas
- **Mantenimiento**: Si cambia algo, solo lo arreglamos en un lugar
- **Legibilidad**: El código es más fácil de entender

### 4. **¿Por qué validamos datos?**
```javascript
if (!nombre || !precio || !categoria) {
  return res.status(400).json({
    mensaje: 'Nombre, precio y categoría son obligatorios'
  });
}
```
- **Prevención**: Evitamos errores antes de que sucedan
- **Experiencia de usuario**: Damos mensajes claros
- **Seguridad**: No dejamos que datos incorrectos entren

### 5. **¿Por qué usamos códigos de estado HTTP?**
- **200**: Todo bien ✅
- **201**: Creado exitosamente ✨
- **400**: Error del usuario (datos incorrectos) ❌
- **404**: No encontrado 🔍
- **500**: Error del servidor 💥

**Analogía**: Como semáforos para la comunicación web

---

## Comandos Importantes

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo (con reinicio automático)
npm run dev

# Ejecutar en producción
npm start

# Detener el servidor
Ctrl + C
```

---

## Siguiente Clase

En la próxima clase aprenderemos:
- Organizar código en carpetas separadas (controllers, routes)
- Conectar con una base de datos real
- Validación más avanzada
- Manejo de errores profesional

¡Felicidades! Ya tienes tu primer servidor funcionando 🎉