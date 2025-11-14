const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireDiff } from "./diff-EmBe7u1w.chunk.mjs";
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
var diff_js$2;
var hasRequiredDiff_js;
function requireDiff_js() {
  if (hasRequiredDiff_js) return diff_js$2;
  hasRequiredDiff_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/diff" instead of "highlight.js/lib/languages/diff.js"'
      );
    }
  }
  emitWarning();
  diff_js$2 = /* @__PURE__ */ requireDiff();
  return diff_js$2;
}
var diff_jsExports = /* @__PURE__ */ requireDiff_js();
const diff_js = /* @__PURE__ */ getDefaultExportFromCjs(diff_jsExports);
const diff_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: diff_js
}, [diff_jsExports]);
export {
  diff_js$1 as d
};
//# sourceMappingURL=diff.js-DWSvxzYE.chunk.mjs.map
