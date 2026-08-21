import test from 'ava';
import { Parser } from '@dbml/core';

import { ast2dbml, createProject, normalize } from '../lib/lib.mjs';

test('createProject', (t) => {
  t.snapshot(
    createProject({
      name: 'project_name',
      databaseType: 'PostgreSQL',
      note: 'Description of the project',
    }),
  );
});

test('normalize', (t) => {
  t.snapshot(
    normalize(
      `
Table t {
  "column" "integer" [note: 'keep "quoted" text']
}
    `.trim(),
    ),
  );
});

test('ast2dbml', (t) => {
  const ast = new Parser().parse(
    `
      Project project_name {
        database_type: 'PostgreSQL'
      }

      Table t as T {
        "column" "integer" [note: 'keep "quoted" text']
      }

      Table u {
        "column" "integer"
      }

      Ref: T.column < u.column
    `.trim(),
    'dbmlv2',
  );

  t.snapshot(ast2dbml(ast));
});
