import * as React from 'react';
import { DefaultButton, Callout, DirectionalHint, Dropdown, Checkbox, Slider, getTheme, mergeStyleSets, FontWeights, Link, Text, } from 'office-ui-fabric-react';
import { useBoolean, useId } from '@uifabric/react-hooks';
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
var theme = getTheme();
var checkBoxStyles = { root: { margin: '10px 0' } };
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
    calloutExampleButton: {
        width: '100%',
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
    subtext: [
        {
            margin: 0,
            fontWeight: FontWeights.semilight,
        },
    ],
    link: [
        theme.fonts.medium,
        {
            color: theme.palette.neutralPrimary,
        },
    ],
    actions: {
        position: 'relative',
        marginTop: 20,
        width: '100%',
        whiteSpace: 'nowrap',
    },
});
export var CalloutDirectionalExample = function () {
    var _a = useBoolean(false), isCalloutVisible = _a[0], toggleIsCalloutVisible = _a[1].toggle;
    var _b = useBoolean(true), isBeakVisible = _b[0], toggleIsBeakVisible = _b[1].toggle;
    var _c = React.useState(), gapSpace = _c[0], setGapSpace = _c[1];
    var _d = React.useState(), beakWidth = _d[0], setBeakWidth = _d[1];
    var labelId = useId('callout-label');
    var descriptionId = useId('callout-description');
    var _e = React.useState(DirectionalHint.bottomLeftEdge), directionalHint = _e[0], setDirectionalHint = _e[1];
    var onDirectionalChanged = function (event, option) {
        setDirectionalHint(option.key);
    };
    var onGapSlider = function (value) {
        setGapSpace(value);
    };
    var onBeakWidthSlider = function (value) {
        setBeakWidth(value);
    };
    var onShowBeakChange = function () {
        toggleIsBeakVisible();
        setBeakWidth(10);
    };
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: styles.configArea },
            React.createElement(Checkbox, { styles: checkBoxStyles, label: "Show beak", checked: isBeakVisible, onChange: onShowBeakChange }),
            React.createElement(Slider, { max: 30, label: "Gap Space", min: 0, defaultValue: 0, onChange: onGapSlider }),
            isBeakVisible && (React.createElement(Slider, { max: 50, label: "Beak Width", min: 10, defaultValue: 16, onChange: onBeakWidthSlider })),
            React.createElement(Dropdown, { label: "Directional hint", selectedKey: directionalHint, options: DIRECTION_OPTIONS, onChange: onDirectionalChanged })),
        React.createElement("div", { className: styles.buttonArea },
            React.createElement(DefaultButton, { className: styles.calloutExampleButton, onClick: toggleIsCalloutVisible, text: isCalloutVisible ? 'Hide callout' : 'Show callout' })),
        isCalloutVisible ? (React.createElement(Callout, { ariaLabelledBy: labelId, ariaDescribedBy: descriptionId, className: styles.callout, gapSpace: gapSpace, target: "." + styles.buttonArea, isBeakVisible: isBeakVisible, beakWidth: beakWidth, onDismiss: toggleIsCalloutVisible, directionalHint: directionalHint, setInitialFocus: true },
            React.createElement("div", { className: styles.header },
                React.createElement(Text, { className: styles.title, id: labelId }, "All of your favorite people")),
            React.createElement("div", { className: styles.inner },
                React.createElement(Text, { className: styles.subtext, id: descriptionId }, "Message body is optional. If help documentation is available, consider adding a link to learn more at the bottom."),
                React.createElement("div", { className: styles.actions },
                    React.createElement(Link, { className: styles.link, href: "http://microsoft.com", target: "_blank" }, "Go to Microsoft"))))) : null));
};
//# sourceMappingURL=Callout.Directional.Example.js.map