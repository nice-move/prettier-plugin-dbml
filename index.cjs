'use strict';

const { Parser, ModelExporter } = require('@dbml/core');

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
      parse: (data) => Parser.parse(data, 'dbml'),
    },
  },
  printers: {
    [name]: {
      print: (path) => {
        const ast = path.getValue();

        return ModelExporter.export(ast, 'dbml', false);
      },
    },
  },
};
