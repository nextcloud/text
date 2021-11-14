(window["textWebpackJsonp"] = window["textWebpackJsonp"] || []).push([["vendors~editor~files-modal"],{

/***/ "./node_modules/@babel/runtime/helpers/classCallCheck.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/classCallCheck.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

module.exports = _classCallCheck;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/createClass.js":
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/createClass.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

module.exports = _createClass;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/defineProperty.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/defineProperty.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

module.exports = _defineProperty;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/typeof.js":
/*!*******************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/typeof.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

module.exports = _typeof;

/***/ }),

/***/ "./node_modules/@nextcloud/l10n/dist/index.js":
/*!****************************************************!*\
  !*** ./node_modules/@nextcloud/l10n/dist/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(/*! core-js/modules/es.regexp.exec.js */ "./node_modules/core-js/modules/es.regexp.exec.js");

__webpack_require__(/*! core-js/modules/es.string.replace.js */ "./node_modules/core-js/modules/es.string.replace.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLocale = getLocale;
exports.getCanonicalLocale = getCanonicalLocale;
exports.getLanguage = getLanguage;
exports.translate = translate;
exports.translatePlural = translatePlural;
exports.getFirstDay = getFirstDay;
exports.getDayNames = getDayNames;
exports.getDayNamesShort = getDayNamesShort;
exports.getDayNamesMin = getDayNamesMin;
exports.getMonthNames = getMonthNames;
exports.getMonthNamesShort = getMonthNamesShort; /// <reference types="@nextcloud/typings" />

/**
 * Returns the user's locale
 */

function getLocale() {
  if (typeof OC === 'undefined') {
    console.warn('No OC found');
    return 'en';
  }

  return OC.getLocale();
}

function getCanonicalLocale() {
  return getLocale().replace(/_/g, '-');
}
/**
 * Returns the user's language
 */


function getLanguage() {
  if (typeof OC === 'undefined') {
    console.warn('No OC found');
    return 'en';
  }

  return OC.getLanguage();
}
/**
 * Translate a string
 *
 * @param {string} app the id of the app for which to translate the string
 * @param {string} text the string to translate
 * @param {object} vars map of placeholder key to value
 * @param {number} number to replace %n with
 * @param {object} [options] options object
 * @return {string}
 */


function translate(app, text, vars, count, options) {
  if (typeof OC === 'undefined') {
    console.warn('No OC found');
    return text;
  }

  return OC.L10N.translate(app, text, vars, count, options);
}
/**
 * Translate a plural string
 *
 * @param {string} app the id of the app for which to translate the string
 * @param {string} textSingular the string to translate for exactly one object
 * @param {string} textPlural the string to translate for n objects
 * @param {number} count number to determine whether to use singular or plural
 * @param {Object} vars of placeholder key to value
 * @param {object} options options object
 * @return {string}
 */


function translatePlural(app, textSingular, textPlural, count, vars, options) {
  if (typeof OC === 'undefined') {
    console.warn('No OC found');
    return textSingular;
  }

  return OC.L10N.translatePlural(app, textSingular, textPlural, count, vars, options);
}
/**
 * Get the first day of the week
 *
 * @return {number}
 */


function getFirstDay() {
  if (typeof window.firstDay === 'undefined') {
    console.warn('No firstDay found');
    return 1;
  }

  return window.firstDay;
}
/**
 * Get a list of day names (full names)
 *
 * @return {string[]}
 */


function getDayNames() {
  if (typeof window.dayNames === 'undefined') {
    console.warn('No dayNames found');
    return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  }

  return window.dayNames;
}
/**
 * Get a list of day names (short names)
 *
 * @return {string[]}
 */


function getDayNamesShort() {
  if (typeof window.dayNamesShort === 'undefined') {
    console.warn('No dayNamesShort found');
    return ['Sun.', 'Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.'];
  }

  return window.dayNamesShort;
}
/**
 * Get a list of day names (minified names)
 *
 * @return {string[]}
 */


function getDayNamesMin() {
  if (typeof window.dayNamesMin === 'undefined') {
    console.warn('No dayNamesMin found');
    return ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  }

  return window.dayNamesMin;
}
/**
 * Get a list of month names (full names)
 *
 * @return {string[]}
 */


function getMonthNames() {
  if (typeof window.monthNames === 'undefined') {
    console.warn('No monthNames found');
    return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  }

  return window.monthNames;
}
/**
 * Get a list of month names (short names)
 *
 * @return {string[]}
 */


function getMonthNamesShort() {
  if (typeof window.monthNamesShort === 'undefined') {
    console.warn('No monthNamesShort found');
    return ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May.', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'];
  }

  return window.monthNamesShort;
}

/***/ }),

/***/ "./node_modules/lodash.get/index.js":
/*!******************************************!*\
  !*** ./node_modules/lodash.get/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';
/** Used to stand-in for `undefined` hash values. */

var HASH_UNDEFINED = '__lodash_hash_undefined__';
/** Used as references for various `Number` constants. */

var INFINITY = 1 / 0;
/** `Object#toString` result references. */

var funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    symbolTag = '[object Symbol]';
/** Used to match property names within property paths. */

var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    reIsPlainProp = /^\w*$/,
    reLeadingDot = /^\./,
    rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */

var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
/** Used to match backslashes in property paths. */

var reEscapeChar = /\\(\\)?/g;
/** Used to detect host constructors (Safari). */

var reIsHostCtor = /^\[object .+?Constructor\]$/;
/** Detect free variable `global` from Node.js. */

var freeGlobal = (typeof global === "undefined" ? "undefined" : _typeof(global)) == 'object' && global && global.Object === Object && global;
/** Detect free variable `self`. */

var freeSelf = (typeof self === "undefined" ? "undefined" : _typeof(self)) == 'object' && self && self.Object === Object && self;
/** Used as a reference to the global object. */

var root = freeGlobal || freeSelf || Function('return this')();
/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */

function getValue(object, key) {
  return object == null ? undefined : object[key];
}
/**
 * Checks if `value` is a host object in IE < 9.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
 */


function isHostObject(value) {
  // Many host objects are `Object` objects that can coerce to strings
  // despite having improperly defined `toString` methods.
  var result = false;

  if (value != null && typeof value.toString != 'function') {
    try {
      result = !!(value + '');
    } catch (e) {}
  }

  return result;
}
/** Used for built-in method references. */


var arrayProto = Array.prototype,
    funcProto = Function.prototype,
    objectProto = Object.prototype;
/** Used to detect overreaching core-js shims. */

var coreJsData = root['__core-js_shared__'];
/** Used to detect methods masquerading as native. */

var maskSrcKey = function () {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? 'Symbol(src)_1.' + uid : '';
}();
/** Used to resolve the decompiled source of functions. */


var funcToString = funcProto.toString;
/** Used to check objects for own properties. */

var hasOwnProperty = objectProto.hasOwnProperty;
/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */

var objectToString = objectProto.toString;
/** Used to detect if a method is native. */

var reIsNative = RegExp('^' + funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');
/** Built-in value references. */

var _Symbol = root.Symbol,
    splice = arrayProto.splice;
/* Built-in method references that are verified to be native. */

var Map = getNative(root, 'Map'),
    nativeCreate = getNative(Object, 'create');
/** Used to convert symbols to primitives and strings. */

var symbolProto = _Symbol ? _Symbol.prototype : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;
/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */

function Hash(entries) {
  var index = -1,
      length = entries ? entries.length : 0;
  this.clear();

  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */


function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
}
/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */


function hashDelete(key) {
  return this.has(key) && delete this.__data__[key];
}
/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */


function hashGet(key) {
  var data = this.__data__;

  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }

  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}
/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */


function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
}
/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */


function hashSet(key, value) {
  var data = this.__data__;
  data[key] = nativeCreate && value === undefined ? HASH_UNDEFINED : value;
  return this;
} // Add methods to `Hash`.


Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;
/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */

function ListCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;
  this.clear();

  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */


function listCacheClear() {
  this.__data__ = [];
}
/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */


function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }

  var lastIndex = data.length - 1;

  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }

  return true;
}
/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */


function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);
  return index < 0 ? undefined : data[index][1];
}
/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */


function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}
/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */


function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }

  return this;
} // Add methods to `ListCache`.


ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;
/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */

function MapCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;
  this.clear();

  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */


function mapCacheClear() {
  this.__data__ = {
    'hash': new Hash(),
    'map': new (Map || ListCache)(),
    'string': new Hash()
  };
}
/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */


function mapCacheDelete(key) {
  return getMapData(this, key)['delete'](key);
}
/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */


function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}
/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */


function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}
/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */


function mapCacheSet(key, value) {
  getMapData(this, key).set(key, value);
  return this;
} // Add methods to `MapCache`.


MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;
/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */

function assocIndexOf(array, key) {
  var length = array.length;

  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }

  return -1;
}
/**
 * The base implementation of `_.get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */


function baseGet(object, path) {
  path = isKey(path, object) ? [path] : castPath(path);
  var index = 0,
      length = path.length;

  while (object != null && index < length) {
    object = object[toKey(path[index++])];
  }

  return index && index == length ? object : undefined;
}
/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */


function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }

  var pattern = isFunction(value) || isHostObject(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}
/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */


function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }

  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }

  var result = value + '';
  return result == '0' && 1 / value == -INFINITY ? '-0' : result;
}
/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {Array} Returns the cast property path array.
 */


function castPath(value) {
  return isArray(value) ? value : stringToPath(value);
}
/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */


function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key) ? data[typeof key == 'string' ? 'string' : 'hash'] : data.map;
}
/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */


function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}
/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */


function isKey(value, object) {
  if (isArray(value)) {
    return false;
  }

  var type = _typeof(value);

  if (type == 'number' || type == 'symbol' || type == 'boolean' || value == null || isSymbol(value)) {
    return true;
  }

  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
}
/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */


function isKeyable(value) {
  var type = _typeof(value);

  return type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean' ? value !== '__proto__' : value === null;
}
/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */


function isMasked(func) {
  return !!maskSrcKey && maskSrcKey in func;
}
/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */


var stringToPath = memoize(function (string) {
  string = toString(string);
  var result = [];

  if (reLeadingDot.test(string)) {
    result.push('');
  }

  string.replace(rePropName, function (match, number, quote, string) {
    result.push(quote ? string.replace(reEscapeChar, '$1') : number || match);
  });
  return result;
});
/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */

function toKey(value) {
  if (typeof value == 'string' || isSymbol(value)) {
    return value;
  }

  var result = value + '';
  return result == '0' && 1 / value == -INFINITY ? '-0' : result;
}
/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to process.
 * @returns {string} Returns the source code.
 */


function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}

    try {
      return func + '';
    } catch (e) {}
  }

  return '';
}
/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */


function memoize(func, resolver) {
  if (typeof func != 'function' || resolver && typeof resolver != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }

  var memoized = function memoized() {
    var args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }

    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result);
    return result;
  };

  memoized.cache = new (memoize.Cache || MapCache)();
  return memoized;
} // Assign cache to `_.memoize`.


memoize.Cache = MapCache;
/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */

function eq(value, other) {
  return value === other || value !== value && other !== other;
}
/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */


var isArray = Array.isArray;
/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */

function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}
/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */


function isObject(value) {
  var type = _typeof(value);

  return !!value && (type == 'object' || type == 'function');
}
/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */


function isObjectLike(value) {
  return !!value && _typeof(value) == 'object';
}
/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */


function isSymbol(value) {
  return _typeof(value) == 'symbol' || isObjectLike(value) && objectToString.call(value) == symbolTag;
}
/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */


function toString(value) {
  return value == null ? '' : baseToString(value);
}
/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.get(object, 'a[0].b.c');
 * // => 3
 *
 * _.get(object, ['a', '0', 'b', 'c']);
 * // => 3
 *
 * _.get(object, 'a.b.c', 'default');
 * // => 'default'
 */


function get(object, path, defaultValue) {
  var result = object == null ? undefined : baseGet(object, path);
  return result === undefined ? defaultValue : result;
}

module.exports = get;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/lodash/_DataView.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_DataView.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var getNative = __webpack_require__(/*! ./_getNative */ "./node_modules/lodash/_getNative.js"),
    root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js");
/* Built-in method references that are verified to be native. */


var DataView = getNative(root, 'DataView');
module.exports = DataView;

/***/ }),

/***/ "./node_modules/lodash/_Hash.js":
/*!**************************************!*\
  !*** ./node_modules/lodash/_Hash.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var hashClear = __webpack_require__(/*! ./_hashClear */ "./node_modules/lodash/_hashClear.js"),
    hashDelete = __webpack_require__(/*! ./_hashDelete */ "./node_modules/lodash/_hashDelete.js"),
    hashGet = __webpack_require__(/*! ./_hashGet */ "./node_modules/lodash/_hashGet.js"),
    hashHas = __webpack_require__(/*! ./_hashHas */ "./node_modules/lodash/_hashHas.js"),
    hashSet = __webpack_require__(/*! ./_hashSet */ "./node_modules/lodash/_hashSet.js");
/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */


function Hash(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;
  this.clear();

  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
} // Add methods to `Hash`.


Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;
module.exports = Hash;

/***/ }),

/***/ "./node_modules/lodash/_ListCache.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_ListCache.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var listCacheClear = __webpack_require__(/*! ./_listCacheClear */ "./node_modules/lodash/_listCacheClear.js"),
    listCacheDelete = __webpack_require__(/*! ./_listCacheDelete */ "./node_modules/lodash/_listCacheDelete.js"),
    listCacheGet = __webpack_require__(/*! ./_listCacheGet */ "./node_modules/lodash/_listCacheGet.js"),
    listCacheHas = __webpack_require__(/*! ./_listCacheHas */ "./node_modules/lodash/_listCacheHas.js"),
    listCacheSet = __webpack_require__(/*! ./_listCacheSet */ "./node_modules/lodash/_listCacheSet.js");
/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */


function ListCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;
  this.clear();

  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
} // Add methods to `ListCache`.


ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;
module.exports = ListCache;

/***/ }),

/***/ "./node_modules/lodash/_Map.js":
/*!*************************************!*\
  !*** ./node_modules/lodash/_Map.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var getNative = __webpack_require__(/*! ./_getNative */ "./node_modules/lodash/_getNative.js"),
    root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js");
/* Built-in method references that are verified to be native. */


var Map = getNative(root, 'Map');
module.exports = Map;

/***/ }),

/***/ "./node_modules/lodash/_MapCache.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_MapCache.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var mapCacheClear = __webpack_require__(/*! ./_mapCacheClear */ "./node_modules/lodash/_mapCacheClear.js"),
    mapCacheDelete = __webpack_require__(/*! ./_mapCacheDelete */ "./node_modules/lodash/_mapCacheDelete.js"),
    mapCacheGet = __webpack_require__(/*! ./_mapCacheGet */ "./node_modules/lodash/_mapCacheGet.js"),
    mapCacheHas = __webpack_require__(/*! ./_mapCacheHas */ "./node_modules/lodash/_mapCacheHas.js"),
    mapCacheSet = __webpack_require__(/*! ./_mapCacheSet */ "./node_modules/lodash/_mapCacheSet.js");
/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */


function MapCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;
  this.clear();

  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
} // Add methods to `MapCache`.


MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;
module.exports = MapCache;

/***/ }),

/***/ "./node_modules/lodash/_Promise.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_Promise.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var getNative = __webpack_require__(/*! ./_getNative */ "./node_modules/lodash/_getNative.js"),
    root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js");
/* Built-in method references that are verified to be native. */


var Promise = getNative(root, 'Promise');
module.exports = Promise;

/***/ }),

/***/ "./node_modules/lodash/_Set.js":
/*!*************************************!*\
  !*** ./node_modules/lodash/_Set.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var getNative = __webpack_require__(/*! ./_getNative */ "./node_modules/lodash/_getNative.js"),
    root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js");
/* Built-in method references that are verified to be native. */


var Set = getNative(root, 'Set');
module.exports = Set;

/***/ }),

/***/ "./node_modules/lodash/_SetCache.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_SetCache.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var MapCache = __webpack_require__(/*! ./_MapCache */ "./node_modules/lodash/_MapCache.js"),
    setCacheAdd = __webpack_require__(/*! ./_setCacheAdd */ "./node_modules/lodash/_setCacheAdd.js"),
    setCacheHas = __webpack_require__(/*! ./_setCacheHas */ "./node_modules/lodash/_setCacheHas.js");
/**
 *
 * Creates an array cache object to store unique values.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */


function SetCache(values) {
  var index = -1,
      length = values == null ? 0 : values.length;
  this.__data__ = new MapCache();

  while (++index < length) {
    this.add(values[index]);
  }
} // Add methods to `SetCache`.


SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
SetCache.prototype.has = setCacheHas;
module.exports = SetCache;

/***/ }),

/***/ "./node_modules/lodash/_Stack.js":
/*!***************************************!*\
  !*** ./node_modules/lodash/_Stack.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ListCache = __webpack_require__(/*! ./_ListCache */ "./node_modules/lodash/_ListCache.js"),
    stackClear = __webpack_require__(/*! ./_stackClear */ "./node_modules/lodash/_stackClear.js"),
    stackDelete = __webpack_require__(/*! ./_stackDelete */ "./node_modules/lodash/_stackDelete.js"),
    stackGet = __webpack_require__(/*! ./_stackGet */ "./node_modules/lodash/_stackGet.js"),
    stackHas = __webpack_require__(/*! ./_stackHas */ "./node_modules/lodash/_stackHas.js"),
    stackSet = __webpack_require__(/*! ./_stackSet */ "./node_modules/lodash/_stackSet.js");
/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */


function Stack(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
} // Add methods to `Stack`.


Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;
module.exports = Stack;

/***/ }),

/***/ "./node_modules/lodash/_Symbol.js":
/*!****************************************!*\
  !*** ./node_modules/lodash/_Symbol.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js");
/** Built-in value references. */


var _Symbol = root.Symbol;
module.exports = _Symbol;

/***/ }),

/***/ "./node_modules/lodash/_Uint8Array.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_Uint8Array.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js");
/** Built-in value references. */


var Uint8Array = root.Uint8Array;
module.exports = Uint8Array;

/***/ }),

/***/ "./node_modules/lodash/_WeakMap.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_WeakMap.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var getNative = __webpack_require__(/*! ./_getNative */ "./node_modules/lodash/_getNative.js"),
    root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js");
/* Built-in method references that are verified to be native. */


var WeakMap = getNative(root, 'WeakMap');
module.exports = WeakMap;

/***/ }),

/***/ "./node_modules/lodash/_apply.js":
/*!***************************************!*\
  !*** ./node_modules/lodash/_apply.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0:
      return func.call(thisArg);

    case 1:
      return func.call(thisArg, args[0]);

    case 2:
      return func.call(thisArg, args[0], args[1]);

    case 3:
      return func.call(thisArg, args[0], args[1], args[2]);
  }

  return func.apply(thisArg, args);
}

module.exports = apply;

/***/ }),

/***/ "./node_modules/lodash/_arrayFilter.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_arrayFilter.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A specialized version of `_.filter` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */
function arrayFilter(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length,
      resIndex = 0,
      result = [];

  while (++index < length) {
    var value = array[index];

    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }

  return result;
}

module.exports = arrayFilter;

/***/ }),

/***/ "./node_modules/lodash/_arrayLikeKeys.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash/_arrayLikeKeys.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var baseTimes = __webpack_require__(/*! ./_baseTimes */ "./node_modules/lodash/_baseTimes.js"),
    isArguments = __webpack_require__(/*! ./isArguments */ "./node_modules/lodash/isArguments.js"),
    isArray = __webpack_require__(/*! ./isArray */ "./node_modules/lodash/isArray.js"),
    isBuffer = __webpack_require__(/*! ./isBuffer */ "./node_modules/lodash/isBuffer.js"),
    isIndex = __webpack_require__(/*! ./_isIndex */ "./node_modules/lodash/_isIndex.js"),
    isTypedArray = __webpack_require__(/*! ./isTypedArray */ "./node_modules/lodash/isTypedArray.js");
/** Used for built-in method references. */


var objectProto = Object.prototype;
/** Used to check objects for own properties. */

var hasOwnProperty = objectProto.hasOwnProperty;
/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */

function arrayLikeKeys(value, inherited) {
  var isArr = isArray(value),
      isArg = !isArr && isArguments(value),
      isBuff = !isArr && !isArg && isBuffer(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && ( // Safari 9 has enumerable `arguments.length` in strict mode.
    key == 'length' || isBuff && (key == 'offset' || key == 'parent') || isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset') || // Skip index properties.
    isIndex(key, length)))) {
      result.push(key);
    }
  }

  return result;
}

module.exports = arrayLikeKeys;

/***/ }),

/***/ "./node_modules/lodash/_arrayPush.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_arrayPush.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }

  return array;
}

module.exports = arrayPush;

/***/ }),

/***/ "./node_modules/lodash/_arraySome.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_arraySome.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A specialized version of `_.some` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */
function arraySome(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }

  return false;
}

module.exports = arraySome;

/***/ }),

/***/ "./node_modules/lodash/_assignMergeValue.js":
/*!**************************************************!*\
  !*** ./node_modules/lodash/_assignMergeValue.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var baseAssignValue = __webpack_require__(/*! ./_baseAssignValue */ "./node_modules/lodash/_baseAssignValue.js"),
    eq = __webpack_require__(/*! ./eq */ "./node_modules/lodash/eq.js");
/**
 * This function is like `assignValue` except that it doesn't assign
 * `undefined` values.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */


function assignMergeValue(object, key, value) {
  if (value !== undefined && !eq(object[key], value) || value === undefined && !(key in object)) {
    baseAssignValue(object, key, value);
  }
}

module.exports = assignMergeValue;

/***/ }),

/***/ "./node_modules/lodash/_assignValue.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_assignValue.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var baseAssignValue = __webpack_require__(/*! ./_baseAssignValue */ "./node_modules/lodash/_baseAssignValue.js"),
    eq = __webpack_require__(/*! ./eq */ "./node_modules/lodash/eq.js");
/** Used for built-in method references. */


var objectProto = Object.prototype;
/** Used to check objects for own properties. */

var hasOwnProperty = objectProto.hasOwnProperty;
/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */

function assignValue(object, key, value) {
  var objValue = object[key];

  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) || value === undefined && !(key in object)) {
    baseAssignValue(object, key, value);
  }
}

module.exports = assignValue;

/***/ }),

/***/ "./node_modules/lodash/_assocIndexOf.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_assocIndexOf.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var eq = __webpack_require__(/*! ./eq */ "./node_modules/lodash/eq.js");
/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */


function assocIndexOf(array, key) {
  var length = array.length;

  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }

  return -1;
}

module.exports = assocIndexOf;

/***/ }),

/***/ "./node_modules/lodash/_baseAssignValue.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash/_baseAssignValue.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defineProperty = __webpack_require__(/*! ./_defineProperty */ "./node_modules/lodash/_defineProperty.js");
/**
 * The base implementation of `assignValue` and `assignMergeValue` without
 * value checks.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */


function baseAssignValue(object, key, value) {
  if (key == '__proto__' && defineProperty) {
    defineProperty(object, key, {
      'configurable': true,
      'enumerable': true,
      'value': value,
      'writable': true
    });
  } else {
    object[key] = value;
  }
}

module.exports = baseAssignValue;

/***/ }),

/***/ "./node_modules/lodash/_baseCreate.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_baseCreate.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isObject = __webpack_require__(/*! ./isObject */ "./node_modules/lodash/isObject.js");
/** Built-in value references. */


var objectCreate = Object.create;
/**
 * The base implementation of `_.create` without support for assigning
 * properties to the created object.
 *
 * @private
 * @param {Object} proto The object to inherit from.
 * @returns {Object} Returns the new object.
 */

var baseCreate = function () {
  function object() {}

  return function (proto) {
    if (!isObject(proto)) {
      return {};
    }

    if (objectCreate) {
      return objectCreate(proto);
    }

    object.prototype = proto;
    var result = new object();
    object.prototype = undefined;
    return result;
  };
}();

module.exports = baseCreate;

/***/ }),

/***/ "./node_modules/lodash/_baseFor.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_baseFor.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createBaseFor = __webpack_require__(/*! ./_createBaseFor */ "./node_modules/lodash/_createBaseFor.js");
/**
 * The base implementation of `baseForOwn` which iterates over `object`
 * properties returned by `keysFunc` and invokes `iteratee` for each property.
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @returns {Object} Returns `object`.
 */


var baseFor = createBaseFor();
module.exports = baseFor;

/***/ }),

/***/ "./node_modules/lodash/_baseGetAllKeys.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_baseGetAllKeys.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var arrayPush = __webpack_require__(/*! ./_arrayPush */ "./node_modules/lodash/_arrayPush.js"),
    isArray = __webpack_require__(/*! ./isArray */ "./node_modules/lodash/isArray.js");
/**
 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @param {Function} symbolsFunc The function to get the symbols of `object`.
 * @returns {Array} Returns the array of property names and symbols.
 */


function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
}

module.exports = baseGetAllKeys;

/***/ }),

/***/ "./node_modules/lodash/_baseGetTag.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_baseGetTag.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Symbol = __webpack_require__(/*! ./_Symbol */ "./node_modules/lodash/_Symbol.js"),
    getRawTag = __webpack_require__(/*! ./_getRawTag */ "./node_modules/lodash/_getRawTag.js"),
    objectToString = __webpack_require__(/*! ./_objectToString */ "./node_modules/lodash/_objectToString.js");
/** `Object#toString` result references. */


var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';
/** Built-in value references. */

var symToStringTag = _Symbol ? _Symbol.toStringTag : undefined;
/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */

function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }

  return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
}

module.exports = baseGetTag;

/***/ }),

/***/ "./node_modules/lodash/_baseIsArguments.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash/_baseIsArguments.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ "./node_modules/lodash/_baseGetTag.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "./node_modules/lodash/isObjectLike.js");
/** `Object#toString` result references. */


var argsTag = '[object Arguments]';
/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */

function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag;
}

module.exports = baseIsArguments;

/***/ }),

/***/ "./node_modules/lodash/_baseIsEqual.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_baseIsEqual.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var baseIsEqualDeep = __webpack_require__(/*! ./_baseIsEqualDeep */ "./node_modules/lodash/_baseIsEqualDeep.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "./node_modules/lodash/isObjectLike.js");
/**
 * The base implementation of `_.isEqual` which supports partial comparisons
 * and tracks traversed objects.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Unordered comparison
 *  2 - Partial comparison
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */


function baseIsEqual(value, other, bitmask, customizer, stack) {
  if (value === other) {
    return true;
  }

  if (value == null || other == null || !isObjectLike(value) && !isObjectLike(other)) {
    return value !== value && other !== other;
  }

  return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
}

module.exports = baseIsEqual;

/***/ }),

/***/ "./node_modules/lodash/_baseIsEqualDeep.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash/_baseIsEqualDeep.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Stack = __webpack_require__(/*! ./_Stack */ "./node_modules/lodash/_Stack.js"),
    equalArrays = __webpack_require__(/*! ./_equalArrays */ "./node_modules/lodash/_equalArrays.js"),
    equalByTag = __webpack_require__(/*! ./_equalByTag */ "./node_modules/lodash/_equalByTag.js"),
    equalObjects = __webpack_require__(/*! ./_equalObjects */ "./node_modules/lodash/_equalObjects.js"),
    getTag = __webpack_require__(/*! ./_getTag */ "./node_modules/lodash/_getTag.js"),
    isArray = __webpack_require__(/*! ./isArray */ "./node_modules/lodash/isArray.js"),
    isBuffer = __webpack_require__(/*! ./isBuffer */ "./node_modules/lodash/isBuffer.js"),
    isTypedArray = __webpack_require__(/*! ./isTypedArray */ "./node_modules/lodash/isTypedArray.js");
/** Used to compose bitmasks for value comparisons. */


var COMPARE_PARTIAL_FLAG = 1;
/** `Object#toString` result references. */

var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    objectTag = '[object Object]';
/** Used for built-in method references. */

var objectProto = Object.prototype;
/** Used to check objects for own properties. */

var hasOwnProperty = objectProto.hasOwnProperty;
/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */

function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
  var objIsArr = isArray(object),
      othIsArr = isArray(other),
      objTag = objIsArr ? arrayTag : getTag(object),
      othTag = othIsArr ? arrayTag : getTag(other);
  objTag = objTag == argsTag ? objectTag : objTag;
  othTag = othTag == argsTag ? objectTag : othTag;
  var objIsObj = objTag == objectTag,
      othIsObj = othTag == objectTag,
      isSameTag = objTag == othTag;

  if (isSameTag && isBuffer(object)) {
    if (!isBuffer(other)) {
      return false;
    }

    objIsArr = true;
    objIsObj = false;
  }

  if (isSameTag && !objIsObj) {
    stack || (stack = new Stack());
    return objIsArr || isTypedArray(object) ? equalArrays(object, other, bitmask, customizer, equalFunc, stack) : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
  }

  if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object,
          othUnwrapped = othIsWrapped ? other.value() : other;
      stack || (stack = new Stack());
      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
    }
  }

  if (!isSameTag) {
    return false;
  }

  stack || (stack = new Stack());
  return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
}

module.exports = baseIsEqualDeep;

/***/ }),

/***/ "./node_modules/lodash/_baseIsNative.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_baseIsNative.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isFunction = __webpack_require__(/*! ./isFunction */ "./node_modules/lodash/isFunction.js"),
    isMasked = __webpack_require__(/*! ./_isMasked */ "./node_modules/lodash/_isMasked.js"),
    isObject = __webpack_require__(/*! ./isObject */ "./node_modules/lodash/isObject.js"),
    toSource = __webpack_require__(/*! ./_toSource */ "./node_modules/lodash/_toSource.js");
/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */


var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
/** Used to detect host constructors (Safari). */

var reIsHostCtor = /^\[object .+?Constructor\]$/;
/** Used for built-in method references. */

var funcProto = Function.prototype,
    objectProto = Object.prototype;
/** Used to resolve the decompiled source of functions. */

var funcToString = funcProto.toString;
/** Used to check objects for own properties. */

var hasOwnProperty = objectProto.hasOwnProperty;
/** Used to detect if a method is native. */

var reIsNative = RegExp('^' + funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');
/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */

function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }

  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

module.exports = baseIsNative;

/***/ }),

/***/ "./node_modules/lodash/_baseIsTypedArray.js":
/*!**************************************************!*\
  !*** ./node_modules/lodash/_baseIsTypedArray.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ "./node_modules/lodash/_baseGetTag.js"),
    isLength = __webpack_require__(/*! ./isLength */ "./node_modules/lodash/isLength.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "./node_modules/lodash/isObjectLike.js");
/** `Object#toString` result references. */


var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    weakMapTag = '[object WeakMap]';
var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';
/** Used to identify `toStringTag` values of typed arrays. */

var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */

function baseIsTypedArray(value) {
  return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}

module.exports = baseIsTypedArray;

/***/ }),

/***/ "./node_modules/lodash/_baseKeys.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_baseKeys.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isPrototype = __webpack_require__(/*! ./_isPrototype */ "./node_modules/lodash/_isPrototype.js"),
    nativeKeys = __webpack_require__(/*! ./_nativeKeys */ "./node_modules/lodash/_nativeKeys.js");
/** Used for built-in method references. */


var objectProto = Object.prototype;
/** Used to check objects for own properties. */

var hasOwnProperty = objectProto.hasOwnProperty;
/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */

function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }

  var result = [];

  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }

  return result;
}

module.exports = baseKeys;

/***/ }),

/***/ "./node_modules/lodash/_baseKeysIn.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_baseKeysIn.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isObject = __webpack_require__(/*! ./isObject */ "./node_modules/lodash/isObject.js"),
    isPrototype = __webpack_require__(/*! ./_isPrototype */ "./node_modules/lodash/_isPrototype.js"),
    nativeKeysIn = __webpack_require__(/*! ./_nativeKeysIn */ "./node_modules/lodash/_nativeKeysIn.js");
/** Used for built-in method references. */


var objectProto = Object.prototype;
/** Used to check objects for own properties. */

var hasOwnProperty = objectProto.hasOwnProperty;
/**
 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */

function baseKeysIn(object) {
  if (!isObject(object)) {
    return nativeKeysIn(object);
  }

  var isProto = isPrototype(object),
      result = [];

  for (var key in object) {
    if (!(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
      result.push(key);
    }
  }

  return result;
}

module.exports = baseKeysIn;

/***/ }),

/***/ "./node_modules/lodash/_baseMerge.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_baseMerge.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Stack = __webpack_require__(/*! ./_Stack */ "./node_modules/lodash/_Stack.js"),
    assignMergeValue = __webpack_require__(/*! ./_assignMergeValue */ "./node_modules/lodash/_assignMergeValue.js"),
    baseFor = __webpack_require__(/*! ./_baseFor */ "./node_modules/lodash/_baseFor.js"),
    baseMergeDeep = __webpack_require__(/*! ./_baseMergeDeep */ "./node_modules/lodash/_baseMergeDeep.js"),
    isObject = __webpack_require__(/*! ./isObject */ "./node_modules/lodash/isObject.js"),
    keysIn = __webpack_require__(/*! ./keysIn */ "./node_modules/lodash/keysIn.js"),
    safeGet = __webpack_require__(/*! ./_safeGet */ "./node_modules/lodash/_safeGet.js");
/**
 * The base implementation of `_.merge` without support for multiple sources.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {number} srcIndex The index of `source`.
 * @param {Function} [customizer] The function to customize merged values.
 * @param {Object} [stack] Tracks traversed source values and their merged
 *  counterparts.
 */


function baseMerge(object, source, srcIndex, customizer, stack) {
  if (object === source) {
    return;
  }

  baseFor(source, function (srcValue, key) {
    stack || (stack = new Stack());

    if (isObject(srcValue)) {
      baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
    } else {
      var newValue = customizer ? customizer(safeGet(object, key), srcValue, key + '', object, source, stack) : undefined;

      if (newValue === undefined) {
        newValue = srcValue;
      }

      assignMergeValue(object, key, newValue);
    }
  }, keysIn);
}

module.exports = baseMerge;

/***/ }),

