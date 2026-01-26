import { readFileSync } from 'node:fs';

import test from 'ava';
import type { ExecutionContext } from 'ava';
import { format } from 'prettier';

import * as plugin from '../lib/index.mjs';

const path = new URL('./fixture.dbml', import.meta.url);

const source = readFileSync(path, 'utf8');

async function pretty(t: ExecutionContext, string: string, options: object) {
  const func1 = (input: string) =>
    format(input, {
      // @ts-expect-error -----------------
      plugins: [plugin],
      ...options,
    });

  const result1 = await func1(string);

  const result2 = await func1(result1);

  t.snapshot(result2, 'prettier');

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
