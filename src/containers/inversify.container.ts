import { Container } from 'inversify'
import 'reflect-metadata'
import { relationalDbModule } from '../modules/relational-db/relational-db.module'
import { ApplicationController } from '../controllers/application.controller'

const container = new Container({ autoBindInjectable: true, defaultScope: 'Singleton' })
container.bind<ApplicationController>(ApplicationController).to(ApplicationController).inSingletonScope()

// Load Modules
container.load(relationalDbModule)

export const inversifyContainer = container
