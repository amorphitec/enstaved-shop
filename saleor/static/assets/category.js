webpackJsonp([1],{

/***/ 0:
/*!**************************************!*\
  !*** ./saleor/static/js/category.js ***!
  \**************************************/
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _class, _temp;
	
	var _react = __webpack_require__(/*! react */ 10);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(/*! react-dom */ 93);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _reactRelay = __webpack_require__(/*! react-relay */ 44);
	
	var _reactRelay2 = _interopRequireDefault(_reactRelay);
	
	var _CategoryPage = __webpack_require__(/*! ./components/categoryPage/CategoryPage */ 213);
	
	var _CategoryPage2 = _interopRequireDefault(_CategoryPage);
	
	var _ProductFilters = __webpack_require__(/*! ./components/categoryPage/ProductFilters */ 148);
	
	var _ProductFilters2 = _interopRequireDefault(_ProductFilters);
	
	var _Loading = __webpack_require__(/*! ./components/Loading */ 210);
	
	var _Loading2 = _interopRequireDefault(_Loading);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var categoryPage = document.getElementById('category-page');
	var categoryData = JSON.parse(categoryPage.getAttribute('data-category'));
	
	var App = (_temp = _class = function (_React$Component) {
	  _inherits(App, _React$Component);
	
	  function App() {
	    _classCallCheck(this, App);
	
	    return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
	  }
	
	  _createClass(App, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(_CategoryPage2.default, this.props.root);
	    }
	  }]);
	
	  return App;
	}(_react2.default.Component), _class.propTypes = {
	  root: _react.PropTypes.object
	}, _temp);
	
	
	var RelayApp = _reactRelay2.default.createContainer(App, {
	  initialVariables: {
	    categoryId: categoryData.id
	  },
	  fragments: {
	    root: function root() {
	      return function (RQL_0, RQL_1) {
	        return {
	          children: [{
	            calls: [{
	              kind: 'Call',
	              metadata: {},
	              name: 'pk',
	              value: {
	                kind: 'CallVariable',
	                callVariableName: 'categoryId'
	              }
	            }],
	            children: [].concat.apply([], [{
	              fieldName: 'id',
	              kind: 'Field',
	              metadata: {
	                isGenerated: true,
	                isRequisite: true
	              },
	              type: 'ID'
	            }, _reactRelay2.default.QL.__frag(RQL_0)]),
	            fieldName: 'category',
	            kind: 'Field',
	            metadata: {
	              canHaveSubselections: true,
	              inferredRootCallName: 'node',
	              inferredPrimaryKey: 'id'
	            },
	            type: 'CategoryType'
	          }, {
	            calls: [{
	              kind: 'Call',
	              metadata: {},
	              name: 'categoryPk',
	              value: {
	                kind: 'CallVariable',
	                callVariableName: 'categoryId'
	              }
	            }],
	            children: [].concat.apply([], [{
	              fieldName: 'id',
	              kind: 'Field',
	              metadata: {
	                isGenerated: true,
	                isRequisite: true
	              },
	              type: 'ID'
	            }, _reactRelay2.default.QL.__frag(RQL_1)]),
	            fieldName: 'attributes',
	            kind: 'Field',
	            metadata: {
	              canHaveSubselections: true,
	              inferredRootCallName: 'node',
	              inferredPrimaryKey: 'id',
	              isPlural: true
	            },
	            type: 'ProductAttributeType'
	          }],
	          id: _reactRelay2.default.QL.__id(),
	          kind: 'Fragment',
	          metadata: {},
	          name: 'Category_RootRelayQL',
	          type: 'Query'
	        };
	      }(_CategoryPage2.default.getFragment('category'), _ProductFilters2.default.getFragment('attributes'));
	    }
	  }
	});
	
	var AppRoute = {
	  queries: {
	    root: function root() {
	      return function () {
	        return {
	          fieldName: 'root',
	          kind: 'Query',
	          metadata: {},
	          name: 'Category',
	          type: 'Query'
	        };
	      }();
	    }
	  },
	  params: {},
	  name: 'Root'
	};
	
	_reactDom2.default.render(_react2.default.createElement(_reactRelay2.default.RootContainer, {
	  Component: RelayApp,
	  route: AppRoute,
	  renderLoading: function renderLoading() {
	    return _react2.default.createElement(_Loading2.default, null);
	  }
	}), categoryPage);

/***/ }),

/***/ 59:
/*!****************************************!*\
  !*** ./~/react-inlinesvg/lib/index.js ***!
  \****************************************/
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 10);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _once = __webpack_require__(/*! once */ 370);
	
	var _once2 = _interopRequireDefault(_once);
	
	var _httpplease = __webpack_require__(/*! httpplease */ 362);
	
	var _httpplease2 = _interopRequireDefault(_httpplease);
	
	var _oldiexdomain = __webpack_require__(/*! httpplease/plugins/oldiexdomain */ 366);
	
	var _oldiexdomain2 = _interopRequireDefault(_oldiexdomain);
	
	var _shouldComponentUpdate = __webpack_require__(/*! ./shouldComponentUpdate */ 379);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var http = _httpplease2.default.use(_oldiexdomain2.default);
	
	var Status = {
	  PENDING: 'pending',
	  LOADING: 'loading',
	  LOADED: 'loaded',
	  FAILED: 'failed',
	  UNSUPPORTED: 'unsupported'
	};
	
	var getRequestsByUrl = {};
	var loadedIcons = {};
	
	var createGetOrUseCacheForUrl = function createGetOrUseCacheForUrl(url, callback) {
	  if (loadedIcons[url]) {
	    (function () {
	      var params = loadedIcons[url];
	
	      setTimeout(function () {
	        return callback(params[0], params[1]);
	      }, 0);
	    })();
	  }
	
	  if (!getRequestsByUrl[url]) {
	    getRequestsByUrl[url] = [];
	
	    http.get(url, function (err, res) {
	      getRequestsByUrl[url].forEach(function (cb) {
	        loadedIcons[url] = [err, res];
	        cb(err, res);
	      });
	    });
	  }
	
	  getRequestsByUrl[url].push(callback);
	};
	
	var supportsInlineSVG = (0, _once2.default)(function () {
	  if (!document) {
	    return false;
	  }
	
	  var div = document.createElement('div');
	  div.innerHTML = '<svg />';
	  return div.firstChild && div.firstChild.namespaceURI === 'http://www.w3.org/2000/svg';
	});
	
	var isSupportedEnvironment = (0, _once2.default)(function () {
	  return ((typeof window !== 'undefined' && window !== null ? window.XMLHttpRequest : false) || (typeof window !== 'undefined' && window !== null ? window.XDomainRequest : false)) && supportsInlineSVG();
	});
	
	var uniquifyIDs = function () {
	  var mkAttributePattern = function mkAttributePattern(attr) {
	    return '(?:(?:\\s|\\:)' + attr + ')';
	  };
	
	  var idPattern = new RegExp('(?:(' + mkAttributePattern('id') + ')="([^"]+)")|(?:(' + mkAttributePattern('href') + '|' + mkAttributePattern('role') + '|' + mkAttributePattern('arcrole') + ')="\\#([^"]+)")|(?:="url\\(\\#([^\\)]+)\\)")', 'g');
	
	  return function (svgText, svgID) {
	    var uniquifyID = function uniquifyID(id) {
	      return id + '___' + svgID;
	    };
	
	    return svgText.replace(idPattern, function (m, p1, p2, p3, p4, p5) {
	      //eslint-disable-line consistent-return
	      if (p2) {
	        return p1 + '="' + uniquifyID(p2) + '"';
	      } else if (p4) {
	        return p3 + '="#' + uniquifyID(p4) + '"';
	      } else if (p5) {
	        return '="url(#' + uniquifyID(p5) + ')"';
	      }
	    });
	  };
	}();
	
	var getHash = function getHash(str) {
	  var chr = void 0;
	  var hash = 0;
	  var i = void 0;
	  var j = void 0;
	  var ref = void 0;
	
	  if (!str) {
	    return hash;
	  }
	
	  for (i = j = 0, ref = str.length; ref >= 0 ? j < ref : j > ref; i = ref >= 0 ? ++j : --j) {
	    chr = str.charCodeAt(i);
	    hash = (hash << 5) - hash + chr;
	    hash &= hash;
	  }
	
	  return hash;
	};
	
	var InlineSVGError = function (_Error) {
	  _inherits(InlineSVGError, _Error);
	
	  function InlineSVGError(message) {
	    var _ret2;
	
	    _classCallCheck(this, InlineSVGError);
	
	    var _this = _possibleConstructorReturn(this, (InlineSVGError.__proto__ || Object.getPrototypeOf(InlineSVGError)).call(this));
	
	    _this.name = 'InlineSVGError';
	    _this.isSupportedBrowser = true;
	    _this.isConfigurationError = false;
	    _this.isUnsupportedBrowserError = false;
	    _this.message = message;
	
	    return _ret2 = _this, _possibleConstructorReturn(_this, _ret2);
	  }
	
	  return InlineSVGError;
	}(Error);
	
	var createError = function createError(message, attrs) {
	  var err = new InlineSVGError(message);
	
	  Object.keys(attrs).forEach(function (k) {
	    err[k] = attrs[k];
	  });
	
	  return err;
	};
	
	var unsupportedBrowserError = function unsupportedBrowserError(message) {
	  var newMessage = message;
	
	  if (newMessage === null) {
	    newMessage = 'Unsupported Browser';
	  }
	
	  return createError(newMessage, {
	    isSupportedBrowser: false,
	    isUnsupportedBrowserError: true
	  });
	};
	
	var configurationError = function configurationError(message) {
	  return createError(message, {
	    isConfigurationError: true
	  });
	};
	
	var InlineSVG = function (_React$Component) {
	  _inherits(InlineSVG, _React$Component);
	
	  function InlineSVG(props) {
	    _classCallCheck(this, InlineSVG);
	
	    var _this2 = _possibleConstructorReturn(this, (InlineSVG.__proto__ || Object.getPrototypeOf(InlineSVG)).call(this, props));
	
	    _this2.shouldComponentUpdate = _shouldComponentUpdate.shouldComponentUpdate;
	
	
	    _this2.state = {
	      status: Status.PENDING
	    };
	
	    _this2.handleLoad = _this2.handleLoad.bind(_this2);
	    _this2.isActive = false;
	    return _this2;
	  }
	
	  _createClass(InlineSVG, [{
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      this.isActive = true;
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      if (this.state.status === Status.PENDING) {
	        if (this.props.supportTest()) {
	          if (this.props.src) {
	            this.startLoad();
	          } else {
	            this.fail(configurationError('Missing source'));
	          }
	        } else {
	          this.fail(unsupportedBrowserError());
	        }
	      }
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this.isActive = false;
	    }
	  }, {
	    key: 'fail',
	    value: function fail(error) {
	      var _this3 = this;
	
	      var status = error.isUnsupportedBrowserError ? Status.UNSUPPORTED : Status.FAILED;
	
	      if (this.isActive) {
	        this.setState({ status: status }, function () {
	          if (typeof _this3.props.onError === 'function') {
	            _this3.props.onError(error);
	          }
	        });
	      }
	    }
	  }, {
	    key: 'handleLoad',
	    value: function handleLoad(err, res) {
	      var _this4 = this;
	
	      if (err) {
	        this.fail(err);
	        return;
	      }
	
	      if (this.isActive) {
	        this.setState({
	          loadedText: res.text,
	          status: Status.LOADED
	        }, function () {
	          return typeof _this4.props.onLoad === 'function' ? _this4.props.onLoad() : null;
	        });
	      }
	    }
	  }, {
	    key: 'startLoad',
	    value: function startLoad() {
	      if (this.isActive) {
	        this.setState({
	          status: Status.LOADING
	        }, this.load);
	      }
	    }
	  }, {
	    key: 'load',
	    value: function load() {
	      var match = this.props.src.match(/data:image\/svg[^,]*?(;base64)?,(.*)/);
	      if (match) {
	        return this.handleLoad(null, {
	          text: match[1] ? atob(match[2]) : decodeURIComponent(match[2])
	        });
	      }
	      if (this.props.cacheGetRequests) {
	        return createGetOrUseCacheForUrl(this.props.src, this.handleLoad);
	      }
	
	      return http.get(this.props.src, this.handleLoad);
	    }
	  }, {
	    key: 'getClassName',
	    value: function getClassName() {
	      var className = 'isvg ' + this.state.status;
	
	      if (this.props.className) {
	        className += ' ' + this.props.className;
	      }
	
	      return className;
	    }
	  }, {
	    key: 'processSVG',
	    value: function processSVG(svgText) {
	      if (this.props.uniquifyIDs) {
	        return uniquifyIDs(svgText, getHash(this.props.src));
	      }
	
	      return svgText;
	    }
	  }, {
	    key: 'renderContents',
	    value: function renderContents() {
	      switch (this.state.status) {
	        case Status.UNSUPPORTED:
	        case Status.FAILED:
	          return this.props.children;
	        default:
	          return this.props.preloader;
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return this.props.wrapper({
	        className: this.getClassName(),
	        dangerouslySetInnerHTML: this.state.loadedText ? {
	          __html: this.processSVG(this.state.loadedText)
	        } : undefined
	      }, this.renderContents());
	    }
	  }]);
	
	  return InlineSVG;
	}(_react2.default.Component);
	
	InlineSVG.propTypes = {
	  cacheGetRequests: _react2.default.PropTypes.bool,
	  children: _react2.default.PropTypes.node,
	  className: _react2.default.PropTypes.string,
	  onError: _react2.default.PropTypes.func,
	  onLoad: _react2.default.PropTypes.func,
	  preloader: _react2.default.PropTypes.func,
	  src: _react2.default.PropTypes.string.isRequired,
	  supportTest: _react2.default.PropTypes.func,
	  uniquifyIDs: _react2.default.PropTypes.bool,
	  wrapper: _react2.default.PropTypes.func
	};
	InlineSVG.defaultProps = {
	  wrapper: _react2.default.DOM.span,
	  supportTest: isSupportedEnvironment,
	  uniquifyIDs: true,
	  cacheGetRequests: false
	};
	exports.default = InlineSVG;
	module.exports = exports['default'];

