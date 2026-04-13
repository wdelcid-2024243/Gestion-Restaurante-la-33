import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Restaurante",
      version: "1.0.0",
      description: "Documentación de la API del restaurante: menú, órdenes, pagos, reportes, reservaciones y restaurantes",
    },
  },
  apis: ["./src/**/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;