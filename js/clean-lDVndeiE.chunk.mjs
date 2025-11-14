const appName = "text";
const appVersion = "7.0.0-dev.2";
var clean_1;
var hasRequiredClean;
function requireClean() {
  if (hasRequiredClean) return clean_1;
  hasRequiredClean = 1;
  function clean(hljs) {
    const KEYWORDS = [
      "if",
      "let",
      "in",
      "with",
      "where",
      "case",
      "of",
      "class",
      "instance",
      "otherwise",
      "implementation",
      "definition",
      "system",
      "module",
      "from",
      "import",
      "qualified",
      "as",
      "special",
      "code",
      "inline",
      "foreign",
      "export",
      "ccall",
      "stdcall",
      "generic",
      "derive",
      "infix",
      "infixl",
      "infixr"
    ];
    return {
      name: "Clean",
      aliases: [
        "icl",
        "dcl"
      ],
      keywords: {
        keyword: KEYWORDS,
        built_in: "Int Real Char Bool",
        literal: "True False"
      },
      contains: [
        hljs.C_LINE_COMMENT_MODE,
        hljs.C_BLOCK_COMMENT_MODE,
        hljs.APOS_STRING_MODE,
        hljs.QUOTE_STRING_MODE,
        hljs.C_NUMBER_MODE,
        {
          // relevance booster
          begin: "->|<-[|:]?|#!?|>>=|\\{\\||\\|\\}|:==|=:|<>"
        }
      ]
    };
  }
  clean_1 = clean;
  return clean_1;
}
export {
  requireClean as r
};
//# sourceMappingURL=clean-lDVndeiE.chunk.mjs.map
