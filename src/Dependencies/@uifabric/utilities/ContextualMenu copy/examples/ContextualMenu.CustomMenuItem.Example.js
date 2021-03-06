import * as React from 'react';
import { ContextualMenuItemType, } from 'office-ui-fabric-react/lib/ContextualMenu';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
export var ContextualMenuWithCustomMenuItemExample = function () {
    var menuProps = React.useMemo(function () { return ({
        items: menuItems,
        shouldFocusOnMount: true,
        contextualMenuItemAs: function (props) { return React.createElement("div", null,
            "Custom rendered ",
            props.item.text); },
    }); }, [menuItems]);
    return React.createElement(DefaultButton, { text: "Click for ContextualMenu", menuProps: menuProps });
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
//# sourceMappingURL=ContextualMenu.CustomMenuItem.Example.js.map