const appName = "text";
const appVersion = "7.0.0-dev.2";
var leaf_1;
var hasRequiredLeaf;
function requireLeaf() {
  if (hasRequiredLeaf) return leaf_1;
  hasRequiredLeaf = 1;
  function leaf(hljs) {
    const IDENT = /([A-Za-z_][A-Za-z_0-9]*)?/;
    const LITERALS = [
      "true",
      "false",
      "in"
    ];
    const PARAMS = {
      scope: "params",
      begin: /\(/,
      end: /\)(?=\:?)/,
      endsParent: true,
      relevance: 7,
      contains: [
        {
          scope: "string",
          begin: '"',
          end: '"'
        },
        {
          scope: "keyword",
          match: LITERALS.join("|")
        },
        {
          scope: "variable",
          match: /[A-Za-z_][A-Za-z_0-9]*/
        },
        {
          scope: "operator",
          match: /\+|\-|\*|\/|\%|\=\=|\=|\!|\>|\<|\&\&|\|\|/
        }
      ]
    };
    const INSIDE_DISPATCH = {
      match: [
        IDENT,
        /(?=\()/
      ],
      scope: {
        1: "keyword"
      },
      contains: [PARAMS]
    };
    PARAMS.contains.unshift(INSIDE_DISPATCH);
    return {
      name: "Leaf",
      contains: [
        // #ident():
        {
          match: [
            /#+/,
            IDENT,
            /(?=\()/
          ],
          scope: {
            1: "punctuation",
            2: "keyword"
          },
          // will start up after the ending `)` match from line ~44
          // just to grab the trailing `:` if we can match it
          starts: {
            contains: [
              {
                match: /\:/,
                scope: "punctuation"
              }
            ]
          },
          contains: [
            PARAMS
          ]
        },
        // #ident or #ident:
        {
          match: [
            /#+/,
            IDENT,
            /:?/
          ],
          scope: {
            1: "punctuation",
            2: "keyword",
            3: "punctuation"
          }
        }
      ]
    };
  }
  leaf_1 = leaf;
  return leaf_1;
}
export {
  requireLeaf as r
};
//# sourceMappingURL=leaf-DYkbBiHU.chunk.mjs.map
