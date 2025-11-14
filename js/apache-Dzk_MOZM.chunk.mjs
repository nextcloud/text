const appName = "text";
const appVersion = "7.0.0-dev.2";
var apache_1;
var hasRequiredApache;
function requireApache() {
  if (hasRequiredApache) return apache_1;
  hasRequiredApache = 1;
  function apache(hljs) {
    const NUMBER_REF = {
      className: "number",
      begin: /[$%]\d+/
    };
    const NUMBER = {
      className: "number",
      begin: /\b\d+/
    };
    const IP_ADDRESS = {
      className: "number",
      begin: /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}(:\d{1,5})?/
    };
    const PORT_NUMBER = {
      className: "number",
      begin: /:\d{1,5}/
    };
    return {
      name: "Apache config",
      aliases: ["apacheconf"],
      case_insensitive: true,
      contains: [
        hljs.HASH_COMMENT_MODE,
        {
          className: "section",
          begin: /<\/?/,
          end: />/,
          contains: [
            IP_ADDRESS,
            PORT_NUMBER,
            // low relevance prevents us from claming XML/HTML where this rule would
            // match strings inside of XML tags
            hljs.inherit(hljs.QUOTE_STRING_MODE, { relevance: 0 })
          ]
        },
        {
          className: "attribute",
          begin: /\w+/,
          relevance: 0,
          // keywords aren’t needed for highlighting per se, they only boost relevance
          // for a very generally defined mode (starts with a word, ends with line-end
          keywords: { _: [
            "order",
            "deny",
            "allow",
            "setenv",
            "rewriterule",
            "rewriteengine",
            "rewritecond",
            "documentroot",
            "sethandler",
            "errordocument",
            "loadmodule",
            "options",
            "header",
            "listen",
            "serverroot",
            "servername"
          ] },
          starts: {
            end: /$/,
            relevance: 0,
            keywords: { literal: "on off all deny allow" },
            contains: [
              {
                scope: "punctuation",
                match: /\\\n/
              },
              {
                className: "meta",
                begin: /\s\[/,
                end: /\]$/
              },
              {
                className: "variable",
                begin: /[\$%]\{/,
                end: /\}/,
                contains: [
                  "self",
                  NUMBER_REF
                ]
              },
              IP_ADDRESS,
              NUMBER,
              hljs.QUOTE_STRING_MODE
            ]
          }
        }
      ],
      illegal: /\S/
    };
  }
  apache_1 = apache;
  return apache_1;
}
export {
  requireApache as r
};
//# sourceMappingURL=apache-Dzk_MOZM.chunk.mjs.map
