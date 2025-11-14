const appName = "text";
const appVersion = "7.0.0-dev.2";
var awk_1;
var hasRequiredAwk;
function requireAwk() {
  if (hasRequiredAwk) return awk_1;
  hasRequiredAwk = 1;
  function awk(hljs) {
    const VARIABLE = {
      className: "variable",
      variants: [
        { begin: /\$[\w\d#@][\w\d_]*/ },
        { begin: /\$\{(.*?)\}/ }
      ]
    };
    const KEYWORDS = "BEGIN END if else while do for in break continue delete next nextfile function func exit|10";
    const STRING = {
      className: "string",
      contains: [hljs.BACKSLASH_ESCAPE],
      variants: [
        {
          begin: /(u|b)?r?'''/,
          end: /'''/,
          relevance: 10
        },
        {
          begin: /(u|b)?r?"""/,
          end: /"""/,
          relevance: 10
        },
        {
          begin: /(u|r|ur)'/,
          end: /'/,
          relevance: 10
        },
        {
          begin: /(u|r|ur)"/,
          end: /"/,
          relevance: 10
        },
        {
          begin: /(b|br)'/,
          end: /'/
        },
        {
          begin: /(b|br)"/,
          end: /"/
        },
        hljs.APOS_STRING_MODE,
        hljs.QUOTE_STRING_MODE
      ]
    };
    return {
      name: "Awk",
      keywords: { keyword: KEYWORDS },
      contains: [
        VARIABLE,
        STRING,
        hljs.REGEXP_MODE,
        hljs.HASH_COMMENT_MODE,
        hljs.NUMBER_MODE
      ]
    };
  }
  awk_1 = awk;
  return awk_1;
}
export {
  requireAwk as r
};
//# sourceMappingURL=awk-DHJrUyVz.chunk.mjs.map
