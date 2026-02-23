/**
 * Modelo de Ubicación
 * Define la estructura de datos para ubicaciones de restaurantes
 */
class Ubicacion {
  constructor(id, direccion, ciudad, estado, codigoPostal, pais, latitud, longitud) {
    this.id = id;
    this.direccion = direccion;
    this.ciudad = ciudad;
    this.estado = estado;
    this.codigoPostal = codigoPostal;
    this.pais = pais;
    this.latitud = latitud;
    this.longitud = longitud;
    this.activa = true;
    this.fechaCreacion = new Date();
    this.fechaActualizacion = new Date();
  }

  static crear(datos) {
    return new Ubicacion(
      datos.id,
      datos.direccion,
      datos.ciudad,
      datos.estado,
      datos.codigoPostal,
      datos.pais,
      datos.latitud,
      datos.longitud
    );
  }

  obtenerDatos() {
    return {
      id: this.id,
      direccion: this.direccion,
      ciudad: this.ciudad,
      estado: this.estado,
      codigoPostal: this.codigoPostal,
      pais: this.pais,
      latitud: this.latitud,
      longitud: this.longitud,
      activa: this.activa,
      fechaCreacion: this.fechaCreacion,
      fechaActualizacion: this.fechaActualizacion
    };
  }

  actualizar(datos) {
    if (datos.direccion) this.direccion = datos.direccion;
    if (datos.ciudad) this.ciudad = datos.ciudad;
    if (datos.estado) this.estado = datos.estado;
    if (datos.codigoPostal) this.codigoPostal = datos.codigoPostal;
    if (datos.pais) this.pais = datos.pais;
    if (datos.latitud) this.latitud = datos.latitud;
    if (datos.longitud) this.longitud = datos.longitud;
    this.fechaActualizacion = new Date();
  }

  obtenerUbicacionCompleta() {
    return `${this.direccion}, ${this.ciudad}, ${this.estado} ${this.codigoPostal}, ${this.pais}`;
  }

  obtenerCoordenadas() {
    return {
      latitud: this.latitud,
      longitud: this.longitud
    };
  }
}

module.exports = Ubicacion;
