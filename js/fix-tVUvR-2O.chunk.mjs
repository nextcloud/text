const appName = "text";
const appVersion = "7.0.0-dev.2";
var fix_1;
var hasRequiredFix;
function requireFix() {
  if (hasRequiredFix) return fix_1;
  hasRequiredFix = 1;
  function fix(hljs) {
    return {
      name: "FIX",
      contains: [
        {
          begin: /[^\u2401\u0001]+/,
          end: /[\u2401\u0001]/,
          excludeEnd: true,
          returnBegin: true,
          returnEnd: false,
          contains: [
            {
              begin: /([^\u2401\u0001=]+)/,
              end: /=([^\u2401\u0001=]+)/,
              returnEnd: true,
              returnBegin: false,
              className: "attr"
            },
            {
              begin: /=/,
              end: /([\u2401\u0001])/,
              excludeEnd: true,
              excludeBegin: true,
              className: "string"
            }
          ]
        }
      ],
      case_insensitive: true
    };
  }
  fix_1 = fix;
  return fix_1;
}
export {
  requireFix as r
};
//# sourceMappingURL=fix-tVUvR-2O.chunk.mjs.map
