const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireBasic } from "./basic-Bygb69xD.chunk.mjs";
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
var basic_js$2;
var hasRequiredBasic_js;
function requireBasic_js() {
  if (hasRequiredBasic_js) return basic_js$2;
  hasRequiredBasic_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/basic" instead of "highlight.js/lib/languages/basic.js"'
      );
    }
  }
  emitWarning();
  basic_js$2 = /* @__PURE__ */ requireBasic();
  return basic_js$2;
}
var basic_jsExports = /* @__PURE__ */ requireBasic_js();
const basic_js = /* @__PURE__ */ getDefaultExportFromCjs(basic_jsExports);
const basic_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: basic_js
}, [basic_jsExports]);
export {
  basic_js$1 as b
};
//# sourceMappingURL=basic.js-BpFsGkDW.chunk.mjs.map
