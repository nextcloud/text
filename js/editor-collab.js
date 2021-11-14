(window["textWebpackJsonp"] = window["textWebpackJsonp"] || []).push([["editor-collab"],{

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/components/SessionList.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/components/SessionList.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Avatar = _interopRequireDefault(__webpack_require__(/*! @nextcloud/vue/dist/Components/Avatar */ "./node_modules/@nextcloud/vue/dist/Components/Avatar.js"));

var _Popover = _interopRequireDefault(__webpack_require__(/*! @nextcloud/vue/dist/Components/Popover */ "./node_modules/@nextcloud/vue/dist/Components/Popover.js"));

var _Tooltip = _interopRequireDefault(__webpack_require__(/*! @nextcloud/vue/dist/Directives/Tooltip */ "./node_modules/@nextcloud/vue/dist/Directives/Tooltip.js"));

var _store = _interopRequireDefault(__webpack_require__(/*! ../mixins/store */ "./src/mixins/store.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var COLLABORATOR_IDLE_TIME = 60;
var COLLABORATOR_DISCONNECT_TIME = 90;
var _default2 = {
  name: 'SessionList',
  components: {
    Avatar: _Avatar.default,
    Popover: _Popover.default
  },
  directives: {
    tooltip: _Tooltip.default
  },
  mixins: [_store.default],
  props: {
    sessions: {
      type: Object,
      default: function _default() {
        return {};
      }
    }
  },
  data: function data() {
    return {
      myName: ''
    };
  },
  computed: {
    showAuthorAnnotations: {
      get: function get() {
        return this.$store.state.showAuthorAnnotations;
      },
      set: function set(value) {
        this.$store.dispatch('setShowAuthorAnnotations', value);
      }
    },
    editorsTooltip: function editorsTooltip() {
      var tooltipPrefix = t('text', 'Currently active users:') + ' ';

      if (this.sessionPopoverList.length > 0) {
        var first = this.activeSessions.slice(0, 3).map(function (session) {
          return session.guestName ? session.guestName : session.displayName;
        }).join(', ');
        var others = this.activeSessions.slice(3).length;
        return tooltipPrefix + first + ' ' + n('text', 'and %n other editor', 'and %n other editors', others);
      }

      return tooltipPrefix + this.activeSessions.slice(0, 3).map(function (session) {
        return session.guestName ? session.guestName : session.displayName;
      }).join(', ');
    },
    activeSessions: function activeSessions() {
      return Object.values(this.sessions).filter(function (session) {
        return session.lastContact > Date.now() / 1000 - COLLABORATOR_DISCONNECT_TIME && !session.isCurrent && (session.userId !== null || session.guestName !== null);
      }).sort(function (a, b) {
        return a.lastContact < b.lastContact;
      });
    },
    currentSession: function currentSession() {
      return Object.values(this.sessions).find(function (session) {
        return session.isCurrent;
      });
    },
    sessionStyle: function sessionStyle() {
      return function (session) {
        return {
          'border-color': session.color,
          'background-color': session.color + ' !important'
        };
      };
    },
    avatarStyle: function avatarStyle() {
      return function (session) {
        return {
          opacity: session.lastContact > Date.now() / 1000 - COLLABORATOR_IDLE_TIME ? 1 : 0.5
        };
      };
    },
    sessionsVisible: function sessionsVisible() {
      return this.activeSessions.slice(0, 3);
    },
    sessionPopoverList: function sessionPopoverList() {
      return this.activeSessions.slice(3);
    }
  }
};
exports.default = _default2;

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/components/SessionList.vue?vue&type=style&index=0&id=0d166054&scoped=true&lang=scss&":
/*!******************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/components/SessionList.vue?vue&type=style&index=0&id=0d166054&scoped=true&lang=scss& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ "./node_modules/css-loader/dist/runtime/cssWithMappingToString.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default.a);
// Module
___CSS_LOADER_EXPORT___.push([module.i, ".avatar-list[data-v-0d166054] {\n  border: none;\n  background-color: var(--color-main-background);\n  padding: 0;\n  margin: 0;\n  padding-left: 6px;\n  display: inline-flex;\n  flex-direction: row-reverse;\n}\n.avatar-list[data-v-0d166054]:focus {\n  background-color: #eee;\n}\n.avatar-list .avatar-wrapper[data-v-0d166054] {\n  margin: 6px;\n  margin-right: -8px;\n  margin-left: 0;\n}\n.avatar-list .icon-more[data-v-0d166054], .avatar-list .icon-group[data-v-0d166054], .avatar-list .icon-settings-dark[data-v-0d166054] {\n  background-color: var(--color-background-dark);\n  width: 36px;\n  height: 36px;\n  margin: 6px 6px 6px 0px;\n}\n.avatar-wrapper[data-v-0d166054] {\n  width: 32px;\n  height: 32px;\n  z-index: 1;\n  border-radius: 50%;\n  overflow: hidden;\n  border: 2px solid var(--color-main-background);\n  box-sizing: content-box !important;\n}\n.session-menu[data-v-0d166054] {\n  max-width: 280px;\n  padding-top: 6px;\n  padding-bottom: 6px;\n}\n.session-menu ul li[data-v-0d166054] {\n  align-items: center;\n  display: flex;\n  padding: 6px;\n}\n.session-menu ul li .avatar-wrapper[data-v-0d166054] {\n  margin-right: 6px;\n}\nlabel[data-v-0d166054] {\n  display: block;\n  margin: 8px;\n}\n.hint[data-v-0d166054] {\n  margin: 8px;\n  color: var(--color-text-maxcontrast);\n}", "",{"version":3,"sources":["webpack://./src/components/SessionList.vue","webpack://./SessionList.vue"],"names":[],"mappings":"AA8JA;EACC,YAAA;EACA,8CAAA;EACA,UAAA;EACA,SAAA;EACA,iBAAA;EACA,oBAAA;EACA,2BAAA;AC7JD;AD+JC;EACC,sBAAA;AC7JF;ADgKC;EACC,WAAA;EACA,kBAAA;EACA,cAAA;AC9JF;ADiKC;EACC,8CAAA;EACA,WAAA;EACA,YAAA;EACA,uBAAA;AC/JF;ADmKA;EACC,WAAA;EACA,YAAA;EACA,UAAA;EACA,kBAAA;EACA,gBAAA;EACA,8CAAA;EACA,kCAAA;AChKD;ADmKA;EACC,gBAAA;EACA,gBAAA;EACA,mBAAA;AChKD;ADkKC;EACC,mBAAA;EACA,aAAA;EACA,YAAA;AChKF;ADkKE;EACC,iBAAA;AChKH;ADqKA;EACC,cAAA;EACA,WAAA;AClKD;ADqKA;EACC,WAAA;EACA,oCAAA;AClKD","sourcesContent":["\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.avatar-list {\n\tborder: none;\n\tbackground-color: var(--color-main-background);\n\tpadding: 0;\n\tmargin: 0;\n\tpadding-left: 6px;\n\tdisplay: inline-flex;\n\tflex-direction: row-reverse;\n\n\t&:focus {\n\t\tbackground-color: #eee;\n\t}\n\n\t.avatar-wrapper {\n\t\tmargin: 6px;\n\t\tmargin-right: -8px;\n\t\tmargin-left: 0;\n\t}\n\n\t.icon-more, .icon-group, .icon-settings-dark {\n\t\tbackground-color: var(--color-background-dark);\n\t\twidth: 36px;\n\t\theight: 36px;\n\t\tmargin: 6px 6px 6px 0px;\n\t}\n}\n\n.avatar-wrapper {\n\twidth: 32px;\n\theight: 32px;\n\tz-index: 1;\n\tborder-radius: 50%;\n\toverflow: hidden;\n\tborder: 2px solid var(--color-main-background);\n\tbox-sizing: content-box !important;\n}\n\n.session-menu {\n\tmax-width: 280px;\n\tpadding-top: 6px;\n\tpadding-bottom: 6px;\n\n\tul li {\n\t\talign-items: center;\n\t\tdisplay: flex;\n\t\tpadding: 6px;\n\n\t\t.avatar-wrapper {\n\t\t\tmargin-right: 6px;\n\t\t}\n\t}\n}\n\nlabel {\n\tdisplay: block;\n\tmargin: 8px;\n}\n\n.hint {\n\tmargin: 8px;\n\tcolor: var(--color-text-maxcontrast);\n}\n",".avatar-list {\n  border: none;\n  background-color: var(--color-main-background);\n  padding: 0;\n  margin: 0;\n  padding-left: 6px;\n  display: inline-flex;\n  flex-direction: row-reverse;\n}\n.avatar-list:focus {\n  background-color: #eee;\n}\n.avatar-list .avatar-wrapper {\n  margin: 6px;\n  margin-right: -8px;\n  margin-left: 0;\n}\n.avatar-list .icon-more, .avatar-list .icon-group, .avatar-list .icon-settings-dark {\n  background-color: var(--color-background-dark);\n  width: 36px;\n  height: 36px;\n  margin: 6px 6px 6px 0px;\n}\n\n.avatar-wrapper {\n  width: 32px;\n  height: 32px;\n  z-index: 1;\n  border-radius: 50%;\n  overflow: hidden;\n  border: 2px solid var(--color-main-background);\n  box-sizing: content-box !important;\n}\n\n.session-menu {\n  max-width: 280px;\n  padding-top: 6px;\n  padding-bottom: 6px;\n}\n.session-menu ul li {\n  align-items: center;\n  display: flex;\n  padding: 6px;\n}\n.session-menu ul li .avatar-wrapper {\n  margin-right: 6px;\n}\n\nlabel {\n  display: block;\n  margin: 8px;\n}\n\n.hint {\n  margin: 8px;\n  color: var(--color-text-maxcontrast);\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/components/SessionList.vue?vue&type=style&index=0&id=0d166054&scoped=true&lang=scss&":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/components/SessionList.vue?vue&type=style&index=0&id=0d166054&scoped=true&lang=scss& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_SessionList_vue_vue_type_style_index_0_id_0d166054_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/sass-loader/dist/cjs.js!../../node_modules/vue-loader/lib??vue-loader-options!./SessionList.vue?vue&type=style&index=0&id=0d166054&scoped=true&lang=scss& */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/components/SessionList.vue?vue&type=style&index=0&id=0d166054&scoped=true&lang=scss&");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_SessionList_vue_vue_type_style_index_0_id_0d166054_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ __webpack_exports__["default"] = (_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_SessionList_vue_vue_type_style_index_0_id_0d166054_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/components/SessionList.vue?vue&type=template&id=0d166054&scoped=true&":
/*!*****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/components/SessionList.vue?vue&type=template&id=0d166054&scoped=true& ***!
  \*****************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "Popover",
    { staticClass: "session-list", attrs: { placement: "top" } },
    [
      _c(
        "button",
        {
          directives: [
            {
              name: "tooltip",
              rawName: "v-tooltip.bottom",
              value: _vm.editorsTooltip,
              expression: "editorsTooltip",
              modifiers: { bottom: true }
            }
          ],
          staticClass: "avatar-list",
          attrs: { slot: "trigger" },
          slot: "trigger"
        },
        [
          _c("div", { staticClass: "avatardiv icon-group" }),
          _vm._v(" "),
          _vm._l(_vm.sessionsVisible, function(session) {
            return _c(
              "div",
              {
                key: session.id,
                staticClass: "avatar-wrapper",
                style: _vm.sessionStyle(session)
              },
              [
                _c("Avatar", {
                  style: _vm.avatarStyle(session),
                  attrs: {
                    user: session.userId ? session.userId : session.guestName,
                    "is-guest": session.userId === null,
                    "disable-menu": true,
                    "show-user-status": false,
                    "disable-tooltip": true,
                    size: 32
                  }
                })
              ],
              1
            )
          })
        ],
        2
      ),
      _vm._v(" "),
      [
        _c("div", { staticClass: "session-menu" }, [
          _c(
            "ul",
            [
              _vm._t("default"),
              _vm._v(" "),
              _vm._l(_vm.sessionPopoverList, function(session) {
                return _c(
                  "li",
                  { key: session.id, style: _vm.avatarStyle(session) },
                  [
                    _c(
                      "div",
                      {
                        staticClass: "avatar-wrapper",
                        style: _vm.sessionStyle(session)
                      },
                      [
                        _c("Avatar", {
                          attrs: {
                            user: session.userId
                              ? session.userId
                              : session.guestName,
                            "is-guest": session.userId === null,
                            "disable-menu": true,
                            "show-user-status": false,
                            "disable-tooltip": true,
                            size: 32
                          }
                        })
                      ],
                      1
                    ),
                    _vm._v(
                      "\n\t\t\t\t\t" +
                        _vm._s(
                          session.guestName
                            ? session.guestName
                            : session.displayName
                        ) +
                        "\n\t\t\t\t"
                    )
                  ]
                )
              })
            ],
            2
          ),
          _vm._v(" "),
          _c("input", {
            directives: [
              {
                name: "model",
                rawName: "v-model",
                value: _vm.showAuthorAnnotations,
                expression: "showAuthorAnnotations"
              }
            ],
            staticClass: "checkbox",
            attrs: { id: "toggle-color-annotations", type: "checkbox" },
            domProps: {
              checked: Array.isArray(_vm.showAuthorAnnotations)
                ? _vm._i(_vm.showAuthorAnnotations, null) > -1
                : _vm.showAuthorAnnotations
            },
            on: {
              change: function($event) {
                var $$a = _vm.showAuthorAnnotations,
                  $$el = $event.target,
                  $$c = $$el.checked ? true : false
                if (Array.isArray($$a)) {
                  var $$v = null,
                    $$i = _vm._i($$a, $$v)
                  if ($$el.checked) {
                    $$i < 0 && (_vm.showAuthorAnnotations = $$a.concat([$$v]))
                  } else {
                    $$i > -1 &&
                      (_vm.showAuthorAnnotations = $$a
                        .slice(0, $$i)
                        .concat($$a.slice($$i + 1)))
                  }
                } else {
                  _vm.showAuthorAnnotations = $$c
                }
              }
            }
          }),
          _vm._v(" "),
          _c("label", { attrs: { for: "toggle-color-annotations" } }, [
            _vm._v(_vm._s(_vm.t("text", "Show author colors")))
          ]),
          _vm._v(" "),
          _c("p", { staticClass: "hint" }, [
            _vm._v(
              "\n\t\t\t\t" +
                _vm._s(
                  _vm.t(
                    "text",
                    "Author colors are only shown until everyone has closed the document."
                  )
                ) +
                "\n\t\t\t"
            )
          ])
        ])
      ]
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./src/components/SessionList.vue":
/*!****************************************!*\
  !*** ./src/components/SessionList.vue ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _SessionList_vue_vue_type_template_id_0d166054_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SessionList.vue?vue&type=template&id=0d166054&scoped=true& */ "./src/components/SessionList.vue?vue&type=template&id=0d166054&scoped=true&");
/* harmony import */ var _SessionList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SessionList.vue?vue&type=script&lang=js& */ "./src/components/SessionList.vue?vue&type=script&lang=js&");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _SessionList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _SessionList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _SessionList_vue_vue_type_style_index_0_id_0d166054_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SessionList.vue?vue&type=style&index=0&id=0d166054&scoped=true&lang=scss& */ "./src/components/SessionList.vue?vue&type=style&index=0&id=0d166054&scoped=true&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _SessionList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _SessionList_vue_vue_type_template_id_0d166054_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _SessionList_vue_vue_type_template_id_0d166054_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "0d166054",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/components/SessionList.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/components/SessionList.vue?vue&type=script&lang=js&":
/*!*****************************************************************!*\
  !*** ./src/components/SessionList.vue?vue&type=script&lang=js& ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_SessionList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib!../../node_modules/vue-loader/lib??vue-loader-options!./SessionList.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/components/SessionList.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_SessionList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_SessionList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_SessionList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_SessionList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_SessionList_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/components/SessionList.vue?vue&type=style&index=0&id=0d166054&scoped=true&lang=scss&":
/*!**************************************************************************************************!*\
  !*** ./src/components/SessionList.vue?vue&type=style&index=0&id=0d166054&scoped=true&lang=scss& ***!
  \**************************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_SessionList_vue_vue_type_style_index_0_id_0d166054_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/style-loader/dist/cjs.js!../../node_modules/css-loader/dist/cjs.js!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/sass-loader/dist/cjs.js!../../node_modules/vue-loader/lib??vue-loader-options!./SessionList.vue?vue&type=style&index=0&id=0d166054&scoped=true&lang=scss& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/components/SessionList.vue?vue&type=style&index=0&id=0d166054&scoped=true&lang=scss&");
/* empty/unused harmony star reexport */

/***/ }),

/***/ "./src/components/SessionList.vue?vue&type=template&id=0d166054&scoped=true&":
/*!***********************************************************************************!*\
  !*** ./src/components/SessionList.vue?vue&type=template&id=0d166054&scoped=true& ***!
  \***********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SessionList_vue_vue_type_template_id_0d166054_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib??vue-loader-options!./SessionList.vue?vue&type=template&id=0d166054&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/components/SessionList.vue?vue&type=template&id=0d166054&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SessionList_vue_vue_type_template_id_0d166054_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SessionList_vue_vue_type_template_id_0d166054_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=editor-collab.js.map?v=14adbfbd5bd796dbab09