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

    // Prisma-generated files
    'prisma/contract.d.ts',
    'prisma/contract.json',
    'prisma/schema.d.ts',
    'prisma/schema.json',
  ]),
]);

export default eslintConfig;
