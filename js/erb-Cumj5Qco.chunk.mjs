const appName = "text";
const appVersion = "7.0.0-dev.2";
var erb_1;
var hasRequiredErb;
function requireErb() {
  if (hasRequiredErb) return erb_1;
  hasRequiredErb = 1;
  function erb(hljs) {
    return {
      name: "ERB",
      subLanguage: "xml",
      contains: [
        hljs.COMMENT("<%#", "%>"),
        {
          begin: "<%[%=-]?",
          end: "[%-]?%>",
          subLanguage: "ruby",
          excludeBegin: true,
          excludeEnd: true
        }
      ]
    };
  }
  erb_1 = erb;
  return erb_1;
}
export {
  requireErb as r
};
//# sourceMappingURL=erb-Cumj5Qco.chunk.mjs.map
