module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    'react-hooks/exhaustive-deps': 'off',
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'react/no-unstable-nested-components': ['off', { allowAsProps: true }],
  },
};
