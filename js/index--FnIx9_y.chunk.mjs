const appName = "text";
const appVersion = "7.0.0-dev.2";
const linkToRemoteBase = (service) => "/remote.php/" + service;
const generateRemoteUrl = (service, options) => {
  const baseURL = getBaseUrl();
  return baseURL + linkToRemoteBase(service);
};
const generateOcsUrl = (url, params, options) => {
  const allOptions = Object.assign({
    ocsVersion: 2
  }, {});
  const version = allOptions.ocsVersion === 1 ? 1 : 2;
  const baseURL = getBaseUrl();
  return baseURL + "/ocs/v" + version + ".php" + _generateUrlPath(url, params);
};
const _generateUrlPath = (url, params, options) => {
  const allOptions = Object.assign({
    escape: true
  }, {});
  const _build = function(text, vars) {
    vars = vars || {};
    return text.replace(
      /{([^{}]*)}/g,
      function(a, b) {
        const r = vars[b];
        if (allOptions.escape) {
          return typeof r === "string" || typeof r === "number" ? encodeURIComponent(r.toString()) : encodeURIComponent(a);
        } else {
          return typeof r === "string" || typeof r === "number" ? r.toString() : a;
        }
      }
    );
  };
  if (url.charAt(0) !== "/") {
    url = "/" + url;
  }
  return _build(url, params || {});
};
const generateUrl = (url, params, options) => {
  const allOptions = Object.assign({
    noRewrite: false
  }, {});
  const baseOrRootURL = getRootUrl();
  if (window?.OC?.config?.modRewriteWorking === true && !allOptions.noRewrite) {
    return baseOrRootURL + _generateUrlPath(url, params);
  }
  return baseOrRootURL + "/index.php" + _generateUrlPath(url, params);
};
const imagePath = (app, file) => {
  if (!file.includes(".")) {
    return generateFilePath(app, "img", `${file}.svg`);
  }
  return generateFilePath(app, "img", file);
};
const generateFilePath = (app, type, file) => {
  const isCore = window?.OC?.coreApps?.includes(app) ?? false;
  const isPHP = file.slice(-3) === "php";
  let link = getRootUrl();
  if (isPHP && !isCore) {
    link += `/index.php/apps/${app}`;
    {
      link += `/${encodeURI(type)}`;
    }
    if (file !== "index.php") {
      link += `/${file}`;
    }
  } else if (!isPHP && !isCore) {
    link = getAppRootUrl(app);
    {
      link += `/${type}/`;
    }
    if (link.at(-1) !== "/") {
      link += "/";
    }
    link += file;
  } else {
    {
      link += `/${app}`;
    }
    {
      link += `/${type}`;
    }
    link += `/${file}`;
  }
  return link;
};
const getBaseUrl = () => window.location.protocol + "//" + window.location.host + getRootUrl();
function getRootUrl() {
  let webroot = window._oc_webroot;
  if (typeof webroot === "undefined") {
    webroot = location.pathname;
    const pos = webroot.indexOf("/index.php/");
    if (pos !== -1) {
      webroot = webroot.slice(0, pos);
    } else {
      const index = webroot.indexOf("/", 1);
      webroot = webroot.slice(0, index > 0 ? index : void 0);
    }
  }
  return webroot;
}
function getAppRootUrl(app) {
  const webroots = window._oc_appswebroots ?? {};
  return webroots[app] ?? "";
}
export {
  generateOcsUrl as a,
  generateRemoteUrl as b,
  getBaseUrl as c,
  getRootUrl as d,
  generateUrl as g,
  imagePath as i
};
//# sourceMappingURL=index--FnIx9_y.chunk.mjs.map
