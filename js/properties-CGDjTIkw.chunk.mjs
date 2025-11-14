const appName = "text";
const appVersion = "7.0.0-dev.2";
var properties_1;
var hasRequiredProperties;
function requireProperties() {
  if (hasRequiredProperties) return properties_1;
  hasRequiredProperties = 1;
  function properties(hljs) {
    const WS0 = "[ \\t\\f]*";
    const WS1 = "[ \\t\\f]+";
    const EQUAL_DELIM = WS0 + "[:=]" + WS0;
    const WS_DELIM = WS1;
    const DELIM = "(" + EQUAL_DELIM + "|" + WS_DELIM + ")";
    const KEY = "([^\\\\:= \\t\\f\\n]|\\\\.)+";
    const DELIM_AND_VALUE = {
      // skip DELIM
      end: DELIM,
      relevance: 0,
      starts: {
        // value: everything until end of line (again, taking into account backslashes)
        className: "string",
        end: /$/,
        relevance: 0,
        contains: [
          { begin: "\\\\\\\\" },
          { begin: "\\\\\\n" }
        ]
      }
    };
    return {
      name: ".properties",
      disableAutodetect: true,
      case_insensitive: true,
      illegal: /\S/,
      contains: [
        hljs.COMMENT("^\\s*[!#]", "$"),
        // key: everything until whitespace or = or : (taking into account backslashes)
        // case of a key-value pair
        {
          returnBegin: true,
          variants: [
            { begin: KEY + EQUAL_DELIM },
            { begin: KEY + WS_DELIM }
          ],
          contains: [
            {
              className: "attr",
              begin: KEY,
              endsParent: true
            }
          ],
          starts: DELIM_AND_VALUE
        },
        // case of an empty key
        {
          className: "attr",
          begin: KEY + WS0 + "$"
        }
      ]
    };
  }
  properties_1 = properties;
  return properties_1;
}
export {
  requireProperties as r
};
//# sourceMappingURL=properties-CGDjTIkw.chunk.mjs.map
