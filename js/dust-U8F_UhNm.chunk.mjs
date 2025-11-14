const appName = "text";
const appVersion = "7.0.0-dev.2";
var dust_1;
var hasRequiredDust;
function requireDust() {
  if (hasRequiredDust) return dust_1;
  hasRequiredDust = 1;
  function dust(hljs) {
    const EXPRESSION_KEYWORDS = "if eq ne lt lte gt gte select default math sep";
    return {
      name: "Dust",
      aliases: ["dst"],
      case_insensitive: true,
      subLanguage: "xml",
      contains: [
        {
          className: "template-tag",
          begin: /\{[#\/]/,
          end: /\}/,
          illegal: /;/,
          contains: [
            {
              className: "name",
              begin: /[a-zA-Z\.-]+/,
              starts: {
                endsWithParent: true,
                relevance: 0,
                contains: [hljs.QUOTE_STRING_MODE]
              }
            }
          ]
        },
        {
          className: "template-variable",
          begin: /\{/,
          end: /\}/,
          illegal: /;/,
          keywords: EXPRESSION_KEYWORDS
        }
      ]
    };
  }
  dust_1 = dust;
  return dust_1;
}
export {
  requireDust as r
};
//# sourceMappingURL=dust-U8F_UhNm.chunk.mjs.map
