const appName = "text";
const appVersion = "7.0.0-dev.2";
var shell_1;
var hasRequiredShell;
function requireShell() {
  if (hasRequiredShell) return shell_1;
  hasRequiredShell = 1;
  function shell(hljs) {
    return {
      name: "Shell Session",
      aliases: [
        "console",
        "shellsession"
      ],
      contains: [
        {
          className: "meta.prompt",
          // We cannot add \s (spaces) in the regular expression otherwise it will be too broad and produce unexpected result.
          // For instance, in the following example, it would match "echo /path/to/home >" as a prompt:
          // echo /path/to/home > t.exe
          begin: /^\s{0,3}[/~\w\d[\]()@-]*[>%$#][ ]?/,
          starts: {
            end: /[^\\](?=\s*$)/,
            subLanguage: "bash"
          }
        }
      ]
    };
  }
  shell_1 = shell;
  return shell_1;
}
export {
  requireShell as r
};
//# sourceMappingURL=shell-D7mfumoH.chunk.mjs.map
