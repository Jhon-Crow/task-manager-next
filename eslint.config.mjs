import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: ["src/shared/generated/**"],
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_", // игнорировать неиспользуемые аргументы, начинающиеся с _
          varsIgnorePattern: "^_", // игнорировать неиспользуемые переменные, начинающиеся с _
          caughtErrorsIgnorePattern: "^_", // игнорировать неиспользуемые ошибки в catch
        },
      ],
    },
  },
];

export default eslintConfig;
