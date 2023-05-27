import { ContainerModule } from 'inversify'
import type { RelationalDbClient } from './create-relational-db-client'
import { createRelationalDbClient, RELATIONAL_DB_CLIENT } from './create-relational-db-client'

export const DATABASE = process.env.DB_NAME || 'roadoxe'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const relationalDbModule = new ContainerModule((bind, _unbind) => {
    // RelationalDb connection client
    bind<RelationalDbClient>(RELATIONAL_DB_CLIENT)
        .toDynamicValue((ctx) => createRelationalDbClient(DATABASE))
        .inSingletonScope()
})
