const appName = "text";
const appVersion = "7.0.0-dev.2";
import { g as getDefaultExportFromCjs } from "./emoji-picker-Bacg5hGL.chunk.mjs";
import { p as process$1, a as getRequestToken, o as onRequestTokenUpdate } from "./index-Djlbe-Du.chunk.mjs";
import { g as global } from "./vue.runtime.esm-DtAgfqM0.chunk.mjs";
import { g as generateUrl } from "./index--FnIx9_y.chunk.mjs";
var buffer = {};
var base64Js = {};
base64Js.byteLength = byteLength;
base64Js.toByteArray = toByteArray;
base64Js.fromByteArray = fromByteArray;
var lookup = [];
var revLookup = [];
var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i];
  revLookup[code.charCodeAt(i)] = i;
}
revLookup["-".charCodeAt(0)] = 62;
revLookup["_".charCodeAt(0)] = 63;
function getLens(b64) {
  var len = b64.length;
  if (len % 4 > 0) {
    throw new Error("Invalid string. Length must be a multiple of 4");
  }
  var validLen = b64.indexOf("=");
  if (validLen === -1) validLen = len;
  var placeHoldersLen = validLen === len ? 0 : 4 - validLen % 4;
  return [validLen, placeHoldersLen];
}
function byteLength(b64) {
  var lens = getLens(b64);
  var validLen = lens[0];
  var placeHoldersLen = lens[1];
  return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
}
function _byteLength(b64, validLen, placeHoldersLen) {
  return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
}
function toByteArray(b64) {
  var tmp;
  var lens = getLens(b64);
  var validLen = lens[0];
  var placeHoldersLen = lens[1];
  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
  var curByte = 0;
  var len = placeHoldersLen > 0 ? validLen - 4 : validLen;
  var i;
  for (i = 0; i < len; i += 4) {
    tmp = revLookup[b64.charCodeAt(i)] << 18 | revLookup[b64.charCodeAt(i + 1)] << 12 | revLookup[b64.charCodeAt(i + 2)] << 6 | revLookup[b64.charCodeAt(i + 3)];
    arr[curByte++] = tmp >> 16 & 255;
    arr[curByte++] = tmp >> 8 & 255;
    arr[curByte++] = tmp & 255;
  }
  if (placeHoldersLen === 2) {
    tmp = revLookup[b64.charCodeAt(i)] << 2 | revLookup[b64.charCodeAt(i + 1)] >> 4;
    arr[curByte++] = tmp & 255;
  }
  if (placeHoldersLen === 1) {
    tmp = revLookup[b64.charCodeAt(i)] << 10 | revLookup[b64.charCodeAt(i + 1)] << 4 | revLookup[b64.charCodeAt(i + 2)] >> 2;
    arr[curByte++] = tmp >> 8 & 255;
    arr[curByte++] = tmp & 255;
  }
  return arr;
}
function tripletToBase64(num) {
  return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[num & 63];
}
function encodeChunk(uint8, start, end) {
  var tmp;
  var output = [];
  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16 & 16711680) + (uint8[i + 1] << 8 & 65280) + (uint8[i + 2] & 255);
    output.push(tripletToBase64(tmp));
  }
  return output.join("");
}
function fromByteArray(uint8) {
  var tmp;
  var len = uint8.length;
  var extraBytes = len % 3;
  var parts = [];
  var maxChunkLength = 16383;
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, i + maxChunkLength > len2 ? len2 : i + maxChunkLength));
  }
  if (extraBytes === 1) {
    tmp = uint8[len - 1];
    parts.push(
      lookup[tmp >> 2] + lookup[tmp << 4 & 63] + "=="
    );
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1];
    parts.push(
      lookup[tmp >> 10] + lookup[tmp >> 4 & 63] + lookup[tmp << 2 & 63] + "="
    );
  }
  return parts.join("");
}
var ieee754 = {};
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
ieee754.read = function(buffer2, offset, isLE, mLen, nBytes) {
  var e, m;
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var nBits = -7;
  var i = isLE ? nBytes - 1 : 0;
  var d = isLE ? -1 : 1;
  var s = buffer2[offset + i];
  i += d;
  e = s & (1 << -nBits) - 1;
  s >>= -nBits;
  nBits += eLen;
  for (; nBits > 0; e = e * 256 + buffer2[offset + i], i += d, nBits -= 8) {
  }
  m = e & (1 << -nBits) - 1;
  e >>= -nBits;
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer2[offset + i], i += d, nBits -= 8) {
  }
  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : (s ? -1 : 1) * Infinity;
  } else {
    m = m + Math.pow(2, mLen);
    e = e - eBias;
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
};
ieee754.write = function(buffer2, value, offset, isLE, mLen, nBytes) {
  var e, m, c;
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
  var i = isLE ? 0 : nBytes - 1;
  var d = isLE ? 1 : -1;
  var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
  value = Math.abs(value);
  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0;
    e = eMax;
  } else {
    e = Math.floor(Math.log(value) / Math.LN2);
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * Math.pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }
    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
      e = 0;
    }
  }
  for (; mLen >= 8; buffer2[offset + i] = m & 255, i += d, m /= 256, mLen -= 8) {
  }
  e = e << mLen | m;
  eLen += mLen;
  for (; eLen > 0; buffer2[offset + i] = e & 255, i += d, e /= 256, eLen -= 8) {
  }
  buffer2[offset + i - d] |= s * 128;
};
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
(function(exports$1) {
  const base64 = base64Js;
  const ieee754$1 = ieee754;
  const customInspectSymbol = typeof Symbol === "function" && typeof Symbol["for"] === "function" ? Symbol["for"]("nodejs.util.inspect.custom") : null;
  exports$1.Buffer = Buffer2;
  exports$1.SlowBuffer = SlowBuffer;
  exports$1.INSPECT_MAX_BYTES = 50;
  const K_MAX_LENGTH = 2147483647;
  exports$1.kMaxLength = K_MAX_LENGTH;
  const { Uint8Array: GlobalUint8Array, ArrayBuffer: GlobalArrayBuffer, SharedArrayBuffer: GlobalSharedArrayBuffer } = globalThis;
  Buffer2.TYPED_ARRAY_SUPPORT = typedArraySupport();
  if (!Buffer2.TYPED_ARRAY_SUPPORT && typeof console !== "undefined" && typeof console.error === "function") {
    console.error(
      "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
    );
  }
  function typedArraySupport() {
    try {
      const arr = new GlobalUint8Array(1);
      const proto = { foo: function() {
        return 42;
      } };
      Object.setPrototypeOf(proto, GlobalUint8Array.prototype);
      Object.setPrototypeOf(arr, proto);
      return arr.foo() === 42;
    } catch (e) {
      return false;
    }
  }
  Object.defineProperty(Buffer2.prototype, "parent", {
    enumerable: true,
    get: function() {
      if (!Buffer2.isBuffer(this)) return void 0;
      return this.buffer;
    }
  });
  Object.defineProperty(Buffer2.prototype, "offset", {
    enumerable: true,
    get: function() {
      if (!Buffer2.isBuffer(this)) return void 0;
      return this.byteOffset;
    }
  });
  function createBuffer(length) {
    if (length > K_MAX_LENGTH) {
      throw new RangeError('The value "' + length + '" is invalid for option "size"');
    }
    const buf = new GlobalUint8Array(length);
    Object.setPrototypeOf(buf, Buffer2.prototype);
    return buf;
  }
  function Buffer2(arg, encodingOrOffset, length) {
    if (typeof arg === "number") {
      if (typeof encodingOrOffset === "string") {
        throw new TypeError(
          'The "string" argument must be of type string. Received type number'
        );
      }
      return allocUnsafe(arg);
    }
    return from(arg, encodingOrOffset, length);
  }
  Buffer2.poolSize = 8192;
  function from(value, encodingOrOffset, length) {
    if (typeof value === "string") {
      return fromString(value, encodingOrOffset);
    }
    if (GlobalArrayBuffer.isView(value)) {
      return fromArrayView(value);
    }
    if (value == null) {
      throw new TypeError(
        "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value
      );
    }
    if (isInstance(value, GlobalArrayBuffer) || value && isInstance(value.buffer, GlobalArrayBuffer)) {
      return fromArrayBuffer(value, encodingOrOffset, length);
    }
    if (typeof GlobalSharedArrayBuffer !== "undefined" && (isInstance(value, GlobalSharedArrayBuffer) || value && isInstance(value.buffer, GlobalSharedArrayBuffer))) {
      return fromArrayBuffer(value, encodingOrOffset, length);
    }
    if (typeof value === "number") {
      throw new TypeError(
        'The "value" argument must not be of type number. Received type number'
      );
    }
    const valueOf = value.valueOf && value.valueOf();
    if (valueOf != null && valueOf !== value) {
      return Buffer2.from(valueOf, encodingOrOffset, length);
    }
    const b = fromObject(value);
    if (b) return b;
    if (typeof Symbol !== "undefined" && Symbol.toPrimitive != null && typeof value[Symbol.toPrimitive] === "function") {
      return Buffer2.from(value[Symbol.toPrimitive]("string"), encodingOrOffset, length);
    }
    throw new TypeError(
      "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value
    );
  }
  Buffer2.from = function(value, encodingOrOffset, length) {
    return from(value, encodingOrOffset, length);
  };
  Object.setPrototypeOf(Buffer2.prototype, GlobalUint8Array.prototype);
  Object.setPrototypeOf(Buffer2, GlobalUint8Array);
  function assertSize(size) {
    if (typeof size !== "number") {
      throw new TypeError('"size" argument must be of type number');
    } else if (size < 0) {
      throw new RangeError('The value "' + size + '" is invalid for option "size"');
    }
  }
  function alloc(size, fill, encoding) {
    assertSize(size);
    if (size <= 0) {
      return createBuffer(size);
    }
    if (fill !== void 0) {
      return typeof encoding === "string" ? createBuffer(size).fill(fill, encoding) : createBuffer(size).fill(fill);
    }
    return createBuffer(size);
  }
  Buffer2.alloc = function(size, fill, encoding) {
    return alloc(size, fill, encoding);
  };
  function allocUnsafe(size) {
    assertSize(size);
    return createBuffer(size < 0 ? 0 : checked(size) | 0);
  }
  Buffer2.allocUnsafe = function(size) {
    return allocUnsafe(size);
  };
  Buffer2.allocUnsafeSlow = function(size) {
    return allocUnsafe(size);
  };
  function fromString(string, encoding) {
    if (typeof encoding !== "string" || encoding === "") {
      encoding = "utf8";
    }
    if (!Buffer2.isEncoding(encoding)) {
      throw new TypeError("Unknown encoding: " + encoding);
    }
    const length = byteLength2(string, encoding) | 0;
    let buf = createBuffer(length);
    const actual = buf.write(string, encoding);
    if (actual !== length) {
      buf = buf.slice(0, actual);
    }
    return buf;
  }
  function fromArrayLike(array) {
    const length = array.length < 0 ? 0 : checked(array.length) | 0;
    const buf = createBuffer(length);
    for (let i = 0; i < length; i += 1) {
      buf[i] = array[i] & 255;
    }
    return buf;
  }
  function fromArrayView(arrayView) {
    if (isInstance(arrayView, GlobalUint8Array)) {
      const copy = new GlobalUint8Array(arrayView);
      return fromArrayBuffer(copy.buffer, copy.byteOffset, copy.byteLength);
    }
    return fromArrayLike(arrayView);
  }
  function fromArrayBuffer(array, byteOffset, length) {
    if (byteOffset < 0 || array.byteLength < byteOffset) {
      throw new RangeError('"offset" is outside of buffer bounds');
    }
    if (array.byteLength < byteOffset + (length || 0)) {
      throw new RangeError('"length" is outside of buffer bounds');
    }
    let buf;
    if (byteOffset === void 0 && length === void 0) {
      buf = new GlobalUint8Array(array);
    } else if (length === void 0) {
      buf = new GlobalUint8Array(array, byteOffset);
    } else {
      buf = new GlobalUint8Array(array, byteOffset, length);
    }
    Object.setPrototypeOf(buf, Buffer2.prototype);
    return buf;
  }
  function fromObject(obj) {
    if (Buffer2.isBuffer(obj)) {
      const len = checked(obj.length) | 0;
      const buf = createBuffer(len);
      if (buf.length === 0) {
        return buf;
      }
      obj.copy(buf, 0, 0, len);
      return buf;
    }
    if (obj.length !== void 0) {
      if (typeof obj.length !== "number" || numberIsNaN(obj.length)) {
        return createBuffer(0);
      }
      return fromArrayLike(obj);
    }
    if (obj.type === "Buffer" && Array.isArray(obj.data)) {
      return fromArrayLike(obj.data);
    }
  }
  function checked(length) {
    if (length >= K_MAX_LENGTH) {
      throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + K_MAX_LENGTH.toString(16) + " bytes");
    }
    return length | 0;
  }
  function SlowBuffer(length) {
    if (+length != length) {
      length = 0;
    }
    return Buffer2.alloc(+length);
  }
  Buffer2.isBuffer = function isBuffer2(b) {
    return b != null && b._isBuffer === true && b !== Buffer2.prototype;
  };
  Buffer2.compare = function compare(a, b) {
    if (isInstance(a, GlobalUint8Array)) a = Buffer2.from(a, a.offset, a.byteLength);
    if (isInstance(b, GlobalUint8Array)) b = Buffer2.from(b, b.offset, b.byteLength);
    if (!Buffer2.isBuffer(a) || !Buffer2.isBuffer(b)) {
      throw new TypeError(
        'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
      );
    }
    if (a === b) return 0;
    let x = a.length;
    let y = b.length;
    for (let i = 0, len = Math.min(x, y); i < len; ++i) {
      if (a[i] !== b[i]) {
        x = a[i];
        y = b[i];
        break;
      }
    }
    if (x < y) return -1;
    if (y < x) return 1;
    return 0;
  };
  Buffer2.isEncoding = function isEncoding(encoding) {
    switch (String(encoding).toLowerCase()) {
      case "hex":
      case "utf8":
      case "utf-8":
      case "ascii":
      case "latin1":
      case "binary":
      case "base64":
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return true;
      default:
        return false;
    }
  };
  Buffer2.concat = function concat(list, length) {
    if (!Array.isArray(list)) {
      throw new TypeError('"list" argument must be an Array of Buffers');
    }
    if (list.length === 0) {
      return Buffer2.alloc(0);
    }
    let i;
    if (length === void 0) {
      length = 0;
      for (i = 0; i < list.length; ++i) {
        length += list[i].length;
      }
    }
    const buffer2 = Buffer2.allocUnsafe(length);
    let pos = 0;
    for (i = 0; i < list.length; ++i) {
      let buf = list[i];
      if (isInstance(buf, GlobalUint8Array)) {
        if (pos + buf.length > buffer2.length) {
          if (!Buffer2.isBuffer(buf)) buf = Buffer2.from(buf);
          buf.copy(buffer2, pos);
        } else {
          GlobalUint8Array.prototype.set.call(
            buffer2,
            buf,
            pos
          );
        }
      } else if (!Buffer2.isBuffer(buf)) {
        throw new TypeError('"list" argument must be an Array of Buffers');
      } else {
        buf.copy(buffer2, pos);
      }
      pos += buf.length;
    }
    return buffer2;
  };
  function byteLength2(string, encoding) {
    if (Buffer2.isBuffer(string)) {
      return string.length;
    }
    if (GlobalArrayBuffer.isView(string) || isInstance(string, GlobalArrayBuffer)) {
      return string.byteLength;
    }
    if (typeof string !== "string") {
      throw new TypeError(
        'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof string
      );
    }
    const len = string.length;
    const mustMatch = arguments.length > 2 && arguments[2] === true;
    if (!mustMatch && len === 0) return 0;
    let loweredCase = false;
    for (; ; ) {
      switch (encoding) {
        case "ascii":
        case "latin1":
        case "binary":
          return len;
        case "utf8":
        case "utf-8":
          return utf8ToBytes(string).length;
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return len * 2;
        case "hex":
          return len >>> 1;
        case "base64":
          return base64ToBytes(string).length;
        default:
          if (loweredCase) {
            return mustMatch ? -1 : utf8ToBytes(string).length;
          }
          encoding = ("" + encoding).toLowerCase();
          loweredCase = true;
      }
    }
  }
  Buffer2.byteLength = byteLength2;
  function slowToString(encoding, start, end) {
    let loweredCase = false;
    if (start === void 0 || start < 0) {
      start = 0;
    }
    if (start > this.length) {
      return "";
    }
    if (end === void 0 || end > this.length) {
      end = this.length;
    }
    if (end <= 0) {
      return "";
    }
    end >>>= 0;
    start >>>= 0;
    if (end <= start) {
      return "";
    }
    if (!encoding) encoding = "utf8";
    while (true) {
      switch (encoding) {
        case "hex":
          return hexSlice(this, start, end);
        case "utf8":
        case "utf-8":
          return utf8Slice(this, start, end);
        case "ascii":
          return asciiSlice(this, start, end);
        case "latin1":
        case "binary":
          return latin1Slice(this, start, end);
        case "base64":
          return base64Slice(this, start, end);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return utf16leSlice(this, start, end);
        default:
          if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
          encoding = (encoding + "").toLowerCase();
          loweredCase = true;
      }
    }
  }
  Buffer2.prototype._isBuffer = true;
  function swap(b, n2, m) {
    const i = b[n2];
    b[n2] = b[m];
    b[m] = i;
  }
  Buffer2.prototype.swap16 = function swap16() {
    const len = this.length;
    if (len % 2 !== 0) {
      throw new RangeError("Buffer size must be a multiple of 16-bits");
    }
    for (let i = 0; i < len; i += 2) {
      swap(this, i, i + 1);
    }
    return this;
  };
  Buffer2.prototype.swap32 = function swap32() {
    const len = this.length;
    if (len % 4 !== 0) {
      throw new RangeError("Buffer size must be a multiple of 32-bits");
    }
    for (let i = 0; i < len; i += 4) {
      swap(this, i, i + 3);
      swap(this, i + 1, i + 2);
    }
    return this;
  };
  Buffer2.prototype.swap64 = function swap64() {
    const len = this.length;
    if (len % 8 !== 0) {
      throw new RangeError("Buffer size must be a multiple of 64-bits");
    }
    for (let i = 0; i < len; i += 8) {
      swap(this, i, i + 7);
      swap(this, i + 1, i + 6);
      swap(this, i + 2, i + 5);
      swap(this, i + 3, i + 4);
    }
    return this;
  };
  Buffer2.prototype.toString = function toString3() {
    const length = this.length;
    if (length === 0) return "";
    if (arguments.length === 0) return utf8Slice(this, 0, length);
    return slowToString.apply(this, arguments);
  };
  Buffer2.prototype.toLocaleString = Buffer2.prototype.toString;
  Buffer2.prototype.equals = function equals(b) {
    if (!Buffer2.isBuffer(b)) throw new TypeError("Argument must be a Buffer");
    if (this === b) return true;
    return Buffer2.compare(this, b) === 0;
  };
  Buffer2.prototype.inspect = function inspect() {
    let str = "";
    const max = exports$1.INSPECT_MAX_BYTES;
    str = this.toString("hex", 0, max).replace(/(.{2})/g, "$1 ").trim();
    if (this.length > max) str += " ... ";
    return "<Buffer " + str + ">";
  };
  if (customInspectSymbol) {
    Buffer2.prototype[customInspectSymbol] = Buffer2.prototype.inspect;
  }
  Buffer2.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
    if (isInstance(target, GlobalUint8Array)) {
      target = Buffer2.from(target, target.offset, target.byteLength);
    }
    if (!Buffer2.isBuffer(target)) {
      throw new TypeError(
        'The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof target
      );
    }
    if (start === void 0) {
      start = 0;
    }
    if (end === void 0) {
      end = target ? target.length : 0;
    }
    if (thisStart === void 0) {
      thisStart = 0;
    }
    if (thisEnd === void 0) {
      thisEnd = this.length;
    }
    if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
      throw new RangeError("out of range index");
    }
    if (thisStart >= thisEnd && start >= end) {
      return 0;
    }
    if (thisStart >= thisEnd) {
      return -1;
    }
    if (start >= end) {
      return 1;
    }
    start >>>= 0;
    end >>>= 0;
    thisStart >>>= 0;
    thisEnd >>>= 0;
    if (this === target) return 0;
    let x = thisEnd - thisStart;
    let y = end - start;
    const len = Math.min(x, y);
    const thisCopy = this.slice(thisStart, thisEnd);
    const targetCopy = target.slice(start, end);
    for (let i = 0; i < len; ++i) {
      if (thisCopy[i] !== targetCopy[i]) {
        x = thisCopy[i];
        y = targetCopy[i];
        break;
      }
    }
    if (x < y) return -1;
    if (y < x) return 1;
    return 0;
  };
  function bidirectionalIndexOf(buffer2, val, byteOffset, encoding, dir) {
    if (buffer2.length === 0) return -1;
    if (typeof byteOffset === "string") {
      encoding = byteOffset;
      byteOffset = 0;
    } else if (byteOffset > 2147483647) {
      byteOffset = 2147483647;
    } else if (byteOffset < -2147483648) {
      byteOffset = -2147483648;
    }
    byteOffset = +byteOffset;
    if (numberIsNaN(byteOffset)) {
      byteOffset = dir ? 0 : buffer2.length - 1;
    }
    if (byteOffset < 0) byteOffset = buffer2.length + byteOffset;
    if (byteOffset >= buffer2.length) {
      if (dir) return -1;
      else byteOffset = buffer2.length - 1;
    } else if (byteOffset < 0) {
      if (dir) byteOffset = 0;
      else return -1;
    }
    if (typeof val === "string") {
      val = Buffer2.from(val, encoding);
    }
    if (Buffer2.isBuffer(val)) {
      if (val.length === 0) {
        return -1;
      }
      return arrayIndexOf(buffer2, val, byteOffset, encoding, dir);
    } else if (typeof val === "number") {
      val = val & 255;
      if (typeof GlobalUint8Array.prototype.indexOf === "function") {
        if (dir) {
          return GlobalUint8Array.prototype.indexOf.call(buffer2, val, byteOffset);
        } else {
          return GlobalUint8Array.prototype.lastIndexOf.call(buffer2, val, byteOffset);
        }
      }
      return arrayIndexOf(buffer2, [val], byteOffset, encoding, dir);
    }
    throw new TypeError("val must be string, number or Buffer");
  }
  function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
    let indexSize = 1;
    let arrLength = arr.length;
    let valLength = val.length;
    if (encoding !== void 0) {
      encoding = String(encoding).toLowerCase();
      if (encoding === "ucs2" || encoding === "ucs-2" || encoding === "utf16le" || encoding === "utf-16le") {
        if (arr.length < 2 || val.length < 2) {
          return -1;
        }
        indexSize = 2;
        arrLength /= 2;
        valLength /= 2;
        byteOffset /= 2;
      }
    }
    function read(buf, i2) {
      if (indexSize === 1) {
        return buf[i2];
      } else {
        return buf.readUInt16BE(i2 * indexSize);
      }
    }
    let i;
    if (dir) {
      let foundIndex = -1;
      for (i = byteOffset; i < arrLength; i++) {
        if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
          if (foundIndex === -1) foundIndex = i;
          if (i - foundIndex + 1 === valLength) return foundIndex * indexSize;
        } else {
          if (foundIndex !== -1) i -= i - foundIndex;
          foundIndex = -1;
        }
      }
    } else {
      if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;
      for (i = byteOffset; i >= 0; i--) {
        let found = true;
        for (let j = 0; j < valLength; j++) {
          if (read(arr, i + j) !== read(val, j)) {
            found = false;
            break;
          }
        }
        if (found) return i;
      }
    }
    return -1;
  }
  Buffer2.prototype.includes = function includes(val, byteOffset, encoding) {
    return this.indexOf(val, byteOffset, encoding) !== -1;
  };
  Buffer2.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
    return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
  };
  Buffer2.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
    return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
  };
  function hexWrite(buf, string, offset, length) {
    offset = Number(offset) || 0;
    const remaining = buf.length - offset;
    if (!length) {
      length = remaining;
    } else {
      length = Number(length);
      if (length > remaining) {
        length = remaining;
      }
    }
    const strLen = string.length;
    if (length > strLen / 2) {
      length = strLen / 2;
    }
    let i;
    for (i = 0; i < length; ++i) {
      const parsed = parseInt(string.substr(i * 2, 2), 16);
      if (numberIsNaN(parsed)) return i;
      buf[offset + i] = parsed;
    }
    return i;
  }
  function utf8Write(buf, string, offset, length) {
    return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
  }
  function asciiWrite(buf, string, offset, length) {
    return blitBuffer(asciiToBytes(string), buf, offset, length);
  }
  function base64Write(buf, string, offset, length) {
    return blitBuffer(base64ToBytes(string), buf, offset, length);
  }
  function ucs2Write(buf, string, offset, length) {
    return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
  }
  Buffer2.prototype.write = function write(string, offset, length, encoding) {
    if (offset === void 0) {
      encoding = "utf8";
      length = this.length;
      offset = 0;
    } else if (length === void 0 && typeof offset === "string") {
      encoding = offset;
      length = this.length;
      offset = 0;
    } else if (isFinite(offset)) {
      offset = offset >>> 0;
      if (isFinite(length)) {
        length = length >>> 0;
        if (encoding === void 0) encoding = "utf8";
      } else {
        encoding = length;
        length = void 0;
      }
    } else {
      throw new Error(
        "Buffer.write(string, encoding, offset[, length]) is no longer supported"
      );
    }
    const remaining = this.length - offset;
    if (length === void 0 || length > remaining) length = remaining;
    if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
      throw new RangeError("Attempt to write outside buffer bounds");
    }
    if (!encoding) encoding = "utf8";
    let loweredCase = false;
    for (; ; ) {
      switch (encoding) {
        case "hex":
          return hexWrite(this, string, offset, length);
        case "utf8":
        case "utf-8":
          return utf8Write(this, string, offset, length);
        case "ascii":
        case "latin1":
        case "binary":
          return asciiWrite(this, string, offset, length);
        case "base64":
          return base64Write(this, string, offset, length);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return ucs2Write(this, string, offset, length);
        default:
          if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
          encoding = ("" + encoding).toLowerCase();
          loweredCase = true;
      }
    }
  };
  Buffer2.prototype.toJSON = function toJSON2() {
    return {
      type: "Buffer",
      data: Array.prototype.slice.call(this._arr || this, 0)
    };
  };
  function base64Slice(buf, start, end) {
    if (start === 0 && end === buf.length) {
      return base64.fromByteArray(buf);
    } else {
      return base64.fromByteArray(buf.slice(start, end));
    }
  }
  function utf8Slice(buf, start, end) {
    end = Math.min(buf.length, end);
    const res = [];
    let i = start;
    while (i < end) {
      const firstByte = buf[i];
      let codePoint = null;
      let bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
      if (i + bytesPerSequence <= end) {
        let secondByte, thirdByte, fourthByte, tempCodePoint;
        switch (bytesPerSequence) {
          case 1:
            if (firstByte < 128) {
              codePoint = firstByte;
            }
            break;
          case 2:
            secondByte = buf[i + 1];
            if ((secondByte & 192) === 128) {
              tempCodePoint = (firstByte & 31) << 6 | secondByte & 63;
              if (tempCodePoint > 127) {
                codePoint = tempCodePoint;
              }
            }
            break;
          case 3:
            secondByte = buf[i + 1];
            thirdByte = buf[i + 2];
            if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
              tempCodePoint = (firstByte & 15) << 12 | (secondByte & 63) << 6 | thirdByte & 63;
              if (tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343)) {
                codePoint = tempCodePoint;
              }
            }
            break;
          case 4:
            secondByte = buf[i + 1];
            thirdByte = buf[i + 2];
            fourthByte = buf[i + 3];
            if ((secondByte & 192) === 128 && (thirdByte & 192) === 128 && (fourthByte & 192) === 128) {
              tempCodePoint = (firstByte & 15) << 18 | (secondByte & 63) << 12 | (thirdByte & 63) << 6 | fourthByte & 63;
              if (tempCodePoint > 65535 && tempCodePoint < 1114112) {
                codePoint = tempCodePoint;
              }
            }
        }
      }
      if (codePoint === null) {
        codePoint = 65533;
        bytesPerSequence = 1;
      } else if (codePoint > 65535) {
        codePoint -= 65536;
        res.push(codePoint >>> 10 & 1023 | 55296);
        codePoint = 56320 | codePoint & 1023;
      }
      res.push(codePoint);
      i += bytesPerSequence;
    }
    return decodeCodePointsArray(res);
  }
  const MAX_ARGUMENTS_LENGTH = 4096;
  function decodeCodePointsArray(codePoints) {
    const len = codePoints.length;
    if (len <= MAX_ARGUMENTS_LENGTH) {
      return String.fromCharCode.apply(String, codePoints);
    }
    let res = "";
    let i = 0;
    while (i < len) {
      res += String.fromCharCode.apply(
        String,
        codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
      );
    }
    return res;
  }
  function asciiSlice(buf, start, end) {
    let ret = "";
    end = Math.min(buf.length, end);
    for (let i = start; i < end; ++i) {
      ret += String.fromCharCode(buf[i] & 127);
    }
    return ret;
  }
  function latin1Slice(buf, start, end) {
    let ret = "";
    end = Math.min(buf.length, end);
    for (let i = start; i < end; ++i) {
      ret += String.fromCharCode(buf[i]);
    }
    return ret;
  }
  function hexSlice(buf, start, end) {
    const len = buf.length;
    if (!start || start < 0) start = 0;
    if (!end || end < 0 || end > len) end = len;
    let out = "";
    for (let i = start; i < end; ++i) {
      out += hexSliceLookupTable[buf[i]];
    }
    return out;
  }
  function utf16leSlice(buf, start, end) {
    const bytes = buf.slice(start, end);
    let res = "";
    for (let i = 0; i < bytes.length - 1; i += 2) {
      res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
    }
    return res;
  }
  Buffer2.prototype.slice = function slice(start, end) {
    const len = this.length;
    start = ~~start;
    end = end === void 0 ? len : ~~end;
    if (start < 0) {
      start += len;
      if (start < 0) start = 0;
    } else if (start > len) {
      start = len;
    }
    if (end < 0) {
      end += len;
      if (end < 0) end = 0;
    } else if (end > len) {
      end = len;
    }
    if (end < start) end = start;
    const newBuf = this.subarray(start, end);
    Object.setPrototypeOf(newBuf, Buffer2.prototype);
    return newBuf;
  };
  function checkOffset(offset, ext, length) {
    if (offset % 1 !== 0 || offset < 0) throw new RangeError("offset is not uint");
    if (offset + ext > length) throw new RangeError("Trying to access beyond buffer length");
  }
  Buffer2.prototype.readUintLE = Buffer2.prototype.readUIntLE = function readUIntLE(offset, byteLength3, noAssert) {
    offset = offset >>> 0;
    byteLength3 = byteLength3 >>> 0;
    if (!noAssert) checkOffset(offset, byteLength3, this.length);
    let val = this[offset];
    let mul = 1;
    let i = 0;
    while (++i < byteLength3 && (mul *= 256)) {
      val += this[offset + i] * mul;
    }
    return val;
  };
  Buffer2.prototype.readUintBE = Buffer2.prototype.readUIntBE = function readUIntBE(offset, byteLength3, noAssert) {
    offset = offset >>> 0;
    byteLength3 = byteLength3 >>> 0;
    if (!noAssert) {
      checkOffset(offset, byteLength3, this.length);
    }
    let val = this[offset + --byteLength3];
    let mul = 1;
    while (byteLength3 > 0 && (mul *= 256)) {
      val += this[offset + --byteLength3] * mul;
    }
    return val;
  };
  Buffer2.prototype.readUint8 = Buffer2.prototype.readUInt8 = function readUInt8(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 1, this.length);
    return this[offset];
  };
  Buffer2.prototype.readUint16LE = Buffer2.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 2, this.length);
    return this[offset] | this[offset + 1] << 8;
  };
  Buffer2.prototype.readUint16BE = Buffer2.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 2, this.length);
    return this[offset] << 8 | this[offset + 1];
  };
  Buffer2.prototype.readUint32LE = Buffer2.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 4, this.length);
    return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 16777216;
  };
  Buffer2.prototype.readUint32BE = Buffer2.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 4, this.length);
    return this[offset] * 16777216 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
  };
  Buffer2.prototype.readBigUInt64LE = defineBigIntMethod(function readBigUInt64LE(offset) {
    offset = offset >>> 0;
    validateNumber(offset, "offset");
    const first = this[offset];
    const last = this[offset + 7];
    if (first === void 0 || last === void 0) {
      boundsError(offset, this.length - 8);
    }
    const lo = first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24;
    const hi = this[++offset] + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + last * 2 ** 24;
    return BigInt(lo) + (BigInt(hi) << BigInt(32));
  });
  Buffer2.prototype.readBigUInt64BE = defineBigIntMethod(function readBigUInt64BE(offset) {
    offset = offset >>> 0;
    validateNumber(offset, "offset");
    const first = this[offset];
    const last = this[offset + 7];
    if (first === void 0 || last === void 0) {
      boundsError(offset, this.length - 8);
    }
    const hi = first * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + this[++offset];
    const lo = this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last;
    return (BigInt(hi) << BigInt(32)) + BigInt(lo);
  });
  Buffer2.prototype.readIntLE = function readIntLE(offset, byteLength3, noAssert) {
    offset = offset >>> 0;
    byteLength3 = byteLength3 >>> 0;
    if (!noAssert) checkOffset(offset, byteLength3, this.length);
    let val = this[offset];
    let mul = 1;
    let i = 0;
    while (++i < byteLength3 && (mul *= 256)) {
      val += this[offset + i] * mul;
    }
    mul *= 128;
    if (val >= mul) val -= Math.pow(2, 8 * byteLength3);
    return val;
  };
  Buffer2.prototype.readIntBE = function readIntBE(offset, byteLength3, noAssert) {
    offset = offset >>> 0;
    byteLength3 = byteLength3 >>> 0;
    if (!noAssert) checkOffset(offset, byteLength3, this.length);
    let i = byteLength3;
    let mul = 1;
    let val = this[offset + --i];
    while (i > 0 && (mul *= 256)) {
      val += this[offset + --i] * mul;
    }
    mul *= 128;
    if (val >= mul) val -= Math.pow(2, 8 * byteLength3);
    return val;
  };
  Buffer2.prototype.readInt8 = function readInt8(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 1, this.length);
    if (!(this[offset] & 128)) return this[offset];
    return (255 - this[offset] + 1) * -1;
  };
  Buffer2.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 2, this.length);
    const val = this[offset] | this[offset + 1] << 8;
    return val & 32768 ? val | 4294901760 : val;
  };
  Buffer2.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 2, this.length);
    const val = this[offset + 1] | this[offset] << 8;
    return val & 32768 ? val | 4294901760 : val;
  };
  Buffer2.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 4, this.length);
    return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
  };
  Buffer2.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 4, this.length);
    return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
  };
  Buffer2.prototype.readBigInt64LE = defineBigIntMethod(function readBigInt64LE(offset) {
    offset = offset >>> 0;
    validateNumber(offset, "offset");
    const first = this[offset];
    const last = this[offset + 7];
    if (first === void 0 || last === void 0) {
      boundsError(offset, this.length - 8);
    }
    const val = this[offset + 4] + this[offset + 5] * 2 ** 8 + this[offset + 6] * 2 ** 16 + (last << 24);
    return (BigInt(val) << BigInt(32)) + BigInt(first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24);
  });
  Buffer2.prototype.readBigInt64BE = defineBigIntMethod(function readBigInt64BE(offset) {
    offset = offset >>> 0;
    validateNumber(offset, "offset");
    const first = this[offset];
    const last = this[offset + 7];
    if (first === void 0 || last === void 0) {
      boundsError(offset, this.length - 8);
    }
    const val = (first << 24) + // Overflow
    this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + this[++offset];
    return (BigInt(val) << BigInt(32)) + BigInt(this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last);
  });
  Buffer2.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 4, this.length);
    return ieee754$1.read(this, offset, true, 23, 4);
  };
  Buffer2.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 4, this.length);
    return ieee754$1.read(this, offset, false, 23, 4);
  };
  Buffer2.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 8, this.length);
    return ieee754$1.read(this, offset, true, 52, 8);
  };
  Buffer2.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 8, this.length);
    return ieee754$1.read(this, offset, false, 52, 8);
  };
  function checkInt(buf, value, offset, ext, max, min) {
    if (!Buffer2.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance');
    if (value > max || value < min) throw new RangeError('"value" argument is out of bounds');
    if (offset + ext > buf.length) throw new RangeError("Index out of range");
  }
  Buffer2.prototype.writeUintLE = Buffer2.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength3, noAssert) {
    value = +value;
    offset = offset >>> 0;
    byteLength3 = byteLength3 >>> 0;
    if (!noAssert) {
      const maxBytes = Math.pow(2, 8 * byteLength3) - 1;
      checkInt(this, value, offset, byteLength3, maxBytes, 0);
    }
    let mul = 1;
    let i = 0;
    this[offset] = value & 255;
    while (++i < byteLength3 && (mul *= 256)) {
      this[offset + i] = value / mul & 255;
    }
    return offset + byteLength3;
  };
  Buffer2.prototype.writeUintBE = Buffer2.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength3, noAssert) {
    value = +value;
    offset = offset >>> 0;
    byteLength3 = byteLength3 >>> 0;
    if (!noAssert) {
      const maxBytes = Math.pow(2, 8 * byteLength3) - 1;
      checkInt(this, value, offset, byteLength3, maxBytes, 0);
    }
    let i = byteLength3 - 1;
    let mul = 1;
    this[offset + i] = value & 255;
    while (--i >= 0 && (mul *= 256)) {
      this[offset + i] = value / mul & 255;
    }
    return offset + byteLength3;
  };
  Buffer2.prototype.writeUint8 = Buffer2.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 1, 255, 0);
    this[offset] = value & 255;
    return offset + 1;
  };
  Buffer2.prototype.writeUint16LE = Buffer2.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 2, 65535, 0);
    this[offset] = value & 255;
    this[offset + 1] = value >>> 8;
    return offset + 2;
  };
  Buffer2.prototype.writeUint16BE = Buffer2.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 2, 65535, 0);
    this[offset] = value >>> 8;
    this[offset + 1] = value & 255;
    return offset + 2;
  };
  Buffer2.prototype.writeUint32LE = Buffer2.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 4, 4294967295, 0);
    this[offset + 3] = value >>> 24;
    this[offset + 2] = value >>> 16;
    this[offset + 1] = value >>> 8;
    this[offset] = value & 255;
    return offset + 4;
  };
  Buffer2.prototype.writeUint32BE = Buffer2.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 4, 4294967295, 0);
    this[offset] = value >>> 24;
    this[offset + 1] = value >>> 16;
    this[offset + 2] = value >>> 8;
    this[offset + 3] = value & 255;
    return offset + 4;
  };
  function wrtBigUInt64LE(buf, value, offset, min, max) {
    checkIntBI(value, min, max, buf, offset, 7);
    let lo = Number(value & BigInt(4294967295));
    buf[offset++] = lo;
    lo = lo >> 8;
    buf[offset++] = lo;
    lo = lo >> 8;
    buf[offset++] = lo;
    lo = lo >> 8;
    buf[offset++] = lo;
    let hi = Number(value >> BigInt(32) & BigInt(4294967295));
    buf[offset++] = hi;
    hi = hi >> 8;
    buf[offset++] = hi;
    hi = hi >> 8;
    buf[offset++] = hi;
    hi = hi >> 8;
    buf[offset++] = hi;
    return offset;
  }
  function wrtBigUInt64BE(buf, value, offset, min, max) {
    checkIntBI(value, min, max, buf, offset, 7);
    let lo = Number(value & BigInt(4294967295));
    buf[offset + 7] = lo;
    lo = lo >> 8;
    buf[offset + 6] = lo;
    lo = lo >> 8;
    buf[offset + 5] = lo;
    lo = lo >> 8;
    buf[offset + 4] = lo;
    let hi = Number(value >> BigInt(32) & BigInt(4294967295));
    buf[offset + 3] = hi;
    hi = hi >> 8;
    buf[offset + 2] = hi;
    hi = hi >> 8;
    buf[offset + 1] = hi;
    hi = hi >> 8;
    buf[offset] = hi;
    return offset + 8;
  }
  Buffer2.prototype.writeBigUInt64LE = defineBigIntMethod(function writeBigUInt64LE(value, offset = 0) {
    return wrtBigUInt64LE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
  });
  Buffer2.prototype.writeBigUInt64BE = defineBigIntMethod(function writeBigUInt64BE(value, offset = 0) {
    return wrtBigUInt64BE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
  });
  Buffer2.prototype.writeIntLE = function writeIntLE(value, offset, byteLength3, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) {
      const limit = Math.pow(2, 8 * byteLength3 - 1);
      checkInt(this, value, offset, byteLength3, limit - 1, -limit);
    }
    let i = 0;
    let mul = 1;
    let sub = 0;
    this[offset] = value & 255;
    while (++i < byteLength3 && (mul *= 256)) {
      if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
        sub = 1;
      }
      this[offset + i] = (value / mul >> 0) - sub & 255;
    }
    return offset + byteLength3;
  };
  Buffer2.prototype.writeIntBE = function writeIntBE(value, offset, byteLength3, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) {
      const limit = Math.pow(2, 8 * byteLength3 - 1);
      checkInt(this, value, offset, byteLength3, limit - 1, -limit);
    }
    let i = byteLength3 - 1;
    let mul = 1;
    let sub = 0;
    this[offset + i] = value & 255;
    while (--i >= 0 && (mul *= 256)) {
      if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
        sub = 1;
      }
      this[offset + i] = (value / mul >> 0) - sub & 255;
    }
    return offset + byteLength3;
  };
  Buffer2.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 1, 127, -128);
    if (value < 0) value = 255 + value + 1;
    this[offset] = value & 255;
    return offset + 1;
  };
  Buffer2.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 2, 32767, -32768);
    this[offset] = value & 255;
    this[offset + 1] = value >>> 8;
    return offset + 2;
  };
  Buffer2.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 2, 32767, -32768);
    this[offset] = value >>> 8;
    this[offset + 1] = value & 255;
    return offset + 2;
  };
  Buffer2.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 4, 2147483647, -2147483648);
    this[offset] = value & 255;
    this[offset + 1] = value >>> 8;
    this[offset + 2] = value >>> 16;
    this[offset + 3] = value >>> 24;
    return offset + 4;
  };
  Buffer2.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 4, 2147483647, -2147483648);
    if (value < 0) value = 4294967295 + value + 1;
    this[offset] = value >>> 24;
    this[offset + 1] = value >>> 16;
    this[offset + 2] = value >>> 8;
    this[offset + 3] = value & 255;
    return offset + 4;
  };
  Buffer2.prototype.writeBigInt64LE = defineBigIntMethod(function writeBigInt64LE(value, offset = 0) {
    return wrtBigUInt64LE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
  });
  Buffer2.prototype.writeBigInt64BE = defineBigIntMethod(function writeBigInt64BE(value, offset = 0) {
    return wrtBigUInt64BE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
  });
  function checkIEEE754(buf, value, offset, ext, max, min) {
    if (offset + ext > buf.length) throw new RangeError("Index out of range");
    if (offset < 0) throw new RangeError("Index out of range");
  }
  function writeFloat(buf, value, offset, littleEndian, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) {
      checkIEEE754(buf, value, offset, 4);
    }
    ieee754$1.write(buf, value, offset, littleEndian, 23, 4);
    return offset + 4;
  }
  Buffer2.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
    return writeFloat(this, value, offset, true, noAssert);
  };
  Buffer2.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
    return writeFloat(this, value, offset, false, noAssert);
  };
  function writeDouble(buf, value, offset, littleEndian, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) {
      checkIEEE754(buf, value, offset, 8);
    }
    ieee754$1.write(buf, value, offset, littleEndian, 52, 8);
    return offset + 8;
  }
  Buffer2.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
    return writeDouble(this, value, offset, true, noAssert);
  };
  Buffer2.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
    return writeDouble(this, value, offset, false, noAssert);
  };
  Buffer2.prototype.copy = function copy(target, targetStart, start, end) {
    if (!Buffer2.isBuffer(target)) throw new TypeError("argument should be a Buffer");
    if (!start) start = 0;
    if (!end && end !== 0) end = this.length;
    if (targetStart >= target.length) targetStart = target.length;
    if (!targetStart) targetStart = 0;
    if (end > 0 && end < start) end = start;
    if (end === start) return 0;
    if (target.length === 0 || this.length === 0) return 0;
    if (targetStart < 0) {
      throw new RangeError("targetStart out of bounds");
    }
    if (start < 0 || start >= this.length) throw new RangeError("Index out of range");
    if (end < 0) throw new RangeError("sourceEnd out of bounds");
    if (end > this.length) end = this.length;
    if (target.length - targetStart < end - start) {
      end = target.length - targetStart + start;
    }
    const len = end - start;
    if (this === target && typeof GlobalUint8Array.prototype.copyWithin === "function") {
      this.copyWithin(targetStart, start, end);
    } else {
      GlobalUint8Array.prototype.set.call(
        target,
        this.subarray(start, end),
        targetStart
      );
    }
    return len;
  };
  Buffer2.prototype.fill = function fill(val, start, end, encoding) {
    if (typeof val === "string") {
      if (typeof start === "string") {
        encoding = start;
        start = 0;
        end = this.length;
      } else if (typeof end === "string") {
        encoding = end;
        end = this.length;
      }
      if (encoding !== void 0 && typeof encoding !== "string") {
        throw new TypeError("encoding must be a string");
      }
      if (typeof encoding === "string" && !Buffer2.isEncoding(encoding)) {
        throw new TypeError("Unknown encoding: " + encoding);
      }
      if (val.length === 1) {
        const code2 = val.charCodeAt(0);
        if (encoding === "utf8" && code2 < 128 || encoding === "latin1") {
          val = code2;
        }
      }
    } else if (typeof val === "number") {
      val = val & 255;
    } else if (typeof val === "boolean") {
      val = Number(val);
    }
    if (start < 0 || this.length < start || this.length < end) {
      throw new RangeError("Out of range index");
    }
    if (end <= start) {
      return this;
    }
    start = start >>> 0;
    end = end === void 0 ? this.length : end >>> 0;
    if (!val) val = 0;
    let i;
    if (typeof val === "number") {
      for (i = start; i < end; ++i) {
        this[i] = val;
      }
    } else {
      const bytes = Buffer2.isBuffer(val) ? val : Buffer2.from(val, encoding);
      const len = bytes.length;
      if (len === 0) {
        throw new TypeError('The value "' + val + '" is invalid for argument "value"');
      }
      for (i = 0; i < end - start; ++i) {
        this[i + start] = bytes[i % len];
      }
    }
    return this;
  };
  const errors = {};
  function E(sym, getMessage, Base) {
    errors[sym] = class NodeError extends Base {
      constructor() {
        super();
        Object.defineProperty(this, "message", {
          value: getMessage.apply(this, arguments),
          writable: true,
          configurable: true
        });
        this.name = `${this.name} [${sym}]`;
        this.stack;
        delete this.name;
      }
      get code() {
        return sym;
      }
      set code(value) {
        Object.defineProperty(this, "code", {
          configurable: true,
          enumerable: true,
          value,
          writable: true
        });
      }
      toString() {
        return `${this.name} [${sym}]: ${this.message}`;
      }
    };
  }
  E(
    "ERR_BUFFER_OUT_OF_BOUNDS",
    function(name) {
      if (name) {
        return `${name} is outside of buffer bounds`;
      }
      return "Attempt to access memory outside buffer bounds";
    },
    RangeError
  );
  E(
    "ERR_INVALID_ARG_TYPE",
    function(name, actual) {
      return `The "${name}" argument must be of type number. Received type ${typeof actual}`;
    },
    TypeError
  );
  E(
    "ERR_OUT_OF_RANGE",
    function(str, range, input) {
      let msg = `The value of "${str}" is out of range.`;
      let received = input;
      if (Number.isInteger(input) && Math.abs(input) > 2 ** 32) {
        received = addNumericalSeparator(String(input));
      } else if (typeof input === "bigint") {
        received = String(input);
        if (input > BigInt(2) ** BigInt(32) || input < -(BigInt(2) ** BigInt(32))) {
          received = addNumericalSeparator(received);
        }
        received += "n";
      }
      msg += ` It must be ${range}. Received ${received}`;
      return msg;
    },
    RangeError
  );
  function addNumericalSeparator(val) {
    let res = "";
    let i = val.length;
    const start = val[0] === "-" ? 1 : 0;
    for (; i >= start + 4; i -= 3) {
      res = `_${val.slice(i - 3, i)}${res}`;
    }
    return `${val.slice(0, i)}${res}`;
  }
  function checkBounds(buf, offset, byteLength3) {
    validateNumber(offset, "offset");
    if (buf[offset] === void 0 || buf[offset + byteLength3] === void 0) {
      boundsError(offset, buf.length - (byteLength3 + 1));
    }
  }
  function checkIntBI(value, min, max, buf, offset, byteLength3) {
    if (value > max || value < min) {
      const n2 = typeof min === "bigint" ? "n" : "";
      let range;
      {
        if (min === 0 || min === BigInt(0)) {
          range = `>= 0${n2} and < 2${n2} ** ${(byteLength3 + 1) * 8}${n2}`;
        } else {
          range = `>= -(2${n2} ** ${(byteLength3 + 1) * 8 - 1}${n2}) and < 2 ** ${(byteLength3 + 1) * 8 - 1}${n2}`;
        }
      }
      throw new errors.ERR_OUT_OF_RANGE("value", range, value);
    }
    checkBounds(buf, offset, byteLength3);
  }
  function validateNumber(value, name) {
    if (typeof value !== "number") {
      throw new errors.ERR_INVALID_ARG_TYPE(name, "number", value);
    }
  }
  function boundsError(value, length, type) {
    if (Math.floor(value) !== value) {
      validateNumber(value, type);
      throw new errors.ERR_OUT_OF_RANGE("offset", "an integer", value);
    }
    if (length < 0) {
      throw new errors.ERR_BUFFER_OUT_OF_BOUNDS();
    }
    throw new errors.ERR_OUT_OF_RANGE(
      "offset",
      `>= ${0} and <= ${length}`,
      value
    );
  }
  const INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;
  function base64clean(str) {
    str = str.split("=")[0];
    str = str.trim().replace(INVALID_BASE64_RE, "");
    if (str.length < 2) return "";
    while (str.length % 4 !== 0) {
      str = str + "=";
    }
    return str;
  }
  function utf8ToBytes(string, units) {
    units = units || Infinity;
    let codePoint;
    const length = string.length;
    let leadSurrogate = null;
    const bytes = [];
    for (let i = 0; i < length; ++i) {
      codePoint = string.charCodeAt(i);
      if (codePoint > 55295 && codePoint < 57344) {
        if (!leadSurrogate) {
          if (codePoint > 56319) {
            if ((units -= 3) > -1) bytes.push(239, 191, 189);
            continue;
          } else if (i + 1 === length) {
            if ((units -= 3) > -1) bytes.push(239, 191, 189);
            continue;
          }
          leadSurrogate = codePoint;
          continue;
        }
        if (codePoint < 56320) {
          if ((units -= 3) > -1) bytes.push(239, 191, 189);
          leadSurrogate = codePoint;
          continue;
        }
        codePoint = (leadSurrogate - 55296 << 10 | codePoint - 56320) + 65536;
      } else if (leadSurrogate) {
        if ((units -= 3) > -1) bytes.push(239, 191, 189);
      }
      leadSurrogate = null;
      if (codePoint < 128) {
        if ((units -= 1) < 0) break;
        bytes.push(codePoint);
      } else if (codePoint < 2048) {
        if ((units -= 2) < 0) break;
        bytes.push(
          codePoint >> 6 | 192,
          codePoint & 63 | 128
        );
      } else if (codePoint < 65536) {
        if ((units -= 3) < 0) break;
        bytes.push(
          codePoint >> 12 | 224,
          codePoint >> 6 & 63 | 128,
          codePoint & 63 | 128
        );
      } else if (codePoint < 1114112) {
        if ((units -= 4) < 0) break;
        bytes.push(
          codePoint >> 18 | 240,
          codePoint >> 12 & 63 | 128,
          codePoint >> 6 & 63 | 128,
          codePoint & 63 | 128
        );
      } else {
        throw new Error("Invalid code point");
      }
    }
    return bytes;
  }
  function asciiToBytes(str) {
    const byteArray = [];
    for (let i = 0; i < str.length; ++i) {
      byteArray.push(str.charCodeAt(i) & 255);
    }
    return byteArray;
  }
  function utf16leToBytes(str, units) {
    let c, hi, lo;
    const byteArray = [];
    for (let i = 0; i < str.length; ++i) {
      if ((units -= 2) < 0) break;
      c = str.charCodeAt(i);
      hi = c >> 8;
      lo = c % 256;
      byteArray.push(lo);
      byteArray.push(hi);
    }
    return byteArray;
  }
  function base64ToBytes(str) {
    return base64.toByteArray(base64clean(str));
  }
  function blitBuffer(src, dst, offset, length) {
    let i;
    for (i = 0; i < length; ++i) {
      if (i + offset >= dst.length || i >= src.length) break;
      dst[i + offset] = src[i];
    }
    return i;
  }
  function isInstance(obj, type) {
    return obj instanceof type || obj != null && obj.constructor != null && obj.constructor.name != null && obj.constructor.name === type.name;
  }
  function numberIsNaN(obj) {
    return obj !== obj;
  }
  const hexSliceLookupTable = (function() {
    const alphabet = "0123456789abcdef";
    const table = new Array(256);
    for (let i = 0; i < 16; ++i) {
      const i16 = i * 16;
      for (let j = 0; j < 16; ++j) {
        table[i16 + j] = alphabet[i] + alphabet[j];
      }
    }
    return table;
  })();
  function defineBigIntMethod(fn) {
    return typeof BigInt === "undefined" ? BufferBigIntNotDefined : fn;
  }
  function BufferBigIntNotDefined() {
    throw new Error("BigInt not supported");
  }
})(buffer);
const Buffer = buffer.Buffer;
/*! @license DOMPurify 3.3.0 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.3.0/LICENSE */
const {
  entries,
  setPrototypeOf,
  isFrozen,
  getPrototypeOf: getPrototypeOf$1,
  getOwnPropertyDescriptor
} = Object;
let {
  freeze,
  seal,
  create
} = Object;
let {
  apply,
  construct
} = typeof Reflect !== "undefined" && Reflect;
if (!freeze) {
  freeze = function freeze2(x) {
    return x;
  };
}
if (!seal) {
  seal = function seal2(x) {
    return x;
  };
}
if (!apply) {
  apply = function apply2(func, thisArg) {
    for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }
    return func.apply(thisArg, args);
  };
}
if (!construct) {
  construct = function construct2(Func) {
    for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }
    return new Func(...args);
  };
}
const arrayForEach = unapply(Array.prototype.forEach);
const arrayLastIndexOf = unapply(Array.prototype.lastIndexOf);
const arrayPop = unapply(Array.prototype.pop);
const arrayPush = unapply(Array.prototype.push);
const arraySplice = unapply(Array.prototype.splice);
const stringToLowerCase = unapply(String.prototype.toLowerCase);
const stringToString = unapply(String.prototype.toString);
const stringMatch = unapply(String.prototype.match);
const stringReplace = unapply(String.prototype.replace);
const stringIndexOf = unapply(String.prototype.indexOf);
const stringTrim = unapply(String.prototype.trim);
const objectHasOwnProperty = unapply(Object.prototype.hasOwnProperty);
const regExpTest = unapply(RegExp.prototype.test);
const typeErrorCreate = unconstruct(TypeError);
function unapply(func) {
  return function(thisArg) {
    if (thisArg instanceof RegExp) {
      thisArg.lastIndex = 0;
    }
    for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      args[_key3 - 1] = arguments[_key3];
    }
    return apply(func, thisArg, args);
  };
}
function unconstruct(Func) {
  return function() {
    for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }
    return construct(Func, args);
  };
}
function addToSet(set, array) {
  let transformCaseFunc = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : stringToLowerCase;
  if (setPrototypeOf) {
    setPrototypeOf(set, null);
  }
  let l = array.length;
  while (l--) {
    let element = array[l];
    if (typeof element === "string") {
      const lcElement = transformCaseFunc(element);
      if (lcElement !== element) {
        if (!isFrozen(array)) {
          array[l] = lcElement;
        }
        element = lcElement;
      }
    }
    set[element] = true;
  }
  return set;
}
function cleanArray(array) {
  for (let index = 0; index < array.length; index++) {
    const isPropertyExist = objectHasOwnProperty(array, index);
    if (!isPropertyExist) {
      array[index] = null;
    }
  }
  return array;
}
function clone(object) {
  const newObject = create(null);
  for (const [property, value] of entries(object)) {
    const isPropertyExist = objectHasOwnProperty(object, property);
    if (isPropertyExist) {
      if (Array.isArray(value)) {
        newObject[property] = cleanArray(value);
      } else if (value && typeof value === "object" && value.constructor === Object) {
        newObject[property] = clone(value);
      } else {
        newObject[property] = value;
      }
    }
  }
  return newObject;
}
function lookupGetter(object, prop) {
  while (object !== null) {
    const desc = getOwnPropertyDescriptor(object, prop);
    if (desc) {
      if (desc.get) {
        return unapply(desc.get);
      }
      if (typeof desc.value === "function") {
        return unapply(desc.value);
      }
    }
    object = getPrototypeOf$1(object);
  }
  function fallbackValue() {
    return null;
  }
  return fallbackValue;
}
const html$1 = freeze(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "search", "section", "select", "shadow", "slot", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]);
const svg$1 = freeze(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "enterkeyhint", "exportparts", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "inputmode", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "part", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"]);
const svgFilters = freeze(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"]);
const svgDisallowed = freeze(["animate", "color-profile", "cursor", "discard", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"]);
const mathMl$1 = freeze(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover", "mprescripts"]);
const mathMlDisallowed = freeze(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"]);
const text = freeze(["#text"]);
const html = freeze(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "exportparts", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inert", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "part", "pattern", "placeholder", "playsinline", "popover", "popovertarget", "popovertargetaction", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "slot", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "wrap", "xmlns", "slot"]);
const svg = freeze(["accent-height", "accumulate", "additive", "alignment-baseline", "amplitude", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dur", "edgemode", "elevation", "end", "exponent", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "intercept", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "mask-type", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "slope", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "tablevalues", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"]);
const mathMl = freeze(["accent", "accentunder", "align", "bevelled", "close", "columnsalign", "columnlines", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lspace", "lquote", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"]);
const xml = freeze(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]);
const MUSTACHE_EXPR = seal(/\{\{[\w\W]*|[\w\W]*\}\}/gm);
const ERB_EXPR = seal(/<%[\w\W]*|[\w\W]*%>/gm);
const TMPLIT_EXPR = seal(/\$\{[\w\W]*/gm);
const DATA_ATTR = seal(/^data-[\-\w.\u00B7-\uFFFF]+$/);
const ARIA_ATTR = seal(/^aria-[\-\w]+$/);
const IS_ALLOWED_URI = seal(
  /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
  // eslint-disable-line no-useless-escape
);
const IS_SCRIPT_OR_DATA = seal(/^(?:\w+script|data):/i);
const ATTR_WHITESPACE = seal(
  /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g
  // eslint-disable-line no-control-regex
);
const DOCTYPE_NAME = seal(/^html$/i);
const CUSTOM_ELEMENT = seal(/^[a-z][.\w]*(-[.\w]+)+$/i);
var EXPRESSIONS = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  ARIA_ATTR,
  ATTR_WHITESPACE,
  CUSTOM_ELEMENT,
  DATA_ATTR,
  DOCTYPE_NAME,
  ERB_EXPR,
  IS_ALLOWED_URI,
  IS_SCRIPT_OR_DATA,
  MUSTACHE_EXPR,
  TMPLIT_EXPR
});
const NODE_TYPE = {
  element: 1,
  text: 3,
  // Deprecated
  progressingInstruction: 7,
  comment: 8,
  document: 9
};
const getGlobal = function getGlobal2() {
  return typeof window === "undefined" ? null : window;
};
const _createTrustedTypesPolicy = function _createTrustedTypesPolicy2(trustedTypes, purifyHostElement) {
  if (typeof trustedTypes !== "object" || typeof trustedTypes.createPolicy !== "function") {
    return null;
  }
  let suffix = null;
  const ATTR_NAME = "data-tt-policy-suffix";
  if (purifyHostElement && purifyHostElement.hasAttribute(ATTR_NAME)) {
    suffix = purifyHostElement.getAttribute(ATTR_NAME);
  }
  const policyName = "dompurify" + (suffix ? "#" + suffix : "");
  try {
    return trustedTypes.createPolicy(policyName, {
      createHTML(html2) {
        return html2;
      },
      createScriptURL(scriptUrl) {
        return scriptUrl;
      }
    });
  } catch (_) {
    console.warn("TrustedTypes policy " + policyName + " could not be created.");
    return null;
  }
};
const _createHooksMap = function _createHooksMap2() {
  return {
    afterSanitizeAttributes: [],
    afterSanitizeElements: [],
    afterSanitizeShadowDOM: [],
    beforeSanitizeAttributes: [],
    beforeSanitizeElements: [],
    beforeSanitizeShadowDOM: [],
    uponSanitizeAttribute: [],
    uponSanitizeElement: [],
    uponSanitizeShadowNode: []
  };
};
function createDOMPurify() {
  let window2 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : getGlobal();
  const DOMPurify = (root) => createDOMPurify(root);
  DOMPurify.version = "3.3.0";
  DOMPurify.removed = [];
  if (!window2 || !window2.document || window2.document.nodeType !== NODE_TYPE.document || !window2.Element) {
    DOMPurify.isSupported = false;
    return DOMPurify;
  }
  let {
    document: document2
  } = window2;
  const originalDocument = document2;
  const currentScript = originalDocument.currentScript;
  const {
    DocumentFragment,
    HTMLTemplateElement,
    Node,
    Element,
    NodeFilter,
    NamedNodeMap = window2.NamedNodeMap || window2.MozNamedAttrMap,
    HTMLFormElement,
    DOMParser,
    trustedTypes
  } = window2;
  const ElementPrototype = Element.prototype;
  const cloneNode = lookupGetter(ElementPrototype, "cloneNode");
  const remove = lookupGetter(ElementPrototype, "remove");
  const getNextSibling = lookupGetter(ElementPrototype, "nextSibling");
  const getChildNodes = lookupGetter(ElementPrototype, "childNodes");
  const getParentNode = lookupGetter(ElementPrototype, "parentNode");
  if (typeof HTMLTemplateElement === "function") {
    const template = document2.createElement("template");
    if (template.content && template.content.ownerDocument) {
      document2 = template.content.ownerDocument;
    }
  }
  let trustedTypesPolicy;
  let emptyHTML = "";
  const {
    implementation,
    createNodeIterator,
    createDocumentFragment,
    getElementsByTagName
  } = document2;
  const {
    importNode
  } = originalDocument;
  let hooks = _createHooksMap();
  DOMPurify.isSupported = typeof entries === "function" && typeof getParentNode === "function" && implementation && implementation.createHTMLDocument !== void 0;
  const {
    MUSTACHE_EXPR: MUSTACHE_EXPR2,
    ERB_EXPR: ERB_EXPR2,
    TMPLIT_EXPR: TMPLIT_EXPR2,
    DATA_ATTR: DATA_ATTR2,
    ARIA_ATTR: ARIA_ATTR2,
    IS_SCRIPT_OR_DATA: IS_SCRIPT_OR_DATA2,
    ATTR_WHITESPACE: ATTR_WHITESPACE2,
    CUSTOM_ELEMENT: CUSTOM_ELEMENT2
  } = EXPRESSIONS;
  let {
    IS_ALLOWED_URI: IS_ALLOWED_URI$1
  } = EXPRESSIONS;
  let ALLOWED_TAGS = null;
  const DEFAULT_ALLOWED_TAGS = addToSet({}, [...html$1, ...svg$1, ...svgFilters, ...mathMl$1, ...text]);
  let ALLOWED_ATTR = null;
  const DEFAULT_ALLOWED_ATTR = addToSet({}, [...html, ...svg, ...mathMl, ...xml]);
  let CUSTOM_ELEMENT_HANDLING = Object.seal(create(null, {
    tagNameCheck: {
      writable: true,
      configurable: false,
      enumerable: true,
      value: null
    },
    attributeNameCheck: {
      writable: true,
      configurable: false,
      enumerable: true,
      value: null
    },
    allowCustomizedBuiltInElements: {
      writable: true,
      configurable: false,
      enumerable: true,
      value: false
    }
  }));
  let FORBID_TAGS = null;
  let FORBID_ATTR = null;
  const EXTRA_ELEMENT_HANDLING = Object.seal(create(null, {
    tagCheck: {
      writable: true,
      configurable: false,
      enumerable: true,
      value: null
    },
    attributeCheck: {
      writable: true,
      configurable: false,
      enumerable: true,
      value: null
    }
  }));
  let ALLOW_ARIA_ATTR = true;
  let ALLOW_DATA_ATTR = true;
  let ALLOW_UNKNOWN_PROTOCOLS = false;
  let ALLOW_SELF_CLOSE_IN_ATTR = true;
  let SAFE_FOR_TEMPLATES = false;
  let SAFE_FOR_XML = true;
  let WHOLE_DOCUMENT = false;
  let SET_CONFIG = false;
  let FORCE_BODY = false;
  let RETURN_DOM = false;
  let RETURN_DOM_FRAGMENT = false;
  let RETURN_TRUSTED_TYPE = false;
  let SANITIZE_DOM = true;
  let SANITIZE_NAMED_PROPS = false;
  const SANITIZE_NAMED_PROPS_PREFIX = "user-content-";
  let KEEP_CONTENT = true;
  let IN_PLACE = false;
  let USE_PROFILES = {};
  let FORBID_CONTENTS = null;
  const DEFAULT_FORBID_CONTENTS = addToSet({}, ["annotation-xml", "audio", "colgroup", "desc", "foreignobject", "head", "iframe", "math", "mi", "mn", "mo", "ms", "mtext", "noembed", "noframes", "noscript", "plaintext", "script", "style", "svg", "template", "thead", "title", "video", "xmp"]);
  let DATA_URI_TAGS = null;
  const DEFAULT_DATA_URI_TAGS = addToSet({}, ["audio", "video", "img", "source", "image", "track"]);
  let URI_SAFE_ATTRIBUTES = null;
  const DEFAULT_URI_SAFE_ATTRIBUTES = addToSet({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"]);
  const MATHML_NAMESPACE = "http://www.w3.org/1998/Math/MathML";
  const SVG_NAMESPACE = "http://www.w3.org/2000/svg";
  const HTML_NAMESPACE = "http://www.w3.org/1999/xhtml";
  let NAMESPACE = HTML_NAMESPACE;
  let IS_EMPTY_INPUT = false;
  let ALLOWED_NAMESPACES = null;
  const DEFAULT_ALLOWED_NAMESPACES = addToSet({}, [MATHML_NAMESPACE, SVG_NAMESPACE, HTML_NAMESPACE], stringToString);
  let MATHML_TEXT_INTEGRATION_POINTS = addToSet({}, ["mi", "mo", "mn", "ms", "mtext"]);
  let HTML_INTEGRATION_POINTS = addToSet({}, ["annotation-xml"]);
  const COMMON_SVG_AND_HTML_ELEMENTS = addToSet({}, ["title", "style", "font", "a", "script"]);
  let PARSER_MEDIA_TYPE = null;
  const SUPPORTED_PARSER_MEDIA_TYPES = ["application/xhtml+xml", "text/html"];
  const DEFAULT_PARSER_MEDIA_TYPE = "text/html";
  let transformCaseFunc = null;
  let CONFIG = null;
  const formElement = document2.createElement("form");
  const isRegexOrFunction = function isRegexOrFunction2(testValue) {
    return testValue instanceof RegExp || testValue instanceof Function;
  };
  const _parseConfig = function _parseConfig2() {
    let cfg = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    if (CONFIG && CONFIG === cfg) {
      return;
    }
    if (!cfg || typeof cfg !== "object") {
      cfg = {};
    }
    cfg = clone(cfg);
    PARSER_MEDIA_TYPE = // eslint-disable-next-line unicorn/prefer-includes
    SUPPORTED_PARSER_MEDIA_TYPES.indexOf(cfg.PARSER_MEDIA_TYPE) === -1 ? DEFAULT_PARSER_MEDIA_TYPE : cfg.PARSER_MEDIA_TYPE;
    transformCaseFunc = PARSER_MEDIA_TYPE === "application/xhtml+xml" ? stringToString : stringToLowerCase;
    ALLOWED_TAGS = objectHasOwnProperty(cfg, "ALLOWED_TAGS") ? addToSet({}, cfg.ALLOWED_TAGS, transformCaseFunc) : DEFAULT_ALLOWED_TAGS;
    ALLOWED_ATTR = objectHasOwnProperty(cfg, "ALLOWED_ATTR") ? addToSet({}, cfg.ALLOWED_ATTR, transformCaseFunc) : DEFAULT_ALLOWED_ATTR;
    ALLOWED_NAMESPACES = objectHasOwnProperty(cfg, "ALLOWED_NAMESPACES") ? addToSet({}, cfg.ALLOWED_NAMESPACES, stringToString) : DEFAULT_ALLOWED_NAMESPACES;
    URI_SAFE_ATTRIBUTES = objectHasOwnProperty(cfg, "ADD_URI_SAFE_ATTR") ? addToSet(clone(DEFAULT_URI_SAFE_ATTRIBUTES), cfg.ADD_URI_SAFE_ATTR, transformCaseFunc) : DEFAULT_URI_SAFE_ATTRIBUTES;
    DATA_URI_TAGS = objectHasOwnProperty(cfg, "ADD_DATA_URI_TAGS") ? addToSet(clone(DEFAULT_DATA_URI_TAGS), cfg.ADD_DATA_URI_TAGS, transformCaseFunc) : DEFAULT_DATA_URI_TAGS;
    FORBID_CONTENTS = objectHasOwnProperty(cfg, "FORBID_CONTENTS") ? addToSet({}, cfg.FORBID_CONTENTS, transformCaseFunc) : DEFAULT_FORBID_CONTENTS;
    FORBID_TAGS = objectHasOwnProperty(cfg, "FORBID_TAGS") ? addToSet({}, cfg.FORBID_TAGS, transformCaseFunc) : clone({});
    FORBID_ATTR = objectHasOwnProperty(cfg, "FORBID_ATTR") ? addToSet({}, cfg.FORBID_ATTR, transformCaseFunc) : clone({});
    USE_PROFILES = objectHasOwnProperty(cfg, "USE_PROFILES") ? cfg.USE_PROFILES : false;
    ALLOW_ARIA_ATTR = cfg.ALLOW_ARIA_ATTR !== false;
    ALLOW_DATA_ATTR = cfg.ALLOW_DATA_ATTR !== false;
    ALLOW_UNKNOWN_PROTOCOLS = cfg.ALLOW_UNKNOWN_PROTOCOLS || false;
    ALLOW_SELF_CLOSE_IN_ATTR = cfg.ALLOW_SELF_CLOSE_IN_ATTR !== false;
    SAFE_FOR_TEMPLATES = cfg.SAFE_FOR_TEMPLATES || false;
    SAFE_FOR_XML = cfg.SAFE_FOR_XML !== false;
    WHOLE_DOCUMENT = cfg.WHOLE_DOCUMENT || false;
    RETURN_DOM = cfg.RETURN_DOM || false;
    RETURN_DOM_FRAGMENT = cfg.RETURN_DOM_FRAGMENT || false;
    RETURN_TRUSTED_TYPE = cfg.RETURN_TRUSTED_TYPE || false;
    FORCE_BODY = cfg.FORCE_BODY || false;
    SANITIZE_DOM = cfg.SANITIZE_DOM !== false;
    SANITIZE_NAMED_PROPS = cfg.SANITIZE_NAMED_PROPS || false;
    KEEP_CONTENT = cfg.KEEP_CONTENT !== false;
    IN_PLACE = cfg.IN_PLACE || false;
    IS_ALLOWED_URI$1 = cfg.ALLOWED_URI_REGEXP || IS_ALLOWED_URI;
    NAMESPACE = cfg.NAMESPACE || HTML_NAMESPACE;
    MATHML_TEXT_INTEGRATION_POINTS = cfg.MATHML_TEXT_INTEGRATION_POINTS || MATHML_TEXT_INTEGRATION_POINTS;
    HTML_INTEGRATION_POINTS = cfg.HTML_INTEGRATION_POINTS || HTML_INTEGRATION_POINTS;
    CUSTOM_ELEMENT_HANDLING = cfg.CUSTOM_ELEMENT_HANDLING || {};
    if (cfg.CUSTOM_ELEMENT_HANDLING && isRegexOrFunction(cfg.CUSTOM_ELEMENT_HANDLING.tagNameCheck)) {
      CUSTOM_ELEMENT_HANDLING.tagNameCheck = cfg.CUSTOM_ELEMENT_HANDLING.tagNameCheck;
    }
    if (cfg.CUSTOM_ELEMENT_HANDLING && isRegexOrFunction(cfg.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)) {
      CUSTOM_ELEMENT_HANDLING.attributeNameCheck = cfg.CUSTOM_ELEMENT_HANDLING.attributeNameCheck;
    }
    if (cfg.CUSTOM_ELEMENT_HANDLING && typeof cfg.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements === "boolean") {
      CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements = cfg.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements;
    }
    if (SAFE_FOR_TEMPLATES) {
      ALLOW_DATA_ATTR = false;
    }
    if (RETURN_DOM_FRAGMENT) {
      RETURN_DOM = true;
    }
    if (USE_PROFILES) {
      ALLOWED_TAGS = addToSet({}, text);
      ALLOWED_ATTR = [];
      if (USE_PROFILES.html === true) {
        addToSet(ALLOWED_TAGS, html$1);
        addToSet(ALLOWED_ATTR, html);
      }
      if (USE_PROFILES.svg === true) {
        addToSet(ALLOWED_TAGS, svg$1);
        addToSet(ALLOWED_ATTR, svg);
        addToSet(ALLOWED_ATTR, xml);
      }
      if (USE_PROFILES.svgFilters === true) {
        addToSet(ALLOWED_TAGS, svgFilters);
        addToSet(ALLOWED_ATTR, svg);
        addToSet(ALLOWED_ATTR, xml);
      }
      if (USE_PROFILES.mathMl === true) {
        addToSet(ALLOWED_TAGS, mathMl$1);
        addToSet(ALLOWED_ATTR, mathMl);
        addToSet(ALLOWED_ATTR, xml);
      }
    }
    if (cfg.ADD_TAGS) {
      if (typeof cfg.ADD_TAGS === "function") {
        EXTRA_ELEMENT_HANDLING.tagCheck = cfg.ADD_TAGS;
      } else {
        if (ALLOWED_TAGS === DEFAULT_ALLOWED_TAGS) {
          ALLOWED_TAGS = clone(ALLOWED_TAGS);
        }
        addToSet(ALLOWED_TAGS, cfg.ADD_TAGS, transformCaseFunc);
      }
    }
    if (cfg.ADD_ATTR) {
      if (typeof cfg.ADD_ATTR === "function") {
        EXTRA_ELEMENT_HANDLING.attributeCheck = cfg.ADD_ATTR;
      } else {
        if (ALLOWED_ATTR === DEFAULT_ALLOWED_ATTR) {
          ALLOWED_ATTR = clone(ALLOWED_ATTR);
        }
        addToSet(ALLOWED_ATTR, cfg.ADD_ATTR, transformCaseFunc);
      }
    }
    if (cfg.ADD_URI_SAFE_ATTR) {
      addToSet(URI_SAFE_ATTRIBUTES, cfg.ADD_URI_SAFE_ATTR, transformCaseFunc);
    }
    if (cfg.FORBID_CONTENTS) {
      if (FORBID_CONTENTS === DEFAULT_FORBID_CONTENTS) {
        FORBID_CONTENTS = clone(FORBID_CONTENTS);
      }
      addToSet(FORBID_CONTENTS, cfg.FORBID_CONTENTS, transformCaseFunc);
    }
    if (KEEP_CONTENT) {
      ALLOWED_TAGS["#text"] = true;
    }
    if (WHOLE_DOCUMENT) {
      addToSet(ALLOWED_TAGS, ["html", "head", "body"]);
    }
    if (ALLOWED_TAGS.table) {
      addToSet(ALLOWED_TAGS, ["tbody"]);
      delete FORBID_TAGS.tbody;
    }
    if (cfg.TRUSTED_TYPES_POLICY) {
      if (typeof cfg.TRUSTED_TYPES_POLICY.createHTML !== "function") {
        throw typeErrorCreate('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
      }
      if (typeof cfg.TRUSTED_TYPES_POLICY.createScriptURL !== "function") {
        throw typeErrorCreate('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
      }
      trustedTypesPolicy = cfg.TRUSTED_TYPES_POLICY;
      emptyHTML = trustedTypesPolicy.createHTML("");
    } else {
      if (trustedTypesPolicy === void 0) {
        trustedTypesPolicy = _createTrustedTypesPolicy(trustedTypes, currentScript);
      }
      if (trustedTypesPolicy !== null && typeof emptyHTML === "string") {
        emptyHTML = trustedTypesPolicy.createHTML("");
      }
    }
    if (freeze) {
      freeze(cfg);
    }
    CONFIG = cfg;
  };
  const ALL_SVG_TAGS = addToSet({}, [...svg$1, ...svgFilters, ...svgDisallowed]);
  const ALL_MATHML_TAGS = addToSet({}, [...mathMl$1, ...mathMlDisallowed]);
  const _checkValidNamespace = function _checkValidNamespace2(element) {
    let parent = getParentNode(element);
    if (!parent || !parent.tagName) {
      parent = {
        namespaceURI: NAMESPACE,
        tagName: "template"
      };
    }
    const tagName = stringToLowerCase(element.tagName);
    const parentTagName = stringToLowerCase(parent.tagName);
    if (!ALLOWED_NAMESPACES[element.namespaceURI]) {
      return false;
    }
    if (element.namespaceURI === SVG_NAMESPACE) {
      if (parent.namespaceURI === HTML_NAMESPACE) {
        return tagName === "svg";
      }
      if (parent.namespaceURI === MATHML_NAMESPACE) {
        return tagName === "svg" && (parentTagName === "annotation-xml" || MATHML_TEXT_INTEGRATION_POINTS[parentTagName]);
      }
      return Boolean(ALL_SVG_TAGS[tagName]);
    }
    if (element.namespaceURI === MATHML_NAMESPACE) {
      if (parent.namespaceURI === HTML_NAMESPACE) {
        return tagName === "math";
      }
      if (parent.namespaceURI === SVG_NAMESPACE) {
        return tagName === "math" && HTML_INTEGRATION_POINTS[parentTagName];
      }
      return Boolean(ALL_MATHML_TAGS[tagName]);
    }
    if (element.namespaceURI === HTML_NAMESPACE) {
      if (parent.namespaceURI === SVG_NAMESPACE && !HTML_INTEGRATION_POINTS[parentTagName]) {
        return false;
      }
      if (parent.namespaceURI === MATHML_NAMESPACE && !MATHML_TEXT_INTEGRATION_POINTS[parentTagName]) {
        return false;
      }
      return !ALL_MATHML_TAGS[tagName] && (COMMON_SVG_AND_HTML_ELEMENTS[tagName] || !ALL_SVG_TAGS[tagName]);
    }
    if (PARSER_MEDIA_TYPE === "application/xhtml+xml" && ALLOWED_NAMESPACES[element.namespaceURI]) {
      return true;
    }
    return false;
  };
  const _forceRemove = function _forceRemove2(node) {
    arrayPush(DOMPurify.removed, {
      element: node
    });
    try {
      getParentNode(node).removeChild(node);
    } catch (_) {
      remove(node);
    }
  };
  const _removeAttribute = function _removeAttribute2(name, element) {
    try {
      arrayPush(DOMPurify.removed, {
        attribute: element.getAttributeNode(name),
        from: element
      });
    } catch (_) {
      arrayPush(DOMPurify.removed, {
        attribute: null,
        from: element
      });
    }
    element.removeAttribute(name);
    if (name === "is") {
      if (RETURN_DOM || RETURN_DOM_FRAGMENT) {
        try {
          _forceRemove(element);
        } catch (_) {
        }
      } else {
        try {
          element.setAttribute(name, "");
        } catch (_) {
        }
      }
    }
  };
  const _initDocument = function _initDocument2(dirty) {
    let doc = null;
    let leadingWhitespace = null;
    if (FORCE_BODY) {
      dirty = "<remove></remove>" + dirty;
    } else {
      const matches = stringMatch(dirty, /^[\r\n\t ]+/);
      leadingWhitespace = matches && matches[0];
    }
    if (PARSER_MEDIA_TYPE === "application/xhtml+xml" && NAMESPACE === HTML_NAMESPACE) {
      dirty = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + dirty + "</body></html>";
    }
    const dirtyPayload = trustedTypesPolicy ? trustedTypesPolicy.createHTML(dirty) : dirty;
    if (NAMESPACE === HTML_NAMESPACE) {
      try {
        doc = new DOMParser().parseFromString(dirtyPayload, PARSER_MEDIA_TYPE);
      } catch (_) {
      }
    }
    if (!doc || !doc.documentElement) {
      doc = implementation.createDocument(NAMESPACE, "template", null);
      try {
        doc.documentElement.innerHTML = IS_EMPTY_INPUT ? emptyHTML : dirtyPayload;
      } catch (_) {
      }
    }
    const body = doc.body || doc.documentElement;
    if (dirty && leadingWhitespace) {
      body.insertBefore(document2.createTextNode(leadingWhitespace), body.childNodes[0] || null);
    }
    if (NAMESPACE === HTML_NAMESPACE) {
      return getElementsByTagName.call(doc, WHOLE_DOCUMENT ? "html" : "body")[0];
    }
    return WHOLE_DOCUMENT ? doc.documentElement : body;
  };
  const _createNodeIterator = function _createNodeIterator2(root) {
    return createNodeIterator.call(
      root.ownerDocument || root,
      root,
      // eslint-disable-next-line no-bitwise
      NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_COMMENT | NodeFilter.SHOW_TEXT | NodeFilter.SHOW_PROCESSING_INSTRUCTION | NodeFilter.SHOW_CDATA_SECTION,
      null
    );
  };
  const _isClobbered = function _isClobbered2(element) {
    return element instanceof HTMLFormElement && (typeof element.nodeName !== "string" || typeof element.textContent !== "string" || typeof element.removeChild !== "function" || !(element.attributes instanceof NamedNodeMap) || typeof element.removeAttribute !== "function" || typeof element.setAttribute !== "function" || typeof element.namespaceURI !== "string" || typeof element.insertBefore !== "function" || typeof element.hasChildNodes !== "function");
  };
  const _isNode = function _isNode2(value) {
    return typeof Node === "function" && value instanceof Node;
  };
  function _executeHooks(hooks2, currentNode, data) {
    arrayForEach(hooks2, (hook) => {
      hook.call(DOMPurify, currentNode, data, CONFIG);
    });
  }
  const _sanitizeElements = function _sanitizeElements2(currentNode) {
    let content = null;
    _executeHooks(hooks.beforeSanitizeElements, currentNode, null);
    if (_isClobbered(currentNode)) {
      _forceRemove(currentNode);
      return true;
    }
    const tagName = transformCaseFunc(currentNode.nodeName);
    _executeHooks(hooks.uponSanitizeElement, currentNode, {
      tagName,
      allowedTags: ALLOWED_TAGS
    });
    if (SAFE_FOR_XML && currentNode.hasChildNodes() && !_isNode(currentNode.firstElementChild) && regExpTest(/<[/\w!]/g, currentNode.innerHTML) && regExpTest(/<[/\w!]/g, currentNode.textContent)) {
      _forceRemove(currentNode);
      return true;
    }
    if (currentNode.nodeType === NODE_TYPE.progressingInstruction) {
      _forceRemove(currentNode);
      return true;
    }
    if (SAFE_FOR_XML && currentNode.nodeType === NODE_TYPE.comment && regExpTest(/<[/\w]/g, currentNode.data)) {
      _forceRemove(currentNode);
      return true;
    }
    if (!(EXTRA_ELEMENT_HANDLING.tagCheck instanceof Function && EXTRA_ELEMENT_HANDLING.tagCheck(tagName)) && (!ALLOWED_TAGS[tagName] || FORBID_TAGS[tagName])) {
      if (!FORBID_TAGS[tagName] && _isBasicCustomElement(tagName)) {
        if (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, tagName)) {
          return false;
        }
        if (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(tagName)) {
          return false;
        }
      }
      if (KEEP_CONTENT && !FORBID_CONTENTS[tagName]) {
        const parentNode = getParentNode(currentNode) || currentNode.parentNode;
        const childNodes = getChildNodes(currentNode) || currentNode.childNodes;
        if (childNodes && parentNode) {
          const childCount = childNodes.length;
          for (let i = childCount - 1; i >= 0; --i) {
            const childClone = cloneNode(childNodes[i], true);
            childClone.__removalCount = (currentNode.__removalCount || 0) + 1;
            parentNode.insertBefore(childClone, getNextSibling(currentNode));
          }
        }
      }
      _forceRemove(currentNode);
      return true;
    }
    if (currentNode instanceof Element && !_checkValidNamespace(currentNode)) {
      _forceRemove(currentNode);
      return true;
    }
    if ((tagName === "noscript" || tagName === "noembed" || tagName === "noframes") && regExpTest(/<\/no(script|embed|frames)/i, currentNode.innerHTML)) {
      _forceRemove(currentNode);
      return true;
    }
    if (SAFE_FOR_TEMPLATES && currentNode.nodeType === NODE_TYPE.text) {
      content = currentNode.textContent;
      arrayForEach([MUSTACHE_EXPR2, ERB_EXPR2, TMPLIT_EXPR2], (expr) => {
        content = stringReplace(content, expr, " ");
      });
      if (currentNode.textContent !== content) {
        arrayPush(DOMPurify.removed, {
          element: currentNode.cloneNode()
        });
        currentNode.textContent = content;
      }
    }
    _executeHooks(hooks.afterSanitizeElements, currentNode, null);
    return false;
  };
  const _isValidAttribute = function _isValidAttribute2(lcTag, lcName, value) {
    if (SANITIZE_DOM && (lcName === "id" || lcName === "name") && (value in document2 || value in formElement)) {
      return false;
    }
    if (ALLOW_DATA_ATTR && !FORBID_ATTR[lcName] && regExpTest(DATA_ATTR2, lcName)) ;
    else if (ALLOW_ARIA_ATTR && regExpTest(ARIA_ATTR2, lcName)) ;
    else if (EXTRA_ELEMENT_HANDLING.attributeCheck instanceof Function && EXTRA_ELEMENT_HANDLING.attributeCheck(lcName, lcTag)) ;
    else if (!ALLOWED_ATTR[lcName] || FORBID_ATTR[lcName]) {
      if (
        // First condition does a very basic check if a) it's basically a valid custom element tagname AND
        // b) if the tagName passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
        // and c) if the attribute name passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.attributeNameCheck
        _isBasicCustomElement(lcTag) && (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, lcTag) || CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(lcTag)) && (CUSTOM_ELEMENT_HANDLING.attributeNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.attributeNameCheck, lcName) || CUSTOM_ELEMENT_HANDLING.attributeNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.attributeNameCheck(lcName, lcTag)) || // Alternative, second condition checks if it's an `is`-attribute, AND
        // the value passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
        lcName === "is" && CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements && (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, value) || CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(value))
      ) ;
      else {
        return false;
      }
    } else if (URI_SAFE_ATTRIBUTES[lcName]) ;
    else if (regExpTest(IS_ALLOWED_URI$1, stringReplace(value, ATTR_WHITESPACE2, ""))) ;
    else if ((lcName === "src" || lcName === "xlink:href" || lcName === "href") && lcTag !== "script" && stringIndexOf(value, "data:") === 0 && DATA_URI_TAGS[lcTag]) ;
    else if (ALLOW_UNKNOWN_PROTOCOLS && !regExpTest(IS_SCRIPT_OR_DATA2, stringReplace(value, ATTR_WHITESPACE2, ""))) ;
    else if (value) {
      return false;
    } else ;
    return true;
  };
  const _isBasicCustomElement = function _isBasicCustomElement2(tagName) {
    return tagName !== "annotation-xml" && stringMatch(tagName, CUSTOM_ELEMENT2);
  };
  const _sanitizeAttributes = function _sanitizeAttributes2(currentNode) {
    _executeHooks(hooks.beforeSanitizeAttributes, currentNode, null);
    const {
      attributes
    } = currentNode;
    if (!attributes || _isClobbered(currentNode)) {
      return;
    }
    const hookEvent = {
      attrName: "",
      attrValue: "",
      keepAttr: true,
      allowedAttributes: ALLOWED_ATTR,
      forceKeepAttr: void 0
    };
    let l = attributes.length;
    while (l--) {
      const attr = attributes[l];
      const {
        name,
        namespaceURI,
        value: attrValue
      } = attr;
      const lcName = transformCaseFunc(name);
      const initValue = attrValue;
      let value = name === "value" ? initValue : stringTrim(initValue);
      hookEvent.attrName = lcName;
      hookEvent.attrValue = value;
      hookEvent.keepAttr = true;
      hookEvent.forceKeepAttr = void 0;
      _executeHooks(hooks.uponSanitizeAttribute, currentNode, hookEvent);
      value = hookEvent.attrValue;
      if (SANITIZE_NAMED_PROPS && (lcName === "id" || lcName === "name")) {
        _removeAttribute(name, currentNode);
        value = SANITIZE_NAMED_PROPS_PREFIX + value;
      }
      if (SAFE_FOR_XML && regExpTest(/((--!?|])>)|<\/(style|title|textarea)/i, value)) {
        _removeAttribute(name, currentNode);
        continue;
      }
      if (lcName === "attributename" && stringMatch(value, "href")) {
        _removeAttribute(name, currentNode);
        continue;
      }
      if (hookEvent.forceKeepAttr) {
        continue;
      }
      if (!hookEvent.keepAttr) {
        _removeAttribute(name, currentNode);
        continue;
      }
      if (!ALLOW_SELF_CLOSE_IN_ATTR && regExpTest(/\/>/i, value)) {
        _removeAttribute(name, currentNode);
        continue;
      }
      if (SAFE_FOR_TEMPLATES) {
        arrayForEach([MUSTACHE_EXPR2, ERB_EXPR2, TMPLIT_EXPR2], (expr) => {
          value = stringReplace(value, expr, " ");
        });
      }
      const lcTag = transformCaseFunc(currentNode.nodeName);
      if (!_isValidAttribute(lcTag, lcName, value)) {
        _removeAttribute(name, currentNode);
        continue;
      }
      if (trustedTypesPolicy && typeof trustedTypes === "object" && typeof trustedTypes.getAttributeType === "function") {
        if (namespaceURI) ;
        else {
          switch (trustedTypes.getAttributeType(lcTag, lcName)) {
            case "TrustedHTML": {
              value = trustedTypesPolicy.createHTML(value);
              break;
            }
            case "TrustedScriptURL": {
              value = trustedTypesPolicy.createScriptURL(value);
              break;
            }
          }
        }
      }
      if (value !== initValue) {
        try {
          if (namespaceURI) {
            currentNode.setAttributeNS(namespaceURI, name, value);
          } else {
            currentNode.setAttribute(name, value);
          }
          if (_isClobbered(currentNode)) {
            _forceRemove(currentNode);
          } else {
            arrayPop(DOMPurify.removed);
          }
        } catch (_) {
          _removeAttribute(name, currentNode);
        }
      }
    }
    _executeHooks(hooks.afterSanitizeAttributes, currentNode, null);
  };
  const _sanitizeShadowDOM = function _sanitizeShadowDOM2(fragment) {
    let shadowNode = null;
    const shadowIterator = _createNodeIterator(fragment);
    _executeHooks(hooks.beforeSanitizeShadowDOM, fragment, null);
    while (shadowNode = shadowIterator.nextNode()) {
      _executeHooks(hooks.uponSanitizeShadowNode, shadowNode, null);
      _sanitizeElements(shadowNode);
      _sanitizeAttributes(shadowNode);
      if (shadowNode.content instanceof DocumentFragment) {
        _sanitizeShadowDOM2(shadowNode.content);
      }
    }
    _executeHooks(hooks.afterSanitizeShadowDOM, fragment, null);
  };
  DOMPurify.sanitize = function(dirty) {
    let cfg = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    let body = null;
    let importedNode = null;
    let currentNode = null;
    let returnNode = null;
    IS_EMPTY_INPUT = !dirty;
    if (IS_EMPTY_INPUT) {
      dirty = "<!-->";
    }
    if (typeof dirty !== "string" && !_isNode(dirty)) {
      if (typeof dirty.toString === "function") {
        dirty = dirty.toString();
        if (typeof dirty !== "string") {
          throw typeErrorCreate("dirty is not a string, aborting");
        }
      } else {
        throw typeErrorCreate("toString is not a function");
      }
    }
    if (!DOMPurify.isSupported) {
      return dirty;
    }
    if (!SET_CONFIG) {
      _parseConfig(cfg);
    }
    DOMPurify.removed = [];
    if (typeof dirty === "string") {
      IN_PLACE = false;
    }
    if (IN_PLACE) {
      if (dirty.nodeName) {
        const tagName = transformCaseFunc(dirty.nodeName);
        if (!ALLOWED_TAGS[tagName] || FORBID_TAGS[tagName]) {
          throw typeErrorCreate("root node is forbidden and cannot be sanitized in-place");
        }
      }
    } else if (dirty instanceof Node) {
      body = _initDocument("<!---->");
      importedNode = body.ownerDocument.importNode(dirty, true);
      if (importedNode.nodeType === NODE_TYPE.element && importedNode.nodeName === "BODY") {
        body = importedNode;
      } else if (importedNode.nodeName === "HTML") {
        body = importedNode;
      } else {
        body.appendChild(importedNode);
      }
    } else {
      if (!RETURN_DOM && !SAFE_FOR_TEMPLATES && !WHOLE_DOCUMENT && // eslint-disable-next-line unicorn/prefer-includes
      dirty.indexOf("<") === -1) {
        return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? trustedTypesPolicy.createHTML(dirty) : dirty;
      }
      body = _initDocument(dirty);
      if (!body) {
        return RETURN_DOM ? null : RETURN_TRUSTED_TYPE ? emptyHTML : "";
      }
    }
    if (body && FORCE_BODY) {
      _forceRemove(body.firstChild);
    }
    const nodeIterator = _createNodeIterator(IN_PLACE ? dirty : body);
    while (currentNode = nodeIterator.nextNode()) {
      _sanitizeElements(currentNode);
      _sanitizeAttributes(currentNode);
      if (currentNode.content instanceof DocumentFragment) {
        _sanitizeShadowDOM(currentNode.content);
      }
    }
    if (IN_PLACE) {
      return dirty;
    }
    if (RETURN_DOM) {
      if (RETURN_DOM_FRAGMENT) {
        returnNode = createDocumentFragment.call(body.ownerDocument);
        while (body.firstChild) {
          returnNode.appendChild(body.firstChild);
        }
      } else {
        returnNode = body;
      }
      if (ALLOWED_ATTR.shadowroot || ALLOWED_ATTR.shadowrootmode) {
        returnNode = importNode.call(originalDocument, returnNode, true);
      }
      return returnNode;
    }
    let serializedHTML = WHOLE_DOCUMENT ? body.outerHTML : body.innerHTML;
    if (WHOLE_DOCUMENT && ALLOWED_TAGS["!doctype"] && body.ownerDocument && body.ownerDocument.doctype && body.ownerDocument.doctype.name && regExpTest(DOCTYPE_NAME, body.ownerDocument.doctype.name)) {
      serializedHTML = "<!DOCTYPE " + body.ownerDocument.doctype.name + ">\n" + serializedHTML;
    }
    if (SAFE_FOR_TEMPLATES) {
      arrayForEach([MUSTACHE_EXPR2, ERB_EXPR2, TMPLIT_EXPR2], (expr) => {
        serializedHTML = stringReplace(serializedHTML, expr, " ");
      });
    }
    return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? trustedTypesPolicy.createHTML(serializedHTML) : serializedHTML;
  };
  DOMPurify.setConfig = function() {
    let cfg = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    _parseConfig(cfg);
    SET_CONFIG = true;
  };
  DOMPurify.clearConfig = function() {
    CONFIG = null;
    SET_CONFIG = false;
  };
  DOMPurify.isValidAttribute = function(tag, attr, value) {
    if (!CONFIG) {
      _parseConfig({});
    }
    const lcTag = transformCaseFunc(tag);
    const lcName = transformCaseFunc(attr);
    return _isValidAttribute(lcTag, lcName, value);
  };
  DOMPurify.addHook = function(entryPoint, hookFunction) {
    if (typeof hookFunction !== "function") {
      return;
    }
    arrayPush(hooks[entryPoint], hookFunction);
  };
  DOMPurify.removeHook = function(entryPoint, hookFunction) {
    if (hookFunction !== void 0) {
      const index = arrayLastIndexOf(hooks[entryPoint], hookFunction);
      return index === -1 ? void 0 : arraySplice(hooks[entryPoint], index, 1)[0];
    }
    return arrayPop(hooks[entryPoint]);
  };
  DOMPurify.removeHooks = function(entryPoint) {
    hooks[entryPoint] = [];
  };
  DOMPurify.removeAllHooks = function() {
    hooks = _createHooksMap();
  };
  return DOMPurify;
}
var purify = createDOMPurify();
/*!
 * escape-html
 * Copyright(c) 2012-2013 TJ Holowaychuk
 * Copyright(c) 2015 Andreas Lubbe
 * Copyright(c) 2015 Tiancheng "Timothy" Gu
 * MIT Licensed
 */
var escapeHtml_1;
var hasRequiredEscapeHtml;
function requireEscapeHtml() {
  if (hasRequiredEscapeHtml) return escapeHtml_1;
  hasRequiredEscapeHtml = 1;
  var matchHtmlRegExp = /["'&<>]/;
  escapeHtml_1 = escapeHtml2;
  function escapeHtml2(string) {
    var str = "" + string;
    var match = matchHtmlRegExp.exec(str);
    if (!match) {
      return str;
    }
    var escape;
    var html2 = "";
    var index = 0;
    var lastIndex = 0;
    for (index = match.index; index < str.length; index++) {
      switch (str.charCodeAt(index)) {
        case 34:
          escape = "&quot;";
          break;
        case 38:
          escape = "&amp;";
          break;
        case 39:
          escape = "&#39;";
          break;
        case 60:
          escape = "&lt;";
          break;
        case 62:
          escape = "&gt;";
          break;
        default:
          continue;
      }
      if (lastIndex !== index) {
        html2 += str.substring(lastIndex, index);
      }
      lastIndex = index + 1;
      html2 += escape;
    }
    return lastIndex !== index ? html2 + str.substring(lastIndex, index) : html2;
  }
  return escapeHtml_1;
}
var escapeHtmlExports = requireEscapeHtml();
const escapeHtml = /* @__PURE__ */ getDefaultExportFromCjs(escapeHtmlExports);
/*!
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */
function getLocale() {
  return globalThis._nc_l10n_locale;
}
function getCanonicalLocale() {
  return getLocale().replaceAll(/_/g, "-");
}
function getLanguage() {
  return globalThis._nc_l10n_language;
}
globalThis._nc_l10n_locale ??= typeof document !== "undefined" && document.documentElement.dataset.locale || Intl.DateTimeFormat().resolvedOptions().locale.replaceAll(/-/g, "_");
globalThis._nc_l10n_language ??= typeof document !== "undefined" && document.documentElement.lang || (globalThis.navigator?.language ?? "en");
function getAppTranslations(appId) {
  return {
    translations: globalThis._oc_l10n_registry_translations[appId] ?? {},
    pluralFunction: globalThis._oc_l10n_registry_plural_functions[appId] ?? ((number) => number)
  };
}
globalThis._oc_l10n_registry_translations ??= {};
globalThis._oc_l10n_registry_plural_functions ??= {};
/*!
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */
function translate(app, text2, placeholdersOrNumber, optionsOrNumber, options) {
  const vars = typeof placeholdersOrNumber === "object" ? placeholdersOrNumber : void 0;
  const number = typeof optionsOrNumber === "number" ? optionsOrNumber : typeof placeholdersOrNumber === "number" ? placeholdersOrNumber : void 0;
  const allOptions = {
    // defaults
    escape: true,
    sanitize: true,
    // overwrite with user config
    ...typeof options === "object" ? options : typeof optionsOrNumber === "object" ? optionsOrNumber : {}
  };
  const identity = (value) => value;
  const optSanitize = (allOptions.sanitize ? purify.sanitize : identity) || identity;
  const optEscape = allOptions.escape ? escapeHtml : identity;
  const isValidReplacement = (value) => typeof value === "string" || typeof value === "number";
  const _build = (text22, vars2, number2) => {
    return text22.replace(/%n/g, "" + number2).replace(/{([^{}]*)}/g, (match, key) => {
      if (vars2 === void 0 || !(key in vars2)) {
        return optEscape(match);
      }
      const replacement = vars2[key];
      if (isValidReplacement(replacement)) {
        return optEscape(`${replacement}`);
      } else if (typeof replacement === "object" && isValidReplacement(replacement.value)) {
        const escape = replacement.escape !== false ? escapeHtml : identity;
        return escape(`${replacement.value}`);
      } else {
        return optEscape(match);
      }
    });
  };
  const bundle = options?.bundle ?? getAppTranslations(app);
  let translation = bundle.translations[text2] || text2;
  translation = Array.isArray(translation) ? translation[0] : translation;
  if (typeof vars === "object" || number !== void 0) {
    return optSanitize(_build(
      translation,
      vars,
      number
    ));
  } else {
    return optSanitize(translation);
  }
}
function translatePlural(app, textSingular, textPlural, number, vars, options) {
  const identifier = "_" + textSingular + "_::_" + textPlural + "_";
  const bundle = options?.bundle ?? getAppTranslations(app);
  const value = bundle.translations[identifier];
  if (typeof value !== "undefined") {
    const translation = value;
    if (Array.isArray(translation)) {
      const plural = bundle.pluralFunction(number);
      return translate(app, translation[plural], vars, number, options);
    }
  }
  if (number === 1) {
    return translate(app, textSingular, vars, number, options);
  } else {
    return translate(app, textPlural, vars, number, options);
  }
}
function getPlural(number, language = getLanguage()) {
  if (language === "pt-BR") {
    language = "xbr";
  }
  if (language.length > 3) {
    language = language.substring(0, language.lastIndexOf("-"));
  }
  switch (language) {
    case "az":
    case "bo":
    case "dz":
    case "id":
    case "ja":
    case "jv":
    case "ka":
    case "km":
    case "kn":
    case "ko":
    case "ms":
    case "th":
    case "tr":
    case "vi":
    case "zh":
      return 0;
    case "af":
    case "bn":
    case "bg":
    case "ca":
    case "da":
    case "de":
    case "el":
    case "en":
    case "eo":
    case "es":
    case "et":
    case "eu":
    case "fa":
    case "fi":
    case "fo":
    case "fur":
    case "fy":
    case "gl":
    case "gu":
    case "ha":
    case "he":
    case "hu":
    case "is":
    case "it":
    case "ku":
    case "lb":
    case "ml":
    case "mn":
    case "mr":
    case "nah":
    case "nb":
    case "ne":
    case "nl":
    case "nn":
    case "no":
    case "oc":
    case "om":
    case "or":
    case "pa":
    case "pap":
    case "ps":
    case "pt":
    case "so":
    case "sq":
    case "sv":
    case "sw":
    case "ta":
    case "te":
    case "tk":
    case "ur":
    case "zu":
      return number === 1 ? 0 : 1;
    case "am":
    case "bh":
    case "fil":
    case "fr":
    case "gun":
    case "hi":
    case "hy":
    case "ln":
    case "mg":
    case "nso":
    case "xbr":
    case "ti":
    case "wa":
      return number === 0 || number === 1 ? 0 : 1;
    case "be":
    case "bs":
    case "hr":
    case "ru":
    case "sh":
    case "sr":
    case "uk":
      return number % 10 === 1 && number % 100 !== 11 ? 0 : number % 10 >= 2 && number % 10 <= 4 && (number % 100 < 10 || number % 100 >= 20) ? 1 : 2;
    case "cs":
    case "sk":
      return number === 1 ? 0 : number >= 2 && number <= 4 ? 1 : 2;
    case "ga":
      return number === 1 ? 0 : number === 2 ? 1 : 2;
    case "lt":
      return number % 10 === 1 && number % 100 !== 11 ? 0 : number % 10 >= 2 && (number % 100 < 10 || number % 100 >= 20) ? 1 : 2;
    case "sl":
      return number % 100 === 1 ? 0 : number % 100 === 2 ? 1 : number % 100 === 3 || number % 100 === 4 ? 2 : 3;
    case "mk":
      return number % 10 === 1 ? 0 : 1;
    case "mt":
      return number === 1 ? 0 : number === 0 || number % 100 > 1 && number % 100 < 11 ? 1 : number % 100 > 10 && number % 100 < 20 ? 2 : 3;
    case "lv":
      return number === 0 ? 0 : number % 10 === 1 && number % 100 !== 11 ? 1 : 2;
    case "pl":
      return number === 1 ? 0 : number % 10 >= 2 && number % 10 <= 4 && (number % 100 < 12 || number % 100 > 14) ? 1 : 2;
    case "cy":
      return number === 1 ? 0 : number === 2 ? 1 : number === 8 || number === 11 ? 2 : 3;
    case "ro":
      return number === 1 ? 0 : number === 0 || number % 100 > 0 && number % 100 < 20 ? 1 : 2;
    case "ar":
      return number === 0 ? 0 : number === 1 ? 1 : number === 2 ? 2 : number % 100 >= 3 && number % 100 <= 10 ? 3 : number % 100 >= 11 && number % 100 <= 99 ? 4 : 5;
    default:
      return 0;
  }
}
function normalizeComponent(scriptExports, render2, staticRenderFns, functionalTemplate, injectStyles, scopeId, moduleIdentifier, shadowMode) {
  var options = typeof scriptExports === "function" ? scriptExports.options : scriptExports;
  if (render2) {
    options.render = render2;
    options.staticRenderFns = staticRenderFns;
    options._compiled = true;
  }
  if (scopeId) {
    options._scopeId = "data-v-" + scopeId;
  }
  var hook;
  if (injectStyles) {
    hook = injectStyles;
  }
  if (hook) {
    if (options.functional) {
      options._injectStyles = hook;
      var originalRender = options.render;
      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context);
        return originalRender(h, context);
      };
    } else {
      var existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }
  return {
    exports: scriptExports,
    options
  };
}
/*!
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */
class GettextWrapper {
  bundle;
  constructor(pluralFunction) {
    this.bundle = {
      pluralFunction,
      translations: {}
    };
  }
  /**
   * Append new translations to the wrapper.
   *
   * This is useful if translations should be added on demand,
   * e.g. depending on component usage.
   *
   * @param bundle - The new translation bundle to append
   */
  addTranslations(bundle) {
    const dict = Object.values(bundle.translations[""] ?? {}).map(({ msgid, msgid_plural: msgidPlural, msgstr }) => {
      if (msgidPlural !== void 0) {
        return [`_${msgid}_::_${msgidPlural}_`, msgstr];
      }
      return [msgid, msgstr[0]];
    });
    this.bundle.translations = {
      ...this.bundle.translations,
      ...Object.fromEntries(dict)
    };
  }
  /**
   * Get translated string (singular form), optionally with placeholders
   *
   * @param original original string to translate
   * @param placeholders map of placeholder key to value
   */
  gettext(original, placeholders = {}) {
    return translate("", original, placeholders, void 0, { bundle: this.bundle });
  }
  /**
   * Get translated string with plural forms
   *
   * @param singular Singular text form
   * @param plural Plural text form to be used if `count` requires it
   * @param count The number to insert into the text
   * @param placeholders optional map of placeholder key to value
   */
  ngettext(singular, plural, count, placeholders = {}) {
    return translatePlural("", singular, plural, count, placeholders, { bundle: this.bundle });
  }
}
class GettextBuilder {
  debug = false;
  language = "en";
  translations = {};
  setLanguage(language) {
    this.language = language;
    return this;
  }
  /**
   * Try to detect locale from context with `en` as fallback value
   * This only works within a Nextcloud page context.
   *
   * @deprecated use `detectLanguage` instead.
   */
  detectLocale() {
    return this.detectLanguage();
  }
  /**
   * Try to detect locale from context with `en` as fallback value.
   * This only works within a Nextcloud page context.
   */
  detectLanguage() {
    return this.setLanguage(getLanguage().replace("-", "_"));
  }
  /**
   * Register a new translation bundle for a specified language.
   *
   * Please note that existing translations for that language will be overwritten.
   *
   * @param language - Language this is the translation for
   * @param data - The translation bundle
   */
  addTranslation(language, data) {
    this.translations[language] = data;
    return this;
  }
  enableDebugMode() {
    this.debug = true;
    return this;
  }
  build() {
    if (this.debug) {
      console.debug(`Creating gettext instance for language ${this.language}`);
    }
    const wrapper = new GettextWrapper((n2) => getPlural(n2, this.language));
    if (this.language in this.translations) {
      wrapper.addTranslations(this.translations[this.language]);
    }
    return wrapper;
  }
}
function getGettextBuilder() {
  return new GettextBuilder();
}
/*!
 * SPDX-FileCopyrightText: Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
const gettext = getGettextBuilder().detectLanguage().build();
const n = (...args) => gettext.ngettext(...args);
const t = (...args) => gettext.gettext(...args);
function register(...chunks) {
  for (const chunk of chunks) {
    if (chunk.registered) {
      continue;
    }
    for (const { l: language, t: translations } of chunk) {
      if (language !== getLanguage() || !translations) {
        continue;
      }
      const decompressed = Object.fromEntries(Object.entries(translations).map(([id, value]) => [
        id,
        {
          msgid: id,
          msgid_plural: value.p,
          msgstr: value.v
        }
      ]));
      gettext.addTranslations({
        translations: {
          "": decompressed
        }
      });
    }
    chunk.registered = true;
  }
}
const t0 = [{ "l": "ar", "t": { "{tag} (restricted)": { "v": ["{tag} (مقيد)"] }, "Select a tag": { "v": ["اختر وسم"] } } }, { "l": "ast", "t": { "{tag} (restricted)": { "v": ["{tag} (restrinxóse)"] }, "Select a tag": { "v": ["Seleicionar una etiqueta"] } } }, { "l": "br", "t": { "{tag} (restricted)": { "v": ["{tag} (bevennet)"] }, "Select a tag": { "v": ["Choaz ur c'hlav"] } } }, { "l": "ca", "t": { "{tag} (restricted)": { "v": ["{tag} (restringit)"] }, "Select a tag": { "v": ["Seleccioneu una etiqueta"] } } }, { "l": "cs", "t": { "{tag} (restricted)": { "v": ["{tag} (omezené)"] }, "Select a tag": { "v": ["Vybrat štítek"] } } }, { "l": "cs-CZ", "t": { "{tag} (restricted)": { "v": ["{tag} (omezené)"] }, "Select a tag": { "v": ["Vybrat štítek"] } } }, { "l": "da", "t": { "{tag} (restricted)": { "v": ["{tag} (begrænset)"] }, "Select a tag": { "v": ["Vælg et mærke"] } } }, { "l": "de", "t": { "{tag} (restricted)": { "v": ["{tag} (eingeschränkt)"] }, "Select a tag": { "v": ["Schlagwort auswählen"] } } }, { "l": "de-DE", "t": { "{tag} (restricted)": { "v": ["{tag} (eingeschränkt)"] }, "Select a tag": { "v": ["Schlagwort auswählen"] } } }, { "l": "el", "t": { "{tag} (restricted)": { "v": ["{tag} (περιορισμένο)"] }, "Select a tag": { "v": ["Επιλογή ετικέτας"] } } }, { "l": "en-GB", "t": { "{tag} (restricted)": { "v": ["{tag} (restricted)"] }, "Select a tag": { "v": ["Select a tag"] } } }, { "l": "eo", "t": { "{tag} (restricted)": { "v": ["{tag} (limigita)"] }, "Select a tag": { "v": ["Elektu etikedon"] } } }, { "l": "es", "t": { "{tag} (restricted)": { "v": ["{tag} (restringido)"] }, "Select a tag": { "v": ["Seleccione una etiqueta"] } } }, { "l": "es-AR", "t": { "{tag} (restricted)": { "v": ["{tag} (restringido)"] }, "Select a tag": { "v": ["Elija una etiqueta"] } } }, { "l": "es-EC", "t": { "{tag} (restricted)": { "v": ["{tag} (restricted)"] }, "Select a tag": { "v": ["Seleccionar una etiqueta"] } } }, { "l": "es-MX", "t": { "{tag} (restricted)": { "v": ["{tag} (restringido)"] }, "Select a tag": { "v": ["Seleccionar una etiqueta"] } } }, { "l": "et-EE", "t": { "{tag} (restricted)": { "v": ["{tag} (piiratud)"] }, "Select a tag": { "v": ["Vali silt"] } } }, { "l": "eu", "t": { "{tag} (restricted)": { "v": ["{tag} (mugatua)"] }, "Select a tag": { "v": ["Hautatu etiketa bat"] } } }, { "l": "fa", "t": { "{tag} (restricted)": { "v": ["{tag} محدود شده"] }, "Select a tag": { "v": ["انتخاب یک برچسب"] } } }, { "l": "fi", "t": { "{tag} (restricted)": { "v": ["{tag} (rajoitettu)"] }, "Select a tag": { "v": ["Valitse tunniste"] } } }, { "l": "fr", "t": { "{tag} (restricted)": { "v": ["{tag} (restreint)"] }, "Select a tag": { "v": ["Sélectionnez une balise"] } } }, { "l": "ga", "t": { "{tag} (restricted)": { "v": ["{tag} (srianta)"] }, "Select a tag": { "v": ["Roghnaigh clib"] } } }, { "l": "gl", "t": { "{tag} (restricted)": { "v": ["{tag} (restrinxido)"] }, "Select a tag": { "v": ["Seleccione unha etiqueta"] } } }, { "l": "he", "t": { "{tag} (restricted)": { "v": ["{tag} (מוגבל)"] }, "Select a tag": { "v": ["בחירת תגית"] } } }, { "l": "hu", "t": { "{tag} (restricted)": { "v": ["{tag} (korlátozott)"] }, "Select a tag": { "v": ["Válasszon címkét"] } } }, { "l": "id", "t": { "{tag} (restricted)": { "v": ["{tag} (dibatasi)"] }, "Select a tag": { "v": ["Pilih tag"] } } }, { "l": "is", "t": { "{tag} (restricted)": { "v": ["{tag} (takmarkað)"] }, "Select a tag": { "v": ["Veldu merki"] } } }, { "l": "it", "t": { "{tag} (restricted)": { "v": ["{tag} (limitato)"] }, "Select a tag": { "v": ["Seleziona un'etichetta"] } } }, { "l": "ja", "t": { "{tag} (restricted)": { "v": ["{tag} (制限付)"] }, "Select a tag": { "v": ["タグを選択"] } } }, { "l": "ja-JP", "t": { "{tag} (restricted)": { "v": ["{tag} (制限付)"] }, "Select a tag": { "v": ["タグを選択"] } } }, { "l": "ko", "t": { "{tag} (restricted)": { "v": ["{tag}(제한)"] }, "Select a tag": { "v": ["태그 선택"] } } }, { "l": "lt-LT", "t": { "{tag} (restricted)": { "v": ["{tag} (apribota)"] }, "Select a tag": { "v": ["Pasirinkti žymę"] } } }, { "l": "lv", "t": { "{tag} (restricted)": { "v": ["{tag} (ierobežots)"] }, "Select a tag": { "v": ["Izvēlēties birku"] } } }, { "l": "mk", "t": { "{tag} (restricted)": { "v": ["{tag} (ограничено)"] }, "Select a tag": { "v": ["Избери ознака"] } } }, { "l": "my", "t": { "{tag} (restricted)": { "v": ["{tag} (ကန့်သတ်)"] }, "Select a tag": { "v": ["tag ရွေးချယ်ရန်"] } } }, { "l": "nb", "t": { "{tag} (restricted)": { "v": ["{tag} (beskyttet)"] }, "Select a tag": { "v": ["Velg en merkelapp"] } } }, { "l": "nl", "t": { "{tag} (restricted)": { "v": ["{tag} (beperkt)"] }, "Select a tag": { "v": ["Selecteer een label"] } } }, { "l": "oc", "t": { "{tag} (restricted)": { "v": ["{tag} (limit)"] }, "Select a tag": { "v": ["Seleccionar una etiqueta"] } } }, { "l": "pl", "t": { "{tag} (restricted)": { "v": ["{tag} (ograniczona)"] }, "Select a tag": { "v": ["Wybierz etykietę"] } } }, { "l": "pt-BR", "t": { "{tag} (restricted)": { "v": ["{tag} (restrito) "] }, "Select a tag": { "v": ["Selecionar uma etiqueta"] } } }, { "l": "pt-PT", "t": { "{tag} (restricted)": { "v": ["{tag} (restrito)"] }, "Select a tag": { "v": ["Selecionar uma etiqueta"] } } }, { "l": "ro", "t": { "{tag} (restricted)": { "v": ["{tag} (restricționat)"] }, "Select a tag": { "v": ["Selectați o etichetă"] } } }, { "l": "ru", "t": { "{tag} (restricted)": { "v": ["{tag} (ограниченное)"] }, "Select a tag": { "v": ["Выберите метку"] } } }, { "l": "sk", "t": { "{tag} (restricted)": { "v": ["{tag} (obmedzený)"] }, "Select a tag": { "v": ["Vybrať štítok"] } } }, { "l": "sl", "t": { "{tag} (restricted)": { "v": ["{tag} (omejeno)"] }, "Select a tag": { "v": ["Izbor oznake"] } } }, { "l": "sr", "t": { "{tag} (restricted)": { "v": ["{tag} (ограничено)"] }, "Select a tag": { "v": ["Изаберите ознаку"] } } }, { "l": "sv", "t": { "{tag} (restricted)": { "v": ["{tag} (begränsad)"] }, "Select a tag": { "v": ["Välj en tag"] } } }, { "l": "tr", "t": { "{tag} (restricted)": { "v": ["{tag} (kısıtlı)"] }, "Select a tag": { "v": ["Bir etiket seçin"] } } }, { "l": "uk", "t": { "{tag} (restricted)": { "v": ["{tag} (обмежений)"] }, "Select a tag": { "v": ["Виберіть позначку"] } } }, { "l": "uz", "t": { "{tag} (restricted)": { "v": ["{tag} (cheklangan)"] }, "Select a tag": { "v": ["Teg tanlang"] } } }, { "l": "zh-CN", "t": { "{tag} (restricted)": { "v": ["{tag} （受限）"] }, "Select a tag": { "v": ["选择一个标签"] } } }, { "l": "zh-HK", "t": { "{tag} (restricted)": { "v": ["{tag} (受限)"] }, "Select a tag": { "v": ["選擇標籤"] } } }, { "l": "zh-TW", "t": { "{tag} (restricted)": { "v": ["{tag}（受限）"] }, "Select a tag": { "v": ["選擇標籤"] } } }];
const t2 = [{ "l": "ar", "t": { "a few seconds ago": { "v": ["منذ عدة ثوانٍ"] }, "sec. ago": { "v": ["ثانية مضت"] }, "seconds ago": { "v": ["ثوانٍ مضت"] } } }, { "l": "ast", "t": { "a few seconds ago": { "v": ["hai unos segundos"] }, "sec. ago": { "v": ["hai segs"] }, "seconds ago": { "v": ["hai segundos"] } } }, { "l": "br", "t": {} }, { "l": "ca", "t": {} }, { "l": "cs", "t": { "a few seconds ago": { "v": ["před několika sekundami"] }, "sec. ago": { "v": ["sek. před"] }, "seconds ago": { "v": ["sekund předtím"] } } }, { "l": "cs-CZ", "t": { "a few seconds ago": { "v": ["před několika sekundami"] }, "sec. ago": { "v": ["sek. před"] }, "seconds ago": { "v": ["sekund předtím"] } } }, { "l": "da", "t": { "a few seconds ago": { "v": ["et par sekunder siden"] }, "sec. ago": { "v": ["sek. siden"] }, "seconds ago": { "v": ["sekunder siden"] } } }, { "l": "de", "t": { "a few seconds ago": { "v": ["vor ein paar Sekunden"] }, "sec. ago": { "v": ["Sek. zuvor"] }, "seconds ago": { "v": ["Sekunden zuvor"] } } }, { "l": "de-DE", "t": { "a few seconds ago": { "v": ["vor ein paar Sekunden"] }, "sec. ago": { "v": ["Sek. zuvor"] }, "seconds ago": { "v": ["Sekunden zuvor"] } } }, { "l": "el", "t": { "a few seconds ago": { "v": ["πριν λίγα δευτερόλεπτα"] }, "sec. ago": { "v": ["δευτ. πριν"] }, "seconds ago": { "v": ["δευτερόλεπτα πριν"] } } }, { "l": "en-GB", "t": { "a few seconds ago": { "v": ["a few seconds ago"] }, "sec. ago": { "v": ["sec. ago"] }, "seconds ago": { "v": ["seconds ago"] } } }, { "l": "eo", "t": {} }, { "l": "es", "t": { "a few seconds ago": { "v": ["hace unos pocos segundos"] }, "sec. ago": { "v": ["hace segundos"] }, "seconds ago": { "v": ["segundos atrás"] } } }, { "l": "es-AR", "t": { "a few seconds ago": { "v": ["hace unos segundos"] }, "sec. ago": { "v": ["seg. atrás"] }, "seconds ago": { "v": ["segundos atrás"] } } }, { "l": "es-EC", "t": { "a few seconds ago": { "v": ["hace unos segundos"] }, "sec. ago": { "v": ["hace segundos"] }, "seconds ago": { "v": ["Segundos atrás"] } } }, { "l": "es-MX", "t": { "a few seconds ago": { "v": ["hace unos segundos"] }, "sec. ago": { "v": ["seg. atrás"] }, "seconds ago": { "v": ["segundos atrás"] } } }, { "l": "et-EE", "t": { "a few seconds ago": { "v": ["mõni sekund tagasi"] }, "sec. ago": { "v": ["sek. tagasi"] }, "seconds ago": { "v": ["sekundit tagasi"] } } }, { "l": "eu", "t": { "a few seconds ago": { "v": ["duela segundo batzuk"] }, "sec. ago": { "v": ["duela seg."] }, "seconds ago": { "v": ["duela segundo"] } } }, { "l": "fa", "t": { "a few seconds ago": { "v": ["چند ثانیه پیش"] }, "sec. ago": { "v": ["چند ثانیه پیش"] }, "seconds ago": { "v": ["چند ثانیه پیش"] } } }, { "l": "fi", "t": { "a few seconds ago": { "v": ["muutamia sekunteja sitten"] }, "sec. ago": { "v": ["sek. sitten"] }, "seconds ago": { "v": ["sekunteja sitten"] } } }, { "l": "fr", "t": { "a few seconds ago": { "v": ["il y a quelques instants"] }, "sec. ago": { "v": ["il y a sec."] }, "seconds ago": { "v": ["il y a quelques secondes"] } } }, { "l": "ga", "t": { "a few seconds ago": { "v": ["cúpla soicind ó shin"] }, "sec. ago": { "v": ["soic. ó shin"] }, "seconds ago": { "v": ["soicind ó shin"] } } }, { "l": "gl", "t": { "a few seconds ago": { "v": ["hai uns segundos"] }, "sec. ago": { "v": ["segs. atrás"] }, "seconds ago": { "v": ["segundos atrás"] } } }, { "l": "he", "t": { "a few seconds ago": { "v": ["לפני מספר שניות"] }, "sec. ago": { "v": ["לפני מספר שניות"] }, "seconds ago": { "v": ["לפני מס׳ שניות"] } } }, { "l": "hu", "t": {} }, { "l": "id", "t": { "a few seconds ago": { "v": ["beberapa detik yang lalu"] }, "sec. ago": { "v": ["dtk. yang lalu"] }, "seconds ago": { "v": ["beberapa detik lalu"] } } }, { "l": "is", "t": { "a few seconds ago": { "v": ["fyrir örfáum sekúndum síðan"] }, "sec. ago": { "v": ["sek. síðan"] }, "seconds ago": { "v": ["sekúndum síðan"] } } }, { "l": "it", "t": { "a few seconds ago": { "v": ["pochi secondi fa"] }, "sec. ago": { "v": ["sec. fa"] }, "seconds ago": { "v": ["secondi fa"] } } }, { "l": "ja", "t": { "a few seconds ago": { "v": ["数秒前"] }, "sec. ago": { "v": ["秒前"] }, "seconds ago": { "v": ["数秒前"] } } }, { "l": "ja-JP", "t": { "a few seconds ago": { "v": ["数秒前"] }, "sec. ago": { "v": ["秒前"] }, "seconds ago": { "v": ["数秒前"] } } }, { "l": "ko", "t": { "a few seconds ago": { "v": ["방금 전"] }, "sec. ago": { "v": ["몇 초 전"] }, "seconds ago": { "v": ["초 전"] } } }, { "l": "lt-LT", "t": {} }, { "l": "lv", "t": {} }, { "l": "mk", "t": {} }, { "l": "my", "t": {} }, { "l": "nb", "t": { "a few seconds ago": { "v": ["noen få sekunder siden"] }, "sec. ago": { "v": ["sek. siden"] }, "seconds ago": { "v": ["sekunder siden"] } } }, { "l": "nl", "t": { "a few seconds ago": { "v": ["enkele seconden terug"] }, "sec. ago": { "v": ["sec. geleden"] }, "seconds ago": { "v": ["seconden geleden"] } } }, { "l": "oc", "t": {} }, { "l": "pl", "t": { "a few seconds ago": { "v": ["kilka sekund temu"] }, "sec. ago": { "v": ["sek. temu"] }, "seconds ago": { "v": ["sekund temu"] } } }, { "l": "pt-BR", "t": { "a few seconds ago": { "v": ["alguns segundos atrás"] }, "sec. ago": { "v": ["seg. atrás"] }, "seconds ago": { "v": ["segundos atrás"] } } }, { "l": "pt-PT", "t": { "a few seconds ago": { "v": ["há alguns segundos"] }, "sec. ago": { "v": ["seg. atrás"] }, "seconds ago": { "v": ["segundos atrás"] } } }, { "l": "ro", "t": { "a few seconds ago": { "v": ["acum câteva secunde"] }, "sec. ago": { "v": ["sec. în urmă"] }, "seconds ago": { "v": ["secunde în urmă"] } } }, { "l": "ru", "t": { "a few seconds ago": { "v": ["несколько секунд назад"] }, "sec. ago": { "v": ["сек. назад"] }, "seconds ago": { "v": ["секунд назад"] } } }, { "l": "sk", "t": { "a few seconds ago": { "v": ["pred chvíľou"] }, "sec. ago": { "v": ["pred pár sekundami"] }, "seconds ago": { "v": ["pred sekundami"] } } }, { "l": "sl", "t": {} }, { "l": "sr", "t": { "a few seconds ago": { "v": ["пре неколико секунди"] }, "sec. ago": { "v": ["сек. раније"] }, "seconds ago": { "v": ["секунди раније"] } } }, { "l": "sv", "t": { "a few seconds ago": { "v": ["några sekunder sedan"] }, "sec. ago": { "v": ["sek. sedan"] }, "seconds ago": { "v": ["sekunder sedan"] } } }, { "l": "tr", "t": { "a few seconds ago": { "v": ["birkaç saniye önce"] }, "sec. ago": { "v": ["sn. önce"] }, "seconds ago": { "v": ["saniye önce"] } } }, { "l": "uk", "t": { "a few seconds ago": { "v": ["декілька секунд тому"] }, "sec. ago": { "v": ["с тому"] }, "seconds ago": { "v": ["с тому"] } } }, { "l": "uz", "t": { "a few seconds ago": { "v": ["bir necha soniya oldin"] }, "sec. ago": { "v": ["sek. oldin"] }, "seconds ago": { "v": ["soniyalar oldin"] } } }, { "l": "zh-CN", "t": { "a few seconds ago": { "v": ["几秒前"] }, "sec. ago": { "v": ["几秒前"] }, "seconds ago": { "v": ["几秒前"] } } }, { "l": "zh-HK", "t": { "a few seconds ago": { "v": ["幾秒前"] }, "sec. ago": { "v": ["秒前"] }, "seconds ago": { "v": ["秒前"] } } }, { "l": "zh-TW", "t": { "a few seconds ago": { "v": ["幾秒前"] }, "sec. ago": { "v": ["秒前"] }, "seconds ago": { "v": ["秒前"] } } }];
const t3 = [{ "l": "ar", "t": { "Acapulco": { "v": ["بازلائي مطفي"] }, "Blue Violet": { "v": ["بنفسجي مشعشع"] }, "Boston Blue": { "v": ["سماوي مطفي"] }, "Deluge": { "v": ["بنفسجي مطفي"] }, "Feldspar": { "v": ["وردي صخري"] }, "Gold": { "v": ["ذهبي"] }, "Mariner": { "v": ["أزرق بحري"] }, "Nextcloud blue": { "v": ["أزرق نكست كلاود"] }, "Olivine": { "v": ["زيتي"] }, "Purple": { "v": ["بنفسجي"] }, "Rosy brown": { "v": ["بُنِّي زهري"] }, "Whiskey": { "v": ["نبيذي"] } } }, { "l": "ast", "t": { "Acapulco": { "v": ["Acapulcu"] }, "Blue Violet": { "v": ["Viola azulao"] }, "Boston Blue": { "v": ["Azul Boston"] }, "Deluge": { "v": ["Deluge"] }, "Feldspar": { "v": ["Feldspar"] }, "Gold": { "v": ["Oru"] }, "Mariner": { "v": ["Marineru"] }, "Nextcloud blue": { "v": ["Nextcloud azul"] }, "Olivine": { "v": ["Olivina"] }, "Purple": { "v": ["Moráu"] }, "Rosy brown": { "v": ["Marrón arrosao"] }, "Whiskey": { "v": ["Whiskey"] } } }, { "l": "br", "t": {} }, { "l": "ca", "t": {} }, { "l": "cs", "t": { "Acapulco": { "v": ["Akapulko"] }, "Blue Violet": { "v": ["Modrofialová"] }, "Boston Blue": { "v": ["Bostonská modrá"] }, "Deluge": { "v": ["Deluge"] }, "Feldspar": { "v": ["Živicová"] }, "Gold": { "v": ["Zlatá"] }, "Mariner": { "v": ["Námořnická"] }, "Nextcloud blue": { "v": ["Nextcloud modrá"] }, "Olivine": { "v": ["Olivínová"] }, "Purple": { "v": ["Fialová"] }, "Rosy brown": { "v": ["Růžovohnědá"] }, "Whiskey": { "v": ["Whisky"] } } }, { "l": "cs-CZ", "t": { "Acapulco": { "v": ["Akapulko"] }, "Blue Violet": { "v": ["Modrofialová"] }, "Boston Blue": { "v": ["Bostonská modrá"] }, "Deluge": { "v": ["Deluge"] }, "Feldspar": { "v": ["Živicová"] }, "Gold": { "v": ["Zlatá"] }, "Mariner": { "v": ["Námořnická"] }, "Nextcloud blue": { "v": ["Nextcloud modrá"] }, "Olivine": { "v": ["Olivínová"] }, "Purple": { "v": ["Fialová"] }, "Rosy brown": { "v": ["Růžovohnědá"] }, "Whiskey": { "v": ["Whisky"] } } }, { "l": "da", "t": { "Acapulco": { "v": ["Acapulco"] }, "Blue Violet": { "v": ["Blue Violet"] }, "Boston Blue": { "v": ["Boston Blue"] }, "Deluge": { "v": ["Deluge"] }, "Feldspar": { "v": ["Feldspar"] }, "Gold": { "v": ["Guld"] }, "Mariner": { "v": ["Mariner"] }, "Nextcloud blue": { "v": ["Nextcloud blue"] }, "Olivine": { "v": ["Olivine"] }, "Purple": { "v": ["Lilla"] }, "Rosy brown": { "v": ["Rosy brown"] }, "Whiskey": { "v": ["Whiskey"] } } }, { "l": "de", "t": { "Acapulco": { "v": ["Acapulco"] }, "Blue Violet": { "v": ["Blau Violett"] }, "Boston Blue": { "v": ["Boston-Blau"] }, "Deluge": { "v": ["Sintflut"] }, "Feldspar": { "v": ["Feldspat"] }, "Gold": { "v": ["Gold"] }, "Mariner": { "v": ["Seemann"] }, "Nextcloud blue": { "v": ["Nextcloud Blau"] }, "Olivine": { "v": ["Olivin"] }, "Purple": { "v": ["Lila"] }, "Rosy brown": { "v": ["Rosiges Braun"] }, "Whiskey": { "v": ["Whiskey"] } } }, { "l": "de-DE", "t": { "Acapulco": { "v": ["Acapulco"] }, "Blue Violet": { "v": ["Blau Violett"] }, "Boston Blue": { "v": ["Boston-Blau"] }, "Deluge": { "v": ["Sintflut"] }, "Feldspar": { "v": ["Feldspat"] }, "Gold": { "v": ["Gold"] }, "Mariner": { "v": ["Seemann"] }, "Nextcloud blue": { "v": ["Nextcloud Blau"] }, "Olivine": { "v": ["Olivin"] }, "Purple": { "v": ["Lila"] }, "Rosy brown": { "v": ["Rosiges Braun"] }, "Whiskey": { "v": ["Whiskey"] } } }, { "l": "el", "t": { "Acapulco": { "v": ["Ακαπούλκο"] }, "Blue Violet": { "v": ["Μπλε Βιολέτ"] }, "Boston Blue": { "v": ["Μπλε Βοστώνης"] }, "Deluge": { "v": ["Deluge"] }, "Feldspar": { "v": ["Feldspar"] }, "Gold": { "v": ["Χρυσό"] }, "Mariner": { "v": ["Mariner"] }, "Nextcloud blue": { "v": ["Μπλε Nextcloud"] }, "Olivine": { "v": ["Olivine"] }, "Purple": { "v": ["Μωβ"] }, "Rosy brown": { "v": ["Ροζ καφέ"] }, "Whiskey": { "v": ["Ουίσκι"] } } }, { "l": "en-GB", "t": { "Acapulco": { "v": ["Acapulco"] }, "Blue Violet": { "v": ["Blue Violet"] }, "Boston Blue": { "v": ["Boston Blue"] }, "Deluge": { "v": ["Deluge"] }, "Feldspar": { "v": ["Feldspar"] }, "Gold": { "v": ["Gold"] }, "Mariner": { "v": ["Mariner"] }, "Nextcloud blue": { "v": ["Nextcloud blue"] }, "Olivine": { "v": ["Olivine"] }, "Purple": { "v": ["Purple"] }, "Rosy brown": { "v": ["Rosy brown"] }, "Whiskey": { "v": ["Whiskey"] } } }, { "l": "eo", "t": {} }, { "l": "es", "t": { "Acapulco": { "v": ["Acapulco"] }, "Blue Violet": { "v": ["Violeta Azul"] }, "Boston Blue": { "v": ["Azul Boston"] }, "Deluge": { "v": ["Diluvio"] }, "Feldspar": { "v": ["Feldespato"] }, "Gold": { "v": ["Oro"] }, "Mariner": { "v": ["Marinero"] }, "Nextcloud blue": { "v": ["Azul Nextcloud"] }, "Olivine": { "v": ["Olivino"] }, "Purple": { "v": ["Púrpura"] }, "Rosy brown": { "v": ["Marrón rosáceo"] }, "Whiskey": { "v": ["Whiskey"] } } }, { "l": "es-AR", "t": { "Acapulco": { "v": ["Acapulco"] }, "Blue Violet": { "v": ["Violeta Azul"] }, "Boston Blue": { "v": ["Azul Boston"] }, "Deluge": { "v": ["Diluvio"] }, "Feldspar": { "v": ["Feldespato"] }, "Gold": { "v": ["Oro"] }, "Mariner": { "v": ["Marinero"] }, "Nextcloud blue": { "v": ["Azul Nextcloud"] }, "Olivine": { "v": ["Olivino"] }, "Purple": { "v": ["Púrpura"] }, "Rosy brown": { "v": ["Marrón rosáceo"] }, "Whiskey": { "v": ["Whiskey"] } } }, { "l": "es-EC", "t": {} }, { "l": "es-MX", "t": { "Acapulco": { "v": ["Acapulco"] }, "Blue Violet": { "v": ["Violeta Azul"] }, "Boston Blue": { "v": ["Azul Boston"] }, "Deluge": { "v": ["Diluvio"] }, "Feldspar": { "v": ["Feldespato"] }, "Gold": { "v": ["Oro"] }, "Mariner": { "v": ["Marinero"] }, "Nextcloud blue": { "v": ["Azul Nextcloud"] }, "Olivine": { "v": ["Olivino"] }, "Purple": { "v": ["Púrpura"] }, "Rosy brown": { "v": ["Marrón rosáceo"] }, "Whiskey": { "v": ["Whiskey"] } } }, { "l": "et-EE", "t": { "Acapulco": { "v": ["Acapulco meresinine"] }, "Blue Violet": { "v": ["Sinakasvioletne"] }, "Boston Blue": { "v": ["Bostoni rohekassinine"] }, "Deluge": { "v": ["Tulvavee lilla"] }, "Feldspar": { "v": ["Põlevkivipruun"] }, "Gold": { "v": ["Kuldne"] }, "Mariner": { "v": ["Meresinine"] }, "Nextcloud blue": { "v": ["Nextcloudi sinine"] }, "Olivine": { "v": ["Oliiviroheline"] }, "Purple": { "v": ["Purpurpunane"] }, "Rosy brown": { "v": ["Roosikarva pruun"] }, "Whiskey": { "v": ["Viskikarva kollakaspruun"] } } }, { "l": "eu", "t": {} }, { "l": "fa", "t": { "Acapulco": { "v": ["آکاپولکو"] }, "Blue Violet": { "v": ["بنفش آبی"] }, "Boston Blue": { "v": ["آبی بوستونی"] }, "Deluge": { "v": ["سیل"] }, "Feldspar": { "v": ["فلدسپات"] }, "Gold": { "v": ["طلا"] }, "Mariner": { "v": ["مارینر"] }, "Nextcloud blue": { "v": ["نکس کلود آبی"] }, "Olivine": { "v": ["الیوین"] }, "Purple": { "v": ["بنفش"] }, "Rosy brown": { "v": ["قهوه‌ای رز"] }, "Whiskey": { "v": ["ویسکی"] } } }, { "l": "fi", "t": { "Acapulco": { "v": ["Acapulco"] }, "Blue Violet": { "v": ["Sinivioletti"] }, "Boston Blue": { "v": ["Bostoninsininen"] }, "Deluge": { "v": ["Tulva"] }, "Feldspar": { "v": ["Feldspar"] }, "Gold": { "v": ["Kulta"] }, "Mariner": { "v": ["Merenkulkija"] }, "Nextcloud blue": { "v": ["Nextcloudin sininen"] }, "Olivine": { "v": ["Oliviini"] }, "Purple": { "v": ["Purppura"] }, "Rosy brown": { "v": ["Ruusunruskea"] }, "Whiskey": { "v": ["Viski"] } } }, { "l": "fr", "t": { "Acapulco": { "v": ["Acapulco"] }, "Blue Violet": { "v": ["Bleu violet"] }, "Boston Blue": { "v": ["Bleu de Boston"] }, "Deluge": { "v": ["Deluge"] }, "Feldspar": { "v": ["Feldspar"] }, "Gold": { "v": ["Doré"] }, "Mariner": { "v": ["Mariner"] }, "Nextcloud blue": { "v": ["Bleu Nextcloud"] }, "Olivine": { "v": ["Olivine"] }, "Purple": { "v": ["Violet"] }, "Rosy brown": { "v": ["Brun rosé"] }, "Whiskey": { "v": ["Whiskey"] } } }, { "l": "ga", "t": { "Acapulco": { "v": ["Acapulco"] }, "Blue Violet": { "v": ["Gorm Violet"] }, "Boston Blue": { "v": ["Bostún Gorm"] }, "Deluge": { "v": ["Díle"] }, "Feldspar": { "v": ["Feldspar"] }, "Gold": { "v": ["Óir"] }, "Mariner": { "v": ["Mairnéalach"] }, "Nextcloud blue": { "v": ["Nextcloud gorm"] }, "Olivine": { "v": ["Olaivín"] }, "Purple": { "v": ["Corcra"] }, "Rosy brown": { "v": ["Rosach donn"] }, "Whiskey": { "v": ["Fuisce"] } } }, { "l": "gl", "t": { "Acapulco": { "v": ["Acapulco"] }, "Blue Violet": { "v": ["Azul violeta"] }, "Boston Blue": { "v": ["Azul Boston"] }, "Deluge": { "v": ["Diluvio"] }, "Feldspar": { "v": ["Feldespato"] }, "Gold": { "v": ["Ouro"] }, "Mariner": { "v": ["Marino"] }, "Nextcloud blue": { "v": ["Nextcloud azul"] }, "Olivine": { "v": ["Olivina"] }, "Purple": { "v": ["Púrpura"] }, "Rosy brown": { "v": ["Pardo rosado"] }, "Whiskey": { "v": ["Whisky"] } } }, { "l": "he", "t": {} }, { "l": "hu", "t": {} }, { "l": "id", "t": { "Gold": { "v": ["Emas"] }, "Nextcloud blue": { "v": ["Biru Nextcloud"] }, "Purple": { "v": ["Ungu"] } } }, { "l": "is", "t": { "Acapulco": { "v": ["Acapulco"] }, "Blue Violet": { "v": ["Bláklukka"] }, "Boston Blue": { "v": ["Bostonblátt"] }, "Deluge": { "v": ["Fjólublátt"] }, "Feldspar": { "v": ["Feldspat"] }, "Gold": { "v": ["Gull"] }, "Mariner": { "v": ["Sjóarablátt"] }, "Nextcloud blue": { "v": ["Nextcloud blátt"] }, "Olivine": { "v": ["Ólivín"] }, "Purple": { "v": ["Purpurablátt"] }, "Rosy brown": { "v": ["Rósabrúnt"] }, "Whiskey": { "v": ["Viský"] } } }, { "l": "it", "t": { "Gold": { "v": ["Oro"] }, "Nextcloud blue": { "v": ["Nextcloud blue"] }, "Purple": { "v": ["Viola"] } } }, { "l": "ja", "t": { "Acapulco": { "v": ["アカプルコ"] }, "Blue Violet": { "v": ["ブルーバイオレット"] }, "Boston Blue": { "v": ["ボストンブルー"] }, "Deluge": { "v": ["豪雨"] }, "Feldspar": { "v": ["長石"] }, "Gold": { "v": ["黄金"] }, "Mariner": { "v": ["船乗り"] }, "Nextcloud blue": { "v": ["ネクストクラウド・ブルー"] }, "Olivine": { "v": ["カンラン石"] }, "Purple": { "v": ["紫色"] }, "Rosy brown": { "v": ["バラ色"] }, "Whiskey": { "v": ["ウイスキー"] } } }, { "l": "ja-JP", "t": { "Acapulco": { "v": ["アカプルコ"] }, "Blue Violet": { "v": ["ブルーバイオレット"] }, "Boston Blue": { "v": ["ボストンブルー"] }, "Deluge": { "v": ["豪雨"] }, "Feldspar": { "v": ["長石"] }, "Gold": { "v": ["黄金"] }, "Mariner": { "v": ["船乗り"] }, "Nextcloud blue": { "v": ["ネクストクラウド・ブルー"] }, "Olivine": { "v": ["カンラン石"] }, "Purple": { "v": ["紫色"] }, "Rosy brown": { "v": ["バラ色"] }, "Whiskey": { "v": ["ウイスキー"] } } }, { "l": "ko", "t": { "Acapulco": { "v": ["아카풀코"] }, "Blue Violet": { "v": ["푸른 보라"] }, "Boston Blue": { "v": ["보스턴 블루"] }, "Deluge": { "v": ["폭우"] }, "Feldspar": { "v": ["장석"] }, "Gold": { "v": ["금"] }, "Mariner": { "v": ["뱃사람"] }, "Nextcloud blue": { "v": ["Nextcloud 파랑"] }, "Olivine": { "v": ["감람석"] }, "Purple": { "v": ["보라"] }, "Rosy brown": { "v": ["로지 브라운"] }, "Whiskey": { "v": ["위스키"] } } }, { "l": "lt-LT", "t": {} }, { "l": "lv", "t": {} }, { "l": "mk", "t": {} }, { "l": "my", "t": {} }, { "l": "nb", "t": { "Acapulco": { "v": ["Acapulco"] }, "Blue Violet": { "v": ["Blå fiolett"] }, "Boston Blue": { "v": ["Boston blå"] }, "Deluge": { "v": ["Syndflod"] }, "Feldspar": { "v": ["Feltspat"] }, "Gold": { "v": ["Gull"] }, "Mariner": { "v": ["Mariner"] }, "Nextcloud blue": { "v": ["Nextcloud-blå"] }, "Olivine": { "v": ["Olivin"] }, "Purple": { "v": ["Lilla"] }, "Rosy brown": { "v": ["Rosenrød brun"] }, "Whiskey": { "v": ["Whiskey"] } } }, { "l": "nl", "t": { "Acapulco": { "v": ["Acapulco"] }, "Blue Violet": { "v": ["Blauw Paars"] }, "Boston Blue": { "v": ["Boston Blauw"] }, "Deluge": { "v": ["Deluge"] }, "Feldspar": { "v": ["Veldspaat"] }, "Gold": { "v": ["Goud"] }, "Mariner": { "v": ["Marine blauw"] }, "Nextcloud blue": { "v": ["Nextcloud blauw"] }, "Olivine": { "v": ["Olivijn"] }, "Purple": { "v": ["Paars"] }, "Rosy brown": { "v": ["Rozig bruin"] }, "Whiskey": { "v": ["Whiskey"] } } }, { "l": "oc", "t": {} }, { "l": "pl", "t": { "Acapulco": { "v": ["Acapulco"] }, "Blue Violet": { "v": ["Niebieski fiolet"] }, "Boston Blue": { "v": ["Błękit Bostonu"] }, "Deluge": { "v": ["Potop"] }, "Feldspar": { "v": ["Skaleń"] }, "Gold": { "v": ["Złote"] }, "Mariner": { "v": ["Marynarz"] }, "Nextcloud blue": { "v": ["Niebieskie Nextcloud"] }, "Olivine": { "v": ["Oliwin"] }, "Purple": { "v": ["Fioletowy"] }, "Rosy brown": { "v": ["Różowy brąz"] }, "Whiskey": { "v": ["Whisky"] } } }, { "l": "pt-BR", "t": { "Acapulco": { "v": ["Acapulco"] }, "Blue Violet": { "v": ["Violeta Azul"] }, "Boston Blue": { "v": ["Azul Boston"] }, "Deluge": { "v": ["Dilúvio"] }, "Feldspar": { "v": ["Feldspato"] }, "Gold": { "v": ["Ouro"] }, "Mariner": { "v": ["Marinheiro"] }, "Nextcloud blue": { "v": ["azul Nextcloud"] }, "Olivine": { "v": ["Olivina"] }, "Purple": { "v": ["Roxo"] }, "Rosy brown": { "v": ["Castanho rosado"] }, "Whiskey": { "v": ["Uísque"] } } }, { "l": "pt-PT", "t": { "Acapulco": { "v": ["Acapulco"] }, "Blue Violet": { "v": ["Azul violeta"] }, "Boston Blue": { "v": ["Azul Boston"] }, "Deluge": { "v": ["Deluge"] }, "Feldspar": { "v": ["Feldspar"] }, "Gold": { "v": ["Ouro"] }, "Mariner": { "v": ["Mariner"] }, "Nextcloud blue": { "v": ["Nextcloud azul"] }, "Olivine": { "v": ["Olivine"] }, "Purple": { "v": ["Púrpura"] }, "Rosy brown": { "v": ["Castanho rosado"] }, "Whiskey": { "v": ["Whiskey"] } } }, { "l": "ro", "t": { "Gold": { "v": ["Aur"] }, "Nextcloud blue": { "v": ["Nextcloud albastru"] }, "Purple": { "v": ["Purpuriu"] } } }, { "l": "ru", "t": { "Acapulco": { "v": ["Акапулько"] }, "Blue Violet": { "v": ["Синий фиолет"] }, "Boston Blue": { "v": ["Синий Бостон"] }, "Deluge": { "v": ["Перламутрово-фиолетовый"] }, "Feldspar": { "v": ["Античная латунь"] }, "Gold": { "v": ["Золотой"] }, "Mariner": { "v": ["Морской"] }, "Nextcloud blue": { "v": ["Nextcloud голубой"] }, "Olivine": { "v": [" Оливковый"] }, "Purple": { "v": ["Фиолетовый"] }, "Rosy brown": { "v": ["Розово-коричневый"] }, "Whiskey": { "v": ["Виски"] } } }, { "l": "sk", "t": { "Acapulco": { "v": ["Acapulco"] }, "Blue Violet": { "v": ["Modro fialová"] }, "Boston Blue": { "v": ["Bostonská modrá"] }, "Deluge": { "v": ["Deluge"] }, "Feldspar": { "v": ["Živec"] }, "Gold": { "v": ["Zlatá"] }, "Mariner": { "v": ["Námorník"] }, "Nextcloud blue": { "v": ["Nextcloud modrá"] }, "Olivine": { "v": ["Olivová"] }, "Purple": { "v": ["Fialová"] }, "Rosy brown": { "v": ["Ružovo hnedá"] }, "Whiskey": { "v": ["Whisky"] } } }, { "l": "sl", "t": {} }, { "l": "sr", "t": { "Acapulco": { "v": ["Акапулко"] }, "Blue Violet": { "v": ["Плаво љубичаста"] }, "Boston Blue": { "v": ["Бостон плава"] }, "Deluge": { "v": ["Поплава"] }, "Feldspar": { "v": ["Фелдспар"] }, "Gold": { "v": ["Злато"] }, "Mariner": { "v": ["Морнар"] }, "Nextcloud blue": { "v": ["Nextcloud плава"] }, "Olivine": { "v": ["Маслинаста"] }, "Purple": { "v": ["Пурпурна"] }, "Rosy brown": { "v": ["Роси браон"] }, "Whiskey": { "v": ["Виски"] } } }, { "l": "sv", "t": { "Acapulco": { "v": ["Acapulco"] }, "Blue Violet": { "v": ["Blåviolett"] }, "Boston Blue": { "v": ["Bostonblå"] }, "Deluge": { "v": ["Skyfallsblå"] }, "Feldspar": { "v": ["Feldspat"] }, "Gold": { "v": ["Guld"] }, "Mariner": { "v": ["Marinblå"] }, "Nextcloud blue": { "v": ["Nextcloud-blå"] }, "Olivine": { "v": ["Olivin"] }, "Purple": { "v": ["Lila"] }, "Rosy brown": { "v": ["Rosabrun"] }, "Whiskey": { "v": ["Whisky"] } } }, { "l": "tr", "t": { "Acapulco": { "v": ["Akapulko"] }, "Blue Violet": { "v": ["Mavi mor"] }, "Boston Blue": { "v": ["Boston mavisi"] }, "Deluge": { "v": ["Sel"] }, "Feldspar": { "v": ["Feldispat"] }, "Gold": { "v": ["Altın"] }, "Mariner": { "v": ["Denizci"] }, "Nextcloud blue": { "v": ["Nextcloud mavi"] }, "Olivine": { "v": ["Zeytinlik"] }, "Purple": { "v": ["Mor"] }, "Rosy brown": { "v": ["Kırmızımsı kahverengi"] }, "Whiskey": { "v": ["Viski"] } } }, { "l": "uk", "t": { "Acapulco": { "v": ["Акапулько"] }, "Blue Violet": { "v": ["Блакитна фіалка"] }, "Boston Blue": { "v": ["Бостонський синій"] }, "Deluge": { "v": ["Злива"] }, "Feldspar": { "v": ["Польові шпати"] }, "Gold": { "v": ["Золотий"] }, "Mariner": { "v": ["Морський"] }, "Nextcloud blue": { "v": ["Блакитний Nextcloud"] }, "Olivine": { "v": ["Олива"] }, "Purple": { "v": ["Фіолетовий"] }, "Rosy brown": { "v": ["Темно-рожевий"] }, "Whiskey": { "v": ["Кола"] } } }, { "l": "uz", "t": { "Acapulco": { "v": ["Akapulko"] }, "Blue Violet": { "v": ["Moviy binafsha"] }, "Boston Blue": { "v": ["Boston ko'k"] }, "Deluge": { "v": ["To'fon"] }, "Feldspar": { "v": ["Feldspar"] }, "Gold": { "v": ["Oltin"] }, "Mariner": { "v": ["Dengizchi"] }, "Nextcloud blue": { "v": ["Ko'k Nextcloud "] }, "Olivine": { "v": ["Olivine"] }, "Purple": { "v": ["Binafsha"] }, "Rosy brown": { "v": ["Qizil jigarrang"] }, "Whiskey": { "v": ["Whiskey"] } } }, { "l": "zh-CN", "t": { "Acapulco": { "v": ["Acapulco"] }, "Blue Violet": { "v": ["瓦罗兰特蓝"] }, "Boston Blue": { "v": ["波士顿蓝"] }, "Deluge": { "v": ["洪水色"] }, "Feldspar": { "v": ["长石"] }, "Gold": { "v": ["金色"] }, "Mariner": { "v": ["水手"] }, "Nextcloud blue": { "v": ["Nextcloud 蓝"] }, "Olivine": { "v": ["橄榄石色"] }, "Purple": { "v": ["紫色"] }, "Rosy brown": { "v": ["玫瑰棕色"] }, "Whiskey": { "v": ["威士忌"] } } }, { "l": "zh-HK", "t": { "Acapulco": { "v": ["阿卡普爾科"] }, "Blue Violet": { "v": ["藍紫色"] }, "Boston Blue": { "v": ["波士頓藍"] }, "Deluge": { "v": ["大洪水"] }, "Feldspar": { "v": ["長石"] }, "Gold": { "v": ["Gold"] }, "Mariner": { "v": ["海軍藍"] }, "Nextcloud blue": { "v": ["Nextcloud 藍色"] }, "Olivine": { "v": ["橄欖石色"] }, "Purple": { "v": ["紫色"] }, "Rosy brown": { "v": ["玫瑰棕色"] }, "Whiskey": { "v": ["威士忌"] } } }, { "l": "zh-TW", "t": {} }];
const t4 = [{ "l": "ar", "t": { "Actions": { "v": ["إجراءات"] } } }, { "l": "ast", "t": { "Actions": { "v": ["Aiciones"] } } }, { "l": "br", "t": { "Actions": { "v": ["Oberioù"] } } }, { "l": "ca", "t": { "Actions": { "v": ["Accions"] } } }, { "l": "cs", "t": { "Actions": { "v": ["Akce"] } } }, { "l": "cs-CZ", "t": { "Actions": { "v": ["Akce"] } } }, { "l": "da", "t": { "Actions": { "v": ["Handlinger"] } } }, { "l": "de", "t": { "Actions": { "v": ["Aktionen"] } } }, { "l": "de-DE", "t": { "Actions": { "v": ["Aktionen"] } } }, { "l": "el", "t": { "Actions": { "v": ["Ενέργειες"] } } }, { "l": "en-GB", "t": { "Actions": { "v": ["Actions"] } } }, { "l": "eo", "t": { "Actions": { "v": ["Agoj"] } } }, { "l": "es", "t": { "Actions": { "v": ["Acciones"] } } }, { "l": "es-AR", "t": { "Actions": { "v": ["Acciones"] } } }, { "l": "es-EC", "t": { "Actions": { "v": ["Acciones"] } } }, { "l": "es-MX", "t": { "Actions": { "v": ["Acciones"] } } }, { "l": "et-EE", "t": { "Actions": { "v": ["Tegevus"] } } }, { "l": "eu", "t": { "Actions": { "v": ["Ekintzak"] } } }, { "l": "fa", "t": { "Actions": { "v": ["کنش‌ها"] } } }, { "l": "fi", "t": { "Actions": { "v": ["Toiminnot"] } } }, { "l": "fr", "t": { "Actions": { "v": ["Actions"] } } }, { "l": "ga", "t": { "Actions": { "v": ["Gníomhartha"] } } }, { "l": "gl", "t": { "Actions": { "v": ["Accións"] } } }, { "l": "he", "t": { "Actions": { "v": ["פעולות"] } } }, { "l": "hu", "t": { "Actions": { "v": ["Műveletek"] } } }, { "l": "id", "t": { "Actions": { "v": ["Tindakan"] } } }, { "l": "is", "t": { "Actions": { "v": ["Aðgerðir"] } } }, { "l": "it", "t": { "Actions": { "v": ["Azioni"] } } }, { "l": "ja", "t": { "Actions": { "v": ["操作"] } } }, { "l": "ja-JP", "t": { "Actions": { "v": ["操作"] } } }, { "l": "ko", "t": { "Actions": { "v": ["동작"] } } }, { "l": "lt-LT", "t": { "Actions": { "v": ["Veiksmai"] } } }, { "l": "lv", "t": {} }, { "l": "mk", "t": { "Actions": { "v": ["Акции"] } } }, { "l": "my", "t": { "Actions": { "v": ["လုပ်ဆောင်ချက်များ"] } } }, { "l": "nb", "t": { "Actions": { "v": ["Handlinger"] } } }, { "l": "nl", "t": { "Actions": { "v": ["Acties"] } } }, { "l": "oc", "t": { "Actions": { "v": ["Accions"] } } }, { "l": "pl", "t": { "Actions": { "v": ["Działania"] } } }, { "l": "pt-BR", "t": { "Actions": { "v": ["Ações"] } } }, { "l": "pt-PT", "t": { "Actions": { "v": ["Ações"] } } }, { "l": "ro", "t": { "Actions": { "v": ["Acțiuni"] } } }, { "l": "ru", "t": { "Actions": { "v": ["Действия "] } } }, { "l": "sk", "t": { "Actions": { "v": ["Akcie"] } } }, { "l": "sl", "t": { "Actions": { "v": ["Dejanja"] } } }, { "l": "sr", "t": { "Actions": { "v": ["Радње"] } } }, { "l": "sv", "t": { "Actions": { "v": ["Åtgärder"] } } }, { "l": "tr", "t": { "Actions": { "v": ["İşlemler"] } } }, { "l": "uk", "t": { "Actions": { "v": ["Дії"] } } }, { "l": "uz", "t": { "Actions": { "v": ["Harakatlar"] } } }, { "l": "zh-CN", "t": { "Actions": { "v": ["行为"] } } }, { "l": "zh-HK", "t": { "Actions": { "v": ["動作"] } } }, { "l": "zh-TW", "t": { "Actions": { "v": ["動作"] } } }];
const t5 = [{ "l": "ar", "t": { "Activities": { "v": ["سجل الأنشطة"] }, "Animals & Nature": { "v": ["الحيوانات والطبيعة"] }, "Custom": { "v": ["مُخصَّص"] }, "Dark skin tone": { "v": ["أسمر البُشرة"] }, "Emoji picker": { "v": ["لاقط الإيموجي"] }, "Flags": { "v": ["الأعلام"] }, "Food & Drink": { "v": ["الطعام والشراب"] }, "Frequently used": { "v": ["شائعة الاستعمال"] }, "Light skin tone": { "v": ["فاتح البُشرة"] }, "Medium dark skin tone": { "v": ["بشرة متوسطة الاسمرار"] }, "Medium light skin tone": { "v": ["بشرة متوسطة البياض"] }, "Medium skin tone": { "v": ["بشرة وسطية اللون"] }, "Neutral skin color": { "v": ["لون بُشرة طبيعي"] }, "Objects": { "v": ["أشياء"] }, "People & Body": { "v": ["أشخاص و أجسام"] }, "Pick an emoji": { "v": ["إختَر رمز إيموجي emoji"] }, "Search emoji": { "v": ["البحث عن إيموجي emoji"] }, "Search results": { "v": ["نتائج البحث"] }, "Selected": { "v": ["محدّدة"] }, "Skin tone": { "v": ["لون البُشرة"] }, "Smileys & Emotion": { "v": ["وجوهٌ ضاحكة و مشاعر"] }, "Symbols": { "v": ["رموز"] }, "Travel & Places": { "v": ["سفر و أماكن"] } } }, { "l": "ast", "t": { "Activities": { "v": ["Actividaes"] }, "Animals & Nature": { "v": ["Animales y natura"] }, "Custom": { "v": ["Personalizar"] }, "Dark skin tone": { "v": ["Tonu d'aspeutu escuru"] }, "Emoji picker": { "v": ["Selector de fustaxes"] }, "Flags": { "v": ["Banderes"] }, "Food & Drink": { "v": ["Cómida y bébora"] }, "Frequently used": { "v": ["D'usu frecuente"] }, "Light skin tone": { "v": ["Tonu d'aspeutu claru"] }, "Medium dark skin tone": { "v": ["Tonu d'aspeutu medio escuru"] }, "Medium light skin tone": { "v": ["Tonu d'aspeutu medio claru"] }, "Medium skin tone": { "v": ["Tonu d'aspeutu mediu"] }, "Neutral skin color": { "v": ["Color d'aspeutu neutral"] }, "Objects": { "v": ["Oxetos"] }, "People & Body": { "v": ["Persones y cuerpu"] }, "Pick an emoji": { "v": ["Escueyi un fustaxe"] }, "Search emoji": { "v": ["Buscar nos fustaxes"] }, "Search results": { "v": ["Resultaos de la busca"] }, "Selected": { "v": ["Na seleición"] }, "Skin tone": { "v": ["Tonu d'aspeutu"] }, "Smileys & Emotion": { "v": ["Sorrises y emociones"] }, "Symbols": { "v": ["Símbolos"] }, "Travel & Places": { "v": ["Viaxes y llugares"] } } }, { "l": "br", "t": { "Activities": { "v": ["Oberiantizoù"] }, "Animals & Nature": { "v": ["Loened & Natur"] }, "Custom": { "v": ["Personelañ"] }, "Flags": { "v": ["Bannieloù"] }, "Food & Drink": { "v": ["Boued & Evajoù"] }, "Frequently used": { "v": ["Implijet alies"] }, "Objects": { "v": ["Traoù"] }, "People & Body": { "v": ["Tud & Korf"] }, "Pick an emoji": { "v": ["Choaz un emoji"] }, "Search results": { "v": ["Disoc'hoù an enklask"] }, "Smileys & Emotion": { "v": ["Smileyioù & Fromoù"] }, "Symbols": { "v": ["Arouezioù"] }, "Travel & Places": { "v": ["Beaj & Lec'hioù"] } } }, { "l": "ca", "t": { "Activities": { "v": ["Activitats"] }, "Animals & Nature": { "v": ["Animals i natura"] }, "Custom": { "v": ["Personalitzat"] }, "Flags": { "v": ["Marques"] }, "Food & Drink": { "v": ["Menjar i begudes"] }, "Frequently used": { "v": ["Utilitzats recentment"] }, "Objects": { "v": ["Objectes"] }, "People & Body": { "v": ["Persones i cos"] }, "Pick an emoji": { "v": ["Trieu un emoji"] }, "Search results": { "v": ["Resultats de cerca"] }, "Smileys & Emotion": { "v": ["Cares i emocions"] }, "Symbols": { "v": ["Símbols"] }, "Travel & Places": { "v": ["Viatges i llocs"] } } }, { "l": "cs", "t": { "Activities": { "v": ["Aktivity"] }, "Animals & Nature": { "v": ["Zvířata a příroda"] }, "Custom": { "v": ["Uživatelsky určené"] }, "Dark skin tone": { "v": ["Tmavý tělový tón"] }, "Emoji picker": { "v": ["Výběr emotikon"] }, "Flags": { "v": ["Příznaky"] }, "Food & Drink": { "v": ["Jídlo a pití"] }, "Frequently used": { "v": ["Často používané"] }, "Light skin tone": { "v": ["Světlý tělový tón"] }, "Medium dark skin tone": { "v": ["Středně tmavý tělový tón"] }, "Medium light skin tone": { "v": ["Středně světlý tělový tón"] }, "Medium skin tone": { "v": ["Střední tělový tón"] }, "Neutral skin color": { "v": ["Neutřální tělová barva"] }, "Objects": { "v": ["Objekty"] }, "People & Body": { "v": ["Lidé a tělo"] }, "Pick an emoji": { "v": ["Vybrat emoji"] }, "Search emoji": { "v": ["Hledat emoji"] }, "Search results": { "v": ["Výsledky hledání"] }, "Selected": { "v": ["Vybráno"] }, "Skin tone": { "v": ["Tělový tón"] }, "Smileys & Emotion": { "v": ["Úsměvy a emoce"] }, "Symbols": { "v": ["Symboly"] }, "Travel & Places": { "v": ["Cestování a místa"] } } }, { "l": "cs-CZ", "t": { "Activities": { "v": ["Aktivity"] }, "Animals & Nature": { "v": ["Zvířata a příroda"] }, "Custom": { "v": ["Uživatelsky určené"] }, "Dark skin tone": { "v": ["Tmavý tělový tón"] }, "Emoji picker": { "v": ["Výběr emotikon"] }, "Flags": { "v": ["Příznaky"] }, "Food & Drink": { "v": ["Jídlo a pití"] }, "Frequently used": { "v": ["Často používané"] }, "Light skin tone": { "v": ["Světlý tělový tón"] }, "Medium dark skin tone": { "v": ["Středně tmavý tělový tón"] }, "Medium light skin tone": { "v": ["Středně světlý tělový tón"] }, "Medium skin tone": { "v": ["Střední tělový tón"] }, "Neutral skin color": { "v": ["Neutřální tělová barva"] }, "Objects": { "v": ["Objekty"] }, "People & Body": { "v": ["Lidé a tělo"] }, "Pick an emoji": { "v": ["Vybrat emoji"] }, "Search emoji": { "v": ["Hledat emoji"] }, "Search results": { "v": ["Výsledky hledání"] }, "Selected": { "v": ["Vybráno"] }, "Skin tone": { "v": ["Tělový tón"] }, "Smileys & Emotion": { "v": ["Úsměvy a emoce"] }, "Symbols": { "v": ["Symboly"] }, "Travel & Places": { "v": ["Cestování a místa"] } } }, { "l": "da", "t": { "Activities": { "v": ["Aktiviteter"] }, "Animals & Nature": { "v": ["Dyr & Natur"] }, "Custom": { "v": ["Brugerdefineret"] }, "Dark skin tone": { "v": ["Mørk skin tone"] }, "Emoji picker": { "v": ["Emoji vælger"] }, "Flags": { "v": ["Flag"] }, "Food & Drink": { "v": ["Mad & Drikke"] }, "Frequently used": { "v": ["Ofte brugt"] }, "Light skin tone": { "v": ["Lys skin tone"] }, "Medium dark skin tone": { "v": ["Medium mørk skin tone"] }, "Medium light skin tone": { "v": ["Medium lys skin tone"] }, "Medium skin tone": { "v": ["Medium skin tone"] }, "Neutral skin color": { "v": ["Neutral skin color"] }, "Objects": { "v": ["Objekter"] }, "People & Body": { "v": ["Mennesker & Menneskekroppen"] }, "Pick an emoji": { "v": ["Vælg en emoji"] }, "Search emoji": { "v": ["Søg emoji"] }, "Search results": { "v": ["Søgeresultater"] }, "Selected": { "v": ["Valgt"] }, "Skin tone": { "v": ["Skin tone"] }, "Smileys & Emotion": { "v": ["Smileys & Emotion"] }, "Symbols": { "v": ["Symboler"] }, "Travel & Places": { "v": ["Rejser & Rejsemål"] } } }, { "l": "de", "t": { "Activities": { "v": ["Aktivitäten"] }, "Animals & Nature": { "v": ["Tiere & Natur"] }, "Custom": { "v": ["Benutzerdefiniert"] }, "Dark skin tone": { "v": ["Dunkler Hautfarbton"] }, "Emoji picker": { "v": ["Emoji-Auswahl"] }, "Flags": { "v": ["Flaggen"] }, "Food & Drink": { "v": ["Essen & Trinken"] }, "Frequently used": { "v": ["Häufig verwendet"] }, "Light skin tone": { "v": ["Heller Hautfarbton"] }, "Medium dark skin tone": { "v": ["Mitteldunkler Hautfarbton"] }, "Medium light skin tone": { "v": ["Mittelheller Hautfarbton"] }, "Medium skin tone": { "v": ["Mittlerer Hautfarbton"] }, "Neutral skin color": { "v": ["Neutraler Hautfarbton"] }, "Objects": { "v": ["Objekte"] }, "People & Body": { "v": ["Menschen & Körper"] }, "Pick an emoji": { "v": ["Ein Emoji auswählen"] }, "Search emoji": { "v": ["Emoji suchen"] }, "Search results": { "v": ["Suchergebnisse"] }, "Selected": { "v": ["Ausgewählt"] }, "Skin tone": { "v": ["Hautfarbton"] }, "Smileys & Emotion": { "v": ["Smileys & Emotionen"] }, "Symbols": { "v": ["Symbole"] }, "Travel & Places": { "v": ["Reisen & Orte"] } } }, { "l": "de-DE", "t": { "Activities": { "v": ["Aktivitäten"] }, "Animals & Nature": { "v": ["Tiere & Natur"] }, "Custom": { "v": ["Benutzerdefiniert"] }, "Dark skin tone": { "v": ["Dunkler Hautfarbton"] }, "Emoji picker": { "v": ["Emoji-Auswahl"] }, "Flags": { "v": ["Flaggen"] }, "Food & Drink": { "v": ["Essen & Trinken"] }, "Frequently used": { "v": ["Häufig verwendet"] }, "Light skin tone": { "v": ["Heller Hautfarbton"] }, "Medium dark skin tone": { "v": ["Mitteldunkler Hautfarbton"] }, "Medium light skin tone": { "v": ["Mittelheller Hautfarbton"] }, "Medium skin tone": { "v": ["Mittlerer Hautfarbton"] }, "Neutral skin color": { "v": ["Neutraler Hautfarbton"] }, "Objects": { "v": ["Objekte"] }, "People & Body": { "v": ["Menschen & Körper"] }, "Pick an emoji": { "v": ["Ein Emoji auswählen"] }, "Search emoji": { "v": ["Emoji suchen"] }, "Search results": { "v": ["Suchergebnisse"] }, "Selected": { "v": ["Ausgewählt"] }, "Skin tone": { "v": ["Hautfarbton"] }, "Smileys & Emotion": { "v": ["Smileys & Emotionen"] }, "Symbols": { "v": ["Symbole"] }, "Travel & Places": { "v": ["Reisen & Orte"] } } }, { "l": "el", "t": { "Activities": { "v": ["Δραστηριότητες"] }, "Animals & Nature": { "v": ["Ζώα & Φύση"] }, "Custom": { "v": ["Προσαρμογή"] }, "Dark skin tone": { "v": ["Σκούρο θέμα"] }, "Emoji picker": { "v": ["Επιλογέας emoji"] }, "Flags": { "v": ["Σημαίες"] }, "Food & Drink": { "v": ["Φαγητό & Ποτό"] }, "Frequently used": { "v": ["Συχνά χρησιμοποιούμενο"] }, "Light skin tone": { "v": ["Ανοιχτό θέμα"] }, "Medium dark skin tone": { "v": ["Μέτριο σκούρο θέμα"] }, "Medium light skin tone": { "v": ["Μέτριο ανοιχτό θέμα"] }, "Medium skin tone": { "v": ["Μέτριος τόνος θέματος"] }, "Neutral skin color": { "v": ["Ουδέτερο χρώμα θέματος"] }, "Objects": { "v": ["Αντικείμενα"] }, "People & Body": { "v": ["Άνθρωποι & Σώμα"] }, "Pick an emoji": { "v": ["Επιλέξτε ένα emoji"] }, "Search emoji": { "v": ["Αναζήτηση emoji"] }, "Search results": { "v": ["Αποτελέσματα αναζήτησης"] }, "Selected": { "v": ["Επιλεγμένο"] }, "Skin tone": { "v": ["Τόνος δέρματος"] }, "Smileys & Emotion": { "v": ["Φατσούλες & Συναίσθημα"] }, "Symbols": { "v": ["Σύμβολα"] }, "Travel & Places": { "v": ["Ταξίδια & Τοποθεσίες"] } } }, { "l": "en-GB", "t": { "Activities": { "v": ["Activities"] }, "Animals & Nature": { "v": ["Animals & Nature"] }, "Custom": { "v": ["Custom"] }, "Dark skin tone": { "v": ["Dark skin tone"] }, "Emoji picker": { "v": ["Emoji picker"] }, "Flags": { "v": ["Flags"] }, "Food & Drink": { "v": ["Food & Drink"] }, "Frequently used": { "v": ["Frequently used"] }, "Light skin tone": { "v": ["Light skin tone"] }, "Medium dark skin tone": { "v": ["Medium dark skin tone"] }, "Medium light skin tone": { "v": ["Medium light skin tone"] }, "Medium skin tone": { "v": ["Medium skin tone"] }, "Neutral skin color": { "v": ["Neutral skin colour"] }, "Objects": { "v": ["Objects"] }, "People & Body": { "v": ["People & Body"] }, "Pick an emoji": { "v": ["Pick an emoji"] }, "Search emoji": { "v": ["Search emoji"] }, "Search results": { "v": ["Search results"] }, "Selected": { "v": ["Selected"] }, "Skin tone": { "v": ["Skin tone"] }, "Smileys & Emotion": { "v": ["Smileys & Emotion"] }, "Symbols": { "v": ["Symbols"] }, "Travel & Places": { "v": ["Travel & Places"] } } }, { "l": "eo", "t": { "Activities": { "v": ["Aktiveco"] }, "Animals & Nature": { "v": ["Bestoj & Naturo"] }, "Custom": { "v": ["Propra"] }, "Flags": { "v": ["Flagoj"] }, "Food & Drink": { "v": ["Manĝaĵo & Trinkaĵo"] }, "Frequently used": { "v": ["Ofte uzataj"] }, "Objects": { "v": ["Objektoj"] }, "People & Body": { "v": ["Homoj & Korpo"] }, "Pick an emoji": { "v": ["Elekti emoĝion "] }, "Search results": { "v": ["Serĉrezultoj"] }, "Smileys & Emotion": { "v": ["Ridoj kaj Emocioj"] }, "Symbols": { "v": ["Signoj"] }, "Travel & Places": { "v": ["Vojaĵoj & Lokoj"] } } }, { "l": "es", "t": { "Activities": { "v": ["Actividades"] }, "Animals & Nature": { "v": ["Animales y naturaleza"] }, "Custom": { "v": ["Personalizado"] }, "Dark skin tone": { "v": ["Tono de piel obscuro"] }, "Emoji picker": { "v": ["Selector de emojis"] }, "Flags": { "v": ["Banderas"] }, "Food & Drink": { "v": ["Comida y bebida"] }, "Frequently used": { "v": ["Usado con frecuencia"] }, "Light skin tone": { "v": ["Tono de piel claro"] }, "Medium dark skin tone": { "v": ["Tono de piel medio oscuro"] }, "Medium light skin tone": { "v": ["Tono de piel medio claro"] }, "Medium skin tone": { "v": ["Tono de piel medio"] }, "Neutral skin color": { "v": ["Color de piel neutral"] }, "Objects": { "v": ["Objetos"] }, "People & Body": { "v": ["Personas y Cuerpo"] }, "Pick an emoji": { "v": ["Elegir un emoji"] }, "Search emoji": { "v": ["Buscar emoji"] }, "Search results": { "v": ["Resultados de la búsqueda"] }, "Selected": { "v": ["Seleccionado"] }, "Skin tone": { "v": ["Tono de piel"] }, "Smileys & Emotion": { "v": ["Smileys y emoticonos"] }, "Symbols": { "v": ["Símbolos"] }, "Travel & Places": { "v": ["Viajes y lugares"] } } }, { "l": "es-AR", "t": { "Activities": { "v": ["Actividades"] }, "Animals & Nature": { "v": ["Animales y Naturaleza"] }, "Custom": { "v": ["Personalizado"] }, "Dark skin tone": { "v": ["Tono de piel oscuro"] }, "Emoji picker": { "v": ["Selector de emojis"] }, "Flags": { "v": ["Marcas"] }, "Food & Drink": { "v": ["Comida y Bebida"] }, "Frequently used": { "v": ["Usados frecuentemente"] }, "Light skin tone": { "v": ["Tono de piel claro"] }, "Medium dark skin tone": { "v": ["Tono de piel medio oscuro"] }, "Medium light skin tone": { "v": ["Tono de piel medio claro"] }, "Medium skin tone": { "v": ["Tono de piel medio"] }, "Neutral skin color": { "v": ["Color de piel neutral"] }, "Objects": { "v": ["Objetos"] }, "People & Body": { "v": ["Personas y Cuerpo"] }, "Pick an emoji": { "v": ["Elija un emoji"] }, "Search emoji": { "v": ["Buscar emoji"] }, "Search results": { "v": ["Resultados de la búsqueda"] }, "Selected": { "v": ["Seleccionado"] }, "Skin tone": { "v": ["Tono de piel"] }, "Smileys & Emotion": { "v": ["Caritas y Emociones"] }, "Symbols": { "v": ["Símbolos"] }, "Travel & Places": { "v": ["Viajes y Lugares"] } } }, { "l": "es-EC", "t": { "Activities": { "v": ["Actividades"] }, "Animals & Nature": { "v": ["Animales y Naturaleza"] }, "Custom": { "v": ["Personalizado"] }, "Flags": { "v": ["Marcas"] }, "Food & Drink": { "v": ["Comida y Bebida"] }, "Frequently used": { "v": ["Frecuentemente utilizado"] }, "Objects": { "v": ["Objetos"] }, "People & Body": { "v": ["Personas y Cuerpo"] }, "Pick an emoji": { "v": ["Seleccionar un emoji"] }, "Search emoji": { "v": ["Buscar emoji"] }, "Search results": { "v": ["Resultados de búsqueda"] }, "Smileys & Emotion": { "v": ["Caritas y Emociones"] }, "Symbols": { "v": ["Símbolos"] }, "Travel & Places": { "v": ["Viajes y Lugares"] } } }, { "l": "es-MX", "t": { "Activities": { "v": ["Actividades"] }, "Animals & Nature": { "v": ["Animales y naturaleza"] }, "Custom": { "v": ["Personalizado"] }, "Dark skin tone": { "v": ["Tono de piel oscuro"] }, "Emoji picker": { "v": ["Selector de emojis"] }, "Flags": { "v": ["Banderas"] }, "Food & Drink": { "v": ["Comida y Bebida"] }, "Frequently used": { "v": ["Usado frecuentemente"] }, "Light skin tone": { "v": ["Tono de piel claro"] }, "Medium dark skin tone": { "v": ["Tono de piel medio oscuro"] }, "Medium light skin tone": { "v": ["Tono de piel medio claro"] }, "Medium skin tone": { "v": ["Tono de piel medio"] }, "Neutral skin color": { "v": ["Color de piel neutral"] }, "Objects": { "v": ["Objetos"] }, "People & Body": { "v": ["Personas y cuerpos"] }, "Pick an emoji": { "v": ["Seleccionar un emoji"] }, "Search emoji": { "v": ["Buscar emoji"] }, "Search results": { "v": ["Resultados de la búsqueda"] }, "Selected": { "v": ["Seleccionado"] }, "Skin tone": { "v": ["Tono de piel"] }, "Smileys & Emotion": { "v": ["Caritas y Emociones"] }, "Symbols": { "v": ["Símbolos"] }, "Travel & Places": { "v": ["Viajes y lugares"] } } }, { "l": "et-EE", "t": { "Activities": { "v": ["Tegevused"] }, "Animals & Nature": { "v": ["Loomad ja loodus"] }, "Custom": { "v": ["Kohanda"] }, "Dark skin tone": { "v": ["Kesta tume toon"] }, "Emoji picker": { "v": ["Emojide valija"] }, "Flags": { "v": ["Lipud"] }, "Food & Drink": { "v": ["Söök ja jook"] }, "Frequently used": { "v": ["Sageli kasutatud"] }, "Light skin tone": { "v": ["Kesta hele toon"] }, "Medium dark skin tone": { "v": ["Kesta keskmiselt tume toon"] }, "Medium light skin tone": { "v": ["Kesta keskmiselt hele toon"] }, "Medium skin tone": { "v": ["Kesta keskmine toon"] }, "Neutral skin color": { "v": ["Kesta neutraalne toon"] }, "Objects": { "v": ["Objektid"] }, "People & Body": { "v": ["Inimesed ja keha"] }, "Pick an emoji": { "v": ["Vali emoji"] }, "Search emoji": { "v": ["Otsi emojit"] }, "Search results": { "v": ["Otsi tulemustest"] }, "Selected": { "v": ["Valitud"] }, "Skin tone": { "v": ["Kesta toon"] }, "Smileys & Emotion": { "v": ["Smailid ja emotsioonid"] }, "Symbols": { "v": ["Sümbolid"] }, "Travel & Places": { "v": ["Reisimine ja kohad"] } } }, { "l": "eu", "t": { "Activities": { "v": ["Jarduerak"] }, "Animals & Nature": { "v": ["Animaliak eta Natura"] }, "Custom": { "v": ["Pertsonalizatua"] }, "Flags": { "v": ["Banderak"] }, "Food & Drink": { "v": ["Janaria eta edariak"] }, "Frequently used": { "v": ["Askotan erabilia"] }, "Objects": { "v": ["Objektuak"] }, "People & Body": { "v": ["Jendea eta gorputza"] }, "Pick an emoji": { "v": ["Hautatu emoji bat"] }, "Search emoji": { "v": ["Bilatu emojiak"] }, "Search results": { "v": ["Bilaketa emaitzak"] }, "Selected": { "v": ["Hautatuta"] }, "Smileys & Emotion": { "v": ["Smileyak eta emozioa"] }, "Symbols": { "v": ["Sinboloak"] }, "Travel & Places": { "v": ["Bidaiak eta lekuak"] } } }, { "l": "fa", "t": { "Activities": { "v": ["فعالیت‌ها"] }, "Animals & Nature": { "v": ["حیوانات و طبیعت"] }, "Custom": { "v": ["سفارشی"] }, "Dark skin tone": { "v": ["رنگ پوسته تیره"] }, "Emoji picker": { "v": ["انتخاب‌گر شکلک"] }, "Flags": { "v": ["پرچم‌ها"] }, "Food & Drink": { "v": ["غذا و نوشیدنی"] }, "Frequently used": { "v": ["پرکاربرد"] }, "Light skin tone": { "v": ["رنگ پوسته روشن"] }, "Medium dark skin tone": { "v": ["رنگ پوسته تیره متوسط"] }, "Medium light skin tone": { "v": ["رنگ پوسته روشن متوسط"] }, "Medium skin tone": { "v": ["رنگ پوسته متوسط"] }, "Neutral skin color": { "v": ["رنگ پوسته خنثی"] }, "Objects": { "v": ["اشیاء"] }, "People & Body": { "v": ["مردم و بدن"] }, "Pick an emoji": { "v": ["انتخاب شکلک"] }, "Search emoji": { "v": ["جستجوی شکلک"] }, "Search results": { "v": ["نتایج جستجو"] }, "Selected": { "v": ["انتخاب شده"] }, "Skin tone": { "v": ["رنگ پوسته"] }, "Smileys & Emotion": { "v": ["شکلک‌ها و احساسات"] }, "Symbols": { "v": ["نمادها"] }, "Travel & Places": { "v": ["سفر و مکان‌ها"] } } }, { "l": "fi", "t": { "Activities": { "v": ["Aktiviteetit"] }, "Animals & Nature": { "v": ["Eläimet & luonto"] }, "Custom": { "v": ["Mukautettu"] }, "Dark skin tone": { "v": ["Tumma ihonväri"] }, "Emoji picker": { "v": ["Emojivalitsin"] }, "Flags": { "v": ["Liput"] }, "Food & Drink": { "v": ["Ruoka & juoma"] }, "Frequently used": { "v": ["Usein käytetyt"] }, "Light skin tone": { "v": ["Vaalea ihonväri"] }, "Medium dark skin tone": { "v": ["Keskitumma ihonväri"] }, "Medium light skin tone": { "v": ["Keskivaalea ihonväri"] }, "Medium skin tone": { "v": ["Keskimääräinen ihonväri"] }, "Neutral skin color": { "v": ["Neutraali ihonväri"] }, "Objects": { "v": ["Esineet & asiat"] }, "People & Body": { "v": ["Ihmiset & keho"] }, "Pick an emoji": { "v": ["Valitse emoji"] }, "Search emoji": { "v": ["Etsi emojia"] }, "Search results": { "v": ["Hakutulokset"] }, "Selected": { "v": ["Valittu"] }, "Skin tone": { "v": ["Ihonväri"] }, "Smileys & Emotion": { "v": ["Hymiöt & tunteet"] }, "Symbols": { "v": ["Symbolit"] }, "Travel & Places": { "v": ["Matkustus & kohteet"] } } }, { "l": "fr", "t": { "Activities": { "v": ["Activités"] }, "Animals & Nature": { "v": ["Animaux & Nature"] }, "Custom": { "v": ["Personnalisé"] }, "Dark skin tone": { "v": ["Teint foncé"] }, "Emoji picker": { "v": ["Sélecteur d'émojis"] }, "Flags": { "v": ["Drapeaux"] }, "Food & Drink": { "v": ["Nourriture & Boissons"] }, "Frequently used": { "v": ["Utilisés fréquemment"] }, "Light skin tone": { "v": ["Teint clair"] }, "Medium dark skin tone": { "v": ["Teint moyennement foncé"] }, "Medium light skin tone": { "v": ["Teint moyen clair"] }, "Medium skin tone": { "v": ["Teint moyen"] }, "Neutral skin color": { "v": ["Teint neutre"] }, "Objects": { "v": ["Objets"] }, "People & Body": { "v": ["Personnes & Corps"] }, "Pick an emoji": { "v": ["Choisissez un émoji"] }, "Search emoji": { "v": ["Rechercher un emoji"] }, "Search results": { "v": ["Résultats de recherche"] }, "Selected": { "v": ["sélectionné"] }, "Skin tone": { "v": ["Teint de peau"] }, "Smileys & Emotion": { "v": ["Smileys & Émotions"] }, "Symbols": { "v": ["Symboles"] }, "Travel & Places": { "v": ["Voyage & Lieux"] } } }, { "l": "ga", "t": { "Activities": { "v": ["Gníomhaíochtaí"] }, "Animals & Nature": { "v": ["Ainmhithe & Dúlra"] }, "Custom": { "v": ["Saincheaptha"] }, "Dark skin tone": { "v": ["Ton craiceann dorcha"] }, "Emoji picker": { "v": ["Roghnóir Emoji"] }, "Flags": { "v": ["Bratacha"] }, "Food & Drink": { "v": ["Bia & Deoch"] }, "Frequently used": { "v": ["Úsáidtear go minic"] }, "Light skin tone": { "v": ["Ton craiceann éadrom"] }, "Medium dark skin tone": { "v": ["Ton craiceann meánach dorcha"] }, "Medium light skin tone": { "v": ["Ton craiceann meánach éadrom"] }, "Medium skin tone": { "v": ["Ton craiceann meánach"] }, "Neutral skin color": { "v": ["Dath craiceann neodrach"] }, "Objects": { "v": ["Réada"] }, "People & Body": { "v": ["Daoine & Corp"] }, "Pick an emoji": { "v": ["Roghnaigh emoji"] }, "Search emoji": { "v": ["Cuardaigh emoji"] }, "Search results": { "v": ["Torthaí cuardaigh"] }, "Selected": { "v": ["Roghnaithe"] }, "Skin tone": { "v": ["Ton craicinn"] }, "Smileys & Emotion": { "v": ["Smileys & Mothúchán"] }, "Symbols": { "v": ["Siombailí"] }, "Travel & Places": { "v": ["Taisteal & Áiteanna"] } } }, { "l": "gl", "t": { "Activities": { "v": ["Actividades"] }, "Animals & Nature": { "v": ["Animais e natureza"] }, "Custom": { "v": ["Personalizado"] }, "Dark skin tone": { "v": ["Ton de pel escuro"] }, "Emoji picker": { "v": ["Selector de «emojis»"] }, "Flags": { "v": ["Bandeiras"] }, "Food & Drink": { "v": ["Comida e bebida"] }, "Frequently used": { "v": ["Usado con frecuencia"] }, "Light skin tone": { "v": ["Ton de pel claro"] }, "Medium dark skin tone": { "v": ["Ton de pel medio escuro"] }, "Medium light skin tone": { "v": ["Ton de pel medio claro"] }, "Medium skin tone": { "v": ["Ton de pel medio"] }, "Neutral skin color": { "v": ["Cor de pel neutra"] }, "Objects": { "v": ["Obxectos"] }, "People & Body": { "v": ["Persoas e corpo"] }, "Pick an emoji": { "v": ["Escolla un «emoji»"] }, "Search emoji": { "v": ["Buscar «emoji»"] }, "Search results": { "v": ["Resultados da busca"] }, "Selected": { "v": ["Seleccionado"] }, "Skin tone": { "v": ["Ton de pel"] }, "Smileys & Emotion": { "v": ["Sorrisos e emocións"] }, "Symbols": { "v": ["Símbolos"] }, "Travel & Places": { "v": ["Viaxes e lugares"] } } }, { "l": "he", "t": { "Activities": { "v": ["פעילויות"] }, "Animals & Nature": { "v": ["חיות וטבע"] }, "Custom": { "v": ["בהתאמה אישית"] }, "Flags": { "v": ["דגלים"] }, "Food & Drink": { "v": ["מזון ומשקאות"] }, "Frequently used": { "v": ["בשימוש תדיר"] }, "Objects": { "v": ["חפצים"] }, "People & Body": { "v": ["אנשים וגוף"] }, "Pick an emoji": { "v": ["נא לבחור אמוג׳י"] }, "Search emoji": { "v": ["חיפוש אמוג׳י"] }, "Search results": { "v": ["תוצאות חיפוש"] }, "Smileys & Emotion": { "v": ["חייכנים ורגשונים"] }, "Symbols": { "v": ["סמלים"] }, "Travel & Places": { "v": ["טיולים ומקומות"] } } }, { "l": "hu", "t": { "Activities": { "v": ["Tevékenységek"] }, "Animals & Nature": { "v": ["Állatok és természet"] }, "Custom": { "v": ["Egyéni"] }, "Flags": { "v": ["Zászlók"] }, "Food & Drink": { "v": ["Étel és ital"] }, "Frequently used": { "v": ["Gyakran használt"] }, "Objects": { "v": ["Tárgyak"] }, "People & Body": { "v": ["Emberek és test"] }, "Pick an emoji": { "v": ["Válasszon egy emodzsit"] }, "Search results": { "v": ["Találatok"] }, "Smileys & Emotion": { "v": ["Mosolyok és érzelmek"] }, "Symbols": { "v": ["Szimbólumok"] }, "Travel & Places": { "v": ["Utazás és helyek"] } } }, { "l": "id", "t": { "Activities": { "v": ["Aktivitas"] }, "Animals & Nature": { "v": ["Satwa dan Alam"] }, "Custom": { "v": ["Khusus"] }, "Flags": { "v": ["Tanda"] }, "Food & Drink": { "v": ["Makanan dan Minuman"] }, "Frequently used": { "v": ["Sering digunakan"] }, "Objects": { "v": ["Objek"] }, "People & Body": { "v": ["Orang & Badan"] }, "Pick an emoji": { "v": ["Pilih emoji"] }, "Search emoji": { "v": ["Cari emoji"] }, "Search results": { "v": ["Hasil pencarian"] }, "Selected": { "v": ["Dipilih"] }, "Smileys & Emotion": { "v": ["Senyuman & Perasaan"] }, "Symbols": { "v": ["Simbol"] }, "Travel & Places": { "v": ["Perjalanan & Tempat"] } } }, { "l": "is", "t": { "Activities": { "v": ["Aðgerðir"] }, "Animals & Nature": { "v": ["Dýr og náttúra"] }, "Custom": { "v": ["Sérsniðið"] }, "Dark skin tone": { "v": ["Dökkur húðlitur"] }, "Emoji picker": { "v": ["Emoji-táknmyndaval"] }, "Flags": { "v": ["Flögg"] }, "Food & Drink": { "v": ["Matur og drykkur"] }, "Frequently used": { "v": ["Oftast notað"] }, "Light skin tone": { "v": ["Ljós húðlitur"] }, "Medium dark skin tone": { "v": ["Meðaldökkur húðlitur"] }, "Medium light skin tone": { "v": ["Meðalljós húðlitur"] }, "Medium skin tone": { "v": ["Meðaltónn húðar"] }, "Neutral skin color": { "v": ["Hlutlaus húðlitur"] }, "Objects": { "v": ["Hlutir"] }, "People & Body": { "v": ["Fólk og líkami"] }, "Pick an emoji": { "v": ["Veldu tjáningartákn"] }, "Search emoji": { "v": ["Leita að tjáningartákni"] }, "Search results": { "v": ["Leitarniðurstöður"] }, "Selected": { "v": ["Valið"] }, "Skin tone": { "v": ["Húðlitur"] }, "Smileys & Emotion": { "v": ["Broskallar og tilfinningar"] }, "Symbols": { "v": ["Tákn"] }, "Travel & Places": { "v": ["Staðir og ferðalög"] } } }, { "l": "it", "t": { "Activities": { "v": ["Attività"] }, "Animals & Nature": { "v": ["Animali e natura"] }, "Custom": { "v": ["Personalizzato"] }, "Flags": { "v": ["Bandiere"] }, "Food & Drink": { "v": ["Cibo e bevande"] }, "Frequently used": { "v": ["Usati di frequente"] }, "Objects": { "v": ["Oggetti"] }, "People & Body": { "v": ["Persone e corpo"] }, "Pick an emoji": { "v": ["Scegli un emoji"] }, "Search emoji": { "v": ["Ricerca emoji"] }, "Search results": { "v": ["Risultati di ricerca"] }, "Selected": { "v": ["Selezionato"] }, "Smileys & Emotion": { "v": ["Faccine ed emozioni"] }, "Symbols": { "v": ["Simboli"] }, "Travel & Places": { "v": ["Viaggi e luoghi"] } } }, { "l": "ja", "t": { "Activities": { "v": ["アクティビティ"] }, "Animals & Nature": { "v": ["動物と自然"] }, "Custom": { "v": ["カスタム"] }, "Dark skin tone": { "v": ["暗い肌のトーン"] }, "Emoji picker": { "v": ["絵文字ピッカー"] }, "Flags": { "v": ["国旗"] }, "Food & Drink": { "v": ["食べ物と飲み物"] }, "Frequently used": { "v": ["よく使うもの"] }, "Light skin tone": { "v": ["明るい肌のトーン"] }, "Medium dark skin tone": { "v": ["やや暗い肌のトーン"] }, "Medium light skin tone": { "v": ["やや明るい肌のトーン"] }, "Medium skin tone": { "v": ["中間の肌のトーン"] }, "Neutral skin color": { "v": ["ニュートラルな肌の色"] }, "Objects": { "v": ["物"] }, "People & Body": { "v": ["様々な人と体の部位"] }, "Pick an emoji": { "v": ["絵文字を選択"] }, "Search emoji": { "v": ["絵文字を検索"] }, "Search results": { "v": ["検索結果"] }, "Selected": { "v": ["選択済み"] }, "Skin tone": { "v": ["肌のトーン"] }, "Smileys & Emotion": { "v": ["感情表現"] }, "Symbols": { "v": ["記号"] }, "Travel & Places": { "v": ["旅行と場所"] } } }, { "l": "ja-JP", "t": { "Activities": { "v": ["アクティビティ"] }, "Animals & Nature": { "v": ["動物と自然"] }, "Custom": { "v": ["カスタム"] }, "Dark skin tone": { "v": ["暗い肌のトーン"] }, "Emoji picker": { "v": ["絵文字ピッカー"] }, "Flags": { "v": ["国旗"] }, "Food & Drink": { "v": ["食べ物と飲み物"] }, "Frequently used": { "v": ["よく使うもの"] }, "Light skin tone": { "v": ["明るい肌のトーン"] }, "Medium dark skin tone": { "v": ["やや暗い肌のトーン"] }, "Medium light skin tone": { "v": ["やや明るい肌のトーン"] }, "Medium skin tone": { "v": ["中間の肌のトーン"] }, "Neutral skin color": { "v": ["ニュートラルな肌の色"] }, "Objects": { "v": ["物"] }, "People & Body": { "v": ["様々な人と体の部位"] }, "Pick an emoji": { "v": ["絵文字を選択"] }, "Search emoji": { "v": ["絵文字を検索"] }, "Search results": { "v": ["検索結果"] }, "Selected": { "v": ["選択済み"] }, "Skin tone": { "v": ["肌のトーン"] }, "Smileys & Emotion": { "v": ["感情表現"] }, "Symbols": { "v": ["記号"] }, "Travel & Places": { "v": ["旅行と場所"] } } }, { "l": "ko", "t": { "Activities": { "v": ["활동"] }, "Animals & Nature": { "v": ["동물 & 자연"] }, "Custom": { "v": ["맞춤 설정"] }, "Dark skin tone": { "v": ["어두운 피부 톤"] }, "Emoji picker": { "v": ["이모지 선택기"] }, "Flags": { "v": ["깃발"] }, "Food & Drink": { "v": ["음식 & 음료"] }, "Frequently used": { "v": ["자주 쓰임"] }, "Light skin tone": { "v": ["밝은 피부 톤"] }, "Medium dark skin tone": { "v": ["약간 어두운 피부 톤"] }, "Medium light skin tone": { "v": ["약간 밝은 피부 톤"] }, "Medium skin tone": { "v": ["중간 피부 톤"] }, "Neutral skin color": { "v": ["중성적 피부 톤"] }, "Objects": { "v": ["물체"] }, "People & Body": { "v": ["사람 & 신체"] }, "Pick an emoji": { "v": ["이모지 선택"] }, "Search emoji": { "v": ["이모지 검색"] }, "Search results": { "v": ["검색 결과"] }, "Selected": { "v": ["선택됨"] }, "Skin tone": { "v": ["피부 톤"] }, "Smileys & Emotion": { "v": ["스마일리 & 이모티콘"] }, "Symbols": { "v": ["기호"] }, "Travel & Places": { "v": ["여행 & 장소"] } } }, { "l": "lt-LT", "t": { "Activities": { "v": ["Veiklos"] }, "Animals & Nature": { "v": ["Gyvūnai ir gamta"] }, "Custom": { "v": ["Tinkinti"] }, "Flags": { "v": ["Vėliavos"] }, "Food & Drink": { "v": ["Maistas ir gėrimai"] }, "Frequently used": { "v": ["Dažniausiai naudoti"] }, "Objects": { "v": ["Objektai"] }, "People & Body": { "v": ["Žmonės ir kūnas"] }, "Pick an emoji": { "v": ["Pasirinkti jaustuką"] }, "Search results": { "v": ["Paieškos rezultatai"] }, "Smileys & Emotion": { "v": ["Šypsenos ir emocijos"] }, "Symbols": { "v": ["Simboliai"] }, "Travel & Places": { "v": ["Kelionės ir vietos"] } } }, { "l": "lv", "t": {} }, { "l": "mk", "t": { "Activities": { "v": ["Активности"] }, "Animals & Nature": { "v": ["Животни & Природа"] }, "Custom": { "v": ["Прилагодени"] }, "Flags": { "v": ["Знамиња"] }, "Food & Drink": { "v": ["Храна & Пијалоци"] }, "Frequently used": { "v": ["Најчесто користени"] }, "Objects": { "v": ["Објекти"] }, "People & Body": { "v": ["Луѓе & Тело"] }, "Pick an emoji": { "v": ["Избери емотикон"] }, "Search results": { "v": ["Резултати од барувањето"] }, "Smileys & Emotion": { "v": ["Смешковци & Емотикони"] }, "Symbols": { "v": ["Симболи"] }, "Travel & Places": { "v": ["Патувања & Места"] } } }, { "l": "my", "t": { "Activities": { "v": ["ပြုလုပ်ဆောင်တာများ"] }, "Animals & Nature": { "v": ["တိရစ္ဆာန်များနှင့် သဘာဝ"] }, "Custom": { "v": ["အလိုကျချိန်ညှိမှု"] }, "Flags": { "v": ["အလံများ"] }, "Food & Drink": { "v": ["အစားအသောက်"] }, "Frequently used": { "v": ["မကြာခဏအသုံးပြုသော"] }, "Objects": { "v": ["အရာဝတ္ထုများ"] }, "People & Body": { "v": ["လူပုဂ္ဂိုလ်များနှင့် ခန္ဓာကိုယ်"] }, "Pick an emoji": { "v": ["အီမိုဂျီရွေးရန်"] }, "Search results": { "v": ["ရှာဖွေမှု ရလဒ်များ"] }, "Smileys & Emotion": { "v": ["စမိုင်လီများနှင့် အီမိုရှင်း"] }, "Symbols": { "v": ["သင်္ကေတများ"] }, "Travel & Places": { "v": ["ခရီးသွားလာခြင်းနှင့် နေရာများ"] } } }, { "l": "nb", "t": { "Activities": { "v": ["Aktiviteter"] }, "Animals & Nature": { "v": ["Dyr og natur"] }, "Custom": { "v": ["Tilpasset"] }, "Dark skin tone": { "v": ["Mørk hudtone"] }, "Emoji picker": { "v": ["Emoji-velger"] }, "Flags": { "v": ["Flagg"] }, "Food & Drink": { "v": ["Mat og drikke"] }, "Frequently used": { "v": ["Ofte brukt"] }, "Light skin tone": { "v": ["Lys hudtone"] }, "Medium dark skin tone": { "v": ["Middels mørk hudtone"] }, "Medium light skin tone": { "v": ["Middels lys hudtone"] }, "Medium skin tone": { "v": ["Middels hudtone"] }, "Neutral skin color": { "v": ["Nøytral hudfarge"] }, "Objects": { "v": ["Objekter"] }, "People & Body": { "v": ["Mennesker og kropp"] }, "Pick an emoji": { "v": ["Velg en emoji"] }, "Search emoji": { "v": ["Søk emoji"] }, "Search results": { "v": ["Søkeresultater"] }, "Selected": { "v": ["Valgt"] }, "Skin tone": { "v": ["Hudtone"] }, "Smileys & Emotion": { "v": ["Smilefjes og følelser"] }, "Symbols": { "v": ["Symboler"] }, "Travel & Places": { "v": ["Reise og steder"] } } }, { "l": "nl", "t": { "Activities": { "v": ["Activiteiten"] }, "Animals & Nature": { "v": ["Dieren & Natuur"] }, "Custom": { "v": ["Aangepast"] }, "Dark skin tone": { "v": ["Donkere tint"] }, "Emoji picker": { "v": ["Emoji-kiezer"] }, "Flags": { "v": ["Vlaggen"] }, "Food & Drink": { "v": ["Eten & Drinken"] }, "Frequently used": { "v": ["Vaak gebruikt"] }, "Light skin tone": { "v": ["Lichte tint"] }, "Medium dark skin tone": { "v": ["Gemiddelde donkere tint"] }, "Medium light skin tone": { "v": ["Gemiddeld lichte tint"] }, "Medium skin tone": { "v": ["Gemiddelde tint"] }, "Neutral skin color": { "v": ["Neutrale tint"] }, "Objects": { "v": ["Objecten"] }, "People & Body": { "v": ["Mensen & Lichaam"] }, "Pick an emoji": { "v": ["Kies een emoji"] }, "Search emoji": { "v": ["Zoek emoji"] }, "Search results": { "v": ["Zoekresultaten"] }, "Selected": { "v": ["Geselecteerd"] }, "Skin tone": { "v": ["Tint van de schil"] }, "Smileys & Emotion": { "v": ["Smileys & Emotie"] }, "Symbols": { "v": ["Symbolen"] }, "Travel & Places": { "v": ["Reizen & Plaatsen"] } } }, { "l": "oc", "t": {} }, { "l": "pl", "t": { "Activities": { "v": ["Aktywność"] }, "Animals & Nature": { "v": ["Zwierzęta i natura"] }, "Custom": { "v": ["Zwyczajne"] }, "Dark skin tone": { "v": ["Ciemna tonacja"] }, "Emoji picker": { "v": ["Wybierz Emoji"] }, "Flags": { "v": ["Flagi"] }, "Food & Drink": { "v": ["Jedzenie i picie"] }, "Frequently used": { "v": ["Często używane"] }, "Light skin tone": { "v": ["Jasny odcień skóry"] }, "Medium dark skin tone": { "v": ["Średnio ciemny odcień skóry"] }, "Medium light skin tone": { "v": ["Średnio jasny odcień skóry"] }, "Medium skin tone": { "v": ["Średni odcień skóry"] }, "Neutral skin color": { "v": ["Neutralny kolor skróry"] }, "Objects": { "v": ["Obiekty"] }, "People & Body": { "v": ["Ludzie i ciało"] }, "Pick an emoji": { "v": ["Wybierz emoji"] }, "Search emoji": { "v": ["Szukaj emoji"] }, "Search results": { "v": ["Wyniki wyszukiwania"] }, "Selected": { "v": ["Wybrane"] }, "Skin tone": { "v": ["Kolor skóry"] }, "Smileys & Emotion": { "v": ["Buźki i emotikony"] }, "Symbols": { "v": ["Symbole"] }, "Travel & Places": { "v": ["Podróże i miejsca"] } } }, { "l": "pt-BR", "t": { "Activities": { "v": ["Atividades"] }, "Animals & Nature": { "v": ["Animais & Natureza"] }, "Custom": { "v": ["Personalizado"] }, "Dark skin tone": { "v": ["Tom de pele escuro"] }, "Emoji picker": { "v": ["Seletor de emoji"] }, "Flags": { "v": ["Bandeiras"] }, "Food & Drink": { "v": ["Comida & Bebida"] }, "Frequently used": { "v": ["Mais usados"] }, "Light skin tone": { "v": ["Tome de pele claro"] }, "Medium dark skin tone": { "v": ["Tom de pele meio escuro"] }, "Medium light skin tone": { "v": ["Tom de pele meio claro"] }, "Medium skin tone": { "v": ["Tom de pele médio"] }, "Neutral skin color": { "v": ["Tom de pele neutro"] }, "Objects": { "v": ["Objetos"] }, "People & Body": { "v": ["Pessoas & Corpo"] }, "Pick an emoji": { "v": ["Escolha um emoji"] }, "Search emoji": { "v": ["Pesquisar emoji"] }, "Search results": { "v": ["Resultados da pesquisa"] }, "Selected": { "v": ["Selecionado"] }, "Skin tone": { "v": ["Tom de pele"] }, "Smileys & Emotion": { "v": ["Smiles & Emoções"] }, "Symbols": { "v": ["Símbolos"] }, "Travel & Places": { "v": ["Viagem & Lugares"] } } }, { "l": "pt-PT", "t": { "Activities": { "v": ["Atividades"] }, "Animals & Nature": { "v": ["Animais e Natureza"] }, "Custom": { "v": ["Personalizado"] }, "Dark skin tone": { "v": ["Tom de pele escuro"] }, "Emoji picker": { "v": ["seletor de emoji"] }, "Flags": { "v": ["Bandeiras"] }, "Food & Drink": { "v": ["Comida e Bebida"] }, "Frequently used": { "v": ["Mais utilizados"] }, "Light skin tone": { "v": ["Tom de pele claro"] }, "Medium dark skin tone": { "v": ["Tom de pele escuro médio"] }, "Medium light skin tone": { "v": ["Tom de pele claro médio"] }, "Medium skin tone": { "v": ["Tom de pele médio"] }, "Neutral skin color": { "v": ["Cor de pele neutra"] }, "Objects": { "v": ["Objetos"] }, "People & Body": { "v": ["Pessoas e Corpo"] }, "Pick an emoji": { "v": ["Escolha um emoji"] }, "Search emoji": { "v": ["Pesquisar emoji"] }, "Search results": { "v": ["Resultados da pesquisa"] }, "Selected": { "v": ["Selecionado"] }, "Skin tone": { "v": ["Tom de pele"] }, "Smileys & Emotion": { "v": ["Sorrisos e Emoções"] }, "Symbols": { "v": ["Símbolos"] }, "Travel & Places": { "v": ["Viagens e Lugares"] } } }, { "l": "ro", "t": { "Activities": { "v": ["Activități"] }, "Animals & Nature": { "v": ["Animale și natură"] }, "Custom": { "v": ["Personalizat"] }, "Flags": { "v": ["Marcaje"] }, "Food & Drink": { "v": ["Alimente și băuturi"] }, "Frequently used": { "v": ["Utilizate frecvent"] }, "Objects": { "v": ["Obiecte"] }, "People & Body": { "v": ["Oameni și corp"] }, "Pick an emoji": { "v": ["Alege un emoji"] }, "Search emoji": { "v": ["Căutare emoji"] }, "Search results": { "v": ["Rezultatele căutării"] }, "Selected": { "v": ["Selectat"] }, "Smileys & Emotion": { "v": ["Zâmbete și emoții"] }, "Symbols": { "v": ["Simboluri"] }, "Travel & Places": { "v": ["Călătorii și locuri"] } } }, { "l": "ru", "t": { "Activities": { "v": ["События"] }, "Animals & Nature": { "v": ["Животные и природа "] }, "Custom": { "v": ["Пользовательское"] }, "Dark skin tone": { "v": ["Темный оттенок"] }, "Emoji picker": { "v": ["Подборщик эмодзи"] }, "Flags": { "v": ["Флаги"] }, "Food & Drink": { "v": ["Еда, напиток"] }, "Frequently used": { "v": ["Часто используемый"] }, "Light skin tone": { "v": ["Светлый оттенок"] }, "Medium dark skin tone": { "v": ["Средний темный оттенок"] }, "Medium light skin tone": { "v": ["Средний светлый оттенок"] }, "Medium skin tone": { "v": ["Средний оттенок"] }, "Neutral skin color": { "v": ["Нейтральный оттенок"] }, "Objects": { "v": ["Объекты"] }, "People & Body": { "v": ["Люди и тело"] }, "Pick an emoji": { "v": ["Выберите эмодзи"] }, "Search emoji": { "v": ["Поиск эмодзи"] }, "Search results": { "v": ["Результаты поиска"] }, "Selected": { "v": ["Выбрано"] }, "Skin tone": { "v": ["Оттенок скина"] }, "Smileys & Emotion": { "v": ["Смайлики и эмоции"] }, "Symbols": { "v": ["Символы"] }, "Travel & Places": { "v": ["Путешествия и места"] } } }, { "l": "sk", "t": { "Activities": { "v": ["Aktivity"] }, "Animals & Nature": { "v": ["Zvieratá a príroda"] }, "Custom": { "v": ["Vlastné"] }, "Dark skin tone": { "v": ["Tmavý vzhľad"] }, "Emoji picker": { "v": ["Výber emodži"] }, "Flags": { "v": ["Vlajky"] }, "Food & Drink": { "v": ["Jedlo a nápoje"] }, "Frequently used": { "v": ["Často používané"] }, "Light skin tone": { "v": ["Svetlý vzhľad"] }, "Medium dark skin tone": { "v": ["Stredne tmavý vzhľad"] }, "Medium light skin tone": { "v": ["Stredne svetlý vzhľad"] }, "Medium skin tone": { "v": ["Stredný vzhľad"] }, "Neutral skin color": { "v": ["Neutrálny vzhľad"] }, "Objects": { "v": ["Objekty"] }, "People & Body": { "v": ["Ľudia a telo"] }, "Pick an emoji": { "v": ["Vybrať emodži"] }, "Search emoji": { "v": ["Vyhľadať emoji"] }, "Search results": { "v": ["Výsledky vyhľadávania"] }, "Selected": { "v": ["Vybraný"] }, "Skin tone": { "v": ["Vzhľad"] }, "Smileys & Emotion": { "v": ["Smajlíky a emócie"] }, "Symbols": { "v": ["Symboly"] }, "Travel & Places": { "v": ["Cestovanie a miesta"] } } }, { "l": "sl", "t": { "Activities": { "v": ["Dejavnosti"] }, "Animals & Nature": { "v": ["Živali in Narava"] }, "Custom": { "v": ["Po meri"] }, "Flags": { "v": ["Zastavice"] }, "Food & Drink": { "v": ["Hrana in Pijača"] }, "Frequently used": { "v": ["Pogostost uporabe"] }, "Objects": { "v": ["Predmeti"] }, "People & Body": { "v": ["Ljudje in Telo"] }, "Pick an emoji": { "v": ["Izbor izrazne ikone"] }, "Search results": { "v": ["Zadetki iskanja"] }, "Smileys & Emotion": { "v": ["Izrazne ikone"] }, "Symbols": { "v": ["Simboli"] }, "Travel & Places": { "v": ["Potovanja in Kraji"] } } }, { "l": "sr", "t": { "Activities": { "v": ["Активности"] }, "Animals & Nature": { "v": ["Животиње и природа"] }, "Custom": { "v": ["Произвољно"] }, "Dark skin tone": { "v": ["Тамни тен коже"] }, "Emoji picker": { "v": ["Бирач емођија"] }, "Flags": { "v": ["Заставе"] }, "Food & Drink": { "v": ["Храна и пиће"] }, "Frequently used": { "v": ["Често коришћено"] }, "Light skin tone": { "v": ["Светли тен коже"] }, "Medium dark skin tone": { "v": ["Средње тамни тен коже"] }, "Medium light skin tone": { "v": ["Средње светли тен коже"] }, "Medium skin tone": { "v": ["Средњи тен коже"] }, "Neutral skin color": { "v": ["Неутрална боја коже"] }, "Objects": { "v": ["Предмети"] }, "People & Body": { "v": ["Људи и тело"] }, "Pick an emoji": { "v": ["Изаберите емођи"] }, "Search emoji": { "v": ["Претражи емођи"] }, "Search results": { "v": ["Резултати претраге"] }, "Selected": { "v": ["Изабрано"] }, "Skin tone": { "v": ["Тен коже"] }, "Smileys & Emotion": { "v": ["Смајлији и емоције"] }, "Symbols": { "v": ["Симболи"] }, "Travel & Places": { "v": ["Путовање и места"] } } }, { "l": "sv", "t": { "Activities": { "v": ["Aktiviteter"] }, "Animals & Nature": { "v": ["Djur & Natur"] }, "Custom": { "v": ["Anpassad"] }, "Dark skin tone": { "v": ["Mörk hudton"] }, "Emoji picker": { "v": ["Emoji-väljare"] }, "Flags": { "v": ["Flaggor"] }, "Food & Drink": { "v": ["Mat & Dryck"] }, "Frequently used": { "v": ["Används ofta"] }, "Light skin tone": { "v": ["Ljus hudton"] }, "Medium dark skin tone": { "v": ["Medium mörk hudton"] }, "Medium light skin tone": { "v": ["Medium ljus hudton"] }, "Medium skin tone": { "v": ["Medium hudton"] }, "Neutral skin color": { "v": ["Neutral hudfärg"] }, "Objects": { "v": ["Objekt"] }, "People & Body": { "v": ["Kropp & Själ"] }, "Pick an emoji": { "v": ["Välj en emoji"] }, "Search emoji": { "v": ["Sök emoji"] }, "Search results": { "v": ["Sökresultat"] }, "Selected": { "v": ["Vald"] }, "Skin tone": { "v": ["Hudton"] }, "Smileys & Emotion": { "v": ["Selfies & Känslor"] }, "Symbols": { "v": ["Symboler"] }, "Travel & Places": { "v": ["Resor & Sevärdigheter"] } } }, { "l": "tr", "t": { "Activities": { "v": ["Etkinlikler"] }, "Animals & Nature": { "v": ["Hayvanlar ve Doğa"] }, "Custom": { "v": ["Özel"] }, "Dark skin tone": { "v": ["Koyu deri rengi"] }, "Emoji picker": { "v": ["Emoji seçici"] }, "Flags": { "v": ["Bayraklar"] }, "Food & Drink": { "v": ["Yeme ve içme"] }, "Frequently used": { "v": ["Sık kullanılanlar"] }, "Light skin tone": { "v": ["Açık deri rengi"] }, "Medium dark skin tone": { "v": ["Orta koyu deri rengi"] }, "Medium light skin tone": { "v": ["Orta açık deri rengi"] }, "Medium skin tone": { "v": ["Orta deri rengi"] }, "Neutral skin color": { "v": ["Nötr deri rengi"] }, "Objects": { "v": ["Nesneler"] }, "People & Body": { "v": ["İnsanlar ve beden"] }, "Pick an emoji": { "v": ["Bir emoji seçin"] }, "Search emoji": { "v": ["Emoji ara"] }, "Search results": { "v": ["Arama sonuçları"] }, "Selected": { "v": ["Seçilmiş"] }, "Skin tone": { "v": ["Deri rengi"] }, "Smileys & Emotion": { "v": ["İfadeler ve duygular"] }, "Symbols": { "v": ["Simgeler"] }, "Travel & Places": { "v": ["Gezi ve yerler"] } } }, { "l": "uk", "t": { "Activities": { "v": ["Діяльність"] }, "Animals & Nature": { "v": ["Тварини та природа"] }, "Custom": { "v": ["Власне"] }, "Dark skin tone": { "v": ["Смаглявий"] }, "Emoji picker": { "v": ["Вибір емоційки"] }, "Flags": { "v": ["Прапори"] }, "Food & Drink": { "v": ["Їжа та напої"] }, "Frequently used": { "v": ["Найчастіші"] }, "Light skin tone": { "v": ["Світла шкіра"] }, "Medium dark skin tone": { "v": ["Какао"] }, "Medium light skin tone": { "v": ["Лате"] }, "Medium skin tone": { "v": ["Середній колір шкіри"] }, "Neutral skin color": { "v": ["Нейтральний колір шкіри"] }, "Objects": { "v": ["Об'єкти"] }, "People & Body": { "v": ["Люди та жести"] }, "Pick an emoji": { "v": ["Виберіть емоційку"] }, "Search emoji": { "v": ["Шукати емоційки"] }, "Search results": { "v": ["Результати пошуку"] }, "Selected": { "v": ["Вибрано"] }, "Skin tone": { "v": ["Колір шкіри"] }, "Smileys & Emotion": { "v": ["Смайли та емоції"] }, "Symbols": { "v": ["Символи"] }, "Travel & Places": { "v": ["Поїздки та місця"] } } }, { "l": "uz", "t": { "Activities": { "v": ["Faolliklar"] }, "Animals & Nature": { "v": ["Hayvonlar va Tabiat"] }, "Custom": { "v": ["Moslashtirilgan"] }, "Dark skin tone": { "v": ["Qora rangdagi qoplama"] }, "Emoji picker": { "v": ["Emoji tanlagich"] }, "Flags": { "v": ["Bayroqlar"] }, "Food & Drink": { "v": ["Oziq-ovqat va ichimliklar"] }, "Frequently used": { "v": ["Tez-tez ishlatiladi"] }, "Light skin tone": { "v": ["Yorug` rangdagi qoplama"] }, "Medium dark skin tone": { "v": ["O`rtacha qorong`u rangdagi qoplama"] }, "Medium light skin tone": { "v": ["O`rtacha yorug`lik rangdagi qoplama"] }, "Medium skin tone": { "v": ["O`rtacha rangdagi qoplama"] }, "Neutral skin color": { "v": ["Neytral rang"] }, "Objects": { "v": ["Obyekt"] }, "People & Body": { "v": ["Odamlar va Tana"] }, "Pick an emoji": { "v": ["Emojini tanlang"] }, "Search emoji": { "v": ["Emoji qidirish"] }, "Search results": { "v": ["Qidiruv natijalari"] }, "Selected": { "v": ["Tanlangan"] }, "Skin tone": { "v": ["Odatiy rangdagi qoplama"] }, "Smileys & Emotion": { "v": ["Smayllar va Hissiyotlar"] }, "Symbols": { "v": ["Belgilar"] }, "Travel & Places": { "v": ["Sayohat va Joylar"] } } }, { "l": "zh-CN", "t": { "Activities": { "v": ["活动"] }, "Animals & Nature": { "v": ["动物 & 自然"] }, "Custom": { "v": ["自定义"] }, "Dark skin tone": { "v": ["深色皮肤"] }, "Emoji picker": { "v": ["表情拾取器"] }, "Flags": { "v": ["旗帜"] }, "Food & Drink": { "v": ["食物 & 饮品"] }, "Frequently used": { "v": ["经常使用"] }, "Light skin tone": { "v": ["浅色皮肤"] }, "Medium dark skin tone": { "v": ["中等深色皮肤"] }, "Medium light skin tone": { "v": ["中等浅色皮肤"] }, "Medium skin tone": { "v": ["中等皮肤"] }, "Neutral skin color": { "v": ["中性皮肤颜色"] }, "Objects": { "v": ["物体"] }, "People & Body": { "v": ["人 & 身体"] }, "Pick an emoji": { "v": ["选择一个表情"] }, "Search emoji": { "v": ["搜索表情"] }, "Search results": { "v": ["搜索结果"] }, "Selected": { "v": ["选择"] }, "Skin tone": { "v": ["皮肤"] }, "Smileys & Emotion": { "v": ["笑脸 & 情感"] }, "Symbols": { "v": ["符号"] }, "Travel & Places": { "v": ["旅游 & 地点"] } } }, { "l": "zh-HK", "t": { "Activities": { "v": ["活動"] }, "Animals & Nature": { "v": ["動物與自然"] }, "Custom": { "v": ["自定義"] }, "Dark skin tone": { "v": ["深膚色"] }, "Emoji picker": { "v": ["表情符號選擇器"] }, "Flags": { "v": ["旗幟"] }, "Food & Drink": { "v": ["食物與飲料"] }, "Frequently used": { "v": ["經常使用"] }, "Light skin tone": { "v": ["淺膚色"] }, "Medium dark skin tone": { "v": ["中等深膚色"] }, "Medium light skin tone": { "v": ["中等淺膚色"] }, "Medium skin tone": { "v": ["中等膚色"] }, "Neutral skin color": { "v": ["中性色膚色"] }, "Objects": { "v": ["物件"] }, "People & Body": { "v": ["人物"] }, "Pick an emoji": { "v": ["選擇表情符號"] }, "Search emoji": { "v": ["搜尋表情符號"] }, "Search results": { "v": ["搜尋結果"] }, "Selected": { "v": ["已選"] }, "Skin tone": { "v": ["膚色"] }, "Smileys & Emotion": { "v": ["表情"] }, "Symbols": { "v": ["標誌"] }, "Travel & Places": { "v": ["旅遊與景點"] } } }, { "l": "zh-TW", "t": { "Activities": { "v": ["活動"] }, "Animals & Nature": { "v": ["動物與自然"] }, "Custom": { "v": ["自定義"] }, "Flags": { "v": ["旗幟"] }, "Food & Drink": { "v": ["食物與飲料"] }, "Frequently used": { "v": ["最近使用"] }, "Objects": { "v": ["物件"] }, "People & Body": { "v": ["人物"] }, "Pick an emoji": { "v": ["選擇表情符號"] }, "Search emoji": { "v": ["搜尋表情符號"] }, "Search results": { "v": ["搜尋結果"] }, "Selected": { "v": ["已選取"] }, "Smileys & Emotion": { "v": ["表情"] }, "Symbols": { "v": ["標誌"] }, "Travel & Places": { "v": ["旅遊與景點"] } } }];
const t6 = [{ "l": "ar", "t": { "Add to a project": { "v": ["أضف إلى مشروع"] }, "Connect items to a project to make them easier to find": { "v": ["ربط عناصر بمشروع لتسهيل العثور عليها"] }, "Failed to add the item to the project": { "v": ["تعذر ربط عنصر بمشروع"] }, "Failed to create a project": { "v": ["تعذر إنشاء مشروع"] }, "Failed to rename the project": { "v": ["تعذّر تغيير اسم المشروع"] }, "Type to search for existing projects": { "v": ["أكتُب للبحث في المشاريع الموجودة"] } } }, { "l": "ast", "t": {} }, { "l": "br", "t": {} }, { "l": "ca", "t": {} }, { "l": "cs", "t": { "Add to a project": { "v": ["Přidat do projektu"] }, "Connect items to a project to make them easier to find": { "v": ["Připojte položky k projektu, čímž budou snáze dohledatelné"] }, "Failed to add the item to the project": { "v": ["Položku se nepodařilo přidat do projektu"] }, "Failed to create a project": { "v": ["Projekt se nepodařilo vytvořit"] }, "Failed to rename the project": { "v": ["Projekt se nepodařilo přejmenovat"] }, "Type to search for existing projects": { "v": ["Psaním vyhledávejte existující projekty"] } } }, { "l": "cs-CZ", "t": {} }, { "l": "da", "t": { "Add to a project": { "v": ["Tilføj til et projekt"] }, "Connect items to a project to make them easier to find": { "v": ["Forbind elementer til et projekt for at gøre dem nemmere at finde"] }, "Failed to add the item to the project": { "v": ["Kunne ikke føje elementet til projektet"] }, "Failed to create a project": { "v": ["Kunne ikke oprette et projekt"] }, "Failed to rename the project": { "v": ["Projektet kunne ikke omdøbes"] }, "Type to search for existing projects": { "v": ["Skriv for at søge efter eksisterende projekter"] } } }, { "l": "de", "t": { "Add to a project": { "v": ["Einem Projekt hinzufügen"] }, "Connect items to a project to make them easier to find": { "v": ["Verbinde Elemente mit einem Projekt, um sie leichter zu finden"] }, "Failed to add the item to the project": { "v": ["Das Element konnte nicht zum Projekt hinzugefügt werden"] }, "Failed to create a project": { "v": ["Fehler beim Erstellen eines Projektes"] }, "Failed to rename the project": { "v": ["Fehler beim Umbenennen eines Projektes"] }, "Type to search for existing projects": { "v": ["Tippen, um nach vorhandenen Projekten zu suchen"] } } }, { "l": "de-DE", "t": { "Add to a project": { "v": ["Einem Projekt hinzufügen"] }, "Connect items to a project to make them easier to find": { "v": ["Verbinden Sie Elemente mit einem Projekt, um sie leichter zu finden"] }, "Failed to add the item to the project": { "v": ["Das Element konnte nicht zum Projekt hinzugefügt werden"] }, "Failed to create a project": { "v": ["Fehler beim Erstellen eines Projektes"] }, "Failed to rename the project": { "v": ["Fehler beim Umbenennen eines Projektes"] }, "Type to search for existing projects": { "v": ["Tippen, um nach vorhandenen Projekten zu suchen"] } } }, { "l": "el", "t": { "Add to a project": { "v": ["Προσθήκη σε ένα έργο"] }, "Connect items to a project to make them easier to find": { "v": ["Συνδέστε αντικείμενα σε ένα έργο για να τα βρίσκετε πιο εύκολα"] }, "Failed to add the item to the project": { "v": ["Αποτυχία προσθήκης του αντικειμένου στο έργο"] }, "Failed to create a project": { "v": ["Αποτυχία δημιουργίας έργου"] }, "Failed to rename the project": { "v": ["Αποτυχία μετονομασίας του έργου"] }, "Type to search for existing projects": { "v": ["Πληκτρολογήστε για αναζήτηση υπαρχόντων έργων"] } } }, { "l": "en-GB", "t": { "Add to a project": { "v": ["Add to a project"] }, "Connect items to a project to make them easier to find": { "v": ["Connect items to a project to make them easier to find"] }, "Failed to add the item to the project": { "v": ["Failed to add the item to the project"] }, "Failed to create a project": { "v": ["Failed to create a project"] }, "Failed to rename the project": { "v": ["Failed to rename the project"] }, "Type to search for existing projects": { "v": ["Type to search for existing projects"] } } }, { "l": "eo", "t": {} }, { "l": "es", "t": {} }, { "l": "es-AR", "t": { "Add to a project": { "v": ["Agregar a un proyecto"] }, "Connect items to a project to make them easier to find": { "v": ["Conecte items a un proyecto para hacerlos más fáciles de encontrar"] }, "Failed to add the item to the project": { "v": ["No se pudo agregar el elemento al proyecto"] }, "Failed to create a project": { "v": ["No se pudo crear un proyecto"] }, "Failed to rename the project": { "v": ["No se pudo renombrar el proyecto"] }, "Type to search for existing projects": { "v": ["Escriba para buscar proyectos existentes"] } } }, { "l": "es-EC", "t": {} }, { "l": "es-MX", "t": { "Add to a project": { "v": ["Agregar a un proyecto"] }, "Connect items to a project to make them easier to find": { "v": ["Conecte elementos a un proyecto para hacerlos más fáciles de encontrar"] }, "Failed to add the item to the project": { "v": ["No se pudo agregar el elemento al proyecto"] }, "Failed to create a project": { "v": ["No se pudo crear el proyecto"] }, "Failed to rename the project": { "v": ["No se pudo renombrar el proyecto"] }, "Type to search for existing projects": { "v": ["Escriba para buscar proyectos existentes"] } } }, { "l": "et-EE", "t": { "Add to a project": { "v": ["Lisa projekti"] }, "Connect items to a project to make them easier to find": { "v": ["Selleks, et objekte oleks lihtsam leida, seo nad projektiga"] }, "Failed to add the item to the project": { "v": ["Objekti lisamine projekti ei õnnestunud"] }, "Failed to create a project": { "v": ["Projekti loomine ei õnnestunud"] }, "Failed to rename the project": { "v": ["Projekti nime muutmine ei õnnestunud"] }, "Type to search for existing projects": { "v": ["Olemasolevate projektide otsimiseks kirjuta"] } } }, { "l": "eu", "t": {} }, { "l": "fa", "t": { "Add to a project": { "v": ["افزودن به پروژه"] }, "Connect items to a project to make them easier to find": { "v": ["برای پیدا کردن راحت‌تر، مواردی را به پروژه متصل کنید"] }, "Failed to add the item to the project": { "v": ["موارد به پروژه اضافه نشد"] }, "Failed to create a project": { "v": ["ایجاد پروژه نامؤفق بود"] }, "Failed to rename the project": { "v": ["تغییر نام پروژه انجام نشد"] }, "Type to search for existing projects": { "v": ["برای جستجوی پروژه‌های موجود تایپ کنید"] } } }, { "l": "fi", "t": { "Add to a project": { "v": ["Lisää projektiin"] }, "Connect items to a project to make them easier to find": { "v": ["Yhdistä kohteet projektiin, jotta ne olisivat helpompia löytää"] }, "Failed to add the item to the project": { "v": ["Kohteiden lisääminen projektiin epäonnistui"] }, "Failed to create a project": { "v": ["Projektin luominen epäonnistui"] }, "Failed to rename the project": { "v": ["Projektin nimeäminen epäonnistui"] }, "Type to search for existing projects": { "v": ["Kirjoita etsiäksesi olemassaolevia projekteja"] } } }, { "l": "fr", "t": { "Add to a project": { "v": ["Ajouter à un projet"] }, "Connect items to a project to make them easier to find": { "v": ["Connectez des éléments à un projet pour les retrouver plus facilement"] }, "Failed to add the item to the project": { "v": ["Impossible d'ajouter l'élément au projet"] }, "Failed to create a project": { "v": ["Impossible de créer un projet"] }, "Failed to rename the project": { "v": ["Impossible de renommer le projet"] }, "Type to search for existing projects": { "v": ["Tapez pour rechercher des projets existants"] } } }, { "l": "ga", "t": { "Add to a project": { "v": ["Cuir le tionscadal"] }, "Connect items to a project to make them easier to find": { "v": ["Ceangail míreanna le tionscadal chun iad a dhéanamh níos éasca iad a aimsiú"] }, "Failed to add the item to the project": { "v": ["Theip ar an mír a chur leis an tionscadal"] }, "Failed to create a project": { "v": ["Theip ar thionscadal a chruthú"] }, "Failed to rename the project": { "v": ["Theip ar an tionscadal a athainmniú"] }, "Type to search for existing projects": { "v": ["Clóscríobh chun tionscadail atá ann cheana a chuardach"] } } }, { "l": "gl", "t": { "Add to a project": { "v": ["Engadir a un proxecto"] }, "Connect items to a project to make them easier to find": { "v": ["Conectar elementos a un proxecto para facelos máis doados de atopar"] }, "Failed to add the item to the project": { "v": ["Produciuse un fallo ao engadir o elemento ao proxecto"] }, "Failed to create a project": { "v": ["Produciuse un fallo ao crear un proxecto"] }, "Failed to rename the project": { "v": ["Produciuse un fallo ao cambiarlle o nome ao proxecto"] }, "Type to search for existing projects": { "v": ["Escriba para buscar proxectos existentes"] } } }, { "l": "he", "t": {} }, { "l": "hu", "t": {} }, { "l": "id", "t": {} }, { "l": "is", "t": { "Add to a project": { "v": ["Bæta við verkefni"] }, "Connect items to a project to make them easier to find": { "v": ["Tengdu atriði við verkefni til að gera einfaldara að finna þau"] }, "Failed to add the item to the project": { "v": ["Mistókst að bæta atriðinu í verkefnið"] }, "Failed to create a project": { "v": ["Mistókst að útbúa verkefni"] }, "Failed to rename the project": { "v": ["Mistókst að endurnefna verkefnið"] }, "Type to search for existing projects": { "v": ["Skrifaðu hér til að leita að fyrirliggjandi verkefnum"] } } }, { "l": "it", "t": {} }, { "l": "ja", "t": { "Add to a project": { "v": ["プロジェクトに追加する"] }, "Connect items to a project to make them easier to find": { "v": ["項目をプロジェクトに接続して検索しやすくする"] }, "Failed to add the item to the project": { "v": ["プロジェクトへのアイテムの追加に失敗しました"] }, "Failed to create a project": { "v": ["プロジェクトの作成に失敗しました"] }, "Failed to rename the project": { "v": ["プロジェクトの名前変更に失敗しました"] }, "Type to search for existing projects": { "v": ["既存のプロジェクトを検索するために入力します"] } } }, { "l": "ja-JP", "t": {} }, { "l": "ko", "t": { "Add to a project": { "v": ["프로젝트에 추가"] }, "Connect items to a project to make them easier to find": { "v": ["항목을 더 쉽게 찾을 수 있도록 프로젝트에 연결하세요."] }, "Failed to add the item to the project": { "v": ["항목을 프로젝트에 추가하는 데 실패함"] }, "Failed to create a project": { "v": ["프로젝트를 만드는 데 실패함"] }, "Failed to rename the project": { "v": ["프로젝트의 이름을 바꾸는 데 실패함"] }, "Type to search for existing projects": { "v": ["입력하여 프로젝트를 검색"] } } }, { "l": "lt-LT", "t": {} }, { "l": "lv", "t": {} }, { "l": "mk", "t": {} }, { "l": "my", "t": {} }, { "l": "nb", "t": { "Add to a project": { "v": ["Legge til i et prosjekt"] }, "Connect items to a project to make them easier to find": { "v": ["Koble elementer til et prosjekt for å gjøre det enklere å finne dem"] }, "Failed to add the item to the project": { "v": ["Kan ikke legge til elementet i prosjektet"] }, "Failed to create a project": { "v": ["Kan ikke opprette et prosjekt"] }, "Failed to rename the project": { "v": ["Kunne ikke gi prosjektet nytt navn"] }, "Type to search for existing projects": { "v": ["Skriv for å søke for eksisterende prosjekter"] } } }, { "l": "nl", "t": { "Add to a project": { "v": ["Toevoegen aan een project"] }, "Connect items to a project to make them easier to find": { "v": ["Vebind items aan een project zodat ze eenvoudiger te vinden zijn"] }, "Failed to add the item to the project": { "v": ["Toevoegen van item aan project mislukt"] }, "Failed to create a project": { "v": ["Aanmaken project mislukt"] }, "Failed to rename the project": { "v": ["Hernoemen project mislukt"] }, "Type to search for existing projects": { "v": ["Type om naar bestaande projecten te zoeken"] } } }, { "l": "oc", "t": {} }, { "l": "pl", "t": { "Add to a project": { "v": ["Dodaj do projektu"] }, "Connect items to a project to make them easier to find": { "v": ["Połącz elementy z projektem, aby ułatwić ich znalezienie"] }, "Failed to add the item to the project": { "v": ["Nie udało się dodać elementu do projektu"] }, "Failed to create a project": { "v": ["Nie udało się utworzyć projektu"] }, "Failed to rename the project": { "v": ["Nie udało się zmienić nazwy projektu"] }, "Type to search for existing projects": { "v": ["Wpisz, aby wyszukać istniejące projekty"] } } }, { "l": "pt-BR", "t": { "Add to a project": { "v": ["Adicionar a um projeto"] }, "Connect items to a project to make them easier to find": { "v": ["Conectar itens a um projeto para encontrá-los mais facilmente"] }, "Failed to add the item to the project": { "v": ["Falha ao adicionar itens ao projeto"] }, "Failed to create a project": { "v": ["Falha ao criar um projeto"] }, "Failed to rename the project": { "v": ["Falha ao renomear o projeto"] }, "Type to search for existing projects": { "v": ["Digite para pesquisar por projetos existentes"] } } }, { "l": "pt-PT", "t": { "Add to a project": { "v": ["Adicionar a um projeto"] }, "Connect items to a project to make them easier to find": { "v": ["Ligar itens a um projeto para serem mais facilmente encontrados"] }, "Failed to add the item to the project": { "v": ["Não foi possível adicionar item ao projeto"] }, "Failed to create a project": { "v": ["Não foi possível criar um projeto"] }, "Failed to rename the project": { "v": ["Não foi possível alterar o nome do projeto"] }, "Type to search for existing projects": { "v": ["Digite para procurar projetos existentes"] } } }, { "l": "ro", "t": {} }, { "l": "ru", "t": { "Add to a project": { "v": ["Добавить в проект"] }, "Connect items to a project to make them easier to find": { "v": ["Подключайте элементы к проекту, чтобы их было легче найти"] }, "Failed to add the item to the project": { "v": ["Не удалось добавить элемент в проект"] }, "Failed to create a project": { "v": ["Не удалось создать проект"] }, "Failed to rename the project": { "v": ["Не удалось переименовать проект"] }, "Type to search for existing projects": { "v": ["Введите для поиска существующих проектов"] } } }, { "l": "sk", "t": { "Add to a project": { "v": ["Pridať do projektu"] }, "Connect items to a project to make them easier to find": { "v": ["Pridať položky do projektu pre jednoduchšie vyhľadávanie"] }, "Failed to add the item to the project": { "v": ["Nepodarilo sa pridať položku do projektu"] }, "Failed to create a project": { "v": ["Nepodarilo sa vytvoriť projekt"] }, "Failed to rename the project": { "v": ["Nepodarilo sa premenovať projekt"] }, "Type to search for existing projects": { "v": ["Začnite písať pre vyhľadávanie v existujúcich projektoch"] } } }, { "l": "sl", "t": {} }, { "l": "sr", "t": { "Add to a project": { "v": ["Додај у пројекат"] }, "Connect items to a project to make them easier to find": { "v": ["Повезује ставке у пројекат како би се лакше пронашле"] }, "Failed to add the item to the project": { "v": ["Није успело додавање ставке у пројекат"] }, "Failed to create a project": { "v": ["Није успело креирање пројекта"] }, "Failed to rename the project": { "v": ["Није успела промена имена пројекта"] }, "Type to search for existing projects": { "v": ["Куцајте да претражите постојеће пројекте"] } } }, { "l": "sv", "t": { "Add to a project": { "v": ["Lägg till i ett projekt"] }, "Connect items to a project to make them easier to find": { "v": ["Anslut objekt till ett projekt för att göra dem lättare att hitta"] }, "Failed to add the item to the project": { "v": ["Det gick inte att lägga till objektet i projektet"] }, "Failed to create a project": { "v": ["Det gick inte att skapa ett projekt"] }, "Failed to rename the project": { "v": ["Kunde inte byta namn på projektet"] }, "Type to search for existing projects": { "v": ["Skriv för att söka efter befintliga projekt"] } } }, { "l": "tr", "t": { "Add to a project": { "v": ["Bir projeye ekle"] }, "Connect items to a project to make them easier to find": { "v": ["Ögeleri daha kolay bulmak için bir proje ile ilişkilendirin"] }, "Failed to add the item to the project": { "v": ["Öge projeye eklenemedi"] }, "Failed to create a project": { "v": ["Bir proje oluşturulamadı"] }, "Failed to rename the project": { "v": ["Proje yeniden adlandırılamadı"] }, "Type to search for existing projects": { "v": ["Var olan projeleri aramak için yazmaya başlayın"] } } }, { "l": "uk", "t": { "Add to a project": { "v": ["Додати др проєкту"] }, "Connect items to a project to make them easier to find": { "v": ["Приєднайте ресурси до проєкту для швидшого  пошуку"] }, "Failed to add the item to the project": { "v": ["Не вдалося приєднати ресурс до проєкту"] }, "Failed to create a project": { "v": ["Не вдалося створити проєкт"] }, "Failed to rename the project": { "v": ["Не вдалося перейменувати проєкт"] }, "Type to search for existing projects": { "v": ["Почніть вводити, щоб знайти проєкт"] } } }, { "l": "uz", "t": { "Add to a project": { "v": ["Loyihaga qo'shish"] }, "Connect items to a project to make them easier to find": { "v": ["Elementlarni topishni osonlashtirish uchun ularni loyihaga ulang"] }, "Failed to add the item to the project": { "v": ["Ob'ektni loyihaga qo'shib bo'lmadi"] }, "Failed to create a project": { "v": ["Loyiha yaratib bo‘lmadi"] }, "Failed to rename the project": { "v": ["Loyiha nomini o‘zgartirib bo‘lmadi"] }, "Type to search for existing projects": { "v": ["Mavjud loyihalarni qidirish uchun kiriting"] } } }, { "l": "zh-CN", "t": { "Add to a project": { "v": ["添加至一个项目"] }, "Connect items to a project to make them easier to find": { "v": ["将条目连接至一个项目以易于查找"] }, "Failed to add the item to the project": { "v": ["添加条目至项目失败"] }, "Failed to create a project": { "v": ["创建项目失败"] }, "Failed to rename the project": { "v": ["重命名项目失败"] }, "Type to search for existing projects": { "v": ["输入以搜索现存项目"] } } }, { "l": "zh-HK", "t": { "Add to a project": { "v": ["添加到方案中"] }, "Connect items to a project to make them easier to find": { "v": ["將項目連接到方案中，以便更容易找到。"] }, "Failed to add the item to the project": { "v": ["無法將項目添加到方案中"] }, "Failed to create a project": { "v": ["無法創建方案"] }, "Failed to rename the project": { "v": ["無法重命名方案"] }, "Type to search for existing projects": { "v": ["輸入以搜索現有方案"] } } }, { "l": "zh-TW", "t": {} }];
const t8 = [{ "l": "ar", "t": { "Any link": { "v": ["أيَّ رابط"] } } }, { "l": "ast", "t": { "Any link": { "v": ["Cualesquier enllaz"] } } }, { "l": "br", "t": {} }, { "l": "ca", "t": {} }, { "l": "cs", "t": { "Any link": { "v": ["Jakýkoli odkaz"] } } }, { "l": "cs-CZ", "t": { "Any link": { "v": ["Jakýkoli odkaz"] } } }, { "l": "da", "t": { "Any link": { "v": ["Ethvert link"] } } }, { "l": "de", "t": { "Any link": { "v": ["Irgendein Link"] } } }, { "l": "de-DE", "t": { "Any link": { "v": ["Irgendein Link"] } } }, { "l": "el", "t": { "Any link": { "v": ["Οποιοσδήποτε σύνδεσμος"] } } }, { "l": "en-GB", "t": { "Any link": { "v": ["Any link"] } } }, { "l": "eo", "t": {} }, { "l": "es", "t": { "Any link": { "v": ["Cualquier enlace"] } } }, { "l": "es-AR", "t": { "Any link": { "v": ["Cualquier enlace"] } } }, { "l": "es-EC", "t": { "Any link": { "v": ["Cualquier enlace"] } } }, { "l": "es-MX", "t": { "Any link": { "v": ["Cualquier enlace"] } } }, { "l": "et-EE", "t": { "Any link": { "v": ["Mistahes link"] } } }, { "l": "eu", "t": { "Any link": { "v": ["Edozein esteka"] } } }, { "l": "fa", "t": { "Any link": { "v": ["هر پیوندی"] } } }, { "l": "fi", "t": { "Any link": { "v": ["Mikä tahansa linkki"] } } }, { "l": "fr", "t": { "Any link": { "v": ["N'importe quel lien"] } } }, { "l": "ga", "t": { "Any link": { "v": ["Aon nasc"] } } }, { "l": "gl", "t": { "Any link": { "v": ["Calquera ligazón"] } } }, { "l": "he", "t": { "Any link": { "v": ["קישור כלשהו"] } } }, { "l": "hu", "t": {} }, { "l": "id", "t": { "Any link": { "v": ["Semua tautan"] } } }, { "l": "is", "t": { "Any link": { "v": ["Einhver tengill"] } } }, { "l": "it", "t": { "Any link": { "v": ["Qualsiasi link"] } } }, { "l": "ja", "t": { "Any link": { "v": ["任意のリンク"] } } }, { "l": "ja-JP", "t": { "Any link": { "v": ["任意のリンク"] } } }, { "l": "ko", "t": { "Any link": { "v": ["아무 링크"] } } }, { "l": "lt-LT", "t": {} }, { "l": "lv", "t": {} }, { "l": "mk", "t": {} }, { "l": "my", "t": {} }, { "l": "nb", "t": { "Any link": { "v": ["Enhver lenke"] } } }, { "l": "nl", "t": { "Any link": { "v": ["Elke link"] } } }, { "l": "oc", "t": {} }, { "l": "pl", "t": { "Any link": { "v": ["Dowolny link"] } } }, { "l": "pt-BR", "t": { "Any link": { "v": ["Qualquer link"] } } }, { "l": "pt-PT", "t": { "Any link": { "v": ["Qualquer hiperligação"] } } }, { "l": "ro", "t": { "Any link": { "v": ["Orice link"] } } }, { "l": "ru", "t": { "Any link": { "v": ["Любая ссылка"] } } }, { "l": "sk", "t": { "Any link": { "v": ["Akýkoľvek odkaz"] } } }, { "l": "sl", "t": {} }, { "l": "sr", "t": { "Any link": { "v": ["Било који линк"] } } }, { "l": "sv", "t": { "Any link": { "v": ["Vilken länk som helst"] } } }, { "l": "tr", "t": { "Any link": { "v": ["Herhangi bir bağlantı"] } } }, { "l": "uk", "t": { "Any link": { "v": ["Будь-яке посилання"] } } }, { "l": "uz", "t": { "Any link": { "v": ["Har qanday havola"] } } }, { "l": "zh-CN", "t": { "Any link": { "v": ["任何链接"] } } }, { "l": "zh-HK", "t": { "Any link": { "v": ["任何連結"] } } }, { "l": "zh-TW", "t": { "Any link": { "v": ["任何連結"] } } }];
const t9 = [{ "l": "ar", "t": { "Anything shared with the same group of people will show up here": { "v": ["أيّ مادة تمت مشاركتها مع نفس المجموعة من الأشخاص سيتم عرضها هنا"] }, "Error getting related resources. Please contact your system administrator if you have any questions.": { "v": ["خطأ في الحصول على الموارد ذات الصلة. يرجى الاتصال بمشرف النظام عندك إذا كان لديك أيّ أسئلة."] }, "Related resources": { "v": ["مصادر ذات صلة"] } } }, { "l": "ast", "t": { "Anything shared with the same group of people will show up here": { "v": ["Equí va apaecer tolo que compartas col mesmu grupu de persones"] }, "Error getting related resources. Please contact your system administrator if you have any questions.": { "v": ["Hebo un error al consiguir los recursos rellacionaos. Ponte en contautu col alministrador del sistema si tienes dalguna entruga."] }, "Related resources": { "v": ["Recursos rellacionao"] } } }, { "l": "br", "t": {} }, { "l": "ca", "t": { "Anything shared with the same group of people will show up here": { "v": ["Qualsevol cosa compartida amb el mateix grup de persones es mostrarà aquí"] }, "Related resources": { "v": ["Recursos relacionats"] } } }, { "l": "cs", "t": { "Anything shared with the same group of people will show up here": { "v": ["Cokoli nasdíleného stejné skupině lidí se zobrazí zde"] }, "Error getting related resources. Please contact your system administrator if you have any questions.": { "v": ["Chyba při získávání souvisejících prostředků. Pokud máte jakékoli dotazy, obraťte se na správce vámi využívaného systému."] }, "Related resources": { "v": ["Související prostředky"] } } }, { "l": "cs-CZ", "t": { "Anything shared with the same group of people will show up here": { "v": ["Cokoli nasdíleného stejné skupině lidí se zobrazí zde"] }, "Error getting related resources. Please contact your system administrator if you have any questions.": { "v": ["Chyba při získávání souvisejících prostředků. Pokud máte jakékoli dotazy, obraťte se na správce vámi využívaného systému."] }, "Related resources": { "v": ["Související prostředky"] } } }, { "l": "da", "t": { "Anything shared with the same group of people will show up here": { "v": ["Alt der deles med samme gruppe af personer vil vises her"] }, "Error getting related resources. Please contact your system administrator if you have any questions.": { "v": ["Fejl ved hentning af relaterede ressourcer. Kontakt venligst din systemadministrator, hvis du har spørgsmål."] }, "Related resources": { "v": ["Relaterede emner"] } } }, { "l": "de", "t": { "Anything shared with the same group of people will show up here": { "v": ["Alles, das mit derselben Gruppe von Personen geteilt wird, wird hier angezeigt"] }, "Error getting related resources. Please contact your system administrator if you have any questions.": { "v": ["Fehler beim Abrufen verwandter Ressourcen. Bei Fragen wende dich bitte an deinen Systemadministrator."] }, "Related resources": { "v": ["Verwandte Ressourcen"] } } }, { "l": "de-DE", "t": { "Anything shared with the same group of people will show up here": { "v": ["Alles, das mit derselben Gruppe von Personen geteilt wird, wird hier angezeigt"] }, "Error getting related resources. Please contact your system administrator if you have any questions.": { "v": ["Fehler beim Abrufen verwandter Ressourcen. Bei Fragen wenden Sie sich bitte an Ihre Systemadministration."] }, "Related resources": { "v": ["Verwandte Ressourcen"] } } }, { "l": "el", "t": { "Anything shared with the same group of people will show up here": { "v": ["Οτιδήποτε μοιράζεται με την ίδια ομάδα ατόμων θα εμφανίζεται εδώ"] }, "Error getting related resources. Please contact your system administrator if you have any questions.": { "v": ["Σφάλμα λήψης σχετικών πόρων. Παρακαλούμε επικοινωνήστε με τον διαχειριστή του συστήματός σας εάν έχετε οποιεσδήποτε ερωτήσεις."] }, "Related resources": { "v": ["Σχετικοί πόροι"] } } }, { "l": "en-GB", "t": { "Anything shared with the same group of people will show up here": { "v": ["Anything shared with the same group of people will show up here"] }, "Error getting related resources. Please contact your system administrator if you have any questions.": { "v": ["Error getting related resources. Please contact your system administrator if you have any questions."] }, "Related resources": { "v": ["Related resources"] } } }, { "l": "eo", "t": {} }, { "l": "es", "t": { "Anything shared with the same group of people will show up here": { "v": ["Cualquier cosa que esté compartida con el mismo grupo de personas se mostrará aquí"] }, "Error getting related resources. Please contact your system administrator if you have any questions.": { "v": ["Error al obtener recursos relacionados. Por favor, contacte a su administrador del sistema si tiene alguna pregunta."] }, "Related resources": { "v": ["Recursos relacionados"] } } }, { "l": "es-AR", "t": { "Anything shared with the same group of people will show up here": { "v": ["Cualquier cosa compartida con el mismo grupo de personas aparecerá aquí."] }, "Error getting related resources. Please contact your system administrator if you have any questions.": { "v": ["Error al obtener recursos relacionados. Por favor, contacte a su administrador del sistema si tiene alguna pregunta."] }, "Related resources": { "v": ["Recursos relacionados"] } } }, { "l": "es-EC", "t": { "Anything shared with the same group of people will show up here": { "v": ["Cualquier cosa compartida con el mismo grupo de personas aparecerá aquí."] }, "Error getting related resources. Please contact your system administrator if you have any questions.": { "v": ["Error al obtener recursos relacionados. Por favor, contacta a tu administrador del sistema si tienes alguna pregunta."] }, "Related resources": { "v": ["Recursos relacionados"] } } }, { "l": "es-MX", "t": { "Anything shared with the same group of people will show up here": { "v": ["Todo lo que se comparta con el mismo grupo de personas se mostrará aquí"] }, "Error getting related resources. Please contact your system administrator if you have any questions.": { "v": ["Error al obtener recursos relacionados. Por favor contacte al administrador si tiene alguna pregunta."] }, "Related resources": { "v": ["Recursos relacionados"] } } }, { "l": "et-EE", "t": { "Anything shared with the same group of people will show up here": { "v": ["Kõik, mida jagatakse sama grupi inimestega, kuvatakse siin."] }, "Error getting related resources. Please contact your system administrator if you have any questions.": { "v": ["Viga seotud ressursside saamisel. Küsimuste korral võtke ühendust oma süsteemiadministraatoriga."] }, "Related resources": { "v": ["Seotud ressursid"] } } }, { "l": "eu", "t": { "Anything shared with the same group of people will show up here": { "v": ["Pertsona-talde berarekin partekatutako edozer agertuko da hemen"] }, "Error getting related resources. Please contact your system administrator if you have any questions.": { "v": ["Errore bat gertatu da erlazionatutako baliabideak eskuratzean. Jarri harremanetan zure sistemaren administratzailearekin galderarik baduzu."] }, "Related resources": { "v": ["Erlazionatutako baliabideak"] } } }, { "l": "fa", "t": { "Anything shared with the same group of people will show up here": { "v": ["هر چیزی که با گروه مشابهی هم‌رسانی شود در این قسمت نمایش می‌یابد"] }, "Error getting related resources. Please contact your system administrator if you have any questions.": { "v": ["خطا در دریافت منابع مرتبط. لطفاً در صورت داشتن هر گونه سؤال با مدیر سیستم خود تماس بگیرید."] }, "Related resources": { "v": ["منابع مرتبط"] } } }, { "l": "fi", "t": { "Anything shared with the same group of people will show up here": { "v": ["Kaikki saman ryhmän kesken jaettu näkyy tässä"] }, "Error getting related resources. Please contact your system administrator if you have any questions.": { "v": ["Virhe resurssien haussa. Ota yhteyttä järjestelmän ylläpitäjään, mikäli sinulla on kysyttävää."] }, "Related resources": { "v": ["Liittyvät resurssit"] } } }, { "l": "fr", "t": { "Anything shared with the same group of people will show up here": { "v": ["Tout ce qui est partagé avec le même groupe de personnes apparaîtra ici"] }, "Error getting related resources. Please contact your system administrator if you have any questions.": { "v": ["Erreur lors de la récupération des ressources liées. Contactez votre administrateur système pour répondre à vos éventuelles questions."] }, "Related resources": { "v": ["Ressources liées"] } } }, { "l": "ga", "t": { "Anything shared with the same group of people will show up here": { "v": ["Taispeánfar aon rud a roinntear leis an ngrúpa céanna daoine anseo"] }, "Error getting related resources. Please contact your system administrator if you have any questions.": { "v": ["Earráid agus acmhainní gaolmhara á bhfáil. Déan teagmháil le riarthóir do chórais má tá aon cheist agat."] }, "Related resources": { "v": ["Acmhainní gaolmhara"] } } }, { "l": "gl", "t": { "Anything shared with the same group of people will show up here": { "v": ["Todo o que se comparta co mesmo grupo de persoas aparecerá aquí"] }, "Error getting related resources. Please contact your system administrator if you have any questions.": { "v": ["Produciuse un erro ao obter os recursos relacionados. Póñase en contacto coa administración do seu sistema se ten algunha dúbida."] }, "Related resources": { "v": ["Recursos relacionados"] } } }, { "l": "he", "t": { "Anything shared with the same group of people will show up here": { "v": ["כל מה שמשותף עם אותה קבוצת האנשים יופיע כאן"] }, "Error getting related resources. Please contact your system administrator if you have any questions.": { "v": ["שגיאה בקבלת המשאבים הקשורים. נא ליצור קשר עם הנהלת המערכת אם יש לך שאלות."] }, "Related resources": { "v": ["משאבים קשורים"] } } }, { "l": "hu", "t": { "Anything shared with the same group of people will show up here": { "v": ["Minden, amit ugyanazzal a csoporttal oszt meg, itt fog megjelenni"] }, "Related resources": { "v": ["Kapcsolódó erőforrások"] } } }, { "l": "id", "t": { "Anything shared with the same group of people will show up here": { "v": ["Apa pun yang dibagikan dengan grup orang yang sama akan muncul di sini"] }, "Error getting related resources. Please contact your system administrator if you have any questions.": { "v": ["Kesalahan saat mengambil sumber daya terkait. Hubungi administrator sistem Anda jika ada pertanyaan."] }, "Related resources": { "v": ["Sumber daya terkait"] } } }, { "l": "is", "t": { "Anything shared with the same group of people will show up here": { "v": ["Allt sem deilt er með sama hópi fólks mun birtast hér"] }, "Error getting related resources. Please contact your system administrator if you have any questions.": { "v": ["Villa við að sækja tengd tilföng. Hafðu samband við kerfisstjórann þinn ef þú ert með einhverjar spurningar."] }, "Related resources": { "v": ["Tengd tilföng"] } } }, { "l": "it", "t": { "Anything shared with the same group of people will show up here": { "v": ["Tutto ciò che è stato condiviso con lo stesso gruppo di persone viene visualizzato qui"] }, "Error getting related resources. Please contact your system administrator if you have any questions.": { "v": ["Errore nell'ottenere le risorse correlate. Per qualsiasi domanda, contattare l'amministratore di sistema."] }, "Related resources": { "v": ["Risorse correlate"] } } }, { "l": "ja", "t": { "Anything shared with the same group of people will show up here": { "v": ["同じグループで共有しているものは、全てここに表示されます"] }, "Error getting related resources. Please contact your system administrator if you have any questions.": { "v": ["関連リソースの取得エラー。ご不明な点がございましたら、システム管理者にお問い合わせください。"] }, "Related resources": { "v": ["関連リソース"] } } }, { "l": "ja-JP", "t": { "Anything shared with the same group of people will show up here": { "v": ["同じグループで共有しているものは、全てここに表示されます"] }, "Error getting related resources. Please contact your system administrator if you have any questions.": { "v": ["関連リソースの取得エラー。ご不明な点がございましたら、システム管理者にお問い合わせください。"] }, "Related resources": { "v": ["関連リソース"] } } }, { "l": "ko", "t": { "Anything shared with the same group of people will show up here": { "v": ["같은 그룹의 사용자와 공유된 모든 것들이 이곳에 나타납니다."] }, "Error getting related resources. Please contact your system administrator if you have any questions.": { "v": ["관련 리소스를 가져오는 중 오류가 발생했습니다. 궁금한 것이 있는 경우 시스템 관리자에게 연락해 주세요."] }, "Related resources": { "v": ["관련 리소스"] } } }, { "l": "lt-LT", "t": {} }, { "l": "lv", "t": {} }, { "l": "mk", "t": {} }, { "l": "my", "t": {} }, { "l": "nb", "t": { "Anything shared with the same group of people will show up here": { "v": ["Alt som er delt med den samme gruppen vil vises her"] }, "Error getting related resources. Please contact your system administrator if you have any questions.": { "v": ["Feil ved henting av relaterte ressurser. Kontakt systemansvarlig hvis du har spørsmål."] }, "Related resources": { "v": ["Relaterte ressurser"] } } }, { "l": "nl", "t": { "Anything shared with the same group of people will show up here": { "v": ["Alles dat gedeeld is met dezelfde groep mensen zal hier getoond worden"] }, "Error getting related resources. Please contact your system administrator if you have any questions.": { "v": ["Fout bij het verkrijgen van resources. Neem a.u.b. contact op met uw systeembeheerder als u vragen heeft."] }, "Related resources": { "v": ["Gerelateerde bronnen"] } } }, { "l": "oc", "t": {} }, { "l": "pl", "t": { "Anything shared with the same group of people will show up here": { "v": ["Tutaj pojawi się wszystko, co zostało udostępnione tej samej grupie osób"] }, "Error getting related resources. Please contact your system administrator if you have any questions.": { "v": ["Błąd podczas pobierania powiązanych zasobów. Jeśli masz jakiekolwiek pytania, skontaktuj się z administratorem systemu."] }, "Related resources": { "v": ["Powiązane zasoby"] } } }, { "l": "pt-BR", "t": { "Anything shared with the same group of people will show up here": { "v": ["Qualquer coisa compartilhada com o mesmo grupo de pessoas aparecerá aqui"] }, "Error getting related resources. Please contact your system administrator if you have any questions.": { "v": ["Erro ao obter recursos relacionados. Por favor entre em contato com o administrador do sistema se tiver alguma dúvida."] }, "Related resources": { "v": ["Recursos relacionados"] } } }, { "l": "pt-PT", "t": { "Anything shared with the same group of people will show up here": { "v": ["Qualquer coisa partilhada com o mesmo grupo de pessoas irá aparecer aqui"] }, "Error getting related resources. Please contact your system administrator if you have any questions.": { "v": ["Erro ao obter os recursos relacionados. Por favor, contacte o administrador do sistema se tiver quaisquer  perguntas."] }, "Related resources": { "v": ["Recursos relacionados"] } } }, { "l": "ro", "t": { "Anything shared with the same group of people will show up here": { "v": ["Tot ceea ce este partajat cu același grup de persoane va fi afișat aici"] }, "Error getting related resources. Please contact your system administrator if you have any questions.": { "v": ["Eroare la preluarea resurselor adiționale. Vă rugăm să contactați administratorul pentru întrebări."] }, "Related resources": { "v": ["Resurse legate"] } } }, { "l": "ru", "t": { "Anything shared with the same group of people will show up here": { "v": ["Всё, чем поделились с той же группой людей, будет отображаться здесь"] }, "Error getting related resources. Please contact your system administrator if you have any questions.": { "v": ["Ошибка при получении связанных ресурсов. Если у вас есть какие-либо вопросы, обратитесь к системному администратору."] }, "Related resources": { "v": ["Связанные ресурсы"] } } }, { "l": "sk", "t": { "Anything shared with the same group of people will show up here": { "v": ["Tu sa zobrazí čokoľvek zdieľané s rovnakou skupinou ľudí"] }, "Error getting related resources. Please contact your system administrator if you have any questions.": { "v": ["Chyba pri získavaní súvisiacich zdrojov. V prípade otázok kontaktujte prosím svojho systemového administrátora."] }, "Related resources": { "v": ["Súvisiace zdroje"] } } }, { "l": "sl", "t": { "Related resources": { "v": ["Povezani viri"] } } }, { "l": "sr", "t": { "Anything shared with the same group of people will show up here": { "v": ["Све што се дели са истом групом људи ће се појавити овде"] }, "Error getting related resources. Please contact your system administrator if you have any questions.": { "v": ["Грешка код прибављања везаних ресурса. Молимо вас да се обратите администратору ако имате питања."] }, "Related resources": { "v": ["Повезани ресурси"] } } }, { "l": "sv", "t": { "Anything shared with the same group of people will show up here": { "v": ["Något som delats med samma grupp av personer kommer att visas här"] }, "Error getting related resources. Please contact your system administrator if you have any questions.": { "v": ["Det gick inte att hämta relaterade resurser. Kontakta din systemadministratör om du har några frågor."] }, "Related resources": { "v": ["Relaterade resurser"] } } }, { "l": "tr", "t": { "Anything shared with the same group of people will show up here": { "v": ["Aynı kişi grubu ile paylaşılan herşey burada görüntülenir"] }, "Error getting related resources. Please contact your system administrator if you have any questions.": { "v": ["İlgili kaynaklara ulaşılırken sorun çıktı. Herhangi bir sorunuz varsa lütfen sistem yöneticiniz ile görüşün "] }, "Related resources": { "v": ["İlgili kaynaklar"] } } }, { "l": "uk", "t": { "Anything shared with the same group of people will show up here": { "v": ["Будь-що доступне для цієї же групи людей буде показано тут"] }, "Error getting related resources. Please contact your system administrator if you have any questions.": { "v": ["Помилка під час отримання пов'язаних ресурсів. Будь ласка, сконтактуйте з системним адміністратором, якщо у вас виникли запитання."] }, "Related resources": { "v": ["Пов'язані ресурси"] } } }, { "l": "uz", "t": { "Anything shared with the same group of people will show up here": { "v": ["Xuddi shu guruhdagi odamlarga ulashilgan hamma narsa shu yerda chiqadi"] }, "Error getting related resources. Please contact your system administrator if you have any questions.": { "v": ["Tegishli manbalarni olishda xatolik yuz berdi. Savollaringiz bo'lsa, tizim administratoriga murojaat qiling."] }, "Related resources": { "v": ["Tegishli manbalar"] } } }, { "l": "zh-CN", "t": { "Anything shared with the same group of people will show up here": { "v": ["与同组用户分享的所有内容都会显示于此"] }, "Error getting related resources. Please contact your system administrator if you have any questions.": { "v": ["获取相关资源出现错误。如果你有任何问题，请联系系统管理员。"] }, "Related resources": { "v": ["相关资源"] } } }, { "l": "zh-HK", "t": { "Anything shared with the same group of people will show up here": { "v": ["與同一組人共享的任何內容都會顯示在此處"] }, "Error getting related resources. Please contact your system administrator if you have any questions.": { "v": ["取得相關資源時發生錯誤。如果有任何問題，請聯絡系統管理員。"] }, "Related resources": { "v": ["相關資源"] } } }, { "l": "zh-TW", "t": { "Anything shared with the same group of people will show up here": { "v": ["與相同群組分享的所有內容都會顯示於此"] }, "Error getting related resources. Please contact your system administrator if you have any questions.": { "v": ["取得相關資源時發生錯誤。如果有任何問題，請聯絡系統管理員。"] }, "Related resources": { "v": ["相關資源"] } } }];
const t10 = [{ "l": "ar", "t": { "Avatar of {displayName}": { "v": ["صورة الملف الشخصي الرمزية لــ {displayName}  "] }, "Avatar of {displayName}, {status}": { "v": ["صورة الملف الشخصي الرمزية لــ {displayName}، {status}"] } } }, { "l": "ast", "t": { "Avatar of {displayName}": { "v": ["Avatar de: {displayName}"] }, "Avatar of {displayName}, {status}": { "v": ["Avatar de: {displayName}, {status}"] } } }, { "l": "br", "t": {} }, { "l": "ca", "t": { "Avatar of {displayName}": { "v": ["Avatar de {displayName}"] }, "Avatar of {displayName}, {status}": { "v": ["Avatar de {displayName}, {status}"] } } }, { "l": "cs", "t": { "Avatar of {displayName}": { "v": ["Zástupný obrázek uživatele {displayName}"] }, "Avatar of {displayName}, {status}": { "v": ["Zástupný obrázek uživatele {displayName}, {status}"] } } }, { "l": "cs-CZ", "t": { "Avatar of {displayName}": { "v": ["Zástupný obrázek uživatele {displayName}"] }, "Avatar of {displayName}, {status}": { "v": ["Zástupný obrázek uživatele {displayName}, {status}"] } } }, { "l": "da", "t": { "Avatar of {displayName}": { "v": ["Avatar af {displayName}"] }, "Avatar of {displayName}, {status}": { "v": ["Avatar af {displayName}, {status}"] } } }, { "l": "de", "t": { "Avatar of {displayName}": { "v": ["Avatar von {displayName}"] }, "Avatar of {displayName}, {status}": { "v": ["Avatar von {displayName}, {status}"] } } }, { "l": "de-DE", "t": { "Avatar of {displayName}": { "v": ["Avatar von {displayName}"] }, "Avatar of {displayName}, {status}": { "v": ["Avatar von {displayName}, {status}"] } } }, { "l": "el", "t": { "Avatar of {displayName}": { "v": ["Άβαταρ του {displayName}"] }, "Avatar of {displayName}, {status}": { "v": ["Άβαταρ του {displayName}, {status}"] } } }, { "l": "en-GB", "t": { "Avatar of {displayName}": { "v": ["Avatar of {displayName}"] }, "Avatar of {displayName}, {status}": { "v": ["Avatar of {displayName}, {status}"] } } }, { "l": "eo", "t": {} }, { "l": "es", "t": { "Avatar of {displayName}": { "v": ["Avatar de {displayName}"] }, "Avatar of {displayName}, {status}": { "v": ["Avatar de {displayName}, {status}"] } } }, { "l": "es-AR", "t": { "Avatar of {displayName}": { "v": ["Avatar de {displayName}"] }, "Avatar of {displayName}, {status}": { "v": ["Avatar de {displayName}, {status}"] } } }, { "l": "es-EC", "t": { "Avatar of {displayName}": { "v": ["Avatar de {displayName}"] }, "Avatar of {displayName}, {status}": { "v": ["Avatar de {displayName}, {status}"] } } }, { "l": "es-MX", "t": { "Avatar of {displayName}": { "v": ["Avatar de {displayName}"] }, "Avatar of {displayName}, {status}": { "v": ["Avatar de {displayName}, {status}"] } } }, { "l": "et-EE", "t": { "Avatar of {displayName}": { "v": ["Avatar {displayName}"] }, "Avatar of {displayName}, {status}": { "v": ["Avatar {displayName}, {status}"] } } }, { "l": "eu", "t": { "Avatar of {displayName}": { "v": ["{displayName}-(e)n irudia"] }, "Avatar of {displayName}, {status}": { "v": ["{displayName} -(e)n irudia, {status}"] } } }, { "l": "fa", "t": { "Avatar of {displayName}": { "v": ["آواتار {displayName}"] }, "Avatar of {displayName}, {status}": { "v": ["آواتار {displayName} ، {status}"] } } }, { "l": "fi", "t": { "Avatar of {displayName}": { "v": ["{displayName}n avatar"] }, "Avatar of {displayName}, {status}": { "v": ["{displayName}n avatar, {status}"] } } }, { "l": "fr", "t": { "Avatar of {displayName}": { "v": ["Avatar de {displayName}"] }, "Avatar of {displayName}, {status}": { "v": ["Avatar de {displayName}, {status}"] } } }, { "l": "ga", "t": { "Avatar of {displayName}": { "v": ["Avatar de {displayName}"] }, "Avatar of {displayName}, {status}": { "v": ["Avatar de {displayName}, {status}"] } } }, { "l": "gl", "t": { "Avatar of {displayName}": { "v": ["Avatar de {displayName}"] }, "Avatar of {displayName}, {status}": { "v": ["Avatar de {displayName}, {status}"] } } }, { "l": "he", "t": { "Avatar of {displayName}": { "v": ["תמונה ייצוגית של {displayName}"] }, "Avatar of {displayName}, {status}": { "v": ["תמונה ייצוגית של {displayName}, {status}"] } } }, { "l": "hu", "t": { "Avatar of {displayName}": { "v": ["{displayName} profilképe"] }, "Avatar of {displayName}, {status}": { "v": ["{displayName} profilképe, {status}"] } } }, { "l": "id", "t": { "Avatar of {displayName}": { "v": ["Avatar {displayName}"] }, "Avatar of {displayName}, {status}": { "v": ["Avatar {displayName}, {status}"] } } }, { "l": "is", "t": { "Avatar of {displayName}": { "v": ["Auðkennismynd fyrir {displayName}"] }, "Avatar of {displayName}, {status}": { "v": ["Auðkennismynd fyrir {displayName}, {status}"] } } }, { "l": "it", "t": { "Avatar of {displayName}": { "v": ["Avatar di {displayName}"] }, "Avatar of {displayName}, {status}": { "v": ["Avatar di {displayName}, {status}"] } } }, { "l": "ja", "t": { "Avatar of {displayName}": { "v": ["{displayName} のアバター"] }, "Avatar of {displayName}, {status}": { "v": ["{displayName}, {status} のアバター"] } } }, { "l": "ja-JP", "t": { "Avatar of {displayName}": { "v": ["{displayName} のアバター"] }, "Avatar of {displayName}, {status}": { "v": ["{displayName}, {status} のアバター"] } } }, { "l": "ko", "t": { "Avatar of {displayName}": { "v": ["{displayName}님의 아바타"] }, "Avatar of {displayName}, {status}": { "v": ["{displayName}, {status}님의 아바타"] } } }, { "l": "lt-LT", "t": {} }, { "l": "lv", "t": {} }, { "l": "mk", "t": { "Avatar of {displayName}": { "v": ["Аватар на {displayName}"] }, "Avatar of {displayName}, {status}": { "v": ["Аватар на {displayName}, {status}"] } } }, { "l": "my", "t": { "Avatar of {displayName}": { "v": ["{displayName} ၏ ကိုယ်ပွား"] } } }, { "l": "nb", "t": { "Avatar of {displayName}": { "v": ["Avataren til {displayName}"] }, "Avatar of {displayName}, {status}": { "v": ["{displayName}'s avatar, {status}"] } } }, { "l": "nl", "t": { "Avatar of {displayName}": { "v": ["Avatar van {displayName}"] }, "Avatar of {displayName}, {status}": { "v": ["Avatar van {displayName}, {status}"] } } }, { "l": "oc", "t": {} }, { "l": "pl", "t": { "Avatar of {displayName}": { "v": ["Awatar {displayName}"] }, "Avatar of {displayName}, {status}": { "v": ["Awatar {displayName}, {status}"] } } }, { "l": "pt-BR", "t": { "Avatar of {displayName}": { "v": ["Avatar de {displayName}"] }, "Avatar of {displayName}, {status}": { "v": ["Avatar de {displayName}, {status}"] } } }, { "l": "pt-PT", "t": { "Avatar of {displayName}": { "v": ["Avatar de {displayName}"] }, "Avatar of {displayName}, {status}": { "v": ["Avatar de {displayName}, {status}"] } } }, { "l": "ro", "t": { "Avatar of {displayName}": { "v": ["Avatarul lui {displayName}"] }, "Avatar of {displayName}, {status}": { "v": ["Avatarul lui {displayName}, {status}"] } } }, { "l": "ru", "t": { "Avatar of {displayName}": { "v": ["Аватар {displayName}"] }, "Avatar of {displayName}, {status}": { "v": ["Фотография {displayName}, {status}"] } } }, { "l": "sk", "t": { "Avatar of {displayName}": { "v": ["Avatar {displayName}"] }, "Avatar of {displayName}, {status}": { "v": ["Avatar {displayName}, {status}"] } } }, { "l": "sl", "t": { "Avatar of {displayName}": { "v": ["Podoba {displayName}"] }, "Avatar of {displayName}, {status}": { "v": ["Prikazna slika {displayName}, {status}"] } } }, { "l": "sr", "t": { "Avatar of {displayName}": { "v": ["Аватар за {displayName}"] }, "Avatar of {displayName}, {status}": { "v": ["Avatar za {displayName}, {status}"] } } }, { "l": "sv", "t": { "Avatar of {displayName}": { "v": ["{displayName}s avatar"] }, "Avatar of {displayName}, {status}": { "v": ["{displayName}s avatar, {status}"] } } }, { "l": "tr", "t": { "Avatar of {displayName}": { "v": ["{displayName} avatarı"] }, "Avatar of {displayName}, {status}": { "v": ["{displayName}, {status} avatarı"] } } }, { "l": "uk", "t": { "Avatar of {displayName}": { "v": ["Аватар {displayName}"] }, "Avatar of {displayName}, {status}": { "v": ["Аватар {displayName}, {status}"] } } }, { "l": "uz", "t": { "Avatar of {displayName}": { "v": [" {displayName}Avatari"] }, "Avatar of {displayName}, {status}": { "v": ["{displayName}, {status} Avatari"] } } }, { "l": "zh-CN", "t": { "Avatar of {displayName}": { "v": ["{displayName}的头像"] }, "Avatar of {displayName}, {status}": { "v": ["{displayName}的头像，{status}"] } } }, { "l": "zh-HK", "t": { "Avatar of {displayName}": { "v": ["{displayName} 的頭像"] }, "Avatar of {displayName}, {status}": { "v": ["{displayName} 的頭像，{status}"] } } }, { "l": "zh-TW", "t": { "Avatar of {displayName}": { "v": ["{displayName} 的大頭照"] }, "Avatar of {displayName}, {status}": { "v": ["{displayName}, {status} 的大頭照"] } } }];
const t11 = [{ "l": "ar", "t": { "away": { "v": ["غير موجود"] }, "busy": { "v": ["مشغول"] }, "do not disturb": { "v": ["يُرجى عدم الإزعاج"] }, "invisible": { "v": ["غير مرئي"] }, "offline": { "v": ["غير متصل"] }, "online": { "v": ["متصل"] } } }, { "l": "ast", "t": { "away": { "v": ["ausente"] }, "busy": { "v": ["ocupáu"] }, "do not disturb": { "v": ["nun molestar"] }, "invisible": { "v": ["invisible"] }, "offline": { "v": ["desconectáu"] }, "online": { "v": ["en llinia"] } } }, { "l": "br", "t": {} }, { "l": "ca", "t": {} }, { "l": "cs", "t": { "away": { "v": ["pryč"] }, "busy": { "v": ["zaneprádněn(a)"] }, "do not disturb": { "v": ["nerušit"] }, "invisible": { "v": ["neviditelné"] }, "offline": { "v": ["offline"] }, "online": { "v": ["online"] } } }, { "l": "cs-CZ", "t": { "away": { "v": ["pryč"] }, "busy": { "v": ["zaneprádněn(a)"] }, "do not disturb": { "v": ["nerušit"] }, "invisible": { "v": ["neviditelné"] }, "offline": { "v": ["offline"] }, "online": { "v": ["online"] } } }, { "l": "da", "t": { "away": { "v": ["væk"] }, "busy": { "v": ["optaget"] }, "do not disturb": { "v": ["forstyr ikke"] }, "invisible": { "v": ["usynlig"] }, "offline": { "v": ["offline"] }, "online": { "v": ["online"] } } }, { "l": "de", "t": { "away": { "v": ["Abwesend"] }, "busy": { "v": ["Beschäftigt"] }, "do not disturb": { "v": ["Bitte nicht stören"] }, "invisible": { "v": ["Unsichtbar"] }, "offline": { "v": ["Offline"] }, "online": { "v": ["Online"] } } }, { "l": "de-DE", "t": { "away": { "v": ["Abwesend"] }, "busy": { "v": ["Beschäftigt"] }, "do not disturb": { "v": ["Bitte nicht stören"] }, "invisible": { "v": ["Unsichtbar"] }, "offline": { "v": ["Offline"] }, "online": { "v": ["Online"] } } }, { "l": "el", "t": { "away": { "v": ["μακριά"] }, "busy": { "v": ["απασχολημένος"] }, "do not disturb": { "v": ["μην ενοχλείτε"] }, "invisible": { "v": ["αόρατο"] }, "offline": { "v": ["εκτός σύνδεσης"] }, "online": { "v": ["συνδεδεμένος"] } } }, { "l": "en-GB", "t": { "away": { "v": ["away"] }, "busy": { "v": ["busy"] }, "do not disturb": { "v": ["do not disturb"] }, "invisible": { "v": ["invisible"] }, "offline": { "v": ["offline"] }, "online": { "v": ["online"] } } }, { "l": "eo", "t": {} }, { "l": "es", "t": { "away": { "v": ["ausente"] }, "busy": { "v": ["ocupado"] }, "do not disturb": { "v": ["no molestar"] }, "invisible": { "v": ["invisible"] }, "offline": { "v": ["fuera de línea"] }, "online": { "v": ["en línea"] } } }, { "l": "es-AR", "t": { "away": { "v": ["ausente"] }, "busy": { "v": ["ocupado"] }, "do not disturb": { "v": ["no molestar"] }, "invisible": { "v": ["invisible"] }, "offline": { "v": ["desconectado"] }, "online": { "v": ["en línea"] } } }, { "l": "es-EC", "t": {} }, { "l": "es-MX", "t": { "away": { "v": ["ausente"] }, "busy": { "v": ["ocupado"] }, "do not disturb": { "v": ["no molestar"] }, "invisible": { "v": ["invisible"] }, "offline": { "v": ["fuera de línea"] }, "online": { "v": ["en línea"] } } }, { "l": "et-EE", "t": { "away": { "v": ["eemal"] }, "busy": { "v": ["hõivatud"] }, "do not disturb": { "v": ["ära sega"] }, "invisible": { "v": ["nähtamatu"] }, "offline": { "v": ["pole võrgus"] }, "online": { "v": ["võrgus"] } } }, { "l": "eu", "t": {} }, { "l": "fa", "t": { "away": { "v": ["دور از دستگاه"] }, "busy": { "v": ["مشغول"] }, "do not disturb": { "v": ["مزاحم نشوید"] }, "invisible": { "v": ["مخفی"] }, "offline": { "v": ["برون‌خط"] }, "online": { "v": ["برخط"] } } }, { "l": "fi", "t": { "away": { "v": ["poissa"] }, "busy": { "v": ["varattu"] }, "do not disturb": { "v": ["älä häiritse"] }, "invisible": { "v": ["näkymätön"] }, "offline": { "v": ["ei linjalla"] }, "online": { "v": ["linjalla"] } } }, { "l": "fr", "t": { "away": { "v": ["absent"] }, "busy": { "v": ["occupé"] }, "do not disturb": { "v": ["ne pas déranger"] }, "invisible": { "v": ["invisible"] }, "offline": { "v": ["hors ligne"] }, "online": { "v": ["en ligne"] } } }, { "l": "ga", "t": { "away": { "v": ["ar shiúl"] }, "busy": { "v": ["gnóthach"] }, "do not disturb": { "v": ["ná cur as"] }, "invisible": { "v": ["dofheicthe"] }, "offline": { "v": ["as líne"] }, "online": { "v": ["ar líne"] } } }, { "l": "gl", "t": { "away": { "v": ["ausente"] }, "busy": { "v": ["ocupado"] }, "do not disturb": { "v": ["non molestar"] }, "invisible": { "v": ["invisíbel"] }, "offline": { "v": ["desconectado"] }, "online": { "v": ["conectado"] } } }, { "l": "he", "t": {} }, { "l": "hu", "t": {} }, { "l": "id", "t": { "away": { "v": ["tidak tersedia"] }, "do not disturb": { "v": ["jangan ganggu"] }, "offline": { "v": ["luring"] }, "online": { "v": ["daring"] } } }, { "l": "is", "t": { "away": { "v": ["í burtu"] }, "busy": { "v": ["upptekin/n"] }, "do not disturb": { "v": ["ekki ónáða"] }, "invisible": { "v": ["ósýnilegt"] }, "offline": { "v": ["ónettengt"] }, "online": { "v": ["nettengt"] } } }, { "l": "it", "t": { "away": { "v": ["via"] }, "do not disturb": { "v": ["non disturbare"] }, "offline": { "v": ["offline"] }, "online": { "v": ["online"] } } }, { "l": "ja", "t": { "away": { "v": ["離れる"] }, "busy": { "v": ["ビジー"] }, "do not disturb": { "v": ["邪魔をしないでください"] }, "invisible": { "v": ["不可視"] }, "offline": { "v": ["オフライン"] }, "online": { "v": ["オンライン"] } } }, { "l": "ja-JP", "t": { "away": { "v": ["離れる"] }, "busy": { "v": ["ビジー"] }, "do not disturb": { "v": ["邪魔をしないでください"] }, "invisible": { "v": ["不可視"] }, "offline": { "v": ["オフライン"] }, "online": { "v": ["オンライン"] } } }, { "l": "ko", "t": { "away": { "v": ["자리 비움"] }, "busy": { "v": ["바쁨"] }, "do not disturb": { "v": ["방해 금지"] }, "invisible": { "v": ["보이지 않음"] }, "offline": { "v": ["오프라인"] }, "online": { "v": ["온라인"] } } }, { "l": "lt-LT", "t": {} }, { "l": "lv", "t": {} }, { "l": "mk", "t": {} }, { "l": "my", "t": {} }, { "l": "nb", "t": { "away": { "v": ["borte"] }, "busy": { "v": ["opptatt"] }, "do not disturb": { "v": ["ikke forstyrr"] }, "invisible": { "v": ["usynlig"] }, "offline": { "v": ["frakoblet"] }, "online": { "v": ["tilkoblet"] } } }, { "l": "nl", "t": { "away": { "v": ["weg"] }, "busy": { "v": ["bezig"] }, "do not disturb": { "v": ["niet storen"] }, "invisible": { "v": ["Onzichtbaar"] }, "offline": { "v": ["offline"] }, "online": { "v": ["online"] } } }, { "l": "oc", "t": {} }, { "l": "pl", "t": { "away": { "v": ["stąd"] }, "busy": { "v": ["zajęty"] }, "do not disturb": { "v": ["nie przeszkadzać"] }, "invisible": { "v": ["niewidzialny"] }, "offline": { "v": ["offline"] }, "online": { "v": ["online"] } } }, { "l": "pt-BR", "t": { "away": { "v": ["ausente"] }, "busy": { "v": ["ocupado"] }, "do not disturb": { "v": ["não perturbe"] }, "invisible": { "v": ["invisível"] }, "offline": { "v": ["desligada"] }, "online": { "v": ["ligado"] } } }, { "l": "pt-PT", "t": { "away": { "v": ["longe"] }, "busy": { "v": ["ocupado"] }, "do not disturb": { "v": ["não incomodar"] }, "invisible": { "v": ["invisível"] }, "offline": { "v": ["offline"] }, "online": { "v": ["online"] } } }, { "l": "ro", "t": { "away": { "v": ["plecat"] }, "do not disturb": { "v": ["nu deranjați"] }, "offline": { "v": ["deconectat"] }, "online": { "v": ["online"] } } }, { "l": "ru", "t": { "away": { "v": ["отсутствие"] }, "busy": { "v": ["занятый"] }, "do not disturb": { "v": ["не беспокоить"] }, "invisible": { "v": ["невидимый"] }, "offline": { "v": ["офлайн"] }, "online": { "v": ["онлайн"] } } }, { "l": "sk", "t": { "away": { "v": ["neprítomný"] }, "busy": { "v": ["zaneprázdnený"] }, "do not disturb": { "v": ["nerušiť"] }, "invisible": { "v": ["neviditeľný"] }, "offline": { "v": ["Odpojený - offline"] }, "online": { "v": ["Pripojený - online"] } } }, { "l": "sl", "t": {} }, { "l": "sr", "t": { "away": { "v": ["одсутан"] }, "busy": { "v": ["заузет"] }, "do not disturb": { "v": ["не узнемиравај"] }, "invisible": { "v": ["невидљиво"] }, "offline": { "v": ["ван мреже"] }, "online": { "v": ["на мрежи"] } } }, { "l": "sv", "t": { "away": { "v": ["borta"] }, "busy": { "v": ["upptagen"] }, "do not disturb": { "v": ["stör ej"] }, "invisible": { "v": ["osynlig"] }, "offline": { "v": ["offline"] }, "online": { "v": ["online"] } } }, { "l": "tr", "t": { "away": { "v": ["Uzakta"] }, "busy": { "v": ["meşgul"] }, "do not disturb": { "v": ["Rahatsız etmeyin"] }, "invisible": { "v": ["görünmez"] }, "offline": { "v": ["Çevrim dışı"] }, "online": { "v": ["Çevrim içi"] } } }, { "l": "uk", "t": { "away": { "v": ["відсутній"] }, "busy": { "v": ["зайнято"] }, "do not disturb": { "v": ["не турбувати"] }, "invisible": { "v": ["Невидимий"] }, "offline": { "v": ["не в мережі"] }, "online": { "v": ["в мережі"] } } }, { "l": "uz", "t": { "away": { "v": ["uzoqda"] }, "busy": { "v": ["band"] }, "do not disturb": { "v": ["bezovta qilmang"] }, "invisible": { "v": ["ko'rinmas"] }, "offline": { "v": ["offline"] }, "online": { "v": ["online"] } } }, { "l": "zh-CN", "t": { "away": { "v": ["离开"] }, "busy": { "v": ["繁忙"] }, "do not disturb": { "v": ["请勿打扰"] }, "invisible": { "v": ["隐藏的"] }, "offline": { "v": ["离线"] }, "online": { "v": ["在线"] } } }, { "l": "zh-HK", "t": { "away": { "v": ["離開"] }, "busy": { "v": ["忙碌"] }, "do not disturb": { "v": ["請勿打擾"] }, "invisible": { "v": ["隐藏的"] }, "offline": { "v": ["離線"] }, "online": { "v": ["在線"] } } }, { "l": "zh-TW", "t": {} }];
const t12 = [{ "l": "ar", "t": { "Back to provider selection": { "v": ["عودة إلى اختيار المزوّد"] }, "Close Smart Picker": { "v": ["إغلاق المحدد الذكي"] }, "Smart Picker": { "v": ["اللاقط الذكي smart picker"] } } }, { "l": "ast", "t": { "Back to provider selection": { "v": ["Volver a la seleición de fornidores"] }, "Close Smart Picker": { "v": ["Zarrar la seleición intelixente"] }, "Smart Picker": { "v": ["Selector intelixente"] } } }, { "l": "br", "t": {} }, { "l": "ca", "t": {} }, { "l": "cs", "t": { "Back to provider selection": { "v": ["Zpět na výběr poskytovatele"] }, "Close Smart Picker": { "v": ["Zavřít inteligentní výběr"] }, "Smart Picker": { "v": ["Inteligentní výběr"] } } }, { "l": "cs-CZ", "t": { "Back to provider selection": { "v": ["Zpět na výběr poskytovatele"] }, "Close Smart Picker": { "v": ["Zavřít inteligentní výběr"] }, "Smart Picker": { "v": ["Inteligentní výběr"] } } }, { "l": "da", "t": { "Back to provider selection": { "v": ["Tilbage til udbydervalg"] }, "Close Smart Picker": { "v": ["Luk Smart Vælger"] }, "Smart Picker": { "v": ["Smart Vælger"] } } }, { "l": "de", "t": { "Back to provider selection": { "v": ["Zurück zur Anbieterauswahl"] }, "Close Smart Picker": { "v": ["Smart Picker schließen"] }, "Smart Picker": { "v": ["Smart Picker"] } } }, { "l": "de-DE", "t": { "Back to provider selection": { "v": ["Zurück zur Anbieterauswahl"] }, "Close Smart Picker": { "v": ["Smart Picker schließen"] }, "Smart Picker": { "v": ["Smart Picker"] } } }, { "l": "el", "t": { "Back to provider selection": { "v": ["Επιστροφή στην επιλογή παρόχου"] }, "Close Smart Picker": { "v": ["Κλείσιμο Έξυπνης Επιλογής"] }, "Smart Picker": { "v": ["Έξυπνη Επιλογή"] } } }, { "l": "en-GB", "t": { "Back to provider selection": { "v": ["Back to provider selection"] }, "Close Smart Picker": { "v": ["Close Smart Picker"] }, "Smart Picker": { "v": ["Smart Picker"] } } }, { "l": "eo", "t": {} }, { "l": "es", "t": { "Back to provider selection": { "v": ["Volver a la selección de proveedor"] }, "Close Smart Picker": { "v": ["Cerrar selector inteligente"] }, "Smart Picker": { "v": ["Selector inteligente"] } } }, { "l": "es-AR", "t": { "Back to provider selection": { "v": ["Volver a la selección de proveedor"] }, "Close Smart Picker": { "v": ["Cerrar selector inteligente"] }, "Smart Picker": { "v": ["Selector inteligente"] } } }, { "l": "es-EC", "t": { "Back to provider selection": { "v": ["Volver a la selección de proveedor"] }, "Close Smart Picker": { "v": ["Cerrar selector inteligente"] }, "Smart Picker": { "v": ["Selector inteligente"] } } }, { "l": "es-MX", "t": { "Back to provider selection": { "v": ["Volver a la selección de proveedor"] }, "Close Smart Picker": { "v": ["Cerrar selector inteligente"] }, "Smart Picker": { "v": ["Selector inteligente"] } } }, { "l": "et-EE", "t": { "Back to provider selection": { "v": ["Tagasi teenusepakkuja valiku juurde"] }, "Close Smart Picker": { "v": ["Sulge nutikas valija"] }, "Smart Picker": { "v": ["Nutikas valija"] } } }, { "l": "eu", "t": { "Back to provider selection": { "v": ["Itzuli hornitzaileen hautapenera"] }, "Close Smart Picker": { "v": ["Itxi hautatzaile adimenduna"] }, "Smart Picker": { "v": ["Hautatzaile adimenduna"] } } }, { "l": "fa", "t": { "Back to provider selection": { "v": ["بازگشت به انتخاب ارائه دهنده"] }, "Close Smart Picker": { "v": ["بستن انتخاب‌گر هوشمند"] }, "Smart Picker": { "v": ["انتخابگر هوشمند"] } } }, { "l": "fi", "t": { "Back to provider selection": { "v": ["Takaisin toimittajavalintaan"] }, "Close Smart Picker": { "v": ["Sulje älykas valitsin"] }, "Smart Picker": { "v": ["Älykäs valitsin"] } } }, { "l": "fr", "t": { "Back to provider selection": { "v": ["Revenir à la sélection du fournisseur"] }, "Close Smart Picker": { "v": ["Fermer le sélecteur intelligent"] }, "Smart Picker": { "v": ["Sélecteur intelligent"] } } }, { "l": "ga", "t": { "Back to provider selection": { "v": ["Ar ais go roghnú soláthróra"] }, "Close Smart Picker": { "v": ["Dún Piocálaí Cliste"] }, "Smart Picker": { "v": ["Roghnóir Cliste"] } } }, { "l": "gl", "t": { "Back to provider selection": { "v": ["Volver á selección do provedor"] }, "Close Smart Picker": { "v": ["Pechar o Selector intelixente"] }, "Smart Picker": { "v": ["Selector intelixente"] } } }, { "l": "he", "t": { "Back to provider selection": { "v": ["חזרה לבחירת ספק"] }, "Close Smart Picker": { "v": ["סגירת הבורר החכם"] }, "Smart Picker": { "v": ["בורר חכם"] } } }, { "l": "hu", "t": {} }, { "l": "id", "t": { "Back to provider selection": { "v": ["Kembali ke pemilihan penyedia"] }, "Close Smart Picker": { "v": ["Tutup Pemilih Cerdas"] }, "Smart Picker": { "v": ["Pemilih Cerdas"] } } }, { "l": "is", "t": { "Back to provider selection": { "v": ["Til baka í val á þjónustuveitu"] }, "Close Smart Picker": { "v": ["Loka snjall-veljara"] }, "Smart Picker": { "v": ["Snjall-veljari"] } } }, { "l": "it", "t": { "Back to provider selection": { "v": ["Torna alla selezione del provider"] }, "Close Smart Picker": { "v": ["Chiudere lo Smart Picker"] }, "Smart Picker": { "v": ["Picker intelligente"] } } }, { "l": "ja", "t": { "Back to provider selection": { "v": ["プロバイダーの選択に戻る"] }, "Close Smart Picker": { "v": ["スマートピッカーを閉じる"] }, "Smart Picker": { "v": ["スマートピッカー"] } } }, { "l": "ja-JP", "t": { "Back to provider selection": { "v": ["プロバイダーの選択に戻る"] }, "Close Smart Picker": { "v": ["スマートピッカーを閉じる"] }, "Smart Picker": { "v": ["スマートピッカー"] } } }, { "l": "ko", "t": { "Back to provider selection": { "v": ["제공자 선택으로 돌아가기"] }, "Close Smart Picker": { "v": ["스마트 선택기 닫기"] }, "Smart Picker": { "v": ["스마트 선택기"] } } }, { "l": "lt-LT", "t": {} }, { "l": "lv", "t": {} }, { "l": "mk", "t": {} }, { "l": "my", "t": {} }, { "l": "nb", "t": { "Back to provider selection": { "v": ["Tilbake til leverandørvalg"] }, "Close Smart Picker": { "v": ["Lukk Smart Velger"] }, "Smart Picker": { "v": ["Smart Velger"] } } }, { "l": "nl", "t": { "Back to provider selection": { "v": ["Terug naar provider selectie"] }, "Close Smart Picker": { "v": ["Sluit Slimme Kiezer"] }, "Smart Picker": { "v": ["Slimme Kiezer"] } } }, { "l": "oc", "t": {} }, { "l": "pl", "t": { "Back to provider selection": { "v": ["Powrót do wyboru dostawcy"] }, "Close Smart Picker": { "v": ["Zamknij inteligentny selektor"] }, "Smart Picker": { "v": ["Inteligentne wybieranie"] } } }, { "l": "pt-BR", "t": { "Back to provider selection": { "v": ["Voltar para seleção de provedor"] }, "Close Smart Picker": { "v": ["Fechar Seletor Inteligente"] }, "Smart Picker": { "v": ["Seletor Inteligente"] } } }, { "l": "pt-PT", "t": { "Back to provider selection": { "v": ["Voltar à seleção de fornecedor"] }, "Close Smart Picker": { "v": ['Fechar "Smart Picker"'] }, "Smart Picker": { "v": ["Smart Picker"] } } }, { "l": "ro", "t": { "Back to provider selection": { "v": ["Înapoi la selecția providerului"] }, "Close Smart Picker": { "v": ["Închide Smart Picker"] }, "Smart Picker": { "v": ["Smart Picker"] } } }, { "l": "ru", "t": { "Back to provider selection": { "v": ["Вернуться к выбору провайдера"] }, "Close Smart Picker": { "v": ["Закрыть интеллектуальный выбор"] }, "Smart Picker": { "v": ["Умный выбор"] } } }, { "l": "sk", "t": { "Back to provider selection": { "v": ["Späť na výber poskytovateľa"] }, "Close Smart Picker": { "v": ["Zavrieť inteligentný výber"] }, "Smart Picker": { "v": ["Inteligentný výber"] } } }, { "l": "sl", "t": {} }, { "l": "sr", "t": { "Back to provider selection": { "v": ["Назад на избор пружаоца"] }, "Close Smart Picker": { "v": ["Затвори паметни бирач"] }, "Smart Picker": { "v": ["Паметни бирач"] } } }, { "l": "sv", "t": { "Back to provider selection": { "v": ["Tillbaka till leverantörsval"] }, "Close Smart Picker": { "v": ["Stäng Smart Picker"] }, "Smart Picker": { "v": ["Smart Picker"] } } }, { "l": "tr", "t": { "Back to provider selection": { "v": ["Sağlayıcı seçimine dön"] }, "Close Smart Picker": { "v": ["Akıllı seçimi kapat"] }, "Smart Picker": { "v": ["Akıllı seçim"] } } }, { "l": "uk", "t": { "Back to provider selection": { "v": ["Назад до вибору постачальника"] }, "Close Smart Picker": { "v": ["Закрити асистент вибору"] }, "Smart Picker": { "v": ["Асистент вибору"] } } }, { "l": "uz", "t": { "Back to provider selection": { "v": ["Provayder tanloviga qaytish"] }, "Close Smart Picker": { "v": ["Smart Picker-ni yoping"] }, "Smart Picker": { "v": ["Aqlli tanlovchi"] } } }, { "l": "zh-CN", "t": { "Back to provider selection": { "v": ["返回至提供者选择列表"] }, "Close Smart Picker": { "v": ["关闭智能拾取器"] }, "Smart Picker": { "v": ["智能拾取器"] } } }, { "l": "zh-HK", "t": { "Back to provider selection": { "v": ["回到提供者選擇"] }, "Close Smart Picker": { "v": ["關閉 Smart Picker"] }, "Smart Picker": { "v": ["Smart Picker"] } } }, { "l": "zh-TW", "t": { "Back to provider selection": { "v": ["回到提供者選擇"] }, "Close Smart Picker": { "v": ["關閉智慧型挑選器"] }, "Smart Picker": { "v": ["智慧型挑選器"] } } }];
const t13 = [{ "l": "ar", "t": { "Cancel changes": { "v": ["إلغاء التغييرات"] }, "Confirm changes": { "v": ["تأكيد التغييرات"] } } }, { "l": "ast", "t": { "Cancel changes": { "v": ["Encaboxar los cambeos"] }, "Confirm changes": { "v": ["Confirmar los cambeos"] } } }, { "l": "br", "t": {} }, { "l": "ca", "t": { "Cancel changes": { "v": ["Cancel·la els canvis"] }, "Confirm changes": { "v": ["Confirmeu els canvis"] } } }, { "l": "cs", "t": { "Cancel changes": { "v": ["Zrušit změny"] }, "Confirm changes": { "v": ["Potvrdit změny"] } } }, { "l": "cs-CZ", "t": { "Cancel changes": { "v": ["Zrušit změny"] }, "Confirm changes": { "v": ["Potvrdit změny"] } } }, { "l": "da", "t": { "Cancel changes": { "v": ["Annuller ændringer"] }, "Confirm changes": { "v": ["Bekræft ændringer"] } } }, { "l": "de", "t": { "Cancel changes": { "v": ["Änderungen verwerfen"] }, "Confirm changes": { "v": ["Änderungen bestätigen"] } } }, { "l": "de-DE", "t": { "Cancel changes": { "v": ["Änderungen verwerfen"] }, "Confirm changes": { "v": ["Änderungen bestätigen"] } } }, { "l": "el", "t": { "Cancel changes": { "v": ["Ακύρωση αλλαγών"] }, "Confirm changes": { "v": ["Επιβεβαίωση αλλαγών"] } } }, { "l": "en-GB", "t": { "Cancel changes": { "v": ["Cancel changes"] }, "Confirm changes": { "v": ["Confirm changes"] } } }, { "l": "eo", "t": {} }, { "l": "es", "t": { "Cancel changes": { "v": ["Cancelar cambios"] }, "Confirm changes": { "v": ["Confirmar cambios"] } } }, { "l": "es-AR", "t": { "Cancel changes": { "v": ["Cancelar cambios"] }, "Confirm changes": { "v": ["Confirmar cambios"] } } }, { "l": "es-EC", "t": { "Cancel changes": { "v": ["Cancelar cambios"] }, "Confirm changes": { "v": ["Confirmar cambios"] } } }, { "l": "es-MX", "t": { "Cancel changes": { "v": ["Cancelar cambios"] }, "Confirm changes": { "v": ["Confirmar cambios"] } } }, { "l": "et-EE", "t": { "Cancel changes": { "v": ["Tühista muudatused"] }, "Confirm changes": { "v": ["Kinnitage muudatused"] } } }, { "l": "eu", "t": { "Cancel changes": { "v": ["Ezeztatu aldaketak"] }, "Confirm changes": { "v": ["Baieztatu aldaketak"] } } }, { "l": "fa", "t": { "Cancel changes": { "v": ["لغو تغییرات"] }, "Confirm changes": { "v": ["تایید تغییرات"] } } }, { "l": "fi", "t": { "Cancel changes": { "v": ["Peruuta muutokset"] }, "Confirm changes": { "v": ["Vahvista muutokset"] } } }, { "l": "fr", "t": { "Cancel changes": { "v": ["Annuler les modifications"] }, "Confirm changes": { "v": ["Confirmer les modifications"] } } }, { "l": "ga", "t": { "Cancel changes": { "v": ["Cealaigh athruithe"] }, "Confirm changes": { "v": ["Deimhnigh na hathruithe"] } } }, { "l": "gl", "t": { "Cancel changes": { "v": ["Cancelar os cambios"] }, "Confirm changes": { "v": ["Confirma os cambios"] } } }, { "l": "he", "t": { "Cancel changes": { "v": ["ביטול שינויים"] }, "Confirm changes": { "v": ["אישור השינויים"] } } }, { "l": "hu", "t": { "Cancel changes": { "v": ["Változtatások elvetése"] }, "Confirm changes": { "v": ["Változtatások megerősítése"] } } }, { "l": "id", "t": { "Cancel changes": { "v": ["Batalkan perubahan"] }, "Confirm changes": { "v": ["Konfirmasikan perubahan"] } } }, { "l": "is", "t": { "Cancel changes": { "v": ["Hætta við breytingar"] }, "Confirm changes": { "v": ["Staðfesta breytingar"] } } }, { "l": "it", "t": { "Cancel changes": { "v": ["Annulla modifiche"] }, "Confirm changes": { "v": ["Conferma modifiche"] } } }, { "l": "ja", "t": { "Cancel changes": { "v": ["変更をキャンセル"] }, "Confirm changes": { "v": ["変更を承認"] } } }, { "l": "ja-JP", "t": { "Cancel changes": { "v": ["変更をキャンセル"] }, "Confirm changes": { "v": ["変更を承認"] } } }, { "l": "ko", "t": { "Cancel changes": { "v": ["변경 취소"] }, "Confirm changes": { "v": ["변경 사항 확인"] } } }, { "l": "lt-LT", "t": {} }, { "l": "lv", "t": {} }, { "l": "mk", "t": { "Cancel changes": { "v": ["Откажи ги промените"] }, "Confirm changes": { "v": ["Потврди ги промените"] } } }, { "l": "my", "t": { "Cancel changes": { "v": ["ပြောင်းလဲမှုများ ပယ်ဖျက်ရန်"] }, "Confirm changes": { "v": ["ပြောင်းလဲမှုများ အတည်ပြုရန်"] } } }, { "l": "nb", "t": { "Cancel changes": { "v": ["Avbryt endringer"] }, "Confirm changes": { "v": ["Bekreft endringer"] } } }, { "l": "nl", "t": { "Cancel changes": { "v": ["Wijzigingen annuleren"] }, "Confirm changes": { "v": ["Wijzigingen bevestigen"] } } }, { "l": "oc", "t": {} }, { "l": "pl", "t": { "Cancel changes": { "v": ["Anuluj zmiany"] }, "Confirm changes": { "v": ["Potwierdź zmiany"] } } }, { "l": "pt-BR", "t": { "Cancel changes": { "v": ["Cancelar alterações"] }, "Confirm changes": { "v": ["Confirmar alterações"] } } }, { "l": "pt-PT", "t": { "Cancel changes": { "v": ["Cancelar alterações"] }, "Confirm changes": { "v": ["Confirmar alterações"] } } }, { "l": "ro", "t": { "Cancel changes": { "v": ["Anulează modificările"] }, "Confirm changes": { "v": ["Confirmați modificările"] } } }, { "l": "ru", "t": { "Cancel changes": { "v": ["Отменить изменения"] }, "Confirm changes": { "v": ["Подтвердить изменения"] } } }, { "l": "sk", "t": { "Cancel changes": { "v": ["Zrušiť zmeny"] }, "Confirm changes": { "v": ["Potvrdiť zmeny"] } } }, { "l": "sl", "t": { "Cancel changes": { "v": ["Prekliči spremembe"] }, "Confirm changes": { "v": ["Potrdi spremembe"] } } }, { "l": "sr", "t": { "Cancel changes": { "v": ["Откажи измене"] }, "Confirm changes": { "v": ["Потврдите измене"] } } }, { "l": "sv", "t": { "Cancel changes": { "v": ["Avbryt ändringar"] }, "Confirm changes": { "v": ["Bekräfta ändringar"] } } }, { "l": "tr", "t": { "Cancel changes": { "v": ["Değişiklikleri iptal et"] }, "Confirm changes": { "v": ["Değişiklikleri onayla"] } } }, { "l": "uk", "t": { "Cancel changes": { "v": ["Скасувати зміни"] }, "Confirm changes": { "v": ["Підтвердити зміни"] } } }, { "l": "uz", "t": { "Cancel changes": { "v": ["O'zgarishlarni bekor qilish"] }, "Confirm changes": { "v": ["O'zgarishlarni tasdiqlang"] } } }, { "l": "zh-CN", "t": { "Cancel changes": { "v": ["取消更改"] }, "Confirm changes": { "v": ["确认更改"] } } }, { "l": "zh-HK", "t": { "Cancel changes": { "v": ["取消更改"] }, "Confirm changes": { "v": ["確認更改"] } } }, { "l": "zh-TW", "t": { "Cancel changes": { "v": ["取消變更"] }, "Confirm changes": { "v": ["確認變更"] } } }];
const t14 = [{ "l": "ar", "t": { "Change name": { "v": ["تغيير الاسم"] }, "Close sidebar": { "v": ["قفل الشريط الجانبي"] }, "Favorite": { "v": ["المفضلة"] }, "Open sidebar": { "v": ["إفتَح الشريط الجانبي"] } } }, { "l": "ast", "t": { "Change name": { "v": ["Camudar el nome"] }, "Close sidebar": { "v": ["Zarrar la barra llateral"] }, "Favorite": { "v": ["Favoritu"] }, "Open sidebar": { "v": ["Abrir la barra llateral"] } } }, { "l": "br", "t": {} }, { "l": "ca", "t": { "Close sidebar": { "v": ["Tancar la barra lateral"] }, "Favorite": { "v": ["Preferit"] } } }, { "l": "cs", "t": { "Change name": { "v": ["Změnit název"] }, "Close sidebar": { "v": ["Zavřít postranní panel"] }, "Favorite": { "v": ["Oblíbené"] }, "Open sidebar": { "v": ["Otevřít postranní panel"] } } }, { "l": "cs-CZ", "t": { "Change name": { "v": ["Změnit název"] }, "Close sidebar": { "v": ["Zavřít postranní panel"] }, "Favorite": { "v": ["Oblíbené"] } } }, { "l": "da", "t": { "Change name": { "v": ["Ændre navn"] }, "Close sidebar": { "v": ["Luk sidepanel"] }, "Favorite": { "v": ["Favorit"] }, "Open sidebar": { "v": ["Åbn sidepanel"] } } }, { "l": "de", "t": { "Change name": { "v": ["Namen ändern"] }, "Close sidebar": { "v": ["Seitenleiste schließen"] }, "Favorite": { "v": ["Favorit"] }, "Open sidebar": { "v": ["Seitenleiste öffnen"] } } }, { "l": "de-DE", "t": { "Change name": { "v": ["Namen ändern"] }, "Close sidebar": { "v": ["Seitenleiste schließen"] }, "Favorite": { "v": ["Favorit"] }, "Open sidebar": { "v": ["Seitenleiste öffnen"] } } }, { "l": "el", "t": { "Change name": { "v": ["Αλλαγή ονόματος"] }, "Close sidebar": { "v": ["Κλείσιμο πλευρικής μπάρας"] }, "Favorite": { "v": ["Αγαπημένα"] }, "Open sidebar": { "v": ["Άνοιγμα πλευρικής μπάρας"] } } }, { "l": "en-GB", "t": { "Change name": { "v": ["Change name"] }, "Close sidebar": { "v": ["Close sidebar"] }, "Favorite": { "v": ["Favourite"] }, "Open sidebar": { "v": ["Open sidebar"] } } }, { "l": "eo", "t": {} }, { "l": "es", "t": { "Change name": { "v": ["Cambiar nombre"] }, "Close sidebar": { "v": ["Cerrar barra lateral"] }, "Favorite": { "v": ["Favorito"] }, "Open sidebar": { "v": ["Abrir barra lateral"] } } }, { "l": "es-AR", "t": { "Change name": { "v": ["Cambiar nombre"] }, "Close sidebar": { "v": ["Cerrar barra lateral"] }, "Favorite": { "v": ["Favorito"] }, "Open sidebar": { "v": ["Abrir barra lateral"] } } }, { "l": "es-EC", "t": { "Change name": { "v": ["Cambiar nombre"] }, "Close sidebar": { "v": ["Cerrar barra lateral"] }, "Favorite": { "v": ["Favorito"] } } }, { "l": "es-MX", "t": { "Change name": { "v": ["Cambiar nombre"] }, "Close sidebar": { "v": ["Cerrar barra lateral"] }, "Favorite": { "v": ["Favorito"] }, "Open sidebar": { "v": ["Abrir barra lateral"] } } }, { "l": "et-EE", "t": { "Change name": { "v": ["Muuda nime"] }, "Close sidebar": { "v": ["Sulge külgriba"] }, "Favorite": { "v": ["Lemmik"] }, "Open sidebar": { "v": ["Ava külgriba"] } } }, { "l": "eu", "t": { "Change name": { "v": ["Aldatu izena"] }, "Close sidebar": { "v": ["Itxi albo-barra"] }, "Favorite": { "v": ["Gogokoa"] } } }, { "l": "fa", "t": { "Change name": { "v": ["تغییر نام"] }, "Close sidebar": { "v": ["بستن نوار کناری"] }, "Favorite": { "v": ["مورد علاقه"] }, "Open sidebar": { "v": ["باز کردن نوار کنار"] } } }, { "l": "fi", "t": { "Change name": { "v": ["Vaihda nimi"] }, "Close sidebar": { "v": ["Sulje sivupalkki"] }, "Favorite": { "v": ["Suosikki"] }, "Open sidebar": { "v": ["Avaa sivupalkki"] } } }, { "l": "fr", "t": { "Change name": { "v": ["Modifier le nom"] }, "Close sidebar": { "v": ["Fermer la barre latérale"] }, "Favorite": { "v": ["Favori"] }, "Open sidebar": { "v": ["Ouvrir la barre latérale"] } } }, { "l": "ga", "t": { "Change name": { "v": ["Athrú ainm"] }, "Close sidebar": { "v": ["Dún barra taoibh"] }, "Favorite": { "v": ["is fearr leat"] }, "Open sidebar": { "v": ["Oscail barra taoibh"] } } }, { "l": "gl", "t": { "Change name": { "v": ["Cambiar o nome"] }, "Close sidebar": { "v": ["Pechar a barra lateral"] }, "Favorite": { "v": ["Favorito"] }, "Open sidebar": { "v": ["Abrir a barra lateral"] } } }, { "l": "he", "t": { "Change name": { "v": ["החלפת שם"] }, "Close sidebar": { "v": ["סגירת סרגל הצד"] }, "Favorite": { "v": ["למועדפים"] } } }, { "l": "hu", "t": { "Close sidebar": { "v": ["Oldalsáv bezárása"] }, "Favorite": { "v": ["Kedvenc"] } } }, { "l": "id", "t": { "Change name": { "v": ["Ubah nama"] }, "Close sidebar": { "v": ["Tutup bilah sisi"] }, "Favorite": { "v": ["Favorit"] } } }, { "l": "is", "t": { "Change name": { "v": ["Breyta nafni"] }, "Close sidebar": { "v": ["Loka hliðarstiku"] }, "Favorite": { "v": ["Eftirlæti"] }, "Open sidebar": { "v": ["Opna hliðarspjald"] } } }, { "l": "it", "t": { "Change name": { "v": ["Cambia nome"] }, "Close sidebar": { "v": ["Chiudi la barra laterale"] }, "Favorite": { "v": ["Preferito"] } } }, { "l": "ja", "t": { "Change name": { "v": ["名前の変更"] }, "Close sidebar": { "v": ["サイドバーを閉じる"] }, "Favorite": { "v": ["お気に入り"] }, "Open sidebar": { "v": ["サイドバーを開く"] } } }, { "l": "ja-JP", "t": { "Change name": { "v": ["名前の変更"] }, "Close sidebar": { "v": ["サイドバーを閉じる"] }, "Favorite": { "v": ["お気に入り"] }, "Open sidebar": { "v": ["サイドバーを開く"] } } }, { "l": "ko", "t": { "Change name": { "v": ["이름 변경"] }, "Close sidebar": { "v": ["사이드바 닫기"] }, "Favorite": { "v": ["즐겨찾기"] }, "Open sidebar": { "v": ["사이드바 열기"] } } }, { "l": "lt-LT", "t": {} }, { "l": "lv", "t": {} }, { "l": "mk", "t": { "Favorite": { "v": ["Фаворити"] } } }, { "l": "my", "t": {} }, { "l": "nb", "t": { "Change name": { "v": ["Endre navn"] }, "Close sidebar": { "v": ["Lukk sidepanel"] }, "Favorite": { "v": ["Favoritt"] }, "Open sidebar": { "v": ["Åpne sidefelt"] } } }, { "l": "nl", "t": { "Change name": { "v": ["Verander naam"] }, "Close sidebar": { "v": ["Sluit sidebar"] }, "Favorite": { "v": ["Favoriet"] }, "Open sidebar": { "v": ["Open sidebar"] } } }, { "l": "oc", "t": {} }, { "l": "pl", "t": { "Change name": { "v": ["Zmień nazwę"] }, "Close sidebar": { "v": ["Zamknij pasek boczny"] }, "Favorite": { "v": ["Ulubiony"] }, "Open sidebar": { "v": ["Otwórz pasek boczny"] } } }, { "l": "pt-BR", "t": { "Change name": { "v": ["Mudar nome"] }, "Close sidebar": { "v": ["Fechar barra lateral"] }, "Favorite": { "v": ["Favorito"] }, "Open sidebar": { "v": ["Abrir barra lateral"] } } }, { "l": "pt-PT", "t": { "Change name": { "v": ["Alterar nome"] }, "Close sidebar": { "v": ["Fechar barra lateral"] }, "Favorite": { "v": ["Favorito"] }, "Open sidebar": { "v": ["Abrir barra lateral"] } } }, { "l": "ro", "t": { "Change name": { "v": ["Modifică numele"] }, "Close sidebar": { "v": ["Închide bara laterală"] }, "Favorite": { "v": ["Favorit"] } } }, { "l": "ru", "t": { "Change name": { "v": ["Изменить имя"] }, "Close sidebar": { "v": ["Закрыть сайдбар"] }, "Favorite": { "v": ["Избранное"] }, "Open sidebar": { "v": ["Открыть боковую панель"] } } }, { "l": "sk", "t": { "Change name": { "v": ["Zmeniť názov"] }, "Close sidebar": { "v": ["Zavrieť bočný panel"] }, "Favorite": { "v": ["Obľúbené"] }, "Open sidebar": { "v": ["Otvoriť bočný panel"] } } }, { "l": "sl", "t": { "Close sidebar": { "v": ["Zapri stransko vrstico"] }, "Favorite": { "v": ["Priljubljeno"] } } }, { "l": "sr", "t": { "Change name": { "v": ["Измени назив"] }, "Close sidebar": { "v": ["Затвори бочну траку"] }, "Favorite": { "v": ["Омиљени"] }, "Open sidebar": { "v": ["Отвори бочну траку"] } } }, { "l": "sv", "t": { "Change name": { "v": ["Ändra namn"] }, "Close sidebar": { "v": ["Stäng sidofältet"] }, "Favorite": { "v": ["Favorit"] }, "Open sidebar": { "v": ["Öppna sidofältet"] } } }, { "l": "tr", "t": { "Change name": { "v": ["Adı değiştir"] }, "Close sidebar": { "v": ["Yan çubuğu kapat"] }, "Favorite": { "v": ["Sık kullanılanlara ekle"] }, "Open sidebar": { "v": ["Yan çubuğu aç"] } } }, { "l": "uk", "t": { "Change name": { "v": ["Змінити назву"] }, "Close sidebar": { "v": ["Закрити бічну панель"] }, "Favorite": { "v": ["Із зірочкою"] }, "Open sidebar": { "v": ["Бокове меню"] } } }, { "l": "uz", "t": { "Change name": { "v": ["Ismni o'zgartirish"] }, "Close sidebar": { "v": ["Yon panelni yoping"] }, "Favorite": { "v": ["Tanlangan"] }, "Open sidebar": { "v": ["Yon panelni oching"] } } }, { "l": "zh-CN", "t": { "Change name": { "v": ["修改名称"] }, "Close sidebar": { "v": ["关闭侧边栏"] }, "Favorite": { "v": ["喜爱"] }, "Open sidebar": { "v": ["打开侧边栏"] } } }, { "l": "zh-HK", "t": { "Change name": { "v": ["更改名稱"] }, "Close sidebar": { "v": ["關閉側邊欄"] }, "Favorite": { "v": ["喜愛"] }, "Open sidebar": { "v": ["打開側邊欄"] } } }, { "l": "zh-TW", "t": { "Change name": { "v": ["變更名稱"] }, "Close sidebar": { "v": ["關閉側邊欄"] }, "Favorite": { "v": ["最愛"] } } }];
const t15 = [{ "l": "ar", "t": { "Clear search": { "v": ["محو البحث"] } } }, { "l": "ast", "t": { "Clear search": { "v": ["Borrar la busca"] } } }, { "l": "br", "t": {} }, { "l": "ca", "t": {} }, { "l": "cs", "t": { "Clear search": { "v": ["Vyčistit vyhledávání"] } } }, { "l": "cs-CZ", "t": { "Clear search": { "v": ["Vyčistit vyhledávání"] } } }, { "l": "da", "t": { "Clear search": { "v": ["Ryd søgning"] } } }, { "l": "de", "t": { "Clear search": { "v": ["Suche leeren"] } } }, { "l": "de-DE", "t": { "Clear search": { "v": ["Suche leeren"] } } }, { "l": "el", "t": { "Clear search": { "v": ["Εκκαθάριση αναζήτησης"] } } }, { "l": "en-GB", "t": { "Clear search": { "v": ["Clear search"] } } }, { "l": "eo", "t": {} }, { "l": "es", "t": { "Clear search": { "v": ["Limpiar búsqueda"] } } }, { "l": "es-AR", "t": { "Clear search": { "v": ["Limpiar búsqueda"] } } }, { "l": "es-EC", "t": { "Clear search": { "v": ["Limpiar búsqueda"] } } }, { "l": "es-MX", "t": { "Clear search": { "v": ["Limpiar búsqueda"] } } }, { "l": "et-EE", "t": { "Clear search": { "v": ["Tühjenda otsing"] } } }, { "l": "eu", "t": { "Clear search": { "v": ["Garbitu bilaketa"] } } }, { "l": "fa", "t": { "Clear search": { "v": ["پاک کردن جستجو"] } } }, { "l": "fi", "t": { "Clear search": { "v": ["Tyhjennä haku"] } } }, { "l": "fr", "t": { "Clear search": { "v": ["Effacer la recherche"] } } }, { "l": "ga", "t": { "Clear search": { "v": ["Glan cuardach"] } } }, { "l": "gl", "t": { "Clear search": { "v": ["Limpar a busca"] } } }, { "l": "he", "t": { "Clear search": { "v": ["פינוי חיפוש"] } } }, { "l": "hu", "t": {} }, { "l": "id", "t": { "Clear search": { "v": ["Bersihkan pencarian"] } } }, { "l": "is", "t": { "Clear search": { "v": ["Hreinsa leit"] } } }, { "l": "it", "t": { "Clear search": { "v": ["online"] } } }, { "l": "ja", "t": { "Clear search": { "v": ["検索をクリア"] } } }, { "l": "ja-JP", "t": { "Clear search": { "v": ["検索をクリア"] } } }, { "l": "ko", "t": { "Clear search": { "v": ["검색 지우기"] } } }, { "l": "lt-LT", "t": {} }, { "l": "lv", "t": {} }, { "l": "mk", "t": {} }, { "l": "my", "t": {} }, { "l": "nb", "t": { "Clear search": { "v": ["Tøm søk"] } } }, { "l": "nl", "t": { "Clear search": { "v": ["Wis zoekopdracht"] } } }, { "l": "oc", "t": {} }, { "l": "pl", "t": { "Clear search": { "v": ["Wyczyść wyszukiwanie"] } } }, { "l": "pt-BR", "t": { "Clear search": { "v": ["Limpar pesquisa"] } } }, { "l": "pt-PT", "t": { "Clear search": { "v": ["Limpar pesquisa"] } } }, { "l": "ro", "t": { "Clear search": { "v": ["Șterge căutarea"] } } }, { "l": "ru", "t": { "Clear search": { "v": ["Очистить поиск"] } } }, { "l": "sk", "t": { "Clear search": { "v": ["Vymazať vyhľadávanie"] } } }, { "l": "sl", "t": {} }, { "l": "sr", "t": { "Clear search": { "v": ["Обриши претрагу"] } } }, { "l": "sv", "t": { "Clear search": { "v": ["Rensa sökning"] } } }, { "l": "tr", "t": { "Clear search": { "v": ["Aramayı temizle"] } } }, { "l": "uk", "t": { "Clear search": { "v": ["Очистити пошук"] } } }, { "l": "uz", "t": { "Clear search": { "v": ["Qidiruvni tozalash"] } } }, { "l": "zh-CN", "t": { "Clear search": { "v": ["清除搜索"] } } }, { "l": "zh-HK", "t": { "Clear search": { "v": ["清除搜索"] } } }, { "l": "zh-TW", "t": { "Clear search": { "v": ["清除搜尋"] } } }];
const t16 = [{ "l": "ar", "t": { "Clear selected": { "v": ["محو المحدّد"] }, "Deselect {option}": { "v": ["إلغاء تحديد {option}"] }, "Options": { "v": ["خيارات"] } } }, { "l": "ast", "t": { "Clear selected": { "v": ["Borrar lo seleicionao"] }, "Deselect {option}": { "v": ["Deseleicionar «{option}»"] }, "Options": { "v": ["Opciones"] } } }, { "l": "br", "t": {} }, { "l": "ca", "t": {} }, { "l": "cs", "t": { "Clear selected": { "v": ["Vyčistit vybrané"] }, "Deselect {option}": { "v": ["Zrušit výběr {option}"] }, "Options": { "v": ["Možnosti"] } } }, { "l": "cs-CZ", "t": { "Clear selected": { "v": ["Vyčistit vybrané"] }, "Deselect {option}": { "v": ["Zrušit výběr {option}"] }, "Options": { "v": ["Možnosti"] } } }, { "l": "da", "t": { "Clear selected": { "v": ["Ryd valgt"] }, "Deselect {option}": { "v": ["Fravælg {option}"] }, "Options": { "v": ["Indstillinger"] } } }, { "l": "de", "t": { "Clear selected": { "v": ["Auswahl leeren"] }, "Deselect {option}": { "v": ["{option} abwählen"] }, "Options": { "v": ["Optionen"] } } }, { "l": "de-DE", "t": { "Clear selected": { "v": ["Auswahl leeren"] }, "Deselect {option}": { "v": ["{option} abwählen"] }, "Options": { "v": ["Optionen"] } } }, { "l": "el", "t": { "Clear selected": { "v": ["Εκκαθάριση επιλογής"] }, "Deselect {option}": { "v": ["Αποεπιλογή {option}"] }, "Options": { "v": ["Επιλογές"] } } }, { "l": "en-GB", "t": { "Clear selected": { "v": ["Clear selected"] }, "Deselect {option}": { "v": ["Deselect {option}"] }, "Options": { "v": ["Options"] } } }, { "l": "eo", "t": {} }, { "l": "es", "t": { "Clear selected": { "v": ["Limpiar selección"] }, "Deselect {option}": { "v": ["Deseleccionar {option}"] }, "Options": { "v": ["Opciones"] } } }, { "l": "es-AR", "t": { "Clear selected": { "v": ["Limpiar selección"] }, "Deselect {option}": { "v": ["Deseleccionar {option}"] }, "Options": { "v": ["Opciones"] } } }, { "l": "es-EC", "t": {} }, { "l": "es-MX", "t": { "Clear selected": { "v": ["Limpiar selección"] }, "Deselect {option}": { "v": ["Deseleccionar {option}"] }, "Options": { "v": ["Opciones"] } } }, { "l": "et-EE", "t": { "Clear selected": { "v": ["Tühjenad valik"] }, "Deselect {option}": { "v": ["Eemalda {option} valik"] }, "Options": { "v": ["Valikud"] } } }, { "l": "eu", "t": {} }, { "l": "fa", "t": { "Clear selected": { "v": ["پاک کردن مورد انتخاب شده"] }, "Deselect {option}": { "v": ["لغو انتخاب {option}"] }, "Options": { "v": ["گزینه‌ها"] } } }, { "l": "fi", "t": { "Clear selected": { "v": ["Tyhjennä valitut"] }, "Deselect {option}": { "v": ["Poista valinta {option}"] }, "Options": { "v": ["Valinnat"] } } }, { "l": "fr", "t": { "Clear selected": { "v": ["Vider la sélection"] }, "Deselect {option}": { "v": ["Désélectionner {option}"] }, "Options": { "v": ["Options"] } } }, { "l": "ga", "t": { "Clear selected": { "v": ["Glan roghnaithe"] }, "Deselect {option}": { "v": ["Díroghnaigh {option}"] }, "Options": { "v": ["Roghanna"] } } }, { "l": "gl", "t": { "Clear selected": { "v": ["Limpar o seleccionado"] }, "Deselect {option}": { "v": ["Desmarcar {opción}"] }, "Options": { "v": ["Opcións"] } } }, { "l": "he", "t": {} }, { "l": "hu", "t": {} }, { "l": "id", "t": { "Clear selected": { "v": ["Hapus terpilih"] }, "Deselect {option}": { "v": ["Batalkan pemilihan {option}"] } } }, { "l": "is", "t": { "Clear selected": { "v": ["Hreinsa valið"] }, "Deselect {option}": { "v": ["Afvelja {option}"] }, "Options": { "v": ["Valkostir"] } } }, { "l": "it", "t": { "Clear selected": { "v": ["Cancella selezionati"] }, "Deselect {option}": { "v": ["Deselezionare {option}"] } } }, { "l": "ja", "t": { "Clear selected": { "v": ["選択を解除"] }, "Deselect {option}": { "v": ["{option} の選択を解除"] }, "Options": { "v": ["オプション"] } } }, { "l": "ja-JP", "t": { "Clear selected": { "v": ["選択を解除"] }, "Deselect {option}": { "v": ["{option} の選択を解除"] }, "Options": { "v": ["オプション"] } } }, { "l": "ko", "t": { "Clear selected": { "v": ["선택 항목 지우기"] }, "Deselect {option}": { "v": ["{option} 선택 해제"] }, "Options": { "v": ["옵션"] } } }, { "l": "lt-LT", "t": {} }, { "l": "lv", "t": {} }, { "l": "mk", "t": {} }, { "l": "my", "t": {} }, { "l": "nb", "t": { "Clear selected": { "v": ["Tøm merket"] }, "Deselect {option}": { "v": ["Opphev valg {option}"] }, "Options": { "v": ["Alternativer"] } } }, { "l": "nl", "t": { "Clear selected": { "v": ["Selectie wissen"] }, "Deselect {option}": { "v": ["Deselecteer {optie}"] }, "Options": { "v": ["Opties"] } } }, { "l": "oc", "t": {} }, { "l": "pl", "t": { "Clear selected": { "v": ["Wyczyść wybrane"] }, "Deselect {option}": { "v": ["Odznacz {option}"] }, "Options": { "v": ["Opcje"] } } }, { "l": "pt-BR", "t": { "Clear selected": { "v": ["Limpar selecionados"] }, "Deselect {option}": { "v": ["Desmacar {option}"] }, "Options": { "v": ["Opções"] } } }, { "l": "pt-PT", "t": { "Clear selected": { "v": ["Limpeza selecionada"] }, "Deselect {option}": { "v": ["Desmarcar {option}"] }, "Options": { "v": ["Opções"] } } }, { "l": "ro", "t": { "Clear selected": { "v": ["Șterge selecția"] }, "Deselect {option}": { "v": ["Deselctează {option}"] } } }, { "l": "ru", "t": { "Clear selected": { "v": ["Очистить выбранный"] }, "Deselect {option}": { "v": ["Отменить выбор {option}"] }, "Options": { "v": ["Варианты"] } } }, { "l": "sk", "t": { "Clear selected": { "v": ["Vymazať vybraté"] }, "Deselect {option}": { "v": ["Zrušiť výber {option}"] }, "Options": { "v": ["možnosti"] } } }, { "l": "sl", "t": {} }, { "l": "sr", "t": { "Clear selected": { "v": ["Обриши изабрано"] }, "Deselect {option}": { "v": ["Уклони избор {option}"] }, "Options": { "v": ["Опције"] } } }, { "l": "sv", "t": { "Clear selected": { "v": ["Rensa val"] }, "Deselect {option}": { "v": ["Avmarkera {option}"] }, "Options": { "v": ["Alternativ"] } } }, { "l": "tr", "t": { "Clear selected": { "v": ["Seçilmişleri temizle"] }, "Deselect {option}": { "v": ["{option} bırak"] }, "Options": { "v": ["Seçenekler"] } } }, { "l": "uk", "t": { "Clear selected": { "v": ["Очистити вибране"] }, "Deselect {option}": { "v": ["Зняти вибір {option}"] }, "Options": { "v": ["Параметри"] } } }, { "l": "uz", "t": { "Clear selected": { "v": ["Tanlanganni tozalash"] }, "Deselect {option}": { "v": ["{option}tanlovni bekor qiling"] }, "Options": { "v": ["Variantlar"] } } }, { "l": "zh-CN", "t": { "Clear selected": { "v": ["清除所选"] }, "Deselect {option}": { "v": ["取消选择 {option}"] }, "Options": { "v": ["选项"] } } }, { "l": "zh-HK", "t": { "Clear selected": { "v": ["清除所選項目"] }, "Deselect {option}": { "v": ["取消選擇 {option}"] }, "Options": { "v": ["選項"] } } }, { "l": "zh-TW", "t": {} }];
const t17 = [{ "l": "ar", "t": { "Clear text": { "v": ["محو النص"] }, "Save changes": { "v": ["حفظ التغييرات"] } } }, { "l": "ast", "t": { "Clear text": { "v": ["Borrar el testu"] }, "Save changes": { "v": ["Guardar los cambeos"] } } }, { "l": "br", "t": {} }, { "l": "ca", "t": { "Clear text": { "v": ["Netejar text"] } } }, { "l": "cs", "t": { "Clear text": { "v": ["Čitelný text"] }, "Save changes": { "v": ["Uložit změny"] } } }, { "l": "cs-CZ", "t": { "Clear text": { "v": ["Čitelný text"] }, "Save changes": { "v": ["Uložit změny"] } } }, { "l": "da", "t": { "Clear text": { "v": ["Ryd tekst"] }, "Save changes": { "v": ["Gem ændringer"] } } }, { "l": "de", "t": { "Clear text": { "v": ["Klartext"] }, "Save changes": { "v": ["Änderungen speichern"] } } }, { "l": "de-DE", "t": { "Clear text": { "v": ["Klartext"] }, "Save changes": { "v": ["Änderungen speichern"] } } }, { "l": "el", "t": { "Clear text": { "v": ["Εκκαθάριση κειμένου"] }, "Save changes": { "v": ["Αποθήκευση αλλαγών"] } } }, { "l": "en-GB", "t": { "Clear text": { "v": ["Clear text"] }, "Save changes": { "v": ["Save changes"] } } }, { "l": "eo", "t": {} }, { "l": "es", "t": { "Clear text": { "v": ["Limpiar texto"] }, "Save changes": { "v": ["Guardar cambios"] } } }, { "l": "es-AR", "t": { "Clear text": { "v": ["Limpiar texto"] }, "Save changes": { "v": ["Guardar cambios"] } } }, { "l": "es-EC", "t": { "Clear text": { "v": ["Limpiar texto"] } } }, { "l": "es-MX", "t": { "Clear text": { "v": ["Limpiar texto"] }, "Save changes": { "v": ["Guardar cambios"] } } }, { "l": "et-EE", "t": { "Clear text": { "v": ["Kustuta tekst"] }, "Save changes": { "v": ["Salvesta muudatused"] } } }, { "l": "eu", "t": { "Clear text": { "v": ["Garbitu testua"] } } }, { "l": "fa", "t": { "Clear text": { "v": ["پاک کردن متن"] }, "Save changes": { "v": ["ذخیرهٔ تغییرات"] } } }, { "l": "fi", "t": { "Clear text": { "v": ["Tyhjennä teksti"] }, "Save changes": { "v": ["Tallenna muutokset"] } } }, { "l": "fr", "t": { "Clear text": { "v": ["Effacer le texte"] }, "Save changes": { "v": ["Sauvegarder les changements"] } } }, { "l": "ga", "t": { "Clear text": { "v": ["Glan téacs"] }, "Save changes": { "v": ["Sabháil na hathruithe"] } } }, { "l": "gl", "t": { "Clear text": { "v": ["Limpar o texto"] }, "Save changes": { "v": ["Gardar os cambios"] } } }, { "l": "he", "t": { "Clear text": { "v": ["פינוי טקסט"] } } }, { "l": "hu", "t": { "Clear text": { "v": ["Szöveg törlése"] } } }, { "l": "id", "t": { "Clear text": { "v": ["Bersihkan teks"] }, "Save changes": { "v": ["Simpan perubahan"] } } }, { "l": "is", "t": { "Clear text": { "v": ["Hreinsa texta"] }, "Save changes": { "v": ["Vista breytingar"] } } }, { "l": "it", "t": { "Clear text": { "v": ["Cancella il testo"] }, "Save changes": { "v": ["Salva le modifiche"] } } }, { "l": "ja", "t": { "Clear text": { "v": ["テキストをクリア"] }, "Save changes": { "v": ["変更を保存"] } } }, { "l": "ja-JP", "t": { "Clear text": { "v": ["テキストをクリア"] }, "Save changes": { "v": ["変更を保存"] } } }, { "l": "ko", "t": { "Clear text": { "v": ["텍스트 지우기"] }, "Save changes": { "v": ["변경 사항 저장"] } } }, { "l": "lt-LT", "t": {} }, { "l": "lv", "t": {} }, { "l": "mk", "t": {} }, { "l": "my", "t": {} }, { "l": "nb", "t": { "Clear text": { "v": ["Fjern tekst"] }, "Save changes": { "v": ["Lagre endringer"] } } }, { "l": "nl", "t": { "Clear text": { "v": ["Wis tekst"] }, "Save changes": { "v": ["Wijzigingen opslaan"] } } }, { "l": "oc", "t": {} }, { "l": "pl", "t": { "Clear text": { "v": ["Wyczyść tekst"] }, "Save changes": { "v": ["Zapisz zmiany"] } } }, { "l": "pt-BR", "t": { "Clear text": { "v": ["Limpar texto"] }, "Save changes": { "v": ["Salvar alterações"] } } }, { "l": "pt-PT", "t": { "Clear text": { "v": ["Limpar texto"] }, "Save changes": { "v": ["Gravar alterações"] } } }, { "l": "ro", "t": { "Clear text": { "v": ["Șterge textul"] }, "Save changes": { "v": ["Salvează modificările"] } } }, { "l": "ru", "t": { "Clear text": { "v": ["Очистить текст"] }, "Save changes": { "v": ["Сохранить изменения"] } } }, { "l": "sk", "t": { "Clear text": { "v": ["Vamazať text"] }, "Save changes": { "v": ["Uložiť zmeny"] } } }, { "l": "sl", "t": { "Clear text": { "v": ["Počisti besedilo"] } } }, { "l": "sr", "t": { "Clear text": { "v": ["Обриши текст"] }, "Save changes": { "v": ["Сачувај измене"] } } }, { "l": "sv", "t": { "Clear text": { "v": ["Ta bort text"] }, "Save changes": { "v": ["Spara ändringar"] } } }, { "l": "tr", "t": { "Clear text": { "v": ["Metni temizle"] }, "Save changes": { "v": ["Değişiklikleri kaydet"] } } }, { "l": "uk", "t": { "Clear text": { "v": ["Очистити текст"] }, "Save changes": { "v": ["Зберегти зміни"] } } }, { "l": "uz", "t": { "Clear text": { "v": ["Matnni tozalash"] }, "Save changes": { "v": ["O'zgarishlarni saqlang"] } } }, { "l": "zh-CN", "t": { "Clear text": { "v": ["清除文本"] }, "Save changes": { "v": ["保存修改"] } } }, { "l": "zh-HK", "t": { "Clear text": { "v": ["清除文本"] }, "Save changes": { "v": ["保存更改"] } } }, { "l": "zh-TW", "t": { "Clear text": { "v": ["清除文字"] } } }];
const t18 = [{ "l": "ar", "t": { "Close": { "v": ["إغلاق"] } } }, { "l": "ast", "t": { "Close": { "v": ["Zarrar"] } } }, { "l": "br", "t": { "Close": { "v": ["Serriñ"] } } }, { "l": "ca", "t": { "Close": { "v": ["Tanca"] } } }, { "l": "cs", "t": { "Close": { "v": ["Zavřít"] } } }, { "l": "cs-CZ", "t": { "Close": { "v": ["Zavřít"] } } }, { "l": "da", "t": { "Close": { "v": ["Luk"] } } }, { "l": "de", "t": { "Close": { "v": ["Schließen"] } } }, { "l": "de-DE", "t": { "Close": { "v": ["Schließen"] } } }, { "l": "el", "t": { "Close": { "v": ["Κλείσιμο"] } } }, { "l": "en-GB", "t": { "Close": { "v": ["Close"] } } }, { "l": "eo", "t": { "Close": { "v": ["Fermu"] } } }, { "l": "es", "t": { "Close": { "v": ["Cerrar"] } } }, { "l": "es-AR", "t": { "Close": { "v": ["Cerrar"] } } }, { "l": "es-EC", "t": { "Close": { "v": ["Cerrar"] } } }, { "l": "es-MX", "t": { "Close": { "v": ["Cerrar"] } } }, { "l": "et-EE", "t": { "Close": { "v": ["Sulge"] } } }, { "l": "eu", "t": { "Close": { "v": ["Itxi"] } } }, { "l": "fa", "t": { "Close": { "v": ["بستن"] } } }, { "l": "fi", "t": { "Close": { "v": ["Sulje"] } } }, { "l": "fr", "t": { "Close": { "v": ["Fermer"] } } }, { "l": "ga", "t": { "Close": { "v": ["Dún"] } } }, { "l": "gl", "t": { "Close": { "v": ["Pechar"] } } }, { "l": "he", "t": { "Close": { "v": ["סגירה"] } } }, { "l": "hu", "t": { "Close": { "v": ["Bezárás"] } } }, { "l": "id", "t": { "Close": { "v": ["Tutup"] } } }, { "l": "is", "t": { "Close": { "v": ["Loka"] } } }, { "l": "it", "t": { "Close": { "v": ["Chiudi"] } } }, { "l": "ja", "t": { "Close": { "v": ["閉じる"] } } }, { "l": "ja-JP", "t": { "Close": { "v": ["閉じる"] } } }, { "l": "ko", "t": { "Close": { "v": ["닫기"] } } }, { "l": "lt-LT", "t": { "Close": { "v": ["Užverti"] } } }, { "l": "lv", "t": { "Close": { "v": ["Aizvērt"] } } }, { "l": "mk", "t": { "Close": { "v": ["Затвори"] } } }, { "l": "my", "t": { "Close": { "v": ["ပိတ်ရန်"] } } }, { "l": "nb", "t": { "Close": { "v": ["Lukk"] } } }, { "l": "nl", "t": { "Close": { "v": ["Sluiten"] } } }, { "l": "oc", "t": { "Close": { "v": ["Tampar"] } } }, { "l": "pl", "t": { "Close": { "v": ["Zamknij"] } } }, { "l": "pt-BR", "t": { "Close": { "v": ["Fechar"] } } }, { "l": "pt-PT", "t": { "Close": { "v": ["Fechar"] } } }, { "l": "ro", "t": { "Close": { "v": ["Închideți"] } } }, { "l": "ru", "t": { "Close": { "v": ["Закрыть"] } } }, { "l": "sk", "t": { "Close": { "v": ["Zavrieť"] } } }, { "l": "sl", "t": { "Close": { "v": ["Zapri"] } } }, { "l": "sr", "t": { "Close": { "v": ["Затвори"] } } }, { "l": "sv", "t": { "Close": { "v": ["Stäng"] } } }, { "l": "tr", "t": { "Close": { "v": ["Kapat"] } } }, { "l": "uk", "t": { "Close": { "v": ["Закрити"] } } }, { "l": "uz", "t": { "Close": { "v": ["Yopish"] } } }, { "l": "zh-CN", "t": { "Close": { "v": ["关闭"] } } }, { "l": "zh-HK", "t": { "Close": { "v": ["關閉"] } } }, { "l": "zh-TW", "t": { "Close": { "v": ["關閉"] } } }];
const t19 = [{ "l": "ar", "t": { "Close navigation": { "v": ["إغلاق التصفح"] }, "Open navigation {shortcut}": { "v": ["إفتَح المتصفح {shortcut}"] } } }, { "l": "ast", "t": { "Close navigation": { "v": ["Zarrar la navegación"] } } }, { "l": "br", "t": {} }, { "l": "ca", "t": { "Close navigation": { "v": ["Tanca la navegació"] } } }, { "l": "cs", "t": { "Close navigation": { "v": ["Zavřít navigaci"] }, "Open navigation {shortcut}": { "v": ["Otevřít navigaci {shortcut}"] } } }, { "l": "cs-CZ", "t": { "Close navigation": { "v": ["Zavřít navigaci"] } } }, { "l": "da", "t": { "Close navigation": { "v": ["Luk navigation"] }, "Open navigation {shortcut}": { "v": ["Åbn navigation {shortcut}"] } } }, { "l": "de", "t": { "Close navigation": { "v": ["Navigation schließen"] }, "Open navigation {shortcut}": { "v": ["Navigation öffnen {shortcut}"] } } }, { "l": "de-DE", "t": { "Close navigation": { "v": ["Navigation schließen"] }, "Open navigation {shortcut}": { "v": ["Navigation öffnen {shortcut}"] } } }, { "l": "el", "t": { "Close navigation": { "v": ["Κλείσιμο πλοήγησης"] }, "Open navigation {shortcut}": { "v": ["Άνοιγμα πλοήγησης {shortcut}"] } } }, { "l": "en-GB", "t": { "Close navigation": { "v": ["Close navigation"] }, "Open navigation {shortcut}": { "v": ["Open navigation {shortcut}"] } } }, { "l": "eo", "t": {} }, { "l": "es", "t": { "Close navigation": { "v": ["Cerrar navegación"] } } }, { "l": "es-AR", "t": { "Close navigation": { "v": ["Cerrar navegación"] } } }, { "l": "es-EC", "t": { "Close navigation": { "v": ["Cerrar navegación"] } } }, { "l": "es-MX", "t": { "Close navigation": { "v": ["Cerrar navegación"] } } }, { "l": "et-EE", "t": { "Close navigation": { "v": ["Sulge navigatsioon"] }, "Open navigation {shortcut}": { "v": ["Ava valik {shortcut}"] } } }, { "l": "eu", "t": { "Close navigation": { "v": ["Itxi nabigazioa"] } } }, { "l": "fa", "t": { "Close navigation": { "v": ["بستن بخش ناوبری"] } } }, { "l": "fi", "t": { "Close navigation": { "v": ["Sulje navigaatio"] }, "Open navigation {shortcut}": { "v": ["Avaa navigaatio {shortcut}"] } } }, { "l": "fr", "t": { "Close navigation": { "v": ["Fermer la navigation"] }, "Open navigation {shortcut}": { "v": ["Ouvrir la navigation {shortcut}"] } } }, { "l": "ga", "t": { "Close navigation": { "v": ["Dún nascleanúint"] }, "Open navigation {shortcut}": { "v": ["Oscail nascleanúint {shortcut}"] } } }, { "l": "gl", "t": { "Close navigation": { "v": ["Pechar a navegación"] }, "Open navigation {shortcut}": { "v": ["Abrir a navegación {shortcut}"] } } }, { "l": "he", "t": { "Close navigation": { "v": ["סגירת הניווט"] } } }, { "l": "hu", "t": { "Close navigation": { "v": ["Navigáció bezárása"] } } }, { "l": "id", "t": { "Close navigation": { "v": ["Tutup navigasi"] } } }, { "l": "is", "t": { "Close navigation": { "v": ["Loka leiðsagnarsleða"] }, "Open navigation {shortcut}": { "v": ["Opna flakkstýringu {shortcut}"] } } }, { "l": "it", "t": { "Close navigation": { "v": ["Chiudi la navigazione"] } } }, { "l": "ja", "t": { "Close navigation": { "v": ["ナビゲーションを閉じる"] }, "Open navigation {shortcut}": { "v": ["ナビゲーションを開く {shortcut}"] } } }, { "l": "ja-JP", "t": { "Close navigation": { "v": ["ナビゲーションを閉じる"] } } }, { "l": "ko", "t": { "Close navigation": { "v": ["탐색 닫기"] }, "Open navigation {shortcut}": { "v": ["{shortcut} 탐색 열기"] } } }, { "l": "lt-LT", "t": {} }, { "l": "lv", "t": {} }, { "l": "mk", "t": { "Close navigation": { "v": ["Затвори навигација"] } } }, { "l": "my", "t": {} }, { "l": "nb", "t": { "Close navigation": { "v": ["Lukk navigasjon"] } } }, { "l": "nl", "t": { "Close navigation": { "v": ["Navigatie sluiten"] }, "Open navigation {shortcut}": { "v": ["Navigatie openen {shortcut}"] } } }, { "l": "oc", "t": {} }, { "l": "pl", "t": { "Close navigation": { "v": ["Zamknij nawigację"] }, "Open navigation {shortcut}": { "v": ["Otwórz nawigację {shortcut}"] } } }, { "l": "pt-BR", "t": { "Close navigation": { "v": ["Fechar navegação"] }, "Open navigation {shortcut}": { "v": ["Abrir navegação {shortcut}"] } } }, { "l": "pt-PT", "t": { "Close navigation": { "v": ["Fechar navegação"] }, "Open navigation {shortcut}": { "v": ["Abrir navegação {shortcut}"] } } }, { "l": "ro", "t": { "Close navigation": { "v": ["Închideți navigarea"] } } }, { "l": "ru", "t": { "Close navigation": { "v": ["Закрыть навигацию"] }, "Open navigation {shortcut}": { "v": ["Открыть навигацию {shortcut}"] } } }, { "l": "sk", "t": { "Close navigation": { "v": ["Zavrieť navigáciu"] }, "Open navigation {shortcut}": { "v": ["Otvoriť navigáciu {shortcut}"] } } }, { "l": "sl", "t": { "Close navigation": { "v": ["Zapri krmarjenje"] } } }, { "l": "sr", "t": { "Close navigation": { "v": ["Затвори навигацију"] }, "Open navigation {shortcut}": { "v": ["Отвори навигацију {shortcut}"] } } }, { "l": "sv", "t": { "Close navigation": { "v": ["Stäng navigering"] }, "Open navigation {shortcut}": { "v": ["Öppna navigering {shortcut}"] } } }, { "l": "tr", "t": { "Close navigation": { "v": ["Gezinmeyi kapat"] }, "Open navigation {shortcut}": { "v": ["Gezinmeyi aç {shortcut}"] } } }, { "l": "uk", "t": { "Close navigation": { "v": ["Закрити навігацію"] }, "Open navigation {shortcut}": { "v": ["Відкрити навігацію {shortcut}"] } } }, { "l": "uz", "t": { "Close navigation": { "v": ["Navigatsiyani yopish"] }, "Open navigation {shortcut}": { "v": [" {shortcut} navigatsiyani oching"] } } }, { "l": "zh-CN", "t": { "Close navigation": { "v": ["关闭导航"] }, "Open navigation {shortcut}": { "v": ["打开导览{shortcut}"] } } }, { "l": "zh-HK", "t": { "Close navigation": { "v": ["關閉導航"] }, "Open navigation {shortcut}": { "v": ["開啟導航 {shortcut}"] } } }, { "l": "zh-TW", "t": { "Close navigation": { "v": ["關閉導航"] } } }];
const t20 = [{ "l": "ar", "t": { "Collapse menu": { "v": ["طي القائمة"] }, "Open menu": { "v": ["إفتَح القائمة"] } } }, { "l": "ast", "t": { "Collapse menu": { "v": ["Recoyer el menú"] }, "Open menu": { "v": ["Abrir le menú"] } } }, { "l": "br", "t": {} }, { "l": "ca", "t": {} }, { "l": "cs", "t": { "Collapse menu": { "v": ["Sbalit nabídku"] }, "Open menu": { "v": ["Otevřít nabídku"] } } }, { "l": "cs-CZ", "t": { "Collapse menu": { "v": ["Sbalit nabídku"] }, "Open menu": { "v": ["Otevřít nabídku"] } } }, { "l": "da", "t": { "Collapse menu": { "v": ["Skjul menuen"] }, "Open menu": { "v": ["Åben menu"] } } }, { "l": "de", "t": { "Collapse menu": { "v": ["Menü einklappen"] }, "Open menu": { "v": ["Menü öffnen"] } } }, { "l": "de-DE", "t": { "Collapse menu": { "v": ["Menü einklappen"] }, "Open menu": { "v": ["Menü öffnen"] } } }, { "l": "el", "t": { "Collapse menu": { "v": ["Σύμπτυξη μενού"] }, "Open menu": { "v": ["Άνοιγμα μενού"] } } }, { "l": "en-GB", "t": { "Collapse menu": { "v": ["Collapse menu"] }, "Open menu": { "v": ["Open menu"] } } }, { "l": "eo", "t": {} }, { "l": "es", "t": { "Collapse menu": { "v": ["Ocultar menú"] }, "Open menu": { "v": ["Abrir menú"] } } }, { "l": "es-AR", "t": { "Collapse menu": { "v": ["Ocultar menú"] }, "Open menu": { "v": ["Abrir menú"] } } }, { "l": "es-EC", "t": { "Collapse menu": { "v": ["Ocultar menú"] }, "Open menu": { "v": ["Abrir menú"] } } }, { "l": "es-MX", "t": { "Collapse menu": { "v": ["Ocultar menú"] }, "Open menu": { "v": ["Abrir menú"] } } }, { "l": "et-EE", "t": { "Collapse menu": { "v": ["Menüü kokkuklappimine"] }, "Open menu": { "v": ["Ava menüü"] } } }, { "l": "eu", "t": { "Collapse menu": { "v": ["Tolestu menua"] }, "Open menu": { "v": ["Ireki menua"] } } }, { "l": "fa", "t": { "Collapse menu": { "v": ["بستن فهرست"] }, "Open menu": { "v": ["باز کردن فهرست"] } } }, { "l": "fi", "t": { "Collapse menu": { "v": ["Supista valikko"] }, "Open menu": { "v": ["Avaa valikko"] } } }, { "l": "fr", "t": { "Collapse menu": { "v": ["Réduire le menu"] }, "Open menu": { "v": ["Ouvrir le menu"] } } }, { "l": "ga", "t": { "Collapse menu": { "v": ["Roghchlár Laghdaigh"] }, "Open menu": { "v": ["Roghchlár a oscailt"] } } }, { "l": "gl", "t": { "Collapse menu": { "v": ["Contraer o menú"] }, "Open menu": { "v": ["Abrir o menú"] } } }, { "l": "he", "t": { "Collapse menu": { "v": ["צמצום התפריט"] }, "Open menu": { "v": ["פתיחת תפריט"] } } }, { "l": "hu", "t": {} }, { "l": "id", "t": { "Collapse menu": { "v": ["Ciutkan menu"] }, "Open menu": { "v": ["Buka menu"] } } }, { "l": "is", "t": { "Collapse menu": { "v": ["Fella valmynd saman"] }, "Open menu": { "v": ["Opna valmynd"] } } }, { "l": "it", "t": { "Collapse menu": { "v": ["Chiudi Menu"] }, "Open menu": { "v": ["Apri il menu"] } } }, { "l": "ja", "t": { "Collapse menu": { "v": ["メニューの折りたたみ"] }, "Open menu": { "v": ["メニューを開く"] } } }, { "l": "ja-JP", "t": { "Collapse menu": { "v": ["メニューの折りたたみ"] }, "Open menu": { "v": ["メニューを開く"] } } }, { "l": "ko", "t": { "Collapse menu": { "v": ["메뉴 접기"] }, "Open menu": { "v": ["메뉴 열기"] } } }, { "l": "lt-LT", "t": {} }, { "l": "lv", "t": {} }, { "l": "mk", "t": {} }, { "l": "my", "t": {} }, { "l": "nb", "t": { "Collapse menu": { "v": ["Skjul meny"] }, "Open menu": { "v": ["Åpne meny"] } } }, { "l": "nl", "t": { "Collapse menu": { "v": ["Klap menu in"] }, "Open menu": { "v": ["Open menu"] } } }, { "l": "oc", "t": {} }, { "l": "pl", "t": { "Collapse menu": { "v": ["Zwiń menu"] }, "Open menu": { "v": ["Otwórz menu"] } } }, { "l": "pt-BR", "t": { "Collapse menu": { "v": ["Recolher menu"] }, "Open menu": { "v": ["Abrir menu"] } } }, { "l": "pt-PT", "t": { "Collapse menu": { "v": ["Ocultar menu"] }, "Open menu": { "v": ["Abrir menu"] } } }, { "l": "ro", "t": { "Collapse menu": { "v": ["Restrânge meniul"] }, "Open menu": { "v": ["Deschide meniul"] } } }, { "l": "ru", "t": { "Collapse menu": { "v": ["Свернуть меню"] }, "Open menu": { "v": ["Открыть меню"] } } }, { "l": "sk", "t": { "Collapse menu": { "v": ["Zbaliť menu"] }, "Open menu": { "v": ["Otvoriť menu"] } } }, { "l": "sl", "t": {} }, { "l": "sr", "t": { "Collapse menu": { "v": ["Сажми мени"] }, "Open menu": { "v": ["Отвори мени"] } } }, { "l": "sv", "t": { "Collapse menu": { "v": ["Dölj menyn"] }, "Open menu": { "v": ["Öppna menyn"] } } }, { "l": "tr", "t": { "Collapse menu": { "v": ["Menüyü daralt"] }, "Open menu": { "v": ["Menüyü aç"] } } }, { "l": "uk", "t": { "Collapse menu": { "v": ["Згорнути меню"] }, "Open menu": { "v": ["Відкрити меню"] } } }, { "l": "uz", "t": { "Collapse menu": { "v": ["Menyuni yig‘ish"] }, "Open menu": { "v": ["Menyuni oching"] } } }, { "l": "zh-CN", "t": { "Collapse menu": { "v": ["收起菜单"] }, "Open menu": { "v": ["打开菜单"] } } }, { "l": "zh-HK", "t": { "Collapse menu": { "v": ["折疊選單"] }, "Open menu": { "v": ["開啟選單"] } } }, { "l": "zh-TW", "t": { "Collapse menu": { "v": ["折疊選單"] }, "Open menu": { "v": ["開啟選單"] } } }];
const t22 = [{ "l": "ar", "t": { "Edit item": { "v": ["تعديل عنصر"] } } }, { "l": "ast", "t": { "Edit item": { "v": ["Editar l'elementu"] } } }, { "l": "br", "t": {} }, { "l": "ca", "t": { "Edit item": { "v": ["Edita l'element"] } } }, { "l": "cs", "t": { "Edit item": { "v": ["Upravit položku"] } } }, { "l": "cs-CZ", "t": { "Edit item": { "v": ["Upravit položku"] } } }, { "l": "da", "t": { "Edit item": { "v": ["Rediger emne"] } } }, { "l": "de", "t": { "Edit item": { "v": ["Objekt bearbeiten"] } } }, { "l": "de-DE", "t": { "Edit item": { "v": ["Element bearbeiten"] } } }, { "l": "el", "t": { "Edit item": { "v": ["Επεξεργασία αντικειμένου"] } } }, { "l": "en-GB", "t": { "Edit item": { "v": ["Edit item"] } } }, { "l": "eo", "t": {} }, { "l": "es", "t": { "Edit item": { "v": ["Editar elemento"] } } }, { "l": "es-AR", "t": { "Edit item": { "v": ["Editar elemento"] } } }, { "l": "es-EC", "t": { "Edit item": { "v": ["Editar elemento"] } } }, { "l": "es-MX", "t": { "Edit item": { "v": ["Editar elemento"] } } }, { "l": "et-EE", "t": { "Edit item": { "v": ["Muuda objekti"] } } }, { "l": "eu", "t": { "Edit item": { "v": ["Editatu elementua"] } } }, { "l": "fa", "t": { "Edit item": { "v": ["ویرایش مورد"] } } }, { "l": "fi", "t": { "Edit item": { "v": ["Muokkaa kohdetta"] } } }, { "l": "fr", "t": { "Edit item": { "v": ["Éditer l'élément"] } } }, { "l": "ga", "t": { "Edit item": { "v": ["Cuir mír in eagar"] } } }, { "l": "gl", "t": { "Edit item": { "v": ["Editar o elemento"] } } }, { "l": "he", "t": { "Edit item": { "v": ["עריכת פריט"] } } }, { "l": "hu", "t": { "Edit item": { "v": ["Elem szerkesztése"] } } }, { "l": "id", "t": { "Edit item": { "v": ["Edit item"] } } }, { "l": "is", "t": { "Edit item": { "v": ["Breyta atriði"] } } }, { "l": "it", "t": { "Edit item": { "v": ["Modifica l'elemento"] } } }, { "l": "ja", "t": { "Edit item": { "v": ["編集"] } } }, { "l": "ja-JP", "t": { "Edit item": { "v": ["編集"] } } }, { "l": "ko", "t": { "Edit item": { "v": ["항목 수정"] } } }, { "l": "lt-LT", "t": {} }, { "l": "lv", "t": {} }, { "l": "mk", "t": { "Edit item": { "v": ["Уреди"] } } }, { "l": "my", "t": {} }, { "l": "nb", "t": { "Edit item": { "v": ["Rediger"] } } }, { "l": "nl", "t": { "Edit item": { "v": ["Item bewerken"] } } }, { "l": "oc", "t": {} }, { "l": "pl", "t": { "Edit item": { "v": ["Edytuj element"] } } }, { "l": "pt-BR", "t": { "Edit item": { "v": ["Editar item"] } } }, { "l": "pt-PT", "t": { "Edit item": { "v": ["Editar item"] } } }, { "l": "ro", "t": { "Edit item": { "v": ["Editați elementul"] } } }, { "l": "ru", "t": { "Edit item": { "v": ["Изменить элемент"] } } }, { "l": "sk", "t": { "Edit item": { "v": ["Upraviť položku"] } } }, { "l": "sl", "t": { "Edit item": { "v": ["Uredi predmet"] } } }, { "l": "sr", "t": { "Edit item": { "v": ["Уреди ставку"] } } }, { "l": "sv", "t": { "Edit item": { "v": ["Redigera objekt"] } } }, { "l": "tr", "t": { "Edit item": { "v": ["Ögeyi düzenle"] } } }, { "l": "uk", "t": { "Edit item": { "v": ["Редагувати елемент"] } } }, { "l": "uz", "t": { "Edit item": { "v": ["Elementni tahrirlash"] } } }, { "l": "zh-CN", "t": { "Edit item": { "v": ["编辑项目"] } } }, { "l": "zh-HK", "t": { "Edit item": { "v": ["編輯項目"] } } }, { "l": "zh-TW", "t": { "Edit item": { "v": ["編輯項目"] } } }];
const t23 = [{ "l": "ar", "t": { "Enable interactive view": { "v": ["تمكين المنظور التفاعلي"] } } }, { "l": "ast", "t": { "Enable interactive view": { "v": ["Activar la vista interactiva"] } } }, { "l": "br", "t": {} }, { "l": "ca", "t": {} }, { "l": "cs", "t": { "Enable interactive view": { "v": ["Zapnout interaktivní zobrazení"] } } }, { "l": "cs-CZ", "t": {} }, { "l": "da", "t": { "Enable interactive view": { "v": ["Aktiver interaktiv visning"] } } }, { "l": "de", "t": { "Enable interactive view": { "v": ["Die interaktive Ansicht aktivieren"] } } }, { "l": "de-DE", "t": { "Enable interactive view": { "v": ["Die interaktive Ansicht aktivieren"] } } }, { "l": "el", "t": { "Enable interactive view": { "v": ["Ενεργοποίηση διαδραστικής προβολής"] } } }, { "l": "en-GB", "t": { "Enable interactive view": { "v": ["Enable interactive view"] } } }, { "l": "eo", "t": {} }, { "l": "es", "t": { "Enable interactive view": { "v": ["Habilitar vista interactiva"] } } }, { "l": "es-AR", "t": { "Enable interactive view": { "v": ["Habilitar vista interactiva"] } } }, { "l": "es-EC", "t": {} }, { "l": "es-MX", "t": { "Enable interactive view": { "v": ["Habilitar vista interactiva"] } } }, { "l": "et-EE", "t": { "Enable interactive view": { "v": ["Lülita interaktiivne vaade sisse"] } } }, { "l": "eu", "t": {} }, { "l": "fa", "t": { "Enable interactive view": { "v": ["فعال‌سازی نمای تعاملی"] } } }, { "l": "fi", "t": { "Enable interactive view": { "v": ["Näytä vuorovaikutteinen näkymä"] } } }, { "l": "fr", "t": { "Enable interactive view": { "v": ["Activer la vue interactive"] } } }, { "l": "ga", "t": { "Enable interactive view": { "v": ["Cumasaigh amharc idirghníomhach"] } } }, { "l": "gl", "t": { "Enable interactive view": { "v": ["Activar a vista interactiva"] } } }, { "l": "he", "t": {} }, { "l": "hu", "t": {} }, { "l": "id", "t": {} }, { "l": "is", "t": { "Enable interactive view": { "v": ["Virkja gagnvirka sýn"] } } }, { "l": "it", "t": {} }, { "l": "ja", "t": { "Enable interactive view": { "v": ["インタラクティブ・ビューを有効にする"] } } }, { "l": "ja-JP", "t": { "Enable interactive view": { "v": ["インタラクティブ・ビューを有効にする"] } } }, { "l": "ko", "t": { "Enable interactive view": { "v": ["대화형 보기 활성화"] } } }, { "l": "lt-LT", "t": {} }, { "l": "lv", "t": {} }, { "l": "mk", "t": {} }, { "l": "my", "t": {} }, { "l": "nb", "t": { "Enable interactive view": { "v": ["Aktiver interaktiv visning"] } } }, { "l": "nl", "t": { "Enable interactive view": { "v": ["Interactieve weergave inschakelen"] } } }, { "l": "oc", "t": {} }, { "l": "pl", "t": { "Enable interactive view": { "v": ["Włącz widok interaktywny"] } } }, { "l": "pt-BR", "t": { "Enable interactive view": { "v": ["Ativar visualização interativa"] } } }, { "l": "pt-PT", "t": { "Enable interactive view": { "v": ["Ativar vista interativa"] } } }, { "l": "ro", "t": {} }, { "l": "ru", "t": { "Enable interactive view": { "v": ["Включить интерактивный просмотр"] } } }, { "l": "sk", "t": { "Enable interactive view": { "v": ["Povoliť interaktívny pohľad"] } } }, { "l": "sl", "t": {} }, { "l": "sr", "t": { "Enable interactive view": { "v": ["Укључи интерактивни приказ"] } } }, { "l": "sv", "t": { "Enable interactive view": { "v": ["Aktivera interaktiv vy"] } } }, { "l": "tr", "t": { "Enable interactive view": { "v": ["Etkileşimli görünümü aç"] } } }, { "l": "uk", "t": { "Enable interactive view": { "v": ["Увімкнути інтерактивний перегляд"] } } }, { "l": "uz", "t": { "Enable interactive view": { "v": ["Interaktiv ko'rinishni yoqing"] } } }, { "l": "zh-CN", "t": { "Enable interactive view": { "v": ["启用交互视窗"] } } }, { "l": "zh-HK", "t": { "Enable interactive view": { "v": ["啟用互動視圖"] } } }, { "l": "zh-TW", "t": {} }];
const t24 = [{ "l": "ar", "t": { "Enter link": { "v": ["أدخِل الرابط"] } } }, { "l": "ast", "t": { "Enter link": { "v": ["Introducir l'enllaz"] } } }, { "l": "br", "t": {} }, { "l": "ca", "t": {} }, { "l": "cs", "t": { "Enter link": { "v": ["Zadat odkaz"] } } }, { "l": "cs-CZ", "t": { "Enter link": { "v": ["Zadat odkaz"] } } }, { "l": "da", "t": { "Enter link": { "v": ["Indtast link"] } } }, { "l": "de", "t": { "Enter link": { "v": ["Link eingeben"] } } }, { "l": "de-DE", "t": { "Enter link": { "v": ["Link eingeben"] } } }, { "l": "el", "t": { "Enter link": { "v": ["Εισάγετε σύνδεσμο"] } } }, { "l": "en-GB", "t": { "Enter link": { "v": ["Enter link"] } } }, { "l": "eo", "t": {} }, { "l": "es", "t": { "Enter link": { "v": ["Ingrese enlace"] } } }, { "l": "es-AR", "t": { "Enter link": { "v": ["Ingresar enlace"] } } }, { "l": "es-EC", "t": { "Enter link": { "v": ["Ingresar enlace"] } } }, { "l": "es-MX", "t": { "Enter link": { "v": ["Ingresar enlace"] } } }, { "l": "et-EE", "t": { "Enter link": { "v": ["Sisesta link"] } } }, { "l": "eu", "t": { "Enter link": { "v": ["Sartu esteka"] } } }, { "l": "fa", "t": { "Enter link": { "v": ["لینک را وارد کنید"] } } }, { "l": "fi", "t": { "Enter link": { "v": ["Kirjoita linkki"] } } }, { "l": "fr", "t": { "Enter link": { "v": ["Saisissez le lien"] } } }, { "l": "ga", "t": { "Enter link": { "v": ["Cuir isteach nasc"] } } }, { "l": "gl", "t": { "Enter link": { "v": ["Introducir a ligazón"] } } }, { "l": "he", "t": { "Enter link": { "v": ["מילוי קישור"] } } }, { "l": "hu", "t": {} }, { "l": "id", "t": { "Enter link": { "v": ["Masukkan tautan"] } } }, { "l": "is", "t": { "Enter link": { "v": ["Settu inn tengil"] } } }, { "l": "it", "t": { "Enter link": { "v": ["Inserire il link"] } } }, { "l": "ja", "t": { "Enter link": { "v": ["リンクを入力する"] } } }, { "l": "ja-JP", "t": { "Enter link": { "v": ["リンクを入力する"] } } }, { "l": "ko", "t": { "Enter link": { "v": ["링크 입력"] } } }, { "l": "lt-LT", "t": {} }, { "l": "lv", "t": {} }, { "l": "mk", "t": {} }, { "l": "my", "t": {} }, { "l": "nb", "t": { "Enter link": { "v": ["Skriv inn lenken"] } } }, { "l": "nl", "t": { "Enter link": { "v": ["Voer link in"] } } }, { "l": "oc", "t": {} }, { "l": "pl", "t": { "Enter link": { "v": ["Wprowadź link"] } } }, { "l": "pt-BR", "t": { "Enter link": { "v": ["Insira o link"] } } }, { "l": "pt-PT", "t": { "Enter link": { "v": ["Inserir hiperligação"] } } }, { "l": "ro", "t": { "Enter link": { "v": ["Introduceți link-ul"] } } }, { "l": "ru", "t": { "Enter link": { "v": ["Введите ссылку"] } } }, { "l": "sk", "t": { "Enter link": { "v": ["Vložiť link"] } } }, { "l": "sl", "t": {} }, { "l": "sr", "t": { "Enter link": { "v": ["Унесите линк"] } } }, { "l": "sv", "t": { "Enter link": { "v": ["Ange länk"] } } }, { "l": "tr", "t": { "Enter link": { "v": ["Bağlantıyı yazın"] } } }, { "l": "uk", "t": { "Enter link": { "v": ["Зазначте посилання"] } } }, { "l": "uz", "t": { "Enter link": { "v": ["Havolani kiriting"] } } }, { "l": "zh-CN", "t": { "Enter link": { "v": ["输入链接"] } } }, { "l": "zh-HK", "t": { "Enter link": { "v": ["輸入連結"] } } }, { "l": "zh-TW", "t": { "Enter link": { "v": ["輸入連結"] } } }];
const t25 = [{ "l": "ar", "t": { "External documentation for {name}": { "v": ["التوثيق الخارجي لـ {name}"] } } }, { "l": "ast", "t": { "External documentation for {name}": { "v": ["Documentación esterna pa: {name}"] } } }, { "l": "br", "t": {} }, { "l": "ca", "t": {} }, { "l": "cs", "t": { "External documentation for {name}": { "v": ["Externí dokumentace pro {name}"] } } }, { "l": "cs-CZ", "t": { "External documentation for {name}": { "v": ["Externí dokumentace pro {name}"] } } }, { "l": "da", "t": { "External documentation for {name}": { "v": ["Ekstern dokumentation for {name}"] } } }, { "l": "de", "t": { "External documentation for {name}": { "v": ["Externe Dokumentation für {name}"] } } }, { "l": "de-DE", "t": { "External documentation for {name}": { "v": ["Externe Dokumentation für {name}"] } } }, { "l": "el", "t": { "External documentation for {name}": { "v": ["Εξωτερική τεκμηρίωση για {name}"] } } }, { "l": "en-GB", "t": { "External documentation for {name}": { "v": ["External documentation for {name}"] } } }, { "l": "eo", "t": {} }, { "l": "es", "t": { "External documentation for {name}": { "v": ["Documentación externa para {name}"] } } }, { "l": "es-AR", "t": { "External documentation for {name}": { "v": ["Documentación externa para {name}"] } } }, { "l": "es-EC", "t": { "External documentation for {name}": { "v": ["Documentación externa para {name}"] } } }, { "l": "es-MX", "t": { "External documentation for {name}": { "v": ["Documentación externa para {name}"] } } }, { "l": "et-EE", "t": { "External documentation for {name}": { "v": ["Väline dokumentatsioon {nimi}"] } } }, { "l": "eu", "t": { "External documentation for {name}": { "v": ["{name}-ren kanpoko dokumentazioa"] } } }, { "l": "fa", "t": { "External documentation for {name}": { "v": ["اسناد بیرونی برای {name}"] } } }, { "l": "fi", "t": { "External documentation for {name}": { "v": ["Ulkoinen dokumentaatio {name}lle"] } } }, { "l": "fr", "t": { "External documentation for {name}": { "v": ["Documentation externe pour {name}"] } } }, { "l": "ga", "t": { "External documentation for {name}": { "v": ["Doiciméadúchán seachtrach le haghaidh {name}"] } } }, { "l": "gl", "t": { "External documentation for {name}": { "v": ["Documentación externa para {name}"] } } }, { "l": "he", "t": { "External documentation for {name}": { "v": ["תיעוד חיצוני עבור {name}"] } } }, { "l": "hu", "t": {} }, { "l": "id", "t": { "External documentation for {name}": { "v": ["Dokumentasi eksternal untuk {name}"] } } }, { "l": "is", "t": { "External documentation for {name}": { "v": ["Utanaðkomandi leiðbeiningar fyrir {name}"] } } }, { "l": "it", "t": { "External documentation for {name}": { "v": ["Documentazione esterna per {name}"] } } }, { "l": "ja", "t": { "External documentation for {name}": { "v": ["{name} の外部ドキュメント"] } } }, { "l": "ja-JP", "t": { "External documentation for {name}": { "v": ["{name} の外部ドキュメント"] } } }, { "l": "ko", "t": { "External documentation for {name}": { "v": ["{name}의 외부 문서"] } } }, { "l": "lt-LT", "t": {} }, { "l": "lv", "t": {} }, { "l": "mk", "t": {} }, { "l": "my", "t": {} }, { "l": "nb", "t": { "External documentation for {name}": { "v": ["Ekstern dokumentasjon for {name}"] } } }, { "l": "nl", "t": { "External documentation for {name}": { "v": ["Externe documentatie voor {name}"] } } }, { "l": "oc", "t": {} }, { "l": "pl", "t": { "External documentation for {name}": { "v": ["Dokumentacja zewnętrzna dla {name}"] } } }, { "l": "pt-BR", "t": { "External documentation for {name}": { "v": ["Documentação externa para {name}"] } } }, { "l": "pt-PT", "t": { "External documentation for {name}": { "v": ["Documentação externa para {name}"] } } }, { "l": "ro", "t": { "External documentation for {name}": { "v": ["Documentație externă pentru {name}"] } } }, { "l": "ru", "t": { "External documentation for {name}": { "v": ["Внешняя документация для {name}"] } } }, { "l": "sk", "t": { "External documentation for {name}": { "v": ["Externá dokumentácia pre {name}"] } } }, { "l": "sl", "t": {} }, { "l": "sr", "t": { "External documentation for {name}": { "v": ["Спољна документација за {name}"] } } }, { "l": "sv", "t": { "External documentation for {name}": { "v": ["Extern dokumentation för {name}"] } } }, { "l": "tr", "t": { "External documentation for {name}": { "v": ["{name} için dış belgeler"] } } }, { "l": "uk", "t": { "External documentation for {name}": { "v": ["Зовнішня документація для {name}"] } } }, { "l": "uz", "t": { "External documentation for {name}": { "v": ["{name}uchun tashqi hujjatlar"] } } }, { "l": "zh-CN", "t": { "External documentation for {name}": { "v": ["{name} 的外部文档"] } } }, { "l": "zh-HK", "t": { "External documentation for {name}": { "v": ["{name} 的外部文件"] } } }, { "l": "zh-TW", "t": { "External documentation for {name}": { "v": ["{name} 的外部文件"] } } }];
const t26 = [{ "l": "ar", "t": { "Global": { "v": ["شامل"] } } }, { "l": "ast", "t": { "Global": { "v": ["Global"] } } }, { "l": "br", "t": {} }, { "l": "ca", "t": { "Global": { "v": ["Global"] } } }, { "l": "cs", "t": { "Global": { "v": ["Globální"] } } }, { "l": "cs-CZ", "t": { "Global": { "v": ["Globální"] } } }, { "l": "da", "t": { "Global": { "v": ["Global"] } } }, { "l": "de", "t": { "Global": { "v": ["Global"] } } }, { "l": "de-DE", "t": { "Global": { "v": ["Global"] } } }, { "l": "el", "t": { "Global": { "v": ["Καθολικό"] } } }, { "l": "en-GB", "t": { "Global": { "v": ["Global"] } } }, { "l": "eo", "t": {} }, { "l": "es", "t": { "Global": { "v": ["Global"] } } }, { "l": "es-AR", "t": { "Global": { "v": ["Global"] } } }, { "l": "es-EC", "t": { "Global": { "v": ["Global"] } } }, { "l": "es-MX", "t": { "Global": { "v": ["Global"] } } }, { "l": "et-EE", "t": { "Global": { "v": ["Globaalne"] } } }, { "l": "eu", "t": { "Global": { "v": ["Globala"] } } }, { "l": "fa", "t": { "Global": { "v": ["سراسری"] } } }, { "l": "fi", "t": { "Global": { "v": ["Globaali"] } } }, { "l": "fr", "t": { "Global": { "v": ["Global"] } } }, { "l": "ga", "t": { "Global": { "v": ["Domhanda"] } } }, { "l": "gl", "t": { "Global": { "v": ["Global"] } } }, { "l": "he", "t": { "Global": { "v": ["כללי"] } } }, { "l": "hu", "t": { "Global": { "v": ["Globális"] } } }, { "l": "id", "t": { "Global": { "v": ["Global"] } } }, { "l": "is", "t": { "Global": { "v": ["Almennt"] } } }, { "l": "it", "t": { "Global": { "v": ["Globale"] } } }, { "l": "ja", "t": { "Global": { "v": ["全体"] } } }, { "l": "ja-JP", "t": { "Global": { "v": ["全体"] } } }, { "l": "ko", "t": { "Global": { "v": ["글로벌"] } } }, { "l": "lt-LT", "t": {} }, { "l": "lv", "t": {} }, { "l": "mk", "t": { "Global": { "v": ["Глобално"] } } }, { "l": "my", "t": { "Global": { "v": ["ကမ္ဘာလုံးဆိုင်ရာ"] } } }, { "l": "nb", "t": { "Global": { "v": ["Global"] } } }, { "l": "nl", "t": { "Global": { "v": ["Globaal"] } } }, { "l": "oc", "t": {} }, { "l": "pl", "t": { "Global": { "v": ["Globalnie"] } } }, { "l": "pt-BR", "t": { "Global": { "v": ["Global"] } } }, { "l": "pt-PT", "t": { "Global": { "v": ["Global"] } } }, { "l": "ro", "t": { "Global": { "v": ["Global"] } } }, { "l": "ru", "t": { "Global": { "v": ["Глобальный"] } } }, { "l": "sk", "t": { "Global": { "v": ["Globálne"] } } }, { "l": "sl", "t": { "Global": { "v": ["Splošno"] } } }, { "l": "sr", "t": { "Global": { "v": ["Глобално"] } } }, { "l": "sv", "t": { "Global": { "v": ["Global"] } } }, { "l": "tr", "t": { "Global": { "v": ["Evrensel"] } } }, { "l": "uk", "t": { "Global": { "v": ["Глобальний"] } } }, { "l": "uz", "t": { "Global": { "v": ["Global"] } } }, { "l": "zh-CN", "t": { "Global": { "v": ["全局"] } } }, { "l": "zh-HK", "t": { "Global": { "v": ["全球的"] } } }, { "l": "zh-TW", "t": { "Global": { "v": ["全域"] } } }];
const t27 = [{ "l": "ar", "t": { "Go back to the list": { "v": ["عودة إلى القائمة"] } } }, { "l": "ast", "t": { "Go back to the list": { "v": ["Volver a la llista"] } } }, { "l": "br", "t": {} }, { "l": "ca", "t": { "Go back to the list": { "v": ["Torna a la llista"] } } }, { "l": "cs", "t": { "Go back to the list": { "v": ["Jít zpět na seznam"] } } }, { "l": "cs-CZ", "t": { "Go back to the list": { "v": ["Jít zpět na seznam"] } } }, { "l": "da", "t": { "Go back to the list": { "v": ["Tilbage til listen"] } } }, { "l": "de", "t": { "Go back to the list": { "v": ["Zurück zur Liste"] } } }, { "l": "de-DE", "t": { "Go back to the list": { "v": ["Zurück zur Liste"] } } }, { "l": "el", "t": { "Go back to the list": { "v": ["Επιστροφή στην αρχική λίστα"] } } }, { "l": "en-GB", "t": { "Go back to the list": { "v": ["Go back to the list"] } } }, { "l": "eo", "t": {} }, { "l": "es", "t": { "Go back to the list": { "v": ["Volver a la lista"] } } }, { "l": "es-AR", "t": { "Go back to the list": { "v": ["Volver a la lista"] } } }, { "l": "es-EC", "t": { "Go back to the list": { "v": ["Volver a la lista"] } } }, { "l": "es-MX", "t": { "Go back to the list": { "v": ["Regresar a la lista"] } } }, { "l": "et-EE", "t": { "Go back to the list": { "v": ["Tagasi nimekirja juurde"] } } }, { "l": "eu", "t": { "Go back to the list": { "v": ["Bueltatu zerrendara"] } } }, { "l": "fa", "t": { "Go back to the list": { "v": ["برگشت به لیست"] } } }, { "l": "fi", "t": { "Go back to the list": { "v": ["Takaisin listaan"] } } }, { "l": "fr", "t": { "Go back to the list": { "v": ["Retourner à la liste"] } } }, { "l": "ga", "t": { "Go back to the list": { "v": ["Téigh ar ais go dtí an liosta"] } } }, { "l": "gl", "t": { "Go back to the list": { "v": ["Volver á lista"] } } }, { "l": "he", "t": { "Go back to the list": { "v": ["חזרה לרשימה"] } } }, { "l": "hu", "t": { "Go back to the list": { "v": ["Ugrás vissza a listához"] } } }, { "l": "id", "t": { "Go back to the list": { "v": ["Kembali ke daftar"] } } }, { "l": "is", "t": { "Go back to the list": { "v": ["Fara til baka í listann"] } } }, { "l": "it", "t": { "Go back to the list": { "v": ["Torna all'elenco"] } } }, { "l": "ja", "t": { "Go back to the list": { "v": ["リストに戻る"] } } }, { "l": "ja-JP", "t": { "Go back to the list": { "v": ["リストに戻る"] } } }, { "l": "ko", "t": { "Go back to the list": { "v": ["목록으로 돌아가기"] } } }, { "l": "lt-LT", "t": {} }, { "l": "lv", "t": {} }, { "l": "mk", "t": { "Go back to the list": { "v": ["Врати се на листата"] } } }, { "l": "my", "t": {} }, { "l": "nb", "t": { "Go back to the list": { "v": ["Gå tilbake til listen"] } } }, { "l": "nl", "t": { "Go back to the list": { "v": ["Ga terug naar de lijst"] } } }, { "l": "oc", "t": {} }, { "l": "pl", "t": { "Go back to the list": { "v": ["Powrót do listy"] } } }, { "l": "pt-BR", "t": { "Go back to the list": { "v": ["Voltar para a lista"] } } }, { "l": "pt-PT", "t": { "Go back to the list": { "v": ["Voltar para a lista"] } } }, { "l": "ro", "t": { "Go back to the list": { "v": ["Întoarceți-vă la listă"] } } }, { "l": "ru", "t": { "Go back to the list": { "v": ["Вернуться к списку"] } } }, { "l": "sk", "t": { "Go back to the list": { "v": ["Späť na zoznam"] } } }, { "l": "sl", "t": { "Go back to the list": { "v": ["Vrni se na seznam"] } } }, { "l": "sr", "t": { "Go back to the list": { "v": ["Назад на листу"] } } }, { "l": "sv", "t": { "Go back to the list": { "v": ["Gå tillbaka till listan"] } } }, { "l": "tr", "t": { "Go back to the list": { "v": ["Listeye dön"] } } }, { "l": "uk", "t": { "Go back to the list": { "v": ["Повернутися до списку"] } } }, { "l": "uz", "t": { "Go back to the list": { "v": ["Ro'yxatga qayting"] } } }, { "l": "zh-CN", "t": { "Go back to the list": { "v": ["返回至列表"] } } }, { "l": "zh-HK", "t": { "Go back to the list": { "v": ["返回清單"] } } }, { "l": "zh-TW", "t": { "Go back to the list": { "v": ["回到清單"] } } }];
const t28 = [{ "l": "ar", "t": { "Hide details": { "v": ["أخفِ التفاصيل"] }, "Rename project": { "v": ["تغيير اسم المشروع"] }, "Show details": { "v": ["أظهِر التفاصيل"] } } }, { "l": "ast", "t": {} }, { "l": "br", "t": {} }, { "l": "ca", "t": {} }, { "l": "cs", "t": { "Hide details": { "v": ["Skrýt podrobnosti"] }, "Rename project": { "v": ["Přejmenovat projekt"] }, "Show details": { "v": ["Zobrazit podrobnosti"] } } }, { "l": "cs-CZ", "t": {} }, { "l": "da", "t": { "Hide details": { "v": ["Skjul detaljer"] }, "Rename project": { "v": ["Omdøb projekt"] }, "Show details": { "v": ["Vis detaljer"] } } }, { "l": "de", "t": { "Hide details": { "v": ["Details ausblenden"] }, "Rename project": { "v": ["Projekt umbenennen"] }, "Show details": { "v": ["Details anzeigen"] } } }, { "l": "de-DE", "t": { "Hide details": { "v": ["Details ausblenden"] }, "Rename project": { "v": ["Projekt umbenennen"] }, "Show details": { "v": ["Details anzeigen"] } } }, { "l": "el", "t": { "Hide details": { "v": ["Απόκρυψη λεπτομερειών"] }, "Rename project": { "v": ["Μετονομασία έργου"] }, "Show details": { "v": ["Εμφάνιση λεπτομερειών"] } } }, { "l": "en-GB", "t": { "Hide details": { "v": ["Hide details"] }, "Rename project": { "v": ["Rename project"] }, "Show details": { "v": ["Show details"] } } }, { "l": "eo", "t": {} }, { "l": "es", "t": {} }, { "l": "es-AR", "t": { "Hide details": { "v": ["Ocultar detalles"] }, "Rename project": { "v": ["Renombrar proyecto"] }, "Show details": { "v": ["Mostrar detalles"] } } }, { "l": "es-EC", "t": {} }, { "l": "es-MX", "t": { "Hide details": { "v": ["Ocultar detalles"] }, "Rename project": { "v": ["Renombrar proyecto"] }, "Show details": { "v": ["Mostrar detalles"] } } }, { "l": "et-EE", "t": { "Hide details": { "v": ["Peida üksikasjad"] }, "Rename project": { "v": ["Muuda projekti nime"] }, "Show details": { "v": ["Näita üksikasju"] } } }, { "l": "eu", "t": {} }, { "l": "fa", "t": { "Hide details": { "v": ["پنهان کردن جزئیات"] }, "Rename project": { "v": ["تغییر نام پروژه"] }, "Show details": { "v": ["نمایش جزئیات"] } } }, { "l": "fi", "t": { "Hide details": { "v": ["Piilota yksityiskohdat"] }, "Rename project": { "v": ["Nimeä projekti"] }, "Show details": { "v": ["Näytä yksityiskohdat"] } } }, { "l": "fr", "t": { "Hide details": { "v": ["Masquer les détails"] }, "Rename project": { "v": ["Renommer le projet"] }, "Show details": { "v": ["Afficher les détails"] } } }, { "l": "ga", "t": { "Hide details": { "v": ["Folaigh sonraí"] }, "Rename project": { "v": ["Athainmnigh an tionscadal"] }, "Show details": { "v": ["Taispeáin sonraí"] } } }, { "l": "gl", "t": { "Hide details": { "v": ["Agochar os detalles"] }, "Rename project": { "v": ["Cambiar o nome do proxecto"] }, "Show details": { "v": ["Amosar os detalles"] } } }, { "l": "he", "t": {} }, { "l": "hu", "t": {} }, { "l": "id", "t": {} }, { "l": "is", "t": { "Hide details": { "v": ["Fela nánari upplýsingar"] }, "Rename project": { "v": ["Endurnefna verkefni"] }, "Show details": { "v": ["Birta nánari upplýsingar"] } } }, { "l": "it", "t": {} }, { "l": "ja", "t": { "Hide details": { "v": ["詳細を非表示"] }, "Rename project": { "v": ["プロジェクト名を変更"] }, "Show details": { "v": ["詳細の表示"] } } }, { "l": "ja-JP", "t": {} }, { "l": "ko", "t": { "Hide details": { "v": ["세부 사항 숨기기"] }, "Rename project": { "v": ["프로젝트 이름 변경"] }, "Show details": { "v": ["세부 사항 보기"] } } }, { "l": "lt-LT", "t": {} }, { "l": "lv", "t": {} }, { "l": "mk", "t": {} }, { "l": "my", "t": {} }, { "l": "nb", "t": { "Hide details": { "v": ["Skjul detaljer"] }, "Rename project": { "v": ["Gi prosjekt nytt navn"] }, "Show details": { "v": ["Vis detaljer"] } } }, { "l": "nl", "t": { "Hide details": { "v": ["Details verbergen"] }, "Rename project": { "v": ["Hernoem project"] }, "Show details": { "v": ["Toon details"] } } }, { "l": "oc", "t": {} }, { "l": "pl", "t": { "Hide details": { "v": ["Ukryj szczegóły"] }, "Rename project": { "v": ["Zmień nazwę projektu"] }, "Show details": { "v": ["Pokaż szczegóły"] } } }, { "l": "pt-BR", "t": { "Hide details": { "v": ["Ocultar detalhes"] }, "Rename project": { "v": ["Renomear projeto"] }, "Show details": { "v": ["Mostrar detalhes"] } } }, { "l": "pt-PT", "t": { "Hide details": { "v": ["Ocultar detalhes"] }, "Rename project": { "v": ["Alterar nome do projeto"] }, "Show details": { "v": ["Ver detalhes"] } } }, { "l": "ro", "t": {} }, { "l": "ru", "t": { "Hide details": { "v": ["Скрыть подробности"] }, "Rename project": { "v": ["Переименовать проект"] }, "Show details": { "v": ["Показать детали"] } } }, { "l": "sk", "t": { "Hide details": { "v": ["Skryť detaily"] }, "Rename project": { "v": ["Premenovať projekt"] }, "Show details": { "v": ["Zobraziť detaily"] } } }, { "l": "sl", "t": {} }, { "l": "sr", "t": { "Hide details": { "v": ["Сакриј детаље"] }, "Rename project": { "v": ["Промени име пројекта"] }, "Show details": { "v": ["Прикажи детаље"] } } }, { "l": "sv", "t": { "Hide details": { "v": ["Göm detaljer"] }, "Rename project": { "v": ["Byt namn på projektet"] }, "Show details": { "v": ["Visa detaljer"] } } }, { "l": "tr", "t": { "Hide details": { "v": ["Ayrıntıları gizle"] }, "Rename project": { "v": ["Projeyi yeniden adlandır"] }, "Show details": { "v": ["Ayrıntıları görüntüle"] } } }, { "l": "uk", "t": { "Hide details": { "v": ["Сховати деталі"] }, "Rename project": { "v": ["Перейменувати проєкт"] }, "Show details": { "v": ["Показати деталі"] } } }, { "l": "uz", "t": { "Hide details": { "v": ["Tafsilotlarni yashirish"] }, "Rename project": { "v": ["Loyiha nomini o'zgartirish"] }, "Show details": { "v": ["Tafsilotlarni ko'rsatish"] } } }, { "l": "zh-CN", "t": { "Hide details": { "v": ["隐藏细节"] }, "Rename project": { "v": ["重命名项目"] }, "Show details": { "v": ["显示细节"] } } }, { "l": "zh-HK", "t": { "Hide details": { "v": ["隱藏詳情"] }, "Rename project": { "v": ["重命名方案"] }, "Show details": { "v": ["顯示詳情"] } } }, { "l": "zh-TW", "t": {} }];
const t29 = [{ "l": "ar", "t": { "Hide password": { "v": ["إخفاء كلمة المرور"] }, "Password is secure": { "v": ["كلمة المرور آمنة"] }, "Show password": { "v": ["أظهِر كلمة المرور"] } } }, { "l": "ast", "t": { "Hide password": { "v": ["Anubrir la contraseña"] }, "Password is secure": { "v": ["La contraseña ye segura"] }, "Show password": { "v": ["Amosar la contraseña"] } } }, { "l": "br", "t": {} }, { "l": "ca", "t": { "Hide password": { "v": ["Amagar contrasenya"] }, "Password is secure": { "v": ["Contrasenya segura<br>"] }, "Show password": { "v": ["Mostrar contrasenya"] } } }, { "l": "cs", "t": { "Hide password": { "v": ["Skrýt heslo"] }, "Password is secure": { "v": ["Heslo je bezpečné"] }, "Show password": { "v": ["Zobrazit heslo"] } } }, { "l": "cs-CZ", "t": { "Hide password": { "v": ["Skrýt heslo"] }, "Password is secure": { "v": ["Heslo je bezpečné"] }, "Show password": { "v": ["Zobrazit heslo"] } } }, { "l": "da", "t": { "Hide password": { "v": ["Skjul kodeord"] }, "Password is secure": { "v": ["Kodeordet er sikkert"] }, "Show password": { "v": ["Vis kodeord"] } } }, { "l": "de", "t": { "Hide password": { "v": ["Passwort verbergen"] }, "Password is secure": { "v": ["Passwort ist sicher"] }, "Show password": { "v": ["Passwort anzeigen"] } } }, { "l": "de-DE", "t": { "Hide password": { "v": ["Passwort verbergen"] }, "Password is secure": { "v": ["Passwort ist sicher"] }, "Show password": { "v": ["Passwort anzeigen"] } } }, { "l": "el", "t": { "Hide password": { "v": ["Απόκρυψη συνθηματικού"] }, "Password is secure": { "v": ["Το συνθηματικό είναι ασφαλές"] }, "Show password": { "v": ["Εμφάνιση κωδικού πρόσβασης"] } } }, { "l": "en-GB", "t": { "Hide password": { "v": ["Hide password"] }, "Password is secure": { "v": ["Password is secure"] }, "Show password": { "v": ["Show password"] } } }, { "l": "eo", "t": {} }, { "l": "es", "t": { "Hide password": { "v": ["Ocultar contraseña"] }, "Password is secure": { "v": ["La contraseña es segura"] }, "Show password": { "v": ["Mostrar contraseña"] } } }, { "l": "es-AR", "t": { "Hide password": { "v": ["Ocultar contraseña"] }, "Password is secure": { "v": ["La contraseña es segura"] }, "Show password": { "v": ["Mostrar contraseña"] } } }, { "l": "es-EC", "t": { "Hide password": { "v": ["Ocultar contraseña"] }, "Password is secure": { "v": ["La contraseña es segura"] }, "Show password": { "v": ["Mostrar contraseña"] } } }, { "l": "es-MX", "t": { "Hide password": { "v": ["Ocultar contraseña"] }, "Password is secure": { "v": ["La contraseña es segura"] }, "Show password": { "v": ["Mostrar contraseña"] } } }, { "l": "et-EE", "t": { "Hide password": { "v": ["Peida salasõna"] }, "Password is secure": { "v": ["Salasõna on turvaline"] }, "Show password": { "v": ["Näita salasõna"] } } }, { "l": "eu", "t": { "Hide password": { "v": ["Ezkutatu pasahitza"] }, "Password is secure": { "v": ["Pasahitza segurua da"] }, "Show password": { "v": ["Erakutsi pasahitza"] } } }, { "l": "fa", "t": { "Hide password": { "v": ["پنهان کردن رمز عبور"] }, "Password is secure": { "v": ["گذرواژه امن است"] }, "Show password": { "v": ["نمایش گذرواژه"] } } }, { "l": "fi", "t": { "Hide password": { "v": ["Piilota salasana"] }, "Password is secure": { "v": ["Salasana on turvallinen"] }, "Show password": { "v": ["Näytä salasana"] } } }, { "l": "fr", "t": { "Hide password": { "v": ["Cacher le mot de passe"] }, "Password is secure": { "v": ["Le mot de passe est sécurisé"] }, "Show password": { "v": ["Afficher le mot de passe"] } } }, { "l": "ga", "t": { "Hide password": { "v": ["Folaigh pasfhocal"] }, "Password is secure": { "v": ["Tá pasfhocal slán"] }, "Show password": { "v": ["Taispeáin pasfhocal"] } } }, { "l": "gl", "t": { "Hide password": { "v": ["Agochar o contrasinal"] }, "Password is secure": { "v": ["O contrasinal é seguro"] }, "Show password": { "v": ["Amosar o contrasinal"] } } }, { "l": "he", "t": { "Hide password": { "v": ["הסתרת סיסמה"] }, "Password is secure": { "v": ["הסיסמה מאובטחת"] }, "Show password": { "v": ["הצגת סיסמה"] } } }, { "l": "hu", "t": { "Hide password": { "v": ["Jelszó elrejtése"] }, "Password is secure": { "v": ["A jelszó biztonságos"] }, "Show password": { "v": ["Jelszó megjelenítése"] } } }, { "l": "id", "t": { "Hide password": { "v": ["Sembunyikan sandi"] }, "Password is secure": { "v": ["Kata sandi sudah aman"] }, "Show password": { "v": ["Tampilkan sandi"] } } }, { "l": "is", "t": { "Hide password": { "v": ["Fela lykilorð"] }, "Password is secure": { "v": ["Lykilorðið er öruggt"] }, "Show password": { "v": ["Birta lykilorð"] } } }, { "l": "it", "t": { "Hide password": { "v": ["Nascondi la password"] }, "Password is secure": { "v": ["La password è sicura"] }, "Show password": { "v": ["Mostra la password"] } } }, { "l": "ja", "t": { "Hide password": { "v": ["パスワードを非表示"] }, "Password is secure": { "v": ["パスワードは保護されています"] }, "Show password": { "v": ["パスワードを表示"] } } }, { "l": "ja-JP", "t": { "Hide password": { "v": ["パスワードを非表示"] }, "Password is secure": { "v": ["パスワードは保護されています"] }, "Show password": { "v": ["パスワードを表示"] } } }, { "l": "ko", "t": { "Hide password": { "v": ["암호 숨기기"] }, "Password is secure": { "v": ["암호가 안전합니다."] }, "Show password": { "v": ["암호 표시"] } } }, { "l": "lt-LT", "t": {} }, { "l": "lv", "t": {} }, { "l": "mk", "t": {} }, { "l": "my", "t": {} }, { "l": "nb", "t": { "Hide password": { "v": ["Skjul passord"] }, "Password is secure": { "v": ["Passordet er sikkert"] }, "Show password": { "v": ["Vis passord"] } } }, { "l": "nl", "t": { "Hide password": { "v": ["Verberg wachtwoord"] }, "Password is secure": { "v": ["Wachtwoord is veilig"] }, "Show password": { "v": ["Toon wachtwoord"] } } }, { "l": "oc", "t": {} }, { "l": "pl", "t": { "Hide password": { "v": ["Ukryj hasło"] }, "Password is secure": { "v": ["Hasło jest bezpieczne"] }, "Show password": { "v": ["Pokaż hasło"] } } }, { "l": "pt-BR", "t": { "Hide password": { "v": ["Ocultar senha"] }, "Password is secure": { "v": ["A senha é segura"] }, "Show password": { "v": ["Mostrar senha"] } } }, { "l": "pt-PT", "t": { "Hide password": { "v": ["Ocultar palavra-passe"] }, "Password is secure": { "v": ["A palavra-passe é segura"] }, "Show password": { "v": ["Mostrar palavra-passe"] } } }, { "l": "ro", "t": { "Hide password": { "v": ["Ascunde parola"] }, "Password is secure": { "v": ["Parola este sigură"] }, "Show password": { "v": ["Arată parola"] } } }, { "l": "ru", "t": { "Hide password": { "v": ["Скрыть пароль"] }, "Password is secure": { "v": ["Пароль надежный"] }, "Show password": { "v": ["Показать пароль"] } } }, { "l": "sk", "t": { "Hide password": { "v": ["Skryť heslo"] }, "Password is secure": { "v": ["Heslo je bezpečné"] }, "Show password": { "v": ["Zobraziť heslo"] } } }, { "l": "sl", "t": { "Hide password": { "v": ["Skrij geslo"] }, "Password is secure": { "v": ["Geslo je varno"] }, "Show password": { "v": ["Pokaži geslo"] } } }, { "l": "sr", "t": { "Hide password": { "v": ["Сакриј лозинку"] }, "Password is secure": { "v": ["Лозинка је безбедна"] }, "Show password": { "v": ["Прикажи лозинку"] } } }, { "l": "sv", "t": { "Hide password": { "v": ["Göm lösenordet"] }, "Password is secure": { "v": ["Lössenordet är säkert"] }, "Show password": { "v": ["Visa lössenordet"] } } }, { "l": "tr", "t": { "Hide password": { "v": ["Parolayı gizle"] }, "Password is secure": { "v": ["Parola güvenli"] }, "Show password": { "v": ["Parolayı görüntüle"] } } }, { "l": "uk", "t": { "Hide password": { "v": ["Приховати пароль"] }, "Password is secure": { "v": ["Пароль безпечний"] }, "Show password": { "v": ["Показати пароль"] } } }, { "l": "uz", "t": { "Hide password": { "v": ["Parolni yashirish"] }, "Password is secure": { "v": ["Parol xavfsiz"] }, "Show password": { "v": ["Parolni ko'rsatish"] } } }, { "l": "zh-CN", "t": { "Hide password": { "v": ["隐藏密码"] }, "Password is secure": { "v": ["密码安全"] }, "Show password": { "v": ["显示密码"] } } }, { "l": "zh-HK", "t": { "Hide password": { "v": ["隱藏密碼"] }, "Password is secure": { "v": ["密碼是安全的"] }, "Show password": { "v": ["顯示密碼"] } } }, { "l": "zh-TW", "t": { "Hide password": { "v": ["隱藏密碼"] }, "Password is secure": { "v": ["密碼安全"] }, "Show password": { "v": ["顯示密碼"] } } }];
const t30 = [{ "l": "ar", "t": { "Keyboard navigation help": { "v": ["مساعدة في التنقل باستعمال لوحة المفاتيح"] }, "Skip to app navigation": { "v": ["تجاوَز إلى التنقل في التطبيق"] }, "Skip to main content": { "v": ["تجاوَز إلى المحتوى الرئيسي"] } } }, { "l": "ast", "t": { "Keyboard navigation help": { "v": ["Ayuda de la navegación pente'l tecláu"] }, "Skip to app navigation": { "v": ["Dir a la navegación d'aplicaciones"] }, "Skip to main content": { "v": ["Dir al conteníu principal"] } } }, { "l": "br", "t": {} }, { "l": "ca", "t": {} }, { "l": "cs", "t": { "Keyboard navigation help": { "v": ["Nápověda pro pohyb pomocí klávesnice"] }, "Skip to app navigation": { "v": ["Přeskočit na navigaci aplikace"] }, "Skip to main content": { "v": ["Přeskočit na hlavní obsah"] } } }, { "l": "cs-CZ", "t": { "Keyboard navigation help": { "v": ["Nápověda pro pohyb pomocí klávesnice"] }, "Skip to app navigation": { "v": ["Přeskočit na navigaci aplikace"] }, "Skip to main content": { "v": ["Přeskočit na hlavní obsah"] } } }, { "l": "da", "t": { "Keyboard navigation help": { "v": ["Hjælp til tastaturnavigation"] }, "Skip to app navigation": { "v": ["Spring til app navigation"] }, "Skip to main content": { "v": ["Spring til hovedindhold"] } } }, { "l": "de", "t": { "Keyboard navigation help": { "v": ["Tastatur-Navigationshilfe"] }, "Skip to app navigation": { "v": ["Zur App-Navigation springen"] }, "Skip to main content": { "v": ["Zum Hauptinhalt springen"] } } }, { "l": "de-DE", "t": { "Keyboard navigation help": { "v": ["Tastatur-Navigationshilfe"] }, "Skip to app navigation": { "v": ["Zur App-Navigation springen"] }, "Skip to main content": { "v": ["Zum Hauptinhalt springen"] } } }, { "l": "el", "t": { "Keyboard navigation help": { "v": ["Βοήθεια πλοήγησης με πληκτρολόγιο"] }, "Skip to app navigation": { "v": ["Μετάβαση στην πλοήγηση της εφαρμογής"] }, "Skip to main content": { "v": ["Μετάβαση στο κύριο περιεχόμενο"] } } }, { "l": "en-GB", "t": { "Keyboard navigation help": { "v": ["Keyboard navigation help"] }, "Skip to app navigation": { "v": ["Skip to app navigation"] }, "Skip to main content": { "v": ["Skip to main content"] } } }, { "l": "eo", "t": {} }, { "l": "es", "t": { "Keyboard navigation help": { "v": ["Ayuda de navegación del teclado"] }, "Skip to app navigation": { "v": ["Saltar a la navegación de apps"] }, "Skip to main content": { "v": ["Saltar al contenido principal"] } } }, { "l": "es-AR", "t": { "Keyboard navigation help": { "v": ["Ayuda de navegación del teclado"] }, "Skip to app navigation": { "v": ["Saltar a la navegación de app"] }, "Skip to main content": { "v": ["Saltar al contenido principal"] } } }, { "l": "es-EC", "t": {} }, { "l": "es-MX", "t": { "Keyboard navigation help": { "v": ["Ayuda de navegación del teclado"] }, "Skip to app navigation": { "v": ["Saltar a la navegación de app"] }, "Skip to main content": { "v": ["Saltar al contenido principal"] } } }, { "l": "et-EE", "t": { "Keyboard navigation help": { "v": ["Klahvistiku kasutuse abiteave"] }, "Skip to app navigation": { "v": ["Suundu rakenduses liikumise valikute juurde"] }, "Skip to main content": { "v": ["Suundu põhisisu juurde"] } } }, { "l": "eu", "t": {} }, { "l": "fa", "t": { "Keyboard navigation help": { "v": ["راهنمای ناوبری صفحه کلید"] }, "Skip to app navigation": { "v": ["رفتن به پیمایش برنامه"] }, "Skip to main content": { "v": ["رفتن به محتوای اصلی"] } } }, { "l": "fi", "t": { "Keyboard navigation help": { "v": ["Näppäimistönavigoinnin ohje"] }, "Skip to app navigation": { "v": ["Siirry sovelluksen navigaatioon"] }, "Skip to main content": { "v": ["Siirry pääsisältöön"] } } }, { "l": "fr", "t": { "Keyboard navigation help": { "v": ["Aide à la navigation du clavier"] }, "Skip to app navigation": { "v": ["Passer à l'app navigation"] }, "Skip to main content": { "v": ["Passer au contenu principal"] } } }, { "l": "ga", "t": { "Keyboard navigation help": { "v": ["Cabhair le nascleanúint méarchláir"] }, "Skip to app navigation": { "v": ["Téigh ar aghaidh chuig nascleanúint aip"] }, "Skip to main content": { "v": ["Téigh ar aghaidh chuig an bpríomhábhar"] } } }, { "l": "gl", "t": { "Keyboard navigation help": { "v": ["Axuda á navegación co teclado"] }, "Skip to app navigation": { "v": ["Ir á navegación da aplicación"] }, "Skip to main content": { "v": ["Ir ao contido principal"] } } }, { "l": "he", "t": {} }, { "l": "hu", "t": {} }, { "l": "id", "t": {} }, { "l": "is", "t": { "Keyboard navigation help": { "v": ["Aðstoð við rötun á lyklaborði"] }, "Skip to app navigation": { "v": ["Sleppa og fara í flakk innan forrits"] }, "Skip to main content": { "v": ["Sleppa og fara í meginefni"] } } }, { "l": "it", "t": {} }, { "l": "ja", "t": { "Keyboard navigation help": { "v": ["キーボード・ナビゲーション・ヘルプ"] }, "Skip to app navigation": { "v": ["アプリのナビゲーションへ移動"] }, "Skip to main content": { "v": ["メインコンテンツへ移動"] } } }, { "l": "ja-JP", "t": { "Keyboard navigation help": { "v": ["キーボード・ナビゲーション・ヘルプ"] }, "Skip to app navigation": { "v": ["アプリのナビゲーションへ移動"] }, "Skip to main content": { "v": ["メインコンテンツへ移動"] } } }, { "l": "ko", "t": { "Keyboard navigation help": { "v": ["키보드 탐색 도움말"] }, "Skip to app navigation": { "v": ["앱 탐색으로 건너뛰기"] }, "Skip to main content": { "v": ["본 내용으로 건너뛰기"] } } }, { "l": "lt-LT", "t": {} }, { "l": "lv", "t": {} }, { "l": "mk", "t": {} }, { "l": "my", "t": {} }, { "l": "nb", "t": { "Keyboard navigation help": { "v": ["Hjelp for tastaturnavigering"] }, "Skip to app navigation": { "v": ["Hopp til appnavigering"] }, "Skip to main content": { "v": ["Hopp til hovedinnhold"] } } }, { "l": "nl", "t": { "Keyboard navigation help": { "v": ["Hulp voor toetsenbordnavigatie"] }, "Skip to app navigation": { "v": ["Doorgaan naar app-navigatie"] }, "Skip to main content": { "v": ["Naar hoofdinhoud gaan"] } } }, { "l": "oc", "t": {} }, { "l": "pl", "t": { "Keyboard navigation help": { "v": ["Pomoc w nawigacji za pomocą klawiatury"] }, "Skip to app navigation": { "v": ["Przewiń do nawigacji"] }, "Skip to main content": { "v": ["Przewiń do głównych treści"] } } }, { "l": "pt-BR", "t": { "Keyboard navigation help": { "v": ["Ajuda para navegação pelo teclado"] }, "Skip to app navigation": { "v": ["Ir para navegação"] }, "Skip to main content": { "v": ["Ir para conteúdo principal"] } } }, { "l": "pt-PT", "t": { "Keyboard navigation help": { "v": ["Ajuda à navegação no teclado"] }, "Skip to app navigation": { "v": ["Saltar para navegação da app"] }, "Skip to main content": { "v": ["Saltar para conteúdo principal"] } } }, { "l": "ro", "t": {} }, { "l": "ru", "t": { "Keyboard navigation help": { "v": ["Справка по навигации с помощью клавиатуры"] }, "Skip to app navigation": { "v": ["Перейти к навигации по приложению"] }, "Skip to main content": { "v": ["Перейти к основному содержанию"] } } }, { "l": "sk", "t": { "Keyboard navigation help": { "v": ["Pomoc pri navigácii pomocou klávesnice"] }, "Skip to app navigation": { "v": ["Preskočiť na navigáciu v aplikácii"] }, "Skip to main content": { "v": ["Preskočiť na hlavný obsah"] } } }, { "l": "sl", "t": {} }, { "l": "sr", "t": { "Keyboard navigation help": { "v": ["Помоћ за навигацију тастатуром"] }, "Skip to app navigation": { "v": ["Прескочи на навигацију апликацијом"] }, "Skip to main content": { "v": ["Прескочи на главни садржај"] } } }, { "l": "sv", "t": { "Keyboard navigation help": { "v": ["Hjälp med tangentbordsnavigering"] }, "Skip to app navigation": { "v": ["Hoppa till appnavigering"] }, "Skip to main content": { "v": ["Hoppa till huvudinnehåll"] } } }, { "l": "tr", "t": { "Keyboard navigation help": { "v": ["Klavye ile gezinme yardımı"] }, "Skip to app navigation": { "v": ["Uygulama gezinmesine git"] }, "Skip to main content": { "v": ["Ana içeriğe git"] } } }, { "l": "uk", "t": { "Keyboard navigation help": { "v": ["Допомога з навігацією клавішами"] }, "Skip to app navigation": { "v": ["Пропустити навігацію по застосунках"] }, "Skip to main content": { "v": ["Перейти одразу до головного вмісту"] } } }, { "l": "uz", "t": { "Keyboard navigation help": { "v": ["Klaviatura navigatsiyasi yordami"] }, "Skip to app navigation": { "v": ["Ilova navigatsiyasiga oʻtish"] }, "Skip to main content": { "v": ["Asosiy tarkibga o'tish"] } } }, { "l": "zh-CN", "t": { "Keyboard navigation help": { "v": ["键盘导航栏帮助"] }, "Skip to app navigation": { "v": ["跳转至应用程序导航页"] }, "Skip to main content": { "v": ["跳转至主要内容"] } } }, { "l": "zh-HK", "t": { "Keyboard navigation help": { "v": ["鍵盤導航幫助"] }, "Skip to app navigation": { "v": ["跳至應用程式導航"] }, "Skip to main content": { "v": ["跳至主要內容"] } } }, { "l": "zh-TW", "t": {} }];
const t32 = [{ "l": "ar", "t": { 'Load more "{options}"': { "v": ['تحميل المزيد من "{options}" '] }, "Raw link {options}": { "v": [" الرابط الخام raw link ـ {options}"] }, "Start typing to search": { "v": ["إبدإ كتابة مفردات البحث"] } } }, { "l": "ast", "t": { 'Load more "{options}"': { "v": ["Cargar más «{options}»"] }, "Raw link {options}": { "v": ["Enllaz en bruto {optiones}"] }, "Start typing to search": { "v": ["Comienza a escribir pa buscar"] } } }, { "l": "br", "t": {} }, { "l": "ca", "t": {} }, { "l": "cs", "t": { 'Load more "{options}"': { "v": ["Načíst další „{options}“"] }, "Raw link {options}": { "v": ["Holý odkaz {options}"] }, "Start typing to search": { "v": ["Vyhledávejte psaním"] } } }, { "l": "cs-CZ", "t": { 'Load more "{options}"': { "v": ["Načíst další „{options}“"] }, "Raw link {options}": { "v": ["Holý odkaz {options}"] }, "Start typing to search": { "v": ["Vyhledávejte psaním"] } } }, { "l": "da", "t": { 'Load more "{options}"': { "v": ['Indlæs flere "{options}"'] }, "Raw link {options}": { "v": ["Rå link {options}"] }, "Start typing to search": { "v": ["Begynd at skrive for at søge"] } } }, { "l": "de", "t": { 'Load more "{options}"': { "v": ['Weitere "{options}" laden'] }, "Raw link {options}": { "v": ["Unverarbeiteter Link {Optionen}"] }, "Start typing to search": { "v": ["Mit der Eingabe beginnen, um zu suchen"] } } }, { "l": "de-DE", "t": { 'Load more "{options}"': { "v": ['Weitere "{options}" laden'] }, "Raw link {options}": { "v": ["Unverarbeiteter Link {Optionen}"] }, "Start typing to search": { "v": ["Mit der Eingabe beginnen, um zu suchen"] } } }, { "l": "el", "t": { 'Load more "{options}"': { "v": ['Φόρτωση περισσότερων "{options}"'] }, "Raw link {options}": { "v": ["Ακατέργαστος σύνδεσμος {options}"] }, "Start typing to search": { "v": ["Ξεκινήστε να πληκτρολογείτε για αναζήτηση"] } } }, { "l": "en-GB", "t": { 'Load more "{options}"': { "v": ['Load more "{options}"'] }, "Raw link {options}": { "v": ["Raw link {options}"] }, "Start typing to search": { "v": ["Start typing to search"] } } }, { "l": "eo", "t": {} }, { "l": "es", "t": { 'Load more "{options}"': { "v": ['Cargar más "{options}"'] }, "Raw link {options}": { "v": ["Enlace directo {options}"] }, "Start typing to search": { "v": ["Comience a escribir para buscar"] } } }, { "l": "es-AR", "t": { 'Load more "{options}"': { "v": ['Cargar más "{options}"'] }, "Raw link {options}": { "v": ["Enlace directo {options}"] }, "Start typing to search": { "v": ["Comience a escribir para buscar"] } } }, { "l": "es-EC", "t": { "Raw link {options}": { "v": ["Enlace directo {options}"] }, "Start typing to search": { "v": ["Comienza a escribir para buscar"] } } }, { "l": "es-MX", "t": { 'Load more "{options}"': { "v": ['Cargar más "{options}"'] }, "Raw link {options}": { "v": ["Enlace directo {options}"] }, "Start typing to search": { "v": ["Comience a escribir para buscar"] } } }, { "l": "et-EE", "t": { 'Load more "{options}"': { "v": ['Laadi rohkem "{valikud}"'] }, "Raw link {options}": { "v": ["Raw link {valikud}"] }, "Start typing to search": { "v": ["Alusta otsinguks sisestamist"] } } }, { "l": "eu", "t": { 'Load more "{options}"': { "v": ['Kargatu "{options}" gehiago'] }, "Raw link {options}": { "v": ["Formaturik gabeko esteka {aukerak}"] }, "Start typing to search": { "v": ["Hasi idazten bilatzeko"] } } }, { "l": "fa", "t": { 'Load more "{options}"': { "v": ['بارگذاری بیشتر "{options}"'] }, "Raw link {options}": { "v": ["پیوند خام {options}"] }, "Start typing to search": { "v": ["برای جستجو تایپ کنید"] } } }, { "l": "fi", "t": { 'Load more "{options}"': { "v": ['Lataa lisää "{options}"'] }, "Raw link {options}": { "v": ["Raaka linkki {options}"] }, "Start typing to search": { "v": ["Aloita kirjoittaminen hakeaksesi"] } } }, { "l": "fr", "t": { 'Load more "{options}"': { "v": [`Charger d'avantage "{options}"`] }, "Raw link {options}": { "v": ["Lien brut {options}"] }, "Start typing to search": { "v": ["Commencez à écrire pour rechercher"] } } }, { "l": "ga", "t": { 'Load more "{options}"': { "v": ['Luchtaigh tuilleadh "{options}"'] }, "Raw link {options}": { "v": ["Nasc amh {roghanna}"] }, "Start typing to search": { "v": ["Tosaigh ag clóscríobh chun cuardach a dhéanamh"] } } }, { "l": "gl", "t": { 'Load more "{options}"': { "v": ["Cargar máis «{options}»"] }, "Raw link {options}": { "v": ["Ligazón sen procesar {options}"] }, "Start typing to search": { "v": ["Comece a escribir para buscar"] } } }, { "l": "he", "t": { "Raw link {options}": { "v": ["קישור גולמי {options}"] }, "Start typing to search": { "v": ["התחלת הקלדה מחפשת"] } } }, { "l": "hu", "t": {} }, { "l": "id", "t": { 'Load more "{options}"': { "v": ['Muat "{options}" lainnya'] }, "Raw link {options}": { "v": ["Tautan mentah {options}"] }, "Start typing to search": { "v": ["Ketik untuk mulai mencari"] } } }, { "l": "is", "t": { 'Load more "{options}"': { "v": ['Hlaða inn fleiri "{options}"'] }, "Raw link {options}": { "v": ["Hrár tengill {options}"] }, "Start typing to search": { "v": ["Byrjaðu að skrifa til að leita"] } } }, { "l": "it", "t": { 'Load more "{options}"': { "v": ['Carica più "{options}"'] }, "Raw link {options}": { "v": ["Raw link {options}"] }, "Start typing to search": { "v": ["Iniziare a digitare per effettuare la ricerca"] } } }, { "l": "ja", "t": { 'Load more "{options}"': { "v": ['"{options}" をもっと読み込む'] }, "Raw link {options}": { "v": ["未加工のリンク {options}"] }, "Start typing to search": { "v": ["入力を開始して検索します"] } } }, { "l": "ja-JP", "t": { 'Load more "{options}"': { "v": ['"{options}" をもっと読み込む'] }, "Raw link {options}": { "v": ["未加工のリンク {options}"] }, "Start typing to search": { "v": ["入力を開始して検索します"] } } }, { "l": "ko", "t": { 'Load more "{options}"': { "v": ['"{options}" 더 불러오기'] }, "Raw link {options}": { "v": ["{options} 원본 링크"] }, "Start typing to search": { "v": ["입력하여 검색"] } } }, { "l": "lt-LT", "t": {} }, { "l": "lv", "t": {} }, { "l": "mk", "t": {} }, { "l": "my", "t": {} }, { "l": "nb", "t": { 'Load more "{options}"': { "v": ['Last inn flere "{options}"'] }, "Raw link {options}": { "v": ["Rå lenke {options}"] }, "Start typing to search": { "v": ["Start å skrive for å søke"] } } }, { "l": "nl", "t": { 'Load more "{options}"': { "v": ['Laad meer "{options}"'] }, "Raw link {options}": { "v": ["Basis link {options}"] }, "Start typing to search": { "v": ["Start met typen om te zoeken"] } } }, { "l": "oc", "t": {} }, { "l": "pl", "t": { 'Load more "{options}"': { "v": ['Załaduj więcej "{options}"'] }, "Raw link {options}": { "v": ["Surowy odnośnik {options}"] }, "Start typing to search": { "v": ["Zacznij pisać, aby wyszukać"] } } }, { "l": "pt-BR", "t": { 'Load more "{options}"': { "v": ['Carregar mais "{options}"'] }, "Raw link {options}": { "v": ["Link bruto {options}"] }, "Start typing to search": { "v": ["Comece a digitar para pesquisar"] } } }, { "l": "pt-PT", "t": { 'Load more "{options}"': { "v": ['Carregar mais "{options}"'] }, "Raw link {options}": { "v": ["Link inicial {options}"] }, "Start typing to search": { "v": ["Comece a digitar para pesquisar"] } } }, { "l": "ro", "t": { 'Load more "{options}"': { "v": ['Încarcă mai multe "{options}"'] }, "Raw link {options}": { "v": ["Link brut {options}"] }, "Start typing to search": { "v": ["Tastați pentru căutare"] } } }, { "l": "ru", "t": { 'Load more "{options}"': { "v": ['Загрузить больше "{options}""'] }, "Raw link {options}": { "v": ["Необработанная ссылка {options}"] }, "Start typing to search": { "v": ["Начните вводить текст для поиска"] } } }, { "l": "sk", "t": { 'Load more "{options}"': { "v": ['Načítať viac "{options}"'] }, "Raw link {options}": { "v": ["Raw odkaz {options}"] }, "Start typing to search": { "v": ["Začnite písať pre vyhľadávanie"] } } }, { "l": "sl", "t": {} }, { "l": "sr", "t": { 'Load more "{options}"': { "v": ["Учитај још „{options}”"] }, "Raw link {options}": { "v": ["Сирови линк {options}"] }, "Start typing to search": { "v": ["Покрените претрагу куцањем"] } } }, { "l": "sv", "t": { 'Load more "{options}"': { "v": ['Ladda fler "{options}"'] }, "Raw link {options}": { "v": ["Oformaterad länk {options}"] }, "Start typing to search": { "v": ["Börja skriva för att söka"] } } }, { "l": "tr", "t": { 'Load more "{options}"': { "v": ['Diğer "{options}"'] }, "Raw link {options}": { "v": ["Ham bağlantı {options}"] }, "Start typing to search": { "v": ["Aramak için yazmaya başlayın"] } } }, { "l": "uk", "t": { 'Load more "{options}"': { "v": ['Завантажити більше "{options}"'] }, "Raw link {options}": { "v": ["Пряме посилання {options}"] }, "Start typing to search": { "v": ["Почніть вводити для пошуку"] } } }, { "l": "uz", "t": { 'Load more "{options}"': { "v": [`Ko'proq yuklash "{options}"`] }, "Raw link {options}": { "v": [" {options}satr havolasi"] }, "Start typing to search": { "v": ["Qidirish uchun yozishni boshlang"] } } }, { "l": "zh-CN", "t": { 'Load more "{options}"': { "v": ["加载更多 “{options}”"] }, "Raw link {options}": { "v": ["原始链接 {options}"] }, "Start typing to search": { "v": ["开始输入以进行搜索"] } } }, { "l": "zh-HK", "t": { 'Load more "{options}"': { "v": ['載入更多 "{options}"'] }, "Raw link {options}": { "v": ["原始連結 {options}"] }, "Start typing to search": { "v": ["開始輸入以進行搜尋"] } } }, { "l": "zh-TW", "t": { 'Load more "{options}"': { "v": ["載入更多「{options}」"] }, "Raw link {options}": { "v": ["原始連結 {options}"] }, "Start typing to search": { "v": ["開始輸入以進行搜尋"] } } }];
const t33 = [{ "l": "ar", "t": {} }, { "l": "ast", "t": {} }, { "l": "br", "t": {} }, { "l": "ca", "t": {} }, { "l": "cs", "t": {} }, { "l": "cs-CZ", "t": {} }, { "l": "da", "t": {} }, { "l": "de", "t": {} }, { "l": "de-DE", "t": {} }, { "l": "el", "t": {} }, { "l": "en-GB", "t": {} }, { "l": "eo", "t": {} }, { "l": "es", "t": {} }, { "l": "es-AR", "t": {} }, { "l": "es-EC", "t": {} }, { "l": "es-MX", "t": {} }, { "l": "et-EE", "t": {} }, { "l": "eu", "t": {} }, { "l": "fa", "t": {} }, { "l": "fi", "t": {} }, { "l": "fr", "t": {} }, { "l": "ga", "t": {} }, { "l": "gl", "t": {} }, { "l": "he", "t": {} }, { "l": "hu", "t": {} }, { "l": "id", "t": {} }, { "l": "is", "t": {} }, { "l": "it", "t": {} }, { "l": "ja", "t": {} }, { "l": "ja-JP", "t": {} }, { "l": "ko", "t": {} }, { "l": "lt-LT", "t": {} }, { "l": "lv", "t": {} }, { "l": "mk", "t": {} }, { "l": "my", "t": {} }, { "l": "nb", "t": {} }, { "l": "nl", "t": {} }, { "l": "oc", "t": {} }, { "l": "pl", "t": {} }, { "l": "pt-BR", "t": {} }, { "l": "pt-PT", "t": {} }, { "l": "ro", "t": {} }, { "l": "ru", "t": {} }, { "l": "sk", "t": {} }, { "l": "sl", "t": {} }, { "l": "sr", "t": {} }, { "l": "sv", "t": {} }, { "l": "tr", "t": {} }, { "l": "uk", "t": {} }, { "l": "uz", "t": {} }, { "l": "zh-CN", "t": {} }, { "l": "zh-HK", "t": {} }, { "l": "zh-TW", "t": {} }];
const t34 = [{ "l": "ar", "t": { "No link provider found": { "v": ["لا يوجد أيّ مزود روابط link provider"] } } }, { "l": "ast", "t": { "No link provider found": { "v": ["Nun s'atopó nengún fornidor d'enllaces"] } } }, { "l": "br", "t": {} }, { "l": "ca", "t": {} }, { "l": "cs", "t": { "No link provider found": { "v": ["Nenalezen žádný poskytovatel odkazů"] } } }, { "l": "cs-CZ", "t": { "No link provider found": { "v": ["Nenalezen žádný poskytovatel odkazů"] } } }, { "l": "da", "t": { "No link provider found": { "v": ["Ingen linkudbyder fundet"] } } }, { "l": "de", "t": { "No link provider found": { "v": ["Kein Linkanbieter gefunden"] } } }, { "l": "de-DE", "t": { "No link provider found": { "v": ["Kein Linkanbieter gefunden"] } } }, { "l": "el", "t": { "No link provider found": { "v": ["Δεν βρέθηκε πάροχος συνδέσμου"] } } }, { "l": "en-GB", "t": { "No link provider found": { "v": ["No link provider found"] } } }, { "l": "eo", "t": {} }, { "l": "es", "t": { "No link provider found": { "v": ["No se encontró ningún proveedor de enlaces"] } } }, { "l": "es-AR", "t": { "No link provider found": { "v": ["No se encontró ningún proveedor de enlaces"] } } }, { "l": "es-EC", "t": { "No link provider found": { "v": ["No se encontró ningún proveedor de enlaces"] } } }, { "l": "es-MX", "t": { "No link provider found": { "v": ["No se encontró ningún proveedor de enlaces"] } } }, { "l": "et-EE", "t": { "No link provider found": { "v": ["Lingi pakkujat ei leitud"] } } }, { "l": "eu", "t": { "No link provider found": { "v": ["Ez da aurkitu esteka-hornitzailerik"] } } }, { "l": "fa", "t": { "No link provider found": { "v": ["هیچ ارائه‌دهنده پیوندی یافت نشد"] } } }, { "l": "fi", "t": { "No link provider found": { "v": ["Linkin tarjoajia ei löydetty"] } } }, { "l": "fr", "t": { "No link provider found": { "v": ["Aucun fournisseur de lien trouvé"] } } }, { "l": "ga", "t": { "No link provider found": { "v": ["Níor aimsíodh aon soláthraí naisc"] } } }, { "l": "gl", "t": { "No link provider found": { "v": ["Non se atopou ningún provedor de ligazóns"] } } }, { "l": "he", "t": { "No link provider found": { "v": ["לא נמצא ספק קישורים"] } } }, { "l": "hu", "t": {} }, { "l": "id", "t": { "No link provider found": { "v": ["Tidak ada penyedia tautan yang ditemukan"] } } }, { "l": "is", "t": { "No link provider found": { "v": ["Engin tenglaveita fannst"] } } }, { "l": "it", "t": { "No link provider found": { "v": ["Nessun fornitore di link trovato"] } } }, { "l": "ja", "t": { "No link provider found": { "v": ["リンクプロバイダーが見つかりません"] } } }, { "l": "ja-JP", "t": { "No link provider found": { "v": ["リンクプロバイダーが見つかりません"] } } }, { "l": "ko", "t": { "No link provider found": { "v": ["링크 제공자 없음"] } } }, { "l": "lt-LT", "t": {} }, { "l": "lv", "t": {} }, { "l": "mk", "t": {} }, { "l": "my", "t": {} }, { "l": "nb", "t": { "No link provider found": { "v": ["Finner ingen lenkeleverandør"] } } }, { "l": "nl", "t": { "No link provider found": { "v": ["Geen link provider gevonden"] } } }, { "l": "oc", "t": {} }, { "l": "pl", "t": { "No link provider found": { "v": ["Nie znaleziono dostawcy linków"] } } }, { "l": "pt-BR", "t": { "No link provider found": { "v": ["Nenhum provedor de link encontrado"] } } }, { "l": "pt-PT", "t": { "No link provider found": { "v": ["Nenhum fornecedor de link encontrado"] } } }, { "l": "ro", "t": { "No link provider found": { "v": ["Nu s-a găsit un provider pentru linkuri"] } } }, { "l": "ru", "t": { "No link provider found": { "v": ["Поставщик ссылок не найден"] } } }, { "l": "sk", "t": { "No link provider found": { "v": ["Žiaden odkaz poskytovateľa nebol nájdený"] } } }, { "l": "sl", "t": {} }, { "l": "sr", "t": { "No link provider found": { "v": ["Није пронађен ниједан пружалац линка"] } } }, { "l": "sv", "t": { "No link provider found": { "v": ["Ingen länkleverantör hittades"] } } }, { "l": "tr", "t": { "No link provider found": { "v": ["Bağlantı sağlayıcısı bulunamadı"] } } }, { "l": "uk", "t": { "No link provider found": { "v": ["Не наведено посилання"] } } }, { "l": "uz", "t": { "No link provider found": { "v": ["Hech qanday havola provayderi topilmadi"] } } }, { "l": "zh-CN", "t": { "No link provider found": { "v": ["未找到任何链接提供者"] } } }, { "l": "zh-HK", "t": { "No link provider found": { "v": ["找不到連結提供者"] } } }, { "l": "zh-TW", "t": { "No link provider found": { "v": ["找不到連結提供者"] } } }];
const t35 = [{ "l": "ar", "t": {} }, { "l": "ast", "t": {} }, { "l": "br", "t": {} }, { "l": "ca", "t": {} }, { "l": "cs", "t": {} }, { "l": "cs-CZ", "t": {} }, { "l": "da", "t": {} }, { "l": "de", "t": {} }, { "l": "de-DE", "t": {} }, { "l": "el", "t": {} }, { "l": "en-GB", "t": {} }, { "l": "eo", "t": {} }, { "l": "es", "t": {} }, { "l": "es-AR", "t": {} }, { "l": "es-EC", "t": {} }, { "l": "es-MX", "t": {} }, { "l": "et-EE", "t": {} }, { "l": "eu", "t": {} }, { "l": "fa", "t": {} }, { "l": "fi", "t": {} }, { "l": "fr", "t": {} }, { "l": "ga", "t": {} }, { "l": "gl", "t": {} }, { "l": "he", "t": {} }, { "l": "hu", "t": {} }, { "l": "id", "t": {} }, { "l": "is", "t": {} }, { "l": "it", "t": {} }, { "l": "ja", "t": {} }, { "l": "ja-JP", "t": {} }, { "l": "ko", "t": {} }, { "l": "lt-LT", "t": {} }, { "l": "lv", "t": {} }, { "l": "mk", "t": {} }, { "l": "my", "t": {} }, { "l": "nb", "t": {} }, { "l": "nl", "t": {} }, { "l": "oc", "t": {} }, { "l": "pl", "t": {} }, { "l": "pt-BR", "t": {} }, { "l": "pt-PT", "t": {} }, { "l": "ro", "t": {} }, { "l": "ru", "t": {} }, { "l": "sk", "t": {} }, { "l": "sl", "t": {} }, { "l": "sr", "t": {} }, { "l": "sv", "t": {} }, { "l": "tr", "t": {} }, { "l": "uk", "t": {} }, { "l": "uz", "t": {} }, { "l": "zh-CN", "t": {} }, { "l": "zh-HK", "t": {} }, { "l": "zh-TW", "t": {} }];
const t36 = [{ "l": "ar", "t": { "Next": { "v": ["التالي"] }, "Pause slideshow": { "v": ["تجميد عرض الشرائح"] }, "Previous": { "v": ["السابق"] }, "Start slideshow": { "v": ["إبدإ العرض"] } } }, { "l": "ast", "t": { "Next": { "v": ["Siguiente"] }, "Pause slideshow": { "v": ["Posar la presentación de diapositives"] }, "Previous": { "v": ["Anterior"] }, "Start slideshow": { "v": ["Aniciar la presentación de diapositives"] } } }, { "l": "br", "t": { "Next": { "v": ["Da heul"] }, "Pause slideshow": { "v": ["Arsav an diaporama"] }, "Previous": { "v": ["A-raok"] }, "Start slideshow": { "v": ["Kregiñ an diaporama"] } } }, { "l": "ca", "t": { "Next": { "v": ["Següent"] }, "Pause slideshow": { "v": ["Atura la presentació"] }, "Previous": { "v": ["Anterior"] }, "Start slideshow": { "v": ["Inicia la presentació"] } } }, { "l": "cs", "t": { "Next": { "v": ["Následující"] }, "Pause slideshow": { "v": ["Pozastavit prezentaci"] }, "Previous": { "v": ["Předchozí"] }, "Start slideshow": { "v": ["Spustit prezentaci"] } } }, { "l": "cs-CZ", "t": { "Next": { "v": ["Následující"] }, "Pause slideshow": { "v": ["Pozastavit prezentaci"] }, "Previous": { "v": ["Předchozí"] }, "Start slideshow": { "v": ["Spustit prezentaci"] } } }, { "l": "da", "t": { "Next": { "v": ["Videre"] }, "Pause slideshow": { "v": ["Suspender fremvisning"] }, "Previous": { "v": ["Forrige"] }, "Start slideshow": { "v": ["Start fremvisning"] } } }, { "l": "de", "t": { "Next": { "v": ["Weiter"] }, "Pause slideshow": { "v": ["Diashow pausieren"] }, "Previous": { "v": ["Vorherige"] }, "Start slideshow": { "v": ["Diashow starten"] } } }, { "l": "de-DE", "t": { "Next": { "v": ["Weiter"] }, "Pause slideshow": { "v": ["Diashow pausieren"] }, "Previous": { "v": ["Vorherige"] }, "Start slideshow": { "v": ["Diashow starten"] } } }, { "l": "el", "t": { "Next": { "v": ["Επόμενο"] }, "Pause slideshow": { "v": ["Παύση προβολής διαφανειών"] }, "Previous": { "v": ["Προηγούμενο"] }, "Start slideshow": { "v": ["Έναρξη προβολής διαφανειών"] } } }, { "l": "en-GB", "t": { "Next": { "v": ["Next"] }, "Pause slideshow": { "v": ["Pause slideshow"] }, "Previous": { "v": ["Previous"] }, "Start slideshow": { "v": ["Start slideshow"] } } }, { "l": "eo", "t": { "Next": { "v": ["Sekva"] }, "Pause slideshow": { "v": ["Payzi bildprezenton"] }, "Previous": { "v": ["Antaŭa"] }, "Start slideshow": { "v": ["Komenci bildprezenton"] } } }, { "l": "es", "t": { "Next": { "v": ["Siguiente"] }, "Pause slideshow": { "v": ["Pausar la presentación "] }, "Previous": { "v": ["Anterior"] }, "Start slideshow": { "v": ["Iniciar la presentación"] } } }, { "l": "es-AR", "t": { "Next": { "v": ["Siguiente"] }, "Pause slideshow": { "v": ["Pausar la presentación "] }, "Previous": { "v": ["Anterior"] }, "Start slideshow": { "v": ["Iniciar la presentación"] } } }, { "l": "es-EC", "t": { "Next": { "v": ["Siguiente"] }, "Pause slideshow": { "v": ["Pausar presentación de diapositivas"] }, "Previous": { "v": ["Anterior"] }, "Start slideshow": { "v": ["Iniciar presentación de diapositivas"] } } }, { "l": "es-MX", "t": { "Next": { "v": ["Siguiente"] }, "Pause slideshow": { "v": ["Pausar presentación de diapositivas"] }, "Previous": { "v": ["Anterior"] }, "Start slideshow": { "v": ["Iniciar presentación de diapositivas"] } } }, { "l": "et-EE", "t": { "Next": { "v": ["Edasi"] }, "Pause slideshow": { "v": ["Slaidiesitluse paus"] }, "Previous": { "v": ["Eelmine"] }, "Start slideshow": { "v": ["Alusta slaidiesitust"] } } }, { "l": "eu", "t": { "Next": { "v": ["Hurrengoa"] }, "Pause slideshow": { "v": ["Pausatu diaporama"] }, "Previous": { "v": ["Aurrekoa"] }, "Start slideshow": { "v": ["Hasi diaporama"] } } }, { "l": "fa", "t": { "Next": { "v": ["بعدی"] }, "Pause slideshow": { "v": ["توقف نمایش اسلاید"] }, "Previous": { "v": ["قبلی"] }, "Start slideshow": { "v": ["شروع نمایش اسلاید"] } } }, { "l": "fi", "t": { "Next": { "v": ["Seuraava"] }, "Pause slideshow": { "v": ["Keskeytä diaesitys"] }, "Previous": { "v": ["Edellinen"] }, "Start slideshow": { "v": ["Aloita diaesitys"] } } }, { "l": "fr", "t": { "Next": { "v": ["Suivant"] }, "Pause slideshow": { "v": ["Mettre le diaporama en pause"] }, "Previous": { "v": ["Précédent"] }, "Start slideshow": { "v": ["Démarrer le diaporama"] } } }, { "l": "ga", "t": { "Next": { "v": ["Ar aghaidh"] }, "Pause slideshow": { "v": ["Cuir taispeántas sleamhnán ar sos"] }, "Previous": { "v": ["Roimhe Seo"] }, "Start slideshow": { "v": ["Tosaigh taispeántas sleamhnán"] } } }, { "l": "gl", "t": { "Next": { "v": ["Seguinte"] }, "Pause slideshow": { "v": ["Pausar o diaporama"] }, "Previous": { "v": ["Anterir"] }, "Start slideshow": { "v": ["Iniciar o diaporama"] } } }, { "l": "he", "t": { "Next": { "v": ["הבא"] }, "Pause slideshow": { "v": ["השהיית מצגת"] }, "Previous": { "v": ["הקודם"] }, "Start slideshow": { "v": ["התחלת המצגת"] } } }, { "l": "hu", "t": { "Next": { "v": ["Következő"] }, "Pause slideshow": { "v": ["Diavetítés szüneteltetése"] }, "Previous": { "v": ["Előző"] }, "Start slideshow": { "v": ["Diavetítés indítása"] } } }, { "l": "id", "t": { "Next": { "v": ["Selanjutnya"] }, "Pause slideshow": { "v": ["Jeda tayangan slide"] }, "Previous": { "v": ["Sebelumnya"] }, "Start slideshow": { "v": ["Mulai salindia"] } } }, { "l": "is", "t": { "Next": { "v": ["Næsta"] }, "Pause slideshow": { "v": ["Gera hlé á skyggnusýningu"] }, "Previous": { "v": ["Fyrri"] }, "Start slideshow": { "v": ["Byrja skyggnusýningu"] } } }, { "l": "it", "t": { "Next": { "v": ["Successivo"] }, "Pause slideshow": { "v": ["Presentazione in pausa"] }, "Previous": { "v": ["Precedente"] }, "Start slideshow": { "v": ["Avvia presentazione"] } } }, { "l": "ja", "t": { "Next": { "v": ["次"] }, "Pause slideshow": { "v": ["スライドショーを一時停止"] }, "Previous": { "v": ["前"] }, "Start slideshow": { "v": ["スライドショーを開始"] } } }, { "l": "ja-JP", "t": { "Next": { "v": ["次"] }, "Pause slideshow": { "v": ["スライドショーを一時停止"] }, "Previous": { "v": ["前"] }, "Start slideshow": { "v": ["スライドショーを開始"] } } }, { "l": "ko", "t": { "Next": { "v": ["다음"] }, "Pause slideshow": { "v": ["슬라이드쇼 일시정지"] }, "Previous": { "v": ["이전"] }, "Start slideshow": { "v": ["슬라이드쇼 시작"] } } }, { "l": "lt-LT", "t": { "Next": { "v": ["Kitas"] }, "Pause slideshow": { "v": ["Pristabdyti skaidrių rodymą"] }, "Previous": { "v": ["Ankstesnis"] }, "Start slideshow": { "v": ["Pradėti skaidrių rodymą"] } } }, { "l": "lv", "t": { "Next": { "v": ["Nākamais"] }, "Pause slideshow": { "v": ["Pauzēt slaidrādi"] }, "Previous": { "v": ["Iepriekšējais"] }, "Start slideshow": { "v": ["Sākt slaidrādi"] } } }, { "l": "mk", "t": { "Next": { "v": ["Следно"] }, "Pause slideshow": { "v": ["Пузирај слајдшоу"] }, "Previous": { "v": ["Предходно"] }, "Start slideshow": { "v": ["Стартувај слајдшоу"] } } }, { "l": "my", "t": { "Next": { "v": ["နောက်သို့ဆက်ရန်"] }, "Pause slideshow": { "v": ["စလိုက်ရှိုး ခေတ္တရပ်ရန်"] }, "Previous": { "v": ["ယခင်"] }, "Start slideshow": { "v": ["စလိုက်ရှိုးအား စတင်ရန်"] } } }, { "l": "nb", "t": { "Next": { "v": ["Neste"] }, "Pause slideshow": { "v": ["Pause lysbildefremvisning"] }, "Previous": { "v": ["Forrige"] }, "Start slideshow": { "v": ["Start lysbildefremvisning"] } } }, { "l": "nl", "t": { "Next": { "v": ["Volgende"] }, "Pause slideshow": { "v": ["Pauzeer diavoorstelling"] }, "Previous": { "v": ["Vorige"] }, "Start slideshow": { "v": ["Start diavoorstelling"] } } }, { "l": "oc", "t": { "Next": { "v": ["Seguent"] }, "Pause slideshow": { "v": ["Metre en pausa lo diaporama"] }, "Previous": { "v": ["Precedent"] }, "Start slideshow": { "v": ["Lançar lo diaporama"] } } }, { "l": "pl", "t": { "Next": { "v": ["Następny"] }, "Pause slideshow": { "v": ["Wstrzymaj pokaz slajdów"] }, "Previous": { "v": ["Poprzedni"] }, "Start slideshow": { "v": ["Rozpocznij pokaz slajdów"] } } }, { "l": "pt-BR", "t": { "Next": { "v": ["Próximo"] }, "Pause slideshow": { "v": ["Pausar apresentação de slides"] }, "Previous": { "v": ["Anterior"] }, "Start slideshow": { "v": ["Iniciar apresentação de slides"] } } }, { "l": "pt-PT", "t": { "Next": { "v": ["Seguinte"] }, "Pause slideshow": { "v": ["Pausar diaporama"] }, "Previous": { "v": ["Anterior"] }, "Start slideshow": { "v": ["Iniciar diaporama"] } } }, { "l": "ro", "t": { "Next": { "v": ["Următorul"] }, "Pause slideshow": { "v": ["Pauză prezentare de diapozitive"] }, "Previous": { "v": ["Anterior"] }, "Start slideshow": { "v": ["Începeți prezentarea de diapozitive"] } } }, { "l": "ru", "t": { "Next": { "v": ["Следующее"] }, "Pause slideshow": { "v": ["Приостановить показ слйдов"] }, "Previous": { "v": ["Предыдущее"] }, "Start slideshow": { "v": ["Начать показ слайдов"] } } }, { "l": "sk", "t": { "Next": { "v": ["Ďalej"] }, "Pause slideshow": { "v": ["Pozastaviť prezentáciu"] }, "Previous": { "v": ["Predchádzajúce"] }, "Start slideshow": { "v": ["Začať prezentáciu"] } } }, { "l": "sl", "t": { "Next": { "v": ["Naslednji"] }, "Pause slideshow": { "v": ["Ustavi predstavitev"] }, "Previous": { "v": ["Predhodni"] }, "Start slideshow": { "v": ["Začni predstavitev"] } } }, { "l": "sr", "t": { "Next": { "v": ["Следеће"] }, "Pause slideshow": { "v": ["Паузирај слајд шоу"] }, "Previous": { "v": ["Претходно"] }, "Start slideshow": { "v": ["Покрени слајд шоу"] } } }, { "l": "sv", "t": { "Next": { "v": ["Nästa"] }, "Pause slideshow": { "v": ["Pausa bildspelet"] }, "Previous": { "v": ["Föregående"] }, "Start slideshow": { "v": ["Starta bildspelet"] } } }, { "l": "tr", "t": { "Next": { "v": ["Sonraki"] }, "Pause slideshow": { "v": ["Slayt sunumunu duraklat"] }, "Previous": { "v": ["Önceki"] }, "Start slideshow": { "v": ["Slayt sunumunu başlat"] } } }, { "l": "uk", "t": { "Next": { "v": ["Вперед"] }, "Pause slideshow": { "v": ["Пауза у показі слайдів"] }, "Previous": { "v": ["Назад"] }, "Start slideshow": { "v": ["Почати показ слайдів"] } } }, { "l": "uz", "t": { "Next": { "v": ["Keyingi"] }, "Pause slideshow": { "v": ["Slayd-shouni to'xtatib turish"] }, "Previous": { "v": ["Oldingi"] }, "Start slideshow": { "v": ["Slayd-shouni boshlash"] } } }, { "l": "zh-CN", "t": { "Next": { "v": ["下一个"] }, "Pause slideshow": { "v": ["暂停幻灯片"] }, "Previous": { "v": ["上一个"] }, "Start slideshow": { "v": ["开始幻灯片"] } } }, { "l": "zh-HK", "t": { "Next": { "v": ["下一個"] }, "Pause slideshow": { "v": ["暫停幻燈片"] }, "Previous": { "v": ["上一個"] }, "Start slideshow": { "v": ["開始幻燈片"] } } }, { "l": "zh-TW", "t": { "Next": { "v": ["下一個"] }, "Pause slideshow": { "v": ["暫停幻燈片"] }, "Previous": { "v": ["上一個"] }, "Start slideshow": { "v": ["開始幻燈片"] } } }];
const t37 = [{ "l": "ar", "t": { "No emoji found": { "v": ["لم يتم العثور على أي إيموجي emoji"] } } }, { "l": "ast", "t": { "No emoji found": { "v": ["Nun s'atopó nengún fustaxe"] } } }, { "l": "br", "t": { "No emoji found": { "v": ["Emoji ebet kavet"] } } }, { "l": "ca", "t": { "No emoji found": { "v": ["No s'ha trobat cap emoji"] } } }, { "l": "cs", "t": { "No emoji found": { "v": ["Nenalezeno žádné emoji"] } } }, { "l": "cs-CZ", "t": { "No emoji found": { "v": ["Nenalezeno žádné emoji"] } } }, { "l": "da", "t": { "No emoji found": { "v": ["Ingen emoji fundet"] } } }, { "l": "de", "t": { "No emoji found": { "v": ["Kein Emoji gefunden"] } } }, { "l": "de-DE", "t": { "No emoji found": { "v": ["Kein Emoji gefunden"] } } }, { "l": "el", "t": { "No emoji found": { "v": ["Δεν βρέθηκε emoji"] } } }, { "l": "en-GB", "t": { "No emoji found": { "v": ["No emoji found"] } } }, { "l": "eo", "t": { "No emoji found": { "v": ["La emoĝio forestas"] } } }, { "l": "es", "t": { "No emoji found": { "v": ["No se encontró ningún emoji"] } } }, { "l": "es-AR", "t": { "No emoji found": { "v": ["No se encontró ningún emoji"] } } }, { "l": "es-EC", "t": { "No emoji found": { "v": ["No se encontró ningún emoji"] } } }, { "l": "es-MX", "t": { "No emoji found": { "v": ["No se encontró ningún emoji"] } } }, { "l": "et-EE", "t": { "No emoji found": { "v": ["Emojit ei leitud"] } } }, { "l": "eu", "t": { "No emoji found": { "v": ["Ez da emojirik aurkitu"] } } }, { "l": "fa", "t": { "No emoji found": { "v": ["هیچ شکلکی یافت نشد"] } } }, { "l": "fi", "t": { "No emoji found": { "v": ["Emojia ei löytynyt"] } } }, { "l": "fr", "t": { "No emoji found": { "v": ["Pas d’émoji trouvé"] } } }, { "l": "ga", "t": { "No emoji found": { "v": ["Níor aimsíodh emoji"] } } }, { "l": "gl", "t": { "No emoji found": { "v": ["Non se atopou ningún «emoji»"] } } }, { "l": "he", "t": { "No emoji found": { "v": ["לא נמצא אמוג׳י"] } } }, { "l": "hu", "t": { "No emoji found": { "v": ["Nem található emodzsi"] } } }, { "l": "id", "t": { "No emoji found": { "v": ["Tidak ada emoji yang ditemukan"] } } }, { "l": "is", "t": { "No emoji found": { "v": ["Ekkert tjáningartákn fannst"] } } }, { "l": "it", "t": { "No emoji found": { "v": ["Nessun emoji trovato"] } } }, { "l": "ja", "t": { "No emoji found": { "v": ["絵文字が見つかりません"] } } }, { "l": "ja-JP", "t": { "No emoji found": { "v": ["絵文字が見つかりません"] } } }, { "l": "ko", "t": { "No emoji found": { "v": ["이모지 없음"] } } }, { "l": "lt-LT", "t": { "No emoji found": { "v": ["Nerasta jaustukų"] } } }, { "l": "lv", "t": {} }, { "l": "mk", "t": { "No emoji found": { "v": ["Не се пронајдени емотикони"] } } }, { "l": "my", "t": { "No emoji found": { "v": ["အီမိုဂျီ ရှာဖွေမတွေ့နိုင်ပါ"] } } }, { "l": "nb", "t": { "No emoji found": { "v": ["Fant ingen emoji"] } } }, { "l": "nl", "t": { "No emoji found": { "v": ["Geen emoji gevonden"] } } }, { "l": "oc", "t": {} }, { "l": "pl", "t": { "No emoji found": { "v": ["Nie znaleziono emoji"] } } }, { "l": "pt-BR", "t": { "No emoji found": { "v": ["Nenhum emoji encontrado"] } } }, { "l": "pt-PT", "t": { "No emoji found": { "v": ["Nenhum emoji encontrado"] } } }, { "l": "ro", "t": { "No emoji found": { "v": ["Nu s-a găsit niciun emoji"] } } }, { "l": "ru", "t": { "No emoji found": { "v": ["Эмодзи не найдено"] } } }, { "l": "sk", "t": { "No emoji found": { "v": ["Nenašli sa žiadne emodži"] } } }, { "l": "sl", "t": { "No emoji found": { "v": ["Ni najdenih izraznih ikon"] } } }, { "l": "sr", "t": { "No emoji found": { "v": ["Није пронађен ниједан емођи"] } } }, { "l": "sv", "t": { "No emoji found": { "v": ["Hittade inga emojis"] } } }, { "l": "tr", "t": { "No emoji found": { "v": ["Herhangi bir emoji bulunamadı"] } } }, { "l": "uk", "t": { "No emoji found": { "v": ["Емоційки відсутні"] } } }, { "l": "uz", "t": { "No emoji found": { "v": ["Hech qanday emoji topilmadi"] } } }, { "l": "zh-CN", "t": { "No emoji found": { "v": ["表情未找到"] } } }, { "l": "zh-HK", "t": { "No emoji found": { "v": ["未找到表情符號"] } } }, { "l": "zh-TW", "t": { "No emoji found": { "v": ["未找到表情符號"] } } }];
const t38 = [{ "l": "ar", "t": { "No results": { "v": ["ليس هناك أية نتيجة"] } } }, { "l": "ast", "t": { "No results": { "v": ["Nun hai nengún resultáu"] } } }, { "l": "br", "t": { "No results": { "v": ["Disoc'h ebet"] } } }, { "l": "ca", "t": { "No results": { "v": ["Sense resultats"] } } }, { "l": "cs", "t": { "No results": { "v": ["Nic nenalezeno"] } } }, { "l": "cs-CZ", "t": { "No results": { "v": ["Nic nenalezeno"] } } }, { "l": "da", "t": { "No results": { "v": ["Ingen resultater"] } } }, { "l": "de", "t": { "No results": { "v": ["Keine Ergebnisse"] } } }, { "l": "de-DE", "t": { "No results": { "v": ["Keine Ergebnisse"] } } }, { "l": "el", "t": { "No results": { "v": ["Κανένα αποτέλεσμα"] } } }, { "l": "en-GB", "t": { "No results": { "v": ["No results"] } } }, { "l": "eo", "t": { "No results": { "v": ["La rezulto forestas"] } } }, { "l": "es", "t": { "No results": { "v": [" Ningún resultado"] } } }, { "l": "es-AR", "t": { "No results": { "v": ["Sin resultados"] } } }, { "l": "es-EC", "t": { "No results": { "v": ["Sin resultados"] } } }, { "l": "es-MX", "t": { "No results": { "v": ["Sin resultados"] } } }, { "l": "et-EE", "t": { "No results": { "v": ["Tulemusi pole"] } } }, { "l": "eu", "t": { "No results": { "v": ["Emaitzarik ez"] } } }, { "l": "fa", "t": { "No results": { "v": ["بدون هیچ نتیجه‌ای"] } } }, { "l": "fi", "t": { "No results": { "v": ["Ei tuloksia"] } } }, { "l": "fr", "t": { "No results": { "v": ["Aucun résultat"] } } }, { "l": "ga", "t": { "No results": { "v": ["Gan torthaí"] } } }, { "l": "gl", "t": { "No results": { "v": ["Sen resultados"] } } }, { "l": "he", "t": { "No results": { "v": ["אין תוצאות"] } } }, { "l": "hu", "t": { "No results": { "v": ["Nincs találat"] } } }, { "l": "id", "t": { "No results": { "v": ["Tidak ada hasil"] } } }, { "l": "is", "t": { "No results": { "v": ["Engar niðurstöður"] } } }, { "l": "it", "t": { "No results": { "v": ["Nessun risultato"] } } }, { "l": "ja", "t": { "No results": { "v": ["結果無し"] } } }, { "l": "ja-JP", "t": { "No results": { "v": ["結果無し"] } } }, { "l": "ko", "t": { "No results": { "v": ["결과 없음"] } } }, { "l": "lt-LT", "t": { "No results": { "v": ["Nėra rezultatų"] } } }, { "l": "lv", "t": { "No results": { "v": ["Nav rezultātu"] } } }, { "l": "mk", "t": { "No results": { "v": ["Нема резултати"] } } }, { "l": "my", "t": { "No results": { "v": ["ရလဒ်မရှိပါ"] } } }, { "l": "nb", "t": { "No results": { "v": ["Ingen resultater"] } } }, { "l": "nl", "t": { "No results": { "v": ["Geen resultaten"] } } }, { "l": "oc", "t": { "No results": { "v": ["Cap de resultat"] } } }, { "l": "pl", "t": { "No results": { "v": ["Brak wyników"] } } }, { "l": "pt-BR", "t": { "No results": { "v": ["Sem resultados"] } } }, { "l": "pt-PT", "t": { "No results": { "v": ["Sem resultados"] } } }, { "l": "ro", "t": { "No results": { "v": ["Nu există rezultate"] } } }, { "l": "ru", "t": { "No results": { "v": ["Результаты отсуствуют"] } } }, { "l": "sk", "t": { "No results": { "v": ["Žiadne výsledky"] } } }, { "l": "sl", "t": { "No results": { "v": ["Ni zadetkov"] } } }, { "l": "sr", "t": { "No results": { "v": ["Нема резултата"] } } }, { "l": "sv", "t": { "No results": { "v": ["Inga resultat"] } } }, { "l": "tr", "t": { "No results": { "v": ["Herhangi bir sonuç bulunamadı"] } } }, { "l": "uk", "t": { "No results": { "v": ["Відсутні результати"] } } }, { "l": "uz", "t": { "No results": { "v": ["Natija yoʻq"] } } }, { "l": "zh-CN", "t": { "No results": { "v": ["无结果"] } } }, { "l": "zh-HK", "t": { "No results": { "v": ["無結果"] } } }, { "l": "zh-TW", "t": { "No results": { "v": ["無結果"] } } }];
const t39 = [{ "l": "ar", "t": { 'Open link to "{resourceName}"': { "v": ['إفتَح الرابط إلى "{resourceName}"'] } } }, { "l": "ast", "t": { 'Open link to "{resourceName}"': { "v": ["Abrir l'enllaz a «{resourceName}»"] } } }, { "l": "br", "t": {} }, { "l": "ca", "t": {} }, { "l": "cs", "t": { 'Open link to "{resourceName}"': { "v": ["Otevřít odkaz na „{resourceName}“"] } } }, { "l": "cs-CZ", "t": { 'Open link to "{resourceName}"': { "v": ["Otevřít odkaz na „{resourceName}“"] } } }, { "l": "da", "t": { 'Open link to "{resourceName}"': { "v": ['Åbn link til "{resourceName}"'] } } }, { "l": "de", "t": { 'Open link to "{resourceName}"': { "v": ['Link zu "{resourceName}“ öffnen'] } } }, { "l": "de-DE", "t": { 'Open link to "{resourceName}"': { "v": ['Link zu "{resourceName}“ öffnen'] } } }, { "l": "el", "t": { 'Open link to "{resourceName}"': { "v": ['Άνοιγμα συνδέσμου για "{resourceName}"'] } } }, { "l": "en-GB", "t": { 'Open link to "{resourceName}"': { "v": ['Open link to "{resourceName}"'] } } }, { "l": "eo", "t": {} }, { "l": "es", "t": { 'Open link to "{resourceName}"': { "v": ['Abrir enlace a "{resourceName}"'] } } }, { "l": "es-AR", "t": { 'Open link to "{resourceName}"': { "v": ['Abrir enlace a "{resourceName}"'] } } }, { "l": "es-EC", "t": { 'Open link to "{resourceName}"': { "v": ['Abrir enlace a "{resourceName}"'] } } }, { "l": "es-MX", "t": { 'Open link to "{resourceName}"': { "v": ['Abrir enlace a "{resourceName}"'] } } }, { "l": "et-EE", "t": { 'Open link to "{resourceName}"': { "v": ['Ava link "{resourceName}"'] } } }, { "l": "eu", "t": { 'Open link to "{resourceName}"': { "v": ['Ireki "{resourceName}" esteka'] } } }, { "l": "fa", "t": { 'Open link to "{resourceName}"': { "v": ["باز کردن پیوند به «{resourceName}»"] } } }, { "l": "fi", "t": { 'Open link to "{resourceName}"': { "v": ['Avaa linkki "{resourceName}"'] } } }, { "l": "fr", "t": { 'Open link to "{resourceName}"': { "v": ['Ouvrir le lien vers "{resourceName}"'] } } }, { "l": "ga", "t": { 'Open link to "{resourceName}"': { "v": ['Oscail nasc chuig "{resourceName}"'] } } }, { "l": "gl", "t": { 'Open link to "{resourceName}"': { "v": ["Abrir a ligazón a «{resourceName}»"] } } }, { "l": "he", "t": { 'Open link to "{resourceName}"': { "v": ["פתיחת קישור אל „{resourceName}”"] } } }, { "l": "hu", "t": {} }, { "l": "id", "t": { 'Open link to "{resourceName}"': { "v": ['Buka tautan ke "{resourceName}"'] } } }, { "l": "is", "t": { 'Open link to "{resourceName}"': { "v": ['Opna tengil í "{resourceName}"'] } } }, { "l": "it", "t": { 'Open link to "{resourceName}"': { "v": ['Apri il link a "{resourceName}"'] } } }, { "l": "ja", "t": { 'Open link to "{resourceName}"': { "v": ['"{resourceName}" へのリンクを開く'] } } }, { "l": "ja-JP", "t": { 'Open link to "{resourceName}"': { "v": ['"{resourceName}" へのリンクを開く'] } } }, { "l": "ko", "t": { 'Open link to "{resourceName}"': { "v": ['"{resourceName}"의 링크 열기'] } } }, { "l": "lt-LT", "t": {} }, { "l": "lv", "t": {} }, { "l": "mk", "t": {} }, { "l": "my", "t": {} }, { "l": "nb", "t": { 'Open link to "{resourceName}"': { "v": ['Åpne lenken til "{resourceName}"'] } } }, { "l": "nl", "t": { 'Open link to "{resourceName}"': { "v": ['Open link naar "{resourceName}"'] } } }, { "l": "oc", "t": {} }, { "l": "pl", "t": { 'Open link to "{resourceName}"': { "v": ['Otwórz link do "{resourceName}"'] } } }, { "l": "pt-BR", "t": { 'Open link to "{resourceName}"': { "v": ['Abrir o link para "{resourceName}"'] } } }, { "l": "pt-PT", "t": { 'Open link to "{resourceName}"': { "v": ['Abrir link para "{resourceName}"'] } } }, { "l": "ro", "t": { 'Open link to "{resourceName}"': { "v": ['Deschide linkul la  "{resourceName}"'] } } }, { "l": "ru", "t": { 'Open link to "{resourceName}"': { "v": ['Открыть ссылку на "{resourceName}"'] } } }, { "l": "sk", "t": { 'Open link to "{resourceName}"': { "v": ['Otvoriť link v "{resourceName}"'] } } }, { "l": "sl", "t": {} }, { "l": "sr", "t": { 'Open link to "{resourceName}"': { "v": ["Отвори линк на „{resourceName}”"] } } }, { "l": "sv", "t": { 'Open link to "{resourceName}"': { "v": ['Öppna länken till "{resourceName}"'] } } }, { "l": "tr", "t": { 'Open link to "{resourceName}"': { "v": ["{resourceName} bağlantısını aç"] } } }, { "l": "uk", "t": { 'Open link to "{resourceName}"': { "v": ['Відкрити посилання на "{resourceName}"'] } } }, { "l": "uz", "t": { 'Open link to "{resourceName}"': { "v": [' "{resourceName}" ga havolani ochish'] } } }, { "l": "zh-CN", "t": { 'Open link to "{resourceName}"': { "v": ["打开 “{resourceName}” 的链接"] } } }, { "l": "zh-HK", "t": { 'Open link to "{resourceName}"': { "v": ["開啟到「{resourceName}」的連結"] } } }, { "l": "zh-TW", "t": { 'Open link to "{resourceName}"': { "v": ["開啟到「{resourceName}」的連結"] } } }];
const t40 = [{ "l": "ar", "t": { "Pick a date": { "v": ["إختَر التاريخ"] }, "Pick a date and a time": { "v": ["إختَر التاريخ و الوقت"] }, "Pick a month": { "v": ["إختَر الشهر"] }, "Pick a time": { "v": ["إختَر الوقت"] }, "Pick a week": { "v": ["إختَر الأسبوع"] }, "Pick a year": { "v": ["إختَر السنة"] }, "Please select a time zone:": { "v": ["الرجاء تحديد المنطقة الزمنية:"] } } }, { "l": "ast", "t": { "Pick a date": { "v": ["Escueyi una data"] }, "Pick a date and a time": { "v": ["Escueyi una data y hora"] }, "Pick a month": { "v": ["Escueyi un mes"] }, "Pick a time": { "v": ["Escueyi una hora"] }, "Pick a week": { "v": ["Escueyi una selmana"] }, "Pick a year": { "v": ["Escueyi un añu"] }, "Please select a time zone:": { "v": ["Seleiciona un fusu horariu:"] } } }, { "l": "br", "t": {} }, { "l": "ca", "t": { "Please select a time zone:": { "v": ["Seleccioneu una zona horària:"] } } }, { "l": "cs", "t": { "Pick a date": { "v": ["Vybrat datum"] }, "Pick a date and a time": { "v": ["Vybrat datum a čas"] }, "Pick a month": { "v": ["Vybrat měsíc"] }, "Pick a time": { "v": ["Vybrat čas"] }, "Pick a week": { "v": ["Vybrat týden"] }, "Pick a year": { "v": ["Vybrat rok"] }, "Please select a time zone:": { "v": ["Vyberte časovou zónu:"] } } }, { "l": "cs-CZ", "t": { "Pick a date": { "v": ["Vybrat datum"] }, "Pick a date and a time": { "v": ["Vybrat datum a čas"] }, "Pick a month": { "v": ["Vybrat měsíc"] }, "Pick a time": { "v": ["Vybrat čas"] }, "Pick a week": { "v": ["Vybrat týden"] }, "Pick a year": { "v": ["Vybrat rok"] }, "Please select a time zone:": { "v": ["Vyberte časovou zónu:"] } } }, { "l": "da", "t": { "Pick a date": { "v": ["Vælg en dato"] }, "Pick a date and a time": { "v": ["Vælg en dato og tidspunkt"] }, "Pick a month": { "v": ["Vælg en måned"] }, "Pick a time": { "v": ["Vælg et tidspunkt"] }, "Pick a week": { "v": ["Vælg en uge"] }, "Pick a year": { "v": ["Vælg et år"] }, "Please select a time zone:": { "v": ["Vælg venligst en tidszone:"] } } }, { "l": "de", "t": { "Pick a date": { "v": ["Ein Datum auswählen"] }, "Pick a date and a time": { "v": ["Datum und Uhrzeit auswählen"] }, "Pick a month": { "v": ["Einen Monat auswählen"] }, "Pick a time": { "v": ["Eine Uhrzeit auswählen"] }, "Pick a week": { "v": ["Eine Woche auswählen"] }, "Pick a year": { "v": ["Ein Jahr auswählen"] }, "Please select a time zone:": { "v": ["Bitte eine Zeitzone auswählen:"] } } }, { "l": "de-DE", "t": { "Pick a date": { "v": ["Ein Datum auswählen"] }, "Pick a date and a time": { "v": ["Datum und Uhrzeit auswählen"] }, "Pick a month": { "v": ["Einen Monat auswählen"] }, "Pick a time": { "v": ["Eine Uhrzeit auswählen"] }, "Pick a week": { "v": ["Eine Woche auswählen"] }, "Pick a year": { "v": ["Ein Jahr auswählen"] }, "Please select a time zone:": { "v": ["Bitte eine Zeitzone auswählen:"] } } }, { "l": "el", "t": { "Pick a date": { "v": ["Επιλέξτε ημερομηνία"] }, "Pick a date and a time": { "v": ["Επιλέξτε ημερομηνία και ώρα"] }, "Pick a month": { "v": ["Επιλέξτε μήνα"] }, "Pick a time": { "v": ["Επιλέξτε ώρα"] }, "Pick a week": { "v": ["Επιλέξτε εβδομάδα"] }, "Pick a year": { "v": ["Επιλέξτε έτος"] }, "Please select a time zone:": { "v": ["Παρακαλούμε επιλέξτε μια ζώνη ώρας:"] } } }, { "l": "en-GB", "t": { "Pick a date": { "v": ["Pick a date"] }, "Pick a date and a time": { "v": ["Pick a date and a time"] }, "Pick a month": { "v": ["Pick a month"] }, "Pick a time": { "v": ["Pick a time"] }, "Pick a week": { "v": ["Pick a week"] }, "Pick a year": { "v": ["Pick a year"] }, "Please select a time zone:": { "v": ["Please select a time zone:"] } } }, { "l": "eo", "t": {} }, { "l": "es", "t": { "Pick a date": { "v": ["Seleccione una fecha"] }, "Pick a date and a time": { "v": ["Seleccione una fecha y hora"] }, "Pick a month": { "v": ["Seleccione un mes"] }, "Pick a time": { "v": ["Seleccione una hora"] }, "Pick a week": { "v": ["Seleccione una semana"] }, "Pick a year": { "v": ["Seleccione un año"] }, "Please select a time zone:": { "v": ["Por favor elija un huso horario:"] } } }, { "l": "es-AR", "t": { "Pick a date": { "v": ["Elija una fecha"] }, "Pick a date and a time": { "v": ["Elija una fecha y hora"] }, "Pick a month": { "v": ["Elija un mes"] }, "Pick a time": { "v": ["Elija una hora"] }, "Pick a week": { "v": ["Elija una semana"] }, "Pick a year": { "v": ["Elija un año"] }, "Please select a time zone:": { "v": ["Por favor, elija una zona horaria:"] } } }, { "l": "es-EC", "t": { "Pick a date": { "v": ["Seleccionar una fecha"] }, "Pick a date and a time": { "v": ["Seleccionar una fecha y una hora"] }, "Pick a month": { "v": ["Seleccionar un mes"] }, "Pick a time": { "v": ["Seleccionar una semana"] }, "Pick a week": { "v": ["Seleccionar una semana"] }, "Pick a year": { "v": ["Seleccionar un año"] }, "Please select a time zone:": { "v": ["Por favor, selecciona una zona horaria:"] } } }, { "l": "es-MX", "t": { "Pick a date": { "v": ["Seleccionar una fecha"] }, "Pick a date and a time": { "v": ["Seleccionar una fecha y hora"] }, "Pick a month": { "v": ["Seleccionar un mes"] }, "Pick a time": { "v": ["Seleccionar una hora"] }, "Pick a week": { "v": ["Seleccionar una semana"] }, "Pick a year": { "v": ["Seleccionar un año"] }, "Please select a time zone:": { "v": ["Por favor seleccione una zona horaria:"] } } }, { "l": "et-EE", "t": { "Pick a date": { "v": ["Vali kuupäev"] }, "Pick a date and a time": { "v": ["Vali kuupäev ja kellaaeg"] }, "Pick a month": { "v": ["Vali kuu"] }, "Pick a time": { "v": ["Vali kellaaeg"] }, "Pick a week": { "v": ["Vali nädal"] }, "Pick a year": { "v": ["Vali aasta"] }, "Please select a time zone:": { "v": ["Vali ajatsoon"] } } }, { "l": "eu", "t": { "Pick a date": { "v": ["Aukeratu data bat"] }, "Pick a date and a time": { "v": ["Aukeratu data eta ordu bat"] }, "Pick a month": { "v": ["Aukeratu hilabete bat"] }, "Pick a time": { "v": ["Aukeratu ordu bat"] }, "Pick a week": { "v": ["Aukeratu aste bat"] }, "Pick a year": { "v": ["Aukeratu urte bat"] }, "Please select a time zone:": { "v": ["Mesedez hautatu ordu-zona bat:"] } } }, { "l": "fa", "t": { "Pick a date": { "v": ["انتخاب تاریخ"] }, "Pick a date and a time": { "v": ["انتخاب تاریخ و زمان"] }, "Pick a month": { "v": ["انتخاب ماه"] }, "Pick a time": { "v": ["انتخاب زمان"] }, "Pick a week": { "v": ["انتخاب هفته"] }, "Pick a year": { "v": ["انتخاب سال"] }, "Please select a time zone:": { "v": ["لطفا یک منطقهٔ زمانی را انتخاب کنید:"] } } }, { "l": "fi", "t": { "Pick a date": { "v": ["Valitse päivä"] }, "Pick a date and a time": { "v": ["Valitse päivä ja kellonaika"] }, "Pick a month": { "v": ["Valitse kuukausi"] }, "Pick a time": { "v": ["Valitse kellonaika"] }, "Pick a week": { "v": ["Valitse viikko"] }, "Pick a year": { "v": ["Valitse vuosi"] }, "Please select a time zone:": { "v": ["Valitse aikavyöhyke:"] } } }, { "l": "fr", "t": { "Pick a date": { "v": ["Sélectionner une date"] }, "Pick a date and a time": { "v": ["Sélectionner une date et une heure"] }, "Pick a month": { "v": ["Sélectionner un mois"] }, "Pick a time": { "v": ["Sélectionner une heure"] }, "Pick a week": { "v": ["Sélectionner une semaine"] }, "Pick a year": { "v": ["Sélectionner une année"] }, "Please select a time zone:": { "v": ["Sélectionnez un fuseau horaire : "] } } }, { "l": "ga", "t": { "Pick a date": { "v": ["Roghnaigh dáta"] }, "Pick a date and a time": { "v": ["Roghnaigh dáta agus am"] }, "Pick a month": { "v": ["Roghnaigh mí"] }, "Pick a time": { "v": ["Roghnaigh am"] }, "Pick a week": { "v": ["Roghnaigh seachtain"] }, "Pick a year": { "v": ["Roghnaigh bliain"] }, "Please select a time zone:": { "v": ["Roghnaigh crios ama le do thoil:"] } } }, { "l": "gl", "t": { "Pick a date": { "v": ["Escolla unha data"] }, "Pick a date and a time": { "v": ["Escolle unha data e unha hora"] }, "Pick a month": { "v": ["Escolla un mes"] }, "Pick a time": { "v": ["Escolla unha hora"] }, "Pick a week": { "v": ["Escolla unha semana"] }, "Pick a year": { "v": ["Escolla un ano"] }, "Please select a time zone:": { "v": ["Escolla un fuso horario:"] } } }, { "l": "he", "t": { "Pick a date": { "v": ["נא לבחור תאריך"] }, "Pick a date and a time": { "v": ["נא לבחור תאריך ושעה"] }, "Pick a month": { "v": ["נא לבחור חודש"] }, "Pick a time": { "v": ["נא לבחור שעה"] }, "Pick a week": { "v": ["נא לבחור שבוע"] }, "Pick a year": { "v": ["נא לבחור שנה"] }, "Please select a time zone:": { "v": ["נא לבחור אזור זמן:"] } } }, { "l": "hu", "t": { "Please select a time zone:": { "v": ["Válasszon időzónát:"] } } }, { "l": "id", "t": { "Pick a date": { "v": ["Pilih tanggal"] }, "Pick a date and a time": { "v": ["Pilih tanggal dan waktu"] }, "Pick a month": { "v": ["Pilih bulan"] }, "Pick a time": { "v": ["Pilih waktu"] }, "Pick a week": { "v": ["Pilih pekan"] }, "Pick a year": { "v": ["Pilih tahun"] }, "Please select a time zone:": { "v": ["Mohon pilih zona waktu"] } } }, { "l": "is", "t": { "Pick a date": { "v": ["Veldu dagsetningu"] }, "Pick a date and a time": { "v": ["Veldu dagsetningu og tíma"] }, "Pick a month": { "v": ["Veldu mánuð"] }, "Pick a time": { "v": ["Veldu tíma"] }, "Pick a week": { "v": ["Veldu viku"] }, "Pick a year": { "v": ["Veldu ár"] }, "Please select a time zone:": { "v": ["Veldu tímabelti:"] } } }, { "l": "it", "t": { "Pick a date": { "v": ["Scegli una data"] }, "Pick a date and a time": { "v": ["Scegli una data e un orario"] }, "Pick a month": { "v": ["Scegli un mese"] }, "Pick a time": { "v": ["Scegli un momento"] }, "Pick a week": { "v": ["Scegli una settimana"] }, "Pick a year": { "v": ["Scegli un anno"] }, "Please select a time zone:": { "v": ["Si prega di selezionare un fuso orario:"] } } }, { "l": "ja", "t": { "Pick a date": { "v": ["日付を選択してください"] }, "Pick a date and a time": { "v": ["日付と時刻を選択してください"] }, "Pick a month": { "v": ["月を選択してください"] }, "Pick a time": { "v": ["時間を選択してください"] }, "Pick a week": { "v": ["週を選択してください"] }, "Pick a year": { "v": ["年を選択してください"] }, "Please select a time zone:": { "v": ["タイムゾーンを選んで下さい："] } } }, { "l": "ja-JP", "t": { "Pick a date": { "v": ["日付を選択してください"] }, "Pick a date and a time": { "v": ["日付と時刻を選択してください"] }, "Pick a month": { "v": ["月を選択してください"] }, "Pick a time": { "v": ["時間を選択してください"] }, "Pick a week": { "v": ["週を選択してください"] }, "Pick a year": { "v": ["年を選択してください"] }, "Please select a time zone:": { "v": ["タイムゾーンを選んで下さい："] } } }, { "l": "ko", "t": { "Pick a date": { "v": ["날짜 선택"] }, "Pick a date and a time": { "v": ["날짜와 시간 선택"] }, "Pick a month": { "v": ["달 선택"] }, "Pick a time": { "v": ["시간 선택"] }, "Pick a week": { "v": ["주 선택"] }, "Pick a year": { "v": ["연도 선택"] }, "Please select a time zone:": { "v": ["시간대를 선택하세요:"] } } }, { "l": "lt-LT", "t": {} }, { "l": "lv", "t": {} }, { "l": "mk", "t": { "Please select a time zone:": { "v": ["Изберете временска зона:"] } } }, { "l": "my", "t": { "Please select a time zone:": { "v": ["ဒေသစံတော်ချိန် ရွေးချယ်ပေးပါ"] } } }, { "l": "nb", "t": { "Pick a date": { "v": ["Velg en dato"] }, "Pick a date and a time": { "v": ["Velg en dato og et tidspunkt"] }, "Pick a month": { "v": ["Velg en måned"] }, "Pick a time": { "v": ["Velg et tidspunkt"] }, "Pick a week": { "v": ["Velg en uke"] }, "Pick a year": { "v": ["Velg et år"] }, "Please select a time zone:": { "v": ["Vennligst velg tidssone"] } } }, { "l": "nl", "t": { "Pick a date": { "v": ["Selecteer een datum"] }, "Pick a date and a time": { "v": ["Selecteer een datum en tijd"] }, "Pick a month": { "v": ["Selecteer een maand"] }, "Pick a time": { "v": ["Selecteer een tijd"] }, "Pick a week": { "v": ["Selecteer een week"] }, "Pick a year": { "v": ["Selecteer een jaar"] }, "Please select a time zone:": { "v": ["Selecteer een tijdzone:"] } } }, { "l": "oc", "t": {} }, { "l": "pl", "t": { "Pick a date": { "v": ["Wybierz datę"] }, "Pick a date and a time": { "v": ["Wybierz datę i godzinę"] }, "Pick a month": { "v": ["Wybierz miesiąc"] }, "Pick a time": { "v": ["Wybierz czas"] }, "Pick a week": { "v": ["Wybierz tydzień"] }, "Pick a year": { "v": ["Wybierz rok"] }, "Please select a time zone:": { "v": ["Wybierz strefę czasową:"] } } }, { "l": "pt-BR", "t": { "Pick a date": { "v": ["Escolha uma data"] }, "Pick a date and a time": { "v": ["Escolha uma data e um horário"] }, "Pick a month": { "v": ["Escolha um mês"] }, "Pick a time": { "v": ["Escolha um horário"] }, "Pick a week": { "v": ["Escolha uma semana"] }, "Pick a year": { "v": ["Escolha um ano"] }, "Please select a time zone:": { "v": ["Selecione um fuso horário: "] } } }, { "l": "pt-PT", "t": { "Pick a date": { "v": ["Escolha uma data"] }, "Pick a date and a time": { "v": ["Escolha uma data e uma hora"] }, "Pick a month": { "v": ["Escolha um mês"] }, "Pick a time": { "v": ["Escolha uma hora"] }, "Pick a week": { "v": ["Escolha uma semana"] }, "Pick a year": { "v": ["Escolha um ano"] }, "Please select a time zone:": { "v": ["Por favor, selecione um fuso horário: "] } } }, { "l": "ro", "t": { "Pick a date": { "v": ["Selectați o dată"] }, "Pick a date and a time": { "v": ["Selectați data și timpul"] }, "Pick a month": { "v": ["Selectați o lună"] }, "Pick a time": { "v": ["Selectați timpul"] }, "Pick a week": { "v": ["Selectați o săptămână"] }, "Pick a year": { "v": ["Selectați anul"] }, "Please select a time zone:": { "v": ["Vă rugăm să selectați un fus orar:"] } } }, { "l": "ru", "t": { "Pick a date": { "v": ["Выберите дату"] }, "Pick a date and a time": { "v": ["Выберите дату и время"] }, "Pick a month": { "v": ["Выберите месяц"] }, "Pick a time": { "v": ["Выберите время"] }, "Pick a week": { "v": ["Выберите неделю"] }, "Pick a year": { "v": ["Выберите год"] }, "Please select a time zone:": { "v": ["Пожалуйста, выберите часовой пояс:"] } } }, { "l": "sk", "t": { "Pick a date": { "v": ["Vybrať dátum"] }, "Pick a date and a time": { "v": ["Vybrať dátum a čas"] }, "Pick a month": { "v": ["Vybrať mesiac"] }, "Pick a time": { "v": ["Vybrať čas"] }, "Pick a week": { "v": ["Vybrať týždeň"] }, "Pick a year": { "v": ["Vybrať rok"] }, "Please select a time zone:": { "v": ["Prosím vyberte časovú zónu:"] } } }, { "l": "sl", "t": { "Pick a date": { "v": ["Izbor datuma"] }, "Pick a date and a time": { "v": ["Izbor datuma in časa"] }, "Pick a month": { "v": ["Izbor meseca"] }, "Pick a time": { "v": ["Izbor časa"] }, "Pick a week": { "v": ["Izbor tedna"] }, "Pick a year": { "v": ["Izbor leta"] }, "Please select a time zone:": { "v": ["Izbor časovnega pasu:"] } } }, { "l": "sr", "t": { "Pick a date": { "v": ["Изаберите датум"] }, "Pick a date and a time": { "v": ["Изаберите датум и време"] }, "Pick a month": { "v": ["Изаберите месец"] }, "Pick a time": { "v": ["Изаберите време"] }, "Pick a week": { "v": ["Изаберите недељу"] }, "Pick a year": { "v": ["Изаберите годину"] }, "Please select a time zone:": { "v": ["Молимо вас да изаберете временску зону:"] } } }, { "l": "sv", "t": { "Pick a date": { "v": ["Välj datum"] }, "Pick a date and a time": { "v": ["Välj datum och tid"] }, "Pick a month": { "v": ["Välj månad"] }, "Pick a time": { "v": ["Välj tid"] }, "Pick a week": { "v": ["Välj vecka"] }, "Pick a year": { "v": ["Välj år"] }, "Please select a time zone:": { "v": ["Välj tidszon:"] } } }, { "l": "tr", "t": { "Pick a date": { "v": ["Bir tarih seçin"] }, "Pick a date and a time": { "v": ["Bir tarih ve saat seçin"] }, "Pick a month": { "v": ["Bir ay seçin"] }, "Pick a time": { "v": ["Bir saat seçin"] }, "Pick a week": { "v": ["Bir hafta seçin"] }, "Pick a year": { "v": ["Bir yıl seçin"] }, "Please select a time zone:": { "v": ["Lütfen bir saat dilimi seçin:"] } } }, { "l": "uk", "t": { "Pick a date": { "v": ["Вибрати дату"] }, "Pick a date and a time": { "v": ["Виберіть дату та час"] }, "Pick a month": { "v": ["Виберіть місяць"] }, "Pick a time": { "v": ["Виберіть час"] }, "Pick a week": { "v": ["Виберіть тиждень"] }, "Pick a year": { "v": ["Виберіть рік"] }, "Please select a time zone:": { "v": ["Виберіть часовий пояс:"] } } }, { "l": "uz", "t": { "Pick a date": { "v": ["Sana tanlang"] }, "Pick a date and a time": { "v": ["Sana va vaqtni tanlang"] }, "Pick a month": { "v": ["Oyni tanlang"] }, "Pick a time": { "v": ["Vaqtni tanlang"] }, "Pick a week": { "v": ["Haftani tanlang"] }, "Pick a year": { "v": ["Yilni tanlang"] }, "Please select a time zone:": { "v": ["Vaqt mintaqasini tanlang:"] } } }, { "l": "zh-CN", "t": { "Pick a date": { "v": ["选择日期"] }, "Pick a date and a time": { "v": ["选择日期和时间"] }, "Pick a month": { "v": ["选择月份"] }, "Pick a time": { "v": ["选择时间"] }, "Pick a week": { "v": ["选择星期"] }, "Pick a year": { "v": ["选择年份"] }, "Please select a time zone:": { "v": ["请选择一个时区："] } } }, { "l": "zh-HK", "t": { "Pick a date": { "v": ["挑選日期"] }, "Pick a date and a time": { "v": ["挑選日期與時間"] }, "Pick a month": { "v": ["挑選月份"] }, "Pick a time": { "v": ["挑選時間"] }, "Pick a week": { "v": ["挑選星期"] }, "Pick a year": { "v": ["挑選年份"] }, "Please select a time zone:": { "v": ["請選擇時區："] } } }, { "l": "zh-TW", "t": { "Pick a date": { "v": ["挑選日期"] }, "Pick a date and a time": { "v": ["挑選日期與時間"] }, "Pick a month": { "v": ["挑選月份"] }, "Pick a time": { "v": ["挑選時間"] }, "Pick a week": { "v": ["挑選星期"] }, "Pick a year": { "v": ["挑選年份"] }, "Please select a time zone:": { "v": ["請選取時區："] } } }];
const t41 = [{ "l": "ar", "t": { "Provider icon": { "v": ["أيقونة المزوّد"] } } }, { "l": "ast", "t": { "Provider icon": { "v": ["Iconu del fornidor"] } } }, { "l": "br", "t": {} }, { "l": "ca", "t": {} }, { "l": "cs", "t": { "Provider icon": { "v": ["Ikona poskytovatele"] } } }, { "l": "cs-CZ", "t": { "Provider icon": { "v": ["Ikona poskytovatele"] } } }, { "l": "da", "t": { "Provider icon": { "v": ["Udbyder ikon"] } } }, { "l": "de", "t": { "Provider icon": { "v": ["Anbietersymbol"] } } }, { "l": "de-DE", "t": { "Provider icon": { "v": ["Anbietersymbol"] } } }, { "l": "el", "t": { "Provider icon": { "v": ["Εικονίδιο παρόχου"] } } }, { "l": "en-GB", "t": { "Provider icon": { "v": ["Provider icon"] } } }, { "l": "eo", "t": {} }, { "l": "es", "t": { "Provider icon": { "v": ["Ícono del proveedor"] } } }, { "l": "es-AR", "t": { "Provider icon": { "v": ["Ícono del proveedor"] } } }, { "l": "es-EC", "t": { "Provider icon": { "v": ["Ícono del proveedor"] } } }, { "l": "es-MX", "t": { "Provider icon": { "v": ["Ícono del proveedor"] } } }, { "l": "et-EE", "t": { "Provider icon": { "v": ["Teenusepakkuja ikoon"] } } }, { "l": "eu", "t": { "Provider icon": { "v": ["Hornitzailearen ikonoa"] } } }, { "l": "fa", "t": { "Provider icon": { "v": ["آیکون ارائه دهنده"] } } }, { "l": "fi", "t": { "Provider icon": { "v": ["Palveluntarjoajan kuvake"] } } }, { "l": "fr", "t": { "Provider icon": { "v": ["Icône du fournisseur"] } } }, { "l": "ga", "t": { "Provider icon": { "v": ["Deilbhín soláthraí"] } } }, { "l": "gl", "t": { "Provider icon": { "v": ["Icona do provedor"] } } }, { "l": "he", "t": { "Provider icon": { "v": ["סמל ספק"] } } }, { "l": "hu", "t": {} }, { "l": "id", "t": { "Provider icon": { "v": ["Ikon penyedia"] } } }, { "l": "is", "t": { "Provider icon": { "v": ["Táknmynd þjónustuveitu"] } } }, { "l": "it", "t": { "Provider icon": { "v": ["Icona del provider"] } } }, { "l": "ja", "t": { "Provider icon": { "v": ["プロバイダーのアイコン"] } } }, { "l": "ja-JP", "t": { "Provider icon": { "v": ["プロバイダーのアイコン"] } } }, { "l": "ko", "t": { "Provider icon": { "v": ["제공자 아이콘"] } } }, { "l": "lt-LT", "t": {} }, { "l": "lv", "t": {} }, { "l": "mk", "t": {} }, { "l": "my", "t": {} }, { "l": "nb", "t": { "Provider icon": { "v": ["Leverandørikon"] } } }, { "l": "nl", "t": { "Provider icon": { "v": ["Provider icoon"] } } }, { "l": "oc", "t": {} }, { "l": "pl", "t": { "Provider icon": { "v": ["Dostawca ikony"] } } }, { "l": "pt-BR", "t": { "Provider icon": { "v": ["Ícone do provedor"] } } }, { "l": "pt-PT", "t": { "Provider icon": { "v": ["Ícone do fornecedor"] } } }, { "l": "ro", "t": { "Provider icon": { "v": ["Provider pentru icon"] } } }, { "l": "ru", "t": { "Provider icon": { "v": ["Значок поставщика"] } } }, { "l": "sk", "t": { "Provider icon": { "v": ["Ikonka poskytovateľa"] } } }, { "l": "sl", "t": {} }, { "l": "sr", "t": { "Provider icon": { "v": ["Икона пружаоца"] } } }, { "l": "sv", "t": { "Provider icon": { "v": ["Leverantörsikon"] } } }, { "l": "tr", "t": { "Provider icon": { "v": ["Sağlayıcı simgesi"] } } }, { "l": "uk", "t": { "Provider icon": { "v": ["Піктограма постачальника"] } } }, { "l": "uz", "t": { "Provider icon": { "v": ["Provayder belgisi"] } } }, { "l": "zh-CN", "t": { "Provider icon": { "v": ["提供者图标"] } } }, { "l": "zh-HK", "t": { "Provider icon": { "v": ["提供者圖示"] } } }, { "l": "zh-TW", "t": { "Provider icon": { "v": ["提供者圖示"] } } }];
const t42 = [{ "l": "ar", "t": { "Related team resources": { "v": ["موارد للفريق ذات صلة"] }, "View team": { "v": ["عرض الفريق"] } } }, { "l": "ast", "t": { "Related team resources": { "v": ["Recursos rellacionaos colos equipos"] }, "View team": { "v": ["Ver l'equipu"] } } }, { "l": "br", "t": {} }, { "l": "ca", "t": {} }, { "l": "cs", "t": { "Related team resources": { "v": ["Související prostředky kolektivu"] }, "View team": { "v": ["Zobrazit kolektiv"] } } }, { "l": "cs-CZ", "t": {} }, { "l": "da", "t": { "Related team resources": { "v": ["Relaterede teamressourcer"] }, "View team": { "v": ["Se teamet"] } } }, { "l": "de", "t": { "Related team resources": { "v": ["Verwandte Team-Ressourcen"] }, "View team": { "v": ["Team anzeigen"] } } }, { "l": "de-DE", "t": { "Related team resources": { "v": ["Verwandte Team-Ressourcen"] }, "View team": { "v": ["Team anzeigen"] } } }, { "l": "el", "t": { "Related team resources": { "v": ["Σχετικοί πόροι ομάδας"] }, "View team": { "v": ["Προβολή ομάδας"] } } }, { "l": "en-GB", "t": { "Related team resources": { "v": ["Related team resources"] }, "View team": { "v": ["View team"] } } }, { "l": "eo", "t": {} }, { "l": "es", "t": { "Related team resources": { "v": ["Recursos de equipo relacionados"] }, "View team": { "v": ["Ver equipo"] } } }, { "l": "es-AR", "t": { "Related team resources": { "v": ["Recursos de equipo relacionados"] }, "View team": { "v": ["Ver equipo"] } } }, { "l": "es-EC", "t": {} }, { "l": "es-MX", "t": { "Related team resources": { "v": ["Recursos de equipo relacionados"] }, "View team": { "v": ["Ver equipo"] } } }, { "l": "et-EE", "t": { "Related team resources": { "v": ["Tiimi seotud ressursid"] }, "View team": { "v": ["Vaata tiimi"] } } }, { "l": "eu", "t": {} }, { "l": "fa", "t": { "Related team resources": { "v": ["منابع تیمی مرتبط"] }, "View team": { "v": ["مشاهده گروه"] } } }, { "l": "fi", "t": { "Related team resources": { "v": ["Liittyvät tiimiresurssit"] }, "View team": { "v": ["Näytä tiimi"] } } }, { "l": "fr", "t": { "Related team resources": { "v": ["Ressources d'équipe associées"] }, "View team": { "v": ["Voir l'équipe"] } } }, { "l": "ga", "t": { "Related team resources": { "v": ["Acmhainní foirne gaolmhara"] }, "View team": { "v": ["Féach ar an bhfoireann"] } } }, { "l": "gl", "t": { "Related team resources": { "v": ["Recursos de equipo relacionados"] }, "View team": { "v": ["Ver o equipo"] } } }, { "l": "he", "t": {} }, { "l": "hu", "t": {} }, { "l": "id", "t": {} }, { "l": "is", "t": { "Related team resources": { "v": ["Tengd tilföng teymis"] }, "View team": { "v": ["Skoða teymi"] } } }, { "l": "it", "t": {} }, { "l": "ja", "t": { "Related team resources": { "v": ["チームの関連リソース"] }, "View team": { "v": ["チームを表示"] } } }, { "l": "ja-JP", "t": { "Related team resources": { "v": ["チームの関連リソース"] }, "View team": { "v": ["チームを表示"] } } }, { "l": "ko", "t": { "Related team resources": { "v": ["관련 팀 리소스"] }, "View team": { "v": ["팀 보기"] } } }, { "l": "lt-LT", "t": {} }, { "l": "lv", "t": {} }, { "l": "mk", "t": {} }, { "l": "my", "t": {} }, { "l": "nb", "t": { "Related team resources": { "v": ["Relaterte lagressurser"] }, "View team": { "v": ["Se lag"] } } }, { "l": "nl", "t": { "Related team resources": { "v": ["Verwante teambronnen"] }, "View team": { "v": ["Team bekijken"] } } }, { "l": "oc", "t": {} }, { "l": "pl", "t": { "Related team resources": { "v": ["Powiązane zasoby grupowe"] }, "View team": { "v": ["Zobacz grupę"] } } }, { "l": "pt-BR", "t": { "Related team resources": { "v": ["Recursos de equipe relacionados"] }, "View team": { "v": ["Ver equipe"] } } }, { "l": "pt-PT", "t": { "Related team resources": { "v": ["Recursos relacionados com a equipa"] }, "View team": { "v": ["Ver equipa"] } } }, { "l": "ro", "t": {} }, { "l": "ru", "t": { "Related team resources": { "v": ["Связанные командные ресурсы"] }, "View team": { "v": ["Просмотр команды"] } } }, { "l": "sk", "t": { "Related team resources": { "v": ["Súvisiace tímové zdroje"] }, "View team": { "v": ["Zobraziť tím"] } } }, { "l": "sl", "t": {} }, { "l": "sr", "t": { "Related team resources": { "v": ["Повезани тимски ресурси"] }, "View team": { "v": ["Прикажи тим"] } } }, { "l": "sv", "t": { "Related team resources": { "v": ["Relaterade teamresurser"] }, "View team": { "v": ["Visa team"] } } }, { "l": "tr", "t": { "Related team resources": { "v": ["İlgili takım kaynakları"] }, "View team": { "v": ["Takımı görüntüle"] } } }, { "l": "uk", "t": { "Related team resources": { "v": ["Пов'язані ресурси команди"] }, "View team": { "v": ["Переглянути команду"] } } }, { "l": "uz", "t": { "Related team resources": { "v": ["Tegishli jamoa resurslari"] }, "View team": { "v": ["Jamoani ko'rish"] } } }, { "l": "zh-CN", "t": { "Related team resources": { "v": ["相关团队资源"] }, "View team": { "v": ["查看团队"] } } }, { "l": "zh-HK", "t": { "Related team resources": { "v": ["相關團隊資源"] }, "View team": { "v": ["查看團隊"] } } }, { "l": "zh-TW", "t": {} }];
const t43 = [{ "l": "ar", "t": { "Search": { "v": ["بحث"] } } }, { "l": "ast", "t": { "Search": { "v": ["Buscar"] } } }, { "l": "br", "t": { "Search": { "v": ["Klask"] } } }, { "l": "ca", "t": { "Search": { "v": ["Cerca"] } } }, { "l": "cs", "t": { "Search": { "v": ["Hledat"] } } }, { "l": "cs-CZ", "t": { "Search": { "v": ["Hledat"] } } }, { "l": "da", "t": { "Search": { "v": ["Søg"] } } }, { "l": "de", "t": { "Search": { "v": ["Suche"] } } }, { "l": "de-DE", "t": { "Search": { "v": ["Suche"] } } }, { "l": "el", "t": { "Search": { "v": ["Αναζήτηση"] } } }, { "l": "en-GB", "t": { "Search": { "v": ["Search"] } } }, { "l": "eo", "t": { "Search": { "v": ["Serĉi"] } } }, { "l": "es", "t": { "Search": { "v": ["Buscar"] } } }, { "l": "es-AR", "t": { "Search": { "v": ["Buscar"] } } }, { "l": "es-EC", "t": { "Search": { "v": ["Buscar"] } } }, { "l": "es-MX", "t": { "Search": { "v": ["Buscar"] } } }, { "l": "et-EE", "t": { "Search": { "v": ["Otsing"] } } }, { "l": "eu", "t": { "Search": { "v": ["Bilatu"] } } }, { "l": "fa", "t": { "Search": { "v": ["جستجو"] } } }, { "l": "fi", "t": { "Search": { "v": ["Etsi"] } } }, { "l": "fr", "t": { "Search": { "v": ["Chercher"] } } }, { "l": "ga", "t": { "Search": { "v": ["Cuardach"] } } }, { "l": "gl", "t": { "Search": { "v": ["Buscar"] } } }, { "l": "he", "t": { "Search": { "v": ["חיפוש"] } } }, { "l": "hu", "t": { "Search": { "v": ["Keresés"] } } }, { "l": "id", "t": { "Search": { "v": ["Cari"] } } }, { "l": "is", "t": { "Search": { "v": ["Leita"] } } }, { "l": "it", "t": { "Search": { "v": ["Cerca"] } } }, { "l": "ja", "t": { "Search": { "v": ["検索"] } } }, { "l": "ja-JP", "t": { "Search": { "v": ["検索"] } } }, { "l": "ko", "t": { "Search": { "v": ["검색"] } } }, { "l": "lt-LT", "t": { "Search": { "v": ["Ieškoti"] } } }, { "l": "lv", "t": {} }, { "l": "mk", "t": { "Search": { "v": ["Барај"] } } }, { "l": "my", "t": { "Search": { "v": ["ရှာဖွေရန်"] } } }, { "l": "nb", "t": { "Search": { "v": ["Søk"] } } }, { "l": "nl", "t": { "Search": { "v": ["Zoeken"] } } }, { "l": "oc", "t": {} }, { "l": "pl", "t": { "Search": { "v": ["Szukaj"] } } }, { "l": "pt-BR", "t": { "Search": { "v": ["Pesquisar"] } } }, { "l": "pt-PT", "t": { "Search": { "v": ["Pesquisar"] } } }, { "l": "ro", "t": { "Search": { "v": ["Căutare"] } } }, { "l": "ru", "t": { "Search": { "v": ["Поиск"] } } }, { "l": "sk", "t": { "Search": { "v": ["Hľadať"] } } }, { "l": "sl", "t": { "Search": { "v": ["Iskanje"] } } }, { "l": "sr", "t": { "Search": { "v": ["Претражи"] } } }, { "l": "sv", "t": { "Search": { "v": ["Sök"] } } }, { "l": "tr", "t": { "Search": { "v": ["Arama"] } } }, { "l": "uk", "t": { "Search": { "v": ["Пошук"] } } }, { "l": "uz", "t": { "Search": { "v": ["Qidiruv"] } } }, { "l": "zh-CN", "t": { "Search": { "v": ["搜索"] } } }, { "l": "zh-HK", "t": { "Search": { "v": ["搜尋"] } } }, { "l": "zh-TW", "t": { "Search": { "v": ["搜尋"] } } }];
const t44 = [{ "l": "ar", "t": {} }, { "l": "ast", "t": {} }, { "l": "br", "t": {} }, { "l": "ca", "t": {} }, { "l": "cs", "t": {} }, { "l": "cs-CZ", "t": {} }, { "l": "da", "t": {} }, { "l": "de", "t": {} }, { "l": "de-DE", "t": {} }, { "l": "el", "t": {} }, { "l": "en-GB", "t": {} }, { "l": "eo", "t": {} }, { "l": "es", "t": {} }, { "l": "es-AR", "t": {} }, { "l": "es-EC", "t": {} }, { "l": "es-MX", "t": {} }, { "l": "et-EE", "t": {} }, { "l": "eu", "t": {} }, { "l": "fa", "t": {} }, { "l": "fi", "t": {} }, { "l": "fr", "t": {} }, { "l": "ga", "t": {} }, { "l": "gl", "t": {} }, { "l": "he", "t": {} }, { "l": "hu", "t": {} }, { "l": "id", "t": {} }, { "l": "is", "t": {} }, { "l": "it", "t": {} }, { "l": "ja", "t": {} }, { "l": "ja-JP", "t": {} }, { "l": "ko", "t": {} }, { "l": "lt-LT", "t": {} }, { "l": "lv", "t": {} }, { "l": "mk", "t": {} }, { "l": "my", "t": {} }, { "l": "nb", "t": {} }, { "l": "nl", "t": {} }, { "l": "oc", "t": {} }, { "l": "pl", "t": {} }, { "l": "pt-BR", "t": {} }, { "l": "pt-PT", "t": {} }, { "l": "ro", "t": {} }, { "l": "ru", "t": {} }, { "l": "sk", "t": {} }, { "l": "sl", "t": {} }, { "l": "sr", "t": {} }, { "l": "sv", "t": {} }, { "l": "tr", "t": {} }, { "l": "uk", "t": {} }, { "l": "uz", "t": {} }, { "l": "zh-CN", "t": {} }, { "l": "zh-HK", "t": {} }, { "l": "zh-TW", "t": {} }];
const t45 = [{ "l": "ar", "t": { "Search for time zone": { "v": ["البحث عن منطقة زمنية"] }, "Type to search time zone": { "v": ["أكتُب للبحث عن منطقة زمنية"] } } }, { "l": "ast", "t": { "Search for time zone": { "v": ["Buscar fusos horarios"] }, "Type to search time zone": { "v": ["Escribi pa buscar un fusu horariu"] } } }, { "l": "br", "t": {} }, { "l": "ca", "t": { "Type to search time zone": { "v": ["Escriviu per cercar la zona horària"] } } }, { "l": "cs", "t": { "Search for time zone": { "v": ["Vyhledat časové pásmo"] }, "Type to search time zone": { "v": ["Psaním vyhledejte časovou zónu"] } } }, { "l": "cs-CZ", "t": { "Search for time zone": { "v": ["Vyhledat časové pásmo"] }, "Type to search time zone": { "v": ["Psaním vyhledejte časovou zónu"] } } }, { "l": "da", "t": { "Search for time zone": { "v": ["Søg efter tidszone"] }, "Type to search time zone": { "v": ["Indtast for at søge efter tidszone"] } } }, { "l": "de", "t": { "Search for time zone": { "v": ["Nach Zeitzone suchen"] }, "Type to search time zone": { "v": ["Tippen, um eine Zeitzone zu suchen"] } } }, { "l": "de-DE", "t": { "Search for time zone": { "v": ["Nach Zeitzone suchen"] }, "Type to search time zone": { "v": ["Tippen, um eine Zeitzone zu suchen"] } } }, { "l": "el", "t": { "Search for time zone": { "v": ["Αναζήτηση ζώνης ώρας"] }, "Type to search time zone": { "v": ["Πληκτρολογήστε για αναζήτηση ζώνης ώρας"] } } }, { "l": "en-GB", "t": { "Search for time zone": { "v": ["Search for time zone"] }, "Type to search time zone": { "v": ["Type to search time zone"] } } }, { "l": "eo", "t": {} }, { "l": "es", "t": { "Search for time zone": { "v": ["Buscar huso horario"] }, "Type to search time zone": { "v": ["Escriba para buscar un huso horario"] } } }, { "l": "es-AR", "t": { "Search for time zone": { "v": ["Buscar zona horaria"] }, "Type to search time zone": { "v": ["Escriba para buscar la zona horaria"] } } }, { "l": "es-EC", "t": { "Type to search time zone": { "v": ["Escribe para buscar la zona horaria"] } } }, { "l": "es-MX", "t": { "Search for time zone": { "v": ["Buscar zona horaria"] }, "Type to search time zone": { "v": ["Escriba para buscar la zona horaria"] } } }, { "l": "et-EE", "t": { "Search for time zone": { "v": ["Otsi ajavööndit"] }, "Type to search time zone": { "v": ["Kirjuta, et otsida ajavööndit"] } } }, { "l": "eu", "t": { "Type to search time zone": { "v": ["Idatzi ordu-zona bat bilatzeko"] } } }, { "l": "fa", "t": { "Search for time zone": { "v": ["جستجو برای منطقهٔ زمانی"] }, "Type to search time zone": { "v": ["برای جستجوی منطقه زمانی تایپ کنید"] } } }, { "l": "fi", "t": { "Search for time zone": { "v": ["Etsi aikavyöhykettä"] }, "Type to search time zone": { "v": ["Kirjoita etsiäksesi aikavyöhykettä"] } } }, { "l": "fr", "t": { "Search for time zone": { "v": ["Rechercher le fuseau horaire"] }, "Type to search time zone": { "v": ["Saisissez les premiers lettres pour rechercher un fuseau horaire"] } } }, { "l": "ga", "t": { "Search for time zone": { "v": ["Cuardaigh crios ama"] }, "Type to search time zone": { "v": ["Clóscríobh chun crios ama a chuardach"] } } }, { "l": "gl", "t": { "Search for time zone": { "v": ["Buscar por fuso horario"] }, "Type to search time zone": { "v": ["Escriba para buscar o fuso horario"] } } }, { "l": "he", "t": { "Type to search time zone": { "v": ["יש להקליד כדי לחפש אזור זמן"] } } }, { "l": "hu", "t": { "Type to search time zone": { "v": ["Gépeljen az időzóna kereséséhez"] } } }, { "l": "id", "t": { "Search for time zone": { "v": ["Cari zona waktu"] }, "Type to search time zone": { "v": ["Ketik untuk mencari zona waktu"] } } }, { "l": "is", "t": { "Search for time zone": { "v": ["Leita að tímabelti"] }, "Type to search time zone": { "v": ["Skrifaðu til að leita að tímabelti"] } } }, { "l": "it", "t": { "Search for time zone": { "v": ["Ricerca del fuso orario"] }, "Type to search time zone": { "v": ["Digita per cercare un fuso orario"] } } }, { "l": "ja", "t": { "Search for time zone": { "v": ["タイムゾーンを検索"] }, "Type to search time zone": { "v": ["タイムゾーン検索のため入力してください"] } } }, { "l": "ja-JP", "t": { "Search for time zone": { "v": ["タイムゾーンを検索"] }, "Type to search time zone": { "v": ["タイムゾーン検索のため入力してください"] } } }, { "l": "ko", "t": { "Search for time zone": { "v": ["시간대 검색"] }, "Type to search time zone": { "v": ["입력하여 시간대를 검색"] } } }, { "l": "lt-LT", "t": {} }, { "l": "lv", "t": {} }, { "l": "mk", "t": { "Type to search time zone": { "v": ["Напишете за да пребарате временска зона"] } } }, { "l": "my", "t": { "Type to search time zone": { "v": ["ဒေသစံတော်ချိန်များ ရှာဖွေရန် စာရိုက်ပါ"] } } }, { "l": "nb", "t": { "Search for time zone": { "v": ["Søk etter tidssone"] }, "Type to search time zone": { "v": ["Tast for å søke etter tidssone"] } } }, { "l": "nl", "t": { "Search for time zone": { "v": ["Zoeken naar tijdzone"] }, "Type to search time zone": { "v": ["Type om een tijdzone te zoeken"] } } }, { "l": "oc", "t": {} }, { "l": "pl", "t": { "Search for time zone": { "v": ["Szukaj strefy czasowej"] }, "Type to search time zone": { "v": ["Wpisz, aby wyszukać strefę czasową"] } } }, { "l": "pt-BR", "t": { "Search for time zone": { "v": ["Pesquisar fuso horário"] }, "Type to search time zone": { "v": ["Digite para pesquisar o fuso horário "] } } }, { "l": "pt-PT", "t": { "Search for time zone": { "v": ["Pesquisar fuso horário"] }, "Type to search time zone": { "v": ["Digite para pesquisar o fuso horário "] } } }, { "l": "ro", "t": { "Search for time zone": { "v": ["Căutare zonă de timp"] }, "Type to search time zone": { "v": ["Tastați pentru a căuta fusul orar"] } } }, { "l": "ru", "t": { "Search for time zone": { "v": ["Поиск часового пояса"] }, "Type to search time zone": { "v": ["Введите для поиска часового пояса"] } } }, { "l": "sk", "t": { "Search for time zone": { "v": ["Vyhľadať časové pásmo"] }, "Type to search time zone": { "v": ["Začníte písať pre vyhľadávanie časovej zóny"] } } }, { "l": "sl", "t": { "Type to search time zone": { "v": ["Vpišite niz za iskanje časovnega pasu"] } } }, { "l": "sr", "t": { "Search for time zone": { "v": ["Претрага временске зоне"] }, "Type to search time zone": { "v": ["Куцајте да претражите временске зоне"] } } }, { "l": "sv", "t": { "Search for time zone": { "v": ["Sök efter tidszon"] }, "Type to search time zone": { "v": ["Skriv för att välja tidszon"] } } }, { "l": "tr", "t": { "Search for time zone": { "v": ["Saat dilimi ara"] }, "Type to search time zone": { "v": ["Saat dilimi aramak için yazmaya başlayın"] } } }, { "l": "uk", "t": { "Search for time zone": { "v": ["Шукати часові зони"] }, "Type to search time zone": { "v": ["Введіть для пошуку часовий пояс"] } } }, { "l": "uz", "t": { "Search for time zone": { "v": ["Vaqt mintaqasini qidiring"] }, "Type to search time zone": { "v": ["Vaqt mintaqasini qidirish uchun kiriting"] } } }, { "l": "zh-CN", "t": { "Search for time zone": { "v": ["搜索时区"] }, "Type to search time zone": { "v": ["打字以搜索时区"] } } }, { "l": "zh-HK", "t": { "Search for time zone": { "v": ["搜索時區"] }, "Type to search time zone": { "v": ["鍵入以搜索時區"] } } }, { "l": "zh-TW", "t": { "Type to search time zone": { "v": ["輸入以搜尋時區"] } } }];
const t46 = [{ "l": "ar", "t": {} }, { "l": "ast", "t": {} }, { "l": "br", "t": {} }, { "l": "ca", "t": {} }, { "l": "cs", "t": {} }, { "l": "cs-CZ", "t": {} }, { "l": "da", "t": {} }, { "l": "de", "t": {} }, { "l": "de-DE", "t": {} }, { "l": "el", "t": {} }, { "l": "en-GB", "t": {} }, { "l": "eo", "t": {} }, { "l": "es", "t": {} }, { "l": "es-AR", "t": {} }, { "l": "es-EC", "t": {} }, { "l": "es-MX", "t": {} }, { "l": "et-EE", "t": {} }, { "l": "eu", "t": {} }, { "l": "fa", "t": {} }, { "l": "fi", "t": {} }, { "l": "fr", "t": {} }, { "l": "ga", "t": {} }, { "l": "gl", "t": {} }, { "l": "he", "t": {} }, { "l": "hu", "t": {} }, { "l": "id", "t": {} }, { "l": "is", "t": {} }, { "l": "it", "t": {} }, { "l": "ja", "t": {} }, { "l": "ja-JP", "t": {} }, { "l": "ko", "t": {} }, { "l": "lt-LT", "t": {} }, { "l": "lv", "t": {} }, { "l": "mk", "t": {} }, { "l": "my", "t": {} }, { "l": "nb", "t": {} }, { "l": "nl", "t": {} }, { "l": "oc", "t": {} }, { "l": "pl", "t": {} }, { "l": "pt-BR", "t": {} }, { "l": "pt-PT", "t": {} }, { "l": "ro", "t": {} }, { "l": "ru", "t": {} }, { "l": "sk", "t": {} }, { "l": "sl", "t": {} }, { "l": "sr", "t": {} }, { "l": "sv", "t": {} }, { "l": "tr", "t": {} }, { "l": "uk", "t": {} }, { "l": "uz", "t": {} }, { "l": "zh-CN", "t": {} }, { "l": "zh-HK", "t": {} }, { "l": "zh-TW", "t": {} }];
const t47 = [{ "l": "ar", "t": { "Select provider": { "v": ["اختر مزود"] } } }, { "l": "ast", "t": { "Select provider": { "v": ["Seleicionar el fornidor"] } } }, { "l": "br", "t": {} }, { "l": "ca", "t": {} }, { "l": "cs", "t": { "Select provider": { "v": ["Vybrat poskytovatele"] } } }, { "l": "cs-CZ", "t": { "Select provider": { "v": ["Vybrat poskytovatele"] } } }, { "l": "da", "t": { "Select provider": { "v": ["Vælg udbyder"] } } }, { "l": "de", "t": { "Select provider": { "v": ["Anbieter auswählen"] } } }, { "l": "de-DE", "t": { "Select provider": { "v": ["Anbieter auswählen"] } } }, { "l": "el", "t": { "Select provider": { "v": ["Επιλογή παρόχου"] } } }, { "l": "en-GB", "t": { "Select provider": { "v": ["Select provider"] } } }, { "l": "eo", "t": {} }, { "l": "es", "t": { "Select provider": { "v": ["Seleccione proveedor"] } } }, { "l": "es-AR", "t": { "Select provider": { "v": ["Elija proveedor"] } } }, { "l": "es-EC", "t": { "Select provider": { "v": ["Seleccionar proveedor"] } } }, { "l": "es-MX", "t": { "Select provider": { "v": ["Seleccionar proveedor"] } } }, { "l": "et-EE", "t": { "Select provider": { "v": ["Vali teenuspakkuja"] } } }, { "l": "eu", "t": { "Select provider": { "v": ["Hautatu hornitzailea"] } } }, { "l": "fa", "t": { "Select provider": { "v": ["ارائه دهنده را انتخاب کنید"] } } }, { "l": "fi", "t": { "Select provider": { "v": ["Valitse tarjoaja"] } } }, { "l": "fr", "t": { "Select provider": { "v": ["Sélectionner un fournisseur"] } } }, { "l": "ga", "t": { "Select provider": { "v": ["Roghnaigh soláthraí"] } } }, { "l": "gl", "t": { "Select provider": { "v": ["Seleccionar provedor"] } } }, { "l": "he", "t": { "Select provider": { "v": ["בחירת ספק"] } } }, { "l": "hu", "t": {} }, { "l": "id", "t": { "Select provider": { "v": ["Pilih penyedia"] } } }, { "l": "is", "t": { "Select provider": { "v": ["Veldu þjónustuveitu"] } } }, { "l": "it", "t": { "Select provider": { "v": ["Selezionare il provider"] } } }, { "l": "ja", "t": { "Select provider": { "v": ["プロバイダーを選択"] } } }, { "l": "ja-JP", "t": { "Select provider": { "v": ["プロバイダーを選択"] } } }, { "l": "ko", "t": { "Select provider": { "v": ["제공자 선택"] } } }, { "l": "lt-LT", "t": {} }, { "l": "lv", "t": {} }, { "l": "mk", "t": {} }, { "l": "my", "t": {} }, { "l": "nb", "t": { "Select provider": { "v": ["Velg leverandør"] } } }, { "l": "nl", "t": { "Select provider": { "v": ["Selecteer provider"] } } }, { "l": "oc", "t": {} }, { "l": "pl", "t": { "Select provider": { "v": ["Wybierz dostawcę"] } } }, { "l": "pt-BR", "t": { "Select provider": { "v": ["Selecionar provedor"] } } }, { "l": "pt-PT", "t": { "Select provider": { "v": ["Selecionar fornecedor"] } } }, { "l": "ro", "t": { "Select provider": { "v": ["Selectați providerul"] } } }, { "l": "ru", "t": { "Select provider": { "v": ["Выбрать поставщика"] } } }, { "l": "sk", "t": { "Select provider": { "v": ["Vybrať poskytovateľa"] } } }, { "l": "sl", "t": {} }, { "l": "sr", "t": { "Select provider": { "v": ["Изаберите пружаоца"] } } }, { "l": "sv", "t": { "Select provider": { "v": ["Välj leverantör"] } } }, { "l": "tr", "t": { "Select provider": { "v": ["Sağlayıcı seçin"] } } }, { "l": "uk", "t": { "Select provider": { "v": ["Виберіть постачальника"] } } }, { "l": "uz", "t": { "Select provider": { "v": ["Provayderni tanlang"] } } }, { "l": "zh-CN", "t": { "Select provider": { "v": ["选择提供者"] } } }, { "l": "zh-HK", "t": { "Select provider": { "v": ["選擇提供者"] } } }, { "l": "zh-TW", "t": { "Select provider": { "v": ["選取提供者"] } } }];
const t48 = [{ "l": "ar", "t": { "Settings": { "v": ["الإعدادات"] } } }, { "l": "ast", "t": { "Settings": { "v": ["Configuración"] } } }, { "l": "br", "t": { "Settings": { "v": ["Arventennoù"] } } }, { "l": "ca", "t": { "Settings": { "v": ["Paràmetres"] } } }, { "l": "cs", "t": { "Settings": { "v": ["Nastavení"] } } }, { "l": "cs-CZ", "t": { "Settings": { "v": ["Nastavení"] } } }, { "l": "da", "t": { "Settings": { "v": ["Indstillinger"] } } }, { "l": "de", "t": { "Settings": { "v": ["Einstellungen"] } } }, { "l": "de-DE", "t": { "Settings": { "v": ["Einstellungen"] } } }, { "l": "el", "t": { "Settings": { "v": ["Ρυθμίσεις"] } } }, { "l": "en-GB", "t": { "Settings": { "v": ["Settings"] } } }, { "l": "eo", "t": { "Settings": { "v": ["Agordo"] } } }, { "l": "es", "t": { "Settings": { "v": ["Ajustes"] } } }, { "l": "es-AR", "t": { "Settings": { "v": ["Configuraciones"] } } }, { "l": "es-EC", "t": { "Settings": { "v": ["Configuraciones"] } } }, { "l": "es-MX", "t": { "Settings": { "v": ["Configuración"] } } }, { "l": "et-EE", "t": { "Settings": { "v": ["Seadistused"] } } }, { "l": "eu", "t": { "Settings": { "v": ["Ezarpenak"] } } }, { "l": "fa", "t": { "Settings": { "v": ["تنظیمات"] } } }, { "l": "fi", "t": { "Settings": { "v": ["Asetukset"] } } }, { "l": "fr", "t": { "Settings": { "v": ["Paramètres"] } } }, { "l": "ga", "t": { "Settings": { "v": ["Socruithe"] } } }, { "l": "gl", "t": { "Settings": { "v": ["Axustes"] } } }, { "l": "he", "t": { "Settings": { "v": ["הגדרות"] } } }, { "l": "hu", "t": { "Settings": { "v": ["Beállítások"] } } }, { "l": "id", "t": { "Settings": { "v": ["Pengaturan"] } } }, { "l": "is", "t": { "Settings": { "v": ["Stillingar"] } } }, { "l": "it", "t": { "Settings": { "v": ["Impostazioni"] } } }, { "l": "ja", "t": { "Settings": { "v": ["設定"] } } }, { "l": "ja-JP", "t": { "Settings": { "v": ["設定"] } } }, { "l": "ko", "t": { "Settings": { "v": ["선택"] } } }, { "l": "lt-LT", "t": { "Settings": { "v": ["Nustatymai"] } } }, { "l": "lv", "t": { "Settings": { "v": ["Iestatījumi"] } } }, { "l": "mk", "t": { "Settings": { "v": ["Параметри"] } } }, { "l": "my", "t": { "Settings": { "v": ["ချိန်ညှိချက်များ"] } } }, { "l": "nb", "t": { "Settings": { "v": ["Innstillinger"] } } }, { "l": "nl", "t": { "Settings": { "v": ["Instellingen"] } } }, { "l": "oc", "t": { "Settings": { "v": ["Paramètres"] } } }, { "l": "pl", "t": { "Settings": { "v": ["Ustawienia"] } } }, { "l": "pt-BR", "t": { "Settings": { "v": ["Configurações"] } } }, { "l": "pt-PT", "t": { "Settings": { "v": ["Definições"] } } }, { "l": "ro", "t": { "Settings": { "v": ["Setări"] } } }, { "l": "ru", "t": { "Settings": { "v": ["Параметры"] } } }, { "l": "sk", "t": { "Settings": { "v": ["Nastavenia"] } } }, { "l": "sl", "t": { "Settings": { "v": ["Nastavitve"] } } }, { "l": "sr", "t": { "Settings": { "v": ["Поставке"] } } }, { "l": "sv", "t": { "Settings": { "v": ["Inställningar"] } } }, { "l": "tr", "t": { "Settings": { "v": ["Ayarlar"] } } }, { "l": "uk", "t": { "Settings": { "v": ["Налаштування"] } } }, { "l": "uz", "t": { "Settings": { "v": ["Sozlamalar"] } } }, { "l": "zh-CN", "t": { "Settings": { "v": ["设置"] } } }, { "l": "zh-HK", "t": { "Settings": { "v": ["設定"] } } }, { "l": "zh-TW", "t": { "Settings": { "v": ["設定"] } } }];
const t50 = [{ "l": "ar", "t": { "Submit": { "v": ["إرسال"] } } }, { "l": "ast", "t": { "Submit": { "v": ["Unviar"] } } }, { "l": "br", "t": {} }, { "l": "ca", "t": { "Submit": { "v": ["Envia"] } } }, { "l": "cs", "t": { "Submit": { "v": ["Odeslat"] } } }, { "l": "cs-CZ", "t": { "Submit": { "v": ["Odeslat"] } } }, { "l": "da", "t": { "Submit": { "v": ["Send"] } } }, { "l": "de", "t": { "Submit": { "v": ["Einreichen"] } } }, { "l": "de-DE", "t": { "Submit": { "v": ["Einreichen"] } } }, { "l": "el", "t": { "Submit": { "v": ["Υποβολή"] } } }, { "l": "en-GB", "t": { "Submit": { "v": ["Submit"] } } }, { "l": "eo", "t": {} }, { "l": "es", "t": { "Submit": { "v": ["Enviar"] } } }, { "l": "es-AR", "t": { "Submit": { "v": ["Enviar"] } } }, { "l": "es-EC", "t": { "Submit": { "v": ["Enviar"] } } }, { "l": "es-MX", "t": { "Submit": { "v": ["Enviar"] } } }, { "l": "et-EE", "t": { "Submit": { "v": ["Saada"] } } }, { "l": "eu", "t": { "Submit": { "v": ["Bidali"] } } }, { "l": "fa", "t": { "Submit": { "v": ["ارسال"] } } }, { "l": "fi", "t": { "Submit": { "v": ["Lähetä"] } } }, { "l": "fr", "t": { "Submit": { "v": ["Valider"] } } }, { "l": "ga", "t": { "Submit": { "v": ["Cuir isteach"] } } }, { "l": "gl", "t": { "Submit": { "v": ["Enviar"] } } }, { "l": "he", "t": { "Submit": { "v": ["הגשה"] } } }, { "l": "hu", "t": { "Submit": { "v": ["Beküldés"] } } }, { "l": "id", "t": { "Submit": { "v": ["Kirimkan"] } } }, { "l": "is", "t": { "Submit": { "v": ["Senda inn"] } } }, { "l": "it", "t": { "Submit": { "v": ["Invia"] } } }, { "l": "ja", "t": { "Submit": { "v": ["提出"] } } }, { "l": "ja-JP", "t": { "Submit": { "v": ["提出"] } } }, { "l": "ko", "t": { "Submit": { "v": ["제출"] } } }, { "l": "lt-LT", "t": { "Submit": { "v": ["Pateikti"] } } }, { "l": "lv", "t": {} }, { "l": "mk", "t": { "Submit": { "v": ["Испрати"] } } }, { "l": "my", "t": { "Submit": { "v": ["တင်သွင်းရန်"] } } }, { "l": "nb", "t": { "Submit": { "v": ["Send"] } } }, { "l": "nl", "t": { "Submit": { "v": ["Verwerken"] } } }, { "l": "oc", "t": {} }, { "l": "pl", "t": { "Submit": { "v": ["Wyślij"] } } }, { "l": "pt-BR", "t": { "Submit": { "v": ["Enviar"] } } }, { "l": "pt-PT", "t": { "Submit": { "v": ["Submeter"] } } }, { "l": "ro", "t": { "Submit": { "v": ["Trimiteți"] } } }, { "l": "ru", "t": { "Submit": { "v": ["Утвердить"] } } }, { "l": "sk", "t": { "Submit": { "v": ["Odoslať"] } } }, { "l": "sl", "t": { "Submit": { "v": ["Pošlji"] } } }, { "l": "sr", "t": { "Submit": { "v": ["Поднеси"] } } }, { "l": "sv", "t": { "Submit": { "v": ["Skicka"] } } }, { "l": "tr", "t": { "Submit": { "v": ["Gönder"] } } }, { "l": "uk", "t": { "Submit": { "v": ["Надіслати"] } } }, { "l": "uz", "t": { "Submit": { "v": ["Yuborish"] } } }, { "l": "zh-CN", "t": { "Submit": { "v": ["提交"] } } }, { "l": "zh-HK", "t": { "Submit": { "v": ["提交"] } } }, { "l": "zh-TW", "t": { "Submit": { "v": ["遞交"] } } }];
const t51 = [{ "l": "ar", "t": { "Unable to search the group": { "v": ["تعذّر البحث في المجموعة"] } } }, { "l": "ast", "t": { "Unable to search the group": { "v": ["Nun ye posible buscar el grupu"] } } }, { "l": "br", "t": { "Unable to search the group": { "v": ["Dibosupl eo klask ar strollad"] } } }, { "l": "ca", "t": { "Unable to search the group": { "v": ["No es pot cercar el grup"] } } }, { "l": "cs", "t": { "Unable to search the group": { "v": ["Nedaří se hledat skupinu"] } } }, { "l": "cs-CZ", "t": { "Unable to search the group": { "v": ["Nedaří se hledat skupinu"] } } }, { "l": "da", "t": { "Unable to search the group": { "v": ["Kan ikke søge på denne gruppe"] } } }, { "l": "de", "t": { "Unable to search the group": { "v": ["Die Gruppe kann nicht durchsucht werden"] } } }, { "l": "de-DE", "t": { "Unable to search the group": { "v": ["Die Gruppe kann nicht durchsucht werden"] } } }, { "l": "el", "t": { "Unable to search the group": { "v": ["Δεν είναι δυνατή η αναζήτηση της ομάδας"] } } }, { "l": "en-GB", "t": { "Unable to search the group": { "v": ["Unable to search the group"] } } }, { "l": "eo", "t": { "Unable to search the group": { "v": ["Ne eblas serĉi en la grupo"] } } }, { "l": "es", "t": { "Unable to search the group": { "v": ["No es posible buscar en el grupo"] } } }, { "l": "es-AR", "t": { "Unable to search the group": { "v": ["No se puede buscar el grupo"] } } }, { "l": "es-EC", "t": { "Unable to search the group": { "v": ["No se puede buscar en el grupo"] } } }, { "l": "es-MX", "t": { "Unable to search the group": { "v": ["No fue posible buscar en el grupo"] } } }, { "l": "et-EE", "t": { "Unable to search the group": { "v": ["Gruppi ei ole võimalik otsida"] } } }, { "l": "eu", "t": { "Unable to search the group": { "v": ["Ezin izan da taldea bilatu"] } } }, { "l": "fa", "t": { "Unable to search the group": { "v": ["امکان جستجوی گروه وجود ندارد"] } } }, { "l": "fi", "t": { "Unable to search the group": { "v": ["Ryhmää ei voi hakea"] } } }, { "l": "fr", "t": { "Unable to search the group": { "v": ["Impossible de chercher le groupe"] } } }, { "l": "ga", "t": { "Unable to search the group": { "v": ["Ní féidir an grúpa a chuardach"] } } }, { "l": "gl", "t": { "Unable to search the group": { "v": ["Non foi posíbel buscar o grupo"] } } }, { "l": "he", "t": { "Unable to search the group": { "v": ["לא ניתן לחפש בקבוצה"] } } }, { "l": "hu", "t": { "Unable to search the group": { "v": ["A csoport nem kereshető"] } } }, { "l": "id", "t": { "Unable to search the group": { "v": ["Tidak dapat mencari dalam grup"] } } }, { "l": "is", "t": { "Unable to search the group": { "v": ["Get ekki leitað í hópnum"] } } }, { "l": "it", "t": { "Unable to search the group": { "v": ["Impossibile cercare il gruppo"] } } }, { "l": "ja", "t": { "Unable to search the group": { "v": ["グループを検索できません"] } } }, { "l": "ja-JP", "t": { "Unable to search the group": { "v": ["グループを検索できません"] } } }, { "l": "ko", "t": { "Unable to search the group": { "v": ["그룹을 검색할 수 없음"] } } }, { "l": "lt-LT", "t": { "Unable to search the group": { "v": ["Nepavyko atlikti paiešką grupėje"] } } }, { "l": "lv", "t": {} }, { "l": "mk", "t": { "Unable to search the group": { "v": ["Неможе да се принајде групата"] } } }, { "l": "my", "t": { "Unable to search the group": { "v": ["အဖွဲ့အား ရှာဖွေ၍ မရနိုင်ပါ"] } } }, { "l": "nb", "t": { "Unable to search the group": { "v": ["Kunne ikke søke i gruppen"] } } }, { "l": "nl", "t": { "Unable to search the group": { "v": ["Kan niet zoeken in de groep"] } } }, { "l": "oc", "t": {} }, { "l": "pl", "t": { "Unable to search the group": { "v": ["Nie można przeszukać grupy"] } } }, { "l": "pt-BR", "t": { "Unable to search the group": { "v": ["Não foi possível pesquisar o grupo"] } } }, { "l": "pt-PT", "t": { "Unable to search the group": { "v": ["Não é possível pesquisar o grupo"] } } }, { "l": "ro", "t": { "Unable to search the group": { "v": ["Imposibilitatea de a căuta în grup"] } } }, { "l": "ru", "t": { "Unable to search the group": { "v": ["Невозможно найти группу"] } } }, { "l": "sk", "t": { "Unable to search the group": { "v": ["Skupinu sa nepodarilo nájsť"] } } }, { "l": "sl", "t": { "Unable to search the group": { "v": ["Ni mogoče iskati po skupini"] } } }, { "l": "sr", "t": { "Unable to search the group": { "v": ["Група не може да се претражи"] } } }, { "l": "sv", "t": { "Unable to search the group": { "v": ["Kunde inte söka i gruppen"] } } }, { "l": "tr", "t": { "Unable to search the group": { "v": ["Grupta arama yapılamadı"] } } }, { "l": "uk", "t": { "Unable to search the group": { "v": ["Неможливо шукати в групі"] } } }, { "l": "uz", "t": { "Unable to search the group": { "v": ["Guruhni qidirish imkonsiz"] } } }, { "l": "zh-CN", "t": { "Unable to search the group": { "v": ["无法搜索分组"] } } }, { "l": "zh-HK", "t": { "Unable to search the group": { "v": ["無法搜尋群組"] } } }, { "l": "zh-TW", "t": { "Unable to search the group": { "v": ["無法搜尋群組"] } } }];
const t52 = [{ "l": "ar", "t": { "Undo changes": { "v": ["تراجَع عن التغييرات"] } } }, { "l": "ast", "t": { "Undo changes": { "v": ["Desfacer los cambeos"] } } }, { "l": "br", "t": {} }, { "l": "ca", "t": { "Undo changes": { "v": ["Desfés els canvis"] } } }, { "l": "cs", "t": { "Undo changes": { "v": ["Vzít změny zpět"] } } }, { "l": "cs-CZ", "t": { "Undo changes": { "v": ["Vzít změny zpět"] } } }, { "l": "da", "t": { "Undo changes": { "v": ["Fortryd ændringer"] } } }, { "l": "de", "t": { "Undo changes": { "v": ["Änderungen rückgängig machen"] } } }, { "l": "de-DE", "t": { "Undo changes": { "v": ["Änderungen rückgängig machen"] } } }, { "l": "el", "t": { "Undo changes": { "v": ["Αναίρεση Αλλαγών"] } } }, { "l": "en-GB", "t": { "Undo changes": { "v": ["Undo changes"] } } }, { "l": "eo", "t": {} }, { "l": "es", "t": { "Undo changes": { "v": ["Deshacer cambios"] } } }, { "l": "es-AR", "t": { "Undo changes": { "v": ["Deshacer cambios"] } } }, { "l": "es-EC", "t": { "Undo changes": { "v": ["Deshacer cambios"] } } }, { "l": "es-MX", "t": { "Undo changes": { "v": ["Deshacer cambios"] } } }, { "l": "et-EE", "t": { "Undo changes": { "v": ["Pööra muudatused tagasi"] } } }, { "l": "eu", "t": { "Undo changes": { "v": ["Aldaketak desegin"] } } }, { "l": "fa", "t": { "Undo changes": { "v": ["لغو تغییرات"] } } }, { "l": "fi", "t": { "Undo changes": { "v": ["Kumoa muutokset"] } } }, { "l": "fr", "t": { "Undo changes": { "v": ["Annuler les changements"] } } }, { "l": "ga", "t": { "Undo changes": { "v": ["Cealaigh athruithe"] } } }, { "l": "gl", "t": { "Undo changes": { "v": ["Desfacer os cambios"] } } }, { "l": "he", "t": { "Undo changes": { "v": ["ביטול שינויים"] } } }, { "l": "hu", "t": { "Undo changes": { "v": ["Változtatások visszavonása"] } } }, { "l": "id", "t": { "Undo changes": { "v": ["Urungkan perubahan"] } } }, { "l": "is", "t": { "Undo changes": { "v": ["Afturkalla breytingar"] } } }, { "l": "it", "t": { "Undo changes": { "v": ["Cancella i cambiamenti"] } } }, { "l": "ja", "t": { "Undo changes": { "v": ["変更を取り消し"] } } }, { "l": "ja-JP", "t": { "Undo changes": { "v": ["変更を取り消し"] } } }, { "l": "ko", "t": { "Undo changes": { "v": ["변경 되돌리기"] } } }, { "l": "lt-LT", "t": {} }, { "l": "lv", "t": {} }, { "l": "mk", "t": { "Undo changes": { "v": ["Врати ги промените"] } } }, { "l": "my", "t": {} }, { "l": "nb", "t": { "Undo changes": { "v": ["Tilbakestill endringer"] } } }, { "l": "nl", "t": { "Undo changes": { "v": ["Wijzigingen ongedaan maken"] } } }, { "l": "oc", "t": {} }, { "l": "pl", "t": { "Undo changes": { "v": ["Cofnij zmiany"] } } }, { "l": "pt-BR", "t": { "Undo changes": { "v": ["Desfazer modificações"] } } }, { "l": "pt-PT", "t": { "Undo changes": { "v": ["Anular alterações"] } } }, { "l": "ro", "t": { "Undo changes": { "v": ["Anularea modificărilor"] } } }, { "l": "ru", "t": { "Undo changes": { "v": ["Отменить изменения"] } } }, { "l": "sk", "t": { "Undo changes": { "v": ["Vrátiť zmeny"] } } }, { "l": "sl", "t": { "Undo changes": { "v": ["Razveljavi spremembe"] } } }, { "l": "sr", "t": { "Undo changes": { "v": ["Поништи измене"] } } }, { "l": "sv", "t": { "Undo changes": { "v": ["Ångra ändringar"] } } }, { "l": "tr", "t": { "Undo changes": { "v": ["Değişiklikleri geri al"] } } }, { "l": "uk", "t": { "Undo changes": { "v": ["Скасувати зміни"] } } }, { "l": "uz", "t": { "Undo changes": { "v": ["O'zgarishlarni bekor qilish"] } } }, { "l": "zh-CN", "t": { "Undo changes": { "v": ["撤销更改"] } } }, { "l": "zh-HK", "t": { "Undo changes": { "v": ["取消更改"] } } }, { "l": "zh-TW", "t": { "Undo changes": { "v": ["還原變更"] } } }];
const t53 = [{ "l": "ar", "t": { "User status: {status}": { "v": ["حالة المستخدِم: {status}"] } } }, { "l": "ast", "t": { "User status: {status}": { "v": ["Estáu del usuariu: {status}"] } } }, { "l": "br", "t": {} }, { "l": "ca", "t": {} }, { "l": "cs", "t": { "User status: {status}": { "v": ["Stav uživatele: {status}"] } } }, { "l": "cs-CZ", "t": { "User status: {status}": { "v": ["Stav uživatele: {status}"] } } }, { "l": "da", "t": { "User status: {status}": { "v": ["Brugerstatus: {status}"] } } }, { "l": "de", "t": { "User status: {status}": { "v": ["Benutzerstatus: {status}"] } } }, { "l": "de-DE", "t": { "User status: {status}": { "v": ["Benutzerstatus: {status}"] } } }, { "l": "el", "t": { "User status: {status}": { "v": ["Κατάσταση χρήστη: {status}"] } } }, { "l": "en-GB", "t": { "User status: {status}": { "v": ["User status: {status}"] } } }, { "l": "eo", "t": {} }, { "l": "es", "t": { "User status: {status}": { "v": ["Estatus del usuario: {status}"] } } }, { "l": "es-AR", "t": { "User status: {status}": { "v": ["Estado del usuario: {status}"] } } }, { "l": "es-EC", "t": {} }, { "l": "es-MX", "t": { "User status: {status}": { "v": ["Estado del usuario: {status}"] } } }, { "l": "et-EE", "t": { "User status: {status}": { "v": ["Kasutaja olek: {status}"] } } }, { "l": "eu", "t": {} }, { "l": "fa", "t": { "User status: {status}": { "v": ["وضعیت کاربر: {status}"] } } }, { "l": "fi", "t": { "User status: {status}": { "v": ["Käyttäjän tila: {status}"] } } }, { "l": "fr", "t": { "User status: {status}": { "v": ["Statut de l'utilisateur : {status}"] } } }, { "l": "ga", "t": { "User status: {status}": { "v": ["Stádas úsáideora: {status}"] } } }, { "l": "gl", "t": { "User status: {status}": { "v": ["Estado do usuario: {status}"] } } }, { "l": "he", "t": {} }, { "l": "hu", "t": {} }, { "l": "id", "t": { "User status: {status}": { "v": ["Status pengguna: {status}"] } } }, { "l": "is", "t": { "User status: {status}": { "v": ["Staða notanda: {status}"] } } }, { "l": "it", "t": { "User status: {status}": { "v": ["Stato dell'utente: {status}"] } } }, { "l": "ja", "t": { "User status: {status}": { "v": ["ユーザのステータス: {status}"] } } }, { "l": "ja-JP", "t": { "User status: {status}": { "v": ["ユーザのステータス: {status}"] } } }, { "l": "ko", "t": { "User status: {status}": { "v": ["사용자 상태: {status}"] } } }, { "l": "lt-LT", "t": {} }, { "l": "lv", "t": {} }, { "l": "mk", "t": {} }, { "l": "my", "t": {} }, { "l": "nb", "t": { "User status: {status}": { "v": ["Brukerstatus: {status}"] } } }, { "l": "nl", "t": { "User status: {status}": { "v": ["Gebruikers status: {status}"] } } }, { "l": "oc", "t": {} }, { "l": "pl", "t": { "User status: {status}": { "v": ["Status użytkownika: {status}"] } } }, { "l": "pt-BR", "t": { "User status: {status}": { "v": ["Status do usuário: {status}"] } } }, { "l": "pt-PT", "t": { "User status: {status}": { "v": ["Estado do utilizador: {status}"] } } }, { "l": "ro", "t": { "User status: {status}": { "v": ["Status utilizator: {status}"] } } }, { "l": "ru", "t": { "User status: {status}": { "v": ["Статус пользователя: {status}"] } } }, { "l": "sk", "t": { "User status: {status}": { "v": ["Stav užívateľa: {status}"] } } }, { "l": "sl", "t": {} }, { "l": "sr", "t": { "User status: {status}": { "v": ["Статус корисника: {status}"] } } }, { "l": "sv", "t": { "User status: {status}": { "v": ["Användarstatus: {status}"] } } }, { "l": "tr", "t": { "User status: {status}": { "v": ["Kullanıcı durumu: {status}"] } } }, { "l": "uk", "t": { "User status: {status}": { "v": ["Статус користувача: {status}"] } } }, { "l": "uz", "t": { "User status: {status}": { "v": ["Foydalanuvchi holati: {status}"] } } }, { "l": "zh-CN", "t": { "User status: {status}": { "v": ["用户状态：{status}"] } } }, { "l": "zh-HK", "t": { "User status: {status}": { "v": ["用戶狀態：{status}"] } } }, { "l": "zh-TW", "t": {} }];
function GenRandomId(length) {
  return Math.random().toString(36).replace(/[^a-z]+/g, "").slice(0, length || 5);
}
function bind(fn, thisArg) {
  return function wrap() {
    return fn.apply(thisArg, arguments);
  };
}
const { toString } = Object.prototype;
const { getPrototypeOf } = Object;
const { iterator, toStringTag } = Symbol;
const kindOf = /* @__PURE__ */ ((cache) => (thing) => {
  const str = toString.call(thing);
  return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null));
const kindOfTest = (type) => {
  type = type.toLowerCase();
  return (thing) => kindOf(thing) === type;
};
const typeOfTest = (type) => (thing) => typeof thing === type;
const { isArray } = Array;
const isUndefined = typeOfTest("undefined");
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && isFunction$1(val.constructor.isBuffer) && val.constructor.isBuffer(val);
}
const isArrayBuffer = kindOfTest("ArrayBuffer");
function isArrayBufferView(val) {
  let result;
  if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
    result = ArrayBuffer.isView(val);
  } else {
    result = val && val.buffer && isArrayBuffer(val.buffer);
  }
  return result;
}
const isString = typeOfTest("string");
const isFunction$1 = typeOfTest("function");
const isNumber = typeOfTest("number");
const isObject = (thing) => thing !== null && typeof thing === "object";
const isBoolean = (thing) => thing === true || thing === false;
const isPlainObject = (val) => {
  if (kindOf(val) !== "object") {
    return false;
  }
  const prototype2 = getPrototypeOf(val);
  return (prototype2 === null || prototype2 === Object.prototype || Object.getPrototypeOf(prototype2) === null) && !(toStringTag in val) && !(iterator in val);
};
const isEmptyObject = (val) => {
  if (!isObject(val) || isBuffer(val)) {
    return false;
  }
  try {
    return Object.keys(val).length === 0 && Object.getPrototypeOf(val) === Object.prototype;
  } catch (e) {
    return false;
  }
};
const isDate = kindOfTest("Date");
const isFile = kindOfTest("File");
const isBlob = kindOfTest("Blob");
const isFileList = kindOfTest("FileList");
const isStream = (val) => isObject(val) && isFunction$1(val.pipe);
const isFormData = (thing) => {
  let kind;
  return thing && (typeof FormData === "function" && thing instanceof FormData || isFunction$1(thing.append) && ((kind = kindOf(thing)) === "formdata" || // detect form-data instance
  kind === "object" && isFunction$1(thing.toString) && thing.toString() === "[object FormData]"));
};
const isURLSearchParams = kindOfTest("URLSearchParams");
const [isReadableStream, isRequest, isResponse, isHeaders] = ["ReadableStream", "Request", "Response", "Headers"].map(kindOfTest);
const trim = (str) => str.trim ? str.trim() : str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function forEach(obj, fn, { allOwnKeys = false } = {}) {
  if (obj === null || typeof obj === "undefined") {
    return;
  }
  let i;
  let l;
  if (typeof obj !== "object") {
    obj = [obj];
  }
  if (isArray(obj)) {
    for (i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    if (isBuffer(obj)) {
      return;
    }
    const keys = allOwnKeys ? Object.getOwnPropertyNames(obj) : Object.keys(obj);
    const len = keys.length;
    let key;
    for (i = 0; i < len; i++) {
      key = keys[i];
      fn.call(null, obj[key], key, obj);
    }
  }
}
function findKey(obj, key) {
  if (isBuffer(obj)) {
    return null;
  }
  key = key.toLowerCase();
  const keys = Object.keys(obj);
  let i = keys.length;
  let _key;
  while (i-- > 0) {
    _key = keys[i];
    if (key === _key.toLowerCase()) {
      return _key;
    }
  }
  return null;
}
const _global = (() => {
  if (typeof globalThis !== "undefined") return globalThis;
  return typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : global;
})();
const isContextDefined = (context) => !isUndefined(context) && context !== _global;
function merge() {
  const { caseless, skipUndefined } = isContextDefined(this) && this || {};
  const result = {};
  const assignValue = (val, key) => {
    const targetKey = caseless && findKey(result, key) || key;
    if (isPlainObject(result[targetKey]) && isPlainObject(val)) {
      result[targetKey] = merge(result[targetKey], val);
    } else if (isPlainObject(val)) {
      result[targetKey] = merge({}, val);
    } else if (isArray(val)) {
      result[targetKey] = val.slice();
    } else if (!skipUndefined || !isUndefined(val)) {
      result[targetKey] = val;
    }
  };
  for (let i = 0, l = arguments.length; i < l; i++) {
    arguments[i] && forEach(arguments[i], assignValue);
  }
  return result;
}
const extend = (a, b, thisArg, { allOwnKeys } = {}) => {
  forEach(b, (val, key) => {
    if (thisArg && isFunction$1(val)) {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  }, { allOwnKeys });
  return a;
};
const stripBOM = (content) => {
  if (content.charCodeAt(0) === 65279) {
    content = content.slice(1);
  }
  return content;
};
const inherits = (constructor, superConstructor, props, descriptors2) => {
  constructor.prototype = Object.create(superConstructor.prototype, descriptors2);
  constructor.prototype.constructor = constructor;
  Object.defineProperty(constructor, "super", {
    value: superConstructor.prototype
  });
  props && Object.assign(constructor.prototype, props);
};
const toFlatObject = (sourceObj, destObj, filter2, propFilter) => {
  let props;
  let i;
  let prop;
  const merged = {};
  destObj = destObj || {};
  if (sourceObj == null) return destObj;
  do {
    props = Object.getOwnPropertyNames(sourceObj);
    i = props.length;
    while (i-- > 0) {
      prop = props[i];
      if ((!propFilter || propFilter(prop, sourceObj, destObj)) && !merged[prop]) {
        destObj[prop] = sourceObj[prop];
        merged[prop] = true;
      }
    }
    sourceObj = filter2 !== false && getPrototypeOf(sourceObj);
  } while (sourceObj && (!filter2 || filter2(sourceObj, destObj)) && sourceObj !== Object.prototype);
  return destObj;
};
const endsWith = (str, searchString, position) => {
  str = String(str);
  if (position === void 0 || position > str.length) {
    position = str.length;
  }
  position -= searchString.length;
  const lastIndex = str.indexOf(searchString, position);
  return lastIndex !== -1 && lastIndex === position;
};
const toArray = (thing) => {
  if (!thing) return null;
  if (isArray(thing)) return thing;
  let i = thing.length;
  if (!isNumber(i)) return null;
  const arr = new Array(i);
  while (i-- > 0) {
    arr[i] = thing[i];
  }
  return arr;
};
const isTypedArray = /* @__PURE__ */ ((TypedArray) => {
  return (thing) => {
    return TypedArray && thing instanceof TypedArray;
  };
})(typeof Uint8Array !== "undefined" && getPrototypeOf(Uint8Array));
const forEachEntry = (obj, fn) => {
  const generator = obj && obj[iterator];
  const _iterator = generator.call(obj);
  let result;
  while ((result = _iterator.next()) && !result.done) {
    const pair = result.value;
    fn.call(obj, pair[0], pair[1]);
  }
};
const matchAll = (regExp, str) => {
  let matches;
  const arr = [];
  while ((matches = regExp.exec(str)) !== null) {
    arr.push(matches);
  }
  return arr;
};
const isHTMLForm = kindOfTest("HTMLFormElement");
const toCamelCase = (str) => {
  return str.toLowerCase().replace(
    /[-_\s]([a-z\d])(\w*)/g,
    function replacer(m, p1, p2) {
      return p1.toUpperCase() + p2;
    }
  );
};
const hasOwnProperty = (({ hasOwnProperty: hasOwnProperty2 }) => (obj, prop) => hasOwnProperty2.call(obj, prop))(Object.prototype);
const isRegExp = kindOfTest("RegExp");
const reduceDescriptors = (obj, reducer) => {
  const descriptors2 = Object.getOwnPropertyDescriptors(obj);
  const reducedDescriptors = {};
  forEach(descriptors2, (descriptor, name) => {
    let ret;
    if ((ret = reducer(descriptor, name, obj)) !== false) {
      reducedDescriptors[name] = ret || descriptor;
    }
  });
  Object.defineProperties(obj, reducedDescriptors);
};
const freezeMethods = (obj) => {
  reduceDescriptors(obj, (descriptor, name) => {
    if (isFunction$1(obj) && ["arguments", "caller", "callee"].indexOf(name) !== -1) {
      return false;
    }
    const value = obj[name];
    if (!isFunction$1(value)) return;
    descriptor.enumerable = false;
    if ("writable" in descriptor) {
      descriptor.writable = false;
      return;
    }
    if (!descriptor.set) {
      descriptor.set = () => {
        throw Error("Can not rewrite read-only method '" + name + "'");
      };
    }
  });
};
const toObjectSet = (arrayOrString, delimiter) => {
  const obj = {};
  const define = (arr) => {
    arr.forEach((value) => {
      obj[value] = true;
    });
  };
  isArray(arrayOrString) ? define(arrayOrString) : define(String(arrayOrString).split(delimiter));
  return obj;
};
const noop = () => {
};
const toFiniteNumber = (value, defaultValue) => {
  return value != null && Number.isFinite(value = +value) ? value : defaultValue;
};
function isSpecCompliantForm(thing) {
  return !!(thing && isFunction$1(thing.append) && thing[toStringTag] === "FormData" && thing[iterator]);
}
const toJSONObject = (obj) => {
  const stack = new Array(10);
  const visit = (source, i) => {
    if (isObject(source)) {
      if (stack.indexOf(source) >= 0) {
        return;
      }
      if (isBuffer(source)) {
        return source;
      }
      if (!("toJSON" in source)) {
        stack[i] = source;
        const target = isArray(source) ? [] : {};
        forEach(source, (value, key) => {
          const reducedValue = visit(value, i + 1);
          !isUndefined(reducedValue) && (target[key] = reducedValue);
        });
        stack[i] = void 0;
        return target;
      }
    }
    return source;
  };
  return visit(obj, 0);
};
const isAsyncFn = kindOfTest("AsyncFunction");
const isThenable = (thing) => thing && (isObject(thing) || isFunction$1(thing)) && isFunction$1(thing.then) && isFunction$1(thing.catch);
const _setImmediate = ((setImmediateSupported, postMessageSupported) => {
  if (setImmediateSupported) {
    return setImmediate;
  }
  return postMessageSupported ? ((token, callbacks) => {
    _global.addEventListener("message", ({ source, data }) => {
      if (source === _global && data === token) {
        callbacks.length && callbacks.shift()();
      }
    }, false);
    return (cb) => {
      callbacks.push(cb);
      _global.postMessage(token, "*");
    };
  })(`axios@${Math.random()}`, []) : (cb) => setTimeout(cb);
})(
  typeof setImmediate === "function",
  isFunction$1(_global.postMessage)
);
const asap = typeof queueMicrotask !== "undefined" ? queueMicrotask.bind(_global) : typeof process$1 !== "undefined" && process$1.nextTick || _setImmediate;
const isIterable = (thing) => thing != null && isFunction$1(thing[iterator]);
const utils$1 = {
  isArray,
  isArrayBuffer,
  isBuffer,
  isFormData,
  isArrayBufferView,
  isString,
  isNumber,
  isBoolean,
  isObject,
  isPlainObject,
  isEmptyObject,
  isReadableStream,
  isRequest,
  isResponse,
  isHeaders,
  isUndefined,
  isDate,
  isFile,
  isBlob,
  isRegExp,
  isFunction: isFunction$1,
  isStream,
  isURLSearchParams,
  isTypedArray,
  isFileList,
  forEach,
  merge,
  extend,
  trim,
  stripBOM,
  inherits,
  toFlatObject,
  kindOf,
  kindOfTest,
  endsWith,
  toArray,
  forEachEntry,
  matchAll,
  isHTMLForm,
  hasOwnProperty,
  hasOwnProp: hasOwnProperty,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors,
  freezeMethods,
  toObjectSet,
  toCamelCase,
  noop,
  toFiniteNumber,
  findKey,
  global: _global,
  isContextDefined,
  isSpecCompliantForm,
  toJSONObject,
  isAsyncFn,
  isThenable,
  setImmediate: _setImmediate,
  asap,
  isIterable
};
function AxiosError$1(message, code2, config, request, response) {
  Error.call(this);
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, this.constructor);
  } else {
    this.stack = new Error().stack;
  }
  this.message = message;
  this.name = "AxiosError";
  code2 && (this.code = code2);
  config && (this.config = config);
  request && (this.request = request);
  if (response) {
    this.response = response;
    this.status = response.status ? response.status : null;
  }
}
utils$1.inherits(AxiosError$1, Error, {
  toJSON: function toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: utils$1.toJSONObject(this.config),
      code: this.code,
      status: this.status
    };
  }
});
const prototype$1 = AxiosError$1.prototype;
const descriptors = {};
[
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED",
  "ERR_NOT_SUPPORT",
  "ERR_INVALID_URL"
  // eslint-disable-next-line func-names
].forEach((code2) => {
  descriptors[code2] = { value: code2 };
});
Object.defineProperties(AxiosError$1, descriptors);
Object.defineProperty(prototype$1, "isAxiosError", { value: true });
AxiosError$1.from = (error, code2, config, request, response, customProps) => {
  const axiosError = Object.create(prototype$1);
  utils$1.toFlatObject(error, axiosError, function filter2(obj) {
    return obj !== Error.prototype;
  }, (prop) => {
    return prop !== "isAxiosError";
  });
  const msg = error && error.message ? error.message : "Error";
  const errCode = code2 == null && error ? error.code : code2;
  AxiosError$1.call(axiosError, msg, errCode, config, request, response);
  if (error && axiosError.cause == null) {
    Object.defineProperty(axiosError, "cause", { value: error, configurable: true });
  }
  axiosError.name = error && error.name || "Error";
  customProps && Object.assign(axiosError, customProps);
  return axiosError;
};
const httpAdapter = null;
function isVisitable(thing) {
  return utils$1.isPlainObject(thing) || utils$1.isArray(thing);
}
function removeBrackets(key) {
  return utils$1.endsWith(key, "[]") ? key.slice(0, -2) : key;
}
function renderKey(path, key, dots) {
  if (!path) return key;
  return path.concat(key).map(function each(token, i) {
    token = removeBrackets(token);
    return !dots && i ? "[" + token + "]" : token;
  }).join(dots ? "." : "");
}
function isFlatArray(arr) {
  return utils$1.isArray(arr) && !arr.some(isVisitable);
}
const predicates = utils$1.toFlatObject(utils$1, {}, null, function filter(prop) {
  return /^is[A-Z]/.test(prop);
});
function toFormData$1(obj, formData, options) {
  if (!utils$1.isObject(obj)) {
    throw new TypeError("target must be an object");
  }
  formData = formData || new FormData();
  options = utils$1.toFlatObject(options, {
    metaTokens: true,
    dots: false,
    indexes: false
  }, false, function defined(option, source) {
    return !utils$1.isUndefined(source[option]);
  });
  const metaTokens = options.metaTokens;
  const visitor = options.visitor || defaultVisitor;
  const dots = options.dots;
  const indexes = options.indexes;
  const _Blob = options.Blob || typeof Blob !== "undefined" && Blob;
  const useBlob = _Blob && utils$1.isSpecCompliantForm(formData);
  if (!utils$1.isFunction(visitor)) {
    throw new TypeError("visitor must be a function");
  }
  function convertValue(value) {
    if (value === null) return "";
    if (utils$1.isDate(value)) {
      return value.toISOString();
    }
    if (utils$1.isBoolean(value)) {
      return value.toString();
    }
    if (!useBlob && utils$1.isBlob(value)) {
      throw new AxiosError$1("Blob is not supported. Use a Buffer instead.");
    }
    if (utils$1.isArrayBuffer(value) || utils$1.isTypedArray(value)) {
      return useBlob && typeof Blob === "function" ? new Blob([value]) : Buffer.from(value);
    }
    return value;
  }
  function defaultVisitor(value, key, path) {
    let arr = value;
    if (value && !path && typeof value === "object") {
      if (utils$1.endsWith(key, "{}")) {
        key = metaTokens ? key : key.slice(0, -2);
        value = JSON.stringify(value);
      } else if (utils$1.isArray(value) && isFlatArray(value) || (utils$1.isFileList(value) || utils$1.endsWith(key, "[]")) && (arr = utils$1.toArray(value))) {
        key = removeBrackets(key);
        arr.forEach(function each(el, index) {
          !(utils$1.isUndefined(el) || el === null) && formData.append(
            // eslint-disable-next-line no-nested-ternary
            indexes === true ? renderKey([key], index, dots) : indexes === null ? key : key + "[]",
            convertValue(el)
          );
        });
        return false;
      }
    }
    if (isVisitable(value)) {
      return true;
    }
    formData.append(renderKey(path, key, dots), convertValue(value));
    return false;
  }
  const stack = [];
  const exposedHelpers = Object.assign(predicates, {
    defaultVisitor,
    convertValue,
    isVisitable
  });
  function build(value, path) {
    if (utils$1.isUndefined(value)) return;
    if (stack.indexOf(value) !== -1) {
      throw Error("Circular reference detected in " + path.join("."));
    }
    stack.push(value);
    utils$1.forEach(value, function each(el, key) {
      const result = !(utils$1.isUndefined(el) || el === null) && visitor.call(
        formData,
        el,
        utils$1.isString(key) ? key.trim() : key,
        path,
        exposedHelpers
      );
      if (result === true) {
        build(el, path ? path.concat(key) : [key]);
      }
    });
    stack.pop();
  }
  if (!utils$1.isObject(obj)) {
    throw new TypeError("data must be an object");
  }
  build(obj);
  return formData;
}
function encode$1(str) {
  const charMap = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0"
  };
  return encodeURIComponent(str).replace(/[!'()~]|%20|%00/g, function replacer(match) {
    return charMap[match];
  });
}
function AxiosURLSearchParams(params, options) {
  this._pairs = [];
  params && toFormData$1(params, this, options);
}
const prototype = AxiosURLSearchParams.prototype;
prototype.append = function append(name, value) {
  this._pairs.push([name, value]);
};
prototype.toString = function toString2(encoder) {
  const _encode = encoder ? function(value) {
    return encoder.call(this, value, encode$1);
  } : encode$1;
  return this._pairs.map(function each(pair) {
    return _encode(pair[0]) + "=" + _encode(pair[1]);
  }, "").join("&");
};
function encode(val) {
  return encodeURIComponent(val).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+");
}
function buildURL(url, params, options) {
  if (!params) {
    return url;
  }
  const _encode = options && options.encode || encode;
  if (utils$1.isFunction(options)) {
    options = {
      serialize: options
    };
  }
  const serializeFn = options && options.serialize;
  let serializedParams;
  if (serializeFn) {
    serializedParams = serializeFn(params, options);
  } else {
    serializedParams = utils$1.isURLSearchParams(params) ? params.toString() : new AxiosURLSearchParams(params, options).toString(_encode);
  }
  if (serializedParams) {
    const hashmarkIndex = url.indexOf("#");
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }
    url += (url.indexOf("?") === -1 ? "?" : "&") + serializedParams;
  }
  return url;
}
class InterceptorManager {
  constructor() {
    this.handlers = [];
  }
  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */
  use(fulfilled, rejected, options) {
    this.handlers.push({
      fulfilled,
      rejected,
      synchronous: options ? options.synchronous : false,
      runWhen: options ? options.runWhen : null
    });
    return this.handlers.length - 1;
  }
  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   *
   * @returns {void}
   */
  eject(id) {
    if (this.handlers[id]) {
      this.handlers[id] = null;
    }
  }
  /**
   * Clear all interceptors from the stack
   *
   * @returns {void}
   */
  clear() {
    if (this.handlers) {
      this.handlers = [];
    }
  }
  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   *
   * @returns {void}
   */
  forEach(fn) {
    utils$1.forEach(this.handlers, function forEachHandler(h) {
      if (h !== null) {
        fn(h);
      }
    });
  }
}
const transitionalDefaults = {
  silentJSONParsing: true,
  forcedJSONParsing: true,
  clarifyTimeoutError: false
};
const URLSearchParams$1 = typeof URLSearchParams !== "undefined" ? URLSearchParams : AxiosURLSearchParams;
const FormData$1 = typeof FormData !== "undefined" ? FormData : null;
const Blob$1 = typeof Blob !== "undefined" ? Blob : null;
const platform$1 = {
  isBrowser: true,
  classes: {
    URLSearchParams: URLSearchParams$1,
    FormData: FormData$1,
    Blob: Blob$1
  },
  protocols: ["http", "https", "file", "blob", "url", "data"]
};
const hasBrowserEnv = typeof window !== "undefined" && typeof document !== "undefined";
const _navigator = typeof navigator === "object" && navigator || void 0;
const hasStandardBrowserEnv = hasBrowserEnv && (!_navigator || ["ReactNative", "NativeScript", "NS"].indexOf(_navigator.product) < 0);
const hasStandardBrowserWebWorkerEnv = (() => {
  return typeof WorkerGlobalScope !== "undefined" && // eslint-disable-next-line no-undef
  self instanceof WorkerGlobalScope && typeof self.importScripts === "function";
})();
const origin = hasBrowserEnv && window.location.href || "http://localhost";
const utils = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  hasBrowserEnv,
  hasStandardBrowserEnv,
  hasStandardBrowserWebWorkerEnv,
  navigator: _navigator,
  origin
}, Symbol.toStringTag, { value: "Module" }));
const platform = {
  ...utils,
  ...platform$1
};
function toURLEncodedForm(data, options) {
  return toFormData$1(data, new platform.classes.URLSearchParams(), {
    visitor: function(value, key, path, helpers) {
      if (platform.isNode && utils$1.isBuffer(value)) {
        this.append(key, value.toString("base64"));
        return false;
      }
      return helpers.defaultVisitor.apply(this, arguments);
    },
    ...options
  });
}
function parsePropPath(name) {
  return utils$1.matchAll(/\w+|\[(\w*)]/g, name).map((match) => {
    return match[0] === "[]" ? "" : match[1] || match[0];
  });
}
function arrayToObject(arr) {
  const obj = {};
  const keys = Object.keys(arr);
  let i;
  const len = keys.length;
  let key;
  for (i = 0; i < len; i++) {
    key = keys[i];
    obj[key] = arr[key];
  }
  return obj;
}
function formDataToJSON(formData) {
  function buildPath(path, value, target, index) {
    let name = path[index++];
    if (name === "__proto__") return true;
    const isNumericKey = Number.isFinite(+name);
    const isLast = index >= path.length;
    name = !name && utils$1.isArray(target) ? target.length : name;
    if (isLast) {
      if (utils$1.hasOwnProp(target, name)) {
        target[name] = [target[name], value];
      } else {
        target[name] = value;
      }
      return !isNumericKey;
    }
    if (!target[name] || !utils$1.isObject(target[name])) {
      target[name] = [];
    }
    const result = buildPath(path, value, target[name], index);
    if (result && utils$1.isArray(target[name])) {
      target[name] = arrayToObject(target[name]);
    }
    return !isNumericKey;
  }
  if (utils$1.isFormData(formData) && utils$1.isFunction(formData.entries)) {
    const obj = {};
    utils$1.forEachEntry(formData, (name, value) => {
      buildPath(parsePropPath(name), value, obj, 0);
    });
    return obj;
  }
  return null;
}
function stringifySafely(rawValue, parser, encoder) {
  if (utils$1.isString(rawValue)) {
    try {
      (parser || JSON.parse)(rawValue);
      return utils$1.trim(rawValue);
    } catch (e) {
      if (e.name !== "SyntaxError") {
        throw e;
      }
    }
  }
  return (encoder || JSON.stringify)(rawValue);
}
const defaults = {
  transitional: transitionalDefaults,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [function transformRequest(data, headers) {
    const contentType = headers.getContentType() || "";
    const hasJSONContentType = contentType.indexOf("application/json") > -1;
    const isObjectPayload = utils$1.isObject(data);
    if (isObjectPayload && utils$1.isHTMLForm(data)) {
      data = new FormData(data);
    }
    const isFormData2 = utils$1.isFormData(data);
    if (isFormData2) {
      return hasJSONContentType ? JSON.stringify(formDataToJSON(data)) : data;
    }
    if (utils$1.isArrayBuffer(data) || utils$1.isBuffer(data) || utils$1.isStream(data) || utils$1.isFile(data) || utils$1.isBlob(data) || utils$1.isReadableStream(data)) {
      return data;
    }
    if (utils$1.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils$1.isURLSearchParams(data)) {
      headers.setContentType("application/x-www-form-urlencoded;charset=utf-8", false);
      return data.toString();
    }
    let isFileList2;
    if (isObjectPayload) {
      if (contentType.indexOf("application/x-www-form-urlencoded") > -1) {
        return toURLEncodedForm(data, this.formSerializer).toString();
      }
      if ((isFileList2 = utils$1.isFileList(data)) || contentType.indexOf("multipart/form-data") > -1) {
        const _FormData = this.env && this.env.FormData;
        return toFormData$1(
          isFileList2 ? { "files[]": data } : data,
          _FormData && new _FormData(),
          this.formSerializer
        );
      }
    }
    if (isObjectPayload || hasJSONContentType) {
      headers.setContentType("application/json", false);
      return stringifySafely(data);
    }
    return data;
  }],
  transformResponse: [function transformResponse(data) {
    const transitional2 = this.transitional || defaults.transitional;
    const forcedJSONParsing = transitional2 && transitional2.forcedJSONParsing;
    const JSONRequested = this.responseType === "json";
    if (utils$1.isResponse(data) || utils$1.isReadableStream(data)) {
      return data;
    }
    if (data && utils$1.isString(data) && (forcedJSONParsing && !this.responseType || JSONRequested)) {
      const silentJSONParsing = transitional2 && transitional2.silentJSONParsing;
      const strictJSONParsing = !silentJSONParsing && JSONRequested;
      try {
        return JSON.parse(data, this.parseReviver);
      } catch (e) {
        if (strictJSONParsing) {
          if (e.name === "SyntaxError") {
            throw AxiosError$1.from(e, AxiosError$1.ERR_BAD_RESPONSE, this, null, this.response);
          }
          throw e;
        }
      }
    }
    return data;
  }],
  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: {
    FormData: platform.classes.FormData,
    Blob: platform.classes.Blob
  },
  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  },
  headers: {
    common: {
      "Accept": "application/json, text/plain, */*",
      "Content-Type": void 0
    }
  }
};
utils$1.forEach(["delete", "get", "head", "post", "put", "patch"], (method) => {
  defaults.headers[method] = {};
});
const ignoreDuplicateOf = utils$1.toObjectSet([
  "age",
  "authorization",
  "content-length",
  "content-type",
  "etag",
  "expires",
  "from",
  "host",
  "if-modified-since",
  "if-unmodified-since",
  "last-modified",
  "location",
  "max-forwards",
  "proxy-authorization",
  "referer",
  "retry-after",
  "user-agent"
]);
const parseHeaders = (rawHeaders) => {
  const parsed = {};
  let key;
  let val;
  let i;
  rawHeaders && rawHeaders.split("\n").forEach(function parser(line) {
    i = line.indexOf(":");
    key = line.substring(0, i).trim().toLowerCase();
    val = line.substring(i + 1).trim();
    if (!key || parsed[key] && ignoreDuplicateOf[key]) {
      return;
    }
    if (key === "set-cookie") {
      if (parsed[key]) {
        parsed[key].push(val);
      } else {
        parsed[key] = [val];
      }
    } else {
      parsed[key] = parsed[key] ? parsed[key] + ", " + val : val;
    }
  });
  return parsed;
};
const $internals = Symbol("internals");
function normalizeHeader(header) {
  return header && String(header).trim().toLowerCase();
}
function normalizeValue(value) {
  if (value === false || value == null) {
    return value;
  }
  return utils$1.isArray(value) ? value.map(normalizeValue) : String(value);
}
function parseTokens(str) {
  const tokens = /* @__PURE__ */ Object.create(null);
  const tokensRE = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let match;
  while (match = tokensRE.exec(str)) {
    tokens[match[1]] = match[2];
  }
  return tokens;
}
const isValidHeaderName = (str) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(str.trim());
function matchHeaderValue(context, value, header, filter2, isHeaderNameFilter) {
  if (utils$1.isFunction(filter2)) {
    return filter2.call(this, value, header);
  }
  if (isHeaderNameFilter) {
    value = header;
  }
  if (!utils$1.isString(value)) return;
  if (utils$1.isString(filter2)) {
    return value.indexOf(filter2) !== -1;
  }
  if (utils$1.isRegExp(filter2)) {
    return filter2.test(value);
  }
}
function formatHeader(header) {
  return header.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (w, char, str) => {
    return char.toUpperCase() + str;
  });
}
function buildAccessors(obj, header) {
  const accessorName = utils$1.toCamelCase(" " + header);
  ["get", "set", "has"].forEach((methodName) => {
    Object.defineProperty(obj, methodName + accessorName, {
      value: function(arg1, arg2, arg3) {
        return this[methodName].call(this, header, arg1, arg2, arg3);
      },
      configurable: true
    });
  });
}
let AxiosHeaders$1 = class AxiosHeaders {
  constructor(headers) {
    headers && this.set(headers);
  }
  set(header, valueOrRewrite, rewrite) {
    const self2 = this;
    function setHeader(_value, _header, _rewrite) {
      const lHeader = normalizeHeader(_header);
      if (!lHeader) {
        throw new Error("header name must be a non-empty string");
      }
      const key = utils$1.findKey(self2, lHeader);
      if (!key || self2[key] === void 0 || _rewrite === true || _rewrite === void 0 && self2[key] !== false) {
        self2[key || _header] = normalizeValue(_value);
      }
    }
    const setHeaders = (headers, _rewrite) => utils$1.forEach(headers, (_value, _header) => setHeader(_value, _header, _rewrite));
    if (utils$1.isPlainObject(header) || header instanceof this.constructor) {
      setHeaders(header, valueOrRewrite);
    } else if (utils$1.isString(header) && (header = header.trim()) && !isValidHeaderName(header)) {
      setHeaders(parseHeaders(header), valueOrRewrite);
    } else if (utils$1.isObject(header) && utils$1.isIterable(header)) {
      let obj = {}, dest, key;
      for (const entry of header) {
        if (!utils$1.isArray(entry)) {
          throw TypeError("Object iterator must return a key-value pair");
        }
        obj[key = entry[0]] = (dest = obj[key]) ? utils$1.isArray(dest) ? [...dest, entry[1]] : [dest, entry[1]] : entry[1];
      }
      setHeaders(obj, valueOrRewrite);
    } else {
      header != null && setHeader(valueOrRewrite, header, rewrite);
    }
    return this;
  }
  get(header, parser) {
    header = normalizeHeader(header);
    if (header) {
      const key = utils$1.findKey(this, header);
      if (key) {
        const value = this[key];
        if (!parser) {
          return value;
        }
        if (parser === true) {
          return parseTokens(value);
        }
        if (utils$1.isFunction(parser)) {
          return parser.call(this, value, key);
        }
        if (utils$1.isRegExp(parser)) {
          return parser.exec(value);
        }
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(header, matcher) {
    header = normalizeHeader(header);
    if (header) {
      const key = utils$1.findKey(this, header);
      return !!(key && this[key] !== void 0 && (!matcher || matchHeaderValue(this, this[key], key, matcher)));
    }
    return false;
  }
  delete(header, matcher) {
    const self2 = this;
    let deleted = false;
    function deleteHeader(_header) {
      _header = normalizeHeader(_header);
      if (_header) {
        const key = utils$1.findKey(self2, _header);
        if (key && (!matcher || matchHeaderValue(self2, self2[key], key, matcher))) {
          delete self2[key];
          deleted = true;
        }
      }
    }
    if (utils$1.isArray(header)) {
      header.forEach(deleteHeader);
    } else {
      deleteHeader(header);
    }
    return deleted;
  }
  clear(matcher) {
    const keys = Object.keys(this);
    let i = keys.length;
    let deleted = false;
    while (i--) {
      const key = keys[i];
      if (!matcher || matchHeaderValue(this, this[key], key, matcher, true)) {
        delete this[key];
        deleted = true;
      }
    }
    return deleted;
  }
  normalize(format) {
    const self2 = this;
    const headers = {};
    utils$1.forEach(this, (value, header) => {
      const key = utils$1.findKey(headers, header);
      if (key) {
        self2[key] = normalizeValue(value);
        delete self2[header];
        return;
      }
      const normalized = format ? formatHeader(header) : String(header).trim();
      if (normalized !== header) {
        delete self2[header];
      }
      self2[normalized] = normalizeValue(value);
      headers[normalized] = true;
    });
    return this;
  }
  concat(...targets) {
    return this.constructor.concat(this, ...targets);
  }
  toJSON(asStrings) {
    const obj = /* @__PURE__ */ Object.create(null);
    utils$1.forEach(this, (value, header) => {
      value != null && value !== false && (obj[header] = asStrings && utils$1.isArray(value) ? value.join(", ") : value);
    });
    return obj;
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([header, value]) => header + ": " + value).join("\n");
  }
  getSetCookie() {
    return this.get("set-cookie") || [];
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(thing) {
    return thing instanceof this ? thing : new this(thing);
  }
  static concat(first, ...targets) {
    const computed = new this(first);
    targets.forEach((target) => computed.set(target));
    return computed;
  }
  static accessor(header) {
    const internals = this[$internals] = this[$internals] = {
      accessors: {}
    };
    const accessors = internals.accessors;
    const prototype2 = this.prototype;
    function defineAccessor(_header) {
      const lHeader = normalizeHeader(_header);
      if (!accessors[lHeader]) {
        buildAccessors(prototype2, _header);
        accessors[lHeader] = true;
      }
    }
    utils$1.isArray(header) ? header.forEach(defineAccessor) : defineAccessor(header);
    return this;
  }
};
AxiosHeaders$1.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
utils$1.reduceDescriptors(AxiosHeaders$1.prototype, ({ value }, key) => {
  let mapped = key[0].toUpperCase() + key.slice(1);
  return {
    get: () => value,
    set(headerValue) {
      this[mapped] = headerValue;
    }
  };
});
utils$1.freezeMethods(AxiosHeaders$1);
function transformData(fns, response) {
  const config = this || defaults;
  const context = response || config;
  const headers = AxiosHeaders$1.from(context.headers);
  let data = context.data;
  utils$1.forEach(fns, function transform(fn) {
    data = fn.call(config, data, headers.normalize(), response ? response.status : void 0);
  });
  headers.normalize();
  return data;
}
function isCancel$1(value) {
  return !!(value && value.__CANCEL__);
}
function CanceledError$1(message, config, request) {
  AxiosError$1.call(this, message == null ? "canceled" : message, AxiosError$1.ERR_CANCELED, config, request);
  this.name = "CanceledError";
}
utils$1.inherits(CanceledError$1, AxiosError$1, {
  __CANCEL__: true
});
function settle(resolve, reject, response) {
  const validateStatus2 = response.config.validateStatus;
  if (!response.status || !validateStatus2 || validateStatus2(response.status)) {
    resolve(response);
  } else {
    reject(new AxiosError$1(
      "Request failed with status code " + response.status,
      [AxiosError$1.ERR_BAD_REQUEST, AxiosError$1.ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4],
      response.config,
      response.request,
      response
    ));
  }
}
function parseProtocol(url) {
  const match = /^([-+\w]{1,25})(:?\/\/|:)/.exec(url);
  return match && match[1] || "";
}
function speedometer(samplesCount, min) {
  samplesCount = samplesCount || 10;
  const bytes = new Array(samplesCount);
  const timestamps = new Array(samplesCount);
  let head = 0;
  let tail = 0;
  let firstSampleTS;
  min = min !== void 0 ? min : 1e3;
  return function push(chunkLength) {
    const now = Date.now();
    const startedAt = timestamps[tail];
    if (!firstSampleTS) {
      firstSampleTS = now;
    }
    bytes[head] = chunkLength;
    timestamps[head] = now;
    let i = tail;
    let bytesCount = 0;
    while (i !== head) {
      bytesCount += bytes[i++];
      i = i % samplesCount;
    }
    head = (head + 1) % samplesCount;
    if (head === tail) {
      tail = (tail + 1) % samplesCount;
    }
    if (now - firstSampleTS < min) {
      return;
    }
    const passed = startedAt && now - startedAt;
    return passed ? Math.round(bytesCount * 1e3 / passed) : void 0;
  };
}
function throttle(fn, freq) {
  let timestamp = 0;
  let threshold = 1e3 / freq;
  let lastArgs;
  let timer;
  const invoke = (args, now = Date.now()) => {
    timestamp = now;
    lastArgs = null;
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    fn(...args);
  };
  const throttled = (...args) => {
    const now = Date.now();
    const passed = now - timestamp;
    if (passed >= threshold) {
      invoke(args, now);
    } else {
      lastArgs = args;
      if (!timer) {
        timer = setTimeout(() => {
          timer = null;
          invoke(lastArgs);
        }, threshold - passed);
      }
    }
  };
  const flush = () => lastArgs && invoke(lastArgs);
  return [throttled, flush];
}
const progressEventReducer = (listener, isDownloadStream, freq = 3) => {
  let bytesNotified = 0;
  const _speedometer = speedometer(50, 250);
  return throttle((e) => {
    const loaded = e.loaded;
    const total = e.lengthComputable ? e.total : void 0;
    const progressBytes = loaded - bytesNotified;
    const rate = _speedometer(progressBytes);
    const inRange = loaded <= total;
    bytesNotified = loaded;
    const data = {
      loaded,
      total,
      progress: total ? loaded / total : void 0,
      bytes: progressBytes,
      rate: rate ? rate : void 0,
      estimated: rate && total && inRange ? (total - loaded) / rate : void 0,
      event: e,
      lengthComputable: total != null,
      [isDownloadStream ? "download" : "upload"]: true
    };
    listener(data);
  }, freq);
};
const progressEventDecorator = (total, throttled) => {
  const lengthComputable = total != null;
  return [(loaded) => throttled[0]({
    lengthComputable,
    total,
    loaded
  }), throttled[1]];
};
const asyncDecorator = (fn) => (...args) => utils$1.asap(() => fn(...args));
const isURLSameOrigin = platform.hasStandardBrowserEnv ? /* @__PURE__ */ ((origin2, isMSIE) => (url) => {
  url = new URL(url, platform.origin);
  return origin2.protocol === url.protocol && origin2.host === url.host && (isMSIE || origin2.port === url.port);
})(
  new URL(platform.origin),
  platform.navigator && /(msie|trident)/i.test(platform.navigator.userAgent)
) : () => true;
const cookies = platform.hasStandardBrowserEnv ? (
  // Standard browser envs support document.cookie
  {
    write(name, value, expires, path, domain, secure, sameSite) {
      if (typeof document === "undefined") return;
      const cookie = [`${name}=${encodeURIComponent(value)}`];
      if (utils$1.isNumber(expires)) {
        cookie.push(`expires=${new Date(expires).toUTCString()}`);
      }
      if (utils$1.isString(path)) {
        cookie.push(`path=${path}`);
      }
      if (utils$1.isString(domain)) {
        cookie.push(`domain=${domain}`);
      }
      if (secure === true) {
        cookie.push("secure");
      }
      if (utils$1.isString(sameSite)) {
        cookie.push(`SameSite=${sameSite}`);
      }
      document.cookie = cookie.join("; ");
    },
    read(name) {
      if (typeof document === "undefined") return null;
      const match = document.cookie.match(new RegExp("(?:^|; )" + name + "=([^;]*)"));
      return match ? decodeURIComponent(match[1]) : null;
    },
    remove(name) {
      this.write(name, "", Date.now() - 864e5, "/");
    }
  }
) : (
  // Non-standard browser env (web workers, react-native) lack needed support.
  {
    write() {
    },
    read() {
      return null;
    },
    remove() {
    }
  }
);
function isAbsoluteURL(url) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
}
function combineURLs(baseURL, relativeURL) {
  return relativeURL ? baseURL.replace(/\/?\/$/, "") + "/" + relativeURL.replace(/^\/+/, "") : baseURL;
}
function buildFullPath(baseURL, requestedURL, allowAbsoluteUrls) {
  let isRelativeUrl = !isAbsoluteURL(requestedURL);
  if (baseURL && (isRelativeUrl || allowAbsoluteUrls == false)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
}
const headersToObject = (thing) => thing instanceof AxiosHeaders$1 ? { ...thing } : thing;
function mergeConfig$1(config1, config2) {
  config2 = config2 || {};
  const config = {};
  function getMergedValue(target, source, prop, caseless) {
    if (utils$1.isPlainObject(target) && utils$1.isPlainObject(source)) {
      return utils$1.merge.call({ caseless }, target, source);
    } else if (utils$1.isPlainObject(source)) {
      return utils$1.merge({}, source);
    } else if (utils$1.isArray(source)) {
      return source.slice();
    }
    return source;
  }
  function mergeDeepProperties(a, b, prop, caseless) {
    if (!utils$1.isUndefined(b)) {
      return getMergedValue(a, b, prop, caseless);
    } else if (!utils$1.isUndefined(a)) {
      return getMergedValue(void 0, a, prop, caseless);
    }
  }
  function valueFromConfig2(a, b) {
    if (!utils$1.isUndefined(b)) {
      return getMergedValue(void 0, b);
    }
  }
  function defaultToConfig2(a, b) {
    if (!utils$1.isUndefined(b)) {
      return getMergedValue(void 0, b);
    } else if (!utils$1.isUndefined(a)) {
      return getMergedValue(void 0, a);
    }
  }
  function mergeDirectKeys(a, b, prop) {
    if (prop in config2) {
      return getMergedValue(a, b);
    } else if (prop in config1) {
      return getMergedValue(void 0, a);
    }
  }
  const mergeMap = {
    url: valueFromConfig2,
    method: valueFromConfig2,
    data: valueFromConfig2,
    baseURL: defaultToConfig2,
    transformRequest: defaultToConfig2,
    transformResponse: defaultToConfig2,
    paramsSerializer: defaultToConfig2,
    timeout: defaultToConfig2,
    timeoutMessage: defaultToConfig2,
    withCredentials: defaultToConfig2,
    withXSRFToken: defaultToConfig2,
    adapter: defaultToConfig2,
    responseType: defaultToConfig2,
    xsrfCookieName: defaultToConfig2,
    xsrfHeaderName: defaultToConfig2,
    onUploadProgress: defaultToConfig2,
    onDownloadProgress: defaultToConfig2,
    decompress: defaultToConfig2,
    maxContentLength: defaultToConfig2,
    maxBodyLength: defaultToConfig2,
    beforeRedirect: defaultToConfig2,
    transport: defaultToConfig2,
    httpAgent: defaultToConfig2,
    httpsAgent: defaultToConfig2,
    cancelToken: defaultToConfig2,
    socketPath: defaultToConfig2,
    responseEncoding: defaultToConfig2,
    validateStatus: mergeDirectKeys,
    headers: (a, b, prop) => mergeDeepProperties(headersToObject(a), headersToObject(b), prop, true)
  };
  utils$1.forEach(Object.keys({ ...config1, ...config2 }), function computeConfigValue(prop) {
    const merge2 = mergeMap[prop] || mergeDeepProperties;
    const configValue = merge2(config1[prop], config2[prop], prop);
    utils$1.isUndefined(configValue) && merge2 !== mergeDirectKeys || (config[prop] = configValue);
  });
  return config;
}
const resolveConfig = (config) => {
  const newConfig = mergeConfig$1({}, config);
  let { data, withXSRFToken, xsrfHeaderName, xsrfCookieName, headers, auth } = newConfig;
  newConfig.headers = headers = AxiosHeaders$1.from(headers);
  newConfig.url = buildURL(buildFullPath(newConfig.baseURL, newConfig.url, newConfig.allowAbsoluteUrls), config.params, config.paramsSerializer);
  if (auth) {
    headers.set(
      "Authorization",
      "Basic " + btoa((auth.username || "") + ":" + (auth.password ? unescape(encodeURIComponent(auth.password)) : ""))
    );
  }
  if (utils$1.isFormData(data)) {
    if (platform.hasStandardBrowserEnv || platform.hasStandardBrowserWebWorkerEnv) {
      headers.setContentType(void 0);
    } else if (utils$1.isFunction(data.getHeaders)) {
      const formHeaders = data.getHeaders();
      const allowedHeaders = ["content-type", "content-length"];
      Object.entries(formHeaders).forEach(([key, val]) => {
        if (allowedHeaders.includes(key.toLowerCase())) {
          headers.set(key, val);
        }
      });
    }
  }
  if (platform.hasStandardBrowserEnv) {
    withXSRFToken && utils$1.isFunction(withXSRFToken) && (withXSRFToken = withXSRFToken(newConfig));
    if (withXSRFToken || withXSRFToken !== false && isURLSameOrigin(newConfig.url)) {
      const xsrfValue = xsrfHeaderName && xsrfCookieName && cookies.read(xsrfCookieName);
      if (xsrfValue) {
        headers.set(xsrfHeaderName, xsrfValue);
      }
    }
  }
  return newConfig;
};
const isXHRAdapterSupported = typeof XMLHttpRequest !== "undefined";
const xhrAdapter = isXHRAdapterSupported && function(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    const _config = resolveConfig(config);
    let requestData = _config.data;
    const requestHeaders = AxiosHeaders$1.from(_config.headers).normalize();
    let { responseType, onUploadProgress, onDownloadProgress } = _config;
    let onCanceled;
    let uploadThrottled, downloadThrottled;
    let flushUpload, flushDownload;
    function done() {
      flushUpload && flushUpload();
      flushDownload && flushDownload();
      _config.cancelToken && _config.cancelToken.unsubscribe(onCanceled);
      _config.signal && _config.signal.removeEventListener("abort", onCanceled);
    }
    let request = new XMLHttpRequest();
    request.open(_config.method.toUpperCase(), _config.url, true);
    request.timeout = _config.timeout;
    function onloadend() {
      if (!request) {
        return;
      }
      const responseHeaders = AxiosHeaders$1.from(
        "getAllResponseHeaders" in request && request.getAllResponseHeaders()
      );
      const responseData = !responseType || responseType === "text" || responseType === "json" ? request.responseText : request.response;
      const response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      };
      settle(function _resolve(value) {
        resolve(value);
        done();
      }, function _reject(err) {
        reject(err);
        done();
      }, response);
      request = null;
    }
    if ("onloadend" in request) {
      request.onloadend = onloadend;
    } else {
      request.onreadystatechange = function handleLoad() {
        if (!request || request.readyState !== 4) {
          return;
        }
        if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf("file:") === 0)) {
          return;
        }
        setTimeout(onloadend);
      };
    }
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }
      reject(new AxiosError$1("Request aborted", AxiosError$1.ECONNABORTED, config, request));
      request = null;
    };
    request.onerror = function handleError(event) {
      const msg = event && event.message ? event.message : "Network Error";
      const err = new AxiosError$1(msg, AxiosError$1.ERR_NETWORK, config, request);
      err.event = event || null;
      reject(err);
      request = null;
    };
    request.ontimeout = function handleTimeout() {
      let timeoutErrorMessage = _config.timeout ? "timeout of " + _config.timeout + "ms exceeded" : "timeout exceeded";
      const transitional2 = _config.transitional || transitionalDefaults;
      if (_config.timeoutErrorMessage) {
        timeoutErrorMessage = _config.timeoutErrorMessage;
      }
      reject(new AxiosError$1(
        timeoutErrorMessage,
        transitional2.clarifyTimeoutError ? AxiosError$1.ETIMEDOUT : AxiosError$1.ECONNABORTED,
        config,
        request
      ));
      request = null;
    };
    requestData === void 0 && requestHeaders.setContentType(null);
    if ("setRequestHeader" in request) {
      utils$1.forEach(requestHeaders.toJSON(), function setRequestHeader(val, key) {
        request.setRequestHeader(key, val);
      });
    }
    if (!utils$1.isUndefined(_config.withCredentials)) {
      request.withCredentials = !!_config.withCredentials;
    }
    if (responseType && responseType !== "json") {
      request.responseType = _config.responseType;
    }
    if (onDownloadProgress) {
      [downloadThrottled, flushDownload] = progressEventReducer(onDownloadProgress, true);
      request.addEventListener("progress", downloadThrottled);
    }
    if (onUploadProgress && request.upload) {
      [uploadThrottled, flushUpload] = progressEventReducer(onUploadProgress);
      request.upload.addEventListener("progress", uploadThrottled);
      request.upload.addEventListener("loadend", flushUpload);
    }
    if (_config.cancelToken || _config.signal) {
      onCanceled = (cancel) => {
        if (!request) {
          return;
        }
        reject(!cancel || cancel.type ? new CanceledError$1(null, config, request) : cancel);
        request.abort();
        request = null;
      };
      _config.cancelToken && _config.cancelToken.subscribe(onCanceled);
      if (_config.signal) {
        _config.signal.aborted ? onCanceled() : _config.signal.addEventListener("abort", onCanceled);
      }
    }
    const protocol = parseProtocol(_config.url);
    if (protocol && platform.protocols.indexOf(protocol) === -1) {
      reject(new AxiosError$1("Unsupported protocol " + protocol + ":", AxiosError$1.ERR_BAD_REQUEST, config));
      return;
    }
    request.send(requestData || null);
  });
};
const composeSignals = (signals, timeout) => {
  const { length } = signals = signals ? signals.filter(Boolean) : [];
  if (timeout || length) {
    let controller = new AbortController();
    let aborted;
    const onabort = function(reason) {
      if (!aborted) {
        aborted = true;
        unsubscribe();
        const err = reason instanceof Error ? reason : this.reason;
        controller.abort(err instanceof AxiosError$1 ? err : new CanceledError$1(err instanceof Error ? err.message : err));
      }
    };
    let timer = timeout && setTimeout(() => {
      timer = null;
      onabort(new AxiosError$1(`timeout ${timeout} of ms exceeded`, AxiosError$1.ETIMEDOUT));
    }, timeout);
    const unsubscribe = () => {
      if (signals) {
        timer && clearTimeout(timer);
        timer = null;
        signals.forEach((signal2) => {
          signal2.unsubscribe ? signal2.unsubscribe(onabort) : signal2.removeEventListener("abort", onabort);
        });
        signals = null;
      }
    };
    signals.forEach((signal2) => signal2.addEventListener("abort", onabort));
    const { signal } = controller;
    signal.unsubscribe = () => utils$1.asap(unsubscribe);
    return signal;
  }
};
const streamChunk = function* (chunk, chunkSize) {
  let len = chunk.byteLength;
  if (len < chunkSize) {
    yield chunk;
    return;
  }
  let pos = 0;
  let end;
  while (pos < len) {
    end = pos + chunkSize;
    yield chunk.slice(pos, end);
    pos = end;
  }
};
const readBytes = async function* (iterable, chunkSize) {
  for await (const chunk of readStream(iterable)) {
    yield* streamChunk(chunk, chunkSize);
  }
};
const readStream = async function* (stream) {
  if (stream[Symbol.asyncIterator]) {
    yield* stream;
    return;
  }
  const reader = stream.getReader();
  try {
    for (; ; ) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      yield value;
    }
  } finally {
    await reader.cancel();
  }
};
const trackStream = (stream, chunkSize, onProgress, onFinish) => {
  const iterator2 = readBytes(stream, chunkSize);
  let bytes = 0;
  let done;
  let _onFinish = (e) => {
    if (!done) {
      done = true;
      onFinish && onFinish(e);
    }
  };
  return new ReadableStream({
    async pull(controller) {
      try {
        const { done: done2, value } = await iterator2.next();
        if (done2) {
          _onFinish();
          controller.close();
          return;
        }
        let len = value.byteLength;
        if (onProgress) {
          let loadedBytes = bytes += len;
          onProgress(loadedBytes);
        }
        controller.enqueue(new Uint8Array(value));
      } catch (err) {
        _onFinish(err);
        throw err;
      }
    },
    cancel(reason) {
      _onFinish(reason);
      return iterator2.return();
    }
  }, {
    highWaterMark: 2
  });
};
const DEFAULT_CHUNK_SIZE = 64 * 1024;
const { isFunction } = utils$1;
const globalFetchAPI = (({ Request, Response }) => ({
  Request,
  Response
}))(utils$1.global);
const {
  ReadableStream: ReadableStream$1,
  TextEncoder
} = utils$1.global;
const test = (fn, ...args) => {
  try {
    return !!fn(...args);
  } catch (e) {
    return false;
  }
};
const factory = (env) => {
  env = utils$1.merge.call({
    skipUndefined: true
  }, globalFetchAPI, env);
  const { fetch: envFetch, Request, Response } = env;
  const isFetchSupported = envFetch ? isFunction(envFetch) : typeof fetch === "function";
  const isRequestSupported = isFunction(Request);
  const isResponseSupported = isFunction(Response);
  if (!isFetchSupported) {
    return false;
  }
  const isReadableStreamSupported = isFetchSupported && isFunction(ReadableStream$1);
  const encodeText = isFetchSupported && (typeof TextEncoder === "function" ? /* @__PURE__ */ ((encoder) => (str) => encoder.encode(str))(new TextEncoder()) : async (str) => new Uint8Array(await new Request(str).arrayBuffer()));
  const supportsRequestStream = isRequestSupported && isReadableStreamSupported && test(() => {
    let duplexAccessed = false;
    const hasContentType = new Request(platform.origin, {
      body: new ReadableStream$1(),
      method: "POST",
      get duplex() {
        duplexAccessed = true;
        return "half";
      }
    }).headers.has("Content-Type");
    return duplexAccessed && !hasContentType;
  });
  const supportsResponseStream = isResponseSupported && isReadableStreamSupported && test(() => utils$1.isReadableStream(new Response("").body));
  const resolvers = {
    stream: supportsResponseStream && ((res) => res.body)
  };
  isFetchSupported && (() => {
    ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((type) => {
      !resolvers[type] && (resolvers[type] = (res, config) => {
        let method = res && res[type];
        if (method) {
          return method.call(res);
        }
        throw new AxiosError$1(`Response type '${type}' is not supported`, AxiosError$1.ERR_NOT_SUPPORT, config);
      });
    });
  })();
  const getBodyLength = async (body) => {
    if (body == null) {
      return 0;
    }
    if (utils$1.isBlob(body)) {
      return body.size;
    }
    if (utils$1.isSpecCompliantForm(body)) {
      const _request = new Request(platform.origin, {
        method: "POST",
        body
      });
      return (await _request.arrayBuffer()).byteLength;
    }
    if (utils$1.isArrayBufferView(body) || utils$1.isArrayBuffer(body)) {
      return body.byteLength;
    }
    if (utils$1.isURLSearchParams(body)) {
      body = body + "";
    }
    if (utils$1.isString(body)) {
      return (await encodeText(body)).byteLength;
    }
  };
  const resolveBodyLength = async (headers, body) => {
    const length = utils$1.toFiniteNumber(headers.getContentLength());
    return length == null ? getBodyLength(body) : length;
  };
  return async (config) => {
    let {
      url,
      method,
      data,
      signal,
      cancelToken,
      timeout,
      onDownloadProgress,
      onUploadProgress,
      responseType,
      headers,
      withCredentials = "same-origin",
      fetchOptions
    } = resolveConfig(config);
    let _fetch = envFetch || fetch;
    responseType = responseType ? (responseType + "").toLowerCase() : "text";
    let composedSignal = composeSignals([signal, cancelToken && cancelToken.toAbortSignal()], timeout);
    let request = null;
    const unsubscribe = composedSignal && composedSignal.unsubscribe && (() => {
      composedSignal.unsubscribe();
    });
    let requestContentLength;
    try {
      if (onUploadProgress && supportsRequestStream && method !== "get" && method !== "head" && (requestContentLength = await resolveBodyLength(headers, data)) !== 0) {
        let _request = new Request(url, {
          method: "POST",
          body: data,
          duplex: "half"
        });
        let contentTypeHeader;
        if (utils$1.isFormData(data) && (contentTypeHeader = _request.headers.get("content-type"))) {
          headers.setContentType(contentTypeHeader);
        }
        if (_request.body) {
          const [onProgress, flush] = progressEventDecorator(
            requestContentLength,
            progressEventReducer(asyncDecorator(onUploadProgress))
          );
          data = trackStream(_request.body, DEFAULT_CHUNK_SIZE, onProgress, flush);
        }
      }
      if (!utils$1.isString(withCredentials)) {
        withCredentials = withCredentials ? "include" : "omit";
      }
      const isCredentialsSupported = isRequestSupported && "credentials" in Request.prototype;
      const resolvedOptions = {
        ...fetchOptions,
        signal: composedSignal,
        method: method.toUpperCase(),
        headers: headers.normalize().toJSON(),
        body: data,
        duplex: "half",
        credentials: isCredentialsSupported ? withCredentials : void 0
      };
      request = isRequestSupported && new Request(url, resolvedOptions);
      let response = await (isRequestSupported ? _fetch(request, fetchOptions) : _fetch(url, resolvedOptions));
      const isStreamResponse = supportsResponseStream && (responseType === "stream" || responseType === "response");
      if (supportsResponseStream && (onDownloadProgress || isStreamResponse && unsubscribe)) {
        const options = {};
        ["status", "statusText", "headers"].forEach((prop) => {
          options[prop] = response[prop];
        });
        const responseContentLength = utils$1.toFiniteNumber(response.headers.get("content-length"));
        const [onProgress, flush] = onDownloadProgress && progressEventDecorator(
          responseContentLength,
          progressEventReducer(asyncDecorator(onDownloadProgress), true)
        ) || [];
        response = new Response(
          trackStream(response.body, DEFAULT_CHUNK_SIZE, onProgress, () => {
            flush && flush();
            unsubscribe && unsubscribe();
          }),
          options
        );
      }
      responseType = responseType || "text";
      let responseData = await resolvers[utils$1.findKey(resolvers, responseType) || "text"](response, config);
      !isStreamResponse && unsubscribe && unsubscribe();
      return await new Promise((resolve, reject) => {
        settle(resolve, reject, {
          data: responseData,
          headers: AxiosHeaders$1.from(response.headers),
          status: response.status,
          statusText: response.statusText,
          config,
          request
        });
      });
    } catch (err) {
      unsubscribe && unsubscribe();
      if (err && err.name === "TypeError" && /Load failed|fetch/i.test(err.message)) {
        throw Object.assign(
          new AxiosError$1("Network Error", AxiosError$1.ERR_NETWORK, config, request),
          {
            cause: err.cause || err
          }
        );
      }
      throw AxiosError$1.from(err, err && err.code, config, request);
    }
  };
};
const seedCache = /* @__PURE__ */ new Map();
const getFetch = (config) => {
  let env = config && config.env || {};
  const { fetch: fetch2, Request, Response } = env;
  const seeds = [
    Request,
    Response,
    fetch2
  ];
  let len = seeds.length, i = len, seed, target, map = seedCache;
  while (i--) {
    seed = seeds[i];
    target = map.get(seed);
    target === void 0 && map.set(seed, target = i ? /* @__PURE__ */ new Map() : factory(env));
    map = target;
  }
  return target;
};
getFetch();
const knownAdapters = {
  http: httpAdapter,
  xhr: xhrAdapter,
  fetch: {
    get: getFetch
  }
};
utils$1.forEach(knownAdapters, (fn, value) => {
  if (fn) {
    try {
      Object.defineProperty(fn, "name", { value });
    } catch (e) {
    }
    Object.defineProperty(fn, "adapterName", { value });
  }
});
const renderReason = (reason) => `- ${reason}`;
const isResolvedHandle = (adapter) => utils$1.isFunction(adapter) || adapter === null || adapter === false;
function getAdapter$1(adapters2, config) {
  adapters2 = utils$1.isArray(adapters2) ? adapters2 : [adapters2];
  const { length } = adapters2;
  let nameOrAdapter;
  let adapter;
  const rejectedReasons = {};
  for (let i = 0; i < length; i++) {
    nameOrAdapter = adapters2[i];
    let id;
    adapter = nameOrAdapter;
    if (!isResolvedHandle(nameOrAdapter)) {
      adapter = knownAdapters[(id = String(nameOrAdapter)).toLowerCase()];
      if (adapter === void 0) {
        throw new AxiosError$1(`Unknown adapter '${id}'`);
      }
    }
    if (adapter && (utils$1.isFunction(adapter) || (adapter = adapter.get(config)))) {
      break;
    }
    rejectedReasons[id || "#" + i] = adapter;
  }
  if (!adapter) {
    const reasons = Object.entries(rejectedReasons).map(
      ([id, state]) => `adapter ${id} ` + (state === false ? "is not supported by the environment" : "is not available in the build")
    );
    let s = length ? reasons.length > 1 ? "since :\n" + reasons.map(renderReason).join("\n") : " " + renderReason(reasons[0]) : "as no adapter specified";
    throw new AxiosError$1(
      `There is no suitable adapter to dispatch the request ` + s,
      "ERR_NOT_SUPPORT"
    );
  }
  return adapter;
}
const adapters = {
  /**
   * Resolve an adapter from a list of adapter names or functions.
   * @type {Function}
   */
  getAdapter: getAdapter$1,
  /**
   * Exposes all known adapters
   * @type {Object<string, Function|Object>}
   */
  adapters: knownAdapters
};
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
  if (config.signal && config.signal.aborted) {
    throw new CanceledError$1(null, config);
  }
}
function dispatchRequest(config) {
  throwIfCancellationRequested(config);
  config.headers = AxiosHeaders$1.from(config.headers);
  config.data = transformData.call(
    config,
    config.transformRequest
  );
  if (["post", "put", "patch"].indexOf(config.method) !== -1) {
    config.headers.setContentType("application/x-www-form-urlencoded", false);
  }
  const adapter = adapters.getAdapter(config.adapter || defaults.adapter, config);
  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);
    response.data = transformData.call(
      config,
      config.transformResponse,
      response
    );
    response.headers = AxiosHeaders$1.from(response.headers);
    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel$1(reason)) {
      throwIfCancellationRequested(config);
      if (reason && reason.response) {
        reason.response.data = transformData.call(
          config,
          config.transformResponse,
          reason.response
        );
        reason.response.headers = AxiosHeaders$1.from(reason.response.headers);
      }
    }
    return Promise.reject(reason);
  });
}
const VERSION$1 = "1.13.2";
const validators$1 = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((type, i) => {
  validators$1[type] = function validator2(thing) {
    return typeof thing === type || "a" + (i < 1 ? "n " : " ") + type;
  };
});
const deprecatedWarnings = {};
validators$1.transitional = function transitional(validator2, version, message) {
  function formatMessage(opt, desc) {
    return "[Axios v" + VERSION$1 + "] Transitional option '" + opt + "'" + desc + (message ? ". " + message : "");
  }
  return (value, opt, opts) => {
    if (validator2 === false) {
      throw new AxiosError$1(
        formatMessage(opt, " has been removed" + (version ? " in " + version : "")),
        AxiosError$1.ERR_DEPRECATED
      );
    }
    if (version && !deprecatedWarnings[opt]) {
      deprecatedWarnings[opt] = true;
      console.warn(
        formatMessage(
          opt,
          " has been deprecated since v" + version + " and will be removed in the near future"
        )
      );
    }
    return validator2 ? validator2(value, opt, opts) : true;
  };
};
validators$1.spelling = function spelling(correctSpelling) {
  return (value, opt) => {
    console.warn(`${opt} is likely a misspelling of ${correctSpelling}`);
    return true;
  };
};
function assertOptions(options, schema, allowUnknown) {
  if (typeof options !== "object") {
    throw new AxiosError$1("options must be an object", AxiosError$1.ERR_BAD_OPTION_VALUE);
  }
  const keys = Object.keys(options);
  let i = keys.length;
  while (i-- > 0) {
    const opt = keys[i];
    const validator2 = schema[opt];
    if (validator2) {
      const value = options[opt];
      const result = value === void 0 || validator2(value, opt, options);
      if (result !== true) {
        throw new AxiosError$1("option " + opt + " must be " + result, AxiosError$1.ERR_BAD_OPTION_VALUE);
      }
      continue;
    }
    if (allowUnknown !== true) {
      throw new AxiosError$1("Unknown option " + opt, AxiosError$1.ERR_BAD_OPTION);
    }
  }
}
const validator = {
  assertOptions,
  validators: validators$1
};
const validators = validator.validators;
let Axios$1 = class Axios {
  constructor(instanceConfig) {
    this.defaults = instanceConfig || {};
    this.interceptors = {
      request: new InterceptorManager(),
      response: new InterceptorManager()
    };
  }
  /**
   * Dispatch a request
   *
   * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
   * @param {?Object} config
   *
   * @returns {Promise} The Promise to be fulfilled
   */
  async request(configOrUrl, config) {
    try {
      return await this._request(configOrUrl, config);
    } catch (err) {
      if (err instanceof Error) {
        let dummy = {};
        Error.captureStackTrace ? Error.captureStackTrace(dummy) : dummy = new Error();
        const stack = dummy.stack ? dummy.stack.replace(/^.+\n/, "") : "";
        try {
          if (!err.stack) {
            err.stack = stack;
          } else if (stack && !String(err.stack).endsWith(stack.replace(/^.+\n.+\n/, ""))) {
            err.stack += "\n" + stack;
          }
        } catch (e) {
        }
      }
      throw err;
    }
  }
  _request(configOrUrl, config) {
    if (typeof configOrUrl === "string") {
      config = config || {};
      config.url = configOrUrl;
    } else {
      config = configOrUrl || {};
    }
    config = mergeConfig$1(this.defaults, config);
    const { transitional: transitional2, paramsSerializer, headers } = config;
    if (transitional2 !== void 0) {
      validator.assertOptions(transitional2, {
        silentJSONParsing: validators.transitional(validators.boolean),
        forcedJSONParsing: validators.transitional(validators.boolean),
        clarifyTimeoutError: validators.transitional(validators.boolean)
      }, false);
    }
    if (paramsSerializer != null) {
      if (utils$1.isFunction(paramsSerializer)) {
        config.paramsSerializer = {
          serialize: paramsSerializer
        };
      } else {
        validator.assertOptions(paramsSerializer, {
          encode: validators.function,
          serialize: validators.function
        }, true);
      }
    }
    if (config.allowAbsoluteUrls !== void 0) ;
    else if (this.defaults.allowAbsoluteUrls !== void 0) {
      config.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls;
    } else {
      config.allowAbsoluteUrls = true;
    }
    validator.assertOptions(config, {
      baseUrl: validators.spelling("baseURL"),
      withXsrfToken: validators.spelling("withXSRFToken")
    }, true);
    config.method = (config.method || this.defaults.method || "get").toLowerCase();
    let contextHeaders = headers && utils$1.merge(
      headers.common,
      headers[config.method]
    );
    headers && utils$1.forEach(
      ["delete", "get", "head", "post", "put", "patch", "common"],
      (method) => {
        delete headers[method];
      }
    );
    config.headers = AxiosHeaders$1.concat(contextHeaders, headers);
    const requestInterceptorChain = [];
    let synchronousRequestInterceptors = true;
    this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
      if (typeof interceptor.runWhen === "function" && interceptor.runWhen(config) === false) {
        return;
      }
      synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;
      requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
    });
    const responseInterceptorChain = [];
    this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
      responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
    });
    let promise;
    let i = 0;
    let len;
    if (!synchronousRequestInterceptors) {
      const chain = [dispatchRequest.bind(this), void 0];
      chain.unshift(...requestInterceptorChain);
      chain.push(...responseInterceptorChain);
      len = chain.length;
      promise = Promise.resolve(config);
      while (i < len) {
        promise = promise.then(chain[i++], chain[i++]);
      }
      return promise;
    }
    len = requestInterceptorChain.length;
    let newConfig = config;
    while (i < len) {
      const onFulfilled = requestInterceptorChain[i++];
      const onRejected = requestInterceptorChain[i++];
      try {
        newConfig = onFulfilled(newConfig);
      } catch (error) {
        onRejected.call(this, error);
        break;
      }
    }
    try {
      promise = dispatchRequest.call(this, newConfig);
    } catch (error) {
      return Promise.reject(error);
    }
    i = 0;
    len = responseInterceptorChain.length;
    while (i < len) {
      promise = promise.then(responseInterceptorChain[i++], responseInterceptorChain[i++]);
    }
    return promise;
  }
  getUri(config) {
    config = mergeConfig$1(this.defaults, config);
    const fullPath = buildFullPath(config.baseURL, config.url, config.allowAbsoluteUrls);
    return buildURL(fullPath, config.params, config.paramsSerializer);
  }
};
utils$1.forEach(["delete", "get", "head", "options"], function forEachMethodNoData(method) {
  Axios$1.prototype[method] = function(url, config) {
    return this.request(mergeConfig$1(config || {}, {
      method,
      url,
      data: (config || {}).data
    }));
  };
});
utils$1.forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
  function generateHTTPMethod(isForm) {
    return function httpMethod(url, data, config) {
      return this.request(mergeConfig$1(config || {}, {
        method,
        headers: isForm ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url,
        data
      }));
    };
  }
  Axios$1.prototype[method] = generateHTTPMethod();
  Axios$1.prototype[method + "Form"] = generateHTTPMethod(true);
});
let CancelToken$1 = class CancelToken {
  constructor(executor) {
    if (typeof executor !== "function") {
      throw new TypeError("executor must be a function.");
    }
    let resolvePromise;
    this.promise = new Promise(function promiseExecutor(resolve) {
      resolvePromise = resolve;
    });
    const token = this;
    this.promise.then((cancel) => {
      if (!token._listeners) return;
      let i = token._listeners.length;
      while (i-- > 0) {
        token._listeners[i](cancel);
      }
      token._listeners = null;
    });
    this.promise.then = (onfulfilled) => {
      let _resolve;
      const promise = new Promise((resolve) => {
        token.subscribe(resolve);
        _resolve = resolve;
      }).then(onfulfilled);
      promise.cancel = function reject() {
        token.unsubscribe(_resolve);
      };
      return promise;
    };
    executor(function cancel(message, config, request) {
      if (token.reason) {
        return;
      }
      token.reason = new CanceledError$1(message, config, request);
      resolvePromise(token.reason);
    });
  }
  /**
   * Throws a `CanceledError` if cancellation has been requested.
   */
  throwIfRequested() {
    if (this.reason) {
      throw this.reason;
    }
  }
  /**
   * Subscribe to the cancel signal
   */
  subscribe(listener) {
    if (this.reason) {
      listener(this.reason);
      return;
    }
    if (this._listeners) {
      this._listeners.push(listener);
    } else {
      this._listeners = [listener];
    }
  }
  /**
   * Unsubscribe from the cancel signal
   */
  unsubscribe(listener) {
    if (!this._listeners) {
      return;
    }
    const index = this._listeners.indexOf(listener);
    if (index !== -1) {
      this._listeners.splice(index, 1);
    }
  }
  toAbortSignal() {
    const controller = new AbortController();
    const abort = (err) => {
      controller.abort(err);
    };
    this.subscribe(abort);
    controller.signal.unsubscribe = () => this.unsubscribe(abort);
    return controller.signal;
  }
  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let cancel;
    const token = new CancelToken(function executor(c) {
      cancel = c;
    });
    return {
      token,
      cancel
    };
  }
};
function spread$1(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
}
function isAxiosError$1(payload) {
  return utils$1.isObject(payload) && payload.isAxiosError === true;
}
const HttpStatusCode$1 = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511,
  WebServerIsDown: 521,
  ConnectionTimedOut: 522,
  OriginIsUnreachable: 523,
  TimeoutOccurred: 524,
  SslHandshakeFailed: 525,
  InvalidSslCertificate: 526
};
Object.entries(HttpStatusCode$1).forEach(([key, value]) => {
  HttpStatusCode$1[value] = key;
});
function createInstance(defaultConfig) {
  const context = new Axios$1(defaultConfig);
  const instance = bind(Axios$1.prototype.request, context);
  utils$1.extend(instance, Axios$1.prototype, context, { allOwnKeys: true });
  utils$1.extend(instance, context, null, { allOwnKeys: true });
  instance.create = function create2(instanceConfig) {
    return createInstance(mergeConfig$1(defaultConfig, instanceConfig));
  };
  return instance;
}
const axios = createInstance(defaults);
axios.Axios = Axios$1;
axios.CanceledError = CanceledError$1;
axios.CancelToken = CancelToken$1;
axios.isCancel = isCancel$1;
axios.VERSION = VERSION$1;
axios.toFormData = toFormData$1;
axios.AxiosError = AxiosError$1;
axios.Cancel = axios.CanceledError;
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = spread$1;
axios.isAxiosError = isAxiosError$1;
axios.mergeConfig = mergeConfig$1;
axios.AxiosHeaders = AxiosHeaders$1;
axios.formToJSON = (thing) => formDataToJSON(utils$1.isHTMLForm(thing) ? new FormData(thing) : thing);
axios.getAdapter = adapters.getAdapter;
axios.HttpStatusCode = HttpStatusCode$1;
axios.default = axios;
const {
  Axios: Axios2,
  AxiosError,
  CanceledError,
  isCancel,
  CancelToken: CancelToken2,
  VERSION,
  all: all2,
  Cancel,
  isAxiosError,
  spread,
  toFormData,
  AxiosHeaders: AxiosHeaders2,
  HttpStatusCode,
  formToJSON,
  getAdapter,
  mergeConfig
} = axios;
/*!
 * SPDX-License-Identifier: GPL-3.0-or-later
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 */
const client = axios.create({
  headers: {
    requesttoken: getRequestToken() ?? "",
    "X-Requested-With": "XMLHttpRequest"
  }
});
onRequestTokenUpdate((token) => {
  client.defaults.headers.requesttoken = token;
});
const cancelableClient = Object.assign(client, {
  CancelToken: axios.CancelToken,
  isCancel: axios.isCancel
});
const RETRY_KEY = Symbol("csrf-retry");
function onCsrfTokenError(axios2) {
  return async (error) => {
    if (!isAxiosError(error)) {
      throw error;
    }
    const { config, response, request } = error;
    const responseURL = request?.responseURL;
    if (config && !config[RETRY_KEY] && response?.status === 412 && response?.data?.message === "CSRF check failed") {
      console.warn(`Request to ${responseURL} failed because of a CSRF mismatch. Fetching a new token`);
      const { data: { token } } = await axios2.get(generateUrl("/csrftoken"));
      console.debug(`New request token ${token} fetched`);
      axios2.defaults.headers.requesttoken = token;
      return axios2({
        ...config,
        headers: {
          ...config.headers,
          requesttoken: token
        },
        [RETRY_KEY]: true
      });
    }
    throw error;
  };
}
const RETRY_DELAY_KEY = Symbol("retryDelay");
function onMaintenanceModeError(axios2) {
  return async (error) => {
    if (!isAxiosError(error)) {
      throw error;
    }
    const { config, response, request } = error;
    const responseURL = request?.responseURL;
    const status = response?.status;
    const headers = response?.headers;
    let retryDelay = typeof config?.[RETRY_DELAY_KEY] === "number" ? config?.[RETRY_DELAY_KEY] : 1;
    if (status === 503 && headers?.["x-nextcloud-maintenance-mode"] === "1" && config?.retryIfMaintenanceMode) {
      retryDelay *= 2;
      if (retryDelay > 32) {
        console.error("Retry delay exceeded one minute, giving up.", { responseURL });
        throw error;
      }
      console.warn(`Request to ${responseURL} failed because of maintenance mode. Retrying in ${retryDelay}s`);
      await new Promise((resolve) => {
        setTimeout(resolve, retryDelay * 1e3);
      });
      return axios2({
        ...config,
        [RETRY_DELAY_KEY]: retryDelay
      });
    }
    throw error;
  };
}
async function onNotLoggedInError(error) {
  if (isAxiosError(error)) {
    const { config, response, request } = error;
    const responseURL = request?.responseURL;
    const status = response?.status;
    if (status === 401 && response?.data?.message === "Current user is not logged in" && config?.reloadExpiredSession && window?.location) {
      console.error(`Request to ${responseURL} failed because the user session expired. Reloading the page …`);
      window.location.reload();
    }
  }
  throw error;
}
cancelableClient.interceptors.response.use((r) => r, onCsrfTokenError(cancelableClient));
cancelableClient.interceptors.response.use((r) => r, onMaintenanceModeError(cancelableClient));
cancelableClient.interceptors.response.use((r) => r, onNotLoggedInError);
const _sfc_main = {
  name: "NcLoadingIcon",
  props: {
    /**
     * Specify the size of the loading icon.
     */
    size: {
      type: Number,
      default: 20
    },
    /**
     * The appearance of the loading icon.
     * 'auto' adjusts to the Nextcloud color scheme,
     * 'light' and 'dark' are static.
     */
    appearance: {
      type: String,
      validator(value) {
        return ["auto", "light", "dark"].includes(value);
      },
      default: "auto"
    },
    /**
     * Specify what is loading.
     */
    name: {
      type: String,
      default: ""
    }
  },
  computed: {
    colors() {
      const colors = ["#777", "#CCC"];
      if (this.appearance === "light") {
        return colors;
      } else if (this.appearance === "dark") {
        return colors.reverse();
      }
      return ["var(--color-loading-light)", "var(--color-loading-dark)"];
    }
  }
};
var _sfc_render = function render() {
  var _vm = this, _c = _vm._self._c;
  return _c("span", { staticClass: "material-design-icon loading-icon", attrs: { "aria-label": _vm.name, "role": "img" } }, [_c("svg", { attrs: { "width": _vm.size, "height": _vm.size, "viewBox": "0 0 24 24" } }, [_c("path", { attrs: { "fill": _vm.colors[0], "d": "M12,4V2A10,10 0 1,0 22,12H20A8,8 0 1,1 12,4Z" } }), _c("path", { attrs: { "fill": _vm.colors[1], "d": "M12,4V2A10,10 0 0,1 22,12H20A8,8 0 0,0 12,4Z" } }, [_vm.name ? _c("title", [_vm._v(_vm._s(_vm.name))]) : _vm._e()])])]);
};
var _sfc_staticRenderFns = [];
var __component__ = /* @__PURE__ */ normalizeComponent(
  _sfc_main,
  _sfc_render,
  _sfc_staticRenderFns,
  false,
  null,
  "94ff8098"
);
const NcLoadingIcon = __component__.exports;
export {
  t2 as $,
  t16 as A,
  Buffer as B,
  t23 as C,
  t8 as D,
  t47 as E,
  t41 as F,
  GenRandomId as G,
  t24 as H,
  t43 as I,
  t32 as J,
  t12 as K,
  t37 as L,
  t15 as M,
  NcLoadingIcon as N,
  t5 as O,
  t27 as P,
  t19 as Q,
  t13 as R,
  t20 as S,
  t22 as T,
  t44 as U,
  t48 as V,
  t14 as W,
  t28 as X,
  t6 as Y,
  t30 as Z,
  t35 as _,
  n as a,
  t45 as a0,
  t26 as a1,
  t40 as a2,
  t39 as a3,
  t42 as a4,
  t9 as a5,
  t34 as a6,
  t0 as a7,
  t46 as a8,
  t25 as a9,
  t51 as aa,
  t as b,
  cancelableClient as c,
  getCanonicalLocale as d,
  t4 as e,
  t36 as f,
  getLanguage as g,
  t18 as h,
  getGettextBuilder as i,
  t33 as j,
  translatePlural as k,
  escapeHtml as l,
  getLocale as m,
  normalizeComponent as n,
  t29 as o,
  purify as p,
  t52 as q,
  register as r,
  t17 as s,
  translate as t,
  t50 as u,
  t3 as v,
  t53 as w,
  t11 as x,
  t10 as y,
  t38 as z
};
//# sourceMappingURL=NcLoadingIcon-D2qSC7Ri.chunk.mjs.map
