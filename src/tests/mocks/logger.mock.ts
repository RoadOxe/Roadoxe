/* eslint-disable @typescript-eslint/no-explicit-any */

import { injectable } from 'inversify'
import { RequestHandler } from 'express'

@injectable()
export class MockLoggerService {
    public getLoggerMiddleware(): RequestHandler {
        return (req, res, next) => {
            console.log('Mock logger middleware')
            next()
        }
    }

    public logError(message: string, ...rest: any[]): void {
        console.error(`[Mock ERROR] ${message}`, ...rest)
    }

    public logWarning(message: string, ...rest: any[]): void {
        console.warn(`[Mock WARNING] ${message}`, ...rest)
    }

    public logInfo(message: string, ...rest: any[]): void {
        console.log(`[Mock INFO] ${message}`, ...rest)
    }

    public debug(message: string, ...rest: any[]): void {
        console.debug(`[Mock DEBUG] ${message}`, ...rest)
    }
}
