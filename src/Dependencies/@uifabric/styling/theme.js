import { __assign } from "tslib";
import { getWindow } from "../utilities/getWindow";
import { DefaultFontStyles } from "./DefaultFontStyles";
import { DefaultPalette } from "./DefaultPalette";
import { DefaultSpacing } from "./DefaultSpacing";
import { loadTheme as legacyLoadTheme } from "@microsoft/load-themed-styles";
import { DefaultEffects } from "./DefaultEffects";
import { merge } from "../utilities/merge";
import { Customizations } from "../utilities/customizations/Customizations";
var _theme = createTheme({
  palette: DefaultPalette,
  semanticColors: _makeSemanticColorsFromPalette(DefaultPalette, false, false),
  fonts: DefaultFontStyles,
  isInverted: false,
  disableGlobalClassNames: false,
});
var _onThemeChangeCallbacks = [];
export var ThemeSettingName = "theme";
export function initializeThemeInCustomizations() {
  var _a;
  var _b, _c;
  if (!Customizations.getSettings([ThemeSettingName]).theme) {
    var win = getWindow(); // tslint:disable-line:no-any
    if (
      (_c = (_b = win) === null || _b === void 0 ? void 0 : _b.FabricConfig) ===
        null || _c === void 0
        ? void 0
        : _c.theme
    ) {
      _theme = createTheme(win.FabricConfig.theme);
    }
    // Set the default theme.
    Customizations.applySettings(
      ((_a = {}), (_a[ThemeSettingName] = _theme), _a)
    );
  }
}
initializeThemeInCustomizations();
/**
 * Gets the theme object
 * @param depComments - Whether to include deprecated tags as comments for deprecated slots.
 */
export function getTheme(depComments) {
  if (depComments === void 0) {
    depComments = false;
  }
  if (depComments === true) {
    _theme = createTheme({}, depComments);
  }
  return _theme;
}
/**
 * Registers a callback that gets called whenever the theme changes.
 * This should only be used when the component cannot automatically get theme changes through its state.
 * This will not register duplicate callbacks.
 */
export function registerOnThemeChangeCallback(callback) {
  if (_onThemeChangeCallbacks.indexOf(callback) === -1) {
    _onThemeChangeCallbacks.push(callback);
  }
}
/**
 * See registerOnThemeChangeCallback().
 * Removes previously registered callbacks.
 */
export function removeOnThemeChangeCallback(callback) {
  var i = _onThemeChangeCallbacks.indexOf(callback);
  if (i === -1) {
    return;
  }
  _onThemeChangeCallbacks.splice(i, 1);
}
/**
 * Applies the theme, while filling in missing slots.
 * @param theme - Partial theme object.
 * @param depComments - Whether to include deprecated tags as comments for deprecated slots.
 */
export function loadTheme(theme, depComments) {
  var _a;
  if (depComments === void 0) {
    depComments = false;
  }
  _theme = createTheme(theme, depComments);
  // Invoke the legacy method of theming the page as well.
  legacyLoadTheme(
    __assign(
      __assign(
        __assign(__assign({}, _theme.palette), _theme.semanticColors),
        _theme.effects
      ),
      _loadFonts(_theme)
    )
  );
  Customizations.applySettings(
    ((_a = {}), (_a[ThemeSettingName] = _theme), _a)
  );
  _onThemeChangeCallbacks.forEach(function (callback) {
    try {
      callback(_theme);
    } catch (e) {
      // don't let a bad callback break everything else
    }
  });
  return _theme;
}
/**
 * Loads font variables into a JSON object.
 * @param theme - The theme object
 */
function _loadFonts(theme) {
  var lines = {};
  for (var _i = 0, _a = Object.keys(theme.fonts); _i < _a.length; _i++) {
    var fontName = _a[_i];
    var font = theme.fonts[fontName];
    for (var _b = 0, _c = Object.keys(font); _b < _c.length; _b++) {
      var propName = _c[_b];
      var name_1 =
        fontName + propName.charAt(0).toUpperCase() + propName.slice(1);
      var value = font[propName];
      if (propName === "fontSize" && typeof value === "number") {
        // if it's a number, convert it to px by default like our theming system does
        value = value + "px";
      }
      lines[name_1] = value;
    }
  }
  return lines;
}
/**
 * Creates a custom theme definition which can be used with the Customizer.
 * @param theme - Partial theme object.
 * @param depComments - Whether to include deprecated tags as comments for deprecated slots.
 */