/***/ "./node_modules/lodash/_baseMergeDeep.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash/_baseMergeDeep.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var assignMergeValue = __webpack_require__(/*! ./_assignMergeValue */ "./node_modules/lodash/_assignMergeValue.js"),
    cloneBuffer = __webpack_require__(/*! ./_cloneBuffer */ "./node_modules/lodash/_cloneBuffer.js"),
    cloneTypedArray = __webpack_require__(/*! ./_cloneTypedArray */ "./node_modules/lodash/_cloneTypedArray.js"),
    copyArray = __webpack_require__(/*! ./_copyArray */ "./node_modules/lodash/_copyArray.js"),
    initCloneObject = __webpack_require__(/*! ./_initCloneObject */ "./node_modules/lodash/_initCloneObject.js"),
    isArguments = __webpack_require__(/*! ./isArguments */ "./node_modules/lodash/isArguments.js"),
    isArray = __webpack_require__(/*! ./isArray */ "./node_modules/lodash/isArray.js"),
    isArrayLikeObject = __webpack_require__(/*! ./isArrayLikeObject */ "./node_modules/lodash/isArrayLikeObject.js"),
    isBuffer = __webpack_require__(/*! ./isBuffer */ "./node_modules/lodash/isBuffer.js"),
    isFunction = __webpack_require__(/*! ./isFunction */ "./node_modules/lodash/isFunction.js"),
    isObject = __webpack_require__(/*! ./isObject */ "./node_modules/lodash/isObject.js"),
    isPlainObject = __webpack_require__(/*! ./isPlainObject */ "./node_modules/lodash/isPlainObject.js"),
    isTypedArray = __webpack_require__(/*! ./isTypedArray */ "./node_modules/lodash/isTypedArray.js"),
    safeGet = __webpack_require__(/*! ./_safeGet */ "./node_modules/lodash/_safeGet.js"),
    toPlainObject = __webpack_require__(/*! ./toPlainObject */ "./node_modules/lodash/toPlainObject.js");
/**
 * A specialized version of `baseMerge` for arrays and objects which performs
 * deep merges and tracks traversed objects enabling objects with circular
 * references to be merged.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {string} key The key of the value to merge.
 * @param {number} srcIndex The index of `source`.
 * @param {Function} mergeFunc The function to merge values.
 * @param {Function} [customizer] The function to customize assigned values.
 * @param {Object} [stack] Tracks traversed source values and their merged
 *  counterparts.
 */


function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
  var objValue = safeGet(object, key),
      srcValue = safeGet(source, key),
      stacked = stack.get(srcValue);

  if (stacked) {
    assignMergeValue(object, key, stacked);
    return;
  }

  var newValue = customizer ? customizer(objValue, srcValue, key + '', object, source, stack) : undefined;
  var isCommon = newValue === undefined;

  if (isCommon) {
    var isArr = isArray(srcValue),
        isBuff = !isArr && isBuffer(srcValue),
        isTyped = !isArr && !isBuff && isTypedArray(srcValue);
    newValue = srcValue;

    if (isArr || isBuff || isTyped) {
      if (isArray(objValue)) {
        newValue = objValue;
      } else if (isArrayLikeObject(objValue)) {
        newValue = copyArray(objValue);
      } else if (isBuff) {
        isCommon = false;
        newValue = cloneBuffer(srcValue, true);
      } else if (isTyped) {
        isCommon = false;
        newValue = cloneTypedArray(srcValue, true);
      } else {
        newValue = [];
      }
    } else if (isPlainObject(srcValue) || isArguments(srcValue)) {
      newValue = objValue;

      if (isArguments(objValue)) {
        newValue = toPlainObject(objValue);
      } else if (!isObject(objValue) || isFunction(objValue)) {
        newValue = initCloneObject(srcValue);
      }
    } else {
      isCommon = false;
    }
  }

  if (isCommon) {
    // Recursively merge objects and arrays (susceptible to call stack limits).
    stack.set(srcValue, newValue);
    mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
    stack['delete'](srcValue);
  }

  assignMergeValue(object, key, newValue);
}

module.exports = baseMergeDeep;

/***/ }),

/***/ "./node_modules/lodash/_baseRest.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_baseRest.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var identity = __webpack_require__(/*! ./identity */ "./node_modules/lodash/identity.js"),
    overRest = __webpack_require__(/*! ./_overRest */ "./node_modules/lodash/_overRest.js"),
    setToString = __webpack_require__(/*! ./_setToString */ "./node_modules/lodash/_setToString.js");
/**
 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 */


function baseRest(func, start) {
  return setToString(overRest(func, start, identity), func + '');
}

module.exports = baseRest;

/***/ }),

/***/ "./node_modules/lodash/_baseSetToString.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash/_baseSetToString.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var constant = __webpack_require__(/*! ./constant */ "./node_modules/lodash/constant.js"),
    defineProperty = __webpack_require__(/*! ./_defineProperty */ "./node_modules/lodash/_defineProperty.js"),
    identity = __webpack_require__(/*! ./identity */ "./node_modules/lodash/identity.js");
/**
 * The base implementation of `setToString` without support for hot loop shorting.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */


var baseSetToString = !defineProperty ? identity : function (func, string) {
  return defineProperty(func, 'toString', {
    'configurable': true,
    'enumerable': false,
    'value': constant(string),
    'writable': true
  });
};
module.exports = baseSetToString;

/***/ }),

/***/ "./node_modules/lodash/_baseTimes.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_baseTimes.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }

  return result;
}

module.exports = baseTimes;

/***/ }),

/***/ "./node_modules/lodash/_baseUnary.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_baseUnary.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function (value) {
    return func(value);
  };
}

module.exports = baseUnary;

/***/ }),

/***/ "./node_modules/lodash/_cacheHas.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_cacheHas.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Checks if a `cache` value for `key` exists.
 *
 * @private
 * @param {Object} cache The cache to query.
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function cacheHas(cache, key) {
  return cache.has(key);
}

module.exports = cacheHas;

/***/ }),

/***/ "./node_modules/lodash/_cloneArrayBuffer.js":
/*!**************************************************!*\
  !*** ./node_modules/lodash/_cloneArrayBuffer.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Uint8Array = __webpack_require__(/*! ./_Uint8Array */ "./node_modules/lodash/_Uint8Array.js");
/**
 * Creates a clone of `arrayBuffer`.
 *
 * @private
 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
 * @returns {ArrayBuffer} Returns the cloned array buffer.
 */


function cloneArrayBuffer(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array(result).set(new Uint8Array(arrayBuffer));
  return result;
}

module.exports = cloneArrayBuffer;

/***/ }),

/***/ "./node_modules/lodash/_cloneBuffer.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_cloneBuffer.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js");
/** Detect free variable `exports`. */


var freeExports = ( false ? undefined : _typeof(exports)) == 'object' && exports && !exports.nodeType && exports;
/** Detect free variable `module`. */

var freeModule = freeExports && ( false ? undefined : _typeof(module)) == 'object' && module && !module.nodeType && module;
/** Detect the popular CommonJS extension `module.exports`. */

var moduleExports = freeModule && freeModule.exports === freeExports;
/** Built-in value references. */

var Buffer = moduleExports ? root.Buffer : undefined,
    allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined;
/**
 * Creates a clone of  `buffer`.
 *
 * @private
 * @param {Buffer} buffer The buffer to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Buffer} Returns the cloned buffer.
 */

function cloneBuffer(buffer, isDeep) {
  if (isDeep) {
    return buffer.slice();
  }

  var length = buffer.length,
      result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
  buffer.copy(result);
  return result;
}

module.exports = cloneBuffer;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./node_modules/lodash/_cloneTypedArray.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash/_cloneTypedArray.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var cloneArrayBuffer = __webpack_require__(/*! ./_cloneArrayBuffer */ "./node_modules/lodash/_cloneArrayBuffer.js");
/**
 * Creates a clone of `typedArray`.
 *
 * @private
 * @param {Object} typedArray The typed array to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned typed array.
 */


function cloneTypedArray(typedArray, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}

module.exports = cloneTypedArray;

/***/ }),

/***/ "./node_modules/lodash/_copyArray.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_copyArray.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
function copyArray(source, array) {
  var index = -1,
      length = source.length;
  array || (array = Array(length));

  while (++index < length) {
    array[index] = source[index];
  }

  return array;
}

module.exports = copyArray;

/***/ }),

/***/ "./node_modules/lodash/_copyObject.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_copyObject.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var assignValue = __webpack_require__(/*! ./_assignValue */ "./node_modules/lodash/_assignValue.js"),
    baseAssignValue = __webpack_require__(/*! ./_baseAssignValue */ "./node_modules/lodash/_baseAssignValue.js");
/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property identifiers to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Function} [customizer] The function to customize copied values.
 * @returns {Object} Returns `object`.
 */


function copyObject(source, props, object, customizer) {
  var isNew = !object;
  object || (object = {});
  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];
    var newValue = customizer ? customizer(object[key], source[key], key, object, source) : undefined;

    if (newValue === undefined) {
      newValue = source[key];
    }

    if (isNew) {
      baseAssignValue(object, key, newValue);
    } else {
      assignValue(object, key, newValue);
    }
  }

  return object;
}

module.exports = copyObject;

/***/ }),

/***/ "./node_modules/lodash/_coreJsData.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_coreJsData.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js");
/** Used to detect overreaching core-js shims. */


var coreJsData = root['__core-js_shared__'];
module.exports = coreJsData;

/***/ }),

/***/ "./node_modules/lodash/_createAssigner.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_createAssigner.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var baseRest = __webpack_require__(/*! ./_baseRest */ "./node_modules/lodash/_baseRest.js"),
    isIterateeCall = __webpack_require__(/*! ./_isIterateeCall */ "./node_modules/lodash/_isIterateeCall.js");
/**
 * Creates a function like `_.assign`.
 *
 * @private
 * @param {Function} assigner The function to assign values.
 * @returns {Function} Returns the new assigner function.
 */


function createAssigner(assigner) {
  return baseRest(function (object, sources) {
    var index = -1,
        length = sources.length,
        customizer = length > 1 ? sources[length - 1] : undefined,
        guard = length > 2 ? sources[2] : undefined;
    customizer = assigner.length > 3 && typeof customizer == 'function' ? (length--, customizer) : undefined;

    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
      customizer = length < 3 ? undefined : customizer;
      length = 1;
    }

    object = Object(object);

    while (++index < length) {
      var source = sources[index];

      if (source) {
        assigner(object, source, index, customizer);
      }
    }

    return object;
  });
}

module.exports = createAssigner;

/***/ }),

/***/ "./node_modules/lodash/_createBaseFor.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash/_createBaseFor.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a base function for methods like `_.forIn` and `_.forOwn`.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseFor(fromRight) {
  return function (object, iteratee, keysFunc) {
    var index = -1,
        iterable = Object(object),
        props = keysFunc(object),
        length = props.length;

    while (length--) {
      var key = props[fromRight ? length : ++index];

      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }

    return object;
  };
}

module.exports = createBaseFor;

/***/ }),

/***/ "./node_modules/lodash/_defineProperty.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_defineProperty.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var getNative = __webpack_require__(/*! ./_getNative */ "./node_modules/lodash/_getNative.js");

var defineProperty = function () {
  try {
    var func = getNative(Object, 'defineProperty');
    func({}, '', {});
    return func;
  } catch (e) {}
}();

module.exports = defineProperty;

/***/ }),

/***/ "./node_modules/lodash/_equalArrays.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_equalArrays.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var SetCache = __webpack_require__(/*! ./_SetCache */ "./node_modules/lodash/_SetCache.js"),
    arraySome = __webpack_require__(/*! ./_arraySome */ "./node_modules/lodash/_arraySome.js"),
    cacheHas = __webpack_require__(/*! ./_cacheHas */ "./node_modules/lodash/_cacheHas.js");
/** Used to compose bitmasks for value comparisons. */


var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;
/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `array` and `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */

function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
      arrLength = array.length,
      othLength = other.length;

  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  } // Check that cyclic values are equal.


  var arrStacked = stack.get(array);
  var othStacked = stack.get(other);

  if (arrStacked && othStacked) {
    return arrStacked == other && othStacked == array;
  }

  var index = -1,
      result = true,
      seen = bitmask & COMPARE_UNORDERED_FLAG ? new SetCache() : undefined;
  stack.set(array, other);
  stack.set(other, array); // Ignore non-index properties.

  while (++index < arrLength) {
    var arrValue = array[index],
        othValue = other[index];

    if (customizer) {
      var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
    }

    if (compared !== undefined) {
      if (compared) {
        continue;
      }

      result = false;
      break;
    } // Recursively compare arrays (susceptible to call stack limits).


    if (seen) {
      if (!arraySome(other, function (othValue, othIndex) {
        if (!cacheHas(seen, othIndex) && (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
          return seen.push(othIndex);
        }
      })) {
        result = false;
        break;
      }
    } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
      result = false;
      break;
    }
  }

  stack['delete'](array);
  stack['delete'](other);
  return result;
}

module.exports = equalArrays;

/***/ }),

/***/ "./node_modules/lodash/_equalByTag.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_equalByTag.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Symbol = __webpack_require__(/*! ./_Symbol */ "./node_modules/lodash/_Symbol.js"),
    Uint8Array = __webpack_require__(/*! ./_Uint8Array */ "./node_modules/lodash/_Uint8Array.js"),
    eq = __webpack_require__(/*! ./eq */ "./node_modules/lodash/eq.js"),
    equalArrays = __webpack_require__(/*! ./_equalArrays */ "./node_modules/lodash/_equalArrays.js"),
    mapToArray = __webpack_require__(/*! ./_mapToArray */ "./node_modules/lodash/_mapToArray.js"),
    setToArray = __webpack_require__(/*! ./_setToArray */ "./node_modules/lodash/_setToArray.js");
/** Used to compose bitmasks for value comparisons. */


var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;
/** `Object#toString` result references. */

var boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]';
var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]';
/** Used to convert symbols to primitives and strings. */

var symbolProto = _Symbol ? _Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;
/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */

function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
  switch (tag) {
    case dataViewTag:
      if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
        return false;
      }

      object = object.buffer;
      other = other.buffer;

    case arrayBufferTag:
      if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
        return false;
      }

      return true;

    case boolTag:
    case dateTag:
    case numberTag:
      // Coerce booleans to `1` or `0` and dates to milliseconds.
      // Invalid dates are coerced to `NaN`.
      return eq(+object, +other);

    case errorTag:
      return object.name == other.name && object.message == other.message;

    case regexpTag:
    case stringTag:
      // Coerce regexes to strings and treat strings, primitives and objects,
      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
      // for more details.
      return object == other + '';

    case mapTag:
      var convert = mapToArray;

    case setTag:
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
      convert || (convert = setToArray);

      if (object.size != other.size && !isPartial) {
        return false;
      } // Assume cyclic values are equal.


      var stacked = stack.get(object);

      if (stacked) {
        return stacked == other;
      }

      bitmask |= COMPARE_UNORDERED_FLAG; // Recursively compare objects (susceptible to call stack limits).

      stack.set(object, other);
      var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
      stack['delete'](object);
      return result;

    case symbolTag:
      if (symbolValueOf) {
        return symbolValueOf.call(object) == symbolValueOf.call(other);
      }

  }

  return false;
}

module.exports = equalByTag;

/***/ }),

/***/ "./node_modules/lodash/_equalObjects.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_equalObjects.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var getAllKeys = __webpack_require__(/*! ./_getAllKeys */ "./node_modules/lodash/_getAllKeys.js");
/** Used to compose bitmasks for value comparisons. */


var COMPARE_PARTIAL_FLAG = 1;
/** Used for built-in method references. */

var objectProto = Object.prototype;
/** Used to check objects for own properties. */

var hasOwnProperty = objectProto.hasOwnProperty;
/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */

function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
      objProps = getAllKeys(object),
      objLength = objProps.length,
      othProps = getAllKeys(other),
      othLength = othProps.length;

  if (objLength != othLength && !isPartial) {
    return false;
  }

  var index = objLength;

  while (index--) {
    var key = objProps[index];

    if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
      return false;
    }
  } // Check that cyclic values are equal.


  var objStacked = stack.get(object);
  var othStacked = stack.get(other);

  if (objStacked && othStacked) {
    return objStacked == other && othStacked == object;
  }

  var result = true;
  stack.set(object, other);
  stack.set(other, object);
  var skipCtor = isPartial;

  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key],
        othValue = other[key];

    if (customizer) {
      var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
    } // Recursively compare objects (susceptible to call stack limits).


    if (!(compared === undefined ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
      result = false;
      break;
    }

    skipCtor || (skipCtor = key == 'constructor');
  }

  if (result && !skipCtor) {
    var objCtor = object.constructor,
        othCtor = other.constructor; // Non `Object` object instances with different constructors are not equal.

    if (objCtor != othCtor && 'constructor' in object && 'constructor' in other && !(typeof objCtor == 'function' && objCtor instanceof objCtor && typeof othCtor == 'function' && othCtor instanceof othCtor)) {
      result = false;
    }
  }

  stack['delete'](object);
  stack['delete'](other);
  return result;
}

module.exports = equalObjects;

/***/ }),

/***/ "./node_modules/lodash/_freeGlobal.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_freeGlobal.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/** Detect free variable `global` from Node.js. */
var freeGlobal = (typeof global === "undefined" ? "undefined" : _typeof(global)) == 'object' && global && global.Object === Object && global;
module.exports = freeGlobal;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/lodash/_getAllKeys.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_getAllKeys.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var baseGetAllKeys = __webpack_require__(/*! ./_baseGetAllKeys */ "./node_modules/lodash/_baseGetAllKeys.js"),
    getSymbols = __webpack_require__(/*! ./_getSymbols */ "./node_modules/lodash/_getSymbols.js"),
    keys = __webpack_require__(/*! ./keys */ "./node_modules/lodash/keys.js");
/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */


function getAllKeys(object) {
  return baseGetAllKeys(object, keys, getSymbols);
}

module.exports = getAllKeys;

/***/ }),

/***/ "./node_modules/lodash/_getMapData.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_getMapData.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isKeyable = __webpack_require__(/*! ./_isKeyable */ "./node_modules/lodash/_isKeyable.js");
/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */


function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key) ? data[typeof key == 'string' ? 'string' : 'hash'] : data.map;
}

module.exports = getMapData;

/***/ }),

/***/ "./node_modules/lodash/_getNative.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_getNative.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var baseIsNative = __webpack_require__(/*! ./_baseIsNative */ "./node_modules/lodash/_baseIsNative.js"),
    getValue = __webpack_require__(/*! ./_getValue */ "./node_modules/lodash/_getValue.js");
/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */


function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

module.exports = getNative;

/***/ }),

/***/ "./node_modules/lodash/_getPrototype.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_getPrototype.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var overArg = __webpack_require__(/*! ./_overArg */ "./node_modules/lodash/_overArg.js");
/** Built-in value references. */


var getPrototype = overArg(Object.getPrototypeOf, Object);
module.exports = getPrototype;

/***/ }),

/***/ "./node_modules/lodash/_getRawTag.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_getRawTag.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Symbol = __webpack_require__(/*! ./_Symbol */ "./node_modules/lodash/_Symbol.js");
/** Used for built-in method references. */


var objectProto = Object.prototype;
/** Used to check objects for own properties. */

var hasOwnProperty = objectProto.hasOwnProperty;
/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */

var nativeObjectToString = objectProto.toString;
/** Built-in value references. */

var symToStringTag = _Symbol ? _Symbol.toStringTag : undefined;
/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */

function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);

  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }

  return result;
}

module.exports = getRawTag;

/***/ }),

/***/ "./node_modules/lodash/_getSymbols.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_getSymbols.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var arrayFilter = __webpack_require__(/*! ./_arrayFilter */ "./node_modules/lodash/_arrayFilter.js"),
    stubArray = __webpack_require__(/*! ./stubArray */ "./node_modules/lodash/stubArray.js");
/** Used for built-in method references. */


var objectProto = Object.prototype;
/** Built-in value references. */

var propertyIsEnumerable = objectProto.propertyIsEnumerable;
/* Built-in method references for those with the same name as other `lodash` methods. */

var nativeGetSymbols = Object.getOwnPropertySymbols;
/**
 * Creates an array of the own enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */

var getSymbols = !nativeGetSymbols ? stubArray : function (object) {
  if (object == null) {
    return [];
  }

  object = Object(object);
  return arrayFilter(nativeGetSymbols(object), function (symbol) {
    return propertyIsEnumerable.call(object, symbol);
  });
};
module.exports = getSymbols;

/***/ }),

/***/ "./node_modules/lodash/_getTag.js":
/*!****************************************!*\
  !*** ./node_modules/lodash/_getTag.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var DataView = __webpack_require__(/*! ./_DataView */ "./node_modules/lodash/_DataView.js"),
    Map = __webpack_require__(/*! ./_Map */ "./node_modules/lodash/_Map.js"),
    Promise = __webpack_require__(/*! ./_Promise */ "./node_modules/lodash/_Promise.js"),
    Set = __webpack_require__(/*! ./_Set */ "./node_modules/lodash/_Set.js"),
    WeakMap = __webpack_require__(/*! ./_WeakMap */ "./node_modules/lodash/_WeakMap.js"),
    baseGetTag = __webpack_require__(/*! ./_baseGetTag */ "./node_modules/lodash/_baseGetTag.js"),
    toSource = __webpack_require__(/*! ./_toSource */ "./node_modules/lodash/_toSource.js");
/** `Object#toString` result references. */


var mapTag = '[object Map]',
    objectTag = '[object Object]',
    promiseTag = '[object Promise]',
    setTag = '[object Set]',
    weakMapTag = '[object WeakMap]';
var dataViewTag = '[object DataView]';
/** Used to detect maps, sets, and weakmaps. */

var dataViewCtorString = toSource(DataView),
    mapCtorString = toSource(Map),
    promiseCtorString = toSource(Promise),
    setCtorString = toSource(Set),
    weakMapCtorString = toSource(WeakMap);
/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */

var getTag = baseGetTag; // Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.

if (DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag || Map && getTag(new Map()) != mapTag || Promise && getTag(Promise.resolve()) != promiseTag || Set && getTag(new Set()) != setTag || WeakMap && getTag(new WeakMap()) != weakMapTag) {
  getTag = function getTag(value) {
    var result = baseGetTag(value),
        Ctor = result == objectTag ? value.constructor : undefined,
        ctorString = Ctor ? toSource(Ctor) : '';

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString:
          return dataViewTag;

        case mapCtorString:
          return mapTag;

        case promiseCtorString:
          return promiseTag;

        case setCtorString:
          return setTag;

        case weakMapCtorString:
          return weakMapTag;
      }
    }

    return result;
  };
}

module.exports = getTag;

/***/ }),

/***/ "./node_modules/lodash/_getValue.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_getValue.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

module.exports = getValue;

/***/ }),

/***/ "./node_modules/lodash/_hashClear.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_hashClear.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var nativeCreate = __webpack_require__(/*! ./_nativeCreate */ "./node_modules/lodash/_nativeCreate.js");
/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */


function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
  this.size = 0;
}

module.exports = hashClear;

/***/ }),

/***/ "./node_modules/lodash/_hashDelete.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_hashDelete.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

module.exports = hashDelete;

/***/ }),

/***/ "./node_modules/lodash/_hashGet.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_hashGet.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var nativeCreate = __webpack_require__(/*! ./_nativeCreate */ "./node_modules/lodash/_nativeCreate.js");
/** Used to stand-in for `undefined` hash values. */


var HASH_UNDEFINED = '__lodash_hash_undefined__';
/** Used for built-in method references. */

var objectProto = Object.prototype;
/** Used to check objects for own properties. */

var hasOwnProperty = objectProto.hasOwnProperty;
/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */

function hashGet(key) {
  var data = this.__data__;

  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }

  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

module.exports = hashGet;

/***/ }),

/***/ "./node_modules/lodash/_hashHas.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_hashHas.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var nativeCreate = __webpack_require__(/*! ./_nativeCreate */ "./node_modules/lodash/_nativeCreate.js");
/** Used for built-in method references. */


var objectProto = Object.prototype;
/** Used to check objects for own properties. */

var hasOwnProperty = objectProto.hasOwnProperty;
/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */

function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
}

module.exports = hashHas;

/***/ }),

/***/ "./node_modules/lodash/_hashSet.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_hashSet.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var nativeCreate = __webpack_require__(/*! ./_nativeCreate */ "./node_modules/lodash/_nativeCreate.js");
/** Used to stand-in for `undefined` hash values. */


var HASH_UNDEFINED = '__lodash_hash_undefined__';
/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */

function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = nativeCreate && value === undefined ? HASH_UNDEFINED : value;
  return this;
}

module.exports = hashSet;

/***/ }),

/***/ "./node_modules/lodash/_initCloneObject.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash/_initCloneObject.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var baseCreate = __webpack_require__(/*! ./_baseCreate */ "./node_modules/lodash/_baseCreate.js"),
    getPrototype = __webpack_require__(/*! ./_getPrototype */ "./node_modules/lodash/_getPrototype.js"),
    isPrototype = __webpack_require__(/*! ./_isPrototype */ "./node_modules/lodash/_isPrototype.js");
/**
 * Initializes an object clone.
 *
 * @private
 * @param {Object} object The object to clone.
 * @returns {Object} Returns the initialized clone.
 */


function initCloneObject(object) {
  return typeof object.constructor == 'function' && !isPrototype(object) ? baseCreate(getPrototype(object)) : {};
}

module.exports = initCloneObject;

/***/ }),

/***/ "./node_modules/lodash/_isIndex.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_isIndex.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;
/** Used to detect unsigned integer values. */

var reIsUint = /^(?:0|[1-9]\d*)$/;
/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */

function isIndex(value, length) {
  var type = _typeof(value);

  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length && (type == 'number' || type != 'symbol' && reIsUint.test(value)) && value > -1 && value % 1 == 0 && value < length;
}

module.exports = isIndex;

/***/ }),

/***/ "./node_modules/lodash/_isIterateeCall.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_isIterateeCall.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var eq = __webpack_require__(/*! ./eq */ "./node_modules/lodash/eq.js"),
    isArrayLike = __webpack_require__(/*! ./isArrayLike */ "./node_modules/lodash/isArrayLike.js"),
    isIndex = __webpack_require__(/*! ./_isIndex */ "./node_modules/lodash/_isIndex.js"),
    isObject = __webpack_require__(/*! ./isObject */ "./node_modules/lodash/isObject.js");
/**
 * Checks if the given arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
 *  else `false`.
 */


function isIterateeCall(value, index, object) {
  if (!isObject(object)) {
    return false;
  }

  var type = _typeof(index);

  if (type == 'number' ? isArrayLike(object) && isIndex(index, object.length) : type == 'string' && index in object) {
    return eq(object[index], value);
  }

  return false;
}

module.exports = isIterateeCall;

/***/ }),

/***/ "./node_modules/lodash/_isKeyable.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_isKeyable.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = _typeof(value);

  return type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean' ? value !== '__proto__' : value === null;
}

module.exports = isKeyable;

/***/ }),

/***/ "./node_modules/lodash/_isMasked.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_isMasked.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var coreJsData = __webpack_require__(/*! ./_coreJsData */ "./node_modules/lodash/_coreJsData.js");
/** Used to detect methods masquerading as native. */


var maskSrcKey = function () {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? 'Symbol(src)_1.' + uid : '';
}();
/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */


function isMasked(func) {
  return !!maskSrcKey && maskSrcKey in func;
}

module.exports = isMasked;

/***/ }),

/***/ "./node_modules/lodash/_isPrototype.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_isPrototype.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/** Used for built-in method references. */
var objectProto = Object.prototype;
/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */

function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = typeof Ctor == 'function' && Ctor.prototype || objectProto;
  return value === proto;
}

module.exports = isPrototype;

/***/ }),

/***/ "./node_modules/lodash/_listCacheClear.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_listCacheClear.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

module.exports = listCacheClear;

/***/ }),

/***/ "./node_modules/lodash/_listCacheDelete.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash/_listCacheDelete.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var assocIndexOf = __webpack_require__(/*! ./_assocIndexOf */ "./node_modules/lodash/_assocIndexOf.js");
/** Used for built-in method references. */


var arrayProto = Array.prototype;
/** Built-in value references. */

var splice = arrayProto.splice;
/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */

function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }

  var lastIndex = data.length - 1;

  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }

  --this.size;
  return true;
}

module.exports = listCacheDelete;

/***/ }),

/***/ "./node_modules/lodash/_listCacheGet.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_listCacheGet.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var assocIndexOf = __webpack_require__(/*! ./_assocIndexOf */ "./node_modules/lodash/_assocIndexOf.js");
/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */


function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);
  return index < 0 ? undefined : data[index][1];
}

module.exports = listCacheGet;

/***/ }),

/***/ "./node_modules/lodash/_listCacheHas.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_listCacheHas.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var assocIndexOf = __webpack_require__(/*! ./_assocIndexOf */ "./node_modules/lodash/_assocIndexOf.js");
/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */


function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

module.exports = listCacheHas;

/***/ }),

/***/ "./node_modules/lodash/_listCacheSet.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_listCacheSet.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var assocIndexOf = __webpack_require__(/*! ./_assocIndexOf */ "./node_modules/lodash/_assocIndexOf.js");
/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */


function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }

  return this;
}

module.exports = listCacheSet;

/***/ }),

/***/ "./node_modules/lodash/_mapCacheClear.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash/_mapCacheClear.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Hash = __webpack_require__(/*! ./_Hash */ "./node_modules/lodash/_Hash.js"),
    ListCache = __webpack_require__(/*! ./_ListCache */ "./node_modules/lodash/_ListCache.js"),
    Map = __webpack_require__(/*! ./_Map */ "./node_modules/lodash/_Map.js");
/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */


function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new Hash(),
    'map': new (Map || ListCache)(),
    'string': new Hash()
  };
}

module.exports = mapCacheClear;

/***/ }),

/***/ "./node_modules/lodash/_mapCacheDelete.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_mapCacheDelete.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var getMapData = __webpack_require__(/*! ./_getMapData */ "./node_modules/lodash/_getMapData.js");
/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */


function mapCacheDelete(key) {
  var result = getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

module.exports = mapCacheDelete;

/***/ }),

/***/ "./node_modules/lodash/_mapCacheGet.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_mapCacheGet.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var getMapData = __webpack_require__(/*! ./_getMapData */ "./node_modules/lodash/_getMapData.js");
/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */


function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

module.exports = mapCacheGet;

/***/ }),

/***/ "./node_modules/lodash/_mapCacheHas.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_mapCacheHas.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var getMapData = __webpack_require__(/*! ./_getMapData */ "./node_modules/lodash/_getMapData.js");
/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */


function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

module.exports = mapCacheHas;

/***/ }),

/***/ "./node_modules/lodash/_mapCacheSet.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_mapCacheSet.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var getMapData = __webpack_require__(/*! ./_getMapData */ "./node_modules/lodash/_getMapData.js");
/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */


function mapCacheSet(key, value) {
  var data = getMapData(this, key),
      size = data.size;
  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

module.exports = mapCacheSet;

/***/ }),

/***/ "./node_modules/lodash/_mapToArray.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_mapToArray.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */
function mapToArray(map) {
  var index = -1,
      result = Array(map.size);
  map.forEach(function (value, key) {
    result[++index] = [key, value];
  });
  return result;
}

module.exports = mapToArray;

/***/ }),

/***/ "./node_modules/lodash/_nativeCreate.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_nativeCreate.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var getNative = __webpack_require__(/*! ./_getNative */ "./node_modules/lodash/_getNative.js");
/* Built-in method references that are verified to be native. */


var nativeCreate = getNative(Object, 'create');
module.exports = nativeCreate;

/***/ }),

/***/ "./node_modules/lodash/_nativeKeys.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_nativeKeys.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var overArg = __webpack_require__(/*! ./_overArg */ "./node_modules/lodash/_overArg.js");
/* Built-in method references for those with the same name as other `lodash` methods. */


var nativeKeys = overArg(Object.keys, Object);
module.exports = nativeKeys;

/***/ }),

/***/ "./node_modules/lodash/_nativeKeysIn.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_nativeKeysIn.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * This function is like
 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * except that it includes inherited enumerable properties.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function nativeKeysIn(object) {
  var result = [];

  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }

  return result;
}

module.exports = nativeKeysIn;

/***/ }),

/***/ "./node_modules/lodash/_nodeUtil.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_nodeUtil.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var freeGlobal = __webpack_require__(/*! ./_freeGlobal */ "./node_modules/lodash/_freeGlobal.js");
/** Detect free variable `exports`. */


var freeExports = ( false ? undefined : _typeof(exports)) == 'object' && exports && !exports.nodeType && exports;
/** Detect free variable `module`. */

var freeModule = freeExports && ( false ? undefined : _typeof(module)) == 'object' && module && !module.nodeType && module;
/** Detect the popular CommonJS extension `module.exports`. */

var moduleExports = freeModule && freeModule.exports === freeExports;
/** Detect free variable `process` from Node.js. */

var freeProcess = moduleExports && freeGlobal.process;
/** Used to access faster Node.js helpers. */

var nodeUtil = function () {
  try {
    // Use `util.types` for Node.js 10+.
    var types = freeModule && freeModule.require && freeModule.require('util').types;

    if (types) {
      return types;
    } // Legacy `process.binding('util')` for Node.js < 10.


    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}();

module.exports = nodeUtil;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./node_modules/lodash/_objectToString.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_objectToString.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/** Used for built-in method references. */
var objectProto = Object.prototype;
/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */

var nativeObjectToString = objectProto.toString;
/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */

function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;

/***/ }),

/***/ "./node_modules/lodash/_overArg.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_overArg.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function (arg) {
    return func(transform(arg));
  };
}

module.exports = overArg;

/***/ }),

/***/ "./node_modules/lodash/_overRest.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_overRest.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var apply = __webpack_require__(/*! ./_apply */ "./node_modules/lodash/_apply.js");
/* Built-in method references for those with the same name as other `lodash` methods. */


var nativeMax = Math.max;
/**
 * A specialized version of `baseRest` which transforms the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @param {Function} transform The rest array transform.
 * @returns {Function} Returns the new function.
 */

function overRest(func, start, transform) {
  start = nativeMax(start === undefined ? func.length - 1 : start, 0);
  return function () {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }

    index = -1;
    var otherArgs = Array(start + 1);

    while (++index < start) {
      otherArgs[index] = args[index];
    }

    otherArgs[start] = transform(array);
    return apply(func, this, otherArgs);
  };
}

module.exports = overRest;

/***/ }),

/***/ "./node_modules/lodash/_root.js":
/*!**************************************!*\
  !*** ./node_modules/lodash/_root.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var freeGlobal = __webpack_require__(/*! ./_freeGlobal */ "./node_modules/lodash/_freeGlobal.js");
/** Detect free variable `self`. */


var freeSelf = (typeof self === "undefined" ? "undefined" : _typeof(self)) == 'object' && self && self.Object === Object && self;
/** Used as a reference to the global object. */

var root = freeGlobal || freeSelf || Function('return this')();
module.exports = root;

/***/ }),

/***/ "./node_modules/lodash/_safeGet.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_safeGet.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Gets the value at `key`, unless `key` is "__proto__" or "constructor".
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function safeGet(object, key) {
  if (key === 'constructor' && typeof object[key] === 'function') {
    return;
  }

  if (key == '__proto__') {
    return;
  }

  return object[key];
}

