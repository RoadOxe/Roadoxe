/* eslint-disable @typescript-eslint/no-explicit-any */

import { injectable } from 'inversify'
import { RequestHandler } from 'express'

@injectable()
export class MockLoggerService {
    public getLoggerMiddleware(): RequestHandler {
        return (req, res, next) => {
            // Mock implementation of the logger middleware
            console.log('Mock logger middleware')
            next()
        }
    }

    public logError(message: string, ...rest: any[]): void {
    // Mock implementation of logError
        console.error(`[Mock ERROR] ${message}`, ...rest)
    }

    public logWarning(message: string, ...rest: any[]): void {
    // Mock implementation of logWarning
        console.warn(`[Mock WARNING] ${message}`, ...rest)
    }

    public logInfo(message: string, ...rest: any[]): void {
    // Mock implementation of logInfo
        console.log(`[Mock INFO] ${message}`, ...rest)
    }

    public debug(message: string, ...rest: any[]): void {
    // Mock implementation of debug
        console.debug(`[Mock DEBUG] ${message}`, ...rest)
    }
}
