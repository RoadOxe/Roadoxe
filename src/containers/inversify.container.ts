import { Container } from 'inversify';
import {ApplicationService} from "../services/application.service";
import {ApplicationController} from "../controllers/application.controller";
import { LoggerService } from '../services/logger.service';

const container = new Container();
container.bind<ApplicationService>(ApplicationService).to(ApplicationService).inSingletonScope();
container.bind<ApplicationController>(ApplicationController).to(ApplicationController).inSingletonScope();
container.bind<LoggerService>(LoggerService).toSelf();

export const inversifyContainer =  container;
