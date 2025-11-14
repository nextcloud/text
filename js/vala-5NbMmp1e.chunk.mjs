const appName = "text";
const appVersion = "7.0.0-dev.2";
var vala_1;
var hasRequiredVala;
function requireVala() {
  if (hasRequiredVala) return vala_1;
  hasRequiredVala = 1;
  function vala(hljs) {
    return {
      name: "Vala",
      keywords: {
        keyword: (
          // Value types
          "char uchar unichar int uint long ulong short ushort int8 int16 int32 int64 uint8 uint16 uint32 uint64 float double bool struct enum string void weak unowned owned async signal static abstract interface override virtual delegate if while do for foreach else switch case break default return try catch public private protected internal using new this get set const stdout stdin stderr var"
        ),
        built_in: "DBus GLib CCode Gee Object Gtk Posix",
        literal: "false true null"
      },
      contains: [
        {
          className: "class",
          beginKeywords: "class interface namespace",
          end: /\{/,
          excludeEnd: true,
          illegal: "[^,:\\n\\s\\.]",
          contains: [hljs.UNDERSCORE_TITLE_MODE]
        },
        hljs.C_LINE_COMMENT_MODE,
        hljs.C_BLOCK_COMMENT_MODE,
        {
          className: "string",
          begin: '"""',
          end: '"""',
          relevance: 5
        },
        hljs.APOS_STRING_MODE,
        hljs.QUOTE_STRING_MODE,
        hljs.C_NUMBER_MODE,
        {
          className: "meta",
          begin: "^#",
          end: "$"
        }
      ]
    };
  }
  vala_1 = vala;
  return vala_1;
}
export {
  requireVala as r
};
//# sourceMappingURL=vala-5NbMmp1e.chunk.mjs.map
