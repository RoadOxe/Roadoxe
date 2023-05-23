import {InversifyExpressServer} from "inversify-express-utils";
import {inversifyContainer} from "../../containers/inversify.container";
import express from 'express'

export function setupExpressServer(): express.Application {
    const server = new InversifyExpressServer(inversifyContainer);
    server.setConfig((app) => {
        app.use(express.json())
    });
    const app = server.build();
    return app;
}