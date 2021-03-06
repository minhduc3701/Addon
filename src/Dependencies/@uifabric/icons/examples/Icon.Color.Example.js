import * as React from 'react';
import { FontIcon } from 'office-ui-fabric-react/lib/Icon';
import { mergeStyles, mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';
var iconClass = mergeStyles({
    fontSize: 50,
    height: 50,
    width: 50,
    margin: '0 25px',
});
var classNames = mergeStyleSets({
    deepSkyBlue: [{ color: 'deepskyblue' }, iconClass],
    greenYellow: [{ color: 'greenyellow' }, iconClass],
    salmon: [{ color: 'salmon' }, iconClass],
});
export var IconColorExample = function () {
    // FontIcon is an optimized variant of standard Icon.
    // You could also use the standard Icon here.
    return (React.createElement("div", null,
        React.createElement(FontIcon, { iconName: "CompassNW", className: classNames.deepSkyBlue }),
        React.createElement(FontIcon, { iconName: "Dictionary", className: classNames.greenYellow }),
        React.createElement(FontIcon, { iconName: "TrainSolid", className: classNames.salmon })));
};
//# sourceMappingURL=Icon.Color.Example.js.map