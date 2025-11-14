const appName = "text";
const appVersion = "7.0.0-dev.2";
var taggerscript_1;
var hasRequiredTaggerscript;
function requireTaggerscript() {
  if (hasRequiredTaggerscript) return taggerscript_1;
  hasRequiredTaggerscript = 1;
  function taggerscript(hljs) {
    const NOOP = {
      className: "comment",
      begin: /\$noop\(/,
      end: /\)/,
      contains: [
        { begin: /\\[()]/ },
        {
          begin: /\(/,
          end: /\)/,
          contains: [
            { begin: /\\[()]/ },
            "self"
          ]
        }
      ],
      relevance: 10
    };
    const FUNCTION = {
      className: "keyword",
      begin: /\$[_a-zA-Z0-9]+(?=\()/
    };
    const VARIABLE = {
      className: "variable",
      begin: /%[_a-zA-Z0-9:]+%/
    };
    const ESCAPE_SEQUENCE_UNICODE = {
      className: "symbol",
      begin: /\\u[a-fA-F0-9]{4}/
    };
    const ESCAPE_SEQUENCE = {
      className: "symbol",
      begin: /\\[\\nt$%,()]/
    };
    return {
      name: "Tagger Script",
      contains: [
        NOOP,
        FUNCTION,
        VARIABLE,
        ESCAPE_SEQUENCE,
        ESCAPE_SEQUENCE_UNICODE
      ]
    };
  }
  taggerscript_1 = taggerscript;
  return taggerscript_1;
}
export {
  requireTaggerscript as r
};
//# sourceMappingURL=taggerscript-0kD5nZkp.chunk.mjs.map
