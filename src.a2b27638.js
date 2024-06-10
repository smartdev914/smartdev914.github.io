// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"lib/p5.collide2d.min.js":[function(require,module,exports) {
/*
Repo: https://github.com/bmoren/p5.collide2D/
Created by http://benmoren.com
Some functions and code modified version from http://www.jeffreythompson.org/collision-detection
Version 0.6 | Nov 28th, 2018
CC BY-NC-SA 4.0
*/

console.log("### p5.collide ###"), p5.prototype._collideDebug = !1, p5.prototype.collideDebug = function (i) {
  _collideDebug = i;
}, p5.prototype.collideRectRect = function (i, t, e, o, r, l, n, c) {
  return i + e >= r && i <= r + n && t + o >= l && t <= l + c;
}, p5.prototype.collideRectCircle = function (i, t, e, o, r, l, n) {
  var c = r,
    p = l;
  return r < i ? c = i : r > i + e && (c = i + e), l < t ? p = t : l > t + o && (p = t + o), this.dist(r, l, c, p) <= n / 2;
}, p5.prototype.collideCircleCircle = function (i, t, e, o, r, l) {
  return this.dist(i, t, o, r) <= e / 2 + l / 2;
}, p5.prototype.collidePointCircle = function (i, t, e, o, r) {
  return this.dist(i, t, e, o) <= r / 2;
}, p5.prototype.collidePointEllipse = function (i, t, e, o, r, l) {
  var n = r / 2,
    c = l / 2;
  if (i > e + n || i < e - n || t > o + c || t < o - c) return !1;
  var p = i - e,
    s = t - o,
    d = c * this.sqrt(this.abs(n * n - p * p)) / n;
  return s <= d && s >= -d;
}, p5.prototype.collidePointRect = function (i, t, e, o, r, l) {
  return i >= e && i <= e + r && t >= o && t <= o + l;
}, p5.prototype.collidePointLine = function (i, t, e, o, r, l, n) {
  var c = this.dist(i, t, e, o),
    p = this.dist(i, t, r, l),
    s = this.dist(e, o, r, l);
  return void 0 === n && (n = .1), c + p >= s - n && c + p <= s + n;
}, p5.prototype.collideLineCircle = function (i, t, e, o, r, l, n) {
  var c = this.collidePointCircle(i, t, r, l, n),
    p = this.collidePointCircle(e, o, r, l, n);
  if (c || p) return !0;
  var s = i - e,
    d = t - o,
    u = this.sqrt(s * s + d * d),
    h = ((r - i) * (e - i) + (l - t) * (o - t)) / this.pow(u, 2),
    y = i + h * (e - i),
    f = t + h * (o - t);
  return !!this.collidePointLine(y, f, i, t, e, o) && (this._collideDebug && this.ellipse(y, f, 10, 10), s = y - r, d = f - l, this.sqrt(s * s + d * d) <= n / 2);
}, p5.prototype.collideLineLine = function (i, t, e, o, r, l, n, c, p) {
  var s = ((n - r) * (t - l) - (c - l) * (i - r)) / ((c - l) * (e - i) - (n - r) * (o - t)),
    d = ((e - i) * (t - l) - (o - t) * (i - r)) / ((c - l) * (e - i) - (n - r) * (o - t));
  if (s >= 0 && s <= 1 && d >= 0 && d <= 1) {
    if (this._collideDebug || p) var u = i + s * (e - i),
      h = t + s * (o - t);
    return this._collideDebug && this.ellipse(u, h, 10, 10), !p || {
      x: u,
      y: h
    };
  }
  return !!p && {
    x: !1,
    y: !1
  };
}, p5.prototype.collideLineRect = function (i, t, e, o, r, l, n, c, p) {
  var s, d, u, h, y;
  return p ? (s = this.collideLineLine(i, t, e, o, r, l, r, l + c, !0), d = this.collideLineLine(i, t, e, o, r + n, l, r + n, l + c, !0), u = this.collideLineLine(i, t, e, o, r, l, r + n, l, !0), h = this.collideLineLine(i, t, e, o, r, l + c, r + n, l + c, !0), y = {
    left: s,
    right: d,
    top: u,
    bottom: h
  }) : (s = this.collideLineLine(i, t, e, o, r, l, r, l + c), d = this.collideLineLine(i, t, e, o, r + n, l, r + n, l + c), u = this.collideLineLine(i, t, e, o, r, l, r + n, l), h = this.collideLineLine(i, t, e, o, r, l + c, r + n, l + c)), !!(s || d || u || h) && (!p || y);
}, p5.prototype.collidePointPoly = function (i, t, e) {
  for (var o = !1, r = 0, l = 0; l < e.length; l++) {
    r = l + 1, r == e.length && (r = 0);
    var n = e[l],
      c = e[r];
    (n.y > t && c.y < t || n.y < t && c.y > t) && i < (c.x - n.x) * (t - n.y) / (c.y - n.y) + n.x && (o = !o);
  }
  return o;
}, p5.prototype.collideCirclePoly = function (i, t, e, o, r) {
  void 0 == r && (r = !1);
  for (var l = 0, n = 0; n < o.length; n++) {
    l = n + 1, l == o.length && (l = 0);
    var c = o[n],
      p = o[l];
    if (this.collideLineCircle(c.x, c.y, p.x, p.y, i, t, e)) return !0;
  }
  if (1 == r) {
    if (this.collidePointPoly(i, t, o)) return !0;
  }
  return !1;
}, p5.prototype.collideRectPoly = function (i, t, e, o, r, l) {
  void 0 == l && (l = !1);
  for (var n = 0, c = 0; c < r.length; c++) {
    n = c + 1, n == r.length && (n = 0);
    var p = r[c],
      s = r[n];
    if (this.collideLineRect(p.x, p.y, s.x, s.y, i, t, e, o)) return !0;
    if (1 == l) {
      if (this.collidePointPoly(i, t, r)) return !0;
    }
  }
  return !1;
}, p5.prototype.collideLinePoly = function (i, t, e, o, r) {
  for (var l = 0, n = 0; n < r.length; n++) {
    l = n + 1, l == r.length && (l = 0);
    var c = r[n].x,
      p = r[n].y,
      s = r[l].x,
      d = r[l].y;
    if (this.collideLineLine(i, t, e, o, c, p, s, d)) return !0;
  }
  return !1;
}, p5.prototype.collidePolyPoly = function (i, t, e) {
  void 0 == e && (e = !1);
  for (var o = 0, r = 0; r < i.length; r++) {
    o = r + 1, o == i.length && (o = 0);
    var l = i[r],
      n = i[o],
      c = this.collideLinePoly(l.x, l.y, n.x, n.y, t);
    if (c) return !0;
    if (1 == e && (c = this.collidePointPoly(t[0].x, t[0].y, i))) return !0;
  }
  return !1;
}, p5.prototype.collidePointTriangle = function (i, t, e, o, r, l, n, c) {
  var p = this.abs((r - e) * (c - o) - (n - e) * (l - o));
  return this.abs((e - i) * (l - t) - (r - i) * (o - t)) + this.abs((r - i) * (c - t) - (n - i) * (l - t)) + this.abs((n - i) * (o - t) - (e - i) * (c - t)) == p;
}, p5.prototype.collidePointPoint = function (i, t, e, o, r) {
  return void 0 == r && (r = 0), this.dist(i, t, e, o) <= r;
}, p5.prototype.collidePointArc = function (i, t, e, o, r, l, n, c) {
  void 0 == c && (c = 0);
  var p = this.createVector(i, t),
    s = this.createVector(e, o),
    d = this.createVector(r, 0).rotate(l),
    u = p.copy().sub(s);
  if (p.dist(s) <= r + c) {
    var h = d.dot(u),
      y = d.angleBetween(u);
    if (h > 0 && y <= n / 2 && y >= -n / 2) return !0;
  }
  return !1;
};
},{}],"src/background/bubble.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Bubble = exports.default = /*#__PURE__*/function () {
  function Bubble(sketch, size) {
    _classCallCheck(this, Bubble);
    this.xoff = sketch.random() * sketch.width;
    this.size = size;
    this.x = sketch.random() * sketch.width;
    this.y = sketch.height;
    this.speed = sketch.random() * 4;
  }
  return _createClass(Bubble, [{
    key: "draw",
    value: function draw(sketch) {
      this.update(sketch);
      sketch.push();
      sketch.noStroke();
      sketch.fill('rgba(100,250,33,0.5)');
      sketch.ellipse(this.x, this.y, this.size, this.size);
      sketch.pop();
    }
  }, {
    key: "update",
    value: function update(sketch) {
      this.y -= this.speed;
      if (this.y < 0) {
        this.reset(sketch);
      }
      this.xoff = this.xoff + 0.0025;
      this.x = sketch.noise(this.xoff) * sketch.width;
    }
  }, {
    key: "reset",
    value: function reset(sketch) {
      this.y = sketch.height + this.size * 10;
      this.x = sketch.random() * sketch.width;
      this.speed = sketch.random() * 3;
    }
  }]);
}();
},{}],"src/background/waterbackground.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _bubble = _interopRequireDefault(require("./bubble"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var WaterBackground = exports.default = /*#__PURE__*/function () {
  function WaterBackground(sketch) {
    _classCallCheck(this, WaterBackground);
    var amountOfBubbles = Math.random() * 20;
    this.bubbles = [];
    // for (let i = 0; i < amountOfBubbles; i += 1) {
    //   this.bubbles.push(new Bubble(sketch, sketch.random() * 40));
    // }
  }
  return _createClass(WaterBackground, [{
    key: "draw",
    value: function draw(sketch) {
      this.bubbles.forEach(function (b) {
        return b.draw(sketch);
      });
    }
  }]);
}();
},{"./bubble":"src/background/bubble.js"}],"node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;
function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }
  return bundleURL;
}
function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);
    if (matches) {
      return getBaseURL(matches[0]);
    }
  }
  return '/';
}
function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)?\/[^/]+(?:\?.*)?$/, '$1') + '/';
}
exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');
function updateLink(link) {
  var newLink = link.cloneNode();
  newLink.onload = function () {
    link.remove();
  };
  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
  if (cssTimeout) {
    return;
  }
  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');
    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }
    cssTimeout = null;
  }, 50);
}
module.exports = reloadCSS;
},{"./bundle-url":"node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"src/styles/styles.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');
module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"node_modules/parcel-bundler/src/builtins/css-loader.js"}],"src/global.settings.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var GlobalSettings = {
  invertColors: false,
  drawBlack: false,
  aboutUrl: '/highscore/',
  enemySpeed: 2,
  enemySize: 50,
  debug: false,
  soundOn: false,
  postUrl: '/api/score/',
  player_base_speed: 3,
  fish_images: [],
  gameOver: false
};
window.GlobalSettings = GlobalSettings;
var _default = exports.default = GlobalSettings;
},{}],"src/components/button.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Button = exports.default = /*#__PURE__*/function () {
  function Button(x, y, w, h) {
    _classCallCheck(this, Button);
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.tS = h - 10;
  }
  return _createClass(Button, [{
    key: "setText",
    value: function setText(text) {
      this.text = text;
      // const tW = sketch.textWidth(this.text);
      this.tX = this.x + this.w / 2;
      this.tY = this.y + this.h / 2;
    }
  }, {
    key: "draw",
    value: function draw(sketch) {
      if (!this.text) {
        throw new Error('MenuButton.draw() was called but no text was specified. Did you forget to call .setText() ?');
      }
      sketch.push();
      sketch.rect(this.x, this.y, this.w, this.h);
      sketch.textSize(this.tS);
      sketch.textAlign(sketch.CENTER, sketch.CENTER);
      sketch.text(this.text, this.tX, this.tY);
      sketch.pop();
    }
  }, {
    key: "setClickHandler",
    value: function setClickHandler(cb) {
      this.cb = cb;
    }
  }, {
    key: "click",
    value: function click() {
      if (!this.cb) {
        throw new Error('MenuButton.click() was called but no callback was specified. Did you forget to call .setClickHandler() ?');
      }
      this.cb();
    }
  }]);
}();
},{}],"src/util/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wasButtonClicked = void 0;
// eslint-disable-next-line import/prefer-default-export
var wasButtonClicked = exports.wasButtonClicked = function wasButtonClicked(sketch, button, mX, mY) {
  return sketch.collidePointRect(mX, mY, button.x, button.y, button.w, button.h);
};
},{}],"src/components/textfield.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var TextField = exports.default = /*#__PURE__*/function () {
  function TextField(x, y, w, h) {
    _classCallCheck(this, TextField);
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.tS = h - 10;
    this.text = '';
    this.carret = '|';
    this.counter = 0;
    this.treshold = 75;
  }
  return _createClass(TextField, [{
    key: "draw",
    value: function draw(sketch) {
      sketch.push();
      sketch.rect(this.x, this.y, this.w, this.h);
      sketch.textSize(this.tS);
      sketch.fill('black');
      sketch.textAlign(sketch.CENTER, sketch.CENTER);
      var tX = this.x + this.w / 2;
      var tY = this.y + this.h / 2;
      if (this.counter > this.treshold / 2) {
        sketch.text(this.text + this.carret, tX, tY);
        if (this.counter > this.treshold) this.counter = 0;
      } else {
        sketch.text(this.text, tX, tY);
      }
      this.counter += 1;
      sketch.pop();
    }
  }, {
    key: "keyPressed",
    value: function keyPressed(btn) {
      // sketch.BACKSPACE = 8
      if (btn === 8) {
        this.text = this.text.substring(0, this.text.length - 1);
      }
    }
  }, {
    key: "keyTyped",
    value: function keyTyped(character, sketch) {
      this.text += character;
      sketch.push();
      sketch.textSize(this.tS);
      var tW = sketch.textWidth(this.text);
      if (tW > this.w) {
        this.text = this.text.substring(0, this.text.length - 1);
      }
      sketch.pop();
    }
  }]);
}();
},{}],"src/components/player.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _global = _interopRequireDefault(require("../global.settings"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Player = exports.default = /*#__PURE__*/function () {
  function Player(sketch, usrn) {
    _classCallCheck(this, Player);
    this.name = usrn;
    this.size = 20;
    this.cX = sketch.width / 2 + 30 * (sketch.random() * -2 + 1);
    this.cY = sketch.height / 2 + 30 * (sketch.random() * -2 + 1);
    this.angle = sketch.PI / 2;
    this.img = _global.default.playerImg;
    this.movingRight = true;
    this.speed = _global.default.player_base_speed;
    this.score = 0;
    this.effectText = [];
    this.pointsMultiplier = 1;
  }
  return _createClass(Player, [{
    key: "w",
    value: function w() {
      // Keeping in mind the aspect ratio of the player image
      return this.size * 2;
    }
  }, {
    key: "h",
    value: function h() {
      return this.size * 2;
    }
  }, {
    key: "center",
    get: function get() {
      return {
        x: this.cX - this.w() / 2,
        y: this.cY - this.h() / 2
      };
    }
  }, {
    key: "move",
    value: function move(sketch) {
      if (sketch.keyIsDown(sketch.LEFT_ARROW)) {
        this.movingRight = false;
        this.cX -= this.speed;
      }
      if (sketch.keyIsDown(sketch.RIGHT_ARROW)) {
        this.movingRight = true;
        this.cX += this.speed;
      }
      if (sketch.keyIsDown(sketch.UP_ARROW)) {
        this.cY -= this.speed;
      }
      if (sketch.keyIsDown(sketch.DOWN_ARROW)) {
        this.cY += this.speed;
      }
      if (this.cY > sketch.height) {
        this.cY = 0;
      } else if (this.cY < 0) {
        this.cY = sketch.height;
      }
      if (this.cX > sketch.width) {
        this.cX = 0;
      } else if (this.cX < 0) {
        this.cX = sketch.width;
      }
    }
  }, {
    key: "moveToMouse",
    value: function moveToMouse(sketch) {
      var mouseX = sketch.mouseX;
      var mouseY = sketch.mouseY;
      var angleToMouse = sketch.atan2(mouseY - this.cY, mouseX - this.cX);
      if (mouseX - this.cX > 0) this.movingRight = true;else this.movingRight = false;
      // Calculate the distance to move in x and y directions
      var dx = sketch.cos(angleToMouse) * this.speed;
      var dy = sketch.sin(angleToMouse) * this.speed;

      // Update player's position
      this.cX += dx;
      this.cY += dy;
    }
  }, {
    key: "draw",
    value: function draw(sketch) {
      if (sketch.mouseIsPressed) {
        this.moveToMouse(sketch);
      }
      this.move(sketch);
      sketch.push();
      var x = this.cX - this.w() / 2;
      var y = this.cY - this.h() / 2;
      sketch.imageMode(sketch.CENTER);
      sketch.rectMode(sketch.CORNER);
      if (this.movingRight) {
        sketch.scale(-1.0, 1.0);
        sketch.image(this.img, -1 * x, y, this.w(), this.h());
      } else {
        sketch.image(this.img, x, y, this.w(), this.h());
      }
      sketch.pop();
      if (_global.default.debug) sketch.rect(x - this.w() / 2, y - this.h() / 2, this.w(), this.h());
      sketch.push();
      sketch.textSize(32);
      var t = "".concat(this.name, "\nScore: ").concat(this.score, "\n");
      if (this.effectText.length !== 0) {
        t += 'Effects:\n';
      }
      t += this.effectText.join('\n');
      sketch.text(t, 10, 30);
      sketch.pop();
      // if (!(this.effectText.length === 0)) {
      //   this.resetStats();
      // }
    }
  }, {
    key: "canEat",
    value: function canEat(sketch, fish) {
      var x = this.cX - this.w() / 2;
      var y = this.cY - this.h() / 2;
      // if (fish.type === 'dog') return false;
      return sketch.collideRectCircle(x - this.w() / 2, y - this.h() / 2, this.w(), this.h(), fish.x, fish.y, fish.size, fish.size);
    }
  }, {
    key: "eat",
    value: function eat(sketch, fish) {
      if (fish.type === 'dog') return;
      this.size += 1;
      if (sketch.random() > 0.5) {
        // soundManager.playSound("grom");
      }
      fish.reset(sketch, this);
      this.addScore();
    }
  }, {
    key: "addPower",
    value: function addPower(powerup) {
      var power = powerup.getEffect(this.score);
      power.effect(this, 10);
    }
  }, {
    key: "hasEffect",
    value: function hasEffect(name) {
      return this.effectText.includes(name);
    }
  }, {
    key: "removeEffect",
    value: function removeEffect(name) {
      for (var i = this.effectText.length - 1; i >= 0; i -= 1) {
        if (this.effectText[i] === name) {
          this.effectText.splice(i, 1);
        }
      }
    }
  }, {
    key: "addScore",
    value: function addScore() {
      this.score += this.pointsMultiplier;
    }
  }, {
    key: "resetStats",
    value: function resetStats() {
      this.speed = _global.default.player_base_speed;
      this.pointsMultiplier = 1;
    }
  }, {
    key: "setSpeed",
    value: function setSpeed(speed) {
      this.speed = speed;
    }
  }]);
}();
},{"../global.settings":"src/global.settings.js"}],"src/states/username.state.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _textfield = _interopRequireDefault(require("../components/textfield"));
var _button = _interopRequireDefault(require("../components/button"));
var _game = _interopRequireDefault(require("./game.state"));
var _player = _interopRequireDefault(require("../components/player"));
var _util = require("../util");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var UsernameState = exports.default = /*#__PURE__*/function () {
  function UsernameState(sketch, state) {
    var _this = this;
    _classCallCheck(this, UsernameState);
    this.state = state;
    this.elements = [];
    var w = sketch.width / 2;
    var h = 50;
    var x = sketch.width / 2 - w / 2;
    var y = sketch.height / 2;
    this.editText = new _textfield.default(x, y, w, h);
    this.elements.push(this.editText);
    y += 75;
    this.playBtn = new _button.default(x, y, w, h);
    this.playBtn.setText('Play Game');
    this.playBtn.setClickHandler(function () {
      localStorage.setItem('username', _this.editText.text);
      _this.state.setState(new _game.default(sketch, _this.state, new _player.default(sketch, _this.editText.text)));
    });
    this.elements.push(this.playBtn);
    console.log(this);
  }
  return _createClass(UsernameState, [{
    key: "draw",
    value: function draw(sketch) {
      sketch.push();
      sketch.textSize(32);
      sketch.textAlign(sketch.CENTER, sketch.CENTER);
      var x = sketch.width / 2;
      var y = sketch.height / 2 - 50;
      sketch.text('Please enter your username', x, y);
      sketch.pop();
      for (var i = 0; i < this.elements.length; i += 1) {
        this.elements[i].draw(sketch);
      }
    }

    // eslint-disable-next-line class-methods-use-this
  }, {
    key: "destroy",
    value: function destroy() {
      // if (soundManager.isPlaying("intro")) soundManager.stopSound("intro");
    }

    // eslint-disable-next-line class-methods-use-this
  }, {
    key: "initSound",
    value: function initSound() {}
  }, {
    key: "keyPressed",
    value: function keyPressed(btn) {
      this.editText.keyPressed(btn);
    }
  }, {
    key: "keyTyped",
    value: function keyTyped(character, sketch) {
      this.editText.keyTyped(character, sketch);
    }
  }, {
    key: "mouseClicked",
    value: function mouseClicked(sketch, mX, mY) {
      if ((0, _util.wasButtonClicked)(sketch, this.playBtn, mX, mY)) {
        this.playBtn.click();
      }
    }
  }]);
}();
},{"../components/textfield":"src/components/textfield.js","../components/button":"src/components/button.js","./game.state":"src/states/game.state.js","../components/player":"src/components/player.js","../util":"src/util/index.js"}],"src/components/fish.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _global = _interopRequireDefault(require("../global.settings"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Fish = exports.default = /*#__PURE__*/function () {
  function Fish(sketch, imgIndex) {
    _classCallCheck(this, Fish);
    this.type = 'rat';
    this.size = 20;
    var left = Math.random() < 0.5;
    if (left) {
      this.x = Math.random() * 300;
    } else {
      this.x = sketch.width - Math.random() * 300;
    }
    this.y = Math.random() * sketch.height;
    this.currentIndex = imgIndex;
    this.img = _global.default.fish_images[this.currentIndex];
    this.direction = [Math.random() * 2 - 1, Math.random() * 2 - 1];
    this.jpMargin = 12;
  }
  return _createClass(Fish, [{
    key: "draw",
    value: function draw(sketch) {
      this.update(sketch);
      sketch.push();
      sketch.imageMode(sketch.CENTER);
      if (_global.default.debug) sketch.ellipse(this.x, this.y, this.size, this.size);
      sketch.image(this.img, this.x, this.y, this.size + this.jpMargin, this.size + this.jpMargin);
      sketch.pop();
    }
  }, {
    key: "update",
    value: function update(sketch) {
      this.x = this.x + 1 * this.direction[0];
      this.y = this.y + 1 * this.direction[1];
      if (this.x > sketch.width + this.size / 2) {
        this.x = 0;
      }
      if (this.x < 0 - this.size / 2) {
        this.x = sketch.width;
      }
      if (this.y > sketch.height + this.size / 2) {
        this.y = 0;
      }
      if (this.y < 0 - this.size / 2) {
        this.y = sketch.height;
      }
    }
  }, {
    key: "reset",
    value: function reset(sketch, player) {
      this.size = 20;
      // eslint-disable-next-line no-mixed-operators
      this.x = player.cX + (sketch.width / 2 * sketch.random() + 50);
      // eslint-disable-next-line no-mixed-operators
      this.y = player.cY + (sketch.height / 2 * sketch.random() + 50);
      this.direction = [sketch.random() * 2 - 1, sketch.random() * 2 - 1];
    }

    // nextImg() {
    //   this.currentIndex += 1;
    //   if (this.currentIndex >= GlobalSettings.fish_images.length) {
    //     this.currentIndex = 0;
    //   }
    //   this.img = GlobalSettings.fish_images[this.currentIndex];
    // }
  }]);
}();
},{"../global.settings":"src/global.settings.js"}],"src/util/announcement.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Announcement = exports.default = /*#__PURE__*/function () {
  function Announcement(text, manager) {
    _classCallCheck(this, Announcement);
    this.text = text;
    this.manager = manager;
    this.maxSize = 72;
    this.textSize = 24;
  }
  return _createClass(Announcement, [{
    key: "draw",
    value: function draw(sketch) {
      this.update();
      sketch.push();
      sketch.fill('white');
      sketch.stroke(this.textSize);
      sketch.textAlign(sketch.CENTER, sketch.CENTER);
      sketch.textSize(this.textSize);
      sketch.text(this.text, 0, 0, sketch.width, sketch.height);
      sketch.pop();
    }
  }, {
    key: "update",
    value: function update() {
      this.textSize += 0.5;
      if (this.textSize >= this.maxSize) {
        this.destroy();
      }
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.manager.removeAnnouncement(this);
    }
  }]);
}();
},{}],"src/managers/announcement.manager.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _announcement = _interopRequireDefault(require("../util/announcement"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var AnnouncementManager = /*#__PURE__*/function () {
  function AnnouncementManager() {
    _classCallCheck(this, AnnouncementManager);
    this.announcements = [];
  }
  return _createClass(AnnouncementManager, [{
    key: "draw",
    value: function draw(sketch) {
      if (this.announcements.length > 0) {
        this.announcements[0].draw(sketch);
      }
    }
  }, {
    key: "addAnnouncement",
    value: function addAnnouncement(text) {
      this.announcements.push(new _announcement.default(text, this));
    }
  }, {
    key: "removeAnnouncement",
    value: function removeAnnouncement(announcement) {
      var i = this.announcements.indexOf(announcement);
      this.announcements.splice(i, 1);
    }
  }]);
}();
var _default = exports.default = new AnnouncementManager();
},{"../util/announcement":"src/util/announcement.js"}],"src/managers/sound.manager.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _global = _interopRequireDefault(require("../global.settings"));
var _effects = require("../util/effects");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var SoundManager = /*#__PURE__*/function () {
  function SoundManager() {
    _classCallCheck(this, SoundManager);
    this.sounds = {};
  }
  return _createClass(SoundManager, [{
    key: "playSound",
    value: function playSound(name) {
      this.sounds[name].play();
    }
  }, {
    key: "loopSound",
    value: function loopSound(name) {
      if (!this.isPlaying(name)) this.sounds[name].loop();
    }
  }, {
    key: "stopSound",
    value: function stopSound(name) {
      this.sounds[name].stopAll();
    }
  }, {
    key: "addSound",
    value: function addSound(name, sound) {
      sound.playMode('sustain');
      this.sounds[name] = sound;
    }
  }, {
    key: "isPlaying",
    value: function isPlaying(name) {
      return this.sounds[name].isPlaying() || this.sounds[name].isLooping();
    }
  }, {
    key: "reverse",
    value: function reverse() {
      if (this.isPlaying('reverse')) {
        this.stopAll();
        this.loopSound('main');
      } else if (!_global.default.gameOver) {
        this.stopAll();
        this.loopSound('reverse');
      }
    }
  }, {
    key: "gameOver",
    value: function gameOver() {
      var _this = this;
      this.stopAll();
      setTimeout(function () {
        _this.loopSound('main');
        _this.playSound('schurk');
      }, 100);
    }
  }, {
    key: "stopAll",
    value: function stopAll() {
      var _this2 = this;
      (0, _effects.clearTimeOuts)();
      Object.keys(this.sounds).forEach(function (name) {
        if (_this2.isPlaying(name)) {
          _this2.stopSound(name);
        }
      });
    }
  }, {
    key: "doublePoints",
    value: function doublePoints() {
      if (this.isPlaying('double')) {
        this.stopAll();
        this.loopSound('main');
      } else {
        this.stopAll();
        this.loopSound('double');
      }
    }
  }, {
    key: "toggleSlow",
    value: function toggleSlow() {
      if (this.isPlaying('slow')) {
        this.stopAll();
        this.loopSound('main');
      } else {
        this.stopAll();
        this.loopSound('slow');
      }
    }
  }, {
    key: "toggleFast",
    value: function toggleFast() {
      if (this.isPlaying('fast')) {
        this.stopAll();
        this.loopSound('main');
      } else {
        this.stopAll();
        this.loopSound('fast');
      }
    }
  }]);
}();
var _default = exports.default = new SoundManager();
},{"../global.settings":"src/global.settings.js","../util/effects":"src/util/effects.js"}],"src/util/effects.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.effects = exports.clearTimeOuts = void 0;
var _announcement = _interopRequireDefault(require("../managers/announcement.manager"));
var _sound = _interopRequireDefault(require("../managers/sound.manager"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var timeouts = [];
var clearTimeOuts = exports.clearTimeOuts = function clearTimeOuts() {
  timeouts.forEach(function (to) {
    clearTimeout(to);
  });
  timeouts = [];
};
var effects = exports.effects = [{
  name: 'reverse',
  effect: function effect(player, sec) {
    if (!player.hasEffect(this.name)) {
      player.setSpeed(player.speed * -1);
      var n = this.name;
      _sound.default.reverse(player);
      _announcement.default.addAnnouncement('Reverse!');
      player.effectText.push(n);
      timeouts.push(setTimeout(function () {
        player.setSpeed(player.speed * -1);
        _sound.default.reverse(player);
        player.removeEffect(n);
      }, sec * 1000));
    }
  }
}, {
  name: 'speedup',
  effect: function effect(player, sec) {
    if (!player.hasEffect(this.name)) {
      player.setSpeed(player.speed * 2);
      var n = this.name;
      _announcement.default.addAnnouncement('Speedup!');
      _sound.default.toggleFast();
      player.effectText.push(n);
      timeouts.push(setTimeout(function () {
        player.setSpeed(player.speed / 2);
        _sound.default.toggleFast();
        player.removeEffect(n);
      }, sec * 1000));
    }
  }
}, {
  name: 'slowdown',
  effect: function effect(player, sec) {
    if (!player.hasEffect(this.name)) {
      player.setSpeed(player.speed / 2);
      var n = this.name;
      _sound.default.toggleSlow();
      _announcement.default.addAnnouncement('Slowdown!');
      player.effectText.push(n);
      timeouts.push(setTimeout(function () {
        player.setSpeed(player.speed * 2);
        player.removeEffect(n);
        _sound.default.toggleSlow();
      }, sec * 1000));
    }
  }
}, {
  name: 'double points',
  effect: function effect(player, sec) {
    if (!player.hasEffect(this.name)) {
      player.pointsMultiplier = 2;
      var n = this.name;
      _sound.default.doublePoints();
      _announcement.default.addAnnouncement('Double points!');
      player.effectText.push(n);
      timeouts.push(setTimeout(function () {
        player.pointsMultiplier = 1;
        player.removeEffect(n);
        _sound.default.doublePoints();
      }, sec * 1000));
    }
  }
}];
},{"../managers/announcement.manager":"src/managers/announcement.manager.js","../managers/sound.manager":"src/managers/sound.manager.js"}],"src/components/powerup.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _global = _interopRequireDefault(require("../global.settings"));
var _effects = require("../util/effects");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Powerup = exports.default = /*#__PURE__*/function () {
  function Powerup(sketch, player) {
    _classCallCheck(this, Powerup);
    this.size = 25;
    this.img = _global.default.powerup;
    var calcPos = function calcPos(base) {
      return base / 2 * sketch.random() + 50;
    };
    this.x = player.cX + calcPos(sketch.width);
    this.y = player.cY + calcPos(sketch.height);
    this.direction = [sketch.random() * 2 - 1, sketch.random() * 2 - 1];
  }
  return _createClass(Powerup, [{
    key: "draw",
    value: function draw(sketch) {
      this.update(sketch);
      sketch.push();
      sketch.fill('red');
      // ellipse(this.x, this.y, this.size, this.size);
      sketch.imageMode(sketch.CENTER);
      sketch.image(this.img, this.x, this.y, this.size * 2.23, this.size);
      if (_global.default.debug) sketch.ellipse(this.x, this.y, this.size * 2.3, this.size);
      sketch.pop();
    }
  }, {
    key: "update",
    value: function update(sketch) {
      this.x = this.x + 1 * this.direction[0];
      this.y = this.y + 1 * this.direction[1];
      if (this.x > sketch.width + this.size / 2) {
        this.x = 0;
      }
      if (this.y > sketch.height + this.size / 2) {
        this.y = 0;
      }
      if (this.x < 0 - this.size / 2) {
        this.x = sketch.width;
      }
      if (this.y < 0 - this.size / 2) {
        this.y = sketch.height;
      }
    }

    // eslint-disable-next-line no-unused-vars,class-methods-use-this
  }, {
    key: "getEffect",
    value: function getEffect(score) {
      return _effects.effects[Math.floor(Math.random() * _effects.effects.length)];
    }
  }]);
}();
},{"../global.settings":"src/global.settings.js","../util/effects":"src/util/effects.js"}],"src/components/enemy.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _global = _interopRequireDefault(require("../global.settings"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Enemy = exports.default = /*#__PURE__*/function () {
  function Enemy(sketch) {
    _classCallCheck(this, Enemy);
    var top = sketch.random() < 0.5;
    if (top) {
      this.y = sketch.random() * 200;
    } else {
      this.y = sketch.height - sketch.random() * 200;
    }
    this.x = sketch.random() * sketch.width;
    this.size = _global.default.enemySize;
    this.direction = [sketch.random() * 2 - 1, sketch.random() * 2 - 1];
    this.speed = _global.default.enemySpeed;
  }
  return _createClass(Enemy, [{
    key: "update",
    value: function update(sketch) {
      this.x = this.x + _global.default.enemySpeed * this.direction[0];
      this.y = this.y + _global.default.enemySpeed * this.direction[1];
      if (this.x > sketch.width + this.size / 2) {
        this.x = 0;
      }
      if (this.x < 0 - this.size / 2) {
        this.x = sketch.width;
      }
      if (this.y > sketch.height + this.size / 2) {
        this.y = 0;
      }
      if (this.y < 0 - this.size / 2) {
        this.y = sketch.height;
      }
    }
  }, {
    key: "draw",
    value: function draw(sketch) {
      this.update();
      sketch.push();
      sketch.fill('yellow');
      sketch.stroke('red');
      sketch.strokeWeight(10);
      sketch.ellipse(this.x, this.y, this.size, this.size);
      sketch.noStroke();
      sketch.fill('blue');
      sketch.ellipse(this.x, this.y, this.size - 25, this.size - 25);
      if (_global.default.debug) sketch.ellipse(this.x, this.y, this.size, this.size);
      sketch.pop();
    }
  }]);
}();
},{"../global.settings":"src/global.settings.js"}],"src/components/projectile.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Projectile = exports.default = /*#__PURE__*/function () {
  function Projectile(fromX, fromY, toX, toY) {
    _classCallCheck(this, Projectile);
    this.target = {
      x: toX,
      y: toY
    };
    this.source = {
      x: fromX,
      y: fromY
    };
    this.x = this.source.x;
    this.y = this.source.y;
    this.speed = 4;
    this.size = 15;
  }
  return _createClass(Projectile, [{
    key: "update",
    value: function update() {
      var vector = {
        x: this.target.x - this.x,
        y: this.target.y - this.y
      };
      var distance = Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2));
      this.x += vector.x * this.speed / distance;
      this.y += vector.y * this.speed / distance;
    }
  }, {
    key: "draw",
    value: function draw(sketch) {
      this.update();
      sketch.push();
      sketch.fill('yellow');
      sketch.ellipse(this.x, this.y, this.size, this.size);
      sketch.pop();
    }
  }, {
    key: "hasReachedDestination",
    value: function hasReachedDestination() {
      var reachedX = Math.abs(this.x - this.target.x) < 10;
      var reachedY = Math.abs(this.y - this.target.y) < 10;
      return reachedX && reachedY;
    }
  }]);
}();
},{}],"src/components/boss.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _projectile = _interopRequireDefault(require("./projectile"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Boss = exports.default = /*#__PURE__*/function () {
  function Boss(sketch) {
    _classCallCheck(this, Boss);
    this.projectTilesRemaining = 20;
    this.currentProjectiles = [];
    this.x = sketch.random() * sketch.width;
    this.y = sketch.random() * sketch.height;
    this.counter = 0;
  }
  return _createClass(Boss, [{
    key: "update",
    value: function update(player) {
      this.counter += 1;
      if (this.counter % 50 === 0) {
        this.shoot(player);
      }
    }
  }, {
    key: "draw",
    value: function draw(sketch, player) {
      var _this = this;
      this.update(player);
      sketch.push();
      sketch.fill('yellow');
      sketch.ellipse(this.x, this.y, 25, 25);
      sketch.pop();
      this.currentProjectiles.forEach(function (proj) {
        if (proj.hasReachedDestination()) {
          _this.currentProjectiles.shift();
        } else {
          proj.draw(sketch);
        }
      });
    }
  }, {
    key: "shoot",
    value: function shoot(player) {
      if (!this.outOfProjectiles()) {
        this.currentProjectiles.push(new _projectile.default(this.x, this.y, player.center.x, player.center.y));
      }
      this.projectTilesRemaining -= 1;
    }
  }, {
    key: "outOfProjectiles",
    value: function outOfProjectiles() {
      return this.projectTilesRemaining <= 0;
    }
  }]);
}();
},{"./projectile":"src/components/projectile.js"}],"src/components/dog.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _global = _interopRequireDefault(require("../global.settings"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Dog = exports.default = /*#__PURE__*/function () {
  function Dog(sketch) {
    _classCallCheck(this, Dog);
    this.type = 'dog';
    this.size = 50;
    var left = Math.random() < 0.5;
    if (left) {
      this.x = Math.random() * 300;
    } else {
      this.x = sketch.width - Math.random() * 300;
    }
    this.y = Math.random() * sketch.height;
    // this.currentIndex = imgIndex;
    this.img = _global.default.dogImg;
    this.direction = [Math.random() * 2 - 1, Math.random() * 2 - 1];
    this.jpMargin = 12;
  }
  return _createClass(Dog, [{
    key: "draw",
    value: function draw(sketch) {
      this.update(sketch);
      sketch.push();
      sketch.imageMode(sketch.CENTER);
      if (_global.default.debug) sketch.ellipse(this.x, this.y, this.size, this.size);
      sketch.image(this.img, this.x, this.y, this.size + this.jpMargin, this.size + this.jpMargin);
      sketch.pop();
    }
  }, {
    key: "update",
    value: function update(sketch) {
      this.x = this.x + 1 * this.direction[0];
      this.y = this.y + 1 * this.direction[1];
      if (this.x > sketch.width + this.size / 2) {
        this.x = 0;
      }
      if (this.x < 0 - this.size / 2) {
        this.x = sketch.width;
      }
      if (this.y > sketch.height + this.size / 2) {
        this.y = 0;
      }
      if (this.y < 0 - this.size / 2) {
        this.y = sketch.height;
      }
    }
  }, {
    key: "reset",
    value: function reset(sketch, player) {
      this.size = 50;
      // eslint-disable-next-line no-mixed-operators
      this.x = player.cX + (sketch.width / 2 * sketch.random() + 50);
      // eslint-disable-next-line no-mixed-operators
      this.y = player.cY + (sketch.height / 2 * sketch.random() + 50);
      this.direction = [sketch.random() * 2 - 1, sketch.random() * 2 - 1];
    }

    // nextImg() {
    //   this.currentIndex += 1;
    //   if (this.currentIndex >= GlobalSettings.fish_images.length) {
    //     this.currentIndex = 0;
    //   }
    //   this.img = GlobalSettings.fish_images[this.currentIndex];
    // }
  }]);
}();
},{"../global.settings":"src/global.settings.js"}],"src/states/game.state.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _username = _interopRequireDefault(require("./username.state"));
var _global = _interopRequireDefault(require("../global.settings"));
var _fish = _interopRequireDefault(require("../components/fish"));
var _button = _interopRequireDefault(require("../components/button"));
var _menu = _interopRequireDefault(require("./menu.state"));
var _player = _interopRequireDefault(require("../components/player"));
var _powerup = _interopRequireDefault(require("../components/powerup"));
var _util = require("../util");
var _sound = _interopRequireDefault(require("../managers/sound.manager"));
var _enemy = _interopRequireDefault(require("../components/enemy"));
var _boss = _interopRequireDefault(require("../components/boss"));
var _dog = _interopRequireDefault(require("../components/dog"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var GameState = exports.default = /*#__PURE__*/function () {
  function GameState(sketch, state, player) {
    var _this = this;
    _classCallCheck(this, GameState);
    if (!player) {
      state.setState(new _username.default(sketch, state));
    }
    this.fishes = [];
    this.doges = [];
    this.powerups = [];
    this.enemies = [];
    _global.default.gameOver = false;
    this.MAX_POWERUP_CHANCE = 0.2;
    this.buttons = [];
    this.state = state;
    for (var i = 0; i < 30; i += 1) {
      this.fishes.push(new _fish.default(sketch, 0));
    }
    for (var _i = 0; _i < 15; _i += 1) {
      this.fishes.push(new _dog.default(sketch));
    }
    for (var _i2 = 0; _i2 < sketch.random() * 8 + 3; _i2 += 1) {
      this.enemies.push(new _enemy.default(sketch));
    }
    this.player = player;
    sketch.textSize(40);
    var t = 'Main menu';
    var tW = sketch.textWidth(t);
    var bW = tW + 45;
    this.restartBtn = new _button.default(sketch.width / 2 - bW / 2, sketch.height / 2, bW, 50);
    this.restartBtn.setText(t);
    this.restartBtn.setClickHandler(function () {
      _this.state.setState(new _menu.default(sketch, _this.state));
    });
    this.buttons.push(this.restartBtn);
    t = 'Play again';
    tW = sketch.textWidth(t);
    this.playAgainBtn = new _button.default(sketch.width / 2 - bW / 2, sketch.height / 2 + 75, bW, 50);
    this.playAgainBtn.setText(t);
    this.playAgainBtn.setClickHandler(function () {
      _this.state.setState(new GameState(sketch, _this.state, new _player.default(sketch, _this.player.name)));
    });
    this.buttons.push(this.playAgainBtn);
    this.bosses = [];
  }
  return _createClass(GameState, [{
    key: "draw",
    value: function draw(sketch) {
      var _this2 = this;
      if (!_global.default.gameOver) {
        for (var i = 0; i < this.fishes.length; i += 1) {
          var fish = this.fishes[i];
          fish.draw(sketch);
          if (this.player.canEat(sketch, fish)) {
            if (fish.type === 'dog') this.gameOver();
            if (this.player.size >= fish.size) {
              this.player.eat(sketch, fish);
              if (this.player.score % 15 === 0) {
                this.swapFishImages();
              }
              this.handleBossSpawns(sketch);
              this.handleSpawns(sketch);
            } else {
              this.gameOver();
            }
          }
        }
        for (var _i3 = 0; _i3 < this.enemies; _i3 += 1) {
          var enemy = this.enemies[_i3];
          enemy.draw(sketch);
          if (this.player.canEat(sketch, enemy)) {
            this.gameOver();
          }
        }
        for (var _i4 = 0; _i4 < this.powerups.length; _i4 += 1) {
          this.powerups[_i4].draw(sketch);
          if (this.player.canEat(sketch, this.powerups[_i4])) {
            this.player.addPower(this.powerups[_i4]);
            this.powerups.splice(_i4, 1);
          }
        }
        this.handleBossDespawns();
        this.checkIfHitByBoss(sketch);
        this.bosses.forEach(function (boss) {
          boss.draw(sketch, _this2.player);
        });
        this.player.draw(sketch);
      } else {
        sketch.push();
        sketch.textSize(48);
        sketch.textAlign(sketch.CENTER, sketch.CENTER);
        var t = "Game Over!\nScore: ".concat(this.player.score);
        // eslint-disable-next-line no-unused-vars
        var tW = sketch.textWidth(t);
        sketch.text(t, sketch.width / 2, sketch.height / 2 - 75);
        this.restartBtn.draw(sketch);
        this.playAgainBtn.draw(sketch);
        sketch.pop();
      }
    }
  }, {
    key: "getChanceOfSpawningPowerup",
    value: function getChanceOfSpawningPowerup() {
      return Math.round(this.player.score / 10) * 0.1;
    }
  }, {
    key: "maySpawnPowerup",
    value: function maySpawnPowerup(sketch, chance) {
      var actualChance = chance;
      if (actualChance > this.MAX_POWERUP_CHANCE) {
        actualChance = this.MAX_POWERUP_CHANCE;
      }
      var r = Math.random();
      if (r < actualChance) {
        this.powerups.push(new _powerup.default(sketch, this.player));
      }
    }
  }, {
    key: "handleSpawns",
    value: function handleSpawns(sketch) {
      var chance = this.getChanceOfSpawningPowerup();
      if (chance >= 1) {
        this.maySpawnPowerup(sketch, this.MAX_POWERUP_CHANCE);
      }
      chance -= Math.floor(chance);
      this.maySpawnPowerup(sketch, chance);
    }
  }, {
    key: "mouseClicked",
    value: function mouseClicked(sketch, mX, mY) {
      for (var i = 0; i < this.buttons.length; i += 1) {
        if ((0, _util.wasButtonClicked)(sketch, this.buttons[i], mX, mY) && _global.default.gameOver) {
          this.buttons[i].click();
        }
      }
    }

    // eslint-disable-next-line class-methods-use-this
  }, {
    key: "gameOver",
    value: function gameOver() {
      _global.default.gameOver = true;
      // this.postScore();
      _sound.default.gameOver();
    }

    // eslint-disable-next-line class-methods-use-this
  }, {
    key: "initSound",
    value: function initSound() {
      _sound.default.loopSound('main');
    }

    // eslint-disable-next-line class-methods-use-this
  }, {
    key: "destroy",
    value: function destroy() {
      _sound.default.stopAll();
    }

    // eslint-disable-next-line class-methods-use-this
  }, {
    key: "postScore",
    value: function postScore() {
      /*  return new Promise((resolve, reject) => {
          const username = this.player.name;
          const { score } = this.player;
          const postData = { username, score };
          httpPost(
            globalSettings.postUrl,
            'json',
            postData,
            (data) => {
              console.log(data);
              // gameState.setState(new Menu(gameState));
            },
            (error) => {
              console.error(error);
            },
          );
        }).then(console.log); */
    }
  }, {
    key: "swapFishImages",
    value: function swapFishImages() {
      var _this3 = this;
      return new Promise(function () {
        var _loop = function _loop(i) {
          setTimeout(function () {
            _this3.fishes[i].nextImg();
          }, i * 20);
        };
        for (var i = 0; i < _this3.fishes.length; i += 1) {
          _loop(i);
        }
      });
    }
  }, {
    key: "checkIfHitByBoss",
    value: function checkIfHitByBoss(sketch) {
      var _this4 = this;
      this.bosses.forEach(function (boss) {
        boss.currentProjectiles.forEach(function (proj) {
          if (_this4.player.canEat(sketch, proj)) {
            _this4.gameOver();
          }
        });
      });
    }
  }, {
    key: "handleBossDespawns",
    value: function handleBossDespawns() {
      var _this5 = this;
      this.bosses.forEach(function (boss, i) {
        if (boss.outOfProjectiles()) {
          _this5.bosses.splice(i, 1);
        }
      });
    }
  }, {
    key: "handleBossSpawns",
    value: function handleBossSpawns(sketch) {
      if (this.player.score % 20 === 0) {
        for (var i = 0; i < 3; i += 1) {
          this.bosses.push(new _boss.default(sketch));
        }
      }
    }
  }]);
}();
},{"./username.state":"src/states/username.state.js","../global.settings":"src/global.settings.js","../components/fish":"src/components/fish.js","../components/button":"src/components/button.js","./menu.state":"src/states/menu.state.js","../components/player":"src/components/player.js","../components/powerup":"src/components/powerup.js","../util":"src/util/index.js","../managers/sound.manager":"src/managers/sound.manager.js","../components/enemy":"src/components/enemy.js","../components/boss":"src/components/boss.js","../components/dog":"src/components/dog.js"}],"src/states/menu.state.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _button = _interopRequireDefault(require("../components/button"));
var _global = _interopRequireDefault(require("../global.settings"));
var _util = require("../util");
var _game = _interopRequireDefault(require("./game.state"));
var _player = _interopRequireDefault(require("../components/player"));
var _username = _interopRequireDefault(require("./username.state"));
var _sound = _interopRequireDefault(require("../managers/sound.manager"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Menu = exports.default = /*#__PURE__*/function () {
  function Menu(sketch, gamestate) {
    var _this = this;
    _classCallCheck(this, Menu);
    this.gamestate = gamestate;
    this.buttons = [];

    // play button
    var w = sketch.width * 0.3;
    var h = 50;
    var x = sketch.width / 2 - w / 2;
    var y = sketch.height / 2 - h / 2;
    var playButton = new _button.default(x, y, w, h);
    playButton.setText('Play Game');
    playButton.setClickHandler(function () {
      var usrn = localStorage.getItem('username');
      if (usrn && usrn.length !== 0) {
        if (_sound.default.isPlaying('intro')) _sound.default.stopSound('intro');
        _this.gamestate.setState(new _game.default(sketch, _this.gamestate, new _player.default(sketch, usrn)));
      } else {
        _this.gamestate.setState(new _username.default(sketch, _this.gamestate));
      }
    });
    this.buttons.push(playButton);

    // highscores button
    // const aboutButton = new Button(x, y + 75, w, h);
    // aboutButton.setText('Highscores');
    // aboutButton.setClickHandler(() => {
    //   const win = window.open(GlobalSettings.aboutUrl, '_blank');
    //   win.focus();
    // });
    // this.buttons.push(aboutButton);

    // info button
    var infoBtn = new _button.default(x, y + 150, w, h);
    infoBtn.setText('Info');
    infoBtn.setClickHandler(function () {
      // gameState.setState(new Info(this.gameState));
    });
    this.buttons.push(infoBtn);
    this.title = 'NEKO';
  }
  return _createClass(Menu, [{
    key: "draw",
    value: function draw(sketch) {
      sketch.push();
      sketch.textSize(124);
      sketch.textAlign(sketch.CENTER, sketch.CENTER);
      sketch.textFont('Palatino');
      sketch.text(this.title, 0, 0, sketch.width, sketch.height / 2);
      sketch.pop();
      for (var i = 0; i < this.buttons.length; i += 1) {
        this.buttons[i].draw(sketch);
      }
    }
  }, {
    key: "mouseClicked",
    value: function mouseClicked(sketch, mX, mY) {
      for (var i = 0; i < this.buttons.length; i += 1) {
        if ((0, _util.wasButtonClicked)(sketch, this.buttons[i], mX, mY)) {
          this.buttons[i].click();
        }
      }
    }

    // eslint-disable-next-line class-methods-use-this
  }, {
    key: "initSound",
    value: function initSound() {
      _sound.default.loopSound('intro');
    }

    // eslint-disable-next-line class-methods-use-this
  }, {
    key: "destroy",
    value: function destroy() {}
  }]);
}();
},{"../components/button":"src/components/button.js","../global.settings":"src/global.settings.js","../util":"src/util/index.js","./game.state":"src/states/game.state.js","../components/player":"src/components/player.js","./username.state":"src/states/username.state.js","../managers/sound.manager":"src/managers/sound.manager.js"}],"src/states/state.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _global = _interopRequireDefault(require("../global.settings"));
var _menu = _interopRequireDefault(require("./menu.state"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var State = exports.default = /*#__PURE__*/function () {
  function State(sketch) {
    _classCallCheck(this, State);
    this.soundOnImg = _global.default.soundOnImg;
    this.soundOffImg = _global.default.soundOffImg;
    this.state = new _menu.default(sketch, this);
    this.state.initSound();
    var soundOn = localStorage.getItem('soundOn') === 'true' || localStorage.getItem('soundOn') === null;
    _global.default.soundOn = soundOn;
    if (!soundOn) {
      sketch.masterVolume(0.0);
    }
  }
  return _createClass(State, [{
    key: "draw",
    value: function draw(sketch) {
      this.state.draw(sketch);
      sketch.push();
      sketch.imageMode(sketch.CORNER);
      if (_global.default.soundOn) {
        sketch.image(this.soundOnImg, 5, sketch.height - 55, 50, 50);
      } else {
        sketch.image(this.soundOffImg, 5, sketch.height - 55, 50, 50);
      }
      sketch.pop();
    }
  }, {
    key: "setState",
    value: function setState(s) {
      var _this = this;
      this.state.destroy();
      this.state = s;
      setTimeout(function () {
        _this.state.initSound();
      }, 100);
    }
  }, {
    key: "mouseClicked",
    value: function mouseClicked(sketch, mX, mY) {
      if (mX > 5 && mX < 55 && mY > sketch.height - 55 && mY < sketch.height - 5) {
        _global.default.soundOn = !_global.default.soundOn;
        if (_global.default.soundOn) {
          sketch.masterVolume(1.0);
          localStorage.setItem('soundOn', true);
        } else {
          sketch.masterVolume(0.0);
          localStorage.setItem('soundOn', false);
        }
        return;
      }
      this.state.mouseClicked(sketch, mX, mY);
    }
  }, {
    key: "keyTyped",
    value: function keyTyped(character, sketch) {
      if (typeof this.state.keyTyped === 'function') {
        this.state.keyTyped(character, sketch);
      }
    }
  }, {
    key: "keyPressed",
    value: function keyPressed(btn, sketch) {
      if (typeof this.state.keyPressed === 'function') {
        this.state.keyPressed(btn, sketch);
      }
    }
  }]);
}();
},{"../global.settings":"src/global.settings.js","./menu.state":"src/states/menu.state.js"}],"src/index.js":[function(require,module,exports) {
"use strict";

require("../lib/p5.collide2d.min");
var _waterbackground = _interopRequireDefault(require("./background/waterbackground"));
require("./styles/styles.scss");
var _state = _interopRequireDefault(require("./states/state"));
var _global = _interopRequireDefault(require("./global.settings"));
var _announcement = _interopRequireDefault(require("./managers/announcement.manager"));
var _sound = _interopRequireDefault(require("./managers/sound.manager"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var s = function s(sketch) {
  var wbg;
  var gs;
  var resetCv = function resetCv() {
    sketch.clear();
    var c = sketch.color(255, 149, 79);
    sketch.background(c);
  };
  sketch.mouseClicked = function (ev) {
    gs.mouseClicked(sketch, ev.x, ev.y);
    return false;
  };
  sketch.keyTyped = function () {
    gs.keyTyped(sketch.key, sketch);
  };
  sketch.keyPressed = function () {
    gs.keyPressed(sketch.keyCode, sketch);
  };
  sketch.windowResized = function () {
    sketch.resizeCanvas(sketch.windowWidth, sketch.windowHeight);
  };
  sketch.preload = function () {
    _global.default.playerImg = sketch.loadImage('./assets/img/Neko_Cat.png');
    _global.default.dogImg = sketch.loadImage('./assets/img/dog.png');
    _global.default.soundOffImg = sketch.loadImage('./assets/img/sound_off.png');
    _global.default.soundOnImg = sketch.loadImage('./assets/img/sound_on.png');
    _global.default.powerup = sketch.loadImage('./assets/img/powerup.png');
    _global.default.fish_images.push(sketch.loadImage('./assets/img/mouse.png'));
    _global.default.fish_images.push(sketch.loadImage('./assets/img/mouse2.png'));
    _global.default.fish_images.push(sketch.loadImage('./assets/img/mouse3.png'));
    _global.default.fish_images.push(sketch.loadImage('./assets/img/mouse3.png'));
    _global.default.fish_images.push(sketch.loadImage('./assets/img/mouse3.png'));
    sketch.soundFormats('wav');
    _sound.default.addSound('intro', sketch.loadSound('./assets/sounds/Intro.mp3'));
    _sound.default.addSound('main', sketch.loadSound('./assets/sounds/Main.mp3'));
    _sound.default.addSound('fast', sketch.loadSound('./assets/sounds/main_fast.mp3'));
    _sound.default.addSound('slow', sketch.loadSound('./assets/sounds/main_slow.mp3'));
    _sound.default.addSound('grom', sketch.loadSound('./assets/sounds/grommel.mp3'));
    _sound.default.addSound('schurk', sketch.loadSound('./assets/sounds/schurk.mp3'));
    _sound.default.addSound('reverse', sketch.loadSound('./assets/sounds/Main_reverse.mp3'));
    _sound.default.addSound('double', sketch.loadSound('./assets/sounds/Double_points.mp3'));
  };
  sketch.setup = function () {
    sketch.createCanvas(sketch.windowWidth, sketch.windowHeight).parent('cv-container');
    wbg = new _waterbackground.default(sketch);
    gs = new _state.default(sketch);
  };
  sketch.draw = function () {
    resetCv();
    wbg.draw(sketch);
    gs.draw(sketch);
    _announcement.default.draw(sketch);
  };
};

// eslint-disable-next-line no-unused-vars,new-cap,no-undef
var app = new p5(s);
},{"../lib/p5.collide2d.min":"lib/p5.collide2d.min.js","./background/waterbackground":"src/background/waterbackground.js","./styles/styles.scss":"src/styles/styles.scss","./states/state":"src/states/state.js","./global.settings":"src/global.settings.js","./managers/announcement.manager":"src/managers/announcement.manager.js","./managers/sound.manager":"src/managers/sound.manager.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "63162" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.js"], null)
//# sourceMappingURL=/src.a2b27638.js.map