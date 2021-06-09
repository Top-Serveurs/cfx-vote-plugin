/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 75);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

/*
 * Utils functions
 *
 */
var crypt = __webpack_require__(1);
/**
 * Break string str each maxLen symbols
 * @param str
 * @param maxLen
 * @returns {string}
 */


module.exports.linebrk = function (str, maxLen) {
  var res = '';
  var i = 0;

  while (i + maxLen < str.length) {
    res += str.substring(i, i + maxLen) + "\n";
    i += maxLen;
  }

  return res + str.substring(i, str.length);
};

module.exports.detectEnvironment = function () {
  if (typeof window !== 'undefined' && window && !(process && process.title === 'node')) {
    return 'browser';
  }

  return 'node';
};
/**
 * Trying get a 32-bit unsigned integer from the partial buffer
 * @param buffer
 * @param offset
 * @returns {Number}
 */


module.exports.get32IntFromBuffer = function (buffer, offset) {
  offset = offset || 0;
  var size = 0;

  if ((size = buffer.length - offset) > 0) {
    if (size >= 4) {
      return buffer.readUIntBE(offset, size);
    } else {
      var res = 0;

      for (var i = offset + size, d = 0; i > offset; i--, d += 2) {
        res += buffer[i - 1] * Math.pow(16, d);
      }

      return res;
    }
  } else {
    return NaN;
  }
};

module.exports._ = {
  isObject: function (value) {
    var type = typeof value;
    return !!value && (type == 'object' || type == 'function');
  },
  isString: function (value) {
    return typeof value == 'string' || value instanceof String;
  },
  isNumber: function (value) {
    return typeof value == 'number' || !isNaN(parseFloat(value)) && isFinite(value);
  },

  /**
   * Returns copy of `obj` without `removeProp` field.
   * @param obj
   * @param removeProp
   * @returns Object
   */
  omit: function (obj, removeProp) {
    var newObj = {};

    for (var prop in obj) {
      if (!obj.hasOwnProperty(prop) || prop === removeProp) {
        continue;
      }

      newObj[prop] = obj[prop];
    }

    return newObj;
  }
};
/**
 * Strips everything around the opening and closing lines, including the lines
 * themselves.
 */

module.exports.trimSurroundingText = function (data, opening, closing) {
  var trimStartIndex = 0;
  var trimEndIndex = data.length;
  var openingBoundaryIndex = data.indexOf(opening);

  if (openingBoundaryIndex >= 0) {
    trimStartIndex = openingBoundaryIndex + opening.length;
  }

  var closingBoundaryIndex = data.indexOf(closing, openingBoundaryIndex);

  if (closingBoundaryIndex >= 0) {
    trimEndIndex = closingBoundaryIndex;
  }

  return data.substring(trimStartIndex, trimEndIndex);
};

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("crypto");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/*
 * Basic JavaScript BN library - subset useful for RSA encryption.
 * 
 * Copyright (c) 2003-2005  Tom Wu
 * All Rights Reserved.
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS-IS" AND WITHOUT WARRANTY OF ANY KIND, 
 * EXPRESS, IMPLIED OR OTHERWISE, INCLUDING WITHOUT LIMITATION, ANY 
 * WARRANTY OF MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE.  
 *
 * IN NO EVENT SHALL TOM WU BE LIABLE FOR ANY SPECIAL, INCIDENTAL,
 * INDIRECT OR CONSEQUENTIAL DAMAGES OF ANY KIND, OR ANY DAMAGES WHATSOEVER
 * RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER OR NOT ADVISED OF
 * THE POSSIBILITY OF DAMAGE, AND ON ANY THEORY OF LIABILITY, ARISING OUT
 * OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * In addition, the following condition applies:
 *
 * All redistributions must retain an intact copy of this copyright notice
 * and disclaimer.
 */

/*
 * Added Node.js Buffers support
 * 2014 rzcoder
 */
var crypt = __webpack_require__(1);

var _ = __webpack_require__(0)._; // Bits per digit


var dbits; // JavaScript engine analysis

var canary = 0xdeadbeefcafe;
var j_lm = (canary & 0xffffff) == 0xefcafe; // (public) Constructor

function BigInteger(a, b) {
  if (a != null) {
    if ("number" == typeof a) {
      this.fromNumber(a, b);
    } else if (Buffer.isBuffer(a)) {
      this.fromBuffer(a);
    } else if (b == null && "string" != typeof a) {
      this.fromByteArray(a);
    } else {
      this.fromString(a, b);
    }
  }
} // return new, unset BigInteger


function nbi() {
  return new BigInteger(null);
} // am: Compute w_j += (x*this_i), propagate carries,
// c is initial carry, returns final carry.
// c < 3*dvalue, x < 2*dvalue, this_i < dvalue
// We need to select the fastest one that works in this environment.
// am1: use a single mult and divide to get the high bits,
// max digit bits should be 26 because
// max internal value = 2*dvalue^2-2*dvalue (< 2^53)


function am1(i, x, w, j, c, n) {
  while (--n >= 0) {
    var v = x * this[i++] + w[j] + c;
    c = Math.floor(v / 0x4000000);
    w[j++] = v & 0x3ffffff;
  }

  return c;
} // am2 avoids a big mult-and-extract completely.
// Max digit bits should be <= 30 because we do bitwise ops
// on values up to 2*hdvalue^2-hdvalue-1 (< 2^31)


function am2(i, x, w, j, c, n) {
  var xl = x & 0x7fff,
      xh = x >> 15;

  while (--n >= 0) {
    var l = this[i] & 0x7fff;
    var h = this[i++] >> 15;
    var m = xh * l + h * xl;
    l = xl * l + ((m & 0x7fff) << 15) + w[j] + (c & 0x3fffffff);
    c = (l >>> 30) + (m >>> 15) + xh * h + (c >>> 30);
    w[j++] = l & 0x3fffffff;
  }

  return c;
} // Alternately, set max digit bits to 28 since some
// browsers slow down when dealing with 32-bit numbers.


function am3(i, x, w, j, c, n) {
  var xl = x & 0x3fff,
      xh = x >> 14;

  while (--n >= 0) {
    var l = this[i] & 0x3fff;
    var h = this[i++] >> 14;
    var m = xh * l + h * xl;
    l = xl * l + ((m & 0x3fff) << 14) + w[j] + c;
    c = (l >> 28) + (m >> 14) + xh * h;
    w[j++] = l & 0xfffffff;
  }

  return c;
} // We need to select the fastest one that works in this environment. 
//if (j_lm && (navigator.appName == "Microsoft Internet Explorer")) {
//	BigInteger.prototype.am = am2;
//	dbits = 30;
//} else if (j_lm && (navigator.appName != "Netscape")) {
//	BigInteger.prototype.am = am1;
//	dbits = 26;
//} else { // Mozilla/Netscape seems to prefer am3
//	BigInteger.prototype.am = am3;
//	dbits = 28;
//}
// For node.js, we pick am3 with max dbits to 28.


BigInteger.prototype.am = am3;
dbits = 28;
BigInteger.prototype.DB = dbits;
BigInteger.prototype.DM = (1 << dbits) - 1;
BigInteger.prototype.DV = 1 << dbits;
var BI_FP = 52;
BigInteger.prototype.FV = Math.pow(2, BI_FP);
BigInteger.prototype.F1 = BI_FP - dbits;
BigInteger.prototype.F2 = 2 * dbits - BI_FP; // Digit conversions

var BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz";
var BI_RC = new Array();
var rr, vv;
rr = "0".charCodeAt(0);

for (vv = 0; vv <= 9; ++vv) BI_RC[rr++] = vv;

rr = "a".charCodeAt(0);

for (vv = 10; vv < 36; ++vv) BI_RC[rr++] = vv;

rr = "A".charCodeAt(0);

for (vv = 10; vv < 36; ++vv) BI_RC[rr++] = vv;

function int2char(n) {
  return BI_RM.charAt(n);
}

function intAt(s, i) {
  var c = BI_RC[s.charCodeAt(i)];
  return c == null ? -1 : c;
} // (protected) copy this to r


function bnpCopyTo(r) {
  for (var i = this.t - 1; i >= 0; --i) r[i] = this[i];

  r.t = this.t;
  r.s = this.s;
} // (protected) set from integer value x, -DV <= x < DV


function bnpFromInt(x) {
  this.t = 1;
  this.s = x < 0 ? -1 : 0;
  if (x > 0) this[0] = x;else if (x < -1) this[0] = x + DV;else this.t = 0;
} // return bigint initialized to value


function nbv(i) {
  var r = nbi();
  r.fromInt(i);
  return r;
} // (protected) set from string and radix


function bnpFromString(data, radix, unsigned) {
  var k;

  switch (radix) {
    case 2:
      k = 1;
      break;

    case 4:
      k = 2;
      break;

    case 8:
      k = 3;
      break;

    case 16:
      k = 4;
      break;

    case 32:
      k = 5;
      break;

    case 256:
      k = 8;
      break;

    default:
      this.fromRadix(data, radix);
      return;
  }

  this.t = 0;
  this.s = 0;
  var i = data.length;
  var mi = false;
  var sh = 0;

  while (--i >= 0) {
    var x = k == 8 ? data[i] & 0xff : intAt(data, i);

    if (x < 0) {
      if (data.charAt(i) == "-") mi = true;
      continue;
    }

    mi = false;
    if (sh === 0) this[this.t++] = x;else if (sh + k > this.DB) {
      this[this.t - 1] |= (x & (1 << this.DB - sh) - 1) << sh;
      this[this.t++] = x >> this.DB - sh;
    } else this[this.t - 1] |= x << sh;
    sh += k;
    if (sh >= this.DB) sh -= this.DB;
  }

  if (!unsigned && k == 8 && (data[0] & 0x80) != 0) {
    this.s = -1;
    if (sh > 0) this[this.t - 1] |= (1 << this.DB - sh) - 1 << sh;
  }

  this.clamp();
  if (mi) BigInteger.ZERO.subTo(this, this);
}

function bnpFromByteArray(a, unsigned) {
  this.fromString(a, 256, unsigned);
}

function bnpFromBuffer(a) {
  this.fromString(a, 256, true);
} // (protected) clamp off excess high words


function bnpClamp() {
  var c = this.s & this.DM;

  while (this.t > 0 && this[this.t - 1] == c) --this.t;
} // (public) return string representation in given radix


function bnToString(b) {
  if (this.s < 0) return "-" + this.negate().toString(b);
  var k;
  if (b == 16) k = 4;else if (b == 8) k = 3;else if (b == 2) k = 1;else if (b == 32) k = 5;else if (b == 4) k = 2;else return this.toRadix(b);
  var km = (1 << k) - 1,
      d,
      m = false,
      r = "",
      i = this.t;
  var p = this.DB - i * this.DB % k;

  if (i-- > 0) {
    if (p < this.DB && (d = this[i] >> p) > 0) {
      m = true;
      r = int2char(d);
    }

    while (i >= 0) {
      if (p < k) {
        d = (this[i] & (1 << p) - 1) << k - p;
        d |= this[--i] >> (p += this.DB - k);
      } else {
        d = this[i] >> (p -= k) & km;

        if (p <= 0) {
          p += this.DB;
          --i;
        }
      }

      if (d > 0) m = true;
      if (m) r += int2char(d);
    }
  }

  return m ? r : "0";
} // (public) -this


function bnNegate() {
  var r = nbi();
  BigInteger.ZERO.subTo(this, r);
  return r;
} // (public) |this|


function bnAbs() {
  return this.s < 0 ? this.negate() : this;
} // (public) return + if this > a, - if this < a, 0 if equal


function bnCompareTo(a) {
  var r = this.s - a.s;
  if (r != 0) return r;
  var i = this.t;
  r = i - a.t;
  if (r != 0) return this.s < 0 ? -r : r;

  while (--i >= 0) if ((r = this[i] - a[i]) != 0) return r;

  return 0;
} // returns bit length of the integer x


function nbits(x) {
  var r = 1,
      t;

  if ((t = x >>> 16) != 0) {
    x = t;
    r += 16;
  }

  if ((t = x >> 8) != 0) {
    x = t;
    r += 8;
  }

  if ((t = x >> 4) != 0) {
    x = t;
    r += 4;
  }

  if ((t = x >> 2) != 0) {
    x = t;
    r += 2;
  }

  if ((t = x >> 1) != 0) {
    x = t;
    r += 1;
  }

  return r;
} // (public) return the number of bits in "this"


function bnBitLength() {
  if (this.t <= 0) return 0;
  return this.DB * (this.t - 1) + nbits(this[this.t - 1] ^ this.s & this.DM);
} // (protected) r = this << n*DB


function bnpDLShiftTo(n, r) {
  var i;

  for (i = this.t - 1; i >= 0; --i) r[i + n] = this[i];

  for (i = n - 1; i >= 0; --i) r[i] = 0;

  r.t = this.t + n;
  r.s = this.s;
} // (protected) r = this >> n*DB


function bnpDRShiftTo(n, r) {
  for (var i = n; i < this.t; ++i) r[i - n] = this[i];

  r.t = Math.max(this.t - n, 0);
  r.s = this.s;
} // (protected) r = this << n


function bnpLShiftTo(n, r) {
  var bs = n % this.DB;
  var cbs = this.DB - bs;
  var bm = (1 << cbs) - 1;
  var ds = Math.floor(n / this.DB),
      c = this.s << bs & this.DM,
      i;

  for (i = this.t - 1; i >= 0; --i) {
    r[i + ds + 1] = this[i] >> cbs | c;
    c = (this[i] & bm) << bs;
  }

  for (i = ds - 1; i >= 0; --i) r[i] = 0;

  r[ds] = c;
  r.t = this.t + ds + 1;
  r.s = this.s;
  r.clamp();
} // (protected) r = this >> n


function bnpRShiftTo(n, r) {
  r.s = this.s;
  var ds = Math.floor(n / this.DB);

  if (ds >= this.t) {
    r.t = 0;
    return;
  }

  var bs = n % this.DB;
  var cbs = this.DB - bs;
  var bm = (1 << bs) - 1;
  r[0] = this[ds] >> bs;

  for (var i = ds + 1; i < this.t; ++i) {
    r[i - ds - 1] |= (this[i] & bm) << cbs;
    r[i - ds] = this[i] >> bs;
  }

  if (bs > 0) r[this.t - ds - 1] |= (this.s & bm) << cbs;
  r.t = this.t - ds;
  r.clamp();
} // (protected) r = this - a


function bnpSubTo(a, r) {
  var i = 0,
      c = 0,
      m = Math.min(a.t, this.t);

  while (i < m) {
    c += this[i] - a[i];
    r[i++] = c & this.DM;
    c >>= this.DB;
  }

  if (a.t < this.t) {
    c -= a.s;

    while (i < this.t) {
      c += this[i];
      r[i++] = c & this.DM;
      c >>= this.DB;
    }

    c += this.s;
  } else {
    c += this.s;

    while (i < a.t) {
      c -= a[i];
      r[i++] = c & this.DM;
      c >>= this.DB;
    }

    c -= a.s;
  }

  r.s = c < 0 ? -1 : 0;
  if (c < -1) r[i++] = this.DV + c;else if (c > 0) r[i++] = c;
  r.t = i;
  r.clamp();
} // (protected) r = this * a, r != this,a (HAC 14.12)
// "this" should be the larger one if appropriate.


function bnpMultiplyTo(a, r) {
  var x = this.abs(),
      y = a.abs();
  var i = x.t;
  r.t = i + y.t;

  while (--i >= 0) r[i] = 0;

  for (i = 0; i < y.t; ++i) r[i + x.t] = x.am(0, y[i], r, i, 0, x.t);

  r.s = 0;
  r.clamp();
  if (this.s != a.s) BigInteger.ZERO.subTo(r, r);
} // (protected) r = this^2, r != this (HAC 14.16)


function bnpSquareTo(r) {
  var x = this.abs();
  var i = r.t = 2 * x.t;

  while (--i >= 0) r[i] = 0;

  for (i = 0; i < x.t - 1; ++i) {
    var c = x.am(i, x[i], r, 2 * i, 0, 1);

    if ((r[i + x.t] += x.am(i + 1, 2 * x[i], r, 2 * i + 1, c, x.t - i - 1)) >= x.DV) {
      r[i + x.t] -= x.DV;
      r[i + x.t + 1] = 1;
    }
  }

  if (r.t > 0) r[r.t - 1] += x.am(i, x[i], r, 2 * i, 0, 1);
  r.s = 0;
  r.clamp();
} // (protected) divide this by m, quotient and remainder to q, r (HAC 14.20)
// r != q, this != m.  q or r may be null.


function bnpDivRemTo(m, q, r) {
  var pm = m.abs();
  if (pm.t <= 0) return;
  var pt = this.abs();

  if (pt.t < pm.t) {
    if (q != null) q.fromInt(0);
    if (r != null) this.copyTo(r);
    return;
  }

  if (r == null) r = nbi();
  var y = nbi(),
      ts = this.s,
      ms = m.s;
  var nsh = this.DB - nbits(pm[pm.t - 1]); // normalize modulus

  if (nsh > 0) {
    pm.lShiftTo(nsh, y);
    pt.lShiftTo(nsh, r);
  } else {
    pm.copyTo(y);
    pt.copyTo(r);
  }

  var ys = y.t;
  var y0 = y[ys - 1];
  if (y0 === 0) return;
  var yt = y0 * (1 << this.F1) + (ys > 1 ? y[ys - 2] >> this.F2 : 0);
  var d1 = this.FV / yt,
      d2 = (1 << this.F1) / yt,
      e = 1 << this.F2;
  var i = r.t,
      j = i - ys,
      t = q == null ? nbi() : q;
  y.dlShiftTo(j, t);

  if (r.compareTo(t) >= 0) {
    r[r.t++] = 1;
    r.subTo(t, r);
  }

  BigInteger.ONE.dlShiftTo(ys, t);
  t.subTo(y, y); // "negative" y so we can replace sub with am later

  while (y.t < ys) y[y.t++] = 0;

  while (--j >= 0) {
    // Estimate quotient digit
    var qd = r[--i] == y0 ? this.DM : Math.floor(r[i] * d1 + (r[i - 1] + e) * d2);

    if ((r[i] += y.am(0, qd, r, j, 0, ys)) < qd) {
      // Try it out
      y.dlShiftTo(j, t);
      r.subTo(t, r);

      while (r[i] < --qd) r.subTo(t, r);
    }
  }

  if (q != null) {
    r.drShiftTo(ys, q);
    if (ts != ms) BigInteger.ZERO.subTo(q, q);
  }

  r.t = ys;
  r.clamp();
  if (nsh > 0) r.rShiftTo(nsh, r); // Denormalize remainder

  if (ts < 0) BigInteger.ZERO.subTo(r, r);
} // (public) this mod a


function bnMod(a) {
  var r = nbi();
  this.abs().divRemTo(a, null, r);
  if (this.s < 0 && r.compareTo(BigInteger.ZERO) > 0) a.subTo(r, r);
  return r;
} // Modular reduction using "classic" algorithm


function Classic(m) {
  this.m = m;
}

function cConvert(x) {
  if (x.s < 0 || x.compareTo(this.m) >= 0) return x.mod(this.m);else return x;
}

function cRevert(x) {
  return x;
}

function cReduce(x) {
  x.divRemTo(this.m, null, x);
}

function cMulTo(x, y, r) {
  x.multiplyTo(y, r);
  this.reduce(r);
}

function cSqrTo(x, r) {
  x.squareTo(r);
  this.reduce(r);
}

Classic.prototype.convert = cConvert;
Classic.prototype.revert = cRevert;
Classic.prototype.reduce = cReduce;
Classic.prototype.mulTo = cMulTo;
Classic.prototype.sqrTo = cSqrTo; // (protected) return "-1/this % 2^DB"; useful for Mont. reduction
// justification:
//         xy == 1 (mod m)
//         xy =  1+km
//   xy(2-xy) = (1+km)(1-km)
// x[y(2-xy)] = 1-k^2m^2
// x[y(2-xy)] == 1 (mod m^2)
// if y is 1/x mod m, then y(2-xy) is 1/x mod m^2
// should reduce x and y(2-xy) by m^2 at each step to keep size bounded.
// JS multiply "overflows" differently from C/C++, so care is needed here.

function bnpInvDigit() {
  if (this.t < 1) return 0;
  var x = this[0];
  if ((x & 1) === 0) return 0;
  var y = x & 3; // y == 1/x mod 2^2

  y = y * (2 - (x & 0xf) * y) & 0xf; // y == 1/x mod 2^4

  y = y * (2 - (x & 0xff) * y) & 0xff; // y == 1/x mod 2^8

  y = y * (2 - ((x & 0xffff) * y & 0xffff)) & 0xffff; // y == 1/x mod 2^16
  // last step - calculate inverse mod DV directly;
  // assumes 16 < DB <= 32 and assumes ability to handle 48-bit ints

  y = y * (2 - x * y % this.DV) % this.DV; // y == 1/x mod 2^dbits
  // we really want the negative inverse, and -DV < y < DV

  return y > 0 ? this.DV - y : -y;
} // Montgomery reduction


function Montgomery(m) {
  this.m = m;
  this.mp = m.invDigit();
  this.mpl = this.mp & 0x7fff;
  this.mph = this.mp >> 15;
  this.um = (1 << m.DB - 15) - 1;
  this.mt2 = 2 * m.t;
} // xR mod m


function montConvert(x) {
  var r = nbi();
  x.abs().dlShiftTo(this.m.t, r);
  r.divRemTo(this.m, null, r);
  if (x.s < 0 && r.compareTo(BigInteger.ZERO) > 0) this.m.subTo(r, r);
  return r;
} // x/R mod m


function montRevert(x) {
  var r = nbi();
  x.copyTo(r);
  this.reduce(r);
  return r;
} // x = x/R mod m (HAC 14.32)


function montReduce(x) {
  while (x.t <= this.mt2) // pad x so am has enough room later
  x[x.t++] = 0;

  for (var i = 0; i < this.m.t; ++i) {
    // faster way of calculating u0 = x[i]*mp mod DV
    var j = x[i] & 0x7fff;
    var u0 = j * this.mpl + ((j * this.mph + (x[i] >> 15) * this.mpl & this.um) << 15) & x.DM; // use am to combine the multiply-shift-add into one call

    j = i + this.m.t;
    x[j] += this.m.am(0, u0, x, i, 0, this.m.t); // propagate carry

    while (x[j] >= x.DV) {
      x[j] -= x.DV;
      x[++j]++;
    }
  }

  x.clamp();
  x.drShiftTo(this.m.t, x);
  if (x.compareTo(this.m) >= 0) x.subTo(this.m, x);
} // r = "x^2/R mod m"; x != r


function montSqrTo(x, r) {
  x.squareTo(r);
  this.reduce(r);
} // r = "xy/R mod m"; x,y != r


function montMulTo(x, y, r) {
  x.multiplyTo(y, r);
  this.reduce(r);
}

Montgomery.prototype.convert = montConvert;
Montgomery.prototype.revert = montRevert;
Montgomery.prototype.reduce = montReduce;
Montgomery.prototype.mulTo = montMulTo;
Montgomery.prototype.sqrTo = montSqrTo; // (protected) true iff this is even

function bnpIsEven() {
  return (this.t > 0 ? this[0] & 1 : this.s) === 0;
} // (protected) this^e, e < 2^32, doing sqr and mul with "r" (HAC 14.79)


function bnpExp(e, z) {
  if (e > 0xffffffff || e < 1) return BigInteger.ONE;
  var r = nbi(),
      r2 = nbi(),
      g = z.convert(this),
      i = nbits(e) - 1;
  g.copyTo(r);

  while (--i >= 0) {
    z.sqrTo(r, r2);
    if ((e & 1 << i) > 0) z.mulTo(r2, g, r);else {
      var t = r;
      r = r2;
      r2 = t;
    }
  }

  return z.revert(r);
} // (public) this^e % m, 0 <= e < 2^32


function bnModPowInt(e, m) {
  var z;
  if (e < 256 || m.isEven()) z = new Classic(m);else z = new Montgomery(m);
  return this.exp(e, z);
} // Copyright (c) 2005-2009  Tom Wu
// All Rights Reserved.
// See "LICENSE" for details.
// Extended JavaScript BN functions, required for RSA private ops.
// Version 1.1: new BigInteger("0", 10) returns "proper" zero
// Version 1.2: square() API, isProbablePrime fix
//(public)


function bnClone() {
  var r = nbi();
  this.copyTo(r);
  return r;
} //(public) return value as integer


function bnIntValue() {
  if (this.s < 0) {
    if (this.t == 1) return this[0] - this.DV;else if (this.t === 0) return -1;
  } else if (this.t == 1) return this[0];else if (this.t === 0) return 0; // assumes 16 < DB < 32


  return (this[1] & (1 << 32 - this.DB) - 1) << this.DB | this[0];
} //(public) return value as byte


function bnByteValue() {
  return this.t == 0 ? this.s : this[0] << 24 >> 24;
} //(public) return value as short (assumes DB>=16)


function bnShortValue() {
  return this.t == 0 ? this.s : this[0] << 16 >> 16;
} //(protected) return x s.t. r^x < DV


function bnpChunkSize(r) {
  return Math.floor(Math.LN2 * this.DB / Math.log(r));
} //(public) 0 if this === 0, 1 if this > 0


function bnSigNum() {
  if (this.s < 0) return -1;else if (this.t <= 0 || this.t == 1 && this[0] <= 0) return 0;else return 1;
} //(protected) convert to radix string


function bnpToRadix(b) {
  if (b == null) b = 10;
  if (this.signum() === 0 || b < 2 || b > 36) return "0";
  var cs = this.chunkSize(b);
  var a = Math.pow(b, cs);
  var d = nbv(a),
      y = nbi(),
      z = nbi(),
      r = "";
  this.divRemTo(d, y, z);

  while (y.signum() > 0) {
    r = (a + z.intValue()).toString(b).substr(1) + r;
    y.divRemTo(d, y, z);
  }

  return z.intValue().toString(b) + r;
} //(protected) convert from radix string


function bnpFromRadix(s, b) {
  this.fromInt(0);
  if (b == null) b = 10;
  var cs = this.chunkSize(b);
  var d = Math.pow(b, cs),
      mi = false,
      j = 0,
      w = 0;

  for (var i = 0; i < s.length; ++i) {
    var x = intAt(s, i);

    if (x < 0) {
      if (s.charAt(i) == "-" && this.signum() === 0) mi = true;
      continue;
    }

    w = b * w + x;

    if (++j >= cs) {
      this.dMultiply(d);
      this.dAddOffset(w, 0);
      j = 0;
      w = 0;
    }
  }

  if (j > 0) {
    this.dMultiply(Math.pow(b, j));
    this.dAddOffset(w, 0);
  }

  if (mi) BigInteger.ZERO.subTo(this, this);
} //(protected) alternate constructor


function bnpFromNumber(a, b) {
  if ("number" == typeof b) {
    // new BigInteger(int,int,RNG)
    if (a < 2) this.fromInt(1);else {
      this.fromNumber(a);
      if (!this.testBit(a - 1)) // force MSB set
        this.bitwiseTo(BigInteger.ONE.shiftLeft(a - 1), op_or, this);
      if (this.isEven()) this.dAddOffset(1, 0); // force odd

      while (!this.isProbablePrime(b)) {
        this.dAddOffset(2, 0);
        if (this.bitLength() > a) this.subTo(BigInteger.ONE.shiftLeft(a - 1), this);
      }
    }
  } else {
    // new BigInteger(int,RNG)
    var x = crypt.randomBytes((a >> 3) + 1);
    var t = a & 7;
    if (t > 0) x[0] &= (1 << t) - 1;else x[0] = 0;
    this.fromByteArray(x);
  }
} //(public) convert to bigendian byte array


