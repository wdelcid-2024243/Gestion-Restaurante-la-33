/**
 * Servicio de Ubicaciones
 * Maneja toda la lógica de negocio para ubicaciones
 */
const Ubicacion = require('../models/Ubicacion');

class UbicacionService {
  constructor() {
    this.ubicaciones = new Map();
    this.contadorId = 1;
  }

  /**
   * Crear una nueva ubicación
   */
  crearUbicacion(datos) {
    try {
      const id = this.contadorId++;
      const nuevaUbicacion = Ubicacion.crear({
        id,
        ...datos
      });
      this.ubicaciones.set(id, nuevaUbicacion);
      return { exito: true, mensaje: 'Ubicación creada', ubicacion: nuevaUbicacion.obtenerDatos() };
    } catch (error) {
      return { exito: false, error: error.message };
    }
  }

  /**
   * Obtener todas las ubicaciones
   */
  obtenerTodas() {
    const lista = Array.from(this.ubicaciones.values())
      .filter(u => u.activa)
      .map(u => u.obtenerDatos());
    return { exito: true, ubicaciones: lista };
  }

  /**
   * Obtener ubicación por ID
   */
  obtenerPorId(id) {
    const ubicacion = this.ubicaciones.get(id);
    if (!ubicacion) {
      return { exito: false, error: 'Ubicación no encontrada' };
    }
    return { exito: true, ubicacion: ubicacion.obtenerDatos() };
  }

  /**
   * Actualizar ubicación
   */
  actualizar(id, datos) {
    const ubicacion = this.ubicaciones.get(id);
    if (!ubicacion) {
      return { exito: false, error: 'Ubicación no encontrada' };
    }
    ubicacion.actualizar(datos);
    return { exito: true, mensaje: 'Ubicación actualizada', ubicacion: ubicacion.obtenerDatos() };
  }

  /**
   * Eliminar ubicación
   */
  eliminar(id) {
    const ubicacion = this.ubicaciones.get(id);
    if (!ubicacion) {
      return { exito: false, error: 'Ubicación no encontrada' };
    }
    ubicacion.activa = false;
    return { exito: true, mensaje: 'Ubicación eliminada' };
  }

  /**
   * Buscar ubicaciones por ciudad
   */
  buscarPorCiudad(ciudad) {
    const resultados = Array.from(this.ubicaciones.values())
      .filter(u => u.activa && u.ciudad.toLowerCase().includes(ciudad.toLowerCase()))
      .map(u => u.obtenerDatos());
    return { exito: true, resultados };
  }

  /**
   * Buscar ubicaciones por país
   */
  buscarPorPais(pais) {
    const resultados = Array.from(this.ubicaciones.values())
      .filter(u => u.activa && u.pais.toLowerCase().includes(pais.toLowerCase()))
      .map(u => u.obtenerDatos());
    return { exito: true, resultados };
  }

  /**
   * Buscar ubicaciones por estado
   */
  buscarPorEstado(estado) {
    const resultados = Array.from(this.ubicaciones.values())
      .filter(u => u.activa && u.estado.toLowerCase().includes(estado.toLowerCase()))
      .map(u => u.obtenerDatos());
    return { exito: true, resultados };
  }

  /**
   * Obtener ubicación completa como texto
   */
  obtenerUbicacionCompleta(id) {
    const ubicacion = this.ubicaciones.get(id);
    if (!ubicacion) {
      return { exito: false, error: 'Ubicación no encontrada' };
    }
    return { exito: true, ubicacionCompleta: ubicacion.obtenerUbicacionCompleta() };
  }

  /**
   * Obtener coordenadas geográficas
   */
  obtenerCoordenadas(id) {
    const ubicacion = this.ubicaciones.get(id);
    if (!ubicacion) {
      return { exito: false, error: 'Ubicación no encontrada' };
    }
    return { exito: true, coordenadas: ubicacion.obtenerCoordenadas() };
  }
}

module.exports = UbicacionService;
