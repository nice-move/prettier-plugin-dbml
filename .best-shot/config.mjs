export const config = {
  target: 'node20',
  entry: {
    index: './src/index.mjs',
  },
  output: {
    path: 'dist',
    module: true,
    library: {
      type: 'module',
    },
  },
  externals: {
    '@dbml/core': 'module @dbml/core',
  },
};
