import * as React from 'react';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
var stackTokens = { childrenGap: 10 };
export var ToggleBasicExample = function () {
    return (React.createElement(Stack, { tokens: stackTokens },
        React.createElement(Toggle, { label: "Enabled and checked", defaultChecked: true, onText: "On", offText: "Off", onChange: _onChange }),
        React.createElement(Toggle, { label: "Enabled and unchecked", onText: "On", offText: "Off", onChange: _onChange }),
        React.createElement(Toggle, { label: "Disabled and checked", defaultChecked: true, disabled: true, onText: "On", offText: "Off" }),
        React.createElement(Toggle, { label: "Disabled and unchecked", disabled: true, onText: "On", offText: "Off" }),
        React.createElement(Toggle, { label: "With inline label", inlineLabel: true, onText: "On", offText: "Off", onChange: _onChange }),
        React.createElement(Toggle, { label: "Disabled with inline label", inlineLabel: true, disabled: true, onText: "On", offText: "Off" }),
        React.createElement(Toggle, { label: "With inline label and without onText and offText", inlineLabel: true, onChange: _onChange }),
        React.createElement(Toggle, { label: "Disabled with inline label and without onText and offText", inlineLabel: true, disabled: true }),
        React.createElement(Toggle, { label: "Enabled and checked (ARIA 1.0 compatible)", defaultChecked: true, onText: "On", offText: "Off", onChange: _onChange, role: "checkbox" })));
};
function _onChange(ev, checked) {
    console.log('toggle is ' + (checked ? 'checked' : 'not checked'));
}
//# sourceMappingURL=Toggle.Basic.Example.js.map