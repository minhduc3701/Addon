import * as React from 'react';
import { LabelBasicExample } from './examples/Label.Basic.Example';
var LabelBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Label/examples/Label.Basic.Example.tsx');
export var LabelPageProps = {
    title: 'Label',
    componentName: 'Label',
    componentUrl: 'https://github.com/microsoft/fluentui/tree/master/packages/office-ui-fabric-react/src/components/Label',
    examples: [
        {
            title: 'Label',
            code: LabelBasicExampleCode,
            view: React.createElement(LabelBasicExample, null),
        },
    ],
    overview: require('!raw-loader!office-ui-fabric-react/src/components/Label/docs/LabelOverview.md'),
    bestPractices: '',
    dos: require('!raw-loader!office-ui-fabric-react/src/components/Label/docs/LabelDos.md'),
    donts: require('!raw-loader!office-ui-fabric-react/src/components/Label/docs/LabelDonts.md'),
    isHeaderVisible: true,
    isFeedbackVisible: true,
    allowNativeProps: true,
};
//# sourceMappingURL=Label.doc.js.map