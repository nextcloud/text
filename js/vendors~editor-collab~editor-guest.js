(window["textWebpackJsonp"] = window["textWebpackJsonp"] || []).push([["vendors~editor-collab~editor-guest"],{

/***/ "./node_modules/@nextcloud/capabilities/dist/index.js":
/*!************************************************************!*\
  !*** ./node_modules/@nextcloud/capabilities/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCapabilities = getCapabilities;

var _initialState = __webpack_require__(/*! @nextcloud/initial-state */ "./node_modules/@nextcloud/initial-state/dist/index.js");

function getCapabilities() {
  try {
    return (0, _initialState.loadState)('core', 'capabilities');
  } catch (error) {
    console.debug('Could not find capabilities initial state fall back to _oc_capabilities');

    if (!('_oc_capabilities' in window)) {
      return {};
    }

    return window['_oc_capabilities'];
  }
}

/***/ }),

/***/ "./node_modules/@nextcloud/initial-state/dist/index.js":
/*!*************************************************************!*\
  !*** ./node_modules/@nextcloud/initial-state/dist/index.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(/*! core-js/modules/es.array.concat.js */ "./node_modules/core-js/modules/es.array.concat.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadState = loadState;
/**
 * @param app app ID, e.g. "mail"
 * @param key name of the property
 * @param fallback optional parameter to use as default value
 * @throws if the key can't be found
 */

function loadState(app, key, fallback) {
  var elem = document.querySelector("#initial-state-".concat(app, "-").concat(key));

  if (elem === null) {
    if (fallback !== undefined) {
      return fallback;
    }

    throw new Error("Could not find initial state ".concat(key, " of ").concat(app));
  }

  try {
    return JSON.parse(atob(elem.value));
  } catch (e) {
    throw new Error("Could not parse initial state ".concat(key, " of ").concat(app));
  }
}

/***/ }),

/***/ "./node_modules/@nextcloud/vue/dist/Components/Avatar.js":
/*!***************************************************************!*\
  !*** ./node_modules/@nextcloud/vue/dist/Components/Avatar.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

!function (t, A) {
  "object" == ( false ? undefined : _typeof(exports)) && "object" == ( false ? undefined : _typeof(module)) ? module.exports = A() :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (A),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : undefined;
}(window, function () {
  return function (t) {
    var A = {};

    function n(e) {
      if (A[e]) return A[e].exports;
      var i = A[e] = {
        i: e,
        l: !1,
        exports: {}
      };
      return t[e].call(i.exports, i, i.exports, n), i.l = !0, i.exports;
    }

    return n.m = t, n.c = A, n.d = function (t, A, e) {
      n.o(t, A) || Object.defineProperty(t, A, {
        enumerable: !0,
        get: e
      });
    }, n.r = function (t) {
      "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
        value: "Module"
      }), Object.defineProperty(t, "__esModule", {
        value: !0
      });
    }, n.t = function (t, A) {
      if (1 & A && (t = n(t)), 8 & A) return t;
      if (4 & A && "object" == _typeof(t) && t && t.__esModule) return t;
      var e = Object.create(null);
      if (n.r(e), Object.defineProperty(e, "default", {
        enumerable: !0,
        value: t
      }), 2 & A && "string" != typeof t) for (var i in t) {
        n.d(e, i, function (A) {
          return t[A];
        }.bind(null, i));
      }
      return e;
    }, n.n = function (t) {
      var A = t && t.__esModule ? function () {
        return t.default;
      } : function () {
        return t;
      };
      return n.d(A, "a", A), A;
    }, n.o = function (t, A) {
      return Object.prototype.hasOwnProperty.call(t, A);
    }, n.p = "/dist/", n(n.s = 80);
  }([function (t, A, n) {
    "use strict";

    function e(t, A) {
      return function (t) {
        if (Array.isArray(t)) return t;
      }(t) || function (t, A) {
        if ("undefined" == typeof Symbol || !(Symbol.iterator in Object(t))) return;
        var n = [],
            e = !0,
            i = !1,
            o = void 0;

        try {
          for (var a, r = t[Symbol.iterator](); !(e = (a = r.next()).done) && (n.push(a.value), !A || n.length !== A); e = !0) {
            ;
          }
        } catch (t) {
          i = !0, o = t;
        } finally {
          try {
            e || null == r.return || r.return();
          } finally {
            if (i) throw o;
          }
        }

        return n;
      }(t, A) || function (t, A) {
        if (!t) return;
        if ("string" == typeof t) return i(t, A);
        var n = Object.prototype.toString.call(t).slice(8, -1);
        "Object" === n && t.constructor && (n = t.constructor.name);
        if ("Map" === n || "Set" === n) return Array.from(t);
        if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return i(t, A);
      }(t, A) || function () {
        throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }();
    }

    function i(t, A) {
      (null == A || A > t.length) && (A = t.length);

      for (var n = 0, e = new Array(A); n < A; n++) {
        e[n] = t[n];
      }

      return e;
    }

    t.exports = function (t) {
      var A = e(t, 4),
          n = A[1],
          i = A[3];

      if ("function" == typeof btoa) {
        var o = btoa(unescape(encodeURIComponent(JSON.stringify(i)))),
            a = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(o),
            r = "/*# ".concat(a, " */"),
            s = i.sources.map(function (t) {
          return "/*# sourceURL=".concat(i.sourceRoot || "").concat(t, " */");
        });
        return [n].concat(s).concat([r]).join("\n");
      }

      return [n].join("\n");
    };
  }, function (t, A, n) {
    "use strict";

    t.exports = function (t) {
      var A = [];
      return A.toString = function () {
        return this.map(function (A) {
          var n = t(A);
          return A[2] ? "@media ".concat(A[2], " {").concat(n, "}") : n;
        }).join("");
      }, A.i = function (t, n, e) {
        "string" == typeof t && (t = [[null, t, ""]]);
        var i = {};
        if (e) for (var o = 0; o < this.length; o++) {
          var a = this[o][0];
          null != a && (i[a] = !0);
        }

        for (var r = 0; r < t.length; r++) {
          var s = [].concat(t[r]);
          e && i[s[0]] || (n && (s[2] ? s[2] = "".concat(n, " and ").concat(s[2]) : s[2] = n), A.push(s));
        }
      }, A;
    };
  }, function (t, A, n) {
    "use strict";

    var e,
        i = function i() {
      return void 0 === e && (e = Boolean(window && document && document.all && !window.atob)), e;
    },
        o = function () {
      var t = {};
      return function (A) {
        if (void 0 === t[A]) {
          var n = document.querySelector(A);
          if (window.HTMLIFrameElement && n instanceof window.HTMLIFrameElement) try {
            n = n.contentDocument.head;
          } catch (t) {
            n = null;
          }
          t[A] = n;
        }

        return t[A];
      };
    }(),
        a = [];

    function r(t) {
      for (var A = -1, n = 0; n < a.length; n++) {
        if (a[n].identifier === t) {
          A = n;
          break;
        }
      }

      return A;
    }

    function s(t, A) {
      for (var n = {}, e = [], i = 0; i < t.length; i++) {
        var o = t[i],
            s = A.base ? o[0] + A.base : o[0],
            c = n[s] || 0,
            l = "".concat(s, " ").concat(c);
        n[s] = c + 1;
        var d = r(l),
            u = {
          css: o[1],
          media: o[2],
          sourceMap: o[3]
        };
        -1 !== d ? (a[d].references++, a[d].updater(u)) : a.push({
          identifier: l,
          updater: b(u, A),
          references: 1
        }), e.push(l);
      }

      return e;
    }

    function c(t) {
      var A = document.createElement("style"),
          e = t.attributes || {};

      if (void 0 === e.nonce) {
        var i = n.nc;
        i && (e.nonce = i);
      }

      if (Object.keys(e).forEach(function (t) {
        A.setAttribute(t, e[t]);
      }), "function" == typeof t.insert) t.insert(A);else {
        var a = o(t.insert || "head");
        if (!a) throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
        a.appendChild(A);
      }
      return A;
    }

    var l,
        d = (l = [], function (t, A) {
      return l[t] = A, l.filter(Boolean).join("\n");
    });

    function u(t, A, n, e) {
      var i = n ? "" : e.media ? "@media ".concat(e.media, " {").concat(e.css, "}") : e.css;
      if (t.styleSheet) t.styleSheet.cssText = d(A, i);else {
        var o = document.createTextNode(i),
            a = t.childNodes;
        a[A] && t.removeChild(a[A]), a.length ? t.insertBefore(o, a[A]) : t.appendChild(o);
      }
    }

    function g(t, A, n) {
      var e = n.css,
          i = n.media,
          o = n.sourceMap;
      if (i ? t.setAttribute("media", i) : t.removeAttribute("media"), o && "undefined" != typeof btoa && (e += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(o)))), " */")), t.styleSheet) t.styleSheet.cssText = e;else {
        for (; t.firstChild;) {
          t.removeChild(t.firstChild);
        }

        t.appendChild(document.createTextNode(e));
      }
    }

    var p = null,
        f = 0;

    function b(t, A) {
      var n, e, i;

      if (A.singleton) {
        var o = f++;
        n = p || (p = c(A)), e = u.bind(null, n, o, !1), i = u.bind(null, n, o, !0);
      } else n = c(A), e = g.bind(null, n, A), i = function i() {
        !function (t) {
          if (null === t.parentNode) return !1;
          t.parentNode.removeChild(t);
        }(n);
      };

      return e(t), function (A) {
        if (A) {
          if (A.css === t.css && A.media === t.media && A.sourceMap === t.sourceMap) return;
          e(t = A);
        } else i();
      };
    }

    t.exports = function (t, A) {
      (A = A || {}).singleton || "boolean" == typeof A.singleton || (A.singleton = i());
      var n = s(t = t || [], A);
      return function (t) {
        if (t = t || [], "[object Array]" === Object.prototype.toString.call(t)) {
          for (var e = 0; e < n.length; e++) {
            var i = r(n[e]);
            a[i].references--;
          }

          for (var o = s(t, A), c = 0; c < n.length; c++) {
            var l = r(n[c]);
            0 === a[l].references && (a[l].updater(), a.splice(l, 1));
          }

          n = o;
        }
      };
    };
  }, function (t, A, n) {
    "use strict";

    function e(t, A, n, e, i, o, a, r) {
      var s,
          c = "function" == typeof t ? t.options : t;
      if (A && (c.render = A, c.staticRenderFns = n, c._compiled = !0), e && (c.functional = !0), o && (c._scopeId = "data-v-" + o), a ? (s = function s(t) {
        (t = t || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) || "undefined" == typeof __VUE_SSR_CONTEXT__ || (t = __VUE_SSR_CONTEXT__), i && i.call(this, t), t && t._registeredComponents && t._registeredComponents.add(a);
      }, c._ssrRegister = s) : i && (s = r ? function () {
        i.call(this, (c.functional ? this.parent : this).$root.$options.shadowRoot);
      } : i), s) if (c.functional) {
        c._injectStyles = s;
        var l = c.render;

        c.render = function (t, A) {
          return s.call(A), l(t, A);
        };
      } else {
        var d = c.beforeCreate;
        c.beforeCreate = d ? [].concat(d, s) : [s];
      }
      return {
        exports: t,
        options: c
      };
    }

    n.d(A, "a", function () {
      return e;
    });
  }, function (t, A, n) {
    "use strict";

    t.exports = function (t, A) {
      return A || (A = {}), "string" != typeof (t = t && t.__esModule ? t.default : t) ? t : (/^['"].*['"]$/.test(t) && (t = t.slice(1, -1)), A.hash && (t += A.hash), /["'() \t\n]/.test(t) || A.needQuotes ? '"'.concat(t.replace(/"/g, '\\"').replace(/\n/g, "\\n"), '"') : t);
    };
  }, function (t, A) {
    t.exports = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm.js");
  }, function (t, A) {
    t.exports = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
  }, function (t, A) {
    t.exports = __webpack_require__(/*! v-tooltip */ "./node_modules/v-tooltip/dist/v-tooltip.esm.js");
  }, function (t, A, n) {
    "use strict";

    A.a = "data:application/vnd.ms-fontobject;base64,rg8AAOQOAAABAAIAAAAAAAIABQMAAAAAAAABQJABAAAAAExQAAAAABAAAAAAAAAAAAAAAAAAAAEAAAAAteZ+OAAAAAAAAAAAAAAAAAAAAAAAACgAAGkAYwBvAG4AZgBvAG4AdAAtAHYAdQBlAC0ANgBiADQAOQA0AGYAYwAAAAAAABYAAFYAZQByAHMAaQBvAG4AIAAxAC4AMAAAKAAAaQBjAG8AbgBmAG8AbgB0AC0AdgB1AGUALQA2AGIANAA5ADQAZgBjAAAAAAABAAAACgCAAAMAIE9TLzJ044/RAAAArAAAAGBjbWFwAA3ruAAAAQwAAAFCZ2x5ZsdHOUwAAAJQAAAH/GhlYWQracHGAAAKTAAAADZoaGVhJv0ThQAACoQAAAAkaG10eGe+//8AAAqoAAAANGxvY2ENvA9mAAAK3AAAAChtYXhwASAAVwAACwQAAAAgbmFtZXH9WkgAAAskAAACpnBvc3Q/VL7XAAANzAAAARYABBLKAZAABQAADGUNrAAAArwMZQ2sAAAJYAD1BQoAAAIABQMAAAAAAAAAAAAAEAAAAAAAAAAAAAAAUGZFZABA6gHqEhOIAAABwhOIAAAAAAABAAAAAAAAAAAAAAAgAAAAAAADAAAAAwAAABwAAQAAAAAAPAADAAEAAAAcAAQAIAAAAAQABAABAADqEv//AADqAf//FgAAAQAAAAAAAAEGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAOpg9DAAUACwAACQIRCQQRCQEOpvqCBX77ugRG+oL6ggV++7oERg9C+oL6ggE4BEYERgE4+oL6ggE4BEYERgABAAAAAA1uElAABQAACQERCQERBhsHU/d0CIwJxPit/sgIiwiM/scAAgAAAAAP3w9DAAUACwAACQIRCQQRCQEE4gV++oIERvu6BX4Ff/qBBEb7ugRGBX4Ffv7I+7r7uv7IBX4Ffv7I+7r7ugABAAAAAA6mElAABQAACQERCQERDW74rQiL93UJxAdTATn3dPd1ATgAAQAAAAAGNxOIAAUAABMHCQEXAZSUBXL6jpQFoxOIVfaR9pFVCcQAAAEAAAAAEYcPgwAFAAAJBQ/N9/P7+/5GBb8Jxw+D9/MEBf5H+kEJxgABAAAAABEXERcACwAACQsRF/3t+sD6wP3tBUD6wAITBUAFQAIT+sAEhP3tBUD6wAITBUAFQAIT+sAFQP3t+sAAAf//AAATkxLsADMAAAEiBw4BFxYXASEmBwYHBgcGFBcWFxYXFjchAQYHBhcWFx4BFxYXFjc2NwE2NzYnJicBLgEKYGVPSkYQEkgF1/HgTT46KScUFBQUJyk6Pk0OIPopNxoYAwMbGVY1Nzs+Oj81B+07FRUUFTz4Eyx0Euw5NKxZYEf6KgEbGC4sOTh4ODksLhgbAvopNT87Pjo3NlYZGgMDGBk4B+w8UVBPUjwH7C0yAAAAAgAAAAAOphJQABgARgAAASIHDgEHBhQXHgEXFjI3PgE3NjQnLgEnJgEiBwYHBhQXFhcWMyERISIHBgcGFBcWFxY3ITI3Njc2NCcmJyYjIRE0JyYnJiMJdm9mYpgpKyspmGJm3mZilyorKyqXYmb8NlZIRykrKylHSFYCcf2PVkhHKSsrKUdIVgdTVUhHKSsrKUdIVf2PKylHSVUSUCsql2Nl32VimCkrKymYYmXfZWOXKiv55SspR0irSEcpK/nmKylHSapJRykrASopR0mqSUcpKwdTVUhHKSsAAAMAAAAAERcRFwADAAcACwAAAREhEQERIREBESERAnEOpvFaDqbxWg6mERf9jwJx+eb9jwJx+eX9jwJxAAMAAAAAEp4L5wAYADEASgAAATIXHgEXFhQHDgEHBiInLgEnJjQ3PgE3NiEyFx4BFxYUBw4BBwYiJy4BJyY0Nz4BNzYhMhceARcWFAcOAQcGIicuAScmNDc+ATc2Aw1wZWKYKSsrKZhiZd9mYpcqKysql2JmByZvZmKXKisrKpdiZt5mYpcqKysql2JmByZvZmKXKisrKpdiZt9lYpgpKyspmGJlC+crKpdiZt5mYpcqKysql2Jm3mZilyorKyqXYmbeZmKXKisrKpdiZt5mYpcqKysql2Jm3mZilyorKyqXYmbeZmKXKisAAAAAAgAAAAAP3w/fAAMABwAAAREhESERIREDqgTiAnEE4g/f88sMNfPLDDUAAAABAAAAABEXERcAAgAACQICcQ6m8VoRF/it+K0AAQAAAAAOpgw1AAIAAAkCBOIE4gTiDDX7HgTgAAH/4AAAE2kTaQAxAAABBAUEBQQDAgMCERATEhMSBQQFBCEgJSQlJBMSExITBgAFBCEgJSQnJicmAwIREBMSAAhs/pj+sf66/u3+7sbKa26Ae+nlATkBPAFyAX4BlgFxAWEBVgEuASrr7JmcOLz+Kf75/vP+6v6+/s7+2f37uLtjZ1BOAScTaS6Xk+nn/tf+0/6r/p/+j/5q/oL+jv7E/sfl6HyAa2jFwgENAQ4BQwFLAWnM/tpOUGdju7j7/QEnATIBQgElARMBDQHLAAIAAAAAE4gTiAAkAEAAAAEgBQQFBAMCAwIQExITEgUEBQQgJSQlJBMSExIQAwIDAiUkJSQBITIXHgEXFhQHDgEHBiMhIicuAScmNDc+ATc2CcT+av6C/o7+xP7H5eh8gIB86OUBOQE8AXIBfgMsAX4BcgE8ATnl6HyAgHzo5f7H/sT+jv6C+sEHU1tXVIQkJiYkhFRXW/itXFdUhCQmJiSEVFcTiIB86OX+x/7E/o7+gvzU/oL+jv7E/sfl6HyAgHzo5QE5ATwBcgF+AywBfgFyATwBOeXofID4ESYlhFNXuFdThCUmJiWEU1e4V1OEJSYAAAACAAAAABOIE4gAJAA9AAABIAUEBQQDAgMCEBMSExIFBAUEICUkJSQTEhMSEAMCAwIlJCUkASAFBAATEhADAgAFBCAlJAADAhATEgAlJAnE/mr+gv6O/sT+x+XofICAfOjlATkBPAFyAX4DLAF+AXIBPAE55eh8gIB86OX+x/7E/o7+gv5qATcBFwEPAZtwdHRw/mX+8f7p/ZL+6f7x/mVwdHRwAZsBDwEXE4iAfOjl/sf+xP6O/oL81P6C/o7+xP7H5eh8gIB86OUBOQE8AXIBfgMsAX4BcgE8ATnl6HyA/Bh0cP5l/vH+6f2S/un+8f5lcHR0cAGbAQ8BFwJuARcBDwGbcHQAAAACAAAAABOIE4gAAwAoAAABIREhASAFBAUEAwIDAhATEhMSBQQFBCAlJCUkExITEhADAgMCJSQlJAXcB9D4MAPo/mr+gv6O/sT+x+XofICAfOjlATkBPAFyAX4DLAF+AXIBPAE55eh8gIB86OX+x/7E/o7+ggXcB9AF3IB86OX+x/7E/o7+gvzU/oL+jv7E/sfl6HyAgHzo5QE5ATwBcgF+AywBfgFyATwBOeXofIAAAAEAAAABAAA4fua1Xw889QALE4gAAAAA3JSc3AAAAADcQ8Dd/+AAABOTE4gAAAAIAAIAAAAAAAAAAQAAE4gAAAAAE4j/4P/1E5MAAQAAAAAAAAAAAAAAAAAAAAcAAAAAE4gAABOIAAATiAAAE4gAAAY2AAATiAAAAAD//wAAAAAAAAAAAAAAAP/gAAAAAAAAAAAAAAAiADYAWABsAIAAlAC0AQ4BfAGaAhACJgI0AkICqAMiA6YD/gABAAAAEwBLAAMAAAAAAAIAAAAKAAoAAAD/AAAAAAAAAAAAEADGAAEAAAAAAAEAFAAAAAEAAAAAAAIABwAUAAEAAAAAAAMAFAAbAAEAAAAAAAQAFAAvAAEAAAAAAAUACwBDAAEAAAAAAAYAFABOAAEAAAAAAAoAKwBiAAEAAAAAAAsAEwCNAAMAAQQJAAEAKACgAAMAAQQJAAIADgDIAAMAAQQJAAMAKADWAAMAAQQJAAQAKAD+AAMAAQQJAAUAFgEmAAMAAQQJAAYAKAE8AAMAAQQJAAoAVgFkAAMAAQQJAAsAJgG6aWNvbmZvbnQtdnVlLTZiNDk0ZmNSZWd1bGFyaWNvbmZvbnQtdnVlLTZiNDk0ZmNpY29uZm9udC12dWUtNmI0OTRmY1ZlcnNpb24gMS4waWNvbmZvbnQtdnVlLTZiNDk0ZmNHZW5lcmF0ZWQgYnkgc3ZnMnR0ZiBmcm9tIEZvbnRlbGxvIHByb2plY3QuaHR0cDovL2ZvbnRlbGxvLmNvbQBpAGMAbwBuAGYAbwBuAHQALQB2AHUAZQAtADYAYgA0ADkANABmAGMAUgBlAGcAdQBsAGEAcgBpAGMAbwBuAGYAbwBuAHQALQB2AHUAZQAtADYAYgA0ADkANABmAGMAaQBjAG8AbgBmAG8AbgB0AC0AdgB1AGUALQA2AGIANAA5ADQAZgBjAFYAZQByAHMAaQBvAG4AIAAxAC4AMABpAGMAbwBuAGYAbwBuAHQALQB2AHUAZQAtADYAYgA0ADkANABmAGMARwBlAG4AZQByAGEAdABlAGQAIABiAHkAIABzAHYAZwAyAHQAdABmACAAZgByAG8AbQAgAEYAbwBuAHQAZQBsAGwAbwAgAHAAcgBvAGoAZQBjAHQALgBoAHQAdABwADoALwAvAGYAbwBuAHQAZQBsAGwAbwAuAGMAbwBtAAAAAgAAAAAAAAAyAAAAAAAAAAAAAAAAAAAAAAAAAAAAEwATAAABAgEDAQQBBQEGAQcBCAEJAQoBCwEMAQ0BDgEPARABEQESARMRYXJyb3ctbGVmdC1kb3VibGUKYXJyb3ctbGVmdBJhcnJvdy1yaWdodC1kb3VibGULYXJyb3ctcmlnaHQKYnJlYWRjcnVtYgljaGVja21hcmsFY2xvc2UHY29uZmlybQRpbmZvBG1lbnUEbW9yZQVwYXVzZQRwbGF5CnRyaWFuZ2xlLXMQdXNlci1zdGF0dXMtYXdheQ91c2VyLXN0YXR1cy1kbmQVdXNlci1zdGF0dXMtaW52aXNpYmxlEnVzZXItc3RhdHVzLW9ubGluZQAA";
  }, function (t, A, n) {
    "use strict";

    A.a = "data:font/woff;base64,d09GRgABAAAAAA8sAAoAAAAADuQAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABPUy8yAAAA9AAAAGAAAABgdOOP0WNtYXAAAAFUAAABQgAAAUIADeu4Z2x5ZgAAApgAAAf8AAAH/MdHOUxoZWFkAAAKlAAAADYAAAA2K2nBxmhoZWEAAArMAAAAJAAAACQm/ROFaG10eAAACvAAAAA0AAAANGe+//9sb2NhAAALJAAAACgAAAAoDbwPZm1heHAAAAtMAAAAIAAAACABIABXbmFtZQAAC2wAAAKmAAACpnH9Wkhwb3N0AAAOFAAAARYAAAEWP1S+1wAEEsoBkAAFAAAMZQ2sAAACvAxlDawAAAlgAPUFCgAAAgAFAwAAAAAAAAAAAAAQAAAAAAAAAAAAAABQZkVkAEDqAeoSE4gAAAHCE4gAAAAAAAEAAAAAAAAAAAAAACAAAAAAAAMAAAADAAAAHAABAAAAAAA8AAMAAQAAABwABAAgAAAABAAEAAEAAOoS//8AAOoB//8WAAABAAAAAAAAAQYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAA6mD0MABQALAAAJAhEJBBEJAQ6m+oIFfvu6BEb6gvqCBX77ugRGD0L6gvqCATgERgRGATj6gvqCATgERgRGAAEAAAAADW4SUAAFAAAJAREJAREGGwdT93QIjAnE+K3+yAiLCIz+xwACAAAAAA/fD0MABQALAAAJAhEJBBEJAQTiBX76ggRG+7oFfgV/+oEERvu6BEYFfgV+/sj7uvu6/sgFfgV+/sj7uvu6AAEAAAAADqYSUAAFAAAJAREJARENbvitCIv3dQnEB1MBOfd093UBOAABAAAAAAY3E4gABQAAEwcJARcBlJQFcvqOlAWjE4hV9pH2kVUJxAAAAQAAAAARhw+DAAUAAAkFD8338/v7/kYFvwnHD4P38wQF/kf6QQnGAAEAAAAAERcRFwALAAAJCxEX/e36wPrA/e0FQPrAAhMFQAVAAhP6wASE/e0FQPrAAhMFQAVAAhP6wAVA/e36wAAB//8AABOTEuwAMwAAASIHDgEXFhcBISYHBgcGBwYUFxYXFhcWNyEBBgcGFxYXHgEXFhcWNzY3ATY3NicmJwEuAQpgZU9KRhASSAXX8eBNPjopJxQUFBQnKTo+TQ4g+ik3GhgDAxsZVjU3Oz46PzUH7TsVFRQVPPgTLHQS7Dk0rFlgR/oqARsYLiw5OHg4OSwuGBsC+ik1Pzs+Ojc2VhkaAwMYGTgH7DxRUE9SPAfsLTIAAAACAAAAAA6mElAAGABGAAABIgcOAQcGFBceARcWMjc+ATc2NCcuAScmASIHBgcGFBcWFxYzIREhIgcGBwYUFxYXFjchMjc2NzY0JyYnJiMhETQnJicmIwl2b2ZimCkrKymYYmbeZmKXKisrKpdiZvw2VkhHKSsrKUdIVgJx/Y9WSEcpKyspR0hWB1NVSEcpKyspR0hV/Y8rKUdJVRJQKyqXY2XfZWKYKSsrKZhiZd9lY5cqK/nlKylHSKtIRykr+eYrKUdJqklHKSsBKilHSapJRykrB1NVSEcpKwAAAwAAAAARFxEXAAMABwALAAABESERAREhEQERIRECcQ6m8VoOpvFaDqYRF/2PAnH55v2PAnH55f2PAnEAAwAAAAASngvnABgAMQBKAAABMhceARcWFAcOAQcGIicuAScmNDc+ATc2ITIXHgEXFhQHDgEHBiInLgEnJjQ3PgE3NiEyFx4BFxYUBw4BBwYiJy4BJyY0Nz4BNzYDDXBlYpgpKyspmGJl32ZilyorKyqXYmYHJm9mYpcqKysql2Jm3mZilyorKyqXYmYHJm9mYpcqKysql2Jm32VimCkrKymYYmUL5ysql2Jm3mZilyorKyqXYmbeZmKXKisrKpdiZt5mYpcqKysql2Jm3mZilyorKyqXYmbeZmKXKisrKpdiZt5mYpcqKwAAAAACAAAAAA/fD98AAwAHAAABESERIREhEQOqBOICcQTiD9/zyww188sMNQAAAAEAAAAAERcRFwACAAAJAgJxDqbxWhEX+K34rQABAAAAAA6mDDUAAgAACQIE4gTiBOIMNfseBOAAAf/gAAATaRNpADEAAAEEBQQFBAMCAwIREBMSExIFBAUEISAlJCUkExITEhMGAAUEISAlJCcmJyYDAhEQExIACGz+mP6x/rr+7f7uxsprboB76eUBOQE8AXIBfgGWAXEBYQFWAS4BKuvsmZw4vP4p/vn+8/7q/r7+zv7Z/fu4u2NnUE4BJxNpLpeT6ef+1/7T/qv+n/6P/mr+gv6O/sT+x+XofIBraMXCAQ0BDgFDAUsBacz+2k5QZ2O7uPv9AScBMgFCASUBEwENAcsAAgAAAAATiBOIACQAQAAAASAFBAUEAwIDAhATEhMSBQQFBCAlJCUkExITEhADAgMCJSQlJAEhMhceARcWFAcOAQcGIyEiJy4BJyY0Nz4BNzYJxP5q/oL+jv7E/sfl6HyAgHzo5QE5ATwBcgF+AywBfgFyATwBOeXofICAfOjl/sf+xP6O/oL6wQdTW1dUhCQmJiSEVFdb+K1cV1SEJCYmJIRUVxOIgHzo5f7H/sT+jv6C/NT+gv6O/sT+x+XofICAfOjlATkBPAFyAX4DLAF+AXIBPAE55eh8gPgRJiWEU1e4V1OEJSYmJYRTV7hXU4QlJgAAAAIAAAAAE4gTiAAkAD0AAAEgBQQFBAMCAwIQExITEgUEBQQgJSQlJBMSExIQAwIDAiUkJSQBIAUEABMSEAMCAAUEICUkAAMCEBMSACUkCcT+av6C/o7+xP7H5eh8gIB86OUBOQE8AXIBfgMsAX4BcgE8ATnl6HyAgHzo5f7H/sT+jv6C/moBNwEXAQ8Bm3B0dHD+Zf7x/un9kv7p/vH+ZXB0dHABmwEPARcTiIB86OX+x/7E/o7+gvzU/oL+jv7E/sfl6HyAgHzo5QE5ATwBcgF+AywBfgFyATwBOeXofID8GHRw/mX+8f7p/ZL+6f7x/mVwdHRwAZsBDwEXAm4BFwEPAZtwdAAAAAIAAAAAE4gTiAADACgAAAEhESEBIAUEBQQDAgMCEBMSExIFBAUEICUkJSQTEhMSEAMCAwIlJCUkBdwH0PgwA+j+av6C/o7+xP7H5eh8gIB86OUBOQE8AXIBfgMsAX4BcgE8ATnl6HyAgHzo5f7H/sT+jv6CBdwH0AXcgHzo5f7H/sT+jv6C/NT+gv6O/sT+x+XofICAfOjlATkBPAFyAX4DLAF+AXIBPAE55eh8gAAAAQAAAAEAADh+5rVfDzz1AAsTiAAAAADclJzcAAAAANxDwN3/4AAAE5MTiAAAAAgAAgAAAAAAAAABAAATiAAAAAATiP/g//UTkwABAAAAAAAAAAAAAAAAAAAABwAAAAATiAAAE4gAABOIAAATiAAABjYAABOIAAAAAP//AAAAAAAAAAAAAAAA/+AAAAAAAAAAAAAAACIANgBYAGwAgACUALQBDgF8AZoCEAImAjQCQgKoAyIDpgP+AAEAAAATAEsAAwAAAAAAAgAAAAoACgAAAP8AAAAAAAAAAAAQAMYAAQAAAAAAAQAUAAAAAQAAAAAAAgAHABQAAQAAAAAAAwAUABsAAQAAAAAABAAUAC8AAQAAAAAABQALAEMAAQAAAAAABgAUAE4AAQAAAAAACgArAGIAAQAAAAAACwATAI0AAwABBAkAAQAoAKAAAwABBAkAAgAOAMgAAwABBAkAAwAoANYAAwABBAkABAAoAP4AAwABBAkABQAWASYAAwABBAkABgAoATwAAwABBAkACgBWAWQAAwABBAkACwAmAbppY29uZm9udC12dWUtNmI0OTRmY1JlZ3VsYXJpY29uZm9udC12dWUtNmI0OTRmY2ljb25mb250LXZ1ZS02YjQ5NGZjVmVyc2lvbiAxLjBpY29uZm9udC12dWUtNmI0OTRmY0dlbmVyYXRlZCBieSBzdmcydHRmIGZyb20gRm9udGVsbG8gcHJvamVjdC5odHRwOi8vZm9udGVsbG8uY29tAGkAYwBvAG4AZgBvAG4AdAAtAHYAdQBlAC0ANgBiADQAOQA0AGYAYwBSAGUAZwB1AGwAYQByAGkAYwBvAG4AZgBvAG4AdAAtAHYAdQBlAC0ANgBiADQAOQA0AGYAYwBpAGMAbwBuAGYAbwBuAHQALQB2AHUAZQAtADYAYgA0ADkANABmAGMAVgBlAHIAcwBpAG8AbgAgADEALgAwAGkAYwBvAG4AZgBvAG4AdAAtAHYAdQBlAC0ANgBiADQAOQA0AGYAYwBHAGUAbgBlAHIAYQB0AGUAZAAgAGIAeQAgAHMAdgBnADIAdAB0AGYAIABmAHIAbwBtACAARgBvAG4AdABlAGwAbABvACAAcAByAG8AagBlAGMAdAAuAGgAdAB0AHAAOgAvAC8AZgBvAG4AdABlAGwAbABvAC4AYwBvAG0AAAACAAAAAAAAADIAAAAAAAAAAAAAAAAAAAAAAAAAAAATABMAAAECAQMBBAEFAQYBBwEIAQkBCgELAQwBDQEOAQ8BEAERARIBExFhcnJvdy1sZWZ0LWRvdWJsZQphcnJvdy1sZWZ0EmFycm93LXJpZ2h0LWRvdWJsZQthcnJvdy1yaWdodApicmVhZGNydW1iCWNoZWNrbWFyawVjbG9zZQdjb25maXJtBGluZm8EbWVudQRtb3JlBXBhdXNlBHBsYXkKdHJpYW5nbGUtcxB1c2VyLXN0YXR1cy1hd2F5D3VzZXItc3RhdHVzLWRuZBV1c2VyLXN0YXR1cy1pbnZpc2libGUSdXNlci1zdGF0dXMtb25saW5lAAA=";
  }, function (t, A, n) {
    "use strict";

    A.a = "data:font/ttf;base64,AAEAAAAKAIAAAwAgT1MvMnTjj9EAAACsAAAAYGNtYXAADeu4AAABDAAAAUJnbHlmx0c5TAAAAlAAAAf8aGVhZCtpwcYAAApMAAAANmhoZWEm/ROFAAAKhAAAACRobXR4Z77//wAACqgAAAA0bG9jYQ28D2YAAArcAAAAKG1heHABIABXAAALBAAAACBuYW1lcf1aSAAACyQAAAKmcG9zdD9UvtcAAA3MAAABFgAEEsoBkAAFAAAMZQ2sAAACvAxlDawAAAlgAPUFCgAAAgAFAwAAAAAAAAAAAAAQAAAAAAAAAAAAAABQZkVkAEDqAeoSE4gAAAHCE4gAAAAAAAEAAAAAAAAAAAAAACAAAAAAAAMAAAADAAAAHAABAAAAAAA8AAMAAQAAABwABAAgAAAABAAEAAEAAOoS//8AAOoB//8WAAABAAAAAAAAAQYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAA6mD0MABQALAAAJAhEJBBEJAQ6m+oIFfvu6BEb6gvqCBX77ugRGD0L6gvqCATgERgRGATj6gvqCATgERgRGAAEAAAAADW4SUAAFAAAJAREJAREGGwdT93QIjAnE+K3+yAiLCIz+xwACAAAAAA/fD0MABQALAAAJAhEJBBEJAQTiBX76ggRG+7oFfgV/+oEERvu6BEYFfgV+/sj7uvu6/sgFfgV+/sj7uvu6AAEAAAAADqYSUAAFAAAJAREJARENbvitCIv3dQnEB1MBOfd093UBOAABAAAAAAY3E4gABQAAEwcJARcBlJQFcvqOlAWjE4hV9pH2kVUJxAAAAQAAAAARhw+DAAUAAAkFD8338/v7/kYFvwnHD4P38wQF/kf6QQnGAAEAAAAAERcRFwALAAAJCxEX/e36wPrA/e0FQPrAAhMFQAVAAhP6wASE/e0FQPrAAhMFQAVAAhP6wAVA/e36wAAB//8AABOTEuwAMwAAASIHDgEXFhcBISYHBgcGBwYUFxYXFhcWNyEBBgcGFxYXHgEXFhcWNzY3ATY3NicmJwEuAQpgZU9KRhASSAXX8eBNPjopJxQUFBQnKTo+TQ4g+ik3GhgDAxsZVjU3Oz46PzUH7TsVFRQVPPgTLHQS7Dk0rFlgR/oqARsYLiw5OHg4OSwuGBsC+ik1Pzs+Ojc2VhkaAwMYGTgH7DxRUE9SPAfsLTIAAAACAAAAAA6mElAAGABGAAABIgcOAQcGFBceARcWMjc+ATc2NCcuAScmASIHBgcGFBcWFxYzIREhIgcGBwYUFxYXFjchMjc2NzY0JyYnJiMhETQnJicmIwl2b2ZimCkrKymYYmbeZmKXKisrKpdiZvw2VkhHKSsrKUdIVgJx/Y9WSEcpKyspR0hWB1NVSEcpKyspR0hV/Y8rKUdJVRJQKyqXY2XfZWKYKSsrKZhiZd9lY5cqK/nlKylHSKtIRykr+eYrKUdJqklHKSsBKilHSapJRykrB1NVSEcpKwAAAwAAAAARFxEXAAMABwALAAABESERAREhEQERIRECcQ6m8VoOpvFaDqYRF/2PAnH55v2PAnH55f2PAnEAAwAAAAASngvnABgAMQBKAAABMhceARcWFAcOAQcGIicuAScmNDc+ATc2ITIXHgEXFhQHDgEHBiInLgEnJjQ3PgE3NiEyFx4BFxYUBw4BBwYiJy4BJyY0Nz4BNzYDDXBlYpgpKyspmGJl32ZilyorKyqXYmYHJm9mYpcqKysql2Jm3mZilyorKyqXYmYHJm9mYpcqKysql2Jm32VimCkrKymYYmUL5ysql2Jm3mZilyorKyqXYmbeZmKXKisrKpdiZt5mYpcqKysql2Jm3mZilyorKyqXYmbeZmKXKisrKpdiZt5mYpcqKwAAAAACAAAAAA/fD98AAwAHAAABESERIREhEQOqBOICcQTiD9/zyww188sMNQAAAAEAAAAAERcRFwACAAAJAgJxDqbxWhEX+K34rQABAAAAAA6mDDUAAgAACQIE4gTiBOIMNfseBOAAAf/gAAATaRNpADEAAAEEBQQFBAMCAwIREBMSExIFBAUEISAlJCUkExITEhMGAAUEISAlJCcmJyYDAhEQExIACGz+mP6x/rr+7f7uxsprboB76eUBOQE8AXIBfgGWAXEBYQFWAS4BKuvsmZw4vP4p/vn+8/7q/r7+zv7Z/fu4u2NnUE4BJxNpLpeT6ef+1/7T/qv+n/6P/mr+gv6O/sT+x+XofIBraMXCAQ0BDgFDAUsBacz+2k5QZ2O7uPv9AScBMgFCASUBEwENAcsAAgAAAAATiBOIACQAQAAAASAFBAUEAwIDAhATEhMSBQQFBCAlJCUkExITEhADAgMCJSQlJAEhMhceARcWFAcOAQcGIyEiJy4BJyY0Nz4BNzYJxP5q/oL+jv7E/sfl6HyAgHzo5QE5ATwBcgF+AywBfgFyATwBOeXofICAfOjl/sf+xP6O/oL6wQdTW1dUhCQmJiSEVFdb+K1cV1SEJCYmJIRUVxOIgHzo5f7H/sT+jv6C/NT+gv6O/sT+x+XofICAfOjlATkBPAFyAX4DLAF+AXIBPAE55eh8gPgRJiWEU1e4V1OEJSYmJYRTV7hXU4QlJgAAAAIAAAAAE4gTiAAkAD0AAAEgBQQFBAMCAwIQExITEgUEBQQgJSQlJBMSExIQAwIDAiUkJSQBIAUEABMSEAMCAAUEICUkAAMCEBMSACUkCcT+av6C/o7+xP7H5eh8gIB86OUBOQE8AXIBfgMsAX4BcgE8ATnl6HyAgHzo5f7H/sT+jv6C/moBNwEXAQ8Bm3B0dHD+Zf7x/un9kv7p/vH+ZXB0dHABmwEPARcTiIB86OX+x/7E/o7+gvzU/oL+jv7E/sfl6HyAgHzo5QE5ATwBcgF+AywBfgFyATwBOeXofID8GHRw/mX+8f7p/ZL+6f7x/mVwdHRwAZsBDwEXAm4BFwEPAZtwdAAAAAIAAAAAE4gTiAADACgAAAEhESEBIAUEBQQDAgMCEBMSExIFBAUEICUkJSQTEhMSEAMCAwIlJCUkBdwH0PgwA+j+av6C/o7+xP7H5eh8gIB86OUBOQE8AXIBfgMsAX4BcgE8ATnl6HyAgHzo5f7H/sT+jv6CBdwH0AXcgHzo5f7H/sT+jv6C/NT+gv6O/sT+x+XofICAfOjlATkBPAFyAX4DLAF+AXIBPAE55eh8gAAAAQAAAAEAADh+5rVfDzz1AAsTiAAAAADclJzcAAAAANxDwN3/4AAAE5MTiAAAAAgAAgAAAAAAAAABAAATiAAAAAATiP/g//UTkwABAAAAAAAAAAAAAAAAAAAABwAAAAATiAAAE4gAABOIAAATiAAABjYAABOIAAAAAP//AAAAAAAAAAAAAAAA/+AAAAAAAAAAAAAAACIANgBYAGwAgACUALQBDgF8AZoCEAImAjQCQgKoAyIDpgP+AAEAAAATAEsAAwAAAAAAAgAAAAoACgAAAP8AAAAAAAAAAAAQAMYAAQAAAAAAAQAUAAAAAQAAAAAAAgAHABQAAQAAAAAAAwAUABsAAQAAAAAABAAUAC8AAQAAAAAABQALAEMAAQAAAAAABgAUAE4AAQAAAAAACgArAGIAAQAAAAAACwATAI0AAwABBAkAAQAoAKAAAwABBAkAAgAOAMgAAwABBAkAAwAoANYAAwABBAkABAAoAP4AAwABBAkABQAWASYAAwABBAkABgAoATwAAwABBAkACgBWAWQAAwABBAkACwAmAbppY29uZm9udC12dWUtNmI0OTRmY1JlZ3VsYXJpY29uZm9udC12dWUtNmI0OTRmY2ljb25mb250LXZ1ZS02YjQ5NGZjVmVyc2lvbiAxLjBpY29uZm9udC12dWUtNmI0OTRmY0dlbmVyYXRlZCBieSBzdmcydHRmIGZyb20gRm9udGVsbG8gcHJvamVjdC5odHRwOi8vZm9udGVsbG8uY29tAGkAYwBvAG4AZgBvAG4AdAAtAHYAdQBlAC0ANgBiADQAOQA0AGYAYwBSAGUAZwB1AGwAYQByAGkAYwBvAG4AZgBvAG4AdAAtAHYAdQBlAC0ANgBiADQAOQA0AGYAYwBpAGMAbwBuAGYAbwBuAHQALQB2AHUAZQAtADYAYgA0ADkANABmAGMAVgBlAHIAcwBpAG8AbgAgADEALgAwAGkAYwBvAG4AZgBvAG4AdAAtAHYAdQBlAC0ANgBiADQAOQA0AGYAYwBHAGUAbgBlAHIAYQB0AGUAZAAgAGIAeQAgAHMAdgBnADIAdAB0AGYAIABmAHIAbwBtACAARgBvAG4AdABlAGwAbABvACAAcAByAG8AagBlAGMAdAAuAGgAdAB0AHAAOgAvAC8AZgBvAG4AdABlAGwAbABvAC4AYwBvAG0AAAACAAAAAAAAADIAAAAAAAAAAAAAAAAAAAAAAAAAAAATABMAAAECAQMBBAEFAQYBBwEIAQkBCgELAQwBDQEOAQ8BEAERARIBExFhcnJvdy1sZWZ0LWRvdWJsZQphcnJvdy1sZWZ0EmFycm93LXJpZ2h0LWRvdWJsZQthcnJvdy1yaWdodApicmVhZGNydW1iCWNoZWNrbWFyawVjbG9zZQdjb25maXJtBGluZm8EbWVudQRtb3JlBXBhdXNlBHBsYXkKdHJpYW5nbGUtcxB1c2VyLXN0YXR1cy1hd2F5D3VzZXItc3RhdHVzLWRuZBV1c2VyLXN0YXR1cy1pbnZpc2libGUSdXNlci1zdGF0dXMtb25saW5lAAA=";
  }, function (t, A, n) {
    "use strict";

    A.a = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCIgPjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48bWV0YWRhdGE+PC9tZXRhZGF0YT48ZGVmcz48Zm9udCBpZD0iaWNvbmZvbnQtdnVlLTZiNDk0ZmMiIGhvcml6LWFkdi14PSI1MDAwIj48Zm9udC1mYWNlIGZvbnQtZmFtaWx5PSJpY29uZm9udC12dWUtNmI0OTRmYyIgZm9udC13ZWlnaHQ9IjQwMCIgZm9udC1zdHJldGNoPSJub3JtYWwiIHVuaXRzLXBlci1lbT0iNTAwMCIgcGFub3NlLTE9IjIgMCA1IDMgMCAwIDAgMCAwIDAiIGFzY2VudD0iNTAwMCIgZGVzY2VudD0iMCIgeC1oZWlnaHQ9IjAiIGJib3g9Ii0zMiAwIDUwMTEgNTAwMCIgdW5kZXJsaW5lLXRoaWNrbmVzcz0iMCIgdW5kZXJsaW5lLXBvc2l0aW9uPSI1MCIgdW5pY29kZS1yYW5nZT0iVStlYTAxLWVhMTIiIC8+PG1pc3NpbmctZ2x5cGggaG9yaXotYWR2LXg9IjAiICAvPjxnbHlwaCBnbHlwaC1uYW1lPSJhcnJvdy1sZWZ0LWRvdWJsZSIgdW5pY29kZT0iJiN4ZWEwMTsiIGQ9Ik0zNzUwIDM5MDYgbC0xNDA2IC0xNDA2IGwxNDA2IC0xNDA2IGwwIDMxMiBsLTEwOTQgMTA5NCBsMTA5NCAxMDk0IGwwIDMxMiBaTTIzNDQgMzkwNiBsLTE0MDYgLTE0MDYgbDE0MDYgLTE0MDYgbDAgMzEyIGwtMTA5NCAxMDk0IGwxMDk0IDEwOTQgbDAgMzEyIFoiIC8+PGdseXBoIGdseXBoLW5hbWU9ImFycm93LWxlZnQiIHVuaWNvZGU9IiYjeGVhMDI7IiBkPSJNMTU2MyAyNTAwIGwxODc1IC0xODc1IGwwIC0zMTIgbC0yMTg4IDIxODcgbDIxODggMjE4OCBsMCAtMzEzIGwtMTg3NSAtMTg3NSBaIiAvPjxnbHlwaCBnbHlwaC1uYW1lPSJhcnJvdy1yaWdodC1kb3VibGUiIHVuaWNvZGU9IiYjeGVhMDM7IiBkPSJNMTI1MCAxMDk0IGwxNDA2IDE0MDYgbC0xNDA2IDE0MDYgbDAgLTMxMiBsMTA5NCAtMTA5NCBsLTEwOTQgLTEwOTQgbDAgLTMxMiBaTTI2NTYgMTA5NCBsMTQwNyAxNDA2IGwtMTQwNyAxNDA2IGwwIC0zMTIgbDEwOTQgLTEwOTQgbC0xMDk0IC0xMDk0IGwwIC0zMTIgWiIgLz48Z2x5cGggZ2x5cGgtbmFtZT0iYXJyb3ctcmlnaHQiIHVuaWNvZGU9IiYjeGVhMDQ7IiBkPSJNMzQzOCAyNTAwIGwtMTg3NSAxODc1IGwwIDMxMyBsMjE4NyAtMjE4OCBsLTIxODcgLTIxODcgbDAgMzEyIGwxODc1IDE4NzUgWiIgLz48Z2x5cGggZ2x5cGgtbmFtZT0iYnJlYWRjcnVtYiIgdW5pY29kZT0iJiN4ZWEwNTsiIGQ9Ik0xNDggNTAwMCBsLTE0OCAtODUgbDEzOTQgLTI0MTUgbC0xMzk0IC0yNDE1IGwxNDggLTg1IGwxNDQzIDI1MDAgbC0xNDQzIDI1MDAgWiIgLz48Z2x5cGggZ2x5cGgtbmFtZT0iY2hlY2ttYXJrIiB1bmljb2RlPSImI3hlYTA2OyIgZD0iTTQwNDUgMzk3MSBsLTIwNjEgLTIwNjEgbC0xMDI5IDEwMjkgbC00NDIgLTQ0MSBsMTQ3MSAtMTQ3MSBsMjUwMyAyNTAyIGwtNDQyIDQ0MiBaIiAvPjxnbHlwaCBnbHlwaC1uYW1lPSJjbG9zZSIgdW5pY29kZT0iJiN4ZWEwNzsiIGQ9Ik00Mzc1IDExNTYgbC01MzEgLTUzMSBsLTEzNDQgMTM0NCBsLTEzNDQgLTEzNDQgbC01MzEgNTMxIGwxMzQ0IDEzNDQgbC0xMzQ0IDEzNDQgbDUzMSA1MzEgbDEzNDQgLTEzNDQgbDEzNDQgMTM0NCBsNTMxIC01MzEgbC0xMzQ0IC0xMzQ0IGwxMzQ0IC0xMzQ0IFoiIC8+PGdseXBoIGdseXBoLW5hbWU9ImNvbmZpcm0iIHVuaWNvZGU9IiYjeGVhMDg7IiBkPSJNMjY1NiA0ODQ0IHEtMTAxIDAgLTE4MCAtNTcgcS03NCAtNTIgLTEwOSAtMTM4IHEtMzUgLTg2IC0xOSAtMTc1IHExOCAtOTYgOTAgLTE2NyBsMTQ5NSAtMTQ5NCBsLTM2MTYgMCBxLTc3IDEgLTEzOSAtMjYgcS01OCAtMjQgLTk5IC03MCBxLTM5IC00NCAtNTkgLTEwMSBxLTIwIC01NiAtMjAgLTExNiBxMCAtNjAgMjAgLTExNiBxMjAgLTU3IDU5IC0xMDEgcTQxIC00NiA5OSAtNzAgcTYyIC0yNyAxMzkgLTI1IGwzNjE2IDAgbC0xNDk1IC0xNDk1IHEtNTUgLTUzIC04MSAtMTE2IHEtMjQgLTU5IC0yMSAtMTIxIHEzIC01OCAzMCAtMTEzIHEyNSAtNTQgNjggLTk3IHE0MyAtNDMgOTYgLTY4IHE1NSAtMjYgMTE0IC0yOSBxNjIgLTMgMTIwIDIxIHE2MyAyNSAxMTYgODEgbDIwMjkgMjAyOCBxNTkgNjAgODAgMTQxIHEyMSA4MCAxIDE1OSBxLTIxIDgyIC04MSAxNDIgbC0yMDI5IDIwMjggcS00NCA0NSAtMTAyIDcwIHEtNTggMjUgLTEyMiAyNSBaIiAvPjxnbHlwaCBnbHlwaC1uYW1lPSJpbmZvIiB1bmljb2RlPSImI3hlYTA5OyIgZD0iTTI0MjIgNDY4OCBxLTExMSAwIC0yMTMgLTQzIHEtOTggLTQyIC0xNzQgLTExNy41IHEtNzYgLTc1LjUgLTExNyAtMTc0LjUgcS00MyAtMTAxIC00MyAtMjEyLjUgcTAgLTExMS41IDQzIC0yMTIuNSBxNDEgLTk4IDExNyAtMTc0IHE3NiAtNzYgMTc0IC0xMTcgcTEwMiAtNDMgMjEzIC00MyBxMTExIDAgMjEzIDQzIHE5OCA0MSAxNzMuNSAxMTcgcTc1LjUgNzYgMTE3LjUgMTc0IHE0MyAxMDEgNDMgMjEyLjUgcTAgMTExLjUgLTQzIDIxMi41IHEtNDIgOTkgLTExNy41IDE3NC41IHEtNzUuNSA3NS41IC0xNzMuNSAxMTcuNSBxLTEwMiA0MyAtMjEzIDQzIFpNMTU2MyAzMTI1IHEtODYgMCAtMTU4IC00MyBxLTcxIC00MSAtMTEyIC0xMTIgcS00MyAtNzIgLTQzIC0xNTcuNSBxMCAtODUuNSA0MyAtMTU3LjUgcTQxIC03MSAxMTIgLTExMiBxNzIgLTQzIDE1OCAtNDMgbDYyNSAwIGwwIC0xNTYyIGwtNjI1IDAgcS04NiAwIC0xNTggLTQzIHEtNzEgLTQxIC0xMTIgLTExMiBxLTQzIC03MyAtNDMgLTE1OCBxMCAtODUgNDMgLTE1OCBxNDEgLTcxIDExMiAtMTEyIHE3MiAtNDMgMTU4IC00MiBsMTg3NSAwIHE4NSAwIDE1NyA0MiBxNzEgNDEgMTEyIDExMiBxNDMgNzMgNDMgMTU4IHEwIDg1IC00MyAxNTggcS00MSA3MSAtMTEyIDExMiBxLTcyIDQzIC0xNTcgNDMgbC02MjUgMCBsMCAxODc1IHEwIDg1IC00MyAxNTcgcS00MSA3MSAtMTEyIDExMiBxLTczIDQzIC0xNTggNDMgbC05MzcgMCBaIiAvPjxnbHlwaCBnbHlwaC1uYW1lPSJtZW51IiB1bmljb2RlPSImI3hlYTBhOyIgZD0iTTYyNSA0Mzc1IGwwIC02MjUgbDM3NTAgMCBsMCA2MjUgbC0zNzUwIDAgWk02MjUgMjgxMyBsMCAtNjI1IGwzNzUwIDAgbDAgNjI1IGwtMzc1MCAwIFpNNjI1IDEyNTAgbDAgLTYyNSBsMzc1MCAwIGwwIDYyNSBsLTM3NTAgMCBaIiAvPjxnbHlwaCBnbHlwaC1uYW1lPSJtb3JlIiB1bmljb2RlPSImI3hlYTBiOyIgZD0iTTc4MSAzMDQ3IHExMTIgMCAyMTMgLTQzIHE5OCAtNDIgMTc0IC0xMTcuNSBxNzYgLTc1LjUgMTE3IC0xNzMuNSBxNDMgLTEwMiA0MyAtMjEzIHEwIC0xMTEgLTQzIC0yMTMgcS00MSAtOTggLTExNyAtMTczLjUgcS03NiAtNzUuNSAtMTc0IC0xMTcuNSBxLTEwMSAtNDMgLTIxMi41IC00MyBxLTExMS41IDAgLTIxMy41IDQzIHEtOTggNDIgLTE3My41IDExNy41IHEtNzUuNSA3NS41IC0xMTcuNSAxNzMuNSBxLTQzIDEwMiAtNDMgMjEzIHEwIDExMSA0MyAyMTMgcTQyIDk4IDExNy41IDE3My41IHE3NS41IDc1LjUgMTczLjUgMTE3LjUgcTEwMiA0MyAyMTMgNDMgWk0yNTAwIDMwNDcgcTExMSAwIDIxMyAtNDMgcTk4IC00MiAxNzMuNSAtMTE3LjUgcTc1LjUgLTc1LjUgMTE3LjUgLTE3My41IHE0MyAtMTAyIDQzIC0yMTMgcTAgLTExMSAtNDMgLTIxMyBxLTQyIC05OCAtMTE3LjUgLTE3My41IHEtNzUuNSAtNzUuNSAtMTczLjUgLTExNy41IHEtMTAyIC00MyAtMjEzIC00MyBxLTExMSAwIC0yMTMgNDMgcS05OCA0MiAtMTczLjUgMTE3LjUgcS03NS41IDc1LjUgLTExNy41IDE3My41IHEtNDMgMTAyIC00MyAyMTMgcTAgMTExIDQzIDIxMyBxNDIgOTggMTE3LjUgMTczLjUgcTc1LjUgNzUuNSAxNzMuNSAxMTcuNSBxMTAyIDQzIDIxMyA0MyBaTTQyMTkgMzA0NyBxMTExIDAgMjEzIC00MyBxOTggLTQyIDE3My41IC0xMTcuNSBxNzUuNSAtNzUuNSAxMTcuNSAtMTczLjUgcTQzIC0xMDIgNDMgLTIxMyBxMCAtMTExIC00MyAtMjEzIHEtNDIgLTk4IC0xMTcuNSAtMTczLjUgcS03NS41IC03NS41IC0xNzMuNSAtMTE3LjUgcS0xMDIgLTQzIC0yMTMuNSAtNDMgcS0xMTEuNSAwIC0yMTIuNSA0MyBxLTk4IDQyIC0xNzQgMTE3LjUgcS03NiA3NS41IC0xMTcgMTczLjUgcS00MyAxMDIgLTQzIDIxMyBxMCAxMTEgNDMgMjEzIHE0MSA5OCAxMTcgMTczLjUgcTc2IDc1LjUgMTc0IDExNy41IHExMDEgNDMgMjEzIDQzIFoiIC8+PGdseXBoIGdseXBoLW5hbWU9InBhdXNlIiB1bmljb2RlPSImI3hlYTBjOyIgZD0iTTkzOCA0MDYzIGwwIC0zMTI1IGwxMjUwIDAgbDAgMzEyNSBsLTEyNTAgMCBaTTI4MTMgNDA2MyBsMCAtMzEyNSBsMTI1MCAwIGwwIDMxMjUgbC0xMjUwIDAgWiIgLz48Z2x5cGggZ2x5cGgtbmFtZT0icGxheSIgdW5pY29kZT0iJiN4ZWEwZDsiIGQ9Ik02MjUgNDM3NSBsMzc1MCAtMTg3NSBsLTM3NTAgLTE4NzUgbDAgMzc1MCBaIiAvPjxnbHlwaCBnbHlwaC1uYW1lPSJ0cmlhbmdsZS1zIiB1bmljb2RlPSImI3hlYTBlOyIgZD0iTTEyNTAgMzEyNSBsMTI1MCAtMTI1MCBsMTI1MCAxMjQ4IGwtMjUwMCAyIFoiIC8+PGdseXBoIGdseXBoLW5hbWU9InVzZXItc3RhdHVzLWF3YXkiIHVuaWNvZGU9IiYjeGVhMGY7IiBkPSJNMjE1NiA0OTY5IHEtMzYwIC00NiAtNjk1IC0xOTcgcS0zMjYgLTE0NyAtNjAxIC0zODAgcS0yNzQgLTIzMSAtNDcyIC01MjggcS0yMDIgLTMwMSAtMzA5IC02NDIgcS0xMTAgLTM1MyAtMTEwIC03MjIgcTAgLTQwNiAxMjggLTc4OCBxMTIzIC0zNzAgMzU2IC02ODYgcTIyOSAtMzEzIDU0MiAtNTQyIHEzMTYgLTIzMiA2ODYgLTM1NiBxMzgyIC0xMjggNzg4IC0xMjggcTM2OSAwIDcyMiAxMDcgcTM0MiAxMDQgNjQ0IDMwMSBxMjk4IDE5NCA1MzMgNDYzIHEyMzYgMjcwIDM4OSA1OTMgcTE1NiAzMzEgMjEyIDY5MiBxLTE4OCAtMjA0IC00MjMuNSAtMzUxIHEtMjM1LjUgLTE0NyAtNDk4LjUgLTIyNSBxLTI2OSAtODAgLTU0NyAtODAgcS0zMjIgMCAtNjI4IDEwMyBxLTI5NSA5OSAtNTQ4IDI4NiBxLTI1MSAxODQgLTQzNSA0MzUgcS0xODcgMjUzIC0yODYgNTQ4IHEtMTAzIDMwNiAtMTAzIDYyOCBxMCAyOTMgODAgNTY4IHE3OCAyNjkgMjI1LjUgNDk4LjUgcTE0Ny41IDIyOS41IDM1MC41IDQwMi41IFoiIC8+PGdseXBoIGdseXBoLW5hbWU9InVzZXItc3RhdHVzLWRuZCIgdW5pY29kZT0iJiN4ZWExMDsiIGQ9Ik0yNTAwIDUwMDAgcS00MDYgMCAtNzg4IC0xMjggcS0zNzAgLTEyNCAtNjg2IC0zNTYgcS0zMTMgLTIyOSAtNTQyIC01NDIgcS0yMzIgLTMxNiAtMzU2IC02ODYgcS0xMjggLTM4MiAtMTI4IC03ODggcTAgLTQwNiAxMjggLTc4OCBxMTI0IC0zNzAgMzU2IC02ODYgcTIyOSAtMzEzIDU0MiAtNTQyIHEzMTYgLTIzMiA2ODYgLTM1NiBxMzgyIC0xMjggNzg4IC0xMjggcTQwNiAwIDc4OCAxMjggcTM3MCAxMjQgNjg2IDM1NiBxMzEzIDIyOSA1NDIgNTQyIHEyMzIgMzE2IDM1NiA2ODYgcTEyOCAzODIgMTI4IDc4OCBxMCA0MDYgLTEyOCA3ODggcS0xMjQgMzcwIC0zNTYgNjg2IHEtMjI5IDMxMyAtNTQyIDU0MiBxLTMxNiAyMzIgLTY4NiAzNTYgcS0zODIgMTI4IC03ODggMTI4IFpNMTU2MyAyOTY5IGwxODc1IDAgcTkxIDAgMTc4IC0zOCBxODQgLTM3IDE1MCAtMTAzIHE2NiAtNjYgMTAyIC0xNDkgcTM4IC04NyAzOCAtMTc5IHEwIC05MiAtMzggLTE3OSBxLTM2IC04MyAtMTAyIC0xNDkgcS02NiAtNjYgLTE1MCAtMTAzIHEtODcgLTM4IC0xNzggLTM4IGwtMTg3NSAwIHEtOTIgMCAtMTc5IDM4IHEtODQgMzcgLTE1MCAxMDMgcS02NiA2NiAtMTAyIDE0OSBxLTM4IDg3IC0zOCAxNzkgcTAgOTIgMzggMTc5IHEzNiA4MyAxMDIgMTQ5IHE2NiA2NiAxNTAgMTAzIHE4NyAzOCAxNzkgMzggWiIgLz48Z2x5cGggZ2x5cGgtbmFtZT0idXNlci1zdGF0dXMtaW52aXNpYmxlIiB1bmljb2RlPSImI3hlYTExOyIgZD0iTTI1MDAgNTAwMCBxLTQwNiAwIC03ODggLTEyOCBxLTM3MCAtMTI0IC02ODYgLTM1NiBxLTMxMyAtMjI5IC01NDIgLTU0MiBxLTIzMiAtMzE2IC0zNTYgLTY4NiBxLTEyOCAtMzgyIC0xMjggLTc4OCBxMCAtNDA2IDEyOCAtNzg4IHExMjQgLTM3MCAzNTYgLTY4NiBxMjI5IC0zMTMgNTQyIC01NDIgcTMxNiAtMjMyIDY4NiAtMzU2IHEzODIgLTEyOCA3ODggLTEyOCBxNDA2IDAgNzg4IDEyOCBxMzcwIDEyNCA2ODYgMzU2IHEzMTMgMjI5IDU0MiA1NDIgcTIzMiAzMTYgMzU2IDY4NiBxMTI4IDM4MiAxMjggNzg4IHEwIDQwNiAtMTI4IDc4OCBxLTEyNCAzNzAgLTM1NiA2ODYgcS0yMjkgMzEzIC01NDIgNTQyIHEtMzE2IDIzMiAtNjg2IDM1NiBxLTM4MiAxMjggLTc4OCAxMjggWk0yNTAwIDQwMDAgcTMxMSAwIDU5MCAtMTE2IHEyNzEgLTExMiA0NzYuNSAtMzE3LjUgcTIwNS41IC0yMDUuNSAzMTcuNSAtNDc2LjUgcTExNiAtMjc5IDExNiAtNTkwIHEwIC0zMTEgLTExNiAtNTkwIHEtMTEyIC0yNzEgLTMxNy41IC00NzYuNSBxLTIwNS41IC0yMDUuNSAtNDc2LjUgLTMxNy41IHEtMjc5IC0xMTYgLTU5MCAtMTE2IHEtMzExIDAgLTU5MCAxMTYgcS0yNzEgMTEyIC00NzYuNSAzMTcuNSBxLTIwNS41IDIwNS41IC0zMTcuNSA0NzYuNSBxLTExNiAyNzkgLTExNiA1OTAgcTAgMzExIDExNiA1OTAgcTExMiAyNzEgMzE3LjUgNDc2LjUgcTIwNS41IDIwNS41IDQ3Ni41IDMxNy41IHEyNzkgMTE2IDU5MCAxMTYgWiIgLz48Z2x5cGggZ2x5cGgtbmFtZT0idXNlci1zdGF0dXMtb25saW5lIiB1bmljb2RlPSImI3hlYTEyOyIgZD0iTTE1MDAgMTUwMCBsMjAwMCAwIGwwIDIwMDAgbC0yMDAwIDAgbDAgLTIwMDAgWk0yNTAwIDUwMDAgcS00MDYgMCAtNzg4IC0xMjggcS0zNzAgLTEyNCAtNjg2IC0zNTYgcS0zMTMgLTIyOSAtNTQyIC01NDIgcS0yMzIgLTMxNiAtMzU2IC02ODYgcS0xMjggLTM4MiAtMTI4IC03ODggcTAgLTQwNiAxMjggLTc4OCBxMTI0IC0zNzAgMzU2IC02ODYgcTIyOSAtMzEzIDU0MiAtNTQyIHEzMTYgLTIzMiA2ODYgLTM1NiBxMzgyIC0xMjggNzg4IC0xMjggcTQwNiAwIDc4OCAxMjggcTM3MCAxMjQgNjg2IDM1NiBxMzEzIDIyOSA1NDIgNTQyIHEyMzIgMzE2IDM1NiA2ODYgcTEyOCAzODIgMTI4IDc4OCBxMCA0MDYgLTEyOCA3ODggcS0xMjQgMzcwIC0zNTYgNjg2IHEtMjI5IDMxMyAtNTQyIDU0MiBxLTMxNiAyMzIgLTY4NiAzNTYgcS0zODIgMTI4IC03ODggMTI4IFoiIC8+PC9mb250PjwvZGVmcz48L3N2Zz4=";
  },, function (t, A) {
    t.exports = __webpack_require__(/*! @nextcloud/router */ "./node_modules/@nextcloud/router/dist/index.js");
  }, function (t, A) {
    t.exports = __webpack_require__(/*! core-js/modules/es.function.name.js */ "./node_modules/core-js/modules/es.function.name.js");
  }, function (t, A) {
    t.exports = __webpack_require__(/*! core-js/modules/es.regexp.exec.js */ "./node_modules/core-js/modules/es.regexp.exec.js");
  }, function (t, A) {
    t.exports = __webpack_require__(/*! core-js/modules/es.string.iterator.js */ "./node_modules/core-js/modules/es.string.iterator.js");
  }, function (t, A) {
    t.exports = __webpack_require__(/*! core-js/modules/es.array.iterator.js */ "./node_modules/core-js/modules/es.array.iterator.js");
  }, function (t, A) {
    t.exports = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");
  }, function (t, A, n) {
    "use strict";

    var e = n(0),
        i = n.n(e),
        o = n(1),
        a = n.n(o)()(i.a);
    a.push([t.i, ".popover{z-index:100000;display:block !important;filter:drop-shadow(0 1px 10px var(--color-box-shadow))}.popover__inner{padding:0;color:var(--color-main-text);border-radius:var(--border-radius);background:var(--color-main-background)}.popover__arrow{position:absolute;z-index:1;width:0;height:0;margin:10px;border-style:solid;border-color:var(--color-main-background)}.popover[x-placement^='top']{margin-bottom:10px}.popover[x-placement^='top'] .popover__arrow{bottom:-10px;left:calc(50% - $arrow-width);margin-top:0;margin-bottom:0;border-width:10px 10px 0 10px;border-right-color:transparent !important;border-bottom-color:transparent !important;border-left-color:transparent !important}.popover[x-placement^='bottom']{margin-top:10px}.popover[x-placement^='bottom'] .popover__arrow{top:-10px;left:calc(50% - $arrow-width);margin-top:0;margin-bottom:0;border-width:0 10px 10px 10px;border-top-color:transparent !important;border-right-color:transparent !important;border-left-color:transparent !important}.popover[x-placement^='right']{margin-left:10px}.popover[x-placement^='right'] .popover__arrow{top:calc(50% - $arrow-width);left:-10px;margin-right:0;margin-left:0;border-width:10px 10px 10px 0;border-top-color:transparent !important;border-bottom-color:transparent !important;border-left-color:transparent !important}.popover[x-placement^='left']{margin-right:10px}.popover[x-placement^='left'] .popover__arrow{top:calc(50% - $arrow-width);right:-10px;margin-right:0;margin-left:0;border-width:10px 0 10px 10px;border-top-color:transparent !important;border-right-color:transparent !important;border-bottom-color:transparent !important}.popover[aria-hidden='true']{visibility:hidden;transition:opacity var(--animation-quick),visibility var(--animation-quick);opacity:0}.popover[aria-hidden='false']{visibility:visible;transition:opacity var(--animation-quick);opacity:1}\n", "", {
      version: 3,
      sources: ["webpack://./Popover.vue"],
      names: [],
      mappings: "AAgHA,SACC,cAAe,CACf,wBAAyB,CAEzB,sDAAuD,CAEvD,gBACC,SAAU,CACV,4BAA6B,CAC7B,kCAAmC,CACnC,uCAAwC,CACxC,gBAGA,iBAAkB,CAClB,SAAU,CACV,OAAQ,CACR,QAAS,CACT,WApBgB,CAqBhB,kBAAmB,CACnB,yCAA0C,CApB5C,6BAwBE,kBA1BgB,CAElB,6CA2BG,YA7Be,CA8Bf,6BAA8B,CAC9B,YAAa,CACb,eAAgB,CAChB,6BAjCe,CAkCf,yCAA0C,CAC1C,0CAA2C,CAC3C,wCAAyC,CAlC5C,gCAuCE,eAzCgB,CAElB,gDA0CG,SA5Ce,CA6Cf,6BAA8B,CAC9B,YAAa,CACb,eAAgB,CAChB,6BAhDe,CAiDf,uCAAwC,CACxC,yCAA0C,CAC1C,wCAAyC,CAjD5C,+BAsDE,gBAxDgB,CAElB,+CAyDG,4BAA6B,CAC7B,UA5De,CA6Df,cAAe,CACf,aAAc,CACd,6BAAsD,CACtD,uCAAwC,CACxC,0CAA2C,CAC3C,wCAAyC,CAhE5C,8BAqEE,iBAvEgB,CAElB,8CAwEG,4BAA6B,CAC7B,WA3Ee,CA4Ef,cAAe,CACf,aAAc,CACd,6BA9Ee,CA+Ef,uCAAwC,CACxC,yCAA0C,CAC1C,0CAA2C,CA/E9C,6BAoFE,iBAAkB,CAClB,2EAA6E,CAC7E,SAAU,CAtFZ,8BA0FE,kBAAmB,CACnB,yCAA0C,CAC1C,SAAU",
      sourcesContent: ["$scope_version:\"6b494fc\"; @import 'variables';\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n$arrow-width: 10px;\n\n.popover {\n\tz-index: 100000;\n\tdisplay: block !important;\n\n\tfilter: drop-shadow(0 1px 10px var(--color-box-shadow));\n\n\t&__inner {\n\t\tpadding: 0;\n\t\tcolor: var(--color-main-text);\n\t\tborder-radius: var(--border-radius);\n\t\tbackground: var(--color-main-background);\n\t}\n\n\t&__arrow {\n\t\tposition: absolute;\n\t\tz-index: 1;\n\t\twidth: 0;\n\t\theight: 0;\n\t\tmargin: $arrow-width;\n\t\tborder-style: solid;\n\t\tborder-color: var(--color-main-background);\n\t}\n\n\t&[x-placement^='top'] {\n\t\tmargin-bottom: $arrow-width;\n\n\t\t.popover__arrow {\n\t\t\tbottom: -$arrow-width;\n\t\t\tleft: calc(50% - $arrow-width);\n\t\t\tmargin-top: 0;\n\t\t\tmargin-bottom: 0;\n\t\t\tborder-width: $arrow-width $arrow-width 0 $arrow-width;\n\t\t\tborder-right-color: transparent !important;\n\t\t\tborder-bottom-color: transparent !important;\n\t\t\tborder-left-color: transparent !important;\n\t\t}\n\t}\n\n\t&[x-placement^='bottom'] {\n\t\tmargin-top: $arrow-width;\n\n\t\t.popover__arrow {\n\t\t\ttop: -$arrow-width;\n\t\t\tleft: calc(50% - $arrow-width);\n\t\t\tmargin-top: 0;\n\t\t\tmargin-bottom: 0;\n\t\t\tborder-width: 0 $arrow-width $arrow-width $arrow-width;\n\t\t\tborder-top-color: transparent !important;\n\t\t\tborder-right-color: transparent !important;\n\t\t\tborder-left-color: transparent !important;\n\t\t}\n\t}\n\n\t&[x-placement^='right'] {\n\t\tmargin-left: $arrow-width;\n\n\t\t.popover__arrow {\n\t\t\ttop: calc(50% - $arrow-width);\n\t\t\tleft: -$arrow-width;\n\t\t\tmargin-right: 0;\n\t\t\tmargin-left: 0;\n\t\t\tborder-width: $arrow-width $arrow-width $arrow-width 0;\n\t\t\tborder-top-color: transparent !important;\n\t\t\tborder-bottom-color: transparent !important;\n\t\t\tborder-left-color: transparent !important;\n\t\t}\n\t}\n\n\t&[x-placement^='left'] {\n\t\tmargin-right: $arrow-width;\n\n\t\t.popover__arrow {\n\t\t\ttop: calc(50% - $arrow-width);\n\t\t\tright: -$arrow-width;\n\t\t\tmargin-right: 0;\n\t\t\tmargin-left: 0;\n\t\t\tborder-width: $arrow-width 0 $arrow-width $arrow-width;\n\t\t\tborder-top-color: transparent !important;\n\t\t\tborder-right-color: transparent !important;\n\t\t\tborder-bottom-color: transparent !important;\n\t\t}\n\t}\n\n\t&[aria-hidden='true'] {\n\t\tvisibility: hidden;\n\t\ttransition: opacity var(--animation-quick), visibility var(--animation-quick);\n\t\topacity: 0;\n\t}\n\n\t&[aria-hidden='false'] {\n\t\tvisibility: visible;\n\t\ttransition: opacity var(--animation-quick);\n\t\topacity: 1;\n\t}\n}\n\n"],
      sourceRoot: ""
    }]), A.a = a;
  }, function (t, A) {}, function (t, A, n) {
    "use strict";

    n.r(A);
    var e = n(7),
        i = n(2),
        o = n.n(i),
        a = n(22),
        r = {
      insert: "head",
      singleton: !1
    };
    o()(a.a, r), a.a.locals;
    /**
     * @copyright Copyright (c) 2019 Julius Härtl <jus@bitgrid.net>
     *
     * @author Julius Härtl <jus@bitgrid.net>
     * @author John Molakvoæ <skjnldsv@protonmail.com>
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

    e.VTooltip.options.defaultTemplate = '<div class="vue-tooltip" role="tooltip" data-v-'.concat("6b494fc", '><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'), e.VTooltip.options.defaultHtml = !1;
    A.default = e.VTooltip;
  }, function (t, A, n) {
    "use strict";

    var e = n(0),
        i = n.n(e),
        o = n(1),
        a = n.n(o)()(i.a);
    a.push([t.i, ".vue-tooltip[data-v-6b494fc]{position:absolute;z-index:100000;right:auto;left:auto;display:block;margin:0;margin-top:-3px;padding:10px 0;text-align:left;text-align:start;opacity:0;line-height:1.6;line-break:auto;filter:drop-shadow(0 1px 10px var(--color-box-shadow))}.vue-tooltip[data-v-6b494fc][x-placement^='top'] .tooltip-arrow{bottom:0;margin-top:0;margin-bottom:0;border-width:10px 10px 0 10px;border-right-color:transparent;border-bottom-color:transparent;border-left-color:transparent}.vue-tooltip[data-v-6b494fc][x-placement^='bottom'] .tooltip-arrow{top:0;margin-top:0;margin-bottom:0;border-width:0 10px 10px 10px;border-top-color:transparent;border-right-color:transparent;border-left-color:transparent}.vue-tooltip[data-v-6b494fc][x-placement^='right'] .tooltip-arrow{right:100%;margin-right:0;margin-left:0;border-width:10px 10px 10px 0;border-top-color:transparent;border-bottom-color:transparent;border-left-color:transparent}.vue-tooltip[data-v-6b494fc][x-placement^='left'] .tooltip-arrow{left:100%;margin-right:0;margin-left:0;border-width:10px 0 10px 10px;border-top-color:transparent;border-right-color:transparent;border-bottom-color:transparent}.vue-tooltip[data-v-6b494fc][aria-hidden='true']{visibility:hidden;transition:opacity .15s, visibility .15s;opacity:0}.vue-tooltip[data-v-6b494fc][aria-hidden='false']{visibility:visible;transition:opacity .15s;opacity:1}.vue-tooltip[data-v-6b494fc] .tooltip-inner{max-width:350px;padding:5px 8px;text-align:center;color:var(--color-main-text);border-radius:var(--border-radius);background-color:var(--color-main-background)}.vue-tooltip[data-v-6b494fc] .tooltip-arrow{position:absolute;z-index:1;width:0;height:0;margin:0;border-style:solid;border-color:var(--color-main-background)}\n", "", {
      version: 3,
      sources: ["webpack://./index.scss"],
      names: [],
      mappings: "AAeA,6BACC,iBAAkB,CAClB,cAAe,CACf,UAAW,CACX,SAAU,CACV,aAAc,CACd,QAAS,CAET,eAAgB,CAChB,cAAe,CACf,eAAgB,CAChB,gBAAiB,CACjB,SAAU,CACV,eAAgB,CAEhB,eAAgB,CAChB,sDAAuD,CAhBxD,gEAqBG,QAAS,CACT,YAAa,CACb,eAAgB,CAChB,6BA1Be,CA2Bf,8BAA+B,CAC/B,+BAAgC,CAChC,6BAA8B,CA3BjC,mEAkCG,KAAM,CACN,YAAa,CACb,eAAgB,CAChB,6BAvCe,CAwCf,4BAA6B,CAC7B,8BAA+B,CAC/B,6BAA8B,CAxCjC,kEA+CG,UAAW,CACX,cAAe,CACf,aAAc,CACd,6BAAsD,CACtD,4BAA6B,CAC7B,+BAAgC,CAChC,6BAA8B,CArDjC,iEA4DG,SAAU,CACV,cAAe,CACf,aAAc,CACd,6BAjEe,CAkEf,4BAA6B,CAC7B,8BAA+B,CAC/B,+BAAgC,CAlEnC,iDAwEE,iBAAkB,CAClB,wCAAyC,CACzC,SAAU,CA1EZ,kDA6EE,kBAAmB,CACnB,uBAAwB,CACxB,SAAU,CA/EZ,4CAoFE,eAAgB,CAChB,eAAgB,CAChB,iBAAkB,CAClB,4BAA6B,CAC7B,kCAAmC,CACnC,6CAA8C,CAzFhD,4CA8FE,iBAAkB,CAClB,SAAU,CACV,OAAQ,CACR,QAAS,CACT,QAAS,CACT,kBAAmB,CACnB,yCAA0C",
      sourcesContent: ["$scope_version:\"6b494fc\"; @import 'variables';\n/**\n* @copyright Copyright (c) 2016, John Molakvoæ <skjnldsv@protonmail.com>\n* @copyright Copyright (c) 2016, Robin Appelman <robin@icewind.nl>\n* @copyright Copyright (c) 2016, Jan-Christoph Borchardt <hey@jancborchardt.net>\n* @copyright Copyright (c) 2016, Erik Pellikka <erik@pellikka.org>\n* @copyright Copyright (c) 2015, Vincent Petry <pvince81@owncloud.com>\n*\n* Bootstrap v3.3.5 (http://getbootstrap.com)\n* Copyright 2011-2015 Twitter, Inc.\n* Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)\n*/\n\n$arrow-width: 10px;\n\n.vue-tooltip[data-v-#{$scope_version}] {\n\tposition: absolute;\n\tz-index: 100000;\n\tright: auto;\n\tleft: auto;\n\tdisplay: block;\n\tmargin: 0;\n\t/* default to top */\n\tmargin-top: -3px;\n\tpadding: 10px 0;\n\ttext-align: left;\n\ttext-align: start;\n\topacity: 0;\n\tline-height: 1.6;\n\n\tline-break: auto;\n\tfilter: drop-shadow(0 1px 10px var(--color-box-shadow));\n\n\t// TOP\n\t&[x-placement^='top'] {\n\t\t.tooltip-arrow {\n\t\t\tbottom: 0;\n\t\t\tmargin-top: 0;\n\t\t\tmargin-bottom: 0;\n\t\t\tborder-width: $arrow-width $arrow-width 0 $arrow-width;\n\t\t\tborder-right-color: transparent;\n\t\t\tborder-bottom-color: transparent;\n\t\t\tborder-left-color: transparent;\n\t\t}\n\t}\n\n\t// BOTTOM\n\t&[x-placement^='bottom'] {\n\t\t.tooltip-arrow {\n\t\t\ttop: 0;\n\t\t\tmargin-top: 0;\n\t\t\tmargin-bottom: 0;\n\t\t\tborder-width: 0 $arrow-width $arrow-width $arrow-width;\n\t\t\tborder-top-color: transparent;\n\t\t\tborder-right-color: transparent;\n\t\t\tborder-left-color: transparent;\n\t\t}\n\t}\n\n\t// RIGHT\n\t&[x-placement^='right'] {\n\t\t.tooltip-arrow {\n\t\t\tright: 100%;\n\t\t\tmargin-right: 0;\n\t\t\tmargin-left: 0;\n\t\t\tborder-width: $arrow-width $arrow-width $arrow-width 0;\n\t\t\tborder-top-color: transparent;\n\t\t\tborder-bottom-color: transparent;\n\t\t\tborder-left-color: transparent;\n\t\t}\n\t}\n\n\t// LEFT\n\t&[x-placement^='left'] {\n\t\t.tooltip-arrow {\n\t\t\tleft: 100%;\n\t\t\tmargin-right: 0;\n\t\t\tmargin-left: 0;\n\t\t\tborder-width: $arrow-width 0 $arrow-width $arrow-width;\n\t\t\tborder-top-color: transparent;\n\t\t\tborder-right-color: transparent;\n\t\t\tborder-bottom-color: transparent;\n\t\t}\n\t}\n\n\t// HIDDEN / SHOWN\n\t&[aria-hidden='true'] {\n\t\tvisibility: hidden;\n\t\ttransition: opacity .15s, visibility .15s;\n\t\topacity: 0;\n\t}\n\t&[aria-hidden='false'] {\n\t\tvisibility: visible;\n\t\ttransition: opacity .15s;\n\t\topacity: 1;\n\t}\n\n\t// CONTENT\n\t.tooltip-inner {\n\t\tmax-width: 350px;\n\t\tpadding: 5px 8px;\n\t\ttext-align: center;\n\t\tcolor: var(--color-main-text);\n\t\tborder-radius: var(--border-radius);\n\t\tbackground-color: var(--color-main-background);\n\t}\n\n\t// ARROW\n\t.tooltip-arrow {\n\t\tposition: absolute;\n\t\tz-index: 1;\n\t\twidth: 0;\n\t\theight: 0;\n\t\tmargin: 0;\n\t\tborder-style: solid;\n\t\tborder-color: var(--color-main-background);\n\t}\n}\n"],
      sourceRoot: ""
    }]), A.a = a;
  }, function (t, A) {
    t.exports = __webpack_require__(/*! core-js/modules/es.array.map.js */ "./node_modules/core-js/modules/es.array.map.js");
  }, function (t, A) {
    t.exports = __webpack_require__(/*! core-js/modules/es.string.replace.js */ "./node_modules/core-js/modules/es.string.replace.js");
  }, function (t, A) {
    t.exports = __webpack_require__(/*! core-js/modules/es.regexp.to-string.js */ "./node_modules/core-js/modules/es.regexp.to-string.js");
  },, function (t, A) {
    t.exports = __webpack_require__(/*! core-js/modules/es.array.concat.js */ "./node_modules/core-js/modules/es.array.concat.js");
  }, function (t, A, n) {
    "use strict";

    var e = {
      name: "Popover",
      components: {
        VPopover: n(7).VPopover
      },
      mounted: function mounted() {
        var t = this;
        this.$watch(function () {
          return t.$refs.popover.isOpen;
        }, function (A) {
          A ? t.$emit("after-show") : t.$emit("after-hide");
        });
      }
    },
        i = n(2),
        o = n.n(i),
        a = n(19),
        r = {
      insert: "head",
      singleton: !1
    },
        s = (o()(a.a, r), a.a.locals, n(3)),
        c = n(20),
        l = n.n(c),
        d = Object(s.a)(e, function () {
      var t = this.$createElement,
          A = this._self._c || t;
      return A("VPopover", this._g(this._b({
        ref: "popover",
        attrs: {
          "popover-base-class": "popover",
          "popover-wrapper-class": "popover__wrapper",
          "popover-arrow-class": "popover__arrow",
          "popover-inner-class": "popover__inner"
        }
      }, "VPopover", this.$attrs, !1), this.$listeners), [this._t("trigger"), this._v(" "), A("template", {
        slot: "popover"
      }, [this._t("default")], 2)], 2);
    }, [], !1, null, null, null);
    "function" == typeof l.a && l()(d);
    A.a = d.exports;
  }, function (t, A) {
    t.exports = __webpack_require__(/*! @nextcloud/event-bus */ "./node_modules/@nextcloud/event-bus/dist/index.js");
  },, function (t, A) {
    t.exports = __webpack_require__(/*! core-js/modules/es.number.constructor.js */ "./node_modules/core-js/modules/es.number.constructor.js");
  }, function (t, A) {
    t.exports = __webpack_require__(/*! core-js/modules/es.symbol.js */ "./node_modules/core-js/modules/es.symbol.js");
  },,, function (t, A) {
    t.exports = __webpack_require__(/*! @nextcloud/auth */ "./node_modules/@nextcloud/auth/dist/index.js");
  }, function (t, A, n) {
    "use strict";

    n.r(A);
    var e = n(5),
        i = new (n.n(e).a)({
      data: function data() {
        return {
          isMobile: !1
        };
      },
      watch: {
        isMobile: function isMobile(t) {
          this.$emit("changed", t);
        }
      },
      created: function created() {
        window.addEventListener("resize", this.handleWindowResize), this.handleWindowResize();
      },
      beforeDestroy: function beforeDestroy() {
        window.removeEventListener("resize", this.handleWindowResize);
      },
      methods: {
        handleWindowResize: function handleWindowResize() {
          this.isMobile = document.documentElement.clientWidth < 1024;
        }
      }
    });
    A.default = {
      data: function data() {
        return {
          isMobile: !1
        };
      },
      mounted: function mounted() {
        i.$on("changed", this.onIsMobileChanged), this.isMobile = i.isMobile;
      },
      beforeDestroy: function beforeDestroy() {
        i.$off("changed", this.onIsMobileChanged);
      },
      methods: {
        onIsMobileChanged: function onIsMobileChanged(t) {
          this.isMobile = t;
        }
      }
    };
  }, function (t, A) {
    t.exports = __webpack_require__(/*! @nextcloud/axios */ "./node_modules/@nextcloud/axios/dist/index.js");
  }, function (t, A) {
    t.exports = __webpack_require__(/*! core-js/modules/es.symbol.description.js */ "./node_modules/core-js/modules/es.symbol.description.js");
  },, function (t, A) {
    t.exports = __webpack_require__(/*! core-js/modules/web.url.js */ "./node_modules/core-js/modules/web.url.js");
  }, function (t, A) {
    t.exports = __webpack_require__(/*! core-js/modules/es.array.slice.js */ "./node_modules/core-js/modules/es.array.slice.js");
  }, function (t, A) {
    t.exports = __webpack_require__(/*! v-click-outside */ "./node_modules/v-click-outside/dist/v-click-outside.umd.js");
  }, function (t, A) {
    t.exports = __webpack_require__(/*! striptags */ "./node_modules/striptags/src/striptags.js");
  }, function (t, A, n) {
    "use strict";

    var e = n(0),
        i = n.n(e),
        o = n(1),
        a = n.n(o)()(i.a);
    a.push([t.i, ".mention-bubble--primary .mention-bubble__content[data-v-724f9d58]{color:var(--color-primary-text);background-color:var(--color-primary-element)}.mention-bubble__wrapper[data-v-724f9d58]{max-width:150px;height:18px;vertical-align:text-bottom;display:inline-flex;align-items:center}.mention-bubble__content[data-v-724f9d58]{display:inline-flex;overflow:hidden;align-items:center;max-width:100%;height:20px;-webkit-user-select:none;user-select:none;padding-right:6px;padding-left:2px;border-radius:10px;background-color:var(--color-background-dark)}.mention-bubble__icon[data-v-724f9d58]{position:relative;width:16px;height:16px;border-radius:8px;background-color:var(--color-background-darker);background-repeat:no-repeat;background-position:center;background-size:12px}.mention-bubble__icon--with-avatar[data-v-724f9d58]{color:inherit;background-size:cover}.mention-bubble__title[data-v-724f9d58]{overflow:hidden;margin-left:2px;white-space:nowrap;text-overflow:ellipsis}.mention-bubble__title[data-v-724f9d58]::before{content:attr(title)}.mention-bubble__select[data-v-724f9d58]{position:absolute;z-index:-1;left:-1000px}\n", "", {
      version: 3,
      sources: ["webpack://./MentionBubble.vue"],
      names: [],
      mappings: "AAsGC,mEACC,+BAAgC,CAChC,6CAA8C,CAC9C,0CAGA,eAXsB,CAatB,WAAwC,CACxC,0BAA2B,CAC3B,mBAAoB,CACpB,kBAAmB,CACnB,0CAGA,mBAAoB,CACpB,eAAgB,CAChB,kBAAmB,CACnB,cAAe,CACf,WAzBkB,CA0BlB,wBAAyB,CACzB,gBAAiB,CACjB,iBAAkC,CAClC,gBA3BkB,CA4BlB,kBAAiC,CACjC,6CAA8C,CAC9C,uCAGA,iBAAkB,CAClB,UAjCuD,CAkCvD,WAlCuD,CAmCvD,iBAAsC,CACtC,+CAAgD,CAChD,2BAA4B,CAC5B,0BAA2B,CAC3B,oBAA0D,CAE1D,oDACC,aAAc,CACd,qBAAsB,CACtB,wCAID,eAAgB,CAChB,eAlDkB,CAmDlB,kBAAmB,CACnB,sBAAuB,CAJvB,gDAOC,mBAAoB,CACpB,yCAKD,iBAAkB,CAClB,UAAW,CACX,YAAa",
      sourcesContent: ["$scope_version:\"6b494fc\"; @import 'variables';\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n$bubble-height: 20px;\n$bubble-max-width: 150px;\n$bubble-padding: 2px;\n$bubble-avatar-size: $bubble-height - 2 * $bubble-padding;\n\n.mention-bubble {\n\t&--primary &__content {\n\t\tcolor: var(--color-primary-text);\n\t\tbackground-color: var(--color-primary-element);\n\t}\n\n\t&__wrapper {\n\t\tmax-width: $bubble-max-width;\n\t\t// Align with text\n\t\theight: $bubble-height - $bubble-padding;\n\t\tvertical-align: text-bottom;\n\t\tdisplay: inline-flex;\n\t\talign-items: center;\n\t}\n\n\t&__content {\n\t\tdisplay: inline-flex;\n\t\toverflow: hidden;\n\t\talign-items: center;\n\t\tmax-width: 100%;\n\t\theight: $bubble-height ;\n\t\t-webkit-user-select: none;\n\t\tuser-select: none;\n\t\tpadding-right: $bubble-padding * 3;\n\t\tpadding-left: $bubble-padding;\n\t\tborder-radius: $bubble-height / 2;\n\t\tbackground-color: var(--color-background-dark);\n\t}\n\n\t&__icon {\n\t\tposition: relative;\n\t\twidth: $bubble-avatar-size;\n\t\theight: $bubble-avatar-size;\n\t\tborder-radius: $bubble-avatar-size / 2;\n\t\tbackground-color: var(--color-background-darker);\n\t\tbackground-repeat: no-repeat;\n\t\tbackground-position: center;\n\t\tbackground-size: $bubble-avatar-size - 2 * $bubble-padding;\n\n\t\t&--with-avatar {\n\t\t\tcolor: inherit;\n\t\t\tbackground-size: cover;\n\t\t}\n\t}\n\n\t&__title {\n\t\toverflow: hidden;\n\t\tmargin-left: $bubble-padding;\n\t\twhite-space: nowrap;\n\t\ttext-overflow: ellipsis;\n\t\t// Put label in ::before so it is not selectable\n\t\t&::before {\n\t\t\tcontent: attr(title);\n\t\t}\n\t}\n\n\t// Hide the mention id so it is selectable\n\t&__select {\n\t\tposition: absolute;\n\t\tz-index: -1;\n\t\tleft: -1000px;\n\t}\n}\n\n"],
      sourceRoot: ""
    }]), A.a = a;
  }, function (t, A, n) {
    "use strict";

    n.d(A, "a", function () {
      return e.default;
    }), n.d(A, "b", function () {
      return i.default;
    }), n.d(A, "c", function () {
      return o.default;
    }), n.d(A, "d", function () {
      return a.default;
    }), n.d(A, "e", function () {
      return g;
    });
    var e = n(75),
        i = n(76),
        o = n(36),
        a = n(60),
        r = (n(59), n(6), n(58), n(37)),
        s = n.n(r),
        c = n(13),
        l = n(82),
        d = n(35);

    function u(t, A, n, e, i, o, a) {
      try {
        var r = t[o](a),
            s = r.value;
      } catch (t) {
        return void n(t);
      }

      r.done ? A(s) : Promise.resolve(s).then(e, i);
    }
    /**
     * @copyright Copyright (c) 2020 Georg Ehrke <georg-nextcloud@ehrke.email>
     *
     * @author Georg Ehrke <georg-nextcloud@ehrke.email>
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
     * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
     * GNU Affero General Public License for more details.
     *
     * You should have received a copy of the GNU Affero General Public License
     * along with this program. If not, see <http://www.gnu.org/licenses/>.
     *
     */


    var g = {
      data: function data() {
        return {
          hasStatus: !1,
          userStatus: {
            status: null,
            message: null,
            icon: null
          }
        };
      },
      methods: {
        fetchUserStatus: function fetchUserStatus(t) {
          var A,
              n = this;
          return (A = regeneratorRuntime.mark(function A() {
            var e, i, o, a, r, u, g, p, f;
            return regeneratorRuntime.wrap(function (A) {
              for (;;) {
                switch (A.prev = A.next) {
                  case 0:
                    if (e = Object(l.getCapabilities)(), Object.prototype.hasOwnProperty.call(e, "user_status") && e.user_status.enabled) {
                      A.next = 3;
                      break;
                    }

                    return A.abrupt("return");

                  case 3:
                    if (Object(d.getCurrentUser)()) {
                      A.next = 5;
                      break;
                    }

                    return A.abrupt("return");

                  case 5:
                    return A.prev = 5, A.next = 8, s.a.get(Object(c.generateOcsUrl)("apps/user_status/api/v1", 2) + "statuses/".concat(encodeURIComponent(t)));

                  case 8:
                    i = A.sent, o = i.data, a = o.ocs.data, r = a.status, u = a.message, g = a.icon, n.userStatus.status = r, n.userStatus.message = u || "", n.userStatus.icon = g || "", n.hasStatus = !0, A.next = 22;
                    break;

                  case 17:
                    if (A.prev = 17, A.t0 = A.catch(5), 404 !== A.t0.response.status || 0 !== (null === (p = A.t0.response.data.ocs) || void 0 === p || null === (f = p.data) || void 0 === f ? void 0 : f.length)) {
                      A.next = 21;
                      break;
                    }

                    return A.abrupt("return");

                  case 21:
                    console.error(A.t0);

                  case 22:
                  case "end":
                    return A.stop();
                }
              }
            }, A, null, [[5, 17]]);
          }), function () {
            var t = this,
                n = arguments;
            return new Promise(function (e, i) {
              var o = A.apply(t, n);

              function a(t) {
                u(o, e, i, a, r, "next", t);
              }

              function r(t) {
                u(o, e, i, a, r, "throw", t);
              }

              a(void 0);
            });
          })();
        }
      }
    };
    /**
     * @copyright Copyright (c) 2018 John Molakvoæ <skjnldsv@protonmail.com>
     *
     * @author John Molakvoæ <skjnldsv@protonmail.com>
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
  }, function (t, A) {
    t.exports = __webpack_require__(/*! core-js/modules/es.symbol.iterator.js */ "./node_modules/core-js/modules/es.symbol.iterator.js");
  },, function (t, A) {
    t.exports = __webpack_require__(/*! linkifyjs/string */ "./node_modules/linkifyjs/string.js");
  },,,, function (t, A) {
    t.exports = __webpack_require__(/*! core-js/modules/es.array.from.js */ "./node_modules/core-js/modules/es.array.from.js");
  }, function (t, A, n) {
    "use strict";

    var e = n(0),
        i = n.n(e),
        o = n(1),
        a = n.n(o)()(i.a);
    a.push([t.i, "\nbutton.menuitem[data-v-febed9b6] {\n\ttext-align: left;\n}\nbutton.menuitem *[data-v-febed9b6] {\n\tcursor: pointer;\n}\nbutton.menuitem[data-v-febed9b6]:disabled {\n\topacity: 0.5 !important;\n\tcursor: default;\n}\nbutton.menuitem:disabled *[data-v-febed9b6] {\n\tcursor: default;\n}\n.menuitem.active[data-v-febed9b6] {\n\tbox-shadow: inset 2px 0 var(--color-primary);\n\tborder-radius: 0;\n}\n", "", {
      version: 3,
      sources: ["webpack://./PopoverMenuItem.vue"],
      names: [],
      mappings: ";AAmLA;CACA,gBAAA;AACA;AAEA;CACA,eAAA;AACA;AAEA;CACA,uBAAA;CACA,eAAA;AACA;AAEA;CACA,eAAA;AACA;AAEA;CACA,4CAAA;CACA,gBAAA;AACA",
      sourcesContent: ['\x3c!--\n  - @copyright Copyright (c) 2018 John Molakvoæ <skjnldsv@protonmail.com>\n  -\n  - @author John Molakvoæ <skjnldsv@protonmail.com>\n  -\n  - @license GNU AGPL version 3 or any later version\n  -\n  - This program is free software: you can redistribute it and/or modify\n  - it under the terms of the GNU Affero General Public License as\n  - published by the Free Software Foundation, either version 3 of the\n  - License, or (at your option) any later version.\n  -\n  - This program is distributed in the hope that it will be useful,\n  - but WITHOUT ANY WARRANTY; without even the implied warranty of\n  - MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the\n  - GNU Affero General Public License for more details.\n  -\n  - You should have received a copy of the GNU Affero General Public License\n  - along with this program. If not, see <http://www.gnu.org/licenses/>.\n  -\n  --\x3e\n\n<template>\n\t<li class="popover__menuitem">\n\t\t\x3c!-- If item.href is set, a link will be directly used --\x3e\n\t\t<a v-if="item.href"\n\t\t\t:href="(item.href) ? item.href : \'#\' "\n\t\t\t:target="(item.target) ? item.target : \'\' "\n\t\t\t:download="item.download"\n\t\t\tclass="focusable"\n\t\t\trel="noreferrer noopener"\n\t\t\t@click="action">\n\t\t\t<span v-if="!iconIsUrl" :class="item.icon" />\n\t\t\t<img v-else :src="item.icon">\n\t\t\t<p v-if="item.text && item.longtext">\n\t\t\t\t<strong class="menuitem-text">\n\t\t\t\t\t{{ item.text }}\n\t\t\t\t</strong><br>\n\t\t\t\t<span class="menuitem-text-detail">\n\t\t\t\t\t{{ item.longtext }}\n\t\t\t\t</span>\n\t\t\t</p>\n\t\t\t<span v-else-if="item.text">\n\t\t\t\t{{ item.text }}\n\t\t\t</span>\n\t\t\t<p v-else-if="item.longtext">\n\t\t\t\t{{ item.longtext }}\n\t\t\t</p>\n\t\t</a>\n\n\t\t\x3c!-- If item.input is set instead, an put will be used --\x3e\n\t\t<span v-else-if="item.input" class="menuitem" :class="{active: item.active}">\n\t\t\t\x3c!-- does not show if input is checkbox --\x3e\n\t\t\t<span v-if="item.input !== \'checkbox\'" :class="item.icon" />\n\n\t\t\t\x3c!-- only shows if input is text --\x3e\n\t\t\t<form v-if="item.input === \'text\'"\n\t\t\t\t:class="item.input"\n\t\t\t\t@submit.prevent="item.action">\n\t\t\t\t<input :type="item.input"\n\t\t\t\t\t:value="item.value"\n\t\t\t\t\t:placeholder="item.text"\n\t\t\t\t\trequired>\n\t\t\t\t<input type="submit" value="" class="icon-confirm">\n\t\t\t</form>\n\n\t\t\t\x3c!-- checkbox --\x3e\n\t\t\t<template v-else>\n\t\t\t\t\x3c!-- eslint-disable-next-line --\x3e\n\t\t\t\t<input :id="key" v-model="item.model"\n\t\t\t\t\t:type="item.input"\n\t\t\t\t\t:class="item.input"\n\t\t\t\t\t@change="item.action">\n\t\t\t\t<label :for="key" @click.stop.prevent="item.action">\n\t\t\t\t\t{{ item.text }}\n\t\t\t\t</label>\n\t\t\t</template>\n\t\t</span>\n\n\t\t\x3c!-- If item.action is set instead, a button will be used --\x3e\n\t\t<button v-else-if="item.action"\n\t\t\tclass="menuitem focusable"\n\t\t\t:class="{active: item.active}"\n\t\t\t:disabled="item.disabled"\n\t\t\t@click.stop.prevent="item.action">\n\t\t\t<span :class="item.icon" />\n\t\t\t<p v-if="item.text && item.longtext">\n\t\t\t\t<strong class="menuitem-text">\n\t\t\t\t\t{{ item.text }}\n\t\t\t\t</strong><br>\n\t\t\t\t<span class="menuitem-text-detail">\n\t\t\t\t\t{{ item.longtext }}\n\t\t\t\t</span>\n\t\t\t</p>\n\t\t\t<span v-else-if="item.text">\n\t\t\t\t{{ item.text }}\n\t\t\t</span>\n\t\t\t<p v-else-if="item.longtext">\n\t\t\t\t{{ item.longtext }}\n\t\t\t</p>\n\t\t</button>\n\n\t\t\x3c!-- If item.longtext is set AND the item does not have an action --\x3e\n\t\t<span v-else class="menuitem" :class="{active: item.active}">\n\t\t\t<span :class="item.icon" />\n\t\t\t<p v-if="item.text && item.longtext">\n\t\t\t\t<strong class="menuitem-text">\n\t\t\t\t\t{{ item.text }}\n\t\t\t\t</strong><br>\n\t\t\t\t<span class="menuitem-text-detail">\n\t\t\t\t\t{{ item.longtext }}\n\t\t\t\t</span>\n\t\t\t</p>\n\t\t\t<span v-else-if="item.text">\n\t\t\t\t{{ item.text }}\n\t\t\t</span>\n\t\t\t<p v-else-if="item.longtext">\n\t\t\t\t{{ item.longtext }}\n\t\t\t</p>\n\t\t</span>\n\t</li>\n</template>\n\n<script>\nexport default {\n\tname: \'PopoverMenuItem\',\n\tprops: {\n\t\titem: {\n\t\t\ttype: Object,\n\t\t\trequired: true,\n\t\t\tdefault: () => {\n\t\t\t\treturn {\n\t\t\t\t\tkey: \'nextcloud-link\',\n\t\t\t\t\thref: \'https://nextcloud.com\',\n\t\t\t\t\ticon: \'icon-links\',\n\t\t\t\t\ttext: \'Nextcloud\',\n\t\t\t\t}\n\t\t\t},\n\t\t\t// check the input types\n\t\t\t// TODO: add more validation of types\n\t\t\tvalidator: item => {\n\t\t\t\t// TODO: support radio\n\t\t\t\tif (item.input) {\n\t\t\t\t\treturn [\'text\', \'checkbox\'].indexOf(item.input) !== -1\n\t\t\t\t}\n\t\t\t\treturn true\n\t\t\t},\n\t\t},\n\t},\n\tcomputed: {\n\t\t// random key for inputs binding if not provided\n\t\tkey() {\n\t\t\treturn this.item.key\n\t\t\t\t? this.item.key\n\t\t\t\t: Math.round(Math.random() * 16 * 1000000).toString(16)\n\t\t},\n\t\ticonIsUrl() {\n\t\t\ttry {\n\t\t\t\t// eslint-disable-next-line no-new\n\t\t\t\tnew URL(this.item.icon)\n\t\t\t\treturn true\n\t\t\t} catch (_) {\n\t\t\t\treturn false\n\t\t\t}\n\t\t},\n\t},\n\tmethods: {\n\t\t// allow us to use both link and an action on `a`\n\t\t// we still need to make sure item.action exists\n\t\taction(event) {\n\t\t\tif (this.item.action) {\n\t\t\t\tthis.item.action(event)\n\t\t\t}\n\t\t},\n\t},\n}\n<\/script>\n\n<style scoped>\n\tbutton.menuitem {\n\t\ttext-align: left;\n\t}\n\n\tbutton.menuitem * {\n\t\tcursor: pointer;\n\t}\n\n\tbutton.menuitem:disabled {\n\t\topacity: 0.5 !important;\n\t\tcursor: default;\n\t}\n\n\tbutton.menuitem:disabled * {\n\t\tcursor: default;\n\t}\n\n\t.menuitem.active {\n\t\tbox-shadow: inset 2px 0 var(--color-primary);\n\t\tborder-radius: 0;\n\t}\n</style>\n\n<style lang="scss" scoped>\nli {\n\tdisplay: flex;\n\tflex: 0 0 auto;\n\n\t&.hidden {\n\t\tdisplay: none;\n\t}\n\n\t> button,\n\t> a,\n\t> .menuitem {\n\t\tcursor: pointer;\n\t\tline-height: $clickable-area;\n\t\tborder: 0;\n\t\tborder-radius: 0; // otherwise Safari will cut the border-radius area\n\t\tbackground-color: transparent;\n\t\tdisplay: flex;\n\t\talign-items: flex-start;\n\t\theight: auto;\n\t\tmargin: 0;\n\t\tpadding: 0;\n\t\tfont-weight: normal;\n\t\tbox-shadow: none;\n\t\twidth: 100%;\n\t\tcolor: var(--color-main-text);\n\t\twhite-space: nowrap;\n\t\topacity: $opacity_normal;\n\n\t\t// TODO split into individual components for readability\n\t\tspan[class^=\'icon-\'],\n\t\tspan[class*=\' icon-\'],\n\t\t&[class^=\'icon-\'],\n\t\t&[class*=\' icon-\'] {\n\t\t\tmin-width: 0; /* Overwrite icons*/\n\t\t\tmin-height: 0;\n\t\t\tbackground-position: #{$icon-margin} center;\n\t\t\tbackground-size: $icon-size;\n\t\t}\n\n\t\tspan[class^=\'icon-\'],\n\t\tspan[class*=\' icon-\'] {\n\t\t\t/* Keep padding to define the width to\n\t\t\t\tassure correct position of a possible text */\n\t\t\tpadding: #{$clickable-area / 2} 0 #{$clickable-area / 2} $clickable-area;\n\t\t}\n\n\t\t// If no icons set, force left margin to align\n\t\t&:not([class^=\'icon-\']):not([class*=\'icon-\']) {\n\t\t\t> span,\n\t\t\t> input,\n\t\t\t> form {\n\t\t\t\t&:not([class^=\'icon-\']):not([class*=\'icon-\']):first-child {\n\t\t\t\t\tmargin-left: $clickable-area;\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\n\t\t&[class^=\'icon-\'],\n\t\t&[class*=\' icon-\'] {\n\t\t\tpadding: 0 $icon-margin 0 $clickable-area;\n\t\t}\n\n\t\t&:not(:disabled):hover,\n\t\t&:not(:disabled):focus,\n\t\t&:not(:disabled).active {\n\t\t\topacity: $opacity_full !important;\n\t\t}\n\n\t\t/* prevent .action class to break the design */\n\t\t&.action {\n\t\t\tpadding: inherit !important;\n\t\t}\n\n\t\t> span {\n\t\t\tcursor: pointer;\n\t\t\twhite-space: nowrap;\n\t\t}\n\n\t\t// long text area\n\t\t> p {\n\t\t\twidth: 150px;\n\t\t\tline-height: 1.6em;\n\t\t\tpadding: 8px 0;\n\t\t\twhite-space: normal;\n\n\t\t\t// in case there are no spaces like long email addresses\n\t\t\toverflow: hidden;\n\t\t\ttext-overflow: ellipsis;\n\t\t}\n\n\t\t// TODO: do we really supports it?\n\t\t> select {\n\t\t\tmargin: 0;\n\t\t\tmargin-left: 6px;\n\t\t}\n\n\t\t/* Add padding if contains icon+text */\n\t\t&:not(:empty) {\n\t\t\tpadding-right: $icon-margin !important;\n\t\t}\n\n\t\t/* DEPRECATED! old img in popover fallback\n\t\t\t* TODO: to remove */\n\t\t> img {\n\t\t\twidth: $icon-size;\n\t\t\tpadding: $icon-margin;\n\t\t}\n\n\t\t/* checkbox/radio fixes */\n\t\t> input.radio + label,\n\t\t> input.checkbox + label {\n\t\t\tpadding: 0 !important;\n\t\t\twidth: 100%;\n\t\t}\n\t\t> input.checkbox + label::before {\n\t\t\tmargin: -2px 13px 0;\n\t\t}\n\t\t> input.radio + label::before {\n\t\t\tmargin: -2px 12px 0;\n\t\t}\n\t\t> input:not([type=radio]):not([type=checkbox]):not([type=image]) {\n\t\t\twidth: 150px;\n\t\t}\n\n\t\t// Forms & text inputs\n\t\tform {\n\t\t\tdisplay: flex;\n\t\t\tflex: 1 1 auto;\n\t\t\t/* put a small space between text and form\n\t\t\t\tif there is an element before */\n\t\t\t&:not(:first-child)  {\n\t\t\t\tmargin-left: 5px;\n\t\t\t}\n\t\t}\n\t\t/* no margin if hidden span before */\n\t\t> span.hidden + form,\n\t\t> span[style*=\'display:none\'] + form {\n\t\t\tmargin-left: 0;\n\t\t}\n\t\t/* Inputs inside popover supports text, submit & reset */\n\t\tinput {\n\t\t\tmin-width: $clickable-area;\n\t\t\tmax-height: #{$clickable-area - 4px}; /* twice the element margin-y */\n\t\t\tmargin: 2px 0;\n\t\t\tflex: 1 1 auto;\n\t\t\t// space between inline inputs\n\t\t\t&:not(:first-child) {\n\t\t\t\tmargin-left: 5px;\n\t\t\t}\n\t\t}\n\t}\n\n\t// TODO: do that in js, should be cleaner\n\t/* css hack, only first not hidden */\n\t&:not(.hidden):not([style*=\'display:none\']) {\n\t\t&:first-of-type {\n\t\t\t> button, > a, > .menuitem {\n\t\t\t\t> form, > input {\n\t\t\t\t\tmargin-top: $icon-margin - 2px; // minus the input margin\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t\t&:last-of-type {\n\t\t\t> button, > a, > .menuitem {\n\t\t\t\t> form, > input {\n\t\t\t\t\tmargin-bottom: $icon-margin - 2px; // minus the input margin\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n\t> button {\n\t\tpadding: 0;\n\t\tspan {\n\t\t\topacity: $opacity_full;\n\t\t}\n\t}\n}\n</style>\n'],
      sourceRoot: ""
    }]), A.a = a;
  }, function (t, A, n) {
    "use strict";

    var e = n(0),
        i = n.n(e),
        o = n(1),
        a = n.n(o)()(i.a);
    a.push([t.i, "li[data-v-febed9b6]{display:flex;flex:0 0 auto}li.hidden[data-v-febed9b6]{display:none}li>button[data-v-febed9b6],li>a[data-v-febed9b6],li>.menuitem[data-v-febed9b6]{cursor:pointer;line-height:44px;border:0;border-radius:0;background-color:transparent;display:flex;align-items:flex-start;height:auto;margin:0;padding:0;font-weight:normal;box-shadow:none;width:100%;color:var(--color-main-text);white-space:nowrap;opacity:.7}li>button span[class^='icon-'][data-v-febed9b6],li>button span[class*=' icon-'][data-v-febed9b6],li>button[class^='icon-'][data-v-febed9b6],li>button[class*=' icon-'][data-v-febed9b6],li>a span[class^='icon-'][data-v-febed9b6],li>a span[class*=' icon-'][data-v-febed9b6],li>a[class^='icon-'][data-v-febed9b6],li>a[class*=' icon-'][data-v-febed9b6],li>.menuitem span[class^='icon-'][data-v-febed9b6],li>.menuitem span[class*=' icon-'][data-v-febed9b6],li>.menuitem[class^='icon-'][data-v-febed9b6],li>.menuitem[class*=' icon-'][data-v-febed9b6]{min-width:0;min-height:0;background-position:14px center;background-size:16px}li>button span[class^='icon-'][data-v-febed9b6],li>button span[class*=' icon-'][data-v-febed9b6],li>a span[class^='icon-'][data-v-febed9b6],li>a span[class*=' icon-'][data-v-febed9b6],li>.menuitem span[class^='icon-'][data-v-febed9b6],li>.menuitem span[class*=' icon-'][data-v-febed9b6]{padding:22px 0 22px 44px}li>button:not([class^='icon-']):not([class*='icon-'])>span[data-v-febed9b6]:not([class^='icon-']):not([class*='icon-']):first-child,li>button:not([class^='icon-']):not([class*='icon-'])>input[data-v-febed9b6]:not([class^='icon-']):not([class*='icon-']):first-child,li>button:not([class^='icon-']):not([class*='icon-'])>form[data-v-febed9b6]:not([class^='icon-']):not([class*='icon-']):first-child,li>a:not([class^='icon-']):not([class*='icon-'])>span[data-v-febed9b6]:not([class^='icon-']):not([class*='icon-']):first-child,li>a:not([class^='icon-']):not([class*='icon-'])>input[data-v-febed9b6]:not([class^='icon-']):not([class*='icon-']):first-child,li>a:not([class^='icon-']):not([class*='icon-'])>form[data-v-febed9b6]:not([class^='icon-']):not([class*='icon-']):first-child,li>.menuitem:not([class^='icon-']):not([class*='icon-'])>span[data-v-febed9b6]:not([class^='icon-']):not([class*='icon-']):first-child,li>.menuitem:not([class^='icon-']):not([class*='icon-'])>input[data-v-febed9b6]:not([class^='icon-']):not([class*='icon-']):first-child,li>.menuitem:not([class^='icon-']):not([class*='icon-'])>form[data-v-febed9b6]:not([class^='icon-']):not([class*='icon-']):first-child{margin-left:44px}li>button[class^='icon-'][data-v-febed9b6],li>button[class*=' icon-'][data-v-febed9b6],li>a[class^='icon-'][data-v-febed9b6],li>a[class*=' icon-'][data-v-febed9b6],li>.menuitem[class^='icon-'][data-v-febed9b6],li>.menuitem[class*=' icon-'][data-v-febed9b6]{padding:0 14px 0 44px}li>button[data-v-febed9b6]:not(:disabled):hover,li>button[data-v-febed9b6]:not(:disabled):focus,li>button:not(:disabled).active[data-v-febed9b6],li>a[data-v-febed9b6]:not(:disabled):hover,li>a[data-v-febed9b6]:not(:disabled):focus,li>a:not(:disabled).active[data-v-febed9b6],li>.menuitem[data-v-febed9b6]:not(:disabled):hover,li>.menuitem[data-v-febed9b6]:not(:disabled):focus,li>.menuitem:not(:disabled).active[data-v-febed9b6]{opacity:1 !important}li>button.action[data-v-febed9b6],li>a.action[data-v-febed9b6],li>.menuitem.action[data-v-febed9b6]{padding:inherit !important}li>button>span[data-v-febed9b6],li>a>span[data-v-febed9b6],li>.menuitem>span[data-v-febed9b6]{cursor:pointer;white-space:nowrap}li>button>p[data-v-febed9b6],li>a>p[data-v-febed9b6],li>.menuitem>p[data-v-febed9b6]{width:150px;line-height:1.6em;padding:8px 0;white-space:normal;overflow:hidden;text-overflow:ellipsis}li>button>select[data-v-febed9b6],li>a>select[data-v-febed9b6],li>.menuitem>select[data-v-febed9b6]{margin:0;margin-left:6px}li>button[data-v-febed9b6]:not(:empty),li>a[data-v-febed9b6]:not(:empty),li>.menuitem[data-v-febed9b6]:not(:empty){padding-right:14px !important}li>button>img[data-v-febed9b6],li>a>img[data-v-febed9b6],li>.menuitem>img[data-v-febed9b6]{width:16px;padding:14px}li>button>input.radio+label[data-v-febed9b6],li>button>input.checkbox+label[data-v-febed9b6],li>a>input.radio+label[data-v-febed9b6],li>a>input.checkbox+label[data-v-febed9b6],li>.menuitem>input.radio+label[data-v-febed9b6],li>.menuitem>input.checkbox+label[data-v-febed9b6]{padding:0 !important;width:100%}li>button>input.checkbox+label[data-v-febed9b6]::before,li>a>input.checkbox+label[data-v-febed9b6]::before,li>.menuitem>input.checkbox+label[data-v-febed9b6]::before{margin:-2px 13px 0}li>button>input.radio+label[data-v-febed9b6]::before,li>a>input.radio+label[data-v-febed9b6]::before,li>.menuitem>input.radio+label[data-v-febed9b6]::before{margin:-2px 12px 0}li>button>input[data-v-febed9b6]:not([type=radio]):not([type=checkbox]):not([type=image]),li>a>input[data-v-febed9b6]:not([type=radio]):not([type=checkbox]):not([type=image]),li>.menuitem>input[data-v-febed9b6]:not([type=radio]):not([type=checkbox]):not([type=image]){width:150px}li>button form[data-v-febed9b6],li>a form[data-v-febed9b6],li>.menuitem form[data-v-febed9b6]{display:flex;flex:1 1 auto}li>button form[data-v-febed9b6]:not(:first-child),li>a form[data-v-febed9b6]:not(:first-child),li>.menuitem form[data-v-febed9b6]:not(:first-child){margin-left:5px}li>button>span.hidden+form[data-v-febed9b6],li>button>span[style*='display:none']+form[data-v-febed9b6],li>a>span.hidden+form[data-v-febed9b6],li>a>span[style*='display:none']+form[data-v-febed9b6],li>.menuitem>span.hidden+form[data-v-febed9b6],li>.menuitem>span[style*='display:none']+form[data-v-febed9b6]{margin-left:0}li>button input[data-v-febed9b6],li>a input[data-v-febed9b6],li>.menuitem input[data-v-febed9b6]{min-width:44px;max-height:40px;margin:2px 0;flex:1 1 auto}li>button input[data-v-febed9b6]:not(:first-child),li>a input[data-v-febed9b6]:not(:first-child),li>.menuitem input[data-v-febed9b6]:not(:first-child){margin-left:5px}li:not(.hidden):not([style*='display:none']):first-of-type>button>form[data-v-febed9b6],li:not(.hidden):not([style*='display:none']):first-of-type>button>input[data-v-febed9b6],li:not(.hidden):not([style*='display:none']):first-of-type>a>form[data-v-febed9b6],li:not(.hidden):not([style*='display:none']):first-of-type>a>input[data-v-febed9b6],li:not(.hidden):not([style*='display:none']):first-of-type>.menuitem>form[data-v-febed9b6],li:not(.hidden):not([style*='display:none']):first-of-type>.menuitem>input[data-v-febed9b6]{margin-top:12px}li:not(.hidden):not([style*='display:none']):last-of-type>button>form[data-v-febed9b6],li:not(.hidden):not([style*='display:none']):last-of-type>button>input[data-v-febed9b6],li:not(.hidden):not([style*='display:none']):last-of-type>a>form[data-v-febed9b6],li:not(.hidden):not([style*='display:none']):last-of-type>a>input[data-v-febed9b6],li:not(.hidden):not([style*='display:none']):last-of-type>.menuitem>form[data-v-febed9b6],li:not(.hidden):not([style*='display:none']):last-of-type>.menuitem>input[data-v-febed9b6]{margin-bottom:12px}li>button[data-v-febed9b6]{padding:0}li>button span[data-v-febed9b6]{opacity:1}\n", "", {
      version: 3,
      sources: ["webpack://./PopoverMenuItem.vue", "webpack://./../../assets/variables.scss"],
      names: [],
      mappings: "AA4MA,oBACC,YAAa,CACb,aAAc,CAFf,2BAKE,YAAa,CALf,+EAWE,cAAe,CACf,gBC/LmB,CDgMnB,QAAS,CACT,eAAgB,CAChB,4BAA6B,CAC7B,YAAa,CACb,sBAAuB,CACvB,WAAY,CACZ,QAAS,CACT,SAAU,CACV,kBAAmB,CACnB,eAAgB,CAChB,UAAW,CACX,4BAA6B,CAC7B,kBAAmB,CACnB,UC3LiB,CDiKnB,giBAiCG,WAAY,CACZ,YAAa,CACb,+BAA2C,CAC3C,oBCnNa,CD+KhB,+RA2CG,wBC9NkB,CDmLrB,iqCAoDK,gBCvOgB,CDmLrB,iQA2DG,qBC9OkB,CDmLrB,6aAiEG,oBAAiC,CAjEpC,oGAsEG,0BAA2B,CAtE9B,8FA0EG,cAAe,CACf,kBAAmB,CA3EtB,qFAgFG,WAAY,CACZ,iBAAkB,CAClB,aAAc,CACd,kBAAmB,CAGnB,eAAgB,CAChB,sBAAuB,CAvF1B,oGA4FG,QAAS,CACT,eAAgB,CA7FnB,mHAkGG,6BAAsC,CAlGzC,2FAwGG,UCvRa,CDwRb,YCpR6C,CD2KhD,mRA+GG,oBAAqB,CACrB,UAAW,CAhHd,sKAmHG,kBAAmB,CAnHtB,6JAsHG,kBAAmB,CAtHtB,4QAyHG,WAAY,CAzHf,8FA8HG,YAAa,CACb,aAAc,CA/HjB,oJAmII,eAAgB,CAnIpB,oTAyIG,aAAc,CAzIjB,iGA6IG,cChUkB,CDiUlB,eAAY,CACZ,YAAa,CACb,aAAc,CAhJjB,uJAmJI,eAAgB,CAnJpB,+gBA8JK,eAA8B,CA9JnC,ygBAqKK,kBAAiC,CArKtC,2BA2KE,SAAU,CA3KZ,gCA6KG,SC7Ua",
      sourcesContent: ["$scope_version:\"6b494fc\"; @import 'variables';\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nli {\n\tdisplay: flex;\n\tflex: 0 0 auto;\n\n\t&.hidden {\n\t\tdisplay: none;\n\t}\n\n\t> button,\n\t> a,\n\t> .menuitem {\n\t\tcursor: pointer;\n\t\tline-height: $clickable-area;\n\t\tborder: 0;\n\t\tborder-radius: 0; // otherwise Safari will cut the border-radius area\n\t\tbackground-color: transparent;\n\t\tdisplay: flex;\n\t\talign-items: flex-start;\n\t\theight: auto;\n\t\tmargin: 0;\n\t\tpadding: 0;\n\t\tfont-weight: normal;\n\t\tbox-shadow: none;\n\t\twidth: 100%;\n\t\tcolor: var(--color-main-text);\n\t\twhite-space: nowrap;\n\t\topacity: $opacity_normal;\n\n\t\t// TODO split into individual components for readability\n\t\tspan[class^='icon-'],\n\t\tspan[class*=' icon-'],\n\t\t&[class^='icon-'],\n\t\t&[class*=' icon-'] {\n\t\t\tmin-width: 0; /* Overwrite icons*/\n\t\t\tmin-height: 0;\n\t\t\tbackground-position: #{$icon-margin} center;\n\t\t\tbackground-size: $icon-size;\n\t\t}\n\n\t\tspan[class^='icon-'],\n\t\tspan[class*=' icon-'] {\n\t\t\t/* Keep padding to define the width to\n\t\t\t\tassure correct position of a possible text */\n\t\t\tpadding: #{$clickable-area / 2} 0 #{$clickable-area / 2} $clickable-area;\n\t\t}\n\n\t\t// If no icons set, force left margin to align\n\t\t&:not([class^='icon-']):not([class*='icon-']) {\n\t\t\t> span,\n\t\t\t> input,\n\t\t\t> form {\n\t\t\t\t&:not([class^='icon-']):not([class*='icon-']):first-child {\n\t\t\t\t\tmargin-left: $clickable-area;\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\n\t\t&[class^='icon-'],\n\t\t&[class*=' icon-'] {\n\t\t\tpadding: 0 $icon-margin 0 $clickable-area;\n\t\t}\n\n\t\t&:not(:disabled):hover,\n\t\t&:not(:disabled):focus,\n\t\t&:not(:disabled).active {\n\t\t\topacity: $opacity_full !important;\n\t\t}\n\n\t\t/* prevent .action class to break the design */\n\t\t&.action {\n\t\t\tpadding: inherit !important;\n\t\t}\n\n\t\t> span {\n\t\t\tcursor: pointer;\n\t\t\twhite-space: nowrap;\n\t\t}\n\n\t\t// long text area\n\t\t> p {\n\t\t\twidth: 150px;\n\t\t\tline-height: 1.6em;\n\t\t\tpadding: 8px 0;\n\t\t\twhite-space: normal;\n\n\t\t\t// in case there are no spaces like long email addresses\n\t\t\toverflow: hidden;\n\t\t\ttext-overflow: ellipsis;\n\t\t}\n\n\t\t// TODO: do we really supports it?\n\t\t> select {\n\t\t\tmargin: 0;\n\t\t\tmargin-left: 6px;\n\t\t}\n\n\t\t/* Add padding if contains icon+text */\n\t\t&:not(:empty) {\n\t\t\tpadding-right: $icon-margin !important;\n\t\t}\n\n\t\t/* DEPRECATED! old img in popover fallback\n\t\t\t* TODO: to remove */\n\t\t> img {\n\t\t\twidth: $icon-size;\n\t\t\tpadding: $icon-margin;\n\t\t}\n\n\t\t/* checkbox/radio fixes */\n\t\t> input.radio + label,\n\t\t> input.checkbox + label {\n\t\t\tpadding: 0 !important;\n\t\t\twidth: 100%;\n\t\t}\n\t\t> input.checkbox + label::before {\n\t\t\tmargin: -2px 13px 0;\n\t\t}\n\t\t> input.radio + label::before {\n\t\t\tmargin: -2px 12px 0;\n\t\t}\n\t\t> input:not([type=radio]):not([type=checkbox]):not([type=image]) {\n\t\t\twidth: 150px;\n\t\t}\n\n\t\t// Forms & text inputs\n\t\tform {\n\t\t\tdisplay: flex;\n\t\t\tflex: 1 1 auto;\n\t\t\t/* put a small space between text and form\n\t\t\t\tif there is an element before */\n\t\t\t&:not(:first-child)  {\n\t\t\t\tmargin-left: 5px;\n\t\t\t}\n\t\t}\n\t\t/* no margin if hidden span before */\n\t\t> span.hidden + form,\n\t\t> span[style*='display:none'] + form {\n\t\t\tmargin-left: 0;\n\t\t}\n\t\t/* Inputs inside popover supports text, submit & reset */\n\t\tinput {\n\t\t\tmin-width: $clickable-area;\n\t\t\tmax-height: #{$clickable-area - 4px}; /* twice the element margin-y */\n\t\t\tmargin: 2px 0;\n\t\t\tflex: 1 1 auto;\n\t\t\t// space between inline inputs\n\t\t\t&:not(:first-child) {\n\t\t\t\tmargin-left: 5px;\n\t\t\t}\n\t\t}\n\t}\n\n\t// TODO: do that in js, should be cleaner\n\t/* css hack, only first not hidden */\n\t&:not(.hidden):not([style*='display:none']) {\n\t\t&:first-of-type {\n\t\t\t> button, > a, > .menuitem {\n\t\t\t\t> form, > input {\n\t\t\t\t\tmargin-top: $icon-margin - 2px; // minus the input margin\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t\t&:last-of-type {\n\t\t\t> button, > a, > .menuitem {\n\t\t\t\t> form, > input {\n\t\t\t\t\tmargin-bottom: $icon-margin - 2px; // minus the input margin\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n\t> button {\n\t\tpadding: 0;\n\t\tspan {\n\t\t\topacity: $opacity_full;\n\t\t}\n\t}\n}\n", "/**\n * @copyright Copyright (c) 2019 John Molakvoæ <skjnldsv@protonmail.com>\n *\n * @author John Molakvoæ <skjnldsv@protonmail.com>\n *\n * @license GNU AGPL version 3 or any later version\n *\n * This program is free software: you can redistribute it and/or modify\n * it under the terms of the GNU Affero General Public License as\n * published by the Free Software Foundation, either version 3 of the\n * License, or (at your option) any later version.\n *\n * This program is distributed in the hope that it will be useful,\n * but WITHOUT ANY WARRANTY; without even the implied warranty of\n * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the\n * GNU Affero General Public License for more details.\n *\n * You should have received a copy of the GNU Affero General Public License\n * along with this program. If not, see <http://www.gnu.org/licenses/>.\n *\n */\n\n// https://uxplanet.org/7-rules-for-mobile-ui-button-design-e9cf2ea54556\n// recommended is 48px\n// 44px is what we choose and have very good visual-to-usability ratio\n$clickable-area: 44px;\n\n// background icon size\n// also used for the scss icon font\n$icon-size: 16px;\n\n// icon padding for a $clickable-area width and a $icon-size icon\n// ( 44px - 16px ) / 2\n$icon-margin: ($clickable-area - $icon-size) / 2;\n\n// transparency background for icons\n$icon-focus-bg: rgba(127, 127, 127, .25);\n\n// popovermenu arrow width from the triangle center\n$arrow-width: 9px;\n\n// opacities\n$opacity_disabled: .5;\n$opacity_normal: .7;\n$opacity_full: 1;\n\n// menu round background hover feedback\n// good looking on dark AND white bg\n$action-background-hover: rgba(127, 127, 127, .25);\n\n// various structure data used in the \n// `AppNavigation` component\n$header-height: 50px;\n$navigation-width: 300px;\n\n// mobile breakpoint\n$breakpoint-mobile: 1024px;\n"],
      sourceRoot: ""
    }]), A.a = a;
  }, function (t, A, n) {
    "use strict";

    var e = n(0),
        i = n.n(e),
        o = n(1),
        a = n.n(o)()(i.a);
    a.push([t.i, "ul[data-v-4dae360a]{display:flex;flex-direction:column}\n", "", {
      version: 3,
      sources: ["webpack://./PopoverMenu.vue"],
      names: [],
      mappings: "AA0DA,oBACC,YAAa,CACb,qBAAsB",
      sourcesContent: ["$scope_version:\"6b494fc\"; @import 'variables';\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nul {\n\tdisplay: flex;\n\tflex-direction: column;\n}\n"],
      sourceRoot: ""
    }]), A.a = a;
  }, function (t, A) {}, function (t, A) {
    t.exports = __webpack_require__(/*! core-js/modules/es.array.join.js */ "./node_modules/core-js/modules/es.array.join.js");
  }, function (t, A) {
    t.exports = __webpack_require__(/*! regenerator-runtime/runtime.js */ "./node_modules/regenerator-runtime/runtime.js");
  }, function (t, A) {
    t.exports = __webpack_require__(/*! core-js/modules/es.promise.js */ "./node_modules/core-js/modules/es.promise.js");
  }, function (t, A, n) {
    "use strict";

    n.r(A), n.d(A, "USERID_REGEX", function () {
      return v;
    }), n.d(A, "USERID_REGEX_WITH_SPACE", function () {
      return B;
    });
    n(90), n(15), n(25), n(91), n(23), n(79), n(24), n(57), n(63);
    var e = n(62),
        i = n.n(e),
        o = n(48),
        a = n.n(o),
        r = n(43),
        s = n.n(r),
        c = n(5),
        l = n.n(c),
        d = n(13),
        u = {
      name: "MentionBubble",
      props: {
        id: {
          type: String,
          required: !0
        },
        label: {
          type: String,
          required: !0
        },
        icon: {
          type: String,
          required: !0
        },
        source: {
          type: String,
          required: !0
        },
        primary: {
          type: Boolean,
          default: !1
        }
      },
      computed: {
        avatarUrl: function avatarUrl() {
          return this.id && "users" === this.source ? this.getAvatarUrl(this.id, 44) : null;
        },
        mentionText: function mentionText() {
          return -1 === this.id.indexOf(" ") ? "@".concat(this.id) : '@"'.concat(this.id, '"');
        }
      },
      methods: {
        getAvatarUrl: function getAvatarUrl(t, A) {
          return Object(d.generateUrl)("/avatar/{user}/{size}", {
            user: t,
            size: A
          });
        }
      }
    },
        g = n(2),
        p = n.n(g),
        f = n(44),
        b = {
      insert: "head",
      singleton: !1
    },
        m = (p()(f.a, b), f.a.locals, n(3)),
        C = Object(m.a)(u, function () {
      var t = this,
          A = t.$createElement,
          n = t._self._c || A;
      return n("span", {
        staticClass: "mention-bubble",
        class: {
          "mention-bubble--primary": t.primary
        },
        attrs: {
          contenteditable: "false"
        }
      }, [n("span", {
        staticClass: "mention-bubble__wrapper"
      }, [n("span", {
        staticClass: "mention-bubble__content"
      }, [n("span", {
        staticClass: "mention-bubble__icon",
        class: [t.icon, "mention-bubble__icon--" + (t.avatarUrl ? "with-avatar" : "")],
        style: t.avatarUrl ? {
          backgroundImage: "url(" + t.avatarUrl + ")"
        } : null
      }), t._v(" "), n("span", {
        staticClass: "mention-bubble__title",
        attrs: {
          role: "heading",
          title: t.label
        }
      })]), t._v(" "), n("span", {
        staticClass: "mention-bubble__select",
        attrs: {
          role: "none"
        }
      }, [t._v(t._s(t.mentionText))])])]);
    }, [], !1, null, "724f9d58", null).exports,
        v = new RegExp("".concat("(?:^|\\s)", "(@[a-zA-Z0-9_.@\\-']+)(").concat("(?:[^a-z]|$)", ")"), "gi"),
        B = new RegExp("".concat("(?:^|\\s)", '(@"[a-zA-Z0-9 _.@\\-\']+")(').concat("(?:[^a-z]|$)", ")"), "gi");
    A.default = {
      props: {
        userData: {
          type: Object,
          default: function _default() {
            return {};
          }
        }
      },
      methods: {
        renderContent: function renderContent(t) {
          var A = this;
          return i()(t).split(v).map(function (t) {
            return t.split(B);
          }).flat().map(function (t) {
            if (!t.startsWith("@")) return a()(t, {
              defaultProtocol: "https",
              target: "_blank",
              className: "external",
              attributes: {
                rel: "noopener noreferrer"
              }
            });
            var n = t.replace(/[@"]/gi, "");
            return " " + A.genSelectTemplate(n);
          }).join("").replace(/\n/gim, "<br>").replace(/&amp;/gim, "&");
        },
        parseContent: function parseContent(t) {
          var A = t.replace(/<br>/gim, "\n");
          return A = (A = (A = A.replace(/&nbsp;/gim, " ")).replace(/&amp;/gim, "&")).replace(/<\/div>/gim, "\n"), A = s()(A, "<div>"), A = s()(A);
        },
        genSelectTemplate: function genSelectTemplate(t) {
          var A = this.userData[t];
          return A ? this.renderComponentHtml(A, C).replace(/[\n\t]/gim, "") : -1 === t.indexOf(" ") ? "@".concat(t) : '@"'.concat(t, '"');
        },
        renderComponentHtml: function renderComponentHtml(t, A) {
          var n = new (l.a.extend(A))({
            propsData: t
          }),
              e = document.createElement("div"),
              i = document.createElement("div");
          e.style.display = "none", e.appendChild(i), document.body.appendChild(e), n.$mount(i);
          var o = e.innerHTML;
          return n.$destroy(), e.remove(), o;
        }
      }
    };
  },, function (t, A) {
    t.exports = __webpack_require__(/*! escape-html */ "./node_modules/escape-html/index.js");
  }, function (t, A) {
    t.exports = __webpack_require__(/*! core-js/modules/es.string.starts-with.js */ "./node_modules/core-js/modules/es.string.starts-with.js");
  }, function (t, A, n) {
    "use strict";

    n(27);
    /**
     * @copyright Copyright (c) 2019 John Molakvoæ <skjnldsv@protonmail.com>
     *
     * @author John Molakvoæ <skjnldsv@protonmail.com>
     *
     * @license GNU AGPL version 3 or any later version
     *
     * This program is free software: you can redistribute it and/or modify
     * it under the terms of the GNU Affero General Public License as
     * published by the Free Software Foundation, either version 3 of the
     * License, or (at your option) any later version.
     *
     * This program is distributed in the hope that it will be useful,
     * but WITHOUT ANY WARRANTY without even the implied warranty of
     * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
     * GNU Affero General Public License for more details.
     *
     * You should have received a copy of the GNU Affero General Public License
     * along with this program. If not, see <http://www.gnu.org/licenses/>.
     *
     */

    function e(t, A, n) {
      this.r = t, this.g = A, this.b = n;
    }

    function i(t, A, n) {
      var i = [];
      i.push(A);

      for (var o = function (t, A) {
        var n = new Array(3);
        return n[0] = (A[1].r - A[0].r) / t, n[1] = (A[1].g - A[0].g) / t, n[2] = (A[1].b - A[0].b) / t, n;
      }(t, [A, n]), a = 1; a < t; a++) {
        var r = parseInt(A.r + o[0] * a, 10),
            s = parseInt(A.g + o[1] * a, 10),
            c = parseInt(A.b + o[2] * a, 10);
        i.push(new e(r, s, c));
      }

      return i;
    }

    A.a = function (t) {
      t || (t = 6);
      var A = new e(182, 70, 157),
          n = new e(221, 203, 85),
          o = new e(0, 130, 201),
          a = i(t, A, n),
          r = i(t, n, o),
          s = i(t, o, A);
      return a.concat(r).concat(s);
    };
  }, function (t, A, n) {
    "use strict";

    var e = n(0),
        i = n.n(e),
        o = n(1),
        a = n.n(o),
        r = n(4),
        s = n.n(r),
        c = n(8),
        l = n(9),
        d = n(10),
        u = n(11),
        g = a()(i.a),
        p = s()(c.a),
        f = s()(l.a),
        b = s()(d.a),
        m = s()(u.a);
    g.push([t.i, '@font-face{font-family:"iconfont-vue-6b494fc";src:url(' + p + ");src:url(" + p + ') format("embedded-opentype"),url(' + f + ') format("woff"),url(' + b + ') format("truetype"),url(' + m + ') format("svg")}.icon[data-v-1bfc7bfe]{font-style:normal;font-weight:400}.icon.arrow-left-double[data-v-1bfc7bfe]:before{font-family:"iconfont-vue-6b494fc";content:""}.icon.arrow-left[data-v-1bfc7bfe]:before{font-family:"iconfont-vue-6b494fc";content:""}.icon.arrow-right-double[data-v-1bfc7bfe]:before{font-family:"iconfont-vue-6b494fc";content:""}.icon.arrow-right[data-v-1bfc7bfe]:before{font-family:"iconfont-vue-6b494fc";content:""}.icon.breadcrumb[data-v-1bfc7bfe]:before{font-family:"iconfont-vue-6b494fc";content:""}.icon.checkmark[data-v-1bfc7bfe]:before{font-family:"iconfont-vue-6b494fc";content:""}.icon.close[data-v-1bfc7bfe]:before{font-family:"iconfont-vue-6b494fc";content:""}.icon.confirm[data-v-1bfc7bfe]:before{font-family:"iconfont-vue-6b494fc";content:""}.icon.info[data-v-1bfc7bfe]:before{font-family:"iconfont-vue-6b494fc";content:""}.icon.menu[data-v-1bfc7bfe]:before{font-family:"iconfont-vue-6b494fc";content:""}.icon.more[data-v-1bfc7bfe]:before{font-family:"iconfont-vue-6b494fc";content:""}.icon.pause[data-v-1bfc7bfe]:before{font-family:"iconfont-vue-6b494fc";content:""}.icon.play[data-v-1bfc7bfe]:before{font-family:"iconfont-vue-6b494fc";content:""}.icon.triangle-s[data-v-1bfc7bfe]:before{font-family:"iconfont-vue-6b494fc";content:""}.icon.user-status-away[data-v-1bfc7bfe]:before{font-family:"iconfont-vue-6b494fc";content:""}.icon.user-status-dnd[data-v-1bfc7bfe]:before{font-family:"iconfont-vue-6b494fc";content:""}.icon.user-status-invisible[data-v-1bfc7bfe]:before{font-family:"iconfont-vue-6b494fc";content:""}.icon.user-status-online[data-v-1bfc7bfe]:before{font-family:"iconfont-vue-6b494fc";content:""}.avatardiv[data-v-1bfc7bfe]{position:relative;display:inline-block}.avatardiv--unknown[data-v-1bfc7bfe]{position:relative;background-color:var(--color-text-maxcontrast)}.avatardiv[data-v-1bfc7bfe]:not(.avatardiv--unknown){background-color:#fff !important;box-shadow:0 0 5px rgba(0,0,0,0.05) inset}body.theme--dark .avatardiv[data-v-1bfc7bfe]:not(.avatardiv--unknown){background-color:#000 !important}.avatardiv--with-menu[data-v-1bfc7bfe]{cursor:pointer}.avatardiv--with-menu[data-v-1bfc7bfe]  .trigger{position:absolute;top:0;left:0}.avatardiv--with-menu .icon-more[data-v-1bfc7bfe]{display:flex;cursor:pointer;opacity:0;background:none;font-size:18px;align-items:center;justify-content:center}.avatardiv--with-menu .icon-more[data-v-1bfc7bfe]:before{font-family:"iconfont-vue-6b494fc";font-style:normal;font-weight:400;content:""}.avatardiv--with-menu .icon-more[data-v-1bfc7bfe]::before{display:block}.avatardiv--with-menu:focus .icon-more[data-v-1bfc7bfe],.avatardiv--with-menu:hover .icon-more[data-v-1bfc7bfe]{opacity:1}.avatardiv--with-menu:focus img[data-v-1bfc7bfe],.avatardiv--with-menu:hover img[data-v-1bfc7bfe]{opacity:0.3}.avatardiv--with-menu .icon-more[data-v-1bfc7bfe],.avatardiv--with-menu img[data-v-1bfc7bfe]{transition:opacity var(--animation-quick)}.avatardiv>.unknown[data-v-1bfc7bfe]{position:absolute;top:0;left:0;display:block;width:100%;text-align:center;font-weight:normal;color:var(--color-main-background)}.avatardiv img[data-v-1bfc7bfe]{width:100%;height:100%;object-fit:cover}.avatardiv .avatardiv__status[data-v-1bfc7bfe]{position:absolute;top:22px;left:22px;width:10px;height:10px;border:1px solid rgba(255,255,255,0.5);background-clip:content-box}.avatardiv .avatardiv__status--positive[data-v-1bfc7bfe]{border-radius:50%;background-color:var(--color-success)}.avatardiv .avatardiv__status--negative[data-v-1bfc7bfe]{background-color:var(--color-error)}.avatardiv .avatardiv__status--neutral[data-v-1bfc7bfe]{border:none;background-color:transparent !important}.avatardiv .avatardiv__status--neutral svg[data-v-1bfc7bfe]{position:absolute;top:-3px;left:-2px}.avatardiv .avatardiv__status--neutral svg path[data-v-1bfc7bfe]{fill:#aaa}.avatardiv .avatardiv__user-status[data-v-1bfc7bfe]{position:absolute;right:-4px;bottom:-4px;height:18px;width:18px;line-height:15px;font-size:var(--default-font-size);border:2px solid var(--color-main-background);background-color:var(--color-main-background);border-radius:50%}.acli:hover .avatardiv .avatardiv__user-status[data-v-1bfc7bfe]{border-color:var(--color-background-hover);background-color:var(--color-background-hover)}.acli.active .avatardiv .avatardiv__user-status[data-v-1bfc7bfe]{border-color:var(--color-primary-light);background-color:var(--color-primary-light)}.avatardiv .avatardiv__user-status--online[data-v-1bfc7bfe]{color:#49b382}.avatardiv .avatardiv__user-status--online[data-v-1bfc7bfe]:before{font-family:"iconfont-vue-6b494fc";font-style:normal;font-weight:400;content:""}.avatardiv .avatardiv__user-status--dnd[data-v-1bfc7bfe]{background-color:#ffffff;color:#ed484c}.avatardiv .avatardiv__user-status--dnd[data-v-1bfc7bfe]:before{font-family:"iconfont-vue-6b494fc";font-style:normal;font-weight:400;content:""}.avatardiv .avatardiv__user-status--away[data-v-1bfc7bfe]{color:#f4a331}.avatardiv .avatardiv__user-status--away[data-v-1bfc7bfe]:before{font-family:"iconfont-vue-6b494fc";font-style:normal;font-weight:400;content:""}.avatardiv .avatardiv__user-status--icon[data-v-1bfc7bfe]{border:none;background-color:transparent}.avatardiv .popovermenu-wrapper[data-v-1bfc7bfe]{position:relative;display:inline-block}.avatar-class-icon[data-v-1bfc7bfe]{border-radius:50%;background-color:var(--color-background-darker);height:100%}\n', "", {
      version: 3,
      sources: ["webpack://./../../fonts/scss/iconfont-vue.scss", "webpack://./Avatar.vue"],
      names: [],
      mappings: "AA2FE,WACC,kCAAmC,CACnC,2CAAuC,CACvC,+OAGmD,CAMpD,uBACE,iBAAkB,CAClB,eAAgB,CAFlB,gDAMM,kCAAmC,CACnC,WA5Ge,CAAO,yCA0GL,kCACJ,CAAsB,WA1G3B,CAAA,iDAyGU,kCACL,CAAA,WAzGG,CAAA,0CAwGL,kCACE,CAAA,WAxGJ,CAAA,yCAuGC,kCACG,CAAA,WACN,CAxGC,wCAsGC,kCACI,CAAA,WACb,CAAO,oCAFF,kCACQ,CAAA,WACb,CAAA,sCAFO,kCACM,CAAA,WACb,CAAA,mCAFI,kCACS,CAAA,WACb,CAAA,mCAPD,kCAMc,CAAA,WACb,CAAA,mCAPD,kCAMc,CAAA,WACb,CAAA,oCAPD,kCAMc,CAAA,WACb,CAAA,mCAPD,kCAMc,CAAA,WAAsB,CACnC,yCAPD,kCAMc,CAAA,WAAA,CAAsB,+CANpC,kCAMc,CAAA,WAAA,CAAA,8CANd,kCAMc,CAAA,WAAA,CAAA,oDANd,kCAMc,CAAA,WAAA,CAAA,iDANd,kCAMc,CAAA,WAAA,CAAA,4BACb,iBC0eE,CACT,oBACA,CAAA,qCAEA,iBAAU,CACT,8CACkB,CAAA,qDAGZ,gCAEN,CAAA,yCAKoB,CAAA,sEAPd,gCAKL,CAAA,uCACA,cAAA,CAAA,iDAMD,iBAAiB,CAChB,KAAA,CAAA,MAAU,CAAA,kDAHX,YAOA,CAAA,cACU,CAAA,SACH,CAAE,eACD,CAAE,cACG,CAAA,kBAEZ,CAAA,sBACA,CAAA,yDAPD,kCDjnBD,CAAA,iBAAsB,CAkFnB,eAAY,CAAA,WACZ,CAAA,0DC8hBF,aAAU,CAAA,gHAPV,SAuBC,CAAA,kGAvBD,WAAW,CAAA,6FAAX,yCAgCqB,CAAA,qCAnDvB,iBAuDG,CAAQ,KACT,CAAA,MAAU,CAAA,aAEV,CAAA,UACA,CAAA,iBACO,CAAI,kBACO,CAClB,kCACO,CAAA,gCAAA,UA/DT,CAAA,WAoEE,CAAA,gBACQ,CAAA,+CAKT,iBAAA,CAAkB,QACjB,CAAQ,SAAU,CAClB,UACA,CAAA,WACA,CAAA,sCAEkB,CAAA,2BAClB,CAAA,yDACC,iBAAA,CAAU,qCAEQ,CAAA,yDAElB,mCACgB,CAAE,wDAElB,WAAA,CAAA,uCAEkB,CAAA,4DAFlB,iBAGA,CAAG,QACF,CAAQ,SAAU,CAClB,iEALD,SAAS,CAGT,oDAWF,iBAAA,CAAuB,UACZ,CAAA,WACV,CAAA,WACA,CAAA,UACA,CAAA,gBACO,CAAA,kCAEI,CAAA,6CACO,CAAA,6CACA,CAAA,iBAAA,CAA4B,gEAT/C,0CAagB,CAAA,8CACI,CAAA,iEAdpB,uCAiBgB,CAAA,2CACI,CAAA,4DAGlB,aAAA,CAAA,mEAAA,kCDntBF,CAAA,iBAAA,CAAsB,eAkFP,CAAA,WACZ,CAAA,yDCooBD,wBAEA,CAAA,aAAkB,CAAA,gEAFlB,kCDvtBF,CAAA,iBAAA,CAAA,eAkFe,CAAA,WACZ,CAAA,0DCyoBD,aAAA,CAAA,iEAAA,kCD5tBF,CAAA,iBAAA,CAAA,eAkFe,CAAA,WACZ,CAAA,0DC6oBD,WAAA,CAAA,4BAEA,CAAA,iDA3IO,iBA+IT,CAAA,oBACW,CAAQ,oCACT,iBACT,CAAA,+CAKiB,CAAA,WAAA",
      sourcesContent: ['$__iconfont__data: map-merge(if(global_variable_exists(\'__iconfont__data\'), $__iconfont__data, ()), (\n\t"iconfont-vue-6b494fc": (\n\t\t"arrow-left-double": "\\ea01",\n\t\t"arrow-left": "\\ea02",\n\t\t"arrow-right-double": "\\ea03",\n\t\t"arrow-right": "\\ea04",\n\t\t"breadcrumb": "\\ea05",\n\t\t"checkmark": "\\ea06",\n\t\t"close": "\\ea07",\n\t\t"confirm": "\\ea08",\n\t\t"info": "\\ea09",\n\t\t"menu": "\\ea0a",\n\t\t"more": "\\ea0b",\n\t\t"pause": "\\ea0c",\n\t\t"play": "\\ea0d",\n\t\t"triangle-s": "\\ea0e",\n\t\t"user-status-away": "\\ea0f",\n\t\t"user-status-dnd": "\\ea10",\n\t\t"user-status-invisible": "\\ea11",\n\t\t"user-status-online": "\\ea12"\n\t)\n));\n\n\n$create-font-face: true !default; // should the @font-face tag get created?\n\n// should there be a custom class for each icon? will be .filename\n$create-icon-classes: true !default; \n\n// what is the common class name that icons share? in this case icons need to have .icon.filename in their classes\n// this requires you to have 2 classes on each icon html element, but reduced redeclaration of the font family\n// for each icon\n$icon-common-class: \'icon\' !default;\n\n// if you whish to prefix your filenames, here you can do so.\n// if this string stays empty, your classes will use the filename, for example\n// an icon called star.svg will result in a class called .star\n// if you use the prefix to be \'icon-\' it would result in .icon-star\n$icon-prefix: \'\' !default; \n\n// helper function to get the correct font group\n@function iconfont-group($group: null) {\n  @if (null == $group) {\n    $group: nth(map-keys($__iconfont__data), 1);\n  }\n  @if (false == map-has-key($__iconfont__data, $group)) {\n    @warn \'Undefined Iconfont Family!\';\n    @return ();\n  }\n  @return map-get($__iconfont__data, $group);\n}\n\n// helper function to get the correct icon of a group\n@function iconfont-item($name) {\n  $slash: str-index($name, \'/\');\n  $group: null;\n  @if ($slash) {\n    $group: str-slice($name, 0, $slash - 1);\n    $name: str-slice($name, $slash + 1);\n  } @else {\n    $group: nth(map-keys($__iconfont__data), 1);\n  }\n  $group: iconfont-group($group);\n  @if (false == map-has-key($group, $name)) {\n    @warn \'Undefined Iconfont Glyph!\';\n    @return \'\';\n  }\n  @return map-get($group, $name);\n}\n\n// complete mixing to include the icon\n// usage:\n// .my_icon{ @include iconfont(\'star\') }\n@mixin iconfont($icon) {\n  $slash: str-index($icon, \'/\');\n  $group: null;\n  @if ($slash) {\n    $group: str-slice($icon, 0, $slash - 1);\n  } @else {\n    $group: nth(map-keys($__iconfont__data), 1);\n  }\n  &:before {\n    font-family: $group;\n    font-style: normal;\n    font-weight: 400;\n    content: iconfont-item($icon);\n  }\n}\n\n// creates the font face tag if the variable is set to true (default)\n@if $create-font-face == true {\n  @font-face {\n   font-family: "iconfont-vue-6b494fc";\n   src: url(\'../iconfont-vue-6b494fc.eot\'); /* IE9 Compat Modes */\n   src: url(\'../iconfont-vue-6b494fc.eot?#iefix\') format(\'embedded-opentype\'), /* IE6-IE8 */\n      url(\'../iconfont-vue-6b494fc.woff\') format(\'woff\'), /* Pretty Modern Browsers */\n      url(\'../iconfont-vue-6b494fc.ttf\')  format(\'truetype\'), /* Safari, Android, iOS */\n      url(\'../iconfont-vue-6b494fc.svg\') format(\'svg\'); /* Legacy iOS */\n  }\n}\n\n// creates icon classes for each individual loaded svg (default)\n@if $create-icon-classes == true {\n  .#{$icon-common-class} {\n    font-style: normal;\n    font-weight: 400;\n\n    @each $icon, $content in map-get($__iconfont__data, "iconfont-vue-6b494fc") {\n      &.#{$icon-prefix}#{$icon}:before {\n        font-family: "iconfont-vue-6b494fc";\n        content: iconfont-item("iconfont-vue-6b494fc/#{$icon}");\n      }\n    }\n  }\n}\n', "$scope_version:\"6b494fc\"; @import 'variables';\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n@import '../../fonts/scss/iconfont-vue';\n\n.avatardiv {\n\tposition: relative;\n\tdisplay: inline-block;\n\n\t&--unknown {\n\t\tposition: relative;\n\t\tbackground-color: var(--color-text-maxcontrast);\n\t}\n\n\t&:not(&--unknown) {\n\t\t// White background for avatars with transparency\n\t\tbackground-color: #fff !important;\n\t\tbody.theme--dark & {\n\t\t\t// And black background in dark mode, as it shines through on hover of the menu\n\t\t\tbackground-color: #000 !important;\n\t\t}\n\t\tbox-shadow: 0 0 5px rgba(0, 0, 0, 0.05) inset;\n\t}\n\n\t&--with-menu {\n\t\tcursor: pointer;\n\t\t::v-deep .trigger {\n\t\t\tposition: absolute;\n\t\t\ttop: 0;\n\t\t\tleft: 0;\n\t\t}\n\t\t.icon-more {\n\t\t\tdisplay: flex;\n\t\t\tcursor: pointer;\n\t\t\topacity: 0;\n\t\t\tbackground: none;\n\t\t\tfont-size: 18px;\n\t\t\talign-items: center;\n\t\t\tjustify-content: center;\n\n\t\t\t@include iconfont('more');\n\t\t\t&::before {\n\t\t\t\tdisplay: block;\n\t\t\t}\n\t\t}\n\t\t&:focus,\n\t\t&:hover {\n\t\t\t.icon-more {\n\t\t\t\topacity: 1;\n\t\t\t}\n\t\t\timg {\n\t\t\t\topacity: 0.3;\n\t\t\t}\n\t\t}\n\t\t.icon-more,\n\t\timg {\n\t\t\ttransition: opacity var(--animation-quick);\n\t\t}\n\t}\n\n\t> .unknown {\n\t\tposition: absolute;\n\t\ttop: 0;\n\t\tleft: 0;\n\t\tdisplay: block;\n\t\twidth: 100%;\n\t\ttext-align: center;\n\t\tfont-weight: normal;\n\t\tcolor: var(--color-main-background);\n\t}\n\n\timg {\n\t\t// Cover entire area\n\t\twidth: 100%;\n\t\theight: 100%;\n\t\t// Keep ratio\n\t\tobject-fit: cover;\n\t}\n\n\t.avatardiv__status {\n\t\tposition: absolute;\n\t\ttop: 22px;\n\t\tleft: 22px;\n\t\twidth: 10px;\n\t\theight: 10px;\n\t\tborder: 1px solid rgba(255, 255, 255, .5);\n\t\tbackground-clip: content-box;\n\t\t&--positive {\n\t\t\tborder-radius: 50%;\n\t\t\tbackground-color: var(--color-success);\n\t\t}\n\t\t&--negative {\n\t\t\tbackground-color: var(--color-error);\n\t\t}\n\t\t&--neutral {\n\t\t\tborder: none;\n\t\t\tbackground-color: transparent !important;\n\t\t\tsvg {\n\t\t\t\tposition: absolute;\n\t\t\t\ttop: -3px;\n\t\t\t\tleft: -2px;\n\t\t\t\tpath {\n\t\t\t\t\tfill: #aaa;\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n\n\t.avatardiv__user-status {\n\t\tposition: absolute;\n\t\tright: -4px;\n\t\tbottom: -4px;\n\t\theight: 18px;\n\t\twidth: 18px;\n\t\tline-height: 15px;\n\t\tfont-size: var(--default-font-size);\n\t\tborder: 2px solid var(--color-main-background);\n\t\tbackground-color: var(--color-main-background);\n\t\tborder-radius: 50%;\n\n\t\t.acli:hover & {\n\t\t\tborder-color: var(--color-background-hover);\n\t\t\tbackground-color: var(--color-background-hover);\n\t\t}\n\t\t.acli.active & {\n\t\t\tborder-color: var(--color-primary-light);\n\t\t\tbackground-color: var(--color-primary-light);\n\t\t}\n\n\t\t&--online{\n\t\t\t@include iconfont('user-status-online');\n\t\t\tcolor: #49b382;\n\t\t}\n\t\t&--dnd{\n\t\t\t@include iconfont('user-status-dnd');\n\t\t\tbackground-color: #ffffff;\n\t\t\tcolor: #ed484c;\n\t\t}\n\t\t&--away{\n\t\t\t@include iconfont('user-status-away');\n\t\t\tcolor: #f4a331;\n\t\t}\n\t\t&--icon {\n\t\t\tborder: none;\n\t\t\tbackground-color: transparent;\n\t\t}\n\t}\n\n\t.popovermenu-wrapper {\n\t\tposition: relative;\n\t\tdisplay: inline-block;\n\t}\n}\n\n.avatar-class-icon {\n\tborder-radius: 50%;\n\tbackground-color: var(--color-background-darker);\n\theight: 100%;\n}\n\n"],
      sourceRoot: ""
    }]), A.a = g;
  }, function (t, A) {},,,,,,,,, function (t, A, n) {
    "use strict";

    n.r(A);
    n(41), n(6), n(14), n(52), n(16), n(32), n(38), n(46), n(17), n(18);

    function e(t, A) {
      var _n;

      if ("undefined" == typeof Symbol || null == t[Symbol.iterator]) {
        if (Array.isArray(t) || (_n = function (t, A) {
          if (!t) return;
          if ("string" == typeof t) return i(t, A);
          var n = Object.prototype.toString.call(t).slice(8, -1);
          "Object" === n && t.constructor && (n = t.constructor.name);
          if ("Map" === n || "Set" === n) return Array.from(t);
          if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return i(t, A);
        }(t)) || A && t && "number" == typeof t.length) {
          _n && (t = _n);

          var e = 0,
              o = function o() {};

          return {
            s: o,
            n: function n() {
              return e >= t.length ? {
                done: !0
              } : {
                done: !1,
                value: t[e++]
              };
            },
            e: function e(t) {
              throw t;
            },
            f: o
          };
        }

        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }

      var a,
          r = !0,
          s = !1;
      return {
        s: function s() {
          _n = t[Symbol.iterator]();
        },
        n: function n() {
          var t = _n.next();

          return r = t.done, t;
        },
        e: function e(t) {
          s = !0, a = t;
        },
        f: function f() {
          try {
            r || null == _n.return || _n.return();
          } finally {
            if (s) throw a;
          }
        }
      };
    }

    function i(t, A) {
      (null == A || A > t.length) && (A = t.length);

      for (var n = 0, e = new Array(A); n < A; n++) {
        e[n] = t[n];
      }

      return e;
    }
    /**
     * @copyright Copyright (c) 2020 Georg Ehrke <georg-nextcloud@ehrke.email>
     *
     * @author Georg Ehrke <georg-nextcloud@ehrke.email>
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
     * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
     * GNU Affero General Public License for more details.
     *
     * You should have received a copy of the GNU Affero General Public License
     * along with this program. If not, see <http://www.gnu.org/licenses/>.
     *
     */


    A.default = {
      props: {
        excludeClickOutsideClasses: {
          type: String | Array,
          default: function _default() {
            return [];
          }
        }
      },
      methods: {
        clickOutsideMiddleware: function clickOutsideMiddleware(t) {
          var A = Array.isArray(this.excludeClickOutsideClasses) ? this.excludeClickOutsideClasses : [this.excludeClickOutsideClasses];
          return 0 === A.length || !this.hasNodeOrAnyParentClass(t.target, A);
        },
        hasNodeOrAnyParentClass: function hasNodeOrAnyParentClass(t, A) {
          var n,
              i = e(A);

          try {
            for (i.s(); !(n = i.n()).done;) {
              var o,
                  a = n.value;
              if (null != t && null !== (o = t.classList) && void 0 !== o && o.contains(a)) return !0;
            }
          } catch (t) {
            i.e(t);
          } finally {
            i.f();
          }

          return !!t.parentElement && this.hasNodeOrAnyParentClass(t.parentElement, A);
        }
      }
    };
  }, function (t, A, n) {
    "use strict";

    n.r(A),
    /**
     * @copyright Copyright (c) 2019 John Molakvoæ <skjnldsv@protonmail.com>
     *
     * @author John Molakvoæ <skjnldsv@protonmail.com>
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
    A.default = {
      data: function data() {
        return {
          isFullscreen: this._isFullscreen()
        };
      },
      beforeMount: function beforeMount() {
        window.addEventListener("resize", this._onResize);
      },
      beforeDestroy: function beforeDestroy() {
        window.removeEventListener("resize", this._onResize);
      },
      methods: {
        _onResize: function _onResize() {
          this.isFullscreen = this._isFullscreen();
        },
        _isFullscreen: function _isFullscreen() {
          return window.outerHeight === screen.height;
        }
      }
    };
  }, function (t, A, n) {
    "use strict";

    n.r(A);
    n(6), n(25), n(40), n(16), n(17), n(18);
    var e = {
      name: "PopoverMenuItem",
      props: {
        item: {
          type: Object,
          required: !0,
          default: function _default() {
            return {
              key: "nextcloud-link",
              href: "https://nextcloud.com",
              icon: "icon-links",
              text: "Nextcloud"
            };
          },
          validator: function validator(t) {
            return !t.input || -1 !== ["text", "checkbox"].indexOf(t.input);
          }
        }
      },
      computed: {
        key: function key() {
          return this.item.key ? this.item.key : Math.round(16 * Math.random() * 1e6).toString(16);
        },
        iconIsUrl: function iconIsUrl() {
          try {
            return new URL(this.item.icon), !0;
          } catch (t) {
            return !1;
          }
        }
      },
      methods: {
        action: function action(t) {
          this.item.action && this.item.action(t);
        }
      }
    },
        i = n(2),
        o = n.n(i),
        a = n(53),
        r = {
      insert: "head",
      singleton: !1
    },
        s = (o()(a.a, r), a.a.locals, n(54)),
        c = {
      insert: "head",
      singleton: !1
    },
        l = (o()(s.a, c), s.a.locals, n(3)),
        d = {
      name: "PopoverMenu",
      components: {
        PopoverMenuItem: Object(l.a)(e, function () {
          var t = this,
              A = t.$createElement,
              n = t._self._c || A;
          return n("li", {
            staticClass: "popover__menuitem"
          }, [t.item.href ? n("a", {
            staticClass: "focusable",
            attrs: {
              href: t.item.href ? t.item.href : "#",
              target: t.item.target ? t.item.target : "",
              download: t.item.download,
              rel: "noreferrer noopener"
            },
            on: {
              click: t.action
            }
          }, [t.iconIsUrl ? n("img", {
            attrs: {
              src: t.item.icon
            }
          }) : n("span", {
            class: t.item.icon
          }), t._v(" "), t.item.text && t.item.longtext ? n("p", [n("strong", {
            staticClass: "menuitem-text"
          }, [t._v("\n\t\t\t\t" + t._s(t.item.text) + "\n\t\t\t")]), n("br"), t._v(" "), n("span", {
            staticClass: "menuitem-text-detail"
          }, [t._v("\n\t\t\t\t" + t._s(t.item.longtext) + "\n\t\t\t")])]) : t.item.text ? n("span", [t._v("\n\t\t\t" + t._s(t.item.text) + "\n\t\t")]) : t.item.longtext ? n("p", [t._v("\n\t\t\t" + t._s(t.item.longtext) + "\n\t\t")]) : t._e()]) : t.item.input ? n("span", {
            staticClass: "menuitem",
            class: {
              active: t.item.active
            }
          }, ["checkbox" !== t.item.input ? n("span", {
            class: t.item.icon
          }) : t._e(), t._v(" "), "text" === t.item.input ? n("form", {
            class: t.item.input,
            on: {
              submit: function submit(A) {
                return A.preventDefault(), t.item.action(A);
              }
            }
          }, [n("input", {
            attrs: {
              type: t.item.input,
              placeholder: t.item.text,
              required: ""
            },
            domProps: {
              value: t.item.value
            }
          }), t._v(" "), n("input", {
            staticClass: "icon-confirm",
            attrs: {
              type: "submit",
              value: ""
            }
          })]) : ["checkbox" === t.item.input ? n("input", {
            directives: [{
              name: "model",
              rawName: "v-model",
              value: t.item.model,
              expression: "item.model"
            }],
            class: t.item.input,
            attrs: {
              id: t.key,
              type: "checkbox"
            },
            domProps: {
              checked: Array.isArray(t.item.model) ? t._i(t.item.model, null) > -1 : t.item.model
            },
            on: {
              change: [function (A) {
                var n = t.item.model,
                    e = A.target,
                    i = !!e.checked;

                if (Array.isArray(n)) {
                  var o = t._i(n, null);

                  e.checked ? o < 0 && t.$set(t.item, "model", n.concat([null])) : o > -1 && t.$set(t.item, "model", n.slice(0, o).concat(n.slice(o + 1)));
                } else t.$set(t.item, "model", i);
              }, t.item.action]
            }
          }) : "radio" === t.item.input ? n("input", {
            directives: [{
              name: "model",
              rawName: "v-model",
              value: t.item.model,
              expression: "item.model"
            }],
            class: t.item.input,
            attrs: {
              id: t.key,
              type: "radio"
            },
            domProps: {
              checked: t._q(t.item.model, null)
            },
            on: {
              change: [function (A) {
                return t.$set(t.item, "model", null);
              }, t.item.action]
            }
          }) : n("input", {
            directives: [{
              name: "model",
              rawName: "v-model",
              value: t.item.model,
              expression: "item.model"
            }],
            class: t.item.input,
            attrs: {
              id: t.key,
              type: t.item.input
            },
            domProps: {
              value: t.item.model
            },
            on: {
              change: t.item.action,
              input: function input(A) {
                A.target.composing || t.$set(t.item, "model", A.target.value);
              }
            }
          }), t._v(" "), n("label", {
            attrs: {
              for: t.key
            },
            on: {
              click: function click(A) {
                return A.stopPropagation(), A.preventDefault(), t.item.action(A);
              }
            }
          }, [t._v("\n\t\t\t\t" + t._s(t.item.text) + "\n\t\t\t")])]], 2) : t.item.action ? n("button", {
            staticClass: "menuitem focusable",
            class: {
              active: t.item.active
            },
            attrs: {
              disabled: t.item.disabled
            },
            on: {
              click: function click(A) {
                return A.stopPropagation(), A.preventDefault(), t.item.action(A);
              }
            }
          }, [n("span", {
            class: t.item.icon
          }), t._v(" "), t.item.text && t.item.longtext ? n("p", [n("strong", {
            staticClass: "menuitem-text"
          }, [t._v("\n\t\t\t\t" + t._s(t.item.text) + "\n\t\t\t")]), n("br"), t._v(" "), n("span", {
            staticClass: "menuitem-text-detail"
          }, [t._v("\n\t\t\t\t" + t._s(t.item.longtext) + "\n\t\t\t")])]) : t.item.text ? n("span", [t._v("\n\t\t\t" + t._s(t.item.text) + "\n\t\t")]) : t.item.longtext ? n("p", [t._v("\n\t\t\t" + t._s(t.item.longtext) + "\n\t\t")]) : t._e()]) : n("span", {
            staticClass: "menuitem",
            class: {
              active: t.item.active
            }
          }, [n("span", {
            class: t.item.icon
          }), t._v(" "), t.item.text && t.item.longtext ? n("p", [n("strong", {
            staticClass: "menuitem-text"
          }, [t._v("\n\t\t\t\t" + t._s(t.item.text) + "\n\t\t\t")]), n("br"), t._v(" "), n("span", {
            staticClass: "menuitem-text-detail"
          }, [t._v("\n\t\t\t\t" + t._s(t.item.longtext) + "\n\t\t\t")])]) : t.item.text ? n("span", [t._v("\n\t\t\t" + t._s(t.item.text) + "\n\t\t")]) : t.item.longtext ? n("p", [t._v("\n\t\t\t" + t._s(t.item.longtext) + "\n\t\t")]) : t._e()])]);
        }, [], !1, null, "febed9b6", null).exports
      },
      props: {
        menu: {
          type: Array,
          default: function _default() {
            return [{
              href: "https://nextcloud.com",
              icon: "icon-links",
              text: "Nextcloud"
            }];
          },
          required: !0
        }
      }
    },
        u = n(55),
        g = {
      insert: "head",
      singleton: !1
    },
        p = (o()(u.a, g), u.a.locals, n(56)),
        f = n.n(p),
        b = Object(l.a)(d, function () {
      var t = this.$createElement,
          A = this._self._c || t;
      return A("ul", {
        staticClass: "popover__menu"
      }, this._l(this.menu, function (t, n) {
        return A("PopoverMenuItem", {
          key: n,
          attrs: {
            item: t
          }
        });
      }), 1);
    }, [], !1, null, "4dae360a", null);
    "function" == typeof f.a && f()(b);
    var m = b.exports;
    /**
     * @copyright Copyright (c) 2018 John Molakvoæ <skjnldsv@protonmail.com>
     *
     * @author John Molakvoæ <skjnldsv@protonmail.com>
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

    A.default = m;
  },, function (t, A) {
    t.exports = __webpack_require__(/*! core-js/modules/es.string.split.js */ "./node_modules/core-js/modules/es.string.split.js");
  }, function (t, A, n) {
    "use strict";

    n.r(A);
    n(58), n(31), n(89), n(103), n(104), n(27), n(23), n(57), n(59), n(6);
    var e = n(86),
        i = n(42),
        o = n(77),
        a = n(35),
        r = n(29),
        s = n(37),
        c = n.n(s),
        l = n(13),
        d = n(21),
        u = n(84),
        g = n(45),
        p = n(28);

    function f(t, A, n, e, i, o, a) {
      try {
        var r = t[o](a),
            s = r.value;
      } catch (t) {
        return void n(t);
      }

      r.done ? A(s) : Promise.resolve(s).then(e, i);
    }

    function b(t) {
      return function () {
        var A = this,
            n = arguments;
        return new Promise(function (e, i) {
          var o = t.apply(A, n);

          function a(t) {
            f(o, e, i, a, r, "next", t);
          }

          function r(t) {
            f(o, e, i, a, r, "throw", t);
          }

          a(void 0);
        });
      };
    }

    var m = Object(e.getBuilder)("nextcloud").persist().build();

    function C(t) {
      var A = m.getItem("user-has-avatar." + t);
      return "string" == typeof A ? Boolean(A) : null;
    }

    function v(t, A) {
      t && m.setItem("user-has-avatar." + t, A);
    }

    var B = {
      name: "Avatar",
      directives: {
        tooltip: d.default,
        ClickOutside: i.directive
      },
      components: {
        Popover: p.a,
        PopoverMenu: o.default
      },
      mixins: [g.e],
      props: {
        url: {
          type: String,
          default: void 0
        },
        iconClass: {
          type: String,
          default: void 0
        },
        user: {
          type: String,
          default: void 0
        },
        showUserStatus: {
          type: Boolean,
          default: !0
        },
        showUserStatusCompact: {
          type: Boolean,
          default: !0
        },
        preloadedUserStatus: {
          type: Object,
          default: void 0
        },
        isGuest: {
          type: Boolean,
          default: !1
        },
        displayName: {
          type: String,
          default: void 0
        },
        size: {
          type: Number,
          default: 32
        },
        allowPlaceholder: {
          type: Boolean,
          default: !0
        },
        disableTooltip: {
          type: Boolean,
          default: !1
        },
        disableMenu: {
          type: Boolean,
          default: !1
        },
        tooltipMessage: {
          type: String,
          default: null
        },
        isNoUser: {
          type: Boolean,
          default: !1
        },
        status: {
          type: String,
          default: null,
          validator: function validator(t) {
            switch (t) {
              case "positive":
              case "negative":
              case "neutral":
                return !0;
            }

            return !1;
          }
        },
        statusColor: {
          type: [Number, String],
          default: null,
          validator: function validator(t) {
            return /^([a-f0-9]{3}){1,2}$/i.test(t);
          }
        },
        menuPosition: {
          type: String,
          default: "center"
        },
        menuContainer: {
          type: String,
          default: "body"
        }
      },
      data: function data() {
        return {
          avatarUrlLoaded: null,
          avatarSrcSetLoaded: null,
          userDoesNotExist: !1,
          isAvatarLoaded: !1,
          isMenuLoaded: !1,
          contactsMenuLoading: !1,
          contactsMenuActions: [],
          contactsMenuOpenState: !1
        };
      },
      computed: {
        canDisplayUserStatus: function canDisplayUserStatus() {
          return this.showUserStatus && this.hasStatus && ["online", "away", "dnd"].includes(this.userStatus.status);
        },
        showUserStatusIconOnAvatar: function showUserStatusIconOnAvatar() {
          return this.showUserStatus && this.showUserStatusCompact && this.hasStatus && "dnd" !== this.userStatus.status && this.userStatus.icon;
        },
        getUserIdentifier: function getUserIdentifier() {
          return this.isDisplayNameDefined ? this.displayName : this.isUserDefined ? this.user : "";
        },
        isUserDefined: function isUserDefined() {
          return void 0 !== this.user;
        },
        isDisplayNameDefined: function isDisplayNameDefined() {
          return void 0 !== this.displayName;
        },
        isUrlDefined: function isUrlDefined() {
          return void 0 !== this.url;
        },
        hasMenu: function hasMenu() {
          var t;
          return !this.disableMenu && (this.isMenuLoaded ? this.menu.length > 0 : !(this.user === (null === (t = Object(a.getCurrentUser)()) || void 0 === t ? void 0 : t.uid) || this.userDoesNotExist || this.url));
        },
        shouldShowPlaceholder: function shouldShowPlaceholder() {
          return this.allowPlaceholder && this.userDoesNotExist;
        },
        avatarStyle: function avatarStyle() {
          var t = {
            width: this.size + "px",
            height: this.size + "px",
            lineHeight: this.size + "px",
            fontSize: Math.round(.55 * this.size) + "px"
          };

          if (!this.iconClass && !this.avatarSrcSetLoaded) {
            var A = Object(u.default)(this.getUserIdentifier);
            t.backgroundColor = "rgb(" + A.r + ", " + A.g + ", " + A.b + ")";
          }

          return t;
        },
        tooltip: function tooltip() {
          return !this.disableTooltip && (this.tooltipMessage ? this.tooltipMessage : this.displayName);
        },
        initials: function initials() {
          var t;

          if (this.shouldShowPlaceholder) {
            var A = this.getUserIdentifier,
                n = A.indexOf(" ");
            "" === A ? t = "?" : (t = String.fromCodePoint(A.codePointAt(0)), -1 !== n && (t = t.concat(String.fromCodePoint(A.codePointAt(n + 1)))));
          }

          return t.toUpperCase();
        },
        menu: function menu() {
          var t,
              A,
              n,
              e = this.contactsMenuActions.map(function (t) {
            return {
              href: t.hyperlink,
              icon: t.icon,
              longtext: t.title
            };
          });
          return this.showUserStatus && (this.userStatus.icon || this.userStatus.message) ? [{
            href: "#",
            icon: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'><text x='0' y='14' font-size='14'>".concat((t = this.userStatus.icon, A = document.createTextNode(t), n = document.createElement("p"), n.appendChild(A), n.innerHTML), "</text></svg>"),
            text: "".concat(this.userStatus.message)
          }].concat(e) : e;
        }
      },
      watch: {
        url: function url() {
          this.userDoesNotExist = !1, this.loadAvatarUrl();
        },
        user: function user() {
          this.userDoesNotExist = !1, this.isMenuLoaded = !1, this.loadAvatarUrl();
        }
      },
      mounted: function mounted() {
        this.loadAvatarUrl(), this.showUserStatus && this.user && !this.isNoUser && (this.preloadedUserStatus ? (this.userStatus.status = this.preloadedUserStatus.status || "", this.userStatus.message = this.preloadedUserStatus.message || "", this.userStatus.icon = this.preloadedUserStatus.icon || "", this.hasStatus = null !== this.preloadedUserStatus.status) : this.fetchUserStatus(this.user), Object(r.subscribe)("user_status:status.updated", this.handleUserStatusUpdated));
      },
      beforeDestroyed: function beforeDestroyed() {
        this.showUserStatus && this.user && !this.isNoUser && Object(r.unsubscribe)("user_status:status.updated", this.handleUserStatusUpdated);
      },
      methods: {
        handleUserStatusUpdated: function handleUserStatusUpdated(t) {
          this.user === t.userId && (this.userStatus = {
            status: t.status,
            icon: t.icon,
            message: t.message
          });
        },
        toggleMenu: function toggleMenu() {
          var t = this;
          return b(regeneratorRuntime.mark(function A() {
            return regeneratorRuntime.wrap(function (A) {
              for (;;) {
                switch (A.prev = A.next) {
                  case 0:
                    if (t.hasMenu) {
                      A.next = 2;
                      break;
                    }

                    return A.abrupt("return");

                  case 2:
                    if (t.contactsMenuOpenState) {
                      A.next = 5;
                      break;
                    }

                    return A.next = 5, t.fetchContactsMenu();

                  case 5:
                    t.contactsMenuOpenState = !t.contactsMenuOpenState;

                  case 6:
                  case "end":
                    return A.stop();
                }
              }
            }, A);
          }))();
        },
        closeMenu: function closeMenu() {
          this.contactsMenuOpenState = !1;
        },
        fetchContactsMenu: function fetchContactsMenu() {
          var t = this;
          return b(regeneratorRuntime.mark(function A() {
            var n, e, i;
            return regeneratorRuntime.wrap(function (A) {
              for (;;) {
                switch (A.prev = A.next) {
                  case 0:
                    return t.contactsMenuLoading = !0, A.prev = 1, n = encodeURIComponent(t.user), A.next = 5, c.a.post(Object(l.generateUrl)("contactsmenu/findOne"), "shareType=0&shareWith=".concat(n));

                  case 5:
                    e = A.sent, i = e.data, t.contactsMenuActions = i.topAction ? [i.topAction].concat(i.actions) : i.actions, A.next = 13;
                    break;

                  case 10:
                    A.prev = 10, A.t0 = A.catch(1), t.contactsMenuOpenState = !1;

                  case 13:
                    t.contactsMenuLoading = !1, t.isMenuLoaded = !0;

                  case 15:
                  case "end":
                    return A.stop();
                }
              }
            }, A, null, [[1, 10]]);
          }))();
        },
        loadAvatarUrl: function loadAvatarUrl() {
          if (this.isAvatarLoaded = !1, !this.isUrlDefined && (!this.isUserDefined || this.isNoUser)) return this.isAvatarLoaded = !0, void (this.userDoesNotExist = !0);
          if (this.isUrlDefined) this.updateImageIfValid(this.url);else {
            var t = this.avatarUrlGenerator(this.user, this.size),
                A = [t + " 1x", this.avatarUrlGenerator(this.user, 2 * this.size) + " 2x", this.avatarUrlGenerator(this.user, 4 * this.size) + " 4x"].join(", ");
            this.updateImageIfValid(t, A);
          }
        },
        avatarUrlGenerator: function avatarUrlGenerator(t, A) {
          var n,
              e = "/avatar/{user}/{size}";
          this.isGuest && (e = "/avatar/guest/{user}/{size}");
          var i = Object(l.generateUrl)(e, {
            user: t,
            size: A
          });
          return t === (null === (n = Object(a.getCurrentUser)()) || void 0 === n ? void 0 : n.uid) && "undefined" != typeof oc_userconfig && (i += "?v=" + oc_userconfig.avatar.version), i;
        },
        updateImageIfValid: function updateImageIfValid(t) {
          var A = this,
              n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null,
              e = C(this.user);
          if (this.isUserDefined && "boolean" == typeof e) return this.isAvatarLoaded = !0, this.avatarUrlLoaded = t, n && (this.avatarSrcSetLoaded = n), void (!1 === e && (this.userDoesNotExist = !0));
          var i = new Image();
          i.onload = function () {
            A.avatarUrlLoaded = t, n && (A.avatarSrcSetLoaded = n), A.isAvatarLoaded = !0, v(A.user, !0);
          }, i.onerror = function () {
            console.debug("Invalid avatar url", t), A.avatarUrlLoaded = null, A.avatarSrcSetLoaded = null, A.userDoesNotExist = !0, A.isAvatarLoaded = !1, v(A.user, !1);
          }, n && (i.srcset = n), i.src = t;
        }
      }
    },
        h = n(2),
        x = n.n(h),
        I = n(65),
        M = {
      insert: "head",
      singleton: !1
    },
        w = (x()(I.a, M), I.a.locals, n(3)),
        y = n(66),
        E = n.n(y),
        T = Object(w.a)(B, function () {
      var t = this,
          A = t.$createElement,
          n = t._self._c || A;
      return n("div", t._g({
        directives: [{
          name: "tooltip",
          rawName: "v-tooltip",
          value: t.tooltip,
          expression: "tooltip"
        }, {
          name: "click-outside",
          rawName: "v-click-outside",
          value: t.closeMenu,
          expression: "closeMenu"
        }],
        staticClass: "avatardiv popovermenu-wrapper",
        class: {
          "avatardiv--unknown": t.userDoesNotExist,
          "avatardiv--with-menu": t.hasMenu
        },
        style: t.avatarStyle
      }, t.disableMenu ? {} : {
        click: t.toggleMenu
      }), [t.iconClass ? n("div", {
        staticClass: "avatar-class-icon",
        class: t.iconClass
      }) : t.isAvatarLoaded && !t.userDoesNotExist ? n("img", {
        attrs: {
          src: t.avatarUrlLoaded,
          srcset: t.avatarSrcSetLoaded,
          alt: ""
        }
      }) : t._e(), t._v(" "), t.hasMenu ? n("Popover", {
        attrs: {
          placement: "auto",
          container: t.menuContainer,
          open: t.contactsMenuOpenState
        }
      }, [n("PopoverMenu", {
        attrs: {
          menu: t.menu
        }
      }), t._v(" "), n("template", {
        slot: "trigger"
      }, [n("div", {
        class: t.contactsMenuLoading ? "icon-loading" : "icon-more",
        style: {
          width: t.size + "px",
          height: t.size + "px"
        }
      })])], 2) : t._e(), t._v(" "), t.showUserStatusIconOnAvatar ? n("div", {
        staticClass: "avatardiv__user-status avatardiv__user-status--icon"
      }, [t._v("\n\t\t" + t._s(t.userStatus.icon) + "\n\t")]) : t.canDisplayUserStatus ? n("div", {
        staticClass: "avatardiv__user-status",
        class: "avatardiv__user-status--" + t.userStatus.status
      }) : t.status ? n("div", {
        staticClass: "avatardiv__status",
        class: "avatardiv__status--" + t.status,
        style: {
          backgroundColor: "#" + t.statusColor
        }
      }, ["neutral" === t.status ? n("svg", {
        attrs: {
          xmlns: "http://www.w3.org/2000/svg",
          width: "12",
          height: "11",
          viewBox: "0 0 3.175 2.91"
        }
      }, [n("path", {
        style: {
          fill: "#" + t.statusColor
        },
        attrs: {
          d: "M3.21 3.043H.494l.679-1.177.68-1.176.678 1.176z",
          stroke: "#fff",
          "stroke-width": ".265",
          "stroke-linecap": "square"
        }
      })]) : t._e()]) : t._e(), t._v(" "), t.userDoesNotExist && !t.iconClass ? n("div", {
        staticClass: "unknown"
      }, [t._v("\n\t\t" + t._s(t.initials) + "\n\t")]) : t._e()], 1);
    }, [], !1, null, "1bfc7bfe", null);
    "function" == typeof E.a && E()(T);
    var D = T.exports;
    /**
     * @copyright Copyright (c) 2018 Julius Härtl <jus@bitgrid.net>
     *
     * @author Julius Härtl <jus@bitgrid.net>
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
     * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
     * GNU Affero General Public License for more details.
     *
     * You should have received a copy of the GNU Affero General Public License
     * along with this program. If not, see <http://www.gnu.org/licenses/>.
     *
     */

    A.default = D;
  }, function (t, A) {
    t.exports = __webpack_require__(/*! md5 */ "./node_modules/md5/md5.js");
  }, function (t, A) {
    t.exports = __webpack_require__(/*! @nextcloud/capabilities */ "./node_modules/@nextcloud/capabilities/dist/index.js");
  },, function (t, A, n) {
    "use strict";

    n.r(A);
    n(92), n(15), n(24);

    var e = n(81),
        i = n.n(e),
        o = n(64),
        a = function a(t) {
      var A = t.toLowerCase();
      null === A.match(/^([0-9a-f]{4}-?){8}$/) && (A = i()(A)), A = A.replace(/[^0-9a-f]/g, "");
      return Object(o.a)(6)[function (t, A) {
        for (var n = 0, e = [], i = 0; i < t.length; i++) {
          e.push(parseInt(t.charAt(i), 16) % 16);
        }

        for (var o in e) {
          n += e[o];
        }

        return parseInt(parseInt(n, 10) % A, 10);
      }(A, 18)];
    };

    A.default = a;
  },, function (t, A) {
    t.exports = __webpack_require__(/*! @nextcloud/browser-storage */ "./node_modules/@nextcloud/browser-storage/dist/index.js");
  },,, function (t, A) {
    t.exports = __webpack_require__(/*! core-js/modules/es.array.includes.js */ "./node_modules/core-js/modules/es.array.includes.js");
  }, function (t, A) {
    t.exports = __webpack_require__(/*! core-js/modules/es.regexp.constructor.js */ "./node_modules/core-js/modules/es.regexp.constructor.js");
  }, function (t, A) {
    t.exports = __webpack_require__(/*! core-js/modules/es.array.flat.js */ "./node_modules/core-js/modules/es.array.flat.js");
  }, function (t, A) {
    t.exports = __webpack_require__(/*! core-js/modules/es.string.match.js */ "./node_modules/core-js/modules/es.string.match.js");
  },,,,,,,,,,, function (t, A) {
    t.exports = __webpack_require__(/*! core-js/modules/es.string.from-code-point.js */ "./node_modules/core-js/modules/es.string.from-code-point.js");
  }, function (t, A) {
    t.exports = __webpack_require__(/*! core-js/modules/es.string.code-point-at.js */ "./node_modules/core-js/modules/es.string.code-point-at.js");
  }]);
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./node_modules/charenc/charenc.js":
/*!*****************************************!*\
  !*** ./node_modules/charenc/charenc.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var charenc = {
  // UTF-8 encoding
  utf8: {
    // Convert a string to a byte array
    stringToBytes: function stringToBytes(str) {
      return charenc.bin.stringToBytes(unescape(encodeURIComponent(str)));
    },
    // Convert a byte array to a string
    bytesToString: function bytesToString(bytes) {
      return decodeURIComponent(escape(charenc.bin.bytesToString(bytes)));
    }
  },
  // Binary encoding
  bin: {
    // Convert a string to a byte array
    stringToBytes: function stringToBytes(str) {
      for (var bytes = [], i = 0; i < str.length; i++) {
        bytes.push(str.charCodeAt(i) & 0xFF);
      }

      return bytes;
    },
    // Convert a byte array to a string
    bytesToString: function bytesToString(bytes) {
      for (var str = [], i = 0; i < bytes.length; i++) {
        str.push(String.fromCharCode(bytes[i]));
      }

      return str.join('');
    }
  }
};
module.exports = charenc;

/***/ }),

/***/ "./node_modules/core-js/internals/engine-is-browser.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/engine-is-browser.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

module.exports = (typeof window === "undefined" ? "undefined" : _typeof(window)) == 'object';

/***/ }),

/***/ "./node_modules/core-js/internals/engine-is-ios.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/internals/engine-is-ios.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var userAgent = __webpack_require__(/*! ../internals/engine-user-agent */ "./node_modules/core-js/internals/engine-user-agent.js");

module.exports = /(?:iphone|ipod|ipad).*applewebkit/i.test(userAgent);

/***/ }),

/***/ "./node_modules/core-js/internals/engine-is-node.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/engine-is-node.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var classof = __webpack_require__(/*! ../internals/classof-raw */ "./node_modules/core-js/internals/classof-raw.js");

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");

module.exports = classof(global.process) == 'process';

/***/ }),

/***/ "./node_modules/core-js/internals/engine-is-webos-webkit.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/internals/engine-is-webos-webkit.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var userAgent = __webpack_require__(/*! ../internals/engine-user-agent */ "./node_modules/core-js/internals/engine-user-agent.js");

module.exports = /web0s(?!.*chrome)/i.test(userAgent);

/***/ }),

/***/ "./node_modules/core-js/internals/flatten-into-array.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/internals/flatten-into-array.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isArray = __webpack_require__(/*! ../internals/is-array */ "./node_modules/core-js/internals/is-array.js");

var toLength = __webpack_require__(/*! ../internals/to-length */ "./node_modules/core-js/internals/to-length.js");

var bind = __webpack_require__(/*! ../internals/function-bind-context */ "./node_modules/core-js/internals/function-bind-context.js"); // `FlattenIntoArray` abstract operation
// https://tc39.github.io/proposal-flatMap/#sec-FlattenIntoArray


var flattenIntoArray = function flattenIntoArray(target, original, source, sourceLen, start, depth, mapper, thisArg) {
  var targetIndex = start;
  var sourceIndex = 0;
  var mapFn = mapper ? bind(mapper, thisArg, 3) : false;
  var element;

  while (sourceIndex < sourceLen) {
    if (sourceIndex in source) {
      element = mapFn ? mapFn(source[sourceIndex], sourceIndex, original) : source[sourceIndex];

      if (depth > 0 && isArray(element)) {
        targetIndex = flattenIntoArray(target, original, element, toLength(element.length), targetIndex, depth - 1) - 1;
      } else {
        if (targetIndex >= 0x1FFFFFFFFFFFFF) throw TypeError('Exceed the acceptable array length');
        target[targetIndex] = element;
      }

      targetIndex++;
    }

    sourceIndex++;
  }

  return targetIndex;
};

module.exports = flattenIntoArray;

/***/ }),

/***/ "./node_modules/core-js/internals/host-report-errors.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/internals/host-report-errors.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");

module.exports = function (a, b) {
  var console = global.console;

  if (console && console.error) {
    arguments.length === 1 ? console.error(a) : console.error(a, b);
  }
};

/***/ }),

/***/ "./node_modules/core-js/internals/microtask.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/microtask.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");

var getOwnPropertyDescriptor = __webpack_require__(/*! ../internals/object-get-own-property-descriptor */ "./node_modules/core-js/internals/object-get-own-property-descriptor.js").f;

var macrotask = __webpack_require__(/*! ../internals/task */ "./node_modules/core-js/internals/task.js").set;

var IS_IOS = __webpack_require__(/*! ../internals/engine-is-ios */ "./node_modules/core-js/internals/engine-is-ios.js");

var IS_WEBOS_WEBKIT = __webpack_require__(/*! ../internals/engine-is-webos-webkit */ "./node_modules/core-js/internals/engine-is-webos-webkit.js");

var IS_NODE = __webpack_require__(/*! ../internals/engine-is-node */ "./node_modules/core-js/internals/engine-is-node.js");

var MutationObserver = global.MutationObserver || global.WebKitMutationObserver;
var document = global.document;
var process = global.process;
var Promise = global.Promise; // Node.js 11 shows ExperimentalWarning on getting `queueMicrotask`

var queueMicrotaskDescriptor = getOwnPropertyDescriptor(global, 'queueMicrotask');
var queueMicrotask = queueMicrotaskDescriptor && queueMicrotaskDescriptor.value;
var flush, head, last, notify, toggle, node, promise, then; // modern engines have queueMicrotask method

if (!queueMicrotask) {
  flush = function flush() {
    var parent, fn;
    if (IS_NODE && (parent = process.domain)) parent.exit();

    while (head) {
      fn = head.fn;
      head = head.next;

      try {
        fn();
      } catch (error) {
        if (head) notify();else last = undefined;
        throw error;
      }
    }

    last = undefined;
    if (parent) parent.enter();
  }; // browsers with MutationObserver, except iOS - https://github.com/zloirock/core-js/issues/339
  // also except WebOS Webkit https://github.com/zloirock/core-js/issues/898


  if (!IS_IOS && !IS_NODE && !IS_WEBOS_WEBKIT && MutationObserver && document) {
    toggle = true;
    node = document.createTextNode('');
    new MutationObserver(flush).observe(node, {
      characterData: true
    });

    notify = function notify() {
      node.data = toggle = !toggle;
    }; // environments with maybe non-completely correct, but existent Promise

  } else if (Promise && Promise.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    promise = Promise.resolve(undefined); // workaround of WebKit ~ iOS Safari 10.1 bug

    promise.constructor = Promise;
    then = promise.then;

    notify = function notify() {
      then.call(promise, flush);
    }; // Node.js without promises

  } else if (IS_NODE) {
    notify = function notify() {
      process.nextTick(flush);
    }; // for other environments - macrotask based on:
    // - setImmediate
    // - MessageChannel
    // - window.postMessag
    // - onreadystatechange
    // - setTimeout

  } else {
    notify = function notify() {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }
}

module.exports = queueMicrotask || function (fn) {
  var task = {
    fn: fn,
    next: undefined
  };
  if (last) last.next = task;

  if (!head) {
    head = task;
    notify();
  }

  last = task;
};

/***/ }),

/***/ "./node_modules/core-js/internals/native-promise-constructor.js":
/*!**********************************************************************!*\
  !*** ./node_modules/core-js/internals/native-promise-constructor.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");

module.exports = global.Promise;

/***/ }),

/***/ "./node_modules/core-js/internals/new-promise-capability.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/internals/new-promise-capability.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var aFunction = __webpack_require__(/*! ../internals/a-function */ "./node_modules/core-js/internals/a-function.js");

var PromiseCapability = function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}; // 25.4.1.5 NewPromiseCapability(C)


module.exports.f = function (C) {
  return new PromiseCapability(C);
};

/***/ }),

/***/ "./node_modules/core-js/internals/perform.js":
/*!***************************************************!*\
  !*** ./node_modules/core-js/internals/perform.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (exec) {
  try {
    return {
      error: false,
      value: exec()
    };
  } catch (error) {
    return {
      error: true,
      value: error
    };
  }
};

/***/ }),

/***/ "./node_modules/core-js/internals/promise-resolve.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/internals/promise-resolve.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");

var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");

var newPromiseCapability = __webpack_require__(/*! ../internals/new-promise-capability */ "./node_modules/core-js/internals/new-promise-capability.js");

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};

/***/ }),

/***/ "./node_modules/core-js/internals/species-constructor.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js/internals/species-constructor.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");

var aFunction = __webpack_require__(/*! ../internals/a-function */ "./node_modules/core-js/internals/a-function.js");

var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");

var SPECIES = wellKnownSymbol('species'); // `SpeciesConstructor` abstract operation
// https://tc39.es/ecma262/#sec-speciesconstructor

module.exports = function (O, defaultConstructor) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? defaultConstructor : aFunction(S);
};

/***/ }),

/***/ "./node_modules/core-js/internals/task.js":
/*!************************************************!*\
  !*** ./node_modules/core-js/internals/task.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");

var bind = __webpack_require__(/*! ../internals/function-bind-context */ "./node_modules/core-js/internals/function-bind-context.js");

var html = __webpack_require__(/*! ../internals/html */ "./node_modules/core-js/internals/html.js");

var createElement = __webpack_require__(/*! ../internals/document-create-element */ "./node_modules/core-js/internals/document-create-element.js");

var IS_IOS = __webpack_require__(/*! ../internals/engine-is-ios */ "./node_modules/core-js/internals/engine-is-ios.js");

var IS_NODE = __webpack_require__(/*! ../internals/engine-is-node */ "./node_modules/core-js/internals/engine-is-node.js");

var location = global.location;
var set = global.setImmediate;
var clear = global.clearImmediate;
var process = global.process;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;

var run = function run(id) {
  // eslint-disable-next-line no-prototype-builtins -- safe
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};

var runner = function runner(id) {
  return function () {
    run(id);
  };
};

var listener = function listener(event) {
  run(event.data);
};

var post = function post(id) {
  // old engines have not location.origin
  global.postMessage(id + '', location.protocol + '//' + location.host);
}; // Node.js 0.9+ & IE10+ has setImmediate, otherwise:


if (!set || !clear) {
  set = function setImmediate(fn) {
    var args = [];
    var i = 1;

    while (arguments.length > i) {
      args.push(arguments[i++]);
    }

    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func -- spec requirement
      (typeof fn == 'function' ? fn : Function(fn)).apply(undefined, args);
    };

    defer(counter);
    return counter;
  };

  clear = function clearImmediate(id) {
    delete queue[id];
  }; // Node.js 0.8-


  if (IS_NODE) {
    defer = function defer(id) {
      process.nextTick(runner(id));
    }; // Sphere (JS game engine) Dispatch API

  } else if (Dispatch && Dispatch.now) {
    defer = function defer(id) {
      Dispatch.now(runner(id));
    }; // Browsers with MessageChannel, includes WebWorkers
    // except iOS - https://github.com/zloirock/core-js/issues/624

  } else if (MessageChannel && !IS_IOS) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = bind(port.postMessage, port, 1); // Browsers with postMessage, skip WebWorkers
    // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts && location && location.protocol !== 'file:' && !fails(post)) {
    defer = post;
    global.addEventListener('message', listener, false); // IE8-
  } else if (ONREADYSTATECHANGE in createElement('script')) {
    defer = function defer(id) {
      html.appendChild(createElement('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run(id);
      };
    }; // Rest old browsers

  } else {
    defer = function defer(id) {
      setTimeout(runner(id), 0);
    };
  }
}

module.exports = {
  set: set,
  clear: clear
};

/***/ }),

/***/ "./node_modules/core-js/modules/es.array.flat.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es.array.flat.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");

var flattenIntoArray = __webpack_require__(/*! ../internals/flatten-into-array */ "./node_modules/core-js/internals/flatten-into-array.js");

var toObject = __webpack_require__(/*! ../internals/to-object */ "./node_modules/core-js/internals/to-object.js");

var toLength = __webpack_require__(/*! ../internals/to-length */ "./node_modules/core-js/internals/to-length.js");

var toInteger = __webpack_require__(/*! ../internals/to-integer */ "./node_modules/core-js/internals/to-integer.js");

var arraySpeciesCreate = __webpack_require__(/*! ../internals/array-species-create */ "./node_modules/core-js/internals/array-species-create.js"); // `Array.prototype.flat` method
// https://tc39.es/ecma262/#sec-array.prototype.flat


$({
  target: 'Array',
  proto: true
}, {
  flat: function flat() {
    var depthArg = arguments.length ? arguments[0] : undefined;
    var O = toObject(this);
    var sourceLen = toLength(O.length);
    var A = arraySpeciesCreate(O, 0);
    A.length = flattenIntoArray(A, O, O, sourceLen, 0, depthArg === undefined ? 1 : toInteger(depthArg));
    return A;
  }
});

/***/ }),

/***/ "./node_modules/core-js/modules/es.array.includes.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es.array.includes.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");

var $includes = __webpack_require__(/*! ../internals/array-includes */ "./node_modules/core-js/internals/array-includes.js").includes;

var addToUnscopables = __webpack_require__(/*! ../internals/add-to-unscopables */ "./node_modules/core-js/internals/add-to-unscopables.js"); // `Array.prototype.includes` method
// https://tc39.es/ecma262/#sec-array.prototype.includes


$({
  target: 'Array',
  proto: true
}, {
  includes: function includes(el
  /* , fromIndex = 0 */
  ) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
}); // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables

addToUnscopables('includes');

/***/ }),

/***/ "./node_modules/core-js/modules/es.array.join.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es.array.join.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");

var IndexedObject = __webpack_require__(/*! ../internals/indexed-object */ "./node_modules/core-js/internals/indexed-object.js");

var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "./node_modules/core-js/internals/to-indexed-object.js");

var arrayMethodIsStrict = __webpack_require__(/*! ../internals/array-method-is-strict */ "./node_modules/core-js/internals/array-method-is-strict.js");

var nativeJoin = [].join;
var ES3_STRINGS = IndexedObject != Object;
var STRICT_METHOD = arrayMethodIsStrict('join', ','); // `Array.prototype.join` method
// https://tc39.es/ecma262/#sec-array.prototype.join

$({
  target: 'Array',
  proto: true,
  forced: ES3_STRINGS || !STRICT_METHOD
}, {
  join: function join(separator) {
    return nativeJoin.call(toIndexedObject(this), separator === undefined ? ',' : separator);
  }
});

/***/ }),

/***/ "./node_modules/core-js/modules/es.number.constructor.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/es.number.constructor.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");

var isForced = __webpack_require__(/*! ../internals/is-forced */ "./node_modules/core-js/internals/is-forced.js");

var redefine = __webpack_require__(/*! ../internals/redefine */ "./node_modules/core-js/internals/redefine.js");

var has = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js/internals/has.js");

var classof = __webpack_require__(/*! ../internals/classof-raw */ "./node_modules/core-js/internals/classof-raw.js");

var inheritIfRequired = __webpack_require__(/*! ../internals/inherit-if-required */ "./node_modules/core-js/internals/inherit-if-required.js");

var toPrimitive = __webpack_require__(/*! ../internals/to-primitive */ "./node_modules/core-js/internals/to-primitive.js");

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");

var create = __webpack_require__(/*! ../internals/object-create */ "./node_modules/core-js/internals/object-create.js");

var getOwnPropertyNames = __webpack_require__(/*! ../internals/object-get-own-property-names */ "./node_modules/core-js/internals/object-get-own-property-names.js").f;

var getOwnPropertyDescriptor = __webpack_require__(/*! ../internals/object-get-own-property-descriptor */ "./node_modules/core-js/internals/object-get-own-property-descriptor.js").f;

var defineProperty = __webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js").f;

var trim = __webpack_require__(/*! ../internals/string-trim */ "./node_modules/core-js/internals/string-trim.js").trim;

var NUMBER = 'Number';
var NativeNumber = global[NUMBER];
var NumberPrototype = NativeNumber.prototype; // Opera ~12 has broken Object#toString

var BROKEN_CLASSOF = classof(create(NumberPrototype)) == NUMBER; // `ToNumber` abstract operation
// https://tc39.es/ecma262/#sec-tonumber

var toNumber = function toNumber(argument) {
  var it = toPrimitive(argument, false);
  var first, third, radix, maxCode, digits, length, index, code;

  if (typeof it == 'string' && it.length > 2) {
    it = trim(it);
    first = it.charCodeAt(0);

    if (first === 43 || first === 45) {
      third = it.charCodeAt(2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (it.charCodeAt(1)) {
        case 66:
        case 98:
          radix = 2;
          maxCode = 49;
          break;
        // fast equal of /^0b[01]+$/i

        case 79:
        case 111:
          radix = 8;
          maxCode = 55;
          break;
        // fast equal of /^0o[0-7]+$/i

        default:
          return +it;
      }

      digits = it.slice(2);
      length = digits.length;

      for (index = 0; index < length; index++) {
        code = digits.charCodeAt(index); // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols

        if (code < 48 || code > maxCode) return NaN;
      }

      return parseInt(digits, radix);
    }
  }

  return +it;
}; // `Number` constructor
// https://tc39.es/ecma262/#sec-number-constructor


if (isForced(NUMBER, !NativeNumber(' 0o1') || !NativeNumber('0b1') || NativeNumber('+0x1'))) {
  var NumberWrapper = function Number(value) {
    var it = arguments.length < 1 ? 0 : value;
    var dummy = this;
    return dummy instanceof NumberWrapper // check on 1..constructor(foo) case
    && (BROKEN_CLASSOF ? fails(function () {
      NumberPrototype.valueOf.call(dummy);
    }) : classof(dummy) != NUMBER) ? inheritIfRequired(new NativeNumber(toNumber(it)), dummy, NumberWrapper) : toNumber(it);
  };

  for (var keys = DESCRIPTORS ? getOwnPropertyNames(NativeNumber) : ( // ES3:
  'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' + // ES2015 (in case, if modules with ES2015 Number statics required before):
  'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' + 'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger,' + // ESNext
  'fromString,range').split(','), j = 0, key; keys.length > j; j++) {
    if (has(NativeNumber, key = keys[j]) && !has(NumberWrapper, key)) {
      defineProperty(NumberWrapper, key, getOwnPropertyDescriptor(NativeNumber, key));
    }
  }

  NumberWrapper.prototype = NumberPrototype;
  NumberPrototype.constructor = NumberWrapper;
  redefine(global, NUMBER, NumberWrapper);
}

/***/ }),

/***/ "./node_modules/core-js/modules/es.promise.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/es.promise.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");

var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "./node_modules/core-js/internals/is-pure.js");

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");

var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "./node_modules/core-js/internals/get-built-in.js");

var NativePromise = __webpack_require__(/*! ../internals/native-promise-constructor */ "./node_modules/core-js/internals/native-promise-constructor.js");

var redefine = __webpack_require__(/*! ../internals/redefine */ "./node_modules/core-js/internals/redefine.js");

var redefineAll = __webpack_require__(/*! ../internals/redefine-all */ "./node_modules/core-js/internals/redefine-all.js");

var setPrototypeOf = __webpack_require__(/*! ../internals/object-set-prototype-of */ "./node_modules/core-js/internals/object-set-prototype-of.js");

var setToStringTag = __webpack_require__(/*! ../internals/set-to-string-tag */ "./node_modules/core-js/internals/set-to-string-tag.js");

var setSpecies = __webpack_require__(/*! ../internals/set-species */ "./node_modules/core-js/internals/set-species.js");

var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");

var aFunction = __webpack_require__(/*! ../internals/a-function */ "./node_modules/core-js/internals/a-function.js");

var anInstance = __webpack_require__(/*! ../internals/an-instance */ "./node_modules/core-js/internals/an-instance.js");

var inspectSource = __webpack_require__(/*! ../internals/inspect-source */ "./node_modules/core-js/internals/inspect-source.js");

var iterate = __webpack_require__(/*! ../internals/iterate */ "./node_modules/core-js/internals/iterate.js");

var checkCorrectnessOfIteration = __webpack_require__(/*! ../internals/check-correctness-of-iteration */ "./node_modules/core-js/internals/check-correctness-of-iteration.js");

var speciesConstructor = __webpack_require__(/*! ../internals/species-constructor */ "./node_modules/core-js/internals/species-constructor.js");

var task = __webpack_require__(/*! ../internals/task */ "./node_modules/core-js/internals/task.js").set;

var microtask = __webpack_require__(/*! ../internals/microtask */ "./node_modules/core-js/internals/microtask.js");

var promiseResolve = __webpack_require__(/*! ../internals/promise-resolve */ "./node_modules/core-js/internals/promise-resolve.js");

var hostReportErrors = __webpack_require__(/*! ../internals/host-report-errors */ "./node_modules/core-js/internals/host-report-errors.js");

var newPromiseCapabilityModule = __webpack_require__(/*! ../internals/new-promise-capability */ "./node_modules/core-js/internals/new-promise-capability.js");

var perform = __webpack_require__(/*! ../internals/perform */ "./node_modules/core-js/internals/perform.js");

var InternalStateModule = __webpack_require__(/*! ../internals/internal-state */ "./node_modules/core-js/internals/internal-state.js");

var isForced = __webpack_require__(/*! ../internals/is-forced */ "./node_modules/core-js/internals/is-forced.js");

var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");

var IS_BROWSER = __webpack_require__(/*! ../internals/engine-is-browser */ "./node_modules/core-js/internals/engine-is-browser.js");

var IS_NODE = __webpack_require__(/*! ../internals/engine-is-node */ "./node_modules/core-js/internals/engine-is-node.js");

var V8_VERSION = __webpack_require__(/*! ../internals/engine-v8-version */ "./node_modules/core-js/internals/engine-v8-version.js");

var SPECIES = wellKnownSymbol('species');
var PROMISE = 'Promise';
var getInternalState = InternalStateModule.get;
var setInternalState = InternalStateModule.set;
var getInternalPromiseState = InternalStateModule.getterFor(PROMISE);
var NativePromisePrototype = NativePromise && NativePromise.prototype;
var PromiseConstructor = NativePromise;
var PromiseConstructorPrototype = NativePromisePrototype;
var TypeError = global.TypeError;
var document = global.document;
var process = global.process;
var newPromiseCapability = newPromiseCapabilityModule.f;
var newGenericPromiseCapability = newPromiseCapability;
var DISPATCH_EVENT = !!(document && document.createEvent && global.dispatchEvent);
var NATIVE_REJECTION_EVENT = typeof PromiseRejectionEvent == 'function';
var UNHANDLED_REJECTION = 'unhandledrejection';
var REJECTION_HANDLED = 'rejectionhandled';
var PENDING = 0;
var FULFILLED = 1;
var REJECTED = 2;
var HANDLED = 1;
var UNHANDLED = 2;
var SUBCLASSING = false;
var Internal, OwnPromiseCapability, PromiseWrapper, nativeThen;
var FORCED = isForced(PROMISE, function () {
  var GLOBAL_CORE_JS_PROMISE = inspectSource(PromiseConstructor) !== String(PromiseConstructor); // V8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
  // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
  // We can't detect it synchronously, so just check versions

  if (!GLOBAL_CORE_JS_PROMISE && V8_VERSION === 66) return true; // We need Promise#finally in the pure version for preventing prototype pollution

  if (IS_PURE && !PromiseConstructorPrototype['finally']) return true; // We can't use @@species feature detection in V8 since it causes
  // deoptimization and performance degradation
  // https://github.com/zloirock/core-js/issues/679

  if (V8_VERSION >= 51 && /native code/.test(PromiseConstructor)) return false; // Detect correctness of subclassing with @@species support

  var promise = new PromiseConstructor(function (resolve) {
    resolve(1);
  });

  var FakePromise = function FakePromise(exec) {
    exec(function () {
      /* empty */
    }, function () {
      /* empty */
    });
  };

  var constructor = promise.constructor = {};
  constructor[SPECIES] = FakePromise;
  SUBCLASSING = promise.then(function () {
    /* empty */
  }) instanceof FakePromise;
  if (!SUBCLASSING) return true; // Unhandled rejections tracking support, NodeJS Promise without it fails @@species test

  return !GLOBAL_CORE_JS_PROMISE && IS_BROWSER && !NATIVE_REJECTION_EVENT;
});
var INCORRECT_ITERATION = FORCED || !checkCorrectnessOfIteration(function (iterable) {
  PromiseConstructor.all(iterable)['catch'](function () {
    /* empty */
  });
}); // helpers

var isThenable = function isThenable(it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};

var notify = function notify(state, isReject) {
  if (state.notified) return;
  state.notified = true;
  var chain = state.reactions;
  microtask(function () {
    var value = state.value;
    var ok = state.state == FULFILLED;
    var index = 0; // variable length - can't use forEach

    while (chain.length > index) {
      var reaction = chain[index++];
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;

      try {
        if (handler) {
          if (!ok) {
            if (state.rejection === UNHANDLED) onHandleUnhandled(state);
            state.rejection = HANDLED;
          }

          if (handler === true) result = value;else {
            if (domain) domain.enter();
            result = handler(value); // can throw

            if (domain) {
              domain.exit();
              exited = true;
            }
          }

          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (error) {
        if (domain && !exited) domain.exit();
        reject(error);
      }
    }

    state.reactions = [];
    state.notified = false;
    if (isReject && !state.rejection) onUnhandled(state);
  });
};

var dispatchEvent = function dispatchEvent(name, promise, reason) {
  var event, handler;

  if (DISPATCH_EVENT) {
    event = document.createEvent('Event');
    event.promise = promise;
    event.reason = reason;
    event.initEvent(name, false, true);
    global.dispatchEvent(event);
  } else event = {
    promise: promise,
    reason: reason
  };

  if (!NATIVE_REJECTION_EVENT && (handler = global['on' + name])) handler(event);else if (name === UNHANDLED_REJECTION) hostReportErrors('Unhandled promise rejection', reason);
};

var onUnhandled = function onUnhandled(state) {
  task.call(global, function () {
    var promise = state.facade;
    var value = state.value;
    var IS_UNHANDLED = isUnhandled(state);
    var result;

    if (IS_UNHANDLED) {
      result = perform(function () {
        if (IS_NODE) {
          process.emit('unhandledRejection', value, promise);
        } else dispatchEvent(UNHANDLED_REJECTION, promise, value);
      }); // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should

      state.rejection = IS_NODE || isUnhandled(state) ? UNHANDLED : HANDLED;
      if (result.error) throw result.value;
    }
  });
};

var isUnhandled = function isUnhandled(state) {
  return state.rejection !== HANDLED && !state.parent;
};

var onHandleUnhandled = function onHandleUnhandled(state) {
  task.call(global, function () {
    var promise = state.facade;

    if (IS_NODE) {
      process.emit('rejectionHandled', promise);
    } else dispatchEvent(REJECTION_HANDLED, promise, state.value);
  });
};

var bind = function bind(fn, state, unwrap) {
  return function (value) {
    fn(state, value, unwrap);
  };
};

var internalReject = function internalReject(state, value, unwrap) {
  if (state.done) return;
  state.done = true;
  if (unwrap) state = unwrap;
  state.value = value;
  state.state = REJECTED;
  notify(state, true);
};

var internalResolve = function internalResolve(state, value, unwrap) {
  if (state.done) return;
  state.done = true;
  if (unwrap) state = unwrap;

  try {
    if (state.facade === value) throw TypeError("Promise can't be resolved itself");
    var then = isThenable(value);

    if (then) {
      microtask(function () {
        var wrapper = {
          done: false
        };

        try {
          then.call(value, bind(internalResolve, wrapper, state), bind(internalReject, wrapper, state));
        } catch (error) {
          internalReject(wrapper, error, state);
        }
      });
    } else {
      state.value = value;
      state.state = FULFILLED;
      notify(state, false);
    }
  } catch (error) {
    internalReject({
      done: false
    }, error, state);
  }
}; // constructor polyfill


if (FORCED) {
  // 25.4.3.1 Promise(executor)
  PromiseConstructor = function Promise(executor) {
    anInstance(this, PromiseConstructor, PROMISE);
    aFunction(executor);
    Internal.call(this);
    var state = getInternalState(this);

    try {
      executor(bind(internalResolve, state), bind(internalReject, state));
    } catch (error) {
      internalReject(state, error);
    }
  };

  PromiseConstructorPrototype = PromiseConstructor.prototype; // eslint-disable-next-line no-unused-vars -- required for `.length`

  Internal = function Promise(executor) {
    setInternalState(this, {
      type: PROMISE,
      done: false,
      notified: false,
      parent: false,
      reactions: [],
      rejection: false,
      state: PENDING,
      value: undefined
    });
  };

  Internal.prototype = redefineAll(PromiseConstructorPrototype, {
    // `Promise.prototype.then` method
    // https://tc39.es/ecma262/#sec-promise.prototype.then
    then: function then(onFulfilled, onRejected) {
      var state = getInternalPromiseState(this);
      var reaction = newPromiseCapability(speciesConstructor(this, PromiseConstructor));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = IS_NODE ? process.domain : undefined;
      state.parent = true;
      state.reactions.push(reaction);
      if (state.state != PENDING) notify(state, false);
      return reaction.promise;
    },
    // `Promise.prototype.catch` method
    // https://tc39.es/ecma262/#sec-promise.prototype.catch
    'catch': function _catch(onRejected) {
      return this.then(undefined, onRejected);
    }
  });

  OwnPromiseCapability = function OwnPromiseCapability() {
    var promise = new Internal();
    var state = getInternalState(promise);
    this.promise = promise;
    this.resolve = bind(internalResolve, state);
    this.reject = bind(internalReject, state);
  };

  newPromiseCapabilityModule.f = newPromiseCapability = function newPromiseCapability(C) {
    return C === PromiseConstructor || C === PromiseWrapper ? new OwnPromiseCapability(C) : newGenericPromiseCapability(C);
  };

  if (!IS_PURE && typeof NativePromise == 'function' && NativePromisePrototype !== Object.prototype) {
    nativeThen = NativePromisePrototype.then;

    if (!SUBCLASSING) {
      // make `Promise#then` return a polyfilled `Promise` for native promise-based APIs
      redefine(NativePromisePrototype, 'then', function then(onFulfilled, onRejected) {
        var that = this;
        return new PromiseConstructor(function (resolve, reject) {
          nativeThen.call(that, resolve, reject);
        }).then(onFulfilled, onRejected); // https://github.com/zloirock/core-js/issues/640
      }, {
        unsafe: true
      }); // makes sure that native promise-based APIs `Promise#catch` properly works with patched `Promise#then`

      redefine(NativePromisePrototype, 'catch', PromiseConstructorPrototype['catch'], {
        unsafe: true
      });
    } // make `.constructor === Promise` work for native promise-based APIs


    try {
      delete NativePromisePrototype.constructor;
    } catch (error) {
      /* empty */
    } // make `instanceof Promise` work for native promise-based APIs


    if (setPrototypeOf) {
      setPrototypeOf(NativePromisePrototype, PromiseConstructorPrototype);
    }
  }
}

$({
  global: true,
  wrap: true,
  forced: FORCED
}, {
  Promise: PromiseConstructor
});
setToStringTag(PromiseConstructor, PROMISE, false, true);
setSpecies(PROMISE);
PromiseWrapper = getBuiltIn(PROMISE); // statics

$({
  target: PROMISE,
  stat: true,
  forced: FORCED
}, {
  // `Promise.reject` method
  // https://tc39.es/ecma262/#sec-promise.reject
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    capability.reject.call(undefined, r);
    return capability.promise;
  }
});
$({
  target: PROMISE,
  stat: true,
  forced: IS_PURE || FORCED
}, {
  // `Promise.resolve` method
  // https://tc39.es/ecma262/#sec-promise.resolve
  resolve: function resolve(x) {
    return promiseResolve(IS_PURE && this === PromiseWrapper ? PromiseConstructor : this, x);
  }
});
$({
  target: PROMISE,
  stat: true,
  forced: INCORRECT_ITERATION
}, {
  // `Promise.all` method
  // https://tc39.es/ecma262/#sec-promise.all
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var $promiseResolve = aFunction(C.resolve);
      var values = [];
      var counter = 0;
      var remaining = 1;
      iterate(iterable, function (promise) {
        var index = counter++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        $promiseResolve.call(C, promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.error) reject(result.value);
    return capability.promise;
  },
  // `Promise.race` method
  // https://tc39.es/ecma262/#sec-promise.race
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      var $promiseResolve = aFunction(C.resolve);
      iterate(iterable, function (promise) {
        $promiseResolve.call(C, promise).then(capability.resolve, reject);
      });
    });
    if (result.error) reject(result.value);
    return capability.promise;
  }
});

/***/ }),

/***/ "./node_modules/core-js/modules/es.regexp.constructor.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/es.regexp.constructor.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");

var isForced = __webpack_require__(/*! ../internals/is-forced */ "./node_modules/core-js/internals/is-forced.js");

var inheritIfRequired = __webpack_require__(/*! ../internals/inherit-if-required */ "./node_modules/core-js/internals/inherit-if-required.js");

var defineProperty = __webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js").f;

var getOwnPropertyNames = __webpack_require__(/*! ../internals/object-get-own-property-names */ "./node_modules/core-js/internals/object-get-own-property-names.js").f;

var isRegExp = __webpack_require__(/*! ../internals/is-regexp */ "./node_modules/core-js/internals/is-regexp.js");

var getFlags = __webpack_require__(/*! ../internals/regexp-flags */ "./node_modules/core-js/internals/regexp-flags.js");

var stickyHelpers = __webpack_require__(/*! ../internals/regexp-sticky-helpers */ "./node_modules/core-js/internals/regexp-sticky-helpers.js");

var redefine = __webpack_require__(/*! ../internals/redefine */ "./node_modules/core-js/internals/redefine.js");

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");

var enforceInternalState = __webpack_require__(/*! ../internals/internal-state */ "./node_modules/core-js/internals/internal-state.js").enforce;

var setSpecies = __webpack_require__(/*! ../internals/set-species */ "./node_modules/core-js/internals/set-species.js");

var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");

var MATCH = wellKnownSymbol('match');
var NativeRegExp = global.RegExp;
var RegExpPrototype = NativeRegExp.prototype;
var re1 = /a/g;
var re2 = /a/g; // "new" should create a new object, old webkit bug

var CORRECT_NEW = new NativeRegExp(re1) !== re1;
var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y;
var FORCED = DESCRIPTORS && isForced('RegExp', !CORRECT_NEW || UNSUPPORTED_Y || fails(function () {
  re2[MATCH] = false; // RegExp constructor can alter flags and IsRegExp works correct with @@match

  return NativeRegExp(re1) != re1 || NativeRegExp(re2) == re2 || NativeRegExp(re1, 'i') != '/a/i';
})); // `RegExp` constructor
// https://tc39.es/ecma262/#sec-regexp-constructor

if (FORCED) {
  var RegExpWrapper = function RegExp(pattern, flags) {
    var thisIsRegExp = this instanceof RegExpWrapper;
    var patternIsRegExp = isRegExp(pattern);
    var flagsAreUndefined = flags === undefined;
    var sticky;

    if (!thisIsRegExp && patternIsRegExp && pattern.constructor === RegExpWrapper && flagsAreUndefined) {
      return pattern;
    }

    if (CORRECT_NEW) {
      if (patternIsRegExp && !flagsAreUndefined) pattern = pattern.source;
    } else if (pattern instanceof RegExpWrapper) {
      if (flagsAreUndefined) flags = getFlags.call(pattern);
      pattern = pattern.source;
    }

    if (UNSUPPORTED_Y) {
      sticky = !!flags && flags.indexOf('y') > -1;
      if (sticky) flags = flags.replace(/y/g, '');
    }

    var result = inheritIfRequired(CORRECT_NEW ? new NativeRegExp(pattern, flags) : NativeRegExp(pattern, flags), thisIsRegExp ? this : RegExpPrototype, RegExpWrapper);

    if (UNSUPPORTED_Y && sticky) {
      var state = enforceInternalState(result);
      state.sticky = true;
    }

    return result;
  };

  var proxy = function proxy(key) {
    key in RegExpWrapper || defineProperty(RegExpWrapper, key, {
      configurable: true,
      get: function get() {
        return NativeRegExp[key];
      },
      set: function set(it) {
        NativeRegExp[key] = it;
      }
    });
  };

  var keys = getOwnPropertyNames(NativeRegExp);
  var index = 0;

  while (keys.length > index) {
    proxy(keys[index++]);
  }

  RegExpPrototype.constructor = RegExpWrapper;
  RegExpWrapper.prototype = RegExpPrototype;
  redefine(global, 'RegExp', RegExpWrapper);
} // https://tc39.es/ecma262/#sec-get-regexp-@@species


setSpecies('RegExp');

/***/ }),

/***/ "./node_modules/core-js/modules/es.string.code-point-at.js":
/*!*****************************************************************!*\
  !*** ./node_modules/core-js/modules/es.string.code-point-at.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");

var codeAt = __webpack_require__(/*! ../internals/string-multibyte */ "./node_modules/core-js/internals/string-multibyte.js").codeAt; // `String.prototype.codePointAt` method
// https://tc39.es/ecma262/#sec-string.prototype.codepointat


$({
  target: 'String',
  proto: true
}, {
  codePointAt: function codePointAt(pos) {
    return codeAt(this, pos);
  }
});

/***/ }),

/***/ "./node_modules/core-js/modules/es.string.from-code-point.js":
/*!*******************************************************************!*\
  !*** ./node_modules/core-js/modules/es.string.from-code-point.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");

var toAbsoluteIndex = __webpack_require__(/*! ../internals/to-absolute-index */ "./node_modules/core-js/internals/to-absolute-index.js");

var fromCharCode = String.fromCharCode; // eslint-disable-next-line es/no-string-fromcodepoint -- required for testing

var $fromCodePoint = String.fromCodePoint; // length should be 1, old FF problem

var INCORRECT_LENGTH = !!$fromCodePoint && $fromCodePoint.length != 1; // `String.fromCodePoint` method
// https://tc39.es/ecma262/#sec-string.fromcodepoint

$({
  target: 'String',
  stat: true,
  forced: INCORRECT_LENGTH
}, {
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  fromCodePoint: function fromCodePoint(x) {
    var elements = [];
    var length = arguments.length;
    var i = 0;
    var code;

    while (length > i) {
      code = +arguments[i++];
      if (toAbsoluteIndex(code, 0x10FFFF) !== code) throw RangeError(code + ' is not a valid code point');
      elements.push(code < 0x10000 ? fromCharCode(code) : fromCharCode(((code -= 0x10000) >> 10) + 0xD800, code % 0x400 + 0xDC00));
    }

    return elements.join('');
  }
});

/***/ }),

/***/ "./node_modules/core-js/modules/es.string.match.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es.string.match.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var fixRegExpWellKnownSymbolLogic = __webpack_require__(/*! ../internals/fix-regexp-well-known-symbol-logic */ "./node_modules/core-js/internals/fix-regexp-well-known-symbol-logic.js");

var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");

var toLength = __webpack_require__(/*! ../internals/to-length */ "./node_modules/core-js/internals/to-length.js");

var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "./node_modules/core-js/internals/require-object-coercible.js");

var advanceStringIndex = __webpack_require__(/*! ../internals/advance-string-index */ "./node_modules/core-js/internals/advance-string-index.js");

var regExpExec = __webpack_require__(/*! ../internals/regexp-exec-abstract */ "./node_modules/core-js/internals/regexp-exec-abstract.js"); // @@match logic


fixRegExpWellKnownSymbolLogic('match', 1, function (MATCH, nativeMatch, maybeCallNative) {
  return [// `String.prototype.match` method
  // https://tc39.es/ecma262/#sec-string.prototype.match
  function match(regexp) {
    var O = requireObjectCoercible(this);
    var matcher = regexp == undefined ? undefined : regexp[MATCH];
    return matcher !== undefined ? matcher.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
  }, // `RegExp.prototype[@@match]` method
  // https://tc39.es/ecma262/#sec-regexp.prototype-@@match
  function (regexp) {
    var res = maybeCallNative(nativeMatch, regexp, this);
    if (res.done) return res.value;
    var rx = anObject(regexp);
    var S = String(this);
    if (!rx.global) return regExpExec(rx, S);
    var fullUnicode = rx.unicode;
    rx.lastIndex = 0;
    var A = [];
    var n = 0;
    var result;

    while ((result = regExpExec(rx, S)) !== null) {
      var matchStr = String(result[0]);
      A[n] = matchStr;
      if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
      n++;
    }

    return n === 0 ? null : A;
  }];
});

/***/ }),

/***/ "./node_modules/core-js/modules/es.string.split.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es.string.split.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var fixRegExpWellKnownSymbolLogic = __webpack_require__(/*! ../internals/fix-regexp-well-known-symbol-logic */ "./node_modules/core-js/internals/fix-regexp-well-known-symbol-logic.js");

var isRegExp = __webpack_require__(/*! ../internals/is-regexp */ "./node_modules/core-js/internals/is-regexp.js");

var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");

var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "./node_modules/core-js/internals/require-object-coercible.js");

var speciesConstructor = __webpack_require__(/*! ../internals/species-constructor */ "./node_modules/core-js/internals/species-constructor.js");

var advanceStringIndex = __webpack_require__(/*! ../internals/advance-string-index */ "./node_modules/core-js/internals/advance-string-index.js");

var toLength = __webpack_require__(/*! ../internals/to-length */ "./node_modules/core-js/internals/to-length.js");

var callRegExpExec = __webpack_require__(/*! ../internals/regexp-exec-abstract */ "./node_modules/core-js/internals/regexp-exec-abstract.js");

var regexpExec = __webpack_require__(/*! ../internals/regexp-exec */ "./node_modules/core-js/internals/regexp-exec.js");

var stickyHelpers = __webpack_require__(/*! ../internals/regexp-sticky-helpers */ "./node_modules/core-js/internals/regexp-sticky-helpers.js");

var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y;
var arrayPush = [].push;
var min = Math.min;
var MAX_UINT32 = 0xFFFFFFFF; // @@split logic

fixRegExpWellKnownSymbolLogic('split', 2, function (SPLIT, nativeSplit, maybeCallNative) {
  var internalSplit;

  if ('abbc'.split(/(b)*/)[1] == 'c' || // eslint-disable-next-line regexp/no-empty-group -- required for testing
  'test'.split(/(?:)/, -1).length != 4 || 'ab'.split(/(?:ab)*/).length != 2 || '.'.split(/(.?)(.?)/).length != 4 || // eslint-disable-next-line regexp/no-assertion-capturing-group, regexp/no-empty-group -- required for testing
  '.'.split(/()()/).length > 1 || ''.split(/.?/).length) {
    // based on es5-shim implementation, need to rework it
    internalSplit = function internalSplit(separator, limit) {
      var string = String(requireObjectCoercible(this));
      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
      if (lim === 0) return [];
      if (separator === undefined) return [string]; // If `separator` is not a regex, use native split

      if (!isRegExp(separator)) {
        return nativeSplit.call(string, separator, lim);
      }

      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') + (separator.multiline ? 'm' : '') + (separator.unicode ? 'u' : '') + (separator.sticky ? 'y' : '');
      var lastLastIndex = 0; // Make `global` and avoid `lastIndex` issues by working with a copy

      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var match, lastIndex, lastLength;

      while (match = regexpExec.call(separatorCopy, string)) {
        lastIndex = separatorCopy.lastIndex;

        if (lastIndex > lastLastIndex) {
          output.push(string.slice(lastLastIndex, match.index));
          if (match.length > 1 && match.index < string.length) arrayPush.apply(output, match.slice(1));
          lastLength = match[0].length;
          lastLastIndex = lastIndex;
          if (output.length >= lim) break;
        }

        if (separatorCopy.lastIndex === match.index) separatorCopy.lastIndex++; // Avoid an infinite loop
      }

      if (lastLastIndex === string.length) {
        if (lastLength || !separatorCopy.test('')) output.push('');
      } else output.push(string.slice(lastLastIndex));

      return output.length > lim ? output.slice(0, lim) : output;
    }; // Chakra, V8

  } else if ('0'.split(undefined, 0).length) {
    internalSplit = function internalSplit(separator, limit) {
      return separator === undefined && limit === 0 ? [] : nativeSplit.call(this, separator, limit);
    };
  } else internalSplit = nativeSplit;

  return [// `String.prototype.split` method
  // https://tc39.es/ecma262/#sec-string.prototype.split
  function split(separator, limit) {
    var O = requireObjectCoercible(this);
    var splitter = separator == undefined ? undefined : separator[SPLIT];
    return splitter !== undefined ? splitter.call(separator, O, limit) : internalSplit.call(String(O), separator, limit);
  }, // `RegExp.prototype[@@split]` method
  // https://tc39.es/ecma262/#sec-regexp.prototype-@@split
  //
  // NOTE: This cannot be properly polyfilled in engines that don't support
  // the 'y' flag.
  function (regexp, limit) {
    var res = maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== nativeSplit);
    if (res.done) return res.value;
    var rx = anObject(regexp);
    var S = String(this);
    var C = speciesConstructor(rx, RegExp);
    var unicodeMatching = rx.unicode;
    var flags = (rx.ignoreCase ? 'i' : '') + (rx.multiline ? 'm' : '') + (rx.unicode ? 'u' : '') + (UNSUPPORTED_Y ? 'g' : 'y'); // ^(? + rx + ) is needed, in combination with some S slicing, to
    // simulate the 'y' flag.

    var splitter = new C(UNSUPPORTED_Y ? '^(?:' + rx.source + ')' : rx, flags);
    var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
    if (lim === 0) return [];
    if (S.length === 0) return callRegExpExec(splitter, S) === null ? [S] : [];
    var p = 0;
    var q = 0;
    var A = [];

    while (q < S.length) {
      splitter.lastIndex = UNSUPPORTED_Y ? 0 : q;
      var z = callRegExpExec(splitter, UNSUPPORTED_Y ? S.slice(q) : S);
      var e;

      if (z === null || (e = min(toLength(splitter.lastIndex + (UNSUPPORTED_Y ? q : 0)), S.length)) === p) {
        q = advanceStringIndex(S, q, unicodeMatching);
      } else {
        A.push(S.slice(p, q));
        if (A.length === lim) return A;

        for (var i = 1; i <= z.length - 1; i++) {
          A.push(z[i]);
          if (A.length === lim) return A;
        }

        q = p = e;
      }
    }

    A.push(S.slice(p));
    return A;
  }];
}, UNSUPPORTED_Y);

/***/ }),

/***/ "./node_modules/crypt/crypt.js":
/*!*************************************!*\
  !*** ./node_modules/crypt/crypt.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
  var base64map = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
      crypt = {
    // Bit-wise rotation left
    rotl: function rotl(n, b) {
      return n << b | n >>> 32 - b;
    },
    // Bit-wise rotation right
    rotr: function rotr(n, b) {
      return n << 32 - b | n >>> b;
    },
    // Swap big-endian to little-endian and vice versa
    endian: function endian(n) {
      // If number given, swap endian
      if (n.constructor == Number) {
        return crypt.rotl(n, 8) & 0x00FF00FF | crypt.rotl(n, 24) & 0xFF00FF00;
      } // Else, assume array and swap all items


      for (var i = 0; i < n.length; i++) {
        n[i] = crypt.endian(n[i]);
      }

      return n;
    },
    // Generate an array of any length of random bytes
    randomBytes: function randomBytes(n) {
      for (var bytes = []; n > 0; n--) {
        bytes.push(Math.floor(Math.random() * 256));
      }

      return bytes;
    },
    // Convert a byte array to big-endian 32-bit words
    bytesToWords: function bytesToWords(bytes) {
      for (var words = [], i = 0, b = 0; i < bytes.length; i++, b += 8) {
        words[b >>> 5] |= bytes[i] << 24 - b % 32;
      }

      return words;
    },
    // Convert big-endian 32-bit words to a byte array
    wordsToBytes: function wordsToBytes(words) {
      for (var bytes = [], b = 0; b < words.length * 32; b += 8) {
        bytes.push(words[b >>> 5] >>> 24 - b % 32 & 0xFF);
      }

      return bytes;
    },
    // Convert a byte array to a hex string
    bytesToHex: function bytesToHex(bytes) {
      for (var hex = [], i = 0; i < bytes.length; i++) {
        hex.push((bytes[i] >>> 4).toString(16));
        hex.push((bytes[i] & 0xF).toString(16));
      }

      return hex.join('');
    },
    // Convert a hex string to a byte array
    hexToBytes: function hexToBytes(hex) {
      for (var bytes = [], c = 0; c < hex.length; c += 2) {
        bytes.push(parseInt(hex.substr(c, 2), 16));
      }

      return bytes;
    },
    // Convert a byte array to a base-64 string
    bytesToBase64: function bytesToBase64(bytes) {
      for (var base64 = [], i = 0; i < bytes.length; i += 3) {
        var triplet = bytes[i] << 16 | bytes[i + 1] << 8 | bytes[i + 2];

        for (var j = 0; j < 4; j++) {
          if (i * 8 + j * 6 <= bytes.length * 8) base64.push(base64map.charAt(triplet >>> 6 * (3 - j) & 0x3F));else base64.push('=');
        }
      }

      return base64.join('');
    },
    // Convert a base-64 string to a byte array
    base64ToBytes: function base64ToBytes(base64) {
      // Remove non-base-64 characters
      base64 = base64.replace(/[^A-Z0-9+\/]/ig, '');

      for (var bytes = [], i = 0, imod4 = 0; i < base64.length; imod4 = ++i % 4) {
        if (imod4 == 0) continue;
        bytes.push((base64map.indexOf(base64.charAt(i - 1)) & Math.pow(2, -2 * imod4 + 8) - 1) << imod4 * 2 | base64map.indexOf(base64.charAt(i)) >>> 6 - imod4 * 2);
      }

      return bytes;
    }
  };
  module.exports = crypt;
})();

/***/ }),

/***/ "./node_modules/is-buffer/index.js":
/*!*****************************************!*\
  !*** ./node_modules/is-buffer/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer);
};

function isBuffer(obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj);
} // For Node v0.10 support. Remove this eventually.


function isSlowBuffer(obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0));
}

/***/ }),

/***/ "./node_modules/linkifyjs/lib/linkify-string.js":
/*!******************************************************!*\
  !*** ./node_modules/linkifyjs/lib/linkify-string.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _linkify = __webpack_require__(/*! ./linkify */ "./node_modules/linkifyjs/lib/linkify.js");

var linkify = _interopRequireWildcard(_linkify);

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};

    if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }

    newObj.default = obj;
    return newObj;
  }
}

var tokenize = linkify.tokenize,
    options = linkify.options;
/**
	Convert strings of text into linkable HTML text
*/

var Options = options.Options;

function escapeText(text) {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function escapeAttr(href) {
  return href.replace(/"/g, '&quot;');
}

function attributesToString(attributes) {
  if (!attributes) {
    return '';
  }

  var result = [];

  for (var attr in attributes) {
    var val = attributes[attr] + '';
    result.push(attr + '="' + escapeAttr(val) + '"');
  }

  return result.join(' ');
}

function linkifyStr(str) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  opts = new Options(opts);
  var tokens = tokenize(str);
  var result = [];

  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i];

    if (token.type === 'nl' && opts.nl2br) {
      result.push('<br>\n');
      continue;
    } else if (!token.isLink || !opts.check(token)) {
      result.push(escapeText(token.toString()));
      continue;
    }

    var _opts$resolve = opts.resolve(token),
        formatted = _opts$resolve.formatted,
        formattedHref = _opts$resolve.formattedHref,
        tagName = _opts$resolve.tagName,
        className = _opts$resolve.className,
        target = _opts$resolve.target,
        attributes = _opts$resolve.attributes;

    var link = '<' + tagName + ' href="' + escapeAttr(formattedHref) + '"';

    if (className) {
      link += ' class="' + escapeAttr(className) + '"';
    }

    if (target) {
      link += ' target="' + escapeAttr(target) + '"';
    }

    if (attributes) {
      link += ' ' + attributesToString(attributes);
    }

    link += '>' + escapeText(formatted) + '</' + tagName + '>';
    result.push(link);
  }

  return result.join('');
}

if (!String.prototype.linkify) {
  try {
    Object.defineProperty(String.prototype, 'linkify', {
      set: function set() {},
      get: function get() {
        return function linkify(opts) {
          return linkifyStr(this, opts);
        };
      }
    });
  } catch (e) {
    // IE 8 doesn't like Object.defineProperty on non-DOM objects
    if (!String.prototype.linkify) {
      String.prototype.linkify = function (opts) {
        return linkifyStr(this, opts);
      };
    }
  }
}

exports.default = linkifyStr;

/***/ }),

/***/ "./node_modules/linkifyjs/lib/linkify.js":
/*!***********************************************!*\
  !*** ./node_modules/linkifyjs/lib/linkify.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.tokenize = exports.test = exports.scanner = exports.parser = exports.options = exports.inherits = exports.find = undefined;

var _class = __webpack_require__(/*! ./linkify/utils/class */ "./node_modules/linkifyjs/lib/linkify/utils/class.js");

var _options = __webpack_require__(/*! ./linkify/utils/options */ "./node_modules/linkifyjs/lib/linkify/utils/options.js");

var options = _interopRequireWildcard(_options);

var _scanner = __webpack_require__(/*! ./linkify/core/scanner */ "./node_modules/linkifyjs/lib/linkify/core/scanner.js");

var scanner = _interopRequireWildcard(_scanner);

var _parser = __webpack_require__(/*! ./linkify/core/parser */ "./node_modules/linkifyjs/lib/linkify/core/parser.js");

var parser = _interopRequireWildcard(_parser);

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};

    if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }

    newObj.default = obj;
    return newObj;
  }
}

if (!Array.isArray) {
  Array.isArray = function (arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
  };
}
/**
	Converts a string into tokens that represent linkable and non-linkable bits
	@method tokenize
	@param {String} str
	@return {Array} tokens
*/


var tokenize = function tokenize(str) {
  return parser.run(scanner.run(str));
};
/**
	Returns a list of linkable items in the given string.
*/


var find = function find(str) {
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var tokens = tokenize(str);
  var filtered = [];

  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i];

    if (token.isLink && (!type || token.type === type)) {
      filtered.push(token.toObject());
    }
  }

  return filtered;
};
/**
	Is the given string valid linkable text of some sort
	Note that this does not trim the text for you.

	Optionally pass in a second `type` param, which is the type of link to test
	for.

	For example,

		test(str, 'email');

	Will return `true` if str is a valid email.
*/


var test = function test(str) {
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var tokens = tokenize(str);
  return tokens.length === 1 && tokens[0].isLink && (!type || tokens[0].type === type);
}; // Scanner and parser provide states and tokens for the lexicographic stage
// (will be used to add additional link types)


exports.find = find;
exports.inherits = _class.inherits;
exports.options = options;
exports.parser = parser;
exports.scanner = scanner;
exports.test = test;
exports.tokenize = tokenize;

/***/ }),

/***/ "./node_modules/linkifyjs/lib/linkify/core/parser.js":
/*!***********************************************************!*\
  !*** ./node_modules/linkifyjs/lib/linkify/core/parser.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.start = exports.run = exports.TOKENS = exports.State = undefined;

var _state = __webpack_require__(/*! ./state */ "./node_modules/linkifyjs/lib/linkify/core/state.js");

var _multi = __webpack_require__(/*! ./tokens/multi */ "./node_modules/linkifyjs/lib/linkify/core/tokens/multi.js");

var MULTI_TOKENS = _interopRequireWildcard(_multi);

var _text = __webpack_require__(/*! ./tokens/text */ "./node_modules/linkifyjs/lib/linkify/core/tokens/text.js");

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};

    if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }

    newObj.default = obj;
    return newObj;
  }
}
/**
	Not exactly parser, more like the second-stage scanner (although we can
	theoretically hotswap the code here with a real parser in the future... but
	for a little URL-finding utility abstract syntax trees may be a little
	overkill).

	URL format: http://en.wikipedia.org/wiki/URI_scheme
	Email format: http://en.wikipedia.org/wiki/Email_address (links to RFC in
	reference)

	@module linkify
	@submodule parser
	@main parser
*/


var makeState = function makeState(tokenClass) {
  return new _state.TokenState(tokenClass);
}; // The universal starting state.


var S_START = makeState(); // Intermediate states for URLs. Note that domains that begin with a protocol
// are treated slighly differently from those that don't.

var S_PROTOCOL = makeState(); // e.g., 'http:'

var S_MAILTO = makeState(); // 'mailto:'

var S_PROTOCOL_SLASH = makeState(); // e.g., '/', 'http:/''

var S_PROTOCOL_SLASH_SLASH = makeState(); // e.g., '//', 'http://'

var S_DOMAIN = makeState(); // parsed string ends with a potential domain name (A)

var S_DOMAIN_DOT = makeState(); // (A) domain followed by DOT

var S_TLD = makeState(_multi.URL); // (A) Simplest possible URL with no query string

var S_TLD_COLON = makeState(); // (A) URL followed by colon (potential port number here)

var S_TLD_PORT = makeState(_multi.URL); // TLD followed by a port number

var S_URL = makeState(_multi.URL); // Long URL with optional port and maybe query string

var S_URL_NON_ACCEPTING = makeState(); // URL followed by some symbols (will not be part of the final URL)

var S_URL_OPENBRACE = makeState(); // URL followed by {

var S_URL_OPENBRACKET = makeState(); // URL followed by [

var S_URL_OPENANGLEBRACKET = makeState(); // URL followed by <

var S_URL_OPENPAREN = makeState(); // URL followed by (

var S_URL_OPENBRACE_Q = makeState(_multi.URL); // URL followed by { and some symbols that the URL can end it

var S_URL_OPENBRACKET_Q = makeState(_multi.URL); // URL followed by [ and some symbols that the URL can end it

var S_URL_OPENANGLEBRACKET_Q = makeState(_multi.URL); // URL followed by < and some symbols that the URL can end it

var S_URL_OPENPAREN_Q = makeState(_multi.URL); // URL followed by ( and some symbols that the URL can end it

var S_URL_OPENBRACE_SYMS = makeState(); // S_URL_OPENBRACE_Q followed by some symbols it cannot end it

var S_URL_OPENBRACKET_SYMS = makeState(); // S_URL_OPENBRACKET_Q followed by some symbols it cannot end it

var S_URL_OPENANGLEBRACKET_SYMS = makeState(); // S_URL_OPENANGLEBRACKET_Q followed by some symbols it cannot end it

var S_URL_OPENPAREN_SYMS = makeState(); // S_URL_OPENPAREN_Q followed by some symbols it cannot end it

var S_EMAIL_DOMAIN = makeState(); // parsed string starts with local email info + @ with a potential domain name (C)

var S_EMAIL_DOMAIN_DOT = makeState(); // (C) domain followed by DOT

var S_EMAIL = makeState(_multi.EMAIL); // (C) Possible email address (could have more tlds)

var S_EMAIL_COLON = makeState(); // (C) URL followed by colon (potential port number here)

var S_EMAIL_PORT = makeState(_multi.EMAIL); // (C) Email address with a port

var S_MAILTO_EMAIL = makeState(_multi.MAILTOEMAIL); // Email that begins with the mailto prefix (D)

var S_MAILTO_EMAIL_NON_ACCEPTING = makeState(); // (D) Followed by some non-query string chars

var S_LOCALPART = makeState(); // Local part of the email address

var S_LOCALPART_AT = makeState(); // Local part of the email address plus @

var S_LOCALPART_DOT = makeState(); // Local part of the email address plus '.' (localpart cannot end in .)

var S_NL = makeState(_multi.NL); // single new line
// Make path from start to protocol (with '//')

S_START.on(_text.NL, S_NL).on(_text.PROTOCOL, S_PROTOCOL).on(_text.MAILTO, S_MAILTO).on(_text.SLASH, S_PROTOCOL_SLASH);
S_PROTOCOL.on(_text.SLASH, S_PROTOCOL_SLASH);
S_PROTOCOL_SLASH.on(_text.SLASH, S_PROTOCOL_SLASH_SLASH); // The very first potential domain name

S_START.on(_text.TLD, S_DOMAIN).on(_text.DOMAIN, S_DOMAIN).on(_text.LOCALHOST, S_TLD).on(_text.NUM, S_DOMAIN); // Force URL for protocol followed by anything sane

S_PROTOCOL_SLASH_SLASH.on(_text.TLD, S_URL).on(_text.DOMAIN, S_URL).on(_text.NUM, S_URL).on(_text.LOCALHOST, S_URL); // Account for dots and hyphens
// hyphens are usually parts of domain names

S_DOMAIN.on(_text.DOT, S_DOMAIN_DOT);
S_EMAIL_DOMAIN.on(_text.DOT, S_EMAIL_DOMAIN_DOT); // Hyphen can jump back to a domain name
// After the first domain and a dot, we can find either a URL or another domain

S_DOMAIN_DOT.on(_text.TLD, S_TLD).on(_text.DOMAIN, S_DOMAIN).on(_text.NUM, S_DOMAIN).on(_text.LOCALHOST, S_DOMAIN);
S_EMAIL_DOMAIN_DOT.on(_text.TLD, S_EMAIL).on(_text.DOMAIN, S_EMAIL_DOMAIN).on(_text.NUM, S_EMAIL_DOMAIN).on(_text.LOCALHOST, S_EMAIL_DOMAIN); // S_TLD accepts! But the URL could be longer, try to find a match greedily
// The `run` function should be able to "rollback" to the accepting state

S_TLD.on(_text.DOT, S_DOMAIN_DOT);
S_EMAIL.on(_text.DOT, S_EMAIL_DOMAIN_DOT); // Become real URLs after `SLASH` or `COLON NUM SLASH`
// Here PSS and non-PSS converge

S_TLD.on(_text.COLON, S_TLD_COLON).on(_text.SLASH, S_URL);
S_TLD_COLON.on(_text.NUM, S_TLD_PORT);
S_TLD_PORT.on(_text.SLASH, S_URL);
S_EMAIL.on(_text.COLON, S_EMAIL_COLON);
S_EMAIL_COLON.on(_text.NUM, S_EMAIL_PORT); // Types of characters the URL can definitely end in

var qsAccepting = [_text.DOMAIN, _text.AT, _text.LOCALHOST, _text.NUM, _text.PLUS, _text.POUND, _text.PROTOCOL, _text.SLASH, _text.TLD, _text.UNDERSCORE, _text.SYM, _text.AMPERSAND]; // Types of tokens that can follow a URL and be part of the query string
// but cannot be the very last characters
// Characters that cannot appear in the URL at all should be excluded

var qsNonAccepting = [_text.COLON, _text.DOT, _text.QUERY, _text.PUNCTUATION, _text.CLOSEBRACE, _text.CLOSEBRACKET, _text.CLOSEANGLEBRACKET, _text.CLOSEPAREN, _text.OPENBRACE, _text.OPENBRACKET, _text.OPENANGLEBRACKET, _text.OPENPAREN]; // These states are responsible primarily for determining whether or not to
// include the final round bracket.
// URL, followed by an opening bracket

S_URL.on(_text.OPENBRACE, S_URL_OPENBRACE).on(_text.OPENBRACKET, S_URL_OPENBRACKET).on(_text.OPENANGLEBRACKET, S_URL_OPENANGLEBRACKET).on(_text.OPENPAREN, S_URL_OPENPAREN); // URL with extra symbols at the end, followed by an opening bracket

S_URL_NON_ACCEPTING.on(_text.OPENBRACE, S_URL_OPENBRACE).on(_text.OPENBRACKET, S_URL_OPENBRACKET).on(_text.OPENANGLEBRACKET, S_URL_OPENANGLEBRACKET).on(_text.OPENPAREN, S_URL_OPENPAREN); // Closing bracket component. This character WILL be included in the URL

S_URL_OPENBRACE.on(_text.CLOSEBRACE, S_URL);
S_URL_OPENBRACKET.on(_text.CLOSEBRACKET, S_URL);
S_URL_OPENANGLEBRACKET.on(_text.CLOSEANGLEBRACKET, S_URL);
S_URL_OPENPAREN.on(_text.CLOSEPAREN, S_URL);
S_URL_OPENBRACE_Q.on(_text.CLOSEBRACE, S_URL);
S_URL_OPENBRACKET_Q.on(_text.CLOSEBRACKET, S_URL);
S_URL_OPENANGLEBRACKET_Q.on(_text.CLOSEANGLEBRACKET, S_URL);
S_URL_OPENPAREN_Q.on(_text.CLOSEPAREN, S_URL);
S_URL_OPENBRACE_SYMS.on(_text.CLOSEBRACE, S_URL);
S_URL_OPENBRACKET_SYMS.on(_text.CLOSEBRACKET, S_URL);
S_URL_OPENANGLEBRACKET_SYMS.on(_text.CLOSEANGLEBRACKET, S_URL);
S_URL_OPENPAREN_SYMS.on(_text.CLOSEPAREN, S_URL); // URL that beings with an opening bracket, followed by a symbols.
// Note that the final state can still be `S_URL_OPENBRACE_Q` (if the URL only
// has a single opening bracket for some reason).

S_URL_OPENBRACE.on(qsAccepting, S_URL_OPENBRACE_Q);
S_URL_OPENBRACKET.on(qsAccepting, S_URL_OPENBRACKET_Q);
S_URL_OPENANGLEBRACKET.on(qsAccepting, S_URL_OPENANGLEBRACKET_Q);
S_URL_OPENPAREN.on(qsAccepting, S_URL_OPENPAREN_Q);
S_URL_OPENBRACE.on(qsNonAccepting, S_URL_OPENBRACE_SYMS);
S_URL_OPENBRACKET.on(qsNonAccepting, S_URL_OPENBRACKET_SYMS);
S_URL_OPENANGLEBRACKET.on(qsNonAccepting, S_URL_OPENANGLEBRACKET_SYMS);
S_URL_OPENPAREN.on(qsNonAccepting, S_URL_OPENPAREN_SYMS); // URL that begins with an opening bracket, followed by some symbols

S_URL_OPENBRACE_Q.on(qsAccepting, S_URL_OPENBRACE_Q);
S_URL_OPENBRACKET_Q.on(qsAccepting, S_URL_OPENBRACKET_Q);
S_URL_OPENANGLEBRACKET_Q.on(qsAccepting, S_URL_OPENANGLEBRACKET_Q);
S_URL_OPENPAREN_Q.on(qsAccepting, S_URL_OPENPAREN_Q);
S_URL_OPENBRACE_Q.on(qsNonAccepting, S_URL_OPENBRACE_Q);
S_URL_OPENBRACKET_Q.on(qsNonAccepting, S_URL_OPENBRACKET_Q);
S_URL_OPENANGLEBRACKET_Q.on(qsNonAccepting, S_URL_OPENANGLEBRACKET_Q);
S_URL_OPENPAREN_Q.on(qsNonAccepting, S_URL_OPENPAREN_Q);
S_URL_OPENBRACE_SYMS.on(qsAccepting, S_URL_OPENBRACE_Q);
S_URL_OPENBRACKET_SYMS.on(qsAccepting, S_URL_OPENBRACKET_Q);
S_URL_OPENANGLEBRACKET_SYMS.on(qsAccepting, S_URL_OPENANGLEBRACKET_Q);
S_URL_OPENPAREN_SYMS.on(qsAccepting, S_URL_OPENPAREN_Q);
S_URL_OPENBRACE_SYMS.on(qsNonAccepting, S_URL_OPENBRACE_SYMS);
S_URL_OPENBRACKET_SYMS.on(qsNonAccepting, S_URL_OPENBRACKET_SYMS);
S_URL_OPENANGLEBRACKET_SYMS.on(qsNonAccepting, S_URL_OPENANGLEBRACKET_SYMS);
S_URL_OPENPAREN_SYMS.on(qsNonAccepting, S_URL_OPENPAREN_SYMS); // Account for the query string

S_URL.on(qsAccepting, S_URL);
S_URL_NON_ACCEPTING.on(qsAccepting, S_URL);
S_URL.on(qsNonAccepting, S_URL_NON_ACCEPTING);
S_URL_NON_ACCEPTING.on(qsNonAccepting, S_URL_NON_ACCEPTING); // Email address-specific state definitions
// Note: We are not allowing '/' in email addresses since this would interfere
// with real URLs
// For addresses with the mailto prefix
// 'mailto:' followed by anything sane is a valid email

S_MAILTO.on(_text.TLD, S_MAILTO_EMAIL).on(_text.DOMAIN, S_MAILTO_EMAIL).on(_text.NUM, S_MAILTO_EMAIL).on(_text.LOCALHOST, S_MAILTO_EMAIL); // Greedily get more potential valid email values

S_MAILTO_EMAIL.on(qsAccepting, S_MAILTO_EMAIL).on(qsNonAccepting, S_MAILTO_EMAIL_NON_ACCEPTING);
S_MAILTO_EMAIL_NON_ACCEPTING.on(qsAccepting, S_MAILTO_EMAIL).on(qsNonAccepting, S_MAILTO_EMAIL_NON_ACCEPTING); // For addresses without the mailto prefix
// Tokens allowed in the localpart of the email

var localpartAccepting = [_text.DOMAIN, _text.NUM, _text.PLUS, _text.POUND, _text.QUERY, _text.UNDERSCORE, _text.SYM, _text.AMPERSAND, _text.TLD]; // Some of the tokens in `localpartAccepting` are already accounted for here and
// will not be overwritten (don't worry)

S_DOMAIN.on(localpartAccepting, S_LOCALPART).on(_text.AT, S_LOCALPART_AT);
S_TLD.on(localpartAccepting, S_LOCALPART).on(_text.AT, S_LOCALPART_AT);
S_DOMAIN_DOT.on(localpartAccepting, S_LOCALPART); // Okay we're on a localpart. Now what?
// TODO: IP addresses and what if the email starts with numbers?

S_LOCALPART.on(localpartAccepting, S_LOCALPART).on(_text.AT, S_LOCALPART_AT) // close to an email address now
.on(_text.DOT, S_LOCALPART_DOT);
S_LOCALPART_DOT.on(localpartAccepting, S_LOCALPART);
S_LOCALPART_AT.on(_text.TLD, S_EMAIL_DOMAIN).on(_text.DOMAIN, S_EMAIL_DOMAIN).on(_text.LOCALHOST, S_EMAIL); // States following `@` defined above

var run = function run(tokens) {
  var len = tokens.length;
  var cursor = 0;
  var multis = [];
  var textTokens = [];

  while (cursor < len) {
    var state = S_START;
    var secondState = null;
    var nextState = null;
    var multiLength = 0;
    var latestAccepting = null;
    var sinceAccepts = -1;

    while (cursor < len && !(secondState = state.next(tokens[cursor]))) {
      // Starting tokens with nowhere to jump to.
      // Consider these to be just plain text
      textTokens.push(tokens[cursor++]);
    }

    while (cursor < len && (nextState = secondState || state.next(tokens[cursor]))) {
      // Get the next state
      secondState = null;
      state = nextState; // Keep track of the latest accepting state

      if (state.accepts()) {
        sinceAccepts = 0;
        latestAccepting = state;
      } else if (sinceAccepts >= 0) {
        sinceAccepts++;
      }

      cursor++;
      multiLength++;
    }

    if (sinceAccepts < 0) {
      // No accepting state was found, part of a regular text token
      // Add all the tokens we looked at to the text tokens array
      for (var i = cursor - multiLength; i < cursor; i++) {
        textTokens.push(tokens[i]);
      }
    } else {
      // Accepting state!
      // First close off the textTokens (if available)
      if (textTokens.length > 0) {
        multis.push(new _multi.TEXT(textTokens));
        textTokens = [];
      } // Roll back to the latest accepting state


      cursor -= sinceAccepts;
      multiLength -= sinceAccepts; // Create a new multitoken

      var MULTI = latestAccepting.emit();
      multis.push(new MULTI(tokens.slice(cursor - multiLength, cursor)));
    }
  } // Finally close off the textTokens (if available)


  if (textTokens.length > 0) {
    multis.push(new _multi.TEXT(textTokens));
  }

  return multis;
};

exports.State = _state.TokenState;
exports.TOKENS = MULTI_TOKENS;
exports.run = run;
exports.start = S_START;

/***/ }),

/***/ "./node_modules/linkifyjs/lib/linkify/core/scanner.js":
/*!************************************************************!*\
  !*** ./node_modules/linkifyjs/lib/linkify/core/scanner.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.start = exports.run = exports.TOKENS = exports.State = undefined;

var _state = __webpack_require__(/*! ./state */ "./node_modules/linkifyjs/lib/linkify/core/state.js");

var _text = __webpack_require__(/*! ./tokens/text */ "./node_modules/linkifyjs/lib/linkify/core/tokens/text.js");

var TOKENS = _interopRequireWildcard(_text);

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};

    if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }

    newObj.default = obj;
    return newObj;
  }
}

var tlds = 'aaa|aarp|abarth|abb|abbott|abbvie|abc|able|abogado|abudhabi|ac|academy|accenture|accountant|accountants|aco|active|actor|ad|adac|ads|adult|ae|aeg|aero|aetna|af|afamilycompany|afl|africa|ag|agakhan|agency|ai|aig|aigo|airbus|airforce|airtel|akdn|al|alfaromeo|alibaba|alipay|allfinanz|allstate|ally|alsace|alstom|am|americanexpress|americanfamily|amex|amfam|amica|amsterdam|analytics|android|anquan|anz|ao|aol|apartments|app|apple|aq|aquarelle|ar|arab|aramco|archi|army|arpa|art|arte|as|asda|asia|associates|at|athleta|attorney|au|auction|audi|audible|audio|auspost|author|auto|autos|avianca|aw|aws|ax|axa|az|azure|ba|baby|baidu|banamex|bananarepublic|band|bank|bar|barcelona|barclaycard|barclays|barefoot|bargains|baseball|basketball|bauhaus|bayern|bb|bbc|bbt|bbva|bcg|bcn|bd|be|beats|beauty|beer|bentley|berlin|best|bestbuy|bet|bf|bg|bh|bharti|bi|bible|bid|bike|bing|bingo|bio|biz|bj|black|blackfriday|blanco|blockbuster|blog|bloomberg|blue|bm|bms|bmw|bn|bnl|bnpparibas|bo|boats|boehringer|bofa|bom|bond|boo|book|booking|boots|bosch|bostik|boston|bot|boutique|box|br|bradesco|bridgestone|broadway|broker|brother|brussels|bs|bt|budapest|bugatti|build|builders|business|buy|buzz|bv|bw|by|bz|bzh|ca|cab|cafe|cal|call|calvinklein|cam|camera|camp|cancerresearch|canon|capetown|capital|capitalone|car|caravan|cards|care|career|careers|cars|cartier|casa|case|caseih|cash|casino|cat|catering|catholic|cba|cbn|cbre|cbs|cc|cd|ceb|center|ceo|cern|cf|cfa|cfd|cg|ch|chanel|channel|chase|chat|cheap|chintai|chloe|christmas|chrome|chrysler|church|ci|cipriani|circle|cisco|citadel|citi|citic|city|cityeats|ck|cl|claims|cleaning|click|clinic|clinique|clothing|cloud|club|clubmed|cm|cn|co|coach|codes|coffee|college|cologne|com|comcast|commbank|community|company|compare|computer|comsec|condos|construction|consulting|contact|contractors|cooking|cookingchannel|cool|coop|corsica|country|coupon|coupons|courses|cr|credit|creditcard|creditunion|cricket|crown|crs|cruise|cruises|csc|cu|cuisinella|cv|cw|cx|cy|cymru|cyou|cz|dabur|dad|dance|data|date|dating|datsun|day|dclk|dds|de|deal|dealer|deals|degree|delivery|dell|deloitte|delta|democrat|dental|dentist|desi|design|dev|dhl|diamonds|diet|digital|direct|directory|discount|discover|dish|diy|dj|dk|dm|dnp|do|docs|doctor|dodge|dog|doha|domains|dot|download|drive|dtv|dubai|duck|dunlop|duns|dupont|durban|dvag|dvr|dz|earth|eat|ec|eco|edeka|edu|education|ee|eg|email|emerck|energy|engineer|engineering|enterprises|epost|epson|equipment|er|ericsson|erni|es|esq|estate|esurance|et|etisalat|eu|eurovision|eus|events|everbank|exchange|expert|exposed|express|extraspace|fage|fail|fairwinds|faith|family|fan|fans|farm|farmers|fashion|fast|fedex|feedback|ferrari|ferrero|fi|fiat|fidelity|fido|film|final|finance|financial|fire|firestone|firmdale|fish|fishing|fit|fitness|fj|fk|flickr|flights|flir|florist|flowers|fly|fm|fo|foo|food|foodnetwork|football|ford|forex|forsale|forum|foundation|fox|fr|free|fresenius|frl|frogans|frontdoor|frontier|ftr|fujitsu|fujixerox|fun|fund|furniture|futbol|fyi|ga|gal|gallery|gallo|gallup|game|games|gap|garden|gb|gbiz|gd|gdn|ge|gea|gent|genting|george|gf|gg|ggee|gh|gi|gift|gifts|gives|giving|gl|glade|glass|gle|global|globo|gm|gmail|gmbh|gmo|gmx|gn|godaddy|gold|goldpoint|golf|goo|goodhands|goodyear|goog|google|gop|got|gov|gp|gq|gr|grainger|graphics|gratis|green|gripe|grocery|group|gs|gt|gu|guardian|gucci|guge|guide|guitars|guru|gw|gy|hair|hamburg|hangout|haus|hbo|hdfc|hdfcbank|health|healthcare|help|helsinki|here|hermes|hgtv|hiphop|hisamitsu|hitachi|hiv|hk|hkt|hm|hn|hockey|holdings|holiday|homedepot|homegoods|homes|homesense|honda|honeywell|horse|hospital|host|hosting|hot|hoteles|hotels|hotmail|house|how|hr|hsbc|ht|htc|hu|hughes|hyatt|hyundai|ibm|icbc|ice|icu|id|ie|ieee|ifm|ikano|il|im|imamat|imdb|immo|immobilien|in|industries|infiniti|info|ing|ink|institute|insurance|insure|int|intel|international|intuit|investments|io|ipiranga|iq|ir|irish|is|iselect|ismaili|ist|istanbul|it|itau|itv|iveco|iwc|jaguar|java|jcb|jcp|je|jeep|jetzt|jewelry|jio|jlc|jll|jm|jmp|jnj|jo|jobs|joburg|jot|joy|jp|jpmorgan|jprs|juegos|juniper|kaufen|kddi|ke|kerryhotels|kerrylogistics|kerryproperties|kfh|kg|kh|ki|kia|kim|kinder|kindle|kitchen|kiwi|km|kn|koeln|komatsu|kosher|kp|kpmg|kpn|kr|krd|kred|kuokgroup|kw|ky|kyoto|kz|la|lacaixa|ladbrokes|lamborghini|lamer|lancaster|lancia|lancome|land|landrover|lanxess|lasalle|lat|latino|latrobe|law|lawyer|lb|lc|lds|lease|leclerc|lefrak|legal|lego|lexus|lgbt|li|liaison|lidl|life|lifeinsurance|lifestyle|lighting|like|lilly|limited|limo|lincoln|linde|link|lipsy|live|living|lixil|lk|loan|loans|locker|locus|loft|lol|london|lotte|lotto|love|lpl|lplfinancial|lr|ls|lt|ltd|ltda|lu|lundbeck|lupin|luxe|luxury|lv|ly|ma|macys|madrid|maif|maison|makeup|man|management|mango|map|market|marketing|markets|marriott|marshalls|maserati|mattel|mba|mc|mckinsey|md|me|med|media|meet|melbourne|meme|memorial|men|menu|meo|merckmsd|metlife|mg|mh|miami|microsoft|mil|mini|mint|mit|mitsubishi|mk|ml|mlb|mls|mm|mma|mn|mo|mobi|mobile|mobily|moda|moe|moi|mom|monash|money|monster|mopar|mormon|mortgage|moscow|moto|motorcycles|mov|movie|movistar|mp|mq|mr|ms|msd|mt|mtn|mtr|mu|museum|mutual|mv|mw|mx|my|mz|na|nab|nadex|nagoya|name|nationwide|natura|navy|nba|nc|ne|nec|net|netbank|netflix|network|neustar|new|newholland|news|next|nextdirect|nexus|nf|nfl|ng|ngo|nhk|ni|nico|nike|nikon|ninja|nissan|nissay|nl|no|nokia|northwesternmutual|norton|now|nowruz|nowtv|np|nr|nra|nrw|ntt|nu|nyc|nz|obi|observer|off|office|okinawa|olayan|olayangroup|oldnavy|ollo|om|omega|one|ong|onl|online|onyourside|ooo|open|oracle|orange|org|organic|origins|osaka|otsuka|ott|ovh|pa|page|panasonic|panerai|paris|pars|partners|parts|party|passagens|pay|pccw|pe|pet|pf|pfizer|pg|ph|pharmacy|phd|philips|phone|photo|photography|photos|physio|piaget|pics|pictet|pictures|pid|pin|ping|pink|pioneer|pizza|pk|pl|place|play|playstation|plumbing|plus|pm|pn|pnc|pohl|poker|politie|porn|post|pr|pramerica|praxi|press|prime|pro|prod|productions|prof|progressive|promo|properties|property|protection|pru|prudential|ps|pt|pub|pw|pwc|py|qa|qpon|quebec|quest|qvc|racing|radio|raid|re|read|realestate|realtor|realty|recipes|red|redstone|redumbrella|rehab|reise|reisen|reit|reliance|ren|rent|rentals|repair|report|republican|rest|restaurant|review|reviews|rexroth|rich|richardli|ricoh|rightathome|ril|rio|rip|rmit|ro|rocher|rocks|rodeo|rogers|room|rs|rsvp|ru|rugby|ruhr|run|rw|rwe|ryukyu|sa|saarland|safe|safety|sakura|sale|salon|samsclub|samsung|sandvik|sandvikcoromant|sanofi|sap|sapo|sarl|sas|save|saxo|sb|sbi|sbs|sc|sca|scb|schaeffler|schmidt|scholarships|school|schule|schwarz|science|scjohnson|scor|scot|sd|se|search|seat|secure|security|seek|select|sener|services|ses|seven|sew|sex|sexy|sfr|sg|sh|shangrila|sharp|shaw|shell|shia|shiksha|shoes|shop|shopping|shouji|show|showtime|shriram|si|silk|sina|singles|site|sj|sk|ski|skin|sky|skype|sl|sling|sm|smart|smile|sn|sncf|so|soccer|social|softbank|software|sohu|solar|solutions|song|sony|soy|space|spiegel|spot|spreadbetting|sr|srl|srt|st|stada|staples|star|starhub|statebank|statefarm|statoil|stc|stcgroup|stockholm|storage|store|stream|studio|study|style|su|sucks|supplies|supply|support|surf|surgery|suzuki|sv|swatch|swiftcover|swiss|sx|sy|sydney|symantec|systems|sz|tab|taipei|talk|taobao|target|tatamotors|tatar|tattoo|tax|taxi|tc|tci|td|tdk|team|tech|technology|tel|telecity|telefonica|temasek|tennis|teva|tf|tg|th|thd|theater|theatre|tiaa|tickets|tienda|tiffany|tips|tires|tirol|tj|tjmaxx|tjx|tk|tkmaxx|tl|tm|tmall|tn|to|today|tokyo|tools|top|toray|toshiba|total|tours|town|toyota|toys|tr|trade|trading|training|travel|travelchannel|travelers|travelersinsurance|trust|trv|tt|tube|tui|tunes|tushu|tv|tvs|tw|tz|ua|ubank|ubs|uconnect|ug|uk|unicom|university|uno|uol|ups|us|uy|uz|va|vacations|vana|vanguard|vc|ve|vegas|ventures|verisign|versicherung|vet|vg|vi|viajes|video|vig|viking|villas|vin|vip|virgin|visa|vision|vista|vistaprint|viva|vivo|vlaanderen|vn|vodka|volkswagen|volvo|vote|voting|voto|voyage|vu|vuelos|wales|walmart|walter|wang|wanggou|warman|watch|watches|weather|weatherchannel|webcam|weber|website|wed|wedding|weibo|weir|wf|whoswho|wien|wiki|williamhill|win|windows|wine|winners|wme|wolterskluwer|woodside|work|works|world|wow|ws|wtc|wtf|xbox|xerox|xfinity|xihuan|xin|xn--11b4c3d|xn--1ck2e1b|xn--1qqw23a|xn--2scrj9c|xn--30rr7y|xn--3bst00m|xn--3ds443g|xn--3e0b707e|xn--3hcrj9c|xn--3oq18vl8pn36a|xn--3pxu8k|xn--42c2d9a|xn--45br5cyl|xn--45brj9c|xn--45q11c|xn--4gbrim|xn--54b7fta0cc|xn--55qw42g|xn--55qx5d|xn--5su34j936bgsg|xn--5tzm5g|xn--6frz82g|xn--6qq986b3xl|xn--80adxhks|xn--80ao21a|xn--80aqecdr1a|xn--80asehdb|xn--80aswg|xn--8y0a063a|xn--90a3ac|xn--90ae|xn--90ais|xn--9dbq2a|xn--9et52u|xn--9krt00a|xn--b4w605ferd|xn--bck1b9a5dre4c|xn--c1avg|xn--c2br7g|xn--cck2b3b|xn--cg4bki|xn--clchc0ea0b2g2a9gcd|xn--czr694b|xn--czrs0t|xn--czru2d|xn--d1acj3b|xn--d1alf|xn--e1a4c|xn--eckvdtc9d|xn--efvy88h|xn--estv75g|xn--fct429k|xn--fhbei|xn--fiq228c5hs|xn--fiq64b|xn--fiqs8s|xn--fiqz9s|xn--fjq720a|xn--flw351e|xn--fpcrj9c3d|xn--fzc2c9e2c|xn--fzys8d69uvgm|xn--g2xx48c|xn--gckr3f0f|xn--gecrj9c|xn--gk3at1e|xn--h2breg3eve|xn--h2brj9c|xn--h2brj9c8c|xn--hxt814e|xn--i1b6b1a6a2e|xn--imr513n|xn--io0a7i|xn--j1aef|xn--j1amh|xn--j6w193g|xn--jlq61u9w7b|xn--jvr189m|xn--kcrx77d1x4a|xn--kprw13d|xn--kpry57d|xn--kpu716f|xn--kput3i|xn--l1acc|xn--lgbbat1ad8j|xn--mgb9awbf|xn--mgba3a3ejt|xn--mgba3a4f16a|xn--mgba7c0bbn0a|xn--mgbaakc7dvf|xn--mgbaam7a8h|xn--mgbab2bd|xn--mgbai9azgqp6j|xn--mgbayh7gpa|xn--mgbb9fbpob|xn--mgbbh1a|xn--mgbbh1a71e|xn--mgbc0a9azcg|xn--mgbca7dzdo|xn--mgberp4a5d4ar|xn--mgbgu82a|xn--mgbi4ecexp|xn--mgbpl2fh|xn--mgbt3dhd|xn--mgbtx2b|xn--mgbx4cd0ab|xn--mix891f|xn--mk1bu44c|xn--mxtq1m|xn--ngbc5azd|xn--ngbe9e0a|xn--ngbrx|xn--node|xn--nqv7f|xn--nqv7fs00ema|xn--nyqy26a|xn--o3cw4h|xn--ogbpf8fl|xn--p1acf|xn--p1ai|xn--pbt977c|xn--pgbs0dh|xn--pssy2u|xn--q9jyb4c|xn--qcka1pmc|xn--qxam|xn--rhqv96g|xn--rovu88b|xn--rvc1e0am3e|xn--s9brj9c|xn--ses554g|xn--t60b56a|xn--tckwe|xn--tiq49xqyj|xn--unup4y|xn--vermgensberater-ctb|xn--vermgensberatung-pwb|xn--vhquv|xn--vuq861b|xn--w4r85el8fhu5dnra|xn--w4rs40l|xn--wgbh1c|xn--wgbl6a|xn--xhq521b|xn--xkc2al3hye2a|xn--xkc2dl3a5ee0h|xn--y9a3aq|xn--yfro4i67o|xn--ygbi2ammx|xn--zfr164b|xperia|xxx|xyz|yachts|yahoo|yamaxun|yandex|ye|yodobashi|yoga|yokohama|you|youtube|yt|yun|za|zappos|zara|zero|zip|zippo|zm|zone|zuerich|zw'.split('|'); // macro, see gulpfile.js

/**
	The scanner provides an interface that takes a string of text as input, and
	outputs an array of tokens instances that can be used for easy URL parsing.

	@module linkify
	@submodule scanner
	@main scanner
*/

var NUMBERS = '0123456789'.split('');
var ALPHANUM = '0123456789abcdefghijklmnopqrstuvwxyz'.split('');
var WHITESPACE = [' ', '\f', '\r', '\t', '\v', '\xA0', "\u1680", "\u180E"]; // excluding line breaks

var domainStates = []; // states that jump to DOMAIN on /[a-z0-9]/

var makeState = function makeState(tokenClass) {
  return new _state.CharacterState(tokenClass);
}; // Frequently used states


var S_START = makeState();
var S_NUM = makeState(_text.NUM);
var S_DOMAIN = makeState(_text.DOMAIN);
var S_DOMAIN_HYPHEN = makeState(); // domain followed by 1 or more hyphen characters

var S_WS = makeState(_text.WS); // States for special URL symbols

S_START.on('@', makeState(_text.AT)).on('.', makeState(_text.DOT)).on('+', makeState(_text.PLUS)).on('#', makeState(_text.POUND)).on('?', makeState(_text.QUERY)).on('/', makeState(_text.SLASH)).on('_', makeState(_text.UNDERSCORE)).on(':', makeState(_text.COLON)).on('{', makeState(_text.OPENBRACE)).on('[', makeState(_text.OPENBRACKET)).on('<', makeState(_text.OPENANGLEBRACKET)).on('(', makeState(_text.OPENPAREN)).on('}', makeState(_text.CLOSEBRACE)).on(']', makeState(_text.CLOSEBRACKET)).on('>', makeState(_text.CLOSEANGLEBRACKET)).on(')', makeState(_text.CLOSEPAREN)).on('&', makeState(_text.AMPERSAND)).on([',', ';', '!', '"', '\''], makeState(_text.PUNCTUATION)); // Whitespace jumps
// Tokens of only non-newline whitespace are arbitrarily long

S_START.on('\n', makeState(_text.NL)).on(WHITESPACE, S_WS); // If any whitespace except newline, more whitespace!

S_WS.on(WHITESPACE, S_WS); // Generates states for top-level domains
// Note that this is most accurate when tlds are in alphabetical order

for (var i = 0; i < tlds.length; i++) {
  var newStates = (0, _state.stateify)(tlds[i], S_START, _text.TLD, _text.DOMAIN);
  domainStates.push.apply(domainStates, newStates);
} // Collect the states generated by different protocls


var partialProtocolFileStates = (0, _state.stateify)('file', S_START, _text.DOMAIN, _text.DOMAIN);
var partialProtocolFtpStates = (0, _state.stateify)('ftp', S_START, _text.DOMAIN, _text.DOMAIN);
var partialProtocolHttpStates = (0, _state.stateify)('http', S_START, _text.DOMAIN, _text.DOMAIN);
var partialProtocolMailtoStates = (0, _state.stateify)('mailto', S_START, _text.DOMAIN, _text.DOMAIN); // Add the states to the array of DOMAINeric states

domainStates.push.apply(domainStates, partialProtocolFileStates);
domainStates.push.apply(domainStates, partialProtocolFtpStates);
domainStates.push.apply(domainStates, partialProtocolHttpStates);
domainStates.push.apply(domainStates, partialProtocolMailtoStates); // Protocol states

var S_PROTOCOL_FILE = partialProtocolFileStates.pop();
var S_PROTOCOL_FTP = partialProtocolFtpStates.pop();
var S_PROTOCOL_HTTP = partialProtocolHttpStates.pop();
var S_MAILTO = partialProtocolMailtoStates.pop();
var S_PROTOCOL_SECURE = makeState(_text.DOMAIN);
var S_FULL_PROTOCOL = makeState(_text.PROTOCOL); // Full protocol ends with COLON

var S_FULL_MAILTO = makeState(_text.MAILTO); // Mailto ends with COLON
// Secure protocols (end with 's')

S_PROTOCOL_FTP.on('s', S_PROTOCOL_SECURE).on(':', S_FULL_PROTOCOL);
S_PROTOCOL_HTTP.on('s', S_PROTOCOL_SECURE).on(':', S_FULL_PROTOCOL);
domainStates.push(S_PROTOCOL_SECURE); // Become protocol tokens after a COLON

S_PROTOCOL_FILE.on(':', S_FULL_PROTOCOL);
S_PROTOCOL_SECURE.on(':', S_FULL_PROTOCOL);
S_MAILTO.on(':', S_FULL_MAILTO); // Localhost

var partialLocalhostStates = (0, _state.stateify)('localhost', S_START, _text.LOCALHOST, _text.DOMAIN);
domainStates.push.apply(domainStates, partialLocalhostStates); // Everything else
// DOMAINs make more DOMAINs
// Number and character transitions

S_START.on(NUMBERS, S_NUM);
S_NUM.on('-', S_DOMAIN_HYPHEN).on(NUMBERS, S_NUM).on(ALPHANUM, S_DOMAIN); // number becomes DOMAIN

S_DOMAIN.on('-', S_DOMAIN_HYPHEN).on(ALPHANUM, S_DOMAIN); // All the generated states should have a jump to DOMAIN

for (var _i = 0; _i < domainStates.length; _i++) {
  domainStates[_i].on('-', S_DOMAIN_HYPHEN).on(ALPHANUM, S_DOMAIN);
}

S_DOMAIN_HYPHEN.on('-', S_DOMAIN_HYPHEN).on(NUMBERS, S_DOMAIN).on(ALPHANUM, S_DOMAIN); // Set default transition

S_START.defaultTransition = makeState(_text.SYM);
/**
	Given a string, returns an array of TOKEN instances representing the
	composition of that string.

	@method run
	@param {String} str Input string to scan
	@return {Array} Array of TOKEN instances
*/

var run = function run(str) {
  // The state machine only looks at lowercase strings.
  // This selective `toLowerCase` is used because lowercasing the entire
  // string causes the length and character position to vary in some in some
  // non-English strings. This happens only on V8-based runtimes.
  var lowerStr = str.replace(/[A-Z]/g, function (c) {
    return c.toLowerCase();
  });
  var len = str.length;
  var tokens = []; // return value

  var cursor = 0; // Tokenize the string

  while (cursor < len) {
    var state = S_START;
    var nextState = null;
    var tokenLength = 0;
    var latestAccepting = null;
    var sinceAccepts = -1;

    while (cursor < len && (nextState = state.next(lowerStr[cursor]))) {
      state = nextState; // Keep track of the latest accepting state

      if (state.accepts()) {
        sinceAccepts = 0;
        latestAccepting = state;
      } else if (sinceAccepts >= 0) {
        sinceAccepts++;
      }

      tokenLength++;
      cursor++;
    }

    if (sinceAccepts < 0) {
      continue;
    } // Should never happen
    // Roll back to the latest accepting state


    cursor -= sinceAccepts;
    tokenLength -= sinceAccepts; // Get the class for the new token

    var TOKEN = latestAccepting.emit(); // Current token class
    // No more jumps, just make a new token

    tokens.push(new TOKEN(str.substr(cursor - tokenLength, tokenLength)));
  }

  return tokens;
};

var start = S_START;
exports.State = _state.CharacterState;
exports.TOKENS = TOKENS;
exports.run = run;
exports.start = start;

/***/ }),

/***/ "./node_modules/linkifyjs/lib/linkify/core/state.js":
/*!**********************************************************!*\
  !*** ./node_modules/linkifyjs/lib/linkify/core/state.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.stateify = exports.TokenState = exports.CharacterState = undefined;

var _class = __webpack_require__(/*! ../utils/class */ "./node_modules/linkifyjs/lib/linkify/utils/class.js");

function createStateClass() {
  return function (tClass) {
    this.j = [];
    this.T = tClass || null;
  };
}
/**
	A simple state machine that can emit token classes

	The `j` property in this class refers to state jumps. It's a
	multidimensional array where for each element:

	* index [0] is a symbol or class of symbols to transition to.
	* index [1] is a State instance which matches

	The type of symbol will depend on the target implementation for this class.
	In Linkify, we have a two-stage scanner. Each stage uses this state machine
	but with a slighly different (polymorphic) implementation.

	The `T` property refers to the token class.

	TODO: Can the `on` and `next` methods be combined?

	@class BaseState
*/


var BaseState = createStateClass();
BaseState.prototype = {
  defaultTransition: false,

  /**
  	@method constructor
  	@param {Class} tClass Pass in the kind of token to emit if there are
  		no jumps after this state and the state is accepting.
  */

  /**
  	On the given symbol(s), this machine should go to the given state
  		@method on
  	@param {Array|Mixed} symbol
  	@param {BaseState} state Note that the type of this state should be the
  		same as the current instance (i.e., don't pass in a different
  		subclass)
  */
  on: function on(symbol, state) {
    if (symbol instanceof Array) {
      for (var i = 0; i < symbol.length; i++) {
        this.j.push([symbol[i], state]);
      }

      return this;
    }

    this.j.push([symbol, state]);
    return this;
  },

  /**
  	Given the next item, returns next state for that item
  	@method next
  	@param {Mixed} item Should be an instance of the symbols handled by
  		this particular machine.
  	@return {State} state Returns false if no jumps are available
  */
  next: function next(item) {
    for (var i = 0; i < this.j.length; i++) {
      var jump = this.j[i];
      var symbol = jump[0]; // Next item to check for

      var state = jump[1]; // State to jump to if items match
      // compare item with symbol

      if (this.test(item, symbol)) {
        return state;
      }
    } // Nowhere left to jump!


    return this.defaultTransition;
  },

  /**
  	Does this state accept?
  	`true` only of `this.T` exists
  		@method accepts
  	@return {Boolean}
  */
  accepts: function accepts() {
    return !!this.T;
  },

  /**
  	Determine whether a given item "symbolizes" the symbol, where symbol is
  	a class of items handled by this state machine.
  		This method should be overriden in extended classes.
  		@method test
  	@param {Mixed} item Does this item match the given symbol?
  	@param {Mixed} symbol
  	@return {Boolean}
  */
  test: function test(item, symbol) {
    return item === symbol;
  },

  /**
  	Emit the token for this State (just return it in this case)
  	If this emits a token, this instance is an accepting state
  	@method emit
  	@return {Class} T
  */
  emit: function emit() {
    return this.T;
  }
};
/**
	State machine for string-based input

	@class CharacterState
	@extends BaseState
*/

var CharacterState = (0, _class.inherits)(BaseState, createStateClass(), {
  /**
  	Does the given character match the given character or regular
  	expression?
  		@method test
  	@param {String} char
  	@param {String|RegExp} charOrRegExp
  	@return {Boolean}
  */
  test: function test(character, charOrRegExp) {
    return character === charOrRegExp || charOrRegExp instanceof RegExp && charOrRegExp.test(character);
  }
});
/**
	State machine for input in the form of TextTokens

	@class TokenState
	@extends BaseState
*/

var TokenState = (0, _class.inherits)(BaseState, createStateClass(), {
  /**
   * Similar to `on`, but returns the state the results in the transition from
   * the given item
   * @method jump
   * @param {Mixed} item
   * @param {Token} [token]
   * @return state
   */
  jump: function jump(token) {
    var tClass = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var state = this.next(new token('')); // dummy temp token

    if (state === this.defaultTransition) {
      // Make a new state!
      state = new this.constructor(tClass);
      this.on(token, state);
    } else if (tClass) {
      state.T = tClass;
    }

    return state;
  },

  /**
  	Is the given token an instance of the given token class?
  		@method test
  	@param {TextToken} token
  	@param {Class} tokenClass
  	@return {Boolean}
  */
  test: function test(token, tokenClass) {
    return token instanceof tokenClass;
  }
});
/**
	Given a non-empty target string, generates states (if required) for each
	consecutive substring of characters in str starting from the beginning of
	the string. The final state will have a special value, as specified in
	options. All other "in between" substrings will have a default end state.

	This turns the state machine into a Trie-like data structure (rather than a
	intelligently-designed DFA).

	Note that I haven't really tried these with any strings other than
	DOMAIN.

	@param {String} str
	@param {CharacterState} start State to jump from the first character
	@param {Class} endToken Token class to emit when the given string has been
		matched and no more jumps exist.
	@param {Class} defaultToken "Filler token", or which token type to emit when
		we don't have a full match
	@return {Array} list of newly-created states
*/

function stateify(str, start, endToken, defaultToken) {
  var i = 0,
      len = str.length,
      state = start,
      newStates = [],
      nextState = void 0; // Find the next state without a jump to the next character

  while (i < len && (nextState = state.next(str[i]))) {
    state = nextState;
    i++;
  }

  if (i >= len) {
    return [];
  } // no new tokens were added


  while (i < len - 1) {
    nextState = new CharacterState(defaultToken);
    newStates.push(nextState);
    state.on(str[i], nextState);
    state = nextState;
    i++;
  }

  nextState = new CharacterState(endToken);
  newStates.push(nextState);
  state.on(str[len - 1], nextState);
  return newStates;
}

exports.CharacterState = CharacterState;
exports.TokenState = TokenState;
exports.stateify = stateify;

/***/ }),

/***/ "./node_modules/linkifyjs/lib/linkify/core/tokens/create-token-class.js":
/*!******************************************************************************!*\
  !*** ./node_modules/linkifyjs/lib/linkify/core/tokens/create-token-class.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

function createTokenClass() {
  return function (value) {
    if (value) {
      this.v = value;
    }
  };
}

exports.createTokenClass = createTokenClass;

/***/ }),

/***/ "./node_modules/linkifyjs/lib/linkify/core/tokens/multi.js":
/*!*****************************************************************!*\
  !*** ./node_modules/linkifyjs/lib/linkify/core/tokens/multi.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.URL = exports.TEXT = exports.NL = exports.EMAIL = exports.MAILTOEMAIL = exports.Base = undefined;

var _createTokenClass = __webpack_require__(/*! ./create-token-class */ "./node_modules/linkifyjs/lib/linkify/core/tokens/create-token-class.js");

var _class = __webpack_require__(/*! ../../utils/class */ "./node_modules/linkifyjs/lib/linkify/utils/class.js");

var _text = __webpack_require__(/*! ./text */ "./node_modules/linkifyjs/lib/linkify/core/tokens/text.js");
/******************************************************************************
	Multi-Tokens
	Tokens composed of arrays of TextTokens
******************************************************************************/
// Is the given token a valid domain token?
// Should nums be included here?


function isDomainToken(token) {
  return token instanceof _text.DOMAIN || token instanceof _text.TLD;
}
/**
	Abstract class used for manufacturing tokens of text tokens. That is rather
	than the value for a token being a small string of text, it's value an array
	of text tokens.

	Used for grouping together URLs, emails, hashtags, and other potential
	creations.

	@class MultiToken
	@abstract
*/


var MultiToken = (0, _createTokenClass.createTokenClass)();
MultiToken.prototype = {
  /**
  	String representing the type for this token
  	@property type
  	@default 'TOKEN'
  */
  type: 'token',

  /**
  	Is this multitoken a link?
  	@property isLink
  	@default false
  */
  isLink: false,

  /**
  	Return the string this token represents.
  	@method toString
  	@return {String}
  */
  toString: function toString() {
    var result = [];

    for (var i = 0; i < this.v.length; i++) {
      result.push(this.v[i].toString());
    }

    return result.join('');
  },

  /**
  	What should the value for this token be in the `href` HTML attribute?
  	Returns the `.toString` value by default.
  		@method toHref
  	@return {String}
  */
  toHref: function toHref() {
    return this.toString();
  },

  /**
  	Returns a hash of relevant values for this token, which includes keys
  	* type - Kind of token ('url', 'email', etc.)
  	* value - Original text
  	* href - The value that should be added to the anchor tag's href
  		attribute
  		@method toObject
  	@param {String} [protocol] `'http'` by default
  	@return {Object}
  */
  toObject: function toObject() {
    var protocol = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'http';
    return {
      type: this.type,
      value: this.toString(),
      href: this.toHref(protocol)
    };
  }
};
/**
	Represents an arbitrarily mailto email address with the prefix included
	@class MAILTO
	@extends MultiToken
*/

var MAILTOEMAIL = (0, _class.inherits)(MultiToken, (0, _createTokenClass.createTokenClass)(), {
  type: 'email',
  isLink: true
});
/**
	Represents a list of tokens making up a valid email address
	@class EMAIL
	@extends MultiToken
*/

var EMAIL = (0, _class.inherits)(MultiToken, (0, _createTokenClass.createTokenClass)(), {
  type: 'email',
  isLink: true,
  toHref: function toHref() {
    return 'mailto:' + this.toString();
  }
});
/**
	Represents some plain text
	@class TEXT
	@extends MultiToken
*/

var TEXT = (0, _class.inherits)(MultiToken, (0, _createTokenClass.createTokenClass)(), {
  type: 'text'
});
/**
	Multi-linebreak token - represents a line break
	@class NL
	@extends MultiToken
*/

var NL = (0, _class.inherits)(MultiToken, (0, _createTokenClass.createTokenClass)(), {
  type: 'nl'
});
/**
	Represents a list of tokens making up a valid URL
	@class URL
	@extends MultiToken
*/

var URL = (0, _class.inherits)(MultiToken, (0, _createTokenClass.createTokenClass)(), {
  type: 'url',
  isLink: true,

  /**
  	Lowercases relevant parts of the domain and adds the protocol if
  	required. Note that this will not escape unsafe HTML characters in the
  	URL.
  		@method href
  	@param {String} protocol
  	@return {String}
  */
  toHref: function toHref() {
    var protocol = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'http';
    var hasProtocol = false;
    var hasSlashSlash = false;
    var tokens = this.v;
    var result = [];
    var i = 0; // Make the first part of the domain lowercase
    // Lowercase protocol

    while (tokens[i] instanceof _text.PROTOCOL) {
      hasProtocol = true;
      result.push(tokens[i].toString().toLowerCase());
      i++;
    } // Skip slash-slash


    while (tokens[i] instanceof _text.SLASH) {
      hasSlashSlash = true;
      result.push(tokens[i].toString());
      i++;
    } // Lowercase all other characters in the domain


    while (isDomainToken(tokens[i])) {
      result.push(tokens[i].toString().toLowerCase());
      i++;
    } // Leave all other characters as they were written


    for (; i < tokens.length; i++) {
      result.push(tokens[i].toString());
    }

    result = result.join('');

    if (!(hasProtocol || hasSlashSlash)) {
      result = protocol + '://' + result;
    }

    return result;
  },
  hasProtocol: function hasProtocol() {
    return this.v[0] instanceof _text.PROTOCOL;
  }
});
exports.Base = MultiToken;
exports.MAILTOEMAIL = MAILTOEMAIL;
exports.EMAIL = EMAIL;
exports.NL = NL;
exports.TEXT = TEXT;
exports.URL = URL;

/***/ }),

/***/ "./node_modules/linkifyjs/lib/linkify/core/tokens/text.js":
/*!****************************************************************!*\
  !*** ./node_modules/linkifyjs/lib/linkify/core/tokens/text.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.AMPERSAND = exports.CLOSEPAREN = exports.CLOSEANGLEBRACKET = exports.CLOSEBRACKET = exports.CLOSEBRACE = exports.OPENPAREN = exports.OPENANGLEBRACKET = exports.OPENBRACKET = exports.OPENBRACE = exports.WS = exports.TLD = exports.SYM = exports.UNDERSCORE = exports.SLASH = exports.MAILTO = exports.PROTOCOL = exports.QUERY = exports.POUND = exports.PLUS = exports.NUM = exports.NL = exports.LOCALHOST = exports.PUNCTUATION = exports.DOT = exports.COLON = exports.AT = exports.DOMAIN = exports.Base = undefined;

var _createTokenClass = __webpack_require__(/*! ./create-token-class */ "./node_modules/linkifyjs/lib/linkify/core/tokens/create-token-class.js");

var _class = __webpack_require__(/*! ../../utils/class */ "./node_modules/linkifyjs/lib/linkify/utils/class.js");
/******************************************************************************
	Text Tokens
	Tokens composed of strings
******************************************************************************/

/**
	Abstract class used for manufacturing text tokens.
	Pass in the value this token represents

	@class TextToken
	@abstract
*/


var TextToken = (0, _createTokenClass.createTokenClass)();
TextToken.prototype = {
  toString: function toString() {
    return this.v + '';
  }
};

function inheritsToken(value) {
  var props = value ? {
    v: value
  } : {};
  return (0, _class.inherits)(TextToken, (0, _createTokenClass.createTokenClass)(), props);
}
/**
	A valid domain token
	@class DOMAIN
	@extends TextToken
*/


var DOMAIN = inheritsToken();
/**
	@class AT
	@extends TextToken
*/

var AT = inheritsToken('@');
/**
	Represents a single colon `:` character

	@class COLON
	@extends TextToken
*/

var COLON = inheritsToken(':');
/**
	@class DOT
	@extends TextToken
*/

var DOT = inheritsToken('.');
/**
	A character class that can surround the URL, but which the URL cannot begin
	or end with. Does not include certain English punctuation like parentheses.

	@class PUNCTUATION
	@extends TextToken
*/

var PUNCTUATION = inheritsToken();
/**
	The word localhost (by itself)
	@class LOCALHOST
	@extends TextToken
*/

var LOCALHOST = inheritsToken();
/**
	Newline token
	@class NL
	@extends TextToken
*/

var NL = inheritsToken('\n');
/**
	@class NUM
	@extends TextToken
*/

var NUM = inheritsToken();
/**
	@class PLUS
	@extends TextToken
*/

var PLUS = inheritsToken('+');
/**
	@class POUND
	@extends TextToken
*/

var POUND = inheritsToken('#');
/**
	Represents a web URL protocol. Supported types include

	* `http:`
	* `https:`
	* `ftp:`
	* `ftps:`

	@class PROTOCOL
	@extends TextToken
*/

var PROTOCOL = inheritsToken();
/**
	Represents the start of the email URI protocol

	@class MAILTO
	@extends TextToken
*/

var MAILTO = inheritsToken('mailto:');
/**
	@class QUERY
	@extends TextToken
*/

var QUERY = inheritsToken('?');
/**
	@class SLASH
	@extends TextToken
*/

var SLASH = inheritsToken('/');
/**
	@class UNDERSCORE
	@extends TextToken
*/

var UNDERSCORE = inheritsToken('_');
/**
	One ore more non-whitespace symbol.
	@class SYM
	@extends TextToken
*/

var SYM = inheritsToken();
/**
	@class TLD
	@extends TextToken
*/

var TLD = inheritsToken();
/**
	Represents a string of consecutive whitespace characters

	@class WS
	@extends TextToken
*/

var WS = inheritsToken();
/**
	Opening/closing bracket classes
*/

var OPENBRACE = inheritsToken('{');
var OPENBRACKET = inheritsToken('[');
var OPENANGLEBRACKET = inheritsToken('<');
var OPENPAREN = inheritsToken('(');
var CLOSEBRACE = inheritsToken('}');
var CLOSEBRACKET = inheritsToken(']');
var CLOSEANGLEBRACKET = inheritsToken('>');
var CLOSEPAREN = inheritsToken(')');
var AMPERSAND = inheritsToken('&');
exports.Base = TextToken;
exports.DOMAIN = DOMAIN;
exports.AT = AT;
exports.COLON = COLON;
exports.DOT = DOT;
exports.PUNCTUATION = PUNCTUATION;
exports.LOCALHOST = LOCALHOST;
exports.NL = NL;
exports.NUM = NUM;
exports.PLUS = PLUS;
exports.POUND = POUND;
exports.QUERY = QUERY;
exports.PROTOCOL = PROTOCOL;
exports.MAILTO = MAILTO;
exports.SLASH = SLASH;
exports.UNDERSCORE = UNDERSCORE;
exports.SYM = SYM;
exports.TLD = TLD;
exports.WS = WS;
exports.OPENBRACE = OPENBRACE;
exports.OPENBRACKET = OPENBRACKET;
exports.OPENANGLEBRACKET = OPENANGLEBRACKET;
exports.OPENPAREN = OPENPAREN;
exports.CLOSEBRACE = CLOSEBRACE;
exports.CLOSEBRACKET = CLOSEBRACKET;
exports.CLOSEANGLEBRACKET = CLOSEANGLEBRACKET;
exports.CLOSEPAREN = CLOSEPAREN;
exports.AMPERSAND = AMPERSAND;

/***/ }),

/***/ "./node_modules/linkifyjs/lib/linkify/utils/class.js":
/*!***********************************************************!*\
  !*** ./node_modules/linkifyjs/lib/linkify/utils/class.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.inherits = inherits;

function inherits(parent, child) {
  var props = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var extended = Object.create(parent.prototype);

  for (var p in props) {
    extended[p] = props[p];
  }

  extended.constructor = child;
  child.prototype = extended;
  return child;
}

/***/ }),

/***/ "./node_modules/linkifyjs/lib/linkify/utils/options.js":
/*!*************************************************************!*\
  !*** ./node_modules/linkifyjs/lib/linkify/utils/options.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof2(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

exports.__esModule = true;

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
  return _typeof2(obj);
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
};

var defaults = {
  defaultProtocol: 'http',
  events: null,
  format: noop,
  formatHref: noop,
  nl2br: false,
  tagName: 'a',
  target: typeToTarget,
  validate: true,
  ignoreTags: [],
  attributes: null,
  className: 'linkified' // Deprecated value - no default class will be provided in the future

};
exports.defaults = defaults;
exports.Options = Options;
exports.contains = contains;

function Options(opts) {
  opts = opts || {};
  this.defaultProtocol = opts.hasOwnProperty('defaultProtocol') ? opts.defaultProtocol : defaults.defaultProtocol;
  this.events = opts.hasOwnProperty('events') ? opts.events : defaults.events;
  this.format = opts.hasOwnProperty('format') ? opts.format : defaults.format;
  this.formatHref = opts.hasOwnProperty('formatHref') ? opts.formatHref : defaults.formatHref;
  this.nl2br = opts.hasOwnProperty('nl2br') ? opts.nl2br : defaults.nl2br;
  this.tagName = opts.hasOwnProperty('tagName') ? opts.tagName : defaults.tagName;
  this.target = opts.hasOwnProperty('target') ? opts.target : defaults.target;
  this.validate = opts.hasOwnProperty('validate') ? opts.validate : defaults.validate;
  this.ignoreTags = []; // linkAttributes and linkClass is deprecated

  this.attributes = opts.attributes || opts.linkAttributes || defaults.attributes;
  this.className = opts.hasOwnProperty('className') ? opts.className : opts.linkClass || defaults.className; // Make all tags names upper case

  var ignoredTags = opts.hasOwnProperty('ignoreTags') ? opts.ignoreTags : defaults.ignoreTags;

  for (var i = 0; i < ignoredTags.length; i++) {
    this.ignoreTags.push(ignoredTags[i].toUpperCase());
  }
}

Options.prototype = {
  /**
   * Given the token, return all options for how it should be displayed
   */
  resolve: function resolve(token) {
    var href = token.toHref(this.defaultProtocol);
    return {
      formatted: this.get('format', token.toString(), token),
      formattedHref: this.get('formatHref', href, token),
      tagName: this.get('tagName', href, token),
      className: this.get('className', href, token),
      target: this.get('target', href, token),
      events: this.getObject('events', href, token),
      attributes: this.getObject('attributes', href, token)
    };
  },

  /**
   * Returns true or false based on whether a token should be displayed as a
   * link based on the user options. By default,
   */
  check: function check(token) {
    return this.get('validate', token.toString(), token);
  },
  // Private methods

  /**
   * Resolve an option's value based on the value of the option and the given
   * params.
   * @param {String} key Name of option to use
   * @param operator will be passed to the target option if it's method
   * @param {MultiToken} token The token from linkify.tokenize
   */
  get: function get(key, operator, token) {
    var optionValue = void 0,
        option = this[key];

    if (!option) {
      return option;
    }

    switch (typeof option === 'undefined' ? 'undefined' : _typeof(option)) {
      case 'function':
        return option(operator, token.type);

      case 'object':
        optionValue = option.hasOwnProperty(token.type) ? option[token.type] : defaults[key];
        return typeof optionValue === 'function' ? optionValue(operator, token.type) : optionValue;
    }

    return option;
  },
  getObject: function getObject(key, operator, token) {
    var option = this[key];
    return typeof option === 'function' ? option(operator, token.type) : option;
  }
};
/**
 * Quick indexOf replacement for checking the ignoreTags option
 */

function contains(arr, value) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] === value) {
      return true;
    }
  }

  return false;
}

function noop(val) {
  return val;
}

function typeToTarget(href, type) {
  return type === 'url' ? '_blank' : null;
}

/***/ }),

/***/ "./node_modules/linkifyjs/string.js":
/*!******************************************!*\
  !*** ./node_modules/linkifyjs/string.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(/*! ./lib/linkify-string */ "./node_modules/linkifyjs/lib/linkify-string.js").default;

/***/ }),

/***/ "./node_modules/md5/md5.js":
/*!*********************************!*\
  !*** ./node_modules/md5/md5.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
  var crypt = __webpack_require__(/*! crypt */ "./node_modules/crypt/crypt.js"),
      utf8 = __webpack_require__(/*! charenc */ "./node_modules/charenc/charenc.js").utf8,
      isBuffer = __webpack_require__(/*! is-buffer */ "./node_modules/is-buffer/index.js"),
      bin = __webpack_require__(/*! charenc */ "./node_modules/charenc/charenc.js").bin,
      // The core
  md5 = function md5(message, options) {
    // Convert to byte array
    if (message.constructor == String) {
      if (options && options.encoding === 'binary') message = bin.stringToBytes(message);else message = utf8.stringToBytes(message);
    } else if (isBuffer(message)) message = Array.prototype.slice.call(message, 0);else if (!Array.isArray(message) && message.constructor !== Uint8Array) message = message.toString(); // else, assume byte array already

    var m = crypt.bytesToWords(message),
        l = message.length * 8,
        a = 1732584193,
        b = -271733879,
        c = -1732584194,
        d = 271733878; // Swap endian

    for (var i = 0; i < m.length; i++) {
      m[i] = (m[i] << 8 | m[i] >>> 24) & 0x00FF00FF | (m[i] << 24 | m[i] >>> 8) & 0xFF00FF00;
    } // Padding


    m[l >>> 5] |= 0x80 << l % 32;
    m[(l + 64 >>> 9 << 4) + 14] = l; // Method shortcuts

    var FF = md5._ff,
        GG = md5._gg,
        HH = md5._hh,
        II = md5._ii;

    for (var i = 0; i < m.length; i += 16) {
      var aa = a,
          bb = b,
          cc = c,
          dd = d;
      a = FF(a, b, c, d, m[i + 0], 7, -680876936);
      d = FF(d, a, b, c, m[i + 1], 12, -389564586);
      c = FF(c, d, a, b, m[i + 2], 17, 606105819);
      b = FF(b, c, d, a, m[i + 3], 22, -1044525330);
      a = FF(a, b, c, d, m[i + 4], 7, -176418897);
      d = FF(d, a, b, c, m[i + 5], 12, 1200080426);
      c = FF(c, d, a, b, m[i + 6], 17, -1473231341);
      b = FF(b, c, d, a, m[i + 7], 22, -45705983);
      a = FF(a, b, c, d, m[i + 8], 7, 1770035416);
      d = FF(d, a, b, c, m[i + 9], 12, -1958414417);
      c = FF(c, d, a, b, m[i + 10], 17, -42063);
      b = FF(b, c, d, a, m[i + 11], 22, -1990404162);
      a = FF(a, b, c, d, m[i + 12], 7, 1804603682);
      d = FF(d, a, b, c, m[i + 13], 12, -40341101);
      c = FF(c, d, a, b, m[i + 14], 17, -1502002290);
      b = FF(b, c, d, a, m[i + 15], 22, 1236535329);
      a = GG(a, b, c, d, m[i + 1], 5, -165796510);
      d = GG(d, a, b, c, m[i + 6], 9, -1069501632);
      c = GG(c, d, a, b, m[i + 11], 14, 643717713);
      b = GG(b, c, d, a, m[i + 0], 20, -373897302);
      a = GG(a, b, c, d, m[i + 5], 5, -701558691);
      d = GG(d, a, b, c, m[i + 10], 9, 38016083);
      c = GG(c, d, a, b, m[i + 15], 14, -660478335);
      b = GG(b, c, d, a, m[i + 4], 20, -405537848);
      a = GG(a, b, c, d, m[i + 9], 5, 568446438);
      d = GG(d, a, b, c, m[i + 14], 9, -1019803690);
      c = GG(c, d, a, b, m[i + 3], 14, -187363961);
      b = GG(b, c, d, a, m[i + 8], 20, 1163531501);
      a = GG(a, b, c, d, m[i + 13], 5, -1444681467);
      d = GG(d, a, b, c, m[i + 2], 9, -51403784);
      c = GG(c, d, a, b, m[i + 7], 14, 1735328473);
      b = GG(b, c, d, a, m[i + 12], 20, -1926607734);
      a = HH(a, b, c, d, m[i + 5], 4, -378558);
      d = HH(d, a, b, c, m[i + 8], 11, -2022574463);
      c = HH(c, d, a, b, m[i + 11], 16, 1839030562);
      b = HH(b, c, d, a, m[i + 14], 23, -35309556);
      a = HH(a, b, c, d, m[i + 1], 4, -1530992060);
      d = HH(d, a, b, c, m[i + 4], 11, 1272893353);
      c = HH(c, d, a, b, m[i + 7], 16, -155497632);
      b = HH(b, c, d, a, m[i + 10], 23, -1094730640);
      a = HH(a, b, c, d, m[i + 13], 4, 681279174);
      d = HH(d, a, b, c, m[i + 0], 11, -358537222);
      c = HH(c, d, a, b, m[i + 3], 16, -722521979);
      b = HH(b, c, d, a, m[i + 6], 23, 76029189);
      a = HH(a, b, c, d, m[i + 9], 4, -640364487);
      d = HH(d, a, b, c, m[i + 12], 11, -421815835);
      c = HH(c, d, a, b, m[i + 15], 16, 530742520);
      b = HH(b, c, d, a, m[i + 2], 23, -995338651);
      a = II(a, b, c, d, m[i + 0], 6, -198630844);
      d = II(d, a, b, c, m[i + 7], 10, 1126891415);
      c = II(c, d, a, b, m[i + 14], 15, -1416354905);
      b = II(b, c, d, a, m[i + 5], 21, -57434055);
      a = II(a, b, c, d, m[i + 12], 6, 1700485571);
      d = II(d, a, b, c, m[i + 3], 10, -1894986606);
      c = II(c, d, a, b, m[i + 10], 15, -1051523);
      b = II(b, c, d, a, m[i + 1], 21, -2054922799);
      a = II(a, b, c, d, m[i + 8], 6, 1873313359);
      d = II(d, a, b, c, m[i + 15], 10, -30611744);
      c = II(c, d, a, b, m[i + 6], 15, -1560198380);
      b = II(b, c, d, a, m[i + 13], 21, 1309151649);
      a = II(a, b, c, d, m[i + 4], 6, -145523070);
      d = II(d, a, b, c, m[i + 11], 10, -1120210379);
      c = II(c, d, a, b, m[i + 2], 15, 718787259);
      b = II(b, c, d, a, m[i + 9], 21, -343485551);
      a = a + aa >>> 0;
      b = b + bb >>> 0;
      c = c + cc >>> 0;
      d = d + dd >>> 0;
    }

    return crypt.endian([a, b, c, d]);
  }; // Auxiliary functions


  md5._ff = function (a, b, c, d, x, s, t) {
    var n = a + (b & c | ~b & d) + (x >>> 0) + t;
    return (n << s | n >>> 32 - s) + b;
  };

  md5._gg = function (a, b, c, d, x, s, t) {
    var n = a + (b & d | c & ~d) + (x >>> 0) + t;
    return (n << s | n >>> 32 - s) + b;
  };

  md5._hh = function (a, b, c, d, x, s, t) {
    var n = a + (b ^ c ^ d) + (x >>> 0) + t;
    return (n << s | n >>> 32 - s) + b;
  };

  md5._ii = function (a, b, c, d, x, s, t) {
    var n = a + (c ^ (b | ~d)) + (x >>> 0) + t;
    return (n << s | n >>> 32 - s) + b;
  }; // Package private blocksize


  md5._blocksize = 16;
  md5._digestsize = 16;

  module.exports = function (message, options) {
    if (message === undefined || message === null) throw new Error('Illegal argument ' + message);
    var digestbytes = crypt.wordsToBytes(md5(message, options));
    return options && options.asBytes ? digestbytes : options && options.asString ? bin.bytesToString(digestbytes) : crypt.bytesToHex(digestbytes);
  };
})();

/***/ }),

/***/ "./node_modules/regenerator-runtime/runtime.js":
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var runtime = function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.

  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }

  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function define(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []); // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.

    generator._invoke = makeInvokeMethod(innerFn, self, context);
    return generator;
  }

  exports.wrap = wrap; // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.

  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: "normal",
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: "throw",
        arg: err
      };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed"; // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.

  var ContinueSentinel = {}; // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.

  function Generator() {}

  function GeneratorFunction() {}

  function GeneratorFunctionPrototype() {} // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.


  var IteratorPrototype = {};

  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));

  if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"); // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.

  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      define(prototype, method, function (arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function (genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor ? ctor === GeneratorFunction || // For the native GeneratorFunction constructor, the best we can
    // do is to check its .name property.
    (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
  };

  exports.mark = function (genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }

    genFun.prototype = Object.create(Gp);
    return genFun;
  }; // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.


  exports.awrap = function (arg) {
    return {
      __await: arg
    };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);

      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;

        if (value && _typeof(value) === "object" && hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function (value) {
            invoke("next", value, resolve, reject);
          }, function (err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function (unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function (error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function (resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise = // If enqueue has been called before, then we want to wait until
      // all previous Promises have been resolved before calling invoke,
      // so that results are always delivered in the correct order. If
      // enqueue has not been called before, then it is important to
      // call invoke immediately, without waiting on a callback to fire,
      // so that the async generator function has the opportunity to do
      // any necessary setup in a predictable way. This predictability
      // is why the Promise constructor synchronously invokes its
      // executor callback, and why async functions synchronously
      // execute code before the first await. Since we implement simple
      // async functions in terms of async generators, it is especially
      // important to get this right, even though it requires care.
      previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, // Avoid propagating failures to Promises returned by later
      // invocations of the iterator.
      callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
    } // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).


    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);

  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };

  exports.AsyncIterator = AsyncIterator; // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.

  exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
    return exports.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
    : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;
    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        } // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume


        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;

        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);

          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;
        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);
        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;
        var record = tryCatch(innerFn, self, context);

        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done ? GenStateCompleted : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };
        } else if (record.type === "throw") {
          state = GenStateCompleted; // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.

          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  } // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.


  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];

    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError("The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (!info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value; // Resume execution at the desired location (see delegateYield).

      context.next = delegate.nextLoc; // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.

      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }
    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    } // The delegate iterator is finished, so forget it and continue with
    // the outer generator.


    context.delegate = null;
    return ContinueSentinel;
  } // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.


  defineIteratorMethods(Gp);
  define(Gp, toStringTagSymbol, "Generator"); // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.

  Gp[iteratorSymbol] = function () {
    return this;
  };

  Gp.toString = function () {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{
      tryLoc: "root"
    }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function (object) {
    var keys = [];

    for (var key in object) {
      keys.push(key);
    }

    keys.reverse(); // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.

    return function next() {
      while (keys.length) {
        var key = keys.pop();

        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      } // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.


      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];

      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1,
            next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;
          return next;
        };

        return next.next = next;
      }
    } // Return an iterator with no values.


    return {
      next: doneResult
    };
  }

  exports.values = values;

  function doneResult() {
    return {
      value: undefined,
      done: true
    };
  }

  Context.prototype = {
    constructor: Context,
    reset: function reset(skipTempReset) {
      this.prev = 0;
      this.next = 0; // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.

      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;
      this.method = "next";
      this.arg = undefined;
      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },
    stop: function stop() {
      this.done = true;
      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;

      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },
    dispatchException: function dispatchException(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;

      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !!caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }
          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }
          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },
    abrupt: function abrupt(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },
    complete: function complete(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" || record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },
    finish: function finish(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },
    "catch": function _catch(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;

          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }

          return thrown;
        }
      } // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.


      throw new Error("illegal catch attempt");
    },
    delegateYield: function delegateYield(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  }; // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.

  return exports;
}( // If this script is executing as a CommonJS module, use module.exports
// as the regeneratorRuntime namespace. Otherwise create a new empty
// object. Either way, the resulting object will be used to initialize
// the regeneratorRuntime variable at the top of this file.
( false ? undefined : _typeof(module)) === "object" ? module.exports : {});

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./node_modules/striptags/src/striptags.js":
/*!*************************************************!*\
  !*** ./node_modules/striptags/src/striptags.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_RESULT__;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function (global) {
  // minimal symbol polyfill for IE11 and others
  if (typeof _Symbol !== 'function') {
    var _Symbol = function _Symbol(name) {
      return name;
    };

    _Symbol.nonNative = true;
  }

  var STATE_PLAINTEXT = _Symbol('plaintext');

  var STATE_HTML = _Symbol('html');

  var STATE_COMMENT = _Symbol('comment');

  var ALLOWED_TAGS_REGEX = /<(\w*)>/g;
  var NORMALIZE_TAG_REGEX = /<\/?([^\s\/>]+)/;

  function striptags(html, allowable_tags, tag_replacement) {
    html = html || '';
    allowable_tags = allowable_tags || [];
    tag_replacement = tag_replacement || '';
    var context = init_context(allowable_tags, tag_replacement);
    return striptags_internal(html, context);
  }

  function init_striptags_stream(allowable_tags, tag_replacement) {
    allowable_tags = allowable_tags || [];
    tag_replacement = tag_replacement || '';
    var context = init_context(allowable_tags, tag_replacement);
    return function striptags_stream(html) {
      return striptags_internal(html || '', context);
    };
  }

  striptags.init_streaming_mode = init_striptags_stream;

  function init_context(allowable_tags, tag_replacement) {
    allowable_tags = parse_allowable_tags(allowable_tags);
    return {
      allowable_tags: allowable_tags,
      tag_replacement: tag_replacement,
      state: STATE_PLAINTEXT,
      tag_buffer: '',
      depth: 0,
      in_quote_char: ''
    };
  }

  function striptags_internal(html, context) {
    var allowable_tags = context.allowable_tags;
    var tag_replacement = context.tag_replacement;
    var state = context.state;
    var tag_buffer = context.tag_buffer;
    var depth = context.depth;
    var in_quote_char = context.in_quote_char;
    var output = '';

    for (var idx = 0, length = html.length; idx < length; idx++) {
      var char = html[idx];

      if (state === STATE_PLAINTEXT) {
        switch (char) {
          case '<':
            state = STATE_HTML;
            tag_buffer += char;
            break;

          default:
            output += char;
            break;
        }
      } else if (state === STATE_HTML) {
        switch (char) {
          case '<':
            // ignore '<' if inside a quote
            if (in_quote_char) {
              break;
            } // we're seeing a nested '<'


            depth++;
            break;

          case '>':
            // ignore '>' if inside a quote
            if (in_quote_char) {
              break;
            } // something like this is happening: '<<>>'


            if (depth) {
              depth--;
              break;
            } // this is closing the tag in tag_buffer


            in_quote_char = '';
            state = STATE_PLAINTEXT;
            tag_buffer += '>';

            if (allowable_tags.has(normalize_tag(tag_buffer))) {
              output += tag_buffer;
            } else {
              output += tag_replacement;
            }

            tag_buffer = '';
            break;

          case '"':
          case '\'':
            // catch both single and double quotes
            if (char === in_quote_char) {
              in_quote_char = '';
            } else {
              in_quote_char = in_quote_char || char;
            }

            tag_buffer += char;
            break;

          case '-':
            if (tag_buffer === '<!-') {
              state = STATE_COMMENT;
            }

            tag_buffer += char;
            break;

          case ' ':
          case '\n':
            if (tag_buffer === '<') {
              state = STATE_PLAINTEXT;
              output += '< ';
              tag_buffer = '';
              break;
            }

            tag_buffer += char;
            break;

          default:
            tag_buffer += char;
            break;
        }
      } else if (state === STATE_COMMENT) {
        switch (char) {
          case '>':
            if (tag_buffer.slice(-2) == '--') {
              // close the comment
              state = STATE_PLAINTEXT;
            }

            tag_buffer = '';
            break;

          default:
            tag_buffer += char;
            break;
        }
      }
    } // save the context for future iterations


    context.state = state;
    context.tag_buffer = tag_buffer;
    context.depth = depth;
    context.in_quote_char = in_quote_char;
    return output;
  }

  function parse_allowable_tags(allowable_tags) {
    var tag_set = new Set();

    if (typeof allowable_tags === 'string') {
      var match;

      while (match = ALLOWED_TAGS_REGEX.exec(allowable_tags)) {
        tag_set.add(match[1]);
      }
    } else if (!_Symbol.nonNative && typeof allowable_tags[_Symbol.iterator] === 'function') {
      tag_set = new Set(allowable_tags);
    } else if (typeof allowable_tags.forEach === 'function') {
      // IE11 compatible
      allowable_tags.forEach(tag_set.add, tag_set);
    }

    return tag_set;
  }

  function normalize_tag(tag_buffer) {
    var match = NORMALIZE_TAG_REGEX.exec(tag_buffer);
    return match ? match[1].toLowerCase() : null;
  }

  if (true) {
    // AMD
    !(__WEBPACK_AMD_DEFINE_RESULT__ = (function module_factory() {
      return striptags;
    }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(void 0);

/***/ }),

/***/ "./node_modules/v-click-outside/dist/v-click-outside.umd.js":
/*!******************************************************************!*\
  !*** ./node_modules/v-click-outside/dist/v-click-outside.umd.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

!function (e, n) {
  "object" == ( false ? undefined : _typeof(exports)) && "undefined" != typeof module ? module.exports = n() :  true ? !(__WEBPACK_AMD_DEFINE_FACTORY__ = (n),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : undefined;
}(void 0, function () {
  var e = "undefined" != typeof window,
      n = "undefined" != typeof navigator,
      t = e && ("ontouchstart" in window || n && navigator.msMaxTouchPoints > 0) ? ["touchstart"] : ["click"];

  function i(e) {
    var n = e.event,
        t = e.handler;
    (0, e.middleware)(n) && t(n);
  }

  function r(e, n) {
    var r = function (e) {
      var n = "function" == typeof e;
      if (!n && "object" != _typeof(e)) throw new Error("v-click-outside: Binding value must be a function or an object");
      return {
        handler: n ? e : e.handler,
        middleware: e.middleware || function (e) {
          return e;
        },
        events: e.events || t,
        isActive: !(!1 === e.isActive),
        detectIframe: !(!1 === e.detectIframe)
      };
    }(n.value),
        d = r.handler,
        o = r.middleware,
        a = r.detectIframe;

    if (r.isActive) {
      if (e["__v-click-outside"] = r.events.map(function (n) {
        return {
          event: n,
          srcTarget: document.documentElement,
          handler: function handler(n) {
            return function (e) {
              var n = e.el,
                  t = e.event,
                  r = e.handler,
                  d = e.middleware,
                  o = t.path || t.composedPath && t.composedPath();
              (o ? o.indexOf(n) < 0 : !n.contains(t.target)) && i({
                event: t,
                handler: r,
                middleware: d
              });
            }({
              el: e,
              event: n,
              handler: d,
              middleware: o
            });
          }
        };
      }), a) {
        var c = {
          event: "blur",
          srcTarget: window,
          handler: function handler(n) {
            return function (e) {
              var n = e.el,
                  t = e.event,
                  r = e.handler,
                  d = e.middleware;
              setTimeout(function () {
                var e = document.activeElement;
                e && "IFRAME" === e.tagName && !n.contains(e) && i({
                  event: t,
                  handler: r,
                  middleware: d
                });
              }, 0);
            }({
              el: e,
              event: n,
              handler: d,
              middleware: o
            });
          }
        };
        e["__v-click-outside"] = [].concat(e["__v-click-outside"], [c]);
      }

      e["__v-click-outside"].forEach(function (n) {
        var t = n.event,
            i = n.srcTarget,
            r = n.handler;
        return setTimeout(function () {
          e["__v-click-outside"] && i.addEventListener(t, r, !1);
        }, 0);
      });
    }
  }

  function d(e) {
    (e["__v-click-outside"] || []).forEach(function (e) {
      return e.srcTarget.removeEventListener(e.event, e.handler, !1);
    }), delete e["__v-click-outside"];
  }

  var o = e ? {
    bind: r,
    update: function update(e, n) {
      var t = n.value,
          i = n.oldValue;
      JSON.stringify(t) !== JSON.stringify(i) && (d(e), r(e, {
        value: t
      }));
    },
    unbind: d
  } : {};
  return {
    install: function install(e) {
      e.directive("click-outside", o);
    },
    directive: o
  };
});

/***/ })

}]);
//# sourceMappingURL=vendors~editor-collab~editor-guest.js.map?v=454ecd7bc8416fb0247e