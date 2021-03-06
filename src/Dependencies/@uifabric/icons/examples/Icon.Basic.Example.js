import * as React from 'react';
import { FontIcon } from 'office-ui-fabric-react/lib/Icon';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';
var iconClass = mergeStyles({
    fontSize: 50,
    height: 50,
    width: 50,
    margin: '0 25px',
});
export var IconBasicExample = function () {
    // FontIcon is an optimized variant of standard Icon.
    // You could also use the standard Icon here.
    return (React.createElement("div", null,
        React.createElement(FontIcon, { iconName: "CompassNW", className: iconClass }),
        React.createElement(FontIcon, { iconName: "Dictionary", className: iconClass }),
        React.createElement(FontIcon, { iconName: "TrainSolid", className: iconClass })));
};
//# sourceMappingURL=Icon.Basic.Example.js.map