const appName = "text";
const appVersion = "7.0.0-dev.2";
var dockerfile_1;
var hasRequiredDockerfile;
function requireDockerfile() {
  if (hasRequiredDockerfile) return dockerfile_1;
  hasRequiredDockerfile = 1;
  function dockerfile(hljs) {
    const KEYWORDS = [
      "from",
      "maintainer",
      "expose",
      "env",
      "arg",
      "user",
      "onbuild",
      "stopsignal"
    ];
    return {
      name: "Dockerfile",
      aliases: ["docker"],
      case_insensitive: true,
      keywords: KEYWORDS,
      contains: [
        hljs.HASH_COMMENT_MODE,
        hljs.APOS_STRING_MODE,
        hljs.QUOTE_STRING_MODE,
        hljs.NUMBER_MODE,
        {
          beginKeywords: "run cmd entrypoint volume add copy workdir label healthcheck shell",
          starts: {
            end: /[^\\]$/,
            subLanguage: "bash"
          }
        }
      ],
      illegal: "</"
    };
  }
  dockerfile_1 = dockerfile;
  return dockerfile_1;
}
export {
  requireDockerfile as r
};
//# sourceMappingURL=dockerfile-nbOyeLaq.chunk.mjs.map
