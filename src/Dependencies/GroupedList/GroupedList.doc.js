import * as React from 'react';
import { GroupedListBasicExample } from './examples/GroupedList.Basic.Example';
import { GroupedListCustomExample } from './examples/GroupedList.Custom.Example';
import { GroupedListCustomCheckboxExample } from './examples/GroupedList.CustomCheckbox.Example';
var GroupedListBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/GroupedList/examples/GroupedList.Basic.Example.tsx');
var GroupedListCustomExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/GroupedList/examples/GroupedList.Custom.Example.tsx');
var GroupedListCustomCheckboxExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/GroupedList/examples/GroupedList.CustomCheckbox.Example.tsx');
export var GroupedListPageProps = {
    title: 'GroupedList',
    componentName: 'GroupedList',
    componentUrl: 'https://github.com/microsoft/fluentui/tree/master/packages/office-ui-fabric-react/src/components/GroupedList',
    examples: [
        {
            title: 'GroupedList basic example',
            code: GroupedListBasicExampleCode,
            view: React.createElement(GroupedListBasicExample, null),
        },
        {
            title: 'GroupedList example with custom header and footer',
            code: GroupedListCustomExampleCode,
            view: React.createElement(GroupedListCustomExample, null),
        },
        {
            title: 'GroupedList example with custom checkbox',
            code: GroupedListCustomCheckboxExampleCode,
            view: React.createElement(GroupedListCustomCheckboxExample, null),
        },
    ],
    overview: require('!raw-loader!office-ui-fabric-react/src/components/GroupedList/docs/GroupedListOverview.md'),
    bestPractices: '',
    dos: '',
    donts: '',
    isHeaderVisible: true,
    isFeedbackVisible: true,
};
//# sourceMappingURL=GroupedList.doc.js.map