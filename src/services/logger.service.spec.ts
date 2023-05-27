import { LoggerService } from './logger.service'

describe('LoggerService', () => {
    let loggerService: LoggerService

    beforeEach(() => {
        loggerService = new LoggerService()
    })

    it('should return a RequestHandler from getLoggerMiddleware', () => {
        const middleware = loggerService.getLoggerMiddleware()
        expect(middleware).toBeDefined()
        expect(typeof middleware).toBe('function')
    })

    it('should log an error message with logError', () => {
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation()

        loggerService.logError('Error occurred', 'Additional details')

        expect(consoleErrorSpy).toHaveBeenCalledWith(
            expect.stringContaining('[ERROR ❌ ] Error occurred'),
            'Additional details',
        )

        consoleErrorSpy.mockRestore()
    })

    it('should log a warning message with logWarning', () => {
        const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation()

        loggerService.logWarning('Warning message', 'Additional details')

        expect(consoleWarnSpy).toHaveBeenCalledWith(
            expect.stringContaining('[WARNING] Warning message'),
            'Additional details',
        )

        consoleWarnSpy.mockRestore()
    })

    it('should log an info message with logInfo', () => {
        const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation()

        loggerService.logInfo('Info message', 'Additional details')

        expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('[INFO] Info message'), 'Additional details')

        consoleLogSpy.mockRestore()
    })

    it('should log a debug message with debug', () => {
        const consoleDebugSpy = jest.spyOn(console, 'debug').mockImplementation()

        loggerService.debug('Debug message', 'Additional details')

        expect(consoleDebugSpy).toHaveBeenCalledWith(expect.stringContaining('[DEBUG] Debug message'), 'Additional details')

        consoleDebugSpy.mockRestore()
    })
})
