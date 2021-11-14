(window["textWebpackJsonp"] = window["textWebpackJsonp"] || []).push([["vendors~files-modal"],{

/***/ "./node_modules/@nextcloud/l10n/dist/gettext.js":
/*!******************************************************!*\
  !*** ./node_modules/@nextcloud/l10n/dist/gettext.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");

__webpack_require__(/*! core-js/modules/es.regexp.exec.js */ "./node_modules/core-js/modules/es.regexp.exec.js");

__webpack_require__(/*! core-js/modules/es.regexp.to-string.js */ "./node_modules/core-js/modules/es.regexp.to-string.js");

__webpack_require__(/*! core-js/modules/es.string.replace.js */ "./node_modules/core-js/modules/es.string.replace.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getGettextBuilder = getGettextBuilder;

var _nodeGettext = _interopRequireDefault(__webpack_require__(/*! node-gettext */ "./node_modules/node-gettext/lib/gettext.js"));

var _ = __webpack_require__(/*! . */ "./node_modules/@nextcloud/l10n/dist/index.js");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var GettextBuilder = /*#__PURE__*/function () {
  function GettextBuilder() {
    _classCallCheck(this, GettextBuilder);

    this.translations = {};
    this.debug = false;
  }

  _createClass(GettextBuilder, [{
    key: "setLanguage",
    value: function setLanguage(language) {
      this.locale = language;
      return this;
    }
  }, {
    key: "detectLocale",
    value: function detectLocale() {
      return this.setLanguage((0, _.getLanguage)().replace('-', '_'));
    }
  }, {
    key: "addTranslation",
    value: function addTranslation(language, data) {
      this.translations[language] = data;
      return this;
    }
  }, {
    key: "enableDebugMode",
    value: function enableDebugMode() {
      this.debug = true;
      return this;
    }
  }, {
    key: "build",
    value: function build() {
      return new GettextWrapper(this.locale || 'en', this.translations, this.debug);
    }
  }]);

  return GettextBuilder;
}();

var GettextWrapper = /*#__PURE__*/function () {
  function GettextWrapper(locale, data, debug) {
    _classCallCheck(this, GettextWrapper);

    this.gt = new _nodeGettext.default({
      debug: debug,
      sourceLocale: 'en'
    });

    for (var key in data) {
      this.gt.addTranslations(key, 'messages', data[key]);
    }

    this.gt.setLocale(locale);
  }

  _createClass(GettextWrapper, [{
    key: "subtitudePlaceholders",
    value: function subtitudePlaceholders(translated, vars) {
      return translated.replace(/{([^{}]*)}/g, function (a, b) {
        var r = vars[b];

        if (typeof r === 'string' || typeof r === 'number') {
          return r.toString();
        } else {
          return a;
        }
      });
    }
  }, {
    key: "gettext",
    value: function gettext(original) {
      var placeholders = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return this.subtitudePlaceholders(this.gt.gettext(original), placeholders);
    }
  }, {
    key: "ngettext",
    value: function ngettext(singular, plural, count) {
      var placeholders = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      return this.subtitudePlaceholders(this.gt.ngettext(singular, plural, count).replace(/%n/g, count.toString()), placeholders);
    }
  }]);

  return GettextWrapper;
}();

function getGettextBuilder() {
  return new GettextBuilder();
}

/***/ }),

/***/ "./node_modules/@nextcloud/vue/dist/Components/Modal.js":
/*!**************************************************************!*\
  !*** ./node_modules/@nextcloud/vue/dist/Components/Modal.js ***!
  \**************************************************************/
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

    function e(A) {
      if (n[A]) return n[A].exports;
      var o = n[A] = {
        i: A,
        l: !1,
        exports: {}
      };
      return t[A].call(o.exports, o, o.exports, e), o.l = !0, o.exports;
    }

    return e.m = t, e.c = n, e.d = function (t, n, A) {
      e.o(t, n) || Object.defineProperty(t, n, {
        enumerable: !0,
        get: A
      });
    }, e.r = function (t) {
      "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
        value: "Module"
      }), Object.defineProperty(t, "__esModule", {
        value: !0
      });
    }, e.t = function (t, n) {
      if (1 & n && (t = e(t)), 8 & n) return t;
      if (4 & n && "object" == _typeof(t) && t && t.__esModule) return t;
      var A = Object.create(null);
      if (e.r(A), Object.defineProperty(A, "default", {
        enumerable: !0,
        value: t
      }), 2 & n && "string" != typeof t) for (var o in t) {
        e.d(A, o, function (n) {
          return t[n];
        }.bind(null, o));
      }
      return A;
    }, e.n = function (t) {
      var n = t && t.__esModule ? function () {
        return t.default;
      } : function () {
        return t;
      };
      return e.d(n, "a", n), n;
    }, e.o = function (t, n) {
      return Object.prototype.hasOwnProperty.call(t, n);
    }, e.p = "/dist/", e(e.s = 129);
  }([function (t, n, e) {
    "use strict";

    function A(t, n) {
      return function (t) {
        if (Array.isArray(t)) return t;
      }(t) || function (t, n) {
        if ("undefined" == typeof Symbol || !(Symbol.iterator in Object(t))) return;
        var e = [],
            A = !0,
            o = !1,
            i = void 0;

        try {
          for (var a, r = t[Symbol.iterator](); !(A = (a = r.next()).done) && (e.push(a.value), !n || e.length !== n); A = !0) {
            ;
          }
        } catch (t) {
          o = !0, i = t;
        } finally {
          try {
            A || null == r.return || r.return();
          } finally {
            if (o) throw i;
          }
        }

        return e;
      }(t, n) || function (t, n) {
        if (!t) return;
        if ("string" == typeof t) return o(t, n);
        var e = Object.prototype.toString.call(t).slice(8, -1);
        "Object" === e && t.constructor && (e = t.constructor.name);
        if ("Map" === e || "Set" === e) return Array.from(t);
        if ("Arguments" === e || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)) return o(t, n);
      }(t, n) || function () {
        throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }();
    }

    function o(t, n) {
      (null == n || n > t.length) && (n = t.length);

      for (var e = 0, A = new Array(n); e < n; e++) {
        A[e] = t[e];
      }

      return A;
    }

    t.exports = function (t) {
      var n = A(t, 4),
          e = n[1],
          o = n[3];

      if ("function" == typeof btoa) {
        var i = btoa(unescape(encodeURIComponent(JSON.stringify(o)))),
            a = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(i),
            r = "/*# ".concat(a, " */"),
            s = o.sources.map(function (t) {
          return "/*# sourceURL=".concat(o.sourceRoot || "").concat(t, " */");
        });
        return [e].concat(s).concat([r]).join("\n");
      }

      return [e].join("\n");
    };
  }, function (t, n, e) {
    "use strict";

    t.exports = function (t) {
      var n = [];
      return n.toString = function () {
        return this.map(function (n) {
          var e = t(n);
          return n[2] ? "@media ".concat(n[2], " {").concat(e, "}") : e;
        }).join("");
      }, n.i = function (t, e, A) {
        "string" == typeof t && (t = [[null, t, ""]]);
        var o = {};
        if (A) for (var i = 0; i < this.length; i++) {
          var a = this[i][0];
          null != a && (o[a] = !0);
        }

        for (var r = 0; r < t.length; r++) {
          var s = [].concat(t[r]);
          A && o[s[0]] || (e && (s[2] ? s[2] = "".concat(e, " and ").concat(s[2]) : s[2] = e), n.push(s));
        }
      }, n;
    };
  }, function (t, n, e) {
    "use strict";

    var A,
        o = function o() {
      return void 0 === A && (A = Boolean(window && document && document.all && !window.atob)), A;
    },
        i = function () {
      var t = {};
      return function (n) {
        if (void 0 === t[n]) {
          var e = document.querySelector(n);
          if (window.HTMLIFrameElement && e instanceof window.HTMLIFrameElement) try {
            e = e.contentDocument.head;
          } catch (t) {
            e = null;
          }
          t[n] = e;
        }

        return t[n];
      };
    }(),
        a = [];

    function r(t) {
      for (var n = -1, e = 0; e < a.length; e++) {
        if (a[e].identifier === t) {
          n = e;
          break;
        }
      }

      return n;
    }

    function s(t, n) {
      for (var e = {}, A = [], o = 0; o < t.length; o++) {
        var i = t[o],
            s = n.base ? i[0] + n.base : i[0],
            c = e[s] || 0,
            l = "".concat(s, " ").concat(c);
        e[s] = c + 1;
        var d = r(l),
            u = {
          css: i[1],
          media: i[2],
          sourceMap: i[3]
        };
        -1 !== d ? (a[d].references++, a[d].updater(u)) : a.push({
          identifier: l,
          updater: C(u, n),
          references: 1
        }), A.push(l);
      }

      return A;
    }

    function c(t) {
      var n = document.createElement("style"),
          A = t.attributes || {};

      if (void 0 === A.nonce) {
        var o = e.nc;
        o && (A.nonce = o);
      }

      if (Object.keys(A).forEach(function (t) {
        n.setAttribute(t, A[t]);
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

    function u(t, n, e, A) {
      var o = e ? "" : A.media ? "@media ".concat(A.media, " {").concat(A.css, "}") : A.css;
      if (t.styleSheet) t.styleSheet.cssText = d(n, o);else {
        var i = document.createTextNode(o),
            a = t.childNodes;
        a[n] && t.removeChild(a[n]), a.length ? t.insertBefore(i, a[n]) : t.appendChild(i);
      }
    }

    function g(t, n, e) {
      var A = e.css,
          o = e.media,
          i = e.sourceMap;
      if (o ? t.setAttribute("media", o) : t.removeAttribute("media"), i && "undefined" != typeof btoa && (A += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(i)))), " */")), t.styleSheet) t.styleSheet.cssText = A;else {
        for (; t.firstChild;) {
          t.removeChild(t.firstChild);
        }

        t.appendChild(document.createTextNode(A));
      }
    }

    var m = null,
        p = 0;

    function C(t, n) {
      var e, A, o;

      if (n.singleton) {
        var i = p++;
        e = m || (m = c(n)), A = u.bind(null, e, i, !1), o = u.bind(null, e, i, !0);
      } else e = c(n), A = g.bind(null, e, n), o = function o() {
        !function (t) {
          if (null === t.parentNode) return !1;
          t.parentNode.removeChild(t);
        }(e);
      };

      return A(t), function (n) {
        if (n) {
          if (n.css === t.css && n.media === t.media && n.sourceMap === t.sourceMap) return;
          A(t = n);
        } else o();
      };
    }

    t.exports = function (t, n) {
      (n = n || {}).singleton || "boolean" == typeof n.singleton || (n.singleton = o());
      var e = s(t = t || [], n);
      return function (t) {
        if (t = t || [], "[object Array]" === Object.prototype.toString.call(t)) {
          for (var A = 0; A < e.length; A++) {
            var o = r(e[A]);
            a[o].references--;
          }

          for (var i = s(t, n), c = 0; c < e.length; c++) {
            var l = r(e[c]);
            0 === a[l].references && (a[l].updater(), a.splice(l, 1));
          }

          e = i;
        }
      };
    };
  }, function (t, n, e) {
    "use strict";

    function A(t, n, e, A, o, i, a, r) {
      var s,
          c = "function" == typeof t ? t.options : t;
      if (n && (c.render = n, c.staticRenderFns = e, c._compiled = !0), A && (c.functional = !0), i && (c._scopeId = "data-v-" + i), a ? (s = function s(t) {
        (t = t || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) || "undefined" == typeof __VUE_SSR_CONTEXT__ || (t = __VUE_SSR_CONTEXT__), o && o.call(this, t), t && t._registeredComponents && t._registeredComponents.add(a);
      }, c._ssrRegister = s) : o && (s = r ? function () {
        o.call(this, (c.functional ? this.parent : this).$root.$options.shadowRoot);
      } : o), s) if (c.functional) {
        c._injectStyles = s;
        var l = c.render;

        c.render = function (t, n) {
          return s.call(n), l(t, n);
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

    e.d(n, "a", function () {
      return A;
    });
  }, function (t, n, e) {
    "use strict";

    t.exports = function (t, n) {
      return n || (n = {}), "string" != typeof (t = t && t.__esModule ? t.default : t) ? t : (/^['"].*['"]$/.test(t) && (t = t.slice(1, -1)), n.hash && (t += n.hash), /["'() \t\n]/.test(t) || n.needQuotes ? '"'.concat(t.replace(/"/g, '\\"').replace(/\n/g, "\\n"), '"') : t);
    };
  }, function (t, n) {
    t.exports = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm.js");
  }, function (t, n) {
    t.exports = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
  }, function (t, n) {
    t.exports = __webpack_require__(/*! v-tooltip */ "./node_modules/v-tooltip/dist/v-tooltip.esm.js");
  }, function (t, n, e) {
    "use strict";

    n.a = "data:application/vnd.ms-fontobject;base64,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";
  }, function (t, n, e) {
    "use strict";

    n.a = "data:font/woff;base64,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PAE55eh8gAAAAQAAAAEAADh+5rVfDzz1AAsTiAAAAADclJzcAAAAANxDwN3/4AAAE5MTiAAAAAgAAgAAAAAAAAABAAATiAAAAAATiP/g//UTkwABAAAAAAAAAAAAAAAAAAAABwAAAAATiAAAE4gAABOIAAATiAAABjYAABOIAAAAAP//AAAAAAAAAAAAAAAA/+AAAAAAAAAAAAAAACIANgBYAGwAgACUALQBDgF8AZoCEAImAjQCQgKoAyIDpgP+AAEAAAATAEsAAwAAAAAAAgAAAAoACgAAAP8AAAAAAAAAAAAQAMYAAQAAAAAAAQAUAAAAAQAAAAAAAgAHABQAAQAAAAAAAwAUABsAAQAAAAAABAAUAC8AAQAAAAAABQALAEMAAQAAAAAABgAUAE4AAQAAAAAACgArAGIAAQAAAAAACwATAI0AAwABBAkAAQAoAKAAAwABBAkAAgAOAMgAAwABBAkAAwAoANYAAwABBAkABAAoAP4AAwABBAkABQAWASYAAwABBAkABgAoATwAAwABBAkACgBWAWQAAwABBAkACwAmAbppY29uZm9udC12dWUtNmI0OTRmY1JlZ3VsYXJpY29uZm9udC12dWUtNmI0OTRmY2ljb25mb250LXZ1ZS02YjQ5NGZjVmVyc2lvbiAxLjBpY29uZm9udC12dWUtNmI0OTRmY0dlbmVyYXRlZCBieSBzdmcydHRmIGZyb20gRm9udGVsbG8gcHJvamVjdC5odHRwOi8vZm9udGVsbG8uY29tAGkAYwBvAG4AZgBvAG4AdAAtAHYAdQBlAC0ANgBiADQAOQA0AGYAYwBSAGUAZwB1AGwAYQByAGkAYwBvAG4AZgBvAG4AdAAtAHYAdQBlAC0ANgBiADQAOQA0AGYAYwBpAGMAbwBuAGYAbwBuAHQALQB2AHUAZQAtADYAYgA0ADkANABmAGMAVgBlAHIAcwBpAG8AbgAgADEALgAwAGkAYwBvAG4AZgBvAG4AdAAtAHYAdQBlAC0ANgBiADQAOQA0AGYAYwBHAGUAbgBlAHIAYQB0AGUAZAAgAGIAeQAgAHMAdgBnADIAdAB0AGYAIABmAHIAbwBtACAARgBvAG4AdABlAGwAbABvACAAcAByAG8AagBlAGMAdAAuAGgAdAB0AHAAOgAvAC8AZgBvAG4AdABlAGwAbABvAC4AYwBvAG0AAAACAAAAAAAAADIAAAAAAAAAAAAAAAAAAAAAAAAAAAATABMAAAECAQMBBAEFAQYBBwEIAQkBCgELAQwBDQEOAQ8BEAERARIBExFhcnJvdy1sZWZ0LWRvdWJsZQphcnJvdy1sZWZ0EmFycm93LXJpZ2h0LWRvdWJsZQthcnJvdy1yaWdodApicmVhZGNydW1iCWNoZWNrbWFyawVjbG9zZQdjb25maXJtBGluZm8EbWVudQRtb3JlBXBhdXNlBHBsYXkKdHJpYW5nbGUtcxB1c2VyLXN0YXR1cy1hd2F5D3VzZXItc3RhdHVzLWRuZBV1c2VyLXN0YXR1cy1pbnZpc2libGUSdXNlci1zdGF0dXMtb25saW5lAAA=";
  }, function (t, n, e) {
    "use strict";

    n.a = "data:font/ttf;base64,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AAATiP/g//UTkwABAAAAAAAAAAAAAAAAAAAABwAAAAATiAAAE4gAABOIAAATiAAABjYAABOIAAAAAP//AAAAAAAAAAAAAAAA/+AAAAAAAAAAAAAAACIANgBYAGwAgACUALQBDgF8AZoCEAImAjQCQgKoAyIDpgP+AAEAAAATAEsAAwAAAAAAAgAAAAoACgAAAP8AAAAAAAAAAAAQAMYAAQAAAAAAAQAUAAAAAQAAAAAAAgAHABQAAQAAAAAAAwAUABsAAQAAAAAABAAUAC8AAQAAAAAABQALAEMAAQAAAAAABgAUAE4AAQAAAAAACgArAGIAAQAAAAAACwATAI0AAwABBAkAAQAoAKAAAwABBAkAAgAOAMgAAwABBAkAAwAoANYAAwABBAkABAAoAP4AAwABBAkABQAWASYAAwABBAkABgAoATwAAwABBAkACgBWAWQAAwABBAkACwAmAbppY29uZm9udC12dWUtNmI0OTRmY1JlZ3VsYXJpY29uZm9udC12dWUtNmI0OTRmY2ljb25mb250LXZ1ZS02YjQ5NGZjVmVyc2lvbiAxLjBpY29uZm9udC12dWUtNmI0OTRmY0dlbmVyYXRlZCBieSBzdmcydHRmIGZyb20gRm9udGVsbG8gcHJvamVjdC5odHRwOi8vZm9udGVsbG8uY29tAGkAYwBvAG4AZgBvAG4AdAAtAHYAdQBlAC0ANgBiADQAOQA0AGYAYwBSAGUAZwB1AGwAYQByAGkAYwBvAG4AZgBvAG4AdAAtAHYAdQBlAC0ANgBiADQAOQA0AGYAYwBpAGMAbwBuAGYAbwBuAHQALQB2AHUAZQAtADYAYgA0ADkANABmAGMAVgBlAHIAcwBpAG8AbgAgADEALgAwAGkAYwBvAG4AZgBvAG4AdAAtAHYAdQBlAC0ANgBiADQAOQA0AGYAYwBHAGUAbgBlAHIAYQB0AGUAZAAgAGIAeQAgAHMAdgBnADIAdAB0AGYAIABmAHIAbwBtACAARgBvAG4AdABlAGwAbABvACAAcAByAG8AagBlAGMAdAAuAGgAdAB0AHAAOgAvAC8AZgBvAG4AdABlAGwAbABvAC4AYwBvAG0AAAACAAAAAAAAADIAAAAAAAAAAAAAAAAAAAAAAAAAAAATABMAAAECAQMBBAEFAQYBBwEIAQkBCgELAQwBDQEOAQ8BEAERARIBExFhcnJvdy1sZWZ0LWRvdWJsZQphcnJvdy1sZWZ0EmFycm93LXJpZ2h0LWRvdWJsZQthcnJvdy1yaWdodApicmVhZGNydW1iCWNoZWNrbWFyawVjbG9zZQdjb25maXJtBGluZm8EbWVudQRtb3JlBXBhdXNlBHBsYXkKdHJpYW5nbGUtcxB1c2VyLXN0YXR1cy1hd2F5D3VzZXItc3RhdHVzLWRuZBV1c2VyLXN0YXR1cy1pbnZpc2libGUSdXNlci1zdGF0dXMtb25saW5lAAA=";
  }, function (t, n, e) {
    "use strict";

    n.a = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCIgPjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48bWV0YWRhdGE+PC9tZXRhZGF0YT48ZGVmcz48Zm9udCBpZD0iaWNvbmZvbnQtdnVlLTZiNDk0ZmMiIGhvcml6LWFkdi14PSI1MDAwIj48Zm9udC1mYWNlIGZvbnQtZmFtaWx5PSJpY29uZm9udC12dWUtNmI0OTRmYyIgZm9udC13ZWlnaHQ9IjQwMCIgZm9udC1zdHJldGNoPSJub3JtYWwiIHVuaXRzLXBlci1lbT0iNTAwMCIgcGFub3NlLTE9IjIgMCA1IDMgMCAwIDAgMCAwIDAiIGFzY2VudD0iNTAwMCIgZGVzY2VudD0iMCIgeC1oZWlnaHQ9IjAiIGJib3g9Ii0zMiAwIDUwMTEgNTAwMCIgdW5kZXJsaW5lLXRoaWNrbmVzcz0iMCIgdW5kZXJsaW5lLXBvc2l0aW9uPSI1MCIgdW5pY29kZS1yYW5nZT0iVStlYTAxLWVhMTIiIC8+PG1pc3NpbmctZ2x5cGggaG9yaXotYWR2LXg9IjAiICAvPjxnbHlwaCBnbHlwaC1uYW1lPSJhcnJvdy1sZWZ0LWRvdWJsZSIgdW5pY29kZT0iJiN4ZWEwMTsiIGQ9Ik0zNzUwIDM5MDYgbC0xNDA2IC0xNDA2IGwxNDA2IC0xNDA2IGwwIDMxMiBsLTEwOTQgMTA5NCBsMTA5NCAxMDk0IGwwIDMxMiBaTTIzNDQgMzkwNiBsLTE0MDYgLTE0MDYgbDE0MDYgLTE0MDYgbDAgMzEyIGwtMTA5NCAxMDk0IGwxMDk0IDEwOTQgbDAgMzEyIFoiIC8+PGdseXBoIGdseXBoLW5hbWU9ImFycm93LWxlZnQiIHVuaWNvZGU9IiYjeGVhMDI7IiBkPSJNMTU2MyAyNTAwIGwxODc1IC0xODc1IGwwIC0zMTIgbC0yMTg4IDIxODcgbDIxODggMjE4OCBsMCAtMzEzIGwtMTg3NSAtMTg3NSBaIiAvPjxnbHlwaCBnbHlwaC1uYW1lPSJhcnJvdy1yaWdodC1kb3VibGUiIHVuaWNvZGU9IiYjeGVhMDM7IiBkPSJNMTI1MCAxMDk0IGwxNDA2IDE0MDYgbC0xNDA2IDE0MDYgbDAgLTMxMiBsMTA5NCAtMTA5NCBsLTEwOTQgLTEwOTQgbDAgLTMxMiBaTTI2NTYgMTA5NCBsMTQwNyAxNDA2IGwtMTQwNyAxNDA2IGwwIC0zMTIgbDEwOTQgLTEwOTQgbC0xMDk0IC0xMDk0IGwwIC0zMTIgWiIgLz48Z2x5cGggZ2x5cGgtbmFtZT0iYXJyb3ctcmlnaHQiIHVuaWNvZGU9IiYjeGVhMDQ7IiBkPSJNMzQzOCAyNTAwIGwtMTg3NSAxODc1IGwwIDMxMyBsMjE4NyAtMjE4OCBsLTIxODcgLTIxODcgbDAgMzEyIGwxODc1IDE4NzUgWiIgLz48Z2x5cGggZ2x5cGgtbmFtZT0iYnJlYWRjcnVtYiIgdW5pY29kZT0iJiN4ZWEwNTsiIGQ9Ik0xNDggNTAwMCBsLTE0OCAtODUgbDEzOTQgLTI0MTUgbC0xMzk0IC0yNDE1IGwxNDggLTg1IGwxNDQzIDI1MDAgbC0xNDQzIDI1MDAgWiIgLz48Z2x5cGggZ2x5cGgtbmFtZT0iY2hlY2ttYXJrIiB1bmljb2RlPSImI3hlYTA2OyIgZD0iTTQwNDUgMzk3MSBsLTIwNjEgLTIwNjEgbC0xMDI5IDEwMjkgbC00NDIgLTQ0MSBsMTQ3MSAtMTQ3MSBsMjUwMyAyNTAyIGwtNDQyIDQ0MiBaIiAvPjxnbHlwaCBnbHlwaC1uYW1lPSJjbG9zZSIgdW5pY29kZT0iJiN4ZWEwNzsiIGQ9Ik00Mzc1IDExNTYgbC01MzEgLTUzMSBsLTEzNDQgMTM0NCBsLTEzNDQgLTEzNDQgbC01MzEgNTMxIGwxMzQ0IDEzNDQgbC0xMzQ0IDEzNDQgbDUzMSA1MzEgbDEzNDQgLTEzNDQgbDEzNDQgMTM0NCBsNTMxIC01MzEgbC0xMzQ0IC0xMzQ0IGwxMzQ0IC0xMzQ0IFoiIC8+PGdseXBoIGdseXBoLW5hbWU9ImNvbmZpcm0iIHVuaWNvZGU9IiYjeGVhMDg7IiBkPSJNMjY1NiA0ODQ0IHEtMTAxIDAgLTE4MCAtNTcgcS03NCAtNTIgLTEwOSAtMTM4IHEtMzUgLTg2IC0xOSAtMTc1IHExOCAtOTYgOTAgLTE2NyBsMTQ5NSAtMTQ5NCBsLTM2MTYgMCBxLTc3IDEgLTEzOSAtMjYgcS01OCAtMjQgLTk5IC03MCBxLTM5IC00NCAtNTkgLTEwMSBxLTIwIC01NiAtMjAgLTExNiBxMCAtNjAgMjAgLTExNiBxMjAgLTU3IDU5IC0xMDEgcTQxIC00NiA5OSAtNzAgcTYyIC0yNyAxMzkgLTI1IGwzNjE2IDAgbC0xNDk1IC0xNDk1IHEtNTUgLTUzIC04MSAtMTE2IHEtMjQgLTU5IC0yMSAtMTIxIHEzIC01OCAzMCAtMTEzIHEyNSAtNTQgNjggLTk3IHE0MyAtNDMgOTYgLTY4IHE1NSAtMjYgMTE0IC0yOSBxNjIgLTMgMTIwIDIxIHE2MyAyNSAxMTYgODEgbDIwMjkgMjAyOCBxNTkgNjAgODAgMTQxIHEyMSA4MCAxIDE1OSBxLTIxIDgyIC04MSAxNDIgbC0yMDI5IDIwMjggcS00NCA0NSAtMTAyIDcwIHEtNTggMjUgLTEyMiAyNSBaIiAvPjxnbHlwaCBnbHlwaC1uYW1lPSJpbmZvIiB1bmljb2RlPSImI3hlYTA5OyIgZD0iTTI0MjIgNDY4OCBxLTExMSAwIC0yMTMgLTQzIHEtOTggLTQyIC0xNzQgLTExNy41IHEtNzYgLTc1LjUgLTExNyAtMTc0LjUgcS00MyAtMTAxIC00MyAtMjEyLjUgcTAgLTExMS41IDQzIC0yMTIuNSBxNDEgLTk4IDExNyAtMTc0IHE3NiAtNzYgMTc0IC0xMTcgcTEwMiAtNDMgMjEzIC00MyBxMTExIDAgMjEzIDQzIHE5OCA0MSAxNzMuNSAxMTcgcTc1LjUgNzYgMTE3LjUgMTc0IHE0MyAxMDEgNDMgMjEyLjUgcTAgMTExLjUgLTQzIDIxMi41IHEtNDIgOTkgLTExNy41IDE3NC41IHEtNzUuNSA3NS41IC0xNzMuNSAxMTcuNSBxLTEwMiA0MyAtMjEzIDQzIFpNMTU2MyAzMTI1IHEtODYgMCAtMTU4IC00MyBxLTcxIC00MSAtMTEyIC0xMTIgcS00MyAtNzIgLTQzIC0xNTcuNSBxMCAtODUuNSA0MyAtMTU3LjUgcTQxIC03MSAxMTIgLTExMiBxNzIgLTQzIDE1OCAtNDMgbDYyNSAwIGwwIC0xNTYyIGwtNjI1IDAgcS04NiAwIC0xNTggLTQzIHEtNzEgLTQxIC0xMTIgLTExMiBxLTQzIC03MyAtNDMgLTE1OCBxMCAtODUgNDMgLTE1OCBxNDEgLTcxIDExMiAtMTEyIHE3MiAtNDMgMTU4IC00MiBsMTg3NSAwIHE4NSAwIDE1NyA0MiBxNzEgNDEgMTEyIDExMiBxNDMgNzMgNDMgMTU4IHEwIDg1IC00MyAxNTggcS00MSA3MSAtMTEyIDExMiBxLTcyIDQzIC0xNTcgNDMgbC02MjUgMCBsMCAxODc1IHEwIDg1IC00MyAxNTcgcS00MSA3MSAtMTEyIDExMiBxLTczIDQzIC0xNTggNDMgbC05MzcgMCBaIiAvPjxnbHlwaCBnbHlwaC1uYW1lPSJtZW51IiB1bmljb2RlPSImI3hlYTBhOyIgZD0iTTYyNSA0Mzc1IGwwIC02MjUgbDM3NTAgMCBsMCA2MjUgbC0zNzUwIDAgWk02MjUgMjgxMyBsMCAtNjI1IGwzNzUwIDAgbDAgNjI1IGwtMzc1MCAwIFpNNjI1IDEyNTAgbDAgLTYyNSBsMzc1MCAwIGwwIDYyNSBsLTM3NTAgMCBaIiAvPjxnbHlwaCBnbHlwaC1uYW1lPSJtb3JlIiB1bmljb2RlPSImI3hlYTBiOyIgZD0iTTc4MSAzMDQ3IHExMTIgMCAyMTMgLTQzIHE5OCAtNDIgMTc0IC0xMTcuNSBxNzYgLTc1LjUgMTE3IC0xNzMuNSBxNDMgLTEwMiA0MyAtMjEzIHEwIC0xMTEgLTQzIC0yMTMgcS00MSAtOTggLTExNyAtMTczLjUgcS03NiAtNzUuNSAtMTc0IC0xMTcuNSBxLTEwMSAtNDMgLTIxMi41IC00MyBxLTExMS41IDAgLTIxMy41IDQzIHEtOTggNDIgLTE3My41IDExNy41IHEtNzUuNSA3NS41IC0xMTcuNSAxNzMuNSBxLTQzIDEwMiAtNDMgMjEzIHEwIDExMSA0MyAyMTMgcTQyIDk4IDExNy41IDE3My41IHE3NS41IDc1LjUgMTczLjUgMTE3LjUgcTEwMiA0MyAyMTMgNDMgWk0yNTAwIDMwNDcgcTExMSAwIDIxMyAtNDMgcTk4IC00MiAxNzMuNSAtMTE3LjUgcTc1LjUgLTc1LjUgMTE3LjUgLTE3My41IHE0MyAtMTAyIDQzIC0yMTMgcTAgLTExMSAtNDMgLTIxMyBxLTQyIC05OCAtMTE3LjUgLTE3My41IHEtNzUuNSAtNzUuNSAtMTczLjUgLTExNy41IHEtMTAyIC00MyAtMjEzIC00MyBxLTExMSAwIC0yMTMgNDMgcS05OCA0MiAtMTczLjUgMTE3LjUgcS03NS41IDc1LjUgLTExNy41IDE3My41IHEtNDMgMTAyIC00MyAyMTMgcTAgMTExIDQzIDIxMyBxNDIgOTggMTE3LjUgMTczLjUgcTc1LjUgNzUuNSAxNzMuNSAxMTcuNSBxMTAyIDQzIDIxMyA0MyBaTTQyMTkgMzA0NyBxMTExIDAgMjEzIC00MyBxOTggLTQyIDE3My41IC0xMTcuNSBxNzUuNSAtNzUuNSAxMTcuNSAtMTczLjUgcTQzIC0xMDIgNDMgLTIxMyBxMCAtMTExIC00MyAtMjEzIHEtNDIgLTk4IC0xMTcuNSAtMTczLjUgcS03NS41IC03NS41IC0xNzMuNSAtMTE3LjUgcS0xMDIgLTQzIC0yMTMuNSAtNDMgcS0xMTEuNSAwIC0yMTIuNSA0MyBxLTk4IDQyIC0xNzQgMTE3LjUgcS03NiA3NS41IC0xMTcgMTczLjUgcS00MyAxMDIgLTQzIDIxMyBxMCAxMTEgNDMgMjEzIHE0MSA5OCAxMTcgMTczLjUgcTc2IDc1LjUgMTc0IDExNy41IHExMDEgNDMgMjEzIDQzIFoiIC8+PGdseXBoIGdseXBoLW5hbWU9InBhdXNlIiB1bmljb2RlPSImI3hlYTBjOyIgZD0iTTkzOCA0MDYzIGwwIC0zMTI1IGwxMjUwIDAgbDAgMzEyNSBsLTEyNTAgMCBaTTI4MTMgNDA2MyBsMCAtMzEyNSBsMTI1MCAwIGwwIDMxMjUgbC0xMjUwIDAgWiIgLz48Z2x5cGggZ2x5cGgtbmFtZT0icGxheSIgdW5pY29kZT0iJiN4ZWEwZDsiIGQ9Ik02MjUgNDM3NSBsMzc1MCAtMTg3NSBsLTM3NTAgLTE4NzUgbDAgMzc1MCBaIiAvPjxnbHlwaCBnbHlwaC1uYW1lPSJ0cmlhbmdsZS1zIiB1bmljb2RlPSImI3hlYTBlOyIgZD0iTTEyNTAgMzEyNSBsMTI1MCAtMTI1MCBsMTI1MCAxMjQ4IGwtMjUwMCAyIFoiIC8+PGdseXBoIGdseXBoLW5hbWU9InVzZXItc3RhdHVzLWF3YXkiIHVuaWNvZGU9IiYjeGVhMGY7IiBkPSJNMjE1NiA0OTY5IHEtMzYwIC00NiAtNjk1IC0xOTcgcS0zMjYgLTE0NyAtNjAxIC0zODAgcS0yNzQgLTIzMSAtNDcyIC01MjggcS0yMDIgLTMwMSAtMzA5IC02NDIgcS0xMTAgLTM1MyAtMTEwIC03MjIgcTAgLTQwNiAxMjggLTc4OCBxMTIzIC0zNzAgMzU2IC02ODYgcTIyOSAtMzEzIDU0MiAtNTQyIHEzMTYgLTIzMiA2ODYgLTM1NiBxMzgyIC0xMjggNzg4IC0xMjggcTM2OSAwIDcyMiAxMDcgcTM0MiAxMDQgNjQ0IDMwMSBxMjk4IDE5NCA1MzMgNDYzIHEyMzYgMjcwIDM4OSA1OTMgcTE1NiAzMzEgMjEyIDY5MiBxLTE4OCAtMjA0IC00MjMuNSAtMzUxIHEtMjM1LjUgLTE0NyAtNDk4LjUgLTIyNSBxLTI2OSAtODAgLTU0NyAtODAgcS0zMjIgMCAtNjI4IDEwMyBxLTI5NSA5OSAtNTQ4IDI4NiBxLTI1MSAxODQgLTQzNSA0MzUgcS0xODcgMjUzIC0yODYgNTQ4IHEtMTAzIDMwNiAtMTAzIDYyOCBxMCAyOTMgODAgNTY4IHE3OCAyNjkgMjI1LjUgNDk4LjUgcTE0Ny41IDIyOS41IDM1MC41IDQwMi41IFoiIC8+PGdseXBoIGdseXBoLW5hbWU9InVzZXItc3RhdHVzLWRuZCIgdW5pY29kZT0iJiN4ZWExMDsiIGQ9Ik0yNTAwIDUwMDAgcS00MDYgMCAtNzg4IC0xMjggcS0zNzAgLTEyNCAtNjg2IC0zNTYgcS0zMTMgLTIyOSAtNTQyIC01NDIgcS0yMzIgLTMxNiAtMzU2IC02ODYgcS0xMjggLTM4MiAtMTI4IC03ODggcTAgLTQwNiAxMjggLTc4OCBxMTI0IC0zNzAgMzU2IC02ODYgcTIyOSAtMzEzIDU0MiAtNTQyIHEzMTYgLTIzMiA2ODYgLTM1NiBxMzgyIC0xMjggNzg4IC0xMjggcTQwNiAwIDc4OCAxMjggcTM3MCAxMjQgNjg2IDM1NiBxMzEzIDIyOSA1NDIgNTQyIHEyMzIgMzE2IDM1NiA2ODYgcTEyOCAzODIgMTI4IDc4OCBxMCA0MDYgLTEyOCA3ODggcS0xMjQgMzcwIC0zNTYgNjg2IHEtMjI5IDMxMyAtNTQyIDU0MiBxLTMxNiAyMzIgLTY4NiAzNTYgcS0zODIgMTI4IC03ODggMTI4IFpNMTU2MyAyOTY5IGwxODc1IDAgcTkxIDAgMTc4IC0zOCBxODQgLTM3IDE1MCAtMTAzIHE2NiAtNjYgMTAyIC0xNDkgcTM4IC04NyAzOCAtMTc5IHEwIC05MiAtMzggLTE3OSBxLTM2IC04MyAtMTAyIC0xNDkgcS02NiAtNjYgLTE1MCAtMTAzIHEtODcgLTM4IC0xNzggLTM4IGwtMTg3NSAwIHEtOTIgMCAtMTc5IDM4IHEtODQgMzcgLTE1MCAxMDMgcS02NiA2NiAtMTAyIDE0OSBxLTM4IDg3IC0zOCAxNzkgcTAgOTIgMzggMTc5IHEzNiA4MyAxMDIgMTQ5IHE2NiA2NiAxNTAgMTAzIHE4NyAzOCAxNzkgMzggWiIgLz48Z2x5cGggZ2x5cGgtbmFtZT0idXNlci1zdGF0dXMtaW52aXNpYmxlIiB1bmljb2RlPSImI3hlYTExOyIgZD0iTTI1MDAgNTAwMCBxLTQwNiAwIC03ODggLTEyOCBxLTM3MCAtMTI0IC02ODYgLTM1NiBxLTMxMyAtMjI5IC01NDIgLTU0MiBxLTIzMiAtMzE2IC0zNTYgLTY4NiBxLTEyOCAtMzgyIC0xMjggLTc4OCBxMCAtNDA2IDEyOCAtNzg4IHExMjQgLTM3MCAzNTYgLTY4NiBxMjI5IC0zMTMgNTQyIC01NDIgcTMxNiAtMjMyIDY4NiAtMzU2IHEzODIgLTEyOCA3ODggLTEyOCBxNDA2IDAgNzg4IDEyOCBxMzcwIDEyNCA2ODYgMzU2IHEzMTMgMjI5IDU0MiA1NDIgcTIzMiAzMTYgMzU2IDY4NiBxMTI4IDM4MiAxMjggNzg4IHEwIDQwNiAtMTI4IDc4OCBxLTEyNCAzNzAgLTM1NiA2ODYgcS0yMjkgMzEzIC01NDIgNTQyIHEtMzE2IDIzMiAtNjg2IDM1NiBxLTM4MiAxMjggLTc4OCAxMjggWk0yNTAwIDQwMDAgcTMxMSAwIDU5MCAtMTE2IHEyNzEgLTExMiA0NzYuNSAtMzE3LjUgcTIwNS41IC0yMDUuNSAzMTcuNSAtNDc2LjUgcTExNiAtMjc5IDExNiAtNTkwIHEwIC0zMTEgLTExNiAtNTkwIHEtMTEyIC0yNzEgLTMxNy41IC00NzYuNSBxLTIwNS41IC0yMDUuNSAtNDc2LjUgLTMxNy41IHEtMjc5IC0xMTYgLTU5MCAtMTE2IHEtMzExIDAgLTU5MCAxMTYgcS0yNzEgMTEyIC00NzYuNSAzMTcuNSBxLTIwNS41IDIwNS41IC0zMTcuNSA0NzYuNSBxLTExNiAyNzkgLTExNiA1OTAgcTAgMzExIDExNiA1OTAgcTExMiAyNzEgMzE3LjUgNDc2LjUgcTIwNS41IDIwNS41IDQ3Ni41IDMxNy41IHEyNzkgMTE2IDU5MCAxMTYgWiIgLz48Z2x5cGggZ2x5cGgtbmFtZT0idXNlci1zdGF0dXMtb25saW5lIiB1bmljb2RlPSImI3hlYTEyOyIgZD0iTTE1MDAgMTUwMCBsMjAwMCAwIGwwIDIwMDAgbC0yMDAwIDAgbDAgLTIwMDAgWk0yNTAwIDUwMDAgcS00MDYgMCAtNzg4IC0xMjggcS0zNzAgLTEyNCAtNjg2IC0zNTYgcS0zMTMgLTIyOSAtNTQyIC01NDIgcS0yMzIgLTMxNiAtMzU2IC02ODYgcS0xMjggLTM4MiAtMTI4IC03ODggcTAgLTQwNiAxMjggLTc4OCBxMTI0IC0zNzAgMzU2IC02ODYgcTIyOSAtMzEzIDU0MiAtNTQyIHEzMTYgLTIzMiA2ODYgLTM1NiBxMzgyIC0xMjggNzg4IC0xMjggcTQwNiAwIDc4OCAxMjggcTM3MCAxMjQgNjg2IDM1NiBxMzEzIDIyOSA1NDIgNTQyIHEyMzIgMzE2IDM1NiA2ODYgcTEyOCAzODIgMTI4IDc4OCBxMCA0MDYgLTEyOCA3ODggcS0xMjQgMzcwIC0zNTYgNjg2IHEtMjI5IDMxMyAtNTQyIDU0MiBxLTMxNiAyMzIgLTY4NiAzNTYgcS0zODIgMTI4IC03ODggMTI4IFoiIC8+PC9mb250PjwvZGVmcz48L3N2Zz4=";
  }, function (t, n, e) {
    "use strict";

    e.d(n, "b", function () {
      return r;
    }), e.d(n, "a", function () {
      return a;
    });
    e(26);
    var A = e(33),
        o = Object(A.getGettextBuilder)().detectLocale();
    [{
      locale: "br",
      translations: {
        "{tag} (invisible)": "{tag} (diwelus)",
        "{tag} (restricted)": "{tag} (bevennet)",
        Actions: "Oberioù",
        Activities: "Oberiantizoù",
        "Animals & Nature": "Loened & Natur",
        Choose: "Dibab",
        Close: "Serriñ",
        Custom: "Personelañ",
        Flags: "Bannieloù",
        "Food & Drink": "Boued & Evajoù",
        "Frequently used": "Implijet alies",
        Next: "Da heul",
        "No emoji found": "Emoji ebet kavet",
        "No results": "Disoc'h ebet",
        Objects: "Traoù",
        "Pause slideshow": "Arsav an diaporama",
        "People & Body": "Tud & Korf",
        "Pick an emoji": "Choaz un emoji",
        Previous: "A-raok",
        Search: "Klask",
        "Search results": "Disoc'hoù an enklask",
        "Select a tag": "Choaz ur c'hlav",
        Settings: "Arventennoù",
        "Smileys & Emotion": "Smileyioù & Fromoù",
        "Start slideshow": "Kregiñ an diaporama",
        Symbols: "Arouezioù",
        "Travel & Places": "Beaj & Lec'hioù",
        "Unable to search the group": "Dibosupl eo klask ar strollad"
      }
    }, {
      locale: "ca",
      translations: {
        "{tag} (invisible)": "{tag} (invisible)",
        "{tag} (restricted)": "{tag} (restringit)",
        Actions: "Accions",
        Activities: "Activitats",
        "Animals & Nature": "Animals i natura",
        Choose: "Tria",
        Close: "Tanca",
        Custom: "Personalitzat",
        Flags: "Marques",
        "Food & Drink": "Menjar i begudes",
        "Frequently used": "Utilitzats recentment",
        "Message limit of {count} characters reached": "S'ha arribat al límit de {count} caràcters per missatge",
        Next: "Següent",
        "No emoji found": "No s'ha trobat cap emoji",
        "No results": "Sense resultats",
        Objects: "Objectes",
        "Pause slideshow": "Atura la presentació",
        "People & Body": "Persones i cos",
        "Pick an emoji": "Trieu un emoji",
        Previous: "Anterior",
        Search: "Cerca",
        "Search results": "Resultats de cerca",
        "Select a tag": "Selecciona una etiqueta",
        Settings: "Paràmetres",
        "Settings navigation": "Navegació d'opcions",
        "Smileys & Emotion": "Cares i emocions",
        "Start slideshow": "Inicia la presentació",
        Symbols: "Símbols",
        "Travel & Places": "Viatges i llocs",
        "Unable to search the group": "No es pot cercar el grup",
        "Write message, @ to mention someone …": "Escriu un missatge, @ per mencionar algú..."
      }
    }, {
      locale: "cs_CZ",
      translations: {
        "{tag} (invisible)": "{tag} (neviditelné)",
        "{tag} (restricted)": "{tag} (omezené)",
        Actions: "Akce",
        Activities: "Aktivity",
        "Animals & Nature": "Zvířata a příroda",
        Choose: "Zvolit",
        Close: "Zavřít",
        Custom: "Uživatelsky určené",
        "External documentation for {title}": "Externí dokumentace k {title}",
        Flags: "Příznaky",
        "Food & Drink": "Jídlo a pití",
        "Frequently used": "Často používané",
        "Message limit of {count} characters reached": "Dosaženo limitu počtu ({count}) znaků zprávy",
        Next: "Následující",
        "No emoji found": "Nenalezeno žádné emoji",
        "No results": "Nic nenalezeno",
        Objects: "Objekty",
        "Pause slideshow": "Pozastavit prezentaci",
        "People & Body": "Lidé a tělo",
        "Pick an emoji": "Vybrat emoji",
        Previous: "Předchozí",
        Search: "Hledat",
        "Search results": "Výsledky hledání",
        "Select a tag": "Vybrat štítek",
        Settings: "Nastavení",
        "Settings navigation": "Pohyb po nastavení",
        "Smileys & Emotion": "Úsměvy a emoce",
        "Start slideshow": "Spustit prezentaci",
        Submit: "Odeslat",
        Symbols: "Symboly",
        "Travel & Places": "Cestování a místa",
        "Unable to search the group": "Nedaří se hledat skupinu",
        "Write message, @ to mention someone …": "Pište zprávu, pokud chcete někoho zmínit, použijte @ …"
      }
    }, {
      locale: "da",
      translations: {
        "{tag} (invisible)": "{tag} (usynlig)",
        "{tag} (restricted)": "{tag} (begrænset)",
        Actions: "Handlinger",
        Activities: "Aktiviteter",
        "Animals & Nature": "Dyr & Natur",
        Choose: "Vælg",
        Close: "Luk",
        Custom: "Brugerdefineret",
        Flags: "Flag",
        "Food & Drink": "Mad & Drikke",
        "Frequently used": "Ofte brugt",
        "Message limit of {count} characters reached": "Begrænsning på {count} tegn er nået",
        Next: "Videre",
        "No emoji found": "Ingen emoji fundet",
        "No results": "Ingen resultater",
        Objects: "Objekter",
        "Pause slideshow": "Suspender fremvisning",
        "People & Body": "Mennesker & Menneskekroppen",
        "Pick an emoji": "Vælg en emoji",
        Previous: "Forrige",
        Search: "Søg",
        "Search results": "Søgeresultater",
        "Select a tag": "Vælg et mærke",
        Settings: "Indstillinger",
        "Settings navigation": "Naviger i indstillinger",
        "Smileys & Emotion": "Smileys & Emotion",
        "Start slideshow": "Start fremvisning",
        Symbols: "Symboler",
        "Travel & Places": "Rejser & Rejsemål",
        "Unable to search the group": "Kan ikke søge på denne gruppe",
        "Write message, @ to mention someone …": "Skriv i meddelelse, @ for at nævne nogen  …"
      }
    }, {
      locale: "de",
      translations: {
        "{tag} (invisible)": "{tag} (unsichtbar)",
        "{tag} (restricted)": "{tag} (eingeschränkt)",
        Actions: "Aktionen",
        Activities: "Aktivitäten",
        "Animals & Nature": "Tiere & Natur",
        Choose: "Auswählen",
        Close: "Schließen",
        Custom: "Benutzerdefiniert",
        "External documentation for {title}": "Externe Dokumentation für {title}",
        Flags: "Flaggen",
        "Food & Drink": "Essen & Trinken",
        "Frequently used": "Häufig verwendet",
        "Message limit of {count} characters reached": "Nachrichtenlimit von {count} Zeichen erreicht",
        Next: "Weiter",
        "No emoji found": "Kein Emoji gefunden",
        "No results": "Keine Ergebnisse",
        Objects: "Gegenstände",
        "Pause slideshow": "Diashow pausieren",
        "People & Body": "Menschen & Körper",
        "Pick an emoji": "Ein Emoji auswählen",
        Previous: "Vorherige",
        Search: "Suche",
        "Search results": "Suchergebnisse",
        "Select a tag": "Schlagwort auswählen",
        Settings: "Einstellungen",
        "Settings navigation": "Einstellungen-Navigation",
        "Smileys & Emotion": "Smileys & Emotionen",
        "Start slideshow": "Diashow starten",
        Submit: "Einreichen",
        Symbols: "Symbole",
        "Travel & Places": "Reisen & Orte",
        "Unable to search the group": "Die Gruppe konnte nicht durchsucht werden",
        "Write message, @ to mention someone …": "Nachricht schreiben, @ um jemanden zu erwähnen ..."
      }
    }, {
      locale: "de_DE",
      translations: {
        "{tag} (invisible)": "{tag} (unsichtbar)",
        "{tag} (restricted)": "{tag} (eingeschränkt)",
        Actions: "Aktionen",
        Activities: "Aktivitäten",
        "Animals & Nature": "Tiere & Natur",
        Choose: "Auswählen",
        Close: "Schließen",
        Custom: "Benutzerdefiniert",
        "External documentation for {title}": "Externe Dokumentation für {title}",
        Flags: "Flaggen",
        "Food & Drink": "Essen & Trinken",
        "Frequently used": "Häufig verwendet",
        "Message limit of {count} characters reached": "Nachrichtenlimit von {count} Zeichen erreicht",
        Next: "Weiter",
        "No emoji found": "Kein Emoji gefunden",
        "No results": "Keine Ergebnisse",
        Objects: "Gegenstände",
        "Pause slideshow": "Diashow pausieren",
        "People & Body": "Menschen & Körper",
        "Pick an emoji": "Ein Emoji auswählen",
        Previous: "Vorherige",
        Search: "Suche",
        "Search results": "Suchergebnisse",
        "Select a tag": "Schlagwort auswählen",
        Settings: "Einstellungen",
        "Settings navigation": "Einstellungen-Navigation",
        "Smileys & Emotion": "Smileys & Emotionen",
        "Start slideshow": "Diashow starten",
        Submit: "Einreichen",
        Symbols: "Symbole",
        "Travel & Places": "Reisen & Orte",
        "Unable to search the group": "Die Gruppe kann nicht durchsucht werden",
        "Write message, @ to mention someone …": "Nachricht schreiben, @ um jemanden zu erwähnen ..."
      }
    }, {
      locale: "el",
      translations: {
        "{tag} (invisible)": "{tag} (αόρατο)",
        "{tag} (restricted)": "{tag} (περιορισμένο)",
        Actions: "Ενέργειες",
        Activities: "Δραστηριότητες",
        "Animals & Nature": "Ζώα & Φύση",
        Choose: "Επιλογή",
        Close: "Κλείσιμο",
        Custom: "Προσαρμογή",
        Flags: "Σημαίες",
        "Food & Drink": "Φαγητό & Ποτό",
        "Frequently used": "Συχνά χρησιμοποιούμενο",
        Next: "Επόμενο",
        "No emoji found": "Δεν βρέθηκε emoji",
        "No results": "Κανένα αποτέλεσμα",
        Objects: "Αντικείμενα",
        "Pause slideshow": "Παύση προβολής διαφανειών",
        "People & Body": "Άνθρωποι & Σώμα",
        "Pick an emoji": "Επιλέξτε ένα emoji",
        Previous: "Προηγούμενο",
        Search: "Αναζήτηση",
        "Search results": "Αποτελέσματα αναζήτησης",
        "Select a tag": "Επιλογή ετικέτας",
        Settings: "Ρυθμίσεις",
        "Smileys & Emotion": "Φατσούλες & Συναίσθημα",
        "Start slideshow": "Έναρξη προβολής διαφανειών",
        Symbols: "Σύμβολα",
        "Travel & Places": "Ταξίδια & Τοποθεσίες",
        "Unable to search the group": "Δεν είναι δυνατή η αναζήτηση της ομάδας"
      }
    }, {
      locale: "eo",
      translations: {
        "{tag} (invisible)": "{tag} (kaŝita)",
        "{tag} (restricted)": "{tag} (limigita)",
        Actions: "Agoj",
        Activities: "Aktiveco",
        "Animals & Nature": "Bestoj & Naturo",
        Choose: "Elektu",
        Close: "Fermu",
        Custom: "Propra",
        Flags: "Flagoj",
        "Food & Drink": "Manĝaĵo & Trinkaĵo",
        "Frequently used": "Ofte uzataj",
        "Message limit of {count} characters reached": "La limo je {count} da literoj atingita",
        Next: "Sekva",
        "No emoji found": "La emoĝio forestas",
        "No results": "La rezulto forestas",
        Objects: "Objektoj",
        "Pause slideshow": "Payzi bildprezenton",
        "People & Body": "Homoj & Korpo",
        "Pick an emoji": "Elekti emoĝion ",
        Previous: "Antaŭa",
        Search: "Serĉi",
        "Search results": "Serĉrezultoj",
        "Select a tag": "Elektu etikedon",
        Settings: "Agordo",
        "Settings navigation": "Agorda navigado",
        "Smileys & Emotion": "Ridoj kaj Emocioj",
        "Start slideshow": "Komenci bildprezenton",
        Symbols: "Signoj",
        "Travel & Places": "Vojaĵoj & Lokoj",
        "Unable to search the group": "Ne eblas serĉi en la grupo",
        "Write message, @ to mention someone …": "Mesaĝi, uzu @ por mencii iun ..."
      }
    }, {
      locale: "es",
      translations: {
        "{tag} (invisible)": "{tag} (invisible)",
        "{tag} (restricted)": "{tag} (restringido)",
        Actions: "Acciones",
        Activities: "Actividades",
        "Animals & Nature": "Animales y naturaleza",
        Choose: "Elegir",
        Close: "Cerrar",
        Custom: "Personalizado",
        Flags: "Banderas",
        "Food & Drink": "Comida y bebida",
        "Frequently used": "Usado con frecuenca",
        "Message limit of {count} characters reached": "El mensaje ha alcanzado el límite de {count} caracteres",
        Next: "Siguiente",
        "No emoji found": "No hay ningún emoji",
        "No results": " Ningún resultado",
        Objects: "Objetos",
        "Pause slideshow": "Pausar la presentación ",
        "People & Body": "Personas y cuerpos",
        "Pick an emoji": "Elegir un emoji",
        Previous: "Anterior",
        Search: "Buscar",
        "Search results": "Resultados de la búsqueda",
        "Select a tag": "Seleccione una etiqueta",
        Settings: "Ajustes",
        "Settings navigation": "Navegación por ajustes",
        "Smileys & Emotion": "Smileys y emoticonos",
        "Start slideshow": "Iniciar la presentación",
        Symbols: "Símbolos",
        "Travel & Places": "Viajes y lugares",
        "Unable to search the group": "No es posible buscar en el grupo",
        "Write message, @ to mention someone …": "Escriba un mensaje, @ para mencionar a alguien..."
      }
    }, {
      locale: "eu",
      translations: {
        "{tag} (invisible)": "{tag} (ikusezina)",
        "{tag} (restricted)": "{tag} (mugatua)",
        Choose: "Aukeratu",
        Close: "Itxi",
        Next: "Hurrengoa",
        "No results": "Emaitzarik ez",
        "Pause slideshow": "Pausatu diaporama",
        Previous: "Aurrekoa",
        "Select a tag": "Hautatu etiketa bat",
        Settings: "Ezarpenak",
        "Start slideshow": "Hasi diaporama"
      }
    }, {
      locale: "fi_FI",
      translations: {
        "{tag} (invisible)": "{tag} (näkymätön)",
        "{tag} (restricted)": "{tag} (rajoitettu)",
        Actions: "Toiminnot",
        Activities: "Aktiviteetit",
        "Animals & Nature": "Eläimet & luonto",
        Choose: "Valitse",
        Close: "Sulje",
        Custom: "Mukautettu",
        Flags: "Liput",
        "Food & Drink": "Ruoka & juoma",
        "Frequently used": "Usein käytetyt",
        "Message limit of {count} characters reached": "Viestin maksimimerkkimäärä  {count} täynnä ",
        Next: "Seuraava",
        "No emoji found": "Emojia ei löytynyt",
        "No results": "Ei tuloksia",
        Objects: "Esineet & asiat",
        "Pause slideshow": "Keskeytä diaesitys",
        "People & Body": "Ihmiset & keho",
        "Pick an emoji": "Valitse emoji",
        Previous: "Edellinen",
        Search: "Etsi",
        "Search results": "Hakutulokset",
        "Select a tag": "Valitse tagi",
        Settings: "Asetukset",
        "Settings navigation": "Asetusnavigaatio",
        "Smileys & Emotion": "Hymiöt ja & tunteet",
        "Start slideshow": "Aloita diaesitys",
        Symbols: "Symbolit",
        "Travel & Places": "Matkustus & kohteet",
        "Unable to search the group": "Ryhmää ei voi hakea",
        "Write message, @ to mention someone …": "Kirjoita viesti, @ mainitaksesi jonkun..."
      }
    }, {
      locale: "fr",
      translations: {
        "{tag} (invisible)": "{tag} (invisible)",
        "{tag} (restricted)": "{tag} (restreint)",
        Actions: "Actions",
        Activities: "Activités",
        "Animals & Nature": "Animaux & Nature",
        Choose: "Choisir",
        Close: "Fermer",
        Custom: "Personnalisé",
        Flags: "Drapeaux",
        "Food & Drink": "Nourriture & Boissons",
        "Frequently used": "Utilisés fréquemment",
        "Message limit of {count} characters reached": "Limite de messages de {count} caractères atteinte",
        Next: "Suivant",
        "No emoji found": "Pas d’émoji trouvé",
        "No results": "Aucun résultat",
        Objects: "Objets",
        "Pause slideshow": "Mettre le diaporama en pause",
        "People & Body": "Personnes & Corps",
        "Pick an emoji": "Choisissez un émoji",
        Previous: "Précédent",
        Search: "Chercher",
        "Search results": "Résultats de recherche",
        "Select a tag": "Sélectionnez une balise",
        Settings: "Paramètres",
        "Settings navigation": "Navigation dans les paramètres",
        "Smileys & Emotion": "Smileys & Émotions",
        "Start slideshow": "Démarrer le diaporama",
        Symbols: "Symboles",
        "Travel & Places": "Voyage & Lieux",
        "Unable to search the group": "Impossible de chercher le groupe",
        "Write message, @ to mention someone …": "Écrivez un message, @ pour mentionner quelqu'un…"
      }
    }, {
      locale: "gl",
      translations: {
        "{tag} (invisible)": "{tag} (invisíbel)",
        "{tag} (restricted)": "{tag} (restrinxido)",
        Actions: "Accións",
        Activities: "Actividades",
        "Animals & Nature": "Animais e natureza",
        Choose: "Escoller",
        Close: "Pechar",
        Custom: "Personalizado",
        Flags: "Bandeiras",
        "Food & Drink": "Comida e bebida",
        "Frequently used": "Usado con frecuencia",
        "Message limit of {count} characters reached": "Acadouse o límite de {count} caracteres por mensaxe",
        Next: "Seguinte",
        "No emoji found": "Non se atopou ningún «emoji»",
        "No results": "Sen resultados",
        Objects: "Obxectos",
        "Pause slideshow": "Pausar o diaporama",
        "People & Body": "Persoas e corpo",
        "Pick an emoji": "Escolla un «emoji»",
        Previous: "Anterir",
        Search: "Buscar",
        "Search results": "Resultados da busca",
        "Select a tag": "Seleccione unha etiqueta",
        Settings: "Axustes",
        "Settings navigation": "Navegación de axustes",
        "Smileys & Emotion": "Sorrisos e emocións",
        "Start slideshow": "Iniciar o diaporama",
        Symbols: "Símbolos",
        "Travel & Places": "Viaxes e lugares",
        "Unable to search the group": "Non foi posíbel buscar o grupo",
        "Write message, @ to mention someone …": "Escriba a mensaxe, @ para mencionar a alguén…"
      }
    }, {
      locale: "he",
      translations: {
        "{tag} (invisible)": "{tag} (נסתר)",
        "{tag} (restricted)": "{tag} (מוגבל)",
        Actions: "פעולות",
        Activities: "פעילויות",
        "Animals & Nature": "חיות וטבע",
        Choose: "בחירה",
        Close: "סגירה",
        Custom: "בהתאמה אישית",
        Flags: "דגלים",
        "Food & Drink": "מזון ומשקאות",
        "Frequently used": "בשימוש תדיר",
        Next: "הבא",
        "No emoji found": "לא נמצא אמוג׳י",
        "No results": "אין תוצאות",
        Objects: "חפצים",
        "Pause slideshow": "השהיית מצגת",
        "People & Body": "אנשים וגוף",
        "Pick an emoji": "נא לבחור אמוג׳י",
        Previous: "הקודם",
        Search: "חיפוש",
        "Search results": "תוצאות חיפוש",
        "Select a tag": "בחירת תגית",
        Settings: "הגדרות",
        "Smileys & Emotion": "חייכנים ורגשונים",
        "Start slideshow": "התחלת המצגת",
        Symbols: "סמלים",
        "Travel & Places": "טיולים ומקומות",
        "Unable to search the group": "לא ניתן לחפש בקבוצה"
      }
    }, {
      locale: "hu_HU",
      translations: {
        "{tag} (invisible)": "{tag} (láthatatlan)",
        "{tag} (restricted)": "{tag} (korlátozott)",
        Actions: "Műveletek",
        Activities: "Tevékenységek",
        "Animals & Nature": "Állatok és természet",
        Choose: "Válassszon",
        Close: "Bezárás",
        Custom: "Egyéni",
        Flags: "Zászló",
        "Food & Drink": "Étel és ital",
        "Frequently used": "Gyakran használt",
        "Message limit of {count} characters reached": "{count} karakteres üzenetkorlát elérve",
        Next: "Következő",
        "No emoji found": "Nem található emodzsi",
        "No results": "Nincs találat",
        Objects: "Tárgyak",
        "Pause slideshow": "Diavetítés szüneteltetése",
        "People & Body": "Emberek és test",
        "Pick an emoji": "Válasszon egy emodzsit",
        Previous: "Előző",
        Search: "Keresés",
        "Search results": "Találatok",
        "Select a tag": "Válasszon címkét",
        Settings: "Beállítások",
        "Settings navigation": "Navigáció a beállításokban",
        "Smileys & Emotion": "Mosolyok és érzelmek",
        "Start slideshow": "Diavetítés indítása",
        Symbols: "Szimbólumok",
        "Travel & Places": "Utazás és helyek",
        "Unable to search the group": "A csoport nem kereshető",
        "Write message, @ to mention someone …": "Írjon üzenetet, @ valaki megemlítéséhez…"
      }
    }, {
      locale: "is",
      translations: {
        "{tag} (invisible)": "{tag} (ósýnilegt)",
        "{tag} (restricted)": "{tag} (takmarkað)",
        Actions: "Aðgerðir",
        Activities: "Aðgerðir",
        "Animals & Nature": "Dýr og náttúra",
        Choose: "Velja",
        Close: "Loka",
        Custom: "Sérsniðið",
        Flags: "Flögg",
        "Food & Drink": "Matur og drykkur",
        "Frequently used": "Oftast notað",
        Next: "Næsta",
        "No emoji found": "Ekkert tjáningartákn fannst",
        "No results": "Engar niðurstöður",
        Objects: "Hlutir",
        "Pause slideshow": "Gera hlé á skyggnusýningu",
        "People & Body": "Fólk og líkami",
        "Pick an emoji": "Veldu tjáningartákn",
        Previous: "Fyrri",
        Search: "Leita",
        "Search results": "Leitarniðurstöður",
        "Select a tag": "Veldu merki",
        Settings: "Stillingar",
        "Smileys & Emotion": "Broskallar og tilfinningar",
        "Start slideshow": "Byrja skyggnusýningu",
        Symbols: "Tákn",
        "Travel & Places": "Staðir og ferðalög",
        "Unable to search the group": "Get ekki leitað í hópnum"
      }
    }, {
      locale: "it",
      translations: {
        "{tag} (invisible)": "{tag} (invisibile)",
        "{tag} (restricted)": "{tag} (limitato)",
        Actions: "Azioni",
        Activities: "Attività",
        "Animals & Nature": "Animali e natura",
        Choose: "Scegli",
        Close: "Chiudi",
        Custom: "Personalizzato",
        "External documentation for {title}": "Documentazione esterna per {title}",
        Flags: "Bandiere",
        "Food & Drink": "Cibo e bevande",
        "Frequently used": "Usati di frequente",
        "Message limit of {count} characters reached": "Limite dei messaggi di {count} caratteri raggiunto",
        Next: "Successivo",
        "No emoji found": "Nessun emoji trovato",
        "No results": "Nessun risultato",
        Objects: "Oggetti",
        "Pause slideshow": "Presentazione in pausa",
        "People & Body": "Persone e corpo",
        "Pick an emoji": "Scegli un emoji",
        Previous: "Precedente",
        Search: "Cerca",
        "Search results": "Risultati di ricerca",
        "Select a tag": "Seleziona un'etichetta",
        Settings: "Impostazioni",
        "Settings navigation": "Navigazione delle impostazioni",
        "Smileys & Emotion": "Faccine ed emozioni",
        "Start slideshow": "Avvia presentazione",
        Submit: "Invia",
        Symbols: "Simboli",
        "Travel & Places": "Viaggi e luoghi",
        "Unable to search the group": "Impossibile cercare il gruppo",
        "Write message, @ to mention someone …": "Scrivi messaggio, @ per menzionare qualcuno…"
      }
    }, {
      locale: "ja_JP",
      translations: {
        "{tag} (invisible)": "{タグ} (不可視)",
        "{tag} (restricted)": "{タグ} (制限付)",
        Actions: "操作",
        Activities: "アクティビティ",
        "Animals & Nature": "動物と自然",
        Choose: "選択",
        Close: "閉じる",
        Custom: "カスタム",
        Flags: "国旗",
        "Food & Drink": "食べ物と飲み物",
        "Frequently used": "よく使うもの",
        "Message limit of {count} characters reached": "{count} 文字のメッセージ上限に達しています",
        Next: "次",
        "No emoji found": "絵文字が見つかりません",
        "No results": "なし",
        Objects: "物",
        "Pause slideshow": "スライドショーを一時停止",
        "People & Body": "様々な人と体の部位",
        "Pick an emoji": "絵文字を選択",
        Previous: "前",
        Search: "検索",
        "Search results": "検索結果",
        "Select a tag": "タグを選択",
        Settings: "設定",
        "Settings navigation": "ナビゲーション設定",
        "Smileys & Emotion": "笑顔と気持ち",
        "Start slideshow": "スライドショーを開始",
        Symbols: "記号",
        "Travel & Places": "旅行と場所",
        "Unable to search the group": "グループを検索できません",
        "Write message, @ to mention someone …": "メッセージを書く、@ で通知します。"
      }
    }, {
      locale: "lt_LT",
      translations: {
        "{tag} (invisible)": "{tag} (nematoma)",
        "{tag} (restricted)": "{tag} (apribota)",
        Actions: "Veiksmai",
        Activities: "Veiklos",
        "Animals & Nature": "Gyvūnai ir gamta",
        Choose: "Pasirinkti",
        Close: "Užverti",
        Custom: "Tinkinti",
        "External documentation for {title}": "Išorinė {title} dokumentacija",
        Flags: "Vėliavos",
        "Food & Drink": "Maistas ir gėrimai",
        "Frequently used": "Dažniausiai naudoti",
        "Message limit of {count} characters reached": "Pasiekta {count} simbolių žinutės riba",
        Next: "Kitas",
        "No emoji found": "Nerasta jaustukų",
        "No results": "Nėra rezultatų",
        Objects: "Objektai",
        "Pause slideshow": "Pristabdyti skaidrių rodymą",
        "People & Body": "Žmonės ir kūnas",
        "Pick an emoji": "Pasirinkti jaustuką",
        Previous: "Ankstesnis",
        Search: "Ieškoti",
        "Search results": "Paieškos rezultatai",
        "Select a tag": "Pasirinkti žymę",
        Settings: "Nustatymai",
        "Settings navigation": "Naršymas nustatymuose",
        "Smileys & Emotion": "Šypsenos ir emocijos",
        "Start slideshow": "Pradėti skaidrių rodymą",
        Submit: "Pateikti",
        Symbols: "Simboliai",
        "Travel & Places": "Kelionės ir vietos",
        "Unable to search the group": "Nepavyko atlikti paiešką grupėje",
        "Write message, @ to mention someone …": "Rašykite žinutę, naudokite @ norėdami kažką paminėti…"
      }
    }, {
      locale: "lv",
      translations: {
        "{tag} (invisible)": "{tag} (neredzams)",
        "{tag} (restricted)": "{tag} (ierobežots)",
        Choose: "Izvēlēties",
        Close: "Aizvērt",
        Next: "Nākamais",
        "No results": "Nav rezultātu",
        "Pause slideshow": "Pauzēt slaidrādi",
        Previous: "Iepriekšējais",
        "Select a tag": "Izvēlēties birku",
        Settings: "Iestatījumi",
        "Start slideshow": "Sākt slaidrādi"
      }
    }, {
      locale: "mk",
      translations: {
        "{tag} (invisible)": "{tag} (невидливо)",
        "{tag} (restricted)": "{tag} (ограничено)",
        Actions: "Акции",
        Activities: "Активности",
        "Animals & Nature": "Животни & Природа",
        Choose: "Избери",
        Close: "Затвори",
        Custom: "Прилагодени",
        Flags: "Знамиња",
        "Food & Drink": "Храна & Пијалоци",
        "Frequently used": "Најчесто користени",
        "Message limit of {count} characters reached": "Ограничувањето на должината на пораката од {count} карактери е надминато",
        Next: "Следно",
        "No emoji found": "Не се пронајдени емотикони",
        "No results": "Нема резултати",
        Objects: "Објекти",
        "Pause slideshow": "Пузирај слајдшоу",
        "People & Body": "Луѓе & Тело",
        "Pick an emoji": "Избери емотикон",
        Previous: "Предходно",
        Search: "Барај",
        "Search results": "Резултати од барувањето",
        "Select a tag": "Избери ознака",
        Settings: "Параметри",
        "Settings navigation": "Параметри за навигација",
        "Smileys & Emotion": "Смешковци & Емотикони",
        "Start slideshow": "Стартувај слајдшоу",
        Symbols: "Симболи",
        "Travel & Places": "Патувања & Места",
        "Unable to search the group": "Неможе да се принајде групата",
        "Write message, @ to mention someone …": "Напиши порака, @ за да спомнеш некој …"
      }
    }, {
      locale: "nb_NO",
      translations: {
        "{tag} (invisible)": "{tag} (usynlig)",
        "{tag} (restricted)": "{tag} (beskyttet)",
        Actions: "Handlinger",
        Activities: "Aktiviteter",
        "Animals & Nature": "Dyr og natur",
        Choose: "Velg",
        Close: "Lukk",
        Custom: "Selvvalgt",
        Flags: "Flagg",
        "Food & Drink": "Mat og drikke",
        "Frequently used": "Ofte brukt",
        Next: "Neste",
        "No emoji found": "Fant ingen emoji",
        "No results": "Ingen resultater",
        Objects: "Objekter",
        "Pause slideshow": "Pause lysbildefremvisning",
        "People & Body": "Mennesker og kropp",
        "Pick an emoji": "Velg en emoji",
        Previous: "Forrige",
        Search: "Søk",
        "Search results": "Søkeresultater",
        "Select a tag": "Velg en merkelapp",
        Settings: "Innstillinger",
        "Smileys & Emotion": "Smilefjes og følelser",
        "Start slideshow": "Start lysbildefremvisning",
        Symbols: "Symboler",
        "Travel & Places": "Reise og steder",
        "Unable to search the group": "Kunne ikke søke i gruppen"
      }
    }, {
      locale: "nl",
      translations: {
        "{tag} (invisible)": "{tag} (onzichtbaar)",
        "{tag} (restricted)": "{tag} (beperkt)",
        Actions: "Acties",
        Activities: "Activiteiten",
        "Animals & Nature": "Dieren & Natuur",
        Choose: "Kies",
        Close: "Sluiten",
        Custom: "Aangepast",
        Flags: "Vlaggen",
        "Food & Drink": "Eten & Drinken",
        "Frequently used": "Vaak gebruikt",
        "Message limit of {count} characters reached": "Berichtlengte van {count} karakters bereikt",
        Next: "Volgende",
        "No emoji found": "Geen emoji gevonden",
        "No results": "Geen resultaten",
        Objects: "Objecten",
        "Pause slideshow": "Pauzeer diavoorstelling",
        "People & Body": "Mensen & Lichaam",
        "Pick an emoji": "Kies een emoji",
        Previous: "Vorige",
        Search: "Zoeken",
        "Search results": "Zoekresultaten",
        "Select a tag": "Selecteer een label",
        Settings: "Instellingen",
        "Settings navigation": "Instellingen navigatie",
        "Smileys & Emotion": "Smileys & Emotie",
        "Start slideshow": "Start diavoorstelling",
        Symbols: "Symbolen",
        "Travel & Places": "Reizen & Plaatsen",
        "Unable to search the group": "Kan niet in de groep zoeken",
        "Write message, @ to mention someone …": "Schrijf een bericht, @ om iemand te noemen ..."
      }
    }, {
      locale: "oc",
      translations: {
        "{tag} (invisible)": "{tag} (invisible)",
        "{tag} (restricted)": "{tag} (limit)",
        Actions: "Accions",
        Choose: "Causir",
        Close: "Tampar",
        Next: "Seguent",
        "No results": "Cap de resultat",
        "Pause slideshow": "Metre en pausa lo diaporama",
        Previous: "Precedent",
        "Select a tag": "Seleccionar una etiqueta",
        Settings: "Paramètres",
        "Start slideshow": "Lançar lo diaporama"
      }
    }, {
      locale: "pl",
      translations: {
        "{tag} (invisible)": "{tag} (niewidoczna)",
        "{tag} (restricted)": "{tag} (ograniczona)",
        Actions: "Działania",
        Activities: "Aktywność",
        "Animals & Nature": "Zwierzęta i natura",
        Choose: "Wybierz",
        Close: "Zamknij",
        Custom: "Zwyczajne",
        "External documentation for {title}": "Dokumentacja zewnętrzna dla {title}",
        Flags: "Flagi",
        "Food & Drink": "Jedzenie i picie",
        "Frequently used": "Często używane",
        "Message limit of {count} characters reached": "Przekroczono limit wiadomości wynoszący {count} znaków",
        Next: "Następny",
        "No emoji found": "Nie znaleziono emotikonów",
        "No results": "Brak wyników",
        Objects: "Obiekty",
        "Pause slideshow": "Wstrzymaj pokaz slajdów",
        "People & Body": "Ludzie i ciało",
        "Pick an emoji": "Wybierz emoji",
        Previous: "Poprzedni",
        Search: "Szukaj",
        "Search results": "Wyniki wyszukiwania",
        "Select a tag": "Wybierz etykietę",
        Settings: "Ustawienia",
        "Settings navigation": "Nawigacja ustawień",
        "Smileys & Emotion": "Buźki i emotikony",
        "Start slideshow": "Rozpocznij pokaz slajdów",
        Submit: "Wyślij",
        Symbols: "Symbole",
        "Travel & Places": "Podróże i miejsca",
        "Unable to search the group": "Nie można przeszukać grupy",
        "Write message, @ to mention someone …": "Napisz wiadomość, aby wspomnieć o kimś użyj @…"
      }
    }, {
      locale: "pt_BR",
      translations: {
        "{tag} (invisible)": "{tag} (invisível)",
        "{tag} (restricted)": "{tag} (restrito) ",
        Actions: "Ações",
        Activities: "Atividades",
        "Animals & Nature": "Animais & Natureza",
        Choose: "Escolher",
        Close: "Fechar",
        Custom: "Personalizado",
        "External documentation for {title}": "Documentação externa para {title}",
        Flags: "Bandeiras",
        "Food & Drink": "Comida & Bebida",
        "Frequently used": "Mais usados",
        "Message limit of {count} characters reached": "Limite de mensagem de {count} caracteres atingido",
        Next: "Próximo",
        "No emoji found": "Nenhum emoji encontrado",
        "No results": "Sem resultados",
        Objects: "Objetos",
        "Pause slideshow": "Pausar apresentação de slides",
        "People & Body": "Pessoas & Corpo",
        "Pick an emoji": "Escolha um emoji",
        Previous: "Anterior",
        Search: "Pesquisar",
        "Search results": "Resultados da pesquisa",
        "Select a tag": "Selecionar uma tag",
        Settings: "Configurações",
        "Settings navigation": "Navegação de configurações",
        "Smileys & Emotion": "Smiles & Emoções",
        "Start slideshow": "Iniciar apresentação de slides",
        Submit: "Enviar",
        Symbols: "Símbolo",
        "Travel & Places": "Viagem & Lugares",
        "Unable to search the group": "Não foi possível pesquisar o grupo",
        "Write message, @ to mention someone …": "Escreva mensagem, @ para mencionar alguém ..."
      }
    }, {
      locale: "pt_PT",
      translations: {
        "{tag} (invisible)": "{tag} (invisivel)",
        "{tag} (restricted)": "{tag} (restrito)",
        Actions: "Ações",
        Choose: "Escolher",
        Close: "Fechar",
        Next: "Seguinte",
        "No results": "Sem resultados",
        "Pause slideshow": "Pausar diaporama",
        Previous: "Anterior",
        "Select a tag": "Selecionar uma etiqueta",
        Settings: "Definições",
        "Start slideshow": "Iniciar diaporama",
        "Unable to search the group": "Não é possível pesquisar o grupo"
      }
    }, {
      locale: "ru",
      translations: {
        "{tag} (invisible)": "{tag} (невидимое)",
        "{tag} (restricted)": "{tag} (ограниченное)",
        Choose: "Выберите",
        Close: "Закрыть",
        Next: "Следующее",
        "No results": "Результаты отсуствуют",
        "Pause slideshow": "Приостановить показ слйдов",
        Previous: "Предыдущее",
        "Select a tag": "Выберите метку",
        Settings: "Параметры",
        "Start slideshow": "Начать показ слайдов"
      }
    }, {
      locale: "sk_SK",
      translations: {
        "{tag} (invisible)": "{tag} (neviditeľný)",
        "{tag} (restricted)": "{tag} (obmedzený)",
        Actions: "Akcie",
        Activities: "Aktivity",
        "Animals & Nature": "Zvieratá a príroda",
        Choose: "Vybrať",
        Close: "Zatvoriť",
        Custom: "Zvyk",
        Flags: "Vlajky",
        "Food & Drink": "Jedlo a nápoje",
        "Frequently used": "Často používané",
        Next: "Ďalší",
        "No emoji found": "Nenašli sa žiadne emodži",
        "No results": "Žiadne výsledky",
        Objects: "Objekty",
        "Pause slideshow": "Pozastaviť prezentáciu",
        "People & Body": "Ľudia a telo",
        "Pick an emoji": "Vyberte si emodži",
        Previous: "Predchádzajúci",
        Search: "Hľadať",
        "Search results": "Výsledky vyhľadávania",
        "Select a tag": "Vybrať štítok",
        Settings: "Nastavenia",
        "Smileys & Emotion": "Smajlíky a emócie",
        "Start slideshow": "Začať prezentáciu",
        Symbols: "Symboly",
        "Travel & Places": "Cestovanie a miesta",
        "Unable to search the group": "Skupinu sa nepodarilo nájsť"
      }
    }, {
      locale: "sl",
      translations: {
        "{tag} (invisible)": "{tag} (nevidno)",
        "{tag} (restricted)": "{tag} (omejeno)",
        Actions: "Dejanja",
        Activities: "Dejavnosti",
        "Animals & Nature": "Živali in Narava",
        Choose: "Izbor",
        Close: "Zapri",
        Custom: "Po meri",
        Flags: "Zastavice",
        "Food & Drink": "Hrana in Pijača",
        "Frequently used": "Pogostost uporabe",
        Next: "Naslednji",
        "No emoji found": "Ni najdenih izraznih ikon",
        "No results": "Ni zadetkov",
        Objects: "Predmeti",
        "Pause slideshow": "Ustavi predstavitev",
        "People & Body": "Ljudje in Telo",
        "Pick an emoji": "Izbor izrazne ikone",
        Previous: "Predhodni",
        Search: "Iskanje",
        "Search results": "Zadetki iskanja",
        "Select a tag": "Izbor oznake",
        Settings: "Nastavitve",
        "Settings navigation": "Krmarjenje nastavitev",
        "Smileys & Emotion": "Izrazne ikone",
        "Start slideshow": "Začni predstavitev",
        Symbols: "Simboli",
        "Travel & Places": "Potovanja in Kraji",
        "Unable to search the group": "Ni mogoče iskati po skuspini",
        "Write message, @ to mention someone …": "Napišite sporočilo, z @ omenite osebo ..."
      }
    }, {
      locale: "sv",
      translations: {
        "{tag} (invisible)": "{tag} (osynlig)",
        "{tag} (restricted)": "{tag} (begränsad)",
        Actions: "Åtgärder",
        Activities: "Aktiviteter",
        "Animals & Nature": "Djur & Natur",
        Choose: "Välj",
        Close: "Stäng",
        Custom: "Anpassad",
        Flags: "Flaggor",
        "Food & Drink": "Mat & Dryck",
        "Frequently used": "Används ofta",
        "Message limit of {count} characters reached": "Meddelandegräns {count} tecken används",
        Next: "Nästa",
        "No emoji found": "Hittade inga emojis",
        "No results": "Inga resultat",
        Objects: "Objekt",
        "Pause slideshow": "Pausa bildspelet",
        "People & Body": "Kropp & Själ",
        "Pick an emoji": "Välj en emoji",
        Previous: "Föregående",
        Search: "Sök",
        "Search results": "Sökresultat",
        "Select a tag": "Välj en tag",
        Settings: "Inställningar",
        "Settings navigation": "Inställningsmeny",
        "Smileys & Emotion": "Selfies & Känslor",
        "Start slideshow": "Starta bildspelet",
        Symbols: "Symboler",
        "Travel & Places": "Resor & Sevärdigheter",
        "Unable to search the group": "Kunde inte söka i gruppen",
        "Write message, @ to mention someone …": "Skicka meddelande, skriv @ för att omnämna någon ..."
      }
    }, {
      locale: "tr",
      translations: {
        "{tag} (invisible)": "{tag} (görünmez)",
        "{tag} (restricted)": "{tag} (kısıtlı)",
        Actions: "İşlemler",
        Activities: "Etkinlikler",
        "Animals & Nature": "Hayvanlar ve Doğa",
        Choose: "Seçin",
        Close: "Kapat",
        Custom: "Özel",
        "External documentation for {title}": "{title} için dış belgeler",
        Flags: "Bayraklar",
        "Food & Drink": "Yeme ve İçme",
        "Frequently used": "Sık kullanılanlar",
        "Message limit of {count} characters reached": "{count} karakter ileti sınırına ulaşıldı",
        Next: "Sonraki",
        "No emoji found": "Herhangi bir emoji bulunamadı",
        "No results": "Herhangi bir sonuç bulunamadı",
        Objects: "Nesneler",
        "Pause slideshow": "Slayt sunumunu duraklat",
        "People & Body": "İnsanlar ve Beden",
        "Pick an emoji": "Bir emoji seçin",
        Previous: "Önceki",
        Search: "Arama",
        "Search results": "Arama sonuçları",
        "Select a tag": "Bir etiket seçin",
        Settings: "Ayarlar",
        "Settings navigation": "Gezinme ayarları",
        "Smileys & Emotion": "İfadeler ve Duygular",
        "Start slideshow": "Slayt sunumunu başlat",
        Submit: "Gönder",
        Symbols: "Simgeler",
        "Travel & Places": "Gezi ve Yerler",
        "Unable to search the group": "Grupta arama yapılamadı",
        "Write message, @ to mention someone …": "İletiyi yazın. Birini anmak için @ kullanın …"
      }
    }, {
      locale: "uk",
      translations: {
        "{tag} (invisible)": "{tag} (invisible)",
        "{tag} (restricted)": "{tag} (restricted)",
        Actions: "Дії",
        Activities: "Діяльність",
        "Animals & Nature": "Тварини та природа",
        Choose: "Виберіть",
        Close: "Закрити",
        Custom: "Власне",
        Flags: "Прапори",
        "Food & Drink": "Їжа та напитки",
        "Frequently used": "Найчастіші",
        Next: "Вперед",
        "No emoji found": "Емоційки відсутні",
        "No results": "Відсутні результати",
        Objects: "Об'єкти",
        "Pause slideshow": "Пауза у показі слайдів",
        "People & Body": "Люди та жести",
        "Pick an emoji": "Виберіть емоційку",
        Previous: "Назад",
        Search: "Пошук",
        "Search results": "Результати пошуку",
        "Select a tag": "Виберіть позначку",
        Settings: "Налаштування",
        "Smileys & Emotion": "Усміхайлики та емоційки",
        "Start slideshow": "Почати показ слайдів",
        Symbols: "Символи",
        "Travel & Places": "Поїздки та місця",
        "Unable to search the group": "Неможливо шукати в групі"
      }
    }, {
      locale: "zh_CN",
      translations: {
        "{tag} (invisible)": "{tag} （不可见）",
        "{tag} (restricted)": "{tag} （受限）",
        Actions: "行为",
        Activities: "活动",
        "Animals & Nature": "动物 & 自然",
        Choose: "选择",
        Close: "关闭",
        Custom: "自定义",
        Flags: "旗帜",
        "Food & Drink": "食物 & 饮品",
        "Frequently used": "经常使用",
        "Message limit of {count} characters reached": "已达到 {count} 个字符的消息限制",
        Next: "下一个",
        "No emoji found": "表情未找到",
        "No results": "无结果",
        Objects: "物体",
        "Pause slideshow": "暂停幻灯片",
        "People & Body": "人 & 身体",
        "Pick an emoji": "选择一个表情",
        Previous: "上一个",
        Search: "搜索",
        "Search results": "搜索结果",
        "Select a tag": "选择一个标签",
        Settings: "设置",
        "Settings navigation": "设置向导",
        "Smileys & Emotion": "笑脸 & 情感",
        "Start slideshow": "开始幻灯片",
        Symbols: "符号",
        "Travel & Places": "旅游 & 地点",
        "Unable to search the group": "无法搜索分组",
        "Write message, @ to mention someone …": "输入消息，输入 @ 来提醒某人"
      }
    }, {
      locale: "zh_HK",
      translations: {
        "{tag} (invisible)": "{tag} (隱藏)",
        "{tag} (restricted)": "{tag} (受限)",
        Actions: "動作",
        Activities: "活動",
        "Animals & Nature": "動物與自然",
        Choose: "選擇",
        Close: "關閉",
        Custom: "自定義",
        "External documentation for {title}": "{title} 的外部文檔",
        Flags: "旗幟",
        "Food & Drink": "食物與飲料",
        "Frequently used": "經常使用",
        "Message limit of {count} characters reached": "已達到訊息最多 {count} 字元限制",
        Next: "下一個",
        "No emoji found": "未找到表情符號",
        "No results": "無結果",
        Objects: "物件",
        "Pause slideshow": "暫停幻燈片",
        "People & Body": "人物",
        "Pick an emoji": "選擇表情符號",
        Previous: "上一個",
        Search: "搜尋",
        "Search results": "搜尋結果",
        "Select a tag": "選擇標籤",
        Settings: "設定",
        "Settings navigation": "設定值導覽",
        "Smileys & Emotion": "表情",
        "Start slideshow": "開始幻燈片",
        Submit: "提交",
        Symbols: "標誌",
        "Travel & Places": "旅遊與景點",
        "Unable to search the group": "無法搜尋群組",
        "Write message, @ to mention someone …": "輸入訊息時可使用 @ 來標示某人..."
      }
    }, {
      locale: "zh_TW",
      translations: {
        "{tag} (invisible)": "{tag} (隱藏)",
        "{tag} (restricted)": "{tag} (受限)",
        Actions: "動作",
        Activities: "活動",
        "Animals & Nature": "動物與自然",
        Choose: "選擇",
        Close: "關閉",
        Custom: "自定義",
        Flags: "旗幟",
        "Food & Drink": "食物與飲料",
        "Frequently used": "最近使用",
        "Message limit of {count} characters reached": "已達到訊息最多 {count} 字元限制",
        Next: "下一個",
        "No emoji found": "未找到表情符號",
        "No results": "無結果",
        Objects: "物件",
        "Pause slideshow": "暫停幻燈片",
        "People & Body": "人物",
        "Pick an emoji": "選擇表情符號",
        Previous: "上一個",
        Search: "搜尋",
        "Search results": "搜尋結果",
        "Select a tag": "選擇標籤",
        Settings: "設定",
        "Settings navigation": "設定值導覽",
        "Smileys & Emotion": "表情",
        "Start slideshow": "開始幻燈片",
        Symbols: "標誌",
        "Travel & Places": "旅遊與景點",
        "Unable to search the group": "無法搜尋群組",
        "Write message, @ to mention someone …": "輸入訊息時可使用 @ 來標示某人..."
      }
    }].forEach(function (t) {
      var n = {};

      for (var e in t.translations) {
        t.translations[e].pluralId ? n[e] = {
          msgid: e,
          msgid_plural: t.translations[e].pluralId,
          msgstr: t.translations[e].msgstr
        } : n[e] = {
          msgid: e,
          msgstr: [t.translations[e]]
        };
      }

      o.addTranslation(t.locale, {
        translations: {
          "": n
        }
      });
    });
    var i = o.build(),
        a = i.ngettext.bind(i),
        r = i.gettext.bind(i);
  },, function (t, n) {
    t.exports = __webpack_require__(/*! core-js/modules/es.function.name.js */ "./node_modules/core-js/modules/es.function.name.js");
  }, function (t, n) {
    t.exports = __webpack_require__(/*! core-js/modules/es.regexp.exec.js */ "./node_modules/core-js/modules/es.regexp.exec.js");
  }, function (t, n) {
    t.exports = __webpack_require__(/*! core-js/modules/es.string.iterator.js */ "./node_modules/core-js/modules/es.string.iterator.js");
  }, function (t, n) {
    t.exports = __webpack_require__(/*! core-js/modules/es.array.iterator.js */ "./node_modules/core-js/modules/es.array.iterator.js");
  }, function (t, n) {
    t.exports = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");
  }, function (t, n, e) {
    "use strict";

    var A = e(0),
        o = e.n(A),
        i = e(1),
        a = e.n(i)()(o.a);
    a.push([t.i, ".popover{z-index:100000;display:block !important;filter:drop-shadow(0 1px 10px var(--color-box-shadow))}.popover__inner{padding:0;color:var(--color-main-text);border-radius:var(--border-radius);background:var(--color-main-background)}.popover__arrow{position:absolute;z-index:1;width:0;height:0;margin:10px;border-style:solid;border-color:var(--color-main-background)}.popover[x-placement^='top']{margin-bottom:10px}.popover[x-placement^='top'] .popover__arrow{bottom:-10px;left:calc(50% - $arrow-width);margin-top:0;margin-bottom:0;border-width:10px 10px 0 10px;border-right-color:transparent !important;border-bottom-color:transparent !important;border-left-color:transparent !important}.popover[x-placement^='bottom']{margin-top:10px}.popover[x-placement^='bottom'] .popover__arrow{top:-10px;left:calc(50% - $arrow-width);margin-top:0;margin-bottom:0;border-width:0 10px 10px 10px;border-top-color:transparent !important;border-right-color:transparent !important;border-left-color:transparent !important}.popover[x-placement^='right']{margin-left:10px}.popover[x-placement^='right'] .popover__arrow{top:calc(50% - $arrow-width);left:-10px;margin-right:0;margin-left:0;border-width:10px 10px 10px 0;border-top-color:transparent !important;border-bottom-color:transparent !important;border-left-color:transparent !important}.popover[x-placement^='left']{margin-right:10px}.popover[x-placement^='left'] .popover__arrow{top:calc(50% - $arrow-width);right:-10px;margin-right:0;margin-left:0;border-width:10px 0 10px 10px;border-top-color:transparent !important;border-right-color:transparent !important;border-bottom-color:transparent !important}.popover[aria-hidden='true']{visibility:hidden;transition:opacity var(--animation-quick),visibility var(--animation-quick);opacity:0}.popover[aria-hidden='false']{visibility:visible;transition:opacity var(--animation-quick);opacity:1}\n", "", {
      version: 3,
      sources: ["webpack://./Popover.vue"],
      names: [],
      mappings: "AAgHA,SACC,cAAe,CACf,wBAAyB,CAEzB,sDAAuD,CAEvD,gBACC,SAAU,CACV,4BAA6B,CAC7B,kCAAmC,CACnC,uCAAwC,CACxC,gBAGA,iBAAkB,CAClB,SAAU,CACV,OAAQ,CACR,QAAS,CACT,WApBgB,CAqBhB,kBAAmB,CACnB,yCAA0C,CApB5C,6BAwBE,kBA1BgB,CAElB,6CA2BG,YA7Be,CA8Bf,6BAA8B,CAC9B,YAAa,CACb,eAAgB,CAChB,6BAjCe,CAkCf,yCAA0C,CAC1C,0CAA2C,CAC3C,wCAAyC,CAlC5C,gCAuCE,eAzCgB,CAElB,gDA0CG,SA5Ce,CA6Cf,6BAA8B,CAC9B,YAAa,CACb,eAAgB,CAChB,6BAhDe,CAiDf,uCAAwC,CACxC,yCAA0C,CAC1C,wCAAyC,CAjD5C,+BAsDE,gBAxDgB,CAElB,+CAyDG,4BAA6B,CAC7B,UA5De,CA6Df,cAAe,CACf,aAAc,CACd,6BAAsD,CACtD,uCAAwC,CACxC,0CAA2C,CAC3C,wCAAyC,CAhE5C,8BAqEE,iBAvEgB,CAElB,8CAwEG,4BAA6B,CAC7B,WA3Ee,CA4Ef,cAAe,CACf,aAAc,CACd,6BA9Ee,CA+Ef,uCAAwC,CACxC,yCAA0C,CAC1C,0CAA2C,CA/E9C,6BAoFE,iBAAkB,CAClB,2EAA6E,CAC7E,SAAU,CAtFZ,8BA0FE,kBAAmB,CACnB,yCAA0C,CAC1C,SAAU",
      sourcesContent: ["$scope_version:\"6b494fc\"; @import 'variables';\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n$arrow-width: 10px;\n\n.popover {\n\tz-index: 100000;\n\tdisplay: block !important;\n\n\tfilter: drop-shadow(0 1px 10px var(--color-box-shadow));\n\n\t&__inner {\n\t\tpadding: 0;\n\t\tcolor: var(--color-main-text);\n\t\tborder-radius: var(--border-radius);\n\t\tbackground: var(--color-main-background);\n\t}\n\n\t&__arrow {\n\t\tposition: absolute;\n\t\tz-index: 1;\n\t\twidth: 0;\n\t\theight: 0;\n\t\tmargin: $arrow-width;\n\t\tborder-style: solid;\n\t\tborder-color: var(--color-main-background);\n\t}\n\n\t&[x-placement^='top'] {\n\t\tmargin-bottom: $arrow-width;\n\n\t\t.popover__arrow {\n\t\t\tbottom: -$arrow-width;\n\t\t\tleft: calc(50% - $arrow-width);\n\t\t\tmargin-top: 0;\n\t\t\tmargin-bottom: 0;\n\t\t\tborder-width: $arrow-width $arrow-width 0 $arrow-width;\n\t\t\tborder-right-color: transparent !important;\n\t\t\tborder-bottom-color: transparent !important;\n\t\t\tborder-left-color: transparent !important;\n\t\t}\n\t}\n\n\t&[x-placement^='bottom'] {\n\t\tmargin-top: $arrow-width;\n\n\t\t.popover__arrow {\n\t\t\ttop: -$arrow-width;\n\t\t\tleft: calc(50% - $arrow-width);\n\t\t\tmargin-top: 0;\n\t\t\tmargin-bottom: 0;\n\t\t\tborder-width: 0 $arrow-width $arrow-width $arrow-width;\n\t\t\tborder-top-color: transparent !important;\n\t\t\tborder-right-color: transparent !important;\n\t\t\tborder-left-color: transparent !important;\n\t\t}\n\t}\n\n\t&[x-placement^='right'] {\n\t\tmargin-left: $arrow-width;\n\n\t\t.popover__arrow {\n\t\t\ttop: calc(50% - $arrow-width);\n\t\t\tleft: -$arrow-width;\n\t\t\tmargin-right: 0;\n\t\t\tmargin-left: 0;\n\t\t\tborder-width: $arrow-width $arrow-width $arrow-width 0;\n\t\t\tborder-top-color: transparent !important;\n\t\t\tborder-bottom-color: transparent !important;\n\t\t\tborder-left-color: transparent !important;\n\t\t}\n\t}\n\n\t&[x-placement^='left'] {\n\t\tmargin-right: $arrow-width;\n\n\t\t.popover__arrow {\n\t\t\ttop: calc(50% - $arrow-width);\n\t\t\tright: -$arrow-width;\n\t\t\tmargin-right: 0;\n\t\t\tmargin-left: 0;\n\t\t\tborder-width: $arrow-width 0 $arrow-width $arrow-width;\n\t\t\tborder-top-color: transparent !important;\n\t\t\tborder-right-color: transparent !important;\n\t\t\tborder-bottom-color: transparent !important;\n\t\t}\n\t}\n\n\t&[aria-hidden='true'] {\n\t\tvisibility: hidden;\n\t\ttransition: opacity var(--animation-quick), visibility var(--animation-quick);\n\t\topacity: 0;\n\t}\n\n\t&[aria-hidden='false'] {\n\t\tvisibility: visible;\n\t\ttransition: opacity var(--animation-quick);\n\t\topacity: 1;\n\t}\n}\n\n"],
      sourceRoot: ""
    }]), n.a = a;
  }, function (t, n) {}, function (t, n, e) {
    "use strict";

    e.r(n);
    var A = e(7),
        o = e(2),
        i = e.n(o),
        a = e(22),
        r = {
      insert: "head",
      singleton: !1
    };
    i()(a.a, r), a.a.locals;
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

    A.VTooltip.options.defaultTemplate = '<div class="vue-tooltip" role="tooltip" data-v-'.concat("6b494fc", '><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'), A.VTooltip.options.defaultHtml = !1;
    n.default = A.VTooltip;
  }, function (t, n, e) {
    "use strict";

    var A = e(0),
        o = e.n(A),
        i = e(1),
        a = e.n(i)()(o.a);
    a.push([t.i, ".vue-tooltip[data-v-6b494fc]{position:absolute;z-index:100000;right:auto;left:auto;display:block;margin:0;margin-top:-3px;padding:10px 0;text-align:left;text-align:start;opacity:0;line-height:1.6;line-break:auto;filter:drop-shadow(0 1px 10px var(--color-box-shadow))}.vue-tooltip[data-v-6b494fc][x-placement^='top'] .tooltip-arrow{bottom:0;margin-top:0;margin-bottom:0;border-width:10px 10px 0 10px;border-right-color:transparent;border-bottom-color:transparent;border-left-color:transparent}.vue-tooltip[data-v-6b494fc][x-placement^='bottom'] .tooltip-arrow{top:0;margin-top:0;margin-bottom:0;border-width:0 10px 10px 10px;border-top-color:transparent;border-right-color:transparent;border-left-color:transparent}.vue-tooltip[data-v-6b494fc][x-placement^='right'] .tooltip-arrow{right:100%;margin-right:0;margin-left:0;border-width:10px 10px 10px 0;border-top-color:transparent;border-bottom-color:transparent;border-left-color:transparent}.vue-tooltip[data-v-6b494fc][x-placement^='left'] .tooltip-arrow{left:100%;margin-right:0;margin-left:0;border-width:10px 0 10px 10px;border-top-color:transparent;border-right-color:transparent;border-bottom-color:transparent}.vue-tooltip[data-v-6b494fc][aria-hidden='true']{visibility:hidden;transition:opacity .15s, visibility .15s;opacity:0}.vue-tooltip[data-v-6b494fc][aria-hidden='false']{visibility:visible;transition:opacity .15s;opacity:1}.vue-tooltip[data-v-6b494fc] .tooltip-inner{max-width:350px;padding:5px 8px;text-align:center;color:var(--color-main-text);border-radius:var(--border-radius);background-color:var(--color-main-background)}.vue-tooltip[data-v-6b494fc] .tooltip-arrow{position:absolute;z-index:1;width:0;height:0;margin:0;border-style:solid;border-color:var(--color-main-background)}\n", "", {
      version: 3,
      sources: ["webpack://./index.scss"],
      names: [],
      mappings: "AAeA,6BACC,iBAAkB,CAClB,cAAe,CACf,UAAW,CACX,SAAU,CACV,aAAc,CACd,QAAS,CAET,eAAgB,CAChB,cAAe,CACf,eAAgB,CAChB,gBAAiB,CACjB,SAAU,CACV,eAAgB,CAEhB,eAAgB,CAChB,sDAAuD,CAhBxD,gEAqBG,QAAS,CACT,YAAa,CACb,eAAgB,CAChB,6BA1Be,CA2Bf,8BAA+B,CAC/B,+BAAgC,CAChC,6BAA8B,CA3BjC,mEAkCG,KAAM,CACN,YAAa,CACb,eAAgB,CAChB,6BAvCe,CAwCf,4BAA6B,CAC7B,8BAA+B,CAC/B,6BAA8B,CAxCjC,kEA+CG,UAAW,CACX,cAAe,CACf,aAAc,CACd,6BAAsD,CACtD,4BAA6B,CAC7B,+BAAgC,CAChC,6BAA8B,CArDjC,iEA4DG,SAAU,CACV,cAAe,CACf,aAAc,CACd,6BAjEe,CAkEf,4BAA6B,CAC7B,8BAA+B,CAC/B,+BAAgC,CAlEnC,iDAwEE,iBAAkB,CAClB,wCAAyC,CACzC,SAAU,CA1EZ,kDA6EE,kBAAmB,CACnB,uBAAwB,CACxB,SAAU,CA/EZ,4CAoFE,eAAgB,CAChB,eAAgB,CAChB,iBAAkB,CAClB,4BAA6B,CAC7B,kCAAmC,CACnC,6CAA8C,CAzFhD,4CA8FE,iBAAkB,CAClB,SAAU,CACV,OAAQ,CACR,QAAS,CACT,QAAS,CACT,kBAAmB,CACnB,yCAA0C",
      sourcesContent: ["$scope_version:\"6b494fc\"; @import 'variables';\n/**\n* @copyright Copyright (c) 2016, John Molakvoæ <skjnldsv@protonmail.com>\n* @copyright Copyright (c) 2016, Robin Appelman <robin@icewind.nl>\n* @copyright Copyright (c) 2016, Jan-Christoph Borchardt <hey@jancborchardt.net>\n* @copyright Copyright (c) 2016, Erik Pellikka <erik@pellikka.org>\n* @copyright Copyright (c) 2015, Vincent Petry <pvince81@owncloud.com>\n*\n* Bootstrap v3.3.5 (http://getbootstrap.com)\n* Copyright 2011-2015 Twitter, Inc.\n* Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)\n*/\n\n$arrow-width: 10px;\n\n.vue-tooltip[data-v-#{$scope_version}] {\n\tposition: absolute;\n\tz-index: 100000;\n\tright: auto;\n\tleft: auto;\n\tdisplay: block;\n\tmargin: 0;\n\t/* default to top */\n\tmargin-top: -3px;\n\tpadding: 10px 0;\n\ttext-align: left;\n\ttext-align: start;\n\topacity: 0;\n\tline-height: 1.6;\n\n\tline-break: auto;\n\tfilter: drop-shadow(0 1px 10px var(--color-box-shadow));\n\n\t// TOP\n\t&[x-placement^='top'] {\n\t\t.tooltip-arrow {\n\t\t\tbottom: 0;\n\t\t\tmargin-top: 0;\n\t\t\tmargin-bottom: 0;\n\t\t\tborder-width: $arrow-width $arrow-width 0 $arrow-width;\n\t\t\tborder-right-color: transparent;\n\t\t\tborder-bottom-color: transparent;\n\t\t\tborder-left-color: transparent;\n\t\t}\n\t}\n\n\t// BOTTOM\n\t&[x-placement^='bottom'] {\n\t\t.tooltip-arrow {\n\t\t\ttop: 0;\n\t\t\tmargin-top: 0;\n\t\t\tmargin-bottom: 0;\n\t\t\tborder-width: 0 $arrow-width $arrow-width $arrow-width;\n\t\t\tborder-top-color: transparent;\n\t\t\tborder-right-color: transparent;\n\t\t\tborder-left-color: transparent;\n\t\t}\n\t}\n\n\t// RIGHT\n\t&[x-placement^='right'] {\n\t\t.tooltip-arrow {\n\t\t\tright: 100%;\n\t\t\tmargin-right: 0;\n\t\t\tmargin-left: 0;\n\t\t\tborder-width: $arrow-width $arrow-width $arrow-width 0;\n\t\t\tborder-top-color: transparent;\n\t\t\tborder-bottom-color: transparent;\n\t\t\tborder-left-color: transparent;\n\t\t}\n\t}\n\n\t// LEFT\n\t&[x-placement^='left'] {\n\t\t.tooltip-arrow {\n\t\t\tleft: 100%;\n\t\t\tmargin-right: 0;\n\t\t\tmargin-left: 0;\n\t\t\tborder-width: $arrow-width 0 $arrow-width $arrow-width;\n\t\t\tborder-top-color: transparent;\n\t\t\tborder-right-color: transparent;\n\t\t\tborder-bottom-color: transparent;\n\t\t}\n\t}\n\n\t// HIDDEN / SHOWN\n\t&[aria-hidden='true'] {\n\t\tvisibility: hidden;\n\t\ttransition: opacity .15s, visibility .15s;\n\t\topacity: 0;\n\t}\n\t&[aria-hidden='false'] {\n\t\tvisibility: visible;\n\t\ttransition: opacity .15s;\n\t\topacity: 1;\n\t}\n\n\t// CONTENT\n\t.tooltip-inner {\n\t\tmax-width: 350px;\n\t\tpadding: 5px 8px;\n\t\ttext-align: center;\n\t\tcolor: var(--color-main-text);\n\t\tborder-radius: var(--border-radius);\n\t\tbackground-color: var(--color-main-background);\n\t}\n\n\t// ARROW\n\t.tooltip-arrow {\n\t\tposition: absolute;\n\t\tz-index: 1;\n\t\twidth: 0;\n\t\theight: 0;\n\t\tmargin: 0;\n\t\tborder-style: solid;\n\t\tborder-color: var(--color-main-background);\n\t}\n}\n"],
      sourceRoot: ""
    }]), n.a = a;
  },, function (t, n) {
    t.exports = __webpack_require__(/*! core-js/modules/es.string.replace.js */ "./node_modules/core-js/modules/es.string.replace.js");
  }, function (t, n) {
    t.exports = __webpack_require__(/*! core-js/modules/es.regexp.to-string.js */ "./node_modules/core-js/modules/es.regexp.to-string.js");
  }, function (t, n) {
    t.exports = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each.js */ "./node_modules/core-js/modules/web.dom-collections.for-each.js");
  }, function (t, n) {
    t.exports = __webpack_require__(/*! core-js/modules/es.array.concat.js */ "./node_modules/core-js/modules/es.array.concat.js");
  }, function (t, n, e) {
    "use strict";

    var A = {
      name: "Popover",
      components: {
        VPopover: e(7).VPopover
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
        o = e(2),
        i = e.n(o),
        a = e(19),
        r = {
      insert: "head",
      singleton: !1
    },
        s = (i()(a.a, r), a.a.locals, e(3)),
        c = e(20),
        l = e.n(c),
        d = Object(s.a)(A, function () {
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
  },, function (t, n) {
    t.exports = __webpack_require__(/*! core-js/modules/es.string.trim.js */ "./node_modules/core-js/modules/es.string.trim.js");
  }, function (t, n) {
    t.exports = __webpack_require__(/*! core-js/modules/es.number.constructor.js */ "./node_modules/core-js/modules/es.number.constructor.js");
  }, function (t, n) {
    t.exports = __webpack_require__(/*! core-js/modules/es.symbol.js */ "./node_modules/core-js/modules/es.symbol.js");
  }, function (t, n) {
    t.exports = __webpack_require__(/*! @nextcloud/l10n/dist/gettext */ "./node_modules/@nextcloud/l10n/dist/gettext.js");
  }, function (t, n, e) {
    "use strict";

    e(24), e(15), e(6), e(25);

    n.a = function (t) {
      return Math.random().toString(36).replace(/[^a-z]+/g, "").substr(0, t || 5);
    };
  },,,, function (t, n) {
    t.exports = __webpack_require__(/*! core-js/modules/es.symbol.description.js */ "./node_modules/core-js/modules/es.symbol.description.js");
  }, function (t, n, e) {
    "use strict";

    e(30), e(14);
    var A = e(5),
        o = e.n(A);
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
     * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
     * GNU Affero General Public License for more details.
     *
     * You should have received a copy of the GNU Affero General Public License
     * along with this program. If not, see <http://www.gnu.org/licenses/>.
     *
     */

    n.a = {
      before: function before() {
        this.$slots.default && "" !== this.text.trim() || (o.a.util.warn("".concat(this.$options.name, " cannot be empty and requires a meaningful text content"), this), this.$destroy(), this.$el.remove());
      },
      beforeUpdate: function beforeUpdate() {
        this.text = this.getText();
      },
      data: function data() {
        return {
          text: this.getText()
        };
      },
      computed: {
        isLongText: function isLongText() {
          return this.text && this.text.trim().length > 20;
        }
      },
      methods: {
        getText: function getText() {
          return this.$slots.default ? this.$slots.default[0].text.trim() : "";
        }
      }
    };
  }, function (t, n) {
    t.exports = __webpack_require__(/*! core-js/modules/web.url.js */ "./node_modules/core-js/modules/web.url.js");
  }, function (t, n) {
    t.exports = __webpack_require__(/*! core-js/modules/es.array.slice.js */ "./node_modules/core-js/modules/es.array.slice.js");
  },,,,, function (t, n) {
    t.exports = __webpack_require__(/*! core-js/modules/es.symbol.iterator.js */ "./node_modules/core-js/modules/es.symbol.iterator.js");
  }, function (t, n, e) {
    "use strict";

    e.r(n);
    var A = e(28);
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

    n.default = A.a;
  },, function (t, n, e) {
    "use strict";

    e(40), e(6), e(16), e(17), e(18);
    var A = e(39),
        o = (e(14), function (t, n) {
      for (var e = t.$parent; e;) {
        if (e.$options.name === n) return e;
        e = e.$parent;
      }
    });
    n.a = {
      mixins: [A.a],
      props: {
        icon: {
          type: String,
          default: ""
        },
        title: {
          type: String,
          default: ""
        },
        closeAfterClick: {
          type: Boolean,
          default: !1
        },
        ariaLabel: {
          type: String,
          default: ""
        }
      },
      computed: {
        isIconUrl: function isIconUrl() {
          try {
            return new URL(this.icon);
          } catch (t) {
            return !1;
          }
        }
      },
      methods: {
        onClick: function onClick(t) {
          if (this.$emit("click", t), this.closeAfterClick) {
            var n = o(this, "Actions");
            n && n.closeMenu && n.closeMenu();
          }
        }
      }
    };
  }, function (t, n, e) {
    "use strict";

    e(27), e(14), e(101);
    var A = e(5),
        o = e.n(A);

    n.a = function (t, n, e) {
      if (void 0 !== t) for (var A = t.length - 1; A >= 0; A--) {
        var i = t[A],
            a = !i.componentOptions && i.tag && -1 === n.indexOf(i.tag),
            r = !!i.componentOptions && "string" == typeof i.componentOptions.tag,
            s = r && -1 === n.indexOf(i.componentOptions.tag);
        (a || !r || s) && ((a || s) && o.a.util.warn("".concat(a ? i.tag : i.componentOptions.tag, " is not allowed inside the ").concat(e.$options.name, " component"), e), t.splice(A, 1));
      }
    };
  }, function (t, n) {
    t.exports = __webpack_require__(/*! core-js/modules/es.array.filter.js */ "./node_modules/core-js/modules/es.array.filter.js");
  }, function (t, n) {
    t.exports = __webpack_require__(/*! core-js/modules/es.array.from.js */ "./node_modules/core-js/modules/es.array.from.js");
  },,,,,,,,, function (t, n, e) {
    "use strict";

    var A = e(12);
    n.a = {
      methods: {
        n: A.a,
        t: A.b
      }
    };
  },,,,,, function (t, n, e) {
    "use strict";

    var A = e(0),
        o = e.n(A),
        i = e(1),
        a = e.n(i),
        r = e(4),
        s = e.n(r),
        c = e(8),
        l = e(9),
        d = e(10),
        u = e(11),
        g = a()(o.a),
        m = s()(c.a),
        p = s()(l.a),
        C = s()(d.a),
        f = s()(u.a);
    g.push([t.i, '@font-face{font-family:"iconfont-vue-6b494fc";src:url(' + m + ");src:url(" + m + ') format("embedded-opentype"),url(' + p + ') format("woff"),url(' + C + ') format("truetype"),url(' + f + ') format("svg")}.icon[data-v-551c21fd]{font-style:normal;font-weight:400}.icon.arrow-left-double[data-v-551c21fd]:before{font-family:"iconfont-vue-6b494fc";content:""}.icon.arrow-left[data-v-551c21fd]:before{font-family:"iconfont-vue-6b494fc";content:""}.icon.arrow-right-double[data-v-551c21fd]:before{font-family:"iconfont-vue-6b494fc";content:""}.icon.arrow-right[data-v-551c21fd]:before{font-family:"iconfont-vue-6b494fc";content:""}.icon.breadcrumb[data-v-551c21fd]:before{font-family:"iconfont-vue-6b494fc";content:""}.icon.checkmark[data-v-551c21fd]:before{font-family:"iconfont-vue-6b494fc";content:""}.icon.close[data-v-551c21fd]:before{font-family:"iconfont-vue-6b494fc";content:""}.icon.confirm[data-v-551c21fd]:before{font-family:"iconfont-vue-6b494fc";content:""}.icon.info[data-v-551c21fd]:before{font-family:"iconfont-vue-6b494fc";content:""}.icon.menu[data-v-551c21fd]:before{font-family:"iconfont-vue-6b494fc";content:""}.icon.more[data-v-551c21fd]:before{font-family:"iconfont-vue-6b494fc";content:""}.icon.pause[data-v-551c21fd]:before{font-family:"iconfont-vue-6b494fc";content:""}.icon.play[data-v-551c21fd]:before{font-family:"iconfont-vue-6b494fc";content:""}.icon.triangle-s[data-v-551c21fd]:before{font-family:"iconfont-vue-6b494fc";content:""}.icon.user-status-away[data-v-551c21fd]:before{font-family:"iconfont-vue-6b494fc";content:""}.icon.user-status-dnd[data-v-551c21fd]:before{font-family:"iconfont-vue-6b494fc";content:""}.icon.user-status-invisible[data-v-551c21fd]:before{font-family:"iconfont-vue-6b494fc";content:""}.icon.user-status-online[data-v-551c21fd]:before{font-family:"iconfont-vue-6b494fc";content:""}.action-item[data-v-551c21fd]{position:relative;display:inline-block}.action-item--single[data-v-551c21fd]:hover,.action-item--single[data-v-551c21fd]:focus,.action-item--single[data-v-551c21fd]:active,.action-item__menutoggle[data-v-551c21fd]:hover,.action-item__menutoggle[data-v-551c21fd]:focus,.action-item__menutoggle[data-v-551c21fd]:active{opacity:1;background-color:rgba(127,127,127,0.25)}.action-item__menutoggle[data-v-551c21fd]:disabled,.action-item--single[data-v-551c21fd]:disabled{opacity:.3 !important}.action-item.action-item--open .action-item__menutoggle[data-v-551c21fd]{opacity:1;background-color:rgba(127,127,127,0.25)}.action-item--single[data-v-551c21fd],.action-item__menutoggle[data-v-551c21fd]{box-sizing:border-box;width:auto;min-width:44px;height:44px;margin:0;padding:14px;cursor:pointer;border:none;border-radius:22px;background-color:transparent}.action-item__menutoggle[data-v-551c21fd]{display:flex;align-items:center;justify-content:center;opacity:.7;font-weight:bold;line-height:16px}.action-item__menutoggle[data-v-551c21fd] span{width:16px;height:16px;line-height:16px}.action-item__menutoggle[data-v-551c21fd]:before{content:\'\'}.action-item__menutoggle--default-icon[data-v-551c21fd]:before{font-family:"iconfont-vue-6b494fc";font-style:normal;font-weight:400;content:""}.action-item__menutoggle--default-icon[data-v-551c21fd]::before{font-size:16px}.action-item__menutoggle--with-title[data-v-551c21fd]{position:relative;padding-left:44px;white-space:nowrap;opacity:1;border:1px solid var(--color-border-dark);background-color:var(--color-background-dark);background-position:14px center;font-size:inherit}.action-item__menutoggle--with-title[data-v-551c21fd]:before{position:absolute;top:14px;left:14px}.action-item__menutoggle--primary[data-v-551c21fd]{opacity:1;color:var(--color-primary-text);border:none;background-color:var(--color-primary-element)}.action-item--open .action-item__menutoggle--primary[data-v-551c21fd],.action-item__menutoggle--primary[data-v-551c21fd]:hover,.action-item__menutoggle--primary[data-v-551c21fd]:focus,.action-item__menutoggle--primary[data-v-551c21fd]:active{color:var(--color-primary-text) !important;background-color:var(--color-primary-element-light) !important}.action-item--single[data-v-551c21fd]{opacity:.7}.action-item--single[data-v-551c21fd]:hover,.action-item--single[data-v-551c21fd]:focus,.action-item--single[data-v-551c21fd]:active{opacity:1}.action-item--single>[hidden][data-v-551c21fd]{display:none}.ie .action-item__menu[data-v-551c21fd],.ie .action-item__menu .action-item__menu_arrow[data-v-551c21fd],.edge .action-item__menu[data-v-551c21fd],.edge .action-item__menu .action-item__menu_arrow[data-v-551c21fd]{border:1px solid var(--color-border)}\n', "", {
      version: 3,
      sources: ["webpack://./../../fonts/scss/iconfont-vue.scss", "webpack://./Actions.vue", "webpack://./../../assets/variables.scss"],
      names: [],
      mappings: "AA2FE,WACC,kCAAmC,CACnC,2CAAuC,CACvC,+OAGmD,CAMpD,uBACE,iBAAkB,CAClB,eAAgB,CAFlB,gDAMM,kCAAmC,CACnC,WA5Ge,CAAO,yCA0GL,kCACJ,CAAsB,WA1G3B,CAAA,iDAyGU,kCACL,CAAA,WAzGG,CAAA,0CAwGL,kCACE,CAAA,WAxGJ,CAAA,yCAuGC,kCACG,CAAA,WACN,CAxGC,wCAsGC,kCACI,CAAA,WACb,CAAO,oCAFF,kCACQ,CAAA,WACb,CAAA,sCAFO,kCACM,CAAA,WACb,CAAA,mCAFI,kCACS,CAAA,WACb,CAAA,mCAPD,kCAMc,CAAA,WACb,CAAA,mCAPD,kCAMc,CAAA,WACb,CAAA,oCAPD,kCAMc,CAAA,WACb,CAAA,mCAPD,kCAMc,CAAA,WAAsB,CACnC,yCAPD,kCAMc,CAAA,WAAA,CAAsB,+CANpC,kCAMc,CAAA,WAAA,CAAA,8CANd,kCAMc,CAAA,WAAA,CAAA,oDANd,kCAMc,CAAA,WAAA,CAAA,iDANd,kCAMc,CAAA,WAAA,CAAA,8BA1FG,iBC6nBZ,CACX,oBACA,CAAA,sRASC,SAAA,CAAY,uCCvnBE,CAAA,kGD+nBd,qBACA,CAAA,yEAGmB,SAAA,CAAA,uCCvnBK,CAAA,gFD8nBxB,qBACA,CAAA,UAAY,CAAA,cACL,CAAA,WACP,CAAS,QACT,CAAA,YACA,CAAA,cClpBY,CAAA,WDopBJ,CAAA,kBAER,CAAA,4BACA,CAAA,0CACA,YAAA,CAAA,kBAMA,CAAA,sBACA,CAAA,UAAe,CAAE,gBCrpBF,CAAE,gBDupBJ,CAAI,+CANjB,UAUA,CAAA,WACC,CAAK,gBC1qBI,CAAI,iDD+pBd,UAAY,CAAA,+DAkBX,kCD7sBF,CAAA,iBAAsB,CAkFnB,eAAY,CAAA,WACZ,CAAA,gEC4nBD,cAAc,CAAA,sDAIb,iBAAA,CAGW,iBACF,CAAQ,kBC/rBA,CDisBlB,SAAA,CAAA,yCAEkB,CAAA,6CAEA,CAAA,+BAClB,CAAA,iBAAkC,CAAM,6DARxC,iBAAY,CAWJ,QACP,CAAQ,SAAU,CAClB,mDAEA,SAAA,CAAA,+BAKM,CAAA,WAAA,CAAA,6CAEW,CAAA,kPAJlB,0CASQ,CAAA,8DACW,CAAA,sCAClB,UAAA,CAAA,qIAIF,SAAA,CAAA,+CAAA,YAQI,CAAA,sNASc,oCACA",
      sourcesContent: ['$__iconfont__data: map-merge(if(global_variable_exists(\'__iconfont__data\'), $__iconfont__data, ()), (\n\t"iconfont-vue-6b494fc": (\n\t\t"arrow-left-double": "\\ea01",\n\t\t"arrow-left": "\\ea02",\n\t\t"arrow-right-double": "\\ea03",\n\t\t"arrow-right": "\\ea04",\n\t\t"breadcrumb": "\\ea05",\n\t\t"checkmark": "\\ea06",\n\t\t"close": "\\ea07",\n\t\t"confirm": "\\ea08",\n\t\t"info": "\\ea09",\n\t\t"menu": "\\ea0a",\n\t\t"more": "\\ea0b",\n\t\t"pause": "\\ea0c",\n\t\t"play": "\\ea0d",\n\t\t"triangle-s": "\\ea0e",\n\t\t"user-status-away": "\\ea0f",\n\t\t"user-status-dnd": "\\ea10",\n\t\t"user-status-invisible": "\\ea11",\n\t\t"user-status-online": "\\ea12"\n\t)\n));\n\n\n$create-font-face: true !default; // should the @font-face tag get created?\n\n// should there be a custom class for each icon? will be .filename\n$create-icon-classes: true !default; \n\n// what is the common class name that icons share? in this case icons need to have .icon.filename in their classes\n// this requires you to have 2 classes on each icon html element, but reduced redeclaration of the font family\n// for each icon\n$icon-common-class: \'icon\' !default;\n\n// if you whish to prefix your filenames, here you can do so.\n// if this string stays empty, your classes will use the filename, for example\n// an icon called star.svg will result in a class called .star\n// if you use the prefix to be \'icon-\' it would result in .icon-star\n$icon-prefix: \'\' !default; \n\n// helper function to get the correct font group\n@function iconfont-group($group: null) {\n  @if (null == $group) {\n    $group: nth(map-keys($__iconfont__data), 1);\n  }\n  @if (false == map-has-key($__iconfont__data, $group)) {\n    @warn \'Undefined Iconfont Family!\';\n    @return ();\n  }\n  @return map-get($__iconfont__data, $group);\n}\n\n// helper function to get the correct icon of a group\n@function iconfont-item($name) {\n  $slash: str-index($name, \'/\');\n  $group: null;\n  @if ($slash) {\n    $group: str-slice($name, 0, $slash - 1);\n    $name: str-slice($name, $slash + 1);\n  } @else {\n    $group: nth(map-keys($__iconfont__data), 1);\n  }\n  $group: iconfont-group($group);\n  @if (false == map-has-key($group, $name)) {\n    @warn \'Undefined Iconfont Glyph!\';\n    @return \'\';\n  }\n  @return map-get($group, $name);\n}\n\n// complete mixing to include the icon\n// usage:\n// .my_icon{ @include iconfont(\'star\') }\n@mixin iconfont($icon) {\n  $slash: str-index($icon, \'/\');\n  $group: null;\n  @if ($slash) {\n    $group: str-slice($icon, 0, $slash - 1);\n  } @else {\n    $group: nth(map-keys($__iconfont__data), 1);\n  }\n  &:before {\n    font-family: $group;\n    font-style: normal;\n    font-weight: 400;\n    content: iconfont-item($icon);\n  }\n}\n\n// creates the font face tag if the variable is set to true (default)\n@if $create-font-face == true {\n  @font-face {\n   font-family: "iconfont-vue-6b494fc";\n   src: url(\'../iconfont-vue-6b494fc.eot\'); /* IE9 Compat Modes */\n   src: url(\'../iconfont-vue-6b494fc.eot?#iefix\') format(\'embedded-opentype\'), /* IE6-IE8 */\n      url(\'../iconfont-vue-6b494fc.woff\') format(\'woff\'), /* Pretty Modern Browsers */\n      url(\'../iconfont-vue-6b494fc.ttf\')  format(\'truetype\'), /* Safari, Android, iOS */\n      url(\'../iconfont-vue-6b494fc.svg\') format(\'svg\'); /* Legacy iOS */\n  }\n}\n\n// creates icon classes for each individual loaded svg (default)\n@if $create-icon-classes == true {\n  .#{$icon-common-class} {\n    font-style: normal;\n    font-weight: 400;\n\n    @each $icon, $content in map-get($__iconfont__data, "iconfont-vue-6b494fc") {\n      &.#{$icon-prefix}#{$icon}:before {\n        font-family: "iconfont-vue-6b494fc";\n        content: iconfont-item("iconfont-vue-6b494fc/#{$icon}");\n      }\n    }\n  }\n}\n', "$scope_version:\"6b494fc\"; @import 'variables';\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n@import '../../fonts/scss/iconfont-vue';\n\n.action-item {\n\tposition: relative;\n\tdisplay: inline-block;\n\n\t// put a grey round background when menu is opened\n\t// or hover-focused\n\t&--single:hover,\n\t&--single:focus,\n\t&--single:active,\n\t&__menutoggle:hover,\n\t&__menutoggle:focus,\n\t&__menutoggle:active {\n\t\topacity: $opacity_full;\n\t\t// good looking on dark AND white bg\n\t\tbackground-color: $icon-focus-bg;\n\t}\n\n\t// TODO: handle this in the future button component\n\t&__menutoggle:disabled,\n\t&--single:disabled {\n\t\topacity: .3 !important;\n\t}\n\n\t&.action-item--open .action-item__menutoggle {\n\t\topacity: $opacity_full;\n\t\tbackground-color: $action-background-hover;\n\t}\n\n\t// icons\n\t&--single,\n\t&__menutoggle {\n\t\tbox-sizing: border-box;\n\t\twidth: auto;\n\t\tmin-width: $clickable-area;\n\t\theight: $clickable-area;\n\t\tmargin: 0;\n\t\tpadding: $icon-margin;\n\t\tcursor: pointer;\n\t\tborder: none;\n\t\tborder-radius: $clickable-area / 2;\n\t\tbackground-color: transparent;\n\t}\n\n\t// icon-more\n\t&__menutoggle {\n\t\t// align menu icon in center\n\t\tdisplay: flex;\n\t\talign-items: center;\n\t\tjustify-content: center;\n\t\topacity: $opacity_normal;\n\t\tfont-weight: bold;\n\t\tline-height: $icon-size;\n\n\t\t// image slot\n\t\t/deep/ span {\n\t\t\twidth: $icon-size;\n\t\t\theight: $icon-size;\n\t\t\tline-height: $icon-size;\n\t\t}\n\n\t\t&:before {\n\t\t\tcontent: '';\n\t\t}\n\n\t\t&--default-icon {\n\t\t\t@include iconfont('more');\n\t\t\t&::before {\n\t\t\t\tfont-size: $icon-size;\n\t\t\t}\n\t\t}\n\n\t\t&--with-title {\n\t\t\tposition: relative;\n\t\t\tpadding-left: $clickable-area;\n\t\t\twhite-space: nowrap;\n\t\t\topacity: $opacity_full;\n\t\t\tborder: 1px solid var(--color-border-dark);\n\t\t\t// with a title, we need to display this as a real button\n\t\t\tbackground-color: var(--color-background-dark);\n\t\t\tbackground-position: $icon-margin center;\n\t\t\tfont-size: inherit;\n\t\t\t// non-background icon class\n\t\t\t&:before {\n\t\t\t\tposition: absolute;\n\t\t\t\ttop: $icon-margin;\n\t\t\t\tleft: $icon-margin;\n\t\t\t}\n\t\t}\n\n\t\t&--primary {\n\t\t\topacity: $opacity_full;\n\t\t\tcolor: var(--color-primary-text);\n\t\t\tborder: none;\n\t\t\tbackground-color: var(--color-primary-element);\n\t\t\t.action-item--open &,\n\t\t\t&:hover,\n\t\t\t&:focus,\n\t\t\t&:active {\n\t\t\t\tcolor: var(--color-primary-text) !important;\n\t\t\t\tbackground-color: var(--color-primary-element-light) !important;\n\t\t\t}\n\t\t}\n\t}\n\n\t&--single {\n\t\topacity: $opacity_normal;\n\t\t&:hover,\n\t\t&:focus,\n\t\t&:active {\n\t\t\topacity: $opacity_full;\n\t\t}\n\t\t// hide anything the slot is displaying\n\t\t& > [hidden] {\n\t\t\tdisplay: none;\n\t\t}\n\t}\n}\n\n.ie,\n.edge {\n\t.action-item__menu,\n\t.action-item__menu .action-item__menu_arrow {\n\t\tborder: 1px solid var(--color-border);\n\t}\n}\n\n", "/**\n * @copyright Copyright (c) 2019 John Molakvoæ <skjnldsv@protonmail.com>\n *\n * @author John Molakvoæ <skjnldsv@protonmail.com>\n *\n * @license GNU AGPL version 3 or any later version\n *\n * This program is free software: you can redistribute it and/or modify\n * it under the terms of the GNU Affero General Public License as\n * published by the Free Software Foundation, either version 3 of the\n * License, or (at your option) any later version.\n *\n * This program is distributed in the hope that it will be useful,\n * but WITHOUT ANY WARRANTY; without even the implied warranty of\n * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the\n * GNU Affero General Public License for more details.\n *\n * You should have received a copy of the GNU Affero General Public License\n * along with this program. If not, see <http://www.gnu.org/licenses/>.\n *\n */\n\n// https://uxplanet.org/7-rules-for-mobile-ui-button-design-e9cf2ea54556\n// recommended is 48px\n// 44px is what we choose and have very good visual-to-usability ratio\n$clickable-area: 44px;\n\n// background icon size\n// also used for the scss icon font\n$icon-size: 16px;\n\n// icon padding for a $clickable-area width and a $icon-size icon\n// ( 44px - 16px ) / 2\n$icon-margin: ($clickable-area - $icon-size) / 2;\n\n// transparency background for icons\n$icon-focus-bg: rgba(127, 127, 127, .25);\n\n// popovermenu arrow width from the triangle center\n$arrow-width: 9px;\n\n// opacities\n$opacity_disabled: .5;\n$opacity_normal: .7;\n$opacity_full: 1;\n\n// menu round background hover feedback\n// good looking on dark AND white bg\n$action-background-hover: rgba(127, 127, 127, .25);\n\n// various structure data used in the \n// `AppNavigation` component\n$header-height: 50px;\n$navigation-width: 300px;\n\n// mobile breakpoint\n$breakpoint-mobile: 1024px;\n"],
      sourceRoot: ""
    }]), n.a = g;
  }, function (t, n) {}, function (t, n) {
    t.exports = __webpack_require__(/*! core-js/modules/es.object.keys.js */ "./node_modules/core-js/modules/es.object.keys.js");
  },, function (t, n) {
    t.exports = __webpack_require__(/*! core-js/modules/es.object.get-own-property-descriptor.js */ "./node_modules/core-js/modules/es.object.get-own-property-descriptor.js");
  }, function (t, n) {
    t.exports = __webpack_require__(/*! core-js/modules/es.object.get-own-property-descriptors.js */ "./node_modules/core-js/modules/es.object.get-own-property-descriptors.js");
  }, function (t, n, e) {
    "use strict";

    e.r(n);
    var A = e(85);
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
     * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
     * GNU Affero General Public License for more details.
     *
     * You should have received a copy of the GNU Affero General Public License
     * along with this program. If not, see <http://www.gnu.org/licenses/>.
     *
     */

    n.default = A.a;
  },,,,,,,,,, function (t, n, e) {
    "use strict";
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

    n.a = function (t) {
      t.mounted ? Array.isArray(t.mounted) || (t.mounted = [t.mounted]) : t.mounted = [], t.mounted.push(function () {
        this.$el.setAttribute("data-v-".concat("6b494fc"), "");
      });
    };
  },, function (t, n, e) {
    "use strict";

    e(27), e(51), e(69), e(32), e(71), e(26), e(72), e(38), e(6), e(46), e(16), e(17), e(18), e(52), e(41), e(14);
    var A = e(21),
        o = e(34),
        i = e(50),
        a = e(12),
        r = e(47);

    function s(t) {
      return function (t) {
        if (Array.isArray(t)) return c(t);
      }(t) || function (t) {
        if ("undefined" != typeof Symbol && Symbol.iterator in Object(t)) return Array.from(t);
      }(t) || function (t, n) {
        if (!t) return;
        if ("string" == typeof t) return c(t, n);
        var e = Object.prototype.toString.call(t).slice(8, -1);
        "Object" === e && t.constructor && (e = t.constructor.name);
        if ("Map" === e || "Set" === e) return Array.from(t);
        if ("Arguments" === e || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)) return c(t, n);
      }(t) || function () {
        throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }();
    }

    function c(t, n) {
      (null == n || n > t.length) && (n = t.length);

      for (var e = 0, A = new Array(n); e < n; e++) {
        A[e] = t[e];
      }

      return A;
    }

    function l(t, n) {
      var e = Object.keys(t);

      if (Object.getOwnPropertySymbols) {
        var A = Object.getOwnPropertySymbols(t);
        n && (A = A.filter(function (n) {
          return Object.getOwnPropertyDescriptor(t, n).enumerable;
        })), e.push.apply(e, A);
      }

      return e;
    }

    function d(t) {
      for (var n = 1; n < arguments.length; n++) {
        var e = null != arguments[n] ? arguments[n] : {};
        n % 2 ? l(Object(e), !0).forEach(function (n) {
          u(t, n, e[n]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(e)) : l(Object(e)).forEach(function (n) {
          Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(e, n));
        });
      }

      return t;
    }

    function u(t, n, e) {
      return n in t ? Object.defineProperty(t, n, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }) : t[n] = e, t;
    }

    var g = ["ActionButton", "ActionCheckbox", "ActionInput", "ActionLink", "ActionRadio", "ActionRouter", "ActionSeparator", "ActionText", "ActionTextEditable"],
        m = {
      name: "Actions",
      directives: {
        tooltip: A.default
      },
      components: {
        Popover: r.default,
        VNodes: {
          functional: !0,
          render: function render(t, n) {
            return n.props.vnodes;
          }
        }
      },
      props: {
        open: {
          type: Boolean,
          default: !1
        },
        forceMenu: {
          type: Boolean,
          default: !1
        },
        menuTitle: {
          type: String,
          default: null
        },
        primary: {
          type: Boolean,
          default: !1
        },
        defaultIcon: {
          type: String,
          default: "action-item__menutoggle--default-icon"
        },
        ariaLabel: {
          type: String,
          default: Object(a.b)("Actions")
        },
        placement: {
          type: String,
          default: "bottom"
        },
        boundariesElement: {
          type: Element,
          default: function _default() {
            return document.querySelector("body");
          }
        },
        container: {
          type: String,
          default: "body"
        },
        disabled: {
          type: Boolean,
          default: !1
        }
      },
      data: function data() {
        return {
          actions: [],
          opened: this.open,
          focusIndex: 0,
          randomId: "menu-" + Object(o.a)(),
          children: this.$children
        };
      },
      computed: {
        hasMultipleActions: function hasMultipleActions() {
          return this.actions.length > 1;
        },
        isValidSingleAction: function isValidSingleAction() {
          return 1 === this.actions.length && null !== this.firstActionElement;
        },
        firstActionVNode: function firstActionVNode() {
          return this.actions[0];
        },
        firstAction: function firstAction() {
          return this.children[0] ? this.children[0] : {};
        },
        firstActionBinding: function firstActionBinding() {
          if (this.firstActionVNode && this.firstActionVNode.componentOptions) {
            var t = this.firstActionVNode.componentOptions.tag;
            if ("ActionLink" === t) return d(d({
              is: "a",
              href: this.firstAction.href,
              target: this.firstAction.target,
              "aria-label": this.firstAction.ariaLabel
            }, this.firstAction.$attrs), this.firstAction.$props);
            if ("ActionRouter" === t) return d(d({
              is: "router-link",
              to: this.firstAction.to,
              exact: this.firstAction.exact,
              "aria-label": this.firstAction.ariaLabel
            }, this.firstAction.$attrs), this.firstAction.$props);
            if ("ActionButton" === t) return d(d({
              is: "button",
              "aria-label": this.firstAction.ariaLabel
            }, this.firstAction.$attrs), this.firstAction.$props);
          }

          return null;
        },
        firstActionEvent: function firstActionEvent() {
          var t, n, e;
          return null === (t = this.firstActionVNode) || void 0 === t || null === (n = t.componentOptions) || void 0 === n || null === (e = n.listeners) || void 0 === e ? void 0 : e.click;
        },
        firstActionEventBinding: function firstActionEventBinding() {
          return this.firstActionEvent ? "click" : null;
        },
        firstActionIconSlot: function firstActionIconSlot() {
          var t, n;
          return null === (t = this.firstAction) || void 0 === t || null === (n = t.$slots) || void 0 === n ? void 0 : n.icon;
        },
        firstActionClass: function firstActionClass() {
          var t = this.firstActionVNode && this.firstActionVNode.data.staticClass,
              n = this.firstActionVNode && this.firstActionVNode.data.class;
          return "".concat(t, " ").concat(n);
        },
        iconSlotIsPopulated: function iconSlotIsPopulated() {
          return !!this.$slots.icon;
        }
      },
      watch: {
        open: function open(t) {
          t !== this.opened && (this.opened = t);
        }
      },
      beforeMount: function beforeMount() {
        this.initActions(), Object(i.a)(this.$slots.default, g, this);
      },
      beforeUpdate: function beforeUpdate() {
        this.initActions(), Object(i.a)(this.$slots.default, g, this);
      },
      methods: {
        openMenu: function openMenu(t) {
          this.opened || (this.opened = !0, this.$emit("update:open", !0), this.$emit("open"));
        },
        closeMenu: function closeMenu(t) {
          this.opened && (this.opened = !1, this.$emit("update:open", !1), this.$emit("close"), this.opened = !1, this.focusIndex = 0, this.$refs.menuButton.focus());
        },
        onOpen: function onOpen(t) {
          var n = this;
          this.$nextTick(function () {
            n.focusFirstAction(t);
          });
        },
        onMouseFocusAction: function onMouseFocusAction(t) {
          if (document.activeElement !== t.target) {
            var n = t.target.closest("li");

            if (n) {
              var e = n.querySelector(".focusable");

              if (e) {
                var A = s(this.$refs.menu.querySelectorAll(".focusable")).indexOf(e);
                A > -1 && (this.focusIndex = A, this.focusAction());
              }
            }
          }
        },
        removeCurrentActive: function removeCurrentActive() {
          var t = this.$refs.menu.querySelector("li.active");
          t && t.classList.remove("active");
        },
        focusAction: function focusAction() {
          var t = this.$refs.menu.querySelectorAll(".focusable")[this.focusIndex];

          if (t) {
            this.removeCurrentActive();
            var n = t.closest("li.action");
            t.focus(), n && n.classList.add("active");
          }
        },
        focusPreviousAction: function focusPreviousAction(t) {
          this.opened && (0 === this.focusIndex ? this.closeMenu() : (this.preventIfEvent(t), this.focusIndex = this.focusIndex - 1), this.focusAction());
        },
        focusNextAction: function focusNextAction(t) {
          if (this.opened) {
            var n = this.$refs.menu.querySelectorAll(".focusable").length - 1;
            this.focusIndex === n ? this.closeMenu() : (this.preventIfEvent(t), this.focusIndex = this.focusIndex + 1), this.focusAction();
          }
        },
        focusFirstAction: function focusFirstAction(t) {
          this.opened && (this.preventIfEvent(t), this.focusIndex = 0, this.focusAction());
        },
        focusLastAction: function focusLastAction(t) {
          this.opened && (this.preventIfEvent(t), this.focusIndex = this.$el.querySelectorAll(".focusable").length - 1, this.focusAction());
        },
        preventIfEvent: function preventIfEvent(t) {
          t && (t.preventDefault(), t.stopPropagation());
        },
        execFirstAction: function execFirstAction(t) {
          this.firstActionEvent && this.firstActionEvent(t);
        },
        initActions: function initActions() {
          this.actions = (this.$slots.default || []).filter(function (t) {
            return !!t && !!t.componentOptions;
          });
        },
        onFocus: function onFocus(t) {
          this.$emit("focus", t);
        },
        onBlur: function onBlur(t) {
          this.$emit("blur", t);
        }
      }
    },
        p = e(2),
        C = e.n(p),
        f = e(67),
        h = {
      insert: "head",
      singleton: !1
    },
        b = (C()(f.a, h), f.a.locals, e(3)),
        v = e(68),
        y = e.n(v),
        B = Object(b.a)(m, function () {
      var t,
          n,
          e = this,
          A = e.$createElement,
          o = e._self._c || A;
      return e.isValidSingleAction && !e.forceMenu ? o("element", e._b({
        directives: [{
          name: "tooltip",
          rawName: "v-tooltip.auto",
          value: e.firstAction.text,
          expression: "firstAction.text",
          modifiers: {
            auto: !0
          }
        }],
        staticClass: "action-item action-item--single",
        class: (t = {}, t[e.firstAction.icon] = !e.iconSlotIsPopulated, t[e.firstActionClass] = !e.iconSlotIsPopulated, t),
        attrs: {
          rel: "noreferrer noopener",
          disabled: e.disabled
        },
        on: e._d({
          focus: e.onFocus,
          blur: e.onBlur
        }, [e.firstActionEventBinding, e.execFirstAction])
      }, "element", e.firstActionBinding, !1), [o("VNodes", {
        attrs: {
          vnodes: e.firstActionIconSlot
        }
      }), e._v(" "), o("span", {
        attrs: {
          "aria-hidden": !0,
          hidden: ""
        }
      }, [e._t("default")], 2)], 1) : o("div", {
        directives: [{
          name: "show",
          rawName: "v-show",
          value: e.hasMultipleActions || e.forceMenu,
          expression: "hasMultipleActions || forceMenu"
        }],
        staticClass: "action-item",
        class: {
          "action-item--open": e.opened
        }
      }, [o("Popover", {
        attrs: {
          delay: 0,
          "handle-resize": !0,
          open: e.opened,
          placement: e.placement,
          "boundaries-element": e.boundariesElement,
          container: e.container
        },
        on: {
          "update:open": function updateOpen(t) {
            e.opened = t;
          },
          show: e.openMenu,
          "after-show": e.onOpen,
          hide: e.closeMenu
        }
      }, [o("button", {
        ref: "menuButton",
        staticClass: "icon action-item__menutoggle",
        class: (n = {}, n[e.defaultIcon] = !e.iconSlotIsPopulated, n["action-item__menutoggle--with-title"] = e.menuTitle, n["action-item__menutoggle--primary"] = e.primary, n),
        attrs: {
          slot: "trigger",
          disabled: e.disabled,
          "aria-label": e.ariaLabel,
          "aria-haspopup": "true",
          "aria-controls": e.randomId,
          "test-attr": "1",
          "aria-expanded": e.opened ? "true" : "false"
        },
        on: {
          focus: e.onFocus,
          blur: e.onBlur
        },
        slot: "trigger"
      }, [e._t("icon"), e._v("\n\t\t\t" + e._s(e.menuTitle) + "\n\t\t")], 2), e._v(" "), o("div", {
        directives: [{
          name: "show",
          rawName: "v-show",
          value: e.opened,
          expression: "opened"
        }],
        ref: "menu",
        class: {
          open: e.opened
        },
        attrs: {
          tabindex: "-1"
        },
        on: {
          keydown: [function (t) {
            return !t.type.indexOf("key") && e._k(t.keyCode, "up", 38, t.key, ["Up", "ArrowUp"]) || t.ctrlKey || t.shiftKey || t.altKey || t.metaKey ? null : e.focusPreviousAction(t);
          }, function (t) {
            return !t.type.indexOf("key") && e._k(t.keyCode, "down", 40, t.key, ["Down", "ArrowDown"]) || t.ctrlKey || t.shiftKey || t.altKey || t.metaKey ? null : e.focusNextAction(t);
          }, function (t) {
            return !t.type.indexOf("key") && e._k(t.keyCode, "tab", 9, t.key, "Tab") || t.ctrlKey || t.shiftKey || t.altKey || t.metaKey ? null : e.focusNextAction(t);
          }, function (t) {
            return !t.type.indexOf("key") && e._k(t.keyCode, "tab", 9, t.key, "Tab") ? null : t.shiftKey ? t.ctrlKey || t.altKey || t.metaKey ? null : e.focusPreviousAction(t) : null;
          }, function (t) {
            return !t.type.indexOf("key") && e._k(t.keyCode, "page-up", void 0, t.key, void 0) || t.ctrlKey || t.shiftKey || t.altKey || t.metaKey ? null : e.focusFirstAction(t);
          }, function (t) {
            return !t.type.indexOf("key") && e._k(t.keyCode, "page-down", void 0, t.key, void 0) || t.ctrlKey || t.shiftKey || t.altKey || t.metaKey ? null : e.focusLastAction(t);
          }, function (t) {
            return !t.type.indexOf("key") && e._k(t.keyCode, "esc", 27, t.key, ["Esc", "Escape"]) || t.ctrlKey || t.shiftKey || t.altKey || t.metaKey ? null : (t.preventDefault(), e.closeMenu(t));
          }],
          mousemove: e.onMouseFocusAction
        }
      }, [o("ul", {
        attrs: {
          id: e.randomId,
          tabindex: "-1"
        }
      }, [e.opened ? [e._t("default")] : e._e()], 2)])])], 1);
    }, [], !1, null, "551c21fd", null);
    "function" == typeof y.a && y()(B);
    n.a = B.exports;
  },,,,,,,,, function (t, n, e) {
    "use strict";

    var A = e(0),
        o = e.n(A),
        i = e(1),
        a = e.n(i)()(o.a);
    a.push([t.i, "li.active[data-v-42b28436]{background-color:var(--color-background-hover)}.action--disabled[data-v-42b28436]{pointer-events:none;opacity:.5}.action--disabled[data-v-42b28436]:hover,.action--disabled[data-v-42b28436]:focus{cursor:default;opacity:.5}.action--disabled *[data-v-42b28436]{opacity:1 !important}.action-button[data-v-42b28436]{display:flex;align-items:flex-start;width:100%;height:auto;margin:0;padding:0;padding-right:14px;cursor:pointer;white-space:nowrap;opacity:.7;color:var(--color-main-text);border:0;border-radius:0;background-color:transparent;box-shadow:none;font-weight:normal;font-size:var(--default-font-size);line-height:44px}.action-button[data-v-42b28436]:hover,.action-button[data-v-42b28436]:focus{opacity:1}.action-button>span[data-v-42b28436]{cursor:pointer;white-space:nowrap}.action-button__icon[data-v-42b28436]{width:44px;height:44px;opacity:1;background-position:14px center;background-size:16px;background-repeat:no-repeat}.action-button .material-design-icon[data-v-42b28436]{width:44px;height:44px;opacity:1}.action-button .material-design-icon .material-design-icon__svg[data-v-42b28436]{vertical-align:middle}.action-button p[data-v-42b28436]{width:220px;padding:7px 0;cursor:pointer;text-align:left;line-height:1.6em;overflow:hidden;text-overflow:ellipsis}.action-button__longtext[data-v-42b28436]{cursor:pointer;white-space:pre-wrap}.action-button__title[data-v-42b28436]{font-weight:bold;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;max-width:100%;display:inline-block}\n", "", {
      version: 3,
      sources: ["webpack://./../../assets/action.scss", "webpack://./../../assets/variables.scss"],
      names: [],
      mappings: "AAwBC,2BAEE,8CAA+C,CAC/C,mCAMD,mBAAoB,CACpB,UCQmB,CDVpB,kFAIE,cAAe,CACf,UCKkB,CDVpB,qCAQE,oBAAqB,CACrB,gCAOD,YAAa,CACb,sBAAuB,CAEvB,UAAW,CACX,WAAY,CACZ,QAAS,CACT,SAAU,CACV,kBCtB8C,CDwB9C,cAAe,CACf,kBAAmB,CAEnB,UCjBiB,CDkBjB,4BAA6B,CAC7B,QAAS,CACT,eAAgB,CAChB,4BAA6B,CAC7B,eAAgB,CAEhB,kBAAmB,CACnB,kCAAmC,CACnC,gBC5CmB,CDsBpB,4EA0BE,SC7Ba,CDGf,qCA8BE,cAAe,CACf,kBAAmB,CACnB,sCAGA,UCzDkB,CD0DlB,WC1DkB,CD2DlB,SCxCa,CDyCb,+BAAwC,CACxC,oBCzDa,CD0Db,2BAA4B,CAxC9B,sDA4CE,UClEkB,CDmElB,WCnEkB,CDoElB,SCjDa,CDGf,iFAiDG,qBAAsB,CAjDzB,kCAuDE,WAAY,CACZ,aAA8B,CAE9B,cAAe,CACf,eAAgB,CAEhB,iBAAkB,CAGlB,eAAgB,CAChB,sBAAuB,CACvB,0CAGA,cAAe,CAEf,oBAAqB,CACrB,uCAGA,gBAAiB,CACjB,sBAAuB,CACvB,eAAgB,CAChB,kBAAmB,CACnB,cAAe,CACf,oBAAqB",
      sourcesContent: ["/**\n * @copyright Copyright (c) 2019 John Molakvoæ <skjnldsv@protonmail.com>\n *\n * @author John Molakvoæ <skjnldsv@protonmail.com>\n * @author Marco Ambrosini <marcoambrosini@pm.me>\n *\n * @license GNU AGPL version 3 or any later version\n *\n * This program is free software: you can redistribute it and/or modify\n * it under the terms of the GNU Affero General Public License as\n * published by the Free Software Foundation, either version 3 of the\n * License, or (at your option) any later version.\n *\n * This program is distributed in the hope that it will be useful,\n * but WITHOUT ANY WARRANTY; without even the implied warranty of\n * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the\n * GNU Affero General Public License for more details.\n *\n * You should have received a copy of the GNU Affero General Public License\n * along with this program. If not, see <http://www.gnu.org/licenses/>.\n *\n */\n\n@mixin action-active {\n\tli {\n\t\t&.active {\n\t\t\tbackground-color: var(--color-background-hover);\n\t\t}\n\t}\n}\n\n@mixin action--disabled {\n\t.action--disabled {\n\t\tpointer-events: none;\n\t\topacity: $opacity_disabled;\n\t\t&:hover, &:focus {\n\t\t\tcursor: default;\n\t\t\topacity: $opacity_disabled;\n\t\t}\n\t\t& * {\n\t\t\topacity: 1 !important;\n\t\t}\n\t}\n}\n\n\n@mixin action-item($name) {\n\t.action-#{$name} {\n\t\tdisplay: flex;\n\t\talign-items: flex-start;\n\n\t\twidth: 100%;\n\t\theight: auto;\n\t\tmargin: 0;\n\t\tpadding: 0;\n\t\tpadding-right: $icon-margin;\n\n\t\tcursor: pointer;\n\t\twhite-space: nowrap;\n\n\t\topacity: $opacity_normal;\n\t\tcolor: var(--color-main-text);\n\t\tborder: 0;\n\t\tborder-radius: 0; // otherwise Safari will cut the border-radius area\n\t\tbackground-color: transparent;\n\t\tbox-shadow: none;\n\n\t\tfont-weight: normal;\n\t\tfont-size: var(--default-font-size);\n\t\tline-height: $clickable-area;\n\n\t\t&:hover,\n\t\t&:focus {\n\t\t\topacity: $opacity_full;\n\t\t}\n\n\t\t& > span {\n\t\t\tcursor: pointer;\n\t\t\twhite-space: nowrap;\n\t\t}\n\n\t\t&__icon {\n\t\t\twidth: $clickable-area;\n\t\t\theight: $clickable-area;\n\t\t\topacity: $opacity_full;\n\t\t\tbackground-position: $icon-margin center;\n\t\t\tbackground-size: $icon-size;\n\t\t\tbackground-repeat: no-repeat;\n\t\t}\n\n\t\t.material-design-icon {\n\t\t\twidth: $clickable-area;\n\t\t\theight: $clickable-area;\n\t\t\topacity: $opacity_full;\n\n\t\t\t.material-design-icon__svg {\n\t\t\t\tvertical-align: middle;\n\t\t\t}\n\t\t}\n\n\t\t// long text area\n\t\tp {\n\t\t\twidth: 220px;\n\t\t\tpadding: #{$icon-margin / 2} 0;\n\n\t\t\tcursor: pointer;\n\t\t\ttext-align: left;\n\n\t\t\tline-height: 1.6em;\n\n\t\t\t// in case there are no spaces like long email addresses\n\t\t\toverflow: hidden;\n\t\t\ttext-overflow: ellipsis;\n\t\t}\n\n\t\t&__longtext {\n\t\t\tcursor: pointer;\n\t\t\t// allow the use of `\\n`\n\t\t\twhite-space: pre-wrap;\n\t\t}\n\n\t\t&__title {\n\t\t\tfont-weight: bold;\n\t\t\ttext-overflow: ellipsis;\n\t\t\toverflow: hidden;\n\t\t\twhite-space: nowrap;\n\t\t\tmax-width: 100%;\n\t\t\tdisplay: inline-block;\n\t\t}\n\t}\n}\n", "/**\n * @copyright Copyright (c) 2019 John Molakvoæ <skjnldsv@protonmail.com>\n *\n * @author John Molakvoæ <skjnldsv@protonmail.com>\n *\n * @license GNU AGPL version 3 or any later version\n *\n * This program is free software: you can redistribute it and/or modify\n * it under the terms of the GNU Affero General Public License as\n * published by the Free Software Foundation, either version 3 of the\n * License, or (at your option) any later version.\n *\n * This program is distributed in the hope that it will be useful,\n * but WITHOUT ANY WARRANTY; without even the implied warranty of\n * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the\n * GNU Affero General Public License for more details.\n *\n * You should have received a copy of the GNU Affero General Public License\n * along with this program. If not, see <http://www.gnu.org/licenses/>.\n *\n */\n\n// https://uxplanet.org/7-rules-for-mobile-ui-button-design-e9cf2ea54556\n// recommended is 48px\n// 44px is what we choose and have very good visual-to-usability ratio\n$clickable-area: 44px;\n\n// background icon size\n// also used for the scss icon font\n$icon-size: 16px;\n\n// icon padding for a $clickable-area width and a $icon-size icon\n// ( 44px - 16px ) / 2\n$icon-margin: ($clickable-area - $icon-size) / 2;\n\n// transparency background for icons\n$icon-focus-bg: rgba(127, 127, 127, .25);\n\n// popovermenu arrow width from the triangle center\n$arrow-width: 9px;\n\n// opacities\n$opacity_disabled: .5;\n$opacity_normal: .7;\n$opacity_full: 1;\n\n// menu round background hover feedback\n// good looking on dark AND white bg\n$action-background-hover: rgba(127, 127, 127, .25);\n\n// various structure data used in the \n// `AppNavigation` component\n$header-height: 50px;\n$navigation-width: 300px;\n\n// mobile breakpoint\n$breakpoint-mobile: 1024px;\n"],
      sourceRoot: ""
    }]), n.a = a;
  }, function (t, n) {},,,,,, function (t, n) {
    t.exports = __webpack_require__(/*! core-js/modules/es.array.splice.js */ "./node_modules/core-js/modules/es.array.splice.js");
  }, function (t, n, e) {
    "use strict";

    var A = {
      name: "ActionButton",
      mixins: [e(49).a],
      props: {
        disabled: {
          type: Boolean,
          default: !1
        }
      },
      computed: {
        isFocusable: function isFocusable() {
          return !this.disabled;
        }
      }
    },
        o = e(2),
        i = e.n(o),
        a = e(94),
        r = {
      insert: "head",
      singleton: !1
    },
        s = (i()(a.a, r), a.a.locals, e(3)),
        c = e(95),
        l = e.n(c),
        d = Object(s.a)(A, function () {
      var t = this,
          n = t.$createElement,
          e = t._self._c || n;
      return e("li", {
        staticClass: "action",
        class: {
          "action--disabled": t.disabled
        }
      }, [e("button", {
        staticClass: "action-button",
        class: {
          focusable: t.isFocusable
        },
        attrs: {
          "aria-label": t.ariaLabel
        },
        on: {
          click: t.onClick
        }
      }, [e("span", {
        staticClass: "action-button__icon",
        class: [t.isIconUrl ? "action-button__icon--url" : t.icon],
        style: {
          backgroundImage: t.isIconUrl ? "url(" + t.icon + ")" : null
        }
      }, [t._t("icon")], 2), t._v(" "), t.title ? e("p", [e("strong", {
        staticClass: "action-button__title"
      }, [t._v("\n\t\t\t\t" + t._s(t.title) + "\n\t\t\t")]), t._v(" "), e("br"), t._v(" "), e("span", {
        staticClass: "action-button__longtext",
        domProps: {
          textContent: t._s(t.text)
        }
      })]) : t.isLongText ? e("p", {
        staticClass: "action-button__longtext",
        domProps: {
          textContent: t._s(t.text)
        }
      }) : e("span", {
        staticClass: "action-button__text"
      }, [t._v(t._s(t.text))]), t._v(" "), t._e()], 2)]);
    }, [], !1, null, "42b28436", null);
    "function" == typeof l.a && l()(d);
    n.a = d.exports;
  },,,,,,, function (t, n) {
    t.exports = __webpack_require__(/*! hammerjs */ "./node_modules/hammerjs/hammer.js");
  }, function (t, n, e) {
    "use strict";

    e.r(n);
    var A = e(102);
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
     * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
     * GNU Affero General Public License for more details.
     *
     * You should have received a copy of the GNU Affero General Public License
     * along with this program. If not, see <http://www.gnu.org/licenses/>.
     *
     */

    n.default = A.a;
  },,,,,,,,, function (t, n, e) {
    "use strict";

    var A = e(0),
        o = e.n(A),
        i = e(1),
        a = e.n(i),
        r = e(4),
        s = e.n(r),
        c = e(8),
        l = e(9),
        d = e(10),
        u = e(11),
        g = a()(o.a),
        m = s()(c.a),
        p = s()(l.a),
        C = s()(d.a),
        f = s()(u.a);
    g.push([t.i, '@font-face{font-family:"iconfont-vue-6b494fc";src:url(' + m + ");src:url(" + m + ') format("embedded-opentype"),url(' + p + ') format("woff"),url(' + C + ') format("truetype"),url(' + f + ') format("svg")}.icon[data-v-3e0b109b]{font-style:normal;font-weight:400}.icon.arrow-left-double[data-v-3e0b109b]:before{font-family:"iconfont-vue-6b494fc";content:""}.icon.arrow-left[data-v-3e0b109b]:before{font-family:"iconfont-vue-6b494fc";content:""}.icon.arrow-right-double[data-v-3e0b109b]:before{font-family:"iconfont-vue-6b494fc";content:""}.icon.arrow-right[data-v-3e0b109b]:before{font-family:"iconfont-vue-6b494fc";content:""}.icon.breadcrumb[data-v-3e0b109b]:before{font-family:"iconfont-vue-6b494fc";content:""}.icon.checkmark[data-v-3e0b109b]:before{font-family:"iconfont-vue-6b494fc";content:""}.icon.close[data-v-3e0b109b]:before{font-family:"iconfont-vue-6b494fc";content:""}.icon.confirm[data-v-3e0b109b]:before{font-family:"iconfont-vue-6b494fc";content:""}.icon.info[data-v-3e0b109b]:before{font-family:"iconfont-vue-6b494fc";content:""}.icon.menu[data-v-3e0b109b]:before{font-family:"iconfont-vue-6b494fc";content:""}.icon.more[data-v-3e0b109b]:before{font-family:"iconfont-vue-6b494fc";content:""}.icon.pause[data-v-3e0b109b]:before{font-family:"iconfont-vue-6b494fc";content:""}.icon.play[data-v-3e0b109b]:before{font-family:"iconfont-vue-6b494fc";content:""}.icon.triangle-s[data-v-3e0b109b]:before{font-family:"iconfont-vue-6b494fc";content:""}.icon.user-status-away[data-v-3e0b109b]:before{font-family:"iconfont-vue-6b494fc";content:""}.icon.user-status-dnd[data-v-3e0b109b]:before{font-family:"iconfont-vue-6b494fc";content:""}.icon.user-status-invisible[data-v-3e0b109b]:before{font-family:"iconfont-vue-6b494fc";content:""}.icon.user-status-online[data-v-3e0b109b]:before{font-family:"iconfont-vue-6b494fc";content:""}.modal-mask[data-v-3e0b109b]{position:fixed;z-index:9998;top:0;left:0;display:block;width:100%;height:100%;background-color:rgba(0,0,0,0.5)}.modal-mask--dark[data-v-3e0b109b]{background-color:rgba(0,0,0,0.92)}.modal-header[data-v-3e0b109b]{position:absolute;z-index:10001;top:0;right:0;left:0;display:flex !important;align-items:center;justify-content:center;width:100%;height:50px;transition:opacity 250ms, visibility 250ms}.modal-header.invisible[style*=\'display:none\'][data-v-3e0b109b],.modal-header.invisible[style*=\'display: none\'][data-v-3e0b109b]{visibility:hidden}.modal-header .modal-title[data-v-3e0b109b]{overflow-x:hidden;box-sizing:border-box;width:100%;padding:0 132px 0 12px;transition:padding ease 100ms;white-space:nowrap;text-overflow:ellipsis;color:#fff;font-size:14px}@media only screen and (min-width: 512px){.modal-header .modal-title[data-v-3e0b109b]{text-align:center;padding-left:132px}}.modal-header .icons-menu[data-v-3e0b109b]{position:absolute;right:0;display:flex;align-items:center;justify-content:flex-end}.modal-header .icons-menu .icon-close[data-v-3e0b109b]{box-sizing:border-box;margin:3px;padding:10px 11px;color:#fff;background-image:none;font-size:23px}.modal-header .icons-menu .icon-close[data-v-3e0b109b]:before{font-family:"iconfont-vue-6b494fc";font-style:normal;font-weight:400;content:""}.modal-header .icons-menu .play-pause[data-v-3e0b109b]{position:relative;width:50px;height:50px;margin:0;padding:0;cursor:pointer;color:white;border:none;background-color:transparent;font-size:22px}.modal-header .icons-menu .play-pause:hover .icon-play[data-v-3e0b109b],.modal-header .icons-menu .play-pause:hover .icon-pause[data-v-3e0b109b],.modal-header .icons-menu .play-pause:focus .icon-play[data-v-3e0b109b],.modal-header .icons-menu .play-pause:focus .icon-pause[data-v-3e0b109b]{opacity:1;border-radius:22px;background-color:rgba(127,127,127,0.25)}.modal-header .icons-menu .play-pause .icon-play[data-v-3e0b109b],.modal-header .icons-menu .play-pause .icon-pause[data-v-3e0b109b]{box-sizing:border-box;width:44px;height:44px;margin:3px;opacity:.7;background-image:none;cursor:pointer}.modal-header .icons-menu .play-pause .icon-play[data-v-3e0b109b]{padding:11px 13px}.modal-header .icons-menu .play-pause .icon-play[data-v-3e0b109b]:before{font-family:"iconfont-vue-6b494fc";font-style:normal;font-weight:400;content:""}.modal-header .icons-menu .play-pause .icon-pause[data-v-3e0b109b]{padding:12px;font-size:19.5px}.modal-header .icons-menu .play-pause .icon-pause[data-v-3e0b109b]:before{font-family:"iconfont-vue-6b494fc";font-style:normal;font-weight:400;content:""}.modal-header .icons-menu .header-actions[data-v-3e0b109b]{margin:3px;color:white}.modal-header .icons-menu .action-item--single[data-v-3e0b109b]{box-sizing:border-box;width:44px;height:44px;cursor:pointer;background-position:center;background-size:22px}.modal-header .icons-menu[data-v-3e0b109b] .action-item__menutoggle{padding:13px 11px;color:#fff;font-size:22px}.modal-wrapper[data-v-3e0b109b]{display:flex;align-items:center;justify-content:center;box-sizing:border-box;width:100%;height:100%}.modal-wrapper .prev[data-v-3e0b109b],.modal-wrapper .next[data-v-3e0b109b]{z-index:10000;display:flex !important;align-items:center;justify-content:center;width:15%;min-width:60px;height:100%;transition:opacity 250ms, visibility 250ms}.modal-wrapper .prev.invisible[style*=\'display:none\'][data-v-3e0b109b],.modal-wrapper .prev.invisible[style*=\'display: none\'][data-v-3e0b109b],.modal-wrapper .next.invisible[style*=\'display:none\'][data-v-3e0b109b],.modal-wrapper .next.invisible[style*=\'display: none\'][data-v-3e0b109b]{visibility:hidden}.modal-wrapper .icon-next[data-v-3e0b109b],.modal-wrapper .icon-previous[data-v-3e0b109b]{box-sizing:border-box;width:44px;height:44px;padding:12px 11px;color:white;border-radius:22px;background-image:none;font-size:24px}.modal-wrapper .icon-previous[data-v-3e0b109b]:before{font-family:"iconfont-vue-6b494fc";font-style:normal;font-weight:400;content:""}.modal-wrapper .icon-next[data-v-3e0b109b]:before{font-family:"iconfont-vue-6b494fc";font-style:normal;font-weight:400;content:""}.modal-wrapper .modal-container[data-v-3e0b109b]{display:block;overflow:hidden;padding:0;transition:transform 300ms ease;border-radius:var(--border-radius-large);background-color:var(--color-main-background);box-shadow:0 0 40px rgba(0,0,0,0.2)}.modal-wrapper:not(.modal-wrapper--large):not(.modal-wrapper--full) .modal-container[data-v-3e0b109b]{max-width:900px;max-height:80%}.modal-wrapper--full .modal-container[data-v-3e0b109b]{max-width:100%;max-height:100%;border-radius:0}.modal-wrapper--full .prev[data-v-3e0b109b],.modal-wrapper--full .next[data-v-3e0b109b],.modal-wrapper--spread-navigation .prev[data-v-3e0b109b],.modal-wrapper--spread-navigation .next[data-v-3e0b109b]{position:absolute;width:10%}.modal-wrapper--full .prev[data-v-3e0b109b],.modal-wrapper--spread-navigation .prev[data-v-3e0b109b]{left:0}.modal-wrapper--full .next[data-v-3e0b109b],.modal-wrapper--spread-navigation .next[data-v-3e0b109b]{right:0}.modal-wrapper--large .modal-container[data-v-3e0b109b]{max-width:85%;max-height:90%}.modal-wrapper--large .prev[data-v-3e0b109b],.modal-wrapper--large .next[data-v-3e0b109b]{width:10%;min-width:44px}.fade-enter-active[data-v-3e0b109b],.fade-leave-active[data-v-3e0b109b]{transition:opacity 250ms}.fade-enter[data-v-3e0b109b],.fade-leave-to[data-v-3e0b109b]{opacity:0}.fade-visibility-enter[data-v-3e0b109b],.fade-visibility-leave-to[data-v-3e0b109b]{visibility:hidden;opacity:0}.modal-in-enter-active[data-v-3e0b109b],.modal-in-leave-active[data-v-3e0b109b],.modal-out-enter-active[data-v-3e0b109b],.modal-out-leave-active[data-v-3e0b109b]{transition:opacity 250ms}.modal-in-enter[data-v-3e0b109b],.modal-in-leave-to[data-v-3e0b109b],.modal-out-enter[data-v-3e0b109b],.modal-out-leave-to[data-v-3e0b109b]{opacity:0}.modal-in-enter .modal-container[data-v-3e0b109b],.modal-in-leave-to .modal-container[data-v-3e0b109b]{transform:scale(0.9)}.modal-out-enter .modal-container[data-v-3e0b109b],.modal-out-leave-to .modal-container[data-v-3e0b109b]{transform:scale(1.1)}.modal-mask .play-pause .progress-ring[data-v-3e0b109b]{position:absolute;top:0;left:0;transform:rotate(-90deg)}.modal-mask .play-pause .progress-ring .progress-ring__circle[data-v-3e0b109b]{transition:100ms stroke-dashoffset;transform-origin:50% 50%;animation:progressring-data-v-3e0b109b linear 3s infinite;stroke-linecap:round;stroke-dashoffset:94.24778;stroke-dasharray:94.24778}.modal-mask .play-pause--paused .icon-pause[data-v-3e0b109b]{animation:breath-data-v-3e0b109b 2s cubic-bezier(0.4, 0, 0.2, 1) infinite}.modal-mask .play-pause--paused .progress-ring__circle[data-v-3e0b109b]{animation-play-state:paused !important}@keyframes progressring-data-v-3e0b109b{from{stroke-dashoffset:94.24778}to{stroke-dashoffset:0}}@keyframes breath-data-v-3e0b109b{0%{opacity:1}50%{opacity:0}100%{opacity:1}}\n', "", {
      version: 3,
      sources: ["webpack://./../../fonts/scss/iconfont-vue.scss", "webpack://./Modal.vue", "webpack://./../../assets/variables.scss"],
      names: [],
      mappings: "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",
      sourcesContent: ['$__iconfont__data: map-merge(if(global_variable_exists(\'__iconfont__data\'), $__iconfont__data, ()), (\n\t"iconfont-vue-6b494fc": (\n\t\t"arrow-left-double": "\\ea01",\n\t\t"arrow-left": "\\ea02",\n\t\t"arrow-right-double": "\\ea03",\n\t\t"arrow-right": "\\ea04",\n\t\t"breadcrumb": "\\ea05",\n\t\t"checkmark": "\\ea06",\n\t\t"close": "\\ea07",\n\t\t"confirm": "\\ea08",\n\t\t"info": "\\ea09",\n\t\t"menu": "\\ea0a",\n\t\t"more": "\\ea0b",\n\t\t"pause": "\\ea0c",\n\t\t"play": "\\ea0d",\n\t\t"triangle-s": "\\ea0e",\n\t\t"user-status-away": "\\ea0f",\n\t\t"user-status-dnd": "\\ea10",\n\t\t"user-status-invisible": "\\ea11",\n\t\t"user-status-online": "\\ea12"\n\t)\n));\n\n\n$create-font-face: true !default; // should the @font-face tag get created?\n\n// should there be a custom class for each icon? will be .filename\n$create-icon-classes: true !default; \n\n// what is the common class name that icons share? in this case icons need to have .icon.filename in their classes\n// this requires you to have 2 classes on each icon html element, but reduced redeclaration of the font family\n// for each icon\n$icon-common-class: \'icon\' !default;\n\n// if you whish to prefix your filenames, here you can do so.\n// if this string stays empty, your classes will use the filename, for example\n// an icon called star.svg will result in a class called .star\n// if you use the prefix to be \'icon-\' it would result in .icon-star\n$icon-prefix: \'\' !default; \n\n// helper function to get the correct font group\n@function iconfont-group($group: null) {\n  @if (null == $group) {\n    $group: nth(map-keys($__iconfont__data), 1);\n  }\n  @if (false == map-has-key($__iconfont__data, $group)) {\n    @warn \'Undefined Iconfont Family!\';\n    @return ();\n  }\n  @return map-get($__iconfont__data, $group);\n}\n\n// helper function to get the correct icon of a group\n@function iconfont-item($name) {\n  $slash: str-index($name, \'/\');\n  $group: null;\n  @if ($slash) {\n    $group: str-slice($name, 0, $slash - 1);\n    $name: str-slice($name, $slash + 1);\n  } @else {\n    $group: nth(map-keys($__iconfont__data), 1);\n  }\n  $group: iconfont-group($group);\n  @if (false == map-has-key($group, $name)) {\n    @warn \'Undefined Iconfont Glyph!\';\n    @return \'\';\n  }\n  @return map-get($group, $name);\n}\n\n// complete mixing to include the icon\n// usage:\n// .my_icon{ @include iconfont(\'star\') }\n@mixin iconfont($icon) {\n  $slash: str-index($icon, \'/\');\n  $group: null;\n  @if ($slash) {\n    $group: str-slice($icon, 0, $slash - 1);\n  } @else {\n    $group: nth(map-keys($__iconfont__data), 1);\n  }\n  &:before {\n    font-family: $group;\n    font-style: normal;\n    font-weight: 400;\n    content: iconfont-item($icon);\n  }\n}\n\n// creates the font face tag if the variable is set to true (default)\n@if $create-font-face == true {\n  @font-face {\n   font-family: "iconfont-vue-6b494fc";\n   src: url(\'../iconfont-vue-6b494fc.eot\'); /* IE9 Compat Modes */\n   src: url(\'../iconfont-vue-6b494fc.eot?#iefix\') format(\'embedded-opentype\'), /* IE6-IE8 */\n      url(\'../iconfont-vue-6b494fc.woff\') format(\'woff\'), /* Pretty Modern Browsers */\n      url(\'../iconfont-vue-6b494fc.ttf\')  format(\'truetype\'), /* Safari, Android, iOS */\n      url(\'../iconfont-vue-6b494fc.svg\') format(\'svg\'); /* Legacy iOS */\n  }\n}\n\n// creates icon classes for each individual loaded svg (default)\n@if $create-icon-classes == true {\n  .#{$icon-common-class} {\n    font-style: normal;\n    font-weight: 400;\n\n    @each $icon, $content in map-get($__iconfont__data, "iconfont-vue-6b494fc") {\n      &.#{$icon-prefix}#{$icon}:before {\n        font-family: "iconfont-vue-6b494fc";\n        content: iconfont-item("iconfont-vue-6b494fc/#{$icon}");\n      }\n    }\n  }\n}\n', "$scope_version:\"6b494fc\"; @import 'variables';\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n@import '../../fonts/scss/iconfont-vue';\n$header-size: 50px;\n\n.modal-mask {\n\tposition: fixed;\n\tz-index: 9998;\n\ttop: 0;\n\tleft: 0;\n\tdisplay: block;\n\twidth: 100%;\n\theight: 100%;\n\tbackground-color: rgba(0, 0, 0, .5);\n\t&--dark {\n\t\tbackground-color: rgba(0, 0, 0, .92);\n\t}\n}\n\n.modal-header {\n\tposition: absolute;\n\tz-index: 10001;\n\ttop: 0;\n\tright: 0;\n\tleft: 0;\n\t// prevent vue show to use display:none and reseting\n\t// the circle animation loop\n\tdisplay: flex !important;\n\talign-items: center;\n\tjustify-content: center;\n\twidth: 100%;\n\theight: $header-size;\n\ttransition: opacity 250ms,\n\t\tvisibility 250ms;\n\n\t// replace display by visibility\n\t&.invisible[style*='display:none'],\n\t&.invisible[style*='display: none'] {\n\t\tvisibility: hidden;\n\t}\n\n\t.modal-title {\n\t\toverflow-x: hidden;\n\t\tbox-sizing: border-box;\n\t\twidth: 100%;\n\t\tpadding: 0 #{$clickable-area * 3} 0 12px; // maximum actions is 3\n\t\ttransition: padding ease 100ms;\n\t\twhite-space: nowrap;\n\t\ttext-overflow: ellipsis;\n\t\tcolor: #fff;\n\t\tfont-size: $icon-margin;\n\t}\n\n\t// On wider screens the title can be centered\n\t@media only screen and (min-width: $breakpoint-mobile/2) {\n\t\t.modal-title {\n\t\t\ttext-align: center;\n\t\t\tpadding-left: #{$clickable-area * 3}; // maximum actions is 3\n\t\t}\n\t}\n\n\t.icons-menu {\n\t\tposition: absolute;\n\t\tright: 0;\n\t\tdisplay: flex;\n\t\talign-items: center;\n\t\tjustify-content: flex-end;\n\n\t\t.icon-close {\n\t\t\tbox-sizing: border-box;\n\t\t\tmargin: ($header-size - $clickable-area) / 2;\n\t\t\t// not using $icon-margin since we have a custom font size\n\t\t\t// and alignement seems odd\n\t\t\tpadding: 10px 11px;\n\t\t\tcolor: #fff;\n\t\t\tbackground-image: none;\n\t\t\tfont-size: 23px;\n\n\t\t\t@include iconfont('close');\n\t\t}\n\n\t\t.play-pause {\n\t\t\tposition: relative;\n\t\t\twidth: $header-size;\n\t\t\theight: $header-size;\n\t\t\tmargin: 0;\n\t\t\tpadding: 0;\n\t\t\tcursor: pointer;\n\t\t\tcolor: white;\n\t\t\tborder: none;\n\t\t\tbackground-color: transparent;\n\t\t\tfont-size: 22px;\n\t\t\t&:hover,\n\t\t\t&:focus {\n\t\t\t\t.icon-play,\n\t\t\t\t.icon-pause {\n\t\t\t\t\topacity: 1;\n\t\t\t\t\tborder-radius: $clickable-area / 2;\n\t\t\t\t\tbackground-color: $icon-focus-bg;\n\t\t\t\t}\n\t\t\t}\n\t\t\t.icon-play,\n\t\t\t.icon-pause {\n\t\t\t\tbox-sizing: border-box;\n\t\t\t\twidth: $clickable-area;\n\t\t\t\theight: $clickable-area;\n\t\t\t\tmargin: ($header-size - $clickable-area) / 2;\n\t\t\t\topacity: .7;\n\t\t\t\tbackground-image: none;\n\t\t\t\tcursor: pointer;\n\t\t\t}\n\t\t\t.icon-play {\n\t\t\t\t// better visual\n\t\t\t\tpadding: 11px 13px;\n\t\t\t\t@include iconfont('play');\n\t\t\t}\n\t\t\t.icon-pause {\n\t\t\t\tpadding: 12px;\n\t\t\t\t// ! align with circle\n\t\t\t\tfont-size: 19.5px;\n\t\t\t\t@include iconfont('pause');\n\t\t\t}\n\t\t}\n\n\t\t.header-actions {\n\t\t\tmargin: ($header-size - $clickable-area) / 2;\n\t\t\tcolor: white;\n\t\t}\n\n\t\t.action-item--single {\n\t\t\tbox-sizing: border-box;\n\t\t\twidth: $clickable-area;\n\t\t\theight: $clickable-area;\n\t\t\tcursor: pointer;\n\t\t\tbackground-position: center;\n\t\t\tbackground-size: 22px;\n\t\t}\n\n\t\t&::v-deep .action-item__menutoggle {\n\t\t\tpadding: 13px 11px;\n\t\t\t// force white instead of default main text\n\t\t\tcolor: #fff;\n\t\t\t// 22px is a somehow better looking for the icon-more icon\n\t\t\tfont-size: 22px;\n\t\t}\n\n\t}\n}\n\n.modal-wrapper {\n\tdisplay: flex;\n\talign-items: center;\n\tjustify-content: center;\n\tbox-sizing: border-box;\n\twidth: 100%;\n\theight: 100%;\n\n\t/* Navigation buttons */\n\t.prev,\n\t.next {\n\t\tz-index: 10000;\n\t\t// ignore display: none\n\t\tdisplay: flex !important;\n\t\talign-items: center;\n\t\tjustify-content: center;\n\t\twidth: 15%;\n\t\tmin-width: 60px;\n\t\theight: 100%;\n\t\ttransition: opacity 250ms,\n\t\t\tvisibility 250ms;\n\n\t\t// we want to keep the elements on page\n\t\t// even if hidden to avoid having a unbalanced\n\t\t// centered content\n\t\t// replace display by visibility\n\t\t&.invisible[style*='display:none'],\n\t\t&.invisible[style*='display: none'] {\n\t\t\tvisibility: hidden;\n\t\t}\n\t}\n\n\t// buttons/icons\n\t.icon-next,\n\t.icon-previous {\n\t\tbox-sizing: border-box;\n\t\twidth: $clickable-area;\n\t\theight: $clickable-area;\n\t\tpadding: 12px 11px;\n\t\tcolor: white;\n\t\tborder-radius: $clickable-area / 2;\n\t\tbackground-image: none;\n\t\tfont-size: 24px;\n\t}\n\t.icon-previous {\n\t\t@include iconfont('arrow-left');\n\t}\n\t.icon-next {\n\t\t@include iconfont('arrow-right');\n\t}\n\n\t/* Content */\n\t.modal-container {\n\t\tdisplay: block;\n\t\toverflow: hidden;\n\t\tpadding: 0;\n\t\ttransition: transform 300ms ease;\n\t\tborder-radius: var(--border-radius-large);\n\t\tbackground-color: var(--color-main-background);\n\t\tbox-shadow: 0 0 40px rgba(0, 0, 0, .2);\n\t}\n\t&:not(&--large):not(&--full) .modal-container {\n\t\tmax-width: 900px;\n\t\tmax-height: 80%;\n\t}\n\n\t// Sizing\n\t&--full {\n\t\t.modal-container {\n\t\t\tmax-width: 100%;\n\t\t\tmax-height: 100%;\n\t\t\tborder-radius: 0;\n\t\t}\n\t}\n\t&--full,\n\t&--spread-navigation {\n\t\t.prev,\n\t\t.next {\n\t\t\tposition: absolute;\n\t\t\twidth: 10%;\n\t\t}\n\t\t.prev {\n\t\t\tleft: 0;\n\t\t}\n\t\t.next {\n\t\t\tright: 0;\n\t\t}\n\t}\n\t&--large {\n\t\t.modal-container {\n\t\t\tmax-width: 85%;\n\t\t\tmax-height: 90%;\n\t\t}\n\t\t.prev,\n\t\t.next {\n\t\t\twidth: 10%;\n\t\t\tmin-width: $clickable-area;\n\t\t}\n\t}\n}\n\n/* TRANSITIONS */\n.fade-enter-active,\n.fade-leave-active {\n\ttransition: opacity 250ms;\n}\n\n.fade-enter,\n.fade-leave-to {\n\topacity: 0;\n}\n\n.fade-visibility-enter,\n.fade-visibility-leave-to {\n\tvisibility: hidden;\n\topacity: 0;\n}\n\n.modal-in-enter-active,\n.modal-in-leave-active,\n.modal-out-enter-active,\n.modal-out-leave-active {\n\ttransition: opacity 250ms;\n}\n\n.modal-in-enter,\n.modal-in-leave-to,\n.modal-out-enter,\n.modal-out-leave-to {\n\topacity: 0;\n}\n\n.modal-in-enter .modal-container,\n.modal-in-leave-to .modal-container {\n\ttransform: scale(.9);\n}\n\n.modal-out-enter .modal-container,\n.modal-out-leave-to .modal-container {\n\ttransform: scale(1.1);\n}\n\n// animated circle\n$radius: 15;\n$pi: 3.14159265358979;\n\n.modal-mask .play-pause {\n\t.progress-ring {\n\t\tposition: absolute;\n\t\ttop: 0;\n\t\tleft: 0;\n\t\ttransform: rotate(-90deg);\n\t\t.progress-ring__circle {\n\t\t\ttransition: 100ms stroke-dashoffset;\n\t\t\ttransform-origin: 50% 50%; // axis compensation\n\t\t\tanimation: progressring linear 3s infinite;\n\n\t\t\tstroke-linecap: round;\n\t\t\tstroke-dashoffset: $radius * 2 * $pi; // radius * 2 * PI\n\t\t\tstroke-dasharray: $radius * 2 * $pi; // radius * 2 * PI\n\t\t}\n\t}\n\t&--paused {\n\t\t.icon-pause {\n\t\t\tanimation: breath 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;\n\t\t}\n\t\t.progress-ring__circle {\n\t\t\tanimation-play-state: paused !important;\n\t\t}\n\t}\n}\n\n// keyframes get scoped too and break the animation name, we need them unscoped\n@keyframes progressring {\n\tfrom {\n\t\tstroke-dashoffset: $radius * 2 * $pi; // radius * 2 * PI\n\t}\n\tto {\n\t\tstroke-dashoffset: 0;\n\t}\n}\n\n@keyframes breath {\n\t0% {\n\t\topacity: 1;\n\t}\n\t50% {\n\t\topacity: 0;\n\t}\n\t100% {\n\t\topacity: 1;\n\t}\n}\n\n", "/**\n * @copyright Copyright (c) 2019 John Molakvoæ <skjnldsv@protonmail.com>\n *\n * @author John Molakvoæ <skjnldsv@protonmail.com>\n *\n * @license GNU AGPL version 3 or any later version\n *\n * This program is free software: you can redistribute it and/or modify\n * it under the terms of the GNU Affero General Public License as\n * published by the Free Software Foundation, either version 3 of the\n * License, or (at your option) any later version.\n *\n * This program is distributed in the hope that it will be useful,\n * but WITHOUT ANY WARRANTY; without even the implied warranty of\n * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the\n * GNU Affero General Public License for more details.\n *\n * You should have received a copy of the GNU Affero General Public License\n * along with this program. If not, see <http://www.gnu.org/licenses/>.\n *\n */\n\n// https://uxplanet.org/7-rules-for-mobile-ui-button-design-e9cf2ea54556\n// recommended is 48px\n// 44px is what we choose and have very good visual-to-usability ratio\n$clickable-area: 44px;\n\n// background icon size\n// also used for the scss icon font\n$icon-size: 16px;\n\n// icon padding for a $clickable-area width and a $icon-size icon\n// ( 44px - 16px ) / 2\n$icon-margin: ($clickable-area - $icon-size) / 2;\n\n// transparency background for icons\n$icon-focus-bg: rgba(127, 127, 127, .25);\n\n// popovermenu arrow width from the triangle center\n$arrow-width: 9px;\n\n// opacities\n$opacity_disabled: .5;\n$opacity_normal: .7;\n$opacity_full: 1;\n\n// menu round background hover feedback\n// good looking on dark AND white bg\n$action-background-hover: rgba(127, 127, 127, .25);\n\n// various structure data used in the \n// `AppNavigation` component\n$header-height: 50px;\n$navigation-width: 300px;\n\n// mobile breakpoint\n$breakpoint-mobile: 1024px;\n"],
      sourceRoot: ""
    }]), n.a = g;
  }, function (t, n) {},,,,,,,,, function (t, n, e) {
    "use strict";

    e.r(n);
    var A = e(83),
        o = (e(31), e(109)),
        i = e.n(o),
        a = e(73),
        r = e(110),
        s = e(61),
        c = e(12),
        l = e(21);
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

    function d(t, n) {
      var e,
          A,
          o,
          i = n;
      this.start = function () {
        o = !0, A = new Date(), e = setTimeout(t, i);
      }, this.pause = function () {
        o = !1, clearTimeout(e), i -= new Date() - A;
      }, this.clear = function () {
        o = !1, clearTimeout(e), i = 0;
      }, this.getTimeLeft = function () {
        return o && (this.pause(), this.start()), i;
      }, this.getStateRunning = function () {
        return o;
      }, this.start();
    }

    var u = {
      name: "Modal",
      components: {
        Actions: a.default,
        ActionButton: r.default
      },
      directives: {
        tooltip: l.default
      },
      mixins: [s.a],
      props: {
        title: {
          type: String,
          default: ""
        },
        hasPrevious: {
          type: Boolean,
          default: !1
        },
        hasNext: {
          type: Boolean,
          default: !1
        },
        outTransition: {
          type: Boolean,
          default: !1
        },
        enableSlideshow: {
          type: Boolean,
          default: !1
        },
        clearViewDelay: {
          type: Number,
          default: 5e3
        },
        slideshowDelay: {
          type: Number,
          default: 3e3
        },
        slideshowPaused: {
          type: Boolean,
          default: !1
        },
        enableSwipe: {
          type: Boolean,
          default: !0
        },
        spreadNavigation: {
          type: Boolean,
          default: !1
        },
        size: {
          type: String,
          default: "normal",
          validator: function validator(t) {
            return -1 !== ["normal", "large", "full"].indexOf(t);
          }
        },
        canClose: {
          type: Boolean,
          default: !0
        },
        dark: {
          type: Boolean,
          default: !1
        },
        container: {
          type: String,
          default: "body"
        }
      },
      data: function data() {
        return {
          mc: null,
          showModal: !1,
          clearView: !1,
          clearViewTimeout: null,
          playing: !1,
          slideshowTimeout: null
        };
      },
      computed: {
        modalTransitionName: function modalTransitionName() {
          return "modal-".concat(this.outTransition ? "out" : "in");
        },
        playPauseTitle: function playPauseTitle() {
          return this.playing ? Object(c.b)("Pause slideshow") : Object(c.b)("Start slideshow");
        }
      },
      watch: {
        slideshowPaused: function slideshowPaused(t) {
          this.slideshowTimeout && (t ? this.slideshowTimeout.pause() : this.slideshowTimeout.start());
        }
      },
      beforeMount: function beforeMount() {
        window.addEventListener("keydown", this.handleKeydown);
      },
      beforeDestroy: function beforeDestroy() {
        window.removeEventListener("keydown", this.handleKeydown), this.mc.off("swipeleft swiperight"), this.mc.destroy();
      },
      mounted: function mounted() {
        var t = this;
        (this.showModal = !0, this.handleMouseMove(), this.mc = new i.a(this.$refs.mask), this.mc.on("swipeleft swiperight", function (n) {
          t.handleSwipe(n);
        }), "body" === this.container) ? document.body.insertBefore(this.$el, document.body.lastChild) : document.querySelector(this.container).appendChild(this.$el);
      },
      destroyed: function destroyed() {
        this.$el.remove();
      },
      methods: {
        previous: function previous(t) {
          this.hasPrevious && (t && this.resetSlideshow(), this.$emit("previous", t));
        },
        next: function next(t) {
          this.hasNext && (t && this.resetSlideshow(), this.$emit("next", t));
        },
        close: function close(t) {
          var n = this;
          this.canClose && (this.showModal = !1, setTimeout(function () {
            n.$emit("close", t);
          }, 300));
        },
        handleKeydown: function handleKeydown(t) {
          switch (t.keyCode) {
            case 37:
              this.previous(t);
              break;

            case 13:
            case 39:
              this.next(t);
              break;

            case 27:
              this.close(t);
          }
        },
        handleSwipe: function handleSwipe(t) {
          this.enableSwipe && ("swipeleft" === t.type ? this.next(t) : "swiperight" === t.type && this.previous(t));
        },
        handleMouseMove: function handleMouseMove() {
          var t = this;
          this.clearViewDelay > 0 && (this.clearView = !1, clearTimeout(this.clearViewTimeout), this.clearViewTimeout = setTimeout(function () {
            t.clearView = !0;
          }, this.clearViewDelay));
        },
        togglePlayPause: function togglePlayPause() {
          this.playing = !this.playing, this.playing ? this.handleSlideshow() : this.clearSlideshowTimeout();
        },
        resetSlideshow: function resetSlideshow() {
          this.playing = !this.playing, this.clearSlideshowTimeout(), this.$nextTick(function () {
            this.togglePlayPause();
          });
        },
        handleSlideshow: function handleSlideshow() {
          var t = this;
          this.playing = !0, this.hasNext ? this.slideshowTimeout = new d(function () {
            t.next(), t.handleSlideshow();
          }, this.slideshowDelay) : (this.playing = !1, this.clearSlideshowTimeout());
        },
        clearSlideshowTimeout: function clearSlideshowTimeout() {
          this.slideshowTimeout && this.slideshowTimeout.clear();
        }
      }
    },
        g = e(2),
        m = e.n(g),
        p = e(119),
        C = {
      insert: "head",
      singleton: !1
    },
        f = (m()(p.a, C), p.a.locals, e(3)),
        h = e(120),
        b = e.n(h),
        v = Object(f.a)(u, function () {
      var t = this,
          n = t.$createElement,
          e = t._self._c || n;
      return e("transition", {
        attrs: {
          name: "fade"
        }
      }, [e("div", {
        ref: "mask",
        staticClass: "modal-mask",
        class: {
          "modal-mask--dark": t.dark
        },
        on: {
          click: t.handleMouseMove,
          mousemove: t.handleMouseMove,
          touchmove: t.handleMouseMove
        }
      }, [e("transition", {
        attrs: {
          name: "fade-visibility"
        }
      }, [e("div", {
        directives: [{
          name: "show",
          rawName: "v-show",
          value: !t.clearView,
          expression: "!clearView"
        }],
        staticClass: "modal-header",
        class: {
          invisible: t.clearView
        }
      }, ["" !== t.title.trim() ? e("div", {
        staticClass: "modal-title"
      }, [t._v("\n\t\t\t\t\t" + t._s(t.title) + "\n\t\t\t\t")]) : t._e(), t._v(" "), e("div", {
        staticClass: "icons-menu"
      }, [t.hasNext && t.enableSlideshow ? e("button", {
        directives: [{
          name: "tooltip",
          rawName: "v-tooltip.auto",
          value: t.playPauseTitle,
          expression: "playPauseTitle",
          modifiers: {
            auto: !0
          }
        }],
        staticClass: "play-pause",
        class: {
          "play-pause--paused": t.slideshowPaused
        },
        on: {
          click: t.togglePlayPause
        }
      }, [e("div", {
        class: [t.playing ? "icon-pause" : "icon-play"]
      }, [e("span", {
        staticClass: "hidden-visually"
      }, [t._v("\n\t\t\t\t\t\t\t\t" + t._s(t.playPauseTitle) + "\n\t\t\t\t\t\t\t")])]), t._v(" "), t.playing ? e("svg", {
        staticClass: "progress-ring",
        attrs: {
          height: "50",
          width: "50"
        }
      }, [e("circle", {
        staticClass: "progress-ring__circle",
        attrs: {
          stroke: "white",
          "stroke-width": "2",
          fill: "transparent",
          r: "15",
          cx: "25",
          cy: "25"
        }
      })]) : t._e()]) : t._e(), t._v(" "), e("Actions", {
        staticClass: "header-actions"
      }, [t._t("actions")], 2), t._v(" "), t.canClose ? e("Actions", {
        staticClass: "header-close"
      }, [e("ActionButton", {
        attrs: {
          icon: "icon-close"
        },
        on: {
          click: t.close
        }
      }, [t._v("\n\t\t\t\t\t\t\t" + t._s(t.t("Close")) + "\n\t\t\t\t\t\t")])], 1) : t._e()], 1)])]), t._v(" "), e("transition", {
        attrs: {
          name: t.modalTransitionName
        }
      }, [e("div", {
        directives: [{
          name: "show",
          rawName: "v-show",
          value: t.showModal,
          expression: "showModal"
        }],
        staticClass: "modal-wrapper",
        class: ["modal-wrapper--" + t.size, t.spreadNavigation ? "modal-wrapper--spread-navigation" : ""],
        on: {
          mousedown: function mousedown(n) {
            return n.target !== n.currentTarget ? null : t.close(n);
          }
        }
      }, [e("transition", {
        attrs: {
          name: "fade-visibility"
        }
      }, [e("a", {
        directives: [{
          name: "show",
          rawName: "v-show",
          value: t.hasPrevious && !t.clearView,
          expression: "hasPrevious && !clearView"
        }],
        staticClass: "prev",
        class: {
          invisible: t.clearView || !t.hasPrevious
        },
        on: {
          click: t.previous
        }
      }, [e("div", {
        staticClass: "icon icon-previous"
      }, [e("span", {
        staticClass: "hidden-visually"
      }, [t._v("\n\t\t\t\t\t\t\t\t" + t._s(t.t("Previous")) + "\n\t\t\t\t\t\t\t")])])])]), t._v(" "), e("div", {
        staticClass: "modal-container"
      }, [t._t("default")], 2), t._v(" "), e("transition", {
        attrs: {
          name: "fade-visibility"
        }
      }, [e("a", {
        directives: [{
          name: "show",
          rawName: "v-show",
          value: t.hasNext && !t.clearView,
          expression: "hasNext && !clearView"
        }],
        staticClass: "next",
        class: {
          invisible: t.clearView || !t.hasNext
        },
        on: {
          click: t.next
        }
      }, [e("div", {
        staticClass: "icon icon-next"
      }, [e("span", {
        staticClass: "hidden-visually"
      }, [t._v("\n\t\t\t\t\t\t\t\t" + t._s(t.t("Next")) + "\n\t\t\t\t\t\t\t")])])])])], 1)])], 1)]);
    }, [], !1, null, "3e0b109b", null);
    "function" == typeof b.a && b()(v);
    var y = v.exports;
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

    Object(A.a)(y);
    n.default = y;
  }]);
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./node_modules/core-js/internals/string-trim-forced.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/internals/string-trim-forced.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");

var whitespaces = __webpack_require__(/*! ../internals/whitespaces */ "./node_modules/core-js/internals/whitespaces.js");

var non = "\u200B\x85\u180E"; // check that a method works with the correct list
// of whitespaces and has a correct name

module.exports = function (METHOD_NAME) {
  return fails(function () {
    return !!whitespaces[METHOD_NAME]() || non[METHOD_NAME]() != non || whitespaces[METHOD_NAME].name !== METHOD_NAME;
  });
};

/***/ }),

/***/ "./node_modules/core-js/modules/es.array.splice.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es.array.splice.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");

