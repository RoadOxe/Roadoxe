/* eslint-disable */
/** @type {import("ts-jest").JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  setupFiles: ['<rootDir>/src/tests/test-env-setup.ts'],
  testEnvironment: 'node',
}
