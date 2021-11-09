(window["textWebpackJsonp"] = window["textWebpackJsonp"] || []).push([["editor-rich"],{

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/components/MenuBar.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/components/MenuBar.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tiptap = __webpack_require__(/*! tiptap */ "./node_modules/tiptap/dist/tiptap.esm.js");

var _Tooltip = _interopRequireDefault(__webpack_require__(/*! @nextcloud/vue/dist/Directives/Tooltip */ "./node_modules/@nextcloud/vue/dist/Directives/Tooltip.js"));

var _menubar = _interopRequireDefault(__webpack_require__(/*! ./../mixins/menubar */ "./src/mixins/menubar.js"));

var _files = __webpack_require__(/*! ./../helpers/files */ "./src/helpers/files.js");

var _Actions = _interopRequireDefault(__webpack_require__(/*! @nextcloud/vue/dist/Components/Actions */ "./node_modules/@nextcloud/vue/dist/Components/Actions.js"));

var _ActionButton = _interopRequireDefault(__webpack_require__(/*! @nextcloud/vue/dist/Components/ActionButton */ "./node_modules/@nextcloud/vue/dist/Components/ActionButton.js"));

var _PopoverMenu = _interopRequireDefault(__webpack_require__(/*! @nextcloud/vue/dist/Components/PopoverMenu */ "./node_modules/@nextcloud/vue/dist/Components/PopoverMenu.js"));

var _vueClickOutside = _interopRequireDefault(__webpack_require__(/*! vue-click-outside */ "./node_modules/vue-click-outside/index.js"));

var _auth = __webpack_require__(/*! @nextcloud/auth */ "./node_modules/@nextcloud/auth/dist/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var _default = {
  name: 'MenuBar',
  components: {
    EditorMenuBar: _tiptap.EditorMenuBar,
    ActionButton: _ActionButton.default,
    PopoverMenu: _PopoverMenu.default,
    Actions: _Actions.default
  },
  directives: {
    Tooltip: _Tooltip.default,
    ClickOutside: _vueClickOutside.default
  },
  props: {
    editor: {
      type: Object,
      required: false,
      default: null
    },
    isRichEditor: {
      type: Boolean,
      default: true
    },
    autohide: {
      type: Boolean,
      default: false
    },
    isPublic: {
      type: Boolean,
      default: false
    },
    filePath: {
      type: String,
      required: false,
      default: ''
    }
  },
  data: function data() {
    return {
      windowWidth: 0,
      windowHeight: 0,
      forceRecompute: 0,
      submenuVisibility: {},
      lastImagePath: null,
      icons: _toConsumableArray(_menubar.default)
    };
  },
  computed: {
    isHiddenInMenu: function isHiddenInMenu() {
      var _this = this;

      return function ($index) {
        return $index - _this.iconCount >= 0;
      };
    },
    getIconClasses: function getIconClasses() {
      return function (isActive, icon) {
        var classes = {
          'is-active': typeof icon.isActive === 'function' ? icon.isActive(isActive) : false
        };
        classes[icon.class] = true;
        return classes;
      };
    },
    disabled: function disabled() {
      return function (commands, menuItem) {
        return false; // FIXME with this we seem to be running into an endless rerender loop, so this needs more investigation at some later point
        // typeof menuItem.isDisabled === 'function' ? menuItem.isDisabled()(commands) : false
      };
    },
    isChildMenuVisible: function isChildMenuVisible() {
      var _this2 = this;

      return function (icon) {
        return Object.prototype.hasOwnProperty.call(_this2.submenuVisibility, icon.label) ? _this2.submenuVisibility[icon.label] : false;
      };
    },
    allIcons: function allIcons() {
      var _this3 = this;

      if (this.isPublic) {
        return this.icons;
      }

      return [].concat(_toConsumableArray(this.icons), [{
        label: t('text', 'Insert image'),
        class: 'icon-image',
        isActive: function isActive() {},
        action: function action(commands) {
          _this3.showImagePrompt(commands.image);
        }
      }]);
    },
    childPopoverMenu: function childPopoverMenu() {
      var _this4 = this;

      return function (isActive, commands, icons, parent) {
        var popoverMenuItems = [];

        var _loop = function _loop(index) {
          popoverMenuItems.push({
            text: icons[index].label,
            icon: icons[index].class,
            action: function action() {
              icons[index].action(commands);

              _this4.hideChildMenu(parent);
            },
            active: icons[index].isActive(isActive)
          });
        };

        for (var index in icons) {
          _loop(index);
        }

        return popoverMenuItems;
      };
    },
    childIconClasses: function childIconClasses() {
      var _this5 = this;

      return function (isActive, icons) {
        var icon = _this5.childIcon(isActive, icons);

        return _this5.getIconClasses(isActive, icon);
      };
    },
    childIcon: function childIcon() {
      return function (isActive, icons) {
        for (var index in icons) {
          var icon = icons[index];

          if (icon.isActive(isActive)) {
            return icon;
          }
        }

        return icons[0];
      };
    },
    iconCount: function iconCount() {
      this.forceRecompute; // eslint-disable-line

      this.windowWidth; // eslint-disable-line

      var menuBarWidth = this.$refs.menubar && this.$refs.menubar.clientWidth > 200 ? this.$refs.menubar.clientWidth : 200;
      var iconCount = Math.max(Math.floor(menuBarWidth / 44) - 2, 0);
      return iconCount;
    },
    imagePath: function imagePath() {
      return this.lastImagePath || this.filePath.split('/').slice(0, -1).join('/');
    }
  },
  mounted: function mounted() {
    var _this6 = this;

    window.addEventListener('resize', this.getWindowWidth);
    this.checkInterval = setInterval(function () {
      var isWidthAvailable = _this6.$refs.menubar && _this6.$refs.menubar.clientWidth > 0;

      if (_this6.isRichEditor && isWidthAvailable) {
        _this6.redrawMenuBar();
      }

      if (!_this6.isRichEditor || isWidthAvailable) {
        clearInterval(_this6.checkInterval);
      }
    }, 100);
  },
  beforeDestroy: function beforeDestroy() {
    window.removeEventListener('resize', this.getWindowWidth);
  },
  methods: {
    redrawMenuBar: function redrawMenuBar() {
      var _this7 = this;

      this.$nextTick(function () {
        _this7.getWindowWidth();

        _this7.forceRecompute++;
      });
    },
    clickIcon: function clickIcon(commands, icon) {
      return icon.action(commands);
    },
    getWindowWidth: function getWindowWidth(event) {
      this.windowWidth = document.documentElement.clientWidth;
    },
    getWindowHeight: function getWindowHeight(event) {
      this.windowHeight = document.documentElement.clientHeight;
    },
    hideChildMenu: function hideChildMenu(icon) {
      this.$set(this.submenuVisibility, icon.label, false);
    },
    toggleChildMenu: function toggleChildMenu(icon) {
      var lastValue = Object.prototype.hasOwnProperty.call(this.submenuVisibility, icon.label) ? this.submenuVisibility[icon.label] : false;
      this.$set(this.submenuVisibility, icon.label, !lastValue);
    },
    showImagePrompt: function showImagePrompt(command) {
      var _this8 = this;

      var currentUser = (0, _auth.getCurrentUser)();

      if (!currentUser) {
        return;
      }

      var _command = command;
      OC.dialogs.filepicker(t('text', 'Insert an image'), function (file) {
        var client = OC.Files.getClient();
        client.getFileInfo(file).then(function (_status, fileInfo) {
          _this8.lastImagePath = fileInfo.path; // dirty but works so we have the information stored in markdown

          var appendMeta = {
            mimetype: fileInfo.mimetype,
            hasPreview: fileInfo.hasPreview
          };
          var path = (0, _files.optimalPath)(_this8.filePath, "".concat(fileInfo.path, "/").concat(fileInfo.name));
          var encodedPath = path.split('/').map(encodeURIComponent).join('/');
          var meta = Object.entries(appendMeta).map(function (_ref) {
            var _ref2 = _slicedToArray(_ref, 2),
                key = _ref2[0],
                val = _ref2[1];

            return "".concat(key, "=").concat(encodeURIComponent(val));
          }).join('&');
          var src = "".concat(encodedPath, "?fileId=").concat(fileInfo.id, "#").concat(meta);

          _command({
            src: src,
            alt: fileInfo.name
          });
        });
      }, false, [], true, undefined, this.imagePath);
    },
    showLinkPrompt: function showLinkPrompt(command) {
      var _this9 = this;

      var currentUser = OC.getCurrentUser();

      if (!currentUser) {
        return;
      }

      var _command = command;
      OC.dialogs.filepicker('Insert a link', function (file) {
        var client = OC.Files.getClient();
        client.getFileInfo(file).then(function (_status, fileInfo) {
          _this9.lastLinkPath = fileInfo.path;

          var path = _this9.optimalPathTo("".concat(fileInfo.path, "/").concat(fileInfo.name));

          var encodedPath = path.split('/').map(encodeURIComponent).join('/');
          var href = "".concat(encodedPath, "?fileId=").concat(fileInfo.id);

          _command({
            href: href
          });
        });
      }, false, [], true, undefined, this.linkPath);
    },
    optimalPathTo: function optimalPathTo(targetFile) {
      var absolutePath = targetFile.split('/');
      var relativePath = this.relativePathTo(targetFile).split('/');
      return relativePath.length < absolutePath.length ? relativePath.join('/') : targetFile;
    },
    relativePathTo: function relativePathTo(targetFile) {
      var current = this.filePath.split('/');
      var target = targetFile.split('/');
      current.pop(); // ignore filename

      while (current[0] === target[0]) {
        current.shift();
        target.shift();
      }

      return current.fill('..').concat(target).join('/');
    }
  }
};
exports.default = _default;

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/components/MenuBubble.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/components/MenuBubble.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tiptap = __webpack_require__(/*! tiptap */ "./node_modules/tiptap/dist/tiptap.esm.js");

var _Tooltip = _interopRequireDefault(__webpack_require__(/*! @nextcloud/vue/dist/Directives/Tooltip */ "./node_modules/@nextcloud/vue/dist/Directives/Tooltip.js"));

var _files = __webpack_require__(/*! ./../helpers/files */ "./src/helpers/files.js");

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
var _default = {
  name: 'MenuBubble',
  components: {
    EditorMenuBubble: _tiptap.EditorMenuBubble
  },
  directives: {
    tooltip: _Tooltip.default
  },
  props: {
    editor: {
      type: Object,
      required: false,
      default: null
    },
    filePath: {
      type: String,
      required: false,
      default: ''
    }
  },
  data: function data() {
    return {
      linkUrl: null,
      linkMenuIsActive: false
    };
  },
  methods: {
    showLinkMenu: function showLinkMenu(attrs) {
      var _this = this;

      this.linkUrl = attrs.href;
      this.linkMenuIsActive = true;
      this.$nextTick(function () {
        _this.$refs.linkInput.focus();
      });
    },
    hideLinkMenu: function hideLinkMenu() {
      this.linkUrl = null;
      this.linkMenuIsActive = false;
    },
    selectFile: function selectFile(command) {
      var _this2 = this;

      var currentUser = OC.getCurrentUser();

      if (!currentUser) {
        return;
      }

      var startPath = this.filePath.split('/').slice(0, -1).join('/');
      OC.dialogs.filepicker(t('text', 'Select file to link to'), function (file) {
        var client = OC.Files.getClient();
        client.getFileInfo(file).then(function (_status, fileInfo) {
          var path = (0, _files.optimalPath)(_this2.filePath, "".concat(fileInfo.path, "/").concat(fileInfo.name));
          var encodedPath = path.split('/').map(encodeURIComponent).join('/');
          command({
            href: "".concat(encodedPath, "?fileId=").concat(fileInfo.id)
          });

          _this2.hideLinkMenu();
        });
      }, false, [], true, undefined, startPath);
    },
    setLinkUrl: function setLinkUrl(command, url) {
      // Heuristics for determining if we need a https:// prefix.
      var noPrefixes = [/^[a-zA-Z]+:/, // url with protocol ("mailTo:email@domain.tld")
      /^\//, // absolute path
      /\?fileId=/, // relative link with fileId
      /^\.\.?\//, // relative link starting with ./ or ../
      /^[^.]*[/$]/, // no dots before first '/' - not a domain name
      /^#/ // url fragment
      ];

      if (url && !noPrefixes.find(function (regex) {
        return url.match(regex);
      })) {
        url = 'https://' + url;
      }

      command({
        href: url
      });
      this.hideLinkMenu();
    }
  }
};
exports.default = _default;

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/views/RichWorkspace.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/views/RichWorkspace.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _axios = _interopRequireDefault(__webpack_require__(/*! @nextcloud/axios */ "./node_modules/@nextcloud/axios/dist/index.js"));

var _router = __webpack_require__(/*! @nextcloud/router */ "./node_modules/@nextcloud/router/dist/index.js");

var _eventBus = __webpack_require__(/*! @nextcloud/event-bus */ "./node_modules/@nextcloud/event-bus/dist/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var IS_PUBLIC = !!document.getElementById('isPublic');
var WORKSPACE_URL = (0, _router.generateOcsUrl)('apps/text' + (IS_PUBLIC ? '/public' : ''), 2) + 'workspace';
var _default = {
  name: 'RichWorkspace',
  components: {
    EditorWrapper: function EditorWrapper() {
      return Promise.all(/*! import() | editor */[__webpack_require__.e("vendors~editor~files-modal"), __webpack_require__.e("vendors~editor"), __webpack_require__.e("editor")]).then(__webpack_require__.bind(null, /*! ./../components/EditorWrapper */ "./src/components/EditorWrapper.vue"));
    }
  },
  props: {
    path: {
      type: String,
      required: true
    }
  },
  data: function data() {
    return {
      focus: false,
      folder: null,
      file: null,
      loaded: false,
      ready: false,
      autofocus: false,
      darkTheme: OCA.Accessibility && OCA.Accessibility.theme === 'dark',
      enabled: OCA.Text.RichWorkspaceEnabled
    };
  },
  computed: {
    shareToken: function shareToken() {
      return document.getElementById('sharingToken') ? document.getElementById('sharingToken').value : null;
    },
    canCreate: function canCreate() {
      return !!(this.folder && this.folder.permissions & OC.PERMISSION_CREATE);
    },
    showEmptyWorkspace: function showEmptyWorkspace() {
      return (!this.file || this.autofocus && !this.ready) && this.canCreate;
    }
  },
  watch: {
    path: function path() {
      this.getFileInfo();
    },
    focus: function focus(newValue) {
      if (!newValue) {
        document.querySelector('#editor').scrollTo(0, 0);
      }
    }
  },
  mounted: function mounted() {
    var _this = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (_this.enabled) {
                _this.getFileInfo();
              }

              (0, _eventBus.subscribe)('Text::showRichWorkspace', function () {
                _this.enabled = true;

                _this.getFileInfo();
              });
              (0, _eventBus.subscribe)('Text::hideRichWorkspace', function () {
                _this.enabled = false;
              });

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },
  methods: {
    unfocus: function unfocus() {// setTimeout(() => this.focus = false, 2000)
    },
    reset: function reset() {
      var _this2 = this;

      this.file = null;
      this.focus = false;
      this.$nextTick(function () {
        _this2.creating = false;

        _this2.getFileInfo();
      });
    },
    getFileInfo: function getFileInfo() {
      var _this3 = this;

      this.loaded = false;
      this.autofocus = false;
      this.ready = false;
      var params = {
        path: this.path
      };

      if (IS_PUBLIC) {
        params.shareToken = this.shareToken;
      }

      return _axios.default.get(WORKSPACE_URL, {
        params: params
      }).then(function (response) {
        var data = response.data.ocs.data;
        _this3.folder = data.folder || null;
        _this3.file = data.file;
        _this3.editing = true;
        _this3.loaded = true;
        return true;
      }).catch(function (error) {
        if (error.response.data.ocs && error.response.data.ocs.data.folder) {
          _this3.folder = error.response.data.ocs.data.folder;
        } else {
          _this3.folder = null;
        }

        _this3.file = null;
        _this3.loaded = true;
        _this3.ready = true;
        _this3.creating = false;
        return false;
      });
    },
    createNew: function createNew() {
      var _this4 = this;

      if (this.creating) {
        return;
      }

      this.creating = true;
      this.getFileInfo().then(function (workspaceFileExists) {
        _this4.autofocus = true;

        if (!workspaceFileExists) {
          window.FileList.createFile('Readme.md', {
            scrollTo: false,
            animate: false
          }).then(function (status, data) {
            _this4.getFileInfo();
          });
        }
      });
    }
  }
};
exports.default = _default;

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/components/MenuBar.vue?vue&type=style&index=0&id=4a501398&scoped=true&lang=scss&":
/*!**************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/components/MenuBar.vue?vue&type=style&index=0&id=4a501398&scoped=true&lang=scss& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.i, ".menubar[data-v-4a501398] {\n  --background-blur: blur(10px);\n  position: fixed;\n  position: -webkit-sticky;\n  position: sticky;\n  top: 0;\n  display: flex;\n  justify-content: flex-end;\n  z-index: 10021;\n  background-color: var(--color-main-background-translucent);\n  -webkit-backdrop-filter: var(--background-blur);\n  backdrop-filter: var(--background-blur);\n  min-height: 50px;\n  padding-top: 3px;\n  padding-bottom: 3px;\n}\n.menubar.autohide[data-v-4a501398] {\n  visibility: hidden;\n  opacity: 0;\n  transition: visibility 0.2s 0.4s, opacity 0.2s 0.4s;\n}\n.menubar.autohide.is-focused[data-v-4a501398] {\n  visibility: visible;\n  opacity: 1;\n}\n.menubar .menubar-icons[data-v-4a501398] {\n  flex-grow: 1;\n  margin-left: calc((100% - 660px) / 2);\n}\n@media (max-width: 660px) {\n.menubar .menubar-icons[data-v-4a501398] {\n    margin-left: 0;\n}\n}\n.menubar[data-v-4a501398] .action-item__menu ul {\n  max-height: calc(100vh - 88px);\n  overflow: scroll;\n}\n.menubar button[data-v-4a501398] {\n  position: relative;\n  width: 44px;\n  height: 44px;\n  margin: 0;\n  background-size: 16px;\n  border: 0;\n  background-color: transparent;\n  opacity: 0.5;\n  color: var(--color-main-text);\n  background-position: center center;\n  vertical-align: top;\n}\n.menubar button[data-v-4a501398]:hover, .menubar button[data-v-4a501398]:focus, .menubar button[data-v-4a501398]:active {\n  background-color: var(--color-background-dark);\n}\n.menubar button.is-active[data-v-4a501398]::before {\n  transform: translateX(-50%);\n  border-radius: 100%;\n  position: absolute;\n  background: var(--color-primary-element);\n  bottom: 3px;\n  height: 6px;\n  width: 6px;\n  content: \"\";\n  left: 50%;\n}\n.menubar button.is-active[data-v-4a501398], .menubar button[data-v-4a501398]:hover, .menubar button[data-v-4a501398]:focus {\n  opacity: 1;\n}\n.menubar button.icon-undo[data-v-4a501398], .menubar button.icon-redo[data-v-4a501398] {\n  opacity: 0.8;\n}\n.menubar button.icon-undo[data-v-4a501398]:disabled, .menubar button.icon-redo[data-v-4a501398]:disabled {\n  opacity: 0.4;\n}\n.menubar .submenu[data-v-4a501398] {\n  display: inline-block;\n  width: 44px;\n  height: 44px;\n  position: relative;\n  vertical-align: top;\n}", "",{"version":3,"sources":["webpack://./src/components/MenuBar.vue","webpack://./MenuBar.vue"],"names":[],"mappings":"AAqUA;EACC,6BAAA;EACA,eAAA;EACA,wBAAA;EACA,gBAAA;EACA,MAAA;EACA,aAAA;EACA,yBAAA;EACA,cAAA;EACA,0DAAA;EACA,+CAAA;EACA,uCAAA;EACA,gBAAA;EACA,gBAAA;EACA,mBAAA;ACpUD;ADsUC;EACC,kBAAA;EACA,UAAA;EACA,mDAAA;ACpUF;ADqUE;EACC,mBAAA;EACA,UAAA;ACnUH;ADsUC;EACC,YAAA;EACA,qCAAA;ACpUF;ADsUC;AACC;IACC,cAAA;ACpUD;AACF;ADsUC;EACC,8BAAA;EACA,gBAAA;ACpUF;ADwUA;EACC,kBAAA;EACA,WAAA;EACA,YAAA;EACA,SAAA;EACA,qBAAA;EACA,SAAA;EACA,6BAAA;EACA,YAAA;EACA,6BAAA;EACA,kCAAA;EACA,mBAAA;ACrUD;ADsUC;EACC,8CAAA;ACpUF;ADuUC;EACC,2BAAA;EACA,mBAAA;EACA,kBAAA;EACA,wCAAA;EACA,WAAA;EACA,WAAA;EACA,UAAA;EACA,WAAA;EACA,SAAA;ACrUF;ADwUC;EAGC,UAAA;ACxUF;AD2UC;EAEC,YAAA;AC1UF;AD4UE;EACC,YAAA;AC1UH;AD+UA;EACC,qBAAA;EACA,WAAA;EACA,YAAA;EACA,kBAAA;EACA,mBAAA;AC5UD","sourcesContent":["\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.menubar {\n\t--background-blur: blur(10px);\n\tposition: fixed;\n\tposition: -webkit-sticky;\n\tposition: sticky;\n\ttop: 0;\n\tdisplay: flex;\n\tjustify-content: flex-end;\n\tz-index: 10021; // above modal-header and menububble so menubar is always on top\n\tbackground-color: var(--color-main-background-translucent);\n\t-webkit-backdrop-filter: var(--background-blur);\n\tbackdrop-filter: var(--background-blur);\n\tmin-height: 50px; // important for mobile so that the buttons are always inside the container\n\tpadding-top:3px;\n\tpadding-bottom: 3px;\n\n\t&.autohide {\n\t\tvisibility: hidden;\n\t\topacity: 0;\n\t\ttransition: visibility 0.2s 0.4s, opacity 0.2s 0.4s;\n\t\t&.is-focused {\n\t\t\tvisibility: visible;\n\t\t\topacity: 1;\n\t\t}\n\t}\n\t.menubar-icons {\n\t\tflex-grow: 1;\n\t\tmargin-left: calc((100% - 660px) / 2);\n\t}\n\t@media (max-width: 660px) {\n\t\t.menubar-icons {\n\t\t\tmargin-left: 0;\n\t\t}\n\t}\n\t&::v-deep .action-item__menu ul {\n\t\tmax-height: calc(100vh - 88px);\n\t\toverflow: scroll;\n\t}\n}\n\n.menubar button {\n\tposition: relative;\n\twidth: 44px;\n\theight: 44px;\n\tmargin: 0;\n\tbackground-size: 16px;\n\tborder: 0;\n\tbackground-color: transparent;\n\topacity: .5;\n\tcolor: var(--color-main-text);\n\tbackground-position: center center;\n\tvertical-align: top;\n\t&:hover, &:focus, &:active {\n\t\tbackground-color: var(--color-background-dark);\n\t}\n\n\t&.is-active::before {\n\t\ttransform: translateX(-50%);\n\t\tborder-radius: 100%;\n\t\tposition: absolute;\n\t\tbackground: var(--color-primary-element);\n\t\tbottom: 3px;\n\t\theight: 6px;\n\t\twidth: 6px;\n\t\tcontent: '';\n\t\tleft: 50%;\n\n\t}\n\t&.is-active,\n\t&:hover,\n\t&:focus {\n\t\topacity: 1;\n\t}\n\n\t&.icon-undo,\n\t&.icon-redo {\n\t\topacity: .8;\n\n\t\t&:disabled {\n\t\t\topacity: .4;\n\t\t}\n\t}\n}\n\n.menubar .submenu {\n\tdisplay: inline-block;\n\twidth: 44px;\n\theight: 44px;\n\tposition: relative;\n\tvertical-align: top;\n}\n",".menubar {\n  --background-blur: blur(10px);\n  position: fixed;\n  position: -webkit-sticky;\n  position: sticky;\n  top: 0;\n  display: flex;\n  justify-content: flex-end;\n  z-index: 10021;\n  background-color: var(--color-main-background-translucent);\n  -webkit-backdrop-filter: var(--background-blur);\n  backdrop-filter: var(--background-blur);\n  min-height: 50px;\n  padding-top: 3px;\n  padding-bottom: 3px;\n}\n.menubar.autohide {\n  visibility: hidden;\n  opacity: 0;\n  transition: visibility 0.2s 0.4s, opacity 0.2s 0.4s;\n}\n.menubar.autohide.is-focused {\n  visibility: visible;\n  opacity: 1;\n}\n.menubar .menubar-icons {\n  flex-grow: 1;\n  margin-left: calc((100% - 660px) / 2);\n}\n@media (max-width: 660px) {\n  .menubar .menubar-icons {\n    margin-left: 0;\n  }\n}\n.menubar::v-deep .action-item__menu ul {\n  max-height: calc(100vh - 88px);\n  overflow: scroll;\n}\n\n.menubar button {\n  position: relative;\n  width: 44px;\n  height: 44px;\n  margin: 0;\n  background-size: 16px;\n  border: 0;\n  background-color: transparent;\n  opacity: 0.5;\n  color: var(--color-main-text);\n  background-position: center center;\n  vertical-align: top;\n}\n.menubar button:hover, .menubar button:focus, .menubar button:active {\n  background-color: var(--color-background-dark);\n}\n.menubar button.is-active::before {\n  transform: translateX(-50%);\n  border-radius: 100%;\n  position: absolute;\n  background: var(--color-primary-element);\n  bottom: 3px;\n  height: 6px;\n  width: 6px;\n  content: \"\";\n  left: 50%;\n}\n.menubar button.is-active, .menubar button:hover, .menubar button:focus {\n  opacity: 1;\n}\n.menubar button.icon-undo, .menubar button.icon-redo {\n  opacity: 0.8;\n}\n.menubar button.icon-undo:disabled, .menubar button.icon-redo:disabled {\n  opacity: 0.4;\n}\n\n.menubar .submenu {\n  display: inline-block;\n  width: 44px;\n  height: 44px;\n  position: relative;\n  vertical-align: top;\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/components/MenuBubble.vue?vue&type=style&index=0&id=5496a10a&scoped=true&lang=scss&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/components/MenuBubble.vue?vue&type=style&index=0&id=5496a10a&scoped=true&lang=scss& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.i, ".menububble[data-v-5496a10a] {\n  position: absolute;\n  display: flex;\n  z-index: 10020;\n  background: var(--color-main-background-translucent);\n  box-shadow: 0 1px 5px var(--color-box-shadow);\n  border-radius: var(--border-radius-large);\n  overflow: hidden;\n  padding: 0;\n  margin-bottom: -3px;\n  margin-left: 10px;\n  visibility: hidden;\n  opacity: 0;\n  transform: translateX(-50%);\n  transition: opacity 0.2s, visibility 0.2s;\n  height: 44px;\n}\n.menububble.is-active[data-v-5496a10a] {\n  opacity: 1;\n  visibility: visible;\n}\n.menububble__button[data-v-5496a10a] {\n  display: block;\n  flex-grow: 1;\n  border: 0;\n  padding: 0.9rem 0.7rem;\n  margin: 0;\n  border-radius: 0;\n  cursor: pointer;\n  background-color: var(--color-main-background);\n  border-right: 1px solid var(--color-border);\n}\n.menububble__button[data-v-5496a10a]:focus, .menububble__button[data-v-5496a10a]:hover {\n  background-color: var(--color-background-hover);\n  border: 0;\n  border-right: 1px solid var(--color-border) !important;\n}\n.menububble__button[data-v-5496a10a]:last-child {\n  border: 0 !important;\n}\n.menububble__buttontext[data-v-5496a10a] {\n  padding: 0.4rem;\n  padding-right: 0;\n}\n.menububble__form[data-v-5496a10a] {\n  display: flex;\n  align-items: center;\n}\n.menububble__input[data-v-5496a10a] {\n  font: inherit;\n  border: none;\n  background: transparent;\n  min-width: 150px;\n}", "",{"version":3,"sources":["webpack://./src/components/MenuBubble.vue","webpack://./MenuBubble.vue"],"names":[],"mappings":"AA+IA;EACC,kBAAA;EACA,aAAA;EACA,cAAA;EACA,oDAAA;EACA,6CAAA;EACA,yCAAA;EACA,gBAAA;EACA,UAAA;EACA,mBAAA;EACA,iBAAA;EACA,kBAAA;EACA,UAAA;EACA,2BAAA;EACA,yCAAA;EACA,YAAA;AC9ID;ADgJC;EACC,UAAA;EACA,mBAAA;AC9IF;ADiJC;EACC,cAAA;EACA,YAAA;EACA,SAAA;EACA,sBAAA;EACA,SAAA;EACA,gBAAA;EACA,eAAA;EACA,8CAAA;EACA,2CAAA;AC/IF;ADiJE;EAEC,+CAAA;EACA,SAAA;EACA,sDAAA;AChJH;ADmJE;EACC,oBAAA;ACjJH;ADqJC;EACC,eAAA;EACA,gBAAA;ACnJF;ADsJC;EACC,aAAA;EACA,mBAAA;ACpJF;ADuJC;EACC,aAAA;EACA,YAAA;EACA,uBAAA;EACA,gBAAA;ACrJF","sourcesContent":["\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.menububble {\n\tposition: absolute;\n\tdisplay: flex;\n\tz-index: 10020;\n\tbackground: var(--color-main-background-translucent);\n\tbox-shadow: 0 1px 5px var(--color-box-shadow);\n\tborder-radius: var(--border-radius-large);\n\toverflow: hidden;\n\tpadding: 0;\n\tmargin-bottom: -3px;\n\tmargin-left: 10px;\n\tvisibility: hidden;\n\topacity: 0;\n\ttransform: translateX(-50%);\n\ttransition: opacity 0.2s, visibility 0.2s;\n\theight: 44px;\n\n\t&.is-active {\n\t\topacity: 1;\n\t\tvisibility: visible;\n\t}\n\n\t&__button {\n\t\tdisplay: block;\n\t\tflex-grow: 1;\n\t\tborder: 0;\n\t\tpadding: 0.9rem 0.7rem;\n\t\tmargin: 0;\n\t\tborder-radius: 0;\n\t\tcursor: pointer;\n\t\tbackground-color: var(--color-main-background);\n\t\tborder-right: 1px solid var(--color-border);\n\n\t\t&:focus,\n\t\t&:hover {\n\t\t\tbackground-color: var(--color-background-hover);\n\t\t\tborder: 0;\n\t\t\tborder-right: 1px solid var(--color-border) !important;\n\t\t}\n\n\t\t&:last-child {\n\t\t\tborder: 0 !important;\n\t\t}\n\t}\n\n\t&__buttontext {\n\t\tpadding: 0.4rem;\n\t\tpadding-right: 0;\n\t}\n\n\t&__form {\n\t\tdisplay: flex;\n\t\talign-items: center;\n\t}\n\n\t&__input {\n\t\tfont: inherit;\n\t\tborder: none;\n\t\tbackground: transparent;\n\t\tmin-width: 150px;\n\t}\n}\n",".menububble {\n  position: absolute;\n  display: flex;\n  z-index: 10020;\n  background: var(--color-main-background-translucent);\n  box-shadow: 0 1px 5px var(--color-box-shadow);\n  border-radius: var(--border-radius-large);\n  overflow: hidden;\n  padding: 0;\n  margin-bottom: -3px;\n  margin-left: 10px;\n  visibility: hidden;\n  opacity: 0;\n  transform: translateX(-50%);\n  transition: opacity 0.2s, visibility 0.2s;\n  height: 44px;\n}\n.menububble.is-active {\n  opacity: 1;\n  visibility: visible;\n}\n.menububble__button {\n  display: block;\n  flex-grow: 1;\n  border: 0;\n  padding: 0.9rem 0.7rem;\n  margin: 0;\n  border-radius: 0;\n  cursor: pointer;\n  background-color: var(--color-main-background);\n  border-right: 1px solid var(--color-border);\n}\n.menububble__button:focus, .menububble__button:hover {\n  background-color: var(--color-background-hover);\n  border: 0;\n  border-right: 1px solid var(--color-border) !important;\n}\n.menububble__button:last-child {\n  border: 0 !important;\n}\n.menububble__buttontext {\n  padding: 0.4rem;\n  padding-right: 0;\n}\n.menububble__form {\n  display: flex;\n  align-items: center;\n}\n.menububble__input {\n  font: inherit;\n  border: none;\n  background: transparent;\n  min-width: 150px;\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/views/RichWorkspace.vue?vue&type=style&index=0&id=0cce2262&lang=scss&scoped=true&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/views/RichWorkspace.vue?vue&type=style&index=0&id=0cce2262&lang=scss&scoped=true& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.i, "#rich-workspace[data-v-0cce2262] {\n  padding: 0 50px;\n  /* Slightly reduce vertical space */\n  margin-bottom: -24px;\n  text-align: left;\n  max-height: 0;\n  transition: max-height 0.5s cubic-bezier(0, 1, 0, 1);\n}\n#rich-workspace.creatable[data-v-0cce2262] {\n  min-height: 90px;\n}\n\n/* For subfolders, where there are no Recommendations */\n#rich-workspace[data-v-0cce2262]:only-child {\n  margin-bottom: 0;\n}\n.empty-workspace[data-v-0cce2262] {\n  padding-top: 43px;\n  color: var(--color-text-maxcontrast);\n  height: 0;\n}\n#rich-workspace[data-v-0cce2262] div[contenteditable=false] {\n  width: 100%;\n  padding: 0px;\n  background-color: var(--color-main-background);\n  opacity: 1;\n  border: none;\n}\n#rich-workspace[data-v-0cce2262] #editor-container {\n  height: 100%;\n  position: unset !important;\n  top: auto !important;\n}\n#rich-workspace[data-v-0cce2262] #editor-wrapper {\n  position: unset !important;\n  overflow: visible;\n}\n#rich-workspace[data-v-0cce2262] #editor {\n  overflow: visible !important;\n}\n#rich-workspace[data-v-0cce2262] .content-wrapper {\n  overflow: scroll !important;\n  max-height: 50vh;\n  max-height: calc(40vh - 50px);\n  padding-left: 10px;\n}\n#rich-workspace[data-v-0cce2262] #editor-wrapper .ProseMirror {\n  padding: 0px;\n  margin: 0;\n}\n#rich-workspace[data-v-0cce2262] .menubar {\n  z-index: 61;\n  /* Slightly reduce vertical space */\n  margin-bottom: -10px;\n}\n#rich-workspace[data-v-0cce2262] .menubar .menubar-icons {\n  margin-left: 0;\n}\n#rich-workspace[data-v-0cce2262] .editor__content {\n  margin: 0;\n}\n#rich-workspace.focus[data-v-0cce2262] {\n  max-height: 50vh;\n}\n#rich-workspace[data-v-0cce2262]:not(.focus) {\n  max-height: 30vh;\n  position: relative;\n  overflow: hidden;\n}\n#rich-workspace[data-v-0cce2262]:not(.focus):not(.icon-loading):after {\n  content: \"\";\n  position: absolute;\n  z-index: 1;\n  bottom: 0;\n  left: 0;\n  pointer-events: none;\n  background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0), var(--color-main-background));\n  width: 100%;\n  height: 4em;\n}\n#rich-workspace.dark[data-v-0cce2262]:not(.focus):not(.icon-loading):after {\n  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0), var(--color-main-background));\n}\n@media only screen and (max-width: 1024px) {\n#rich-workspace[data-v-0cce2262]:not(.focus) {\n    max-height: 30vh;\n}\n}\nhtml.ie #rich-workspace[data-v-0cce2262] #editor-container {\n  position: initial;\n}\nhtml.ie #rich-workspace[data-v-0cce2262] #editor-wrapper {\n  position: relative !important;\n  top: auto !important;\n}\nhtml.ie #rich-workspace[data-v-0cce2262] #editor {\n  display: flex;\n  flex-direction: column;\n  overflow: hidden !important;\n}\nhtml.ie #rich-workspace[data-v-0cce2262] .menubar {\n  position: relative;\n  overflow: hidden;\n  flex-shrink: 0;\n  height: 44px;\n  top: auto;\n}\nhtml.ie #rich-workspace[data-v-0cce2262] #editor > div:nth-child(2) {\n  min-height: 44px;\n  overflow-x: hidden;\n  overflow-y: auto;\n  flex-shrink: 1;\n}", "",{"version":3,"sources":["webpack://./src/views/RichWorkspace.vue","webpack://./RichWorkspace.vue"],"names":[],"mappings":"AA0KA;EACC,eAAA;EACA,mCAAA;EACA,oBAAA;EACA,gBAAA;EACA,aAAA;EACA,oDAAA;ACzKD;AD0KC;EACC,gBAAA;ACxKF;;AD4KA,uDAAA;AACA;EACC,gBAAA;ACzKD;AD4KA;EACC,iBAAA;EACA,oCAAA;EACA,SAAA;ACzKD;AD4KA;EACC,WAAA;EACA,YAAA;EACA,8CAAA;EACA,UAAA;EACA,YAAA;ACzKD;AD4KA;EACC,YAAA;EACA,0BAAA;EACA,oBAAA;ACzKD;AD4KA;EACC,0BAAA;EACA,iBAAA;ACzKD;AD4KA;EACC,4BAAA;ACzKD;AD2KA;EACC,2BAAA;EACA,gBAAA;EACA,6BAAA;EACA,kBAAA;ACxKD;AD2KA;EACC,YAAA;EACA,SAAA;ACxKD;AD2KA;EACC,WAAA;EACA,mCAAA;EACA,oBAAA;ACxKD;AD2KA;EACC,cAAA;ACxKD;AD2KA;EACC,SAAA;ACxKD;AD2KA;EACC,gBAAA;ACxKD;AD2KA;EACC,gBAAA;EACA,kBAAA;EACA,gBAAA;ACxKD;AD2KA;EACC,WAAA;EACA,kBAAA;EACA,UAAA;EACA,SAAA;EACA,OAAA;EACA,oBAAA;EACA,kGAAA;EACA,WAAA;EACA,WAAA;ACxKD;AD2KA;EACC,4FAAA;ACxKD;AD2KA;AACC;IACC,gBAAA;ACxKA;AACF;AD6KE;EACC,iBAAA;AC3KH;AD8KE;EACC,6BAAA;EACA,oBAAA;AC5KH;AD+KE;EACC,aAAA;EACA,sBAAA;EACA,2BAAA;AC7KH;ADgLE;EACC,kBAAA;EACA,gBAAA;EACA,cAAA;EACA,YAAA;EACA,SAAA;AC9KH;ADiLE;EACC,gBAAA;EACA,kBAAA;EACA,gBAAA;EACA,cAAA;AC/KH","sourcesContent":["\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n#rich-workspace {\n\tpadding: 0 50px;\n\t/* Slightly reduce vertical space */\n\tmargin-bottom: -24px;\n\ttext-align: left;\n\tmax-height: 0;\n\ttransition: max-height 0.5s cubic-bezier(0, 1, 0, 1);\n\t&.creatable {\n\t\tmin-height: 90px;\n\t}\n}\n\n/* For subfolders, where there are no Recommendations */\n#rich-workspace:only-child {\n\tmargin-bottom: 0;\n}\n\n.empty-workspace {\n\tpadding-top: 43px;\n\tcolor: var(--color-text-maxcontrast);\n\theight: 0;\n}\n\n#rich-workspace::v-deep div[contenteditable=false] {\n\twidth: 100%;\n\tpadding: 0px;\n\tbackground-color: var(--color-main-background);\n\topacity: 1;\n\tborder: none;\n}\n\n#rich-workspace::v-deep #editor-container {\n\theight: 100%;\n\tposition: unset !important;\n\ttop: auto !important;\n}\n\n#rich-workspace::v-deep #editor-wrapper {\n\tposition: unset !important;\n\toverflow: visible;\n}\n\n#rich-workspace::v-deep #editor {\n\toverflow: visible !important;\n}\n#rich-workspace::v-deep .content-wrapper {\n\toverflow: scroll !important;\n\tmax-height: 50vh;\n\tmax-height: calc(40vh - 50px);\n\tpadding-left: 10px;\n}\n\n#rich-workspace::v-deep #editor-wrapper .ProseMirror {\n\tpadding: 0px;\n\tmargin: 0;\n}\n\n#rich-workspace::v-deep .menubar {\n\tz-index: 61;\n\t/* Slightly reduce vertical space */\n\tmargin-bottom: -10px;\n}\n\n#rich-workspace::v-deep .menubar .menubar-icons {\n\tmargin-left: 0;\n}\n\n#rich-workspace::v-deep .editor__content {\n\tmargin: 0;\n}\n\n#rich-workspace.focus {\n\tmax-height: 50vh;\n}\n\n#rich-workspace:not(.focus) {\n\tmax-height: 30vh;\n\tposition: relative;\n\toverflow: hidden;\n}\n\n#rich-workspace:not(.focus):not(.icon-loading):after {\n\tcontent: '';\n\tposition: absolute;\n\tz-index: 1;\n\tbottom: 0;\n\tleft: 0;\n\tpointer-events: none;\n\tbackground-image: linear-gradient(to bottom, rgba(255, 255, 255, 0), var(--color-main-background));\n\twidth: 100%;\n\theight: 4em;\n}\n\n#rich-workspace.dark:not(.focus):not(.icon-loading):after {\n\tbackground-image: linear-gradient(to bottom, rgba(0, 0, 0, 0), var(--color-main-background));\n}\n\n@media only screen and (max-width: 1024px) {\n\t#rich-workspace:not(.focus) {\n\t\tmax-height: 30vh;\n\t}\n}\n\nhtml.ie {\n\t#rich-workspace::v-deep {\n\t\t#editor-container {\n\t\t\tposition: initial;\n\t\t}\n\n\t\t#editor-wrapper {\n\t\t\tposition: relative !important;\n\t\t\ttop: auto !important;\n\t\t}\n\n\t\t#editor {\n\t\t\tdisplay: flex;\n\t\t\tflex-direction: column;\n\t\t\toverflow: hidden !important;\n\t\t}\n\n\t\t.menubar {\n\t\t\tposition: relative;\n\t\t\toverflow: hidden;\n\t\t\tflex-shrink: 0;\n\t\t\theight: 44px;\n\t\t\ttop: auto;\n\t\t}\n\n\t\t#editor > div:nth-child(2) {\n\t\t\tmin-height: 44px;\n\t\t\toverflow-x: hidden;\n\t\t\toverflow-y: auto;\n\t\t\tflex-shrink: 1;\n\t\t}\n\t}\n}\n\n","#rich-workspace {\n  padding: 0 50px;\n  /* Slightly reduce vertical space */\n  margin-bottom: -24px;\n  text-align: left;\n  max-height: 0;\n  transition: max-height 0.5s cubic-bezier(0, 1, 0, 1);\n}\n#rich-workspace.creatable {\n  min-height: 90px;\n}\n\n/* For subfolders, where there are no Recommendations */\n#rich-workspace:only-child {\n  margin-bottom: 0;\n}\n\n.empty-workspace {\n  padding-top: 43px;\n  color: var(--color-text-maxcontrast);\n  height: 0;\n}\n\n#rich-workspace::v-deep div[contenteditable=false] {\n  width: 100%;\n  padding: 0px;\n  background-color: var(--color-main-background);\n  opacity: 1;\n  border: none;\n}\n\n#rich-workspace::v-deep #editor-container {\n  height: 100%;\n  position: unset !important;\n  top: auto !important;\n}\n\n#rich-workspace::v-deep #editor-wrapper {\n  position: unset !important;\n  overflow: visible;\n}\n\n#rich-workspace::v-deep #editor {\n  overflow: visible !important;\n}\n\n#rich-workspace::v-deep .content-wrapper {\n  overflow: scroll !important;\n  max-height: 50vh;\n  max-height: calc(40vh - 50px);\n  padding-left: 10px;\n}\n\n#rich-workspace::v-deep #editor-wrapper .ProseMirror {\n  padding: 0px;\n  margin: 0;\n}\n\n#rich-workspace::v-deep .menubar {\n  z-index: 61;\n  /* Slightly reduce vertical space */\n  margin-bottom: -10px;\n}\n\n#rich-workspace::v-deep .menubar .menubar-icons {\n  margin-left: 0;\n}\n\n#rich-workspace::v-deep .editor__content {\n  margin: 0;\n}\n\n#rich-workspace.focus {\n  max-height: 50vh;\n}\n\n#rich-workspace:not(.focus) {\n  max-height: 30vh;\n  position: relative;\n  overflow: hidden;\n}\n\n#rich-workspace:not(.focus):not(.icon-loading):after {\n  content: \"\";\n  position: absolute;\n  z-index: 1;\n  bottom: 0;\n  left: 0;\n  pointer-events: none;\n  background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0), var(--color-main-background));\n  width: 100%;\n  height: 4em;\n}\n\n#rich-workspace.dark:not(.focus):not(.icon-loading):after {\n  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0), var(--color-main-background));\n}\n\n@media only screen and (max-width: 1024px) {\n  #rich-workspace:not(.focus) {\n    max-height: 30vh;\n  }\n}\nhtml.ie #rich-workspace::v-deep #editor-container {\n  position: initial;\n}\nhtml.ie #rich-workspace::v-deep #editor-wrapper {\n  position: relative !important;\n  top: auto !important;\n}\nhtml.ie #rich-workspace::v-deep #editor {\n  display: flex;\n  flex-direction: column;\n  overflow: hidden !important;\n}\nhtml.ie #rich-workspace::v-deep .menubar {\n  position: relative;\n  overflow: hidden;\n  flex-shrink: 0;\n  height: 44px;\n  top: auto;\n}\nhtml.ie #rich-workspace::v-deep #editor > div:nth-child(2) {\n  min-height: 44px;\n  overflow-x: hidden;\n  overflow-y: auto;\n  flex-shrink: 1;\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/components/MenuBar.vue?vue&type=style&index=0&id=4a501398&scoped=true&lang=scss&":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/components/MenuBar.vue?vue&type=style&index=0&id=4a501398&scoped=true&lang=scss& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_MenuBar_vue_vue_type_style_index_0_id_4a501398_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/sass-loader/dist/cjs.js!../../node_modules/vue-loader/lib??vue-loader-options!./MenuBar.vue?vue&type=style&index=0&id=4a501398&scoped=true&lang=scss& */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/components/MenuBar.vue?vue&type=style&index=0&id=4a501398&scoped=true&lang=scss&");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_MenuBar_vue_vue_type_style_index_0_id_4a501398_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ __webpack_exports__["default"] = (_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_MenuBar_vue_vue_type_style_index_0_id_4a501398_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/components/MenuBubble.vue?vue&type=style&index=0&id=5496a10a&scoped=true&lang=scss&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/components/MenuBubble.vue?vue&type=style&index=0&id=5496a10a&scoped=true&lang=scss& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_MenuBubble_vue_vue_type_style_index_0_id_5496a10a_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/sass-loader/dist/cjs.js!../../node_modules/vue-loader/lib??vue-loader-options!./MenuBubble.vue?vue&type=style&index=0&id=5496a10a&scoped=true&lang=scss& */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/components/MenuBubble.vue?vue&type=style&index=0&id=5496a10a&scoped=true&lang=scss&");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_MenuBubble_vue_vue_type_style_index_0_id_5496a10a_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ __webpack_exports__["default"] = (_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_MenuBubble_vue_vue_type_style_index_0_id_5496a10a_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/views/RichWorkspace.vue?vue&type=style&index=0&id=0cce2262&lang=scss&scoped=true&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/views/RichWorkspace.vue?vue&type=style&index=0&id=0cce2262&lang=scss&scoped=true& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_RichWorkspace_vue_vue_type_style_index_0_id_0cce2262_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/sass-loader/dist/cjs.js!../../node_modules/vue-loader/lib??vue-loader-options!./RichWorkspace.vue?vue&type=style&index=0&id=0cce2262&lang=scss&scoped=true& */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/views/RichWorkspace.vue?vue&type=style&index=0&id=0cce2262&lang=scss&scoped=true&");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_RichWorkspace_vue_vue_type_style_index_0_id_0cce2262_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ __webpack_exports__["default"] = (_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_RichWorkspace_vue_vue_type_style_index_0_id_0cce2262_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/components/MenuBar.vue?vue&type=template&id=4a501398&scoped=true&":
/*!*************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/components/MenuBar.vue?vue&type=template&id=4a501398&scoped=true& ***!
  \*************************************************************************************************************************************************************************************************************/
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
  return _c("EditorMenuBar", {
    attrs: { editor: _vm.editor },
    scopedSlots: _vm._u(
      [
        {
          key: "default",
          fn: function(ref) {
            var commands = ref.commands
            var isActive = ref.isActive
            var focused = ref.focused
            return [
              _c(
                "div",
                {
                  staticClass: "menubar",
                  class: { "is-focused": focused, autohide: _vm.autohide }
                },
                [
                  _vm.isRichEditor
                    ? _c(
                        "div",
                        { ref: "menubar", staticClass: "menubar-icons" },
                        [
                          _vm._l(_vm.allIcons, function(icon, $index) {
                            return [
                              icon.class
                                ? _c("button", {
                                    directives: [
                                      {
                                        name: "show",
                                        rawName: "v-show",
                                        value: $index < _vm.iconCount,
                                        expression: "$index < iconCount"
                                      }
                                    ],
                                    key: icon.label,
                                    class: _vm.getIconClasses(isActive, icon),
                                    attrs: {
                                      title: icon.label,
                                      disabled: _vm.disabled(commands, icon)
                                    },
                                    on: {
                                      click: function($event) {
                                        return _vm.clickIcon(commands, icon)
                                      }
                                    }
                                  })
                                : [
                                    _c(
                                      "div",
                                      {
                                        directives: [
                                          {
                                            name: "show",
                                            rawName: "v-show",
                                            value:
                                              $index < _vm.iconCount ||
                                              !icon.class,
                                            expression:
                                              "$index < iconCount || !icon.class"
                                          },
                                          {
                                            name: "click-outside",
                                            rawName: "v-click-outside",
                                            value: function() {
                                              return _vm.hideChildMenu(icon)
                                            },
                                            expression:
                                              "() => hideChildMenu(icon)"
                                          }
                                        ],
                                        key: icon.label,
                                        staticClass: "submenu"
                                      },
                                      [
                                        _c("button", {
                                          class: _vm.childIconClasses(
                                            isActive,
                                            icon.children
                                          ),
                                          attrs: { title: icon.label },
                                          on: {
                                            click: function($event) {
                                              $event.preventDefault()
                                              return _vm.toggleChildMenu(icon)
                                            }
                                          }
                                        }),
                                        _vm._v(" "),
                                        _c(
                                          "div",
                                          {
                                            staticClass:
                                              "popovermenu menu-center",
                                            class: {
                                              open: _vm.isChildMenuVisible(icon)
                                            }
                                          },
                                          [
                                            _c("PopoverMenu", {
                                              attrs: {
                                                menu: _vm.childPopoverMenu(
                                                  isActive,
                                                  commands,
                                                  icon.children,
                                                  icon
                                                )
                                              }
                                            })
                                          ],
                                          1
                                        )
                                      ]
                                    )
                                  ]
                            ]
                          }),
                          _vm._v(" "),
                          _c(
                            "Actions",
                            [
                              _vm._l(_vm.allIcons, function(icon, $index) {
                                return [
                                  icon.class && _vm.isHiddenInMenu($index)
                                    ? _c(
                                        "ActionButton",
                                        {
                                          key: icon.class,
                                          attrs: { icon: icon.class },
                                          on: {
                                            click: function($event) {
                                              return _vm.clickIcon(
                                                commands,
                                                icon
                                              )
                                            }
                                          }
                                        },
                                        [
                                          _vm._v(
                                            "\n\t\t\t\t\t\t" +
                                              _vm._s(icon.label) +
                                              "\n\t\t\t\t\t"
                                          )
                                        ]
                                      )
                                    : _vm._e()
                                ]
                              })
                            ],
                            2
                          )
                        ],
                        2
                      )
                    : _vm._e(),
                  _vm._v(" "),
                  _vm._t("default", function() {
                    return [_vm._v("\n\t\t\tLeft side\n\t\t")]
                  })
                ],
                2
              )
            ]
          }
        }
      ],
      null,
      true
    )
  })
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/components/MenuBubble.vue?vue&type=template&id=5496a10a&scoped=true&":
/*!****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/components/MenuBubble.vue?vue&type=template&id=5496a10a&scoped=true& ***!
  \****************************************************************************************************************************************************************************************************************/
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
  return _c("EditorMenuBubble", {
    staticClass: "menububble",
    attrs: { editor: _vm.editor },
    on: { hide: _vm.hideLinkMenu },
    scopedSlots: _vm._u([
      {
        key: "default",
        fn: function(ref) {
          var commands = ref.commands
          var isActive = ref.isActive
          var getMarkAttrs = ref.getMarkAttrs
          var menu = ref.menu
          return [
            _c(
              "div",
              {
                staticClass: "menububble",
                class: { "is-active": menu.isActive },
                style:
                  "left: " + menu.left + "px; bottom: " + menu.bottom + "px;"
              },
              [
                _vm.linkMenuIsActive
                  ? _c(
                      "form",
                      {
                        staticClass: "menububble__form",
                        on: {
                          submit: function($event) {
                            $event.preventDefault()
                            return _vm.setLinkUrl(commands.link, _vm.linkUrl)
                          }
                        }
                      },
                      [
                        _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.linkUrl,
                              expression: "linkUrl"
                            }
                          ],
                          ref: "linkInput",
                          staticClass: "menububble__input",
                          attrs: { type: "text", placeholder: "https://" },
                          domProps: { value: _vm.linkUrl },
                          on: {
                            keydown: function($event) {
                              if (
                                !$event.type.indexOf("key") &&
                                _vm._k($event.keyCode, "esc", 27, $event.key, [
                                  "Esc",
                                  "Escape"
                                ])
                              ) {
                                return null
                              }
                              return _vm.hideLinkMenu.apply(null, arguments)
                            },
                            input: function($event) {
                              if ($event.target.composing) {
                                return
                              }
                              _vm.linkUrl = $event.target.value
                            }
                          }
                        }),
                        _vm._v(" "),
                        _c("button", {
                          staticClass: "menububble__button icon-confirm",
                          attrs: { type: "button", tabindex: "0" },
                          on: {
                            click: function($event) {
                              return _vm.setLinkUrl(commands.link, _vm.linkUrl)
                            }
                          }
                        })
                      ]
                    )
                  : [
                      _c(
                        "button",
                        {
                          staticClass: "menububble__button",
                          class: { "is-active": isActive.link() },
                          on: {
                            click: function($event) {
                              _vm.showLinkMenu(getMarkAttrs("link"))
                            }
                          }
                        },
                        [
                          _c("span", { staticClass: "icon-link" }),
                          _vm._v(" "),
                          _c(
                            "span",
                            { staticClass: "menububble__buttontext" },
                            [
                              _vm._v(
                                "\n\t\t\t\t\t" +
                                  _vm._s(
                                    _vm.t(
                                      "text",
                                      isActive.link()
                                        ? "Update Link"
                                        : "Add Link"
                                    )
                                  ) +
                                  "\n\t\t\t\t"
                              )
                            ]
                          )
                        ]
                      ),
                      _vm._v(" "),
                      _c(
                        "button",
                        {
                          staticClass: "menububble__button",
                          class: { "is-active": isActive.link() },
                          on: {
                            click: function($event) {
                              return _vm.selectFile(commands.link)
                            }
                          }
                        },
                        [
                          _c("span", { staticClass: "icon-file" }),
                          _vm._v(" "),
                          _c(
                            "span",
                            { staticClass: "menububble__buttontext" },
                            [_vm._v(_vm._s(_vm.t("text", "Link file")))]
                          )
                        ]
                      )
                    ]
              ],
              2
            )
          ]
        }
      }
    ])
  })
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/views/RichWorkspace.vue?vue&type=template&id=0cce2262&scoped=true&":
/*!**************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/views/RichWorkspace.vue?vue&type=template&id=0cce2262&scoped=true& ***!
  \**************************************************************************************************************************************************************************************************************/
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
  return _vm.enabled
    ? _c(
        "div",
        {
          class: {
            "icon-loading": !_vm.loaded || !_vm.ready,
            focus: _vm.focus,
            dark: _vm.darkTheme,
            creatable: _vm.canCreate
          },
          attrs: { id: "rich-workspace" }
        },
        [
          _vm.showEmptyWorkspace
            ? _c(
                "div",
                {
                  staticClass: "empty-workspace",
                  on: { click: _vm.createNew }
                },
                [
                  _c("p", { staticClass: "placeholder" }, [
                    _vm._v(
                      "\n\t\t\t" +
                        _vm._s(_vm.t("text", "Add notes, lists or links …")) +
                        "\n\t\t"
                    )
                  ])
                ]
              )
            : _vm._e(),
          _vm._v(" "),
          _vm.file
            ? _c("EditorWrapper", {
                directives: [
                  {
                    name: "show",
                    rawName: "v-show",
                    value: _vm.ready,
                    expression: "ready"
                  }
                ],
                key: _vm.file.id,
                attrs: {
                  "file-id": _vm.file.id,
                  "relative-path": _vm.file.path,
                  "share-token": _vm.shareToken,
                  active: true,
                  autohide: true,
                  mime: _vm.file.mimetype,
                  autofocus: _vm.autofocus
                },
                on: {
                  ready: function($event) {
                    _vm.ready = true
                  },
                  focus: function($event) {
                    _vm.focus = true
                  },
                  blur: _vm.unfocus,
                  error: _vm.reset
                }
              })
            : _vm._e()
        ],
        1
      )
    : _vm._e()
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./src/components/MenuBar.vue":
/*!************************************!*\
  !*** ./src/components/MenuBar.vue ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _MenuBar_vue_vue_type_template_id_4a501398_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MenuBar.vue?vue&type=template&id=4a501398&scoped=true& */ "./src/components/MenuBar.vue?vue&type=template&id=4a501398&scoped=true&");
