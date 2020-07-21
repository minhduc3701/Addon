import * as React from "react";
import { classNamesFunction } from "../index";
var getClassNames = classNamesFunction();
export var VerticalDividerBase = function (props) {
  // tslint:disable-next-line:deprecation
  var styles = props.styles,
    theme = props.theme,
    deprecatedGetClassNames = props.getClassNames,
    className = props.className;
  var classNames = getClassNames(styles, {
    theme: theme,
    getClassNames: deprecatedGetClassNames,
    className: className,
  });
  return React.createElement(
    "span",
    { className: classNames.wrapper },
    React.createElement("span", { className: classNames.divider })
  );
};
//# sourceMappingURL=VerticalDivider.base.js.map
