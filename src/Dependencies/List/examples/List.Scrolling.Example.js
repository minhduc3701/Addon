import * as React from 'react';
import { FocusZone, FocusZoneDirection } from 'office-ui-fabric-react/lib/FocusZone';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
import { List, ScrollToMode } from 'office-ui-fabric-react/lib/List';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { createListItems } from '@uifabric/example-data';
import { mergeStyleSets, getTheme, normalize } from 'office-ui-fabric-react/lib/Styling';
import { useConst } from '@uifabric/react-hooks';
var evenItemHeight = 25;
var oddItemHeight = 50;
var numberOfItemsOnPage = 10;
var theme = getTheme();
var dropdownOptions = [
    { key: 'auto', text: 'Auto' },
    { key: 'top', text: 'Top' },
    { key: 'bottom', text: 'Bottom' },
    { key: 'center', text: 'Center' },
];
var styles = mergeStyleSets({
    container: {
        overflow: 'auto',
        maxHeight: 400,
        border: '1px solid #CCC',
        marginTop: 20,
        selectors: {
            '.ms-List-cell:nth-child(odd)': {
                height: 50,
                lineHeight: 50,
                background: theme.palette.neutralLighter,
            },
            '.ms-List-cell:nth-child(even)': {
                height: 25,
                lineHeight: 25,
            },
        },
    },
    itemContent: [
        theme.fonts.medium,
        normalize,
        {
            position: 'relative',
            boxSizing: 'border-box',
            display: 'block',
            borderLeft: '3px solid ' + theme.palette.themePrimary,
            paddingLeft: 27,
        },
    ],
});
var onRenderCell = function (item, index) {
    return (React.createElement("div", { "data-is-focusable": true },
        React.createElement("div", { className: styles.itemContent },
            index,
            " \u00A0 ",
            item.name)));
};
export var ListScrollingExample = function () {
    var items = useConst(function () { return createListItems(5000); });
    var _a = React.useState(0), selectedIndex = _a[0], setSelectedIndex = _a[1];
    var _b = React.useState(ScrollToMode.auto), scrollToMode = _b[0], setScrollToMode = _b[1];
    var listRef = React.useRef(null);
    var scroll = function (index, propScrollToMode) {
        var _a;
        var updatedSelectedIndex = Math.min(Math.max(index, 0), items.length - 1);
        setSelectedIndex(updatedSelectedIndex);
        setScrollToMode(propScrollToMode);
        (_a = listRef.current) === null || _a === void 0 ? void 0 : _a.scrollToIndex(updatedSelectedIndex, function (idx) { return (idx % 2 === 0 ? evenItemHeight : oddItemHeight); }, scrollToMode);
    };
    var getPageHeight = function (idx) {
        var h = 0;
        for (var i = idx; i < idx + numberOfItemsOnPage; ++i) {
            var isEvenRow = i % 2 === 0;
            h += isEvenRow ? evenItemHeight : oddItemHeight;
        }
        return h;
    };
    var scrollRelative = function (delta) {
        return function () {
            scroll(selectedIndex + delta, scrollToMode);
        };
    };
    var onChangeText = function (ev, value) {
        scroll(parseInt(value, 10) || 0, scrollToMode);
    };
    var onDropdownChange = function (event, option) {
        var scrollMode = scrollToMode;
        switch (option.key) {
            case 'auto':
                scrollMode = ScrollToMode.auto;
                break;
            case 'top':
                scrollMode = ScrollToMode.top;
                break;
            case 'bottom':
                scrollMode = ScrollToMode.bottom;
                break;
            case 'center':
                scrollMode = ScrollToMode.center;
                break;
        }
        scroll(selectedIndex, scrollMode);
    };
    return (React.createElement(FocusZone, { direction: FocusZoneDirection.vertical },
        React.createElement("div", null,
            React.createElement(DefaultButton, { onClick: scrollRelative(-10) }, "-10"),
            React.createElement(DefaultButton, { onClick: scrollRelative(-1) }, "-1"),
            React.createElement(DefaultButton, { onClick: scrollRelative(1) }, "+1"),
            React.createElement(DefaultButton, { onClick: scrollRelative(10) }, "+10")),
        React.createElement(Dropdown, { placeholder: "Select an Option", label: "Scroll To Mode:", ariaLabel: "Scroll To Mode", defaultSelectedKey: 'auto', options: dropdownOptions, onChange: onDropdownChange }),
        React.createElement("div", null,
            "Scroll item index:",
            React.createElement(TextField, { value: selectedIndex.toString(10), onChange: onChangeText })),
        React.createElement("div", { className: styles.container, "data-is-scrollable": true },
            React.createElement(List, { componentRef: listRef, items: items, getPageHeight: getPageHeight, onRenderCell: onRenderCell }))));
};
//# sourceMappingURL=List.Scrolling.Example.js.map