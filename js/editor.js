(window["textWebpackJsonp"] = window["textWebpackJsonp"] || []).push([["editor"],{

/***/ "./img/checkbox-mark.svg":
/*!*******************************!*\
  !*** ./img/checkbox-mark.svg ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgdmlld2JveD0iMCAwIDE2IDE2IiB3aWR0aD0iMTYiIGhlaWdodD0iMTYiPjxwYXRoIGQ9Ik0xMS45MjQgNC4wNjZsLTQuOTMyIDQuOTctMi44MjgtMi44M0wyLjc1IDcuNjE4bDQuMjQyIDQuMjQzIDYuMzY1LTYuMzY1LTEuNDMzLTEuNDMyeiIgZmlsbD0iI2ZmZiIvPjwvc3ZnPgo=");

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/components/CollisionResolveDialog.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/components/CollisionResolveDialog.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
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
  name: 'CollisionResolveDialog'
};
exports.default = _default;

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/components/EditorWrapper.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/components/EditorWrapper.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm.js"));

var _escapeHtml = _interopRequireDefault(__webpack_require__(/*! escape-html */ "./node_modules/escape-html/index.js"));

var _moment = _interopRequireDefault(__webpack_require__(/*! @nextcloud/moment */ "./node_modules/@nextcloud/moment/dist/index.js"));

var _SyncService = __webpack_require__(/*! ./../services/SyncService */ "./src/services/SyncService.js");

var _helpers = __webpack_require__(/*! ./../helpers */ "./src/helpers/index.js");

var _mappings = __webpack_require__(/*! ../helpers/mappings */ "./src/helpers/mappings.js");

var _EditorFactory = __webpack_require__(/*! ./../EditorFactory */ "./src/EditorFactory.js");

var _tiptap = __webpack_require__(/*! tiptap */ "./node_modules/tiptap/dist/tiptap.esm.js");

var _tiptapExtensions = __webpack_require__(/*! tiptap-extensions */ "./node_modules/tiptap-extensions/dist/extensions.esm.js");

var _extensions = __webpack_require__(/*! ./../extensions */ "./src/extensions/index.js");

var _isMobile = _interopRequireDefault(__webpack_require__(/*! ./../mixins/isMobile */ "./src/mixins/isMobile.js"));

var _store = _interopRequireDefault(__webpack_require__(/*! ./../mixins/store */ "./src/mixins/store.js"));

var _Tooltip = _interopRequireDefault(__webpack_require__(/*! @nextcloud/vue/dist/Directives/Tooltip */ "./node_modules/@nextcloud/vue/dist/Directives/Tooltip.js"));

var _prosemirrorCollab = __webpack_require__(/*! prosemirror-collab */ "./node_modules/prosemirror-collab/dist/index.es.js");

var _prosemirrorTransform = __webpack_require__(/*! prosemirror-transform */ "./node_modules/prosemirror-transform/dist/index.es.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var EDITOR_PUSH_DEBOUNCE = 200;
var _default = {
  name: 'EditorWrapper',
  components: {
    EditorContent: _tiptap.EditorContent,
    MenuBar: function MenuBar() {
      return Promise.all(/*! import() | editor-rich */[__webpack_require__.e("vendors~editor-collab~editor-guest~editor-rich~files-modal"), __webpack_require__.e("vendors~editor-rich"), __webpack_require__.e("editor-rich")]).then(__webpack_require__.bind(null, /*! ./MenuBar */ "./src/components/MenuBar.vue"));
    },
    MenuBubble: function MenuBubble() {
      return Promise.all(/*! import() | editor-rich */[__webpack_require__.e("vendors~editor-collab~editor-guest~editor-rich~files-modal"), __webpack_require__.e("vendors~editor-rich"), __webpack_require__.e("editor-rich")]).then(__webpack_require__.bind(null, /*! ./MenuBubble */ "./src/components/MenuBubble.vue"));
    },
    ReadOnlyEditor: function ReadOnlyEditor() {
      return Promise.all(/*! import() | editor */[__webpack_require__.e("vendors~editor~files-modal"), __webpack_require__.e("vendors~editor"), __webpack_require__.e("editor")]).then(__webpack_require__.bind(null, /*! ./ReadOnlyEditor */ "./src/components/ReadOnlyEditor.vue"));
    },
    CollisionResolveDialog: function CollisionResolveDialog() {
      return Promise.all(/*! import() | editor */[__webpack_require__.e("vendors~editor~files-modal"), __webpack_require__.e("vendors~editor"), __webpack_require__.e("editor")]).then(__webpack_require__.bind(null, /*! ./CollisionResolveDialog */ "./src/components/CollisionResolveDialog.vue"));
    },
    GuestNameDialog: function GuestNameDialog() {
      return Promise.all(/*! import() | editor-guest */[__webpack_require__.e("vendors~editor-collab~editor-guest~editor-rich~files-modal"), __webpack_require__.e("vendors~editor-collab~editor-guest"), __webpack_require__.e("editor-guest")]).then(__webpack_require__.bind(null, /*! ./GuestNameDialog */ "./src/components/GuestNameDialog.vue"));
    },
    SessionList: function SessionList() {
      return Promise.all(/*! import() | editor-collab */[__webpack_require__.e("vendors~editor-collab~editor-guest~editor-rich~files-modal"), __webpack_require__.e("vendors~editor-collab~editor-guest"), __webpack_require__.e("vendors~editor-collab"), __webpack_require__.e("editor-collab")]).then(__webpack_require__.bind(null, /*! ./SessionList */ "./src/components/SessionList.vue"));
    }
  },
  directives: {
    Tooltip: _Tooltip.default
  },
  mixins: [_isMobile.default, _store.default],
  props: {
    initialSession: {
      type: Object,
      default: null
    },
    relativePath: {
      type: String,
      default: null
    },
    fileId: {
      type: Number,
      default: null
    },
    active: {
      type: Boolean,
      default: false
    },
    autofocus: {
      type: Boolean,
      default: true
    },
    shareToken: {
      type: String,
      default: null
    },
    mime: {
      type: String,
      default: null
    },
    autohide: {
      type: Boolean,
      default: false
    },
    isDirectEditing: {
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    return {
      IDLE_TIMEOUT: _SyncService.IDLE_TIMEOUT,
      tiptap: null,

      /** @type SyncService */
      syncService: null,
      document: null,
      sessions: [],
      currentSession: null,
      filteredSessions: {},
      idle: false,
      dirty: false,
      initialLoading: false,
      lastSavedString: '',
      syncError: null,
      hasConnectionIssue: false,
      readOnly: true,
      forceRecreate: false,
      saveStatusPolling: null
    };
  },
  computed: {
    showAuthorAnnotations: function showAuthorAnnotations() {
      return this.$store.state.showAuthorAnnotations;
    },
    lastSavedStatus: function lastSavedStatus() {
      return this.dirtyStateIndicator ? t('text', 'Saving …') : t('text', 'Saved');
    },
    lastSavedStatusClass: function lastSavedStatusClass() {
      return this.syncError && this.lastSavedString !== '' ? 'error' : '';
    },
    dirtyStateIndicator: function dirtyStateIndicator() {
      return this.hasUnpushedChanges || this.hasUnsavedChanges;
    },
    lastSavedStatusTooltip: function lastSavedStatusTooltip() {
      var message = t('text', 'Last saved {lastSaved}', {
        lastSaved: this.lastSavedString
      });

      if (this.hasSyncCollission) {
        message = t('text', 'The document has been changed outside of the editor. The changes cannot be applied.');
      }

      if (this.hasUnpushedChanges || this.hasUnsavedChanges) {
        message += ' - ' + t('text', 'Unsaved changes');
      }

      return {
        content: message,
        placement: 'bottom'
      };
    },
    hasSyncCollission: function hasSyncCollission() {
      return this.syncError && this.syncError.type === _SyncService.ERROR_TYPE.SAVE_COLLISSION;
    },
    hasUnpushedChanges: function hasUnpushedChanges() {
      return this.dirty;
    },
    hasUnsavedChanges: function hasUnsavedChanges() {
      return this.document && this.document.lastSavedVersion < this.document.currentVersion;
    },
    backendUrl: function backendUrl() {
      var _this = this;

      return function (endpoint) {
        return (0, _helpers.endpointUrl)(endpoint, !!_this.shareToken);
      };
    },
    hasDocumentParameters: function hasDocumentParameters() {
      return this.fileId || this.shareToken || this.initialSession;
    },
    isPublic: function isPublic() {
      return this.isDirectEditing || document.getElementById('isPublic') && document.getElementById('isPublic').value === '1';
    },
    isRichEditor: function isRichEditor() {
      return this.mime === 'text/markdown';
    },
    fileExtension: function fileExtension() {
      return this.relativePath ? this.relativePath.split('/').pop().split('.').pop() : 'txt';
    }
  },
  watch: {
    lastSavedStatus: function lastSavedStatus() {
      this.$refs.menubar && this.$refs.menubar.redrawMenuBar();
    }
  },
  mounted: function mounted() {
    if (this.active && this.hasDocumentParameters) {
      this.initSession();
    }

    this.$parent.$emit('update:loaded', true);
  },
  created: function created() {
    var _this2 = this;

    this.saveStatusPolling = setInterval(function () {
      _this2.updateLastSavedStatus();
    }, 2000);
  },
  beforeDestroy: function beforeDestroy() {
    this.close();
  },
  methods: {
    close: function close() {
      var _this3 = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                clearInterval(_this3.saveStatusPolling);

                if (!(_this3.currentSession && _this3.syncService)) {
                  _context.next = 11;
                  break;
                }

                _context.prev = 2;
                _context.next = 5;
                return _this3.syncService.close();

              case 5:
                _this3.currentSession = null;
                _this3.syncService = null;
                _context.next = 11;
                break;

              case 9:
                _context.prev = 9;
                _context.t0 = _context["catch"](2);

              case 11:
                return _context.abrupt("return", true);

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[2, 9]]);
      }))();
    },
    updateLastSavedStatus: function updateLastSavedStatus() {
      if (this.document) {
        this.lastSavedString = (0, _moment.default)(this.document.lastSavedVersionTime * 1000).fromNow();
      }
    },
    initSession: function initSession() {
      var _this4 = this;

      if (!this.hasDocumentParameters) {
        this.$parent.$emit('error', 'No valid file provided');
        return;
      }

      var guestName = localStorage.getItem('nick') ? localStorage.getItem('nick') : (0, _helpers.getRandomGuestName)();
      this.syncService = new _SyncService.SyncService({
        shareToken: this.shareToken,
        filePath: this.relativePath,
        guestName: guestName,
        forceRecreate: this.forceRecreate,
        serialize: function serialize(document) {
          if (_this4.isRichEditor) {
            return (0, _EditorFactory.createMarkdownSerializer)(_this4.tiptap.nodes, _this4.tiptap.marks).serialize(document);
          }

          return (0, _EditorFactory.serializePlainText)(_this4.tiptap);
        }
      }).on('opened', function (_ref) {
        var document = _ref.document,
            session = _ref.session;
        _this4.currentSession = session;
        _this4.document = document;
        _this4.readOnly = document.readOnly;
        localStorage.setItem('nick', _this4.currentSession.guestName);
      }).on('change', function (_ref2) {
        var document = _ref2.document,
            sessions = _ref2.sessions;

        if (_this4.document.baseVersionEtag !== '' && document.baseVersionEtag !== _this4.document.baseVersionEtag) {
          _this4.resolveUseServerVersion();

          return;
        }

        _this4.updateSessions.bind(_this4)(sessions);

        _this4.document = document;
        _this4.syncError = null;

        _this4.tiptap.setOptions({
          editable: !_this4.readOnly
        });
      }).on('loaded', function (_ref3) {
        var documentSource = _ref3.documentSource;
        _this4.hasConnectionIssue = false;
        (0, _EditorFactory.loadSyntaxHighlight)(_mappings.extensionHighlight[_this4.fileExtension] ? _mappings.extensionHighlight[_this4.fileExtension] : _this4.fileExtension).then(function (languages) {
          _this4.tiptap = (0, _EditorFactory.createEditor)({
            content: _this4.isRichEditor ? _EditorFactory.markdownit.render(documentSource) : '<pre>' + (0, _escapeHtml.default)(documentSource) + '</pre>',
            onInit: function onInit(_ref4) {
              var state = _ref4.state;
              _this4.syncService.state = state;

              _this4.syncService.startSync();
            },
            onUpdate: function onUpdate(_ref5) {
              var state = _ref5.state;
              _this4.syncService.state = state;
            },
            extensions: [new _tiptapExtensions.Collaboration({
              // the initial version we start with
              // version is an integer which is incremented with every change
              version: _this4.document.initialVersion,
              clientID: _this4.currentSession.id,
              // debounce changes so we can save some bandwidth
              debounce: EDITOR_PUSH_DEBOUNCE,
              onSendable: function onSendable(_ref6) {
                var sendable = _ref6.sendable;

                if (_this4.syncService) {
                  _this4.syncService.sendSteps();
                }
              },
              update: function update(_ref7) {
                var steps = _ref7.steps,
                    version = _ref7.version,
                    editor = _ref7.editor;
                var state = editor.state,
                    view = editor.view,
                    schema = editor.schema;

                if ((0, _prosemirrorCollab.getVersion)(state) > version) {
                  return;
                }

                var tr = (0, _prosemirrorCollab.receiveTransaction)(state, steps.map(function (item) {
                  return _prosemirrorTransform.Step.fromJSON(schema, item.step);
                }), steps.map(function (item) {
                  return item.clientID;
                }));
                tr.setMeta('clientID', steps.map(function (item) {
                  return item.clientID;
                }));
                view.dispatch(tr);
              }
            }), new _extensions.UserColor({
              clientID: _this4.currentSession.id,
              color: function color(clientID) {
                var session = _this4.sessions.find(function (item) {
                  return '' + item.id === '' + clientID;
                });

                return session === null || session === void 0 ? void 0 : session.color;
              },
              name: function name(clientID) {
                var session = _this4.sessions.find(function (item) {
                  return '' + item.id === '' + clientID;
                });

                return session !== null && session !== void 0 && session.userId ? session.userId : session === null || session === void 0 ? void 0 : session.guestName;
              }
            }), new _extensions.Keymap({
              'Mod-s': function ModS() {
                _this4.syncService.save();

                return true;
              }
            })],
            enableRichEditing: _this4.isRichEditor,
            languages: languages
          });

          _this4.tiptap.on('focus', function () {
            _this4.$emit('focus');
          });

          _this4.tiptap.on('blur', function () {
            _this4.$emit('blur');
          });

          _this4.syncService.state = _this4.tiptap.state;
        });
      }).on('sync', function (_ref8) {
        var steps = _ref8.steps,
            document = _ref8.document;
        _this4.hasConnectionIssue = false;

        try {
          _this4.tiptap.extensions.options.collaboration.update({
            version: document.currentVersion,
            steps: steps,
            editor: _this4.tiptap
          });

          _this4.syncService.state = _this4.tiptap.state;

          _this4.updateLastSavedStatus();
        } catch (e) {
          console.error('Failed to update steps in collaboration plugin', e); // TODO: we should recreate the editing session when this happens
        }

        _this4.document = document;
      }).on('error', function (error, data) {
        _this4.tiptap.setOptions({
          editable: false
        });

        if (error === _SyncService.ERROR_TYPE.SAVE_COLLISSION && (!_this4.syncError || _this4.syncError.type !== _SyncService.ERROR_TYPE.SAVE_COLLISSION)) {
          _this4.initialLoading = true;
          _this4.syncError = {
            type: error,
            data: data
          };
        }

        if (error === _SyncService.ERROR_TYPE.CONNECTION_FAILED && !_this4.hasConnectionIssue) {
          _this4.hasConnectionIssue = true; // FIXME: ideally we just try to reconnect in the service, so we don't loose steps

          OC.Notification.showTemporary('Connection failed, reconnecting');

          if (data.retry !== false) {
            setTimeout(_this4.reconnect.bind(_this4), 5000);
          }
        }

        if (error === _SyncService.ERROR_TYPE.SOURCE_NOT_FOUND) {
          _this4.hasConnectionIssue = true;
        }

        _this4.$emit('ready');
      }).on('stateChange', function (state) {
        if (state.initialLoading && !_this4.initialLoading) {
          _this4.initialLoading = true;

          if (_this4.autofocus) {
            _this4.tiptap.focus('start');
          }

          _this4.$emit('ready');

          _this4.$parent.$emit('ready', true);
        }

        if (Object.prototype.hasOwnProperty.call(state, 'dirty')) {
          _this4.dirty = state.dirty;
        }
      }).on('idle', function () {
        _this4.syncService.close();

        _this4.idle = true;
        _this4.readOnly = true;

        _this4.tiptap.setOptions({
          editable: !_this4.readOnly
        });
      });

      if (this.initialSession === null) {
        this.syncService.open({
          fileId: this.fileId,
          filePath: this.relativePath
        }).catch(function (e) {
          _this4.hasConnectionIssue = true;
        });
      } else {
        this.syncService.open({
          initialSession: this.initialSession
        }).catch(function (e) {
          _this4.hasConnectionIssue = true;
        });
      }

      this.forceRecreate = false;
    },
    resolveUseThisVersion: function resolveUseThisVersion() {
      this.syncService.forceSave();
      this.tiptap.setOptions({
        editable: !this.readOnly
      });
    },
    resolveUseServerVersion: function resolveUseServerVersion() {
      this.forceRecreate = true;
      this.reconnect();
    },
    reconnect: function reconnect() {
      var _this5 = this;

      this.initialLoading = false;
      this.hasConnectionIssue = false;

      if (this.syncService) {
        this.syncService.close().then(function () {
          _this5.syncService = null;

          _this5.tiptap.destroy();

          _this5.initSession();
        }).catch(function (e) {// Ignore issues closing the session since those might happen due to network issues
        });
      } else {
        this.syncService = null;
        this.tiptap.destroy();
        this.initSession();
      }

      this.idle = false;
    },
    updateSessions: function updateSessions(sessions) {
      var _this6 = this;

      this.sessions = sessions.sort(function (a, b) {
        return b.lastContact - a.lastContact;
      }); // Make sure we get our own session updated
      // This should ideally be part of a global store where we can have that updated on the actual name change for guests

      var currentUpdatedSession = this.sessions.find(function (session) {
        return session.id === _this6.currentSession.id;
      });

      _vue.default.set(this, 'currentSession', currentUpdatedSession);

      var currentSessionIds = this.sessions.map(function (session) {
        return session.userId;
      });
      var currentGuestIds = this.sessions.map(function (session) {
        return session.guestId;
      });
      var removedSessions = Object.keys(this.filteredSessions).filter(function (sessionId) {
        return !currentSessionIds.includes(sessionId) && !currentGuestIds.includes(sessionId);
      });

      for (var index in removedSessions) {
        _vue.default.delete(this.filteredSessions, removedSessions[index]);
      }

      for (var _index in this.sessions) {
        var session = this.sessions[_index];
        var sessionKey = session.displayName ? session.userId : session.id;

        if (this.filteredSessions[sessionKey]) {
          // update timestamp if relevant
          if (this.filteredSessions[sessionKey].lastContact < session.lastContact) {
            _vue.default.set(this.filteredSessions[sessionKey], 'lastContact', session.lastContact);
          }
        } else {
          _vue.default.set(this.filteredSessions, sessionKey, session);
        }

        if (session.id === this.currentSession.id) {
          _vue.default.set(this.filteredSessions[sessionKey], 'isCurrent', true);
        }
      }
    }
  }
};
exports.default = _default;

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/components/ReadOnlyEditor.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/components/ReadOnlyEditor.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tiptap = __webpack_require__(/*! tiptap */ "./node_modules/tiptap/dist/tiptap.esm.js");

var _escapeHtml = _interopRequireDefault(__webpack_require__(/*! escape-html */ "./node_modules/escape-html/index.js"));

var _EditorFactory = __webpack_require__(/*! ../EditorFactory */ "./src/EditorFactory.js");

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
var _default = {
  name: 'ReadOnlyEditor',
  components: {
    EditorContent: _tiptap.EditorContent
  },
  props: {
    content: {
      type: String,
      required: true
    },
    isRichEditor: {
      type: Boolean,
      default: true
    }
  },
  data: function data() {
    return {
      editor: null
    };
  },
  mounted: function mounted() {
    this.editor = (0, _EditorFactory.createEditor)({
      content: this.isRichEditor ? _EditorFactory.markdownit.render(this.content) : '<pre>' + (0, _escapeHtml.default)(this.content) + '</pre>',
      enableRichEditing: this.isRichEditor
    });
    this.editor.setOptions({
      editable: false
    });
  },
  beforeDestroy: function beforeDestroy() {
    this.editor.destroy();
  }
};
exports.default = _default;

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/nodes/ImageView.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/nodes/ImageView.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(__webpack_require__(/*! path */ "./node_modules/path-browserify/index.js"));

var _router = __webpack_require__(/*! @nextcloud/router */ "./node_modules/@nextcloud/router/dist/index.js");

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
var imageMimes = ['image/png', 'image/jpeg', 'image/gif', 'image/x-xbitmap', 'image/bmp', 'image/svg+xml'];

