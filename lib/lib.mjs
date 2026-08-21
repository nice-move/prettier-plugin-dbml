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

function restoreAliases(data, ast) {
  if (!ast.aliases?.length) {
    return data;
  }

  const aliases = new Map(
    ast.aliases
      .filter((item) => item.kind === 'table')
      .map(({ name, value }) => [
        `${value.schemaName ? `${value.schemaName}.` : ''}${value.tableName}`,
        name,
      ]),
  );

  return data.replaceAll(/^Ref: (.+)$/gm, (line, reference) => {
    for (const [tableName, alias] of aliases) {
      reference = reference.replaceAll(`${tableName}.`, `${alias}.`);
    }

    return `Ref: ${reference}`;
  });
}

export function ast2dbml(ast) {
  const exportedBody = ModelExporter.export(ast, 'dbml', {
    isNormalized: true,
  });
  const normalizedBody = normalize(exportedBody);

  const body = restoreAliases(
    normalizedBody.replaceAll(/(\n)Ref:\s*(\S)/g, '$1Ref: $2'),
    ast,
  );

  if (ast.name) {
    return createProject(ast) + body;
  }

  return body;
}
