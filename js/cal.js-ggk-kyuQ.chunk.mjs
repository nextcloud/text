const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireCal } from "./cal-DwAQ4gcM.chunk.mjs";
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
var cal_js$2;
var hasRequiredCal_js;
function requireCal_js() {
  if (hasRequiredCal_js) return cal_js$2;
  hasRequiredCal_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/cal" instead of "highlight.js/lib/languages/cal.js"'
      );
    }
  }
  emitWarning();
  cal_js$2 = /* @__PURE__ */ requireCal();
  return cal_js$2;
}
var cal_jsExports = /* @__PURE__ */ requireCal_js();
const cal_js = /* @__PURE__ */ getDefaultExportFromCjs(cal_jsExports);
const cal_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: cal_js
}, [cal_jsExports]);
export {
  cal_js$1 as c
};
//# sourceMappingURL=cal.js-ggk-kyuQ.chunk.mjs.map
