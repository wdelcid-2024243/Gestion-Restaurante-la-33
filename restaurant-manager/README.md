# Brasa 33 – Restaurant Manager API

> **Nota**: Este proyecto fue desarrollado originalmente como parte de un curso educativo. La aplicación se ha reorientado para gestionar restaurantes, menús, órdenes y pagos bajo la marca "Brasa 33".

## Descripción

Microservicio de administración para Brasa 33 – Restaurant Manager. Gestiona restaurantes, platillos, órdenes y pagos. Proporciona una API RESTful modular construida con Node.js, Express y MongoDB.

## Módulos Disponibles

- **restaurants**: CRUD de restaurantes
- **menu**: Gestión de platillos por restaurante
- **orders**: Creación y seguimiento de órdenes
- **payments**: Registro de pagos y validaciones asociadas
- **reports**: Consultas analíticas de ventas y órdenes

## Tecnologías Utilizadas

- **Express.js** (v5)
- **Node.js**
- **MongoDB / Mongoose**
- **Cloudinary** para almacenamiento de imágenes
- **JWT** para autenticación
- **Express-validator, Helmet, CORS, rate-limit**

## Endpoints API

Base URL: `http://localhost:{PORT}/brasa33/v1`

### Restaurants (`/restaurants`)
- `GET /restaurants` Lista restaurantes
- `GET /restaurants/:id` Restaurante por ID
- `POST /restaurants` Crear restaurante
- `PUT /restaurants/:id` Actualizar restaurante
- `DELETE /restaurants/:id` Desactivar restaurante

### Menu (`/menu`)
- `GET /menu` Obtener platos (filtrado opcional)
- `GET /menu/:id` Plato por ID
- `POST /menu` Crear plato
- `PUT /menu/:id` Actualizar plato
- `PUT /menu/:id/stock` Ajustar stock
- `DELETE /menu/:id` Desactivar plato

### Orders (`/orders`)
- `POST /orders` Crear orden
- `GET /orders` Listar órdenes (filtro estado)
- `GET /orders/user/:userId` Órdenes por usuario
- `GET /orders/:id` Orden por ID
- `PUT /orders/:id/confirm` Confirmar orden
- `PUT /orders/:id/status` Cambiar estado
- `PUT /orders/:id/cancel` Cancelar orden

### Payments (`/payments`)
- `POST /payments` Registrar pago
- `GET /payments` Listar pagos (filtros)
- `GET /payments/user/:userId` Pagos por usuario
- `GET /payments/:id` Pago por ID

### Reports (`/reports`)
- `GET /reports/revenue` Ingresos totales
- `GET /reports/sales-by-date` Ventas diarias
- `GET /reports/top-products` Productos más vendidos
- `GET /reports/orders-status` Órdenes por estado

## Estructura del Proyecto

```
RestaurantManager/
├── configs/
├── middlewares/
├── src/
│   ├── restaurants/
│   ├── menu/
│   ├── orders/
│   ├── payments/
│   └── reports/
├── helpers/
├── index.js
├── package.json
├── .env
└── README.md
```

## Configuración

### Variables de Entorno
```env
PORT=3000
URI_MONGODB=mongodb://localhost:27017/brasa33_restaurant_manager
JWT_SECRET=tu-secreto-jwt
JWT_EXPIRES_IN=7d
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
ALLOWED_ORIGINS=http://localhost:3000
```

### Instalación

```bash
cd RestaurantManager
pnpm install
cp .env.example .env
# editar .env
pnpm run dev
```

## Salud

```bash
curl http://localhost:3000/brasa33/v1/health
```

Respuesta indicando servicio saludable.

## Licencia
MIT

---

**Brasa 33 – Restaurant Manager**