/***/ }),

/***/ 92:
/*!*********************************!*\
  !*** ./~/query-string/index.js ***!
  \*********************************/
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var strictUriEncode = __webpack_require__(/*! strict-uri-encode */ 143);
	var objectAssign = __webpack_require__(/*! object-assign */ 128);
	
	function encoderForArrayFormat(opts) {
		switch (opts.arrayFormat) {
			case 'index':
				return function (key, value, index) {
					return value === null ? [
						encode(key, opts),
						'[',
						index,
						']'
					].join('') : [
						encode(key, opts),
						'[',
						encode(index, opts),
						']=',
						encode(value, opts)
					].join('');
				};
	
			case 'bracket':
				return function (key, value) {
					return value === null ? encode(key, opts) : [
						encode(key, opts),
						'[]=',
						encode(value, opts)
					].join('');
				};
	
			default:
				return function (key, value) {
					return value === null ? encode(key, opts) : [
						encode(key, opts),
						'=',
						encode(value, opts)
					].join('');
				};
		}
	}
	
	function parserForArrayFormat(opts) {
		var result;
	
		switch (opts.arrayFormat) {
			case 'index':
				return function (key, value, accumulator) {
					result = /\[(\d*)\]$/.exec(key);
	
					key = key.replace(/\[\d*\]$/, '');
	
					if (!result) {
						accumulator[key] = value;
						return;
					}
	
					if (accumulator[key] === undefined) {
						accumulator[key] = {};
					}
	
					accumulator[key][result[1]] = value;
				};
	
			case 'bracket':
				return function (key, value, accumulator) {
					result = /(\[\])$/.exec(key);
					key = key.replace(/\[\]$/, '');
	
					if (!result) {
						accumulator[key] = value;
						return;
					} else if (accumulator[key] === undefined) {
						accumulator[key] = [value];
						return;
					}
	
					accumulator[key] = [].concat(accumulator[key], value);
				};
	
			default:
				return function (key, value, accumulator) {
					if (accumulator[key] === undefined) {
						accumulator[key] = value;
						return;
					}
	
					accumulator[key] = [].concat(accumulator[key], value);
				};
		}
	}
	
	function encode(value, opts) {
		if (opts.encode) {
			return opts.strict ? strictUriEncode(value) : encodeURIComponent(value);
		}
	
		return value;
	}
	
	function keysSorter(input) {
		if (Array.isArray(input)) {
			return input.sort();
		} else if (typeof input === 'object') {
			return keysSorter(Object.keys(input)).sort(function (a, b) {
				return Number(a) - Number(b);
			}).map(function (key) {
				return input[key];
			});
		}
	
		return input;
	}
	
	exports.extract = function (str) {
		return str.split('?')[1] || '';
	};
	
	exports.parse = function (str, opts) {
		opts = objectAssign({arrayFormat: 'none'}, opts);
	
		var formatter = parserForArrayFormat(opts);
	
		// Create an object with no prototype
		// https://github.com/sindresorhus/query-string/issues/47
		var ret = Object.create(null);
	
		if (typeof str !== 'string') {
			return ret;
		}
	
		str = str.trim().replace(/^(\?|#|&)/, '');
	
		if (!str) {
			return ret;
		}
	
		str.split('&').forEach(function (param) {
			var parts = param.replace(/\+/g, ' ').split('=');
			// Firefox (pre 40) decodes `%3D` to `=`
			// https://github.com/sindresorhus/query-string/pull/37
			var key = parts.shift();
			var val = parts.length > 0 ? parts.join('=') : undefined;
	
			// missing `=` should be `null`:
			// http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
			val = val === undefined ? null : decodeURIComponent(val);
	
			formatter(decodeURIComponent(key), val, ret);
		});
	
		return Object.keys(ret).sort().reduce(function (result, key) {
			var val = ret[key];
			if (Boolean(val) && typeof val === 'object' && !Array.isArray(val)) {
				// Sort object keys, not values
				result[key] = keysSorter(val);
			} else {
				result[key] = val;
			}
	
			return result;
		}, Object.create(null));
	};
	
	exports.stringify = function (obj, opts) {
		var defaults = {
			encode: true,
			strict: true,
			arrayFormat: 'none'
		};
	
		opts = objectAssign(defaults, opts);
	
		var formatter = encoderForArrayFormat(opts);
	
		return obj ? Object.keys(obj).sort().map(function (key) {
			var val = obj[key];
	
			if (val === undefined) {
				return '';
			}
	
			if (val === null) {
				return encode(key, opts);
			}
	
			if (Array.isArray(val)) {
				var result = [];
	
				val.slice().forEach(function (val2) {
					if (val2 === undefined) {
						return;
					}
	
					result.push(formatter(key, val2, result.length));
				});
	
				return result.join('&');
			}
	
			return encode(key, opts) + '=' + encode(val, opts);
		}).filter(function (x) {
			return x.length > 0;
		}).join('&') : '';
	};


/***/ }),

/***/ 99:
/*!**********************************************!*\
  !*** ./saleor/static/js/components/utils.js ***!
  \**********************************************/
/***/ (function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var xsBreakpoint = exports.xsBreakpoint = 576;
	var smBreakpoint = exports.smBreakpoint = 768;
	var mdBreakpoint = exports.mdBreakpoint = 992;
	var lgBreakpoint = exports.lgBreakpoint = 1200;
	
	var isMobile = exports.isMobile = function isMobile() {
	  return window.innerWidth < smBreakpoint;
	};
	
	var isTablet = exports.isTablet = function isTablet() {
	  return window.innerWidth >= smBreakpoint && window.innerWidth <= mdBreakpoint;
	};

/***/ }),

/***/ 126:
/*!***************************************!*\
  !*** ./~/httpplease/~/xtend/index.js ***!
  \***************************************/
/***/ (function(module, exports) {

	module.exports = extend
	
	function extend() {
	    var target = {}
	
	    for (var i = 0; i < arguments.length; i++) {
	        var source = arguments[i]
	
	        for (var key in source) {
	            if (source.hasOwnProperty(key)) {
	                target[key] = source[key]
	            }
	        }
	    }
	
	    return target
	}


/***/ }),

/***/ 128:
/*!**********************************!*\
  !*** ./~/object-assign/index.js ***!
  \**********************************/
/***/ (function(module, exports) {

	/*
	object-assign
	(c) Sindre Sorhus
	@license MIT
	*/
	
	'use strict';
	/* eslint-disable no-unused-vars */
	var getOwnPropertySymbols = Object.getOwnPropertySymbols;
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;
	
	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}
	
		return Object(val);
	}
	
	function shouldUseNative() {
		try {
			if (!Object.assign) {
				return false;
			}
	
			// Detect buggy property enumeration order in older V8 versions.
	
			// https://bugs.chromium.org/p/v8/issues/detail?id=4118
			var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
			test1[5] = 'de';
			if (Object.getOwnPropertyNames(test1)[0] === '5') {
				return false;
			}
	
			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test2 = {};
			for (var i = 0; i < 10; i++) {
				test2['_' + String.fromCharCode(i)] = i;
			}
			var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
				return test2[n];
			});
			if (order2.join('') !== '0123456789') {
				return false;
			}
	
			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test3 = {};
			'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
				test3[letter] = letter;
			});
			if (Object.keys(Object.assign({}, test3)).join('') !==
					'abcdefghijklmnopqrst') {
				return false;
			}
	
			return true;
		} catch (err) {
			// We don't expect any of the above to throw, but better to be safe.
			return false;
		}
	}
	
	module.exports = shouldUseNative() ? Object.assign : function (target, source) {
		var from;
		var to = toObject(target);
		var symbols;
	
		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);
	
			for (var key in from) {
				if (hasOwnProperty.call(from, key)) {
					to[key] = from[key];
				}
			}
	
			if (getOwnPropertySymbols) {
				symbols = getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}
	
		return to;
	};


/***/ }),

/***/ 143:
/*!**************************************!*\
  !*** ./~/strict-uri-encode/index.js ***!
  \**************************************/
/***/ (function(module, exports) {

	'use strict';
	module.exports = function (str) {
		return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
			return '%' + c.charCodeAt(0).toString(16).toUpperCase();
		});
	};


/***/ }),

/***/ 147:
/*!******************************************************************!*\
  !*** ./saleor/static/js/components/categoryPage/FilterHeader.js ***!
  \******************************************************************/
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(/*! react */ 10);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactInlinesvg = __webpack_require__(/*! react-inlinesvg */ 59);
	
	var _reactInlinesvg2 = _interopRequireDefault(_reactInlinesvg);
	
	var _chevron_up = __webpack_require__(/*! ../../../images/chevron_up.svg */ 354);
	
	var _chevron_up2 = _interopRequireDefault(_chevron_up);
	
	var _chevron_down = __webpack_require__(/*! ../../../images/chevron_down.svg */ 353);
	
	var _chevron_down2 = _interopRequireDefault(_chevron_down);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var FilterHeader = function FilterHeader(_ref) {
	  var onClick = _ref.onClick,
	      title = _ref.title,
	      visibility = _ref.visibility;
	
	  var imageSrc = visibility ? _chevron_up2.default : _chevron_down2.default;
	  var key = visibility ? 'chevronUpIcon' : 'chevronDownIcon';
	  return _react2.default.createElement(
	    'h3',
	    { onClick: onClick },
	    title,
	    _react2.default.createElement(
	      'div',
	      { className: 'collapse-filters-icon' },
	      _react2.default.createElement(_reactInlinesvg2.default, { key: key, src: imageSrc })
	    )
	  );
	};
	
	FilterHeader.propTypes = {
	  onClick: _react.PropTypes.func.isRequired,
	  title: _react.PropTypes.string.isRequired,
	  visibility: _react.PropTypes.bool
	};
	
	exports.default = FilterHeader;

/***/ }),

