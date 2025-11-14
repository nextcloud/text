const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireGradle } from "./gradle-OSp3_K-S.chunk.mjs";
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
var gradle_js$2;
var hasRequiredGradle_js;
function requireGradle_js() {
  if (hasRequiredGradle_js) return gradle_js$2;
  hasRequiredGradle_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/gradle" instead of "highlight.js/lib/languages/gradle.js"'
      );
    }
  }
  emitWarning();
  gradle_js$2 = /* @__PURE__ */ requireGradle();
  return gradle_js$2;
}
var gradle_jsExports = /* @__PURE__ */ requireGradle_js();
const gradle_js = /* @__PURE__ */ getDefaultExportFromCjs(gradle_jsExports);
const gradle_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: gradle_js
}, [gradle_jsExports]);
export {
  gradle_js$1 as g
};
//# sourceMappingURL=gradle.js-CVjggzwG.chunk.mjs.map
