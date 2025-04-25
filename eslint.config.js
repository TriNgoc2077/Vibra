module.exports = {
  "env": {
    "node": true,
    "es2021": true,
    "commonjs": true
  },
  "extends": [
    "eslint:recommended"
  ],
  "parserOptions": {
    "ecmaVersion": 12,
    "sourceType": "module"
  },
  "rules": {
    // Error prevention
    "no-console": "warn",
    "no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
    "no-undef": "error",
    "no-var": "error",
    "prefer-const": "error",

    // Style consistency 
    "indent": ["error", 2],
    "quotes": ["error", "single"],
    "semi": ["error", "always"],
    "comma-dangle": ["error", "never"],
    "arrow-spacing": ["error", { "before": true, "after": true }],
    "object-curly-spacing": ["error", "always"],
    "array-bracket-spacing": ["error", "never"],
    "key-spacing": ["error", { "beforeColon": false, "afterColon": true }],
    "no-trailing-spaces": "error",
    "eol-last": ["error", "always"],

    // Express specific
    "no-process-exit": "error",
    "no-path-concat": "error",
    "handle-callback-err": "error",

    // Modern JS
    "prefer-arrow-callback": "error",
    "prefer-template": "error",
    "template-curly-spacing": ["error", "never"],
    "prefer-destructuring": ["error", {
      "array": false,
      "object": true
    }]
  },
  "overrides": [
    {
      // Specific rules for Pug template files
      "files": ["*.pug", "views/**/*.pug"],
      "plugins": ["pug"],
      "extends": ["plugin:pug/recommended"]
    },
    {
      // Specific rules for test files
      "files": ["tests/**/*.js", "**/*.test.js", "**/*.spec.js"],
      "env": {
        "mocha": true,
        "jest": true
      },
      "rules": {
        "no-unused-expressions": "off"
      }
    }
  ]
}