/***/ 148:
/*!********************************************************************!*\
  !*** ./saleor/static/js/components/categoryPage/ProductFilters.js ***!
  \********************************************************************/
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _class, _temp;
	
	var _react = __webpack_require__(/*! react */ 10);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRelay = __webpack_require__(/*! react-relay */ 44);
	
	var _reactRelay2 = _interopRequireDefault(_reactRelay);
	
	var _AttributeInput = __webpack_require__(/*! ./AttributeInput */ 211);
	
	var _AttributeInput2 = _interopRequireDefault(_AttributeInput);
	
	var _FilterHeader = __webpack_require__(/*! ./FilterHeader */ 147);
	
	var _FilterHeader2 = _interopRequireDefault(_FilterHeader);
	
	var _utils = __webpack_require__(/*! ../utils */ 99);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var ProductFilters = (_temp = _class = function (_Component) {
	  _inherits(ProductFilters, _Component);
	
	  function ProductFilters(props) {
	    _classCallCheck(this, ProductFilters);
	
	    var _this = _possibleConstructorReturn(this, (ProductFilters.__proto__ || Object.getPrototypeOf(ProductFilters)).call(this, props));
	
	    _this.onClick = function (attributeSlug, valueSlug) {
	      _this.props.onFilterChanged(_this.getFilterKey(attributeSlug, valueSlug));
	    };
	
	    _this.changeVisibility = function (target) {
	      _this.setState({
	        visibility: Object.assign(_this.state.visibility, _defineProperty({}, target, !_this.state.visibility[target]))
	      });
	    };
	
	    _this.state = {
	      visibility: {}
	    };
	    return _this;
	  }
	
	  _createClass(ProductFilters, [{
	    key: 'getFilterKey',
	    value: function getFilterKey(attributeSlug, valueSlug) {
	      return attributeSlug + ':' + valueSlug;
	    }
	  }, {
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      var _this2 = this;
	
	      this.props.attributes.map(function (attribute) {
	        var attrValue = '' + attribute.slug;
	        _this2.setState({
	          visibility: Object.assign(_this2.state.visibility, _defineProperty({}, attrValue, !(0, _utils.isMobile)()))
	        });
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this3 = this;
	
	      var _props = this.props,
	          attributes = _props.attributes,
	          checkedAttributes = _props.checkedAttributes;
	      var visibility = this.state.visibility;
	
	      return _react2.default.createElement(
	        'div',
	        { className: 'product-filters__attributes' },
	        attributes && attributes.map(function (attribute) {
	          return _react2.default.createElement(
	            'div',
	            { key: attribute.id },
	            _react2.default.createElement(_FilterHeader2.default, {
	              onClick: function onClick() {
	                return _this3.changeVisibility(attribute.slug);
	              },
	              title: attribute.name,
	              visibility: visibility[attribute.slug]
	            }),
	            _react2.default.createElement(
	              'ul',
	              { id: attribute.slug },
	              attribute.values.map(function (value) {
	                var key = _this3.getFilterKey(attribute.slug, value.slug);
	                var isKeyChecked = checkedAttributes.indexOf(key) > -1;
	                if (visibility[attribute.slug] || isKeyChecked) {
	                  return _react2.default.createElement(
	                    'li',
	                    { key: value.id, className: 'item' },
	                    _react2.default.createElement(_AttributeInput2.default, {
	                      attribute: attribute,
	                      checked: isKeyChecked,
	                      onClick: _this3.onClick,
	                      value: value
	                    })
	                  );
	                }
	              })
	            )
	          );
	        })
	      );
	    }
	  }]);
	
	  return ProductFilters;
	}(_react.Component), _class.propTypes = {
	  attributes: _react.PropTypes.array,
	  checkedAttributes: _react.PropTypes.array,
	  onFilterChanged: _react.PropTypes.func.isRequired
	}, _temp);
	exports.default = _reactRelay2.default.createContainer(ProductFilters, {
	  fragments: {
	    attributes: function attributes() {
	      return function () {
	        return {
	          children: [{
	            fieldName: 'id',
	            kind: 'Field',
	            metadata: {
	              isRequisite: true
	            },
	            type: 'ID'
	          }, {
	            fieldName: 'pk',
	            kind: 'Field',
	            metadata: {},
	            type: 'ID'
	          }, {
	            fieldName: 'name',
	            kind: 'Field',
	            metadata: {},
	            type: 'String'
	          }, {
	            fieldName: 'slug',
	            kind: 'Field',
	            metadata: {},
	            type: 'String'
	          }, {
	            children: [{
	              fieldName: 'id',
	              kind: 'Field',
	              metadata: {
	                isRequisite: true
	              },
	              type: 'ID'
	            }, {
	              fieldName: 'name',
	              kind: 'Field',
	              metadata: {},
	              type: 'String'
	            }, {
	              fieldName: 'slug',
	              kind: 'Field',
	              metadata: {},
	              type: 'String'
	            }, {
	              fieldName: 'color',
	              kind: 'Field',
	              metadata: {},
	              type: 'String'
	            }],
	            fieldName: 'values',
	            kind: 'Field',
	            metadata: {
	              canHaveSubselections: true,
	              inferredRootCallName: 'node',
	              inferredPrimaryKey: 'id',
	              isPlural: true
	            },
	            type: 'ProductAttributeValue'
	          }],
	          id: _reactRelay2.default.QL.__id(),
	          kind: 'Fragment',
	          metadata: {
	            plural: true
	          },
	          name: 'ProductFilters_AttributesRelayQL',
	          type: 'ProductAttributeType'
	        };
	      }();
	    }
	  }
	});

/***/ }),

/***/ 184:
/*!*************************************!*\
  !*** ./~/httpplease/lib/request.js ***!
  \*************************************/
/***/ (function(module, exports) {

	'use strict';
	
	function Request(optsOrUrl) {
	  var opts = typeof optsOrUrl === 'string' ? {url: optsOrUrl} : optsOrUrl || {};
	  this.method = opts.method ? opts.method.toUpperCase() : 'GET';
	  this.url = opts.url;
	  this.headers = opts.headers || {};
	  this.body = opts.body;
	  this.timeout = opts.timeout || 0;
	  this.errorOn404 = opts.errorOn404 != null ? opts.errorOn404 : true;
	  this.onload = opts.onload;
	  this.onerror = opts.onerror;
	}
	
	Request.prototype.abort = function() {
	  if (this.aborted) return;
	  this.aborted = true;
	  this.xhr.abort();
	  return this;
	};
	
	Request.prototype.header = function(name, value) {
	  var k;
	  for (k in this.headers) {
	    if (this.headers.hasOwnProperty(k)) {
	      if (name.toLowerCase() === k.toLowerCase()) {
	        if (arguments.length === 1) {
	          return this.headers[k];
	        }
	
	        delete this.headers[k];
	        break;
	      }
	    }
	  }
	  if (value != null) {
	    this.headers[name] = value;
	    return value;
	  }
	};
	
	
	module.exports = Request;


/***/ }),

/***/ 185:
/*!**************************************!*\
  !*** ./~/httpplease/lib/response.js ***!
  \**************************************/
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var Request = __webpack_require__(/*! ./request */ 184);
	var extractResponseProps = __webpack_require__(/*! ./utils/extractResponseProps */ 186);
	
	function Response(props) {
	  this.request = props.request;
	  this.xhr = props.xhr;
	  this.headers = props.headers || {};
	  this.status = props.status || 0;
	  this.text = props.text;
	  this.body = props.body;
	  this.contentType = props.contentType;
	  this.isHttpError = props.status >= 400;
	}
	
	Response.prototype.header = Request.prototype.header;
	
	Response.fromRequest = function(req) {
	  return new Response(extractResponseProps(req));
	};
	
	
	module.exports = Response;


/***/ }),

/***/ 186:
/*!********************************************************!*\
  !*** ./~/httpplease/lib/utils/extractResponseProps.js ***!
  \********************************************************/
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var extend = __webpack_require__(/*! xtend */ 126);
	
	module.exports = function(req) {
	  var xhr = req.xhr;
	  var props = {request: req, xhr: xhr};
	
	  // Try to create the response from the request. If the request was aborted,
	  // accesssing properties of the XHR may throw an error, so we wrap in a
	  // try/catch.
	  try {
	    var lines, i, m, headers = {};
	    if (xhr.getAllResponseHeaders) {
	      lines = xhr.getAllResponseHeaders().split('\n');
	      for (i = 0; i < lines.length; i++) {
	        if ((m = lines[i].match(/\s*([^\s]+):\s+([^\s]+)/))) {
	          headers[m[1]] = m[2];
	        }
	      }
	    }
	
	    props = extend(props, {
	      status: xhr.status,
	      contentType: xhr.contentType || (xhr.getResponseHeader && xhr.getResponseHeader('Content-Type')),
	      headers: headers,
	      text: xhr.responseText,
	      body: xhr.response || xhr.responseText
	    });
	  } catch (err) {}
	
	  return props;
	};


/***/ }),

/***/ 187:
/*!****************************************!*\
  !*** ./~/httpplease/lib/utils/once.js ***!
  \****************************************/
/***/ (function(module, exports) {

	'use strict';
	
	// A "once" utility.
	module.exports = function(fn) {
	  var result, called = false;
	  return function() {
	    if (!called) {
	      called = true;
	      result = fn.apply(this, arguments);
	    }
	    return result;
	  };
	};


/***/ }),

/***/ 210:
/*!************************************************!*\
  !*** ./saleor/static/js/components/Loading.js ***!
  \************************************************/
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(/*! react */ 10);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactInlinesvg = __webpack_require__(/*! react-inlinesvg */ 59);
	
	var _reactInlinesvg2 = _interopRequireDefault(_reactInlinesvg);
	
	var _loader = __webpack_require__(/*! ../../images/loader.svg */ 355);
	
	var _loader2 = _interopRequireDefault(_loader);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Loading = function Loading() {
	  return _react2.default.createElement(
	    'div',
	    { className: 'row loader' },
	    _react2.default.createElement(
	      'div',
	      { className: 'col-12' },
	      _react2.default.createElement(_reactInlinesvg2.default, { src: _loader2.default })
	    )
	  );
	};
	
	exports.default = Loading;

/***/ }),

/***/ 211:
/*!********************************************************************!*\
  !*** ./saleor/static/js/components/categoryPage/AttributeInput.js ***!
  \********************************************************************/
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(/*! react */ 10);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var AttributeInput = function AttributeInput(_ref) {
	  var attribute = _ref.attribute,
	      checked = _ref.checked,
	      onClick = _ref.onClick,
	      value = _ref.value;
	
	  var handleChange = function handleChange(event) {
	    var _event$target = event.target,
	        name = _event$target.name,
	        value = _event$target.value;
	
	    onClick(name, value);
	  };
	
	  return _react2.default.createElement(
	    "label",
	    null,
	    _react2.default.createElement("input", {
	      checked: checked,
	      name: attribute.slug,
	      onChange: handleChange,
	      type: "checkbox",
	      value: value.slug
	    }),
	    value.name
	  );
	};
	
	AttributeInput.propTypes = {
	  checked: _react.PropTypes.bool,
	  attribute: _react.PropTypes.object.isRequired,
	  value: _react.PropTypes.object.isRequired,
	  onClick: _react.PropTypes.func.isRequired
	};
	
	exports.default = AttributeInput;

/***/ }),

/***/ 212:
/*!********************************************************************!*\
  !*** ./saleor/static/js/components/categoryPage/CategoryFilter.js ***!
  \********************************************************************/
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _class, _temp;
	
	var _react = __webpack_require__(/*! react */ 10);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactInlinesvg = __webpack_require__(/*! react-inlinesvg */ 59);
	
	var _reactInlinesvg2 = _interopRequireDefault(_reactInlinesvg);
	
	var _arrow_left = __webpack_require__(/*! ../../../images/arrow_left.svg */ 351);
	
	var _arrow_left2 = _interopRequireDefault(_arrow_left);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var CategoryFilter = (_temp = _class = function (_Component) {
	  _inherits(CategoryFilter, _Component);
	
	  function CategoryFilter() {
	    _classCallCheck(this, CategoryFilter);
	
	    return _possibleConstructorReturn(this, (CategoryFilter.__proto__ || Object.getPrototypeOf(CategoryFilter)).apply(this, arguments));
	  }
	
	  _createClass(CategoryFilter, [{
	    key: 'render',
	    value: function render() {
	      var category = this.props.category;
	
	      var parent = category.ancestors ? category.ancestors[category.ancestors.length - 1] : null;
	      return _react2.default.createElement(
	        'div',
	        { className: 'product-filters__categories' },
	        _react2.default.createElement(
	          'h2',
	          null,
	          _react2.default.createElement(
	            'strong',
	            null,
	            category.name
	          )
	        ),
	        parent && _react2.default.createElement(
	          'div',
	          { className: 'product-filters__categories__parents' },
	          _react2.default.createElement(_reactInlinesvg2.default, { src: _arrow_left2.default }),
	          _react2.default.createElement(
	            'a',
	            { href: parent.url },
	            pgettext('Category page filters', 'See all') + ' ' + parent.name
	          )
	        ),
	        _react2.default.createElement(
	          'ul',
	          { className: category.parent ? 'product-filters__categories__childs' : 'product-filters__categories__childs no-parent' },
	          category.children && category.children.map(function (child) {
	            return _react2.default.createElement(
	              'li',
	              { key: child.pk, className: 'item' },
	              _react2.default.createElement(
	                'a',
	                { href: child.url },
	                child.name
	              )
	            );
	          })
	        )
	      );
	    }
	  }]);
	
	  return CategoryFilter;
	}(_react.Component), _class.propTypes = {
	  category: _react.PropTypes.object.isRequired
	}, _temp);
	exports.default = CategoryFilter;

