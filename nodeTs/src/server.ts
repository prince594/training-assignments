import http from 'http';
import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import logging from './config/logging';
import config from './config/config';
import bookRoutes from './routes/books';
import userRoutes from './routes/user';
import mongoose from 'mongoose';

const NAMESPACE = 'Server';
const app = express();

/* Parsing the incoming request */
app.use(bodyParser.json());

/* Logging Request */
app.use((req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}]`);
    req.on('finish', () => {
        logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], STATUS = [${req.statusCode}]`);
    });
    next();
});

/* Routes */
app.use('/books', bookRoutes);
app.use('/user', userRoutes);

/* Parse the request */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/* Creating Server */
const httpServer = http.createServer(app);
httpServer.listen(config.server.port, () => logging.info(NAMESPACE, `Server is running ${config.server.hostname}:${config.server.port}`));

/* Database connection : ATLAS */
mongoose
    .connect(config.mongo.url, config.mongo.options)
    .then((result) => {
        logging.info(NAMESPACE, 'mongoDB connected');
    })
    .catch((err) => {
        logging.error(NAMESPACE, err.message, err);
    });
