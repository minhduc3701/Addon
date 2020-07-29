import { __assign, __extends, __rest } from "tslib";
import * as React from "react";
import { concatStyleSetsWithProps } from "../styling";
import { Customizations, CustomizerContext } from "./customizations";
var DefaultFields = ["theme", "styles"];
/**
 * The styled HOC wrapper allows you to create a functional wrapper around a given component which will resolve
 * getStyles functional props, and mix customized props passed in using concatStyleSets.
 *
 * @example
 * ```tsx
 * export const Toggle = styled(
 *   ToggleBase,
 *   props => ({ root: { background: 'red' }})
 * );
 * ```
 * @param Component - The unstyled base component to render, which receives styles.
 * @param baseStyles - The styles which should be curried with the component.
 * @param getProps - A helper which provides default props.
 * @param customizable - An object which defines which props can be customized using the Customizer.
 * @param pure - A boolean indicating if the component should avoid re-rendering when props haven't changed.
 * Note that pure should not be used on components which allow children, or take in complex objects or
 * arrays as props which could mutate on every render.
 */
export function styled(Component, baseStyles, getProps, customizable, pure) {
  customizable = customizable || { scope: "", fields: undefined };
  var scope = customizable.scope,
    _a = customizable.fields,
    fields = _a === void 0 ? DefaultFields : _a;
  var ParentComponent = pure ? React.PureComponent : React.Component;
  var Wrapped = /** @class */ (function (_super) {
    __extends(Wrapped, _super);
    function Wrapped() {
      var _this = (_super !== null && _super.apply(this, arguments)) || this;
      _this._inCustomizerContext = false;
      _this._renderContent = function (context) {
        _this._inCustomizerContext = !!context.customizations
          .inCustomizerContext;
        var settings = Customizations.getSettings(
          fields,
          scope,
          context.customizations
        );
        var customizedStyles = settings.styles,
          // dir = settings.dir,
          rest = __rest(settings, ["styles", "dir"]);
        var additionalProps = getProps ? getProps(_this.props) : undefined;
        _this._updateStyles(customizedStyles);
        return React.createElement(
          Component,
          __assign({}, rest, additionalProps, _this.props, {
            styles: _this._styles,
          })
        );
      };
      _this._onSettingsChanged = function () {
        return _this.forceUpdate();
      };
      return _this;
    }
    Wrapped.prototype.render = function () {
      return React.createElement(
        CustomizerContext.Consumer,
        null,
        this._renderContent
      );
    };
    Wrapped.prototype.componentDidMount = function () {
      if (!this._inCustomizerContext) {
        Customizations.observe(this._onSettingsChanged);
      }
    };
    Wrapped.prototype.componentWillUnmount = function () {
      if (!this._inCustomizerContext) {
        Customizations.unobserve(this._onSettingsChanged);
      }
    };
    Wrapped.prototype._updateStyles = function (customizedStyles) {
      var _this = this;
      // tslint:disable-next-line:no-any
      var cache = (this._styles && this._styles.__cachedInputs__) || [];
      if (
        !this._styles ||
        customizedStyles !== cache[1] ||
        this.props.styles !== cache[2]
      ) {
        // Cache the customized styles.
        // this._customizedStyles = customizedStyles;
        // Using styled components as the Component arg will result in nested styling arrays.
        var concatenatedStyles = function (styleProps) {
          return concatStyleSetsWithProps(
            styleProps,
            baseStyles,
            customizedStyles,
            _this.props.styles
          );
        };
        // The __cachedInputs__ array is attached to the function and consumed by the
        // classNamesFunction as a list of keys to include for memoizing classnames.
        concatenatedStyles.__cachedInputs__ = [
          baseStyles,
          customizedStyles,
          this.props.styles,
        ];
        concatenatedStyles.__noStyleOverride__ =
          !customizedStyles && !this.props.styles;
        this._styles = concatenatedStyles;
      }
    };
    // Function.prototype.name is an ES6 feature, so the cast to any is required until we're
    // able to drop IE 11 support and compile with ES6 libs
    // tslint:disable-next-line:no-any
    Wrapped.displayName = "Styled" + (Component.displayName || Component.name);
    return Wrapped;
  })(ParentComponent);
  // This preserves backwards compatibility.
  // tslint:disable-next-line:no-any
  return Wrapped;
}
//# sourceMappingURL=styled.js.map