/***/ }),

/***/ 213:
/*!******************************************************************!*\
  !*** ./saleor/static/js/components/categoryPage/CategoryPage.js ***!
  \******************************************************************/
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _class, _temp;
	
	var _queryString = __webpack_require__(/*! query-string */ 92);
	
	var _queryString2 = _interopRequireDefault(_queryString);
	
	var _react = __webpack_require__(/*! react */ 10);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRelay = __webpack_require__(/*! react-relay */ 44);
	
	var _reactRelay2 = _interopRequireDefault(_reactRelay);
	
	var _CategoryFilter = __webpack_require__(/*! ./CategoryFilter */ 212);
	
	var _CategoryFilter2 = _interopRequireDefault(_CategoryFilter);
	
	var _PriceFilter = __webpack_require__(/*! ./PriceFilter */ 215);
	
	var _PriceFilter2 = _interopRequireDefault(_PriceFilter);
	
	var _ProductFilters = __webpack_require__(/*! ./ProductFilters */ 148);
	
	var _ProductFilters2 = _interopRequireDefault(_ProductFilters);
	
	var _ProductList = __webpack_require__(/*! ./ProductList */ 217);
	
	var _ProductList2 = _interopRequireDefault(_ProductList);
	
	var _SortBy = __webpack_require__(/*! ./SortBy */ 219);
	
	var _SortBy2 = _interopRequireDefault(_SortBy);
	
	var _utils = __webpack_require__(/*! ./utils */ 220);
	
	var _utils2 = __webpack_require__(/*! ../utils */ 99);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var PAGINATE_BY = 24;
	var SORT_BY_FIELDS = ['name', 'price'];
	
	var CategoryPage = (_temp = _class = function (_Component) {
	  _inherits(CategoryPage, _Component);
	
	  function CategoryPage(props) {
	    _classCallCheck(this, CategoryPage);
	
	    var _this = _possibleConstructorReturn(this, (CategoryPage.__proto__ || Object.getPrototypeOf(CategoryPage)).call(this, props));
	
	    _this.incrementProductsCount = function () {
	      _this.props.relay.setVariables({
	        count: _this.props.relay.variables.count + PAGINATE_BY
	      });
	    };
	
	    _this.setSorting = function (value) {
	      _this.props.relay.setVariables({
	        sortBy: value
	      });
	    };
	
	    _this.toggleMenu = function (target) {
	      _this.setState({
	        filtersMenu: !target
	      });
	    };
	
	    _this.clearFilters = function () {
	      _this.props.relay.setVariables({
	        attributesFilter: [],
	        minPrice: null,
	        maxPrice: null
	      });
	    };
	
	    _this.updateAttributesFilter = function (key) {
	      // Create a new attributesFilter array by cloning the current one to make
	      // Relay refetch products with new attributes. Passing the same array (even
	      // if it's modified) would not result in new query, but would return cached
	      // results.
	      var attributesFilter = _this.props.relay.variables.attributesFilter.slice(0);
	      var index = attributesFilter.indexOf(key);
	      if (index < 0) {
	        attributesFilter.push(key);
	      } else {
	        attributesFilter.splice(index, 1);
	      }
	      _this.props.relay.setVariables({ attributesFilter: attributesFilter });
	    };
	
	    _this.updatePriceFilter = function (minPrice, maxPrice) {
	      _this.props.relay.setVariables({
	        minPrice: parseInt(minPrice) || null,
	        maxPrice: parseInt(maxPrice) || null
	      });
	    };
	
	    _this.state = {
	      filtersMenu: !(0, _utils2.isMobile)()
	    };
	    return _this;
	  }
	
	  _createClass(CategoryPage, [{
	    key: 'persistStateInUrl',
	    value: function persistStateInUrl() {
	      var _props$relay$variable = this.props.relay.variables,
	          attributesFilter = _props$relay$variable.attributesFilter,
	          count = _props$relay$variable.count,
	          maxPrice = _props$relay$variable.maxPrice,
	          minPrice = _props$relay$variable.minPrice,
	          sortBy = _props$relay$variable.sortBy;
	
	      var urlParams = {};
	      if (minPrice) {
	        urlParams['minPrice'] = minPrice;
	      }
	      if (maxPrice) {
	        urlParams['maxPrice'] = maxPrice;
	      }
	      if (count > PAGINATE_BY) {
	        urlParams['count'] = count;
	      }
	      if (sortBy) {
	        urlParams['sortBy'] = sortBy;
	      }
	      attributesFilter.forEach(function (filter) {
	        var _filter$split = filter.split(':'),
	            _filter$split2 = _slicedToArray(_filter$split, 2),
	            attributeName = _filter$split2[0],
	            valueSlug = _filter$split2[1];
	
	        if (attributeName in urlParams) {
	          urlParams[attributeName].push(valueSlug);
	        } else {
	          urlParams[attributeName] = [valueSlug];
	        }
	      });
	      var url = Object.keys(urlParams).length ? '?' + _queryString2.default.stringify(urlParams) : location.href.split('?')[0];
	      history.pushState({}, null, url);
	    }
	  }, {
	    key: 'componentDidUpdate',
	    value: function componentDidUpdate() {
	      // Persist current state of relay variables as query string. Current
	      // variables are available in props after component rerenders, so it has to
	      // be called inside componentDidUpdate method.
	      this.persistStateInUrl();
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;
	
	      var _props = this.props,
	          attributes = _props.attributes,
	          category = _props.category,
	          variables = _props.relay.variables,
	          relay = _props.relay;
	      var pendingVariables = relay.pendingVariables;
	      var filtersMenu = this.state.filtersMenu;
	
	      return _react2.default.createElement(
	        'div',
	        { className: 'category-page' },
	        _react2.default.createElement(
	          'div',
	          { className: 'category-top' },
	          _react2.default.createElement(
	            'div',
	            { className: 'row' },
	            _react2.default.createElement(
	              'div',
	              { className: 'col-md-7' },
	              _react2.default.createElement(
	                'ul',
	                { className: 'breadcrumbs list-unstyled d-none d-md-block' },
	                _react2.default.createElement(
	                  'li',
	                  null,
	                  _react2.default.createElement(
	                    'a',
	                    { href: '/' },
	                    pgettext('Main navigation item', 'Home')
	                  )
	                ),
	                category.ancestors && category.ancestors.map(function (ancestor) {
	                  return _react2.default.createElement(
	                    'li',
	                    { key: ancestor.pk },
	                    _react2.default.createElement(
	                      'a',
	                      { href: ancestor.url },
	                      ancestor.name
	                    )
	                  );
	                }),
	                _react2.default.createElement(
	                  'li',
	                  null,
	                  _react2.default.createElement(
	                    'a',
	                    { href: category.url },
	                    category.name
	                  )
	                )
	              )
	            ),
	            _react2.default.createElement(
	              'div',
	              { className: 'col-md-5' },
	              _react2.default.createElement(
	                'div',
	                { className: 'row' },
	                _react2.default.createElement(
	                  'div',
	                  { className: 'col-6 col-md-2 col-lg-6 filters-menu' },
	                  _react2.default.createElement(
	                    'span',
	                    { className: 'filters-menu__label d-sm-none', onClick: function onClick() {
	                        return _this2.toggleMenu(filtersMenu);
	                      } },
	                    pgettext('Category page filters', 'Filters')
	                  ),
	                  (variables.attributesFilter.length || variables.minPrice || variables.maxPrice) && _react2.default.createElement('span', { className: 'filters-menu__icon d-sm-none' })
	                ),
	                _react2.default.createElement(
	                  'div',
	                  { className: 'col-6 col-md-10 col-lg-6' },
	                  _react2.default.createElement(_SortBy2.default, { sortedValue: variables.sortBy, setSorting: this.setSorting })
	                )
	              )
	            )
	          )
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'row' },
	          _react2.default.createElement(
	            'div',
	            { className: 'col-md-4 col-lg-3' },
	            _react2.default.createElement(
	              'div',
	              { className: 'product-filters' },
	              _react2.default.createElement(_CategoryFilter2.default, { category: category })
	            ),
	            filtersMenu && _react2.default.createElement(
	              'div',
	              null,
	              _react2.default.createElement(
	                'h2',
	                null,
	                pgettext('Category page filters', 'Filters'),
	                _react2.default.createElement(
	                  'span',
	                  { className: 'clear-filters float-right', onClick: this.clearFilters },
	                  pgettext('Category page filters', 'Clear filters')
	                )
	              ),
	              _react2.default.createElement(
	                'div',
	                { className: 'product-filters' },
	                _react2.default.createElement(_ProductFilters2.default, {
	                  attributes: attributes,
	                  checkedAttributes: variables.attributesFilter,
	                  onFilterChanged: this.updateAttributesFilter
	                }),
	                _react2.default.createElement(_PriceFilter2.default, {
	                  onFilterChanged: this.updatePriceFilter,
	                  maxPrice: variables.maxPrice,
	                  minPrice: variables.minPrice
	                })
	              )
	            )
	          ),
	          _react2.default.createElement(
	            'div',
	            { className: 'col-md-8 col-lg-9 category-list' },
	            _react2.default.createElement(
	              'div',
	              null,
	              _react2.default.createElement(_ProductList2.default, {
	                onLoadMore: this.incrementProductsCount,
	                products: category.products,
	                updating: pendingVariables
	              })
	            )
	          )
	        )
	      );
	    }
	  }]);
	
	  return CategoryPage;
	}(_react.Component), _class.propTypes = {
	  attributes: _react.PropTypes.array,
	  category: _react.PropTypes.object,
	  relay: _react.PropTypes.object
	}, _temp);
	exports.default = _reactRelay2.default.createContainer(CategoryPage, {
	  initialVariables: {
	    attributesFilter: (0, _utils.getAttributesFromQuery)(['count', 'minPrice', 'maxPrice', 'sortBy']),
	    count: parseInt((0, _utils.getFromQuery)('count', PAGINATE_BY)) || PAGINATE_BY,
	    minPrice: parseInt((0, _utils.getFromQuery)('minPrice')) || null,
	    maxPrice: parseInt((0, _utils.getFromQuery)('maxPrice')) || null,
	    sortBy: (0, _utils.ensureAllowedName)((0, _utils.getFromQuery)('sortBy', 'name'), SORT_BY_FIELDS)
	  },
	  fragments: {
	    category: function category() {
	      return function (RQL_0) {
	        return {
	          children: [{
	            fieldName: 'pk',
	            kind: 'Field',
	            metadata: {},
	            type: 'ID'
	          }, {
	            fieldName: 'name',
	            kind: 'Field',
	            metadata: {},
	            type: 'String'
	          }, {
	            fieldName: 'url',
	            kind: 'Field',
	            metadata: {},
	            type: 'String'
	          }, {
	            children: [{
	              fieldName: 'name',
	              kind: 'Field',
	              metadata: {},
	              type: 'String'
	            }, {
	              fieldName: 'pk',
	              kind: 'Field',
	              metadata: {},
	              type: 'ID'
	            }, {
	              fieldName: 'url',
	              kind: 'Field',
	              metadata: {},
	              type: 'String'
	            }, {
	              fieldName: 'id',
	              kind: 'Field',
	              metadata: {
	                isGenerated: true,
	                isRequisite: true
	              },
	              type: 'ID'
	            }],
	            fieldName: 'ancestors',
	            kind: 'Field',
	            metadata: {
	              canHaveSubselections: true,
	              inferredRootCallName: 'node',
	              inferredPrimaryKey: 'id',
	              isPlural: true
	            },
	            type: 'CategoryType'
	          }, {
	            children: [{
	              fieldName: 'name',
	              kind: 'Field',
	              metadata: {},
	              type: 'String'
	            }, {
	              fieldName: 'pk',
	              kind: 'Field',
	              metadata: {},
	              type: 'ID'
	            }, {
	              fieldName: 'url',
	              kind: 'Field',
	              metadata: {},
	              type: 'String'
	            }, {
	              fieldName: 'slug',
	              kind: 'Field',
	              metadata: {},
	              type: 'String'
	            }, {
	              fieldName: 'id',
	              kind: 'Field',
	              metadata: {
	                isGenerated: true,
	                isRequisite: true
	              },
	              type: 'ID'
	            }],
	            fieldName: 'children',
	            kind: 'Field',
	            metadata: {
	              canHaveSubselections: true,
	              inferredRootCallName: 'node',
	              inferredPrimaryKey: 'id',
	              isPlural: true
	            },
	            type: 'CategoryType'
	          }, {
	            calls: [{
	              kind: 'Call',
	              metadata: {},
	              name: 'first',
	              value: {
	                kind: 'CallVariable',
	                callVariableName: 'count'
	              }
	            }, {
	              kind: 'Call',
	              metadata: {
	                type: '[AttributesFilterScalar]'
	              },
	              name: 'attributes',
	              value: {
	                kind: 'CallVariable',
	                callVariableName: 'attributesFilter'
	              }
	            }, {
	              kind: 'Call',
	              metadata: {},
	              name: 'priceGte',
	              value: {
	                kind: 'CallVariable',
	                callVariableName: 'minPrice'
	              }
	            }, {
	              kind: 'Call',
	              metadata: {},
	              name: 'priceLte',
	              value: {
	                kind: 'CallVariable',
	                callVariableName: 'maxPrice'
	              }
	            }, {
	              kind: 'Call',
	              metadata: {},
	              name: 'orderBy',
	              value: {
	                kind: 'CallVariable',
	                callVariableName: 'sortBy'
	              }
	            }],
	            children: [].concat.apply([], [_reactRelay2.default.QL.__frag(RQL_0)]),
	            fieldName: 'products',
	            kind: 'Field',
	            metadata: {
	              canHaveSubselections: true,
	              isConnection: true
	            },
	            type: 'ProductTypeConnection'
	          }, {
	            fieldName: 'id',
	            kind: 'Field',
	            metadata: {
	              isGenerated: true,
	              isRequisite: true
	            },
	            type: 'ID'
	          }],
	          id: _reactRelay2.default.QL.__id(),
	          kind: 'Fragment',
	          metadata: {},
	          name: 'CategoryPage_CategoryRelayQL',
	          type: 'CategoryType'
	        };
	      }(_ProductList2.default.getFragment('products'));
	    }
	  }
	});

