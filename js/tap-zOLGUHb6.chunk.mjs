const appName = "text";
const appVersion = "7.0.0-dev.2";
var tap_1;
var hasRequiredTap;
function requireTap() {
  if (hasRequiredTap) return tap_1;
  hasRequiredTap = 1;
  function tap(hljs) {
    return {
      name: "Test Anything Protocol",
      case_insensitive: true,
      contains: [
        hljs.HASH_COMMENT_MODE,
        // version of format and total amount of testcases
        {
          className: "meta",
          variants: [
            { begin: "^TAP version (\\d+)$" },
            { begin: "^1\\.\\.(\\d+)$" }
          ]
        },
        // YAML block
        {
          begin: /---$/,
          end: "\\.\\.\\.$",
          subLanguage: "yaml",
          relevance: 0
        },
        // testcase number
        {
          className: "number",
          begin: " (\\d+) "
        },
        // testcase status and description
        {
          className: "symbol",
          variants: [
            { begin: "^ok" },
            { begin: "^not ok" }
          ]
        }
      ]
    };
  }
  tap_1 = tap;
  return tap_1;
}
export {
  requireTap as r
};
//# sourceMappingURL=tap-zOLGUHb6.chunk.mjs.map
