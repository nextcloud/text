const appName = "text";
const appVersion = "7.0.0-dev.2";
var ceylon_1;
var hasRequiredCeylon;
function requireCeylon() {
  if (hasRequiredCeylon) return ceylon_1;
  hasRequiredCeylon = 1;
  function ceylon(hljs) {
    const KEYWORDS = [
      "assembly",
      "module",
      "package",
      "import",
      "alias",
      "class",
      "interface",
      "object",
      "given",
      "value",
      "assign",
      "void",
      "function",
      "new",
      "of",
      "extends",
      "satisfies",
      "abstracts",
      "in",
      "out",
      "return",
      "break",
      "continue",
      "throw",
      "assert",
      "dynamic",
      "if",
      "else",
      "switch",
      "case",
      "for",
      "while",
      "try",
      "catch",
      "finally",
      "then",
      "let",
      "this",
      "outer",
      "super",
      "is",
      "exists",
      "nonempty"
    ];
    const DECLARATION_MODIFIERS = [
      "shared",
      "abstract",
      "formal",
      "default",
      "actual",
      "variable",
      "late",
      "native",
      "deprecated",
      "final",
      "sealed",
      "annotation",
      "suppressWarnings",
      "small"
    ];
    const DOCUMENTATION = [
      "doc",
      "by",
      "license",
      "see",
      "throws",
      "tagged"
    ];
    const SUBST = {
      className: "subst",
      excludeBegin: true,
      excludeEnd: true,
      begin: /``/,
      end: /``/,
      keywords: KEYWORDS,
      relevance: 10
    };
    const EXPRESSIONS = [
      {
        // verbatim string
        className: "string",
        begin: '"""',
        end: '"""',
        relevance: 10
      },
      {
        // string literal or template
        className: "string",
        begin: '"',
        end: '"',
        contains: [SUBST]
      },
      {
        // character literal
        className: "string",
        begin: "'",
        end: "'"
      },
      {
        // numeric literal
        className: "number",
        begin: "#[0-9a-fA-F_]+|\\$[01_]+|[0-9_]+(?:\\.[0-9_](?:[eE][+-]?\\d+)?)?[kMGTPmunpf]?",
        relevance: 0
      }
    ];
    SUBST.contains = EXPRESSIONS;
    return {
      name: "Ceylon",
      keywords: {
        keyword: KEYWORDS.concat(DECLARATION_MODIFIERS),
        meta: DOCUMENTATION
      },
      illegal: "\\$[^01]|#[^0-9a-fA-F]",
      contains: [
        hljs.C_LINE_COMMENT_MODE,
        hljs.COMMENT("/\\*", "\\*/", { contains: ["self"] }),
        {
          // compiler annotation
          className: "meta",
          begin: '@[a-z]\\w*(?::"[^"]*")?'
        }
      ].concat(EXPRESSIONS)
    };
  }
  ceylon_1 = ceylon;
  return ceylon_1;
}
export {
  requireCeylon as r
};
//# sourceMappingURL=ceylon-BX2OLnJH.chunk.mjs.map
