import test from 'ava';
import { format } from 'prettier';
import prettier from 'prettier-2';

import plugin from '../index.cjs';

async function pretty(t, string, options) {
  const func1 = (input) => format(input, { plugins: [plugin], ...options });

  const result1 = await func1(string);

  const result2 = await func1(result1);

  t.snapshot(result2, 'prettier 3');

  const func2 = (input) =>
    prettier.format(input, {
      plugins: [plugin],
      pluginSearchDirs: false,
      ...options,
    });

  const result3 = func2(string);

  const result4 = func2(result3);

  t.snapshot(result4, 'prettier 2');

  t.is(result2, result4);
}

const source = `
Project project_name {
  database_type: 'PostgreSQL'
  Note: 'Description of the project'
}

 Table   buildings   {
    address  varchar(255)  [unique,     not null,note:"to include \\"unit\\" number"]

  id  integer [  pk,  unique, default:123 ]

port integer [note:"dsdsds"]

  Note: '''
  This is a block string
  This string can spans over multiple lines.
'''
}

// example



Enum aas {
  n [note: "sds"]
}
`;

test('format by filename', pretty, source, { filepath: 'fake.dbml' });

test('format by parser', pretty, source, { parser: 'dbml' });

const text = `
\`\`\`dbml
${source}
\`\`\`
`;

test('format in markdown', pretty, text, { filepath: 'fake.md' });