/***/ }),

/***/ 214:
/*!***************************************************************!*\
  !*** ./saleor/static/js/components/categoryPage/NoResults.js ***!
  \***************************************************************/
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(/*! react */ 10);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactInlinesvg = __webpack_require__(/*! react-inlinesvg */ 59);
	
	var _reactInlinesvg2 = _interopRequireDefault(_reactInlinesvg);
	
	var _pirate = __webpack_require__(/*! ../../../images/pirate.svg */ 358);
	
	var _pirate2 = _interopRequireDefault(_pirate);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var NoResults = function NoResults() {
	  return _react2.default.createElement(
	    'div',
	    { className: 'no-results' },
	    _react2.default.createElement(
	      'div',
	      { className: 'col-12' },
	      _react2.default.createElement(_reactInlinesvg2.default, { src: _pirate2.default }),
	      _react2.default.createElement(
	        'p',
	        null,
	        pgettext('Epty search results', 'Sorry, no matches found for your request.')
	      ),
	      _react2.default.createElement(
	        'p',
	        null,
	        pgettext('Epty search results', 'Try again or shop new arrivals.')
	      )
	    )
	  );
	};
	
	exports.default = NoResults;

/***/ }),

/***/ 215:
/*!*****************************************************************!*\
  !*** ./saleor/static/js/components/categoryPage/PriceFilter.js ***!
  \*****************************************************************/
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _class, _temp;
	
	var _react = __webpack_require__(/*! react */ 10);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _FilterHeader = __webpack_require__(/*! ./FilterHeader */ 147);
	
	var _FilterHeader2 = _interopRequireDefault(_FilterHeader);
	
	var _utils = __webpack_require__(/*! ../utils */ 99);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var PriceFilter = (_temp = _class = function (_Component) {
	  _inherits(PriceFilter, _Component);
	
	  function PriceFilter(props) {
	    _classCallCheck(this, PriceFilter);
	
	    var _this = _possibleConstructorReturn(this, (PriceFilter.__proto__ || Object.getPrototypeOf(PriceFilter)).call(this, props));
	
	    _this.checkKey = function (event) {
	      if (event.key === 'Enter') {
	        _this.updateFilter();
	      }
	    };
	
	    _this.updateFilter = function () {
	      var minPrice = _this.minPriceInput.value;
	      var maxPrice = _this.maxPriceInput.value;
	      _this.props.onFilterChanged(minPrice, maxPrice);
	    };
	
	    _this.changeVisibility = function () {
	      var _this$props = _this.props,
	          minPrice = _this$props.minPrice,
	          maxPrice = _this$props.maxPrice;
	
	      if (!(minPrice || maxPrice)) {
	        _this.setState({
	          visibility: !_this.state.visibility
	        });
	      }
	    };
	
	    _this.state = {
	      visibility: !(0, _utils.isMobile)()
	    };
	    return _this;
	  }
	
	  _createClass(PriceFilter, [{
	    key: 'render',
	    value: function render() {
	      var _this2 = this;
	
	      var _props = this.props,
	          maxPrice = _props.maxPrice,
	          minPrice = _props.minPrice;
	      var visibility = this.state.visibility;
	
	      return _react2.default.createElement(
	        'div',
	        { className: 'product-filters__price-range' },
	        _react2.default.createElement(_FilterHeader2.default, {
	          onClick: this.changeVisibility,
	          title: pgettext('Price filter on category page', 'Price range'),
	          visibility: visibility
	        }),
	        (visibility || minPrice || maxPrice) && _react2.default.createElement(
	          'div',
	          null,
	          _react2.default.createElement('input', {
	            className: 'form-control',
	            defaultValue: minPrice,
	            min: '0',
	            onKeyUp: this.checkKey,
	            placeholder: pgettext('Price filter on category page', 'from'),
	            ref: function ref(input) {
	              return _this2.minPriceInput = input;
	            },
	            type: 'number'
	          }),
	          _react2.default.createElement(
	            'span',
	            null,
	            '\u2014'
	          ),
	          _react2.default.createElement('input', {
	            className: 'form-control',
	            defaultValue: maxPrice,
	            min: '0',
	            onKeyUp: this.checkKey,
	            placeholder: pgettext('Price filter on category page', 'to'),
	            ref: function ref(input) {
	              return _this2.maxPriceInput = input;
	            },
	            type: 'number'
	          }),
	          _react2.default.createElement(
	            'button',
	            { className: 'btn primary', onClick: this.updateFilter },
	            pgettext('Price filter on category page', 'Update')
	          )
	        )
	      );
	    }
	  }]);
	
	  return PriceFilter;
	}(_react.Component), _class.propTypes = {
	  minPrice: _react.PropTypes.number,
	  maxPrice: _react.PropTypes.number,
	  onFilterChanged: _react.PropTypes.func.isRequired
	}, _temp);
	exports.default = PriceFilter;

/***/ }),

/***/ 216:
/*!*****************************************************************!*\
  !*** ./saleor/static/js/components/categoryPage/ProductItem.js ***!
  \*****************************************************************/
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _class, _temp2;
	
	var _react = __webpack_require__(/*! react */ 10);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRelay = __webpack_require__(/*! react-relay */ 44);
	
	var _reactRelay2 = _interopRequireDefault(_reactRelay);
	
	var _ProductPrice = __webpack_require__(/*! ./ProductPrice */ 218);
	
	var _ProductPrice2 = _interopRequireDefault(_ProductPrice);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var ProductItem = (_temp2 = _class = function (_Component) {
	  _inherits(ProductItem, _Component);
	
	  function ProductItem() {
	    var _ref;
	
	    var _temp, _this, _ret;
	
	    _classCallCheck(this, ProductItem);
	
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ProductItem.__proto__ || Object.getPrototypeOf(ProductItem)).call.apply(_ref, [this].concat(args))), _this), _this.getSchema = function () {
	      var product = _this.props.product;
	
	      var data = {
	        "@context": "http://schema.org/",
	        "@type": "Product",
	        "name": product.name,
	        "image": product.thumbnailUrl1x,
	        "offers": {
	          "@type": "Offer",
	          "priceCurrency": product.price.currency,
	          "price": product.price.net
	        }
	      };
	      return JSON.stringify(data);
	    }, _temp), _possibleConstructorReturn(_this, _ret);
	  }
	
	  _createClass(ProductItem, [{
	    key: 'render',
	    value: function render() {
	      var product = this.props.product;
	
	      var productSchema = this.getSchema();
	      var srcset = product.thumbnailUrl1x + ' 1x, ' + product.thumbnailUrl2x + ' 2x';
	      return _react2.default.createElement(
	        'div',
	        { className: 'col-6 col-md-4 product-list' },
	        _react2.default.createElement(
	          'script',
	          { type: 'application/ld+json' },
	          productSchema
	        ),
	        _react2.default.createElement(
	          'a',
	          { href: product.url, className: 'link--clean' },
	          _react2.default.createElement(
	            'div',
	            { className: 'text-center' },
	            _react2.default.createElement(
	              'div',
	              null,
	              _react2.default.createElement('img', { className: 'img-responsive', src: product.thumbnailUrl1x, srcSet: srcset, alt: '' }),
	              _react2.default.createElement(
	                'span',
	                { className: 'product-list-item-name', title: product.name },
	                product.name
	              )
	            ),
	            _react2.default.createElement(
	              'div',
	              { className: 'panel-footer' },
	              _react2.default.createElement(_ProductPrice2.default, { price: product.price, availability: product.availability })
	            )
	          )
	        )
	      );
	    }
	  }]);
	
	  return ProductItem;
	}(_react.Component), _class.propTypes = {
	  product: _react.PropTypes.object
	}, _temp2);
	exports.default = _reactRelay2.default.createContainer(ProductItem, {
	  fragments: {
	    product: function product() {
	      return function (RQL_0) {
	        return {
	          children: [{
	            fieldName: 'id',
	            kind: 'Field',
	            metadata: {
	              isRequisite: true
	            },
	            type: 'ID'
	          }, {
	            fieldName: 'name',
	            kind: 'Field',
	            metadata: {},
	            type: 'String'
	          }, {
	            children: [{
	              fieldName: 'currency',
	              kind: 'Field',
	              metadata: {},
	              type: 'String'
	            }, {
	              fieldName: 'gross',
	              kind: 'Field',
	              metadata: {},
	              type: 'Float'
	            }, {
	              fieldName: 'grossLocalized',
	              kind: 'Field',
	              metadata: {},
	              type: 'String'
	            }, {
	              fieldName: 'net',
	              kind: 'Field',
	              metadata: {},
	              type: 'Float'
	            }],
	            fieldName: 'price',
	            kind: 'Field',
	            metadata: {
	              canHaveSubselections: true
	            },
	            type: 'PriceType'
	          }, {
	            children: [].concat.apply([], [_reactRelay2.default.QL.__frag(RQL_0)]),
	            fieldName: 'availability',
	            kind: 'Field',
	            metadata: {
	              canHaveSubselections: true
	            },
	            type: 'ProductAvailabilityType'
	          }, {
	            alias: 'thumbnailUrl1x',
	            calls: [{
	              kind: 'Call',
	              metadata: {},
	              name: 'size',
	              value: {
	                kind: 'CallValue',
	                callValue: '255x255'
	              }
	            }],
	            fieldName: 'thumbnailUrl',
	            kind: 'Field',
	            metadata: {},
	            type: 'String'
	          }, {
	            alias: 'thumbnailUrl2x',
	            calls: [{
	              kind: 'Call',
	              metadata: {},
	              name: 'size',
	              value: {
	                kind: 'CallValue',
	                callValue: '510x510'
	              }
	            }],
	            fieldName: 'thumbnailUrl',
	            kind: 'Field',
	            metadata: {},
	            type: 'String'
	          }, {
	            fieldName: 'url',
	            kind: 'Field',
	            metadata: {},
	            type: 'String'
	          }],
	          id: _reactRelay2.default.QL.__id(),
	          kind: 'Fragment',
	          metadata: {},
	          name: 'ProductItem_ProductRelayQL',
	          type: 'ProductType'
	        };
	      }(_ProductPrice2.default.getFragment('availability'));
	    }
	  }
	});

