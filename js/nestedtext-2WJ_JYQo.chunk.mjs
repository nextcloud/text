const appName = "text";
const appVersion = "7.0.0-dev.2";
var nestedtext_1;
var hasRequiredNestedtext;
function requireNestedtext() {
  if (hasRequiredNestedtext) return nestedtext_1;
  hasRequiredNestedtext = 1;
  function nestedtext(hljs) {
    const NESTED = {
      match: [
        /^\s*(?=\S)/,
        // have to look forward here to avoid polynomial backtracking
        /[^:]+/,
        /:\s*/,
        /$/
      ],
      className: {
        2: "attribute",
        3: "punctuation"
      }
    };
    const DICTIONARY_ITEM = {
      match: [
        /^\s*(?=\S)/,
        // have to look forward here to avoid polynomial backtracking
        /[^:]*[^: ]/,
        /[ ]*:/,
        /[ ]/,
        /.*$/
      ],
      className: {
        2: "attribute",
        3: "punctuation",
        5: "string"
      }
    };
    const STRING = {
      match: [
        /^\s*/,
        />/,
        /[ ]/,
        /.*$/
      ],
      className: {
        2: "punctuation",
        4: "string"
      }
    };
    const LIST_ITEM = {
      variants: [
        { match: [
          /^\s*/,
          /-/,
          /[ ]/,
          /.*$/
        ] },
        { match: [
          /^\s*/,
          /-$/
        ] }
      ],
      className: {
        2: "bullet",
        4: "string"
      }
    };
    return {
      name: "Nested Text",
      aliases: ["nt"],
      contains: [
        hljs.inherit(hljs.HASH_COMMENT_MODE, {
          begin: /^\s*(?=#)/,
          excludeBegin: true
        }),
        LIST_ITEM,
        STRING,
        NESTED,
        DICTIONARY_ITEM
      ]
    };
  }
  nestedtext_1 = nestedtext;
  return nestedtext_1;
}
export {
  requireNestedtext as r
};
//# sourceMappingURL=nestedtext-2WJ_JYQo.chunk.mjs.map
