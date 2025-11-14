const appName = "text";
const appVersion = "7.0.0-dev.2";
var protobuf_1;
var hasRequiredProtobuf;
function requireProtobuf() {
  if (hasRequiredProtobuf) return protobuf_1;
  hasRequiredProtobuf = 1;
  function protobuf(hljs) {
    const KEYWORDS = [
      "package",
      "import",
      "option",
      "optional",
      "required",
      "repeated",
      "group",
      "oneof"
    ];
    const TYPES = [
      "double",
      "float",
      "int32",
      "int64",
      "uint32",
      "uint64",
      "sint32",
      "sint64",
      "fixed32",
      "fixed64",
      "sfixed32",
      "sfixed64",
      "bool",
      "string",
      "bytes"
    ];
    const CLASS_DEFINITION = {
      match: [
        /(message|enum|service)\s+/,
        hljs.IDENT_RE
      ],
      scope: {
        1: "keyword",
        2: "title.class"
      }
    };
    return {
      name: "Protocol Buffers",
      aliases: ["proto"],
      keywords: {
        keyword: KEYWORDS,
        type: TYPES,
        literal: [
          "true",
          "false"
        ]
      },
      contains: [
        hljs.QUOTE_STRING_MODE,
        hljs.NUMBER_MODE,
        hljs.C_LINE_COMMENT_MODE,
        hljs.C_BLOCK_COMMENT_MODE,
        CLASS_DEFINITION,
        {
          className: "function",
          beginKeywords: "rpc",
          end: /[{;]/,
          excludeEnd: true,
          keywords: "rpc returns"
        },
        {
          // match enum items (relevance)
          // BLAH = ...;
          begin: /^\s*[A-Z_]+(?=\s*=[^\n]+;$)/
        }
      ]
    };
  }
  protobuf_1 = protobuf;
  return protobuf_1;
}
export {
  requireProtobuf as r
};
//# sourceMappingURL=protobuf-BnVguLT1.chunk.mjs.map
