import http from 'http'
import { setupExpressServer } from './adapters/express'
import { inversifyContainer } from './containers/inversify.container'
import { LoggerService } from './services/logger.service'

const expressApplication = setupExpressServer()

const server = http.createServer(expressApplication)
const loggerService = inversifyContainer.get<LoggerService>(LoggerService)

loggerService.debug('Process', process.env)

server.listen(process.env.PORT, () => {
    loggerService.logInfo('Server started at port 3000')
})
