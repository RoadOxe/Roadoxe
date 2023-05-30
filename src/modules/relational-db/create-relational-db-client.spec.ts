import postgres, { Sql } from 'postgres'
import { createRelationalDbClient } from './create-relational-db-client'
import { camelCaseTransformer } from './camelCaseTransformer'

jest.mock('postgres')

describe('createRelationalDbClient', () => {
    let originalEnv: NodeJS.ProcessEnv

    beforeAll(() => {
    // Store the original environment variables
        originalEnv = { ...process.env }
    })

    afterEach(() => {
    // Reset the environment variables after each test
        process.env = { ...originalEnv }
    })

    test('should create a relational database client with the provided configuration', () => {
    // Set up test environment variables
        process.env.DB_PASSWORD = 'password'
        process.env.DB_USERNAME = 'username'
        process.env.DB_HOST = 'localhost'
        process.env.DB_NAME = 'testdb'

        // Mock the `postgres` function
        const mockedPostgres = jest.fn();
        (postgres as unknown as jest.Mock).mockImplementation(mockedPostgres)

        // Call the function to create the relational database client
        const database = 'testdb'
        const client: Sql = createRelationalDbClient(database)

        // Expect the `postgres` function to be called with the correct arguments
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

        // Expect the returned client to match the mocked `postgres` function
        expect(client).toBe(mockedPostgres.mock.results[0].value)
    })
})
