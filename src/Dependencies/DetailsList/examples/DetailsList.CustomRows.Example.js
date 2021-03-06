import { __assign, __extends } from "tslib";
import * as React from 'react';
import { DetailsList, DetailsRow } from 'office-ui-fabric-react/lib/DetailsList';
import { createListItems } from '@uifabric/example-data';
import { getTheme } from 'office-ui-fabric-react/lib/Styling';
var theme = getTheme();
var DetailsListCustomRowsExample = /** @class */ (function (_super) {
    __extends(DetailsListCustomRowsExample, _super);
    function DetailsListCustomRowsExample(props) {
        var _this = _super.call(this, props) || this;
        _this._onRenderRow = function (props) {
            var customStyles = {};
            if (props) {
                if (props.itemIndex % 2 === 0) {
                    // Every other row renders with a different background color
                    customStyles.root = { backgroundColor: theme.palette.themeLighterAlt };
                }
                return React.createElement(DetailsRow, __assign({}, props, { styles: customStyles }));
            }
            return null;
        };
        _this._items = createListItems(500);
        return _this;
    }
    DetailsListCustomRowsExample.prototype.render = function () {
        return (React.createElement(DetailsList, { items: this._items, setKey: "set", onRenderRow: this._onRenderRow, checkButtonAriaLabel: "Row checkbox" }));
    };
    return DetailsListCustomRowsExample;
}(React.Component));
export { DetailsListCustomRowsExample };
//# sourceMappingURL=DetailsList.CustomRows.Example.js.map