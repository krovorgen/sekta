import dotenv from 'dotenv'
dotenv.config()

export default {
  preset: 'ts-jest/presets/js-with-ts',
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/src/**/*.test.{ts,tsx}'],
  globals: {
    __SERVER_PORT__: process.env.SERVER_PORT,
  },
  moduleNameMapper: {
    '^uuid$': 'uuid',
    '^.+\\.(css|scss)$': '<rootDir>/config/CSSStub.js',
    '\\.scss$': 'identity-obj-proxy', //для отработки тестов, но не помогает
  },
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.svg$": "<rootDir>/svgTransform.cjs"
  },
  transformIgnorePatterns: ['node_modules/(?!ky/.*)'],
}
