const appName = "text";
const appVersion = "7.0.0-dev.2";
var gherkin_1;
var hasRequiredGherkin;
function requireGherkin() {
  if (hasRequiredGherkin) return gherkin_1;
  hasRequiredGherkin = 1;
  function gherkin(hljs) {
    return {
      name: "Gherkin",
      aliases: ["feature"],
      keywords: "Feature Background Ability Business Need Scenario Scenarios Scenario Outline Scenario Template Examples Given And Then But When",
      contains: [
        {
          className: "symbol",
          begin: "\\*",
          relevance: 0
        },
        {
          className: "meta",
          begin: "@[^@\\s]+"
        },
        {
          begin: "\\|",
          end: "\\|\\w*$",
          contains: [
            {
              className: "string",
              begin: "[^|]+"
            }
          ]
        },
        {
          className: "variable",
          begin: "<",
          end: ">"
        },
        hljs.HASH_COMMENT_MODE,
        {
          className: "string",
          begin: '"""',
          end: '"""'
        },
        hljs.QUOTE_STRING_MODE
      ]
    };
  }
  gherkin_1 = gherkin;
  return gherkin_1;
}
export {
  requireGherkin as r
};
//# sourceMappingURL=gherkin-DOCPFiK2.chunk.mjs.map
