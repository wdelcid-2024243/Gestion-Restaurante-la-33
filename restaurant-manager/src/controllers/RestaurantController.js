/**
 * Controlador de Restaurantes
 * Maneja las peticiones HTTP para restaurantes
 */
const RestaurantService = require('../services/RestaurantService');

class RestaurantController {
  constructor() {
    this.service = new RestaurantService();
  }

  /**
   * Crear restaurante
   * POST /restaurantes
   */
  crearRestaurante(req, res) {
    const { nombre, descripcion, ubicacionId, categoriaId, horarios } = req.body;

    if (!nombre || !ubicacionId || !categoriaId) {
      return res.status(400).json({ error: 'Faltan campos requeridos' });
    }

    const resultado = this.service.crearRestaurante({
      nombre,
      descripcion,
      ubicacionId,
      categoriaId,
      horarios
    });

    if (resultado.exito) {
      return res.status(201).json(resultado);
    }
    return res.status(500).json(resultado);
  }

  /**
   * Obtener todos los restaurantes
   * GET /restaurantes
   */
  obtenerTodos(req, res) {
    const resultado = this.service.obtenerTodos();
    return res.status(200).json(resultado);
  }

  /**
   * Obtener restaurante por ID
   * GET /restaurantes/:id
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
   * Actualizar restaurante
   * PUT /restaurantes/:id
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
   * Eliminar restaurante
   * DELETE /restaurantes/:id
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
   * Buscar por nombre
   * GET /restaurantes/buscar/nombre?q=nombre
   */
  buscarPorNombre(req, res) {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({ error: 'Parámetro de búsqueda requerido' });
    }

    const resultado = this.service.buscarPorNombre(q);
    return res.status(200).json(resultado);
  }

  /**
   * Buscar por categoría
   * GET /restaurantes/categoria/:id
   */
  buscarPorCategoria(req, res) {
    const { id } = req.params;
    const resultado = this.service.buscarPorCategoria(parseInt(id));
    return res.status(200).json(resultado);
  }

  /**
   * Buscar por ubicación
   * GET /restaurantes/ubicacion/:id
   */
  buscarPorUbicacion(req, res) {
    const { id } = req.params;
    const resultado = this.service.buscarPorUbicacion(parseInt(id));
    return res.status(200).json(resultado);
  }
}

module.exports = RestaurantController;
