import * as React from 'react';
import { VerticalDividerBasicExample } from './examples/VerticalDivider.Basic.Example';
import { VerticalDividerCustomExample } from './examples/VerticalDivider.Custom.Example';
var VerticalDividerBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Divider/examples/VerticalDivider.Basic.Example.tsx');
var VerticalDividerCustomExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Divider/examples/VerticalDivider.Custom.Example.tsx');
export var DividerPageProps = {
    title: 'Divider',
    componentName: 'Divider',
    componentUrl: 'https://github.com/microsoft/fluentui/tree/master/packages/office-ui-fabric-react/src/components/Divider',
    examples: [
        {
            title: 'Vertical Divider',
            code: VerticalDividerBasicExampleCode,
            view: React.createElement(VerticalDividerBasicExample, null),
        },
        {
            title: 'Custom Vertical Divider',
            code: VerticalDividerCustomExampleCode,
            view: React.createElement(VerticalDividerCustomExample, null),
        },
    ],
    overview: require('!raw-loader!office-ui-fabric-react/src/components/Divider/docs/DividerOverview.md'),
    bestPractices: require('!raw-loader!office-ui-fabric-react/src/components/Divider/docs/DividerBestPractices.md'),
    dos: require('!raw-loader!office-ui-fabric-react/src/components/Divider/docs/DividerDos.md'),
    donts: require('!raw-loader!office-ui-fabric-react/src/components/Divider/docs/DividerDonts.md'),
    isHeaderVisible: true,
    isFeedbackVisible: true,
};
//# sourceMappingURL=Divider.doc.js.map