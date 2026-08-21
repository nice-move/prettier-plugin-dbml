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
      `Table t {\n  "column" "integer" [note: 'keep "quoted" text']\n}`,
    ),
  );
});

test('ast2dbml', (t) => {
  const ast = new Parser().parse(
    `Project project_name {\n  database_type: 'PostgreSQL'\n}\n\nTable t {\n  "column" "integer" [note: 'keep "quoted" text']\n}`,
    'dbmlv2',
  );

  t.snapshot(ast2dbml(ast));
});
