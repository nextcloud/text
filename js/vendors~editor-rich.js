(window["textWebpackJsonp"] = window["textWebpackJsonp"] || []).push([["vendors~editor-rich"],{

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

/***/ "./node_modules/@nextcloud/vue/dist/Components/ActionButton.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@nextcloud/vue/dist/Components/ActionButton.js ***!
  \*********************************************************************/
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

    function e(o) {
      if (n[o]) return n[o].exports;
      var i = n[o] = {
        i: o,
        l: !1,
        exports: {}
      };
      return t[o].call(i.exports, i, i.exports, e), i.l = !0, i.exports;
    }

    return e.m = t, e.c = n, e.d = function (t, n, o) {
      e.o(t, n) || Object.defineProperty(t, n, {
        enumerable: !0,
        get: o
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
      var o = Object.create(null);
      if (e.r(o), Object.defineProperty(o, "default", {
        enumerable: !0,
        value: t
      }), 2 & n && "string" != typeof t) for (var i in t) {
        e.d(o, i, function (n) {
          return t[n];
        }.bind(null, i));
      }
      return o;
    }, e.n = function (t) {
      var n = t && t.__esModule ? function () {
        return t.default;
      } : function () {
        return t;
      };
      return e.d(n, "a", n), n;
    }, e.o = function (t, n) {
      return Object.prototype.hasOwnProperty.call(t, n);
    }, e.p = "/dist/", e(e.s = 110);
  }({
    0: function _(t, n, e) {
      "use strict";

      function o(t, n) {
        return function (t) {
          if (Array.isArray(t)) return t;
        }(t) || function (t, n) {
          if ("undefined" == typeof Symbol || !(Symbol.iterator in Object(t))) return;
          var e = [],
              o = !0,
              i = !1,
              r = void 0;

          try {
            for (var a, s = t[Symbol.iterator](); !(o = (a = s.next()).done) && (e.push(a.value), !n || e.length !== n); o = !0) {
              ;
            }
          } catch (t) {
            i = !0, r = t;
          } finally {
            try {
              o || null == s.return || s.return();
            } finally {
              if (i) throw r;
            }
          }

          return e;
        }(t, n) || function (t, n) {
          if (!t) return;
          if ("string" == typeof t) return i(t, n);
          var e = Object.prototype.toString.call(t).slice(8, -1);
          "Object" === e && t.constructor && (e = t.constructor.name);
          if ("Map" === e || "Set" === e) return Array.from(t);
          if ("Arguments" === e || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)) return i(t, n);
        }(t, n) || function () {
          throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        }();
      }

      function i(t, n) {
        (null == n || n > t.length) && (n = t.length);

        for (var e = 0, o = new Array(n); e < n; e++) {
          o[e] = t[e];
        }

        return o;
      }

      t.exports = function (t) {
        var n = o(t, 4),
            e = n[1],
            i = n[3];

        if ("function" == typeof btoa) {
          var r = btoa(unescape(encodeURIComponent(JSON.stringify(i)))),
              a = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(r),
              s = "/*# ".concat(a, " */"),
              c = i.sources.map(function (t) {
            return "/*# sourceURL=".concat(i.sourceRoot || "").concat(t, " */");
          });
          return [e].concat(c).concat([s]).join("\n");
        }

        return [e].join("\n");
      };
    },
    1: function _(t, n, e) {
      "use strict";

      t.exports = function (t) {
        var n = [];
        return n.toString = function () {
          return this.map(function (n) {
            var e = t(n);
            return n[2] ? "@media ".concat(n[2], " {").concat(e, "}") : e;
          }).join("");
        }, n.i = function (t, e, o) {
          "string" == typeof t && (t = [[null, t, ""]]);
          var i = {};
          if (o) for (var r = 0; r < this.length; r++) {
            var a = this[r][0];
            null != a && (i[a] = !0);
          }

          for (var s = 0; s < t.length; s++) {
            var c = [].concat(t[s]);
            o && i[c[0]] || (e && (c[2] ? c[2] = "".concat(e, " and ").concat(c[2]) : c[2] = e), n.push(c));
          }
        }, n;
      };
    },
    102: function _(t, n, e) {
      "use strict";

      var o = {
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
          i = e(2),
          r = e.n(i),
          a = e(94),
          s = {
        insert: "head",
        singleton: !1
      },
          c = (r()(a.a, s), a.a.locals, e(3)),
          l = e(95),
          u = e.n(l),
          d = Object(c.a)(o, function () {
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
      "function" == typeof u.a && u()(d);
      n.a = d.exports;
    },
    110: function _(t, n, e) {
      "use strict";

      e.r(n);
      var o = e(102);
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

      n.default = o.a;
    },
    14: function _(t, n) {
      t.exports = __webpack_require__(/*! core-js/modules/es.function.name.js */ "./node_modules/core-js/modules/es.function.name.js");
    },
    16: function _(t, n) {
      t.exports = __webpack_require__(/*! core-js/modules/es.string.iterator.js */ "./node_modules/core-js/modules/es.string.iterator.js");
    },
    17: function _(t, n) {
      t.exports = __webpack_require__(/*! core-js/modules/es.array.iterator.js */ "./node_modules/core-js/modules/es.array.iterator.js");
    },
    18: function _(t, n) {
      t.exports = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");
    },
    2: function _(t, n, e) {
      "use strict";

      var o,
          i = function i() {
        return void 0 === o && (o = Boolean(window && document && document.all && !window.atob)), o;
      },
          r = function () {
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

      function s(t) {
        for (var n = -1, e = 0; e < a.length; e++) {
          if (a[e].identifier === t) {
            n = e;
            break;
          }
        }

        return n;
      }

      function c(t, n) {
        for (var e = {}, o = [], i = 0; i < t.length; i++) {
          var r = t[i],
              c = n.base ? r[0] + n.base : r[0],
              l = e[c] || 0,
              u = "".concat(c, " ").concat(l);
          e[c] = l + 1;
          var d = s(u),
              p = {
            css: r[1],
            media: r[2],
            sourceMap: r[3]
          };
          -1 !== d ? (a[d].references++, a[d].updater(p)) : a.push({
            identifier: u,
            updater: A(p, n),
            references: 1
          }), o.push(u);
        }

        return o;
      }

      function l(t) {
        var n = document.createElement("style"),
            o = t.attributes || {};

        if (void 0 === o.nonce) {
          var i = e.nc;
          i && (o.nonce = i);
        }

        if (Object.keys(o).forEach(function (t) {
          n.setAttribute(t, o[t]);
        }), "function" == typeof t.insert) t.insert(n);else {
          var a = r(t.insert || "head");
          if (!a) throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
          a.appendChild(n);
        }
        return n;
      }

      var u,
          d = (u = [], function (t, n) {
        return u[t] = n, u.filter(Boolean).join("\n");
      });

      function p(t, n, e, o) {
        var i = e ? "" : o.media ? "@media ".concat(o.media, " {").concat(o.css, "}") : o.css;
        if (t.styleSheet) t.styleSheet.cssText = d(n, i);else {
          var r = document.createTextNode(i),
              a = t.childNodes;
          a[n] && t.removeChild(a[n]), a.length ? t.insertBefore(r, a[n]) : t.appendChild(r);
        }
      }

      function f(t, n, e) {
        var o = e.css,
            i = e.media,
            r = e.sourceMap;
        if (i ? t.setAttribute("media", i) : t.removeAttribute("media"), r && "undefined" != typeof btoa && (o += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(r)))), " */")), t.styleSheet) t.styleSheet.cssText = o;else {
          for (; t.firstChild;) {
            t.removeChild(t.firstChild);
          }

          t.appendChild(document.createTextNode(o));
        }
      }

      var h = null,
          b = 0;

      function A(t, n) {
        var e, o, i;

        if (n.singleton) {
          var r = b++;
          e = h || (h = l(n)), o = p.bind(null, e, r, !1), i = p.bind(null, e, r, !0);
        } else e = l(n), o = f.bind(null, e, n), i = function i() {
          !function (t) {
            if (null === t.parentNode) return !1;
            t.parentNode.removeChild(t);
          }(e);
        };

        return o(t), function (n) {
          if (n) {
            if (n.css === t.css && n.media === t.media && n.sourceMap === t.sourceMap) return;
            o(t = n);
          } else i();
        };
      }

      t.exports = function (t, n) {
        (n = n || {}).singleton || "boolean" == typeof n.singleton || (n.singleton = i());
        var e = c(t = t || [], n);
        return function (t) {
          if (t = t || [], "[object Array]" === Object.prototype.toString.call(t)) {
            for (var o = 0; o < e.length; o++) {
              var i = s(e[o]);
              a[i].references--;
            }

            for (var r = c(t, n), l = 0; l < e.length; l++) {
              var u = s(e[l]);
              0 === a[u].references && (a[u].updater(), a.splice(u, 1));
            }

            e = r;
          }
        };
      };
    },
    3: function _(t, n, e) {
      "use strict";

      function o(t, n, e, o, i, r, a, s) {
        var c,
            l = "function" == typeof t ? t.options : t;
        if (n && (l.render = n, l.staticRenderFns = e, l._compiled = !0), o && (l.functional = !0), r && (l._scopeId = "data-v-" + r), a ? (c = function c(t) {
          (t = t || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) || "undefined" == typeof __VUE_SSR_CONTEXT__ || (t = __VUE_SSR_CONTEXT__), i && i.call(this, t), t && t._registeredComponents && t._registeredComponents.add(a);
        }, l._ssrRegister = c) : i && (c = s ? function () {
          i.call(this, (l.functional ? this.parent : this).$root.$options.shadowRoot);
        } : i), c) if (l.functional) {
          l._injectStyles = c;
          var u = l.render;

          l.render = function (t, n) {
            return c.call(n), u(t, n);
          };
        } else {
          var d = l.beforeCreate;
          l.beforeCreate = d ? [].concat(d, c) : [c];
        }
        return {
          exports: t,
          options: l
        };
      }

      e.d(n, "a", function () {
        return o;
      });
    },
    30: function _(t, n) {
      t.exports = __webpack_require__(/*! core-js/modules/es.string.trim.js */ "./node_modules/core-js/modules/es.string.trim.js");
    },
    39: function _(t, n, e) {
      "use strict";

      e(30), e(14);
      var o = e(5),
          i = e.n(o);
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
          this.$slots.default && "" !== this.text.trim() || (i.a.util.warn("".concat(this.$options.name, " cannot be empty and requires a meaningful text content"), this), this.$destroy(), this.$el.remove());
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
    },
    40: function _(t, n) {
      t.exports = __webpack_require__(/*! core-js/modules/web.url.js */ "./node_modules/core-js/modules/web.url.js");
    },
    49: function _(t, n, e) {
      "use strict";

      e(40), e(6), e(16), e(17), e(18);
      var o = e(39),
          i = (e(14), function (t, n) {
        for (var e = t.$parent; e;) {
          if (e.$options.name === n) return e;
          e = e.$parent;
        }
      });
      n.a = {
        mixins: [o.a],
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
              var n = i(this, "Actions");
              n && n.closeMenu && n.closeMenu();
            }
          }
        }
      };
    },
    5: function _(t, n) {
      t.exports = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm.js");
    },
    6: function _(t, n) {
      t.exports = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
    },
    94: function _(t, n, e) {
      "use strict";

      var o = e(0),
          i = e.n(o),
          r = e(1),
          a = e.n(r)()(i.a);
      a.push([t.i, "li.active[data-v-42b28436]{background-color:var(--color-background-hover)}.action--disabled[data-v-42b28436]{pointer-events:none;opacity:.5}.action--disabled[data-v-42b28436]:hover,.action--disabled[data-v-42b28436]:focus{cursor:default;opacity:.5}.action--disabled *[data-v-42b28436]{opacity:1 !important}.action-button[data-v-42b28436]{display:flex;align-items:flex-start;width:100%;height:auto;margin:0;padding:0;padding-right:14px;cursor:pointer;white-space:nowrap;opacity:.7;color:var(--color-main-text);border:0;border-radius:0;background-color:transparent;box-shadow:none;font-weight:normal;font-size:var(--default-font-size);line-height:44px}.action-button[data-v-42b28436]:hover,.action-button[data-v-42b28436]:focus{opacity:1}.action-button>span[data-v-42b28436]{cursor:pointer;white-space:nowrap}.action-button__icon[data-v-42b28436]{width:44px;height:44px;opacity:1;background-position:14px center;background-size:16px;background-repeat:no-repeat}.action-button .material-design-icon[data-v-42b28436]{width:44px;height:44px;opacity:1}.action-button .material-design-icon .material-design-icon__svg[data-v-42b28436]{vertical-align:middle}.action-button p[data-v-42b28436]{width:220px;padding:7px 0;cursor:pointer;text-align:left;line-height:1.6em;overflow:hidden;text-overflow:ellipsis}.action-button__longtext[data-v-42b28436]{cursor:pointer;white-space:pre-wrap}.action-button__title[data-v-42b28436]{font-weight:bold;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;max-width:100%;display:inline-block}\n", "", {
        version: 3,
        sources: ["webpack://./../../assets/action.scss", "webpack://./../../assets/variables.scss"],
        names: [],
        mappings: "AAwBC,2BAEE,8CAA+C,CAC/C,mCAMD,mBAAoB,CACpB,UCQmB,CDVpB,kFAIE,cAAe,CACf,UCKkB,CDVpB,qCAQE,oBAAqB,CACrB,gCAOD,YAAa,CACb,sBAAuB,CAEvB,UAAW,CACX,WAAY,CACZ,QAAS,CACT,SAAU,CACV,kBCtB8C,CDwB9C,cAAe,CACf,kBAAmB,CAEnB,UCjBiB,CDkBjB,4BAA6B,CAC7B,QAAS,CACT,eAAgB,CAChB,4BAA6B,CAC7B,eAAgB,CAEhB,kBAAmB,CACnB,kCAAmC,CACnC,gBC5CmB,CDsBpB,4EA0BE,SC7Ba,CDGf,qCA8BE,cAAe,CACf,kBAAmB,CACnB,sCAGA,UCzDkB,CD0DlB,WC1DkB,CD2DlB,SCxCa,CDyCb,+BAAwC,CACxC,oBCzDa,CD0Db,2BAA4B,CAxC9B,sDA4CE,UClEkB,CDmElB,WCnEkB,CDoElB,SCjDa,CDGf,iFAiDG,qBAAsB,CAjDzB,kCAuDE,WAAY,CACZ,aAA8B,CAE9B,cAAe,CACf,eAAgB,CAEhB,iBAAkB,CAGlB,eAAgB,CAChB,sBAAuB,CACvB,0CAGA,cAAe,CAEf,oBAAqB,CACrB,uCAGA,gBAAiB,CACjB,sBAAuB,CACvB,eAAgB,CAChB,kBAAmB,CACnB,cAAe,CACf,oBAAqB",
        sourcesContent: ["/**\n * @copyright Copyright (c) 2019 John Molakvoæ <skjnldsv@protonmail.com>\n *\n * @author John Molakvoæ <skjnldsv@protonmail.com>\n * @author Marco Ambrosini <marcoambrosini@pm.me>\n *\n * @license GNU AGPL version 3 or any later version\n *\n * This program is free software: you can redistribute it and/or modify\n * it under the terms of the GNU Affero General Public License as\n * published by the Free Software Foundation, either version 3 of the\n * License, or (at your option) any later version.\n *\n * This program is distributed in the hope that it will be useful,\n * but WITHOUT ANY WARRANTY; without even the implied warranty of\n * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the\n * GNU Affero General Public License for more details.\n *\n * You should have received a copy of the GNU Affero General Public License\n * along with this program. If not, see <http://www.gnu.org/licenses/>.\n *\n */\n\n@mixin action-active {\n\tli {\n\t\t&.active {\n\t\t\tbackground-color: var(--color-background-hover);\n\t\t}\n\t}\n}\n\n@mixin action--disabled {\n\t.action--disabled {\n\t\tpointer-events: none;\n\t\topacity: $opacity_disabled;\n\t\t&:hover, &:focus {\n\t\t\tcursor: default;\n\t\t\topacity: $opacity_disabled;\n\t\t}\n\t\t& * {\n\t\t\topacity: 1 !important;\n\t\t}\n\t}\n}\n\n\n@mixin action-item($name) {\n\t.action-#{$name} {\n\t\tdisplay: flex;\n\t\talign-items: flex-start;\n\n\t\twidth: 100%;\n\t\theight: auto;\n\t\tmargin: 0;\n\t\tpadding: 0;\n\t\tpadding-right: $icon-margin;\n\n\t\tcursor: pointer;\n\t\twhite-space: nowrap;\n\n\t\topacity: $opacity_normal;\n\t\tcolor: var(--color-main-text);\n\t\tborder: 0;\n\t\tborder-radius: 0; // otherwise Safari will cut the border-radius area\n\t\tbackground-color: transparent;\n\t\tbox-shadow: none;\n\n\t\tfont-weight: normal;\n\t\tfont-size: var(--default-font-size);\n\t\tline-height: $clickable-area;\n\n\t\t&:hover,\n\t\t&:focus {\n\t\t\topacity: $opacity_full;\n\t\t}\n\n\t\t& > span {\n\t\t\tcursor: pointer;\n\t\t\twhite-space: nowrap;\n\t\t}\n\n\t\t&__icon {\n\t\t\twidth: $clickable-area;\n\t\t\theight: $clickable-area;\n\t\t\topacity: $opacity_full;\n\t\t\tbackground-position: $icon-margin center;\n\t\t\tbackground-size: $icon-size;\n\t\t\tbackground-repeat: no-repeat;\n\t\t}\n\n\t\t.material-design-icon {\n\t\t\twidth: $clickable-area;\n\t\t\theight: $clickable-area;\n\t\t\topacity: $opacity_full;\n\n\t\t\t.material-design-icon__svg {\n\t\t\t\tvertical-align: middle;\n\t\t\t}\n\t\t}\n\n\t\t// long text area\n\t\tp {\n\t\t\twidth: 220px;\n\t\t\tpadding: #{$icon-margin / 2} 0;\n\n\t\t\tcursor: pointer;\n\t\t\ttext-align: left;\n\n\t\t\tline-height: 1.6em;\n\n\t\t\t// in case there are no spaces like long email addresses\n\t\t\toverflow: hidden;\n\t\t\ttext-overflow: ellipsis;\n\t\t}\n\n\t\t&__longtext {\n\t\t\tcursor: pointer;\n\t\t\t// allow the use of `\\n`\n\t\t\twhite-space: pre-wrap;\n\t\t}\n\n\t\t&__title {\n\t\t\tfont-weight: bold;\n\t\t\ttext-overflow: ellipsis;\n\t\t\toverflow: hidden;\n\t\t\twhite-space: nowrap;\n\t\t\tmax-width: 100%;\n\t\t\tdisplay: inline-block;\n\t\t}\n\t}\n}\n", "/**\n * @copyright Copyright (c) 2019 John Molakvoæ <skjnldsv@protonmail.com>\n *\n * @author John Molakvoæ <skjnldsv@protonmail.com>\n *\n * @license GNU AGPL version 3 or any later version\n *\n * This program is free software: you can redistribute it and/or modify\n * it under the terms of the GNU Affero General Public License as\n * published by the Free Software Foundation, either version 3 of the\n * License, or (at your option) any later version.\n *\n * This program is distributed in the hope that it will be useful,\n * but WITHOUT ANY WARRANTY; without even the implied warranty of\n * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the\n * GNU Affero General Public License for more details.\n *\n * You should have received a copy of the GNU Affero General Public License\n * along with this program. If not, see <http://www.gnu.org/licenses/>.\n *\n */\n\n// https://uxplanet.org/7-rules-for-mobile-ui-button-design-e9cf2ea54556\n// recommended is 48px\n// 44px is what we choose and have very good visual-to-usability ratio\n$clickable-area: 44px;\n\n// background icon size\n// also used for the scss icon font\n$icon-size: 16px;\n\n// icon padding for a $clickable-area width and a $icon-size icon\n// ( 44px - 16px ) / 2\n$icon-margin: ($clickable-area - $icon-size) / 2;\n\n// transparency background for icons\n$icon-focus-bg: rgba(127, 127, 127, .25);\n\n// popovermenu arrow width from the triangle center\n$arrow-width: 9px;\n\n// opacities\n$opacity_disabled: .5;\n$opacity_normal: .7;\n$opacity_full: 1;\n\n// menu round background hover feedback\n// good looking on dark AND white bg\n$action-background-hover: rgba(127, 127, 127, .25);\n\n// various structure data used in the \n// `AppNavigation` component\n$header-height: 50px;\n$navigation-width: 300px;\n\n// mobile breakpoint\n$breakpoint-mobile: 1024px;\n"],
        sourceRoot: ""
      }]), n.a = a;
    },
    95: function _(t, n) {}
  });
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./node_modules/@nextcloud/vue/dist/Components/Actions.js":
/*!****************************************************************!*\
  !*** ./node_modules/@nextcloud/vue/dist/Components/Actions.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

!function (A, t) {
  "object" == ( false ? undefined : _typeof(exports)) && "object" == ( false ? undefined : _typeof(module)) ? module.exports = t() :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (t),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : undefined;
}(window, function () {
  return function (A) {
    var t = {};

    function e(n) {
      if (t[n]) return t[n].exports;
      var o = t[n] = {
        i: n,
        l: !1,
        exports: {}
      };
      return A[n].call(o.exports, o, o.exports, e), o.l = !0, o.exports;
    }

    return e.m = A, e.c = t, e.d = function (A, t, n) {
      e.o(A, t) || Object.defineProperty(A, t, {
        enumerable: !0,
        get: n
      });
    }, e.r = function (A) {
      "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(A, Symbol.toStringTag, {
        value: "Module"
      }), Object.defineProperty(A, "__esModule", {
        value: !0
      });
    }, e.t = function (A, t) {
      if (1 & t && (A = e(A)), 8 & t) return A;
      if (4 & t && "object" == _typeof(A) && A && A.__esModule) return A;
      var n = Object.create(null);
      if (e.r(n), Object.defineProperty(n, "default", {
        enumerable: !0,
        value: A
      }), 2 & t && "string" != typeof A) for (var o in A) {
        e.d(n, o, function (t) {
          return A[t];
        }.bind(null, o));
      }
      return n;
    }, e.n = function (A) {
      var t = A && A.__esModule ? function () {
        return A.default;
      } : function () {
        return A;
      };
      return e.d(t, "a", t), t;
    }, e.o = function (A, t) {
      return Object.prototype.hasOwnProperty.call(A, t);
    }, e.p = "/dist/", e(e.s = 73);
  }([function (A, t, e) {
    "use strict";

    function n(A, t) {
      return function (A) {
        if (Array.isArray(A)) return A;
      }(A) || function (A, t) {
        if ("undefined" == typeof Symbol || !(Symbol.iterator in Object(A))) return;
        var e = [],
            n = !0,
            o = !1,
            i = void 0;

        try {
          for (var a, r = A[Symbol.iterator](); !(n = (a = r.next()).done) && (e.push(a.value), !t || e.length !== t); n = !0) {
            ;
          }
        } catch (A) {
          o = !0, i = A;
        } finally {
          try {
            n || null == r.return || r.return();
          } finally {
            if (o) throw i;
          }
        }

        return e;
      }(A, t) || function (A, t) {
        if (!A) return;
        if ("string" == typeof A) return o(A, t);
        var e = Object.prototype.toString.call(A).slice(8, -1);
        "Object" === e && A.constructor && (e = A.constructor.name);
        if ("Map" === e || "Set" === e) return Array.from(A);
        if ("Arguments" === e || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)) return o(A, t);
      }(A, t) || function () {
        throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }();
    }

    function o(A, t) {
      (null == t || t > A.length) && (t = A.length);

      for (var e = 0, n = new Array(t); e < t; e++) {
        n[e] = A[e];
      }

      return n;
    }

    A.exports = function (A) {
      var t = n(A, 4),
          e = t[1],
          o = t[3];

      if ("function" == typeof btoa) {
        var i = btoa(unescape(encodeURIComponent(JSON.stringify(o)))),
            a = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(i),
            r = "/*# ".concat(a, " */"),
            s = o.sources.map(function (A) {
          return "/*# sourceURL=".concat(o.sourceRoot || "").concat(A, " */");
        });
        return [e].concat(s).concat([r]).join("\n");
      }

      return [e].join("\n");
    };
  }, function (A, t, e) {
    "use strict";

    A.exports = function (A) {
      var t = [];
      return t.toString = function () {
        return this.map(function (t) {
          var e = A(t);
          return t[2] ? "@media ".concat(t[2], " {").concat(e, "}") : e;
        }).join("");
      }, t.i = function (A, e, n) {
        "string" == typeof A && (A = [[null, A, ""]]);
        var o = {};
        if (n) for (var i = 0; i < this.length; i++) {
          var a = this[i][0];
          null != a && (o[a] = !0);
        }

        for (var r = 0; r < A.length; r++) {
          var s = [].concat(A[r]);
          n && o[s[0]] || (e && (s[2] ? s[2] = "".concat(e, " and ").concat(s[2]) : s[2] = e), t.push(s));
        }
      }, t;
    };
  }, function (A, t, e) {
    "use strict";

    var n,
        o = function o() {
      return void 0 === n && (n = Boolean(window && document && document.all && !window.atob)), n;
    },
        i = function () {
      var A = {};
      return function (t) {
        if (void 0 === A[t]) {
          var e = document.querySelector(t);
          if (window.HTMLIFrameElement && e instanceof window.HTMLIFrameElement) try {
            e = e.contentDocument.head;
          } catch (A) {
            e = null;
          }
          A[t] = e;
        }

        return A[t];
      };
    }(),
        a = [];

    function r(A) {
      for (var t = -1, e = 0; e < a.length; e++) {
        if (a[e].identifier === A) {
          t = e;
          break;
        }
      }

      return t;
    }

    function s(A, t) {
      for (var e = {}, n = [], o = 0; o < A.length; o++) {
        var i = A[o],
            s = t.base ? i[0] + t.base : i[0],
            c = e[s] || 0,
            l = "".concat(s, " ").concat(c);
        e[s] = c + 1;
        var g = r(l),
            u = {
          css: i[1],
          media: i[2],
          sourceMap: i[3]
        };
        -1 !== g ? (a[g].references++, a[g].updater(u)) : a.push({
          identifier: l,
          updater: C(u, t),
          references: 1
        }), n.push(l);
      }

      return n;
    }

    function c(A) {
      var t = document.createElement("style"),
          n = A.attributes || {};

      if (void 0 === n.nonce) {
        var o = e.nc;
        o && (n.nonce = o);
      }

      if (Object.keys(n).forEach(function (A) {
        t.setAttribute(A, n[A]);
      }), "function" == typeof A.insert) A.insert(t);else {
        var a = i(A.insert || "head");
        if (!a) throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
        a.appendChild(t);
      }
      return t;
    }

    var l,
        g = (l = [], function (A, t) {
      return l[A] = t, l.filter(Boolean).join("\n");
    });

    function u(A, t, e, n) {
      var o = e ? "" : n.media ? "@media ".concat(n.media, " {").concat(n.css, "}") : n.css;
      if (A.styleSheet) A.styleSheet.cssText = g(t, o);else {
        var i = document.createTextNode(o),
            a = A.childNodes;
        a[t] && A.removeChild(a[t]), a.length ? A.insertBefore(i, a[t]) : A.appendChild(i);
      }
    }

    function d(A, t, e) {
      var n = e.css,
          o = e.media,
          i = e.sourceMap;
      if (o ? A.setAttribute("media", o) : A.removeAttribute("media"), i && "undefined" != typeof btoa && (n += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(i)))), " */")), A.styleSheet) A.styleSheet.cssText = n;else {
        for (; A.firstChild;) {
          A.removeChild(A.firstChild);
        }

        A.appendChild(document.createTextNode(n));
      }
    }

    var m = null,
        p = 0;

    function C(A, t) {
      var e, n, o;

      if (t.singleton) {
        var i = p++;
        e = m || (m = c(t)), n = u.bind(null, e, i, !1), o = u.bind(null, e, i, !0);
      } else e = c(t), n = d.bind(null, e, t), o = function o() {
        !function (A) {
          if (null === A.parentNode) return !1;
          A.parentNode.removeChild(A);
        }(e);
      };

      return n(A), function (t) {
        if (t) {
          if (t.css === A.css && t.media === A.media && t.sourceMap === A.sourceMap) return;
          n(A = t);
        } else o();
      };
    }

    A.exports = function (A, t) {
      (t = t || {}).singleton || "boolean" == typeof t.singleton || (t.singleton = o());
      var e = s(A = A || [], t);
      return function (A) {
        if (A = A || [], "[object Array]" === Object.prototype.toString.call(A)) {
          for (var n = 0; n < e.length; n++) {
            var o = r(e[n]);
            a[o].references--;
          }

          for (var i = s(A, t), c = 0; c < e.length; c++) {
            var l = r(e[c]);
            0 === a[l].references && (a[l].updater(), a.splice(l, 1));
          }

          e = i;
        }
      };
    };
  }, function (A, t, e) {
    "use strict";

    function n(A, t, e, n, o, i, a, r) {
      var s,
          c = "function" == typeof A ? A.options : A;
      if (t && (c.render = t, c.staticRenderFns = e, c._compiled = !0), n && (c.functional = !0), i && (c._scopeId = "data-v-" + i), a ? (s = function s(A) {
        (A = A || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) || "undefined" == typeof __VUE_SSR_CONTEXT__ || (A = __VUE_SSR_CONTEXT__), o && o.call(this, A), A && A._registeredComponents && A._registeredComponents.add(a);
      }, c._ssrRegister = s) : o && (s = r ? function () {
        o.call(this, (c.functional ? this.parent : this).$root.$options.shadowRoot);
      } : o), s) if (c.functional) {
        c._injectStyles = s;
        var l = c.render;

        c.render = function (A, t) {
          return s.call(t), l(A, t);
        };
      } else {
        var g = c.beforeCreate;
        c.beforeCreate = g ? [].concat(g, s) : [s];
      }
      return {
        exports: A,
        options: c
      };
    }

    e.d(t, "a", function () {
      return n;
    });
  }, function (A, t, e) {
    "use strict";

    A.exports = function (A, t) {
      return t || (t = {}), "string" != typeof (A = A && A.__esModule ? A.default : A) ? A : (/^['"].*['"]$/.test(A) && (A = A.slice(1, -1)), t.hash && (A += t.hash), /["'() \t\n]/.test(A) || t.needQuotes ? '"'.concat(A.replace(/"/g, '\\"').replace(/\n/g, "\\n"), '"') : A);
    };
  }, function (A, t) {
    A.exports = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm.js");
  }, function (A, t) {
    A.exports = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
  }, function (A, t) {
    A.exports = __webpack_require__(/*! v-tooltip */ "./node_modules/v-tooltip/dist/v-tooltip.esm.js");
  }, function (A, t, e) {
    "use strict";

    t.a = "data:application/vnd.ms-fontobject;base64,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";
  }, function (A, t, e) {
    "use strict";

    t.a = "data:font/woff;base64,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PAE55eh8gAAAAQAAAAEAADh+5rVfDzz1AAsTiAAAAADclJzcAAAAANxDwN3/4AAAE5MTiAAAAAgAAgAAAAAAAAABAAATiAAAAAATiP/g//UTkwABAAAAAAAAAAAAAAAAAAAABwAAAAATiAAAE4gAABOIAAATiAAABjYAABOIAAAAAP//AAAAAAAAAAAAAAAA/+AAAAAAAAAAAAAAACIANgBYAGwAgACUALQBDgF8AZoCEAImAjQCQgKoAyIDpgP+AAEAAAATAEsAAwAAAAAAAgAAAAoACgAAAP8AAAAAAAAAAAAQAMYAAQAAAAAAAQAUAAAAAQAAAAAAAgAHABQAAQAAAAAAAwAUABsAAQAAAAAABAAUAC8AAQAAAAAABQALAEMAAQAAAAAABgAUAE4AAQAAAAAACgArAGIAAQAAAAAACwATAI0AAwABBAkAAQAoAKAAAwABBAkAAgAOAMgAAwABBAkAAwAoANYAAwABBAkABAAoAP4AAwABBAkABQAWASYAAwABBAkABgAoATwAAwABBAkACgBWAWQAAwABBAkACwAmAbppY29uZm9udC12dWUtNmI0OTRmY1JlZ3VsYXJpY29uZm9udC12dWUtNmI0OTRmY2ljb25mb250LXZ1ZS02YjQ5NGZjVmVyc2lvbiAxLjBpY29uZm9udC12dWUtNmI0OTRmY0dlbmVyYXRlZCBieSBzdmcydHRmIGZyb20gRm9udGVsbG8gcHJvamVjdC5odHRwOi8vZm9udGVsbG8uY29tAGkAYwBvAG4AZgBvAG4AdAAtAHYAdQBlAC0ANgBiADQAOQA0AGYAYwBSAGUAZwB1AGwAYQByAGkAYwBvAG4AZgBvAG4AdAAtAHYAdQBlAC0ANgBiADQAOQA0AGYAYwBpAGMAbwBuAGYAbwBuAHQALQB2AHUAZQAtADYAYgA0ADkANABmAGMAVgBlAHIAcwBpAG8AbgAgADEALgAwAGkAYwBvAG4AZgBvAG4AdAAtAHYAdQBlAC0ANgBiADQAOQA0AGYAYwBHAGUAbgBlAHIAYQB0AGUAZAAgAGIAeQAgAHMAdgBnADIAdAB0AGYAIABmAHIAbwBtACAARgBvAG4AdABlAGwAbABvACAAcAByAG8AagBlAGMAdAAuAGgAdAB0AHAAOgAvAC8AZgBvAG4AdABlAGwAbABvAC4AYwBvAG0AAAACAAAAAAAAADIAAAAAAAAAAAAAAAAAAAAAAAAAAAATABMAAAECAQMBBAEFAQYBBwEIAQkBCgELAQwBDQEOAQ8BEAERARIBExFhcnJvdy1sZWZ0LWRvdWJsZQphcnJvdy1sZWZ0EmFycm93LXJpZ2h0LWRvdWJsZQthcnJvdy1yaWdodApicmVhZGNydW1iCWNoZWNrbWFyawVjbG9zZQdjb25maXJtBGluZm8EbWVudQRtb3JlBXBhdXNlBHBsYXkKdHJpYW5nbGUtcxB1c2VyLXN0YXR1cy1hd2F5D3VzZXItc3RhdHVzLWRuZBV1c2VyLXN0YXR1cy1pbnZpc2libGUSdXNlci1zdGF0dXMtb25saW5lAAA=";
  }, function (A, t, e) {
    "use strict";

    t.a = "data:font/ttf;base64,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AAATiP/g//UTkwABAAAAAAAAAAAAAAAAAAAABwAAAAATiAAAE4gAABOIAAATiAAABjYAABOIAAAAAP//AAAAAAAAAAAAAAAA/+AAAAAAAAAAAAAAACIANgBYAGwAgACUALQBDgF8AZoCEAImAjQCQgKoAyIDpgP+AAEAAAATAEsAAwAAAAAAAgAAAAoACgAAAP8AAAAAAAAAAAAQAMYAAQAAAAAAAQAUAAAAAQAAAAAAAgAHABQAAQAAAAAAAwAUABsAAQAAAAAABAAUAC8AAQAAAAAABQALAEMAAQAAAAAABgAUAE4AAQAAAAAACgArAGIAAQAAAAAACwATAI0AAwABBAkAAQAoAKAAAwABBAkAAgAOAMgAAwABBAkAAwAoANYAAwABBAkABAAoAP4AAwABBAkABQAWASYAAwABBAkABgAoATwAAwABBAkACgBWAWQAAwABBAkACwAmAbppY29uZm9udC12dWUtNmI0OTRmY1JlZ3VsYXJpY29uZm9udC12dWUtNmI0OTRmY2ljb25mb250LXZ1ZS02YjQ5NGZjVmVyc2lvbiAxLjBpY29uZm9udC12dWUtNmI0OTRmY0dlbmVyYXRlZCBieSBzdmcydHRmIGZyb20gRm9udGVsbG8gcHJvamVjdC5odHRwOi8vZm9udGVsbG8uY29tAGkAYwBvAG4AZgBvAG4AdAAtAHYAdQBlAC0ANgBiADQAOQA0AGYAYwBSAGUAZwB1AGwAYQByAGkAYwBvAG4AZgBvAG4AdAAtAHYAdQBlAC0ANgBiADQAOQA0AGYAYwBpAGMAbwBuAGYAbwBuAHQALQB2AHUAZQAtADYAYgA0ADkANABmAGMAVgBlAHIAcwBpAG8AbgAgADEALgAwAGkAYwBvAG4AZgBvAG4AdAAtAHYAdQBlAC0ANgBiADQAOQA0AGYAYwBHAGUAbgBlAHIAYQB0AGUAZAAgAGIAeQAgAHMAdgBnADIAdAB0AGYAIABmAHIAbwBtACAARgBvAG4AdABlAGwAbABvACAAcAByAG8AagBlAGMAdAAuAGgAdAB0AHAAOgAvAC8AZgBvAG4AdABlAGwAbABvAC4AYwBvAG0AAAACAAAAAAAAADIAAAAAAAAAAAAAAAAAAAAAAAAAAAATABMAAAECAQMBBAEFAQYBBwEIAQkBCgELAQwBDQEOAQ8BEAERARIBExFhcnJvdy1sZWZ0LWRvdWJsZQphcnJvdy1sZWZ0EmFycm93LXJpZ2h0LWRvdWJsZQthcnJvdy1yaWdodApicmVhZGNydW1iCWNoZWNrbWFyawVjbG9zZQdjb25maXJtBGluZm8EbWVudQRtb3JlBXBhdXNlBHBsYXkKdHJpYW5nbGUtcxB1c2VyLXN0YXR1cy1hd2F5D3VzZXItc3RhdHVzLWRuZBV1c2VyLXN0YXR1cy1pbnZpc2libGUSdXNlci1zdGF0dXMtb25saW5lAAA=";
  }, function (A, t, e) {
    "use strict";

    t.a = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCIgPjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48bWV0YWRhdGE+PC9tZXRhZGF0YT48ZGVmcz48Zm9udCBpZD0iaWNvbmZvbnQtdnVlLTZiNDk0ZmMiIGhvcml6LWFkdi14PSI1MDAwIj48Zm9udC1mYWNlIGZvbnQtZmFtaWx5PSJpY29uZm9udC12dWUtNmI0OTRmYyIgZm9udC13ZWlnaHQ9IjQwMCIgZm9udC1zdHJldGNoPSJub3JtYWwiIHVuaXRzLXBlci1lbT0iNTAwMCIgcGFub3NlLTE9IjIgMCA1IDMgMCAwIDAgMCAwIDAiIGFzY2VudD0iNTAwMCIgZGVzY2VudD0iMCIgeC1oZWlnaHQ9IjAiIGJib3g9Ii0zMiAwIDUwMTEgNTAwMCIgdW5kZXJsaW5lLXRoaWNrbmVzcz0iMCIgdW5kZXJsaW5lLXBvc2l0aW9uPSI1MCIgdW5pY29kZS1yYW5nZT0iVStlYTAxLWVhMTIiIC8+PG1pc3NpbmctZ2x5cGggaG9yaXotYWR2LXg9IjAiICAvPjxnbHlwaCBnbHlwaC1uYW1lPSJhcnJvdy1sZWZ0LWRvdWJsZSIgdW5pY29kZT0iJiN4ZWEwMTsiIGQ9Ik0zNzUwIDM5MDYgbC0xNDA2IC0xNDA2IGwxNDA2IC0xNDA2IGwwIDMxMiBsLTEwOTQgMTA5NCBsMTA5NCAxMDk0IGwwIDMxMiBaTTIzNDQgMzkwNiBsLTE0MDYgLTE0MDYgbDE0MDYgLTE0MDYgbDAgMzEyIGwtMTA5NCAxMDk0IGwxMDk0IDEwOTQgbDAgMzEyIFoiIC8+PGdseXBoIGdseXBoLW5hbWU9ImFycm93LWxlZnQiIHVuaWNvZGU9IiYjeGVhMDI7IiBkPSJNMTU2MyAyNTAwIGwxODc1IC0xODc1IGwwIC0zMTIgbC0yMTg4IDIxODcgbDIxODggMjE4OCBsMCAtMzEzIGwtMTg3NSAtMTg3NSBaIiAvPjxnbHlwaCBnbHlwaC1uYW1lPSJhcnJvdy1yaWdodC1kb3VibGUiIHVuaWNvZGU9IiYjeGVhMDM7IiBkPSJNMTI1MCAxMDk0IGwxNDA2IDE0MDYgbC0xNDA2IDE0MDYgbDAgLTMxMiBsMTA5NCAtMTA5NCBsLTEwOTQgLTEwOTQgbDAgLTMxMiBaTTI2NTYgMTA5NCBsMTQwNyAxNDA2IGwtMTQwNyAxNDA2IGwwIC0zMTIgbDEwOTQgLTEwOTQgbC0xMDk0IC0xMDk0IGwwIC0zMTIgWiIgLz48Z2x5cGggZ2x5cGgtbmFtZT0iYXJyb3ctcmlnaHQiIHVuaWNvZGU9IiYjeGVhMDQ7IiBkPSJNMzQzOCAyNTAwIGwtMTg3NSAxODc1IGwwIDMxMyBsMjE4NyAtMjE4OCBsLTIxODcgLTIxODcgbDAgMzEyIGwxODc1IDE4NzUgWiIgLz48Z2x5cGggZ2x5cGgtbmFtZT0iYnJlYWRjcnVtYiIgdW5pY29kZT0iJiN4ZWEwNTsiIGQ9Ik0xNDggNTAwMCBsLTE0OCAtODUgbDEzOTQgLTI0MTUgbC0xMzk0IC0yNDE1IGwxNDggLTg1IGwxNDQzIDI1MDAgbC0xNDQzIDI1MDAgWiIgLz48Z2x5cGggZ2x5cGgtbmFtZT0iY2hlY2ttYXJrIiB1bmljb2RlPSImI3hlYTA2OyIgZD0iTTQwNDUgMzk3MSBsLTIwNjEgLTIwNjEgbC0xMDI5IDEwMjkgbC00NDIgLTQ0MSBsMTQ3MSAtMTQ3MSBsMjUwMyAyNTAyIGwtNDQyIDQ0MiBaIiAvPjxnbHlwaCBnbHlwaC1uYW1lPSJjbG9zZSIgdW5pY29kZT0iJiN4ZWEwNzsiIGQ9Ik00Mzc1IDExNTYgbC01MzEgLTUzMSBsLTEzNDQgMTM0NCBsLTEzNDQgLTEzNDQgbC01MzEgNTMxIGwxMzQ0IDEzNDQgbC0xMzQ0IDEzNDQgbDUzMSA1MzEgbDEzNDQgLTEzNDQgbDEzNDQgMTM0NCBsNTMxIC01MzEgbC0xMzQ0IC0xMzQ0IGwxMzQ0IC0xMzQ0IFoiIC8+PGdseXBoIGdseXBoLW5hbWU9ImNvbmZpcm0iIHVuaWNvZGU9IiYjeGVhMDg7IiBkPSJNMjY1NiA0ODQ0IHEtMTAxIDAgLTE4MCAtNTcgcS03NCAtNTIgLTEwOSAtMTM4IHEtMzUgLTg2IC0xOSAtMTc1IHExOCAtOTYgOTAgLTE2NyBsMTQ5NSAtMTQ5NCBsLTM2MTYgMCBxLTc3IDEgLTEzOSAtMjYgcS01OCAtMjQgLTk5IC03MCBxLTM5IC00NCAtNTkgLTEwMSBxLTIwIC01NiAtMjAgLTExNiBxMCAtNjAgMjAgLTExNiBxMjAgLTU3IDU5IC0xMDEgcTQxIC00NiA5OSAtNzAgcTYyIC0yNyAxMzkgLTI1IGwzNjE2IDAgbC0xNDk1IC0xNDk1IHEtNTUgLTUzIC04MSAtMTE2IHEtMjQgLTU5IC0yMSAtMTIxIHEzIC01OCAzMCAtMTEzIHEyNSAtNTQgNjggLTk3IHE0MyAtNDMgOTYgLTY4IHE1NSAtMjYgMTE0IC0yOSBxNjIgLTMgMTIwIDIxIHE2MyAyNSAxMTYgODEgbDIwMjkgMjAyOCBxNTkgNjAgODAgMTQxIHEyMSA4MCAxIDE1OSBxLTIxIDgyIC04MSAxNDIgbC0yMDI5IDIwMjggcS00NCA0NSAtMTAyIDcwIHEtNTggMjUgLTEyMiAyNSBaIiAvPjxnbHlwaCBnbHlwaC1uYW1lPSJpbmZvIiB1bmljb2RlPSImI3hlYTA5OyIgZD0iTTI0MjIgNDY4OCBxLTExMSAwIC0yMTMgLTQzIHEtOTggLTQyIC0xNzQgLTExNy41IHEtNzYgLTc1LjUgLTExNyAtMTc0LjUgcS00MyAtMTAxIC00MyAtMjEyLjUgcTAgLTExMS41IDQzIC0yMTIuNSBxNDEgLTk4IDExNyAtMTc0IHE3NiAtNzYgMTc0IC0xMTcgcTEwMiAtNDMgMjEzIC00MyBxMTExIDAgMjEzIDQzIHE5OCA0MSAxNzMuNSAxMTcgcTc1LjUgNzYgMTE3LjUgMTc0IHE0MyAxMDEgNDMgMjEyLjUgcTAgMTExLjUgLTQzIDIxMi41IHEtNDIgOTkgLTExNy41IDE3NC41IHEtNzUuNSA3NS41IC0xNzMuNSAxMTcuNSBxLTEwMiA0MyAtMjEzIDQzIFpNMTU2MyAzMTI1IHEtODYgMCAtMTU4IC00MyBxLTcxIC00MSAtMTEyIC0xMTIgcS00MyAtNzIgLTQzIC0xNTcuNSBxMCAtODUuNSA0MyAtMTU3LjUgcTQxIC03MSAxMTIgLTExMiBxNzIgLTQzIDE1OCAtNDMgbDYyNSAwIGwwIC0xNTYyIGwtNjI1IDAgcS04NiAwIC0xNTggLTQzIHEtNzEgLTQxIC0xMTIgLTExMiBxLTQzIC03MyAtNDMgLTE1OCBxMCAtODUgNDMgLTE1OCBxNDEgLTcxIDExMiAtMTEyIHE3MiAtNDMgMTU4IC00MiBsMTg3NSAwIHE4NSAwIDE1NyA0MiBxNzEgNDEgMTEyIDExMiBxNDMgNzMgNDMgMTU4IHEwIDg1IC00MyAxNTggcS00MSA3MSAtMTEyIDExMiBxLTcyIDQzIC0xNTcgNDMgbC02MjUgMCBsMCAxODc1IHEwIDg1IC00MyAxNTcgcS00MSA3MSAtMTEyIDExMiBxLTczIDQzIC0xNTggNDMgbC05MzcgMCBaIiAvPjxnbHlwaCBnbHlwaC1uYW1lPSJtZW51IiB1bmljb2RlPSImI3hlYTBhOyIgZD0iTTYyNSA0Mzc1IGwwIC02MjUgbDM3NTAgMCBsMCA2MjUgbC0zNzUwIDAgWk02MjUgMjgxMyBsMCAtNjI1IGwzNzUwIDAgbDAgNjI1IGwtMzc1MCAwIFpNNjI1IDEyNTAgbDAgLTYyNSBsMzc1MCAwIGwwIDYyNSBsLTM3NTAgMCBaIiAvPjxnbHlwaCBnbHlwaC1uYW1lPSJtb3JlIiB1bmljb2RlPSImI3hlYTBiOyIgZD0iTTc4MSAzMDQ3IHExMTIgMCAyMTMgLTQzIHE5OCAtNDIgMTc0IC0xMTcuNSBxNzYgLTc1LjUgMTE3IC0xNzMuNSBxNDMgLTEwMiA0MyAtMjEzIHEwIC0xMTEgLTQzIC0yMTMgcS00MSAtOTggLTExNyAtMTczLjUgcS03NiAtNzUuNSAtMTc0IC0xMTcuNSBxLTEwMSAtNDMgLTIxMi41IC00MyBxLTExMS41IDAgLTIxMy41IDQzIHEtOTggNDIgLTE3My41IDExNy41IHEtNzUuNSA3NS41IC0xMTcuNSAxNzMuNSBxLTQzIDEwMiAtNDMgMjEzIHEwIDExMSA0MyAyMTMgcTQyIDk4IDExNy41IDE3My41IHE3NS41IDc1LjUgMTczLjUgMTE3LjUgcTEwMiA0MyAyMTMgNDMgWk0yNTAwIDMwNDcgcTExMSAwIDIxMyAtNDMgcTk4IC00MiAxNzMuNSAtMTE3LjUgcTc1LjUgLTc1LjUgMTE3LjUgLTE3My41IHE0MyAtMTAyIDQzIC0yMTMgcTAgLTExMSAtNDMgLTIxMyBxLTQyIC05OCAtMTE3LjUgLTE3My41IHEtNzUuNSAtNzUuNSAtMTczLjUgLTExNy41IHEtMTAyIC00MyAtMjEzIC00MyBxLTExMSAwIC0yMTMgNDMgcS05OCA0MiAtMTczLjUgMTE3LjUgcS03NS41IDc1LjUgLTExNy41IDE3My41IHEtNDMgMTAyIC00MyAyMTMgcTAgMTExIDQzIDIxMyBxNDIgOTggMTE3LjUgMTczLjUgcTc1LjUgNzUuNSAxNzMuNSAxMTcuNSBxMTAyIDQzIDIxMyA0MyBaTTQyMTkgMzA0NyBxMTExIDAgMjEzIC00MyBxOTggLTQyIDE3My41IC0xMTcuNSBxNzUuNSAtNzUuNSAxMTcuNSAtMTczLjUgcTQzIC0xMDIgNDMgLTIxMyBxMCAtMTExIC00MyAtMjEzIHEtNDIgLTk4IC0xMTcuNSAtMTczLjUgcS03NS41IC03NS41IC0xNzMuNSAtMTE3LjUgcS0xMDIgLTQzIC0yMTMuNSAtNDMgcS0xMTEuNSAwIC0yMTIuNSA0MyBxLTk4IDQyIC0xNzQgMTE3LjUgcS03NiA3NS41IC0xMTcgMTczLjUgcS00MyAxMDIgLTQzIDIxMyBxMCAxMTEgNDMgMjEzIHE0MSA5OCAxMTcgMTczLjUgcTc2IDc1LjUgMTc0IDExNy41IHExMDEgNDMgMjEzIDQzIFoiIC8+PGdseXBoIGdseXBoLW5hbWU9InBhdXNlIiB1bmljb2RlPSImI3hlYTBjOyIgZD0iTTkzOCA0MDYzIGwwIC0zMTI1IGwxMjUwIDAgbDAgMzEyNSBsLTEyNTAgMCBaTTI4MTMgNDA2MyBsMCAtMzEyNSBsMTI1MCAwIGwwIDMxMjUgbC0xMjUwIDAgWiIgLz48Z2x5cGggZ2x5cGgtbmFtZT0icGxheSIgdW5pY29kZT0iJiN4ZWEwZDsiIGQ9Ik02MjUgNDM3NSBsMzc1MCAtMTg3NSBsLTM3NTAgLTE4NzUgbDAgMzc1MCBaIiAvPjxnbHlwaCBnbHlwaC1uYW1lPSJ0cmlhbmdsZS1zIiB1bmljb2RlPSImI3hlYTBlOyIgZD0iTTEyNTAgMzEyNSBsMTI1MCAtMTI1MCBsMTI1MCAxMjQ4IGwtMjUwMCAyIFoiIC8+PGdseXBoIGdseXBoLW5hbWU9InVzZXItc3RhdHVzLWF3YXkiIHVuaWNvZGU9IiYjeGVhMGY7IiBkPSJNMjE1NiA0OTY5IHEtMzYwIC00NiAtNjk1IC0xOTcgcS0zMjYgLTE0NyAtNjAxIC0zODAgcS0yNzQgLTIzMSAtNDcyIC01MjggcS0yMDIgLTMwMSAtMzA5IC02NDIgcS0xMTAgLTM1MyAtMTEwIC03MjIgcTAgLTQwNiAxMjggLTc4OCBxMTIzIC0zNzAgMzU2IC02ODYgcTIyOSAtMzEzIDU0MiAtNTQyIHEzMTYgLTIzMiA2ODYgLTM1NiBxMzgyIC0xMjggNzg4IC0xMjggcTM2OSAwIDcyMiAxMDcgcTM0MiAxMDQgNjQ0IDMwMSBxMjk4IDE5NCA1MzMgNDYzIHEyMzYgMjcwIDM4OSA1OTMgcTE1NiAzMzEgMjEyIDY5MiBxLTE4OCAtMjA0IC00MjMuNSAtMzUxIHEtMjM1LjUgLTE0NyAtNDk4LjUgLTIyNSBxLTI2OSAtODAgLTU0NyAtODAgcS0zMjIgMCAtNjI4IDEwMyBxLTI5NSA5OSAtNTQ4IDI4NiBxLTI1MSAxODQgLTQzNSA0MzUgcS0xODcgMjUzIC0yODYgNTQ4IHEtMTAzIDMwNiAtMTAzIDYyOCBxMCAyOTMgODAgNTY4IHE3OCAyNjkgMjI1LjUgNDk4LjUgcTE0Ny41IDIyOS41IDM1MC41IDQwMi41IFoiIC8+PGdseXBoIGdseXBoLW5hbWU9InVzZXItc3RhdHVzLWRuZCIgdW5pY29kZT0iJiN4ZWExMDsiIGQ9Ik0yNTAwIDUwMDAgcS00MDYgMCAtNzg4IC0xMjggcS0zNzAgLTEyNCAtNjg2IC0zNTYgcS0zMTMgLTIyOSAtNTQyIC01NDIgcS0yMzIgLTMxNiAtMzU2IC02ODYgcS0xMjggLTM4MiAtMTI4IC03ODggcTAgLTQwNiAxMjggLTc4OCBxMTI0IC0zNzAgMzU2IC02ODYgcTIyOSAtMzEzIDU0MiAtNTQyIHEzMTYgLTIzMiA2ODYgLTM1NiBxMzgyIC0xMjggNzg4IC0xMjggcTQwNiAwIDc4OCAxMjggcTM3MCAxMjQgNjg2IDM1NiBxMzEzIDIyOSA1NDIgNTQyIHEyMzIgMzE2IDM1NiA2ODYgcTEyOCAzODIgMTI4IDc4OCBxMCA0MDYgLTEyOCA3ODggcS0xMjQgMzcwIC0zNTYgNjg2IHEtMjI5IDMxMyAtNTQyIDU0MiBxLTMxNiAyMzIgLTY4NiAzNTYgcS0zODIgMTI4IC03ODggMTI4IFpNMTU2MyAyOTY5IGwxODc1IDAgcTkxIDAgMTc4IC0zOCBxODQgLTM3IDE1MCAtMTAzIHE2NiAtNjYgMTAyIC0xNDkgcTM4IC04NyAzOCAtMTc5IHEwIC05MiAtMzggLTE3OSBxLTM2IC04MyAtMTAyIC0xNDkgcS02NiAtNjYgLTE1MCAtMTAzIHEtODcgLTM4IC0xNzggLTM4IGwtMTg3NSAwIHEtOTIgMCAtMTc5IDM4IHEtODQgMzcgLTE1MCAxMDMgcS02NiA2NiAtMTAyIDE0OSBxLTM4IDg3IC0zOCAxNzkgcTAgOTIgMzggMTc5IHEzNiA4MyAxMDIgMTQ5IHE2NiA2NiAxNTAgMTAzIHE4NyAzOCAxNzkgMzggWiIgLz48Z2x5cGggZ2x5cGgtbmFtZT0idXNlci1zdGF0dXMtaW52aXNpYmxlIiB1bmljb2RlPSImI3hlYTExOyIgZD0iTTI1MDAgNTAwMCBxLTQwNiAwIC03ODggLTEyOCBxLTM3MCAtMTI0IC02ODYgLTM1NiBxLTMxMyAtMjI5IC01NDIgLTU0MiBxLTIzMiAtMzE2IC0zNTYgLTY4NiBxLTEyOCAtMzgyIC0xMjggLTc4OCBxMCAtNDA2IDEyOCAtNzg4IHExMjQgLTM3MCAzNTYgLTY4NiBxMjI5IC0zMTMgNTQyIC01NDIgcTMxNiAtMjMyIDY4NiAtMzU2IHEzODIgLTEyOCA3ODggLTEyOCBxNDA2IDAgNzg4IDEyOCBxMzcwIDEyNCA2ODYgMzU2IHEzMTMgMjI5IDU0MiA1NDIgcTIzMiAzMTYgMzU2IDY4NiBxMTI4IDM4MiAxMjggNzg4IHEwIDQwNiAtMTI4IDc4OCBxLTEyNCAzNzAgLTM1NiA2ODYgcS0yMjkgMzEzIC01NDIgNTQyIHEtMzE2IDIzMiAtNjg2IDM1NiBxLTM4MiAxMjggLTc4OCAxMjggWk0yNTAwIDQwMDAgcTMxMSAwIDU5MCAtMTE2IHEyNzEgLTExMiA0NzYuNSAtMzE3LjUgcTIwNS41IC0yMDUuNSAzMTcuNSAtNDc2LjUgcTExNiAtMjc5IDExNiAtNTkwIHEwIC0zMTEgLTExNiAtNTkwIHEtMTEyIC0yNzEgLTMxNy41IC00NzYuNSBxLTIwNS41IC0yMDUuNSAtNDc2LjUgLTMxNy41IHEtMjc5IC0xMTYgLTU5MCAtMTE2IHEtMzExIDAgLTU5MCAxMTYgcS0yNzEgMTEyIC00NzYuNSAzMTcuNSBxLTIwNS41IDIwNS41IC0zMTcuNSA0NzYuNSBxLTExNiAyNzkgLTExNiA1OTAgcTAgMzExIDExNiA1OTAgcTExMiAyNzEgMzE3LjUgNDc2LjUgcTIwNS41IDIwNS41IDQ3Ni41IDMxNy41IHEyNzkgMTE2IDU5MCAxMTYgWiIgLz48Z2x5cGggZ2x5cGgtbmFtZT0idXNlci1zdGF0dXMtb25saW5lIiB1bmljb2RlPSImI3hlYTEyOyIgZD0iTTE1MDAgMTUwMCBsMjAwMCAwIGwwIDIwMDAgbC0yMDAwIDAgbDAgLTIwMDAgWk0yNTAwIDUwMDAgcS00MDYgMCAtNzg4IC0xMjggcS0zNzAgLTEyNCAtNjg2IC0zNTYgcS0zMTMgLTIyOSAtNTQyIC01NDIgcS0yMzIgLTMxNiAtMzU2IC02ODYgcS0xMjggLTM4MiAtMTI4IC03ODggcTAgLTQwNiAxMjggLTc4OCBxMTI0IC0zNzAgMzU2IC02ODYgcTIyOSAtMzEzIDU0MiAtNTQyIHEzMTYgLTIzMiA2ODYgLTM1NiBxMzgyIC0xMjggNzg4IC0xMjggcTQwNiAwIDc4OCAxMjggcTM3MCAxMjQgNjg2IDM1NiBxMzEzIDIyOSA1NDIgNTQyIHEyMzIgMzE2IDM1NiA2ODYgcTEyOCAzODIgMTI4IDc4OCBxMCA0MDYgLTEyOCA3ODggcS0xMjQgMzcwIC0zNTYgNjg2IHEtMjI5IDMxMyAtNTQyIDU0MiBxLTMxNiAyMzIgLTY4NiAzNTYgcS0zODIgMTI4IC03ODggMTI4IFoiIC8+PC9mb250PjwvZGVmcz48L3N2Zz4=";
  }, function (A, t, e) {
    "use strict";

    e.d(t, "b", function () {
      return r;
    }), e.d(t, "a", function () {
      return a;
    });
    e(26);
    var n = e(33),
        o = Object(n.getGettextBuilder)().detectLocale();
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
    }].forEach(function (A) {
      var t = {};

      for (var e in A.translations) {
        A.translations[e].pluralId ? t[e] = {
          msgid: e,
          msgid_plural: A.translations[e].pluralId,
          msgstr: A.translations[e].msgstr
        } : t[e] = {
          msgid: e,
          msgstr: [A.translations[e]]
        };
      }

      o.addTranslation(A.locale, {
        translations: {
          "": t
        }
      });
    });
    var i = o.build(),
        a = i.ngettext.bind(i),
        r = i.gettext.bind(i);
  },, function (A, t) {
    A.exports = __webpack_require__(/*! core-js/modules/es.function.name.js */ "./node_modules/core-js/modules/es.function.name.js");
  }, function (A, t) {
    A.exports = __webpack_require__(/*! core-js/modules/es.regexp.exec.js */ "./node_modules/core-js/modules/es.regexp.exec.js");
  }, function (A, t) {
    A.exports = __webpack_require__(/*! core-js/modules/es.string.iterator.js */ "./node_modules/core-js/modules/es.string.iterator.js");
  }, function (A, t) {
    A.exports = __webpack_require__(/*! core-js/modules/es.array.iterator.js */ "./node_modules/core-js/modules/es.array.iterator.js");
  }, function (A, t) {
    A.exports = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");
  }, function (A, t, e) {
    "use strict";

    var n = e(0),
        o = e.n(n),
        i = e(1),
        a = e.n(i)()(o.a);
    a.push([A.i, ".popover{z-index:100000;display:block !important;filter:drop-shadow(0 1px 10px var(--color-box-shadow))}.popover__inner{padding:0;color:var(--color-main-text);border-radius:var(--border-radius);background:var(--color-main-background)}.popover__arrow{position:absolute;z-index:1;width:0;height:0;margin:10px;border-style:solid;border-color:var(--color-main-background)}.popover[x-placement^='top']{margin-bottom:10px}.popover[x-placement^='top'] .popover__arrow{bottom:-10px;left:calc(50% - $arrow-width);margin-top:0;margin-bottom:0;border-width:10px 10px 0 10px;border-right-color:transparent !important;border-bottom-color:transparent !important;border-left-color:transparent !important}.popover[x-placement^='bottom']{margin-top:10px}.popover[x-placement^='bottom'] .popover__arrow{top:-10px;left:calc(50% - $arrow-width);margin-top:0;margin-bottom:0;border-width:0 10px 10px 10px;border-top-color:transparent !important;border-right-color:transparent !important;border-left-color:transparent !important}.popover[x-placement^='right']{margin-left:10px}.popover[x-placement^='right'] .popover__arrow{top:calc(50% - $arrow-width);left:-10px;margin-right:0;margin-left:0;border-width:10px 10px 10px 0;border-top-color:transparent !important;border-bottom-color:transparent !important;border-left-color:transparent !important}.popover[x-placement^='left']{margin-right:10px}.popover[x-placement^='left'] .popover__arrow{top:calc(50% - $arrow-width);right:-10px;margin-right:0;margin-left:0;border-width:10px 0 10px 10px;border-top-color:transparent !important;border-right-color:transparent !important;border-bottom-color:transparent !important}.popover[aria-hidden='true']{visibility:hidden;transition:opacity var(--animation-quick),visibility var(--animation-quick);opacity:0}.popover[aria-hidden='false']{visibility:visible;transition:opacity var(--animation-quick);opacity:1}\n", "", {
      version: 3,
      sources: ["webpack://./Popover.vue"],
      names: [],
      mappings: "AAgHA,SACC,cAAe,CACf,wBAAyB,CAEzB,sDAAuD,CAEvD,gBACC,SAAU,CACV,4BAA6B,CAC7B,kCAAmC,CACnC,uCAAwC,CACxC,gBAGA,iBAAkB,CAClB,SAAU,CACV,OAAQ,CACR,QAAS,CACT,WApBgB,CAqBhB,kBAAmB,CACnB,yCAA0C,CApB5C,6BAwBE,kBA1BgB,CAElB,6CA2BG,YA7Be,CA8Bf,6BAA8B,CAC9B,YAAa,CACb,eAAgB,CAChB,6BAjCe,CAkCf,yCAA0C,CAC1C,0CAA2C,CAC3C,wCAAyC,CAlC5C,gCAuCE,eAzCgB,CAElB,gDA0CG,SA5Ce,CA6Cf,6BAA8B,CAC9B,YAAa,CACb,eAAgB,CAChB,6BAhDe,CAiDf,uCAAwC,CACxC,yCAA0C,CAC1C,wCAAyC,CAjD5C,+BAsDE,gBAxDgB,CAElB,+CAyDG,4BAA6B,CAC7B,UA5De,CA6Df,cAAe,CACf,aAAc,CACd,6BAAsD,CACtD,uCAAwC,CACxC,0CAA2C,CAC3C,wCAAyC,CAhE5C,8BAqEE,iBAvEgB,CAElB,8CAwEG,4BAA6B,CAC7B,WA3Ee,CA4Ef,cAAe,CACf,aAAc,CACd,6BA9Ee,CA+Ef,uCAAwC,CACxC,yCAA0C,CAC1C,0CAA2C,CA/E9C,6BAoFE,iBAAkB,CAClB,2EAA6E,CAC7E,SAAU,CAtFZ,8BA0FE,kBAAmB,CACnB,yCAA0C,CAC1C,SAAU",
      sourcesContent: ["$scope_version:\"6b494fc\"; @import 'variables';\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n$arrow-width: 10px;\n\n.popover {\n\tz-index: 100000;\n\tdisplay: block !important;\n\n\tfilter: drop-shadow(0 1px 10px var(--color-box-shadow));\n\n\t&__inner {\n\t\tpadding: 0;\n\t\tcolor: var(--color-main-text);\n\t\tborder-radius: var(--border-radius);\n\t\tbackground: var(--color-main-background);\n\t}\n\n\t&__arrow {\n\t\tposition: absolute;\n\t\tz-index: 1;\n\t\twidth: 0;\n\t\theight: 0;\n\t\tmargin: $arrow-width;\n\t\tborder-style: solid;\n\t\tborder-color: var(--color-main-background);\n\t}\n\n\t&[x-placement^='top'] {\n\t\tmargin-bottom: $arrow-width;\n\n\t\t.popover__arrow {\n\t\t\tbottom: -$arrow-width;\n\t\t\tleft: calc(50% - $arrow-width);\n\t\t\tmargin-top: 0;\n\t\t\tmargin-bottom: 0;\n\t\t\tborder-width: $arrow-width $arrow-width 0 $arrow-width;\n\t\t\tborder-right-color: transparent !important;\n\t\t\tborder-bottom-color: transparent !important;\n\t\t\tborder-left-color: transparent !important;\n\t\t}\n\t}\n\n\t&[x-placement^='bottom'] {\n\t\tmargin-top: $arrow-width;\n\n\t\t.popover__arrow {\n\t\t\ttop: -$arrow-width;\n\t\t\tleft: calc(50% - $arrow-width);\n\t\t\tmargin-top: 0;\n\t\t\tmargin-bottom: 0;\n\t\t\tborder-width: 0 $arrow-width $arrow-width $arrow-width;\n\t\t\tborder-top-color: transparent !important;\n\t\t\tborder-right-color: transparent !important;\n\t\t\tborder-left-color: transparent !important;\n\t\t}\n\t}\n\n\t&[x-placement^='right'] {\n\t\tmargin-left: $arrow-width;\n\n\t\t.popover__arrow {\n\t\t\ttop: calc(50% - $arrow-width);\n\t\t\tleft: -$arrow-width;\n\t\t\tmargin-right: 0;\n\t\t\tmargin-left: 0;\n\t\t\tborder-width: $arrow-width $arrow-width $arrow-width 0;\n\t\t\tborder-top-color: transparent !important;\n\t\t\tborder-bottom-color: transparent !important;\n\t\t\tborder-left-color: transparent !important;\n\t\t}\n\t}\n\n\t&[x-placement^='left'] {\n\t\tmargin-right: $arrow-width;\n\n\t\t.popover__arrow {\n\t\t\ttop: calc(50% - $arrow-width);\n\t\t\tright: -$arrow-width;\n\t\t\tmargin-right: 0;\n\t\t\tmargin-left: 0;\n\t\t\tborder-width: $arrow-width 0 $arrow-width $arrow-width;\n\t\t\tborder-top-color: transparent !important;\n\t\t\tborder-right-color: transparent !important;\n\t\t\tborder-bottom-color: transparent !important;\n\t\t}\n\t}\n\n\t&[aria-hidden='true'] {\n\t\tvisibility: hidden;\n\t\ttransition: opacity var(--animation-quick), visibility var(--animation-quick);\n\t\topacity: 0;\n\t}\n\n\t&[aria-hidden='false'] {\n\t\tvisibility: visible;\n\t\ttransition: opacity var(--animation-quick);\n\t\topacity: 1;\n\t}\n}\n\n"],
      sourceRoot: ""
    }]), t.a = a;
  }, function (A, t) {}, function (A, t, e) {
    "use strict";

    e.r(t);
    var n = e(7),
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

    n.VTooltip.options.defaultTemplate = '<div class="vue-tooltip" role="tooltip" data-v-'.concat("6b494fc", '><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'), n.VTooltip.options.defaultHtml = !1;
    t.default = n.VTooltip;
  }, function (A, t, e) {
    "use strict";

    var n = e(0),
        o = e.n(n),
        i = e(1),
        a = e.n(i)()(o.a);
    a.push([A.i, ".vue-tooltip[data-v-6b494fc]{position:absolute;z-index:100000;right:auto;left:auto;display:block;margin:0;margin-top:-3px;padding:10px 0;text-align:left;text-align:start;opacity:0;line-height:1.6;line-break:auto;filter:drop-shadow(0 1px 10px var(--color-box-shadow))}.vue-tooltip[data-v-6b494fc][x-placement^='top'] .tooltip-arrow{bottom:0;margin-top:0;margin-bottom:0;border-width:10px 10px 0 10px;border-right-color:transparent;border-bottom-color:transparent;border-left-color:transparent}.vue-tooltip[data-v-6b494fc][x-placement^='bottom'] .tooltip-arrow{top:0;margin-top:0;margin-bottom:0;border-width:0 10px 10px 10px;border-top-color:transparent;border-right-color:transparent;border-left-color:transparent}.vue-tooltip[data-v-6b494fc][x-placement^='right'] .tooltip-arrow{right:100%;margin-right:0;margin-left:0;border-width:10px 10px 10px 0;border-top-color:transparent;border-bottom-color:transparent;border-left-color:transparent}.vue-tooltip[data-v-6b494fc][x-placement^='left'] .tooltip-arrow{left:100%;margin-right:0;margin-left:0;border-width:10px 0 10px 10px;border-top-color:transparent;border-right-color:transparent;border-bottom-color:transparent}.vue-tooltip[data-v-6b494fc][aria-hidden='true']{visibility:hidden;transition:opacity .15s, visibility .15s;opacity:0}.vue-tooltip[data-v-6b494fc][aria-hidden='false']{visibility:visible;transition:opacity .15s;opacity:1}.vue-tooltip[data-v-6b494fc] .tooltip-inner{max-width:350px;padding:5px 8px;text-align:center;color:var(--color-main-text);border-radius:var(--border-radius);background-color:var(--color-main-background)}.vue-tooltip[data-v-6b494fc] .tooltip-arrow{position:absolute;z-index:1;width:0;height:0;margin:0;border-style:solid;border-color:var(--color-main-background)}\n", "", {
      version: 3,
      sources: ["webpack://./index.scss"],
      names: [],
      mappings: "AAeA,6BACC,iBAAkB,CAClB,cAAe,CACf,UAAW,CACX,SAAU,CACV,aAAc,CACd,QAAS,CAET,eAAgB,CAChB,cAAe,CACf,eAAgB,CAChB,gBAAiB,CACjB,SAAU,CACV,eAAgB,CAEhB,eAAgB,CAChB,sDAAuD,CAhBxD,gEAqBG,QAAS,CACT,YAAa,CACb,eAAgB,CAChB,6BA1Be,CA2Bf,8BAA+B,CAC/B,+BAAgC,CAChC,6BAA8B,CA3BjC,mEAkCG,KAAM,CACN,YAAa,CACb,eAAgB,CAChB,6BAvCe,CAwCf,4BAA6B,CAC7B,8BAA+B,CAC/B,6BAA8B,CAxCjC,kEA+CG,UAAW,CACX,cAAe,CACf,aAAc,CACd,6BAAsD,CACtD,4BAA6B,CAC7B,+BAAgC,CAChC,6BAA8B,CArDjC,iEA4DG,SAAU,CACV,cAAe,CACf,aAAc,CACd,6BAjEe,CAkEf,4BAA6B,CAC7B,8BAA+B,CAC/B,+BAAgC,CAlEnC,iDAwEE,iBAAkB,CAClB,wCAAyC,CACzC,SAAU,CA1EZ,kDA6EE,kBAAmB,CACnB,uBAAwB,CACxB,SAAU,CA/EZ,4CAoFE,eAAgB,CAChB,eAAgB,CAChB,iBAAkB,CAClB,4BAA6B,CAC7B,kCAAmC,CACnC,6CAA8C,CAzFhD,4CA8FE,iBAAkB,CAClB,SAAU,CACV,OAAQ,CACR,QAAS,CACT,QAAS,CACT,kBAAmB,CACnB,yCAA0C",
      sourcesContent: ["$scope_version:\"6b494fc\"; @import 'variables';\n/**\n* @copyright Copyright (c) 2016, John Molakvoæ <skjnldsv@protonmail.com>\n* @copyright Copyright (c) 2016, Robin Appelman <robin@icewind.nl>\n* @copyright Copyright (c) 2016, Jan-Christoph Borchardt <hey@jancborchardt.net>\n* @copyright Copyright (c) 2016, Erik Pellikka <erik@pellikka.org>\n* @copyright Copyright (c) 2015, Vincent Petry <pvince81@owncloud.com>\n*\n* Bootstrap v3.3.5 (http://getbootstrap.com)\n* Copyright 2011-2015 Twitter, Inc.\n* Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)\n*/\n\n$arrow-width: 10px;\n\n.vue-tooltip[data-v-#{$scope_version}] {\n\tposition: absolute;\n\tz-index: 100000;\n\tright: auto;\n\tleft: auto;\n\tdisplay: block;\n\tmargin: 0;\n\t/* default to top */\n\tmargin-top: -3px;\n\tpadding: 10px 0;\n\ttext-align: left;\n\ttext-align: start;\n\topacity: 0;\n\tline-height: 1.6;\n\n\tline-break: auto;\n\tfilter: drop-shadow(0 1px 10px var(--color-box-shadow));\n\n\t// TOP\n\t&[x-placement^='top'] {\n\t\t.tooltip-arrow {\n\t\t\tbottom: 0;\n\t\t\tmargin-top: 0;\n\t\t\tmargin-bottom: 0;\n\t\t\tborder-width: $arrow-width $arrow-width 0 $arrow-width;\n\t\t\tborder-right-color: transparent;\n\t\t\tborder-bottom-color: transparent;\n\t\t\tborder-left-color: transparent;\n\t\t}\n\t}\n\n\t// BOTTOM\n\t&[x-placement^='bottom'] {\n\t\t.tooltip-arrow {\n\t\t\ttop: 0;\n\t\t\tmargin-top: 0;\n\t\t\tmargin-bottom: 0;\n\t\t\tborder-width: 0 $arrow-width $arrow-width $arrow-width;\n\t\t\tborder-top-color: transparent;\n\t\t\tborder-right-color: transparent;\n\t\t\tborder-left-color: transparent;\n\t\t}\n\t}\n\n\t// RIGHT\n\t&[x-placement^='right'] {\n\t\t.tooltip-arrow {\n\t\t\tright: 100%;\n\t\t\tmargin-right: 0;\n\t\t\tmargin-left: 0;\n\t\t\tborder-width: $arrow-width $arrow-width $arrow-width 0;\n\t\t\tborder-top-color: transparent;\n\t\t\tborder-bottom-color: transparent;\n\t\t\tborder-left-color: transparent;\n\t\t}\n\t}\n\n\t// LEFT\n\t&[x-placement^='left'] {\n\t\t.tooltip-arrow {\n\t\t\tleft: 100%;\n\t\t\tmargin-right: 0;\n\t\t\tmargin-left: 0;\n\t\t\tborder-width: $arrow-width 0 $arrow-width $arrow-width;\n\t\t\tborder-top-color: transparent;\n\t\t\tborder-right-color: transparent;\n\t\t\tborder-bottom-color: transparent;\n\t\t}\n\t}\n\n\t// HIDDEN / SHOWN\n\t&[aria-hidden='true'] {\n\t\tvisibility: hidden;\n\t\ttransition: opacity .15s, visibility .15s;\n\t\topacity: 0;\n\t}\n\t&[aria-hidden='false'] {\n\t\tvisibility: visible;\n\t\ttransition: opacity .15s;\n\t\topacity: 1;\n\t}\n\n\t// CONTENT\n\t.tooltip-inner {\n\t\tmax-width: 350px;\n\t\tpadding: 5px 8px;\n\t\ttext-align: center;\n\t\tcolor: var(--color-main-text);\n\t\tborder-radius: var(--border-radius);\n\t\tbackground-color: var(--color-main-background);\n\t}\n\n\t// ARROW\n\t.tooltip-arrow {\n\t\tposition: absolute;\n\t\tz-index: 1;\n\t\twidth: 0;\n\t\theight: 0;\n\t\tmargin: 0;\n\t\tborder-style: solid;\n\t\tborder-color: var(--color-main-background);\n\t}\n}\n"],
      sourceRoot: ""
    }]), t.a = a;
  },, function (A, t) {
    A.exports = __webpack_require__(/*! core-js/modules/es.string.replace.js */ "./node_modules/core-js/modules/es.string.replace.js");
  }, function (A, t) {
    A.exports = __webpack_require__(/*! core-js/modules/es.regexp.to-string.js */ "./node_modules/core-js/modules/es.regexp.to-string.js");
  }, function (A, t) {
    A.exports = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each.js */ "./node_modules/core-js/modules/web.dom-collections.for-each.js");
  }, function (A, t) {
    A.exports = __webpack_require__(/*! core-js/modules/es.array.concat.js */ "./node_modules/core-js/modules/es.array.concat.js");
  }, function (A, t, e) {
    "use strict";

    var n = {
      name: "Popover",
      components: {
        VPopover: e(7).VPopover
      },
      mounted: function mounted() {
        var A = this;
        this.$watch(function () {
          return A.$refs.popover.isOpen;
        }, function (t) {
          t ? A.$emit("after-show") : A.$emit("after-hide");
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
        g = Object(s.a)(n, function () {
      var A = this.$createElement,
          t = this._self._c || A;
      return t("VPopover", this._g(this._b({
        ref: "popover",
        attrs: {
          "popover-base-class": "popover",
          "popover-wrapper-class": "popover__wrapper",
          "popover-arrow-class": "popover__arrow",
          "popover-inner-class": "popover__inner"
        }
      }, "VPopover", this.$attrs, !1), this.$listeners), [this._t("trigger"), this._v(" "), t("template", {
        slot: "popover"
      }, [this._t("default")], 2)], 2);
    }, [], !1, null, null, null);
    "function" == typeof l.a && l()(g);
    t.a = g.exports;
  },,,, function (A, t) {
    A.exports = __webpack_require__(/*! core-js/modules/es.symbol.js */ "./node_modules/core-js/modules/es.symbol.js");
  }, function (A, t) {
    A.exports = __webpack_require__(/*! @nextcloud/l10n/dist/gettext */ "./node_modules/@nextcloud/l10n/dist/gettext.js");
  }, function (A, t, e) {
    "use strict";

    e(24), e(15), e(6), e(25);

    t.a = function (A) {
      return Math.random().toString(36).replace(/[^a-z]+/g, "").substr(0, A || 5);
    };
  },,,, function (A, t) {
    A.exports = __webpack_require__(/*! core-js/modules/es.symbol.description.js */ "./node_modules/core-js/modules/es.symbol.description.js");
  },,, function (A, t) {
    A.exports = __webpack_require__(/*! core-js/modules/es.array.slice.js */ "./node_modules/core-js/modules/es.array.slice.js");
  },,,,, function (A, t) {
    A.exports = __webpack_require__(/*! core-js/modules/es.symbol.iterator.js */ "./node_modules/core-js/modules/es.symbol.iterator.js");
  }, function (A, t, e) {
    "use strict";

    e.r(t);
    var n = e(28);
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

    t.default = n.a;
  },,, function (A, t, e) {
    "use strict";

    e(27), e(14), e(101);
    var n = e(5),
        o = e.n(n);

    t.a = function (A, t, e) {
      if (void 0 !== A) for (var n = A.length - 1; n >= 0; n--) {
        var i = A[n],
            a = !i.componentOptions && i.tag && -1 === t.indexOf(i.tag),
            r = !!i.componentOptions && "string" == typeof i.componentOptions.tag,
            s = r && -1 === t.indexOf(i.componentOptions.tag);
        (a || !r || s) && ((a || s) && o.a.util.warn("".concat(a ? i.tag : i.componentOptions.tag, " is not allowed inside the ").concat(e.$options.name, " component"), e), A.splice(n, 1));
      }
    };
  }, function (A, t) {
    A.exports = __webpack_require__(/*! core-js/modules/es.array.filter.js */ "./node_modules/core-js/modules/es.array.filter.js");
  }, function (A, t) {
    A.exports = __webpack_require__(/*! core-js/modules/es.array.from.js */ "./node_modules/core-js/modules/es.array.from.js");
  },,,,,,,,,,,,,,, function (A, t, e) {
    "use strict";

    var n = e(0),
        o = e.n(n),
        i = e(1),
        a = e.n(i),
        r = e(4),
        s = e.n(r),
        c = e(8),
        l = e(9),
        g = e(10),
        u = e(11),
        d = a()(o.a),
        m = s()(c.a),
        p = s()(l.a),
        C = s()(g.a),
        h = s()(u.a);
    d.push([A.i, '@font-face{font-family:"iconfont-vue-6b494fc";src:url(' + m + ");src:url(" + m + ') format("embedded-opentype"),url(' + p + ') format("woff"),url(' + C + ') format("truetype"),url(' + h + ') format("svg")}.icon[data-v-551c21fd]{font-style:normal;font-weight:400}.icon.arrow-left-double[data-v-551c21fd]:before{font-family:"iconfont-vue-6b494fc";content:""}.icon.arrow-left[data-v-551c21fd]:before{font-family:"iconfont-vue-6b494fc";content:""}.icon.arrow-right-double[data-v-551c21fd]:before{font-family:"iconfont-vue-6b494fc";content:""}.icon.arrow-right[data-v-551c21fd]:before{font-family:"iconfont-vue-6b494fc";content:""}.icon.breadcrumb[data-v-551c21fd]:before{font-family:"iconfont-vue-6b494fc";content:""}.icon.checkmark[data-v-551c21fd]:before{font-family:"iconfont-vue-6b494fc";content:""}.icon.close[data-v-551c21fd]:before{font-family:"iconfont-vue-6b494fc";content:""}.icon.confirm[data-v-551c21fd]:before{font-family:"iconfont-vue-6b494fc";content:""}.icon.info[data-v-551c21fd]:before{font-family:"iconfont-vue-6b494fc";content:""}.icon.menu[data-v-551c21fd]:before{font-family:"iconfont-vue-6b494fc";content:""}.icon.more[data-v-551c21fd]:before{font-family:"iconfont-vue-6b494fc";content:""}.icon.pause[data-v-551c21fd]:before{font-family:"iconfont-vue-6b494fc";content:""}.icon.play[data-v-551c21fd]:before{font-family:"iconfont-vue-6b494fc";content:""}.icon.triangle-s[data-v-551c21fd]:before{font-family:"iconfont-vue-6b494fc";content:""}.icon.user-status-away[data-v-551c21fd]:before{font-family:"iconfont-vue-6b494fc";content:""}.icon.user-status-dnd[data-v-551c21fd]:before{font-family:"iconfont-vue-6b494fc";content:""}.icon.user-status-invisible[data-v-551c21fd]:before{font-family:"iconfont-vue-6b494fc";content:""}.icon.user-status-online[data-v-551c21fd]:before{font-family:"iconfont-vue-6b494fc";content:""}.action-item[data-v-551c21fd]{position:relative;display:inline-block}.action-item--single[data-v-551c21fd]:hover,.action-item--single[data-v-551c21fd]:focus,.action-item--single[data-v-551c21fd]:active,.action-item__menutoggle[data-v-551c21fd]:hover,.action-item__menutoggle[data-v-551c21fd]:focus,.action-item__menutoggle[data-v-551c21fd]:active{opacity:1;background-color:rgba(127,127,127,0.25)}.action-item__menutoggle[data-v-551c21fd]:disabled,.action-item--single[data-v-551c21fd]:disabled{opacity:.3 !important}.action-item.action-item--open .action-item__menutoggle[data-v-551c21fd]{opacity:1;background-color:rgba(127,127,127,0.25)}.action-item--single[data-v-551c21fd],.action-item__menutoggle[data-v-551c21fd]{box-sizing:border-box;width:auto;min-width:44px;height:44px;margin:0;padding:14px;cursor:pointer;border:none;border-radius:22px;background-color:transparent}.action-item__menutoggle[data-v-551c21fd]{display:flex;align-items:center;justify-content:center;opacity:.7;font-weight:bold;line-height:16px}.action-item__menutoggle[data-v-551c21fd] span{width:16px;height:16px;line-height:16px}.action-item__menutoggle[data-v-551c21fd]:before{content:\'\'}.action-item__menutoggle--default-icon[data-v-551c21fd]:before{font-family:"iconfont-vue-6b494fc";font-style:normal;font-weight:400;content:""}.action-item__menutoggle--default-icon[data-v-551c21fd]::before{font-size:16px}.action-item__menutoggle--with-title[data-v-551c21fd]{position:relative;padding-left:44px;white-space:nowrap;opacity:1;border:1px solid var(--color-border-dark);background-color:var(--color-background-dark);background-position:14px center;font-size:inherit}.action-item__menutoggle--with-title[data-v-551c21fd]:before{position:absolute;top:14px;left:14px}.action-item__menutoggle--primary[data-v-551c21fd]{opacity:1;color:var(--color-primary-text);border:none;background-color:var(--color-primary-element)}.action-item--open .action-item__menutoggle--primary[data-v-551c21fd],.action-item__menutoggle--primary[data-v-551c21fd]:hover,.action-item__menutoggle--primary[data-v-551c21fd]:focus,.action-item__menutoggle--primary[data-v-551c21fd]:active{color:var(--color-primary-text) !important;background-color:var(--color-primary-element-light) !important}.action-item--single[data-v-551c21fd]{opacity:.7}.action-item--single[data-v-551c21fd]:hover,.action-item--single[data-v-551c21fd]:focus,.action-item--single[data-v-551c21fd]:active{opacity:1}.action-item--single>[hidden][data-v-551c21fd]{display:none}.ie .action-item__menu[data-v-551c21fd],.ie .action-item__menu .action-item__menu_arrow[data-v-551c21fd],.edge .action-item__menu[data-v-551c21fd],.edge .action-item__menu .action-item__menu_arrow[data-v-551c21fd]{border:1px solid var(--color-border)}\n', "", {
      version: 3,
      sources: ["webpack://./../../fonts/scss/iconfont-vue.scss", "webpack://./Actions.vue", "webpack://./../../assets/variables.scss"],
      names: [],
      mappings: "AA2FE,WACC,kCAAmC,CACnC,2CAAuC,CACvC,+OAGmD,CAMpD,uBACE,iBAAkB,CAClB,eAAgB,CAFlB,gDAMM,kCAAmC,CACnC,WA5Ge,CAAO,yCA0GL,kCACJ,CAAsB,WA1G3B,CAAA,iDAyGU,kCACL,CAAA,WAzGG,CAAA,0CAwGL,kCACE,CAAA,WAxGJ,CAAA,yCAuGC,kCACG,CAAA,WACN,CAxGC,wCAsGC,kCACI,CAAA,WACb,CAAO,oCAFF,kCACQ,CAAA,WACb,CAAA,sCAFO,kCACM,CAAA,WACb,CAAA,mCAFI,kCACS,CAAA,WACb,CAAA,mCAPD,kCAMc,CAAA,WACb,CAAA,mCAPD,kCAMc,CAAA,WACb,CAAA,oCAPD,kCAMc,CAAA,WACb,CAAA,mCAPD,kCAMc,CAAA,WAAsB,CACnC,yCAPD,kCAMc,CAAA,WAAA,CAAsB,+CANpC,kCAMc,CAAA,WAAA,CAAA,8CANd,kCAMc,CAAA,WAAA,CAAA,oDANd,kCAMc,CAAA,WAAA,CAAA,iDANd,kCAMc,CAAA,WAAA,CAAA,8BA1FG,iBC6nBZ,CACX,oBACA,CAAA,sRASC,SAAA,CAAY,uCCvnBE,CAAA,kGD+nBd,qBACA,CAAA,yEAGmB,SAAA,CAAA,uCCvnBK,CAAA,gFD8nBxB,qBACA,CAAA,UAAY,CAAA,cACL,CAAA,WACP,CAAS,QACT,CAAA,YACA,CAAA,cClpBY,CAAA,WDopBJ,CAAA,kBAER,CAAA,4BACA,CAAA,0CACA,YAAA,CAAA,kBAMA,CAAA,sBACA,CAAA,UAAe,CAAE,gBCrpBF,CAAE,gBDupBJ,CAAI,+CANjB,UAUA,CAAA,WACC,CAAK,gBC1qBI,CAAI,iDD+pBd,UAAY,CAAA,+DAkBX,kCD7sBF,CAAA,iBAAsB,CAkFnB,eAAY,CAAA,WACZ,CAAA,gEC4nBD,cAAc,CAAA,sDAIb,iBAAA,CAGW,iBACF,CAAQ,kBC/rBA,CDisBlB,SAAA,CAAA,yCAEkB,CAAA,6CAEA,CAAA,+BAClB,CAAA,iBAAkC,CAAM,6DARxC,iBAAY,CAWJ,QACP,CAAQ,SAAU,CAClB,mDAEA,SAAA,CAAA,+BAKM,CAAA,WAAA,CAAA,6CAEW,CAAA,kPAJlB,0CASQ,CAAA,8DACW,CAAA,sCAClB,UAAA,CAAA,qIAIF,SAAA,CAAA,+CAAA,YAQI,CAAA,sNASc,oCACA",
      sourcesContent: ['$__iconfont__data: map-merge(if(global_variable_exists(\'__iconfont__data\'), $__iconfont__data, ()), (\n\t"iconfont-vue-6b494fc": (\n\t\t"arrow-left-double": "\\ea01",\n\t\t"arrow-left": "\\ea02",\n\t\t"arrow-right-double": "\\ea03",\n\t\t"arrow-right": "\\ea04",\n\t\t"breadcrumb": "\\ea05",\n\t\t"checkmark": "\\ea06",\n\t\t"close": "\\ea07",\n\t\t"confirm": "\\ea08",\n\t\t"info": "\\ea09",\n\t\t"menu": "\\ea0a",\n\t\t"more": "\\ea0b",\n\t\t"pause": "\\ea0c",\n\t\t"play": "\\ea0d",\n\t\t"triangle-s": "\\ea0e",\n\t\t"user-status-away": "\\ea0f",\n\t\t"user-status-dnd": "\\ea10",\n\t\t"user-status-invisible": "\\ea11",\n\t\t"user-status-online": "\\ea12"\n\t)\n));\n\n\n$create-font-face: true !default; // should the @font-face tag get created?\n\n// should there be a custom class for each icon? will be .filename\n$create-icon-classes: true !default; \n\n// what is the common class name that icons share? in this case icons need to have .icon.filename in their classes\n// this requires you to have 2 classes on each icon html element, but reduced redeclaration of the font family\n// for each icon\n$icon-common-class: \'icon\' !default;\n\n// if you whish to prefix your filenames, here you can do so.\n// if this string stays empty, your classes will use the filename, for example\n// an icon called star.svg will result in a class called .star\n// if you use the prefix to be \'icon-\' it would result in .icon-star\n$icon-prefix: \'\' !default; \n\n// helper function to get the correct font group\n@function iconfont-group($group: null) {\n  @if (null == $group) {\n    $group: nth(map-keys($__iconfont__data), 1);\n  }\n  @if (false == map-has-key($__iconfont__data, $group)) {\n    @warn \'Undefined Iconfont Family!\';\n    @return ();\n  }\n  @return map-get($__iconfont__data, $group);\n}\n\n// helper function to get the correct icon of a group\n@function iconfont-item($name) {\n  $slash: str-index($name, \'/\');\n  $group: null;\n  @if ($slash) {\n    $group: str-slice($name, 0, $slash - 1);\n    $name: str-slice($name, $slash + 1);\n  } @else {\n    $group: nth(map-keys($__iconfont__data), 1);\n  }\n  $group: iconfont-group($group);\n  @if (false == map-has-key($group, $name)) {\n    @warn \'Undefined Iconfont Glyph!\';\n    @return \'\';\n  }\n  @return map-get($group, $name);\n}\n\n// complete mixing to include the icon\n// usage:\n// .my_icon{ @include iconfont(\'star\') }\n@mixin iconfont($icon) {\n  $slash: str-index($icon, \'/\');\n  $group: null;\n  @if ($slash) {\n    $group: str-slice($icon, 0, $slash - 1);\n  } @else {\n    $group: nth(map-keys($__iconfont__data), 1);\n  }\n  &:before {\n    font-family: $group;\n    font-style: normal;\n    font-weight: 400;\n    content: iconfont-item($icon);\n  }\n}\n\n// creates the font face tag if the variable is set to true (default)\n@if $create-font-face == true {\n  @font-face {\n   font-family: "iconfont-vue-6b494fc";\n   src: url(\'../iconfont-vue-6b494fc.eot\'); /* IE9 Compat Modes */\n   src: url(\'../iconfont-vue-6b494fc.eot?#iefix\') format(\'embedded-opentype\'), /* IE6-IE8 */\n      url(\'../iconfont-vue-6b494fc.woff\') format(\'woff\'), /* Pretty Modern Browsers */\n      url(\'../iconfont-vue-6b494fc.ttf\')  format(\'truetype\'), /* Safari, Android, iOS */\n      url(\'../iconfont-vue-6b494fc.svg\') format(\'svg\'); /* Legacy iOS */\n  }\n}\n\n// creates icon classes for each individual loaded svg (default)\n@if $create-icon-classes == true {\n  .#{$icon-common-class} {\n    font-style: normal;\n    font-weight: 400;\n\n    @each $icon, $content in map-get($__iconfont__data, "iconfont-vue-6b494fc") {\n      &.#{$icon-prefix}#{$icon}:before {\n        font-family: "iconfont-vue-6b494fc";\n        content: iconfont-item("iconfont-vue-6b494fc/#{$icon}");\n      }\n    }\n  }\n}\n', "$scope_version:\"6b494fc\"; @import 'variables';\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n@import '../../fonts/scss/iconfont-vue';\n\n.action-item {\n\tposition: relative;\n\tdisplay: inline-block;\n\n\t// put a grey round background when menu is opened\n\t// or hover-focused\n\t&--single:hover,\n\t&--single:focus,\n\t&--single:active,\n\t&__menutoggle:hover,\n\t&__menutoggle:focus,\n\t&__menutoggle:active {\n\t\topacity: $opacity_full;\n\t\t// good looking on dark AND white bg\n\t\tbackground-color: $icon-focus-bg;\n\t}\n\n\t// TODO: handle this in the future button component\n\t&__menutoggle:disabled,\n\t&--single:disabled {\n\t\topacity: .3 !important;\n\t}\n\n\t&.action-item--open .action-item__menutoggle {\n\t\topacity: $opacity_full;\n\t\tbackground-color: $action-background-hover;\n\t}\n\n\t// icons\n\t&--single,\n\t&__menutoggle {\n\t\tbox-sizing: border-box;\n\t\twidth: auto;\n\t\tmin-width: $clickable-area;\n\t\theight: $clickable-area;\n\t\tmargin: 0;\n\t\tpadding: $icon-margin;\n\t\tcursor: pointer;\n\t\tborder: none;\n\t\tborder-radius: $clickable-area / 2;\n\t\tbackground-color: transparent;\n\t}\n\n\t// icon-more\n\t&__menutoggle {\n\t\t// align menu icon in center\n\t\tdisplay: flex;\n\t\talign-items: center;\n\t\tjustify-content: center;\n\t\topacity: $opacity_normal;\n\t\tfont-weight: bold;\n\t\tline-height: $icon-size;\n\n\t\t// image slot\n\t\t/deep/ span {\n\t\t\twidth: $icon-size;\n\t\t\theight: $icon-size;\n\t\t\tline-height: $icon-size;\n\t\t}\n\n\t\t&:before {\n\t\t\tcontent: '';\n\t\t}\n\n\t\t&--default-icon {\n\t\t\t@include iconfont('more');\n\t\t\t&::before {\n\t\t\t\tfont-size: $icon-size;\n\t\t\t}\n\t\t}\n\n\t\t&--with-title {\n\t\t\tposition: relative;\n\t\t\tpadding-left: $clickable-area;\n\t\t\twhite-space: nowrap;\n\t\t\topacity: $opacity_full;\n\t\t\tborder: 1px solid var(--color-border-dark);\n\t\t\t// with a title, we need to display this as a real button\n\t\t\tbackground-color: var(--color-background-dark);\n\t\t\tbackground-position: $icon-margin center;\n\t\t\tfont-size: inherit;\n\t\t\t// non-background icon class\n\t\t\t&:before {\n\t\t\t\tposition: absolute;\n\t\t\t\ttop: $icon-margin;\n\t\t\t\tleft: $icon-margin;\n\t\t\t}\n\t\t}\n\n\t\t&--primary {\n\t\t\topacity: $opacity_full;\n\t\t\tcolor: var(--color-primary-text);\n\t\t\tborder: none;\n\t\t\tbackground-color: var(--color-primary-element);\n\t\t\t.action-item--open &,\n\t\t\t&:hover,\n\t\t\t&:focus,\n\t\t\t&:active {\n\t\t\t\tcolor: var(--color-primary-text) !important;\n\t\t\t\tbackground-color: var(--color-primary-element-light) !important;\n\t\t\t}\n\t\t}\n\t}\n\n\t&--single {\n\t\topacity: $opacity_normal;\n\t\t&:hover,\n\t\t&:focus,\n\t\t&:active {\n\t\t\topacity: $opacity_full;\n\t\t}\n\t\t// hide anything the slot is displaying\n\t\t& > [hidden] {\n\t\t\tdisplay: none;\n\t\t}\n\t}\n}\n\n.ie,\n.edge {\n\t.action-item__menu,\n\t.action-item__menu .action-item__menu_arrow {\n\t\tborder: 1px solid var(--color-border);\n\t}\n}\n\n", "/**\n * @copyright Copyright (c) 2019 John Molakvoæ <skjnldsv@protonmail.com>\n *\n * @author John Molakvoæ <skjnldsv@protonmail.com>\n *\n * @license GNU AGPL version 3 or any later version\n *\n * This program is free software: you can redistribute it and/or modify\n * it under the terms of the GNU Affero General Public License as\n * published by the Free Software Foundation, either version 3 of the\n * License, or (at your option) any later version.\n *\n * This program is distributed in the hope that it will be useful,\n * but WITHOUT ANY WARRANTY; without even the implied warranty of\n * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the\n * GNU Affero General Public License for more details.\n *\n * You should have received a copy of the GNU Affero General Public License\n * along with this program. If not, see <http://www.gnu.org/licenses/>.\n *\n */\n\n// https://uxplanet.org/7-rules-for-mobile-ui-button-design-e9cf2ea54556\n// recommended is 48px\n// 44px is what we choose and have very good visual-to-usability ratio\n$clickable-area: 44px;\n\n// background icon size\n// also used for the scss icon font\n$icon-size: 16px;\n\n// icon padding for a $clickable-area width and a $icon-size icon\n// ( 44px - 16px ) / 2\n$icon-margin: ($clickable-area - $icon-size) / 2;\n\n// transparency background for icons\n$icon-focus-bg: rgba(127, 127, 127, .25);\n\n// popovermenu arrow width from the triangle center\n$arrow-width: 9px;\n\n// opacities\n$opacity_disabled: .5;\n$opacity_normal: .7;\n$opacity_full: 1;\n\n// menu round background hover feedback\n// good looking on dark AND white bg\n$action-background-hover: rgba(127, 127, 127, .25);\n\n// various structure data used in the \n// `AppNavigation` component\n$header-height: 50px;\n$navigation-width: 300px;\n\n// mobile breakpoint\n$breakpoint-mobile: 1024px;\n"],
      sourceRoot: ""
    }]), t.a = d;
  }, function (A, t) {}, function (A, t) {
    A.exports = __webpack_require__(/*! core-js/modules/es.object.keys.js */ "./node_modules/core-js/modules/es.object.keys.js");
  },, function (A, t) {
    A.exports = __webpack_require__(/*! core-js/modules/es.object.get-own-property-descriptor.js */ "./node_modules/core-js/modules/es.object.get-own-property-descriptor.js");
  }, function (A, t) {
    A.exports = __webpack_require__(/*! core-js/modules/es.object.get-own-property-descriptors.js */ "./node_modules/core-js/modules/es.object.get-own-property-descriptors.js");
  }, function (A, t, e) {
    "use strict";

    e.r(t);
    var n = e(85);
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

    t.default = n.a;
  },,,,,,,,,,,, function (A, t, e) {
    "use strict";

    e(27), e(51), e(69), e(32), e(71), e(26), e(72), e(38), e(6), e(46), e(16), e(17), e(18), e(52), e(41), e(14);
    var n = e(21),
        o = e(34),
        i = e(50),
        a = e(12),
        r = e(47);

    function s(A) {
      return function (A) {
        if (Array.isArray(A)) return c(A);
      }(A) || function (A) {
        if ("undefined" != typeof Symbol && Symbol.iterator in Object(A)) return Array.from(A);
      }(A) || function (A, t) {
        if (!A) return;
        if ("string" == typeof A) return c(A, t);
        var e = Object.prototype.toString.call(A).slice(8, -1);
        "Object" === e && A.constructor && (e = A.constructor.name);
        if ("Map" === e || "Set" === e) return Array.from(A);
        if ("Arguments" === e || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)) return c(A, t);
      }(A) || function () {
        throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }();
    }

    function c(A, t) {
      (null == t || t > A.length) && (t = A.length);

      for (var e = 0, n = new Array(t); e < t; e++) {
        n[e] = A[e];
      }

      return n;
    }

    function l(A, t) {
      var e = Object.keys(A);

      if (Object.getOwnPropertySymbols) {
        var n = Object.getOwnPropertySymbols(A);
        t && (n = n.filter(function (t) {
          return Object.getOwnPropertyDescriptor(A, t).enumerable;
        })), e.push.apply(e, n);
      }

      return e;
    }

    function g(A) {
      for (var t = 1; t < arguments.length; t++) {
        var e = null != arguments[t] ? arguments[t] : {};
        t % 2 ? l(Object(e), !0).forEach(function (t) {
          u(A, t, e[t]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(A, Object.getOwnPropertyDescriptors(e)) : l(Object(e)).forEach(function (t) {
          Object.defineProperty(A, t, Object.getOwnPropertyDescriptor(e, t));
        });
      }

      return A;
    }

    function u(A, t, e) {
      return t in A ? Object.defineProperty(A, t, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }) : A[t] = e, A;
    }

    var d = ["ActionButton", "ActionCheckbox", "ActionInput", "ActionLink", "ActionRadio", "ActionRouter", "ActionSeparator", "ActionText", "ActionTextEditable"],
        m = {
      name: "Actions",
      directives: {
        tooltip: n.default
      },
      components: {
        Popover: r.default,
        VNodes: {
          functional: !0,
          render: function render(A, t) {
            return t.props.vnodes;
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
            var A = this.firstActionVNode.componentOptions.tag;
            if ("ActionLink" === A) return g(g({
              is: "a",
              href: this.firstAction.href,
              target: this.firstAction.target,
              "aria-label": this.firstAction.ariaLabel
            }, this.firstAction.$attrs), this.firstAction.$props);
            if ("ActionRouter" === A) return g(g({
              is: "router-link",
              to: this.firstAction.to,
              exact: this.firstAction.exact,
              "aria-label": this.firstAction.ariaLabel
            }, this.firstAction.$attrs), this.firstAction.$props);
            if ("ActionButton" === A) return g(g({
              is: "button",
              "aria-label": this.firstAction.ariaLabel
            }, this.firstAction.$attrs), this.firstAction.$props);
          }

          return null;
        },
        firstActionEvent: function firstActionEvent() {
          var A, t, e;
          return null === (A = this.firstActionVNode) || void 0 === A || null === (t = A.componentOptions) || void 0 === t || null === (e = t.listeners) || void 0 === e ? void 0 : e.click;
        },
        firstActionEventBinding: function firstActionEventBinding() {
          return this.firstActionEvent ? "click" : null;
        },
        firstActionIconSlot: function firstActionIconSlot() {
          var A, t;
          return null === (A = this.firstAction) || void 0 === A || null === (t = A.$slots) || void 0 === t ? void 0 : t.icon;
        },
        firstActionClass: function firstActionClass() {
          var A = this.firstActionVNode && this.firstActionVNode.data.staticClass,
              t = this.firstActionVNode && this.firstActionVNode.data.class;
          return "".concat(A, " ").concat(t);
        },
        iconSlotIsPopulated: function iconSlotIsPopulated() {
          return !!this.$slots.icon;
        }
      },
      watch: {
        open: function open(A) {
          A !== this.opened && (this.opened = A);
        }
      },
      beforeMount: function beforeMount() {
        this.initActions(), Object(i.a)(this.$slots.default, d, this);
      },
      beforeUpdate: function beforeUpdate() {
        this.initActions(), Object(i.a)(this.$slots.default, d, this);
      },
      methods: {
        openMenu: function openMenu(A) {
          this.opened || (this.opened = !0, this.$emit("update:open", !0), this.$emit("open"));
        },
        closeMenu: function closeMenu(A) {
          this.opened && (this.opened = !1, this.$emit("update:open", !1), this.$emit("close"), this.opened = !1, this.focusIndex = 0, this.$refs.menuButton.focus());
        },
        onOpen: function onOpen(A) {
          var t = this;
          this.$nextTick(function () {
            t.focusFirstAction(A);
          });
        },
        onMouseFocusAction: function onMouseFocusAction(A) {
          if (document.activeElement !== A.target) {
            var t = A.target.closest("li");

            if (t) {
              var e = t.querySelector(".focusable");

              if (e) {
                var n = s(this.$refs.menu.querySelectorAll(".focusable")).indexOf(e);
                n > -1 && (this.focusIndex = n, this.focusAction());
              }
            }
          }
        },
        removeCurrentActive: function removeCurrentActive() {
          var A = this.$refs.menu.querySelector("li.active");
          A && A.classList.remove("active");
        },
        focusAction: function focusAction() {
          var A = this.$refs.menu.querySelectorAll(".focusable")[this.focusIndex];

          if (A) {
            this.removeCurrentActive();
            var t = A.closest("li.action");
            A.focus(), t && t.classList.add("active");
          }
        },
        focusPreviousAction: function focusPreviousAction(A) {
          this.opened && (0 === this.focusIndex ? this.closeMenu() : (this.preventIfEvent(A), this.focusIndex = this.focusIndex - 1), this.focusAction());
        },
        focusNextAction: function focusNextAction(A) {
          if (this.opened) {
            var t = this.$refs.menu.querySelectorAll(".focusable").length - 1;
            this.focusIndex === t ? this.closeMenu() : (this.preventIfEvent(A), this.focusIndex = this.focusIndex + 1), this.focusAction();
          }
        },
        focusFirstAction: function focusFirstAction(A) {
          this.opened && (this.preventIfEvent(A), this.focusIndex = 0, this.focusAction());
        },
        focusLastAction: function focusLastAction(A) {
          this.opened && (this.preventIfEvent(A), this.focusIndex = this.$el.querySelectorAll(".focusable").length - 1, this.focusAction());
        },
        preventIfEvent: function preventIfEvent(A) {
          A && (A.preventDefault(), A.stopPropagation());
        },
        execFirstAction: function execFirstAction(A) {
          this.firstActionEvent && this.firstActionEvent(A);
        },
        initActions: function initActions() {
          this.actions = (this.$slots.default || []).filter(function (A) {
            return !!A && !!A.componentOptions;
          });
        },
        onFocus: function onFocus(A) {
          this.$emit("focus", A);
        },
        onBlur: function onBlur(A) {
          this.$emit("blur", A);
        }
      }
    },
        p = e(2),
        C = e.n(p),
        h = e(67),
        f = {
      insert: "head",
      singleton: !1
    },
        B = (C()(h.a, f), h.a.locals, e(3)),
        y = e(68),
        b = e.n(y),
        I = Object(B.a)(m, function () {
      var A,
          t,
          e = this,
          n = e.$createElement,
          o = e._self._c || n;
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
        class: (A = {}, A[e.firstAction.icon] = !e.iconSlotIsPopulated, A[e.firstActionClass] = !e.iconSlotIsPopulated, A),
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
          "update:open": function updateOpen(A) {
            e.opened = A;
          },
          show: e.openMenu,
          "after-show": e.onOpen,
          hide: e.closeMenu
        }
      }, [o("button", {
        ref: "menuButton",
        staticClass: "icon action-item__menutoggle",
        class: (t = {}, t[e.defaultIcon] = !e.iconSlotIsPopulated, t["action-item__menutoggle--with-title"] = e.menuTitle, t["action-item__menutoggle--primary"] = e.primary, t),
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
          keydown: [function (A) {
            return !A.type.indexOf("key") && e._k(A.keyCode, "up", 38, A.key, ["Up", "ArrowUp"]) || A.ctrlKey || A.shiftKey || A.altKey || A.metaKey ? null : e.focusPreviousAction(A);
          }, function (A) {
            return !A.type.indexOf("key") && e._k(A.keyCode, "down", 40, A.key, ["Down", "ArrowDown"]) || A.ctrlKey || A.shiftKey || A.altKey || A.metaKey ? null : e.focusNextAction(A);
          }, function (A) {
            return !A.type.indexOf("key") && e._k(A.keyCode, "tab", 9, A.key, "Tab") || A.ctrlKey || A.shiftKey || A.altKey || A.metaKey ? null : e.focusNextAction(A);
          }, function (A) {
            return !A.type.indexOf("key") && e._k(A.keyCode, "tab", 9, A.key, "Tab") ? null : A.shiftKey ? A.ctrlKey || A.altKey || A.metaKey ? null : e.focusPreviousAction(A) : null;
          }, function (A) {
            return !A.type.indexOf("key") && e._k(A.keyCode, "page-up", void 0, A.key, void 0) || A.ctrlKey || A.shiftKey || A.altKey || A.metaKey ? null : e.focusFirstAction(A);
          }, function (A) {
            return !A.type.indexOf("key") && e._k(A.keyCode, "page-down", void 0, A.key, void 0) || A.ctrlKey || A.shiftKey || A.altKey || A.metaKey ? null : e.focusLastAction(A);
          }, function (A) {
            return !A.type.indexOf("key") && e._k(A.keyCode, "esc", 27, A.key, ["Esc", "Escape"]) || A.ctrlKey || A.shiftKey || A.altKey || A.metaKey ? null : (A.preventDefault(), e.closeMenu(A));
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
    "function" == typeof b.a && b()(I);
    t.a = I.exports;
  },,,,,,,,,,,,,,,, function (A, t) {
    A.exports = __webpack_require__(/*! core-js/modules/es.array.splice.js */ "./node_modules/core-js/modules/es.array.splice.js");
  }]);
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./node_modules/@nextcloud/vue/dist/Components/PopoverMenu.js":
/*!********************************************************************!*\
  !*** ./node_modules/@nextcloud/vue/dist/Components/PopoverMenu.js ***!
  \********************************************************************/
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

    function e(i) {
      if (n[i]) return n[i].exports;
      var a = n[i] = {
        i: i,
        l: !1,
        exports: {}
      };
      return t[i].call(a.exports, a, a.exports, e), a.l = !0, a.exports;
    }

    return e.m = t, e.c = n, e.d = function (t, n, i) {
      e.o(t, n) || Object.defineProperty(t, n, {
        enumerable: !0,
        get: i
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
      var i = Object.create(null);
      if (e.r(i), Object.defineProperty(i, "default", {
        enumerable: !0,
        value: t
      }), 2 & n && "string" != typeof t) for (var a in t) {
        e.d(i, a, function (n) {
          return t[n];
        }.bind(null, a));
      }
      return i;
    }, e.n = function (t) {
      var n = t && t.__esModule ? function () {
        return t.default;
      } : function () {
        return t;
      };
      return e.d(n, "a", n), n;
    }, e.o = function (t, n) {
      return Object.prototype.hasOwnProperty.call(t, n);
    }, e.p = "/dist/", e(e.s = 77);
  }({
    0: function _(t, n, e) {
      "use strict";

      function i(t, n) {
        return function (t) {
          if (Array.isArray(t)) return t;
        }(t) || function (t, n) {
          if ("undefined" == typeof Symbol || !(Symbol.iterator in Object(t))) return;
          var e = [],
              i = !0,
              a = !1,
              o = void 0;

          try {
            for (var s, r = t[Symbol.iterator](); !(i = (s = r.next()).done) && (e.push(s.value), !n || e.length !== n); i = !0) {
              ;
            }
          } catch (t) {
            a = !0, o = t;
          } finally {
            try {
              i || null == r.return || r.return();
            } finally {
              if (a) throw o;
            }
          }

          return e;
        }(t, n) || function (t, n) {
          if (!t) return;
          if ("string" == typeof t) return a(t, n);
          var e = Object.prototype.toString.call(t).slice(8, -1);
          "Object" === e && t.constructor && (e = t.constructor.name);
          if ("Map" === e || "Set" === e) return Array.from(t);
          if ("Arguments" === e || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)) return a(t, n);
        }(t, n) || function () {
          throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        }();
      }

      function a(t, n) {
        (null == n || n > t.length) && (n = t.length);

        for (var e = 0, i = new Array(n); e < n; e++) {
          i[e] = t[e];
        }

        return i;
      }

      t.exports = function (t) {
        var n = i(t, 4),
            e = n[1],
            a = n[3];

        if ("function" == typeof btoa) {
          var o = btoa(unescape(encodeURIComponent(JSON.stringify(a)))),
              s = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(o),
              r = "/*# ".concat(s, " */"),
              l = a.sources.map(function (t) {
            return "/*# sourceURL=".concat(a.sourceRoot || "").concat(t, " */");
          });
          return [e].concat(l).concat([r]).join("\n");
        }

        return [e].join("\n");
      };
    },
    1: function _(t, n, e) {
      "use strict";

      t.exports = function (t) {
        var n = [];
        return n.toString = function () {
          return this.map(function (n) {
            var e = t(n);
            return n[2] ? "@media ".concat(n[2], " {").concat(e, "}") : e;
          }).join("");
        }, n.i = function (t, e, i) {
          "string" == typeof t && (t = [[null, t, ""]]);
          var a = {};
          if (i) for (var o = 0; o < this.length; o++) {
            var s = this[o][0];
            null != s && (a[s] = !0);
          }

          for (var r = 0; r < t.length; r++) {
            var l = [].concat(t[r]);
            i && a[l[0]] || (e && (l[2] ? l[2] = "".concat(e, " and ").concat(l[2]) : l[2] = e), n.push(l));
          }
        }, n;
      };
    },
    16: function _(t, n) {
      t.exports = __webpack_require__(/*! core-js/modules/es.string.iterator.js */ "./node_modules/core-js/modules/es.string.iterator.js");
    },
    17: function _(t, n) {
      t.exports = __webpack_require__(/*! core-js/modules/es.array.iterator.js */ "./node_modules/core-js/modules/es.array.iterator.js");
    },
    18: function _(t, n) {
      t.exports = __webpack_require__(/*! core-js/modules/web.dom-collections.iterator.js */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");
    },
    2: function _(t, n, e) {
      "use strict";

      var i,
          a = function a() {
        return void 0 === i && (i = Boolean(window && document && document.all && !window.atob)), i;
      },
          o = function () {
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
          s = [];

      function r(t) {
        for (var n = -1, e = 0; e < s.length; e++) {
          if (s[e].identifier === t) {
            n = e;
            break;
          }
        }

        return n;
      }

      function l(t, n) {
        for (var e = {}, i = [], a = 0; a < t.length; a++) {
          var o = t[a],
              l = n.base ? o[0] + n.base : o[0],
              c = e[l] || 0,
              d = "".concat(l, " ").concat(c);
          e[l] = c + 1;
          var p = r(d),
              u = {
            css: o[1],
            media: o[2],
            sourceMap: o[3]
          };
          -1 !== p ? (s[p].references++, s[p].updater(u)) : s.push({
            identifier: d,
            updater: h(u, n),
            references: 1
          }), i.push(d);
        }

        return i;
      }

      function c(t) {
        var n = document.createElement("style"),
            i = t.attributes || {};

        if (void 0 === i.nonce) {
          var a = e.nc;
          a && (i.nonce = a);
        }

        if (Object.keys(i).forEach(function (t) {
          n.setAttribute(t, i[t]);
        }), "function" == typeof t.insert) t.insert(n);else {
          var s = o(t.insert || "head");
          if (!s) throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
          s.appendChild(n);
        }
        return n;
      }

      var d,
          p = (d = [], function (t, n) {
        return d[t] = n, d.filter(Boolean).join("\n");
      });

      function u(t, n, e, i) {
        var a = e ? "" : i.media ? "@media ".concat(i.media, " {").concat(i.css, "}") : i.css;
        if (t.styleSheet) t.styleSheet.cssText = p(n, a);else {
          var o = document.createTextNode(a),
              s = t.childNodes;
          s[n] && t.removeChild(s[n]), s.length ? t.insertBefore(o, s[n]) : t.appendChild(o);
        }
      }

      function m(t, n, e) {
        var i = e.css,
            a = e.media,
            o = e.sourceMap;
        if (a ? t.setAttribute("media", a) : t.removeAttribute("media"), o && "undefined" != typeof btoa && (i += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(o)))), " */")), t.styleSheet) t.styleSheet.cssText = i;else {
          for (; t.firstChild;) {
            t.removeChild(t.firstChild);
          }

          t.appendChild(document.createTextNode(i));
        }
      }

      var f = null,
          b = 0;

      function h(t, n) {
        var e, i, a;

        if (n.singleton) {
          var o = b++;
          e = f || (f = c(n)), i = u.bind(null, e, o, !1), a = u.bind(null, e, o, !0);
        } else e = c(n), i = m.bind(null, e, n), a = function a() {
          !function (t) {
            if (null === t.parentNode) return !1;
            t.parentNode.removeChild(t);
          }(e);
        };

        return i(t), function (n) {
          if (n) {
            if (n.css === t.css && n.media === t.media && n.sourceMap === t.sourceMap) return;
            i(t = n);
          } else a();
        };
      }

      t.exports = function (t, n) {
        (n = n || {}).singleton || "boolean" == typeof n.singleton || (n.singleton = a());
        var e = l(t = t || [], n);
        return function (t) {
          if (t = t || [], "[object Array]" === Object.prototype.toString.call(t)) {
            for (var i = 0; i < e.length; i++) {
              var a = r(e[i]);
              s[a].references--;
            }

            for (var o = l(t, n), c = 0; c < e.length; c++) {
              var d = r(e[c]);
              0 === s[d].references && (s[d].updater(), s.splice(d, 1));
            }

            e = o;
          }
        };
      };
    },
    25: function _(t, n) {
      t.exports = __webpack_require__(/*! core-js/modules/es.regexp.to-string.js */ "./node_modules/core-js/modules/es.regexp.to-string.js");
    },
    3: function _(t, n, e) {
      "use strict";

      function i(t, n, e, i, a, o, s, r) {
        var l,
            c = "function" == typeof t ? t.options : t;
        if (n && (c.render = n, c.staticRenderFns = e, c._compiled = !0), i && (c.functional = !0), o && (c._scopeId = "data-v-" + o), s ? (l = function l(t) {
          (t = t || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) || "undefined" == typeof __VUE_SSR_CONTEXT__ || (t = __VUE_SSR_CONTEXT__), a && a.call(this, t), t && t._registeredComponents && t._registeredComponents.add(s);
        }, c._ssrRegister = l) : a && (l = r ? function () {
          a.call(this, (c.functional ? this.parent : this).$root.$options.shadowRoot);
        } : a), l) if (c.functional) {
          c._injectStyles = l;
          var d = c.render;

          c.render = function (t, n) {
            return l.call(n), d(t, n);
          };
        } else {
          var p = c.beforeCreate;
          c.beforeCreate = p ? [].concat(p, l) : [l];
        }
        return {
          exports: t,
          options: c
        };
      }

      e.d(n, "a", function () {
        return i;
      });
    },
    40: function _(t, n) {
      t.exports = __webpack_require__(/*! core-js/modules/web.url.js */ "./node_modules/core-js/modules/web.url.js");
    },
    53: function _(t, n, e) {
      "use strict";

      var i = e(0),
          a = e.n(i),
          o = e(1),
          s = e.n(o)()(a.a);
      s.push([t.i, "\nbutton.menuitem[data-v-febed9b6] {\n\ttext-align: left;\n}\nbutton.menuitem *[data-v-febed9b6] {\n\tcursor: pointer;\n}\nbutton.menuitem[data-v-febed9b6]:disabled {\n\topacity: 0.5 !important;\n\tcursor: default;\n}\nbutton.menuitem:disabled *[data-v-febed9b6] {\n\tcursor: default;\n}\n.menuitem.active[data-v-febed9b6] {\n\tbox-shadow: inset 2px 0 var(--color-primary);\n\tborder-radius: 0;\n}\n", "", {
        version: 3,
        sources: ["webpack://./PopoverMenuItem.vue"],
        names: [],
        mappings: ";AAmLA;CACA,gBAAA;AACA;AAEA;CACA,eAAA;AACA;AAEA;CACA,uBAAA;CACA,eAAA;AACA;AAEA;CACA,eAAA;AACA;AAEA;CACA,4CAAA;CACA,gBAAA;AACA",
        sourcesContent: ['\x3c!--\n  - @copyright Copyright (c) 2018 John Molakvoæ <skjnldsv@protonmail.com>\n  -\n  - @author John Molakvoæ <skjnldsv@protonmail.com>\n  -\n  - @license GNU AGPL version 3 or any later version\n  -\n  - This program is free software: you can redistribute it and/or modify\n  - it under the terms of the GNU Affero General Public License as\n  - published by the Free Software Foundation, either version 3 of the\n  - License, or (at your option) any later version.\n  -\n  - This program is distributed in the hope that it will be useful,\n  - but WITHOUT ANY WARRANTY; without even the implied warranty of\n  - MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the\n  - GNU Affero General Public License for more details.\n  -\n  - You should have received a copy of the GNU Affero General Public License\n  - along with this program. If not, see <http://www.gnu.org/licenses/>.\n  -\n  --\x3e\n\n<template>\n\t<li class="popover__menuitem">\n\t\t\x3c!-- If item.href is set, a link will be directly used --\x3e\n\t\t<a v-if="item.href"\n\t\t\t:href="(item.href) ? item.href : \'#\' "\n\t\t\t:target="(item.target) ? item.target : \'\' "\n\t\t\t:download="item.download"\n\t\t\tclass="focusable"\n\t\t\trel="noreferrer noopener"\n\t\t\t@click="action">\n\t\t\t<span v-if="!iconIsUrl" :class="item.icon" />\n\t\t\t<img v-else :src="item.icon">\n\t\t\t<p v-if="item.text && item.longtext">\n\t\t\t\t<strong class="menuitem-text">\n\t\t\t\t\t{{ item.text }}\n\t\t\t\t</strong><br>\n\t\t\t\t<span class="menuitem-text-detail">\n\t\t\t\t\t{{ item.longtext }}\n\t\t\t\t</span>\n\t\t\t</p>\n\t\t\t<span v-else-if="item.text">\n\t\t\t\t{{ item.text }}\n\t\t\t</span>\n\t\t\t<p v-else-if="item.longtext">\n\t\t\t\t{{ item.longtext }}\n\t\t\t</p>\n\t\t</a>\n\n\t\t\x3c!-- If item.input is set instead, an put will be used --\x3e\n\t\t<span v-else-if="item.input" class="menuitem" :class="{active: item.active}">\n\t\t\t\x3c!-- does not show if input is checkbox --\x3e\n\t\t\t<span v-if="item.input !== \'checkbox\'" :class="item.icon" />\n\n\t\t\t\x3c!-- only shows if input is text --\x3e\n\t\t\t<form v-if="item.input === \'text\'"\n\t\t\t\t:class="item.input"\n\t\t\t\t@submit.prevent="item.action">\n\t\t\t\t<input :type="item.input"\n\t\t\t\t\t:value="item.value"\n\t\t\t\t\t:placeholder="item.text"\n\t\t\t\t\trequired>\n\t\t\t\t<input type="submit" value="" class="icon-confirm">\n\t\t\t</form>\n\n\t\t\t\x3c!-- checkbox --\x3e\n\t\t\t<template v-else>\n\t\t\t\t\x3c!-- eslint-disable-next-line --\x3e\n\t\t\t\t<input :id="key" v-model="item.model"\n\t\t\t\t\t:type="item.input"\n\t\t\t\t\t:class="item.input"\n\t\t\t\t\t@change="item.action">\n\t\t\t\t<label :for="key" @click.stop.prevent="item.action">\n\t\t\t\t\t{{ item.text }}\n\t\t\t\t</label>\n\t\t\t</template>\n\t\t</span>\n\n\t\t\x3c!-- If item.action is set instead, a button will be used --\x3e\n\t\t<button v-else-if="item.action"\n\t\t\tclass="menuitem focusable"\n\t\t\t:class="{active: item.active}"\n\t\t\t:disabled="item.disabled"\n\t\t\t@click.stop.prevent="item.action">\n\t\t\t<span :class="item.icon" />\n\t\t\t<p v-if="item.text && item.longtext">\n\t\t\t\t<strong class="menuitem-text">\n\t\t\t\t\t{{ item.text }}\n\t\t\t\t</strong><br>\n\t\t\t\t<span class="menuitem-text-detail">\n\t\t\t\t\t{{ item.longtext }}\n\t\t\t\t</span>\n\t\t\t</p>\n\t\t\t<span v-else-if="item.text">\n\t\t\t\t{{ item.text }}\n\t\t\t</span>\n\t\t\t<p v-else-if="item.longtext">\n\t\t\t\t{{ item.longtext }}\n\t\t\t</p>\n\t\t</button>\n\n\t\t\x3c!-- If item.longtext is set AND the item does not have an action --\x3e\n\t\t<span v-else class="menuitem" :class="{active: item.active}">\n\t\t\t<span :class="item.icon" />\n\t\t\t<p v-if="item.text && item.longtext">\n\t\t\t\t<strong class="menuitem-text">\n\t\t\t\t\t{{ item.text }}\n\t\t\t\t</strong><br>\n\t\t\t\t<span class="menuitem-text-detail">\n\t\t\t\t\t{{ item.longtext }}\n\t\t\t\t</span>\n\t\t\t</p>\n\t\t\t<span v-else-if="item.text">\n\t\t\t\t{{ item.text }}\n\t\t\t</span>\n\t\t\t<p v-else-if="item.longtext">\n\t\t\t\t{{ item.longtext }}\n\t\t\t</p>\n\t\t</span>\n\t</li>\n</template>\n\n<script>\nexport default {\n\tname: \'PopoverMenuItem\',\n\tprops: {\n\t\titem: {\n\t\t\ttype: Object,\n\t\t\trequired: true,\n\t\t\tdefault: () => {\n\t\t\t\treturn {\n\t\t\t\t\tkey: \'nextcloud-link\',\n\t\t\t\t\thref: \'https://nextcloud.com\',\n\t\t\t\t\ticon: \'icon-links\',\n\t\t\t\t\ttext: \'Nextcloud\',\n\t\t\t\t}\n\t\t\t},\n\t\t\t// check the input types\n\t\t\t// TODO: add more validation of types\n\t\t\tvalidator: item => {\n\t\t\t\t// TODO: support radio\n\t\t\t\tif (item.input) {\n\t\t\t\t\treturn [\'text\', \'checkbox\'].indexOf(item.input) !== -1\n\t\t\t\t}\n\t\t\t\treturn true\n\t\t\t},\n\t\t},\n\t},\n\tcomputed: {\n\t\t// random key for inputs binding if not provided\n\t\tkey() {\n\t\t\treturn this.item.key\n\t\t\t\t? this.item.key\n\t\t\t\t: Math.round(Math.random() * 16 * 1000000).toString(16)\n\t\t},\n\t\ticonIsUrl() {\n\t\t\ttry {\n\t\t\t\t// eslint-disable-next-line no-new\n\t\t\t\tnew URL(this.item.icon)\n\t\t\t\treturn true\n\t\t\t} catch (_) {\n\t\t\t\treturn false\n\t\t\t}\n\t\t},\n\t},\n\tmethods: {\n\t\t// allow us to use both link and an action on `a`\n\t\t// we still need to make sure item.action exists\n\t\taction(event) {\n\t\t\tif (this.item.action) {\n\t\t\t\tthis.item.action(event)\n\t\t\t}\n\t\t},\n\t},\n}\n<\/script>\n\n<style scoped>\n\tbutton.menuitem {\n\t\ttext-align: left;\n\t}\n\n\tbutton.menuitem * {\n\t\tcursor: pointer;\n\t}\n\n\tbutton.menuitem:disabled {\n\t\topacity: 0.5 !important;\n\t\tcursor: default;\n\t}\n\n\tbutton.menuitem:disabled * {\n\t\tcursor: default;\n\t}\n\n\t.menuitem.active {\n\t\tbox-shadow: inset 2px 0 var(--color-primary);\n\t\tborder-radius: 0;\n\t}\n</style>\n\n<style lang="scss" scoped>\nli {\n\tdisplay: flex;\n\tflex: 0 0 auto;\n\n\t&.hidden {\n\t\tdisplay: none;\n\t}\n\n\t> button,\n\t> a,\n\t> .menuitem {\n\t\tcursor: pointer;\n\t\tline-height: $clickable-area;\n\t\tborder: 0;\n\t\tborder-radius: 0; // otherwise Safari will cut the border-radius area\n\t\tbackground-color: transparent;\n\t\tdisplay: flex;\n\t\talign-items: flex-start;\n\t\theight: auto;\n\t\tmargin: 0;\n\t\tpadding: 0;\n\t\tfont-weight: normal;\n\t\tbox-shadow: none;\n\t\twidth: 100%;\n\t\tcolor: var(--color-main-text);\n\t\twhite-space: nowrap;\n\t\topacity: $opacity_normal;\n\n\t\t// TODO split into individual components for readability\n\t\tspan[class^=\'icon-\'],\n\t\tspan[class*=\' icon-\'],\n\t\t&[class^=\'icon-\'],\n\t\t&[class*=\' icon-\'] {\n\t\t\tmin-width: 0; /* Overwrite icons*/\n\t\t\tmin-height: 0;\n\t\t\tbackground-position: #{$icon-margin} center;\n\t\t\tbackground-size: $icon-size;\n\t\t}\n\n\t\tspan[class^=\'icon-\'],\n\t\tspan[class*=\' icon-\'] {\n\t\t\t/* Keep padding to define the width to\n\t\t\t\tassure correct position of a possible text */\n\t\t\tpadding: #{$clickable-area / 2} 0 #{$clickable-area / 2} $clickable-area;\n\t\t}\n\n\t\t// If no icons set, force left margin to align\n\t\t&:not([class^=\'icon-\']):not([class*=\'icon-\']) {\n\t\t\t> span,\n\t\t\t> input,\n\t\t\t> form {\n\t\t\t\t&:not([class^=\'icon-\']):not([class*=\'icon-\']):first-child {\n\t\t\t\t\tmargin-left: $clickable-area;\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\n\t\t&[class^=\'icon-\'],\n\t\t&[class*=\' icon-\'] {\n\t\t\tpadding: 0 $icon-margin 0 $clickable-area;\n\t\t}\n\n\t\t&:not(:disabled):hover,\n\t\t&:not(:disabled):focus,\n\t\t&:not(:disabled).active {\n\t\t\topacity: $opacity_full !important;\n\t\t}\n\n\t\t/* prevent .action class to break the design */\n\t\t&.action {\n\t\t\tpadding: inherit !important;\n\t\t}\n\n\t\t> span {\n\t\t\tcursor: pointer;\n\t\t\twhite-space: nowrap;\n\t\t}\n\n\t\t// long text area\n\t\t> p {\n\t\t\twidth: 150px;\n\t\t\tline-height: 1.6em;\n\t\t\tpadding: 8px 0;\n\t\t\twhite-space: normal;\n\n\t\t\t// in case there are no spaces like long email addresses\n\t\t\toverflow: hidden;\n\t\t\ttext-overflow: ellipsis;\n\t\t}\n\n\t\t// TODO: do we really supports it?\n\t\t> select {\n\t\t\tmargin: 0;\n\t\t\tmargin-left: 6px;\n\t\t}\n\n\t\t/* Add padding if contains icon+text */\n\t\t&:not(:empty) {\n\t\t\tpadding-right: $icon-margin !important;\n\t\t}\n\n\t\t/* DEPRECATED! old img in popover fallback\n\t\t\t* TODO: to remove */\n\t\t> img {\n\t\t\twidth: $icon-size;\n\t\t\tpadding: $icon-margin;\n\t\t}\n\n\t\t/* checkbox/radio fixes */\n\t\t> input.radio + label,\n\t\t> input.checkbox + label {\n\t\t\tpadding: 0 !important;\n\t\t\twidth: 100%;\n\t\t}\n\t\t> input.checkbox + label::before {\n\t\t\tmargin: -2px 13px 0;\n\t\t}\n\t\t> input.radio + label::before {\n\t\t\tmargin: -2px 12px 0;\n\t\t}\n\t\t> input:not([type=radio]):not([type=checkbox]):not([type=image]) {\n\t\t\twidth: 150px;\n\t\t}\n\n\t\t// Forms & text inputs\n\t\tform {\n\t\t\tdisplay: flex;\n\t\t\tflex: 1 1 auto;\n\t\t\t/* put a small space between text and form\n\t\t\t\tif there is an element before */\n\t\t\t&:not(:first-child)  {\n\t\t\t\tmargin-left: 5px;\n\t\t\t}\n\t\t}\n\t\t/* no margin if hidden span before */\n\t\t> span.hidden + form,\n\t\t> span[style*=\'display:none\'] + form {\n\t\t\tmargin-left: 0;\n\t\t}\n\t\t/* Inputs inside popover supports text, submit & reset */\n\t\tinput {\n\t\t\tmin-width: $clickable-area;\n\t\t\tmax-height: #{$clickable-area - 4px}; /* twice the element margin-y */\n\t\t\tmargin: 2px 0;\n\t\t\tflex: 1 1 auto;\n\t\t\t// space between inline inputs\n\t\t\t&:not(:first-child) {\n\t\t\t\tmargin-left: 5px;\n\t\t\t}\n\t\t}\n\t}\n\n\t// TODO: do that in js, should be cleaner\n\t/* css hack, only first not hidden */\n\t&:not(.hidden):not([style*=\'display:none\']) {\n\t\t&:first-of-type {\n\t\t\t> button, > a, > .menuitem {\n\t\t\t\t> form, > input {\n\t\t\t\t\tmargin-top: $icon-margin - 2px; // minus the input margin\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t\t&:last-of-type {\n\t\t\t> button, > a, > .menuitem {\n\t\t\t\t> form, > input {\n\t\t\t\t\tmargin-bottom: $icon-margin - 2px; // minus the input margin\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n\t> button {\n\t\tpadding: 0;\n\t\tspan {\n\t\t\topacity: $opacity_full;\n\t\t}\n\t}\n}\n</style>\n'],
        sourceRoot: ""
      }]), n.a = s;
    },
    54: function _(t, n, e) {
      "use strict";

      var i = e(0),
          a = e.n(i),
          o = e(1),
          s = e.n(o)()(a.a);
      s.push([t.i, "li[data-v-febed9b6]{display:flex;flex:0 0 auto}li.hidden[data-v-febed9b6]{display:none}li>button[data-v-febed9b6],li>a[data-v-febed9b6],li>.menuitem[data-v-febed9b6]{cursor:pointer;line-height:44px;border:0;border-radius:0;background-color:transparent;display:flex;align-items:flex-start;height:auto;margin:0;padding:0;font-weight:normal;box-shadow:none;width:100%;color:var(--color-main-text);white-space:nowrap;opacity:.7}li>button span[class^='icon-'][data-v-febed9b6],li>button span[class*=' icon-'][data-v-febed9b6],li>button[class^='icon-'][data-v-febed9b6],li>button[class*=' icon-'][data-v-febed9b6],li>a span[class^='icon-'][data-v-febed9b6],li>a span[class*=' icon-'][data-v-febed9b6],li>a[class^='icon-'][data-v-febed9b6],li>a[class*=' icon-'][data-v-febed9b6],li>.menuitem span[class^='icon-'][data-v-febed9b6],li>.menuitem span[class*=' icon-'][data-v-febed9b6],li>.menuitem[class^='icon-'][data-v-febed9b6],li>.menuitem[class*=' icon-'][data-v-febed9b6]{min-width:0;min-height:0;background-position:14px center;background-size:16px}li>button span[class^='icon-'][data-v-febed9b6],li>button span[class*=' icon-'][data-v-febed9b6],li>a span[class^='icon-'][data-v-febed9b6],li>a span[class*=' icon-'][data-v-febed9b6],li>.menuitem span[class^='icon-'][data-v-febed9b6],li>.menuitem span[class*=' icon-'][data-v-febed9b6]{padding:22px 0 22px 44px}li>button:not([class^='icon-']):not([class*='icon-'])>span[data-v-febed9b6]:not([class^='icon-']):not([class*='icon-']):first-child,li>button:not([class^='icon-']):not([class*='icon-'])>input[data-v-febed9b6]:not([class^='icon-']):not([class*='icon-']):first-child,li>button:not([class^='icon-']):not([class*='icon-'])>form[data-v-febed9b6]:not([class^='icon-']):not([class*='icon-']):first-child,li>a:not([class^='icon-']):not([class*='icon-'])>span[data-v-febed9b6]:not([class^='icon-']):not([class*='icon-']):first-child,li>a:not([class^='icon-']):not([class*='icon-'])>input[data-v-febed9b6]:not([class^='icon-']):not([class*='icon-']):first-child,li>a:not([class^='icon-']):not([class*='icon-'])>form[data-v-febed9b6]:not([class^='icon-']):not([class*='icon-']):first-child,li>.menuitem:not([class^='icon-']):not([class*='icon-'])>span[data-v-febed9b6]:not([class^='icon-']):not([class*='icon-']):first-child,li>.menuitem:not([class^='icon-']):not([class*='icon-'])>input[data-v-febed9b6]:not([class^='icon-']):not([class*='icon-']):first-child,li>.menuitem:not([class^='icon-']):not([class*='icon-'])>form[data-v-febed9b6]:not([class^='icon-']):not([class*='icon-']):first-child{margin-left:44px}li>button[class^='icon-'][data-v-febed9b6],li>button[class*=' icon-'][data-v-febed9b6],li>a[class^='icon-'][data-v-febed9b6],li>a[class*=' icon-'][data-v-febed9b6],li>.menuitem[class^='icon-'][data-v-febed9b6],li>.menuitem[class*=' icon-'][data-v-febed9b6]{padding:0 14px 0 44px}li>button[data-v-febed9b6]:not(:disabled):hover,li>button[data-v-febed9b6]:not(:disabled):focus,li>button:not(:disabled).active[data-v-febed9b6],li>a[data-v-febed9b6]:not(:disabled):hover,li>a[data-v-febed9b6]:not(:disabled):focus,li>a:not(:disabled).active[data-v-febed9b6],li>.menuitem[data-v-febed9b6]:not(:disabled):hover,li>.menuitem[data-v-febed9b6]:not(:disabled):focus,li>.menuitem:not(:disabled).active[data-v-febed9b6]{opacity:1 !important}li>button.action[data-v-febed9b6],li>a.action[data-v-febed9b6],li>.menuitem.action[data-v-febed9b6]{padding:inherit !important}li>button>span[data-v-febed9b6],li>a>span[data-v-febed9b6],li>.menuitem>span[data-v-febed9b6]{cursor:pointer;white-space:nowrap}li>button>p[data-v-febed9b6],li>a>p[data-v-febed9b6],li>.menuitem>p[data-v-febed9b6]{width:150px;line-height:1.6em;padding:8px 0;white-space:normal;overflow:hidden;text-overflow:ellipsis}li>button>select[data-v-febed9b6],li>a>select[data-v-febed9b6],li>.menuitem>select[data-v-febed9b6]{margin:0;margin-left:6px}li>button[data-v-febed9b6]:not(:empty),li>a[data-v-febed9b6]:not(:empty),li>.menuitem[data-v-febed9b6]:not(:empty){padding-right:14px !important}li>button>img[data-v-febed9b6],li>a>img[data-v-febed9b6],li>.menuitem>img[data-v-febed9b6]{width:16px;padding:14px}li>button>input.radio+label[data-v-febed9b6],li>button>input.checkbox+label[data-v-febed9b6],li>a>input.radio+label[data-v-febed9b6],li>a>input.checkbox+label[data-v-febed9b6],li>.menuitem>input.radio+label[data-v-febed9b6],li>.menuitem>input.checkbox+label[data-v-febed9b6]{padding:0 !important;width:100%}li>button>input.checkbox+label[data-v-febed9b6]::before,li>a>input.checkbox+label[data-v-febed9b6]::before,li>.menuitem>input.checkbox+label[data-v-febed9b6]::before{margin:-2px 13px 0}li>button>input.radio+label[data-v-febed9b6]::before,li>a>input.radio+label[data-v-febed9b6]::before,li>.menuitem>input.radio+label[data-v-febed9b6]::before{margin:-2px 12px 0}li>button>input[data-v-febed9b6]:not([type=radio]):not([type=checkbox]):not([type=image]),li>a>input[data-v-febed9b6]:not([type=radio]):not([type=checkbox]):not([type=image]),li>.menuitem>input[data-v-febed9b6]:not([type=radio]):not([type=checkbox]):not([type=image]){width:150px}li>button form[data-v-febed9b6],li>a form[data-v-febed9b6],li>.menuitem form[data-v-febed9b6]{display:flex;flex:1 1 auto}li>button form[data-v-febed9b6]:not(:first-child),li>a form[data-v-febed9b6]:not(:first-child),li>.menuitem form[data-v-febed9b6]:not(:first-child){margin-left:5px}li>button>span.hidden+form[data-v-febed9b6],li>button>span[style*='display:none']+form[data-v-febed9b6],li>a>span.hidden+form[data-v-febed9b6],li>a>span[style*='display:none']+form[data-v-febed9b6],li>.menuitem>span.hidden+form[data-v-febed9b6],li>.menuitem>span[style*='display:none']+form[data-v-febed9b6]{margin-left:0}li>button input[data-v-febed9b6],li>a input[data-v-febed9b6],li>.menuitem input[data-v-febed9b6]{min-width:44px;max-height:40px;margin:2px 0;flex:1 1 auto}li>button input[data-v-febed9b6]:not(:first-child),li>a input[data-v-febed9b6]:not(:first-child),li>.menuitem input[data-v-febed9b6]:not(:first-child){margin-left:5px}li:not(.hidden):not([style*='display:none']):first-of-type>button>form[data-v-febed9b6],li:not(.hidden):not([style*='display:none']):first-of-type>button>input[data-v-febed9b6],li:not(.hidden):not([style*='display:none']):first-of-type>a>form[data-v-febed9b6],li:not(.hidden):not([style*='display:none']):first-of-type>a>input[data-v-febed9b6],li:not(.hidden):not([style*='display:none']):first-of-type>.menuitem>form[data-v-febed9b6],li:not(.hidden):not([style*='display:none']):first-of-type>.menuitem>input[data-v-febed9b6]{margin-top:12px}li:not(.hidden):not([style*='display:none']):last-of-type>button>form[data-v-febed9b6],li:not(.hidden):not([style*='display:none']):last-of-type>button>input[data-v-febed9b6],li:not(.hidden):not([style*='display:none']):last-of-type>a>form[data-v-febed9b6],li:not(.hidden):not([style*='display:none']):last-of-type>a>input[data-v-febed9b6],li:not(.hidden):not([style*='display:none']):last-of-type>.menuitem>form[data-v-febed9b6],li:not(.hidden):not([style*='display:none']):last-of-type>.menuitem>input[data-v-febed9b6]{margin-bottom:12px}li>button[data-v-febed9b6]{padding:0}li>button span[data-v-febed9b6]{opacity:1}\n", "", {
        version: 3,
        sources: ["webpack://./PopoverMenuItem.vue", "webpack://./../../assets/variables.scss"],
        names: [],
        mappings: "AA4MA,oBACC,YAAa,CACb,aAAc,CAFf,2BAKE,YAAa,CALf,+EAWE,cAAe,CACf,gBC/LmB,CDgMnB,QAAS,CACT,eAAgB,CAChB,4BAA6B,CAC7B,YAAa,CACb,sBAAuB,CACvB,WAAY,CACZ,QAAS,CACT,SAAU,CACV,kBAAmB,CACnB,eAAgB,CAChB,UAAW,CACX,4BAA6B,CAC7B,kBAAmB,CACnB,UC3LiB,CDiKnB,giBAiCG,WAAY,CACZ,YAAa,CACb,+BAA2C,CAC3C,oBCnNa,CD+KhB,+RA2CG,wBC9NkB,CDmLrB,iqCAoDK,gBCvOgB,CDmLrB,iQA2DG,qBC9OkB,CDmLrB,6aAiEG,oBAAiC,CAjEpC,oGAsEG,0BAA2B,CAtE9B,8FA0EG,cAAe,CACf,kBAAmB,CA3EtB,qFAgFG,WAAY,CACZ,iBAAkB,CAClB,aAAc,CACd,kBAAmB,CAGnB,eAAgB,CAChB,sBAAuB,CAvF1B,oGA4FG,QAAS,CACT,eAAgB,CA7FnB,mHAkGG,6BAAsC,CAlGzC,2FAwGG,UCvRa,CDwRb,YCpR6C,CD2KhD,mRA+GG,oBAAqB,CACrB,UAAW,CAhHd,sKAmHG,kBAAmB,CAnHtB,6JAsHG,kBAAmB,CAtHtB,4QAyHG,WAAY,CAzHf,8FA8HG,YAAa,CACb,aAAc,CA/HjB,oJAmII,eAAgB,CAnIpB,oTAyIG,aAAc,CAzIjB,iGA6IG,cChUkB,CDiUlB,eAAY,CACZ,YAAa,CACb,aAAc,CAhJjB,uJAmJI,eAAgB,CAnJpB,+gBA8JK,eAA8B,CA9JnC,ygBAqKK,kBAAiC,CArKtC,2BA2KE,SAAU,CA3KZ,gCA6KG,SC7Ua",
        sourcesContent: ["$scope_version:\"6b494fc\"; @import 'variables';\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nli {\n\tdisplay: flex;\n\tflex: 0 0 auto;\n\n\t&.hidden {\n\t\tdisplay: none;\n\t}\n\n\t> button,\n\t> a,\n\t> .menuitem {\n\t\tcursor: pointer;\n\t\tline-height: $clickable-area;\n\t\tborder: 0;\n\t\tborder-radius: 0; // otherwise Safari will cut the border-radius area\n\t\tbackground-color: transparent;\n\t\tdisplay: flex;\n\t\talign-items: flex-start;\n\t\theight: auto;\n\t\tmargin: 0;\n\t\tpadding: 0;\n\t\tfont-weight: normal;\n\t\tbox-shadow: none;\n\t\twidth: 100%;\n\t\tcolor: var(--color-main-text);\n\t\twhite-space: nowrap;\n\t\topacity: $opacity_normal;\n\n\t\t// TODO split into individual components for readability\n\t\tspan[class^='icon-'],\n\t\tspan[class*=' icon-'],\n\t\t&[class^='icon-'],\n\t\t&[class*=' icon-'] {\n\t\t\tmin-width: 0; /* Overwrite icons*/\n\t\t\tmin-height: 0;\n\t\t\tbackground-position: #{$icon-margin} center;\n\t\t\tbackground-size: $icon-size;\n\t\t}\n\n\t\tspan[class^='icon-'],\n\t\tspan[class*=' icon-'] {\n\t\t\t/* Keep padding to define the width to\n\t\t\t\tassure correct position of a possible text */\n\t\t\tpadding: #{$clickable-area / 2} 0 #{$clickable-area / 2} $clickable-area;\n\t\t}\n\n\t\t// If no icons set, force left margin to align\n\t\t&:not([class^='icon-']):not([class*='icon-']) {\n\t\t\t> span,\n\t\t\t> input,\n\t\t\t> form {\n\t\t\t\t&:not([class^='icon-']):not([class*='icon-']):first-child {\n\t\t\t\t\tmargin-left: $clickable-area;\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\n\t\t&[class^='icon-'],\n\t\t&[class*=' icon-'] {\n\t\t\tpadding: 0 $icon-margin 0 $clickable-area;\n\t\t}\n\n\t\t&:not(:disabled):hover,\n\t\t&:not(:disabled):focus,\n\t\t&:not(:disabled).active {\n\t\t\topacity: $opacity_full !important;\n\t\t}\n\n\t\t/* prevent .action class to break the design */\n\t\t&.action {\n\t\t\tpadding: inherit !important;\n\t\t}\n\n\t\t> span {\n\t\t\tcursor: pointer;\n\t\t\twhite-space: nowrap;\n\t\t}\n\n\t\t// long text area\n\t\t> p {\n\t\t\twidth: 150px;\n\t\t\tline-height: 1.6em;\n\t\t\tpadding: 8px 0;\n\t\t\twhite-space: normal;\n\n\t\t\t// in case there are no spaces like long email addresses\n\t\t\toverflow: hidden;\n\t\t\ttext-overflow: ellipsis;\n\t\t}\n\n\t\t// TODO: do we really supports it?\n\t\t> select {\n\t\t\tmargin: 0;\n\t\t\tmargin-left: 6px;\n\t\t}\n\n\t\t/* Add padding if contains icon+text */\n\t\t&:not(:empty) {\n\t\t\tpadding-right: $icon-margin !important;\n\t\t}\n\n\t\t/* DEPRECATED! old img in popover fallback\n\t\t\t* TODO: to remove */\n\t\t> img {\n\t\t\twidth: $icon-size;\n\t\t\tpadding: $icon-margin;\n\t\t}\n\n\t\t/* checkbox/radio fixes */\n\t\t> input.radio + label,\n\t\t> input.checkbox + label {\n\t\t\tpadding: 0 !important;\n\t\t\twidth: 100%;\n\t\t}\n\t\t> input.checkbox + label::before {\n\t\t\tmargin: -2px 13px 0;\n\t\t}\n\t\t> input.radio + label::before {\n\t\t\tmargin: -2px 12px 0;\n\t\t}\n\t\t> input:not([type=radio]):not([type=checkbox]):not([type=image]) {\n\t\t\twidth: 150px;\n\t\t}\n\n\t\t// Forms & text inputs\n\t\tform {\n\t\t\tdisplay: flex;\n\t\t\tflex: 1 1 auto;\n\t\t\t/* put a small space between text and form\n\t\t\t\tif there is an element before */\n\t\t\t&:not(:first-child)  {\n\t\t\t\tmargin-left: 5px;\n\t\t\t}\n\t\t}\n\t\t/* no margin if hidden span before */\n\t\t> span.hidden + form,\n\t\t> span[style*='display:none'] + form {\n\t\t\tmargin-left: 0;\n\t\t}\n\t\t/* Inputs inside popover supports text, submit & reset */\n\t\tinput {\n\t\t\tmin-width: $clickable-area;\n\t\t\tmax-height: #{$clickable-area - 4px}; /* twice the element margin-y */\n\t\t\tmargin: 2px 0;\n\t\t\tflex: 1 1 auto;\n\t\t\t// space between inline inputs\n\t\t\t&:not(:first-child) {\n\t\t\t\tmargin-left: 5px;\n\t\t\t}\n\t\t}\n\t}\n\n\t// TODO: do that in js, should be cleaner\n\t/* css hack, only first not hidden */\n\t&:not(.hidden):not([style*='display:none']) {\n\t\t&:first-of-type {\n\t\t\t> button, > a, > .menuitem {\n\t\t\t\t> form, > input {\n\t\t\t\t\tmargin-top: $icon-margin - 2px; // minus the input margin\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t\t&:last-of-type {\n\t\t\t> button, > a, > .menuitem {\n\t\t\t\t> form, > input {\n\t\t\t\t\tmargin-bottom: $icon-margin - 2px; // minus the input margin\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n\t> button {\n\t\tpadding: 0;\n\t\tspan {\n\t\t\topacity: $opacity_full;\n\t\t}\n\t}\n}\n", "/**\n * @copyright Copyright (c) 2019 John Molakvoæ <skjnldsv@protonmail.com>\n *\n * @author John Molakvoæ <skjnldsv@protonmail.com>\n *\n * @license GNU AGPL version 3 or any later version\n *\n * This program is free software: you can redistribute it and/or modify\n * it under the terms of the GNU Affero General Public License as\n * published by the Free Software Foundation, either version 3 of the\n * License, or (at your option) any later version.\n *\n * This program is distributed in the hope that it will be useful,\n * but WITHOUT ANY WARRANTY; without even the implied warranty of\n * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the\n * GNU Affero General Public License for more details.\n *\n * You should have received a copy of the GNU Affero General Public License\n * along with this program. If not, see <http://www.gnu.org/licenses/>.\n *\n */\n\n// https://uxplanet.org/7-rules-for-mobile-ui-button-design-e9cf2ea54556\n// recommended is 48px\n// 44px is what we choose and have very good visual-to-usability ratio\n$clickable-area: 44px;\n\n// background icon size\n// also used for the scss icon font\n$icon-size: 16px;\n\n// icon padding for a $clickable-area width and a $icon-size icon\n// ( 44px - 16px ) / 2\n$icon-margin: ($clickable-area - $icon-size) / 2;\n\n// transparency background for icons\n$icon-focus-bg: rgba(127, 127, 127, .25);\n\n// popovermenu arrow width from the triangle center\n$arrow-width: 9px;\n\n// opacities\n$opacity_disabled: .5;\n$opacity_normal: .7;\n$opacity_full: 1;\n\n// menu round background hover feedback\n// good looking on dark AND white bg\n$action-background-hover: rgba(127, 127, 127, .25);\n\n// various structure data used in the \n// `AppNavigation` component\n$header-height: 50px;\n$navigation-width: 300px;\n\n// mobile breakpoint\n$breakpoint-mobile: 1024px;\n"],
        sourceRoot: ""
      }]), n.a = s;
    },
    55: function _(t, n, e) {
      "use strict";

      var i = e(0),
          a = e.n(i),
          o = e(1),
          s = e.n(o)()(a.a);
      s.push([t.i, "ul[data-v-4dae360a]{display:flex;flex-direction:column}\n", "", {
        version: 3,
        sources: ["webpack://./PopoverMenu.vue"],
        names: [],
        mappings: "AA0DA,oBACC,YAAa,CACb,qBAAsB",
        sourcesContent: ["$scope_version:\"6b494fc\"; @import 'variables';\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nul {\n\tdisplay: flex;\n\tflex-direction: column;\n}\n"],
        sourceRoot: ""
      }]), n.a = s;
    },
    56: function _(t, n) {},
    6: function _(t, n) {
      t.exports = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ "./node_modules/core-js/modules/es.object.to-string.js");
    },
    77: function _(t, n, e) {
      "use strict";

      e.r(n);
      e(6), e(25), e(40), e(16), e(17), e(18);
      var i = {
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
          a = e(2),
          o = e.n(a),
          s = e(53),
          r = {
        insert: "head",
        singleton: !1
      },
          l = (o()(s.a, r), s.a.locals, e(54)),
          c = {
        insert: "head",
        singleton: !1
      },
          d = (o()(l.a, c), l.a.locals, e(3)),
          p = {
        name: "PopoverMenu",
        components: {
          PopoverMenuItem: Object(d.a)(i, function () {
            var t = this,
                n = t.$createElement,
                e = t._self._c || n;
            return e("li", {
              staticClass: "popover__menuitem"
            }, [t.item.href ? e("a", {
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
            }, [t.iconIsUrl ? e("img", {
              attrs: {
                src: t.item.icon
              }
            }) : e("span", {
              class: t.item.icon
            }), t._v(" "), t.item.text && t.item.longtext ? e("p", [e("strong", {
              staticClass: "menuitem-text"
            }, [t._v("\n\t\t\t\t" + t._s(t.item.text) + "\n\t\t\t")]), e("br"), t._v(" "), e("span", {
              staticClass: "menuitem-text-detail"
            }, [t._v("\n\t\t\t\t" + t._s(t.item.longtext) + "\n\t\t\t")])]) : t.item.text ? e("span", [t._v("\n\t\t\t" + t._s(t.item.text) + "\n\t\t")]) : t.item.longtext ? e("p", [t._v("\n\t\t\t" + t._s(t.item.longtext) + "\n\t\t")]) : t._e()]) : t.item.input ? e("span", {
              staticClass: "menuitem",
              class: {
                active: t.item.active
              }
            }, ["checkbox" !== t.item.input ? e("span", {
              class: t.item.icon
            }) : t._e(), t._v(" "), "text" === t.item.input ? e("form", {
              class: t.item.input,
              on: {
                submit: function submit(n) {
                  return n.preventDefault(), t.item.action(n);
                }
              }
            }, [e("input", {
              attrs: {
                type: t.item.input,
                placeholder: t.item.text,
                required: ""
              },
              domProps: {
                value: t.item.value
              }
            }), t._v(" "), e("input", {
              staticClass: "icon-confirm",
              attrs: {
                type: "submit",
                value: ""
              }
            })]) : ["checkbox" === t.item.input ? e("input", {
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
                change: [function (n) {
                  var e = t.item.model,
                      i = n.target,
                      a = !!i.checked;

                  if (Array.isArray(e)) {
                    var o = t._i(e, null);

                    i.checked ? o < 0 && t.$set(t.item, "model", e.concat([null])) : o > -1 && t.$set(t.item, "model", e.slice(0, o).concat(e.slice(o + 1)));
                  } else t.$set(t.item, "model", a);
                }, t.item.action]
              }
            }) : "radio" === t.item.input ? e("input", {
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
                change: [function (n) {
                  return t.$set(t.item, "model", null);
                }, t.item.action]
              }
            }) : e("input", {
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
                input: function input(n) {
                  n.target.composing || t.$set(t.item, "model", n.target.value);
                }
              }
            }), t._v(" "), e("label", {
              attrs: {
                for: t.key
              },
              on: {
                click: function click(n) {
                  return n.stopPropagation(), n.preventDefault(), t.item.action(n);
                }
              }
            }, [t._v("\n\t\t\t\t" + t._s(t.item.text) + "\n\t\t\t")])]], 2) : t.item.action ? e("button", {
              staticClass: "menuitem focusable",
              class: {
                active: t.item.active
              },
              attrs: {
                disabled: t.item.disabled
              },
              on: {
                click: function click(n) {
                  return n.stopPropagation(), n.preventDefault(), t.item.action(n);
                }
              }
            }, [e("span", {
              class: t.item.icon
            }), t._v(" "), t.item.text && t.item.longtext ? e("p", [e("strong", {
              staticClass: "menuitem-text"
            }, [t._v("\n\t\t\t\t" + t._s(t.item.text) + "\n\t\t\t")]), e("br"), t._v(" "), e("span", {
              staticClass: "menuitem-text-detail"
            }, [t._v("\n\t\t\t\t" + t._s(t.item.longtext) + "\n\t\t\t")])]) : t.item.text ? e("span", [t._v("\n\t\t\t" + t._s(t.item.text) + "\n\t\t")]) : t.item.longtext ? e("p", [t._v("\n\t\t\t" + t._s(t.item.longtext) + "\n\t\t")]) : t._e()]) : e("span", {
              staticClass: "menuitem",
              class: {
                active: t.item.active
              }
            }, [e("span", {
              class: t.item.icon
            }), t._v(" "), t.item.text && t.item.longtext ? e("p", [e("strong", {
              staticClass: "menuitem-text"
            }, [t._v("\n\t\t\t\t" + t._s(t.item.text) + "\n\t\t\t")]), e("br"), t._v(" "), e("span", {
              staticClass: "menuitem-text-detail"
            }, [t._v("\n\t\t\t\t" + t._s(t.item.longtext) + "\n\t\t\t")])]) : t.item.text ? e("span", [t._v("\n\t\t\t" + t._s(t.item.text) + "\n\t\t")]) : t.item.longtext ? e("p", [t._v("\n\t\t\t" + t._s(t.item.longtext) + "\n\t\t")]) : t._e()])]);
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
          u = e(55),
          m = {
        insert: "head",
        singleton: !1
      },
          f = (o()(u.a, m), u.a.locals, e(56)),
          b = e.n(f),
          h = Object(d.a)(p, function () {
        var t = this.$createElement,
            n = this._self._c || t;
        return n("ul", {
          staticClass: "popover__menu"
        }, this._l(this.menu, function (t, e) {
          return n("PopoverMenuItem", {
            key: e,
            attrs: {
              item: t
            }
          });
        }), 1);
      }, [], !1, null, "4dae360a", null);
      "function" == typeof b.a && b()(h);
      var v = h.exports;
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

      n.default = v;
    }
  });
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

/***/ "./node_modules/vue-click-outside/index.js":
/*!*************************************************!*\
  !*** ./node_modules/vue-click-outside/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function validate(binding) {
  if (typeof binding.value !== 'function') {
    console.warn('[Vue-click-outside:] provided expression', binding.expression, 'is not a function.');
    return false;
  }

  return true;
}

function isPopup(popupItem, elements) {
  if (!popupItem || !elements) return false;

  for (var i = 0, len = elements.length; i < len; i++) {
    try {
      if (popupItem.contains(elements[i])) {
        return true;
      }

      if (elements[i].contains(popupItem)) {
        return false;
      }
    } catch (e) {
      return false;
    }
  }

  return false;
}

function isServer(vNode) {
  return typeof vNode.componentInstance !== 'undefined' && vNode.componentInstance.$isServer;
}

exports = module.exports = {
  bind: function bind(el, binding, vNode) {
    if (!validate(binding)) return; // Define Handler and cache it on the element

    function handler(e) {
      if (!vNode.context) return; // some components may have related popup item, on which we shall prevent the click outside event handler.

      var elements = e.path || e.composedPath && e.composedPath();
      elements && elements.length > 0 && elements.unshift(e.target);
      if (el.contains(e.target) || isPopup(vNode.context.popupItem, elements)) return;

      el.__vueClickOutside__.callback(e);
    } // add Event Listeners


    el.__vueClickOutside__ = {
      handler: handler,
      callback: binding.value
    };
    !isServer(vNode) && document.addEventListener('click', handler);
  },
  update: function update(el, binding) {
    if (validate(binding)) el.__vueClickOutside__.callback = binding.value;
  },
  unbind: function unbind(el, binding, vNode) {
    // Remove Event Listeners
    !isServer(vNode) && document.removeEventListener('click', el.__vueClickOutside__.handler);
    delete el.__vueClickOutside__;
  }
};

/***/ })

}]);
//# sourceMappingURL=vendors~editor-rich.js.map?v=a5a437b0ebd760958b05