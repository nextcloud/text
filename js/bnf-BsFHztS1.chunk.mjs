const appName = "text";
const appVersion = "7.0.0-dev.2";
var bnf_1;
var hasRequiredBnf;
function requireBnf() {
  if (hasRequiredBnf) return bnf_1;
  hasRequiredBnf = 1;
  function bnf(hljs) {
    return {
      name: "Backus–Naur Form",
      contains: [
        // Attribute
        {
          className: "attribute",
          begin: /</,
          end: />/
        },
        // Specific
        {
          begin: /::=/,
          end: /$/,
          contains: [
            {
              begin: /</,
              end: />/
            },
            // Common
            hljs.C_LINE_COMMENT_MODE,
            hljs.C_BLOCK_COMMENT_MODE,
            hljs.APOS_STRING_MODE,
            hljs.QUOTE_STRING_MODE
          ]
        }
      ]
    };
  }
  bnf_1 = bnf;
  return bnf_1;
}
export {
  requireBnf as r
};
//# sourceMappingURL=bnf-BsFHztS1.chunk.mjs.map
