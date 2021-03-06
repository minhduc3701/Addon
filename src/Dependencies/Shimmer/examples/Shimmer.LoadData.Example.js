import { __assign } from "tslib";
import * as React from 'react';
import { Shimmer, ShimmerElementsGroup, ShimmerElementType } from 'office-ui-fabric-react/lib/Shimmer';
import { Persona, PersonaSize, PersonaPresence } from 'office-ui-fabric-react/lib/Persona';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';
import { useBoolean } from '@uifabric/react-hooks';
var wrapperClass = mergeStyles({
    padding: 2,
    selectors: {
        '& > .ms-Shimmer-container': {
            margin: '10px 0',
        },
    },
});
var wrapperStyles = { display: 'flex' };
var getCustomElements = function () {
    return (React.createElement("div", { style: wrapperStyles },
        React.createElement(ShimmerElementsGroup, { shimmerElements: [
                { type: ShimmerElementType.circle, height: 40 },
                { type: ShimmerElementType.gap, width: 16, height: 40 },
            ] }),
        React.createElement(ShimmerElementsGroup, { flexWrap: true, width: "100%", shimmerElements: [
                { type: ShimmerElementType.line, width: '100%', height: 10, verticalAlign: 'bottom' },
                { type: ShimmerElementType.line, width: '90%', height: 8 },
                { type: ShimmerElementType.gap, width: '10%', height: 20 },
            ] })));
};
export var ShimmerLoadDataExample = function () {
    var _a = React.useState({}), examplePersona = _a[0], setExamplePersona = _a[1];
    var _b = React.useState(''), contentOne = _b[0], setContentOne = _b[1];
    var _c = useBoolean(false), isDataLoadedOne = _c[0], toggleIsDataLoadedOne = _c[1].toggle;
    var _d = useBoolean(false), isDataLoadedTwo = _d[0], toggleIsDataLoadedTwo = _d[1].toggle;
    var getContentOne = function (ev, checked) {
        toggleIsDataLoadedOne();
        setContentOne(!isDataLoadedOne ? 'Congratulations!!! You have successfully loaded the content. ' : '');
    };
    var getContentTwo = function (ev, checked) {
        toggleIsDataLoadedTwo();
        setExamplePersona(!isDataLoadedTwo
            ? {
                imageUrl: 'https://static2.sharepointonline.com/files/fabric/office-ui-fabric-react-assets/persona-female.png',
                imageInitials: 'AL',
                primaryText: 'Annie Lindqvist',
                secondaryText: 'Software Engineer',
            }
            : {});
    };
    return (React.createElement("div", { className: wrapperClass },
        React.createElement(Toggle, { checked: isDataLoadedOne, onChange: getContentOne, onText: "Toggle to show shimmer", offText: "Toggle to load content" }),
        React.createElement(Shimmer, { isDataLoaded: isDataLoadedOne, ariaLabel: "Loading content" },
            React.createElement("div", { style: {
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    lineHeight: '1',
                    minHeight: '16px',
                } },
                contentOne,
                contentOne,
                contentOne)),
        React.createElement(Toggle, { checked: isDataLoadedTwo, onChange: getContentTwo, onText: "Toggle to show shimmer", offText: "Toggle to load content" }),
        React.createElement(Shimmer, { customElementsGroup: getCustomElements(), width: "300", isDataLoaded: isDataLoadedTwo },
            React.createElement(Persona, __assign({}, examplePersona, { size: PersonaSize.size40, presence: PersonaPresence.away })))));
};
//# sourceMappingURL=Shimmer.LoadData.Example.js.map