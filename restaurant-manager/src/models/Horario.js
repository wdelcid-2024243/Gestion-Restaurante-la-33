/**
 * Modelo de Horario
 * Define la estructura de datos para horarios de restaurantes
 */
class Horario {
  constructor(id, restauranteId, diaSemana, horaApertura, horaCierre) {
    this.id = id;
    this.restauranteId = restauranteId;
    this.diaSemana = diaSemana; // Lunes, Martes, etc.
    this.horaApertura = horaApertura; // Formato HH:MM
    this.horaCierre = horaCierre; // Formato HH:MM
    this.cerrado = false;
    this.fechaCreacion = new Date();
  }

  static crear(datos) {
    return new Horario(
      datos.id,
      datos.restauranteId,
      datos.diaSemana,
      datos.horaApertura,
      datos.horaCierre
    );
  }

  obtenerDatos() {
    return {
      id: this.id,
      restauranteId: this.restauranteId,
      diaSemana: this.diaSemana,
      horaApertura: this.horaApertura,
      horaCierre: this.horaCierre,
      cerrado: this.cerrado,
      fechaCreacion: this.fechaCreacion
    };
  }

  marcarCerrado(estado) {
    this.cerrado = estado;
  }

  actualizar(datos) {
    if (datos.horaApertura) this.horaApertura = datos.horaApertura;
    if (datos.horaCierre) this.horaCierre = datos.horaCierre;
    if (datos.cerrado !== undefined) this.cerrado = datos.cerrado;
  }
}

module.exports = Horario;
