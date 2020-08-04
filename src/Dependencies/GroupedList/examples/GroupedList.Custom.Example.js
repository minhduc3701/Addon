import * as React from 'react';
import { GroupedList } from 'office-ui-fabric-react/lib/GroupedList';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { createListItems, createGroups } from '@uifabric/example-data';
import { getTheme, mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';
var theme = getTheme();
var headerAndFooterStyles = {
    minWidth: 300,
    minHeight: 40,
    lineHeight: 40,
    paddingLeft: 16,
};
var classNames = mergeStyleSets({
    header: [headerAndFooterStyles, theme.fonts.xLarge],
    footer: [headerAndFooterStyles, theme.fonts.large],
    name: {
        display: 'inline-block',
        overflow: 'hidden',
        height: 24,
        cursor: 'default',
        padding: 8,
        boxSizing: 'border-box',
        verticalAlign: 'top',
        background: 'none',
        backgroundColor: 'transparent',
        border: 'none',
        paddingLeft: 32,
    },
});
var onRenderHeader = function (props) {
    var toggleCollapse = function () {
        props.onToggleCollapse(props.group);
    };
    return (React.createElement("div", { className: classNames.header },
        "This is a custom header for ",
        props.group.name,
        "\u00A0 (",
        React.createElement(Link, { onClick: toggleCollapse }, props.group.isCollapsed ? 'Expand' : 'Collapse'),
        ")"));
};
var onRenderCell = function (nestingDepth, item, itemIndex) {
    return (React.createElement("div", { role: "row", "data-selection-index": itemIndex },
        React.createElement("span", { role: "cell", className: classNames.name }, item.name)));
};
var onRenderFooter = function (props) {
    return React.createElement("div", { className: classNames.footer },
        "This is a custom footer for ",
        props.group.name);
};
var groupedListProps = {
    onRenderHeader: onRenderHeader,
    onRenderFooter: onRenderFooter,
};
var items = createListItems(20);
var groups = createGroups(4, 0, 0, 5);
export var GroupedListCustomExample = function () { return (React.createElement(GroupedList, { items: items, onRenderCell: onRenderCell, groupProps: groupedListProps, groups: groups })); };
//# sourceMappingURL=GroupedList.Custom.Example.js.map