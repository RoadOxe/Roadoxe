import { inversifyContainer } from './inversify.container'
import { ApplicationController } from '../controllers/application.controller'
import { ApplicationService } from '../services/application.service'
import { LoggerService } from '../services/logger.service'

describe('Inversify Container Configuration', () => {
    it('properly binds application controller to the scope', () => {
        const applicationController = inversifyContainer.get<ApplicationController>(ApplicationController)
        expect(applicationController).toBeInstanceOf(ApplicationController)
    })

    it('properly auto binds application service to the scope', () => {
        const applicationService = inversifyContainer.get<ApplicationService>(ApplicationService)
        expect(applicationService).toBeInstanceOf(ApplicationService)
    })

    it('properly auto binds loggerService to the scope', () => {
        const loggerService = inversifyContainer.get<LoggerService>(LoggerService)
        expect(loggerService).toBeInstanceOf(LoggerService)
    })
})
