import { __assign } from "tslib";
import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { DefaultButton, IconButton } from 'office-ui-fabric-react/lib/Button';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { Callout } from 'office-ui-fabric-react/lib/Callout';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { Text } from 'office-ui-fabric-react/lib/Text';
import { memoizeFunction } from 'office-ui-fabric-react/lib/Utilities';
import { getTheme, FontWeights } from 'office-ui-fabric-react/lib/Styling';
import { useBoolean, useId } from '@uifabric/react-hooks';
var stackTokens = {
    childrenGap: 4,
    maxWidth: 300,
};
var labelCalloutStackStyles = { root: { padding: 20 } };
var iconButtonStyles = { root: { marginBottom: -3 } };
var iconStyles = { root: { marginBottom: -3 } };
var iconProps = { iconName: 'Info' };
var getDescriptionStyles = memoizeFunction(function (theme) { return ({
    root: { color: theme.palette.green, fontWeight: FontWeights.bold },
}); });
var onRenderDescription = function (props) {
    var theme = getTheme();
    return (React.createElement(Text, { variant: "small", styles: getDescriptionStyles(theme) }, props.description));
};
var onWrapDefaultLabelRenderer = function (props, defaultRender) {
    return (React.createElement(React.Fragment, null,
        React.createElement(Stack, { horizontal: true, verticalAlign: "center", tokens: stackTokens },
            React.createElement("span", null, defaultRender(props)),
            React.createElement(Icon, { iconName: "Globe", title: "Globe", ariaLabel: "Globe", styles: iconStyles }))));
};
var CustomLabel = function (props) {
    var _a = useBoolean(false), isCalloutVisible = _a[0], toggleIsCalloutVisible = _a[1].toggle;
    var descriptionId = useId('description');
    var iconButtonId = useId('iconButton');
    return (React.createElement(React.Fragment, null,
        React.createElement(Stack, { horizontal: true, verticalAlign: "center", tokens: stackTokens },
            React.createElement("span", { id: props.id }, props.label),
            React.createElement(IconButton, { id: iconButtonId, iconProps: iconProps, title: "Info", ariaLabel: "Info", onClick: toggleIsCalloutVisible, styles: iconButtonStyles })),
        isCalloutVisible && (React.createElement(Callout, { target: '#' + iconButtonId, setInitialFocus: true, onDismiss: toggleIsCalloutVisible, ariaDescribedBy: descriptionId, role: "alertdialog" },
            React.createElement(Stack, { tokens: stackTokens, horizontalAlign: "start", styles: labelCalloutStackStyles },
                React.createElement("span", { id: descriptionId }, "The custom label includes an IconButton that displays this Callout on click."),
                React.createElement(DefaultButton, { onClick: toggleIsCalloutVisible }, "Close"))))));
};
export var TextFieldCustomRenderExample = function () {
    var labelId = useId('label');
    var onRenderLabel = function (props) { return React.createElement(CustomLabel, __assign({ id: labelId }, props)); };
    return (React.createElement(Stack, { tokens: stackTokens },
        React.createElement(TextField, { "aria-labelledby": labelId, label: "Custom label rendering", onRenderLabel: onRenderLabel, description: "Click the (i) icon!" }),
        React.createElement(TextField, { label: "Wrapping default label renderer", onRenderLabel: onWrapDefaultLabelRenderer }),
        React.createElement(TextField, { label: "Custom description rendering", description: "A colorful description!", onRenderDescription: onRenderDescription })));
};
//# sourceMappingURL=TextField.CustomRender.Example.js.map