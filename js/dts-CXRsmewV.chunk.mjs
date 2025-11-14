const appName = "text";
const appVersion = "7.0.0-dev.2";
var dts_1;
var hasRequiredDts;
function requireDts() {
  if (hasRequiredDts) return dts_1;
  hasRequiredDts = 1;
  function dts(hljs) {
    const STRINGS = {
      className: "string",
      variants: [
        hljs.inherit(hljs.QUOTE_STRING_MODE, { begin: '((u8?|U)|L)?"' }),
        {
          begin: '(u8?|U)?R"',
          end: '"',
          contains: [hljs.BACKSLASH_ESCAPE]
        },
        {
          begin: "'\\\\?.",
          end: "'",
          illegal: "."
        }
      ]
    };
    const NUMBERS = {
      className: "number",
      variants: [
        { begin: "\\b(\\d+(\\.\\d*)?|\\.\\d+)(u|U|l|L|ul|UL|f|F)" },
        { begin: hljs.C_NUMBER_RE }
      ],
      relevance: 0
    };
    const PREPROCESSOR = {
      className: "meta",
      begin: "#",
      end: "$",
      keywords: { keyword: "if else elif endif define undef ifdef ifndef" },
      contains: [
        {
          begin: /\\\n/,
          relevance: 0
        },
        {
          beginKeywords: "include",
          end: "$",
          keywords: { keyword: "include" },
          contains: [
            hljs.inherit(STRINGS, { className: "string" }),
            {
              className: "string",
              begin: "<",
              end: ">",
              illegal: "\\n"
            }
          ]
        },
        STRINGS,
        hljs.C_LINE_COMMENT_MODE,
        hljs.C_BLOCK_COMMENT_MODE
      ]
    };
    const REFERENCE = {
      className: "variable",
      begin: /&[a-z\d_]*\b/
    };
    const KEYWORD = {
      className: "keyword",
      begin: "/[a-z][a-z\\d-]*/"
    };
    const LABEL = {
      className: "symbol",
      begin: "^\\s*[a-zA-Z_][a-zA-Z\\d_]*:"
    };
    const CELL_PROPERTY = {
      className: "params",
      relevance: 0,
      begin: "<",
      end: ">",
      contains: [
        NUMBERS,
        REFERENCE
      ]
    };
    const NODE = {
      className: "title.class",
      begin: /[a-zA-Z_][a-zA-Z\d_@-]*(?=\s\{)/,
      relevance: 0.2
    };
    const ROOT_NODE = {
      className: "title.class",
      begin: /^\/(?=\s*\{)/,
      relevance: 10
    };
    const ATTR_NO_VALUE = {
      match: /[a-z][a-z-,]+(?=;)/,
      relevance: 0,
      scope: "attr"
    };
    const ATTR = {
      relevance: 0,
      match: [
        /[a-z][a-z-,]+/,
        /\s*/,
        /=/
      ],
      scope: {
        1: "attr",
        3: "operator"
      }
    };
    const PUNC = {
      scope: "punctuation",
      relevance: 0,
      // `};` combined is just to avoid tons of useless punctuation nodes
      match: /\};|[;{}]/
    };
    return {
      name: "Device Tree",
      contains: [
        ROOT_NODE,
        REFERENCE,
        KEYWORD,
        LABEL,
        NODE,
        ATTR,
        ATTR_NO_VALUE,
        CELL_PROPERTY,
        hljs.C_LINE_COMMENT_MODE,
        hljs.C_BLOCK_COMMENT_MODE,
        NUMBERS,
        STRINGS,
        PREPROCESSOR,
        PUNC,
        {
          begin: hljs.IDENT_RE + "::",
          keywords: ""
        }
      ]
    };
  }
  dts_1 = dts;
  return dts_1;
}
export {
  requireDts as r
};
//# sourceMappingURL=dts-CXRsmewV.chunk.mjs.map