/* harmony import */ var _MenuBar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MenuBar.vue?vue&type=script&lang=js& */ "./src/components/MenuBar.vue?vue&type=script&lang=js&");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _MenuBar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _MenuBar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _MenuBar_vue_vue_type_style_index_0_id_4a501398_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./MenuBar.vue?vue&type=style&index=0&id=4a501398&scoped=true&lang=scss& */ "./src/components/MenuBar.vue?vue&type=style&index=0&id=4a501398&scoped=true&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _MenuBar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _MenuBar_vue_vue_type_template_id_4a501398_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _MenuBar_vue_vue_type_template_id_4a501398_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "4a501398",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/components/MenuBar.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/components/MenuBar.vue?vue&type=script&lang=js&":
/*!*************************************************************!*\
  !*** ./src/components/MenuBar.vue?vue&type=script&lang=js& ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_MenuBar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib!../../node_modules/vue-loader/lib??vue-loader-options!./MenuBar.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/components/MenuBar.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_MenuBar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_MenuBar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_MenuBar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_MenuBar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_MenuBar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/components/MenuBar.vue?vue&type=style&index=0&id=4a501398&scoped=true&lang=scss&":
/*!**********************************************************************************************!*\
  !*** ./src/components/MenuBar.vue?vue&type=style&index=0&id=4a501398&scoped=true&lang=scss& ***!
  \**********************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_MenuBar_vue_vue_type_style_index_0_id_4a501398_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/style-loader/dist/cjs.js!../../node_modules/css-loader/dist/cjs.js!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/sass-loader/dist/cjs.js!../../node_modules/vue-loader/lib??vue-loader-options!./MenuBar.vue?vue&type=style&index=0&id=4a501398&scoped=true&lang=scss& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/components/MenuBar.vue?vue&type=style&index=0&id=4a501398&scoped=true&lang=scss&");
/* empty/unused harmony star reexport */

