import { filteredAssign } from "./object";
/**
 * An array of events that are allowed on every html element type.
 *
 * @public
 */
export var baseElementEvents = [
  "onCopy",
  "onCut",
  "onPaste",
  "onCompositionEnd",
  "onCompositionStart",
  "onCompositionUpdate",
  "onFocus",
  "onFocusCapture",
  "onBlur",
  "onBlurCapture",
  "onChange",
  "onInput",
  "onSubmit",
  "onLoad",
  "onError",
  "onKeyDown",
  "onKeyDownCapture",
  "onKeyPress",
  "onKeyUp",
  "onAbort",
  "onCanPlay",
  "onCanPlayThrough",
  "onDurationChange",
  "onEmptied",
  "onEncrypted",
  "onEnded",
  "onLoadedData",
  "onLoadedMetadata",
  "onLoadStart",
  "onPause",
  "onPlay",
  "onPlaying",
  "onProgress",
  "onRateChange",
  "onSeeked",
  "onSeeking",
  "onStalled",
  "onSuspend",
  "onTimeUpdate",
  "onVolumeChange",
  "onWaiting",
  "onClick",
  "onClickCapture",
  "onContextMenu",
  "onDoubleClick",
  "onDrag",
  "onDragEnd",
  "onDragEnter",
  "onDragExit",
  "onDragLeave",
  "onDragOver",
  "onDragStart",
  "onDrop",
  "onMouseDown",
  "onMouseDownCapture",
  "onMouseEnter",
  "onMouseLeave",
  "onMouseMove",
  "onMouseOut",
  "onMouseOver",
  "onMouseUp",
  "onMouseUpCapture",
  "onSelect",
  "onTouchCancel",
  "onTouchEnd",
  "onTouchMove",
  "onTouchStart",
  "onScroll",
  "onWheel",
  "onPointerCancel",
  "onPointerDown",
  "onPointerEnter",
  "onPointerLeave",
  "onPointerMove",
  "onPointerOut",
  "onPointerOver",
  "onPointerUp",
  "onGotPointerCapture",
  "onLostPointerCapture",
];
/**
 * An array of element attributes which are allowed on every html element type.
 *
 * @public
 */
export var baseElementProperties = [
  "accessKey",
  "children",
  "className",
  "contentEditable",
  "dir",
  "draggable",
  "hidden",
  "htmlFor",
  "id",
  "lang",
  "role",
  "style",
  "tabIndex",
  "title",
  "translate",
  "spellCheck",
  "name",
];
/**
 * An array of HTML element properties and events.
 *
 * @public
 */
export var htmlElementProperties = baseElementProperties.concat(
  baseElementEvents
);
/**
 * An array of LABEL tag properties and events.
 *
 * @public
 */
export var labelProperties = htmlElementProperties.concat(["form"]);
/**
 * An array of AUDIO tag properties and events.
 *
 * @public
 */
export var audioProperties = htmlElementProperties.concat([
  "height",
  "loop",
  "muted",
  "preload",
  "src",
  "width",
]);
/**
 * An array of VIDEO tag properties and events.
 *
 * @public
 */
export var videoProperties = audioProperties.concat(["poster"]);
/**
 * An array of OL tag properties and events.
 *
 * @public
 */
export var olProperties = htmlElementProperties.concat(["start"]);
/**
 * An array of LI tag properties and events.
 *
 * @public
 */
export var liProperties = htmlElementProperties.concat(["value"]);
/**
 * An array of A tag properties and events.
 *
 * @public
 */
export var anchorProperties = htmlElementProperties.concat([
  "download",
  "href",
  "hrefLang",
  "media",
  "rel",
  "target",
  "type",
]);
/**
 * An array of BUTTON tag properties and events.
 *
 * @public
 */
export var buttonProperties = htmlElementProperties.concat([
  "autoFocus",
  "disabled",
  "form",
  "formAction",
  "formEncType",
  "formMethod",
  "formNoValidate",
  "formTarget",
  "type",
  "value",
]);
/**
 * An array of INPUT tag properties and events.
 *
 * @public
 */
