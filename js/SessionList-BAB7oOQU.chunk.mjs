const appName = "text";
const appVersion = "7.0.0-dev.2";
import { t as translate } from "./NcLoadingIcon-D2qSC7Ri.chunk.mjs";
import { N as NcButton, s as showError, b as showWarning, c as NcPopover } from "./NcNoteCard-Dz5-u2BY-B3JST-Lk.chunk.mjs";
import { n as normalizeComponent } from "./NcCheckboxRadioSwitch-DAPHFb0L-mGx4ajL2.chunk.mjs";
import { j as useConnection, k as isGuest, C as COLLABORATOR_DISCONNECT_TIME, N as NcAvatar, l as useEditor, h as PencilOutlineIcon, m as CheckIcon, n as NcInputField, d as useEditorMethods, o as update, q as COLLABORATOR_IDLE_TIME, r as useEditorFlags } from "./EditorOutline-lqEd_HRF.chunk.mjs";
import { r as ref$1, s as shallowRef, w as watch, c as computed, o as onMounted, b as onUnmounted, e as readonly } from "./vue.runtime.esm-DtAgfqM0.chunk.mjs";
import { u as useSyncService } from "./Editor-LhrCfzzb.chunk.mjs";
import "./emoji-picker-Bacg5hGL.chunk.mjs";
import "./index-Djlbe-Du.chunk.mjs";
import "./index--FnIx9_y.chunk.mjs";
import "./index-2mjY3Y47.chunk.mjs";
import "./logger-DdFapB9C.chunk.mjs";
import "./index-D5dRV40B.chunk.mjs";
import "./preload-helper-wZpS7d4i.chunk.mjs";
import "./MediaHandler.provider-DkXa_6IX.chunk.mjs";
import "./index-BWUOE9Nk.chunk.mjs";
import "./dav-CQDyL7M_-LXi2qAGJ.chunk.mjs";
import "./MenuBar-CduxWYdD.chunk.mjs";
const _sfc_main$4 = {
  name: "AccountMultipleOutlineIcon",
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
var _sfc_render$4 = function render() {
  var _vm = this, _c = _vm._self._c;
  return _c("span", _vm._b({ staticClass: "material-design-icon account-multiple-outline-icon", attrs: { "aria-hidden": _vm.title ? null : "true", "aria-label": _vm.title, "role": "img" }, on: { "click": function($event) {
    return _vm.$emit("click", $event);
  } } }, "span", _vm.$attrs, false), [_c("svg", { staticClass: "material-design-icon__svg", attrs: { "fill": _vm.fillColor, "width": _vm.size, "height": _vm.size, "viewBox": "0 0 24 24" } }, [_c("path", { attrs: { "d": "M13.07 10.41A5 5 0 0 0 13.07 4.59A3.39 3.39 0 0 1 15 4A3.5 3.5 0 0 1 15 11A3.39 3.39 0 0 1 13.07 10.41M5.5 7.5A3.5 3.5 0 1 1 9 11A3.5 3.5 0 0 1 5.5 7.5M7.5 7.5A1.5 1.5 0 1 0 9 6A1.5 1.5 0 0 0 7.5 7.5M16 17V19H2V17S2 13 9 13 16 17 16 17M14 17C13.86 16.22 12.67 15 9 15S4.07 16.31 4 17M15.95 13A5.32 5.32 0 0 1 18 17V19H22V17S22 13.37 15.94 13Z" } }, [_vm.title ? _c("title", [_vm._v(_vm._s(_vm.title))]) : _vm._e()])])]);
};
var _sfc_staticRenderFns$4 = [];
_sfc_render$4._withStripped = true;
var __component__$4 = /* @__PURE__ */ normalizeComponent(
  _sfc_main$4,
  _sfc_render$4,
  _sfc_staticRenderFns$4,
  false,
  null,
  null
);
__component__$4.options.__file = "/Users/jamesmanuel/Sites/nextcloud-dev/text/node_modules/vue-material-design-icons/AccountMultipleOutline.vue";
const AccountMultipleOutlineIcon = __component__$4.exports;
function useSessions(syncService) {
  const { openData } = useConnection();
  const currentSession = ref$1(openData.value?.session);
  const sessions = shallowRef([]);
  watch(openData, (val) => {
    if (val?.session) {
      currentSession.value = val.session;
    }
  });
  const currentGuestSession = computed({
    get() {
      if (currentSession.value && isGuest(currentSession.value)) {
        return currentSession.value;
      }
    },
    set(newValue) {
      currentSession.value = newValue;
    }
  });
  const updateSessions = ({ sessions: updated }) => {
    const cutoff = Date.now() / 1e3 - COLLABORATOR_DISCONNECT_TIME;
    sessions.value = updated.filter((session) => session.lastContact > cutoff).sort((a, b) => b.lastContact - a.lastContact).filter(uniqueUserId);
    const currentUpdatedSession = sessions.value.find(
      (session) => session.id === currentSession.value?.id
    );
    if (currentUpdatedSession) {
      currentSession.value = currentUpdatedSession;
    }
  };
  onMounted(() => {
    syncService.bus.on("change", updateSessions);
  });
  onUnmounted(() => {
    syncService.bus.off("change", updateSessions);
  });
  return {
    currentGuestSession,
    currentSession: readonly(currentSession),
    sessions: readonly(sessions)
  };
}
function uniqueUserId(val, idx, arr) {
  if (!("userId" in val)) {
    return true;
  }
  return !arr.slice(0, idx).some((session) => "userId" in session && session.userId === val.userId);
}
const _sfc_main$3 = {
  name: "AccountOutlineIcon",
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
var _sfc_render$3 = function render2() {
  var _vm = this, _c = _vm._self._c;
  return _c("span", _vm._b({ staticClass: "material-design-icon account-outline-icon", attrs: { "aria-hidden": _vm.title ? null : "true", "aria-label": _vm.title, "role": "img" }, on: { "click": function($event) {
    return _vm.$emit("click", $event);
  } } }, "span", _vm.$attrs, false), [_c("svg", { staticClass: "material-design-icon__svg", attrs: { "fill": _vm.fillColor, "width": _vm.size, "height": _vm.size, "viewBox": "0 0 24 24" } }, [_c("path", { attrs: { "d": "M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,6A2,2 0 0,0 10,8A2,2 0 0,0 12,10A2,2 0 0,0 14,8A2,2 0 0,0 12,6M12,13C14.67,13 20,14.33 20,17V20H4V17C4,14.33 9.33,13 12,13M12,14.9C9.03,14.9 5.9,16.36 5.9,17V18.1H18.1V17C18.1,16.36 14.97,14.9 12,14.9Z" } }, [_vm.title ? _c("title", [_vm._v(_vm._s(_vm.title))]) : _vm._e()])])]);
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
__component__$3.options.__file = "/Users/jamesmanuel/Sites/nextcloud-dev/text/node_modules/vue-material-design-icons/AccountOutline.vue";
const AccountOutlineIcon = __component__$3.exports;
const _sfc_main$2 = {
  name: "AvatarWrapper",
  components: {
    NcAvatar,
    AccountOutlineIcon
  },
  props: {
    session: {
      type: Object,
      required: true
    }
  },
  computed: {
    sessionAvatarStyle() {
      return {
        ...this.sessionBackgroundStyle,
        "border-color": this.session.color
      };
    },
    sessionBackgroundStyle() {
      return {
        "background-color": this.session.userId ? this.session.color + " !important" : "var(--color-background-dark)"
      };
    },
    guestInitial() {
      return this.session.guestName === "" ? "?" : this.session.guestName.slice(0, 1).toUpperCase();
    }
  }
};
var _sfc_render$2 = function render3() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "avatar-wrapper", style: _vm.sessionAvatarStyle }, [_vm.session.userId ? _c("NcAvatar", { attrs: { "user": _vm.session.userId, "is-guest": false, "disable-menu": true, "hide-status": "", "disable-tooltip": true } }) : _c("div", { staticClass: "avatar", style: _vm.sessionBackgroundStyle }, [_vm.session.guestName ? [_vm._v(" " + _vm._s(_vm.guestInitial) + " ")] : _c("AccountOutlineIcon")], 2)], 1);
};
var _sfc_staticRenderFns$2 = [];
_sfc_render$2._withStripped = true;
var __component__$2 = /* @__PURE__ */ normalizeComponent(
  _sfc_main$2,
  _sfc_render$2,
  _sfc_staticRenderFns$2,
  false,
  null,
  "46b5e95c"
);
__component__$2.options.__file = "/Users/jamesmanuel/Sites/nextcloud-dev/text/src/components/Editor/AvatarWrapper.vue";
const AvatarWrapper = __component__$2.exports;
const _sfc_main$1 = {
  __name: "GuestNameDialog",
  props: {
    session: {
      type: Object,
      required: true
    }
  },
  emits: ["update:session"],
  setup(__props, { emit }) {
    const props = __props;
    const { connection } = useConnection();
    const { editor } = useEditor();
    const { updateUser } = useEditorMethods(editor);
    const editing = ref$1(false);
    const loading = ref$1(false);
    const guestName = ref$1(props.session.guestName);
    watch(
      () => props.session.guestName,
      (newName) => {
        if (!editing.value) {
          guestName.value = newName;
        }
      }
    );
    const setGuestName = async () => {
      if (!connection.value) {
        showError(translate("text", "Not connected. Cannot update guest name."));
        return;
      }
      const previousGuestName = props.session.guestName;
      loading.value = true;
      try {
        const session = await update(guestName.value, connection.value);
        loading.value = false;
        editing.value = false;
        try {
          localStorage.setItem("nick", session.guestName);
        } catch (e) {
          console.warn("Could not store guest name in local storage.", e);
        }
        emit("update:session", session);
        updateUser(session);
      } catch (error) {
        loading.value = false;
        console.warn("Failed to update the session", { error });
        showWarning(translate("text", "Failed to update the guest name."));
        guestName.value = previousGuestName;
      }
    };
    return { __sfc: true, props, emit, connection, editor, updateUser, editing, loading, guestName, setGuestName, t: translate, NcButton, NcInputField, CheckIcon, PencilOutlineIcon, AvatarWrapper };
  }
};
var _sfc_render$1 = function render4() {
  var _vm = this, _c = _vm._self._c, _setup = _vm._self._setupProxy;
  return _c("li", [_setup.editing ? _c("form", { staticClass: "guest-name-dialog", attrs: { "title": _setup.t("text", "Enter your name so other people can see who is editing") }, on: { "submit": function($event) {
    $event.preventDefault();
    return _setup.setGuestName.apply(null, arguments);
  } } }, [_c(_setup.NcInputField, { attrs: { "maxlength": "60", "disabled": _setup.loading, "label": _setup.t("text", "Enter your name"), "placeholder": _setup.t("text", "Guest") }, model: { value: _setup.guestName, callback: function($$v) {
    _setup.guestName = $$v;
  }, expression: "guestName" } }), _c(_setup.NcButton, { attrs: { "variant": "primary", "aria-label": _setup.t("text", "submit") }, on: { "click": _setup.setGuestName }, scopedSlots: _vm._u([{ key: "icon", fn: function() {
    return [_c(_setup.CheckIcon, { attrs: { "size": 20 } })];
  }, proxy: true }], null, false, 1971559621) })], 1) : [_c(_setup.AvatarWrapper, { attrs: { "session": _vm.session } }), _c("span", { staticClass: "session-label guest" }, [_vm._v(" " + _vm._s(_setup.guestName || _setup.t("text", "you")) + " ")]), _c(_setup.NcButton, { attrs: { "aria-label": _setup.t("text", "edit") }, on: { "click": function($event) {
    _setup.editing = true;
  } }, scopedSlots: _vm._u([{ key: "icon", fn: function() {
    return [_c(_setup.PencilOutlineIcon, { attrs: { "size": 20 } })];
  }, proxy: true }]) })]], 2);
};
var _sfc_staticRenderFns$1 = [];
_sfc_render$1._withStripped = true;
var __component__$1 = /* @__PURE__ */ normalizeComponent(
  _sfc_main$1,
  _sfc_render$1,
  _sfc_staticRenderFns$1,
  false,
  null,
  "d22a5b2e"
);
__component__$1.options.__file = "/Users/jamesmanuel/Sites/nextcloud-dev/text/src/components/Editor/GuestNameDialog.vue";
const GuestNameDialog = __component__$1.exports;
const _sfc_main = {
  name: "SessionList",
  components: {
    AccountMultipleOutlineIcon,
    AvatarWrapper,
    GuestNameDialog,
    NcButton,
    NcPopover
  },
  setup() {
    const { isPublic } = useEditorFlags();
    const { syncService } = useSyncService();
    const { currentGuestSession, currentSession, sessions } = useSessions(syncService);
    return { currentGuestSession, currentSession, sessions, isPublic };
  },
  computed: {
    label() {
      return translate("text", "Active people");
    },
    sessionList() {
      return this.showGuestNameDialog ? this.remoteSessions : this.sessions;
    },
    remoteSessions() {
      return this.sessions.filter(
        (session) => session.id !== this.currentSession?.id
      );
    },
    showGuestNameDialog() {
      return this.isPublic && this.currentGuestSession;
    },
    avatarStyle() {
      return (session) => {
        return {
          opacity: session.lastContact > Date.now() / 1e3 - COLLABORATOR_IDLE_TIME ? 1 : 0.5
        };
      };
    },
    sessionsForTriggerButton() {
      return this.remoteSessions.slice(0, 3);
    }
  },
  methods: {
    t: translate,
    displayNameOrGuestName: (session) => {
      if (session.userId) {
        return session.displayName;
      }
      const guestName = session.guestName || translate("text", "Guest");
      return `${guestName} (${translate("text", "guest")})`;
    }
  }
};
var _sfc_render = function render5() {
  var _vm = this, _c = _vm._self._c;
  return _c("NcPopover", { staticClass: "session-list", attrs: { "no-focus-trap": !_vm.showGuestNameDialog, "placement": "bottom" }, scopedSlots: _vm._u([{ key: "trigger", fn: function({ attrs }) {
    return [_c("div", [_c("NcButton", _vm._b({ staticClass: "avatar-list", attrs: { "title": _vm.label, "aria-label": _vm.label, "variant": "tertiary" }, scopedSlots: _vm._u([{ key: "icon", fn: function() {
      return [_c("AccountMultipleOutlineIcon", { attrs: { "size": 20 } }), _vm._l(_vm.sessionsForTriggerButton, function(session) {
        return _c("AvatarWrapper", { key: session.id, attrs: { "session": session } });
      })];
    }, proxy: true }], null, true) }, "NcButton", attrs, false))], 1)];
  } }, { key: "default", fn: function() {
    return [_c("div", { staticClass: "session-menu" }, [_vm._t("lastSaved"), _c("ul", [_vm.showGuestNameDialog ? _c("GuestNameDialog", { attrs: { "session": _vm.currentGuestSession }, on: { "update:session": function($event) {
      _vm.currentGuestSession = $event;
    } } }) : _vm._e(), _vm._l(_vm.sessionList, function(session) {
      return _c("li", { key: session.id, style: _vm.avatarStyle(session) }, [_c("AvatarWrapper", { attrs: { "session": session } }), _c("span", { staticClass: "session-label", class: !session.userId && "guest" }, [_vm._v(" " + _vm._s(_vm.displayNameOrGuestName(session)) + " ")])], 1);
    })], 2)], 2)];
  }, proxy: true }], null, true) });
};
var _sfc_staticRenderFns = [];
_sfc_render._withStripped = true;
var __component__ = /* @__PURE__ */ normalizeComponent(
  _sfc_main,
  _sfc_render,
  _sfc_staticRenderFns,
  false,
  null,
  "9e0a2a34"
);
__component__.options.__file = "/Users/jamesmanuel/Sites/nextcloud-dev/text/src/components/Editor/SessionList.vue";
const SessionList = __component__.exports;
export {
  SessionList as default
};
//# sourceMappingURL=SessionList-BAB7oOQU.chunk.mjs.map
