const appName = "text";
const appVersion = "7.0.0-dev.2";
import { _ as __name } from "./mermaid.core-DchgNR_P.chunk.mjs";
var ImperativeState = class {
  /**
   * @param init - Function that creates the default state.
   */
  constructor(init) {
    this.init = init;
    this.records = this.init();
  }
  static {
    __name(this, "ImperativeState");
  }
  reset() {
    this.records = this.init();
  }
};
export {
  ImperativeState as I
};
//# sourceMappingURL=chunk-QZHKN3VN-C_3Vpq4b.chunk.mjs.map
