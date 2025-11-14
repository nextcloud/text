const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireYaml } from "./yaml-BsEscfyE.chunk.mjs";
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
var yaml_js$2;
var hasRequiredYaml_js;
function requireYaml_js() {
  if (hasRequiredYaml_js) return yaml_js$2;
  hasRequiredYaml_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/yaml" instead of "highlight.js/lib/languages/yaml.js"'
      );
    }
  }
  emitWarning();
  yaml_js$2 = /* @__PURE__ */ requireYaml();
  return yaml_js$2;
}
var yaml_jsExports = /* @__PURE__ */ requireYaml_js();
const yaml_js = /* @__PURE__ */ getDefaultExportFromCjs(yaml_jsExports);
const yaml_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: yaml_js
}, [yaml_jsExports]);
export {
  yaml_js$1 as y
};
//# sourceMappingURL=yaml.js-DWvGdf7y.chunk.mjs.map