function bnToByteArray() {
  var i = this.t,
      r = new Array();
  r[0] = this.s;
  var p = this.DB - i * this.DB % 8,
      d,
      k = 0;

  if (i-- > 0) {
    if (p < this.DB && (d = this[i] >> p) != (this.s & this.DM) >> p) r[k++] = d | this.s << this.DB - p;

    while (i >= 0) {
      if (p < 8) {
        d = (this[i] & (1 << p) - 1) << 8 - p;
        d |= this[--i] >> (p += this.DB - 8);
      } else {
        d = this[i] >> (p -= 8) & 0xff;

        if (p <= 0) {
          p += this.DB;
          --i;
        }
      }

      if ((d & 0x80) != 0) d |= -256;
      if (k === 0 && (this.s & 0x80) != (d & 0x80)) ++k;
      if (k > 0 || d != this.s) r[k++] = d;
    }
  }

  return r;
}
/**
 * return Buffer object
 * @param trim {boolean} slice buffer if first element == 0
 * @returns {Buffer}
 */


function bnToBuffer(trimOrSize) {
  var res = Buffer.from(this.toByteArray());

  if (trimOrSize === true && res[0] === 0) {
    res = res.slice(1);
  } else if (_.isNumber(trimOrSize)) {
    if (res.length > trimOrSize) {
      for (var i = 0; i < res.length - trimOrSize; i++) {
        if (res[i] !== 0) {
          return null;
        }
      }

      return res.slice(res.length - trimOrSize);
    } else if (res.length < trimOrSize) {
      var padded = Buffer.alloc(trimOrSize);
      padded.fill(0, 0, trimOrSize - res.length);
      res.copy(padded, trimOrSize - res.length);
      return padded;
    }
  }

  return res;
}

function bnEquals(a) {
  return this.compareTo(a) == 0;
}

function bnMin(a) {
  return this.compareTo(a) < 0 ? this : a;
}

function bnMax(a) {
  return this.compareTo(a) > 0 ? this : a;
} //(protected) r = this op a (bitwise)


function bnpBitwiseTo(a, op, r) {
  var i,
      f,
      m = Math.min(a.t, this.t);

  for (i = 0; i < m; ++i) r[i] = op(this[i], a[i]);

  if (a.t < this.t) {
    f = a.s & this.DM;

    for (i = m; i < this.t; ++i) r[i] = op(this[i], f);

    r.t = this.t;
  } else {
    f = this.s & this.DM;

    for (i = m; i < a.t; ++i) r[i] = op(f, a[i]);

    r.t = a.t;
  }

  r.s = op(this.s, a.s);
  r.clamp();
} //(public) this & a


function op_and(x, y) {
  return x & y;
}

function bnAnd(a) {
  var r = nbi();
  this.bitwiseTo(a, op_and, r);
  return r;
} //(public) this | a


function op_or(x, y) {
  return x | y;
}

function bnOr(a) {
  var r = nbi();
  this.bitwiseTo(a, op_or, r);
  return r;
} //(public) this ^ a


function op_xor(x, y) {
  return x ^ y;
}

function bnXor(a) {
  var r = nbi();
  this.bitwiseTo(a, op_xor, r);
  return r;
} //(public) this & ~a


function op_andnot(x, y) {
  return x & ~y;
}

function bnAndNot(a) {
  var r = nbi();
  this.bitwiseTo(a, op_andnot, r);
  return r;
} //(public) ~this


function bnNot() {
  var r = nbi();

  for (var i = 0; i < this.t; ++i) r[i] = this.DM & ~this[i];

  r.t = this.t;
  r.s = ~this.s;
  return r;
} //(public) this << n


function bnShiftLeft(n) {
  var r = nbi();
  if (n < 0) this.rShiftTo(-n, r);else this.lShiftTo(n, r);
  return r;
} //(public) this >> n


function bnShiftRight(n) {
  var r = nbi();
  if (n < 0) this.lShiftTo(-n, r);else this.rShiftTo(n, r);
  return r;
} //return index of lowest 1-bit in x, x < 2^31


function lbit(x) {
  if (x === 0) return -1;
  var r = 0;

  if ((x & 0xffff) === 0) {
    x >>= 16;
    r += 16;
  }

  if ((x & 0xff) === 0) {
    x >>= 8;
    r += 8;
  }

  if ((x & 0xf) === 0) {
    x >>= 4;
    r += 4;
  }

  if ((x & 3) === 0) {
    x >>= 2;
    r += 2;
  }

  if ((x & 1) === 0) ++r;
  return r;
} //(public) returns index of lowest 1-bit (or -1 if none)


function bnGetLowestSetBit() {
  for (var i = 0; i < this.t; ++i) if (this[i] != 0) return i * this.DB + lbit(this[i]);

  if (this.s < 0) return this.t * this.DB;
  return -1;
} //return number of 1 bits in x


function cbit(x) {
  var r = 0;

  while (x != 0) {
    x &= x - 1;
    ++r;
  }

  return r;
} //(public) return number of set bits


function bnBitCount() {
  var r = 0,
      x = this.s & this.DM;

  for (var i = 0; i < this.t; ++i) r += cbit(this[i] ^ x);

  return r;
} //(public) true iff nth bit is set


function bnTestBit(n) {
  var j = Math.floor(n / this.DB);
  if (j >= this.t) return this.s != 0;
  return (this[j] & 1 << n % this.DB) != 0;
} //(protected) this op (1<<n)


function bnpChangeBit(n, op) {
  var r = BigInteger.ONE.shiftLeft(n);
  this.bitwiseTo(r, op, r);
  return r;
} //(public) this | (1<<n)


function bnSetBit(n) {
  return this.changeBit(n, op_or);
} //(public) this & ~(1<<n)


function bnClearBit(n) {
  return this.changeBit(n, op_andnot);
} //(public) this ^ (1<<n)


function bnFlipBit(n) {
  return this.changeBit(n, op_xor);
} //(protected) r = this + a


function bnpAddTo(a, r) {
  var i = 0,
      c = 0,
      m = Math.min(a.t, this.t);

  while (i < m) {
    c += this[i] + a[i];
    r[i++] = c & this.DM;
    c >>= this.DB;
  }

  if (a.t < this.t) {
    c += a.s;

    while (i < this.t) {
      c += this[i];
      r[i++] = c & this.DM;
      c >>= this.DB;
    }

    c += this.s;
  } else {
    c += this.s;

    while (i < a.t) {
      c += a[i];
      r[i++] = c & this.DM;
      c >>= this.DB;
    }

    c += a.s;
  }

  r.s = c < 0 ? -1 : 0;
  if (c > 0) r[i++] = c;else if (c < -1) r[i++] = this.DV + c;
  r.t = i;
  r.clamp();
} //(public) this + a


function bnAdd(a) {
  var r = nbi();
  this.addTo(a, r);
  return r;
} //(public) this - a


function bnSubtract(a) {
  var r = nbi();
  this.subTo(a, r);
  return r;
} //(public) this * a


function bnMultiply(a) {
  var r = nbi();
  this.multiplyTo(a, r);
  return r;
} // (public) this^2


function bnSquare() {
  var r = nbi();
  this.squareTo(r);
  return r;
} //(public) this / a


function bnDivide(a) {
  var r = nbi();
  this.divRemTo(a, r, null);
  return r;
} //(public) this % a


function bnRemainder(a) {
  var r = nbi();
  this.divRemTo(a, null, r);
  return r;
} //(public) [this/a,this%a]


function bnDivideAndRemainder(a) {
  var q = nbi(),
      r = nbi();
  this.divRemTo(a, q, r);
  return new Array(q, r);
} //(protected) this *= n, this >= 0, 1 < n < DV


function bnpDMultiply(n) {
  this[this.t] = this.am(0, n - 1, this, 0, 0, this.t);
  ++this.t;
  this.clamp();
} //(protected) this += n << w words, this >= 0


function bnpDAddOffset(n, w) {
  if (n === 0) return;

  while (this.t <= w) this[this.t++] = 0;

  this[w] += n;

  while (this[w] >= this.DV) {
    this[w] -= this.DV;
    if (++w >= this.t) this[this.t++] = 0;
    ++this[w];
  }
} //A "null" reducer


function NullExp() {}

function nNop(x) {
  return x;
}

function nMulTo(x, y, r) {
  x.multiplyTo(y, r);
}

function nSqrTo(x, r) {
  x.squareTo(r);
}

NullExp.prototype.convert = nNop;
NullExp.prototype.revert = nNop;
NullExp.prototype.mulTo = nMulTo;
NullExp.prototype.sqrTo = nSqrTo; //(public) this^e

function bnPow(e) {
  return this.exp(e, new NullExp());
} //(protected) r = lower n words of "this * a", a.t <= n
//"this" should be the larger one if appropriate.


function bnpMultiplyLowerTo(a, n, r) {
  var i = Math.min(this.t + a.t, n);
  r.s = 0; // assumes a,this >= 0

  r.t = i;

  while (i > 0) r[--i] = 0;

  var j;

  for (j = r.t - this.t; i < j; ++i) r[i + this.t] = this.am(0, a[i], r, i, 0, this.t);

  for (j = Math.min(a.t, n); i < j; ++i) this.am(0, a[i], r, i, 0, n - i);

  r.clamp();
} //(protected) r = "this * a" without lower n words, n > 0
//"this" should be the larger one if appropriate.


function bnpMultiplyUpperTo(a, n, r) {
  --n;
  var i = r.t = this.t + a.t - n;
  r.s = 0; // assumes a,this >= 0

  while (--i >= 0) r[i] = 0;

  for (i = Math.max(n - this.t, 0); i < a.t; ++i) r[this.t + i - n] = this.am(n - i, a[i], r, 0, 0, this.t + i - n);

  r.clamp();
  r.drShiftTo(1, r);
} //Barrett modular reduction


function Barrett(m) {
  // setup Barrett
  this.r2 = nbi();
  this.q3 = nbi();
  BigInteger.ONE.dlShiftTo(2 * m.t, this.r2);
  this.mu = this.r2.divide(m);
  this.m = m;
}

function barrettConvert(x) {
  if (x.s < 0 || x.t > 2 * this.m.t) return x.mod(this.m);else if (x.compareTo(this.m) < 0) return x;else {
    var r = nbi();
    x.copyTo(r);
    this.reduce(r);
    return r;
  }
}

function barrettRevert(x) {
  return x;
} //x = x mod m (HAC 14.42)


function barrettReduce(x) {
  x.drShiftTo(this.m.t - 1, this.r2);

  if (x.t > this.m.t + 1) {
    x.t = this.m.t + 1;
    x.clamp();
  }

  this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3);
  this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2);

  while (x.compareTo(this.r2) < 0) x.dAddOffset(1, this.m.t + 1);

  x.subTo(this.r2, x);

  while (x.compareTo(this.m) >= 0) x.subTo(this.m, x);
} //r = x^2 mod m; x != r


function barrettSqrTo(x, r) {
  x.squareTo(r);
  this.reduce(r);
} //r = x*y mod m; x,y != r


function barrettMulTo(x, y, r) {
  x.multiplyTo(y, r);
  this.reduce(r);
}

Barrett.prototype.convert = barrettConvert;
Barrett.prototype.revert = barrettRevert;
Barrett.prototype.reduce = barrettReduce;
Barrett.prototype.mulTo = barrettMulTo;
Barrett.prototype.sqrTo = barrettSqrTo; //(public) this^e % m (HAC 14.85)

function bnModPow(e, m) {
  var i = e.bitLength(),
      k,
      r = nbv(1),
      z;
  if (i <= 0) return r;else if (i < 18) k = 1;else if (i < 48) k = 3;else if (i < 144) k = 4;else if (i < 768) k = 5;else k = 6;
  if (i < 8) z = new Classic(m);else if (m.isEven()) z = new Barrett(m);else z = new Montgomery(m); // precomputation

  var g = new Array(),
      n = 3,
      k1 = k - 1,
      km = (1 << k) - 1;
  g[1] = z.convert(this);

  if (k > 1) {
    var g2 = nbi();
    z.sqrTo(g[1], g2);

    while (n <= km) {
      g[n] = nbi();
      z.mulTo(g2, g[n - 2], g[n]);
      n += 2;
    }
  }

  var j = e.t - 1,
      w,
      is1 = true,
      r2 = nbi(),
      t;
  i = nbits(e[j]) - 1;

  while (j >= 0) {
    if (i >= k1) w = e[j] >> i - k1 & km;else {
      w = (e[j] & (1 << i + 1) - 1) << k1 - i;
      if (j > 0) w |= e[j - 1] >> this.DB + i - k1;
    }
    n = k;

    while ((w & 1) === 0) {
      w >>= 1;
      --n;
    }

    if ((i -= n) < 0) {
      i += this.DB;
      --j;
    }

    if (is1) {
      // ret == 1, don't bother squaring or multiplying it
      g[w].copyTo(r);
      is1 = false;
    } else {
      while (n > 1) {
        z.sqrTo(r, r2);
        z.sqrTo(r2, r);
        n -= 2;
      }

      if (n > 0) z.sqrTo(r, r2);else {
        t = r;
        r = r2;
        r2 = t;
      }
      z.mulTo(r2, g[w], r);
    }

    while (j >= 0 && (e[j] & 1 << i) === 0) {
      z.sqrTo(r, r2);
      t = r;
      r = r2;
      r2 = t;

      if (--i < 0) {
        i = this.DB - 1;
        --j;
      }
    }
  }

  return z.revert(r);
} //(public) gcd(this,a) (HAC 14.54)


function bnGCD(a) {
  var x = this.s < 0 ? this.negate() : this.clone();
  var y = a.s < 0 ? a.negate() : a.clone();

  if (x.compareTo(y) < 0) {
    var t = x;
    x = y;
    y = t;
  }

  var i = x.getLowestSetBit(),
      g = y.getLowestSetBit();
  if (g < 0) return x;
  if (i < g) g = i;

  if (g > 0) {
    x.rShiftTo(g, x);
    y.rShiftTo(g, y);
  }

  while (x.signum() > 0) {
    if ((i = x.getLowestSetBit()) > 0) x.rShiftTo(i, x);
    if ((i = y.getLowestSetBit()) > 0) y.rShiftTo(i, y);

    if (x.compareTo(y) >= 0) {
      x.subTo(y, x);
      x.rShiftTo(1, x);
    } else {
      y.subTo(x, y);
      y.rShiftTo(1, y);
    }
  }

  if (g > 0) y.lShiftTo(g, y);
  return y;
} //(protected) this % n, n < 2^26


function bnpModInt(n) {
  if (n <= 0) return 0;
  var d = this.DV % n,
      r = this.s < 0 ? n - 1 : 0;
  if (this.t > 0) if (d === 0) r = this[0] % n;else for (var i = this.t - 1; i >= 0; --i) r = (d * r + this[i]) % n;
  return r;
} //(public) 1/this % m (HAC 14.61)


function bnModInverse(m) {
  var ac = m.isEven();
  if (this.isEven() && ac || m.signum() === 0) return BigInteger.ZERO;
  var u = m.clone(),
      v = this.clone();
  var a = nbv(1),
      b = nbv(0),
      c = nbv(0),
      d = nbv(1);

  while (u.signum() != 0) {
    while (u.isEven()) {
      u.rShiftTo(1, u);

      if (ac) {
        if (!a.isEven() || !b.isEven()) {
          a.addTo(this, a);
          b.subTo(m, b);
        }

        a.rShiftTo(1, a);
      } else if (!b.isEven()) b.subTo(m, b);

      b.rShiftTo(1, b);
    }

    while (v.isEven()) {
      v.rShiftTo(1, v);

      if (ac) {
        if (!c.isEven() || !d.isEven()) {
          c.addTo(this, c);
          d.subTo(m, d);
        }

        c.rShiftTo(1, c);
      } else if (!d.isEven()) d.subTo(m, d);

      d.rShiftTo(1, d);
    }

    if (u.compareTo(v) >= 0) {
      u.subTo(v, u);
      if (ac) a.subTo(c, a);
      b.subTo(d, b);
    } else {
      v.subTo(u, v);
      if (ac) c.subTo(a, c);
      d.subTo(b, d);
    }
  }

  if (v.compareTo(BigInteger.ONE) != 0) return BigInteger.ZERO;
  if (d.compareTo(m) >= 0) return d.subtract(m);
  if (d.signum() < 0) d.addTo(m, d);else return d;
  if (d.signum() < 0) return d.add(m);else return d;
}

var lowprimes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997];
var lplim = (1 << 26) / lowprimes[lowprimes.length - 1]; //(public) test primality with certainty >= 1-.5^t

function bnIsProbablePrime(t) {
  var i,
      x = this.abs();

  if (x.t == 1 && x[0] <= lowprimes[lowprimes.length - 1]) {
    for (i = 0; i < lowprimes.length; ++i) if (x[0] == lowprimes[i]) return true;

    return false;
  }

  if (x.isEven()) return false;
  i = 1;

  while (i < lowprimes.length) {
    var m = lowprimes[i],
        j = i + 1;

    while (j < lowprimes.length && m < lplim) m *= lowprimes[j++];

    m = x.modInt(m);

    while (i < j) if (m % lowprimes[i++] === 0) return false;
  }

  return x.millerRabin(t);
} //(protected) true if probably prime (HAC 4.24, Miller-Rabin)


function bnpMillerRabin(t) {
  var n1 = this.subtract(BigInteger.ONE);
  var k = n1.getLowestSetBit();
  if (k <= 0) return false;
  var r = n1.shiftRight(k);
  t = t + 1 >> 1;
  if (t > lowprimes.length) t = lowprimes.length;
  var a = nbi();

  for (var i = 0; i < t; ++i) {
    //Pick bases at random, instead of starting at 2
    a.fromInt(lowprimes[Math.floor(Math.random() * lowprimes.length)]);
    var y = a.modPow(r, this);

    if (y.compareTo(BigInteger.ONE) != 0 && y.compareTo(n1) != 0) {
      var j = 1;

      while (j++ < k && y.compareTo(n1) != 0) {
        y = y.modPowInt(2, this);
        if (y.compareTo(BigInteger.ONE) === 0) return false;
      }

      if (y.compareTo(n1) != 0) return false;
    }
  }

  return true;
} // protected


BigInteger.prototype.copyTo = bnpCopyTo;
BigInteger.prototype.fromInt = bnpFromInt;
BigInteger.prototype.fromString = bnpFromString;
BigInteger.prototype.fromByteArray = bnpFromByteArray;
BigInteger.prototype.fromBuffer = bnpFromBuffer;
BigInteger.prototype.clamp = bnpClamp;
BigInteger.prototype.dlShiftTo = bnpDLShiftTo;
BigInteger.prototype.drShiftTo = bnpDRShiftTo;
BigInteger.prototype.lShiftTo = bnpLShiftTo;
BigInteger.prototype.rShiftTo = bnpRShiftTo;
BigInteger.prototype.subTo = bnpSubTo;
BigInteger.prototype.multiplyTo = bnpMultiplyTo;
BigInteger.prototype.squareTo = bnpSquareTo;
BigInteger.prototype.divRemTo = bnpDivRemTo;
BigInteger.prototype.invDigit = bnpInvDigit;
BigInteger.prototype.isEven = bnpIsEven;
BigInteger.prototype.exp = bnpExp;
BigInteger.prototype.chunkSize = bnpChunkSize;
BigInteger.prototype.toRadix = bnpToRadix;
BigInteger.prototype.fromRadix = bnpFromRadix;
BigInteger.prototype.fromNumber = bnpFromNumber;
BigInteger.prototype.bitwiseTo = bnpBitwiseTo;
BigInteger.prototype.changeBit = bnpChangeBit;
BigInteger.prototype.addTo = bnpAddTo;
BigInteger.prototype.dMultiply = bnpDMultiply;
BigInteger.prototype.dAddOffset = bnpDAddOffset;
BigInteger.prototype.multiplyLowerTo = bnpMultiplyLowerTo;
BigInteger.prototype.multiplyUpperTo = bnpMultiplyUpperTo;
BigInteger.prototype.modInt = bnpModInt;
BigInteger.prototype.millerRabin = bnpMillerRabin; // public

BigInteger.prototype.toString = bnToString;
BigInteger.prototype.negate = bnNegate;
BigInteger.prototype.abs = bnAbs;
BigInteger.prototype.compareTo = bnCompareTo;
BigInteger.prototype.bitLength = bnBitLength;
BigInteger.prototype.mod = bnMod;
BigInteger.prototype.modPowInt = bnModPowInt;
BigInteger.prototype.clone = bnClone;
BigInteger.prototype.intValue = bnIntValue;
BigInteger.prototype.byteValue = bnByteValue;
BigInteger.prototype.shortValue = bnShortValue;
BigInteger.prototype.signum = bnSigNum;
BigInteger.prototype.toByteArray = bnToByteArray;
BigInteger.prototype.toBuffer = bnToBuffer;
BigInteger.prototype.equals = bnEquals;
BigInteger.prototype.min = bnMin;
BigInteger.prototype.max = bnMax;
BigInteger.prototype.and = bnAnd;
BigInteger.prototype.or = bnOr;
BigInteger.prototype.xor = bnXor;
BigInteger.prototype.andNot = bnAndNot;
BigInteger.prototype.not = bnNot;
BigInteger.prototype.shiftLeft = bnShiftLeft;
BigInteger.prototype.shiftRight = bnShiftRight;
BigInteger.prototype.getLowestSetBit = bnGetLowestSetBit;
BigInteger.prototype.bitCount = bnBitCount;
BigInteger.prototype.testBit = bnTestBit;
BigInteger.prototype.setBit = bnSetBit;
BigInteger.prototype.clearBit = bnClearBit;
BigInteger.prototype.flipBit = bnFlipBit;
BigInteger.prototype.add = bnAdd;
BigInteger.prototype.subtract = bnSubtract;
BigInteger.prototype.multiply = bnMultiply;
BigInteger.prototype.divide = bnDivide;
BigInteger.prototype.remainder = bnRemainder;
BigInteger.prototype.divideAndRemainder = bnDivideAndRemainder;
BigInteger.prototype.modPow = bnModPow;
BigInteger.prototype.modInverse = bnModInverse;
BigInteger.prototype.pow = bnPow;
BigInteger.prototype.gcd = bnGCD;
BigInteger.prototype.isProbablePrime = bnIsProbablePrime;
BigInteger.int2char = int2char; // "constants"

BigInteger.ZERO = nbv(0);
BigInteger.ONE = nbv(1); // JSBN-specific extension

BigInteger.prototype.square = bnSquare; //BigInteger interfaces not implemented in jsbn:
//BigInteger(int signum, byte[] magnitude)
//double doubleValue()
//float floatValue()
//int hashCode()
//long longValue()
//static BigInteger valueOf(long val)

module.exports = BigInteger;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
  pkcs1: __webpack_require__(14),
  pkcs1_oaep: __webpack_require__(15),
  pss: __webpack_require__(16),

  /**
   * Check if scheme has padding methods
   * @param scheme {string}
   * @returns {Boolean}
   */
  isEncryption: function (scheme) {
    return module.exports[scheme] && module.exports[scheme].isEncryption;
  },

  /**
   * Check if scheme has sign/verify methods
   * @param scheme {string}
   * @returns {Boolean}
   */
  isSignature: function (scheme) {
    return module.exports[scheme] && module.exports[scheme].isSignature;
  }
};

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("constants");

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

// Copyright 2011 Mark Cavage <mcavage@gmail.com> All rights reserved.
// If you have no idea what ASN.1 or BER is, see this:
// ftp://ftp.rsa.com/pub/pkcs/ascii/layman.asc
var Ber = __webpack_require__(20); // --- Exported API


module.exports = {
  Ber: Ber,
  BerReader: Ber.Reader,
  BerWriter: Ber.Writer
};

