import {
  getGlobalClassNames,
  HighContrastSelector,
} from "../../@uifabric/styling";
var GlobalClassNames = {
  root: "ms-ShimmerGap-root",
};
export function getStyles(props) {
  var _a;
  // tslint:disable-next-line:deprecation
  var height = props.height,
    borderStyle = props.borderStyle,
    theme = props.theme;
  var semanticColors = theme.semanticColors;
  var globalClassNames = getGlobalClassNames(GlobalClassNames, theme);
  var borderStyles = !!borderStyle ? borderStyle : {};
  return {
    root: [
      globalClassNames.root,
      theme.fonts.medium,
      {
        backgroundColor: semanticColors.bodyBackground,
        height: height + "px",
        boxSizing: "content-box",
        borderTopStyle: "solid",
        borderBottomStyle: "solid",
        borderColor: semanticColors.bodyBackground,
        selectors:
          ((_a = {}),
          (_a[HighContrastSelector] = {
            backgroundColor: "Window",
            borderColor: "Window",
          }),
          _a),
      },
      borderStyles,
    ],
  };
}
//# sourceMappingURL=ShimmerGap.styles.js.map
