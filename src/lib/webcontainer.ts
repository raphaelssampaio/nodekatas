import type { WebContainer } from '@webcontainer/api';

let instance: WebContainer | null = null;

const RUNNER_DEPENDENCIES = {
  express: '^4.19.2',
  knex: '^3.1.0',
  pg: '^8.11.5',
  mongoose: '^8.4.0',
  jsonwebtoken: '^9.0.2',
  passport: '^0.7.0',
  'passport-local': '^1.0.0',
  'express-session': '^1.18.0',
  helmet: '^7.1.0',
  compression: '^1.7.4',
};

export async function getWebContainer(): Promise<WebContainer> {
  if (instance) return instance;
  const { WebContainer } = await import('@webcontainer/api');
  instance = await WebContainer.boot();

  await instance.fs.writeFile(
    '/package.json',
    JSON.stringify(
      { name: 'nodekatas-runner', private: true, dependencies: RUNNER_DEPENDENCIES },
      null,
      2,
    ),
  );

  const install = await instance.spawn('npm', ['install']);
  const exitCode = await install.exit;
  if (exitCode !== 0) {
    instance = null;
    throw new Error('Failed to install runner dependencies in the WebContainer');
  }

  return instance;
}

function buildRunner(tests: string[]): string {
  const testBlocks = tests
    .map(
      (test, i) => `
  try {
    ${test}
    console.log('Test ${i + 1} passed');
  } catch (e) {
    console.error('Test ${i + 1} failed: ' + e.message);
    process.exit(1);
  }`,
    )
    .join('\n');

  return `
const assert = require('assert');
Object.assign(global, require('./solution.js'));

function expect(value) {
  return {
    toBe:         (expected) => assert.strictEqual(value, expected),
    toEqual:      (expected) => assert.deepStrictEqual(value, expected),
    toMatch:      (pattern)  => assert.match(String(value), pattern instanceof RegExp ? pattern : new RegExp(pattern)),
    toBeTruthy:   ()         => assert.ok(value),
    toBeFalsy:    ()         => assert.ok(!value),
    toBeNull:     ()         => assert.strictEqual(value, null),
    toBeUndefined:()         => assert.strictEqual(value, undefined),
    toBeDefined:  ()         => assert.notStrictEqual(value, undefined),
    toContain:    (item)     => assert.ok(String(value).includes(String(item))),
    toHaveLength: (len)      => assert.strictEqual(value.length, len),
  };
}

(async () => {
${testBlocks}

  console.log('All tests passed');
})().catch((e) => {
  console.error('Unexpected error: ' + e.message);
  process.exit(1);
});
`.trimStart();
}

export async function runCode(
  code: string,
  tests: string[],
): Promise<{ passed: boolean; output: string; error: string | null }> {
  const container = await getWebContainer();

  await container.fs.writeFile('/solution.js', code);
  await container.fs.writeFile('/runner.js', buildRunner(tests));

  const chunks: string[] = [];
  const process = await container.spawn('node', ['runner.js']);

  process.output.pipeTo(
    new WritableStream({
      write(chunk) {
        chunks.push(chunk);
      },
    }),
  );

  const exitCode = await process.exit;
  const fullOutput = chunks.join('');

  const stdoutLines = fullOutput
    .split('\n')
    .filter((l) => !l.startsWith('Test') || l.includes('passed'))
    .join('\n')
    .trim();

  const errorLines = fullOutput
    .split('\n')
    .filter((l) => l.includes('failed'))
    .join('\n')
    .trim();

  return {
    passed: exitCode === 0,
    output: stdoutLines,
    error: errorLines || null,
  };
}
