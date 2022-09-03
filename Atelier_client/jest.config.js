module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['./client/src/**/*.jsx'],
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};