/***/ }),

/***/ "./src/components/MenuBar.vue?vue&type=template&id=4a501398&scoped=true&":
/*!*******************************************************************************!*\
  !*** ./src/components/MenuBar.vue?vue&type=template&id=4a501398&scoped=true& ***!
  \*******************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_MenuBar_vue_vue_type_template_id_4a501398_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib??vue-loader-options!./MenuBar.vue?vue&type=template&id=4a501398&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/components/MenuBar.vue?vue&type=template&id=4a501398&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_MenuBar_vue_vue_type_template_id_4a501398_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_MenuBar_vue_vue_type_template_id_4a501398_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/components/MenuBubble.vue":
/*!***************************************!*\
  !*** ./src/components/MenuBubble.vue ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _MenuBubble_vue_vue_type_template_id_5496a10a_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MenuBubble.vue?vue&type=template&id=5496a10a&scoped=true& */ "./src/components/MenuBubble.vue?vue&type=template&id=5496a10a&scoped=true&");
/* harmony import */ var _MenuBubble_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MenuBubble.vue?vue&type=script&lang=js& */ "./src/components/MenuBubble.vue?vue&type=script&lang=js&");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _MenuBubble_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _MenuBubble_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _MenuBubble_vue_vue_type_style_index_0_id_5496a10a_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./MenuBubble.vue?vue&type=style&index=0&id=5496a10a&scoped=true&lang=scss& */ "./src/components/MenuBubble.vue?vue&type=style&index=0&id=5496a10a&scoped=true&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _MenuBubble_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _MenuBubble_vue_vue_type_template_id_5496a10a_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _MenuBubble_vue_vue_type_template_id_5496a10a_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "5496a10a",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/components/MenuBubble.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/components/MenuBubble.vue?vue&type=script&lang=js&":
/*!****************************************************************!*\
  !*** ./src/components/MenuBubble.vue?vue&type=script&lang=js& ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_MenuBubble_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib!../../node_modules/vue-loader/lib??vue-loader-options!./MenuBubble.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/components/MenuBubble.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_MenuBubble_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_MenuBubble_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_MenuBubble_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_MenuBubble_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_MenuBubble_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/components/MenuBubble.vue?vue&type=style&index=0&id=5496a10a&scoped=true&lang=scss&":
/*!*************************************************************************************************!*\
  !*** ./src/components/MenuBubble.vue?vue&type=style&index=0&id=5496a10a&scoped=true&lang=scss& ***!
  \*************************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_MenuBubble_vue_vue_type_style_index_0_id_5496a10a_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/style-loader/dist/cjs.js!../../node_modules/css-loader/dist/cjs.js!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/sass-loader/dist/cjs.js!../../node_modules/vue-loader/lib??vue-loader-options!./MenuBubble.vue?vue&type=style&index=0&id=5496a10a&scoped=true&lang=scss& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/components/MenuBubble.vue?vue&type=style&index=0&id=5496a10a&scoped=true&lang=scss&");
/* empty/unused harmony star reexport */

