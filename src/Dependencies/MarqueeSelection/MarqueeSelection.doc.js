import * as React from 'react';
import { MarqueeSelectionBasicExample } from './examples/MarqueeSelection.Basic.Example';
var MarqueeSelectionBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/MarqueeSelection/examples/MarqueeSelection.Basic.Example.tsx');
export var MarqueeSelectionPageProps = {
    title: 'MarqueeSelection',
    componentName: 'MarqueeSelection',
    componentUrl: 'https://github.com/microsoft/fluentui/tree/master/packages/office-ui-fabric-react/src/components/MarqueeSelection',
    examples: [
        {
            title: 'Basic Selection Example',
            code: MarqueeSelectionBasicExampleCode,
            view: React.createElement(MarqueeSelectionBasicExample, null),
        },
    ],
    overview: require('!raw-loader!office-ui-fabric-react/src/components/MarqueeSelection/docs/MarqueeSelectionOverview.md'),
    bestPractices: '',
    dos: '',
    donts: '',
    isHeaderVisible: true,
    isFeedbackVisible: true,
};
//# sourceMappingURL=MarqueeSelection.doc.js.map