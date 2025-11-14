const appName = "text";
const appVersion = "7.0.0-dev.2";
var brainfuck_1;
var hasRequiredBrainfuck;
function requireBrainfuck() {
  if (hasRequiredBrainfuck) return brainfuck_1;
  hasRequiredBrainfuck = 1;
  function brainfuck(hljs) {
    const LITERAL = {
      className: "literal",
      begin: /[+-]+/,
      relevance: 0
    };
    return {
      name: "Brainfuck",
      aliases: ["bf"],
      contains: [
        hljs.COMMENT(
          /[^\[\]\.,\+\-<> \r\n]/,
          /[\[\]\.,\+\-<> \r\n]/,
          {
            contains: [
              {
                match: /[ ]+[^\[\]\.,\+\-<> \r\n]/,
                relevance: 0
              }
            ],
            returnEnd: true,
            relevance: 0
          }
        ),
        {
          className: "title",
          begin: "[\\[\\]]",
          relevance: 0
        },
        {
          className: "string",
          begin: "[\\.,]",
          relevance: 0
        },
        {
          // this mode works as the only relevance counter
          // it looks ahead to find the start of a run of literals
          // so only the runs are counted as relevant
          begin: /(?=\+\+|--)/,
          contains: [LITERAL]
        },
        LITERAL
      ]
    };
  }
  brainfuck_1 = brainfuck;
  return brainfuck_1;
}
export {
  requireBrainfuck as r
};
//# sourceMappingURL=brainfuck-BgB3Q9vS.chunk.mjs.map