var getQueryVariable = function getQueryVariable(src, variable) {
  var query = src.split('?')[1];

  if (typeof query === 'undefined') {
    return;
  }

  var vars = query.split(/[&#]/);

  if (typeof vars === 'undefined') {
    return;
  }

  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=');

    if (decodeURIComponent(pair[0]) === variable) {
      return decodeURIComponent(pair[1]);
    }
  }
};

var _default = {
  name: 'ImageView',
  props: ['node', 'updateAttrs', 'view'],
  // eslint-disable-line
  data: function data() {
    return {
      imageLoaded: false,
      loaded: false,
      failed: false
    };
  },
  computed: {
    imageUrl: function imageUrl() {
      if (this.src.startsWith('http://') || this.src.startsWith('https://')) {
        return this.src;
      }

      if (this.hasPreviewUrl) {
        return this.src;
      }

      if (this.fileId) {
        return (0, _router.generateUrl)('/core/preview') + "?fileId=".concat(this.fileId, "&x=1024&y=1024&a=true");
      }

      var f = FileList.getCurrentDirectory() + '/' + this.src;
      var pathParam = encodeURIComponent(_path.default.normalize(f));
      return (0, _router.generateUrl)('/core/preview.png') + "?file=".concat(pathParam, "&x=1024&y=1024&a=true");
    },
    fileId: function fileId() {
      return getQueryVariable(this.src, 'fileId');
    },
    hasPreviewUrl: function hasPreviewUrl() {
      return this.src.match(/^(\/index.php)?\/core\/preview/) || this.src.match(/^(\/index.php)?\/apps\/files_sharing\/publicpreview\//);
    },
    mimeIcon: function mimeIcon() {
      var mime = getQueryVariable(this.src, 'mimetype');

      if (mime) {
        return {
          backgroundImage: 'url(' + window.OC.MimeType.getIconUrl(mime) + ')'
        };
      }

      return {};
    },
    isSupportedImage: function isSupportedImage() {
      var mime = getQueryVariable(this.src, 'mimetype');
      return typeof mime === 'undefined' || imageMimes.indexOf(mime) !== -1;
    },
    internalLinkOrImage: function internalLinkOrImage() {
      var fileId = getQueryVariable(this.src, 'fileId');

      if (fileId) {
        return (0, _router.generateUrl)('/f/' + fileId);
      }

      return this.src;
    },
    src: {
      get: function get() {
        return this.node.attrs.src;
      },
      set: function set(src) {
        this.updateAttrs({
          src: src
        });
      }
    },
    alt: {
      get: function get() {
        return this.node.attrs.alt ? this.node.attrs.alt : '';
      },
      set: function set(alt) {
        this.updateAttrs({
          alt: alt
        });
      }
    },
    t: function t() {
      return function (a, s) {
        return window.t(a, s);
      };
    }
  },
  beforeMount: function beforeMount() {
    var _this = this;

    if (!this.isSupportedImage) {
      // TODO check if hasPreview and render a file preview if available
      this.failed = true;
      this.imageLoaded = false;
      this.loaded = true;
      return;
    }

    var img = new Image();
    img.src = this.imageUrl;

    img.onload = function () {
      _this.imageLoaded = true;
    };

    img.onerror = function () {
      _this.failed = true;
      _this.imageLoaded = false;
      _this.loaded = true;
    };
  },
  methods: {
    updateAlt: function updateAlt() {
      this.alt = this.$refs.altInput.value;
    },
    onLoaded: function onLoaded() {
      this.loaded = true;
    }
  }
};
exports.default = _default;

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/views/DirectEditing.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/views/DirectEditing.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm.js"));

var _EditorWrapper = _interopRequireDefault(__webpack_require__(/*! ../components/EditorWrapper */ "./src/components/EditorWrapper.vue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var log = _vue.default.observable({
  messages: [],
  mtime: 0
});

var callMobileMessage = function callMobileMessage(messageName, attributes) {
  console.debug('callMobileMessage ' + messageName, attributes);
  var message = messageName;

  if (typeof attributes !== 'undefined') {
    message = {
      MessageName: messageName,
      Values: attributes
    };
  }

  var attributesString = null;

  try {
    attributesString = JSON.stringify(attributes);
  } catch (e) {
    attributesString = null;
  } // Forward to mobile handler


  if (window.DirectEditingMobileInterface && typeof window.DirectEditingMobileInterface[messageName] === 'function') {
    if (attributesString === null || typeof attributesString === 'undefined') {
      window.DirectEditingMobileInterface[messageName]();
    } else {
      window.DirectEditingMobileInterface[messageName](attributesString);
    }
  } // iOS webkit fallback


  if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.DirectEditingMobileInterface) {
    window.webkit.messageHandlers.DirectEditingMobileInterface.postMessage(message);
  }

  window.postMessage(message);
};

window.addEventListener('message', function (message) {
  log.messages.push(message.data);
  console.debug('postMessage', message);
});
var _default = {
  name: 'DirectEditing',
  components: {
    EditorWrapper: _EditorWrapper.default
  },
  data: function data() {
    return {
      initial: OCP.InitialState.loadState('text', 'file'),
      messages: log.messages,
      log: log,
      saving: false
    };
  },
  computed: {
    initialSession: function initialSession() {
      return JSON.parse(this.initial.session) || null;
    }
  },
  beforeMount: function beforeMount() {
    callMobileMessage('loading');
  },
  mounted: function mounted() {
    document.querySelector('meta[name="viewport"]').setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0');
  },
  methods: {
    close: function close() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _this.saving = true;
                setTimeout( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                  return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          _context.next = 2;
                          return _this.$refs.editor.close();

                        case 2:
                          callMobileMessage('close');

                        case 3:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee);
                })), 0);

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    },
    share: function share() {
      callMobileMessage('share');
    },
    loaded: function loaded() {
      callMobileMessage('loaded');
    }
  }
};
exports.default = _default;

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/components/CollisionResolveDialog.vue?vue&type=style&index=0&id=5ffe7972&scoped=true&lang=scss&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/components/CollisionResolveDialog.vue?vue&type=style&index=0&id=5ffe7972&scoped=true&lang=scss& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.i, "#resolve-conflicts[data-v-5ffe7972] {\n  display: flex;\n  position: fixed;\n  z-index: 10000;\n  bottom: 0;\n  max-width: 900px;\n  width: 100vw;\n  margin: auto;\n  padding: 20px 0;\n}\n#resolve-conflicts button[data-v-5ffe7972] {\n  margin: auto;\n  box-shadow: 0 0 10px var(--color-box-shadow);\n}", "",{"version":3,"sources":["webpack://./src/components/CollisionResolveDialog.vue","webpack://./CollisionResolveDialog.vue"],"names":[],"mappings":"AAwCA;EACC,aAAA;EACA,eAAA;EACA,cAAA;EACA,SAAA;EACA,gBAAA;EACA,YAAA;EACA,YAAA;EACA,eAAA;ACvCD;ADyCC;EACC,YAAA;EACA,4CAAA;ACvCF","sourcesContent":["\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n#resolve-conflicts {\n\tdisplay: flex;\n\tposition: fixed;\n\tz-index: 10000;\n\tbottom: 0;\n\tmax-width: 900px;\n\twidth: 100vw;\n\tmargin: auto;\n\tpadding: 20px 0;\n\n\tbutton {\n\t\tmargin: auto;\n\t\tbox-shadow: 0 0 10px var(--color-box-shadow);\n\t}\n}\n","#resolve-conflicts {\n  display: flex;\n  position: fixed;\n  z-index: 10000;\n  bottom: 0;\n  max-width: 900px;\n  width: 100vw;\n  margin: auto;\n  padding: 20px 0;\n}\n#resolve-conflicts button {\n  margin: auto;\n  box-shadow: 0 0 10px var(--color-box-shadow);\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/components/EditorWrapper.vue?vue&type=style&index=0&id=76135766&scoped=true&lang=scss&":
/*!********************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/components/EditorWrapper.vue?vue&type=style&index=0&id=76135766&scoped=true&lang=scss& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.i, "#editor-container[data-v-76135766] {\n  display: block;\n  width: 100%;\n  max-width: 100%;\n  height: 100%;\n  left: 0;\n  top: 50px;\n  margin: 0 auto;\n  position: relative;\n  background-color: var(--color-main-background);\n}\n#editor-wrapper[data-v-76135766] {\n  display: flex;\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n  position: absolute;\n}\n#editor-wrapper.show-color-annotations[data-v-76135766] .author-annotation {\n  padding-top: 2px;\n  padding-bottom: 2px;\n}\n#editor-wrapper[data-v-76135766]:not(.show-color-annotations) .author-annotation {\n  background-color: transparent !important;\n  color: var(--color-main-text) !important;\n}\n#editor-wrapper .ProseMirror[data-v-76135766] {\n  margin-top: 0 !important;\n}\n#editor-wrapper.icon-loading #editor[data-v-76135766] {\n  opacity: 0.3;\n}\n#editor[data-v-76135766], .editor[data-v-76135766] {\n  background: var(--color-main-background);\n  color: var(--color-main-text);\n  background-clip: padding-box;\n  border-radius: var(--border-radius);\n  padding: 0;\n  position: relative;\n  overflow-y: auto;\n  overflow-x: hidden;\n  width: 100%;\n}\n.document-status[data-v-76135766] {\n  z-index: 1010;\n  position: relative;\n  background-color: var(--color-main-background);\n}\n.document-status .msg[data-v-76135766] {\n  padding: 12px;\n  background-position: 8px center;\n  color: var(--color-text-maxcontrast);\n}\n.document-status .msg.icon-error[data-v-76135766] {\n  padding-left: 30px;\n}\n.document-status .msg .button[data-v-76135766] {\n  margin-left: 8px;\n}\n.save-status[data-v-76135766] {\n  display: inline-flex;\n  padding: 0;\n  text-overflow: ellipsis;\n  color: var(--color-text-lighter);\n  position: relative;\n  top: 10px;\n  min-width: 85px;\n}\n.save-status.error[data-v-76135766] {\n  background-color: var(--color-error);\n  color: var(--color-main-background);\n  border-radius: 3px;\n}\n#editor-container #editor-wrapper.has-conflicts[data-v-76135766] {\n  height: calc(100% - 50px);\n}\n#editor-container #editor-wrapper.has-conflicts #editor[data-v-76135766], #editor-container #editor-wrapper.has-conflicts #read-only-editor[data-v-76135766] {\n  width: 50%;\n  height: 100%;\n}\n#editor-session-list[data-v-76135766] {\n  display: flex;\n}\n#editor-session-list input[data-v-76135766], #editor-session-list div[data-v-76135766] {\n  vertical-align: middle;\n  margin-left: 3px;\n}\n.editor__content[data-v-76135766] {\n  max-width: 670px;\n  margin: auto;\n  position: relative;\n}\n#body-public[data-v-76135766] {\n  height: auto;\n}\n#files-public-content #editor-container[data-v-76135766] {\n  top: 0;\n  width: 100%;\n}\n#files-public-content #editor-container #editor[data-v-76135766] .menubar {\n  position: sticky;\n  top: 0px;\n  width: 100%;\n}\n#files-public-content #editor-container #editor[data-v-76135766] {\n  overflow: auto;\n  z-index: 20;\n}\n#files-public-content #editor-container .has-conflicts #editor[data-v-76135766] {\n  padding-top: 0;\n}\n.ie #editor[data-v-76135766] .menubar {\n  position: fixed;\n  top: 50px;\n  width: 100%;\n}\n.ie .editor__content[data-v-76135766] .ProseMirror {\n  padding-top: 50px;\n}", "",{"version":3,"sources":["webpack://./src/components/EditorWrapper.vue","webpack://./EditorWrapper.vue"],"names":[],"mappings":"AA+fA;EACC,cAAA;EACA,WAAA;EACA,eAAA;EACA,YAAA;EACA,OAAA;EACA,SAAA;EACA,cAAA;EACA,kBAAA;EACA,8CAAA;AC9fD;ADigBA;EACC,aAAA;EACA,WAAA;EACA,YAAA;EACA,gBAAA;EACA,kBAAA;AC9fD;ADggBC;EACC,gBAAA;EACA,mBAAA;AC9fF;ADigBC;EACC,wCAAA;EACA,wCAAA;AC/fF;ADkgBC;EACC,wBAAA;AChgBF;ADmgBE;EACC,YAAA;ACjgBH;ADsgBA;EACC,wCAAA;EACA,6BAAA;EACA,4BAAA;EACA,mCAAA;EACA,UAAA;EACA,kBAAA;EACA,gBAAA;EACA,kBAAA;EACA,WAAA;ACngBD;ADsgBA;EACC,aAAA;EACA,kBAAA;EACA,8CAAA;ACngBD;ADqgBC;EACC,aAAA;EACA,+BAAA;EACA,oCAAA;ACngBF;ADqgBE;EACC,kBAAA;ACngBH;ADsgBE;EACC,gBAAA;ACpgBH;ADygBA;EACC,oBAAA;EACA,UAAA;EACA,uBAAA;EACA,gCAAA;EACA,kBAAA;EACA,SAAA;EACA,eAAA;ACtgBD;ADwgBC;EACC,oCAAA;EACA,mCAAA;EACA,kBAAA;ACtgBF;AD0gBA;EACC,yBAAA;ACvgBD;ADygBC;EACC,UAAA;EACA,YAAA;ACvgBF;AD2gBA;EACC,aAAA;ACxgBD;AD0gBC;EACC,sBAAA;EACA,gBAAA;ACxgBF;AD4gBA;EACC,gBAAA;EACA,YAAA;EACA,kBAAA;ACzgBD;AD4gBA;EACC,YAAA;ACzgBD;AD6gBC;EACC,MAAA;EACA,WAAA;AC1gBF;AD4gBE;EACC,gBAAA;EACA,QAAA;EACA,WAAA;AC1gBH;AD6gBE;EACC,cAAA;EACA,WAAA;AC3gBH;AD6gBE;EACC,cAAA;AC3gBH;ADihBC;EAEC,eAAA;EACA,SAAA;EACA,WAAA;AC/gBF;ADihBC;EACC,iBAAA;AC/gBF","sourcesContent":["\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n#editor-container {\n\tdisplay: block;\n\twidth: 100%;\n\tmax-width: 100%;\n\theight: 100%;\n\tleft: 0;\n\ttop: 50px;\n\tmargin: 0 auto;\n\tposition: relative;\n\tbackground-color: var(--color-main-background);\n}\n\n#editor-wrapper {\n\tdisplay: flex;\n\twidth: 100%;\n\theight: 100%;\n\toverflow: hidden;\n\tposition: absolute;\n\n\t&.show-color-annotations::v-deep .author-annotation {\n\t\tpadding-top: 2px;\n\t\tpadding-bottom: 2px;\n\t}\n\n\t&:not(.show-color-annotations)::v-deep .author-annotation {\n\t\tbackground-color: transparent !important;\n\t\tcolor: var(--color-main-text) !important;\n\t}\n\n\t.ProseMirror {\n\t\tmargin-top: 0 !important;\n\t}\n\t&.icon-loading {\n\t\t#editor {\n\t\t\topacity: 0.3;\n\t\t}\n\t}\n}\n\n#editor, .editor {\n\tbackground: var(--color-main-background);\n\tcolor: var(--color-main-text);\n\tbackground-clip: padding-box;\n\tborder-radius: var(--border-radius);\n\tpadding: 0;\n\tposition: relative;\n\toverflow-y: auto;\n\toverflow-x: hidden;\n\twidth: 100%;\n}\n\n.document-status {\n\tz-index: 1010;\n\tposition: relative;\n\tbackground-color: var(--color-main-background);\n\n\t.msg {\n\t\tpadding: 12px;\n\t\tbackground-position: 8px center;\n\t\tcolor: var(--color-text-maxcontrast);\n\n\t\t&.icon-error {\n\t\t\tpadding-left: 30px;\n\t\t}\n\n\t\t.button {\n\t\t\tmargin-left: 8px;\n\t\t}\n\t}\n}\n\n.save-status {\n\tdisplay: inline-flex;\n\tpadding: 0;\n\ttext-overflow: ellipsis;\n\tcolor: var(--color-text-lighter);\n\tposition: relative;\n\ttop: 10px;\n\tmin-width: 85px;\n\n\t&.error {\n\t\tbackground-color: var(--color-error);\n\t\tcolor: var(--color-main-background);\n\t\tborder-radius: 3px;\n\t}\n}\n\n#editor-container #editor-wrapper.has-conflicts {\n\theight: calc(100% - 50px);\n\n\t#editor, #read-only-editor {\n\t\twidth: 50%;\n\t\theight: 100%;\n\t}\n}\n\n#editor-session-list {\n\tdisplay: flex;\n\n\tinput, div {\n\t\tvertical-align: middle;\n\t\tmargin-left: 3px;\n\t}\n}\n\n.editor__content {\n\tmax-width: 670px;\n\tmargin: auto;\n\tposition: relative;\n}\n\n#body-public {\n\theight: auto;\n}\n\n#files-public-content {\n\t#editor-container {\n\t\ttop: 0;\n\t\twidth: 100%;\n\n\t\t#editor::v-deep .menubar {\n\t\t\tposition: sticky;\n\t\t\ttop: 0px;\n\t\t\twidth: 100%;\n\t\t}\n\n\t\t#editor {\n\t\t\toverflow: auto;\n\t\t\tz-index: 20;\n\t\t}\n\t\t.has-conflicts #editor {\n\t\t\tpadding-top: 0;\n\t\t}\n\t}\n}\n\n.ie {\n\t#editor::v-deep .menubar {\n\t\t// sticky position is not working as body is our scroll container\n\t\tposition: fixed;\n\t\ttop: 50px;\n\t\twidth: 100%;\n\t}\n\t.editor__content::v-deep .ProseMirror {\n\t\tpadding-top: 50px;\n\t}\n}\n\n","#editor-container {\n  display: block;\n  width: 100%;\n  max-width: 100%;\n  height: 100%;\n  left: 0;\n  top: 50px;\n  margin: 0 auto;\n  position: relative;\n  background-color: var(--color-main-background);\n}\n\n#editor-wrapper {\n  display: flex;\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n  position: absolute;\n}\n#editor-wrapper.show-color-annotations::v-deep .author-annotation {\n  padding-top: 2px;\n  padding-bottom: 2px;\n}\n#editor-wrapper:not(.show-color-annotations)::v-deep .author-annotation {\n  background-color: transparent !important;\n  color: var(--color-main-text) !important;\n}\n#editor-wrapper .ProseMirror {\n  margin-top: 0 !important;\n}\n#editor-wrapper.icon-loading #editor {\n  opacity: 0.3;\n}\n\n#editor, .editor {\n  background: var(--color-main-background);\n  color: var(--color-main-text);\n  background-clip: padding-box;\n  border-radius: var(--border-radius);\n  padding: 0;\n  position: relative;\n  overflow-y: auto;\n  overflow-x: hidden;\n  width: 100%;\n}\n\n.document-status {\n  z-index: 1010;\n  position: relative;\n  background-color: var(--color-main-background);\n}\n.document-status .msg {\n  padding: 12px;\n  background-position: 8px center;\n  color: var(--color-text-maxcontrast);\n}\n.document-status .msg.icon-error {\n  padding-left: 30px;\n}\n.document-status .msg .button {\n  margin-left: 8px;\n}\n\n.save-status {\n  display: inline-flex;\n  padding: 0;\n  text-overflow: ellipsis;\n  color: var(--color-text-lighter);\n  position: relative;\n  top: 10px;\n  min-width: 85px;\n}\n.save-status.error {\n  background-color: var(--color-error);\n  color: var(--color-main-background);\n  border-radius: 3px;\n}\n\n#editor-container #editor-wrapper.has-conflicts {\n  height: calc(100% - 50px);\n}\n#editor-container #editor-wrapper.has-conflicts #editor, #editor-container #editor-wrapper.has-conflicts #read-only-editor {\n  width: 50%;\n  height: 100%;\n}\n\n#editor-session-list {\n  display: flex;\n}\n#editor-session-list input, #editor-session-list div {\n  vertical-align: middle;\n  margin-left: 3px;\n}\n\n.editor__content {\n  max-width: 670px;\n  margin: auto;\n  position: relative;\n}\n\n#body-public {\n  height: auto;\n}\n\n#files-public-content #editor-container {\n  top: 0;\n  width: 100%;\n}\n#files-public-content #editor-container #editor::v-deep .menubar {\n  position: sticky;\n  top: 0px;\n  width: 100%;\n}\n#files-public-content #editor-container #editor {\n  overflow: auto;\n  z-index: 20;\n}\n#files-public-content #editor-container .has-conflicts #editor {\n  padding-top: 0;\n}\n\n.ie #editor::v-deep .menubar {\n  position: fixed;\n  top: 50px;\n  width: 100%;\n}\n.ie .editor__content::v-deep .ProseMirror {\n  padding-top: 50px;\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/components/EditorWrapper.vue?vue&type=style&index=1&lang=scss&":
/*!********************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/components/EditorWrapper.vue?vue&type=style&index=1&lang=scss& ***!
  \********************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ "./node_modules/css-loader/dist/runtime/cssWithMappingToString.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _img_checkbox_mark_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../img/checkbox-mark.svg */ "./img/checkbox-mark.svg");
// Imports




var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default.a);
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_img_checkbox_mark_svg__WEBPACK_IMPORTED_MODULE_3__["default"]);
// Module
___CSS_LOADER_EXPORT___.push([module.i, ".modal-container #editor-container {\n  position: absolute;\n}\n.ProseMirror-hideselection *::selection {\n  background: transparent;\n  color: var(--color-main-text);\n}\n.ProseMirror-hideselection *::-moz-selection {\n  background: transparent;\n  color: var(--color-main-text);\n}\n.ProseMirror-hideselection {\n  caret-color: transparent;\n  color: var(--color-main-text);\n}\n.ProseMirror-selectednode {\n  outline: 2px solid #8cf;\n}\n\n/* Make sure li selections wrap around markers */\nli.ProseMirror-selectednode {\n  outline: none;\n}\nli.ProseMirror-selectednode:after {\n  content: \"\";\n  position: absolute;\n  left: -32px;\n  right: -2px;\n  top: -2px;\n  bottom: -2px;\n  border: 2px solid #8cf;\n  pointer-events: none;\n}\n.has-conflicts .ProseMirror-menubar,\n#editor-wrapper.icon-loading .ProseMirror-menubar {\n  display: none;\n}\n.ProseMirror-gapcursor {\n  display: none;\n  pointer-events: none;\n  position: absolute;\n}\n.ProseMirror-gapcursor:after {\n  content: \"\";\n  display: block;\n  position: absolute;\n  top: -2px;\n  width: 20px;\n  border-top: 1px solid var(--color-main-text);\n  animation: ProseMirror-cursor-blink 1.1s steps(2, start) infinite;\n}\n@keyframes ProseMirror-cursor-blink {\nto {\n    visibility: hidden;\n}\n}\n#editor-wrapper {\n  /* Document rendering styles */\n}\n#editor-wrapper div.ProseMirror {\n  margin-top: 44px;\n  height: 100%;\n  position: relative;\n  word-wrap: break-word;\n  white-space: pre-wrap;\n  -webkit-font-variant-ligatures: none;\n  font-variant-ligatures: none;\n  padding: 4px 8px 200px 14px;\n  line-height: 150%;\n  font-size: 14px;\n  outline: none;\n}\n#editor-wrapper div.ProseMirror[contenteditable=true], #editor-wrapper div.ProseMirror[contenteditable=false],\n#editor-wrapper div.ProseMirror [contenteditable=true],\n#editor-wrapper div.ProseMirror [contenteditable=false] {\n  border: none !important;\n  width: 100%;\n  background-color: transparent;\n  color: var(--color-main-text);\n  opacity: 1;\n  -webkit-user-select: text;\n  user-select: text;\n  font-size: 14px;\n}\n#editor-wrapper div.ProseMirror .checkbox-item {\n  display: flex;\n  align-items: start;\n  margin-left: -23px;\n}\n#editor-wrapper div.ProseMirror .checkbox-item input[type=checkbox] {\n  display: none;\n}\n#editor-wrapper div.ProseMirror .checkbox-item:before {\n  content: \"\";\n  vertical-align: middle;\n  margin: 3px 6px 3px 2px;\n  border: 1px solid var(--color-text-maxcontrast);\n  position: relative;\n  display: block;\n  border-radius: var(--border-radius);\n  height: 14px;\n  width: 14px;\n  box-shadow: none !important;\n  background-position: center;\n  cursor: pointer;\n}\n#editor-wrapper div.ProseMirror .checkbox-item.checked:before {\n  background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\n  background-color: var(--color-primary-element);\n  border-color: var(--color-primary-element);\n}\n#editor-wrapper div.ProseMirror .checkbox-item label {\n  display: block;\n  flex-grow: 1;\n  max-width: calc(100% - 28px);\n}\n#editor-wrapper div.ProseMirror > *:first-child {\n  margin-top: 10px;\n}\n#editor-wrapper div.ProseMirror a {\n  color: var(--color-primary-element);\n  text-decoration: underline;\n  padding: 0.5em 0;\n}\n#editor-wrapper div.ProseMirror p {\n  margin-bottom: 1em;\n  line-height: 150%;\n}\n#editor-wrapper div.ProseMirror em {\n  font-style: italic;\n}\n#editor-wrapper div.ProseMirror h1,\n#editor-wrapper div.ProseMirror h2,\n#editor-wrapper div.ProseMirror h3,\n#editor-wrapper div.ProseMirror h4,\n#editor-wrapper div.ProseMirror h5,\n#editor-wrapper div.ProseMirror h6 {\n  font-weight: 600;\n  line-height: 120%;\n  margin-top: 24px;\n  margin-bottom: 12px;\n  color: var(--color-main-text);\n}\n#editor-wrapper div.ProseMirror h1 {\n  font-size: 36px;\n  margin-top: 48px;\n}\n#editor-wrapper div.ProseMirror h2 {\n  font-size: 30px;\n  margin-top: 48px;\n}\n#editor-wrapper div.ProseMirror h3 {\n  font-size: 24px;\n}\n#editor-wrapper div.ProseMirror h4 {\n  font-size: 21px;\n}\n#editor-wrapper div.ProseMirror h5 {\n  font-size: 17px;\n}\n#editor-wrapper div.ProseMirror h6 {\n  font-size: 14px;\n}\n#editor-wrapper div.ProseMirror img {\n  cursor: default;\n  max-width: 100%;\n}\n#editor-wrapper div.ProseMirror hr {\n  padding: 2px 0;\n  border: none;\n  margin: 3em 0;\n  width: 100%;\n}\n#editor-wrapper div.ProseMirror hr:after {\n  content: \"\";\n  display: block;\n  height: 1px;\n  background-color: var(--color-border-dark);\n  line-height: 2px;\n}\n#editor-wrapper div.ProseMirror pre {\n  white-space: pre;\n  overflow-x: auto;\n  background-color: var(--color-background-dark);\n  border-radius: var(--border-radius);\n  padding: 1em 1.3em;\n  margin-bottom: 1em;\n}\n#editor-wrapper div.ProseMirror p code {\n  background-color: var(--color-background-dark);\n  border-radius: var(--border-radius);\n  padding: 0.1em 0.3em;\n}\n#editor-wrapper div.ProseMirror li {\n  position: relative;\n  padding-left: 3px;\n}\n#editor-wrapper div.ProseMirror li p {\n  margin-bottom: 0.5em;\n}\n#editor-wrapper div.ProseMirror ul, #editor-wrapper div.ProseMirror ol {\n  padding-left: 10px;\n  margin-left: 10px;\n  margin-bottom: 1em;\n}\n#editor-wrapper div.ProseMirror ul li {\n  list-style-type: disc;\n}\n#editor-wrapper div.ProseMirror ul > li > ul > li {\n  list-style-type: circle;\n}\n#editor-wrapper div.ProseMirror ul > li > ul > li ul li {\n  list-style-type: square;\n}\n#editor-wrapper div.ProseMirror blockquote {\n  padding-left: 1em;\n  border-left: 4px solid var(--color-primary-element);\n  color: var(--color-text-maxcontrast);\n  margin-left: 0;\n  margin-right: 0;\n}\n#editor-wrapper .ProseMirror-focused .ProseMirror-gapcursor {\n  display: block;\n}\n#editor-wrapper .editor__content p.is-empty:first-child::before {\n  content: attr(data-empty-text);\n  float: left;\n  color: var(--color-text-maxcontrast);\n  pointer-events: none;\n  height: 0;\n}\n#editor-wrapper:not(.richEditor) .ProseMirror pre {\n  background-color: var(--color-main-background);\n}\n#editor-wrapper:not(.richEditor) .ProseMirror pre::before {\n  content: attr(data-language);\n  text-transform: uppercase;\n  display: block;\n  text-align: right;\n  font-weight: bold;\n  font-size: 0.6rem;\n}\n#editor-wrapper:not(.richEditor) .ProseMirror pre code .hljs-comment,\n#editor-wrapper:not(.richEditor) .ProseMirror pre code .hljs-quote {\n  color: #999999;\n}\n#editor-wrapper:not(.richEditor) .ProseMirror pre code .hljs-variable,\n#editor-wrapper:not(.richEditor) .ProseMirror pre code .hljs-template-variable,\n#editor-wrapper:not(.richEditor) .ProseMirror pre code .hljs-attribute,\n#editor-wrapper:not(.richEditor) .ProseMirror pre code .hljs-tag,\n#editor-wrapper:not(.richEditor) .ProseMirror pre code .hljs-name,\n#editor-wrapper:not(.richEditor) .ProseMirror pre code .hljs-regexp,\n#editor-wrapper:not(.richEditor) .ProseMirror pre code .hljs-link,\n#editor-wrapper:not(.richEditor) .ProseMirror pre code .hljs-selector-id,\n#editor-wrapper:not(.richEditor) .ProseMirror pre code .hljs-selector-class {\n  color: #f2777a;\n}\n#editor-wrapper:not(.richEditor) .ProseMirror pre code .hljs-number,\n#editor-wrapper:not(.richEditor) .ProseMirror pre code .hljs-meta,\n#editor-wrapper:not(.richEditor) .ProseMirror pre code .hljs-built_in,\n#editor-wrapper:not(.richEditor) .ProseMirror pre code .hljs-builtin-name,\n#editor-wrapper:not(.richEditor) .ProseMirror pre code .hljs-literal,\n#editor-wrapper:not(.richEditor) .ProseMirror pre code .hljs-type,\n#editor-wrapper:not(.richEditor) .ProseMirror pre code .hljs-params {\n  color: #f99157;\n}\n#editor-wrapper:not(.richEditor) .ProseMirror pre code .hljs-string,\n#editor-wrapper:not(.richEditor) .ProseMirror pre code .hljs-symbol,\n#editor-wrapper:not(.richEditor) .ProseMirror pre code .hljs-bullet {\n  color: #99cc99;\n}\n#editor-wrapper:not(.richEditor) .ProseMirror pre code .hljs-title,\n#editor-wrapper:not(.richEditor) .ProseMirror pre code .hljs-section {\n  color: #ffcc66;\n}\n#editor-wrapper:not(.richEditor) .ProseMirror pre code .hljs-keyword,\n#editor-wrapper:not(.richEditor) .ProseMirror pre code .hljs-selector-tag {\n  color: #6699cc;\n}\n#editor-wrapper:not(.richEditor) .ProseMirror pre code .hljs-emphasis {\n  font-style: italic;\n}\n#editor-wrapper:not(.richEditor) .ProseMirror pre code .hljs-strong {\n  font-weight: 700;\n}\n#files-public-content {\n  height: 100%;\n}", "",{"version":3,"sources":["webpack://./css/style.scss","webpack://./EditorWrapper.vue","webpack://./src/components/EditorWrapper.vue","webpack://./css/prosemirror.scss"],"names":[],"mappings":"AAAA;EACE,kBAAA;ACCF;ADEA;EAA0C,uBAAA;EAAyB,6BAAA;ACGnE;ADFA;EAA+C,uBAAA;EAAyB,6BAAA;ACOxE;ADNA;EAA6B,wBAAA;EAA0B,6BAAA;ACWvD;ADTA;EACE,uBAAA;ACYF;;ADTA,gDAAA;AACA;EACE,aAAA;ACYF;ADTA;EACE,WAAA;EACA,kBAAA;EACA,WAAA;EACA,WAAA;EAAa,SAAA;EAAW,YAAA;EACxB,sBAAA;EACA,oBAAA;ACcF;ADTE;;EACE,aAAA;ACaJ;ADTA;EACE,aAAA;EACA,oBAAA;EACA,kBAAA;ACYF;ADTA;EACE,WAAA;EACA,cAAA;EACA,kBAAA;EACA,SAAA;EACA,WAAA;EACA,4CAAA;EACA,iEAAA;ACYF;ADTA;AACE;IACE,kBAAA;ACYF;AACF;ACulBA;ECvpBA,8BAAA;AFmEA;AElEA;EACC,gBAAA;EACA,YAAA;EACA,kBAAA;EACA,qBAAA;EACA,qBAAA;EACA,oCAAA;EACA,4BAAA;EACA,2BAAA;EACA,iBAAA;EACA,eAAA;EACA,aAAA;AFoED;AElEC;;;EAIC,uBAAA;EACA,WAAA;EACA,6BAAA;EACA,6BAAA;EACA,UAAA;EACA,yBAAA;EACA,iBAAA;EACA,eAAA;AFmEF;AEhEC;EACC,aAAA;EACA,kBAAA;EAEA,kBAAA;AFiEF;AE/DE;EACC,aAAA;AFiEH;AE/DE;EACC,WAAA;EACA,sBAAA;EACA,uBAAA;EACA,+CAAA;EACA,kBAAA;EACA,cAAA;EACA,mCAAA;EACA,YAAA;EACA,WAAA;EACA,2BAAA;EACA,2BAAA;EACA,eAAA;AFiEH;AE/DE;EACC,yDAAA;EACA,8CAAA;EACA,0CAAA;AFiEH;AE/DE;EACC,cAAA;EACA,YAAA;EACA,4BAAA;AFiEH;AE7DC;EACC,gBAAA;AF+DF;AE5DC;EACC,mCAAA;EACA,0BAAA;EACA,gBAAA;AF8DF;AE3DC;EACC,kBAAA;EACA,iBAAA;AF6DF;AE1DC;EACC,kBAAA;AF4DF;AEzDC;;;;;;EAMC,gBAAA;EACA,iBAAA;EACA,gBAAA;EACA,mBAAA;EACA,6BAAA;AF2DF;AExDC;EACC,eAAA;EACA,gBAAA;AF0DF;AEvDC;EACC,eAAA;EACA,gBAAA;AFyDF;AEtDC;EACC,eAAA;AFwDF;AErDC;EACC,eAAA;AFuDF;AEpDC;EACC,eAAA;AFsDF;AEnDC;EACC,eAAA;AFqDF;AElDC;EACC,eAAA;EACA,eAAA;AFoDF;AEjDC;EACC,cAAA;EACA,YAAA;EACA,aAAA;EACA,WAAA;AFmDF;AEhDC;EACC,WAAA;EACA,cAAA;EACA,WAAA;EACA,0CAAA;EACA,gBAAA;AFkDF;AE/CC;EACC,gBAAA;EACA,gBAAA;EACA,8CAAA;EACA,mCAAA;EACA,kBAAA;EACA,kBAAA;AFiDF;AE9CC;EACC,8CAAA;EACA,mCAAA;EACA,oBAAA;AFgDF;AE7CC;EACC,kBAAA;EACA,iBAAA;AF+CF;AE7CE;EACC,oBAAA;AF+CH;AE3CC;EACC,kBAAA;EACA,iBAAA;EACA,kBAAA;AF6CF;AE1CC;EACC,qBAAA;AF4CF;AExCC;EACC,uBAAA;AF0CF;AEtCC;EACC,uBAAA;AFwCF;AErCC;EACC,iBAAA;EACA,mDAAA;EACA,oCAAA;EACA,cAAA;EACA,eAAA;AFuCF;AElCA;EACC,cAAA;AFoCD;AEjCA;EACC,8BAAA;EACA,WAAA;EACA,oCAAA;EACA,oBAAA;EACA,SAAA;AFmCD;AC4aE;EACC,8CAAA;AD1aH;AC4aG;EACC,4BAAA;EACA,yBAAA;EACA,cAAA;EACA,iBAAA;EACA,iBAAA;EACA,iBAAA;AD1aJ;AC6aI;;EAEC,cAAA;AD3aL;AC6aI;;;;;;;;;EASC,cAAA;AD3aL;AC6aI;;;;;;;EAOC,cAAA;AD3aL;AC6aI;;;EAGC,cAAA;AD3aL;AC6aI;;EAEC,cAAA;AD3aL;AC6aI;;EAEC,cAAA;AD3aL;AC6aI;EACC,kBAAA;AD3aL;AC6aI;EACC,gBAAA;AD3aL;ACobA;EACC,YAAA;ADjbD","sourcesContent":[".modal-container #editor-container {\n  position: absolute;\n}\n\n.ProseMirror-hideselection *::selection { background: transparent; color: var(--color-main-text); }\n.ProseMirror-hideselection *::-moz-selection { background: transparent; color: var(--color-main-text); }\n.ProseMirror-hideselection { caret-color: transparent; color: var(--color-main-text); }\n\n.ProseMirror-selectednode {\n  outline: 2px solid #8cf;\n}\n\n/* Make sure li selections wrap around markers */\nli.ProseMirror-selectednode {\n  outline: none;\n}\n\nli.ProseMirror-selectednode:after {\n  content: \"\";\n  position: absolute;\n  left: -32px;\n  right: -2px; top: -2px; bottom: -2px;\n  border: 2px solid #8cf;\n  pointer-events: none;\n}\n\n.has-conflicts,\n#editor-wrapper.icon-loading {\n  .ProseMirror-menubar {\n    display: none;\n  }\n}\n\n.ProseMirror-gapcursor {\n  display: none;\n  pointer-events: none;\n  position: absolute;\n}\n\n.ProseMirror-gapcursor:after {\n  content: \"\";\n  display: block;\n  position: absolute;\n  top: -2px;\n  width: 20px;\n  border-top: 1px solid var(--color-main-text);\n  animation: ProseMirror-cursor-blink 1.1s steps(2, start) infinite;\n}\n\n@keyframes ProseMirror-cursor-blink {\n  to {\n    visibility: hidden;\n  }\n}\n",".modal-container #editor-container {\n  position: absolute;\n}\n\n.ProseMirror-hideselection *::selection {\n  background: transparent;\n  color: var(--color-main-text);\n}\n\n.ProseMirror-hideselection *::-moz-selection {\n  background: transparent;\n  color: var(--color-main-text);\n}\n\n.ProseMirror-hideselection {\n  caret-color: transparent;\n  color: var(--color-main-text);\n}\n\n.ProseMirror-selectednode {\n  outline: 2px solid #8cf;\n}\n\n/* Make sure li selections wrap around markers */\nli.ProseMirror-selectednode {\n  outline: none;\n}\n\nli.ProseMirror-selectednode:after {\n  content: \"\";\n  position: absolute;\n  left: -32px;\n  right: -2px;\n  top: -2px;\n  bottom: -2px;\n  border: 2px solid #8cf;\n  pointer-events: none;\n}\n\n.has-conflicts .ProseMirror-menubar,\n#editor-wrapper.icon-loading .ProseMirror-menubar {\n  display: none;\n}\n\n.ProseMirror-gapcursor {\n  display: none;\n  pointer-events: none;\n  position: absolute;\n}\n\n.ProseMirror-gapcursor:after {\n  content: \"\";\n  display: block;\n  position: absolute;\n  top: -2px;\n  width: 20px;\n  border-top: 1px solid var(--color-main-text);\n  animation: ProseMirror-cursor-blink 1.1s steps(2, start) infinite;\n}\n\n@keyframes ProseMirror-cursor-blink {\n  to {\n    visibility: hidden;\n  }\n}\n#editor-wrapper {\n  /* Document rendering styles */\n}\n#editor-wrapper div.ProseMirror {\n  margin-top: 44px;\n  height: 100%;\n  position: relative;\n  word-wrap: break-word;\n  white-space: pre-wrap;\n  -webkit-font-variant-ligatures: none;\n  font-variant-ligatures: none;\n  padding: 4px 8px 200px 14px;\n  line-height: 150%;\n  font-size: 14px;\n  outline: none;\n}\n#editor-wrapper div.ProseMirror[contenteditable=true], #editor-wrapper div.ProseMirror[contenteditable=false],\n#editor-wrapper div.ProseMirror [contenteditable=true],\n#editor-wrapper div.ProseMirror [contenteditable=false] {\n  border: none !important;\n  width: 100%;\n  background-color: transparent;\n  color: var(--color-main-text);\n  opacity: 1;\n  -webkit-user-select: text;\n  user-select: text;\n  font-size: 14px;\n}\n#editor-wrapper div.ProseMirror .checkbox-item {\n  display: flex;\n  align-items: start;\n  margin-left: -23px;\n}\n#editor-wrapper div.ProseMirror .checkbox-item input[type=checkbox] {\n  display: none;\n}\n#editor-wrapper div.ProseMirror .checkbox-item:before {\n  content: \"\";\n  vertical-align: middle;\n  margin: 3px 6px 3px 2px;\n  border: 1px solid var(--color-text-maxcontrast);\n  position: relative;\n  display: block;\n  border-radius: var(--border-radius);\n  height: 14px;\n  width: 14px;\n  box-shadow: none !important;\n  background-position: center;\n  cursor: pointer;\n}\n#editor-wrapper div.ProseMirror .checkbox-item.checked:before {\n  background-image: url(\"../../img/checkbox-mark.svg\");\n  background-color: var(--color-primary-element);\n  border-color: var(--color-primary-element);\n}\n#editor-wrapper div.ProseMirror .checkbox-item label {\n  display: block;\n  flex-grow: 1;\n  max-width: calc(100% - 28px);\n}\n#editor-wrapper div.ProseMirror > *:first-child {\n  margin-top: 10px;\n}\n#editor-wrapper div.ProseMirror a {\n  color: var(--color-primary-element);\n  text-decoration: underline;\n  padding: 0.5em 0;\n}\n#editor-wrapper div.ProseMirror p {\n  margin-bottom: 1em;\n  line-height: 150%;\n}\n#editor-wrapper div.ProseMirror em {\n  font-style: italic;\n}\n#editor-wrapper div.ProseMirror h1,\n#editor-wrapper div.ProseMirror h2,\n#editor-wrapper div.ProseMirror h3,\n#editor-wrapper div.ProseMirror h4,\n#editor-wrapper div.ProseMirror h5,\n#editor-wrapper div.ProseMirror h6 {\n  font-weight: 600;\n  line-height: 120%;\n  margin-top: 24px;\n  margin-bottom: 12px;\n  color: var(--color-main-text);\n}\n#editor-wrapper div.ProseMirror h1 {\n  font-size: 36px;\n  margin-top: 48px;\n}\n#editor-wrapper div.ProseMirror h2 {\n  font-size: 30px;\n  margin-top: 48px;\n}\n#editor-wrapper div.ProseMirror h3 {\n  font-size: 24px;\n}\n#editor-wrapper div.ProseMirror h4 {\n  font-size: 21px;\n}\n#editor-wrapper div.ProseMirror h5 {\n  font-size: 17px;\n}\n#editor-wrapper div.ProseMirror h6 {\n  font-size: 14px;\n}\n#editor-wrapper div.ProseMirror img {\n  cursor: default;\n  max-width: 100%;\n}\n#editor-wrapper div.ProseMirror hr {\n  padding: 2px 0;\n  border: none;\n  margin: 3em 0;\n  width: 100%;\n}\n#editor-wrapper div.ProseMirror hr:after {\n  content: \"\";\n  display: block;\n  height: 1px;\n  background-color: var(--color-border-dark);\n  line-height: 2px;\n}\n#editor-wrapper div.ProseMirror pre {\n  white-space: pre;\n  overflow-x: auto;\n  background-color: var(--color-background-dark);\n  border-radius: var(--border-radius);\n  padding: 1em 1.3em;\n  margin-bottom: 1em;\n}\n#editor-wrapper div.ProseMirror p code {\n  background-color: var(--color-background-dark);\n  border-radius: var(--border-radius);\n  padding: 0.1em 0.3em;\n}\n#editor-wrapper div.ProseMirror li {\n  position: relative;\n  padding-left: 3px;\n}\n#editor-wrapper div.ProseMirror li p {\n  margin-bottom: 0.5em;\n}\n#editor-wrapper div.ProseMirror ul, #editor-wrapper div.ProseMirror ol {\n  padding-left: 10px;\n  margin-left: 10px;\n  margin-bottom: 1em;\n}\n#editor-wrapper div.ProseMirror ul li {\n  list-style-type: disc;\n}\n#editor-wrapper div.ProseMirror ul > li > ul > li {\n  list-style-type: circle;\n}\n#editor-wrapper div.ProseMirror ul > li > ul > li ul li {\n  list-style-type: square;\n}\n#editor-wrapper div.ProseMirror blockquote {\n  padding-left: 1em;\n  border-left: 4px solid var(--color-primary-element);\n  color: var(--color-text-maxcontrast);\n  margin-left: 0;\n  margin-right: 0;\n}\n#editor-wrapper .ProseMirror-focused .ProseMirror-gapcursor {\n  display: block;\n}\n#editor-wrapper .editor__content p.is-empty:first-child::before {\n  content: attr(data-empty-text);\n  float: left;\n  color: var(--color-text-maxcontrast);\n  pointer-events: none;\n  height: 0;\n}\n#editor-wrapper:not(.richEditor) .ProseMirror pre {\n  background-color: var(--color-main-background);\n}\n#editor-wrapper:not(.richEditor) .ProseMirror pre::before {\n  content: attr(data-language);\n  text-transform: uppercase;\n  display: block;\n  text-align: right;\n  font-weight: bold;\n  font-size: 0.6rem;\n}\n#editor-wrapper:not(.richEditor) .ProseMirror pre code .hljs-comment,\n#editor-wrapper:not(.richEditor) .ProseMirror pre code .hljs-quote {\n  color: #999999;\n}\n#editor-wrapper:not(.richEditor) .ProseMirror pre code .hljs-variable,\n#editor-wrapper:not(.richEditor) .ProseMirror pre code .hljs-template-variable,\n#editor-wrapper:not(.richEditor) .ProseMirror pre code .hljs-attribute,\n#editor-wrapper:not(.richEditor) .ProseMirror pre code .hljs-tag,\n#editor-wrapper:not(.richEditor) .ProseMirror pre code .hljs-name,\n#editor-wrapper:not(.richEditor) .ProseMirror pre code .hljs-regexp,\n#editor-wrapper:not(.richEditor) .ProseMirror pre code .hljs-link,\n#editor-wrapper:not(.richEditor) .ProseMirror pre code .hljs-selector-id,\n#editor-wrapper:not(.richEditor) .ProseMirror pre code .hljs-selector-class {\n  color: #f2777a;\n}\n#editor-wrapper:not(.richEditor) .ProseMirror pre code .hljs-number,\n#editor-wrapper:not(.richEditor) .ProseMirror pre code .hljs-meta,\n#editor-wrapper:not(.richEditor) .ProseMirror pre code .hljs-built_in,\n#editor-wrapper:not(.richEditor) .ProseMirror pre code .hljs-builtin-name,\n#editor-wrapper:not(.richEditor) .ProseMirror pre code .hljs-literal,\n#editor-wrapper:not(.richEditor) .ProseMirror pre code .hljs-type,\n#editor-wrapper:not(.richEditor) .ProseMirror pre code .hljs-params {\n  color: #f99157;\n}\n#editor-wrapper:not(.richEditor) .ProseMirror pre code .hljs-string,\n#editor-wrapper:not(.richEditor) .ProseMirror pre code .hljs-symbol,\n#editor-wrapper:not(.richEditor) .ProseMirror pre code .hljs-bullet {\n  color: #99cc99;\n}\n#editor-wrapper:not(.richEditor) .ProseMirror pre code .hljs-title,\n#editor-wrapper:not(.richEditor) .ProseMirror pre code .hljs-section {\n  color: #ffcc66;\n}\n#editor-wrapper:not(.richEditor) .ProseMirror pre code .hljs-keyword,\n#editor-wrapper:not(.richEditor) .ProseMirror pre code .hljs-selector-tag {\n  color: #6699cc;\n}\n#editor-wrapper:not(.richEditor) .ProseMirror pre code .hljs-emphasis {\n  font-style: italic;\n}\n#editor-wrapper:not(.richEditor) .ProseMirror pre code .hljs-strong {\n  font-weight: 700;\n}\n\n#files-public-content {\n  height: 100%;\n}","\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n@import './../../css/style';\n\n#editor-wrapper {\n\t@import './../../css/prosemirror';\n\n\t&:not(.richEditor) .ProseMirror {\n\t\tpre {\n\t\t\tbackground-color: var(--color-main-background);\n\n\t\t\t&::before {\n\t\t\t\tcontent: attr(data-language);\n\t\t\t\ttext-transform: uppercase;\n\t\t\t\tdisplay: block;\n\t\t\t\ttext-align: right;\n\t\t\t\tfont-weight: bold;\n\t\t\t\tfont-size: 0.6rem;\n\t\t\t}\n\t\t\tcode {\n\t\t\t\t.hljs-comment,\n\t\t\t\t.hljs-quote {\n\t\t\t\t\tcolor: #999999;\n\t\t\t\t}\n\t\t\t\t.hljs-variable,\n\t\t\t\t.hljs-template-variable,\n\t\t\t\t.hljs-attribute,\n\t\t\t\t.hljs-tag,\n\t\t\t\t.hljs-name,\n\t\t\t\t.hljs-regexp,\n\t\t\t\t.hljs-link,\n\t\t\t\t.hljs-selector-id,\n\t\t\t\t.hljs-selector-class {\n\t\t\t\t\tcolor: #f2777a;\n\t\t\t\t}\n\t\t\t\t.hljs-number,\n\t\t\t\t.hljs-meta,\n\t\t\t\t.hljs-built_in,\n\t\t\t\t.hljs-builtin-name,\n\t\t\t\t.hljs-literal,\n\t\t\t\t.hljs-type,\n\t\t\t\t.hljs-params {\n\t\t\t\t\tcolor: #f99157;\n\t\t\t\t}\n\t\t\t\t.hljs-string,\n\t\t\t\t.hljs-symbol,\n\t\t\t\t.hljs-bullet {\n\t\t\t\t\tcolor: #99cc99;\n\t\t\t\t}\n\t\t\t\t.hljs-title,\n\t\t\t\t.hljs-section {\n\t\t\t\t\tcolor: #ffcc66;\n\t\t\t\t}\n\t\t\t\t.hljs-keyword,\n\t\t\t\t.hljs-selector-tag {\n\t\t\t\t\tcolor: #6699cc;\n\t\t\t\t}\n\t\t\t\t.hljs-emphasis {\n\t\t\t\t\tfont-style: italic;\n\t\t\t\t}\n\t\t\t\t.hljs-strong {\n\t\t\t\t\tfont-weight: 700;\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n}\n\n// Required in order to make the public pages behave the same if talk is enabled or not\n// as Talk overwrites the public page styles and changes the DOM layout for the sidebar injection\n#files-public-content {\n\theight: 100%;\n}\n","/* Document rendering styles */\ndiv.ProseMirror {\n\tmargin-top: 44px;\n\theight: 100%;\n\tposition: relative;\n\tword-wrap: break-word;\n\twhite-space: pre-wrap;\n\t-webkit-font-variant-ligatures: none;\n\tfont-variant-ligatures: none;\n\tpadding: 4px 8px 200px 14px;\n\tline-height: 150%;\n\tfont-size: 14px;\n\toutline: none;\n\n\t&[contenteditable=true],\n\t&[contenteditable=false],\n\t[contenteditable=true],\n\t[contenteditable=false] {\n\t\tborder: none !important;\n\t\twidth: 100%;\n\t\tbackground-color: transparent;\n\t\tcolor: var(--color-main-text);\n\t\topacity: 1;\n\t\t-webkit-user-select: text;\n\t\tuser-select: text;\n\t\tfont-size: 14px;\n\t}\n\n\t.checkbox-item {\n\t\tdisplay: flex;\n\t\talign-items: start;\n\t\t// Left-align with list item text\n\t\tmargin-left: -23px;\n\n\t\tinput[type=checkbox] {\n\t\t\tdisplay: none;\n\t\t}\n\t\t&:before {\n\t\t\tcontent: '';\n\t\t\tvertical-align: middle;\n\t\t\tmargin: 3px 6px 3px 2px;\n\t\t\tborder: 1px solid var(--color-text-maxcontrast);\n\t\t\tposition: relative;\n\t\t\tdisplay: block;\n\t\t\tborder-radius: var(--border-radius);\n\t\t\theight: 14px;\n\t\t\twidth: 14px;\n\t\t\tbox-shadow: none !important;\n\t\t\tbackground-position: center;\n\t\t\tcursor: pointer;\n\t\t}\n\t\t&.checked:before {\n\t\t\tbackground-image: url('../../img/checkbox-mark.svg');\n\t\t\tbackground-color: var(--color-primary-element);\n\t\t\tborder-color: var(--color-primary-element);\n\t\t}\n\t\tlabel {\n\t\t\tdisplay: block;\n\t\t\tflex-grow: 1;\n\t\t\tmax-width: calc(100% - 28px);\n\t\t}\n\t}\n\n\t> *:first-child {\n\t\tmargin-top: 10px;\n\t}\n\n\ta {\n\t\tcolor: var(--color-primary-element);\n\t\ttext-decoration: underline;\n\t\tpadding: .5em 0;\n\t}\n\n\tp {\n\t\tmargin-bottom: 1em;\n\t\tline-height: 150%;\n\t}\n\n\tem {\n\t\tfont-style: italic;\n\t}\n\n\th1,\n\th2,\n\th3,\n\th4,\n\th5,\n\th6 {\n\t\tfont-weight: 600;\n\t\tline-height: 120%;\n\t\tmargin-top: 24px;\n\t\tmargin-bottom: 12px;\n\t\tcolor: var(--color-main-text);\n\t}\n\n\th1 {\n\t\tfont-size: 36px;\n\t\tmargin-top: 48px;\n\t}\n\n\th2 {\n\t\tfont-size: 30px;\n\t\tmargin-top: 48px;\n\t}\n\n\th3 {\n\t\tfont-size: 24px;\n\t}\n\n\th4 {\n\t\tfont-size: 21px;\n\t}\n\n\th5 {\n\t\tfont-size: 17px;\n\t}\n\n\th6 {\n\t\tfont-size: 14px;\n\t}\n\n\timg {\n\t\tcursor: default;\n\t\tmax-width: 100%;\n\t}\n\n\thr {\n\t\tpadding: 2px 0;\n\t\tborder: none;\n\t\tmargin: 3em 0;\n\t\twidth: 100%;\n\t}\n\n\thr:after {\n\t\tcontent: \"\";\n\t\tdisplay: block;\n\t\theight: 1px;\n\t\tbackground-color: var(--color-border-dark);\n\t\tline-height: 2px;\n\t}\n\n\tpre {\n\t\twhite-space: pre;\n\t\toverflow-x: auto;\n\t\tbackground-color: var(--color-background-dark);\n\t\tborder-radius: var(--border-radius);\n\t\tpadding: 1em 1.3em;\n\t\tmargin-bottom: 1em;\n\t}\n\n\tp code {\n\t\tbackground-color: var(--color-background-dark);\n\t\tborder-radius: var(--border-radius);\n\t\tpadding: .1em .3em;\n\t}\n\n\tli {\n\t\tposition: relative;\n\t\tpadding-left: 3px;\n\n\t\tp {\n\t\t\tmargin-bottom: 0.5em;\n\t\t}\n\t}\n\n\tul, ol {\n\t\tpadding-left: 10px;\n\t\tmargin-left: 10px;\n\t\tmargin-bottom: 1em;\n\t}\n\n\tul li {\n\t\tlist-style-type: disc;\n\t}\n\n\t// Second-level list entries\n\tul > li > ul > li {\n\t\tlist-style-type: circle;\n\t}\n\n\t// Third-level and further down list entries\n\tul > li > ul > li ul li {\n\t\tlist-style-type: square;\n\t}\n\n\tblockquote {\n\t\tpadding-left: 1em;\n\t\tborder-left: 4px solid var(--color-primary-element);\n\t\tcolor: var(--color-text-maxcontrast);\n\t\tmargin-left: 0;\n\t\tmargin-right: 0;\n\t}\n\n}\n\n.ProseMirror-focused .ProseMirror-gapcursor {\n\tdisplay: block;\n}\n\n.editor__content p.is-empty:first-child::before {\n\tcontent: attr(data-empty-text);\n\tfloat: left;\n\tcolor: var(--color-text-maxcontrast);\n\tpointer-events: none;\n\theight: 0;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/components/ReadOnlyEditor.vue?vue&type=style&index=0&lang=scss&":
/*!*********************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/components/ReadOnlyEditor.vue?vue&type=style&index=0&lang=scss& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ "./node_modules/css-loader/dist/runtime/cssWithMappingToString.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _img_checkbox_mark_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../img/checkbox-mark.svg */ "./img/checkbox-mark.svg");
// Imports




var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default.a);
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_img_checkbox_mark_svg__WEBPACK_IMPORTED_MODULE_3__["default"]);
// Module
___CSS_LOADER_EXPORT___.push([module.i, "#read-only-editor {\n  /* Document rendering styles */\n  overflow: scroll;\n}\n#read-only-editor div.ProseMirror {\n  margin-top: 44px;\n  height: 100%;\n  position: relative;\n  word-wrap: break-word;\n  white-space: pre-wrap;\n  -webkit-font-variant-ligatures: none;\n  font-variant-ligatures: none;\n  padding: 4px 8px 200px 14px;\n  line-height: 150%;\n  font-size: 14px;\n  outline: none;\n}\n#read-only-editor div.ProseMirror[contenteditable=true], #read-only-editor div.ProseMirror[contenteditable=false],\n#read-only-editor div.ProseMirror [contenteditable=true],\n#read-only-editor div.ProseMirror [contenteditable=false] {\n  border: none !important;\n  width: 100%;\n  background-color: transparent;\n  color: var(--color-main-text);\n  opacity: 1;\n  -webkit-user-select: text;\n  user-select: text;\n  font-size: 14px;\n}\n#read-only-editor div.ProseMirror .checkbox-item {\n  display: flex;\n  align-items: start;\n  margin-left: -23px;\n}\n#read-only-editor div.ProseMirror .checkbox-item input[type=checkbox] {\n  display: none;\n}\n#read-only-editor div.ProseMirror .checkbox-item:before {\n  content: \"\";\n  vertical-align: middle;\n  margin: 3px 6px 3px 2px;\n  border: 1px solid var(--color-text-maxcontrast);\n  position: relative;\n  display: block;\n  border-radius: var(--border-radius);\n  height: 14px;\n  width: 14px;\n  box-shadow: none !important;\n  background-position: center;\n  cursor: pointer;\n}\n#read-only-editor div.ProseMirror .checkbox-item.checked:before {\n  background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\n  background-color: var(--color-primary-element);\n  border-color: var(--color-primary-element);\n}\n#read-only-editor div.ProseMirror .checkbox-item label {\n  display: block;\n  flex-grow: 1;\n  max-width: calc(100% - 28px);\n}\n#read-only-editor div.ProseMirror > *:first-child {\n  margin-top: 10px;\n}\n#read-only-editor div.ProseMirror a {\n  color: var(--color-primary-element);\n  text-decoration: underline;\n  padding: 0.5em 0;\n}\n#read-only-editor div.ProseMirror p {\n  margin-bottom: 1em;\n  line-height: 150%;\n}\n#read-only-editor div.ProseMirror em {\n  font-style: italic;\n}\n#read-only-editor div.ProseMirror h1,\n#read-only-editor div.ProseMirror h2,\n#read-only-editor div.ProseMirror h3,\n#read-only-editor div.ProseMirror h4,\n#read-only-editor div.ProseMirror h5,\n#read-only-editor div.ProseMirror h6 {\n  font-weight: 600;\n  line-height: 120%;\n  margin-top: 24px;\n  margin-bottom: 12px;\n  color: var(--color-main-text);\n}\n#read-only-editor div.ProseMirror h1 {\n  font-size: 36px;\n  margin-top: 48px;\n}\n#read-only-editor div.ProseMirror h2 {\n  font-size: 30px;\n  margin-top: 48px;\n}\n#read-only-editor div.ProseMirror h3 {\n  font-size: 24px;\n}\n#read-only-editor div.ProseMirror h4 {\n  font-size: 21px;\n}\n#read-only-editor div.ProseMirror h5 {\n  font-size: 17px;\n}\n#read-only-editor div.ProseMirror h6 {\n  font-size: 14px;\n}\n#read-only-editor div.ProseMirror img {\n  cursor: default;\n  max-width: 100%;\n}\n#read-only-editor div.ProseMirror hr {\n  padding: 2px 0;\n  border: none;\n  margin: 3em 0;\n  width: 100%;\n}\n#read-only-editor div.ProseMirror hr:after {\n  content: \"\";\n  display: block;\n  height: 1px;\n  background-color: var(--color-border-dark);\n  line-height: 2px;\n}\n#read-only-editor div.ProseMirror pre {\n  white-space: pre;\n  overflow-x: auto;\n  background-color: var(--color-background-dark);\n  border-radius: var(--border-radius);\n  padding: 1em 1.3em;\n  margin-bottom: 1em;\n}\n#read-only-editor div.ProseMirror p code {\n  background-color: var(--color-background-dark);\n  border-radius: var(--border-radius);\n  padding: 0.1em 0.3em;\n}\n#read-only-editor div.ProseMirror li {\n  position: relative;\n  padding-left: 3px;\n}\n#read-only-editor div.ProseMirror li p {\n  margin-bottom: 0.5em;\n}\n#read-only-editor div.ProseMirror ul, #read-only-editor div.ProseMirror ol {\n  padding-left: 10px;\n  margin-left: 10px;\n  margin-bottom: 1em;\n}\n#read-only-editor div.ProseMirror ul li {\n  list-style-type: disc;\n}\n#read-only-editor div.ProseMirror ul > li > ul > li {\n  list-style-type: circle;\n}\n#read-only-editor div.ProseMirror ul > li > ul > li ul li {\n  list-style-type: square;\n}\n#read-only-editor div.ProseMirror blockquote {\n  padding-left: 1em;\n  border-left: 4px solid var(--color-primary-element);\n  color: var(--color-text-maxcontrast);\n  margin-left: 0;\n  margin-right: 0;\n}\n#read-only-editor .ProseMirror-focused .ProseMirror-gapcursor {\n  display: block;\n}\n#read-only-editor .editor__content p.is-empty:first-child::before {\n  content: attr(data-empty-text);\n  float: left;\n  color: var(--color-text-maxcontrast);\n  pointer-events: none;\n  height: 0;\n}\n.thumbnailContainer #read-only-editor {\n  width: 100%;\n}\n.thumbnailContainer #read-only-editor .ProseMirror {\n  height: auto;\n  margin: 0 0 0 0;\n  padding: 0;\n}", "",{"version":3,"sources":["webpack://./src/components/ReadOnlyEditor.vue","webpack://./css/prosemirror.scss","webpack://./ReadOnlyEditor.vue"],"names":[],"mappings":"AAgEA;EChEA,8BAAA;EDkEC,gBAAA;AE/DD;ADFA;EACC,gBAAA;EACA,YAAA;EACA,kBAAA;EACA,qBAAA;EACA,qBAAA;EACA,oCAAA;EACA,4BAAA;EACA,2BAAA;EACA,iBAAA;EACA,eAAA;EACA,aAAA;ACID;ADFC;;;EAIC,uBAAA;EACA,WAAA;EACA,6BAAA;EACA,6BAAA;EACA,UAAA;EACA,yBAAA;EACA,iBAAA;EACA,eAAA;ACGF;ADAC;EACC,aAAA;EACA,kBAAA;EAEA,kBAAA;ACCF;ADCE;EACC,aAAA;ACCH;ADCE;EACC,WAAA;EACA,sBAAA;EACA,uBAAA;EACA,+CAAA;EACA,kBAAA;EACA,cAAA;EACA,mCAAA;EACA,YAAA;EACA,WAAA;EACA,2BAAA;EACA,2BAAA;EACA,eAAA;ACCH;ADCE;EACC,yDAAA;EACA,8CAAA;EACA,0CAAA;ACCH;ADCE;EACC,cAAA;EACA,YAAA;EACA,4BAAA;ACCH;ADGC;EACC,gBAAA;ACDF;ADIC;EACC,mCAAA;EACA,0BAAA;EACA,gBAAA;ACFF;ADKC;EACC,kBAAA;EACA,iBAAA;ACHF;ADMC;EACC,kBAAA;ACJF;ADOC;;;;;;EAMC,gBAAA;EACA,iBAAA;EACA,gBAAA;EACA,mBAAA;EACA,6BAAA;ACLF;ADQC;EACC,eAAA;EACA,gBAAA;ACNF;ADSC;EACC,eAAA;EACA,gBAAA;ACPF;ADUC;EACC,eAAA;ACRF;ADWC;EACC,eAAA;ACTF;ADYC;EACC,eAAA;ACVF;ADaC;EACC,eAAA;ACXF;ADcC;EACC,eAAA;EACA,eAAA;ACZF;ADeC;EACC,cAAA;EACA,YAAA;EACA,aAAA;EACA,WAAA;ACbF;ADgBC;EACC,WAAA;EACA,cAAA;EACA,WAAA;EACA,0CAAA;EACA,gBAAA;ACdF;ADiBC;EACC,gBAAA;EACA,gBAAA;EACA,8CAAA;EACA,mCAAA;EACA,kBAAA;EACA,kBAAA;ACfF;ADkBC;EACC,8CAAA;EACA,mCAAA;EACA,oBAAA;AChBF;ADmBC;EACC,kBAAA;EACA,iBAAA;ACjBF;ADmBE;EACC,oBAAA;ACjBH;ADqBC;EACC,kBAAA;EACA,iBAAA;EACA,kBAAA;ACnBF;ADsBC;EACC,qBAAA;ACpBF;ADwBC;EACC,uBAAA;ACtBF;AD0BC;EACC,uBAAA;ACxBF;AD2BC;EACC,iBAAA;EACA,mDAAA;EACA,oCAAA;EACA,cAAA;EACA,eAAA;ACzBF;AD8BA;EACC,cAAA;AC5BD;AD+BA;EACC,8BAAA;EACA,WAAA;EACA,oCAAA;EACA,oBAAA;EACA,SAAA;AC7BD;AF1GA;EACC,WAAA;AE6GD;AF3GC;EACC,YAAA;EACA,eAAA;EACA,UAAA;AE6GF","sourcesContent":["\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n#read-only-editor {\n\t@import './../../css/prosemirror';\n\toverflow: scroll;\n}\n\n.thumbnailContainer #read-only-editor  {\n\twidth: 100%;\n\n\t.ProseMirror {\n\t\theight: auto;\n\t\tmargin: 0 0 0 0;\n\t\tpadding: 0;\n\t}\n}\n\n","/* Document rendering styles */\ndiv.ProseMirror {\n\tmargin-top: 44px;\n\theight: 100%;\n\tposition: relative;\n\tword-wrap: break-word;\n\twhite-space: pre-wrap;\n\t-webkit-font-variant-ligatures: none;\n\tfont-variant-ligatures: none;\n\tpadding: 4px 8px 200px 14px;\n\tline-height: 150%;\n\tfont-size: 14px;\n\toutline: none;\n\n\t&[contenteditable=true],\n\t&[contenteditable=false],\n\t[contenteditable=true],\n\t[contenteditable=false] {\n\t\tborder: none !important;\n\t\twidth: 100%;\n\t\tbackground-color: transparent;\n\t\tcolor: var(--color-main-text);\n\t\topacity: 1;\n\t\t-webkit-user-select: text;\n\t\tuser-select: text;\n\t\tfont-size: 14px;\n\t}\n\n\t.checkbox-item {\n\t\tdisplay: flex;\n\t\talign-items: start;\n\t\t// Left-align with list item text\n\t\tmargin-left: -23px;\n\n\t\tinput[type=checkbox] {\n\t\t\tdisplay: none;\n\t\t}\n\t\t&:before {\n\t\t\tcontent: '';\n\t\t\tvertical-align: middle;\n\t\t\tmargin: 3px 6px 3px 2px;\n\t\t\tborder: 1px solid var(--color-text-maxcontrast);\n\t\t\tposition: relative;\n\t\t\tdisplay: block;\n\t\t\tborder-radius: var(--border-radius);\n\t\t\theight: 14px;\n\t\t\twidth: 14px;\n\t\t\tbox-shadow: none !important;\n\t\t\tbackground-position: center;\n\t\t\tcursor: pointer;\n\t\t}\n\t\t&.checked:before {\n\t\t\tbackground-image: url('../../img/checkbox-mark.svg');\n\t\t\tbackground-color: var(--color-primary-element);\n\t\t\tborder-color: var(--color-primary-element);\n\t\t}\n\t\tlabel {\n\t\t\tdisplay: block;\n\t\t\tflex-grow: 1;\n\t\t\tmax-width: calc(100% - 28px);\n\t\t}\n\t}\n\n\t> *:first-child {\n\t\tmargin-top: 10px;\n\t}\n\n\ta {\n\t\tcolor: var(--color-primary-element);\n\t\ttext-decoration: underline;\n\t\tpadding: .5em 0;\n\t}\n\n\tp {\n\t\tmargin-bottom: 1em;\n\t\tline-height: 150%;\n\t}\n\n\tem {\n\t\tfont-style: italic;\n\t}\n\n\th1,\n\th2,\n\th3,\n\th4,\n\th5,\n\th6 {\n\t\tfont-weight: 600;\n\t\tline-height: 120%;\n\t\tmargin-top: 24px;\n\t\tmargin-bottom: 12px;\n\t\tcolor: var(--color-main-text);\n\t}\n\n\th1 {\n\t\tfont-size: 36px;\n\t\tmargin-top: 48px;\n\t}\n\n\th2 {\n\t\tfont-size: 30px;\n\t\tmargin-top: 48px;\n\t}\n\n\th3 {\n\t\tfont-size: 24px;\n\t}\n\n\th4 {\n\t\tfont-size: 21px;\n\t}\n\n\th5 {\n\t\tfont-size: 17px;\n\t}\n\n\th6 {\n\t\tfont-size: 14px;\n\t}\n\n\timg {\n\t\tcursor: default;\n\t\tmax-width: 100%;\n\t}\n\n\thr {\n\t\tpadding: 2px 0;\n\t\tborder: none;\n\t\tmargin: 3em 0;\n\t\twidth: 100%;\n\t}\n\n\thr:after {\n\t\tcontent: \"\";\n\t\tdisplay: block;\n\t\theight: 1px;\n\t\tbackground-color: var(--color-border-dark);\n\t\tline-height: 2px;\n\t}\n\n\tpre {\n\t\twhite-space: pre;\n\t\toverflow-x: auto;\n\t\tbackground-color: var(--color-background-dark);\n\t\tborder-radius: var(--border-radius);\n\t\tpadding: 1em 1.3em;\n\t\tmargin-bottom: 1em;\n\t}\n\n\tp code {\n\t\tbackground-color: var(--color-background-dark);\n\t\tborder-radius: var(--border-radius);\n\t\tpadding: .1em .3em;\n\t}\n\n\tli {\n\t\tposition: relative;\n\t\tpadding-left: 3px;\n\n\t\tp {\n\t\t\tmargin-bottom: 0.5em;\n\t\t}\n\t}\n\n\tul, ol {\n\t\tpadding-left: 10px;\n\t\tmargin-left: 10px;\n\t\tmargin-bottom: 1em;\n\t}\n\n\tul li {\n\t\tlist-style-type: disc;\n\t}\n\n\t// Second-level list entries\n\tul > li > ul > li {\n\t\tlist-style-type: circle;\n\t}\n\n\t// Third-level and further down list entries\n\tul > li > ul > li ul li {\n\t\tlist-style-type: square;\n\t}\n\n\tblockquote {\n\t\tpadding-left: 1em;\n\t\tborder-left: 4px solid var(--color-primary-element);\n\t\tcolor: var(--color-text-maxcontrast);\n\t\tmargin-left: 0;\n\t\tmargin-right: 0;\n\t}\n\n}\n\n.ProseMirror-focused .ProseMirror-gapcursor {\n\tdisplay: block;\n}\n\n.editor__content p.is-empty:first-child::before {\n\tcontent: attr(data-empty-text);\n\tfloat: left;\n\tcolor: var(--color-text-maxcontrast);\n\tpointer-events: none;\n\theight: 0;\n}\n","#read-only-editor {\n  /* Document rendering styles */\n  overflow: scroll;\n}\n#read-only-editor div.ProseMirror {\n  margin-top: 44px;\n  height: 100%;\n  position: relative;\n  word-wrap: break-word;\n  white-space: pre-wrap;\n  -webkit-font-variant-ligatures: none;\n  font-variant-ligatures: none;\n  padding: 4px 8px 200px 14px;\n  line-height: 150%;\n  font-size: 14px;\n  outline: none;\n}\n#read-only-editor div.ProseMirror[contenteditable=true], #read-only-editor div.ProseMirror[contenteditable=false],\n#read-only-editor div.ProseMirror [contenteditable=true],\n#read-only-editor div.ProseMirror [contenteditable=false] {\n  border: none !important;\n  width: 100%;\n  background-color: transparent;\n  color: var(--color-main-text);\n  opacity: 1;\n  -webkit-user-select: text;\n  user-select: text;\n  font-size: 14px;\n}\n#read-only-editor div.ProseMirror .checkbox-item {\n  display: flex;\n  align-items: start;\n  margin-left: -23px;\n}\n#read-only-editor div.ProseMirror .checkbox-item input[type=checkbox] {\n  display: none;\n}\n#read-only-editor div.ProseMirror .checkbox-item:before {\n  content: \"\";\n  vertical-align: middle;\n  margin: 3px 6px 3px 2px;\n  border: 1px solid var(--color-text-maxcontrast);\n  position: relative;\n  display: block;\n  border-radius: var(--border-radius);\n  height: 14px;\n  width: 14px;\n  box-shadow: none !important;\n  background-position: center;\n  cursor: pointer;\n}\n#read-only-editor div.ProseMirror .checkbox-item.checked:before {\n  background-image: url(\"../../img/checkbox-mark.svg\");\n  background-color: var(--color-primary-element);\n  border-color: var(--color-primary-element);\n}\n#read-only-editor div.ProseMirror .checkbox-item label {\n  display: block;\n  flex-grow: 1;\n  max-width: calc(100% - 28px);\n}\n#read-only-editor div.ProseMirror > *:first-child {\n  margin-top: 10px;\n}\n#read-only-editor div.ProseMirror a {\n  color: var(--color-primary-element);\n  text-decoration: underline;\n  padding: 0.5em 0;\n}\n#read-only-editor div.ProseMirror p {\n  margin-bottom: 1em;\n  line-height: 150%;\n}\n#read-only-editor div.ProseMirror em {\n  font-style: italic;\n}\n#read-only-editor div.ProseMirror h1,\n#read-only-editor div.ProseMirror h2,\n#read-only-editor div.ProseMirror h3,\n#read-only-editor div.ProseMirror h4,\n#read-only-editor div.ProseMirror h5,\n#read-only-editor div.ProseMirror h6 {\n  font-weight: 600;\n  line-height: 120%;\n  margin-top: 24px;\n  margin-bottom: 12px;\n  color: var(--color-main-text);\n}\n#read-only-editor div.ProseMirror h1 {\n  font-size: 36px;\n  margin-top: 48px;\n}\n#read-only-editor div.ProseMirror h2 {\n  font-size: 30px;\n  margin-top: 48px;\n}\n#read-only-editor div.ProseMirror h3 {\n  font-size: 24px;\n}\n#read-only-editor div.ProseMirror h4 {\n  font-size: 21px;\n}\n#read-only-editor div.ProseMirror h5 {\n  font-size: 17px;\n}\n#read-only-editor div.ProseMirror h6 {\n  font-size: 14px;\n}\n#read-only-editor div.ProseMirror img {\n  cursor: default;\n  max-width: 100%;\n}\n#read-only-editor div.ProseMirror hr {\n  padding: 2px 0;\n  border: none;\n  margin: 3em 0;\n  width: 100%;\n}\n#read-only-editor div.ProseMirror hr:after {\n  content: \"\";\n  display: block;\n  height: 1px;\n  background-color: var(--color-border-dark);\n  line-height: 2px;\n}\n#read-only-editor div.ProseMirror pre {\n  white-space: pre;\n  overflow-x: auto;\n  background-color: var(--color-background-dark);\n  border-radius: var(--border-radius);\n  padding: 1em 1.3em;\n  margin-bottom: 1em;\n}\n#read-only-editor div.ProseMirror p code {\n  background-color: var(--color-background-dark);\n  border-radius: var(--border-radius);\n  padding: 0.1em 0.3em;\n}\n#read-only-editor div.ProseMirror li {\n  position: relative;\n  padding-left: 3px;\n}\n#read-only-editor div.ProseMirror li p {\n  margin-bottom: 0.5em;\n}\n#read-only-editor div.ProseMirror ul, #read-only-editor div.ProseMirror ol {\n  padding-left: 10px;\n  margin-left: 10px;\n  margin-bottom: 1em;\n}\n#read-only-editor div.ProseMirror ul li {\n  list-style-type: disc;\n}\n#read-only-editor div.ProseMirror ul > li > ul > li {\n  list-style-type: circle;\n}\n#read-only-editor div.ProseMirror ul > li > ul > li ul li {\n  list-style-type: square;\n}\n#read-only-editor div.ProseMirror blockquote {\n  padding-left: 1em;\n  border-left: 4px solid var(--color-primary-element);\n  color: var(--color-text-maxcontrast);\n  margin-left: 0;\n  margin-right: 0;\n}\n#read-only-editor .ProseMirror-focused .ProseMirror-gapcursor {\n  display: block;\n}\n#read-only-editor .editor__content p.is-empty:first-child::before {\n  content: attr(data-empty-text);\n  float: left;\n  color: var(--color-text-maxcontrast);\n  pointer-events: none;\n  height: 0;\n}\n\n.thumbnailContainer #read-only-editor {\n  width: 100%;\n}\n.thumbnailContainer #read-only-editor .ProseMirror {\n  height: auto;\n  margin: 0 0 0 0;\n  padding: 0;\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/components/ReadOnlyEditor.vue?vue&type=style&index=1&lang=scss&":
/*!*********************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/components/ReadOnlyEditor.vue?vue&type=style&index=1&lang=scss& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ "./node_modules/css-loader/dist/runtime/cssWithMappingToString.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _img_checkbox_mark_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../img/checkbox-mark.svg */ "./img/checkbox-mark.svg");
// Imports




var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default.a);
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_img_checkbox_mark_svg__WEBPACK_IMPORTED_MODULE_3__["default"]);
// Module
___CSS_LOADER_EXPORT___.push([module.i, "/* Document rendering styles */\ndiv.ProseMirror {\n  margin-top: 44px;\n  height: 100%;\n  position: relative;\n  word-wrap: break-word;\n  white-space: pre-wrap;\n  -webkit-font-variant-ligatures: none;\n  font-variant-ligatures: none;\n  padding: 4px 8px 200px 14px;\n  line-height: 150%;\n  font-size: 14px;\n  outline: none;\n}\ndiv.ProseMirror[contenteditable=true], div.ProseMirror[contenteditable=false],\ndiv.ProseMirror [contenteditable=true],\ndiv.ProseMirror [contenteditable=false] {\n  border: none !important;\n  width: 100%;\n  background-color: transparent;\n  color: var(--color-main-text);\n  opacity: 1;\n  -webkit-user-select: text;\n  user-select: text;\n  font-size: 14px;\n}\ndiv.ProseMirror .checkbox-item {\n  display: flex;\n  align-items: start;\n  margin-left: -23px;\n}\ndiv.ProseMirror .checkbox-item input[type=checkbox] {\n  display: none;\n}\ndiv.ProseMirror .checkbox-item:before {\n  content: \"\";\n  vertical-align: middle;\n  margin: 3px 6px 3px 2px;\n  border: 1px solid var(--color-text-maxcontrast);\n  position: relative;\n  display: block;\n  border-radius: var(--border-radius);\n  height: 14px;\n  width: 14px;\n  box-shadow: none !important;\n  background-position: center;\n  cursor: pointer;\n}\ndiv.ProseMirror .checkbox-item.checked:before {\n  background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\n  background-color: var(--color-primary-element);\n  border-color: var(--color-primary-element);\n}\ndiv.ProseMirror .checkbox-item label {\n  display: block;\n  flex-grow: 1;\n  max-width: calc(100% - 28px);\n}\ndiv.ProseMirror > *:first-child {\n  margin-top: 10px;\n}\ndiv.ProseMirror a {\n  color: var(--color-primary-element);\n  text-decoration: underline;\n  padding: 0.5em 0;\n}\ndiv.ProseMirror p {\n  margin-bottom: 1em;\n  line-height: 150%;\n}\ndiv.ProseMirror em {\n  font-style: italic;\n}\ndiv.ProseMirror h1,\ndiv.ProseMirror h2,\ndiv.ProseMirror h3,\ndiv.ProseMirror h4,\ndiv.ProseMirror h5,\ndiv.ProseMirror h6 {\n  font-weight: 600;\n  line-height: 120%;\n  margin-top: 24px;\n  margin-bottom: 12px;\n  color: var(--color-main-text);\n}\ndiv.ProseMirror h1 {\n  font-size: 36px;\n  margin-top: 48px;\n}\ndiv.ProseMirror h2 {\n  font-size: 30px;\n  margin-top: 48px;\n}\ndiv.ProseMirror h3 {\n  font-size: 24px;\n}\ndiv.ProseMirror h4 {\n  font-size: 21px;\n}\ndiv.ProseMirror h5 {\n  font-size: 17px;\n}\ndiv.ProseMirror h6 {\n  font-size: 14px;\n}\ndiv.ProseMirror img {\n  cursor: default;\n  max-width: 100%;\n}\ndiv.ProseMirror hr {\n  padding: 2px 0;\n  border: none;\n  margin: 3em 0;\n  width: 100%;\n}\ndiv.ProseMirror hr:after {\n  content: \"\";\n  display: block;\n  height: 1px;\n  background-color: var(--color-border-dark);\n  line-height: 2px;\n}\ndiv.ProseMirror pre {\n  white-space: pre;\n  overflow-x: auto;\n  background-color: var(--color-background-dark);\n  border-radius: var(--border-radius);\n  padding: 1em 1.3em;\n  margin-bottom: 1em;\n}\ndiv.ProseMirror p code {\n  background-color: var(--color-background-dark);\n  border-radius: var(--border-radius);\n  padding: 0.1em 0.3em;\n}\ndiv.ProseMirror li {\n  position: relative;\n  padding-left: 3px;\n}\ndiv.ProseMirror li p {\n  margin-bottom: 0.5em;\n}\ndiv.ProseMirror ul, div.ProseMirror ol {\n  padding-left: 10px;\n  margin-left: 10px;\n  margin-bottom: 1em;\n}\ndiv.ProseMirror ul li {\n  list-style-type: disc;\n}\ndiv.ProseMirror ul > li > ul > li {\n  list-style-type: circle;\n}\ndiv.ProseMirror ul > li > ul > li ul li {\n  list-style-type: square;\n}\ndiv.ProseMirror blockquote {\n  padding-left: 1em;\n  border-left: 4px solid var(--color-primary-element);\n  color: var(--color-text-maxcontrast);\n  margin-left: 0;\n  margin-right: 0;\n}\n.ProseMirror-focused .ProseMirror-gapcursor {\n  display: block;\n}\n.editor__content p.is-empty:first-child::before {\n  content: attr(data-empty-text);\n  float: left;\n  color: var(--color-text-maxcontrast);\n  pointer-events: none;\n  height: 0;\n}", "",{"version":3,"sources":["webpack://./css/prosemirror.scss","webpack://./ReadOnlyEditor.vue"],"names":[],"mappings":"AAAA,8BAAA;AACA;EACC,gBAAA;EACA,YAAA;EACA,kBAAA;EACA,qBAAA;EACA,qBAAA;EACA,oCAAA;EACA,4BAAA;EACA,2BAAA;EACA,iBAAA;EACA,eAAA;EACA,aAAA;ACCD;ADCC;;;EAIC,uBAAA;EACA,WAAA;EACA,6BAAA;EACA,6BAAA;EACA,UAAA;EACA,yBAAA;EACA,iBAAA;EACA,eAAA;ACAF;ADGC;EACC,aAAA;EACA,kBAAA;EAEA,kBAAA;ACFF;ADIE;EACC,aAAA;ACFH;ADIE;EACC,WAAA;EACA,sBAAA;EACA,uBAAA;EACA,+CAAA;EACA,kBAAA;EACA,cAAA;EACA,mCAAA;EACA,YAAA;EACA,WAAA;EACA,2BAAA;EACA,2BAAA;EACA,eAAA;ACFH;ADIE;EACC,yDAAA;EACA,8CAAA;EACA,0CAAA;ACFH;ADIE;EACC,cAAA;EACA,YAAA;EACA,4BAAA;ACFH;ADMC;EACC,gBAAA;ACJF;ADOC;EACC,mCAAA;EACA,0BAAA;EACA,gBAAA;ACLF;ADQC;EACC,kBAAA;EACA,iBAAA;ACNF;ADSC;EACC,kBAAA;ACPF;ADUC;;;;;;EAMC,gBAAA;EACA,iBAAA;EACA,gBAAA;EACA,mBAAA;EACA,6BAAA;ACRF;ADWC;EACC,eAAA;EACA,gBAAA;ACTF;ADYC;EACC,eAAA;EACA,gBAAA;ACVF;ADaC;EACC,eAAA;ACXF;ADcC;EACC,eAAA;ACZF;ADeC;EACC,eAAA;ACbF;ADgBC;EACC,eAAA;ACdF;ADiBC;EACC,eAAA;EACA,eAAA;ACfF;ADkBC;EACC,cAAA;EACA,YAAA;EACA,aAAA;EACA,WAAA;AChBF;ADmBC;EACC,WAAA;EACA,cAAA;EACA,WAAA;EACA,0CAAA;EACA,gBAAA;ACjBF;ADoBC;EACC,gBAAA;EACA,gBAAA;EACA,8CAAA;EACA,mCAAA;EACA,kBAAA;EACA,kBAAA;AClBF;ADqBC;EACC,8CAAA;EACA,mCAAA;EACA,oBAAA;ACnBF;ADsBC;EACC,kBAAA;EACA,iBAAA;ACpBF;ADsBE;EACC,oBAAA;ACpBH;ADwBC;EACC,kBAAA;EACA,iBAAA;EACA,kBAAA;ACtBF;ADyBC;EACC,qBAAA;ACvBF;AD2BC;EACC,uBAAA;ACzBF;AD6BC;EACC,uBAAA;AC3BF;AD8BC;EACC,iBAAA;EACA,mDAAA;EACA,oCAAA;EACA,cAAA;EACA,eAAA;AC5BF;ADiCA;EACC,cAAA;AC9BD;ADiCA;EACC,8BAAA;EACA,WAAA;EACA,oCAAA;EACA,oBAAA;EACA,SAAA;AC9BD","sourcesContent":["/* Document rendering styles */\ndiv.ProseMirror {\n\tmargin-top: 44px;\n\theight: 100%;\n\tposition: relative;\n\tword-wrap: break-word;\n\twhite-space: pre-wrap;\n\t-webkit-font-variant-ligatures: none;\n\tfont-variant-ligatures: none;\n\tpadding: 4px 8px 200px 14px;\n\tline-height: 150%;\n\tfont-size: 14px;\n\toutline: none;\n\n\t&[contenteditable=true],\n\t&[contenteditable=false],\n\t[contenteditable=true],\n\t[contenteditable=false] {\n\t\tborder: none !important;\n\t\twidth: 100%;\n\t\tbackground-color: transparent;\n\t\tcolor: var(--color-main-text);\n\t\topacity: 1;\n\t\t-webkit-user-select: text;\n\t\tuser-select: text;\n\t\tfont-size: 14px;\n\t}\n\n\t.checkbox-item {\n\t\tdisplay: flex;\n\t\talign-items: start;\n\t\t// Left-align with list item text\n\t\tmargin-left: -23px;\n\n\t\tinput[type=checkbox] {\n\t\t\tdisplay: none;\n\t\t}\n\t\t&:before {\n\t\t\tcontent: '';\n\t\t\tvertical-align: middle;\n\t\t\tmargin: 3px 6px 3px 2px;\n\t\t\tborder: 1px solid var(--color-text-maxcontrast);\n\t\t\tposition: relative;\n\t\t\tdisplay: block;\n\t\t\tborder-radius: var(--border-radius);\n\t\t\theight: 14px;\n\t\t\twidth: 14px;\n\t\t\tbox-shadow: none !important;\n\t\t\tbackground-position: center;\n\t\t\tcursor: pointer;\n\t\t}\n\t\t&.checked:before {\n\t\t\tbackground-image: url('../../img/checkbox-mark.svg');\n\t\t\tbackground-color: var(--color-primary-element);\n\t\t\tborder-color: var(--color-primary-element);\n\t\t}\n\t\tlabel {\n\t\t\tdisplay: block;\n\t\t\tflex-grow: 1;\n\t\t\tmax-width: calc(100% - 28px);\n\t\t}\n\t}\n\n\t> *:first-child {\n\t\tmargin-top: 10px;\n\t}\n\n\ta {\n\t\tcolor: var(--color-primary-element);\n\t\ttext-decoration: underline;\n\t\tpadding: .5em 0;\n\t}\n\n\tp {\n\t\tmargin-bottom: 1em;\n\t\tline-height: 150%;\n\t}\n\n\tem {\n\t\tfont-style: italic;\n\t}\n\n\th1,\n\th2,\n\th3,\n\th4,\n\th5,\n\th6 {\n\t\tfont-weight: 600;\n\t\tline-height: 120%;\n\t\tmargin-top: 24px;\n\t\tmargin-bottom: 12px;\n\t\tcolor: var(--color-main-text);\n\t}\n\n\th1 {\n\t\tfont-size: 36px;\n\t\tmargin-top: 48px;\n\t}\n\n\th2 {\n\t\tfont-size: 30px;\n\t\tmargin-top: 48px;\n\t}\n\n\th3 {\n\t\tfont-size: 24px;\n\t}\n\n\th4 {\n\t\tfont-size: 21px;\n\t}\n\n\th5 {\n\t\tfont-size: 17px;\n\t}\n\n\th6 {\n\t\tfont-size: 14px;\n\t}\n\n\timg {\n\t\tcursor: default;\n\t\tmax-width: 100%;\n\t}\n\n\thr {\n\t\tpadding: 2px 0;\n\t\tborder: none;\n\t\tmargin: 3em 0;\n\t\twidth: 100%;\n\t}\n\n\thr:after {\n\t\tcontent: \"\";\n\t\tdisplay: block;\n\t\theight: 1px;\n\t\tbackground-color: var(--color-border-dark);\n\t\tline-height: 2px;\n\t}\n\n\tpre {\n\t\twhite-space: pre;\n\t\toverflow-x: auto;\n\t\tbackground-color: var(--color-background-dark);\n\t\tborder-radius: var(--border-radius);\n\t\tpadding: 1em 1.3em;\n\t\tmargin-bottom: 1em;\n\t}\n\n\tp code {\n\t\tbackground-color: var(--color-background-dark);\n\t\tborder-radius: var(--border-radius);\n\t\tpadding: .1em .3em;\n\t}\n\n\tli {\n\t\tposition: relative;\n\t\tpadding-left: 3px;\n\n\t\tp {\n\t\t\tmargin-bottom: 0.5em;\n\t\t}\n\t}\n\n\tul, ol {\n\t\tpadding-left: 10px;\n\t\tmargin-left: 10px;\n\t\tmargin-bottom: 1em;\n\t}\n\n\tul li {\n\t\tlist-style-type: disc;\n\t}\n\n\t// Second-level list entries\n\tul > li > ul > li {\n\t\tlist-style-type: circle;\n\t}\n\n\t// Third-level and further down list entries\n\tul > li > ul > li ul li {\n\t\tlist-style-type: square;\n\t}\n\n\tblockquote {\n\t\tpadding-left: 1em;\n\t\tborder-left: 4px solid var(--color-primary-element);\n\t\tcolor: var(--color-text-maxcontrast);\n\t\tmargin-left: 0;\n\t\tmargin-right: 0;\n\t}\n\n}\n\n.ProseMirror-focused .ProseMirror-gapcursor {\n\tdisplay: block;\n}\n\n.editor__content p.is-empty:first-child::before {\n\tcontent: attr(data-empty-text);\n\tfloat: left;\n\tcolor: var(--color-text-maxcontrast);\n\tpointer-events: none;\n\theight: 0;\n}\n","/* Document rendering styles */\ndiv.ProseMirror {\n  margin-top: 44px;\n  height: 100%;\n  position: relative;\n  word-wrap: break-word;\n  white-space: pre-wrap;\n  -webkit-font-variant-ligatures: none;\n  font-variant-ligatures: none;\n  padding: 4px 8px 200px 14px;\n  line-height: 150%;\n  font-size: 14px;\n  outline: none;\n}\ndiv.ProseMirror[contenteditable=true], div.ProseMirror[contenteditable=false],\ndiv.ProseMirror [contenteditable=true],\ndiv.ProseMirror [contenteditable=false] {\n  border: none !important;\n  width: 100%;\n  background-color: transparent;\n  color: var(--color-main-text);\n  opacity: 1;\n  -webkit-user-select: text;\n  user-select: text;\n  font-size: 14px;\n}\ndiv.ProseMirror .checkbox-item {\n  display: flex;\n  align-items: start;\n  margin-left: -23px;\n}\ndiv.ProseMirror .checkbox-item input[type=checkbox] {\n  display: none;\n}\ndiv.ProseMirror .checkbox-item:before {\n  content: \"\";\n  vertical-align: middle;\n  margin: 3px 6px 3px 2px;\n  border: 1px solid var(--color-text-maxcontrast);\n  position: relative;\n  display: block;\n  border-radius: var(--border-radius);\n  height: 14px;\n  width: 14px;\n  box-shadow: none !important;\n  background-position: center;\n  cursor: pointer;\n}\ndiv.ProseMirror .checkbox-item.checked:before {\n  background-image: url(\"../../img/checkbox-mark.svg\");\n  background-color: var(--color-primary-element);\n  border-color: var(--color-primary-element);\n}\ndiv.ProseMirror .checkbox-item label {\n  display: block;\n  flex-grow: 1;\n  max-width: calc(100% - 28px);\n}\ndiv.ProseMirror > *:first-child {\n  margin-top: 10px;\n}\ndiv.ProseMirror a {\n  color: var(--color-primary-element);\n  text-decoration: underline;\n  padding: 0.5em 0;\n}\ndiv.ProseMirror p {\n  margin-bottom: 1em;\n  line-height: 150%;\n}\ndiv.ProseMirror em {\n  font-style: italic;\n}\ndiv.ProseMirror h1,\ndiv.ProseMirror h2,\ndiv.ProseMirror h3,\ndiv.ProseMirror h4,\ndiv.ProseMirror h5,\ndiv.ProseMirror h6 {\n  font-weight: 600;\n  line-height: 120%;\n  margin-top: 24px;\n  margin-bottom: 12px;\n  color: var(--color-main-text);\n}\ndiv.ProseMirror h1 {\n  font-size: 36px;\n  margin-top: 48px;\n}\ndiv.ProseMirror h2 {\n  font-size: 30px;\n  margin-top: 48px;\n}\ndiv.ProseMirror h3 {\n  font-size: 24px;\n}\ndiv.ProseMirror h4 {\n  font-size: 21px;\n}\ndiv.ProseMirror h5 {\n  font-size: 17px;\n}\ndiv.ProseMirror h6 {\n  font-size: 14px;\n}\ndiv.ProseMirror img {\n  cursor: default;\n  max-width: 100%;\n}\ndiv.ProseMirror hr {\n  padding: 2px 0;\n  border: none;\n  margin: 3em 0;\n  width: 100%;\n}\ndiv.ProseMirror hr:after {\n  content: \"\";\n  display: block;\n  height: 1px;\n  background-color: var(--color-border-dark);\n  line-height: 2px;\n}\ndiv.ProseMirror pre {\n  white-space: pre;\n  overflow-x: auto;\n  background-color: var(--color-background-dark);\n  border-radius: var(--border-radius);\n  padding: 1em 1.3em;\n  margin-bottom: 1em;\n}\ndiv.ProseMirror p code {\n  background-color: var(--color-background-dark);\n  border-radius: var(--border-radius);\n  padding: 0.1em 0.3em;\n}\ndiv.ProseMirror li {\n  position: relative;\n  padding-left: 3px;\n}\ndiv.ProseMirror li p {\n  margin-bottom: 0.5em;\n}\ndiv.ProseMirror ul, div.ProseMirror ol {\n  padding-left: 10px;\n  margin-left: 10px;\n  margin-bottom: 1em;\n}\ndiv.ProseMirror ul li {\n  list-style-type: disc;\n}\ndiv.ProseMirror ul > li > ul > li {\n  list-style-type: circle;\n}\ndiv.ProseMirror ul > li > ul > li ul li {\n  list-style-type: square;\n}\ndiv.ProseMirror blockquote {\n  padding-left: 1em;\n  border-left: 4px solid var(--color-primary-element);\n  color: var(--color-text-maxcontrast);\n  margin-left: 0;\n  margin-right: 0;\n}\n\n.ProseMirror-focused .ProseMirror-gapcursor {\n  display: block;\n}\n\n.editor__content p.is-empty:first-child::before {\n  content: attr(data-empty-text);\n  float: left;\n  color: var(--color-text-maxcontrast);\n  pointer-events: none;\n  height: 0;\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/nodes/ImageView.vue?vue&type=style&index=0&id=336b1e4e&scoped=true&lang=scss&":
/*!***********************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/nodes/ImageView.vue?vue&type=style&index=0&id=336b1e4e&scoped=true&lang=scss& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.i, ".image[data-v-336b1e4e] {\n  margin: 0;\n  padding: 0;\n}\n.image__caption[data-v-336b1e4e] {\n  text-align: center;\n  color: var(--color-text-lighter);\n}\n.image__caption input[type=text][data-v-336b1e4e] {\n  width: 100%;\n  border: none;\n  text-align: center;\n}\n.icon-image[data-v-336b1e4e] {\n  margin-top: 10px;\n  height: 32px;\n  padding: 20px;\n  background-size: contain;\n}\n.image__loading[data-v-336b1e4e] {\n  height: 100px;\n}\n.image__view[data-v-336b1e4e] {\n  text-align: center;\n}\n.image__view .image__main[data-v-336b1e4e] {\n  max-height: 40vh;\n}\n.image__placeholder a[data-v-336b1e4e] {\n  display: flex;\n}\n.image__placeholder .image__main[data-v-336b1e4e] {\n  background-color: var(--color-background-dark);\n  text-align: center;\n  padding: 5px;\n  border-radius: var(--border-radius);\n}\n.image__placeholder .image__main .icon-image[data-v-336b1e4e] {\n  margin: 0;\n}\n.image__placeholder .image__main p[data-v-336b1e4e] {\n  padding: 10px;\n}\n.fade-enter-active[data-v-336b1e4e] {\n  transition: opacity 0.3s ease-in-out;\n}\n.fade-enter-to[data-v-336b1e4e] {\n  opacity: 1;\n}\n.fade-enter[data-v-336b1e4e] {\n  opacity: 0;\n}", "",{"version":3,"sources":["webpack://./src/nodes/ImageView.vue","webpack://./ImageView.vue"],"names":[],"mappings":"AAoMA;EACC,SAAA;EACA,UAAA;ACnMD;ADsMA;EACC,kBAAA;EACA,gCAAA;ACnMD;ADoMC;EACC,WAAA;EACA,YAAA;EACA,kBAAA;AClMF;ADsMA;EACC,gBAAA;EACA,YAAA;EACA,aAAA;EACA,wBAAA;ACnMD;ADsMA;EACC,aAAA;ACnMD;ADsMA;EACC,kBAAA;ACnMD;ADqMC;EACC,gBAAA;ACnMF;ADwMC;EACC,aAAA;ACrMF;ADuMC;EACC,8CAAA;EACA,kBAAA;EACA,YAAA;EACA,mCAAA;ACrMF;ADuME;EACC,SAAA;ACrMH;ADwME;EACC,aAAA;ACtMH;AD2MA;EACC,oCAAA;ACxMD;AD2MA;EACC,UAAA;ACxMD;AD2MA;EACC,UAAA;ACxMD","sourcesContent":["\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.image {\n\tmargin: 0;\n\tpadding: 0;\n}\n\n.image__caption {\n\ttext-align: center;\n\tcolor: var(--color-text-lighter);\n\tinput[type='text'] {\n\t\twidth: 100%;\n\t\tborder: none;\n\t\ttext-align: center;\n\t}\n}\n\n.icon-image {\n\tmargin-top: 10px;\n\theight: 32px;\n\tpadding: 20px;\n\tbackground-size: contain;\n}\n\n.image__loading {\n\theight: 100px;\n}\n\n.image__view {\n\ttext-align: center;\n\n\t.image__main {\n\t\tmax-height: 40vh;\n\t}\n}\n\n.image__placeholder {\n\ta {\n\t\tdisplay: flex;\n\t}\n\t.image__main {\n\t\tbackground-color: var(--color-background-dark);\n\t\ttext-align: center;\n\t\tpadding: 5px;\n\t\tborder-radius: var(--border-radius);\n\n\t\t.icon-image {\n\t\t\tmargin: 0;\n\t\t}\n\n\t\tp {\n\t\t\tpadding: 10px;\n\t\t}\n\t}\n}\n\n.fade-enter-active {\n\ttransition: opacity .3s ease-in-out;\n}\n\n.fade-enter-to {\n\topacity: 1;\n}\n\n.fade-enter {\n\topacity: 0;\n}\n",".image {\n  margin: 0;\n  padding: 0;\n}\n\n.image__caption {\n  text-align: center;\n  color: var(--color-text-lighter);\n}\n.image__caption input[type=text] {\n  width: 100%;\n  border: none;\n  text-align: center;\n}\n\n.icon-image {\n  margin-top: 10px;\n  height: 32px;\n  padding: 20px;\n  background-size: contain;\n}\n\n.image__loading {\n  height: 100px;\n}\n\n.image__view {\n  text-align: center;\n}\n.image__view .image__main {\n  max-height: 40vh;\n}\n\n.image__placeholder a {\n  display: flex;\n}\n.image__placeholder .image__main {\n  background-color: var(--color-background-dark);\n  text-align: center;\n  padding: 5px;\n  border-radius: var(--border-radius);\n}\n.image__placeholder .image__main .icon-image {\n  margin: 0;\n}\n.image__placeholder .image__main p {\n  padding: 10px;\n}\n\n.fade-enter-active {\n  transition: opacity 0.3s ease-in-out;\n}\n\n.fade-enter-to {\n  opacity: 1;\n}\n\n.fade-enter {\n  opacity: 0;\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/views/DirectEditing.vue?vue&type=style&index=0&id=37e36225&scoped=true&lang=scss&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/views/DirectEditing.vue?vue&type=style&index=0&id=37e36225&scoped=true&lang=scss& ***!
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
___CSS_LOADER_EXPORT___.push([module.i, "body[data-v-37e36225] {\n  position: fixed;\n}\n#direct-editor[data-v-37e36225] {\n  width: 100%;\n  height: 100%;\n  position: fixed;\n  overflow: hidden;\n}\n#direct-editor[data-v-37e36225] #editor-container {\n  height: 100%;\n  top: 0;\n}\n#direct-editor[data-v-37e36225] #editor-wrapper div.ProseMirror {\n  margin-top: 0;\n}\npre[data-v-37e36225] {\n  width: 100%;\n  max-width: 700px;\n  margin: auto;\n  background-color: var(--color-background-dark);\n}\nbutton[data-v-37e36225] {\n  width: 44px;\n  height: 44px;\n  margin: 0;\n  background-size: 16px;\n  border: 0;\n  background-color: transparent;\n  opacity: 0.5;\n  color: var(--color-main-text);\n  background-position: center center;\n  vertical-align: top;\n}\nbutton[data-v-37e36225]:hover, button[data-v-37e36225]:focus, button[data-v-37e36225]:active {\n  background-color: var(--color-background-dark);\n}\nbutton.is-active[data-v-37e36225], button[data-v-37e36225]:hover, button[data-v-37e36225]:focus {\n  opacity: 1;\n}\nbutton.icon-undo[data-v-37e36225], button.icon-redo[data-v-37e36225] {\n  opacity: 0.4;\n}", "",{"version":3,"sources":["webpack://./src/views/DirectEditing.vue","webpack://./DirectEditing.vue"],"names":[],"mappings":"AAgIA;EACC,eAAA;AC/HD;ADkIA;EACC,WAAA;EACA,YAAA;EACA,eAAA;EACA,gBAAA;AC/HD;ADiIC;EACC,YAAA;EACA,MAAA;AC/HF;ADiIC;EACC,aAAA;AC/HF;ADmIA;EACC,WAAA;EACA,gBAAA;EACA,YAAA;EACA,8CAAA;AChID;ADmIA;EACC,WAAA;EACA,YAAA;EACA,SAAA;EACA,qBAAA;EACA,SAAA;EACA,6BAAA;EACA,YAAA;EACA,6BAAA;EACA,kCAAA;EACA,mBAAA;AChID;ADiIC;EACC,8CAAA;AC/HF;ADiIC;EAGC,UAAA;ACjIF;ADoIC;EACC,YAAA;AClIF","sourcesContent":["\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nbody {\n\tposition: fixed;\n}\n\n#direct-editor {\n\twidth: 100%;\n\theight: 100%;\n\tposition: fixed;\n\toverflow: hidden;\n\n\t&::v-deep #editor-container {\n\t\theight: 100%;\n\t\ttop: 0;\n\t}\n\t&::v-deep #editor-wrapper div.ProseMirror {\n\t\tmargin-top: 0;\n\t}\n}\n\npre {\n\twidth: 100%;\n\tmax-width: 700px;\n\tmargin: auto;\n\tbackground-color: var(--color-background-dark);\n}\n\nbutton {\n\twidth: 44px;\n\theight: 44px;\n\tmargin: 0;\n\tbackground-size: 16px;\n\tborder: 0;\n\tbackground-color: transparent;\n\topacity: .5;\n\tcolor: var(--color-main-text);\n\tbackground-position: center center;\n\tvertical-align: top;\n\t&:hover, &:focus, &:active {\n\t\tbackground-color: var(--color-background-dark);\n\t}\n\t&.is-active,\n\t&:hover,\n\t&:focus {\n\t\topacity: 1;\n\t}\n\n\t&.icon-undo, &.icon-redo {\n\t\topacity: .4;\n\t}\n}\n","body {\n  position: fixed;\n}\n\n#direct-editor {\n  width: 100%;\n  height: 100%;\n  position: fixed;\n  overflow: hidden;\n}\n#direct-editor::v-deep #editor-container {\n  height: 100%;\n  top: 0;\n}\n#direct-editor::v-deep #editor-wrapper div.ProseMirror {\n  margin-top: 0;\n}\n\npre {\n  width: 100%;\n  max-width: 700px;\n  margin: auto;\n  background-color: var(--color-background-dark);\n}\n\nbutton {\n  width: 44px;\n  height: 44px;\n  margin: 0;\n  background-size: 16px;\n  border: 0;\n  background-color: transparent;\n  opacity: 0.5;\n  color: var(--color-main-text);\n  background-position: center center;\n  vertical-align: top;\n}\nbutton:hover, button:focus, button:active {\n  background-color: var(--color-background-dark);\n}\nbutton.is-active, button:hover, button:focus {\n  opacity: 1;\n}\nbutton.icon-undo, button.icon-redo {\n  opacity: 0.4;\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/highlight.js/lib/languages lazy recursive ^\\.\\/.*$":
/*!********************************************************************************!*\
  !*** ./node_modules/highlight.js/lib/languages lazy ^\.\/.*$ namespace object ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./1c": [
		"./node_modules/highlight.js/lib/languages/1c.js",
		"highlight/1c"
	],
	"./1c.js": [
		"./node_modules/highlight.js/lib/languages/1c.js",
		"highlight/1c"
	],
	"./abnf": [
		"./node_modules/highlight.js/lib/languages/abnf.js",
		"highlight/abnf"
	],
	"./abnf.js": [
		"./node_modules/highlight.js/lib/languages/abnf.js",
		"highlight/abnf"
	],
	"./accesslog": [
		"./node_modules/highlight.js/lib/languages/accesslog.js",
		"highlight/accesslog"
	],
	"./accesslog.js": [
		"./node_modules/highlight.js/lib/languages/accesslog.js",
		"highlight/accesslog"
	],
	"./actionscript": [
		"./node_modules/highlight.js/lib/languages/actionscript.js",
		"highlight/actionscript"
	],
	"./actionscript.js": [
		"./node_modules/highlight.js/lib/languages/actionscript.js",
		"highlight/actionscript"
	],
	"./ada": [
		"./node_modules/highlight.js/lib/languages/ada.js",
		"highlight/ada"
	],
	"./ada.js": [
		"./node_modules/highlight.js/lib/languages/ada.js",
		"highlight/ada"
	],
	"./angelscript": [
		"./node_modules/highlight.js/lib/languages/angelscript.js",
		"highlight/angelscript"
	],
	"./angelscript.js": [
		"./node_modules/highlight.js/lib/languages/angelscript.js",
		"highlight/angelscript"
	],
	"./apache": [
		"./node_modules/highlight.js/lib/languages/apache.js",
		"highlight/apache"
	],
	"./apache.js": [
		"./node_modules/highlight.js/lib/languages/apache.js",
		"highlight/apache"
	],
	"./applescript": [
		"./node_modules/highlight.js/lib/languages/applescript.js",
		"highlight/applescript"
	],
	"./applescript.js": [
		"./node_modules/highlight.js/lib/languages/applescript.js",
		"highlight/applescript"
	],
	"./arcade": [
		"./node_modules/highlight.js/lib/languages/arcade.js",
		"highlight/arcade"
	],
	"./arcade.js": [
		"./node_modules/highlight.js/lib/languages/arcade.js",
		"highlight/arcade"
	],
	"./arduino": [
		"./node_modules/highlight.js/lib/languages/arduino.js",
		"highlight/arduino"
	],
	"./arduino.js": [
		"./node_modules/highlight.js/lib/languages/arduino.js",
		"highlight/arduino"
	],
	"./armasm": [
		"./node_modules/highlight.js/lib/languages/armasm.js",
		"highlight/armasm"
	],
	"./armasm.js": [
		"./node_modules/highlight.js/lib/languages/armasm.js",
		"highlight/armasm"
	],
	"./asciidoc": [
		"./node_modules/highlight.js/lib/languages/asciidoc.js",
		"highlight/asciidoc"
	],
	"./asciidoc.js": [
		"./node_modules/highlight.js/lib/languages/asciidoc.js",
		"highlight/asciidoc"
	],
	"./aspectj": [
		"./node_modules/highlight.js/lib/languages/aspectj.js",
		"highlight/aspectj"
	],
	"./aspectj.js": [
		"./node_modules/highlight.js/lib/languages/aspectj.js",
		"highlight/aspectj"
	],
	"./autohotkey": [
		"./node_modules/highlight.js/lib/languages/autohotkey.js",
		"highlight/autohotkey"
	],
	"./autohotkey.js": [
		"./node_modules/highlight.js/lib/languages/autohotkey.js",
		"highlight/autohotkey"
	],
	"./autoit": [
		"./node_modules/highlight.js/lib/languages/autoit.js",
		"highlight/autoit"
	],
	"./autoit.js": [
		"./node_modules/highlight.js/lib/languages/autoit.js",
		"highlight/autoit"
	],
	"./avrasm": [
		"./node_modules/highlight.js/lib/languages/avrasm.js",
		"highlight/avrasm"
	],
	"./avrasm.js": [
		"./node_modules/highlight.js/lib/languages/avrasm.js",
		"highlight/avrasm"
	],
	"./awk": [
		"./node_modules/highlight.js/lib/languages/awk.js",
		"highlight/awk"
	],
	"./awk.js": [
		"./node_modules/highlight.js/lib/languages/awk.js",
		"highlight/awk"
	],
	"./axapta": [
		"./node_modules/highlight.js/lib/languages/axapta.js",
		"highlight/axapta"
	],
	"./axapta.js": [
		"./node_modules/highlight.js/lib/languages/axapta.js",
		"highlight/axapta"
	],
	"./bash": [
		"./node_modules/highlight.js/lib/languages/bash.js",
		"highlight/bash"
	],
	"./bash.js": [
		"./node_modules/highlight.js/lib/languages/bash.js",
		"highlight/bash"
	],
	"./basic": [
		"./node_modules/highlight.js/lib/languages/basic.js",
		"highlight/basic"
	],
	"./basic.js": [
		"./node_modules/highlight.js/lib/languages/basic.js",
		"highlight/basic"
	],
	"./bnf": [
		"./node_modules/highlight.js/lib/languages/bnf.js",
		"highlight/bnf"
	],
	"./bnf.js": [
		"./node_modules/highlight.js/lib/languages/bnf.js",
		"highlight/bnf"
	],
	"./brainfuck": [
		"./node_modules/highlight.js/lib/languages/brainfuck.js",
		"highlight/brainfuck"
	],
	"./brainfuck.js": [
		"./node_modules/highlight.js/lib/languages/brainfuck.js",
		"highlight/brainfuck"
	],
	"./c": [
		"./node_modules/highlight.js/lib/languages/c.js",
		"highlight/c"
	],
	"./c-like": [
		"./node_modules/highlight.js/lib/languages/c-like.js",
		"highlight/c-like"
	],
	"./c-like.js": [
		"./node_modules/highlight.js/lib/languages/c-like.js",
		"highlight/c-like"
	],
	"./c.js": [
		"./node_modules/highlight.js/lib/languages/c.js",
		"highlight/c"
	],
	"./cal": [
		"./node_modules/highlight.js/lib/languages/cal.js",
		"highlight/cal"
	],
	"./cal.js": [
		"./node_modules/highlight.js/lib/languages/cal.js",
		"highlight/cal"
	],
	"./capnproto": [
		"./node_modules/highlight.js/lib/languages/capnproto.js",
		"highlight/capnproto"
	],
	"./capnproto.js": [
		"./node_modules/highlight.js/lib/languages/capnproto.js",
		"highlight/capnproto"
	],
	"./ceylon": [
		"./node_modules/highlight.js/lib/languages/ceylon.js",
		"highlight/ceylon"
	],
	"./ceylon.js": [
		"./node_modules/highlight.js/lib/languages/ceylon.js",
		"highlight/ceylon"
	],
	"./clean": [
		"./node_modules/highlight.js/lib/languages/clean.js",
		"highlight/clean"
	],
	"./clean.js": [
		"./node_modules/highlight.js/lib/languages/clean.js",
		"highlight/clean"
	],
	"./clojure": [
		"./node_modules/highlight.js/lib/languages/clojure.js",
		"highlight/clojure"
	],
	"./clojure-repl": [
		"./node_modules/highlight.js/lib/languages/clojure-repl.js",
		"highlight/clojure-repl"
	],
	"./clojure-repl.js": [
		"./node_modules/highlight.js/lib/languages/clojure-repl.js",
		"highlight/clojure-repl"
	],
	"./clojure.js": [
		"./node_modules/highlight.js/lib/languages/clojure.js",
		"highlight/clojure"
	],
	"./cmake": [
		"./node_modules/highlight.js/lib/languages/cmake.js",
		"highlight/cmake"
	],
	"./cmake.js": [
		"./node_modules/highlight.js/lib/languages/cmake.js",
		"highlight/cmake"
	],
	"./coffeescript": [
		"./node_modules/highlight.js/lib/languages/coffeescript.js",
		"highlight/coffeescript"
	],
	"./coffeescript.js": [
		"./node_modules/highlight.js/lib/languages/coffeescript.js",
		"highlight/coffeescript"
	],
	"./coq": [
		"./node_modules/highlight.js/lib/languages/coq.js",
		"highlight/coq"
	],
	"./coq.js": [
		"./node_modules/highlight.js/lib/languages/coq.js",
		"highlight/coq"
	],
	"./cos": [
		"./node_modules/highlight.js/lib/languages/cos.js",
		"highlight/cos"
	],
	"./cos.js": [
		"./node_modules/highlight.js/lib/languages/cos.js",
		"highlight/cos"
	],
	"./cpp": [
		"./node_modules/highlight.js/lib/languages/cpp.js",
		"highlight/cpp"
	],
	"./cpp.js": [
		"./node_modules/highlight.js/lib/languages/cpp.js",
		"highlight/cpp"
	],
	"./crmsh": [
		"./node_modules/highlight.js/lib/languages/crmsh.js",
		"highlight/crmsh"
	],
	"./crmsh.js": [
		"./node_modules/highlight.js/lib/languages/crmsh.js",
		"highlight/crmsh"
	],
	"./crystal": [
		"./node_modules/highlight.js/lib/languages/crystal.js",
		"highlight/crystal"
	],
	"./crystal.js": [
		"./node_modules/highlight.js/lib/languages/crystal.js",
		"highlight/crystal"
	],
	"./csharp": [
		"./node_modules/highlight.js/lib/languages/csharp.js",
		"highlight/csharp"
	],
	"./csharp.js": [
		"./node_modules/highlight.js/lib/languages/csharp.js",
		"highlight/csharp"
	],
	"./csp": [
		"./node_modules/highlight.js/lib/languages/csp.js",
		"highlight/csp"
	],
	"./csp.js": [
		"./node_modules/highlight.js/lib/languages/csp.js",
		"highlight/csp"
	],
	"./css": [
		"./node_modules/highlight.js/lib/languages/css.js",
		"highlight/css"
	],
	"./css.js": [
		"./node_modules/highlight.js/lib/languages/css.js",
		"highlight/css"
	],
	"./d": [
		"./node_modules/highlight.js/lib/languages/d.js",
		"highlight/d"
	],
	"./d.js": [
		"./node_modules/highlight.js/lib/languages/d.js",
		"highlight/d"
	],
	"./dart": [
		"./node_modules/highlight.js/lib/languages/dart.js",
		"highlight/dart"
	],
	"./dart.js": [
		"./node_modules/highlight.js/lib/languages/dart.js",
		"highlight/dart"
	],
	"./delphi": [
		"./node_modules/highlight.js/lib/languages/delphi.js",
		"highlight/delphi"
	],
	"./delphi.js": [
		"./node_modules/highlight.js/lib/languages/delphi.js",
		"highlight/delphi"
	],
	"./diff": [
		"./node_modules/highlight.js/lib/languages/diff.js",
		"highlight/diff"
	],
	"./diff.js": [
		"./node_modules/highlight.js/lib/languages/diff.js",
		"highlight/diff"
	],
	"./django": [
		"./node_modules/highlight.js/lib/languages/django.js",
		"highlight/django"
	],
	"./django.js": [
		"./node_modules/highlight.js/lib/languages/django.js",
		"highlight/django"
	],
	"./dns": [
		"./node_modules/highlight.js/lib/languages/dns.js",
		"highlight/dns"
	],
	"./dns.js": [
		"./node_modules/highlight.js/lib/languages/dns.js",
		"highlight/dns"
	],
	"./dockerfile": [
		"./node_modules/highlight.js/lib/languages/dockerfile.js",
		"highlight/dockerfile"
	],
	"./dockerfile.js": [
		"./node_modules/highlight.js/lib/languages/dockerfile.js",
		"highlight/dockerfile"
	],
	"./dos": [
		"./node_modules/highlight.js/lib/languages/dos.js",
		"highlight/dos"
	],
	"./dos.js": [
		"./node_modules/highlight.js/lib/languages/dos.js",
		"highlight/dos"
	],
	"./dsconfig": [
		"./node_modules/highlight.js/lib/languages/dsconfig.js",
		"highlight/dsconfig"
	],
	"./dsconfig.js": [
		"./node_modules/highlight.js/lib/languages/dsconfig.js",
		"highlight/dsconfig"
	],
	"./dts": [
		"./node_modules/highlight.js/lib/languages/dts.js",
		"highlight/dts"
	],
	"./dts.js": [
		"./node_modules/highlight.js/lib/languages/dts.js",
		"highlight/dts"
	],
	"./dust": [
		"./node_modules/highlight.js/lib/languages/dust.js",
		"highlight/dust"
	],
	"./dust.js": [
		"./node_modules/highlight.js/lib/languages/dust.js",
		"highlight/dust"
	],
	"./ebnf": [
		"./node_modules/highlight.js/lib/languages/ebnf.js",
		"highlight/ebnf"
	],
	"./ebnf.js": [
		"./node_modules/highlight.js/lib/languages/ebnf.js",
		"highlight/ebnf"
	],
	"./elixir": [
		"./node_modules/highlight.js/lib/languages/elixir.js",
		"highlight/elixir"
	],
	"./elixir.js": [
		"./node_modules/highlight.js/lib/languages/elixir.js",
		"highlight/elixir"
	],
	"./elm": [
		"./node_modules/highlight.js/lib/languages/elm.js",
		"highlight/elm"
	],
	"./elm.js": [
		"./node_modules/highlight.js/lib/languages/elm.js",
		"highlight/elm"
	],
	"./erb": [
		"./node_modules/highlight.js/lib/languages/erb.js",
		"highlight/erb"
	],
	"./erb.js": [
		"./node_modules/highlight.js/lib/languages/erb.js",
		"highlight/erb"
	],
	"./erlang": [
		"./node_modules/highlight.js/lib/languages/erlang.js",
		"highlight/erlang"
	],
	"./erlang-repl": [
		"./node_modules/highlight.js/lib/languages/erlang-repl.js",
		"highlight/erlang-repl"
	],
	"./erlang-repl.js": [
		"./node_modules/highlight.js/lib/languages/erlang-repl.js",
		"highlight/erlang-repl"
	],
	"./erlang.js": [
		"./node_modules/highlight.js/lib/languages/erlang.js",
		"highlight/erlang"
	],
	"./excel": [
		"./node_modules/highlight.js/lib/languages/excel.js",
		"highlight/excel"
	],
	"./excel.js": [
		"./node_modules/highlight.js/lib/languages/excel.js",
		"highlight/excel"
	],
	"./fix": [
		"./node_modules/highlight.js/lib/languages/fix.js",
		"highlight/fix"
	],
	"./fix.js": [
		"./node_modules/highlight.js/lib/languages/fix.js",
		"highlight/fix"
	],
	"./flix": [
		"./node_modules/highlight.js/lib/languages/flix.js",
		"highlight/flix"
	],
	"./flix.js": [
		"./node_modules/highlight.js/lib/languages/flix.js",
		"highlight/flix"
	],
	"./fortran": [
		"./node_modules/highlight.js/lib/languages/fortran.js",
		"highlight/fortran"
	],
	"./fortran.js": [
		"./node_modules/highlight.js/lib/languages/fortran.js",
		"highlight/fortran"
	],
	"./fsharp": [
		"./node_modules/highlight.js/lib/languages/fsharp.js",
		"highlight/fsharp"
	],
	"./fsharp.js": [
		"./node_modules/highlight.js/lib/languages/fsharp.js",
		"highlight/fsharp"
	],
	"./gams": [
		"./node_modules/highlight.js/lib/languages/gams.js",
		"highlight/gams"
	],
	"./gams.js": [
		"./node_modules/highlight.js/lib/languages/gams.js",
		"highlight/gams"
	],
	"./gauss": [
		"./node_modules/highlight.js/lib/languages/gauss.js",
		"highlight/gauss"
	],
	"./gauss.js": [
		"./node_modules/highlight.js/lib/languages/gauss.js",
		"highlight/gauss"
	],
	"./gcode": [
		"./node_modules/highlight.js/lib/languages/gcode.js",
		"highlight/gcode"
	],
	"./gcode.js": [
		"./node_modules/highlight.js/lib/languages/gcode.js",
		"highlight/gcode"
	],
	"./gherkin": [
		"./node_modules/highlight.js/lib/languages/gherkin.js",
		"highlight/gherkin"
	],
	"./gherkin.js": [
		"./node_modules/highlight.js/lib/languages/gherkin.js",
		"highlight/gherkin"
	],
	"./glsl": [
		"./node_modules/highlight.js/lib/languages/glsl.js",
		"highlight/glsl"
	],
	"./glsl.js": [
		"./node_modules/highlight.js/lib/languages/glsl.js",
		"highlight/glsl"
	],
	"./gml": [
		"./node_modules/highlight.js/lib/languages/gml.js",
		"highlight/gml"
	],
	"./gml.js": [
		"./node_modules/highlight.js/lib/languages/gml.js",
		"highlight/gml"
	],
	"./go": [
		"./node_modules/highlight.js/lib/languages/go.js",
		"highlight/go"
	],
	"./go.js": [
		"./node_modules/highlight.js/lib/languages/go.js",
		"highlight/go"
	],
	"./golo": [
		"./node_modules/highlight.js/lib/languages/golo.js",
		"highlight/golo"
	],
	"./golo.js": [
		"./node_modules/highlight.js/lib/languages/golo.js",
		"highlight/golo"
	],
	"./gradle": [
		"./node_modules/highlight.js/lib/languages/gradle.js",
		"highlight/gradle"
	],
	"./gradle.js": [
		"./node_modules/highlight.js/lib/languages/gradle.js",
		"highlight/gradle"
	],
	"./groovy": [
		"./node_modules/highlight.js/lib/languages/groovy.js",
		"highlight/groovy"
	],
	"./groovy.js": [
		"./node_modules/highlight.js/lib/languages/groovy.js",
		"highlight/groovy"
	],
	"./haml": [
		"./node_modules/highlight.js/lib/languages/haml.js",
		"highlight/haml"
	],
	"./haml.js": [
		"./node_modules/highlight.js/lib/languages/haml.js",
		"highlight/haml"
	],
	"./handlebars": [
		"./node_modules/highlight.js/lib/languages/handlebars.js",
		"highlight/handlebars"
	],
	"./handlebars.js": [
		"./node_modules/highlight.js/lib/languages/handlebars.js",
		"highlight/handlebars"
	],
	"./haskell": [
		"./node_modules/highlight.js/lib/languages/haskell.js",
		"highlight/haskell"
	],
	"./haskell.js": [
		"./node_modules/highlight.js/lib/languages/haskell.js",
		"highlight/haskell"
	],
	"./haxe": [
		"./node_modules/highlight.js/lib/languages/haxe.js",
		"highlight/haxe"
	],
	"./haxe.js": [
		"./node_modules/highlight.js/lib/languages/haxe.js",
		"highlight/haxe"
	],
	"./hsp": [
		"./node_modules/highlight.js/lib/languages/hsp.js",
		"highlight/hsp"
	],
	"./hsp.js": [
		"./node_modules/highlight.js/lib/languages/hsp.js",
		"highlight/hsp"
	],
	"./htmlbars": [
		"./node_modules/highlight.js/lib/languages/htmlbars.js",
		"highlight/htmlbars"
	],
	"./htmlbars.js": [
		"./node_modules/highlight.js/lib/languages/htmlbars.js",
		"highlight/htmlbars"
	],
	"./http": [
		"./node_modules/highlight.js/lib/languages/http.js",
		"highlight/http"
	],
	"./http.js": [
		"./node_modules/highlight.js/lib/languages/http.js",
		"highlight/http"
	],
	"./hy": [
		"./node_modules/highlight.js/lib/languages/hy.js",
		"highlight/hy"
	],
	"./hy.js": [
		"./node_modules/highlight.js/lib/languages/hy.js",
		"highlight/hy"
	],
	"./inform7": [
		"./node_modules/highlight.js/lib/languages/inform7.js",
		"highlight/inform7"
	],
	"./inform7.js": [
		"./node_modules/highlight.js/lib/languages/inform7.js",
		"highlight/inform7"
	],
	"./ini": [
		"./node_modules/highlight.js/lib/languages/ini.js",
		"highlight/ini"
	],
	"./ini.js": [
		"./node_modules/highlight.js/lib/languages/ini.js",
		"highlight/ini"
	],
	"./irpf90": [
		"./node_modules/highlight.js/lib/languages/irpf90.js",
		"highlight/irpf90"
	],
	"./irpf90.js": [
		"./node_modules/highlight.js/lib/languages/irpf90.js",
		"highlight/irpf90"
	],
	"./isbl": [
		"./node_modules/highlight.js/lib/languages/isbl.js",
		"highlight/isbl"
	],
	"./isbl.js": [
		"./node_modules/highlight.js/lib/languages/isbl.js",
		"highlight/isbl"
	],
	"./java": [
		"./node_modules/highlight.js/lib/languages/java.js",
		"highlight/java"
	],
	"./java.js": [
		"./node_modules/highlight.js/lib/languages/java.js",
		"highlight/java"
	],
	"./javascript": [
		"./node_modules/highlight.js/lib/languages/javascript.js",
		"highlight/javascript"
	],
	"./javascript.js": [
		"./node_modules/highlight.js/lib/languages/javascript.js",
		"highlight/javascript"
	],
	"./jboss-cli": [
		"./node_modules/highlight.js/lib/languages/jboss-cli.js",
		"highlight/jboss-cli"
	],
	"./jboss-cli.js": [
		"./node_modules/highlight.js/lib/languages/jboss-cli.js",
		"highlight/jboss-cli"
	],
	"./json": [
		"./node_modules/highlight.js/lib/languages/json.js",
		"highlight/json"
	],
	"./json.js": [
		"./node_modules/highlight.js/lib/languages/json.js",
		"highlight/json"
	],
	"./julia": [
		"./node_modules/highlight.js/lib/languages/julia.js",
		"highlight/julia"
	],
	"./julia-repl": [
		"./node_modules/highlight.js/lib/languages/julia-repl.js",
		"highlight/julia-repl"
	],
	"./julia-repl.js": [
		"./node_modules/highlight.js/lib/languages/julia-repl.js",
		"highlight/julia-repl"
	],
	"./julia.js": [
		"./node_modules/highlight.js/lib/languages/julia.js",
		"highlight/julia"
	],
	"./kotlin": [
		"./node_modules/highlight.js/lib/languages/kotlin.js",
		"highlight/kotlin"
	],
	"./kotlin.js": [
		"./node_modules/highlight.js/lib/languages/kotlin.js",
		"highlight/kotlin"
	],
	"./lasso": [
		"./node_modules/highlight.js/lib/languages/lasso.js",
		"highlight/lasso"
	],
	"./lasso.js": [
		"./node_modules/highlight.js/lib/languages/lasso.js",
		"highlight/lasso"
	],
	"./latex": [
		"./node_modules/highlight.js/lib/languages/latex.js",
		"highlight/latex"
	],
	"./latex.js": [
		"./node_modules/highlight.js/lib/languages/latex.js",
		"highlight/latex"
	],
	"./ldif": [
		"./node_modules/highlight.js/lib/languages/ldif.js",
		"highlight/ldif"
	],
	"./ldif.js": [
		"./node_modules/highlight.js/lib/languages/ldif.js",
		"highlight/ldif"
	],
	"./leaf": [
		"./node_modules/highlight.js/lib/languages/leaf.js",
		"highlight/leaf"
	],
	"./leaf.js": [
		"./node_modules/highlight.js/lib/languages/leaf.js",
		"highlight/leaf"
	],
	"./less": [
		"./node_modules/highlight.js/lib/languages/less.js",
		"highlight/less"
	],
	"./less.js": [
		"./node_modules/highlight.js/lib/languages/less.js",
		"highlight/less"
	],
	"./lisp": [
		"./node_modules/highlight.js/lib/languages/lisp.js",
		"highlight/lisp"
	],
	"./lisp.js": [
		"./node_modules/highlight.js/lib/languages/lisp.js",
		"highlight/lisp"
	],
	"./livecodeserver": [
		"./node_modules/highlight.js/lib/languages/livecodeserver.js",
		"highlight/livecodeserver"
	],
	"./livecodeserver.js": [
		"./node_modules/highlight.js/lib/languages/livecodeserver.js",
		"highlight/livecodeserver"
	],
	"./livescript": [
		"./node_modules/highlight.js/lib/languages/livescript.js",
		"highlight/livescript"
	],
	"./livescript.js": [
		"./node_modules/highlight.js/lib/languages/livescript.js",
		"highlight/livescript"
	],
	"./llvm": [
		"./node_modules/highlight.js/lib/languages/llvm.js",
		"highlight/llvm"
	],
	"./llvm.js": [
		"./node_modules/highlight.js/lib/languages/llvm.js",
		"highlight/llvm"
	],
	"./lsl": [
		"./node_modules/highlight.js/lib/languages/lsl.js",
		"highlight/lsl"
	],
	"./lsl.js": [
		"./node_modules/highlight.js/lib/languages/lsl.js",
		"highlight/lsl"
	],
	"./lua": [
		"./node_modules/highlight.js/lib/languages/lua.js",
		"highlight/lua"
	],
	"./lua.js": [
		"./node_modules/highlight.js/lib/languages/lua.js",
		"highlight/lua"
	],
	"./makefile": [
		"./node_modules/highlight.js/lib/languages/makefile.js",
		"highlight/makefile"
	],
	"./makefile.js": [
		"./node_modules/highlight.js/lib/languages/makefile.js",
		"highlight/makefile"
	],
	"./markdown": [
		"./node_modules/highlight.js/lib/languages/markdown.js",
		"highlight/markdown"
	],
	"./markdown.js": [
		"./node_modules/highlight.js/lib/languages/markdown.js",
		"highlight/markdown"
	],
	"./mathematica": [
		"./node_modules/highlight.js/lib/languages/mathematica.js",
		"highlight/mathematica"
	],
	"./mathematica.js": [
		"./node_modules/highlight.js/lib/languages/mathematica.js",
		"highlight/mathematica"
	],
	"./matlab": [
		"./node_modules/highlight.js/lib/languages/matlab.js",
		"highlight/matlab"
	],
	"./matlab.js": [
		"./node_modules/highlight.js/lib/languages/matlab.js",
		"highlight/matlab"
	],
	"./maxima": [
		"./node_modules/highlight.js/lib/languages/maxima.js",
		"highlight/maxima"
	],
	"./maxima.js": [
		"./node_modules/highlight.js/lib/languages/maxima.js",
		"highlight/maxima"
	],
	"./mel": [
		"./node_modules/highlight.js/lib/languages/mel.js",
		"highlight/mel"
	],
	"./mel.js": [
		"./node_modules/highlight.js/lib/languages/mel.js",
		"highlight/mel"
	],
	"./mercury": [
		"./node_modules/highlight.js/lib/languages/mercury.js",
		"highlight/mercury"
	],
	"./mercury.js": [
		"./node_modules/highlight.js/lib/languages/mercury.js",
		"highlight/mercury"
	],
	"./mipsasm": [
		"./node_modules/highlight.js/lib/languages/mipsasm.js",
		"highlight/mipsasm"
	],
	"./mipsasm.js": [
		"./node_modules/highlight.js/lib/languages/mipsasm.js",
		"highlight/mipsasm"
	],
	"./mizar": [
		"./node_modules/highlight.js/lib/languages/mizar.js",
		"highlight/mizar"
	],
	"./mizar.js": [
		"./node_modules/highlight.js/lib/languages/mizar.js",
		"highlight/mizar"
	],
	"./mojolicious": [
		"./node_modules/highlight.js/lib/languages/mojolicious.js",
		"highlight/mojolicious"
	],
	"./mojolicious.js": [
		"./node_modules/highlight.js/lib/languages/mojolicious.js",
		"highlight/mojolicious"
	],
	"./monkey": [
		"./node_modules/highlight.js/lib/languages/monkey.js",
		"highlight/monkey"
	],
	"./monkey.js": [
		"./node_modules/highlight.js/lib/languages/monkey.js",
		"highlight/monkey"
	],
	"./moonscript": [
		"./node_modules/highlight.js/lib/languages/moonscript.js",
		"highlight/moonscript"
	],
	"./moonscript.js": [
		"./node_modules/highlight.js/lib/languages/moonscript.js",
		"highlight/moonscript"
	],
	"./n1ql": [
		"./node_modules/highlight.js/lib/languages/n1ql.js",
		"highlight/n1ql"
	],
	"./n1ql.js": [
		"./node_modules/highlight.js/lib/languages/n1ql.js",
		"highlight/n1ql"
	],
	"./nginx": [
		"./node_modules/highlight.js/lib/languages/nginx.js",
		"highlight/nginx"
	],
	"./nginx.js": [
		"./node_modules/highlight.js/lib/languages/nginx.js",
		"highlight/nginx"
	],
	"./nim": [
		"./node_modules/highlight.js/lib/languages/nim.js",
		"highlight/nim"
	],
	"./nim.js": [
		"./node_modules/highlight.js/lib/languages/nim.js",
		"highlight/nim"
	],
	"./nix": [
		"./node_modules/highlight.js/lib/languages/nix.js",
		"highlight/nix"
	],
	"./nix.js": [
		"./node_modules/highlight.js/lib/languages/nix.js",
		"highlight/nix"
	],
	"./node-repl": [
		"./node_modules/highlight.js/lib/languages/node-repl.js",
		"highlight/node-repl"
	],
	"./node-repl.js": [
		"./node_modules/highlight.js/lib/languages/node-repl.js",
		"highlight/node-repl"
	],
	"./nsis": [
		"./node_modules/highlight.js/lib/languages/nsis.js",
		"highlight/nsis"
	],
	"./nsis.js": [
		"./node_modules/highlight.js/lib/languages/nsis.js",
		"highlight/nsis"
	],
	"./objectivec": [
		"./node_modules/highlight.js/lib/languages/objectivec.js",
		"highlight/objectivec"
	],
	"./objectivec.js": [
		"./node_modules/highlight.js/lib/languages/objectivec.js",
		"highlight/objectivec"
	],
	"./ocaml": [
		"./node_modules/highlight.js/lib/languages/ocaml.js",
		"highlight/ocaml"
	],
	"./ocaml.js": [
		"./node_modules/highlight.js/lib/languages/ocaml.js",
		"highlight/ocaml"
	],
	"./openscad": [
		"./node_modules/highlight.js/lib/languages/openscad.js",
		"highlight/openscad"
	],
	"./openscad.js": [
		"./node_modules/highlight.js/lib/languages/openscad.js",
		"highlight/openscad"
	],
	"./oxygene": [
		"./node_modules/highlight.js/lib/languages/oxygene.js",
		"highlight/oxygene"
	],
	"./oxygene.js": [
		"./node_modules/highlight.js/lib/languages/oxygene.js",
		"highlight/oxygene"
	],
	"./parser3": [
		"./node_modules/highlight.js/lib/languages/parser3.js",
		"highlight/parser3"
	],
	"./parser3.js": [
		"./node_modules/highlight.js/lib/languages/parser3.js",
		"highlight/parser3"
	],
	"./perl": [
		"./node_modules/highlight.js/lib/languages/perl.js",
		"highlight/perl"
	],
	"./perl.js": [
		"./node_modules/highlight.js/lib/languages/perl.js",
		"highlight/perl"
	],
	"./pf": [
		"./node_modules/highlight.js/lib/languages/pf.js",
		"highlight/pf"
	],
	"./pf.js": [
		"./node_modules/highlight.js/lib/languages/pf.js",
		"highlight/pf"
	],
	"./pgsql": [
		"./node_modules/highlight.js/lib/languages/pgsql.js",
		"highlight/pgsql"
	],
	"./pgsql.js": [
		"./node_modules/highlight.js/lib/languages/pgsql.js",
		"highlight/pgsql"
	],
	"./php": [
		"./node_modules/highlight.js/lib/languages/php.js",
		"highlight/php"
	],
	"./php-template": [
		"./node_modules/highlight.js/lib/languages/php-template.js",
		"highlight/php-template"
	],
	"./php-template.js": [
		"./node_modules/highlight.js/lib/languages/php-template.js",
		"highlight/php-template"
	],
	"./php.js": [
		"./node_modules/highlight.js/lib/languages/php.js",
		"highlight/php"
	],
	"./plaintext": [
		"./node_modules/highlight.js/lib/languages/plaintext.js",
		"highlight/plaintext"
	],
	"./plaintext.js": [
		"./node_modules/highlight.js/lib/languages/plaintext.js",
		"highlight/plaintext"
	],
	"./pony": [
		"./node_modules/highlight.js/lib/languages/pony.js",
		"highlight/pony"
	],
	"./pony.js": [
		"./node_modules/highlight.js/lib/languages/pony.js",
		"highlight/pony"
	],
	"./powershell": [
		"./node_modules/highlight.js/lib/languages/powershell.js",
		"highlight/powershell"
	],
	"./powershell.js": [
		"./node_modules/highlight.js/lib/languages/powershell.js",
		"highlight/powershell"
	],
	"./processing": [
		"./node_modules/highlight.js/lib/languages/processing.js",
		"highlight/processing"
	],
	"./processing.js": [
		"./node_modules/highlight.js/lib/languages/processing.js",
		"highlight/processing"
	],
	"./profile": [
		"./node_modules/highlight.js/lib/languages/profile.js",
		"highlight/profile"
	],
	"./profile.js": [
		"./node_modules/highlight.js/lib/languages/profile.js",
		"highlight/profile"
	],
	"./prolog": [
		"./node_modules/highlight.js/lib/languages/prolog.js",
		"highlight/prolog"
	],
	"./prolog.js": [
		"./node_modules/highlight.js/lib/languages/prolog.js",
		"highlight/prolog"
	],
	"./properties": [
		"./node_modules/highlight.js/lib/languages/properties.js",
		"highlight/properties"
	],
	"./properties.js": [
		"./node_modules/highlight.js/lib/languages/properties.js",
		"highlight/properties"
	],
	"./protobuf": [
		"./node_modules/highlight.js/lib/languages/protobuf.js",
		"highlight/protobuf"
	],
	"./protobuf.js": [
		"./node_modules/highlight.js/lib/languages/protobuf.js",
		"highlight/protobuf"
	],
	"./puppet": [
		"./node_modules/highlight.js/lib/languages/puppet.js",
		"highlight/puppet"
	],
	"./puppet.js": [
		"./node_modules/highlight.js/lib/languages/puppet.js",
		"highlight/puppet"
	],
	"./purebasic": [
		"./node_modules/highlight.js/lib/languages/purebasic.js",
		"highlight/purebasic"
	],
	"./purebasic.js": [
		"./node_modules/highlight.js/lib/languages/purebasic.js",
		"highlight/purebasic"
	],
	"./python": [
		"./node_modules/highlight.js/lib/languages/python.js",
		"highlight/python"
	],
	"./python-repl": [
		"./node_modules/highlight.js/lib/languages/python-repl.js",
		"highlight/python-repl"
	],
	"./python-repl.js": [
		"./node_modules/highlight.js/lib/languages/python-repl.js",
		"highlight/python-repl"
	],
	"./python.js": [
		"./node_modules/highlight.js/lib/languages/python.js",
		"highlight/python"
	],
	"./q": [
		"./node_modules/highlight.js/lib/languages/q.js",
		"highlight/q"
	],
	"./q.js": [
		"./node_modules/highlight.js/lib/languages/q.js",
		"highlight/q"
	],
	"./qml": [
		"./node_modules/highlight.js/lib/languages/qml.js",
		"highlight/qml"
	],
	"./qml.js": [
		"./node_modules/highlight.js/lib/languages/qml.js",
		"highlight/qml"
	],
	"./r": [
		"./node_modules/highlight.js/lib/languages/r.js",
		"highlight/r"
	],
	"./r.js": [
		"./node_modules/highlight.js/lib/languages/r.js",
		"highlight/r"
	],
	"./reasonml": [
		"./node_modules/highlight.js/lib/languages/reasonml.js",
		"highlight/reasonml"
	],
	"./reasonml.js": [
		"./node_modules/highlight.js/lib/languages/reasonml.js",
		"highlight/reasonml"
	],
	"./rib": [
		"./node_modules/highlight.js/lib/languages/rib.js",
		"highlight/rib"
	],
	"./rib.js": [
		"./node_modules/highlight.js/lib/languages/rib.js",
		"highlight/rib"
	],
	"./roboconf": [
		"./node_modules/highlight.js/lib/languages/roboconf.js",
		"highlight/roboconf"
	],
	"./roboconf.js": [
		"./node_modules/highlight.js/lib/languages/roboconf.js",
		"highlight/roboconf"
	],
	"./routeros": [
		"./node_modules/highlight.js/lib/languages/routeros.js",
		"highlight/routeros"
	],
	"./routeros.js": [
		"./node_modules/highlight.js/lib/languages/routeros.js",
		"highlight/routeros"
	],
	"./rsl": [
		"./node_modules/highlight.js/lib/languages/rsl.js",
		"highlight/rsl"
	],
	"./rsl.js": [
		"./node_modules/highlight.js/lib/languages/rsl.js",
		"highlight/rsl"
	],
	"./ruby": [
		"./node_modules/highlight.js/lib/languages/ruby.js",
		"highlight/ruby"
	],
	"./ruby.js": [
		"./node_modules/highlight.js/lib/languages/ruby.js",
		"highlight/ruby"
	],
	"./ruleslanguage": [
		"./node_modules/highlight.js/lib/languages/ruleslanguage.js",
		"highlight/ruleslanguage"
	],
	"./ruleslanguage.js": [
		"./node_modules/highlight.js/lib/languages/ruleslanguage.js",
		"highlight/ruleslanguage"
	],
	"./rust": [
		"./node_modules/highlight.js/lib/languages/rust.js",
		"highlight/rust"
	],
	"./rust.js": [
		"./node_modules/highlight.js/lib/languages/rust.js",
		"highlight/rust"
	],
	"./sas": [
		"./node_modules/highlight.js/lib/languages/sas.js",
		"highlight/sas"
	],
	"./sas.js": [
		"./node_modules/highlight.js/lib/languages/sas.js",
		"highlight/sas"
	],
	"./scala": [
		"./node_modules/highlight.js/lib/languages/scala.js",
		"highlight/scala"
	],
	"./scala.js": [
		"./node_modules/highlight.js/lib/languages/scala.js",
		"highlight/scala"
	],
	"./scheme": [
		"./node_modules/highlight.js/lib/languages/scheme.js",
		"highlight/scheme"
	],
	"./scheme.js": [
		"./node_modules/highlight.js/lib/languages/scheme.js",
		"highlight/scheme"
	],
	"./scilab": [
		"./node_modules/highlight.js/lib/languages/scilab.js",
		"highlight/scilab"
	],
	"./scilab.js": [
		"./node_modules/highlight.js/lib/languages/scilab.js",
		"highlight/scilab"
	],
	"./scss": [
		"./node_modules/highlight.js/lib/languages/scss.js",
		"highlight/scss"
	],
	"./scss.js": [
		"./node_modules/highlight.js/lib/languages/scss.js",
		"highlight/scss"
	],
	"./shell": [
		"./node_modules/highlight.js/lib/languages/shell.js",
		"highlight/shell"
	],
	"./shell.js": [
		"./node_modules/highlight.js/lib/languages/shell.js",
		"highlight/shell"
	],
	"./smali": [
		"./node_modules/highlight.js/lib/languages/smali.js",
		"highlight/smali"
	],
	"./smali.js": [
		"./node_modules/highlight.js/lib/languages/smali.js",
		"highlight/smali"
	],
	"./smalltalk": [
		"./node_modules/highlight.js/lib/languages/smalltalk.js",
		"highlight/smalltalk"
	],
	"./smalltalk.js": [
		"./node_modules/highlight.js/lib/languages/smalltalk.js",
		"highlight/smalltalk"
	],
	"./sml": [
		"./node_modules/highlight.js/lib/languages/sml.js",
		"highlight/sml"
	],
	"./sml.js": [
		"./node_modules/highlight.js/lib/languages/sml.js",
		"highlight/sml"
	],
	"./sqf": [
		"./node_modules/highlight.js/lib/languages/sqf.js",
		"highlight/sqf"
	],
	"./sqf.js": [
		"./node_modules/highlight.js/lib/languages/sqf.js",
		"highlight/sqf"
	],
	"./sql": [
		"./node_modules/highlight.js/lib/languages/sql.js",
		"highlight/sql"
	],
	"./sql.js": [
		"./node_modules/highlight.js/lib/languages/sql.js",
		"highlight/sql"
	],
	"./sql_more": [
		"./node_modules/highlight.js/lib/languages/sql_more.js",
		"highlight/sql_more"
	],
	"./sql_more.js": [
		"./node_modules/highlight.js/lib/languages/sql_more.js",
		"highlight/sql_more"
	],
	"./stan": [
		"./node_modules/highlight.js/lib/languages/stan.js",
		"highlight/stan"
	],
	"./stan.js": [
		"./node_modules/highlight.js/lib/languages/stan.js",
		"highlight/stan"
	],
	"./stata": [
		"./node_modules/highlight.js/lib/languages/stata.js",
		"highlight/stata"
	],
	"./stata.js": [
		"./node_modules/highlight.js/lib/languages/stata.js",
		"highlight/stata"
	],
	"./step21": [
		"./node_modules/highlight.js/lib/languages/step21.js",
		"highlight/step21"
	],
	"./step21.js": [
		"./node_modules/highlight.js/lib/languages/step21.js",
		"highlight/step21"
	],
	"./stylus": [
		"./node_modules/highlight.js/lib/languages/stylus.js",
		"highlight/stylus"
	],
	"./stylus.js": [
		"./node_modules/highlight.js/lib/languages/stylus.js",
		"highlight/stylus"
	],
	"./subunit": [
		"./node_modules/highlight.js/lib/languages/subunit.js",
		"highlight/subunit"
	],
	"./subunit.js": [
		"./node_modules/highlight.js/lib/languages/subunit.js",
		"highlight/subunit"
	],
	"./swift": [
		"./node_modules/highlight.js/lib/languages/swift.js",
		"highlight/swift"
	],
	"./swift.js": [
		"./node_modules/highlight.js/lib/languages/swift.js",
		"highlight/swift"
	],
	"./taggerscript": [
		"./node_modules/highlight.js/lib/languages/taggerscript.js",
		"highlight/taggerscript"
	],
	"./taggerscript.js": [
		"./node_modules/highlight.js/lib/languages/taggerscript.js",
		"highlight/taggerscript"
	],
	"./tap": [
		"./node_modules/highlight.js/lib/languages/tap.js",
		"highlight/tap"
	],
	"./tap.js": [
		"./node_modules/highlight.js/lib/languages/tap.js",
		"highlight/tap"
	],
	"./tcl": [
		"./node_modules/highlight.js/lib/languages/tcl.js",
		"highlight/tcl"
	],
	"./tcl.js": [
		"./node_modules/highlight.js/lib/languages/tcl.js",
		"highlight/tcl"
	],
	"./thrift": [
		"./node_modules/highlight.js/lib/languages/thrift.js",
		"highlight/thrift"
	],
	"./thrift.js": [
		"./node_modules/highlight.js/lib/languages/thrift.js",
		"highlight/thrift"
	],
	"./tp": [
		"./node_modules/highlight.js/lib/languages/tp.js",
		"highlight/tp"
	],
	"./tp.js": [
		"./node_modules/highlight.js/lib/languages/tp.js",
		"highlight/tp"
	],
	"./twig": [
		"./node_modules/highlight.js/lib/languages/twig.js",
		"highlight/twig"
	],
	"./twig.js": [
		"./node_modules/highlight.js/lib/languages/twig.js",
		"highlight/twig"
	],
	"./typescript": [
		"./node_modules/highlight.js/lib/languages/typescript.js",
		"highlight/typescript"
	],
	"./typescript.js": [
		"./node_modules/highlight.js/lib/languages/typescript.js",
		"highlight/typescript"
	],
	"./vala": [
		"./node_modules/highlight.js/lib/languages/vala.js",
		"highlight/vala"
	],
	"./vala.js": [
		"./node_modules/highlight.js/lib/languages/vala.js",
		"highlight/vala"
	],
	"./vbnet": [
		"./node_modules/highlight.js/lib/languages/vbnet.js",
		"highlight/vbnet"
	],
	"./vbnet.js": [
		"./node_modules/highlight.js/lib/languages/vbnet.js",
		"highlight/vbnet"
	],
	"./vbscript": [
		"./node_modules/highlight.js/lib/languages/vbscript.js",
		"highlight/vbscript"
	],
	"./vbscript-html": [
		"./node_modules/highlight.js/lib/languages/vbscript-html.js",
		"highlight/vbscript-html"
	],
	"./vbscript-html.js": [
		"./node_modules/highlight.js/lib/languages/vbscript-html.js",
		"highlight/vbscript-html"
	],
	"./vbscript.js": [
		"./node_modules/highlight.js/lib/languages/vbscript.js",
		"highlight/vbscript"
	],
	"./verilog": [
		"./node_modules/highlight.js/lib/languages/verilog.js",
		"highlight/verilog"
	],
	"./verilog.js": [
		"./node_modules/highlight.js/lib/languages/verilog.js",
		"highlight/verilog"
	],
	"./vhdl": [
		"./node_modules/highlight.js/lib/languages/vhdl.js",
		"highlight/vhdl"
	],
	"./vhdl.js": [
		"./node_modules/highlight.js/lib/languages/vhdl.js",
		"highlight/vhdl"
	],
	"./vim": [
		"./node_modules/highlight.js/lib/languages/vim.js",
		"highlight/vim"
	],
	"./vim.js": [
		"./node_modules/highlight.js/lib/languages/vim.js",
		"highlight/vim"
	],
	"./x86asm": [
		"./node_modules/highlight.js/lib/languages/x86asm.js",
		"highlight/x86asm"
	],
	"./x86asm.js": [
		"./node_modules/highlight.js/lib/languages/x86asm.js",
		"highlight/x86asm"
	],
	"./xl": [
		"./node_modules/highlight.js/lib/languages/xl.js",
		"highlight/xl"
	],
	"./xl.js": [
		"./node_modules/highlight.js/lib/languages/xl.js",
		"highlight/xl"
	],
	"./xml": [
		"./node_modules/highlight.js/lib/languages/xml.js",
		"highlight/xml"
	],
	"./xml.js": [
		"./node_modules/highlight.js/lib/languages/xml.js",
		"highlight/xml"
	],
	"./xquery": [
		"./node_modules/highlight.js/lib/languages/xquery.js",
		"highlight/xquery"
	],
	"./xquery.js": [
		"./node_modules/highlight.js/lib/languages/xquery.js",
		"highlight/xquery"
	],
	"./yaml": [
		"./node_modules/highlight.js/lib/languages/yaml.js",
		"highlight/yaml"
	],
	"./yaml.js": [
		"./node_modules/highlight.js/lib/languages/yaml.js",
		"highlight/yaml"
	],
	"./zephir": [
		"./node_modules/highlight.js/lib/languages/zephir.js",
		"highlight/zephir"
	],
	"./zephir.js": [
		"./node_modules/highlight.js/lib/languages/zephir.js",
		"highlight/zephir"
	]
};
function webpackAsyncContext(req) {
	if(!__webpack_require__.o(map, req)) {
		return Promise.resolve().then(function() {
			var e = new Error("Cannot find module '" + req + "'");
			e.code = 'MODULE_NOT_FOUND';
			throw e;
		});
	}

	var ids = map[req], id = ids[0];
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__.t(id, 7);
	});
}
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = "./node_modules/highlight.js/lib/languages lazy recursive ^\\.\\/.*$";
module.exports = webpackAsyncContext;

/***/ }),

/***/ "./node_modules/moment/locale sync recursive ^\\.\\/.*$":
/*!**************************************************!*\
  !*** ./node_modules/moment/locale sync ^\.\/.*$ ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": "./node_modules/moment/locale/af.js",
	"./af.js": "./node_modules/moment/locale/af.js",
	"./ar": "./node_modules/moment/locale/ar.js",
	"./ar-dz": "./node_modules/moment/locale/ar-dz.js",
	"./ar-dz.js": "./node_modules/moment/locale/ar-dz.js",
	"./ar-kw": "./node_modules/moment/locale/ar-kw.js",
	"./ar-kw.js": "./node_modules/moment/locale/ar-kw.js",
	"./ar-ly": "./node_modules/moment/locale/ar-ly.js",
	"./ar-ly.js": "./node_modules/moment/locale/ar-ly.js",
	"./ar-ma": "./node_modules/moment/locale/ar-ma.js",
	"./ar-ma.js": "./node_modules/moment/locale/ar-ma.js",
	"./ar-sa": "./node_modules/moment/locale/ar-sa.js",
	"./ar-sa.js": "./node_modules/moment/locale/ar-sa.js",
	"./ar-tn": "./node_modules/moment/locale/ar-tn.js",
	"./ar-tn.js": "./node_modules/moment/locale/ar-tn.js",
	"./ar.js": "./node_modules/moment/locale/ar.js",
	"./az": "./node_modules/moment/locale/az.js",
	"./az.js": "./node_modules/moment/locale/az.js",
	"./be": "./node_modules/moment/locale/be.js",
	"./be.js": "./node_modules/moment/locale/be.js",
	"./bg": "./node_modules/moment/locale/bg.js",
	"./bg.js": "./node_modules/moment/locale/bg.js",
	"./bm": "./node_modules/moment/locale/bm.js",
	"./bm.js": "./node_modules/moment/locale/bm.js",
	"./bn": "./node_modules/moment/locale/bn.js",
	"./bn.js": "./node_modules/moment/locale/bn.js",
	"./bo": "./node_modules/moment/locale/bo.js",
	"./bo.js": "./node_modules/moment/locale/bo.js",
	"./br": "./node_modules/moment/locale/br.js",
	"./br.js": "./node_modules/moment/locale/br.js",
	"./bs": "./node_modules/moment/locale/bs.js",
	"./bs.js": "./node_modules/moment/locale/bs.js",
	"./ca": "./node_modules/moment/locale/ca.js",
	"./ca.js": "./node_modules/moment/locale/ca.js",
	"./cs": "./node_modules/moment/locale/cs.js",
	"./cs.js": "./node_modules/moment/locale/cs.js",
	"./cv": "./node_modules/moment/locale/cv.js",
	"./cv.js": "./node_modules/moment/locale/cv.js",
	"./cy": "./node_modules/moment/locale/cy.js",
	"./cy.js": "./node_modules/moment/locale/cy.js",
	"./da": "./node_modules/moment/locale/da.js",
	"./da.js": "./node_modules/moment/locale/da.js",
	"./de": "./node_modules/moment/locale/de.js",
	"./de-at": "./node_modules/moment/locale/de-at.js",
	"./de-at.js": "./node_modules/moment/locale/de-at.js",
	"./de-ch": "./node_modules/moment/locale/de-ch.js",
	"./de-ch.js": "./node_modules/moment/locale/de-ch.js",
	"./de.js": "./node_modules/moment/locale/de.js",
	"./dv": "./node_modules/moment/locale/dv.js",
	"./dv.js": "./node_modules/moment/locale/dv.js",
	"./el": "./node_modules/moment/locale/el.js",
	"./el.js": "./node_modules/moment/locale/el.js",
	"./en-SG": "./node_modules/moment/locale/en-SG.js",
	"./en-SG.js": "./node_modules/moment/locale/en-SG.js",
	"./en-au": "./node_modules/moment/locale/en-au.js",
	"./en-au.js": "./node_modules/moment/locale/en-au.js",
	"./en-ca": "./node_modules/moment/locale/en-ca.js",
	"./en-ca.js": "./node_modules/moment/locale/en-ca.js",
	"./en-gb": "./node_modules/moment/locale/en-gb.js",
	"./en-gb.js": "./node_modules/moment/locale/en-gb.js",
	"./en-ie": "./node_modules/moment/locale/en-ie.js",
	"./en-ie.js": "./node_modules/moment/locale/en-ie.js",
	"./en-il": "./node_modules/moment/locale/en-il.js",
	"./en-il.js": "./node_modules/moment/locale/en-il.js",
	"./en-nz": "./node_modules/moment/locale/en-nz.js",
	"./en-nz.js": "./node_modules/moment/locale/en-nz.js",
	"./eo": "./node_modules/moment/locale/eo.js",
	"./eo.js": "./node_modules/moment/locale/eo.js",
	"./es": "./node_modules/moment/locale/es.js",
	"./es-do": "./node_modules/moment/locale/es-do.js",
	"./es-do.js": "./node_modules/moment/locale/es-do.js",
	"./es-us": "./node_modules/moment/locale/es-us.js",
	"./es-us.js": "./node_modules/moment/locale/es-us.js",
	"./es.js": "./node_modules/moment/locale/es.js",
	"./et": "./node_modules/moment/locale/et.js",
	"./et.js": "./node_modules/moment/locale/et.js",
	"./eu": "./node_modules/moment/locale/eu.js",
	"./eu.js": "./node_modules/moment/locale/eu.js",
	"./fa": "./node_modules/moment/locale/fa.js",
	"./fa.js": "./node_modules/moment/locale/fa.js",
	"./fi": "./node_modules/moment/locale/fi.js",
	"./fi.js": "./node_modules/moment/locale/fi.js",
	"./fo": "./node_modules/moment/locale/fo.js",
	"./fo.js": "./node_modules/moment/locale/fo.js",
	"./fr": "./node_modules/moment/locale/fr.js",
	"./fr-ca": "./node_modules/moment/locale/fr-ca.js",
	"./fr-ca.js": "./node_modules/moment/locale/fr-ca.js",
	"./fr-ch": "./node_modules/moment/locale/fr-ch.js",
	"./fr-ch.js": "./node_modules/moment/locale/fr-ch.js",
	"./fr.js": "./node_modules/moment/locale/fr.js",
	"./fy": "./node_modules/moment/locale/fy.js",
	"./fy.js": "./node_modules/moment/locale/fy.js",
	"./ga": "./node_modules/moment/locale/ga.js",
	"./ga.js": "./node_modules/moment/locale/ga.js",
	"./gd": "./node_modules/moment/locale/gd.js",
	"./gd.js": "./node_modules/moment/locale/gd.js",
	"./gl": "./node_modules/moment/locale/gl.js",
	"./gl.js": "./node_modules/moment/locale/gl.js",
	"./gom-latn": "./node_modules/moment/locale/gom-latn.js",
	"./gom-latn.js": "./node_modules/moment/locale/gom-latn.js",
	"./gu": "./node_modules/moment/locale/gu.js",
	"./gu.js": "./node_modules/moment/locale/gu.js",
	"./he": "./node_modules/moment/locale/he.js",
	"./he.js": "./node_modules/moment/locale/he.js",
	"./hi": "./node_modules/moment/locale/hi.js",
	"./hi.js": "./node_modules/moment/locale/hi.js",
	"./hr": "./node_modules/moment/locale/hr.js",
	"./hr.js": "./node_modules/moment/locale/hr.js",
	"./hu": "./node_modules/moment/locale/hu.js",
	"./hu.js": "./node_modules/moment/locale/hu.js",
	"./hy-am": "./node_modules/moment/locale/hy-am.js",
	"./hy-am.js": "./node_modules/moment/locale/hy-am.js",
	"./id": "./node_modules/moment/locale/id.js",
	"./id.js": "./node_modules/moment/locale/id.js",
	"./is": "./node_modules/moment/locale/is.js",
	"./is.js": "./node_modules/moment/locale/is.js",
	"./it": "./node_modules/moment/locale/it.js",
	"./it-ch": "./node_modules/moment/locale/it-ch.js",
	"./it-ch.js": "./node_modules/moment/locale/it-ch.js",
	"./it.js": "./node_modules/moment/locale/it.js",
	"./ja": "./node_modules/moment/locale/ja.js",
	"./ja.js": "./node_modules/moment/locale/ja.js",
	"./jv": "./node_modules/moment/locale/jv.js",
	"./jv.js": "./node_modules/moment/locale/jv.js",
	"./ka": "./node_modules/moment/locale/ka.js",
	"./ka.js": "./node_modules/moment/locale/ka.js",
	"./kk": "./node_modules/moment/locale/kk.js",
	"./kk.js": "./node_modules/moment/locale/kk.js",
	"./km": "./node_modules/moment/locale/km.js",
	"./km.js": "./node_modules/moment/locale/km.js",
	"./kn": "./node_modules/moment/locale/kn.js",
	"./kn.js": "./node_modules/moment/locale/kn.js",
	"./ko": "./node_modules/moment/locale/ko.js",
	"./ko.js": "./node_modules/moment/locale/ko.js",
	"./ku": "./node_modules/moment/locale/ku.js",
	"./ku.js": "./node_modules/moment/locale/ku.js",
	"./ky": "./node_modules/moment/locale/ky.js",
	"./ky.js": "./node_modules/moment/locale/ky.js",
	"./lb": "./node_modules/moment/locale/lb.js",
	"./lb.js": "./node_modules/moment/locale/lb.js",
	"./lo": "./node_modules/moment/locale/lo.js",
	"./lo.js": "./node_modules/moment/locale/lo.js",
	"./lt": "./node_modules/moment/locale/lt.js",
	"./lt.js": "./node_modules/moment/locale/lt.js",
	"./lv": "./node_modules/moment/locale/lv.js",
	"./lv.js": "./node_modules/moment/locale/lv.js",
	"./me": "./node_modules/moment/locale/me.js",
	"./me.js": "./node_modules/moment/locale/me.js",
	"./mi": "./node_modules/moment/locale/mi.js",
	"./mi.js": "./node_modules/moment/locale/mi.js",
	"./mk": "./node_modules/moment/locale/mk.js",
	"./mk.js": "./node_modules/moment/locale/mk.js",
	"./ml": "./node_modules/moment/locale/ml.js",
	"./ml.js": "./node_modules/moment/locale/ml.js",
	"./mn": "./node_modules/moment/locale/mn.js",
	"./mn.js": "./node_modules/moment/locale/mn.js",
	"./mr": "./node_modules/moment/locale/mr.js",
	"./mr.js": "./node_modules/moment/locale/mr.js",
	"./ms": "./node_modules/moment/locale/ms.js",
	"./ms-my": "./node_modules/moment/locale/ms-my.js",
	"./ms-my.js": "./node_modules/moment/locale/ms-my.js",
	"./ms.js": "./node_modules/moment/locale/ms.js",
	"./mt": "./node_modules/moment/locale/mt.js",
	"./mt.js": "./node_modules/moment/locale/mt.js",
	"./my": "./node_modules/moment/locale/my.js",
	"./my.js": "./node_modules/moment/locale/my.js",
	"./nb": "./node_modules/moment/locale/nb.js",
	"./nb.js": "./node_modules/moment/locale/nb.js",
	"./ne": "./node_modules/moment/locale/ne.js",
	"./ne.js": "./node_modules/moment/locale/ne.js",
	"./nl": "./node_modules/moment/locale/nl.js",
	"./nl-be": "./node_modules/moment/locale/nl-be.js",
	"./nl-be.js": "./node_modules/moment/locale/nl-be.js",
	"./nl.js": "./node_modules/moment/locale/nl.js",
	"./nn": "./node_modules/moment/locale/nn.js",
	"./nn.js": "./node_modules/moment/locale/nn.js",
	"./pa-in": "./node_modules/moment/locale/pa-in.js",
	"./pa-in.js": "./node_modules/moment/locale/pa-in.js",
	"./pl": "./node_modules/moment/locale/pl.js",
	"./pl.js": "./node_modules/moment/locale/pl.js",
	"./pt": "./node_modules/moment/locale/pt.js",
	"./pt-br": "./node_modules/moment/locale/pt-br.js",
	"./pt-br.js": "./node_modules/moment/locale/pt-br.js",
	"./pt.js": "./node_modules/moment/locale/pt.js",
	"./ro": "./node_modules/moment/locale/ro.js",
	"./ro.js": "./node_modules/moment/locale/ro.js",
	"./ru": "./node_modules/moment/locale/ru.js",
	"./ru.js": "./node_modules/moment/locale/ru.js",
	"./sd": "./node_modules/moment/locale/sd.js",
	"./sd.js": "./node_modules/moment/locale/sd.js",
	"./se": "./node_modules/moment/locale/se.js",
	"./se.js": "./node_modules/moment/locale/se.js",
	"./si": "./node_modules/moment/locale/si.js",
	"./si.js": "./node_modules/moment/locale/si.js",
	"./sk": "./node_modules/moment/locale/sk.js",
	"./sk.js": "./node_modules/moment/locale/sk.js",
	"./sl": "./node_modules/moment/locale/sl.js",
	"./sl.js": "./node_modules/moment/locale/sl.js",
	"./sq": "./node_modules/moment/locale/sq.js",
	"./sq.js": "./node_modules/moment/locale/sq.js",
	"./sr": "./node_modules/moment/locale/sr.js",
	"./sr-cyrl": "./node_modules/moment/locale/sr-cyrl.js",
	"./sr-cyrl.js": "./node_modules/moment/locale/sr-cyrl.js",
	"./sr.js": "./node_modules/moment/locale/sr.js",
	"./ss": "./node_modules/moment/locale/ss.js",
	"./ss.js": "./node_modules/moment/locale/ss.js",
	"./sv": "./node_modules/moment/locale/sv.js",
	"./sv.js": "./node_modules/moment/locale/sv.js",
	"./sw": "./node_modules/moment/locale/sw.js",
	"./sw.js": "./node_modules/moment/locale/sw.js",
	"./ta": "./node_modules/moment/locale/ta.js",
	"./ta.js": "./node_modules/moment/locale/ta.js",
	"./te": "./node_modules/moment/locale/te.js",
	"./te.js": "./node_modules/moment/locale/te.js",
	"./tet": "./node_modules/moment/locale/tet.js",
	"./tet.js": "./node_modules/moment/locale/tet.js",
	"./tg": "./node_modules/moment/locale/tg.js",
	"./tg.js": "./node_modules/moment/locale/tg.js",
	"./th": "./node_modules/moment/locale/th.js",
	"./th.js": "./node_modules/moment/locale/th.js",
	"./tl-ph": "./node_modules/moment/locale/tl-ph.js",
	"./tl-ph.js": "./node_modules/moment/locale/tl-ph.js",
	"./tlh": "./node_modules/moment/locale/tlh.js",
	"./tlh.js": "./node_modules/moment/locale/tlh.js",
	"./tr": "./node_modules/moment/locale/tr.js",
	"./tr.js": "./node_modules/moment/locale/tr.js",
	"./tzl": "./node_modules/moment/locale/tzl.js",
	"./tzl.js": "./node_modules/moment/locale/tzl.js",
	"./tzm": "./node_modules/moment/locale/tzm.js",
	"./tzm-latn": "./node_modules/moment/locale/tzm-latn.js",
	"./tzm-latn.js": "./node_modules/moment/locale/tzm-latn.js",
	"./tzm.js": "./node_modules/moment/locale/tzm.js",
	"./ug-cn": "./node_modules/moment/locale/ug-cn.js",
	"./ug-cn.js": "./node_modules/moment/locale/ug-cn.js",
	"./uk": "./node_modules/moment/locale/uk.js",
	"./uk.js": "./node_modules/moment/locale/uk.js",
	"./ur": "./node_modules/moment/locale/ur.js",
	"./ur.js": "./node_modules/moment/locale/ur.js",
	"./uz": "./node_modules/moment/locale/uz.js",
	"./uz-latn": "./node_modules/moment/locale/uz-latn.js",
	"./uz-latn.js": "./node_modules/moment/locale/uz-latn.js",
	"./uz.js": "./node_modules/moment/locale/uz.js",
	"./vi": "./node_modules/moment/locale/vi.js",
	"./vi.js": "./node_modules/moment/locale/vi.js",
	"./x-pseudo": "./node_modules/moment/locale/x-pseudo.js",
	"./x-pseudo.js": "./node_modules/moment/locale/x-pseudo.js",
	"./yo": "./node_modules/moment/locale/yo.js",
	"./yo.js": "./node_modules/moment/locale/yo.js",
	"./zh-cn": "./node_modules/moment/locale/zh-cn.js",
	"./zh-cn.js": "./node_modules/moment/locale/zh-cn.js",
	"./zh-hk": "./node_modules/moment/locale/zh-hk.js",
	"./zh-hk.js": "./node_modules/moment/locale/zh-hk.js",
	"./zh-tw": "./node_modules/moment/locale/zh-tw.js",
	"./zh-tw.js": "./node_modules/moment/locale/zh-tw.js"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./node_modules/moment/locale sync recursive ^\\.\\/.*$";

/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/components/CollisionResolveDialog.vue?vue&type=style&index=0&id=5ffe7972&scoped=true&lang=scss&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/components/CollisionResolveDialog.vue?vue&type=style&index=0&id=5ffe7972&scoped=true&lang=scss& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_CollisionResolveDialog_vue_vue_type_style_index_0_id_5ffe7972_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/sass-loader/dist/cjs.js!../../node_modules/vue-loader/lib??vue-loader-options!./CollisionResolveDialog.vue?vue&type=style&index=0&id=5ffe7972&scoped=true&lang=scss& */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/components/CollisionResolveDialog.vue?vue&type=style&index=0&id=5ffe7972&scoped=true&lang=scss&");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_CollisionResolveDialog_vue_vue_type_style_index_0_id_5ffe7972_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ __webpack_exports__["default"] = (_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_CollisionResolveDialog_vue_vue_type_style_index_0_id_5ffe7972_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/components/EditorWrapper.vue?vue&type=style&index=0&id=76135766&scoped=true&lang=scss&":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/components/EditorWrapper.vue?vue&type=style&index=0&id=76135766&scoped=true&lang=scss& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_EditorWrapper_vue_vue_type_style_index_0_id_76135766_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/sass-loader/dist/cjs.js!../../node_modules/vue-loader/lib??vue-loader-options!./EditorWrapper.vue?vue&type=style&index=0&id=76135766&scoped=true&lang=scss& */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/components/EditorWrapper.vue?vue&type=style&index=0&id=76135766&scoped=true&lang=scss&");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_EditorWrapper_vue_vue_type_style_index_0_id_76135766_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ __webpack_exports__["default"] = (_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_EditorWrapper_vue_vue_type_style_index_0_id_76135766_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/components/EditorWrapper.vue?vue&type=style&index=1&lang=scss&":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/components/EditorWrapper.vue?vue&type=style&index=1&lang=scss& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_EditorWrapper_vue_vue_type_style_index_1_lang_scss___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/sass-loader/dist/cjs.js!../../node_modules/vue-loader/lib??vue-loader-options!./EditorWrapper.vue?vue&type=style&index=1&lang=scss& */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/components/EditorWrapper.vue?vue&type=style&index=1&lang=scss&");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_EditorWrapper_vue_vue_type_style_index_1_lang_scss___WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ __webpack_exports__["default"] = (_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_EditorWrapper_vue_vue_type_style_index_1_lang_scss___WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/components/ReadOnlyEditor.vue?vue&type=style&index=0&lang=scss&":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/components/ReadOnlyEditor.vue?vue&type=style&index=0&lang=scss& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ReadOnlyEditor_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/sass-loader/dist/cjs.js!../../node_modules/vue-loader/lib??vue-loader-options!./ReadOnlyEditor.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/components/ReadOnlyEditor.vue?vue&type=style&index=0&lang=scss&");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ReadOnlyEditor_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ __webpack_exports__["default"] = (_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ReadOnlyEditor_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/components/ReadOnlyEditor.vue?vue&type=style&index=1&lang=scss&":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/components/ReadOnlyEditor.vue?vue&type=style&index=1&lang=scss& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ReadOnlyEditor_vue_vue_type_style_index_1_lang_scss___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/sass-loader/dist/cjs.js!../../node_modules/vue-loader/lib??vue-loader-options!./ReadOnlyEditor.vue?vue&type=style&index=1&lang=scss& */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/components/ReadOnlyEditor.vue?vue&type=style&index=1&lang=scss&");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ReadOnlyEditor_vue_vue_type_style_index_1_lang_scss___WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ __webpack_exports__["default"] = (_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ReadOnlyEditor_vue_vue_type_style_index_1_lang_scss___WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/nodes/ImageView.vue?vue&type=style&index=0&id=336b1e4e&scoped=true&lang=scss&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/nodes/ImageView.vue?vue&type=style&index=0&id=336b1e4e&scoped=true&lang=scss& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ImageView_vue_vue_type_style_index_0_id_336b1e4e_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/sass-loader/dist/cjs.js!../../node_modules/vue-loader/lib??vue-loader-options!./ImageView.vue?vue&type=style&index=0&id=336b1e4e&scoped=true&lang=scss& */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/nodes/ImageView.vue?vue&type=style&index=0&id=336b1e4e&scoped=true&lang=scss&");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ImageView_vue_vue_type_style_index_0_id_336b1e4e_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ __webpack_exports__["default"] = (_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ImageView_vue_vue_type_style_index_0_id_336b1e4e_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/views/DirectEditing.vue?vue&type=style&index=0&id=37e36225&scoped=true&lang=scss&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/views/DirectEditing.vue?vue&type=style&index=0&id=37e36225&scoped=true&lang=scss& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_DirectEditing_vue_vue_type_style_index_0_id_37e36225_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/sass-loader/dist/cjs.js!../../node_modules/vue-loader/lib??vue-loader-options!./DirectEditing.vue?vue&type=style&index=0&id=37e36225&scoped=true&lang=scss& */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/views/DirectEditing.vue?vue&type=style&index=0&id=37e36225&scoped=true&lang=scss&");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_DirectEditing_vue_vue_type_style_index_0_id_37e36225_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ __webpack_exports__["default"] = (_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_DirectEditing_vue_vue_type_style_index_0_id_37e36225_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/components/CollisionResolveDialog.vue?vue&type=template&id=5ffe7972&scoped=true&":
/*!****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/components/CollisionResolveDialog.vue?vue&type=template&id=5ffe7972&scoped=true& ***!
  \****************************************************************************************************************************************************************************************************************************/
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
    "div",
    {
      staticClass: "collision-resolve-dialog",
      attrs: { id: "resolve-conflicts" }
    },
    [
      _c(
        "button",
        {
          on: {
            click: function($event) {
              return _vm.$emit("resolveUseThisVersion")
            }
          }
        },
        [
          _vm._v(
            "\n\t\t" + _vm._s(_vm.t("text", "Use current version")) + "\n\t"
          )
        ]
      ),
      _vm._v(" "),
      _c(
        "button",
        {
          on: {
            click: function($event) {
              return _vm.$emit("resolveUseServerVersion")
            }
          }
        },
        [
          _vm._v(
            "\n\t\t" + _vm._s(_vm.t("text", "Use the saved version")) + "\n\t"
          )
        ]
      )
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/components/EditorWrapper.vue?vue&type=template&id=76135766&scoped=true&":
/*!*******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/components/EditorWrapper.vue?vue&type=template&id=76135766&scoped=true& ***!
  \*******************************************************************************************************************************************************************************************************************/
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
    "div",
    { attrs: { id: "editor-container" } },
    [
      _vm.currentSession && _vm.active
        ? _c("div", { staticClass: "document-status" }, [
            _vm.idle
              ? _c("p", { staticClass: "msg" }, [
                  _vm._v(
                    "\n\t\t\t" +
                      _vm._s(
                        _vm.t(
                          "text",
                          "Document idle for {timeout} minutes, click to continue editing",
                          { timeout: _vm.IDLE_TIMEOUT }
                        )
                      ) +
                      " "
                  ),
                  _c(
                    "a",
                    {
                      staticClass: "button primary",
                      on: { click: _vm.reconnect }
                    },
                    [_vm._v(_vm._s(_vm.t("text", "Reconnect")))]
                  )
                ])
              : _vm.hasSyncCollission
              ? _c("p", { staticClass: "msg icon-error" }, [
                  _vm._v(
                    "\n\t\t\t" +
                      _vm._s(
                        _vm.t(
                          "text",
                          "The document has been changed outside of the editor. The changes cannot be applied."
                        )
                      ) +
                      "\n\t\t"
                  )
                ])
              : _vm.hasConnectionIssue
              ? _c("p", { staticClass: "msg" }, [
                  _vm._v(
                    "\n\t\t\t" +
                      _vm._s(
                        _vm.t(
                          "text",
                          "File could not be loaded. Please check your internet connection."
                        )
                      ) +
                      " "
                  ),
                  _c(
                    "a",
                    {
                      staticClass: "button primary",
                      on: { click: _vm.reconnect }
                    },
                    [_vm._v(_vm._s(_vm.t("text", "Reconnect")))]
                  )
                ])
              : _vm._e()
          ])
        : _vm._e(),
      _vm._v(" "),
      _vm.currentSession && _vm.active
        ? _c(
            "div",
            {
              class: {
                "has-conflicts": _vm.hasSyncCollission,
                "icon-loading": !_vm.initialLoading && !_vm.hasConnectionIssue,
                richEditor: _vm.isRichEditor,
                "show-color-annotations": _vm.showAuthorAnnotations
              },
              attrs: { id: "editor-wrapper" }
            },
            [
              _c(
                "div",
                { attrs: { id: "editor" } },
                [
                  !_vm.syncError && !_vm.readOnly
                    ? _c(
                        "MenuBar",
                        {
                          ref: "menubar",
                          attrs: {
                            editor: _vm.tiptap,
                            "file-path": _vm.relativePath,
                            "is-rich-editor": _vm.isRichEditor,
                            "is-public": _vm.isPublic,
                            autohide: _vm.autohide
                          }
                        },
                        [
                          _vm.currentSession && _vm.active
                            ? _c(
                                "div",
                                { attrs: { id: "editor-session-list" } },
                                [
                                  _c(
                                    "div",
                                    {
                                      directives: [
                                        {
                                          name: "tooltip",
                                          rawName: "v-tooltip",
                                          value: _vm.lastSavedStatusTooltip,
                                          expression: "lastSavedStatusTooltip"
                                        }
                                      ],
                                      staticClass: "save-status",
                                      class: _vm.lastSavedStatusClass
                                    },
                                    [
                                      _vm._v(
                                        "\n\t\t\t\t\t\t" +
                                          _vm._s(_vm.lastSavedStatus) +
                                          "\n\t\t\t\t\t"
                                      )
                                    ]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "SessionList",
                                    {
                                      attrs: { sessions: _vm.filteredSessions }
                                    },
                                    [
                                      _vm.isPublic &&
                                      _vm.currentSession.guestName
                                        ? _c("GuestNameDialog", {
                                            attrs: {
                                              "sync-service": _vm.syncService
                                            }
                                          })
                                        : _vm._e()
                                    ],
                                    1
                                  )
                                ],
                                1
                              )
                            : _vm._e(),
                          _vm._v(" "),
                          _vm._t("header")
                        ],
                        2
                      )
                    : _vm._e(),
                  _vm._v(" "),
                  _c(
                    "div",
                    { staticClass: "content-wrapper" },
                    [
                      !_vm.readOnly && _vm.isRichEditor
                        ? _c("MenuBubble", {
                            attrs: {
                              editor: _vm.tiptap,
                              "file-path": _vm.relativePath
                            }
                          })
                        : _vm._e(),
                      _vm._v(" "),
                      _c("EditorContent", {
                        directives: [
                          {
                            name: "show",
                            rawName: "v-show",
                            value: _vm.initialLoading,
                            expression: "initialLoading"
                          }
                        ],
                        staticClass: "editor__content",
                        attrs: { editor: _vm.tiptap }
                      })
                    ],
                    1
                  )
                ],
                1
              ),
              _vm._v(" "),
              _vm.hasSyncCollission
                ? _c("ReadOnlyEditor", {
                    attrs: {
                      content: _vm.syncError.data.outsideChange,
                      "is-rich-editor": _vm.isRichEditor
                    }
                  })
                : _vm._e()
            ],
            1
          )
        : _vm._e(),
      _vm._v(" "),
      _vm.hasSyncCollission && !_vm.readOnly
        ? _c("CollisionResolveDialog", {
            on: {
              resolveUseThisVersion: _vm.resolveUseThisVersion,
              resolveUseServerVersion: _vm.resolveUseServerVersion
            }
          })
        : _vm._e()
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/components/ReadOnlyEditor.vue?vue&type=template&id=41c92d1f&":
/*!********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/components/ReadOnlyEditor.vue?vue&type=template&id=41c92d1f& ***!
  \********************************************************************************************************************************************************************************************************/
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
  return _vm.editor
    ? _c("EditorContent", {
        attrs: { id: "read-only-editor", editor: _vm.editor }
      })
    : _vm._e()
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/nodes/ImageView.vue?vue&type=template&id=336b1e4e&scoped=true&":
/*!**********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/nodes/ImageView.vue?vue&type=template&id=336b1e4e&scoped=true& ***!
  \**********************************************************************************************************************************************************************************************************/
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
    "div",
    {
      staticClass: "image",
      class: { "icon-loading": !_vm.loaded },
      attrs: { "data-src": _vm.src }
    },
    [
      _vm.imageLoaded && _vm.isSupportedImage
        ? _c(
            "div",
            { staticClass: "image__view" },
            [
              _c("transition", { attrs: { name: "fade" } }, [
                _c("img", {
                  directives: [
                    {
                      name: "show",
                      rawName: "v-show",
                      value: _vm.loaded,
                      expression: "loaded"
                    }
                  ],
                  staticClass: "image__main",
                  attrs: { src: _vm.imageUrl },
                  on: { load: _vm.onLoaded }
                })
              ]),
              _vm._v(" "),
              _c("transition", { attrs: { name: "fade" } }, [
                _c(
                  "div",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: _vm.loaded,
                        expression: "loaded"
                      }
                    ],
                    staticClass: "image__caption"
                  },
                  [
                    _c("input", {
                      ref: "altInput",
                      attrs: { type: "text" },
                      domProps: { value: _vm.alt },
                      on: {
                        keyup: function($event) {
                          if (
                            !$event.type.indexOf("key") &&
                            _vm._k(
                              $event.keyCode,
                              "enter",
                              13,
                              $event.key,
                              "Enter"
                            )
                          ) {
                            return null
                          }
                          return _vm.updateAlt()
                        }
                      }
                    })
                  ]
                )
              ])
            ],
            1
          )
        : _c(
            "div",
            { staticClass: "image__placeholder" },
            [
              _c("transition", { attrs: { name: "fade" } }, [
                _c(
                  "div",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: _vm.loaded,
                        expression: "loaded"
                      }
                    ],
                    staticClass: "image__main"
                  },
                  [
                    _c(
                      "a",
                      {
                        attrs: {
                          href: _vm.internalLinkOrImage,
                          target: "_blank"
                        }
                      },
                      [
                        _c("div", {
                          staticClass: "icon-image",
                          style: _vm.mimeIcon
                        }),
                        _vm._v(" "),
                        !_vm.isSupportedImage
                          ? _c("p", [_vm._v(_vm._s(_vm.alt))])
                          : _vm._e()
                      ]
                    )
                  ]
                )
              ]),
              _c("transition", { attrs: { name: "fade" } }, [
                _c(
                  "div",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: _vm.loaded,
                        expression: "loaded"
                      }
                    ],
                    staticClass: "image__caption"
                  },
                  [
                    _c("input", {
                      ref: "altInput",
                      attrs: { type: "text" },
                      domProps: { value: _vm.alt },
                      on: {
                        keyup: function($event) {
                          if (
                            !$event.type.indexOf("key") &&
                            _vm._k(
                              $event.keyCode,
                              "enter",
                              13,
                              $event.key,
                              "Enter"
                            )
                          ) {
                            return null
                          }
                          return _vm.updateAlt()
                        }
                      }
                    })
                  ]
                )
              ])
            ],
            1
          )
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/views/DirectEditing.vue?vue&type=template&id=37e36225&scoped=true&":
/*!**************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/views/DirectEditing.vue?vue&type=template&id=37e36225&scoped=true& ***!
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
  return _c(
    "div",
    { class: { "icon-loading": _vm.saving }, attrs: { id: "direct-editor" } },
    [
      _c("EditorWrapper", {
        ref: "editor",
        attrs: {
          "initial-session": _vm.initialSession,
          active: true,
          mime: _vm.initial.mimetype,
          "is-direct-editing": true
        },
        on: { ready: _vm.loaded },
        scopedSlots: _vm._u([
          {
            key: "header",
            fn: function() {
              return [
                _c("button", {
                  staticClass: "icon-share",
                  on: { click: _vm.share }
                }),
                _vm._v(" "),
                _c("button", {
                  staticClass: "icon-close",
                  on: { click: _vm.close }
                })
              ]
            },
            proxy: true
          }
        ])
      })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./src/EditorFactory.js":
/*!******************************!*\
  !*** ./src/EditorFactory.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadSyntaxHighlight = exports.serializePlainText = exports.createMarkdownSerializer = exports.createEditor = exports.markdownit = exports.default = void 0;

var _tiptap = __webpack_require__(/*! tiptap */ "./node_modules/tiptap/dist/tiptap.esm.js");

