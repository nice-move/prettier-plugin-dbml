import base from '@nice-move/all-in-base/eslint';

export default [
  ...base,
  {
    settings: {
      'import-x/ignore': '^@dbml/core$',
    },
  },
];
