const appName = "text";
const appVersion = "7.0.0-dev.2";
var flix_1;
var hasRequiredFlix;
function requireFlix() {
  if (hasRequiredFlix) return flix_1;
  hasRequiredFlix = 1;
  function flix(hljs) {
    const CHAR = {
      className: "string",
      begin: /'(.|\\[xXuU][a-zA-Z0-9]+)'/
    };
    const STRING = {
      className: "string",
      variants: [
        {
          begin: '"',
          end: '"'
        }
      ]
    };
    const NAME = {
      className: "title",
      relevance: 0,
      begin: /[^0-9\n\t "'(),.`{}\[\]:;][^\n\t "'(),.`{}\[\]:;]+|[^0-9\n\t "'(),.`{}\[\]:;=]/
    };
    const METHOD = {
      className: "function",
      beginKeywords: "def",
      end: /[:={\[(\n;]/,
      excludeEnd: true,
      contains: [NAME]
    };
    return {
      name: "Flix",
      keywords: {
        keyword: [
          "case",
          "class",
          "def",
          "else",
          "enum",
          "if",
          "impl",
          "import",
          "in",
          "lat",
          "rel",
          "index",
          "let",
          "match",
          "namespace",
          "switch",
          "type",
          "yield",
          "with"
        ],
        literal: [
          "true",
          "false"
        ]
      },
      contains: [
        hljs.C_LINE_COMMENT_MODE,
        hljs.C_BLOCK_COMMENT_MODE,
        CHAR,
        STRING,
        METHOD,
        hljs.C_NUMBER_MODE
      ]
    };
  }
  flix_1 = flix;
  return flix_1;
}
export {
  requireFlix as r
};
//# sourceMappingURL=flix-BSBK0QpJ.chunk.mjs.map
