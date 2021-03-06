import { __assign } from "tslib";
import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { useBoolean } from '@uifabric/react-hooks';
import { lorem } from '@uifabric/example-data';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
var stackStyles = { root: { width: 650 } };
var stackTokens = { childrenGap: 50 };
var dummyText = lorem(100);
var columnProps = {
    tokens: { childrenGap: 15 },
    styles: { root: { width: 300 } },
};
export var TextFieldMultilineExample = function () {
    var _a = useBoolean(false), multiline = _a[0], toggleMultiline = _a[1].toggle;
    var onChange = function (ev, newText) {
        var newMultiline = newText.length > 50;
        if (newMultiline !== multiline) {
            toggleMultiline();
        }
    };
    return (React.createElement(Stack, { horizontal: true, tokens: stackTokens, styles: stackStyles },
        React.createElement(Stack, __assign({}, columnProps),
            React.createElement(TextField, { label: "Standard", multiline: true, rows: 3 }),
            React.createElement(TextField, { label: "Disabled", multiline: true, rows: 3, disabled: true, defaultValue: dummyText }),
            React.createElement(TextField, { label: "Non-resizable", multiline: true, resizable: false })),
        React.createElement(Stack, __assign({}, columnProps),
            React.createElement(TextField, { label: "With auto adjusting height", multiline: true, autoAdjustHeight: true }),
            React.createElement(TextField, { label: "Switches from single to multiline if more than 50 characters are entered", multiline: multiline, onChange: onChange }))));
};
//# sourceMappingURL=TextField.Multiline.Example.js.map