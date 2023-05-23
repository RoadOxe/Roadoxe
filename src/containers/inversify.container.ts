import { Container } from 'inversify';
import {ApplicationService} from "../services/application.service";
import {ApplicationController} from "../controllers/application.controller";

const container = new Container();
container.bind<ApplicationService>(ApplicationService).to(ApplicationService).inSingletonScope();
container.bind<ApplicationController>(ApplicationController).to(ApplicationController).inSingletonScope();

export const inversifyContainer =  container;
