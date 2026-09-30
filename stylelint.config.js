/**
 * @type {import("stylelint").Config["rules"]}
 */
const commonRules = {
  "prettier/prettier": true,
};

const tailwindRules = ["theme", "plugin"];

const selectorClassPatternRules = {
  "selector-class-pattern": "^[a-z_][a-zA-Z0-9-_]*$",
};

/**
 * @type {import("stylelint").Config}
 */
export default {
  plugins: ["stylelint-prettier"],
  extends: ["stylelint-prettier/recommended"],
  rules: {
    "prettier/prettier": true,
  },
  ignoreFiles: ["node_modules/**", "dist/**"],
  overrides: [
    {
      files: ["**/*.scss"],
      extends: [
        "stylelint-config-standard-scss",
        "stylelint-prettier/recommended",
      ],
      rules: {
        ...commonRules,
        "scss/at-rule-no-unknown": [
          true,
          { ignoreAtRules: [...tailwindRules] },
        ],
        ...selectorClassPatternRules,
        "scss/dollar-variable-pattern": "^[a-z_][a-zA-Z0-9-_]*$",
      },
    },
    {
      files: ["**/*.css"],
      extends: ["stylelint-config-standard", "stylelint-prettier/recommended"],
      rules: {
        ...commonRules,
        "at-rule-no-unknown": [true, { ignoreAtRules: [...tailwindRules] }],
        "import-notation": "string",
        ...selectorClassPatternRules,
      },
    },
  ],
};
