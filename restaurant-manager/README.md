# Restaurant Manager API

Sistema completo de gestión de restaurantes construido con Node.js y Express.

## Características

- **CRUD Restaurantes**: Crear, leer, actualizar y eliminar restaurantes
- **Gestión de Horarios**: Administrar horarios de apertura y cierre
- **Categorías**: Clasificar restaurantes por tipo de comida
- **Ubicaciones**: Gestionar ubicaciones geográficas con coordenadas

## Estructura del Proyecto

```
restaurant-manager/
├── src/
│   ├── controllers/          # Controladores HTTP
│   │   ├── RestaurantController.js
│   │   ├── HorarioController.js
│   │   ├── CategoriaController.js
│   │   └── UbicacionController.js
│   ├── services/            # Lógica de negocio
│   │   ├── RestaurantService.js
│   │   ├── HorarioService.js
│   │   ├── CategoriaService.js
│   │   └── UbicacionService.js
│   ├── models/              # Modelos de datos
│   │   ├── Restaurant.js
│   │   ├── Horario.js
│   │   ├── Categoria.js
│   │   └── Ubicacion.js
│   ├── routes/              # Rutas API
│   │   ├── restaurantRoutes.js
│   │   ├── horarioRoutes.js
│   │   ├── categoriaRoutes.js
│   │   └── ubicacionRoutes.js
│   ├── config/              # Archivos de configuración
│   ├── middleware/          # Middlewares personalizados
│   └── app.js              # Archivo principal
├── package.json
└── README.md
```

## Instalación

1. Navega al directorio del proyecto:
```bash
cd restaurant-manager
```

2. Instala las dependencias:
```bash
npm install
```

## Uso

### Modo desarrollo (con hot-reload):
```bash
npm run dev
```

### Modo producción:
```bash
npm start
```

La API estará disponible en `http://localhost:3000`

## Endpoints API

### Restaurantes
- `GET /api/restaurantes` - Obtener todos
- `GET /api/restaurantes/:id` - Obtener por ID
- `POST /api/restaurantes` - Crear
- `PUT /api/restaurantes/:id` - Actualizar
- `DELETE /api/restaurantes/:id` - Eliminar
- `GET /api/restaurantes/buscar/nombre?q=nombre` - Buscar por nombre
- `GET /api/restaurantes/categoria/:id` - Filtrar por categoría
- `GET /api/restaurantes/ubicacion/:id` - Filtrar por ubicación

### Horarios
- `GET /api/horarios` - Obtener todos
- `GET /api/horarios/:id` - Obtener por ID
- `POST /api/horarios` - Crear
- `PUT /api/horarios/:id` - Actualizar
- `DELETE /api/horarios/:id` - Eliminar
- `GET /api/horarios/restaurante/:restauranteId` - Obtener horarios de un restaurante
- `GET /api/horarios/dia/:diaSemana` - Obtener por día de semana
- `PATCH /api/horarios/:id/cerrado` - Marcar como cerrado

### Categorías
- `GET /api/categorias` - Obtener todas
- `GET /api/categorias/:id` - Obtener por ID
- `POST /api/categorias` - Crear
- `PUT /api/categorias/:id` - Actualizar
- `DELETE /api/categorias/:id` - Eliminar
- `PATCH /api/categorias/:id/activar` - Activar
- `PATCH /api/categorias/:id/desactivar` - Desactivar
- `GET /api/categorias/buscar?q=nombre` - Buscar por nombre

### Ubicaciones
- `GET /api/ubicaciones` - Obtener todas
- `GET /api/ubicaciones/:id` - Obtener por ID
- `POST /api/ubicaciones` - Crear
- `PUT /api/ubicaciones/:id` - Actualizar
- `DELETE /api/ubicaciones/:id` - Eliminar
- `GET /api/ubicaciones/ciudad/:ciudad` - Buscar por ciudad
- `GET /api/ubicaciones/pais/:pais` - Buscar por país
- `GET /api/ubicaciones/estado/:estado` - Buscar por estado
- `GET /api/ubicaciones/:id/completa` - Obtener ubicación completa
- `GET /api/ubicaciones/:id/coordenadas` - Obtener coordenadas

## Ejemplos de Uso

### Crear una categoría
```bash
curl -X POST http://localhost:3000/api/categorias \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Italiana",
    "descripcion": "Comida italiana tradicional"
  }'
```

### Crear una ubicación
```bash
curl -X POST http://localhost:3000/api/ubicaciones \
  -H "Content-Type: application/json" \
  -d '{
    "direccion": "Calle Principal 123",
    "ciudad": "Madrid",
    "estado": "Madrid",
    "codigoPostal": "28001",
    "pais": "España",
    "latitud": 40.4168,
    "longitud": -3.7038
  }'
```

### Crear un restaurante
```bash
curl -X POST http://localhost:3000/api/restaurantes \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "La Trattoria",
    "descripcion": "Auténtica comida italiana",
    "ubicacionId": 1,
    "categoriaId": 1,
    "horarios": []
  }'
```

### Crear un horario
```bash
curl -X POST http://localhost:3000/api/horarios \
  -H "Content-Type: application/json" \
  -d '{
    "restauranteId": 1,
    "diaSemana": "Lunes",
    "horaApertura": "12:00",
    "horaCierre": "23:00"
  }'
```

## Tecnologías Utilizadas

- **Node.js**: Runtime de JavaScript
- **Express**: Framework web
- **CORS**: Middleware para CORS
- **Nodemon**: Herramienta de desarrollo con hot-reload
- **Jest**: Framework de testing
- **Supertest**: Librería para testing HTTP

## Autor

Tu nombre aquí

## Licencia

MIT
