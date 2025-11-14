const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireSubunit } from "./subunit-CfMqyYKw.chunk.mjs";
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
var subunit_js$2;
var hasRequiredSubunit_js;
function requireSubunit_js() {
  if (hasRequiredSubunit_js) return subunit_js$2;
  hasRequiredSubunit_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/subunit" instead of "highlight.js/lib/languages/subunit.js"'
      );
    }
  }
  emitWarning();
  subunit_js$2 = /* @__PURE__ */ requireSubunit();
  return subunit_js$2;
}
var subunit_jsExports = /* @__PURE__ */ requireSubunit_js();
const subunit_js = /* @__PURE__ */ getDefaultExportFromCjs(subunit_jsExports);
const subunit_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: subunit_js
}, [subunit_jsExports]);
export {
  subunit_js$1 as s
};
//# sourceMappingURL=subunit.js-DqoLsCth.chunk.mjs.map
