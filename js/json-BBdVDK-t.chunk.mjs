const appName = "text";
const appVersion = "7.0.0-dev.2";
var json_1;
var hasRequiredJson;
function requireJson() {
  if (hasRequiredJson) return json_1;
  hasRequiredJson = 1;
  function json(hljs) {
    const ATTRIBUTE = {
      className: "attr",
      begin: /"(\\.|[^\\"\r\n])*"(?=\s*:)/,
      relevance: 1.01
    };
    const PUNCTUATION = {
      match: /[{}[\],:]/,
      className: "punctuation",
      relevance: 0
    };
    const LITERALS = [
      "true",
      "false",
      "null"
    ];
    const LITERALS_MODE = {
      scope: "literal",
      beginKeywords: LITERALS.join(" ")
    };
    return {
      name: "JSON",
      aliases: ["jsonc"],
      keywords: {
        literal: LITERALS
      },
      contains: [
        ATTRIBUTE,
        PUNCTUATION,
        hljs.QUOTE_STRING_MODE,
        LITERALS_MODE,
        hljs.C_NUMBER_MODE,
        hljs.C_LINE_COMMENT_MODE,
        hljs.C_BLOCK_COMMENT_MODE
      ],
      illegal: "\\S"
    };
  }
  json_1 = json;
  return json_1;
}
export {
  requireJson as r
};
//# sourceMappingURL=json-BBdVDK-t.chunk.mjs.map