var toAbsoluteIndex = __webpack_require__(/*! ../internals/to-absolute-index */ "./node_modules/core-js/internals/to-absolute-index.js");

var toInteger = __webpack_require__(/*! ../internals/to-integer */ "./node_modules/core-js/internals/to-integer.js");

var toLength = __webpack_require__(/*! ../internals/to-length */ "./node_modules/core-js/internals/to-length.js");

var toObject = __webpack_require__(/*! ../internals/to-object */ "./node_modules/core-js/internals/to-object.js");

var arraySpeciesCreate = __webpack_require__(/*! ../internals/array-species-create */ "./node_modules/core-js/internals/array-species-create.js");

var createProperty = __webpack_require__(/*! ../internals/create-property */ "./node_modules/core-js/internals/create-property.js");

var arrayMethodHasSpeciesSupport = __webpack_require__(/*! ../internals/array-method-has-species-support */ "./node_modules/core-js/internals/array-method-has-species-support.js");

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('splice');
var max = Math.max;
var min = Math.min;
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
var MAXIMUM_ALLOWED_LENGTH_EXCEEDED = 'Maximum allowed length exceeded'; // `Array.prototype.splice` method
// https://tc39.es/ecma262/#sec-array.prototype.splice
// with adding support of @@species

$({
  target: 'Array',
  proto: true,
  forced: !HAS_SPECIES_SUPPORT
}, {
  splice: function splice(start, deleteCount
  /* , ...items */
  ) {
    var O = toObject(this);
    var len = toLength(O.length);
    var actualStart = toAbsoluteIndex(start, len);
    var argumentsLength = arguments.length;
    var insertCount, actualDeleteCount, A, k, from, to;

    if (argumentsLength === 0) {
      insertCount = actualDeleteCount = 0;
    } else if (argumentsLength === 1) {
      insertCount = 0;
      actualDeleteCount = len - actualStart;
    } else {
      insertCount = argumentsLength - 2;
      actualDeleteCount = min(max(toInteger(deleteCount), 0), len - actualStart);
    }

    if (len + insertCount - actualDeleteCount > MAX_SAFE_INTEGER) {
      throw TypeError(MAXIMUM_ALLOWED_LENGTH_EXCEEDED);
    }

    A = arraySpeciesCreate(O, actualDeleteCount);

    for (k = 0; k < actualDeleteCount; k++) {
      from = actualStart + k;
      if (from in O) createProperty(A, k, O[from]);
    }

    A.length = actualDeleteCount;

    if (insertCount < actualDeleteCount) {
      for (k = actualStart; k < len - actualDeleteCount; k++) {
        from = k + actualDeleteCount;
        to = k + insertCount;
        if (from in O) O[to] = O[from];else delete O[to];
      }

      for (k = len; k > len - actualDeleteCount + insertCount; k--) {
        delete O[k - 1];
      }
    } else if (insertCount > actualDeleteCount) {
      for (k = len - actualDeleteCount; k > actualStart; k--) {
        from = k + actualDeleteCount - 1;
        to = k + insertCount - 1;
        if (from in O) O[to] = O[from];else delete O[to];
      }
    }

    for (k = 0; k < insertCount; k++) {
      O[k + actualStart] = arguments[k + 2];
    }

    O.length = len - actualDeleteCount + insertCount;
    return A;
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

/***/ "./node_modules/core-js/modules/es.object.get-own-property-descriptor.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/core-js/modules/es.object.get-own-property-descriptor.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");

var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "./node_modules/core-js/internals/to-indexed-object.js");

var nativeGetOwnPropertyDescriptor = __webpack_require__(/*! ../internals/object-get-own-property-descriptor */ "./node_modules/core-js/internals/object-get-own-property-descriptor.js").f;

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");

var FAILS_ON_PRIMITIVES = fails(function () {
  nativeGetOwnPropertyDescriptor(1);
});
var FORCED = !DESCRIPTORS || FAILS_ON_PRIMITIVES; // `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor

$({
  target: 'Object',
  stat: true,
  forced: FORCED,
  sham: !DESCRIPTORS
}, {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(it, key) {
    return nativeGetOwnPropertyDescriptor(toIndexedObject(it), key);
  }
});

/***/ }),