/***/ }),
/* 6 */
/***/ (function(module, exports) {

// Copyright 2011 Mark Cavage <mcavage@gmail.com> All rights reserved.
module.exports = {
  newInvalidAsn1Error: function (msg) {
    var e = new Error();
    e.name = 'InvalidAsn1Error';
    e.message = msg || '';
    return e;
  }
};

/***/ }),
/* 7 */
/***/ (function(module, exports) {

// Copyright 2011 Mark Cavage <mcavage@gmail.com> All rights reserved.
module.exports = {
  EOC: 0,
  Boolean: 1,
  Integer: 2,
  BitString: 3,
  OctetString: 4,
  Null: 5,
  OID: 6,
  ObjectDescriptor: 7,
  External: 8,
  Real: 9,
  // float
  Enumeration: 10,
  PDV: 11,
  Utf8String: 12,
  RelativeOID: 13,
  Sequence: 16,
  Set: 17,
  NumericString: 18,
  PrintableString: 19,
  T61String: 20,
  VideotexString: 21,
  IA5String: 22,
  UTCTime: 23,
  GeneralizedTime: 24,
  GraphicString: 25,
  VisibleString: 26,
  GeneralString: 28,
  UniversalString: 29,
  CharacterString: 30,
  BMPString: 31,
  Constructor: 32,
  Context: 128
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var BigInteger = __webpack_require__(2);

var schemes = __webpack_require__(3);

module.exports = function (keyPair, options) {
  var pkcs1Scheme = schemes.pkcs1.makeScheme(keyPair, options);
  return {
    encrypt: function (buffer, usePrivate) {
      var m, c;

      if (usePrivate) {
        /* Type 1: zeros padding for private key encrypt */
        m = new BigInteger(pkcs1Scheme.encPad(buffer, {
          type: 1
        }));
        c = keyPair.$doPrivate(m);
      } else {
        m = new BigInteger(keyPair.encryptionScheme.encPad(buffer));
        c = keyPair.$doPublic(m);
      }

      return c.toBuffer(keyPair.encryptedDataLength);
    },
    decrypt: function (buffer, usePublic) {
      var m,
          c = new BigInteger(buffer);

      if (usePublic) {
        m = keyPair.$doPublic(c);
        /* Type 1: zeros padding for private key decrypt */

        return pkcs1Scheme.encUnPad(m.toBuffer(keyPair.encryptedDataLength), {
          type: 1
        });
      } else {
        m = keyPair.$doPrivate(c);
        return keyPair.encryptionScheme.encUnPad(m.toBuffer(keyPair.encryptedDataLength));
      }
    }
  };
};

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("assert");

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* eslint-disable node/no-deprecated-api */


var buffer = __webpack_require__(22);

var Buffer = buffer.Buffer;
var safer = {};
var key;

for (key in buffer) {
  if (!buffer.hasOwnProperty(key)) continue;
  if (key === 'SlowBuffer' || key === 'Buffer') continue;
  safer[key] = buffer[key];
}

var Safer = safer.Buffer = {};

for (key in Buffer) {
  if (!Buffer.hasOwnProperty(key)) continue;
  if (key === 'allocUnsafe' || key === 'allocUnsafeSlow') continue;
  Safer[key] = Buffer[key];
}

safer.Buffer.prototype = Buffer.prototype;

if (!Safer.from || Safer.from === Uint8Array.from) {
  Safer.from = function (value, encodingOrOffset, length) {
    if (typeof value === 'number') {
      throw new TypeError('The "value" argument must not be of type number. Received type ' + typeof value);
    }

    if (value && typeof value.length === 'undefined') {
      throw new TypeError('The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type ' + typeof value);
    }

    return Buffer(value, encodingOrOffset, length);
  };
}

if (!Safer.alloc) {
  Safer.alloc = function (size, fill, encoding) {
    if (typeof size !== 'number') {
      throw new TypeError('The "size" argument must be of type number. Received type ' + typeof size);
    }

    if (size < 0 || size >= 2 * (1 << 30)) {
      throw new RangeError('The value "' + size + '" is invalid for option "size"');
    }

    var buf = Buffer(size);

    if (!fill || fill.length === 0) {
      buf.fill(0);
    } else if (typeof encoding === 'string') {
      buf.fill(fill, encoding);
    } else {
      buf.fill(fill);
    }

    return buf;
  };
}

if (!safer.kStringMaxLength) {
  try {
    safer.kStringMaxLength = process.binding('buffer').kStringMaxLength;
  } catch (e) {// we can't determine kStringMaxLength in environments where process.binding
    // is unsupported, so let's not set it
  }
}

if (!safer.constants) {
  safer.constants = {
    MAX_LENGTH: safer.kMaxLength
  };

  if (safer.kStringMaxLength) {
    safer.constants.MAX_STRING_LENGTH = safer.kStringMaxLength;
  }
}

module.exports = safer;

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("dgram");

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * RSA library for Node.js
 *
 * Author: rzcoder
 * License MIT
 */
var constants = __webpack_require__(4);

var rsa = __webpack_require__(13);

var crypt = __webpack_require__(1);

var ber = __webpack_require__(5).Ber;

var _ = __webpack_require__(0)._;

var utils = __webpack_require__(0);

var schemes = __webpack_require__(3);

var formats = __webpack_require__(24);

if (typeof constants.RSA_NO_PADDING === "undefined") {
  //patch for node v0.10.x, constants do not defined
  constants.RSA_NO_PADDING = 3;
}

module.exports = function () {
  var SUPPORTED_HASH_ALGORITHMS = {
    node10: ['md4', 'md5', 'ripemd160', 'sha1', 'sha224', 'sha256', 'sha384', 'sha512'],
    node: ['md4', 'md5', 'ripemd160', 'sha1', 'sha224', 'sha256', 'sha384', 'sha512'],
    iojs: ['md4', 'md5', 'ripemd160', 'sha1', 'sha224', 'sha256', 'sha384', 'sha512'],
    browser: ['md5', 'ripemd160', 'sha1', 'sha256', 'sha512']
  };
  var DEFAULT_ENCRYPTION_SCHEME = 'pkcs1_oaep';
  var DEFAULT_SIGNING_SCHEME = 'pkcs1';
  var DEFAULT_EXPORT_FORMAT = 'private';
  var EXPORT_FORMAT_ALIASES = {
    'private': 'pkcs1-private-pem',
    'private-der': 'pkcs1-private-der',
    'public': 'pkcs8-public-pem',
    'public-der': 'pkcs8-public-der'
  };
  /**
   * @param key {string|buffer|object} Key in PEM format, or data for generate key {b: bits, e: exponent}
   * @constructor
   */

  function NodeRSA(key, format, options) {
    if (!(this instanceof NodeRSA)) {
      return new NodeRSA(key, format, options);
    }

    if (_.isObject(format)) {
      options = format;
      format = undefined;
    }

    this.$options = {
      signingScheme: DEFAULT_SIGNING_SCHEME,
      signingSchemeOptions: {
        hash: 'sha256',
        saltLength: null
      },
      encryptionScheme: DEFAULT_ENCRYPTION_SCHEME,
      encryptionSchemeOptions: {
        hash: 'sha1',
        label: null
      },
      environment: utils.detectEnvironment(),
      rsaUtils: this
    };
    this.keyPair = new rsa.Key();
    this.$cache = {};

    if (Buffer.isBuffer(key) || _.isString(key)) {
      this.importKey(key, format);
    } else if (_.isObject(key)) {
      this.generateKeyPair(key.b, key.e);
    }

    this.setOptions(options);
  }
  /**
   * Set and validate options for key instance
   * @param options
   */


  NodeRSA.prototype.setOptions = function (options) {
    options = options || {};

    if (options.environment) {
      this.$options.environment = options.environment;
    }

    if (options.signingScheme) {
      if (_.isString(options.signingScheme)) {
        var signingScheme = options.signingScheme.toLowerCase().split('-');

        if (signingScheme.length == 1) {
          if (SUPPORTED_HASH_ALGORITHMS.node.indexOf(signingScheme[0]) > -1) {
            this.$options.signingSchemeOptions = {
              hash: signingScheme[0]
            };
            this.$options.signingScheme = DEFAULT_SIGNING_SCHEME;
          } else {
            this.$options.signingScheme = signingScheme[0];
            this.$options.signingSchemeOptions = {
              hash: null
            };
          }
        } else {
          this.$options.signingSchemeOptions = {
            hash: signingScheme[1]
          };
          this.$options.signingScheme = signingScheme[0];
        }
      } else if (_.isObject(options.signingScheme)) {
        this.$options.signingScheme = options.signingScheme.scheme || DEFAULT_SIGNING_SCHEME;
        this.$options.signingSchemeOptions = _.omit(options.signingScheme, 'scheme');
      }

      if (!schemes.isSignature(this.$options.signingScheme)) {
        throw Error('Unsupported signing scheme');
      }

      if (this.$options.signingSchemeOptions.hash && SUPPORTED_HASH_ALGORITHMS[this.$options.environment].indexOf(this.$options.signingSchemeOptions.hash) === -1) {
        throw Error('Unsupported hashing algorithm for ' + this.$options.environment + ' environment');
      }
    }

    if (options.encryptionScheme) {
      if (_.isString(options.encryptionScheme)) {
        this.$options.encryptionScheme = options.encryptionScheme.toLowerCase();
        this.$options.encryptionSchemeOptions = {};
      } else if (_.isObject(options.encryptionScheme)) {
        this.$options.encryptionScheme = options.encryptionScheme.scheme || DEFAULT_ENCRYPTION_SCHEME;
        this.$options.encryptionSchemeOptions = _.omit(options.encryptionScheme, 'scheme');
      }

      if (!schemes.isEncryption(this.$options.encryptionScheme)) {
        throw Error('Unsupported encryption scheme');
      }

      if (this.$options.encryptionSchemeOptions.hash && SUPPORTED_HASH_ALGORITHMS[this.$options.environment].indexOf(this.$options.encryptionSchemeOptions.hash) === -1) {
        throw Error('Unsupported hashing algorithm for ' + this.$options.environment + ' environment');
      }
    }

    this.keyPair.setOptions(this.$options);
  };
  /**
   * Generate private/public keys pair
   *
   * @param bits {int} length key in bits. Default 2048.
   * @param exp {int} public exponent. Default 65537.
   * @returns {NodeRSA}
   */


  NodeRSA.prototype.generateKeyPair = function (bits, exp) {
    bits = bits || 2048;
    exp = exp || 65537;

    if (bits % 8 !== 0) {
      throw Error('Key size must be a multiple of 8.');
    }

    this.keyPair.generate(bits, exp.toString(16));
    this.$cache = {};
    return this;
  };
  /**
   * Importing key
   * @param keyData {string|buffer|Object}
   * @param format {string}
   */


  NodeRSA.prototype.importKey = function (keyData, format) {
    if (!keyData) {
      throw Error("Empty key given");
    }

    if (format) {
      format = EXPORT_FORMAT_ALIASES[format] || format;
    }

    if (!formats.detectAndImport(this.keyPair, keyData, format) && format === undefined) {
      throw Error("Key format must be specified");
    }

    this.$cache = {};
    return this;
  };
  /**
   * Exporting key
   * @param [format] {string}
   */


  NodeRSA.prototype.exportKey = function (format) {
    format = format || DEFAULT_EXPORT_FORMAT;
    format = EXPORT_FORMAT_ALIASES[format] || format;

    if (!this.$cache[format]) {
      this.$cache[format] = formats.detectAndExport(this.keyPair, format);
    }

    return this.$cache[format];
  };
  /**
   * Check if key pair contains private key
   */


  NodeRSA.prototype.isPrivate = function () {
    return this.keyPair.isPrivate();
  };
  /**
   * Check if key pair contains public key
   * @param [strict] {boolean} - public key only, return false if have private exponent
   */


  NodeRSA.prototype.isPublic = function (strict) {
    return this.keyPair.isPublic(strict);
  };
  /**
   * Check if key pair doesn't contains any data
   */


  NodeRSA.prototype.isEmpty = function (strict) {
    return !(this.keyPair.n || this.keyPair.e || this.keyPair.d);
  };
  /**
   * Encrypting data method with public key
   *
   * @param buffer {string|number|object|array|Buffer} - data for encrypting. Object and array will convert to JSON string.
   * @param encoding {string} - optional. Encoding for output result, may be 'buffer', 'binary', 'hex' or 'base64'. Default 'buffer'.
   * @param source_encoding {string} - optional. Encoding for given string. Default utf8.
   * @returns {string|Buffer}
   */


  NodeRSA.prototype.encrypt = function (buffer, encoding, source_encoding) {
    return this.$$encryptKey(false, buffer, encoding, source_encoding);
  };
  /**
   * Decrypting data method with private key
   *
   * @param buffer {Buffer} - buffer for decrypting
   * @param encoding - encoding for result string, can also take 'json' or 'buffer' for the automatic conversion of this type
   * @returns {Buffer|object|string}
   */


  NodeRSA.prototype.decrypt = function (buffer, encoding) {
    return this.$$decryptKey(false, buffer, encoding);
  };
  /**
   * Encrypting data method with private key
   *
   * Parameters same as `encrypt` method
   */


  NodeRSA.prototype.encryptPrivate = function (buffer, encoding, source_encoding) {
    return this.$$encryptKey(true, buffer, encoding, source_encoding);
  };
  /**
   * Decrypting data method with public key
   *
   * Parameters same as `decrypt` method
   */


  NodeRSA.prototype.decryptPublic = function (buffer, encoding) {
    return this.$$decryptKey(true, buffer, encoding);
  };
  /**
   * Encrypting data method with custom key
   */


  NodeRSA.prototype.$$encryptKey = function (usePrivate, buffer, encoding, source_encoding) {
    try {
      var res = this.keyPair.encrypt(this.$getDataForEncrypt(buffer, source_encoding), usePrivate);

      if (encoding == 'buffer' || !encoding) {
        return res;
      } else {
        return res.toString(encoding);
      }
    } catch (e) {
      throw Error('Error during encryption. Original error: ' + e);
    }
  };
  /**
   * Decrypting data method with custom key
   */


  NodeRSA.prototype.$$decryptKey = function (usePublic, buffer, encoding) {
    try {
      buffer = _.isString(buffer) ? Buffer.from(buffer, 'base64') : buffer;
      var res = this.keyPair.decrypt(buffer, usePublic);

      if (res === null) {
        throw Error('Key decrypt method returns null.');
      }

      return this.$getDecryptedData(res, encoding);
    } catch (e) {
      throw Error('Error during decryption (probably incorrect key). Original error: ' + e);
    }
  };
  /**
   *  Signing data
   *
   * @param buffer {string|number|object|array|Buffer} - data for signing. Object and array will convert to JSON string.
   * @param encoding {string} - optional. Encoding for output result, may be 'buffer', 'binary', 'hex' or 'base64'. Default 'buffer'.
   * @param source_encoding {string} - optional. Encoding for given string. Default utf8.
   * @returns {string|Buffer}
   */


  NodeRSA.prototype.sign = function (buffer, encoding, source_encoding) {
    if (!this.isPrivate()) {
      throw Error("This is not private key");
    }

    var res = this.keyPair.sign(this.$getDataForEncrypt(buffer, source_encoding));

    if (encoding && encoding != 'buffer') {
      res = res.toString(encoding);
    }

    return res;
  };
  /**
   *  Verifying signed data
   *
   * @param buffer - signed data
   * @param signature
   * @param source_encoding {string} - optional. Encoding for given string. Default utf8.
   * @param signature_encoding - optional. Encoding of given signature. May be 'buffer', 'binary', 'hex' or 'base64'. Default 'buffer'.
   * @returns {*}
   */


  NodeRSA.prototype.verify = function (buffer, signature, source_encoding, signature_encoding) {
    if (!this.isPublic()) {
      throw Error("This is not public key");
    }

    signature_encoding = !signature_encoding || signature_encoding == 'buffer' ? null : signature_encoding;
    return this.keyPair.verify(this.$getDataForEncrypt(buffer, source_encoding), signature, signature_encoding);
  };
  /**
   * Returns key size in bits
   * @returns {int}
   */


  NodeRSA.prototype.getKeySize = function () {
    return this.keyPair.keySize;
  };
  /**
   * Returns max message length in bytes (for 1 chunk) depending on current encryption scheme
   * @returns {int}
   */


  NodeRSA.prototype.getMaxMessageSize = function () {
    return this.keyPair.maxMessageLength;
  };
  /**
   * Preparing given data for encrypting/signing. Just make new/return Buffer object.
   *
   * @param buffer {string|number|object|array|Buffer} - data for encrypting. Object and array will convert to JSON string.
   * @param encoding {string} - optional. Encoding for given string. Default utf8.
   * @returns {Buffer}
   */


  NodeRSA.prototype.$getDataForEncrypt = function (buffer, encoding) {
    if (_.isString(buffer) || _.isNumber(buffer)) {
      return Buffer.from('' + buffer, encoding || 'utf8');
    } else if (Buffer.isBuffer(buffer)) {
      return buffer;
    } else if (_.isObject(buffer)) {
      return Buffer.from(JSON.stringify(buffer));
    } else {
      throw Error("Unexpected data type");
    }
  };
  /**
   *
   * @param buffer {Buffer} - decrypted data.
   * @param encoding - optional. Encoding for result output. May be 'buffer', 'json' or any of Node.js Buffer supported encoding.
   * @returns {*}
   */


  NodeRSA.prototype.$getDecryptedData = function (buffer, encoding) {
    encoding = encoding || 'buffer';

    if (encoding == 'buffer') {
      return buffer;
    } else if (encoding == 'json') {
      return JSON.parse(buffer.toString());
    } else {
      return buffer.toString(encoding);
    }
  };

  return NodeRSA;
}();

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

/*
 * RSA Encryption / Decryption with PKCS1 v2 Padding.
 * 
 * Copyright (c) 2003-2005  Tom Wu
 * All Rights Reserved.
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS-IS" AND WITHOUT WARRANTY OF ANY KIND, 
 * EXPRESS, IMPLIED OR OTHERWISE, INCLUDING WITHOUT LIMITATION, ANY 
 * WARRANTY OF MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE.  
 *
 * IN NO EVENT SHALL TOM WU BE LIABLE FOR ANY SPECIAL, INCIDENTAL,
 * INDIRECT OR CONSEQUENTIAL DAMAGES OF ANY KIND, OR ANY DAMAGES WHATSOEVER
 * RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER OR NOT ADVISED OF
 * THE POSSIBILITY OF DAMAGE, AND ON ANY THEORY OF LIABILITY, ARISING OUT
 * OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * In addition, the following condition applies:
 *
 * All redistributions must retain an intact copy of this copyright notice
 * and disclaimer.
 */

/*
 * Node.js adaptation
 * long message support implementation
 * signing/verifying
 *
 * 2014 rzcoder
 */
var _ = __webpack_require__(0)._;

var crypt = __webpack_require__(1);

var BigInteger = __webpack_require__(2);

var utils = __webpack_require__(0);

var schemes = __webpack_require__(3);

var encryptEngines = __webpack_require__(17);

exports.BigInteger = BigInteger;

module.exports.Key = function () {
  /**
   * RSA key constructor
   *
   * n - modulus
   * e - publicExponent
   * d - privateExponent
   * p - prime1
   * q - prime2
   * dmp1 - exponent1 -- d mod (p1)
   * dmq1 - exponent2 -- d mod (q-1)
   * coeff - coefficient -- (inverse of q) mod p
   */
  function RSAKey() {
    this.n = null;
    this.e = 0;
    this.d = null;
    this.p = null;
    this.q = null;
    this.dmp1 = null;
    this.dmq1 = null;
    this.coeff = null;
  }

  RSAKey.prototype.setOptions = function (options) {
    var signingSchemeProvider = schemes[options.signingScheme];
    var encryptionSchemeProvider = schemes[options.encryptionScheme];

    if (signingSchemeProvider === encryptionSchemeProvider) {
      this.signingScheme = this.encryptionScheme = encryptionSchemeProvider.makeScheme(this, options);
    } else {
      this.encryptionScheme = encryptionSchemeProvider.makeScheme(this, options);
      this.signingScheme = signingSchemeProvider.makeScheme(this, options);
    }

    this.encryptEngine = encryptEngines.getEngine(this, options);
  };
  /**
   * Generate a new random private key B bits long, using public expt E
   * @param B
   * @param E
   */


  RSAKey.prototype.generate = function (B, E) {
    var qs = B >> 1;
    this.e = parseInt(E, 16);
    var ee = new BigInteger(E, 16);

    while (true) {
      while (true) {
        this.p = new BigInteger(B - qs, 1);
        if (this.p.subtract(BigInteger.ONE).gcd(ee).compareTo(BigInteger.ONE) === 0 && this.p.isProbablePrime(10)) break;
      }

      while (true) {
        this.q = new BigInteger(qs, 1);
        if (this.q.subtract(BigInteger.ONE).gcd(ee).compareTo(BigInteger.ONE) === 0 && this.q.isProbablePrime(10)) break;
      }

      if (this.p.compareTo(this.q) <= 0) {
        var t = this.p;
        this.p = this.q;
        this.q = t;
      }

      var p1 = this.p.subtract(BigInteger.ONE);
      var q1 = this.q.subtract(BigInteger.ONE);
      var phi = p1.multiply(q1);

      if (phi.gcd(ee).compareTo(BigInteger.ONE) === 0) {
        this.n = this.p.multiply(this.q);

        if (this.n.bitLength() < B) {
          continue;
        }

        this.d = ee.modInverse(phi);
        this.dmp1 = this.d.mod(p1);
        this.dmq1 = this.d.mod(q1);
        this.coeff = this.q.modInverse(this.p);
        break;
      }
    }

    this.$$recalculateCache();
  };
  /**
   * Set the private key fields N, e, d and CRT params from buffers
   *
   * @param N
   * @param E
   * @param D
   * @param P
   * @param Q
   * @param DP
   * @param DQ
   * @param C
   */


  RSAKey.prototype.setPrivate = function (N, E, D, P, Q, DP, DQ, C) {
    if (N && E && D && N.length > 0 && (_.isNumber(E) || E.length > 0) && D.length > 0) {
      this.n = new BigInteger(N);
      this.e = _.isNumber(E) ? E : utils.get32IntFromBuffer(E, 0);
      this.d = new BigInteger(D);

      if (P && Q && DP && DQ && C) {
        this.p = new BigInteger(P);
        this.q = new BigInteger(Q);
        this.dmp1 = new BigInteger(DP);
        this.dmq1 = new BigInteger(DQ);
        this.coeff = new BigInteger(C);
      } else {// TODO: re-calculate any missing CRT params
      }

      this.$$recalculateCache();
    } else {
      throw Error("Invalid RSA private key");
    }
  };
  /**
   * Set the public key fields N and e from hex strings
   * @param N
   * @param E
   */


  RSAKey.prototype.setPublic = function (N, E) {
    if (N && E && N.length > 0 && (_.isNumber(E) || E.length > 0)) {
      this.n = new BigInteger(N);
      this.e = _.isNumber(E) ? E : utils.get32IntFromBuffer(E, 0);
      this.$$recalculateCache();
    } else {
      throw Error("Invalid RSA public key");
    }
  };
  /**
   * private
   * Perform raw private operation on "x": return x^d (mod n)
   *
   * @param x
   * @returns {*}
   */


  RSAKey.prototype.$doPrivate = function (x) {
    if (this.p || this.q) {
      return x.modPow(this.d, this.n);
    } // TODO: re-calculate any missing CRT params


    var xp = x.mod(this.p).modPow(this.dmp1, this.p);
    var xq = x.mod(this.q).modPow(this.dmq1, this.q);

    while (xp.compareTo(xq) < 0) {
      xp = xp.add(this.p);
    }

    return xp.subtract(xq).multiply(this.coeff).mod(this.p).multiply(this.q).add(xq);
  };
  /**
   * private
   * Perform raw public operation on "x": return x^e (mod n)
   *
   * @param x
   * @returns {*}
   */


  RSAKey.prototype.$doPublic = function (x) {
    return x.modPowInt(this.e, this.n);
  };
  /**
   * Return the PKCS#1 RSA encryption of buffer
   * @param buffer {Buffer}
   * @returns {Buffer}
   */


  RSAKey.prototype.encrypt = function (buffer, usePrivate) {
    var buffers = [];
    var results = [];
    var bufferSize = buffer.length;
    var buffersCount = Math.ceil(bufferSize / this.maxMessageLength) || 1; // total buffers count for encrypt

    var dividedSize = Math.ceil(bufferSize / buffersCount || 1); // each buffer size

    if (buffersCount == 1) {
      buffers.push(buffer);
    } else {
      for (var bufNum = 0; bufNum < buffersCount; bufNum++) {
        buffers.push(buffer.slice(bufNum * dividedSize, (bufNum + 1) * dividedSize));
      }
    }

    for (var i = 0; i < buffers.length; i++) {
      results.push(this.encryptEngine.encrypt(buffers[i], usePrivate));
    }

    return Buffer.concat(results);
  };
  /**
   * Return the PKCS#1 RSA decryption of buffer
   * @param buffer {Buffer}
   * @returns {Buffer}
   */


  RSAKey.prototype.decrypt = function (buffer, usePublic) {
    if (buffer.length % this.encryptedDataLength > 0) {
      throw Error('Incorrect data or key');
    }

    var result = [];
    var offset = 0;
    var length = 0;
    var buffersCount = buffer.length / this.encryptedDataLength;

    for (var i = 0; i < buffersCount; i++) {
      offset = i * this.encryptedDataLength;
      length = offset + this.encryptedDataLength;
      result.push(this.encryptEngine.decrypt(buffer.slice(offset, Math.min(length, buffer.length)), usePublic));
    }

    return Buffer.concat(result);
  };

  RSAKey.prototype.sign = function (buffer) {
    return this.signingScheme.sign.apply(this.signingScheme, arguments);
  };

  RSAKey.prototype.verify = function (buffer, signature, signature_encoding) {
    return this.signingScheme.verify.apply(this.signingScheme, arguments);
  };
  /**
   * Check if key pair contains private key
   */


  RSAKey.prototype.isPrivate = function () {
    return this.n && this.e && this.d && true || false;
  };
  /**
   * Check if key pair contains public key
   * @param strict {boolean} - public key only, return false if have private exponent
   */


  RSAKey.prototype.isPublic = function (strict) {
    return this.n && this.e && !(strict && this.d) || false;
  };

  Object.defineProperty(RSAKey.prototype, 'keySize', {
    get: function () {
      return this.cache.keyBitLength;
    }
  });
  Object.defineProperty(RSAKey.prototype, 'encryptedDataLength', {
    get: function () {
      return this.cache.keyByteLength;
    }
  });
  Object.defineProperty(RSAKey.prototype, 'maxMessageLength', {
    get: function () {
      return this.encryptionScheme.maxMessageLength();
    }
  });
  /**
   * Caching key data
   */

  RSAKey.prototype.$$recalculateCache = function () {
    this.cache = this.cache || {}; // Bit & byte length

    this.cache.keyBitLength = this.n.bitLength();
    this.cache.keyByteLength = this.cache.keyBitLength + 6 >> 3;
  };

  return RSAKey;
}();

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * PKCS1 padding and signature scheme
 */
var BigInteger = __webpack_require__(2);

var crypt = __webpack_require__(1);

var constants = __webpack_require__(4);

var SIGN_INFO_HEAD = {
  md2: Buffer.from('3020300c06082a864886f70d020205000410', 'hex'),
  md5: Buffer.from('3020300c06082a864886f70d020505000410', 'hex'),
  sha1: Buffer.from('3021300906052b0e03021a05000414', 'hex'),
  sha224: Buffer.from('302d300d06096086480165030402040500041c', 'hex'),
  sha256: Buffer.from('3031300d060960864801650304020105000420', 'hex'),
  sha384: Buffer.from('3041300d060960864801650304020205000430', 'hex'),
  sha512: Buffer.from('3051300d060960864801650304020305000440', 'hex'),
  ripemd160: Buffer.from('3021300906052b2403020105000414', 'hex'),
  rmd160: Buffer.from('3021300906052b2403020105000414', 'hex')
};
var SIGN_ALG_TO_HASH_ALIASES = {
  'ripemd160': 'rmd160'
};
var DEFAULT_HASH_FUNCTION = 'sha256';
module.exports = {
  isEncryption: true,
  isSignature: true
};

module.exports.makeScheme = function (key, options) {
  function Scheme(key, options) {
    this.key = key;
    this.options = options;
  }

  Scheme.prototype.maxMessageLength = function () {
    if (this.options.encryptionSchemeOptions && this.options.encryptionSchemeOptions.padding == constants.RSA_NO_PADDING) {
      return this.key.encryptedDataLength;
    }

    return this.key.encryptedDataLength - 11;
  };
  /**
   * Pad input Buffer to encryptedDataLength bytes, and return Buffer.from
   * alg: PKCS#1
   * @param buffer
   * @returns {Buffer}
   */


  Scheme.prototype.encPad = function (buffer, options) {
    options = options || {};
    var filled;

    if (buffer.length > this.key.maxMessageLength) {
      throw new Error("Message too long for RSA (n=" + this.key.encryptedDataLength + ", l=" + buffer.length + ")");
    }

    if (this.options.encryptionSchemeOptions && this.options.encryptionSchemeOptions.padding == constants.RSA_NO_PADDING) {
      //RSA_NO_PADDING treated like JAVA left pad with zero character
      filled = Buffer.alloc(this.key.maxMessageLength - buffer.length);
      filled.fill(0);
      return Buffer.concat([filled, buffer]);
    }
    /* Type 1: zeros padding for private key encrypt */


    if (options.type === 1) {
      filled = Buffer.alloc(this.key.encryptedDataLength - buffer.length - 1);
      filled.fill(0xff, 0, filled.length - 1);
      filled[0] = 1;
      filled[filled.length - 1] = 0;
      return Buffer.concat([filled, buffer]);
    } else {
      /* random padding for public key encrypt */
      filled = Buffer.alloc(this.key.encryptedDataLength - buffer.length);
      filled[0] = 0;
      filled[1] = 2;
      var rand = crypt.randomBytes(filled.length - 3);

      for (var i = 0; i < rand.length; i++) {
        var r = rand[i];

        while (r === 0) {
          // non-zero only
          r = crypt.randomBytes(1)[0];
        }

        filled[i + 2] = r;
      }

      filled[filled.length - 1] = 0;
      return Buffer.concat([filled, buffer]);
    }
  };
  /**
   * Unpad input Buffer and, if valid, return the Buffer object
   * alg: PKCS#1 (type 2, random)
   * @param buffer
   * @returns {Buffer}
   */


  Scheme.prototype.encUnPad = function (buffer, options) {
    options = options || {};
    var i = 0;

    if (this.options.encryptionSchemeOptions && this.options.encryptionSchemeOptions.padding == constants.RSA_NO_PADDING) {
      //RSA_NO_PADDING treated like JAVA left pad with zero character
      var unPad;

      if (typeof buffer.lastIndexOf == "function") {
        //patch for old node version
        unPad = buffer.slice(buffer.lastIndexOf('\0') + 1, buffer.length);
      } else {
        unPad = buffer.slice(String.prototype.lastIndexOf.call(buffer, '\0') + 1, buffer.length);
      }

      return unPad;
    }

    if (buffer.length < 4) {
      return null;
    }
    /* Type 1: zeros padding for private key decrypt */


    if (options.type === 1) {
      if (buffer[0] !== 0 || buffer[1] !== 1) {
        return null;
      }

      i = 3;

      while (buffer[i] !== 0) {
        if (buffer[i] != 0xFF || ++i >= buffer.length) {
          return null;
        }
      }
    } else {
      /* random padding for public key decrypt */
      if (buffer[0] !== 0 || buffer[1] !== 2) {
        return null;
      }

      i = 3;

      while (buffer[i] !== 0) {
        if (++i >= buffer.length) {
          return null;
        }
      }
    }

    return buffer.slice(i + 1, buffer.length);
  };

  Scheme.prototype.sign = function (buffer) {
    var hashAlgorithm = this.options.signingSchemeOptions.hash || DEFAULT_HASH_FUNCTION;

    if (this.options.environment === 'browser') {
      hashAlgorithm = SIGN_ALG_TO_HASH_ALIASES[hashAlgorithm] || hashAlgorithm;
      var hasher = crypt.createHash(hashAlgorithm);
      hasher.update(buffer);
      var hash = this.pkcs1pad(hasher.digest(), hashAlgorithm);
      var res = this.key.$doPrivate(new BigInteger(hash)).toBuffer(this.key.encryptedDataLength);
      return res;
    } else {
      var signer = crypt.createSign('RSA-' + hashAlgorithm.toUpperCase());
      signer.update(buffer);
      return signer.sign(this.options.rsaUtils.exportKey('private'));
    }
  };

  Scheme.prototype.verify = function (buffer, signature, signature_encoding) {
    if (this.options.encryptionSchemeOptions && this.options.encryptionSchemeOptions.padding == constants.RSA_NO_PADDING) {
      //RSA_NO_PADDING has no verify data
      return false;
    }

    var hashAlgorithm = this.options.signingSchemeOptions.hash || DEFAULT_HASH_FUNCTION;

    if (this.options.environment === 'browser') {
      hashAlgorithm = SIGN_ALG_TO_HASH_ALIASES[hashAlgorithm] || hashAlgorithm;

      if (signature_encoding) {
        signature = Buffer.from(signature, signature_encoding);
      }

      var hasher = crypt.createHash(hashAlgorithm);
      hasher.update(buffer);
      var hash = this.pkcs1pad(hasher.digest(), hashAlgorithm);
      var m = this.key.$doPublic(new BigInteger(signature));
      return m.toBuffer().toString('hex') == hash.toString('hex');
    } else {
      var verifier = crypt.createVerify('RSA-' + hashAlgorithm.toUpperCase());
      verifier.update(buffer);
      return verifier.verify(this.options.rsaUtils.exportKey('public'), signature, signature_encoding);
    }
  };
  /**
   * PKCS#1 zero pad input buffer to max data length
   * @param hashBuf
   * @param hashAlgorithm
   * @returns {*}
   */


  Scheme.prototype.pkcs0pad = function (buffer) {
    var filled = Buffer.alloc(this.key.maxMessageLength - buffer.length);
    filled.fill(0);
    return Buffer.concat([filled, buffer]);
  };

  Scheme.prototype.pkcs0unpad = function (buffer) {
    var unPad;

    if (typeof buffer.lastIndexOf == "function") {
      //patch for old node version
      unPad = buffer.slice(buffer.lastIndexOf('\0') + 1, buffer.length);
    } else {
      unPad = buffer.slice(String.prototype.lastIndexOf.call(buffer, '\0') + 1, buffer.length);
    }

    return unPad;
  };
  /**
   * PKCS#1 pad input buffer to max data length
   * @param hashBuf
   * @param hashAlgorithm
   * @returns {*}
   */


  Scheme.prototype.pkcs1pad = function (hashBuf, hashAlgorithm) {
    var digest = SIGN_INFO_HEAD[hashAlgorithm];

    if (!digest) {
      throw Error('Unsupported hash algorithm');
    }

    var data = Buffer.concat([digest, hashBuf]);

    if (data.length + 10 > this.key.encryptedDataLength) {
      throw Error('Key is too short for signing algorithm (' + hashAlgorithm + ')');
    }

    var filled = Buffer.alloc(this.key.encryptedDataLength - data.length - 1);
    filled.fill(0xff, 0, filled.length - 1);
    filled[0] = 1;
    filled[filled.length - 1] = 0;
    var res = Buffer.concat([filled, data]);
    return res;
  };

  return new Scheme(key, options);
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * PKCS_OAEP signature scheme
 */
var BigInteger = __webpack_require__(2);

var crypt = __webpack_require__(1);

module.exports = {
  isEncryption: true,
  isSignature: false
};
module.exports.digestLength = {
  md4: 16,
  md5: 16,
  ripemd160: 20,
  rmd160: 20,
  sha1: 20,
  sha224: 28,
  sha256: 32,
  sha384: 48,
  sha512: 64
};
var DEFAULT_HASH_FUNCTION = 'sha1';
/*
 * OAEP Mask Generation Function 1
 * Generates a buffer full of pseudorandom bytes given seed and maskLength.
 * Giving the same seed, maskLength, and hashFunction will result in the same exact byte values in the buffer.
 *
 * https://tools.ietf.org/html/rfc3447#appendix-B.2.1
 *
 * Parameters:
 * seed			[Buffer]	The pseudo random seed for this function
 * maskLength	[int]		The length of the output
 * hashFunction	[String]	The hashing function to use. Will accept any valid crypto hash. Default "sha1"
 *		Supports "sha1" and "sha256".
 *		To add another algorythm the algorythem must be accepted by crypto.createHash, and then the length of the output of the hash function (the digest) must be added to the digestLength object below.
 *		Most RSA implementations will be expecting sha1
 */

module.exports.eme_oaep_mgf1 = function (seed, maskLength, hashFunction) {
  hashFunction = hashFunction || DEFAULT_HASH_FUNCTION;
  var hLen = module.exports.digestLength[hashFunction];
  var count = Math.ceil(maskLength / hLen);
  var T = Buffer.alloc(hLen * count);
  var c = Buffer.alloc(4);

  for (var i = 0; i < count; ++i) {
    var hash = crypt.createHash(hashFunction);
    hash.update(seed);
    c.writeUInt32BE(i, 0);
    hash.update(c);
    hash.digest().copy(T, i * hLen);
  }

  return T.slice(0, maskLength);
};

module.exports.makeScheme = function (key, options) {
  function Scheme(key, options) {
    this.key = key;
    this.options = options;
  }

  Scheme.prototype.maxMessageLength = function () {
    return this.key.encryptedDataLength - 2 * module.exports.digestLength[this.options.encryptionSchemeOptions.hash || DEFAULT_HASH_FUNCTION] - 2;
  };
  /**
   * Pad input
   * alg: PKCS1_OAEP
   *
   * https://tools.ietf.org/html/rfc3447#section-7.1.1
   */


  Scheme.prototype.encPad = function (buffer) {
    var hash = this.options.encryptionSchemeOptions.hash || DEFAULT_HASH_FUNCTION;
    var mgf = this.options.encryptionSchemeOptions.mgf || module.exports.eme_oaep_mgf1;
    var label = this.options.encryptionSchemeOptions.label || Buffer.alloc(0);
    var emLen = this.key.encryptedDataLength;
    var hLen = module.exports.digestLength[hash]; // Make sure we can put message into an encoded message of emLen bytes

    if (buffer.length > emLen - 2 * hLen - 2) {
      throw new Error("Message is too long to encode into an encoded message with a length of " + emLen + " bytes, increase" + "emLen to fix this error (minimum value for given parameters and options: " + (emLen - 2 * hLen - 2) + ")");
    }

    var lHash = crypt.createHash(hash);
    lHash.update(label);
    lHash = lHash.digest();
    var PS = Buffer.alloc(emLen - buffer.length - 2 * hLen - 1); // Padding "String"

    PS.fill(0); // Fill the buffer with octets of 0

    PS[PS.length - 1] = 1;
    var DB = Buffer.concat([lHash, PS, buffer]);
    var seed = crypt.randomBytes(hLen); // mask = dbMask

    var mask = mgf(seed, DB.length, hash); // XOR DB and dbMask together.

    for (var i = 0; i < DB.length; i++) {
      DB[i] ^= mask[i];
    } // DB = maskedDB
    // mask = seedMask


    mask = mgf(DB, hLen, hash); // XOR seed and seedMask together.

    for (i = 0; i < seed.length; i++) {
      seed[i] ^= mask[i];
    } // seed = maskedSeed


    var em = Buffer.alloc(1 + seed.length + DB.length);
    em[0] = 0;
    seed.copy(em, 1);
    DB.copy(em, 1 + seed.length);
    return em;
  };
  /**
   * Unpad input
   * alg: PKCS1_OAEP
   *
   * Note: This method works within the buffer given and modifies the values. It also returns a slice of the EM as the return Message.
   * If the implementation requires that the EM parameter be unmodified then the implementation should pass in a clone of the EM buffer.
   *
   * https://tools.ietf.org/html/rfc3447#section-7.1.2
   */


  Scheme.prototype.encUnPad = function (buffer) {
    var hash = this.options.encryptionSchemeOptions.hash || DEFAULT_HASH_FUNCTION;
    var mgf = this.options.encryptionSchemeOptions.mgf || module.exports.eme_oaep_mgf1;
    var label = this.options.encryptionSchemeOptions.label || Buffer.alloc(0);
    var hLen = module.exports.digestLength[hash]; // Check to see if buffer is a properly encoded OAEP message

    if (buffer.length < 2 * hLen + 2) {
      throw new Error("Error decoding message, the supplied message is not long enough to be a valid OAEP encoded message");
    }

    var seed = buffer.slice(1, hLen + 1); // seed = maskedSeed

    var DB = buffer.slice(1 + hLen); // DB = maskedDB

    var mask = mgf(DB, hLen, hash); // seedMask
    // XOR maskedSeed and seedMask together to get the original seed.

    for (var i = 0; i < seed.length; i++) {
      seed[i] ^= mask[i];
    }

    mask = mgf(seed, DB.length, hash); // dbMask
    // XOR DB and dbMask together to get the original data block.

    for (i = 0; i < DB.length; i++) {
      DB[i] ^= mask[i];
    }

    var lHash = crypt.createHash(hash);
    lHash.update(label);
    lHash = lHash.digest();
    var lHashEM = DB.slice(0, hLen);

    if (lHashEM.toString("hex") != lHash.toString("hex")) {
      throw new Error("Error decoding message, the lHash calculated from the label provided and the lHash in the encrypted data do not match.");
    } // Filter out padding


    i = hLen;

    while (DB[i++] === 0 && i < DB.length);

    if (DB[i - 1] != 1) {
      throw new Error("Error decoding message, there is no padding message separator byte");
    }

    return DB.slice(i); // Message
  };

  return new Scheme(key, options);
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * PSS signature scheme
 */
var BigInteger = __webpack_require__(2);

var crypt = __webpack_require__(1);

module.exports = {
  isEncryption: false,
  isSignature: true
};
var DEFAULT_HASH_FUNCTION = 'sha1';
var DEFAULT_SALT_LENGTH = 20;

module.exports.makeScheme = function (key, options) {
  var OAEP = __webpack_require__(3).pkcs1_oaep;
  /**
   * @param key
   * @param options
   * options    [Object]    An object that contains the following keys that specify certain options for encoding.
   *  └>signingSchemeOptions
   *     ├>hash    [String]    Hash function to use when encoding and generating masks. Must be a string accepted by node's crypto.createHash function. (default = "sha1")
   *     ├>mgf    [function]    The mask generation function to use when encoding. (default = mgf1SHA1)
   *     └>sLen    [uint]        The length of the salt to generate. (default = 20)
   * @constructor
   */


  function Scheme(key, options) {
    this.key = key;
    this.options = options;
  }

  Scheme.prototype.sign = function (buffer) {
    var mHash = crypt.createHash(this.options.signingSchemeOptions.hash || DEFAULT_HASH_FUNCTION);
    mHash.update(buffer);
    var encoded = this.emsa_pss_encode(mHash.digest(), this.key.keySize - 1);
    return this.key.$doPrivate(new BigInteger(encoded)).toBuffer(this.key.encryptedDataLength);
  };

  Scheme.prototype.verify = function (buffer, signature, signature_encoding) {
    if (signature_encoding) {
      signature = Buffer.from(signature, signature_encoding);
    }

    signature = new BigInteger(signature);
    var emLen = Math.ceil((this.key.keySize - 1) / 8);
    var m = this.key.$doPublic(signature).toBuffer(emLen);
    var mHash = crypt.createHash(this.options.signingSchemeOptions.hash || DEFAULT_HASH_FUNCTION);
    mHash.update(buffer);
    return this.emsa_pss_verify(mHash.digest(), m, this.key.keySize - 1);
  };
  /*
   * https://tools.ietf.org/html/rfc3447#section-9.1.1
   *
   * mHash	[Buffer]	Hashed message to encode
   * emBits	[uint]		Maximum length of output in bits. Must be at least 8hLen + 8sLen + 9 (hLen = Hash digest length in bytes | sLen = length of salt in bytes)
   * @returns {Buffer} The encoded message
   */


  Scheme.prototype.emsa_pss_encode = function (mHash, emBits) {
    var hash = this.options.signingSchemeOptions.hash || DEFAULT_HASH_FUNCTION;
    var mgf = this.options.signingSchemeOptions.mgf || OAEP.eme_oaep_mgf1;
    var sLen = this.options.signingSchemeOptions.saltLength || DEFAULT_SALT_LENGTH;
    var hLen = OAEP.digestLength[hash];
    var emLen = Math.ceil(emBits / 8);

    if (emLen < hLen + sLen + 2) {
      throw new Error("Output length passed to emBits(" + emBits + ") is too small for the options " + "specified(" + hash + ", " + sLen + "). To fix this issue increase the value of emBits. (minimum size: " + (8 * hLen + 8 * sLen + 9) + ")");
    }

    var salt = crypt.randomBytes(sLen);
    var Mapostrophe = Buffer.alloc(8 + hLen + sLen);
    Mapostrophe.fill(0, 0, 8);
    mHash.copy(Mapostrophe, 8);
    salt.copy(Mapostrophe, 8 + mHash.length);
    var H = crypt.createHash(hash);
    H.update(Mapostrophe);
    H = H.digest();
    var PS = Buffer.alloc(emLen - salt.length - hLen - 2);
    PS.fill(0);
    var DB = Buffer.alloc(PS.length + 1 + salt.length);
    PS.copy(DB);
    DB[PS.length] = 0x01;
    salt.copy(DB, PS.length + 1);
    var dbMask = mgf(H, DB.length, hash); // XOR DB and dbMask together

    var maskedDB = Buffer.alloc(DB.length);

    for (var i = 0; i < dbMask.length; i++) {
      maskedDB[i] = DB[i] ^ dbMask[i];
    }

    var bits = 8 * emLen - emBits;
    var mask = 255 ^ 255 >> 8 - bits << 8 - bits;
    maskedDB[0] = maskedDB[0] & mask;
    var EM = Buffer.alloc(maskedDB.length + H.length + 1);
    maskedDB.copy(EM, 0);
    H.copy(EM, maskedDB.length);
    EM[EM.length - 1] = 0xbc;
    return EM;
  };
  /*
   * https://tools.ietf.org/html/rfc3447#section-9.1.2
   *
   * mHash	[Buffer]	Hashed message
   * EM		[Buffer]	Signature
   * emBits	[uint]		Length of EM in bits. Must be at least 8hLen + 8sLen + 9 to be a valid signature. (hLen = Hash digest length in bytes | sLen = length of salt in bytes)
   * @returns {Boolean} True if signature(EM) matches message(M)
   */


  Scheme.prototype.emsa_pss_verify = function (mHash, EM, emBits) {
    var hash = this.options.signingSchemeOptions.hash || DEFAULT_HASH_FUNCTION;
    var mgf = this.options.signingSchemeOptions.mgf || OAEP.eme_oaep_mgf1;
    var sLen = this.options.signingSchemeOptions.saltLength || DEFAULT_SALT_LENGTH;
    var hLen = OAEP.digestLength[hash];
    var emLen = Math.ceil(emBits / 8);

    if (emLen < hLen + sLen + 2 || EM[EM.length - 1] != 0xbc) {
      return false;
    }

    var DB = Buffer.alloc(emLen - hLen - 1);
    EM.copy(DB, 0, 0, emLen - hLen - 1);
    var mask = 0;

    for (var i = 0, bits = 8 * emLen - emBits; i < bits; i++) {
      mask |= 1 << 7 - i;
    }

    if ((DB[0] & mask) !== 0) {
      return false;
    }

    var H = EM.slice(emLen - hLen - 1, emLen - 1);
    var dbMask = mgf(H, DB.length, hash); // Unmask DB

    for (i = 0; i < DB.length; i++) {
      DB[i] ^= dbMask[i];
    }

    bits = 8 * emLen - emBits;
    mask = 255 ^ 255 >> 8 - bits << 8 - bits;
    DB[0] = DB[0] & mask; // Filter out padding

    for (i = 0; DB[i] === 0 && i < DB.length; i++);

    if (DB[i] != 1) {
      return false;
    }

    var salt = DB.slice(DB.length - sLen);
    var Mapostrophe = Buffer.alloc(8 + hLen + sLen);
    Mapostrophe.fill(0, 0, 8);
    mHash.copy(Mapostrophe, 8);
    salt.copy(Mapostrophe, 8 + mHash.length);
    var Hapostrophe = crypt.createHash(hash);
    Hapostrophe.update(Mapostrophe);
    Hapostrophe = Hapostrophe.digest();
    return H.toString("hex") === Hapostrophe.toString("hex");
  };

  return new Scheme(key, options);
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var crypt = __webpack_require__(1);

module.exports = {
  getEngine: function (keyPair, options) {
    var engine = __webpack_require__(8);

    if (options.environment === 'node') {
      if (typeof crypt.publicEncrypt === 'function' && typeof crypt.privateDecrypt === 'function') {
        if (typeof crypt.privateEncrypt === 'function' && typeof crypt.publicDecrypt === 'function') {
          engine = __webpack_require__(18);
        } else {
          engine = __webpack_require__(19);
        }
      }
    }

    return engine(keyPair, options);
  }
};

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var crypto = __webpack_require__(1);

var constants = __webpack_require__(4);

var schemes = __webpack_require__(3);

module.exports = function (keyPair, options) {
  var pkcs1Scheme = schemes.pkcs1.makeScheme(keyPair, options);
  return {
    encrypt: function (buffer, usePrivate) {
      var padding;

      if (usePrivate) {
        padding = constants.RSA_PKCS1_PADDING;

        if (options.encryptionSchemeOptions && options.encryptionSchemeOptions.padding) {
          padding = options.encryptionSchemeOptions.padding;
        }

        return crypto.privateEncrypt({
          key: options.rsaUtils.exportKey('private'),
          padding: padding
        }, buffer);
      } else {
        padding = constants.RSA_PKCS1_OAEP_PADDING;

        if (options.encryptionScheme === 'pkcs1') {
          padding = constants.RSA_PKCS1_PADDING;
        }

        if (options.encryptionSchemeOptions && options.encryptionSchemeOptions.padding) {
          padding = options.encryptionSchemeOptions.padding;
        }

        var data = buffer;

        if (padding === constants.RSA_NO_PADDING) {
          data = pkcs1Scheme.pkcs0pad(buffer);
        }

        return crypto.publicEncrypt({
          key: options.rsaUtils.exportKey('public'),
          padding: padding
        }, data);
      }
    },
    decrypt: function (buffer, usePublic) {
      var padding;

      if (usePublic) {
        padding = constants.RSA_PKCS1_PADDING;

        if (options.encryptionSchemeOptions && options.encryptionSchemeOptions.padding) {
          padding = options.encryptionSchemeOptions.padding;
        }

        return crypto.publicDecrypt({
          key: options.rsaUtils.exportKey('public'),
          padding: padding
        }, buffer);
      } else {
        padding = constants.RSA_PKCS1_OAEP_PADDING;

        if (options.encryptionScheme === 'pkcs1') {
          padding = constants.RSA_PKCS1_PADDING;
        }

        if (options.encryptionSchemeOptions && options.encryptionSchemeOptions.padding) {
          padding = options.encryptionSchemeOptions.padding;
        }

        var res = crypto.privateDecrypt({
          key: options.rsaUtils.exportKey('private'),
          padding: padding
        }, buffer);

        if (padding === constants.RSA_NO_PADDING) {
          return pkcs1Scheme.pkcs0unpad(res);
        }

        return res;
      }
    }
  };
};

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var crypto = __webpack_require__(1);

var constants = __webpack_require__(4);

var schemes = __webpack_require__(3);

module.exports = function (keyPair, options) {
  var jsEngine = __webpack_require__(8)(keyPair, options);

  var pkcs1Scheme = schemes.pkcs1.makeScheme(keyPair, options);
  return {
    encrypt: function (buffer, usePrivate) {
      if (usePrivate) {
        return jsEngine.encrypt(buffer, usePrivate);
      }

      var padding = constants.RSA_PKCS1_OAEP_PADDING;

      if (options.encryptionScheme === 'pkcs1') {
        padding = constants.RSA_PKCS1_PADDING;
      }

      if (options.encryptionSchemeOptions && options.encryptionSchemeOptions.padding) {
        padding = options.encryptionSchemeOptions.padding;
      }

      var data = buffer;

      if (padding === constants.RSA_NO_PADDING) {
        data = pkcs1Scheme.pkcs0pad(buffer);
      }

      return crypto.publicEncrypt({
        key: options.rsaUtils.exportKey('public'),
        padding: padding
      }, data);
    },
    decrypt: function (buffer, usePublic) {
      if (usePublic) {
        return jsEngine.decrypt(buffer, usePublic);
      }

      var padding = constants.RSA_PKCS1_OAEP_PADDING;

      if (options.encryptionScheme === 'pkcs1') {
        padding = constants.RSA_PKCS1_PADDING;
      }

      if (options.encryptionSchemeOptions && options.encryptionSchemeOptions.padding) {
        padding = options.encryptionSchemeOptions.padding;
      }

      var res = crypto.privateDecrypt({
        key: options.rsaUtils.exportKey('private'),
        padding: padding
      }, buffer);

      if (padding === constants.RSA_NO_PADDING) {
        return pkcs1Scheme.pkcs0unpad(res);
      }

      return res;
    }
  };
};

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

// Copyright 2011 Mark Cavage <mcavage@gmail.com> All rights reserved.
var errors = __webpack_require__(6);

var types = __webpack_require__(7);

var Reader = __webpack_require__(21);

var Writer = __webpack_require__(23); // --- Exports


module.exports = {
  Reader: Reader,
  Writer: Writer
};

for (var t in types) {
  if (types.hasOwnProperty(t)) module.exports[t] = types[t];
}

for (var e in errors) {
  if (errors.hasOwnProperty(e)) module.exports[e] = errors[e];
}

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

// Copyright 2011 Mark Cavage <mcavage@gmail.com> All rights reserved.
var assert = __webpack_require__(9);

var Buffer = __webpack_require__(10).Buffer;

var ASN1 = __webpack_require__(7);

var errors = __webpack_require__(6); // --- Globals


var newInvalidAsn1Error = errors.newInvalidAsn1Error; // --- API

function Reader(data) {
  if (!data || !Buffer.isBuffer(data)) throw new TypeError('data must be a node Buffer');
  this._buf = data;
  this._size = data.length; // These hold the "current" state

  this._len = 0;
  this._offset = 0;
}

Object.defineProperty(Reader.prototype, 'length', {
  enumerable: true,
  get: function () {
    return this._len;
  }
});
Object.defineProperty(Reader.prototype, 'offset', {
  enumerable: true,
  get: function () {
    return this._offset;
  }
});
Object.defineProperty(Reader.prototype, 'remain', {
  get: function () {
    return this._size - this._offset;
  }
});
Object.defineProperty(Reader.prototype, 'buffer', {
  get: function () {
    return this._buf.slice(this._offset);
  }
});
/**
 * Reads a single byte and advances offset; you can pass in `true` to make this
 * a "peek" operation (i.e., get the byte, but don't advance the offset).
 *
 * @param {Boolean} peek true means don't move offset.
 * @return {Number} the next byte, null if not enough data.
 */

Reader.prototype.readByte = function (peek) {
  if (this._size - this._offset < 1) return null;
  var b = this._buf[this._offset] & 0xff;
  if (!peek) this._offset += 1;
  return b;
};

Reader.prototype.peek = function () {
  return this.readByte(true);
};
/**
 * Reads a (potentially) variable length off the BER buffer.  This call is
 * not really meant to be called directly, as callers have to manipulate
 * the internal buffer afterwards.
 *
 * As a result of this call, you can call `Reader.length`, until the
 * next thing called that does a readLength.
 *
 * @return {Number} the amount of offset to advance the buffer.
 * @throws {InvalidAsn1Error} on bad ASN.1
 */


Reader.prototype.readLength = function (offset) {
  if (offset === undefined) offset = this._offset;
  if (offset >= this._size) return null;
  var lenB = this._buf[offset++] & 0xff;
  if (lenB === null) return null;

  if ((lenB & 0x80) === 0x80) {
    lenB &= 0x7f;
    if (lenB === 0) throw newInvalidAsn1Error('Indefinite length not supported');
    if (lenB > 4) throw newInvalidAsn1Error('encoding too long');
    if (this._size - offset < lenB) return null;
    this._len = 0;

    for (var i = 0; i < lenB; i++) this._len = (this._len << 8) + (this._buf[offset++] & 0xff);
  } else {
    // Wasn't a variable length
    this._len = lenB;
  }

  return offset;
};
/**
 * Parses the next sequence in this BER buffer.
 *
 * To get the length of the sequence, call `Reader.length`.
 *
 * @return {Number} the sequence's tag.
 */


Reader.prototype.readSequence = function (tag) {
  var seq = this.peek();
  if (seq === null) return null;
  if (tag !== undefined && tag !== seq) throw newInvalidAsn1Error('Expected 0x' + tag.toString(16) + ': got 0x' + seq.toString(16));
  var o = this.readLength(this._offset + 1); // stored in `length`

  if (o === null) return null;
  this._offset = o;
  return seq;
};

Reader.prototype.readInt = function () {
  return this._readTag(ASN1.Integer);
};

Reader.prototype.readBoolean = function () {
  return this._readTag(ASN1.Boolean) === 0 ? false : true;
};

Reader.prototype.readEnumeration = function () {
  return this._readTag(ASN1.Enumeration);
};

Reader.prototype.readString = function (tag, retbuf) {
  if (!tag) tag = ASN1.OctetString;
  var b = this.peek();
  if (b === null) return null;
  if (b !== tag) throw newInvalidAsn1Error('Expected 0x' + tag.toString(16) + ': got 0x' + b.toString(16));
  var o = this.readLength(this._offset + 1); // stored in `length`

  if (o === null) return null;
  if (this.length > this._size - o) return null;
  this._offset = o;
  if (this.length === 0) return retbuf ? Buffer.alloc(0) : '';

  var str = this._buf.slice(this._offset, this._offset + this.length);

  this._offset += this.length;
  return retbuf ? str : str.toString('utf8');
};

Reader.prototype.readOID = function (tag) {
  if (!tag) tag = ASN1.OID;
  var b = this.readString(tag, true);
  if (b === null) return null;
  var values = [];
  var value = 0;

  for (var i = 0; i < b.length; i++) {
    var byte = b[i] & 0xff;
    value <<= 7;
    value += byte & 0x7f;

    if ((byte & 0x80) === 0) {
      values.push(value);
      value = 0;
    }
  }

  value = values.shift();
  values.unshift(value % 40);
  values.unshift(value / 40 >> 0);
  return values.join('.');
};

Reader.prototype._readTag = function (tag) {
  assert.ok(tag !== undefined);
  var b = this.peek();
  if (b === null) return null;
  if (b !== tag) throw newInvalidAsn1Error('Expected 0x' + tag.toString(16) + ': got 0x' + b.toString(16));
  var o = this.readLength(this._offset + 1); // stored in `length`

  if (o === null) return null;
  if (this.length > 4) throw newInvalidAsn1Error('Integer too long: ' + this.length);
  if (this.length > this._size - o) return null;
  this._offset = o;
  var fb = this._buf[this._offset];
  var value = 0;

  for (var i = 0; i < this.length; i++) {
    value <<= 8;
    value |= this._buf[this._offset++] & 0xff;
  }

  if ((fb & 0x80) === 0x80 && i !== 4) value -= 1 << i * 8;
  return value >> 0;
}; // --- Exported API


module.exports = Reader;

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = require("buffer");

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

// Copyright 2011 Mark Cavage <mcavage@gmail.com> All rights reserved.
var assert = __webpack_require__(9);

var Buffer = __webpack_require__(10).Buffer;

var ASN1 = __webpack_require__(7);

var errors = __webpack_require__(6); // --- Globals


var newInvalidAsn1Error = errors.newInvalidAsn1Error;
var DEFAULT_OPTS = {
  size: 1024,
  growthFactor: 8
}; // --- Helpers

function merge(from, to) {
  assert.ok(from);
  assert.equal(typeof from, 'object');
  assert.ok(to);
  assert.equal(typeof to, 'object');
  var keys = Object.getOwnPropertyNames(from);
  keys.forEach(function (key) {
    if (to[key]) return;
    var value = Object.getOwnPropertyDescriptor(from, key);
    Object.defineProperty(to, key, value);
  });
  return to;
} // --- API


function Writer(options) {
  options = merge(DEFAULT_OPTS, options || {});
  this._buf = Buffer.alloc(options.size || 1024);
  this._size = this._buf.length;
  this._offset = 0;
  this._options = options; // A list of offsets in the buffer where we need to insert
  // sequence tag/len pairs.

  this._seq = [];
}

Object.defineProperty(Writer.prototype, 'buffer', {
  get: function () {
    if (this._seq.length) throw newInvalidAsn1Error(this._seq.length + ' unended sequence(s)');
    return this._buf.slice(0, this._offset);
  }
});

Writer.prototype.writeByte = function (b) {
  if (typeof b !== 'number') throw new TypeError('argument must be a Number');

  this._ensure(1);

  this._buf[this._offset++] = b;
};

Writer.prototype.writeInt = function (i, tag) {
  if (typeof i !== 'number') throw new TypeError('argument must be a Number');
  if (typeof tag !== 'number') tag = ASN1.Integer;
  var sz = 4;

  while (((i & 0xff800000) === 0 || (i & 0xff800000) === 0xff800000 >> 0) && sz > 1) {
    sz--;
    i <<= 8;
  }

  if (sz > 4) throw newInvalidAsn1Error('BER ints cannot be > 0xffffffff');

  this._ensure(2 + sz);

  this._buf[this._offset++] = tag;
  this._buf[this._offset++] = sz;

  while (sz-- > 0) {
    this._buf[this._offset++] = (i & 0xff000000) >>> 24;
    i <<= 8;
  }
};

Writer.prototype.writeNull = function () {
  this.writeByte(ASN1.Null);
  this.writeByte(0x00);
};

Writer.prototype.writeEnumeration = function (i, tag) {
  if (typeof i !== 'number') throw new TypeError('argument must be a Number');
  if (typeof tag !== 'number') tag = ASN1.Enumeration;
  return this.writeInt(i, tag);
};

Writer.prototype.writeBoolean = function (b, tag) {
  if (typeof b !== 'boolean') throw new TypeError('argument must be a Boolean');
  if (typeof tag !== 'number') tag = ASN1.Boolean;

  this._ensure(3);

  this._buf[this._offset++] = tag;
  this._buf[this._offset++] = 0x01;
  this._buf[this._offset++] = b ? 0xff : 0x00;
};

Writer.prototype.writeString = function (s, tag) {
  if (typeof s !== 'string') throw new TypeError('argument must be a string (was: ' + typeof s + ')');
  if (typeof tag !== 'number') tag = ASN1.OctetString;
  var len = Buffer.byteLength(s);
  this.writeByte(tag);
  this.writeLength(len);

  if (len) {
    this._ensure(len);

    this._buf.write(s, this._offset);

    this._offset += len;
  }
};

Writer.prototype.writeBuffer = function (buf, tag) {
  if (typeof tag !== 'number') throw new TypeError('tag must be a number');
  if (!Buffer.isBuffer(buf)) throw new TypeError('argument must be a buffer');
  this.writeByte(tag);
  this.writeLength(buf.length);

  this._ensure(buf.length);

  buf.copy(this._buf, this._offset, 0, buf.length);
  this._offset += buf.length;
};

Writer.prototype.writeStringArray = function (strings) {
  if (!strings instanceof Array) throw new TypeError('argument must be an Array[String]');
  var self = this;
  strings.forEach(function (s) {
    self.writeString(s);
  });
}; // This is really to solve DER cases, but whatever for now


Writer.prototype.writeOID = function (s, tag) {
  if (typeof s !== 'string') throw new TypeError('argument must be a string');
  if (typeof tag !== 'number') tag = ASN1.OID;
  if (!/^([0-9]+\.){3,}[0-9]+$/.test(s)) throw new Error('argument is not a valid OID string');

  function encodeOctet(bytes, octet) {
    if (octet < 128) {
      bytes.push(octet);
    } else if (octet < 16384) {
      bytes.push(octet >>> 7 | 0x80);
      bytes.push(octet & 0x7F);
    } else if (octet < 2097152) {
      bytes.push(octet >>> 14 | 0x80);
      bytes.push((octet >>> 7 | 0x80) & 0xFF);
      bytes.push(octet & 0x7F);
    } else if (octet < 268435456) {
      bytes.push(octet >>> 21 | 0x80);
      bytes.push((octet >>> 14 | 0x80) & 0xFF);
      bytes.push((octet >>> 7 | 0x80) & 0xFF);
      bytes.push(octet & 0x7F);
    } else {
      bytes.push((octet >>> 28 | 0x80) & 0xFF);
      bytes.push((octet >>> 21 | 0x80) & 0xFF);
      bytes.push((octet >>> 14 | 0x80) & 0xFF);
      bytes.push((octet >>> 7 | 0x80) & 0xFF);
      bytes.push(octet & 0x7F);
    }
  }

  var tmp = s.split('.');
  var bytes = [];
  bytes.push(parseInt(tmp[0], 10) * 40 + parseInt(tmp[1], 10));
  tmp.slice(2).forEach(function (b) {
    encodeOctet(bytes, parseInt(b, 10));
  });
  var self = this;

  this._ensure(2 + bytes.length);

  this.writeByte(tag);
  this.writeLength(bytes.length);
  bytes.forEach(function (b) {
    self.writeByte(b);
  });
};

Writer.prototype.writeLength = function (len) {
  if (typeof len !== 'number') throw new TypeError('argument must be a Number');

  this._ensure(4);

  if (len <= 0x7f) {
    this._buf[this._offset++] = len;
  } else if (len <= 0xff) {
    this._buf[this._offset++] = 0x81;
    this._buf[this._offset++] = len;
  } else if (len <= 0xffff) {
    this._buf[this._offset++] = 0x82;
    this._buf[this._offset++] = len >> 8;
    this._buf[this._offset++] = len;
  } else if (len <= 0xffffff) {
    this._buf[this._offset++] = 0x83;
    this._buf[this._offset++] = len >> 16;
    this._buf[this._offset++] = len >> 8;
    this._buf[this._offset++] = len;
  } else {
    throw newInvalidAsn1Error('Length too long (> 4 bytes)');
  }
};

Writer.prototype.startSequence = function (tag) {
  if (typeof tag !== 'number') tag = ASN1.Sequence | ASN1.Constructor;
  this.writeByte(tag);

  this._seq.push(this._offset);

  this._ensure(3);

  this._offset += 3;
};

Writer.prototype.endSequence = function () {
  var seq = this._seq.pop();

  var start = seq + 3;
  var len = this._offset - start;

  if (len <= 0x7f) {
    this._shift(start, len, -2);

    this._buf[seq] = len;
  } else if (len <= 0xff) {
    this._shift(start, len, -1);

    this._buf[seq] = 0x81;
    this._buf[seq + 1] = len;
  } else if (len <= 0xffff) {
    this._buf[seq] = 0x82;
    this._buf[seq + 1] = len >> 8;
    this._buf[seq + 2] = len;
  } else if (len <= 0xffffff) {
    this._shift(start, len, 1);

    this._buf[seq] = 0x83;
    this._buf[seq + 1] = len >> 16;
    this._buf[seq + 2] = len >> 8;
    this._buf[seq + 3] = len;
  } else {
    throw newInvalidAsn1Error('Sequence too long');
  }
};

Writer.prototype._shift = function (start, len, shift) {
  assert.ok(start !== undefined);
  assert.ok(len !== undefined);
  assert.ok(shift);

  this._buf.copy(this._buf, start + shift, start, start + len);

  this._offset += shift;
};

Writer.prototype._ensure = function (len) {
  assert.ok(len);

  if (this._size - this._offset < len) {
    var sz = this._size * this._options.growthFactor;
    if (sz - this._offset < len) sz += len;
    var buf = Buffer.alloc(sz);

    this._buf.copy(buf, 0, 0, this._offset);

    this._buf = buf;
    this._size = sz;
  }
}; // --- Exported API


module.exports = Writer;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

var _ = __webpack_require__(0)._;

function formatParse(format) {
  format = format.split('-');
  var keyType = 'private';
  var keyOpt = {
    type: 'default'
  };

  for (var i = 1; i < format.length; i++) {
    if (format[i]) {
      switch (format[i]) {
        case 'public':
          keyType = format[i];
          break;

        case 'private':
          keyType = format[i];
          break;

        case 'pem':
          keyOpt.type = format[i];
          break;

        case 'der':
          keyOpt.type = format[i];
          break;
      }
    }
  }

  return {
    scheme: format[0],
    keyType: keyType,
    keyOpt: keyOpt
  };
}

module.exports = {
  pkcs1: __webpack_require__(25),
  pkcs8: __webpack_require__(26),
  components: __webpack_require__(27),
  openssh: __webpack_require__(28),
  isPrivateExport: function (format) {
    return module.exports[format] && typeof module.exports[format].privateExport === 'function';
  },
  isPrivateImport: function (format) {
    return module.exports[format] && typeof module.exports[format].privateImport === 'function';
  },
  isPublicExport: function (format) {
    return module.exports[format] && typeof module.exports[format].publicExport === 'function';
  },
  isPublicImport: function (format) {
    return module.exports[format] && typeof module.exports[format].publicImport === 'function';
  },
  detectAndImport: function (key, data, format) {
    if (format === undefined) {
      for (var scheme in module.exports) {
        if (typeof module.exports[scheme].autoImport === 'function' && module.exports[scheme].autoImport(key, data)) {
          return true;
        }
      }
    } else if (format) {
      var fmt = formatParse(format);

      if (module.exports[fmt.scheme]) {
        if (fmt.keyType === 'private') {
          module.exports[fmt.scheme].privateImport(key, data, fmt.keyOpt);
        } else {
          module.exports[fmt.scheme].publicImport(key, data, fmt.keyOpt);
        }
      } else {
        throw Error('Unsupported key format');
      }
    }

    return false;
  },
  detectAndExport: function (key, format) {
    if (format) {
      var fmt = formatParse(format);

      if (module.exports[fmt.scheme]) {
        if (fmt.keyType === 'private') {
          if (!key.isPrivate()) {
            throw Error("This is not private key");
          }

          return module.exports[fmt.scheme].privateExport(key, fmt.keyOpt);
        } else {
          if (!key.isPublic()) {
            throw Error("This is not public key");
          }

          return module.exports[fmt.scheme].publicExport(key, fmt.keyOpt);
        }
      } else {
        throw Error('Unsupported key format');
      }
    }
  }
};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

var ber = __webpack_require__(5).Ber;

var _ = __webpack_require__(0)._;

var utils = __webpack_require__(0);

const PRIVATE_OPENING_BOUNDARY = '-----BEGIN RSA PRIVATE KEY-----';
const PRIVATE_CLOSING_BOUNDARY = '-----END RSA PRIVATE KEY-----';
const PUBLIC_OPENING_BOUNDARY = '-----BEGIN RSA PUBLIC KEY-----';
const PUBLIC_CLOSING_BOUNDARY = '-----END RSA PUBLIC KEY-----';
module.exports = {
  privateExport: function (key, options) {
    options = options || {};
    var n = key.n.toBuffer();
    var d = key.d.toBuffer();
    var p = key.p.toBuffer();
    var q = key.q.toBuffer();
    var dmp1 = key.dmp1.toBuffer();
    var dmq1 = key.dmq1.toBuffer();
    var coeff = key.coeff.toBuffer();
    var length = n.length + d.length + p.length + q.length + dmp1.length + dmq1.length + coeff.length + 512; // magic

    var writer = new ber.Writer({
      size: length
    });
    writer.startSequence();
    writer.writeInt(0);
    writer.writeBuffer(n, 2);
    writer.writeInt(key.e);
    writer.writeBuffer(d, 2);
    writer.writeBuffer(p, 2);
    writer.writeBuffer(q, 2);
    writer.writeBuffer(dmp1, 2);
    writer.writeBuffer(dmq1, 2);
    writer.writeBuffer(coeff, 2);
    writer.endSequence();

    if (options.type === 'der') {
      return writer.buffer;
    } else {
      return PRIVATE_OPENING_BOUNDARY + '\n' + utils.linebrk(writer.buffer.toString('base64'), 64) + '\n' + PRIVATE_CLOSING_BOUNDARY;
    }
  },
  privateImport: function (key, data, options) {
    options = options || {};
    var buffer;

    if (options.type !== 'der') {
      if (Buffer.isBuffer(data)) {
        data = data.toString('utf8');
      }

      if (_.isString(data)) {
        var pem = utils.trimSurroundingText(data, PRIVATE_OPENING_BOUNDARY, PRIVATE_CLOSING_BOUNDARY).replace(/\s+|\n\r|\n|\r$/gm, '');
        buffer = Buffer.from(pem, 'base64');
      } else {
        throw Error('Unsupported key format');
      }
    } else if (Buffer.isBuffer(data)) {
      buffer = data;
    } else {
      throw Error('Unsupported key format');
    }

    var reader = new ber.Reader(buffer);
    reader.readSequence();
    reader.readString(2, true); // just zero

    key.setPrivate(reader.readString(2, true), // modulus
    reader.readString(2, true), // publicExponent
    reader.readString(2, true), // privateExponent
    reader.readString(2, true), // prime1
    reader.readString(2, true), // prime2
    reader.readString(2, true), // exponent1 -- d mod (p1)
    reader.readString(2, true), // exponent2 -- d mod (q-1)
    reader.readString(2, true) // coefficient -- (inverse of q) mod p
    );
  },
  publicExport: function (key, options) {
    options = options || {};
    var n = key.n.toBuffer();
    var length = n.length + 512; // magic

    var bodyWriter = new ber.Writer({
      size: length
    });
    bodyWriter.startSequence();
    bodyWriter.writeBuffer(n, 2);
    bodyWriter.writeInt(key.e);
    bodyWriter.endSequence();

    if (options.type === 'der') {
      return bodyWriter.buffer;
    } else {
      return PUBLIC_OPENING_BOUNDARY + '\n' + utils.linebrk(bodyWriter.buffer.toString('base64'), 64) + '\n' + PUBLIC_CLOSING_BOUNDARY;
    }
  },
  publicImport: function (key, data, options) {
    options = options || {};
    var buffer;

    if (options.type !== 'der') {
      if (Buffer.isBuffer(data)) {
        data = data.toString('utf8');
      }

      if (_.isString(data)) {
        var pem = utils.trimSurroundingText(data, PUBLIC_OPENING_BOUNDARY, PUBLIC_CLOSING_BOUNDARY).replace(/\s+|\n\r|\n|\r$/gm, '');
        buffer = Buffer.from(pem, 'base64');
      }
    } else if (Buffer.isBuffer(data)) {
      buffer = data;
    } else {
      throw Error('Unsupported key format');
    }

    var body = new ber.Reader(buffer);
    body.readSequence();
    key.setPublic(body.readString(0x02, true), // modulus
    body.readString(0x02, true) // publicExponent
    );
  },

  /**
   * Trying autodetect and import key
   * @param key
   * @param data
   */
  autoImport: function (key, data) {
    // [\S\s]* matches zero or more of any character
    if (/^[\S\s]*-----BEGIN RSA PRIVATE KEY-----\s*(?=(([A-Za-z0-9+/=]+\s*)+))\1-----END RSA PRIVATE KEY-----[\S\s]*$/g.test(data)) {
      module.exports.privateImport(key, data);
      return true;
    }

    if (/^[\S\s]*-----BEGIN RSA PUBLIC KEY-----\s*(?=(([A-Za-z0-9+/=]+\s*)+))\1-----END RSA PUBLIC KEY-----[\S\s]*$/g.test(data)) {
      module.exports.publicImport(key, data);
      return true;
    }

    return false;
  }
};

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

var ber = __webpack_require__(5).Ber;

var _ = __webpack_require__(0)._;

var PUBLIC_RSA_OID = '1.2.840.113549.1.1.1';

var utils = __webpack_require__(0);

const PRIVATE_OPENING_BOUNDARY = '-----BEGIN PRIVATE KEY-----';
const PRIVATE_CLOSING_BOUNDARY = '-----END PRIVATE KEY-----';
const PUBLIC_OPENING_BOUNDARY = '-----BEGIN PUBLIC KEY-----';
const PUBLIC_CLOSING_BOUNDARY = '-----END PUBLIC KEY-----';
module.exports = {
  privateExport: function (key, options) {
    options = options || {};
    var n = key.n.toBuffer();
    var d = key.d.toBuffer();
    var p = key.p.toBuffer();
    var q = key.q.toBuffer();
    var dmp1 = key.dmp1.toBuffer();
    var dmq1 = key.dmq1.toBuffer();
    var coeff = key.coeff.toBuffer();
    var length = n.length + d.length + p.length + q.length + dmp1.length + dmq1.length + coeff.length + 512; // magic

    var bodyWriter = new ber.Writer({
      size: length
    });
    bodyWriter.startSequence();
    bodyWriter.writeInt(0);
    bodyWriter.writeBuffer(n, 2);
    bodyWriter.writeInt(key.e);
    bodyWriter.writeBuffer(d, 2);
    bodyWriter.writeBuffer(p, 2);
    bodyWriter.writeBuffer(q, 2);
    bodyWriter.writeBuffer(dmp1, 2);
    bodyWriter.writeBuffer(dmq1, 2);
    bodyWriter.writeBuffer(coeff, 2);
    bodyWriter.endSequence();
    var writer = new ber.Writer({
      size: length
    });
    writer.startSequence();
    writer.writeInt(0);
    writer.startSequence();
    writer.writeOID(PUBLIC_RSA_OID);
    writer.writeNull();
    writer.endSequence();
    writer.writeBuffer(bodyWriter.buffer, 4);
    writer.endSequence();

    if (options.type === 'der') {
      return writer.buffer;
    } else {
      return PRIVATE_OPENING_BOUNDARY + '\n' + utils.linebrk(writer.buffer.toString('base64'), 64) + '\n' + PRIVATE_CLOSING_BOUNDARY;
    }
  },
  privateImport: function (key, data, options) {
    options = options || {};
    var buffer;

    if (options.type !== 'der') {
      if (Buffer.isBuffer(data)) {
        data = data.toString('utf8');
      }

      if (_.isString(data)) {
        var pem = utils.trimSurroundingText(data, PRIVATE_OPENING_BOUNDARY, PRIVATE_CLOSING_BOUNDARY).replace('-----END PRIVATE KEY-----', '').replace(/\s+|\n\r|\n|\r$/gm, '');
        buffer = Buffer.from(pem, 'base64');
      } else {
        throw Error('Unsupported key format');
      }
    } else if (Buffer.isBuffer(data)) {
      buffer = data;
    } else {
      throw Error('Unsupported key format');
    }

    var reader = new ber.Reader(buffer);
    reader.readSequence();
    reader.readInt(0);
    var header = new ber.Reader(reader.readString(0x30, true));

    if (header.readOID(0x06, true) !== PUBLIC_RSA_OID) {
      throw Error('Invalid Public key format');
    }

    var body = new ber.Reader(reader.readString(0x04, true));
    body.readSequence();
    body.readString(2, true); // just zero

    key.setPrivate(body.readString(2, true), // modulus
    body.readString(2, true), // publicExponent
    body.readString(2, true), // privateExponent
    body.readString(2, true), // prime1
    body.readString(2, true), // prime2
    body.readString(2, true), // exponent1 -- d mod (p1)
    body.readString(2, true), // exponent2 -- d mod (q-1)
    body.readString(2, true) // coefficient -- (inverse of q) mod p
    );
  },
  publicExport: function (key, options) {
    options = options || {};
    var n = key.n.toBuffer();
    var length = n.length + 512; // magic

    var bodyWriter = new ber.Writer({
      size: length
    });
    bodyWriter.writeByte(0);
    bodyWriter.startSequence();
    bodyWriter.writeBuffer(n, 2);
    bodyWriter.writeInt(key.e);
    bodyWriter.endSequence();
    var writer = new ber.Writer({
      size: length
    });
    writer.startSequence();
    writer.startSequence();
    writer.writeOID(PUBLIC_RSA_OID);
    writer.writeNull();
    writer.endSequence();
    writer.writeBuffer(bodyWriter.buffer, 3);
    writer.endSequence();

    if (options.type === 'der') {
      return writer.buffer;
    } else {
      return PUBLIC_OPENING_BOUNDARY + '\n' + utils.linebrk(writer.buffer.toString('base64'), 64) + '\n' + PUBLIC_CLOSING_BOUNDARY;
    }
  },
  publicImport: function (key, data, options) {
    options = options || {};
    var buffer;

    if (options.type !== 'der') {
      if (Buffer.isBuffer(data)) {
        data = data.toString('utf8');
      }

      if (_.isString(data)) {
        var pem = utils.trimSurroundingText(data, PUBLIC_OPENING_BOUNDARY, PUBLIC_CLOSING_BOUNDARY).replace(/\s+|\n\r|\n|\r$/gm, '');
        buffer = Buffer.from(pem, 'base64');
      }
    } else if (Buffer.isBuffer(data)) {
      buffer = data;
    } else {
      throw Error('Unsupported key format');
    }

    var reader = new ber.Reader(buffer);
    reader.readSequence();
    var header = new ber.Reader(reader.readString(0x30, true));

    if (header.readOID(0x06, true) !== PUBLIC_RSA_OID) {
      throw Error('Invalid Public key format');
    }

    var body = new ber.Reader(reader.readString(0x03, true));
    body.readByte();
    body.readSequence();
    key.setPublic(body.readString(0x02, true), // modulus
    body.readString(0x02, true) // publicExponent
    );
  },

  /**
   * Trying autodetect and import key
   * @param key
   * @param data
   */
  autoImport: function (key, data) {
    if (/^[\S\s]*-----BEGIN PRIVATE KEY-----\s*(?=(([A-Za-z0-9+/=]+\s*)+))\1-----END PRIVATE KEY-----[\S\s]*$/g.test(data)) {
      module.exports.privateImport(key, data);
      return true;
    }

    if (/^[\S\s]*-----BEGIN PUBLIC KEY-----\s*(?=(([A-Za-z0-9+/=]+\s*)+))\1-----END PUBLIC KEY-----[\S\s]*$/g.test(data)) {
      module.exports.publicImport(key, data);
      return true;
    }

    return false;
  }
};

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

var _ = __webpack_require__(0)._;

var utils = __webpack_require__(0);

module.exports = {
  privateExport: function (key, options) {
    return {
      n: key.n.toBuffer(),
      e: key.e,
      d: key.d.toBuffer(),
      p: key.p.toBuffer(),
      q: key.q.toBuffer(),
      dmp1: key.dmp1.toBuffer(),
      dmq1: key.dmq1.toBuffer(),
      coeff: key.coeff.toBuffer()
    };
  },
  privateImport: function (key, data, options) {
    if (data.n && data.e && data.d && data.p && data.q && data.dmp1 && data.dmq1 && data.coeff) {
      key.setPrivate(data.n, data.e, data.d, data.p, data.q, data.dmp1, data.dmq1, data.coeff);
    } else {
      throw Error("Invalid key data");
    }
  },
  publicExport: function (key, options) {
    return {
      n: key.n.toBuffer(),
      e: key.e
    };
  },
  publicImport: function (key, data, options) {
    if (data.n && data.e) {
      key.setPublic(data.n, data.e);
    } else {
      throw Error("Invalid key data");
    }
  },

  /**
   * Trying autodetect and import key
   * @param key
   * @param data
   */
  autoImport: function (key, data) {
    if (data.n && data.e) {
      if (data.d && data.p && data.q && data.dmp1 && data.dmq1 && data.coeff) {
        module.exports.privateImport(key, data);
        return true;
      } else {
        module.exports.publicImport(key, data);
        return true;
      }
    }

    return false;
  }
};

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

var _ = __webpack_require__(0)._;

var utils = __webpack_require__(0);

var BigInteger = __webpack_require__(2);

const PRIVATE_OPENING_BOUNDARY = "-----BEGIN OPENSSH PRIVATE KEY-----";
const PRIVATE_CLOSING_BOUNDARY = "-----END OPENSSH PRIVATE KEY-----";
module.exports = {
  privateExport: function (key, options) {
    const nbuf = key.n.toBuffer();
    let ebuf = Buffer.alloc(4);
    ebuf.writeUInt32BE(key.e, 0); //Slice leading zeroes

    while (ebuf[0] === 0) ebuf = ebuf.slice(1);

    const dbuf = key.d.toBuffer();
    const coeffbuf = key.coeff.toBuffer();
    const pbuf = key.p.toBuffer();
    const qbuf = key.q.toBuffer();
    let commentbuf;

    if (typeof key.sshcomment !== "undefined") {
      commentbuf = Buffer.from(key.sshcomment);
    } else {
      commentbuf = Buffer.from([]);
    }

    const pubkeyLength = 11 + // 32bit length, 'ssh-rsa'
    4 + ebuf.byteLength + 4 + nbuf.byteLength;
    const privateKeyLength = 8 + //64bit unused checksum
    11 + // 32bit length, 'ssh-rsa'
    4 + nbuf.byteLength + 4 + ebuf.byteLength + 4 + dbuf.byteLength + 4 + coeffbuf.byteLength + 4 + pbuf.byteLength + 4 + qbuf.byteLength + 4 + commentbuf.byteLength;
    let length = 15 + //openssh-key-v1,0x00,
    16 + // 2*(32bit length, 'none')
    4 + // 32bit length, empty string
    4 + // 32bit number of keys
    4 + // 32bit pubkey length
    pubkeyLength + 4 + //32bit private+checksum+comment+padding length
    privateKeyLength;
    const paddingLength = Math.ceil(privateKeyLength / 8) * 8 - privateKeyLength;
    length += paddingLength;
    const buf = Buffer.alloc(length);
    const writer = {
      buf: buf,
      off: 0
    };
    buf.write("openssh-key-v1", "utf8");
    buf.writeUInt8(0, 14);
    writer.off += 15;
    writeOpenSSHKeyString(writer, Buffer.from("none"));
    writeOpenSSHKeyString(writer, Buffer.from("none"));
    writeOpenSSHKeyString(writer, Buffer.from(""));
    writer.off = writer.buf.writeUInt32BE(1, writer.off);
    writer.off = writer.buf.writeUInt32BE(pubkeyLength, writer.off);
    writeOpenSSHKeyString(writer, Buffer.from("ssh-rsa"));
    writeOpenSSHKeyString(writer, ebuf);
    writeOpenSSHKeyString(writer, nbuf);
    writer.off = writer.buf.writeUInt32BE(length - 47 - pubkeyLength, writer.off);
    writer.off += 8;
    writeOpenSSHKeyString(writer, Buffer.from("ssh-rsa"));
    writeOpenSSHKeyString(writer, nbuf);
    writeOpenSSHKeyString(writer, ebuf);
    writeOpenSSHKeyString(writer, dbuf);
    writeOpenSSHKeyString(writer, coeffbuf);
    writeOpenSSHKeyString(writer, pbuf);
    writeOpenSSHKeyString(writer, qbuf);
    writeOpenSSHKeyString(writer, commentbuf);
    let pad = 0x01;

    while (writer.off < length) {
      writer.off = writer.buf.writeUInt8(pad++, writer.off);
    }

    if (options.type === "der") {
      return writer.buf;
    } else {
      return PRIVATE_OPENING_BOUNDARY + "\n" + utils.linebrk(buf.toString("base64"), 70) + "\n" + PRIVATE_CLOSING_BOUNDARY + "\n";
    }
  },
  privateImport: function (key, data, options) {
    options = options || {};
    var buffer;

    if (options.type !== "der") {
      if (Buffer.isBuffer(data)) {
        data = data.toString("utf8");
      }

      if (_.isString(data)) {
        var pem = utils.trimSurroundingText(data, PRIVATE_OPENING_BOUNDARY, PRIVATE_CLOSING_BOUNDARY).replace(/\s+|\n\r|\n|\r$/gm, "");
        buffer = Buffer.from(pem, "base64");
      } else {
        throw Error("Unsupported key format");
      }
    } else if (Buffer.isBuffer(data)) {
      buffer = data;
    } else {
      throw Error("Unsupported key format");
    }

    const reader = {
      buf: buffer,
      off: 0
    };
    if (buffer.slice(0, 14).toString("ascii") !== "openssh-key-v1") throw "Invalid file format.";
    reader.off += 15; //ciphername

    if (readOpenSSHKeyString(reader).toString("ascii") !== "none") throw Error("Unsupported key type"); //kdfname

    if (readOpenSSHKeyString(reader).toString("ascii") !== "none") throw Error("Unsupported key type"); //kdf

    if (readOpenSSHKeyString(reader).toString("ascii") !== "") throw Error("Unsupported key type"); //keynum

    reader.off += 4; //sshpublength

    reader.off += 4; //keytype

    if (readOpenSSHKeyString(reader).toString("ascii") !== "ssh-rsa") throw Error("Unsupported key type");
    readOpenSSHKeyString(reader);
    readOpenSSHKeyString(reader);
    reader.off += 12;
    if (readOpenSSHKeyString(reader).toString("ascii") !== "ssh-rsa") throw Error("Unsupported key type");
    const n = readOpenSSHKeyString(reader);
    const e = readOpenSSHKeyString(reader);
    const d = readOpenSSHKeyString(reader);
    const coeff = readOpenSSHKeyString(reader);
    const p = readOpenSSHKeyString(reader);
    const q = readOpenSSHKeyString(reader); //Calculate missing values

    const dint = new BigInteger(d);
    const qint = new BigInteger(q);
    const pint = new BigInteger(p);
    const dp = dint.mod(pint.subtract(BigInteger.ONE));
    const dq = dint.mod(qint.subtract(BigInteger.ONE));
    key.setPrivate(n, // modulus
    e, // publicExponent
    d, // privateExponent
    p, // prime1
    q, // prime2
    dp.toBuffer(), // exponent1 -- d mod (p1)
    dq.toBuffer(), // exponent2 -- d mod (q-1)
    coeff // coefficient -- (inverse of q) mod p
    );
    key.sshcomment = readOpenSSHKeyString(reader).toString("ascii");
  },
  publicExport: function (key, options) {
    let ebuf = Buffer.alloc(4);
    ebuf.writeUInt32BE(key.e, 0); //Slice leading zeroes

    while (ebuf[0] === 0) ebuf = ebuf.slice(1);

    const nbuf = key.n.toBuffer();
    const buf = Buffer.alloc(ebuf.byteLength + 4 + nbuf.byteLength + 4 + "ssh-rsa".length + 4);
    const writer = {
      buf: buf,
      off: 0
    };
    writeOpenSSHKeyString(writer, Buffer.from("ssh-rsa"));
    writeOpenSSHKeyString(writer, ebuf);
    writeOpenSSHKeyString(writer, nbuf);
    let comment = key.sshcomment || "";

    if (options.type === "der") {
      return writer.buf;
    } else {
      return "ssh-rsa " + buf.toString("base64") + " " + comment + "\n";
    }
  },
  publicImport: function (key, data, options) {
    options = options || {};
    var buffer;

    if (options.type !== "der") {
      if (Buffer.isBuffer(data)) {
        data = data.toString("utf8");
      }

      if (_.isString(data)) {
        if (data.substring(0, 8) !== "ssh-rsa ") throw Error("Unsupported key format");
        let pemEnd = data.indexOf(" ", 8); //Handle keys with no comment

        if (pemEnd === -1) {
          pemEnd = data.length;
        } else {
          key.sshcomment = data.substring(pemEnd + 1).replace(/\s+|\n\r|\n|\r$/gm, "");
        }

        const pem = data.substring(8, pemEnd).replace(/\s+|\n\r|\n|\r$/gm, "");
        buffer = Buffer.from(pem, "base64");
      } else {
        throw Error("Unsupported key format");
      }
    } else if (Buffer.isBuffer(data)) {
      buffer = data;
    } else {
      throw Error("Unsupported key format");
    }

    const reader = {
      buf: buffer,
      off: 0
    };
    const type = readOpenSSHKeyString(reader).toString("ascii");
    if (type !== "ssh-rsa") throw Error("Invalid key type: " + type);
    const e = readOpenSSHKeyString(reader);
    const n = readOpenSSHKeyString(reader);
    key.setPublic(n, e);
  },

  /**
   * Trying autodetect and import key
   * @param key
   * @param data
   */
  autoImport: function (key, data) {
    // [\S\s]* matches zero or more of any character
    if (/^[\S\s]*-----BEGIN OPENSSH PRIVATE KEY-----\s*(?=(([A-Za-z0-9+/=]+\s*)+))\1-----END OPENSSH PRIVATE KEY-----[\S\s]*$/g.test(data)) {
      module.exports.privateImport(key, data);
      return true;
    }

    if (/^[\S\s]*ssh-rsa \s*(?=(([A-Za-z0-9+/=]+\s*)+))\1[\S\s]*$/g.test(data)) {
      module.exports.publicImport(key, data);
      return true;
    }

    return false;
  }
};

function readOpenSSHKeyString(reader) {
  const len = reader.buf.readInt32BE(reader.off);
  reader.off += 4;
  const res = reader.buf.slice(reader.off, reader.off + len);
  reader.off += len;
  return res;
}

function writeOpenSSHKeyString(writer, data) {
  writer.buf.writeInt32BE(data.byteLength, writer.off);
  writer.off += 4;
  writer.off += data.copy(writer.buf, writer.off);
}

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(32);
/*global toString:true*/
// utils is a library of generic helper functions non-specific to axios


var toString = Object.prototype.toString;
/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */

function isArray(val) {
  return toString.call(val) === '[object Array]';
}
/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */


function isUndefined(val) {
  return typeof val === 'undefined';
}
/**
 * Determine if a value is a Buffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Buffer, otherwise false
 */


function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
}
/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */


function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}
/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */


function isFormData(val) {
  return typeof FormData !== 'undefined' && val instanceof FormData;
}
/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */


function isArrayBufferView(val) {
  var result;

  if (typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView) {
    result = ArrayBuffer.isView(val);
  } else {
    result = val && val.buffer && val.buffer instanceof ArrayBuffer;
  }

  return result;
}
/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */


function isString(val) {
  return typeof val === 'string';
}
/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */


function isNumber(val) {
  return typeof val === 'number';
}
/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */


function isObject(val) {
  return val !== null && typeof val === 'object';
}
/**
 * Determine if a value is a plain Object
 *
 * @param {Object} val The value to test
 * @return {boolean} True if value is a plain Object, otherwise false
 */


function isPlainObject(val) {
  if (toString.call(val) !== '[object Object]') {
    return false;
  }

  var prototype = Object.getPrototypeOf(val);
  return prototype === null || prototype === Object.prototype;
}
/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */


function isDate(val) {
  return toString.call(val) === '[object Date]';
}
/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */


function isFile(val) {
  return toString.call(val) === '[object File]';
}
/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */


function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}
/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */


function isFunction(val) {
  return toString.call(val) === '[object Function]';
}
/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */


function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}
/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */


function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}
/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */


function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}
/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */


function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' || navigator.product === 'NativeScript' || navigator.product === 'NS')) {
    return false;
  }

  return typeof window !== 'undefined' && typeof document !== 'undefined';
}
/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */


function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  } // Force an array if not already something iterable


  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}
/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */


function merge()
/* obj1, obj2, obj3, ... */
{
  var result = {};

  function assignValue(val, key) {
    if (isPlainObject(result[key]) && isPlainObject(val)) {
      result[key] = merge(result[key], val);
    } else if (isPlainObject(val)) {
      result[key] = merge({}, val);
    } else if (isArray(val)) {
      result[key] = val.slice();
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }

  return result;
}
/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */


function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}
/**
 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
 *
 * @param {string} content with BOM
 * @return {string} content value without BOM
 */


function stripBOM(content) {
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }

  return content;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isPlainObject: isPlainObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim,
  stripBOM: stripBOM
};

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(29);

function encode(val) {
  return encodeURIComponent(val).replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%20/g, '+').replace(/%5B/gi, '[').replace(/%5D/gi, ']');
}
/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */


module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;

  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];
    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }

        parts.push(encode(key) + '=' + encode(v));
      });
    });
    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');

    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(36);
/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */


module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);

    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }

    return fn.apply(thisArg, args);
  };
};

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(29);

