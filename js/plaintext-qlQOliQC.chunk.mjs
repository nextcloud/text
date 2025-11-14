const appName = "text";
const appVersion = "7.0.0-dev.2";
var plaintext_1;
var hasRequiredPlaintext;
function requirePlaintext() {
  if (hasRequiredPlaintext) return plaintext_1;
  hasRequiredPlaintext = 1;
  function plaintext(hljs) {
    return {
      name: "Plain text",
      aliases: [
        "text",
        "txt"
      ],
      disableAutodetect: true
    };
  }
  plaintext_1 = plaintext;
  return plaintext_1;
}
export {
  requirePlaintext as r
};
//# sourceMappingURL=plaintext-qlQOliQC.chunk.mjs.map