/***/ "./node_modules/core-js/modules/es.object.get-own-property-descriptors.js":
/*!********************************************************************************!*\
  !*** ./node_modules/core-js/modules/es.object.get-own-property-descriptors.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");

var ownKeys = __webpack_require__(/*! ../internals/own-keys */ "./node_modules/core-js/internals/own-keys.js");

var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "./node_modules/core-js/internals/to-indexed-object.js");

var getOwnPropertyDescriptorModule = __webpack_require__(/*! ../internals/object-get-own-property-descriptor */ "./node_modules/core-js/internals/object-get-own-property-descriptor.js");

var createProperty = __webpack_require__(/*! ../internals/create-property */ "./node_modules/core-js/internals/create-property.js"); // `Object.getOwnPropertyDescriptors` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptors


$({
  target: 'Object',
  stat: true,
  sham: !DESCRIPTORS
}, {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
    var O = toIndexedObject(object);
    var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
    var keys = ownKeys(O);
    var result = {};
    var index = 0;
    var key, descriptor;

    while (keys.length > index) {
      descriptor = getOwnPropertyDescriptor(O, key = keys[index++]);
      if (descriptor !== undefined) createProperty(result, key, descriptor);
    }

    return result;
  }
});

/***/ }),

/***/ "./node_modules/core-js/modules/es.string.trim.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es.string.trim.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");

