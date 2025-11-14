const appName = "text";
const appVersion = "7.0.0-dev.2";
var graphql_1;
var hasRequiredGraphql;
function requireGraphql() {
  if (hasRequiredGraphql) return graphql_1;
  hasRequiredGraphql = 1;
  function graphql(hljs) {
    const regex = hljs.regex;
    const GQL_NAME = /[_A-Za-z][_0-9A-Za-z]*/;
    return {
      name: "GraphQL",
      aliases: ["gql"],
      case_insensitive: true,
      disableAutodetect: false,
      keywords: {
        keyword: [
          "query",
          "mutation",
          "subscription",
          "type",
          "input",
          "schema",
          "directive",
          "interface",
          "union",
          "scalar",
          "fragment",
          "enum",
          "on"
        ],
        literal: [
          "true",
          "false",
          "null"
        ]
      },
      contains: [
        hljs.HASH_COMMENT_MODE,
        hljs.QUOTE_STRING_MODE,
        hljs.NUMBER_MODE,
        {
          scope: "punctuation",
          match: /[.]{3}/,
          relevance: 0
        },
        {
          scope: "punctuation",
          begin: /[\!\(\)\:\=\[\]\{\|\}]{1}/,
          relevance: 0
        },
        {
          scope: "variable",
          begin: /\$/,
          end: /\W/,
          excludeEnd: true,
          relevance: 0
        },
        {
          scope: "meta",
          match: /@\w+/,
          excludeEnd: true
        },
        {
          scope: "symbol",
          begin: regex.concat(GQL_NAME, regex.lookahead(/\s*:/)),
          relevance: 0
        }
      ],
      illegal: [
        /[;<']/,
        /BEGIN/
      ]
    };
  }
  graphql_1 = graphql;
  return graphql_1;
}
export {
  requireGraphql as r
};
//# sourceMappingURL=graphql-OWho-wvr.chunk.mjs.map
