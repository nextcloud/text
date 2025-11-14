const appName = "text";
const appVersion = "7.0.0-dev.2";
var mojolicious_1;
var hasRequiredMojolicious;
function requireMojolicious() {
  if (hasRequiredMojolicious) return mojolicious_1;
  hasRequiredMojolicious = 1;
  function mojolicious(hljs) {
    return {
      name: "Mojolicious",
      subLanguage: "xml",
      contains: [
        {
          className: "meta",
          begin: "^__(END|DATA)__$"
        },
        // mojolicious line
        {
          begin: "^\\s*%{1,2}={0,2}",
          end: "$",
          subLanguage: "perl"
        },
        // mojolicious block
        {
          begin: "<%{1,2}={0,2}",
          end: "={0,1}%>",
          subLanguage: "perl",
          excludeBegin: true,
          excludeEnd: true
        }
      ]
    };
  }
  mojolicious_1 = mojolicious;
  return mojolicious_1;
}
export {
  requireMojolicious as r
};
//# sourceMappingURL=mojolicious-OQxmuP0F.chunk.mjs.map
