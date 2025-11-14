const appName = "text";
const appVersion = "7.0.0-dev.2";
import { f as defineComponent, i as inject, r as ref$1, p as provide, e as readonly, c as computed, w as watch, V as Vue, k as unref } from "./vue.runtime.esm-DtAgfqM0.chunk.mjs";
import { J as Extension, K as yUndoPlugin, L as yUndoPluginKey, M as ySyncPlugin, O as yXmlFragmentToProsemirrorJSON, Q as Plugin, S as PluginKey, T as redo, V as undo, W as ySyncPluginKey, X as BaseActionEntry, w as NcActionButton, u as useOutlineStateMixin, Y as useMenuIDMixin, Z as NcActionSeparator, _ as getActionState, $ as debounce, a0 as getIsActive, a1 as ReadOnlyEditEntries, a2 as OutlineEntries, r as useEditorFlags, a3 as ActionGlobalMixin, a4 as Selection, a5 as DecorationSet, a6 as Decoration, a7 as NodeRange, a8 as SelectionRange, a9 as absolutePositionToRelativePosition, aa as computePosition, ab as relativePositionToAbsolutePosition, ac as PlusIcon, l as useEditor, E as EditorOutline, b as EditorContent, ad as useIsMobile, j as useConnection, ae as READ_ONLY_ACTIONS, af as OUTLINE_ACTIONS, ag as OUTLINE_STATE, D as NcDialog, ah as TRANSLATIONS, ai as MODIFIERS, aj as Help, ak as NcActionText, al as AlphabeticalVariant, am as DotsHorizontal, an as ReadOnlyDoneEntries, ao as MenuEntries, ap as AssistantMenuEntries, aq as MENU_ID } from "./EditorOutline-lqEd_HRF.chunk.mjs";
import { t as translate, c as cancelableClient, n as normalizeComponent$1, G as GenRandomId, k as translatePlural } from "./NcLoadingIcon-D2qSC7Ri.chunk.mjs";
import { u as useIsMobileMixin, c as useFileMixin, S as STATE_UPLOADING, d as ACTION_CREATE_ATTACHMENT, e as ACTION_CHOOSE_LOCAL_ATTACHMENT, b as ACTION_ATTACHMENT_PROMPT, f as useEditorUpload } from "./MediaHandler.provider-DkXa_6IX.chunk.mjs";
import { n as normalizeComponent, u as useModelMigration } from "./NcCheckboxRadioSwitch-DAPHFb0L-mGx4ajL2.chunk.mjs";
import { g as generateUrl, b as generateRemoteUrl } from "./index--FnIx9_y.chunk.mjs";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { d as NcActions, N as NcButton, s as showError, u as useElementSize } from "./NcNoteCard-Dz5-u2BY-B3JST-Lk.chunk.mjs";
import { e as emit, s as subscribe, g as getCurrentUser, u as unsubscribe } from "./index-Djlbe-Du.chunk.mjs";
import { l as logger } from "./logger-DdFapB9C.chunk.mjs";
import { l as loadState } from "./index-D5dRV40B.chunk.mjs";
var Collaboration = Extension.create({
  name: "collaboration",
  priority: 1e3,
  addOptions() {
    return {
      document: null,
      field: "default",
      fragment: null,
      provider: null
    };
  },
  addStorage() {
    return {
      isDisabled: false
    };
  },
  onCreate() {
    if (this.editor.extensionManager.extensions.find((extension) => extension.name === "undoRedo")) {
      console.warn(
        '[tiptap warn]: "@tiptap/extension-collaboration" comes with its own history support and is not compatible with "@tiptap/extension-undo-redo".'
      );
    }
  },
  addCommands() {
    return {
      undo: () => ({ tr, state, dispatch }) => {
        tr.setMeta("preventDispatch", true);
        const undoManager = yUndoPluginKey.getState(state).undoManager;
        if (undoManager.undoStack.length === 0) {
          return false;
        }
        if (!dispatch) {
          return true;
        }
        return undo(state);
      },
      redo: () => ({ tr, state, dispatch }) => {
        tr.setMeta("preventDispatch", true);
        const undoManager = yUndoPluginKey.getState(state).undoManager;
        if (undoManager.redoStack.length === 0) {
          return false;
        }
        if (!dispatch) {
          return true;
        }
        return redo(state);
      }
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-z": () => this.editor.commands.undo(),
      "Mod-y": () => this.editor.commands.redo(),
      "Shift-Mod-z": () => this.editor.commands.redo()
    };
  },
  addProseMirrorPlugins() {
    var _a;
    const fragment = this.options.fragment ? this.options.fragment : this.options.document.getXmlFragment(this.options.field);
    const yUndoPluginInstance = yUndoPlugin(this.options.yUndoOptions);
    const originalUndoPluginView = yUndoPluginInstance.spec.view;
    yUndoPluginInstance.spec.view = (view) => {
      const { undoManager } = yUndoPluginKey.getState(view.state);
      if (undoManager.restore) {
        undoManager.restore();
        undoManager.restore = () => {
        };
      }
      const viewRet = originalUndoPluginView ? originalUndoPluginView(view) : void 0;
      return {
        destroy: () => {
          const hasUndoManSelf = undoManager.trackedOrigins.has(undoManager);
          const observers = undoManager._observers;
          undoManager.restore = () => {
            if (hasUndoManSelf) {
              undoManager.trackedOrigins.add(undoManager);
            }
            undoManager.doc.on("afterTransaction", undoManager.afterTransactionHandler);
            undoManager._observers = observers;
          };
          if (viewRet == null ? void 0 : viewRet.destroy) {
            viewRet.destroy();
          }
        }
      };
    };
    const ySyncPluginOptions = {
      ...this.options.ySyncOptions,
      onFirstRender: this.options.onFirstRender
    };
    const ySyncPluginInstance = ySyncPlugin(fragment, ySyncPluginOptions);
    if (this.editor.options.enableContentCheck) {
      (_a = fragment.doc) == null ? void 0 : _a.on("beforeTransaction", () => {
        try {
          const jsonContent = yXmlFragmentToProsemirrorJSON(fragment);
          if (jsonContent.content.length === 0) {
            return;
          }
          this.editor.schema.nodeFromJSON(jsonContent).check();
        } catch (error) {
          this.editor.emit("contentError", {
            error,
            editor: this.editor,
            disableCollaboration: () => {
              var _a2;
              (_a2 = fragment.doc) == null ? void 0 : _a2.destroy();
              this.storage.isDisabled = true;
            }
          });
          return false;
        }
      });
    }
    return [
      ySyncPluginInstance,
      yUndoPluginInstance,
      // Only add the filterInvalidContent plugin if content checking is enabled
      this.editor.options.enableContentCheck && new Plugin({
        key: new PluginKey("filterInvalidContent"),
        filterTransaction: () => {
          var _a2;
          if (this.storage.isDisabled !== false) {
            (_a2 = fragment.doc) == null ? void 0 : _a2.destroy();
            return true;
          }
          return true;
        }
      })
    ].filter(Boolean);
  }
});
function isChangeOrigin(transaction) {
  return !!transaction.getMeta(ySyncPluginKey);
}
const _sfc_main$f = {
  // This component is used as a direct child of NcActions.
  // Even if it actually renders NcActionButton, NcActions cannot see it due to rendering limitations in Vue.
  // Though it works in general, NcActions doesn't handle it correctly. See NcActions docs for details.
  // Hotfix - rename the component to NcActionButton because it represents and renders it.
  // eslint-disable-next-line vue/match-component-file-name
  name: "NcActionButton",
  components: {
    NextcloudVueNcActionButton: NcActionButton
  },
  extends: BaseActionEntry,
  mounted() {
    this.editor?.on("transaction", () => this.updateState());
  },
  methods: {
    runAction() {
      const { actionEntry } = this;
      if (actionEntry.click) {
        actionEntry.click(this);
      } else {
        actionEntry.action(this.editor?.chain().focus(), this.editor)?.run();
      }
      this.$nextTick(() => {
        this.$emit("trigged", { ...actionEntry });
      });
    }
  }
};
var _sfc_render$f = function render() {
  var _vm = this, _c = _vm._self._c;
  return _c("NextcloudVueNcActionButton", _vm._g({ staticClass: "entry-single-action entry-action entry-action-item", class: _vm.state.class, attrs: { "title": _vm.listItemTooltip || void 0, "disabled": _vm.state.disabled, "aria-keyshortcuts": _vm.keyshortcuts || void 0, "data-text-action-entry": _vm.actionEntry.key, "model-value": _vm.actionType !== "button" ? _vm.state.active : void 0, "close-after-click": "" }, on: { "click": _vm.runAction }, scopedSlots: _vm._u([{ key: "icon", fn: function() {
    return [_c(_vm.icon, { tag: "component" })];
  }, proxy: true }]) }, _vm.$listeners), [_vm._v(" " + _vm._s(_vm.label) + " ")]);
};
var _sfc_staticRenderFns$f = [];
_sfc_render$f._withStripped = true;
var __component__$f = /* @__PURE__ */ normalizeComponent(
  _sfc_main$f,
  _sfc_render$f,
  _sfc_staticRenderFns$f,
  false,
  null,
  null
);
__component__$f.options.__file = "/Users/jamesmanuel/Sites/nextcloud-dev/text/src/components/Menu/ActionListItem.vue";
const ActionListItem = __component__$f.exports;
const _sfc_main$e = {
  name: "ActionList",
  components: {
    NcActions,
    NcActionSeparator,
    ActionListItem
  },
  extends: BaseActionEntry,
  mixins: [useOutlineStateMixin, useMenuIDMixin],
  props: {
    forceEnabled: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    visible: false,
    hasEnabledChild: true
  }),
  computed: {
    currentChild() {
      const {
        state,
        editor,
        actionEntry: { children }
      } = this;
      if (!state.active) {
        return null;
      }
      return children.find((child) => {
        return getIsActive(child, editor);
      });
    },
    icon() {
      if (this.currentChild) {
        return this.currentChild.icon;
      }
      return this.actionEntry.icon;
    },
    iconKey() {
      return `${this.actionEntry.key}/${this.activeKey}`;
    },
    activeKey() {
      return this.currentChild?.key;
    },
    children() {
      return this.actionEntry.children.filter(({ visible }) => {
        if (visible === void 0) {
          return true;
        }
        return typeof visible === "function" ? visible(this) : visible;
      });
    },
    labelWithSelected() {
      if (this.currentChild) {
        return translate(
          "text",
          '{menuItemName}, "{selectedSubMenuItemName}" is selected',
          {
            menuItemName: this.actionEntry.label,
            selectedSubMenuItemName: this.currentChild.label
          }
        );
      }
      return this.actionEntry.label;
    },
    isEnabled() {
      return this.forceEnabled || this.hasEnabledChild;
    }
  },
  mounted() {
    this.$_updateState = debounce(this.checkStateOfChildren.bind(this), 50);
    this.editor?.on("update", this.$_updateState);
    this.editor?.on("selectionUpdate", this.$_updateState);
  },
  beforeDestroy() {
    this.editor?.off("update", this.$_updateState);
    this.editor?.off("selectionUpdate", this.$_updateState);
  },
  methods: {
    onOpenChange(val) {
      this.visible = val;
    },
    runAction() {
    },
    onTrigger(entry) {
      if (entry?.click) {
        return;
      }
      this.editor?.chain().focus().run();
      this.$emit("trigged", entry);
    },
    checkStateOfChildren() {
      this.hasEnabledChild = this.children.some(
        (child) => this.isChildEnabled(child)
      );
    },
    isChildEnabled(child) {
      return !child.isSeparator && !getActionState(child, this.editor).disabled;
    }
  }
};
var _sfc_render$e = function render2() {
  var _vm = this, _c = _vm._self._c;
  return _c("NcActions", _vm._b({ staticClass: "entry-list-action entry-action", attrs: { "title": _vm.tooltip, "container": _vm.menuIDSelector, "aria-label": _vm.labelWithSelected, "variant": _vm.state.active ? "primary" : "tertiary", "force-menu": true, "data-text-action-entry": _vm.actionEntry.key, "data-text-action-active": _vm.activeKey, "disabled": !_vm.isEnabled }, on: { "update:open": _vm.onOpenChange }, scopedSlots: _vm._u([{ key: "icon", fn: function() {
    return [_c(_vm.icon, { key: _vm.iconKey, tag: "component" })];
  }, proxy: true }]) }, "NcActions", _vm.state, false), [_vm._l(_vm.children, function(child) {
    return [child.isSeparator ? _c("NcActionSeparator", { key: `child-${child.key}` }) : _c("ActionListItem", _vm._g({ key: `child-${child.key}`, attrs: { "active": _vm.currentChild?.key === child.key, "is-item": "", "action-entry": child }, on: { "trigged": _vm.onTrigger } }, _vm.$listeners))];
  }), _vm._t("lastAction", null, null, { visible: _vm.visible })], 2);
};
var _sfc_staticRenderFns$e = [];
_sfc_render$e._withStripped = true;
var __component__$e = /* @__PURE__ */ normalizeComponent(
  _sfc_main$e,
  _sfc_render$e,
  _sfc_staticRenderFns$e,
  false,
  null,
  null
);
__component__$e.options.__file = "/Users/jamesmanuel/Sites/nextcloud-dev/text/src/components/Menu/ActionList.vue";
const ActionList = __component__$e.exports;
const _sfc_main$d = {
  name: "ActionSingle",
  components: {
    NcButton
  },
  extends: BaseActionEntry,
  props: {
    isItem: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    this.editor?.on("transaction", () => this.updateState());
  },
  methods: {
    runAction() {
      const { actionEntry } = this;
      if (actionEntry.click) {
        actionEntry.click(this);
      } else {
        actionEntry.action(this.editor?.chain().focus(), this.editor)?.run();
      }
      this.$nextTick(() => {
        this.$emit("trigged", { ...actionEntry });
      });
    }
  }
};
var _sfc_render$d = function render3() {
  var _vm = this, _c = _vm._self._c;
  return _c("NcButton", _vm._g({ staticClass: "entry-single-action entry-action", class: _vm.state.class, attrs: { "disabled": _vm.state.disabled, "aria-keyshortcuts": _vm.keyshortcuts || void 0, "data-text-action-entry": _vm.actionEntry.key, "aria-label": _vm.label, "title": _vm.tooltip, "variant": "tertiary", "pressed": _vm.actionType !== "button" ? _vm.state.active : void 0 }, on: { "click": _vm.runAction }, scopedSlots: _vm._u([{ key: "icon", fn: function() {
    return [_c(_vm.icon, { tag: "component" })];
  }, proxy: true }, _vm.actionEntry.forceLabel ? { key: "default", fn: function() {
    return [_vm._v(" " + _vm._s(_vm.label) + " ")];
  }, proxy: true } : null], null, true) }, _vm.$listeners));
};
var _sfc_staticRenderFns$d = [];
_sfc_render$d._withStripped = true;
var __component__$d = /* @__PURE__ */ normalizeComponent(
  _sfc_main$d,
  _sfc_render$d,
  _sfc_staticRenderFns$d,
  false,
  null,
  null
);
__component__$d.options.__file = "/Users/jamesmanuel/Sites/nextcloud-dev/text/src/components/Menu/ActionSingle.vue";
const ActionSingle = __component__$d.exports;
const ToolBarLogic = defineComponent({
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
        if (this.activeMenuEntry > this.visibleEntries.length || this.visibleEntries[this.activeMenuEntry]?.disabled) {
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
      const index = this.visibleEntries.findIndex(({ key }) => key === menuKey);
      this.visibleEntries[index].disabled = state;
      if (state === false && this.activeMenuEntry === index) {
        this.$nextTick(() => this.setNextMenuEntry());
      }
    },
    /**
     * Set the active menu entry to the next one (or reset to first)
     */
    setNextMenuEntry() {
      const modulo = this.visibleEntries.length + (this.$refs.remainingEntries ? 1 : 0);
      do {
        this.activeMenuEntry = (this.activeMenuEntry + 1) % modulo;
      } while (this.activeMenuEntry < this.visibleEntries.length && this.visibleEntries[this.activeMenuEntry].disabled);
    },
    /**
     * Set the active menu entry to the previous one (or reset to last entry (remaining actions))
     */
    setPreviousMenuEntry() {
      const modulo = this.visibleEntries.length + (this.$refs.remainingEntries ? 1 : 0);
      do {
        const index = this.activeMenuEntry - 1;
        this.activeMenuEntry = (index % modulo + modulo) % modulo;
      } while (this.activeMenuEntry < this.visibleEntries.length && this.visibleEntries[this.activeMenuEntry].disabled);
    },
    /**
     * Handle navigation in toolbar
     * @param {KeyboardEvent} event The keyup event
     */
    handleToolbarNavigation(event) {
      if (event.key === "ArrowRight") {
        this.setNextMenuEntry();
      } else if (event.key === "ArrowLeft") {
        this.setPreviousMenuEntry();
      }
      if (this.activeMenuEntry === this.visibleEntries.length) {
        this.$refs.remainingEntries?.focusButton?.();
      } else {
        const entries = [...this.$refs.menuEntries].sort(
          (a, b) => this.visibleEntries.findIndex(
            ({ key }) => key === a.$vnode.data.key
          ) - this.visibleEntries.findIndex(
            ({ key }) => key === b.$vnode.data.key
          )
        );
        entries[this.activeMenuEntry].focusButton();
      }
    }
  }
});
const _sfc_main$c = defineComponent({
  name: "ReadonlyBar",
  components: {
    ActionList,
    ActionSingle
  },
  extends: ToolBarLogic,
  mixins: [useIsMobileMixin],
  props: {
    isHidden: {
      type: Boolean,
      default: false
    },
    openReadOnly: {
      type: Boolean,
      default: false
    }
  },
  emits: ["update:loaded"],
  setup() {
    const { isRichWorkspace } = useEditorFlags();
    return {
      isRichWorkspace
    };
  },
  data() {
    return {
      entries: this.openReadOnly ? [...ReadOnlyEditEntries, ...OutlineEntries] : [...OutlineEntries],
      isReady: false
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.isReady = true;
      this.$emit("update:loaded", true);
    });
  },
  methods: {
    t: translate
  }
});
var _sfc_render$c = function render4() {
  var _vm = this, _c = _vm._self._c;
  _vm._self._setupProxy;
  return _c("div", { staticClass: "text-readonly-bar", class: {
    "text-readonly-bar--ready": _vm.isReady,
    "text-readonly-bar--is-workspace": _vm.isRichWorkspace,
    "text-readonly-bar--hide": _vm.isHidden,
    "is-mobile": _vm.$isMobile
  }, attrs: { "data-text-el": "readonly-bar" } }, [_c("div", { ref: "menubar", staticClass: "text-readonly-bar__entries", attrs: { "role": "toolbar", "aria-label": _vm.t("text", "Editor actions") } }, _vm._l(_vm.visibleEntries, function(actionEntry, index) {
    return _c(actionEntry.component ? actionEntry.component : actionEntry.children ? "ActionList" : "ActionSingle", { key: actionEntry.key, ref: "menuEntries", refInFor: true, tag: "component", attrs: { "action-entry": actionEntry, "can-be-focussed": _vm.activeMenuEntry === index }, on: { "disabled": function($event) {
      return _vm.disableMenuEntry(actionEntry.key, $event);
    } } });
  }), 1), _c("div", { staticClass: "text-readonly-bar__slot" }, [_vm._t("default")], 2)]);
};
var _sfc_staticRenderFns$c = [];
_sfc_render$c._withStripped = true;
var __component__$c = /* @__PURE__ */ normalizeComponent(
  _sfc_main$c,
  _sfc_render$c,
  _sfc_staticRenderFns$c,
  false,
  null,
  "cee7fec0"
);
__component__$c.options.__file = "/Users/jamesmanuel/Sites/nextcloud-dev/text/src/components/Menu/ReadonlyBar.vue";
const ReadonlyBar = __component__$c.exports;
let valueSingleton = loadState("text", "is_full_width_editor", false);
const editorWidthKey = Symbol("text:editor:width");
function maxWidthSetOutsideOfText() {
  const alreadySet = getComputedStyle(document.body).getPropertyValue(
    "--text-editor-max-width"
  );
  const setByText = document.documentElement.style.getPropertyValue(
    "--text-editor-max-width"
  );
  return Boolean(alreadySet) && alreadySet !== setByText;
}
const provideEditorWidth = () => {
  if (maxWidthSetOutsideOfText()) {
    provide(editorWidthKey, null);
    return { applyEditorWidth: () => {
    } };
  }
  const isFullWidth = ref$1(valueSingleton);
  provide(editorWidthKey, readonly(isFullWidth));
  subscribe("text:editor:full-width", ({ value }) => {
    valueSingleton = value;
    isFullWidth.value = value;
  });
  const width = computed(() => isFullWidth.value ? "100%" : "80ch");
  const applyEditorWidth = () => {
    document.documentElement.style.setProperty(
      "--text-editor-max-width",
      width.value
    );
  };
  watch(width, applyEditorWidth);
  return { applyEditorWidth };
};
const useEditorWidth = () => {
  const isFullWidth = inject(editorWidthKey);
  if (isFullWidth === null) {
    return { canToggleWidth: false };
  }
  const setFullWidth = (checked) => {
    cancelableClient.post(generateUrl("/apps/text/settings"), {
      key: "is_full_width_editor",
      value: checked ? "1" : "0"
    });
    emit("text:editor:full-width", { value: checked });
  };
  return { canToggleWidth: true, isFullWidth, setFullWidth };
};
const _sfc_main$b = {
  name: "NcActionCheckbox",
  mixins: [ActionGlobalMixin],
  inject: {
    isInSemanticMenu: {
      from: "NcActions:isSemanticMenu",
      default: false
    }
  },
  model: {
    prop: "modelValue",
    event: "update:modelValue"
  },
  props: {
    /**
     * id attribute of the checkbox element
     */
    id: {
      type: String,
      default: () => "action-" + GenRandomId(),
      validator: (id) => id.trim() !== ""
    },
    /**
     * Removed in v9 - use `modelValue` (`v-model`) instead
     *
     * @deprecated
     */
    checked: {
      type: Boolean,
      // eslint-disable-next-line vue/no-boolean-default
      default: void 0
    },
    /**
     * checked state of the the checkbox element
     */
    modelValue: {
      type: Boolean,
      default: false
    },
    /**
     * value of the checkbox input
     */
    value: {
      type: [String, Number],
      default: ""
    },
    /**
     * disabled state of the checkbox element
     */
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: [
    "change",
    "check",
    "uncheck",
    /**
     * Removed in v9 - use `update:modelValue` (`v-model`) instead
     *
     * @deprecated
     */
    "update:checked",
    /**
     * Emitted when the checkbox state is changed
     *
     * @type {boolean}
     */
    "update:modelValue",
    /** Same as update:modelValue for Vue 2 compatibility */
    "update:model-value"
  ],
  setup() {
    const model = useModelMigration("checked", "update:checked");
    return {
      model
    };
  },
  computed: {
    /**
     * determines if the action is focusable
     *
     * @return {boolean} is the action focusable ?
     */
    isFocusable() {
      return !this.disabled;
    },
    /**
     * aria-checked attribute for role="menuitemcheckbox"
     *
     * @return {'true'|'false'|undefined} aria-checked value if needed
     */
    ariaChecked() {
      if (this.isInSemanticMenu) {
        return this.model ? "true" : "false";
      }
      return void 0;
    }
  },
  methods: {
    checkInput() {
      this.$refs.label.click();
    },
    onChange(event) {
      this.model = this.$refs.checkbox.checked;
      this.$emit("change", event);
      if (this.$refs.checkbox.checked) {
        this.$emit("check");
      } else {
        this.$emit("uncheck");
      }
    }
  }
};
var _sfc_render$b = function render5() {
  var _vm = this, _c = _vm._self._c;
  return _c("li", { staticClass: "action", class: { "action--disabled": _vm.disabled }, attrs: { "role": _vm.isInSemanticMenu && "presentation" } }, [_c("span", { staticClass: "action-checkbox", attrs: { "role": _vm.isInSemanticMenu && "menuitemcheckbox", "aria-checked": _vm.ariaChecked } }, [_c("input", { ref: "checkbox", staticClass: "checkbox action-checkbox__checkbox", class: { focusable: _vm.isFocusable }, attrs: { "id": _vm.id, "disabled": _vm.disabled, "type": "checkbox" }, domProps: { "checked": _vm.model, "value": _vm.value }, on: { "keydown": function($event) {
    if (!$event.type.indexOf("key") && _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")) return null;
    if ($event.ctrlKey || $event.shiftKey || $event.altKey || $event.metaKey) return null;
    $event.preventDefault();
    return _vm.checkInput.apply(null, arguments);
  }, "change": _vm.onChange } }), _c("label", { ref: "label", staticClass: "action-checkbox__label", attrs: { "for": _vm.id } }, [_vm._v(_vm._s(_vm.text))]), _vm._e()], 2)]);
};
var _sfc_staticRenderFns$b = [];
var __component__$b = /* @__PURE__ */ normalizeComponent$1(
  _sfc_main$b,
  _sfc_render$b,
  _sfc_staticRenderFns$b,
  false,
  null,
  "73edcb0b"
);
const NcActionCheckbox = __component__$b.exports;
var lib = {};
var hasRequiredLib;
function requireLib() {
  if (hasRequiredLib) return lib;
  hasRequiredLib = 1;
  (function(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.normalize = void 0;
    const SLASH = 47;
    const DOT = 46;
    const assertPath = (path) => {
      const t2 = typeof path;
      if (t2 !== "string") {
        throw new TypeError(`Expected a string, got a ${t2}`);
      }
    };
    const posixNormalize = (path, allowAboveRoot) => {
      let res = "";
      let lastSegmentLength = 0;
      let lastSlash = -1;
      let dots = 0;
      let code;
      for (let i = 0; i <= path.length; ++i) {
        if (i < path.length) {
          code = path.charCodeAt(i);
        } else if (code === SLASH) {
          break;
        } else {
          code = SLASH;
        }
        if (code === SLASH) {
          if (lastSlash === i - 1 || dots === 1) ;
          else if (lastSlash !== i - 1 && dots === 2) {
            if (res.length < 2 || lastSegmentLength !== 2 || res.charCodeAt(res.length - 1) !== DOT || res.charCodeAt(res.length - 2) !== DOT) {
              if (res.length > 2) {
                const lastSlashIndex = res.lastIndexOf("/");
                if (lastSlashIndex !== res.length - 1) {
                  if (lastSlashIndex === -1) {
                    res = "";
                    lastSegmentLength = 0;
                  } else {
                    res = res.slice(0, lastSlashIndex);
                    lastSegmentLength = res.length - 1 - res.lastIndexOf("/");
                  }
                  lastSlash = i;
                  dots = 0;
                  continue;
                }
              } else if (res.length === 2 || res.length === 1) {
                res = "";
                lastSegmentLength = 0;
                lastSlash = i;
                dots = 0;
                continue;
              }
            }
            if (allowAboveRoot) {
              if (res.length > 0) {
                res += "/..";
              } else {
                res = "..";
              }
              lastSegmentLength = 2;
            }
          } else {
            if (res.length > 0) {
              res += "/" + path.slice(lastSlash + 1, i);
            } else {
              res = path.slice(lastSlash + 1, i);
            }
            lastSegmentLength = i - lastSlash - 1;
          }
          lastSlash = i;
          dots = 0;
        } else if (code === DOT && dots !== -1) {
          ++dots;
        } else {
          dots = -1;
        }
      }
      return res;
    };
    const decode = (s) => {
      try {
        return decodeURIComponent(s);
      } catch {
        return s;
      }
    };
    const normalize = (p) => {
      assertPath(p);
      let path = p;
      if (path.length === 0) {
        return ".";
      }
      const isAbsolute = path.charCodeAt(0) === SLASH;
      const trailingSeparator = path.charCodeAt(path.length - 1) === SLASH;
      path = decode(path);
      path = posixNormalize(path, !isAbsolute);
      if (path.length === 0 && !isAbsolute) {
        path = ".";
      }
      if (path.length > 0 && trailingSeparator) {
        path += "/";
      }
      if (isAbsolute) {
        return "/" + path;
      }
      return path;
    };
    exports$1.normalize = normalize;
    exports$1.default = exports$1.normalize;
  })(lib);
  return lib;
}
var libExports = requireLib();
const pathNormalize = /* @__PURE__ */ getDefaultExportFromCjs(libExports);
class AttachmentResolver {
  #session;
  #user;
  #shareToken;
  #currentDirectory;
  #documentId;
  #initAttachmentListPromise;
  #attachmentList = [];
  constructor({ session, user, shareToken, currentDirectory, fileId }) {
    this.#session = session;
    this.#user = user;
    this.#shareToken = shareToken;
    this.#currentDirectory = currentDirectory;
    this.#documentId = fileId ?? session.documentId;
    this.#initAttachmentListPromise = this.#updateAttachmentList();
  }
  async #updateAttachmentList() {
    const response = await cancelableClient.post(generateUrl("/apps/text/attachments"), {
      documentId: this.#session?.documentId ?? this.#documentId,
      sessionId: this.#session?.id,
      sessionToken: this.#session?.token,
      shareToken: this.#shareToken
    });
    this.#attachmentList = response.data;
  }
  #findAttachment(fileName) {
    return this.#attachmentList.find((a) => a.name === fileName);
  }
  /*
   * Resolve a given image/attachment src.
   * @param { string } src - the original src in the node.
   * @param { bool } fallback - fetch again attachmentsList if not found | defaul = true
   */
  async resolve(src, fallback = true) {
    let attachment;
    const directoryRegexp = /^\.attachments\.\d+\//;
    if (src.match(directoryRegexp)) {
      const imageFileName = decodeURIComponent(
        src.replace(directoryRegexp, "").split("?")[0]
      );
      await this.#initAttachmentListPromise;
      attachment = this.#findAttachment(imageFileName);
      if (fallback && !attachment) {
        await this.#updateAttachmentList();
        attachment = this.#findAttachment(imageFileName);
      }
      if (attachment) {
        return attachment;
      }
    }
    if (isDirectUrl(src)) {
      return {
        isImage: true,
        name: this.#name(src),
        previewUrl: src,
        fullUrl: src
      };
    }
    return {
      isImage: true,
      name: this.#name(src),
      previewUrl: this.#davUrl(src),
      fullUrl: this.#davUrl(src)
    };
  }
  #name(src) {
    return src.split("/").pop();
  }
  #davUrl(src) {
    if (this.#user) {
      const uid = this.#user.uid;
      const encoded = this.#filePath(src).split("/").map(encodeURIComponent).join("/");
      return generateRemoteUrl(`dav/files/${uid}${encoded}`);
    }
    const path = this.#filePath(src).split("/");
    const basename = path.pop();
    const dirname = path.join("/");
    return generateUrl("/s/{token}/download?path={dirname}&files={basename}", {
      token: this.#shareToken,
      basename,
      dirname
    });
  }
  /**
   * Return the relativePath to a file specified in the url
   *
   * @param {string} src - url to extract path from
   */
  #relativePath(src) {
    return decodeURI(src.split("?")[0]);
  }
  #filePath(src) {
    const f = [this.#currentDirectory, this.#relativePath(src)].join("/");
    return pathNormalize(f);
  }
}
function isDirectUrl(src) {
  return src.startsWith("http://") || src.startsWith("https://") || src.startsWith("data:");
}
function getNodeRangeDecorations(ranges) {
  if (!ranges.length) {
    return DecorationSet.empty;
  }
  const decorations = [];
  const doc = ranges[0].$from.node(0);
  ranges.forEach((range) => {
    const pos = range.$from.pos;
    const node = range.$from.nodeAfter;
    if (!node) {
      return;
    }
    decorations.push(
      Decoration.node(pos, pos + node.nodeSize, {
        class: "ProseMirror-selectednoderange"
      })
    );
  });
  return DecorationSet.create(doc, decorations);
}
function getSelectionRanges($from, $to, depth) {
  const ranges = [];
  const doc = $from.node(0);
  if (typeof depth === "number" && depth >= 0) ;
  else if ($from.sameParent($to)) {
    depth = Math.max(0, $from.sharedDepth($to.pos) - 1);
  } else {
    depth = $from.sharedDepth($to.pos);
  }
  const nodeRange = new NodeRange($from, $to, depth);
  const offset = nodeRange.depth === 0 ? 0 : doc.resolve(nodeRange.start).posAtIndex(0);
  nodeRange.parent.forEach((node, pos) => {
    const from = offset + pos;
    const to = from + node.nodeSize;
    if (from < nodeRange.start || from >= nodeRange.end) {
      return;
    }
    const selectionRange = new SelectionRange(doc.resolve(from), doc.resolve(to));
    ranges.push(selectionRange);
  });
  return ranges;
}
var NodeRangeBookmark = class _NodeRangeBookmark {
  constructor(anchor, head) {
    this.anchor = anchor;
    this.head = head;
  }
  map(mapping) {
    return new _NodeRangeBookmark(mapping.map(this.anchor), mapping.map(this.head));
  }
  resolve(doc) {
    const $anchor = doc.resolve(this.anchor);
    const $head = doc.resolve(this.head);
    return new NodeRangeSelection($anchor, $head);
  }
};
var NodeRangeSelection = class _NodeRangeSelection extends Selection {
  constructor($anchor, $head, depth, bias = 1) {
    const { doc } = $anchor;
    const isCursor = $anchor === $head;
    const isCursorAtEnd = $anchor.pos === doc.content.size && $head.pos === doc.content.size;
    const $correctedHead = isCursor && !isCursorAtEnd ? doc.resolve($head.pos + (bias > 0 ? 1 : -1)) : $head;
    const $correctedAnchor = isCursor && isCursorAtEnd ? doc.resolve($anchor.pos - (bias > 0 ? 1 : -1)) : $anchor;
    const ranges = getSelectionRanges($correctedAnchor.min($correctedHead), $correctedAnchor.max($correctedHead), depth);
    const $rangeFrom = $correctedHead.pos >= $anchor.pos ? ranges[0].$from : ranges[ranges.length - 1].$to;
    const $rangeTo = $correctedHead.pos >= $anchor.pos ? ranges[ranges.length - 1].$to : ranges[0].$from;
    super($rangeFrom, $rangeTo, ranges);
    this.depth = depth;
  }
  // we can safely ignore this TypeScript error: https://github.com/Microsoft/TypeScript/issues/338
  // @ts-ignore
  get $to() {
    return this.ranges[this.ranges.length - 1].$to;
  }
  eq(other) {
    return other instanceof _NodeRangeSelection && other.$from.pos === this.$from.pos && other.$to.pos === this.$to.pos;
  }
  map(doc, mapping) {
    const $anchor = doc.resolve(mapping.map(this.anchor));
    const $head = doc.resolve(mapping.map(this.head));
    return new _NodeRangeSelection($anchor, $head);
  }
  toJSON() {
    return {
      type: "nodeRange",
      anchor: this.anchor,
      head: this.head
    };
  }
  get isForwards() {
    return this.head >= this.anchor;
  }
  get isBackwards() {
    return !this.isForwards;
  }
  extendBackwards() {
    const { doc } = this.$from;
    if (this.isForwards && this.ranges.length > 1) {
      const ranges = this.ranges.slice(0, -1);
      const $from2 = ranges[0].$from;
      const $to = ranges[ranges.length - 1].$to;
      return new _NodeRangeSelection($from2, $to, this.depth);
    }
    const firstRange = this.ranges[0];
    const $from = doc.resolve(Math.max(0, firstRange.$from.pos - 1));
    return new _NodeRangeSelection(this.$anchor, $from, this.depth);
  }
  extendForwards() {
    const { doc } = this.$from;
    if (this.isBackwards && this.ranges.length > 1) {
      const ranges = this.ranges.slice(1);
      const $from = ranges[0].$from;
      const $to2 = ranges[ranges.length - 1].$to;
      return new _NodeRangeSelection($to2, $from, this.depth);
    }
    const lastRange = this.ranges[this.ranges.length - 1];
    const $to = doc.resolve(Math.min(doc.content.size, lastRange.$to.pos + 1));
    return new _NodeRangeSelection(this.$anchor, $to, this.depth);
  }
  static fromJSON(doc, json) {
    return new _NodeRangeSelection(doc.resolve(json.anchor), doc.resolve(json.head));
  }
  static create(doc, anchor, head, depth, bias = 1) {
    return new this(doc.resolve(anchor), doc.resolve(head), depth, bias);
  }
  getBookmark() {
    return new NodeRangeBookmark(this.anchor, this.head);
  }
};
NodeRangeSelection.prototype.visible = false;
function isNodeRangeSelection(value) {
  return value instanceof NodeRangeSelection;
}
Extension.create({
  name: "nodeRange",
  addOptions() {
    return {
      depth: void 0,
      key: "Mod"
    };
  },
  addKeyboardShortcuts() {
    return {
      // extend NodeRangeSelection upwards
      "Shift-ArrowUp": ({ editor }) => {
        const { depth } = this.options;
        const { view, state } = editor;
        const { doc, selection, tr } = state;
        const { anchor, head } = selection;
        if (!isNodeRangeSelection(selection)) {
          const nodeRangeSelection2 = NodeRangeSelection.create(doc, anchor, head, depth, -1);
          tr.setSelection(nodeRangeSelection2);
          view.dispatch(tr);
          return true;
        }
        const nodeRangeSelection = selection.extendBackwards();
        tr.setSelection(nodeRangeSelection);
        view.dispatch(tr);
        return true;
      },
      // extend NodeRangeSelection downwards
      "Shift-ArrowDown": ({ editor }) => {
        const { depth } = this.options;
        const { view, state } = editor;
        const { doc, selection, tr } = state;
        const { anchor, head } = selection;
        if (!isNodeRangeSelection(selection)) {
          const nodeRangeSelection2 = NodeRangeSelection.create(doc, anchor, head, depth);
          tr.setSelection(nodeRangeSelection2);
          view.dispatch(tr);
          return true;
        }
        const nodeRangeSelection = selection.extendForwards();
        tr.setSelection(nodeRangeSelection);
        view.dispatch(tr);
        return true;
      },
      // add `NodeRangeSelection` to all nodes
      "Mod-a": ({ editor }) => {
        const { depth } = this.options;
        const { view, state } = editor;
        const { doc, tr } = state;
        const nodeRangeSelection = NodeRangeSelection.create(doc, 0, doc.content.size, depth);
        tr.setSelection(nodeRangeSelection);
        view.dispatch(tr);
        return true;
      }
    };
  },
  onSelectionUpdate() {
    const { selection } = this.editor.state;
    if (isNodeRangeSelection(selection)) {
      this.editor.view.dom.classList.add("ProseMirror-noderangeselection");
    }
  },
  addProseMirrorPlugins() {
    let hideTextSelection = false;
    let activeMouseSelection = false;
    return [
      new Plugin({
        key: new PluginKey("nodeRange"),
        props: {
          attributes: () => {
            if (hideTextSelection) {
              return {
                class: "ProseMirror-noderangeselection"
              };
            }
            return { class: "" };
          },
          handleDOMEvents: {
            mousedown: (view, event) => {
              const { key } = this.options;
              const isMac = /Mac/.test(navigator.platform);
              const isShift = !!event.shiftKey;
              const isControl = !!event.ctrlKey;
              const isAlt = !!event.altKey;
              const isMeta = !!event.metaKey;
              const isMod = isMac ? isMeta : isControl;
              if (key === null || key === void 0 || key === "Shift" && isShift || key === "Control" && isControl || key === "Alt" && isAlt || key === "Meta" && isMeta || key === "Mod" && isMod) {
                activeMouseSelection = true;
              }
              if (!activeMouseSelection) {
                return false;
              }
              document.addEventListener(
                "mouseup",
                () => {
                  activeMouseSelection = false;
                  const { state } = view;
                  const { doc, selection, tr } = state;
                  const { $anchor, $head } = selection;
                  if ($anchor.sameParent($head)) {
                    return;
                  }
                  const nodeRangeSelection = NodeRangeSelection.create(doc, $anchor.pos, $head.pos, this.options.depth);
                  tr.setSelection(nodeRangeSelection);
                  view.dispatch(tr);
                },
                { once: true }
              );
              return false;
            }
          },
          // when selecting some text we want to render some decorations
          // to preview a `NodeRangeSelection`
          decorations: (state) => {
            const { selection } = state;
            const isNodeRange = isNodeRangeSelection(selection);
            hideTextSelection = false;
            if (!activeMouseSelection) {
              if (!isNodeRange) {
                return null;
              }
              hideTextSelection = true;
              return getNodeRangeDecorations(selection.ranges);
            }
            const { $from, $to } = selection;
            if (!isNodeRange && $from.sameParent($to)) {
              return null;
            }
            const nodeRanges = getSelectionRanges($from, $to, this.options.depth);
            if (!nodeRanges.length) {
              return null;
            }
            hideTextSelection = true;
            return getNodeRangeDecorations(nodeRanges);
          }
        }
      })
    ];
  }
});
function getCSSText(element) {
  let value = "";
  const style = getComputedStyle(element);
  for (let i = 0; i < style.length; i += 1) {
    value += `${style[i]}:${style.getPropertyValue(style[i])};`;
  }
  return value;
}
function cloneElement(node) {
  const clonedNode = node.cloneNode(true);
  const sourceElements = [node, ...Array.from(node.getElementsByTagName("*"))];
  const targetElements = [clonedNode, ...Array.from(clonedNode.getElementsByTagName("*"))];
  sourceElements.forEach((sourceElement, index) => {
    targetElements[index].style.cssText = getCSSText(sourceElement);
  });
  return clonedNode;
}
function findClosestTopLevelBlock(element, view) {
  let current = element;
  while ((current == null ? void 0 : current.parentElement) && current.parentElement !== view.dom) {
    current = current.parentElement;
  }
  return (current == null ? void 0 : current.parentElement) === view.dom ? current : void 0;
}
function clampToContent(view, x, y, inset = 5) {
  const container = view.dom;
  const firstBlock = container.firstElementChild;
  const lastBlock = container.lastElementChild;
  if (!firstBlock || !lastBlock) {
    return { x, y };
  }
  const topRect = firstBlock.getBoundingClientRect();
  const botRect = lastBlock.getBoundingClientRect();
  const clampedY = Math.min(Math.max(topRect.top + inset, y), botRect.bottom - inset);
  const epsilon = 0.5;
  const sameLeft = Math.abs(topRect.left - botRect.left) < epsilon;
  const sameRight = Math.abs(topRect.right - botRect.right) < epsilon;
  let rowRect = topRect;
  if (sameLeft && sameRight) {
    rowRect = topRect;
  }
  const clampedX = Math.min(Math.max(rowRect.left + inset, x), rowRect.right - inset);
  return { x: clampedX, y: clampedY };
}
var findElementNextToCoords = (options) => {
  const { x, y, editor } = options;
  const { view, state } = editor;
  const { x: clampedX, y: clampedY } = clampToContent(view, x, y, 5);
  const elements = view.root.elementsFromPoint(clampedX, clampedY);
  let block;
  Array.prototype.some.call(elements, (el) => {
    if (!view.dom.contains(el)) {
      return false;
    }
    const candidate = findClosestTopLevelBlock(el, view);
    if (candidate) {
      block = candidate;
      return true;
    }
    return false;
  });
  if (!block) {
    return { resultElement: null, resultNode: null, pos: null };
  }
  let pos;
  try {
    pos = view.posAtDOM(block, 0);
  } catch {
    return { resultElement: null, resultNode: null, pos: null };
  }
  const node = state.doc.nodeAt(pos);
  return {
    resultElement: block,
    resultNode: node,
    pos
  };
};
function getComputedStyle2(node, property) {
  const style = window.getComputedStyle(node);
  return style[property];
}
function minMax(value = 0, min = 0, max = 0) {
  return Math.min(Math.max(value, min), max);
}
function getInnerCoords(view, x, y) {
  const paddingLeft = parseInt(getComputedStyle2(view.dom, "paddingLeft"), 10);
  const paddingRight = parseInt(getComputedStyle2(view.dom, "paddingRight"), 10);
  const borderLeft = parseInt(getComputedStyle2(view.dom, "borderLeftWidth"), 10);
  const borderRight = parseInt(getComputedStyle2(view.dom, "borderLeftWidth"), 10);
  const bounds = view.dom.getBoundingClientRect();
  const coords = {
    left: minMax(x, bounds.left + paddingLeft + borderLeft, bounds.right - paddingRight - borderRight),
    top: y
  };
  return coords;
}
function removeNode(node) {
  var _a;
  (_a = node.parentNode) == null ? void 0 : _a.removeChild(node);
}
function getDragHandleRanges(event, editor) {
  const { doc } = editor.view.state;
  const result = findElementNextToCoords({
    editor,
    x: event.clientX,
    y: event.clientY
  });
  if (!result.resultNode || result.pos === null) {
    return [];
  }
  const x = event.clientX;
  const coords = getInnerCoords(editor.view, x, event.clientY);
  const posAtCoords = editor.view.posAtCoords(coords);
  if (!posAtCoords) {
    return [];
  }
  const { pos } = posAtCoords;
  const nodeAt = doc.resolve(pos).parent;
  if (!nodeAt) {
    return [];
  }
  const $from = doc.resolve(result.pos);
  const $to = doc.resolve(result.pos + 1);
  return getSelectionRanges($from, $to, 0);
}
function dragHandler(event, editor) {
  const { view } = editor;
  if (!event.dataTransfer) {
    return;
  }
  const { empty, $from, $to } = view.state.selection;
  const dragHandleRanges = getDragHandleRanges(event, editor);
  const selectionRanges = getSelectionRanges($from, $to, 0);
  const isDragHandleWithinSelection = selectionRanges.some((range) => {
    return dragHandleRanges.find((dragHandleRange) => {
      return dragHandleRange.$from === range.$from && dragHandleRange.$to === range.$to;
    });
  });
  const ranges = empty || !isDragHandleWithinSelection ? dragHandleRanges : selectionRanges;
  if (!ranges.length) {
    return;
  }
  const { tr } = view.state;
  const wrapper = document.createElement("div");
  const from = ranges[0].$from.pos;
  const to = ranges[ranges.length - 1].$to.pos;
  const selection = NodeRangeSelection.create(view.state.doc, from, to);
  const slice = selection.content();
  ranges.forEach((range) => {
    const element = view.nodeDOM(range.$from.pos);
    const clonedElement = cloneElement(element);
    wrapper.append(clonedElement);
  });
  wrapper.style.position = "absolute";
  wrapper.style.top = "-10000px";
  document.body.append(wrapper);
  event.dataTransfer.clearData();
  event.dataTransfer.setDragImage(wrapper, 0, 0);
  view.dragging = { slice, move: true };
  tr.setSelection(selection);
  view.dispatch(tr);
  document.addEventListener("drop", () => removeNode(wrapper), { once: true });
}
var getOuterNodePos = (doc, pos) => {
  const resolvedPos = doc.resolve(pos);
  const { depth } = resolvedPos;
  if (depth === 0) {
    return pos;
  }
  const a = resolvedPos.pos - resolvedPos.parentOffset;
  return a - 1;
};
var getOuterNode = (doc, pos) => {
  const node = doc.nodeAt(pos);
  const resolvedPos = doc.resolve(pos);
  let { depth } = resolvedPos;
  let parent = node;
  while (depth > 0) {
    const currentNode = resolvedPos.node(depth);
    depth -= 1;
    if (depth === 0) {
      parent = currentNode;
    }
  }
  return parent;
};
var getRelativePos = (state, absolutePos) => {
  const ystate = ySyncPluginKey.getState(state);
  if (!ystate) {
    return null;
  }
  return absolutePositionToRelativePosition(absolutePos, ystate.type, ystate.binding.mapping);
};
var getAbsolutePos = (state, relativePos) => {
  const ystate = ySyncPluginKey.getState(state);
  if (!ystate) {
    return -1;
  }
  return relativePositionToAbsolutePosition(ystate.doc, ystate.type, relativePos, ystate.binding.mapping) || 0;
};
var getOuterDomNode = (view, domNode) => {
  let tmpDomNode = domNode;
  while (tmpDomNode == null ? void 0 : tmpDomNode.parentNode) {
    if (tmpDomNode.parentNode === view.dom) {
      break;
    }
    tmpDomNode = tmpDomNode.parentNode;
  }
  return tmpDomNode;
};
var dragHandlePluginDefaultKey = new PluginKey("dragHandle");
var DragHandlePlugin = ({
  pluginKey = dragHandlePluginDefaultKey,
  element,
  editor,
  computePositionConfig,
  getReferencedVirtualElement,
  onNodeChange,
  onElementDragStart,
  onElementDragEnd
}) => {
  const wrapper = document.createElement("div");
  let locked = false;
  let currentNode = null;
  let currentNodePos = -1;
  let currentNodeRelPos;
  let rafId = null;
  let pendingMouseCoords = null;
  function hideHandle() {
    if (!element) {
      return;
    }
    element.style.visibility = "hidden";
    element.style.pointerEvents = "none";
  }
  function showHandle() {
    if (!element) {
      return;
    }
    if (!editor.isEditable) {
      hideHandle();
      return;
    }
    element.style.visibility = "";
    element.style.pointerEvents = "auto";
  }
  function repositionDragHandle(dom) {
    const virtualElement = (getReferencedVirtualElement == null ? void 0 : getReferencedVirtualElement()) || {
      getBoundingClientRect: () => dom.getBoundingClientRect()
    };
    computePosition(virtualElement, element, computePositionConfig).then((val) => {
      Object.assign(element.style, {
        position: val.strategy,
        left: `${val.x}px`,
        top: `${val.y}px`
      });
    });
  }
  function onDragStart(e) {
    onElementDragStart == null ? void 0 : onElementDragStart(e);
    dragHandler(e, editor);
    setTimeout(() => {
      if (element) {
        element.style.pointerEvents = "none";
      }
    }, 0);
  }
  function onDragEnd(e) {
    onElementDragEnd == null ? void 0 : onElementDragEnd(e);
    hideHandle();
    if (element) {
      element.style.pointerEvents = "auto";
    }
  }
  element.addEventListener("dragstart", onDragStart);
  element.addEventListener("dragend", onDragEnd);
  wrapper.appendChild(element);
  return {
    unbind() {
      element.removeEventListener("dragstart", onDragStart);
      element.removeEventListener("dragend", onDragEnd);
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
        pendingMouseCoords = null;
      }
    },
    plugin: new Plugin({
      key: typeof pluginKey === "string" ? new PluginKey(pluginKey) : pluginKey,
      state: {
        init() {
          return { locked: false };
        },
        apply(tr, value, _oldState, state) {
          const isLocked = tr.getMeta("lockDragHandle");
          const hideDragHandle = tr.getMeta("hideDragHandle");
          if (isLocked !== void 0) {
            locked = isLocked;
          }
          if (hideDragHandle) {
            hideHandle();
            locked = false;
            currentNode = null;
            currentNodePos = -1;
            onNodeChange == null ? void 0 : onNodeChange({ editor, node: null, pos: -1 });
            return value;
          }
          if (tr.docChanged && currentNodePos !== -1 && element) {
            if (isChangeOrigin(tr)) {
              const newPos = getAbsolutePos(state, currentNodeRelPos);
              if (newPos !== currentNodePos) {
                currentNodePos = newPos;
              }
            } else {
              const newPos = tr.mapping.map(currentNodePos);
              if (newPos !== currentNodePos) {
                currentNodePos = newPos;
                currentNodeRelPos = getRelativePos(state, currentNodePos);
              }
            }
          }
          return value;
        }
      },
      view: (view) => {
        var _a;
        element.draggable = true;
        element.style.pointerEvents = "auto";
        (_a = editor.view.dom.parentElement) == null ? void 0 : _a.appendChild(wrapper);
        wrapper.style.pointerEvents = "none";
        wrapper.style.position = "absolute";
        wrapper.style.top = "0";
        wrapper.style.left = "0";
        return {
          update(_, oldState) {
            if (!element) {
              return;
            }
            if (!editor.isEditable) {
              hideHandle();
              return;
            }
            if (locked) {
              element.draggable = false;
            } else {
              element.draggable = true;
            }
            if (view.state.doc.eq(oldState.doc) || currentNodePos === -1) {
              return;
            }
            let domNode = view.nodeDOM(currentNodePos);
            domNode = getOuterDomNode(view, domNode);
            if (domNode === view.dom) {
              return;
            }
            if ((domNode == null ? void 0 : domNode.nodeType) !== 1) {
              return;
            }
            const domNodePos = view.posAtDOM(domNode, 0);
            const outerNode = getOuterNode(editor.state.doc, domNodePos);
            const outerNodePos = getOuterNodePos(editor.state.doc, domNodePos);
            currentNode = outerNode;
            currentNodePos = outerNodePos;
            currentNodeRelPos = getRelativePos(view.state, currentNodePos);
            onNodeChange == null ? void 0 : onNodeChange({ editor, node: currentNode, pos: currentNodePos });
            repositionDragHandle(domNode);
          },
          // TODO: Kills even on hot reload
          destroy() {
            if (rafId) {
              cancelAnimationFrame(rafId);
              rafId = null;
              pendingMouseCoords = null;
            }
            if (element) {
              removeNode(wrapper);
            }
          }
        };
      },
      props: {
        handleDOMEvents: {
          keydown(view) {
            if (!element || locked) {
              return false;
            }
            if (view.hasFocus()) {
              hideHandle();
              currentNode = null;
              currentNodePos = -1;
              onNodeChange == null ? void 0 : onNodeChange({ editor, node: null, pos: -1 });
              return false;
            }
            return false;
          },
          mouseleave(_view, e) {
            if (locked) {
              return false;
            }
            if (e.target && !wrapper.contains(e.relatedTarget)) {
              hideHandle();
              currentNode = null;
              currentNodePos = -1;
              onNodeChange == null ? void 0 : onNodeChange({ editor, node: null, pos: -1 });
            }
            return false;
          },
          mousemove(view, e) {
            if (!element || locked) {
              return false;
            }
            pendingMouseCoords = { x: e.clientX, y: e.clientY };
            if (rafId) {
              return false;
            }
            rafId = requestAnimationFrame(() => {
              rafId = null;
              if (!pendingMouseCoords) {
                return;
              }
              const { x, y } = pendingMouseCoords;
              pendingMouseCoords = null;
              const nodeData = findElementNextToCoords({
                x,
                y,
                editor
              });
              if (!nodeData.resultElement) {
                return;
              }
              let domNode = nodeData.resultElement;
              domNode = getOuterDomNode(view, domNode);
              if (domNode === view.dom) {
                return;
              }
              if ((domNode == null ? void 0 : domNode.nodeType) !== 1) {
                return;
              }
              const domNodePos = view.posAtDOM(domNode, 0);
              const outerNode = getOuterNode(editor.state.doc, domNodePos);
              if (outerNode !== currentNode) {
                const outerNodePos = getOuterNodePos(editor.state.doc, domNodePos);
                currentNode = outerNode;
                currentNodePos = outerNodePos;
                currentNodeRelPos = getRelativePos(view.state, currentNodePos);
                onNodeChange == null ? void 0 : onNodeChange({ editor, node: currentNode, pos: currentNodePos });
                repositionDragHandle(domNode);
                showHandle();
              }
            });
            return false;
          }
        }
      }
    })
  };
};
var defaultComputePositionConfig = {
  placement: "left-start",
  strategy: "absolute"
};
Extension.create({
  name: "dragHandle",
  addOptions() {
    return {
      render() {
        const element = document.createElement("div");
        element.classList.add("drag-handle");
        return element;
      },
      computePositionConfig: {},
      locked: false,
      onNodeChange: () => {
        return null;
      },
      onElementDragStart: void 0,
      onElementDragEnd: void 0
    };
  },
  addCommands() {
    return {
      lockDragHandle: () => ({ editor }) => {
        this.options.locked = true;
        return editor.commands.setMeta("lockDragHandle", this.options.locked);
      },
      unlockDragHandle: () => ({ editor }) => {
        this.options.locked = false;
        return editor.commands.setMeta("lockDragHandle", this.options.locked);
      },
      toggleDragHandle: () => ({ editor }) => {
        this.options.locked = !this.options.locked;
        return editor.commands.setMeta("lockDragHandle", this.options.locked);
      }
    };
  },
  addProseMirrorPlugins() {
    const element = this.options.render();
    return [
      DragHandlePlugin({
        computePositionConfig: { ...defaultComputePositionConfig, ...this.options.computePositionConfig },
        getReferencedVirtualElement: this.options.getReferencedVirtualElement,
        element,
        editor: this.editor,
        onNodeChange: this.options.onNodeChange,
        onElementDragStart: this.options.onElementDragStart,
        onElementDragEnd: this.options.onElementDragEnd
      }).plugin
    ];
  }
});
var DragHandle = Vue.extend({
  name: "DragHandleVue",
  props: {
    pluginKey: {
      type: [String, Object],
      default: () => dragHandlePluginDefaultKey
    },
    editor: {
      type: Object,
      required: true
    },
    computePositionConfig: {
      type: Object,
      default: () => ({})
    },
    onNodeChange: {
      type: Function,
      default: null
    },
    onElementDragStart: {
      type: Function,
      default: null
    },
    onElementDragEnd: {
      type: Function,
      default: null
    },
    class: {
      type: String,
      default: "drag-handle"
    }
  },
  mounted() {
    const { editor, pluginKey, onNodeChange, onElementDragStart, onElementDragEnd } = this.$props;
    editor.registerPlugin(
      DragHandlePlugin({
        editor,
        element: this.$el,
        pluginKey,
        computePositionConfig: { ...defaultComputePositionConfig, ...this.computePositionConfig },
        onNodeChange,
        onElementDragStart,
        onElementDragEnd
      }).plugin
    );
  },
  // eslint-disable-next-line vue/no-deprecated-destroyed-lifecycle
  beforeDestroy() {
    const { pluginKey, editor } = this.$props;
    editor.unregisterPlugin(pluginKey);
  },
  render(h) {
    return h(
      "div",
      {
        class: this.class
      },
      this.$slots.default
    );
  }
});
const _sfc_main$a = {
  name: "DragVerticalIcon",
  emits: ["click"],
  props: {
    title: {
      type: String
    },
    fillColor: {
      type: String,
      default: "currentColor"
    },
    size: {
      type: Number,
      default: 24
    }
  }
};
var _sfc_render$a = function render6() {
  var _vm = this, _c = _vm._self._c;
  return _c("span", _vm._b({ staticClass: "material-design-icon drag-vertical-icon", attrs: { "aria-hidden": _vm.title ? null : "true", "aria-label": _vm.title, "role": "img" }, on: { "click": function($event) {
    return _vm.$emit("click", $event);
  } } }, "span", _vm.$attrs, false), [_c("svg", { staticClass: "material-design-icon__svg", attrs: { "fill": _vm.fillColor, "width": _vm.size, "height": _vm.size, "viewBox": "0 0 24 24" } }, [_c("path", { attrs: { "d": "M9,3H11V5H9V3M13,3H15V5H13V3M9,7H11V9H9V7M13,7H15V9H13V7M9,11H11V13H9V11M13,11H15V13H13V11M9,15H11V17H9V15M13,15H15V17H13V15M9,19H11V21H9V19M13,19H15V21H13V19Z" } }, [_vm.title ? _c("title", [_vm._v(_vm._s(_vm.title))]) : _vm._e()])])]);
};
var _sfc_staticRenderFns$a = [];
_sfc_render$a._withStripped = true;
var __component__$a = /* @__PURE__ */ normalizeComponent(
  _sfc_main$a,
  _sfc_render$a,
  _sfc_staticRenderFns$a,
  false,
  null,
  null
);
__component__$a.options.__file = "/Users/jamesmanuel/Sites/nextcloud-dev/text/node_modules/vue-material-design-icons/DragVertical.vue";
const DragVerticalIcon = __component__$a.exports;
const _sfc_main$9 = {
  name: "FloatingButtons",
  components: {
    DragHandle,
    DragVerticalIcon,
    NcButton,
    PlusIcon
  },
  setup() {
    const { editor } = useEditor();
    return { editor };
  },
  data() {
    return {
      node: null,
      pos: -1
    };
  },
  computed: {
    isHeadingNode() {
      return this.node?.type === this.editor.schema.nodes.heading;
    }
  },
  methods: {
    onNodeChange({ node, pos }) {
      this.node = node;
      this.pos = pos;
    },
    onOpenSmartPicker() {
      if (!this.node || this.pos === -1) {
        return;
      }
      const { schema } = this.editor;
      const emptyNode = this.node.textContent.trim() === "" && (this.node.children.length === 0 || this.node.children.every((n) => n.type === schema.nodes.text));
      const pos = emptyNode ? this.pos + 1 : this.pos + this.node.nodeSize;
      this.editor.chain().insertContentAt(pos, "/").focus().run();
    },
    t: translate
  }
};
var _sfc_render$9 = function render7() {
  var _vm = this, _c = _vm._self._c;
  return _c("DragHandle", { staticClass: "floating-buttons", class: { heading: _vm.isHeadingNode }, attrs: { "editor": _vm.editor, "on-node-change": _vm.onNodeChange } }, [_c("NcButton", { attrs: { "variant": "tertiary-no-background", "size": "small", "title": _vm.t("text", "Insert below") }, on: { "click": _vm.onOpenSmartPicker }, scopedSlots: _vm._u([{ key: "icon", fn: function() {
    return [_c("PlusIcon", { attrs: { "size": 16 } })];
  }, proxy: true }]) }), _c("NcButton", { staticClass: "drag-button", attrs: { "variant": "tertiary-no-background", "size": "small", "title": _vm.t("text", "Click for options, hold to drag") }, scopedSlots: _vm._u([{ key: "icon", fn: function() {
    return [_c("DragVerticalIcon", { attrs: { "size": 16 } })];
  }, proxy: true }]) })], 1);
};
var _sfc_staticRenderFns$9 = [];
_sfc_render$9._withStripped = true;
var __component__$9 = /* @__PURE__ */ normalizeComponent(
  _sfc_main$9,
  _sfc_render$9,
  _sfc_staticRenderFns$9,
  false,
  null,
  "27af2da8"
);
__component__$9.options.__file = "/Users/jamesmanuel/Sites/nextcloud-dev/text/src/components/Editor/FloatingButtons.vue";
const FloatingButtons = __component__$9.exports;
const _sfc_main$8 = {
  name: "ContentContainer",
  components: {
    EditorContent,
    EditorOutline,
    FloatingButtons
  },
  mixins: [useOutlineStateMixin],
  props: {
    readOnly: {
      type: Boolean,
      required: true
    }
  },
  setup() {
    const isMobile = useIsMobile();
    const { editor } = useEditor();
    const { isRichEditor, isRichWorkspace } = useEditorFlags();
    const { isFullWidth } = useEditorWidth();
    return { editor, isMobile, isFullWidth, isRichEditor, isRichWorkspace };
  },
  computed: {
    showOutline() {
      return this.$outlineState.visible;
    },
    showFloatingButtons() {
      return !this.readOnly && !this.isMobile && !this.isFullWidth && this.isRichEditor && !this.isRichWorkspace;
    }
  }
};
var _sfc_render$8 = function render8() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "content-wrapper text-editor__content-wrapper", class: {
    "--show-outline": _vm.showOutline
  }, attrs: { "data-text-el": "editor-content-wrapper" } }, [_vm.showOutline ? _c("div", { staticClass: "text-editor__content-wrapper__left" }, [_c("EditorOutline")], 1) : _vm._e(), _vm._t("default"), _vm.showFloatingButtons ? _c("FloatingButtons") : _vm._e(), _c("EditorContent", { staticClass: "editor__content text-editor__content", attrs: { "role": "document", "editor": _vm.editor } }), _c("div", { staticClass: "text-editor__content-wrapper__right" })], 2);
};
var _sfc_staticRenderFns$8 = [];
_sfc_render$8._withStripped = true;
var __component__$8 = /* @__PURE__ */ normalizeComponent(
  _sfc_main$8,
  _sfc_render$8,
  _sfc_staticRenderFns$8,
  false,
  null,
  "7b62763a"
);
__component__$8.options.__file = "/Users/jamesmanuel/Sites/nextcloud-dev/text/src/components/Editor/ContentContainer.vue";
const ContentContainer = __component__$8.exports;
function uploadAttachment(connection, file) {
  const {
    documentId,
    sessionId,
    sessionToken,
    shareToken: token
  } = unref(connection);
  const formData = new FormData();
  formData.append("file", file);
  const url = generateUrl(`apps/text/attachment/upload?`);
  return cancelableClient.post(url, formData, {
    headers: { "Content-Type": "multipart/form-data" },
    params: { documentId, sessionId, sessionToken, token }
  });
}
function createAttachment(connection, template) {
  const { documentId, sessionId, sessionToken } = unref(connection);
  const url = generateUrl(`apps/text/attachment/create`);
  return cancelableClient.post(url, {
    documentId,
    sessionId,
    sessionToken,
    fileName: `${template.app}${template.extension}`
  });
}
function insertAttachmentFile(connection, filePath) {
  const { documentId, sessionId, sessionToken } = unref(connection);
  const url = generateUrl(`apps/text/attachment/filepath`);
  return cancelableClient.post(url, {
    documentId,
    sessionId,
    sessionToken,
    filePath
  });
}
const getDir = (val) => val.split("/").slice(0, -1).join("/");
const _sfc_main$7 = {
  name: "MediaHandler",
  mixins: [useFileMixin],
  provide() {
    const val = {};
    Object.defineProperties(val, {
      [ACTION_ATTACHMENT_PROMPT]: {
        get: () => this.showAttachmentPrompt
      },
      [ACTION_CHOOSE_LOCAL_ATTACHMENT]: {
        get: () => this.chooseLocalFile
      },
      [ACTION_CREATE_ATTACHMENT]: {
        get: () => this.createAttachment
      },
      [STATE_UPLOADING]: {
        get: () => this.state
      }
    });
    return val;
  },
  setup() {
    const { connection } = useConnection();
    const isMobile = useIsMobile();
    const { editor } = useEditor();
    return {
      connection,
      editor,
      isMobile
    };
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
      return this.lastFilePath ?? getDir(this.$file?.relativePath ?? "/");
    }
  },
  methods: {
    setDraggedOver(val, event) {
      if (event.dataTransfer.types.includes("Files")) {
        this.draggedOver = val;
      }
    },
    onPaste(e) {
      this.uploadAttachmentFiles(e.detail.files);
    },
    onEditorDrop(e) {
      this.uploadAttachmentFiles(e.detail.files, e.detail.position);
    },
    onAttachmentUploadFilePicked(event) {
      this.uploadAttachmentFiles(event.target.files);
      event.target.value = "";
    },
    chooseLocalFile() {
      this.$refs.attachmentFileInput.click();
    },
    async uploadAttachmentFiles(files, position = null) {
      if (!files) {
        return;
      }
      this.state.isUploadingAttachments = true;
      const uploadPromises = [...files].map((file) => {
        return this.uploadAttachmentFile(file, position);
      });
      return Promise.all(uploadPromises).catch((error) => {
        logger.error("Uploading multiple attachments failed", { error });
        showError(t("text", "Uploading multiple attachments failed."));
      }).then(() => {
        this.state.isUploadingAttachments = false;
      });
    },
    async uploadAttachmentFile(file, position = null) {
      this.state.isUploadingAttachments = true;
      return uploadAttachment(this.connection, file).then((response) => {
        this.insertAttachment(
          response.data?.name,
          response.data?.id,
          file.type,
          position,
          response.data?.dirname
        );
      }).catch((error) => {
        logger.error("Uploading attachment failed", { error });
        if (error.response?.data.error) {
          showError(
            t("text", "Uploading attachment failed: {error}", {
              error: error.response.data.error
            })
          );
        } else {
          showError(t("text", "Uploading attachment failed."));
        }
      }).then(() => {
        this.state.isUploadingAttachments = false;
      });
    },
    showAttachmentPrompt() {
      const currentUser = getCurrentUser();
      if (!currentUser) {
        return;
      }
      OC.dialogs.filepicker(
        t("text", "Insert an attachment"),
        (filePath) => {
          this.insertFromPath(filePath);
        },
        false,
        [],
        true,
        void 0,
        this.initialFilePath
      );
    },
    insertFromPath(filePath) {
      this.lastFilePath = getDir(filePath);
      this.state.isUploadingAttachments = true;
      return insertAttachmentFile(this.connection, filePath).then((response) => {
        this.insertAttachment(
          response.data?.name,
          response.data?.id,
          response.data?.mimetype,
          null,
          response.data?.dirname
        );
      }).catch((error) => {
        logger.error("Failed to insert from Files", { error });
        showError(t("text", "Failed to insert from Files"));
      }).then(() => {
        this.state.isUploadingAttachments = false;
      });
    },
    createAttachment(template) {
      this.state.isUploadingAttachments = true;
      return createAttachment(this.connection, template).then((response) => {
        this.insertAttachmentPreview(response.data?.id);
      }).catch((error) => {
        logger.error("Failed to create attachment", { error });
        showError(t("text", "Failed to create attachment"));
      }).then(() => {
        this.state.isUploadingAttachments = false;
      });
    },
    insertAttachmentPreview(fileId) {
      const url = new URL(generateUrl(`/f/${fileId}`), window.origin);
      const href = url.href.replaceAll(" ", "%20");
      this.editor.chain().focus().insertPreview(href).run();
    },
    insertAttachment(name, fileId, mimeType, position = null, dirname = "") {
      const src = dirname + "/" + encodeURIComponent(name).replace(/[!'()*]/g, (c) => {
        return "%" + c.charCodeAt(0).toString(16).toUpperCase();
      });
      const alt = name.replaceAll(/[[\]]/g, "");
      const chain = position ? this.editor.chain().focus(position) : this.editor.chain();
      chain.setImage({ src, alt }).run();
      const selection = this.editor.view.state.selection;
      if (!selection.empty) {
        this.editor.commands.focus(selection.to);
      }
      this.editor.commands.scrollIntoView();
      this.editor.commands.setMeta("insertedAttachmentSrc", { src });
      emit("text:image-node:add", null);
    }
  }
};
var _sfc_render$7 = function render9() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "editor editor-media-handler", class: { draggedOver: _vm.draggedOver, "is-mobile": _vm.isMobile }, attrs: { "data-text-el": "editor-media-handler" }, on: { "image-paste": _vm.onPaste, "dragover": function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    return _vm.setDraggedOver(true, $event);
  }, "dragleave": function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    return _vm.setDraggedOver(false, $event);
  }, "drop": function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    return _vm.setDraggedOver(false, $event);
  }, "file-drop": _vm.onEditorDrop } }, [_c("input", { directives: [{ name: "show", rawName: "v-show", value: false, expression: "false" }], ref: "attachmentFileInput", attrs: { "data-text-el": "attachment-file-input", "type": "file", "accept": "*/*", "multiple": "" }, on: { "change": _vm.onAttachmentUploadFilePicked } }), _vm._t("default")], 2);
};
var _sfc_staticRenderFns$7 = [];
_sfc_render$7._withStripped = true;
var __component__$7 = /* @__PURE__ */ normalizeComponent(
  _sfc_main$7,
  _sfc_render$7,
  _sfc_staticRenderFns$7,
  false,
  null,
  null
);
__component__$7.options.__file = "/Users/jamesmanuel/Sites/nextcloud-dev/text/src/components/Editor/MediaHandler.vue";
const MediaHandler = __component__$7.exports;
const _sfc_main$6 = {
  name: "MainContainer",
  components: {
    MediaHandler
  },
  mixins: [useEditorUpload]
};
var _sfc_render$6 = function render10() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "editor" }, [_vm.$editorUpload ? _c("MediaHandler", { staticClass: "text-editor__main" }, [_vm._t("default")], 2) : _vm._t("default")], 2);
};
var _sfc_staticRenderFns$6 = [];
_sfc_render$6._withStripped = true;
var __component__$6 = /* @__PURE__ */ normalizeComponent(
  _sfc_main$6,
  _sfc_render$6,
  _sfc_staticRenderFns$6,
  false,
  null,
  "a21fcec7"
);
__component__$6.options.__file = "/Users/jamesmanuel/Sites/nextcloud-dev/text/src/components/Editor/MainContainer.vue";
const MainContainer = __component__$6.exports;
const _sfc_main$5 = {
  name: "Wrapper",
  provide() {
    const val = {};
    Object.defineProperties(val, {
      [OUTLINE_STATE]: {
        get: () => this.outline
      },
      [OUTLINE_ACTIONS]: {
        get: () => ({
          toggle: this.outlineToggle
        })
      },
      [READ_ONLY_ACTIONS]: {
        get: () => ({
          toggle: this.readOnlyToggle
        })
      }
    });
    return val;
  },
  props: {
    isResolvingConflict: {
      type: Boolean,
      default: false
    },
    hasConnectionIssue: {
      type: Boolean,
      default: false
    },
    contentLoaded: {
      type: Boolean,
      default: true
    },
    showOutlineOutside: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const { isRichEditor, isRichWorkspace } = useEditorFlags();
    return { isRichEditor, isRichWorkspace };
  },
  data: () => ({
    outline: {
      visible: false,
      enable: false
    }
  }),
  computed: {
    showOutline() {
      return this.isAbleToShowOutline ? this.outline.visible : false;
    },
    isAbleToShowOutline() {
      if (this.isRichWorkspace) {
        return false;
      }
      return true;
    }
  },
  watch: {
    showOutlineOutside() {
      this.outline.visible = this.showOutlineOutside;
    }
  },
  mounted() {
    subscribe("text:keyboard:outline", this.outlineToggle);
    this.outline.enable = this.isAbleToShowOutline;
    this.$watch(
      () => this.isAbleToShowOutline,
      (enable) => {
        Object.assign(this.outline, { enable });
      }
    );
  },
  beforeDestroy() {
    unsubscribe("text:keyboard:outline", this.outlineToggle);
  },
  methods: {
    outlineToggle() {
      this.outline.visible = !this.outline.visible;
      this.$emit("outline-toggled", this.outline.visible);
    },
    readOnlyToggle() {
      this.$emit("read-only-toggled");
    }
  }
};
var _sfc_render$5 = function render11() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "text-editor__wrapper", class: {
    "has-conflicts": _vm.isResolvingConflict,
    "is-rich-workspace": _vm.isRichWorkspace,
    "is-rich-editor": _vm.isRichEditor
  } }, [_vm._t("default")], 2);
};
var _sfc_staticRenderFns$5 = [];
_sfc_render$5._withStripped = true;
var __component__$5 = /* @__PURE__ */ normalizeComponent(
  _sfc_main$5,
  _sfc_render$5,
  _sfc_staticRenderFns$5,
  false,
  null,
  "2835c090"
);
__component__$5.options.__file = "/Users/jamesmanuel/Sites/nextcloud-dev/text/src/components/Editor/Wrapper.vue";
const Wrapper = __component__$5.exports;
function isMobilePlatform() {
  if (navigator?.userAgentData?.mobile !== void 0)
    return navigator.userAgentData.mobile;
  const mobileDevices = [
    /Android/i,
    /webOS/i,
    /iPhone/i,
    /iPad/i,
    /iPod/i,
    /playbook/i,
    /silk/i,
    /BlackBerry/i,
    /Windows Phone/i
  ];
  return mobileDevices.some((regex) => navigator.userAgent.match(regex));
}
const _sfc_main$4 = {
  name: "HelpModal",
  components: {
    NcDialog
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
      },
      ctrlOrModKey: TRANSLATIONS[MODIFIERS.Mod]
    };
  },
  computed: {
    isFormatted() {
      return (style) => this.formatted[style];
    },
    // Cache the output of `isMobilePlatform()`
    isMobileCached() {
      return this.isMobilePlatform();
    }
  },
  methods: {
    t: translate,
    toggleFormatted(style) {
      this.formatted[style] = !this.formatted[style];
    },
    isMobilePlatform
  }
};
var _sfc_render$4 = function render12() {
  var _vm = this, _c = _vm._self._c;
  return _c("NcDialog", { attrs: { "size": "large", "data-text-el": "formatting-help", "name": _vm.t("text", "Formatting and shortcuts"), "close-on-click-outside": true }, on: { "closing": function($event) {
    return _vm.$emit("close");
  } } }, [_c("h2", [_vm._v(_vm._s(_vm.t("text", "Formatting and shortcuts")))]), _c("p", [_vm._v(_vm._s(_vm.t("text", "Speed up your writing with simple shortcuts.")))]), !_vm.isMobileCached ? _c("p", [_vm._v(" " + _vm._s(_vm.t("text", "Just type the Markdown syntax or use keyboard shortcuts from below.")) + " ")]) : _c("p", [_vm._v(" " + _vm._s(_vm.t("text", "Just type the Markdown syntax from below.")) + " ")]), _c("table", [_c("thead", [_c("tr", [_c("th", [_vm._v(_vm._s(_vm.t("text", "Style")))]), _c("th", [_vm._v(_vm._s(_vm.t("text", "Syntax")))]), !_vm.isMobileCached ? _c("th", [_vm._v(" " + _vm._s(_vm.t("text", "Keyboard shortcuts")) + " ")]) : _vm._e()])]), _c("tbody", [_c("tr", [_c("td", [_vm._v(_vm._s(_vm.t("text", "New paragraph")))]), _c("td", [_c("kbd", [_vm._v(_vm._s(_vm.t("text", "Enter")))])]), !_vm.isMobileCached ? _c("td") : _vm._e()]), _c("tr", [_c("td", [_vm._v(_vm._s(_vm.t("text", "Hard line break")))]), _c("td", [_c("kbd", [_vm._v(_vm._s(_vm.t("text", "Enter")))]), _vm._v(" " + _vm._s(_vm.t("text", "followed by")) + " "), _c("kbd", [_vm._v(_vm._s(_vm.t("text", "Backspace")))])]), !_vm.isMobileCached ? _c("td", [_c("kbd", [_vm._v(_vm._s(_vm.t("text", "Shift")))]), _vm._v(" + "), _c("kbd", [_vm._v(_vm._s(_vm.t("text", "Enter")))])]) : _vm._e()]), _c("tr", [_c("td", [_vm._v(_vm._s(_vm.t("text", "Bold")))]), _c("td", [_c("code", [_vm._v("**" + _vm._s(_vm.t("text", "Bold text")) + "**")])]), !_vm.isMobileCached ? _c("td", [_c("kbd", [_vm._v(_vm._s(_vm.ctrlOrModKey))]), _vm._v(" + "), _c("kbd", [_vm._v("B")])]) : _vm._e()]), _c("tr", [_c("td", [_vm._v(_vm._s(_vm.t("text", "Italic")))]), _c("td", [_c("code", [_vm._v("*" + _vm._s(_vm.t("text", "Italicized text")) + "*")])]), !_vm.isMobileCached ? _c("td", [_c("kbd", [_vm._v(_vm._s(_vm.ctrlOrModKey))]), _vm._v(" + "), _c("kbd", [_vm._v("I")])]) : _vm._e()]), _c("tr", [_c("td", [_vm._v(_vm._s(_vm.t("text", "Strikethrough")))]), _c("td", [_c("code", [_vm._v("~~" + _vm._s(_vm.t("text", "Mistaken text")) + "~~")])]), !_vm.isMobileCached ? _c("td", [_c("kbd", [_vm._v(_vm._s(_vm.ctrlOrModKey))]), _vm._v(" + "), _c("kbd", [_vm._v(_vm._s(_vm.t("text", "Shift")))]), _vm._v(" + "), _c("kbd", [_vm._v("S")])]) : _vm._e()]), _c("tr", [_c("td", [_vm._v(_vm._s(_vm.t("text", "Underline")))]), _c("td", [_c("code", [_vm._v("__" + _vm._s(_vm.t("text", "Underlined text")) + "__")])]), !_vm.isMobileCached ? _c("td", [_c("kbd", [_vm._v(_vm._s(_vm.ctrlOrModKey))]), _vm._v(" + "), _c("kbd", [_vm._v("U")])]) : _vm._e()]), _c("tr", [_c("td", { staticClass: "ellipsis_top" }, [_vm._v(" " + _vm._s(_vm.t("text", "Heading 1")) + " ")]), _c("td", { staticClass: "ellipsis_top" }, [_c("code", [_vm._v("# " + _vm._s(_vm.t("text", "Heading level 1")))])]), !_vm.isMobileCached ? _c("td", { staticClass: "ellipsis_top" }, [_c("kbd", [_vm._v(_vm._s(_vm.ctrlOrModKey))]), _vm._v(" + "), _c("kbd", [_vm._v(_vm._s(_vm.t("text", "Shift")))]), _vm._v(" + "), _c("kbd", [_vm._v("1")])]) : _vm._e()]), _c("tr", [_c("td", { staticClass: "noborder ellipsis" }, [_vm._v("…")]), _c("td", { staticClass: "noborder ellipsis" }, [_vm._v("…")]), !_vm.isMobileCached ? _c("td", { staticClass: "ellipsis noborder" }, [_vm._v("…")]) : _vm._e()]), _c("tr", [_c("td", { staticClass: "noborder ellipsis_bottom" }, [_vm._v(" " + _vm._s(_vm.t("text", "Heading 6")) + " ")]), _c("td", { staticClass: "noborder ellipsis_bottom" }, [_c("code", [_vm._v("###### " + _vm._s(_vm.t("text", "Heading level 6")))])]), !_vm.isMobileCached ? _c("td", { staticClass: "noborder ellipsis_bottom" }, [_c("kbd", [_vm._v(_vm._s(_vm.ctrlOrModKey))]), _vm._v(" + "), _c("kbd", [_vm._v(_vm._s(_vm.t("text", "Shift")))]), _vm._v(" + "), _c("kbd", [_vm._v("6")])]) : _vm._e()]), _c("tr", [_c("td", [_vm._v(_vm._s(_vm.t("text", "Unordered list")))]), _c("td", [_c("code", [_vm._v("* " + _vm._s(_vm.t("text", "An item")))])]), !_vm.isMobileCached ? _c("td", [_c("kbd", [_vm._v(_vm._s(_vm.ctrlOrModKey))]), _vm._v(" + "), _c("kbd", [_vm._v(_vm._s(_vm.t("text", "Shift")))]), _vm._v(" + "), _c("kbd", [_vm._v("8")])]) : _vm._e()]), _c("tr", [_c("td", [_vm._v(_vm._s(_vm.t("text", "Ordered list")))]), _c("td", [_c("code", [_vm._v("1. " + _vm._s(_vm.t("text", "First item")))])]), !_vm.isMobileCached ? _c("td", [_c("kbd", [_vm._v(_vm._s(_vm.ctrlOrModKey))]), _vm._v(" + "), _c("kbd", [_vm._v(_vm._s(_vm.t("text", "Shift")))]), _vm._v(" + "), _c("kbd", [_vm._v("7")])]) : _vm._e()]), _c("tr", [_c("td", [_vm._v(_vm._s(_vm.t("text", "Checklist")))]), _c("td", [_c("code", [_vm._v("* [] " + _vm._s(_vm.t("text", "To-Do item")))])]), !_vm.isMobileCached ? _c("td", [_c("kbd", [_vm._v(_vm._s(_vm.ctrlOrModKey))]), _vm._v(" + "), _c("kbd", [_vm._v(_vm._s(_vm.t("text", "Shift")))]), _vm._v(" + "), _c("kbd", [_vm._v("9")])]) : _vm._e()]), _c("tr", [_c("td", [_vm._v(_vm._s(_vm.t("text", "Blockquote")))]), _c("td", [_c("code", [_vm._v("> " + _vm._s(_vm.t("text", "Quoted text")))])]), !_vm.isMobileCached ? _c("td", [_c("kbd", [_vm._v(_vm._s(_vm.ctrlOrModKey))]), _vm._v(" + "), _c("kbd", [_vm._v(">")])]) : _vm._e()]), _c("tr", [_c("td", [_vm._v(_vm._s(_vm.t("text", "Code block")))]), _c("td", [_c("code", [_vm._v("``` " + _vm._s(_vm.t("text", "Some code")))])]), !_vm.isMobileCached ? _c("td") : _vm._e()]), _c("tr", [_c("td", [_vm._v(_vm._s(_vm.t("text", "Link")))]), _c("td", [_c("code", [_vm._v("[Title](https://example.org)")])]), !_vm.isMobileCached ? _c("td", [_c("kbd", [_vm._v(_vm._s(_vm.ctrlOrModKey))]), _vm._v(" + "), _c("kbd", [_vm._v("K")])]) : _vm._e()]), _c("tr", [_c("td", [_vm._v(_vm._s(_vm.t("text", "Insert emoji")))]), _c("td", [_c("code", [_vm._v(":" + _vm._s(_vm.t("text", "emoji")))])]), !_vm.isMobileCached ? _c("td") : _vm._e()]), _c("tr", [_c("td", [_vm._v(_vm._s(_vm.t("text", "Mention someone")))]), _c("td", [_c("code", [_vm._v("@" + _vm._s(_vm.t("text", "name")))])]), !_vm.isMobileCached ? _c("td") : _vm._e()]), _c("tr", [_c("td", [_vm._v(_vm._s(_vm.t("text", "Smart picker")))]), _c("td", [_c("code", [_vm._v("/" + _vm._s(_vm.t("text", "something")))])]), !_vm.isMobileCached ? _c("td") : _vm._e()])])]), _c("table", { attrs: { "vif": "!isMobileCached" } }, [_c("thead", [_c("tr", [_c("th", [_vm._v(_vm._s(_vm.t("text", "Action")))]), _c("th", [_vm._v(_vm._s(_vm.t("text", "Keyboard shortcuts")))])])]), _c("tbody", [_c("tr", [_c("td", [_vm._v(_vm._s(_vm.t("text", "Undo")))]), _c("td", [_c("kbd", [_vm._v(_vm._s(_vm.ctrlOrModKey))]), _vm._v(" + "), _c("kbd", [_vm._v("Z")])])]), _c("tr", [_c("td", [_vm._v(_vm._s(_vm.t("text", "Redo")))]), _c("td", [_c("kbd", [_vm._v(_vm._s(_vm.ctrlOrModKey))]), _vm._v(" + "), _c("kbd", [_vm._v("Y")])])]), _c("tr", [_c("td", [_vm._v(_vm._s(_vm.t("text", "Toggle outline")))]), _c("td", [_c("kbd", [_vm._v(_vm._s(_vm.ctrlOrModKey))]), _vm._v(" + "), _c("kbd", [_vm._v(_vm._s(_vm.t("text", "Alt")))]), _vm._v(" + "), _c("kbd", [_vm._v("H")])])])])])]);
};
var _sfc_staticRenderFns$4 = [];
_sfc_render$4._withStripped = true;
var __component__$4 = /* @__PURE__ */ normalizeComponent(
  _sfc_main$4,
  _sfc_render$4,
  _sfc_staticRenderFns$4,
  false,
  null,
  "e49d874c"
);
__component__$4.options.__file = "/Users/jamesmanuel/Sites/nextcloud-dev/text/src/components/HelpModal.vue";
const HelpModal = __component__$4.exports;
const _sfc_main$3 = defineComponent({
  // This component is used as a direct child of NcActions.
  // Even if it actually renders NcActionButton, NcActions cannot see it due to rendering limitations in Vue.
  // Though it works in general, NcActions doesn't handle it correctly. See NcActions docs for details.
  // Hotfix - rename the component to NcActionButton because it represents and renders it.
  // eslint-disable-next-line vue/match-component-file-name
  name: "NcActionButton",
  components: {
    NextcloudVueNcActionButton: NcActionButton,
    Help
  },
  methods: {
    t: translate
  }
});
var _sfc_render$3 = function render13() {
  var _vm = this, _c = _vm._self._c;
  _vm._self._setupProxy;
  return _c("NextcloudVueNcActionButton", _vm._g({ attrs: { "close-after-click": "", "data-text-action-entry": "formatting-help" }, scopedSlots: _vm._u([{ key: "icon", fn: function() {
    return [_c("Help")];
  }, proxy: true }]) }, _vm.$listeners), [_vm._v(" " + _vm._s(_vm.t("text", "Formatting help")) + " ")]);
};
var _sfc_staticRenderFns$3 = [];
_sfc_render$3._withStripped = true;
var __component__$3 = /* @__PURE__ */ normalizeComponent(
  _sfc_main$3,
  _sfc_render$3,
  _sfc_staticRenderFns$3,
  false,
  null,
  null
);
__component__$3.options.__file = "/Users/jamesmanuel/Sites/nextcloud-dev/text/src/components/Menu/ActionFormattingHelp.vue";
const ActionFormattingHelp = __component__$3.exports;
const _sfc_main$2 = defineComponent({
  name: "CharacterCount",
  components: {
    AlphabeticalVariant,
    NcActionText
  },
  props: {
    visible: Boolean
  },
  setup() {
    const { editor } = useEditor();
    const countString = ref$1("");
    const refresh = () => {
      const { storage, state } = editor;
      const wordCount = storage.characterCount.words({ node: state.doc });
      const charCount = storage.characterCount.characters({ node: state.doc });
      const words = translatePlural("text", "%n word", "%n words", wordCount);
      const chars = translatePlural("text", "%n char", "%n chars", charCount);
      countString.value = [words, chars].join(", ");
      console.debug({ wordCount, charCount, countString: countString.value });
    };
    return { countString, refresh };
  },
  watch: {
    visible: "refresh"
  },
  created() {
    this.refresh();
  }
});
var _sfc_render$2 = function render14() {
  var _vm = this, _c = _vm._self._c;
  _vm._self._setupProxy;
  return _c("NcActionText", { attrs: { "data-text-action-entry": "character-count", "name": _vm.countString }, scopedSlots: _vm._u([{ key: "icon", fn: function() {
    return [_c("AlphabeticalVariant")];
  }, proxy: true }]) });
};
var _sfc_staticRenderFns$2 = [];
_sfc_render$2._withStripped = true;
var __component__$2 = /* @__PURE__ */ normalizeComponent(
  _sfc_main$2,
  _sfc_render$2,
  _sfc_staticRenderFns$2,
  false,
  null,
  null
);
__component__$2.options.__file = "/Users/jamesmanuel/Sites/nextcloud-dev/text/src/components/Menu/CharacterCount.vue";
const CharacterCount = __component__$2.exports;
const _sfc_main$1 = {
  __name: "WidthToggle",
  setup(__props) {
    const { canToggleWidth, isFullWidth, setFullWidth } = useEditorWidth();
    return { __sfc: true, canToggleWidth, isFullWidth, setFullWidth, t: translate, NcActionCheckbox };
  }
};
var _sfc_render$1 = function render15() {
  var _vm = this, _c = _vm._self._c, _setup = _vm._self._setupProxy;
  return _setup.canToggleWidth ? _c(_setup.NcActionCheckbox, { attrs: { "checked": _setup.isFullWidth }, on: { "update:checked": _setup.setFullWidth } }, [_vm._v(" " + _vm._s(_setup.t("text", "Full width editor")) + " ")]) : _vm._e();
};
var _sfc_staticRenderFns$1 = [];
_sfc_render$1._withStripped = true;
var __component__$1 = /* @__PURE__ */ normalizeComponent(
  _sfc_main$1,
  _sfc_render$1,
  _sfc_staticRenderFns$1,
  false,
  null,
  null
);
__component__$1.options.__file = "/Users/jamesmanuel/Sites/nextcloud-dev/text/src/components/Menu/WidthToggle.vue";
const WidthToggle = __component__$1.exports;
const _sfc_main = {
  name: "MenuBar",
  components: {
    ActionFormattingHelp,
    ActionList,
    ActionSingle,
    HelpModal,
    NcActionSeparator,
    CharacterCount,
    WidthToggle
  },
  extends: ToolBarLogic,
  mixins: [useIsMobileMixin],
  provide() {
    const val = {};
    Object.defineProperties(val, {
      [MENU_ID]: {
        get: () => this.randomID
      }
    });
    return val;
  },
  props: {
    isHidden: {
      type: Boolean,
      default: false
    },
    openReadOnly: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const editor = useEditor();
    const { isPublic, isRichEditor, isRichWorkspace } = useEditorFlags();
    const menubar = ref$1();
    const { width } = useElementSize(menubar);
    return { editor, isPublic, isRichEditor, isRichWorkspace, menubar, width };
  },
  data() {
    return {
      entries: this.openReadOnly ? [...ReadOnlyDoneEntries, ...MenuEntries] : this.isPublic || this.isRichWorkspace ? [...MenuEntries] : [...MenuEntries, ...AssistantMenuEntries],
      randomID: `menu-bar-${Math.ceil(Math.random() * 1e4 + 500).toString(16)}`,
      displayHelp: false,
      isReady: false,
      resize: null
    };
  },
  computed: {
    visibleEntryKeys() {
      return this.entries.toSorted((a, b) => (a.priority ?? 0) - (b.priority ?? 0)).map((e) => e.key).slice(0, this.iconsLimit);
    },
    visibleEntries() {
      return this.entries.filter((entry) => {
        return this.visibleEntryKeys.includes(entry.key);
      });
    },
    hiddenEntries() {
      const remainingEntries = this.entries.filter((entry) => {
        return !this.visibleEntryKeys.includes(entry.key);
      });
      const entries = remainingEntries.reduce((acc, entry, index) => {
        const children = entry.children ?? [entry];
        if (children.length > 1) {
          const hasPreviousItem = acc.length && !acc.at(-1).isSeparator;
          const separatorBefore = hasPreviousItem ? [
            {
              key: `separator-before-${entry.id}`,
              isSeparator: true
            }
          ] : [];
          const hasNextItem = index !== remainingEntries.length - 1;
          const separatorAfter = hasNextItem ? [{ key: `separator-after-${entry.id}`, isSeparator: true }] : [];
          return [
            ...acc,
            ...separatorBefore,
            ...children,
            ...separatorAfter
          ];
        }
        return [...acc, ...children];
      }, []);
      return {
        key: "remain",
        label: this.t("text", "Remaining actions"),
        icon: DotsHorizontal,
        children: entries
      };
    },
    iconWidth() {
      const style = this.menubar && getComputedStyle(this.menubar);
      const clickableArea = style?.getPropertyValue("--default-clickable-area");
      return parseInt(clickableArea) || 34;
    },
    iconsLimit() {
      const spaceToFill = this.width - 4;
      const spacePerSlot = this.$isMobile ? this.iconWidth : this.iconWidth + 2;
      const slots = Math.floor(spaceToFill / spacePerSlot);
      return slots - 1;
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.isReady = true;
      this.$emit("update:loaded", true);
    });
  },
  methods: {
    showHelp() {
      this.displayHelp = true;
    },
    hideHelp() {
      this.displayHelp = false;
    },
    t: translate
  }
};
var _sfc_render = function render16() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "text-menubar", class: {
    "text-menubar--ready": _vm.isReady,
    "text-menubar--hide": _vm.isHidden,
    "text-menubar--is-workspace": _vm.isRichWorkspace,
    "is-mobile": _vm.$isMobile
  }, attrs: { "id": _vm.randomID, "data-text-el": "menubar", "role": "region", "aria-label": _vm.t("text", "Editor actions") } }, [_vm.displayHelp ? _c("HelpModal", { on: { "close": _vm.hideHelp } }) : _vm._e(), _vm.isRichEditor ? _c("div", { ref: "menubar", staticClass: "text-menubar__entries", attrs: { "role": "toolbar", "aria-label": _vm.t("text", "Formatting menu bar") }, on: { "keyup": [function($event) {
    if (!$event.type.indexOf("key") && _vm._k($event.keyCode, "left", 37, $event.key, ["Left", "ArrowLeft"])) return null;
    if ("button" in $event && $event.button !== 0) return null;
    $event.stopPropagation();
    return _vm.handleToolbarNavigation.apply(null, arguments);
  }, function($event) {
    if (!$event.type.indexOf("key") && _vm._k($event.keyCode, "right", 39, $event.key, ["Right", "ArrowRight"])) return null;
    if ("button" in $event && $event.button !== 2) return null;
    $event.stopPropagation();
    return _vm.handleToolbarNavigation.apply(null, arguments);
  }] } }, [_vm._l(_vm.visibleEntries, function(actionEntry, index) {
    return _c(actionEntry.component ? actionEntry.component : actionEntry.children ? "ActionList" : "ActionSingle", { key: actionEntry.key, ref: "menuEntries", refInFor: true, tag: "component", attrs: { "action-entry": actionEntry, "can-be-focussed": _vm.activeMenuEntry === index }, on: { "disabled": function($event) {
      return _vm.disableMenuEntry(actionEntry.key, $event);
    }, "click": function($event) {
      _vm.activeMenuEntry = index;
    } } });
  }), _c("ActionList", { ref: "remainingEntries", attrs: { "action-entry": _vm.hiddenEntries, "can-be-focussed": _vm.activeMenuEntry === _vm.visibleEntries.length, "force-enabled": true }, on: { "click": function($event) {
    _vm.activeMenuEntry = "remain";
  } }, scopedSlots: _vm._u([{ key: "lastAction", fn: function({ visible }) {
    return [_c("WidthToggle"), _c("ActionFormattingHelp", { on: { "click": _vm.showHelp } }), _c("NcActionSeparator"), _c("CharacterCount", _vm._b({}, "CharacterCount", { visible }, false))];
  } }], null, false, 4216951189) })], 2) : _vm._e(), _c("div", { staticClass: "text-menubar__slot" }, [_vm._t("default")], 2)], 1);
};
var _sfc_staticRenderFns = [];
_sfc_render._withStripped = true;
var __component__ = /* @__PURE__ */ normalizeComponent(
  _sfc_main,
  _sfc_render,
  _sfc_staticRenderFns,
  false,
  null,
  "dbcb2355"
);
__component__.options.__file = "/Users/jamesmanuel/Sites/nextcloud-dev/text/src/components/Menu/MenuBar.vue";
const MenuBar = __component__.exports;
export {
  AttachmentResolver as A,
  ContentContainer as C,
  MainContainer as M,
  ReadonlyBar as R,
  Wrapper as W,
  MenuBar as a,
  Collaboration as b,
  provideEditorWidth as p
};
//# sourceMappingURL=MenuBar-CduxWYdD.chunk.mjs.map
