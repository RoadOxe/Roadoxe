import { Container } from 'inversify'
import express from 'express'
import request from 'supertest'
import { setupExpressServer } from './index'
import { inversifyContainer } from '../../containers/inversify.container'
import { MockController } from '../../tests/mocks/controller.mock'
import { MockLoggerService } from '../../tests/mocks/logger.mock'
import { LoggerService } from '../../services/logger.service'

jest.mock('../../containers/inversify.container', () => ({
    inversifyContainer: new Container(),
}))

describe('setupExpressServer', () => {
    let app: express.Application

    beforeEach(() => {
        inversifyContainer.bind<MockController>(MockController)
        inversifyContainer.bind<LoggerService>(LoggerService).to(MockLoggerService)
        app = setupExpressServer()
    })

    afterEach(() => {
        jest.clearAllMocks()
        inversifyContainer.unbindAll()
    })

    it('should configure express app with JSON middleware', () => {
        return request(app)
            .get('/api')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect((res) => {
                expect(res.body).toEqual({ message: 'Success' })
            })
    })

    it('should configure express app with logger middleware', () => {
        const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation()
        return request(app)
            .get('/api')
            .expect(() => {
                expect(consoleLogSpy).toHaveBeenCalledWith('Mock logger middleware')
            })
    })
})
