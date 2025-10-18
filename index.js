// index.js (Actualizado para incluir Swagger)

require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;

// Importar Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerOptions = require('./swagger.config'); // Importamos la configuración

// --- Generar la especificación y configurar la ruta ---
const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Configurar la ruta para la documentación (Criterio: Documentación de uso)
// La documentación será accesible en http://localhost:PORT/api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// -----------------------------------------------------

// Middleware para que Express.js pueda leer JSON en las peticiones
app.use(express.json());

// Middleware para manejar las rutas de la API
// NOTA: El prefijo '/api/v1/productos' en la ruta.
app.use('/api/v1/productos', require('./routes/productos.routes'));

// Ruta de prueba
app.get('/', (req, res) => {
    // ... (Tu código existente)
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`\nServidor corriendo en el puerto: ${PORT}`);
    console.log(`Accede a la API en: http://localhost:${PORT}/api/v1/productos`);
    console.log(`Documentación Swagger en: http://localhost:${PORT}/api-docs`); // ¡Nuevo!
});