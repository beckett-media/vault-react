const config = {
  collectCoverageFrom: ['./src/app/**/*.{js,jsx}', './src/*.{js,jsx}'],
  moduleNameMapper: {
    '^.+\\.(css|less|scss)$': '<rootDir>/config/CSSStub.js',
    '\\.(jpg|jpeg|png|svg)$': '<rootDir>/config/fileMock.js',
    // Force module uuid to resolve with the CJS entry point, because Jest does not support package.json.exports. See https://github.com/uuidjs/uuid/issues/451
    uuid: require.resolve('uuid'),
  },
  coverageThreshold: {
    global: {
      lines: 0,
    },
  },
};

module.exports = config;