/***/ }),

/***/ "./src/components/MenuBubble.vue?vue&type=template&id=5496a10a&scoped=true&":
/*!**********************************************************************************!*\
  !*** ./src/components/MenuBubble.vue?vue&type=template&id=5496a10a&scoped=true& ***!
  \**********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_MenuBubble_vue_vue_type_template_id_5496a10a_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib??vue-loader-options!./MenuBubble.vue?vue&type=template&id=5496a10a&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/components/MenuBubble.vue?vue&type=template&id=5496a10a&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_MenuBubble_vue_vue_type_template_id_5496a10a_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_MenuBubble_vue_vue_type_template_id_5496a10a_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/helpers/files.js":
/*!******************************!*\
  !*** ./src/helpers/files.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FILE_ACTION_IDENTIFIER = exports.FilesWorkspacePlugin = exports.registerFileCreate = exports.registerFileActionFallback = exports.optimalPath = void 0;

var _mime = __webpack_require__(/*! ./mime */ "./src/helpers/mime.js");

var _RichWorkspace = _interopRequireDefault(__webpack_require__(/*! ../views/RichWorkspace */ "./src/views/RichWorkspace.vue"));

var _router = __webpack_require__(/*! @nextcloud/router */ "./node_modules/@nextcloud/router/dist/index.js");

