import {InversifyExpressServer} from "inversify-express-utils";
import {inversifyContainer} from "../../containers/inversify.container";
import express from 'express'

export function setupExpressServer(): void {
    const server = new InversifyExpressServer(inversifyContainer);
    server.setConfig((app) => {
        app.use(express.json())
    });
    const app = server.build();
    app.listen(3000, () => {
        console.log('Server listening on port 3000');
    });
}