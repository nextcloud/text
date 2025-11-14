const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireJson } from "./json-BBdVDK-t.chunk.mjs";
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
var json_js$2;
var hasRequiredJson_js;
function requireJson_js() {
  if (hasRequiredJson_js) return json_js$2;
  hasRequiredJson_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/json" instead of "highlight.js/lib/languages/json.js"'
      );
    }
  }
  emitWarning();
  json_js$2 = /* @__PURE__ */ requireJson();
  return json_js$2;
}
var json_jsExports = /* @__PURE__ */ requireJson_js();
const json_js = /* @__PURE__ */ getDefaultExportFromCjs(json_jsExports);
const json_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: json_js
}, [json_jsExports]);
export {
  json_js$1 as j
};
//# sourceMappingURL=json.js-BgsnSADa.chunk.mjs.map
