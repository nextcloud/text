const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireIrpf90 } from "./irpf90-C2JXi1jb.chunk.mjs";
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
var irpf90Exports = /* @__PURE__ */ requireIrpf90();
const irpf90 = /* @__PURE__ */ getDefaultExportFromCjs(irpf90Exports);
const irpf90$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: irpf90
}, [irpf90Exports]);
export {
  irpf90$1 as i
};
//# sourceMappingURL=irpf90-YkQTbStD.chunk.mjs.map
