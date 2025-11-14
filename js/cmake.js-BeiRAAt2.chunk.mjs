const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireCmake } from "./cmake-BtW8Vz5A.chunk.mjs";
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
var cmake_js$2;
var hasRequiredCmake_js;
function requireCmake_js() {
  if (hasRequiredCmake_js) return cmake_js$2;
  hasRequiredCmake_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/cmake" instead of "highlight.js/lib/languages/cmake.js"'
      );
    }
  }
  emitWarning();
  cmake_js$2 = /* @__PURE__ */ requireCmake();
  return cmake_js$2;
}
var cmake_jsExports = /* @__PURE__ */ requireCmake_js();
const cmake_js = /* @__PURE__ */ getDefaultExportFromCjs(cmake_jsExports);
const cmake_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: cmake_js
}, [cmake_jsExports]);
export {
  cmake_js$1 as c
};
//# sourceMappingURL=cmake.js-BeiRAAt2.chunk.mjs.map
