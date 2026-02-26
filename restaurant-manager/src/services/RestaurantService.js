/**
 * Servicio de Restaurantes
 * Maneja toda la lógica de negocio para restaurantes
 */
const Restaurant = require('../models/Restaurant');

class RestaurantService {
  constructor() {
    this.restaurantes = new Map();
    this.contadorId = 1;
  }

  /**
   * Crear un nuevo restaurante
   */
  crearRestaurante(datos) {
    try {
      const id = this.contadorId++;
      const nuevoRestaurante = Restaurant.crear({
        id,
        ...datos
      });
      this.restaurantes.set(id, nuevoRestaurante);
      return { exito: true, mensaje: 'Restaurante creado', restaurante: nuevoRestaurante.obtenerDatos() };
    } catch (error) {
      return { exito: false, error: error.message };
    }
  }

  /**
   * Obtener todos los restaurantes
   */
  obtenerTodos() {
    const lista = Array.from(this.restaurantes.values())
      .filter(r => r.activo)
      .map(r => r.obtenerDatos());
    return { exito: true, restaurantes: lista };
  }

  /**
   * Obtener restaurante por ID
   */
  obtenerPorId(id) {
    const restaurante = this.restaurantes.get(id);
    if (!restaurante) {
      return { exito: false, error: 'Restaurante no encontrado' };
    }
    return { exito: true, restaurante: restaurante.obtenerDatos() };
  }

  /**
   * Actualizar restaurante
   */
  actualizar(id, datos) {
    const restaurante = this.restaurantes.get(id);
    if (!restaurante) {
      return { exito: false, error: 'Restaurante no encontrado' };
    }
    restaurante.actualizar(datos);
    return { exito: true, mensaje: 'Restaurante actualizado', restaurante: restaurante.obtenerDatos() };
  }

  /**
   * Eliminar restaurante
   */
  eliminar(id) {
    const restaurante = this.restaurantes.get(id);
    if (!restaurante) {
      return { exito: false, error: 'Restaurante no encontrado' };
    }
    restaurante.activo = false;
    return { exito: true, mensaje: 'Restaurante eliminado' };
  }

  /**
   * Buscar restaurantes por nombre
   */
  buscarPorNombre(nombre) {
    const resultados = Array.from(this.restaurantes.values())
      .filter(r => r.activo && r.nombre.toLowerCase().includes(nombre.toLowerCase()))
      .map(r => r.obtenerDatos());
    return { exito: true, resultados };
  }

  /**
   * Buscar restaurantes por categoría
   */
  buscarPorCategoria(categoriaId) {
    const resultados = Array.from(this.restaurantes.values())
      .filter(r => r.activo && r.categoriaId === categoriaId)
      .map(r => r.obtenerDatos());
    return { exito: true, resultados };
  }

  /**
   * Obtener restaurantes por ubicación
   */
  buscarPorUbicacion(ubicacionId) {
    const resultados = Array.from(this.restaurantes.values())
      .filter(r => r.activo && r.ubicacionId === ubicacionId)
      .map(r => r.obtenerDatos());
    return { exito: true, resultados };
  }
}

module.exports = RestaurantService;