var _store = _interopRequireDefault(__webpack_require__(/*! ../store */ "./src/store.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * @copyright Copyright (c) 2019 Julius Härtl <jus@bitgrid.net>
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
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */
var FILE_ACTION_IDENTIFIER = 'Edit with text app';
exports.FILE_ACTION_IDENTIFIER = FILE_ACTION_IDENTIFIER;

var optimalPath = function optimalPath(from, to) {
  var current = from.split('/');
  var target = to.split('/');
  current.pop(); // ignore filename

  while (current[0] === target[0]) {
    current.shift();
    target.shift();
  }

  var relativePath = current.fill('..').concat(target);
  var absolutePath = to.split('/');
  return relativePath.length < absolutePath.length ? relativePath.join('/') : to;
};

exports.optimalPath = optimalPath;

var registerFileCreate = function registerFileCreate() {
  var newFileMenuPlugin = {
    attach: function attach(menu) {
      var fileList = menu.fileList; // only attach to main file list, public view is not supported yet

      if (fileList.id !== 'files' && fileList.id !== 'files.public') {
        return;
      } // register the new menu entry


      menu.addMenuEntry({
        id: 'file',
        displayName: t('text', 'New text document'),
        templateName: t('text', 'New text document') + '.md',
        iconClass: 'icon-filetype-text',
        fileType: 'file',
        actionHandler: function actionHandler(name) {
          fileList.createFile(name).then(function (status, data) {
            var fileInfoModel = new OCA.Files.FileInfoModel(data);

            if (typeof OCA.Viewer !== 'undefined') {
              OCA.Files.fileActions.triggerAction('view', fileInfoModel, fileList);
            } else if (typeof OCA.Viewer === 'undefined') {
              OCA.Files.fileActions.triggerAction(FILE_ACTION_IDENTIFIER, fileInfoModel, fileList);
            }
          });
        }
      });
    }
  };
  OC.Plugins.register('OCA.Files.NewFileMenu', newFileMenuPlugin);
};

exports.registerFileCreate = registerFileCreate;

var registerFileActionFallback = function registerFileActionFallback() {
  var sharingToken = document.getElementById('sharingToken') ? document.getElementById('sharingToken').value : null;
  var dir = document.getElementById('dir').value;

  if (!sharingToken || dir !== '') {
    var ViewerRoot = document.createElement('div');
    ViewerRoot.id = 'text-viewer-fallback';
    document.body.appendChild(ViewerRoot);

    var registerAction = function registerAction(mime) {
      return OCA.Files.fileActions.register(mime, FILE_ACTION_IDENTIFIER, OC.PERMISSION_UPDATE | OC.PERMISSION_READ, (0, _router.imagePath)('core', 'actions/rename'), function (filename) {
        var file = window.FileList.findFile(filename);
        Promise.all([Promise.resolve(/*! import() */).then(__webpack_require__.t.bind(null, /*! vue */ "./node_modules/vue/dist/vue.esm.js", 7)), Promise.all(/*! import() | files-modal */[__webpack_require__.e("vendors~editor-collab~editor-guest~editor-rich~files-modal"), __webpack_require__.e("vendors~editor~files-modal"), __webpack_require__.e("vendors~files-modal"), __webpack_require__.e("files-modal")]).then(__webpack_require__.bind(null, /*! ./../components/PublicFilesEditor */ "./src/components/PublicFilesEditor.vue"))]).then(function (imports) {
          var path = window.FileList.getCurrentDirectory() + '/' + filename;
          var Vue = imports[0].default;
          Vue.prototype.t = window.t;
          Vue.prototype.n = window.n;
          Vue.prototype.OCA = window.OCA;
          var Editor = imports[1].default;
          var vm = new Vue({
            render: function render(h) {
              return h(Editor, {
                props: {
                  fileId: file ? file.id : null,
                  active: true,
                  shareToken: sharingToken,
                  relativePath: path,
                  mimeType: file.mimetype
                }
              });
            }
          });
          vm.$mount(ViewerRoot);
        });
      }, t('text', 'Edit'));
    };

    for (var i = 0; i < _mime.openMimetypes.length; i++) {
      registerAction(_mime.openMimetypes[i]);
      OCA.Files.fileActions.setDefault(_mime.openMimetypes[i], FILE_ACTION_IDENTIFIER);
    }
  }
};

exports.registerFileActionFallback = registerFileActionFallback;
var FilesWorkspacePlugin = {
  el: null,
  attach: function attach(fileList) {
    if (fileList.id !== 'files' && fileList.id !== 'files.public') {
      return;
    }

    this.el = document.createElement('div');
    fileList.registerHeader({
      id: 'workspace',
      el: this.el,
      render: this.render.bind(this),
      priority: 10
    });
  },
  render: function render(fileList) {
    var _this = this;

    if (fileList.id !== 'files' && fileList.id !== 'files.public') {
      return;
    }

    Promise.resolve(/*! import() */).then(__webpack_require__.t.bind(null, /*! vue */ "./node_modules/vue/dist/vue.esm.js", 7)).then(function (module) {
      var Vue = module.default;
      _this.el.id = 'files-workspace-wrapper';
      Vue.prototype.t = window.t;
      Vue.prototype.n = window.n;
      Vue.prototype.OCA = window.OCA;
      var View = Vue.extend(_RichWorkspace.default);
      var vm = new View({
        propsData: {
          path: fileList.getCurrentDirectory()
        },
        store: _store.default
      }).$mount(_this.el);
      fileList.$el.on('urlChanged', function (data) {
        vm.path = data.dir.toString();
      });
      fileList.$el.on('changeDirectory', function (data) {
        vm.path = data.dir.toString();
      });
    });
  }
};
exports.FilesWorkspacePlugin = FilesWorkspacePlugin;

/***/ }),

