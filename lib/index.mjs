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

      // eslint-disable-next-line no-use-before-define
      return ast2dbml(ast);
    },
  },
};

function createProject(ast) {
  return [
    `Project ${ast.name} {`,
    ast.databaseType ? `  database_type: '${ast.databaseType}'` : undefined,
    ast.note ? `  Note: '${ast.note}'` : undefined,
    '}',
    '',
    '',
  ]
    .filter((item) => item !== undefined)
    .join('\n');
}

function ast2dbml(ast) {
  const body = ModelExporter.export(ast, 'dbml', false)
    .replaceAll(/(\W?)"(\w+)"(\W?)/g, '$1$2$3')
    .replaceAll(/(\n)Ref:\s*(\S)/g, '$1Ref: $2');

  if (ast.name) {
    return createProject(ast) + body;
  }

  return body;
}
