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
        "prettier/prettier": true,
      },
    },
    {
      files: ["**/*.css"],
      extends: ["stylelint-config-standard", "stylelint-prettier/recommended"],
      rules: {
        "prettier/prettier": true,
        "import-notation": "string",
      },
    },
  ],
};
