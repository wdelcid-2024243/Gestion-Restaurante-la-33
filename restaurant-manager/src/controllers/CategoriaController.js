/**
 * Controlador de Categorías
 * Maneja las peticiones HTTP para categorías
 */
const CategoriaService = require('../services/CategoriaService');

class CategoriaController {
  constructor() {
    this.service = new CategoriaService();
  }

  /**
   * Crear categoría
   * POST /categorias
   */
  crearCategoria(req, res) {
    const { nombre, descripcion } = req.body;

    if (!nombre) {
      return res.status(400).json({ error: 'El nombre es requerido' });
    }

    const resultado = this.service.crearCategoria({
      nombre,
      descripcion
    });

    if (resultado.exito) {
      return res.status(201).json(resultado);
    }
    return res.status(500).json(resultado);
  }

  /**
   * Obtener todas las categorías
   * GET /categorias
   */
  obtenerTodas(req, res) {
    const resultado = this.service.obtenerTodas();
    return res.status(200).json(resultado);
  }

  /**
   * Obtener categoría por ID
   * GET /categorias/:id
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
   * Actualizar categoría
   * PUT /categorias/:id
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
   * Desactivar categoría
   * PATCH /categorias/:id/desactivar
   */
  desactivar(req, res) {
    const { id } = req.params;
    const resultado = this.service.desactivar(parseInt(id));

    if (resultado.exito) {
      return res.status(200).json(resultado);
    }
    return res.status(404).json(resultado);
  }

  /**
   * Activar categoría
   * PATCH /categorias/:id/activar
   */
  activar(req, res) {
    const { id } = req.params;
    const resultado = this.service.activar(parseInt(id));

    if (resultado.exito) {
      return res.status(200).json(resultado);
    }
    return res.status(404).json(resultado);
  }

  /**
   * Buscar categorías por nombre
   * GET /categorias/buscar?q=nombre
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
   * Eliminar categoría
   * DELETE /categorias/:id
   */
  eliminar(req, res) {
    const { id } = req.params;
    const resultado = this.service.eliminar(parseInt(id));

    if (resultado.exito) {
      return res.status(200).json(resultado);
    }
    return res.status(404).json(resultado);
  }
}

module.exports = CategoriaController;