var _tiptapExtensions = __webpack_require__(/*! tiptap-extensions */ "./node_modules/tiptap-extensions/dist/extensions.esm.js");

var _marks2 = __webpack_require__(/*! ./marks */ "./src/marks/index.js");

var _nodes2 = __webpack_require__(/*! ./nodes */ "./src/nodes/index.js");

var _markdownIt = _interopRequireDefault(__webpack_require__(/*! markdown-it */ "./node_modules/markdown-it/index.js"));

var _markdownItTaskLists = _interopRequireDefault(__webpack_require__(/*! markdown-it-task-lists */ "./node_modules/markdown-it-task-lists/index.js"));

var _l10n = __webpack_require__(/*! @nextcloud/l10n */ "./node_modules/@nextcloud/l10n/dist/index.js");

__webpack_require__(/*! proxy-polyfill */ "./node_modules/proxy-polyfill/src/index.js");

var _prosemirrorMarkdown = __webpack_require__(/*! prosemirror-markdown */ "./node_modules/prosemirror-markdown/dist/index.es.js");

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

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var loadSyntaxHighlight = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(language) {
    var languages, modules, i, lang;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            languages = [language];
            modules = {};
            i = 0;

          case 3:
            if (!(i < languages.length)) {
              _context.next = 17;
              break;
            }

            _context.prev = 4;
            _context.next = 7;
            return __webpack_require__("./node_modules/highlight.js/lib/languages lazy recursive ^\\.\\/.*$")("./" + languages[i]);

          case 7:
            lang = _context.sent;
            modules[languages[i]] = lang.default;
            _context.next = 14;
            break;

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](4);
            return _context.abrupt("return", undefined);

          case 14:
            i++;
            _context.next = 3;
            break;

          case 17:
            if (!(Object.keys(modules).length === 0 && modules.constructor === Object)) {
              _context.next = 19;
              break;
            }

            return _context.abrupt("return", undefined);

          case 19:
            return _context.abrupt("return", {
              languages: modules
            });

          case 20:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[4, 11]]);
  }));

  return function loadSyntaxHighlight(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.loadSyntaxHighlight = loadSyntaxHighlight;

var createEditor = function createEditor(_ref2) {
  var content = _ref2.content,
      onInit = _ref2.onInit,
      onUpdate = _ref2.onUpdate,
      extensions = _ref2.extensions,
      enableRichEditing = _ref2.enableRichEditing,
      languages = _ref2.languages;
  var richEditingExtensions = [];

  if (enableRichEditing) {
    richEditingExtensions = [new _tiptapExtensions.Heading(), new _tiptapExtensions.Code(), new _marks2.Strong(), new _marks2.Italic(), new _marks2.Strike(), new _tiptapExtensions.HardBreak(), new _tiptapExtensions.HorizontalRule(), new _nodes2.BulletList(), new _tiptapExtensions.OrderedList(), new _tiptapExtensions.Blockquote(), new _tiptapExtensions.CodeBlock(), new _nodes2.ListItem(), new _marks2.Link({
      openOnClick: true
    }), new _nodes2.Image(), new _tiptapExtensions.Placeholder({
      emptyNodeClass: 'is-empty',
      emptyNodeText: (0, _l10n.translate)('text', 'Add notes, lists or links …'),
      showOnlyWhenEditable: true
    })];
  } else {
    richEditingExtensions = [new _nodes2.PlainTextDocument(), new _tiptap.Text(), new _tiptapExtensions.CodeBlockHighlight(_objectSpread({}, languages))];
  }

  extensions = extensions || [];
  return new _tiptap.Editor({
    content: content,
    onInit: onInit,
    onUpdate: onUpdate,
    extensions: [].concat(_toConsumableArray(richEditingExtensions), [new _tiptapExtensions.History()]).concat(extensions),
    useBuiltInExtensions: enableRichEditing
  });
};

exports.createEditor = createEditor;
var markdownit = (0, _markdownIt.default)('commonmark', {
  html: false,
  breaks: false
}).enable('strikethrough').use(_markdownItTaskLists.default, {
  enable: true,
  labelAfter: true
});
exports.markdownit = markdownit;

var SerializeException = function SerializeException(message) {
  this.message = message;
};

var createMarkdownSerializer = function createMarkdownSerializer(_nodes, _marks) {
  var nodes = Object.entries(_nodes).filter(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
        node = _ref4[1];

    return node.toMarkdown;
  }).reduce(function (items, _ref5) {
    var _ref6 = _slicedToArray(_ref5, 2),
        name = _ref6[0],
        toMarkdown = _ref6[1].toMarkdown;

    return _objectSpread(_objectSpread({}, items), {}, _defineProperty({}, name, toMarkdown));
  }, {});
  var marks = Object.entries(_marks).filter(function (_ref7) {
    var _ref8 = _slicedToArray(_ref7, 2),
        node = _ref8[1];

    return node.toMarkdown;
  }).reduce(function (items, _ref9) {
    var _ref10 = _slicedToArray(_ref9, 2),
        name = _ref10[0],
        toMarkdown = _ref10[1].toMarkdown;

    return _objectSpread(_objectSpread({}, items), {}, _defineProperty({}, name, toMarkdown));
  }, {});
  return {
    serializer: new _prosemirrorMarkdown.MarkdownSerializer(_objectSpread(_objectSpread({}, _prosemirrorMarkdown.defaultMarkdownSerializer.nodes), nodes), _objectSpread(_objectSpread({}, _prosemirrorMarkdown.defaultMarkdownSerializer.marks), marks)),
    serialize: function serialize(content, options) {
      return this.serializer.serialize(content, _objectSpread(_objectSpread({}, options), {}, {
        tightLists: true
      })).split('\\[').join('[').split('\\]').join(']');
    }
  };
};

