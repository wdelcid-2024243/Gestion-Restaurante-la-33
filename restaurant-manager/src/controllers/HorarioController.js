/**
 * Controlador de Horarios
 * Maneja las peticiones HTTP para horarios
 */
const HorarioService = require('../services/HorarioService');

class HorarioController {
  constructor() {
    this.service = new HorarioService();
  }

  /**
   * Crear horario
   * POST /horarios
   */
  crearHorario(req, res) {
    const { restauranteId, diaSemana, horaApertura, horaCierre } = req.body;

    if (!restauranteId || !diaSemana || !horaApertura || !horaCierre) {
      return res.status(400).json({ error: 'Faltan campos requeridos' });
    }

    const resultado = this.service.crearHorario({
      restauranteId,
      diaSemana,
      horaApertura,
      horaCierre
    });

    if (resultado.exito) {
      return res.status(201).json(resultado);
    }
    return res.status(500).json(resultado);
  }

  /**
   * Obtener todos los horarios
   * GET /horarios
   */
  obtenerTodos(req, res) {
    const resultado = this.service.obtenerTodos();
    return res.status(200).json(resultado);
  }

  /**
   * Obtener horario por ID
   * GET /horarios/:id
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
   * Obtener horarios de un restaurante
   * GET /horarios/restaurante/:restauranteId
   */
  obtenerPorRestaurante(req, res) {
    const { restauranteId } = req.params;
    const resultado = this.service.obtenerPorRestaurante(parseInt(restauranteId));
    return res.status(200).json(resultado);
  }

  /**
   * Actualizar horario
   * PUT /horarios/:id
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
   * Eliminar horario
   * DELETE /horarios/:id
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
   * Obtener horarios por día
   * GET /horarios/dia/:diaSemana
   */
  obtenerPorDia(req, res) {
    const { diaSemana } = req.params;
    const resultado = this.service.obtenerPorDia(diaSemana);
    return res.status(200).json(resultado);
  }

  /**
   * Marcar como cerrado
   * PATCH /horarios/:id/cerrado
   */
  marcarCerrado(req, res) {
    const { id } = req.params;
    const { estado } = req.body;

    if (estado === undefined) {
      return res.status(400).json({ error: 'Campo estado requerido' });
    }

    const resultado = this.service.marcarCerrado(parseInt(id), estado);

    if (resultado.exito) {
      return res.status(200).json(resultado);
    }
    return res.status(404).json(resultado);
  }
}

module.exports = HorarioController;
