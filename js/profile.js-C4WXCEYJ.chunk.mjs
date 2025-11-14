const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { r as requireProfile } from "./profile-CaSz6SLJ.chunk.mjs";
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
var profile_js$2;
var hasRequiredProfile_js;
function requireProfile_js() {
  if (hasRequiredProfile_js) return profile_js$2;
  hasRequiredProfile_js = 1;
  function emitWarning() {
    if (!emitWarning.warned) {
      emitWarning.warned = true;
      console.log(
        'Deprecation (warning): Using file extension in specifier is deprecated, use "highlight.js/lib/languages/profile" instead of "highlight.js/lib/languages/profile.js"'
      );
    }
  }
  emitWarning();
  profile_js$2 = /* @__PURE__ */ requireProfile();
  return profile_js$2;
}
var profile_jsExports = /* @__PURE__ */ requireProfile_js();
const profile_js = /* @__PURE__ */ getDefaultExportFromCjs(profile_jsExports);
const profile_js$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: profile_js
}, [profile_jsExports]);
export {
  profile_js$1 as p
};
//# sourceMappingURL=profile.js-C4WXCEYJ.chunk.mjs.map
