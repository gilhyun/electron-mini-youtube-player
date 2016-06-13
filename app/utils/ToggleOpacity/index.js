'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

(function (root, factory) {
	// Building component according to modularization strategy

	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define(['react'], factory);
	} else if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object') {
		// Node. Note that this does not work with strict
		// CommonJS, but only CommonJS-like environments
		// that support module.exports
		module.exports = factory(require('react'));
	} else {
		// Browser globals (root is window)
		root.ToggleOpacity = factory(React);
	}
})(undefined, function (React) {
	"use strict";

	function isDefined(val) {
		return val != null;
	}

	function shouldHide(props) {
		var shouldHide = undefined;
		if (isDefined(props.show)) {
			shouldHide = !props.show;
		} else if (isDefined(props.hide)) {
			shouldHide = props.hide;
		} else {
			shouldHide = false;
		}
		return shouldHide;
	}

	function ToggleOpacity(props) {
		if (props.if === false) {
			return React.createElement('noscript', null);
			// return null // this used to work, now have to manually return <noscript>
		}

		var style = {
			transition: 'opacity 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
			opacity: 1
		};
		if (shouldHide(props)) {
			style.opacity = 0;
		}
		return React.createElement('div', _extends({ style: style }, props));
	}

	ToggleOpacity.propTypes = {
		hide: React.PropTypes.bool,
		show: React.PropTypes.bool,
		if: React.PropTypes.bool
	};

	return ToggleOpacity;
});
