/**
 * Servicio de Categorías
 * Maneja toda la lógica de negocio para categorías
 */
const Categoria = require('../models/Categoria');

class CategoriaService {
  constructor() {
    this.categorias = new Map();
    this.contadorId = 1;
  }

  /**
   * Crear una nueva categoría
   */
  crearCategoria(datos) {
    try {
      const id = this.contadorId++;
      const nuevaCategoria = Categoria.crear({
        id,
        ...datos
      });
      this.categorias.set(id, nuevaCategoria);
      return { exito: true, mensaje: 'Categoría creada', categoria: nuevaCategoria.obtenerDatos() };
    } catch (error) {
      return { exito: false, error: error.message };
    }
  }

  /**
   * Obtener todas las categorías
   */
  obtenerTodas() {
    const lista = Array.from(this.categorias.values())
      .filter(c => c.activa)
      .map(c => c.obtenerDatos());
    return { exito: true, categorias: lista };
  }

  /**
   * Obtener categoría por ID
   */
  obtenerPorId(id) {
    const categoria = this.categorias.get(id);
    if (!categoria) {
      return { exito: false, error: 'Categoría no encontrada' };
    }
    return { exito: true, categoria: categoria.obtenerDatos() };
  }

  /**
   * Actualizar categoría
   */
  actualizar(id, datos) {
    const categoria = this.categorias.get(id);
    if (!categoria) {
      return { exito: false, error: 'Categoría no encontrada' };
    }
    categoria.actualizar(datos);
    return { exito: true, mensaje: 'Categoría actualizada', categoria: categoria.obtenerDatos() };
  }

  /**
   * Desactivar categoría
   */
  desactivar(id) {
    const categoria = this.categorias.get(id);
    if (!categoria) {
      return { exito: false, error: 'Categoría no encontrada' };
    }
    categoria.desactivar();
    return { exito: true, mensaje: 'Categoría desactivada' };
  }

  /**
   * Activar categoría
   */
  activar(id) {
    const categoria = this.categorias.get(id);
    if (!categoria) {
      return { exito: false, error: 'Categoría no encontrada' };
    }
    categoria.activar();
    return { exito: true, mensaje: 'Categoría activada' };
  }

  /**
   * Buscar categorías por nombre
   */
  buscarPorNombre(nombre) {
    const resultados = Array.from(this.categorias.values())
      .filter(c => c.activa && c.nombre.toLowerCase().includes(nombre.toLowerCase()))
      .map(c => c.obtenerDatos());
    return { exito: true, resultados };
  }

  /**
   * Eliminar categoría
   */
  eliminar(id) {
    const categoria = this.categorias.get(id);
    if (!categoria) {
      return { exito: false, error: 'Categoría no encontrada' };
    }
    this.categorias.delete(id);
    return { exito: true, mensaje: 'Categoría eliminada' };
  }
}

module.exports = CategoriaService;
