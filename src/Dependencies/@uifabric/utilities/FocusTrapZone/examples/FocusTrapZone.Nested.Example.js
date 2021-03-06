import * as React from 'react';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { FocusTrapZone } from 'office-ui-fabric-react/lib/FocusTrapZone';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { memoizeFunction } from 'office-ui-fabric-react/lib/Utilities';
import { useBoolean } from '@uifabric/react-hooks';
var getStackStyles = memoizeFunction(function (isActive) { return ({
    root: { border: "2px solid " + (isActive ? '#ababab' : 'transparent'), padding: 10 },
}); });
var stackTokens = { childrenGap: 10 };
var fixedWidthToggleStyles = { root: { width: 200 } };
var FocusTrapComponent = function (props) {
    var _a = useBoolean(false), isActive = _a[0], toggleIsActive = _a[1].toggle;
    var zoneNumber = props.zoneNumber, children = props.children;
    var onStringButtonClicked = function () {
        alert("Button " + zoneNumber + " clicked");
    };
    return (React.createElement(FocusTrapZone, { disabled: !isActive, forceFocusInsideTrap: false },
        React.createElement(Stack, { horizontalAlign: "start", tokens: stackTokens, styles: getStackStyles(isActive) },
            React.createElement(Toggle, { checked: isActive, onChange: toggleIsActive, label: 'Enable trap zone ' + zoneNumber, onText: "On (toggle to exit)", offText: "Off", 
                // Set a width on these toggles in the horizontal zone to prevent jumping when enabled
                styles: zoneNumber >= 2 && zoneNumber <= 4 ? fixedWidthToggleStyles : undefined }),
            React.createElement(DefaultButton, { onClick: onStringButtonClicked, text: "Zone " + zoneNumber + " button" }),
            children)));
};
export var FocusTrapZoneNestedExample = function () { return (React.createElement("div", null,
    React.createElement(FocusTrapComponent, { zoneNumber: 1 },
        React.createElement(FocusTrapComponent, { zoneNumber: 2 },
            React.createElement(FocusTrapComponent, { zoneNumber: 3 }),
            React.createElement(FocusTrapComponent, { zoneNumber: 4 })),
        React.createElement(FocusTrapComponent, { zoneNumber: 5 })))); };
//# sourceMappingURL=FocusTrapZone.Nested.Example.js.map