const appName = "text";
const appVersion = "7.0.0-dev.2";
var tcl_1;
var hasRequiredTcl;
function requireTcl() {
  if (hasRequiredTcl) return tcl_1;
  hasRequiredTcl = 1;
  function tcl(hljs) {
    const regex = hljs.regex;
    const TCL_IDENT = /[a-zA-Z_][a-zA-Z0-9_]*/;
    const NUMBER = {
      className: "number",
      variants: [
        hljs.BINARY_NUMBER_MODE,
        hljs.C_NUMBER_MODE
      ]
    };
    const KEYWORDS = [
      "after",
      "append",
      "apply",
      "array",
      "auto_execok",
      "auto_import",
      "auto_load",
      "auto_mkindex",
      "auto_mkindex_old",
      "auto_qualify",
      "auto_reset",
      "bgerror",
      "binary",
      "break",
      "catch",
      "cd",
      "chan",
      "clock",
      "close",
      "concat",
      "continue",
      "dde",
      "dict",
      "encoding",
      "eof",
      "error",
      "eval",
      "exec",
      "exit",
      "expr",
      "fblocked",
      "fconfigure",
      "fcopy",
      "file",
      "fileevent",
      "filename",
      "flush",
      "for",
      "foreach",
      "format",
      "gets",
      "glob",
      "global",
      "history",
      "http",
      "if",
      "incr",
      "info",
      "interp",
      "join",
      "lappend|10",
      "lassign|10",
      "lindex|10",
      "linsert|10",
      "list",
      "llength|10",
      "load",
      "lrange|10",
      "lrepeat|10",
      "lreplace|10",
      "lreverse|10",
      "lsearch|10",
      "lset|10",
      "lsort|10",
      "mathfunc",
      "mathop",
      "memory",
      "msgcat",
      "namespace",
      "open",
      "package",
      "parray",
      "pid",
      "pkg::create",
      "pkg_mkIndex",
      "platform",
      "platform::shell",
      "proc",
      "puts",
      "pwd",
      "read",
      "refchan",
      "regexp",
      "registry",
      "regsub|10",
      "rename",
      "return",
      "safe",
      "scan",
      "seek",
      "set",
      "socket",
      "source",
      "split",
      "string",
      "subst",
      "switch",
      "tcl_endOfWord",
      "tcl_findLibrary",
      "tcl_startOfNextWord",
      "tcl_startOfPreviousWord",
      "tcl_wordBreakAfter",
      "tcl_wordBreakBefore",
      "tcltest",
      "tclvars",
      "tell",
      "time",
      "tm",
      "trace",
      "unknown",
      "unload",
      "unset",
      "update",
      "uplevel",
      "upvar",
      "variable",
      "vwait",
      "while"
    ];
    return {
      name: "Tcl",
      aliases: ["tk"],
      keywords: KEYWORDS,
      contains: [
        hljs.COMMENT(";[ \\t]*#", "$"),
        hljs.COMMENT("^[ \\t]*#", "$"),
        {
          beginKeywords: "proc",
          end: "[\\{]",
          excludeEnd: true,
          contains: [
            {
              className: "title",
              begin: "[ \\t\\n\\r]+(::)?[a-zA-Z_]((::)?[a-zA-Z0-9_])*",
              end: "[ \\t\\n\\r]",
              endsWithParent: true,
              excludeEnd: true
            }
          ]
        },
        {
          className: "variable",
          variants: [
            { begin: regex.concat(
              /\$/,
              regex.optional(/::/),
              TCL_IDENT,
              "(::",
              TCL_IDENT,
              ")*"
            ) },
            {
              begin: "\\$\\{(::)?[a-zA-Z_]((::)?[a-zA-Z0-9_])*",
              end: "\\}",
              contains: [NUMBER]
            }
          ]
        },
        {
          className: "string",
          contains: [hljs.BACKSLASH_ESCAPE],
          variants: [hljs.inherit(hljs.QUOTE_STRING_MODE, { illegal: null })]
        },
        NUMBER
      ]
    };
  }
  tcl_1 = tcl;
  return tcl_1;
}
export {
  requireTcl as r
};
//# sourceMappingURL=tcl-nELKe7D9.chunk.mjs.map
