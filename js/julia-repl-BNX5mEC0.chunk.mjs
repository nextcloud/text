const appName = "text";
const appVersion = "7.0.0-dev.2";
var juliaRepl_1;
var hasRequiredJuliaRepl;
function requireJuliaRepl() {
  if (hasRequiredJuliaRepl) return juliaRepl_1;
  hasRequiredJuliaRepl = 1;
  function juliaRepl(hljs) {
    return {
      name: "Julia REPL",
      contains: [
        {
          className: "meta.prompt",
          begin: /^julia>/,
          relevance: 10,
          starts: {
            // end the highlighting if we are on a new line and the line does not have at
            // least six spaces in the beginning
            end: /^(?![ ]{6})/,
            subLanguage: "julia"
          }
        }
      ],
      // jldoctest Markdown blocks are used in the Julia manual and package docs indicate
      // code snippets that should be verified when the documentation is built. They can be
      // either REPL-like or script-like, but are usually REPL-like and therefore we apply
      // julia-repl highlighting to them. More information can be found in Documenter's
      // manual: https://juliadocs.github.io/Documenter.jl/latest/man/doctests.html
      aliases: ["jldoctest"]
    };
  }
  juliaRepl_1 = juliaRepl;
  return juliaRepl_1;
}
export {
  requireJuliaRepl as r
};
//# sourceMappingURL=julia-repl-BNX5mEC0.chunk.mjs.map
