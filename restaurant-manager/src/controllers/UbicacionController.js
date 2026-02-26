/**
 * Controlador de Ubicaciones
 * Maneja las peticiones HTTP para ubicaciones
 */
const UbicacionService = require('../services/UbicacionService');

class UbicacionController {
  constructor() {
    this.service = new UbicacionService();
  }

  /**
   * Crear ubicación
   * POST /ubicaciones
   */
  crearUbicacion(req, res) {
    const { direccion, ciudad, estado, codigoPostal, pais, latitud, longitud } = req.body;

    if (!direccion || !ciudad || !pais) {
      return res.status(400).json({ error: 'Faltan campos requeridos' });
    }

    const resultado = this.service.crearUbicacion({
      direccion,
      ciudad,
      estado,
      codigoPostal,
      pais,
      latitud,
      longitud
    });

    if (resultado.exito) {
      return res.status(201).json(resultado);
    }
    return res.status(500).json(resultado);
  }

  /**
   * Obtener todas las ubicaciones
   * GET /ubicaciones
   */
  obtenerTodas(req, res) {
    const resultado = this.service.obtenerTodas();
    return res.status(200).json(resultado);
  }

  /**
   * Obtener ubicación por ID
   * GET /ubicaciones/:id
   */
  obtenerPorId(req, res) {
    const { id } = req.params;
    const resultado = this.service.obtenerPorId(parseInt(id));

    if (resultado.exito) {
      return res.status(200).json(resultado);
    }
    return res.status(404).json(resultado);
  }

  /**
   * Actualizar ubicación
   * PUT /ubicaciones/:id
   */
  actualizar(req, res) {
    const { id } = req.params;
    const datos = req.body;

    const resultado = this.service.actualizar(parseInt(id), datos);

    if (resultado.exito) {
      return res.status(200).json(resultado);
    }
    return res.status(404).json(resultado);
  }

  /**
   * Eliminar ubicación
   * DELETE /ubicaciones/:id
   */
  eliminar(req, res) {
    const { id } = req.params;
    const resultado = this.service.eliminar(parseInt(id));

    if (resultado.exito) {
      return res.status(200).json(resultado);
    }
    return res.status(404).json(resultado);
  }

  /**
   * Buscar ubicaciones por ciudad
   * GET /ubicaciones/ciudad/:ciudad
   */
  buscarPorCiudad(req, res) {
    const { ciudad } = req.params;
    const resultado = this.service.buscarPorCiudad(ciudad);
    return res.status(200).json(resultado);
  }

  /**
   * Buscar ubicaciones por país
   * GET /ubicaciones/pais/:pais
   */
  buscarPorPais(req, res) {
    const { pais } = req.params;
    const resultado = this.service.buscarPorPais(pais);
    return res.status(200).json(resultado);
  }

  /**
   * Buscar ubicaciones por estado
   * GET /ubicaciones/estado/:estado
   */
  buscarPorEstado(req, res) {
    const { estado } = req.params;
    const resultado = this.service.buscarPorEstado(estado);
    return res.status(200).json(resultado);
  }

  /**
   * Obtener ubicación completa
   * GET /ubicaciones/:id/completa
   */
  obtenerUbicacionCompleta(req, res) {
    const { id } = req.params;
    const resultado = this.service.obtenerUbicacionCompleta(parseInt(id));

    if (resultado.exito) {
      return res.status(200).json(resultado);
    }
    return res.status(404).json(resultado);
  }

  /**
   * Obtener coordenadas
   * GET /ubicaciones/:id/coordenadas
   */
  obtenerCoordenadas(req, res) {
    const { id } = req.params;
    const resultado = this.service.obtenerCoordenadas(parseInt(id));

    if (resultado.exito) {
      return res.status(200).json(resultado);
    }
    return res.status(404).json(resultado);
  }
}

module.exports = UbicacionController;
