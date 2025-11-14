const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireVerilog } from "./verilog-UvmNwRqg.chunk.mjs";
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
var verilog_js$2;
var hasRequiredVerilog_js;
function requireVerilog_js() {
  if (hasRequiredVerilog_js) return verilog_js$2;
  hasRequiredVerilog_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/verilog" instead of "highlight.js/lib/languages/verilog.js"'
      );
    }
  }
  emitWarning();
  verilog_js$2 = /* @__PURE__ */ requireVerilog();
  return verilog_js$2;
}
var verilog_jsExports = /* @__PURE__ */ requireVerilog_js();
const verilog_js = /* @__PURE__ */ getDefaultExportFromCjs(verilog_jsExports);
const verilog_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: verilog_js
}, [verilog_jsExports]);
export {
  verilog_js$1 as v
};
//# sourceMappingURL=verilog.js-CbdfKq7S.chunk.mjs.map
