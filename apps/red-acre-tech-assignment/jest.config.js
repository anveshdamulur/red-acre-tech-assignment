module.exports = {
  displayName: 'red-acre-tech-assignment',
  preset: '../../jest.preset.js',
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nrwl/react/plugins/jest',
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/apps/red-acre-tech-assignment',
  setupFiles: ['<rootDir>/jest.stub.js'],
};
