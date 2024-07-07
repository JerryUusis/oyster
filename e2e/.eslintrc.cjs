// e2e/.eslintrc.cjs
module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    node: true,
    "playwright/globals": true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:playwright/recommended",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "playwright"],
  rules: {},
  overrides: [
    {
      files: "tests/**/*.{ts,tsx}",
      extends: "plugin:playwright/recommended",
    },
  ],
};
