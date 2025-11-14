const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireTypescript } from "./typescript-C4o2EQFw.chunk.mjs";
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
var typescript_js$2;
var hasRequiredTypescript_js;
function requireTypescript_js() {
  if (hasRequiredTypescript_js) return typescript_js$2;
  hasRequiredTypescript_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/typescript" instead of "highlight.js/lib/languages/typescript.js"'
      );
    }
  }
  emitWarning();
  typescript_js$2 = /* @__PURE__ */ requireTypescript();
  return typescript_js$2;
}
var typescript_jsExports = /* @__PURE__ */ requireTypescript_js();
const typescript_js = /* @__PURE__ */ getDefaultExportFromCjs(typescript_jsExports);
const typescript_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: typescript_js
}, [typescript_jsExports]);
export {
  typescript_js$1 as t
};
//# sourceMappingURL=typescript.js-BuknsYqu.chunk.mjs.map
