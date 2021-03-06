import * as React from 'react';
import { DropdownBasicExample } from './examples/Dropdown.Basic.Example';
import { DropdownControlledExample } from './examples/Dropdown.Controlled.Example';
import { DropdownControlledMultiExample } from './examples/Dropdown.ControlledMulti.Example';
import { DropdownCustomExample } from './examples/Dropdown.Custom.Example';
import { DropdownErrorExample } from './examples/Dropdown.Error.Example';
import { DropdownRequiredExample } from './examples/Dropdown.Required.Example';
var DropdownBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Dropdown/examples/Dropdown.Basic.Example.tsx');
var DropdownControlledExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Dropdown/examples/Dropdown.Controlled.Example.tsx');
var DropdownControlledMultiExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Dropdown/examples/Dropdown.ControlledMulti.Example.tsx');
var DropdownCustomExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Dropdown/examples/Dropdown.Custom.Example.tsx');
var DropdownErrorExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Dropdown/examples/Dropdown.Error.Example.tsx');
var DropdownRequiredExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Dropdown/examples/Dropdown.Required.Example.tsx');
export var DropdownPageProps = {
    title: 'Dropdown',
    componentName: 'Dropdown',
    componentUrl: 'https://github.com/microsoft/fluentui/tree/master/packages/office-ui-fabric-react/src/components/Dropdown',
    examples: [
        {
            title: 'Basic Dropdowns',
            code: DropdownBasicExampleCode,
            view: React.createElement(DropdownBasicExample, null),
        },
        {
            title: 'Controlled single-select Dropdown',
            code: DropdownControlledExampleCode,
            view: React.createElement(DropdownControlledExample, null),
        },
        {
            title: 'Controlled multi-select Dropdown',
            code: DropdownControlledMultiExampleCode,
            view: React.createElement(DropdownControlledMultiExample, null),
        },
        {
            title: 'Customized Dropdown',
            code: DropdownCustomExampleCode,
            view: React.createElement(DropdownCustomExample, null),
        },
        {
            title: 'Dropdown with error message',
            code: DropdownErrorExampleCode,
            view: React.createElement(DropdownErrorExample, null),
        },
        {
            title: 'Required Dropdown',
            code: DropdownRequiredExampleCode,
            view: (React.createElement(React.Fragment, null,
                React.createElement("p", null, "This example also demonstrates how to programmatically set focus on and open a Dropdown."),
                React.createElement(DropdownRequiredExample, null))),
        },
    ],
    overview: require('!raw-loader!office-ui-fabric-react/src/components/Dropdown/docs/DropdownOverview.md'),
    bestPractices: '',
    dos: require('!raw-loader!office-ui-fabric-react/src/components/Dropdown/docs/DropdownDos.md'),
    donts: require('!raw-loader!office-ui-fabric-react/src/components/Dropdown/docs/DropdownDonts.md'),
    isHeaderVisible: true,
    isFeedbackVisible: true,
    allowNativeProps: true,
};
//# sourceMappingURL=Dropdown.doc.js.map