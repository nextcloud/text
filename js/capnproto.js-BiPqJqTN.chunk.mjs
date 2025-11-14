const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireCapnproto } from "./capnproto-DZom_VNG.chunk.mjs";
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
var capnproto_js$2;
var hasRequiredCapnproto_js;
function requireCapnproto_js() {
  if (hasRequiredCapnproto_js) return capnproto_js$2;
  hasRequiredCapnproto_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/capnproto" instead of "highlight.js/lib/languages/capnproto.js"'
      );
    }
  }
  emitWarning();
  capnproto_js$2 = /* @__PURE__ */ requireCapnproto();
  return capnproto_js$2;
}
var capnproto_jsExports = /* @__PURE__ */ requireCapnproto_js();
const capnproto_js = /* @__PURE__ */ getDefaultExportFromCjs(capnproto_jsExports);
const capnproto_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: capnproto_js
}, [capnproto_jsExports]);
export {
  capnproto_js$1 as c
};
//# sourceMappingURL=capnproto.js-BiPqJqTN.chunk.mjs.map
