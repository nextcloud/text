const appName = "text";
const appVersion = "7.0.0-dev.2";
import { l as loadState } from "./index-D5dRV40B.chunk.mjs";
import { g as generateUrl } from "./index--FnIx9_y.chunk.mjs";
import { l as logger } from "./logger-DdFapB9C.chunk.mjs";
const domHref = function(node, relativePath) {
  const ref = node.attrs.href;
  if (!ref) {
    return ref;
  }
  if (!window.OCA?.Viewer) {
    return ref;
  }
  if (ref.match(/^[a-zA-Z]*:/)) {
    return ref;
  }
  if (ref.startsWith("#")) {
    return ref;
  }
  if (loadState("core", "active-app", "") === "collectives") {
    return ref;
  }
  if (ref.includes("/apps/collectives/")) {
    return ref;
  }
  const match = ref.match(/^([^?]*)\?fileId=(\d+)/);
  if (match) {
    const [, , id] = match;
    return new URL(generateUrl(`/f/${id}`), window.origin).href;
  }
  return ref;
};
const parseHref = function(dom) {
  const ref = dom.getAttribute("href");
  if (!ref) {
    return ref;
  }
  const match = ref.match(/\?dir=([^&]*)&openfile=([^&]*)#relPath=([^&]*)/);
  if (match) {
    const [, , id] = match;
    return new URL(generateUrl(`/f/${id}`), window.origin).href;
  }
  return ref;
};
const isLinkToSelfWithHash = function(href) {
  const locationNoHash = window.location.origin + window.location.pathname + window.location.search;
  return href?.startsWith("#") || href?.startsWith(locationNoHash + "#");
};
const openLink = function(href) {
  const linkUrl = new URL(href, window.location.href);
  const collectivesUrlBase = "/apps/collectives";
  if (window.OCA.Collectives?.vueRouter && linkUrl.pathname.toString().startsWith(generateUrl(collectivesUrlBase))) {
    const collectivesUrl = linkUrl.href.substring(
      linkUrl.href.indexOf(collectivesUrlBase) + collectivesUrlBase.length
    );
    window.OCA.Collectives.vueRouter.push(collectivesUrl);
    return;
  }
  window.open(linkUrl, "_blank");
};
const FILE = Symbol("editor:file");
const ATTACHMENT_RESOLVER = Symbol("attachment:resolver");
const IS_MOBILE = Symbol("editor:is-mobile");
const EDITOR_UPLOAD = Symbol("editor:upload");
const HOOK_MENTION_SEARCH = Symbol("hook:mention-search");
const HOOK_MENTION_INSERT = Symbol("hook:mention-insert");
const OPEN_LINK_HANDLER = Symbol("editor:open-link-handler");
const useIsMobileMixin = {
  inject: {
    $isMobile: { from: IS_MOBILE, default: false }
  }
};
const useFileMixin = {
  inject: {
    $file: {
      from: FILE,
      default: () => ({
        fileId: 0,
        relativePath: null,
        document: null
      })
    }
  }
};
const useAttachmentResolver = {
  inject: {
    $attachmentResolver: {
      from: ATTACHMENT_RESOLVER,
      default: {
        resolve(src) {
          logger.warn(
            "No attachment resolver provided. Some attachment sources cannot be resolved."
          );
          return [src];
        }
      }
    }
  }
};
const useEditorUpload = {
  inject: {
    $editorUpload: {
      from: EDITOR_UPLOAD,
      default: true
    }
  }
};
const useOpenLinkHandler = {
  inject: {
    $openLinkHandler: {
      from: OPEN_LINK_HANDLER,
      default: {
        openLink
      }
    }
  }
};
const STATE_UPLOADING = Symbol("state:uploading-state");
const ACTION_ATTACHMENT_PROMPT = Symbol("editor:action:attachment-prompt");
const ACTION_CHOOSE_LOCAL_ATTACHMENT = Symbol(
  "editor:action:upload-attachment"
);
const ACTION_CREATE_ATTACHMENT = Symbol("editor:action:create-attachment");
const useUploadingStateMixin = {
  inject: {
    $uploadingState: {
      from: STATE_UPLOADING,
      default: {
        isUploadingAttachments: false
      }
    }
  }
};
const useActionAttachmentPromptMixin = {
  inject: {
    $callAttachmentPrompt: { from: ACTION_ATTACHMENT_PROMPT, default: () => {
    } }
  }
};
const useActionChooseLocalAttachmentMixin = {
  inject: {
    $callChooseLocalAttachment: {
      from: ACTION_CHOOSE_LOCAL_ATTACHMENT,
      default: () => {
      }
    }
  }
};
const useActionCreateAttachmentMixin = {
  inject: {
    $callCreateAttachment: {
      from: ACTION_CREATE_ATTACHMENT,
      default: () => (template) => {
      }
    }
  }
};
export {
  ATTACHMENT_RESOLVER as A,
  EDITOR_UPLOAD as E,
  FILE as F,
  HOOK_MENTION_INSERT as H,
  IS_MOBILE as I,
  OPEN_LINK_HANDLER as O,
  STATE_UPLOADING as S,
  HOOK_MENTION_SEARCH as a,
  ACTION_ATTACHMENT_PROMPT as b,
  useFileMixin as c,
  ACTION_CREATE_ATTACHMENT as d,
  ACTION_CHOOSE_LOCAL_ATTACHMENT as e,
  useEditorUpload as f,
  useActionChooseLocalAttachmentMixin as g,
  useActionAttachmentPromptMixin as h,
  useUploadingStateMixin as i,
  useActionCreateAttachmentMixin as j,
  useOpenLinkHandler as k,
  domHref as l,
  isLinkToSelfWithHash as m,
  useAttachmentResolver as n,
  openLink as o,
  parseHref as p,
  useIsMobileMixin as u
};
//# sourceMappingURL=MediaHandler.provider-DkXa_6IX.chunk.mjs.map
