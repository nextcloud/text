const appName = "text";
const appVersion = "7.0.0-dev.2";
var phpTemplate_1;
var hasRequiredPhpTemplate;
function requirePhpTemplate() {
  if (hasRequiredPhpTemplate) return phpTemplate_1;
  hasRequiredPhpTemplate = 1;
  function phpTemplate(hljs) {
    return {
      name: "PHP template",
      subLanguage: "xml",
      contains: [
        {
          begin: /<\?(php|=)?/,
          end: /\?>/,
          subLanguage: "php",
          contains: [
            // We don't want the php closing tag ?> to close the PHP block when
            // inside any of the following blocks:
            {
              begin: "/\\*",
              end: "\\*/",
              skip: true
            },
            {
              begin: 'b"',
              end: '"',
              skip: true
            },
            {
              begin: "b'",
              end: "'",
              skip: true
            },
            hljs.inherit(hljs.APOS_STRING_MODE, {
              illegal: null,
              className: null,
              contains: null,
              skip: true
            }),
            hljs.inherit(hljs.QUOTE_STRING_MODE, {
              illegal: null,
              className: null,
              contains: null,
              skip: true
            })
          ]
        }
      ]
    };
  }
  phpTemplate_1 = phpTemplate;
  return phpTemplate_1;
}
export {
  requirePhpTemplate as r
};
//# sourceMappingURL=php-template-DVL4FeMY.chunk.mjs.map
