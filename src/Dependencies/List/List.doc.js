import * as React from 'react';
import { ListBasicExample } from './examples/List.Basic.Example';
import { ListGridExample } from './examples/List.Grid.Example';
import { ListScrollingExample } from './examples/List.Scrolling.Example';
import { ListGhostingExample } from './examples/List.Ghosting.Example';
var ListBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/List/examples/List.Basic.Example.tsx');
var ListGridExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/List/examples/List.Grid.Example.tsx');
var ListScrollingExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/List/examples/List.Scrolling.Example.tsx');
var ListGhostingExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/List/examples/List.Ghosting.Example.tsx');
export var ListPageProps = {
    title: 'List',
    componentName: 'ListExample',
    componentUrl: 'https://github.com/microsoft/fluentui/tree/master/packages/office-ui-fabric-react/src/components/List',
    examples: [
        {
            title: 'List of 5000 grid items',
            code: ListGridExampleCode,
            view: React.createElement(ListGridExample, null),
        },
        {
            title: 'List of 5000 variable height items',
            code: ListBasicExampleCode,
            view: React.createElement(ListBasicExample, null),
        },
        {
            title: 'Scrolling items into view',
            code: ListScrollingExampleCode,
            view: React.createElement(ListScrollingExample, null),
        },
        {
            title: 'Rendering ghost items while the list is scrolling',
            code: ListGhostingExampleCode,
            view: React.createElement(ListGhostingExample, null),
        },
    ],
    allowNativeProps: true,
    overview: require('!raw-loader!office-ui-fabric-react/src/components/List/docs/ListOverview.md'),
    isHeaderVisible: true,
    isFeedbackVisible: true,
};
//# sourceMappingURL=List.doc.js.map