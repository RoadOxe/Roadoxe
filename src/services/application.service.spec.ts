import 'reflect-metadata'
import { ApplicationService } from './application.service'

describe('Testing Application Service', () => {
    let applicationService: ApplicationService
    beforeEach(() => {
        applicationService = new ApplicationService()
    })

    it('returns a message with hello world', () => {
        const result = applicationService.sayHello()
        expect(result).toBeDefined()
        expect(result.message).toEqual('Hello, World!')
    })
})