var normalizeHeaderName = __webpack_require__(51);

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;

  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(52);
  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = __webpack_require__(58);
  }

  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),
  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');

    if (utils.isFormData(data) || utils.isArrayBuffer(data) || utils.isBuffer(data) || utils.isStream(data) || utils.isFile(data) || utils.isBlob(data)) {
      return data;
    }

    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }

    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }

    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }

    return data;
  }],
  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) {
        /* Ignore */
      }
    }

    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
  maxContentLength: -1,
  maxBodyLength: -1,
  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};
defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};
utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});
utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});
module.exports = defaults;

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(31);
/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */


module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;

  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError('Request failed with status code ' + response.status, response.config, null, response.request, response));
  }
};

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */

module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;

  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isAxiosError = true;

  error.toJSON = function toJSON() {
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
      config: this.config,
      code: this.code
    };
  };

  return error;
};

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isAbsoluteURL = __webpack_require__(54);

var combineURLs = __webpack_require__(55);
/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 * @returns {string} The combined full path
 */


module.exports = function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }

  return requestedURL;
};

/***/ }),
/* 38 */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),
/* 39 */
/***/ (function(module, exports) {

module.exports = require("https");

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

var url = __webpack_require__(41);

var URL = url.URL;

var http = __webpack_require__(38);

var https = __webpack_require__(39);

var Writable = __webpack_require__(59).Writable;

var assert = __webpack_require__(9);

var debug = __webpack_require__(60); // Create handlers that pass events from native requests


var events = ["abort", "aborted", "connect", "error", "socket", "timeout"];
var eventHandlers = Object.create(null);
events.forEach(function (event) {
  eventHandlers[event] = function (arg1, arg2, arg3) {
    this._redirectable.emit(event, arg1, arg2, arg3);
  };
}); // Error types with codes

var RedirectionError = createErrorType("ERR_FR_REDIRECTION_FAILURE", "");
var TooManyRedirectsError = createErrorType("ERR_FR_TOO_MANY_REDIRECTS", "Maximum number of redirects exceeded");
var MaxBodyLengthExceededError = createErrorType("ERR_FR_MAX_BODY_LENGTH_EXCEEDED", "Request body larger than maxBodyLength limit");
var WriteAfterEndError = createErrorType("ERR_STREAM_WRITE_AFTER_END", "write after end"); // An HTTP(S) request that can be redirected

function RedirectableRequest(options, responseCallback) {
  // Initialize the request
  Writable.call(this);

  this._sanitizeOptions(options);

  this._options = options;
  this._ended = false;
  this._ending = false;
  this._redirectCount = 0;
  this._redirects = [];
  this._requestBodyLength = 0;
  this._requestBodyBuffers = []; // Attach a callback if passed

  if (responseCallback) {
    this.on("response", responseCallback);
  } // React to responses of native requests


  var self = this;

  this._onNativeResponse = function (response) {
    self._processResponse(response);
  }; // Perform the first request


  this._performRequest();
}

RedirectableRequest.prototype = Object.create(Writable.prototype);

RedirectableRequest.prototype.abort = function () {
  abortRequest(this._currentRequest);
  this.emit("abort");
}; // Writes buffered data to the current native request


RedirectableRequest.prototype.write = function (data, encoding, callback) {
  // Writing is not allowed if end has been called
  if (this._ending) {
    throw new WriteAfterEndError();
  } // Validate input and shift parameters if necessary


  if (!(typeof data === "string" || typeof data === "object" && "length" in data)) {
    throw new TypeError("data should be a string, Buffer or Uint8Array");
  }

  if (typeof encoding === "function") {
    callback = encoding;
    encoding = null;
  } // Ignore empty buffers, since writing them doesn't invoke the callback
  // https://github.com/nodejs/node/issues/22066


  if (data.length === 0) {
    if (callback) {
      callback();
    }

    return;
  } // Only write when we don't exceed the maximum body length


  if (this._requestBodyLength + data.length <= this._options.maxBodyLength) {
    this._requestBodyLength += data.length;

    this._requestBodyBuffers.push({
      data: data,
      encoding: encoding
    });

    this._currentRequest.write(data, encoding, callback);
  } // Error when we exceed the maximum body length
  else {
      this.emit("error", new MaxBodyLengthExceededError());
      this.abort();
    }
}; // Ends the current native request


RedirectableRequest.prototype.end = function (data, encoding, callback) {
  // Shift parameters if necessary
  if (typeof data === "function") {
    callback = data;
    data = encoding = null;
  } else if (typeof encoding === "function") {
    callback = encoding;
    encoding = null;
  } // Write data if needed and end


  if (!data) {
    this._ended = this._ending = true;

    this._currentRequest.end(null, null, callback);
  } else {
    var self = this;
    var currentRequest = this._currentRequest;
    this.write(data, encoding, function () {
      self._ended = true;
      currentRequest.end(null, null, callback);
    });
    this._ending = true;
  }
}; // Sets a header value on the current native request


RedirectableRequest.prototype.setHeader = function (name, value) {
  this._options.headers[name] = value;

  this._currentRequest.setHeader(name, value);
}; // Clears a header value on the current native request


RedirectableRequest.prototype.removeHeader = function (name) {
  delete this._options.headers[name];

  this._currentRequest.removeHeader(name);
}; // Global timeout for all underlying requests


RedirectableRequest.prototype.setTimeout = function (msecs, callback) {
  var self = this;

  if (callback) {
    this.on("timeout", callback);
  }

  function destroyOnTimeout(socket) {
    socket.setTimeout(msecs);
    socket.removeListener("timeout", socket.destroy);
    socket.addListener("timeout", socket.destroy);
  } // Sets up a timer to trigger a timeout event


  function startTimer(socket) {
    if (self._timeout) {
      clearTimeout(self._timeout);
    }

    self._timeout = setTimeout(function () {
      self.emit("timeout");
      clearTimer();
    }, msecs);
    destroyOnTimeout(socket);
  } // Prevent a timeout from triggering


  function clearTimer() {
    clearTimeout(this._timeout);

    if (callback) {
      self.removeListener("timeout", callback);
    }

    if (!this.socket) {
      self._currentRequest.removeListener("socket", startTimer);
    }
  } // Start the timer when the socket is opened


  if (this.socket) {
    startTimer(this.socket);
  } else {
    this._currentRequest.once("socket", startTimer);
  }

  this.on("socket", destroyOnTimeout);
  this.once("response", clearTimer);
  this.once("error", clearTimer);
  return this;
}; // Proxy all other public ClientRequest methods


["flushHeaders", "getHeader", "setNoDelay", "setSocketKeepAlive"].forEach(function (method) {
  RedirectableRequest.prototype[method] = function (a, b) {
    return this._currentRequest[method](a, b);
  };
}); // Proxy all public ClientRequest properties

["aborted", "connection", "socket"].forEach(function (property) {
  Object.defineProperty(RedirectableRequest.prototype, property, {
    get: function () {
      return this._currentRequest[property];
    }
  });
});

RedirectableRequest.prototype._sanitizeOptions = function (options) {
  // Ensure headers are always present
  if (!options.headers) {
    options.headers = {};
  } // Since http.request treats host as an alias of hostname,
  // but the url module interprets host as hostname plus port,
  // eliminate the host property to avoid confusion.


  if (options.host) {
    // Use hostname if set, because it has precedence
    if (!options.hostname) {
      options.hostname = options.host;
    }

    delete options.host;
  } // Complete the URL object when necessary


  if (!options.pathname && options.path) {
    var searchPos = options.path.indexOf("?");

    if (searchPos < 0) {
      options.pathname = options.path;
    } else {
      options.pathname = options.path.substring(0, searchPos);
      options.search = options.path.substring(searchPos);
    }
  }
}; // Executes the next native request (initial or redirect)


RedirectableRequest.prototype._performRequest = function () {
  // Load the native protocol
  var protocol = this._options.protocol;
  var nativeProtocol = this._options.nativeProtocols[protocol];

  if (!nativeProtocol) {
    this.emit("error", new TypeError("Unsupported protocol " + protocol));
    return;
  } // If specified, use the agent corresponding to the protocol
  // (HTTP and HTTPS use different types of agents)


  if (this._options.agents) {
    var scheme = protocol.substr(0, protocol.length - 1);
    this._options.agent = this._options.agents[scheme];
  } // Create the native request


  var request = this._currentRequest = nativeProtocol.request(this._options, this._onNativeResponse);
  this._currentUrl = url.format(this._options); // Set up event handlers

  request._redirectable = this;

  for (var e = 0; e < events.length; e++) {
    request.on(events[e], eventHandlers[events[e]]);
  } // End a redirected request
  // (The first request must be ended explicitly with RedirectableRequest#end)


  if (this._isRedirect) {
    // Write the request entity and end.
    var i = 0;
    var self = this;
    var buffers = this._requestBodyBuffers;

    (function writeNext(error) {
      // Only write if this request has not been redirected yet

      /* istanbul ignore else */
      if (request === self._currentRequest) {
        // Report any write errors

        /* istanbul ignore if */
        if (error) {
          self.emit("error", error);
        } // Write the next buffer if there are still left
        else if (i < buffers.length) {
            var buffer = buffers[i++];
            /* istanbul ignore else */

            if (!request.finished) {
              request.write(buffer.data, buffer.encoding, writeNext);
            }
          } // End the request if `end` has been called on us
          else if (self._ended) {
              request.end();
            }
      }
    })();
  }
}; // Processes a response from the current native request


RedirectableRequest.prototype._processResponse = function (response) {
  // Store the redirected response
  var statusCode = response.statusCode;

  if (this._options.trackRedirects) {
    this._redirects.push({
      url: this._currentUrl,
      headers: response.headers,
      statusCode: statusCode
    });
  } // RFC7231§6.4: The 3xx (Redirection) class of status code indicates
  // that further action needs to be taken by the user agent in order to
  // fulfill the request. If a Location header field is provided,
  // the user agent MAY automatically redirect its request to the URI
  // referenced by the Location field value,
  // even if the specific status code is not understood.


  var location = response.headers.location;

  if (location && this._options.followRedirects !== false && statusCode >= 300 && statusCode < 400) {
    // Abort the current request
    abortRequest(this._currentRequest); // Discard the remainder of the response to avoid waiting for data

    response.destroy(); // RFC7231§6.4: A client SHOULD detect and intervene
    // in cyclical redirections (i.e., "infinite" redirection loops).

    if (++this._redirectCount > this._options.maxRedirects) {
      this.emit("error", new TooManyRedirectsError());
      return;
    } // RFC7231§6.4: Automatic redirection needs to done with
    // care for methods not known to be safe, […]
    // RFC7231§6.4.2–3: For historical reasons, a user agent MAY change
    // the request method from POST to GET for the subsequent request.


    if ((statusCode === 301 || statusCode === 302) && this._options.method === "POST" || // RFC7231§6.4.4: The 303 (See Other) status code indicates that
    // the server is redirecting the user agent to a different resource […]
    // A user agent can perform a retrieval request targeting that URI
    // (a GET or HEAD request if using HTTP) […]
    statusCode === 303 && !/^(?:GET|HEAD)$/.test(this._options.method)) {
      this._options.method = "GET"; // Drop a possible entity and headers related to it

      this._requestBodyBuffers = [];
      removeMatchingHeaders(/^content-/i, this._options.headers);
    } // Drop the Host header, as the redirect might lead to a different host


    var previousHostName = removeMatchingHeaders(/^host$/i, this._options.headers) || url.parse(this._currentUrl).hostname; // Create the redirected request

    var redirectUrl = url.resolve(this._currentUrl, location);
    debug("redirecting to", redirectUrl);
    this._isRedirect = true;
    var redirectUrlParts = url.parse(redirectUrl);
    Object.assign(this._options, redirectUrlParts); // Drop the Authorization header if redirecting to another host

    if (redirectUrlParts.hostname !== previousHostName) {
      removeMatchingHeaders(/^authorization$/i, this._options.headers);
    } // Evaluate the beforeRedirect callback


    if (typeof this._options.beforeRedirect === "function") {
      var responseDetails = {
        headers: response.headers
      };

      try {
        this._options.beforeRedirect.call(null, this._options, responseDetails);
      } catch (err) {
        this.emit("error", err);
        return;
      }

      this._sanitizeOptions(this._options);
    } // Perform the redirected request


    try {
      this._performRequest();
    } catch (cause) {
      var error = new RedirectionError("Redirected request failed: " + cause.message);
      error.cause = cause;
      this.emit("error", error);
    }
  } else {
    // The response is not a redirect; return it as-is
    response.responseUrl = this._currentUrl;
    response.redirects = this._redirects;
    this.emit("response", response); // Clean up

    this._requestBodyBuffers = [];
  }
}; // Wraps the key/value object of protocols with redirect functionality


function wrap(protocols) {
  // Default settings
  var exports = {
    maxRedirects: 21,
    maxBodyLength: 10 * 1024 * 1024
  }; // Wrap each protocol

  var nativeProtocols = {};
  Object.keys(protocols).forEach(function (scheme) {
    var protocol = scheme + ":";
    var nativeProtocol = nativeProtocols[protocol] = protocols[scheme];
    var wrappedProtocol = exports[scheme] = Object.create(nativeProtocol); // Executes a request, following redirects

    function request(input, options, callback) {
      // Parse parameters
      if (typeof input === "string") {
        var urlStr = input;

        try {
          input = urlToOptions(new URL(urlStr));
        } catch (err) {
          /* istanbul ignore next */
          input = url.parse(urlStr);
        }
      } else if (URL && input instanceof URL) {
        input = urlToOptions(input);
      } else {
        callback = options;
        options = input;
        input = {
          protocol: protocol
        };
      }

      if (typeof options === "function") {
        callback = options;
        options = null;
      } // Set defaults


      options = Object.assign({
        maxRedirects: exports.maxRedirects,
        maxBodyLength: exports.maxBodyLength
      }, input, options);
      options.nativeProtocols = nativeProtocols;
      assert.equal(options.protocol, protocol, "protocol mismatch");
      debug("options", options);
      return new RedirectableRequest(options, callback);
    } // Executes a GET request, following redirects


    function get(input, options, callback) {
      var wrappedRequest = wrappedProtocol.request(input, options, callback);
      wrappedRequest.end();
      return wrappedRequest;
    } // Expose the properties on the wrapped protocol


    Object.defineProperties(wrappedProtocol, {
      request: {
        value: request,
        configurable: true,
        enumerable: true,
        writable: true
      },
      get: {
        value: get,
        configurable: true,
        enumerable: true,
        writable: true
      }
    });
  });
  return exports;
}
/* istanbul ignore next */


function noop() {
  /* empty */
} // from https://github.com/nodejs/node/blob/master/lib/internal/url.js


function urlToOptions(urlObject) {
  var options = {
    protocol: urlObject.protocol,
    hostname: urlObject.hostname.startsWith("[") ?
    /* istanbul ignore next */
    urlObject.hostname.slice(1, -1) : urlObject.hostname,
    hash: urlObject.hash,
    search: urlObject.search,
    pathname: urlObject.pathname,
    path: urlObject.pathname + urlObject.search,
    href: urlObject.href
  };

  if (urlObject.port !== "") {
    options.port = Number(urlObject.port);
  }

  return options;
}

function removeMatchingHeaders(regex, headers) {
  var lastValue;

  for (var header in headers) {
    if (regex.test(header)) {
      lastValue = headers[header];
      delete headers[header];
    }
  }

  return lastValue;
}

function createErrorType(code, defaultMessage) {
  function CustomError(message) {
    Error.captureStackTrace(this, this.constructor);
    this.message = message || defaultMessage;
  }

  CustomError.prototype = new Error();
  CustomError.prototype.constructor = CustomError;
  CustomError.prototype.name = "Error [" + code + "]";
  CustomError.prototype.code = code;
  return CustomError;
}

function abortRequest(request) {
  for (var e = 0; e < events.length; e++) {
    request.removeListener(events[e], eventHandlers[events[e]]);
  }

  request.on("error", noop);
  request.abort();
} // Exports


module.exports = wrap({
  http: http,
  https: https
});
module.exports.wrap = wrap;

/***/ }),
/* 41 */
/***/ (function(module, exports) {

module.exports = require("url");

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 */
function setup(env) {
  createDebug.debug = createDebug;
  createDebug.default = createDebug;
  createDebug.coerce = coerce;
  createDebug.disable = disable;
  createDebug.enable = enable;
  createDebug.enabled = enabled;
  createDebug.humanize = __webpack_require__(63);
  createDebug.destroy = destroy;
  Object.keys(env).forEach(key => {
    createDebug[key] = env[key];
  });
  /**
  * The currently active debug mode names, and names to skip.
  */

  createDebug.names = [];
  createDebug.skips = [];
  /**
  * Map of special "%n" handling functions, for the debug "format" argument.
  *
  * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
  */

  createDebug.formatters = {};
  /**
  * Selects a color for a debug namespace
  * @param {String} namespace The namespace string for the for the debug instance to be colored
  * @return {Number|String} An ANSI color code for the given namespace
  * @api private
  */

  function selectColor(namespace) {
    let hash = 0;

    for (let i = 0; i < namespace.length; i++) {
      hash = (hash << 5) - hash + namespace.charCodeAt(i);
      hash |= 0; // Convert to 32bit integer
    }

    return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
  }

  createDebug.selectColor = selectColor;
  /**
  * Create a debugger with the given `namespace`.
  *
  * @param {String} namespace
  * @return {Function}
  * @api public
  */

  function createDebug(namespace) {
    let prevTime;
    let enableOverride = null;

    function debug(...args) {
      // Disabled?
      if (!debug.enabled) {
        return;
      }

      const self = debug; // Set `diff` timestamp

      const curr = Number(new Date());
      const ms = curr - (prevTime || curr);
      self.diff = ms;
      self.prev = prevTime;
      self.curr = curr;
      prevTime = curr;
      args[0] = createDebug.coerce(args[0]);

      if (typeof args[0] !== 'string') {
        // Anything else let's inspect with %O
        args.unshift('%O');
      } // Apply any `formatters` transformations


      let index = 0;
      args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
        // If we encounter an escaped % then don't increase the array index
        if (match === '%%') {
          return '%';
        }

        index++;
        const formatter = createDebug.formatters[format];

        if (typeof formatter === 'function') {
          const val = args[index];
          match = formatter.call(self, val); // Now we need to remove `args[index]` since it's inlined in the `format`

          args.splice(index, 1);
          index--;
        }

        return match;
      }); // Apply env-specific formatting (colors, etc.)

      createDebug.formatArgs.call(self, args);
      const logFn = self.log || createDebug.log;
      logFn.apply(self, args);
    }

    debug.namespace = namespace;
    debug.useColors = createDebug.useColors();
    debug.color = createDebug.selectColor(namespace);
    debug.extend = extend;
    debug.destroy = createDebug.destroy; // XXX Temporary. Will be removed in the next major release.

    Object.defineProperty(debug, 'enabled', {
      enumerable: true,
      configurable: false,
      get: () => enableOverride === null ? createDebug.enabled(namespace) : enableOverride,
      set: v => {
        enableOverride = v;
      }
    }); // Env-specific initialization logic for debug instances

    if (typeof createDebug.init === 'function') {
      createDebug.init(debug);
    }

    return debug;
  }

  function extend(namespace, delimiter) {
    const newDebug = createDebug(this.namespace + (typeof delimiter === 'undefined' ? ':' : delimiter) + namespace);
    newDebug.log = this.log;
    return newDebug;
  }
  /**
  * Enables a debug mode by namespaces. This can include modes
  * separated by a colon and wildcards.
  *
  * @param {String} namespaces
  * @api public
  */


  function enable(namespaces) {
    createDebug.save(namespaces);
    createDebug.names = [];
    createDebug.skips = [];
    let i;
    const split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
    const len = split.length;

    for (i = 0; i < len; i++) {
      if (!split[i]) {
        // ignore empty strings
        continue;
      }

      namespaces = split[i].replace(/\*/g, '.*?');

      if (namespaces[0] === '-') {
        createDebug.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
      } else {
        createDebug.names.push(new RegExp('^' + namespaces + '$'));
      }
    }
  }
  /**
  * Disable debug output.
  *
  * @return {String} namespaces
  * @api public
  */


  function disable() {
    const namespaces = [...createDebug.names.map(toNamespace), ...createDebug.skips.map(toNamespace).map(namespace => '-' + namespace)].join(',');
    createDebug.enable('');
    return namespaces;
  }
  /**
  * Returns true if the given mode name is enabled, false otherwise.
  *
  * @param {String} name
  * @return {Boolean}
  * @api public
  */


  function enabled(name) {
    if (name[name.length - 1] === '*') {
      return true;
    }

    let i;
    let len;

    for (i = 0, len = createDebug.skips.length; i < len; i++) {
      if (createDebug.skips[i].test(name)) {
        return false;
      }
    }

    for (i = 0, len = createDebug.names.length; i < len; i++) {
      if (createDebug.names[i].test(name)) {
        return true;
      }
    }

    return false;
  }
  /**
  * Convert regexp to namespace
  *
  * @param {RegExp} regxep
  * @return {String} namespace
  * @api private
  */


  function toNamespace(regexp) {
    return regexp.toString().substring(2, regexp.toString().length - 2).replace(/\.\*\?$/, '*');
  }
  /**
  * Coerce `val`.
  *
  * @param {Mixed} val
  * @return {Mixed}
  * @api private
  */


  function coerce(val) {
    if (val instanceof Error) {
      return val.stack || val.message;
    }

    return val;
  }
  /**
  * XXX DO NOT USE. This is a temporary stub function.
  * XXX It WILL be removed in the next major release.
  */


  function destroy() {
    console.warn('Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
  }

  createDebug.enable(createDebug.load());
  return createDebug;
}

module.exports = setup;

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(29);
/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */


module.exports = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};
  var valueFromConfig2Keys = ['url', 'method', 'data'];
  var mergeDeepPropertiesKeys = ['headers', 'auth', 'proxy', 'params'];
  var defaultToConfig2Keys = ['baseURL', 'transformRequest', 'transformResponse', 'paramsSerializer', 'timeout', 'timeoutMessage', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName', 'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress', 'decompress', 'maxContentLength', 'maxBodyLength', 'maxRedirects', 'transport', 'httpAgent', 'httpsAgent', 'cancelToken', 'socketPath', 'responseEncoding'];
  var directMergeKeys = ['validateStatus'];

  function getMergedValue(target, source) {
    if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
      return utils.merge(target, source);
    } else if (utils.isPlainObject(source)) {
      return utils.merge({}, source);
    } else if (utils.isArray(source)) {
      return source.slice();
    }

    return source;
  }

  function mergeDeepProperties(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(config1[prop], config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  }

  utils.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(undefined, config2[prop]);
    }
  });
  utils.forEach(mergeDeepPropertiesKeys, mergeDeepProperties);
  utils.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(undefined, config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  });
  utils.forEach(directMergeKeys, function merge(prop) {
    if (prop in config2) {
      config[prop] = getMergedValue(config1[prop], config2[prop]);
    } else if (prop in config1) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  });
  var axiosKeys = valueFromConfig2Keys.concat(mergeDeepPropertiesKeys).concat(defaultToConfig2Keys).concat(directMergeKeys);
  var otherKeys = Object.keys(config1).concat(Object.keys(config2)).filter(function filterAxiosKeys(key) {
    return axiosKeys.indexOf(key) === -1;
  });
  utils.forEach(otherKeys, mergeDeepProperties);
  return config;
};

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */

function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;
module.exports = Cancel;

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(46);

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(29);

var bind = __webpack_require__(32);

var Axios = __webpack_require__(47);

var mergeConfig = __webpack_require__(43);

var defaults = __webpack_require__(34);
/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */


function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context); // Copy axios.prototype to instance

  utils.extend(instance, Axios.prototype, context); // Copy context to instance

  utils.extend(instance, context);
  return instance;
} // Create the default instance to be exported


var axios = createInstance(defaults); // Expose Axios class to allow class inheritance

axios.Axios = Axios; // Factory for creating new instances

axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
}; // Expose Cancel & CancelToken


axios.Cancel = __webpack_require__(44);
axios.CancelToken = __webpack_require__(72);
axios.isCancel = __webpack_require__(33); // Expose all/spread

axios.all = function all(promises) {
  return Promise.all(promises);
};

axios.spread = __webpack_require__(73); // Expose isAxiosError

axios.isAxiosError = __webpack_require__(74);
module.exports = axios; // Allow use of default import syntax in TypeScript

module.exports.default = axios;

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(29);

var buildURL = __webpack_require__(30);

var InterceptorManager = __webpack_require__(48);

var dispatchRequest = __webpack_require__(49);

var mergeConfig = __webpack_require__(43);
/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */


function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}
/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */


Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  config = mergeConfig(this.defaults, config); // Set config.method

  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = 'get';
  } // Hook up interceptors middleware


  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);
  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });
  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
}; // Provide aliases for supported request methods


utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function (url, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: (config || {}).data
    }));
  };
});
utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function (url, data, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});
module.exports = Axios;

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(29);

function InterceptorManager() {
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


InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};
/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */


InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};
/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */


InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(29);

var transformData = __webpack_require__(50);

var isCancel = __webpack_require__(33);

var defaults = __webpack_require__(34);
/**
 * Throws a `Cancel` if cancellation has been requested.
 */


function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}
/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */


module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config); // Ensure headers exist

  config.headers = config.headers || {}; // Transform request data

  config.data = transformData(config.data, config.headers, config.transformRequest); // Flatten headers

  config.headers = utils.merge(config.headers.common || {}, config.headers[config.method] || {}, config.headers);
  utils.forEach(['delete', 'get', 'head', 'post', 'put', 'patch', 'common'], function cleanHeaderConfig(method) {
    delete config.headers[method];
  });
  var adapter = config.adapter || defaults.adapter;
  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config); // Transform response data

    response.data = transformData(response.data, response.headers, config.transformResponse);
    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config); // Transform response data

      if (reason && reason.response) {
        reason.response.data = transformData(reason.response.data, reason.response.headers, config.transformResponse);
      }
    }

    return Promise.reject(reason);
  });
};

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(29);
/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */


module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });
  return data;
};

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(29);

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(29);

var settle = __webpack_require__(35);

var cookies = __webpack_require__(53);

var buildURL = __webpack_require__(30);

var buildFullPath = __webpack_require__(37);

var parseHeaders = __webpack_require__(56);

var isURLSameOrigin = __webpack_require__(57);

var createError = __webpack_require__(31);

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest(); // HTTP basic authentication

    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    var fullPath = buildFullPath(config.baseURL, config.url);
    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true); // Set the request timeout in MS

    request.timeout = config.timeout; // Listen for ready state

    request.onreadystatechange = function handleLoad() {
      if (!request || request.readyState !== 4) {
        return;
      } // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request


      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      } // Prepare the response


      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };
      settle(resolve, reject, response); // Clean up request

      request = null;
    }; // Handle browser request cancellation (as opposed to a manual cancellation)


    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request)); // Clean up request

      request = null;
    }; // Handle low level network errors


    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request)); // Clean up request

      request = null;
    }; // Handle timeout


    request.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = 'timeout of ' + config.timeout + 'ms exceeded';

      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }

      reject(createError(timeoutErrorMessage, config, 'ECONNABORTED', request)); // Clean up request

      request = null;
    }; // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.


    if (utils.isStandardBrowserEnv()) {
      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ? cookies.read(config.xsrfCookieName) : undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    } // Add headers to the request


    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    } // Add withCredentials to request if needed


    if (!utils.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    } // Add responseType to request if needed


    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    } // Handle progress if needed


    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    } // Not all browsers support upload events


    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel); // Clean up request

        request = null;
      });
    }

    if (!requestData) {
      requestData = null;
    } // Send the request


    request.send(requestData);
  });
};

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(29);

module.exports = utils.isStandardBrowserEnv() ? // Standard browser envs support document.cookie
function standardBrowserEnv() {
  return {
    write: function write(name, value, expires, path, domain, secure) {
      var cookie = [];
      cookie.push(name + '=' + encodeURIComponent(value));

      if (utils.isNumber(expires)) {
        cookie.push('expires=' + new Date(expires).toGMTString());
      }

      if (utils.isString(path)) {
        cookie.push('path=' + path);
      }

      if (utils.isString(domain)) {
        cookie.push('domain=' + domain);
      }

      if (secure === true) {
        cookie.push('secure');
      }

      document.cookie = cookie.join('; ');
    },
    read: function read(name) {
      var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
      return match ? decodeURIComponent(match[3]) : null;
    },
    remove: function remove(name) {
      this.write(name, '', Date.now() - 86400000);
    }
  };
}() : // Non standard browser env (web workers, react-native) lack needed support.
function nonStandardBrowserEnv() {
  return {
    write: function write() {},
    read: function read() {
      return null;
    },
    remove: function remove() {}
  };
}();

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */

module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */

module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '') : baseURL;
};

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(29); // Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers


var ignoreDuplicateOf = ['age', 'authorization', 'content-length', 'content-type', 'etag', 'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since', 'last-modified', 'location', 'max-forwards', 'proxy-authorization', 'referer', 'retry-after', 'user-agent'];
/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */

module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) {
    return parsed;
  }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }

      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });
  return parsed;
};

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(29);

module.exports = utils.isStandardBrowserEnv() ? // Standard browser envs have full support of the APIs needed to test
// whether the request URL is of the same origin as current location.
function standardBrowserEnv() {
  var msie = /(msie|trident)/i.test(navigator.userAgent);
  var urlParsingNode = document.createElement('a');
  var originURL;
  /**
  * Parse a URL to discover it's components
  *
  * @param {String} url The URL to be parsed
  * @returns {Object}
  */

  function resolveURL(url) {
    var href = url;

    if (msie) {
      // IE needs attribute set twice to normalize properties
      urlParsingNode.setAttribute('href', href);
      href = urlParsingNode.href;
    }

    urlParsingNode.setAttribute('href', href); // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils

    return {
      href: urlParsingNode.href,
      protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
      host: urlParsingNode.host,
      search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
      hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
      hostname: urlParsingNode.hostname,
      port: urlParsingNode.port,
      pathname: urlParsingNode.pathname.charAt(0) === '/' ? urlParsingNode.pathname : '/' + urlParsingNode.pathname
    };
  }

  originURL = resolveURL(window.location.href);
  /**
  * Determine if a URL shares the same origin as the current location
  *
  * @param {String} requestURL The URL to test
  * @returns {boolean} True if URL shares the same origin, otherwise false
  */

  return function isURLSameOrigin(requestURL) {
    var parsed = utils.isString(requestURL) ? resolveURL(requestURL) : requestURL;
    return parsed.protocol === originURL.protocol && parsed.host === originURL.host;
  };
}() : // Non standard browser envs (web workers, react-native) lack needed support.
function nonStandardBrowserEnv() {
  return function isURLSameOrigin() {
    return true;
  };
}();

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(29);

var settle = __webpack_require__(35);

var buildFullPath = __webpack_require__(37);

var buildURL = __webpack_require__(30);

var http = __webpack_require__(38);

var https = __webpack_require__(39);

var httpFollow = __webpack_require__(40).http;

var httpsFollow = __webpack_require__(40).https;

var url = __webpack_require__(41);

var zlib = __webpack_require__(70);

var pkg = __webpack_require__(71);

var createError = __webpack_require__(31);

var enhanceError = __webpack_require__(36);

var isHttps = /https:?/;
/**
 *
 * @param {http.ClientRequestArgs} options
 * @param {AxiosProxyConfig} proxy
 * @param {string} location
 */

function setProxy(options, proxy, location) {
  options.hostname = proxy.host;
  options.host = proxy.host;
  options.port = proxy.port;
  options.path = location; // Basic proxy authorization

  if (proxy.auth) {
    var base64 = Buffer.from(proxy.auth.username + ':' + proxy.auth.password, 'utf8').toString('base64');
    options.headers['Proxy-Authorization'] = 'Basic ' + base64;
  } // If a proxy is used, any redirects must also pass through the proxy


  options.beforeRedirect = function beforeRedirect(redirection) {
    redirection.headers.host = redirection.host;
    setProxy(redirection, proxy, redirection.href);
  };
}
/*eslint consistent-return:0*/


module.exports = function httpAdapter(config) {
  return new Promise(function dispatchHttpRequest(resolvePromise, rejectPromise) {
    var resolve = function resolve(value) {
      resolvePromise(value);
    };

    var reject = function reject(value) {
      rejectPromise(value);
    };

    var data = config.data;
    var headers = config.headers; // Set User-Agent (required by some servers)
    // Only set header if it hasn't been set in config
    // See https://github.com/axios/axios/issues/69

    if (!headers['User-Agent'] && !headers['user-agent']) {
      headers['User-Agent'] = 'axios/' + pkg.version;
    }

    if (data && !utils.isStream(data)) {
      if (Buffer.isBuffer(data)) {// Nothing to do...
      } else if (utils.isArrayBuffer(data)) {
        data = Buffer.from(new Uint8Array(data));
      } else if (utils.isString(data)) {
        data = Buffer.from(data, 'utf-8');
      } else {
        return reject(createError('Data after transformation must be a string, an ArrayBuffer, a Buffer, or a Stream', config));
      } // Add Content-Length header if data exists


      headers['Content-Length'] = data.length;
    } // HTTP basic authentication


    var auth = undefined;

    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      auth = username + ':' + password;
    } // Parse url


    var fullPath = buildFullPath(config.baseURL, config.url);
    var parsed = url.parse(fullPath);
    var protocol = parsed.protocol || 'http:';

    if (!auth && parsed.auth) {
      var urlAuth = parsed.auth.split(':');
      var urlUsername = urlAuth[0] || '';
      var urlPassword = urlAuth[1] || '';
      auth = urlUsername + ':' + urlPassword;
    }

    if (auth) {
      delete headers.Authorization;
    }

    var isHttpsRequest = isHttps.test(protocol);
    var agent = isHttpsRequest ? config.httpsAgent : config.httpAgent;
    var options = {
      path: buildURL(parsed.path, config.params, config.paramsSerializer).replace(/^\?/, ''),
      method: config.method.toUpperCase(),
      headers: headers,
      agent: agent,
      agents: {
        http: config.httpAgent,
        https: config.httpsAgent
      },
      auth: auth
    };

    if (config.socketPath) {
      options.socketPath = config.socketPath;
    } else {
      options.hostname = parsed.hostname;
      options.port = parsed.port;
    }

    var proxy = config.proxy;

    if (!proxy && proxy !== false) {
      var proxyEnv = protocol.slice(0, -1) + '_proxy';
      var proxyUrl = process.env[proxyEnv] || process.env[proxyEnv.toUpperCase()];

      if (proxyUrl) {
        var parsedProxyUrl = url.parse(proxyUrl);
        var noProxyEnv = process.env.no_proxy || process.env.NO_PROXY;
        var shouldProxy = true;

        if (noProxyEnv) {
          var noProxy = noProxyEnv.split(',').map(function trim(s) {
            return s.trim();
          });
          shouldProxy = !noProxy.some(function proxyMatch(proxyElement) {
            if (!proxyElement) {
              return false;
            }

            if (proxyElement === '*') {
              return true;
            }

            if (proxyElement[0] === '.' && parsed.hostname.substr(parsed.hostname.length - proxyElement.length) === proxyElement) {
              return true;
            }

            return parsed.hostname === proxyElement;
          });
        }

        if (shouldProxy) {
          proxy = {
            host: parsedProxyUrl.hostname,
            port: parsedProxyUrl.port,
            protocol: parsedProxyUrl.protocol
          };

          if (parsedProxyUrl.auth) {
            var proxyUrlAuth = parsedProxyUrl.auth.split(':');
            proxy.auth = {
              username: proxyUrlAuth[0],
              password: proxyUrlAuth[1]
            };
          }
        }
      }
    }

    if (proxy) {
      options.headers.host = parsed.hostname + (parsed.port ? ':' + parsed.port : '');
      setProxy(options, proxy, protocol + '//' + parsed.hostname + (parsed.port ? ':' + parsed.port : '') + options.path);
    }

    var transport;
    var isHttpsProxy = isHttpsRequest && (proxy ? isHttps.test(proxy.protocol) : true);

    if (config.transport) {
      transport = config.transport;
    } else if (config.maxRedirects === 0) {
      transport = isHttpsProxy ? https : http;
    } else {
      if (config.maxRedirects) {
        options.maxRedirects = config.maxRedirects;
      }

      transport = isHttpsProxy ? httpsFollow : httpFollow;
    }

    if (config.maxBodyLength > -1) {
      options.maxBodyLength = config.maxBodyLength;
    } // Create the request


    var req = transport.request(options, function handleResponse(res) {
      if (req.aborted) return; // uncompress the response body transparently if required

      var stream = res; // return the last request in case of redirects

      var lastRequest = res.req || req; // if no content, is HEAD request or decompress disabled we should not decompress

      if (res.statusCode !== 204 && lastRequest.method !== 'HEAD' && config.decompress !== false) {
        switch (res.headers['content-encoding']) {
          /*eslint default-case:0*/
          case 'gzip':
          case 'compress':
          case 'deflate':
            // add the unzipper to the body stream processing pipeline
            stream = stream.pipe(zlib.createUnzip()); // remove the content-encoding in order to not confuse downstream operations

            delete res.headers['content-encoding'];
            break;
        }
      }

      var response = {
        status: res.statusCode,
        statusText: res.statusMessage,
        headers: res.headers,
        config: config,
        request: lastRequest
      };

      if (config.responseType === 'stream') {
        response.data = stream;
        settle(resolve, reject, response);
      } else {
        var responseBuffer = [];
        stream.on('data', function handleStreamData(chunk) {
          responseBuffer.push(chunk); // make sure the content length is not over the maxContentLength if specified

          if (config.maxContentLength > -1 && Buffer.concat(responseBuffer).length > config.maxContentLength) {
            stream.destroy();
            reject(createError('maxContentLength size of ' + config.maxContentLength + ' exceeded', config, null, lastRequest));
          }
        });
        stream.on('error', function handleStreamError(err) {
          if (req.aborted) return;
          reject(enhanceError(err, config, null, lastRequest));
        });
        stream.on('end', function handleStreamEnd() {
          var responseData = Buffer.concat(responseBuffer);

          if (config.responseType !== 'arraybuffer') {
            responseData = responseData.toString(config.responseEncoding);

            if (!config.responseEncoding || config.responseEncoding === 'utf8') {
              responseData = utils.stripBOM(responseData);
            }
          }

          response.data = responseData;
          settle(resolve, reject, response);
        });
      }
    }); // Handle errors

    req.on('error', function handleRequestError(err) {
      if (req.aborted && err.code !== 'ERR_FR_TOO_MANY_REDIRECTS') return;
      reject(enhanceError(err, config, null, req));
    }); // Handle request timeout

    if (config.timeout) {
      // Sometime, the response will be very slow, and does not respond, the connect event will be block by event loop system.
      // And timer callback will be fired, and abort() will be invoked before connection, then get "socket hang up" and code ECONNRESET.
      // At this time, if we have a large number of request, nodejs will hang up some socket on background. and the number will up and up.
      // And then these socket which be hang up will devoring CPU little by little.
      // ClientRequest.setTimeout will be fired on the specify milliseconds, and can make sure that abort() will be fired after connect.
      req.setTimeout(config.timeout, function handleRequestTimeout() {
        req.abort();
        reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED', req));
      });
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (req.aborted) return;
        req.abort();
        reject(cancel);
      });
    } // Send the request


    if (utils.isStream(data)) {
      data.on('error', function handleStreamError(err) {
        reject(enhanceError(err, config, null, req));
      }).pipe(req);
    } else {
      req.end(data);
    }
  });
};

/***/ }),
/* 59 */
/***/ (function(module, exports) {

module.exports = require("stream");

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

var debug;

module.exports = function () {
  if (!debug) {
    try {
      /* eslint global-require: off */
      debug = __webpack_require__(61)("follow-redirects");
    } catch (error) {
      debug = function () {
        /* */
      };
    }
  }

  debug.apply(null, arguments);
};

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Detect Electron renderer / nwjs process, which is node, but we should
 * treat as a browser.
 */
if (typeof process === 'undefined' || process.type === 'renderer' || process.browser === true || process.__nwjs) {
  module.exports = __webpack_require__(62);
} else {
  module.exports = __webpack_require__(64);
}

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

/* eslint-env browser */

/**
 * This is the web browser implementation of `debug()`.
 */
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = localstorage();

exports.destroy = (() => {
  let warned = false;
  return () => {
    if (!warned) {
      warned = true;
      console.warn('Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
    }
  };
})();
/**
 * Colors.
 */


exports.colors = ['#0000CC', '#0000FF', '#0033CC', '#0033FF', '#0066CC', '#0066FF', '#0099CC', '#0099FF', '#00CC00', '#00CC33', '#00CC66', '#00CC99', '#00CCCC', '#00CCFF', '#3300CC', '#3300FF', '#3333CC', '#3333FF', '#3366CC', '#3366FF', '#3399CC', '#3399FF', '#33CC00', '#33CC33', '#33CC66', '#33CC99', '#33CCCC', '#33CCFF', '#6600CC', '#6600FF', '#6633CC', '#6633FF', '#66CC00', '#66CC33', '#9900CC', '#9900FF', '#9933CC', '#9933FF', '#99CC00', '#99CC33', '#CC0000', '#CC0033', '#CC0066', '#CC0099', '#CC00CC', '#CC00FF', '#CC3300', '#CC3333', '#CC3366', '#CC3399', '#CC33CC', '#CC33FF', '#CC6600', '#CC6633', '#CC9900', '#CC9933', '#CCCC00', '#CCCC33', '#FF0000', '#FF0033', '#FF0066', '#FF0099', '#FF00CC', '#FF00FF', '#FF3300', '#FF3333', '#FF3366', '#FF3399', '#FF33CC', '#FF33FF', '#FF6600', '#FF6633', '#FF9900', '#FF9933', '#FFCC00', '#FFCC33'];
/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */
// eslint-disable-next-line complexity

function useColors() {
  // NB: In an Electron preload script, document will be defined but not fully
  // initialized. Since we know we're in Chrome, we'll just detect this case
  // explicitly
  if (typeof window !== 'undefined' && window.process && (window.process.type === 'renderer' || window.process.__nwjs)) {
    return true;
  } // Internet Explorer and Edge do not support colors.


  if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
    return false;
  } // Is webkit? http://stackoverflow.com/a/16459606/376773
  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632


  return typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
  typeof window !== 'undefined' && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
  // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
  typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
  typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
}
/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */


function formatArgs(args) {
  args[0] = (this.useColors ? '%c' : '') + this.namespace + (this.useColors ? ' %c' : ' ') + args[0] + (this.useColors ? '%c ' : ' ') + '+' + module.exports.humanize(this.diff);

  if (!this.useColors) {
    return;
  }

  const c = 'color: ' + this.color;
  args.splice(1, 0, c, 'color: inherit'); // The final "%c" is somewhat tricky, because there could be other
  // arguments passed either before or after the %c, so we need to
  // figure out the correct index to insert the CSS into

  let index = 0;
  let lastC = 0;
  args[0].replace(/%[a-zA-Z%]/g, match => {
    if (match === '%%') {
      return;
    }

    index++;

    if (match === '%c') {
      // We only are interested in the *last* %c
      // (the user may have provided their own)
      lastC = index;
    }
  });
  args.splice(lastC, 0, c);
}
/**
 * Invokes `console.debug()` when available.
 * No-op when `console.debug` is not a "function".
 * If `console.debug` is not available, falls back
 * to `console.log`.
 *
 * @api public
 */


exports.log = console.debug || console.log || (() => {});
/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */


function save(namespaces) {
  try {
    if (namespaces) {
      exports.storage.setItem('debug', namespaces);
    } else {
      exports.storage.removeItem('debug');
    }
  } catch (error) {// Swallow
    // XXX (@Qix-) should we be logging these?
  }
}
/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */


function load() {
  let r;

  try {
    r = exports.storage.getItem('debug');
  } catch (error) {// Swallow
    // XXX (@Qix-) should we be logging these?
  } // If debug isn't set in LS, and we're in Electron, try to load $DEBUG


  if (!r && typeof process !== 'undefined' && 'env' in process) {
    r = process.env.DEBUG;
  }

  return r;
}
/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */


function localstorage() {
  try {
    // TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context
    // The Browser also has localStorage in the global context.
    return localStorage;
  } catch (error) {// Swallow
    // XXX (@Qix-) should we be logging these?
  }
}

module.exports = __webpack_require__(42)(exports);
const {
  formatters
} = module.exports;
/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

formatters.j = function (v) {
  try {
    return JSON.stringify(v);
  } catch (error) {
    return '[UnexpectedJSONParseError]: ' + error.message;
  }
};

/***/ }),
/* 63 */
/***/ (function(module, exports) {

/**
 * Helpers.
 */
var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var w = d * 7;
var y = d * 365.25;
/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function (val, options) {
  options = options || {};
  var type = typeof val;

  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isFinite(val)) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }

  throw new Error('val is not a non-empty string or a valid number. val=' + JSON.stringify(val));
};
/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */


function parse(str) {
  str = String(str);

  if (str.length > 100) {
    return;
  }

  var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(str);

  if (!match) {
    return;
  }

  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();

  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;

    case 'weeks':
    case 'week':
    case 'w':
      return n * w;

    case 'days':
    case 'day':
    case 'd':
      return n * d;

    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;

    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;

    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;

    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;

    default:
      return undefined;
  }
}
/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */


function fmtShort(ms) {
  var msAbs = Math.abs(ms);

  if (msAbs >= d) {
    return Math.round(ms / d) + 'd';
  }

  if (msAbs >= h) {
    return Math.round(ms / h) + 'h';
  }

  if (msAbs >= m) {
    return Math.round(ms / m) + 'm';
  }

  if (msAbs >= s) {
    return Math.round(ms / s) + 's';
  }

  return ms + 'ms';
}
/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */


function fmtLong(ms) {
  var msAbs = Math.abs(ms);

  if (msAbs >= d) {
    return plural(ms, msAbs, d, 'day');
  }

  if (msAbs >= h) {
    return plural(ms, msAbs, h, 'hour');
  }

  if (msAbs >= m) {
    return plural(ms, msAbs, m, 'minute');
  }

  if (msAbs >= s) {
    return plural(ms, msAbs, s, 'second');
  }

  return ms + ' ms';
}
/**
 * Pluralization helper.
 */


function plural(ms, msAbs, n, name) {
  var isPlural = msAbs >= n * 1.5;
  return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '');
}

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module dependencies.
 */
const tty = __webpack_require__(65);

const util = __webpack_require__(66);
/**
 * This is the Node.js implementation of `debug()`.
 */


exports.init = init;
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.destroy = util.deprecate(() => {}, 'Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
/**
 * Colors.
 */

exports.colors = [6, 2, 3, 4, 5, 1];

try {
  // Optional dependency (as in, doesn't need to be installed, NOT like optionalDependencies in package.json)
  // eslint-disable-next-line import/no-extraneous-dependencies
  const supportsColor = __webpack_require__(67);

  if (supportsColor && (supportsColor.stderr || supportsColor).level >= 2) {
    exports.colors = [20, 21, 26, 27, 32, 33, 38, 39, 40, 41, 42, 43, 44, 45, 56, 57, 62, 63, 68, 69, 74, 75, 76, 77, 78, 79, 80, 81, 92, 93, 98, 99, 112, 113, 128, 129, 134, 135, 148, 149, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 178, 179, 184, 185, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 214, 215, 220, 221];
  }
} catch (error) {// Swallow - we only care if `supports-color` is available; it doesn't have to be.
}
/**
 * Build up the default `inspectOpts` object from the environment variables.
 *
 *   $ DEBUG_COLORS=no DEBUG_DEPTH=10 DEBUG_SHOW_HIDDEN=enabled node script.js
 */


exports.inspectOpts = Object.keys(process.env).filter(key => {
  return /^debug_/i.test(key);
}).reduce((obj, key) => {
  // Camel-case
  const prop = key.substring(6).toLowerCase().replace(/_([a-z])/g, (_, k) => {
    return k.toUpperCase();
  }); // Coerce string value into JS value

  let val = process.env[key];

  if (/^(yes|on|true|enabled)$/i.test(val)) {
    val = true;
  } else if (/^(no|off|false|disabled)$/i.test(val)) {
    val = false;
  } else if (val === 'null') {
    val = null;
  } else {
    val = Number(val);
  }

  obj[prop] = val;
  return obj;
}, {});
/**
 * Is stdout a TTY? Colored output is enabled when `true`.
 */

function useColors() {
  return 'colors' in exports.inspectOpts ? Boolean(exports.inspectOpts.colors) : tty.isatty(process.stderr.fd);
}
/**
 * Adds ANSI color escape codes if enabled.
 *
 * @api public
 */


function formatArgs(args) {
  const {
    namespace: name,
    useColors
  } = this;

  if (useColors) {
    const c = this.color;
    const colorCode = '\u001B[3' + (c < 8 ? c : '8;5;' + c);
    const prefix = `  ${colorCode};1m${name} \u001B[0m`;
    args[0] = prefix + args[0].split('\n').join('\n' + prefix);
    args.push(colorCode + 'm+' + module.exports.humanize(this.diff) + '\u001B[0m');
  } else {
    args[0] = getDate() + name + ' ' + args[0];
  }
}

function getDate() {
  if (exports.inspectOpts.hideDate) {
    return '';
  }

  return new Date().toISOString() + ' ';
}
/**
 * Invokes `util.format()` with the specified arguments and writes to stderr.
 */


function log(...args) {
  return process.stderr.write(util.format(...args) + '\n');
}
/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */


function save(namespaces) {
  if (namespaces) {
    process.env.DEBUG = namespaces;
  } else {
    // If you set a process.env field to null or undefined, it gets cast to the
    // string 'null' or 'undefined'. Just delete instead.
    delete process.env.DEBUG;
  }
}
/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */


function load() {
  return process.env.DEBUG;
}
/**
 * Init logic for `debug` instances.
 *
 * Create a new `inspectOpts` object in case `useColors` is set
 * differently for a particular `debug` instance.
 */


function init(debug) {
  debug.inspectOpts = {};
  const keys = Object.keys(exports.inspectOpts);

  for (let i = 0; i < keys.length; i++) {
    debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
  }
}

module.exports = __webpack_require__(42)(exports);
const {
  formatters
} = module.exports;
/**
 * Map %o to `util.inspect()`, all on a single line.
 */

formatters.o = function (v) {
  this.inspectOpts.colors = this.useColors;
  return util.inspect(v, this.inspectOpts).split('\n').map(str => str.trim()).join(' ');
};
/**
 * Map %O to `util.inspect()`, allowing multiple lines if needed.
 */


formatters.O = function (v) {
  this.inspectOpts.colors = this.useColors;
  return util.inspect(v, this.inspectOpts);
};

/***/ }),
/* 65 */
/***/ (function(module, exports) {

module.exports = require("tty");

/***/ }),
/* 66 */
/***/ (function(module, exports) {

module.exports = require("util");

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const os = __webpack_require__(68);

const hasFlag = __webpack_require__(69);

const env = process.env;
let forceColor;

if (hasFlag('no-color') || hasFlag('no-colors') || hasFlag('color=false')) {
  forceColor = false;
} else if (hasFlag('color') || hasFlag('colors') || hasFlag('color=true') || hasFlag('color=always')) {
  forceColor = true;
}

if ('FORCE_COLOR' in env) {
  forceColor = env.FORCE_COLOR.length === 0 || parseInt(env.FORCE_COLOR, 10) !== 0;
}

function translateLevel(level) {
  if (level === 0) {
    return false;
  }

  return {
    level,
    hasBasic: true,
    has256: level >= 2,
    has16m: level >= 3
  };
}

function supportsColor(stream) {
  if (forceColor === false) {
    return 0;
  }

  if (hasFlag('color=16m') || hasFlag('color=full') || hasFlag('color=truecolor')) {
    return 3;
  }

  if (hasFlag('color=256')) {
    return 2;
  }

  if (stream && !stream.isTTY && forceColor !== true) {
    return 0;
  }

  const min = forceColor ? 1 : 0;

  if (process.platform === 'win32') {
    // Node.js 7.5.0 is the first version of Node.js to include a patch to
    // libuv that enables 256 color output on Windows. Anything earlier and it
    // won't work. However, here we target Node.js 8 at minimum as it is an LTS
    // release, and Node.js 7 is not. Windows 10 build 10586 is the first Windows
    // release that supports 256 colors. Windows 10 build 14931 is the first release
    // that supports 16m/TrueColor.
    const osRelease = os.release().split('.');

    if (Number(process.versions.node.split('.')[0]) >= 8 && Number(osRelease[0]) >= 10 && Number(osRelease[2]) >= 10586) {
      return Number(osRelease[2]) >= 14931 ? 3 : 2;
    }

    return 1;
  }

  if ('CI' in env) {
    if (['TRAVIS', 'CIRCLECI', 'APPVEYOR', 'GITLAB_CI'].some(sign => sign in env) || env.CI_NAME === 'codeship') {
      return 1;
    }

    return min;
  }

  if ('TEAMCITY_VERSION' in env) {
    return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
  }

  if (env.COLORTERM === 'truecolor') {
    return 3;
  }

  if ('TERM_PROGRAM' in env) {
    const version = parseInt((env.TERM_PROGRAM_VERSION || '').split('.')[0], 10);

    switch (env.TERM_PROGRAM) {
      case 'iTerm.app':
        return version >= 3 ? 3 : 2;

      case 'Apple_Terminal':
        return 2;
      // No default
    }
  }

  if (/-256(color)?$/i.test(env.TERM)) {
    return 2;
  }

  if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
    return 1;
  }

  if ('COLORTERM' in env) {
    return 1;
  }

  if (env.TERM === 'dumb') {
    return min;
  }

  return min;
}

function getSupportLevel(stream) {
  const level = supportsColor(stream);
  return translateLevel(level);
}

module.exports = {
  supportsColor: getSupportLevel,
  stdout: getSupportLevel(process.stdout),
  stderr: getSupportLevel(process.stderr)
};

/***/ }),
/* 68 */
/***/ (function(module, exports) {

module.exports = require("os");

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = (flag, argv) => {
  argv = argv || process.argv;
  const prefix = flag.startsWith('-') ? '' : flag.length === 1 ? '-' : '--';
  const pos = argv.indexOf(prefix + flag);
  const terminatorPos = argv.indexOf('--');
  return pos !== -1 && (terminatorPos === -1 ? true : pos < terminatorPos);
};

/***/ }),
/* 70 */
/***/ (function(module, exports) {

module.exports = require("zlib");

/***/ }),
/* 71 */
/***/ (function(module) {

module.exports = JSON.parse("{\"_from\":\"axios\",\"_id\":\"axios@0.21.1\",\"_inBundle\":false,\"_integrity\":\"sha512-dKQiRHxGD9PPRIUNIWvZhPTPpl1rf/OxTYKsqKUDjBwYylTvV7SjSHJb9ratfyzM6wCdLCOYLzs73qpg5c4iGA==\",\"_location\":\"/axios\",\"_phantomChildren\":{},\"_requested\":{\"type\":\"tag\",\"registry\":true,\"raw\":\"axios\",\"name\":\"axios\",\"escapedName\":\"axios\",\"rawSpec\":\"\",\"saveSpec\":null,\"fetchSpec\":\"latest\"},\"_requiredBy\":[\"#USER\",\"/\"],\"_resolved\":\"https://registry.npmjs.org/axios/-/axios-0.21.1.tgz\",\"_shasum\":\"22563481962f4d6bde9a76d516ef0e5d3c09b2b8\",\"_spec\":\"axios\",\"_where\":\"C:\\\\Users\\\\joe\\\\Desktop\\\\fivem-server-with-new-plugin\\\\server-data\\\\resources\\\\vote\\\\src\",\"author\":{\"name\":\"Matt Zabriskie\"},\"browser\":{\"./lib/adapters/http.js\":\"./lib/adapters/xhr.js\"},\"bugs\":{\"url\":\"https://github.com/axios/axios/issues\"},\"bundleDependencies\":false,\"bundlesize\":[{\"path\":\"./dist/axios.min.js\",\"threshold\":\"5kB\"}],\"dependencies\":{\"follow-redirects\":\"^1.10.0\"},\"deprecated\":false,\"description\":\"Promise based HTTP client for the browser and node.js\",\"devDependencies\":{\"bundlesize\":\"^0.17.0\",\"coveralls\":\"^3.0.0\",\"es6-promise\":\"^4.2.4\",\"grunt\":\"^1.0.2\",\"grunt-banner\":\"^0.6.0\",\"grunt-cli\":\"^1.2.0\",\"grunt-contrib-clean\":\"^1.1.0\",\"grunt-contrib-watch\":\"^1.0.0\",\"grunt-eslint\":\"^20.1.0\",\"grunt-karma\":\"^2.0.0\",\"grunt-mocha-test\":\"^0.13.3\",\"grunt-ts\":\"^6.0.0-beta.19\",\"grunt-webpack\":\"^1.0.18\",\"istanbul-instrumenter-loader\":\"^1.0.0\",\"jasmine-core\":\"^2.4.1\",\"karma\":\"^1.3.0\",\"karma-chrome-launcher\":\"^2.2.0\",\"karma-coverage\":\"^1.1.1\",\"karma-firefox-launcher\":\"^1.1.0\",\"karma-jasmine\":\"^1.1.1\",\"karma-jasmine-ajax\":\"^0.1.13\",\"karma-opera-launcher\":\"^1.0.0\",\"karma-safari-launcher\":\"^1.0.0\",\"karma-sauce-launcher\":\"^1.2.0\",\"karma-sinon\":\"^1.0.5\",\"karma-sourcemap-loader\":\"^0.3.7\",\"karma-webpack\":\"^1.7.0\",\"load-grunt-tasks\":\"^3.5.2\",\"minimist\":\"^1.2.0\",\"mocha\":\"^5.2.0\",\"sinon\":\"^4.5.0\",\"typescript\":\"^2.8.1\",\"url-search-params\":\"^0.10.0\",\"webpack\":\"^1.13.1\",\"webpack-dev-server\":\"^1.14.1\"},\"homepage\":\"https://github.com/axios/axios\",\"jsdelivr\":\"dist/axios.min.js\",\"keywords\":[\"xhr\",\"http\",\"ajax\",\"promise\",\"node\"],\"license\":\"MIT\",\"main\":\"index.js\",\"name\":\"axios\",\"repository\":{\"type\":\"git\",\"url\":\"git+https://github.com/axios/axios.git\"},\"scripts\":{\"build\":\"NODE_ENV=production grunt build\",\"coveralls\":\"cat coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js\",\"examples\":\"node ./examples/server.js\",\"fix\":\"eslint --fix lib/**/*.js\",\"postversion\":\"git push && git push --tags\",\"preversion\":\"npm test\",\"start\":\"node ./sandbox/server.js\",\"test\":\"grunt test && bundlesize\",\"version\":\"npm run build && grunt version && git add -A dist && git add CHANGELOG.md bower.json package.json\"},\"typings\":\"./index.d.ts\",\"unpkg\":\"dist/axios.min.js\",\"version\":\"0.21.1\"}");

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(44);
/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */


function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });
  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}
/**
 * Throws a `Cancel` if cancellation has been requested.
 */


CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};
/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */


CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */

module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Determines whether the payload is an error thrown by Axios
 *
 * @param {*} payload The value to test
 * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
 */

module.exports = function isAxiosError(payload) {
  return typeof payload === 'object' && payload.isAxiosError === true;
};

/***/ }),
/* 75 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "dgram"
var external_dgram_ = __webpack_require__(11);
var external_dgram_default = /*#__PURE__*/__webpack_require__.n(external_dgram_);

// EXTERNAL MODULE: ./node_modules/node-rsa/src/NodeRSA.js
var NodeRSA = __webpack_require__(12);
var NodeRSA_default = /*#__PURE__*/__webpack_require__.n(NodeRSA);

// CONCATENATED MODULE: ./app/server/Decrypter.js

const privKey = "-----BEGIN RSA PRIVATE KEY-----\n" + "MIIEowIBAAKCAQEAn3lQ4t0MB1Q78GMJeRg5xht2OkQpDodjH6snzNXDQgqPyXR8\n" + "34Z7lNvqQpNUHEybXZTcRWK3vrif6Zw2zk59YeK6IPS8tQU7DPmjfGc3f1DuZ31+\n" + "y4jKzbza9TEKGxdNLcbayPUWP3XOOHLlO36EEnvOh3070QZzohHz1Zig3IwmsuwS\n" + "qe3njWHNBUxDJ60o+XaqMPozU1LqhTDAz0pP99hnEN+9FbaxyF5sOUbL4bBX7Xf1\n" + "x49H9YZ7HcpiXj4GDr/cBNY2ObAJS9oEIhRlo3/zEpDZewDH5a3ZEM8jpxarqXTN\n" + "AOEUPpmwynvMkYlxVajHmCcmtOuSesr3LYXB+wIDAQABAoIBAANXSk+GbAMXS64s\n" + "lP05ebRhzOdJmEaapYP7VPkgnVeb2wlQbHFOYvZqaQz+AywYmsSqIrc9azYOriL5\n" + "x9goos3TLy0Tk4SDWIpcDIXFr872Bhia83YWJpGK3Fd4sIqCwXYtDVZadB3ePPTH\n" + "y2+kpeWxPFFwWTl21iNWFvKpoO0d5frVnn+yqgadPLrqUbWERugPTXADEXdV9wM8\n" + "XgnafvTqBho9BV2un54QCx5aR6DvIf2vc+FeaDb56rTzFr0jQEXW6vD4quQoCw0j\n" + "pn7/XBOUqllniQQdjzyEWRMOIy1e7CjSbxj25XL80dnrGz1JnnR+14P2HA4ZwlTg\n" + "eesb/xECgYEA7OXkK6sgAxnN828RiZ77j3vAvpCn/8l+e5J1YFjDyplCQELVPqcV\n" + "p4gLToazzKXxHchHL4/iIW1mhTZyN5rJQI28wf/0EZ/9qrPrbQ24LxP37Am9YLhq\n" + "MN7Yh9CqQkXPis2B0Rd8OiaMUf56tWeEGZeTnsVTpvUL59+JyYpZJIMCgYEArFU3\n" + "Yr2zp23vVYy2Ckx41sV0wW3ibUN054u9MLCZY1vLGeQE+VwsFAFd5YBYFNJyDK9E\n" + "/gAPTW3PeNGRR58ZhPls3IKgKgpTnNW0HKVC13sR1E5lA1weQxvLI36Q+tRM/vjs\n" + "2JkIqsGsoZiNFlhJoe3yGrCWtldO5fdl8pvrIykCgYEAyJd81fEnwRhniHqCyhpB\n" + "fmRWd8Y7St6N6ArCsttWpkWRkKJGuK94KYyLrmlm86GLgiFlDYPzAUUGa0QIAMdj\n" + "I/MgYtDdFNN5UsLYVVYpoEtzQX2Zyr08xbbceFwa3tUIAMs04hzVxtN/O6qUsug9\n" + "NgJgMC98PsH929AvduVbyAsCgYAUKSgAmjbRSJAuTvbg/49HePQuyN8rby/XAscQ\n" + "UiivsgZxsfZPAdR6RqqodbpYPUJwb3S/zlv77/PMq5+2ZEuE/fUZWwLHyEt91pZq\n" + "n37RXKl6T+2LVhSIP1ElhuIJJhsX3SFAOa8E4wGCKimfSpbapc6kBrKrBE3Lo4S+\n" + "vDTm+QKBgDDI8/VUt5vULgQIm2+96zLHHGePTLss/4VTF+uQIQUjxEACxxurwZfK\n" + "FAErqNefzK+IRj5NDxvTB+8CGVZYipfkHvjyAWtlcxj4d0U8AhGA0KwFM8Us+21W\n" + "wDvd7HsIogJ3Kl3HxvF1xuzderc+6+X6ejohnIsznd80Nknw0a+L\n" + "-----END RSA PRIVATE KEY-----";

class Decrypter_Decrypter {
  constructor() {
    this.key = new NodeRSA_default.a(privKey);
  }

  decrypt(content) {
    try {
      return this.key.decrypt(content, "utf8");
    } catch (e) {
      console.log("ERROR: Unable to decrypt the Vote");
    }
  }

}

/* harmony default export */ var server_Decrypter = (Decrypter_Decrypter);
// EXTERNAL MODULE: ./node_modules/axios/index.js
var axios = __webpack_require__(45);
var axios_default = /*#__PURE__*/__webpack_require__.n(axios);

// CONCATENATED MODULE: ./app/server/Security.js


class Security_Security {
  constructor(env) {
    this.env = env;
    this.trustedIP = ["XXXXXXX"];
    this.loadTrustedIP();
  }

  loadTrustedIP() {
    axios_default.a.get("https://top-games.net/trusted-ip.json").then(response => {
      const {
        list
      } = response === null || response === void 0 ? void 0 : response.data;

      if (list) {
        this.trustedIP = list;

        if (this.env === 'dev') {
          this.trustedIP.push("127.0.0.1");
        }
      } else {
        throw new Error("Invalid JSON");
      }
    }).catch(e => {
      console.log("ERROR: Unable to get trusted IP list from remote. Using default list.");
    });
  }

  isTrustedIP(ip) {
    return this.trustedIP.includes(ip);
  }

}

/* harmony default export */ var server_Security = (Security_Security);
// EXTERNAL MODULE: ./package.json
var package_0 = __webpack_require__(76);

// CONCATENATED MODULE: ./app/server/VoteReceptor.js


class VoteReceptor_VoteReceptor {
  constructor(token) {
    this.token = token;
  }

  checkPlayername(playername) {
    const regex = /[A-zÀ-ÿ0-9-_]/g;
    if (!playername) return false;
    if (playername.length > 100) return false;
    return playername.match(regex);
  }

  checkIP(ip) {
    const regex = /[0-9.:]/g;
    if (!ip) return false;
    if (ip.length > 100) return false;
    return ip.match(regex);
  }

  checkVersion(version) {
    const regex = /[0-9.]/g;
    if (!version) return false;
    if (version.length > 10) return false;
    return version.match(regex);
  }

  checkDate(date) {
    const regex = /^(\d{4})\/(\d{2})\/(\d{2}) (\d{2}):(\d{2}):(\d{2})$/;
    if (!date) return false;
    if (date.length > 25) return false;
    return date.match(regex);
  }

  hasError({
    token,
    playername,
    ip,
    version,
    date
  }) {
    if (token !== this.token) {
      return "Wrong vote token";
    }

    if (!this.checkPlayername(playername)) {
      return "Invalid playername";
    }

    if (!this.checkIP(ip)) {
      return "Invalid IP address";
    }

    if (!this.checkVersion(version)) {
      return "Invalid version";
    }

    if (!this.checkDate(date)) {
      return "Invalid date";
    }

    return null;
  }

  handleVote(vote) {
    const error = this.hasError(vote);

    if (error) {
      return console.log(`ERROR: ${error}`);
    }

    const {
      playername,
      ip,
      date,
      version
    } = vote;
    emit("onPlayerVote", playername, ip, date);

    if (version !== package_0.version) {
      console.log('WARNING: a new update is available for the vote plugin. Please keep it up to date.');
    }
  }

}

/* harmony default export */ var server_VoteReceptor = (VoteReceptor_VoteReceptor);
// CONCATENATED MODULE: ./app/server/Server.js






class Server_Server {
  constructor(config) {
    this.handleListening = () => {
      const address = this.socketServer.address();
      console.log(`The vote plugin is active and listening on port ${address.port}`);
    };

    this.handleMessage = (msg, rinfo) => {
      if (!this.security.isTrustedIP(rinfo.address)) {
        return console.log('ERROR: Receving a vote from an untrusted IP');
      }

      const payload = this.decrypter.decrypt(`${msg}`);

      if (payload.action === "vote") {
        this.voteReceptor.handleVote(payload);
      } else if (payload.action === "refresh_ip") {
        this.security.loadTrustedIP();
      } else if (payload.action === "test") {
        console.log('Test: The vote plugin is correctly linked to Top-games.net/Top-serveurs.net website');
      } else {
        console.log('ERROR: No action match the current payload');
      }

      console.log(payload);
    };

    this.handleError = error => {
      console.log(`ERROR: ${error.stack}`);
      this.socketServer.close();
    };

    const {
      token,
      port,
      env
    } = config;
    this.security = new server_Security(env);
    this.decrypter = new server_Decrypter();
    this.voteReceptor = new server_VoteReceptor(token);
    this.port = port;
    this.socketServer = external_dgram_default.a.createSocket('udp4');
  }

  start() {
    console.log(`Initializing vote plugin (v${package_0.version})...`);
    console.log(`Support Top-Games: https://top-games.net/contact`);
    console.log(`Support Top-Serveurs: https://top-serveurs.net/contact`);
    this.socketServer.on('error', this.handleError);
    this.socketServer.on('message', this.handleMessage);
    this.socketServer.on('listening', this.handleListening);
    this.socketServer.bind(this.port);
  }

}

/* harmony default export */ var server_Server = (Server_Server);
// CONCATENATED MODULE: ./app/index.js

const app_config = {
  port: GetConvar("vote_port", "8192"),
  token: GetConvar("vote_token", ""),
  env: GetConvar("vote_env", "prod")
};
const server = new server_Server(app_config);
on('onResourceStart', resourcename => {
  if (resourcename === 'vote') {
    if (app_config.token.length === 0) {
      console.log('ERROR: the vote token is missing in your config file. Please fill it!');
    } else {
      server.start();
      emit('onVoteReady');
    }
  }
});

/***/ }),
/* 76 */
/***/ (function(module) {

module.exports = JSON.parse("{\"name\":\"fivem-vote-plugin\",\"version\":\"1.0.0\",\"description\":\"A Fivem vote plugin for Top-games.net/Top-serveurs.net platforms\",\"scripts\":{\"build\":\"webpack --progress\",\"dev\":\"webpack --watch --progress\"},\"license\":\"MIT\",\"dependencies\":{\"axios\":\"^0.21.1\",\"node-rsa\":\"^1.1.1\"},\"devDependencies\":{\"@babel/core\":\"^7.14.3\",\"@babel/eslint-parser\":\"^7.14.4\",\"@babel/eslint-plugin\":\"^7.13.16\",\"@babel/preset-env\":\"^7.14.4\",\"@citizenfx/server\":\"^1.0.2624-1\",\"babel-eslint\":\"^10.1.0\",\"babel-loader\":\"^8.2.2\",\"babel-plugin-transform-class-properties\":\"^6.24.1\",\"eslint\":\"^6.8.0\",\"webpack\":\"^4.46.0\",\"webpack-cli\":\"^3.3.12\"}}");

/***/ })
/******/ ]);