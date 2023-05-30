import { ContainerModule } from 'inversify'
import type { RelationalDbClient } from './create-relational-db-client'
import { createRelationalDbClient, RELATIONAL_DB_CLIENT } from './create-relational-db-client'

export const DATABASE = process.env.DB_NAME || 'roadoxe'

export const relationalDbModule = new ContainerModule((bind) => {
    // RelationalDb connection client
    bind<RelationalDbClient>(RELATIONAL_DB_CLIENT)
        .toDynamicValue(() => createRelationalDbClient(DATABASE))
        .inSingletonScope()
})
