import { __assign, __extends } from "tslib";
import * as React from 'react';
import { GroupHeader, GroupedList, } from 'office-ui-fabric-react/lib/GroupedList';
import { DetailsRow } from 'office-ui-fabric-react/lib/DetailsList';
import { FocusZone } from 'office-ui-fabric-react/lib/FocusZone';
import { Selection, SelectionMode, SelectionZone } from 'office-ui-fabric-react/lib/Selection';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { createListItems, createGroups } from '@uifabric/example-data';
var groupCount = 3;
var groupDepth = 1;
var GroupedListCustomCheckboxExample = /** @class */ (function (_super) {
    __extends(GroupedListCustomCheckboxExample, _super);
    function GroupedListCustomCheckboxExample(props) {
        var _this = _super.call(this, props) || this;
        _this._onRenderHeader = function (props) {
            return React.createElement(GroupHeader, __assign({ onRenderGroupHeaderCheckbox: _this._onRenderGroupHeaderCheckbox }, props));
        };
        _this._onRenderGroupHeaderCheckbox = function (props) {
            return React.createElement(Toggle, { checked: props.checked });
        };
        _this._onRenderCell = function (nestingDepth, item, itemIndex) {
            return (React.createElement(DetailsRow, { columns: _this._columns, groupNestingDepth: nestingDepth, item: item, itemIndex: itemIndex, selection: _this._selection, selectionMode: SelectionMode.multiple }));
        };
        _this._items = createListItems(Math.pow(groupCount, groupDepth + 1));
        _this._columns = Object.keys(_this._items[0])
            .slice(0, 3)
            .map(function (key) { return ({
            key: key,
            name: key,
            fieldName: key,
            minWidth: 300,
        }); });
        _this._groups = createGroups(groupCount, groupDepth, 0, groupCount);
        _this._selection = new Selection();
        _this._selection.setItems(_this._items);
        _this.state = {};
        return _this;
    }
    GroupedListCustomCheckboxExample.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement(FocusZone, null,
                React.createElement(SelectionZone, { selection: this._selection, selectionMode: SelectionMode.multiple },
                    React.createElement(GroupedList, { items: this._items, onRenderCell: this._onRenderCell, selection: this._selection, selectionMode: SelectionMode.multiple, groups: this._groups, groupProps: {
                            onRenderHeader: this._onRenderHeader,
                        } })))));
    };
    return GroupedListCustomCheckboxExample;
}(React.Component));
export { GroupedListCustomCheckboxExample };
//# sourceMappingURL=GroupedList.CustomCheckbox.Example.js.map