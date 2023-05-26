import { Container } from 'inversify'
import { ApplicationService } from '../services/application.service'
import { ApplicationController } from '../controllers/application.controller'
import { LoggerService } from '../services/logger.service'
import { relationalDbModule } from '../modules/relational-db/relational-db.module'

const container = new Container()
container.bind<ApplicationService>(ApplicationService).to(ApplicationService).inSingletonScope()
container.bind<ApplicationController>(ApplicationController).to(ApplicationController).inSingletonScope()
container.bind<LoggerService>(LoggerService).toSelf()

// Load Modules
container.load(relationalDbModule)

export const inversifyContainer = container
