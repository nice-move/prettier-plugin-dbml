import test from 'ava';
import prettier from 'prettier';

function pretty(string, options) {
  return prettier.format(string, {
    plugins: ['.'],
    ...options,
  });
}

const source = `
Project project_name {
  database_type: 'PostgreSQL'
  Note: 'Description of the project'
}

 Table   buildings   {
    address  varchar(255)  [unique,     not null,note:'to include unit number']

  id  integer [  pk,  unique, default:123 ]
}

Enum aas {
  n [note: 'sds']
}
`;

test('format by filename', (t) => {
  const result = pretty(source, { filepath: 'fake.dbml' });

  t.snapshot(result);
});

test('format by parser', (t) => {
  const result = pretty(source, { parser: 'dbml' });

  t.snapshot(result);
});

test('format in markdown', (t) => {
  const text = `
\`\`\`dbml
${source}
\`\`\`
`;

  const result = pretty(text, { filepath: 'fake.md' });

  t.snapshot(result);
});
