/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _jsreportStudio = __webpack_require__(1);
	
	var _jsreportStudio2 = _interopRequireDefault(_jsreportStudio);
	
	var _PDFPasswordProperties = __webpack_require__(2);
	
	var _PDFPasswordProperties2 = _interopRequireDefault(_PDFPasswordProperties);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var isPDFRecipe = __webpack_require__(5).default;
	
	_jsreportStudio2.default.addPropertiesComponent('pdf-password', _PDFPasswordProperties2.default, function (entity) {
	  return entity.__entitySet === 'templates' && isPDFRecipe(entity.recipe);
	});
	
	_jsreportStudio2.default.addApiSpec({
	  template: {
	    pdfPassword: {
	      active: true,
	      password: '...',
	      ownerPassword: '...',
	      protectionLevel: 5
	    }
	  }
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = Studio;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(3);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var protectionLevels = __webpack_require__(4).default;
	
	var PDFPasswordProperties = function (_Component) {
	  _inherits(PDFPasswordProperties, _Component);
	
	  function PDFPasswordProperties() {
	    _classCallCheck(this, PDFPasswordProperties);
	
	    return _possibleConstructorReturn(this, (PDFPasswordProperties.__proto__ || Object.getPrototypeOf(PDFPasswordProperties)).apply(this, arguments));
	  }
	
	  _createClass(PDFPasswordProperties, [{
	    key: 'render',
	    value: function render() {
	      var _props = this.props,
	          entity = _props.entity,
	          onChange = _props.onChange;
	
	      var pdfPassword = entity.pdfPassword || {};
	
	      var changePDFPassword = function changePDFPassword(change) {
	        if (change.active === false) {
	          change.password = '';
	          change.ownerPassword = '';
	          change.protectionLevel = -1;
	        }
	
	        onChange(Object.assign({}, entity, { pdfPassword: Object.assign({}, entity.pdfPassword, change) }));
	      };
	
	      return _react2.default.createElement(
	        'div',
	        { className: 'properties-section' },
	        _react2.default.createElement(
	          'div',
	          { className: 'form-group' },
	          _react2.default.createElement(
	            'label',
	            null,
	            'add password to PDF'
	          ),
	          _react2.default.createElement('input', {
	            type: 'checkbox', checked: pdfPassword.active === true,
	            onChange: function onChange(v) {
	              return changePDFPassword({ active: v.target.checked });
	            }
	          })
	        ),
	        pdfPassword.active && [_react2.default.createElement(
	          'div',
	          { key: 'password-field', className: 'form-group' },
	          _react2.default.createElement(
	            'label',
	            null,
	            'Password'
	          ),
	          _react2.default.createElement('input', {
	            type: 'password',
	            placeholder: 'write a password',
	            value: pdfPassword.password || '',
	            onChange: function onChange(v) {
	              return changePDFPassword({ password: v.target.value });
	            }
	          })
	        ), _react2.default.createElement(
	          'div',
	          { key: 'owner-password-field', className: 'form-group' },
	          _react2.default.createElement(
	            'label',
	            null,
	            'Owner Password'
	          ),
	          _react2.default.createElement('input', {
	            type: 'password',
	            placeholder: 'write a password',
	            value: pdfPassword.ownerPassword || '',
	            onChange: function onChange(v) {
	              return changePDFPassword({ ownerPassword: v.target.value });
	            }
	          })
	        ), _react2.default.createElement(
	          'div',
	          { key: 'protection-level-field', className: 'form-group' },
	          _react2.default.createElement(
	            'label',
	            null,
	            'Protection Level'
	          ),
	          _react2.default.createElement(
	            'select',
	            {
	              value: pdfPassword.protectionLevel || -1,
	              onChange: function onChange(v) {
	                return changePDFPassword({ protectionLevel: parseInt(v.target.value) });
	              }
	            },
	            _react2.default.createElement(
	              'option',
	              { key: -1, value: -1 },
	              'None'
	            ),
	            protectionLevels.map(function (level) {
	              return _react2.default.createElement(
	                'option',
	                { key: level.value, value: level.value },
	                level.description
	              );
	            })
	          )
	        )]
	      );
	    }
	  }]);
	
	  return PDFPasswordProperties;
	}(_react.Component);
	
	exports.default = PDFPasswordProperties;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = Studio.libraries['react'];

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports.default = [{
	  description: 'allow print document',
	  value: 3
	}, {
	  description: 'allow modification of document',
	  value: 4
	}, {
	  description: 'allow copying or extracting content from document',
	  value: 5
	}, {
	  description: 'allow adding text annotations, form fields',
	  value: 6
	}, {
	  description: 'allow filling forms in document',
	  value: 9
	}, {
	  description: 'allow copying or extracting content from document (accessibility only)',
	  value: 10
	}, {
	  description: 'allow assembling the document (rotate, insert, delete pages, bookmarks)',
	  value: 11
	}, {
	  description: 'allow printing of document in good res',
	  value: 12
	}];

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";
	
	var PDF_RECIPE_REG_EXP = /pdf/;
	
	function isPDFRecipe(recipeName) {
	  return PDF_RECIPE_REG_EXP.test(recipeName);
	}
	
	module.exports.default = isPDFRecipe;

/***/ }
/******/ ]);