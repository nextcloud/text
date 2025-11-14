const appName = "text";
const appVersion = "7.0.0-dev.2";
var haml_1;
var hasRequiredHaml;
function requireHaml() {
  if (hasRequiredHaml) return haml_1;
  hasRequiredHaml = 1;
  function haml(hljs) {
    return {
      name: "HAML",
      case_insensitive: true,
      contains: [
        {
          className: "meta",
          begin: "^!!!( (5|1\\.1|Strict|Frameset|Basic|Mobile|RDFa|XML\\b.*))?$",
          relevance: 10
        },
        // FIXME these comments should be allowed to span indented lines
        hljs.COMMENT(
          "^\\s*(!=#|=#|-#|/).*$",
          null,
          { relevance: 0 }
        ),
        {
          begin: "^\\s*(-|=|!=)(?!#)",
          end: /$/,
          subLanguage: "ruby",
          excludeBegin: true,
          excludeEnd: true
        },
        {
          className: "tag",
          begin: "^\\s*%",
          contains: [
            {
              className: "selector-tag",
              begin: "\\w+"
            },
            {
              className: "selector-id",
              begin: "#[\\w-]+"
            },
            {
              className: "selector-class",
              begin: "\\.[\\w-]+"
            },
            {
              begin: /\{\s*/,
              end: /\s*\}/,
              contains: [
                {
                  begin: ":\\w+\\s*=>",
                  end: ",\\s+",
                  returnBegin: true,
                  endsWithParent: true,
                  contains: [
                    {
                      className: "attr",
                      begin: ":\\w+"
                    },
                    hljs.APOS_STRING_MODE,
                    hljs.QUOTE_STRING_MODE,
                    {
                      begin: "\\w+",
                      relevance: 0
                    }
                  ]
                }
              ]
            },
            {
              begin: "\\(\\s*",
              end: "\\s*\\)",
              excludeEnd: true,
              contains: [
                {
                  begin: "\\w+\\s*=",
                  end: "\\s+",
                  returnBegin: true,
                  endsWithParent: true,
                  contains: [
                    {
                      className: "attr",
                      begin: "\\w+",
                      relevance: 0
                    },
                    hljs.APOS_STRING_MODE,
                    hljs.QUOTE_STRING_MODE,
                    {
                      begin: "\\w+",
                      relevance: 0
                    }
                  ]
                }
              ]
            }
          ]
        },
        { begin: "^\\s*[=~]\\s*" },
        {
          begin: /#\{/,
          end: /\}/,
          subLanguage: "ruby",
          excludeBegin: true,
          excludeEnd: true
        }
      ]
    };
  }
  haml_1 = haml;
  return haml_1;
}
export {
  requireHaml as r
};
//# sourceMappingURL=haml-C4FJMwrR.chunk.mjs.map
