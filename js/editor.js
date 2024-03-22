(self["webpackChunk_nextcloud_text"] = self["webpackChunk_nextcloud_text"] || []).push([["editor"],{

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Assistant.vue?vue&type=script&lang=js":
/*!******************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Assistant.vue?vue&type=script&lang=js ***!
  \******************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _nextcloud_axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nextcloud/axios */ "./node_modules/@nextcloud/axios/dist/index.es.mjs");
/* harmony import */ var _nextcloud_dialogs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nextcloud/dialogs */ "./node_modules/@nextcloud/dialogs/dist/index.mjs");
/* harmony import */ var _nextcloud_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nextcloud/router */ "./node_modules/@nextcloud/router/dist/index.mjs");
/* harmony import */ var vue_material_design_icons_AlertCircle_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! vue-material-design-icons/AlertCircle.vue */ "./node_modules/vue-material-design-icons/AlertCircle.vue");
/* harmony import */ var vue_material_design_icons_Creation_vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vue-material-design-icons/Creation.vue */ "./node_modules/vue-material-design-icons/Creation.vue");
/* harmony import */ var vue_material_design_icons_ClockOutline_vue__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vue-material-design-icons/ClockOutline.vue */ "./node_modules/vue-material-design-icons/ClockOutline.vue");
/* harmony import */ var vue_material_design_icons_Delete_vue__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! vue-material-design-icons/Delete.vue */ "./node_modules/vue-material-design-icons/Delete.vue");
/* harmony import */ var vue_material_design_icons_CheckCircle_vue__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! vue-material-design-icons/CheckCircle.vue */ "./node_modules/vue-material-design-icons/CheckCircle.vue");
/* harmony import */ var vue_material_design_icons_TextBoxPlusOutline_vue__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! vue-material-design-icons/TextBoxPlusOutline.vue */ "./node_modules/vue-material-design-icons/TextBoxPlusOutline.vue");
/* harmony import */ var vue_material_design_icons_Pencil_vue__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! vue-material-design-icons/Pencil.vue */ "./node_modules/vue-material-design-icons/Pencil.vue");
/* harmony import */ var vue_material_design_icons_TextShort_vue__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! vue-material-design-icons/TextShort.vue */ "./node_modules/vue-material-design-icons/TextShort.vue");
/* harmony import */ var vue_material_design_icons_FormatHeader1_vue__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! vue-material-design-icons/FormatHeader1.vue */ "./node_modules/vue-material-design-icons/FormatHeader1.vue");
/* harmony import */ var vue_material_design_icons_Shuffle_vue__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! vue-material-design-icons/Shuffle.vue */ "./node_modules/vue-material-design-icons/Shuffle.vue");
/* harmony import */ var vue_material_design_icons_TranslateVariant_vue__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! vue-material-design-icons/TranslateVariant.vue */ "./node_modules/vue-material-design-icons/TranslateVariant.vue");
/* harmony import */ var vue_material_design_icons_ClipboardTextOutline_vue__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! vue-material-design-icons/ClipboardTextOutline.vue */ "./node_modules/vue-material-design-icons/ClipboardTextOutline.vue");
/* harmony import */ var _tiptap_core__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @tiptap/core */ "./node_modules/@tiptap/core/dist/index.js");
/* harmony import */ var _nextcloud_initial_state__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @nextcloud/initial-state */ "./node_modules/@nextcloud/initial-state/dist/index.es.mjs");
/* harmony import */ var _nextcloud_vue__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @nextcloud/vue */ "./node_modules/@nextcloud/vue/dist/index.mjs");
/* harmony import */ var _Editor_provider_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./Editor.provider.js */ "./src/components/Editor.provider.js");
/* harmony import */ var _tiptap_vue_2__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @tiptap/vue-2 */ "./node_modules/@tiptap/vue-2/dist/index.js");
/* harmony import */ var _Modal_Translate_vue__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./Modal/Translate.vue */ "./src/components/Modal/Translate.vue");
/* harmony import */ var _nextcloud_event_bus__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @nextcloud/event-bus */ "./node_modules/@nextcloud/event-bus/dist/index.mjs");






















const limitInRange = (num, min, max) => {
  return Math.min(Math.max(parseInt(num), parseInt(min)), parseInt(max));
};
const STATUS_FAILED = 4;
const STATUS_SUCCESSFUL = 3;
const STATUS_RUNNING = 2;
const STATUS_SCHEDULED = 1;
const STATUS_UNKNOWN = 0;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'Assistant',
  components: {
    Translate: _Modal_Translate_vue__WEBPACK_IMPORTED_MODULE_18__["default"],
    FloatingMenu: _tiptap_vue_2__WEBPACK_IMPORTED_MODULE_20__.FloatingMenu,
    ErrorIcon: vue_material_design_icons_AlertCircle_vue__WEBPACK_IMPORTED_MODULE_3__["default"],
    CreationIcon: vue_material_design_icons_Creation_vue__WEBPACK_IMPORTED_MODULE_4__["default"],
    ClockOutline: vue_material_design_icons_ClockOutline_vue__WEBPACK_IMPORTED_MODULE_5__["default"],
    CheckCircleIcon: vue_material_design_icons_CheckCircle_vue__WEBPACK_IMPORTED_MODULE_7__["default"],
    DeleteIcon: vue_material_design_icons_Delete_vue__WEBPACK_IMPORTED_MODULE_6__["default"],
    TextBoxPlusOutlineIcon: vue_material_design_icons_TextBoxPlusOutline_vue__WEBPACK_IMPORTED_MODULE_8__["default"],
    PencilIcon: vue_material_design_icons_Pencil_vue__WEBPACK_IMPORTED_MODULE_9__["default"],
    TextShort: vue_material_design_icons_TextShort_vue__WEBPACK_IMPORTED_MODULE_10__["default"],
    FormatHeader1: vue_material_design_icons_FormatHeader1_vue__WEBPACK_IMPORTED_MODULE_11__["default"],
    Shuffle: vue_material_design_icons_Shuffle_vue__WEBPACK_IMPORTED_MODULE_12__["default"],
    TranslateVariant: vue_material_design_icons_TranslateVariant_vue__WEBPACK_IMPORTED_MODULE_13__["default"],
    ClipboardTextOutlineIcon: vue_material_design_icons_ClipboardTextOutline_vue__WEBPACK_IMPORTED_MODULE_14__["default"],
    NcActions: _nextcloud_vue__WEBPACK_IMPORTED_MODULE_16__.NcActions,
    NcActionButton: _nextcloud_vue__WEBPACK_IMPORTED_MODULE_16__.NcActionButton,
    NcActionSeparator: _nextcloud_vue__WEBPACK_IMPORTED_MODULE_16__.NcActionSeparator,
    NcListItem: _nextcloud_vue__WEBPACK_IMPORTED_MODULE_16__.NcListItem,
    NcModal: _nextcloud_vue__WEBPACK_IMPORTED_MODULE_16__.NcModal
  },
  mixins: [_Editor_provider_js__WEBPACK_IMPORTED_MODULE_17__.useEditorMixin, _Editor_provider_js__WEBPACK_IMPORTED_MODULE_17__.useIsPublicMixin, _Editor_provider_js__WEBPACK_IMPORTED_MODULE_17__.useIsRichWorkspaceMixin, _Editor_provider_js__WEBPACK_IMPORTED_MODULE_17__.useFileMixin],
  data() {
    return {
      providers: OCP.InitialState.loadState('text', 'textprocessing'),
      selection: '',
      tasks: [],
      STATUS_FAILED,
      STATUS_RUNNING,
      STATUS_SCHEDULED,
      STATUS_SUCCESSFUL,
      STATUS_UNKNOWN,
      showTaskList: false,
      displayTranslate: false,
      canTranslate: (0,_nextcloud_initial_state__WEBPACK_IMPORTED_MODULE_15__.loadState)('text', 'translation_languages', []).length > 0
    };
  },
  computed: {
    showAssistant() {
      var _window;
      return !this.$isRichWorkspace && !this.$isPublic && ((_window = window) === null || _window === void 0 || (_window = _window.OCA) === null || _window === void 0 || (_window = _window.TPAssistant) === null || _window === void 0 ? void 0 : _window.openAssistantForm);
    },
    identifier() {
      return 'text-file:' + this.$file.fileId;
    },
    badgeStateIcon() {
      if (this.tasks.filter(t => t.status === STATUS_SCHEDULED || t.status === STATUS_RUNNING).length > 0) {
        return vue_material_design_icons_ClockOutline_vue__WEBPACK_IMPORTED_MODULE_5__["default"];
      }
      if (this.tasks.filter(t => t.status === STATUS_FAILED).length > 0) {
        return vue_material_design_icons_AlertCircle_vue__WEBPACK_IMPORTED_MODULE_3__["default"];
      }
      if (this.tasks.filter(t => t.status === STATUS_SUCCESSFUL).length > 0) {
        return vue_material_design_icons_CheckCircle_vue__WEBPACK_IMPORTED_MODULE_7__["default"];
      }
      return null;
    }
  },
  beforeMount() {
    if (!this.showAssistant) {
      return;
    }
    this.$editor.on('selectionUpdate', this.onSelection);
    this.fetchTasks();
    (0,_nextcloud_event_bus__WEBPACK_IMPORTED_MODULE_19__.subscribe)('notifications:notification:received', this.checkNotification);
  },
  beforeDestroy() {
    if (!this.showAssistant) {
      return;
    }
    this.$editor.off('selectionUpdate', this.onSelection);
    (0,_nextcloud_event_bus__WEBPACK_IMPORTED_MODULE_19__.unsubscribe)('notifications:notification:received', this.checkNotification);
  },
  methods: {
    async fetchTasks() {
      const result = await _nextcloud_axios__WEBPACK_IMPORTED_MODULE_0__["default"].get((0,_nextcloud_router__WEBPACK_IMPORTED_MODULE_2__.generateOcsUrl)('/textprocessing/tasks/app/text') + '?identifier=' + this.identifier);
      const taskMap = {};
      for (const index in this.providers) {
        const provider = this.providers[index];
        taskMap[provider.task] = provider;
      }
      this.tasks = result.data.ocs.data.tasks.map(task => {
        return {
          ...task,
          title: taskMap[task.type].name
        };
      }).sort((a, b) => b.id - a.id);
    },
    async checkNotification(event) {
      if (event.notification.app !== 'assistant' || event.notification.actions[0].type !== 'WEB') {
        return;
      }
      await this.fetchTasks();
    },
    onSelection() {
      const {
        state
      } = this.$editor;
      const {
        from,
        to
      } = state.selection;
      this.selection = state.doc.textBetween(from, to, ' ');
    },
    async openAssistantForm() {
      let taskType = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      await window.OCA.TPAssistant.openAssistantForm({
        appId: 'text',
        identifier: this.identifier,
        taskType,
        input: this.selection,
        isInsideViewer: true,
        closeOnResult: false,
        actionButtons: [{
          type: 'primary',
          title: t('text', 'Insert result'),
          label: t('text', 'Insert result'),
          onClick: lastTask => {
            this.insertResult(lastTask);
          }
        }]
      });
      await this.fetchTasks();
    },
    openTranslateDialog() {
      this.displayTranslate = this.selection;
    },
    hideTranslate() {
      this.displayTranslate = false;
    },
    translateInsert(content) {
      this.$editor.commands.command(_ref => {
        let {
          tr,
          commands
        } = _ref;
        return commands.insertContentAt(tr.selection.to, content);
      });
      this.displayTranslate = false;
    },
    translateReplace(content) {
      this.$editor.commands.command(_ref2 => {
        let {
          tr,
          commands
        } = _ref2;
        const selection = tr.selection;
        const range = {
          from: selection.from,
          to: selection.to
        };
        return commands.insertContentAt(range, content);
      });
      this.displayTranslate = false;
    },
    async openResult(task) {
      var _window$OCA;
      (_window$OCA = window.OCA) === null || _window$OCA === void 0 ? void 0 : _window$OCA.TPAssistant.openAssistantResult(task);
    },
    async insertResult(task) {
      this.$editor.commands.insertContent(task.output);
      this.showTaskList = false;
    },
    async copyResult(task) {
      try {
        await navigator.clipboard.writeText(task.output);
        (0,_nextcloud_dialogs__WEBPACK_IMPORTED_MODULE_1__.showSuccess)(t('text', 'Nextcloud Assistant result copied'));
        this.showTaskList = false;
      } catch (error) {
        console.error(error);
        (0,_nextcloud_dialogs__WEBPACK_IMPORTED_MODULE_1__.showError)(t('text', 'Could not copy result to clipboard'));
      }
    },
    async deleteTask(task) {
      try {
        await _nextcloud_axios__WEBPACK_IMPORTED_MODULE_0__["default"].delete((0,_nextcloud_router__WEBPACK_IMPORTED_MODULE_2__.generateOcsUrl)("/textprocessing/task/".concat(task.id)));
      } catch (e) {
        console.error('Failed to delete task', e);
      }
      const taskIndex = this.tasks.findIndex(t => t.id === task.id);
      if (taskIndex > -1) {
        this.$delete(this.tasks, taskIndex);
      }
    },
    floatingOptions() {
      const buttonSize = 44;
      const topSpacing = 110 + 22;
      const bottomSpacing = 50 + 22;
      return {
        placement: 'right',
        getReferenceClientRect: () => {
          const editorRect = this.$parent.$el.querySelector('.ProseMirror').getBoundingClientRect();
          const pos = (0,_tiptap_core__WEBPACK_IMPORTED_MODULE_21__.posToDOMRect)(this.$editor.view, this.$editor.state.selection.from, this.$editor.state.selection.to);
          let rightSpacing = 0;
          let addTopSpacing = 0;
          if (editorRect.width < 670) {
            rightSpacing = 20;
          }
          if (editorRect.width < 425) {
            rightSpacing = 66;
            addTopSpacing = 30;
          }
          return {
            ...pos,
            width: editorRect.width - rightSpacing,
            height: limitInRange(pos.height, buttonSize, window.innerHeight),
            top: limitInRange(pos.top, topSpacing, window.innerHeight - bottomSpacing) + addTopSpacing,
            left: editorRect.left,
            right: editorRect.right,
            bottom: limitInRange(pos.top + buttonSize, bottomSpacing, window.innerHeight - topSpacing) + 22
          };
        }
      };
    },
    floatingShow() {
      return true;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/BaseReader.vue?vue&type=script&lang=js":
/*!*******************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/BaseReader.vue?vue&type=script&lang=js ***!
  \*******************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _tiptap_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @tiptap/core */ "./node_modules/@tiptap/core/dist/index.js");
/* harmony import */ var _tiptap_vue_2__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @tiptap/vue-2 */ "./node_modules/@tiptap/vue-2/dist/index.js");
/* harmony import */ var _Editor_provider_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Editor.provider.js */ "./src/components/Editor.provider.js");
/* harmony import */ var _Editor_Wrapper_provider_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Editor/Wrapper.provider.js */ "./src/components/Editor/Wrapper.provider.js");
/* harmony import */ var _Editor_EditorOutline_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Editor/EditorOutline.vue */ "./src/components/Editor/EditorOutline.vue");





/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'BaseReader',
  components: {
    EditorContent: _tiptap_vue_2__WEBPACK_IMPORTED_MODULE_3__.EditorContent,
    EditorOutline: _Editor_EditorOutline_vue__WEBPACK_IMPORTED_MODULE_2__["default"]
  },
  mixins: [_Editor_Wrapper_provider_js__WEBPACK_IMPORTED_MODULE_1__.useOutlineStateMixin, _Editor_Wrapper_provider_js__WEBPACK_IMPORTED_MODULE_1__.useOutlineActions],
  provide() {
    const val = {};
    Object.defineProperties(val, {
      [_Editor_provider_js__WEBPACK_IMPORTED_MODULE_0__.EDITOR]: {
        get: () => this.$editor
      }
    });
    return val;
  },
  // extensions is a factory building a list of extensions for the editor
  inject: ['renderHtml', 'extensions'],
  props: {
    content: {
      type: String,
      required: true
    }
  },
  computed: {
    htmlContent() {
      return this.renderHtml(this.content);
    },
    showOutline() {
      return this.$outlineState.visible;
    }
  },
  watch: {
    content() {
      this.updateContent();
    }
  },
  created() {
    this.$editor = this.createEditor();
    this.$editor.setEditable(false);
  },
  beforeDestroy() {
    this.$editor.destroy();
  },
  methods: {
    createEditor() {
      return new _tiptap_core__WEBPACK_IMPORTED_MODULE_4__.Editor({
        content: this.htmlContent,
        extensions: this.extensions()
      });
    },
    updateContent() {
      this.$editor.commands.setContent(this.htmlContent, true);
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/CollisionResolveDialog.vue?vue&type=script&lang=js":
/*!*******************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/CollisionResolveDialog.vue?vue&type=script&lang=js ***!
  \*******************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Editor_provider_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Editor.provider.js */ "./src/components/Editor.provider.js");
/* harmony import */ var _nextcloud_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nextcloud/vue */ "./node_modules/@nextcloud/vue/dist/index.mjs");
/* harmony import */ var _mixins_setContent_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../mixins/setContent.js */ "./src/mixins/setContent.js");



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'CollisionResolveDialog',
  components: {
    NcButton: _nextcloud_vue__WEBPACK_IMPORTED_MODULE_1__.NcButton
  },
  mixins: [_Editor_provider_js__WEBPACK_IMPORTED_MODULE_0__.useEditorMixin, _Editor_provider_js__WEBPACK_IMPORTED_MODULE_0__.useIsRichEditorMixin, _mixins_setContent_js__WEBPACK_IMPORTED_MODULE_2__["default"], _Editor_provider_js__WEBPACK_IMPORTED_MODULE_0__.useSyncServiceMixin],
  props: {
    syncError: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      clicked: false
    };
  },
  methods: {
    resolveThisVersion() {
      this.clicked = true;
      this.$syncService.forceSave().then(() => this.$syncService.syncUp());
      this.$editor.setEditable(!this.readOnly);
    },
    resolveServerVersion() {
      const {
        outsideChange
      } = this.syncError.data;
      this.clicked = true;
      this.$editor.setEditable(!this.readOnly);
      this.setContent(outsideChange, {
        isRich: this.$isRichEditor
      });
      this.$syncService.forceSave().then(() => this.$syncService.syncUp());
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Editor.vue?vue&type=script&lang=js":
/*!***************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Editor.vue?vue&type=script&lang=js ***!
  \***************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.runtime.esm.js");
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var _nextcloud_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nextcloud/auth */ "./node_modules/@nextcloud/auth/dist/index.es.mjs");
/* harmony import */ var _nextcloud_initial_state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nextcloud/initial-state */ "./node_modules/@nextcloud/initial-state/dist/index.es.mjs");
/* harmony import */ var _nextcloud_event_bus__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nextcloud/event-bus */ "./node_modules/@nextcloud/event-bus/dist/index.mjs");
/* harmony import */ var _tiptap_extension_collaboration__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @tiptap/extension-collaboration */ "./node_modules/@tiptap/extension-collaboration/dist/index.js");
/* harmony import */ var _extensions_Autofocus_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../extensions/Autofocus.js */ "./src/extensions/Autofocus.js");
/* harmony import */ var yjs__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! yjs */ "./node_modules/yjs/dist/yjs.mjs");
/* harmony import */ var _vueuse_core__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! @vueuse/core */ "./node_modules/@vueuse/core/index.mjs");
/* harmony import */ var _Editor_provider_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Editor.provider.js */ "./src/components/Editor.provider.js");
/* harmony import */ var _Menu_ReadonlyBar_vue__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Menu/ReadonlyBar.vue */ "./src/components/Menu/ReadonlyBar.vue");
/* harmony import */ var _helpers_logger_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../helpers/logger.js */ "./src/helpers/logger.js");
/* harmony import */ var _helpers_yjs_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../helpers/yjs.js */ "./src/helpers/yjs.js");
/* harmony import */ var _services_SyncService_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./../services/SyncService.js */ "./src/services/SyncService.js");
/* harmony import */ var _services_SyncServiceProvider_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./../services/SyncServiceProvider.js */ "./src/services/SyncServiceProvider.js");
/* harmony import */ var _services_AttachmentResolver_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./../services/AttachmentResolver.js */ "./src/services/AttachmentResolver.js");
/* harmony import */ var _helpers_mappings_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../helpers/mappings.js */ "./src/helpers/mappings.js");
/* harmony import */ var _EditorFactory_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./../EditorFactory.js */ "./src/EditorFactory.js");
/* harmony import */ var _extensions_Markdown_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./../extensions/Markdown.js */ "./src/extensions/Markdown.js");
/* harmony import */ var _markdownit_index_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./../markdownit/index.js */ "./src/markdownit/index.js");
/* harmony import */ var _extensions_index_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../extensions/index.js */ "./src/extensions/index.js");
/* harmony import */ var _Editor_DocumentStatus_vue__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./Editor/DocumentStatus.vue */ "./src/components/Editor/DocumentStatus.vue");
/* harmony import */ var _mixins_isMobile_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./../mixins/isMobile.js */ "./src/mixins/isMobile.js");
/* harmony import */ var _mixins_setContent_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./../mixins/setContent.js */ "./src/mixins/setContent.js");
/* harmony import */ var _mixins_store_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./../mixins/store.js */ "./src/mixins/store.js");
/* harmony import */ var _Menu_MenuBar_vue__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./Menu/MenuBar.vue */ "./src/components/Menu/MenuBar.vue");
/* harmony import */ var _Editor_ContentContainer_vue__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./Editor/ContentContainer.vue */ "./src/components/Editor/ContentContainer.vue");
/* harmony import */ var _Editor_Status_vue__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./Editor/Status.vue */ "./src/components/Editor/Status.vue");
/* harmony import */ var _Editor_MainContainer_vue__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./Editor/MainContainer.vue */ "./src/components/Editor/MainContainer.vue");
/* harmony import */ var _Editor_Wrapper_vue__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./Editor/Wrapper.vue */ "./src/components/Editor/Wrapper.vue");
/* harmony import */ var _SkeletonLoading_vue__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./SkeletonLoading.vue */ "./src/components/SkeletonLoading.vue");
/* harmony import */ var _Assistant_vue__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./Assistant.vue */ "./src/components/Assistant.vue");
































/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'Editor',
  components: {
    SkeletonLoading: _SkeletonLoading_vue__WEBPACK_IMPORTED_MODULE_26__["default"],
    DocumentStatus: _Editor_DocumentStatus_vue__WEBPACK_IMPORTED_MODULE_17__["default"],
    Wrapper: _Editor_Wrapper_vue__WEBPACK_IMPORTED_MODULE_25__["default"],
    MainContainer: _Editor_MainContainer_vue__WEBPACK_IMPORTED_MODULE_24__["default"],
    ReadonlyBar: _Menu_ReadonlyBar_vue__WEBPACK_IMPORTED_MODULE_6__["default"],
    ContentContainer: _Editor_ContentContainer_vue__WEBPACK_IMPORTED_MODULE_22__["default"],
    MenuBar: _Menu_MenuBar_vue__WEBPACK_IMPORTED_MODULE_21__["default"],
    Reader: () => Promise.all(/*! import() | editor */[__webpack_require__.e("mermaid"), __webpack_require__.e("vendors-node_modules_nextcloud_vue_dist_index_mjs"), __webpack_require__.e("vendors-node_modules_braintree_sanitize-url_dist_index_js-node_modules_quartzy_markdown-it-me-adaa01"), __webpack_require__.e("vendors-node_modules_nextcloud_dialogs_dist_index_mjs-node_modules_nextcloud_l10n_dist_index_mjs"), __webpack_require__.e("vendors-node_modules_nextcloud_logger_dist_index_js-node_modules_path-normalize_lib_index_js--238364"), __webpack_require__.e("src_extensions_index_js-src_components_Editor_EditorOutline_vue-data_image_svg_xml_3csvg_20xm-1ac8cb"), __webpack_require__.e("editor")]).then(__webpack_require__.bind(__webpack_require__, /*! ./Reader.vue */ "./src/components/Reader.vue")),
    Status: _Editor_Status_vue__WEBPACK_IMPORTED_MODULE_23__["default"],
    Assistant: _Assistant_vue__WEBPACK_IMPORTED_MODULE_27__["default"]
  },
  mixins: [_mixins_isMobile_js__WEBPACK_IMPORTED_MODULE_18__["default"], _mixins_setContent_js__WEBPACK_IMPORTED_MODULE_19__["default"], _mixins_store_js__WEBPACK_IMPORTED_MODULE_20__["default"]],
  provide() {
    const val = {};

    // providers aren't naturally reactive
    // and $editor will start as null
    // using getters we can always provide the
    // actual $editor, and other values without being reactive
    Object.defineProperties(val, {
      [_Editor_provider_js__WEBPACK_IMPORTED_MODULE_5__.EDITOR]: {
        get: () => this.$editor
      },
      [_Editor_provider_js__WEBPACK_IMPORTED_MODULE_5__.SYNC_SERVICE]: {
        get: () => this.$syncService
      },
      [_Editor_provider_js__WEBPACK_IMPORTED_MODULE_5__.FILE]: {
        get: () => this.fileData
      },
      [_Editor_provider_js__WEBPACK_IMPORTED_MODULE_5__.ATTACHMENT_RESOLVER]: {
        get: () => this.$attachmentResolver
      },
      [_Editor_provider_js__WEBPACK_IMPORTED_MODULE_5__.IS_PUBLIC]: {
        get: () => this.isPublic
      },
      [_Editor_provider_js__WEBPACK_IMPORTED_MODULE_5__.IS_RICH_EDITOR]: {
        get: () => this.isRichEditor
      },
      [_Editor_provider_js__WEBPACK_IMPORTED_MODULE_5__.IS_RICH_WORKSPACE]: {
        get: () => this.isRichWorkspace
      },
      [_Editor_provider_js__WEBPACK_IMPORTED_MODULE_5__.IS_MOBILE]: {
        get: () => this.isMobile
      }
    });
    return val;
  },
  inject: ['isEmbedded'],
  props: {
    richWorkspace: {
      type: Boolean,
      require: false,
      default: false
    },
    initialSession: {
      type: Object,
      default: null
    },
    relativePath: {
      type: String,
      default: ''
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
    hideMenu: {
      type: Boolean,
      default: false
    },
    isDirectEditing: {
      type: Boolean,
      default: false
    },
    showOutlineOutside: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      IDLE_TIMEOUT: _services_SyncService_js__WEBPACK_IMPORTED_MODULE_9__.IDLE_TIMEOUT,
      document: null,
      sessions: [],
      currentSession: null,
      filteredSessions: {},
      idle: false,
      dirty: false,
      contentLoaded: false,
      syncError: null,
      hasConnectionIssue: false,
      hasEditor: false,
      readOnly: true,
      forceRecreate: false,
      menubarLoaded: false,
      draggedOver: false,
      contentWrapper: null
    };
  },
  computed: {
    ...(0,vuex__WEBPACK_IMPORTED_MODULE_28__.mapState)({
      showAuthorAnnotations: state => state.text.showAuthorAnnotations
    }),
    isRichWorkspace() {
      return this.richWorkspace;
    },
    hasSyncCollission() {
      return this.syncError && this.syncError.type === _services_SyncService_js__WEBPACK_IMPORTED_MODULE_9__.ERROR_TYPE.SAVE_COLLISSION;
    },
    hasDocumentParameters() {
      return this.fileId || this.shareToken || this.initialSession;
    },
    isPublic() {
      return this.isDirectEditing || document.getElementById('isPublic') && document.getElementById('isPublic').value === '1';
    },
    isRichEditor() {
      return (0,_nextcloud_initial_state__WEBPACK_IMPORTED_MODULE_1__.loadState)('text', 'rich_editing_enabled', true) && this.mime === 'text/markdown';
    },
    fileExtension() {
      return this.relativePath ? this.relativePath.split('/').pop().split('.').pop() : 'txt';
    },
    currentDirectory() {
      return this.relativePath ? this.relativePath.split('/').slice(0, -1).join('/') : '/';
    },
    displayed() {
      return this.currentSession && this.active;
    },
    displayedStatus() {
      return this.displayed || !!this.syncError;
    },
    renderRichEditorMenus() {
      return this.contentLoaded && this.isRichEditor && !this.syncError && !this.readOnly;
    },
    renderMenus() {
      return this.contentLoaded && !this.syncError;
    },
    imagePath() {
      return this.relativePath.split('/').slice(0, -1).join('/');
    },
    fileData() {
      return {
        fileId: this.fileId,
        relativePath: this.relativePath,
        document: {
          ...this.document
        }
      };
    }
  },
  watch: {
    displayed() {
      this.$nextTick(() => {
        this.contentWrapper = this.$refs.contentWrapper;
      });
    }
  },
  mounted() {
    if (this.active && this.hasDocumentParameters) {
      this.initSession();
    }
    if (!this.richWorkspace) {
      /* If the editor is shown in the viewer we need to hide the content,
         if richt workspace is used we **must** not hide the content */
      window.addEventListener('beforeprint', this.preparePrinting);
      window.addEventListener('afterprint', this.preparePrinting);
    }
    (0,_nextcloud_event_bus__WEBPACK_IMPORTED_MODULE_2__.subscribe)('text:image-node:add', this.onAddImageNode);
    (0,_nextcloud_event_bus__WEBPACK_IMPORTED_MODULE_2__.subscribe)('text:image-node:delete', this.onDeleteImageNode);
    this.emit('update:loaded', true);
    (0,_vueuse_core__WEBPACK_IMPORTED_MODULE_29__.useResizeObserver)(this.$el, entries => {
      const entry = entries[0];
      const {
        width
      } = entry.contentRect;
      const maxWidth = width - 36;
      this.$el.style.setProperty('--widget-full-width', "".concat(maxWidth, "px"));
    });
  },
  created() {
    this.$ydoc = new yjs__WEBPACK_IMPORTED_MODULE_30__.Doc();
    this.$queue = [];
    // The following can be useful for debugging ydoc updates
    // this.$ydoc.on('update', function(update, origin, doc, tr) {
    //   console.debug('ydoc update', update, origin, doc, tr)
    //   Y.logUpdate(update)
    // });
    this.$providers = [];
    this.$editor = null;
    this.$syncService = null;
    this.$attachmentResolver = null;
  },
  async beforeDestroy() {
    if (!this.richWorkspace) {
      window.removeEventListener('beforeprint', this.preparePrinting);
      window.removeEventListener('afterprint', this.preparePrinting);
    }
    (0,_nextcloud_event_bus__WEBPACK_IMPORTED_MODULE_2__.unsubscribe)('text:image-node:add', this.onAddImageNode);
    (0,_nextcloud_event_bus__WEBPACK_IMPORTED_MODULE_2__.unsubscribe)('text:image-node:delete', this.onDeleteImageNode);
    if (this.dirty) {
      const timeout = new Promise(resolve => setTimeout(resolve, 2000));
      await Promise.any([timeout, this.$syncService.save()]);
    }
    this.$providers.forEach(p => p.destroy());
  },
  methods: {
    initSession() {
      var _this$$syncService;
      if (!this.hasDocumentParameters) {
        this.emit('error', 'No valid file provided');
        return;
      }
      const guestName = localStorage.getItem('nick') ? localStorage.getItem('nick') : '';
      this.$syncService = new _services_SyncService_js__WEBPACK_IMPORTED_MODULE_9__.SyncService({
        guestName,
        shareToken: this.shareToken,
        filePath: this.relativePath,
        baseVersionEtag: (_this$$syncService = this.$syncService) === null || _this$$syncService === void 0 ? void 0 : _this$$syncService.baseVersionEtag,
        forceRecreate: this.forceRecreate,
        serialize: this.isRichEditor ? content => (0,_extensions_Markdown_js__WEBPACK_IMPORTED_MODULE_14__.createMarkdownSerializer)(this.$editor.schema).serialize(content !== null && content !== void 0 ? content : this.$editor.state.doc) : content => (0,_EditorFactory_js__WEBPACK_IMPORTED_MODULE_13__.serializePlainText)(content !== null && content !== void 0 ? content : this.$editor.state.doc),
        getDocumentState: () => (0,_helpers_yjs_js__WEBPACK_IMPORTED_MODULE_8__.getDocumentState)(this.$ydoc)
      });
      this.listenSyncServiceEvents();
      this.$providers.forEach(p => p === null || p === void 0 ? void 0 : p.destroy());
      this.$providers = [];
      const syncServiceProvider = (0,_services_SyncServiceProvider_js__WEBPACK_IMPORTED_MODULE_10__["default"])({
        ydoc: this.$ydoc,
        syncService: this.$syncService,
        fileId: this.fileId,
        queue: this.$queue,
        initialSession: this.initialSession
      });
      this.$providers.push(syncServiceProvider);
      this.forceRecreate = false;
    },
    listenEditorEvents() {
      this.$editor.on('focus', this.onFocus);
      this.$editor.on('blur', this.onBlur);
    },
    unlistenEditorEvents() {
      this.$editor.off('focus', this.onFocus);
      this.$editor.off('blur', this.onBlur);
    },
    listenSyncServiceEvents() {
      this.$syncService.on('opened', this.onOpened).on('change', this.onChange).on('loaded', this.onLoaded).on('sync', this.onSync).on('error', this.onError).on('stateChange', this.onStateChange).on('idle', this.onIdle).on('save', this.onSave);
    },
    unlistenSyncServiceEvents() {
      this.$syncService.off('opened', this.onOpened).off('change', this.onChange).off('loaded', this.onLoaded).off('sync', this.onSync).off('error', this.onError).off('stateChange', this.onStateChange).off('idle', this.onIdle).off('save', this.onSave);
    },
    reconnect() {
      this.contentLoaded = false;
      this.hasConnectionIssue = false;
      this.close().then(this.initSession);
      this.idle = false;
    },
    updateSessions(sessions) {
      this.sessions = sessions.sort((a, b) => b.lastContact - a.lastContact);

      // Make sure we get our own session updated
      // This should ideally be part of a global store where we can have that updated on the actual name change for guests
      const currentUpdatedSession = this.sessions.find(session => session.id === this.currentSession.id);
      (0,vue__WEBPACK_IMPORTED_MODULE_31__.set)(this, 'currentSession', currentUpdatedSession);
      const currentSessionIds = this.sessions.map(session => session.userId);
      const currentGuestIds = this.sessions.map(session => session.guestId);
      const removedSessions = Object.keys(this.filteredSessions).filter(sessionId => !currentSessionIds.includes(sessionId) && !currentGuestIds.includes(sessionId));
      for (const index in removedSessions) {
        vue__WEBPACK_IMPORTED_MODULE_31__["default"].delete(this.filteredSessions, removedSessions[index]);
      }
      for (const index in this.sessions) {
        const session = this.sessions[index];
        const sessionKey = session.displayName ? session.userId : session.id;
        if (this.filteredSessions[sessionKey]) {
          // update timestamp if relevant
          if (this.filteredSessions[sessionKey].lastContact < session.lastContact) {
            (0,vue__WEBPACK_IMPORTED_MODULE_31__.set)(this.filteredSessions[sessionKey], 'lastContact', session.lastContact);
          }
        } else {
          (0,vue__WEBPACK_IMPORTED_MODULE_31__.set)(this.filteredSessions, sessionKey, session);
        }
        if (session.id === this.currentSession.id) {
          (0,vue__WEBPACK_IMPORTED_MODULE_31__.set)(this.filteredSessions[sessionKey], 'isCurrent', true);
        }
      }
    },
    onOpened(_ref) {
      let {
        document,
        session
      } = _ref;
      this.currentSession = session;
      this.document = document;
      this.readOnly = document.readOnly;
      if (this.$editor) {
        this.$editor.setEditable(!this.readOnly);
      }
      this.lock = this.$syncService.lock;
      localStorage.setItem('nick', this.currentSession.guestName);
      this.$attachmentResolver = new _services_AttachmentResolver_js__WEBPACK_IMPORTED_MODULE_11__["default"]({
        session: this.currentSession,
        user: (0,_nextcloud_auth__WEBPACK_IMPORTED_MODULE_0__.getCurrentUser)(),
        shareToken: this.shareToken,
        currentDirectory: this.currentDirectory
      });
    },
    onLoaded(_ref2) {
      let {
        documentSource,
        documentState
      } = _ref2;
      if (documentState) {
        (0,_helpers_yjs_js__WEBPACK_IMPORTED_MODULE_8__.applyDocumentState)(this.$ydoc, documentState, this.$providers[0]);
        // distribute additional state that may exist locally
        const updateMessage = (0,_helpers_yjs_js__WEBPACK_IMPORTED_MODULE_8__.getUpdateMessage)(this.$ydoc, documentState);
        if (updateMessage) {
          _helpers_logger_js__WEBPACK_IMPORTED_MODULE_7__.logger.debug('onLoaded: Pushing local changes to server');
          this.$queue.push(updateMessage);
        }
      }
      this.hasConnectionIssue = false;
      const language = _helpers_mappings_js__WEBPACK_IMPORTED_MODULE_12__.extensionHighlight[this.fileExtension] || this.fileExtension;
      (this.isRichEditor ? Promise.resolve() : (0,_EditorFactory_js__WEBPACK_IMPORTED_MODULE_13__.loadSyntaxHighlight)(language)).then(() => {
        const session = this.currentSession;
        if (!this.$editor) {
          this.$editor = (0,_EditorFactory_js__WEBPACK_IMPORTED_MODULE_13__.createEditor)({
            language,
            relativePath: this.relativePath,
            session,
            onCreate: _ref3 => {
              let {
                editor
              } = _ref3;
              this.$syncService.startSync();
            },
            onUpdate: _ref4 => {
              let {
                editor
              } = _ref4;
              // this.debugContent(editor)
              const proseMirrorMarkdown = this.$syncService.serialize(editor.state.doc);
              this.emit('update:content', {
                markdown: proseMirrorMarkdown
              });
            },
            extensions: [_extensions_Autofocus_js__WEBPACK_IMPORTED_MODULE_4__["default"].configure({
              fileId: this.fileId
            }), _tiptap_extension_collaboration__WEBPACK_IMPORTED_MODULE_3__.Collaboration.configure({
              document: this.$ydoc
            }), _extensions_index_js__WEBPACK_IMPORTED_MODULE_16__.CollaborationCursor.configure({
              provider: this.$providers[0],
              user: {
                name: session !== null && session !== void 0 && session.userId ? session.displayName : (session === null || session === void 0 ? void 0 : session.guestName) || t('text', 'Guest'),
                color: session === null || session === void 0 ? void 0 : session.color,
                clientId: this.$ydoc.clientID
              }
            })],
            enableRichEditing: this.isRichEditor,
            isEmbedded: this.isEmbedded
          });
          this.hasEditor = true;
          if (!documentState && documentSource) {
            this.setContent(documentSource, {
              isRich: this.isRichEditor,
              addToHistory: false
            });
          }
          this.listenEditorEvents();
        } else {
          // $editor already existed. So this is a reconnect.
          this.$syncService.startSync();
        }
      });
    },
    onChange(_ref5) {
      let {
        document,
        sessions
      } = _ref5;
      this.updateSessions.bind(this)(sessions);
      this.document = document;
      this.syncError = null;
      this.$editor.setEditable(!this.readOnly);
    },
    onSync(_ref6) {
      let {
        steps,
        document
      } = _ref6;
      this.hasConnectionIssue = false;
      this.$nextTick(() => {
        this.emit('sync-service:sync');
      });
      this.document = document;
    },
    onError(_ref7) {
      let {
        type,
        data
      } = _ref7;
      this.$nextTick(() => {
        var _this$$editor;
        (_this$$editor = this.$editor) === null || _this$$editor === void 0 ? void 0 : _this$$editor.setEditable(false);
        this.emit('sync-service:error');
      });
      if (type === _services_SyncService_js__WEBPACK_IMPORTED_MODULE_9__.ERROR_TYPE.LOAD_ERROR) {
        this.syncError = {
          type,
          data
        };
      }
      if (type === _services_SyncService_js__WEBPACK_IMPORTED_MODULE_9__.ERROR_TYPE.SAVE_COLLISSION && (!this.syncError || this.syncError.type !== _services_SyncService_js__WEBPACK_IMPORTED_MODULE_9__.ERROR_TYPE.SAVE_COLLISSION)) {
        this.contentLoaded = true;
        this.syncError = {
          type,
          data
        };
      }
      if (type === _services_SyncService_js__WEBPACK_IMPORTED_MODULE_9__.ERROR_TYPE.CONNECTION_FAILED && !this.hasConnectionIssue) {
        this.hasConnectionIssue = true;
        OC.Notification.showTemporary('Connection failed.');
      }
      if (type === _services_SyncService_js__WEBPACK_IMPORTED_MODULE_9__.ERROR_TYPE.SOURCE_NOT_FOUND) {
        this.hasConnectionIssue = true;
      }
      this.emit('ready');
    },
    onStateChange(state) {
      if (state.initialLoading && !this.contentLoaded) {
        this.contentLoaded = true;
        if (this.autofocus && !this.readOnly) {
          this.$nextTick(() => {
            this.$editor.commands.autofocus();
          });
        }
        this.emit('ready');
      }
      if (Object.prototype.hasOwnProperty.call(state, 'dirty')) {
        // ignore initial loading and other automated changes
        if (this.$editor && (this.$editor.can().undo() || this.$editor.can().redo())) {
          this.dirty = state.dirty;
          if (this.dirty) {
            this.$syncService.autosave();
          }
        }
      }
    },
    onIdle() {
      this.$syncService.close();
      this.idle = true;
      this.readOnly = true;
      this.$editor.setEditable(!this.readOnly);
      this.$nextTick(() => {
        this.emit('sync-service:idle');
      });
    },
    onSave() {
      (0,_nextcloud_event_bus__WEBPACK_IMPORTED_MODULE_2__.emit)('files:file:updated', {
        fileid: this.fileId
      });
      this.$nextTick(() => {
        this.emit('sync-service:save');
      });
    },
    onFocus() {
      this.emit('focus');
    },
    onBlur() {
      this.emit('blur');
    },
    onAddImageNode() {
      this.emit('add-image-node');
    },
    onDeleteImageNode(imageUrl) {
      this.emit('delete-image-node', imageUrl);
    },
    async save() {
      await this.$syncService.save();
    },
    async close() {
      if (this.currentSession && this.$syncService) {
        try {
          await this.$syncService.close();
          this.unlistenSyncServiceEvents();
          this.currentSession = null;
          this.$syncService = null;
        } catch (e) {
          // Ignore issues closing the session since those might happen due to network issues
        }
      }
      if (this.$editor) {
        try {
          this.unlistenEditorEvents();
          this.$editor.destroy();
          this.$editor = null;
          this.hasEditor = false;
        } catch (error) {
          _helpers_logger_js__WEBPACK_IMPORTED_MODULE_7__.logger.warn('Failed to destroy editor', {
            error
          });
        }
      }
      return true;
    },
    /**
     * Wrapper to emit events on our own and the parent component
     *
     * The parent might be either the root component of src/editor.js or Viewer.vue which collectives currently uses
     *
     * Ideally this would be done in a generic way in the src/editor.js API abstraction, but it seems
     * that there is no proper way to pass any received event along in vue, the only option I've found
     * in https://github.com/vuejs/vue/issues/230 feels too hacky to me, so we just emit twice for now
     *
     * @param {string} event The event name
     * @param {any} data The data to pass along
     */
    emit(event, data) {
      var _this$$parent;
      this.$emit(event, data);
      (_this$$parent = this.$parent) === null || _this$$parent === void 0 ? void 0 : _this$$parent.$emit(event, data);
    },
    /** @param {Event} event The passed event */
    preparePrinting(event) {
      const content = document.getElementById('content');
      // Hide Content behind modal, this also hides the sidebar if open
      if (content && event.type === 'beforeprint') {
        content.style.display = 'none';
      } else if (content) {
        content.style.display = '';
      }
    },
    /**
     * Helper method to debug serialization of content between markdown and HTML
     *
     * @param {object} editor The Tiptap editor
     */
    debugContent(editor) {
      const proseMirrorMarkdown = this.$syncService.serialize(editor.state.doc);
      const markdownItHtml = _markdownit_index_js__WEBPACK_IMPORTED_MODULE_15__["default"].render(proseMirrorMarkdown);
      _helpers_logger_js__WEBPACK_IMPORTED_MODULE_7__.logger.debug('markdown, serialized from editor state by prosemirror-markdown');
      console.debug(proseMirrorMarkdown);
      _helpers_logger_js__WEBPACK_IMPORTED_MODULE_7__.logger.debug('HTML, serialized from markdown by markdown-it');
      console.debug(markdownItHtml);
      _helpers_logger_js__WEBPACK_IMPORTED_MODULE_7__.logger.debug('HTML, as rendered in the browser by Tiptap');
      console.debug(editor.getHTML());
    },
    outlineToggled(visible) {
      this.emit('outline-toggled', visible);
    },
    onKeyDown(event) {
      if (event.key === 'Escape') {
        event.preventDefault();
        return;
      }
      if (event.key === 'Tab' && !event.shiftKey && !event.ctrlKey && !event.metaKey && this.$editor.isActive('codeBlock')) {
        this.$editor.commands.insertContent('\t');
        this.$editor.commands.focus();
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      if ((event.ctrlKey || event.metaKey) && event.key === 's') {
        this.$syncService.save();
        event.preventDefault();
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Editor/ContentContainer.vue?vue&type=script&lang=js":
/*!********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Editor/ContentContainer.vue?vue&type=script&lang=js ***!
  \********************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _tiptap_vue_2__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @tiptap/vue-2 */ "./node_modules/@tiptap/vue-2/dist/index.js");
/* harmony import */ var _Editor_provider_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Editor.provider.js */ "./src/components/Editor.provider.js");
/* harmony import */ var _Wrapper_provider_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Wrapper.provider.js */ "./src/components/Editor/Wrapper.provider.js");
/* harmony import */ var _EditorOutline_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./EditorOutline.vue */ "./src/components/Editor/EditorOutline.vue");




/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'ContentContainer',
  components: {
    EditorContent: _tiptap_vue_2__WEBPACK_IMPORTED_MODULE_3__.EditorContent,
    EditorOutline: _EditorOutline_vue__WEBPACK_IMPORTED_MODULE_2__["default"]
  },
  mixins: [_Editor_provider_js__WEBPACK_IMPORTED_MODULE_0__.useEditorMixin, _Wrapper_provider_js__WEBPACK_IMPORTED_MODULE_1__.useOutlineStateMixin],
  computed: {
    showOutline() {
      return this.$outlineState.visible;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Editor/DocumentStatus.vue?vue&type=script&lang=js":
/*!******************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Editor/DocumentStatus.vue?vue&type=script&lang=js ***!
  \******************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_SyncService_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../services/SyncService.js */ "./src/services/SyncService.js");
/* harmony import */ var vue_material_design_icons_Lock_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue-material-design-icons/Lock.vue */ "./node_modules/vue-material-design-icons/Lock.vue");
/* harmony import */ var _nextcloud_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nextcloud/vue */ "./node_modules/@nextcloud/vue/dist/index.mjs");
/* harmony import */ var _CollisionResolveDialog_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../CollisionResolveDialog.vue */ "./src/components/CollisionResolveDialog.vue");




/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'DocumentStatus',
  components: {
    CollisionResolveDialog: _CollisionResolveDialog_vue__WEBPACK_IMPORTED_MODULE_3__["default"],
    Lock: vue_material_design_icons_Lock_vue__WEBPACK_IMPORTED_MODULE_1__["default"],
    NcNoteCard: _nextcloud_vue__WEBPACK_IMPORTED_MODULE_2__.NcNoteCard
  },
  props: {
    idle: {
      type: Boolean,
      require: true
    },
    lock: {
      type: Object,
      default: null
    },
    syncError: {
      type: Object,
      default: null
    },
    hasConnectionIssue: {
      type: Boolean,
      require: true
    }
  },
  data() {
    return {
      IDLE_TIMEOUT: _services_SyncService_js__WEBPACK_IMPORTED_MODULE_0__.IDLE_TIMEOUT
    };
  },
  computed: {
    hasSyncCollission() {
      return this.syncError && this.syncError.type === _services_SyncService_js__WEBPACK_IMPORTED_MODULE_0__.ERROR_TYPE.SAVE_COLLISSION;
    },
    isLoadingError() {
      return this.syncError && this.syncError.type === _services_SyncService_js__WEBPACK_IMPORTED_MODULE_0__.ERROR_TYPE.LOAD_ERROR;
    },
    hasWarning() {
      return this.syncError || this.hasConnectionIssue;
    }
  },
  methods: {
    reconnect() {
      this.$emit('reconnect');
    },
    reload() {
      window.location.reload();
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Editor/MainContainer.vue?vue&type=script&lang=js":
/*!*****************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Editor/MainContainer.vue?vue&type=script&lang=js ***!
  \*****************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _MediaHandler_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MediaHandler.vue */ "./src/components/Editor/MediaHandler.vue");
/* harmony import */ var _Editor_provider_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Editor.provider.js */ "./src/components/Editor.provider.js");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'MainContainer',
  components: {
    MediaHandler: _MediaHandler_vue__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  mixins: [_Editor_provider_js__WEBPACK_IMPORTED_MODULE_1__.useEditorUpload]
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Editor/MarkdownContentEditor.vue?vue&type=script&lang=js":
/*!*************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Editor/MarkdownContentEditor.vue?vue&type=script&lang=js ***!
  \*************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Wrapper_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Wrapper.vue */ "./src/components/Editor/Wrapper.vue");
/* harmony import */ var _MainContainer_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MainContainer.vue */ "./src/components/Editor/MainContainer.vue");
/* harmony import */ var _Menu_MenuBar_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Menu/MenuBar.vue */ "./src/components/Menu/MenuBar.vue");
/* harmony import */ var _tiptap_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @tiptap/core */ "./node_modules/@tiptap/core/dist/index.js");
/* harmony import */ var _tiptap_extension_history__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @tiptap/extension-history */ "./node_modules/@tiptap/extension-history/dist/index.js");
/* harmony import */ var _nextcloud_auth__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @nextcloud/auth */ "./node_modules/@nextcloud/auth/dist/index.es.mjs");
/* harmony import */ var _Editor_provider_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Editor.provider.js */ "./src/components/Editor.provider.js");
/* harmony import */ var _extensions_Markdown_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../extensions/Markdown.js */ "./src/extensions/Markdown.js");
/* harmony import */ var _services_AttachmentResolver_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../services/AttachmentResolver.js */ "./src/services/AttachmentResolver.js");
/* harmony import */ var _markdownit_index_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../markdownit/index.js */ "./src/markdownit/index.js");
/* harmony import */ var _extensions_index_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../extensions/index.js */ "./src/extensions/index.js");
/* harmony import */ var _Menu_ReadonlyBar_vue__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../Menu/ReadonlyBar.vue */ "./src/components/Menu/ReadonlyBar.vue");
/* harmony import */ var _ContentContainer_vue__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./ContentContainer.vue */ "./src/components/Editor/ContentContainer.vue");




/* eslint-disable import/no-named-as-default */









/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'MarkdownContentEditor',
  components: {
    ContentContainer: _ContentContainer_vue__WEBPACK_IMPORTED_MODULE_11__["default"],
    ReadonlyBar: _Menu_ReadonlyBar_vue__WEBPACK_IMPORTED_MODULE_10__["default"],
    MenuBar: _Menu_MenuBar_vue__WEBPACK_IMPORTED_MODULE_2__["default"],
    MainContainer: _MainContainer_vue__WEBPACK_IMPORTED_MODULE_1__["default"],
    Wrapper: _Wrapper_vue__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  provide() {
    const val = {};
    Object.defineProperties(val, {
      [_Editor_provider_js__WEBPACK_IMPORTED_MODULE_5__.EDITOR]: {
        get: () => this.$editor
      },
      [_Editor_provider_js__WEBPACK_IMPORTED_MODULE_5__.ATTACHMENT_RESOLVER]: {
        get: () => {
          var _this$$attachmentReso;
          return (_this$$attachmentReso = this.$attachmentResolver) !== null && _this$$attachmentReso !== void 0 ? _this$$attachmentReso : null;
        }
      },
      [_Editor_provider_js__WEBPACK_IMPORTED_MODULE_5__.IS_RICH_EDITOR]: {
        get: () => true
      }
    });
    return val;
  },
  props: {
    fileId: {
      type: Number,
      default: null
    },
    content: {
      type: String,
      required: true
    },
    readOnly: {
      type: Boolean,
      default: false
    },
    relativePath: {
      type: String,
      default: ''
    },
    shareToken: {
      type: String,
      default: null
    },
    showOutlineOutside: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:content'],
  computed: {
    htmlContent() {
      return this.renderHtml(this.content);
    }
  },
  watch: {
    content() {
      this.updateContent();
    }
  },
  created() {
    this.$editor = this.createEditor();
    this.$editor.setEditable(!this.readOnly);
    if (this.fileId) {
      var _this$relativePath;
      this.$attachmentResolver = new _services_AttachmentResolver_js__WEBPACK_IMPORTED_MODULE_7__["default"]({
        currentDirectory: (_this$relativePath = this.relativePath) === null || _this$relativePath === void 0 ? void 0 : _this$relativePath.match(/.*\//),
        user: (0,_nextcloud_auth__WEBPACK_IMPORTED_MODULE_4__.getCurrentUser)(),
        shareToken: this.shareToken,
        fileId: this.fileId
      });
    }
  },
  updated() {
    this.$editor.setEditable(!this.readOnly);
  },
  beforeDestroy() {
    this.$editor.destroy();
  },
  methods: {
    renderHtml(content) {
      return _markdownit_index_js__WEBPACK_IMPORTED_MODULE_8__["default"].render(content);
    },
    extensions() {
      return [_extensions_index_js__WEBPACK_IMPORTED_MODULE_9__.RichText.configure({
        component: this,
        extensions: [_tiptap_extension_history__WEBPACK_IMPORTED_MODULE_3__["default"]]
      })];
    },
    createEditor() {
      return new _tiptap_core__WEBPACK_IMPORTED_MODULE_12__.Editor({
        content: this.htmlContent,
        extensions: this.extensions(),
        onUpdate: _ref => {
          let {
            editor
          } = _ref;
          const markdown = (0,_extensions_Markdown_js__WEBPACK_IMPORTED_MODULE_6__.createMarkdownSerializer)(this.$editor.schema).serialize(editor.state.doc);
          this.emit('update:content', {
            json: editor.state.doc,
            markdown
          });
        },
        onCreate: _ref2 => {
          let {
            editor
          } = _ref2;
          this.$emit('ready');
          this.$parent.$emit('ready');
        }
      });
    },
    updateContent() {
      this.$editor.commands.setContent(this.htmlContent, true);
    },
    outlineToggled(visible) {
      this.emit('outline-toggled', visible);
    },
    /**
     * Wrapper to emit events on our own and the parent component
     *
     * The parent might be either the root component of src/editor.js or Viewer.vue which collectives currently uses
     *
     * Ideally this would be done in a generic way in the src/editor.js API abstraction, but it seems
     * that there is no proper way to pass any received event along in vue, the only option I've found
     * in https://github.com/vuejs/vue/issues/230 feels too hacky to me, so we just emit twice for now
     *
     * @param {string} event The event name
     * @param {any} data The data to pass along
     */
    emit(event, data) {
      var _this$$parent;
      this.$emit(event, data);
      (_this$$parent = this.$parent) === null || _this$$parent === void 0 ? void 0 : _this$$parent.$emit(event, data);
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Editor/MediaHandler.vue?vue&type=script&lang=js":
/*!****************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Editor/MediaHandler.vue?vue&type=script&lang=js ***!
  \****************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _nextcloud_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nextcloud/auth */ "./node_modules/@nextcloud/auth/dist/index.es.mjs");
/* harmony import */ var _nextcloud_dialogs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nextcloud/dialogs */ "./node_modules/@nextcloud/dialogs/dist/index.mjs");
/* harmony import */ var _nextcloud_event_bus__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nextcloud/event-bus */ "./node_modules/@nextcloud/event-bus/dist/index.mjs");
/* harmony import */ var _helpers_logger_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../helpers/logger.js */ "./src/helpers/logger.js");
/* harmony import */ var _Editor_provider_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Editor.provider.js */ "./src/components/Editor.provider.js");
/* harmony import */ var _MediaHandler_provider_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./MediaHandler.provider.js */ "./src/components/Editor/MediaHandler.provider.js");






const getDir = val => val.split('/').slice(0, -1).join('/');
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'MediaHandler',
  mixins: [_Editor_provider_js__WEBPACK_IMPORTED_MODULE_4__.useEditorMixin, _Editor_provider_js__WEBPACK_IMPORTED_MODULE_4__.useFileMixin, _Editor_provider_js__WEBPACK_IMPORTED_MODULE_4__.useSyncServiceMixin],
  provide() {
    const val = {};
    Object.defineProperties(val, {
      [_MediaHandler_provider_js__WEBPACK_IMPORTED_MODULE_5__.ACTION_ATTACHMENT_PROMPT]: {
        get: () => this.showAttachmentPrompt
      },
      [_MediaHandler_provider_js__WEBPACK_IMPORTED_MODULE_5__.ACTION_CHOOSE_LOCAL_ATTACHMENT]: {
        get: () => this.chooseLocalFile
      },
      [_MediaHandler_provider_js__WEBPACK_IMPORTED_MODULE_5__.STATE_UPLOADING]: {
        get: () => this.state
      }
    });
    return val;
  },
  data() {
    return {
      lastFilePath: null,
      draggedOver: false,
      // make it reactive to be used inject/provide
      state: {
        isUploadingAttachments: false
      }
    };
  },
  computed: {
    initialFilePath() {
      var _this$lastFilePath, _this$$file$relativeP, _this$$file;
      return (_this$lastFilePath = this.lastFilePath) !== null && _this$lastFilePath !== void 0 ? _this$lastFilePath : getDir((_this$$file$relativeP = (_this$$file = this.$file) === null || _this$$file === void 0 ? void 0 : _this$$file.relativePath) !== null && _this$$file$relativeP !== void 0 ? _this$$file$relativeP : '/');
    }
  },
  methods: {
    setDraggedOver(val) {
      this.draggedOver = val;
    },
    onPaste(e) {
      this.uploadAttachmentFiles(e.detail.files);
    },
    onEditorDrop(e) {
      this.uploadAttachmentFiles(e.detail.files, e.detail.position);
      this.draggedOver = false;
    },
    onAttachmentUploadFilePicked(event) {
      this.uploadAttachmentFiles(event.target.files);
      // Clear input to ensure that the change event will be emitted if
      // the same file is picked again.
      event.target.value = '';
    },
    chooseLocalFile() {
      this.$refs.attachmentFileInput.click();
    },
    async uploadAttachmentFiles(files) {
      let position = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      if (!files) {
        return;
      }
      this.state.isUploadingAttachments = true;
      const uploadPromises = [...files].map(file => {
        return this.uploadAttachmentFile(file, position);
      });
      return Promise.all(uploadPromises).catch(error => {
        var _error$response;
        _helpers_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.error('Uploading multiple images failed', {
          error
        });
        (0,_nextcloud_dialogs__WEBPACK_IMPORTED_MODULE_1__.showError)((error === null || error === void 0 || (_error$response = error.response) === null || _error$response === void 0 || (_error$response = _error$response.data) === null || _error$response === void 0 ? void 0 : _error$response.error) || error.message);
      }).then(() => {
        this.state.isUploadingAttachments = false;
      });
    },
    async uploadAttachmentFile(file) {
      let position = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      this.state.isUploadingAttachments = true;
      return this.$syncService.uploadAttachment(file).then(response => {
        var _response$data, _response$data2, _response$data3;
        this.insertAttachment((_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.name, (_response$data2 = response.data) === null || _response$data2 === void 0 ? void 0 : _response$data2.id, file.type, position, (_response$data3 = response.data) === null || _response$data3 === void 0 ? void 0 : _response$data3.dirname);
      }).catch(error => {
        var _error$response2;
        _helpers_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.error('Uploading image failed', {
          error
        });
        (0,_nextcloud_dialogs__WEBPACK_IMPORTED_MODULE_1__.showError)(error === null || error === void 0 || (_error$response2 = error.response) === null || _error$response2 === void 0 || (_error$response2 = _error$response2.data) === null || _error$response2 === void 0 ? void 0 : _error$response2.error);
      }).then(() => {
        this.state.isUploadingAttachments = false;
      });
    },
    showAttachmentPrompt() {
      const currentUser = (0,_nextcloud_auth__WEBPACK_IMPORTED_MODULE_0__.getCurrentUser)();
      if (!currentUser) {
        return;
      }
      OC.dialogs.filepicker(t('text', 'Insert an attachment'), filePath => {
        this.insertFromPath(filePath);
      }, false, [], true, undefined, this.initialFilePath);
    },
    insertFromPath(filePath) {
      this.lastFilePath = getDir(filePath);
      this.state.isUploadingAttachments = true;
      return this.$syncService.insertAttachmentFile(filePath).then(response => {
        var _response$data4, _response$data5, _response$data6, _response$data7;
        this.insertAttachment((_response$data4 = response.data) === null || _response$data4 === void 0 ? void 0 : _response$data4.name, (_response$data5 = response.data) === null || _response$data5 === void 0 ? void 0 : _response$data5.id, (_response$data6 = response.data) === null || _response$data6 === void 0 ? void 0 : _response$data6.mimetype, null, (_response$data7 = response.data) === null || _response$data7 === void 0 ? void 0 : _response$data7.dirname);
      }).catch(error => {
        var _error$response3;
        _helpers_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.error('Failed to insert image path', {
          error
        });
        (0,_nextcloud_dialogs__WEBPACK_IMPORTED_MODULE_1__.showError)((error === null || error === void 0 || (_error$response3 = error.response) === null || _error$response3 === void 0 || (_error$response3 = _error$response3.data) === null || _error$response3 === void 0 ? void 0 : _error$response3.error) || error.message);
      }).then(() => {
        this.state.isUploadingAttachments = false;
      });
    },
    insertAttachment(name, fileId, mimeType) {
      let position = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
      let dirname = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '';
      // inspired by the fixedEncodeURIComponent function suggested in
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent
      const src = dirname + '/' + encodeURIComponent(name).replace(/[!'()*]/g, c => {
        return '%' + c.charCodeAt(0).toString(16).toUpperCase();
      });
      // simply get rid of brackets to make sure link text is valid
      // as it does not need to be unique and matching the real file name
      const alt = name.replaceAll(/[[\]]/g, '');
      const chain = position ? this.$editor.chain().focus(position) : this.$editor.chain();
      chain.setImage({
        src,
        alt
      }).run();
      const selection = this.$editor.view.state.selection;
      if (!selection.empty) {
        // If inserted image is first element, it is selected and would get overwritten by
        // subsequent editor inserts (see tiptap#3355). So unselect the image by placing
        // the cursor at the end of the selection.
        this.$editor.commands.focus(selection.to);
      }

      // Scroll image into view
      this.$editor.commands.scrollIntoView();
      (0,_nextcloud_event_bus__WEBPACK_IMPORTED_MODULE_2__.emit)('text:image-node:add', null);
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Editor/Status.vue?vue&type=script&lang=js":
/*!**********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Editor/Status.vue?vue&type=script&lang=js ***!
  \**********************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_SyncService_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../services/SyncService.js */ "./src/services/SyncService.js");
/* harmony import */ var _nextcloud_moment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nextcloud/moment */ "./node_modules/@nextcloud/moment/dist/index.mjs");
/* harmony import */ var _nextcloud_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nextcloud/vue */ "./node_modules/@nextcloud/vue/dist/index.mjs");
/* harmony import */ var _Editor_provider_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Editor.provider.js */ "./src/components/Editor.provider.js");
/* harmony import */ var _mixins_refreshMoment_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../mixins/refreshMoment.js */ "./src/mixins/refreshMoment.js");





/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'Status',
  components: {
    NcButton: _nextcloud_vue__WEBPACK_IMPORTED_MODULE_2__.NcButton,
    NcSavingIndicatorIcon: _nextcloud_vue__WEBPACK_IMPORTED_MODULE_2__.NcSavingIndicatorIcon,
    SessionList: () => __webpack_require__.e(/*! import() | editor-collab */ "editor-collab").then(__webpack_require__.bind(__webpack_require__, /*! ./SessionList.vue */ "./src/components/Editor/SessionList.vue")),
    GuestNameDialog: () => __webpack_require__.e(/*! import() | editor-guest */ "editor-guest").then(__webpack_require__.bind(__webpack_require__, /*! ./GuestNameDialog.vue */ "./src/components/Editor/GuestNameDialog.vue"))
  },
  mixins: [_Editor_provider_js__WEBPACK_IMPORTED_MODULE_3__.useIsMobileMixin, _Editor_provider_js__WEBPACK_IMPORTED_MODULE_3__.useIsPublicMixin, _Editor_provider_js__WEBPACK_IMPORTED_MODULE_3__.useSyncServiceMixin, _mixins_refreshMoment_js__WEBPACK_IMPORTED_MODULE_4__["default"]],
  props: {
    hasConnectionIssue: {
      type: Boolean,
      require: true
    },
    dirty: {
      type: Boolean,
      require: true
    },
    document: {
      type: Object,
      default: null
    },
    syncError: {
      type: Object,
      default: null
    },
    sessions: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  computed: {
    lastSavedStatus() {
      if (this.hasConnectionIssue) {
        return this.$isMobile ? t('text', 'Offline') : t('text', 'Offline, changes will be saved when online');
      }
      return this.dirtyStateIndicator ? t('text', 'Saving …') : t('text', 'Saved');
    },
    dirtyStateIndicator() {
      return this.dirty || this.hasUnsavedChanges;
    },
    lastSavedStatusTooltip() {
      let message = t('text', 'Last saved {lastSave}', {
        lastSave: this.lastSavedString
      });
      if (this.hasSyncCollission) {
        message = t('text', 'The document has been changed outside of the editor. The changes cannot be applied.');
      }
      if (this.dirty || this.hasUnsavedChanges) {
        message += ' - ' + t('text', 'Unsaved changes');
      }
      return message;
    },
    hasUnsavedChanges() {
      return this.document && this.document.lastSavedVersion < this.document.currentVersion;
    },
    hasSyncCollission() {
      return this.syncError && this.syncError.type === _services_SyncService_js__WEBPACK_IMPORTED_MODULE_0__.ERROR_TYPE.SAVE_COLLISSION;
    },
    saveStatusClass() {
      if (this.syncError && this.lastSavedString !== '') {
        return 'error';
      }
      return this.dirtyStateIndicator ? 'saving' : 'saved';
    },
    currentSession() {
      return Object.values(this.sessions).find(session => session.isCurrent);
    },
    lastSavedString() {
      // Make this a dependent of refreshMoment, so it will be recomputed
      /* eslint-disable-next-line no-unused-expressions */
      this.refreshMoment;
      return (0,_nextcloud_moment__WEBPACK_IMPORTED_MODULE_1__["default"])(this.document.lastSavedVersionTime * 1000).fromNow();
    }
  },
  methods: {
    onClickSave() {
      if (this.dirtyStateIndicator) {
        this.$syncService.forceSave();
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Editor/Wrapper.vue?vue&type=script&lang=js":
/*!***********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Editor/Wrapper.vue?vue&type=script&lang=js ***!
  \***********************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_SyncService_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../services/SyncService.js */ "./src/services/SyncService.js");
/* harmony import */ var _Editor_provider_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../Editor.provider.js */ "./src/components/Editor.provider.js");
/* harmony import */ var _Wrapper_provider_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Wrapper.provider.js */ "./src/components/Editor/Wrapper.provider.js");
/* harmony import */ var _mixins_store_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../mixins/store.js */ "./src/mixins/store.js");
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");





/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'Wrapper',
  mixins: [_mixins_store_js__WEBPACK_IMPORTED_MODULE_3__["default"], _Editor_provider_js__WEBPACK_IMPORTED_MODULE_1__.useIsRichEditorMixin, _Editor_provider_js__WEBPACK_IMPORTED_MODULE_1__.useIsRichWorkspaceMixin],
  provide() {
    const val = {};
    Object.defineProperties(val, {
      [_Wrapper_provider_js__WEBPACK_IMPORTED_MODULE_2__.OUTLINE_STATE]: {
        get: () => this.outline
      },
      [_Wrapper_provider_js__WEBPACK_IMPORTED_MODULE_2__.OUTLINE_ACTIONS]: {
        get: () => ({
          toggle: this.outlineToggle
        })
      }
    });
    return val;
  },
  props: {
    syncError: {
      type: Object,
      default: null
    },
    hasConnectionIssue: {
      type: Boolean,
      default: false
    },
    contentLoaded: {
      type: Boolean,
      default: true
    },
    showAuthorAnnotations: {
      type: Boolean,
      default: false
    },
    showOutlineOutside: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    outline: {
      visible: false,
      enable: false
    }
  }),
  computed: {
    ...(0,vuex__WEBPACK_IMPORTED_MODULE_4__.mapState)({
      viewWidth: state => state.text.viewWidth
    }),
    hasSyncCollission() {
      return this.syncError && this.syncError.type === _services_SyncService_js__WEBPACK_IMPORTED_MODULE_0__.ERROR_TYPE.SAVE_COLLISSION;
    },
    showOutline() {
      return this.isAbleToShowOutline ? this.outline.visible : false;
    },
    isAbleToShowOutline() {
      if (this.$isRichWorkspace) {
        return false;
      }
      return this.viewWidth > 1265;
    }
  },
  watch: {
    'showOutlineOutside'() {
      this.outline.visible = this.showOutlineOutside;
    }
  },
  mounted() {
    this.outline.enable = this.isAbleToShowOutline;
    this.$watch(() => this.isAbleToShowOutline, enable => {
      // make outline state reactive through the provider
      Object.assign(this.outline, {
        enable
      });
    });
  },
  methods: {
    outlineToggle() {
      this.outline.visible = !this.outline.visible;
      this.$emit('outline-toggled', this.outline.visible);
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/HelpModal.vue?vue&type=script&lang=js":
/*!******************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/HelpModal.vue?vue&type=script&lang=js ***!
  \******************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _nextcloud_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nextcloud/vue */ "./node_modules/@nextcloud/vue/dist/index.mjs");
/* harmony import */ var _helpers_platform_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers/platform.js */ "./src/helpers/platform.js");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'HelpModal',
  components: {
    NcDialog: _nextcloud_vue__WEBPACK_IMPORTED_MODULE_0__.NcDialog
  },
  data() {
    return {
      formatted: {
        bold: true,
        italic: true,
        strikethrough: true,
        heading1: true,
        heading6: true,
        unorderdList: true,
        orderedList: true,
        checkList: true,
        blockQuote: true,
        codeBlock: true
      }
    };
  },
  computed: {
    isFormatted() {
      return style => this.formatted[style];
    },
    // Cache the output of `isMobilePlatform()`
    isMobileCached() {
      return this.isMobilePlatform();
    }
  },
  methods: {
    toggleFormatted(style) {
      this.formatted[style] = !this.formatted[style];
    },
    isMobilePlatform: _helpers_platform_js__WEBPACK_IMPORTED_MODULE_1__.isMobilePlatform
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Menu/ActionFormattingHelp.vue?vue&type=script&lang=js":
/*!**********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Menu/ActionFormattingHelp.vue?vue&type=script&lang=js ***!
  \**********************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.runtime.esm.js");
/* harmony import */ var _nextcloud_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nextcloud/vue */ "./node_modules/@nextcloud/vue/dist/index.mjs");
/* harmony import */ var _icons_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../icons.js */ "./src/components/icons.js");



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,vue__WEBPACK_IMPORTED_MODULE_2__.defineComponent)({
  // This component is used as a direct child of NcActions.
  // Even if it actually renders NcActionButton, NcActions cannot see it due to rendering limitations in Vue.
  // Though it works in general, NcActions doesn't handle it correctly. See NcActions docs for details.
  // Hotfix - rename the component to NcActionButton because it represents and renders it.
  // eslint-disable-next-line vue/match-component-file-name
  name: 'NcActionButton',
  components: {
    NextcloudVueNcActionButton: _nextcloud_vue__WEBPACK_IMPORTED_MODULE_0__.NcActionButton,
    Help: _icons_js__WEBPACK_IMPORTED_MODULE_1__.Help
  }
}));

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Menu/ActionList.vue?vue&type=script&lang=js":
/*!************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Menu/ActionList.vue?vue&type=script&lang=js ***!
  \************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _nextcloud_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nextcloud/vue */ "./node_modules/@nextcloud/vue/dist/index.mjs");
/* harmony import */ var _BaseActionEntry_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BaseActionEntry.js */ "./src/components/Menu/BaseActionEntry.js");
/* harmony import */ var _ActionListItem_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ActionListItem.vue */ "./src/components/Menu/ActionListItem.vue");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils.js */ "./src/components/Menu/utils.js");
/* harmony import */ var _Editor_Wrapper_provider_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Editor/Wrapper.provider.js */ "./src/components/Editor/Wrapper.provider.js");
/* harmony import */ var _mixins_store_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../mixins/store.js */ "./src/mixins/store.js");
/* harmony import */ var _MenuBar_provider_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./MenuBar.provider.js */ "./src/components/Menu/MenuBar.provider.js");







/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'ActionList',
  components: {
    NcActions: _nextcloud_vue__WEBPACK_IMPORTED_MODULE_0__.NcActions,
    NcActionSeparator: _nextcloud_vue__WEBPACK_IMPORTED_MODULE_0__.NcActionSeparator,
    ActionListItem: _ActionListItem_vue__WEBPACK_IMPORTED_MODULE_2__["default"]
  },
  extends: _BaseActionEntry_js__WEBPACK_IMPORTED_MODULE_1__.BaseActionEntry,
  mixins: [_mixins_store_js__WEBPACK_IMPORTED_MODULE_5__["default"], _Editor_Wrapper_provider_js__WEBPACK_IMPORTED_MODULE_4__.useOutlineStateMixin, _MenuBar_provider_js__WEBPACK_IMPORTED_MODULE_6__.useMenuIDMixin],
  data: () => ({
    visible: false
  }),
  computed: {
    currentChild() {
      const {
        state,
        $editor,
        actionEntry: {
          children
        }
      } = this;
      if (!state.active) {
        return null;
      }
      return children.find(child => {
        return (0,_utils_js__WEBPACK_IMPORTED_MODULE_3__.getIsActive)(child, $editor);
      });
    },
    icon() {
      if (this.currentChild) {
        return this.currentChild.icon;
      }
      return this.actionEntry.icon;
    },
    iconKey() {
      return "".concat(this.actionEntry.key, "/").concat(this.activeKey);
    },
    activeKey() {
      var _this$currentChild;
      return (_this$currentChild = this.currentChild) === null || _this$currentChild === void 0 ? void 0 : _this$currentChild.key;
    },
    children() {
      return this.actionEntry.children.filter(_ref => {
        let {
          visible
        } = _ref;
        if (visible === undefined) {
          return true;
        }
        return typeof visible === 'function' ? visible(this) : visible;
      });
    },
    labelWithSelected() {
      if (this.currentChild) {
        // TRANSLATORS: examples - Headings, "Heading 1" is selected - Callouts, "Info" is selected
        return t('text', '{menuItemName}, "{selectedSubMenuItemName}" is selected', {
          menuItemName: this.actionEntry.label,
          selectedSubMenuItemName: this.currentChild.label
        });
      }
      return this.actionEntry.label;
    }
  },
  methods: {
    onOpenChange(val) {
      this.visible = val;
    },
    runAction() {
      // nothing todo
    },
    onTrigger(entry) {
      if (entry !== null && entry !== void 0 && entry.click) {
        return;
      }
      this.$editor.chain().focus().run();
      this.$emit('trigged', entry);
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Menu/ActionListItem.vue?vue&type=script&lang=js":
/*!****************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Menu/ActionListItem.vue?vue&type=script&lang=js ***!
  \****************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _nextcloud_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nextcloud/vue */ "./node_modules/@nextcloud/vue/dist/index.mjs");
/* harmony import */ var _BaseActionEntry_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BaseActionEntry.js */ "./src/components/Menu/BaseActionEntry.js");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  // This component is used as a direct child of NcActions.
  // Even if it actually renders NcActionButton, NcActions cannot see it due to rendering limitations in Vue.
  // Though it works in general, NcActions doesn't handle it correctly. See NcActions docs for details.
  // Hotfix - rename the component to NcActionButton because it represents and renders it.
  // eslint-disable-next-line vue/match-component-file-name
  name: 'NcActionButton',
  components: {
    NextcloudVueNcActionButton: _nextcloud_vue__WEBPACK_IMPORTED_MODULE_0__.NcActionButton
  },
  extends: _BaseActionEntry_js__WEBPACK_IMPORTED_MODULE_1__.BaseActionEntry,
  mounted() {
    this.$editor.on('transaction', () => this.updateState());
  },
  methods: {
    runAction() {
      const {
        actionEntry
      } = this;
      if (actionEntry.click) {
        actionEntry.click(this);
      } else {
        var _actionEntry$action;
        // Some actions run themselves.
        // others still need to have .run() called upon them.
        (_actionEntry$action = actionEntry.action(this.$editor.chain().focus())) === null || _actionEntry$action === void 0 ? void 0 : _actionEntry$action.run();
      }
      this.$nextTick(() => {
        this.$emit('trigged', {
          ...actionEntry
        });
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Menu/ActionSingle.vue?vue&type=script&lang=js":
/*!**************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Menu/ActionSingle.vue?vue&type=script&lang=js ***!
  \**************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _nextcloud_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nextcloud/vue */ "./node_modules/@nextcloud/vue/dist/index.mjs");
/* harmony import */ var _BaseActionEntry_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BaseActionEntry.js */ "./src/components/Menu/BaseActionEntry.js");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'ActionSingle',
  components: {
    NcButton: _nextcloud_vue__WEBPACK_IMPORTED_MODULE_0__.NcButton
  },
  extends: _BaseActionEntry_js__WEBPACK_IMPORTED_MODULE_1__.BaseActionEntry,
  props: {
    isItem: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    this.$editor.on('transaction', () => this.updateState());
  },
  methods: {
    runAction() {
      const {
        actionEntry
      } = this;
      if (actionEntry.click) {
        actionEntry.click(this);
      } else {
        var _actionEntry$action;
        // Some actions run themselves.
        // others still need to have .run() called upon them.
        (_actionEntry$action = actionEntry.action(this.$editor.chain().focus())) === null || _actionEntry$action === void 0 ? void 0 : _actionEntry$action.run();
      }
      this.$nextTick(() => {
        this.$emit('trigged', {
          ...actionEntry
        });
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Menu/CharacterCount.vue?vue&type=script&lang=js":
/*!****************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Menu/CharacterCount.vue?vue&type=script&lang=js ***!
  \****************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.runtime.esm.js");
/* harmony import */ var _nextcloud_l10n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nextcloud/l10n */ "./node_modules/@nextcloud/l10n/dist/index.mjs");
/* harmony import */ var _nextcloud_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nextcloud/vue */ "./node_modules/@nextcloud/vue/dist/index.mjs");
/* harmony import */ var _icons_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../icons.js */ "./src/components/icons.js");
/* harmony import */ var _Editor_provider_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Editor.provider.js */ "./src/components/Editor.provider.js");





/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,vue__WEBPACK_IMPORTED_MODULE_4__.defineComponent)({
  name: 'CharacterCount',
  components: {
    AlphabeticalVariant: _icons_js__WEBPACK_IMPORTED_MODULE_2__.AlphabeticalVariant,
    NcActionText: _nextcloud_vue__WEBPACK_IMPORTED_MODULE_1__.NcActionText
  },
  mixins: [_Editor_provider_js__WEBPACK_IMPORTED_MODULE_3__.useEditorMixin],
  props: {
    visible: Boolean
  },
  data: () => ({
    wordCount: 0,
    charCount: 0
  }),
  computed: {
    countString() {
      return "".concat((0,_nextcloud_l10n__WEBPACK_IMPORTED_MODULE_0__.translatePlural)('text', '%n word', '%n words', this.wordCount), ", ").concat((0,_nextcloud_l10n__WEBPACK_IMPORTED_MODULE_0__.translatePlural)('text', '%n char', '%n chars', this.charCount));
    }
  },
  watch: {
    visible: 'refresh'
  },
  created() {
    this.refresh();
  },
  methods: {
    refresh() {
      // characterCount is not reactive so we need this workaround
      this.wordCount = this.$editor.storage.characterCount.words();
      this.charCount = this.$editor.storage.characterCount.characters();
    }
  }
}));

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Menu/MenuBar.vue?vue&type=script&lang=js":
/*!*********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Menu/MenuBar.vue?vue&type=script&lang=js ***!
  \*********************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _nextcloud_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nextcloud/vue */ "./node_modules/@nextcloud/vue/dist/index.mjs");
/* harmony import */ var _nextcloud_initial_state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nextcloud/initial-state */ "./node_modules/@nextcloud/initial-state/dist/index.es.mjs");
/* harmony import */ var _vueuse_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @vueuse/core */ "./node_modules/@vueuse/core/index.mjs");
/* harmony import */ var _ActionFormattingHelp_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ActionFormattingHelp.vue */ "./src/components/Menu/ActionFormattingHelp.vue");
/* harmony import */ var _ActionList_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ActionList.vue */ "./src/components/Menu/ActionList.vue");
/* harmony import */ var _ActionSingle_vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ActionSingle.vue */ "./src/components/Menu/ActionSingle.vue");
/* harmony import */ var _CharacterCount_vue__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./CharacterCount.vue */ "./src/components/Menu/CharacterCount.vue");
/* harmony import */ var _HelpModal_vue__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../HelpModal.vue */ "./src/components/HelpModal.vue");
/* harmony import */ var _ToolBarLogic_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ToolBarLogic.js */ "./src/components/Menu/ToolBarLogic.js");
/* harmony import */ var _Modal_Translate_vue__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./../Modal/Translate.vue */ "./src/components/Modal/Translate.vue");
/* harmony import */ var _entries_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./entries.js */ "./src/components/Menu/entries.js");
/* harmony import */ var _MenuBar_provider_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./MenuBar.provider.js */ "./src/components/Menu/MenuBar.provider.js");
/* harmony import */ var _icons_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../icons.js */ "./src/components/icons.js");
/* harmony import */ var _Editor_provider_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../Editor.provider.js */ "./src/components/Editor.provider.js");














/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'MenuBar',
  components: {
    ActionFormattingHelp: _ActionFormattingHelp_vue__WEBPACK_IMPORTED_MODULE_2__["default"],
    ActionList: _ActionList_vue__WEBPACK_IMPORTED_MODULE_3__["default"],
    ActionSingle: _ActionSingle_vue__WEBPACK_IMPORTED_MODULE_4__["default"],
    HelpModal: _HelpModal_vue__WEBPACK_IMPORTED_MODULE_6__["default"],
    NcActionSeparator: _nextcloud_vue__WEBPACK_IMPORTED_MODULE_0__.NcActionSeparator,
    NcActionButton: _nextcloud_vue__WEBPACK_IMPORTED_MODULE_0__.NcActionButton,
    CharacterCount: _CharacterCount_vue__WEBPACK_IMPORTED_MODULE_5__["default"],
    TranslateVariant: _icons_js__WEBPACK_IMPORTED_MODULE_11__.TranslateVariant,
    Translate: _Modal_Translate_vue__WEBPACK_IMPORTED_MODULE_8__["default"]
  },
  extends: _ToolBarLogic_js__WEBPACK_IMPORTED_MODULE_7__["default"],
  mixins: [_Editor_provider_js__WEBPACK_IMPORTED_MODULE_12__.useEditorMixin, _Editor_provider_js__WEBPACK_IMPORTED_MODULE_12__.useIsMobileMixin, _Editor_provider_js__WEBPACK_IMPORTED_MODULE_12__.useIsRichEditorMixin, _Editor_provider_js__WEBPACK_IMPORTED_MODULE_12__.useIsRichWorkspaceMixin],
  provide() {
    const val = {};
    Object.defineProperties(val, {
      [_MenuBar_provider_js__WEBPACK_IMPORTED_MODULE_10__.MENU_ID]: {
        get: () => this.randomID
      }
    });
    return val;
  },
  props: {
    isHidden: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      entries: [..._entries_js__WEBPACK_IMPORTED_MODULE_9__["default"]],
      randomID: "menu-bar-".concat(Math.ceil(Math.random() * 10000 + 500).toString(16)),
      displayHelp: false,
      displayTranslate: false,
      isReady: false,
      canTranslate: (0,_nextcloud_initial_state__WEBPACK_IMPORTED_MODULE_1__.loadState)('text', 'translation_languages', []).length > 0,
      resize: null,
      iconsLimit: 4
    };
  },
  computed: {
    visibleEntries() {
      const list = this.entries.filter(_ref => {
        let {
          priority
        } = _ref;
        // if entry has no priority, we assume it always will be visible
        return priority === undefined || priority <= this.iconsLimit;
      });
      return list;
    },
    hiddenEntries() {
      const remainingEntries = this.entries.filter(_ref2 => {
        let {
          priority
        } = _ref2;
        // reverse logic from visibleEntries
        return priority !== undefined && priority > this.iconsLimit;
      });
      const entries = remainingEntries.reduce((acc, entry, index) => {
        var _entry$children;
        // If entry has children, merge them into list. Otherwise keep entry itself.
        const children = (_entry$children = entry.children) !== null && _entry$children !== void 0 ? _entry$children : [entry];
        // If this block has menu entries, it should be separated for better visibility and a11y (menu item radio grouping)
        if (children.length > 1) {
          const hasPreviousItem = acc.length && !acc.at(-1).isSeparator;
          const separatorBefore = hasPreviousItem ? [{
            key: "separator-before-".concat(entry.id),
            isSeparator: true
          }] : [];
          const hasNextItem = index !== remainingEntries.length - 1;
          const separatorAfter = hasNextItem ? [{
            key: "separator-after-".concat(entry.id),
            isSeparator: true
          }] : [];
          return [...acc, ...separatorBefore, ...children, ...separatorAfter];
        }
        return [...acc, ...children];
      }, []);
      return {
        key: 'remain',
        label: this.t('text', 'Remaining actions'),
        icon: _icons_js__WEBPACK_IMPORTED_MODULE_11__.DotsHorizontal,
        children: entries
      };
    }
  },
  mounted() {
    this.resize = (0,_vueuse_core__WEBPACK_IMPORTED_MODULE_13__.useResizeObserver)(this.$refs.menubar, this.onResize);
    this.$nextTick(() => {
      this.isReady = true;
      this.$emit('update:loaded', true);
    });
  },
  beforeDestroy() {
    var _this$resize;
    (_this$resize = this.resize) === null || _this$resize === void 0 ? void 0 : _this$resize.stop();
  },
  methods: {
    onResize(entries) {
      const entry = entries[0];
      const {
        width
      } = entry.contentRect;

      // leave some buffer - this is necessary so the bar does not wrap during resizing
      const spaceToFill = width - 4;
      const spacePerSlot = this.$isMobile ? 44 : 46;
      const slots = Math.floor(spaceToFill / spacePerSlot);

      // Leave one slot empty for the three dot menu
      this.iconsLimit = slots - 1;
      this.isReady = true;
    },
    showHelp() {
      this.displayHelp = true;
    },
    hideHelp() {
      this.displayHelp = false;
    },
    showTranslate() {
      var _selectedText;
      const {
        from,
        to
      } = this.$editor.view.state.selection;
      let selectedText = this.$editor.view.state.doc.textBetween(from, to, ' ');
      if (!selectedText.trim().length) {
        this.$editor.commands.selectAll();
        selectedText = this.$editor.view.state.doc.textContent;
      }
      console.debug('translation click', this.$editor.view.state.selection, selectedText);
      this.displayTranslate = (_selectedText = selectedText) !== null && _selectedText !== void 0 ? _selectedText : '';
    },
    hideTranslate() {
      this.displayTranslate = false;
    },
    translateInsert(content) {
      this.$editor.commands.command(_ref3 => {
        let {
          tr,
          commands
        } = _ref3;
        return commands.insertContentAt(tr.selection.to, content);
      });
      this.displayTranslate = false;
    },
    translateReplace(content) {
      this.$editor.commands.command(_ref4 => {
        let {
          tr,
          commands
        } = _ref4;
        const selection = tr.selection;
        const range = {
          from: selection.from,
          to: selection.to
        };
        return commands.insertContentAt(range, content);
      });
      this.displayTranslate = false;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Menu/ReadonlyBar.vue?vue&type=script&lang=js":
/*!*************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Menu/ReadonlyBar.vue?vue&type=script&lang=js ***!
  \*************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.runtime.esm.js");
/* harmony import */ var _entries_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./entries.js */ "./src/components/Menu/entries.js");
/* harmony import */ var _ActionList_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ActionList.vue */ "./src/components/Menu/ActionList.vue");
/* harmony import */ var _ActionSingle_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ActionSingle.vue */ "./src/components/Menu/ActionSingle.vue");
/* harmony import */ var _ToolBarLogic_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ToolBarLogic.js */ "./src/components/Menu/ToolBarLogic.js");





/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,vue__WEBPACK_IMPORTED_MODULE_4__.defineComponent)({
  name: 'ReadonlyBar',
  components: {
    ActionList: _ActionList_vue__WEBPACK_IMPORTED_MODULE_1__["default"],
    ActionSingle: _ActionSingle_vue__WEBPACK_IMPORTED_MODULE_2__["default"]
  },
  extends: _ToolBarLogic_js__WEBPACK_IMPORTED_MODULE_3__["default"],
  data() {
    return {
      entries: _entries_js__WEBPACK_IMPORTED_MODULE_0__.ReadonlyEntries
    };
  }
}));

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Modal/Translate.vue?vue&type=script&lang=js":
/*!************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Modal/Translate.vue?vue&type=script&lang=js ***!
  \************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _nextcloud_axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nextcloud/axios */ "./node_modules/@nextcloud/axios/dist/index.es.mjs");
/* harmony import */ var _nextcloud_initial_state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nextcloud/initial-state */ "./node_modules/@nextcloud/initial-state/dist/index.es.mjs");
/* harmony import */ var _nextcloud_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nextcloud/router */ "./node_modules/@nextcloud/router/dist/index.mjs");
/* harmony import */ var _nextcloud_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @nextcloud/vue */ "./node_modules/@nextcloud/vue/dist/index.mjs");
/* harmony import */ var _Editor_provider_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Editor.provider.js */ "./src/components/Editor.provider.js");





const detectLanguageEntry = {
  id: null,
  label: t('text', 'Detect language')
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'Translate',
  components: {
    NcModal: _nextcloud_vue__WEBPACK_IMPORTED_MODULE_3__.NcModal,
    NcButton: _nextcloud_vue__WEBPACK_IMPORTED_MODULE_3__.NcButton,
    NcSelect: _nextcloud_vue__WEBPACK_IMPORTED_MODULE_3__.NcSelect,
    NcLoadingIcon: _nextcloud_vue__WEBPACK_IMPORTED_MODULE_3__.NcLoadingIcon,
    NcTextArea: _nextcloud_vue__WEBPACK_IMPORTED_MODULE_3__.NcTextArea
  },
  mixins: [_Editor_provider_js__WEBPACK_IMPORTED_MODULE_4__.useIsMobileMixin],
  props: {
    content: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      input: 'Hallo welt. Das ist ein Test.',
      result: '',
      fromLanguage: (0,_nextcloud_initial_state__WEBPACK_IMPORTED_MODULE_1__.loadState)('text', 'translation_can_detect', false) === true ? detectLanguageEntry : null,
      toLanguage: null,
      languages: (0,_nextcloud_initial_state__WEBPACK_IMPORTED_MODULE_1__.loadState)('text', 'translation_languages', []),
      canDetect: (0,_nextcloud_initial_state__WEBPACK_IMPORTED_MODULE_1__.loadState)('text', 'translation_can_detect'),
      loading: false,
      error: null,
      disableFromLanguageSelect: true
    };
  },
  computed: {
    fromLanguages() {
      const result = this.canDetect ? [detectLanguageEntry] : [];
      const set = new Set();
      for (const item of this.languages) {
        if (!set.has(item.from)) {
          set.add(item.from);
          result.push({
            id: item.from,
            label: !this.$isMobile ? item.fromLabel : t('text', 'Translate from {language}', {
              language: item.fromLabel
            })
          });
        }
      }
      return result;
    },
    toLanguages() {
      if (this.fromLanguage === null) {
        return [];
      }
      const languages = this.languages.filter(l => {
        if (this.fromLanguage.id === null) {
          return true;
        }
        return l.from === this.fromLanguage.id;
      });
      const result = [];
      const set = new Set();
      for (const item of languages) {
        if (!set.has(item.to)) {
          set.add(item.to);
          result.push({
            id: item.to,
            label: !this.$isMobile ? item.toLabel : t('text', 'Translate to {language}', {
              language: item.toLabel
            })
          });
        }
      }
      return result;
    }
  },
  watch: {
    input() {
      this.result = null;
      this.error = null;
      this.autosize();
    },
    toLanguage() {
      this.result = null;
      this.error = null;
    }
  },
  mounted() {
    this.input = this.content;
  },
  methods: {
    async translate() {
      this.loading = true;
      try {
        var _this$fromLanguage$id, _this$fromLanguage;
        const result = await _nextcloud_axios__WEBPACK_IMPORTED_MODULE_0__["default"].post((0,_nextcloud_router__WEBPACK_IMPORTED_MODULE_2__.generateOcsUrl)('translation/translate'), {
          text: this.input,
          fromLanguage: (_this$fromLanguage$id = (_this$fromLanguage = this.fromLanguage) === null || _this$fromLanguage === void 0 ? void 0 : _this$fromLanguage.id) !== null && _this$fromLanguage$id !== void 0 ? _this$fromLanguage$id : null,
          toLanguage: this.toLanguage.id
        });
        this.result = result.data.ocs.data.text;
      } catch (e) {
        console.error('Failed to translate', e);
        this.error = t('text', 'Translation failed');
      } finally {
        this.loading = false;
      }
    },
    async contentInsert() {
      this.$emit('insert-content', this.result);
    },
    async contentReplace() {
      this.$emit('replace-content', this.result);
    },
    autosize() {
      this.$refs.input.$refs.input.style.overflowY = 'hidden';
      this.$refs.input.$refs.input.style.height = 'auto';
      const height = this.$refs.input.$refs.input.scrollHeight + 10;
      this.$refs.input.$refs.input.style.height = height + 'px';
      this.$refs.result.$refs.input.style.height = height + 'px';
      this.$refs.input.$refs.input.style.overflowY = 'auto';
    },
    onInputFocus() {
      this.disableFromLanguageSelect = false;
      this.autosize();
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/PlainTextReader.vue?vue&type=script&lang=js":
/*!************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/PlainTextReader.vue?vue&type=script&lang=js ***!
  \************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _tiptap_extension_code_block__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tiptap/extension-code-block */ "./node_modules/@tiptap/extension-code-block/dist/index.js");
/* harmony import */ var escape_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! escape-html */ "./node_modules/escape-html/index.js");
/* harmony import */ var escape_html__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(escape_html__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _BaseReader_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./BaseReader.vue */ "./src/components/BaseReader.vue");
/* harmony import */ var _extensions_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../extensions/index.js */ "./src/extensions/index.js");
/* eslint-disable import/no-named-as-default */




/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'PlainTextReader',
  components: {
    BaseReader: _BaseReader_vue__WEBPACK_IMPORTED_MODULE_2__["default"]
  },
  provide: {
    renderHtml(content) {
      return '<pre>' + escape_html__WEBPACK_IMPORTED_MODULE_1___default()(content) + '</pre>';
    },
    extensions: () => [_extensions_index_js__WEBPACK_IMPORTED_MODULE_3__.PlainText, _tiptap_extension_code_block__WEBPACK_IMPORTED_MODULE_0__["default"]]
  },
  props: {
    content: {
      type: String,
      required: true
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Reader.vue?vue&type=script&lang=js":
/*!***************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Reader.vue?vue&type=script&lang=js ***!
  \***************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _PlainTextReader_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PlainTextReader.vue */ "./src/components/PlainTextReader.vue");
/* harmony import */ var _RichTextReader_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./RichTextReader.vue */ "./src/components/RichTextReader.vue");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'Reader',
  components: {
    PlainTextReader: _PlainTextReader_vue__WEBPACK_IMPORTED_MODULE_0__["default"],
    RichTextReader: _RichTextReader_vue__WEBPACK_IMPORTED_MODULE_1__["default"]
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
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/RichTextReader.vue?vue&type=script&lang=js":
/*!***********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/RichTextReader.vue?vue&type=script&lang=js ***!
  \***********************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _BaseReader_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseReader.vue */ "./src/components/BaseReader.vue");
/* harmony import */ var _extensions_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../extensions/index.js */ "./src/extensions/index.js");
/* harmony import */ var _markdownit_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../markdownit/index.js */ "./src/markdownit/index.js");



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'RichTextReader',
  components: {
    BaseReader: _BaseReader_vue__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  provide: {
    renderHtml(content) {
      return _markdownit_index_js__WEBPACK_IMPORTED_MODULE_2__["default"].render(content);
    },
    extensions() {
      return [_extensions_index_js__WEBPACK_IMPORTED_MODULE_1__.RichText.configure({
        editing: false
      })];
    }
  },
  props: {
    content: {
      type: String,
      required: true
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/SkeletonLoading.vue?vue&type=script&lang=js":
/*!************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/SkeletonLoading.vue?vue&type=script&lang=js ***!
  \************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const bodyStyles = window.getComputedStyle(document.body);
const colorPlaceholderDark = bodyStyles.getPropertyValue('--color-placeholder-dark');
const colorPlaceholderLight = bodyStyles.getPropertyValue('--color-placeholder-light');
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'SkeletonLoading',
  props: {
    count: {
      type: Number,
      default: 5
    }
  },
  setup() {
    return {
      colorPlaceholderDark,
      colorPlaceholderLight
    };
  },
  computed: {
    textPlaceholderData() {
      const data = [];
      for (let i = 0; i < 4; i++) {
        // generate random widths
        data.push('width: ' + (Math.floor(Math.random() * 50) + 60) + '%');
      }
      return data;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Suggestion/Mention/AutoCompleteResult.vue?vue&type=script&lang=js":
/*!**********************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Suggestion/Mention/AutoCompleteResult.vue?vue&type=script&lang=js ***!
  \**********************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _nextcloud_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nextcloud/router */ "./node_modules/@nextcloud/router/dist/index.mjs");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'AutoCompleteResult',
  props: {
    label: {
      type: String,
      required: true
    },
    subline: {
      type: String,
      default: null
    },
    id: {
      type: String,
      default: null
    },
    icon: {
      type: String,
      required: true
    },
    source: {
      type: String,
      required: true
    },
    status: {
      type: [Object, Array],
      default: () => ({})
    }
  },
  computed: {
    avatarUrl() {
      return this.id && this.source === 'users' ? this.getAvatarUrl(this.id, 44) : null;
    },
    haveStatus() {
      var _this$status, _this$status2;
      return ((_this$status = this.status) === null || _this$status === void 0 ? void 0 : _this$status.icon) || ((_this$status2 = this.status) === null || _this$status2 === void 0 ? void 0 : _this$status2.status);
    }
  },
  methods: {
    getAvatarUrl(user, size) {
      return (0,_nextcloud_router__WEBPACK_IMPORTED_MODULE_0__.generateUrl)('/avatar/{user}/{size}', {
        user,
        size
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Suggestion/Mention/MentionList.vue?vue&type=script&lang=js":
/*!***************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Suggestion/Mention/MentionList.vue?vue&type=script&lang=js ***!
  \***************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _AutoCompleteResult_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AutoCompleteResult.vue */ "./src/components/Suggestion/Mention/AutoCompleteResult.vue");
/* harmony import */ var _SuggestionListWrapper_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../SuggestionListWrapper.vue */ "./src/components/Suggestion/SuggestionListWrapper.vue");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  components: {
    AutoCompleteResult: _AutoCompleteResult_vue__WEBPACK_IMPORTED_MODULE_0__["default"],
    SuggestionListWrapper: _SuggestionListWrapper_vue__WEBPACK_IMPORTED_MODULE_1__["default"]
  },
  props: {
    items: {
      type: Array,
      required: true
    },
    command: {
      type: Function,
      required: true
    }
  },
  methods: {
    onKeyDown(_ref) {
      var _this$$refs$suggestio;
      let {
        event
      } = _ref;
      // Ignore any key modifier combinations
      return (_this$$refs$suggestio = this.$refs.suggestionList) === null || _this$$refs$suggestio === void 0 ? void 0 : _this$$refs$suggestio.onKeyDown({
        event
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/views/DirectEditing.vue?vue&type=script&lang=js":
/*!*****************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/views/DirectEditing.vue?vue&type=script&lang=js ***!
  \*****************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.runtime.esm.js");
/* harmony import */ var _components_Editor_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/Editor.vue */ "./src/components/Editor.vue");
/* harmony import */ var _helpers_logger_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers/logger.js */ "./src/helpers/logger.js");



const log = vue__WEBPACK_IMPORTED_MODULE_2__["default"].observable({
  messages: [],
  mtime: 0
});
const callMobileMessage = (messageName, attributes) => {
  _helpers_logger_js__WEBPACK_IMPORTED_MODULE_1__.logger.debug("callMobileMessage ".concat(messageName), {
    attributes
  });
  let message = messageName;
  if (typeof attributes !== 'undefined') {
    message = {
      MessageName: messageName,
      Values: attributes
    };
  }
  let attributesString = null;
  try {
    attributesString = JSON.stringify(attributes);
  } catch (e) {
    attributesString = null;
  }

  // Forward to mobile handler
  if (window.DirectEditingMobileInterface && typeof window.DirectEditingMobileInterface[messageName] === 'function') {
    if (attributesString === null || typeof attributesString === 'undefined') {
      window.DirectEditingMobileInterface[messageName]();
    } else {
      window.DirectEditingMobileInterface[messageName](attributesString);
    }
  }

  // iOS webkit fallback
  if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.DirectEditingMobileInterface) {
    window.webkit.messageHandlers.DirectEditingMobileInterface.postMessage(message);
  }
  window.postMessage(message);
};
window.addEventListener('message', function (message) {
  log.messages.push(message.data);
  _helpers_logger_js__WEBPACK_IMPORTED_MODULE_1__.logger.debug('postMessage', {
    message
  });
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'DirectEditing',
  components: {
    Editor: _components_Editor_vue__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  data() {
    return {
      initial: OCP.InitialState.loadState('text', 'file'),
      messages: log.messages,
      log,
      saving: false
    };
  },
  computed: {
    initialSession() {
      return JSON.parse(this.initial.session) || null;
    },
    isMobile() {
      return window.DirectEditingMobileInterface || window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.DirectEditingMobileInterface;
    }
  },
  beforeMount() {
    callMobileMessage('loading');
  },
  mounted() {
    document.querySelector('meta[name="viewport"]').setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0');
  },
  methods: {
    async close() {
      this.saving = true;
      setTimeout(async () => {
        await this.$refs.editor.$destroy();
        callMobileMessage('close');
      }, 0);
    },
    share() {
      callMobileMessage('share');
    },
    loaded() {
      callMobileMessage('loaded');
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Assistant.vue?vue&type=template&id=37cbcbde&scoped=true":
/*!*****************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Assistant.vue?vue&type=template&id=37cbcbde&scoped=true ***!
  \*****************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render),
/* harmony export */   staticRenderFns: () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _vm.showAssistant ? _c("div", {
    staticClass: "text-assistant"
  }, [_vm.$editor ? _c("FloatingMenu", {
    staticClass: "floating-menu",
    attrs: {
      editor: _vm.$editor,
      "tippy-options": _vm.floatingOptions(),
      "should-show": _vm.floatingShow,
      "data-cy": "assistantMenu"
    }
  }, [_c("NcActions", {
    attrs: {
      title: _vm.t("text", "Nextcloud Assistant"),
      type: "secondary"
    },
    scopedSlots: _vm._u([{
      key: "icon",
      fn: function () {
        return [_c("CreationIcon", {
          staticClass: "icon",
          attrs: {
            size: 20
          }
        })];
      },
      proxy: true
    }], null, false, 3374928481)
  }, [_vm._v(" "), _vm._l(_vm.providers, function (provider) {
    return _c("NcActionButton", {
      key: provider.task,
      attrs: {
        "close-after-click": ""
      },
      on: {
        click: function ($event) {
          return _vm.openAssistantForm(provider.task);
        }
      },
      scopedSlots: _vm._u([{
        key: "icon",
        fn: function () {
          return [provider.task == "OCP\\TextProcessing\\FreePromptTaskType" ? _c("PencilIcon", {
            attrs: {
              size: 20
            }
          }) : provider.task == "OCP\\TextProcessing\\SummarizeTaskType" ? _c("TextShort", {
            attrs: {
              size: 20
            }
          }) : provider.task == "OCP\\TextProcessing\\HeadlineTaskType" ? _c("FormatHeader1", {
            attrs: {
              size: 20
            }
          }) : provider.task == "OCA\\OpenAi\\TextProcessing\\ReformulateTaskType" ? _c("Shuffle", {
            attrs: {
              size: 20
            }
          }) : _c("CreationIcon")];
        },
        proxy: true
      }], null, true)
    }, [_vm._v("\n\t\t\t\t" + _vm._s(provider.name) + "\n\t\t\t")]);
  }), _vm._v(" "), _c("NcActionButton", {
    attrs: {
      "close-after-click": ""
    },
    on: {
      click: _vm.openTranslateDialog
    },
    scopedSlots: _vm._u([{
      key: "icon",
      fn: function () {
        return [_c("TranslateVariant", {
          attrs: {
            size: 20
          }
        })];
      },
      proxy: true
    }], null, false, 722262457)
  }, [_vm._v("\n\t\t\t\t" + _vm._s(_vm.t("text", "Translate")) + "\n\t\t\t")]), _vm._v(" "), _c("NcActionSeparator"), _vm._v(" "), _c("NcActionButton", {
    attrs: {
      "close-after-click": ""
    },
    on: {
      click: function ($event) {
        _vm.showTaskList = true;
      }
    },
    scopedSlots: _vm._u([{
      key: "icon",
      fn: function () {
        return [_c("CreationIcon", {
          attrs: {
            size: 20
          }
        })];
      },
      proxy: true
    }], null, false, 2994082090)
  }, [_vm._v("\n\t\t\t\t" + _vm._s(_vm.t("text", "Show assistant results")) + "\n\t\t\t")])], 2), _vm._v(" "), _vm.badgeStateIcon ? _c(_vm.badgeStateIcon, {
    tag: "component",
    staticClass: "floating-menu--badge",
    attrs: {
      size: 16
    }
  }) : _vm._e()], 1) : _vm._e(), _vm._v(" "), _vm.displayTranslate !== false ? _c("Translate", {
    attrs: {
      content: _vm.displayTranslate
    },
    on: {
      "insert-content": _vm.translateInsert,
      "replace-content": _vm.translateReplace,
      close: _vm.hideTranslate
    }
  }) : _vm._e(), _vm._v(" "), _c("NcModal", {
    attrs: {
      show: _vm.showTaskList
    },
    on: {
      "update:show": function ($event) {
        _vm.showTaskList = $event;
      }
    }
  }, [_c("div", {
    staticClass: "task-list"
  }, [_vm.tasks.length > 0 ? _c("h4", [_c("span", {
    staticClass: "assistant-bubble"
  }, [_c("CreationIcon", {
    staticClass: "icon",
    attrs: {
      size: 16
    }
  }), _vm._v(" "), _c("span", [_vm._v(_vm._s(_vm.t("text", "Nextcloud Assistant")))])], 1)]) : _vm._e(), _vm._v(" "), _vm.tasks.length > 0 ? _c("ul", _vm._l(_vm.tasks, function (task) {
    return _c("NcListItem", {
      key: task.id,
      attrs: {
        name: task.title,
        bold: false,
        "force-display-actions": true
      },
      on: {
        click: () => _vm.openResult(task)
      },
      scopedSlots: _vm._u([{
        key: "subname",
        fn: function () {
          return [_vm._v("\n\t\t\t\t\t\t" + _vm._s(task.input) + "\n\t\t\t\t\t")];
        },
        proxy: true
      }, {
        key: "icon",
        fn: function () {
          return [task.status === _vm.STATUS_SUCCESSFUL ? _c("CheckCircleIcon", {
            staticClass: "icon-status--success",
            attrs: {
              size: 20
            }
          }) : task.status === _vm.STATUS_FAILED ? _c("ErrorIcon", {
            staticClass: "icon-status--failed",
            attrs: {
              size: 20
            }
          }) : _c("ClockOutline", {
            attrs: {
              size: 20
            }
          })];
        },
        proxy: true
      }, {
        key: "indicator",
        fn: function () {
          return [_c("NcActions", {
            attrs: {
              inline: 2
            }
          }, [task.status === _vm.STATUS_SUCCESSFUL ? _c("NcActionButton", {
            attrs: {
              title: task.output
            },
            on: {
              click: function ($event) {
                $event.stopPropagation();
                return (() => _vm.copyResult(task)).apply(null, arguments);
              }
            },
            scopedSlots: _vm._u([{
              key: "icon",
              fn: function () {
                return [_c("ClipboardTextOutlineIcon", {
                  attrs: {
                    size: 20
                  }
                })];
              },
              proxy: true
            }], null, true)
          }, [_vm._v("\n\t\t\t\t\t\t\t\t" + _vm._s(_vm.t("text", "Insert result")) + "\n\t\t\t\t\t\t\t")]) : _vm._e()], 1)];
        },
        proxy: true
      }, {
        key: "actions",
        fn: function () {
          return [task.status === _vm.STATUS_SUCCESSFUL ? _c("NcActionButton", {
            attrs: {
              title: task.output
            },
            on: {
              click: function ($event) {
                $event.stopPropagation();
                return (() => _vm.openResult(task)).apply(null, arguments);
              }
            },
            scopedSlots: _vm._u([{
              key: "icon",
              fn: function () {
                return [_c("CreationIcon", {
                  attrs: {
                    size: 20
                  }
                })];
              },
              proxy: true
            }], null, true)
          }, [_vm._v("\n\t\t\t\t\t\t\t" + _vm._s(_vm.t("text", "Show result")) + "\n\t\t\t\t\t\t")]) : _vm._e(), _vm._v(" "), task.status === _vm.STATUS_SUCCESSFUL ? _c("NcActionButton", {
            attrs: {
              title: task.output
            },
            on: {
              click: () => _vm.insertResult(task)
            },
            scopedSlots: _vm._u([{
              key: "icon",
              fn: function () {
                return [_c("TextBoxPlusOutlineIcon", {
                  attrs: {
                    size: 20
                  }
                })];
              },
              proxy: true
            }], null, true)
          }, [_vm._v("\n\t\t\t\t\t\t\t" + _vm._s(_vm.t("text", "Insert result")) + "\n\t\t\t\t\t\t")]) : _vm._e(), _vm._v(" "), _c("NcActionButton", {
            on: {
              click: () => _vm.deleteTask(task)
            },
            scopedSlots: _vm._u([{
              key: "icon",
              fn: function () {
                return [_c("DeleteIcon", {
                  attrs: {
                    size: 20
                  }
                })];
              },
              proxy: true
            }], null, true)
          }, [_vm._v("\n\t\t\t\t\t\t\t" + _vm._s(_vm.t("text", "Delete task")) + "\n\t\t\t\t\t\t")])];
        },
        proxy: true
      }], null, true)
    });
  }), 1) : _vm._e()])])], 1) : _vm._e();
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/BaseReader.vue?vue&type=template&id=364eab24&scoped=true":
/*!******************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/BaseReader.vue?vue&type=template&id=364eab24&scoped=true ***!
  \******************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render),
/* harmony export */   staticRenderFns: () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "content-wrapper text-editor__content-wrapper",
    class: {
      "--show-outline": _vm.showOutline
    },
    attrs: {
      "data-text-el": "editor-content-wrapper"
    }
  }, [_vm.showOutline ? _c("div", {
    staticClass: "text-editor__content-wrapper__left"
  }, [_c("EditorOutline")], 1) : _vm._e(), _vm._v(" "), _vm.$editor ? _c("EditorContent", {
    staticClass: "editor__content text-editor__content",
    attrs: {
      id: "read-only-editor",
      editor: _vm.$editor
    }
  }) : _vm._e(), _vm._v(" "), _c("div", {
    staticClass: "text-editor__content-wrapper__right"
  })], 1);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/CollisionResolveDialog.vue?vue&type=template&id=5ffe7972&scoped=true":
/*!******************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/CollisionResolveDialog.vue?vue&type=template&id=5ffe7972&scoped=true ***!
  \******************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render),
/* harmony export */   staticRenderFns: () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "collision-resolve-dialog",
    class: {
      "icon-loading": _vm.clicked
    },
    attrs: {
      id: "resolve-conflicts"
    }
  }, [_c("NcButton", {
    attrs: {
      disabled: _vm.clicked,
      "data-cy": "resolveThisVersion"
    },
    on: {
      click: _vm.resolveThisVersion
    }
  }, [_vm._v("\n\t\t" + _vm._s(_vm.t("text", "Use current version")) + "\n\t")]), _vm._v(" "), _c("NcButton", {
    attrs: {
      disabled: _vm.clicked,
      "data-cy": "resolveServerVersion"
    },
    on: {
      click: _vm.resolveServerVersion
    }
  }, [_vm._v("\n\t\t" + _vm._s(_vm.t("text", "Use the saved version")) + "\n\t")])], 1);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Editor.vue?vue&type=template&id=e18b6dc6&scoped=true":
/*!**************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Editor.vue?vue&type=template&id=e18b6dc6&scoped=true ***!
  \**************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render),
/* harmony export */   staticRenderFns: () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "text-editor",
    attrs: {
      id: "editor-container",
      "data-text-el": "editor-container",
      tabindex: "-1"
    },
    on: {
      keydown: function ($event) {
        $event.stopPropagation();
        return _vm.onKeyDown.apply(null, arguments);
      }
    }
  }, [_vm.displayedStatus ? _c("DocumentStatus", {
    attrs: {
      idle: _vm.idle,
      lock: _vm.lock,
      "sync-error": _vm.syncError,
      "has-connection-issue": _vm.hasConnectionIssue
    },
    on: {
      reconnect: _vm.reconnect
    }
  }) : _vm._e(), _vm._v(" "), !_vm.contentLoaded && !_vm.displayedStatus ? _c("SkeletonLoading") : _vm._e(), _vm._v(" "), _vm.displayed ? _c("Wrapper", {
    attrs: {
      "sync-error": _vm.syncError,
      "has-connection-issue": _vm.hasConnectionIssue,
      "content-loaded": _vm.contentLoaded,
      "show-author-annotations": _vm.showAuthorAnnotations,
      "show-outline-outside": _vm.showOutlineOutside
    },
    on: {
      "outline-toggled": _vm.outlineToggled
    }
  }, [_vm.hasEditor ? _c("MainContainer", [_vm.readOnly ? _c("div", {
    staticClass: "text-editor--readonly-bar"
  }, [_vm._t("readonlyBar", function () {
    return [_c("ReadonlyBar", [_c("Status", {
      attrs: {
        document: _vm.document,
        dirty: _vm.dirty,
        sessions: _vm.filteredSessions,
        "sync-error": _vm.syncError,
        "has-connection-issue": _vm.hasConnectionIssue
      }
    })], 1)];
  })], 2) : [_vm.renderMenus ? _c("MenuBar", {
    ref: "menubar",
    attrs: {
      "is-hidden": _vm.hideMenu,
      loaded: _vm.menubarLoaded
    },
    on: {
      "update:loaded": function ($event) {
        _vm.menubarLoaded = $event;
      }
    }
  }, [_c("Status", {
    attrs: {
      document: _vm.document,
      dirty: _vm.dirty,
      sessions: _vm.filteredSessions,
      "sync-error": _vm.syncError,
      "has-connection-issue": _vm.hasConnectionIssue
    }
  }), _vm._v(" "), _vm._t("header")], 2) : _c("div", {
    staticClass: "menubar-placeholder"
  })], _vm._v(" "), _c("ContentContainer", {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.contentLoaded,
      expression: "contentLoaded"
    }],
    ref: "contentWrapper"
  })], 2) : _vm._e(), _vm._v(" "), _vm.hasSyncCollission ? _c("Reader", {
    attrs: {
      content: _vm.syncError.data.outsideChange,
      "is-rich-editor": _vm.isRichEditor
    }
  }) : _vm._e()], 1) : _vm._e(), _vm._v(" "), _vm.$editor ? _c("Assistant") : _vm._e()], 1);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Editor/ContentContainer.vue?vue&type=template&id=e4c6ecec&scoped=true":
/*!*******************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Editor/ContentContainer.vue?vue&type=template&id=e4c6ecec&scoped=true ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render),
/* harmony export */   staticRenderFns: () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "content-wrapper text-editor__content-wrapper",
    class: {
      "--show-outline": _vm.showOutline
    },
    attrs: {
      "data-text-el": "editor-content-wrapper"
    }
  }, [_vm.showOutline ? _c("div", {
    staticClass: "text-editor__content-wrapper__left"
  }, [_c("EditorOutline")], 1) : _vm._e(), _vm._v(" "), _vm._t("default"), _vm._v(" "), _c("EditorContent", {
    staticClass: "editor__content text-editor__content",
    attrs: {
      role: "document",
      editor: _vm.$editor
    }
  }), _vm._v(" "), _c("div", {
    staticClass: "text-editor__content-wrapper__right"
  })], 2);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Editor/DocumentStatus.vue?vue&type=template&id=5f451e6f&scoped=true":
/*!*****************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Editor/DocumentStatus.vue?vue&type=template&id=5f451e6f&scoped=true ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render),
/* harmony export */   staticRenderFns: () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "document-status"
  }, [_vm.hasWarning ? _c("NcNoteCard", {
    attrs: {
      type: "warning"
    }
  }, [_vm.isLoadingError ? _c("p", [_vm._v("\n\t\t\t" + _vm._s(_vm.syncError.data.data.error) + "\n\t\t\t"), _vm._v(" "), _vm.syncError.data.status === 412 ? _c("a", {
    staticClass: "button primary",
    on: {
      click: _vm.reload
    }
  }, [_vm._v(_vm._s(_vm.t("text", "Reload")))]) : _vm._e()]) : _vm.hasSyncCollission ? _c("p", [_vm._v("\n\t\t\t" + _vm._s(_vm.t("text", "Document has been changed outside of the editor. The changes cannot be applied")) + "\n\t\t")]) : _vm.hasConnectionIssue ? _c("p", [_vm._v("\n\t\t\t" + _vm._s(_vm.t("text", "Document could not be loaded. Please check your internet connection.")) + "\n\t\t\t"), _c("a", {
    staticClass: "button primary",
    on: {
      click: _vm.reconnect
    }
  }, [_vm._v(_vm._s(_vm.t("text", "Reconnect")))])]) : _vm._e()]) : _vm.idle ? _c("NcNoteCard", {
    attrs: {
      type: "info"
    }
  }, [_c("p", [_vm._v("\n\t\t\t" + _vm._s(_vm.t("text", "Document idle for {timeout} minutes, click to continue editing", {
    timeout: _vm.IDLE_TIMEOUT
  })) + "\n\t\t\t"), _c("a", {
    staticClass: "button primary",
    on: {
      click: _vm.reconnect
    }
  }, [_vm._v(_vm._s(_vm.t("text", "Reconnect")))])])]) : _vm._e(), _vm._v(" "), _vm.lock ? _c("NcNoteCard", {
    attrs: {
      type: "info"
    },
    scopedSlots: _vm._u([{
      key: "icon",
      fn: function () {
        return [_c("Lock", {
          attrs: {
            size: 20
          }
        })];
      },
      proxy: true
    }], null, false, 326953187)
  }, [_vm._v(" "), _c("p", [_vm._v("\n\t\t\t" + _vm._s(_vm.t("text", "This file is opened read-only as it is currently locked by {user}.", {
    user: _vm.lock.displayName
  })) + "\n\t\t")])]) : _vm._e(), _vm._v(" "), _vm.hasSyncCollission ? _c("CollisionResolveDialog", {
    attrs: {
      "sync-error": _vm.syncError
    }
  }) : _vm._e()], 1);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Editor/MainContainer.vue?vue&type=template&id=745ee2b6&scoped=true":
/*!****************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Editor/MainContainer.vue?vue&type=template&id=745ee2b6&scoped=true ***!
  \****************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render),
/* harmony export */   staticRenderFns: () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "editor"
  }, [_vm.$editorUpload ? _c("MediaHandler", {
    staticClass: "text-editor__main"
  }, [_vm._t("default")], 2) : _vm._t("default")], 2);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Editor/MarkdownContentEditor.vue?vue&type=template&id=053dcdf6&scoped=true":
/*!************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Editor/MarkdownContentEditor.vue?vue&type=template&id=053dcdf6&scoped=true ***!
  \************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render),
/* harmony export */   staticRenderFns: () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("Wrapper", {
    attrs: {
      "content-loaded": true,
      "show-outline-outside": _vm.showOutlineOutside
    },
    on: {
      "outline-toggled": _vm.outlineToggled
    }
  }, [_c("MainContainer", [!_vm.readOnly ? _c("MenuBar", {
    attrs: {
      autohide: false
    }
  }) : _vm._t("readonlyBar", function () {
    return [_c("ReadonlyBar")];
  }), _vm._v(" "), _c("ContentContainer")], 2)], 1);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Editor/MediaHandler.vue?vue&type=template&id=7fc56648":
/*!***************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Editor/MediaHandler.vue?vue&type=template&id=7fc56648 ***!
  \***************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render),
/* harmony export */   staticRenderFns: () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "editor editor-media-handler",
    class: {
      draggedOver: _vm.draggedOver
    },
    attrs: {
      "data-text-el": "editor-media-handler"
    },
    on: {
      "image-paste": _vm.onPaste,
      dragover: function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        return _vm.setDraggedOver(true);
      },
      dragleave: function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        return _vm.setDraggedOver(false);
      },
      "file-drop": _vm.onEditorDrop
    }
  }, [_c("input", {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: false,
      expression: "false"
    }],
    ref: "attachmentFileInput",
    attrs: {
      "data-text-el": "attachment-file-input",
      type: "file",
      accept: "*/*",
      multiple: ""
    },
    on: {
      change: _vm.onAttachmentUploadFilePicked
    }
  }), _vm._v(" "), _vm._t("default")], 2);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Editor/Status.vue?vue&type=template&id=7749e0f4&scoped=true":
/*!*********************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Editor/Status.vue?vue&type=template&id=7749e0f4&scoped=true ***!
  \*********************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render),
/* harmony export */   staticRenderFns: () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "text-editor__session-list"
  }, [_c("div", {
    staticClass: "save-status",
    class: _vm.saveStatusClass,
    attrs: {
      title: _vm.lastSavedStatusTooltip
    }
  }, [_c("NcButton", {
    attrs: {
      type: "tertiary",
      "aria-label": _vm.t("text", "Save document")
    },
    on: {
      click: _vm.onClickSave
    },
    scopedSlots: _vm._u([{
      key: "icon",
      fn: function () {
        return [_c("NcSavingIndicatorIcon", {
          attrs: {
            saving: _vm.saveStatusClass === "saving",
            error: _vm.saveStatusClass === "error"
          }
        })];
      },
      proxy: true
    }])
  })], 1), _vm._v(" "), _c("SessionList", {
    attrs: {
      sessions: _vm.sessions
    }
  }, [_c("p", {
    staticClass: "last-saved",
    attrs: {
      slot: "lastSaved"
    },
    slot: "lastSaved"
  }, [_vm._v("\n\t\t\t" + _vm._s(_vm.t("text", "Last saved")) + ": " + _vm._s(_vm.lastSavedString) + "\n\t\t")]), _vm._v(" "), _vm.$isPublic && _vm.currentSession && !_vm.currentSession.userId ? _c("GuestNameDialog", {
    attrs: {
      session: _vm.currentSession
    }
  }) : _vm._e()], 1)], 1);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Editor/Wrapper.vue?vue&type=template&id=20a7fb81&scoped=true":
/*!**********************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Editor/Wrapper.vue?vue&type=template&id=20a7fb81&scoped=true ***!
  \**********************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render),
/* harmony export */   staticRenderFns: () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "text-editor__wrapper",
    class: {
      "has-conflicts": _vm.hasSyncCollission,
      "is-rich-workspace": _vm.$isRichWorkspace,
      "is-rich-editor": _vm.$isRichEditor,
      "show-color-annotations": _vm.showAuthorAnnotations
    }
  }, [_vm._t("default")], 2);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/HelpModal.vue?vue&type=template&id=6befbdec&scoped=true":
/*!*****************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/HelpModal.vue?vue&type=template&id=6befbdec&scoped=true ***!
  \*****************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render),
/* harmony export */   staticRenderFns: () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("NcDialog", {
    attrs: {
      size: "normal",
      "data-text-el": "formatting-help",
      name: _vm.t("text", "Formatting help"),
      "close-on-click-outside": true
    },
    on: {
      closing: function ($event) {
        return _vm.$emit("close");
      }
    }
  }, [_c("h2", [_vm._v(_vm._s(_vm.t("text", "Formatting help")))]), _vm._v(" "), _c("p", [_vm._v(_vm._s(_vm.t("text", "Speed up your writing with simple shortcuts.")))]), _vm._v(" "), !_vm.isMobileCached ? _c("p", [_vm._v("\n\t\t" + _vm._s(_vm.t("text", "Just type the Markdown syntax or use keyboard shortcuts from below.")) + "\n\t")]) : _c("p", [_vm._v("\n\t\t" + _vm._s(_vm.t("text", "Just type the Markdown syntax from below.")) + "\n\t")]), _vm._v(" "), _c("table", [_c("thead", [_c("tr", [_c("th", [_vm._v(_vm._s(_vm.t("text", "Style")))]), _vm._v(" "), _c("th", [_vm._v(_vm._s(_vm.t("text", "Syntax")))]), _vm._v(" "), !_vm.isMobileCached ? _c("th", [_vm._v("\n\t\t\t\t\t" + _vm._s(_vm.t("text", "Keyboard shortcuts")) + "\n\t\t\t\t")]) : _vm._e()])]), _vm._v(" "), _c("tbody", [_c("tr", [_c("td", [_vm._v(_vm._s(_vm.t("text", "New paragraph")))]), _vm._v(" "), _c("td", [_c("kbd", [_vm._v(_vm._s(_vm.t("text", "Enter")))])]), _vm._v(" "), !_vm.isMobileCached ? _c("td") : _vm._e()]), _vm._v(" "), _c("tr", [_c("td", [_vm._v(_vm._s(_vm.t("text", "Hard line break")))]), _vm._v(" "), _c("td", [_c("kbd", [_vm._v(_vm._s(_vm.t("text", "Enter")))]), _vm._v("\n\t\t\t\t\t" + _vm._s(_vm.t("text", "followed by")) + "\n\t\t\t\t\t"), _c("kbd", [_vm._v(_vm._s(_vm.t("text", "Backspace")))])]), _vm._v(" "), !_vm.isMobileCached ? _c("td", [_c("kbd", [_vm._v(_vm._s(_vm.t("text", "Shift")))]), _vm._v("\n\t\t\t\t\t+\n\t\t\t\t\t"), _c("kbd", [_vm._v(_vm._s(_vm.t("text", "Enter")))])]) : _vm._e()]), _vm._v(" "), _c("tr", [_c("td", [_vm._v(_vm._s(_vm.t("text", "Bold")))]), _vm._v(" "), _c("td", [_c("code", [_vm._v("**" + _vm._s(_vm.t("text", "Bold text")) + "**")])]), _vm._v(" "), !_vm.isMobileCached ? _c("td", [_c("kbd", [_vm._v(_vm._s(_vm.t("text", "Ctrl")))]), _vm._v("\n\t\t\t\t\t+\n\t\t\t\t\t"), _c("kbd", [_vm._v("B")])]) : _vm._e()]), _vm._v(" "), _c("tr", [_c("td", [_vm._v(_vm._s(_vm.t("text", "Italic")))]), _vm._v(" "), _c("td", [_c("code", [_vm._v("*" + _vm._s(_vm.t("text", "Italicized text")) + "*")])]), _vm._v(" "), !_vm.isMobileCached ? _c("td", [_c("kbd", [_vm._v(_vm._s(_vm.t("text", "Ctrl")))]), _vm._v("\n\t\t\t\t\t+\n\t\t\t\t\t"), _c("kbd", [_vm._v("I")])]) : _vm._e()]), _vm._v(" "), _c("tr", [_c("td", [_vm._v(_vm._s(_vm.t("text", "Strikethrough")))]), _vm._v(" "), _c("td", [_c("code", [_vm._v("~~" + _vm._s(_vm.t("text", "Mistaken text")) + "~~")])]), _vm._v(" "), !_vm.isMobileCached ? _c("td", [_c("kbd", [_vm._v(_vm._s(_vm.t("text", "Ctrl")))]), _vm._v("\n\t\t\t\t\t+\n\t\t\t\t\t"), _c("kbd", [_vm._v(_vm._s(_vm.t("text", "Shift")))]), _vm._v("\n\t\t\t\t\t+\n\t\t\t\t\t"), _c("kbd", [_vm._v("S")])]) : _vm._e()]), _vm._v(" "), _c("tr", [_c("td", [_vm._v(_vm._s(_vm.t("text", "Underline")))]), _vm._v(" "), _c("td", [_c("code", [_vm._v("__" + _vm._s(_vm.t("text", "Underlined text")) + "__")])]), _vm._v(" "), !_vm.isMobileCached ? _c("td", [_c("kbd", [_vm._v(_vm._s(_vm.t("text", "Ctrl")))]), _vm._v("\n\t\t\t\t\t+\n\t\t\t\t\t"), _c("kbd", [_vm._v("U")])]) : _vm._e()]), _vm._v(" "), _c("tr", [_c("td", {
    staticClass: "ellipsis_top"
  }, [_vm._v("\n\t\t\t\t\t" + _vm._s(_vm.t("text", "Heading 1")) + "\n\t\t\t\t")]), _vm._v(" "), _c("td", {
    staticClass: "ellipsis_top"
  }, [_c("code", [_vm._v("# " + _vm._s(_vm.t("text", "Heading level 1")))])]), _vm._v(" "), !_vm.isMobileCached ? _c("td", {
    staticClass: "ellipsis_top"
  }, [_c("kbd", [_vm._v(_vm._s(_vm.t("text", "Ctrl")))]), _vm._v("\n\t\t\t\t\t+\n\t\t\t\t\t"), _c("kbd", [_vm._v(_vm._s(_vm.t("text", "Shift")))]), _vm._v("\n\t\t\t\t\t+\n\t\t\t\t\t"), _c("kbd", [_vm._v("1")])]) : _vm._e()]), _vm._v(" "), _c("tr", [_c("td", {
    staticClass: "noborder ellipsis"
  }, [_vm._v("\n\t\t\t\t\t…\n\t\t\t\t")]), _vm._v(" "), _c("td", {
    staticClass: "noborder ellipsis"
  }, [_vm._v("\n\t\t\t\t\t…\n\t\t\t\t")]), _vm._v(" "), !_vm.isMobileCached ? _c("td", {
    staticClass: "ellipsis noborder"
  }, [_vm._v("\n\t\t\t\t\t…\n\t\t\t\t")]) : _vm._e()]), _vm._v(" "), _c("tr", [_c("td", {
    staticClass: "noborder ellipsis_bottom"
  }, [_vm._v("\n\t\t\t\t\t" + _vm._s(_vm.t("text", "Heading 6")) + "\n\t\t\t\t")]), _vm._v(" "), _c("td", {
    staticClass: "noborder ellipsis_bottom"
  }, [_c("code", [_vm._v("###### " + _vm._s(_vm.t("text", "Heading level 6")))])]), _vm._v(" "), !_vm.isMobileCached ? _c("td", {
    staticClass: "noborder ellipsis_bottom"
  }, [_c("kbd", [_vm._v(_vm._s(_vm.t("text", "Ctrl")))]), _vm._v("\n\t\t\t\t\t+\n\t\t\t\t\t"), _c("kbd", [_vm._v(_vm._s(_vm.t("text", "Shift")))]), _vm._v("\n\t\t\t\t\t+\n\t\t\t\t\t"), _c("kbd", [_vm._v("6")])]) : _vm._e()]), _vm._v(" "), _c("tr", [_c("td", [_vm._v(_vm._s(_vm.t("text", "Unordered list")))]), _vm._v(" "), _c("td", [_c("code", [_vm._v("* " + _vm._s(_vm.t("text", "An item")))])]), _vm._v(" "), !_vm.isMobileCached ? _c("td", [_c("kbd", [_vm._v(_vm._s(_vm.t("text", "Ctrl")))]), _vm._v("\n\t\t\t\t\t+\n\t\t\t\t\t"), _c("kbd", [_vm._v(_vm._s(_vm.t("text", "Shift")))]), _vm._v("\n\t\t\t\t\t+\n\t\t\t\t\t"), _c("kbd", [_vm._v("8")])]) : _vm._e()]), _vm._v(" "), _c("tr", [_c("td", [_vm._v(_vm._s(_vm.t("text", "Ordered list")))]), _vm._v(" "), _c("td", [_c("code", [_vm._v("1. " + _vm._s(_vm.t("text", "First item")))])]), _vm._v(" "), !_vm.isMobileCached ? _c("td", [_c("kbd", [_vm._v(_vm._s(_vm.t("text", "Ctrl")))]), _vm._v("\n\t\t\t\t\t+\n\t\t\t\t\t"), _c("kbd", [_vm._v(_vm._s(_vm.t("text", "Shift")))]), _vm._v("\n\t\t\t\t\t+\n\t\t\t\t\t"), _c("kbd", [_vm._v("7")])]) : _vm._e()]), _vm._v(" "), _c("tr", [_c("td", [_vm._v(_vm._s(_vm.t("text", "Checklist")))]), _vm._v(" "), _c("td", [_c("code", [_vm._v("* [] " + _vm._s(_vm.t("text", "To-Do item")))])]), _vm._v(" "), !_vm.isMobileCached ? _c("td") : _vm._e()]), _vm._v(" "), _c("tr", [_c("td", [_vm._v(_vm._s(_vm.t("text", "Blockquote")))]), _vm._v(" "), _c("td", [_c("code", [_vm._v("> " + _vm._s(_vm.t("text", "Quoted text")))])]), _vm._v(" "), !_vm.isMobileCached ? _c("td", [_c("kbd", [_vm._v(_vm._s(_vm.t("text", "Ctrl")))]), _vm._v("\n\t\t\t\t\t+\n\t\t\t\t\t"), _c("kbd", [_vm._v(">")])]) : _vm._e()]), _vm._v(" "), _c("tr", [_c("td", [_vm._v(_vm._s(_vm.t("text", "Code block")))]), _vm._v(" "), _c("td", [_c("code", [_vm._v("``` " + _vm._s(_vm.t("text", "Some code")))])]), _vm._v(" "), !_vm.isMobileCached ? _c("td") : _vm._e()])])])]);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Menu/ActionFormattingHelp.vue?vue&type=template&id=566018ec":
/*!*********************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Menu/ActionFormattingHelp.vue?vue&type=template&id=566018ec ***!
  \*********************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render),
/* harmony export */   staticRenderFns: () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c,
    _setup = _vm._self._setupProxy;
  return _c("NextcloudVueNcActionButton", _vm._g({
    attrs: {
      "close-after-click": "",
      "data-text-action-entry": "formatting-help"
    },
    scopedSlots: _vm._u([{
      key: "icon",
      fn: function () {
        return [_c("Help")];
      },
      proxy: true
    }])
  }, _vm.$listeners), [_vm._v("\n\t" + _vm._s(_vm.t("text", "Formatting help")) + "\n")]);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Menu/ActionList.vue?vue&type=template&id=6f5cb6c4":
/*!***********************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Menu/ActionList.vue?vue&type=template&id=6f5cb6c4 ***!
  \***********************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render),
/* harmony export */   staticRenderFns: () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("NcActions", _vm._b({
    staticClass: "entry-list-action entry-action",
    attrs: {
      title: _vm.tooltip,
      container: _vm.menuIDSelector,
      "aria-label": _vm.labelWithSelected,
      type: _vm.state.active ? "primary" : "tertiary",
      "force-menu": true,
      "data-text-action-entry": _vm.actionEntry.key,
      "data-text-action-active": _vm.activeKey
    },
    on: {
      "update:open": _vm.onOpenChange
    },
    scopedSlots: _vm._u([{
      key: "icon",
      fn: function () {
        return [_c(_vm.icon, {
          key: _vm.iconKey,
          tag: "component"
        })];
      },
      proxy: true
    }])
  }, "NcActions", _vm.state, false), [_vm._v(" "), _vm._l(_vm.children, function (child) {
    var _vm$currentChild;
    return [child.isSeparator ? _c("NcActionSeparator", {
      key: "child-".concat(child.key)
    }) : _c("ActionListItem", _vm._g({
      key: "child-".concat(child.key),
      attrs: {
        active: ((_vm$currentChild = _vm.currentChild) === null || _vm$currentChild === void 0 ? void 0 : _vm$currentChild.key) === child.key,
        "is-item": "",
        "action-entry": child
      },
      on: {
        trigged: _vm.onTrigger
      }
    }, _vm.$listeners))];
  }), _vm._v(" "), _vm._t("lastAction", null, null, {
    visible: _vm.visible
  })], 2);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Menu/ActionListItem.vue?vue&type=template&id=3dee4312":
/*!***************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Menu/ActionListItem.vue?vue&type=template&id=3dee4312 ***!
  \***************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render),
/* harmony export */   staticRenderFns: () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("NextcloudVueNcActionButton", _vm._g({
    staticClass: "entry-single-action entry-action entry-action-item",
    class: _vm.state.class,
    attrs: {
      disabled: _vm.state.disabled,
      "aria-keyshortcuts": _vm.keyshortcuts || undefined,
      "data-text-action-entry": _vm.actionEntry.key,
      type: _vm.state.type,
      "model-value": _vm.state.type !== "button" ? _vm.state.active : undefined,
      "close-after-click": ""
    },
    on: {
      click: _vm.runAction
    },
    scopedSlots: _vm._u([{
      key: "icon",
      fn: function () {
        return [_c(_vm.icon, {
          tag: "component"
        })];
      },
      proxy: true
    }])
  }, _vm.$listeners), [_vm._v("\n\t" + _vm._s(_vm.label) + "\n")]);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Menu/ActionSingle.vue?vue&type=template&id=6ab239ee":
/*!*************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Menu/ActionSingle.vue?vue&type=template&id=6ab239ee ***!
  \*************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render),
/* harmony export */   staticRenderFns: () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("NcButton", _vm._g({
    staticClass: "entry-single-action entry-action",
    class: _vm.state.class,
    attrs: {
      disabled: _vm.state.disabled,
      "aria-keyshortcuts": _vm.keyshortcuts || undefined,
      "data-text-action-entry": _vm.actionEntry.key,
      "aria-label": _vm.label,
      title: _vm.tooltip,
      type: "tertiary",
      pressed: _vm.state.type !== "button" ? _vm.state.active : undefined
    },
    on: {
      click: _vm.runAction
    },
    scopedSlots: _vm._u([{
      key: "icon",
      fn: function () {
        return [_c(_vm.icon, {
          tag: "component"
        })];
      },
      proxy: true
    }, _vm.actionEntry.forceLabel ? {
      key: "default",
      fn: function () {
        return [_vm._v("\n\t\t" + _vm._s(_vm.label) + "\n\t")];
      },
      proxy: true
    } : null], null, true)
  }, _vm.$listeners));
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Menu/CharacterCount.vue?vue&type=template&id=097c7136":
/*!***************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Menu/CharacterCount.vue?vue&type=template&id=097c7136 ***!
  \***************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render),
/* harmony export */   staticRenderFns: () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c,
    _setup = _vm._self._setupProxy;
  return _c("NcActionText", {
    attrs: {
      "data-text-action-entry": "character-count"
    },
    scopedSlots: _vm._u([{
      key: "icon",
      fn: function () {
        return [_c("AlphabeticalVariant")];
      },
      proxy: true
    }, {
      key: "default",
      fn: function () {
        return [_vm._v("\n\t\t" + _vm._s(_vm.countString) + "\n\t")];
      },
      proxy: true
    }])
  });
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Menu/MenuBar.vue?vue&type=template&id=10e748d8&scoped=true":
/*!********************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Menu/MenuBar.vue?vue&type=template&id=10e748d8&scoped=true ***!
  \********************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render),
/* harmony export */   staticRenderFns: () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "text-menubar",
    class: {
      "text-menubar--ready": _vm.isReady,
      "text-menubar--hide": _vm.isHidden,
      "text-menubar--is-workspace": _vm.$isRichWorkspace
    },
    attrs: {
      id: _vm.randomID,
      "data-text-el": "menubar",
      role: "region",
      "aria-label": _vm.t("text", "Editor actions")
    }
  }, [_vm.displayHelp ? _c("HelpModal", {
    on: {
      close: _vm.hideHelp
    }
  }) : _vm._e(), _vm._v(" "), _vm.displayTranslate !== false ? _c("Translate", {
    attrs: {
      content: _vm.displayTranslate
    },
    on: {
      "insert-content": _vm.translateInsert,
      "replace-content": _vm.translateReplace,
      close: _vm.hideTranslate
    }
  }) : _vm._e(), _vm._v(" "), _vm.$isRichEditor ? _c("div", {
    ref: "menubar",
    staticClass: "text-menubar__entries",
    attrs: {
      role: "toolbar",
      "aria-label": _vm.t("text", "Formatting menu bar")
    },
    on: {
      keydown: [function ($event) {
        if (!$event.type.indexOf("key") && _vm._k($event.keyCode, "left", 37, $event.key, ["Left", "ArrowLeft"])) return null;
        if ("button" in $event && $event.button !== 0) return null;
        $event.stopPropagation();
        return _vm.handleToolbarNavigation.apply(null, arguments);
      }, function ($event) {
        if (!$event.type.indexOf("key") && _vm._k($event.keyCode, "right", 39, $event.key, ["Right", "ArrowRight"])) return null;
        if ("button" in $event && $event.button !== 2) return null;
        $event.stopPropagation();
        return _vm.handleToolbarNavigation.apply(null, arguments);
      }]
    }
  }, [_vm._l(_vm.visibleEntries, function (actionEntry, index) {
    return _c(actionEntry.component ? actionEntry.component : actionEntry.children ? "ActionList" : "ActionSingle", {
      key: actionEntry.key,
      ref: "menuEntries",
      refInFor: true,
      tag: "component",
      attrs: {
        "action-entry": actionEntry,
        "can-be-focussed": _vm.activeMenuEntry === index
      },
      on: {
        disabled: function ($event) {
          return _vm.disableMenuEntry(actionEntry.key, $event);
        },
        click: function ($event) {
          _vm.activeMenuEntry = index;
        }
      }
    });
  }), _vm._v(" "), _c("ActionList", {
    ref: "remainingEntries",
    attrs: {
      "action-entry": _vm.hiddenEntries,
      "can-be-focussed": _vm.activeMenuEntry === _vm.visibleEntries.length
    },
    on: {
      click: function ($event) {
        _vm.activeMenuEntry = "remain";
      }
    },
    scopedSlots: _vm._u([{
      key: "lastAction",
      fn: function (_ref) {
        let {
          visible
        } = _ref;
        return [_vm.canTranslate ? _c("NcActionButton", {
          on: {
            click: _vm.showTranslate
          },
          scopedSlots: _vm._u([{
            key: "icon",
            fn: function () {
              return [_c("TranslateVariant")];
            },
            proxy: true
          }], null, true)
        }, [_vm._v("\n\t\t\t\t\t" + _vm._s(_vm.t("text", "Translate")) + "\n\t\t\t\t")]) : _vm._e(), _vm._v(" "), _c("ActionFormattingHelp", {
          on: {
            click: _vm.showHelp
          }
        }), _vm._v(" "), _c("NcActionSeparator"), _vm._v(" "), _c("CharacterCount", _vm._b({}, "CharacterCount", {
          visible
        }, false))];
      }
    }], null, false, 4065341038)
  })], 2) : _vm._e(), _vm._v(" "), _c("div", {
    staticClass: "text-menubar__slot"
  }, [_vm._t("default")], 2)], 1);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Menu/ReadonlyBar.vue?vue&type=template&id=2716d951&scoped=true":
/*!************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Menu/ReadonlyBar.vue?vue&type=template&id=2716d951&scoped=true ***!
  \************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render),
/* harmony export */   staticRenderFns: () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c,
    _setup = _vm._self._setupProxy;
  return _c("div", {
    staticClass: "text-readonly-bar",
    attrs: {
      "data-text-el": "readonly-bar"
    }
  }, [_c("div", {
    ref: "menubar",
    staticClass: "text-readonly-bar__entries",
    attrs: {
      role: "toolbar",
      "aria-label": _vm.t("text", "Editor actions")
    }
  }, _vm._l(_vm.visibleEntries, function (actionEntry, index) {
    return _c(actionEntry.component ? actionEntry.component : actionEntry.children ? "ActionList" : "ActionSingle", {
      key: actionEntry.key,
      ref: "menuEntries",
      refInFor: true,
      tag: "component",
      attrs: {
        "action-entry": actionEntry,
        "can-be-focussed": _vm.activeMenuEntry === index
      },
      on: {
        disabled: function ($event) {
          return _vm.disableMenuEntry(actionEntry.key, $event);
        }
      }
    });
  }), 1), _vm._v(" "), _c("div", {
    staticClass: "text-menubar__slot"
  }, [_vm._t("default")], 2)]);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Modal/Translate.vue?vue&type=template&id=7563604c&scoped=true":
/*!***********************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Modal/Translate.vue?vue&type=template&id=7563604c&scoped=true ***!
  \***********************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render),
/* harmony export */   staticRenderFns: () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("NcModal", {
    attrs: {
      size: "large"
    },
    on: {
      close: function ($event) {
        return _vm.$emit("close");
      }
    }
  }, [_c("div", {
    staticClass: "translate-dialog"
  }, [_c("h2", [_vm._v(_vm._s(_vm.t("text", "Translate")))]), _vm._v(" "), _c("em", [_vm._v(_vm._s(_vm.t("text", "To translate individual parts of the text, select it before using the translate function.")))]), _vm._v(" "), _c("div", {
    staticClass: "wrapper"
  }, [_c("div", {
    staticClass: "col"
  }, [_c("div", {
    staticClass: "language-selector"
  }, [_c("label", {
    attrs: {
      for: "fromLanguage"
    }
  }, [_vm._v(_vm._s(_vm.t("text", "Translate from")))]), _vm._v(" "), _c("NcSelect", {
    attrs: {
      "input-id": "fromLanguage",
      placeholder: _vm.t("text", "Select language"),
      options: _vm.fromLanguages,
      disabled: _vm.disableFromLanguageSelect,
      "append-to-body": false
    },
    model: {
      value: _vm.fromLanguage,
      callback: function ($$v) {
        _vm.fromLanguage = $$v;
      },
      expression: "fromLanguage"
    }
  })], 1), _vm._v(" "), _c("NcTextArea", {
    ref: "input",
    attrs: {
      value: _vm.input,
      label: _vm.t("text", "Text to translate from"),
      autofocus: "",
      "input-class": "translate-textarea",
      resize: "none"
    },
    on: {
      "update:value": function ($event) {
        _vm.input = $event;
      },
      focus: _vm.onInputFocus
    }
  })], 1), _vm._v(" "), _c("div", {
    staticClass: "col"
  }, [_c("div", {
    staticClass: "language-selector"
  }, [_c("label", {
    attrs: {
      for: "toLanguage"
    }
  }, [_vm._v(_vm._s(_vm.t("text", "to")))]), _vm._v(" "), _c("NcSelect", {
    attrs: {
      "input-id": "toLanguage",
      placeholder: _vm.t("text", "Select language"),
      options: _vm.toLanguages,
      disabled: !_vm.fromLanguage,
      "append-to-body": false
    },
    model: {
      value: _vm.toLanguage,
      callback: function ($$v) {
        _vm.toLanguage = $$v;
      },
      expression: "toLanguage"
    }
  })], 1), _vm._v(" "), _c("NcTextArea", {
    ref: "result",
    class: {
      "icon-loading": _vm.loading
    },
    attrs: {
      value: _vm.result,
      label: _vm.t("text", "Translated text result"),
      readonly: "",
      "input-class": "translate-textarea",
      resize: "none"
    },
    on: {
      "update:value": function ($event) {
        _vm.result = $event;
      }
    }
  })], 1)]), _vm._v(" "), _c("div", {
    staticClass: "translate-actions"
  }, [_vm.loading ? _c("NcLoadingIcon") : _vm._e(), _vm._v(" "), !_vm.result ? _c("NcButton", {
    attrs: {
      type: "primary",
      disabled: _vm.loading
    },
    on: {
      click: _vm.translate
    }
  }, [_vm._v("\n\t\t\t\t" + _vm._s(_vm.t("text", "Translate")) + "\n\t\t\t")]) : _vm._e(), _vm._v(" "), _vm.result && _vm.content ? _c("NcButton", {
    attrs: {
      type: "secondary"
    },
    on: {
      click: _vm.contentReplace
    }
  }, [_vm._v("\n\t\t\t\t" + _vm._s(_vm.t("text", "Replace")) + "\n\t\t\t")]) : _vm._e(), _vm._v(" "), _vm.result ? _c("NcButton", {
    attrs: {
      type: "primary"
    },
    on: {
      click: _vm.contentInsert
    }
  }, [_vm._v("\n\t\t\t\t" + _vm._s(_vm.t("text", "Insert")) + "\n\t\t\t")]) : _vm._e()], 1)])]);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/PlainTextReader.vue?vue&type=template&id=513792ba":
/*!***********************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/PlainTextReader.vue?vue&type=template&id=513792ba ***!
  \***********************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render),
/* harmony export */   staticRenderFns: () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("BaseReader", {
    attrs: {
      content: _vm.content
    }
  });
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Reader.vue?vue&type=template&id=2688351a":
/*!**************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Reader.vue?vue&type=template&id=2688351a ***!
  \**************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render),
/* harmony export */   staticRenderFns: () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _vm.isRichEditor ? _c("RichTextReader", {
    attrs: {
      content: _vm.content
    }
  }) : _c("PlainTextReader", {
    attrs: {
      content: _vm.content
    }
  });
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/RichTextReader.vue?vue&type=template&id=f1ccc308":
/*!**********************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/RichTextReader.vue?vue&type=template&id=f1ccc308 ***!
  \**********************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render),
/* harmony export */   staticRenderFns: () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("BaseReader", {
    attrs: {
      content: _vm.content
    },
    on: {
      "click-link": (e, a) => _vm.$emit("click-link", e, a)
    }
  });
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/SkeletonLoading.vue?vue&type=template&id=5a999aaf&scoped=true":
/*!***********************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/SkeletonLoading.vue?vue&type=template&id=5a999aaf&scoped=true ***!
  \***********************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render),
/* harmony export */   staticRenderFns: () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "placeholder-main placeholder-main-text"
  }, [_vm._l(["-regular", "-reverse"], function (suffix, gradientIndex) {
    return [_c("svg", {
      key: "gradient" + suffix,
      class: "placeholder-gradient placeholder-gradient" + suffix
    }, [_c("defs", [_c("linearGradient", {
      attrs: {
        id: "placeholder-gradient" + suffix
      }
    }, [_c("stop", {
      attrs: {
        offset: "0%",
        "stop-color": gradientIndex === 0 ? _vm.colorPlaceholderLight : _vm.colorPlaceholderDark
      }
    }), _vm._v(" "), _c("stop", {
      attrs: {
        offset: "100%",
        "stop-color": gradientIndex === 0 ? _vm.colorPlaceholderDark : _vm.colorPlaceholderLight
      }
    })], 1)], 1)]), _vm._v(" "), _c("ul", {
      key: "list" + suffix,
      class: "placeholder-list placeholder-list" + suffix
    }, _vm._l(_vm.count, function (index) {
      return _c("li", {
        key: "placeholder" + suffix + index
      }, [_c("svg", {
        staticClass: "text-placeholder",
        attrs: {
          xmlns: "http://www.w3.org/2000/svg",
          fill: "url(#placeholder-gradient" + suffix + ")"
        }
      }, [_c("rect", {
        staticClass: "text-placeholder-line-one",
        style: _vm.textPlaceholderData[0]
      }), _vm._v(" "), _c("rect", {
        staticClass: "text-placeholder-line-two",
        style: _vm.textPlaceholderData[1]
      }), _vm._v(" "), _c("rect", {
        staticClass: "text-placeholder-line-three",
        style: _vm.textPlaceholderData[2]
      }), _vm._v(" "), _c("rect", {
        staticClass: "text-placeholder-line-four",
        style: _vm.textPlaceholderData[3]
      })])]);
    }), 0)];
  })], 2);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Suggestion/Mention/AutoCompleteResult.vue?vue&type=template&id=44fd7335&scoped=true":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Suggestion/Mention/AutoCompleteResult.vue?vue&type=template&id=44fd7335&scoped=true ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render),
/* harmony export */   staticRenderFns: () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "autocomplete-result"
  }, [_c("div", {
    staticClass: "autocomplete-result__icon",
    class: [_vm.icon, "autocomplete-result__icon--".concat(_vm.avatarUrl ? "with-avatar" : "")],
    style: _vm.avatarUrl ? {
      backgroundImage: "url(".concat(_vm.avatarUrl, ")")
    } : null
  }, [_vm.haveStatus ? _c("div", {
    staticClass: "autocomplete-result__status",
    class: ["autocomplete-result__status--".concat(_vm.status && _vm.status.icon ? "icon" : _vm.status.status)]
  }, [_vm._v("\n\t\t\t" + _vm._s(_vm.status && _vm.status.icon || "") + "\n\t\t")]) : _vm._e()]), _vm._v(" "), _c("span", {
    staticClass: "autocomplete-result__content"
  }, [_c("span", {
    staticClass: "autocomplete-result__title"
  }, [_vm._v("\n\t\t\t" + _vm._s(_vm.label) + "\n\t\t")]), _vm._v(" "), _vm.subline ? _c("span", {
    staticClass: "autocomplete-result__subline"
  }, [_vm._v("\n\t\t\t" + _vm._s(_vm.subline) + "\n\t\t")]) : _vm._e()])]);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Suggestion/Mention/MentionList.vue?vue&type=template&id=57ffd330":
/*!**************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Suggestion/Mention/MentionList.vue?vue&type=template&id=57ffd330 ***!
  \**************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render),
/* harmony export */   staticRenderFns: () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("SuggestionListWrapper", {
    ref: "suggestionList",
    attrs: {
      command: _vm.command,
      items: _vm.items
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function (_ref) {
        let {
          item,
          active
        } = _ref;
        return [_c("AutoCompleteResult", {
          class: active ? "highlight" : null,
          attrs: {
            id: item.id,
            label: item.label,
            icon: "icon-user",
            source: "users"
          }
        })];
      }
    }, {
      key: "empty",
      fn: function () {
        return [_vm._v("\n\t\t" + _vm._s(_vm.t("text", "No user found")) + "\n\t")];
      },
      proxy: true
    }])
  });
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/views/DirectEditing.vue?vue&type=template&id=37e36225&scoped=true":
/*!****************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/views/DirectEditing.vue?vue&type=template&id=37e36225&scoped=true ***!
  \****************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render),
/* harmony export */   staticRenderFns: () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    class: {
      "icon-loading": _vm.saving
    },
    attrs: {
      id: "direct-editor"
    }
  }, [_c("Editor", {
    ref: "editor",
    attrs: {
      "initial-session": _vm.initialSession,
      "file-id": _vm.initial.fileId,
      active: true,
      mime: _vm.initial.mimetype,
      "is-direct-editing": true
    },
    on: {
      ready: _vm.loaded
    },
    scopedSlots: _vm._u([_vm.isMobile ? {
      key: "header",
      fn: function () {
        return [_c("button", {
          staticClass: "icon-share",
          on: {
            click: _vm.share
          }
        }), _vm._v(" "), _c("button", {
          staticClass: "icon-close",
          on: {
            click: _vm.close
          }
        })];
      },
      proxy: true
    } : null], null, true)
  })], 1);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./src/EditorFactory.js":
/*!******************************!*\
  !*** ./src/EditorFactory.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createEditor: () => (/* binding */ createEditor),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   loadSyntaxHighlight: () => (/* binding */ loadSyntaxHighlight),
/* harmony export */   serializePlainText: () => (/* binding */ serializePlainText)
/* harmony export */ });
/* harmony import */ var _components_Suggestion_Mention_suggestions_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/Suggestion/Mention/suggestions.js */ "./src/components/Suggestion/Mention/suggestions.js");
/* harmony import */ var proxy_polyfill__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! proxy-polyfill */ "./node_modules/proxy-polyfill/src/index.js");
/* harmony import */ var proxy_polyfill__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(proxy_polyfill__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _tiptap_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @tiptap/core */ "./node_modules/@tiptap/core/dist/index.js");
/* harmony import */ var lowlight_lib_core_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! lowlight/lib/core.js */ "./node_modules/lowlight/lib/core.js");
/* harmony import */ var highlight_js_lib_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! highlight.js/lib/core */ "./node_modules/highlight.js/es/core.js");
/* harmony import */ var _helpers_logger_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./helpers/logger.js */ "./src/helpers/logger.js");
/* harmony import */ var _extensions_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./extensions/index.js */ "./src/extensions/index.js");
/* harmony import */ var _tiptap_extension_code_block_lowlight__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @tiptap/extension-code-block-lowlight */ "./node_modules/@tiptap/extension-code-block-lowlight/dist/index.js");
/**
 * @copyright Copyright (c) 2019 Julius Härtl <jus@bitgrid.net>
 *
 * @author Julius Härtl <jus@bitgrid.net>
 *
 * @license AGPL-3.0-or-later
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








// eslint-disable-next-line import/no-named-as-default

const loadSyntaxHighlight = async language => {
  const list = highlight_js_lib_core__WEBPACK_IMPORTED_MODULE_2__["default"].listLanguages();
  _helpers_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.debug('Supported languages', {
    list
  });
  if (!lowlight_lib_core_js__WEBPACK_IMPORTED_MODULE_6__.lowlight.listLanguages().includes(language)) {
    try {
      _helpers_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.debug('Loading language', language);
      // eslint-disable-next-line n/no-missing-import
      const syntax = await __webpack_require__("./node_modules/highlight.js/lib/languages lazy recursive ^\\.\\/.*$")("./".concat(language));
      lowlight_lib_core_js__WEBPACK_IMPORTED_MODULE_6__.lowlight.registerLanguage(language, syntax.default);
    } catch (error) {
      // fallback to none
      _helpers_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.debug('No matching highlighing found', {
        error
      });
    }
  }
};
const createEditor = _ref => {
  let {
    language,
    onCreate,
    onUpdate = () => {},
    extensions,
    enableRichEditing,
    session,
    relativePath,
    isEmbedded = false
  } = _ref;
  let defaultExtensions;
  if (enableRichEditing) {
    defaultExtensions = [_extensions_index_js__WEBPACK_IMPORTED_MODULE_4__.RichText.configure({
      relativePath,
      isEmbedded,
      component: undefined,
      extensions: [_extensions_index_js__WEBPACK_IMPORTED_MODULE_4__.Mention.configure({
        suggestion: (0,_components_Suggestion_Mention_suggestions_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
          session
        })
      })]
    }), _extensions_index_js__WEBPACK_IMPORTED_MODULE_4__.FocusTrap];
  } else {
    defaultExtensions = [_extensions_index_js__WEBPACK_IMPORTED_MODULE_4__.PlainText, _tiptap_extension_code_block_lowlight__WEBPACK_IMPORTED_MODULE_5__["default"].configure({
      lowlight: lowlight_lib_core_js__WEBPACK_IMPORTED_MODULE_6__.lowlight,
      defaultLanguage: language
    })];
  }
  return new _tiptap_core__WEBPACK_IMPORTED_MODULE_7__.Editor({
    onCreate,
    onUpdate,
    editorProps: {
      scrollMargin: 50,
      scrollThreshold: 50
    },
    extensions: defaultExtensions.concat(extensions || [])
  });
};
const serializePlainText = doc => {
  return doc.textContent;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createEditor);


/***/ }),

/***/ "./src/components/Menu/ToolBarLogic.js":
/*!*********************************************!*\
  !*** ./src/components/Menu/ToolBarLogic.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.runtime.esm.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,vue__WEBPACK_IMPORTED_MODULE_0__.defineComponent)({
  data() {
    return {
      /** Current menu entry that has focus */
      activeMenuEntry: 0,
      entries: []
    };
  },
  computed: {
    visibleEntries() {
      return this.entries;
    }
  },
  watch: {
    visibleEntries() {
      this.$nextTick(() => {
        var _this$visibleEntries$;
        if (this.activeMenuEntry > this.visibleEntries.length || (_this$visibleEntries$ = this.visibleEntries[this.activeMenuEntry]) !== null && _this$visibleEntries$ !== void 0 && _this$visibleEntries$.disabled) {
          this.setNextMenuEntry();
        }
      });
    }
  },
  methods: {
    /**
     * Update the disabled state of an menu entry
     * @param {string} menuKey The key of the menu entry that changed
     * @param {boolean} state The new disabled state
     */
    disableMenuEntry(menuKey, state) {
      const index = this.visibleEntries.findIndex(_ref => {
        let {
          key
        } = _ref;
        return key === menuKey;
      });
      this.visibleEntries[index].disabled = state;
      if (state === false && this.activeMenuEntry === index) {
        this.$nextTick(() => this.setNextMenuEntry());
      }
    },
    /**
     * Set the active menu entry to the next one (or reset to first)
     */
    setNextMenuEntry() {
      // refs is not reactive so we must check this every time
      const modulo = this.visibleEntries.length + (this.$refs.remainingEntries ? 1 : 0);
      do {
        this.activeMenuEntry = (this.activeMenuEntry + 1) % modulo;
      } while (this.activeMenuEntry < this.visibleEntries.length && this.visibleEntries[this.activeMenuEntry].disabled);
    },
    /**
     * Set the active menu entry to the previous one (or reset to last entry (remaining actions))
     */
    setPreviousMenuEntry() {
      // refs is not reactive so we must check this every time
      const modulo = this.visibleEntries.length + (this.$refs.remainingEntries ? 1 : 0);
      do {
        const index = this.activeMenuEntry - 1;
        this.activeMenuEntry = (index % modulo + modulo) % modulo; // needed as JS does not work with negative modulos
      } while (this.activeMenuEntry < this.visibleEntries.length && this.visibleEntries[this.activeMenuEntry].disabled);
    },
    /**
     * Handle navigation in toolbar
     * @param {KeyboardEvent} event The keydown event
     */
    handleToolbarNavigation(event) {
      if (event.key === 'ArrowRight') {
        this.setNextMenuEntry();
      } else if (event.key === 'ArrowLeft') {
        this.setPreviousMenuEntry();
      }
      if (this.activeMenuEntry === this.visibleEntries.length) {
        var _this$$refs$remaining, _this$$refs$remaining2;
        (_this$$refs$remaining = this.$refs.remainingEntries) === null || _this$$refs$remaining === void 0 || (_this$$refs$remaining2 = _this$$refs$remaining.focusButton) === null || _this$$refs$remaining2 === void 0 ? void 0 : _this$$refs$remaining2.call(_this$$refs$remaining);
      } else {
        // The ref is in no order (ordered by the time they needed to mount), so we need to order them like they are shown on the menu
        const entries = [...this.$refs.menuEntries].sort((a, b) => this.visibleEntries.findIndex(_ref2 => {
          let {
            key
          } = _ref2;
          return key === a.$vnode.data.key;
        }) - this.visibleEntries.findIndex(_ref3 => {
          let {
            key
          } = _ref3;
          return key === b.$vnode.data.key;
        }));
        entries[this.activeMenuEntry].focusButton();
      }
    }
  }
}));

/***/ }),

/***/ "./src/components/Suggestion/Mention/suggestions.js":
/*!**********************************************************!*\
  !*** ./src/components/Suggestion/Mention/suggestions.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _nextcloud_axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nextcloud/axios */ "./node_modules/@nextcloud/axios/dist/index.es.mjs");
/* harmony import */ var _nextcloud_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nextcloud/router */ "./node_modules/@nextcloud/router/dist/index.mjs");
/* harmony import */ var _MentionList_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./MentionList.vue */ "./src/components/Suggestion/Mention/MentionList.vue");
/* harmony import */ var _suggestions_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../suggestions.js */ "./src/components/Suggestion/suggestions.js");




const USERS_LIST_ENDPOINT_URL = (0,_nextcloud_router__WEBPACK_IMPORTED_MODULE_1__.generateUrl)('apps/text/api/v1/users');
const emitMention = _ref => {
  let {
    session,
    props
  } = _ref;
  const documentId = session.documentId;
  _nextcloud_axios__WEBPACK_IMPORTED_MODULE_0__["default"].put((0,_nextcloud_router__WEBPACK_IMPORTED_MODULE_1__.generateUrl)("apps/text/session/".concat(documentId, "/mention")), {
    documentId,
    sessionId: session.id,
    sessionToken: session.token,
    mention: props.id
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_ref2 => {
  let {
    session,
    params
  } = _ref2;
  return (0,_suggestions_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
    listComponent: _MentionList_vue__WEBPACK_IMPORTED_MODULE_2__["default"],
    items: async _ref3 => {
      let {
        query
      } = _ref3;
      const params = {
        documentId: session.documentId,
        sessionId: session.id,
        sessionToken: session.token,
        filter: query
      };
      const response = await _nextcloud_axios__WEBPACK_IMPORTED_MODULE_0__["default"].post(USERS_LIST_ENDPOINT_URL, params);
      const users = JSON.parse(JSON.stringify(response.data));
      const result = [];
      Object.keys(users).map(key => result.push({
        id: key,
        label: users[key]
      }));
      return result;
    },
    command: _ref4 => {
      var _nodeAfter$text, _window$getSelection;
      let {
        editor,
        range,
        props
      } = _ref4;
      if (params !== null && params !== void 0 && params.emitMention) {
        params.emitMention({
          props
        });
      } else {
        emitMention({
          session,
          props
        });
      }

      // Insert mention
      // from https://github.com/ueberdosis/tiptap/blob/9a254bf9daf6d839bd02c968e14837098b903b38/packages/extension-mention/src/mention.ts

      // increase range.to by one when the next node is of type "text"
      // and starts with a space character
      const nodeAfter = editor.view.state.selection.$to.nodeAfter;
      const overrideSpace = nodeAfter === null || nodeAfter === void 0 || (_nodeAfter$text = nodeAfter.text) === null || _nodeAfter$text === void 0 ? void 0 : _nodeAfter$text.startsWith(' ');
      if (overrideSpace) {
        range.to += 1;
      }
      editor.chain().focus().insertContentAt(range, [{
        type: 'mention',
        attrs: props
      }, {
        type: 'text',
        text: ' '
      }]).run();
      (_window$getSelection = window.getSelection()) === null || _window$getSelection === void 0 ? void 0 : _window$getSelection.collapseToEnd();
    },
    ...params
  });
});

/***/ }),

/***/ "./src/extensions/Autofocus.js":
/*!*************************************!*\
  !*** ./src/extensions/Autofocus.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _tiptap_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tiptap/core */ "./node_modules/@tiptap/core/dist/index.js");
/*
 * @copyright Copyright (c) 2023 Julius Härtl <jus@bitgrid.net>
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
 */


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_tiptap_core__WEBPACK_IMPORTED_MODULE_0__.Extension.create({
  addOptions() {
    return {
      fileId: null
    };
  },
  addStorage() {
    return {
      started: false
    };
  },
  onCreate() {
    if (this.options.fileId === null) {
      throw new Error('fileId needs to be provided');
    }
    this.storage.started = true;
  },
  onSelectionUpdate(_ref) {
    let {
      editor
    } = _ref;
    if (!this.storage.started) {
      return;
    }
    const pos = editor.state.selection.$anchor.pos;
    sessionStorage.setItem('text-lastPos-' + this.options.fileId, pos);
  },
  addCommands() {
    return {
      autofocus: () => _ref2 => {
        let {
          commands,
          editor
        } = _ref2;
        const pos = sessionStorage.getItem('text-lastPos-' + this.options.fileId);
        if (pos) {
          return commands.focus(pos);
        }
        return commands.focus('start');
      }
    };
  }
}));

/***/ }),

/***/ "./src/helpers/base64.js":
/*!*******************************!*\
  !*** ./src/helpers/base64.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   decodeArrayBuffer: () => (/* binding */ decodeArrayBuffer),
/* harmony export */   encodeArrayBuffer: () => (/* binding */ encodeArrayBuffer)
/* harmony export */ });
/* harmony import */ var lib0_buffer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lib0/buffer */ "./node_modules/lib0/buffer.js");
/*
 * @copyright Copyright (c) 2022 Max <max@nextcloud.com>
 *
 * @author Max <max@nextcloud.com>
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

/*
 * This helper provides Base64 encoding and decoding for ArrayBuffers.
 *
 * We use lib0/buffer for now as it's a dependency of y.js
 * and does not add new dependencies.
 *
 */



/**
 *
 * @param {ArrayBuffer} data - binary data to encode
 */
function encodeArrayBuffer(data) {
  const view = new Uint8Array(data);
  return (0,lib0_buffer__WEBPACK_IMPORTED_MODULE_0__.toBase64)(view);
}

/**
 *
 * @param {string} encoded - base64 encoded string to decode
 */
function decodeArrayBuffer(encoded) {
  return (0,lib0_buffer__WEBPACK_IMPORTED_MODULE_0__.fromBase64)(encoded);
}

/***/ }),

/***/ "./src/helpers/logger.js":
/*!*******************************!*\
  !*** ./src/helpers/logger.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   logger: () => (/* binding */ logger)
/* harmony export */ });
/* harmony import */ var _nextcloud_logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nextcloud/logger */ "./node_modules/@nextcloud/logger/dist/index.js");

const logger = (0,_nextcloud_logger__WEBPACK_IMPORTED_MODULE_0__.getLoggerBuilder)().setApp('text').detectUser().build();


/***/ }),

/***/ "./src/helpers/mappings.js":
/*!*********************************!*\
  !*** ./src/helpers/mappings.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   extensionHighlight: () => (/* binding */ extensionHighlight)
/* harmony export */ });
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

const extensionHighlight = {
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
  js: 'javascript',
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
  txt: 'plaintext',
  vb: 'vbnet',
  vbs: 'vbscript'
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (extensionHighlight);


/***/ }),

/***/ "./src/helpers/platform.js":
/*!*********************************!*\
  !*** ./src/helpers/platform.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isMobilePlatform: () => (/* binding */ isMobilePlatform)
/* harmony export */ });
/**
 * Check if current platform is a mobile device
 *
 * @return {boolean} whether the platform is a mobile device
 */
function isMobilePlatform() {
  var _navigator;
  // Use client hints if already available
  if (((_navigator = navigator) === null || _navigator === void 0 || (_navigator = _navigator.userAgentData) === null || _navigator === void 0 ? void 0 : _navigator.mobile) !== undefined) return navigator.userAgentData.mobile;

  // use regex to match userAgent (required for Safari and Firefox in 2022)
  const mobileDevices = [/Android/i, /webOS/i, /iPhone/i, /iPad/i, /iPod/i, /playbook/i, /silk/i, /BlackBerry/i, /Windows Phone/i];
  return mobileDevices.some(regex => navigator.userAgent.match(regex));
}

/***/ }),

/***/ "./src/helpers/yjs.js":
/*!****************************!*\
  !*** ./src/helpers/yjs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   applyDocumentState: () => (/* binding */ applyDocumentState),
/* harmony export */   applyUpdateMessage: () => (/* binding */ applyUpdateMessage),
/* harmony export */   getDocumentState: () => (/* binding */ getDocumentState),
/* harmony export */   getUpdateMessage: () => (/* binding */ getUpdateMessage),
/* harmony export */   logStep: () => (/* binding */ logStep)
/* harmony export */ });
/* harmony import */ var _helpers_base64_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers/base64.js */ "./src/helpers/base64.js");
/* harmony import */ var yjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! yjs */ "./node_modules/yjs/dist/yjs.mjs");
/* harmony import */ var lib0_decoding_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lib0/decoding.js */ "./node_modules/lib0/decoding.js");
/* harmony import */ var lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lib0/encoding.js */ "./node_modules/lib0/encoding.js");
/* harmony import */ var y_protocols_sync__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! y-protocols/sync */ "./node_modules/y-protocols/sync.js");
/* harmony import */ var y_websocket__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! y-websocket */ "./node_modules/y-websocket/src/y-websocket.js");
/*
 * @copyright Copyright (c) 2023 Max <max@nextcloud.com>
 *
 * @author Max <max@nextcloud.com>
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
 * Get Document state encode as base64.
 *
 * Used to store yjs state on the server.
 * @param {Y.Doc} ydoc - encode state of this doc
 * @return {string}
 */
function getDocumentState(ydoc) {
  const update = yjs__WEBPACK_IMPORTED_MODULE_2__.encodeStateAsUpdate(ydoc);
  return (0,_helpers_base64_js__WEBPACK_IMPORTED_MODULE_0__.encodeArrayBuffer)(update);
}

/**
 *
 * @param {Y.Doc} ydoc - apply state to this doc
 * @param {string} documentState - base64 encoded doc state
 * @param {object} origin - initiator object e.g. WebsocketProvider
 */
function applyDocumentState(ydoc, documentState, origin) {
  const update = (0,_helpers_base64_js__WEBPACK_IMPORTED_MODULE_0__.decodeArrayBuffer)(documentState);
  yjs__WEBPACK_IMPORTED_MODULE_2__.applyUpdate(ydoc, update, origin);
}

/**
 * Update message for everything in ydoc that is not in encodedBaseUpdate
 *
 * @param {Y.Doc} ydoc - encode state of this doc
 * @param {string} encodedBaseUpdate - base64 encoded doc update to build upon
 * @return {Uint8Array|undefined}
 */
function getUpdateMessage(ydoc, encodedBaseUpdate) {
  const baseUpdate = (0,_helpers_base64_js__WEBPACK_IMPORTED_MODULE_0__.decodeArrayBuffer)(encodedBaseUpdate);
  const baseStateVector = yjs__WEBPACK_IMPORTED_MODULE_2__.encodeStateVectorFromUpdate(baseUpdate);
  const docStateVector = yjs__WEBPACK_IMPORTED_MODULE_2__.encodeStateVector(ydoc);
  if (sameState(baseStateVector, docStateVector)) {
    // no additional state in the ydoc - early return
    return;
  }
  const encoder = lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__.createEncoder();
  lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__.writeVarUint(encoder, y_websocket__WEBPACK_IMPORTED_MODULE_4__.messageSync);
  const update = yjs__WEBPACK_IMPORTED_MODULE_2__.encodeStateAsUpdate(ydoc, baseStateVector);
  y_protocols_sync__WEBPACK_IMPORTED_MODULE_1__.writeUpdate(encoder, update);
  return lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__.toUint8Array(encoder);
}

/**
 * Apply an updated message to the ydoc.
 *
 * Only used in tests right now.
 * @param {Y.Doc} ydoc - encode state of this doc
 * @param {Uint8Array} updateMessage - y-websocket sync message with update
 * @param {object} origin - initiator object e.g. WebsocketProvider
 */
function applyUpdateMessage(ydoc, updateMessage) {
  let origin = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'origin';
  const decoder = lib0_decoding_js__WEBPACK_IMPORTED_MODULE_5__.createDecoder(updateMessage);
  const messageType = lib0_decoding_js__WEBPACK_IMPORTED_MODULE_5__.readVarUint(decoder);
  if (messageType !== y_websocket__WEBPACK_IMPORTED_MODULE_4__.messageSync) {
    console.error('y.js update message with invalid type', messageType);
    return;
  }
  // There are no responses to updates - so this is a dummy.
  const encoder = lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__.createEncoder();
  y_protocols_sync__WEBPACK_IMPORTED_MODULE_1__.readSyncMessage(decoder, encoder, ydoc, origin);
}

/**
 * Log y.js messages with their type and initiator call stack
 *
 * @param {string} step - Y.js message
 */
function logStep(step) {
  // Create error for stack trace
  const err = new Error();
  const decoder = lib0_decoding_js__WEBPACK_IMPORTED_MODULE_5__.createDecoder(step);
  const messageType = lib0_decoding_js__WEBPACK_IMPORTED_MODULE_5__.readVarUint(decoder);
  const subType = lib0_decoding_js__WEBPACK_IMPORTED_MODULE_5__.readVarUint(decoder);
  const encodedStep = (0,_helpers_base64_js__WEBPACK_IMPORTED_MODULE_0__.encodeArrayBuffer)(step);
  switch (messageType) {
    case 0:
      console.debug('y.js message sync', subType, encodedStep, err.stack);
      break;
    case 3:
      console.debug('y.js message awareness_query', encodedStep, err.stack);
      break;
    case 1:
      console.debug('y.js message awareness', encodedStep, err.stack);
      break;
  }
}

/**
 * Helper function to check if two state vectors have the same state
 * @param {Array} arr - state vector to compare
 * @param {Array} other - state vector to compare against
 */
function sameState(arr, other) {
  return arr.length === other.length && arr.every((value, index) => other[index] === value);
}

/***/ }),

/***/ "./src/mixins/isMobile.js":
/*!********************************!*\
  !*** ./src/mixins/isMobile.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var debounce__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! debounce */ "./node_modules/debounce/index.js");
/* harmony import */ var debounce__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(debounce__WEBPACK_IMPORTED_MODULE_0__);
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


const getClientWidth = () => document.documentElement.clientWidth;
const isMobile = () => getClientWidth() < 768;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  data() {
    return {
      isMobile: isMobile()
    };
  },
  beforeMount() {
    this.$onResize = debounce__WEBPACK_IMPORTED_MODULE_0___default()(() => {
      this.isMobile = isMobile();
    }, 100);
    window.addEventListener('resize', this.$onResize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.$onResize);
  }
});

/***/ }),

/***/ "./src/mixins/refreshMoment.js":
/*!*************************************!*\
  !*** ./src/mixins/refreshMoment.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/*
 * @copyright Copyright (c) 2023 Max <max@nextcloud.com>
 *
 * @author Max <max@nextcloud.com>
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

/* moment.js displays intervals as "Some seconds ago" and the like.
 * Use `this.refreshMoment` in a computed to live update these.
 *
 * Updates happen every 20 seconds as that is enough
 * given the granularity of moment.js
 */
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  data() {
    return {
      refreshMoment: 0
    };
  },
  mounted() {
    this.$refreshInterval = setInterval(() => {
      this.refreshMoment++;
    }, 20000);
  },
  beforeDestroy() {
    clearInterval(this.$refreshInterval);
  }
});

/***/ }),

/***/ "./src/mixins/setContent.js":
/*!**********************************!*\
  !*** ./src/mixins/setContent.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var escape_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! escape-html */ "./node_modules/escape-html/index.js");
/* harmony import */ var escape_html__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(escape_html__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _markdownit_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../markdownit/index.js */ "./src/markdownit/index.js");
/*
 * @copyright Copyright (c) 2023 Max <max@nextcloud.com>
 *
 * @author Max <max@nextcloud.com>
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



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  methods: {
    setContent(content) {
      let {
        isRich,
        addToHistory = true
      } = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      const html = isRich ? _markdownit_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].render(content) + '<p/>' : "<pre>".concat(escape_html__WEBPACK_IMPORTED_MODULE_0___default()(content), "</pre>");
      this.$editor.chain().setContent(html, addToHistory).command(_ref => {
        let {
          tr
        } = _ref;
        tr.setMeta('addToHistory', addToHistory);
        return true;
      }).run();
    }
  }
});

/***/ }),

/***/ "./src/services/AttachmentResolver.js":
/*!********************************************!*\
  !*** ./src/services/AttachmentResolver.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AttachmentResolver)
/* harmony export */ });
/* harmony import */ var _nextcloud_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nextcloud/router */ "./node_modules/@nextcloud/router/dist/index.mjs");
/* harmony import */ var path_normalize__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! path-normalize */ "./node_modules/path-normalize/lib/index.js");
/* harmony import */ var path_normalize__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path_normalize__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _store_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../store/index.js */ "./src/store/index.js");
function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }
function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }
function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }
function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }
function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }
/**
 * @copyright Copyright (c) 2022 Max <max@nextcloud.com>
 *
 * @author Max <max@nextcloud.com>
 *
 * @license AGPL-3.0-or-later
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




const setAttachmentList = val => _store_index_js__WEBPACK_IMPORTED_MODULE_2__["default"].dispatch('text/setAttachmentList', val);
const findAttachment = _store_index_js__WEBPACK_IMPORTED_MODULE_2__["default"].getters['text/findAttachment'];
var _session = /*#__PURE__*/new WeakMap();
var _user = /*#__PURE__*/new WeakMap();
var _shareToken = /*#__PURE__*/new WeakMap();
var _currentDirectory = /*#__PURE__*/new WeakMap();
var _documentId = /*#__PURE__*/new WeakMap();
var _initAttachmentListPromise = /*#__PURE__*/new WeakMap();
var _updateAttachmentList = /*#__PURE__*/new WeakSet();
var _name = /*#__PURE__*/new WeakSet();
var _davUrl = /*#__PURE__*/new WeakSet();
var _relativePath = /*#__PURE__*/new WeakSet();
var _filePath = /*#__PURE__*/new WeakSet();
class AttachmentResolver {
  constructor(_ref) {
    let {
      session,
      user,
      shareToken,
      currentDirectory,
      fileId
    } = _ref;
    _classPrivateMethodInitSpec(this, _filePath);
    /**
     * Return the relativePath to a file specified in the url
     *
     * @param {string} src - url to extract path from
     */
    _classPrivateMethodInitSpec(this, _relativePath);
    _classPrivateMethodInitSpec(this, _davUrl);
    _classPrivateMethodInitSpec(this, _name);
    _classPrivateMethodInitSpec(this, _updateAttachmentList);
    _classPrivateFieldInitSpec(this, _session, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _user, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _shareToken, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _currentDirectory, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _documentId, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _initAttachmentListPromise, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldSet(this, _session, session);
    _classPrivateFieldSet(this, _user, user);
    _classPrivateFieldSet(this, _shareToken, shareToken);
    _classPrivateFieldSet(this, _currentDirectory, currentDirectory);
    _classPrivateFieldSet(this, _documentId, fileId !== null && fileId !== void 0 ? fileId : session.documentId);
    _classPrivateFieldSet(this, _initAttachmentListPromise, _classPrivateMethodGet(this, _updateAttachmentList, _updateAttachmentList2).call(this));
  }
  /*
   * Resolve a given image/attachment src.
   * @param { string } src - the original src in the node.
   * @param { bool } fallback - fetch again attachmentsList if not found | defaul = true
   */
  async resolve(src) {
    let fallback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    let attachment;

    // Native attachment
    const directoryRegexp = /^\.attachments\.\d+\//;
    if (src.match(directoryRegexp)) {
      const imageFileName = decodeURIComponent(src.replace(directoryRegexp, '').split('?')[0]);

      // Wait until attachment list got fetched (initialized by constructor)
      await _classPrivateFieldGet(this, _initAttachmentListPromise);
      attachment = findAttachment(imageFileName);
      if (fallback && !attachment) {
        // Update attachments list. Needed if attachments gets added to the session
        await _classPrivateMethodGet(this, _updateAttachmentList, _updateAttachmentList2).call(this);
        attachment = findAttachment(imageFileName);
      }
      if (attachment) {
        return attachment;
      }
    }

    // Direct URLs
    if (isDirectUrl(src)) {
      return {
        isImage: true,
        name: _classPrivateMethodGet(this, _name, _name2).call(this, src),
        previewUrl: src,
        fullUrl: src
      };
    }

    // Fallback: Return DAV url (e.g. for relative paths to images)
    return {
      isImage: true,
      name: _classPrivateMethodGet(this, _name, _name2).call(this, src),
      previewUrl: _classPrivateMethodGet(this, _davUrl, _davUrl2).call(this, src),
      fullUrl: _classPrivateMethodGet(this, _davUrl, _davUrl2).call(this, src)
    };
  }
}

/**
 * Check if src is a direct URL.
 * Full URLs only work for images on the same Nextcloud instance (due to CORS restrictions).
 *
 * @param {string} src - the url to check
 */
async function _updateAttachmentList2() {
  return setAttachmentList({
    documentId: _classPrivateFieldGet(this, _documentId),
    session: _classPrivateFieldGet(this, _session),
    shareToken: _classPrivateFieldGet(this, _shareToken)
  });
}
function _name2(src) {
  return src.split('/').pop();
}
function _davUrl2(src) {
  if (_classPrivateFieldGet(this, _user)) {
    const uid = _classPrivateFieldGet(this, _user).uid;
    const encoded = _classPrivateMethodGet(this, _filePath, _filePath2).call(this, src).split('/').map(encodeURIComponent).join('/');
    return (0,_nextcloud_router__WEBPACK_IMPORTED_MODULE_0__.generateRemoteUrl)("dav/files/".concat(uid).concat(encoded));
  }
  const path = _classPrivateMethodGet(this, _filePath, _filePath2).call(this, src).split('/');
  const basename = path.pop();
  const dirname = path.join('/');
  return (0,_nextcloud_router__WEBPACK_IMPORTED_MODULE_0__.generateUrl)('/s/{token}/download?path={dirname}&files={basename}', {
    token: _classPrivateFieldGet(this, _shareToken),
    basename,
    dirname
  });
}
function _relativePath2(src) {
  return decodeURI(src.split('?')[0]);
}
function _filePath2(src) {
  const f = [_classPrivateFieldGet(this, _currentDirectory), _classPrivateMethodGet(this, _relativePath, _relativePath2).call(this, src)].join('/');
  return path_normalize__WEBPACK_IMPORTED_MODULE_1___default()(f);
}
function isDirectUrl(src) {
  return src.startsWith('http://') || src.startsWith('https://') || src.startsWith('data:');
}

/***/ }),

/***/ "./src/services/PollingBackend.js":
/*!****************************************!*\
  !*** ./src/services/PollingBackend.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _helpers_logger_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers/logger.js */ "./src/helpers/logger.js");
/* harmony import */ var _SyncService_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SyncService.js */ "./src/services/SyncService.js");
/* harmony import */ var _SessionApi_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SessionApi.js */ "./src/services/SessionApi.js");
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }
function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }
function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }
function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }
/**
 * @copyright Copyright (c) 2019 Julius Härtl <jus@bitgrid.net>
 *
 * @author Julius Härtl <jus@bitgrid.net>
 *
 * @license AGPL-3.0-or-later
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




/**
 * Minimum inverval to refetch the document changes
 *
 * @type {number} time in ms
 */
const FETCH_INTERVAL = 300;

/**
 * Maximum interval between refetches of document state if multiple users have joined
 *
 * @type {number} time in ms
 */
const FETCH_INTERVAL_MAX = 5000;

/**
 * Interval to check for changes when there is only one user joined
 *
 * @type {number} time in ms
 */
const FETCH_INTERVAL_SINGLE_EDITOR = 5000;

/**
 * Interval to fetch for changes when a browser window is considered invisible by the
 * page visibility API https://developer.mozilla.org/de/docs/Web/API/Page_Visibility_API
 *
 * @type {number} time in ms
 */
const FETCH_INTERVAL_INVISIBLE = 60000;

/* Maximum number of retries for fetching before emitting a connection error */
const MAX_RETRY_FETCH_COUNT = 5;

/**
 * Timeout for sessions to be marked as disconnected
 * Make sure that this is higher than any FETCH_INTERVAL_ values
 */
const COLLABORATOR_DISCONNECT_TIME = FETCH_INTERVAL_INVISIBLE * 1.5;
var _syncService = /*#__PURE__*/new WeakMap();
var _connection = /*#__PURE__*/new WeakMap();
var _lastPoll = /*#__PURE__*/new WeakMap();
var _fetchInterval = /*#__PURE__*/new WeakMap();
var _fetchRetryCounter = /*#__PURE__*/new WeakMap();
var _pollActive = /*#__PURE__*/new WeakMap();
var _initialLoadingFinished = /*#__PURE__*/new WeakMap();
class PollingBackend {
  constructor(syncService, connection) {
    /** @type {SyncService} */
    _classPrivateFieldInitSpec(this, _syncService, {
      writable: true,
      value: void 0
    });
    /** @type {Connection} */
    _classPrivateFieldInitSpec(this, _connection, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _lastPoll, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _fetchInterval, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _fetchRetryCounter, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _pollActive, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _initialLoadingFinished, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldSet(this, _syncService, syncService);
    _classPrivateFieldSet(this, _connection, connection);
    _classPrivateFieldSet(this, _fetchInterval, FETCH_INTERVAL);
    _classPrivateFieldSet(this, _fetchRetryCounter, 0);
    _classPrivateFieldSet(this, _lastPoll, 0);
  }
  connect() {
    if (this.fetcher > 0) {
      console.error('Trying to connect, but already connected');
      return;
    }
    _classPrivateFieldSet(this, _initialLoadingFinished, false);
    this.fetcher = setInterval(this._fetchSteps.bind(this), 50);
    document.addEventListener('visibilitychange', this.visibilitychange.bind(this));
  }

  /**
   * This method is only called though the timer
   */
  async _fetchSteps() {
    if (_classPrivateFieldGet(this, _pollActive)) {
      return;
    }
    const now = Date.now();
    if (_classPrivateFieldGet(this, _lastPoll) > now - _classPrivateFieldGet(this, _fetchInterval)) {
      return;
    }
    if (!this.fetcher) {
      console.error('No inverval but triggered');
      return;
    }
    _classPrivateFieldSet(this, _pollActive, true);
    _helpers_logger_js__WEBPACK_IMPORTED_MODULE_0__.logger.debug('[PollingBackend] Fetching steps', _classPrivateFieldGet(this, _syncService).version);
    await _classPrivateFieldGet(this, _connection).sync({
      version: _classPrivateFieldGet(this, _syncService).version
    }).then(this._handleResponse.bind(this), this._handleError.bind(this));
    _classPrivateFieldSet(this, _lastPoll, Date.now());
    _classPrivateFieldSet(this, _pollActive, false);
  }
  _handleResponse(_ref) {
    let {
      data
    } = _ref;
    const {
      document,
      sessions
    } = data;
    _classPrivateFieldSet(this, _fetchRetryCounter, 0);
    _classPrivateFieldGet(this, _syncService).emit('change', {
      document,
      sessions
    });
    _classPrivateFieldGet(this, _syncService)._receiveSteps(data);
    if (data.steps.length === 0) {
      if (!_classPrivateFieldGet(this, _initialLoadingFinished)) {
        _classPrivateFieldSet(this, _initialLoadingFinished, true);
      }
      if (_classPrivateFieldGet(this, _syncService).checkIdle()) {
        return;
      }
      const disconnect = Date.now() - COLLABORATOR_DISCONNECT_TIME;
      const alive = sessions.filter(s => s.lastContact * 1000 > disconnect);
      if (alive.length < 2) {
        this.maximumRefetchTimer();
      } else {
        this.increaseRefetchTimer();
      }
      _classPrivateFieldGet(this, _syncService).emit('stateChange', {
        initialLoading: true
      });
      return;
    }
    if (_classPrivateFieldGet(this, _initialLoadingFinished)) {
      this.resetRefetchTimer();
    }
  }
  _handleError(e) {
    if (!e.response || e.code === 'ECONNABORTED') {
      var _this$fetchRetryCount, _this$fetchRetryCount2;
      if ((_classPrivateFieldSet(this, _fetchRetryCounter, (_this$fetchRetryCount = _classPrivateFieldGet(this, _fetchRetryCounter), _this$fetchRetryCount2 = _this$fetchRetryCount++, _this$fetchRetryCount)), _this$fetchRetryCount2) >= MAX_RETRY_FETCH_COUNT) {
        _helpers_logger_js__WEBPACK_IMPORTED_MODULE_0__.logger.error('[PollingBackend:fetchSteps] Network error when fetching steps, emitting CONNECTION_FAILED');
        _classPrivateFieldGet(this, _syncService).emit('error', {
          type: _SyncService_js__WEBPACK_IMPORTED_MODULE_1__.ERROR_TYPE.CONNECTION_FAILED,
          data: {}
        });
      } else {
        _helpers_logger_js__WEBPACK_IMPORTED_MODULE_0__.logger.error("[PollingBackend:fetchSteps] Network error when fetching steps, retry ".concat(_classPrivateFieldGet(this, _fetchRetryCounter)));
      }
    } else if (e.response.status === 409) {
      // Still apply the steps to update our version of the document
      this._handleResponse(e.response);
      _helpers_logger_js__WEBPACK_IMPORTED_MODULE_0__.logger.error('Conflict during file save, please resolve');
      _classPrivateFieldGet(this, _syncService).emit('error', {
        type: _SyncService_js__WEBPACK_IMPORTED_MODULE_1__.ERROR_TYPE.SAVE_COLLISSION,
        data: {
          outsideChange: e.response.data.outsideChange
        }
      });
    } else if (e.response.status === 412) {
      _classPrivateFieldGet(this, _syncService).emit('error', {
        type: _SyncService_js__WEBPACK_IMPORTED_MODULE_1__.ERROR_TYPE.LOAD_ERROR,
        data: e.response
      });
      this.disconnect();
    } else if (e.response.status === 403) {
      _classPrivateFieldGet(this, _syncService).emit('error', {
        type: _SyncService_js__WEBPACK_IMPORTED_MODULE_1__.ERROR_TYPE.SOURCE_NOT_FOUND,
        data: {}
      });
      this.disconnect();
    } else if (e.response.status === 404) {
      _classPrivateFieldGet(this, _syncService).emit('error', {
        type: _SyncService_js__WEBPACK_IMPORTED_MODULE_1__.ERROR_TYPE.SOURCE_NOT_FOUND,
        data: {}
      });
      this.disconnect();
    } else if (e.response.status === 503) {
      this.increaseRefetchTimer();
      _classPrivateFieldGet(this, _syncService).emit('error', {
        type: _SyncService_js__WEBPACK_IMPORTED_MODULE_1__.ERROR_TYPE.CONNECTION_FAILED,
        data: {}
      });
      _helpers_logger_js__WEBPACK_IMPORTED_MODULE_0__.logger.error('Failed to fetch steps due to unavailable service', {
        error: e
      });
    } else {
      this.disconnect();
      _classPrivateFieldGet(this, _syncService).emit('error', {
        type: _SyncService_js__WEBPACK_IMPORTED_MODULE_1__.ERROR_TYPE.CONNECTION_FAILED,
        data: {}
      });
      _helpers_logger_js__WEBPACK_IMPORTED_MODULE_0__.logger.error('Failed to fetch steps due to other reason', {
        error: e
      });
    }
  }
  disconnect() {
    clearInterval(this.fetcher);
    this.fetcher = 0;
    document.removeEventListener('visibilitychange', this.visibilitychange.bind(this));
  }
  resetRefetchTimer() {
    _classPrivateFieldSet(this, _fetchInterval, FETCH_INTERVAL);
  }
  increaseRefetchTimer() {
    _classPrivateFieldSet(this, _fetchInterval, Math.min(_classPrivateFieldGet(this, _fetchInterval) * 2, FETCH_INTERVAL_MAX));
  }
  maximumRefetchTimer() {
    _classPrivateFieldSet(this, _fetchInterval, FETCH_INTERVAL_SINGLE_EDITOR);
  }
  visibilitychange() {
    if (document.visibilityState === 'hidden') {
      _classPrivateFieldSet(this, _fetchInterval, FETCH_INTERVAL_INVISIBLE);
    } else {
      this.resetRefetchTimer();
    }
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PollingBackend);

/***/ }),

/***/ "./src/services/SessionApi.js":
/*!************************************!*\
  !*** ./src/services/SessionApi.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Connection: () => (/* binding */ Connection),
/* harmony export */   ConnectionClosedError: () => (/* binding */ ConnectionClosedError),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _nextcloud_axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nextcloud/axios */ "./node_modules/@nextcloud/axios/dist/index.es.mjs");
/* harmony import */ var _nextcloud_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nextcloud/router */ "./node_modules/@nextcloud/router/dist/index.mjs");
function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }
function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }
function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }
function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }
function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }
/**
 * @copyright Copyright (c) 2022 Max <max@nextcloud.com>
 *
 * @author Max <max@nextcloud.com>
 *
 * @license AGPL-3.0-or-later
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


class ConnectionClosedError extends Error {
  constructor() {
    let message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Close has already been called on the connection';
    for (var _len = arguments.length, rest = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      rest[_key - 1] = arguments[_key];
    }
    super(message, ...rest);
  }
}
var _options = /*#__PURE__*/new WeakMap();
var _url = /*#__PURE__*/new WeakSet();
class SessionApi {
  constructor() {
    let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classPrivateMethodInitSpec(this, _url);
    _classPrivateFieldInitSpec(this, _options, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldSet(this, _options, options);
  }
  open(_ref) {
    let {
      fileId,
      baseVersionEtag
    } = _ref;
    return _nextcloud_axios__WEBPACK_IMPORTED_MODULE_0__["default"].put(_classPrivateMethodGet(this, _url, _url2).call(this, "session/".concat(fileId, "/create")), {
      fileId,
      baseVersionEtag,
      filePath: _classPrivateFieldGet(this, _options).filePath,
      token: _classPrivateFieldGet(this, _options).shareToken,
      guestName: _classPrivateFieldGet(this, _options).guestName,
      forceRecreate: _classPrivateFieldGet(this, _options).forceRecreate
    }).then(response => new Connection(response, _classPrivateFieldGet(this, _options)));
  }
}
function _url2(endpoint) {
  const isPublic = !!_classPrivateFieldGet(this, _options).shareToken;
  return _endpointUrl(endpoint, isPublic);
}
var _content = /*#__PURE__*/new WeakMap();
var _closed = /*#__PURE__*/new WeakMap();
var _documentState = /*#__PURE__*/new WeakMap();
var _document = /*#__PURE__*/new WeakMap();
var _session = /*#__PURE__*/new WeakMap();
var _lock = /*#__PURE__*/new WeakMap();
var _readOnly = /*#__PURE__*/new WeakMap();
var _options2 = /*#__PURE__*/new WeakMap();
var _defaultParams = /*#__PURE__*/new WeakMap();
var _post = /*#__PURE__*/new WeakSet();
var _url3 = /*#__PURE__*/new WeakSet();
class Connection {
  constructor(response, options) {
    _classPrivateMethodInitSpec(this, _url3);
    _classPrivateMethodInitSpec(this, _post);
    _classPrivateFieldInitSpec(this, _defaultParams, {
      get: _get_defaultParams,
      set: void 0
    });
    _classPrivateFieldInitSpec(this, _content, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _closed, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _documentState, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _document, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _session, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _lock, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _readOnly, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _options2, {
      writable: true,
      value: void 0
    });
    const {
      document,
      session,
      lock,
      readOnly,
      content,
      documentState
    } = response.data;
    _classPrivateFieldSet(this, _document, document);
    _classPrivateFieldSet(this, _session, session);
    _classPrivateFieldSet(this, _lock, lock);
    _classPrivateFieldSet(this, _readOnly, readOnly);
    _classPrivateFieldSet(this, _content, content);
    _classPrivateFieldSet(this, _documentState, documentState);
    _classPrivateFieldSet(this, _options2, options);
    this.isPublic = !!options.shareToken;
    this.closed = false;
  }
  get session() {
    return _classPrivateFieldGet(this, _session);
  }
  get document() {
    return _classPrivateFieldGet(this, _document);
  }
  get docStateVersion() {
    return _classPrivateFieldGet(this, _documentState) ? _classPrivateFieldGet(this, _document).lastSavedVersion : 0;
  }
  get state() {
    return {
      document: {
        ..._classPrivateFieldGet(this, _document),
        readOnly: _classPrivateFieldGet(this, _readOnly)
      },
      session: _classPrivateFieldGet(this, _session),
      documentSource: _classPrivateFieldGet(this, _content) || '',
      documentState: _classPrivateFieldGet(this, _documentState)
    };
  }
  sync(_ref2) {
    let {
      version
    } = _ref2;
    return _classPrivateMethodGet(this, _post, _post2).call(this, _classPrivateMethodGet(this, _url3, _url4).call(this, "session/".concat(_classPrivateFieldGet(this, _document).id, "/sync")), {
      ..._classPrivateFieldGet(this, _defaultParams),
      filePath: _classPrivateFieldGet(this, _options2).filePath,
      baseVersionEtag: _classPrivateFieldGet(this, _document).baseVersionEtag,
      version
    });
  }
  save(_ref3) {
    let {
      version,
      autosaveContent,
      documentState,
      force,
      manualSave
    } = _ref3;
    return _classPrivateMethodGet(this, _post, _post2).call(this, _classPrivateMethodGet(this, _url3, _url4).call(this, "session/".concat(_classPrivateFieldGet(this, _document).id, "/save")), {
      ..._classPrivateFieldGet(this, _defaultParams),
      filePath: _classPrivateFieldGet(this, _options2).filePath,
      baseVersionEtag: _classPrivateFieldGet(this, _document).baseVersionEtag,
      version,
      autosaveContent,
      documentState,
      force,
      manualSave
    });
  }
  push(_ref4) {
    let {
      steps,
      version,
      awareness
    } = _ref4;
    return _classPrivateMethodGet(this, _post, _post2).call(this, _classPrivateMethodGet(this, _url3, _url4).call(this, "session/".concat(_classPrivateFieldGet(this, _document).id, "/push")), {
      ..._classPrivateFieldGet(this, _defaultParams),
      filePath: _classPrivateFieldGet(this, _options2).filePath,
      baseVersionEtag: _classPrivateFieldGet(this, _document).baseVersionEtag,
      steps,
      version,
      awareness
    });
  }

  // TODO: maybe return a new connection here so connections have immutable state
  update(guestName) {
    return _classPrivateMethodGet(this, _post, _post2).call(this, _classPrivateMethodGet(this, _url3, _url4).call(this, "session/".concat(_classPrivateFieldGet(this, _document).id, "/session")), {
      ..._classPrivateFieldGet(this, _defaultParams),
      guestName
    }).then(_ref5 => {
      let {
        data
      } = _ref5;
      _classPrivateFieldSet(this, _session, data);
    });
  }
  uploadAttachment(file) {
    const formData = new FormData();
    formData.append('file', file);
    const url = _endpointUrl('attachment/upload') + '?documentId=' + encodeURIComponent(_classPrivateFieldGet(this, _document).id) + '&sessionId=' + encodeURIComponent(_classPrivateFieldGet(this, _session).id) + '&sessionToken=' + encodeURIComponent(_classPrivateFieldGet(this, _session).token) + '&shareToken=' + encodeURIComponent(_classPrivateFieldGet(this, _options2).shareToken || '');
    return _classPrivateMethodGet(this, _post, _post2).call(this, url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }
  insertAttachmentFile(filePath) {
    return _classPrivateMethodGet(this, _post, _post2).call(this, _endpointUrl('attachment/filepath'), {
      documentId: _classPrivateFieldGet(this, _document).id,
      sessionId: _classPrivateFieldGet(this, _session).id,
      sessionToken: _classPrivateFieldGet(this, _session).token,
      filePath
    });
  }
  close() {
    const promise = _classPrivateMethodGet(this, _post, _post2).call(this, _classPrivateMethodGet(this, _url3, _url4).call(this, "session/".concat(_classPrivateFieldGet(this, _document).id, "/close")), _classPrivateFieldGet(this, _defaultParams));
    this.closed = true;
    return promise;
  }

  // To be used in Cypress tests only
  setBaseVersionEtag(baseVersionEtag) {
    _classPrivateFieldGet(this, _document).baseVersionEtag = baseVersionEtag;
  }
}

/**
 *
 * @param {string} endpoint - endpoint of the url inside apps/text
 * @param {boolean} isPublic - public url or not
 */
function _get_defaultParams() {
  return {
    documentId: _classPrivateFieldGet(this, _document).id,
    sessionId: _classPrivateFieldGet(this, _session).id,
    sessionToken: _classPrivateFieldGet(this, _session).token,
    token: _classPrivateFieldGet(this, _options2).shareToken
  };
}
function _post2() {
  if (this.closed) {
    return Promise.reject(new ConnectionClosedError());
  }
  return _nextcloud_axios__WEBPACK_IMPORTED_MODULE_0__["default"].post(...arguments);
}
function _url4(endpoint) {
  const isPublic = !!_classPrivateFieldGet(this, _defaultParams).token;
  return _endpointUrl(endpoint, isPublic);
}
function _endpointUrl(endpoint) {
  let isPublic = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  const _baseUrl = (0,_nextcloud_router__WEBPACK_IMPORTED_MODULE_1__.generateUrl)('/apps/text');
  if (isPublic) {
    return "".concat(_baseUrl, "/public/").concat(endpoint);
  }
  return "".concat(_baseUrl, "/").concat(endpoint);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SessionApi);

/***/ }),

/***/ "./src/services/SyncService.js":
/*!*************************************!*\
  !*** ./src/services/SyncService.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   COLLABORATOR_DISCONNECT_TIME: () => (/* binding */ COLLABORATOR_DISCONNECT_TIME),
/* harmony export */   COLLABORATOR_IDLE_TIME: () => (/* binding */ COLLABORATOR_IDLE_TIME),
/* harmony export */   ERROR_TYPE: () => (/* binding */ ERROR_TYPE),
/* harmony export */   IDLE_TIMEOUT: () => (/* binding */ IDLE_TIMEOUT),
/* harmony export */   SyncService: () => (/* binding */ SyncService),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var mitt__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mitt */ "./node_modules/mitt/dist/mitt.mjs");
/* harmony import */ var debounce__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! debounce */ "./node_modules/debounce/index.js");
/* harmony import */ var debounce__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(debounce__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _PollingBackend_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PollingBackend.js */ "./src/services/PollingBackend.js");
/* harmony import */ var _SessionApi_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SessionApi.js */ "./src/services/SessionApi.js");
/* harmony import */ var _helpers_logger_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../helpers/logger.js */ "./src/helpers/logger.js");
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }
function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }
function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }
function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }
/* eslint-disable jsdoc/valid-types */
/**
 * @copyright Copyright (c) 2019 Julius Härtl <jus@bitgrid.net>
 *
 * @author Julius Härtl <jus@bitgrid.net>
 *
 * @license AGPL-3.0-or-later
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






/**
 * Timeout after which the editor will consider a document without changes being synced as idle
 * The session will be terminated and the document will stay open in read-only mode with a button to reconnect if needed
 *
 * @type {number}
 */
const IDLE_TIMEOUT = 1440;

/**
 * Interval to save the serialized document and the document state
 *
 * @type {number} time in ms
 */
const AUTOSAVE_INTERVAL = 30000;
const COLLABORATOR_IDLE_TIME = 60;
const COLLABORATOR_DISCONNECT_TIME = 90;
const ERROR_TYPE = {
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
var _sendIntervalId = /*#__PURE__*/new WeakMap();
class SyncService {
  constructor(_ref) {
    let {
      baseVersionEtag,
      serialize,
      getDocumentState,
      ...options
    } = _ref;
    _classPrivateFieldInitSpec(this, _sendIntervalId, {
      writable: true,
      value: void 0
    });
    /** @type {import('mitt').Emitter<import('./SyncService').EventTypes>} _bus */
    this._bus = (0,mitt__WEBPACK_IMPORTED_MODULE_0__["default"])();
    this.serialize = serialize;
    this.getDocumentState = getDocumentState;
    this._api = new _SessionApi_js__WEBPACK_IMPORTED_MODULE_2__["default"](options);
    this.connection = null;
    this.stepClientIDs = [];
    this.lastStepPush = Date.now();
    this.version = null;
    this.baseVersionEtag = baseVersionEtag;
    this.sending = false;
    _classPrivateFieldSet(this, _sendIntervalId, null);
    this.autosave = debounce__WEBPACK_IMPORTED_MODULE_4___default()(this._autosave.bind(this), AUTOSAVE_INTERVAL);
    return this;
  }
  async open(_ref2) {
    let {
      fileId,
      initialSession
    } = _ref2;
    const connect = initialSession ? Promise.resolve(new _SessionApi_js__WEBPACK_IMPORTED_MODULE_2__.Connection({
      data: initialSession
    }, {})) : this._api.open({
      fileId,
      baseVersionEtag: this.baseVersionEtag
    }).catch(error => this._emitError(error));
    this.connection = await connect;
    if (!this.connection) {
      // Error was already emitted in connect
      return;
    }
    this.backend = new _PollingBackend_js__WEBPACK_IMPORTED_MODULE_1__["default"](this, this.connection);
    this.version = this.connection.docStateVersion;
    this.baseVersionEtag = this.connection.document.baseVersionEtag;
    this.emit('opened', {
      ...this.connection.state,
      version: this.version
    });
    this.emit('loaded', {
      ...this.connection.state,
      version: this.version
    });
  }
  startSync() {
    this.backend.connect();
  }
  syncUp() {
    this.backend.resetRefetchTimer();
  }
  _emitError(error) {
    if (!error.response || error.code === 'ECONNABORTED') {
      this.emit('error', {
        type: ERROR_TYPE.CONNECTION_FAILED,
        data: {}
      });
    } else {
      this.emit('error', {
        type: ERROR_TYPE.LOAD_ERROR,
        data: error.response
      });
    }
  }
  updateSession(guestName) {
    if (!this.connection.isPublic) {
      return Promise.reject(new Error());
    }
    return this.connection.update(guestName).catch(error => {
      _helpers_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.error('Failed to update the session', {
        error
      });
      return Promise.reject(error);
    });
  }
  sendSteps(getSendable) {
    // If already waiting to send, do nothing.
    if (_classPrivateFieldGet(this, _sendIntervalId)) {
      return;
    }
    return new Promise((resolve, reject) => {
      _classPrivateFieldSet(this, _sendIntervalId, setInterval(() => {
        if (this.connection && !this.sending) {
          this.sendStepsNow(getSendable).then(resolve).catch(reject);
        }
      }, 200));
    });
  }
  sendStepsNow(getSendable) {
    this.sending = true;
    clearInterval(_classPrivateFieldGet(this, _sendIntervalId));
    _classPrivateFieldSet(this, _sendIntervalId, null);
    const data = getSendable();
    if (data.steps.length > 0) {
      this.emit('stateChange', {
        dirty: true
      });
    }
    return this.connection.push(data).then(response => {
      this.sending = false;
      this.emit('sync', {
        steps: [],
        document: this.connection.document,
        version: this.version
      });
    }).catch(err => {
      const {
        response,
        code
      } = err;
      this.sending = false;
      if (!response || code === 'ECONNABORTED') {
        this.emit('error', {
          type: ERROR_TYPE.CONNECTION_FAILED,
          data: {}
        });
      }
      if ((response === null || response === void 0 ? void 0 : response.status) === 412) {
        this.emit('error', {
          type: ERROR_TYPE.LOAD_ERROR,
          data: response
        });
      } else if ((response === null || response === void 0 ? void 0 : response.status) === 403) {
        var _response$data$docume;
        if (!data.document) {
          // either the session is invalid or the document is read only.
          _helpers_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.error('failed to write to document - not allowed');
        }
        // Only emit conflict event if we have synced until the latest version
        if (((_response$data$docume = response.data.document) === null || _response$data$docume === void 0 ? void 0 : _response$data$docume.currentVersion) === this.version) {
          this.emit('error', {
            type: ERROR_TYPE.PUSH_FAILURE,
            data: {}
          });
          OC.Notification.showTemporary('Changes could not be sent yet');
        }
      }
      throw new Error('Failed to apply steps. Retry!', {
        cause: err
      });
    });
  }
  _receiveSteps(_ref3) {
    let {
      steps,
      document,
      sessions
    } = _ref3;
    const awareness = sessions.filter(s => s.lastContact > Math.floor(Date.now() / 1000) - COLLABORATOR_DISCONNECT_TIME).filter(s => s.lastAwarenessMessage).map(s => {
      return {
        step: s.lastAwarenessMessage,
        clientId: s.clientId
      };
    });
    const newSteps = [...awareness];
    for (let i = 0; i < steps.length; i++) {
      const singleSteps = steps[i].data;
      if (this.version < steps[i].version) {
        this.version = steps[i].version;
      }
      if (!Array.isArray(singleSteps)) {
        _helpers_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.error('Invalid step data, skipping step', {
          step: steps[i]
        });
        // TODO: recover
        continue;
      }
      singleSteps.forEach(step => {
        newSteps.push({
          step,
          clientID: steps[i].sessionId
        });
      });
    }
    this.lastStepPush = Date.now();
    this.emit('sync', {
      steps: newSteps,
      // TODO: do we actually need to dig into the connection here?
      document: this.connection.document,
      version: this.version
    });
  }
  checkIdle() {
    const lastPushMinutesAgo = (Date.now() - this.lastStepPush) / 1000 / 60;
    if (lastPushMinutesAgo > IDLE_TIMEOUT) {
      _helpers_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.debug("[SyncService] Document is idle for ".concat(this.IDLE_TIMEOUT, " minutes, suspending connection"));
      this.emit('idle');
      return true;
    }
    return false;
  }
  _getContent() {
    return this.serialize();
  }
  async save() {
    let {
      force = false,
      manualSave = true
    } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _helpers_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.debug('[SyncService] saving', arguments[0]);
    try {
      const response = await this.connection.save({
        version: this.version,
        autosaveContent: this._getContent(),
        documentState: this.getDocumentState(),
        force,
        manualSave
      });
      this.emit('stateChange', {
        dirty: false
      });
      this.connection.document.lastSavedVersionTime = Date.now() / 1000;
      _helpers_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.debug('[SyncService] saved', response);
      const {
        document,
        sessions
      } = response.data;
      this.emit('save', {
        document,
        sessions
      });
      this.autosave.clear();
    } catch (e) {
      _helpers_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.error('Failed to save document.', {
        error: e
      });
      throw e;
    }
  }
  forceSave() {
    return this.save({
      force: true
    });
  }
  _autosave() {
    return this.save({
      manualSave: false
    });
  }
  async close() {
    var _this$backend;
    // Make sure to leave no pending requests behind.
    this.autosave.clear();
    (_this$backend = this.backend) === null || _this$backend === void 0 ? void 0 : _this$backend.disconnect();
    return this._close();
  }
  _close() {
    if (this.connection === null) {
      return Promise.resolve();
    }
    this.backend.disconnect();
    return this.connection.close();
  }
  uploadAttachment(file) {
    return this.connection.uploadAttachment(file);
  }
  insertAttachmentFile(filePath) {
    return this.connection.insertAttachmentFile(filePath);
  }
  on(event, callback) {
    this._bus.on(event, callback);
    return this;
  }
  off(event, callback) {
    this._bus.off(event, callback);
    return this;
  }
  emit(event, data) {
    this._bus.emit(event, data);
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SyncService);


/***/ }),

/***/ "./src/services/SyncServiceProvider.js":
/*!*********************************************!*\
  !*** ./src/services/SyncServiceProvider.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ createSyncServiceProvider)
/* harmony export */ });
/* harmony import */ var y_websocket__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! y-websocket */ "./node_modules/y-websocket/src/y-websocket.js");
/* harmony import */ var _WebSocketPolyfill_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./WebSocketPolyfill.js */ "./src/services/WebSocketPolyfill.js");
/* harmony import */ var _helpers_logger_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers/logger.js */ "./src/helpers/logger.js");
/*
 * @copyright Copyright (c) 2022 Max <max@nextcloud.com>
 *
 * @author Max <max@nextcloud.com>
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
 *
 * @param {object} options - options for the sync provider
 * @param {object} options.ydoc - the Ydoc
 * @param {object} options.syncService - sync service to build upon
 * @param {number} options.fileId - file id of the file to open
 * @param {number} options.queue - queue for outgoing steps
 * @param {object} options.initialSession - initialSession to start from
 * @param {boolean} options.disableBc - disable broadcast channel synchronization (default: disabled in debug mode, enabled otherwise)
 */
function createSyncServiceProvider(_ref) {
  var _disableBc, _window;
  let {
    ydoc,
    syncService,
    fileId,
    initialSession,
    queue,
    disableBc
  } = _ref;
  if (!fileId) {
    // We need a file id as a unique identifier for y.js as otherwise state might leak between different files
    throw new Error('fileId is required');
  }
  const WebSocketPolyfill = (0,_WebSocketPolyfill_js__WEBPACK_IMPORTED_MODULE_0__["default"])(syncService, fileId, initialSession, queue);
  disableBc = (_disableBc = disableBc) !== null && _disableBc !== void 0 ? _disableBc : !!((_window = window) !== null && _window !== void 0 && _window._oc_debug);
  const websocketProvider = new y_websocket__WEBPACK_IMPORTED_MODULE_2__.WebsocketProvider('ws://localhost:1234', 'file:' + fileId, ydoc, {
    WebSocketPolyfill,
    disableBc
  });
  websocketProvider.on('status', event => _helpers_logger_js__WEBPACK_IMPORTED_MODULE_1__.logger.debug('status', event));
  return websocketProvider;
}

/***/ }),

/***/ "./src/services/WebSocketPolyfill.js":
/*!*******************************************!*\
  !*** ./src/services/WebSocketPolyfill.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ initWebSocketPolyfill)
/* harmony export */ });
/* harmony import */ var _helpers_logger_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers/logger.js */ "./src/helpers/logger.js");
/* harmony import */ var _helpers_base64_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers/base64.js */ "./src/helpers/base64.js");
function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }
function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }
function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }
function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }
function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }
/*
 * @copyright Copyright (c) 2022 Max <max@nextcloud.com>
 *
 * @author Max <max@nextcloud.com>
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
 *
 * @param {object} syncService - the sync service to build upon
 * @param {number} fileId - id of the file to open
 * @param {object} initialSession - initial session to open
 * @param {object[]} queue - queue for the outgoing steps
 */
function initWebSocketPolyfill(syncService, fileId, initialSession, queue) {
  var _url, _session, _version, _handlers, _registerHandlers, _steps, _awareness, _sendRemainingSteps;
  return _url = /*#__PURE__*/new WeakMap(), _session = /*#__PURE__*/new WeakMap(), _version = /*#__PURE__*/new WeakMap(), _handlers = /*#__PURE__*/new WeakMap(), _registerHandlers = /*#__PURE__*/new WeakSet(), _steps = /*#__PURE__*/new WeakMap(), _awareness = /*#__PURE__*/new WeakMap(), _sendRemainingSteps = /*#__PURE__*/new WeakSet(), class WebSocketPolyfill {
    constructor(url) {
      _classPrivateMethodInitSpec(this, _sendRemainingSteps);
      _classPrivateFieldInitSpec(this, _awareness, {
        get: _get_awareness,
        set: void 0
      });
      _classPrivateFieldInitSpec(this, _steps, {
        get: _get_steps,
        set: void 0
      });
      _classPrivateMethodInitSpec(this, _registerHandlers);
      _classPrivateFieldInitSpec(this, _url, {
        writable: true,
        value: void 0
      });
      _classPrivateFieldInitSpec(this, _session, {
        writable: true,
        value: void 0
      });
      _classPrivateFieldInitSpec(this, _version, {
        writable: true,
        value: void 0
      });
      _defineProperty(this, "binaryType", void 0);
      _defineProperty(this, "onmessage", void 0);
      _defineProperty(this, "onerror", void 0);
      _defineProperty(this, "onclose", void 0);
      _defineProperty(this, "onopen", void 0);
      _classPrivateFieldInitSpec(this, _handlers, {
        writable: true,
        value: void 0
      });
      this.url = url;
      _helpers_logger_js__WEBPACK_IMPORTED_MODULE_0__.logger.debug('WebSocketPolyfill#constructor', {
        url,
        fileId,
        initialSession
      });
      _classPrivateMethodGet(this, _registerHandlers, _registerHandlers2).call(this, {
        opened: _ref => {
          var _this$onopen;
          let {
            version,
            session
          } = _ref;
          _classPrivateFieldSet(this, _version, version);
          _helpers_logger_js__WEBPACK_IMPORTED_MODULE_0__.logger.debug('opened ', {
            version,
            session
          });
          _classPrivateFieldSet(this, _session, session);
          (_this$onopen = this.onopen) === null || _this$onopen === void 0 ? void 0 : _this$onopen.call(this);
        },
        loaded: _ref2 => {
          let {
            version,
            session,
            content
          } = _ref2;
          _helpers_logger_js__WEBPACK_IMPORTED_MODULE_0__.logger.debug('loaded ', {
            version,
            session
          });
          _classPrivateFieldSet(this, _version, version);
          _classPrivateFieldSet(this, _session, session);
        },
        sync: _ref3 => {
          let {
            steps,
            version
          } = _ref3;
          _helpers_logger_js__WEBPACK_IMPORTED_MODULE_0__.logger.debug('synced ', {
            version,
            steps
          });
          _classPrivateFieldSet(this, _version, version);
          if (steps) {
            steps.forEach(s => {
              const data = (0,_helpers_base64_js__WEBPACK_IMPORTED_MODULE_1__.decodeArrayBuffer)(s.step);
              this.onmessage({
                data
              });
            });
          }
        }
      });
      syncService.open({
        fileId,
        initialSession
      });
    }
    send() {
      var _syncService$sendStep;
      // Useful for debugging what steps are sent and how they were initiated
      // data.forEach(logStep)

      queue.push(...arguments);
      let outbox = [];
      return (_syncService$sendStep = syncService.sendSteps(() => {
        const data = {
          steps: _classPrivateFieldGet(this, _steps),
          awareness: _classPrivateFieldGet(this, _awareness),
          version: _classPrivateFieldGet(this, _version)
        };
        outbox = [...queue];
        _helpers_logger_js__WEBPACK_IMPORTED_MODULE_0__.logger.debug('sending steps ', data);
        return data;
      })) === null || _syncService$sendStep === void 0 ? void 0 : _syncService$sendStep.then(ret => {
        // only keep the steps that were not send yet
        queue.splice(0, queue.length, ...queue.filter(s => !outbox.includes(s)));
        return ret;
      }, err => _helpers_logger_js__WEBPACK_IMPORTED_MODULE_0__.logger.error(err));
    }
    async close() {
      await _classPrivateMethodGet(this, _sendRemainingSteps, _sendRemainingSteps2).call(this);
      Object.entries(_classPrivateFieldGet(this, _handlers)).forEach(_ref4 => {
        let [key, value] = _ref4;
        return syncService.off(key, value);
      });
      _classPrivateFieldSet(this, _handlers, []);
      syncService.close().then(() => {
        this.onclose();
      });
      _helpers_logger_js__WEBPACK_IMPORTED_MODULE_0__.logger.debug('Websocket closed');
    }
  };
  function _registerHandlers2(handlers) {
    _classPrivateFieldSet(this, _handlers, handlers);
    Object.entries(_classPrivateFieldGet(this, _handlers)).forEach(_ref5 => {
      let [key, value] = _ref5;
      return syncService.on(key, value);
    });
  }
  function _get_steps() {
    return queue.map(s => (0,_helpers_base64_js__WEBPACK_IMPORTED_MODULE_1__.encodeArrayBuffer)(s)).filter(s => s < 'AQ');
  }
  function _get_awareness() {
    return queue.map(s => (0,_helpers_base64_js__WEBPACK_IMPORTED_MODULE_1__.encodeArrayBuffer)(s)).findLast(s => s > 'AQ') || '';
  }
  function _sendRemainingSteps2() {
    if (queue.length) {
      var _syncService$sendStep2;
      let outbox = [];
      return (_syncService$sendStep2 = syncService.sendStepsNow(() => {
        const data = {
          steps: _classPrivateFieldGet(this, _steps),
          awareness: _classPrivateFieldGet(this, _awareness),
          version: _classPrivateFieldGet(this, _version)
        };
        outbox = [...queue];
        _helpers_logger_js__WEBPACK_IMPORTED_MODULE_0__.logger.debug('sending final steps ', data);
        return data;
      })) === null || _syncService$sendStep2 === void 0 ? void 0 : _syncService$sendStep2.then(() => {
        // only keep the steps that were not send yet
        queue.splice(0, queue.length, ...queue.filter(s => !outbox.includes(s)));
      }, err => _helpers_logger_js__WEBPACK_IMPORTED_MODULE_0__.logger.error(err));
    }
  }
}

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Assistant.vue?vue&type=style&index=0&id=37cbcbde&scoped=true&lang=scss":
/*!************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Assistant.vue?vue&type=style&index=0&id=37cbcbde&scoped=true&lang=scss ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ "./node_modules/css-loader/dist/runtime/noSourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.text-assistant[data-v-37cbcbde] {
  position: fixed;
  top: calc(2 * var(--header-height));
  right: 0;
  margin: calc(var(--default-grid-baseline) * 3);
  overflow: auto;
  width: 250px;
  max-height: 200px;
}
.task-list[data-v-37cbcbde] {
  padding: 24px;
}
h4[data-v-37cbcbde] {
  display: flex;
  align-items: center;
  justify-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}
.assistant-bubble[data-v-37cbcbde] {
  display: flex;
  gap: 8px;
  background-color: var(--color-primary-element-light);
  border-radius: var(--border-radius-rounded);
  padding: 2px 8px;
}
.assistant-bubble .icon[data-v-37cbcbde] {
  color: var(--color-primary);
}
ul[data-v-37cbcbde] {
  width: calc(100% - 16px);
}
ul[data-v-37cbcbde] .list-item {
  padding-top: 0;
  padding-bottom: 0;
}
ul[data-v-37cbcbde] .line-two__additional_elements {
  margin-top: -22px;
}
.floating-menu[data-v-37cbcbde] {
  position: relative;
}
.floating-menu--badge[data-v-37cbcbde] {
  position: absolute;
  bottom: -2px;
  right: -2px;
}
.icon-status--success[data-v-37cbcbde] {
  color: var(--color-success);
}
.icon-status--failed[data-v-37cbcbde] {
  color: var(--color-error);
}`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/BaseReader.vue?vue&type=style&index=0&id=364eab24&scoped=true&lang=scss":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/BaseReader.vue?vue&type=style&index=0&id=364eab24&scoped=true&lang=scss ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ "./node_modules/css-loader/dist/runtime/noSourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.editor__content[data-v-364eab24] {
  max-width: var(--text-editor-max-width);
  margin: auto;
  position: relative;
  width: 100%;
}
.text-editor__content-wrapper[data-v-364eab24] {
  --side-width: calc((100% - var(--text-editor-max-width)) / 2);
  display: grid;
  grid-template-columns: 1fr auto;
}
.text-editor__content-wrapper.--show-outline[data-v-364eab24] {
  grid-template-columns: var(--side-width) auto var(--side-width);
}
.text-editor__content-wrapper .text-editor__content-wrapper__left[data-v-364eab24],
.text-editor__content-wrapper .text-editor__content-wrapper__right[data-v-364eab24] {
  height: 100%;
  position: relative;
}`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/CollisionResolveDialog.vue?vue&type=style&index=0&id=5ffe7972&scoped=true&lang=scss":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/CollisionResolveDialog.vue?vue&type=style&index=0&id=5ffe7972&scoped=true&lang=scss ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ "./node_modules/css-loader/dist/runtime/noSourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `#resolve-conflicts[data-v-5ffe7972] {
  display: flex;
  width: 100%;
  margin: auto;
  padding: 20px 0;
}
#resolve-conflicts button[data-v-5ffe7972] {
  margin: auto;
}`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Editor.vue?vue&type=style&index=0&id=e18b6dc6&scoped=true&lang=scss":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Editor.vue?vue&type=style&index=0&id=e18b6dc6&scoped=true&lang=scss ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ "./node_modules/css-loader/dist/runtime/noSourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.modal-container .text-editor[data-v-e18b6dc6] {
  top: 0;
  height: calc(100vh - var(--header-height));
}
.text-editor[data-v-e18b6dc6] {
  display: block;
  width: 100%;
  max-width: 100%;
  height: 100%;
  left: 0;
  margin: 0 auto;
  position: relative;
  background-color: var(--color-main-background);
}
.text-editor .text-editor__wrapper.has-conflicts[data-v-e18b6dc6] {
  height: calc(100% - 50px);
}
#body-public[data-v-e18b6dc6] {
  height: auto;
}
#files-public-content .text-editor[data-v-e18b6dc6] {
  top: 0;
  width: 100%;
}
#files-public-content .text-editor .text-editor__main[data-v-e18b6dc6] {
  overflow: auto;
  z-index: 20;
}
#files-public-content .text-editor .has-conflicts .text-editor__main[data-v-e18b6dc6] {
  padding-top: 0;
}
.menubar-placeholder[data-v-e18b6dc6],
.text-editor--readonly-bar[data-v-e18b6dc6] {
  position: fixed;
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  opacity: 0;
  visibility: hidden;
  height: 44px;
  padding-top: 3px;
  padding-bottom: 3px;
}
.text-editor--readonly-bar[data-v-e18b6dc6],
.menubar-placeholder--with-slot[data-v-e18b6dc6] {
  opacity: unset;
  visibility: unset;
  z-index: 50;
  max-width: var(--text-editor-max-width);
  margin: auto;
  width: 100%;
  background-color: var(--color-main-background);
}`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Editor.vue?vue&type=style&index=1&id=e18b6dc6&lang=scss":
/*!*********************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Editor.vue?vue&type=style&index=1&id=e18b6dc6&lang=scss ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ "./node_modules/css-loader/dist/runtime/noSourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ../../img/checkbox-mark.svg */ "./img/checkbox-mark.svg"), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `:root {
  --text-editor-max-width: 670px ;
}
:root {
  --text-editor-max-width: 670px ;
}
.ProseMirror-hideselection {
  caret-color: transparent;
  color: var(--color-main-text);
}
.ProseMirror-hideselection *::selection {
  background: transparent;
  color: var(--color-main-text);
}
.ProseMirror-hideselection *::-moz-selection {
  background: transparent;
  color: var(--color-main-text);
}
.ProseMirror-selectednode {
  outline: 2px solid #8cf;
}

/* Make sure li selections wrap around markers */
li.ProseMirror-selectednode {
  outline: none;
}
li.ProseMirror-selectednode:after {
  content: "";
  position: absolute;
  left: -32px;
  right: -2px;
  top: -2px;
  bottom: -2px;
  border: 2px solid #8cf;
  pointer-events: none;
}
.has-conflicts .ProseMirror-menubar,
.text-editor__wrapper.icon-loading .ProseMirror-menubar {
  display: none;
}
.ProseMirror-gapcursor {
  display: none;
  pointer-events: none;
  position: absolute;
}
.ProseMirror-gapcursor:after {
  content: "";
  display: block;
  position: absolute;
  top: -2px;
  width: 20px;
  border-top: 1px solid var(--color-main-text);
  animation: ProseMirror-cursor-blink 1.1s steps(2, start) infinite;
}
@keyframes ProseMirror-cursor-blink {
to {
    visibility: hidden;
}
}
.animation-rotate {
  animation: rotate var(--animation-duration, 0.8s) linear infinite;
}
[data-handler=text] {
  background-color: var(--color-main-background);
  border-top: 3px solid var(--color-primary-element);
}
[data-handler=text] .modal-title {
  font-weight: bold;
}
@keyframes fadeInDown {
from {
    opacity: 0;
    transform: translate3d(0, -100%, 0);
}
to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
}
}
@keyframes fadeInLeft {
from {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
}
to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
}
}
.fadeInLeft {
  animation-name: fadeInLeft;
}
@media print {
@page {
    size: A4;
    margin: 2.5cm 2cm 2cm 2.5cm;
}
body {
    position: absolute;
    overflow: visible !important;
}
#header {
    display: none !important;
}
#content {
    display: block !important;
    position: relative !important;
    border-radius: 0;
    margin: 0;
    width: 100%;
    height: fit-content;
}
footer {
    display: none !important;
}
#viewer[data-handler=text] {
    border: none;
    width: 100% !important;
    position: absolute !important;
}
#viewer[data-handler=text] .modal-header {
    display: none !important;
}
#viewer[data-handler=text] .modal-container {
    top: 0px;
    height: fit-content;
}
.text-editor {
    height: fit-content !important;
}
.text-editor .text-menubar {
    display: none !important;
}
.text-editor .action-item {
    display: none !important;
}
.text-editor .editor__content {
    max-width: 100%;
}
.text-editor .text-editor__wrapper {
    height: fit-content;
    position: unset;
}
.text-editor .text-editor__wrapper div.ProseMirror {
    margin-top: 0;
    margin-bottom: 0;
    padding-top: 0;
    padding-bottom: 0;
}
.text-editor .text-editor__wrapper div.ProseMirror h1, .text-editor .text-editor__wrapper div.ProseMirror h2, .text-editor .text-editor__wrapper div.ProseMirror h3, .text-editor .text-editor__wrapper div.ProseMirror h4, .text-editor .text-editor__wrapper div.ProseMirror h5 {
    break-after: avoid;
    page-break-after: avoid;
}
.text-editor .text-editor__wrapper div.ProseMirror .image, .text-editor .text-editor__wrapper div.ProseMirror img, .text-editor .text-editor__wrapper div.ProseMirror table {
    break-inside: avoid-page;
    page-break-inside: avoid;
    max-width: 90% !important;
    margin: 5vw auto 5vw 5% !important;
}
.text-editor .text-editor__wrapper div.ProseMirror th {
    color: black !important;
    font-weight: bold !important;
    border-width: 0 1px 2px 0 !important;
    border-color: gray !important;
    border-style: none solid solid none !important;
}
.text-editor .text-editor__wrapper div.ProseMirror th:last-of-type {
    border-width: 0 0 2px 0 !important;
}
.text-editor .text-editor__wrapper div.ProseMirror td {
    border-style: none solid none none !important;
    border-width: 1px !important;
    border-color: gray !important;
}
.text-editor .text-editor__wrapper div.ProseMirror td:last-of-type {
    border: none !important;
}
.menubar-placeholder, .text-editor--readonly-bar {
    display: none;
}
.text-editor__content-wrapper.--show-outline {
    display: block;
}
.text-editor__content-wrapper .editor--outline {
    width: auto;
    height: auto;
    overflow: unset;
    position: relative;
}
.text-editor__content-wrapper .editor--outline__btn-close {
    display: none;
}
.collaboration-cursor__caret,
  .collaboration-cursor__label {
    display: none;
}
}
.text-editor__wrapper {
  /* Document rendering styles */
}
.text-editor__wrapper div.ProseMirror {
  height: 100%;
  position: relative;
  word-wrap: break-word;
  white-space: pre-wrap;
  -webkit-font-variant-ligatures: none;
  font-variant-ligatures: none;
  padding: 4px 8px 200px 14px;
  line-height: 150%;
  font-size: var(--default-font-size);
  outline: none;
  --table-color-border: var(--color-border);
  --table-color-heading: var(--color-text-maxcontrast);
  --table-color-heading-border: var(--color-border-dark);
  --table-color-background: var(--color-main-background);
  --table-color-background-hover: var(--color-primary-element-light);
  --table-border-radius: var(--border-radius);
}
.text-editor__wrapper div.ProseMirror :target {
  scroll-margin-top: 50px;
}
.text-editor__wrapper div.ProseMirror[contenteditable=true], .text-editor__wrapper div.ProseMirror[contenteditable=false],
.text-editor__wrapper div.ProseMirror [contenteditable=true],
.text-editor__wrapper div.ProseMirror [contenteditable=false] {
  width: 100%;
  background-color: transparent;
  color: var(--color-main-text);
  opacity: 1;
  -webkit-user-select: text;
  user-select: text;
  font-size: var(--default-font-size);
}
.text-editor__wrapper div.ProseMirror[contenteditable=true]:not(.collaboration-cursor__caret), .text-editor__wrapper div.ProseMirror[contenteditable=false]:not(.collaboration-cursor__caret),
.text-editor__wrapper div.ProseMirror [contenteditable=true]:not(.collaboration-cursor__caret),
.text-editor__wrapper div.ProseMirror [contenteditable=false]:not(.collaboration-cursor__caret) {
  border: none !important;
}
.text-editor__wrapper div.ProseMirror[contenteditable=true]:focus, .text-editor__wrapper div.ProseMirror[contenteditable=true]:focus-visible, .text-editor__wrapper div.ProseMirror[contenteditable=false]:focus, .text-editor__wrapper div.ProseMirror[contenteditable=false]:focus-visible,
.text-editor__wrapper div.ProseMirror [contenteditable=true]:focus,
.text-editor__wrapper div.ProseMirror [contenteditable=true]:focus-visible,
.text-editor__wrapper div.ProseMirror [contenteditable=false]:focus,
.text-editor__wrapper div.ProseMirror [contenteditable=false]:focus-visible {
  box-shadow: none !important;
}
.text-editor__wrapper div.ProseMirror ul[data-type=taskList] {
  margin-left: 1px;
}
.text-editor__wrapper div.ProseMirror .checkbox-item {
  display: flex;
  align-items: start;
}
.text-editor__wrapper div.ProseMirror .checkbox-item input[type=checkbox] {
  display: none;
}
.text-editor__wrapper div.ProseMirror .checkbox-item:before {
  content: "";
  vertical-align: middle;
  margin: 3px 6px 3px 2px;
  border: 1px solid var(--color-text-maxcontrast);
  display: block;
  border-radius: var(--border-radius);
  height: 14px;
  width: 14px;
  box-shadow: none !important;
  background-position: center;
  cursor: pointer;
  left: 9px;
}
.text-editor__wrapper div.ProseMirror .checkbox-item.checked:before {
  background-image: url(${___CSS_LOADER_URL_REPLACEMENT_0___});
  background-color: var(--color-primary-element);
  border-color: var(--color-primary-element);
}
.text-editor__wrapper div.ProseMirror .checkbox-item.checked > label > p {
  color: var(--color-text-maxcontrast);
  text-decoration: line-through;
}
.text-editor__wrapper div.ProseMirror .checkbox-item label {
  display: block;
  flex-grow: 1;
  max-width: calc(100% - 28px);
}
.text-editor__wrapper div.ProseMirror > *:first-child {
  margin-top: 10px;
}
.text-editor__wrapper div.ProseMirror > h1:first-child, .text-editor__wrapper div.ProseMirror h2:first-child, .text-editor__wrapper div.ProseMirror h3:first-child, .text-editor__wrapper div.ProseMirror h4:first-child, .text-editor__wrapper div.ProseMirror h5:first-child, .text-editor__wrapper div.ProseMirror h6:first-child {
  margin-top: 0;
}
.text-editor__wrapper div.ProseMirror a {
  color: var(--color-primary-element);
  text-decoration: underline;
  padding: 0.5em 0;
}
.text-editor__wrapper div.ProseMirror p .paragraph-content {
  margin-bottom: 1em;
  line-height: 150%;
}
.text-editor__wrapper div.ProseMirror em {
  font-style: italic;
}
.text-editor__wrapper div.ProseMirror h1,
.text-editor__wrapper div.ProseMirror h2,
.text-editor__wrapper div.ProseMirror h3,
.text-editor__wrapper div.ProseMirror h4,
.text-editor__wrapper div.ProseMirror h5,
.text-editor__wrapper div.ProseMirror h6 {
  font-weight: 600;
  line-height: 1.1em;
  margin-top: 24px;
  margin-bottom: 12px;
  color: var(--color-main-text);
}
.text-editor__wrapper div.ProseMirror h1 {
  font-size: 36px;
}
.text-editor__wrapper div.ProseMirror h2 {
  font-size: 30px;
}
.text-editor__wrapper div.ProseMirror h3 {
  font-size: 24px;
}
.text-editor__wrapper div.ProseMirror h4 {
  font-size: 21px;
}
.text-editor__wrapper div.ProseMirror h5 {
  font-size: 17px;
}
.text-editor__wrapper div.ProseMirror h6 {
  font-size: var(--default-font-size);
}
.text-editor__wrapper div.ProseMirror img {
  cursor: default;
  max-width: 100%;
}
.text-editor__wrapper div.ProseMirror hr {
  padding: 2px 0;
  border: none;
  margin: 2em 0;
  width: 100%;
}
.text-editor__wrapper div.ProseMirror hr:after {
  content: "";
  display: block;
  height: 1px;
  background-color: var(--color-border-dark);
  line-height: 2px;
}
.text-editor__wrapper div.ProseMirror pre {
  white-space: pre-wrap;
  background-color: var(--color-background-dark);
  border-radius: var(--border-radius);
  padding: 1em 1.3em;
  margin-bottom: 1em;
}
.text-editor__wrapper div.ProseMirror pre::before {
  content: attr(data-language);
  text-transform: uppercase;
  display: block;
  text-align: right;
  font-weight: bold;
  font-size: 0.6rem;
}
.text-editor__wrapper div.ProseMirror pre code .hljs-comment,
.text-editor__wrapper div.ProseMirror pre code .hljs-quote {
  color: #999999;
}
.text-editor__wrapper div.ProseMirror pre code .hljs-variable,
.text-editor__wrapper div.ProseMirror pre code .hljs-template-variable,
.text-editor__wrapper div.ProseMirror pre code .hljs-attribute,
.text-editor__wrapper div.ProseMirror pre code .hljs-tag,
.text-editor__wrapper div.ProseMirror pre code .hljs-name,
.text-editor__wrapper div.ProseMirror pre code .hljs-regexp,
.text-editor__wrapper div.ProseMirror pre code .hljs-link,
.text-editor__wrapper div.ProseMirror pre code .hljs-selector-id,
.text-editor__wrapper div.ProseMirror pre code .hljs-selector-class {
  color: #f2777a;
}
.text-editor__wrapper div.ProseMirror pre code .hljs-number,
.text-editor__wrapper div.ProseMirror pre code .hljs-meta,
.text-editor__wrapper div.ProseMirror pre code .hljs-built_in,
.text-editor__wrapper div.ProseMirror pre code .hljs-builtin-name,
.text-editor__wrapper div.ProseMirror pre code .hljs-literal,
.text-editor__wrapper div.ProseMirror pre code .hljs-type,
.text-editor__wrapper div.ProseMirror pre code .hljs-params {
  color: #f99157;
}
.text-editor__wrapper div.ProseMirror pre code .hljs-string,
.text-editor__wrapper div.ProseMirror pre code .hljs-symbol,
.text-editor__wrapper div.ProseMirror pre code .hljs-bullet {
  color: #99cc99;
}
.text-editor__wrapper div.ProseMirror pre code .hljs-title,
.text-editor__wrapper div.ProseMirror pre code .hljs-section {
  color: #ffcc66;
}
.text-editor__wrapper div.ProseMirror pre code .hljs-keyword,
.text-editor__wrapper div.ProseMirror pre code .hljs-selector-tag {
  color: #6699cc;
}
.text-editor__wrapper div.ProseMirror pre code .hljs-emphasis {
  font-style: italic;
}
.text-editor__wrapper div.ProseMirror pre code .hljs-strong {
  font-weight: 700;
}
.text-editor__wrapper div.ProseMirror pre.frontmatter {
  margin-bottom: 2em;
  border-left: 4px solid var(--color-primary-element);
}
.text-editor__wrapper div.ProseMirror pre.frontmatter::before {
  display: block;
  content: attr(data-title);
  color: var(--color-text-maxcontrast);
  padding-bottom: 0.5em;
}
.text-editor__wrapper div.ProseMirror p code {
  background-color: var(--color-background-dark);
  border-radius: var(--border-radius);
  padding: 0.1em 0.3em;
}
.text-editor__wrapper div.ProseMirror li {
  position: relative;
  padding-left: 3px;
}
.text-editor__wrapper div.ProseMirror li p .paragraph-content {
  margin-bottom: 0.5em;
}
.text-editor__wrapper div.ProseMirror ul, .text-editor__wrapper div.ProseMirror ol {
  padding-left: 10px;
  margin-left: 10px;
  margin-bottom: 1em;
}
.text-editor__wrapper div.ProseMirror ul > li {
  list-style-type: disc;
}
.text-editor__wrapper div.ProseMirror li ul > li {
  list-style-type: circle;
}
.text-editor__wrapper div.ProseMirror li li ul > li {
  list-style-type: square;
}
.text-editor__wrapper div.ProseMirror blockquote {
  padding-left: 1em;
  border-left: 4px solid var(--color-primary-element);
  color: var(--color-text-maxcontrast);
  margin-left: 0;
  margin-right: 0;
}
.text-editor__wrapper div.ProseMirror table {
  border-spacing: 0;
  width: calc(100% - 50px);
  table-layout: auto;
  white-space: normal;
  margin-bottom: 1em;
}
.text-editor__wrapper div.ProseMirror table + * {
  margin-top: 1em;
}
.text-editor__wrapper div.ProseMirror table td, .text-editor__wrapper div.ProseMirror table th {
  border: 1px solid var(--table-color-border);
  border-left: 0;
  vertical-align: top;
  max-width: 100%;
}
.text-editor__wrapper div.ProseMirror table td:first-child, .text-editor__wrapper div.ProseMirror table th:first-child {
  border-left: 1px solid var(--table-color-border);
}
.text-editor__wrapper div.ProseMirror table td {
  padding: 0.5em 0.75em;
  border-top: 0;
  color: var(--color-main-text);
}
.text-editor__wrapper div.ProseMirror table th {
  padding: 0 0 0 0.75em;
  font-weight: normal;
  border-bottom-color: var(--table-color-heading-border);
  color: var(--table-color-heading);
}
.text-editor__wrapper div.ProseMirror table th > div {
  display: flex;
}
.text-editor__wrapper div.ProseMirror table tr {
  background-color: var(--table-color-background);
}
.text-editor__wrapper div.ProseMirror table tr:hover, .text-editor__wrapper div.ProseMirror table tr:active, .text-editor__wrapper div.ProseMirror table tr:focus {
  background-color: var(--table-color-background-hover);
}
.text-editor__wrapper div.ProseMirror table tr:first-child th:first-child {
  border-top-left-radius: var(--table-border-radius);
}
.text-editor__wrapper div.ProseMirror table tr:first-child th:last-child {
  border-top-right-radius: var(--table-border-radius);
}
.text-editor__wrapper div.ProseMirror table tr:last-child td:first-child {
  border-bottom-left-radius: var(--table-border-radius);
}
.text-editor__wrapper div.ProseMirror table tr:last-child td:last-child {
  border-bottom-right-radius: var(--table-border-radius);
}
.text-editor__wrapper .ProseMirror-focused .ProseMirror-gapcursor {
  display: block;
}
.text-editor__wrapper .editor__content p.is-empty:first-child::before {
  content: attr(data-placeholder);
  float: left;
  color: var(--color-text-maxcontrast);
  pointer-events: none;
  height: 0;
}
.text-editor__wrapper .editor__content {
  tab-size: 4;
}
.text-editor__wrapper .tippy-content div {
  visibility: visible !important;
}
.text-editor__wrapper .text-editor__main.draggedOver {
  background-color: var(--color-primary-element-light);
}
.text-editor__wrapper .text-editor__main .text-editor__content-wrapper {
  position: relative;
}
.text-editor__wrapper.has-conflicts > .editor {
  width: 50%;
}
.text-editor__wrapper.has-conflicts > .content-wrapper {
  width: 50%;
}
.text-editor__wrapper.has-conflicts > .content-wrapper #read-only-editor {
  margin: 0px auto;
  padding-top: 50px;
  overflow: initial;
}
@keyframes spin {
0% {
    transform: rotate(0deg);
}
100% {
    transform: rotate(360deg);
}
}
/* Give a remote user a caret */
.collaboration-cursor__caret {
  position: relative;
  margin-left: -1px;
  margin-right: -1px;
  border-left: 1px solid #0D0D0D;
  border-right: 1px solid #0D0D0D;
  word-break: normal;
  pointer-events: none;
}

/* Render the username above the caret */
.collaboration-cursor__label {
  position: absolute;
  top: -1.4em;
  left: -1px;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  user-select: none;
  color: #0D0D0D;
  padding: 0.1rem 0.3rem;
  border-radius: 3px 3px 3px 0;
  white-space: nowrap;
  opacity: 0;
}
.collaboration-cursor__label.collaboration-cursor__label__active {
  opacity: 1;
}
.collaboration-cursor__label:not(.collaboration-cursor__label__active) {
  transition: opacity 0.2s 5s;
}`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Editor/ContentContainer.vue?vue&type=style&index=0&id=e4c6ecec&scoped=true&lang=scss":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Editor/ContentContainer.vue?vue&type=style&index=0&id=e4c6ecec&scoped=true&lang=scss ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ "./node_modules/css-loader/dist/runtime/noSourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.editor__content[data-v-e4c6ecec] {
  max-width: min(var(--text-editor-max-width), 100vw - 16px);
  margin: auto;
  position: relative;
  width: 100%;
}
.ie .editor__content[data-v-e4c6ecec] .ProseMirror {
  padding-top: 50px;
}
.text-editor__content-wrapper[data-v-e4c6ecec] {
  --side-width: calc((100% - var(--text-editor-max-width)) / 2);
  display: grid;
  grid-template-columns: 1fr auto;
}
.text-editor__content-wrapper.--show-outline[data-v-e4c6ecec] {
  grid-template-columns: var(--side-width) auto var(--side-width);
}
.text-editor__content-wrapper .text-editor__content-wrapper__left[data-v-e4c6ecec],
.text-editor__content-wrapper .text-editor__content-wrapper__right[data-v-e4c6ecec] {
  height: 100%;
  position: relative;
}
.is-rich-workspace .text-editor__content-wrapper[data-v-e4c6ecec] {
  --side-width: var(--text-editor-max-width);
  grid-template-columns: var(--side-width) auto;
}
.is-rich-workspace .text-editor__content-wrapper .text-editor__content-wrapper__left[data-v-e4c6ecec],
.is-rich-workspace .text-editor__content-wrapper .text-editor__content-wrapper__right[data-v-e4c6ecec] {
  display: none;
}`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Editor/DocumentStatus.vue?vue&type=style&index=0&id=5f451e6f&scoped=true&lang=scss":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Editor/DocumentStatus.vue?vue&type=style&index=0&id=5f451e6f&scoped=true&lang=scss ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ "./node_modules/css-loader/dist/runtime/noSourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.document-status[data-v-5f451e6f] {
  position: sticky;
  top: 16px;
  z-index: 100000;
  max-width: var(--text-editor-max-width);
  margin: auto;
  background-color: var(--color-main-background);
}`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Editor/MainContainer.vue?vue&type=style&index=0&id=745ee2b6&scoped=true&lang=scss":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Editor/MainContainer.vue?vue&type=style&index=0&id=745ee2b6&scoped=true&lang=scss ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ "./node_modules/css-loader/dist/runtime/noSourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.text-editor__main[data-v-745ee2b6], .editor[data-v-745ee2b6] {
  background: var(--color-main-background);
  color: var(--color-main-text);
  background-clip: padding-box;
  border-radius: var(--border-radius);
  padding: 0;
  position: relative;
  width: 100%;
}`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Editor/Status.vue?vue&type=style&index=0&id=7749e0f4&scoped=true&lang=scss":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Editor/Status.vue?vue&type=style&index=0&id=7749e0f4&scoped=true&lang=scss ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ "./node_modules/css-loader/dist/runtime/noSourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.text-editor__session-list[data-v-7749e0f4] {
  display: flex;
}
.text-editor__session-list input[data-v-7749e0f4], .text-editor__session-list div[data-v-7749e0f4] {
  vertical-align: middle;
  margin-left: 3px;
}
.save-status[data-v-7749e0f4] {
  border-radius: 50%;
  color: var(--color-text-lighter);
  display: inline-flex;
  justify-content: center;
  padding: 0;
  height: 44px;
  width: 44px;
}
.save-status[data-v-7749e0f4]:hover {
  background-color: var(--color-background-hover);
}
.last-saved[data-v-7749e0f4] {
  padding: 6px;
}`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Editor/Wrapper.vue?vue&type=style&index=0&id=20a7fb81&scoped=true&lang=scss":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Editor/Wrapper.vue?vue&type=style&index=0&id=20a7fb81&scoped=true&lang=scss ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ "./node_modules/css-loader/dist/runtime/noSourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.text-editor__wrapper[data-v-20a7fb81] {
  display: flex;
  width: 100%;
  height: 100%;
}
.text-editor__wrapper.show-color-annotations[data-v-20a7fb81] .author-annotation {
  padding-top: 2px;
  padding-bottom: 2px;
}
.text-editor__wrapper[data-v-20a7fb81]:not(.show-color-annotations) .author-annotation, .text-editor__wrapper[data-v-20a7fb81]:not(.show-color-annotations) .image {
  background-color: transparent !important;
}
.text-editor__wrapper .ProseMirror[data-v-20a7fb81] {
  margin-top: 0 !important;
}`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/HelpModal.vue?vue&type=style&index=0&id=6befbdec&lang=scss&scoped=true":
/*!************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/HelpModal.vue?vue&type=style&index=0&id=6befbdec&lang=scss&scoped=true ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ "./node_modules/css-loader/dist/runtime/noSourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ../../img/checkbox-mark.svg */ "./img/checkbox-mark.svg"), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `table[data-v-6befbdec] {
  margin-top: 24px;
  border-collapse: collapse;
}
table tbody tr[data-v-6befbdec]:hover, table tbody tr[data-v-6befbdec]:focus, table tbody tr[data-v-6befbdec]:active {
  background-color: transparent !important;
}
table thead tr[data-v-6befbdec] {
  border: none;
}
table th[data-v-6befbdec] {
  font-weight: bold;
  padding: 0.75rem 1rem 0.75rem 0;
  border-bottom: 2px solid var(--color-background-darker);
}
table td[data-v-6befbdec] {
  padding: 0.75rem 1rem 0.75rem 0;
  border-top: 1px solid var(--color-background-dark);
  border-bottom: unset;
}
table td.noborder[data-v-6befbdec] {
  border-top: unset;
}
table td.ellipsis_top[data-v-6befbdec] {
  padding-bottom: 0;
}
table td.ellipsis[data-v-6befbdec] {
  padding-top: 0;
  padding-bottom: 0;
}
table td.ellipsis_bottom[data-v-6befbdec] {
  padding-top: 0;
}
table kbd[data-v-6befbdec] {
  font-size: smaller;
}
table code[data-v-6befbdec] {
  padding: 0.2em 0.4em;
  font-size: 90%;
  background-color: var(--color-background-dark);
  border-radius: 6px;
}

/* Document rendering styles */
div.ProseMirror[data-v-6befbdec] {
  height: 100%;
  position: relative;
  word-wrap: break-word;
  white-space: pre-wrap;
  -webkit-font-variant-ligatures: none;
  font-variant-ligatures: none;
  padding: 4px 8px 200px 14px;
  line-height: 150%;
  font-size: var(--default-font-size);
  outline: none;
  --table-color-border: var(--color-border);
  --table-color-heading: var(--color-text-maxcontrast);
  --table-color-heading-border: var(--color-border-dark);
  --table-color-background: var(--color-main-background);
  --table-color-background-hover: var(--color-primary-element-light);
  --table-border-radius: var(--border-radius);
}
div.ProseMirror[data-v-6befbdec] :target {
  scroll-margin-top: 50px;
}
div.ProseMirror[contenteditable=true][data-v-6befbdec], div.ProseMirror[contenteditable=false][data-v-6befbdec],
div.ProseMirror [contenteditable=true][data-v-6befbdec],
div.ProseMirror [contenteditable=false][data-v-6befbdec] {
  width: 100%;
  background-color: transparent;
  color: var(--color-main-text);
  opacity: 1;
  -webkit-user-select: text;
  user-select: text;
  font-size: var(--default-font-size);
}
div.ProseMirror[contenteditable=true][data-v-6befbdec]:not(.collaboration-cursor__caret), div.ProseMirror[contenteditable=false][data-v-6befbdec]:not(.collaboration-cursor__caret),
div.ProseMirror [contenteditable=true][data-v-6befbdec]:not(.collaboration-cursor__caret),
div.ProseMirror [contenteditable=false][data-v-6befbdec]:not(.collaboration-cursor__caret) {
  border: none !important;
}
div.ProseMirror[contenteditable=true][data-v-6befbdec]:focus, div.ProseMirror[contenteditable=true][data-v-6befbdec]:focus-visible, div.ProseMirror[contenteditable=false][data-v-6befbdec]:focus, div.ProseMirror[contenteditable=false][data-v-6befbdec]:focus-visible,
div.ProseMirror [contenteditable=true][data-v-6befbdec]:focus,
div.ProseMirror [contenteditable=true][data-v-6befbdec]:focus-visible,
div.ProseMirror [contenteditable=false][data-v-6befbdec]:focus,
div.ProseMirror [contenteditable=false][data-v-6befbdec]:focus-visible {
  box-shadow: none !important;
}
div.ProseMirror ul[data-type=taskList][data-v-6befbdec] {
  margin-left: 1px;
}
div.ProseMirror .checkbox-item[data-v-6befbdec] {
  display: flex;
  align-items: start;
}
div.ProseMirror .checkbox-item input[type=checkbox][data-v-6befbdec] {
  display: none;
}
div.ProseMirror .checkbox-item[data-v-6befbdec]:before {
  content: "";
  vertical-align: middle;
  margin: 3px 6px 3px 2px;
  border: 1px solid var(--color-text-maxcontrast);
  display: block;
  border-radius: var(--border-radius);
  height: 14px;
  width: 14px;
  box-shadow: none !important;
  background-position: center;
  cursor: pointer;
  left: 9px;
}
div.ProseMirror .checkbox-item.checked[data-v-6befbdec]:before {
  background-image: url(${___CSS_LOADER_URL_REPLACEMENT_0___});
  background-color: var(--color-primary-element);
  border-color: var(--color-primary-element);
}
div.ProseMirror .checkbox-item.checked > label > p[data-v-6befbdec] {
  color: var(--color-text-maxcontrast);
  text-decoration: line-through;
}
div.ProseMirror .checkbox-item label[data-v-6befbdec] {
  display: block;
  flex-grow: 1;
  max-width: calc(100% - 28px);
}
div.ProseMirror > *[data-v-6befbdec]:first-child {
  margin-top: 10px;
}
div.ProseMirror > h1[data-v-6befbdec]:first-child, div.ProseMirror h2[data-v-6befbdec]:first-child, div.ProseMirror h3[data-v-6befbdec]:first-child, div.ProseMirror h4[data-v-6befbdec]:first-child, div.ProseMirror h5[data-v-6befbdec]:first-child, div.ProseMirror h6[data-v-6befbdec]:first-child {
  margin-top: 0;
}
div.ProseMirror a[data-v-6befbdec] {
  color: var(--color-primary-element);
  text-decoration: underline;
  padding: 0.5em 0;
}
div.ProseMirror p .paragraph-content[data-v-6befbdec] {
  margin-bottom: 1em;
  line-height: 150%;
}
div.ProseMirror em[data-v-6befbdec] {
  font-style: italic;
}
div.ProseMirror h1[data-v-6befbdec],
div.ProseMirror h2[data-v-6befbdec],
div.ProseMirror h3[data-v-6befbdec],
div.ProseMirror h4[data-v-6befbdec],
div.ProseMirror h5[data-v-6befbdec],
div.ProseMirror h6[data-v-6befbdec] {
  font-weight: 600;
  line-height: 1.1em;
  margin-top: 24px;
  margin-bottom: 12px;
  color: var(--color-main-text);
}
div.ProseMirror h1[data-v-6befbdec] {
  font-size: 36px;
}
div.ProseMirror h2[data-v-6befbdec] {
  font-size: 30px;
}
div.ProseMirror h3[data-v-6befbdec] {
  font-size: 24px;
}
div.ProseMirror h4[data-v-6befbdec] {
  font-size: 21px;
}
div.ProseMirror h5[data-v-6befbdec] {
  font-size: 17px;
}
div.ProseMirror h6[data-v-6befbdec] {
  font-size: var(--default-font-size);
}
div.ProseMirror img[data-v-6befbdec] {
  cursor: default;
  max-width: 100%;
}
div.ProseMirror hr[data-v-6befbdec] {
  padding: 2px 0;
  border: none;
  margin: 2em 0;
  width: 100%;
}
div.ProseMirror hr[data-v-6befbdec]:after {
  content: "";
  display: block;
  height: 1px;
  background-color: var(--color-border-dark);
  line-height: 2px;
}
div.ProseMirror pre[data-v-6befbdec] {
  white-space: pre-wrap;
  background-color: var(--color-background-dark);
  border-radius: var(--border-radius);
  padding: 1em 1.3em;
  margin-bottom: 1em;
}
div.ProseMirror pre[data-v-6befbdec]::before {
  content: attr(data-language);
  text-transform: uppercase;
  display: block;
  text-align: right;
  font-weight: bold;
  font-size: 0.6rem;
}
div.ProseMirror pre code .hljs-comment[data-v-6befbdec],
div.ProseMirror pre code .hljs-quote[data-v-6befbdec] {
  color: #999999;
}
div.ProseMirror pre code .hljs-variable[data-v-6befbdec],
div.ProseMirror pre code .hljs-template-variable[data-v-6befbdec],
div.ProseMirror pre code .hljs-attribute[data-v-6befbdec],
div.ProseMirror pre code .hljs-tag[data-v-6befbdec],
div.ProseMirror pre code .hljs-name[data-v-6befbdec],
div.ProseMirror pre code .hljs-regexp[data-v-6befbdec],
div.ProseMirror pre code .hljs-link[data-v-6befbdec],
div.ProseMirror pre code .hljs-selector-id[data-v-6befbdec],
div.ProseMirror pre code .hljs-selector-class[data-v-6befbdec] {
  color: #f2777a;
}
div.ProseMirror pre code .hljs-number[data-v-6befbdec],
div.ProseMirror pre code .hljs-meta[data-v-6befbdec],
div.ProseMirror pre code .hljs-built_in[data-v-6befbdec],
div.ProseMirror pre code .hljs-builtin-name[data-v-6befbdec],
div.ProseMirror pre code .hljs-literal[data-v-6befbdec],
div.ProseMirror pre code .hljs-type[data-v-6befbdec],
div.ProseMirror pre code .hljs-params[data-v-6befbdec] {
  color: #f99157;
}
div.ProseMirror pre code .hljs-string[data-v-6befbdec],
div.ProseMirror pre code .hljs-symbol[data-v-6befbdec],
div.ProseMirror pre code .hljs-bullet[data-v-6befbdec] {
  color: #99cc99;
}
div.ProseMirror pre code .hljs-title[data-v-6befbdec],
div.ProseMirror pre code .hljs-section[data-v-6befbdec] {
  color: #ffcc66;
}
div.ProseMirror pre code .hljs-keyword[data-v-6befbdec],
div.ProseMirror pre code .hljs-selector-tag[data-v-6befbdec] {
  color: #6699cc;
}
div.ProseMirror pre code .hljs-emphasis[data-v-6befbdec] {
  font-style: italic;
}
div.ProseMirror pre code .hljs-strong[data-v-6befbdec] {
  font-weight: 700;
}
div.ProseMirror pre.frontmatter[data-v-6befbdec] {
  margin-bottom: 2em;
  border-left: 4px solid var(--color-primary-element);
}
div.ProseMirror pre.frontmatter[data-v-6befbdec]::before {
  display: block;
  content: attr(data-title);
  color: var(--color-text-maxcontrast);
  padding-bottom: 0.5em;
}
div.ProseMirror p code[data-v-6befbdec] {
  background-color: var(--color-background-dark);
  border-radius: var(--border-radius);
  padding: 0.1em 0.3em;
}
div.ProseMirror li[data-v-6befbdec] {
  position: relative;
  padding-left: 3px;
}
div.ProseMirror li p .paragraph-content[data-v-6befbdec] {
  margin-bottom: 0.5em;
}
div.ProseMirror ul[data-v-6befbdec], div.ProseMirror ol[data-v-6befbdec] {
  padding-left: 10px;
  margin-left: 10px;
  margin-bottom: 1em;
}
div.ProseMirror ul > li[data-v-6befbdec] {
  list-style-type: disc;
}
div.ProseMirror li ul > li[data-v-6befbdec] {
  list-style-type: circle;
}
div.ProseMirror li li ul > li[data-v-6befbdec] {
  list-style-type: square;
}
div.ProseMirror blockquote[data-v-6befbdec] {
  padding-left: 1em;
  border-left: 4px solid var(--color-primary-element);
  color: var(--color-text-maxcontrast);
  margin-left: 0;
  margin-right: 0;
}
div.ProseMirror table[data-v-6befbdec] {
  border-spacing: 0;
  width: calc(100% - 50px);
  table-layout: auto;
  white-space: normal;
  margin-bottom: 1em;
}
div.ProseMirror table + *[data-v-6befbdec] {
  margin-top: 1em;
}
div.ProseMirror table td[data-v-6befbdec], div.ProseMirror table th[data-v-6befbdec] {
  border: 1px solid var(--table-color-border);
  border-left: 0;
  vertical-align: top;
  max-width: 100%;
}
div.ProseMirror table td[data-v-6befbdec]:first-child, div.ProseMirror table th[data-v-6befbdec]:first-child {
  border-left: 1px solid var(--table-color-border);
}
div.ProseMirror table td[data-v-6befbdec] {
  padding: 0.5em 0.75em;
  border-top: 0;
  color: var(--color-main-text);
}
div.ProseMirror table th[data-v-6befbdec] {
  padding: 0 0 0 0.75em;
  font-weight: normal;
  border-bottom-color: var(--table-color-heading-border);
  color: var(--table-color-heading);
}
div.ProseMirror table th > div[data-v-6befbdec] {
  display: flex;
}
div.ProseMirror table tr[data-v-6befbdec] {
  background-color: var(--table-color-background);
}
div.ProseMirror table tr[data-v-6befbdec]:hover, div.ProseMirror table tr[data-v-6befbdec]:active, div.ProseMirror table tr[data-v-6befbdec]:focus {
  background-color: var(--table-color-background-hover);
}
div.ProseMirror table tr:first-child th[data-v-6befbdec]:first-child {
  border-top-left-radius: var(--table-border-radius);
}
div.ProseMirror table tr:first-child th[data-v-6befbdec]:last-child {
  border-top-right-radius: var(--table-border-radius);
}
div.ProseMirror table tr:last-child td[data-v-6befbdec]:first-child {
  border-bottom-left-radius: var(--table-border-radius);
}
div.ProseMirror table tr:last-child td[data-v-6befbdec]:last-child {
  border-bottom-right-radius: var(--table-border-radius);
}
.ProseMirror-focused .ProseMirror-gapcursor[data-v-6befbdec] {
  display: block;
}
.editor__content p.is-empty[data-v-6befbdec]:first-child::before {
  content: attr(data-placeholder);
  float: left;
  color: var(--color-text-maxcontrast);
  pointer-events: none;
  height: 0;
}
.editor__content[data-v-6befbdec] {
  tab-size: 4;
}
.tippy-content div[data-v-6befbdec] {
  visibility: visible !important;
}
div.ProseMirror[data-v-6befbdec] {
  display: inline;
  margin-top: unset;
  position: unset;
  padding: unset;
  line-height: unset;
}
div.ProseMirror h1[data-v-6befbdec], div.ProseMirror h6[data-v-6befbdec] {
  display: inline;
  padding: 0;
  margin: 0;
}`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Menu/MenuBar.vue?vue&type=style&index=0&id=10e748d8&scoped=true&lang=scss":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Menu/MenuBar.vue?vue&type=style&index=0&id=10e748d8&scoped=true&lang=scss ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ "./node_modules/css-loader/dist/runtime/noSourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.text-menubar[data-v-10e748d8] {
  --background-blur: blur(10px);
  position: sticky;
  top: 0;
  z-index: 10021;
  background-color: var(--color-main-background-translucent);
  backdrop-filter: var(--background-blur);
  max-height: 44px;
  padding-top: 3px;
  padding-bottom: 3px;
  visibility: hidden;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.text-menubar.text-menubar--ready[data-v-10e748d8]:not(.text-menubar--hide) {
  visibility: visible;
  animation-name: fadeInDown;
  animation-duration: 0.3s;
}
.text-menubar.text-menubar--hide[data-v-10e748d8] {
  opacity: 0;
  transition: visibility 0.2s 0.4s, opacity 0.2s 0.4s;
}
.text-menubar .text-menubar__entries[data-v-10e748d8] {
  display: flex;
  flex-grow: 1;
  margin-left: max(0px, (100% - var(--text-editor-max-width)) / 2);
}
.text-menubar .text-menubar__slot[data-v-10e748d8] {
  justify-content: flex-end;
  display: flex;
  min-width: max(0px, min(100px, (100% - var(--text-editor-max-width)) / 2));
}
.text-menubar.text-menubar--is-workspace .text-menubar__entries[data-v-10e748d8] {
  margin-left: 0;
}
@media (max-width: 660px) {
.text-menubar .text-menubar__entries[data-v-10e748d8] {
    margin-left: 0;
}
}`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Modal/Translate.vue?vue&type=style&index=0&id=7563604c&lang=scss&scoped=true":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Modal/Translate.vue?vue&type=style&index=0&id=7563604c&lang=scss&scoped=true ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ "./node_modules/css-loader/dist/runtime/noSourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.translate-dialog[data-v-7563604c] {
  margin: 24px;
}
.translate-dialog .wrapper[data-v-7563604c] {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-column-gap: 16px;
  margin-top: calc(var(--default-grid-baseline) * 6);
}
.translate-dialog .wrapper .language-selector[data-v-7563604c] {
  font-weight: bold;
  flex-wrap: wrap;
  gap: var(--default-grid-baseline);
}
.translate-dialog .wrapper .col[data-v-7563604c] {
  grid-row: 1/2;
}
.translate-dialog[data-v-7563604c] .translate-textarea {
  display: block;
  width: 100%;
  margin-bottom: 12px;
  height: auto;
  resize: none;
  box-sizing: border-box;
  overflow-y: auto;
  max-height: 58vh;
}
@media (max-width: 670px) {
.translate-dialog .wrapper[data-v-7563604c] {
    display: block;
}
.translate-dialog .language-selector .select[data-v-7563604c] {
    width: 100%;
}
.translate-dialog[data-v-7563604c] .translate-textarea {
    max-height: 20vh;
}
label[for=fromLanguage][data-v-7563604c], label[for=toLanguage][data-v-7563604c] {
    display: none;
}
}
.language-selector[data-v-7563604c] {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}
.language-selector label[data-v-7563604c] {
  flex-grow: 1;
}
.translate-actions[data-v-7563604c] {
  display: flex;
  justify-content: flex-end;
}
.translate-actions button[data-v-7563604c] {
  margin-left: 12px;
}`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Reader.vue?vue&type=style&index=0&id=2688351a&lang=scss":
/*!*********************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Reader.vue?vue&type=style&index=0&id=2688351a&lang=scss ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ "./node_modules/css-loader/dist/runtime/noSourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `#read-only-editor {
  overflow: scroll;
}
.thumbnailContainer #read-only-editor {
  width: 100%;
}
.thumbnailContainer #read-only-editor .ProseMirror {
  height: auto;
  margin: 0 0 0 0;
  padding: 0;
}`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/RichTextReader.vue?vue&type=style&index=0&id=f1ccc308&lang=scss":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/RichTextReader.vue?vue&type=style&index=0&id=f1ccc308&lang=scss ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ "./node_modules/css-loader/dist/runtime/noSourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ../../img/checkbox-mark.svg */ "./img/checkbox-mark.svg"), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/* Document rendering styles */
div.ProseMirror {
  height: 100%;
  position: relative;
  word-wrap: break-word;
  white-space: pre-wrap;
  -webkit-font-variant-ligatures: none;
  font-variant-ligatures: none;
  padding: 4px 8px 200px 14px;
  line-height: 150%;
  font-size: var(--default-font-size);
  outline: none;
  --table-color-border: var(--color-border);
  --table-color-heading: var(--color-text-maxcontrast);
  --table-color-heading-border: var(--color-border-dark);
  --table-color-background: var(--color-main-background);
  --table-color-background-hover: var(--color-primary-element-light);
  --table-border-radius: var(--border-radius);
}
div.ProseMirror :target {
  scroll-margin-top: 50px;
}
div.ProseMirror[contenteditable=true], div.ProseMirror[contenteditable=false],
div.ProseMirror [contenteditable=true],
div.ProseMirror [contenteditable=false] {
  width: 100%;
  background-color: transparent;
  color: var(--color-main-text);
  opacity: 1;
  -webkit-user-select: text;
  user-select: text;
  font-size: var(--default-font-size);
}
div.ProseMirror[contenteditable=true]:not(.collaboration-cursor__caret), div.ProseMirror[contenteditable=false]:not(.collaboration-cursor__caret),
div.ProseMirror [contenteditable=true]:not(.collaboration-cursor__caret),
div.ProseMirror [contenteditable=false]:not(.collaboration-cursor__caret) {
  border: none !important;
}
div.ProseMirror[contenteditable=true]:focus, div.ProseMirror[contenteditable=true]:focus-visible, div.ProseMirror[contenteditable=false]:focus, div.ProseMirror[contenteditable=false]:focus-visible,
div.ProseMirror [contenteditable=true]:focus,
div.ProseMirror [contenteditable=true]:focus-visible,
div.ProseMirror [contenteditable=false]:focus,
div.ProseMirror [contenteditable=false]:focus-visible {
  box-shadow: none !important;
}
div.ProseMirror ul[data-type=taskList] {
  margin-left: 1px;
}
div.ProseMirror .checkbox-item {
  display: flex;
  align-items: start;
}
div.ProseMirror .checkbox-item input[type=checkbox] {
  display: none;
}
div.ProseMirror .checkbox-item:before {
  content: "";
  vertical-align: middle;
  margin: 3px 6px 3px 2px;
  border: 1px solid var(--color-text-maxcontrast);
  display: block;
  border-radius: var(--border-radius);
  height: 14px;
  width: 14px;
  box-shadow: none !important;
  background-position: center;
  cursor: pointer;
  left: 9px;
}
div.ProseMirror .checkbox-item.checked:before {
  background-image: url(${___CSS_LOADER_URL_REPLACEMENT_0___});
  background-color: var(--color-primary-element);
  border-color: var(--color-primary-element);
}
div.ProseMirror .checkbox-item.checked > label > p {
  color: var(--color-text-maxcontrast);
  text-decoration: line-through;
}
div.ProseMirror .checkbox-item label {
  display: block;
  flex-grow: 1;
  max-width: calc(100% - 28px);
}
div.ProseMirror > *:first-child {
  margin-top: 10px;
}
div.ProseMirror > h1:first-child, div.ProseMirror h2:first-child, div.ProseMirror h3:first-child, div.ProseMirror h4:first-child, div.ProseMirror h5:first-child, div.ProseMirror h6:first-child {
  margin-top: 0;
}
div.ProseMirror a {
  color: var(--color-primary-element);
  text-decoration: underline;
  padding: 0.5em 0;
}
div.ProseMirror p .paragraph-content {
  margin-bottom: 1em;
  line-height: 150%;
}
div.ProseMirror em {
  font-style: italic;
}
div.ProseMirror h1,
div.ProseMirror h2,
div.ProseMirror h3,
div.ProseMirror h4,
div.ProseMirror h5,
div.ProseMirror h6 {
  font-weight: 600;
  line-height: 1.1em;
  margin-top: 24px;
  margin-bottom: 12px;
  color: var(--color-main-text);
}
div.ProseMirror h1 {
  font-size: 36px;
}
div.ProseMirror h2 {
  font-size: 30px;
}
div.ProseMirror h3 {
  font-size: 24px;
}
div.ProseMirror h4 {
  font-size: 21px;
}
div.ProseMirror h5 {
  font-size: 17px;
}
div.ProseMirror h6 {
  font-size: var(--default-font-size);
}
div.ProseMirror img {
  cursor: default;
  max-width: 100%;
}
div.ProseMirror hr {
  padding: 2px 0;
  border: none;
  margin: 2em 0;
  width: 100%;
}
div.ProseMirror hr:after {
  content: "";
  display: block;
  height: 1px;
  background-color: var(--color-border-dark);
  line-height: 2px;
}
div.ProseMirror pre {
  white-space: pre-wrap;
  background-color: var(--color-background-dark);
  border-radius: var(--border-radius);
  padding: 1em 1.3em;
  margin-bottom: 1em;
}
div.ProseMirror pre::before {
  content: attr(data-language);
  text-transform: uppercase;
  display: block;
  text-align: right;
  font-weight: bold;
  font-size: 0.6rem;
}
div.ProseMirror pre code .hljs-comment,
div.ProseMirror pre code .hljs-quote {
  color: #999999;
}
div.ProseMirror pre code .hljs-variable,
div.ProseMirror pre code .hljs-template-variable,
div.ProseMirror pre code .hljs-attribute,
div.ProseMirror pre code .hljs-tag,
div.ProseMirror pre code .hljs-name,
div.ProseMirror pre code .hljs-regexp,
div.ProseMirror pre code .hljs-link,
div.ProseMirror pre code .hljs-selector-id,
div.ProseMirror pre code .hljs-selector-class {
  color: #f2777a;
}
div.ProseMirror pre code .hljs-number,
div.ProseMirror pre code .hljs-meta,
div.ProseMirror pre code .hljs-built_in,
div.ProseMirror pre code .hljs-builtin-name,
div.ProseMirror pre code .hljs-literal,
div.ProseMirror pre code .hljs-type,
div.ProseMirror pre code .hljs-params {
  color: #f99157;
}
div.ProseMirror pre code .hljs-string,
div.ProseMirror pre code .hljs-symbol,
div.ProseMirror pre code .hljs-bullet {
  color: #99cc99;
}
div.ProseMirror pre code .hljs-title,
div.ProseMirror pre code .hljs-section {
  color: #ffcc66;
}
div.ProseMirror pre code .hljs-keyword,
div.ProseMirror pre code .hljs-selector-tag {
  color: #6699cc;
}
div.ProseMirror pre code .hljs-emphasis {
  font-style: italic;
}
div.ProseMirror pre code .hljs-strong {
  font-weight: 700;
}
div.ProseMirror pre.frontmatter {
  margin-bottom: 2em;
  border-left: 4px solid var(--color-primary-element);
}
div.ProseMirror pre.frontmatter::before {
  display: block;
  content: attr(data-title);
  color: var(--color-text-maxcontrast);
  padding-bottom: 0.5em;
}
div.ProseMirror p code {
  background-color: var(--color-background-dark);
  border-radius: var(--border-radius);
  padding: 0.1em 0.3em;
}
div.ProseMirror li {
  position: relative;
  padding-left: 3px;
}
div.ProseMirror li p .paragraph-content {
  margin-bottom: 0.5em;
}
div.ProseMirror ul, div.ProseMirror ol {
  padding-left: 10px;
  margin-left: 10px;
  margin-bottom: 1em;
}
div.ProseMirror ul > li {
  list-style-type: disc;
}
div.ProseMirror li ul > li {
  list-style-type: circle;
}
div.ProseMirror li li ul > li {
  list-style-type: square;
}
div.ProseMirror blockquote {
  padding-left: 1em;
  border-left: 4px solid var(--color-primary-element);
  color: var(--color-text-maxcontrast);
  margin-left: 0;
  margin-right: 0;
}
div.ProseMirror table {
  border-spacing: 0;
  width: calc(100% - 50px);
  table-layout: auto;
  white-space: normal;
  margin-bottom: 1em;
}
div.ProseMirror table + * {
  margin-top: 1em;
}
div.ProseMirror table td, div.ProseMirror table th {
  border: 1px solid var(--table-color-border);
  border-left: 0;
  vertical-align: top;
  max-width: 100%;
}
div.ProseMirror table td:first-child, div.ProseMirror table th:first-child {
  border-left: 1px solid var(--table-color-border);
}
div.ProseMirror table td {
  padding: 0.5em 0.75em;
  border-top: 0;
  color: var(--color-main-text);
}
div.ProseMirror table th {
  padding: 0 0 0 0.75em;
  font-weight: normal;
  border-bottom-color: var(--table-color-heading-border);
  color: var(--table-color-heading);
}
div.ProseMirror table th > div {
  display: flex;
}
div.ProseMirror table tr {
  background-color: var(--table-color-background);
}
div.ProseMirror table tr:hover, div.ProseMirror table tr:active, div.ProseMirror table tr:focus {
  background-color: var(--table-color-background-hover);
}
div.ProseMirror table tr:first-child th:first-child {
  border-top-left-radius: var(--table-border-radius);
}
div.ProseMirror table tr:first-child th:last-child {
  border-top-right-radius: var(--table-border-radius);
}
div.ProseMirror table tr:last-child td:first-child {
  border-bottom-left-radius: var(--table-border-radius);
}
div.ProseMirror table tr:last-child td:last-child {
  border-bottom-right-radius: var(--table-border-radius);
}
.ProseMirror-focused .ProseMirror-gapcursor {
  display: block;
}
.editor__content p.is-empty:first-child::before {
  content: attr(data-placeholder);
  float: left;
  color: var(--color-text-maxcontrast);
  pointer-events: none;
  height: 0;
}
.editor__content {
  tab-size: 4;
}
.tippy-content div {
  visibility: visible !important;
}
@media print {
@page {
    size: A4;
    margin: 2.5cm 2cm 2cm 2.5cm;
}
body {
    position: absolute;
    overflow: visible !important;
}
#header {
    display: none !important;
}
#content {
    display: block !important;
    position: relative !important;
    border-radius: 0;
    margin: 0;
    width: 100%;
    height: fit-content;
}
footer {
    display: none !important;
}
#viewer[data-handler=text] {
    border: none;
    width: 100% !important;
    position: absolute !important;
}
#viewer[data-handler=text] .modal-header {
    display: none !important;
}
#viewer[data-handler=text] .modal-container {
    top: 0px;
    height: fit-content;
}
.text-editor {
    height: fit-content !important;
}
.text-editor .text-menubar {
    display: none !important;
}
.text-editor .action-item {
    display: none !important;
}
.text-editor .editor__content {
    max-width: 100%;
}
.text-editor .text-editor__wrapper {
    height: fit-content;
    position: unset;
}
.text-editor .text-editor__wrapper div.ProseMirror {
    margin-top: 0;
    margin-bottom: 0;
    padding-top: 0;
    padding-bottom: 0;
}
.text-editor .text-editor__wrapper div.ProseMirror h1, .text-editor .text-editor__wrapper div.ProseMirror h2, .text-editor .text-editor__wrapper div.ProseMirror h3, .text-editor .text-editor__wrapper div.ProseMirror h4, .text-editor .text-editor__wrapper div.ProseMirror h5 {
    break-after: avoid;
    page-break-after: avoid;
}
.text-editor .text-editor__wrapper div.ProseMirror .image, .text-editor .text-editor__wrapper div.ProseMirror img, .text-editor .text-editor__wrapper div.ProseMirror table {
    break-inside: avoid-page;
    page-break-inside: avoid;
    max-width: 90% !important;
    margin: 5vw auto 5vw 5% !important;
}
.text-editor .text-editor__wrapper div.ProseMirror th {
    color: black !important;
    font-weight: bold !important;
    border-width: 0 1px 2px 0 !important;
    border-color: gray !important;
    border-style: none solid solid none !important;
}
.text-editor .text-editor__wrapper div.ProseMirror th:last-of-type {
    border-width: 0 0 2px 0 !important;
}
.text-editor .text-editor__wrapper div.ProseMirror td {
    border-style: none solid none none !important;
    border-width: 1px !important;
    border-color: gray !important;
}
.text-editor .text-editor__wrapper div.ProseMirror td:last-of-type {
    border: none !important;
}
.menubar-placeholder, .text-editor--readonly-bar {
    display: none;
}
.text-editor__content-wrapper.--show-outline {
    display: block;
}
.text-editor__content-wrapper .editor--outline {
    width: auto;
    height: auto;
    overflow: unset;
    position: relative;
}
.text-editor__content-wrapper .editor--outline__btn-close {
    display: none;
}
.collaboration-cursor__caret,
  .collaboration-cursor__label {
    display: none;
}
}`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/SkeletonLoading.vue?vue&type=style&index=0&id=5a999aaf&lang=scss&scoped=true":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/SkeletonLoading.vue?vue&type=style&index=0&id=5a999aaf&lang=scss&scoped=true ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ "./node_modules/css-loader/dist/runtime/noSourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.placeholder-main[data-v-5a999aaf] {
  max-width: 670px;
  position: relative;
  margin-bottom: auto;
  z-index: 1;
}
.placeholder-main-text[data-v-5a999aaf] {
  margin: 50px auto 0;
  width: 100%;
}
#rich-workspace .placeholder-main-text[data-v-5a999aaf] {
  margin: 40px 0 0;
}
.placeholder-list[data-v-5a999aaf] {
  position: absolute;
  transform: translateZ(0);
}
.placeholder-list-regular[data-v-5a999aaf] {
  animation: pulse-5a999aaf 2s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}
.placeholder-list-reverse[data-v-5a999aaf] {
  animation: pulse-reverse-5a999aaf 2s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}
.placeholder-gradient[data-v-5a999aaf] {
  position: fixed;
  height: 0;
  width: 0;
  z-index: -1;
}
.text-placeholder[data-v-5a999aaf] {
  width: min(670px, 100vw);
  height: 6em;
  margin: 8px auto;
  padding: 4px 8px 0 14px;
  display: block;
}
.text-placeholder-line-one[data-v-5a999aaf], .text-placeholder-line-two[data-v-5a999aaf], .text-placeholder-line-three[data-v-5a999aaf], .text-placeholder-line-four[data-v-5a999aaf] {
  width: 670px;
  height: 1em;
}
.text-placeholder-line-one[data-v-5a999aaf] {
  y: 0.33em;
  width: 175px;
}
.text-placeholder-line-two[data-v-5a999aaf] {
  y: 1.66em;
}
.text-placeholder-line-three[data-v-5a999aaf] {
  y: 3em;
}
.text-placeholder-line-four[data-v-5a999aaf] {
  y: 4.33em;
}
@keyframes pulse-5a999aaf {
0% {
    opacity: 1;
}
50% {
    opacity: 0;
}
100% {
    opacity: 1;
}
}
@keyframes pulse-reverse-5a999aaf {
0% {
    opacity: 0;
}
50% {
    opacity: 1;
}
100% {
    opacity: 0;
}
}`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Suggestion/Mention/AutoCompleteResult.vue?vue&type=style&index=0&id=44fd7335&lang=scss&scoped=true":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Suggestion/Mention/AutoCompleteResult.vue?vue&type=style&index=0&id=44fd7335&lang=scss&scoped=true ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ "./node_modules/css-loader/dist/runtime/noSourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ../../../assets/status-icons/user-status-online.svg */ "./src/assets/status-icons/user-status-online.svg"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_1___ = new URL(/* asset import */ __webpack_require__(/*! ../../../assets/status-icons/user-status-dnd.svg */ "./src/assets/status-icons/user-status-dnd.svg"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_2___ = new URL(/* asset import */ __webpack_require__(/*! ../../../assets/status-icons/user-status-away.svg */ "./src/assets/status-icons/user-status-away.svg"), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
var ___CSS_LOADER_URL_REPLACEMENT_1___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_1___);
var ___CSS_LOADER_URL_REPLACEMENT_2___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_2___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.autocomplete-result[data-v-44fd7335] {
  display: flex;
  height: 30px;
  padding: 10px;
}
.highlight .autocomplete-result[data-v-44fd7335] {
  color: var(--color-main-text);
  background: var(--color-primary-element-light);
}
.highlight .autocomplete-result[data-v-44fd7335], .highlight .autocomplete-result *[data-v-44fd7335] {
  cursor: pointer;
}
.autocomplete-result__icon[data-v-44fd7335] {
  position: relative;
  flex: 0 0 30px;
  width: 30px;
  min-width: 30px;
  height: 30px;
  border-radius: 30px;
  background-color: var(--color-background-darker);
  background-repeat: no-repeat;
  background-position: center;
  background-size: 10px;
}
.autocomplete-result__icon--with-avatar[data-v-44fd7335] {
  color: inherit;
  background-size: cover;
}
.autocomplete-result__status[data-v-44fd7335] {
  position: absolute;
  right: -4px;
  bottom: -4px;
  box-sizing: border-box;
  width: 18px;
  height: 18px;
  border: 2px solid var(--color-main-background);
  border-radius: 50%;
  background-color: var(--color-main-background);
  font-size: var(--default-font-size);
  line-height: 15px;
  background-repeat: no-repeat;
  background-size: 16px;
  background-position: center;
}
.autocomplete-result__status--online[data-v-44fd7335] {
  background-image: url(${___CSS_LOADER_URL_REPLACEMENT_0___});
}
.autocomplete-result__status--dnd[data-v-44fd7335] {
  background-image: url(${___CSS_LOADER_URL_REPLACEMENT_1___});
  background-color: #ffffff;
}
.autocomplete-result__status--away[data-v-44fd7335] {
  background-image: url(${___CSS_LOADER_URL_REPLACEMENT_2___});
}
.autocomplete-result__status--icon[data-v-44fd7335] {
  border: none;
  background-color: transparent;
}
.autocomplete-result__content[data-v-44fd7335] {
  display: flex;
  flex: 1 1 100%;
  flex-direction: column;
  justify-content: center;
  min-width: 0;
  padding-left: 10px;
}
.autocomplete-result__title[data-v-44fd7335], .autocomplete-result__subline[data-v-44fd7335] {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.autocomplete-result__subline[data-v-44fd7335] {
  color: var(--color-text-lighter);
}`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Suggestion/Mention/MentionList.vue?vue&type=style&index=0&id=57ffd330&lang=scss":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Suggestion/Mention/MentionList.vue?vue&type=style&index=0&id=57ffd330&lang=scss ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ "./node_modules/css-loader/dist/runtime/noSourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.items {
  position: relative;
  border-radius: var(--border-radius);
  background: var(--color-main-background);
  overflow: hidden;
  font-size: 0.9rem;
  box-shadow: 0 1px 5px var(--color-box-shadow);
  min-width: 250px;
}
.item-empty {
  padding: 4px 8px;
  opacity: 0.8;
}`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/views/DirectEditing.vue?vue&type=style&index=0&id=37e36225&lang=scss":
/*!***********************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/views/DirectEditing.vue?vue&type=style&index=0&id=37e36225&lang=scss ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ "./node_modules/css-loader/dist/runtime/noSourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `body {
  position: fixed;
  background-color: var(--color-main-background);
}
#content[class=app-public] {
  margin: 0;
  margin-top: 0;
}`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/views/DirectEditing.vue?vue&type=style&index=1&id=37e36225&scoped=true&lang=scss":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/views/DirectEditing.vue?vue&type=style&index=1&id=37e36225&scoped=true&lang=scss ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ "./node_modules/css-loader/dist/runtime/noSourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `#direct-editor[data-v-37e36225] {
  width: 100%;
  height: 100%;
  position: fixed;
  overflow: auto;
}
#direct-editor[data-v-37e36225] .text-editor {
  height: 100%;
  top: 0;
}
#direct-editor[data-v-37e36225] .text-editor__wrapper div.ProseMirror {
  margin-top: 0;
}
pre[data-v-37e36225] {
  width: 100%;
  max-width: 700px;
  margin: auto;
  background-color: var(--color-background-dark);
}
button[data-v-37e36225] {
  width: 44px;
  height: 44px;
  margin: 0;
  background-size: 16px;
  border: 0;
  background-color: transparent;
  opacity: 0.5;
  color: var(--color-main-text);
  background-position: center center;
  vertical-align: top;
}
button[data-v-37e36225]:hover, button[data-v-37e36225]:focus, button[data-v-37e36225]:active {
  background-color: var(--color-background-dark);
}
button.is-active[data-v-37e36225], button[data-v-37e36225]:hover, button[data-v-37e36225]:focus {
  opacity: 1;
}`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Menu/ReadonlyBar.vue?vue&type=style&index=0&id=2716d951&scoped=true&lang=css":
/*!***************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Menu/ReadonlyBar.vue?vue&type=style&index=0&id=2716d951&scoped=true&lang=css ***!
  \***************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ "./node_modules/css-loader/dist/runtime/noSourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `
.text-readonly-bar[data-v-2716d951] {
	display: flex;
}
.text-readonly-bar__entries[data-v-2716d951] {
	display: flex;
	flex-grow: 1;
}
`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/highlight.js/lib/languages lazy recursive ^\\.\\/.*$":
/*!****************************************************************************************************************!*\
  !*** ./node_modules/highlight.js/lib/languages/ lazy ^\.\/.*$ chunkName: highlight/[request] namespace object ***!
  \****************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./1c": [
		"./node_modules/highlight.js/lib/languages/1c.js",
		"highlight/1c"
	],
	"./1c.js": [
		"./node_modules/highlight.js/lib/languages/1c.js",
		"highlight/1c"
	],
	"./1c.js.js": [
		"./node_modules/highlight.js/lib/languages/1c.js.js",
		"highlight/1c-js-js"
	],
	"./abnf": [
		"./node_modules/highlight.js/lib/languages/abnf.js",
		"highlight/abnf"
	],
	"./abnf.js": [
		"./node_modules/highlight.js/lib/languages/abnf.js",
		"highlight/abnf"
	],
	"./abnf.js.js": [
		"./node_modules/highlight.js/lib/languages/abnf.js.js",
		"highlight/abnf-js-js"
	],
	"./accesslog": [
		"./node_modules/highlight.js/lib/languages/accesslog.js",
		"highlight/accesslog"
	],
	"./accesslog.js": [
		"./node_modules/highlight.js/lib/languages/accesslog.js",
		"highlight/accesslog"
	],
	"./accesslog.js.js": [
		"./node_modules/highlight.js/lib/languages/accesslog.js.js",
		"highlight/accesslog-js-js"
	],
	"./actionscript": [
		"./node_modules/highlight.js/lib/languages/actionscript.js",
		"highlight/actionscript"
	],
	"./actionscript.js": [
		"./node_modules/highlight.js/lib/languages/actionscript.js",
		"highlight/actionscript"
	],
	"./actionscript.js.js": [
		"./node_modules/highlight.js/lib/languages/actionscript.js.js",
		"highlight/actionscript-js-js"
	],
	"./ada": [
		"./node_modules/highlight.js/lib/languages/ada.js",
		"highlight/ada"
	],
	"./ada.js": [
		"./node_modules/highlight.js/lib/languages/ada.js",
		"highlight/ada"
	],
	"./ada.js.js": [
		"./node_modules/highlight.js/lib/languages/ada.js.js",
		"highlight/ada-js-js"
	],
	"./angelscript": [
		"./node_modules/highlight.js/lib/languages/angelscript.js",
		"highlight/angelscript"
	],
	"./angelscript.js": [
		"./node_modules/highlight.js/lib/languages/angelscript.js",
		"highlight/angelscript"
	],
	"./angelscript.js.js": [
		"./node_modules/highlight.js/lib/languages/angelscript.js.js",
		"highlight/angelscript-js-js"
	],
	"./apache": [
		"./node_modules/highlight.js/lib/languages/apache.js",
		"highlight/apache"
	],
	"./apache.js": [
		"./node_modules/highlight.js/lib/languages/apache.js",
		"highlight/apache"
	],
	"./apache.js.js": [
		"./node_modules/highlight.js/lib/languages/apache.js.js",
		"highlight/apache-js-js"
	],
	"./applescript": [
		"./node_modules/highlight.js/lib/languages/applescript.js",
		"highlight/applescript"
	],
	"./applescript.js": [
		"./node_modules/highlight.js/lib/languages/applescript.js",
		"highlight/applescript"
	],
	"./applescript.js.js": [
		"./node_modules/highlight.js/lib/languages/applescript.js.js",
		"highlight/applescript-js-js"
	],
	"./arcade": [
		"./node_modules/highlight.js/lib/languages/arcade.js",
		"highlight/arcade"
	],
	"./arcade.js": [
		"./node_modules/highlight.js/lib/languages/arcade.js",
		"highlight/arcade"
	],
	"./arcade.js.js": [
		"./node_modules/highlight.js/lib/languages/arcade.js.js",
		"highlight/arcade-js-js"
	],
	"./arduino": [
		"./node_modules/highlight.js/lib/languages/arduino.js",
		"highlight/arduino"
	],
	"./arduino.js": [
		"./node_modules/highlight.js/lib/languages/arduino.js",
		"highlight/arduino"
	],
	"./arduino.js.js": [
		"./node_modules/highlight.js/lib/languages/arduino.js.js",
		"highlight/arduino-js-js"
	],
	"./armasm": [
		"./node_modules/highlight.js/lib/languages/armasm.js",
		"highlight/armasm"
	],
	"./armasm.js": [
		"./node_modules/highlight.js/lib/languages/armasm.js",
		"highlight/armasm"
	],
	"./armasm.js.js": [
		"./node_modules/highlight.js/lib/languages/armasm.js.js",
		"highlight/armasm-js-js"
	],
	"./asciidoc": [
		"./node_modules/highlight.js/lib/languages/asciidoc.js",
		"highlight/asciidoc"
	],
	"./asciidoc.js": [
		"./node_modules/highlight.js/lib/languages/asciidoc.js",
		"highlight/asciidoc"
	],
	"./asciidoc.js.js": [
		"./node_modules/highlight.js/lib/languages/asciidoc.js.js",
		"highlight/asciidoc-js-js"
	],
	"./aspectj": [
		"./node_modules/highlight.js/lib/languages/aspectj.js",
		"highlight/aspectj"
	],
	"./aspectj.js": [
		"./node_modules/highlight.js/lib/languages/aspectj.js",
		"highlight/aspectj"
	],
	"./aspectj.js.js": [
		"./node_modules/highlight.js/lib/languages/aspectj.js.js",
		"highlight/aspectj-js-js"
	],
	"./autohotkey": [
		"./node_modules/highlight.js/lib/languages/autohotkey.js",
		"highlight/autohotkey"
	],
	"./autohotkey.js": [
		"./node_modules/highlight.js/lib/languages/autohotkey.js",
		"highlight/autohotkey"
	],
	"./autohotkey.js.js": [
		"./node_modules/highlight.js/lib/languages/autohotkey.js.js",
		"highlight/autohotkey-js-js"
	],
	"./autoit": [
		"./node_modules/highlight.js/lib/languages/autoit.js",
		"highlight/autoit"
	],
	"./autoit.js": [
		"./node_modules/highlight.js/lib/languages/autoit.js",
		"highlight/autoit"
	],
	"./autoit.js.js": [
		"./node_modules/highlight.js/lib/languages/autoit.js.js",
		"highlight/autoit-js-js"
	],
	"./avrasm": [
		"./node_modules/highlight.js/lib/languages/avrasm.js",
		"highlight/avrasm"
	],
	"./avrasm.js": [
		"./node_modules/highlight.js/lib/languages/avrasm.js",
		"highlight/avrasm"
	],
	"./avrasm.js.js": [
		"./node_modules/highlight.js/lib/languages/avrasm.js.js",
		"highlight/avrasm-js-js"
	],
	"./awk": [
		"./node_modules/highlight.js/lib/languages/awk.js",
		"highlight/awk"
	],
	"./awk.js": [
		"./node_modules/highlight.js/lib/languages/awk.js",
		"highlight/awk"
	],
	"./awk.js.js": [
		"./node_modules/highlight.js/lib/languages/awk.js.js",
		"highlight/awk-js-js"
	],
	"./axapta": [
		"./node_modules/highlight.js/lib/languages/axapta.js",
		"highlight/axapta"
	],
	"./axapta.js": [
		"./node_modules/highlight.js/lib/languages/axapta.js",
		"highlight/axapta"
	],
	"./axapta.js.js": [
		"./node_modules/highlight.js/lib/languages/axapta.js.js",
		"highlight/axapta-js-js"
	],
	"./bash": [
		"./node_modules/highlight.js/lib/languages/bash.js",
		"highlight/bash"
	],
	"./bash.js": [
		"./node_modules/highlight.js/lib/languages/bash.js",
		"highlight/bash"
	],
	"./bash.js.js": [
		"./node_modules/highlight.js/lib/languages/bash.js.js",
		"highlight/bash-js-js"
	],
	"./basic": [
		"./node_modules/highlight.js/lib/languages/basic.js",
		"highlight/basic"
	],
	"./basic.js": [
		"./node_modules/highlight.js/lib/languages/basic.js",
		"highlight/basic"
	],
	"./basic.js.js": [
		"./node_modules/highlight.js/lib/languages/basic.js.js",
		"highlight/basic-js-js"
	],
	"./bnf": [
		"./node_modules/highlight.js/lib/languages/bnf.js",
		"highlight/bnf"
	],
	"./bnf.js": [
		"./node_modules/highlight.js/lib/languages/bnf.js",
		"highlight/bnf"
	],
	"./bnf.js.js": [
		"./node_modules/highlight.js/lib/languages/bnf.js.js",
		"highlight/bnf-js-js"
	],
	"./brainfuck": [
		"./node_modules/highlight.js/lib/languages/brainfuck.js",
		"highlight/brainfuck"
	],
	"./brainfuck.js": [
		"./node_modules/highlight.js/lib/languages/brainfuck.js",
		"highlight/brainfuck"
	],
	"./brainfuck.js.js": [
		"./node_modules/highlight.js/lib/languages/brainfuck.js.js",
		"highlight/brainfuck-js-js"
	],
	"./c": [
		"./node_modules/highlight.js/lib/languages/c.js",
		"highlight/c"
	],
	"./c.js": [
		"./node_modules/highlight.js/lib/languages/c.js",
		"highlight/c"
	],
	"./c.js.js": [
		"./node_modules/highlight.js/lib/languages/c.js.js",
		"highlight/c-js-js"
	],
	"./cal": [
		"./node_modules/highlight.js/lib/languages/cal.js",
		"highlight/cal"
	],
	"./cal.js": [
		"./node_modules/highlight.js/lib/languages/cal.js",
		"highlight/cal"
	],
	"./cal.js.js": [
		"./node_modules/highlight.js/lib/languages/cal.js.js",
		"highlight/cal-js-js"
	],
	"./capnproto": [
		"./node_modules/highlight.js/lib/languages/capnproto.js",
		"highlight/capnproto"
	],
	"./capnproto.js": [
		"./node_modules/highlight.js/lib/languages/capnproto.js",
		"highlight/capnproto"
	],
	"./capnproto.js.js": [
		"./node_modules/highlight.js/lib/languages/capnproto.js.js",
		"highlight/capnproto-js-js"
	],
	"./ceylon": [
		"./node_modules/highlight.js/lib/languages/ceylon.js",
		"highlight/ceylon"
	],
	"./ceylon.js": [
		"./node_modules/highlight.js/lib/languages/ceylon.js",
		"highlight/ceylon"
	],
	"./ceylon.js.js": [
		"./node_modules/highlight.js/lib/languages/ceylon.js.js",
		"highlight/ceylon-js-js"
	],
	"./clean": [
		"./node_modules/highlight.js/lib/languages/clean.js",
		"highlight/clean"
	],
	"./clean.js": [
		"./node_modules/highlight.js/lib/languages/clean.js",
		"highlight/clean"
	],
	"./clean.js.js": [
		"./node_modules/highlight.js/lib/languages/clean.js.js",
		"highlight/clean-js-js"
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
	"./clojure-repl.js.js": [
		"./node_modules/highlight.js/lib/languages/clojure-repl.js.js",
		"highlight/clojure-repl-js-js"
	],
	"./clojure.js": [
		"./node_modules/highlight.js/lib/languages/clojure.js",
		"highlight/clojure"
	],
	"./clojure.js.js": [
		"./node_modules/highlight.js/lib/languages/clojure.js.js",
		"highlight/clojure-js-js"
	],
	"./cmake": [
		"./node_modules/highlight.js/lib/languages/cmake.js",
		"highlight/cmake"
	],
	"./cmake.js": [
		"./node_modules/highlight.js/lib/languages/cmake.js",
		"highlight/cmake"
	],
	"./cmake.js.js": [
		"./node_modules/highlight.js/lib/languages/cmake.js.js",
		"highlight/cmake-js-js"
	],
	"./coffeescript": [
		"./node_modules/highlight.js/lib/languages/coffeescript.js",
		"highlight/coffeescript"
	],
	"./coffeescript.js": [
		"./node_modules/highlight.js/lib/languages/coffeescript.js",
		"highlight/coffeescript"
	],
	"./coffeescript.js.js": [
		"./node_modules/highlight.js/lib/languages/coffeescript.js.js",
		"highlight/coffeescript-js-js"
	],
	"./coq": [
		"./node_modules/highlight.js/lib/languages/coq.js",
		"highlight/coq"
	],
	"./coq.js": [
		"./node_modules/highlight.js/lib/languages/coq.js",
		"highlight/coq"
	],
	"./coq.js.js": [
		"./node_modules/highlight.js/lib/languages/coq.js.js",
		"highlight/coq-js-js"
	],
	"./cos": [
		"./node_modules/highlight.js/lib/languages/cos.js",
		"highlight/cos"
	],
	"./cos.js": [
		"./node_modules/highlight.js/lib/languages/cos.js",
		"highlight/cos"
	],
	"./cos.js.js": [
		"./node_modules/highlight.js/lib/languages/cos.js.js",
		"highlight/cos-js-js"
	],
	"./cpp": [
		"./node_modules/highlight.js/lib/languages/cpp.js",
		"highlight/cpp"
	],
	"./cpp.js": [
		"./node_modules/highlight.js/lib/languages/cpp.js",
		"highlight/cpp"
	],
	"./cpp.js.js": [
		"./node_modules/highlight.js/lib/languages/cpp.js.js",
		"highlight/cpp-js-js"
	],
	"./crmsh": [
		"./node_modules/highlight.js/lib/languages/crmsh.js",
		"highlight/crmsh"
	],
	"./crmsh.js": [
		"./node_modules/highlight.js/lib/languages/crmsh.js",
		"highlight/crmsh"
	],
	"./crmsh.js.js": [
		"./node_modules/highlight.js/lib/languages/crmsh.js.js",
		"highlight/crmsh-js-js"
	],
	"./crystal": [
		"./node_modules/highlight.js/lib/languages/crystal.js",
		"highlight/crystal"
	],
	"./crystal.js": [
		"./node_modules/highlight.js/lib/languages/crystal.js",
		"highlight/crystal"
	],
	"./crystal.js.js": [
		"./node_modules/highlight.js/lib/languages/crystal.js.js",
		"highlight/crystal-js-js"
	],
	"./csharp": [
		"./node_modules/highlight.js/lib/languages/csharp.js",
		"highlight/csharp"
	],
	"./csharp.js": [
		"./node_modules/highlight.js/lib/languages/csharp.js",
		"highlight/csharp"
	],
	"./csharp.js.js": [
		"./node_modules/highlight.js/lib/languages/csharp.js.js",
		"highlight/csharp-js-js"
	],
	"./csp": [
		"./node_modules/highlight.js/lib/languages/csp.js",
		"highlight/csp"
	],
	"./csp.js": [
		"./node_modules/highlight.js/lib/languages/csp.js",
		"highlight/csp"
	],
	"./csp.js.js": [
		"./node_modules/highlight.js/lib/languages/csp.js.js",
		"highlight/csp-js-js"
	],
	"./css": [
		"./node_modules/highlight.js/lib/languages/css.js",
		"highlight/css"
	],
	"./css.js": [
		"./node_modules/highlight.js/lib/languages/css.js",
		"highlight/css"
	],
	"./css.js.js": [
		"./node_modules/highlight.js/lib/languages/css.js.js",
		"highlight/css-js-js"
	],
	"./d": [
		"./node_modules/highlight.js/lib/languages/d.js",
		"highlight/d"
	],
	"./d.js": [
		"./node_modules/highlight.js/lib/languages/d.js",
		"highlight/d"
	],
	"./d.js.js": [
		"./node_modules/highlight.js/lib/languages/d.js.js",
		"highlight/d-js-js"
	],
	"./dart": [
		"./node_modules/highlight.js/lib/languages/dart.js",
		"highlight/dart"
	],
	"./dart.js": [
		"./node_modules/highlight.js/lib/languages/dart.js",
		"highlight/dart"
	],
	"./dart.js.js": [
		"./node_modules/highlight.js/lib/languages/dart.js.js",
		"highlight/dart-js-js"
	],
	"./delphi": [
		"./node_modules/highlight.js/lib/languages/delphi.js",
		"highlight/delphi"
	],
	"./delphi.js": [
		"./node_modules/highlight.js/lib/languages/delphi.js",
		"highlight/delphi"
	],
	"./delphi.js.js": [
		"./node_modules/highlight.js/lib/languages/delphi.js.js",
		"highlight/delphi-js-js"
	],
	"./diff": [
		"./node_modules/highlight.js/lib/languages/diff.js",
		"highlight/diff"
	],
	"./diff.js": [
		"./node_modules/highlight.js/lib/languages/diff.js",
		"highlight/diff"
	],
	"./diff.js.js": [
		"./node_modules/highlight.js/lib/languages/diff.js.js",
		"highlight/diff-js-js"
	],
	"./django": [
		"./node_modules/highlight.js/lib/languages/django.js",
		"highlight/django"
	],
	"./django.js": [
		"./node_modules/highlight.js/lib/languages/django.js",
		"highlight/django"
	],
	"./django.js.js": [
		"./node_modules/highlight.js/lib/languages/django.js.js",
		"highlight/django-js-js"
	],
	"./dns": [
		"./node_modules/highlight.js/lib/languages/dns.js",
		"highlight/dns"
	],
	"./dns.js": [
		"./node_modules/highlight.js/lib/languages/dns.js",
		"highlight/dns"
	],
	"./dns.js.js": [
		"./node_modules/highlight.js/lib/languages/dns.js.js",
		"highlight/dns-js-js"
	],
	"./dockerfile": [
		"./node_modules/highlight.js/lib/languages/dockerfile.js",
		"highlight/dockerfile"
	],
	"./dockerfile.js": [
		"./node_modules/highlight.js/lib/languages/dockerfile.js",
		"highlight/dockerfile"
	],
	"./dockerfile.js.js": [
		"./node_modules/highlight.js/lib/languages/dockerfile.js.js",
		"highlight/dockerfile-js-js"
	],
	"./dos": [
		"./node_modules/highlight.js/lib/languages/dos.js",
		"highlight/dos"
	],
	"./dos.js": [
		"./node_modules/highlight.js/lib/languages/dos.js",
		"highlight/dos"
	],
	"./dos.js.js": [
		"./node_modules/highlight.js/lib/languages/dos.js.js",
		"highlight/dos-js-js"
	],
	"./dsconfig": [
		"./node_modules/highlight.js/lib/languages/dsconfig.js",
		"highlight/dsconfig"
	],
	"./dsconfig.js": [
		"./node_modules/highlight.js/lib/languages/dsconfig.js",
		"highlight/dsconfig"
	],
	"./dsconfig.js.js": [
		"./node_modules/highlight.js/lib/languages/dsconfig.js.js",
		"highlight/dsconfig-js-js"
	],
	"./dts": [
		"./node_modules/highlight.js/lib/languages/dts.js",
		"highlight/dts"
	],
	"./dts.js": [
		"./node_modules/highlight.js/lib/languages/dts.js",
		"highlight/dts"
	],
	"./dts.js.js": [
		"./node_modules/highlight.js/lib/languages/dts.js.js",
		"highlight/dts-js-js"
	],
	"./dust": [
		"./node_modules/highlight.js/lib/languages/dust.js",
		"highlight/dust"
	],
	"./dust.js": [
		"./node_modules/highlight.js/lib/languages/dust.js",
		"highlight/dust"
	],
	"./dust.js.js": [
		"./node_modules/highlight.js/lib/languages/dust.js.js",
		"highlight/dust-js-js"
	],
	"./ebnf": [
		"./node_modules/highlight.js/lib/languages/ebnf.js",
		"highlight/ebnf"
	],
	"./ebnf.js": [
		"./node_modules/highlight.js/lib/languages/ebnf.js",
		"highlight/ebnf"
	],
	"./ebnf.js.js": [
		"./node_modules/highlight.js/lib/languages/ebnf.js.js",
		"highlight/ebnf-js-js"
	],
	"./elixir": [
		"./node_modules/highlight.js/lib/languages/elixir.js",
		"highlight/elixir"
	],
	"./elixir.js": [
		"./node_modules/highlight.js/lib/languages/elixir.js",
		"highlight/elixir"
	],
	"./elixir.js.js": [
		"./node_modules/highlight.js/lib/languages/elixir.js.js",
		"highlight/elixir-js-js"
	],
	"./elm": [
		"./node_modules/highlight.js/lib/languages/elm.js",
		"highlight/elm"
	],
	"./elm.js": [
		"./node_modules/highlight.js/lib/languages/elm.js",
		"highlight/elm"
	],
	"./elm.js.js": [
		"./node_modules/highlight.js/lib/languages/elm.js.js",
		"highlight/elm-js-js"
	],
	"./erb": [
		"./node_modules/highlight.js/lib/languages/erb.js",
		"highlight/erb"
	],
	"./erb.js": [
		"./node_modules/highlight.js/lib/languages/erb.js",
		"highlight/erb"
	],
	"./erb.js.js": [
		"./node_modules/highlight.js/lib/languages/erb.js.js",
		"highlight/erb-js-js"
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
	"./erlang-repl.js.js": [
		"./node_modules/highlight.js/lib/languages/erlang-repl.js.js",
		"highlight/erlang-repl-js-js"
	],
	"./erlang.js": [
		"./node_modules/highlight.js/lib/languages/erlang.js",
		"highlight/erlang"
	],
	"./erlang.js.js": [
		"./node_modules/highlight.js/lib/languages/erlang.js.js",
		"highlight/erlang-js-js"
	],
	"./excel": [
		"./node_modules/highlight.js/lib/languages/excel.js",
		"highlight/excel"
	],
	"./excel.js": [
		"./node_modules/highlight.js/lib/languages/excel.js",
		"highlight/excel"
	],
	"./excel.js.js": [
		"./node_modules/highlight.js/lib/languages/excel.js.js",
		"highlight/excel-js-js"
	],
	"./fix": [
		"./node_modules/highlight.js/lib/languages/fix.js",
		"highlight/fix"
	],
	"./fix.js": [
		"./node_modules/highlight.js/lib/languages/fix.js",
		"highlight/fix"
	],
	"./fix.js.js": [
		"./node_modules/highlight.js/lib/languages/fix.js.js",
		"highlight/fix-js-js"
	],
	"./flix": [
		"./node_modules/highlight.js/lib/languages/flix.js",
		"highlight/flix"
	],
	"./flix.js": [
		"./node_modules/highlight.js/lib/languages/flix.js",
		"highlight/flix"
	],
	"./flix.js.js": [
		"./node_modules/highlight.js/lib/languages/flix.js.js",
		"highlight/flix-js-js"
	],
	"./fortran": [
		"./node_modules/highlight.js/lib/languages/fortran.js",
		"highlight/fortran"
	],
	"./fortran.js": [
		"./node_modules/highlight.js/lib/languages/fortran.js",
		"highlight/fortran"
	],
	"./fortran.js.js": [
		"./node_modules/highlight.js/lib/languages/fortran.js.js",
		"highlight/fortran-js-js"
	],
	"./fsharp": [
		"./node_modules/highlight.js/lib/languages/fsharp.js",
		"highlight/fsharp"
	],
	"./fsharp.js": [
		"./node_modules/highlight.js/lib/languages/fsharp.js",
		"highlight/fsharp"
	],
	"./fsharp.js.js": [
		"./node_modules/highlight.js/lib/languages/fsharp.js.js",
		"highlight/fsharp-js-js"
	],
	"./gams": [
		"./node_modules/highlight.js/lib/languages/gams.js",
		"highlight/gams"
	],
	"./gams.js": [
		"./node_modules/highlight.js/lib/languages/gams.js",
		"highlight/gams"
	],
	"./gams.js.js": [
		"./node_modules/highlight.js/lib/languages/gams.js.js",
		"highlight/gams-js-js"
	],
	"./gauss": [
		"./node_modules/highlight.js/lib/languages/gauss.js",
		"highlight/gauss"
	],
	"./gauss.js": [
		"./node_modules/highlight.js/lib/languages/gauss.js",
		"highlight/gauss"
	],
	"./gauss.js.js": [
		"./node_modules/highlight.js/lib/languages/gauss.js.js",
		"highlight/gauss-js-js"
	],
	"./gcode": [
		"./node_modules/highlight.js/lib/languages/gcode.js",
		"highlight/gcode"
	],
	"./gcode.js": [
		"./node_modules/highlight.js/lib/languages/gcode.js",
		"highlight/gcode"
	],
	"./gcode.js.js": [
		"./node_modules/highlight.js/lib/languages/gcode.js.js",
		"highlight/gcode-js-js"
	],
	"./gherkin": [
		"./node_modules/highlight.js/lib/languages/gherkin.js",
		"highlight/gherkin"
	],
	"./gherkin.js": [
		"./node_modules/highlight.js/lib/languages/gherkin.js",
		"highlight/gherkin"
	],
	"./gherkin.js.js": [
		"./node_modules/highlight.js/lib/languages/gherkin.js.js",
		"highlight/gherkin-js-js"
	],
	"./glsl": [
		"./node_modules/highlight.js/lib/languages/glsl.js",
		"highlight/glsl"
	],
	"./glsl.js": [
		"./node_modules/highlight.js/lib/languages/glsl.js",
		"highlight/glsl"
	],
	"./glsl.js.js": [
		"./node_modules/highlight.js/lib/languages/glsl.js.js",
		"highlight/glsl-js-js"
	],
	"./gml": [
		"./node_modules/highlight.js/lib/languages/gml.js",
		"highlight/gml"
	],
	"./gml.js": [
		"./node_modules/highlight.js/lib/languages/gml.js",
		"highlight/gml"
	],
	"./gml.js.js": [
		"./node_modules/highlight.js/lib/languages/gml.js.js",
		"highlight/gml-js-js"
	],
	"./go": [
		"./node_modules/highlight.js/lib/languages/go.js",
		"highlight/go"
	],
	"./go.js": [
		"./node_modules/highlight.js/lib/languages/go.js",
		"highlight/go"
	],
	"./go.js.js": [
		"./node_modules/highlight.js/lib/languages/go.js.js",
		"highlight/go-js-js"
	],
	"./golo": [
		"./node_modules/highlight.js/lib/languages/golo.js",
		"highlight/golo"
	],
	"./golo.js": [
		"./node_modules/highlight.js/lib/languages/golo.js",
		"highlight/golo"
	],
	"./golo.js.js": [
		"./node_modules/highlight.js/lib/languages/golo.js.js",
		"highlight/golo-js-js"
	],
	"./gradle": [
		"./node_modules/highlight.js/lib/languages/gradle.js",
		"highlight/gradle"
	],
	"./gradle.js": [
		"./node_modules/highlight.js/lib/languages/gradle.js",
		"highlight/gradle"
	],
	"./gradle.js.js": [
		"./node_modules/highlight.js/lib/languages/gradle.js.js",
		"highlight/gradle-js-js"
	],
	"./graphql": [
		"./node_modules/highlight.js/lib/languages/graphql.js",
		"highlight/graphql"
	],
	"./graphql.js": [
		"./node_modules/highlight.js/lib/languages/graphql.js",
		"highlight/graphql"
	],
	"./graphql.js.js": [
		"./node_modules/highlight.js/lib/languages/graphql.js.js",
		"highlight/graphql-js-js"
	],
	"./groovy": [
		"./node_modules/highlight.js/lib/languages/groovy.js",
		"highlight/groovy"
	],
	"./groovy.js": [
		"./node_modules/highlight.js/lib/languages/groovy.js",
		"highlight/groovy"
	],
	"./groovy.js.js": [
		"./node_modules/highlight.js/lib/languages/groovy.js.js",
		"highlight/groovy-js-js"
	],
	"./haml": [
		"./node_modules/highlight.js/lib/languages/haml.js",
		"highlight/haml"
	],
	"./haml.js": [
		"./node_modules/highlight.js/lib/languages/haml.js",
		"highlight/haml"
	],
	"./haml.js.js": [
		"./node_modules/highlight.js/lib/languages/haml.js.js",
		"highlight/haml-js-js"
	],
	"./handlebars": [
		"./node_modules/highlight.js/lib/languages/handlebars.js",
		"highlight/handlebars"
	],
	"./handlebars.js": [
		"./node_modules/highlight.js/lib/languages/handlebars.js",
		"highlight/handlebars"
	],
	"./handlebars.js.js": [
		"./node_modules/highlight.js/lib/languages/handlebars.js.js",
		"highlight/handlebars-js-js"
	],
	"./haskell": [
		"./node_modules/highlight.js/lib/languages/haskell.js",
		"highlight/haskell"
	],
	"./haskell.js": [
		"./node_modules/highlight.js/lib/languages/haskell.js",
		"highlight/haskell"
	],
	"./haskell.js.js": [
		"./node_modules/highlight.js/lib/languages/haskell.js.js",
		"highlight/haskell-js-js"
	],
	"./haxe": [
		"./node_modules/highlight.js/lib/languages/haxe.js",
		"highlight/haxe"
	],
	"./haxe.js": [
		"./node_modules/highlight.js/lib/languages/haxe.js",
		"highlight/haxe"
	],
	"./haxe.js.js": [
		"./node_modules/highlight.js/lib/languages/haxe.js.js",
		"highlight/haxe-js-js"
	],
	"./hsp": [
		"./node_modules/highlight.js/lib/languages/hsp.js",
		"highlight/hsp"
	],
	"./hsp.js": [
		"./node_modules/highlight.js/lib/languages/hsp.js",
		"highlight/hsp"
	],
	"./hsp.js.js": [
		"./node_modules/highlight.js/lib/languages/hsp.js.js",
		"highlight/hsp-js-js"
	],
	"./http": [
		"./node_modules/highlight.js/lib/languages/http.js",
		"highlight/http"
	],
	"./http.js": [
		"./node_modules/highlight.js/lib/languages/http.js",
		"highlight/http"
	],
	"./http.js.js": [
		"./node_modules/highlight.js/lib/languages/http.js.js",
		"highlight/http-js-js"
	],
	"./hy": [
		"./node_modules/highlight.js/lib/languages/hy.js",
		"highlight/hy"
	],
	"./hy.js": [
		"./node_modules/highlight.js/lib/languages/hy.js",
		"highlight/hy"
	],
	"./hy.js.js": [
		"./node_modules/highlight.js/lib/languages/hy.js.js",
		"highlight/hy-js-js"
	],
	"./inform7": [
		"./node_modules/highlight.js/lib/languages/inform7.js",
		"highlight/inform7"
	],
	"./inform7.js": [
		"./node_modules/highlight.js/lib/languages/inform7.js",
		"highlight/inform7"
	],
	"./inform7.js.js": [
		"./node_modules/highlight.js/lib/languages/inform7.js.js",
		"highlight/inform7-js-js"
	],
	"./ini": [
		"./node_modules/highlight.js/lib/languages/ini.js",
		"highlight/ini"
	],
	"./ini.js": [
		"./node_modules/highlight.js/lib/languages/ini.js",
		"highlight/ini"
	],
	"./ini.js.js": [
		"./node_modules/highlight.js/lib/languages/ini.js.js",
		"highlight/ini-js-js"
	],
	"./irpf90": [
		"./node_modules/highlight.js/lib/languages/irpf90.js",
		"highlight/irpf90"
	],
	"./irpf90.js": [
		"./node_modules/highlight.js/lib/languages/irpf90.js",
		"highlight/irpf90"
	],
	"./irpf90.js.js": [
		"./node_modules/highlight.js/lib/languages/irpf90.js.js",
		"highlight/irpf90-js-js"
	],
	"./isbl": [
		"./node_modules/highlight.js/lib/languages/isbl.js",
		"highlight/isbl"
	],
	"./isbl.js": [
		"./node_modules/highlight.js/lib/languages/isbl.js",
		"highlight/isbl"
	],
	"./isbl.js.js": [
		"./node_modules/highlight.js/lib/languages/isbl.js.js",
		"highlight/isbl",
		"highlight/isbl-js-js"
	],
	"./java": [
		"./node_modules/highlight.js/lib/languages/java.js",
		"highlight/java"
	],
	"./java.js": [
		"./node_modules/highlight.js/lib/languages/java.js",
		"highlight/java"
	],
	"./java.js.js": [
		"./node_modules/highlight.js/lib/languages/java.js.js",
		"highlight/java-js-js"
	],
	"./javascript": [
		"./node_modules/highlight.js/lib/languages/javascript.js",
		"highlight/javascript"
	],
	"./javascript.js": [
		"./node_modules/highlight.js/lib/languages/javascript.js",
		"highlight/javascript"
	],
	"./javascript.js.js": [
		"./node_modules/highlight.js/lib/languages/javascript.js.js",
		"highlight/javascript-js-js"
	],
	"./jboss-cli": [
		"./node_modules/highlight.js/lib/languages/jboss-cli.js",
		"highlight/jboss-cli"
	],
	"./jboss-cli.js": [
		"./node_modules/highlight.js/lib/languages/jboss-cli.js",
		"highlight/jboss-cli"
	],
	"./jboss-cli.js.js": [
		"./node_modules/highlight.js/lib/languages/jboss-cli.js.js",
		"highlight/jboss-cli-js-js"
	],
	"./json": [
		"./node_modules/highlight.js/lib/languages/json.js",
		"highlight/json"
	],
	"./json.js": [
		"./node_modules/highlight.js/lib/languages/json.js",
		"highlight/json"
	],
	"./json.js.js": [
		"./node_modules/highlight.js/lib/languages/json.js.js",
		"highlight/json-js-js"
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
	"./julia-repl.js.js": [
		"./node_modules/highlight.js/lib/languages/julia-repl.js.js",
		"highlight/julia-repl-js-js"
	],
	"./julia.js": [
		"./node_modules/highlight.js/lib/languages/julia.js",
		"highlight/julia"
	],
	"./julia.js.js": [
		"./node_modules/highlight.js/lib/languages/julia.js.js",
		"highlight/julia-js-js"
	],
	"./kotlin": [
		"./node_modules/highlight.js/lib/languages/kotlin.js",
		"highlight/kotlin"
	],
	"./kotlin.js": [
		"./node_modules/highlight.js/lib/languages/kotlin.js",
		"highlight/kotlin"
	],
	"./kotlin.js.js": [
		"./node_modules/highlight.js/lib/languages/kotlin.js.js",
		"highlight/kotlin-js-js"
	],
	"./lasso": [
		"./node_modules/highlight.js/lib/languages/lasso.js",
		"highlight/lasso"
	],
	"./lasso.js": [
		"./node_modules/highlight.js/lib/languages/lasso.js",
		"highlight/lasso"
	],
	"./lasso.js.js": [
		"./node_modules/highlight.js/lib/languages/lasso.js.js",
		"highlight/lasso-js-js"
	],
	"./latex": [
		"./node_modules/highlight.js/lib/languages/latex.js",
		"highlight/latex"
	],
	"./latex.js": [
		"./node_modules/highlight.js/lib/languages/latex.js",
		"highlight/latex"
	],
	"./latex.js.js": [
		"./node_modules/highlight.js/lib/languages/latex.js.js",
		"highlight/latex-js-js"
	],
	"./ldif": [
		"./node_modules/highlight.js/lib/languages/ldif.js",
		"highlight/ldif"
	],
	"./ldif.js": [
		"./node_modules/highlight.js/lib/languages/ldif.js",
		"highlight/ldif"
	],
	"./ldif.js.js": [
		"./node_modules/highlight.js/lib/languages/ldif.js.js",
		"highlight/ldif-js-js"
	],
	"./leaf": [
		"./node_modules/highlight.js/lib/languages/leaf.js",
		"highlight/leaf"
	],
	"./leaf.js": [
		"./node_modules/highlight.js/lib/languages/leaf.js",
		"highlight/leaf"
	],
	"./leaf.js.js": [
		"./node_modules/highlight.js/lib/languages/leaf.js.js",
		"highlight/leaf-js-js"
	],
	"./less": [
		"./node_modules/highlight.js/lib/languages/less.js",
		"highlight/less"
	],
	"./less.js": [
		"./node_modules/highlight.js/lib/languages/less.js",
		"highlight/less"
	],
	"./less.js.js": [
		"./node_modules/highlight.js/lib/languages/less.js.js",
		"highlight/less-js-js"
	],
	"./lisp": [
		"./node_modules/highlight.js/lib/languages/lisp.js",
		"highlight/lisp"
	],
	"./lisp.js": [
		"./node_modules/highlight.js/lib/languages/lisp.js",
		"highlight/lisp"
	],
	"./lisp.js.js": [
		"./node_modules/highlight.js/lib/languages/lisp.js.js",
		"highlight/lisp-js-js"
	],
	"./livecodeserver": [
		"./node_modules/highlight.js/lib/languages/livecodeserver.js",
		"highlight/livecodeserver"
	],
	"./livecodeserver.js": [
		"./node_modules/highlight.js/lib/languages/livecodeserver.js",
		"highlight/livecodeserver"
	],
	"./livecodeserver.js.js": [
		"./node_modules/highlight.js/lib/languages/livecodeserver.js.js",
		"highlight/livecodeserver-js-js"
	],
	"./livescript": [
		"./node_modules/highlight.js/lib/languages/livescript.js",
		"highlight/livescript"
	],
	"./livescript.js": [
		"./node_modules/highlight.js/lib/languages/livescript.js",
		"highlight/livescript"
	],
	"./livescript.js.js": [
		"./node_modules/highlight.js/lib/languages/livescript.js.js",
		"highlight/livescript-js-js"
	],
	"./llvm": [
		"./node_modules/highlight.js/lib/languages/llvm.js",
		"highlight/llvm"
	],
	"./llvm.js": [
		"./node_modules/highlight.js/lib/languages/llvm.js",
		"highlight/llvm"
	],
	"./llvm.js.js": [
		"./node_modules/highlight.js/lib/languages/llvm.js.js",
		"highlight/llvm-js-js"
	],
	"./lsl": [
		"./node_modules/highlight.js/lib/languages/lsl.js",
		"highlight/lsl"
	],
	"./lsl.js": [
		"./node_modules/highlight.js/lib/languages/lsl.js",
		"highlight/lsl"
	],
	"./lsl.js.js": [
		"./node_modules/highlight.js/lib/languages/lsl.js.js",
		"highlight/lsl-js-js"
	],
	"./lua": [
		"./node_modules/highlight.js/lib/languages/lua.js",
		"highlight/lua"
	],
	"./lua.js": [
		"./node_modules/highlight.js/lib/languages/lua.js",
		"highlight/lua"
	],
	"./lua.js.js": [
		"./node_modules/highlight.js/lib/languages/lua.js.js",
		"highlight/lua-js-js"
	],
	"./makefile": [
		"./node_modules/highlight.js/lib/languages/makefile.js",
		"highlight/makefile"
	],
	"./makefile.js": [
		"./node_modules/highlight.js/lib/languages/makefile.js",
		"highlight/makefile"
	],
	"./makefile.js.js": [
		"./node_modules/highlight.js/lib/languages/makefile.js.js",
		"highlight/makefile-js-js"
	],
	"./markdown": [
		"./node_modules/highlight.js/lib/languages/markdown.js",
		"highlight/markdown"
	],
	"./markdown.js": [
		"./node_modules/highlight.js/lib/languages/markdown.js",
		"highlight/markdown"
	],
	"./markdown.js.js": [
		"./node_modules/highlight.js/lib/languages/markdown.js.js",
		"highlight/markdown-js-js"
	],
	"./mathematica": [
		"./node_modules/highlight.js/lib/languages/mathematica.js",
		"highlight/mathematica"
	],
	"./mathematica.js": [
		"./node_modules/highlight.js/lib/languages/mathematica.js",
		"highlight/mathematica"
	],
	"./mathematica.js.js": [
		"./node_modules/highlight.js/lib/languages/mathematica.js.js",
		"highlight/mathematica",
		"highlight/mathematica-js-js"
	],
	"./matlab": [
		"./node_modules/highlight.js/lib/languages/matlab.js",
		"highlight/matlab"
	],
	"./matlab.js": [
		"./node_modules/highlight.js/lib/languages/matlab.js",
		"highlight/matlab"
	],
	"./matlab.js.js": [
		"./node_modules/highlight.js/lib/languages/matlab.js.js",
		"highlight/matlab-js-js"
	],
	"./maxima": [
		"./node_modules/highlight.js/lib/languages/maxima.js",
		"highlight/maxima"
	],
	"./maxima.js": [
		"./node_modules/highlight.js/lib/languages/maxima.js",
		"highlight/maxima"
	],
	"./maxima.js.js": [
		"./node_modules/highlight.js/lib/languages/maxima.js.js",
		"highlight/maxima-js-js"
	],
	"./mel": [
		"./node_modules/highlight.js/lib/languages/mel.js",
		"highlight/mel"
	],
	"./mel.js": [
		"./node_modules/highlight.js/lib/languages/mel.js",
		"highlight/mel"
	],
	"./mel.js.js": [
		"./node_modules/highlight.js/lib/languages/mel.js.js",
		"highlight/mel-js-js"
	],
	"./mercury": [
		"./node_modules/highlight.js/lib/languages/mercury.js",
		"highlight/mercury"
	],
	"./mercury.js": [
		"./node_modules/highlight.js/lib/languages/mercury.js",
		"highlight/mercury"
	],
	"./mercury.js.js": [
		"./node_modules/highlight.js/lib/languages/mercury.js.js",
		"highlight/mercury-js-js"
	],
	"./mipsasm": [
		"./node_modules/highlight.js/lib/languages/mipsasm.js",
		"highlight/mipsasm"
	],
	"./mipsasm.js": [
		"./node_modules/highlight.js/lib/languages/mipsasm.js",
		"highlight/mipsasm"
	],
	"./mipsasm.js.js": [
		"./node_modules/highlight.js/lib/languages/mipsasm.js.js",
		"highlight/mipsasm-js-js"
	],
	"./mizar": [
		"./node_modules/highlight.js/lib/languages/mizar.js",
		"highlight/mizar"
	],
	"./mizar.js": [
		"./node_modules/highlight.js/lib/languages/mizar.js",
		"highlight/mizar"
	],
	"./mizar.js.js": [
		"./node_modules/highlight.js/lib/languages/mizar.js.js",
		"highlight/mizar-js-js"
	],
	"./mojolicious": [
		"./node_modules/highlight.js/lib/languages/mojolicious.js",
		"highlight/mojolicious"
	],
	"./mojolicious.js": [
		"./node_modules/highlight.js/lib/languages/mojolicious.js",
		"highlight/mojolicious"
	],
	"./mojolicious.js.js": [
		"./node_modules/highlight.js/lib/languages/mojolicious.js.js",
		"highlight/mojolicious-js-js"
	],
	"./monkey": [
		"./node_modules/highlight.js/lib/languages/monkey.js",
		"highlight/monkey"
	],
	"./monkey.js": [
		"./node_modules/highlight.js/lib/languages/monkey.js",
		"highlight/monkey"
	],
	"./monkey.js.js": [
		"./node_modules/highlight.js/lib/languages/monkey.js.js",
		"highlight/monkey-js-js"
	],
	"./moonscript": [
		"./node_modules/highlight.js/lib/languages/moonscript.js",
		"highlight/moonscript"
	],
	"./moonscript.js": [
		"./node_modules/highlight.js/lib/languages/moonscript.js",
		"highlight/moonscript"
	],
	"./moonscript.js.js": [
		"./node_modules/highlight.js/lib/languages/moonscript.js.js",
		"highlight/moonscript-js-js"
	],
	"./n1ql": [
		"./node_modules/highlight.js/lib/languages/n1ql.js",
		"highlight/n1ql"
	],
	"./n1ql.js": [
		"./node_modules/highlight.js/lib/languages/n1ql.js",
		"highlight/n1ql"
	],
	"./n1ql.js.js": [
		"./node_modules/highlight.js/lib/languages/n1ql.js.js",
		"highlight/n1ql-js-js"
	],
	"./nestedtext": [
		"./node_modules/highlight.js/lib/languages/nestedtext.js",
		"highlight/nestedtext"
	],
	"./nestedtext.js": [
		"./node_modules/highlight.js/lib/languages/nestedtext.js",
		"highlight/nestedtext"
	],
	"./nestedtext.js.js": [
		"./node_modules/highlight.js/lib/languages/nestedtext.js.js",
		"highlight/nestedtext-js-js"
	],
	"./nginx": [
		"./node_modules/highlight.js/lib/languages/nginx.js",
		"highlight/nginx"
	],
	"./nginx.js": [
		"./node_modules/highlight.js/lib/languages/nginx.js",
		"highlight/nginx"
	],
	"./nginx.js.js": [
		"./node_modules/highlight.js/lib/languages/nginx.js.js",
		"highlight/nginx-js-js"
	],
	"./nim": [
		"./node_modules/highlight.js/lib/languages/nim.js",
		"highlight/nim"
	],
	"./nim.js": [
		"./node_modules/highlight.js/lib/languages/nim.js",
		"highlight/nim"
	],
	"./nim.js.js": [
		"./node_modules/highlight.js/lib/languages/nim.js.js",
		"highlight/nim-js-js"
	],
	"./nix": [
		"./node_modules/highlight.js/lib/languages/nix.js",
		"highlight/nix"
	],
	"./nix.js": [
		"./node_modules/highlight.js/lib/languages/nix.js",
		"highlight/nix"
	],
	"./nix.js.js": [
		"./node_modules/highlight.js/lib/languages/nix.js.js",
		"highlight/nix-js-js"
	],
	"./node-repl": [
		"./node_modules/highlight.js/lib/languages/node-repl.js",
		"highlight/node-repl"
	],
	"./node-repl.js": [
		"./node_modules/highlight.js/lib/languages/node-repl.js",
		"highlight/node-repl"
	],
	"./node-repl.js.js": [
		"./node_modules/highlight.js/lib/languages/node-repl.js.js",
		"highlight/node-repl-js-js"
	],
	"./nsis": [
		"./node_modules/highlight.js/lib/languages/nsis.js",
		"highlight/nsis"
	],
	"./nsis.js": [
		"./node_modules/highlight.js/lib/languages/nsis.js",
		"highlight/nsis"
	],
	"./nsis.js.js": [
		"./node_modules/highlight.js/lib/languages/nsis.js.js",
		"highlight/nsis-js-js"
	],
	"./objectivec": [
		"./node_modules/highlight.js/lib/languages/objectivec.js",
		"highlight/objectivec"
	],
	"./objectivec.js": [
		"./node_modules/highlight.js/lib/languages/objectivec.js",
		"highlight/objectivec"
	],
	"./objectivec.js.js": [
		"./node_modules/highlight.js/lib/languages/objectivec.js.js",
		"highlight/objectivec-js-js"
	],
	"./ocaml": [
		"./node_modules/highlight.js/lib/languages/ocaml.js",
		"highlight/ocaml"
	],
	"./ocaml.js": [
		"./node_modules/highlight.js/lib/languages/ocaml.js",
		"highlight/ocaml"
	],
	"./ocaml.js.js": [
		"./node_modules/highlight.js/lib/languages/ocaml.js.js",
		"highlight/ocaml-js-js"
	],
	"./openscad": [
		"./node_modules/highlight.js/lib/languages/openscad.js",
		"highlight/openscad"
	],
	"./openscad.js": [
		"./node_modules/highlight.js/lib/languages/openscad.js",
		"highlight/openscad"
	],
	"./openscad.js.js": [
		"./node_modules/highlight.js/lib/languages/openscad.js.js",
		"highlight/openscad-js-js"
	],
	"./oxygene": [
		"./node_modules/highlight.js/lib/languages/oxygene.js",
		"highlight/oxygene"
	],
	"./oxygene.js": [
		"./node_modules/highlight.js/lib/languages/oxygene.js",
		"highlight/oxygene"
	],
	"./oxygene.js.js": [
		"./node_modules/highlight.js/lib/languages/oxygene.js.js",
		"highlight/oxygene-js-js"
	],
	"./parser3": [
		"./node_modules/highlight.js/lib/languages/parser3.js",
		"highlight/parser3"
	],
	"./parser3.js": [
		"./node_modules/highlight.js/lib/languages/parser3.js",
		"highlight/parser3"
	],
	"./parser3.js.js": [
		"./node_modules/highlight.js/lib/languages/parser3.js.js",
		"highlight/parser3-js-js"
	],
	"./perl": [
		"./node_modules/highlight.js/lib/languages/perl.js",
		"highlight/perl"
	],
	"./perl.js": [
		"./node_modules/highlight.js/lib/languages/perl.js",
		"highlight/perl"
	],
	"./perl.js.js": [
		"./node_modules/highlight.js/lib/languages/perl.js.js",
		"highlight/perl-js-js"
	],
	"./pf": [
		"./node_modules/highlight.js/lib/languages/pf.js",
		"highlight/pf"
	],
	"./pf.js": [
		"./node_modules/highlight.js/lib/languages/pf.js",
		"highlight/pf"
	],
	"./pf.js.js": [
		"./node_modules/highlight.js/lib/languages/pf.js.js",
		"highlight/pf-js-js"
	],
	"./pgsql": [
		"./node_modules/highlight.js/lib/languages/pgsql.js",
		"highlight/pgsql"
	],
	"./pgsql.js": [
		"./node_modules/highlight.js/lib/languages/pgsql.js",
		"highlight/pgsql"
	],
	"./pgsql.js.js": [
		"./node_modules/highlight.js/lib/languages/pgsql.js.js",
		"highlight/pgsql-js-js"
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
	"./php-template.js.js": [
		"./node_modules/highlight.js/lib/languages/php-template.js.js",
		"highlight/php-template-js-js"
	],
	"./php.js": [
		"./node_modules/highlight.js/lib/languages/php.js",
		"highlight/php"
	],
	"./php.js.js": [
		"./node_modules/highlight.js/lib/languages/php.js.js",
		"highlight/php-js-js"
	],
	"./plaintext": [
		"./node_modules/highlight.js/lib/languages/plaintext.js",
		"highlight/plaintext"
	],
	"./plaintext.js": [
		"./node_modules/highlight.js/lib/languages/plaintext.js",
		"highlight/plaintext"
	],
	"./plaintext.js.js": [
		"./node_modules/highlight.js/lib/languages/plaintext.js.js",
		"highlight/plaintext-js-js"
	],
	"./pony": [
		"./node_modules/highlight.js/lib/languages/pony.js",
		"highlight/pony"
	],
	"./pony.js": [
		"./node_modules/highlight.js/lib/languages/pony.js",
		"highlight/pony"
	],
	"./pony.js.js": [
		"./node_modules/highlight.js/lib/languages/pony.js.js",
		"highlight/pony-js-js"
	],
	"./powershell": [
		"./node_modules/highlight.js/lib/languages/powershell.js",
		"highlight/powershell"
	],
	"./powershell.js": [
		"./node_modules/highlight.js/lib/languages/powershell.js",
		"highlight/powershell"
	],
	"./powershell.js.js": [
		"./node_modules/highlight.js/lib/languages/powershell.js.js",
		"highlight/powershell-js-js"
	],
	"./processing": [
		"./node_modules/highlight.js/lib/languages/processing.js",
		"highlight/processing"
	],
	"./processing.js": [
		"./node_modules/highlight.js/lib/languages/processing.js",
		"highlight/processing"
	],
	"./processing.js.js": [
		"./node_modules/highlight.js/lib/languages/processing.js.js",
		"highlight/processing-js-js"
	],
	"./profile": [
		"./node_modules/highlight.js/lib/languages/profile.js",
		"highlight/profile"
	],
	"./profile.js": [
		"./node_modules/highlight.js/lib/languages/profile.js",
		"highlight/profile"
	],
	"./profile.js.js": [
		"./node_modules/highlight.js/lib/languages/profile.js.js",
		"highlight/profile-js-js"
	],
	"./prolog": [
		"./node_modules/highlight.js/lib/languages/prolog.js",
		"highlight/prolog"
	],
	"./prolog.js": [
		"./node_modules/highlight.js/lib/languages/prolog.js",
		"highlight/prolog"
	],
	"./prolog.js.js": [
		"./node_modules/highlight.js/lib/languages/prolog.js.js",
		"highlight/prolog-js-js"
	],
	"./properties": [
		"./node_modules/highlight.js/lib/languages/properties.js",
		"highlight/properties"
	],
	"./properties.js": [
		"./node_modules/highlight.js/lib/languages/properties.js",
		"highlight/properties"
	],
	"./properties.js.js": [
		"./node_modules/highlight.js/lib/languages/properties.js.js",
		"highlight/properties-js-js"
	],
	"./protobuf": [
		"./node_modules/highlight.js/lib/languages/protobuf.js",
		"highlight/protobuf"
	],
	"./protobuf.js": [
		"./node_modules/highlight.js/lib/languages/protobuf.js",
		"highlight/protobuf"
	],
	"./protobuf.js.js": [
		"./node_modules/highlight.js/lib/languages/protobuf.js.js",
		"highlight/protobuf-js-js"
	],
	"./puppet": [
		"./node_modules/highlight.js/lib/languages/puppet.js",
		"highlight/puppet"
	],
	"./puppet.js": [
		"./node_modules/highlight.js/lib/languages/puppet.js",
		"highlight/puppet"
	],
	"./puppet.js.js": [
		"./node_modules/highlight.js/lib/languages/puppet.js.js",
		"highlight/puppet-js-js"
	],
	"./purebasic": [
		"./node_modules/highlight.js/lib/languages/purebasic.js",
		"highlight/purebasic"
	],
	"./purebasic.js": [
		"./node_modules/highlight.js/lib/languages/purebasic.js",
		"highlight/purebasic"
	],
	"./purebasic.js.js": [
		"./node_modules/highlight.js/lib/languages/purebasic.js.js",
		"highlight/purebasic-js-js"
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
	"./python-repl.js.js": [
		"./node_modules/highlight.js/lib/languages/python-repl.js.js",
		"highlight/python-repl-js-js"
	],
	"./python.js": [
		"./node_modules/highlight.js/lib/languages/python.js",
		"highlight/python"
	],
	"./python.js.js": [
		"./node_modules/highlight.js/lib/languages/python.js.js",
		"highlight/python-js-js"
	],
	"./q": [
		"./node_modules/highlight.js/lib/languages/q.js",
		"highlight/q"
	],
	"./q.js": [
		"./node_modules/highlight.js/lib/languages/q.js",
		"highlight/q"
	],
	"./q.js.js": [
		"./node_modules/highlight.js/lib/languages/q.js.js",
		"highlight/q-js-js"
	],
	"./qml": [
		"./node_modules/highlight.js/lib/languages/qml.js",
		"highlight/qml"
	],
	"./qml.js": [
		"./node_modules/highlight.js/lib/languages/qml.js",
		"highlight/qml"
	],
	"./qml.js.js": [
		"./node_modules/highlight.js/lib/languages/qml.js.js",
		"highlight/qml-js-js"
	],
	"./r": [
		"./node_modules/highlight.js/lib/languages/r.js",
		"highlight/r"
	],
	"./r.js": [
		"./node_modules/highlight.js/lib/languages/r.js",
		"highlight/r"
	],
	"./r.js.js": [
		"./node_modules/highlight.js/lib/languages/r.js.js",
		"highlight/r-js-js"
	],
	"./reasonml": [
		"./node_modules/highlight.js/lib/languages/reasonml.js",
		"highlight/reasonml"
	],
	"./reasonml.js": [
		"./node_modules/highlight.js/lib/languages/reasonml.js",
		"highlight/reasonml"
	],
	"./reasonml.js.js": [
		"./node_modules/highlight.js/lib/languages/reasonml.js.js",
		"highlight/reasonml-js-js"
	],
	"./rib": [
		"./node_modules/highlight.js/lib/languages/rib.js",
		"highlight/rib"
	],
	"./rib.js": [
		"./node_modules/highlight.js/lib/languages/rib.js",
		"highlight/rib"
	],
	"./rib.js.js": [
		"./node_modules/highlight.js/lib/languages/rib.js.js",
		"highlight/rib-js-js"
	],
	"./roboconf": [
		"./node_modules/highlight.js/lib/languages/roboconf.js",
		"highlight/roboconf"
	],
	"./roboconf.js": [
		"./node_modules/highlight.js/lib/languages/roboconf.js",
		"highlight/roboconf"
	],
	"./roboconf.js.js": [
		"./node_modules/highlight.js/lib/languages/roboconf.js.js",
		"highlight/roboconf-js-js"
	],
	"./routeros": [
		"./node_modules/highlight.js/lib/languages/routeros.js",
		"highlight/routeros"
	],
	"./routeros.js": [
		"./node_modules/highlight.js/lib/languages/routeros.js",
		"highlight/routeros"
	],
	"./routeros.js.js": [
		"./node_modules/highlight.js/lib/languages/routeros.js.js",
		"highlight/routeros-js-js"
	],
	"./rsl": [
		"./node_modules/highlight.js/lib/languages/rsl.js",
		"highlight/rsl"
	],
	"./rsl.js": [
		"./node_modules/highlight.js/lib/languages/rsl.js",
		"highlight/rsl"
	],
	"./rsl.js.js": [
		"./node_modules/highlight.js/lib/languages/rsl.js.js",
		"highlight/rsl-js-js"
	],
	"./ruby": [
		"./node_modules/highlight.js/lib/languages/ruby.js",
		"highlight/ruby"
	],
	"./ruby.js": [
		"./node_modules/highlight.js/lib/languages/ruby.js",
		"highlight/ruby"
	],
	"./ruby.js.js": [
		"./node_modules/highlight.js/lib/languages/ruby.js.js",
		"highlight/ruby-js-js"
	],
	"./ruleslanguage": [
		"./node_modules/highlight.js/lib/languages/ruleslanguage.js",
		"highlight/ruleslanguage"
	],
	"./ruleslanguage.js": [
		"./node_modules/highlight.js/lib/languages/ruleslanguage.js",
		"highlight/ruleslanguage"
	],
	"./ruleslanguage.js.js": [
		"./node_modules/highlight.js/lib/languages/ruleslanguage.js.js",
		"highlight/ruleslanguage-js-js"
	],
	"./rust": [
		"./node_modules/highlight.js/lib/languages/rust.js",
		"highlight/rust"
	],
	"./rust.js": [
		"./node_modules/highlight.js/lib/languages/rust.js",
		"highlight/rust"
	],
	"./rust.js.js": [
		"./node_modules/highlight.js/lib/languages/rust.js.js",
		"highlight/rust-js-js"
	],
	"./sas": [
		"./node_modules/highlight.js/lib/languages/sas.js",
		"highlight/sas"
	],
	"./sas.js": [
		"./node_modules/highlight.js/lib/languages/sas.js",
		"highlight/sas"
	],
	"./sas.js.js": [
		"./node_modules/highlight.js/lib/languages/sas.js.js",
		"highlight/sas-js-js"
	],
	"./scala": [
		"./node_modules/highlight.js/lib/languages/scala.js",
		"highlight/scala"
	],
	"./scala.js": [
		"./node_modules/highlight.js/lib/languages/scala.js",
		"highlight/scala"
	],
	"./scala.js.js": [
		"./node_modules/highlight.js/lib/languages/scala.js.js",
		"highlight/scala-js-js"
	],
	"./scheme": [
		"./node_modules/highlight.js/lib/languages/scheme.js",
		"highlight/scheme"
	],
	"./scheme.js": [
		"./node_modules/highlight.js/lib/languages/scheme.js",
		"highlight/scheme"
	],
	"./scheme.js.js": [
		"./node_modules/highlight.js/lib/languages/scheme.js.js",
		"highlight/scheme-js-js"
	],
	"./scilab": [
		"./node_modules/highlight.js/lib/languages/scilab.js",
		"highlight/scilab"
	],
	"./scilab.js": [
		"./node_modules/highlight.js/lib/languages/scilab.js",
		"highlight/scilab"
	],
	"./scilab.js.js": [
		"./node_modules/highlight.js/lib/languages/scilab.js.js",
		"highlight/scilab-js-js"
	],
	"./scss": [
		"./node_modules/highlight.js/lib/languages/scss.js",
		"highlight/scss"
	],
	"./scss.js": [
		"./node_modules/highlight.js/lib/languages/scss.js",
		"highlight/scss"
	],
	"./scss.js.js": [
		"./node_modules/highlight.js/lib/languages/scss.js.js",
		"highlight/scss-js-js"
	],
	"./shell": [
		"./node_modules/highlight.js/lib/languages/shell.js",
		"highlight/shell"
	],
	"./shell.js": [
		"./node_modules/highlight.js/lib/languages/shell.js",
		"highlight/shell"
	],
	"./shell.js.js": [
		"./node_modules/highlight.js/lib/languages/shell.js.js",
		"highlight/shell-js-js"
	],
	"./smali": [
		"./node_modules/highlight.js/lib/languages/smali.js",
		"highlight/smali"
	],
	"./smali.js": [
		"./node_modules/highlight.js/lib/languages/smali.js",
		"highlight/smali"
	],
	"./smali.js.js": [
		"./node_modules/highlight.js/lib/languages/smali.js.js",
		"highlight/smali-js-js"
	],
	"./smalltalk": [
		"./node_modules/highlight.js/lib/languages/smalltalk.js",
		"highlight/smalltalk"
	],
	"./smalltalk.js": [
		"./node_modules/highlight.js/lib/languages/smalltalk.js",
		"highlight/smalltalk"
	],
	"./smalltalk.js.js": [
		"./node_modules/highlight.js/lib/languages/smalltalk.js.js",
		"highlight/smalltalk-js-js"
	],
	"./sml": [
		"./node_modules/highlight.js/lib/languages/sml.js",
		"highlight/sml"
	],
	"./sml.js": [
		"./node_modules/highlight.js/lib/languages/sml.js",
		"highlight/sml"
	],
	"./sml.js.js": [
		"./node_modules/highlight.js/lib/languages/sml.js.js",
		"highlight/sml-js-js"
	],
	"./sqf": [
		"./node_modules/highlight.js/lib/languages/sqf.js",
		"highlight/sqf"
	],
	"./sqf.js": [
		"./node_modules/highlight.js/lib/languages/sqf.js",
		"highlight/sqf"
	],
	"./sqf.js.js": [
		"./node_modules/highlight.js/lib/languages/sqf.js.js",
		"highlight/sqf-js-js"
	],
	"./sql": [
		"./node_modules/highlight.js/lib/languages/sql.js",
		"highlight/sql"
	],
	"./sql.js": [
		"./node_modules/highlight.js/lib/languages/sql.js",
		"highlight/sql"
	],
	"./sql.js.js": [
		"./node_modules/highlight.js/lib/languages/sql.js.js",
		"highlight/sql-js-js"
	],
	"./stan": [
		"./node_modules/highlight.js/lib/languages/stan.js",
		"highlight/stan"
	],
	"./stan.js": [
		"./node_modules/highlight.js/lib/languages/stan.js",
		"highlight/stan"
	],
	"./stan.js.js": [
		"./node_modules/highlight.js/lib/languages/stan.js.js",
		"highlight/stan-js-js"
	],
	"./stata": [
		"./node_modules/highlight.js/lib/languages/stata.js",
		"highlight/stata"
	],
	"./stata.js": [
		"./node_modules/highlight.js/lib/languages/stata.js",
		"highlight/stata"
	],
	"./stata.js.js": [
		"./node_modules/highlight.js/lib/languages/stata.js.js",
		"highlight/stata-js-js"
	],
	"./step21": [
		"./node_modules/highlight.js/lib/languages/step21.js",
		"highlight/step21"
	],
	"./step21.js": [
		"./node_modules/highlight.js/lib/languages/step21.js",
		"highlight/step21"
	],
	"./step21.js.js": [
		"./node_modules/highlight.js/lib/languages/step21.js.js",
		"highlight/step21-js-js"
	],
	"./stylus": [
		"./node_modules/highlight.js/lib/languages/stylus.js",
		"highlight/stylus"
	],
	"./stylus.js": [
		"./node_modules/highlight.js/lib/languages/stylus.js",
		"highlight/stylus"
	],
	"./stylus.js.js": [
		"./node_modules/highlight.js/lib/languages/stylus.js.js",
		"highlight/stylus-js-js"
	],
	"./subunit": [
		"./node_modules/highlight.js/lib/languages/subunit.js",
		"highlight/subunit"
	],
	"./subunit.js": [
		"./node_modules/highlight.js/lib/languages/subunit.js",
		"highlight/subunit"
	],
	"./subunit.js.js": [
		"./node_modules/highlight.js/lib/languages/subunit.js.js",
		"highlight/subunit-js-js"
	],
	"./swift": [
		"./node_modules/highlight.js/lib/languages/swift.js",
		"highlight/swift"
	],
	"./swift.js": [
		"./node_modules/highlight.js/lib/languages/swift.js",
		"highlight/swift"
	],
	"./swift.js.js": [
		"./node_modules/highlight.js/lib/languages/swift.js.js",
		"highlight/swift-js-js"
	],
	"./taggerscript": [
		"./node_modules/highlight.js/lib/languages/taggerscript.js",
		"highlight/taggerscript"
	],
	"./taggerscript.js": [
		"./node_modules/highlight.js/lib/languages/taggerscript.js",
		"highlight/taggerscript"
	],
	"./taggerscript.js.js": [
		"./node_modules/highlight.js/lib/languages/taggerscript.js.js",
		"highlight/taggerscript-js-js"
	],
	"./tap": [
		"./node_modules/highlight.js/lib/languages/tap.js",
		"highlight/tap"
	],
	"./tap.js": [
		"./node_modules/highlight.js/lib/languages/tap.js",
		"highlight/tap"
	],
	"./tap.js.js": [
		"./node_modules/highlight.js/lib/languages/tap.js.js",
		"highlight/tap-js-js"
	],
	"./tcl": [
		"./node_modules/highlight.js/lib/languages/tcl.js",
		"highlight/tcl"
	],
	"./tcl.js": [
		"./node_modules/highlight.js/lib/languages/tcl.js",
		"highlight/tcl"
	],
	"./tcl.js.js": [
		"./node_modules/highlight.js/lib/languages/tcl.js.js",
		"highlight/tcl-js-js"
	],
	"./thrift": [
		"./node_modules/highlight.js/lib/languages/thrift.js",
		"highlight/thrift"
	],
	"./thrift.js": [
		"./node_modules/highlight.js/lib/languages/thrift.js",
		"highlight/thrift"
	],
	"./thrift.js.js": [
		"./node_modules/highlight.js/lib/languages/thrift.js.js",
		"highlight/thrift-js-js"
	],
	"./tp": [
		"./node_modules/highlight.js/lib/languages/tp.js",
		"highlight/tp"
	],
	"./tp.js": [
		"./node_modules/highlight.js/lib/languages/tp.js",
		"highlight/tp"
	],
	"./tp.js.js": [
		"./node_modules/highlight.js/lib/languages/tp.js.js",
		"highlight/tp-js-js"
	],
	"./twig": [
		"./node_modules/highlight.js/lib/languages/twig.js",
		"highlight/twig"
	],
	"./twig.js": [
		"./node_modules/highlight.js/lib/languages/twig.js",
		"highlight/twig"
	],
	"./twig.js.js": [
		"./node_modules/highlight.js/lib/languages/twig.js.js",
		"highlight/twig-js-js"
	],
	"./typescript": [
		"./node_modules/highlight.js/lib/languages/typescript.js",
		"highlight/typescript"
	],
	"./typescript.js": [
		"./node_modules/highlight.js/lib/languages/typescript.js",
		"highlight/typescript"
	],
	"./typescript.js.js": [
		"./node_modules/highlight.js/lib/languages/typescript.js.js",
		"highlight/typescript-js-js"
	],
	"./vala": [
		"./node_modules/highlight.js/lib/languages/vala.js",
		"highlight/vala"
	],
	"./vala.js": [
		"./node_modules/highlight.js/lib/languages/vala.js",
		"highlight/vala"
	],
	"./vala.js.js": [
		"./node_modules/highlight.js/lib/languages/vala.js.js",
		"highlight/vala-js-js"
	],
	"./vbnet": [
		"./node_modules/highlight.js/lib/languages/vbnet.js",
		"highlight/vbnet"
	],
	"./vbnet.js": [
		"./node_modules/highlight.js/lib/languages/vbnet.js",
		"highlight/vbnet"
	],
	"./vbnet.js.js": [
		"./node_modules/highlight.js/lib/languages/vbnet.js.js",
		"highlight/vbnet-js-js"
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
	"./vbscript-html.js.js": [
		"./node_modules/highlight.js/lib/languages/vbscript-html.js.js",
		"highlight/vbscript-html-js-js"
	],
	"./vbscript.js": [
		"./node_modules/highlight.js/lib/languages/vbscript.js",
		"highlight/vbscript"
	],
	"./vbscript.js.js": [
		"./node_modules/highlight.js/lib/languages/vbscript.js.js",
		"highlight/vbscript-js-js"
	],
	"./verilog": [
		"./node_modules/highlight.js/lib/languages/verilog.js",
		"highlight/verilog"
	],
	"./verilog.js": [
		"./node_modules/highlight.js/lib/languages/verilog.js",
		"highlight/verilog"
	],
	"./verilog.js.js": [
		"./node_modules/highlight.js/lib/languages/verilog.js.js",
		"highlight/verilog-js-js"
	],
	"./vhdl": [
		"./node_modules/highlight.js/lib/languages/vhdl.js",
		"highlight/vhdl"
	],
	"./vhdl.js": [
		"./node_modules/highlight.js/lib/languages/vhdl.js",
		"highlight/vhdl"
	],
	"./vhdl.js.js": [
		"./node_modules/highlight.js/lib/languages/vhdl.js.js",
		"highlight/vhdl-js-js"
	],
	"./vim": [
		"./node_modules/highlight.js/lib/languages/vim.js",
		"highlight/vim"
	],
	"./vim.js": [
		"./node_modules/highlight.js/lib/languages/vim.js",
		"highlight/vim"
	],
	"./vim.js.js": [
		"./node_modules/highlight.js/lib/languages/vim.js.js",
		"highlight/vim-js-js"
	],
	"./wasm": [
		"./node_modules/highlight.js/lib/languages/wasm.js",
		"highlight/wasm"
	],
	"./wasm.js": [
		"./node_modules/highlight.js/lib/languages/wasm.js",
		"highlight/wasm"
	],
	"./wasm.js.js": [
		"./node_modules/highlight.js/lib/languages/wasm.js.js",
		"highlight/wasm-js-js"
	],
	"./wren": [
		"./node_modules/highlight.js/lib/languages/wren.js",
		"highlight/wren"
	],
	"./wren.js": [
		"./node_modules/highlight.js/lib/languages/wren.js",
		"highlight/wren"
	],
	"./wren.js.js": [
		"./node_modules/highlight.js/lib/languages/wren.js.js",
		"highlight/wren-js-js"
	],
	"./x86asm": [
		"./node_modules/highlight.js/lib/languages/x86asm.js",
		"highlight/x86asm"
	],
	"./x86asm.js": [
		"./node_modules/highlight.js/lib/languages/x86asm.js",
		"highlight/x86asm"
	],
	"./x86asm.js.js": [
		"./node_modules/highlight.js/lib/languages/x86asm.js.js",
		"highlight/x86asm-js-js"
	],
	"./xl": [
		"./node_modules/highlight.js/lib/languages/xl.js",
		"highlight/xl"
	],
	"./xl.js": [
		"./node_modules/highlight.js/lib/languages/xl.js",
		"highlight/xl"
	],
	"./xl.js.js": [
		"./node_modules/highlight.js/lib/languages/xl.js.js",
		"highlight/xl-js-js"
	],
	"./xml": [
		"./node_modules/highlight.js/lib/languages/xml.js",
		"highlight/xml"
	],
	"./xml.js": [
		"./node_modules/highlight.js/lib/languages/xml.js",
		"highlight/xml"
	],
	"./xml.js.js": [
		"./node_modules/highlight.js/lib/languages/xml.js.js",
		"highlight/xml-js-js"
	],
	"./xquery": [
		"./node_modules/highlight.js/lib/languages/xquery.js",
		"highlight/xquery"
	],
	"./xquery.js": [
		"./node_modules/highlight.js/lib/languages/xquery.js",
		"highlight/xquery"
	],
	"./xquery.js.js": [
		"./node_modules/highlight.js/lib/languages/xquery.js.js",
		"highlight/xquery-js-js"
	],
	"./yaml": [
		"./node_modules/highlight.js/lib/languages/yaml.js",
		"highlight/yaml"
	],
	"./yaml.js": [
		"./node_modules/highlight.js/lib/languages/yaml.js",
		"highlight/yaml"
	],
	"./yaml.js.js": [
		"./node_modules/highlight.js/lib/languages/yaml.js.js",
		"highlight/yaml-js-js"
	],
	"./zephir": [
		"./node_modules/highlight.js/lib/languages/zephir.js",
		"highlight/zephir"
	],
	"./zephir.js": [
		"./node_modules/highlight.js/lib/languages/zephir.js",
		"highlight/zephir"
	],
	"./zephir.js.js": [
		"./node_modules/highlight.js/lib/languages/zephir.js.js",
		"highlight/zephir-js-js"
	]
};
function webpackAsyncContext(req) {
	if(!__webpack_require__.o(map, req)) {
		return Promise.resolve().then(() => {
			var e = new Error("Cannot find module '" + req + "'");
			e.code = 'MODULE_NOT_FOUND';
			throw e;
		});
	}

	var ids = map[req], id = ids[0];
	return Promise.all(ids.slice(1).map(__webpack_require__.e)).then(() => {
		return __webpack_require__.t(id, 7 | 16);
	});
}
webpackAsyncContext.keys = () => (Object.keys(map));
webpackAsyncContext.id = "./node_modules/highlight.js/lib/languages lazy recursive ^\\.\\/.*$";
module.exports = webpackAsyncContext;

/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Assistant.vue?vue&type=style&index=0&id=37cbcbde&scoped=true&lang=scss":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Assistant.vue?vue&type=style&index=0&id=37cbcbde&scoped=true&lang=scss ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Assistant_vue_vue_type_style_index_0_id_37cbcbde_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/sass-loader/dist/cjs.js!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Assistant.vue?vue&type=style&index=0&id=37cbcbde&scoped=true&lang=scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Assistant.vue?vue&type=style&index=0&id=37cbcbde&scoped=true&lang=scss");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Assistant_vue_vue_type_style_index_0_id_37cbcbde_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Assistant_vue_vue_type_style_index_0_id_37cbcbde_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Assistant_vue_vue_type_style_index_0_id_37cbcbde_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Assistant_vue_vue_type_style_index_0_id_37cbcbde_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/BaseReader.vue?vue&type=style&index=0&id=364eab24&scoped=true&lang=scss":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/BaseReader.vue?vue&type=style&index=0&id=364eab24&scoped=true&lang=scss ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_BaseReader_vue_vue_type_style_index_0_id_364eab24_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/sass-loader/dist/cjs.js!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./BaseReader.vue?vue&type=style&index=0&id=364eab24&scoped=true&lang=scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/BaseReader.vue?vue&type=style&index=0&id=364eab24&scoped=true&lang=scss");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_BaseReader_vue_vue_type_style_index_0_id_364eab24_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_BaseReader_vue_vue_type_style_index_0_id_364eab24_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_BaseReader_vue_vue_type_style_index_0_id_364eab24_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_BaseReader_vue_vue_type_style_index_0_id_364eab24_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/CollisionResolveDialog.vue?vue&type=style&index=0&id=5ffe7972&scoped=true&lang=scss":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/CollisionResolveDialog.vue?vue&type=style&index=0&id=5ffe7972&scoped=true&lang=scss ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_CollisionResolveDialog_vue_vue_type_style_index_0_id_5ffe7972_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/sass-loader/dist/cjs.js!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./CollisionResolveDialog.vue?vue&type=style&index=0&id=5ffe7972&scoped=true&lang=scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/CollisionResolveDialog.vue?vue&type=style&index=0&id=5ffe7972&scoped=true&lang=scss");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_CollisionResolveDialog_vue_vue_type_style_index_0_id_5ffe7972_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_CollisionResolveDialog_vue_vue_type_style_index_0_id_5ffe7972_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_CollisionResolveDialog_vue_vue_type_style_index_0_id_5ffe7972_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_CollisionResolveDialog_vue_vue_type_style_index_0_id_5ffe7972_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Editor.vue?vue&type=style&index=0&id=e18b6dc6&scoped=true&lang=scss":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Editor.vue?vue&type=style&index=0&id=e18b6dc6&scoped=true&lang=scss ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Editor_vue_vue_type_style_index_0_id_e18b6dc6_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/sass-loader/dist/cjs.js!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Editor.vue?vue&type=style&index=0&id=e18b6dc6&scoped=true&lang=scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Editor.vue?vue&type=style&index=0&id=e18b6dc6&scoped=true&lang=scss");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Editor_vue_vue_type_style_index_0_id_e18b6dc6_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Editor_vue_vue_type_style_index_0_id_e18b6dc6_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Editor_vue_vue_type_style_index_0_id_e18b6dc6_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Editor_vue_vue_type_style_index_0_id_e18b6dc6_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Editor.vue?vue&type=style&index=1&id=e18b6dc6&lang=scss":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Editor.vue?vue&type=style&index=1&id=e18b6dc6&lang=scss ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Editor_vue_vue_type_style_index_1_id_e18b6dc6_lang_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/sass-loader/dist/cjs.js!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Editor.vue?vue&type=style&index=1&id=e18b6dc6&lang=scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Editor.vue?vue&type=style&index=1&id=e18b6dc6&lang=scss");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Editor_vue_vue_type_style_index_1_id_e18b6dc6_lang_scss__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Editor_vue_vue_type_style_index_1_id_e18b6dc6_lang_scss__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Editor_vue_vue_type_style_index_1_id_e18b6dc6_lang_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Editor_vue_vue_type_style_index_1_id_e18b6dc6_lang_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Editor/ContentContainer.vue?vue&type=style&index=0&id=e4c6ecec&scoped=true&lang=scss":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Editor/ContentContainer.vue?vue&type=style&index=0&id=e4c6ecec&scoped=true&lang=scss ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentContainer_vue_vue_type_style_index_0_id_e4c6ecec_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/sass-loader/dist/cjs.js!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ContentContainer.vue?vue&type=style&index=0&id=e4c6ecec&scoped=true&lang=scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Editor/ContentContainer.vue?vue&type=style&index=0&id=e4c6ecec&scoped=true&lang=scss");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentContainer_vue_vue_type_style_index_0_id_e4c6ecec_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentContainer_vue_vue_type_style_index_0_id_e4c6ecec_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentContainer_vue_vue_type_style_index_0_id_e4c6ecec_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentContainer_vue_vue_type_style_index_0_id_e4c6ecec_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Editor/DocumentStatus.vue?vue&type=style&index=0&id=5f451e6f&scoped=true&lang=scss":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Editor/DocumentStatus.vue?vue&type=style&index=0&id=5f451e6f&scoped=true&lang=scss ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_DocumentStatus_vue_vue_type_style_index_0_id_5f451e6f_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/sass-loader/dist/cjs.js!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./DocumentStatus.vue?vue&type=style&index=0&id=5f451e6f&scoped=true&lang=scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Editor/DocumentStatus.vue?vue&type=style&index=0&id=5f451e6f&scoped=true&lang=scss");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_DocumentStatus_vue_vue_type_style_index_0_id_5f451e6f_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_DocumentStatus_vue_vue_type_style_index_0_id_5f451e6f_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_DocumentStatus_vue_vue_type_style_index_0_id_5f451e6f_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_DocumentStatus_vue_vue_type_style_index_0_id_5f451e6f_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Editor/MainContainer.vue?vue&type=style&index=0&id=745ee2b6&scoped=true&lang=scss":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Editor/MainContainer.vue?vue&type=style&index=0&id=745ee2b6&scoped=true&lang=scss ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_MainContainer_vue_vue_type_style_index_0_id_745ee2b6_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/sass-loader/dist/cjs.js!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./MainContainer.vue?vue&type=style&index=0&id=745ee2b6&scoped=true&lang=scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Editor/MainContainer.vue?vue&type=style&index=0&id=745ee2b6&scoped=true&lang=scss");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_MainContainer_vue_vue_type_style_index_0_id_745ee2b6_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_MainContainer_vue_vue_type_style_index_0_id_745ee2b6_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_MainContainer_vue_vue_type_style_index_0_id_745ee2b6_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_MainContainer_vue_vue_type_style_index_0_id_745ee2b6_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Editor/Status.vue?vue&type=style&index=0&id=7749e0f4&scoped=true&lang=scss":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Editor/Status.vue?vue&type=style&index=0&id=7749e0f4&scoped=true&lang=scss ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Status_vue_vue_type_style_index_0_id_7749e0f4_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/sass-loader/dist/cjs.js!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Status.vue?vue&type=style&index=0&id=7749e0f4&scoped=true&lang=scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Editor/Status.vue?vue&type=style&index=0&id=7749e0f4&scoped=true&lang=scss");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Status_vue_vue_type_style_index_0_id_7749e0f4_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Status_vue_vue_type_style_index_0_id_7749e0f4_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Status_vue_vue_type_style_index_0_id_7749e0f4_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Status_vue_vue_type_style_index_0_id_7749e0f4_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Editor/Wrapper.vue?vue&type=style&index=0&id=20a7fb81&scoped=true&lang=scss":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Editor/Wrapper.vue?vue&type=style&index=0&id=20a7fb81&scoped=true&lang=scss ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Wrapper_vue_vue_type_style_index_0_id_20a7fb81_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/sass-loader/dist/cjs.js!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Wrapper.vue?vue&type=style&index=0&id=20a7fb81&scoped=true&lang=scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Editor/Wrapper.vue?vue&type=style&index=0&id=20a7fb81&scoped=true&lang=scss");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Wrapper_vue_vue_type_style_index_0_id_20a7fb81_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Wrapper_vue_vue_type_style_index_0_id_20a7fb81_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Wrapper_vue_vue_type_style_index_0_id_20a7fb81_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Wrapper_vue_vue_type_style_index_0_id_20a7fb81_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/HelpModal.vue?vue&type=style&index=0&id=6befbdec&lang=scss&scoped=true":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/HelpModal.vue?vue&type=style&index=0&id=6befbdec&lang=scss&scoped=true ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_HelpModal_vue_vue_type_style_index_0_id_6befbdec_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/sass-loader/dist/cjs.js!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./HelpModal.vue?vue&type=style&index=0&id=6befbdec&lang=scss&scoped=true */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/HelpModal.vue?vue&type=style&index=0&id=6befbdec&lang=scss&scoped=true");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_HelpModal_vue_vue_type_style_index_0_id_6befbdec_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_HelpModal_vue_vue_type_style_index_0_id_6befbdec_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_HelpModal_vue_vue_type_style_index_0_id_6befbdec_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_HelpModal_vue_vue_type_style_index_0_id_6befbdec_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Menu/MenuBar.vue?vue&type=style&index=0&id=10e748d8&scoped=true&lang=scss":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Menu/MenuBar.vue?vue&type=style&index=0&id=10e748d8&scoped=true&lang=scss ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_MenuBar_vue_vue_type_style_index_0_id_10e748d8_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/sass-loader/dist/cjs.js!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./MenuBar.vue?vue&type=style&index=0&id=10e748d8&scoped=true&lang=scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Menu/MenuBar.vue?vue&type=style&index=0&id=10e748d8&scoped=true&lang=scss");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_MenuBar_vue_vue_type_style_index_0_id_10e748d8_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_MenuBar_vue_vue_type_style_index_0_id_10e748d8_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_MenuBar_vue_vue_type_style_index_0_id_10e748d8_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_MenuBar_vue_vue_type_style_index_0_id_10e748d8_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Modal/Translate.vue?vue&type=style&index=0&id=7563604c&lang=scss&scoped=true":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Modal/Translate.vue?vue&type=style&index=0&id=7563604c&lang=scss&scoped=true ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Translate_vue_vue_type_style_index_0_id_7563604c_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/sass-loader/dist/cjs.js!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Translate.vue?vue&type=style&index=0&id=7563604c&lang=scss&scoped=true */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Modal/Translate.vue?vue&type=style&index=0&id=7563604c&lang=scss&scoped=true");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Translate_vue_vue_type_style_index_0_id_7563604c_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Translate_vue_vue_type_style_index_0_id_7563604c_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Translate_vue_vue_type_style_index_0_id_7563604c_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Translate_vue_vue_type_style_index_0_id_7563604c_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Reader.vue?vue&type=style&index=0&id=2688351a&lang=scss":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Reader.vue?vue&type=style&index=0&id=2688351a&lang=scss ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Reader_vue_vue_type_style_index_0_id_2688351a_lang_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/sass-loader/dist/cjs.js!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Reader.vue?vue&type=style&index=0&id=2688351a&lang=scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Reader.vue?vue&type=style&index=0&id=2688351a&lang=scss");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Reader_vue_vue_type_style_index_0_id_2688351a_lang_scss__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Reader_vue_vue_type_style_index_0_id_2688351a_lang_scss__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Reader_vue_vue_type_style_index_0_id_2688351a_lang_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Reader_vue_vue_type_style_index_0_id_2688351a_lang_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/RichTextReader.vue?vue&type=style&index=0&id=f1ccc308&lang=scss":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/RichTextReader.vue?vue&type=style&index=0&id=f1ccc308&lang=scss ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_RichTextReader_vue_vue_type_style_index_0_id_f1ccc308_lang_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/sass-loader/dist/cjs.js!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./RichTextReader.vue?vue&type=style&index=0&id=f1ccc308&lang=scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/RichTextReader.vue?vue&type=style&index=0&id=f1ccc308&lang=scss");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_RichTextReader_vue_vue_type_style_index_0_id_f1ccc308_lang_scss__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_RichTextReader_vue_vue_type_style_index_0_id_f1ccc308_lang_scss__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_RichTextReader_vue_vue_type_style_index_0_id_f1ccc308_lang_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_RichTextReader_vue_vue_type_style_index_0_id_f1ccc308_lang_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/SkeletonLoading.vue?vue&type=style&index=0&id=5a999aaf&lang=scss&scoped=true":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/SkeletonLoading.vue?vue&type=style&index=0&id=5a999aaf&lang=scss&scoped=true ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_SkeletonLoading_vue_vue_type_style_index_0_id_5a999aaf_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/sass-loader/dist/cjs.js!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./SkeletonLoading.vue?vue&type=style&index=0&id=5a999aaf&lang=scss&scoped=true */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/SkeletonLoading.vue?vue&type=style&index=0&id=5a999aaf&lang=scss&scoped=true");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_SkeletonLoading_vue_vue_type_style_index_0_id_5a999aaf_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_SkeletonLoading_vue_vue_type_style_index_0_id_5a999aaf_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_SkeletonLoading_vue_vue_type_style_index_0_id_5a999aaf_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_SkeletonLoading_vue_vue_type_style_index_0_id_5a999aaf_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Suggestion/Mention/AutoCompleteResult.vue?vue&type=style&index=0&id=44fd7335&lang=scss&scoped=true":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Suggestion/Mention/AutoCompleteResult.vue?vue&type=style&index=0&id=44fd7335&lang=scss&scoped=true ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_AutoCompleteResult_vue_vue_type_style_index_0_id_44fd7335_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../../node_modules/css-loader/dist/cjs.js!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/sass-loader/dist/cjs.js!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./AutoCompleteResult.vue?vue&type=style&index=0&id=44fd7335&lang=scss&scoped=true */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Suggestion/Mention/AutoCompleteResult.vue?vue&type=style&index=0&id=44fd7335&lang=scss&scoped=true");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_AutoCompleteResult_vue_vue_type_style_index_0_id_44fd7335_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_AutoCompleteResult_vue_vue_type_style_index_0_id_44fd7335_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_AutoCompleteResult_vue_vue_type_style_index_0_id_44fd7335_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_AutoCompleteResult_vue_vue_type_style_index_0_id_44fd7335_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Suggestion/Mention/MentionList.vue?vue&type=style&index=0&id=57ffd330&lang=scss":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Suggestion/Mention/MentionList.vue?vue&type=style&index=0&id=57ffd330&lang=scss ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_MentionList_vue_vue_type_style_index_0_id_57ffd330_lang_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../../node_modules/css-loader/dist/cjs.js!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/sass-loader/dist/cjs.js!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./MentionList.vue?vue&type=style&index=0&id=57ffd330&lang=scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Suggestion/Mention/MentionList.vue?vue&type=style&index=0&id=57ffd330&lang=scss");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_MentionList_vue_vue_type_style_index_0_id_57ffd330_lang_scss__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_MentionList_vue_vue_type_style_index_0_id_57ffd330_lang_scss__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_MentionList_vue_vue_type_style_index_0_id_57ffd330_lang_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_MentionList_vue_vue_type_style_index_0_id_57ffd330_lang_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/views/DirectEditing.vue?vue&type=style&index=0&id=37e36225&lang=scss":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/views/DirectEditing.vue?vue&type=style&index=0&id=37e36225&lang=scss ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_DirectEditing_vue_vue_type_style_index_0_id_37e36225_lang_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/sass-loader/dist/cjs.js!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./DirectEditing.vue?vue&type=style&index=0&id=37e36225&lang=scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/views/DirectEditing.vue?vue&type=style&index=0&id=37e36225&lang=scss");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_DirectEditing_vue_vue_type_style_index_0_id_37e36225_lang_scss__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_DirectEditing_vue_vue_type_style_index_0_id_37e36225_lang_scss__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_DirectEditing_vue_vue_type_style_index_0_id_37e36225_lang_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_DirectEditing_vue_vue_type_style_index_0_id_37e36225_lang_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/views/DirectEditing.vue?vue&type=style&index=1&id=37e36225&scoped=true&lang=scss":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/views/DirectEditing.vue?vue&type=style&index=1&id=37e36225&scoped=true&lang=scss ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_DirectEditing_vue_vue_type_style_index_1_id_37e36225_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/sass-loader/dist/cjs.js!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./DirectEditing.vue?vue&type=style&index=1&id=37e36225&scoped=true&lang=scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/views/DirectEditing.vue?vue&type=style&index=1&id=37e36225&scoped=true&lang=scss");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_DirectEditing_vue_vue_type_style_index_1_id_37e36225_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_DirectEditing_vue_vue_type_style_index_1_id_37e36225_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_DirectEditing_vue_vue_type_style_index_1_id_37e36225_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_DirectEditing_vue_vue_type_style_index_1_id_37e36225_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Menu/ReadonlyBar.vue?vue&type=style&index=0&id=2716d951&scoped=true&lang=css":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Menu/ReadonlyBar.vue?vue&type=style&index=0&id=2716d951&scoped=true&lang=css ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ReadonlyBar_vue_vue_type_style_index_0_id_2716d951_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ReadonlyBar.vue?vue&type=style&index=0&id=2716d951&scoped=true&lang=css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Menu/ReadonlyBar.vue?vue&type=style&index=0&id=2716d951&scoped=true&lang=css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ReadonlyBar_vue_vue_type_style_index_0_id_2716d951_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ReadonlyBar_vue_vue_type_style_index_0_id_2716d951_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ReadonlyBar_vue_vue_type_style_index_0_id_2716d951_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ReadonlyBar_vue_vue_type_style_index_0_id_2716d951_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/components/Assistant.vue":
/*!**************************************!*\
  !*** ./src/components/Assistant.vue ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Assistant_vue_vue_type_template_id_37cbcbde_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Assistant.vue?vue&type=template&id=37cbcbde&scoped=true */ "./src/components/Assistant.vue?vue&type=template&id=37cbcbde&scoped=true");
/* harmony import */ var _Assistant_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Assistant.vue?vue&type=script&lang=js */ "./src/components/Assistant.vue?vue&type=script&lang=js");
/* harmony import */ var _Assistant_vue_vue_type_style_index_0_id_37cbcbde_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Assistant.vue?vue&type=style&index=0&id=37cbcbde&scoped=true&lang=scss */ "./src/components/Assistant.vue?vue&type=style&index=0&id=37cbcbde&scoped=true&lang=scss");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Assistant_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _Assistant_vue_vue_type_template_id_37cbcbde_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render,
  _Assistant_vue_vue_type_template_id_37cbcbde_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "37cbcbde",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/components/Assistant.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./src/components/BaseReader.vue":
/*!***************************************!*\
  !*** ./src/components/BaseReader.vue ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _BaseReader_vue_vue_type_template_id_364eab24_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseReader.vue?vue&type=template&id=364eab24&scoped=true */ "./src/components/BaseReader.vue?vue&type=template&id=364eab24&scoped=true");
/* harmony import */ var _BaseReader_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BaseReader.vue?vue&type=script&lang=js */ "./src/components/BaseReader.vue?vue&type=script&lang=js");
/* harmony import */ var _BaseReader_vue_vue_type_style_index_0_id_364eab24_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./BaseReader.vue?vue&type=style&index=0&id=364eab24&scoped=true&lang=scss */ "./src/components/BaseReader.vue?vue&type=style&index=0&id=364eab24&scoped=true&lang=scss");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _BaseReader_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _BaseReader_vue_vue_type_template_id_364eab24_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render,
  _BaseReader_vue_vue_type_template_id_364eab24_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "364eab24",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/components/BaseReader.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./src/components/CollisionResolveDialog.vue":
/*!***************************************************!*\
  !*** ./src/components/CollisionResolveDialog.vue ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _CollisionResolveDialog_vue_vue_type_template_id_5ffe7972_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CollisionResolveDialog.vue?vue&type=template&id=5ffe7972&scoped=true */ "./src/components/CollisionResolveDialog.vue?vue&type=template&id=5ffe7972&scoped=true");
/* harmony import */ var _CollisionResolveDialog_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CollisionResolveDialog.vue?vue&type=script&lang=js */ "./src/components/CollisionResolveDialog.vue?vue&type=script&lang=js");
/* harmony import */ var _CollisionResolveDialog_vue_vue_type_style_index_0_id_5ffe7972_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CollisionResolveDialog.vue?vue&type=style&index=0&id=5ffe7972&scoped=true&lang=scss */ "./src/components/CollisionResolveDialog.vue?vue&type=style&index=0&id=5ffe7972&scoped=true&lang=scss");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _CollisionResolveDialog_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _CollisionResolveDialog_vue_vue_type_template_id_5ffe7972_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render,
  _CollisionResolveDialog_vue_vue_type_template_id_5ffe7972_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "5ffe7972",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/components/CollisionResolveDialog.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./src/components/Editor.vue":
/*!***********************************!*\
  !*** ./src/components/Editor.vue ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Editor_vue_vue_type_template_id_e18b6dc6_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Editor.vue?vue&type=template&id=e18b6dc6&scoped=true */ "./src/components/Editor.vue?vue&type=template&id=e18b6dc6&scoped=true");
/* harmony import */ var _Editor_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Editor.vue?vue&type=script&lang=js */ "./src/components/Editor.vue?vue&type=script&lang=js");
/* harmony import */ var _Editor_vue_vue_type_style_index_0_id_e18b6dc6_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Editor.vue?vue&type=style&index=0&id=e18b6dc6&scoped=true&lang=scss */ "./src/components/Editor.vue?vue&type=style&index=0&id=e18b6dc6&scoped=true&lang=scss");
/* harmony import */ var _Editor_vue_vue_type_style_index_1_id_e18b6dc6_lang_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Editor.vue?vue&type=style&index=1&id=e18b6dc6&lang=scss */ "./src/components/Editor.vue?vue&type=style&index=1&id=e18b6dc6&lang=scss");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;



/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_4__["default"])(
  _Editor_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _Editor_vue_vue_type_template_id_e18b6dc6_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render,
  _Editor_vue_vue_type_template_id_e18b6dc6_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "e18b6dc6",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/components/Editor.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./src/components/Editor/ContentContainer.vue":
/*!****************************************************!*\
  !*** ./src/components/Editor/ContentContainer.vue ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ContentContainer_vue_vue_type_template_id_e4c6ecec_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ContentContainer.vue?vue&type=template&id=e4c6ecec&scoped=true */ "./src/components/Editor/ContentContainer.vue?vue&type=template&id=e4c6ecec&scoped=true");
/* harmony import */ var _ContentContainer_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ContentContainer.vue?vue&type=script&lang=js */ "./src/components/Editor/ContentContainer.vue?vue&type=script&lang=js");
/* harmony import */ var _ContentContainer_vue_vue_type_style_index_0_id_e4c6ecec_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ContentContainer.vue?vue&type=style&index=0&id=e4c6ecec&scoped=true&lang=scss */ "./src/components/Editor/ContentContainer.vue?vue&type=style&index=0&id=e4c6ecec&scoped=true&lang=scss");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _ContentContainer_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _ContentContainer_vue_vue_type_template_id_e4c6ecec_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render,
  _ContentContainer_vue_vue_type_template_id_e4c6ecec_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "e4c6ecec",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/components/Editor/ContentContainer.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./src/components/Editor/DocumentStatus.vue":
/*!**************************************************!*\
  !*** ./src/components/Editor/DocumentStatus.vue ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _DocumentStatus_vue_vue_type_template_id_5f451e6f_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DocumentStatus.vue?vue&type=template&id=5f451e6f&scoped=true */ "./src/components/Editor/DocumentStatus.vue?vue&type=template&id=5f451e6f&scoped=true");
/* harmony import */ var _DocumentStatus_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DocumentStatus.vue?vue&type=script&lang=js */ "./src/components/Editor/DocumentStatus.vue?vue&type=script&lang=js");
/* harmony import */ var _DocumentStatus_vue_vue_type_style_index_0_id_5f451e6f_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DocumentStatus.vue?vue&type=style&index=0&id=5f451e6f&scoped=true&lang=scss */ "./src/components/Editor/DocumentStatus.vue?vue&type=style&index=0&id=5f451e6f&scoped=true&lang=scss");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _DocumentStatus_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _DocumentStatus_vue_vue_type_template_id_5f451e6f_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render,
  _DocumentStatus_vue_vue_type_template_id_5f451e6f_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "5f451e6f",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/components/Editor/DocumentStatus.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./src/components/Editor/MainContainer.vue":
/*!*************************************************!*\
  !*** ./src/components/Editor/MainContainer.vue ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _MainContainer_vue_vue_type_template_id_745ee2b6_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MainContainer.vue?vue&type=template&id=745ee2b6&scoped=true */ "./src/components/Editor/MainContainer.vue?vue&type=template&id=745ee2b6&scoped=true");
/* harmony import */ var _MainContainer_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MainContainer.vue?vue&type=script&lang=js */ "./src/components/Editor/MainContainer.vue?vue&type=script&lang=js");
/* harmony import */ var _MainContainer_vue_vue_type_style_index_0_id_745ee2b6_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./MainContainer.vue?vue&type=style&index=0&id=745ee2b6&scoped=true&lang=scss */ "./src/components/Editor/MainContainer.vue?vue&type=style&index=0&id=745ee2b6&scoped=true&lang=scss");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _MainContainer_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _MainContainer_vue_vue_type_template_id_745ee2b6_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render,
  _MainContainer_vue_vue_type_template_id_745ee2b6_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "745ee2b6",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/components/Editor/MainContainer.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./src/components/Editor/MarkdownContentEditor.vue":
/*!*********************************************************!*\
  !*** ./src/components/Editor/MarkdownContentEditor.vue ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _MarkdownContentEditor_vue_vue_type_template_id_053dcdf6_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MarkdownContentEditor.vue?vue&type=template&id=053dcdf6&scoped=true */ "./src/components/Editor/MarkdownContentEditor.vue?vue&type=template&id=053dcdf6&scoped=true");
/* harmony import */ var _MarkdownContentEditor_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MarkdownContentEditor.vue?vue&type=script&lang=js */ "./src/components/Editor/MarkdownContentEditor.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _MarkdownContentEditor_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _MarkdownContentEditor_vue_vue_type_template_id_053dcdf6_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render,
  _MarkdownContentEditor_vue_vue_type_template_id_053dcdf6_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "053dcdf6",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/components/Editor/MarkdownContentEditor.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./src/components/Editor/MediaHandler.vue":
/*!************************************************!*\
  !*** ./src/components/Editor/MediaHandler.vue ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _MediaHandler_vue_vue_type_template_id_7fc56648__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MediaHandler.vue?vue&type=template&id=7fc56648 */ "./src/components/Editor/MediaHandler.vue?vue&type=template&id=7fc56648");
/* harmony import */ var _MediaHandler_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MediaHandler.vue?vue&type=script&lang=js */ "./src/components/Editor/MediaHandler.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _MediaHandler_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _MediaHandler_vue_vue_type_template_id_7fc56648__WEBPACK_IMPORTED_MODULE_0__.render,
  _MediaHandler_vue_vue_type_template_id_7fc56648__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/components/Editor/MediaHandler.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./src/components/Editor/Status.vue":
/*!******************************************!*\
  !*** ./src/components/Editor/Status.vue ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Status_vue_vue_type_template_id_7749e0f4_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Status.vue?vue&type=template&id=7749e0f4&scoped=true */ "./src/components/Editor/Status.vue?vue&type=template&id=7749e0f4&scoped=true");
/* harmony import */ var _Status_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Status.vue?vue&type=script&lang=js */ "./src/components/Editor/Status.vue?vue&type=script&lang=js");
/* harmony import */ var _Status_vue_vue_type_style_index_0_id_7749e0f4_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Status.vue?vue&type=style&index=0&id=7749e0f4&scoped=true&lang=scss */ "./src/components/Editor/Status.vue?vue&type=style&index=0&id=7749e0f4&scoped=true&lang=scss");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Status_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _Status_vue_vue_type_template_id_7749e0f4_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render,
  _Status_vue_vue_type_template_id_7749e0f4_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "7749e0f4",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/components/Editor/Status.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./src/components/Editor/Wrapper.vue":
/*!*******************************************!*\
  !*** ./src/components/Editor/Wrapper.vue ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Wrapper_vue_vue_type_template_id_20a7fb81_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Wrapper.vue?vue&type=template&id=20a7fb81&scoped=true */ "./src/components/Editor/Wrapper.vue?vue&type=template&id=20a7fb81&scoped=true");
/* harmony import */ var _Wrapper_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Wrapper.vue?vue&type=script&lang=js */ "./src/components/Editor/Wrapper.vue?vue&type=script&lang=js");
/* harmony import */ var _Wrapper_vue_vue_type_style_index_0_id_20a7fb81_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Wrapper.vue?vue&type=style&index=0&id=20a7fb81&scoped=true&lang=scss */ "./src/components/Editor/Wrapper.vue?vue&type=style&index=0&id=20a7fb81&scoped=true&lang=scss");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Wrapper_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _Wrapper_vue_vue_type_template_id_20a7fb81_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render,
  _Wrapper_vue_vue_type_template_id_20a7fb81_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "20a7fb81",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/components/Editor/Wrapper.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./src/components/HelpModal.vue":
/*!**************************************!*\
  !*** ./src/components/HelpModal.vue ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _HelpModal_vue_vue_type_template_id_6befbdec_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./HelpModal.vue?vue&type=template&id=6befbdec&scoped=true */ "./src/components/HelpModal.vue?vue&type=template&id=6befbdec&scoped=true");
/* harmony import */ var _HelpModal_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./HelpModal.vue?vue&type=script&lang=js */ "./src/components/HelpModal.vue?vue&type=script&lang=js");
/* harmony import */ var _HelpModal_vue_vue_type_style_index_0_id_6befbdec_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./HelpModal.vue?vue&type=style&index=0&id=6befbdec&lang=scss&scoped=true */ "./src/components/HelpModal.vue?vue&type=style&index=0&id=6befbdec&lang=scss&scoped=true");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _HelpModal_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _HelpModal_vue_vue_type_template_id_6befbdec_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render,
  _HelpModal_vue_vue_type_template_id_6befbdec_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "6befbdec",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/components/HelpModal.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./src/components/Menu/ActionFormattingHelp.vue":
/*!******************************************************!*\
  !*** ./src/components/Menu/ActionFormattingHelp.vue ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ActionFormattingHelp_vue_vue_type_template_id_566018ec__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ActionFormattingHelp.vue?vue&type=template&id=566018ec */ "./src/components/Menu/ActionFormattingHelp.vue?vue&type=template&id=566018ec");
/* harmony import */ var _ActionFormattingHelp_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ActionFormattingHelp.vue?vue&type=script&lang=js */ "./src/components/Menu/ActionFormattingHelp.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ActionFormattingHelp_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _ActionFormattingHelp_vue_vue_type_template_id_566018ec__WEBPACK_IMPORTED_MODULE_0__.render,
  _ActionFormattingHelp_vue_vue_type_template_id_566018ec__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/components/Menu/ActionFormattingHelp.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./src/components/Menu/ActionList.vue":
/*!********************************************!*\
  !*** ./src/components/Menu/ActionList.vue ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ActionList_vue_vue_type_template_id_6f5cb6c4__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ActionList.vue?vue&type=template&id=6f5cb6c4 */ "./src/components/Menu/ActionList.vue?vue&type=template&id=6f5cb6c4");
/* harmony import */ var _ActionList_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ActionList.vue?vue&type=script&lang=js */ "./src/components/Menu/ActionList.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ActionList_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _ActionList_vue_vue_type_template_id_6f5cb6c4__WEBPACK_IMPORTED_MODULE_0__.render,
  _ActionList_vue_vue_type_template_id_6f5cb6c4__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/components/Menu/ActionList.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./src/components/Menu/ActionListItem.vue":
/*!************************************************!*\
  !*** ./src/components/Menu/ActionListItem.vue ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ActionListItem_vue_vue_type_template_id_3dee4312__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ActionListItem.vue?vue&type=template&id=3dee4312 */ "./src/components/Menu/ActionListItem.vue?vue&type=template&id=3dee4312");
/* harmony import */ var _ActionListItem_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ActionListItem.vue?vue&type=script&lang=js */ "./src/components/Menu/ActionListItem.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ActionListItem_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _ActionListItem_vue_vue_type_template_id_3dee4312__WEBPACK_IMPORTED_MODULE_0__.render,
  _ActionListItem_vue_vue_type_template_id_3dee4312__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/components/Menu/ActionListItem.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./src/components/Menu/ActionSingle.vue":
/*!**********************************************!*\
  !*** ./src/components/Menu/ActionSingle.vue ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ActionSingle_vue_vue_type_template_id_6ab239ee__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ActionSingle.vue?vue&type=template&id=6ab239ee */ "./src/components/Menu/ActionSingle.vue?vue&type=template&id=6ab239ee");
/* harmony import */ var _ActionSingle_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ActionSingle.vue?vue&type=script&lang=js */ "./src/components/Menu/ActionSingle.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ActionSingle_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _ActionSingle_vue_vue_type_template_id_6ab239ee__WEBPACK_IMPORTED_MODULE_0__.render,
  _ActionSingle_vue_vue_type_template_id_6ab239ee__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/components/Menu/ActionSingle.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./src/components/Menu/CharacterCount.vue":
/*!************************************************!*\
  !*** ./src/components/Menu/CharacterCount.vue ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _CharacterCount_vue_vue_type_template_id_097c7136__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CharacterCount.vue?vue&type=template&id=097c7136 */ "./src/components/Menu/CharacterCount.vue?vue&type=template&id=097c7136");
/* harmony import */ var _CharacterCount_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CharacterCount.vue?vue&type=script&lang=js */ "./src/components/Menu/CharacterCount.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _CharacterCount_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _CharacterCount_vue_vue_type_template_id_097c7136__WEBPACK_IMPORTED_MODULE_0__.render,
  _CharacterCount_vue_vue_type_template_id_097c7136__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/components/Menu/CharacterCount.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./src/components/Menu/MenuBar.vue":
/*!*****************************************!*\
  !*** ./src/components/Menu/MenuBar.vue ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _MenuBar_vue_vue_type_template_id_10e748d8_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MenuBar.vue?vue&type=template&id=10e748d8&scoped=true */ "./src/components/Menu/MenuBar.vue?vue&type=template&id=10e748d8&scoped=true");
/* harmony import */ var _MenuBar_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MenuBar.vue?vue&type=script&lang=js */ "./src/components/Menu/MenuBar.vue?vue&type=script&lang=js");
/* harmony import */ var _MenuBar_vue_vue_type_style_index_0_id_10e748d8_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./MenuBar.vue?vue&type=style&index=0&id=10e748d8&scoped=true&lang=scss */ "./src/components/Menu/MenuBar.vue?vue&type=style&index=0&id=10e748d8&scoped=true&lang=scss");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _MenuBar_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _MenuBar_vue_vue_type_template_id_10e748d8_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render,
  _MenuBar_vue_vue_type_template_id_10e748d8_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "10e748d8",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/components/Menu/MenuBar.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./src/components/Menu/ReadonlyBar.vue":
/*!*********************************************!*\
  !*** ./src/components/Menu/ReadonlyBar.vue ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ReadonlyBar_vue_vue_type_template_id_2716d951_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ReadonlyBar.vue?vue&type=template&id=2716d951&scoped=true */ "./src/components/Menu/ReadonlyBar.vue?vue&type=template&id=2716d951&scoped=true");
/* harmony import */ var _ReadonlyBar_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ReadonlyBar.vue?vue&type=script&lang=js */ "./src/components/Menu/ReadonlyBar.vue?vue&type=script&lang=js");
/* harmony import */ var _ReadonlyBar_vue_vue_type_style_index_0_id_2716d951_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ReadonlyBar.vue?vue&type=style&index=0&id=2716d951&scoped=true&lang=css */ "./src/components/Menu/ReadonlyBar.vue?vue&type=style&index=0&id=2716d951&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _ReadonlyBar_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _ReadonlyBar_vue_vue_type_template_id_2716d951_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render,
  _ReadonlyBar_vue_vue_type_template_id_2716d951_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "2716d951",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/components/Menu/ReadonlyBar.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./src/components/Modal/Translate.vue":
/*!********************************************!*\
  !*** ./src/components/Modal/Translate.vue ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Translate_vue_vue_type_template_id_7563604c_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Translate.vue?vue&type=template&id=7563604c&scoped=true */ "./src/components/Modal/Translate.vue?vue&type=template&id=7563604c&scoped=true");
/* harmony import */ var _Translate_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Translate.vue?vue&type=script&lang=js */ "./src/components/Modal/Translate.vue?vue&type=script&lang=js");
/* harmony import */ var _Translate_vue_vue_type_style_index_0_id_7563604c_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Translate.vue?vue&type=style&index=0&id=7563604c&lang=scss&scoped=true */ "./src/components/Modal/Translate.vue?vue&type=style&index=0&id=7563604c&lang=scss&scoped=true");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Translate_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _Translate_vue_vue_type_template_id_7563604c_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render,
  _Translate_vue_vue_type_template_id_7563604c_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "7563604c",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/components/Modal/Translate.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./src/components/PlainTextReader.vue":
/*!********************************************!*\
  !*** ./src/components/PlainTextReader.vue ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _PlainTextReader_vue_vue_type_template_id_513792ba__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PlainTextReader.vue?vue&type=template&id=513792ba */ "./src/components/PlainTextReader.vue?vue&type=template&id=513792ba");
/* harmony import */ var _PlainTextReader_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PlainTextReader.vue?vue&type=script&lang=js */ "./src/components/PlainTextReader.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _PlainTextReader_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _PlainTextReader_vue_vue_type_template_id_513792ba__WEBPACK_IMPORTED_MODULE_0__.render,
  _PlainTextReader_vue_vue_type_template_id_513792ba__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/components/PlainTextReader.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./src/components/Reader.vue":
/*!***********************************!*\
  !*** ./src/components/Reader.vue ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Reader_vue_vue_type_template_id_2688351a__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Reader.vue?vue&type=template&id=2688351a */ "./src/components/Reader.vue?vue&type=template&id=2688351a");
/* harmony import */ var _Reader_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Reader.vue?vue&type=script&lang=js */ "./src/components/Reader.vue?vue&type=script&lang=js");
/* harmony import */ var _Reader_vue_vue_type_style_index_0_id_2688351a_lang_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Reader.vue?vue&type=style&index=0&id=2688351a&lang=scss */ "./src/components/Reader.vue?vue&type=style&index=0&id=2688351a&lang=scss");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Reader_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _Reader_vue_vue_type_template_id_2688351a__WEBPACK_IMPORTED_MODULE_0__.render,
  _Reader_vue_vue_type_template_id_2688351a__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/components/Reader.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./src/components/RichTextReader.vue":
/*!*******************************************!*\
  !*** ./src/components/RichTextReader.vue ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _RichTextReader_vue_vue_type_template_id_f1ccc308__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RichTextReader.vue?vue&type=template&id=f1ccc308 */ "./src/components/RichTextReader.vue?vue&type=template&id=f1ccc308");
/* harmony import */ var _RichTextReader_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./RichTextReader.vue?vue&type=script&lang=js */ "./src/components/RichTextReader.vue?vue&type=script&lang=js");
/* harmony import */ var _RichTextReader_vue_vue_type_style_index_0_id_f1ccc308_lang_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./RichTextReader.vue?vue&type=style&index=0&id=f1ccc308&lang=scss */ "./src/components/RichTextReader.vue?vue&type=style&index=0&id=f1ccc308&lang=scss");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _RichTextReader_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _RichTextReader_vue_vue_type_template_id_f1ccc308__WEBPACK_IMPORTED_MODULE_0__.render,
  _RichTextReader_vue_vue_type_template_id_f1ccc308__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/components/RichTextReader.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./src/components/SkeletonLoading.vue":
/*!********************************************!*\
  !*** ./src/components/SkeletonLoading.vue ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _SkeletonLoading_vue_vue_type_template_id_5a999aaf_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SkeletonLoading.vue?vue&type=template&id=5a999aaf&scoped=true */ "./src/components/SkeletonLoading.vue?vue&type=template&id=5a999aaf&scoped=true");
/* harmony import */ var _SkeletonLoading_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SkeletonLoading.vue?vue&type=script&lang=js */ "./src/components/SkeletonLoading.vue?vue&type=script&lang=js");
/* harmony import */ var _SkeletonLoading_vue_vue_type_style_index_0_id_5a999aaf_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SkeletonLoading.vue?vue&type=style&index=0&id=5a999aaf&lang=scss&scoped=true */ "./src/components/SkeletonLoading.vue?vue&type=style&index=0&id=5a999aaf&lang=scss&scoped=true");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _SkeletonLoading_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _SkeletonLoading_vue_vue_type_template_id_5a999aaf_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render,
  _SkeletonLoading_vue_vue_type_template_id_5a999aaf_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "5a999aaf",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/components/SkeletonLoading.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./src/components/Suggestion/Mention/AutoCompleteResult.vue":
/*!******************************************************************!*\
  !*** ./src/components/Suggestion/Mention/AutoCompleteResult.vue ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _AutoCompleteResult_vue_vue_type_template_id_44fd7335_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AutoCompleteResult.vue?vue&type=template&id=44fd7335&scoped=true */ "./src/components/Suggestion/Mention/AutoCompleteResult.vue?vue&type=template&id=44fd7335&scoped=true");
/* harmony import */ var _AutoCompleteResult_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AutoCompleteResult.vue?vue&type=script&lang=js */ "./src/components/Suggestion/Mention/AutoCompleteResult.vue?vue&type=script&lang=js");
/* harmony import */ var _AutoCompleteResult_vue_vue_type_style_index_0_id_44fd7335_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AutoCompleteResult.vue?vue&type=style&index=0&id=44fd7335&lang=scss&scoped=true */ "./src/components/Suggestion/Mention/AutoCompleteResult.vue?vue&type=style&index=0&id=44fd7335&lang=scss&scoped=true");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _AutoCompleteResult_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _AutoCompleteResult_vue_vue_type_template_id_44fd7335_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render,
  _AutoCompleteResult_vue_vue_type_template_id_44fd7335_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "44fd7335",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/components/Suggestion/Mention/AutoCompleteResult.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./src/components/Suggestion/Mention/MentionList.vue":
/*!***********************************************************!*\
  !*** ./src/components/Suggestion/Mention/MentionList.vue ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _MentionList_vue_vue_type_template_id_57ffd330__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MentionList.vue?vue&type=template&id=57ffd330 */ "./src/components/Suggestion/Mention/MentionList.vue?vue&type=template&id=57ffd330");
/* harmony import */ var _MentionList_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MentionList.vue?vue&type=script&lang=js */ "./src/components/Suggestion/Mention/MentionList.vue?vue&type=script&lang=js");
/* harmony import */ var _MentionList_vue_vue_type_style_index_0_id_57ffd330_lang_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./MentionList.vue?vue&type=style&index=0&id=57ffd330&lang=scss */ "./src/components/Suggestion/Mention/MentionList.vue?vue&type=style&index=0&id=57ffd330&lang=scss");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _MentionList_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _MentionList_vue_vue_type_template_id_57ffd330__WEBPACK_IMPORTED_MODULE_0__.render,
  _MentionList_vue_vue_type_template_id_57ffd330__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/components/Suggestion/Mention/MentionList.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./src/views/DirectEditing.vue":
/*!*************************************!*\
  !*** ./src/views/DirectEditing.vue ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _DirectEditing_vue_vue_type_template_id_37e36225_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DirectEditing.vue?vue&type=template&id=37e36225&scoped=true */ "./src/views/DirectEditing.vue?vue&type=template&id=37e36225&scoped=true");
/* harmony import */ var _DirectEditing_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DirectEditing.vue?vue&type=script&lang=js */ "./src/views/DirectEditing.vue?vue&type=script&lang=js");
/* harmony import */ var _DirectEditing_vue_vue_type_style_index_0_id_37e36225_lang_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DirectEditing.vue?vue&type=style&index=0&id=37e36225&lang=scss */ "./src/views/DirectEditing.vue?vue&type=style&index=0&id=37e36225&lang=scss");
/* harmony import */ var _DirectEditing_vue_vue_type_style_index_1_id_37e36225_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./DirectEditing.vue?vue&type=style&index=1&id=37e36225&scoped=true&lang=scss */ "./src/views/DirectEditing.vue?vue&type=style&index=1&id=37e36225&scoped=true&lang=scss");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;



/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_4__["default"])(
  _DirectEditing_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _DirectEditing_vue_vue_type_template_id_37e36225_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render,
  _DirectEditing_vue_vue_type_template_id_37e36225_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "37e36225",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/views/DirectEditing.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./src/components/Assistant.vue?vue&type=script&lang=js":
/*!**************************************************************!*\
  !*** ./src/components/Assistant.vue?vue&type=script&lang=js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Assistant_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib/index.js!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Assistant.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Assistant.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Assistant_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/components/BaseReader.vue?vue&type=script&lang=js":
/*!***************************************************************!*\
  !*** ./src/components/BaseReader.vue?vue&type=script&lang=js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_BaseReader_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib/index.js!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./BaseReader.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/BaseReader.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_BaseReader_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/components/CollisionResolveDialog.vue?vue&type=script&lang=js":
/*!***************************************************************************!*\
  !*** ./src/components/CollisionResolveDialog.vue?vue&type=script&lang=js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_CollisionResolveDialog_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib/index.js!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./CollisionResolveDialog.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/CollisionResolveDialog.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_CollisionResolveDialog_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/components/Editor.vue?vue&type=script&lang=js":
/*!***********************************************************!*\
  !*** ./src/components/Editor.vue?vue&type=script&lang=js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Editor_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib/index.js!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Editor.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Editor.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Editor_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/components/Editor/ContentContainer.vue?vue&type=script&lang=js":
/*!****************************************************************************!*\
  !*** ./src/components/Editor/ContentContainer.vue?vue&type=script&lang=js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentContainer_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ContentContainer.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Editor/ContentContainer.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentContainer_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/components/Editor/DocumentStatus.vue?vue&type=script&lang=js":
/*!**************************************************************************!*\
  !*** ./src/components/Editor/DocumentStatus.vue?vue&type=script&lang=js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_DocumentStatus_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./DocumentStatus.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Editor/DocumentStatus.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_DocumentStatus_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/components/Editor/MainContainer.vue?vue&type=script&lang=js":
/*!*************************************************************************!*\
  !*** ./src/components/Editor/MainContainer.vue?vue&type=script&lang=js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_MainContainer_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./MainContainer.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Editor/MainContainer.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_MainContainer_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/components/Editor/MarkdownContentEditor.vue?vue&type=script&lang=js":
/*!*********************************************************************************!*\
  !*** ./src/components/Editor/MarkdownContentEditor.vue?vue&type=script&lang=js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_MarkdownContentEditor_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./MarkdownContentEditor.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Editor/MarkdownContentEditor.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_MarkdownContentEditor_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/components/Editor/MediaHandler.vue?vue&type=script&lang=js":
/*!************************************************************************!*\
  !*** ./src/components/Editor/MediaHandler.vue?vue&type=script&lang=js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_MediaHandler_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./MediaHandler.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Editor/MediaHandler.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_MediaHandler_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/components/Editor/Status.vue?vue&type=script&lang=js":
/*!******************************************************************!*\
  !*** ./src/components/Editor/Status.vue?vue&type=script&lang=js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Status_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Status.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Editor/Status.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Status_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/components/Editor/Wrapper.vue?vue&type=script&lang=js":
/*!*******************************************************************!*\
  !*** ./src/components/Editor/Wrapper.vue?vue&type=script&lang=js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Wrapper_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Wrapper.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Editor/Wrapper.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Wrapper_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/components/HelpModal.vue?vue&type=script&lang=js":
/*!**************************************************************!*\
  !*** ./src/components/HelpModal.vue?vue&type=script&lang=js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_HelpModal_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib/index.js!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./HelpModal.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/HelpModal.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_HelpModal_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/components/Menu/ActionFormattingHelp.vue?vue&type=script&lang=js":
/*!******************************************************************************!*\
  !*** ./src/components/Menu/ActionFormattingHelp.vue?vue&type=script&lang=js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ActionFormattingHelp_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ActionFormattingHelp.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Menu/ActionFormattingHelp.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ActionFormattingHelp_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/components/Menu/ActionList.vue?vue&type=script&lang=js":
/*!********************************************************************!*\
  !*** ./src/components/Menu/ActionList.vue?vue&type=script&lang=js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ActionList_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ActionList.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Menu/ActionList.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ActionList_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/components/Menu/ActionListItem.vue?vue&type=script&lang=js":
/*!************************************************************************!*\
  !*** ./src/components/Menu/ActionListItem.vue?vue&type=script&lang=js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ActionListItem_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ActionListItem.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Menu/ActionListItem.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ActionListItem_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/components/Menu/ActionSingle.vue?vue&type=script&lang=js":
/*!**********************************************************************!*\
  !*** ./src/components/Menu/ActionSingle.vue?vue&type=script&lang=js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ActionSingle_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ActionSingle.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Menu/ActionSingle.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ActionSingle_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/components/Menu/CharacterCount.vue?vue&type=script&lang=js":
/*!************************************************************************!*\
  !*** ./src/components/Menu/CharacterCount.vue?vue&type=script&lang=js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_CharacterCount_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./CharacterCount.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Menu/CharacterCount.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_CharacterCount_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/components/Menu/MenuBar.vue?vue&type=script&lang=js":
/*!*****************************************************************!*\
  !*** ./src/components/Menu/MenuBar.vue?vue&type=script&lang=js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_MenuBar_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./MenuBar.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Menu/MenuBar.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_MenuBar_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/components/Menu/ReadonlyBar.vue?vue&type=script&lang=js":
/*!*********************************************************************!*\
  !*** ./src/components/Menu/ReadonlyBar.vue?vue&type=script&lang=js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ReadonlyBar_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ReadonlyBar.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Menu/ReadonlyBar.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ReadonlyBar_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/components/Modal/Translate.vue?vue&type=script&lang=js":
/*!********************************************************************!*\
  !*** ./src/components/Modal/Translate.vue?vue&type=script&lang=js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Translate_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Translate.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Modal/Translate.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Translate_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/components/PlainTextReader.vue?vue&type=script&lang=js":
/*!********************************************************************!*\
  !*** ./src/components/PlainTextReader.vue?vue&type=script&lang=js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_PlainTextReader_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib/index.js!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./PlainTextReader.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/PlainTextReader.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_PlainTextReader_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/components/Reader.vue?vue&type=script&lang=js":
/*!***********************************************************!*\
  !*** ./src/components/Reader.vue?vue&type=script&lang=js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Reader_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib/index.js!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Reader.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Reader.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Reader_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/components/RichTextReader.vue?vue&type=script&lang=js":
/*!*******************************************************************!*\
  !*** ./src/components/RichTextReader.vue?vue&type=script&lang=js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_RichTextReader_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib/index.js!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./RichTextReader.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/RichTextReader.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_RichTextReader_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/components/SkeletonLoading.vue?vue&type=script&lang=js":
/*!********************************************************************!*\
  !*** ./src/components/SkeletonLoading.vue?vue&type=script&lang=js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_SkeletonLoading_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib/index.js!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./SkeletonLoading.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/SkeletonLoading.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_SkeletonLoading_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/components/Suggestion/Mention/AutoCompleteResult.vue?vue&type=script&lang=js":
/*!******************************************************************************************!*\
  !*** ./src/components/Suggestion/Mention/AutoCompleteResult.vue?vue&type=script&lang=js ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_AutoCompleteResult_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./AutoCompleteResult.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Suggestion/Mention/AutoCompleteResult.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_AutoCompleteResult_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/components/Suggestion/Mention/MentionList.vue?vue&type=script&lang=js":
/*!***********************************************************************************!*\
  !*** ./src/components/Suggestion/Mention/MentionList.vue?vue&type=script&lang=js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_MentionList_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./MentionList.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Suggestion/Mention/MentionList.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_MentionList_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/views/DirectEditing.vue?vue&type=script&lang=js":
/*!*************************************************************!*\
  !*** ./src/views/DirectEditing.vue?vue&type=script&lang=js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_DirectEditing_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib/index.js!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./DirectEditing.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/views/DirectEditing.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_DirectEditing_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/components/Assistant.vue?vue&type=template&id=37cbcbde&scoped=true":
/*!********************************************************************************!*\
  !*** ./src/components/Assistant.vue?vue&type=template&id=37cbcbde&scoped=true ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Assistant_vue_vue_type_template_id_37cbcbde_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Assistant_vue_vue_type_template_id_37cbcbde_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Assistant_vue_vue_type_template_id_37cbcbde_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib/index.js!../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Assistant.vue?vue&type=template&id=37cbcbde&scoped=true */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Assistant.vue?vue&type=template&id=37cbcbde&scoped=true");


/***/ }),

/***/ "./src/components/BaseReader.vue?vue&type=template&id=364eab24&scoped=true":
/*!*********************************************************************************!*\
  !*** ./src/components/BaseReader.vue?vue&type=template&id=364eab24&scoped=true ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_BaseReader_vue_vue_type_template_id_364eab24_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_BaseReader_vue_vue_type_template_id_364eab24_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_BaseReader_vue_vue_type_template_id_364eab24_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib/index.js!../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./BaseReader.vue?vue&type=template&id=364eab24&scoped=true */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/BaseReader.vue?vue&type=template&id=364eab24&scoped=true");


/***/ }),

/***/ "./src/components/CollisionResolveDialog.vue?vue&type=template&id=5ffe7972&scoped=true":
/*!*********************************************************************************************!*\
  !*** ./src/components/CollisionResolveDialog.vue?vue&type=template&id=5ffe7972&scoped=true ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_CollisionResolveDialog_vue_vue_type_template_id_5ffe7972_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_CollisionResolveDialog_vue_vue_type_template_id_5ffe7972_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_CollisionResolveDialog_vue_vue_type_template_id_5ffe7972_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib/index.js!../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./CollisionResolveDialog.vue?vue&type=template&id=5ffe7972&scoped=true */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/CollisionResolveDialog.vue?vue&type=template&id=5ffe7972&scoped=true");


/***/ }),

/***/ "./src/components/Editor.vue?vue&type=template&id=e18b6dc6&scoped=true":
/*!*****************************************************************************!*\
  !*** ./src/components/Editor.vue?vue&type=template&id=e18b6dc6&scoped=true ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Editor_vue_vue_type_template_id_e18b6dc6_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Editor_vue_vue_type_template_id_e18b6dc6_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Editor_vue_vue_type_template_id_e18b6dc6_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib/index.js!../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Editor.vue?vue&type=template&id=e18b6dc6&scoped=true */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Editor.vue?vue&type=template&id=e18b6dc6&scoped=true");


/***/ }),

/***/ "./src/components/Editor/ContentContainer.vue?vue&type=template&id=e4c6ecec&scoped=true":
/*!**********************************************************************************************!*\
  !*** ./src/components/Editor/ContentContainer.vue?vue&type=template&id=e4c6ecec&scoped=true ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentContainer_vue_vue_type_template_id_e4c6ecec_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentContainer_vue_vue_type_template_id_e4c6ecec_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentContainer_vue_vue_type_template_id_e4c6ecec_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ContentContainer.vue?vue&type=template&id=e4c6ecec&scoped=true */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Editor/ContentContainer.vue?vue&type=template&id=e4c6ecec&scoped=true");


/***/ }),

/***/ "./src/components/Editor/DocumentStatus.vue?vue&type=template&id=5f451e6f&scoped=true":
/*!********************************************************************************************!*\
  !*** ./src/components/Editor/DocumentStatus.vue?vue&type=template&id=5f451e6f&scoped=true ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_DocumentStatus_vue_vue_type_template_id_5f451e6f_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_DocumentStatus_vue_vue_type_template_id_5f451e6f_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_DocumentStatus_vue_vue_type_template_id_5f451e6f_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./DocumentStatus.vue?vue&type=template&id=5f451e6f&scoped=true */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Editor/DocumentStatus.vue?vue&type=template&id=5f451e6f&scoped=true");


/***/ }),

/***/ "./src/components/Editor/MainContainer.vue?vue&type=template&id=745ee2b6&scoped=true":
/*!*******************************************************************************************!*\
  !*** ./src/components/Editor/MainContainer.vue?vue&type=template&id=745ee2b6&scoped=true ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_MainContainer_vue_vue_type_template_id_745ee2b6_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_MainContainer_vue_vue_type_template_id_745ee2b6_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_MainContainer_vue_vue_type_template_id_745ee2b6_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./MainContainer.vue?vue&type=template&id=745ee2b6&scoped=true */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Editor/MainContainer.vue?vue&type=template&id=745ee2b6&scoped=true");


/***/ }),

/***/ "./src/components/Editor/MarkdownContentEditor.vue?vue&type=template&id=053dcdf6&scoped=true":
/*!***************************************************************************************************!*\
  !*** ./src/components/Editor/MarkdownContentEditor.vue?vue&type=template&id=053dcdf6&scoped=true ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_MarkdownContentEditor_vue_vue_type_template_id_053dcdf6_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_MarkdownContentEditor_vue_vue_type_template_id_053dcdf6_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_MarkdownContentEditor_vue_vue_type_template_id_053dcdf6_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./MarkdownContentEditor.vue?vue&type=template&id=053dcdf6&scoped=true */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Editor/MarkdownContentEditor.vue?vue&type=template&id=053dcdf6&scoped=true");


/***/ }),

/***/ "./src/components/Editor/MediaHandler.vue?vue&type=template&id=7fc56648":
/*!******************************************************************************!*\
  !*** ./src/components/Editor/MediaHandler.vue?vue&type=template&id=7fc56648 ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_MediaHandler_vue_vue_type_template_id_7fc56648__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_MediaHandler_vue_vue_type_template_id_7fc56648__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_MediaHandler_vue_vue_type_template_id_7fc56648__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./MediaHandler.vue?vue&type=template&id=7fc56648 */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Editor/MediaHandler.vue?vue&type=template&id=7fc56648");


/***/ }),

/***/ "./src/components/Editor/Status.vue?vue&type=template&id=7749e0f4&scoped=true":
/*!************************************************************************************!*\
  !*** ./src/components/Editor/Status.vue?vue&type=template&id=7749e0f4&scoped=true ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Status_vue_vue_type_template_id_7749e0f4_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Status_vue_vue_type_template_id_7749e0f4_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Status_vue_vue_type_template_id_7749e0f4_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Status.vue?vue&type=template&id=7749e0f4&scoped=true */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Editor/Status.vue?vue&type=template&id=7749e0f4&scoped=true");


/***/ }),

/***/ "./src/components/Editor/Wrapper.vue?vue&type=template&id=20a7fb81&scoped=true":
/*!*************************************************************************************!*\
  !*** ./src/components/Editor/Wrapper.vue?vue&type=template&id=20a7fb81&scoped=true ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Wrapper_vue_vue_type_template_id_20a7fb81_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Wrapper_vue_vue_type_template_id_20a7fb81_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Wrapper_vue_vue_type_template_id_20a7fb81_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Wrapper.vue?vue&type=template&id=20a7fb81&scoped=true */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Editor/Wrapper.vue?vue&type=template&id=20a7fb81&scoped=true");


/***/ }),

/***/ "./src/components/HelpModal.vue?vue&type=template&id=6befbdec&scoped=true":
/*!********************************************************************************!*\
  !*** ./src/components/HelpModal.vue?vue&type=template&id=6befbdec&scoped=true ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_HelpModal_vue_vue_type_template_id_6befbdec_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_HelpModal_vue_vue_type_template_id_6befbdec_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_HelpModal_vue_vue_type_template_id_6befbdec_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib/index.js!../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./HelpModal.vue?vue&type=template&id=6befbdec&scoped=true */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/HelpModal.vue?vue&type=template&id=6befbdec&scoped=true");


/***/ }),

/***/ "./src/components/Menu/ActionFormattingHelp.vue?vue&type=template&id=566018ec":
/*!************************************************************************************!*\
  !*** ./src/components/Menu/ActionFormattingHelp.vue?vue&type=template&id=566018ec ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_ActionFormattingHelp_vue_vue_type_template_id_566018ec__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_ActionFormattingHelp_vue_vue_type_template_id_566018ec__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_ActionFormattingHelp_vue_vue_type_template_id_566018ec__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ActionFormattingHelp.vue?vue&type=template&id=566018ec */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Menu/ActionFormattingHelp.vue?vue&type=template&id=566018ec");


/***/ }),

/***/ "./src/components/Menu/ActionList.vue?vue&type=template&id=6f5cb6c4":
/*!**************************************************************************!*\
  !*** ./src/components/Menu/ActionList.vue?vue&type=template&id=6f5cb6c4 ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_ActionList_vue_vue_type_template_id_6f5cb6c4__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_ActionList_vue_vue_type_template_id_6f5cb6c4__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_ActionList_vue_vue_type_template_id_6f5cb6c4__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ActionList.vue?vue&type=template&id=6f5cb6c4 */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Menu/ActionList.vue?vue&type=template&id=6f5cb6c4");


/***/ }),

/***/ "./src/components/Menu/ActionListItem.vue?vue&type=template&id=3dee4312":
/*!******************************************************************************!*\
  !*** ./src/components/Menu/ActionListItem.vue?vue&type=template&id=3dee4312 ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_ActionListItem_vue_vue_type_template_id_3dee4312__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_ActionListItem_vue_vue_type_template_id_3dee4312__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_ActionListItem_vue_vue_type_template_id_3dee4312__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ActionListItem.vue?vue&type=template&id=3dee4312 */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Menu/ActionListItem.vue?vue&type=template&id=3dee4312");


/***/ }),

/***/ "./src/components/Menu/ActionSingle.vue?vue&type=template&id=6ab239ee":
/*!****************************************************************************!*\
  !*** ./src/components/Menu/ActionSingle.vue?vue&type=template&id=6ab239ee ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_ActionSingle_vue_vue_type_template_id_6ab239ee__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_ActionSingle_vue_vue_type_template_id_6ab239ee__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_ActionSingle_vue_vue_type_template_id_6ab239ee__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ActionSingle.vue?vue&type=template&id=6ab239ee */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Menu/ActionSingle.vue?vue&type=template&id=6ab239ee");


/***/ }),

/***/ "./src/components/Menu/CharacterCount.vue?vue&type=template&id=097c7136":
/*!******************************************************************************!*\
  !*** ./src/components/Menu/CharacterCount.vue?vue&type=template&id=097c7136 ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_CharacterCount_vue_vue_type_template_id_097c7136__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_CharacterCount_vue_vue_type_template_id_097c7136__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_CharacterCount_vue_vue_type_template_id_097c7136__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./CharacterCount.vue?vue&type=template&id=097c7136 */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Menu/CharacterCount.vue?vue&type=template&id=097c7136");


/***/ }),

/***/ "./src/components/Menu/MenuBar.vue?vue&type=template&id=10e748d8&scoped=true":
/*!***********************************************************************************!*\
  !*** ./src/components/Menu/MenuBar.vue?vue&type=template&id=10e748d8&scoped=true ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_MenuBar_vue_vue_type_template_id_10e748d8_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_MenuBar_vue_vue_type_template_id_10e748d8_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_MenuBar_vue_vue_type_template_id_10e748d8_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./MenuBar.vue?vue&type=template&id=10e748d8&scoped=true */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Menu/MenuBar.vue?vue&type=template&id=10e748d8&scoped=true");


/***/ }),

/***/ "./src/components/Menu/ReadonlyBar.vue?vue&type=template&id=2716d951&scoped=true":
/*!***************************************************************************************!*\
  !*** ./src/components/Menu/ReadonlyBar.vue?vue&type=template&id=2716d951&scoped=true ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_ReadonlyBar_vue_vue_type_template_id_2716d951_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_ReadonlyBar_vue_vue_type_template_id_2716d951_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_ReadonlyBar_vue_vue_type_template_id_2716d951_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ReadonlyBar.vue?vue&type=template&id=2716d951&scoped=true */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Menu/ReadonlyBar.vue?vue&type=template&id=2716d951&scoped=true");


/***/ }),

/***/ "./src/components/Modal/Translate.vue?vue&type=template&id=7563604c&scoped=true":
/*!**************************************************************************************!*\
  !*** ./src/components/Modal/Translate.vue?vue&type=template&id=7563604c&scoped=true ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Translate_vue_vue_type_template_id_7563604c_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Translate_vue_vue_type_template_id_7563604c_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Translate_vue_vue_type_template_id_7563604c_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Translate.vue?vue&type=template&id=7563604c&scoped=true */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Modal/Translate.vue?vue&type=template&id=7563604c&scoped=true");


/***/ }),

/***/ "./src/components/PlainTextReader.vue?vue&type=template&id=513792ba":
/*!**************************************************************************!*\
  !*** ./src/components/PlainTextReader.vue?vue&type=template&id=513792ba ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_PlainTextReader_vue_vue_type_template_id_513792ba__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_PlainTextReader_vue_vue_type_template_id_513792ba__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_PlainTextReader_vue_vue_type_template_id_513792ba__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib/index.js!../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./PlainTextReader.vue?vue&type=template&id=513792ba */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/PlainTextReader.vue?vue&type=template&id=513792ba");


/***/ }),

/***/ "./src/components/Reader.vue?vue&type=template&id=2688351a":
/*!*****************************************************************!*\
  !*** ./src/components/Reader.vue?vue&type=template&id=2688351a ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Reader_vue_vue_type_template_id_2688351a__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Reader_vue_vue_type_template_id_2688351a__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Reader_vue_vue_type_template_id_2688351a__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib/index.js!../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Reader.vue?vue&type=template&id=2688351a */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Reader.vue?vue&type=template&id=2688351a");


/***/ }),

/***/ "./src/components/RichTextReader.vue?vue&type=template&id=f1ccc308":
/*!*************************************************************************!*\
  !*** ./src/components/RichTextReader.vue?vue&type=template&id=f1ccc308 ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_RichTextReader_vue_vue_type_template_id_f1ccc308__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_RichTextReader_vue_vue_type_template_id_f1ccc308__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_RichTextReader_vue_vue_type_template_id_f1ccc308__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib/index.js!../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./RichTextReader.vue?vue&type=template&id=f1ccc308 */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/RichTextReader.vue?vue&type=template&id=f1ccc308");


/***/ }),

/***/ "./src/components/SkeletonLoading.vue?vue&type=template&id=5a999aaf&scoped=true":
/*!**************************************************************************************!*\
  !*** ./src/components/SkeletonLoading.vue?vue&type=template&id=5a999aaf&scoped=true ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_SkeletonLoading_vue_vue_type_template_id_5a999aaf_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_SkeletonLoading_vue_vue_type_template_id_5a999aaf_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_SkeletonLoading_vue_vue_type_template_id_5a999aaf_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib/index.js!../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./SkeletonLoading.vue?vue&type=template&id=5a999aaf&scoped=true */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/SkeletonLoading.vue?vue&type=template&id=5a999aaf&scoped=true");


/***/ }),

/***/ "./src/components/Suggestion/Mention/AutoCompleteResult.vue?vue&type=template&id=44fd7335&scoped=true":
/*!************************************************************************************************************!*\
  !*** ./src/components/Suggestion/Mention/AutoCompleteResult.vue?vue&type=template&id=44fd7335&scoped=true ***!
  \************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_AutoCompleteResult_vue_vue_type_template_id_44fd7335_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_AutoCompleteResult_vue_vue_type_template_id_44fd7335_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_AutoCompleteResult_vue_vue_type_template_id_44fd7335_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./AutoCompleteResult.vue?vue&type=template&id=44fd7335&scoped=true */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Suggestion/Mention/AutoCompleteResult.vue?vue&type=template&id=44fd7335&scoped=true");


/***/ }),

/***/ "./src/components/Suggestion/Mention/MentionList.vue?vue&type=template&id=57ffd330":
/*!*****************************************************************************************!*\
  !*** ./src/components/Suggestion/Mention/MentionList.vue?vue&type=template&id=57ffd330 ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_MentionList_vue_vue_type_template_id_57ffd330__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_MentionList_vue_vue_type_template_id_57ffd330__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_MentionList_vue_vue_type_template_id_57ffd330__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./MentionList.vue?vue&type=template&id=57ffd330 */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Suggestion/Mention/MentionList.vue?vue&type=template&id=57ffd330");


/***/ }),

/***/ "./src/views/DirectEditing.vue?vue&type=template&id=37e36225&scoped=true":
/*!*******************************************************************************!*\
  !*** ./src/views/DirectEditing.vue?vue&type=template&id=37e36225&scoped=true ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_DirectEditing_vue_vue_type_template_id_37e36225_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_DirectEditing_vue_vue_type_template_id_37e36225_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_lib_index_js_vue_loader_options_DirectEditing_vue_vue_type_template_id_37e36225_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib/index.js!../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./DirectEditing.vue?vue&type=template&id=37e36225&scoped=true */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/views/DirectEditing.vue?vue&type=template&id=37e36225&scoped=true");


/***/ }),

/***/ "./src/components/Assistant.vue?vue&type=style&index=0&id=37cbcbde&scoped=true&lang=scss":
/*!***********************************************************************************************!*\
  !*** ./src/components/Assistant.vue?vue&type=style&index=0&id=37cbcbde&scoped=true&lang=scss ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Assistant_vue_vue_type_style_index_0_id_37cbcbde_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/style-loader/dist/cjs.js!../../node_modules/css-loader/dist/cjs.js!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/sass-loader/dist/cjs.js!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Assistant.vue?vue&type=style&index=0&id=37cbcbde&scoped=true&lang=scss */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Assistant.vue?vue&type=style&index=0&id=37cbcbde&scoped=true&lang=scss");


/***/ }),

/***/ "./src/components/BaseReader.vue?vue&type=style&index=0&id=364eab24&scoped=true&lang=scss":
/*!************************************************************************************************!*\
  !*** ./src/components/BaseReader.vue?vue&type=style&index=0&id=364eab24&scoped=true&lang=scss ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_BaseReader_vue_vue_type_style_index_0_id_364eab24_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/style-loader/dist/cjs.js!../../node_modules/css-loader/dist/cjs.js!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/sass-loader/dist/cjs.js!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./BaseReader.vue?vue&type=style&index=0&id=364eab24&scoped=true&lang=scss */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/BaseReader.vue?vue&type=style&index=0&id=364eab24&scoped=true&lang=scss");


/***/ }),

/***/ "./src/components/CollisionResolveDialog.vue?vue&type=style&index=0&id=5ffe7972&scoped=true&lang=scss":
/*!************************************************************************************************************!*\
  !*** ./src/components/CollisionResolveDialog.vue?vue&type=style&index=0&id=5ffe7972&scoped=true&lang=scss ***!
  \************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_CollisionResolveDialog_vue_vue_type_style_index_0_id_5ffe7972_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/style-loader/dist/cjs.js!../../node_modules/css-loader/dist/cjs.js!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/sass-loader/dist/cjs.js!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./CollisionResolveDialog.vue?vue&type=style&index=0&id=5ffe7972&scoped=true&lang=scss */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/CollisionResolveDialog.vue?vue&type=style&index=0&id=5ffe7972&scoped=true&lang=scss");


/***/ }),

/***/ "./src/components/Editor.vue?vue&type=style&index=0&id=e18b6dc6&scoped=true&lang=scss":
/*!********************************************************************************************!*\
  !*** ./src/components/Editor.vue?vue&type=style&index=0&id=e18b6dc6&scoped=true&lang=scss ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Editor_vue_vue_type_style_index_0_id_e18b6dc6_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/style-loader/dist/cjs.js!../../node_modules/css-loader/dist/cjs.js!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/sass-loader/dist/cjs.js!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Editor.vue?vue&type=style&index=0&id=e18b6dc6&scoped=true&lang=scss */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Editor.vue?vue&type=style&index=0&id=e18b6dc6&scoped=true&lang=scss");


/***/ }),

/***/ "./src/components/Editor.vue?vue&type=style&index=1&id=e18b6dc6&lang=scss":
/*!********************************************************************************!*\
  !*** ./src/components/Editor.vue?vue&type=style&index=1&id=e18b6dc6&lang=scss ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Editor_vue_vue_type_style_index_1_id_e18b6dc6_lang_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/style-loader/dist/cjs.js!../../node_modules/css-loader/dist/cjs.js!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/sass-loader/dist/cjs.js!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Editor.vue?vue&type=style&index=1&id=e18b6dc6&lang=scss */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Editor.vue?vue&type=style&index=1&id=e18b6dc6&lang=scss");


/***/ }),

/***/ "./src/components/Editor/ContentContainer.vue?vue&type=style&index=0&id=e4c6ecec&scoped=true&lang=scss":
/*!*************************************************************************************************************!*\
  !*** ./src/components/Editor/ContentContainer.vue?vue&type=style&index=0&id=e4c6ecec&scoped=true&lang=scss ***!
  \*************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ContentContainer_vue_vue_type_style_index_0_id_e4c6ecec_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/style-loader/dist/cjs.js!../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/sass-loader/dist/cjs.js!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ContentContainer.vue?vue&type=style&index=0&id=e4c6ecec&scoped=true&lang=scss */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Editor/ContentContainer.vue?vue&type=style&index=0&id=e4c6ecec&scoped=true&lang=scss");


/***/ }),

/***/ "./src/components/Editor/DocumentStatus.vue?vue&type=style&index=0&id=5f451e6f&scoped=true&lang=scss":
/*!***********************************************************************************************************!*\
  !*** ./src/components/Editor/DocumentStatus.vue?vue&type=style&index=0&id=5f451e6f&scoped=true&lang=scss ***!
  \***********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_DocumentStatus_vue_vue_type_style_index_0_id_5f451e6f_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/style-loader/dist/cjs.js!../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/sass-loader/dist/cjs.js!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./DocumentStatus.vue?vue&type=style&index=0&id=5f451e6f&scoped=true&lang=scss */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Editor/DocumentStatus.vue?vue&type=style&index=0&id=5f451e6f&scoped=true&lang=scss");


/***/ }),

/***/ "./src/components/Editor/MainContainer.vue?vue&type=style&index=0&id=745ee2b6&scoped=true&lang=scss":
/*!**********************************************************************************************************!*\
  !*** ./src/components/Editor/MainContainer.vue?vue&type=style&index=0&id=745ee2b6&scoped=true&lang=scss ***!
  \**********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_MainContainer_vue_vue_type_style_index_0_id_745ee2b6_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/style-loader/dist/cjs.js!../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/sass-loader/dist/cjs.js!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./MainContainer.vue?vue&type=style&index=0&id=745ee2b6&scoped=true&lang=scss */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Editor/MainContainer.vue?vue&type=style&index=0&id=745ee2b6&scoped=true&lang=scss");


/***/ }),

/***/ "./src/components/Editor/Status.vue?vue&type=style&index=0&id=7749e0f4&scoped=true&lang=scss":
/*!***************************************************************************************************!*\
  !*** ./src/components/Editor/Status.vue?vue&type=style&index=0&id=7749e0f4&scoped=true&lang=scss ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Status_vue_vue_type_style_index_0_id_7749e0f4_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/style-loader/dist/cjs.js!../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/sass-loader/dist/cjs.js!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Status.vue?vue&type=style&index=0&id=7749e0f4&scoped=true&lang=scss */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Editor/Status.vue?vue&type=style&index=0&id=7749e0f4&scoped=true&lang=scss");


/***/ }),

/***/ "./src/components/Editor/Wrapper.vue?vue&type=style&index=0&id=20a7fb81&scoped=true&lang=scss":
/*!****************************************************************************************************!*\
  !*** ./src/components/Editor/Wrapper.vue?vue&type=style&index=0&id=20a7fb81&scoped=true&lang=scss ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Wrapper_vue_vue_type_style_index_0_id_20a7fb81_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/style-loader/dist/cjs.js!../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/sass-loader/dist/cjs.js!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Wrapper.vue?vue&type=style&index=0&id=20a7fb81&scoped=true&lang=scss */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Editor/Wrapper.vue?vue&type=style&index=0&id=20a7fb81&scoped=true&lang=scss");


/***/ }),

/***/ "./src/components/HelpModal.vue?vue&type=style&index=0&id=6befbdec&lang=scss&scoped=true":
/*!***********************************************************************************************!*\
  !*** ./src/components/HelpModal.vue?vue&type=style&index=0&id=6befbdec&lang=scss&scoped=true ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_HelpModal_vue_vue_type_style_index_0_id_6befbdec_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/style-loader/dist/cjs.js!../../node_modules/css-loader/dist/cjs.js!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/sass-loader/dist/cjs.js!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./HelpModal.vue?vue&type=style&index=0&id=6befbdec&lang=scss&scoped=true */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/HelpModal.vue?vue&type=style&index=0&id=6befbdec&lang=scss&scoped=true");


/***/ }),

/***/ "./src/components/Menu/MenuBar.vue?vue&type=style&index=0&id=10e748d8&scoped=true&lang=scss":
/*!**************************************************************************************************!*\
  !*** ./src/components/Menu/MenuBar.vue?vue&type=style&index=0&id=10e748d8&scoped=true&lang=scss ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_MenuBar_vue_vue_type_style_index_0_id_10e748d8_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/style-loader/dist/cjs.js!../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/sass-loader/dist/cjs.js!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./MenuBar.vue?vue&type=style&index=0&id=10e748d8&scoped=true&lang=scss */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Menu/MenuBar.vue?vue&type=style&index=0&id=10e748d8&scoped=true&lang=scss");


/***/ }),

/***/ "./src/components/Modal/Translate.vue?vue&type=style&index=0&id=7563604c&lang=scss&scoped=true":
/*!*****************************************************************************************************!*\
  !*** ./src/components/Modal/Translate.vue?vue&type=style&index=0&id=7563604c&lang=scss&scoped=true ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Translate_vue_vue_type_style_index_0_id_7563604c_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/style-loader/dist/cjs.js!../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/sass-loader/dist/cjs.js!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Translate.vue?vue&type=style&index=0&id=7563604c&lang=scss&scoped=true */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Modal/Translate.vue?vue&type=style&index=0&id=7563604c&lang=scss&scoped=true");


/***/ }),

/***/ "./src/components/Reader.vue?vue&type=style&index=0&id=2688351a&lang=scss":
/*!********************************************************************************!*\
  !*** ./src/components/Reader.vue?vue&type=style&index=0&id=2688351a&lang=scss ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Reader_vue_vue_type_style_index_0_id_2688351a_lang_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/style-loader/dist/cjs.js!../../node_modules/css-loader/dist/cjs.js!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/sass-loader/dist/cjs.js!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Reader.vue?vue&type=style&index=0&id=2688351a&lang=scss */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Reader.vue?vue&type=style&index=0&id=2688351a&lang=scss");


/***/ }),

/***/ "./src/components/RichTextReader.vue?vue&type=style&index=0&id=f1ccc308&lang=scss":
/*!****************************************************************************************!*\
  !*** ./src/components/RichTextReader.vue?vue&type=style&index=0&id=f1ccc308&lang=scss ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_RichTextReader_vue_vue_type_style_index_0_id_f1ccc308_lang_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/style-loader/dist/cjs.js!../../node_modules/css-loader/dist/cjs.js!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/sass-loader/dist/cjs.js!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./RichTextReader.vue?vue&type=style&index=0&id=f1ccc308&lang=scss */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/RichTextReader.vue?vue&type=style&index=0&id=f1ccc308&lang=scss");


/***/ }),

/***/ "./src/components/SkeletonLoading.vue?vue&type=style&index=0&id=5a999aaf&lang=scss&scoped=true":
/*!*****************************************************************************************************!*\
  !*** ./src/components/SkeletonLoading.vue?vue&type=style&index=0&id=5a999aaf&lang=scss&scoped=true ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_SkeletonLoading_vue_vue_type_style_index_0_id_5a999aaf_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/style-loader/dist/cjs.js!../../node_modules/css-loader/dist/cjs.js!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/sass-loader/dist/cjs.js!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./SkeletonLoading.vue?vue&type=style&index=0&id=5a999aaf&lang=scss&scoped=true */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/SkeletonLoading.vue?vue&type=style&index=0&id=5a999aaf&lang=scss&scoped=true");


/***/ }),

/***/ "./src/components/Suggestion/Mention/AutoCompleteResult.vue?vue&type=style&index=0&id=44fd7335&lang=scss&scoped=true":
/*!***************************************************************************************************************************!*\
  !*** ./src/components/Suggestion/Mention/AutoCompleteResult.vue?vue&type=style&index=0&id=44fd7335&lang=scss&scoped=true ***!
  \***************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_AutoCompleteResult_vue_vue_type_style_index_0_id_44fd7335_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader/dist/cjs.js!../../../../node_modules/css-loader/dist/cjs.js!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/sass-loader/dist/cjs.js!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./AutoCompleteResult.vue?vue&type=style&index=0&id=44fd7335&lang=scss&scoped=true */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Suggestion/Mention/AutoCompleteResult.vue?vue&type=style&index=0&id=44fd7335&lang=scss&scoped=true");


/***/ }),

/***/ "./src/components/Suggestion/Mention/MentionList.vue?vue&type=style&index=0&id=57ffd330&lang=scss":
/*!********************************************************************************************************!*\
  !*** ./src/components/Suggestion/Mention/MentionList.vue?vue&type=style&index=0&id=57ffd330&lang=scss ***!
  \********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_MentionList_vue_vue_type_style_index_0_id_57ffd330_lang_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader/dist/cjs.js!../../../../node_modules/css-loader/dist/cjs.js!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/sass-loader/dist/cjs.js!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./MentionList.vue?vue&type=style&index=0&id=57ffd330&lang=scss */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Suggestion/Mention/MentionList.vue?vue&type=style&index=0&id=57ffd330&lang=scss");


/***/ }),

/***/ "./src/views/DirectEditing.vue?vue&type=style&index=0&id=37e36225&lang=scss":
/*!**********************************************************************************!*\
  !*** ./src/views/DirectEditing.vue?vue&type=style&index=0&id=37e36225&lang=scss ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_DirectEditing_vue_vue_type_style_index_0_id_37e36225_lang_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/style-loader/dist/cjs.js!../../node_modules/css-loader/dist/cjs.js!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/sass-loader/dist/cjs.js!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./DirectEditing.vue?vue&type=style&index=0&id=37e36225&lang=scss */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/views/DirectEditing.vue?vue&type=style&index=0&id=37e36225&lang=scss");


/***/ }),

/***/ "./src/views/DirectEditing.vue?vue&type=style&index=1&id=37e36225&scoped=true&lang=scss":
/*!**********************************************************************************************!*\
  !*** ./src/views/DirectEditing.vue?vue&type=style&index=1&id=37e36225&scoped=true&lang=scss ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_DirectEditing_vue_vue_type_style_index_1_id_37e36225_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/style-loader/dist/cjs.js!../../node_modules/css-loader/dist/cjs.js!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/sass-loader/dist/cjs.js!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./DirectEditing.vue?vue&type=style&index=1&id=37e36225&scoped=true&lang=scss */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/views/DirectEditing.vue?vue&type=style&index=1&id=37e36225&scoped=true&lang=scss");


/***/ }),

/***/ "./src/components/Menu/ReadonlyBar.vue?vue&type=style&index=0&id=2716d951&scoped=true&lang=css":
/*!*****************************************************************************************************!*\
  !*** ./src/components/Menu/ReadonlyBar.vue?vue&type=style&index=0&id=2716d951&scoped=true&lang=css ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_ReadonlyBar_vue_vue_type_style_index_0_id_2716d951_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/style-loader/dist/cjs.js!../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ReadonlyBar.vue?vue&type=style&index=0&id=2716d951&scoped=true&lang=css */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Menu/ReadonlyBar.vue?vue&type=style&index=0&id=2716d951&scoped=true&lang=css");


/***/ }),

/***/ "./src/assets/status-icons/user-status-away.svg":
/*!******************************************************!*\
  !*** ./src/assets/status-icons/user-status-away.svg ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "611b3a44bd59d3f2f2b7.svg";

/***/ }),

/***/ "./src/assets/status-icons/user-status-dnd.svg":
/*!*****************************************************!*\
  !*** ./src/assets/status-icons/user-status-dnd.svg ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "84454dcbb8cc5ec32c4e.svg";

/***/ }),

/***/ "./src/assets/status-icons/user-status-online.svg":
/*!********************************************************!*\
  !*** ./src/assets/status-icons/user-status-online.svg ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "9abe16601ec156375395.svg";

/***/ })

}]);
//# sourceMappingURL=editor.js.map?v=9337cb111c081eb3a95d