exports.createMarkdownSerializer = createMarkdownSerializer;

var serializePlainText = function serializePlainText(tiptap) {
  var doc = tiptap.getJSON();

  if (doc.content.length !== 1 || typeof doc.content[0].content === 'undefined' || doc.content[0].content.length !== 1) {
    if (doc.content[0].type === 'code_block' && typeof doc.content[0].content === 'undefined') {
      return '';
    }

    throw new SerializeException('Failed to serialize document to plain text');
  }

  var codeBlock = doc.content[0].content[0];

  if (codeBlock.type !== 'text') {
    throw new SerializeException('Failed to serialize document to plain text');
  }

  return codeBlock.text;
};

exports.serializePlainText = serializePlainText;
var _default = createEditor;
exports.default = _default;

/***/ }),

/***/ "./src/commands/index.js":
/*!*******************************!*\
  !*** ./src/commands/index.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "listInputRule", {
  enumerable: true,
  get: function get() {
    return _listInputRule.default;
  }
});

var _listInputRule = _interopRequireDefault(__webpack_require__(/*! ./listInputRule */ "./src/commands/listInputRule.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ "./src/commands/listInputRule.js":
/*!***************************************!*\
  !*** ./src/commands/listInputRule.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _prosemirrorInputrules = __webpack_require__(/*! prosemirror-inputrules */ "./node_modules/prosemirror-inputrules/dist/index.es.js");

