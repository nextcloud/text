const appName = "text";
const appVersion = "7.0.0-dev.2";
var vbscriptHtml_1;
var hasRequiredVbscriptHtml;
function requireVbscriptHtml() {
  if (hasRequiredVbscriptHtml) return vbscriptHtml_1;
  hasRequiredVbscriptHtml = 1;
  function vbscriptHtml(hljs) {
    return {
      name: "VBScript in HTML",
      subLanguage: "xml",
      contains: [
        {
          begin: "<%",
          end: "%>",
          subLanguage: "vbscript"
        }
      ]
    };
  }
  vbscriptHtml_1 = vbscriptHtml;
  return vbscriptHtml_1;
}
export {
  requireVbscriptHtml as r
};
//# sourceMappingURL=vbscript-html-CqWqGxSD.chunk.mjs.map
