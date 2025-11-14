const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireOcaml } from "./ocaml-DmcQ2V60.chunk.mjs";
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
var ocaml_js$2;
var hasRequiredOcaml_js;
function requireOcaml_js() {
  if (hasRequiredOcaml_js) return ocaml_js$2;
  hasRequiredOcaml_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/ocaml" instead of "highlight.js/lib/languages/ocaml.js"'
      );
    }
  }
  emitWarning();
  ocaml_js$2 = /* @__PURE__ */ requireOcaml();
  return ocaml_js$2;
}
var ocaml_jsExports = /* @__PURE__ */ requireOcaml_js();
const ocaml_js = /* @__PURE__ */ getDefaultExportFromCjs(ocaml_jsExports);
const ocaml_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: ocaml_js
}, [ocaml_jsExports]);
export {
  ocaml_js$1 as o
};
//# sourceMappingURL=ocaml.js-CTUwP8Vo.chunk.mjs.map
