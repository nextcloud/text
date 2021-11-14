(window["textWebpackJsonp"] = window["textWebpackJsonp"] || []).push([["vendors~editor-collab"],{

/***/ "./node_modules/@nextcloud/vue/dist/Components/Popover.js":
/*!****************************************************************!*\
  !*** ./node_modules/@nextcloud/vue/dist/Components/Popover.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

!function (t, n) {
  "object" == ( false ? undefined : _typeof(exports)) && "object" == ( false ? undefined : _typeof(module)) ? module.exports = n() :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (n),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : undefined;
}(window, function () {
  return function (t) {
    var n = {};

    function r(o) {
      if (n[o]) return n[o].exports;
      var e = n[o] = {
        i: o,
        l: !1,
        exports: {}
      };
      return t[o].call(e.exports, e, e.exports, r), e.l = !0, e.exports;
    }

    return r.m = t, r.c = n, r.d = function (t, n, o) {
      r.o(t, n) || Object.defineProperty(t, n, {
        enumerable: !0,
        get: o
      });
    }, r.r = function (t) {
      "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
        value: "Module"
      }), Object.defineProperty(t, "__esModule", {
        value: !0
      });
    }, r.t = function (t, n) {
      if (1 & n && (t = r(t)), 8 & n) return t;
      if (4 & n && "object" == _typeof(t) && t && t.__esModule) return t;
      var o = Object.create(null);
      if (r.r(o), Object.defineProperty(o, "default", {
        enumerable: !0,
        value: t
      }), 2 & n && "string" != typeof t) for (var e in t) {
        r.d(o, e, function (n) {
          return t[n];
        }.bind(null, e));
      }
      return o;
    }, r.n = function (t) {
      var n = t && t.__esModule ? function () {
        return t.default;
      } : function () {
        return t;
      };
      return r.d(n, "a", n), n;
    }, r.o = function (t, n) {
      return Object.prototype.hasOwnProperty.call(t, n);
    }, r.p = "/dist/", r(r.s = 47);
  }({
    0: function _(t, n, r) {
      "use strict";

      function o(t, n) {
        return function (t) {
          if (Array.isArray(t)) return t;
        }(t) || function (t, n) {
          if ("undefined" == typeof Symbol || !(Symbol.iterator in Object(t))) return;
          var r = [],
              o = !0,
              e = !1,
              i = void 0;

          try {
            for (var a, p = t[Symbol.iterator](); !(o = (a = p.next()).done) && (r.push(a.value), !n || r.length !== n); o = !0) {
              ;
            }
          } catch (t) {
            e = !0, i = t;
          } finally {
            try {
              o || null == p.return || p.return();
            } finally {
              if (e) throw i;
            }
          }

          return r;
        }(t, n) || function (t, n) {
          if (!t) return;
          if ("string" == typeof t) return e(t, n);
          var r = Object.prototype.toString.call(t).slice(8, -1);
          "Object" === r && t.constructor && (r = t.constructor.name);
          if ("Map" === r || "Set" === r) return Array.from(t);
          if ("Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return e(t, n);
        }(t, n) || function () {
          throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        }();
      }

      function e(t, n) {
        (null == n || n > t.length) && (n = t.length);

        for (var r = 0, o = new Array(n); r < n; r++) {
          o[r] = t[r];
        }

        return o;
      }

      t.exports = function (t) {
        var n = o(t, 4),
            r = n[1],
            e = n[3];

        if ("function" == typeof btoa) {
          var i = btoa(unescape(encodeURIComponent(JSON.stringify(e)))),
              a = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(i),
              p = "/*# ".concat(a, " */"),
              c = e.sources.map(function (t) {
            return "/*# sourceURL=".concat(e.sourceRoot || "").concat(t, " */");
          });
          return [r].concat(c).concat([p]).join("\n");
        }

        return [r].join("\n");
      };
    },
    1: function _(t, n, r) {
      "use strict";

      t.exports = function (t) {
        var n = [];
        return n.toString = function () {
          return this.map(function (n) {
            var r = t(n);
            return n[2] ? "@media ".concat(n[2], " {").concat(r, "}") : r;
          }).join("");
        }, n.i = function (t, r, o) {
          "string" == typeof t && (t = [[null, t, ""]]);
          var e = {};
          if (o) for (var i = 0; i < this.length; i++) {
            var a = this[i][0];
            null != a && (e[a] = !0);
          }

          for (var p = 0; p < t.length; p++) {
            var c = [].concat(t[p]);
            o && e[c[0]] || (r && (c[2] ? c[2] = "".concat(r, " and ").concat(c[2]) : c[2] = r), n.push(c));
          }
        }, n;
      };
    },
    19: function _(t, n, r) {
      "use strict";

      var o = r(0),
          e = r.n(o),
          i = r(1),
          a = r.n(i)()(e.a);
      a.push([t.i, ".popover{z-index:100000;display:block !important;filter:drop-shadow(0 1px 10px var(--color-box-shadow))}.popover__inner{padding:0;color:var(--color-main-text);border-radius:var(--border-radius);background:var(--color-main-background)}.popover__arrow{position:absolute;z-index:1;width:0;height:0;margin:10px;border-style:solid;border-color:var(--color-main-background)}.popover[x-placement^='top']{margin-bottom:10px}.popover[x-placement^='top'] .popover__arrow{bottom:-10px;left:calc(50% - $arrow-width);margin-top:0;margin-bottom:0;border-width:10px 10px 0 10px;border-right-color:transparent !important;border-bottom-color:transparent !important;border-left-color:transparent !important}.popover[x-placement^='bottom']{margin-top:10px}.popover[x-placement^='bottom'] .popover__arrow{top:-10px;left:calc(50% - $arrow-width);margin-top:0;margin-bottom:0;border-width:0 10px 10px 10px;border-top-color:transparent !important;border-right-color:transparent !important;border-left-color:transparent !important}.popover[x-placement^='right']{margin-left:10px}.popover[x-placement^='right'] .popover__arrow{top:calc(50% - $arrow-width);left:-10px;margin-right:0;margin-left:0;border-width:10px 10px 10px 0;border-top-color:transparent !important;border-bottom-color:transparent !important;border-left-color:transparent !important}.popover[x-placement^='left']{margin-right:10px}.popover[x-placement^='left'] .popover__arrow{top:calc(50% - $arrow-width);right:-10px;margin-right:0;margin-left:0;border-width:10px 0 10px 10px;border-top-color:transparent !important;border-right-color:transparent !important;border-bottom-color:transparent !important}.popover[aria-hidden='true']{visibility:hidden;transition:opacity var(--animation-quick),visibility var(--animation-quick);opacity:0}.popover[aria-hidden='false']{visibility:visible;transition:opacity var(--animation-quick);opacity:1}\n", "", {
        version: 3,
        sources: ["webpack://./Popover.vue"],
        names: [],
        mappings: "AAgHA,SACC,cAAe,CACf,wBAAyB,CAEzB,sDAAuD,CAEvD,gBACC,SAAU,CACV,4BAA6B,CAC7B,kCAAmC,CACnC,uCAAwC,CACxC,gBAGA,iBAAkB,CAClB,SAAU,CACV,OAAQ,CACR,QAAS,CACT,WApBgB,CAqBhB,kBAAmB,CACnB,yCAA0C,CApB5C,6BAwBE,kBA1BgB,CAElB,6CA2BG,YA7Be,CA8Bf,6BAA8B,CAC9B,YAAa,CACb,eAAgB,CAChB,6BAjCe,CAkCf,yCAA0C,CAC1C,0CAA2C,CAC3C,wCAAyC,CAlC5C,gCAuCE,eAzCgB,CAElB,gDA0CG,SA5Ce,CA6Cf,6BAA8B,CAC9B,YAAa,CACb,eAAgB,CAChB,6BAhDe,CAiDf,uCAAwC,CACxC,yCAA0C,CAC1C,wCAAyC,CAjD5C,+BAsDE,gBAxDgB,CAElB,+CAyDG,4BAA6B,CAC7B,UA5De,CA6Df,cAAe,CACf,aAAc,CACd,6BAAsD,CACtD,uCAAwC,CACxC,0CAA2C,CAC3C,wCAAyC,CAhE5C,8BAqEE,iBAvEgB,CAElB,8CAwEG,4BAA6B,CAC7B,WA3Ee,CA4Ef,cAAe,CACf,aAAc,CACd,6BA9Ee,CA+Ef,uCAAwC,CACxC,yCAA0C,CAC1C,0CAA2C,CA/E9C,6BAoFE,iBAAkB,CAClB,2EAA6E,CAC7E,SAAU,CAtFZ,8BA0FE,kBAAmB,CACnB,yCAA0C,CAC1C,SAAU",
        sourcesContent: ["$scope_version:\"6b494fc\"; @import 'variables';\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n$arrow-width: 10px;\n\n.popover {\n\tz-index: 100000;\n\tdisplay: block !important;\n\n\tfilter: drop-shadow(0 1px 10px var(--color-box-shadow));\n\n\t&__inner {\n\t\tpadding: 0;\n\t\tcolor: var(--color-main-text);\n\t\tborder-radius: var(--border-radius);\n\t\tbackground: var(--color-main-background);\n\t}\n\n\t&__arrow {\n\t\tposition: absolute;\n\t\tz-index: 1;\n\t\twidth: 0;\n\t\theight: 0;\n\t\tmargin: $arrow-width;\n\t\tborder-style: solid;\n\t\tborder-color: var(--color-main-background);\n\t}\n\n\t&[x-placement^='top'] {\n\t\tmargin-bottom: $arrow-width;\n\n\t\t.popover__arrow {\n\t\t\tbottom: -$arrow-width;\n\t\t\tleft: calc(50% - $arrow-width);\n\t\t\tmargin-top: 0;\n\t\t\tmargin-bottom: 0;\n\t\t\tborder-width: $arrow-width $arrow-width 0 $arrow-width;\n\t\t\tborder-right-color: transparent !important;\n\t\t\tborder-bottom-color: transparent !important;\n\t\t\tborder-left-color: transparent !important;\n\t\t}\n\t}\n\n\t&[x-placement^='bottom'] {\n\t\tmargin-top: $arrow-width;\n\n\t\t.popover__arrow {\n\t\t\ttop: -$arrow-width;\n\t\t\tleft: calc(50% - $arrow-width);\n\t\t\tmargin-top: 0;\n\t\t\tmargin-bottom: 0;\n\t\t\tborder-width: 0 $arrow-width $arrow-width $arrow-width;\n\t\t\tborder-top-color: transparent !important;\n\t\t\tborder-right-color: transparent !important;\n\t\t\tborder-left-color: transparent !important;\n\t\t}\n\t}\n\n\t&[x-placement^='right'] {\n\t\tmargin-left: $arrow-width;\n\n\t\t.popover__arrow {\n\t\t\ttop: calc(50% - $arrow-width);\n\t\t\tleft: -$arrow-width;\n\t\t\tmargin-right: 0;\n\t\t\tmargin-left: 0;\n\t\t\tborder-width: $arrow-width $arrow-width $arrow-width 0;\n\t\t\tborder-top-color: transparent !important;\n\t\t\tborder-bottom-color: transparent !important;\n\t\t\tborder-left-color: transparent !important;\n\t\t}\n\t}\n\n\t&[x-placement^='left'] {\n\t\tmargin-right: $arrow-width;\n\n\t\t.popover__arrow {\n\t\t\ttop: calc(50% - $arrow-width);\n\t\t\tright: -$arrow-width;\n\t\t\tmargin-right: 0;\n\t\t\tmargin-left: 0;\n\t\t\tborder-width: $arrow-width 0 $arrow-width $arrow-width;\n\t\t\tborder-top-color: transparent !important;\n\t\t\tborder-right-color: transparent !important;\n\t\t\tborder-bottom-color: transparent !important;\n\t\t}\n\t}\n\n\t&[aria-hidden='true'] {\n\t\tvisibility: hidden;\n\t\ttransition: opacity var(--animation-quick), visibility var(--animation-quick);\n\t\topacity: 0;\n\t}\n\n\t&[aria-hidden='false'] {\n\t\tvisibility: visible;\n\t\ttransition: opacity var(--animation-quick);\n\t\topacity: 1;\n\t}\n}\n\n"],
        sourceRoot: ""
      }]), n.a = a;
    },
    2: function _(t, n, r) {
      "use strict";

      var o,
          e = function e() {
        return void 0 === o && (o = Boolean(window && document && document.all && !window.atob)), o;
      },
          i = function () {
        var t = {};
        return function (n) {
          if (void 0 === t[n]) {
            var r = document.querySelector(n);
            if (window.HTMLIFrameElement && r instanceof window.HTMLIFrameElement) try {
              r = r.contentDocument.head;
            } catch (t) {
              r = null;
            }
            t[n] = r;
          }

          return t[n];
        };
      }(),
          a = [];

      function p(t) {
        for (var n = -1, r = 0; r < a.length; r++) {
          if (a[r].identifier === t) {
            n = r;
            break;
          }
        }

        return n;
      }

      function c(t, n) {
        for (var r = {}, o = [], e = 0; e < t.length; e++) {
          var i = t[e],
              c = n.base ? i[0] + n.base : i[0],
              s = r[c] || 0,
              l = "".concat(c, " ").concat(s);
          r[c] = s + 1;
          var d = p(l),
              u = {
            css: i[1],
            media: i[2],
            sourceMap: i[3]
          };
          -1 !== d ? (a[d].references++, a[d].updater(u)) : a.push({
            identifier: l,
            updater: m(u, n),
            references: 1
          }), o.push(l);
        }

        return o;
      }

      function s(t) {
        var n = document.createElement("style"),
            o = t.attributes || {};

        if (void 0 === o.nonce) {
          var e = r.nc;
          e && (o.nonce = e);
        }

        if (Object.keys(o).forEach(function (t) {
          n.setAttribute(t, o[t]);
        }), "function" == typeof t.insert) t.insert(n);else {
          var a = i(t.insert || "head");
          if (!a) throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
          a.appendChild(n);
        }
        return n;
      }

      var l,
          d = (l = [], function (t, n) {
        return l[t] = n, l.filter(Boolean).join("\n");
      });

      function u(t, n, r, o) {
        var e = r ? "" : o.media ? "@media ".concat(o.media, " {").concat(o.css, "}") : o.css;
        if (t.styleSheet) t.styleSheet.cssText = d(n, e);else {
          var i = document.createTextNode(e),
              a = t.childNodes;
          a[n] && t.removeChild(a[n]), a.length ? t.insertBefore(i, a[n]) : t.appendChild(i);
        }
      }

      function f(t, n, r) {
        var o = r.css,
            e = r.media,
            i = r.sourceMap;
        if (e ? t.setAttribute("media", e) : t.removeAttribute("media"), i && "undefined" != typeof btoa && (o += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(i)))), " */")), t.styleSheet) t.styleSheet.cssText = o;else {
          for (; t.firstChild;) {
            t.removeChild(t.firstChild);
          }

          t.appendChild(document.createTextNode(o));
        }
      }

      var A = null,
          C = 0;

      function m(t, n) {
        var r, o, e;

        if (n.singleton) {
          var i = C++;
          r = A || (A = s(n)), o = u.bind(null, r, i, !1), e = u.bind(null, r, i, !0);
        } else r = s(n), o = f.bind(null, r, n), e = function e() {
          !function (t) {
            if (null === t.parentNode) return !1;
            t.parentNode.removeChild(t);
          }(r);
        };

        return o(t), function (n) {
          if (n) {
            if (n.css === t.css && n.media === t.media && n.sourceMap === t.sourceMap) return;
            o(t = n);
          } else e();
        };
      }

      t.exports = function (t, n) {
        (n = n || {}).singleton || "boolean" == typeof n.singleton || (n.singleton = e());
        var r = c(t = t || [], n);
        return function (t) {
          if (t = t || [], "[object Array]" === Object.prototype.toString.call(t)) {
            for (var o = 0; o < r.length; o++) {
              var e = p(r[o]);
              a[e].references--;
            }

            for (var i = c(t, n), s = 0; s < r.length; s++) {
              var l = p(r[s]);
              0 === a[l].references && (a[l].updater(), a.splice(l, 1));
            }

            r = i;
          }
        };
      };
    },
    20: function _(t, n) {},
    28: function _(t, n, r) {
      "use strict";

      var o = {
        name: "Popover",
        components: {
          VPopover: r(7).VPopover
        },
        mounted: function mounted() {
          var t = this;
          this.$watch(function () {
            return t.$refs.popover.isOpen;
          }, function (n) {
            n ? t.$emit("after-show") : t.$emit("after-hide");
          });
        }
      },
          e = r(2),
          i = r.n(e),
          a = r(19),
          p = {
        insert: "head",
        singleton: !1
      },
          c = (i()(a.a, p), a.a.locals, r(3)),
          s = r(20),
          l = r.n(s),
          d = Object(c.a)(o, function () {
        var t = this.$createElement,
            n = this._self._c || t;
        return n("VPopover", this._g(this._b({
          ref: "popover",
          attrs: {
            "popover-base-class": "popover",
            "popover-wrapper-class": "popover__wrapper",
            "popover-arrow-class": "popover__arrow",
            "popover-inner-class": "popover__inner"
          }
        }, "VPopover", this.$attrs, !1), this.$listeners), [this._t("trigger"), this._v(" "), n("template", {
          slot: "popover"
        }, [this._t("default")], 2)], 2);
      }, [], !1, null, null, null);
      "function" == typeof l.a && l()(d);
      n.a = d.exports;
    },
    3: function _(t, n, r) {
      "use strict";

      function o(t, n, r, o, e, i, a, p) {
        var c,
            s = "function" == typeof t ? t.options : t;
        if (n && (s.render = n, s.staticRenderFns = r, s._compiled = !0), o && (s.functional = !0), i && (s._scopeId = "data-v-" + i), a ? (c = function c(t) {
          (t = t || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) || "undefined" == typeof __VUE_SSR_CONTEXT__ || (t = __VUE_SSR_CONTEXT__), e && e.call(this, t), t && t._registeredComponents && t._registeredComponents.add(a);
        }, s._ssrRegister = c) : e && (c = p ? function () {
          e.call(this, (s.functional ? this.parent : this).$root.$options.shadowRoot);
        } : e), c) if (s.functional) {
          s._injectStyles = c;
          var l = s.render;

          s.render = function (t, n) {
            return c.call(n), l(t, n);
          };
        } else {
          var d = s.beforeCreate;
          s.beforeCreate = d ? [].concat(d, c) : [c];
        }
        return {
          exports: t,
          options: s
        };
      }

      r.d(n, "a", function () {
        return o;
      });
    },
    47: function _(t, n, r) {
      "use strict";

      r.r(n);
      var o = r(28);
      /**
       * @copyright Copyright (c) 2019 Marco Ambrosini <marcoambrosini@pm.me>
       *
       * @author Marco Ambrosini <marcoambrosini@pm.me>
       *
       * @license GNU AGPL version 3 or any later version
       *
       * This program is free software: you can redistribute it and/or modify
       * it under the terms of the GNU Affero General Public License as
       * published by the Free Software Foundation, either version 3 of the
       * License, or (at your option) any later version.
       *
       * This program is distributed in the hope that it will be useful,
       * but WITHOUT ANY WARRANTY; without even the implied warranty of
       * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
       * GNU Affero General Public License for more details.
       *
       * You should have received a copy of the GNU Affero General Public License
       * along with this program. If not, see <http://www.gnu.org/licenses/>.
       *
       */

      n.default = o.a;
    },
    7: function _(t, n) {
      t.exports = __webpack_require__(/*! v-tooltip */ "./node_modules/v-tooltip/dist/v-tooltip.esm.js");
    }
  });
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ })

}]);
//# sourceMappingURL=vendors~editor-collab.js.map?v=b7e8c773924478eddfdf