/***/ "./src/helpers/mime.js":
/*!*****************************!*\
  !*** ./src/helpers/mime.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.openMimetypesPlainText = exports.openMimetypesMarkdown = exports.openMimetypes = void 0;

/*
 * @copyright Copyright (c) 2019 Julius Härtl <jus@bitgrid.net>
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
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */
var openMimetypesMarkdown = ['text/markdown'];
exports.openMimetypesMarkdown = openMimetypesMarkdown;
var openMimetypesPlainText = ['text/plain', 'application/cmd', 'application/x-empty', 'application/x-msdos-program', 'application/javascript', 'application/json', 'application/x-perl', 'application/x-php', 'application/x-tex', 'application/xml', 'application/yaml', 'text/css', 'text/csv', 'text/html', 'text/org', 'text/x-c', 'text/x-c++src', 'text/x-h', 'text/x-java-source', 'text/x-ldif', 'text/x-python', 'text/x-shellscript'];
exports.openMimetypesPlainText = openMimetypesPlainText;
var openMimetypes = [].concat(openMimetypesMarkdown, openMimetypesPlainText);
exports.openMimetypes = openMimetypes;

/***/ }),

/***/ "./src/mixins/menubar.js":
/*!*******************************!*\
  !*** ./src/mixins/menubar.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/*
 * @copyright Copyright (c) 2019 Julius Härtl <jus@bitgrid.net>
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
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */
var _default = [{
  label: t('text', 'Undo'),
  class: 'icon-undo',
  isActive: function isActive(_isActive) {
    return false;
  },
  isDisabled: function isDisabled(command) {
    return command.undoDepth() === 0;
  },
  action: function action(command) {
    return command.undo();
  }
}, {
  label: t('text', 'Redo'),
  class: 'icon-redo',
  isActive: function isActive(_isActive2) {
    return false;
  },
  isDisabled: function isDisabled(command) {
    return command.redoDepth() === 0;
  },
  action: function action(command) {
    return command.redo();
  }
}, {
  label: t('text', 'Bold'),
  class: 'icon-bold',
  isActive: function isActive(_isActive3) {
    return _isActive3.strong();
  },
  action: function action(command) {
    return command.strong();
  }
}, {
  label: t('text', 'Italic'),
  class: 'icon-italic',
  isActive: function isActive(_isActive4) {
    return _isActive4.em();
  },
  action: function action(command) {
    return command.em();
  }
}, {
  label: t('text', 'Strikethrough'),
  class: 'icon-strike',
  isActive: function isActive(_isActive5) {
    return _isActive5.strike();
  },
  action: function action(command) {
    return command.strike();
  }
}, {
  label: t('text', 'Headings'),
  visible: false,
  children: [{
    label: t('text', 'Heading 1'),
    class: 'icon-h1',
    isActive: function isActive(_isActive6) {
      return _isActive6.heading({
        level: 1
      });
    },
    action: function action(command) {
      return command.heading({
        level: 1
      });
    }
  }, {
    label: t('text', 'Heading 2'),
    class: 'icon-h2',
    isActive: function isActive(_isActive7) {
      return _isActive7.heading({
        level: 2
      });
    },
    action: function action(command) {
      return command.heading({
        level: 2
      });
    }
  }, {
    label: t('text', 'Heading 3'),
    class: 'icon-h3',
    isActive: function isActive(_isActive8) {
      return _isActive8.heading({
        level: 3
      });
    },
    action: function action(command) {
      return command.heading({
        level: 3
      });
    }
  }, {
    label: t('text', 'Heading 4'),
    class: 'icon-h4',
    isActive: function isActive(_isActive9) {
      return _isActive9.heading({
        level: 4
      });
    },
    action: function action(command) {
      return command.heading({
        level: 4
      });
    }
  }, {
    label: t('text', 'Heading 5'),
    class: 'icon-h5',
    isActive: function isActive(_isActive10) {
      return _isActive10.heading({
        level: 5
      });
    },
    action: function action(command) {
      return command.heading({
        level: 5
      });
    }
  }, {
    label: t('text', 'Heading 6'),
    class: 'icon-h6',
    isActive: function isActive(_isActive11) {
      return _isActive11.heading({
        level: 6
      });
    },
    action: function action(command) {
      return command.heading({
        level: 6
      });
    }
  }]
}, {
  label: t('text', 'Unordered list'),
  class: 'icon-ul',
  isActive: function isActive(_isActive12) {
    return _isActive12.bullet_list();
  },
  action: function action(command) {
    return command.bullet_list_item();
  }
}, {
  label: t('text', 'Ordered list'),
  class: 'icon-ol',
  isActive: function isActive(_isActive13) {
    return _isActive13.ordered_list();
  },
  action: function action(command) {
    return command.ordered_list();
  }
}, {
  label: t('text', 'ToDo list'),
  class: 'icon-checkmark',
  isActive: function isActive(_isActive14) {
    return false;
  },
  action: function action(command) {
    return command.todo_item();
  }
}, {
  label: t('text', 'Blockquote'),
  class: 'icon-quote',
  isActive: function isActive(_isActive15) {
    return _isActive15.blockquote();
  },
  action: function action(command) {
    return command.blockquote();
  }
}, {
  label: t('text', 'Code block'),
  class: 'icon-code',
  isActive: function isActive(_isActive16) {
    return _isActive16.code_block();
  },
  action: function action(command) {
    return command.code_block();
  }
}];
exports.default = _default;

