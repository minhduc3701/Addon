import { __extends } from "tslib";
import * as React from 'react';
import { createListItems } from '@uifabric/example-data';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { Image, ImageFit } from 'office-ui-fabric-react/lib/Image';
import { DetailsList, buildColumns } from 'office-ui-fabric-react/lib/DetailsList';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';
var DetailsListCustomColumnsExample = /** @class */ (function (_super) {
    __extends(DetailsListCustomColumnsExample, _super);
    function DetailsListCustomColumnsExample(props) {
        var _this = _super.call(this, props) || this;
        _this._onColumnClick = function (event, column) {
            var columns = _this.state.columns;
            var sortedItems = _this.state.sortedItems;
            var isSortedDescending = column.isSortedDescending;
            // If we've sorted this column, flip it.
            if (column.isSorted) {
                isSortedDescending = !isSortedDescending;
            }
            // Sort the items.
            sortedItems = _copyAndSort(sortedItems, column.fieldName, isSortedDescending);
            // Reset the items and columns to match the state.
            _this.setState({
                sortedItems: sortedItems,
                columns: columns.map(function (col) {
                    col.isSorted = col.key === column.key;
                    if (col.isSorted) {
                        col.isSortedDescending = isSortedDescending;
                    }
                    return col;
                }),
            });
        };
        var items = createListItems(500);
        _this.state = {
            sortedItems: items,
            columns: _buildColumns(items),
        };
        return _this;
    }
    DetailsListCustomColumnsExample.prototype.render = function () {
        var _a = this.state, sortedItems = _a.sortedItems, columns = _a.columns;
        return (React.createElement(DetailsList, { items: sortedItems, setKey: "set", columns: columns, onRenderItemColumn: _renderItemColumn, onColumnHeaderClick: this._onColumnClick, onItemInvoked: this._onItemInvoked, onColumnHeaderContextMenu: this._onColumnHeaderContextMenu, ariaLabelForSelectionColumn: "Toggle selection", ariaLabelForSelectAllCheckbox: "Toggle selection for all items", checkButtonAriaLabel: "Row checkbox" }));
    };
    DetailsListCustomColumnsExample.prototype._onColumnHeaderContextMenu = function (column, ev) {
        console.log("column " + column.key + " contextmenu opened.");
    };
    DetailsListCustomColumnsExample.prototype._onItemInvoked = function (item, index) {
        alert("Item " + item.name + " at index " + index + " has been invoked.");
    };
    return DetailsListCustomColumnsExample;
}(React.Component));
export { DetailsListCustomColumnsExample };
function _buildColumns(items) {
    var columns = buildColumns(items);
    var thumbnailColumn = columns.filter(function (column) { return column.name === 'thumbnail'; })[0];
    // Special case one column's definition.
    thumbnailColumn.name = '';
    thumbnailColumn.maxWidth = 50;
    thumbnailColumn.ariaLabel = 'Thumbnail';
    return columns;
}
function _renderItemColumn(item, index, column) {
    var fieldContent = item[column.fieldName];
    switch (column.key) {
        case 'thumbnail':
            return React.createElement(Image, { src: fieldContent, width: 50, height: 50, imageFit: ImageFit.cover });
        case 'name':
            return React.createElement(Link, { href: "#" }, fieldContent);
        case 'color':
            return (React.createElement("span", { "data-selection-disabled": true, className: mergeStyles({ color: fieldContent, height: '100%', display: 'block' }) }, fieldContent));
        default:
            return React.createElement("span", null, fieldContent);
    }
}
function _copyAndSort(items, columnKey, isSortedDescending) {
    var key = columnKey;
    return items.slice(0).sort(function (a, b) { return ((isSortedDescending ? a[key] < b[key] : a[key] > b[key]) ? 1 : -1); });
}
//# sourceMappingURL=DetailsList.CustomColumns.Example.js.map