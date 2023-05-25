/* eslint-disable @typescript-eslint/no-explicit-any */
import { injectable } from 'inversify'
import { RequestHandler } from 'express'
import morgan from 'morgan'
import colors from 'colors'

@injectable()
export class LoggerService {
    public getLoggerMiddleware(): RequestHandler {
        return morgan('combined')
    }

    public logError(message: string, ...rest: any[]): void {
        console.error(colors.red(`[ERROR ❌ ] ${message}`), ...rest)
    }

    public logWarning(message: string, ...rest: any[]): void {
        console.warn(colors.yellow(`[WARNING] ${message}`), ...rest)
    }

    public logInfo(message: string, ...rest: any[]): void {
        console.log(colors.blue(`[INFO] ${message}`), ...rest)
    }

    public debug(message: string, ...rest: any[]): void {
        console.debug(colors.cyan(`[DEBUG] ${message}`), ...rest)
    }
}
