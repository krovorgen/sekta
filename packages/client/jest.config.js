import dotenv from 'dotenv'
dotenv.config()

export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/src/**/*.test.{ts,tsx}'],
  globals: {
    __SERVER_PORT__: process.env.SERVER_PORT,
  },
  moduleNameMapper: {
    '^uuid$': 'uuid',
    '^.+\\.(css|scss)$': '<rootDir>/config/CSSStub.js',
  },
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.svg$": "<rootDir>/svgTransform.cjs"
  },
}
