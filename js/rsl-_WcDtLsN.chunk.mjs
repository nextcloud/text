const appName = "text";
const appVersion = "7.0.0-dev.2";
var rsl_1;
var hasRequiredRsl;
function requireRsl() {
  if (hasRequiredRsl) return rsl_1;
  hasRequiredRsl = 1;
  function rsl(hljs) {
    const BUILT_INS = [
      "abs",
      "acos",
      "ambient",
      "area",
      "asin",
      "atan",
      "atmosphere",
      "attribute",
      "calculatenormal",
      "ceil",
      "cellnoise",
      "clamp",
      "comp",
      "concat",
      "cos",
      "degrees",
      "depth",
      "Deriv",
      "diffuse",
      "distance",
      "Du",
      "Dv",
      "environment",
      "exp",
      "faceforward",
      "filterstep",
      "floor",
      "format",
      "fresnel",
      "incident",
      "length",
      "lightsource",
      "log",
      "match",
      "max",
      "min",
      "mod",
      "noise",
      "normalize",
      "ntransform",
      "opposite",
      "option",
      "phong",
      "pnoise",
      "pow",
      "printf",
      "ptlined",
      "radians",
      "random",
      "reflect",
      "refract",
      "renderinfo",
      "round",
      "setcomp",
      "setxcomp",
      "setycomp",
      "setzcomp",
      "shadow",
      "sign",
      "sin",
      "smoothstep",
      "specular",
      "specularbrdf",
      "spline",
      "sqrt",
      "step",
      "tan",
      "texture",
      "textureinfo",
      "trace",
      "transform",
      "vtransform",
      "xcomp",
      "ycomp",
      "zcomp"
    ];
    const TYPES = [
      "matrix",
      "float",
      "color",
      "point",
      "normal",
      "vector"
    ];
    const KEYWORDS = [
      "while",
      "for",
      "if",
      "do",
      "return",
      "else",
      "break",
      "extern",
      "continue"
    ];
    const CLASS_DEFINITION = {
      match: [
        /(surface|displacement|light|volume|imager)/,
        /\s+/,
        hljs.IDENT_RE
      ],
      scope: {
        1: "keyword",
        3: "title.class"
      }
    };
    return {
      name: "RenderMan RSL",
      keywords: {
        keyword: KEYWORDS,
        built_in: BUILT_INS,
        type: TYPES
      },
      illegal: "</",
      contains: [
        hljs.C_LINE_COMMENT_MODE,
        hljs.C_BLOCK_COMMENT_MODE,
        hljs.QUOTE_STRING_MODE,
        hljs.APOS_STRING_MODE,
        hljs.C_NUMBER_MODE,
        {
          className: "meta",
          begin: "#",
          end: "$"
        },
        CLASS_DEFINITION,
        {
          beginKeywords: "illuminate illuminance gather",
          end: "\\("
        }
      ]
    };
  }
  rsl_1 = rsl;
  return rsl_1;
}
export {
  requireRsl as r
};
//# sourceMappingURL=rsl-_WcDtLsN.chunk.mjs.map
