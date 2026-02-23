/**
 * Middleware de validación
 * Valida los datos entrantes
 */
const validateRestaurant = (req, res, next) => {
  const { nombre, ubicacionId, categoriaId } = req.body;

  if (!nombre || !ubicacionId || !categoriaId) {
    return res.status(400).json({
      error: 'Validación fallida',
      campos_requeridos: ['nombre', 'ubicacionId', 'categoriaId']
    });
  }

  next();
};

const validateUbicacion = (req, res, next) => {
  const { direccion, ciudad, pais } = req.body;

  if (!direccion || !ciudad || !pais) {
    return res.status(400).json({
      error: 'Validación fallida',
      campos_requeridos: ['direccion', 'ciudad', 'pais']
    });
  }

  next();
};

const validateCategoria = (req, res, next) => {
  const { nombre } = req.body;

  if (!nombre) {
    return res.status(400).json({
      error: 'Validación fallida',
      campos_requeridos: ['nombre']
    });
  }

  next();
};

const validateHorario = (req, res, next) => {
  const { restauranteId, diaSemana, horaApertura, horaCierre } = req.body;

  if (!restauranteId || !diaSemana || !horaApertura || !horaCierre) {
    return res.status(400).json({
      error: 'Validación fallida',
      campos_requeridos: ['restauranteId', 'diaSemana', 'horaApertura', 'horaCierre']
    });
  }

  next();
};

module.exports = {
  validateRestaurant,
  validateUbicacion,
  validateCategoria,
  validateHorario
};
