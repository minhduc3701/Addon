import * as React from 'react';
import { DefaultButton, Callout, DirectionalHint, Dropdown, mergeStyleSets, FontWeights, Text, } from 'office-ui-fabric-react';
import { useBoolean } from '@uifabric/react-hooks';
var DIRECTION_OPTIONS = [
    { key: DirectionalHint.topLeftEdge, text: 'Top Left Edge' },
    { key: DirectionalHint.topCenter, text: 'Top Center' },
    { key: DirectionalHint.topRightEdge, text: 'Top Right Edge' },
    { key: DirectionalHint.topAutoEdge, text: 'Top Auto Edge' },
    { key: DirectionalHint.bottomLeftEdge, text: 'Bottom Left Edge' },
    { key: DirectionalHint.bottomCenter, text: 'Bottom Center' },
    { key: DirectionalHint.bottomRightEdge, text: 'Bottom Right Edge' },
    { key: DirectionalHint.bottomAutoEdge, text: 'Bottom Auto Edge' },
    { key: DirectionalHint.leftTopEdge, text: 'Left Top Edge' },
    { key: DirectionalHint.leftCenter, text: 'Left Center' },
    { key: DirectionalHint.leftBottomEdge, text: 'Left Bottom Edge' },
    { key: DirectionalHint.rightTopEdge, text: 'Right Top Edge' },
    { key: DirectionalHint.rightCenter, text: 'Right Center' },
    { key: DirectionalHint.rightBottomEdge, text: 'Right Bottom Edge' },
];
var styles = mergeStyleSets({
    buttonArea: {
        verticalAlign: 'top',
        display: 'inline-block',
        textAlign: 'center',
        margin: '0 100px',
        minWidth: 130,
        height: 32,
    },
    configArea: {
        minWidth: '300px',
        display: 'inline-block',
    },
    callout: {
        maxWidth: 300,
    },
    header: {
        padding: '18px 24px 12px',
    },
    title: [
        {
            margin: 0,
            fontWeight: FontWeights.semilight,
        },
    ],
    inner: {
        height: '100%',
        padding: '0 24px 20px',
    },
});
export var CalloutCoverExample = function () {
    var _a = useBoolean(false), isCalloutVisible = _a[0], toggleIsCalloutVisible = _a[1].toggle;
    var _b = React.useState(DirectionalHint.bottomLeftEdge), directionalHint = _b[0], setDirectionalHint = _b[1];
    var onDirectionalChanged = function (event, option) {
        setDirectionalHint(option.key);
    };
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: styles.configArea },
            React.createElement(Dropdown, { label: "Directional hint", selectedKey: directionalHint, options: DIRECTION_OPTIONS, onChange: onDirectionalChanged })),
        React.createElement("div", { className: styles.buttonArea },
            React.createElement(DefaultButton, { text: isCalloutVisible ? 'Hide callout' : 'Show callout', onClick: toggleIsCalloutVisible })),
        isCalloutVisible ? (React.createElement(Callout, { className: styles.callout, onDismiss: toggleIsCalloutVisible, target: "." + styles.buttonArea, directionalHint: directionalHint, coverTarget: true, isBeakVisible: false, gapSpace: 0, setInitialFocus: true },
            React.createElement("div", { className: styles.header },
                React.createElement(Text, { className: styles.title }, "I'm covering the target!")),
            React.createElement("div", { className: styles.inner },
                React.createElement(DefaultButton, { onClick: toggleIsCalloutVisible, text: "Click to dismiss" })))) : null));
};
//# sourceMappingURL=Callout.Cover.Example.js.map