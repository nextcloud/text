const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireJbossCli } from "./jboss-cli-BK3Vn1zL.chunk.mjs";
function _mergeNamespaces(n, m) {
  for (var i = 0; i < m.length; i++) {
    const e = m[i];
    if (typeof e !== "string" && !Array.isArray(e)) {
      for (const k in e) {
        if (k !== "default" && !(k in n)) {
          const d = Object.getOwnPropertyDescriptor(e, k);
          if (d) {
            Object.defineProperty(n, k, d.get ? d : {
              enumerable: true,
              get: () => e[k]
            });
          }
        }
      }
    }
  }
  return Object.freeze(Object.defineProperty(n, Symbol.toStringTag, { value: "Module" }));
}
var jbossCli_js$2;
var hasRequiredJbossCli_js;
function requireJbossCli_js() {
  if (hasRequiredJbossCli_js) return jbossCli_js$2;
  hasRequiredJbossCli_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/jboss-cli" instead of "highlight.js/lib/languages/jboss-cli.js"'
      );
    }
  }
  emitWarning();
  jbossCli_js$2 = /* @__PURE__ */ requireJbossCli();
  return jbossCli_js$2;
}
var jbossCli_jsExports = /* @__PURE__ */ requireJbossCli_js();
const jbossCli_js = /* @__PURE__ */ getDefaultExportFromCjs(jbossCli_jsExports);
const jbossCli_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: jbossCli_js
}, [jbossCli_jsExports]);
export {
  jbossCli_js$1 as j
};
//# sourceMappingURL=jboss-cli.js-BLn4iCha.chunk.mjs.map
