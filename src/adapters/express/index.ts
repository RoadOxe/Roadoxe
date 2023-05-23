import {InversifyExpressServer} from "inversify-express-utils";
import {inversifyContainer} from "../../containers/inversify.container";
import express from 'express'
import { LoggerService } from "../../services/logger.service";

export function setupExpressServer(): express.Application {
    const loggerService = inversifyContainer.get<LoggerService>(LoggerService)
    const server = new InversifyExpressServer(inversifyContainer);
    server.setConfig((app) => {
        app.use(express.json())
        app.use(loggerService.getLoggerMiddleware());
    });
    const app = server.build();
    return app;
}