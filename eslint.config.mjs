import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    'node_modules/**',

    // Prisma-generated agent skills
    '.agents/**',
    '.claude/**',
    '.cursor/**',
    '.devin/**',

    // Prisma-generated artifacts
    'prisma/contract.d.ts',
    'prisma/contract.json',
    'prisma/schema.d.ts',
    'prisma/schema.json',

    // Prisma migration snapshots
    'migrations/snapshots/**',
  ]),
]);

export default eslintConfig;
