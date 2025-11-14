const appName = "text";
const appVersion = "7.0.0-dev.2";
var clojureRepl_1;
var hasRequiredClojureRepl;
function requireClojureRepl() {
  if (hasRequiredClojureRepl) return clojureRepl_1;
  hasRequiredClojureRepl = 1;
  function clojureRepl(hljs) {
    return {
      name: "Clojure REPL",
      contains: [
        {
          className: "meta.prompt",
          begin: /^([\w.-]+|\s*#_)?=>/,
          starts: {
            end: /$/,
            subLanguage: "clojure"
          }
        }
      ]
    };
  }
  clojureRepl_1 = clojureRepl;
  return clojureRepl_1;
}
export {
  requireClojureRepl as r
};
//# sourceMappingURL=clojure-repl-CT9aHlPU.chunk.mjs.map
