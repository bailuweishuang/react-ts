module.exports = {
  roots: ['<rootDir>/src'],
  transform: {
      '^.+\\.tsx?$': 'ts-jest',
  },
  testRegex: '^.+\\.test\\.(ts|tsx)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};