/*
 * @copyright Copyright (c) 2021 Jonas Meurer <jonas@freesources.org>
 *
 * @author Jonas Meurer <jonas@freesources.org>
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
function _default(regexp, nodeType, getAttrs) {
  return new _prosemirrorInputrules.InputRule(regexp, function (state, match, start, end) {
    var tr = (0, _prosemirrorInputrules.wrappingInputRule)(regexp, nodeType).handler(state, match, start, end); // Insert the first character after bullet

    if (match.length >= 3) {
      tr.insertText(match[2]);
    }

    return tr;
  });
}

/***/ }),

/***/ "./src/components/CollisionResolveDialog.vue":
/*!***************************************************!*\
  !*** ./src/components/CollisionResolveDialog.vue ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CollisionResolveDialog_vue_vue_type_template_id_5ffe7972_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CollisionResolveDialog.vue?vue&type=template&id=5ffe7972&scoped=true& */ "./src/components/CollisionResolveDialog.vue?vue&type=template&id=5ffe7972&scoped=true&");
/* harmony import */ var _CollisionResolveDialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CollisionResolveDialog.vue?vue&type=script&lang=js& */ "./src/components/CollisionResolveDialog.vue?vue&type=script&lang=js&");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _CollisionResolveDialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _CollisionResolveDialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _CollisionResolveDialog_vue_vue_type_style_index_0_id_5ffe7972_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CollisionResolveDialog.vue?vue&type=style&index=0&id=5ffe7972&scoped=true&lang=scss& */ "./src/components/CollisionResolveDialog.vue?vue&type=style&index=0&id=5ffe7972&scoped=true&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _CollisionResolveDialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _CollisionResolveDialog_vue_vue_type_template_id_5ffe7972_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _CollisionResolveDialog_vue_vue_type_template_id_5ffe7972_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "5ffe7972",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/components/CollisionResolveDialog.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/components/CollisionResolveDialog.vue?vue&type=script&lang=js&":
/*!****************************************************************************!*\
  !*** ./src/components/CollisionResolveDialog.vue?vue&type=script&lang=js& ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_CollisionResolveDialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib!../../node_modules/vue-loader/lib??vue-loader-options!./CollisionResolveDialog.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/components/CollisionResolveDialog.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_CollisionResolveDialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_CollisionResolveDialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_CollisionResolveDialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_CollisionResolveDialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_CollisionResolveDialog_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/components/CollisionResolveDialog.vue?vue&type=style&index=0&id=5ffe7972&scoped=true&lang=scss&":
/*!*************************************************************************************************************!*\
  !*** ./src/components/CollisionResolveDialog.vue?vue&type=style&index=0&id=5ffe7972&scoped=true&lang=scss& ***!
  \*************************************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_CollisionResolveDialog_vue_vue_type_style_index_0_id_5ffe7972_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/style-loader/dist/cjs.js!../../node_modules/css-loader/dist/cjs.js!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/sass-loader/dist/cjs.js!../../node_modules/vue-loader/lib??vue-loader-options!./CollisionResolveDialog.vue?vue&type=style&index=0&id=5ffe7972&scoped=true&lang=scss& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/components/CollisionResolveDialog.vue?vue&type=style&index=0&id=5ffe7972&scoped=true&lang=scss&");
/* empty/unused harmony star reexport */