/***/ }),

/***/ 217:
/*!*****************************************************************!*\
  !*** ./saleor/static/js/components/categoryPage/ProductList.js ***!
  \*****************************************************************/
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _class, _temp2;
	
	var _react = __webpack_require__(/*! react */ 10);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRelay = __webpack_require__(/*! react-relay */ 44);
	
	var _reactRelay2 = _interopRequireDefault(_reactRelay);
	
	var _ProductItem = __webpack_require__(/*! ./ProductItem */ 216);
	
	var _ProductItem2 = _interopRequireDefault(_ProductItem);
	
	var _NoResults = __webpack_require__(/*! ./NoResults */ 214);
	
	var _NoResults2 = _interopRequireDefault(_NoResults);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var ProductList = (_temp2 = _class = function (_Component) {
	  _inherits(ProductList, _Component);
	
	  function ProductList() {
	    var _ref;
	
	    var _temp, _this, _ret;
	
	    _classCallCheck(this, ProductList);
	
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ProductList.__proto__ || Object.getPrototypeOf(ProductList)).call.apply(_ref, [this].concat(args))), _this), _this.onLoadMore = function () {
	      return _this.props.onLoadMore();
	    }, _this.setSorting = function (event) {
	      return _this.props.setSorting(event);
	    }, _temp), _possibleConstructorReturn(_this, _ret);
	  }
	
	  _createClass(ProductList, [{
	    key: 'render',
	    value: function render() {
	      var _props$products = this.props.products,
	          edges = _props$products.edges,
	          hasNextPage = _props$products.pageInfo.hasNextPage;
	
	      return _react2.default.createElement(
	        'div',
	        { className: this.props.updating && 'category-list--loading' },
	        _react2.default.createElement(
	          'div',
	          { className: 'row' },
	          edges.length > 0 ? edges.map(function (edge, i) {
	            return _react2.default.createElement(_ProductItem2.default, { key: i, product: edge.node });
	          }) : _react2.default.createElement(_NoResults2.default, null)
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'load-more' },
	          hasNextPage && _react2.default.createElement(
	            'button',
	            { className: 'btn gray', onClick: this.onLoadMore },
	            pgettext('Load more products on category view', 'Load more')
	          )
	        )
	      );
	    }
	  }]);
	
	  return ProductList;
	}(_react.Component), _class.propTypes = {
	  onLoadMore: _react.PropTypes.func.isRequired,
	  products: _react.PropTypes.object,
	  setSorting: _react.PropTypes.object,
	  updating: _react.PropTypes.object
	}, _temp2);
	exports.default = _reactRelay2.default.createContainer(ProductList, {
	  fragments: {
	    products: function products() {
	      return function (RQL_0) {
	        return {
	          children: [{
	            children: [{
	              children: [].concat.apply([], [{
	                fieldName: 'id',
	                kind: 'Field',
	                metadata: {
	                  isGenerated: true,
	                  isRequisite: true
	                },
	                type: 'ID'
	              }, _reactRelay2.default.QL.__frag(RQL_0)]),
	              fieldName: 'node',
	              kind: 'Field',
	              metadata: {
	                canHaveSubselections: true,
	                inferredRootCallName: 'node',
	                inferredPrimaryKey: 'id',
	                isRequisite: true
	              },
	              type: 'ProductType'
	            }, {
	              fieldName: 'cursor',
	              kind: 'Field',
	              metadata: {
	                isGenerated: true,
	                isRequisite: true
	              },
	              type: 'String'
	            }],
	            fieldName: 'edges',
	            kind: 'Field',
	            metadata: {
	              canHaveSubselections: true,
	              isPlural: true
	            },
	            type: 'ProductTypeEdge'
	          }, {
	            children: [{
	              fieldName: 'hasNextPage',
	              kind: 'Field',
	              metadata: {
	                isRequisite: true
	              },
	              type: 'Boolean'
	            }, {
	              fieldName: 'hasPreviousPage',
	              kind: 'Field',
	              metadata: {
	                isGenerated: true,
	                isRequisite: true
	              },
	              type: 'Boolean'
	            }],
	            fieldName: 'pageInfo',
	            kind: 'Field',
	            metadata: {
	              canHaveSubselections: true,
	              isRequisite: true
	            },
	            type: 'PageInfo'
	          }],
	          id: _reactRelay2.default.QL.__id(),
	          kind: 'Fragment',
	          metadata: {},
	          name: 'ProductList_ProductsRelayQL',
	          type: 'ProductTypeConnection'
	        };
	      }(_ProductItem2.default.getFragment('product'));
	    }
	  }
	});

/***/ }),

/***/ 218:
/*!******************************************************************!*\
  !*** ./saleor/static/js/components/categoryPage/ProductPrice.js ***!
  \******************************************************************/
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(/*! react */ 10);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRelay = __webpack_require__(/*! react-relay */ 44);
	
	var _reactRelay2 = _interopRequireDefault(_reactRelay);
	
	var _reactInlinesvg = __webpack_require__(/*! react-inlinesvg */ 59);
	
	var _reactInlinesvg2 = _interopRequireDefault(_reactInlinesvg);
	
	var _sale_bg = __webpack_require__(/*! ../../../images/sale_bg.svg */ 359);
	
	var _sale_bg2 = _interopRequireDefault(_sale_bg);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var ProductPrice = function ProductPrice(_ref) {
	  var availability = _ref.availability,
	      price = _ref.price;
	  var discount = availability.discount,
	      priceRange = availability.priceRange;
	
	  var isPriceRange = priceRange && priceRange.minPrice.gross !== priceRange.maxPrice.gross;
	  return _react2.default.createElement(
	    'div',
	    null,
	    _react2.default.createElement(
	      'span',
	      { itemProp: 'price' },
	      isPriceRange && _react2.default.createElement(
	        'span',
	        null,
	        pgettext('product price range', 'from'),
	        ' '
	      ),
	      ' ',
	      priceRange.minPrice.grossLocalized
	    ),
	    discount && _react2.default.createElement(
	      'div',
	      { className: 'product-list__sale' },
	      _react2.default.createElement(_reactInlinesvg2.default, { src: _sale_bg2.default }),
	      _react2.default.createElement(
	        'span',
	        { className: 'product-list__sale__text' },
	        pgettext('Sale (discount) label for item in product list', 'Sale')
	      )
	    )
	  );
	};
	
	ProductPrice.propTypes = {
	  availability: _react.PropTypes.object.isRequired,
	  price: _react.PropTypes.object.isRequired
	};
	
	exports.default = _reactRelay2.default.createContainer(ProductPrice, {
	  fragments: {
	    availability: function availability() {
	      return function () {
	        return {
	          children: [{
	            fieldName: 'available',
	            kind: 'Field',
	            metadata: {},
	            type: 'Boolean'
	          }, {
	            children: [{
	              fieldName: 'gross',
	              kind: 'Field',
	              metadata: {},
	              type: 'Float'
	            }],
	            fieldName: 'discount',
	            kind: 'Field',
	            metadata: {
	              canHaveSubselections: true
	            },
	            type: 'PriceType'
	          }, {
	            children: [{
	              children: [{
	                fieldName: 'gross',
	                kind: 'Field',
	                metadata: {},
	                type: 'Float'
	              }, {
	                fieldName: 'grossLocalized',
	                kind: 'Field',
	                metadata: {},
	                type: 'String'
	              }, {
	                fieldName: 'currency',
	                kind: 'Field',
	                metadata: {},
	                type: 'String'
	              }],
	              fieldName: 'maxPrice',
	              kind: 'Field',
	              metadata: {
	                canHaveSubselections: true
	              },
	              type: 'PriceType'
	            }, {
	              children: [{
	                fieldName: 'gross',
	                kind: 'Field',
	                metadata: {},
	                type: 'Float'
	              }, {
	                fieldName: 'grossLocalized',
	                kind: 'Field',
	                metadata: {},
	                type: 'String'
	              }, {
	                fieldName: 'currency',
	                kind: 'Field',
	                metadata: {},
	                type: 'String'
	              }],
	              fieldName: 'minPrice',
	              kind: 'Field',
	              metadata: {
	                canHaveSubselections: true
	              },
	              type: 'PriceType'
	            }],
	            fieldName: 'priceRange',
	            kind: 'Field',
	            metadata: {
	              canHaveSubselections: true
	            },
	            type: 'PriceRangeType'
	          }],
	          id: _reactRelay2.default.QL.__id(),
	          kind: 'Fragment',
	          metadata: {},
	          name: 'ProductPrice_AvailabilityRelayQL',
	          type: 'ProductAvailabilityType'
	        };
	      }();
	    }
	  }
	});

/***/ }),

/***/ 219:
/*!************************************************************!*\
  !*** ./saleor/static/js/components/categoryPage/SortBy.js ***!
  \************************************************************/
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _class, _temp;
	
	var _react = __webpack_require__(/*! react */ 10);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactInlinesvg = __webpack_require__(/*! react-inlinesvg */ 59);
	
	var _reactInlinesvg2 = _interopRequireDefault(_reactInlinesvg);
	
	var _arrow_up = __webpack_require__(/*! ../../../images/arrow_up.svg */ 352);
	
	var _arrow_up2 = _interopRequireDefault(_arrow_up);
	
	var _arrow_down = __webpack_require__(/*! ../../../images/arrow_down.svg */ 350);
	
	var _arrow_down2 = _interopRequireDefault(_arrow_down);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var sortBy = (_temp = _class = function (_Component) {
	  _inherits(sortBy, _Component);
	
	  function sortBy(props) {
	    _classCallCheck(this, sortBy);
	
	    var _this = _possibleConstructorReturn(this, (sortBy.__proto__ || Object.getPrototypeOf(sortBy)).call(this, props));
	
	    _this.setSorting = function (event) {
	      var value = event.currentTarget.className;
	      _this.props.setSorting(value);
	      _this.changeVisibility();
	    };
	
	    _this.changeVisibility = function () {
	      _this.setState({
	        visibility: !_this.state.visibility
	      });
	    };
	
	    _this.state = {
	      visibility: false
	    };
	    return _this;
	  }
	
	  _createClass(sortBy, [{
	    key: 'render',
	    value: function render() {
	      var sortedValue = this.props.sortedValue;
	      var visibility = this.state.visibility;
	
	      return _react2.default.createElement(
	        'div',
	        { className: 'sort-by' },
	        _react2.default.createElement('div', { className: visibility ? 'click-area' : 'click-area hide', onClick: this.changeVisibility }),
	        _react2.default.createElement(
	          'button',
	          { className: 'btn btn-link', onClick: this.changeVisibility },
	          sortedValue ? sortedValue.search('-') ? _react2.default.createElement(
	            'div',
	            null,
	            _react2.default.createElement(
	              'span',
	              null,
	              pgettext('Category page filters', 'Sort by:'),
	              ' ',
	              _react2.default.createElement(
	                'strong',
	                null,
	                sortedValue
	              )
	            ),
	            _react2.default.createElement(
	              'div',
	              { className: 'sort-order-icon' },
	              _react2.default.createElement(_reactInlinesvg2.default, { key: 'arrowUpIcon', src: _arrow_up2.default })
	            )
	          ) : _react2.default.createElement(
	            'div',
	            null,
	            _react2.default.createElement(
	              'span',
	              null,
	              pgettext('Category page filters', 'Sort by:'),
	              ' ',
	              _react2.default.createElement(
	                'strong',
	                null,
	                sortedValue.replace('-', '')
	              )
	            ),
	            _react2.default.createElement(
	              'div',
	              { className: 'sort-order-icon' },
	              _react2.default.createElement(_reactInlinesvg2.default, { key: 'arrowDownIcon', src: _arrow_down2.default })
	            )
	          ) : _react2.default.createElement(
	            'span',
	            null,
	            pgettext('Category page filters', 'Sort by:'),
	            ' ',
	            _react2.default.createElement(
	              'strong',
	              null,
	              pgettext('Category page filters', 'default')
	            )
	          )
	        ),
	        visibility && _react2.default.createElement(
	          'ul',
	          { className: 'sort-list' },
	          _react2.default.createElement(
	            'li',
	            { className: 'name' },
	            _react2.default.createElement(
	              'div',
	              { className: 'row' },
	              _react2.default.createElement(
	                'div',
	                { className: 'col-6' },
	                pgettext('Category page filters', 'Sort by:'),
	                ' ',
	                _react2.default.createElement(
	                  'strong',
	                  null,
	                  gettext('Name')
	                )
	              ),
	              _react2.default.createElement(
	                'div',
	                { className: 'col-6' },
	                _react2.default.createElement(
	                  'div',
	                  { className: 'name', onClick: this.setSorting },
	                  _react2.default.createElement(
	                    'span',
	                    null,
	                    pgettext('Category page filters', 'ascending')
	                  ),
	                  _react2.default.createElement(
	                    'div',
	                    { className: 'float-right sort-order-icon' },
	                    _react2.default.createElement(_reactInlinesvg2.default, { src: _arrow_up2.default })
	                  )
	                )
	              )
	            ),
	            _react2.default.createElement(
	              'div',
	              { className: 'row' },
	              _react2.default.createElement('div', { className: 'col-6' }),
	              _react2.default.createElement(
	                'div',
	                { className: 'col-6' },
	                _react2.default.createElement(
	                  'div',
	                  { className: '-name', onClick: this.setSorting },
	                  _react2.default.createElement(
	                    'span',
	                    null,
	                    pgettext('Category page filters', 'descending')
	                  ),
	                  _react2.default.createElement(
	                    'div',
	                    { className: 'float-right sort-order-icon' },
	                    _react2.default.createElement(_reactInlinesvg2.default, { src: _arrow_down2.default })
	                  )
	                )
	              )
	            )
	          ),
	          _react2.default.createElement(
	            'li',
	            { className: 'price' },
	            _react2.default.createElement(
	              'div',
	              { className: 'row' },
	              _react2.default.createElement(
	                'div',
	                { className: 'col-6' },
	                pgettext('Category page filters', 'Sort by:'),
	                ' ',
	                _react2.default.createElement(
	                  'strong',
	                  null,
	                  pgettext('Category page filters', 'Price')
	                )
	              ),
	              _react2.default.createElement(
	                'div',
	                { className: 'col-6' },
	                _react2.default.createElement(
	                  'div',
	                  { className: 'price', onClick: this.setSorting },
	                  _react2.default.createElement(
	                    'span',
	                    null,
	                    pgettext('Category page filters', 'ascending')
	                  ),
	                  _react2.default.createElement(
	                    'div',
	                    { className: 'float-right sort-order-icon' },
	                    _react2.default.createElement(_reactInlinesvg2.default, { src: _arrow_up2.default })
	                  )
	                )
	              )
	            ),
	            _react2.default.createElement(
	              'div',
	              { className: 'row' },
	              _react2.default.createElement('div', { className: 'col-6' }),
	              _react2.default.createElement(
	                'div',
	                { className: 'col-6' },
	                _react2.default.createElement(
	                  'div',
	                  { className: '-price', onClick: this.setSorting },
	                  _react2.default.createElement(
	                    'span',
	                    null,
	                    pgettext('Category page filters', 'descending')
	                  ),
	                  _react2.default.createElement(
	                    'div',
	                    { className: 'float-right sort-order-icon' },
	                    _react2.default.createElement(_reactInlinesvg2.default, { src: _arrow_down2.default })
	                  )
	                )
	              )
	            )
	          )
	        )
	      );
	    }
	  }]);
	
	  return sortBy;
	}(_react.Component), _class.propTypes = {
	  setSorting: _react.PropTypes.func,
	  sortedValue: _react.PropTypes.string
	}, _temp);
	exports.default = sortBy;

