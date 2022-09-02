'use strict';

const { importer } = require('@dbml/core');

const name = 'dbml';

module.exports = {
  languages: [
    {
      name: 'DBML',
      parsers: [name],
      extensions: ['.dbml'],
      aceMode: 'text',
      tmScope: 'source.dbml',
    },
  ],
  parsers: {
    [name]: {
      astFormat: name,
      parse: (data) => data,
    },
  },
  printers: {
    [name]: {
      print: (path) => {
        const ast = path.getValue();

        return importer.import(ast, 'dbml');
      },
    },
  },
};
