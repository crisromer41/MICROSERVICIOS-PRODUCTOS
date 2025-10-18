const { Router } = require('express');
const router = Router();
const productosService = require('../services/productos.service'); // Importamos el servicio

// -----------------------------------------------------------------------
// A. DEFINICIÓN GLOBAL DE SWAGGER (Componentes y Esquemas)
// ESTE BLOQUE DEFINE EL OBJETO 'Producto'
// -----------------------------------------------------------------------

/**
 * @swagger
 * components:
 * schemas:
 * Producto:
 * type: object
 * required:
 * - nombre
 * - precio
 * properties:
 * id:
 * type: integer
 * description: ID auto-generado del producto.
 * readOnly: true
 * nombre:
 * type: string
 * description: Nombre del producto.
 * precio:
 * type: number
 * format: float
 * description: Precio del producto.
 * example:
 * id: 3
 * nombre: Teclado Mecánico
 * precio: 99.99
 */

// -----------------------------------------------------------------------
// B. ENDPOINTS (Cada ruta de Express tiene su propio bloque JSDoc)
// -----------------------------------------------------------------------

// --- 1. GET /productos (Listar todos) ---
/**
  * @swagger
  * /productos:
  * get:
  * summary: Obtiene la lista de todos los productos
  * tags: [Productos]
  * responses:
  * '200':
  * description: Lista exitosa de productos.
  * content:
  * application/json:
  * schema:
  * type: array
  * items:
  * $ref: '#/components/schemas/Producto'
  * '500':
  * description: Error interno del servidor.
  */
router.get('/', (req, res) => {
    try {
        const listaProductos = productosService.listar();
        res.status(200).json(listaProductos);
    } catch (error) {
        res.status(500).json({ error: 'Error al listar productos' });
    }
});

// --- 2. GET /productos/:id (Obtener por ID) ---
/**
 * @swagger
 * /productos/{id}:
 * get:
 * summary: Obtiene un producto por su ID
 * tags: [Productos]
 * parameters:
 * - in: path
 * name: id
 * schema:
 * type: integer
 * required: true
 * description: ID del producto a obtener.
 * responses:
 * '200':
 * description: Detalle del producto encontrado.
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Producto'
 * '404':
 * description: Producto no encontrado.
 */
router.get('/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID inválido' });
        }

        const producto = productosService.obtenerPorId(id);
        if (!producto) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        res.status(200).json(producto);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el producto' });
    }
});

// --- 3. POST /productos (Crear) ---
/**
 * @swagger
 * /productos:
 * post:
 * summary: Crea un nuevo producto
 * tags: [Productos]
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Producto'
 * examples:
 * NuevoProducto:
 * value:
 * nombre: "Mouse Inalámbrico"
 * precio: 45.50
 * responses:
 * '201':
 * description: Producto creado con éxito.
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Producto'
 * '400':
 * description: Datos de producto inválidos.
 */
router.post('/', (req, res) => {
    try {
        const { nombre, precio } = req.body;
        const nuevoProducto = productosService.crear(nombre, precio);
        res.status(201).json(nuevoProducto);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// --- 4. PUT /productos/:id (Actualizar) ---
/**
 * @swagger
 * /productos/{id}:
 * put:
 * summary: Actualiza un producto existente por su ID
 * tags: [Productos]
 * parameters:
 * - in: path
 * name: id
 * schema:
 * type: integer
 * required: true
 * description: ID del producto a actualizar.
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Producto'
 * responses:
 * '200':
 * description: Producto actualizado con éxito.
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Producto'
 * '400':
 * description: Datos de actualización inválidos.
 * '404':
 * description: Producto no encontrado para actualizar.
 */
router.put('/:id', (req, res) => {
    try {
        const { nombre, precio } = req.body;
        // La conversión a entero debe ser manejada dentro del servicio o con validación en la ruta
        const productoActualizado = productosService.actualizar(req.params.id, nombre, precio);

        if (!productoActualizado) {
            return res.status(404).json({ error: 'Producto no encontrado para actualizar' });
        }
        res.status(200).json(productoActualizado);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// --- 5. DELETE /productos/:id (Eliminar) ---
/**
 * @swagger
 * /productos/{id}:
 * delete:
 * summary: Elimina un producto por su ID
 * tags: [Productos]
 * parameters:
 * - in: path
 * name: id
 * schema:
 * type: integer
 * required: true
 * description: ID del producto a eliminar.
 * responses:
 * '204':
 * description: Producto eliminado con éxito (No Content).
 * '404':
 * description: Producto no encontrado para eliminar.
 */
router.delete('/:id', (req, res) => {
    const eliminado = productosService.eliminar(req.params.id);
    if (!eliminado) {
        return res.status(404).json({ error: 'Producto no encontrado para eliminar' });
    }
    res.status(204).send();
});

module.exports = router;
