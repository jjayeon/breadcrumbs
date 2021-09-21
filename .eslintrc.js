// eslint-disable-next-line no-undef
module.exports = {
    env: {
        browser: true,
        es2020: true,
    },
    extends: ["eslint:recommended", "plugin:react/recommended", "prettier"],
    parserOptions: {
        ecmaVersion: 11,
        sourceType: "module",
    },
    rules: {
        indent: ["error", 4],
    },
};
