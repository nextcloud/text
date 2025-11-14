const appName = "text";
const appVersion = "7.0.0-dev.2";
var roboconf_1;
var hasRequiredRoboconf;
function requireRoboconf() {
  if (hasRequiredRoboconf) return roboconf_1;
  hasRequiredRoboconf = 1;
  function roboconf(hljs) {
    const IDENTIFIER = "[a-zA-Z-_][^\\n{]+\\{";
    const PROPERTY = {
      className: "attribute",
      begin: /[a-zA-Z-_]+/,
      end: /\s*:/,
      excludeEnd: true,
      starts: {
        end: ";",
        relevance: 0,
        contains: [
          {
            className: "variable",
            begin: /\.[a-zA-Z-_]+/
          },
          {
            className: "keyword",
            begin: /\(optional\)/
          }
        ]
      }
    };
    return {
      name: "Roboconf",
      aliases: [
        "graph",
        "instances"
      ],
      case_insensitive: true,
      keywords: "import",
      contains: [
        // Facet sections
        {
          begin: "^facet " + IDENTIFIER,
          end: /\}/,
          keywords: "facet",
          contains: [
            PROPERTY,
            hljs.HASH_COMMENT_MODE
          ]
        },
        // Instance sections
        {
          begin: "^\\s*instance of " + IDENTIFIER,
          end: /\}/,
          keywords: "name count channels instance-data instance-state instance of",
          illegal: /\S/,
          contains: [
            "self",
            PROPERTY,
            hljs.HASH_COMMENT_MODE
          ]
        },
        // Component sections
        {
          begin: "^" + IDENTIFIER,
          end: /\}/,
          contains: [
            PROPERTY,
            hljs.HASH_COMMENT_MODE
          ]
        },
        // Comments
        hljs.HASH_COMMENT_MODE
      ]
    };
  }
  roboconf_1 = roboconf;
  return roboconf_1;
}
export {
  requireRoboconf as r
};
//# sourceMappingURL=roboconf-D5dVpgS6.chunk.mjs.map
