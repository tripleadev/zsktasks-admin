module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "@vue/airbnb"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    quotes: "off",
    "comma-dangle": "off",
    "arrow-parens": "off",
    "operator-linebreak": "off"
  },
  parserOptions: {
    parser: "babel-eslint"
  }
};
