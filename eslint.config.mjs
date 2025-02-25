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
    rules: {
      "react/no-unescaped-entities": "off", // 关闭 React 中 HTML 实体警告
      "no-console": "warn", // 允许 console 但警告
      "semi": ["error", "always"], // 语句末尾必须加分号
      "@typescript-eslint/no-explicit-any": "off",
      "no-console": "off",
      "@typescript-eslint/no-unused-vars": "warn", // 只警告，不报错
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/ban-ts-comment": [
        "error",
        {
          "ts-ignore": false, // ✅ 允许使用 @ts-ignore
        },
      ],
      "no-var": "off",
    },
  },
];

export default eslintConfig;
