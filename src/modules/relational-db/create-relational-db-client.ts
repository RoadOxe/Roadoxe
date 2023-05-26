import type { interfaces } from 'inversify'
import type { Sql } from 'postgres'
import postgres from 'postgres'
import { DATABASE } from './relational-db.module'
import { camelCaseTransformer } from './camelCaseTransformer'

export type RelationalDbClient = Sql
export const RELATIONAL_DB_CLIENT = Symbol.for('CreateRelationalDbClient')

export function createRelationalDbClient(container: interfaces.Container, database = DATABASE): postgres.Sql {
    return postgres({
        password: process.env.DB_PASSWORD,
        username: process.env.DB_USERNAME,
        host: process.env.DB_HOST,
        database,
        transform: {
            ...camelCaseTransformer,
            undefined: null,
        },
    })
}
