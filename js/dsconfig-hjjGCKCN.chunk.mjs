const appName = "text";
const appVersion = "7.0.0-dev.2";
var dsconfig_1;
var hasRequiredDsconfig;
function requireDsconfig() {
  if (hasRequiredDsconfig) return dsconfig_1;
  hasRequiredDsconfig = 1;
  function dsconfig(hljs) {
    const QUOTED_PROPERTY = {
      className: "string",
      begin: /"/,
      end: /"/
    };
    const APOS_PROPERTY = {
      className: "string",
      begin: /'/,
      end: /'/
    };
    const UNQUOTED_PROPERTY = {
      className: "string",
      begin: /[\w\-?]+:\w+/,
      end: /\W/,
      relevance: 0
    };
    const VALUELESS_PROPERTY = {
      className: "string",
      begin: /\w+(\-\w+)*/,
      end: /(?=\W)/,
      relevance: 0
    };
    return {
      keywords: "dsconfig",
      contains: [
        {
          className: "keyword",
          begin: "^dsconfig",
          end: /\s/,
          excludeEnd: true,
          relevance: 10
        },
        {
          className: "built_in",
          begin: /(list|create|get|set|delete)-(\w+)/,
          end: /\s/,
          excludeEnd: true,
          illegal: "!@#$%^&*()",
          relevance: 10
        },
        {
          className: "built_in",
          begin: /--(\w+)/,
          end: /\s/,
          excludeEnd: true
        },
        QUOTED_PROPERTY,
        APOS_PROPERTY,
        UNQUOTED_PROPERTY,
        VALUELESS_PROPERTY,
        hljs.HASH_COMMENT_MODE
      ]
    };
  }
  dsconfig_1 = dsconfig;
  return dsconfig_1;
}
export {
  requireDsconfig as r
};
//# sourceMappingURL=dsconfig-hjjGCKCN.chunk.mjs.map
