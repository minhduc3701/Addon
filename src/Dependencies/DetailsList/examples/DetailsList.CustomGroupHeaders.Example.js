import { __assign, __extends } from "tslib";
import * as React from 'react';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { DetailsHeader, DetailsList, } from 'office-ui-fabric-react/lib/DetailsList';
import { createListItems, createGroups } from '@uifabric/example-data';
import { getTheme, mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';
var ROW_HEIGHT = 42; // from DEFAULT_ROW_HEIGHTS in DetailsRow.styles.ts
var GROUP_HEADER_AND_FOOTER_SPACING = 8;
var GROUP_HEADER_AND_FOOTER_BORDER_WIDTH = 1;
var GROUP_HEADER_HEIGHT = 95;
var GROUP_FOOTER_HEIGHT = GROUP_HEADER_AND_FOOTER_SPACING * 4 + GROUP_HEADER_AND_FOOTER_BORDER_WIDTH * 2;
var theme = getTheme();
var classNames = mergeStyleSets({
    headerAndFooter: {
        borderTop: GROUP_HEADER_AND_FOOTER_BORDER_WIDTH + "px solid " + theme.palette.neutralQuaternary,
        borderBottom: GROUP_HEADER_AND_FOOTER_BORDER_WIDTH + "px solid " + theme.palette.neutralQuaternary,
        padding: GROUP_HEADER_AND_FOOTER_SPACING,
        margin: GROUP_HEADER_AND_FOOTER_SPACING + "px 0",
        background: theme.palette.neutralLighterAlt,
        // Overlay the sizer bars
        position: 'relative',
        zIndex: 100,
    },
    headerTitle: [
        theme.fonts.xLarge,
        {
            padding: '4px 0',
        },
    ],
    headerLinkSet: {
        margin: '4px -8px',
    },
    headerLink: {
        margin: '0 8px',
    },
});
var ITEMS_PER_GROUP = 20;
var GROUP_COUNT = 20;
var DetailsListCustomGroupHeadersExample = /** @class */ (function (_super) {
    __extends(DetailsListCustomGroupHeadersExample, _super);
    function DetailsListCustomGroupHeadersExample(props) {
        var _this = _super.call(this, props) || this;
        _this._onRenderDetailsHeader = function (props) {
            if (props) {
                return React.createElement(DetailsHeader, __assign({}, props, { ariaLabelForToggleAllGroupsButton: 'Toggle selection' }));
            }
            return null;
        };
        _this._onRenderGroupHeader = function (props) {
            if (props) {
                return (React.createElement("div", { className: classNames.headerAndFooter },
                    React.createElement("div", { className: classNames.headerTitle }, "Custom header for " + props.group.name),
                    React.createElement("div", { className: classNames.headerLinkSet },
                        React.createElement(Link, { className: classNames.headerLink, onClick: _this._onToggleSelectGroup(props) }, props.selected ? 'Remove selection' : 'Select group'),
                        React.createElement(Link, { className: classNames.headerLink, onClick: _this._onToggleCollapse(props) }, props.group.isCollapsed ? 'Expand group' : 'Collapse group'))));
            }
            return null;
        };
        _this._onRenderGroupFooter = function (props) {
            if (props) {
                return (React.createElement("div", { className: classNames.headerAndFooter },
                    React.createElement("em", null, "Custom footer for " + props.group.name)));
            }
            return null;
        };
        _this._getGroupTotalRowHeight = function (group) {
            return group.isCollapsed ? 0 : ROW_HEIGHT * group.count;
        };
        _this._getGroupHeight = function (group, _groupIndex) {
            return GROUP_HEADER_HEIGHT + GROUP_FOOTER_HEIGHT + _this._getGroupTotalRowHeight(group);
        };
        _this._items = createListItems(500);
        _this._groups = createGroups(GROUP_COUNT, 1, 0, ITEMS_PER_GROUP);
        return _this;
    }
    DetailsListCustomGroupHeadersExample.prototype.render = function () {
        return (React.createElement(DetailsList, { items: this._items, groups: this._groups, groupProps: {
                onRenderHeader: this._onRenderGroupHeader,
                onRenderFooter: this._onRenderGroupFooter,
            }, getGroupHeight: this._getGroupHeight, ariaLabelForSelectionColumn: "Toggle selection", ariaLabelForSelectAllCheckbox: "Toggle selection for all items", checkButtonAriaLabel: "Row checkbox", onRenderDetailsHeader: this._onRenderDetailsHeader }));
    };
    DetailsListCustomGroupHeadersExample.prototype._onToggleSelectGroup = function (props) {
        return function () {
            props.onToggleSelectGroup(props.group);
        };
    };
    DetailsListCustomGroupHeadersExample.prototype._onToggleCollapse = function (props) {
        return function () {
            props.onToggleCollapse(props.group);
        };
    };
    return DetailsListCustomGroupHeadersExample;
}(React.Component));
export { DetailsListCustomGroupHeadersExample };
//# sourceMappingURL=DetailsList.CustomGroupHeaders.Example.js.map