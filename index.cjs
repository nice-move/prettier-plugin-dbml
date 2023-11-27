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
      parse: (data) => new Parser().parse(data, 'dbmlv2'),
    },
  },
  printers: {
    [name]: {
      print: (path) => {
        const ast = path.getValue();

        const output = ModelExporter.export(ast, 'dbml', false);

        return output.replaceAll(/Note:\s'([\S\s]+)'/g, "Note: '''$1'''");
      },
    },
  },
};
