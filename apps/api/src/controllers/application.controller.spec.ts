import request from 'supertest'
import express, { Express } from 'express'
import { Container } from 'inversify'
import { InversifyExpressServer } from 'inversify-express-utils'
import { ApplicationService } from '../services/application.service'
import { ApplicationController } from './application.controller'

describe('ApplicationController', () => {
    let app: Express.Application
    let applicationServiceMock: ApplicationService

    beforeAll(() => {
        applicationServiceMock = {
            sayHello: jest.fn().mockReturnValue({ message: 'Hello, World!' }),
        }

        const container = new Container()
        container.bind<ApplicationService>(ApplicationService).toConstantValue(applicationServiceMock)
        container.bind<ApplicationController>(ApplicationController).to(ApplicationController)

        const server = new InversifyExpressServer(container)
        server.setConfig((app) => {
            app.use(express.json())
        })

        app = server.build()
    })

    afterEach(() => {
        jest.resetAllMocks()
    })

    it('should respond with the hello message', async () => {
        const response = await request(app).get('/').expect(200)

        expect(response.body).toEqual({ message: 'Hello, World!' })
        expect(applicationServiceMock.sayHello).toHaveBeenCalled()
    })
})
