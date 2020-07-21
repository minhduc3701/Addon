import { memoizeFunction } from "../index";
import { mergeStyleSets } from "../../styling/index";
/**
 * @deprecated use getStyles exported from VerticalDivider.styles.ts
 */
export var getDividerClassNames = memoizeFunction(
  // tslint:disable-next-line:deprecation
  function (theme) {
    return mergeStyleSets({
      wrapper: {
        display: "inline-flex",
        height: "100%",
        alignItems: "center",
      },
      divider: {
        width: 1,
        height: "100%",
        backgroundColor: theme.palette.neutralTertiaryAlt,
      },
    });
  }
);
//# sourceMappingURL=VerticalDivider.classNames.js.map
