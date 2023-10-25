module.exports = {
    root: true,
    "env": {
        "node": true,
        "commonjs": true,
        "browser": true,
        "es2021": true,
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        tsconfigRootDir: __dirname,
        project: ['./tsconfig.json'],
        ecmaVersion: 'latest',
    },
    plugins: ['@typescript-eslint'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        "plugin:@typescript-eslint/strict",
    ],
    rules: {
        "no-console": "warn",
        camelcase: 'off',
        semi: ['error', 'always'],
        quotes: ['error', 'single'],
        'max-len': ['error', { code: 2500 }],
        'no-use-before-define': [
            'error',
            {
                functions: false,
                classes: false,
                variables: false,
                allowNamedExports: false,
            },
        ],
        "no-undef": ["error", { "typeof": true }],
    },
};
