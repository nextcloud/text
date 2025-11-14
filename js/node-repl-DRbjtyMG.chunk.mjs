const appName = "text";
const appVersion = "7.0.0-dev.2";
var nodeRepl_1;
var hasRequiredNodeRepl;
function requireNodeRepl() {
  if (hasRequiredNodeRepl) return nodeRepl_1;
  hasRequiredNodeRepl = 1;
  function nodeRepl(hljs) {
    return {
      name: "Node REPL",
      contains: [
        {
          className: "meta.prompt",
          starts: {
            // a space separates the REPL prefix from the actual code
            // this is purely for cleaner HTML output
            end: / |$/,
            starts: {
              end: "$",
              subLanguage: "javascript"
            }
          },
          variants: [
            { begin: /^>(?=[ ]|$)/ },
            { begin: /^\.\.\.(?=[ ]|$)/ }
          ]
        }
      ]
    };
  }
  nodeRepl_1 = nodeRepl;
  return nodeRepl_1;
}
export {
  requireNodeRepl as r
};
//# sourceMappingURL=node-repl-DRbjtyMG.chunk.mjs.map