export var inputProperties = buttonProperties.concat([
  "accept",
  "alt",
  "autoCapitalize",
  "autoComplete",
  "checked",
  "dirname",
  "form",
  "height",
  "inputMode",
  "list",
  "max",
  "maxLength",
  "min",
  "multiple",
  "pattern",
  "placeholder",
  "readOnly",
  "required",
  "src",
  "step",
  "size",
  "type",
  "value",
  "width",
]);
/**
 * An array of TEXTAREA tag properties and events.
 *
 * @public
 */
export var textAreaProperties = buttonProperties.concat([
  "autoCapitalize",
  "cols",
  "dirname",
  "form",
  "maxLength",
  "placeholder",
  "readOnly",
  "required",
  "rows",
  "wrap",
]);
/**
 * An array of SELECT tag properties and events.
 *
 * @public
 */
export var selectProperties = buttonProperties.concat([
  "form",
  "multiple",
  "required",
]);
export var optionProperties = htmlElementProperties.concat([
  "selected",
  "value",
]);
/**
 * An array of TABLE tag properties and events.
 *
 * @public
 */
export var tableProperties = htmlElementProperties.concat([
  "cellPadding",
  "cellSpacing",
]);
/**
 * An array of TR tag properties and events.
 *
 * @public
 */
export var trProperties = htmlElementProperties;
/**
 * An array of TH tag properties and events.
 *
 * @public
 */
export var thProperties = htmlElementProperties.concat(["rowSpan", "scope"]);
/**
 * An array of TD tag properties and events.
 *
 * @public
 */
export var tdProperties = htmlElementProperties.concat([
  "colSpan",
  "headers",
  "rowSpan",
  "scope",
]);
export var colGroupProperties = htmlElementProperties.concat(["span"]);
export var colProperties = htmlElementProperties.concat(["span"]);
/**
 * An array of FORM tag properties and events.
 *
 * @public
 */
export var formProperties = htmlElementProperties.concat([
  "acceptCharset",
  "action",
  "encType",
  "encType",
  "method",
  "noValidate",
  "target",
]);
/**
 * An array of IFRAME tag properties and events.
 *
 * @public
 */
export var iframeProperties = htmlElementProperties.concat([
  "allow",
  "allowFullScreen",
  "allowPaymentRequest",
  "allowTransparency",
  "csp",
  "height",
  "importance",
  "referrerPolicy",
  "sandbox",
  "src",
  "srcDoc",
  "width",
]);
/**
 * An array of IMAGE tag properties and events.
 *
 * @public
 */
export var imgProperties = htmlElementProperties.concat([
  "alt",
  "crossOrigin",
  "height",
  "src",
  "srcSet",
  "useMap",
  "width",
]);
/**
 * @deprecated Use imgProperties for img elements.
 */
export var imageProperties = imgProperties;
/**
 * An array of DIV tag properties and events.
 *
 * @public
 */
export var divProperties = htmlElementProperties;
/**
 * Gets native supported props for an html element provided the allowance set. Use one of the property
 * sets defined (divProperties, buttonPropertes, etc) to filter out supported properties from a given
 * props set. Note that all data- and aria- prefixed attributes will be allowed.
 * NOTE: getNativeProps should always be applied first when adding props to a react component. The
 * non-native props should be applied second. This will prevent getNativeProps from overriding your custom props.
 * For example, if props passed to getNativeProps has an onClick function and getNativeProps is added to
 * the component after an onClick function is added, then the getNativeProps onClick will override it.
 *
 * @public
 * @param props - The unfiltered input props
 * @param allowedPropsNames-  The array of allowed propnames.
 * @returns The filtered props
 */
export function getNativeProps(props, allowedPropNames, excludedPropNames) {
  // It'd be great to properly type this while allowing 'aria-` and 'data-' attributes like TypeScript does for
  // JSX attributes, but that ability is hardcoded into the TS compiler with no analog in TypeScript typings.
  // Then we'd be able to enforce props extends native props (including aria- and data- attributes), and then
  // return native props.
  // We should be able to do this once this PR is merged: https://github.com/microsoft/TypeScript/pull/26797
  return filteredAssign(
    function (propName) {
      return (
        (!excludedPropNames || excludedPropNames.indexOf(propName) < 0) &&
        (propName.indexOf("data-") === 0 ||
          propName.indexOf("aria-") === 0 ||
          allowedPropNames.indexOf(propName) >= 0)
      );
    },
    {},
    props
  );
}
//# sourceMappingURL=properties.js.map
