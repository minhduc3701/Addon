import * as React from 'react';
import { useConstCallback } from '@uifabric/react-hooks';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
export var ContextualMenuWithCustomMenuListExample = function () {
    var _a = React.useState(menuItems), items = _a[0], setItems = _a[1];
    var onAbort = useConstCallback(function () {
        setItems(menuItems);
    });
    var onChange = useConstCallback(function (ev, newValue) {
        var filteredItems = menuItems.filter(function (item) { return item.text && item.text.toLowerCase().indexOf(newValue.toLowerCase()) !== -1; });
        if (!filteredItems || !filteredItems.length) {
            filteredItems.push({
                key: 'no_results',
                onRender: function (item, dismissMenu) { return (React.createElement("div", { key: "no_results", style: filteredItemsStyle },
                    React.createElement(Icon, { iconName: "SearchIssue", title: "No actions found" }),
                    React.createElement("span", null, "No actions found"))); },
            });
        }
        setItems(filteredItems);
    });
    var renderMenuList = useConstCallback(function (menuListProps, defaultRender) {
        return (React.createElement("div", null,
            React.createElement("div", { style: wrapperStyle },
                React.createElement(SearchBox, { ariaLabel: "Filter actions by text", placeholder: "Filter actions", onAbort: onAbort, onChange: onChange, styles: searchBoxStyles })),
            defaultRender(menuListProps)));
    });
    var menuProps = React.useMemo(function () { return ({
        onRenderMenuList: renderMenuList,
        title: 'Actions',
        shouldFocusOnMount: true,
        items: items,
    }); }, [items]);
    return React.createElement(DefaultButton, { text: "Click for ContextualMenu", menuProps: menuProps });
};
var wrapperStyle = { borderBottom: '1px solid #ccc' };
var filteredItemsStyle = {
    width: '100%',
    height: '100px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};
var searchBoxStyles = {
    root: { margin: '8px' },
};
var menuItems = [
    {
        key: 'newItem',
        text: 'New',
        onClick: function () { return console.log('New clicked'); },
    },
    {
        key: 'rename',
        text: 'Rename',
        onClick: function () { return console.log('Rename clicked'); },
    },
    {
        key: 'edit',
        text: 'Edit',
        onClick: function () { return console.log('Edit clicked'); },
    },
    {
        key: 'properties',
        text: 'Properties',
        onClick: function () { return console.log('Properties clicked'); },
    },
    {
        key: 'linkNoTarget',
        text: 'Link same window',
        href: 'http://bing.com',
    },
    {
        key: 'linkWithTarget',
        text: 'Link new window',
        href: 'http://bing.com',
        target: '_blank',
    },
    {
        key: 'linkWithOnClick',
        name: 'Link click',
        href: 'http://bing.com',
        onClick: function (ev) {
            alert('Link clicked');
            ev.preventDefault();
        },
        target: '_blank',
    },
    {
        key: 'disabled',
        text: 'Disabled item',
        disabled: true,
        onClick: function () { return console.error('Disabled item should not be clickable.'); },
    },
];
//# sourceMappingURL=ContextualMenu.CustomMenuList.Example.js.map