/***/ }),

/***/ 220:
/*!***********************************************************!*\
  !*** ./saleor/static/js/components/categoryPage/utils.js ***!
  \***********************************************************/
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.ensureAllowedName = exports.getAttributesFromQuery = exports.getFromQuery = undefined;
	
	var _queryString = __webpack_require__(/*! query-string */ 92);
	
	var _queryString2 = _interopRequireDefault(_queryString);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var getFromQuery = exports.getFromQuery = function getFromQuery(key) {
	  var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
	
	  var value = _queryString2.default.parse(location.search)[key];
	  return value || defaultValue;
	};
	
	var getAttributesFromQuery = exports.getAttributesFromQuery = function getAttributesFromQuery(exclude) {
	  // Exclude parameter is used to exclude other query string parameters than
	  // product attribute filters.
	  var urlParams = _queryString2.default.parse(location.search);
	  var attributes = [];
	  Object.keys(urlParams).forEach(function (key) {
	    if (exclude.indexOf(key) === -1) {
	      if (Array.isArray(urlParams[key])) {
	        var values = urlParams[key];
	        values.map(function (valueSlug) {
	          attributes.push(key + ':' + valueSlug);
	        });
	      } else {
	        var valueSlug = urlParams[key];
	        attributes.push(key + ':' + valueSlug);
	      }
	    }
	  });
	  return attributes;
	};
	
	var ensureAllowedName = exports.ensureAllowedName = function ensureAllowedName(name, allowed) {
	  var origName = name;
	  if (name && name.startsWith('-')) {
	    name = name.substr(1, name.length);
	  }
	  return allowed.indexOf(name) > -1 ? origName : null;
	};

/***/ }),

/***/ 350:
/*!*********************************************!*\
  !*** ./saleor/static/images/arrow_down.svg ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "arrow_down.svg";

/***/ }),

/***/ 351:
/*!*********************************************!*\
  !*** ./saleor/static/images/arrow_left.svg ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "arrow_left.svg";

/***/ }),

/***/ 352:
/*!*******************************************!*\
  !*** ./saleor/static/images/arrow_up.svg ***!
  \*******************************************/
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "arrow_up.svg";

/***/ }),

/***/ 353:
/*!***********************************************!*\
  !*** ./saleor/static/images/chevron_down.svg ***!
  \***********************************************/
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "chevron_down.svg";

/***/ }),

/***/ 354:
/*!*********************************************!*\
  !*** ./saleor/static/images/chevron_up.svg ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "chevron_up.svg";

/***/ }),

/***/ 355:
/*!*****************************************!*\
  !*** ./saleor/static/images/loader.svg ***!
  \*****************************************/
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "loader.svg";

/***/ }),

/***/ 358:
/*!*****************************************!*\
  !*** ./saleor/static/images/pirate.svg ***!
  \*****************************************/
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "pirate.svg";

/***/ }),

/***/ 359:
/*!******************************************!*\
  !*** ./saleor/static/images/sale_bg.svg ***!
  \******************************************/
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "sale_bg.svg";

/***/ }),

/***/ 361:
/*!***********************************!*\
  !*** ./~/httpplease/lib/error.js ***!
  \***********************************/
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var Response = __webpack_require__(/*! ./response */ 185);
	var extractResponseProps = __webpack_require__(/*! ./utils/extractResponseProps */ 186);
	var extend = __webpack_require__(/*! xtend */ 126);
	
	function RequestError(message, props) {
	  var err = new Error(message);
	  err.name = 'RequestError';
	  this.name = err.name;
	  this.message = err.message;
	  if (err.stack) {
	    this.stack = err.stack;
	  }
	
	  this.toString = function() {
	    return this.message;
	  };
	
	  for (var k in props) {
	    if (props.hasOwnProperty(k)) {
	      this[k] = props[k];
	    }
	  }
	}
	
	RequestError.prototype = extend(Error.prototype);
	RequestError.prototype.constructor = RequestError;
	
	RequestError.create = function(message, req, props) {
	  var err = new RequestError(message, props);
	  Response.call(err, extractResponseProps(req));
	  return err;
	};
	
	module.exports = RequestError;


/***/ }),

/***/ 362:
/*!***********************************!*\
  !*** ./~/httpplease/lib/index.js ***!
  \***********************************/
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var
	  cleanURL = __webpack_require__(/*! ../plugins/cleanurl */ 365),
	  XHR = __webpack_require__(/*! ./xhr */ 364),
	  delay = __webpack_require__(/*! ./utils/delay */ 363),
	  RequestError = __webpack_require__(/*! ./error */ 361),
	  Response = __webpack_require__(/*! ./response */ 185),
	  Request = __webpack_require__(/*! ./request */ 184),
	  extend = __webpack_require__(/*! xtend */ 126),
	  once = __webpack_require__(/*! ./utils/once */ 187);
	
	var i,
	    createError = RequestError.create;
	
	function factory(defaults, plugins) {
	  defaults = defaults || {};
	  plugins = plugins || [];
	
	  function http(req, cb) {
	    var xhr, plugin, done, k, timeoutId, supportsLoadAndErrorEvents;
	
	    req = new Request(extend(defaults, req));
	
	    for (i = 0; i < plugins.length; i++) {
	      plugin = plugins[i];
	      if (plugin.processRequest) {
	        plugin.processRequest(req);
	      }
	    }
	
	    // Give the plugins a chance to create the XHR object
	    for (i = 0; i < plugins.length; i++) {
	      plugin = plugins[i];
	      if (plugin.createXHR) {
	        xhr = plugin.createXHR(req);
	        break; // First come, first serve
	      }
	    }
	    xhr = xhr || new XHR();
	
	    req.xhr = xhr;
	
	    // Use a single completion callback. This can be called with or without
	    // an error. If no error is passed, the request will be examined to see
	    // if it was successful.
	    done = once(delay(function(rawError) {
	      clearTimeout(timeoutId);
	      xhr.onload = xhr.onerror = xhr.onabort = xhr.onreadystatechange = xhr.ontimeout = xhr.onprogress = null;
	
	      var err = getError(req, rawError);
	
	      var res = err || Response.fromRequest(req);
	      for (i = 0; i < plugins.length; i++) {
	        plugin = plugins[i];
	        if (plugin.processResponse) {
	          plugin.processResponse(res);
	        }
	      }
	
	      // Invoke callbacks
	      if (err && req.onerror) req.onerror(err);
	      if (!err && req.onload) req.onload(res);
	      if (cb) cb(err, err ? undefined : res);
	
	    }));
	
	    supportsLoadAndErrorEvents = ('onload' in xhr) && ('onerror' in xhr);
	    xhr.onload = function() { done(); };
	    xhr.onerror = done;
	    xhr.onabort = function() { done(); };
	
	    // We'd rather use `onload`, `onerror`, and `onabort` since they're the
	    // only way to reliably detect successes and failures but, if they
	    // aren't available, we fall back to using `onreadystatechange`.
	    xhr.onreadystatechange = function() {
	      if (xhr.readyState !== 4) return;
	
	      if (req.aborted) return done();
	
	      if (!supportsLoadAndErrorEvents) {
	        // Assume a status of 0 is an error. This could be a false
	        // positive, but there's no way to tell when using
	        // `onreadystatechange` ):
	        // See matthewwithanm/react-inlinesvg#10.
	
	        // Some browsers don't like you reading XHR properties when the
	        // XHR has been aborted. In case we've gotten here as a result
	        // of that (either our calling `about()` in the timeout handler
	        // or the user calling it directly even though they shouldn't),
	        // be careful about accessing it.
	        var status;
	        try {
	          status = xhr.status;
	        } catch (err) {}
	        var err = status === 0 ? new Error('Internal XHR Error') : null;
	        return done(err);
	      }
	    };
	
	    // IE sometimes fails if you don't specify every handler.
	    // See http://social.msdn.microsoft.com/Forums/ie/en-US/30ef3add-767c-4436-b8a9-f1ca19b4812e/ie9-rtm-xdomainrequest-issued-requests-may-abort-if-all-event-handlers-not-specified?forum=iewebdevelopment
	    xhr.ontimeout = function() { /* noop */ };
	    xhr.onprogress = function() { /* noop */ };
	
	    xhr.open(req.method, req.url);
	
	    if (req.timeout) {
	      // If we use the normal XHR timeout mechanism (`xhr.timeout` and
	      // `xhr.ontimeout`), `onreadystatechange` will be triggered before
	      // `ontimeout`. There's no way to recognize that it was triggered by
	      // a timeout, and we'd be unable to dispatch the right error.
	      timeoutId = setTimeout(function() {
	        req.timedOut = true;
	        done();
	        try {
	          xhr.abort();
	        } catch (err) {}
	      }, req.timeout);
	    }
	
	    for (k in req.headers) {
	      if (req.headers.hasOwnProperty(k)) {
	        xhr.setRequestHeader(k, req.headers[k]);
	      }
	    }
	
	    xhr.send(req.body);
	
	    return req;
	  }
	
	  var method,
	    methods = ['get', 'post', 'put', 'head', 'patch', 'delete'],
	    verb = function(method) {
	      return function(req, cb) {
	        req = new Request(req);
	        req.method = method;
	        return http(req, cb);
	      };
	    };
	  for (i = 0; i < methods.length; i++) {
	    method = methods[i];
	    http[method] = verb(method);
	  }
	
	  http.plugins = function() {
	    return plugins;
	  };
	
	  http.defaults = function(newValues) {
	    if (newValues) {
	      return factory(extend(defaults, newValues), plugins);
	    }
	    return defaults;
	  };
	
	  http.use = function() {
	    var newPlugins = Array.prototype.slice.call(arguments, 0);
	    return factory(defaults, plugins.concat(newPlugins));
	  };
	
	  http.bare = function() {
	    return factory();
	  };
	
	  http.Request = Request;
	  http.Response = Response;
	  http.RequestError = RequestError;
	
	  return http;
	}
	
	module.exports = factory({}, [cleanURL]);
	
	/**
	 * Analyze the request to see if it represents an error. If so, return it! An
	 * original error object can be passed as a hint.
	 */
	function getError(req, err) {
	  if (req.aborted) return createError('Request aborted', req, {name: 'Abort'});
	
	  if (req.timedOut) return createError('Request timeout', req, {name: 'Timeout'});
	
	  var xhr = req.xhr;
	  var type = Math.floor(xhr.status / 100);
	
	  var kind;
	  switch (type) {
	    case 0:
	    case 2:
	      // These don't represent errors unless the function was passed an
	      // error object explicitly.
	      if (!err) return;
	      return createError(err.message, req);
	    case 4:
	      // Sometimes 4XX statuses aren't errors.
	      if (xhr.status === 404 && !req.errorOn404) return;
	      kind = 'Client';
	      break;
	    case 5:
	      kind = 'Server';
	      break;
	    default:
	      kind = 'HTTP';
	  }
	  var msg = kind + ' Error: ' +
	        'The server returned a status of ' + xhr.status +
	        ' for the request "' +
	        req.method.toUpperCase() + ' ' + req.url + '"';
	  return createError(msg, req);
	}