module.exports = safeGet;

/***/ }),

/***/ "./node_modules/lodash/_setCacheAdd.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_setCacheAdd.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';
/**
 * Adds `value` to the array cache.
 *
 * @private
 * @name add
 * @memberOf SetCache
 * @alias push
 * @param {*} value The value to cache.
 * @returns {Object} Returns the cache instance.
 */

function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED);

  return this;
}

module.exports = setCacheAdd;

/***/ }),

/***/ "./node_modules/lodash/_setCacheHas.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_setCacheHas.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Checks if `value` is in the array cache.
 *
 * @private
 * @name has
 * @memberOf SetCache
 * @param {*} value The value to search for.
 * @returns {number} Returns `true` if `value` is found, else `false`.
 */
function setCacheHas(value) {
  return this.__data__.has(value);
}

module.exports = setCacheHas;

/***/ }),

/***/ "./node_modules/lodash/_setToArray.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_setToArray.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */
function setToArray(set) {
  var index = -1,
      result = Array(set.size);
  set.forEach(function (value) {
    result[++index] = value;
  });
  return result;
}

module.exports = setToArray;

/***/ }),

/***/ "./node_modules/lodash/_setToString.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_setToString.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var baseSetToString = __webpack_require__(/*! ./_baseSetToString */ "./node_modules/lodash/_baseSetToString.js"),
    shortOut = __webpack_require__(/*! ./_shortOut */ "./node_modules/lodash/_shortOut.js");
/**
 * Sets the `toString` method of `func` to return `string`.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */


var setToString = shortOut(baseSetToString);
module.exports = setToString;

/***/ }),

/***/ "./node_modules/lodash/_shortOut.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_shortOut.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/** Used to detect hot functions by number of calls within a span of milliseconds. */
var HOT_COUNT = 800,
    HOT_SPAN = 16;
/* Built-in method references for those with the same name as other `lodash` methods. */

var nativeNow = Date.now;
/**
 * Creates a function that'll short out and invoke `identity` instead
 * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
 * milliseconds.
 *
 * @private
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new shortable function.
 */

function shortOut(func) {
  var count = 0,
      lastCalled = 0;
  return function () {
    var stamp = nativeNow(),
        remaining = HOT_SPAN - (stamp - lastCalled);
    lastCalled = stamp;

    if (remaining > 0) {
      if (++count >= HOT_COUNT) {
        return arguments[0];
      }
    } else {
      count = 0;
    }

    return func.apply(undefined, arguments);
  };
}

module.exports = shortOut;

/***/ }),

/***/ "./node_modules/lodash/_stackClear.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_stackClear.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ListCache = __webpack_require__(/*! ./_ListCache */ "./node_modules/lodash/_ListCache.js");
/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */


function stackClear() {
  this.__data__ = new ListCache();
  this.size = 0;
}

module.exports = stackClear;

/***/ }),

/***/ "./node_modules/lodash/_stackDelete.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_stackDelete.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  var data = this.__data__,
      result = data['delete'](key);
  this.size = data.size;
  return result;
}

module.exports = stackDelete;

/***/ }),

/***/ "./node_modules/lodash/_stackGet.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_stackGet.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

module.exports = stackGet;

/***/ }),

/***/ "./node_modules/lodash/_stackHas.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_stackHas.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

module.exports = stackHas;

/***/ }),

/***/ "./node_modules/lodash/_stackSet.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_stackSet.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ListCache = __webpack_require__(/*! ./_ListCache */ "./node_modules/lodash/_ListCache.js"),
    Map = __webpack_require__(/*! ./_Map */ "./node_modules/lodash/_Map.js"),
    MapCache = __webpack_require__(/*! ./_MapCache */ "./node_modules/lodash/_MapCache.js");
/** Used as the size to enable large array optimizations. */


var LARGE_ARRAY_SIZE = 200;
/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */

function stackSet(key, value) {
  var data = this.__data__;

  if (data instanceof ListCache) {
    var pairs = data.__data__;

    if (!Map || pairs.length < LARGE_ARRAY_SIZE - 1) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }

    data = this.__data__ = new MapCache(pairs);
  }

  data.set(key, value);
  this.size = data.size;
  return this;
}

module.exports = stackSet;

/***/ }),

/***/ "./node_modules/lodash/_toSource.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_toSource.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/** Used for built-in method references. */
var funcProto = Function.prototype;
/** Used to resolve the decompiled source of functions. */

var funcToString = funcProto.toString;
/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */

function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}

    try {
      return func + '';
    } catch (e) {}
  }

  return '';
}

module.exports = toSource;

/***/ }),

/***/ "./node_modules/lodash/constant.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/constant.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a function that returns `value`.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {*} value The value to return from the new function.
 * @returns {Function} Returns the new constant function.
 * @example
 *
 * var objects = _.times(2, _.constant({ 'a': 1 }));
 *
 * console.log(objects);
 * // => [{ 'a': 1 }, { 'a': 1 }]
 *
 * console.log(objects[0] === objects[1]);
 * // => true
 */
function constant(value) {
  return function () {
    return value;
  };
}

module.exports = constant;

/***/ }),

/***/ "./node_modules/lodash/eq.js":
/*!***********************************!*\
  !*** ./node_modules/lodash/eq.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || value !== value && other !== other;
}

module.exports = eq;

/***/ }),

/***/ "./node_modules/lodash/identity.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/identity.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = identity;

/***/ }),

/***/ "./node_modules/lodash/isArguments.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/isArguments.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var baseIsArguments = __webpack_require__(/*! ./_baseIsArguments */ "./node_modules/lodash/_baseIsArguments.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "./node_modules/lodash/isObjectLike.js");
/** Used for built-in method references. */


var objectProto = Object.prototype;
/** Used to check objects for own properties. */

var hasOwnProperty = objectProto.hasOwnProperty;
/** Built-in value references. */

var propertyIsEnumerable = objectProto.propertyIsEnumerable;
/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */

var isArguments = baseIsArguments(function () {
  return arguments;
}()) ? baseIsArguments : function (value) {
  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') && !propertyIsEnumerable.call(value, 'callee');
};
module.exports = isArguments;

/***/ }),

/***/ "./node_modules/lodash/isArray.js":
/*!****************************************!*\
  !*** ./node_modules/lodash/isArray.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;
module.exports = isArray;

/***/ }),

/***/ "./node_modules/lodash/isArrayLike.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/isArrayLike.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isFunction = __webpack_require__(/*! ./isFunction */ "./node_modules/lodash/isFunction.js"),
    isLength = __webpack_require__(/*! ./isLength */ "./node_modules/lodash/isLength.js");
/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */


function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

module.exports = isArrayLike;

/***/ }),

/***/ "./node_modules/lodash/isArrayLikeObject.js":
/*!**************************************************!*\
  !*** ./node_modules/lodash/isArrayLikeObject.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isArrayLike = __webpack_require__(/*! ./isArrayLike */ "./node_modules/lodash/isArrayLike.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "./node_modules/lodash/isObjectLike.js");
/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */


function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

module.exports = isArrayLikeObject;

/***/ }),

/***/ "./node_modules/lodash/isBuffer.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/isBuffer.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js"),
    stubFalse = __webpack_require__(/*! ./stubFalse */ "./node_modules/lodash/stubFalse.js");
/** Detect free variable `exports`. */


var freeExports = ( false ? undefined : _typeof(exports)) == 'object' && exports && !exports.nodeType && exports;
/** Detect free variable `module`. */

var freeModule = freeExports && ( false ? undefined : _typeof(module)) == 'object' && module && !module.nodeType && module;
/** Detect the popular CommonJS extension `module.exports`. */

var moduleExports = freeModule && freeModule.exports === freeExports;
/** Built-in value references. */

var Buffer = moduleExports ? root.Buffer : undefined;
/* Built-in method references for those with the same name as other `lodash` methods. */

var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;
/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */

var isBuffer = nativeIsBuffer || stubFalse;
module.exports = isBuffer;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./node_modules/lodash/isEqual.js":
/*!****************************************!*\
  !*** ./node_modules/lodash/isEqual.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var baseIsEqual = __webpack_require__(/*! ./_baseIsEqual */ "./node_modules/lodash/_baseIsEqual.js");
/**
 * Performs a deep comparison between two values to determine if they are
 * equivalent.
 *
 * **Note:** This method supports comparing arrays, array buffers, booleans,
 * date objects, error objects, maps, numbers, `Object` objects, regexes,
 * sets, strings, symbols, and typed arrays. `Object` objects are compared
 * by their own, not inherited, enumerable properties. Functions and DOM
 * nodes are compared by strict equality, i.e. `===`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.isEqual(object, other);
 * // => true
 *
 * object === other;
 * // => false
 */


function isEqual(value, other) {
  return baseIsEqual(value, other);
}

module.exports = isEqual;

/***/ }),

/***/ "./node_modules/lodash/isFunction.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/isFunction.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ "./node_modules/lodash/_baseGetTag.js"),
    isObject = __webpack_require__(/*! ./isObject */ "./node_modules/lodash/isObject.js");
/** `Object#toString` result references. */


var asyncTag = '[object AsyncFunction]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';
/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */

function isFunction(value) {
  if (!isObject(value)) {
    return false;
  } // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.


  var tag = baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

module.exports = isFunction;

/***/ }),

/***/ "./node_modules/lodash/isLength.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/isLength.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;
/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */

function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

module.exports = isLength;

/***/ }),

/***/ "./node_modules/lodash/isObject.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/isObject.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = _typeof(value);

  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;

/***/ }),

/***/ "./node_modules/lodash/isObjectLike.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/isObjectLike.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && _typeof(value) == 'object';
}

module.exports = isObjectLike;

/***/ }),

/***/ "./node_modules/lodash/isPlainObject.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/isPlainObject.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ "./node_modules/lodash/_baseGetTag.js"),
    getPrototype = __webpack_require__(/*! ./_getPrototype */ "./node_modules/lodash/_getPrototype.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "./node_modules/lodash/isObjectLike.js");
/** `Object#toString` result references. */


var objectTag = '[object Object]';
/** Used for built-in method references. */

var funcProto = Function.prototype,
    objectProto = Object.prototype;
/** Used to resolve the decompiled source of functions. */

var funcToString = funcProto.toString;
/** Used to check objects for own properties. */

var hasOwnProperty = objectProto.hasOwnProperty;
/** Used to infer the `Object` constructor. */

var objectCtorString = funcToString.call(Object);
/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */

function isPlainObject(value) {
  if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
    return false;
  }

  var proto = getPrototype(value);

  if (proto === null) {
    return true;
  }

  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
  return typeof Ctor == 'function' && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
}

module.exports = isPlainObject;

/***/ }),

/***/ "./node_modules/lodash/isTypedArray.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/isTypedArray.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var baseIsTypedArray = __webpack_require__(/*! ./_baseIsTypedArray */ "./node_modules/lodash/_baseIsTypedArray.js"),
    baseUnary = __webpack_require__(/*! ./_baseUnary */ "./node_modules/lodash/_baseUnary.js"),
    nodeUtil = __webpack_require__(/*! ./_nodeUtil */ "./node_modules/lodash/_nodeUtil.js");
/* Node.js helper references. */


var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */

var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
module.exports = isTypedArray;

/***/ }),

/***/ "./node_modules/lodash/keys.js":
/*!*************************************!*\
  !*** ./node_modules/lodash/keys.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var arrayLikeKeys = __webpack_require__(/*! ./_arrayLikeKeys */ "./node_modules/lodash/_arrayLikeKeys.js"),
    baseKeys = __webpack_require__(/*! ./_baseKeys */ "./node_modules/lodash/_baseKeys.js"),
    isArrayLike = __webpack_require__(/*! ./isArrayLike */ "./node_modules/lodash/isArrayLike.js");
/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */


function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

module.exports = keys;

/***/ }),

/***/ "./node_modules/lodash/keysIn.js":
/*!***************************************!*\
  !*** ./node_modules/lodash/keysIn.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var arrayLikeKeys = __webpack_require__(/*! ./_arrayLikeKeys */ "./node_modules/lodash/_arrayLikeKeys.js"),
    baseKeysIn = __webpack_require__(/*! ./_baseKeysIn */ "./node_modules/lodash/_baseKeysIn.js"),
    isArrayLike = __webpack_require__(/*! ./isArrayLike */ "./node_modules/lodash/isArrayLike.js");
/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */


function keysIn(object) {
  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
}

module.exports = keysIn;

/***/ }),

/***/ "./node_modules/lodash/merge.js":
/*!**************************************!*\
  !*** ./node_modules/lodash/merge.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var baseMerge = __webpack_require__(/*! ./_baseMerge */ "./node_modules/lodash/_baseMerge.js"),
    createAssigner = __webpack_require__(/*! ./_createAssigner */ "./node_modules/lodash/_createAssigner.js");
/**
 * This method is like `_.assign` except that it recursively merges own and
 * inherited enumerable string keyed properties of source objects into the
 * destination object. Source properties that resolve to `undefined` are
 * skipped if a destination value exists. Array and plain object properties
 * are merged recursively. Other objects and value types are overridden by
 * assignment. Source objects are applied from left to right. Subsequent
 * sources overwrite property assignments of previous sources.
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @memberOf _
 * @since 0.5.0
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @returns {Object} Returns `object`.
 * @example
 *
 * var object = {
 *   'a': [{ 'b': 2 }, { 'd': 4 }]
 * };
 *
 * var other = {
 *   'a': [{ 'c': 3 }, { 'e': 5 }]
 * };
 *
 * _.merge(object, other);
 * // => { 'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }] }
 */


var merge = createAssigner(function (object, source, srcIndex) {
  baseMerge(object, source, srcIndex);
});
module.exports = merge;

/***/ }),

/***/ "./node_modules/lodash/stubArray.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/stubArray.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */
function stubArray() {
  return [];
}

module.exports = stubArray;

/***/ }),

/***/ "./node_modules/lodash/stubFalse.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/stubFalse.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

module.exports = stubFalse;

/***/ }),

/***/ "./node_modules/lodash/toPlainObject.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/toPlainObject.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var copyObject = __webpack_require__(/*! ./_copyObject */ "./node_modules/lodash/_copyObject.js"),
    keysIn = __webpack_require__(/*! ./keysIn */ "./node_modules/lodash/keysIn.js");
/**
 * Converts `value` to a plain object flattening inherited enumerable string
 * keyed properties of `value` to own properties of the plain object.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {Object} Returns the converted plain object.
 * @example
 *
 * function Foo() {
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.assign({ 'a': 1 }, new Foo);
 * // => { 'a': 1, 'b': 2 }
 *
 * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
 * // => { 'a': 1, 'b': 2, 'c': 3 }
 */


function toPlainObject(value) {
  return copyObject(value, keysIn(value));
}

module.exports = toPlainObject;

/***/ }),

/***/ "./node_modules/node-gettext/lib/gettext.js":
/*!**************************************************!*\
  !*** ./node_modules/node-gettext/lib/gettext.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var get = __webpack_require__(/*! lodash.get */ "./node_modules/lodash.get/index.js");

var plurals = __webpack_require__(/*! ./plurals */ "./node_modules/node-gettext/lib/plurals.js");

module.exports = Gettext;
/**
 * Creates and returns a new Gettext instance.
 *
 * @constructor
 * @param  {Object}  [options]             A set of options
 * @param  {String}  options.sourceLocale  The locale that the source code and its
 *                                         texts are written in. Translations for
 *                                         this locale is not necessary.
 * @param  {Boolean} options.debug         Whether to output debug info into the
 *                                         console.
 * @return {Object}  A Gettext instance
 */

function Gettext(options) {
  options = options || {};
  this.catalogs = {};
  this.locale = '';
  this.domain = 'messages';
  this.listeners = []; // Set source locale

  this.sourceLocale = '';

  if (options.sourceLocale) {
    if (typeof options.sourceLocale === 'string') {
      this.sourceLocale = options.sourceLocale;
    } else {
      this.warn('The `sourceLocale` option should be a string');
    }
  } // Set debug flag


  this.debug = 'debug' in options && options.debug === true;
}
/**
 * Adds an event listener.
 *
 * @param  {String}   eventName  An event name
 * @param  {Function} callback   An event handler function
 */


Gettext.prototype.on = function (eventName, callback) {
  this.listeners.push({
    eventName: eventName,
    callback: callback
  });
};
/**
 * Removes an event listener.
 *
 * @param  {String}   eventName  An event name
 * @param  {Function} callback   A previously registered event handler function
 */


Gettext.prototype.off = function (eventName, callback) {
  this.listeners = this.listeners.filter(function (listener) {
    return (listener.eventName === eventName && listener.callback === callback) === false;
  });
};
/**
 * Emits an event to all registered event listener.
 *
 * @private
 * @param  {String} eventName  An event name
 * @param  {any}    eventData  Data to pass to event listeners
 */


Gettext.prototype.emit = function (eventName, eventData) {
  for (var i = 0; i < this.listeners.length; i++) {
    var listener = this.listeners[i];

    if (listener.eventName === eventName) {
      listener.callback(eventData);
    }
  }
};
/**
 * Logs a warning to the console if debug mode is enabled.
 *
 * @ignore
 * @param  {String} message  A warning message
 */


Gettext.prototype.warn = function (message) {
  if (this.debug) {
    console.warn(message);
  }

  this.emit('error', new Error(message));
};
/**
 * Stores a set of translations in the set of gettext
 * catalogs.
 *
 * @example
 *     gt.addTranslations('sv-SE', 'messages', translationsObject)
 *
 * @param {String} locale        A locale string
 * @param {String} domain        A domain name
 * @param {Object} translations  An object of gettext-parser JSON shape
 */


Gettext.prototype.addTranslations = function (locale, domain, translations) {
  if (!this.catalogs[locale]) {
    this.catalogs[locale] = {};
  }

  this.catalogs[locale][domain] = translations;
};
/**
 * Sets the locale to get translated messages for.
 *
 * @example
 *     gt.setLocale('sv-SE')
 *
 * @param {String} locale  A locale
 */


Gettext.prototype.setLocale = function (locale) {
  if (typeof locale !== 'string') {
    this.warn('You called setLocale() with an argument of type ' + _typeof(locale) + '. ' + 'The locale must be a string.');
    return;
  }

  if (locale.trim() === '') {
    this.warn('You called setLocale() with an empty value, which makes little sense.');
  }

  if (locale !== this.sourceLocale && !this.catalogs[locale]) {
    this.warn('You called setLocale() with "' + locale + '", but no translations for that locale has been added.');
  }

  this.locale = locale;
};
/**
 * Sets the default gettext domain.
 *
 * @example
 *     gt.setTextDomain('domainname')
 *
 * @param {String} domain  A gettext domain name
 */


Gettext.prototype.setTextDomain = function (domain) {
  if (typeof domain !== 'string') {
    this.warn('You called setTextDomain() with an argument of type ' + _typeof(domain) + '. ' + 'The domain must be a string.');
    return;
  }

  if (domain.trim() === '') {
    this.warn('You called setTextDomain() with an empty `domain` value.');
  }

  this.domain = domain;
};
/**
 * Translates a string using the default textdomain
 *
 * @example
 *     gt.gettext('Some text')
 *
 * @param  {String} msgid  String to be translated
 * @return {String} Translation or the original string if no translation was found
 */


Gettext.prototype.gettext = function (msgid) {
  return this.dnpgettext(this.domain, '', msgid);
};
/**
 * Translates a string using a specific domain
 *
 * @example
 *     gt.dgettext('domainname', 'Some text')
 *
 * @param  {String} domain  A gettext domain name
 * @param  {String} msgid   String to be translated
 * @return {String} Translation or the original string if no translation was found
 */


Gettext.prototype.dgettext = function (domain, msgid) {
  return this.dnpgettext(domain, '', msgid);
};
/**
 * Translates a plural string using the default textdomain
 *
 * @example
 *     gt.ngettext('One thing', 'Many things', numberOfThings)
 *
 * @param  {String} msgid        String to be translated when count is not plural
 * @param  {String} msgidPlural  String to be translated when count is plural
 * @param  {Number} count        Number count for the plural
 * @return {String} Translation or the original string if no translation was found
 */


Gettext.prototype.ngettext = function (msgid, msgidPlural, count) {
  return this.dnpgettext(this.domain, '', msgid, msgidPlural, count);
};
/**
 * Translates a plural string using a specific textdomain
 *
 * @example
 *     gt.dngettext('domainname', 'One thing', 'Many things', numberOfThings)
 *
 * @param  {String} domain       A gettext domain name
 * @param  {String} msgid        String to be translated when count is not plural
 * @param  {String} msgidPlural  String to be translated when count is plural
 * @param  {Number} count        Number count for the plural
 * @return {String} Translation or the original string if no translation was found
 */


Gettext.prototype.dngettext = function (domain, msgid, msgidPlural, count) {
  return this.dnpgettext(domain, '', msgid, msgidPlural, count);
};
/**
 * Translates a string from a specific context using the default textdomain
 *
 * @example
 *    gt.pgettext('sports', 'Back')
 *
 * @param  {String} msgctxt  Translation context
 * @param  {String} msgid    String to be translated
 * @return {String} Translation or the original string if no translation was found
 */


Gettext.prototype.pgettext = function (msgctxt, msgid) {
  return this.dnpgettext(this.domain, msgctxt, msgid);
};
/**
 * Translates a string from a specific context using s specific textdomain
 *
 * @example
 *     gt.dpgettext('domainname', 'sports', 'Back')
 *
 * @param  {String} domain   A gettext domain name
 * @param  {String} msgctxt  Translation context
 * @param  {String} msgid    String to be translated
 * @return {String} Translation or the original string if no translation was found
 */


Gettext.prototype.dpgettext = function (domain, msgctxt, msgid) {
  return this.dnpgettext(domain, msgctxt, msgid);
};
/**
 * Translates a plural string from a specific context using the default textdomain
 *
 * @example
 *     gt.npgettext('sports', 'Back', '%d backs', numberOfBacks)
 *
 * @param  {String} msgctxt      Translation context
 * @param  {String} msgid        String to be translated when count is not plural
 * @param  {String} msgidPlural  String to be translated when count is plural
 * @param  {Number} count        Number count for the plural
 * @return {String} Translation or the original string if no translation was found
 */


Gettext.prototype.npgettext = function (msgctxt, msgid, msgidPlural, count) {
  return this.dnpgettext(this.domain, msgctxt, msgid, msgidPlural, count);
};
/**
 * Translates a plural string from a specifi context using a specific textdomain
 *
 * @example
 *     gt.dnpgettext('domainname', 'sports', 'Back', '%d backs', numberOfBacks)
 *
 * @param  {String} domain       A gettext domain name
 * @param  {String} msgctxt      Translation context
 * @param  {String} msgid        String to be translated
 * @param  {String} msgidPlural  If no translation was found, return this on count!=1
 * @param  {Number} count        Number count for the plural
 * @return {String} Translation or the original string if no translation was found
 */


Gettext.prototype.dnpgettext = function (domain, msgctxt, msgid, msgidPlural, count) {
  var defaultTranslation = msgid;
  var translation;
  var index;
  msgctxt = msgctxt || '';

  if (!isNaN(count) && count !== 1) {
    defaultTranslation = msgidPlural || msgid;
  }

  translation = this._getTranslation(domain, msgctxt, msgid);

  if (translation) {
    if (typeof count === 'number') {
      var pluralsFunc = plurals[Gettext.getLanguageCode(this.locale)].pluralsFunc;
      index = pluralsFunc(count);

      if (typeof index === 'boolean') {
        index = index ? 1 : 0;
      }
    } else {
      index = 0;
    }

    return translation.msgstr[index] || defaultTranslation;
  } else if (!this.sourceLocale || this.locale !== this.sourceLocale) {
    this.warn('No translation was found for msgid "' + msgid + '" in msgctxt "' + msgctxt + '" and domain "' + domain + '"');
  }

  return defaultTranslation;
};
/**
 * Retrieves comments object for a translation. The comments object
 * has the shape `{ translator, extracted, reference, flag, previous }`.
 *
 * @example
 *     const comment = gt.getComment('domainname', 'sports', 'Backs')
 *
 * @private
 * @param  {String} domain   A gettext domain name
 * @param  {String} msgctxt  Translation context
 * @param  {String} msgid    String to be translated
 * @return {Object} Comments object or false if not found
 */


Gettext.prototype.getComment = function (domain, msgctxt, msgid) {
  var translation;
  translation = this._getTranslation(domain, msgctxt, msgid);

  if (translation) {
    return translation.comments || {};
  }

  return {};
};
/**
 * Retrieves translation object from the domain and context
 *
 * @private
 * @param  {String} domain   A gettext domain name
 * @param  {String} msgctxt  Translation context
 * @param  {String} msgid    String to be translated
 * @return {Object} Translation object or false if not found
 */


Gettext.prototype._getTranslation = function (domain, msgctxt, msgid) {
  msgctxt = msgctxt || '';
  return get(this.catalogs, [this.locale, domain, 'translations', msgctxt, msgid]);
};
/**
 * Returns the language code part of a locale
 *
 * @example
 *     Gettext.getLanguageCode('sv-SE')
 *     // -> "sv"
 *
 * @private
 * @param   {String} locale  A case-insensitive locale string
 * @returns {String} A language code
 */


Gettext.getLanguageCode = function (locale) {
  return locale.split(/[\-_]/)[0].toLowerCase();
};
/* C-style aliases */

/**
 * C-style alias for [setTextDomain](#gettextsettextdomaindomain)
 *
 * @see Gettext#setTextDomain
 */


Gettext.prototype.textdomain = function (domain) {
  if (this.debug) {
    console.warn('textdomain(domain) was used to set locales in node-gettext v1. ' + 'Make sure you are using it for domains, and switch to setLocale(locale) if you are not.\n\n ' + 'To read more about the migration from node-gettext v1 to v2, ' + 'see https://github.com/alexanderwallin/node-gettext/#migrating-from-1x-to-2x\n\n' + 'This warning will be removed in the final 2.0.0');
  }

  this.setTextDomain(domain);
};
/**
 * C-style alias for [setLocale](#gettextsetlocalelocale)
 *
 * @see Gettext#setLocale
 */


Gettext.prototype.setlocale = function (locale) {
  this.setLocale(locale);
};
/* Deprecated functions */

/**
 * This function will be removed in the final 2.0.0 release.
 *
 * @deprecated
 */


Gettext.prototype.addTextdomain = function () {
  console.error('addTextdomain() is deprecated.\n\n' + '* To add translations, use addTranslations()\n' + '* To set the default domain, use setTextDomain() (or its alias textdomain())\n' + '\n' + 'To read more about the migration from node-gettext v1 to v2, ' + 'see https://github.com/alexanderwallin/node-gettext/#migrating-from-1x-to-2x');
};

/***/ }),