/***/ }),

/***/ "./src/components/CollisionResolveDialog.vue?vue&type=template&id=5ffe7972&scoped=true&":
/*!**********************************************************************************************!*\
  !*** ./src/components/CollisionResolveDialog.vue?vue&type=template&id=5ffe7972&scoped=true& ***!
  \**********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CollisionResolveDialog_vue_vue_type_template_id_5ffe7972_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib??vue-loader-options!./CollisionResolveDialog.vue?vue&type=template&id=5ffe7972&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/components/CollisionResolveDialog.vue?vue&type=template&id=5ffe7972&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CollisionResolveDialog_vue_vue_type_template_id_5ffe7972_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CollisionResolveDialog_vue_vue_type_template_id_5ffe7972_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/components/EditorWrapper.vue":
/*!******************************************!*\
  !*** ./src/components/EditorWrapper.vue ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _EditorWrapper_vue_vue_type_template_id_76135766_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EditorWrapper.vue?vue&type=template&id=76135766&scoped=true& */ "./src/components/EditorWrapper.vue?vue&type=template&id=76135766&scoped=true&");
/* harmony import */ var _EditorWrapper_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EditorWrapper.vue?vue&type=script&lang=js& */ "./src/components/EditorWrapper.vue?vue&type=script&lang=js&");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _EditorWrapper_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _EditorWrapper_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _EditorWrapper_vue_vue_type_style_index_0_id_76135766_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./EditorWrapper.vue?vue&type=style&index=0&id=76135766&scoped=true&lang=scss& */ "./src/components/EditorWrapper.vue?vue&type=style&index=0&id=76135766&scoped=true&lang=scss&");
/* harmony import */ var _EditorWrapper_vue_vue_type_style_index_1_lang_scss___WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./EditorWrapper.vue?vue&type=style&index=1&lang=scss& */ "./src/components/EditorWrapper.vue?vue&type=style&index=1&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");







