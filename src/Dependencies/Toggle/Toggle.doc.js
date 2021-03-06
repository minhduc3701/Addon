import * as React from 'react';
import { ToggleBasicExample } from './examples/Toggle.Basic.Example';
import { ToggleCustomLabelExample } from './examples/Toggle.CustomLabel.Example';
var ToggleBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Toggle/examples/Toggle.Basic.Example.tsx');
var ToggleCustomLabelExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Toggle/examples/Toggle.CustomLabel.Example.tsx');
export var TogglePageProps = {
    title: 'Toggle',
    componentName: 'Toggle',
    componentUrl: 'https://github.com/microsoft/fluentui/tree/master/packages/office-ui-fabric-react/src/components/Toggle',
    examples: [
        {
            title: 'Basic Toggles',
            code: ToggleBasicExampleCode,
            view: React.createElement(ToggleBasicExample, null),
        },
        {
            title: 'Toggles with Custom Labels',
            code: ToggleCustomLabelExampleCode,
            view: React.createElement(ToggleCustomLabelExample, null),
        },
    ],
    overview: require('!raw-loader!office-ui-fabric-react/src/components/Toggle/docs/ToggleOverview.md'),
    bestPractices: '',
    dos: require('!raw-loader!office-ui-fabric-react/src/components/Toggle/docs/ToggleDos.md'),
    donts: require('!raw-loader!office-ui-fabric-react/src/components/Toggle/docs/ToggleDonts.md'),
    isHeaderVisible: true,
    isFeedbackVisible: true,
    allowNativeProps: true,
    nativePropsElement: 'input',
};
//# sourceMappingURL=Toggle.doc.js.map