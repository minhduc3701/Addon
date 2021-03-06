export var HighContrastSelector =
  "@media screen and (-ms-high-contrast: active)";
export var HighContrastSelectorWhite =
  "@media screen and (-ms-high-contrast: black-on-white)";
export var HighContrastSelectorBlack =
  "@media screen and (-ms-high-contrast: white-on-black)";
export var EdgeChromiumHighContrastSelector =
  "@media screen and (-ms-high-contrast: active) and (forced-colors: active)";
export var ScreenWidthMinSmall = 320;
export var ScreenWidthMinMedium = 480;
export var ScreenWidthMinLarge = 640;
export var ScreenWidthMinXLarge = 1024;
export var ScreenWidthMinXXLarge = 1366;
export var ScreenWidthMinXXXLarge = 1920;
export var ScreenWidthMaxSmall = ScreenWidthMinMedium - 1;
export var ScreenWidthMaxMedium = ScreenWidthMinLarge - 1;
export var ScreenWidthMaxLarge = ScreenWidthMinXLarge - 1;
export var ScreenWidthMaxXLarge = ScreenWidthMinXXLarge - 1;
export var ScreenWidthMaxXXLarge = ScreenWidthMinXXXLarge - 1;
export var ScreenWidthMinUhfMobile = 768;
export function getScreenSelector(min, max) {
  return (
    "@media only screen and (min-width: " +
    min +
    "px) and (max-width: " +
    max +
    "px)"
  );
}
/**
 * The style which turns off high contrast adjustment in (only) Edge Chromium browser.
 */
export function getEdgeChromiumNoHighContrastAdjustSelector() {
  var _a;
  return (
    (_a = {}),
    (_a[EdgeChromiumHighContrastSelector] = {
      forcedColorAdjust: "none",
    }),
    _a
  );
}
//# sourceMappingURL=CommonStyles.js.map
