import { Parser } from '@dbml/core';
import { ast2dbml } from './lib.mjs';

export { ast2dbml, createProject, normalize } from './lib.mjs';

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

      return ast2dbml(ast);
    },
  },
};
