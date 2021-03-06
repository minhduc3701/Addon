import { __extends } from "tslib";
import * as React from 'react';
import { Announced } from 'office-ui-fabric-react/lib/Announced';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { DetailsList, DetailsListLayoutMode, Selection } from 'office-ui-fabric-react/lib/DetailsList';
import { MarqueeSelection } from 'office-ui-fabric-react/lib/MarqueeSelection';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';
var exampleChildClass = mergeStyles({
    display: 'block',
    marginBottom: '10px',
});
var textFieldStyles = { root: { maxWidth: '300px' } };
var DetailsListCompactExample = /** @class */ (function (_super) {
    __extends(DetailsListCompactExample, _super);
    function DetailsListCompactExample(props) {
        var _this = _super.call(this, props) || this;
        _this._onFilter = function (ev, text) {
            _this.setState({
                items: text ? _this._allItems.filter(function (i) { return i.name.toLowerCase().indexOf(text) > -1; }) : _this._allItems,
            });
        };
        _this._selection = new Selection({
            onSelectionChanged: function () { return _this.setState({ selectionDetails: _this._getSelectionDetails() }); },
        });
        _this._allItems = [];
        for (var i = 0; i < 200; i++) {
            _this._allItems.push({
                key: i,
                name: 'Item ' + i,
                value: i,
            });
        }
        _this._columns = [
            { key: 'column1', name: 'Name', fieldName: 'name', minWidth: 100, maxWidth: 200, isResizable: true },
            { key: 'column2', name: 'Value', fieldName: 'value', minWidth: 100, maxWidth: 200, isResizable: true },
        ];
        _this.state = {
            items: _this._allItems,
            selectionDetails: _this._getSelectionDetails(),
        };
        return _this;
    }
    DetailsListCompactExample.prototype.render = function () {
        var _a = this.state, items = _a.items, selectionDetails = _a.selectionDetails;
        return (React.createElement(Fabric, null,
            React.createElement("div", { className: exampleChildClass }, selectionDetails),
            React.createElement(Announced, { message: selectionDetails }),
            React.createElement(TextField, { className: exampleChildClass, label: "Filter by name:", onChange: this._onFilter, styles: textFieldStyles }),
            React.createElement(Announced, { message: "Number of items after filter applied: " + items.length + "." }),
            React.createElement(MarqueeSelection, { selection: this._selection },
                React.createElement(DetailsList, { compact: true, items: items, columns: this._columns, setKey: "set", layoutMode: DetailsListLayoutMode.justified, selection: this._selection, selectionPreservedOnEmptyClick: true, onItemInvoked: this._onItemInvoked, ariaLabelForSelectionColumn: "Toggle selection", ariaLabelForSelectAllCheckbox: "Toggle selection for all items", checkButtonAriaLabel: "Row checkbox" }))));
    };
    DetailsListCompactExample.prototype._getSelectionDetails = function () {
        var selectionCount = this._selection.getSelectedCount();
        switch (selectionCount) {
            case 0:
                return 'No items selected';
            case 1:
                return '1 item selected: ' + this._selection.getSelection()[0].name;
            default:
                return selectionCount + " items selected";
        }
    };
    DetailsListCompactExample.prototype._onItemInvoked = function (item) {
        alert("Item invoked: " + item.name);
    };
    return DetailsListCompactExample;
}(React.Component));
export { DetailsListCompactExample };
//# sourceMappingURL=DetailsList.Compact.Example.js.map