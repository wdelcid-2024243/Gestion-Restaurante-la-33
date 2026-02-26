/**
 * Modelo de Categoría
 * Define la estructura de datos para categorías de restaurantes
 */
class Categoria {
  constructor(id, nombre, descripcion) {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.activa = true;
    this.fechaCreacion = new Date();
    this.fechaActualizacion = new Date();
  }

  static crear(datos) {
    return new Categoria(datos.id, datos.nombre, datos.descripcion);
  }

  obtenerDatos() {
    return {
      id: this.id,
      nombre: this.nombre,
      descripcion: this.descripcion,
      activa: this.activa,
      fechaCreacion: this.fechaCreacion,
      fechaActualizacion: this.fechaActualizacion
    };
  }

  actualizar(datos) {
    if (datos.nombre) this.nombre = datos.nombre;
    if (datos.descripcion) this.descripcion = datos.descripcion;
    if (datos.activa !== undefined) this.activa = datos.activa;
    this.fechaActualizacion = new Date();
  }

  desactivar() {
    this.activa = false;
    this.fechaActualizacion = new Date();
  }

  activar() {
    this.activa = true;
    this.fechaActualizacion = new Date();
  }
}

module.exports = Categoria;