/***/ "./node_modules/node-gettext/lib/plurals.js":
/*!**************************************************!*\
  !*** ./node_modules/node-gettext/lib/plurals.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  ach: {
    name: 'Acholi',
    examples: [{
      plural: 0,
      sample: 1
    }, {
      plural: 1,
      sample: 2
    }],
    nplurals: 2,
    pluralsText: 'nplurals = 2; plural = (n > 1)',
    pluralsFunc: function pluralsFunc(n) {
      return n > 1;
    }
  },
  af: {
    name: 'Afrikaans',
    examples: [{
      plural: 0,
      sample: 1
    }, {
      plural: 1,
      sample: 2
    }],
    nplurals: 2,
    pluralsText: 'nplurals = 2; plural = (n !== 1)',
    pluralsFunc: function pluralsFunc(n) {
      return n !== 1;
    }
  },
  ak: {
    name: 'Akan',
    examples: [{
      plural: 0,
      sample: 1
    }, {
      plural: 1,
      sample: 2
    }],
    nplurals: 2,
    pluralsText: 'nplurals = 2; plural = (n > 1)',
    pluralsFunc: function pluralsFunc(n) {
      return n > 1;
    }
  },
  am: {
    name: 'Amharic',
    examples: [{
      plural: 0,
      sample: 1
    }, {
      plural: 1,
      sample: 2
    }],
    nplurals: 2,
    pluralsText: 'nplurals = 2; plural = (n > 1)',
    pluralsFunc: function pluralsFunc(n) {
      return n > 1;
    }
  },
  an: {
    name: 'Aragonese',
    examples: [{
      plural: 0,
      sample: 1
    }, {
      plural: 1,
      sample: 2
    }],
    nplurals: 2,
    pluralsText: 'nplurals = 2; plural = (n !== 1)',
    pluralsFunc: function pluralsFunc(n) {
      return n !== 1;
    }
  },
  ar: {
    name: 'Arabic',
    examples: [{
      plural: 0,
      sample: 0
    }, {
      plural: 1,
      sample: 1
    }, {
      plural: 2,
      sample: 2
    }, {
      plural: 3,
      sample: 3
    }, {
      plural: 4,
      sample: 11
    }, {
      plural: 5,
      sample: 100
    }],
    nplurals: 6,
    pluralsText: 'nplurals = 6; plural = (n === 0 ? 0 : n === 1 ? 1 : n === 2 ? 2 : n % 100 >= 3 && n % 100 <= 10 ? 3 : n % 100 >= 11 ? 4 : 5)',
    pluralsFunc: function pluralsFunc(n) {
      return n === 0 ? 0 : n === 1 ? 1 : n === 2 ? 2 : n % 100 >= 3 && n % 100 <= 10 ? 3 : n % 100 >= 11 ? 4 : 5;
    }
  },
  arn: {
    name: 'Mapudungun',
    examples: [{
      plural: 0,
      sample: 1
    }, {
      plural: 1,
      sample: 2
    }],
    nplurals: 2,
    pluralsText: 'nplurals = 2; plural = (n > 1)',
    pluralsFunc: function pluralsFunc(n) {
      return n > 1;
    }
  },
  ast: {
    name: 'Asturian',
    examples: [{
      plural: 0,
      sample: 1
    }, {
      plural: 1,
      sample: 2
    }],
    nplurals: 2,
    pluralsText: 'nplurals = 2; plural = (n !== 1)',
    pluralsFunc: function pluralsFunc(n) {
      return n !== 1;
    }
  },
  ay: {
    name: 'Aymará',
    examples: [{
      plural: 0,
      sample: 1
    }],
    nplurals: 1,
    pluralsText: 'nplurals = 1; plural = 0',
    pluralsFunc: function pluralsFunc() {
      return 0;
    }
  },
  az: {
    name: 'Azerbaijani',
    examples: [{
      plural: 0,
      sample: 1
    }, {
      plural: 1,
      sample: 2
    }],
    nplurals: 2,
    pluralsText: 'nplurals = 2; plural = (n !== 1)',
    pluralsFunc: function pluralsFunc(n) {
      return n !== 1;
    }
  },
  be: {
    name: 'Belarusian',
    examples: [{
      plural: 0,
      sample: 1
    }, {
      plural: 1,
      sample: 2
    }, {
      plural: 2,
      sample: 5
    }],
    nplurals: 3,
    pluralsText: 'nplurals = 3; plural = (n % 10 === 1 && n % 100 !== 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2)',
    pluralsFunc: function pluralsFunc(n) {
      return n % 10 === 1 && n % 100 !== 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2;
    }
  },
  bg: {
    name: 'Bulgarian',
    examples: [{
      plural: 0,
      sample: 1
    }, {
      plural: 1,
      sample: 2
    }],
    nplurals: 2,
    pluralsText: 'nplurals = 2; plural = (n !== 1)',
    pluralsFunc: function pluralsFunc(n) {
      return n !== 1;
    }
  },
  bn: {
    name: 'Bengali',
    examples: [{
      plural: 0,
      sample: 1
    }, {
      plural: 1,
      sample: 2
    }],
    nplurals: 2,
    pluralsText: 'nplurals = 2; plural = (n !== 1)',
    pluralsFunc: function pluralsFunc(n) {
      return n !== 1;
    }
  },
  bo: {
    name: 'Tibetan',
    examples: [{
      plural: 0,
      sample: 1
    }],
    nplurals: 1,
    pluralsText: 'nplurals = 1; plural = 0',
    pluralsFunc: function pluralsFunc() {
      return 0;
    }
  },
  br: {
    name: 'Breton',
    examples: [{
      plural: 0,
      sample: 1
    }, {
      plural: 1,
      sample: 2
    }],
    nplurals: 2,
    pluralsText: 'nplurals = 2; plural = (n > 1)',
    pluralsFunc: function pluralsFunc(n) {
      return n > 1;
    }
  },
  brx: {
    name: 'Bodo',
    examples: [{
      plural: 0,
      sample: 1
    }, {
      plural: 1,
      sample: 2
    }],
    nplurals: 2,
    pluralsText: 'nplurals = 2; plural = (n !== 1)',
    pluralsFunc: function pluralsFunc(n) {
      return n !== 1;
    }
  },
  bs: {
    name: 'Bosnian',
    examples: [{
      plural: 0,
      sample: 1
    }, {
      plural: 1,
      sample: 2
    }, {
      plural: 2,
      sample: 5
    }],
    nplurals: 3,
    pluralsText: 'nplurals = 3; plural = (n % 10 === 1 && n % 100 !== 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2)',
    pluralsFunc: function pluralsFunc(n) {
      return n % 10 === 1 && n % 100 !== 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2;
    }
  },
  ca: {
    name: 'Catalan',
    examples: [{
      plural: 0,
      sample: 1
    }, {
      plural: 1,
      sample: 2
    }],
    nplurals: 2,
    pluralsText: 'nplurals = 2; plural = (n !== 1)',
    pluralsFunc: function pluralsFunc(n) {
      return n !== 1;
    }
  },
  cgg: {
    name: 'Chiga',
    examples: [{
      plural: 0,
      sample: 1
    }],
    nplurals: 1,
    pluralsText: 'nplurals = 1; plural = 0',
    pluralsFunc: function pluralsFunc() {
      return 0;
    }
  },
  cs: {
    name: 'Czech',
    examples: [{
      plural: 0,
      sample: 1
    }, {
      plural: 1,
      sample: 2
    }, {
      plural: 2,
      sample: 5
    }],
    nplurals: 3,
    pluralsText: 'nplurals = 3; plural = (n === 1 ? 0 : (n >= 2 && n <= 4) ? 1 : 2)',
    pluralsFunc: function pluralsFunc(n) {
      return n === 1 ? 0 : n >= 2 && n <= 4 ? 1 : 2;
    }
  },
  csb: {
    name: 'Kashubian',
    examples: [{
      plural: 0,
      sample: 1
    }, {
      plural: 1,
      sample: 2
    }, {
      plural: 2,
      sample: 5
    }],
    nplurals: 3,
    pluralsText: 'nplurals = 3; plural = (n === 1 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2)',
    pluralsFunc: function pluralsFunc(n) {
      return n === 1 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2;
    }
  },
  cy: {
    name: 'Welsh',
    examples: [{
      plural: 0,
      sample: 1
    }, {
      plural: 1,
      sample: 2
    }, {
      plural: 2,
      sample: 3
    }, {
      plural: 3,
      sample: 8
    }],
    nplurals: 4,
    pluralsText: 'nplurals = 4; plural = (n === 1 ? 0 : n === 2 ? 1 : (n !== 8 && n !== 11) ? 2 : 3)',
    pluralsFunc: function pluralsFunc(n) {
      return n === 1 ? 0 : n === 2 ? 1 : n !== 8 && n !== 11 ? 2 : 3;
    }
  },
  da: {
    name: 'Danish',
    examples: [{
      plural: 0,
      sample: 1
    }, {
      plural: 1,
      sample: 2
    }],
    nplurals: 2,
    pluralsText: 'nplurals = 2; plural = (n !== 1)',
    pluralsFunc: function pluralsFunc(n) {
      return n !== 1;
    }
  },
  de: {
    name: 'German',
    examples: [{
      plural: 0,
      sample: 1
    }, {
      plural: 1,
      sample: 2
    }],
    nplurals: 2,
    pluralsText: 'nplurals = 2; plural = (n !== 1)',
    pluralsFunc: function pluralsFunc(n) {
      return n !== 1;
    }
  },
  doi: {
    name: 'Dogri',
    examples: [{
      plural: 0,
      sample: 1
    }, {
      plural: 1,
      sample: 2
    }],
    nplurals: 2,
    pluralsText: 'nplurals = 2; plural = (n !== 1)',
    pluralsFunc: function pluralsFunc(n) {
      return n !== 1;
    }
  },
  dz: {
    name: 'Dzongkha',
    examples: [{
      plural: 0,
      sample: 1
    }],
    nplurals: 1,
    pluralsText: 'nplurals = 1; plural = 0',
    pluralsFunc: function pluralsFunc() {
      return 0;
    }
  },
  el: {
    name: 'Greek',
    examples: [{
      plural: 0,
      sample: 1
    }, {
      plural: 1,
      sample: 2
    }],
    nplurals: 2,
    pluralsText: 'nplurals = 2; plural = (n !== 1)',
    pluralsFunc: function pluralsFunc(n) {
      return n !== 1;
    }
  },
  en: {
    name: 'English',
    examples: [{
      plural: 0,
      sample: 1
    }, {
      plural: 1,
      sample: 2
    }],
    nplurals: 2,
    pluralsText: 'nplurals = 2; plural = (n !== 1)',
    pluralsFunc: function pluralsFunc(n) {
      return n !== 1;
    }
  },
  eo: {
    name: 'Esperanto',
    examples: [{
      plural: 0,
      sample: 1
    }, {
      plural: 1,
      sample: 2
    }],
    nplurals: 2,
    pluralsText: 'nplurals = 2; plural = (n !== 1)',
    pluralsFunc: function pluralsFunc(n) {
      return n !== 1;
    }
  },
  es: {
    name: 'Spanish',
    examples: [{
      plural: 0,
      sample: 1
    }, {
      plural: 1,
      sample: 2
    }],
    nplurals: 2,
    pluralsText: 'nplurals = 2; plural = (n !== 1)',
    pluralsFunc: function pluralsFunc(n) {
      return n !== 1;
    }
  },
  et: {
    name: 'Estonian',
    examples: [{
      plural: 0,
      sample: 1
    }, {
      plural: 1,
      sample: 2
    }],
    nplurals: 2,
    pluralsText: 'nplurals = 2; plural = (n !== 1)',
    pluralsFunc: function pluralsFunc(n) {
      return n !== 1;
    }
  },
  eu: {
    name: 'Basque',
    examples: [{
      plural: 0,
      sample: 1
    }, {
      plural: 1,
      sample: 2
    }],
    nplurals: 2,
    pluralsText: 'nplurals = 2; plural = (n !== 1)',
    pluralsFunc: function pluralsFunc(n) {
      return n !== 1;
    }
  },
  fa: {
    name: 'Persian',
    examples: [{
      plural: 0,
      sample: 1
    }],
    nplurals: 1,
    pluralsText: 'nplurals = 1; plural = 0',
    pluralsFunc: function pluralsFunc() {
      return 0;
    }
  },
  ff: {
    name: 'Fulah',
    examples: [{
      plural: 0,
      sample: 1
    }, {
      plural: 1,
      sample: 2
    }],
    nplurals: 2,
    pluralsText: 'nplurals = 2; plural = (n !== 1)',
    pluralsFunc: function pluralsFunc(n) {
      return n !== 1;
    }
  },
  fi: {
    name: 'Finnish',
    examples: [{
      plural: 0,
      sample: 1
    }, {
      plural: 1,
      sample: 2
    }],
    nplurals: 2,
    pluralsText: 'nplurals = 2; plural = (n !== 1)',
    pluralsFunc: function pluralsFunc(n) {
      return n !== 1;
    }
  },
  fil: {
    name: 'Filipino',
    examples: [{
      plural: 0,
      sample: 1
    }, {
      plural: 1,
      sample: 2
    }],
    nplurals: 2,
    pluralsText: 'nplurals = 2; plural = (n > 1)',
    pluralsFunc: function pluralsFunc(n) {
      return n > 1;
    }
  },
  fo: {
    name: 'Faroese',
    examples: [{
      plural: 0,
      sample: 1
    }, {
      plural: 1,
      sample: 2
    }],
    nplurals: 2,
    pluralsText: 'nplurals = 2; plural = (n !== 1)',
    pluralsFunc: function pluralsFunc(n) {
      return n !== 1;
    }
  },
  fr: {
    name: 'French',
    examples: [{
      plural: 0,
      sample: 1
    }, {
      plural: 1,
      sample: 2
    }],
    nplurals: 2,
    pluralsText: 'nplurals = 2; plural = (n > 1)',
    pluralsFunc: function pluralsFunc(n) {
      return n > 1;
    }
  },
  fur: {
    name: 'Friulian',
    examples: [{
      plural: 0,
      sample: 1
    }, {
      plural: 1,
      sample: 2
    }],
    nplurals: 2,
    pluralsText: 'nplurals = 2; plural = (n !== 1)',
    pluralsFunc: function pluralsFunc(n) {
      return n !== 1;
    }
  },
  fy: {
    name: 'Frisian',
    examples: [{
      plural: 0,
      sample: 1
    }, {
      plural: 1,
      sample: 2
    }],
    nplurals: 2,
    pluralsText: 'nplurals = 2; plural = (n !== 1)',
    pluralsFunc: function pluralsFunc(n) {
      return n !== 1;
    }
  },
  ga: {
    name: 'Irish',
    examples: [{
      plural: 0,
      sample: 1
    }, {
      plural: 1,
      sample: 2
    }, {
      plural: 2,
      sample: 3
    }, {
      plural: 3,
      sample: 7
    }, {
      plural: 4,
      sample: 11
    }],
    nplurals: 5,
    pluralsText: 'nplurals = 5; plural = (n === 1 ? 0 : n === 2 ? 1 : n < 7 ? 2 : n < 11 ? 3 : 4)',
    pluralsFunc: function pluralsFunc(n) {
      return n === 1 ? 0 : n === 2 ? 1 : n < 7 ? 2 : n < 11 ? 3 : 4;
    }
  },
  gd: {
    name: 'Scottish Gaelic',
    examples: [{
      plural: 0,
      sample: 1
    }, {
      plural: 1,
      sample: 2
    }, {
      plural: 2,
      sample: 3
    }, {
      plural: 3,
      sample: 20
    }],
    nplurals: 4,
    pluralsText: 'nplurals = 4; plural = ((n === 1 || n === 11) ? 0 : (n === 2 || n === 12) ? 1 : (n > 2 && n < 20) ? 2 : 3)',
    pluralsFunc: function pluralsFunc(n) {
      return n === 1 || n === 11 ? 0 : n === 2 || n === 12 ? 1 : n > 2 && n < 20 ? 2 : 3;
    }
  },
  gl: {
    name: 'Galician',
    examples: [{
      plural: 0,
      sample: 1
    }, {
      plural: 1,
      sample: 2
    }],
    nplurals: 2,
    pluralsText: 'nplurals = 2; plural = (n !== 1)',
    pluralsFunc: function pluralsFunc(n) {
      return n !== 1;
    }
  },
  gu: {
    name: 'Gujarati',
    examples: [{
      plural: 0,
      sample: 1
    }, {
      plural: 1,
      sample: 2
    }],
    nplurals: 2,
    pluralsText: 'nplurals = 2; plural = (n !== 1)',
    pluralsFunc: function pluralsFunc(n) {
      return n !== 1;
    }
  },
  gun: {
    name: 'Gun',
    examples: [{
      plural: 0,
      sample: 1
    }, {
      plural: 1,
      sample: 2
    }],
    nplurals: 2,
    pluralsText: 'nplurals = 2; plural = (n > 1)',
    pluralsFunc: function pluralsFunc(n) {
      return n > 1;
    }
  },
  ha: {
    name: 'Hausa',
    examples: [{
      plural: 0,
      sample: 1
    }, {
      plural: 1,
      sample: 2
    }],
    nplurals: 2,
    pluralsText: 'nplurals = 2; plural = (n !== 1)',
    pluralsFunc: function pluralsFunc(n) {
      return n !== 1;
    }
  },
  he: {
    name: 'Hebrew',
    examples: [{
      plural: 0,
      sample: 1
    }, {
      plural: 1,
      sample: 2
    }],
    nplurals: 2,
    pluralsText: 'nplurals = 2; plural = (n !== 1)',
    pluralsFunc: function pluralsFunc(n) {
      return n !== 1;
    }
  },
  hi: {
    name: 'Hindi',
    examples: [{
      plural: 0,
      sample: 1
    }, {
      plural: 1,
      sample: 2
    }],
    nplurals: 2,
    pluralsText: 'nplurals = 2; plural = (n !== 1)',
    pluralsFunc: function pluralsFunc(n) {
      return n !== 1;
    }
  },
  hne: {
    name: 'Chhattisgarhi',
    examples: [{
      plural: 0,
      sample: 1
    }, {
      plural: 1,
      sample: 2
    }],
    nplurals: 2,
    pluralsText: 'nplurals = 2; plural = (n !== 1)',
    pluralsFunc: function pluralsFunc(n) {
      return n !== 1;
    }
  },
  hr: {
    name: 'Croatian',
    examples: [{
      plural: 0,
      sample: 1
    }, {
      plural: 1,
      sample: 2
    }, {
      plural: 2,
      sample: 5
    }],
    nplurals: 3,
    pluralsText: 'nplurals = 3; plural = (n % 10 === 1 && n % 100 !== 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2)',
    pluralsFunc: function pluralsFunc(n) {
      return n % 10 === 1 && n % 100 !== 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2;
    }
  },
  hu: {
    name: 'Hungarian',
    examples: [{
      plural: 0,
      sample: 1
    }, {
      plural: 1,
      sample: 2
    }],
    nplurals: 2,
    pluralsText: 'nplurals = 2; plural = (n !== 1)',
    pluralsFunc: function pluralsFunc(n) {
      return n !== 1;
    }
  },
  hy: {
    name: 'Armenian',
    examples: [{
      plural: 0,
      sample: 1
    }, {
      plural: 1,
      sample: 2
    }],
    nplurals: 2,
    pluralsText: 'nplurals = 2; plural = (n !== 1)',
    pluralsFunc: function pluralsFunc(n) {
      return n !== 1;
    }
  },
  id: {
    name: 'Indonesian',
    examples: [{
      plural: 0,
      sample: 1
    }],
    nplurals: 1,
    pluralsText: 'nplurals = 1; plural = 0',
    pluralsFunc: function pluralsFunc() {
      return 0;
    }
  },
  is: {
    name: 'Icelandic',
    examples: [{
      plural: 0,
      sample: 1
    }, {
      plural: 1,
      sample: 2
    }],
    nplurals: 2,
    pluralsText: 'nplurals = 2; plural = (n % 10 !== 1 || n % 100 === 11)',
    pluralsFunc: function pluralsFunc(n) {
      return n % 10 !== 1 || n % 100 === 11;
    }
  },
  it: {
    name: 'Italian',
    examples: [{
      plural: 0,
      sample: 1
    }, {
      plural: 1,
      sample: 2
    }],
    nplurals: 2,
    pluralsText: 'nplurals = 2; plural = (n !== 1)',
    pluralsFunc: function pluralsFunc(n) {
      return n !== 1;
    }
  },
  ja: {
    name: 'Japanese',
    examples: [{
      plural: 0,
      sample: 1
    }],
    nplurals: 1,
    pluralsText: 'nplurals = 1; plural = 0',
    pluralsFunc: function pluralsFunc() {
      return 0;
    }
  },
  jbo: {
    name: 'Lojban',
    examples: [{
      plural: 0,
      sample: 1
    }],
    nplurals: 1,
    pluralsText: 'nplurals = 1; plural = 0',
    pluralsFunc: function pluralsFunc() {
      return 0;
    }
  },
  jv: {
    name: 'Javanese',
    examples: [{
      plural: 0,
      sample: 0
    }, {
      plural: 1,
      sample: 1
    }],
    nplurals: 2,
    pluralsText: 'nplurals = 2; plural = (n !== 0)',
    pluralsFunc: function pluralsFunc(n) {
      return n !== 0;
    }
  },
  ka: {
    name: 'Georgian',
    examples: [{
      plural: 0,
      sample: 1
    }],
    nplurals: 1,
    pluralsText: 'nplurals = 1; plural = 0',
    pluralsFunc: function pluralsFunc() {
      return 0;
    }
  },
  kk: {
    name: 'Kazakh',
    examples: [{
      plural: 0,
      sample: 1
    }],
    nplurals: 1,
    pluralsText: 'nplurals = 1; plural = 0',
    pluralsFunc: function pluralsFunc() {
      return 0;
    }
  },
  km: {
    name: 'Khmer',
    examples: [{
      plural: 0,
      sample: 1
    }],
    nplurals: 1,
    pluralsText: 'nplurals = 1; plural = 0',
    pluralsFunc: function pluralsFunc() {
      return 0;
    }
  },
  kn: {
    name: 'Kannada',
    examples: [{
      plural: 0,
      sample: 1
    }, {
      plural: 1,
      sample: 2
    }],
    nplurals: 2,
    pluralsText: 'nplurals = 2; plural = (n !== 1)',
    pluralsFunc: function pluralsFunc(n) {
      return n !== 1;
    }
  },
  ko: {
    name: 'Korean',
    examples: [{
      plural: 0,
      sample: 1
    }],
    nplurals: 1,
    pluralsText: 'nplurals = 1; plural = 0',
    pluralsFunc: function pluralsFunc() {
      return 0;
    }
  },
  ku: {
    name: 'Kurdish',
    examples: [{
      plural: 0,
      sample: 1
    }, {
      plural: 1,
      sample: 2
    }],
    nplurals: 2,
    pluralsText: 'nplurals = 2; plural = (n !== 1)',
    pluralsFunc: function pluralsFunc(n) {
      return n !== 1;
    }
  },
  kw: {
    name: 'Cornish',
    examples: [{
      plural: 0,
      sample: 1
    }, {
      plural: 1,
      sample: 2
    }, {
      plural: 2,
      sample: 3
    }, {
      plural: 3,
      sample: 4
    }],
    nplurals: 4,
    pluralsText: 'nplurals = 4; plural = (n === 1 ? 0 : n === 2 ? 1 : n === 3 ? 2 : 3)',
    pluralsFunc: function pluralsFunc(n) {
      return n === 1 ? 0 : n === 2 ? 1 : n === 3 ? 2 : 3;
    }
  },
  ky: {
    name: 'Kyrgyz',
    examples: [{
      plural: 0,
      sample: 1
    }],
    nplurals: 1,
    pluralsText: 'nplurals = 1; plural = 0',
    pluralsFunc: function pluralsFunc() {
      return 0;
    }
  },
  lb: {
    name: 'Letzeburgesch',
    examples: [{
      plural: 0,
      sample: 1
    }, {
      plural: 1,
      sample: 2
    }],
    nplurals: 2,
    pluralsText: 'nplurals = 2; plural = (n !== 1)',
    pluralsFunc: function pluralsFunc(n) {
      return n !== 1;
    }
  },
  ln: {
    name: 'Lingala',
    examples: [{
      plural: 0,
      sample: 1
    }, {
      plural: 1,
      sample: 2
    }],
    nplurals: 2,
    pluralsText: 'nplurals = 2; plural = (n > 1)',
    pluralsFunc: function pluralsFunc(n) {
      return n > 1;
    }
  },
  lo: {
    name: 'Lao',
    examples: [{
      plural: 0,
      sample: 1
    }],
    nplurals: 1,
    pluralsText: 'nplurals = 1; plural = 0',
    pluralsFunc: function pluralsFunc() {
      return 0;
    }
  },
  lt: {
    name: 'Lithuanian',
    examples: [{
      plural: 0,
      sample: 1
    }, {
      plural: 1,
      sample: 2
    }, {
      plural: 2,
      sample: 10
    }],
    nplurals: 3,
    pluralsText: 'nplurals = 3; plural = (n % 10 === 1 && n % 100 !== 11 ? 0 : n % 10 >= 2 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2)',
    pluralsFunc: function pluralsFunc(n) {
      return n % 10 === 1 && n % 100 !== 11 ? 0 : n % 10 >= 2 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2;
    }
  },
  lv: {
    name: 'Latvian',
    examples: [{
      plural: 2,
      sample: 0
    }, {
      plural: 0,
      sample: 1
    }, {
      plural: 1,
      sample: 2
    }],
    nplurals: 3,
    pluralsText: 'nplurals = 3; plural = (n % 10 === 1 && n % 100 !== 11 ? 0 : n !== 0 ? 1 : 2)',
    pluralsFunc: function pluralsFunc(n) {
      return n % 10 === 1 && n % 100 !== 11 ? 0 : n !== 0 ? 1 : 2;
    }
  },
  mai: {
    name: 'Maithili',
    examples: [{
      plural: 0,
      sample: 1
    }, {
      plural: 1,
      sample: 2
    }],
    nplurals: 2,
    pluralsText: 'nplurals = 2; plural = (n !== 1)',
    pluralsFunc: function pluralsFunc(n) {
      return n !== 1;
    }
  },
  mfe: {
    name: 'Mauritian Creole',
    examples: [{
      plural: 0,
      sample: 1
    }, {
      plural: 1,
      sample: 2
    }],
    nplurals: 2,
    pluralsText: 'nplurals = 2; plural = (n > 1)',
    pluralsFunc: function pluralsFunc(n) {
      return n > 1;
    }
  },
  mg: {
    name: 'Malagasy',
    examples: [{
      plural: 0,
      sample: 1
    }, {
      plural: 1,
      sample: 2
    }],
    nplurals: 2,
    pluralsText: 'nplurals = 2; plural = (n > 1)',
    pluralsFunc: function pluralsFunc(n) {
      return n > 1;
    }
  },
  mi: {
    name: 'Maori',
    examples: [{
      plural: 0,
      sample: 1
    }, {
      plural: 1,
      sample: 2
    }],
    nplurals: 2,
    pluralsText: 'nplurals = 2; plural = (n > 1)',
    pluralsFunc: function pluralsFunc(n) {
      return n > 1;
    }
  },
  mk: {
    name: 'Macedonian',
    examples: [{
      plural: 0,
      sample: 1
    }, {
      plural: 1,
      sample: 2
    }],
    nplurals: 2,
    pluralsText: 'nplurals = 2; plural = (n === 1 || n % 10 === 1 ? 0 : 1)',
    pluralsFunc: function pluralsFunc(n) {
      return n === 1 || n % 10 === 1 ? 0 : 1;
    }
  },
  ml: {
    name: 'Malayalam',
    examples: [{
      plural: 0,
      sample: 1
    }, {
      plural: 1,
      sample: 2
    }],
    nplurals: 2,
    pluralsText: 'nplurals = 2; plural = (n !== 1)',
    pluralsFunc: function pluralsFunc(n) {
      return n !== 1;
    }
  },
  mn: {
    name: 'Mongolian',
    examples: [{
      plural: 0,
      sample: 1
    }, {
      plural: 1,
      sample: 2
    }],
    nplurals: 2,
    pluralsText: 'nplurals = 2; plural = (n !== 1)',
    pluralsFunc: function pluralsFunc(n) {
      return n !== 1;
    }
  },
  mni: {
    name: 'Manipuri',
    examples: [{
      plural: 0,
      sample: 1
    }, {
      plural: 1,
      sample: 2
    }],
    nplurals: 2,
    pluralsText: 'nplurals = 2; plural = (n !== 1)',
    pluralsFunc: function pluralsFunc(n) {
      return n !== 1;
    }
  },
  mnk: {
    name: 'Mandinka',
    examples: [{
      plural: 0,
      sample: 0
    }, {
      plural: 1,
      sample: 1
    }, {
      plural: 2,
      sample: 2
    }],
    nplurals: 3,
    pluralsText: 'nplurals = 3; plural = (n === 0 ? 0 : n === 1 ? 1 : 2)',
    pluralsFunc: function pluralsFunc(n) {
      return n === 0 ? 0 : n === 1 ? 1 : 2;
    }
  },
  mr: {
    name: 'Marathi',
    examples: [{
      plural: 0,
      sample: 1
    }, {
      plural: 1,
      sample: 2
    }],
    nplurals: 2,
    pluralsText: 'nplurals = 2; plural = (n !== 1)',
    pluralsFunc: function pluralsFunc(n) {
      return n !== 1;
    }
  },
  ms: {
    name: 'Malay',
    examples: [{
      plural: 0,
      sample: 1
    }],
    nplurals: 1,
    pluralsText: 'nplurals = 1; plural = 0',
    pluralsFunc: function pluralsFunc() {
      return 0;
    }
  },
  mt: {
    name: 'Maltese',
    examples: [{
      plural: 0,
      sample: 1
    }, {
      plural: 1,
      sample: 2
    }, {
      plural: 2,
      sample: 11
    }, {
      plural: 3,
      sample: 20
    }],
    nplurals: 4,
    pluralsText: 'nplurals = 4; plural = (n === 1 ? 0 : n === 0 || ( n % 100 > 1 && n % 100 < 11) ? 1 : (n % 100 > 10 && n % 100 < 20 ) ? 2 : 3)',
    pluralsFunc: function pluralsFunc(n) {
      return n === 1 ? 0 : n === 0 || n % 100 > 1 && n % 100 < 11 ? 1 : n % 100 > 10 && n % 100 < 20 ? 2 : 3;
    }
  },
  my: {
    name: 'Burmese',
    examples: [{
      plural: 0,
      sample: 1
    }],
    nplurals: 1,
    pluralsText: 'nplurals = 1; plural = 0',
    pluralsFunc: function pluralsFunc() {
      return 0;
    }
  },
  nah: {
    name: 'Nahuatl',
    examples: [{
      plural: 0,
      sample: 1
    }, {
      plural: 1,
      sample: 2
    }],
    nplurals: 2,
    pluralsText: 'nplurals = 2; plural = (n !== 1)',
    pluralsFunc: function pluralsFunc(n) {
      return n !== 1;
    }
  },
  nap: {
    name: 'Neapolitan',
    examples: [{
      plural: 0,
      sample: 1
    }, {
      plural: 1,
      sample: 2
    }],
    nplurals: 2,
    pluralsText: 'nplurals = 2; plural = (n !== 1)',
    pluralsFunc: function pluralsFunc(n) {
      return n !== 1;
    }
  },
  nb: {
    name: 'Norwegian Bokmal',
    examples: [{
      plural: 0,
      sample: 1
    }, {
      plural: 1,
      sample: 2
    }],
    nplurals: 2,
    pluralsText: 'nplurals = 2; plural = (n !== 1)',
    pluralsFunc: function pluralsFunc(n) {
      return n !== 1;
    }
  },
  ne: {
    name: 'Nepali',
    examples: [{
      plural: 0,
      sample: 1
    }, {
      plural: 1,
      sample: 2
    }],
    nplurals: 2,
    pluralsText: 'nplurals = 2; plural = (n !== 1)',
    pluralsFunc: function pluralsFunc(n) {
      return n !== 1;
    }
  },
  nl: {
    name: 'Dutch',
    examples: [{
      plural: 0,
      sample: 1
    }, {
      plural: 1,
      sample: 2
    }],
    nplurals: 2,
    pluralsText: 'nplurals = 2; plural = (n !== 1)',
    pluralsFunc: function pluralsFunc(n) {
      return n !== 1;
    }
  },
  nn: {
    name: 'Norwegian Nynorsk',
    examples: [{
      plural: 0,
      sample: 1
    }, {
      plural: 1,
      sample: 2
    }],
    nplurals: 2,
    pluralsText: 'nplurals = 2; plural = (n !== 1)',
    pluralsFunc: function pluralsFunc(n) {
      return n !== 1;
    }
  },
  no: {
    name: 'Norwegian',
    examples: [{
      plural: 0,
      sample: 1
    }, {
      plural: 1,
      sample: 2
    }],
    nplurals: 2,
    pluralsText: 'nplurals = 2; plural = (n !== 1)',
    pluralsFunc: function pluralsFunc(n) {
      return n !== 1;
    }
  },
  nso: {
    name: 'Northern Sotho',
    examples: [{
      plural: 0,
      sample: 1
    }, {
      plural: 1,
      sample: 2
    }],
    nplurals: 2,
    pluralsText: 'nplurals = 2; plural = (n !== 1)',
    pluralsFunc: function pluralsFunc(n) {
      return n !== 1;
    }
  },
  oc: {
    name: 'Occitan',
    examples: [{
      plural: 0,
      sample: 1
    }, {
      plural: 1,
      sample: 2
    }],
    nplurals: 2,
    pluralsText: 'nplurals = 2; plural = (n > 1)',
    pluralsFunc: function pluralsFunc(n) {
      return n > 1;
    }
  },
  or: {
    name: 'Oriya',
    examples: [{
      plural: 0,
      sample: 1
    }, {
      plural: 1,
      sample: 2
    }],
    nplurals: 2,
    pluralsText: 'nplurals = 2; plural = (n !== 1)',
    pluralsFunc: function pluralsFunc(n) {
      return n !== 1;
    }
  },
  pa: {
    name: 'Punjabi',
    examples: [{
      plural: 0,
      sample: 1
    }, {
      plural: 1,
      sample: 2
    }],
    nplurals: 2,
    pluralsText: 'nplurals = 2; plural = (n !== 1)',
    pluralsFunc: function pluralsFunc(n) {
      return n !== 1;
    }
  },
  pap: {
    name: 'Papiamento',
    examples: [{
      plural: 0,
      sample: 1
    }, {
      plural: 1,
      sample: 2
    }],
    nplurals: 2,
    pluralsText: 'nplurals = 2; plural = (n !== 1)',
    pluralsFunc: function pluralsFunc(n) {
      return n !== 1;
    }
  },
  pl: {
    name: 'Polish',
    examples: [{
      plural: 0,
      sample: 1
    }, {
      plural: 1,
      sample: 2
    }, {
      plural: 2,
      sample: 5
    }],
    nplurals: 3,
    pluralsText: 'nplurals = 3; plural = (n === 1 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2)',
    pluralsFunc: function pluralsFunc(n) {
      return n === 1 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2;
    }
  },
  pms: {
    name: 'Piemontese',
    examples: [{
      plural: 0,
      sample: 1
    }, {
      plural: 1,
      sample: 2
    }],
    nplurals: 2,
    pluralsText: 'nplurals = 2; plural = (n !== 1)',
    pluralsFunc: function pluralsFunc(n) {
      return n !== 1;
    }
  },
  ps: {
    name: 'Pashto',
    examples: [{
      plural: 0,
      sample: 1
    }, {
      plural: 1,
      sample: 2
    }],
    nplurals: 2,
    pluralsText: 'nplurals = 2; plural = (n !== 1)',
    pluralsFunc: function pluralsFunc(n) {
      return n !== 1;
    }
  },
  pt: {
    name: 'Portuguese',
    examples: [{
      plural: 0,
      sample: 1
    }, {
      plural: 1,
      sample: 2
    }],
    nplurals: 2,
    pluralsText: 'nplurals = 2; plural = (n !== 1)',
    pluralsFunc: function pluralsFunc(n) {
      return n !== 1;
    }
  },
  rm: {
    name: 'Romansh',
    examples: [{
      plural: 0,
      sample: 1
    }, {
      plural: 1,
      sample: 2
    }],
    nplurals: 2,
    pluralsText: 'nplurals = 2; plural = (n !== 1)',
    pluralsFunc: function pluralsFunc(n) {
      return n !== 1;
    }
  },
  ro: {
    name: 'Romanian',
    examples: [{
      plural: 0,
      sample: 1
    }, {
      plural: 1,
      sample: 2
    }, {
      plural: 2,
      sample: 20
    }],
    nplurals: 3,
    pluralsText: 'nplurals = 3; plural = (n === 1 ? 0 : (n === 0 || (n % 100 > 0 && n % 100 < 20)) ? 1 : 2)',
    pluralsFunc: function pluralsFunc(n) {
      return n === 1 ? 0 : n === 0 || n % 100 > 0 && n % 100 < 20 ? 1 : 2;
    }
  },
  ru: {
    name: 'Russian',
    examples: [{
      plural: 0,
      sample: 1
    }, {
      plural: 1,
      sample: 2
    }, {
      plural: 2,
      sample: 5
    }],
    nplurals: 3,
    pluralsText: 'nplurals = 3; plural = (n % 10 === 1 && n % 100 !== 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2)',
    pluralsFunc: function pluralsFunc(n) {
      return n % 10 === 1 && n % 100 !== 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2;
    }
  },
  rw: {
    name: 'Kinyarwanda',
    examples: [{
      plural: 0,
      sample: 1
    }, {
      plural: 1,
      sample: 2
    }],
    nplurals: 2,
    pluralsText: 'nplurals = 2; plural = (n !== 1)',
    pluralsFunc: function pluralsFunc(n) {
      return n !== 1;
    }
  },
  sah: {
    name: 'Yakut',
    examples: [{
      plural: 0,
      sample: 1
    }],
    nplurals: 1,
    pluralsText: 'nplurals = 1; plural = 0',
    pluralsFunc: function pluralsFunc() {
      return 0;
    }
  },
  sat: {
    name: 'Santali',
    examples: [{
      plural: 0,
      sample: 1
    }, {
      plural: 1,
      sample: 2
    }],
    nplurals: 2,
    pluralsText: 'nplurals = 2; plural = (n !== 1)',
    pluralsFunc: function pluralsFunc(n) {
      return n !== 1;
    }
  },
  sco: {
    name: 'Scots',
    examples: [{
      plural: 0,
      sample: 1
    }, {
      plural: 1,
      sample: 2
    }],
    nplurals: 2,
    pluralsText: 'nplurals = 2; plural = (n !== 1)',
    pluralsFunc: function pluralsFunc(n) {
      return n !== 1;
    }
  },
  sd: {
    name: 'Sindhi',
    examples: [{
      plural: 0,
      sample: 1
    }, {
      plural: 1,
      sample: 2
    }],
    nplurals: 2,
    pluralsText: 'nplurals = 2; plural = (n !== 1)',
    pluralsFunc: function pluralsFunc(n) {
      return n !== 1;
    }
  },
  se: {
    name: 'Northern Sami',
    examples: [{
      plural: 0,
      sample: 1
    }, {
      plural: 1,
      sample: 2
    }],
    nplurals: 2,
    pluralsText: 'nplurals = 2; plural = (n !== 1)',
    pluralsFunc: function pluralsFunc(n) {
      return n !== 1;
    }
  },
  si: {
    name: 'Sinhala',
    examples: [{
      plural: 0,
      sample: 1
    }, {
      plural: 1,
      sample: 2
    }],
    nplurals: 2,
    pluralsText: 'nplurals = 2; plural = (n !== 1)',
    pluralsFunc: function pluralsFunc(n) {
      return n !== 1;
    }
  },
  sk: {
    name: 'Slovak',
    examples: [{
      plural: 0,
      sample: 1
    }, {
      plural: 1,
      sample: 2
    }, {
      plural: 2,
      sample: 5
    }],
    nplurals: 3,
    pluralsText: 'nplurals = 3; plural = (n === 1 ? 0 : (n >= 2 && n <= 4) ? 1 : 2)',
    pluralsFunc: function pluralsFunc(n) {
      return n === 1 ? 0 : n >= 2 && n <= 4 ? 1 : 2;
    }
  },
  sl: {
    name: 'Slovenian',
    examples: [{
      plural: 0,
      sample: 1
    }, {
      plural: 1,
      sample: 2
    }, {
      plural: 2,
      sample: 3
    }, {
      plural: 3,
      sample: 5
    }],
    nplurals: 4,
    pluralsText: 'nplurals = 4; plural = (n % 100 === 1 ? 0 : n % 100 === 2 ? 1 : n % 100 === 3 || n % 100 === 4 ? 2 : 3)',
    pluralsFunc: function pluralsFunc(n) {
      return n % 100 === 1 ? 0 : n % 100 === 2 ? 1 : n % 100 === 3 || n % 100 === 4 ? 2 : 3;
    }
  },
  so: {
    name: 'Somali',
    examples: [{
      plural: 0,
      sample: 1
    }, {
      plural: 1,
      sample: 2
    }],
    nplurals: 2,
    pluralsText: 'nplurals = 2; plural = (n !== 1)',
    pluralsFunc: function pluralsFunc(n) {
      return n !== 1;
    }
  },
  son: {
    name: 'Songhay',
    examples: [{
      plural: 0,
      sample: 1
    }, {
      plural: 1,
      sample: 2
    }],
    nplurals: 2,
    pluralsText: 'nplurals = 2; plural = (n !== 1)',
    pluralsFunc: function pluralsFunc(n) {
      return n !== 1;
    }
  },
  sq: {
    name: 'Albanian',
    examples: [{
      plural: 0,
      sample: 1
    }, {
      plural: 1,
      sample: 2
    }],
    nplurals: 2,
    pluralsText: 'nplurals = 2; plural = (n !== 1)',
    pluralsFunc: function pluralsFunc(n) {
      return n !== 1;
    }
  },
  sr: {
    name: 'Serbian',
    examples: [{
      plural: 0,
      sample: 1
    }, {
      plural: 1,
      sample: 2
    }, {
      plural: 2,
      sample: 5
    }],
    nplurals: 3,
    pluralsText: 'nplurals = 3; plural = (n % 10 === 1 && n % 100 !== 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2)',
    pluralsFunc: function pluralsFunc(n) {
      return n % 10 === 1 && n % 100 !== 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2;
    }
  },
  su: {
    name: 'Sundanese',
    examples: [{
      plural: 0,
      sample: 1
    }],
    nplurals: 1,
    pluralsText: 'nplurals = 1; plural = 0',
    pluralsFunc: function pluralsFunc() {
      return 0;
    }
  },
  sv: {
    name: 'Swedish',
    examples: [{
      plural: 0,
      sample: 1
    }, {
      plural: 1,
      sample: 2
    }],
    nplurals: 2,
    pluralsText: 'nplurals = 2; plural = (n !== 1)',
    pluralsFunc: function pluralsFunc(n) {
      return n !== 1;
    }
  },
  sw: {
    name: 'Swahili',
    examples: [{
      plural: 0,
      sample: 1
    }, {
      plural: 1,
      sample: 2
    }],
    nplurals: 2,
    pluralsText: 'nplurals = 2; plural = (n !== 1)',
    pluralsFunc: function pluralsFunc(n) {
      return n !== 1;
    }
  },
  ta: {
    name: 'Tamil',
    examples: [{
      plural: 0,
      sample: 1
    }, {
      plural: 1,
      sample: 2
    }],
    nplurals: 2,
    pluralsText: 'nplurals = 2; plural = (n !== 1)',
    pluralsFunc: function pluralsFunc(n) {
      return n !== 1;
    }
  },
  te: {
    name: 'Telugu',
    examples: [{
      plural: 0,
      sample: 1
    }, {
      plural: 1,
      sample: 2
    }],
    nplurals: 2,
    pluralsText: 'nplurals = 2; plural = (n !== 1)',
    pluralsFunc: function pluralsFunc(n) {
      return n !== 1;
    }
  },
  tg: {
    name: 'Tajik',
    examples: [{
      plural: 0,
      sample: 1
    }, {
      plural: 1,
      sample: 2
    }],
    nplurals: 2,
    pluralsText: 'nplurals = 2; plural = (n > 1)',
    pluralsFunc: function pluralsFunc(n) {
      return n > 1;
    }
  },
  th: {
    name: 'Thai',
    examples: [{
      plural: 0,
      sample: 1
    }],
    nplurals: 1,
    pluralsText: 'nplurals = 1; plural = 0',
    pluralsFunc: function pluralsFunc() {
      return 0;
    }
  },
  ti: {
    name: 'Tigrinya',
    examples: [{
      plural: 0,
      sample: 1
    }, {
      plural: 1,
      sample: 2
    }],
    nplurals: 2,
    pluralsText: 'nplurals = 2; plural = (n > 1)',
    pluralsFunc: function pluralsFunc(n) {
      return n > 1;
    }
  },
  tk: {
    name: 'Turkmen',
    examples: [{
      plural: 0,
      sample: 1
    }, {
      plural: 1,
      sample: 2
    }],
    nplurals: 2,
    pluralsText: 'nplurals = 2; plural = (n !== 1)',
    pluralsFunc: function pluralsFunc(n) {
      return n !== 1;
    }
  },
  tr: {
    name: 'Turkish',
    examples: [{
      plural: 0,
      sample: 1
    }, {
      plural: 1,
      sample: 2
    }],
    nplurals: 2,
    pluralsText: 'nplurals = 2; plural = (n > 1)',
    pluralsFunc: function pluralsFunc(n) {
      return n > 1;
    }
  },
  tt: {
    name: 'Tatar',
    examples: [{
      plural: 0,
      sample: 1
    }],
    nplurals: 1,
    pluralsText: 'nplurals = 1; plural = 0',
    pluralsFunc: function pluralsFunc() {
      return 0;
    }
  },
  ug: {
    name: 'Uyghur',
    examples: [{
      plural: 0,
      sample: 1
    }],
    nplurals: 1,
    pluralsText: 'nplurals = 1; plural = 0',
    pluralsFunc: function pluralsFunc() {
      return 0;
    }
  },
  uk: {
    name: 'Ukrainian',
    examples: [{
      plural: 0,
      sample: 1
    }, {
      plural: 1,
      sample: 2
    }, {
      plural: 2,
      sample: 5
    }],
    nplurals: 3,
    pluralsText: 'nplurals = 3; plural = (n % 10 === 1 && n % 100 !== 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2)',
    pluralsFunc: function pluralsFunc(n) {
      return n % 10 === 1 && n % 100 !== 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2;
    }
  },
  ur: {
    name: 'Urdu',
    examples: [{
      plural: 0,
      sample: 1
    }, {
      plural: 1,
      sample: 2
    }],
    nplurals: 2,
    pluralsText: 'nplurals = 2; plural = (n !== 1)',
    pluralsFunc: function pluralsFunc(n) {
      return n !== 1;
    }
  },
  uz: {
    name: 'Uzbek',
    examples: [{
      plural: 0,
      sample: 1
    }, {
      plural: 1,
      sample: 2
    }],
    nplurals: 2,
    pluralsText: 'nplurals = 2; plural = (n > 1)',
    pluralsFunc: function pluralsFunc(n) {
      return n > 1;
    }
  },
  vi: {
    name: 'Vietnamese',
    examples: [{
      plural: 0,
      sample: 1
    }],
    nplurals: 1,
    pluralsText: 'nplurals = 1; plural = 0',
    pluralsFunc: function pluralsFunc() {
      return 0;
    }
  },
  wa: {
    name: 'Walloon',
    examples: [{
      plural: 0,
      sample: 1
    }, {
      plural: 1,
      sample: 2
    }],
    nplurals: 2,
    pluralsText: 'nplurals = 2; plural = (n > 1)',
    pluralsFunc: function pluralsFunc(n) {
      return n > 1;
    }
  },
  wo: {
    name: 'Wolof',
    examples: [{
      plural: 0,
      sample: 1
    }],
    nplurals: 1,
    pluralsText: 'nplurals = 1; plural = 0',
    pluralsFunc: function pluralsFunc() {
      return 0;
    }
  },
  yo: {
    name: 'Yoruba',
    examples: [{
      plural: 0,
      sample: 1
    }, {
      plural: 1,
      sample: 2
    }],
    nplurals: 2,
    pluralsText: 'nplurals = 2; plural = (n !== 1)',
    pluralsFunc: function pluralsFunc(n) {
      return n !== 1;
    }
  },
  zh: {
    name: 'Chinese',
    examples: [{
      plural: 0,
      sample: 1
    }],
    nplurals: 1,
    pluralsText: 'nplurals = 1; plural = 0',
    pluralsFunc: function pluralsFunc() {
      return 0;
    }
  }
};

/***/ }),