/***/ }),

/***/ "./src/views/RichWorkspace.vue":
/*!*************************************!*\
  !*** ./src/views/RichWorkspace.vue ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _RichWorkspace_vue_vue_type_template_id_0cce2262_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RichWorkspace.vue?vue&type=template&id=0cce2262&scoped=true& */ "./src/views/RichWorkspace.vue?vue&type=template&id=0cce2262&scoped=true&");
/* harmony import */ var _RichWorkspace_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./RichWorkspace.vue?vue&type=script&lang=js& */ "./src/views/RichWorkspace.vue?vue&type=script&lang=js&");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _RichWorkspace_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _RichWorkspace_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _RichWorkspace_vue_vue_type_style_index_0_id_0cce2262_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./RichWorkspace.vue?vue&type=style&index=0&id=0cce2262&lang=scss&scoped=true& */ "./src/views/RichWorkspace.vue?vue&type=style&index=0&id=0cce2262&lang=scss&scoped=true&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _RichWorkspace_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _RichWorkspace_vue_vue_type_template_id_0cce2262_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _RichWorkspace_vue_vue_type_template_id_0cce2262_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "0cce2262",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/views/RichWorkspace.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/views/RichWorkspace.vue?vue&type=script&lang=js&":
/*!**************************************************************!*\
  !*** ./src/views/RichWorkspace.vue?vue&type=script&lang=js& ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_RichWorkspace_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib!../../node_modules/vue-loader/lib??vue-loader-options!./RichWorkspace.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/views/RichWorkspace.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_RichWorkspace_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_RichWorkspace_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_RichWorkspace_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_RichWorkspace_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_RichWorkspace_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/views/RichWorkspace.vue?vue&type=style&index=0&id=0cce2262&lang=scss&scoped=true&":
/*!***********************************************************************************************!*\
  !*** ./src/views/RichWorkspace.vue?vue&type=style&index=0&id=0cce2262&lang=scss&scoped=true& ***!
  \***********************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_RichWorkspace_vue_vue_type_style_index_0_id_0cce2262_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/style-loader/dist/cjs.js!../../node_modules/css-loader/dist/cjs.js!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/sass-loader/dist/cjs.js!../../node_modules/vue-loader/lib??vue-loader-options!./RichWorkspace.vue?vue&type=style&index=0&id=0cce2262&lang=scss&scoped=true& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/views/RichWorkspace.vue?vue&type=style&index=0&id=0cce2262&lang=scss&scoped=true&");
/* empty/unused harmony star reexport */

/***/ }),

/***/ "./src/views/RichWorkspace.vue?vue&type=template&id=0cce2262&scoped=true&":
/*!********************************************************************************!*\
  !*** ./src/views/RichWorkspace.vue?vue&type=template&id=0cce2262&scoped=true& ***!
  \********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_RichWorkspace_vue_vue_type_template_id_0cce2262_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib??vue-loader-options!./RichWorkspace.vue?vue&type=template&id=0cce2262&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/views/RichWorkspace.vue?vue&type=template&id=0cce2262&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_RichWorkspace_vue_vue_type_template_id_0cce2262_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_RichWorkspace_vue_vue_type_template_id_0cce2262_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=editor-rich.js.map?v=e57626c4dac87889956e