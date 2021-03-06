import * as React from 'react';
import { ScrollablePaneDefaultExample } from './examples/ScrollablePane.Default.Example';
import { ScrollablePaneDetailsListExample } from './examples/ScrollablePane.DetailsList.Example';
var ScrollablePaneDefaultExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ScrollablePane/examples/ScrollablePane.Default.Example.tsx');
var ScrollablePaneDetailsListExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ScrollablePane/examples/ScrollablePane.DetailsList.Example.tsx');
export var ScrollablePanePageProps = {
    title: 'ScrollablePane',
    componentName: 'ScrollablePane',
    componentUrl: 'https://github.com/microsoft/fluentui/tree/master/packages/office-ui-fabric-react/src/components/ScrollablePane',
    examples: [
        {
            title: 'Default',
            code: ScrollablePaneDefaultExampleCode,
            view: React.createElement(ScrollablePaneDefaultExample, null),
            isScrollable: false,
        },
        {
            title: 'DetailsList Locked Header',
            code: ScrollablePaneDetailsListExampleCode,
            view: React.createElement(ScrollablePaneDetailsListExample, null),
            isScrollable: false,
        },
    ],
    overview: require('!raw-loader!office-ui-fabric-react/src/components/ScrollablePane/docs/ScrollablePaneOverview.md'),
    bestPractices: '',
    dos: require('!raw-loader!office-ui-fabric-react/src/components/ScrollablePane/docs/ScrollablePaneDos.md'),
    donts: require('!raw-loader!office-ui-fabric-react/src/components/ScrollablePane/docs/ScrollablePaneDonts.md'),
    isHeaderVisible: true,
    isFeedbackVisible: true,
    allowNativeProps: true,
    nativePropsElement: ['a', 'button'],
};
//# sourceMappingURL=ScrollablePane.doc.js.map