/***/ "./node_modules/popper.js/dist/esm/popper.js":
/*!***************************************************!*\
  !*** ./node_modules/popper.js/dist/esm/popper.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**!
 * @fileOverview Kickass library to create and place poppers near their reference elements.
 * @version 1.16.1
 * @license
 * Copyright (c) 2016 Federico Zivolo and contributors
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
var isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined' && typeof navigator !== 'undefined';

var timeoutDuration = function () {
  var longerTimeoutBrowsers = ['Edge', 'Trident', 'Firefox'];

  for (var i = 0; i < longerTimeoutBrowsers.length; i += 1) {
    if (isBrowser && navigator.userAgent.indexOf(longerTimeoutBrowsers[i]) >= 0) {
      return 1;
    }
  }

  return 0;
}();

function microtaskDebounce(fn) {
  var called = false;
  return function () {
    if (called) {
      return;
    }

    called = true;
    window.Promise.resolve().then(function () {
      called = false;
      fn();
    });
  };
}

function taskDebounce(fn) {
  var scheduled = false;
  return function () {
    if (!scheduled) {
      scheduled = true;
      setTimeout(function () {
        scheduled = false;
        fn();
      }, timeoutDuration);
    }
  };
}

var supportsMicroTasks = isBrowser && window.Promise;
/**
* Create a debounced version of a method, that's asynchronously deferred
* but called in the minimum time possible.
*
* @method
* @memberof Popper.Utils
* @argument {Function} fn
* @returns {Function}
*/

var debounce = supportsMicroTasks ? microtaskDebounce : taskDebounce;
/**
 * Check if the given variable is a function
 * @method
 * @memberof Popper.Utils
 * @argument {Any} functionToCheck - variable to check
 * @returns {Boolean} answer to: is a function?
 */

function isFunction(functionToCheck) {
  var getType = {};
  return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}
/**
 * Get CSS computed property of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Eement} element
 * @argument {String} property
 */


function getStyleComputedProperty(element, property) {
  if (element.nodeType !== 1) {
    return [];
  } // NOTE: 1 DOM access here


  var window = element.ownerDocument.defaultView;
  var css = window.getComputedStyle(element, null);
  return property ? css[property] : css;
}
/**
 * Returns the parentNode or the host of the element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} parent
 */


function getParentNode(element) {
  if (element.nodeName === 'HTML') {
    return element;
  }

  return element.parentNode || element.host;
}
/**
 * Returns the scrolling parent of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} scroll parent
 */


function getScrollParent(element) {
  // Return body, `getScroll` will take care to get the correct `scrollTop` from it
  if (!element) {
    return document.body;
  }

  switch (element.nodeName) {
    case 'HTML':
    case 'BODY':
      return element.ownerDocument.body;

    case '#document':
      return element.body;
  } // Firefox want us to check `-x` and `-y` variations as well


  var _getStyleComputedProp = getStyleComputedProperty(element),
      overflow = _getStyleComputedProp.overflow,
      overflowX = _getStyleComputedProp.overflowX,
      overflowY = _getStyleComputedProp.overflowY;

  if (/(auto|scroll|overlay)/.test(overflow + overflowY + overflowX)) {
    return element;
  }

  return getScrollParent(getParentNode(element));
}
/**
 * Returns the reference node of the reference object, or the reference object itself.
 * @method
 * @memberof Popper.Utils
 * @param {Element|Object} reference - the reference element (the popper will be relative to this)
 * @returns {Element} parent
 */


function getReferenceNode(reference) {
  return reference && reference.referenceNode ? reference.referenceNode : reference;
}

var isIE11 = isBrowser && !!(window.MSInputMethodContext && document.documentMode);
var isIE10 = isBrowser && /MSIE 10/.test(navigator.userAgent);
/**
 * Determines if the browser is Internet Explorer
 * @method
 * @memberof Popper.Utils
 * @param {Number} version to check
 * @returns {Boolean} isIE
 */

function isIE(version) {
  if (version === 11) {
    return isIE11;
  }

  if (version === 10) {
    return isIE10;
  }

  return isIE11 || isIE10;
}
/**
 * Returns the offset parent of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} offset parent
 */


function getOffsetParent(element) {
  if (!element) {
    return document.documentElement;
  }

  var noOffsetParent = isIE(10) ? document.body : null; // NOTE: 1 DOM access here

  var offsetParent = element.offsetParent || null; // Skip hidden elements which don't have an offsetParent

  while (offsetParent === noOffsetParent && element.nextElementSibling) {
    offsetParent = (element = element.nextElementSibling).offsetParent;
  }

  var nodeName = offsetParent && offsetParent.nodeName;

  if (!nodeName || nodeName === 'BODY' || nodeName === 'HTML') {
    return element ? element.ownerDocument.documentElement : document.documentElement;
  } // .offsetParent will return the closest TH, TD or TABLE in case
  // no offsetParent is present, I hate this job...


  if (['TH', 'TD', 'TABLE'].indexOf(offsetParent.nodeName) !== -1 && getStyleComputedProperty(offsetParent, 'position') === 'static') {
    return getOffsetParent(offsetParent);
  }

  return offsetParent;
}

function isOffsetContainer(element) {
  var nodeName = element.nodeName;

  if (nodeName === 'BODY') {
    return false;
  }

  return nodeName === 'HTML' || getOffsetParent(element.firstElementChild) === element;
}
/**
 * Finds the root node (document, shadowDOM root) of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} node
 * @returns {Element} root node
 */


function getRoot(node) {
  if (node.parentNode !== null) {
    return getRoot(node.parentNode);
  }

  return node;
}
/**
 * Finds the offset parent common to the two provided nodes
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element1
 * @argument {Element} element2
 * @returns {Element} common offset parent
 */


function findCommonOffsetParent(element1, element2) {
  // This check is needed to avoid errors in case one of the elements isn't defined for any reason
  if (!element1 || !element1.nodeType || !element2 || !element2.nodeType) {
    return document.documentElement;
  } // Here we make sure to give as "start" the element that comes first in the DOM


  var order = element1.compareDocumentPosition(element2) & Node.DOCUMENT_POSITION_FOLLOWING;
  var start = order ? element1 : element2;
  var end = order ? element2 : element1; // Get common ancestor container

  var range = document.createRange();
  range.setStart(start, 0);
  range.setEnd(end, 0);
  var commonAncestorContainer = range.commonAncestorContainer; // Both nodes are inside #document

  if (element1 !== commonAncestorContainer && element2 !== commonAncestorContainer || start.contains(end)) {
    if (isOffsetContainer(commonAncestorContainer)) {
      return commonAncestorContainer;
    }

    return getOffsetParent(commonAncestorContainer);
  } // one of the nodes is inside shadowDOM, find which one


  var element1root = getRoot(element1);

  if (element1root.host) {
    return findCommonOffsetParent(element1root.host, element2);
  } else {
    return findCommonOffsetParent(element1, getRoot(element2).host);
  }
}
/**
 * Gets the scroll value of the given element in the given side (top and left)
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @argument {String} side `top` or `left`
 * @returns {number} amount of scrolled pixels
 */


function getScroll(element) {
  var side = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'top';
  var upperSide = side === 'top' ? 'scrollTop' : 'scrollLeft';
  var nodeName = element.nodeName;

  if (nodeName === 'BODY' || nodeName === 'HTML') {
    var html = element.ownerDocument.documentElement;
    var scrollingElement = element.ownerDocument.scrollingElement || html;
    return scrollingElement[upperSide];
  }

  return element[upperSide];
}
/*
 * Sum or subtract the element scroll values (left and top) from a given rect object
 * @method
 * @memberof Popper.Utils
 * @param {Object} rect - Rect object you want to change
 * @param {HTMLElement} element - The element from the function reads the scroll values
 * @param {Boolean} subtract - set to true if you want to subtract the scroll values
 * @return {Object} rect - The modifier rect object
 */


function includeScroll(rect, element) {
  var subtract = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var scrollTop = getScroll(element, 'top');
  var scrollLeft = getScroll(element, 'left');
  var modifier = subtract ? -1 : 1;
  rect.top += scrollTop * modifier;
  rect.bottom += scrollTop * modifier;
  rect.left += scrollLeft * modifier;
  rect.right += scrollLeft * modifier;
  return rect;
}
/*
 * Helper to detect borders of a given element
 * @method
 * @memberof Popper.Utils
 * @param {CSSStyleDeclaration} styles
 * Result of `getStyleComputedProperty` on the given element
 * @param {String} axis - `x` or `y`
 * @return {number} borders - The borders size of the given axis
 */


function getBordersSize(styles, axis) {
  var sideA = axis === 'x' ? 'Left' : 'Top';
  var sideB = sideA === 'Left' ? 'Right' : 'Bottom';
  return parseFloat(styles['border' + sideA + 'Width']) + parseFloat(styles['border' + sideB + 'Width']);
}

function getSize(axis, body, html, computedStyle) {
  return Math.max(body['offset' + axis], body['scroll' + axis], html['client' + axis], html['offset' + axis], html['scroll' + axis], isIE(10) ? parseInt(html['offset' + axis]) + parseInt(computedStyle['margin' + (axis === 'Height' ? 'Top' : 'Left')]) + parseInt(computedStyle['margin' + (axis === 'Height' ? 'Bottom' : 'Right')]) : 0);
}

function getWindowSizes(document) {
  var body = document.body;
  var html = document.documentElement;
  var computedStyle = isIE(10) && getComputedStyle(html);
  return {
    height: getSize('Height', body, html, computedStyle),
    width: getSize('Width', body, html, computedStyle)
  };
}

var classCallCheck = function classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var defineProperty = function defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};
/**
 * Given element offsets, generate an output similar to getBoundingClientRect
 * @method
 * @memberof Popper.Utils
 * @argument {Object} offsets
 * @returns {Object} ClientRect like output
 */


function getClientRect(offsets) {
  return _extends({}, offsets, {
    right: offsets.left + offsets.width,
    bottom: offsets.top + offsets.height
  });
}
/**
 * Get bounding client rect of given element
 * @method
 * @memberof Popper.Utils
 * @param {HTMLElement} element
 * @return {Object} client rect
 */


function getBoundingClientRect(element) {
  var rect = {}; // IE10 10 FIX: Please, don't ask, the element isn't
  // considered in DOM in some circumstances...
  // This isn't reproducible in IE10 compatibility mode of IE11

  try {
    if (isIE(10)) {
      rect = element.getBoundingClientRect();
      var scrollTop = getScroll(element, 'top');
      var scrollLeft = getScroll(element, 'left');
      rect.top += scrollTop;
      rect.left += scrollLeft;
      rect.bottom += scrollTop;
      rect.right += scrollLeft;
    } else {
      rect = element.getBoundingClientRect();
    }
  } catch (e) {}

  var result = {
    left: rect.left,
    top: rect.top,
    width: rect.right - rect.left,
    height: rect.bottom - rect.top
  }; // subtract scrollbar size from sizes

  var sizes = element.nodeName === 'HTML' ? getWindowSizes(element.ownerDocument) : {};
  var width = sizes.width || element.clientWidth || result.width;
  var height = sizes.height || element.clientHeight || result.height;
  var horizScrollbar = element.offsetWidth - width;
  var vertScrollbar = element.offsetHeight - height; // if an hypothetical scrollbar is detected, we must be sure it's not a `border`
  // we make this check conditional for performance reasons

  if (horizScrollbar || vertScrollbar) {
    var styles = getStyleComputedProperty(element);
    horizScrollbar -= getBordersSize(styles, 'x');
    vertScrollbar -= getBordersSize(styles, 'y');
    result.width -= horizScrollbar;
    result.height -= vertScrollbar;
  }

  return getClientRect(result);
}

function getOffsetRectRelativeToArbitraryNode(children, parent) {
  var fixedPosition = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var isIE10 = isIE(10);
  var isHTML = parent.nodeName === 'HTML';
  var childrenRect = getBoundingClientRect(children);
  var parentRect = getBoundingClientRect(parent);
  var scrollParent = getScrollParent(children);
  var styles = getStyleComputedProperty(parent);
  var borderTopWidth = parseFloat(styles.borderTopWidth);
  var borderLeftWidth = parseFloat(styles.borderLeftWidth); // In cases where the parent is fixed, we must ignore negative scroll in offset calc

  if (fixedPosition && isHTML) {
    parentRect.top = Math.max(parentRect.top, 0);
    parentRect.left = Math.max(parentRect.left, 0);
  }

  var offsets = getClientRect({
    top: childrenRect.top - parentRect.top - borderTopWidth,
    left: childrenRect.left - parentRect.left - borderLeftWidth,
    width: childrenRect.width,
    height: childrenRect.height
  });
  offsets.marginTop = 0;
  offsets.marginLeft = 0; // Subtract margins of documentElement in case it's being used as parent
  // we do this only on HTML because it's the only element that behaves
  // differently when margins are applied to it. The margins are included in
  // the box of the documentElement, in the other cases not.

  if (!isIE10 && isHTML) {
    var marginTop = parseFloat(styles.marginTop);
    var marginLeft = parseFloat(styles.marginLeft);
    offsets.top -= borderTopWidth - marginTop;
    offsets.bottom -= borderTopWidth - marginTop;
    offsets.left -= borderLeftWidth - marginLeft;
    offsets.right -= borderLeftWidth - marginLeft; // Attach marginTop and marginLeft because in some circumstances we may need them

    offsets.marginTop = marginTop;
    offsets.marginLeft = marginLeft;
  }

  if (isIE10 && !fixedPosition ? parent.contains(scrollParent) : parent === scrollParent && scrollParent.nodeName !== 'BODY') {
    offsets = includeScroll(offsets, parent);
  }

  return offsets;
}

function getViewportOffsetRectRelativeToArtbitraryNode(element) {
  var excludeScroll = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var html = element.ownerDocument.documentElement;
  var relativeOffset = getOffsetRectRelativeToArbitraryNode(element, html);
  var width = Math.max(html.clientWidth, window.innerWidth || 0);
  var height = Math.max(html.clientHeight, window.innerHeight || 0);
  var scrollTop = !excludeScroll ? getScroll(html) : 0;
  var scrollLeft = !excludeScroll ? getScroll(html, 'left') : 0;
  var offset = {
    top: scrollTop - relativeOffset.top + relativeOffset.marginTop,
    left: scrollLeft - relativeOffset.left + relativeOffset.marginLeft,
    width: width,
    height: height
  };
  return getClientRect(offset);
}
/**
 * Check if the given element is fixed or is inside a fixed parent
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @argument {Element} customContainer
 * @returns {Boolean} answer to "isFixed?"
 */


function isFixed(element) {
  var nodeName = element.nodeName;

  if (nodeName === 'BODY' || nodeName === 'HTML') {
    return false;
  }

  if (getStyleComputedProperty(element, 'position') === 'fixed') {
    return true;
  }

  var parentNode = getParentNode(element);

  if (!parentNode) {
    return false;
  }

  return isFixed(parentNode);
}
/**
 * Finds the first parent of an element that has a transformed property defined
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} first transformed parent or documentElement
 */


function getFixedPositionOffsetParent(element) {
  // This check is needed to avoid errors in case one of the elements isn't defined for any reason
  if (!element || !element.parentElement || isIE()) {
    return document.documentElement;
  }

  var el = element.parentElement;

  while (el && getStyleComputedProperty(el, 'transform') === 'none') {
    el = el.parentElement;
  }

  return el || document.documentElement;
}
/**
 * Computed the boundaries limits and return them
 * @method
 * @memberof Popper.Utils
 * @param {HTMLElement} popper
 * @param {HTMLElement} reference
 * @param {number} padding
 * @param {HTMLElement} boundariesElement - Element used to define the boundaries
 * @param {Boolean} fixedPosition - Is in fixed position mode
 * @returns {Object} Coordinates of the boundaries
 */


function getBoundaries(popper, reference, padding, boundariesElement) {
  var fixedPosition = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false; // NOTE: 1 DOM access here

  var boundaries = {
    top: 0,
    left: 0
  };
  var offsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, getReferenceNode(reference)); // Handle viewport case

  if (boundariesElement === 'viewport') {
    boundaries = getViewportOffsetRectRelativeToArtbitraryNode(offsetParent, fixedPosition);
  } else {
    // Handle other cases based on DOM element used as boundaries
    var boundariesNode = void 0;

    if (boundariesElement === 'scrollParent') {
      boundariesNode = getScrollParent(getParentNode(reference));

      if (boundariesNode.nodeName === 'BODY') {
        boundariesNode = popper.ownerDocument.documentElement;
      }
    } else if (boundariesElement === 'window') {
      boundariesNode = popper.ownerDocument.documentElement;
    } else {
      boundariesNode = boundariesElement;
    }

    var offsets = getOffsetRectRelativeToArbitraryNode(boundariesNode, offsetParent, fixedPosition); // In case of HTML, we need a different computation

    if (boundariesNode.nodeName === 'HTML' && !isFixed(offsetParent)) {
      var _getWindowSizes = getWindowSizes(popper.ownerDocument),
          height = _getWindowSizes.height,
          width = _getWindowSizes.width;

      boundaries.top += offsets.top - offsets.marginTop;
      boundaries.bottom = height + offsets.top;
      boundaries.left += offsets.left - offsets.marginLeft;
      boundaries.right = width + offsets.left;
    } else {
      // for all the other DOM elements, this one is good
      boundaries = offsets;
    }
  } // Add paddings


  padding = padding || 0;
  var isPaddingNumber = typeof padding === 'number';
  boundaries.left += isPaddingNumber ? padding : padding.left || 0;
  boundaries.top += isPaddingNumber ? padding : padding.top || 0;
  boundaries.right -= isPaddingNumber ? padding : padding.right || 0;
  boundaries.bottom -= isPaddingNumber ? padding : padding.bottom || 0;
  return boundaries;
}

function getArea(_ref) {
  var width = _ref.width,
      height = _ref.height;
  return width * height;
}
/**
 * Utility used to transform the `auto` placement to the placement with more
 * available space.
 * @method
 * @memberof Popper.Utils
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */


function computeAutoPlacement(placement, refRect, popper, reference, boundariesElement) {
  var padding = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;

  if (placement.indexOf('auto') === -1) {
    return placement;
  }

  var boundaries = getBoundaries(popper, reference, padding, boundariesElement);
  var rects = {
    top: {
      width: boundaries.width,
      height: refRect.top - boundaries.top
    },
    right: {
      width: boundaries.right - refRect.right,
      height: boundaries.height
    },
    bottom: {
      width: boundaries.width,
      height: boundaries.bottom - refRect.bottom
    },
    left: {
      width: refRect.left - boundaries.left,
      height: boundaries.height
    }
  };
  var sortedAreas = Object.keys(rects).map(function (key) {
    return _extends({
      key: key
    }, rects[key], {
      area: getArea(rects[key])
    });
  }).sort(function (a, b) {
    return b.area - a.area;
  });
  var filteredAreas = sortedAreas.filter(function (_ref2) {
    var width = _ref2.width,
        height = _ref2.height;
    return width >= popper.clientWidth && height >= popper.clientHeight;
  });
  var computedPlacement = filteredAreas.length > 0 ? filteredAreas[0].key : sortedAreas[0].key;
  var variation = placement.split('-')[1];
  return computedPlacement + (variation ? '-' + variation : '');
}
/**
 * Get offsets to the reference element
 * @method
 * @memberof Popper.Utils
 * @param {Object} state
 * @param {Element} popper - the popper element
 * @param {Element} reference - the reference element (the popper will be relative to this)
 * @param {Element} fixedPosition - is in fixed position mode
 * @returns {Object} An object containing the offsets which will be applied to the popper
 */


function getReferenceOffsets(state, popper, reference) {
  var fixedPosition = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  var commonOffsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, getReferenceNode(reference));
  return getOffsetRectRelativeToArbitraryNode(reference, commonOffsetParent, fixedPosition);
}
/**
 * Get the outer sizes of the given element (offset size + margins)
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Object} object containing width and height properties
 */


function getOuterSizes(element) {
  var window = element.ownerDocument.defaultView;
  var styles = window.getComputedStyle(element);
  var x = parseFloat(styles.marginTop || 0) + parseFloat(styles.marginBottom || 0);
  var y = parseFloat(styles.marginLeft || 0) + parseFloat(styles.marginRight || 0);
  var result = {
    width: element.offsetWidth + y,
    height: element.offsetHeight + x
  };
  return result;
}
/**
 * Get the opposite placement of the given one
 * @method
 * @memberof Popper.Utils
 * @argument {String} placement
 * @returns {String} flipped placement
 */


function getOppositePlacement(placement) {
  var hash = {
    left: 'right',
    right: 'left',
    bottom: 'top',
    top: 'bottom'
  };
  return placement.replace(/left|right|bottom|top/g, function (matched) {
    return hash[matched];
  });
}
/**
 * Get offsets to the popper
 * @method
 * @memberof Popper.Utils
 * @param {Object} position - CSS position the Popper will get applied
 * @param {HTMLElement} popper - the popper element
 * @param {Object} referenceOffsets - the reference offsets (the popper will be relative to this)
 * @param {String} placement - one of the valid placement options
 * @returns {Object} popperOffsets - An object containing the offsets which will be applied to the popper
 */


function getPopperOffsets(popper, referenceOffsets, placement) {
  placement = placement.split('-')[0]; // Get popper node sizes

  var popperRect = getOuterSizes(popper); // Add position, width and height to our offsets object

  var popperOffsets = {
    width: popperRect.width,
    height: popperRect.height
  }; // depending by the popper placement we have to compute its offsets slightly differently

  var isHoriz = ['right', 'left'].indexOf(placement) !== -1;
  var mainSide = isHoriz ? 'top' : 'left';
  var secondarySide = isHoriz ? 'left' : 'top';
  var measurement = isHoriz ? 'height' : 'width';
  var secondaryMeasurement = !isHoriz ? 'height' : 'width';
  popperOffsets[mainSide] = referenceOffsets[mainSide] + referenceOffsets[measurement] / 2 - popperRect[measurement] / 2;

  if (placement === secondarySide) {
    popperOffsets[secondarySide] = referenceOffsets[secondarySide] - popperRect[secondaryMeasurement];
  } else {
    popperOffsets[secondarySide] = referenceOffsets[getOppositePlacement(secondarySide)];
  }

  return popperOffsets;
}
/**
 * Mimics the `find` method of Array
 * @method
 * @memberof Popper.Utils
 * @argument {Array} arr
 * @argument prop
 * @argument value
 * @returns index or -1
 */


function find(arr, check) {
  // use native find if supported
  if (Array.prototype.find) {
    return arr.find(check);
  } // use `filter` to obtain the same behavior of `find`


  return arr.filter(check)[0];
}
/**
 * Return the index of the matching object
 * @method
 * @memberof Popper.Utils
 * @argument {Array} arr
 * @argument prop
 * @argument value
 * @returns index or -1
 */


function findIndex(arr, prop, value) {
  // use native findIndex if supported
  if (Array.prototype.findIndex) {
    return arr.findIndex(function (cur) {
      return cur[prop] === value;
    });
  } // use `find` + `indexOf` if `findIndex` isn't supported


  var match = find(arr, function (obj) {
    return obj[prop] === value;
  });
  return arr.indexOf(match);
}
/**
 * Loop trough the list of modifiers and run them in order,
 * each of them will then edit the data object.
 * @method
 * @memberof Popper.Utils
 * @param {dataObject} data
 * @param {Array} modifiers
 * @param {String} ends - Optional modifier name used as stopper
 * @returns {dataObject}
 */


function runModifiers(modifiers, data, ends) {
  var modifiersToRun = ends === undefined ? modifiers : modifiers.slice(0, findIndex(modifiers, 'name', ends));
  modifiersToRun.forEach(function (modifier) {
    if (modifier['function']) {
      // eslint-disable-line dot-notation
      console.warn('`modifier.function` is deprecated, use `modifier.fn`!');
    }

    var fn = modifier['function'] || modifier.fn; // eslint-disable-line dot-notation

    if (modifier.enabled && isFunction(fn)) {
      // Add properties to offsets to make them a complete clientRect object
      // we do this before each modifier to make sure the previous one doesn't
      // mess with these values
      data.offsets.popper = getClientRect(data.offsets.popper);
      data.offsets.reference = getClientRect(data.offsets.reference);
      data = fn(data, modifier);
    }
  });
  return data;
}
/**
 * Updates the position of the popper, computing the new offsets and applying
 * the new style.<br />
 * Prefer `scheduleUpdate` over `update` because of performance reasons.
 * @method
 * @memberof Popper
 */


function update() {
  // if popper is destroyed, don't perform any further update
  if (this.state.isDestroyed) {
    return;
  }

  var data = {
    instance: this,
    styles: {},
    arrowStyles: {},
    attributes: {},
    flipped: false,
    offsets: {}
  }; // compute reference element offsets

  data.offsets.reference = getReferenceOffsets(this.state, this.popper, this.reference, this.options.positionFixed); // compute auto placement, store placement inside the data object,
  // modifiers will be able to edit `placement` if needed
  // and refer to originalPlacement to know the original value

  data.placement = computeAutoPlacement(this.options.placement, data.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding); // store the computed placement inside `originalPlacement`

  data.originalPlacement = data.placement;
  data.positionFixed = this.options.positionFixed; // compute the popper offsets

  data.offsets.popper = getPopperOffsets(this.popper, data.offsets.reference, data.placement);
  data.offsets.popper.position = this.options.positionFixed ? 'fixed' : 'absolute'; // run the modifiers

  data = runModifiers(this.modifiers, data); // the first `update` will call `onCreate` callback
  // the other ones will call `onUpdate` callback

  if (!this.state.isCreated) {
    this.state.isCreated = true;
    this.options.onCreate(data);
  } else {
    this.options.onUpdate(data);
  }
}
/**
 * Helper used to know if the given modifier is enabled.
 * @method
 * @memberof Popper.Utils
 * @returns {Boolean}
 */


function isModifierEnabled(modifiers, modifierName) {
  return modifiers.some(function (_ref) {
    var name = _ref.name,
        enabled = _ref.enabled;
    return enabled && name === modifierName;
  });
}
/**
 * Get the prefixed supported property name
 * @method
 * @memberof Popper.Utils
 * @argument {String} property (camelCase)
 * @returns {String} prefixed property (camelCase or PascalCase, depending on the vendor prefix)
 */


function getSupportedPropertyName(property) {
  var prefixes = [false, 'ms', 'Webkit', 'Moz', 'O'];
  var upperProp = property.charAt(0).toUpperCase() + property.slice(1);

  for (var i = 0; i < prefixes.length; i++) {
    var prefix = prefixes[i];
    var toCheck = prefix ? '' + prefix + upperProp : property;

    if (typeof document.body.style[toCheck] !== 'undefined') {
      return toCheck;
    }
  }

  return null;
}
/**
 * Destroys the popper.
 * @method
 * @memberof Popper
 */


function destroy() {
  this.state.isDestroyed = true; // touch DOM only if `applyStyle` modifier is enabled

  if (isModifierEnabled(this.modifiers, 'applyStyle')) {
    this.popper.removeAttribute('x-placement');
    this.popper.style.position = '';
    this.popper.style.top = '';
    this.popper.style.left = '';
    this.popper.style.right = '';
    this.popper.style.bottom = '';
    this.popper.style.willChange = '';
    this.popper.style[getSupportedPropertyName('transform')] = '';
  }

  this.disableEventListeners(); // remove the popper if user explicitly asked for the deletion on destroy
  // do not use `remove` because IE11 doesn't support it

  if (this.options.removeOnDestroy) {
    this.popper.parentNode.removeChild(this.popper);
  }

  return this;
}
/**
 * Get the window associated with the element
 * @argument {Element} element
 * @returns {Window}
 */


function getWindow(element) {
  var ownerDocument = element.ownerDocument;
  return ownerDocument ? ownerDocument.defaultView : window;
}

function attachToScrollParents(scrollParent, event, callback, scrollParents) {
  var isBody = scrollParent.nodeName === 'BODY';
  var target = isBody ? scrollParent.ownerDocument.defaultView : scrollParent;
  target.addEventListener(event, callback, {
    passive: true
  });

  if (!isBody) {
    attachToScrollParents(getScrollParent(target.parentNode), event, callback, scrollParents);
  }

  scrollParents.push(target);
}
/**
 * Setup needed event listeners used to update the popper position
 * @method
 * @memberof Popper.Utils
 * @private
 */


function setupEventListeners(reference, options, state, updateBound) {
  // Resize event listener on window
  state.updateBound = updateBound;
  getWindow(reference).addEventListener('resize', state.updateBound, {
    passive: true
  }); // Scroll event listener on scroll parents

  var scrollElement = getScrollParent(reference);
  attachToScrollParents(scrollElement, 'scroll', state.updateBound, state.scrollParents);
  state.scrollElement = scrollElement;
  state.eventsEnabled = true;
  return state;
}
/**
 * It will add resize/scroll events and start recalculating
 * position of the popper element when they are triggered.
 * @method
 * @memberof Popper
 */