export function createTheme(theme, depComments) {
  if (depComments === void 0) {
    depComments = false;
  }
  var newPalette = __assign(__assign({}, DefaultPalette), theme.palette);
  if (!theme.palette || !theme.palette.accent) {
    newPalette.accent = newPalette.themePrimary;
  }
  // mix in custom overrides with good slots first, since custom overrides might be used in fixing deprecated slots
  var newSemanticColors = __assign(
    __assign(
      {},
      _makeSemanticColorsFromPalette(
        newPalette,
        !!theme.isInverted,
        depComments
      )
    ),
    theme.semanticColors
  );
  var defaultFontStyles = __assign({}, DefaultFontStyles);
  if (theme.defaultFontStyle) {
    for (
      var _i = 0, _a = Object.keys(defaultFontStyles);
      _i < _a.length;
      _i++
    ) {
      var fontStyle = _a[_i];
      defaultFontStyles[fontStyle] = merge(
        {},
        defaultFontStyles[fontStyle],
        theme.defaultFontStyle
      );
    }
  }
  if (theme.fonts) {
    for (var _b = 0, _c = Object.keys(theme.fonts); _b < _c.length; _b++) {
      var fontStyle1 = _c[_b];
      defaultFontStyles[fontStyle1] = merge(
        {},
        defaultFontStyles[fontStyle1],
        theme.fonts[fontStyle1]
      );
    }
  }
  return {
    palette: newPalette,
    fonts: __assign({}, defaultFontStyles),
    rtl: theme.rtl,
    semanticColors: newSemanticColors,
    isInverted: !!theme.isInverted,
    disableGlobalClassNames: !!theme.disableGlobalClassNames,
    spacing: __assign(__assign({}, DefaultSpacing), theme.spacing),
    effects: __assign(__assign({}, DefaultEffects), theme.effects),
  };
}
// Generates all the semantic slot colors based on the Fabric palette.
// We'll use these as fallbacks for semantic slots that the passed in theme did not define.
function _makeSemanticColorsFromPalette(p, isInverted, depComments) {
  var toReturn = {
    // DEFAULTS
    bodyBackground: p.white,
    bodyBackgroundHovered: p.neutralLighter,
    bodyBackgroundChecked: p.neutralLight,
    bodyStandoutBackground: p.neutralLighterAlt,
    bodyFrameBackground: p.white,
    bodyFrameDivider: p.neutralLight,
    bodyText: p.neutralPrimary,
    bodyTextChecked: p.black,
    bodySubtext: p.neutralSecondary,
    bodyDivider: p.neutralLight,
    disabledBodyText: p.neutralTertiary,
    disabledBodySubtext: p.neutralTertiaryAlt,
    disabledBorder: p.neutralTertiaryAlt,
    focusBorder: p.neutralSecondary,
    variantBorder: p.neutralLight,
    variantBorderHovered: p.neutralTertiary,
    defaultStateBackground: p.neutralLighterAlt,
    // LINKS
    actionLink: p.neutralPrimary,
    actionLinkHovered: p.neutralDark,
    link: p.themePrimary,
    linkHovered: p.themeDarker,
    // BUTTONS
    buttonBackground: p.white,
    buttonBackgroundChecked: p.neutralTertiaryAlt,
    buttonBackgroundHovered: p.neutralLighter,
    buttonBackgroundCheckedHovered: p.neutralLight,
    buttonBackgroundPressed: p.neutralLight,
    buttonBackgroundDisabled: p.neutralLighter,
    buttonBorder: p.neutralSecondaryAlt,
    buttonText: p.neutralPrimary,
    buttonTextHovered: p.neutralDark,
    buttonTextChecked: p.neutralDark,
    buttonTextCheckedHovered: p.black,
    buttonTextPressed: p.neutralDark,
    buttonTextDisabled: p.neutralTertiary,
    buttonBorderDisabled: p.neutralLighter,
    primaryButtonBackground: p.themePrimary,
    primaryButtonBackgroundHovered: p.themeDarkAlt,
    primaryButtonBackgroundPressed: p.themeDark,
    primaryButtonBackgroundDisabled: p.neutralLighter,
    primaryButtonBorder: "transparent",
    primaryButtonText: p.white,
    primaryButtonTextHovered: p.white,
    primaryButtonTextPressed: p.white,
    primaryButtonTextDisabled: p.neutralQuaternary,
    accentButtonBackground: p.accent,
    accentButtonText: p.white,
    // INPUTS
    inputBorder: p.neutralSecondary,
    inputBorderHovered: p.neutralPrimary,
    inputBackground: p.white,
    inputBackgroundChecked: p.themePrimary,
    inputBackgroundCheckedHovered: p.themeDark,
    inputPlaceholderBackgroundChecked: p.themeLighter,
    inputForegroundChecked: p.white,
    inputIcon: p.themePrimary,
    inputIconHovered: p.themeDark,
    inputIconDisabled: p.neutralTertiary,
    inputFocusBorderAlt: p.themePrimary,
    smallInputBorder: p.neutralSecondary,
    inputText: p.neutralPrimary,
    inputTextHovered: p.neutralDark,
    inputPlaceholderText: p.neutralSecondary,
    disabledBackground: p.neutralLighter,
    disabledText: p.neutralTertiary,
    disabledSubtext: p.neutralQuaternary,
    // LISTS
    listBackground: p.white,
    listText: p.neutralPrimary,
    listItemBackgroundHovered: p.neutralLighter,
    listItemBackgroundChecked: p.neutralLight,
    listItemBackgroundCheckedHovered: p.neutralQuaternaryAlt,
    listHeaderBackgroundHovered: p.neutralLighter,
    listHeaderBackgroundPressed: p.neutralLight,
    // MENUS
    menuBackground: p.white,
    menuDivider: p.neutralTertiaryAlt,
    menuIcon: p.themePrimary,
    menuHeader: p.themePrimary,
    menuItemBackgroundHovered: p.neutralLighter,
    menuItemBackgroundPressed: p.neutralLight,
    menuItemText: p.neutralPrimary,
    menuItemTextHovered: p.neutralDark,
    errorText: !isInverted ? "#a4262c" : "#F1707B",
    messageText: !isInverted ? "#323130" : "#F3F2F1",
    messageLink: !isInverted ? "#005A9E" : "#6CB8F6",
    messageLinkHovered: !isInverted ? "#004578" : "#82C7FF",
    infoIcon: !isInverted ? "#605e5c" : "#C8C6C4",
    errorIcon: !isInverted ? "#A80000" : "#F1707B",
    blockingIcon: !isInverted ? "#FDE7E9" : "#442726",
    warningIcon: !isInverted ? "#797775" : "#C8C6C4",
    severeWarningIcon: !isInverted ? "#D83B01" : "#FCE100",
    successIcon: !isInverted ? "#107C10" : "#92C353",
    infoBackground: !isInverted ? "#f3f2f1" : "#323130",
    errorBackground: !isInverted ? "#FDE7E9" : "#442726",
    blockingBackground: !isInverted ? "#FDE7E9" : "#442726",
    warningBackground: !isInverted ? "#FFF4CE" : "#433519",
    severeWarningBackground: !isInverted ? "#FED9CC" : "#4F2A0F",
    successBackground: !isInverted ? "#DFF6DD" : "#393D1B",
    // Deprecated slots, second pass by _fixDeprecatedSlots() later for self-referential slots
    warningHighlight: !isInverted ? "#ffb900" : "#fff100",
    warningText: "",
    successText: !isInverted ? "#107C10" : "#92c353",
    listTextColor: "",
    menuItemBackgroundChecked: p.neutralLight,
  };
  return _fixDeprecatedSlots(toReturn, depComments);
}
function _fixDeprecatedSlots(s, depComments) {
  // Add @deprecated tag as comment if enabled
  var dep = "";
  if (depComments === true) {
    dep = " /* @deprecated */";
  }
  // tslint:disable-next-line:deprecation
  s.listTextColor = s.listText + dep;
  // tslint:disable-next-line:deprecation
  s.menuItemBackgroundChecked += dep;
  // tslint:disable-next-line:deprecation
  s.warningHighlight += dep;
  // tslint:disable-next-line:deprecation
  s.warningText = s.messageText + dep;
  // tslint:disable-next-line:deprecation
  s.successText += dep;
  return s;
}
//# sourceMappingURL=theme.js.map
