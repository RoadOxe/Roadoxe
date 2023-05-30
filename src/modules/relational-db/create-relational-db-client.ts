import type { Sql } from 'postgres'
import postgres from 'postgres'
import { camelCaseTransformer } from './camelCaseTransformer'

export type RelationalDbClient = Sql
export const RELATIONAL_DB_CLIENT = Symbol.for('CreateRelationalDbClient')

export function createRelationalDbClient(database: string): postgres.Sql {
    return postgres({
        password: process.env.DB_PASSWORD,
        username: process.env.DB_USERNAME,
        host: process.env.DB_HOST,
        database: database || process.env.DB_NAME,
        transform: {
            ...camelCaseTransformer,
            undefined: null,
        },
    })
}
