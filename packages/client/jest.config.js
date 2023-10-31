import dotenv from 'dotenv'
dotenv.config()

export default {
  preset: 'ts-jest/presets/js-with-ts',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testMatch: ['<rootDir>/src/**/*.test.{ts,tsx}'],
  globals: {
    __SERVER_PORT__: process.env.SERVER_PORT,
  },
  moduleNameMapper: {
    '^uuid$': 'uuid',
    '\\.scss$': 'identity-obj-proxy', // для отработки тестов
    '\\.(jpg|jpeg|png)$': 'identity-obj-proxy',
    '\\.(mp3)$': 'identity-obj-proxy',
    '^.+\\.(css|scss)$': '<rootDir>/config/CSSStub.js',
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.svg$': '<rootDir>/svgTransform.cjs',
  },
  transformIgnorePatterns: ['node_modules/(?!(ky|screenfull)/.*)'],
}
