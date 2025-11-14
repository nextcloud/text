const appName = "text";
const appVersion = "7.0.0-dev.2";
var profile_1;
var hasRequiredProfile;
function requireProfile() {
  if (hasRequiredProfile) return profile_1;
  hasRequiredProfile = 1;
  function profile(hljs) {
    return {
      name: "Python profiler",
      contains: [
        hljs.C_NUMBER_MODE,
        {
          begin: "[a-zA-Z_][\\da-zA-Z_]+\\.[\\da-zA-Z_]{1,3}",
          end: ":",
          excludeEnd: true
        },
        {
          begin: "(ncalls|tottime|cumtime)",
          end: "$",
          keywords: "ncalls tottime|10 cumtime|10 filename",
          relevance: 10
        },
        {
          begin: "function calls",
          end: "$",
          contains: [hljs.C_NUMBER_MODE],
          relevance: 10
        },
        hljs.APOS_STRING_MODE,
        hljs.QUOTE_STRING_MODE,
        {
          className: "string",
          begin: "\\(",
          end: "\\)$",
          excludeBegin: true,
          excludeEnd: true,
          relevance: 0
        }
      ]
    };
  }
  profile_1 = profile;
  return profile_1;
}
export {
  requireProfile as r
};
//# sourceMappingURL=profile-CaSz6SLJ.chunk.mjs.map
