const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireDockerfile } from "./dockerfile-nbOyeLaq.chunk.mjs";
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
var dockerfile_js$2;
var hasRequiredDockerfile_js;
function requireDockerfile_js() {
  if (hasRequiredDockerfile_js) return dockerfile_js$2;
  hasRequiredDockerfile_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/dockerfile" instead of "highlight.js/lib/languages/dockerfile.js"'
      );
    }
  }
  emitWarning();
  dockerfile_js$2 = /* @__PURE__ */ requireDockerfile();
  return dockerfile_js$2;
}
var dockerfile_jsExports = /* @__PURE__ */ requireDockerfile_js();
const dockerfile_js = /* @__PURE__ */ getDefaultExportFromCjs(dockerfile_jsExports);
const dockerfile_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: dockerfile_js
}, [dockerfile_jsExports]);
export {
  dockerfile_js$1 as d
};
//# sourceMappingURL=dockerfile.js-xZhN_ic0.chunk.mjs.map
