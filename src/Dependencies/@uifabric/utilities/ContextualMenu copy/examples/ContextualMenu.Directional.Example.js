import * as React from 'react';
import { useConstCallback } from '@uifabric/react-hooks';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { ContextualMenuItemType, DirectionalHint, } from 'office-ui-fabric-react/lib/ContextualMenu';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
import { getRTL } from 'office-ui-fabric-react/lib/Utilities';
import './ContextualMenuExample.scss';
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
var checkboxStyles = { root: { margin: '10px 0' } };
export var ContextualMenuDirectionalExample = function () {
    var _a = React.useState(false), isBeakVisible = _a[0], setIsBeakVisible = _a[1];
    var _b = React.useState(false), useDirectionalHintForRTL = _b[0], setUseDirectionalHintForRTL = _b[1];
    var _c = React.useState(DirectionalHint.bottomLeftEdge), directionalHint = _c[0], setDirectionalHint = _c[1];
    var _d = React.useState(DirectionalHint.bottomLeftEdge), directionalHintForRTL = _d[0], setDirectionalHintForRTL = _d[1];
    var onShowBeakChange = useConstCallback(function (event, isVisible) {
        setIsBeakVisible(isVisible);
    });
    var onUseRtlHintChange = useConstCallback(function (event, isVisible) {
        setUseDirectionalHintForRTL(isVisible);
    });
    var onDirectionalChanged = useConstCallback(function (event, option) {
        setDirectionalHint(option.key);
    });
    var onDirectionalRtlChanged = useConstCallback(function (event, option) {
        setDirectionalHintForRTL(option.key);
    });
    var menuProps = React.useMemo(function () { return ({
        isBeakVisible: isBeakVisible,
        directionalHint: directionalHint,
        directionalHintForRTL: useDirectionalHintForRTL ? directionalHintForRTL : undefined,
        gapSpace: 0,
        beakWidth: 20,
        directionalHintFixed: false,
        items: menuItems,
    }); }, [isBeakVisible, directionalHint, directionalHintForRTL]);
    return (React.createElement("div", { className: "ms-ContextualMenuDirectionalExample" },
        React.createElement("div", { className: "ms-ContextualMenuDirectionalExample-configArea" },
            React.createElement(Checkbox, { styles: checkboxStyles, label: "Show beak", checked: isBeakVisible, onChange: onShowBeakChange }),
            React.createElement(Dropdown, { label: "Directional hint", selectedKey: directionalHint, options: DIRECTION_OPTIONS, onChange: onDirectionalChanged }),
            getRTL() && (React.createElement(Checkbox, { label: "Use RTL directional hint", checked: useDirectionalHintForRTL, onChange: onUseRtlHintChange })),
            getRTL() && (React.createElement(Dropdown, { label: "Directional hint for RTL", selectedKey: directionalHintForRTL, options: DIRECTION_OPTIONS, onChange: onDirectionalRtlChanged, disabled: !useDirectionalHintForRTL }))),
        React.createElement("div", { className: "ms-ContextualMenuDirectionalExample-buttonArea" },
            React.createElement(DefaultButton, { text: "Show context menu", menuProps: menuProps }))));
};
var menuItems = [
    {
        key: 'newItem',
        text: 'New',
    },
    {
        key: 'divider_1',
        itemType: ContextualMenuItemType.Divider,
    },
    {
        key: 'rename',
        text: 'Rename',
    },
    {
        key: 'edit',
        text: 'Edit',
    },
    {
        key: 'properties',
        text: 'Properties',
    },
    {
        key: 'disabled',
        text: 'Disabled item',
        disabled: true,
    },
];
//# sourceMappingURL=ContextualMenu.Directional.Example.js.map