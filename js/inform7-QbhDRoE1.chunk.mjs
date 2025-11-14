const appName = "text";
const appVersion = "7.0.0-dev.2";
var inform7_1;
var hasRequiredInform7;
function requireInform7() {
  if (hasRequiredInform7) return inform7_1;
  hasRequiredInform7 = 1;
  function inform7(hljs) {
    const START_BRACKET = "\\[";
    const END_BRACKET = "\\]";
    return {
      name: "Inform 7",
      aliases: ["i7"],
      case_insensitive: true,
      keywords: {
        // Some keywords more or less unique to I7, for relevance.
        keyword: (
          // kind:
          "thing room person man woman animal container supporter backdrop door scenery open closed locked inside gender is are say understand kind of rule"
        )
      },
      contains: [
        {
          className: "string",
          begin: '"',
          end: '"',
          relevance: 0,
          contains: [
            {
              className: "subst",
              begin: START_BRACKET,
              end: END_BRACKET
            }
          ]
        },
        {
          className: "section",
          begin: /^(Volume|Book|Part|Chapter|Section|Table)\b/,
          end: "$"
        },
        {
          // Rule definition
          // This is here for relevance.
          begin: /^(Check|Carry out|Report|Instead of|To|Rule|When|Before|After)\b/,
          end: ":",
          contains: [
            {
              // Rule name
              begin: "\\(This",
              end: "\\)"
            }
          ]
        },
        {
          className: "comment",
          begin: START_BRACKET,
          end: END_BRACKET,
          contains: ["self"]
        }
      ]
    };
  }
  inform7_1 = inform7;
  return inform7_1;
}
export {
  requireInform7 as r
};
//# sourceMappingURL=inform7-QbhDRoE1.chunk.mjs.map
