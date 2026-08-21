import { ModelExporter } from '@dbml/core';

export function createProject(ast) {
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

export function normalize(data) {
  return data.replaceAll(
    /'''[\s\S]*?'''|'(?:\\.|[^'\\])*'|"(\w+)"/g,
    (match, identifier) => identifier ?? match,
  );
}

export function ast2dbml(ast) {
  const exportedBody = ModelExporter.export(ast, 'dbml', {
    isNormalized: true,
  });
  const normalizedBody = normalize(exportedBody);

  const body = normalizedBody.replaceAll(/(\n)Ref:\s*(\S)/g, '$1Ref: $2');

  if (ast.name) {
    return createProject(ast) + body;
  }

  return body;
}
