import * as React from 'react';
import { getRTL } from 'office-ui-fabric-react/lib/Utilities';
import { FocusZone, FocusZoneDirection } from 'office-ui-fabric-react/lib/FocusZone';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Image, ImageFit } from 'office-ui-fabric-react/lib/Image';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { List } from 'office-ui-fabric-react/lib/List';
import { mergeStyleSets, getTheme, getFocusStyle } from 'office-ui-fabric-react/lib/Styling';
import { createListItems } from '@uifabric/example-data';
import { useConst } from '@uifabric/react-hooks';
var theme = getTheme();
var palette = theme.palette, semanticColors = theme.semanticColors, fonts = theme.fonts;
var classNames = mergeStyleSets({
    itemCell: [
        getFocusStyle(theme, { inset: -1 }),
        {
            minHeight: 54,
            padding: 10,
            boxSizing: 'border-box',
            borderBottom: "1px solid " + semanticColors.bodyDivider,
            display: 'flex',
            selectors: {
                '&:hover': { background: palette.neutralLight },
            },
        },
    ],
    itemImage: {
        flexShrink: 0,
    },
    itemContent: {
        marginLeft: 10,
        overflow: 'hidden',
        flexGrow: 1,
    },
    itemName: [
        fonts.xLarge,
        {
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
        },
    ],
    itemIndex: {
        fontSize: fonts.small.fontSize,
        color: palette.neutralTertiary,
        marginBottom: 10,
    },
    chevron: {
        alignSelf: 'center',
        marginLeft: 10,
        color: palette.neutralTertiary,
        fontSize: fonts.large.fontSize,
        flexShrink: 0,
    },
});
var onRenderCell = function (item, index) {
    return (React.createElement("div", { className: classNames.itemCell, "data-is-focusable": true },
        React.createElement(Image, { className: classNames.itemImage, src: item.thumbnail, width: 50, height: 50, imageFit: ImageFit.cover }),
        React.createElement("div", { className: classNames.itemContent },
            React.createElement("div", { className: classNames.itemName }, item.name),
            React.createElement("div", { className: classNames.itemIndex }, "Item " + index),
            React.createElement("div", null, item.description)),
        React.createElement(Icon, { className: classNames.chevron, iconName: getRTL() ? 'ChevronLeft' : 'ChevronRight' })));
};
export var ListBasicExample = function () {
    var originalItems = useConst(function () { return createListItems(5000); });
    var _a = React.useState(originalItems), items = _a[0], setItems = _a[1];
    var resultCountText = items.length === originalItems.length ? '' : " (" + items.length + " of " + originalItems.length + " shown)";
    var onFilterChanged = function (_, text) {
        setItems(originalItems.filter(function (item) { return item.name.toLowerCase().indexOf(text.toLowerCase()) >= 0; }));
    };
    return (React.createElement(FocusZone, { direction: FocusZoneDirection.vertical },
        React.createElement(TextField, { label: 'Filter by name' + resultCountText, onChange: onFilterChanged }),
        React.createElement(List, { items: items, onRenderCell: onRenderCell })));
};
//# sourceMappingURL=List.Basic.Example.js.map