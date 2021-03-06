import * as React from 'react';
import { CalloutBasicExample } from './examples/Callout.Basic.Example';
import { StatusCalloutExample } from './examples/Callout.Status.Example';
import { CalloutFocusTrapExample } from './examples/Callout.FocusTrap.Example';
import { CalloutDirectionalExample } from './examples/Callout.Directional.Example';
import { CalloutCoverExample } from './examples/Callout.Cover.Example';
var CalloutBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Callout/examples/Callout.Basic.Example.tsx');
var StatusCalloutExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Callout/examples/Callout.Status.Example.tsx');
var CalloutFocusTrapExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Callout/examples/Callout.FocusTrap.Example.tsx');
var CalloutDirectionalExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Callout/examples/Callout.Directional.Example.tsx');
var CalloutCoverExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Callout/examples/Callout.Cover.Example.tsx');
export var CalloutPageProps = {
    title: 'Callout',
    componentName: 'Callout',
    componentUrl: 'https://github.com/microsoft/fluentui/tree/master/packages/office-ui-fabric-react/src/components/Callout',
    examples: [
        {
            title: 'Default Callout',
            code: CalloutBasicExampleCode,
            view: React.createElement(CalloutBasicExample, null),
        },
        {
            title: 'FocusTrapCallout Variant',
            code: CalloutFocusTrapExampleCode,
            view: React.createElement(CalloutFocusTrapExample, null),
        },
        {
            title: 'Non-focusable Callout with accessible text',
            code: StatusCalloutExampleCode,
            view: React.createElement(StatusCalloutExample, null),
        },
        {
            title: 'Callout with directional hint',
            code: CalloutDirectionalExampleCode,
            view: React.createElement(CalloutDirectionalExample, null),
        },
        {
            title: 'Callout that covers the target element',
            code: CalloutCoverExampleCode,
            view: React.createElement(CalloutCoverExample, null),
        },
    ],
    overview: require('!raw-loader!office-ui-fabric-react/src/components/Callout/docs/CalloutOverview.md'),
    bestPractices: '',
    dos: require('!raw-loader!office-ui-fabric-react/src/components/Callout/docs/CalloutDos.md'),
    donts: require('!raw-loader!office-ui-fabric-react/src/components/Callout/docs/CalloutDonts.md'),
    isHeaderVisible: true,
    isFeedbackVisible: true,
};
//# sourceMappingURL=Callout.doc.js.map