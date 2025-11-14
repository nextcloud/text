const appName = "text";
const appVersion = "7.0.0-dev.2";
var csp_1;
var hasRequiredCsp;
function requireCsp() {
  if (hasRequiredCsp) return csp_1;
  hasRequiredCsp = 1;
  function csp(hljs) {
    const KEYWORDS = [
      "base-uri",
      "child-src",
      "connect-src",
      "default-src",
      "font-src",
      "form-action",
      "frame-ancestors",
      "frame-src",
      "img-src",
      "manifest-src",
      "media-src",
      "object-src",
      "plugin-types",
      "report-uri",
      "sandbox",
      "script-src",
      "style-src",
      "trusted-types",
      "unsafe-hashes",
      "worker-src"
    ];
    return {
      name: "CSP",
      case_insensitive: false,
      keywords: {
        $pattern: "[a-zA-Z][a-zA-Z0-9_-]*",
        keyword: KEYWORDS
      },
      contains: [
        {
          className: "string",
          begin: "'",
          end: "'"
        },
        {
          className: "attribute",
          begin: "^Content",
          end: ":",
          excludeEnd: true
        }
      ]
    };
  }
  csp_1 = csp;
  return csp_1;
}
export {
  requireCsp as r
};
//# sourceMappingURL=csp-bLJ5mMt6.chunk.mjs.map