var $trim = __webpack_require__(/*! ../internals/string-trim */ "./node_modules/core-js/internals/string-trim.js").trim;

var forcedStringTrimMethod = __webpack_require__(/*! ../internals/string-trim-forced */ "./node_modules/core-js/internals/string-trim-forced.js"); // `String.prototype.trim` method
// https://tc39.es/ecma262/#sec-string.prototype.trim


$({
  target: 'String',
  proto: true,
  forced: forcedStringTrimMethod('trim')
}, {
  trim: function trim() {
    return $trim(this);
  }
});

/***/ }),

/***/ "./node_modules/hammerjs/hammer.js":
/*!*****************************************!*\
  !*** ./node_modules/hammerjs/hammer.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_RESULT__;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*! Hammer.JS - v2.0.7 - 2016-04-22
 * http://hammerjs.github.io/
 *
 * Copyright (c) 2016 Jorik Tangelder;
 * Licensed under the MIT license */
(function (window, document, exportName, undefined) {
  'use strict';

  var VENDOR_PREFIXES = ['', 'webkit', 'Moz', 'MS', 'ms', 'o'];
  var TEST_ELEMENT = document.createElement('div');
  var TYPE_FUNCTION = 'function';
  var round = Math.round;
  var abs = Math.abs;
  var now = Date.now;
  /**
   * set a timeout with a given scope
   * @param {Function} fn
   * @param {Number} timeout
   * @param {Object} context
   * @returns {number}
   */

  function setTimeoutContext(fn, timeout, context) {
    return setTimeout(bindFn(fn, context), timeout);
  }
  /**
   * if the argument is an array, we want to execute the fn on each entry
   * if it aint an array we don't want to do a thing.
   * this is used by all the methods that accept a single and array argument.
   * @param {*|Array} arg
   * @param {String} fn
   * @param {Object} [context]
   * @returns {Boolean}
   */


  function invokeArrayArg(arg, fn, context) {
    if (Array.isArray(arg)) {
      each(arg, context[fn], context);
      return true;
    }

    return false;
  }
  /**
   * walk objects and arrays
   * @param {Object} obj
   * @param {Function} iterator
   * @param {Object} context
   */


  function each(obj, iterator, context) {
    var i;

    if (!obj) {
      return;
    }

    if (obj.forEach) {
      obj.forEach(iterator, context);
    } else if (obj.length !== undefined) {
      i = 0;

      while (i < obj.length) {
        iterator.call(context, obj[i], i, obj);
        i++;
      }
    } else {
      for (i in obj) {
        obj.hasOwnProperty(i) && iterator.call(context, obj[i], i, obj);
      }
    }
  }
  /**
   * wrap a method with a deprecation warning and stack trace
   * @param {Function} method
   * @param {String} name
   * @param {String} message
   * @returns {Function} A new function wrapping the supplied method.
   */


  function deprecate(method, name, message) {
    var deprecationMessage = 'DEPRECATED METHOD: ' + name + '\n' + message + ' AT \n';
    return function () {
      var e = new Error('get-stack-trace');
      var stack = e && e.stack ? e.stack.replace(/^[^\(]+?[\n$]/gm, '').replace(/^\s+at\s+/gm, '').replace(/^Object.<anonymous>\s*\(/gm, '{anonymous}()@') : 'Unknown Stack Trace';
      var log = window.console && (window.console.warn || window.console.log);

      if (log) {
        log.call(window.console, deprecationMessage, stack);
      }

      return method.apply(this, arguments);
    };
  }
  /**
   * extend object.
   * means that properties in dest will be overwritten by the ones in src.
   * @param {Object} target
   * @param {...Object} objects_to_assign
   * @returns {Object} target
   */


  var assign;

  if (typeof Object.assign !== 'function') {
    assign = function assign(target) {
      if (target === undefined || target === null) {
        throw new TypeError('Cannot convert undefined or null to object');
      }

      var output = Object(target);

      for (var index = 1; index < arguments.length; index++) {
        var source = arguments[index];

        if (source !== undefined && source !== null) {
          for (var nextKey in source) {
            if (source.hasOwnProperty(nextKey)) {
              output[nextKey] = source[nextKey];
            }
          }
        }
      }

      return output;
    };
  } else {
    assign = Object.assign;
  }
  /**
   * extend object.
   * means that properties in dest will be overwritten by the ones in src.
   * @param {Object} dest
   * @param {Object} src
   * @param {Boolean} [merge=false]
   * @returns {Object} dest
   */


  var extend = deprecate(function extend(dest, src, merge) {
    var keys = Object.keys(src);
    var i = 0;

    while (i < keys.length) {
      if (!merge || merge && dest[keys[i]] === undefined) {
        dest[keys[i]] = src[keys[i]];
      }

      i++;
    }

    return dest;
  }, 'extend', 'Use `assign`.');
  /**
   * merge the values from src in the dest.
   * means that properties that exist in dest will not be overwritten by src
   * @param {Object} dest
   * @param {Object} src
   * @returns {Object} dest
   */

  var merge = deprecate(function merge(dest, src) {
    return extend(dest, src, true);
  }, 'merge', 'Use `assign`.');
  /**
   * simple class inheritance
   * @param {Function} child
   * @param {Function} base
   * @param {Object} [properties]
   */

  function inherit(child, base, properties) {
    var baseP = base.prototype,
        childP;
    childP = child.prototype = Object.create(baseP);
    childP.constructor = child;
    childP._super = baseP;

    if (properties) {
      assign(childP, properties);
    }
  }
  /**
   * simple function bind
   * @param {Function} fn
   * @param {Object} context
   * @returns {Function}
   */


  function bindFn(fn, context) {
    return function boundFn() {
      return fn.apply(context, arguments);
    };
  }
  /**
   * let a boolean value also be a function that must return a boolean
   * this first item in args will be used as the context
   * @param {Boolean|Function} val
   * @param {Array} [args]
   * @returns {Boolean}
   */


  function boolOrFn(val, args) {
    if (_typeof(val) == TYPE_FUNCTION) {
      return val.apply(args ? args[0] || undefined : undefined, args);
    }

    return val;
  }
  /**
   * use the val2 when val1 is undefined
   * @param {*} val1
   * @param {*} val2
   * @returns {*}
   */


  function ifUndefined(val1, val2) {
    return val1 === undefined ? val2 : val1;
  }
  /**
   * addEventListener with multiple events at once
   * @param {EventTarget} target
   * @param {String} types
   * @param {Function} handler
   */


  function addEventListeners(target, types, handler) {
    each(splitStr(types), function (type) {
      target.addEventListener(type, handler, false);
    });
  }
  /**
   * removeEventListener with multiple events at once
   * @param {EventTarget} target
   * @param {String} types
   * @param {Function} handler
   */


  function removeEventListeners(target, types, handler) {
    each(splitStr(types), function (type) {
      target.removeEventListener(type, handler, false);
    });
  }
  /**
   * find if a node is in the given parent
   * @method hasParent
   * @param {HTMLElement} node
   * @param {HTMLElement} parent
   * @return {Boolean} found
   */


  function hasParent(node, parent) {
    while (node) {
      if (node == parent) {
        return true;
      }

      node = node.parentNode;
    }

    return false;
  }
  /**
   * small indexOf wrapper
   * @param {String} str
   * @param {String} find
   * @returns {Boolean} found
   */


  function inStr(str, find) {
    return str.indexOf(find) > -1;
  }
  /**
   * split string on whitespace
   * @param {String} str
   * @returns {Array} words
   */


  function splitStr(str) {
    return str.trim().split(/\s+/g);
  }
  /**
   * find if a array contains the object using indexOf or a simple polyFill
   * @param {Array} src
   * @param {String} find
   * @param {String} [findByKey]
   * @return {Boolean|Number} false when not found, or the index
   */


  function inArray(src, find, findByKey) {
    if (src.indexOf && !findByKey) {
      return src.indexOf(find);
    } else {
      var i = 0;

      while (i < src.length) {
        if (findByKey && src[i][findByKey] == find || !findByKey && src[i] === find) {
          return i;
        }

        i++;
      }

      return -1;
    }
  }
  /**
   * convert array-like objects to real arrays
   * @param {Object} obj
   * @returns {Array}
   */


  function toArray(obj) {
    return Array.prototype.slice.call(obj, 0);
  }
  /**
   * unique array with objects based on a key (like 'id') or just by the array's value
   * @param {Array} src [{id:1},{id:2},{id:1}]
   * @param {String} [key]
   * @param {Boolean} [sort=False]
   * @returns {Array} [{id:1},{id:2}]
   */


  function uniqueArray(src, key, sort) {
    var results = [];
    var values = [];
    var i = 0;

    while (i < src.length) {
      var val = key ? src[i][key] : src[i];

      if (inArray(values, val) < 0) {
        results.push(src[i]);
      }

      values[i] = val;
      i++;
    }

    if (sort) {
      if (!key) {
        results = results.sort();
      } else {
        results = results.sort(function sortUniqueArray(a, b) {
          return a[key] > b[key];
        });
      }
    }

    return results;
  }
  /**
   * get the prefixed property
   * @param {Object} obj
   * @param {String} property
   * @returns {String|Undefined} prefixed
   */


  function prefixed(obj, property) {
    var prefix, prop;
    var camelProp = property[0].toUpperCase() + property.slice(1);
    var i = 0;

    while (i < VENDOR_PREFIXES.length) {
      prefix = VENDOR_PREFIXES[i];
      prop = prefix ? prefix + camelProp : property;

      if (prop in obj) {
        return prop;
      }

      i++;
    }

    return undefined;
  }
  /**
   * get a unique id
   * @returns {number} uniqueId
   */


  var _uniqueId = 1;

  function uniqueId() {
    return _uniqueId++;
  }
  /**
   * get the window object of an element
   * @param {HTMLElement} element
   * @returns {DocumentView|Window}
   */


  function getWindowForElement(element) {
    var doc = element.ownerDocument || element;
    return doc.defaultView || doc.parentWindow || window;
  }

  var MOBILE_REGEX = /mobile|tablet|ip(ad|hone|od)|android/i;
  var SUPPORT_TOUCH = ('ontouchstart' in window);
  var SUPPORT_POINTER_EVENTS = prefixed(window, 'PointerEvent') !== undefined;
  var SUPPORT_ONLY_TOUCH = SUPPORT_TOUCH && MOBILE_REGEX.test(navigator.userAgent);
  var INPUT_TYPE_TOUCH = 'touch';
  var INPUT_TYPE_PEN = 'pen';
  var INPUT_TYPE_MOUSE = 'mouse';
  var INPUT_TYPE_KINECT = 'kinect';
  var COMPUTE_INTERVAL = 25;
  var INPUT_START = 1;
  var INPUT_MOVE = 2;
  var INPUT_END = 4;
  var INPUT_CANCEL = 8;
  var DIRECTION_NONE = 1;
  var DIRECTION_LEFT = 2;
  var DIRECTION_RIGHT = 4;
  var DIRECTION_UP = 8;
  var DIRECTION_DOWN = 16;
  var DIRECTION_HORIZONTAL = DIRECTION_LEFT | DIRECTION_RIGHT;
  var DIRECTION_VERTICAL = DIRECTION_UP | DIRECTION_DOWN;
  var DIRECTION_ALL = DIRECTION_HORIZONTAL | DIRECTION_VERTICAL;
  var PROPS_XY = ['x', 'y'];
  var PROPS_CLIENT_XY = ['clientX', 'clientY'];
  /**
   * create new input type manager
   * @param {Manager} manager
   * @param {Function} callback
   * @returns {Input}
   * @constructor
   */

  function Input(manager, callback) {
    var self = this;
    this.manager = manager;
    this.callback = callback;
    this.element = manager.element;
    this.target = manager.options.inputTarget; // smaller wrapper around the handler, for the scope and the enabled state of the manager,
    // so when disabled the input events are completely bypassed.

    this.domHandler = function (ev) {
      if (boolOrFn(manager.options.enable, [manager])) {
        self.handler(ev);
      }
    };

    this.init();
  }

  Input.prototype = {
    /**
     * should handle the inputEvent data and trigger the callback
     * @virtual
     */
    handler: function handler() {},

    /**
     * bind the events
     */
    init: function init() {
      this.evEl && addEventListeners(this.element, this.evEl, this.domHandler);
      this.evTarget && addEventListeners(this.target, this.evTarget, this.domHandler);
      this.evWin && addEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
    },

    /**
     * unbind the events
     */
    destroy: function destroy() {
      this.evEl && removeEventListeners(this.element, this.evEl, this.domHandler);
      this.evTarget && removeEventListeners(this.target, this.evTarget, this.domHandler);
      this.evWin && removeEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
    }
  };
  /**
   * create new input type manager
   * called by the Manager constructor
   * @param {Hammer} manager
   * @returns {Input}
   */

  function createInputInstance(manager) {
    var Type;
    var inputClass = manager.options.inputClass;

    if (inputClass) {
      Type = inputClass;
    } else if (SUPPORT_POINTER_EVENTS) {
      Type = PointerEventInput;
    } else if (SUPPORT_ONLY_TOUCH) {
      Type = TouchInput;
    } else if (!SUPPORT_TOUCH) {
      Type = MouseInput;
    } else {
      Type = TouchMouseInput;
    }

    return new Type(manager, inputHandler);
  }
  /**
   * handle input events
   * @param {Manager} manager
   * @param {String} eventType
   * @param {Object} input
   */


  function inputHandler(manager, eventType, input) {
    var pointersLen = input.pointers.length;
    var changedPointersLen = input.changedPointers.length;
    var isFirst = eventType & INPUT_START && pointersLen - changedPointersLen === 0;
    var isFinal = eventType & (INPUT_END | INPUT_CANCEL) && pointersLen - changedPointersLen === 0;
    input.isFirst = !!isFirst;
    input.isFinal = !!isFinal;

    if (isFirst) {
      manager.session = {};
    } // source event is the normalized value of the domEvents
    // like 'touchstart, mouseup, pointerdown'


    input.eventType = eventType; // compute scale, rotation etc

    computeInputData(manager, input); // emit secret event

    manager.emit('hammer.input', input);
    manager.recognize(input);
    manager.session.prevInput = input;
  }
  /**
   * extend the data with some usable properties like scale, rotate, velocity etc
   * @param {Object} manager
   * @param {Object} input
   */


  function computeInputData(manager, input) {
    var session = manager.session;
    var pointers = input.pointers;
    var pointersLength = pointers.length; // store the first input to calculate the distance and direction

    if (!session.firstInput) {
      session.firstInput = simpleCloneInputData(input);
    } // to compute scale and rotation we need to store the multiple touches


    if (pointersLength > 1 && !session.firstMultiple) {
      session.firstMultiple = simpleCloneInputData(input);
    } else if (pointersLength === 1) {
      session.firstMultiple = false;
    }

    var firstInput = session.firstInput;
    var firstMultiple = session.firstMultiple;
    var offsetCenter = firstMultiple ? firstMultiple.center : firstInput.center;
    var center = input.center = getCenter(pointers);
    input.timeStamp = now();
    input.deltaTime = input.timeStamp - firstInput.timeStamp;
    input.angle = getAngle(offsetCenter, center);
    input.distance = getDistance(offsetCenter, center);
    computeDeltaXY(session, input);
    input.offsetDirection = getDirection(input.deltaX, input.deltaY);
    var overallVelocity = getVelocity(input.deltaTime, input.deltaX, input.deltaY);
    input.overallVelocityX = overallVelocity.x;
    input.overallVelocityY = overallVelocity.y;
    input.overallVelocity = abs(overallVelocity.x) > abs(overallVelocity.y) ? overallVelocity.x : overallVelocity.y;
    input.scale = firstMultiple ? getScale(firstMultiple.pointers, pointers) : 1;
    input.rotation = firstMultiple ? getRotation(firstMultiple.pointers, pointers) : 0;
    input.maxPointers = !session.prevInput ? input.pointers.length : input.pointers.length > session.prevInput.maxPointers ? input.pointers.length : session.prevInput.maxPointers;
    computeIntervalInputData(session, input); // find the correct target

    var target = manager.element;

    if (hasParent(input.srcEvent.target, target)) {
      target = input.srcEvent.target;
    }

    input.target = target;
  }

  function computeDeltaXY(session, input) {
    var center = input.center;
    var offset = session.offsetDelta || {};
    var prevDelta = session.prevDelta || {};
    var prevInput = session.prevInput || {};

    if (input.eventType === INPUT_START || prevInput.eventType === INPUT_END) {
      prevDelta = session.prevDelta = {
        x: prevInput.deltaX || 0,
        y: prevInput.deltaY || 0
      };
      offset = session.offsetDelta = {
        x: center.x,
        y: center.y
      };
    }

    input.deltaX = prevDelta.x + (center.x - offset.x);
    input.deltaY = prevDelta.y + (center.y - offset.y);
  }
  /**
   * velocity is calculated every x ms
   * @param {Object} session
   * @param {Object} input
   */


  function computeIntervalInputData(session, input) {
    var last = session.lastInterval || input,
        deltaTime = input.timeStamp - last.timeStamp,
        velocity,
        velocityX,
        velocityY,
        direction;

    if (input.eventType != INPUT_CANCEL && (deltaTime > COMPUTE_INTERVAL || last.velocity === undefined)) {
      var deltaX = input.deltaX - last.deltaX;
      var deltaY = input.deltaY - last.deltaY;
      var v = getVelocity(deltaTime, deltaX, deltaY);
      velocityX = v.x;
      velocityY = v.y;
      velocity = abs(v.x) > abs(v.y) ? v.x : v.y;
      direction = getDirection(deltaX, deltaY);
      session.lastInterval = input;
    } else {
      // use latest velocity info if it doesn't overtake a minimum period
      velocity = last.velocity;
      velocityX = last.velocityX;
      velocityY = last.velocityY;
      direction = last.direction;
    }

    input.velocity = velocity;
    input.velocityX = velocityX;
    input.velocityY = velocityY;
    input.direction = direction;
  }
  /**
   * create a simple clone from the input used for storage of firstInput and firstMultiple
   * @param {Object} input
   * @returns {Object} clonedInputData
   */


  function simpleCloneInputData(input) {
    // make a simple copy of the pointers because we will get a reference if we don't
    // we only need clientXY for the calculations
    var pointers = [];
    var i = 0;

    while (i < input.pointers.length) {
      pointers[i] = {
        clientX: round(input.pointers[i].clientX),
        clientY: round(input.pointers[i].clientY)
      };
      i++;
    }

    return {
      timeStamp: now(),
      pointers: pointers,
      center: getCenter(pointers),
      deltaX: input.deltaX,
      deltaY: input.deltaY
    };
  }
  /**
   * get the center of all the pointers
   * @param {Array} pointers
   * @return {Object} center contains `x` and `y` properties
   */


  function getCenter(pointers) {
    var pointersLength = pointers.length; // no need to loop when only one touch

    if (pointersLength === 1) {
      return {
        x: round(pointers[0].clientX),
        y: round(pointers[0].clientY)
      };
    }

    var x = 0,
        y = 0,
        i = 0;

    while (i < pointersLength) {
      x += pointers[i].clientX;
      y += pointers[i].clientY;
      i++;
    }

    return {
      x: round(x / pointersLength),
      y: round(y / pointersLength)
    };
  }
  /**
   * calculate the velocity between two points. unit is in px per ms.
   * @param {Number} deltaTime
   * @param {Number} x
   * @param {Number} y
   * @return {Object} velocity `x` and `y`
   */


  function getVelocity(deltaTime, x, y) {
    return {
      x: x / deltaTime || 0,
      y: y / deltaTime || 0
    };
  }
  /**
   * get the direction between two points
   * @param {Number} x
   * @param {Number} y
   * @return {Number} direction
   */


  function getDirection(x, y) {
    if (x === y) {
      return DIRECTION_NONE;
    }

    if (abs(x) >= abs(y)) {
      return x < 0 ? DIRECTION_LEFT : DIRECTION_RIGHT;
    }

    return y < 0 ? DIRECTION_UP : DIRECTION_DOWN;
  }
  /**
   * calculate the absolute distance between two points
   * @param {Object} p1 {x, y}
   * @param {Object} p2 {x, y}
   * @param {Array} [props] containing x and y keys
   * @return {Number} distance
   */


  function getDistance(p1, p2, props) {
    if (!props) {
      props = PROPS_XY;
    }

    var x = p2[props[0]] - p1[props[0]],
        y = p2[props[1]] - p1[props[1]];
    return Math.sqrt(x * x + y * y);
  }
  /**
   * calculate the angle between two coordinates
   * @param {Object} p1
   * @param {Object} p2
   * @param {Array} [props] containing x and y keys
   * @return {Number} angle
   */


  function getAngle(p1, p2, props) {
    if (!props) {
      props = PROPS_XY;
    }

    var x = p2[props[0]] - p1[props[0]],
        y = p2[props[1]] - p1[props[1]];
    return Math.atan2(y, x) * 180 / Math.PI;
  }
  /**
   * calculate the rotation degrees between two pointersets
   * @param {Array} start array of pointers
   * @param {Array} end array of pointers
   * @return {Number} rotation
   */


  function getRotation(start, end) {
    return getAngle(end[1], end[0], PROPS_CLIENT_XY) + getAngle(start[1], start[0], PROPS_CLIENT_XY);
  }
  /**
   * calculate the scale factor between two pointersets
   * no scale is 1, and goes down to 0 when pinched together, and bigger when pinched out
   * @param {Array} start array of pointers
   * @param {Array} end array of pointers
   * @return {Number} scale
   */


  function getScale(start, end) {
    return getDistance(end[0], end[1], PROPS_CLIENT_XY) / getDistance(start[0], start[1], PROPS_CLIENT_XY);
  }

  var MOUSE_INPUT_MAP = {
    mousedown: INPUT_START,
    mousemove: INPUT_MOVE,
    mouseup: INPUT_END
  };
  var MOUSE_ELEMENT_EVENTS = 'mousedown';
  var MOUSE_WINDOW_EVENTS = 'mousemove mouseup';
  /**
   * Mouse events input
   * @constructor
   * @extends Input
   */

  function MouseInput() {
    this.evEl = MOUSE_ELEMENT_EVENTS;
    this.evWin = MOUSE_WINDOW_EVENTS;
    this.pressed = false; // mousedown state

    Input.apply(this, arguments);
  }

  inherit(MouseInput, Input, {
    /**
     * handle mouse events
     * @param {Object} ev
     */
    handler: function MEhandler(ev) {
      var eventType = MOUSE_INPUT_MAP[ev.type]; // on start we want to have the left mouse button down

      if (eventType & INPUT_START && ev.button === 0) {
        this.pressed = true;
      }

      if (eventType & INPUT_MOVE && ev.which !== 1) {
        eventType = INPUT_END;
      } // mouse must be down


      if (!this.pressed) {
        return;
      }

      if (eventType & INPUT_END) {
        this.pressed = false;
      }

      this.callback(this.manager, eventType, {
        pointers: [ev],
        changedPointers: [ev],
        pointerType: INPUT_TYPE_MOUSE,
        srcEvent: ev
      });
    }
  });
  var POINTER_INPUT_MAP = {
    pointerdown: INPUT_START,
    pointermove: INPUT_MOVE,
    pointerup: INPUT_END,
    pointercancel: INPUT_CANCEL,
    pointerout: INPUT_CANCEL
  }; // in IE10 the pointer types is defined as an enum

  var IE10_POINTER_TYPE_ENUM = {
    2: INPUT_TYPE_TOUCH,
    3: INPUT_TYPE_PEN,
    4: INPUT_TYPE_MOUSE,
    5: INPUT_TYPE_KINECT // see https://twitter.com/jacobrossi/status/480596438489890816

  };
  var POINTER_ELEMENT_EVENTS = 'pointerdown';
  var POINTER_WINDOW_EVENTS = 'pointermove pointerup pointercancel'; // IE10 has prefixed support, and case-sensitive

  if (window.MSPointerEvent && !window.PointerEvent) {
    POINTER_ELEMENT_EVENTS = 'MSPointerDown';
    POINTER_WINDOW_EVENTS = 'MSPointerMove MSPointerUp MSPointerCancel';
  }
  /**
   * Pointer events input
   * @constructor
   * @extends Input
   */


  function PointerEventInput() {
    this.evEl = POINTER_ELEMENT_EVENTS;
    this.evWin = POINTER_WINDOW_EVENTS;
    Input.apply(this, arguments);
    this.store = this.manager.session.pointerEvents = [];
  }

  inherit(PointerEventInput, Input, {
    /**
     * handle mouse events
     * @param {Object} ev
     */
    handler: function PEhandler(ev) {
      var store = this.store;
      var removePointer = false;
      var eventTypeNormalized = ev.type.toLowerCase().replace('ms', '');
      var eventType = POINTER_INPUT_MAP[eventTypeNormalized];
      var pointerType = IE10_POINTER_TYPE_ENUM[ev.pointerType] || ev.pointerType;
      var isTouch = pointerType == INPUT_TYPE_TOUCH; // get index of the event in the store

      var storeIndex = inArray(store, ev.pointerId, 'pointerId'); // start and mouse must be down

      if (eventType & INPUT_START && (ev.button === 0 || isTouch)) {
        if (storeIndex < 0) {
          store.push(ev);
          storeIndex = store.length - 1;
        }
      } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
        removePointer = true;
      } // it not found, so the pointer hasn't been down (so it's probably a hover)


      if (storeIndex < 0) {
        return;
      } // update the event in the store


      store[storeIndex] = ev;
      this.callback(this.manager, eventType, {
        pointers: store,
        changedPointers: [ev],
        pointerType: pointerType,
        srcEvent: ev
      });

      if (removePointer) {
        // remove from the store
        store.splice(storeIndex, 1);
      }
    }
  });
  var SINGLE_TOUCH_INPUT_MAP = {
    touchstart: INPUT_START,
    touchmove: INPUT_MOVE,
    touchend: INPUT_END,
    touchcancel: INPUT_CANCEL
  };
  var SINGLE_TOUCH_TARGET_EVENTS = 'touchstart';
  var SINGLE_TOUCH_WINDOW_EVENTS = 'touchstart touchmove touchend touchcancel';
  /**
   * Touch events input
   * @constructor
   * @extends Input
   */

  function SingleTouchInput() {
    this.evTarget = SINGLE_TOUCH_TARGET_EVENTS;
    this.evWin = SINGLE_TOUCH_WINDOW_EVENTS;
    this.started = false;
    Input.apply(this, arguments);
  }

  inherit(SingleTouchInput, Input, {
    handler: function TEhandler(ev) {
      var type = SINGLE_TOUCH_INPUT_MAP[ev.type]; // should we handle the touch events?

      if (type === INPUT_START) {
        this.started = true;
      }

      if (!this.started) {
        return;
      }

      var touches = normalizeSingleTouches.call(this, ev, type); // when done, reset the started state

      if (type & (INPUT_END | INPUT_CANCEL) && touches[0].length - touches[1].length === 0) {
        this.started = false;
      }

      this.callback(this.manager, type, {
        pointers: touches[0],
        changedPointers: touches[1],
        pointerType: INPUT_TYPE_TOUCH,
        srcEvent: ev
      });
    }
  });
  /**
   * @this {TouchInput}
   * @param {Object} ev
   * @param {Number} type flag
   * @returns {undefined|Array} [all, changed]
   */

  function normalizeSingleTouches(ev, type) {
    var all = toArray(ev.touches);
    var changed = toArray(ev.changedTouches);

    if (type & (INPUT_END | INPUT_CANCEL)) {
      all = uniqueArray(all.concat(changed), 'identifier', true);
    }

    return [all, changed];
  }

  var TOUCH_INPUT_MAP = {
    touchstart: INPUT_START,
    touchmove: INPUT_MOVE,
    touchend: INPUT_END,
    touchcancel: INPUT_CANCEL
  };
  var TOUCH_TARGET_EVENTS = 'touchstart touchmove touchend touchcancel';
  /**
   * Multi-user touch events input
   * @constructor
   * @extends Input
   */

  function TouchInput() {
    this.evTarget = TOUCH_TARGET_EVENTS;
    this.targetIds = {};
    Input.apply(this, arguments);
  }

  inherit(TouchInput, Input, {
    handler: function MTEhandler(ev) {
      var type = TOUCH_INPUT_MAP[ev.type];
      var touches = getTouches.call(this, ev, type);

      if (!touches) {
        return;
      }

      this.callback(this.manager, type, {
        pointers: touches[0],
        changedPointers: touches[1],
        pointerType: INPUT_TYPE_TOUCH,
        srcEvent: ev
      });
    }
  });
  /**
   * @this {TouchInput}
   * @param {Object} ev
   * @param {Number} type flag
   * @returns {undefined|Array} [all, changed]
   */

  function getTouches(ev, type) {
    var allTouches = toArray(ev.touches);
    var targetIds = this.targetIds; // when there is only one touch, the process can be simplified

    if (type & (INPUT_START | INPUT_MOVE) && allTouches.length === 1) {
      targetIds[allTouches[0].identifier] = true;
      return [allTouches, allTouches];
    }

    var i,
        targetTouches,
        changedTouches = toArray(ev.changedTouches),
        changedTargetTouches = [],
        target = this.target; // get target touches from touches

    targetTouches = allTouches.filter(function (touch) {
      return hasParent(touch.target, target);
    }); // collect touches

    if (type === INPUT_START) {
      i = 0;

      while (i < targetTouches.length) {
        targetIds[targetTouches[i].identifier] = true;
        i++;
      }
    } // filter changed touches to only contain touches that exist in the collected target ids


    i = 0;

    while (i < changedTouches.length) {
      if (targetIds[changedTouches[i].identifier]) {
        changedTargetTouches.push(changedTouches[i]);
      } // cleanup removed touches


      if (type & (INPUT_END | INPUT_CANCEL)) {
        delete targetIds[changedTouches[i].identifier];
      }

      i++;
    }

    if (!changedTargetTouches.length) {
      return;
    }

    return [// merge targetTouches with changedTargetTouches so it contains ALL touches, including 'end' and 'cancel'
    uniqueArray(targetTouches.concat(changedTargetTouches), 'identifier', true), changedTargetTouches];
  }
  /**
   * Combined touch and mouse input
   *
   * Touch has a higher priority then mouse, and while touching no mouse events are allowed.
   * This because touch devices also emit mouse events while doing a touch.
   *
   * @constructor
   * @extends Input
   */


  var DEDUP_TIMEOUT = 2500;
  var DEDUP_DISTANCE = 25;

  function TouchMouseInput() {
    Input.apply(this, arguments);
    var handler = bindFn(this.handler, this);
    this.touch = new TouchInput(this.manager, handler);
    this.mouse = new MouseInput(this.manager, handler);
    this.primaryTouch = null;
    this.lastTouches = [];
  }

  inherit(TouchMouseInput, Input, {
    /**
     * handle mouse and touch events
     * @param {Hammer} manager
     * @param {String} inputEvent
     * @param {Object} inputData
     */
    handler: function TMEhandler(manager, inputEvent, inputData) {
      var isTouch = inputData.pointerType == INPUT_TYPE_TOUCH,
          isMouse = inputData.pointerType == INPUT_TYPE_MOUSE;

      if (isMouse && inputData.sourceCapabilities && inputData.sourceCapabilities.firesTouchEvents) {
        return;
      } // when we're in a touch event, record touches to  de-dupe synthetic mouse event


      if (isTouch) {
        recordTouches.call(this, inputEvent, inputData);
      } else if (isMouse && isSyntheticEvent.call(this, inputData)) {
        return;
      }

      this.callback(manager, inputEvent, inputData);
    },

    /**
     * remove the event listeners
     */
    destroy: function destroy() {
      this.touch.destroy();
      this.mouse.destroy();
    }
  });

  function recordTouches(eventType, eventData) {
    if (eventType & INPUT_START) {
      this.primaryTouch = eventData.changedPointers[0].identifier;
      setLastTouch.call(this, eventData);
    } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
      setLastTouch.call(this, eventData);
    }
  }

  function setLastTouch(eventData) {
    var touch = eventData.changedPointers[0];

    if (touch.identifier === this.primaryTouch) {
      var lastTouch = {
        x: touch.clientX,
        y: touch.clientY
      };
      this.lastTouches.push(lastTouch);
      var lts = this.lastTouches;

      var removeLastTouch = function removeLastTouch() {
        var i = lts.indexOf(lastTouch);

        if (i > -1) {
          lts.splice(i, 1);
        }
      };

      setTimeout(removeLastTouch, DEDUP_TIMEOUT);
    }
  }

  function isSyntheticEvent(eventData) {
    var x = eventData.srcEvent.clientX,
        y = eventData.srcEvent.clientY;

    for (var i = 0; i < this.lastTouches.length; i++) {
      var t = this.lastTouches[i];
      var dx = Math.abs(x - t.x),
          dy = Math.abs(y - t.y);

      if (dx <= DEDUP_DISTANCE && dy <= DEDUP_DISTANCE) {
        return true;
      }
    }

    return false;
  }

  var PREFIXED_TOUCH_ACTION = prefixed(TEST_ELEMENT.style, 'touchAction');
  var NATIVE_TOUCH_ACTION = PREFIXED_TOUCH_ACTION !== undefined; // magical touchAction value

  var TOUCH_ACTION_COMPUTE = 'compute';
  var TOUCH_ACTION_AUTO = 'auto';
  var TOUCH_ACTION_MANIPULATION = 'manipulation'; // not implemented

  var TOUCH_ACTION_NONE = 'none';
  var TOUCH_ACTION_PAN_X = 'pan-x';
  var TOUCH_ACTION_PAN_Y = 'pan-y';
  var TOUCH_ACTION_MAP = getTouchActionProps();
  /**
   * Touch Action
   * sets the touchAction property or uses the js alternative
   * @param {Manager} manager
   * @param {String} value
   * @constructor
   */

  function TouchAction(manager, value) {
    this.manager = manager;
    this.set(value);
  }

  TouchAction.prototype = {
    /**
     * set the touchAction value on the element or enable the polyfill
     * @param {String} value
     */
    set: function set(value) {
      // find out the touch-action by the event handlers
      if (value == TOUCH_ACTION_COMPUTE) {
        value = this.compute();
      }

      if (NATIVE_TOUCH_ACTION && this.manager.element.style && TOUCH_ACTION_MAP[value]) {
        this.manager.element.style[PREFIXED_TOUCH_ACTION] = value;
      }

      this.actions = value.toLowerCase().trim();
    },

    /**
     * just re-set the touchAction value
     */
    update: function update() {
      this.set(this.manager.options.touchAction);
    },

    /**
     * compute the value for the touchAction property based on the recognizer's settings
     * @returns {String} value
     */
    compute: function compute() {
      var actions = [];
      each(this.manager.recognizers, function (recognizer) {
        if (boolOrFn(recognizer.options.enable, [recognizer])) {
          actions = actions.concat(recognizer.getTouchAction());
        }
      });
      return cleanTouchActions(actions.join(' '));
    },

    /**
     * this method is called on each input cycle and provides the preventing of the browser behavior
     * @param {Object} input
     */
    preventDefaults: function preventDefaults(input) {
      var srcEvent = input.srcEvent;
      var direction = input.offsetDirection; // if the touch action did prevented once this session

      if (this.manager.session.prevented) {
        srcEvent.preventDefault();
        return;
      }

      var actions = this.actions;
      var hasNone = inStr(actions, TOUCH_ACTION_NONE) && !TOUCH_ACTION_MAP[TOUCH_ACTION_NONE];
      var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y) && !TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_Y];
      var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X) && !TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_X];

      if (hasNone) {
        //do not prevent defaults if this is a tap gesture
        var isTapPointer = input.pointers.length === 1;
        var isTapMovement = input.distance < 2;
        var isTapTouchTime = input.deltaTime < 250;

        if (isTapPointer && isTapMovement && isTapTouchTime) {
          return;
        }
      }

      if (hasPanX && hasPanY) {
        // `pan-x pan-y` means browser handles all scrolling/panning, do not prevent
        return;
      }

      if (hasNone || hasPanY && direction & DIRECTION_HORIZONTAL || hasPanX && direction & DIRECTION_VERTICAL) {
        return this.preventSrc(srcEvent);
      }
    },

    /**
     * call preventDefault to prevent the browser's default behavior (scrolling in most cases)
     * @param {Object} srcEvent
     */
    preventSrc: function preventSrc(srcEvent) {
      this.manager.session.prevented = true;
      srcEvent.preventDefault();
    }
  };
  /**
   * when the touchActions are collected they are not a valid value, so we need to clean things up. *
   * @param {String} actions
   * @returns {*}
   */

  function cleanTouchActions(actions) {
    // none
    if (inStr(actions, TOUCH_ACTION_NONE)) {
      return TOUCH_ACTION_NONE;
    }

    var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X);
    var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y); // if both pan-x and pan-y are set (different recognizers
    // for different directions, e.g. horizontal pan but vertical swipe?)
    // we need none (as otherwise with pan-x pan-y combined none of these
    // recognizers will work, since the browser would handle all panning

    if (hasPanX && hasPanY) {
      return TOUCH_ACTION_NONE;
    } // pan-x OR pan-y


    if (hasPanX || hasPanY) {
      return hasPanX ? TOUCH_ACTION_PAN_X : TOUCH_ACTION_PAN_Y;
    } // manipulation


    if (inStr(actions, TOUCH_ACTION_MANIPULATION)) {
      return TOUCH_ACTION_MANIPULATION;
    }

    return TOUCH_ACTION_AUTO;
  }

  function getTouchActionProps() {
    if (!NATIVE_TOUCH_ACTION) {
      return false;
    }

    var touchMap = {};
    var cssSupports = window.CSS && window.CSS.supports;
    ['auto', 'manipulation', 'pan-y', 'pan-x', 'pan-x pan-y', 'none'].forEach(function (val) {
      // If css.supports is not supported but there is native touch-action assume it supports
      // all values. This is the case for IE 10 and 11.
      touchMap[val] = cssSupports ? window.CSS.supports('touch-action', val) : true;
    });
    return touchMap;
  }
  /**
   * Recognizer flow explained; *
   * All recognizers have the initial state of POSSIBLE when a input session starts.
   * The definition of a input session is from the first input until the last input, with all it's movement in it. *
   * Example session for mouse-input: mousedown -> mousemove -> mouseup
   *
   * On each recognizing cycle (see Manager.recognize) the .recognize() method is executed
   * which determines with state it should be.
   *
   * If the recognizer has the state FAILED, CANCELLED or RECOGNIZED (equals ENDED), it is reset to
   * POSSIBLE to give it another change on the next cycle.
   *
   *               Possible
   *                  |
   *            +-----+---------------+
   *            |                     |
   *      +-----+-----+               |
   *      |           |               |
   *   Failed      Cancelled          |
   *                          +-------+------+
   *                          |              |
   *                      Recognized       Began
   *                                         |
   *                                      Changed
   *                                         |
   *                                  Ended/Recognized
   */


  var STATE_POSSIBLE = 1;
  var STATE_BEGAN = 2;
  var STATE_CHANGED = 4;
  var STATE_ENDED = 8;
  var STATE_RECOGNIZED = STATE_ENDED;
  var STATE_CANCELLED = 16;
  var STATE_FAILED = 32;
  /**
   * Recognizer
   * Every recognizer needs to extend from this class.
   * @constructor
   * @param {Object} options
   */

  function Recognizer(options) {
    this.options = assign({}, this.defaults, options || {});
    this.id = uniqueId();
    this.manager = null; // default is enable true

    this.options.enable = ifUndefined(this.options.enable, true);
    this.state = STATE_POSSIBLE;
    this.simultaneous = {};
    this.requireFail = [];
  }

  Recognizer.prototype = {
    /**
     * @virtual
     * @type {Object}
     */
    defaults: {},

    /**
     * set options
     * @param {Object} options
     * @return {Recognizer}
     */
    set: function set(options) {
      assign(this.options, options); // also update the touchAction, in case something changed about the directions/enabled state

      this.manager && this.manager.touchAction.update();
      return this;
    },

    /**
     * recognize simultaneous with an other recognizer.
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */
    recognizeWith: function recognizeWith(otherRecognizer) {
      if (invokeArrayArg(otherRecognizer, 'recognizeWith', this)) {
        return this;
      }

      var simultaneous = this.simultaneous;
      otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);

      if (!simultaneous[otherRecognizer.id]) {
        simultaneous[otherRecognizer.id] = otherRecognizer;
        otherRecognizer.recognizeWith(this);
      }

      return this;
    },

    /**
     * drop the simultaneous link. it doesnt remove the link on the other recognizer.
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */
    dropRecognizeWith: function dropRecognizeWith(otherRecognizer) {
      if (invokeArrayArg(otherRecognizer, 'dropRecognizeWith', this)) {
        return this;
      }

      otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
      delete this.simultaneous[otherRecognizer.id];
      return this;
    },

    /**
     * recognizer can only run when an other is failing
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */
    requireFailure: function requireFailure(otherRecognizer) {
      if (invokeArrayArg(otherRecognizer, 'requireFailure', this)) {
        return this;
      }

      var requireFail = this.requireFail;
      otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);

      if (inArray(requireFail, otherRecognizer) === -1) {
        requireFail.push(otherRecognizer);
        otherRecognizer.requireFailure(this);
      }

      return this;
    },

    /**
     * drop the requireFailure link. it does not remove the link on the other recognizer.
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */
    dropRequireFailure: function dropRequireFailure(otherRecognizer) {
      if (invokeArrayArg(otherRecognizer, 'dropRequireFailure', this)) {
        return this;
      }

      otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
      var index = inArray(this.requireFail, otherRecognizer);

      if (index > -1) {
        this.requireFail.splice(index, 1);
      }

      return this;
    },

    /**
     * has require failures boolean
     * @returns {boolean}
     */
    hasRequireFailures: function hasRequireFailures() {
      return this.requireFail.length > 0;
    },

    /**
     * if the recognizer can recognize simultaneous with an other recognizer
     * @param {Recognizer} otherRecognizer
     * @returns {Boolean}
     */
    canRecognizeWith: function canRecognizeWith(otherRecognizer) {
      return !!this.simultaneous[otherRecognizer.id];
    },

    /**
     * You should use `tryEmit` instead of `emit` directly to check
     * that all the needed recognizers has failed before emitting.
     * @param {Object} input
     */
    emit: function emit(input) {
      var self = this;
      var state = this.state;

      function emit(event) {
        self.manager.emit(event, input);
      } // 'panstart' and 'panmove'


      if (state < STATE_ENDED) {
        emit(self.options.event + stateStr(state));
      }

      emit(self.options.event); // simple 'eventName' events

      if (input.additionalEvent) {
        // additional event(panleft, panright, pinchin, pinchout...)
        emit(input.additionalEvent);
      } // panend and pancancel


      if (state >= STATE_ENDED) {
        emit(self.options.event + stateStr(state));
      }
    },

    /**
     * Check that all the require failure recognizers has failed,
     * if true, it emits a gesture event,
     * otherwise, setup the state to FAILED.
     * @param {Object} input
     */
    tryEmit: function tryEmit(input) {
      if (this.canEmit()) {
        return this.emit(input);
      } // it's failing anyway


      this.state = STATE_FAILED;
    },

    /**
     * can we emit?
     * @returns {boolean}
     */
    canEmit: function canEmit() {
      var i = 0;

      while (i < this.requireFail.length) {
        if (!(this.requireFail[i].state & (STATE_FAILED | STATE_POSSIBLE))) {
          return false;
        }

        i++;
      }

      return true;
    },

    /**
     * update the recognizer
     * @param {Object} inputData
     */
    recognize: function recognize(inputData) {
      // make a new copy of the inputData
      // so we can change the inputData without messing up the other recognizers
      var inputDataClone = assign({}, inputData); // is is enabled and allow recognizing?

      if (!boolOrFn(this.options.enable, [this, inputDataClone])) {
        this.reset();
        this.state = STATE_FAILED;
        return;
      } // reset when we've reached the end


      if (this.state & (STATE_RECOGNIZED | STATE_CANCELLED | STATE_FAILED)) {
        this.state = STATE_POSSIBLE;
      }

      this.state = this.process(inputDataClone); // the recognizer has recognized a gesture
      // so trigger an event

      if (this.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED | STATE_CANCELLED)) {
        this.tryEmit(inputDataClone);
      }
    },

    /**
     * return the state of the recognizer
     * the actual recognizing happens in this method
     * @virtual
     * @param {Object} inputData
     * @returns {Const} STATE
     */
    process: function process(inputData) {},
    // jshint ignore:line

    /**
     * return the preferred touch-action
     * @virtual
     * @returns {Array}
     */
    getTouchAction: function getTouchAction() {},

    /**
     * called when the gesture isn't allowed to recognize
     * like when another is being recognized or it is disabled
     * @virtual
     */
    reset: function reset() {}
  };
  /**
   * get a usable string, used as event postfix
   * @param {Const} state
   * @returns {String} state
   */

  function stateStr(state) {
    if (state & STATE_CANCELLED) {
      return 'cancel';
    } else if (state & STATE_ENDED) {
      return 'end';
    } else if (state & STATE_CHANGED) {
      return 'move';
    } else if (state & STATE_BEGAN) {
      return 'start';
    }

    return '';
  }
  /**
   * direction cons to string
   * @param {Const} direction
   * @returns {String}
   */


  function directionStr(direction) {
    if (direction == DIRECTION_DOWN) {
      return 'down';
    } else if (direction == DIRECTION_UP) {
      return 'up';
    } else if (direction == DIRECTION_LEFT) {
      return 'left';
    } else if (direction == DIRECTION_RIGHT) {
      return 'right';
    }

    return '';
  }
  /**
   * get a recognizer by name if it is bound to a manager
   * @param {Recognizer|String} otherRecognizer
   * @param {Recognizer} recognizer
   * @returns {Recognizer}
   */


  function getRecognizerByNameIfManager(otherRecognizer, recognizer) {
    var manager = recognizer.manager;

    if (manager) {
      return manager.get(otherRecognizer);
    }

    return otherRecognizer;
  }
  /**
   * This recognizer is just used as a base for the simple attribute recognizers.
   * @constructor
   * @extends Recognizer
   */


  function AttrRecognizer() {
    Recognizer.apply(this, arguments);
  }

  inherit(AttrRecognizer, Recognizer, {
    /**
     * @namespace
     * @memberof AttrRecognizer
     */
    defaults: {
      /**
       * @type {Number}
       * @default 1
       */
      pointers: 1
    },

    /**
     * Used to check if it the recognizer receives valid input, like input.distance > 10.
     * @memberof AttrRecognizer
     * @param {Object} input
     * @returns {Boolean} recognized
     */
    attrTest: function attrTest(input) {
      var optionPointers = this.options.pointers;
      return optionPointers === 0 || input.pointers.length === optionPointers;
    },

    /**
     * Process the input and return the state for the recognizer
     * @memberof AttrRecognizer
     * @param {Object} input
     * @returns {*} State
     */
    process: function process(input) {
      var state = this.state;
      var eventType = input.eventType;
      var isRecognized = state & (STATE_BEGAN | STATE_CHANGED);
      var isValid = this.attrTest(input); // on cancel input and we've recognized before, return STATE_CANCELLED

      if (isRecognized && (eventType & INPUT_CANCEL || !isValid)) {
        return state | STATE_CANCELLED;
      } else if (isRecognized || isValid) {
        if (eventType & INPUT_END) {
          return state | STATE_ENDED;
        } else if (!(state & STATE_BEGAN)) {
          return STATE_BEGAN;
        }

        return state | STATE_CHANGED;
      }

      return STATE_FAILED;
    }
  });
  /**
   * Pan
   * Recognized when the pointer is down and moved in the allowed direction.
   * @constructor
   * @extends AttrRecognizer
   */

  function PanRecognizer() {
    AttrRecognizer.apply(this, arguments);
    this.pX = null;
    this.pY = null;
  }

  inherit(PanRecognizer, AttrRecognizer, {
    /**
     * @namespace
     * @memberof PanRecognizer
     */
    defaults: {
      event: 'pan',
      threshold: 10,
      pointers: 1,
      direction: DIRECTION_ALL
    },
    getTouchAction: function getTouchAction() {
      var direction = this.options.direction;
      var actions = [];

      if (direction & DIRECTION_HORIZONTAL) {
        actions.push(TOUCH_ACTION_PAN_Y);
      }

      if (direction & DIRECTION_VERTICAL) {
        actions.push(TOUCH_ACTION_PAN_X);
      }

      return actions;
    },
    directionTest: function directionTest(input) {
      var options = this.options;
      var hasMoved = true;
      var distance = input.distance;
      var direction = input.direction;
      var x = input.deltaX;
      var y = input.deltaY; // lock to axis?

      if (!(direction & options.direction)) {
        if (options.direction & DIRECTION_HORIZONTAL) {
          direction = x === 0 ? DIRECTION_NONE : x < 0 ? DIRECTION_LEFT : DIRECTION_RIGHT;
          hasMoved = x != this.pX;
          distance = Math.abs(input.deltaX);
        } else {
          direction = y === 0 ? DIRECTION_NONE : y < 0 ? DIRECTION_UP : DIRECTION_DOWN;
          hasMoved = y != this.pY;
          distance = Math.abs(input.deltaY);
        }
      }

      input.direction = direction;
      return hasMoved && distance > options.threshold && direction & options.direction;
    },
    attrTest: function attrTest(input) {
      return AttrRecognizer.prototype.attrTest.call(this, input) && (this.state & STATE_BEGAN || !(this.state & STATE_BEGAN) && this.directionTest(input));
    },
    emit: function emit(input) {
      this.pX = input.deltaX;
      this.pY = input.deltaY;
      var direction = directionStr(input.direction);

      if (direction) {
        input.additionalEvent = this.options.event + direction;
      }

      this._super.emit.call(this, input);
    }
  });
  /**
   * Pinch
   * Recognized when two or more pointers are moving toward (zoom-in) or away from each other (zoom-out).
   * @constructor
   * @extends AttrRecognizer
   */

  function PinchRecognizer() {
    AttrRecognizer.apply(this, arguments);
  }

  inherit(PinchRecognizer, AttrRecognizer, {
    /**
     * @namespace
     * @memberof PinchRecognizer
     */
    defaults: {
      event: 'pinch',
      threshold: 0,
      pointers: 2
    },
    getTouchAction: function getTouchAction() {
      return [TOUCH_ACTION_NONE];
    },
    attrTest: function attrTest(input) {
      return this._super.attrTest.call(this, input) && (Math.abs(input.scale - 1) > this.options.threshold || this.state & STATE_BEGAN);
    },
    emit: function emit(input) {
      if (input.scale !== 1) {
        var inOut = input.scale < 1 ? 'in' : 'out';
        input.additionalEvent = this.options.event + inOut;
      }

      this._super.emit.call(this, input);
    }
  });
  /**
   * Press
   * Recognized when the pointer is down for x ms without any movement.
   * @constructor
   * @extends Recognizer
   */

  function PressRecognizer() {
    Recognizer.apply(this, arguments);
    this._timer = null;
    this._input = null;
  }

  inherit(PressRecognizer, Recognizer, {
    /**
     * @namespace
     * @memberof PressRecognizer
     */
    defaults: {
      event: 'press',
      pointers: 1,
      time: 251,
      // minimal time of the pointer to be pressed
      threshold: 9 // a minimal movement is ok, but keep it low

    },
    getTouchAction: function getTouchAction() {
      return [TOUCH_ACTION_AUTO];
    },
    process: function process(input) {
      var options = this.options;
      var validPointers = input.pointers.length === options.pointers;
      var validMovement = input.distance < options.threshold;
      var validTime = input.deltaTime > options.time;
      this._input = input; // we only allow little movement
      // and we've reached an end event, so a tap is possible

      if (!validMovement || !validPointers || input.eventType & (INPUT_END | INPUT_CANCEL) && !validTime) {
        this.reset();
      } else if (input.eventType & INPUT_START) {
        this.reset();
        this._timer = setTimeoutContext(function () {
          this.state = STATE_RECOGNIZED;
          this.tryEmit();
        }, options.time, this);
      } else if (input.eventType & INPUT_END) {
        return STATE_RECOGNIZED;
      }

      return STATE_FAILED;
    },
    reset: function reset() {
      clearTimeout(this._timer);
    },
    emit: function emit(input) {
      if (this.state !== STATE_RECOGNIZED) {
        return;
      }

      if (input && input.eventType & INPUT_END) {
        this.manager.emit(this.options.event + 'up', input);
      } else {
        this._input.timeStamp = now();
        this.manager.emit(this.options.event, this._input);
      }
    }
  });
  /**
   * Rotate
   * Recognized when two or more pointer are moving in a circular motion.
   * @constructor
   * @extends AttrRecognizer
   */

  function RotateRecognizer() {
    AttrRecognizer.apply(this, arguments);
  }

  inherit(RotateRecognizer, AttrRecognizer, {
    /**
     * @namespace
     * @memberof RotateRecognizer
     */
    defaults: {
      event: 'rotate',
      threshold: 0,
      pointers: 2
    },
    getTouchAction: function getTouchAction() {
      return [TOUCH_ACTION_NONE];
    },
    attrTest: function attrTest(input) {
      return this._super.attrTest.call(this, input) && (Math.abs(input.rotation) > this.options.threshold || this.state & STATE_BEGAN);
    }
  });
  /**
   * Swipe
   * Recognized when the pointer is moving fast (velocity), with enough distance in the allowed direction.
   * @constructor
   * @extends AttrRecognizer
   */

  function SwipeRecognizer() {
    AttrRecognizer.apply(this, arguments);
  }

  inherit(SwipeRecognizer, AttrRecognizer, {
    /**
     * @namespace
     * @memberof SwipeRecognizer
     */
    defaults: {
      event: 'swipe',
      threshold: 10,
      velocity: 0.3,
      direction: DIRECTION_HORIZONTAL | DIRECTION_VERTICAL,
      pointers: 1
    },
    getTouchAction: function getTouchAction() {
      return PanRecognizer.prototype.getTouchAction.call(this);
    },
    attrTest: function attrTest(input) {
      var direction = this.options.direction;
      var velocity;

      if (direction & (DIRECTION_HORIZONTAL | DIRECTION_VERTICAL)) {
        velocity = input.overallVelocity;
      } else if (direction & DIRECTION_HORIZONTAL) {
        velocity = input.overallVelocityX;
      } else if (direction & DIRECTION_VERTICAL) {
        velocity = input.overallVelocityY;
      }

      return this._super.attrTest.call(this, input) && direction & input.offsetDirection && input.distance > this.options.threshold && input.maxPointers == this.options.pointers && abs(velocity) > this.options.velocity && input.eventType & INPUT_END;
    },
    emit: function emit(input) {
      var direction = directionStr(input.offsetDirection);

      if (direction) {
        this.manager.emit(this.options.event + direction, input);
      }

      this.manager.emit(this.options.event, input);
    }
  });
  /**
   * A tap is ecognized when the pointer is doing a small tap/click. Multiple taps are recognized if they occur
   * between the given interval and position. The delay option can be used to recognize multi-taps without firing
   * a single tap.
   *
   * The eventData from the emitted event contains the property `tapCount`, which contains the amount of
   * multi-taps being recognized.
   * @constructor
   * @extends Recognizer
   */

  function TapRecognizer() {
    Recognizer.apply(this, arguments); // previous time and center,
    // used for tap counting

    this.pTime = false;
    this.pCenter = false;
    this._timer = null;
    this._input = null;
    this.count = 0;
  }

  inherit(TapRecognizer, Recognizer, {
    /**
     * @namespace
     * @memberof PinchRecognizer
     */
    defaults: {
      event: 'tap',
      pointers: 1,
      taps: 1,
      interval: 300,
      // max time between the multi-tap taps
      time: 250,
      // max time of the pointer to be down (like finger on the screen)
      threshold: 9,
      // a minimal movement is ok, but keep it low
      posThreshold: 10 // a multi-tap can be a bit off the initial position

    },
    getTouchAction: function getTouchAction() {
      return [TOUCH_ACTION_MANIPULATION];
    },
    process: function process(input) {
      var options = this.options;
      var validPointers = input.pointers.length === options.pointers;
      var validMovement = input.distance < options.threshold;
      var validTouchTime = input.deltaTime < options.time;
      this.reset();

      if (input.eventType & INPUT_START && this.count === 0) {
        return this.failTimeout();
      } // we only allow little movement
      // and we've reached an end event, so a tap is possible


      if (validMovement && validTouchTime && validPointers) {
        if (input.eventType != INPUT_END) {
          return this.failTimeout();
        }

        var validInterval = this.pTime ? input.timeStamp - this.pTime < options.interval : true;
        var validMultiTap = !this.pCenter || getDistance(this.pCenter, input.center) < options.posThreshold;
        this.pTime = input.timeStamp;
        this.pCenter = input.center;

        if (!validMultiTap || !validInterval) {
          this.count = 1;
        } else {
          this.count += 1;
        }

        this._input = input; // if tap count matches we have recognized it,
        // else it has began recognizing...

        var tapCount = this.count % options.taps;

        if (tapCount === 0) {
          // no failing requirements, immediately trigger the tap event
          // or wait as long as the multitap interval to trigger
          if (!this.hasRequireFailures()) {
            return STATE_RECOGNIZED;
          } else {
            this._timer = setTimeoutContext(function () {
              this.state = STATE_RECOGNIZED;
              this.tryEmit();
            }, options.interval, this);
            return STATE_BEGAN;
          }
        }
      }

      return STATE_FAILED;
    },
    failTimeout: function failTimeout() {
      this._timer = setTimeoutContext(function () {
        this.state = STATE_FAILED;
      }, this.options.interval, this);
      return STATE_FAILED;
    },
    reset: function reset() {
      clearTimeout(this._timer);
    },
    emit: function emit() {
      if (this.state == STATE_RECOGNIZED) {
        this._input.tapCount = this.count;
        this.manager.emit(this.options.event, this._input);
      }
    }
  });
  /**
   * Simple way to create a manager with a default set of recognizers.
   * @param {HTMLElement} element
   * @param {Object} [options]
   * @constructor
   */

  function Hammer(element, options) {
    options = options || {};
    options.recognizers = ifUndefined(options.recognizers, Hammer.defaults.preset);
    return new Manager(element, options);
  }
  /**
   * @const {string}
   */


  Hammer.VERSION = '2.0.7';
  /**
   * default settings
   * @namespace
   */

  Hammer.defaults = {
    /**
     * set if DOM events are being triggered.
     * But this is slower and unused by simple implementations, so disabled by default.
     * @type {Boolean}
     * @default false
     */
    domEvents: false,

    /**
     * The value for the touchAction property/fallback.
     * When set to `compute` it will magically set the correct value based on the added recognizers.
     * @type {String}
     * @default compute
     */
    touchAction: TOUCH_ACTION_COMPUTE,

    /**
     * @type {Boolean}
     * @default true
     */
    enable: true,

    /**
     * EXPERIMENTAL FEATURE -- can be removed/changed
     * Change the parent input target element.
     * If Null, then it is being set the to main element.
     * @type {Null|EventTarget}
     * @default null
     */
    inputTarget: null,

    /**
     * force an input class
     * @type {Null|Function}
     * @default null
     */
    inputClass: null,

    /**
     * Default recognizer setup when calling `Hammer()`
     * When creating a new Manager these will be skipped.
     * @type {Array}
     */
    preset: [// RecognizerClass, options, [recognizeWith, ...], [requireFailure, ...]
    [RotateRecognizer, {
      enable: false
    }], [PinchRecognizer, {
      enable: false
    }, ['rotate']], [SwipeRecognizer, {
      direction: DIRECTION_HORIZONTAL
    }], [PanRecognizer, {
      direction: DIRECTION_HORIZONTAL
    }, ['swipe']], [TapRecognizer], [TapRecognizer, {
      event: 'doubletap',
      taps: 2
    }, ['tap']], [PressRecognizer]],

    /**
     * Some CSS properties can be used to improve the working of Hammer.
     * Add them to this method and they will be set when creating a new Manager.
     * @namespace
     */
    cssProps: {
      /**
       * Disables text selection to improve the dragging gesture. Mainly for desktop browsers.
       * @type {String}
       * @default 'none'
       */
      userSelect: 'none',

      /**
       * Disable the Windows Phone grippers when pressing an element.
       * @type {String}
       * @default 'none'
       */
      touchSelect: 'none',

      /**
       * Disables the default callout shown when you touch and hold a touch target.
       * On iOS, when you touch and hold a touch target such as a link, Safari displays
       * a callout containing information about the link. This property allows you to disable that callout.
       * @type {String}
       * @default 'none'
       */
      touchCallout: 'none',

      /**
       * Specifies whether zooming is enabled. Used by IE10>
       * @type {String}
       * @default 'none'
       */
      contentZooming: 'none',

      /**
       * Specifies that an entire element should be draggable instead of its contents. Mainly for desktop browsers.
       * @type {String}
       * @default 'none'
       */
      userDrag: 'none',

      /**
       * Overrides the highlight color shown when the user taps a link or a JavaScript
       * clickable element in iOS. This property obeys the alpha value, if specified.
       * @type {String}
       * @default 'rgba(0,0,0,0)'
       */
      tapHighlightColor: 'rgba(0,0,0,0)'
    }
  };
  var STOP = 1;
  var FORCED_STOP = 2;
  /**
   * Manager
   * @param {HTMLElement} element
   * @param {Object} [options]
   * @constructor
   */

  function Manager(element, options) {
    this.options = assign({}, Hammer.defaults, options || {});
    this.options.inputTarget = this.options.inputTarget || element;
    this.handlers = {};
    this.session = {};
    this.recognizers = [];
    this.oldCssProps = {};
    this.element = element;
    this.input = createInputInstance(this);
    this.touchAction = new TouchAction(this, this.options.touchAction);
    toggleCssProps(this, true);
    each(this.options.recognizers, function (item) {
      var recognizer = this.add(new item[0](item[1]));
      item[2] && recognizer.recognizeWith(item[2]);
      item[3] && recognizer.requireFailure(item[3]);
    }, this);
  }

  Manager.prototype = {
    /**
     * set options
     * @param {Object} options
     * @returns {Manager}
     */
    set: function set(options) {
      assign(this.options, options); // Options that need a little more setup

      if (options.touchAction) {
        this.touchAction.update();
      }

      if (options.inputTarget) {
        // Clean up existing event listeners and reinitialize
        this.input.destroy();
        this.input.target = options.inputTarget;
        this.input.init();
      }

      return this;
    },

    /**
     * stop recognizing for this session.
     * This session will be discarded, when a new [input]start event is fired.
     * When forced, the recognizer cycle is stopped immediately.
     * @param {Boolean} [force]
     */
    stop: function stop(force) {
      this.session.stopped = force ? FORCED_STOP : STOP;
    },

    /**
     * run the recognizers!
     * called by the inputHandler function on every movement of the pointers (touches)
     * it walks through all the recognizers and tries to detect the gesture that is being made
     * @param {Object} inputData
     */
    recognize: function recognize(inputData) {
      var session = this.session;

      if (session.stopped) {
        return;
      } // run the touch-action polyfill


      this.touchAction.preventDefaults(inputData);
      var recognizer;
      var recognizers = this.recognizers; // this holds the recognizer that is being recognized.
      // so the recognizer's state needs to be BEGAN, CHANGED, ENDED or RECOGNIZED
      // if no recognizer is detecting a thing, it is set to `null`

      var curRecognizer = session.curRecognizer; // reset when the last recognizer is recognized
      // or when we're in a new session

      if (!curRecognizer || curRecognizer && curRecognizer.state & STATE_RECOGNIZED) {
        curRecognizer = session.curRecognizer = null;
      }

      var i = 0;

      while (i < recognizers.length) {
        recognizer = recognizers[i]; // find out if we are allowed try to recognize the input for this one.
        // 1.   allow if the session is NOT forced stopped (see the .stop() method)
        // 2.   allow if we still haven't recognized a gesture in this session, or the this recognizer is the one
        //      that is being recognized.
        // 3.   allow if the recognizer is allowed to run simultaneous with the current recognized recognizer.
        //      this can be setup with the `recognizeWith()` method on the recognizer.

        if (session.stopped !== FORCED_STOP && ( // 1
        !curRecognizer || recognizer == curRecognizer || // 2
        recognizer.canRecognizeWith(curRecognizer))) {
          // 3
          recognizer.recognize(inputData);
        } else {
          recognizer.reset();
        } // if the recognizer has been recognizing the input as a valid gesture, we want to store this one as the
        // current active recognizer. but only if we don't already have an active recognizer


        if (!curRecognizer && recognizer.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED)) {
          curRecognizer = session.curRecognizer = recognizer;
        }

        i++;
      }
    },

    /**
     * get a recognizer by its event name.
     * @param {Recognizer|String} recognizer
     * @returns {Recognizer|Null}
     */
    get: function get(recognizer) {
      if (recognizer instanceof Recognizer) {
        return recognizer;
      }

      var recognizers = this.recognizers;

      for (var i = 0; i < recognizers.length; i++) {
        if (recognizers[i].options.event == recognizer) {
          return recognizers[i];
        }
      }

      return null;
    },

    /**
     * add a recognizer to the manager
     * existing recognizers with the same event name will be removed
     * @param {Recognizer} recognizer
     * @returns {Recognizer|Manager}
     */
    add: function add(recognizer) {
      if (invokeArrayArg(recognizer, 'add', this)) {
        return this;
      } // remove existing


      var existing = this.get(recognizer.options.event);

      if (existing) {
        this.remove(existing);
      }

      this.recognizers.push(recognizer);
      recognizer.manager = this;
      this.touchAction.update();
      return recognizer;
    },

    /**
     * remove a recognizer by name or instance
     * @param {Recognizer|String} recognizer
     * @returns {Manager}
     */
    remove: function remove(recognizer) {
      if (invokeArrayArg(recognizer, 'remove', this)) {
        return this;
      }

      recognizer = this.get(recognizer); // let's make sure this recognizer exists

      if (recognizer) {
        var recognizers = this.recognizers;
        var index = inArray(recognizers, recognizer);

        if (index !== -1) {
          recognizers.splice(index, 1);
          this.touchAction.update();
        }
      }

      return this;
    },

    /**
     * bind event
     * @param {String} events
     * @param {Function} handler
     * @returns {EventEmitter} this
     */
    on: function on(events, handler) {
      if (events === undefined) {
        return;
      }

      if (handler === undefined) {
        return;
      }

      var handlers = this.handlers;
      each(splitStr(events), function (event) {
        handlers[event] = handlers[event] || [];
        handlers[event].push(handler);
      });
      return this;
    },

    /**
     * unbind event, leave emit blank to remove all handlers
     * @param {String} events
     * @param {Function} [handler]
     * @returns {EventEmitter} this
     */
    off: function off(events, handler) {
      if (events === undefined) {
        return;
      }

      var handlers = this.handlers;
      each(splitStr(events), function (event) {
        if (!handler) {
          delete handlers[event];
        } else {
          handlers[event] && handlers[event].splice(inArray(handlers[event], handler), 1);
        }
      });
      return this;
    },

    /**
     * emit event to the listeners
     * @param {String} event
     * @param {Object} data
     */
    emit: function emit(event, data) {
      // we also want to trigger dom events
      if (this.options.domEvents) {
        triggerDomEvent(event, data);
      } // no handlers, so skip it all


      var handlers = this.handlers[event] && this.handlers[event].slice();

      if (!handlers || !handlers.length) {
        return;
      }

      data.type = event;

      data.preventDefault = function () {
        data.srcEvent.preventDefault();
      };

      var i = 0;

      while (i < handlers.length) {
        handlers[i](data);
        i++;
      }
    },

    /**
     * destroy the manager and unbinds all events
     * it doesn't unbind dom events, that is the user own responsibility
     */
    destroy: function destroy() {
      this.element && toggleCssProps(this, false);
      this.handlers = {};
      this.session = {};
      this.input.destroy();
      this.element = null;
    }
  };
  /**
   * add/remove the css properties as defined in manager.options.cssProps
   * @param {Manager} manager
   * @param {Boolean} add
   */

  function toggleCssProps(manager, add) {
    var element = manager.element;

    if (!element.style) {
      return;
    }

    var prop;
    each(manager.options.cssProps, function (value, name) {
      prop = prefixed(element.style, name);

      if (add) {
        manager.oldCssProps[prop] = element.style[prop];
        element.style[prop] = value;
      } else {
        element.style[prop] = manager.oldCssProps[prop] || '';
      }
    });

    if (!add) {
      manager.oldCssProps = {};
    }
  }
  /**
   * trigger dom event
   * @param {String} event
   * @param {Object} data
   */


  function triggerDomEvent(event, data) {
    var gestureEvent = document.createEvent('Event');
    gestureEvent.initEvent(event, true, true);
    gestureEvent.gesture = data;
    data.target.dispatchEvent(gestureEvent);
  }

  assign(Hammer, {
    INPUT_START: INPUT_START,
    INPUT_MOVE: INPUT_MOVE,
    INPUT_END: INPUT_END,
    INPUT_CANCEL: INPUT_CANCEL,
    STATE_POSSIBLE: STATE_POSSIBLE,
    STATE_BEGAN: STATE_BEGAN,
    STATE_CHANGED: STATE_CHANGED,
    STATE_ENDED: STATE_ENDED,
    STATE_RECOGNIZED: STATE_RECOGNIZED,
    STATE_CANCELLED: STATE_CANCELLED,
    STATE_FAILED: STATE_FAILED,
    DIRECTION_NONE: DIRECTION_NONE,
    DIRECTION_LEFT: DIRECTION_LEFT,
    DIRECTION_RIGHT: DIRECTION_RIGHT,
    DIRECTION_UP: DIRECTION_UP,
    DIRECTION_DOWN: DIRECTION_DOWN,
    DIRECTION_HORIZONTAL: DIRECTION_HORIZONTAL,
    DIRECTION_VERTICAL: DIRECTION_VERTICAL,
    DIRECTION_ALL: DIRECTION_ALL,
    Manager: Manager,
    Input: Input,
    TouchAction: TouchAction,
    TouchInput: TouchInput,
    MouseInput: MouseInput,
    PointerEventInput: PointerEventInput,
    TouchMouseInput: TouchMouseInput,
    SingleTouchInput: SingleTouchInput,
    Recognizer: Recognizer,
    AttrRecognizer: AttrRecognizer,
    Tap: TapRecognizer,
    Pan: PanRecognizer,
    Swipe: SwipeRecognizer,
    Pinch: PinchRecognizer,
    Rotate: RotateRecognizer,
    Press: PressRecognizer,
    on: addEventListeners,
    off: removeEventListeners,
    each: each,
    merge: merge,
    extend: extend,
    assign: assign,
    inherit: inherit,
    bindFn: bindFn,
    prefixed: prefixed
  }); // this prevents errors when Hammer is loaded in the presence of an AMD
  //  style loader but by script tag, not by the loader.

  var freeGlobal = typeof window !== 'undefined' ? window : typeof self !== 'undefined' ? self : {}; // jshint ignore:line

  freeGlobal.Hammer = Hammer;

  if (true) {
    !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
      return Hammer;
    }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(window, document, 'Hammer');

/***/ })

}]);
//# sourceMappingURL=vendors~files-modal.js.map?v=636aaf37728fa5ff13f5