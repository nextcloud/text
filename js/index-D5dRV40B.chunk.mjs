const appName = "text";
const appVersion = "7.0.0-dev.2";
function loadState(app, key, fallback) {
  const selector = `#initial-state-${app}-${key}`;
  if (window._nc_initial_state?.has(selector)) {
    return window._nc_initial_state.get(selector);
  } else if (!window._nc_initial_state) {
    window._nc_initial_state = /* @__PURE__ */ new Map();
  }
  const elem = document.querySelector(selector);
  if (elem === null) {
    if (fallback !== void 0) {
      return fallback;
    }
    throw new Error(`Could not find initial state ${key} of ${app}`);
  }
  try {
    const parsedValue = JSON.parse(atob(elem.value));
    window._nc_initial_state.set(selector, parsedValue);
    return parsedValue;
  } catch (error) {
    console.error("[@nextcloud/initial-state] Could not parse initial state", { key, app, error });
    if (fallback !== void 0) {
      return fallback;
    }
    throw new Error(`Could not parse initial state ${key} of ${app}`, { cause: error });
  }
}
const dist = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loadState
}, Symbol.toStringTag, { value: "Module" }));
export {
  dist as d,
  loadState as l
};
//# sourceMappingURL=index-D5dRV40B.chunk.mjs.map
