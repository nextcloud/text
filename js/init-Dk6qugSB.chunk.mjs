const appName = "text";
const appVersion = "7.0.0-dev.2";
function initRange(domain, range) {
  switch (arguments.length) {
    case 0:
      break;
    case 1:
      this.range(domain);
      break;
    default:
      this.range(range).domain(domain);
      break;
  }
  return this;
}
export {
  initRange as i
};
//# sourceMappingURL=init-Dk6qugSB.chunk.mjs.map
