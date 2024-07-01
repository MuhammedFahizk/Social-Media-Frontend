module.exports = {
  root: true,
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": ["eslint:recommended", "plugin:react/recommended", "plugin:react-hooks/recommended"],
  "parserOptions": {
    "ecmaVersion": 12,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "plugins": ["react", "react-hooks", 'react-refresh'],
 
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  settings: { react: { version: '18.2' } },
 
  rules: {
    'react/jsx-no-target-blank': 'off',
    "react/react-in-jsx-scope": "off",
     "node/no-process-exit": "off",
    "node/process/no-top-level-await": "off",
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }], 
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
}
