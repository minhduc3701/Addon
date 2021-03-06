import * as React from 'react';
import { css, createArray } from 'office-ui-fabric-react/lib/Utilities';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { MarqueeSelection, Selection } from 'office-ui-fabric-react/lib/MarqueeSelection';
import { getTheme, mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';
import { useBoolean, useConstCallback, useConst } from '@uifabric/react-hooks';
var PHOTOS = createArray(250, function (index) {
    var randomWidth = 50 + Math.floor(Math.random() * 150);
    return {
        key: index,
        url: "http://placehold.it/" + randomWidth + "x100",
        width: randomWidth,
        height: 100,
    };
});
var theme = getTheme();
var styles = mergeStyleSets({
    photoList: {
        display: 'inline-block',
        border: '1px solid ' + theme.palette.neutralTertiary,
        margin: 0,
        padding: 10,
        overflow: 'hidden',
        userSelect: 'none',
    },
    photoCell: {
        position: 'relative',
        display: 'inline-block',
        margin: 2,
        boxSizing: 'border-box',
        background: theme.palette.neutralLighter,
        lineHeight: 100,
        verticalAlign: 'middle',
        textAlign: 'center',
        selectors: {
            '&.is-selected': {
                background: theme.palette.themeLighter,
                border: '1px solid ' + theme.palette.themePrimary,
            },
        },
    },
    checkbox: {
        margin: '10px 0',
    },
});
var useForceUpdate = function () {
    var _a = React.useState(0), setCount = _a[1];
    console.log('update');
    return useConstCallback(function () { return setCount(function (current) { return current + 1; }); });
};
export var MarqueeSelectionBasicExample = function () {
    var _a = useBoolean(true), isMarqueeEnabled = _a[0], toggleIsMarqueeEnabled = _a[1].toggle;
    var forceUpdate = useForceUpdate();
    var selection = useConst(function () {
        return new Selection({
            items: PHOTOS,
            onSelectionChanged: forceUpdate,
        });
    });
    return (React.createElement(MarqueeSelection, { selection: selection, isEnabled: isMarqueeEnabled },
        React.createElement(Checkbox, { className: styles.checkbox, label: "Is marquee enabled", defaultChecked: true, onChange: toggleIsMarqueeEnabled }),
        React.createElement("p", null, "Drag a rectangle around the items below to select them:"),
        React.createElement("ul", { className: styles.photoList }, PHOTOS.map(function (photo, index) { return (React.createElement("div", { key: index, className: css(styles.photoCell, selection.isIndexSelected(index) && 'is-selected'), "data-is-focusable": true, "data-selection-index": index, style: { width: photo.width, height: photo.height } }, index)); }))));
};
//# sourceMappingURL=MarqueeSelection.Basic.Example.js.map