import * as React from 'react';
import { CheckboxBasicExample } from './examples/Checkbox.Basic.Example';
import { CheckboxIndeterminateExample } from './examples/Checkbox.Indeterminate.Example';
import { CheckboxOtherExample } from './examples/Checkbox.Other.Example';
var CheckboxBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Checkbox/examples/Checkbox.Basic.Example.tsx');
var CheckboxOtherExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Checkbox/examples/Checkbox.Other.Example.tsx');
var CheckboxIndeterminateExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Checkbox/examples/Checkbox.Indeterminate.Example.tsx');
export var CheckboxPageProps = {
    title: 'Checkbox',
    componentName: 'Checkbox',
    componentUrl: 'https://github.com/microsoft/fluentui/tree/master/packages/office-ui-fabric-react/src/components/Checkbox',
    examples: [
        {
            title: 'Basic Checkboxes',
            code: CheckboxBasicExampleCode,
            view: React.createElement(CheckboxBasicExample, null),
        },
        {
            title: 'Other Implementation Examples',
            code: CheckboxOtherExampleCode,
            view: React.createElement(CheckboxOtherExample, null),
        },
        {
            title: 'Indeterminate Checkboxes',
            code: CheckboxIndeterminateExampleCode,
            view: React.createElement(CheckboxIndeterminateExample, null),
        },
    ],
    overview: require('!raw-loader!office-ui-fabric-react/src/components/Checkbox/docs/CheckboxOverview.md'),
    bestPractices: '',
    dos: require('!raw-loader!office-ui-fabric-react/src/components/Checkbox/docs/CheckboxDos.md'),
    donts: require('!raw-loader!office-ui-fabric-react/src/components/Checkbox/docs/CheckboxDonts.md'),
    isHeaderVisible: true,
    isFeedbackVisible: true,
};
//# sourceMappingURL=Checkbox.doc.js.map