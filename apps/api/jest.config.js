/* eslint-disable */
/** @type {import("ts-jest").JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  setupFiles: ['<rootDir>/src/tests/setup/test-env-setup.ts'],
  setupFilesAfterEnv: ['<rootDir>/src/tests/setup/test-setup.ts'],
  coveragePathIgnorePatterns: ['/node_modules/', '/src/tests', '/src/scripts', '/build/', '/coverage/'],
  testPathIgnorePatterns: ['/node_modules/', '/build/', '/coverage/'],
  testEnvironment: 'node',
}