/***/ }),

/***/ 363:
/*!*****************************************!*\
  !*** ./~/httpplease/lib/utils/delay.js ***!
  \*****************************************/
/***/ (function(module, exports) {

	'use strict';
	
	// Wrap a function in a `setTimeout` call. This is used to guarantee async
	// behavior, which can avoid unexpected errors.
	
	module.exports = function(fn) {
	  return function() {
	    var
	      args = Array.prototype.slice.call(arguments, 0),
	      newFunc = function() {
	        return fn.apply(null, args);
	      };
	    setTimeout(newFunc, 0);
	  };
	};


/***/ }),

/***/ 364:
/*!*****************************************!*\
  !*** ./~/httpplease/lib/xhr-browser.js ***!
  \*****************************************/
/***/ (function(module, exports) {

	module.exports = window.XMLHttpRequest;


/***/ }),

/***/ 365:
/*!******************************************!*\
  !*** ./~/httpplease/plugins/cleanurl.js ***!
  \******************************************/
/***/ (function(module, exports) {

	'use strict';
	
	module.exports = {
	  processRequest: function(req) {
	    req.url = req.url.replace(/[^%]+/g, function(s) {
	      return encodeURI(s);
	    });
	  }
	};


/***/ }),

/***/ 366:
/*!**********************************************!*\
  !*** ./~/httpplease/plugins/oldiexdomain.js ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var
	  urllite = __webpack_require__(/*! urllite/lib/core */ 432),
	  once = __webpack_require__(/*! ../lib/utils/once */ 187);
	
	var warningShown = false;
	
	var supportsXHR = once(function() {
	  return (
	    typeof window !== 'undefined' &&
	    window !== null &&
	    window.XMLHttpRequest &&
	    'withCredentials' in new window.XMLHttpRequest()
	  );
	});
	
	// This plugin creates a Microsoft `XDomainRequest` in supporting browsers when
	// the URL being requested is on a different domain. This is necessary to
	// support IE9, which only supports CORS via its proprietary `XDomainRequest`
	// object. We need to check the URL because `XDomainRequest` *doesn't* work for
	// same domain requests (unless your server sends CORS headers).
	// `XDomainRequest` also has other limitations (no custom headers), so we try to
	// catch those and error.
	module.exports = {
	  createXHR: function(req) {
	    var a, b, k;
	
	    if (typeof window === 'undefined' || window === null) {
	      return;
	    }
	
	    a = urllite(req.url);
	    b = urllite(window.location.href);
	
	    // Don't do anything for same-domain requests.
	    if (!a.host) {
	      return;
	    }
	    if (a.protocol === b.protocol && a.host === b.host && a.port === b.port) {
	      return;
	    }
	
	    // Show a warning if there are custom headers. We do this even in
	    // browsers that won't use XDomainRequest so that users know there's an
	    // issue right away, instead of if/when they test in IE9.
	    if (!warningShown && req.headers) {
	      for (k in req.headers) {
	        if (req.headers.hasOwnProperty(k)) {
	          warningShown = true;
	          if (window && window.console && window.console.warn) {
	            window.console.warn('Request headers are ignored in old IE when using the oldiexdomain plugin.');
	          }
	          break;
	        }
	      }
	    }
	
	    // Don't do anything if we can't do anything (:
	    // Don't do anything if the browser supports proper XHR.
	    if (window.XDomainRequest && !supportsXHR()) {
	      // We've come this far. Might as well make an XDomainRequest.
	      var xdr = new window.XDomainRequest();
	      xdr.setRequestHeader = function() {}; // Ignore request headers.
	      return xdr;
	    }
	  }
	};


/***/ }),

/***/ 370:
/*!************************!*\
  !*** ./~/once/once.js ***!
  \************************/
/***/ (function(module, exports, __webpack_require__) {

	var wrappy = __webpack_require__(/*! wrappy */ 435)
	module.exports = wrappy(once)
	module.exports.strict = wrappy(onceStrict)
	
	once.proto = once(function () {
	  Object.defineProperty(Function.prototype, 'once', {
	    value: function () {
	      return once(this)
	    },
	    configurable: true
	  })
	
	  Object.defineProperty(Function.prototype, 'onceStrict', {
	    value: function () {
	      return onceStrict(this)
	    },
	    configurable: true
	  })
	})
	
	function once (fn) {
	  var f = function () {
	    if (f.called) return f.value
	    f.called = true
	    return f.value = fn.apply(this, arguments)
	  }
	  f.called = false
	  return f
	}
	
	function onceStrict (fn) {
	  var f = function () {
	    if (f.called)
	      throw new Error(f.onceError)
	    f.called = true
	    return f.value = fn.apply(this, arguments)
	  }
	  var name = fn.name || 'Function wrapped with `once`'
	  f.onceError = name + " shouldn't be called more than once"
	  f.called = false
	  return f
	}


/***/ }),

/***/ 379:
/*!********************************************************!*\
  !*** ./~/react-inlinesvg/lib/shouldComponentUpdate.js ***!
  \********************************************************/
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.shouldComponentUpdate = shouldComponentUpdate;
	exports.shouldComponentUpdateContext = shouldComponentUpdateContext;
	
	var _shallowEqual = __webpack_require__(/*! fbjs/lib/shallowEqual */ 88);
	
	var _shallowEqual2 = _interopRequireDefault(_shallowEqual);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 *  @module PureRender
	 */
	
	/**
	 * shouldComponentUpdate without context.
	 *
	 * @requires shallowEqual
	 *
	 * @param {Object} nextProps
	 * @param {Object} nextState
	 *
	 * @returns {boolean}
	 */
	function shouldComponentUpdate(nextProps, nextState) {
	  return !(0, _shallowEqual2.default)(this.props, nextProps) || !(0, _shallowEqual2.default)(this.state, nextState);
	}
	
	/**
	 * shouldComponentUpdate with context.
	 *
	 * @requires shallowEqual
	 *
	 * @param {Object} nextProps
	 * @param {Object} nextState
	 * @param {Object} nextContext
	 *
	 * @returns {boolean}
	 */
	function shouldComponentUpdateContext(nextProps, nextState, nextContext) {
	  return !(0, _shallowEqual2.default)(this.props, nextProps) || !(0, _shallowEqual2.default)(this.state, nextState) || !(0, _shallowEqual2.default)(this.context, nextContext);
	}
	
	exports.default = { shouldComponentUpdate: shouldComponentUpdate, shouldComponentUpdateContext: shouldComponentUpdateContext };

/***/ }),

/***/ 432:
/*!*******************************!*\
  !*** ./~/urllite/lib/core.js ***!
  \*******************************/
/***/ (function(module, exports) {

	(function() {
	  var URL, URL_PATTERN, defaults, urllite,
	    __hasProp = {}.hasOwnProperty;
	
	  URL_PATTERN = /^(?:(?:([^:\/?\#]+:)\/+|(\/\/))(?:([a-z0-9-\._~%]+)(?::([a-z0-9-\._~%]+))?@)?(([a-z0-9-\._~%!$&'()*+,;=]+)(?::([0-9]+))?)?)?([^?\#]*?)(\?[^\#]*)?(\#.*)?$/;
	
	  urllite = function(raw, opts) {
	    return urllite.URL.parse(raw, opts);
	  };
	
	  urllite.URL = URL = (function() {
	    function URL(props) {
	      var k, v, _ref;
	      for (k in defaults) {
	        if (!__hasProp.call(defaults, k)) continue;
	        v = defaults[k];
	        this[k] = (_ref = props[k]) != null ? _ref : v;
	      }
	      this.host || (this.host = this.hostname && this.port ? "" + this.hostname + ":" + this.port : this.hostname ? this.hostname : '');
	      this.origin || (this.origin = this.protocol ? "" + this.protocol + "//" + this.host : '');
	      this.isAbsolutePathRelative = !this.host && this.pathname.charAt(0) === '/';
	      this.isPathRelative = !this.host && this.pathname.charAt(0) !== '/';
	      this.isRelative = this.isSchemeRelative || this.isAbsolutePathRelative || this.isPathRelative;
	      this.isAbsolute = !this.isRelative;
	    }
	
	    URL.parse = function(raw) {
	      var m, pathname, protocol;
	      m = raw.toString().match(URL_PATTERN);
	      pathname = m[8] || '';
	      protocol = m[1];
	      return new urllite.URL({
	        protocol: protocol,
	        username: m[3],
	        password: m[4],
	        hostname: m[6],
	        port: m[7],
	        pathname: protocol && pathname.charAt(0) !== '/' ? "/" + pathname : pathname,
	        search: m[9],
	        hash: m[10],
	        isSchemeRelative: m[2] != null
	      });
	    };
	
	    return URL;
	
	  })();
	
	  defaults = {
	    protocol: '',
	    username: '',
	    password: '',
	    host: '',
	    hostname: '',
	    port: '',
	    pathname: '',
	    search: '',
	    hash: '',
	    origin: '',
	    isSchemeRelative: false
	  };
	
	  module.exports = urllite;
	
	}).call(this);


/***/ }),

/***/ 435:
/*!****************************!*\
  !*** ./~/wrappy/wrappy.js ***!
  \****************************/
/***/ (function(module, exports) {

	// Returns a wrapper function that returns a wrapped callback
	// The wrapper function should do some stuff, and return a
	// presumably different callback function.
	// This makes sure that own properties are retained, so that
	// decorations and such are not lost along the way.
	module.exports = wrappy
	function wrappy (fn, cb) {
	  if (fn && cb) return wrappy(fn)(cb)
	
	  if (typeof fn !== 'function')
	    throw new TypeError('need wrapper function')
	
	  Object.keys(fn).forEach(function (k) {
	    wrapper[k] = fn[k]
	  })
	
	  return wrapper
	
	  function wrapper() {
	    var args = new Array(arguments.length)
	    for (var i = 0; i < args.length; i++) {
	      args[i] = arguments[i]
	    }
	    var ret = fn.apply(this, args)
	    var cb = args[args.length-1]
	    if (typeof ret === 'function' && ret !== cb) {
	      Object.keys(cb).forEach(function (k) {
	        ret[k] = cb[k]
	      })
	    }
	    return ret
	  }
	}


/***/ })

});
//# sourceMappingURL=category.js.map