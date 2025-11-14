const appName = "text";
const appVersion = "7.0.0-dev.2";
var pythonRepl_1;
var hasRequiredPythonRepl;
function requirePythonRepl() {
  if (hasRequiredPythonRepl) return pythonRepl_1;
  hasRequiredPythonRepl = 1;
  function pythonRepl(hljs) {
    return {
      aliases: ["pycon"],
      contains: [
        {
          className: "meta.prompt",
          starts: {
            // a space separates the REPL prefix from the actual code
            // this is purely for cleaner HTML output
            end: / |$/,
            starts: {
              end: "$",
              subLanguage: "python"
            }
          },
          variants: [
            { begin: /^>>>(?=[ ]|$)/ },
            { begin: /^\.\.\.(?=[ ]|$)/ }
          ]
        }
      ]
    };
  }
  pythonRepl_1 = pythonRepl;
  return pythonRepl_1;
}
export {
  requirePythonRepl as r
};
//# sourceMappingURL=python-repl-CMGijgqV.chunk.mjs.map
