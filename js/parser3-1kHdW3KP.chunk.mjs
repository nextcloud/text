const appName = "text";
const appVersion = "7.0.0-dev.2";
var parser3_1;
var hasRequiredParser3;
function requireParser3() {
  if (hasRequiredParser3) return parser3_1;
  hasRequiredParser3 = 1;
  function parser3(hljs) {
    const CURLY_SUBCOMMENT = hljs.COMMENT(
      /\{/,
      /\}/,
      { contains: ["self"] }
    );
    return {
      name: "Parser3",
      subLanguage: "xml",
      relevance: 0,
      contains: [
        hljs.COMMENT("^#", "$"),
        hljs.COMMENT(
          /\^rem\{/,
          /\}/,
          {
            relevance: 10,
            contains: [CURLY_SUBCOMMENT]
          }
        ),
        {
          className: "meta",
          begin: "^@(?:BASE|USE|CLASS|OPTIONS)$",
          relevance: 10
        },
        {
          className: "title",
          begin: "@[\\w\\-]+\\[[\\w^;\\-]*\\](?:\\[[\\w^;\\-]*\\])?(?:.*)$"
        },
        {
          className: "variable",
          begin: /\$\{?[\w\-.:]+\}?/
        },
        {
          className: "keyword",
          begin: /\^[\w\-.:]+/
        },
        {
          className: "number",
          begin: "\\^#[0-9a-fA-F]+"
        },
        hljs.C_NUMBER_MODE
      ]
    };
  }
  parser3_1 = parser3;
  return parser3_1;
}
export {
  requireParser3 as r
};
//# sourceMappingURL=parser3-1kHdW3KP.chunk.mjs.map
