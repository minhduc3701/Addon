import { AnimationClassNames } from "../@uifabric/styling";
export var getStyles = function (props) {
  var darkMode = props.darkMode;
  var className = props.className,
    _a = props.beakWidth,
    beakWidth = _a === void 0 ? 16 : _a,
    _b = props.gapSpace,
    gapSpace = _b === void 0 ? 0 : _b,
    maxWidth = props.maxWidth,
    theme = props.theme;
  var semanticColors = theme.semanticColors,
    fonts = theme.fonts;
  // effects = theme.effects;
  // The math here is done to account for the 45 degree rotation of the beak
  var tooltipGapSpace = -(Math.sqrt((beakWidth * beakWidth) / 2) + gapSpace);
  return {
    root: [
      "ms-Tooltip",
      theme.fonts.medium,
      AnimationClassNames.fadeIn200,
      {
        background: semanticColors.menuBackground,
        // boxShadow: effects.elevation8,
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        padding: "8px",
        maxWidth: maxWidth,
        selectors: {
          ":after": {
            content: "''",
            position: "absolute",
            bottom: tooltipGapSpace,
            left: tooltipGapSpace,
            right: tooltipGapSpace,
            top: tooltipGapSpace,
            zIndex: 0,
          },
        },
      },
      className,
    ],
    content: [
      "ms-Tooltip-content",
      fonts.small,
      {
        position: "relative",
        zIndex: 1,
        color: darkMode === "dark" ? "#ffffff" : semanticColors.menuItemText,
        wordWrap: "break-word",
        overflowWrap: "break-word",
        overflow: "hidden",
      },
    ],
    subText: [
      "ms-Tooltip-subtext",
      {
        // Using inherit here to avoid unintentional global overrides of the <p> tag.
        fontSize: "12px",
        fontWeight: "300",
        color: "inherit",
        margin: 0,
      },
    ],
  };
};
//# sourceMappingURL=Tooltip.styles.js.map
