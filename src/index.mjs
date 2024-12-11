import { ModelExporter, Parser } from '@dbml/core';

const name = 'dbml';

export const languages = [
  {
    name: 'DBML',
    parsers: [name],
    extensions: ['.dbml'],
    aceMode: 'text',
    tmScope: 'source.dbml',
  },
];

export const parsers = {
  [name]: {
    astFormat: name,
    parse: (data) => new Parser().parse(data, 'dbmlv2'),
  },
};

export const printers = {
  [name]: {
    print: (path) => {
      const ast = path.getValue();

      return ModelExporter.export(ast, 'dbml', false)
        .replaceAll(/"(\w+)"/g, '$1')
        .replaceAll(/(\n)Ref:(\S)/g, '$1Ref: $2');
    },
  },
};
