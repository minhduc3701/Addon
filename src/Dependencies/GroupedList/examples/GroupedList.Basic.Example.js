import * as React from 'react';
import { GroupedList } from 'office-ui-fabric-react/lib/GroupedList';
import { DetailsRow } from 'office-ui-fabric-react/lib/DetailsList';
import { FocusZone } from 'office-ui-fabric-react/lib/FocusZone';
import { Selection, SelectionMode, SelectionZone } from 'office-ui-fabric-react/lib/Selection';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { useBoolean, useConst } from '@uifabric/react-hooks';
import { createListItems, createGroups } from '@uifabric/example-data';
var toggleStyles = { root: { marginBottom: '20px' } };
var groupCount = 3;
var groupDepth = 3;
var items = createListItems(Math.pow(groupCount, groupDepth + 1));
var columns = Object.keys(items[0])
    .slice(0, 3)
    .map(function (key) { return ({
    key: key,
    name: key,
    fieldName: key,
    minWidth: 300,
}); });
var groups = createGroups(groupCount, groupDepth, 0, groupCount);
export var GroupedListBasicExample = function () {
    var _a = useBoolean(false), isCompactMode = _a[0], toggleIsCompactMode = _a[1].toggle;
    var selection = useConst(function () {
        var s = new Selection();
        s.setItems(items, true);
        return s;
    });
    var onRenderCell = function (nestingDepth, item, itemIndex) {
        return (React.createElement(DetailsRow, { columns: columns, groupNestingDepth: nestingDepth, item: item, itemIndex: itemIndex, selection: selection, selectionMode: SelectionMode.multiple, compact: isCompactMode }));
    };
    return (React.createElement("div", null,
        React.createElement(Toggle, { label: "Enable compact mode", checked: isCompactMode, onChange: toggleIsCompactMode, onText: "Compact", offText: "Normal", styles: toggleStyles }),
        React.createElement(FocusZone, null,
            React.createElement(SelectionZone, { selection: selection, selectionMode: SelectionMode.multiple },
                React.createElement(GroupedList, { items: items, onRenderCell: onRenderCell, selection: selection, selectionMode: SelectionMode.multiple, groups: groups, compact: isCompactMode })))));
};
//# sourceMappingURL=GroupedList.Basic.Example.js.map