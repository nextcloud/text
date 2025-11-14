const appName = "text";
const appVersion = "7.0.0-dev.2";
import { G as Graph } from "./graph-BtMD9Fxw.chunk.mjs";
import { b as baseClone, p as castFunction, q as baseForOwn, g as baseIteratee, e as isSymbol, l as arrayMap, o as baseGet, s as hasIn, c as baseFlatten, u as toString, d as forEach, i as isUndefined, f as filter, v as values, r as reduce } from "./_baseUniq-BAgO0fq_.chunk.mjs";
import { f as flatten, b as baseExtremum, a as baseLt, c as baseMap, d as basePickBy, t as toFinite, m as map, e as min, h as has, g as find, l as last, i as defaults } from "./_basePickBy-Ch8wm704.chunk.mjs";
import { b7 as setToString, b8 as overRest, b9 as baseFor, aN as keysIn, ba as baseAssignValue, aR as identity, aQ as isArray, bb as baseUnary, aM as isIterateeCall, ar as baseRest, aT as assignValue, at as constant, bc as merge } from "./mermaid.core-DchgNR_P.chunk.mjs";
function flatRest(func) {
  return setToString(overRest(func, void 0, flatten), func + "");
}
var CLONE_DEEP_FLAG = 1, CLONE_SYMBOLS_FLAG = 4;
function cloneDeep(value) {
  return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
}
function forIn(object, iteratee) {
  return object == null ? object : baseFor(object, castFunction(iteratee), keysIn);
}
function forOwn(object, iteratee) {
  return object && baseForOwn(object, castFunction(iteratee));
}
function baseGt(value, other) {
  return value > other;
}
function mapValues(object, iteratee) {
  var result = {};
  iteratee = baseIteratee(iteratee);
  baseForOwn(object, function(value, key, object2) {
    baseAssignValue(result, key, iteratee(value, key, object2));
  });
  return result;
}
function max(array) {
  return array && array.length ? baseExtremum(array, identity, baseGt) : void 0;
}
function minBy(array, iteratee) {
  return array && array.length ? baseExtremum(array, baseIteratee(iteratee), baseLt) : void 0;
}
function baseSortBy(array, comparer) {
  var length = array.length;
  array.sort(comparer);
  while (length--) {
    array[length] = array[length].value;
  }
  return array;
}
function compareAscending(value, other) {
  if (value !== other) {
    var valIsDefined = value !== void 0, valIsNull = value === null, valIsReflexive = value === value, valIsSymbol = isSymbol(value);
    var othIsDefined = other !== void 0, othIsNull = other === null, othIsReflexive = other === other, othIsSymbol = isSymbol(other);
    if (!othIsNull && !othIsSymbol && !valIsSymbol && value > other || valIsSymbol && othIsDefined && othIsReflexive && !othIsNull && !othIsSymbol || valIsNull && othIsDefined && othIsReflexive || !valIsDefined && othIsReflexive || !valIsReflexive) {
      return 1;
    }
    if (!valIsNull && !valIsSymbol && !othIsSymbol && value < other || othIsSymbol && valIsDefined && valIsReflexive && !valIsNull && !valIsSymbol || othIsNull && valIsDefined && valIsReflexive || !othIsDefined && valIsReflexive || !othIsReflexive) {
      return -1;
    }
  }
  return 0;
}
function compareMultiple(object, other, orders) {
  var index = -1, objCriteria = object.criteria, othCriteria = other.criteria, length = objCriteria.length, ordersLength = orders.length;
  while (++index < length) {
    var result = compareAscending(objCriteria[index], othCriteria[index]);
    if (result) {
      if (index >= ordersLength) {
        return result;
      }
      var order2 = orders[index];
      return result * (order2 == "desc" ? -1 : 1);
    }
  }
  return object.index - other.index;
}
function baseOrderBy(collection, iteratees, orders) {
  if (iteratees.length) {
    iteratees = arrayMap(iteratees, function(iteratee) {
      if (isArray(iteratee)) {
        return function(value) {
          return baseGet(value, iteratee.length === 1 ? iteratee[0] : iteratee);
        };
      }
      return iteratee;
    });
  } else {
    iteratees = [identity];
  }
  var index = -1;
  iteratees = arrayMap(iteratees, baseUnary(baseIteratee));
  var result = baseMap(collection, function(value, key, collection2) {
    var criteria = arrayMap(iteratees, function(iteratee) {
      return iteratee(value);
    });
    return { "criteria": criteria, "index": ++index, "value": value };
  });
  return baseSortBy(result, function(object, other) {
    return compareMultiple(object, other, orders);
  });
}
function basePick(object, paths) {
  return basePickBy(object, paths, function(value, path) {
    return hasIn(object, path);
  });
}
var pick = flatRest(function(object, paths) {
  return object == null ? {} : basePick(object, paths);
});
var nativeCeil = Math.ceil, nativeMax = Math.max;
function baseRange(start, end, step, fromRight) {
  var index = -1, length = nativeMax(nativeCeil((end - start) / (step || 1)), 0), result = Array(length);
  while (length--) {
    result[++index] = start;
    start += step;
  }
  return result;
}
function createRange(fromRight) {
  return function(start, end, step) {
    if (step && typeof step != "number" && isIterateeCall(start, end, step)) {
      end = step = void 0;
    }
    start = toFinite(start);
    if (end === void 0) {
      end = start;
      start = 0;
    } else {
      end = toFinite(end);
    }
    step = step === void 0 ? start < end ? 1 : -1 : toFinite(step);
    return baseRange(start, end, step);
  };
}
var range = createRange();
var sortBy = baseRest(function(collection, iteratees) {
  if (collection == null) {
    return [];
  }
  var length = iteratees.length;
  if (length > 1 && isIterateeCall(collection, iteratees[0], iteratees[1])) {
    iteratees = [];
  } else if (length > 2 && isIterateeCall(iteratees[0], iteratees[1], iteratees[2])) {
    iteratees = [iteratees[0]];
  }
  return baseOrderBy(collection, baseFlatten(iteratees), []);
});
var idCounter = 0;
function uniqueId(prefix) {
  var id = ++idCounter;
  return toString(prefix) + id;
}
function baseZipObject(props, values2, assignFunc) {
  var index = -1, length = props.length, valsLength = values2.length, result = {};
  while (++index < length) {
    var value = index < valsLength ? values2[index] : void 0;
    assignFunc(result, props[index], value);
  }
  return result;
}
function zipObject(props, values2) {
  return baseZipObject(props || [], values2 || [], assignValue);
}
class List {
  constructor() {
    var sentinel = {};
    sentinel._next = sentinel._prev = sentinel;
    this._sentinel = sentinel;
  }
  dequeue() {
    var sentinel = this._sentinel;
    var entry = sentinel._prev;
    if (entry !== sentinel) {
      unlink(entry);
      return entry;
    }
  }
  enqueue(entry) {
    var sentinel = this._sentinel;
    if (entry._prev && entry._next) {
      unlink(entry);
    }
    entry._next = sentinel._next;
    sentinel._next._prev = entry;
    sentinel._next = entry;
    entry._prev = sentinel;
  }
  toString() {
    var strs = [];
    var sentinel = this._sentinel;
    var curr = sentinel._prev;
    while (curr !== sentinel) {
      strs.push(JSON.stringify(curr, filterOutLinks));
      curr = curr._prev;
    }
    return "[" + strs.join(", ") + "]";
  }
}
function unlink(entry) {
  entry._prev._next = entry._next;
  entry._next._prev = entry._prev;
  delete entry._next;
  delete entry._prev;
}
function filterOutLinks(k, v) {
  if (k !== "_next" && k !== "_prev") {
    return v;
  }
}
var DEFAULT_WEIGHT_FN = constant(1);
function greedyFAS(g, weightFn) {
  if (g.nodeCount() <= 1) {
    return [];
  }
  var state = buildState(g, weightFn || DEFAULT_WEIGHT_FN);
  var results = doGreedyFAS(state.graph, state.buckets, state.zeroIdx);
  return flatten(
    map(results, function(e) {
      return g.outEdges(e.v, e.w);
    })
  );
}
function doGreedyFAS(g, buckets, zeroIdx) {
  var results = [];
  var sources = buckets[buckets.length - 1];
  var sinks = buckets[0];
  var entry;
  while (g.nodeCount()) {
    while (entry = sinks.dequeue()) {
      removeNode(g, buckets, zeroIdx, entry);
    }
    while (entry = sources.dequeue()) {
      removeNode(g, buckets, zeroIdx, entry);
    }
    if (g.nodeCount()) {
      for (var i = buckets.length - 2; i > 0; --i) {
        entry = buckets[i].dequeue();
        if (entry) {
          results = results.concat(removeNode(g, buckets, zeroIdx, entry, true));
          break;
        }
      }
    }
  }
  return results;
}
function removeNode(g, buckets, zeroIdx, entry, collectPredecessors) {
  var results = collectPredecessors ? [] : void 0;
  forEach(g.inEdges(entry.v), function(edge) {
    var weight = g.edge(edge);
    var uEntry = g.node(edge.v);
    if (collectPredecessors) {
      results.push({ v: edge.v, w: edge.w });
    }
    uEntry.out -= weight;
    assignBucket(buckets, zeroIdx, uEntry);
  });
  forEach(g.outEdges(entry.v), function(edge) {
    var weight = g.edge(edge);
    var w = edge.w;
    var wEntry = g.node(w);
    wEntry["in"] -= weight;
    assignBucket(buckets, zeroIdx, wEntry);
  });
  g.removeNode(entry.v);
  return results;
}
function buildState(g, weightFn) {
  var fasGraph = new Graph();
  var maxIn = 0;
  var maxOut = 0;
  forEach(g.nodes(), function(v) {
    fasGraph.setNode(v, { v, in: 0, out: 0 });
  });
  forEach(g.edges(), function(e) {
    var prevWeight = fasGraph.edge(e.v, e.w) || 0;
    var weight = weightFn(e);
    var edgeWeight = prevWeight + weight;
    fasGraph.setEdge(e.v, e.w, edgeWeight);
    maxOut = Math.max(maxOut, fasGraph.node(e.v).out += weight);
    maxIn = Math.max(maxIn, fasGraph.node(e.w)["in"] += weight);
  });
  var buckets = range(maxOut + maxIn + 3).map(function() {
    return new List();
  });
  var zeroIdx = maxIn + 1;
  forEach(fasGraph.nodes(), function(v) {
    assignBucket(buckets, zeroIdx, fasGraph.node(v));
  });
  return { graph: fasGraph, buckets, zeroIdx };
}
function assignBucket(buckets, zeroIdx, entry) {
  if (!entry.out) {
    buckets[0].enqueue(entry);
  } else if (!entry["in"]) {
    buckets[buckets.length - 1].enqueue(entry);
  } else {
    buckets[entry.out - entry["in"] + zeroIdx].enqueue(entry);
  }
}
function run$2(g) {
  var fas = g.graph().acyclicer === "greedy" ? greedyFAS(g, weightFn(g)) : dfsFAS(g);
  forEach(fas, function(e) {
    var label = g.edge(e);
    g.removeEdge(e);
    label.forwardName = e.name;
    label.reversed = true;
    g.setEdge(e.w, e.v, label, uniqueId("rev"));
  });
  function weightFn(g2) {
    return function(e) {
      return g2.edge(e).weight;
    };
  }
}
function dfsFAS(g) {
  var fas = [];
  var stack = {};
  var visited = {};
  function dfs2(v) {
    if (Object.prototype.hasOwnProperty.call(visited, v)) {
      return;
    }
    visited[v] = true;
    stack[v] = true;
    forEach(g.outEdges(v), function(e) {
      if (Object.prototype.hasOwnProperty.call(stack, e.w)) {
        fas.push(e);
      } else {
        dfs2(e.w);
      }
    });
    delete stack[v];
  }
  forEach(g.nodes(), dfs2);
  return fas;
}
function undo$2(g) {
  forEach(g.edges(), function(e) {
    var label = g.edge(e);
    if (label.reversed) {
      g.removeEdge(e);
      var forwardName = label.forwardName;
      delete label.reversed;
      delete label.forwardName;
      g.setEdge(e.w, e.v, label, forwardName);
    }
  });
}
function addDummyNode(g, type, attrs, name) {
  var v;
  do {
    v = uniqueId(name);
  } while (g.hasNode(v));
  attrs.dummy = type;
  g.setNode(v, attrs);
  return v;
}
function simplify(g) {
  var simplified = new Graph().setGraph(g.graph());
  forEach(g.nodes(), function(v) {
    simplified.setNode(v, g.node(v));
  });
  forEach(g.edges(), function(e) {
    var simpleLabel = simplified.edge(e.v, e.w) || { weight: 0, minlen: 1 };
    var label = g.edge(e);
    simplified.setEdge(e.v, e.w, {
      weight: simpleLabel.weight + label.weight,
      minlen: Math.max(simpleLabel.minlen, label.minlen)
    });
  });
  return simplified;
}
function asNonCompoundGraph(g) {
  var simplified = new Graph({ multigraph: g.isMultigraph() }).setGraph(g.graph());
  forEach(g.nodes(), function(v) {
    if (!g.children(v).length) {
      simplified.setNode(v, g.node(v));
    }
  });
  forEach(g.edges(), function(e) {
    simplified.setEdge(e, g.edge(e));
  });
  return simplified;
}
function intersectRect(rect, point) {
  var x = rect.x;
  var y = rect.y;
  var dx = point.x - x;
  var dy = point.y - y;
  var w = rect.width / 2;
  var h = rect.height / 2;
  if (!dx && !dy) {
    throw new Error("Not possible to find intersection inside of the rectangle");
  }
  var sx, sy;
  if (Math.abs(dy) * w > Math.abs(dx) * h) {
    if (dy < 0) {
      h = -h;
    }
    sx = h * dx / dy;
    sy = h;
  } else {
    if (dx < 0) {
      w = -w;
    }
    sx = w;
    sy = w * dy / dx;
  }
  return { x: x + sx, y: y + sy };
}
function buildLayerMatrix(g) {
  var layering = map(range(maxRank(g) + 1), function() {
    return [];
  });
  forEach(g.nodes(), function(v) {
    var node = g.node(v);
    var rank2 = node.rank;
    if (!isUndefined(rank2)) {
      layering[rank2][node.order] = v;
    }
  });
  return layering;
}
function normalizeRanks(g) {
  var min$1 = min(
    map(g.nodes(), function(v) {
      return g.node(v).rank;
    })
  );
  forEach(g.nodes(), function(v) {
    var node = g.node(v);
    if (has(node, "rank")) {
      node.rank -= min$1;
    }
  });
}
function removeEmptyRanks(g) {
  var offset = min(
    map(g.nodes(), function(v) {
      return g.node(v).rank;
    })
  );
  var layers = [];
  forEach(g.nodes(), function(v) {
    var rank2 = g.node(v).rank - offset;
    if (!layers[rank2]) {
      layers[rank2] = [];
    }
    layers[rank2].push(v);
  });
  var delta = 0;
  var nodeRankFactor = g.graph().nodeRankFactor;
  forEach(layers, function(vs, i) {
    if (isUndefined(vs) && i % nodeRankFactor !== 0) {
      --delta;
    } else if (delta) {
      forEach(vs, function(v) {
        g.node(v).rank += delta;
      });
    }
  });
}
function addBorderNode$1(g, prefix, rank2, order2) {
  var node = {
    width: 0,
    height: 0
  };
  if (arguments.length >= 4) {
    node.rank = rank2;
    node.order = order2;
  }
  return addDummyNode(g, "border", node, prefix);
}
function maxRank(g) {
  return max(
    map(g.nodes(), function(v) {
      var rank2 = g.node(v).rank;
      if (!isUndefined(rank2)) {
        return rank2;
      }
    })
  );
}
function partition(collection, fn) {
  var result = { lhs: [], rhs: [] };
  forEach(collection, function(value) {
    if (fn(value)) {
      result.lhs.push(value);
    } else {
      result.rhs.push(value);
    }
  });
  return result;
}
function notime(name, fn) {
  return fn();
}
function addBorderSegments(g) {
  function dfs2(v) {
    var children = g.children(v);
    var node = g.node(v);
    if (children.length) {
      forEach(children, dfs2);
    }
    if (Object.prototype.hasOwnProperty.call(node, "minRank")) {
      node.borderLeft = [];
      node.borderRight = [];
      for (var rank2 = node.minRank, maxRank2 = node.maxRank + 1; rank2 < maxRank2; ++rank2) {
        addBorderNode(g, "borderLeft", "_bl", v, node, rank2);
        addBorderNode(g, "borderRight", "_br", v, node, rank2);
      }
    }
  }
  forEach(g.children(), dfs2);
}
function addBorderNode(g, prop, prefix, sg, sgNode, rank2) {
  var label = { width: 0, height: 0, rank: rank2, borderType: prop };
  var prev = sgNode[prop][rank2 - 1];
  var curr = addDummyNode(g, "border", label, prefix);
  sgNode[prop][rank2] = curr;
  g.setParent(curr, sg);
  if (prev) {
    g.setEdge(prev, curr, { weight: 1 });
  }
}
function adjust(g) {
  var rankDir = g.graph().rankdir.toLowerCase();
  if (rankDir === "lr" || rankDir === "rl") {
    swapWidthHeight(g);
  }
}
function undo$1(g) {
  var rankDir = g.graph().rankdir.toLowerCase();
  if (rankDir === "bt" || rankDir === "rl") {
    reverseY(g);
  }
  if (rankDir === "lr" || rankDir === "rl") {
    swapXY(g);
    swapWidthHeight(g);
  }
}
function swapWidthHeight(g) {
  forEach(g.nodes(), function(v) {
    swapWidthHeightOne(g.node(v));
  });
  forEach(g.edges(), function(e) {
    swapWidthHeightOne(g.edge(e));
  });
}
function swapWidthHeightOne(attrs) {
  var w = attrs.width;
  attrs.width = attrs.height;
  attrs.height = w;
}
function reverseY(g) {
  forEach(g.nodes(), function(v) {
    reverseYOne(g.node(v));
  });
  forEach(g.edges(), function(e) {
    var edge = g.edge(e);
    forEach(edge.points, reverseYOne);
    if (Object.prototype.hasOwnProperty.call(edge, "y")) {
      reverseYOne(edge);
    }
  });
}
function reverseYOne(attrs) {
  attrs.y = -attrs.y;
}
function swapXY(g) {
  forEach(g.nodes(), function(v) {
    swapXYOne(g.node(v));
  });
  forEach(g.edges(), function(e) {
    var edge = g.edge(e);
    forEach(edge.points, swapXYOne);
    if (Object.prototype.hasOwnProperty.call(edge, "x")) {
      swapXYOne(edge);
    }
  });
}
function swapXYOne(attrs) {
  var x = attrs.x;
  attrs.x = attrs.y;
  attrs.y = x;
}
function run$1(g) {
  g.graph().dummyChains = [];
  forEach(g.edges(), function(edge) {
    normalizeEdge(g, edge);
  });
}
function normalizeEdge(g, e) {
  var v = e.v;
  var vRank = g.node(v).rank;
  var w = e.w;
  var wRank = g.node(w).rank;
  var name = e.name;
  var edgeLabel = g.edge(e);
  var labelRank = edgeLabel.labelRank;
  if (wRank === vRank + 1) return;
  g.removeEdge(e);
  var attrs = void 0;
  var dummy, i;
  for (i = 0, ++vRank; vRank < wRank; ++i, ++vRank) {
    edgeLabel.points = [];
    attrs = {
      width: 0,
      height: 0,
      edgeLabel,
      edgeObj: e,
      rank: vRank
    };
    dummy = addDummyNode(g, "edge", attrs, "_d");
    if (vRank === labelRank) {
      attrs.width = edgeLabel.width;
      attrs.height = edgeLabel.height;
      attrs.dummy = "edge-label";
      attrs.labelpos = edgeLabel.labelpos;
    }
    g.setEdge(v, dummy, { weight: edgeLabel.weight }, name);
    if (i === 0) {
      g.graph().dummyChains.push(dummy);
    }
    v = dummy;
  }
  g.setEdge(v, w, { weight: edgeLabel.weight }, name);
}
function undo(g) {
  forEach(g.graph().dummyChains, function(v) {
    var node = g.node(v);
    var origLabel = node.edgeLabel;
    var w;
    g.setEdge(node.edgeObj, origLabel);
    while (node.dummy) {
      w = g.successors(v)[0];
      g.removeNode(v);
      origLabel.points.push({ x: node.x, y: node.y });
      if (node.dummy === "edge-label") {
        origLabel.x = node.x;
        origLabel.y = node.y;
        origLabel.width = node.width;
        origLabel.height = node.height;
      }
      v = w;
      node = g.node(v);
    }
  });
}
function longestPath(g) {
  var visited = {};
  function dfs2(v) {
    var label = g.node(v);
    if (Object.prototype.hasOwnProperty.call(visited, v)) {
      return label.rank;
    }
    visited[v] = true;
    var rank2 = min(
      map(g.outEdges(v), function(e) {
        return dfs2(e.w) - g.edge(e).minlen;
      })
    );
    if (rank2 === Number.POSITIVE_INFINITY || // return value of _.map([]) for Lodash 3
    rank2 === void 0 || // return value of _.map([]) for Lodash 4
    rank2 === null) {
      rank2 = 0;
    }
    return label.rank = rank2;
  }
  forEach(g.sources(), dfs2);
}
function slack(g, e) {
  return g.node(e.w).rank - g.node(e.v).rank - g.edge(e).minlen;
}
function feasibleTree(g) {
  var t = new Graph({ directed: false });
  var start = g.nodes()[0];
  var size = g.nodeCount();
  t.setNode(start, {});
  var edge, delta;
  while (tightTree(t, g) < size) {
    edge = findMinSlackEdge(t, g);
    delta = t.hasNode(edge.v) ? slack(g, edge) : -slack(g, edge);
    shiftRanks(t, g, delta);
  }
  return t;
}
function tightTree(t, g) {
  function dfs2(v) {
    forEach(g.nodeEdges(v), function(e) {
      var edgeV = e.v, w = v === edgeV ? e.w : edgeV;
      if (!t.hasNode(w) && !slack(g, e)) {
        t.setNode(w, {});
        t.setEdge(v, w, {});
        dfs2(w);
      }
    });
  }
  forEach(t.nodes(), dfs2);
  return t.nodeCount();
}
function findMinSlackEdge(t, g) {
  return minBy(g.edges(), function(e) {
    if (t.hasNode(e.v) !== t.hasNode(e.w)) {
      return slack(g, e);
    }
  });
}
function shiftRanks(t, g, delta) {
  forEach(t.nodes(), function(v) {
    g.node(v).rank += delta;
  });
}
function CycleException() {
}
CycleException.prototype = new Error();
function dfs$1(g, vs, order2) {
  if (!isArray(vs)) {
    vs = [vs];
  }
  var navigation = (g.isDirected() ? g.successors : g.neighbors).bind(g);
  var acc = [];
  var visited = {};
  forEach(vs, function(v) {
    if (!g.hasNode(v)) {
      throw new Error("Graph does not have node: " + v);
    }
    doDfs(g, v, order2 === "post", visited, navigation, acc);
  });
  return acc;
}
function doDfs(g, v, postorder2, visited, navigation, acc) {
  if (!Object.prototype.hasOwnProperty.call(visited, v)) {
    visited[v] = true;
    if (!postorder2) {
      acc.push(v);
    }
    forEach(navigation(v), function(w) {
      doDfs(g, w, postorder2, visited, navigation, acc);
    });
    if (postorder2) {
      acc.push(v);
    }
  }
}
function postorder$1(g, vs) {
  return dfs$1(g, vs, "post");
}
function preorder(g, vs) {
  return dfs$1(g, vs, "pre");
}
networkSimplex.initLowLimValues = initLowLimValues;
networkSimplex.initCutValues = initCutValues;
networkSimplex.calcCutValue = calcCutValue;
networkSimplex.leaveEdge = leaveEdge;
networkSimplex.enterEdge = enterEdge;
networkSimplex.exchangeEdges = exchangeEdges;
function networkSimplex(g) {
  g = simplify(g);
  longestPath(g);
  var t = feasibleTree(g);
  initLowLimValues(t);
  initCutValues(t, g);
  var e, f;
  while (e = leaveEdge(t)) {
    f = enterEdge(t, g, e);
    exchangeEdges(t, g, e, f);
  }
}
function initCutValues(t, g) {
  var vs = postorder$1(t, t.nodes());
  vs = vs.slice(0, vs.length - 1);
  forEach(vs, function(v) {
    assignCutValue(t, g, v);
  });
}
function assignCutValue(t, g, child) {
  var childLab = t.node(child);
  var parent = childLab.parent;
  t.edge(child, parent).cutvalue = calcCutValue(t, g, child);
}
function calcCutValue(t, g, child) {
  var childLab = t.node(child);
  var parent = childLab.parent;
  var childIsTail = true;
  var graphEdge = g.edge(child, parent);
  var cutValue = 0;
  if (!graphEdge) {
    childIsTail = false;
    graphEdge = g.edge(parent, child);
  }
  cutValue = graphEdge.weight;
  forEach(g.nodeEdges(child), function(e) {
    var isOutEdge = e.v === child, other = isOutEdge ? e.w : e.v;
    if (other !== parent) {
      var pointsToHead = isOutEdge === childIsTail, otherWeight = g.edge(e).weight;
      cutValue += pointsToHead ? otherWeight : -otherWeight;
      if (isTreeEdge(t, child, other)) {
        var otherCutValue = t.edge(child, other).cutvalue;
        cutValue += pointsToHead ? -otherCutValue : otherCutValue;
      }
    }
  });
  return cutValue;
}
function initLowLimValues(tree, root) {
  if (arguments.length < 2) {
    root = tree.nodes()[0];
  }
  dfsAssignLowLim(tree, {}, 1, root);
}
function dfsAssignLowLim(tree, visited, nextLim, v, parent) {
  var low = nextLim;
  var label = tree.node(v);
  visited[v] = true;
  forEach(tree.neighbors(v), function(w) {
    if (!Object.prototype.hasOwnProperty.call(visited, w)) {
      nextLim = dfsAssignLowLim(tree, visited, nextLim, w, v);
    }
  });
  label.low = low;
  label.lim = nextLim++;
  if (parent) {
    label.parent = parent;
  } else {
    delete label.parent;
  }
  return nextLim;
}
function leaveEdge(tree) {
  return find(tree.edges(), function(e) {
    return tree.edge(e).cutvalue < 0;
  });
}
function enterEdge(t, g, edge) {
  var v = edge.v;
  var w = edge.w;
  if (!g.hasEdge(v, w)) {
    v = edge.w;
    w = edge.v;
  }
  var vLabel = t.node(v);
  var wLabel = t.node(w);
  var tailLabel = vLabel;
  var flip = false;
  if (vLabel.lim > wLabel.lim) {
    tailLabel = wLabel;
    flip = true;
  }
  var candidates = filter(g.edges(), function(edge2) {
    return flip === isDescendant(t, t.node(edge2.v), tailLabel) && flip !== isDescendant(t, t.node(edge2.w), tailLabel);
  });
  return minBy(candidates, function(edge2) {
    return slack(g, edge2);
  });
}
function exchangeEdges(t, g, e, f) {
  var v = e.v;
  var w = e.w;
  t.removeEdge(v, w);
  t.setEdge(f.v, f.w, {});
  initLowLimValues(t);
  initCutValues(t, g);
  updateRanks(t, g);
}
function updateRanks(t, g) {
  var root = find(t.nodes(), function(v) {
    return !g.node(v).parent;
  });
  var vs = preorder(t, root);
  vs = vs.slice(1);
  forEach(vs, function(v) {
    var parent = t.node(v).parent, edge = g.edge(v, parent), flipped = false;
    if (!edge) {
      edge = g.edge(parent, v);
      flipped = true;
    }
    g.node(v).rank = g.node(parent).rank + (flipped ? edge.minlen : -edge.minlen);
  });
}
function isTreeEdge(tree, u, v) {
  return tree.hasEdge(u, v);
}
function isDescendant(tree, vLabel, rootLabel) {
  return rootLabel.low <= vLabel.lim && vLabel.lim <= rootLabel.lim;
}
function rank(g) {
  switch (g.graph().ranker) {
    case "network-simplex":
      networkSimplexRanker(g);
      break;
    case "tight-tree":
      tightTreeRanker(g);
      break;
    case "longest-path":
      longestPathRanker(g);
      break;
    default:
      networkSimplexRanker(g);
  }
}
var longestPathRanker = longestPath;
function tightTreeRanker(g) {
  longestPath(g);
  feasibleTree(g);
}
function networkSimplexRanker(g) {
  networkSimplex(g);
}
function run(g) {
  var root = addDummyNode(g, "root", {}, "_root");
  var depths = treeDepths(g);
  var height = max(values(depths)) - 1;
  var nodeSep = 2 * height + 1;
  g.graph().nestingRoot = root;
  forEach(g.edges(), function(e) {
    g.edge(e).minlen *= nodeSep;
  });
  var weight = sumWeights(g) + 1;
  forEach(g.children(), function(child) {
    dfs(g, root, nodeSep, weight, height, depths, child);
  });
  g.graph().nodeRankFactor = nodeSep;
}
function dfs(g, root, nodeSep, weight, height, depths, v) {
  var children = g.children(v);
  if (!children.length) {
    if (v !== root) {
      g.setEdge(root, v, { weight: 0, minlen: nodeSep });
    }
    return;
  }
  var top = addBorderNode$1(g, "_bt");
  var bottom = addBorderNode$1(g, "_bb");
  var label = g.node(v);
  g.setParent(top, v);
  label.borderTop = top;
  g.setParent(bottom, v);
  label.borderBottom = bottom;
  forEach(children, function(child) {
    dfs(g, root, nodeSep, weight, height, depths, child);
    var childNode = g.node(child);
    var childTop = childNode.borderTop ? childNode.borderTop : child;
    var childBottom = childNode.borderBottom ? childNode.borderBottom : child;
    var thisWeight = childNode.borderTop ? weight : 2 * weight;
    var minlen = childTop !== childBottom ? 1 : height - depths[v] + 1;
    g.setEdge(top, childTop, {
      weight: thisWeight,
      minlen,
      nestingEdge: true
    });
    g.setEdge(childBottom, bottom, {
      weight: thisWeight,
      minlen,
      nestingEdge: true
    });
  });
  if (!g.parent(v)) {
    g.setEdge(root, top, { weight: 0, minlen: height + depths[v] });
  }
}
function treeDepths(g) {
  var depths = {};
  function dfs2(v, depth) {
    var children = g.children(v);
    if (children && children.length) {
      forEach(children, function(child) {
        dfs2(child, depth + 1);
      });
    }
    depths[v] = depth;
  }
  forEach(g.children(), function(v) {
    dfs2(v, 1);
  });
  return depths;
}
function sumWeights(g) {
  return reduce(
    g.edges(),
    function(acc, e) {
      return acc + g.edge(e).weight;
    },
    0
  );
}
function cleanup(g) {
  var graphLabel = g.graph();
  g.removeNode(graphLabel.nestingRoot);
  delete graphLabel.nestingRoot;
  forEach(g.edges(), function(e) {
    var edge = g.edge(e);
    if (edge.nestingEdge) {
      g.removeEdge(e);
    }
  });
}
function addSubgraphConstraints(g, cg, vs) {
  var prev = {}, rootPrev;
  forEach(vs, function(v) {
    var child = g.parent(v), parent, prevChild;
    while (child) {
      parent = g.parent(child);
      if (parent) {
        prevChild = prev[parent];
        prev[parent] = child;
      } else {
        prevChild = rootPrev;
        rootPrev = child;
      }
      if (prevChild && prevChild !== child) {
        cg.setEdge(prevChild, child);
        return;
      }
      child = parent;
    }
  });
}
function buildLayerGraph(g, rank2, relationship) {
  var root = createRootNode(g), result = new Graph({ compound: true }).setGraph({ root }).setDefaultNodeLabel(function(v) {
    return g.node(v);
  });
  forEach(g.nodes(), function(v) {
    var node = g.node(v), parent = g.parent(v);
    if (node.rank === rank2 || node.minRank <= rank2 && rank2 <= node.maxRank) {
      result.setNode(v);
      result.setParent(v, parent || root);
      forEach(g[relationship](v), function(e) {
        var u = e.v === v ? e.w : e.v, edge = result.edge(u, v), weight = !isUndefined(edge) ? edge.weight : 0;
        result.setEdge(u, v, { weight: g.edge(e).weight + weight });
      });
      if (Object.prototype.hasOwnProperty.call(node, "minRank")) {
        result.setNode(v, {
          borderLeft: node.borderLeft[rank2],
          borderRight: node.borderRight[rank2]
        });
      }
    }
  });
  return result;
}
function createRootNode(g) {
  var v;
  while (g.hasNode(v = uniqueId("_root"))) ;
  return v;
}
function crossCount(g, layering) {
  var cc = 0;
  for (var i = 1; i < layering.length; ++i) {
    cc += twoLayerCrossCount(g, layering[i - 1], layering[i]);
  }
  return cc;
}
function twoLayerCrossCount(g, northLayer, southLayer) {
  var southPos = zipObject(
    southLayer,
    map(southLayer, function(v, i) {
      return i;
    })
  );
  var southEntries = flatten(
    map(northLayer, function(v) {
      return sortBy(
        map(g.outEdges(v), function(e) {
          return { pos: southPos[e.w], weight: g.edge(e).weight };
        }),
        "pos"
      );
    })
  );
  var firstIndex = 1;
  while (firstIndex < southLayer.length) firstIndex <<= 1;
  var treeSize = 2 * firstIndex - 1;
  firstIndex -= 1;
  var tree = map(new Array(treeSize), function() {
    return 0;
  });
  var cc = 0;
  forEach(
    // @ts-expect-error
    southEntries.forEach(function(entry) {
      var index = entry.pos + firstIndex;
      tree[index] += entry.weight;
      var weightSum = 0;
      while (index > 0) {
        if (index % 2) {
          weightSum += tree[index + 1];
        }
        index = index - 1 >> 1;
        tree[index] += entry.weight;
      }
      cc += entry.weight * weightSum;
    })
  );
  return cc;
}
function initOrder(g) {
  var visited = {};
  var simpleNodes = filter(g.nodes(), function(v) {
    return !g.children(v).length;
  });
  var maxRank2 = max(
    map(simpleNodes, function(v) {
      return g.node(v).rank;
    })
  );
  var layers = map(range(maxRank2 + 1), function() {
    return [];
  });
  function dfs2(v) {
    if (has(visited, v)) return;
    visited[v] = true;
    var node = g.node(v);
    layers[node.rank].push(v);
    forEach(g.successors(v), dfs2);
  }
  var orderedVs = sortBy(simpleNodes, function(v) {
    return g.node(v).rank;
  });
  forEach(orderedVs, dfs2);
  return layers;
}
function barycenter(g, movable) {
  return map(movable, function(v) {
    var inV = g.inEdges(v);
    if (!inV.length) {
      return { v };
    } else {
      var result = reduce(
        inV,
        function(acc, e) {
          var edge = g.edge(e), nodeU = g.node(e.v);
          return {
            sum: acc.sum + edge.weight * nodeU.order,
            weight: acc.weight + edge.weight
          };
        },
        { sum: 0, weight: 0 }
      );
      return {
        v,
        barycenter: result.sum / result.weight,
        weight: result.weight
      };
    }
  });
}
function resolveConflicts(entries, cg) {
  var mappedEntries = {};
  forEach(entries, function(entry, i) {
    var tmp = mappedEntries[entry.v] = {
      indegree: 0,
      in: [],
      out: [],
      vs: [entry.v],
      i
    };
    if (!isUndefined(entry.barycenter)) {
      tmp.barycenter = entry.barycenter;
      tmp.weight = entry.weight;
    }
  });
  forEach(cg.edges(), function(e) {
    var entryV = mappedEntries[e.v];
    var entryW = mappedEntries[e.w];
    if (!isUndefined(entryV) && !isUndefined(entryW)) {
      entryW.indegree++;
      entryV.out.push(mappedEntries[e.w]);
    }
  });
  var sourceSet = filter(mappedEntries, function(entry) {
    return !entry.indegree;
  });
  return doResolveConflicts(sourceSet);
}
function doResolveConflicts(sourceSet) {
  var entries = [];
  function handleIn(vEntry) {
    return function(uEntry) {
      if (uEntry.merged) {
        return;
      }
      if (isUndefined(uEntry.barycenter) || isUndefined(vEntry.barycenter) || uEntry.barycenter >= vEntry.barycenter) {
        mergeEntries(vEntry, uEntry);
      }
    };
  }
  function handleOut(vEntry) {
    return function(wEntry) {
      wEntry["in"].push(vEntry);
      if (--wEntry.indegree === 0) {
        sourceSet.push(wEntry);
      }
    };
  }
  while (sourceSet.length) {
    var entry = sourceSet.pop();
    entries.push(entry);
    forEach(entry["in"].reverse(), handleIn(entry));
    forEach(entry.out, handleOut(entry));
  }
  return map(
    filter(entries, function(entry2) {
      return !entry2.merged;
    }),
    function(entry2) {
      return pick(entry2, ["vs", "i", "barycenter", "weight"]);
    }
  );
}
function mergeEntries(target, source) {
  var sum = 0;
  var weight = 0;
  if (target.weight) {
    sum += target.barycenter * target.weight;
    weight += target.weight;
  }
  if (source.weight) {
    sum += source.barycenter * source.weight;
    weight += source.weight;
  }
  target.vs = source.vs.concat(target.vs);
  target.barycenter = sum / weight;
  target.weight = weight;
  target.i = Math.min(source.i, target.i);
  source.merged = true;
}
function sort(entries, biasRight) {
  var parts = partition(entries, function(entry) {
    return Object.prototype.hasOwnProperty.call(entry, "barycenter");
  });
  var sortable = parts.lhs, unsortable = sortBy(parts.rhs, function(entry) {
    return -entry.i;
  }), vs = [], sum = 0, weight = 0, vsIndex = 0;
  sortable.sort(compareWithBias(!!biasRight));
  vsIndex = consumeUnsortable(vs, unsortable, vsIndex);
  forEach(sortable, function(entry) {
    vsIndex += entry.vs.length;
    vs.push(entry.vs);
    sum += entry.barycenter * entry.weight;
    weight += entry.weight;
    vsIndex = consumeUnsortable(vs, unsortable, vsIndex);
  });
  var result = { vs: flatten(vs) };
  if (weight) {
    result.barycenter = sum / weight;
    result.weight = weight;
  }
  return result;
}
function consumeUnsortable(vs, unsortable, index) {
  var last$1;
  while (unsortable.length && (last$1 = last(unsortable)).i <= index) {
    unsortable.pop();
    vs.push(last$1.vs);
    index++;
  }
  return index;
}
function compareWithBias(bias) {
  return function(entryV, entryW) {
    if (entryV.barycenter < entryW.barycenter) {
      return -1;
    } else if (entryV.barycenter > entryW.barycenter) {
      return 1;
    }
    return !bias ? entryV.i - entryW.i : entryW.i - entryV.i;
  };
}
function sortSubgraph(g, v, cg, biasRight) {
  var movable = g.children(v);
  var node = g.node(v);
  var bl = node ? node.borderLeft : void 0;
  var br = node ? node.borderRight : void 0;
  var subgraphs = {};
  if (bl) {
    movable = filter(movable, function(w) {
      return w !== bl && w !== br;
    });
  }
  var barycenters = barycenter(g, movable);
  forEach(barycenters, function(entry) {
    if (g.children(entry.v).length) {
      var subgraphResult = sortSubgraph(g, entry.v, cg, biasRight);
      subgraphs[entry.v] = subgraphResult;
      if (Object.prototype.hasOwnProperty.call(subgraphResult, "barycenter")) {
        mergeBarycenters(entry, subgraphResult);
      }
    }
  });
  var entries = resolveConflicts(barycenters, cg);
  expandSubgraphs(entries, subgraphs);
  var result = sort(entries, biasRight);
  if (bl) {
    result.vs = flatten([bl, result.vs, br]);
    if (g.predecessors(bl).length) {
      var blPred = g.node(g.predecessors(bl)[0]), brPred = g.node(g.predecessors(br)[0]);
      if (!Object.prototype.hasOwnProperty.call(result, "barycenter")) {
        result.barycenter = 0;
        result.weight = 0;
      }
      result.barycenter = (result.barycenter * result.weight + blPred.order + brPred.order) / (result.weight + 2);
      result.weight += 2;
    }
  }
  return result;
}
function expandSubgraphs(entries, subgraphs) {
  forEach(entries, function(entry) {
    entry.vs = flatten(
      entry.vs.map(function(v) {
        if (subgraphs[v]) {
          return subgraphs[v].vs;
        }
        return v;
      })
    );
  });
}
function mergeBarycenters(target, other) {
  if (!isUndefined(target.barycenter)) {
    target.barycenter = (target.barycenter * target.weight + other.barycenter * other.weight) / (target.weight + other.weight);
    target.weight += other.weight;
  } else {
    target.barycenter = other.barycenter;
    target.weight = other.weight;
  }
}
function order(g) {
  var maxRank$1 = maxRank(g), downLayerGraphs = buildLayerGraphs(g, range(1, maxRank$1 + 1), "inEdges"), upLayerGraphs = buildLayerGraphs(g, range(maxRank$1 - 1, -1, -1), "outEdges");
  var layering = initOrder(g);
  assignOrder(g, layering);
  var bestCC = Number.POSITIVE_INFINITY, best;
  for (var i = 0, lastBest = 0; lastBest < 4; ++i, ++lastBest) {
    sweepLayerGraphs(i % 2 ? downLayerGraphs : upLayerGraphs, i % 4 >= 2);
    layering = buildLayerMatrix(g);
    var cc = crossCount(g, layering);
    if (cc < bestCC) {
      lastBest = 0;
      best = cloneDeep(layering);
      bestCC = cc;
    }
  }
  assignOrder(g, best);
}
function buildLayerGraphs(g, ranks, relationship) {
  return map(ranks, function(rank2) {
    return buildLayerGraph(g, rank2, relationship);
  });
}
function sweepLayerGraphs(layerGraphs, biasRight) {
  var cg = new Graph();
  forEach(layerGraphs, function(lg) {
    var root = lg.graph().root;
    var sorted = sortSubgraph(lg, root, cg, biasRight);
    forEach(sorted.vs, function(v, i) {
      lg.node(v).order = i;
    });
    addSubgraphConstraints(lg, cg, sorted.vs);
  });
}
function assignOrder(g, layering) {
  forEach(layering, function(layer) {
    forEach(layer, function(v, i) {
      g.node(v).order = i;
    });
  });
}
function parentDummyChains(g) {
  var postorderNums = postorder(g);
  forEach(g.graph().dummyChains, function(v) {
    var node = g.node(v);
    var edgeObj = node.edgeObj;
    var pathData = findPath(g, postorderNums, edgeObj.v, edgeObj.w);
    var path = pathData.path;
    var lca = pathData.lca;
    var pathIdx = 0;
    var pathV = path[pathIdx];
    var ascending = true;
    while (v !== edgeObj.w) {
      node = g.node(v);
      if (ascending) {
        while ((pathV = path[pathIdx]) !== lca && g.node(pathV).maxRank < node.rank) {
          pathIdx++;
        }
        if (pathV === lca) {
          ascending = false;
        }
      }
      if (!ascending) {
        while (pathIdx < path.length - 1 && g.node(pathV = path[pathIdx + 1]).minRank <= node.rank) {
          pathIdx++;
        }
        pathV = path[pathIdx];
      }
      g.setParent(v, pathV);
      v = g.successors(v)[0];
    }
  });
}
function findPath(g, postorderNums, v, w) {
  var vPath = [];
  var wPath = [];
  var low = Math.min(postorderNums[v].low, postorderNums[w].low);
  var lim = Math.max(postorderNums[v].lim, postorderNums[w].lim);
  var parent;
  var lca;
  parent = v;
  do {
    parent = g.parent(parent);
    vPath.push(parent);
  } while (parent && (postorderNums[parent].low > low || lim > postorderNums[parent].lim));
  lca = parent;
  parent = w;
  while ((parent = g.parent(parent)) !== lca) {
    wPath.push(parent);
  }
  return { path: vPath.concat(wPath.reverse()), lca };
}
function postorder(g) {
  var result = {};
  var lim = 0;
  function dfs2(v) {
    var low = lim;
    forEach(g.children(v), dfs2);
    result[v] = { low, lim: lim++ };
  }
  forEach(g.children(), dfs2);
  return result;
}
function findType1Conflicts(g, layering) {
  var conflicts = {};
  function visitLayer(prevLayer, layer) {
    var k0 = 0, scanPos = 0, prevLayerLength = prevLayer.length, lastNode = last(layer);
    forEach(layer, function(v, i) {
      var w = findOtherInnerSegmentNode(g, v), k1 = w ? g.node(w).order : prevLayerLength;
      if (w || v === lastNode) {
        forEach(layer.slice(scanPos, i + 1), function(scanNode) {
          forEach(g.predecessors(scanNode), function(u) {
            var uLabel = g.node(u), uPos = uLabel.order;
            if ((uPos < k0 || k1 < uPos) && !(uLabel.dummy && g.node(scanNode).dummy)) {
              addConflict(conflicts, u, scanNode);
            }
          });
        });
        scanPos = i + 1;
        k0 = k1;
      }
    });
    return layer;
  }
  reduce(layering, visitLayer);
  return conflicts;
}
function findType2Conflicts(g, layering) {
  var conflicts = {};
  function scan(south, southPos, southEnd, prevNorthBorder, nextNorthBorder) {
    var v;
    forEach(range(southPos, southEnd), function(i) {
      v = south[i];
      if (g.node(v).dummy) {
        forEach(g.predecessors(v), function(u) {
          var uNode = g.node(u);
          if (uNode.dummy && (uNode.order < prevNorthBorder || uNode.order > nextNorthBorder)) {
            addConflict(conflicts, u, v);
          }
        });
      }
    });
  }
  function visitLayer(north, south) {
    var prevNorthPos = -1, nextNorthPos, southPos = 0;
    forEach(south, function(v, southLookahead) {
      if (g.node(v).dummy === "border") {
        var predecessors = g.predecessors(v);
        if (predecessors.length) {
          nextNorthPos = g.node(predecessors[0]).order;
          scan(south, southPos, southLookahead, prevNorthPos, nextNorthPos);
          southPos = southLookahead;
          prevNorthPos = nextNorthPos;
        }
      }
      scan(south, southPos, south.length, nextNorthPos, north.length);
    });
    return south;
  }
  reduce(layering, visitLayer);
  return conflicts;
}
function findOtherInnerSegmentNode(g, v) {
  if (g.node(v).dummy) {
    return find(g.predecessors(v), function(u) {
      return g.node(u).dummy;
    });
  }
}
function addConflict(conflicts, v, w) {
  if (v > w) {
    var tmp = v;
    v = w;
    w = tmp;
  }
  if (!Object.prototype.hasOwnProperty.call(conflicts, v)) {
    Object.defineProperty(conflicts, v, {
      enumerable: true,
      configurable: true,
      value: {},
      writable: true
    });
  }
  var conflictsV = conflicts[v];
  Object.defineProperty(conflictsV, w, {
    enumerable: true,
    configurable: true,
    value: true,
    writable: true
  });
}
function hasConflict(conflicts, v, w) {
  if (v > w) {
    var tmp = v;
    v = w;
    w = tmp;
  }
  return !!conflicts[v] && Object.prototype.hasOwnProperty.call(conflicts[v], w);
}
function verticalAlignment(g, layering, conflicts, neighborFn) {
  var root = {}, align = {}, pos = {};
  forEach(layering, function(layer) {
    forEach(layer, function(v, order2) {
      root[v] = v;
      align[v] = v;
      pos[v] = order2;
    });
  });
  forEach(layering, function(layer) {
    var prevIdx = -1;
    forEach(layer, function(v) {
      var ws = neighborFn(v);
      if (ws.length) {
        ws = sortBy(ws, function(w2) {
          return pos[w2];
        });
        var mp = (ws.length - 1) / 2;
        for (var i = Math.floor(mp), il = Math.ceil(mp); i <= il; ++i) {
          var w = ws[i];
          if (align[v] === v && prevIdx < pos[w] && !hasConflict(conflicts, v, w)) {
            align[w] = v;
            align[v] = root[v] = root[w];
            prevIdx = pos[w];
          }
        }
      }
    });
  });
  return { root, align };
}
function horizontalCompaction(g, layering, root, align, reverseSep) {
  var xs = {}, blockG = buildBlockGraph(g, layering, root, reverseSep), borderType = reverseSep ? "borderLeft" : "borderRight";
  function iterate(setXsFunc, nextNodesFunc) {
    var stack = blockG.nodes();
    var elem = stack.pop();
    var visited = {};
    while (elem) {
      if (visited[elem]) {
        setXsFunc(elem);
      } else {
        visited[elem] = true;
        stack.push(elem);
        stack = stack.concat(nextNodesFunc(elem));
      }
      elem = stack.pop();
    }
  }
  function pass1(elem) {
    xs[elem] = blockG.inEdges(elem).reduce(function(acc, e) {
      return Math.max(acc, xs[e.v] + blockG.edge(e));
    }, 0);
  }
  function pass2(elem) {
    var min2 = blockG.outEdges(elem).reduce(function(acc, e) {
      return Math.min(acc, xs[e.w] - blockG.edge(e));
    }, Number.POSITIVE_INFINITY);
    var node = g.node(elem);
    if (min2 !== Number.POSITIVE_INFINITY && node.borderType !== borderType) {
      xs[elem] = Math.max(xs[elem], min2);
    }
  }
  iterate(pass1, blockG.predecessors.bind(blockG));
  iterate(pass2, blockG.successors.bind(blockG));
  forEach(align, function(v) {
    xs[v] = xs[root[v]];
  });
  return xs;
}
function buildBlockGraph(g, layering, root, reverseSep) {
  var blockGraph = new Graph(), graphLabel = g.graph(), sepFn = sep(graphLabel.nodesep, graphLabel.edgesep, reverseSep);
  forEach(layering, function(layer) {
    var u;
    forEach(layer, function(v) {
      var vRoot = root[v];
      blockGraph.setNode(vRoot);
      if (u) {
        var uRoot = root[u], prevMax = blockGraph.edge(uRoot, vRoot);
        blockGraph.setEdge(uRoot, vRoot, Math.max(sepFn(g, v, u), prevMax || 0));
      }
      u = v;
    });
  });
  return blockGraph;
}
function findSmallestWidthAlignment(g, xss) {
  return minBy(values(xss), function(xs) {
    var max2 = Number.NEGATIVE_INFINITY;
    var min2 = Number.POSITIVE_INFINITY;
    forIn(xs, function(x, v) {
      var halfWidth = width(g, v) / 2;
      max2 = Math.max(x + halfWidth, max2);
      min2 = Math.min(x - halfWidth, min2);
    });
    return max2 - min2;
  });
}
function alignCoordinates(xss, alignTo) {
  var alignToVals = values(alignTo), alignToMin = min(alignToVals), alignToMax = max(alignToVals);
  forEach(["u", "d"], function(vert) {
    forEach(["l", "r"], function(horiz) {
      var alignment = vert + horiz, xs = xss[alignment], delta;
      if (xs === alignTo) return;
      var xsVals = values(xs);
      delta = horiz === "l" ? alignToMin - min(xsVals) : alignToMax - max(xsVals);
      if (delta) {
        xss[alignment] = mapValues(xs, function(x) {
          return x + delta;
        });
      }
    });
  });
}
function balance(xss, align) {
  return mapValues(xss.ul, function(ignore, v) {
    if (align) {
      return xss[align.toLowerCase()][v];
    } else {
      var xs = sortBy(map(xss, v));
      return (xs[1] + xs[2]) / 2;
    }
  });
}
function positionX(g) {
  var layering = buildLayerMatrix(g);
  var conflicts = merge(findType1Conflicts(g, layering), findType2Conflicts(g, layering));
  var xss = {};
  var adjustedLayering;
  forEach(["u", "d"], function(vert) {
    adjustedLayering = vert === "u" ? layering : values(layering).reverse();
    forEach(["l", "r"], function(horiz) {
      if (horiz === "r") {
        adjustedLayering = map(adjustedLayering, function(inner) {
          return values(inner).reverse();
        });
      }
      var neighborFn = (vert === "u" ? g.predecessors : g.successors).bind(g);
      var align = verticalAlignment(g, adjustedLayering, conflicts, neighborFn);
      var xs = horizontalCompaction(g, adjustedLayering, align.root, align.align, horiz === "r");
      if (horiz === "r") {
        xs = mapValues(xs, function(x) {
          return -x;
        });
      }
      xss[vert + horiz] = xs;
    });
  });
  var smallestWidth = findSmallestWidthAlignment(g, xss);
  alignCoordinates(xss, smallestWidth);
  return balance(xss, g.graph().align);
}
function sep(nodeSep, edgeSep, reverseSep) {
  return function(g, v, w) {
    var vLabel = g.node(v);
    var wLabel = g.node(w);
    var sum = 0;
    var delta;
    sum += vLabel.width / 2;
    if (Object.prototype.hasOwnProperty.call(vLabel, "labelpos")) {
      switch (vLabel.labelpos.toLowerCase()) {
        case "l":
          delta = -vLabel.width / 2;
          break;
        case "r":
          delta = vLabel.width / 2;
          break;
      }
    }
    if (delta) {
      sum += reverseSep ? delta : -delta;
    }
    delta = 0;
    sum += (vLabel.dummy ? edgeSep : nodeSep) / 2;
    sum += (wLabel.dummy ? edgeSep : nodeSep) / 2;
    sum += wLabel.width / 2;
    if (Object.prototype.hasOwnProperty.call(wLabel, "labelpos")) {
      switch (wLabel.labelpos.toLowerCase()) {
        case "l":
          delta = wLabel.width / 2;
          break;
        case "r":
          delta = -wLabel.width / 2;
          break;
      }
    }
    if (delta) {
      sum += reverseSep ? delta : -delta;
    }
    delta = 0;
    return sum;
  };
}
function width(g, v) {
  return g.node(v).width;
}
function position(g) {
  g = asNonCompoundGraph(g);
  positionY(g);
  forOwn(positionX(g), function(x, v) {
    g.node(v).x = x;
  });
}
function positionY(g) {
  var layering = buildLayerMatrix(g);
  var rankSep = g.graph().ranksep;
  var prevY = 0;
  forEach(layering, function(layer) {
    var maxHeight = max(
      map(layer, function(v) {
        return g.node(v).height;
      })
    );
    forEach(layer, function(v) {
      g.node(v).y = prevY + maxHeight / 2;
    });
    prevY += maxHeight + rankSep;
  });
}
function layout(g, opts) {
  var time = notime;
  time("layout", () => {
    var layoutGraph = time("  buildLayoutGraph", () => buildLayoutGraph(g));
    time("  runLayout", () => runLayout(layoutGraph, time));
    time("  updateInputGraph", () => updateInputGraph(g, layoutGraph));
  });
}
function runLayout(g, time) {
  time("    makeSpaceForEdgeLabels", () => makeSpaceForEdgeLabels(g));
  time("    removeSelfEdges", () => removeSelfEdges(g));
  time("    acyclic", () => run$2(g));
  time("    nestingGraph.run", () => run(g));
  time("    rank", () => rank(asNonCompoundGraph(g)));
  time("    injectEdgeLabelProxies", () => injectEdgeLabelProxies(g));
  time("    removeEmptyRanks", () => removeEmptyRanks(g));
  time("    nestingGraph.cleanup", () => cleanup(g));
  time("    normalizeRanks", () => normalizeRanks(g));
  time("    assignRankMinMax", () => assignRankMinMax(g));
  time("    removeEdgeLabelProxies", () => removeEdgeLabelProxies(g));
  time("    normalize.run", () => run$1(g));
  time("    parentDummyChains", () => parentDummyChains(g));
  time("    addBorderSegments", () => addBorderSegments(g));
  time("    order", () => order(g));
  time("    insertSelfEdges", () => insertSelfEdges(g));
  time("    adjustCoordinateSystem", () => adjust(g));
  time("    position", () => position(g));
  time("    positionSelfEdges", () => positionSelfEdges(g));
  time("    removeBorderNodes", () => removeBorderNodes(g));
  time("    normalize.undo", () => undo(g));
  time("    fixupEdgeLabelCoords", () => fixupEdgeLabelCoords(g));
  time("    undoCoordinateSystem", () => undo$1(g));
  time("    translateGraph", () => translateGraph(g));
  time("    assignNodeIntersects", () => assignNodeIntersects(g));
  time("    reversePoints", () => reversePointsForReversedEdges(g));
  time("    acyclic.undo", () => undo$2(g));
}
function updateInputGraph(inputGraph, layoutGraph) {
  forEach(inputGraph.nodes(), function(v) {
    var inputLabel = inputGraph.node(v);
    var layoutLabel = layoutGraph.node(v);
    if (inputLabel) {
      inputLabel.x = layoutLabel.x;
      inputLabel.y = layoutLabel.y;
      if (layoutGraph.children(v).length) {
        inputLabel.width = layoutLabel.width;
        inputLabel.height = layoutLabel.height;
      }
    }
  });
  forEach(inputGraph.edges(), function(e) {
    var inputLabel = inputGraph.edge(e);
    var layoutLabel = layoutGraph.edge(e);
    inputLabel.points = layoutLabel.points;
    if (Object.prototype.hasOwnProperty.call(layoutLabel, "x")) {
      inputLabel.x = layoutLabel.x;
      inputLabel.y = layoutLabel.y;
    }
  });
  inputGraph.graph().width = layoutGraph.graph().width;
  inputGraph.graph().height = layoutGraph.graph().height;
}
var graphNumAttrs = ["nodesep", "edgesep", "ranksep", "marginx", "marginy"];
var graphDefaults = { ranksep: 50, edgesep: 20, nodesep: 50, rankdir: "tb" };
var graphAttrs = ["acyclicer", "ranker", "rankdir", "align"];
var nodeNumAttrs = ["width", "height"];
var nodeDefaults = { width: 0, height: 0 };
var edgeNumAttrs = ["minlen", "weight", "width", "height", "labeloffset"];
var edgeDefaults = {
  minlen: 1,
  weight: 1,
  width: 0,
  height: 0,
  labeloffset: 10,
  labelpos: "r"
};
var edgeAttrs = ["labelpos"];
function buildLayoutGraph(inputGraph) {
  var g = new Graph({ multigraph: true, compound: true });
  var graph = canonicalize(inputGraph.graph());
  g.setGraph(
    merge({}, graphDefaults, selectNumberAttrs(graph, graphNumAttrs), pick(graph, graphAttrs))
  );
  forEach(inputGraph.nodes(), function(v) {
    var node = canonicalize(inputGraph.node(v));
    g.setNode(v, defaults(selectNumberAttrs(node, nodeNumAttrs), nodeDefaults));
    g.setParent(v, inputGraph.parent(v));
  });
  forEach(inputGraph.edges(), function(e) {
    var edge = canonicalize(inputGraph.edge(e));
    g.setEdge(
      e,
      merge({}, edgeDefaults, selectNumberAttrs(edge, edgeNumAttrs), pick(edge, edgeAttrs))
    );
  });
  return g;
}
function makeSpaceForEdgeLabels(g) {
  var graph = g.graph();
  graph.ranksep /= 2;
  forEach(g.edges(), function(e) {
    var edge = g.edge(e);
    edge.minlen *= 2;
    if (edge.labelpos.toLowerCase() !== "c") {
      if (graph.rankdir === "TB" || graph.rankdir === "BT") {
        edge.width += edge.labeloffset;
      } else {
        edge.height += edge.labeloffset;
      }
    }
  });
}
function injectEdgeLabelProxies(g) {
  forEach(g.edges(), function(e) {
    var edge = g.edge(e);
    if (edge.width && edge.height) {
      var v = g.node(e.v);
      var w = g.node(e.w);
      var label = { rank: (w.rank - v.rank) / 2 + v.rank, e };
      addDummyNode(g, "edge-proxy", label, "_ep");
    }
  });
}
function assignRankMinMax(g) {
  var maxRank2 = 0;
  forEach(g.nodes(), function(v) {
    var node = g.node(v);
    if (node.borderTop) {
      node.minRank = g.node(node.borderTop).rank;
      node.maxRank = g.node(node.borderBottom).rank;
      maxRank2 = max(maxRank2, node.maxRank);
    }
  });
  g.graph().maxRank = maxRank2;
}
function removeEdgeLabelProxies(g) {
  forEach(g.nodes(), function(v) {
    var node = g.node(v);
    if (node.dummy === "edge-proxy") {
      g.edge(node.e).labelRank = node.rank;
      g.removeNode(v);
    }
  });
}
function translateGraph(g) {
  var minX = Number.POSITIVE_INFINITY;
  var maxX = 0;
  var minY = Number.POSITIVE_INFINITY;
  var maxY = 0;
  var graphLabel = g.graph();
  var marginX = graphLabel.marginx || 0;
  var marginY = graphLabel.marginy || 0;
  function getExtremes(attrs) {
    var x = attrs.x;
    var y = attrs.y;
    var w = attrs.width;
    var h = attrs.height;
    minX = Math.min(minX, x - w / 2);
    maxX = Math.max(maxX, x + w / 2);
    minY = Math.min(minY, y - h / 2);
    maxY = Math.max(maxY, y + h / 2);
  }
  forEach(g.nodes(), function(v) {
    getExtremes(g.node(v));
  });
  forEach(g.edges(), function(e) {
    var edge = g.edge(e);
    if (Object.prototype.hasOwnProperty.call(edge, "x")) {
      getExtremes(edge);
    }
  });
  minX -= marginX;
  minY -= marginY;
  forEach(g.nodes(), function(v) {
    var node = g.node(v);
    node.x -= minX;
    node.y -= minY;
  });
  forEach(g.edges(), function(e) {
    var edge = g.edge(e);
    forEach(edge.points, function(p) {
      p.x -= minX;
      p.y -= minY;
    });
    if (Object.prototype.hasOwnProperty.call(edge, "x")) {
      edge.x -= minX;
    }
    if (Object.prototype.hasOwnProperty.call(edge, "y")) {
      edge.y -= minY;
    }
  });
  graphLabel.width = maxX - minX + marginX;
  graphLabel.height = maxY - minY + marginY;
}
function assignNodeIntersects(g) {
  forEach(g.edges(), function(e) {
    var edge = g.edge(e);
    var nodeV = g.node(e.v);
    var nodeW = g.node(e.w);
    var p1, p2;
    if (!edge.points) {
      edge.points = [];
      p1 = nodeW;
      p2 = nodeV;
    } else {
      p1 = edge.points[0];
      p2 = edge.points[edge.points.length - 1];
    }
    edge.points.unshift(intersectRect(nodeV, p1));
    edge.points.push(intersectRect(nodeW, p2));
  });
}
function fixupEdgeLabelCoords(g) {
  forEach(g.edges(), function(e) {
    var edge = g.edge(e);
    if (Object.prototype.hasOwnProperty.call(edge, "x")) {
      if (edge.labelpos === "l" || edge.labelpos === "r") {
        edge.width -= edge.labeloffset;
      }
      switch (edge.labelpos) {
        case "l":
          edge.x -= edge.width / 2 + edge.labeloffset;
          break;
        case "r":
          edge.x += edge.width / 2 + edge.labeloffset;
          break;
      }
    }
  });
}
function reversePointsForReversedEdges(g) {
  forEach(g.edges(), function(e) {
    var edge = g.edge(e);
    if (edge.reversed) {
      edge.points.reverse();
    }
  });
}
function removeBorderNodes(g) {
  forEach(g.nodes(), function(v) {
    if (g.children(v).length) {
      var node = g.node(v);
      var t = g.node(node.borderTop);
      var b = g.node(node.borderBottom);
      var l = g.node(last(node.borderLeft));
      var r = g.node(last(node.borderRight));
      node.width = Math.abs(r.x - l.x);
      node.height = Math.abs(b.y - t.y);
      node.x = l.x + node.width / 2;
      node.y = t.y + node.height / 2;
    }
  });
  forEach(g.nodes(), function(v) {
    if (g.node(v).dummy === "border") {
      g.removeNode(v);
    }
  });
}
function removeSelfEdges(g) {
  forEach(g.edges(), function(e) {
    if (e.v === e.w) {
      var node = g.node(e.v);
      if (!node.selfEdges) {
        node.selfEdges = [];
      }
      node.selfEdges.push({ e, label: g.edge(e) });
      g.removeEdge(e);
    }
  });
}
function insertSelfEdges(g) {
  var layers = buildLayerMatrix(g);
  forEach(layers, function(layer) {
    var orderShift = 0;
    forEach(layer, function(v, i) {
      var node = g.node(v);
      node.order = i + orderShift;
      forEach(node.selfEdges, function(selfEdge) {
        addDummyNode(
          g,
          "selfedge",
          {
            width: selfEdge.label.width,
            height: selfEdge.label.height,
            rank: node.rank,
            order: i + ++orderShift,
            e: selfEdge.e,
            label: selfEdge.label
          },
          "_se"
        );
      });
      delete node.selfEdges;
    });
  });
}
function positionSelfEdges(g) {
  forEach(g.nodes(), function(v) {
    var node = g.node(v);
    if (node.dummy === "selfedge") {
      var selfNode = g.node(node.e.v);
      var x = selfNode.x + selfNode.width / 2;
      var y = selfNode.y;
      var dx = node.x - x;
      var dy = selfNode.height / 2;
      g.setEdge(node.e, node.label);
      g.removeNode(v);
      node.label.points = [
        { x: x + 2 * dx / 3, y: y - dy },
        { x: x + 5 * dx / 6, y: y - dy },
        { x: x + dx, y },
        { x: x + 5 * dx / 6, y: y + dy },
        { x: x + 2 * dx / 3, y: y + dy }
      ];
      node.label.x = node.x;
      node.label.y = node.y;
    }
  });
}
function selectNumberAttrs(obj, attrs) {
  return mapValues(pick(obj, attrs), Number);
}
function canonicalize(attrs) {
  var newAttrs = {};
  forEach(attrs, function(v, k) {
    newAttrs[k.toLowerCase()] = v;
  });
  return newAttrs;
}
export {
  layout as l
};
//# sourceMappingURL=layout-ByP6meHf.chunk.mjs.map