function enableEventListeners() {
  if (!this.state.eventsEnabled) {
    this.state = setupEventListeners(this.reference, this.options, this.state, this.scheduleUpdate);
  }
}
/**
 * Remove event listeners used to update the popper position
 * @method
 * @memberof Popper.Utils
 * @private
 */


function removeEventListeners(reference, state) {
  // Remove resize event listener on window
  getWindow(reference).removeEventListener('resize', state.updateBound); // Remove scroll event listener on scroll parents

  state.scrollParents.forEach(function (target) {
    target.removeEventListener('scroll', state.updateBound);
  }); // Reset state

  state.updateBound = null;
  state.scrollParents = [];
  state.scrollElement = null;
  state.eventsEnabled = false;
  return state;
}
/**
 * It will remove resize/scroll events and won't recalculate popper position
 * when they are triggered. It also won't trigger `onUpdate` callback anymore,
 * unless you call `update` method manually.
 * @method
 * @memberof Popper
 */


function disableEventListeners() {
  if (this.state.eventsEnabled) {
    cancelAnimationFrame(this.scheduleUpdate);
    this.state = removeEventListeners(this.reference, this.state);
  }
}
/**
 * Tells if a given input is a number
 * @method
 * @memberof Popper.Utils
 * @param {*} input to check
 * @return {Boolean}
 */


function isNumeric(n) {
  return n !== '' && !isNaN(parseFloat(n)) && isFinite(n);
}
/**
 * Set the style to the given popper
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element - Element to apply the style to
 * @argument {Object} styles
 * Object with a list of properties and values which will be applied to the element
 */


function setStyles(element, styles) {
  Object.keys(styles).forEach(function (prop) {
    var unit = ''; // add unit if the value is numeric and is one of the following

    if (['width', 'height', 'top', 'right', 'bottom', 'left'].indexOf(prop) !== -1 && isNumeric(styles[prop])) {
      unit = 'px';
    }

    element.style[prop] = styles[prop] + unit;
  });
}
/**
 * Set the attributes to the given popper
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element - Element to apply the attributes to
 * @argument {Object} styles
 * Object with a list of properties and values which will be applied to the element
 */


function setAttributes(element, attributes) {
  Object.keys(attributes).forEach(function (prop) {
    var value = attributes[prop];

    if (value !== false) {
      element.setAttribute(prop, attributes[prop]);
    } else {
      element.removeAttribute(prop);
    }
  });
}
/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} data.styles - List of style properties - values to apply to popper element
 * @argument {Object} data.attributes - List of attribute properties - values to apply to popper element
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The same data object
 */


function applyStyle(data) {
  // any property present in `data.styles` will be applied to the popper,
  // in this way we can make the 3rd party modifiers add custom styles to it
  // Be aware, modifiers could override the properties defined in the previous
  // lines of this modifier!
  setStyles(data.instance.popper, data.styles); // any property present in `data.attributes` will be applied to the popper,
  // they will be set as HTML attributes of the element

  setAttributes(data.instance.popper, data.attributes); // if arrowElement is defined and arrowStyles has some properties

  if (data.arrowElement && Object.keys(data.arrowStyles).length) {
    setStyles(data.arrowElement, data.arrowStyles);
  }

  return data;
}
/**
 * Set the x-placement attribute before everything else because it could be used
 * to add margins to the popper margins needs to be calculated to get the
 * correct popper offsets.
 * @method
 * @memberof Popper.modifiers
 * @param {HTMLElement} reference - The reference element used to position the popper
 * @param {HTMLElement} popper - The HTML element used as popper
 * @param {Object} options - Popper.js options
 */


function applyStyleOnLoad(reference, popper, options, modifierOptions, state) {
  // compute reference element offsets
  var referenceOffsets = getReferenceOffsets(state, popper, reference, options.positionFixed); // compute auto placement, store placement inside the data object,
  // modifiers will be able to edit `placement` if needed
  // and refer to originalPlacement to know the original value

  var placement = computeAutoPlacement(options.placement, referenceOffsets, popper, reference, options.modifiers.flip.boundariesElement, options.modifiers.flip.padding);
  popper.setAttribute('x-placement', placement); // Apply `position` to popper before anything else because
  // without the position applied we can't guarantee correct computations

  setStyles(popper, {
    position: options.positionFixed ? 'fixed' : 'absolute'
  });
  return options;
}
/**
 * @function
 * @memberof Popper.Utils
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Boolean} shouldRound - If the offsets should be rounded at all
 * @returns {Object} The popper's position offsets rounded
 *
 * The tale of pixel-perfect positioning. It's still not 100% perfect, but as
 * good as it can be within reason.
 * Discussion here: https://github.com/FezVrasta/popper.js/pull/715
 *
 * Low DPI screens cause a popper to be blurry if not using full pixels (Safari
 * as well on High DPI screens).
 *
 * Firefox prefers no rounding for positioning and does not have blurriness on
 * high DPI screens.
 *
 * Only horizontal placement and left/right values need to be considered.
 */


function getRoundedOffsets(data, shouldRound) {
  var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;
  var round = Math.round,
      floor = Math.floor;

  var noRound = function noRound(v) {
    return v;
  };

  var referenceWidth = round(reference.width);
  var popperWidth = round(popper.width);
  var isVertical = ['left', 'right'].indexOf(data.placement) !== -1;
  var isVariation = data.placement.indexOf('-') !== -1;
  var sameWidthParity = referenceWidth % 2 === popperWidth % 2;
  var bothOddWidth = referenceWidth % 2 === 1 && popperWidth % 2 === 1;
  var horizontalToInteger = !shouldRound ? noRound : isVertical || isVariation || sameWidthParity ? round : floor;
  var verticalToInteger = !shouldRound ? noRound : round;
  return {
    left: horizontalToInteger(bothOddWidth && !isVariation && shouldRound ? popper.left - 1 : popper.left),
    top: verticalToInteger(popper.top),
    bottom: verticalToInteger(popper.bottom),
    right: horizontalToInteger(popper.right)
  };
}

var isFirefox = isBrowser && /Firefox/i.test(navigator.userAgent);
/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */

function computeStyle(data, options) {
  var x = options.x,
      y = options.y;
  var popper = data.offsets.popper; // Remove this legacy support in Popper.js v2

  var legacyGpuAccelerationOption = find(data.instance.modifiers, function (modifier) {
    return modifier.name === 'applyStyle';
  }).gpuAcceleration;

  if (legacyGpuAccelerationOption !== undefined) {
    console.warn('WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!');
  }

  var gpuAcceleration = legacyGpuAccelerationOption !== undefined ? legacyGpuAccelerationOption : options.gpuAcceleration;
  var offsetParent = getOffsetParent(data.instance.popper);
  var offsetParentRect = getBoundingClientRect(offsetParent); // Styles

  var styles = {
    position: popper.position
  };
  var offsets = getRoundedOffsets(data, window.devicePixelRatio < 2 || !isFirefox);
  var sideA = x === 'bottom' ? 'top' : 'bottom';
  var sideB = y === 'right' ? 'left' : 'right'; // if gpuAcceleration is set to `true` and transform is supported,
  //  we use `translate3d` to apply the position to the popper we
  // automatically use the supported prefixed version if needed

  var prefixedProperty = getSupportedPropertyName('transform'); // now, let's make a step back and look at this code closely (wtf?)
  // If the content of the popper grows once it's been positioned, it
  // may happen that the popper gets misplaced because of the new content
  // overflowing its reference element
  // To avoid this problem, we provide two options (x and y), which allow
  // the consumer to define the offset origin.
  // If we position a popper on top of a reference element, we can set
  // `x` to `top` to make the popper grow towards its top instead of
  // its bottom.

  var left = void 0,
      top = void 0;

  if (sideA === 'bottom') {
    // when offsetParent is <html> the positioning is relative to the bottom of the screen (excluding the scrollbar)
    // and not the bottom of the html element
    if (offsetParent.nodeName === 'HTML') {
      top = -offsetParent.clientHeight + offsets.bottom;
    } else {
      top = -offsetParentRect.height + offsets.bottom;
    }
  } else {
    top = offsets.top;
  }

  if (sideB === 'right') {
    if (offsetParent.nodeName === 'HTML') {
      left = -offsetParent.clientWidth + offsets.right;
    } else {
      left = -offsetParentRect.width + offsets.right;
    }
  } else {
    left = offsets.left;
  }

  if (gpuAcceleration && prefixedProperty) {
    styles[prefixedProperty] = 'translate3d(' + left + 'px, ' + top + 'px, 0)';
    styles[sideA] = 0;
    styles[sideB] = 0;
    styles.willChange = 'transform';
  } else {
    // othwerise, we use the standard `top`, `left`, `bottom` and `right` properties
    var invertTop = sideA === 'bottom' ? -1 : 1;
    var invertLeft = sideB === 'right' ? -1 : 1;
    styles[sideA] = top * invertTop;
    styles[sideB] = left * invertLeft;
    styles.willChange = sideA + ', ' + sideB;
  } // Attributes


  var attributes = {
    'x-placement': data.placement
  }; // Update `data` attributes, styles and arrowStyles

  data.attributes = _extends({}, attributes, data.attributes);
  data.styles = _extends({}, styles, data.styles);
  data.arrowStyles = _extends({}, data.offsets.arrow, data.arrowStyles);
  return data;
}
/**
 * Helper used to know if the given modifier depends from another one.<br />
 * It checks if the needed modifier is listed and enabled.
 * @method
 * @memberof Popper.Utils
 * @param {Array} modifiers - list of modifiers
 * @param {String} requestingName - name of requesting modifier
 * @param {String} requestedName - name of requested modifier
 * @returns {Boolean}
 */


function isModifierRequired(modifiers, requestingName, requestedName) {
  var requesting = find(modifiers, function (_ref) {
    var name = _ref.name;
    return name === requestingName;
  });
  var isRequired = !!requesting && modifiers.some(function (modifier) {
    return modifier.name === requestedName && modifier.enabled && modifier.order < requesting.order;
  });

  if (!isRequired) {
    var _requesting = '`' + requestingName + '`';

    var requested = '`' + requestedName + '`';
    console.warn(requested + ' modifier is required by ' + _requesting + ' modifier in order to work, be sure to include it before ' + _requesting + '!');
  }

  return isRequired;
}
/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */


function arrow(data, options) {
  var _data$offsets$arrow; // arrow depends on keepTogether in order to work


  if (!isModifierRequired(data.instance.modifiers, 'arrow', 'keepTogether')) {
    return data;
  }

  var arrowElement = options.element; // if arrowElement is a string, suppose it's a CSS selector

  if (typeof arrowElement === 'string') {
    arrowElement = data.instance.popper.querySelector(arrowElement); // if arrowElement is not found, don't run the modifier

    if (!arrowElement) {
      return data;
    }
  } else {
    // if the arrowElement isn't a query selector we must check that the
    // provided DOM node is child of its popper node
    if (!data.instance.popper.contains(arrowElement)) {
      console.warn('WARNING: `arrow.element` must be child of its popper element!');
      return data;
    }
  }

  var placement = data.placement.split('-')[0];
  var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;
  var isVertical = ['left', 'right'].indexOf(placement) !== -1;
  var len = isVertical ? 'height' : 'width';
  var sideCapitalized = isVertical ? 'Top' : 'Left';
  var side = sideCapitalized.toLowerCase();
  var altSide = isVertical ? 'left' : 'top';
  var opSide = isVertical ? 'bottom' : 'right';
  var arrowElementSize = getOuterSizes(arrowElement)[len]; //
  // extends keepTogether behavior making sure the popper and its
  // reference have enough pixels in conjunction
  //
  // top/left side

  if (reference[opSide] - arrowElementSize < popper[side]) {
    data.offsets.popper[side] -= popper[side] - (reference[opSide] - arrowElementSize);
  } // bottom/right side


  if (reference[side] + arrowElementSize > popper[opSide]) {
    data.offsets.popper[side] += reference[side] + arrowElementSize - popper[opSide];
  }

  data.offsets.popper = getClientRect(data.offsets.popper); // compute center of the popper

  var center = reference[side] + reference[len] / 2 - arrowElementSize / 2; // Compute the sideValue using the updated popper offsets
  // take popper margin in account because we don't have this info available

  var css = getStyleComputedProperty(data.instance.popper);
  var popperMarginSide = parseFloat(css['margin' + sideCapitalized]);
  var popperBorderSide = parseFloat(css['border' + sideCapitalized + 'Width']);
  var sideValue = center - data.offsets.popper[side] - popperMarginSide - popperBorderSide; // prevent arrowElement from being placed not contiguously to its popper

  sideValue = Math.max(Math.min(popper[len] - arrowElementSize, sideValue), 0);
  data.arrowElement = arrowElement;
  data.offsets.arrow = (_data$offsets$arrow = {}, defineProperty(_data$offsets$arrow, side, Math.round(sideValue)), defineProperty(_data$offsets$arrow, altSide, ''), _data$offsets$arrow);
  return data;
}
/**
 * Get the opposite placement variation of the given one
 * @method
 * @memberof Popper.Utils
 * @argument {String} placement variation
 * @returns {String} flipped placement variation
 */


function getOppositeVariation(variation) {
  if (variation === 'end') {
    return 'start';
  } else if (variation === 'start') {
    return 'end';
  }

  return variation;
}
/**
 * List of accepted placements to use as values of the `placement` option.<br />
 * Valid placements are:
 * - `auto`
 * - `top`
 * - `right`
 * - `bottom`
 * - `left`
 *
 * Each placement can have a variation from this list:
 * - `-start`
 * - `-end`
 *
 * Variations are interpreted easily if you think of them as the left to right
 * written languages. Horizontally (`top` and `bottom`), `start` is left and `end`
 * is right.<br />
 * Vertically (`left` and `right`), `start` is top and `end` is bottom.
 *
 * Some valid examples are:
 * - `top-end` (on top of reference, right aligned)
 * - `right-start` (on right of reference, top aligned)
 * - `bottom` (on bottom, centered)
 * - `auto-end` (on the side with more space available, alignment depends by placement)
 *
 * @static
 * @type {Array}
 * @enum {String}
 * @readonly
 * @method placements
 * @memberof Popper
 */


var placements = ['auto-start', 'auto', 'auto-end', 'top-start', 'top', 'top-end', 'right-start', 'right', 'right-end', 'bottom-end', 'bottom', 'bottom-start', 'left-end', 'left', 'left-start']; // Get rid of `auto` `auto-start` and `auto-end`

var validPlacements = placements.slice(3);
/**
 * Given an initial placement, returns all the subsequent placements
 * clockwise (or counter-clockwise).
 *
 * @method
 * @memberof Popper.Utils
 * @argument {String} placement - A valid placement (it accepts variations)
 * @argument {Boolean} counter - Set to true to walk the placements counterclockwise
 * @returns {Array} placements including their variations
 */

function clockwise(placement) {
  var counter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var index = validPlacements.indexOf(placement);
  var arr = validPlacements.slice(index + 1).concat(validPlacements.slice(0, index));
  return counter ? arr.reverse() : arr;
}

var BEHAVIORS = {
  FLIP: 'flip',
  CLOCKWISE: 'clockwise',
  COUNTERCLOCKWISE: 'counterclockwise'
};
/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */

function flip(data, options) {
  // if `inner` modifier is enabled, we can't use the `flip` modifier
  if (isModifierEnabled(data.instance.modifiers, 'inner')) {
    return data;
  }

  if (data.flipped && data.placement === data.originalPlacement) {
    // seems like flip is trying to loop, probably there's not enough space on any of the flippable sides
    return data;
  }

  var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, options.boundariesElement, data.positionFixed);
  var placement = data.placement.split('-')[0];
  var placementOpposite = getOppositePlacement(placement);
  var variation = data.placement.split('-')[1] || '';
  var flipOrder = [];

  switch (options.behavior) {
    case BEHAVIORS.FLIP:
      flipOrder = [placement, placementOpposite];
      break;

    case BEHAVIORS.CLOCKWISE:
      flipOrder = clockwise(placement);
      break;

    case BEHAVIORS.COUNTERCLOCKWISE:
      flipOrder = clockwise(placement, true);
      break;

    default:
      flipOrder = options.behavior;
  }

  flipOrder.forEach(function (step, index) {
    if (placement !== step || flipOrder.length === index + 1) {
      return data;
    }

    placement = data.placement.split('-')[0];
    placementOpposite = getOppositePlacement(placement);
    var popperOffsets = data.offsets.popper;
    var refOffsets = data.offsets.reference; // using floor because the reference offsets may contain decimals we are not going to consider here

    var floor = Math.floor;
    var overlapsRef = placement === 'left' && floor(popperOffsets.right) > floor(refOffsets.left) || placement === 'right' && floor(popperOffsets.left) < floor(refOffsets.right) || placement === 'top' && floor(popperOffsets.bottom) > floor(refOffsets.top) || placement === 'bottom' && floor(popperOffsets.top) < floor(refOffsets.bottom);
    var overflowsLeft = floor(popperOffsets.left) < floor(boundaries.left);
    var overflowsRight = floor(popperOffsets.right) > floor(boundaries.right);
    var overflowsTop = floor(popperOffsets.top) < floor(boundaries.top);
    var overflowsBottom = floor(popperOffsets.bottom) > floor(boundaries.bottom);
    var overflowsBoundaries = placement === 'left' && overflowsLeft || placement === 'right' && overflowsRight || placement === 'top' && overflowsTop || placement === 'bottom' && overflowsBottom; // flip the variation if required

    var isVertical = ['top', 'bottom'].indexOf(placement) !== -1; // flips variation if reference element overflows boundaries

    var flippedVariationByRef = !!options.flipVariations && (isVertical && variation === 'start' && overflowsLeft || isVertical && variation === 'end' && overflowsRight || !isVertical && variation === 'start' && overflowsTop || !isVertical && variation === 'end' && overflowsBottom); // flips variation if popper content overflows boundaries

    var flippedVariationByContent = !!options.flipVariationsByContent && (isVertical && variation === 'start' && overflowsRight || isVertical && variation === 'end' && overflowsLeft || !isVertical && variation === 'start' && overflowsBottom || !isVertical && variation === 'end' && overflowsTop);
    var flippedVariation = flippedVariationByRef || flippedVariationByContent;

    if (overlapsRef || overflowsBoundaries || flippedVariation) {
      // this boolean to detect any flip loop
      data.flipped = true;

      if (overlapsRef || overflowsBoundaries) {
        placement = flipOrder[index + 1];
      }

      if (flippedVariation) {
        variation = getOppositeVariation(variation);
      }

      data.placement = placement + (variation ? '-' + variation : ''); // this object contains `position`, we want to preserve it along with
      // any additional property we may add in the future

      data.offsets.popper = _extends({}, data.offsets.popper, getPopperOffsets(data.instance.popper, data.offsets.reference, data.placement));
      data = runModifiers(data.instance.modifiers, data, 'flip');
    }
  });
  return data;
}
/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */


function keepTogether(data) {
  var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;
  var placement = data.placement.split('-')[0];
  var floor = Math.floor;
  var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;
  var side = isVertical ? 'right' : 'bottom';
  var opSide = isVertical ? 'left' : 'top';
  var measurement = isVertical ? 'width' : 'height';

  if (popper[side] < floor(reference[opSide])) {
    data.offsets.popper[opSide] = floor(reference[opSide]) - popper[measurement];
  }

  if (popper[opSide] > floor(reference[side])) {
    data.offsets.popper[opSide] = floor(reference[side]);
  }

  return data;
}
/**
 * Converts a string containing value + unit into a px value number
 * @function
 * @memberof {modifiers~offset}
 * @private
 * @argument {String} str - Value + unit string
 * @argument {String} measurement - `height` or `width`
 * @argument {Object} popperOffsets
 * @argument {Object} referenceOffsets
 * @returns {Number|String}
 * Value in pixels, or original string if no values were extracted
 */


function toValue(str, measurement, popperOffsets, referenceOffsets) {
  // separate value from unit
  var split = str.match(/((?:\-|\+)?\d*\.?\d*)(.*)/);
  var value = +split[1];
  var unit = split[2]; // If it's not a number it's an operator, I guess

  if (!value) {
    return str;
  }

  if (unit.indexOf('%') === 0) {
    var element = void 0;

    switch (unit) {
      case '%p':
        element = popperOffsets;
        break;

      case '%':
      case '%r':
      default:
        element = referenceOffsets;
    }

    var rect = getClientRect(element);
    return rect[measurement] / 100 * value;
  } else if (unit === 'vh' || unit === 'vw') {
    // if is a vh or vw, we calculate the size based on the viewport
    var size = void 0;

    if (unit === 'vh') {
      size = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    } else {
      size = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    }

    return size / 100 * value;
  } else {
    // if is an explicit pixel unit, we get rid of the unit and keep the value
    // if is an implicit unit, it's px, and we return just the value
    return value;
  }
}
/**
 * Parse an `offset` string to extrapolate `x` and `y` numeric offsets.
 * @function
 * @memberof {modifiers~offset}
 * @private
 * @argument {String} offset
 * @argument {Object} popperOffsets
 * @argument {Object} referenceOffsets
 * @argument {String} basePlacement
 * @returns {Array} a two cells array with x and y offsets in numbers
 */


function parseOffset(offset, popperOffsets, referenceOffsets, basePlacement) {
  var offsets = [0, 0]; // Use height if placement is left or right and index is 0 otherwise use width
  // in this way the first offset will use an axis and the second one
  // will use the other one

  var useHeight = ['right', 'left'].indexOf(basePlacement) !== -1; // Split the offset string to obtain a list of values and operands
  // The regex addresses values with the plus or minus sign in front (+10, -20, etc)

  var fragments = offset.split(/(\+|\-)/).map(function (frag) {
    return frag.trim();
  }); // Detect if the offset string contains a pair of values or a single one
  // they could be separated by comma or space

  var divider = fragments.indexOf(find(fragments, function (frag) {
    return frag.search(/,|\s/) !== -1;
  }));

  if (fragments[divider] && fragments[divider].indexOf(',') === -1) {
    console.warn('Offsets separated by white space(s) are deprecated, use a comma (,) instead.');
  } // If divider is found, we divide the list of values and operands to divide
  // them by ofset X and Y.


  var splitRegex = /\s*,\s*|\s+/;
  var ops = divider !== -1 ? [fragments.slice(0, divider).concat([fragments[divider].split(splitRegex)[0]]), [fragments[divider].split(splitRegex)[1]].concat(fragments.slice(divider + 1))] : [fragments]; // Convert the values with units to absolute pixels to allow our computations

  ops = ops.map(function (op, index) {
    // Most of the units rely on the orientation of the popper
    var measurement = (index === 1 ? !useHeight : useHeight) ? 'height' : 'width';
    var mergeWithPrevious = false;
    return op // This aggregates any `+` or `-` sign that aren't considered operators
    // e.g.: 10 + +5 => [10, +, +5]
    .reduce(function (a, b) {
      if (a[a.length - 1] === '' && ['+', '-'].indexOf(b) !== -1) {
        a[a.length - 1] = b;
        mergeWithPrevious = true;
        return a;
      } else if (mergeWithPrevious) {
        a[a.length - 1] += b;
        mergeWithPrevious = false;
        return a;
      } else {
        return a.concat(b);
      }
    }, []) // Here we convert the string values into number values (in px)
    .map(function (str) {
      return toValue(str, measurement, popperOffsets, referenceOffsets);
    });
  }); // Loop trough the offsets arrays and execute the operations

  ops.forEach(function (op, index) {
    op.forEach(function (frag, index2) {
      if (isNumeric(frag)) {
        offsets[index] += frag * (op[index2 - 1] === '-' ? -1 : 1);
      }
    });
  });
  return offsets;
}
/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @argument {Number|String} options.offset=0
 * The offset value as described in the modifier description
 * @returns {Object} The data object, properly modified
 */


function offset(data, _ref) {
  var offset = _ref.offset;
  var placement = data.placement,
      _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;
  var basePlacement = placement.split('-')[0];
  var offsets = void 0;

  if (isNumeric(+offset)) {
    offsets = [+offset, 0];
  } else {
    offsets = parseOffset(offset, popper, reference, basePlacement);
  }

  if (basePlacement === 'left') {
    popper.top += offsets[0];
    popper.left -= offsets[1];
  } else if (basePlacement === 'right') {
    popper.top += offsets[0];
    popper.left += offsets[1];
  } else if (basePlacement === 'top') {
    popper.left += offsets[0];
    popper.top -= offsets[1];
  } else if (basePlacement === 'bottom') {
    popper.left += offsets[0];
    popper.top += offsets[1];
  }

  data.popper = popper;
  return data;
}
/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */


function preventOverflow(data, options) {
  var boundariesElement = options.boundariesElement || getOffsetParent(data.instance.popper); // If offsetParent is the reference element, we really want to
  // go one step up and use the next offsetParent as reference to
  // avoid to make this modifier completely useless and look like broken

  if (data.instance.reference === boundariesElement) {
    boundariesElement = getOffsetParent(boundariesElement);
  } // NOTE: DOM access here
  // resets the popper's position so that the document size can be calculated excluding
  // the size of the popper element itself


  var transformProp = getSupportedPropertyName('transform');
  var popperStyles = data.instance.popper.style; // assignment to help minification

  var top = popperStyles.top,
      left = popperStyles.left,
      transform = popperStyles[transformProp];
  popperStyles.top = '';
  popperStyles.left = '';
  popperStyles[transformProp] = '';
  var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, boundariesElement, data.positionFixed); // NOTE: DOM access here
  // restores the original style properties after the offsets have been computed

  popperStyles.top = top;
  popperStyles.left = left;
  popperStyles[transformProp] = transform;
  options.boundaries = boundaries;
  var order = options.priority;
  var popper = data.offsets.popper;
  var check = {
    primary: function primary(placement) {
      var value = popper[placement];

      if (popper[placement] < boundaries[placement] && !options.escapeWithReference) {
        value = Math.max(popper[placement], boundaries[placement]);
      }

      return defineProperty({}, placement, value);
    },
    secondary: function secondary(placement) {
      var mainSide = placement === 'right' ? 'left' : 'top';
      var value = popper[mainSide];

      if (popper[placement] > boundaries[placement] && !options.escapeWithReference) {
        value = Math.min(popper[mainSide], boundaries[placement] - (placement === 'right' ? popper.width : popper.height));
      }

      return defineProperty({}, mainSide, value);
    }
  };
  order.forEach(function (placement) {
    var side = ['left', 'top'].indexOf(placement) !== -1 ? 'primary' : 'secondary';
    popper = _extends({}, popper, check[side](placement));
  });
  data.offsets.popper = popper;
  return data;
}
/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */


function shift(data) {
  var placement = data.placement;
  var basePlacement = placement.split('-')[0];
  var shiftvariation = placement.split('-')[1]; // if shift shiftvariation is specified, run the modifier

  if (shiftvariation) {
    var _data$offsets = data.offsets,
        reference = _data$offsets.reference,
        popper = _data$offsets.popper;
    var isVertical = ['bottom', 'top'].indexOf(basePlacement) !== -1;
    var side = isVertical ? 'left' : 'top';
    var measurement = isVertical ? 'width' : 'height';
    var shiftOffsets = {
      start: defineProperty({}, side, reference[side]),
      end: defineProperty({}, side, reference[side] + reference[measurement] - popper[measurement])
    };
    data.offsets.popper = _extends({}, popper, shiftOffsets[shiftvariation]);
  }

  return data;
}
/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */


function hide(data) {
  if (!isModifierRequired(data.instance.modifiers, 'hide', 'preventOverflow')) {
    return data;
  }

  var refRect = data.offsets.reference;
  var bound = find(data.instance.modifiers, function (modifier) {
    return modifier.name === 'preventOverflow';
  }).boundaries;

  if (refRect.bottom < bound.top || refRect.left > bound.right || refRect.top > bound.bottom || refRect.right < bound.left) {
    // Avoid unnecessary DOM access if visibility hasn't changed
    if (data.hide === true) {
      return data;
    }

    data.hide = true;
    data.attributes['x-out-of-boundaries'] = '';
  } else {
    // Avoid unnecessary DOM access if visibility hasn't changed
    if (data.hide === false) {
      return data;
    }

    data.hide = false;
    data.attributes['x-out-of-boundaries'] = false;
  }

  return data;
}
/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */


function inner(data) {
  var placement = data.placement;
  var basePlacement = placement.split('-')[0];
  var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;
  var isHoriz = ['left', 'right'].indexOf(basePlacement) !== -1;
  var subtractLength = ['top', 'left'].indexOf(basePlacement) === -1;
  popper[isHoriz ? 'left' : 'top'] = reference[basePlacement] - (subtractLength ? popper[isHoriz ? 'width' : 'height'] : 0);
  data.placement = getOppositePlacement(placement);
  data.offsets.popper = getClientRect(popper);
  return data;
}
/**
 * Modifier function, each modifier can have a function of this type assigned
 * to its `fn` property.<br />
 * These functions will be called on each update, this means that you must
 * make sure they are performant enough to avoid performance bottlenecks.
 *
 * @function ModifierFn
 * @argument {dataObject} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {dataObject} The data object, properly modified
 */

/**
 * Modifiers are plugins used to alter the behavior of your poppers.<br />
 * Popper.js uses a set of 9 modifiers to provide all the basic functionalities
 * needed by the library.
 *
 * Usually you don't want to override the `order`, `fn` and `onLoad` props.
 * All the other properties are configurations that could be tweaked.
 * @namespace modifiers
 */


