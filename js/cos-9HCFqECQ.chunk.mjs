const appName = "text";
const appVersion = "7.0.0-dev.2";
var cos_1;
var hasRequiredCos;
function requireCos() {
  if (hasRequiredCos) return cos_1;
  hasRequiredCos = 1;
  function cos(hljs) {
    const STRINGS = {
      className: "string",
      variants: [
        {
          begin: '"',
          end: '"',
          contains: [
            {
              // escaped
              begin: '""',
              relevance: 0
            }
          ]
        }
      ]
    };
    const NUMBERS = {
      className: "number",
      begin: "\\b(\\d+(\\.\\d*)?|\\.\\d+)",
      relevance: 0
    };
    const COS_KEYWORDS = "property parameter class classmethod clientmethod extends as break catch close continue do d|0 else elseif for goto halt hang h|0 if job j|0 kill k|0 lock l|0 merge new open quit q|0 read r|0 return set s|0 tcommit throw trollback try tstart use view while write w|0 xecute x|0 zkill znspace zn ztrap zwrite zw zzdump zzwrite print zbreak zinsert zload zprint zremove zsave zzprint mv mvcall mvcrt mvdim mvprint zquit zsync ascii";
    return {
      name: "Caché Object Script",
      case_insensitive: true,
      aliases: ["cls"],
      keywords: COS_KEYWORDS,
      contains: [
        NUMBERS,
        STRINGS,
        hljs.C_LINE_COMMENT_MODE,
        hljs.C_BLOCK_COMMENT_MODE,
        {
          className: "comment",
          begin: /;/,
          end: "$",
          relevance: 0
        },
        {
          // Functions and user-defined functions: write $ztime(60*60*3), $$myFunc(10), $$^Val(1)
          className: "built_in",
          begin: /(?:\$\$?|\.\.)\^?[a-zA-Z]+/
        },
        {
          // Macro command: quit $$$OK
          className: "built_in",
          begin: /\$\$\$[a-zA-Z]+/
        },
        {
          // Special (global) variables: write %request.Content; Built-in classes: %Library.Integer
          className: "built_in",
          begin: /%[a-z]+(?:\.[a-z]+)*/
        },
        {
          // Global variable: set ^globalName = 12 write ^globalName
          className: "symbol",
          begin: /\^%?[a-zA-Z][\w]*/
        },
        {
          // Some control constructions: do ##class(Package.ClassName).Method(), ##super()
          className: "keyword",
          begin: /##class|##super|#define|#dim/
        },
        // sub-languages: are not fully supported by hljs by 11/15/2015
        // left for the future implementation.
        {
          begin: /&sql\(/,
          end: /\)/,
          excludeBegin: true,
          excludeEnd: true,
          subLanguage: "sql"
        },
        {
          begin: /&(js|jscript|javascript)</,
          end: />/,
          excludeBegin: true,
          excludeEnd: true,
          subLanguage: "javascript"
        },
        {
          // this brakes first and last tag, but this is the only way to embed a valid html
          begin: /&html<\s*</,
          end: />\s*>/,
          subLanguage: "xml"
        }
      ]
    };
  }
  cos_1 = cos;
  return cos_1;
}
export {
  requireCos as r
};
//# sourceMappingURL=cos-9HCFqECQ.chunk.mjs.map
