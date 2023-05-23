import 'reflect-metadata';
import http from 'http';
import { setupExpressServer } from "./adapters/express";

const expressApplication = setupExpressServer();

const server = http.createServer(expressApplication);

server.listen('3000', () => {
    console.log('Server started at port 3000')
})