var modifiers = {
  /**
   * Modifier used to shift the popper on the start or end of its reference
   * element.<br />
   * It will read the variation of the `placement` property.<br />
   * It can be one either `-end` or `-start`.
   * @memberof modifiers
   * @inner
   */
  shift: {
    /** @prop {number} order=100 - Index used to define the order of execution */
    order: 100,

    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,

    /** @prop {ModifierFn} */
    fn: shift
  },

  /**
   * The `offset` modifier can shift your popper on both its axis.
   *
   * It accepts the following units:
   * - `px` or unit-less, interpreted as pixels
   * - `%` or `%r`, percentage relative to the length of the reference element
   * - `%p`, percentage relative to the length of the popper element
   * - `vw`, CSS viewport width unit
   * - `vh`, CSS viewport height unit
   *
   * For length is intended the main axis relative to the placement of the popper.<br />
   * This means that if the placement is `top` or `bottom`, the length will be the
   * `width`. In case of `left` or `right`, it will be the `height`.
   *
   * You can provide a single value (as `Number` or `String`), or a pair of values
   * as `String` divided by a comma or one (or more) white spaces.<br />
   * The latter is a deprecated method because it leads to confusion and will be
   * removed in v2.<br />
   * Additionally, it accepts additions and subtractions between different units.
   * Note that multiplications and divisions aren't supported.
   *
   * Valid examples are:
   * ```
   * 10
   * '10%'
   * '10, 10'
   * '10%, 10'
   * '10 + 10%'
   * '10 - 5vh + 3%'
   * '-10px + 5vh, 5px - 6%'
   * ```
   * > **NB**: If you desire to apply offsets to your poppers in a way that may make them overlap
   * > with their reference element, unfortunately, you will have to disable the `flip` modifier.
   * > You can read more on this at this [issue](https://github.com/FezVrasta/popper.js/issues/373).
   *
   * @memberof modifiers
   * @inner
   */
  offset: {
    /** @prop {number} order=200 - Index used to define the order of execution */
    order: 200,

    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,

    /** @prop {ModifierFn} */
    fn: offset,

    /** @prop {Number|String} offset=0
     * The offset value as described in the modifier description
     */
    offset: 0
  },

  /**
   * Modifier used to prevent the popper from being positioned outside the boundary.
   *
   * A scenario exists where the reference itself is not within the boundaries.<br />
   * We can say it has "escaped the boundaries" — or just "escaped".<br />
   * In this case we need to decide whether the popper should either:
   *
   * - detach from the reference and remain "trapped" in the boundaries, or
   * - if it should ignore the boundary and "escape with its reference"
   *
   * When `escapeWithReference` is set to`true` and reference is completely
   * outside its boundaries, the popper will overflow (or completely leave)
   * the boundaries in order to remain attached to the edge of the reference.
   *
   * @memberof modifiers
   * @inner
   */
  preventOverflow: {
    /** @prop {number} order=300 - Index used to define the order of execution */
    order: 300,

    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,

    /** @prop {ModifierFn} */
    fn: preventOverflow,

    /**
     * @prop {Array} [priority=['left','right','top','bottom']]
     * Popper will try to prevent overflow following these priorities by default,
     * then, it could overflow on the left and on top of the `boundariesElement`
     */
    priority: ['left', 'right', 'top', 'bottom'],

    /**
     * @prop {number} padding=5
     * Amount of pixel used to define a minimum distance between the boundaries
     * and the popper. This makes sure the popper always has a little padding
     * between the edges of its container
     */
    padding: 5,

    /**
     * @prop {String|HTMLElement} boundariesElement='scrollParent'
     * Boundaries used by the modifier. Can be `scrollParent`, `window`,
     * `viewport` or any DOM element.
     */
    boundariesElement: 'scrollParent'
  },

  /**
   * Modifier used to make sure the reference and its popper stay near each other
   * without leaving any gap between the two. Especially useful when the arrow is
   * enabled and you want to ensure that it points to its reference element.
   * It cares only about the first axis. You can still have poppers with margin
   * between the popper and its reference element.
   * @memberof modifiers
   * @inner
   */
  keepTogether: {
    /** @prop {number} order=400 - Index used to define the order of execution */
    order: 400,

    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,

    /** @prop {ModifierFn} */
    fn: keepTogether
  },

  /**
   * This modifier is used to move the `arrowElement` of the popper to make
   * sure it is positioned between the reference element and its popper element.
   * It will read the outer size of the `arrowElement` node to detect how many
   * pixels of conjunction are needed.
   *
   * It has no effect if no `arrowElement` is provided.
   * @memberof modifiers
   * @inner
   */
  arrow: {
    /** @prop {number} order=500 - Index used to define the order of execution */
    order: 500,

    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,

    /** @prop {ModifierFn} */
    fn: arrow,

    /** @prop {String|HTMLElement} element='[x-arrow]' - Selector or node used as arrow */
    element: '[x-arrow]'
  },

  /**
   * Modifier used to flip the popper's placement when it starts to overlap its
   * reference element.
   *
   * Requires the `preventOverflow` modifier before it in order to work.
   *
   * **NOTE:** this modifier will interrupt the current update cycle and will
   * restart it if it detects the need to flip the placement.
   * @memberof modifiers
   * @inner
   */
  flip: {
    /** @prop {number} order=600 - Index used to define the order of execution */
    order: 600,

    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,

    /** @prop {ModifierFn} */
    fn: flip,

    /**
     * @prop {String|Array} behavior='flip'
     * The behavior used to change the popper's placement. It can be one of
     * `flip`, `clockwise`, `counterclockwise` or an array with a list of valid
     * placements (with optional variations)
     */
    behavior: 'flip',

    /**
     * @prop {number} padding=5
     * The popper will flip if it hits the edges of the `boundariesElement`
     */
    padding: 5,

    /**
     * @prop {String|HTMLElement} boundariesElement='viewport'
     * The element which will define the boundaries of the popper position.
     * The popper will never be placed outside of the defined boundaries
     * (except if `keepTogether` is enabled)
     */
    boundariesElement: 'viewport',

    /**
     * @prop {Boolean} flipVariations=false
     * The popper will switch placement variation between `-start` and `-end` when
     * the reference element overlaps its boundaries.
     *
     * The original placement should have a set variation.
     */
    flipVariations: false,

    /**
     * @prop {Boolean} flipVariationsByContent=false
     * The popper will switch placement variation between `-start` and `-end` when
     * the popper element overlaps its reference boundaries.
     *
     * The original placement should have a set variation.
     */
    flipVariationsByContent: false
  },

  /**
   * Modifier used to make the popper flow toward the inner of the reference element.
   * By default, when this modifier is disabled, the popper will be placed outside
   * the reference element.
   * @memberof modifiers
   * @inner
   */
  inner: {
    /** @prop {number} order=700 - Index used to define the order of execution */
    order: 700,

    /** @prop {Boolean} enabled=false - Whether the modifier is enabled or not */
    enabled: false,

    /** @prop {ModifierFn} */
    fn: inner
  },

  /**
   * Modifier used to hide the popper when its reference element is outside of the
   * popper boundaries. It will set a `x-out-of-boundaries` attribute which can
   * be used to hide with a CSS selector the popper when its reference is
   * out of boundaries.
   *
   * Requires the `preventOverflow` modifier before it in order to work.
   * @memberof modifiers
   * @inner
   */
  hide: {
    /** @prop {number} order=800 - Index used to define the order of execution */
    order: 800,

    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,

    /** @prop {ModifierFn} */
    fn: hide
  },

  /**
   * Computes the style that will be applied to the popper element to gets
   * properly positioned.
   *
   * Note that this modifier will not touch the DOM, it just prepares the styles
   * so that `applyStyle` modifier can apply it. This separation is useful
   * in case you need to replace `applyStyle` with a custom implementation.
   *
   * This modifier has `850` as `order` value to maintain backward compatibility
   * with previous versions of Popper.js. Expect the modifiers ordering method
   * to change in future major versions of the library.
   *
   * @memberof modifiers
   * @inner
   */
  computeStyle: {
    /** @prop {number} order=850 - Index used to define the order of execution */
    order: 850,

    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,

    /** @prop {ModifierFn} */
    fn: computeStyle,

    /**
     * @prop {Boolean} gpuAcceleration=true
     * If true, it uses the CSS 3D transformation to position the popper.
     * Otherwise, it will use the `top` and `left` properties
     */
    gpuAcceleration: true,

    /**
     * @prop {string} [x='bottom']
     * Where to anchor the X axis (`bottom` or `top`). AKA X offset origin.
     * Change this if your popper should grow in a direction different from `bottom`
     */
    x: 'bottom',

    /**
     * @prop {string} [x='left']
     * Where to anchor the Y axis (`left` or `right`). AKA Y offset origin.
     * Change this if your popper should grow in a direction different from `right`
     */
    y: 'right'
  },

  /**
   * Applies the computed styles to the popper element.
   *
   * All the DOM manipulations are limited to this modifier. This is useful in case
   * you want to integrate Popper.js inside a framework or view library and you
   * want to delegate all the DOM manipulations to it.
   *
   * Note that if you disable this modifier, you must make sure the popper element
   * has its position set to `absolute` before Popper.js can do its work!
   *
   * Just disable this modifier and define your own to achieve the desired effect.
   *
   * @memberof modifiers
   * @inner
   */
  applyStyle: {
    /** @prop {number} order=900 - Index used to define the order of execution */
    order: 900,

    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,

    /** @prop {ModifierFn} */
    fn: applyStyle,

    /** @prop {Function} */
    onLoad: applyStyleOnLoad,

    /**
     * @deprecated since version 1.10.0, the property moved to `computeStyle` modifier
     * @prop {Boolean} gpuAcceleration=true
     * If true, it uses the CSS 3D transformation to position the popper.
     * Otherwise, it will use the `top` and `left` properties
     */
    gpuAcceleration: undefined
  }
};
/**
 * The `dataObject` is an object containing all the information used by Popper.js.
 * This object is passed to modifiers and to the `onCreate` and `onUpdate` callbacks.
 * @name dataObject
 * @property {Object} data.instance The Popper.js instance
 * @property {String} data.placement Placement applied to popper
 * @property {String} data.originalPlacement Placement originally defined on init
 * @property {Boolean} data.flipped True if popper has been flipped by flip modifier
 * @property {Boolean} data.hide True if the reference element is out of boundaries, useful to know when to hide the popper
 * @property {HTMLElement} data.arrowElement Node used as arrow by arrow modifier
 * @property {Object} data.styles Any CSS property defined here will be applied to the popper. It expects the JavaScript nomenclature (eg. `marginBottom`)
 * @property {Object} data.arrowStyles Any CSS property defined here will be applied to the popper arrow. It expects the JavaScript nomenclature (eg. `marginBottom`)
 * @property {Object} data.boundaries Offsets of the popper boundaries
 * @property {Object} data.offsets The measurements of popper, reference and arrow elements
 * @property {Object} data.offsets.popper `top`, `left`, `width`, `height` values
 * @property {Object} data.offsets.reference `top`, `left`, `width`, `height` values
 * @property {Object} data.offsets.arrow] `top` and `left` offsets, only one of them will be different from 0
 */

/**
 * Default options provided to Popper.js constructor.<br />
 * These can be overridden using the `options` argument of Popper.js.<br />
 * To override an option, simply pass an object with the same
 * structure of the `options` object, as the 3rd argument. For example:
 * ```
 * new Popper(ref, pop, {
 *   modifiers: {
 *     preventOverflow: { enabled: false }
 *   }
 * })
 * ```
 * @type {Object}
 * @static
 * @memberof Popper
 */

var Defaults = {
  /**
   * Popper's placement.
   * @prop {Popper.placements} placement='bottom'
   */
  placement: 'bottom',

  /**
   * Set this to true if you want popper to position it self in 'fixed' mode
   * @prop {Boolean} positionFixed=false
   */
  positionFixed: false,

  /**
   * Whether events (resize, scroll) are initially enabled.
   * @prop {Boolean} eventsEnabled=true
   */
  eventsEnabled: true,

  /**
   * Set to true if you want to automatically remove the popper when
   * you call the `destroy` method.
   * @prop {Boolean} removeOnDestroy=false
   */
  removeOnDestroy: false,

  /**
   * Callback called when the popper is created.<br />
   * By default, it is set to no-op.<br />
   * Access Popper.js instance with `data.instance`.
   * @prop {onCreate}
   */
  onCreate: function onCreate() {},

  /**
   * Callback called when the popper is updated. This callback is not called
   * on the initialization/creation of the popper, but only on subsequent
   * updates.<br />
   * By default, it is set to no-op.<br />
   * Access Popper.js instance with `data.instance`.
   * @prop {onUpdate}
   */
  onUpdate: function onUpdate() {},

  /**
   * List of modifiers used to modify the offsets before they are applied to the popper.
   * They provide most of the functionalities of Popper.js.
   * @prop {modifiers}
   */
  modifiers: modifiers
};
/**
 * @callback onCreate
 * @param {dataObject} data
 */

/**
 * @callback onUpdate
 * @param {dataObject} data
 */
// Utils
// Methods

var Popper = function () {
  /**
   * Creates a new Popper.js instance.
   * @class Popper
   * @param {Element|referenceObject} reference - The reference element used to position the popper
   * @param {Element} popper - The HTML / XML element used as the popper
   * @param {Object} options - Your custom options to override the ones defined in [Defaults](#defaults)
   * @return {Object} instance - The generated Popper.js instance
   */
  function Popper(reference, popper) {
    var _this = this;

    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    classCallCheck(this, Popper);

    this.scheduleUpdate = function () {
      return requestAnimationFrame(_this.update);
    }; // make update() debounced, so that it only runs at most once-per-tick


    this.update = debounce(this.update.bind(this)); // with {} we create a new object with the options inside it

    this.options = _extends({}, Popper.Defaults, options); // init state

    this.state = {
      isDestroyed: false,
      isCreated: false,
      scrollParents: []
    }; // get reference and popper elements (allow jQuery wrappers)

    this.reference = reference && reference.jquery ? reference[0] : reference;
    this.popper = popper && popper.jquery ? popper[0] : popper; // Deep merge modifiers options

    this.options.modifiers = {};
    Object.keys(_extends({}, Popper.Defaults.modifiers, options.modifiers)).forEach(function (name) {
      _this.options.modifiers[name] = _extends({}, Popper.Defaults.modifiers[name] || {}, options.modifiers ? options.modifiers[name] : {});
    }); // Refactoring modifiers' list (Object => Array)

    this.modifiers = Object.keys(this.options.modifiers).map(function (name) {
      return _extends({
        name: name
      }, _this.options.modifiers[name]);
    }) // sort the modifiers by order
    .sort(function (a, b) {
      return a.order - b.order;
    }); // modifiers have the ability to execute arbitrary code when Popper.js get inited
    // such code is executed in the same order of its modifier
    // they could add new properties to their options configuration
    // BE AWARE: don't add options to `options.modifiers.name` but to `modifierOptions`!

    this.modifiers.forEach(function (modifierOptions) {
      if (modifierOptions.enabled && isFunction(modifierOptions.onLoad)) {
        modifierOptions.onLoad(_this.reference, _this.popper, _this.options, modifierOptions, _this.state);
      }
    }); // fire the first update to position the popper in the right place

    this.update();
    var eventsEnabled = this.options.eventsEnabled;

    if (eventsEnabled) {
      // setup event listeners, they will take care of update the position in specific situations
      this.enableEventListeners();
    }

    this.state.eventsEnabled = eventsEnabled;
  } // We can't use class properties because they don't get listed in the
  // class prototype and break stuff like Sinon stubs


  createClass(Popper, [{
    key: 'update',
    value: function update$$1() {
      return update.call(this);
    }
  }, {
    key: 'destroy',
    value: function destroy$$1() {
      return destroy.call(this);
    }
  }, {
    key: 'enableEventListeners',
    value: function enableEventListeners$$1() {
      return enableEventListeners.call(this);
    }
  }, {
    key: 'disableEventListeners',
    value: function disableEventListeners$$1() {
      return disableEventListeners.call(this);
    }
    /**
     * Schedules an update. It will run on the next UI update available.
     * @method scheduleUpdate
     * @memberof Popper
     */

    /**
     * Collection of utilities useful when writing custom modifiers.
     * Starting from version 1.7, this method is available only if you
     * include `popper-utils.js` before `popper.js`.
     *
     * **DEPRECATION**: This way to access PopperUtils is deprecated
     * and will be removed in v2! Use the PopperUtils module directly instead.
     * Due to the high instability of the methods contained in Utils, we can't
     * guarantee them to follow semver. Use them at your own risk!
     * @static
     * @private
     * @type {Object}
     * @deprecated since version 1.8
     * @member Utils
     * @memberof Popper
     */

  }]);
  return Popper;
}();
/**
 * The `referenceObject` is an object that provides an interface compatible with Popper.js
 * and lets you use it as replacement of a real DOM node.<br />
 * You can use this method to position a popper relatively to a set of coordinates
 * in case you don't have a DOM node to use as reference.
 *
 * ```
 * new Popper(referenceObject, popperNode);
 * ```
 *
 * NB: This feature isn't supported in Internet Explorer 10.
 * @name referenceObject
 * @property {Function} data.getBoundingClientRect
 * A function that returns a set of coordinates compatible with the native `getBoundingClientRect` method.
 * @property {number} data.clientWidth
 * An ES6 getter that will return the width of the virtual reference element.
 * @property {number} data.clientHeight
 * An ES6 getter that will return the height of the virtual reference element.
 */


Popper.Utils = (typeof window !== 'undefined' ? window : global).PopperUtils;
Popper.placements = placements;
Popper.Defaults = Defaults;
var _default = Popper;
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/v-tooltip/dist/v-tooltip.esm.js":
/*!******************************************************!*\
  !*** ./node_modules/v-tooltip/dist/v-tooltip.esm.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createTooltip = createTooltip;
exports.destroyTooltip = destroyTooltip;
exports.install = install;
exports.VTooltip = exports.VPopover = exports.VClosePopover = exports.default = void 0;

var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ "./node_modules/@babel/runtime/helpers/typeof.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js"));

var _popper = _interopRequireDefault(__webpack_require__(/*! popper.js */ "./node_modules/popper.js/dist/esm/popper.js"));

var _isEqual = _interopRequireDefault(__webpack_require__(/*! lodash/isEqual */ "./node_modules/lodash/isEqual.js"));

var _vueResize = __webpack_require__(/*! vue-resize */ "./node_modules/vue-resize/dist/vue-resize.esm.js");

