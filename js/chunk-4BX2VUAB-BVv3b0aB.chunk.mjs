const appName = "text";
const appVersion = "7.0.0-dev.2";
import { _ as __name } from "./mermaid.core-DchgNR_P.chunk.mjs";
function populateCommonDb(ast, db) {
  if (ast.accDescr) {
    db.setAccDescription?.(ast.accDescr);
  }
  if (ast.accTitle) {
    db.setAccTitle?.(ast.accTitle);
  }
  if (ast.title) {
    db.setDiagramTitle?.(ast.title);
  }
}
__name(populateCommonDb, "populateCommonDb");
export {
  populateCommonDb as p
};
//# sourceMappingURL=chunk-4BX2VUAB-BVv3b0aB.chunk.mjs.map