/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_4__["default"])(
  _EditorWrapper_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _EditorWrapper_vue_vue_type_template_id_76135766_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _EditorWrapper_vue_vue_type_template_id_76135766_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "76135766",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/components/EditorWrapper.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/components/EditorWrapper.vue?vue&type=script&lang=js&":
/*!*******************************************************************!*\
  !*** ./src/components/EditorWrapper.vue?vue&type=script&lang=js& ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_EditorWrapper_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib!../../node_modules/vue-loader/lib??vue-loader-options!./EditorWrapper.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/components/EditorWrapper.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_EditorWrapper_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_EditorWrapper_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_EditorWrapper_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_EditorWrapper_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_EditorWrapper_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/components/EditorWrapper.vue?vue&type=style&index=0&id=76135766&scoped=true&lang=scss&":
/*!****************************************************************************************************!*\
  !*** ./src/components/EditorWrapper.vue?vue&type=style&index=0&id=76135766&scoped=true&lang=scss& ***!
  \****************************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_EditorWrapper_vue_vue_type_style_index_0_id_76135766_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/style-loader/dist/cjs.js!../../node_modules/css-loader/dist/cjs.js!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/sass-loader/dist/cjs.js!../../node_modules/vue-loader/lib??vue-loader-options!./EditorWrapper.vue?vue&type=style&index=0&id=76135766&scoped=true&lang=scss& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/components/EditorWrapper.vue?vue&type=style&index=0&id=76135766&scoped=true&lang=scss&");
/* empty/unused harmony star reexport */

/***/ }),

/***/ "./src/components/EditorWrapper.vue?vue&type=style&index=1&lang=scss&":
/*!****************************************************************************!*\
  !*** ./src/components/EditorWrapper.vue?vue&type=style&index=1&lang=scss& ***!
  \****************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_EditorWrapper_vue_vue_type_style_index_1_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/style-loader/dist/cjs.js!../../node_modules/css-loader/dist/cjs.js!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/sass-loader/dist/cjs.js!../../node_modules/vue-loader/lib??vue-loader-options!./EditorWrapper.vue?vue&type=style&index=1&lang=scss& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/components/EditorWrapper.vue?vue&type=style&index=1&lang=scss&");
/* empty/unused harmony star reexport */

/***/ }),

/***/ "./src/components/EditorWrapper.vue?vue&type=template&id=76135766&scoped=true&":
/*!*************************************************************************************!*\
  !*** ./src/components/EditorWrapper.vue?vue&type=template&id=76135766&scoped=true& ***!
  \*************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_EditorWrapper_vue_vue_type_template_id_76135766_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib??vue-loader-options!./EditorWrapper.vue?vue&type=template&id=76135766&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/components/EditorWrapper.vue?vue&type=template&id=76135766&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_EditorWrapper_vue_vue_type_template_id_76135766_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_EditorWrapper_vue_vue_type_template_id_76135766_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/components/ReadOnlyEditor.vue":
/*!*******************************************!*\
  !*** ./src/components/ReadOnlyEditor.vue ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ReadOnlyEditor_vue_vue_type_template_id_41c92d1f___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ReadOnlyEditor.vue?vue&type=template&id=41c92d1f& */ "./src/components/ReadOnlyEditor.vue?vue&type=template&id=41c92d1f&");
/* harmony import */ var _ReadOnlyEditor_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ReadOnlyEditor.vue?vue&type=script&lang=js& */ "./src/components/ReadOnlyEditor.vue?vue&type=script&lang=js&");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _ReadOnlyEditor_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _ReadOnlyEditor_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _ReadOnlyEditor_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ReadOnlyEditor.vue?vue&type=style&index=0&lang=scss& */ "./src/components/ReadOnlyEditor.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _ReadOnlyEditor_vue_vue_type_style_index_1_lang_scss___WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ReadOnlyEditor.vue?vue&type=style&index=1&lang=scss& */ "./src/components/ReadOnlyEditor.vue?vue&type=style&index=1&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");







/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_4__["default"])(
  _ReadOnlyEditor_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ReadOnlyEditor_vue_vue_type_template_id_41c92d1f___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ReadOnlyEditor_vue_vue_type_template_id_41c92d1f___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/components/ReadOnlyEditor.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/components/ReadOnlyEditor.vue?vue&type=script&lang=js&":
/*!********************************************************************!*\
  !*** ./src/components/ReadOnlyEditor.vue?vue&type=script&lang=js& ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ReadOnlyEditor_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib!../../node_modules/vue-loader/lib??vue-loader-options!./ReadOnlyEditor.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/components/ReadOnlyEditor.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ReadOnlyEditor_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ReadOnlyEditor_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ReadOnlyEditor_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ReadOnlyEditor_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ReadOnlyEditor_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/components/ReadOnlyEditor.vue?vue&type=style&index=0&lang=scss&":
/*!*****************************************************************************!*\
  !*** ./src/components/ReadOnlyEditor.vue?vue&type=style&index=0&lang=scss& ***!
  \*****************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ReadOnlyEditor_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/style-loader/dist/cjs.js!../../node_modules/css-loader/dist/cjs.js!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/sass-loader/dist/cjs.js!../../node_modules/vue-loader/lib??vue-loader-options!./ReadOnlyEditor.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/components/ReadOnlyEditor.vue?vue&type=style&index=0&lang=scss&");
/* empty/unused harmony star reexport */

/***/ }),

/***/ "./src/components/ReadOnlyEditor.vue?vue&type=style&index=1&lang=scss&":
/*!*****************************************************************************!*\
  !*** ./src/components/ReadOnlyEditor.vue?vue&type=style&index=1&lang=scss& ***!
  \*****************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ReadOnlyEditor_vue_vue_type_style_index_1_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/style-loader/dist/cjs.js!../../node_modules/css-loader/dist/cjs.js!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/sass-loader/dist/cjs.js!../../node_modules/vue-loader/lib??vue-loader-options!./ReadOnlyEditor.vue?vue&type=style&index=1&lang=scss& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/components/ReadOnlyEditor.vue?vue&type=style&index=1&lang=scss&");
/* empty/unused harmony star reexport */

/***/ }),

/***/ "./src/components/ReadOnlyEditor.vue?vue&type=template&id=41c92d1f&":
/*!**************************************************************************!*\
  !*** ./src/components/ReadOnlyEditor.vue?vue&type=template&id=41c92d1f& ***!
  \**************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ReadOnlyEditor_vue_vue_type_template_id_41c92d1f___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib??vue-loader-options!./ReadOnlyEditor.vue?vue&type=template&id=41c92d1f& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/components/ReadOnlyEditor.vue?vue&type=template&id=41c92d1f&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ReadOnlyEditor_vue_vue_type_template_id_41c92d1f___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ReadOnlyEditor_vue_vue_type_template_id_41c92d1f___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/extensions/Keymap.js":
/*!**********************************!*\
  !*** ./src/extensions/Keymap.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tiptap = __webpack_require__(/*! tiptap */ "./node_modules/tiptap/dist/tiptap.esm.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var Keymap = /*#__PURE__*/function (_Extension) {
  _inherits(Keymap, _Extension);

  var _super = _createSuper(Keymap);

  function Keymap() {
    _classCallCheck(this, Keymap);

    return _super.apply(this, arguments);
  }

  _createClass(Keymap, [{
    key: "name",
    get: function get() {
      return 'customkeymap';
    }
  }, {
    key: "keys",
    value: function keys(_ref) {
      var schema = _ref.schema;
      return this.options;
    }
  }, {
    key: "plugins",
    get: function get() {
      return [new _tiptap.Plugin({
        props: {
          handleKeyDown: function handleKeyDown(view, event) {
            var key = event.key || event.keyCode;

            if ((event.ctrlKey || event.metaKey) && !event.shiftKey && (key === 'f' || key === 70)) {
              // We need to stop propagation and dispatch the event on the window
              // in order to force triggering the browser native search in the text editor
              event.stopPropagation();
              window.dispatchEvent(event);
              return true;
            }
          }
        }
      })];
    }
  }]);

  return Keymap;
}(_tiptap.Extension);

exports.default = Keymap;

/***/ }),

/***/ "./src/extensions/UserColor.js":
/*!*************************************!*\
  !*** ./src/extensions/UserColor.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tiptap = __webpack_require__(/*! tiptap */ "./node_modules/tiptap/dist/tiptap.esm.js");

var _prosemirrorView = __webpack_require__(/*! prosemirror-view */ "./node_modules/prosemirror-view/dist/index.es.js");

var _TrackState = _interopRequireDefault(__webpack_require__(/*! ./tracking/TrackState */ "./src/extensions/tracking/TrackState.js"));

var _models = __webpack_require__(/*! ./tracking/models */ "./src/extensions/tracking/models.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var UserColor = /*#__PURE__*/function (_Extension) {
  _inherits(UserColor, _Extension);

  var _super = _createSuper(UserColor);

  function UserColor() {
    _classCallCheck(this, UserColor);

    return _super.apply(this, arguments);
  }

  _createClass(UserColor, [{
    key: "name",
    get: function get() {
      return 'users';
    }
  }, {
    key: "defaultOptions",
    get: function get() {
      return {
        clientID: 0,
        color: function color(clientID) {
          return '#' + Math.floor(Math.abs(Math.sin(clientID) * 16777215) % 16777215).toString(16) + 'aa';
        },
        name: function name(clientID) {
          return 'Unknown user ' + clientID;
        }
      };
    }
  }, {
    key: "plugins",
    get: function get() {
      return [new _tiptap.Plugin({
        clientID: this.options.clientID,
        color: this.options.color,
        name: this.options.name,
        state: {
          init: function init(_, instance) {
            return {
              tracked: new _TrackState.default([new _models.Span(0, instance.doc.content.size, null)], [], [], []),
              deco: _prosemirrorView.DecorationSet.empty
            };
          },
          apply: function apply(tr, instance, oldState, state) {
            var _this = this;

            var tracked = instance.tracked,
                decos = instance.decos;
            var tState = this.getState(oldState).tracked;

            if (tr.docChanged) {
              if (!tr.getMeta('clientID')) {
                // we have an undefined client id for own transactions
                tr.setMeta('clientID', tr.steps.map(function (i) {
                  return _this.spec.clientID;
                }));
              }

              tracked = tracked.applyTransform(tr);
              tState = tracked;
            }

            decos = tState.blameMap.map(function (span) {
              var clientID = span.author;
              return _prosemirrorView.Decoration.inline(span.from, span.to, {
                class: 'author-annotation',
                style: 'background-color: ' + _this.spec.color(clientID) + '66;',
                title: _this.spec.name(clientID)
              });
            }).filter(function (dec) {
              return dec !== null;
            });
            return {
              tracked: tracked,
              deco: _prosemirrorView.DecorationSet.create(state.doc, decos)
            };
          }
        },
        props: {
          decorations: function decorations(state) {
            return this.getState(state).deco;
          }
        }
      })];
    }
  }]);

  return UserColor;
}(_tiptap.Extension);

exports.default = UserColor;

/***/ }),

/***/ "./src/extensions/index.js":
/*!*********************************!*\
  !*** ./src/extensions/index.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Keymap", {
  enumerable: true,
  get: function get() {
    return _Keymap.default;
  }
});
Object.defineProperty(exports, "UserColor", {
  enumerable: true,
  get: function get() {
    return _UserColor.default;
  }
});

var _Keymap = _interopRequireDefault(__webpack_require__(/*! ./Keymap */ "./src/extensions/Keymap.js"));

var _UserColor = _interopRequireDefault(__webpack_require__(/*! ./UserColor */ "./src/extensions/UserColor.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ "./src/extensions/tracking/TrackState.js":
/*!***********************************************!*\
  !*** ./src/extensions/tracking/TrackState.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _models = __webpack_require__(/*! ./models */ "./src/extensions/tracking/models.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*
 * This code is heavily inspired by the change tracking example of prosemirror
 * https://github.com/ProseMirror/website/blob/master/example/track/index.js
 */
function updateBlameMap(map, transform, clientIDs) {
  var result = [];
  var mapping = transform.mapping;

  for (var i = 0; i < map.length; i++) {
    var span = map[i];
    var from = mapping.map(span.from, 1);
    var to = mapping.map(span.to, -1);
    if (from < to) result.push(new _models.Span(from, to, span.author));
  }

  var _loop = function _loop(_i) {
    var map = mapping.maps[_i];
    var after = mapping.slice(_i + 1);
    map.forEach(function (_s, _e, start, end) {
      insertIntoBlameMap(result, after.map(start, 1), after.map(end, -1), clientIDs[_i]);
    });
  };

  for (var _i = 0; _i < mapping.maps.length; _i++) {
    _loop(_i);
  }

  return result;
}

function insertIntoBlameMap(map, from, to, author) {
  if (from >= to) {
    return;
  }

  var pos = 0;
  var next;

  for (; pos < map.length; pos++) {
    next = map[pos];

    if (next.author === author) {
      if (next.to >= from) break;
    } else if (next.to > from) {
      // Different author, not before
      if (next.from < from) {
        // Sticks out to the left (loop below will handle right side)
        var left = new _models.Span(next.from, from, next.author);
        if (next.to > to) map.splice(pos++, 0, left);else map[pos++] = left;
      }

      break;
    }
  } // eslint-ignore


  while (next = map[pos]) {
    if (next.author === author) {
      if (next.from > to) break;
      from = Math.min(from, next.from);
      to = Math.max(to, next.to);
      map.splice(pos, 1);
    } else {
      if (next.from >= to) break;

      if (next.to > to) {
        map[pos] = new _models.Span(to, next.to, next.author);
        break;
      } else {
        map.splice(pos, 1);
      }
    }
  }

  map.splice(pos, 0, new _models.Span(from, to, author));
}

var TrackState = /*#__PURE__*/function () {
  function TrackState(blameMap) {
    _classCallCheck(this, TrackState);

    // The blame map is a data structure that lists a sequence of
    // document ranges, along with the author that inserted them. This
    // can be used to, for example, highlight the part of the document
    // that was inserted by a author.
    this.blameMap = blameMap;
  } // Apply a transform to this state


  _createClass(TrackState, [{
    key: "applyTransform",
    value: function applyTransform(transform) {
      var _transform$getMeta;

      var clientID = (_transform$getMeta = transform.getMeta('clientID')) !== null && _transform$getMeta !== void 0 ? _transform$getMeta : transform.steps.map(function (item) {
        return 'self';
      });
      var newBlame = updateBlameMap(this.blameMap, transform, clientID); // Create a new state—since these are part of the editor state, a
      // persistent data structure, they must not be mutated.

      return new TrackState(newBlame);
    }
  }]);

  return TrackState;
}();

exports.default = TrackState;

/***/ }),

/***/ "./src/extensions/tracking/models.js":
/*!*******************************************!*\
  !*** ./src/extensions/tracking/models.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Span = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 * @copyright Copyright (c) 2020 Julius Härtl <jus@bitgrid.net>
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
var Span = function Span(from, to, author) {
  _classCallCheck(this, Span);

  this.from = from;
  this.to = to;
  this.author = author;
};

exports.Span = Span;

/***/ }),

/***/ "./src/helpers/index.js":
/*!******************************!*\
  !*** ./src/helpers/index.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRandomGuestName = exports.endpointUrl = exports.documentReady = void 0;

var _router = __webpack_require__(/*! @nextcloud/router */ "./node_modules/@nextcloud/router/dist/index.js");

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

/**
 * Callback that should be executed after the document is ready
 * @param callback
 */
var documentReady = function documentReady(callback) {
  var fn = function fn() {
    return setTimeout(callback, 0);
  };

  if (document.attachEvent ? document.readyState === 'complete' : document.readyState !== 'loading') {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', callback);
  }
};

exports.documentReady = documentReady;

var _baseUrl = (0, _router.generateUrl)('/apps/text');

var endpointUrl = function endpointUrl(endpoint) {
  var isPublic = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (isPublic) {
    return "".concat(_baseUrl, "/public/").concat(endpoint);
  }

  return "".concat(_baseUrl, "/").concat(endpoint);
};

exports.endpointUrl = endpointUrl;
var randomGuestNames = ['Artichoke', 'Arugula', 'Asparagus', 'Avocado', 'Bamboo Shoot', 'Bean Sprout', 'Bean', 'Beet', 'Belgian Endive', 'Bell Pepper', 'Bitter Melon', 'Bitter Gourd', 'Bok Choy', 'Broccoli', 'Brussels Sprout', 'Burdock Root', 'Cabbage', 'Calabash', 'Caper', 'Carrot', 'Cassava', 'Cauliflower', 'Celery', 'Celery Root', 'Celtuce', 'Chayote', 'Chinese Broccoli', 'Corn', 'Baby Corn', 'Cucumber', 'English Cucumber', 'Gherkin', 'Pickling Cucumber', 'Daikon Radish', 'Edamame', 'Eggplant', 'Elephant Garlic', 'Endive', 'Curly', 'Escarole', 'Fennel', 'Fiddlehead', 'Galangal', 'Garlic', 'Ginger', 'Grape Leave', 'Green Bean', 'Wax Bean', 'Green', 'Amaranth Leave', 'Beet Green', 'Collard Green', 'Dandelion Green', 'Kale', 'Kohlrabi Green', 'Mustard Green', 'Rapini', 'Spinach', 'Swiss Chard', 'Turnip Green', 'Hearts of Palm', 'Horseradish', 'Jerusalem Artichoke', 'Jícama', 'Kale', 'Curly', 'Lacinato', 'Ornamental', 'Kohlrabi', 'Leeks', 'Lemongrass', 'Lettuce', 'Butterhead', 'Iceberg', 'Leaf', 'Romaine', 'Lotus Root', 'Lotus Seed', 'Mushroom', 'Napa Cabbage', 'Nopales', 'Okra', 'Olive', 'Onion', 'Green Onion', 'Parsley', 'Parsley Root', 'Parsnip', 'Pepper', 'Plantain', 'Potato', 'Pumpkin', 'Purslane', 'Radicchio', 'Radish', 'Rutabaga', 'Shallots', 'Spinach', 'Squash', 'Sweet Potato', 'Swiss Chard', 'Taro', 'Tomatillo', 'Tomato', 'Turnip', 'Water Chestnut', 'Water Spinach', 'Watercress', 'Winter Melon', 'Yams', 'Zucchini'];

var getRandomGuestName = function getRandomGuestName() {
  return randomGuestNames[Math.floor(Math.random() * randomGuestNames.length)];
};

exports.getRandomGuestName = getRandomGuestName;

/***/ }),

/***/ "./src/helpers/links.js":
/*!******************************!*\
  !*** ./src/helpers/links.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseHref = exports.domHref = void 0;

var _router = __webpack_require__(/*! @nextcloud/router */ "./node_modules/@nextcloud/router/dist/index.js");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var absolutePath = function absolutePath(base, rel) {
  if (!rel) {
    return base;
  }

  if (rel[0] === '/') {
    return rel;
  }

  base = base.split('/');
  rel = rel.split('/');

  while (rel[0] === '..' || rel[0] === '.') {
    if (rel[0] === '..') {
      base.pop();
    }

    rel.shift();
  }

  return base.concat(rel).join('/');
};

var basedir = function basedir(file) {
  var end = file.lastIndexOf('/');
  return end > 0 ? file.slice(0, end) : file.slice(0, end + 1); // basedir('/toplevel') should return '/'
};

var domHref = function domHref(node) {
  var ref = node.attrs.href;

  if (!ref) {
    return ref;
  }

  if (ref.match(/^[a-zA-Z]*:/)) {
    return ref;
  }

  var match = ref.match(/^([^?]*)\?fileId=(\d+)/);

  if (match) {
    var _match = _slicedToArray(match, 3),
        relPath = _match[1],
        id = _match[2];

    var currentDir = basedir(OCA.Viewer.file);
    var dir = absolutePath(currentDir, basedir(relPath));
    return (0, _router.generateUrl)("/apps/files/?dir=".concat(dir, "&openfile=").concat(id, "#relPath=").concat(relPath));
  }
};

exports.domHref = domHref;

var parseHref = function parseHref(dom) {
  var ref = dom.getAttribute('href');

  if (!ref) {
    return ref;
  }

  var match = ref.match(/\?dir=([^&]*)&openfile=([^&]*)#relPath=([^&]*)/);

  if (match) {
    var _match2 = _slicedToArray(match, 4),
        id = _match2[2],
        path = _match2[3];

    return "".concat(path, "?fileId=").concat(id);
  }

  return ref;
};

exports.parseHref = parseHref;

/***/ }),

/***/ "./src/helpers/mappings.js":
/*!*********************************!*\
  !*** ./src/helpers/mappings.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extensionHighlight = exports.default = void 0;

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
var extensionHighlight = {
  py: 'python',
  gyp: 'python',
  wsgi: 'python',
  htm: 'html',
  xhtml: 'html',
  erl: 'erlang',
  jsp: 'java',
  pl: 'perl',
  rss: 'xml',
  atom: 'xml',
  xsl: 'xml',
  plist: 'xml',
  rb: 'ruby',
  builder: 'ruby',
  gemspec: 'ruby',
  podspec: 'ruby',
  thor: 'ruby',
  diff: 'patch',
  hs: 'haskell',
  icl: 'haskell',
  php3: 'php',
  php4: 'php',
  php5: 'php',
  php6: 'php',
  sh: 'bash',
  zsh: 'bash',
  st: 'smalltalk',
  as: 'actionscript',
  apacheconf: 'apache',
  osacript: 'applescript',
  b: 'brainfuck',
  bf: 'brainfuck',
  clj: 'clojure',
  'cmake.in': 'cmake',
  coffee: 'coffeescript',
  cson: 'coffescript',
  iced: 'coffescript',
  c: 'cpp',
  h: 'cpp',
  'c++': 'cpp',
  'h++': 'cpp',
  hh: 'cpp',
  jinja: 'django',
  bat: 'dos',
  cmd: 'dos',
  fs: 'fsharp',
  hbs: 'handlebars',
  'html.hbs': 'handlebars',
  'html.handlebars': 'handlebars',
  sublime_metrics: 'json',
  sublime_session: 'json',
  'sublime-keymap': 'json',
  'sublime-mousemap': 'json',
  'sublime-project': 'json',
  'sublime-settings': 'json',
  'sublime-workspace': 'json',
  mk: 'makefile',
  mak: 'makefile',
  md: 'markdown',
  mkdown: 'markdown',
  mkd: 'markdown',
  nginxconf: 'nginx',
  m: 'objectivec',
  mm: 'objectivec',
  ml: 'ocaml',
  rs: 'rust',
  sci: 'scilab',
  vb: 'vbnet',
  vbs: 'vbscript'
};
exports.extensionHighlight = extensionHighlight;
var _default = extensionHighlight;
exports.default = _default;

/***/ }),

/***/ "./src/marks/index.js":
/*!****************************!*\
  !*** ./src/marks/index.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Link = exports.Strike = exports.Italic = exports.Strong = void 0;

var _tiptapExtensions = __webpack_require__(/*! tiptap-extensions */ "./node_modules/tiptap-extensions/dist/extensions.esm.js");

var _tiptap = __webpack_require__(/*! tiptap */ "./node_modules/tiptap/dist/tiptap.esm.js");

var _tiptapUtils = __webpack_require__(/*! tiptap-utils */ "./node_modules/tiptap-utils/dist/utils.esm.js");

var _links = __webpack_require__(/*! ./../helpers/links */ "./src/helpers/links.js");

var _EditorFactory = __webpack_require__(/*! ./../EditorFactory */ "./src/EditorFactory.js");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/**
 * This file maps prosemirror mark names to tiptap classes,
 * so we can reuse the prosemirror-markdown default parser for now
 */
var Strong = /*#__PURE__*/function (_Bold) {
  _inherits(Strong, _Bold);

  var _super = _createSuper(Strong);

  function Strong() {
    _classCallCheck(this, Strong);

    return _super.apply(this, arguments);
  }

  _createClass(Strong, [{
    key: "name",
    get: function get() {
      return 'strong';
    }
  }]);

  return Strong;
}(_tiptapExtensions.Bold);

exports.Strong = Strong;

var Italic = /*#__PURE__*/function (_TipTapItalic) {
  _inherits(Italic, _TipTapItalic);

  var _super2 = _createSuper(Italic);

  function Italic() {
    _classCallCheck(this, Italic);

    return _super2.apply(this, arguments);
  }

  _createClass(Italic, [{
    key: "name",
    get: function get() {
      return 'em';
    }
  }]);

  return Italic;
}(_tiptapExtensions.Italic);

exports.Italic = Italic;

var Strike = /*#__PURE__*/function (_TipTapStrike) {
  _inherits(Strike, _TipTapStrike);

  var _super3 = _createSuper(Strike);

  function Strike() {
    _classCallCheck(this, Strike);

    return _super3.apply(this, arguments);
  }

  _createClass(Strike, [{
    key: "schema",
    get: function get() {
      return {
        parseDOM: [{
          tag: 's'
        }, {
          tag: 'del'
        }, {
          tag: 'strike'
        }, {
          style: 'text-decoration',
          getAttrs: function getAttrs(value) {
            return value === 'line-through';
          }
        }],
        toDOM: function toDOM() {
          return ['s', 0];
        },
        toMarkdown: {
          open: '~~',
          close: '~~',
          mixable: true,
          expelEnclosingWhitespace: true
        }
      };
    }
  }]);

  return Strike;
}(_tiptapExtensions.Strike);

exports.Strike = Strike;

var Link = /*#__PURE__*/function (_TipTapLink) {
  _inherits(Link, _TipTapLink);

  var _super4 = _createSuper(Link);

  function Link() {
    _classCallCheck(this, Link);

    return _super4.apply(this, arguments);
  }

  _createClass(Link, [{
    key: "schema",
    get: function get() {
      return {
        attrs: {
          href: {
            default: null
          }
        },
        inclusive: false,
        parseDOM: [{
          tag: 'a[href]',
          getAttrs: function getAttrs(dom) {
            return {
              href: (0, _links.parseHref)(dom)
            };
          }
        }],
        toDOM: function toDOM(node) {
          return ['a', _objectSpread(_objectSpread({}, node.attrs), {}, {
            href: (0, _links.domHref)(node),
            title: node.attrs.href,
            rel: 'noopener noreferrer nofollow'
          }), 0];
        }
      };
    }
  }, {
    key: "plugins",
    get: function get() {
      if (!this.options.openOnClick) {
        return [];
      }

      return [new _tiptap.Plugin({
        props: {
          handleClick: function handleClick(view, pos, event) {
            var schema = view.state.schema;
            var attrs = (0, _tiptapUtils.getMarkAttrs)(view.state, schema.marks.link);
            var isLink = event.target instanceof HTMLAnchorElement || event.target.parentElement instanceof HTMLAnchorElement;

            if (attrs.href && isLink) {
              var linkElement = event.target.parentElement instanceof HTMLAnchorElement ? event.target.parentElement : event.target;
              event.stopPropagation();
              var htmlHref = linkElement.href;

              if (event.button === 0 && !event.ctrlKey && htmlHref.startsWith(window.location.origin)) {
                var query = OC.parseQueryString(htmlHref);
                var fragment = OC.parseQueryString(htmlHref.split('#').pop());

                if (query.dir && fragment.relPath) {
                  var filename = fragment.relPath.split('/').pop();
                  var path = "".concat(query.dir, "/").concat(filename);
                  document.title = "".concat(filename, " - ").concat(OC.theme.title);

                  if (window.location.pathname.match(/apps\/files\/$/)) {// The files app still lacks a popState handler
                    // to allow for using the back button
                    // OC.Util.History.pushState('', htmlHref)
                  }

                  OCA.Viewer.open({
                    path: path
                  });
                  return;
                }
              }

              if (!_EditorFactory.markdownit.validateLink(htmlHref)) {
                console.error('Invalid link', htmlHref);
                return;
              }

              window.open(htmlHref);
            }
          }
        }
      })];
    }
  }]);

  return Link;
}(_tiptapExtensions.Link);
/** Strike is currently unsupported by prosemirror-markdown */


exports.Link = Link;

/***/ }),

/***/ "./src/mixins/isMobile.js":
/*!********************************!*\
  !*** ./src/mixins/isMobile.js ***!
  \********************************/
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
var _default = {
  data: function data() {
    return {
      isMobile: this._isMobile()
    };
  },
  beforeMount: function beforeMount() {
    window.addEventListener('resize', this._onResize);
  },
  beforeDestroy: function beforeDestroy() {
    window.removeEventListener('resize', this._onResize);
  },
  methods: {
    _onResize: function _onResize() {
      // Update mobile mode
      this.isMobile = this._isMobile();
    },
    _isMobile: function _isMobile() {
      // check if content width is under 768px
      return document.documentElement.clientWidth < 768;
    }
  }
};
exports.default = _default;

/***/ }),

/***/ "./src/mixins/store.js":
/*!*****************************!*\
  !*** ./src/mixins/store.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _store = _interopRequireDefault(__webpack_require__(/*! ../store */ "./src/store.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * @copyright Copyright (c) 2021 Julius Härtl <jus@bitgrid.net>
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

/**
 * This mixin is required since we cannot be sure that the root Vue instance has
 * registered the global store. This might be the case if the text app components
 * are mounted in other apps e.g. viewer
 */
var _default = {
  data: function data() {
    return {
      $store: _store.default
    };
  },
  beforeMount: function beforeMount() {
    if (typeof this.$store === 'undefined') {
      this.$store = _store.default;
    }
  }
};
exports.default = _default;

/***/ }),

/***/ "./src/nodes/BulletList.js":
/*!*********************************!*\
  !*** ./src/nodes/BulletList.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tiptapExtensions = __webpack_require__(/*! tiptap-extensions */ "./node_modules/tiptap-extensions/dist/extensions.esm.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var BulletList = /*#__PURE__*/function (_TiptapBulletList) {
  _inherits(BulletList, _TiptapBulletList);

  var _super = _createSuper(BulletList);

  function BulletList() {
    _classCallCheck(this, BulletList);

    return _super.apply(this, arguments);
  }

  _createClass(BulletList, [{
    key: "inputRules",
    value:
    /* The bullet list input rules are handled in the ListItem node so we can make sure that "- [ ]" can still trigger todo list items */
    function inputRules() {
      return [];
    }
  }]);

  return BulletList;
}(_tiptapExtensions.BulletList);

exports.default = BulletList;

/***/ }),

/***/ "./src/nodes/Image.js":
/*!****************************!*\
  !*** ./src/nodes/Image.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tiptapExtensions = __webpack_require__(/*! tiptap-extensions */ "./node_modules/tiptap-extensions/dist/extensions.esm.js");

var _ImageView = _interopRequireDefault(__webpack_require__(/*! ./ImageView */ "./src/nodes/ImageView.vue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var Image = /*#__PURE__*/function (_TiptapImage) {
  _inherits(Image, _TiptapImage);

  var _super = _createSuper(Image);

  function Image() {
    _classCallCheck(this, Image);

    return _super.apply(this, arguments);
  }

  _createClass(Image, [{
    key: "view",
    get: function get() {
      return _ImageView.default;
    }
  }, {
    key: "schema",
    get: function get() {
      return _objectSpread(_objectSpread({}, _get(_getPrototypeOf(Image.prototype), "schema", this)), {}, {
        selectable: false
      });
    }
  }]);

  return Image;
}(_tiptapExtensions.Image);

exports.default = Image;

/***/ }),

