import { readFile } from 'node:fs/promises';

import test from 'ava';
import { format } from 'prettier';

import plugin from '../index.cjs';

const path = new URL('fixture.dbml', import.meta.url);

const source = await readFile(path, 'utf8');

async function pretty(t, string, options) {
  const func1 = (input) => format(input, { plugins: [plugin], ...options });

  const result1 = await func1(string);

  const result2 = await func1(result1);

  t.snapshot(result2, 'prettier 3');

  t.is(result2, result1);
}

test('format by filename', pretty, source, { filepath: 'fake.dbml' });

test('format by parser', pretty, source, { parser: 'dbml' });

const text = `
\`\`\`dbml
${source}
\`\`\`
`;

test('format in markdown', pretty, text, { filepath: 'fake.md' });
