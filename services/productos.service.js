// services/productos.service.js
let productos = [{ id: 1, nombre: 'Laptop', precio: 1200 }, { id: 2, nombre: 'Monitor', precio: 300 }];
let nextId = 3;

// Simulación de validación de datos básica (calidad y seguridad)
function validarProducto(nombre, precio) {
    if (!nombre || !precio || typeof nombre !== 'string' || typeof precio !== 'number' || precio <= 0) {
        throw new Error('Datos de producto inválidos: nombre y precio son requeridos y el precio debe ser positivo.');
    }
}

class ProductosService {
    listar() {
        return productos;
    }

    obtenerPorId(id) {
        return productos.find(p => p.id === parseInt(id));
    }

    crear(nombre, precio) {
        validarProducto(nombre, precio);
        const nuevoProducto = { id: nextId++, nombre, precio };
        productos.push(nuevoProducto);
        return nuevoProducto;
    }

    actualizar(id, nombre, precio) {
        validarProducto(nombre, precio);
        const producto = this.obtenerPorId(id);
        if (!producto) return null;
        producto.nombre = nombre;
        producto.precio = precio;
        return producto;
    }

    eliminar(id) {
        const index = productos.findIndex(p => p.id === parseInt(id));
        if (index === -1) return false;
        productos.splice(index, 1);
        return true;
    }
}

module.exports = new ProductosService();