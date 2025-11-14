const appName = "text";
const appVersion = "7.0.0-dev.2";
var groovy_1;
var hasRequiredGroovy;
function requireGroovy() {
  if (hasRequiredGroovy) return groovy_1;
  hasRequiredGroovy = 1;
  function variants(variants2, obj = {}) {
    obj.variants = variants2;
    return obj;
  }
  function groovy(hljs) {
    const regex = hljs.regex;
    const IDENT_RE = "[A-Za-z0-9_$]+";
    const COMMENT = variants([
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      hljs.COMMENT(
        "/\\*\\*",
        "\\*/",
        {
          relevance: 0,
          contains: [
            {
              // eat up @'s in emails to prevent them to be recognized as doctags
              begin: /\w+@/,
              relevance: 0
            },
            {
              className: "doctag",
              begin: "@[A-Za-z]+"
            }
          ]
        }
      )
    ]);
    const REGEXP = {
      className: "regexp",
      begin: /~?\/[^\/\n]+\//,
      contains: [hljs.BACKSLASH_ESCAPE]
    };
    const NUMBER = variants([
      hljs.BINARY_NUMBER_MODE,
      hljs.C_NUMBER_MODE
    ]);
    const STRING = variants(
      [
        {
          begin: /"""/,
          end: /"""/
        },
        {
          begin: /'''/,
          end: /'''/
        },
        {
          begin: "\\$/",
          end: "/\\$",
          relevance: 10
        },
        hljs.APOS_STRING_MODE,
        hljs.QUOTE_STRING_MODE
      ],
      { className: "string" }
    );
    const CLASS_DEFINITION = {
      match: [
        /(class|interface|trait|enum|record|extends|implements)/,
        /\s+/,
        hljs.UNDERSCORE_IDENT_RE
      ],
      scope: {
        1: "keyword",
        3: "title.class"
      }
    };
    const TYPES = [
      "byte",
      "short",
      "char",
      "int",
      "long",
      "boolean",
      "float",
      "double",
      "void"
    ];
    const KEYWORDS = [
      // groovy specific keywords
      "def",
      "as",
      "in",
      "assert",
      "trait",
      // common keywords with Java
      "abstract",
      "static",
      "volatile",
      "transient",
      "public",
      "private",
      "protected",
      "synchronized",
      "final",
      "class",
      "interface",
      "enum",
      "if",
      "else",
      "for",
      "while",
      "switch",
      "case",
      "break",
      "default",
      "continue",
      "throw",
      "throws",
      "try",
      "catch",
      "finally",
      "implements",
      "extends",
      "new",
      "import",
      "package",
      "return",
      "instanceof",
      "var"
    ];
    return {
      name: "Groovy",
      keywords: {
        "variable.language": "this super",
        literal: "true false null",
        type: TYPES,
        keyword: KEYWORDS
      },
      contains: [
        hljs.SHEBANG({
          binary: "groovy",
          relevance: 10
        }),
        COMMENT,
        STRING,
        REGEXP,
        NUMBER,
        CLASS_DEFINITION,
        {
          className: "meta",
          begin: "@[A-Za-z]+",
          relevance: 0
        },
        {
          // highlight map keys and named parameters as attrs
          className: "attr",
          begin: IDENT_RE + "[ 	]*:",
          relevance: 0
        },
        {
          // catch middle element of the ternary operator
          // to avoid highlight it as a label, named parameter, or map key
          begin: /\?/,
          end: /:/,
          relevance: 0,
          contains: [
            COMMENT,
            STRING,
            REGEXP,
            NUMBER,
            "self"
          ]
        },
        {
          // highlight labeled statements
          className: "symbol",
          begin: "^[ 	]*" + regex.lookahead(IDENT_RE + ":"),
          excludeBegin: true,
          end: IDENT_RE + ":",
          relevance: 0
        }
      ],
      illegal: /#|<\//
    };
  }
  groovy_1 = groovy;
  return groovy_1;
}
export {
  requireGroovy as r
};
//# sourceMappingURL=groovy-DqCmFehv.chunk.mjs.map