var _merge = _interopRequireDefault(__webpack_require__(/*! lodash/merge */ "./node_modules/lodash/merge.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SVGAnimatedString = function SVGAnimatedString() {};

if (typeof window !== 'undefined') {
  SVGAnimatedString = window.SVGAnimatedString;
}

function convertToArray(value) {
  if (typeof value === 'string') {
    value = value.split(' ');
  }

  return value;
}
/**
 * Add classes to an element.
 * This method checks to ensure that the classes don't already exist before adding them.
 * It uses el.className rather than classList in order to be IE friendly.
 * @param {object} el - The element to add the classes to.
 * @param {classes} string - List of space separated classes to be added to the element.
 */


function addClasses(el, classes) {
  var newClasses = convertToArray(classes);
  var classList;

  if (el.className instanceof SVGAnimatedString) {
    classList = convertToArray(el.className.baseVal);
  } else {
    classList = convertToArray(el.className);
  }

  newClasses.forEach(function (newClass) {
    if (classList.indexOf(newClass) === -1) {
      classList.push(newClass);
    }
  });

  if (el instanceof SVGElement) {
    el.setAttribute('class', classList.join(' '));
  } else {
    el.className = classList.join(' ');
  }
}
/**
 * Remove classes from an element.
 * It uses el.className rather than classList in order to be IE friendly.
 * @export
 * @param {any} el The element to remove the classes from.
 * @param {any} classes List of space separated classes to be removed from the element.
 */


function removeClasses(el, classes) {
  var newClasses = convertToArray(classes);
  var classList;

  if (el.className instanceof SVGAnimatedString) {
    classList = convertToArray(el.className.baseVal);
  } else {
    classList = convertToArray(el.className);
  }

  newClasses.forEach(function (newClass) {
    var index = classList.indexOf(newClass);

    if (index !== -1) {
      classList.splice(index, 1);
    }
  });

  if (el instanceof SVGElement) {
    el.setAttribute('class', classList.join(' '));
  } else {
    el.className = classList.join(' ');
  }
}

var supportsPassive = false;

if (typeof window !== 'undefined') {
  supportsPassive = false;

  try {
    var opts = Object.defineProperty({}, 'passive', {
      get: function get() {
        supportsPassive = true;
      }
    });
    window.addEventListener('test', null, opts);
  } catch (e) {}
}

function ownKeys$2(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread$2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys$2(Object(source), true).forEach(function (key) {
        (0, _defineProperty2.default)(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys$2(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

var DEFAULT_OPTIONS = {
  container: false,
  delay: 0,
  html: false,
  placement: 'top',
  title: '',
  template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
  trigger: 'hover focus',
  offset: 0
};
var openTooltips = [];

var Tooltip = /*#__PURE__*/function () {
  /**
   * Create a new Tooltip.js instance
   * @class Tooltip
   * @param {HTMLElement} reference - The DOM node used as reference of the tooltip (it can be a jQuery element).
   * @param {Object} options
   * @param {String} options.placement=bottom
   *      Placement of the popper accepted values: `top(-start, -end), right(-start, -end), bottom(-start, -end),
   *      left(-start, -end)`
   * @param {HTMLElement|String|false} options.container=false - Append the tooltip to a specific element.
   * @param {Number|Object} options.delay=0
   *      Delay showing and hiding the tooltip (ms) - does not apply to manual trigger type.
   *      If a number is supplied, delay is applied to both hide/show.
   *      Object structure is: `{ show: 500, hide: 100 }`
   * @param {Boolean} options.html=false - Insert HTML into the tooltip. If false, the content will inserted with `innerText`.
   * @param {String|PlacementFunction} options.placement='top' - One of the allowed placements, or a function returning one of them.
   * @param {String} [options.template='<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>']
   *      Base HTML to used when creating the tooltip.
   *      The tooltip's `title` will be injected into the `.tooltip-inner` or `.tooltip__inner`.
   *      `.tooltip-arrow` or `.tooltip__arrow` will become the tooltip's arrow.
   *      The outermost wrapper element should have the `.tooltip` class.
   * @param {String|HTMLElement|TitleFunction} options.title='' - Default title value if `title` attribute isn't present.
   * @param {String} [options.trigger='hover focus']
   *      How tooltip is triggered - click, hover, focus, manual.
   *      You may pass multiple triggers; separate them with a space. `manual` cannot be combined with any other trigger.
   * @param {HTMLElement} options.boundariesElement
   *      The element used as boundaries for the tooltip. For more information refer to Popper.js'
   *      [boundariesElement docs](https://popper.js.org/popper-documentation.html)
   * @param {Number|String} options.offset=0 - Offset of the tooltip relative to its reference. For more information refer to Popper.js'
   *      [offset docs](https://popper.js.org/popper-documentation.html)
   * @param {Object} options.popperOptions={} - Popper options, will be passed directly to popper instance. For more information refer to Popper.js'
   *      [options docs](https://popper.js.org/popper-documentation.html)
   * @param {string} [options.ariaId] Id used for accessibility
   * @return {Object} instance - The generated tooltip instance
   */
  function Tooltip(_reference, _options) {
    var _this = this;

    (0, _classCallCheck2.default)(this, Tooltip);
    (0, _defineProperty2.default)(this, "_events", []);
    (0, _defineProperty2.default)(this, "_setTooltipNodeEvent", function (evt, reference, delay, options) {
      var relatedreference = evt.relatedreference || evt.toElement || evt.relatedTarget;

      var callback = function callback(evt2) {
        var relatedreference2 = evt2.relatedreference || evt2.toElement || evt2.relatedTarget; // Remove event listener after call

        _this._tooltipNode.removeEventListener(evt.type, callback); // If the new reference is not the reference element


        if (!reference.contains(relatedreference2)) {
          // Schedule to hide tooltip
          _this._scheduleHide(reference, options.delay, options, evt2);
        }
      };

      if (_this._tooltipNode.contains(relatedreference)) {
        // listen to mouseleave on the tooltip element to be able to hide the tooltip
        _this._tooltipNode.addEventListener(evt.type, callback);

        return true;
      }

      return false;
    }); // apply user options over default ones

    _options = _objectSpread$2(_objectSpread$2({}, DEFAULT_OPTIONS), _options);
    _reference.jquery && (_reference = _reference[0]);
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this); // cache reference and options

    this.reference = _reference;
    this.options = _options; // set initial state

    this._isOpen = false;

    this._init();
  } //
  // Public methods
  //

  /**
   * Reveals an element's tooltip. This is considered a "manual" triggering of the tooltip.
   * Tooltips with zero-length titles are never displayed.
   * @method Tooltip#show
   * @memberof Tooltip
   */


  (0, _createClass2.default)(Tooltip, [{
    key: "show",
    value: function show() {
      this._show(this.reference, this.options);
    }
    /**
     * Hides an element’s tooltip. This is considered a “manual” triggering of the tooltip.
     * @method Tooltip#hide
     * @memberof Tooltip
     */

  }, {
    key: "hide",
    value: function hide() {
      this._hide();
    }
    /**
     * Hides and destroys an element’s tooltip.
     * @method Tooltip#dispose
     * @memberof Tooltip
     */

  }, {
    key: "dispose",
    value: function dispose() {
      this._dispose();
    }
    /**
     * Toggles an element’s tooltip. This is considered a “manual” triggering of the tooltip.
     * @method Tooltip#toggle
     * @memberof Tooltip
     */

  }, {
    key: "toggle",
    value: function toggle() {
      if (this._isOpen) {
        return this.hide();
      } else {
        return this.show();
      }
    }
  }, {
    key: "setClasses",
    value: function setClasses(classes) {
      this._classes = classes;
    }
  }, {
    key: "setContent",
    value: function setContent(content) {
      this.options.title = content;

      if (this._tooltipNode) {
        this._setContent(content, this.options);
      }
    }
  }, {
    key: "setOptions",
    value: function setOptions(options) {
      var classesUpdated = false;
      var classes = options && options.classes || directive.options.defaultClass;

      if (!(0, _isEqual.default)(this._classes, classes)) {
        this.setClasses(classes);
        classesUpdated = true;
      }

      options = getOptions(options);
      var needPopperUpdate = false;
      var needRestart = false;

      if (this.options.offset !== options.offset || this.options.placement !== options.placement) {
        needPopperUpdate = true;
      }

      if (this.options.template !== options.template || this.options.trigger !== options.trigger || this.options.container !== options.container || classesUpdated) {
        needRestart = true;
      }

      for (var key in options) {
        this.options[key] = options[key];
      }

      if (this._tooltipNode) {
        if (needRestart) {
          var isOpen = this._isOpen;
          this.dispose();

          this._init();

          if (isOpen) {
            this.show();
          }
        } else if (needPopperUpdate) {
          this.popperInstance.update();
        }
      }
    } //
    // Private methods
    //

  }, {
    key: "_init",
    value: function _init() {
      // get events list
      var events = typeof this.options.trigger === 'string' ? this.options.trigger.split(' ') : [];
      this._isDisposed = false;
      this._enableDocumentTouch = events.indexOf('manual') === -1;
      events = events.filter(function (trigger) {
        return ['click', 'hover', 'focus'].indexOf(trigger) !== -1;
      }); // set event listeners

      this._setEventListeners(this.reference, events, this.options); // title attribute


      this.$_originalTitle = this.reference.getAttribute('title');
      this.reference.removeAttribute('title');
      this.reference.setAttribute('data-original-title', this.$_originalTitle);
    }
    /**
     * Creates a new tooltip node
     * @memberof Tooltip
     * @private
     * @param {HTMLElement} reference
     * @param {String} template
     * @param {String|HTMLElement|TitleFunction} title
     * @param {Boolean} allowHtml
     * @return {HTMLelement} tooltipNode
     */

  }, {
    key: "_create",
    value: function _create(reference, template) {
      var _this2 = this; // create tooltip element


      var tooltipGenerator = window.document.createElement('div');
      tooltipGenerator.innerHTML = template.trim();
      var tooltipNode = tooltipGenerator.childNodes[0]; // add unique ID to our tooltip (needed for accessibility reasons)

      tooltipNode.id = this.options.ariaId || "tooltip_".concat(Math.random().toString(36).substr(2, 10)); // Initially hide the tooltip
      // The attribute will be switched in a next frame so
      // CSS transitions can play

      tooltipNode.setAttribute('aria-hidden', 'true');

      if (this.options.autoHide && this.options.trigger.indexOf('hover') !== -1) {
        tooltipNode.addEventListener('mouseenter', function (evt) {
          return _this2._scheduleHide(reference, _this2.options.delay, _this2.options, evt);
        });
        tooltipNode.addEventListener('click', function (evt) {
          return _this2._scheduleHide(reference, _this2.options.delay, _this2.options, evt);
        });
      } // return the generated tooltip node


      return tooltipNode;
    }
  }, {
    key: "_setContent",
    value: function _setContent(content, options) {
      var _this3 = this;

      this.asyncContent = false;

      this._applyContent(content, options).then(function () {
        if (!_this3.popperInstance) return;

        _this3.popperInstance.update();
      });
    }
  }, {
    key: "_applyContent",
    value: function _applyContent(title, options) {
      var _this4 = this;

      return new Promise(function (resolve, reject) {
        var allowHtml = options.html;
        var rootNode = _this4._tooltipNode;
        if (!rootNode) return;
        var titleNode = rootNode.querySelector(_this4.options.innerSelector);

        if (title.nodeType === 1) {
          // if title is a node, append it only if allowHtml is true
          if (allowHtml) {
            while (titleNode.firstChild) {
              titleNode.removeChild(titleNode.firstChild);
            }

            titleNode.appendChild(title);
          }
        } else if (typeof title === 'function') {
          // if title is a function, call it and set innerText or innerHtml depending by `allowHtml` value
          var result = title();

          if (result && typeof result.then === 'function') {
            _this4.asyncContent = true;
            options.loadingClass && addClasses(rootNode, options.loadingClass);

            if (options.loadingContent) {
              _this4._applyContent(options.loadingContent, options);
            }

            result.then(function (asyncResult) {
              options.loadingClass && removeClasses(rootNode, options.loadingClass);
              return _this4._applyContent(asyncResult, options);
            }).then(resolve).catch(reject);
          } else {
            _this4._applyContent(result, options).then(resolve).catch(reject);
          }

          return;
        } else {
          // if it's just a simple text, set innerText or innerHtml depending by `allowHtml` value
          allowHtml ? titleNode.innerHTML = title : titleNode.innerText = title;
        }

        resolve();
      });
    }
  }, {
    key: "_show",
    value: function _show(reference, options) {
      if (options && typeof options.container === 'string') {
        var container = document.querySelector(options.container);
        if (!container) return;
      }

      clearTimeout(this._disposeTimer);
      options = Object.assign({}, options);
      delete options.offset;
      var updateClasses = true;

      if (this._tooltipNode) {
        addClasses(this._tooltipNode, this._classes);
        updateClasses = false;
      }

      var result = this._ensureShown(reference, options);

      if (updateClasses && this._tooltipNode) {
        addClasses(this._tooltipNode, this._classes);
      }

      addClasses(reference, ['v-tooltip-open']);
      return result;
    }
  }, {
    key: "_ensureShown",
    value: function _ensureShown(reference, options) {
      var _this5 = this; // don't show if it's already visible


      if (this._isOpen) {
        return this;
      }

      this._isOpen = true;
      openTooltips.push(this); // if the tooltipNode already exists, just show it

      if (this._tooltipNode) {
        this._tooltipNode.style.display = '';

        this._tooltipNode.setAttribute('aria-hidden', 'false');

        this.popperInstance.enableEventListeners();
        this.popperInstance.update();

        if (this.asyncContent) {
          this._setContent(options.title, options);
        }

        return this;
      } // get title


      var title = reference.getAttribute('title') || options.title; // don't show tooltip if no title is defined

      if (!title) {
        return this;
      } // create tooltip node


      var tooltipNode = this._create(reference, options.template);

      this._tooltipNode = tooltipNode; // Add `aria-describedby` to our reference element for accessibility reasons

      reference.setAttribute('aria-describedby', tooltipNode.id); // append tooltip to container

      var container = this._findContainer(options.container, reference);

      this._append(tooltipNode, container);

      var popperOptions = _objectSpread$2(_objectSpread$2({}, options.popperOptions), {}, {
        placement: options.placement
      });

      popperOptions.modifiers = _objectSpread$2(_objectSpread$2({}, popperOptions.modifiers), {}, {
        arrow: {
          element: this.options.arrowSelector
        }
      });

      if (options.boundariesElement) {
        popperOptions.modifiers.preventOverflow = {
          boundariesElement: options.boundariesElement
        };
      }

      this.popperInstance = new _popper.default(reference, tooltipNode, popperOptions);

      this._setContent(title, options); // Fix position


      requestAnimationFrame(function () {
        if (!_this5._isDisposed && _this5.popperInstance) {
          _this5.popperInstance.update(); // Show the tooltip


          requestAnimationFrame(function () {
            if (!_this5._isDisposed) {
              _this5._isOpen && tooltipNode.setAttribute('aria-hidden', 'false');
            } else {
              _this5.dispose();
            }
          });
        } else {
          _this5.dispose();
        }
      });
      return this;
    }
  }, {
    key: "_noLongerOpen",
    value: function _noLongerOpen() {
      var index = openTooltips.indexOf(this);

      if (index !== -1) {
        openTooltips.splice(index, 1);
      }
    }
  }, {
    key: "_hide",
    value: function _hide()
    /* reference, options */
    {
      var _this6 = this; // don't hide if it's already hidden


      if (!this._isOpen) {
        return this;
      }

      this._isOpen = false;

      this._noLongerOpen(); // hide tooltipNode


      this._tooltipNode.style.display = 'none';

      this._tooltipNode.setAttribute('aria-hidden', 'true');

      if (this.popperInstance) {
        this.popperInstance.disableEventListeners();
      }

      clearTimeout(this._disposeTimer);
      var disposeTime = directive.options.disposeTimeout;

      if (disposeTime !== null) {
        this._disposeTimer = setTimeout(function () {
          if (_this6._tooltipNode) {
            _this6._tooltipNode.removeEventListener('mouseenter', _this6.hide);

            _this6._tooltipNode.removeEventListener('click', _this6.hide); // Don't remove popper instance, just the HTML element


            _this6._removeTooltipNode();
          }
        }, disposeTime);
      }

      removeClasses(this.reference, ['v-tooltip-open']);
      return this;
    }
  }, {
    key: "_removeTooltipNode",
    value: function _removeTooltipNode() {
      if (!this._tooltipNode) return;
      var parentNode = this._tooltipNode.parentNode;

      if (parentNode) {
        parentNode.removeChild(this._tooltipNode);
        this.reference.removeAttribute('aria-describedby');
      }

      this._tooltipNode = null;
    }
  }, {
    key: "_dispose",
    value: function _dispose() {
      var _this7 = this;

      this._isDisposed = true;
      this.reference.removeAttribute('data-original-title');

      if (this.$_originalTitle) {
        this.reference.setAttribute('title', this.$_originalTitle);
      } // remove event listeners first to prevent any unexpected behaviour


      this._events.forEach(function (_ref) {
        var func = _ref.func,
            event = _ref.event;

        _this7.reference.removeEventListener(event, func);
      });

      this._events = [];

      if (this._tooltipNode) {
        this._hide();

        this._tooltipNode.removeEventListener('mouseenter', this.hide);

        this._tooltipNode.removeEventListener('click', this.hide); // destroy instance


        this.popperInstance.destroy(); // destroy tooltipNode if removeOnDestroy is not set, as popperInstance.destroy() already removes the element

        if (!this.popperInstance.options.removeOnDestroy) {
          this._removeTooltipNode();
        }
      } else {
        this._noLongerOpen();
      }

      return this;
    }
  }, {
    key: "_findContainer",
    value: function _findContainer(container, reference) {
      // if container is a query, get the relative element
      if (typeof container === 'string') {
        container = window.document.querySelector(container);
      } else if (container === false) {
        // if container is `false`, set it to reference parent
        container = reference.parentNode;
      }

      return container;
    }
    /**
     * Append tooltip to container
     * @memberof Tooltip
     * @private
     * @param {HTMLElement} tooltip
     * @param {HTMLElement|String|false} container
     */

  }, {
    key: "_append",
    value: function _append(tooltipNode, container) {
      container.appendChild(tooltipNode);
    }
  }, {
    key: "_setEventListeners",
    value: function _setEventListeners(reference, events, options) {
      var _this8 = this;

      var directEvents = [];
      var oppositeEvents = [];
      events.forEach(function (event) {
        switch (event) {
          case 'hover':
            directEvents.push('mouseenter');
            oppositeEvents.push('mouseleave');
            if (_this8.options.hideOnTargetClick) oppositeEvents.push('click');
            break;

          case 'focus':
            directEvents.push('focus');
            oppositeEvents.push('blur');
            if (_this8.options.hideOnTargetClick) oppositeEvents.push('click');
            break;

          case 'click':
            directEvents.push('click');
            oppositeEvents.push('click');
            break;
        }
      }); // schedule show tooltip

      directEvents.forEach(function (event) {
        var func = function func(evt) {
          if (_this8._isOpen === true) {
            return;
          }

          evt.usedByTooltip = true;

          _this8._scheduleShow(reference, options.delay, options, evt);
        };

        _this8._events.push({
          event: event,
          func: func
        });

        reference.addEventListener(event, func);
      }); // schedule hide tooltip

      oppositeEvents.forEach(function (event) {
        var func = function func(evt) {
          if (evt.usedByTooltip === true) {
            return;
          }

          _this8._scheduleHide(reference, options.delay, options, evt);
        };

        _this8._events.push({
          event: event,
          func: func
        });

        reference.addEventListener(event, func);
      });
    }
  }, {
    key: "_onDocumentTouch",
    value: function _onDocumentTouch(event) {
      if (this._enableDocumentTouch) {
        this._scheduleHide(this.reference, this.options.delay, this.options, event);
      }
    }
  }, {
    key: "_scheduleShow",
    value: function _scheduleShow(reference, delay, options
    /*, evt */
    ) {
      var _this9 = this; // defaults to 0


      var computedDelay = delay && delay.show || delay || 0;
      clearTimeout(this._scheduleTimer);
      this._scheduleTimer = window.setTimeout(function () {
        return _this9._show(reference, options);
      }, computedDelay);
    }
  }, {
    key: "_scheduleHide",
    value: function _scheduleHide(reference, delay, options, evt) {
      var _this10 = this; // defaults to 0


      var computedDelay = delay && delay.hide || delay || 0;
      clearTimeout(this._scheduleTimer);
      this._scheduleTimer = window.setTimeout(function () {
        if (_this10._isOpen === false) {
          return;
        }

        if (!_this10._tooltipNode.ownerDocument.body.contains(_this10._tooltipNode)) {
          return;
        } // if we are hiding because of a mouseleave, we must check that the new
        // reference isn't the tooltip, because in this case we don't want to hide it


        if (evt.type === 'mouseleave') {
          var isSet = _this10._setTooltipNodeEvent(evt, reference, delay, options); // if we set the new event, don't hide the tooltip yet
          // the new event will take care to hide it if necessary


          if (isSet) {
            return;
          }
        }

        _this10._hide(reference, options);
      }, computedDelay);
    }
  }]);
  return Tooltip;
}(); // Hide tooltips on touch devices


if (typeof document !== 'undefined') {
  document.addEventListener('touchstart', function (event) {
    for (var i = 0; i < openTooltips.length; i++) {
      openTooltips[i]._onDocumentTouch(event);
    }
  }, supportsPassive ? {
    passive: true,
    capture: true
  } : true);
}
/**
 * Placement function, its context is the Tooltip instance.
 * @memberof Tooltip
 * @callback PlacementFunction
 * @param {HTMLElement} tooltip - tooltip DOM node.
 * @param {HTMLElement} reference - reference DOM node.
 * @return {String} placement - One of the allowed placement options.
 */

/**
 * Title function, its context is the Tooltip instance.
 * @memberof Tooltip
 * @callback TitleFunction
 * @return {String} placement - The desired title.
 */


function ownKeys$1(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread$1(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys$1(Object(source), true).forEach(function (key) {
        (0, _defineProperty2.default)(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys$1(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

var state = {
  enabled: true
};
var positions = ['top', 'top-start', 'top-end', 'right', 'right-start', 'right-end', 'bottom', 'bottom-start', 'bottom-end', 'left', 'left-start', 'left-end'];
var defaultOptions = {
  // Default tooltip placement relative to target element
  defaultPlacement: 'top',
  // Default CSS classes applied to the tooltip element
  defaultClass: 'vue-tooltip-theme',
  // Default CSS classes applied to the target element of the tooltip
  defaultTargetClass: 'has-tooltip',
  // Is the content HTML by default?
  defaultHtml: true,
  // Default HTML template of the tooltip element
  // It must include `tooltip-arrow` & `tooltip-inner` CSS classes (can be configured, see below)
  // Change if the classes conflict with other libraries (for example bootstrap)
  defaultTemplate: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
  // Selector used to get the arrow element in the tooltip template
  defaultArrowSelector: '.tooltip-arrow, .tooltip__arrow',
  // Selector used to get the inner content element in the tooltip template
  defaultInnerSelector: '.tooltip-inner, .tooltip__inner',
  // Delay (ms)
  defaultDelay: 0,
  // Default events that trigger the tooltip
  defaultTrigger: 'hover focus',
  // Default position offset (px)
  defaultOffset: 0,
  // Default container where the tooltip will be appended
  defaultContainer: 'body',
  defaultBoundariesElement: undefined,
  defaultPopperOptions: {},
  // Class added when content is loading
  defaultLoadingClass: 'tooltip-loading',
  // Displayed when tooltip content is loading
  defaultLoadingContent: '...',
  // Hide on mouseover tooltip
  autoHide: true,
  // Close tooltip on click on tooltip target?
  defaultHideOnTargetClick: true,
  // Auto destroy tooltip DOM nodes (ms)
  disposeTimeout: 5000,
  // Options for popover
  popover: {
    defaultPlacement: 'bottom',
    // Use the `popoverClass` prop for theming
    defaultClass: 'vue-popover-theme',
    // Base class (change if conflicts with other libraries)
    defaultBaseClass: 'tooltip popover',
    // Wrapper class (contains arrow and inner)
    defaultWrapperClass: 'wrapper',
    // Inner content class
    defaultInnerClass: 'tooltip-inner popover-inner',
    // Arrow class
    defaultArrowClass: 'tooltip-arrow popover-arrow',
    // Class added when popover is open
    defaultOpenClass: 'open',
    defaultDelay: 0,
    defaultTrigger: 'click',
    defaultOffset: 0,
    defaultContainer: 'body',
    defaultBoundariesElement: undefined,
    defaultPopperOptions: {},
    // Hides if clicked outside of popover
    defaultAutoHide: true,
    // Update popper on content resize
    defaultHandleResize: true
  }
};

function getOptions(options) {
  var result = {
    placement: typeof options.placement !== 'undefined' ? options.placement : directive.options.defaultPlacement,
    delay: typeof options.delay !== 'undefined' ? options.delay : directive.options.defaultDelay,
    html: typeof options.html !== 'undefined' ? options.html : directive.options.defaultHtml,
    template: typeof options.template !== 'undefined' ? options.template : directive.options.defaultTemplate,
    arrowSelector: typeof options.arrowSelector !== 'undefined' ? options.arrowSelector : directive.options.defaultArrowSelector,
    innerSelector: typeof options.innerSelector !== 'undefined' ? options.innerSelector : directive.options.defaultInnerSelector,
    trigger: typeof options.trigger !== 'undefined' ? options.trigger : directive.options.defaultTrigger,
    offset: typeof options.offset !== 'undefined' ? options.offset : directive.options.defaultOffset,
    container: typeof options.container !== 'undefined' ? options.container : directive.options.defaultContainer,
    boundariesElement: typeof options.boundariesElement !== 'undefined' ? options.boundariesElement : directive.options.defaultBoundariesElement,
    autoHide: typeof options.autoHide !== 'undefined' ? options.autoHide : directive.options.autoHide,
    hideOnTargetClick: typeof options.hideOnTargetClick !== 'undefined' ? options.hideOnTargetClick : directive.options.defaultHideOnTargetClick,
    loadingClass: typeof options.loadingClass !== 'undefined' ? options.loadingClass : directive.options.defaultLoadingClass,
    loadingContent: typeof options.loadingContent !== 'undefined' ? options.loadingContent : directive.options.defaultLoadingContent,
    popperOptions: _objectSpread$1({}, typeof options.popperOptions !== 'undefined' ? options.popperOptions : directive.options.defaultPopperOptions)
  };

  if (result.offset) {
    var typeofOffset = (0, _typeof2.default)(result.offset);
    var offset = result.offset; // One value -> switch

    if (typeofOffset === 'number' || typeofOffset === 'string' && offset.indexOf(',') === -1) {
      offset = "0, ".concat(offset);
    }

    if (!result.popperOptions.modifiers) {
      result.popperOptions.modifiers = {};
    }

    result.popperOptions.modifiers.offset = {
      offset: offset
    };
  }

  if (result.trigger && result.trigger.indexOf('click') !== -1) {
    result.hideOnTargetClick = false;
  }

  return result;
}

function getPlacement(value, modifiers) {
  var placement = value.placement;

  for (var i = 0; i < positions.length; i++) {
    var pos = positions[i];

    if (modifiers[pos]) {
      placement = pos;
    }
  }

  return placement;
}

function getContent(value) {
  var type = (0, _typeof2.default)(value);

  if (type === 'string') {
    return value;
  } else if (value && type === 'object') {
    return value.content;
  } else {
    return false;
  }
}

function createTooltip(el, value) {
  var modifiers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var content = getContent(value);
  var classes = typeof value.classes !== 'undefined' ? value.classes : directive.options.defaultClass;

  var opts = _objectSpread$1({
    title: content
  }, getOptions(_objectSpread$1(_objectSpread$1({}, (0, _typeof2.default)(value) === 'object' ? value : {}), {}, {
    placement: getPlacement(value, modifiers)
  })));

  var tooltip = el._tooltip = new Tooltip(el, opts);
  tooltip.setClasses(classes);
  tooltip._vueEl = el; // Class on target

  var targetClasses = typeof value.targetClasses !== 'undefined' ? value.targetClasses : directive.options.defaultTargetClass;
  el._tooltipTargetClasses = targetClasses;
  addClasses(el, targetClasses);
  return tooltip;
}

function destroyTooltip(el) {
  if (el._tooltip) {
    el._tooltip.dispose();

    delete el._tooltip;
    delete el._tooltipOldShow;
  }

  if (el._tooltipTargetClasses) {
    removeClasses(el, el._tooltipTargetClasses);
    delete el._tooltipTargetClasses;
  }
}

function bind(el, _ref) {
  var value = _ref.value;
  _ref.oldValue;
  var modifiers = _ref.modifiers;
  var content = getContent(value);

  if (!content || !state.enabled) {
    destroyTooltip(el);
  } else {
    var tooltip;

    if (el._tooltip) {
      tooltip = el._tooltip; // Content

      tooltip.setContent(content); // Options

      tooltip.setOptions(_objectSpread$1(_objectSpread$1({}, value), {}, {
        placement: getPlacement(value, modifiers)
      }));
    } else {
      tooltip = createTooltip(el, value, modifiers);
    } // Manual show


    if (typeof value.show !== 'undefined' && value.show !== el._tooltipOldShow) {
      el._tooltipOldShow = value.show;
      value.show ? tooltip.show() : tooltip.hide();
    }
  }
}

var directive = {
  options: defaultOptions,
  bind: bind,
  update: bind,
  unbind: function unbind(el) {
    destroyTooltip(el);
  }
};

function addListeners(el) {
  el.addEventListener('click', onClick);
  el.addEventListener('touchstart', onTouchStart, supportsPassive ? {
    passive: true
  } : false);
}

function removeListeners(el) {
  el.removeEventListener('click', onClick);
  el.removeEventListener('touchstart', onTouchStart);
  el.removeEventListener('touchend', onTouchEnd);
  el.removeEventListener('touchcancel', onTouchCancel);
}

function onClick(event) {
  var el = event.currentTarget;
  event.closePopover = !el.$_vclosepopover_touch;
  event.closeAllPopover = el.$_closePopoverModifiers && !!el.$_closePopoverModifiers.all;
}

function onTouchStart(event) {
  if (event.changedTouches.length === 1) {
    var el = event.currentTarget;
    el.$_vclosepopover_touch = true;
    var touch = event.changedTouches[0];
    el.$_vclosepopover_touchPoint = touch;
    el.addEventListener('touchend', onTouchEnd);
    el.addEventListener('touchcancel', onTouchCancel);
  }
}

function onTouchEnd(event) {
  var el = event.currentTarget;
  el.$_vclosepopover_touch = false;

  if (event.changedTouches.length === 1) {
    var touch = event.changedTouches[0];
    var firstTouch = el.$_vclosepopover_touchPoint;
    event.closePopover = Math.abs(touch.screenY - firstTouch.screenY) < 20 && Math.abs(touch.screenX - firstTouch.screenX) < 20;
    event.closeAllPopover = el.$_closePopoverModifiers && !!el.$_closePopoverModifiers.all;
  }
}

function onTouchCancel(event) {
  var el = event.currentTarget;
  el.$_vclosepopover_touch = false;
}

var vclosepopover = {
  bind: function bind(el, _ref) {
    var value = _ref.value,
        modifiers = _ref.modifiers;
    el.$_closePopoverModifiers = modifiers;

    if (typeof value === 'undefined' || value) {
      addListeners(el);
    }
  },
  update: function update(el, _ref2) {
    var value = _ref2.value,
        oldValue = _ref2.oldValue,
        modifiers = _ref2.modifiers;
    el.$_closePopoverModifiers = modifiers;

    if (value !== oldValue) {
      if (typeof value === 'undefined' || value) {
        addListeners(el);
      } else {
        removeListeners(el);
      }
    }
  },
  unbind: function unbind(el) {
    removeListeners(el);
  }
};

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        (0, _defineProperty2.default)(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function getDefault(key) {
  var value = directive.options.popover[key];

  if (typeof value === 'undefined') {
    return directive.options[key];
  }

  return value;
}

var isIOS = false;

if (typeof window !== 'undefined' && typeof navigator !== 'undefined') {
  isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
}

var openPopovers = [];

var Element = function Element() {};

if (typeof window !== 'undefined') {
  Element = window.Element;
}

var script = {
  name: 'VPopover',
  components: {
    ResizeObserver: _vueResize.ResizeObserver
  },
  props: {
    open: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    placement: {
      type: String,
      default: function _default() {
        return getDefault('defaultPlacement');
      }
    },
    delay: {
      type: [String, Number, Object],
      default: function _default() {
        return getDefault('defaultDelay');
      }
    },
    offset: {
      type: [String, Number],
      default: function _default() {
        return getDefault('defaultOffset');
      }
    },
    trigger: {
      type: String,
      default: function _default() {
        return getDefault('defaultTrigger');
      }
    },
    container: {
      type: [String, Object, Element, Boolean],
      default: function _default() {
        return getDefault('defaultContainer');
      }
    },
    boundariesElement: {
      type: [String, Element],
      default: function _default() {
        return getDefault('defaultBoundariesElement');
      }
    },
    popperOptions: {
      type: Object,
      default: function _default() {
        return getDefault('defaultPopperOptions');
      }
    },
    popoverClass: {
      type: [String, Array],
      default: function _default() {
        return getDefault('defaultClass');
      }
    },
    popoverBaseClass: {
      type: [String, Array],
      default: function _default() {
        return directive.options.popover.defaultBaseClass;
      }
    },
    popoverInnerClass: {
      type: [String, Array],
      default: function _default() {
        return directive.options.popover.defaultInnerClass;
      }
    },
    popoverWrapperClass: {
      type: [String, Array],
      default: function _default() {
        return directive.options.popover.defaultWrapperClass;
      }
    },
    popoverArrowClass: {
      type: [String, Array],
      default: function _default() {
        return directive.options.popover.defaultArrowClass;
      }
    },
    autoHide: {
      type: Boolean,
      default: function _default() {
        return directive.options.popover.defaultAutoHide;
      }
    },
    handleResize: {
      type: Boolean,
      default: function _default() {
        return directive.options.popover.defaultHandleResize;
      }
    },
    openGroup: {
      type: String,
      default: null
    },
    openClass: {
      type: [String, Array],
      default: function _default() {
        return directive.options.popover.defaultOpenClass;
      }
    },
    ariaId: {
      default: null
    }
  },
  data: function data() {
    return {
      isOpen: false,
      id: Math.random().toString(36).substr(2, 10)
    };
  },
  computed: {
    cssClass: function cssClass() {
      return (0, _defineProperty2.default)({}, this.openClass, this.isOpen);
    },
    popoverId: function popoverId() {
      return "popover_".concat(this.ariaId != null ? this.ariaId : this.id);
    }
  },
  watch: {
    open: function open(val) {
      if (val) {
        this.show();
      } else {
        this.hide();
      }
    },
    disabled: function disabled(val, oldVal) {
      if (val !== oldVal) {
        if (val) {
          this.hide();
        } else if (this.open) {
          this.show();
        }
      }
    },
    container: function container(val) {
      if (this.isOpen && this.popperInstance) {
        var popoverNode = this.$refs.popover;
        var reference = this.$refs.trigger;
        var container = this.$_findContainer(this.container, reference);

        if (!container) {
          console.warn('No container for popover', this);
          return;
        }

        container.appendChild(popoverNode);
        this.popperInstance.scheduleUpdate();
      }
    },
    trigger: function trigger(val) {
      this.$_removeEventListeners();
      this.$_addEventListeners();
    },
    placement: function placement(val) {
      var _this = this;

      this.$_updatePopper(function () {
        _this.popperInstance.options.placement = val;
      });
    },
    offset: '$_restartPopper',
    boundariesElement: '$_restartPopper',
    popperOptions: {
      handler: '$_restartPopper',
      deep: true
    }
  },
  created: function created() {
    this.$_isDisposed = false;
    this.$_mounted = false;
    this.$_events = [];
    this.$_preventOpen = false;
  },
  mounted: function mounted() {
    var popoverNode = this.$refs.popover;
    popoverNode.parentNode && popoverNode.parentNode.removeChild(popoverNode);
    this.$_init();

    if (this.open) {
      this.show();
    }
  },
  deactivated: function deactivated() {
    this.hide();
  },
  beforeDestroy: function beforeDestroy() {
    this.dispose();
  },
  methods: {
    show: function show() {
      var _this2 = this;

      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          event = _ref2.event;

      _ref2.skipDelay;
      var _ref2$force = _ref2.force,
          force = _ref2$force === void 0 ? false : _ref2$force;

      if (force || !this.disabled) {
        this.$_scheduleShow(event);
        this.$emit('show');
      }

      this.$emit('update:open', true);
      this.$_beingShowed = true;
      requestAnimationFrame(function () {
        _this2.$_beingShowed = false;
      });
    },
    hide: function hide() {
      var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          event = _ref3.event;

      _ref3.skipDelay;
      this.$_scheduleHide(event);
      this.$emit('hide');
      this.$emit('update:open', false);
    },
    dispose: function dispose() {
      this.$_isDisposed = true;
      this.$_removeEventListeners();
      this.hide({
        skipDelay: true
      });

      if (this.popperInstance) {
        this.popperInstance.destroy(); // destroy tooltipNode if removeOnDestroy is not set, as popperInstance.destroy() already removes the element

        if (!this.popperInstance.options.removeOnDestroy) {
          var popoverNode = this.$refs.popover;
          popoverNode.parentNode && popoverNode.parentNode.removeChild(popoverNode);
        }
      }

      this.$_mounted = false;
      this.popperInstance = null;
      this.isOpen = false;
      this.$emit('dispose');
    },
    $_init: function $_init() {
      if (this.trigger.indexOf('manual') === -1) {
        this.$_addEventListeners();
      }
    },
    $_show: function $_show() {
      var _this3 = this;

      var reference = this.$refs.trigger;
      var popoverNode = this.$refs.popover;
      clearTimeout(this.$_disposeTimer); // Already open

      if (this.isOpen) {
        return;
      } // Popper is already initialized


      if (this.popperInstance) {
        this.isOpen = true;
        this.popperInstance.enableEventListeners();
        this.popperInstance.scheduleUpdate();
      }

      if (!this.$_mounted) {
        var container = this.$_findContainer(this.container, reference);

        if (!container) {
          console.warn('No container for popover', this);
          return;
        }

        container.appendChild(popoverNode);
        this.$_mounted = true;
        this.isOpen = false;

        if (this.popperInstance) {
          requestAnimationFrame(function () {
            if (!_this3.hidden) {
              _this3.isOpen = true;
            }
          });
        }
      }

      if (!this.popperInstance) {
        var popperOptions = _objectSpread(_objectSpread({}, this.popperOptions), {}, {
          placement: this.placement
        });

        popperOptions.modifiers = _objectSpread(_objectSpread({}, popperOptions.modifiers), {}, {
          arrow: _objectSpread(_objectSpread({}, popperOptions.modifiers && popperOptions.modifiers.arrow), {}, {
            element: this.$refs.arrow
          })
        });

        if (this.offset) {
          var offset = this.$_getOffset();
          popperOptions.modifiers.offset = _objectSpread(_objectSpread({}, popperOptions.modifiers && popperOptions.modifiers.offset), {}, {
            offset: offset
          });
        }

        if (this.boundariesElement) {
          popperOptions.modifiers.preventOverflow = _objectSpread(_objectSpread({}, popperOptions.modifiers && popperOptions.modifiers.preventOverflow), {}, {
            boundariesElement: this.boundariesElement
          });
        }

        this.popperInstance = new _popper.default(reference, popoverNode, popperOptions); // Fix position

        requestAnimationFrame(function () {
          if (_this3.hidden) {
            _this3.hidden = false;

            _this3.$_hide();

            return;
          }

          if (!_this3.$_isDisposed && _this3.popperInstance) {
            _this3.popperInstance.scheduleUpdate(); // Show the tooltip


            requestAnimationFrame(function () {
              if (_this3.hidden) {
                _this3.hidden = false;

                _this3.$_hide();

                return;
              }

              if (!_this3.$_isDisposed) {
                _this3.isOpen = true;
              } else {
                _this3.dispose();
              }
            });
          } else {
            _this3.dispose();
          }
        });
      }

      var openGroup = this.openGroup;

      if (openGroup) {
        var popover;

        for (var i = 0; i < openPopovers.length; i++) {
          popover = openPopovers[i];

          if (popover.openGroup !== openGroup) {
            popover.hide();
            popover.$emit('close-group');
          }
        }
      }

      openPopovers.push(this);
      this.$emit('apply-show');
    },
    $_hide: function $_hide() {
      var _this4 = this; // Already hidden


      if (!this.isOpen) {
        return;
      }

      var index = openPopovers.indexOf(this);

      if (index !== -1) {
        openPopovers.splice(index, 1);
      }

      this.isOpen = false;

      if (this.popperInstance) {
        this.popperInstance.disableEventListeners();
      }

      clearTimeout(this.$_disposeTimer);
      var disposeTime = directive.options.popover.disposeTimeout || directive.options.disposeTimeout;

      if (disposeTime !== null) {
        this.$_disposeTimer = setTimeout(function () {
          var popoverNode = _this4.$refs.popover;

          if (popoverNode) {
            // Don't remove popper instance, just the HTML element
            popoverNode.parentNode && popoverNode.parentNode.removeChild(popoverNode);
            _this4.$_mounted = false;
          }
        }, disposeTime);
      }

      this.$emit('apply-hide');
    },
    $_findContainer: function $_findContainer(container, reference) {
      // if container is a query, get the relative element
      if (typeof container === 'string') {
        container = window.document.querySelector(container);
      } else if (container === false) {
        // if container is `false`, set it to reference parent
        container = reference.parentNode;
      }

      return container;
    },
    $_getOffset: function $_getOffset() {
      var typeofOffset = (0, _typeof2.default)(this.offset);
      var offset = this.offset; // One value -> switch

      if (typeofOffset === 'number' || typeofOffset === 'string' && offset.indexOf(',') === -1) {
        offset = "0, ".concat(offset);
      }

      return offset;
    },
    $_addEventListeners: function $_addEventListeners() {
      var _this5 = this;

      var reference = this.$refs.trigger;
      var directEvents = [];
      var oppositeEvents = [];
      var events = typeof this.trigger === 'string' ? this.trigger.split(' ').filter(function (trigger) {
        return ['click', 'hover', 'focus'].indexOf(trigger) !== -1;
      }) : [];
      events.forEach(function (event) {
        switch (event) {
          case 'hover':
            directEvents.push('mouseenter');
            oppositeEvents.push('mouseleave');
            break;

          case 'focus':
            directEvents.push('focus');
            oppositeEvents.push('blur');
            break;

          case 'click':
            directEvents.push('click');
            oppositeEvents.push('click');
            break;
        }
      }); // schedule show tooltip

      directEvents.forEach(function (event) {
        var func = function func(event) {
          if (_this5.isOpen) {
            return;
          }

          event.usedByTooltip = true;
          !_this5.$_preventOpen && _this5.show({
            event: event
          });
          _this5.hidden = false;
        };

        _this5.$_events.push({
          event: event,
          func: func
        });

        reference.addEventListener(event, func);
      }); // schedule hide tooltip

      oppositeEvents.forEach(function (event) {
        var func = function func(event) {
          if (event.usedByTooltip) {
            return;
          }

          _this5.hide({
            event: event
          });

          _this5.hidden = true;
        };

        _this5.$_events.push({
          event: event,
          func: func
        });

        reference.addEventListener(event, func);
      });
    },
    $_scheduleShow: function $_scheduleShow() {
      var skipDelay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      clearTimeout(this.$_scheduleTimer);

      if (skipDelay) {
        this.$_show();
      } else {
        // defaults to 0
        var computedDelay = parseInt(this.delay && this.delay.show || this.delay || 0);
        this.$_scheduleTimer = setTimeout(this.$_show.bind(this), computedDelay);
      }
    },
    $_scheduleHide: function $_scheduleHide() {
      var _this6 = this;

      var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var skipDelay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      clearTimeout(this.$_scheduleTimer);

      if (skipDelay) {
        this.$_hide();
      } else {
        // defaults to 0
        var computedDelay = parseInt(this.delay && this.delay.hide || this.delay || 0);
        this.$_scheduleTimer = setTimeout(function () {
          if (!_this6.isOpen) {
            return;
          } // if we are hiding because of a mouseleave, we must check that the new
          // reference isn't the tooltip, because in this case we don't want to hide it


          if (event && event.type === 'mouseleave') {
            var isSet = _this6.$_setTooltipNodeEvent(event); // if we set the new event, don't hide the tooltip yet
            // the new event will take care to hide it if necessary


            if (isSet) {
              return;
            }
          }

          _this6.$_hide();
        }, computedDelay);
      }
    },
    $_setTooltipNodeEvent: function $_setTooltipNodeEvent(event) {
      var _this7 = this;

      var reference = this.$refs.trigger;
      var popoverNode = this.$refs.popover;
      var relatedreference = event.relatedreference || event.toElement || event.relatedTarget;

      var callback = function callback(event2) {
        var relatedreference2 = event2.relatedreference || event2.toElement || event2.relatedTarget; // Remove event listener after call

        popoverNode.removeEventListener(event.type, callback); // If the new reference is not the reference element

        if (!reference.contains(relatedreference2)) {
          // Schedule to hide tooltip
          _this7.hide({
            event: event2
          });
        }
      };

      if (popoverNode.contains(relatedreference)) {
        // listen to mouseleave on the tooltip element to be able to hide the tooltip
        popoverNode.addEventListener(event.type, callback);
        return true;
      }

      return false;
    },
    $_removeEventListeners: function $_removeEventListeners() {
      var reference = this.$refs.trigger;
      this.$_events.forEach(function (_ref4) {
        var func = _ref4.func,
            event = _ref4.event;
        reference.removeEventListener(event, func);
      });
      this.$_events = [];
    },
    $_updatePopper: function $_updatePopper(cb) {
      if (this.popperInstance) {
        cb();
        if (this.isOpen) this.popperInstance.scheduleUpdate();
      }
    },
    $_restartPopper: function $_restartPopper() {
      if (this.popperInstance) {
        var isOpen = this.isOpen;
        this.dispose();
        this.$_isDisposed = false;
        this.$_init();

        if (isOpen) {
          this.show({
            skipDelay: true,
            force: true
          });
        }
      }
    },
    $_handleGlobalClose: function $_handleGlobalClose(event) {
      var _this8 = this;

      var touch = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      if (this.$_beingShowed) return;
      this.hide({
        event: event
      });

      if (event.closePopover) {
        this.$emit('close-directive');
      } else {
        this.$emit('auto-hide');
      }

      if (touch) {
        this.$_preventOpen = true;
        setTimeout(function () {
          _this8.$_preventOpen = false;
        }, 300);
      }
    },
    $_handleResize: function $_handleResize() {
      if (this.isOpen && this.popperInstance) {
        this.popperInstance.scheduleUpdate();
        this.$emit('resize');
      }
    }
  }
};

if (typeof document !== 'undefined' && typeof window !== 'undefined') {
  if (isIOS) {
    document.addEventListener('touchend', handleGlobalTouchend, supportsPassive ? {
      passive: true,
      capture: true
    } : true);
  } else {
    window.addEventListener('click', handleGlobalClick, true);
  }
}

function handleGlobalClick(event) {
  handleGlobalClose(event);
}

function handleGlobalTouchend(event) {
  handleGlobalClose(event, true);
}

function handleGlobalClose(event) {
  var touch = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  var _loop = function _loop(i) {
    var popover = openPopovers[i];

    if (popover.$refs.popover) {
      var contains = popover.$refs.popover.contains(event.target);
      requestAnimationFrame(function () {
        if (event.closeAllPopover || event.closePopover && contains || popover.autoHide && !contains) {
          popover.$_handleGlobalClose(event, touch);
        }
      });
    }
  }; // Delay so that close directive has time to set values


  for (var i = 0; i < openPopovers.length; i++) {
    _loop(i);
  }
}

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
/* server only */
, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
  if (typeof shadowMode !== 'boolean') {
    createInjectorSSR = createInjector;
    createInjector = shadowMode;
    shadowMode = false;
  } // Vue.extend constructor export interop.


  var options = typeof script === 'function' ? script.options : script; // render functions

  if (template && template.render) {
    options.render = template.render;
    options.staticRenderFns = template.staticRenderFns;
    options._compiled = true; // functional template

    if (isFunctionalTemplate) {
      options.functional = true;
    }
  } // scopedId


  if (scopeId) {
    options._scopeId = scopeId;
  }

  var hook;

  if (moduleIdentifier) {
    // server build
    hook = function hook(context) {
      // 2.3 injection
      context = context || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
      // 2.2 with runInNewContext: true

      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
      } // inject component styles


      if (style) {
        style.call(this, createInjectorSSR(context));
      } // register component module identifier for async chunk inference


      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    }; // used by ssr in case component is cached and beforeCreate
    // never gets called


    options._ssrRegister = hook;
  } else if (style) {
    hook = shadowMode ? function (context) {
      style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
    } : function (context) {
      style.call(this, createInjector(context));
    };
  }

  if (hook) {
    if (options.functional) {
      // register for functional component in vue file
      var originalRender = options.render;

      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context);
        return originalRender(h, context);
      };
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }

  return script;
}
/* script */


var __vue_script__ = script;
/* template */

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("div", {
    staticClass: "v-popover",
    class: _vm.cssClass
  }, [_c("div", {
    ref: "trigger",
    staticClass: "trigger",
    staticStyle: {
      display: "inline-block"
    },
    attrs: {
      "aria-describedby": _vm.isOpen ? _vm.popoverId : undefined,
      tabindex: _vm.trigger.indexOf("focus") !== -1 ? 0 : undefined
    }
  }, [_vm._t("default")], 2), _vm._v(" "), _c("div", {
    ref: "popover",
    class: [_vm.popoverBaseClass, _vm.popoverClass, _vm.cssClass],
    style: {
      visibility: _vm.isOpen ? "visible" : "hidden"
    },
    attrs: {
      id: _vm.popoverId,
      "aria-hidden": _vm.isOpen ? "false" : "true",
      tabindex: _vm.autoHide ? 0 : undefined
    },
    on: {
      keyup: function keyup($event) {
        if (!$event.type.indexOf("key") && _vm._k($event.keyCode, "esc", 27, $event.key, ["Esc", "Escape"])) {
          return null;
        }

        _vm.autoHide && _vm.hide();
      }
    }
  }, [_c("div", {
    class: _vm.popoverWrapperClass
  }, [_c("div", {
    ref: "inner",
    class: _vm.popoverInnerClass,
    staticStyle: {
      position: "relative"
    }
  }, [_c("div", [_vm._t("popover", null, {
    isOpen: _vm.isOpen
  })], 2), _vm._v(" "), _vm.handleResize ? _c("ResizeObserver", {
    on: {
      notify: _vm.$_handleResize
    }
  }) : _vm._e()], 1), _vm._v(" "), _c("div", {
    ref: "arrow",
    class: _vm.popoverArrowClass
  })])])]);
};

var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;
/* style */

var __vue_inject_styles__ = undefined;
/* scoped */

var __vue_scope_id__ = undefined;
/* module identifier */

var __vue_module_identifier__ = undefined;
/* functional template */

var __vue_is_functional_template__ = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, undefined, undefined);

function styleInject(css, ref) {
  if (ref === void 0) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') {
    return;
  }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = ".resize-observer[data-v-8859cc6c]{position:absolute;top:0;left:0;z-index:-1;width:100%;height:100%;border:none;background-color:transparent;pointer-events:none;display:block;overflow:hidden;opacity:0}.resize-observer[data-v-8859cc6c] object{display:block;position:absolute;top:0;left:0;height:100%;width:100%;overflow:hidden;pointer-events:none;z-index:-1}";
styleInject(css_248z);

function install(Vue) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  if (install.installed) return;
  install.installed = true;
  var finalOptions = {};
  (0, _merge.default)(finalOptions, defaultOptions, options);
  plugin.options = finalOptions;
  directive.options = finalOptions;
  Vue.directive('tooltip', directive);
  Vue.directive('close-popover', vclosepopover);
  Vue.component('VPopover', __vue_component__);
}

var VTooltip = directive;
exports.VTooltip = VTooltip;
var VClosePopover = vclosepopover;
exports.VClosePopover = VClosePopover;
var VPopover = __vue_component__;
exports.VPopover = VPopover;
var plugin = {
  install: install,

  get enabled() {
    return state.enabled;
  },

  set enabled(value) {
    state.enabled = value;
  }

}; // Auto-install

var GlobalVue = null;

if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue;
}

if (GlobalVue) {
  GlobalVue.use(plugin);
}

var _default2 = plugin;
exports.default = _default2;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/vue-resize/dist/vue-resize.esm.js":
/*!********************************************************!*\
  !*** ./node_modules/vue-resize/dist/vue-resize.esm.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.install = install;
exports.default = exports.ResizeObserver = void 0;

function getInternetExplorerVersion() {
  var ua = window.navigator.userAgent;
  var msie = ua.indexOf('MSIE ');

  if (msie > 0) {
    // IE 10 or older => return version number
    return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
  }

  var trident = ua.indexOf('Trident/');

  if (trident > 0) {
    // IE 11 => return version number
    var rv = ua.indexOf('rv:');
    return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
  }

  var edge = ua.indexOf('Edge/');

  if (edge > 0) {
    // Edge (IE 12+) => return version number
    return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
  } // other browser


  return -1;
}

var isIE = void 0;

function initCompat() {
  if (!initCompat.init) {
    initCompat.init = true;
    isIE = getInternetExplorerVersion() !== -1;
  }
}

var ResizeObserver = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      staticClass: "resize-observer",
      attrs: {
        "tabindex": "-1"
      }
    });
  },
  staticRenderFns: [],
  _scopeId: 'data-v-b329ee4c',
  name: 'resize-observer',
  methods: {
    compareAndNotify: function compareAndNotify() {
      if (this._w !== this.$el.offsetWidth || this._h !== this.$el.offsetHeight) {
        this._w = this.$el.offsetWidth;
        this._h = this.$el.offsetHeight;
        this.$emit('notify');
      }
    },
    addResizeHandlers: function addResizeHandlers() {
      this._resizeObject.contentDocument.defaultView.addEventListener('resize', this.compareAndNotify);

      this.compareAndNotify();
    },
    removeResizeHandlers: function removeResizeHandlers() {
      if (this._resizeObject && this._resizeObject.onload) {
        if (!isIE && this._resizeObject.contentDocument) {
          this._resizeObject.contentDocument.defaultView.removeEventListener('resize', this.compareAndNotify);
        }

        delete this._resizeObject.onload;
      }
    }
  },
  mounted: function mounted() {
    var _this = this;

    initCompat();
    this.$nextTick(function () {
      _this._w = _this.$el.offsetWidth;
      _this._h = _this.$el.offsetHeight;
    });
    var object = document.createElement('object');
    this._resizeObject = object;
    object.setAttribute('aria-hidden', 'true');
    object.setAttribute('tabindex', -1);
    object.onload = this.addResizeHandlers;
    object.type = 'text/html';

    if (isIE) {
      this.$el.appendChild(object);
    }

    object.data = 'about:blank';

    if (!isIE) {
      this.$el.appendChild(object);
    }
  },
  beforeDestroy: function beforeDestroy() {
    this.removeResizeHandlers();
  }
}; // Install the components

exports.ResizeObserver = ResizeObserver;

function install(Vue) {
  Vue.component('resize-observer', ResizeObserver);
  Vue.component('ResizeObserver', ResizeObserver);
} // Plugin


var plugin = {
  // eslint-disable-next-line no-undef
  version: "0.4.5",
  install: install
}; // Auto-install

var GlobalVue = null;

if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue;
}

if (GlobalVue) {
  GlobalVue.use(plugin);
}

var _default = plugin;
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/webpack/buildin/module.js":
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (module) {
  if (!module.webpackPolyfill) {
    module.deprecate = function () {};

    module.paths = []; // module.parent = undefined by default

    if (!module.children) module.children = [];
    Object.defineProperty(module, "loaded", {
      enumerable: true,
      get: function get() {
        return module.l;
      }
    });
    Object.defineProperty(module, "id", {
      enumerable: true,
      get: function get() {
        return module.i;
      }
    });
    module.webpackPolyfill = 1;
  }

  return module;
};

/***/ })

}]);
//# sourceMappingURL=vendors~editor~files-modal.js.map?v=44fc65c6931a1c1a7a9d