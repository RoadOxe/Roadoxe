import postgres, { Sql } from 'postgres'
import { createRelationalDbClient } from './create-relational-db-client'
import { camelCaseTransformer } from './camelCaseTransformer'

jest.mock('postgres')

describe('createRelationalDbClient', () => {
    let originalEnv: NodeJS.ProcessEnv

    beforeAll(() => {
        originalEnv = { ...process.env }
    })

    afterEach(() => {
        process.env = { ...originalEnv }
    })

    test('should create a relational database client with the provided configuration', () => {
        process.env.DB_PASSWORD = 'password'
        process.env.DB_USERNAME = 'username'
        process.env.DB_HOST = 'localhost'
        process.env.DB_NAME = 'testdb'

        const mockedPostgres = jest.fn();
        (postgres as unknown as jest.Mock).mockImplementation(mockedPostgres)

        const database = 'testdb'
        const client: Sql = createRelationalDbClient(database)

        expect(mockedPostgres).toHaveBeenCalledWith({
            password: 'password',
            username: 'username',
            host: 'localhost',
            database: 'testdb',
            transform: {
                ...camelCaseTransformer,
                undefined: null,
            },
        })

        expect(client).toBe(mockedPostgres.mock.results[0].value)
    })
})
