'use strict'

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import { dbConnection } from './db.js';
import { corsOptions } from './cors.configuration.js';
import { helmetOptions } from './helmet.configuration.js';
import { requestLimit } from './rateLimit.configuration.js';
import { requestLogger } from '../src/middlewares/requestLogger.js';
import { notFound } from '../src/middlewares/notFound.js';
import { errorHandler } from '../src/middlewares/errorHandler.js';

// 🔥 SWAGGER (AGREGADO)
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from '../swagger.js';

const BASE_PATH = '/brasa33/v1';

// route modules
import restaurantsRouter from '../src/restaurants/restaurant.routes.js';
import menuRouter from '../src/menu/menu.routes.js';
import ordersRouter from '../src/orders/order.routes.js';
import paymentsRouter from '../src/payments/payment.routes.js';
import reportsRouter from '../src/reports/report.routes.js';
import reservationsRouter from '../src/reservations/reservation.routes.js';

const middlewares = (app) => {
    app.use(express.urlencoded({extended: false, limit: '10mb'}));
    app.use(express.json({limit: '10mb'}));
    app.use(cors(corsOptions));
    app.use(morgan('dev'));
    app.use(helmet(helmetOptions));
    // log every request when not in production
    app.use(requestLogger);
};

const routes = (app) => {

    // 🔥 SWAGGER (AGREGADO)
    app.use(
        `${BASE_PATH}/docs`,
        swaggerUi.serve,
        swaggerUi.setup(swaggerSpec)
    );

    app.get(`${BASE_PATH}/health`, (req, res) =>{
        res.status(200).json({
            status: 'healthy',
            service: 'Brasa 33 Restaurant Manager Server'
        })
    })

    // core routes
    app.use(`${BASE_PATH}/restaurants`, restaurantsRouter);
    app.use(`${BASE_PATH}/menu`, menuRouter);
    app.use(`${BASE_PATH}/orders`, ordersRouter);
    app.use(`${BASE_PATH}/payments`, paymentsRouter);
    app.use(`${BASE_PATH}/reports`, reportsRouter);
    app.use(`${BASE_PATH}/reservations`, reservationsRouter);

    // catch-all for undefined routes
    app.use(notFound);
}

export const initServer = async() => {
    const app = express();
    const PORT = process.env.PORT;
    app.set('trust proxy', 1);

    try{
        await dbConnection();
        middlewares(app);
        routes(app);
        // global error handler (must come after routes)
        app.use(errorHandler);
        app.listen(PORT, () => {
            console.log(`Brasa 33 Restaurant Manager API is running successfully`);
            console.log(`Health check: http://localhost:${PORT}${BASE_PATH}/health`);
        });
    }catch(err){
        console.error(`Error al iniciar el servidor: ${err.message}`)
        process.exit(1);
    }
};