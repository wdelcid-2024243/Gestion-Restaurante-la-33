/**
 * Servicio de Horarios
 * Maneja toda la lógica de negocio para horarios
 */
const Horario = require('../models/Horario');

class HorarioService {
  constructor() {
    this.horarios = new Map();
    this.contadorId = 1;
  }

  /**
   * Crear un nuevo horario
   */
  crearHorario(datos) {
    try {
      const id = this.contadorId++;
      const nuevoHorario = Horario.crear({
        id,
        ...datos
      });
      this.horarios.set(id, nuevoHorario);
      return { exito: true, mensaje: 'Horario creado', horario: nuevoHorario.obtenerDatos() };
    } catch (error) {
      return { exito: false, error: error.message };
    }
  }

  /**
   * Obtener todos los horarios
   */
  obtenerTodos() {
    const lista = Array.from(this.horarios.values()).map(h => h.obtenerDatos());
    return { exito: true, horarios: lista };
  }

  /**
   * Obtener horario por ID
   */
  obtenerPorId(id) {
    const horario = this.horarios.get(id);
    if (!horario) {
      return { exito: false, error: 'Horario no encontrado' };
    }
    return { exito: true, horario: horario.obtenerDatos() };
  }

  /**
   * Obtener horarios de un restaurante
   */
  obtenerPorRestaurante(restauranteId) {
    const resultados = Array.from(this.horarios.values())
      .filter(h => h.restauranteId === restauranteId)
      .map(h => h.obtenerDatos());
    return { exito: true, horarios: resultados };
  }

  /**
   * Actualizar horario
   */
  actualizar(id, datos) {
    const horario = this.horarios.get(id);
    if (!horario) {
      return { exito: false, error: 'Horario no encontrado' };
    }
    horario.actualizar(datos);
    return { exito: true, mensaje: 'Horario actualizado', horario: horario.obtenerDatos() };
  }

  /**
   * Eliminar horario
   */
  eliminar(id) {
    if (!this.horarios.has(id)) {
      return { exito: false, error: 'Horario no encontrado' };
    }
    this.horarios.delete(id);
    return { exito: true, mensaje: 'Horario eliminado' };
  }

  /**
   * Obtener horarios por día de la semana
   */
  obtenerPorDia(diaSemana) {
    const resultados = Array.from(this.horarios.values())
      .filter(h => h.diaSemana.toLowerCase() === diaSemana.toLowerCase())
      .map(h => h.obtenerDatos());
    return { exito: true, horarios: resultados };
  }

  /**
   * Marcar restaurante como cerrado en un día específico
   */
  marcarCerrado(id, estado) {
    const horario = this.horarios.get(id);
    if (!horario) {
      return { exito: false, error: 'Horario no encontrado' };
    }
    horario.marcarCerrado(estado);
    return { exito: true, mensaje: 'Estado actualizado', horario: horario.obtenerDatos() };
  }
}

module.exports = HorarioService;
