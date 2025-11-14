const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireProtobuf } from "./protobuf-BnVguLT1.chunk.mjs";
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
var protobuf_js$2;
var hasRequiredProtobuf_js;
function requireProtobuf_js() {
  if (hasRequiredProtobuf_js) return protobuf_js$2;
  hasRequiredProtobuf_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/protobuf" instead of "highlight.js/lib/languages/protobuf.js"'
      );
    }
  }
  emitWarning();
  protobuf_js$2 = /* @__PURE__ */ requireProtobuf();
  return protobuf_js$2;
}
var protobuf_jsExports = /* @__PURE__ */ requireProtobuf_js();
const protobuf_js = /* @__PURE__ */ getDefaultExportFromCjs(protobuf_jsExports);
const protobuf_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: protobuf_js
}, [protobuf_jsExports]);
export {
  protobuf_js$1 as p
};
//# sourceMappingURL=protobuf.js-DVUeGjPX.chunk.mjs.map
