// __tests__/productos.service.test.js

const ProductosService = require('../services/productos.service');

// Describe el conjunto de pruebas para el Servicio de Productos
describe('ProductosService CRUD Operations', () => {
    // Nota: Jest maneja el aislamiento de módulos, pero en un caso real
    // con DB, usarías beforeEach/afterEach.

    // Prueba 1: Crear y Listar
    test('Debería crear un nuevo producto y listarlo', () => {
        const initialCount = ProductosService.listar().length;
        const nuevoProducto = ProductosService.crear('Mouse Pad', 15.50);
        
        expect(nuevoProducto.id).toBeDefined();
        expect(nuevoProducto.nombre).toBe('Mouse Pad');
        expect(ProductosService.listar().length).toBe(initialCount + 1);
    });

    // Prueba 2: Obtener por ID
    test('Debería obtener un producto por su ID', () => {
        // Asumimos que el ID 1 existe de nuestra lista inicial
        const producto = ProductosService.obtenerPorId(1); 
        expect(producto).not.toBeNull();
        expect(producto.nombre).toBe('Laptop');
    });

    // Prueba 3: Manejo de error de validación
    test('Debería fallar al crear con datos inválidos (precio negativo)', () => {
        // Esperamos que la función 'crear' arroje un error
        expect(() => {
            ProductosService.crear('Producto Malo', -5);
        }).toThrow('el precio debe ser positivo.');
    });
    
    // Prueba 4: Actualizar
    test('Debería actualizar un producto existente', () => {
        const actualizado = ProductosService.actualizar(2, 'Monitor Ultrawide', 450.00);
        expect(actualizado.precio).toBe(450.00);
    });

    // Prueba 5: Eliminar
    test('Debería eliminar un producto y reducir la lista', () => {
        const initialCount = ProductosService.listar().length;
        // Creamos uno nuevo para asegurar el ID de eliminación
        const productoAEliminar = ProductosService.crear('Descartable', 10);
        
        const eliminado = ProductosService.eliminar(productoAEliminar.id);
        expect(eliminado).toBe(true);
        expect(ProductosService.listar().length).toBe(initialCount);
    });
});