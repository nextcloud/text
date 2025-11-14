const appName = "text";
const appVersion = "7.0.0-dev.2";
import { a as getCurrentInstance, V as Vue, c as computed, i as inject, o as onMounted, u as useCssVars } from "./vue.runtime.esm-DtAgfqM0.chunk.mjs";
import { r as register, n as normalizeComponent$1, a as n, b as t, G as GenRandomId, N as NcLoadingIcon } from "./NcLoadingIcon-D2qSC7Ri.chunk.mjs";
function normalizeComponent(scriptExports, render10, staticRenderFns, functionalTemplate, injectStyles, scopeId, moduleIdentifier, shadowMode) {
  var options = typeof scriptExports === "function" ? scriptExports.options : scriptExports;
  if (render10) {
    options.render = render10;
    options.staticRenderFns = staticRenderFns;
    options._compiled = true;
  }
  if (scopeId) {
    options._scopeId = "data-v-" + scopeId;
  }
  return {
    exports: scriptExports,
    options
  };
}
function useModelMigration(oldModelName, oldModelEvent, required = false) {
  const vm = getCurrentInstance().proxy;
  if (required && vm.$props[oldModelName] === void 0 && vm.$props.modelValue === void 0) {
    Vue.util.warn(`Missing required prop: "modelValue" or old "${oldModelName}"`);
  }
  const model = computed({
    get() {
      if (vm.$props[oldModelName] !== void 0) {
        return vm.$props[oldModelName];
      }
      return vm.$props.modelValue;
    },
    set(value) {
      vm.$emit("update:modelValue", value);
      vm.$emit("update:model-value", value);
      vm.$emit(oldModelEvent, value);
    }
  });
  return model;
}
/*!
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
const INSIDE_RADIO_GROUP_KEY = Symbol.for("insideRadioGroup");
function useInsideRadioGroup() {
  return inject(INSIDE_RADIO_GROUP_KEY, void 0);
}
const _sfc_main$8 = {
  name: "CheckboxBlankOutlineIcon",
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
var _sfc_render$8 = function render() {
  var _vm = this, _c = _vm._self._c;
  return _c("span", _vm._b({ staticClass: "material-design-icon checkbox-blank-outline-icon", attrs: { "aria-hidden": _vm.title ? null : "true", "aria-label": _vm.title, "role": "img" }, on: { "click": function($event) {
    return _vm.$emit("click", $event);
  } } }, "span", _vm.$attrs, false), [_c("svg", { staticClass: "material-design-icon__svg", attrs: { "fill": _vm.fillColor, "width": _vm.size, "height": _vm.size, "viewBox": "0 0 24 24" } }, [_c("path", { attrs: { "d": "M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3M19,5V19H5V5H19Z" } }, [_vm.title ? _c("title", [_vm._v(_vm._s(_vm.title))]) : _vm._e()])])]);
};
var _sfc_staticRenderFns$8 = [];
var __component__$8 = /* @__PURE__ */ normalizeComponent$1(
  _sfc_main$8,
  _sfc_render$8,
  _sfc_staticRenderFns$8,
  false,
  null,
  null
);
const CheckboxBlankOutline = __component__$8.exports;
const _sfc_main$7 = {
  name: "CheckboxMarkedIcon",
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
var _sfc_render$7 = function render2() {
  var _vm = this, _c = _vm._self._c;
  return _c("span", _vm._b({ staticClass: "material-design-icon checkbox-marked-icon", attrs: { "aria-hidden": _vm.title ? null : "true", "aria-label": _vm.title, "role": "img" }, on: { "click": function($event) {
    return _vm.$emit("click", $event);
  } } }, "span", _vm.$attrs, false), [_c("svg", { staticClass: "material-design-icon__svg", attrs: { "fill": _vm.fillColor, "width": _vm.size, "height": _vm.size, "viewBox": "0 0 24 24" } }, [_c("path", { attrs: { "d": "M10,17L5,12L6.41,10.58L10,14.17L17.59,6.58L19,8M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z" } }, [_vm.title ? _c("title", [_vm._v(_vm._s(_vm.title))]) : _vm._e()])])]);
};
var _sfc_staticRenderFns$7 = [];
var __component__$7 = /* @__PURE__ */ normalizeComponent$1(
  _sfc_main$7,
  _sfc_render$7,
  _sfc_staticRenderFns$7,
  false,
  null,
  null
);
const CheckboxMarked = __component__$7.exports;
const _sfc_main$6 = {
  name: "MinusBoxIcon",
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
var _sfc_render$6 = function render3() {
  var _vm = this, _c = _vm._self._c;
  return _c("span", _vm._b({ staticClass: "material-design-icon minus-box-icon", attrs: { "aria-hidden": _vm.title ? null : "true", "aria-label": _vm.title, "role": "img" }, on: { "click": function($event) {
    return _vm.$emit("click", $event);
  } } }, "span", _vm.$attrs, false), [_c("svg", { staticClass: "material-design-icon__svg", attrs: { "fill": _vm.fillColor, "width": _vm.size, "height": _vm.size, "viewBox": "0 0 24 24" } }, [_c("path", { attrs: { "d": "M17,13H7V11H17M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z" } }, [_vm.title ? _c("title", [_vm._v(_vm._s(_vm.title))]) : _vm._e()])])]);
};
var _sfc_staticRenderFns$6 = [];
var __component__$6 = /* @__PURE__ */ normalizeComponent$1(
  _sfc_main$6,
  _sfc_render$6,
  _sfc_staticRenderFns$6,
  false,
  null,
  null
);
const MinusBox = __component__$6.exports;
const _sfc_main$5 = {
  name: "RadioboxBlankIcon",
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
var _sfc_render$5 = function render4() {
  var _vm = this, _c = _vm._self._c;
  return _c("span", _vm._b({ staticClass: "material-design-icon radiobox-blank-icon", attrs: { "aria-hidden": _vm.title ? null : "true", "aria-label": _vm.title, "role": "img" }, on: { "click": function($event) {
    return _vm.$emit("click", $event);
  } } }, "span", _vm.$attrs, false), [_c("svg", { staticClass: "material-design-icon__svg", attrs: { "fill": _vm.fillColor, "width": _vm.size, "height": _vm.size, "viewBox": "0 0 24 24" } }, [_c("path", { attrs: { "d": "M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" } }, [_vm.title ? _c("title", [_vm._v(_vm._s(_vm.title))]) : _vm._e()])])]);
};
var _sfc_staticRenderFns$5 = [];
var __component__$5 = /* @__PURE__ */ normalizeComponent$1(
  _sfc_main$5,
  _sfc_render$5,
  _sfc_staticRenderFns$5,
  false,
  null,
  null
);
const RadioboxBlank = __component__$5.exports;
const _sfc_main$4 = {
  name: "RadioboxMarkedIcon",
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
var _sfc_render$4 = function render5() {
  var _vm = this, _c = _vm._self._c;
  return _c("span", _vm._b({ staticClass: "material-design-icon radiobox-marked-icon", attrs: { "aria-hidden": _vm.title ? null : "true", "aria-label": _vm.title, "role": "img" }, on: { "click": function($event) {
    return _vm.$emit("click", $event);
  } } }, "span", _vm.$attrs, false), [_c("svg", { staticClass: "material-design-icon__svg", attrs: { "fill": _vm.fillColor, "width": _vm.size, "height": _vm.size, "viewBox": "0 0 24 24" } }, [_c("path", { attrs: { "d": "M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,7A5,5 0 0,0 7,12A5,5 0 0,0 12,17A5,5 0 0,0 17,12A5,5 0 0,0 12,7Z" } }, [_vm.title ? _c("title", [_vm._v(_vm._s(_vm.title))]) : _vm._e()])])]);
};
var _sfc_staticRenderFns$4 = [];
var __component__$4 = /* @__PURE__ */ normalizeComponent$1(
  _sfc_main$4,
  _sfc_render$4,
  _sfc_staticRenderFns$4,
  false,
  null,
  null
);
const RadioboxMarked = __component__$4.exports;
const _sfc_main$3 = {
  name: "ToggleSwitchIcon",
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
var _sfc_render$3 = function render6() {
  var _vm = this, _c = _vm._self._c;
  return _c("span", _vm._b({ staticClass: "material-design-icon toggle-switch-icon", attrs: { "aria-hidden": _vm.title ? null : "true", "aria-label": _vm.title, "role": "img" }, on: { "click": function($event) {
    return _vm.$emit("click", $event);
  } } }, "span", _vm.$attrs, false), [_c("svg", { staticClass: "material-design-icon__svg", attrs: { "fill": _vm.fillColor, "width": _vm.size, "height": _vm.size, "viewBox": "0 0 24 24" } }, [_c("path", { attrs: { "d": "M17,7H7A5,5 0 0,0 2,12A5,5 0 0,0 7,17H17A5,5 0 0,0 22,12A5,5 0 0,0 17,7M17,15A3,3 0 0,1 14,12A3,3 0 0,1 17,9A3,3 0 0,1 20,12A3,3 0 0,1 17,15Z" } }, [_vm.title ? _c("title", [_vm._v(_vm._s(_vm.title))]) : _vm._e()])])]);
};
var _sfc_staticRenderFns$3 = [];
var __component__$3 = /* @__PURE__ */ normalizeComponent$1(
  _sfc_main$3,
  _sfc_render$3,
  _sfc_staticRenderFns$3,
  false,
  null,
  null
);
const ToggleSwitch = __component__$3.exports;
const _sfc_main$2 = {
  name: "ToggleSwitchOffIcon",
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
var _sfc_render$2 = function render7() {
  var _vm = this, _c = _vm._self._c;
  return _c("span", _vm._b({ staticClass: "material-design-icon toggle-switch-off-icon", attrs: { "aria-hidden": _vm.title ? null : "true", "aria-label": _vm.title, "role": "img" }, on: { "click": function($event) {
    return _vm.$emit("click", $event);
  } } }, "span", _vm.$attrs, false), [_c("svg", { staticClass: "material-design-icon__svg", attrs: { "fill": _vm.fillColor, "width": _vm.size, "height": _vm.size, "viewBox": "0 0 24 24" } }, [_c("path", { attrs: { "d": "M17,7H7A5,5 0 0,0 2,12A5,5 0 0,0 7,17H17A5,5 0 0,0 22,12A5,5 0 0,0 17,7M7,15A3,3 0 0,1 4,12A3,3 0 0,1 7,9A3,3 0 0,1 10,12A3,3 0 0,1 7,15Z" } }, [_vm.title ? _c("title", [_vm._v(_vm._s(_vm.title))]) : _vm._e()])])]);
};
var _sfc_staticRenderFns$2 = [];
var __component__$2 = /* @__PURE__ */ normalizeComponent$1(
  _sfc_main$2,
  _sfc_render$2,
  _sfc_staticRenderFns$2,
  false,
  null,
  null
);
const ToggleSwitchOff = __component__$2.exports;
const TYPE_CHECKBOX = "checkbox";
const TYPE_RADIO = "radio";
const TYPE_SWITCH = "switch";
const TYPE_BUTTON = "button";
const _sfc_main$1 = {
  name: "NcCheckboxContent",
  components: {
    NcLoadingIcon
  },
  props: {
    /**
     * Class for the icon element
     */
    iconClass: {
      type: [String, Object],
      default: null
    },
    /**
     * Class for the text element
     */
    textClass: {
      type: [String, Object],
      default: null
    },
    /**
     * Type of the input. checkbox, radio, switch, or button.
     *
     * Only use button when used in a `tablist` container and the
     * `tab` role is set.
     *
     * @type {'checkbox'|'radio'|'switch'|'button'}
     */
    type: {
      type: String,
      default: "checkbox",
      validator: (type) => [
        TYPE_CHECKBOX,
        TYPE_RADIO,
        TYPE_SWITCH,
        TYPE_BUTTON
      ].includes(type)
    },
    /**
     * Toggle the alternative button style
     */
    buttonVariant: {
      type: Boolean,
      default: false
    },
    /**
     * True if the entry is checked
     */
    isChecked: {
      type: Boolean,
      default: false
    },
    /**
     * Indeterminate state
     */
    indeterminate: {
      type: Boolean,
      default: false
    },
    /**
     * Loading state
     */
    loading: {
      type: Boolean,
      default: false
    },
    /**
     * Icon size
     */
    iconSize: {
      type: Number,
      default: 24
    },
    /**
     * Label id attribute
     */
    labelId: {
      type: String,
      required: true
    },
    /**
     * Description id attribute
     */
    descriptionId: {
      type: String,
      required: true
    }
  },
  computed: {
    isButtonType() {
      return this.type === TYPE_BUTTON;
    },
    /**
     * Returns the proper Material icon depending on the select case
     *
     * @return {object}
     */
    checkboxRadioIconElement() {
      if (this.type === TYPE_RADIO) {
        if (this.isChecked) {
          return RadioboxMarked;
        }
        return RadioboxBlank;
      }
      if (this.type === TYPE_SWITCH) {
        if (this.isChecked) {
          return ToggleSwitch;
        }
        return ToggleSwitchOff;
      }
      if (this.indeterminate) {
        return MinusBox;
      }
      if (this.isChecked) {
        return CheckboxMarked;
      }
      return CheckboxBlankOutline;
    }
  }
};
var _sfc_render$1 = function render8() {
  var _vm = this, _c = _vm._self._c;
  return _c("span", { staticClass: "checkbox-content", class: {
    ["checkbox-content-" + _vm.type]: true,
    "checkbox-content--button-variant": _vm.buttonVariant,
    "checkbox-content--has-text": !!_vm.$slots.default
  } }, [_c("span", { staticClass: "checkbox-content__icon", class: {
    "checkbox-content__icon--checked": _vm.isChecked,
    [_vm.iconClass]: true
  }, attrs: { "aria-hidden": true, "inert": "" } }, [_vm._t("icon", function() {
    return [_vm.loading ? _c("NcLoadingIcon") : !_vm.buttonVariant ? _c(_vm.checkboxRadioIconElement, { tag: "component", attrs: { "size": _vm.iconSize } }) : _vm._e()];
  }, { "checked": _vm.isChecked, "loading": _vm.loading })], 2), _vm.$slots.default || _vm.$slots.description ? _c("span", { staticClass: "checkbox-content__wrapper" }, [_vm.$slots.default ? _c("span", { staticClass: "checkbox-content__text", class: _vm.textClass, attrs: { "id": _vm.labelId } }, [_vm._t("default")], 2) : _vm._e(), !_vm.isButtonType && _vm.$slots.description ? _c("span", { staticClass: "checkbox-content__description", attrs: { "id": _vm.descriptionId } }, [_vm._t("description")], 2) : _vm._e()]) : _vm._e()]);
};
var _sfc_staticRenderFns$1 = [];
var __component__$1 = /* @__PURE__ */ normalizeComponent$1(
  _sfc_main$1,
  _sfc_render$1,
  _sfc_staticRenderFns$1,
  false,
  null,
  "cfa76919"
);
const NcCheckboxContent = __component__$1.exports;
register();
const __default__ = {
  name: "NcCheckboxRadioSwitch",
  components: {
    NcCheckboxContent
  },
  // We need to pass attributes to the input element
  inheritAttrs: false,
  model: {
    prop: "modelValue",
    event: "update:modelValue"
  },
  props: {
    /**
     * Unique id attribute of the input
     */
    id: {
      type: String,
      default: () => "checkbox-radio-switch-" + GenRandomId(),
      validator: (id) => id.trim() !== ""
    },
    /**
     * Unique id attribute of the wrapper element
     */
    wrapperId: {
      type: String,
      default: null
    },
    /**
     * Input name. Required for radio, optional for checkbox, and ignored
     * for button.
     */
    name: {
      type: String,
      default: null
    },
    /**
     * Required if no text is set.
     * The aria-label is forwarded to the input or button.
     */
    ariaLabel: {
      type: String,
      default: ""
    },
    /**
     * Type of the input. checkbox, radio, switch, or button.
     *
     * Only use button when used in a `tablist` container and the
     * `tab` role is set.
     *
     * @type {'checkbox'|'radio'|'switch'|'button'}
     */
    type: {
      type: String,
      default: "checkbox",
      validator: (type) => [
        TYPE_CHECKBOX,
        TYPE_RADIO,
        TYPE_SWITCH,
        TYPE_BUTTON
      ].includes(type)
    },
    /**
     * Toggle the alternative button style
     *
     * @deprecated - Use `NcRadioGroup` instead
     */
    buttonVariant: {
      type: Boolean,
      default: false
    },
    /**
     * Are the elements are all direct siblings?
     * If so they will be grouped horizontally or vertically
     *
     * @type {'no'|'horizontal'|'vertical'}
     * @deprecated - Use `NcRadioGroup` instead
     */
    buttonVariantGrouped: {
      type: String,
      default: "no",
      validator: (v) => ["no", "vertical", "horizontal"].includes(v)
    },
    /**
     * Removed in v9 - use `modelValue` (`v-model`) instead
     *
     * @deprecated
     */
    checked: {
      type: [Boolean, Array, String],
      default: void 0
    },
    /**
     * Checkbox value
     */
    modelValue: {
      type: [Boolean, Array, String],
      default: false
    },
    /**
     * Value to be synced on check
     */
    value: {
      type: String,
      default: null
    },
    /**
     * Disabled state
     */
    disabled: {
      type: Boolean,
      default: false
    },
    /**
     * Indeterminate state
     */
    indeterminate: {
      type: Boolean,
      default: false
    },
    /**
     * Required state
     */
    required: {
      type: Boolean,
      default: false
    },
    /**
     * Loading state
     */
    loading: {
      type: Boolean,
      default: false
    },
    /**
     * Wrapping element tag
     *
     * When `type` is set to `button` this will be ignored
     *
     * Defaults to `span`
     */
    wrapperElement: {
      type: String,
      default: null
    },
    /**
     * Description
     *
     * This is unsupported when using button has type
     */
    description: {
      type: String,
      default: null
    }
  },
  emits: [
    /**
     * Removed in v9 - use `update:modelValue` (`v-model`) instead
     *
     * @deprecated
     */
    "update:checked",
    "update:modelValue",
    /** Same as update:modelValue for Vue 2 compatibility */
    "update:model-value"
  ],
  setup(props) {
    const radioGroup = useInsideRadioGroup();
    const internalType = computed(() => radioGroup?.value ? TYPE_RADIO : props.type);
    onMounted(() => radioGroup?.value.register(false));
    const model = useModelMigration("checked", "update:checked");
    const internalModelValue = computed({
      get() {
        if (radioGroup?.value) {
          return radioGroup.value.modelValue;
        }
        return model.value;
      },
      set(value) {
        if (radioGroup?.value) {
          radioGroup.value.onUpdate(value);
        } else {
          model.value = value;
        }
      }
    });
    return {
      internalType,
      internalModelValue,
      labelId: GenRandomId(),
      descriptionId: GenRandomId()
    };
  },
  computed: {
    dataAttrs() {
      return Object.fromEntries(Object.entries(this.$attrs).filter(([key]) => key.startsWith("data-")));
    },
    nonDataAttrs() {
      return Object.fromEntries(Object.entries(this.$attrs).filter(([key]) => !key.startsWith("data-")));
    },
    isButtonType() {
      return this.internalType === TYPE_BUTTON;
    },
    computedWrapperElement() {
      if (this.isButtonType) {
        return "button";
      }
      if (this.wrapperElement !== null) {
        return this.wrapperElement;
      }
      return "span";
    },
    listeners() {
      if (this.isButtonType) {
        return {
          click: this.onToggle
        };
      }
      return {
        change: this.onToggle
      };
    },
    iconSize() {
      return this.internalType === TYPE_SWITCH ? 36 : 24;
    },
    cssIconSize() {
      return this.iconSize + "px";
    },
    cssIconHeight() {
      return this.internalType === TYPE_SWITCH ? "16px" : this.cssIconSize;
    },
    /**
     * Return the input type.
     * Switch is not an official type
     *
     * @return {string}
     */
    inputType() {
      const nativeTypes = [
        TYPE_CHECKBOX,
        TYPE_RADIO,
        TYPE_BUTTON
      ];
      if (nativeTypes.includes(this.internalType)) {
        return this.internalType;
      }
      return TYPE_CHECKBOX;
    },
    /**
     * Check if that entry is checked
     * If value is defined, we use that as the checked value
     * If not, we expect true/false in checked state
     *
     * @return {boolean}
     */
    isChecked() {
      if (this.value !== null) {
        if (Array.isArray(this.internalModelValue)) {
          return [...this.internalModelValue].indexOf(this.value) > -1;
        }
        return this.internalModelValue === this.value;
      }
      return this.internalModelValue === true;
    },
    hasIndeterminate() {
      return [
        TYPE_CHECKBOX,
        TYPE_RADIO
      ].includes(this.inputType);
    }
  },
  mounted() {
    if (this.name && this.internalType === TYPE_CHECKBOX) {
      if (!Array.isArray(this.internalModelValue)) {
        throw new Error("When using groups of checkboxes, the updated value will be an array.");
      }
    }
    if (this.name && this.internalType === TYPE_SWITCH) {
      throw new Error("Switches are not made to be used for data sets. Please use checkboxes instead.");
    }
    if (typeof this.internalModelValue !== "boolean" && this.internalType === TYPE_SWITCH) {
      throw new Error("Switches can only be used with boolean as modelValue prop.");
    }
  },
  methods: {
    t,
    n,
    onToggle(event) {
      if (this.disabled || event.target.tagName.toLowerCase() === "a") {
        return;
      }
      if (this.internalType === TYPE_RADIO) {
        this.internalModelValue = this.value;
        return;
      }
      if (this.internalType === TYPE_SWITCH) {
        this.internalModelValue = !this.isChecked;
        return;
      }
      if (typeof this.internalModelValue === "boolean") {
        this.internalModelValue = !this.internalModelValue;
        return;
      }
      const values = this.getInputsSet().filter((input) => input.checked).map((input) => input.value);
      if (values.includes(this.value)) {
        this.internalModelValue = values.filter((v) => v !== this.value);
      } else {
        this.internalModelValue = [...values, this.value];
      }
    },
    /**
     * Get the input set based on this name
     *
     * @return {Node[]}
     */
    getInputsSet() {
      return [...document.getElementsByName(this.name)];
    }
  }
};
const __injectCSSVars__ = () => {
  useCssVars((_vm, _setup) => ({
    "1f97b3de": _vm.cssIconSize,
    "be84d992": _vm.cssIconHeight
  }));
};
const __setup__ = __default__.setup;
__default__.setup = __setup__ ? (props, ctx) => {
  __injectCSSVars__();
  return __setup__(props, ctx);
} : __injectCSSVars__;
const _sfc_main = __default__;
var _sfc_render = function render9() {
  var _vm = this, _c = _vm._self._c;
  return _c(_vm.computedWrapperElement, _vm._g(_vm._b({ tag: "component", staticClass: "checkbox-radio-switch", class: {
    ["checkbox-radio-switch-" + _vm.internalType]: _vm.internalType,
    "checkbox-radio-switch--checked": _vm.isChecked,
    "checkbox-radio-switch--disabled": _vm.disabled,
    "checkbox-radio-switch--indeterminate": _vm.hasIndeterminate ? _vm.indeterminate : false,
    "checkbox-radio-switch--button-variant": _vm.buttonVariant,
    "checkbox-radio-switch--button-variant-v-grouped": _vm.buttonVariant && _vm.buttonVariantGrouped === "vertical",
    "checkbox-radio-switch--button-variant-h-grouped": _vm.buttonVariant && _vm.buttonVariantGrouped === "horizontal",
    "button-vue": _vm.isButtonType
  }, attrs: { "id": _vm.wrapperId, "aria-label": _vm.isButtonType && _vm.ariaLabel ? _vm.ariaLabel : void 0, "type": _vm.isButtonType ? "button" : null } }, "component", _vm.isButtonType ? _vm.$attrs : _vm.dataAttrs, false), _vm.isButtonType ? _vm.listeners : null), [!_vm.isButtonType ? _c("input", _vm._g(_vm._b({ staticClass: "checkbox-radio-switch__input", attrs: { "id": _vm.id, "aria-labelledby": !_vm.isButtonType && !_vm.ariaLabel ? _vm.labelId : null, "aria-describedby": !_vm.isButtonType && (_vm.description || _vm.$slots.description) ? _vm.descriptionId : _vm.nonDataAttrs["aria-describedby"], "aria-label": _vm.ariaLabel || void 0, "disabled": _vm.disabled, "type": _vm.inputType, "required": _vm.required, "name": _vm.name }, domProps: { "value": _vm.value, "checked": _vm.isChecked, "indeterminate": _vm.hasIndeterminate ? _vm.indeterminate : null } }, "input", _vm.nonDataAttrs, false), _vm.listeners)) : _vm._e(), _c("NcCheckboxContent", { staticClass: "checkbox-radio-switch__content", attrs: { "id": !_vm.isButtonType ? `${_vm.id}-label` : void 0, "icon-class": "checkbox-radio-switch__icon", "text-class": "checkbox-radio-switch__text", "type": _vm.internalType, "indeterminate": _vm.hasIndeterminate ? _vm.indeterminate : false, "button-variant": _vm.buttonVariant, "is-checked": _vm.isChecked, "loading": _vm.loading, "label-id": _vm.labelId, "description-id": _vm.descriptionId, "icon-size": _vm.iconSize }, nativeOn: { "click": function($event) {
    return _vm.onToggle.apply(null, arguments);
  } }, scopedSlots: _vm._u([{ key: "icon", fn: function() {
    return [_vm._t("icon")];
  }, proxy: true }, _vm.$slots.description || _vm.description ? { key: "description", fn: function() {
    return [_vm._t("description", function() {
      return [_vm._v(" " + _vm._s(_vm.description) + " ")];
    })];
  }, proxy: true } : null], null, true) }, [_vm._t("default")], 2)], 1);
};
var _sfc_staticRenderFns = [];
var __component__ = /* @__PURE__ */ normalizeComponent$1(
  _sfc_main,
  _sfc_render,
  _sfc_staticRenderFns,
  false,
  null,
  "24ed12a5"
);
const NcCheckboxRadioSwitch = __component__.exports;
export {
  NcCheckboxRadioSwitch as N,
  normalizeComponent as n,
  useModelMigration as u
};
//# sourceMappingURL=NcCheckboxRadioSwitch-DAPHFb0L-mGx4ajL2.chunk.mjs.map
