import { __assign } from "tslib";
import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { DetailsList, DetailsListLayoutMode, Selection, ConstrainMode, DetailsRow, } from 'office-ui-fabric-react/lib/DetailsList';
import { TooltipHost } from 'office-ui-fabric-react/lib/Tooltip';
import { ScrollablePane, ScrollbarVisibility } from 'office-ui-fabric-react/lib/ScrollablePane';
import { Sticky, StickyPositionType } from 'office-ui-fabric-react/lib/Sticky';
import { MarqueeSelection } from 'office-ui-fabric-react/lib/MarqueeSelection';
import { SelectionMode } from 'office-ui-fabric-react/lib/Selection';
import { mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';
var classNames = mergeStyleSets({
    wrapper: {
        height: '80vh',
        position: 'relative',
        backgroundColor: 'white',
    },
    filter: {
        backgroundColor: 'white',
        paddingBottom: 20,
        maxWidth: 300,
    },
    header: {
        margin: 0,
        backgroundColor: 'white',
    },
    row: {
        display: 'inline-block',
    },
});
var footerItem = {
    key: 'footer',
    test1: 'Footer 1',
    test2: 'Footer 2',
    test3: 'Footer 3',
    test4: 'Footer 4',
    test5: 'Footer 5',
    test6: 'Footer 6',
};
var LOREM_IPSUM = ('lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut ' +
    'labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut ' +
    'aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore ' +
    'eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt ').split(' ');
var loremIndex = 0;
var lorem = function (wordCount) {
    var startIndex = loremIndex + wordCount > LOREM_IPSUM.length ? 0 : loremIndex;
    loremIndex = startIndex + wordCount;
    return LOREM_IPSUM.slice(startIndex, loremIndex).join(' ');
};
var allItems = Array.from({ length: 200 }).map(function (item, index) { return ({
    key: index,
    test1: lorem(4),
    test2: lorem(4),
    test3: lorem(4),
    test4: lorem(4),
    test5: lorem(4),
    test6: lorem(4),
}); });
var columns = Array.from({ length: 6 }).map(function (item, index) { return ({
    key: 'column' + (index + 1),
    name: 'Test ' + (index + 1),
    fieldName: 'test' + (index + 1),
    minWidth: 100,
    maxWidth: 200,
    isResizable: true,
}); });
var onItemInvoked = function (item) {
    alert('Item invoked: ' + item.test1);
};
var onRenderDetailsHeader = function (props, defaultRender) {
    if (!props) {
        return null;
    }
    var onRenderColumnHeaderTooltip = function (tooltipHostProps) { return (React.createElement(TooltipHost, __assign({}, tooltipHostProps))); };
    return (React.createElement(Sticky, { stickyPosition: StickyPositionType.Header, isScrollSynced: true }, defaultRender(__assign(__assign({}, props), { onRenderColumnHeaderTooltip: onRenderColumnHeaderTooltip }))));
};
var onRenderDetailsFooter = function (props, defaultRender) {
    if (!props) {
        return null;
    }
    return (React.createElement(Sticky, { stickyPosition: StickyPositionType.Footer, isScrollSynced: true },
        React.createElement("div", { className: classNames.row },
            React.createElement(DetailsRow, { columns: props.columns, item: footerItem, itemIndex: -1, selection: props.selection, selectionMode: (props.selection && props.selection.mode) || SelectionMode.none, rowWidth: props.rowWidth }))));
};
var hasText = function (item, text) {
    return (item.test1 + "|" + item.test2 + "|" + item.test3 + "|" + item.test4 + "|" + item.test5 + "|" + item.test6).indexOf(text) > -1;
};
export var ScrollablePaneDetailsListExample = function () {
    var _a = React.useState(allItems), items = _a[0], setItems = _a[1];
    var selection = React.useState(function () {
        var s = new Selection();
        s.setItems(items, true);
        return s;
    })[0];
    var onFilterChange = function (ev, text) {
        setItems(text ? allItems.filter(function (item) { return hasText(item, text); }) : allItems);
    };
    return (React.createElement("div", { className: classNames.wrapper },
        React.createElement(ScrollablePane, { scrollbarVisibility: ScrollbarVisibility.auto },
            React.createElement(Sticky, { stickyPosition: StickyPositionType.Header },
                React.createElement(TextField, { className: classNames.filter, label: "Filter by name:", onChange: onFilterChange })),
            React.createElement(Sticky, { stickyPosition: StickyPositionType.Header },
                React.createElement("h1", { className: classNames.header }, "Item list")),
            React.createElement(MarqueeSelection, { selection: selection },
                React.createElement(DetailsList, { items: items, columns: columns, setKey: "set", layoutMode: DetailsListLayoutMode.fixedColumns, constrainMode: ConstrainMode.unconstrained, onRenderDetailsHeader: onRenderDetailsHeader, onRenderDetailsFooter: onRenderDetailsFooter, selection: selection, selectionPreservedOnEmptyClick: true, ariaLabelForSelectionColumn: "Toggle selection", ariaLabelForSelectAllCheckbox: "Toggle selection for all items", onItemInvoked: onItemInvoked })))));
};
//# sourceMappingURL=ScrollablePane.DetailsList.Example.js.map