const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireDns } from "./dns-BWIK5b_4.chunk.mjs";
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
var dns_js$2;
var hasRequiredDns_js;
function requireDns_js() {
  if (hasRequiredDns_js) return dns_js$2;
  hasRequiredDns_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/dns" instead of "highlight.js/lib/languages/dns.js"'
      );
    }
  }
  emitWarning();
  dns_js$2 = /* @__PURE__ */ requireDns();
  return dns_js$2;
}
var dns_jsExports = /* @__PURE__ */ requireDns_js();
const dns_js = /* @__PURE__ */ getDefaultExportFromCjs(dns_jsExports);
const dns_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: dns_js
}, [dns_jsExports]);
export {
  dns_js$1 as d
};
//# sourceMappingURL=dns.js-DEzdqWi_.chunk.mjs.map
