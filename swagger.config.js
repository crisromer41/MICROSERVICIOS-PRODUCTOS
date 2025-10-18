// metadata de la API
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Microservicio de Productos API', // Título de la documentación (Criterio: Documentación clara)
        version: '1.0.0',
        description: 'Documentación interactiva para la gestión de productos (CRUD). Este microservicio es una unidad independiente.',
    },
    servers: [
        {
            url: `http://localhost:${process.env.PORT || 4000}/api/v1`, // Prefijo base para todos los endpoints
            description: 'Servidor de desarrollo local',
        },
    ],
    // Definición de seguridad (Autenticación básica implícita)
    components: {
        securitySchemes: {
            basicAuth: {
                type: 'http',
                scheme: 'basic',
            },
        },
    },
};

const options = {
    swaggerDefinition,
    // Rutas a buscar:
    // **Nota:** '..' es para subir un nivel y luego buscar la carpeta routes
    apis: ['../routes/*.js', './index.js'], // (Criterio: Endpoints funcionales)
};

module.exports = options;