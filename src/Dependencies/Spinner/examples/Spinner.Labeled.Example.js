import * as React from 'react';
import { Spinner } from 'office-ui-fabric-react/lib/Spinner';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { Label } from 'office-ui-fabric-react/lib/Label';
export var SpinnerLabeledExample = function () {
    var stackTokens = {
        childrenGap: 20,
        maxWidth: 250,
    };
    return (React.createElement(Stack, { tokens: stackTokens },
        React.createElement("div", null,
            React.createElement(Label, null, "Spinner with label positioned below"),
            React.createElement(Spinner, { label: "I am definitely loading..." })),
        React.createElement("div", null,
            React.createElement(Label, null, "Spinner with label positioned above"),
            React.createElement(Spinner, { label: "Seriously, still loading...", ariaLive: "assertive", labelPosition: "top" })),
        React.createElement("div", null,
            React.createElement(Label, null, "Spinner with label positioned to right"),
            React.createElement(Spinner, { label: "Wait, wait...", ariaLive: "assertive", labelPosition: "right" })),
        React.createElement("div", null,
            React.createElement(Label, null, "Spinner with label positioned to left"),
            React.createElement(Spinner, { label: "Nope, still loading...", ariaLive: "assertive", labelPosition: "left" }))));
};
//# sourceMappingURL=Spinner.Labeled.Example.js.map