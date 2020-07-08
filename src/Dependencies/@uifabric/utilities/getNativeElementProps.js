import { labelProperties, audioProperties, videoProperties, olProperties, liProperties, anchorProperties, buttonProperties, inputProperties, textAreaProperties, selectProperties, optionProperties, tableProperties, trProperties, thProperties, tdProperties, colGroupProperties, colProperties, formProperties, iframeProperties, imgProperties, htmlElementProperties, getNativeProps, } from './properties';
var nativeElementMap = {
    label: labelProperties,
    audio: audioProperties,
    video: videoProperties,
    ol: olProperties,
    li: liProperties,
    a: anchorProperties,
    button: buttonProperties,
    input: inputProperties,
    textarea: textAreaProperties,
    select: selectProperties,
    option: optionProperties,
    table: tableProperties,
    tr: trProperties,
    th: thProperties,
    td: tdProperties,
    colGroup: colGroupProperties,
    col: colProperties,
    form: formProperties,
    iframe: iframeProperties,
    img: imgProperties,
};
/**
 * Given an element tagname and user props, filters the props to only allowed props for the given
 * element type.
 * @param tagName - Tag name (e.g. "div")
 * @param props - Props object
 * @param excludedPropNames - List of props to disallow
 */
// tslint:disable-next-line:no-any
export function getNativeElementProps(tagName, props, excludedPropNames) {
    var allowedPropNames = (tagName && nativeElementMap[tagName]) || htmlElementProperties;
    return getNativeProps(props, allowedPropNames, excludedPropNames);
}
//# sourceMappingURL=getNativeElementProps.js.map