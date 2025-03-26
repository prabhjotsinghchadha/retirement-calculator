// Jest configuration for CI environments
const baseConfig = require('./jest.config');

module.exports = {
  ...baseConfig,
  // In CI environments, we want to fail on warnings
  ci: true,
  // Create junit test results for CI pipeline
  reporters: ['default', 'jest-junit'],
  // Fail tests if there are any console warnings
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: [
    '<rootDir>/src/setupTests.ts',
    '<rootDir>/jest.ci.setup.js',
  ],
}; 