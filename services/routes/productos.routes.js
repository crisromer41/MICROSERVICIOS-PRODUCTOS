// routes/productos.routes.js
const { Router } = require('express');
const router = Router();
const productosService = require('../services/productos.service'); // Importamos el servicio

// 1. GET /productos
router.get('/', (req, res) => {
    try {
        const listaProductos = productosService.listar();
        res.status(200).json(listaProductos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 2. GET /productos/:id
router.get('/:id', (req, res) => {
    const producto = productosService.obtenerPorId(req.params.id);
    if (!producto) {
        return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.status(200).json(producto);
});

// 3. POST /productos (Autenticación básica implícita: por ahora solo valida datos de entrada)
router.post('/', (req, res) => {
    try {
        const { nombre, precio } = req.body;
        const nuevoProducto = productosService.crear(nombre, precio);
        res.status(201).json(nuevoProducto);
    } catch (error) {
        res.status(400).json({ error: error.message }); // 400 Bad Request por error de validación
    }
});

// 4. PUT /productos/:id
router.put('/:id', (req, res) => {
    try {
        const { nombre, precio } = req.body;
        const productoActualizado = productosService.actualizar(req.params.id, nombre, precio);

        if (!productoActualizado) {
            return res.status(404).json({ error: 'Producto no encontrado para actualizar' });
        }
        res.status(200).json(productoActualizado);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// 5. DELETE /productos/:id
router.delete('/:id', (req, res) => {
    const eliminado = productosService.eliminar(req.params.id);
    if (!eliminado) {
        return res.status(404).json({ error: 'Producto no encontrado para eliminar' });
    }
    res.status(204).send(); // 204 No Content para eliminación exitosa
});

module.exports = router;