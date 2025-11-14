const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireExcel } from "./excel-BMALzh2w.chunk.mjs";
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
var excel_js$2;
var hasRequiredExcel_js;
function requireExcel_js() {
  if (hasRequiredExcel_js) return excel_js$2;
  hasRequiredExcel_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/excel" instead of "highlight.js/lib/languages/excel.js"'
      );
    }
  }
  emitWarning();
  excel_js$2 = /* @__PURE__ */ requireExcel();
  return excel_js$2;
}
var excel_jsExports = /* @__PURE__ */ requireExcel_js();
const excel_js = /* @__PURE__ */ getDefaultExportFromCjs(excel_jsExports);
const excel_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: excel_js
}, [excel_jsExports]);
export {
  excel_js$1 as e
};
//# sourceMappingURL=excel.js-D_jak7uG.chunk.mjs.map