/***/ "./src/nodes/ImageView.vue":
/*!*********************************!*\
  !*** ./src/nodes/ImageView.vue ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ImageView_vue_vue_type_template_id_336b1e4e_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ImageView.vue?vue&type=template&id=336b1e4e&scoped=true& */ "./src/nodes/ImageView.vue?vue&type=template&id=336b1e4e&scoped=true&");
/* harmony import */ var _ImageView_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ImageView.vue?vue&type=script&lang=js& */ "./src/nodes/ImageView.vue?vue&type=script&lang=js&");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _ImageView_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _ImageView_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _ImageView_vue_vue_type_style_index_0_id_336b1e4e_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ImageView.vue?vue&type=style&index=0&id=336b1e4e&scoped=true&lang=scss& */ "./src/nodes/ImageView.vue?vue&type=style&index=0&id=336b1e4e&scoped=true&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _ImageView_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ImageView_vue_vue_type_template_id_336b1e4e_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ImageView_vue_vue_type_template_id_336b1e4e_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "336b1e4e",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/nodes/ImageView.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/nodes/ImageView.vue?vue&type=script&lang=js&":
/*!**********************************************************!*\
  !*** ./src/nodes/ImageView.vue?vue&type=script&lang=js& ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ImageView_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib!../../node_modules/vue-loader/lib??vue-loader-options!./ImageView.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/nodes/ImageView.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ImageView_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ImageView_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ImageView_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ImageView_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ImageView_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/nodes/ImageView.vue?vue&type=style&index=0&id=336b1e4e&scoped=true&lang=scss&":
/*!*******************************************************************************************!*\
  !*** ./src/nodes/ImageView.vue?vue&type=style&index=0&id=336b1e4e&scoped=true&lang=scss& ***!
  \*******************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ImageView_vue_vue_type_style_index_0_id_336b1e4e_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/style-loader/dist/cjs.js!../../node_modules/css-loader/dist/cjs.js!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/sass-loader/dist/cjs.js!../../node_modules/vue-loader/lib??vue-loader-options!./ImageView.vue?vue&type=style&index=0&id=336b1e4e&scoped=true&lang=scss& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/nodes/ImageView.vue?vue&type=style&index=0&id=336b1e4e&scoped=true&lang=scss&");
/* empty/unused harmony star reexport */

/***/ }),

/***/ "./src/nodes/ImageView.vue?vue&type=template&id=336b1e4e&scoped=true&":
/*!****************************************************************************!*\
  !*** ./src/nodes/ImageView.vue?vue&type=template&id=336b1e4e&scoped=true& ***!
  \****************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ImageView_vue_vue_type_template_id_336b1e4e_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib??vue-loader-options!./ImageView.vue?vue&type=template&id=336b1e4e&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/nodes/ImageView.vue?vue&type=template&id=336b1e4e&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ImageView_vue_vue_type_template_id_336b1e4e_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ImageView_vue_vue_type_template_id_336b1e4e_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/nodes/ListItem.js":
/*!*******************************!*\
  !*** ./src/nodes/ListItem.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tiptapExtensions = __webpack_require__(/*! tiptap-extensions */ "./node_modules/tiptap-extensions/dist/extensions.esm.js");

var _tiptap = __webpack_require__(/*! tiptap */ "./node_modules/tiptap/dist/tiptap.esm.js");

var _tiptapCommands = __webpack_require__(/*! tiptap-commands */ "./node_modules/tiptap-commands/dist/commands.esm.js");

var _prosemirrorUtils = __webpack_require__(/*! prosemirror-utils */ "./node_modules/prosemirror-utils/dist/index.js");

var _commands = __webpack_require__(/*! ../commands */ "./src/commands/index.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var TYPES = {
  BULLET: 0,
  CHECKBOX: 1
};

var getParentList = function getParentList(schema, selection) {
  return (0, _prosemirrorUtils.findParentNode)(function (node) {
    return node.type === schema.nodes.list_item;
  })(selection);
};

var ListItem = /*#__PURE__*/function (_TiptapListItem) {
  _inherits(ListItem, _TiptapListItem);

  var _super = _createSuper(ListItem);

  function ListItem() {
    _classCallCheck(this, ListItem);

    return _super.apply(this, arguments);
  }

  _createClass(ListItem, [{
    key: "defaultOptions",
    get: function get() {
      return {
        nested: true
      };
    }
  }, {
    key: "schema",
    get: function get() {
      return {
        attrs: {
          done: {
            default: false
          },
          type: {
            default: TYPES.BULLET
          }
        },
        draggable: false,
        content: 'paragraph block*',
        toDOM: function toDOM(node) {
          if (node.attrs.type === TYPES.BULLET) {
            return ['li', 0];
          }

          var listAttributes = {
            class: 'checkbox-item'
          };
          var checkboxAttributes = {
            type: 'checkbox',
            class: '',
            contenteditable: false
          };

          if (node.attrs.done) {
            checkboxAttributes.checked = true;
            listAttributes.class += ' checked';
          }

          return ['li', listAttributes, ['input', checkboxAttributes], ['label', 0]];
        },
        parseDOM: [{
          priority: 100,
          tag: 'li',
          getAttrs: function getAttrs(el) {
            var checkbox = el.querySelector('input[type=checkbox]');
            return {
              done: checkbox && checkbox.checked,
              type: checkbox ? TYPES.CHECKBOX : TYPES.BULLET
            };
          }
        }],
        toMarkdown: function toMarkdown(state, node) {
          if (node.attrs.type === TYPES.CHECKBOX) {
            state.write("[".concat(node.attrs.done ? 'x' : ' ', "] "));
          }

          state.renderContent(node);
        }
      };
    }
  }, {
    key: "commands",
    value: function commands(_ref) {
      var type = _ref.type,
          schema = _ref.schema;
      return {
        bullet_list_item: function bullet_list_item() {
          return function (state, dispatch, view) {
            return (0, _tiptapCommands.toggleList)(schema.nodes.bullet_list, type)(state, dispatch, view);
          };
        },
        todo_item: function todo_item() {
          return function (state, dispatch, view) {
            var schema = state.schema;
            var selection = state.selection;
            var $from = selection.$from;
            var $to = selection.$to;
            var range = $from.blockRange($to);
            var tr = state.tr;
            var parentList = getParentList(schema, selection);

            if (typeof parentList === 'undefined') {
              (0, _tiptapCommands.toggleList)(schema.nodes.bullet_list, type)(state, function (_transaction) {
                tr = _transaction;
              }, view);
              parentList = getParentList(schema, tr.selection);
            }

            if (!range || typeof parentList === 'undefined') {
              return false;
            }

            tr.setNodeMarkup(parentList.pos, schema.nodes.list_item, {
              type: parentList.node.attrs.type === TYPES.CHECKBOX ? TYPES.BULLET : TYPES.CHECKBOX
            });
            tr.scrollIntoView();

            if (dispatch) {
              dispatch(tr);
            }
          };
        }
      };
    }
  }, {
    key: "inputRules",
    value: function inputRules(_ref2) {
      var type = _ref2.type;
      return [(0, _tiptapCommands.wrappingInputRule)(/^\s*([-+*])\s(\[ ?\])\s$/, type, function (match) {
        return {
          type: TYPES.CHECKBOX
        };
      }), (0, _tiptapCommands.wrappingInputRule)(/^\s*([-+*])\s(\[(x|X)\])\s$/, type, function (match) {
        return {
          type: TYPES.CHECKBOX,
          done: true
        };
      }), (0, _commands.listInputRule)(/^\s*([-+*])\s([^\s[])$/, type)];
    }
  }, {
    key: "plugins",
    get: function get() {
      return [new _tiptap.Plugin({
        props: {
          handleClick: function handleClick(view, pos, event) {
            var state = view.state;
            var schema = state.schema;
            var coordinates = view.posAtCoords({
              left: event.clientX,
              top: event.clientY
            });
            var position = state.doc.resolve(coordinates.pos);
            var parentList = (0, _prosemirrorUtils.findParentNodeClosestToPos)(position, function (node) {
              return node.type === schema.nodes.list_item;
            });
            var isListClicked = event.target.tagName.toLowerCase() === 'li';

            if (typeof parentList === 'undefined' || parentList.node.attrs.type !== TYPES.CHECKBOX || !isListClicked) {
              return;
            }

            var tr = state.tr;
            tr.setNodeMarkup(parentList.pos, schema.nodes.list_item, {
              done: !parentList.node.attrs.done,
              type: TYPES.CHECKBOX
            });
            view.dispatch(tr);
          }
        }
      })];
    }
  }]);

  return ListItem;
}(_tiptapExtensions.ListItem);

exports.default = ListItem;

/***/ }),

/***/ "./src/nodes/PlainTextDocument.js":
/*!****************************************!*\
  !*** ./src/nodes/PlainTextDocument.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tiptap = __webpack_require__(/*! tiptap */ "./node_modules/tiptap/dist/tiptap.esm.js");

var _tiptapCommands = __webpack_require__(/*! tiptap-commands */ "./node_modules/tiptap-commands/dist/commands.esm.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var PlainTextDocument = /*#__PURE__*/function (_Node) {
  _inherits(PlainTextDocument, _Node);

  var _super = _createSuper(PlainTextDocument);

  function PlainTextDocument() {
    _classCallCheck(this, PlainTextDocument);

    return _super.apply(this, arguments);
  }

  _createClass(PlainTextDocument, [{
    key: "name",
    get: function get() {
      return 'doc';
    }
  }, {
    key: "schema",
    get: function get() {
      return {
        content: 'block'
      };
    }
  }, {
    key: "keys",
    value: function keys() {
      var _this = this;

      return {
        Tab: function Tab(state) {
          (0, _tiptapCommands.insertText)('\t')(state, _this.editor.view.dispatch, _this.editor.view);
          return true;
        }
      };
    }
  }]);

  return PlainTextDocument;
}(_tiptap.Node);

exports.default = PlainTextDocument;

/***/ }),

/***/ "./src/nodes/index.js":
/*!****************************!*\
  !*** ./src/nodes/index.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Image", {
  enumerable: true,
  get: function get() {
    return _Image.default;
  }
});
Object.defineProperty(exports, "PlainTextDocument", {
  enumerable: true,
  get: function get() {
    return _PlainTextDocument.default;
  }
});
Object.defineProperty(exports, "ListItem", {
  enumerable: true,
  get: function get() {
    return _ListItem.default;
  }
});
Object.defineProperty(exports, "BulletList", {
  enumerable: true,
  get: function get() {
    return _BulletList.default;
  }
});

var _Image = _interopRequireDefault(__webpack_require__(/*! ./Image */ "./src/nodes/Image.js"));

var _PlainTextDocument = _interopRequireDefault(__webpack_require__(/*! ./PlainTextDocument */ "./src/nodes/PlainTextDocument.js"));

var _ListItem = _interopRequireDefault(__webpack_require__(/*! ./ListItem */ "./src/nodes/ListItem.js"));

var _BulletList = _interopRequireDefault(__webpack_require__(/*! ./BulletList */ "./src/nodes/BulletList.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ "./src/services/PollingBackend.js":
/*!****************************************!*\
  !*** ./src/services/PollingBackend.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _axios = _interopRequireDefault(__webpack_require__(/*! @nextcloud/axios */ "./node_modules/@nextcloud/axios/dist/index.js"));

var _helpers = __webpack_require__(/*! ../helpers */ "./src/helpers/index.js");

var _SyncService = __webpack_require__(/*! ./SyncService */ "./src/services/SyncService.js");

var _prosemirrorCollab = __webpack_require__(/*! prosemirror-collab */ "./node_modules/prosemirror-collab/dist/index.es.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Minimum inverval to refetch the document changes
 * @type {number} time in ms
 */
var FETCH_INTERVAL = 300;
/**
 * Maximum interval between refetches of document state if multiple users have joined
 * @type {number} time in ms
 */

var FETCH_INTERVAL_MAX = 5000;
/**
 * Interval to check for changes when there is only one user joined
 * @type {number} time in ms
 */

var FETCH_INTERVAL_SINGLE_EDITOR = 5000;
/**
 * Interval to fetch for changes when a browser window is considered invisible by the
 * page visibility API https://developer.mozilla.org/de/docs/Web/API/Page_Visibility_API
 * @type {number} time in ms
 */

var FETCH_INTERVAL_INVISIBLE = 60000;
var MIN_PUSH_RETRY = 500;
var MAX_PUSH_RETRY = 10000;
/* Timeout after that a PUSH_FAILURE error is emitted */

var WARNING_PUSH_RETRY = 5000;
/* Maximum number of retries for fetching before emitting a connection error */

var MAX_RETRY_FETCH_COUNT = 5;
/**
 * Timeout for sessions to be marked as disconnected
 * Make sure that this is higher than any FETCH_INTERVAL_ values
 **/

var COLLABORATOR_DISCONNECT_TIME = FETCH_INTERVAL_INVISIBLE * 1.5;

var PollingBackend = /*#__PURE__*/function () {
  function PollingBackend(authority) {
    _classCallCheck(this, PollingBackend);

    /** @type SyncService */
    this._authority = authority;
    this.fetchInterval = FETCH_INTERVAL;
    this.retryTime = MIN_PUSH_RETRY;
    this.lock = false;
    this.fetchRetryCounter = 0;
  }

  _createClass(PollingBackend, [{
    key: "connect",
    value: function connect() {
      this.initialLoadingFinished = false;
      this.fetcher = setInterval(this._fetchSteps.bind(this), 50);
      document.addEventListener('visibilitychange', this.visibilitychange.bind(this));
    }
  }, {
    key: "_isPublic",
    value: function _isPublic() {
      return !!this._authority.options.shareToken;
    }
  }, {
    key: "forceSave",
    value: function forceSave() {
      this._forcedSave = true;
      this.fetchSteps();
    }
  }, {
    key: "save",
    value: function save() {
      this._manualSave = true;
      this.fetchSteps();
    }
  }, {
    key: "fetchSteps",
    value: function fetchSteps() {
      this._fetchSteps();
    }
    /**
     * This method is only called though the timer
     */

  }, {
    key: "_fetchSteps",
    value: function _fetchSteps() {
      var _this = this;

      if (this.lock || !this.fetcher) {
        return;
      }

      this.lock = true;
      var autosaveContent;

      if (this._forcedSave || this._manualSave || !(0, _prosemirrorCollab.sendableSteps)(this._authority.state) && this._authority._getVersion() !== this._authority.document.lastSavedVersion) {
        autosaveContent = this._authority._getContent();
      }

      _axios.default.post((0, _helpers.endpointUrl)('session/sync', this._isPublic()), {
        documentId: this._authority.document.id,
        sessionId: this._authority.session.id,
        sessionToken: this._authority.session.token,
        version: this._authority._getVersion(),
        autosaveContent: autosaveContent,
        force: !!this._forcedSave,
        manualSave: !!this._manualSave,
        token: this._authority.options.shareToken,
        filePath: this._authority.options.filePath
      }).then(function (response) {
        _this.fetchRetryCounter = 0;

        if (_this._authority.document.lastSavedVersion < response.data.document.lastSavedVersion) {
          console.debug('Saved document', response.data.document);

          _this._authority.emit('save', {
            document: response.data.document,
            sessions: response.data.sessions
          });
        }

        _this._authority.emit('change', {
          document: response.data.document,
          sessions: response.data.sessions
        });

        _this._authority.document = response.data.document;
        _this._authority.sessions = response.data.sessions;

        if (response.data.steps.length === 0) {
          if (!_this.initialLoadingFinished) {
            _this.initialLoadingFinished = true;
          }

          if (_this._authority.checkIdle()) {
            return;
          }

          _this.lock = false;

          if (response.data.sessions.filter(function (session) {
            return session.lastContact > Date.now() / 1000 - COLLABORATOR_DISCONNECT_TIME;
          }).length < 2) {
            _this.maximumRefetchTimer();
          } else {
            _this.increaseRefetchTimer();
          }

          _this._authority.emit('stateChange', {
            dirty: false
          });

          _this._authority.emit('stateChange', {
            initialLoading: true
          });

          return;
        }

        _this._authority._receiveSteps(response.data);

        _this.lock = false;
        _this._forcedSave = false;

        if (_this.initialLoadingFinished) {
          _this.resetRefetchTimer();
        }
      }).catch(function (e) {
        _this.lock = false;

        if (!e.response || e.code === 'ECONNABORTED') {
          if (_this.fetchRetryCounter++ >= MAX_RETRY_FETCH_COUNT) {
            console.error('[PollingBackend:fetchSteps] Network error when fetching steps, emitting CONNECTION_FAILED');

            _this._authority.emit('error', _SyncService.ERROR_TYPE.CONNECTION_FAILED, {
              retry: false
            });
          } else {
            console.error("[PollingBackend:fetchSteps] Network error when fetching steps, retry ".concat(_this.fetchRetryCounter));
          }
        } else if (e.response.status === 409 && e.response.data.document.currentVersion === _this._authority.document.currentVersion) {
          // Only emit conflict event if we have synced until the latest version
          console.error('Conflict during file save, please resolve');

          _this._authority.emit('error', _SyncService.ERROR_TYPE.SAVE_COLLISSION, {
            outsideChange: e.response.data.outsideChange
          });
        } else if (e.response.status === 403) {
          _this._authority.emit('error', _SyncService.ERROR_TYPE.SOURCE_NOT_FOUND, {});

          _this.disconnect();
        } else if (e.response.status === 404) {
          _this._authority.emit('error', _SyncService.ERROR_TYPE.SOURCE_NOT_FOUND, {});

          _this.disconnect();
        } else if (e.response.status === 503) {
          _this.increaseRefetchTimer();

          _this._authority.emit('error', _SyncService.ERROR_TYPE.CONNECTION_FAILED, {
            retry: false
          });

          console.error('Failed to fetch steps due to unavailable service', e);
        } else {
          _this.disconnect();

          _this._authority.emit('error', _SyncService.ERROR_TYPE.CONNECTION_FAILED, {
            retry: false
          });

          console.error('Failed to fetch steps due to other reason', e);
        }
      });

      this._manualSave = false;
      this._forcedSave = false;
    }
  }, {
    key: "sendSteps",
    value: function sendSteps(_sendable) {
      var _this2 = this;

      this._authority.emit('stateChange', {
        dirty: true
      });

      if (this.lock) {
        setTimeout(function () {
          _this2._authority.sendSteps();
        }, 100);
        return;
      }

      this.lock = true;
      var sendable = typeof _sendable === 'function' ? _sendable() : _sendable;
      var steps = sendable.steps;

      _axios.default.post((0, _helpers.endpointUrl)('session/push', !!this._authority.options.shareToken), {
        documentId: this._authority.document.id,
        sessionId: this._authority.session.id,
        sessionToken: this._authority.session.token,
        steps: steps.map(function (s) {
          return s.toJSON ? s.toJSON() : s;
        }) || [],
        version: sendable.version,
        token: this._authority.options.shareToken,
        filePath: this._authority.options.filePath
      }).then(function (response) {
        _this2.carefulRetryReset();

        _this2.lock = false;

        _this2.fetchSteps();
      }).catch(function (e) {
        console.error('failed to apply steps due to collission, retrying');
        _this2.lock = false;

        if (!e.response || e.code === 'ECONNABORTED') {
          _this2._authority.emit('error', _SyncService.ERROR_TYPE.CONNECTION_FAILED, {});

          return;
        } else if (e.response.status === 403 && e.response.data.document.currentVersion === _this2._authority.document.currentVersion) {
          // Only emit conflict event if we have synced until the latest version
          _this2._authority.emit('error', _SyncService.ERROR_TYPE.PUSH_FAILURE, {});

          OC.Notification.showTemporary('Changes could not be sent yet');
        }

        _this2.fetchSteps();

        _this2.carefulRetry();
      });
    }
  }, {
    key: "disconnect",
    value: function disconnect() {
      clearInterval(this.fetcher);
      this.fetcher = 0;
      document.removeEventListener('visibilitychange', this.visibilitychange.bind(this));
    }
  }, {
    key: "resetRefetchTimer",
    value: function resetRefetchTimer() {
      if (this.fetcher === 0) {
        return;
      }

      this.fetchInterval = FETCH_INTERVAL;
      clearInterval(this.fetcher);
      this.fetcher = setInterval(this._fetchSteps.bind(this), this.fetchInterval);
    }
  }, {
    key: "increaseRefetchTimer",
    value: function increaseRefetchTimer() {
      if (this.fetcher === 0) {
        return;
      }

      this.fetchInterval = Math.min(this.fetchInterval * 2, FETCH_INTERVAL_MAX);
      clearInterval(this.fetcher);
      this.fetcher = setInterval(this._fetchSteps.bind(this), this.fetchInterval);
    }
  }, {
    key: "maximumRefetchTimer",
    value: function maximumRefetchTimer() {
      if (this.fetcher === 0) {
        return;
      }

      this.fetchInterval = FETCH_INTERVAL_SINGLE_EDITOR;
      clearInterval(this.fetcher);
      this.fetcher = setInterval(this._fetchSteps.bind(this), this.fetchInterval);
    }
  }, {
    key: "visibilitychange",
    value: function visibilitychange() {
      if (this.fetcher === 0) {
        return;
      }

      if (document.visibilityState === 'hidden') {
        this.fetchInterval = FETCH_INTERVAL_INVISIBLE;
        clearInterval(this.fetcher);
        this.fetcher = setInterval(this._fetchSteps.bind(this), this.fetchInterval);
      } else {
        this.resetRefetchTimer();
      }
    }
  }, {
    key: "carefulRetry",
    value: function carefulRetry() {
      var newRetry = this.retryTime ? Math.min(this.retryTime * 2, MAX_PUSH_RETRY) : MIN_PUSH_RETRY;

      if (newRetry > WARNING_PUSH_RETRY && this.retryTime < WARNING_PUSH_RETRY) {
        OC.Notification.showTemporary('Changes could not be sent yet');

        this._authority.emit('error', _SyncService.ERROR_TYPE.PUSH_FAILURE, {});
      }

      this.retryTime = newRetry;
    }
  }, {
    key: "carefulRetryReset",
    value: function carefulRetryReset() {
      this.retryTime = MIN_PUSH_RETRY;
    }
  }]);

  return PollingBackend;
}();

var _default = PollingBackend;
exports.default = _default;

/***/ }),

/***/ "./src/services/SyncService.js":
/*!*************************************!*\
  !*** ./src/services/SyncService.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IDLE_TIMEOUT = exports.ERROR_TYPE = exports.SyncService = exports.default = void 0;

var _axios = _interopRequireDefault(__webpack_require__(/*! @nextcloud/axios */ "./node_modules/@nextcloud/axios/dist/index.js"));

var _PollingBackend = _interopRequireDefault(__webpack_require__(/*! ./PollingBackend */ "./src/services/PollingBackend.js"));

var _helpers = __webpack_require__(/*! ./../helpers */ "./src/helpers/index.js");

var _prosemirrorCollab = __webpack_require__(/*! prosemirror-collab */ "./node_modules/prosemirror-collab/dist/index.es.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var defaultOptions = {
  shareToken: null,
  forceRecreate: false,
  serialize: function serialize(document) {
    return document;
  }
};
/**
 * Timeout after which the editor will consider a document without changes being synced as idle
 * The session will be terminated and the document will stay open in read-only mode with a button to reconnect if needed
 * @type {number}
 */

var IDLE_TIMEOUT = 30;
exports.IDLE_TIMEOUT = IDLE_TIMEOUT;
var ERROR_TYPE = {
  /**
   * Failed to save collaborative document due to external change
   * collission needs to be resolved manually
   */
  SAVE_COLLISSION: 0,

  /**
   * Failed to push changes for MAX_REBASE_RETRY times
   */
  PUSH_FAILURE: 1,
  LOAD_ERROR: 2,
  CONNECTION_FAILED: 3,
  SOURCE_NOT_FOUND: 4
};
exports.ERROR_TYPE = ERROR_TYPE;

var SyncService = /*#__PURE__*/function () {
  function SyncService(options) {
    _classCallCheck(this, SyncService);

    this.eventHandlers = {
      /* Document state */
      opened: [],
      loaded: [],

      /* All initial steps fetched */
      fetched: [],

      /* received new steps */
      sync: [],

      /* state changed (dirty) */
      stateChange: [],

      /* error */
      error: [],

      /* Events for session and document meta data */
      change: [],

      /* Emitted after successful save */
      save: [],

      /* Emitted once a document becomes idle */
      idle: []
    };
    this.backend = new _PollingBackend.default(this);
    this.options = Object.assign({}, defaultOptions, options);
    this.document = null;
    this.session = null;
    this.sessions = [];
    this.steps = [];
    this.stepClientIDs = [];
    this.lastStepPush = Date.now();
    return this;
  }

  _createClass(SyncService, [{
    key: "open",
    value: function () {
      var _open = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref) {
        var _this2 = this;

        var fileId, filePath, initialSession, connectionData, response;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                fileId = _ref.fileId, filePath = _ref.filePath, initialSession = _ref.initialSession;
                connectionData = null;

                if (!(typeof initialSession === 'undefined')) {
                  _context.next = 16;
                  break;
                }

                _context.prev = 3;
                _context.next = 6;
                return this._openDocument({
                  fileId: fileId,
                  filePath: filePath
                });

              case 6:
                response = _context.sent;
                connectionData = response.data;
                _context.next = 14;
                break;

              case 10:
                _context.prev = 10;
                _context.t0 = _context["catch"](3);

                if (!_context.t0.response || _context.t0.code === 'ECONNABORTED') {
                  this.emit('error', ERROR_TYPE.CONNECTION_FAILED, {});
                } else {
                  this.emit('error', ERROR_TYPE.LOAD_ERROR, _context.t0.response.status);
                }

                throw _context.t0;

              case 14:
                _context.next = 17;
                break;

              case 16:
                connectionData = initialSession;

              case 17:
                this.document = connectionData.document;
                this.document.readOnly = connectionData.readOnly;
                this.session = connectionData.session;
                this.emit('opened', {
                  document: this.document,
                  session: this.session
                });
                return _context.abrupt("return", this._fetchDocument().then(function (_ref2) {
                  var data = _ref2.data;

                  _this2.emit('loaded', {
                    document: _this2.document,
                    session: _this2.session,
                    documentSource: '' + data
                  });
                }));

              case 22:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[3, 10]]);
      }));

      function open(_x) {
        return _open.apply(this, arguments);
      }

      return open;
    }()
  }, {
    key: "startSync",
    value: function startSync() {
      this.backend.connect();
    }
  }, {
    key: "_openDocument",
    value: function _openDocument(_ref3) {
      var fileId = _ref3.fileId,
          filePath = _ref3.filePath;
      return _axios.default.put((0, _helpers.endpointUrl)('session/create', !!this.options.shareToken), {
        fileId: fileId,
        filePath: filePath,
        token: this.options.shareToken,
        guestName: this.options.guestName,
        forceRecreate: this.options.forceRecreate
      });
    }
  }, {
    key: "_fetchDocument",
    value: function _fetchDocument() {
      return _axios.default.post((0, _helpers.endpointUrl)('session/fetch', !!this.options.shareToken), {
        documentId: this.document.id,
        sessionId: this.session.id,
        sessionToken: this.session.token,
        token: this.options.shareToken
      }, {
        transformResponse: [function (data) {
          return data;
        }]
      });
    }
  }, {
    key: "updateSession",
    value: function updateSession(guestName) {
      var _this3 = this;

      if (!this.isPublic()) {
        return;
      }

      return _axios.default.post((0, _helpers.endpointUrl)('session', !!this.options.shareToken), {
        documentId: this.document.id,
        sessionId: this.session.id,
        sessionToken: this.session.token,
        token: this.options.shareToken,
        guestName: guestName
      }).then(function (_ref4) {
        var data = _ref4.data;
        _this3.session = data;
        return data;
      }).catch(function (error) {
        console.error('Failed to update the session', error);
        return Promise.reject(error);
      });
    }
  }, {
    key: "sendSteps",
    value: function sendSteps(_sendable) {
      var sendable = _sendable || (0, _prosemirrorCollab.sendableSteps)(this.state);

      if (!sendable) {
        return;
      }

      return this.backend.sendSteps(sendable);
    }
  }, {
    key: "stepsSince",
    value: function stepsSince(version) {
      return {
        steps: this.steps.slice(version),
        clientIDs: this.stepClientIDs.slice(version)
      };
    }
  }, {
    key: "_receiveSteps",
    value: function _receiveSteps(_ref5) {
      var _this4 = this;

      var steps = _ref5.steps,
          document = _ref5.document;
      var newSteps = [];

      var _loop = function _loop(i) {
        var singleSteps = steps[i].data;

        if (!Array.isArray(singleSteps)) {
          console.error('Invalid step data, skipping step', steps[i]); // TODO: recover

          return "continue";
        }

        singleSteps.forEach(function (step) {
          _this4.steps.push(step);

          newSteps.push({
            step: step,
            clientID: steps[i].sessionId
          });
        });
      };

      for (var i = 0; i < steps.length; i++) {
        var _ret = _loop(i);

        if (_ret === "continue") continue;
      }

      this.lastStepPush = Date.now();
      this.emit('sync', {
        steps: newSteps,
        document: document
      });
      console.debug('receivedSteps', 'newVersion', this._getVersion());
    }
  }, {
    key: "checkIdle",
    value: function checkIdle() {
      var lastPushMinutesAgo = (Date.now() - this.lastStepPush) / 1000 / 60;

      if (lastPushMinutesAgo > IDLE_TIMEOUT) {
        console.debug("[SyncService] Document is idle for ".concat(this.IDLE_TIMEOUT, " minutes, suspending connection"));
        this.emit('idle');
      }
    }
  }, {
    key: "_getVersion",
    value: function _getVersion() {
      if (this.state) {
        return (0, _prosemirrorCollab.getVersion)(this.state);
      }

      return 0;
    }
  }, {
    key: "_getDocument",
    value: function _getDocument() {
      if (this.state) {
        return this.state.doc;
      }
    }
  }, {
    key: "_getContent",
    value: function _getContent() {
      return this.options.serialize(this._getDocument());
    }
  }, {
    key: "save",
    value: function save() {
      if (this.backend.save) {
        this.backend.save();
      }
    }
  }, {
    key: "forceSave",
    value: function forceSave() {
      if (this.backend.forceSave) {
        this.backend.forceSave();
      }
    }
  }, {
    key: "close",
    value: function close() {
      var _this5 = this;

      var closed = false;
      return new Promise(function (resolve, reject) {
        _this5.on('save', function () {
          _this5._close().then(function () {
            closed = true;
            resolve();
          }).catch(function () {
            return resolve();
          });
        });

        setTimeout(function () {
          if (!closed) {
            _this5._close().then(function () {
              resolve();
            }).catch(function () {
              return resolve();
            });
          }
        }, 2000);

        _this5.save();
      });
    }
  }, {
    key: "_close",
    value: function _close() {
      if (this.document === null || this.session === null) {
        return Promise.resolve();
      }

      this.backend.disconnect();
      return _axios.default.post((0, _helpers.endpointUrl)('session/close', !!this.options.shareToken), {
        documentId: this.document.id,
        sessionId: this.session.id,
        sessionToken: this.session.token,
        token: this.options.shareToken
      });
    }
  }, {
    key: "on",
    value: function on(event, callback, _this) {
      this.eventHandlers[event].push(callback.bind(_this));
      return this;
    }
  }, {
    key: "emit",
    value: function emit(event, data, additionalData) {
      if (typeof this.eventHandlers[event] !== 'undefined') {
        this.eventHandlers[event].forEach(function (callback) {
          callback(data, additionalData);
        });
      } else {
        console.error('Event not found', event);
      }
    }
  }, {
    key: "isPublic",
    value: function isPublic() {
      return !!this.options.shareToken;
    }
  }]);

  return SyncService;
}();

exports.SyncService = SyncService;
var _default = SyncService;
exports.default = _default;

/***/ }),

/***/ "./src/store.js":
/*!**********************!*\
  !*** ./src/store.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm.js"));

var _vuex = _interopRequireDefault(__webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js"));

var _browserStorage = __webpack_require__(/*! @nextcloud/browser-storage */ "./node_modules/@nextcloud/browser-storage/dist/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * @copyright Copyright (c) 2020 Julius Härtl <jus@bitgrid.net>
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
var persistentStorage = (0, _browserStorage.getBuilder)('text').persist().build();

_vue.default.use(_vuex.default);

var store = new _vuex.default.Store({
  state: {
    showAuthorAnnotations: persistentStorage.getItem('showAuthorAnnotations') === 'true'
  },
  mutations: {
    SET_SHOW_AUTHOR_ANNOTATIONS: function SET_SHOW_AUTHOR_ANNOTATIONS(state, value) {
      state.showAuthorAnnotations = value;
      persistentStorage.setItem('showAuthorAnnotations', '' + value);
    }
  },
  actions: {
    setShowAuthorAnnotations: function setShowAuthorAnnotations(_ref, value) {
      var commit = _ref.commit;
      store.commit('SET_SHOW_AUTHOR_ANNOTATIONS', value);
    }
  }
});
var _default = store;
exports.default = _default;

/***/ }),

/***/ "./src/views/DirectEditing.vue":
/*!*************************************!*\
  !*** ./src/views/DirectEditing.vue ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _DirectEditing_vue_vue_type_template_id_37e36225_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DirectEditing.vue?vue&type=template&id=37e36225&scoped=true& */ "./src/views/DirectEditing.vue?vue&type=template&id=37e36225&scoped=true&");
/* harmony import */ var _DirectEditing_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DirectEditing.vue?vue&type=script&lang=js& */ "./src/views/DirectEditing.vue?vue&type=script&lang=js&");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _DirectEditing_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _DirectEditing_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _DirectEditing_vue_vue_type_style_index_0_id_37e36225_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DirectEditing.vue?vue&type=style&index=0&id=37e36225&scoped=true&lang=scss& */ "./src/views/DirectEditing.vue?vue&type=style&index=0&id=37e36225&scoped=true&lang=scss&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _DirectEditing_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _DirectEditing_vue_vue_type_template_id_37e36225_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _DirectEditing_vue_vue_type_template_id_37e36225_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "37e36225",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/views/DirectEditing.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/views/DirectEditing.vue?vue&type=script&lang=js&":
/*!**************************************************************!*\
  !*** ./src/views/DirectEditing.vue?vue&type=script&lang=js& ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_DirectEditing_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib!../../node_modules/vue-loader/lib??vue-loader-options!./DirectEditing.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./src/views/DirectEditing.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_DirectEditing_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_DirectEditing_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_DirectEditing_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_DirectEditing_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_DirectEditing_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/views/DirectEditing.vue?vue&type=style&index=0&id=37e36225&scoped=true&lang=scss&":
/*!***********************************************************************************************!*\
  !*** ./src/views/DirectEditing.vue?vue&type=style&index=0&id=37e36225&scoped=true&lang=scss& ***!
  \***********************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_DirectEditing_vue_vue_type_style_index_0_id_37e36225_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/style-loader/dist/cjs.js!../../node_modules/css-loader/dist/cjs.js!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/sass-loader/dist/cjs.js!../../node_modules/vue-loader/lib??vue-loader-options!./DirectEditing.vue?vue&type=style&index=0&id=37e36225&scoped=true&lang=scss& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/views/DirectEditing.vue?vue&type=style&index=0&id=37e36225&scoped=true&lang=scss&");
/* empty/unused harmony star reexport */

/***/ }),

/***/ "./src/views/DirectEditing.vue?vue&type=template&id=37e36225&scoped=true&":
/*!********************************************************************************!*\
  !*** ./src/views/DirectEditing.vue?vue&type=template&id=37e36225&scoped=true& ***!
  \********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_DirectEditing_vue_vue_type_template_id_37e36225_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib??vue-loader-options!./DirectEditing.vue?vue&type=template&id=37e36225&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/views/DirectEditing.vue?vue&type=template&id=37e36225&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_DirectEditing_vue_vue_type_template_id_37e36225_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_DirectEditing_vue_vue_type_template_id_37e36225_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=editor.js.map?v=c19e9e57a2cf3f08248c