const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireMakefile } from "./makefile-D2EPYpPG.chunk.mjs";
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
var makefile_js$2;
var hasRequiredMakefile_js;
function requireMakefile_js() {
  if (hasRequiredMakefile_js) return makefile_js$2;
  hasRequiredMakefile_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/makefile" instead of "highlight.js/lib/languages/makefile.js"'
      );
    }
  }
  emitWarning();
  makefile_js$2 = /* @__PURE__ */ requireMakefile();
  return makefile_js$2;
}
var makefile_jsExports = /* @__PURE__ */ requireMakefile_js();
const makefile_js = /* @__PURE__ */ getDefaultExportFromCjs(makefile_jsExports);
const makefile_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: makefile_js
}, [makefile_jsExports]);
export {
  makefile_js$1 as m
};
//# sourceMappingURL=makefile.js-B5LKDf0y.chunk.mjs.map
