module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: [
        '@typescript-eslint',
    ],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    rules: {
        "semi": [2], // must end with semi
        "no-extra-semi": [0],
        "@typescript-eslint/no-explicit-any": [0]
    }
};