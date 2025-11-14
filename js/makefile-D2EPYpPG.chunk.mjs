const appName = "text";
const appVersion = "7.0.0-dev.2";
var makefile_1;
var hasRequiredMakefile;
function requireMakefile() {
  if (hasRequiredMakefile) return makefile_1;
  hasRequiredMakefile = 1;
  function makefile(hljs) {
    const VARIABLE = {
      className: "variable",
      variants: [
        {
          begin: "\\$\\(" + hljs.UNDERSCORE_IDENT_RE + "\\)",
          contains: [hljs.BACKSLASH_ESCAPE]
        },
        { begin: /\$[@%<?\^\+\*]/ }
      ]
    };
    const QUOTE_STRING = {
      className: "string",
      begin: /"/,
      end: /"/,
      contains: [
        hljs.BACKSLASH_ESCAPE,
        VARIABLE
      ]
    };
    const FUNC = {
      className: "variable",
      begin: /\$\([\w-]+\s/,
      end: /\)/,
      keywords: { built_in: "subst patsubst strip findstring filter filter-out sort word wordlist firstword lastword dir notdir suffix basename addsuffix addprefix join wildcard realpath abspath error warning shell origin flavor foreach if or and call eval file value" },
      contains: [
        VARIABLE,
        QUOTE_STRING
        // Added QUOTE_STRING as they can be a part of functions
      ]
    };
    const ASSIGNMENT = { begin: "^" + hljs.UNDERSCORE_IDENT_RE + "\\s*(?=[:+?]?=)" };
    const META = {
      className: "meta",
      begin: /^\.PHONY:/,
      end: /$/,
      keywords: {
        $pattern: /[\.\w]+/,
        keyword: ".PHONY"
      }
    };
    const TARGET = {
      className: "section",
      begin: /^[^\s]+:/,
      end: /$/,
      contains: [VARIABLE]
    };
    return {
      name: "Makefile",
      aliases: [
        "mk",
        "mak",
        "make"
      ],
      keywords: {
        $pattern: /[\w-]+/,
        keyword: "define endef undefine ifdef ifndef ifeq ifneq else endif include -include sinclude override export unexport private vpath"
      },
      contains: [
        hljs.HASH_COMMENT_MODE,
        VARIABLE,
        QUOTE_STRING,
        FUNC,
        ASSIGNMENT,
        META,
        TARGET
      ]
    };
  }
  makefile_1 = makefile;
  return makefile_1;
}
export {
  requireMakefile as r
};
//# sourceMappingURL=makefile-D2EPYpPG.chunk.mjs.map
