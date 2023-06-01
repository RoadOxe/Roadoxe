/* eslint-disable @typescript-eslint/no-explicit-any */

import postgres from 'postgres'

/**
 * @deprecated only made public for testing. Do not use it directly.
 * source https://github.com/porsager/postgres/blob/6b49449eb72af704d7433b6d85ed46e3177b099f/src/types.js#L335-L343
 * it's almost an exact copy except for typescript types
 */
export function createJsonTransform(fn: (x: string) => string) {
    return function jsonTransform(x: any, column: postgres.Column<string>): any {
        return typeof x === 'object' && x !== null && (column.type === 114 || column.type === 3802)
            ? Array.isArray(x)
                ? x.map((x) => jsonTransform(x, column))
                : Object.entries(x).reduce((acc, [k, v]) => Object.assign(acc, { [fn(k)]: jsonTransform(v, column) }), {})
            : x
    }
}

/**
 * TODO: we don't need a transformer
 *  this is equivalent to the default transformer
 *  as defined here https://github.com/porsager/postgres/blob/6b49449eb72af704d7433b6d85ed46e3177b099f/src/types.js#L345-L350
 *  however, the original transformer had circular references, and for some reason that broke the JSON parsing
 *  I could not figure out if the circular references were necessary
 *  So this is just a best effort to get the JSON parsing to work
 *
 *  Note that replacing their transformer with this one doesn't not actually break their (relational-db.js) tests
 *  so either their tests are not good enough, or this is fine
 */
export const camelCaseTransformer = {
    column: { from: postgres.toCamel, to: postgres.fromCamel },
    value: { from: createJsonTransform(postgres.toCamel) },
}
