import { __assign } from "tslib";
import * as React from 'react';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
export var SpinnerBasicExample = function () {
    // This is just for laying out the label and spinner (spinners don't have to be inside a Stack)
    var rowProps = { horizontal: true, verticalAlign: 'center' };
    var tokens = {
        sectionStack: {
            childrenGap: 10,
        },
        spinnerStack: {
            childrenGap: 20,
        },
    };
    return (React.createElement(Stack, { tokens: tokens.sectionStack },
        React.createElement(Stack, __assign({}, rowProps, { tokens: tokens.spinnerStack }),
            React.createElement(Label, null, "Extra small spinner"),
            React.createElement(Spinner, { size: SpinnerSize.xSmall })),
        React.createElement(Stack, __assign({}, rowProps, { tokens: tokens.spinnerStack }),
            React.createElement(Label, null, "Small spinner"),
            React.createElement(Spinner, { size: SpinnerSize.small })),
        React.createElement(Stack, __assign({}, rowProps, { tokens: tokens.spinnerStack }),
            React.createElement(Label, null, "Medium spinner"),
            React.createElement(Spinner, { size: SpinnerSize.medium })),
        React.createElement(Stack, __assign({}, rowProps, { tokens: tokens.spinnerStack }),
            React.createElement(Label, null, "Large spinner"),
            React.createElement(Spinner, { size: SpinnerSize.large }))));
};
//# sourceMappingURL=Spinner.Basic.Example.js.map