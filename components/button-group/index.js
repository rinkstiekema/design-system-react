"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _lodash = _interopRequireDefault(require("lodash.assign"));

var _constants = require("../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */

/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
// Implements the [Button Group design pattern](https://lightningdesignsystem.com/components/button-groups/) in React.
// Based on SLDS v2.1.1
var propTypes = {
  /**
   * Children are expected to be components. If last button triggers a dropdown menu, use Dropdown instead of Button. _Tested with snapshot testing._
   */
  children: _propTypes.default.node.isRequired,

  /**
   * CSS classes added to `slds-button-group` or `slds-checkbox_button-group` tag
   */
  className: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object, _propTypes.default.string]),

  /**
   * **Text labels for internationalization**
   * This object is merged with the default props object on every render.
   * * `error`: Message to display when any of Checkboxes are in an error state. _Tested with snapshot testing._
   * * `label`: This label appears above the button group. _Tested with snapshot testing._
   */
  labels: _propTypes.default.shape({
    error: _propTypes.default.string,
    label: _propTypes.default.string
  }),

  /**
   * Use checkbox variant for "Checkbox Button Group" styling and add Checkbox components as children _Tested with snapshot testing._
   */
  variant: _propTypes.default.oneOf(['checkbox', 'list'])
};
var defaultProps = {
  labels: {}
};
/**
 * The ButtonGroup component wraps other components (ie. Button, MenuDropdown, PopoverTooltip, Checkboxes, etc).
 */

var ButtonGroup = function ButtonGroup() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  // Merge objects of strings with their default object
  var labels = (0, _lodash.default)({}, defaultProps.labels, props.labels);
  var zeroIndexLength = _react.default.Children.count(props.children) - 1;
  var children = props.children;

  if (zeroIndexLength > 0) {
    children = _react.default.Children.map(props.children, function (child, index) {
      var newChild;

      if (index === zeroIndexLength) {
        newChild = _react.default.cloneElement(child, {
          triggerClassName: 'slds-button_last'
        });
      }

      return newChild || child;
    });
  }

  if (props.variant === 'checkbox') {
    children = _react.default.Children.map(props.children, function (child) {
      return _react.default.cloneElement(child, {
        variant: 'button-group'
      });
    });
    return _react.default.createElement("fieldset", {
      className: (0, _classnames.default)('slds-form-element', {
        'slds-has-error': labels.error
      })
    }, _react.default.createElement("legend", {
      className: "slds-form-element__legend slds-form-element__label"
    }, props.labels.label), _react.default.createElement("div", {
      className: "slds-form-element__control"
    }, _react.default.createElement("div", {
      className: (0, _classnames.default)('slds-checkbox_button-group', props.className)
    }, children), labels.error ? _react.default.createElement("div", {
      className: "slds-form-element__help"
    }, labels.error) : null));
  }

  if (props.variant === 'list') {
    return _react.default.createElement("ul", {
      className: (0, _classnames.default)('slds-button-group-list', props.className)
    }, _react.default.Children.map(props.children, function (child) {
      return _react.default.createElement("li", null, child);
    }));
  } // default


  return _react.default.createElement("div", {
    className: (0, _classnames.default)('slds-button-group', props.className),
    role: "group"
  }, children);
};

ButtonGroup.displayName = _constants.BUTTON_GROUP;
ButtonGroup.propTypes = propTypes;
ButtonGroup.defaultProps = defaultProps;
var _default = ButtonGroup;
exports.default = _default;