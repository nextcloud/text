const appName = "text";
const appVersion = "7.0.0-dev.2";
var ldif_1;
var hasRequiredLdif;
function requireLdif() {
  if (hasRequiredLdif) return ldif_1;
  hasRequiredLdif = 1;
  function ldif(hljs) {
    return {
      name: "LDIF",
      contains: [
        {
          className: "attribute",
          match: "^dn(?=:)",
          relevance: 10
        },
        {
          className: "attribute",
          match: "^\\w+(?=:)"
        },
        {
          className: "literal",
          match: "^-"
        },
        hljs.HASH_COMMENT_MODE
      ]
    };
  }
  ldif_1 = ldif;
  return ldif_1;
}
export {
  requireLdif as r
};
//# sourceMappingURL=ldif-B9tp1LhA.chunk.mjs.map
