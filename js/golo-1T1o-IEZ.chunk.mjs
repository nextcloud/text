const appName = "text";
const appVersion = "7.0.0-dev.2";
var golo_1;
var hasRequiredGolo;
function requireGolo() {
  if (hasRequiredGolo) return golo_1;
  hasRequiredGolo = 1;
  function golo(hljs) {
    const KEYWORDS = [
      "println",
      "readln",
      "print",
      "import",
      "module",
      "function",
      "local",
      "return",
      "let",
      "var",
      "while",
      "for",
      "foreach",
      "times",
      "in",
      "case",
      "when",
      "match",
      "with",
      "break",
      "continue",
      "augment",
      "augmentation",
      "each",
      "find",
      "filter",
      "reduce",
      "if",
      "then",
      "else",
      "otherwise",
      "try",
      "catch",
      "finally",
      "raise",
      "throw",
      "orIfNull",
      "DynamicObject|10",
      "DynamicVariable",
      "struct",
      "Observable",
      "map",
      "set",
      "vector",
      "list",
      "array"
    ];
    return {
      name: "Golo",
      keywords: {
        keyword: KEYWORDS,
        literal: [
          "true",
          "false",
          "null"
        ]
      },
      contains: [
        hljs.HASH_COMMENT_MODE,
        hljs.QUOTE_STRING_MODE,
        hljs.C_NUMBER_MODE,
        {
          className: "meta",
          begin: "@[A-Za-z]+"
        }
      ]
    };
  }
  golo_1 = golo;
  return golo_1;
}
export {
  requireGolo as r
};
//# sourceMappingURL=golo-1T1o-IEZ.chunk.mjs.map
