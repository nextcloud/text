const appName = "text";
const appVersion = "7.0.0-dev.2";
import { _ as __name, F as cleanAndMerge, G as getConfig, K as selectSvgElement, e as configureSvgSize, l as log, aZ as styles2String, d as select, b as setAccTitle, a as getAccTitle, q as setDiagramTitle, t as getDiagramTitle, g as getAccDescription, s as setAccDescription, H as defaultConfig_default, a_ as isLabelStyle, z as clear } from "./mermaid.core-DchgNR_P.chunk.mjs";
import { s as setupViewPortForSVG } from "./chunk-QN33PNHL-5pVNXSy4.chunk.mjs";
import { p as populateCommonDb } from "./chunk-4BX2VUAB-BVv3b0aB.chunk.mjs";
import { p as parse } from "./treemap-KMMF4GRG-CT1igcLy.chunk.mjs";
import { b as format } from "./defaultLocale-CudlU1yQ.chunk.mjs";
import { o as ordinal } from "./ordinal-D74zQmkZ.chunk.mjs";
import "./preload-helper-wZpS7d4i.chunk.mjs";
import "./emoji-picker-Bacg5hGL.chunk.mjs";
import "./NcLoadingIcon-D2qSC7Ri.chunk.mjs";
import "./index-Djlbe-Du.chunk.mjs";
import "./vue.runtime.esm-DtAgfqM0.chunk.mjs";
import "./index--FnIx9_y.chunk.mjs";
import "./_baseUniq-BAgO0fq_.chunk.mjs";
import "./_basePickBy-Ch8wm704.chunk.mjs";
import "./clone-BtjdRD6Z.chunk.mjs";
import "./init-Dk6qugSB.chunk.mjs";
function count(node) {
  var sum = 0, children = node.children, i = children && children.length;
  if (!i) sum = 1;
  else while (--i >= 0) sum += children[i].value;
  node.value = sum;
}
function node_count() {
  return this.eachAfter(count);
}
function node_each(callback, that) {
  let index = -1;
  for (const node of this) {
    callback.call(that, node, ++index, this);
  }
  return this;
}
function node_eachBefore(callback, that) {
  var node = this, nodes = [node], children, i, index = -1;
  while (node = nodes.pop()) {
    callback.call(that, node, ++index, this);
    if (children = node.children) {
      for (i = children.length - 1; i >= 0; --i) {
        nodes.push(children[i]);
      }
    }
  }
  return this;
}
function node_eachAfter(callback, that) {
  var node = this, nodes = [node], next = [], children, i, n, index = -1;
  while (node = nodes.pop()) {
    next.push(node);
    if (children = node.children) {
      for (i = 0, n = children.length; i < n; ++i) {
        nodes.push(children[i]);
      }
    }
  }
  while (node = next.pop()) {
    callback.call(that, node, ++index, this);
  }
  return this;
}
function node_find(callback, that) {
  let index = -1;
  for (const node of this) {
    if (callback.call(that, node, ++index, this)) {
      return node;
    }
  }
}
function node_sum(value) {
  return this.eachAfter(function(node) {
    var sum = +value(node.data) || 0, children = node.children, i = children && children.length;
    while (--i >= 0) sum += children[i].value;
    node.value = sum;
  });
}
function node_sort(compare) {
  return this.eachBefore(function(node) {
    if (node.children) {
      node.children.sort(compare);
    }
  });
}
function node_path(end) {
  var start = this, ancestor = leastCommonAncestor(start, end), nodes = [start];
  while (start !== ancestor) {
    start = start.parent;
    nodes.push(start);
  }
  var k = nodes.length;
  while (end !== ancestor) {
    nodes.splice(k, 0, end);
    end = end.parent;
  }
  return nodes;
}
function leastCommonAncestor(a, b) {
  if (a === b) return a;
  var aNodes = a.ancestors(), bNodes = b.ancestors(), c = null;
  a = aNodes.pop();
  b = bNodes.pop();
  while (a === b) {
    c = a;
    a = aNodes.pop();
    b = bNodes.pop();
  }
  return c;
}
function node_ancestors() {
  var node = this, nodes = [node];
  while (node = node.parent) {
    nodes.push(node);
  }
  return nodes;
}
function node_descendants() {
  return Array.from(this);
}
function node_leaves() {
  var leaves = [];
  this.eachBefore(function(node) {
    if (!node.children) {
      leaves.push(node);
    }
  });
  return leaves;
}
function node_links() {
  var root = this, links = [];
  root.each(function(node) {
    if (node !== root) {
      links.push({ source: node.parent, target: node });
    }
  });
  return links;
}
function* node_iterator() {
  var node = this, current, next = [node], children, i, n;
  do {
    current = next.reverse(), next = [];
    while (node = current.pop()) {
      yield node;
      if (children = node.children) {
        for (i = 0, n = children.length; i < n; ++i) {
          next.push(children[i]);
        }
      }
    }
  } while (next.length);
}
function hierarchy(data, children) {
  if (data instanceof Map) {
    data = [void 0, data];
    if (children === void 0) children = mapChildren;
  } else if (children === void 0) {
    children = objectChildren;
  }
  var root = new Node(data), node, nodes = [root], child, childs, i, n;
  while (node = nodes.pop()) {
    if ((childs = children(node.data)) && (n = (childs = Array.from(childs)).length)) {
      node.children = childs;
      for (i = n - 1; i >= 0; --i) {
        nodes.push(child = childs[i] = new Node(childs[i]));
        child.parent = node;
        child.depth = node.depth + 1;
      }
    }
  }
  return root.eachBefore(computeHeight);
}
function node_copy() {
  return hierarchy(this).eachBefore(copyData);
}
function objectChildren(d) {
  return d.children;
}
function mapChildren(d) {
  return Array.isArray(d) ? d[1] : null;
}
function copyData(node) {
  if (node.data.value !== void 0) node.value = node.data.value;
  node.data = node.data.data;
}
function computeHeight(node) {
  var height = 0;
  do
    node.height = height;
  while ((node = node.parent) && node.height < ++height);
}
function Node(data) {
  this.data = data;
  this.depth = this.height = 0;
  this.parent = null;
}
Node.prototype = hierarchy.prototype = {
  constructor: Node,
  count: node_count,
  each: node_each,
  eachAfter: node_eachAfter,
  eachBefore: node_eachBefore,
  find: node_find,
  sum: node_sum,
  sort: node_sort,
  path: node_path,
  ancestors: node_ancestors,
  descendants: node_descendants,
  leaves: node_leaves,
  links: node_links,
  copy: node_copy,
  [Symbol.iterator]: node_iterator
};
function required(f) {
  if (typeof f !== "function") throw new Error();
  return f;
}
function constantZero() {
  return 0;
}
function constant(x) {
  return function() {
    return x;
  };
}
function roundNode(node) {
  node.x0 = Math.round(node.x0);
  node.y0 = Math.round(node.y0);
  node.x1 = Math.round(node.x1);
  node.y1 = Math.round(node.y1);
}
function treemapDice(parent, x0, y0, x1, y1) {
  var nodes = parent.children, node, i = -1, n = nodes.length, k = parent.value && (x1 - x0) / parent.value;
  while (++i < n) {
    node = nodes[i], node.y0 = y0, node.y1 = y1;
    node.x0 = x0, node.x1 = x0 += node.value * k;
  }
}
function treemapSlice(parent, x0, y0, x1, y1) {
  var nodes = parent.children, node, i = -1, n = nodes.length, k = parent.value && (y1 - y0) / parent.value;
  while (++i < n) {
    node = nodes[i], node.x0 = x0, node.x1 = x1;
    node.y0 = y0, node.y1 = y0 += node.value * k;
  }
}
var phi = (1 + Math.sqrt(5)) / 2;
function squarifyRatio(ratio, parent, x0, y0, x1, y1) {
  var rows = [], nodes = parent.children, row, nodeValue, i0 = 0, i1 = 0, n = nodes.length, dx, dy, value = parent.value, sumValue, minValue, maxValue, newRatio, minRatio, alpha, beta;
  while (i0 < n) {
    dx = x1 - x0, dy = y1 - y0;
    do
      sumValue = nodes[i1++].value;
    while (!sumValue && i1 < n);
    minValue = maxValue = sumValue;
    alpha = Math.max(dy / dx, dx / dy) / (value * ratio);
    beta = sumValue * sumValue * alpha;
    minRatio = Math.max(maxValue / beta, beta / minValue);
    for (; i1 < n; ++i1) {
      sumValue += nodeValue = nodes[i1].value;
      if (nodeValue < minValue) minValue = nodeValue;
      if (nodeValue > maxValue) maxValue = nodeValue;
      beta = sumValue * sumValue * alpha;
      newRatio = Math.max(maxValue / beta, beta / minValue);
      if (newRatio > minRatio) {
        sumValue -= nodeValue;
        break;
      }
      minRatio = newRatio;
    }
    rows.push(row = { value: sumValue, dice: dx < dy, children: nodes.slice(i0, i1) });
    if (row.dice) treemapDice(row, x0, y0, x1, value ? y0 += dy * sumValue / value : y1);
    else treemapSlice(row, x0, y0, value ? x0 += dx * sumValue / value : x1, y1);
    value -= sumValue, i0 = i1;
  }
  return rows;
}
const squarify = (function custom(ratio) {
  function squarify2(parent, x0, y0, x1, y1) {
    squarifyRatio(ratio, parent, x0, y0, x1, y1);
  }
  squarify2.ratio = function(x) {
    return custom((x = +x) > 1 ? x : 1);
  };
  return squarify2;
})(phi);
function treemap() {
  var tile = squarify, round = false, dx = 1, dy = 1, paddingStack = [0], paddingInner = constantZero, paddingTop = constantZero, paddingRight = constantZero, paddingBottom = constantZero, paddingLeft = constantZero;
  function treemap2(root) {
    root.x0 = root.y0 = 0;
    root.x1 = dx;
    root.y1 = dy;
    root.eachBefore(positionNode);
    paddingStack = [0];
    if (round) root.eachBefore(roundNode);
    return root;
  }
  function positionNode(node) {
    var p = paddingStack[node.depth], x0 = node.x0 + p, y0 = node.y0 + p, x1 = node.x1 - p, y1 = node.y1 - p;
    if (x1 < x0) x0 = x1 = (x0 + x1) / 2;
    if (y1 < y0) y0 = y1 = (y0 + y1) / 2;
    node.x0 = x0;
    node.y0 = y0;
    node.x1 = x1;
    node.y1 = y1;
    if (node.children) {
      p = paddingStack[node.depth + 1] = paddingInner(node) / 2;
      x0 += paddingLeft(node) - p;
      y0 += paddingTop(node) - p;
      x1 -= paddingRight(node) - p;
      y1 -= paddingBottom(node) - p;
      if (x1 < x0) x0 = x1 = (x0 + x1) / 2;
      if (y1 < y0) y0 = y1 = (y0 + y1) / 2;
      tile(node, x0, y0, x1, y1);
    }
  }
  treemap2.round = function(x) {
    return arguments.length ? (round = !!x, treemap2) : round;
  };
  treemap2.size = function(x) {
    return arguments.length ? (dx = +x[0], dy = +x[1], treemap2) : [dx, dy];
  };
  treemap2.tile = function(x) {
    return arguments.length ? (tile = required(x), treemap2) : tile;
  };
  treemap2.padding = function(x) {
    return arguments.length ? treemap2.paddingInner(x).paddingOuter(x) : treemap2.paddingInner();
  };
  treemap2.paddingInner = function(x) {
    return arguments.length ? (paddingInner = typeof x === "function" ? x : constant(+x), treemap2) : paddingInner;
  };
  treemap2.paddingOuter = function(x) {
    return arguments.length ? treemap2.paddingTop(x).paddingRight(x).paddingBottom(x).paddingLeft(x) : treemap2.paddingTop();
  };
  treemap2.paddingTop = function(x) {
    return arguments.length ? (paddingTop = typeof x === "function" ? x : constant(+x), treemap2) : paddingTop;
  };
  treemap2.paddingRight = function(x) {
    return arguments.length ? (paddingRight = typeof x === "function" ? x : constant(+x), treemap2) : paddingRight;
  };
  treemap2.paddingBottom = function(x) {
    return arguments.length ? (paddingBottom = typeof x === "function" ? x : constant(+x), treemap2) : paddingBottom;
  };
  treemap2.paddingLeft = function(x) {
    return arguments.length ? (paddingLeft = typeof x === "function" ? x : constant(+x), treemap2) : paddingLeft;
  };
  return treemap2;
}
var TreeMapDB = class {
  constructor() {
    this.nodes = [];
    this.levels = /* @__PURE__ */ new Map();
    this.outerNodes = [];
    this.classes = /* @__PURE__ */ new Map();
    this.setAccTitle = setAccTitle;
    this.getAccTitle = getAccTitle;
    this.setDiagramTitle = setDiagramTitle;
    this.getDiagramTitle = getDiagramTitle;
    this.getAccDescription = getAccDescription;
    this.setAccDescription = setAccDescription;
  }
  static {
    __name(this, "TreeMapDB");
  }
  getNodes() {
    return this.nodes;
  }
  getConfig() {
    const defaultConfig = defaultConfig_default;
    const userConfig = getConfig();
    return cleanAndMerge({
      ...defaultConfig.treemap,
      ...userConfig.treemap ?? {}
    });
  }
  addNode(node, level) {
    this.nodes.push(node);
    this.levels.set(node, level);
    if (level === 0) {
      this.outerNodes.push(node);
      this.root ??= node;
    }
  }
  getRoot() {
    return { name: "", children: this.outerNodes };
  }
  addClass(id, _style) {
    const styleClass = this.classes.get(id) ?? { id, styles: [], textStyles: [] };
    const styles = _style.replace(/\\,/g, "§§§").replace(/,/g, ";").replace(/§§§/g, ",").split(";");
    if (styles) {
      styles.forEach((s) => {
        if (isLabelStyle(s)) {
          if (styleClass?.textStyles) {
            styleClass.textStyles.push(s);
          } else {
            styleClass.textStyles = [s];
          }
        }
        if (styleClass?.styles) {
          styleClass.styles.push(s);
        } else {
          styleClass.styles = [s];
        }
      });
    }
    this.classes.set(id, styleClass);
  }
  getClasses() {
    return this.classes;
  }
  getStylesForClass(classSelector) {
    return this.classes.get(classSelector)?.styles ?? [];
  }
  clear() {
    clear();
    this.nodes = [];
    this.levels = /* @__PURE__ */ new Map();
    this.outerNodes = [];
    this.classes = /* @__PURE__ */ new Map();
    this.root = void 0;
  }
};
function buildHierarchy(items) {
  if (!items.length) {
    return [];
  }
  const root = [];
  const stack = [];
  items.forEach((item) => {
    const node = {
      name: item.name,
      children: item.type === "Leaf" ? void 0 : []
    };
    node.classSelector = item?.classSelector;
    if (item?.cssCompiledStyles) {
      node.cssCompiledStyles = [item.cssCompiledStyles];
    }
    if (item.type === "Leaf" && item.value !== void 0) {
      node.value = item.value;
    }
    while (stack.length > 0 && stack[stack.length - 1].level >= item.level) {
      stack.pop();
    }
    if (stack.length === 0) {
      root.push(node);
    } else {
      const parent = stack[stack.length - 1].node;
      if (parent.children) {
        parent.children.push(node);
      } else {
        parent.children = [node];
      }
    }
    if (item.type !== "Leaf") {
      stack.push({ node, level: item.level });
    }
  });
  return root;
}
__name(buildHierarchy, "buildHierarchy");
var populate = /* @__PURE__ */ __name((ast, db) => {
  populateCommonDb(ast, db);
  const items = [];
  for (const row of ast.TreemapRows ?? []) {
    if (row.$type === "ClassDefStatement") {
      db.addClass(row.className ?? "", row.styleText ?? "");
    }
  }
  for (const row of ast.TreemapRows ?? []) {
    const item = row.item;
    if (!item) {
      continue;
    }
    const level = row.indent ? parseInt(row.indent) : 0;
    const name = getItemName(item);
    const styles = item.classSelector ? db.getStylesForClass(item.classSelector) : [];
    const cssCompiledStyles = styles.length > 0 ? styles.join(";") : void 0;
    const itemData = {
      level,
      name,
      type: item.$type,
      value: item.value,
      classSelector: item.classSelector,
      cssCompiledStyles
    };
    items.push(itemData);
  }
  const hierarchyNodes = buildHierarchy(items);
  const addNodesRecursively = /* @__PURE__ */ __name((nodes, level) => {
    for (const node of nodes) {
      db.addNode(node, level);
      if (node.children && node.children.length > 0) {
        addNodesRecursively(node.children, level + 1);
      }
    }
  }, "addNodesRecursively");
  addNodesRecursively(hierarchyNodes, 0);
}, "populate");
var getItemName = /* @__PURE__ */ __name((item) => {
  return item.name ? String(item.name) : "";
}, "getItemName");
var parser = {
  // @ts-expect-error - TreeMapDB is not assignable to DiagramDB
  parser: { yy: void 0 },
  parse: /* @__PURE__ */ __name(async (text) => {
    try {
      const parseFunc = parse;
      const ast = await parseFunc("treemap", text);
      log.debug("Treemap AST:", ast);
      const db = parser.parser?.yy;
      if (!(db instanceof TreeMapDB)) {
        throw new Error(
          "parser.parser?.yy was not a TreemapDB. This is due to a bug within Mermaid, please report this issue at https://github.com/mermaid-js/mermaid/issues."
        );
      }
      populate(ast, db);
    } catch (error) {
      log.error("Error parsing treemap:", error);
      throw error;
    }
  }, "parse")
};
var DEFAULT_INNER_PADDING = 10;
var SECTION_INNER_PADDING = 10;
var SECTION_HEADER_HEIGHT = 25;
var draw = /* @__PURE__ */ __name((_text, id, _version, diagram2) => {
  const treemapDb = diagram2.db;
  const config = treemapDb.getConfig();
  const treemapInnerPadding = config.padding ?? DEFAULT_INNER_PADDING;
  const title = treemapDb.getDiagramTitle();
  const root = treemapDb.getRoot();
  const { themeVariables } = getConfig();
  if (!root) {
    return;
  }
  const titleHeight = title ? 30 : 0;
  const svg = selectSvgElement(id);
  const width = config.nodeWidth ? config.nodeWidth * SECTION_INNER_PADDING : 960;
  const height = config.nodeHeight ? config.nodeHeight * SECTION_INNER_PADDING : 500;
  const svgWidth = width;
  const svgHeight = height + titleHeight;
  svg.attr("viewBox", `0 0 ${svgWidth} ${svgHeight}`);
  configureSvgSize(svg, svgHeight, svgWidth, config.useMaxWidth);
  let valueFormat;
  try {
    const formatStr = config.valueFormat || ",";
    if (formatStr === "$0,0") {
      valueFormat = /* @__PURE__ */ __name((value) => "$" + format(",")(value), "valueFormat");
    } else if (formatStr.startsWith("$") && formatStr.includes(",")) {
      const precision = /\.\d+/.exec(formatStr);
      const precisionStr = precision ? precision[0] : "";
      valueFormat = /* @__PURE__ */ __name((value) => "$" + format("," + precisionStr)(value), "valueFormat");
    } else if (formatStr.startsWith("$")) {
      const restOfFormat = formatStr.substring(1);
      valueFormat = /* @__PURE__ */ __name((value) => "$" + format(restOfFormat || "")(value), "valueFormat");
    } else {
      valueFormat = format(formatStr);
    }
  } catch (error) {
    log.error("Error creating format function:", error);
    valueFormat = format(",");
  }
  const colorScale = ordinal().range([
    "transparent",
    themeVariables.cScale0,
    themeVariables.cScale1,
    themeVariables.cScale2,
    themeVariables.cScale3,
    themeVariables.cScale4,
    themeVariables.cScale5,
    themeVariables.cScale6,
    themeVariables.cScale7,
    themeVariables.cScale8,
    themeVariables.cScale9,
    themeVariables.cScale10,
    themeVariables.cScale11
  ]);
  const colorScalePeer = ordinal().range([
    "transparent",
    themeVariables.cScalePeer0,
    themeVariables.cScalePeer1,
    themeVariables.cScalePeer2,
    themeVariables.cScalePeer3,
    themeVariables.cScalePeer4,
    themeVariables.cScalePeer5,
    themeVariables.cScalePeer6,
    themeVariables.cScalePeer7,
    themeVariables.cScalePeer8,
    themeVariables.cScalePeer9,
    themeVariables.cScalePeer10,
    themeVariables.cScalePeer11
  ]);
  const colorScaleLabel = ordinal().range([
    themeVariables.cScaleLabel0,
    themeVariables.cScaleLabel1,
    themeVariables.cScaleLabel2,
    themeVariables.cScaleLabel3,
    themeVariables.cScaleLabel4,
    themeVariables.cScaleLabel5,
    themeVariables.cScaleLabel6,
    themeVariables.cScaleLabel7,
    themeVariables.cScaleLabel8,
    themeVariables.cScaleLabel9,
    themeVariables.cScaleLabel10,
    themeVariables.cScaleLabel11
  ]);
  if (title) {
    svg.append("text").attr("x", svgWidth / 2).attr("y", titleHeight / 2).attr("class", "treemapTitle").attr("text-anchor", "middle").attr("dominant-baseline", "middle").text(title);
  }
  const g = svg.append("g").attr("transform", `translate(0, ${titleHeight})`).attr("class", "treemapContainer");
  const hierarchyRoot = hierarchy(root).sum((d) => d.value ?? 0).sort((a, b) => (b.value ?? 0) - (a.value ?? 0));
  const treemapLayout = treemap().size([width, height]).paddingTop(
    (d) => d.children && d.children.length > 0 ? SECTION_HEADER_HEIGHT + SECTION_INNER_PADDING : 0
  ).paddingInner(treemapInnerPadding).paddingLeft((d) => d.children && d.children.length > 0 ? SECTION_INNER_PADDING : 0).paddingRight((d) => d.children && d.children.length > 0 ? SECTION_INNER_PADDING : 0).paddingBottom((d) => d.children && d.children.length > 0 ? SECTION_INNER_PADDING : 0).round(true);
  const treemapData = treemapLayout(hierarchyRoot);
  const branchNodes = treemapData.descendants().filter((d) => d.children && d.children.length > 0);
  const sections = g.selectAll(".treemapSection").data(branchNodes).enter().append("g").attr("class", "treemapSection").attr("transform", (d) => `translate(${d.x0},${d.y0})`);
  sections.append("rect").attr("width", (d) => d.x1 - d.x0).attr("height", SECTION_HEADER_HEIGHT).attr("class", "treemapSectionHeader").attr("fill", "none").attr("fill-opacity", 0.6).attr("stroke-width", 0.6).attr("style", (d) => {
    if (d.depth === 0) {
      return "display: none;";
    }
    return "";
  });
  sections.append("clipPath").attr("id", (_d, i) => `clip-section-${id}-${i}`).append("rect").attr("width", (d) => Math.max(0, d.x1 - d.x0 - 12)).attr("height", SECTION_HEADER_HEIGHT);
  sections.append("rect").attr("width", (d) => d.x1 - d.x0).attr("height", (d) => d.y1 - d.y0).attr("class", (_d, i) => {
    return `treemapSection section${i}`;
  }).attr("fill", (d) => colorScale(d.data.name)).attr("fill-opacity", 0.6).attr("stroke", (d) => colorScalePeer(d.data.name)).attr("stroke-width", 2).attr("stroke-opacity", 0.4).attr("style", (d) => {
    if (d.depth === 0) {
      return "display: none;";
    }
    const styles = styles2String({ cssCompiledStyles: d.data.cssCompiledStyles });
    return styles.nodeStyles + ";" + styles.borderStyles.join(";");
  });
  sections.append("text").attr("class", "treemapSectionLabel").attr("x", 6).attr("y", SECTION_HEADER_HEIGHT / 2).attr("dominant-baseline", "middle").text((d) => d.depth === 0 ? "" : d.data.name).attr("font-weight", "bold").attr("style", (d) => {
    if (d.depth === 0) {
      return "display: none;";
    }
    const labelStyles = "dominant-baseline: middle; font-size: 12px; fill:" + colorScaleLabel(d.data.name) + "; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;";
    const styles = styles2String({ cssCompiledStyles: d.data.cssCompiledStyles });
    return labelStyles + styles.labelStyles.replace("color:", "fill:");
  }).each(function(d) {
    if (d.depth === 0) {
      return;
    }
    const self = select(this);
    const originalText = d.data.name;
    self.text(originalText);
    const totalHeaderWidth = d.x1 - d.x0;
    const labelXPosition = 6;
    let spaceForTextContent;
    if (config.showValues !== false && d.value) {
      const valueEndsAtXRelative = totalHeaderWidth - 10;
      const estimatedValueTextActualWidth = 30;
      const gapBetweenLabelAndValue = 10;
      const labelMustEndBeforeX = valueEndsAtXRelative - estimatedValueTextActualWidth - gapBetweenLabelAndValue;
      spaceForTextContent = labelMustEndBeforeX - labelXPosition;
    } else {
      const labelOwnRightPadding = 6;
      spaceForTextContent = totalHeaderWidth - labelXPosition - labelOwnRightPadding;
    }
    const minimumWidthToDisplay = 15;
    const actualAvailableWidth = Math.max(minimumWidthToDisplay, spaceForTextContent);
    const textNode = self.node();
    const currentTextContentLength = textNode.getComputedTextLength();
    if (currentTextContentLength > actualAvailableWidth) {
      const ellipsis = "...";
      let currentTruncatedText = originalText;
      while (currentTruncatedText.length > 0) {
        currentTruncatedText = originalText.substring(0, currentTruncatedText.length - 1);
        if (currentTruncatedText.length === 0) {
          self.text(ellipsis);
          if (textNode.getComputedTextLength() > actualAvailableWidth) {
            self.text("");
          }
          break;
        }
        self.text(currentTruncatedText + ellipsis);
        if (textNode.getComputedTextLength() <= actualAvailableWidth) {
          break;
        }
      }
    }
  });
  if (config.showValues !== false) {
    sections.append("text").attr("class", "treemapSectionValue").attr("x", (d) => d.x1 - d.x0 - 10).attr("y", SECTION_HEADER_HEIGHT / 2).attr("text-anchor", "end").attr("dominant-baseline", "middle").text((d) => d.value ? valueFormat(d.value) : "").attr("font-style", "italic").attr("style", (d) => {
      if (d.depth === 0) {
        return "display: none;";
      }
      const labelStyles = "text-anchor: end; dominant-baseline: middle; font-size: 10px; fill:" + colorScaleLabel(d.data.name) + "; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;";
      const styles = styles2String({ cssCompiledStyles: d.data.cssCompiledStyles });
      return labelStyles + styles.labelStyles.replace("color:", "fill:");
    });
  }
  const leafNodes = treemapData.leaves();
  const cell = g.selectAll(".treemapLeafGroup").data(leafNodes).enter().append("g").attr("class", (d, i) => {
    return `treemapNode treemapLeafGroup leaf${i}${d.data.classSelector ? ` ${d.data.classSelector}` : ""}x`;
  }).attr("transform", (d) => `translate(${d.x0},${d.y0})`);
  cell.append("rect").attr("width", (d) => d.x1 - d.x0).attr("height", (d) => d.y1 - d.y0).attr("class", "treemapLeaf").attr("fill", (d) => {
    return d.parent ? colorScale(d.parent.data.name) : colorScale(d.data.name);
  }).attr("style", (d) => {
    const styles = styles2String({ cssCompiledStyles: d.data.cssCompiledStyles });
    return styles.nodeStyles;
  }).attr("fill-opacity", 0.3).attr("stroke", (d) => {
    return d.parent ? colorScale(d.parent.data.name) : colorScale(d.data.name);
  }).attr("stroke-width", 3);
  cell.append("clipPath").attr("id", (_d, i) => `clip-${id}-${i}`).append("rect").attr("width", (d) => Math.max(0, d.x1 - d.x0 - 4)).attr("height", (d) => Math.max(0, d.y1 - d.y0 - 4));
  const leafLabels = cell.append("text").attr("class", "treemapLabel").attr("x", (d) => (d.x1 - d.x0) / 2).attr("y", (d) => (d.y1 - d.y0) / 2).attr("style", (d) => {
    const labelStyles = "text-anchor: middle; dominant-baseline: middle; font-size: 38px;fill:" + colorScaleLabel(d.data.name) + ";";
    const styles = styles2String({ cssCompiledStyles: d.data.cssCompiledStyles });
    return labelStyles + styles.labelStyles.replace("color:", "fill:");
  }).attr("clip-path", (_d, i) => `url(#clip-${id}-${i})`).text((d) => d.data.name);
  leafLabels.each(function(d) {
    const self = select(this);
    const nodeWidth = d.x1 - d.x0;
    const nodeHeight = d.y1 - d.y0;
    const textNode = self.node();
    const padding = 4;
    const availableWidth = nodeWidth - 2 * padding;
    const availableHeight = nodeHeight - 2 * padding;
    if (availableWidth < 10 || availableHeight < 10) {
      self.style("display", "none");
      return;
    }
    let currentLabelFontSize = parseInt(self.style("font-size"), 10);
    const minLabelFontSize = 8;
    const originalValueRelFontSize = 28;
    const valueScaleFactor = 0.6;
    const minValueFontSize = 6;
    const spacingBetweenLabelAndValue = 2;
    while (textNode.getComputedTextLength() > availableWidth && currentLabelFontSize > minLabelFontSize) {
      currentLabelFontSize--;
      self.style("font-size", `${currentLabelFontSize}px`);
    }
    let prospectiveValueFontSize = Math.max(
      minValueFontSize,
      Math.min(originalValueRelFontSize, Math.round(currentLabelFontSize * valueScaleFactor))
    );
    let combinedHeight = currentLabelFontSize + spacingBetweenLabelAndValue + prospectiveValueFontSize;
    while (combinedHeight > availableHeight && currentLabelFontSize > minLabelFontSize) {
      currentLabelFontSize--;
      prospectiveValueFontSize = Math.max(
        minValueFontSize,
        Math.min(originalValueRelFontSize, Math.round(currentLabelFontSize * valueScaleFactor))
      );
      if (prospectiveValueFontSize < minValueFontSize && currentLabelFontSize === minLabelFontSize) {
        break;
      }
      self.style("font-size", `${currentLabelFontSize}px`);
      combinedHeight = currentLabelFontSize + spacingBetweenLabelAndValue + prospectiveValueFontSize;
    }
    self.style("font-size", `${currentLabelFontSize}px`);
    if (textNode.getComputedTextLength() > availableWidth || currentLabelFontSize < minLabelFontSize || availableHeight < currentLabelFontSize) {
      self.style("display", "none");
    }
  });
  if (config.showValues !== false) {
    const leafValues = cell.append("text").attr("class", "treemapValue").attr("x", (d) => (d.x1 - d.x0) / 2).attr("y", function(d) {
      return (d.y1 - d.y0) / 2;
    }).attr("style", (d) => {
      const labelStyles = "text-anchor: middle; dominant-baseline: hanging; font-size: 28px;fill:" + colorScaleLabel(d.data.name) + ";";
      const styles = styles2String({ cssCompiledStyles: d.data.cssCompiledStyles });
      return labelStyles + styles.labelStyles.replace("color:", "fill:");
    }).attr("clip-path", (_d, i) => `url(#clip-${id}-${i})`).text((d) => d.value ? valueFormat(d.value) : "");
    leafValues.each(function(d) {
      const valueTextElement = select(this);
      const parentCellNode = this.parentNode;
      if (!parentCellNode) {
        valueTextElement.style("display", "none");
        return;
      }
      const labelElement = select(parentCellNode).select(".treemapLabel");
      if (labelElement.empty() || labelElement.style("display") === "none") {
        valueTextElement.style("display", "none");
        return;
      }
      const finalLabelFontSize = parseFloat(labelElement.style("font-size"));
      const originalValueFontSize = 28;
      const valueScaleFactor = 0.6;
      const minValueFontSize = 6;
      const spacingBetweenLabelAndValue = 2;
      const actualValueFontSize = Math.max(
        minValueFontSize,
        Math.min(originalValueFontSize, Math.round(finalLabelFontSize * valueScaleFactor))
      );
      valueTextElement.style("font-size", `${actualValueFontSize}px`);
      const labelCenterY = (d.y1 - d.y0) / 2;
      const valueTopActualY = labelCenterY + finalLabelFontSize / 2 + spacingBetweenLabelAndValue;
      valueTextElement.attr("y", valueTopActualY);
      const nodeWidth = d.x1 - d.x0;
      const nodeTotalHeight = d.y1 - d.y0;
      const cellBottomPadding = 4;
      const maxValueBottomY = nodeTotalHeight - cellBottomPadding;
      const availableWidthForValue = nodeWidth - 2 * 4;
      if (valueTextElement.node().getComputedTextLength() > availableWidthForValue || valueTopActualY + actualValueFontSize > maxValueBottomY || actualValueFontSize < minValueFontSize) {
        valueTextElement.style("display", "none");
      } else {
        valueTextElement.style("display", null);
      }
    });
  }
  const diagramPadding = config.diagramPadding ?? 8;
  setupViewPortForSVG(svg, diagramPadding, "flowchart", config?.useMaxWidth || false);
}, "draw");
var getClasses = /* @__PURE__ */ __name(function(_text, diagramObj) {
  return diagramObj.db.getClasses();
}, "getClasses");
var renderer = { draw, getClasses };
var defaultTreemapStyleOptions = {
  sectionStrokeColor: "black",
  sectionStrokeWidth: "1",
  sectionFillColor: "#efefef",
  leafStrokeColor: "black",
  leafStrokeWidth: "1",
  leafFillColor: "#efefef",
  labelColor: "black",
  labelFontSize: "12px",
  valueFontSize: "10px",
  valueColor: "black",
  titleColor: "black",
  titleFontSize: "14px"
};
var getStyles = /* @__PURE__ */ __name(({
  treemap: treemap2
} = {}) => {
  const options = cleanAndMerge(defaultTreemapStyleOptions, treemap2);
  return `
  .treemapNode.section {
    stroke: ${options.sectionStrokeColor};
    stroke-width: ${options.sectionStrokeWidth};
    fill: ${options.sectionFillColor};
  }
  .treemapNode.leaf {
    stroke: ${options.leafStrokeColor};
    stroke-width: ${options.leafStrokeWidth};
    fill: ${options.leafFillColor};
  }
  .treemapLabel {
    fill: ${options.labelColor};
    font-size: ${options.labelFontSize};
  }
  .treemapValue {
    fill: ${options.valueColor};
    font-size: ${options.valueFontSize};
  }
  .treemapTitle {
    fill: ${options.titleColor};
    font-size: ${options.titleFontSize};
  }
  `;
}, "getStyles");
var styles_default = getStyles;
var diagram = {
  parser,
  get db() {
    return new TreeMapDB();
  },
  renderer,
  styles: styles_default
};
export {
  diagram
};
//# sourceMappingURL=diagram-PSM6KHXK-C0fyOkeh.chunk.mjs.map
