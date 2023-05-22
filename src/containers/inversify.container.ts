import { Container } from 'inversify';
import {ApplicationLogic} from "../main/appLogic.main";
import {ExpressAdapter} from "../adapters/express/express.adapter";

const container = new Container();
container.bind<ApplicationLogic>(ApplicationLogic).to(ApplicationLogic).inSingletonScope();
container.bind<ExpressAdapter>(ExpressAdapter).to(ExpressAdapter).inSingletonScope();

export const inversifyContainer =  container;
