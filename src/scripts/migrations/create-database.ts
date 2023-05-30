import { inversifyContainer } from '../../containers/inversify.container'
import { LoggerService } from '../../services/logger.service'
import { createRelationalDbClient } from '../../modules/relational-db/create-relational-db-client'

const loggerService = inversifyContainer.get<LoggerService>(LoggerService)

async function createDatabase(databaseName: string) {
    const db = createRelationalDbClient('postgres')
    try {
        await db`CREATE DATABASE ${db(databaseName)}`
    } catch (error: any) {
        if (error.code === '42P04') loggerService.logInfo(`Database with name ${databaseName} already exists. Skipping...`)
        else loggerService.logError('Create Database Error', error)
    } finally {
        await db.end()
    }
}

async function execute() {
    loggerService.debug('Stated Migration Create Database')

    const databases = ['roadoxe', 'roadoxe_test']
    const operations = databases.map(createDatabase)
    await Promise.all(operations)
}

execute()
