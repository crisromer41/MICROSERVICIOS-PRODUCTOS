// index.js
require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para que Express.js pueda leer JSON en las peticiones
app.use(express.json());

// Middleware para manejar las rutas (lo crearemos más adelante)
app.use('/api/v1/productos', require('./routes/productos.routes'));

// Ruta de prueba
app.get('/', (req, res) => {
    res.status(200).json({ 
        message: 'Microservicio de Productos funcionando!',
        service: 'Productos',
        version: 'v1.0'
    });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`\nServidor corriendo en el puerto: ${PORT}`);
    console.log(`Accede en: http://localhost:${PORT}`);
});