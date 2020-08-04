import {
  AnimationClassNames,
  getGlobalClassNames,
  getInputFocusStyle,
  HighContrastSelector,
  normalize,
  getPlaceholderStyles,
  IconFontSizes,
} from "../@uifabric/styling";
var globalClassNames = {
  root: "ms-TextField",
  description: "ms-TextField-description",
  errorMessage: "ms-TextField-errorMessage",
  field: "ms-TextField-field",
  fieldGroup: "ms-TextField-fieldGroup",
  prefix: "ms-TextField-prefix",
  suffix: "ms-TextField-suffix",
  wrapper: "ms-TextField-wrapper",
  multiline: "ms-TextField--multiline",
  borderless: "ms-TextField--borderless",
  underlined: "ms-TextField--underlined",
  unresizable: "ms-TextField--unresizable",
  required: "is-required",
  disabled: "is-disabled",
  active: "is-active",
};
function getLabelStyles(props) {
  var underlined = props.underlined,
    disabled = props.disabled,
    focused = props.focused,
    theme = props.theme;
  var palette = theme.palette,
    fonts = theme.fonts;
  return function () {
    var _a;
    return {
      root: [
        underlined &&
          disabled && {
            color: palette.neutralTertiary,
          },
        underlined && {
          fontSize: fonts.medium.fontSize,
          marginRight: 8,
          paddingLeft: 12,
          paddingRight: 0,
          lineHeight: "22px",
          height: 32,
        },
        underlined &&
          focused && {
            selectors:
              ((_a = {}),
              (_a[HighContrastSelector] = {
                height: 31,
              }),
              _a),
          },
      ],
    };
  };
}
export function getStyles(props) {
  var _a, _b, _c, _d, _e, _f, _g;
  var theme = props.theme,
    className = props.className,
    disabled = props.disabled,
    focused = props.focused,
    required = props.required,
    multiline = props.multiline,
    hasLabel = props.hasLabel,
    borderless = props.borderless,
    underlined = props.underlined,
    hasIcon = props.hasIcon,
    resizable = props.resizable,
    hasErrorMessage = props.hasErrorMessage,
    inputClassName = props.inputClassName,
    autoAdjustHeight = props.autoAdjustHeight;
  var semanticColors = theme.semanticColors,
    effects = theme.effects,
    fonts = theme.fonts;
  var classNames = getGlobalClassNames(globalClassNames, theme);
  var fieldPrefixSuffix = {
    // Suffix/Prefix are not editable so the disabled slot perfectly fits.
    background: semanticColors.disabledBackground,
    color: !disabled
      ? semanticColors.inputPlaceholderText
      : semanticColors.disabledText,
    display: "flex",
    alignItems: "center",
    padding: "0 10px",
    lineHeight: 1,
    whiteSpace: "nowrap",
    flexShrink: 0,
  };
  // placeholder style constants
  var placeholderStyles = [
    fonts.medium,
    {
      color: semanticColors.inputPlaceholderText,
      opacity: 1,
    },
  ];
  var disabledPlaceholderStyles = {
    color: semanticColors.disabledText,
  };
  return {
    root: [
      classNames.root,
      fonts.medium,
      required && classNames.required,
      disabled && classNames.disabled,
      focused && classNames.active,
      multiline && classNames.multiline,
      borderless && classNames.borderless,
      underlined && classNames.underlined,
      normalize,
      {
        position: "relative",
      },
      className,
    ],
    wrapper: [
      classNames.wrapper,
      underlined && [
        {
          display: "flex",
          borderBottom:
            "1px solid " +
            (!hasErrorMessage
              ? semanticColors.inputBorder
              : semanticColors.errorText),
          width: "100%",
        },
        disabled && {
          borderBottomColor: semanticColors.disabledBackground,
          selectors:
            ((_a = {}),
            (_a[HighContrastSelector] = {
              borderColor: "GrayText",
            }),
            _a),
        },
        !disabled && {
          selectors: {
            ":hover": {
              borderBottomColor: !hasErrorMessage
                ? semanticColors.inputBorderHovered
                : semanticColors.errorText,
              selectors:
                ((_b = {}),
                (_b[HighContrastSelector] = {
                  borderBottomColor: "Highlight",
                }),
                _b),
            },
          },
        },
        focused && [
          {
            position: "relative",
          },
          getInputFocusStyle(
            !hasErrorMessage
              ? semanticColors.inputFocusBorderAlt
              : semanticColors.errorText,
            0,
            "borderBottom"
          ),
        ],
      ],
    ],
    fieldGroup: [
      classNames.fieldGroup,
      normalize,
      {
        border: "1px solid " + semanticColors.inputBorder,
        borderRadius: effects.roundedCorner2,
        background: semanticColors.inputBackground,
        cursor: "text",
        height: 32,
        display: "flex",
        flexDirection: "row",
        alignItems: "stretch",
        position: "relative",
      },
      multiline && {
        minHeight: "60px",
        height: "auto",
        display: "flex",
      },
      !focused &&
        !disabled && {
          selectors: {
            ":hover": {
              borderColor: semanticColors.inputBorderHovered,
              selectors:
                ((_c = {}),
                (_c[HighContrastSelector] = {
                  borderColor: "Highlight",
                }),
                _c),
            },
          },
        },
      focused &&
        !underlined &&
        getInputFocusStyle(
          !hasErrorMessage
            ? semanticColors.inputFocusBorderAlt
            : semanticColors.errorText,
          effects.roundedCorner2
        ),
      disabled && {
        borderColor: semanticColors.disabledBackground,
        selectors:
          ((_d = {}),
          (_d[HighContrastSelector] = {
            borderColor: "GrayText",
          }),
          _d),
        cursor: "default",
      },
      borderless && {
        border: "none",
      },
      borderless &&
        focused && {
          border: "none",
          selectors: {
            ":after": {
              border: "none",
            },
          },
        },
      underlined && {
        flex: "1 1 0px",
        border: "none",
        textAlign: "left",
      },
      underlined &&
        disabled && {
          backgroundColor: "transparent",
        },
      hasErrorMessage &&
        !underlined && {
          borderColor: semanticColors.errorText,
          selectors: {
            "&:hover": {
              borderColor: semanticColors.errorText,
            },
          },
        },
      !hasLabel &&
        required && {
          selectors:
            ((_e = {
              ":before": {
                content: "'*'",
                color: semanticColors.errorText,
                position: "absolute",
                top: -5,
                right: -10,
              },
            }),
            (_e[HighContrastSelector] = {
              selectors: {
                ":before": {
                  right: -14,
                },
              },
            }),
            _e),
        },
    ],
    field: [
      fonts.medium,
      classNames.field,
      normalize,
      {
        borderRadius: 0,
        border: "none",
        background: "none",
        backgroundColor: "transparent",
        color: semanticColors.inputText,
        padding: "0 8px",
        width: "100%",
        minWidth: 0,
        textOverflow: "ellipsis",
        outline: 0,
        selectors: {
          "&:active, &:focus, &:hover": { outline: 0 },
          "::-ms-clear": {
            display: "none",
          },
        },
      },
      getPlaceholderStyles(placeholderStyles),
      multiline &&
        !resizable && [
          classNames.unresizable,
          {
            resize: "none",
          },
        ],
      multiline && {
        minHeight: "inherit",
        lineHeight: 17,
        flexGrow: 1,
        paddingTop: 6,
        paddingBottom: 6,
        overflow: "auto",
        width: "100%",
      },
      multiline &&
        autoAdjustHeight && {
          overflow: "hidden",
        },
      hasIcon && {
        paddingRight: 24,
      },
      multiline &&
        hasIcon && {
          paddingRight: 40,
        },
      disabled && [
        {
          backgroundColor: semanticColors.disabledBackground,
          color: semanticColors.disabledText,
          borderColor: semanticColors.disabledBackground,
        },
        getPlaceholderStyles(disabledPlaceholderStyles),
      ],
      underlined && {
        textAlign: "left",
      },
      focused &&
        !borderless && {
          selectors:
            ((_f = {}),
            (_f[HighContrastSelector] = {
              paddingLeft: 11,
              paddingRight: 11,
            }),
            _f),
        },
      focused &&
        multiline &&
        !borderless && {
          selectors:
            ((_g = {}),
            (_g[HighContrastSelector] = {
              paddingTop: 4,
            }),
            _g),
        },
      inputClassName,
    ],
    icon: [
      multiline && {
        paddingRight: 24,
        alignItems: "flex-end",
      },
      {
        pointerEvents: "none",
        position: "absolute",
        bottom: 6,
        right: 8,
        top: "auto",
        fontSize: IconFontSizes.medium,
        lineHeight: 18,
      },
      disabled && {
        color: semanticColors.disabledText,
      },
    ],
    description: [
      classNames.description,
      {
        color: semanticColors.bodySubtext,
        fontSize: fonts.xSmall.fontSize,
      },
    ],
    errorMessage: [
      classNames.errorMessage,
      AnimationClassNames.slideDownIn20,
      fonts.small,
      {
        color: semanticColors.errorText,
        margin: 0,
        paddingTop: 5,
        display: "flex",
        alignItems: "center",
      },
    ],
    prefix: [classNames.prefix, fieldPrefixSuffix],
    suffix: [classNames.suffix, fieldPrefixSuffix],
    subComponentStyles: {
      label: getLabelStyles(props),
    },
  };
}
//# sourceMappingURL=TextField.styles.js.map
