/**
 * Modelo de Restaurante
 * Define la estructura de datos para un restaurante
 */
class Restaurant {
  constructor(id, nombre, descripcion, ubicacionId, categoriaId, horarios) {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.ubicacionId = ubicacionId;
    this.categoriaId = categoriaId;
    this.horarios = horarios || [];
    this.activo = true;
    this.fechaCreacion = new Date();
    this.fechaActualizacion = new Date();
  }

  static crear(datos) {
    return new Restaurant(
      datos.id,
      datos.nombre,
      datos.descripcion,
      datos.ubicacionId,
      datos.categoriaId,
      datos.horarios
    );
  }

  obtenerDatos() {
    return {
      id: this.id,
      nombre: this.nombre,
      descripcion: this.descripcion,
      ubicacionId: this.ubicacionId,
      categoriaId: this.categoriaId,
      horarios: this.horarios,
      activo: this.activo,
      fechaCreacion: this.fechaCreacion,
      fechaActualizacion: this.fechaActualizacion
    };
  }

  actualizar(datos) {
    if (datos.nombre) this.nombre = datos.nombre;
    if (datos.descripcion) this.descripcion = datos.descripcion;
    if (datos.ubicacionId) this.ubicacionId = datos.ubicacionId;
    if (datos.categoriaId) this.categoriaId = datos.categoriaId;
    if (datos.horarios) this.horarios = datos.horarios;
    this.fechaActualizacion = new Date();
  }
}

module.exports = Restaurant;
