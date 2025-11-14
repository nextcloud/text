const appName = "text";
const appVersion = "7.0.0-dev.2";
var ebnf_1;
var hasRequiredEbnf;
function requireEbnf() {
  if (hasRequiredEbnf) return ebnf_1;
  hasRequiredEbnf = 1;
  function ebnf(hljs) {
    const commentMode = hljs.COMMENT(/\(\*/, /\*\)/);
    const nonTerminalMode = {
      className: "attribute",
      begin: /^[ ]*[a-zA-Z]+([\s_-]+[a-zA-Z]+)*/
    };
    const specialSequenceMode = {
      className: "meta",
      begin: /\?.*\?/
    };
    const ruleBodyMode = {
      begin: /=/,
      end: /[.;]/,
      contains: [
        commentMode,
        specialSequenceMode,
        {
          // terminals
          className: "string",
          variants: [
            hljs.APOS_STRING_MODE,
            hljs.QUOTE_STRING_MODE,
            {
              begin: "`",
              end: "`"
            }
          ]
        }
      ]
    };
    return {
      name: "Extended Backus-Naur Form",
      illegal: /\S/,
      contains: [
        commentMode,
        nonTerminalMode,
        ruleBodyMode
      ]
    };
  }
  ebnf_1 = ebnf;
  return ebnf_1;
}
export {
  requireEbnf as r
};
//# sourceMappingURL=ebnf-KUHVGnT9.chunk.mjs.map
