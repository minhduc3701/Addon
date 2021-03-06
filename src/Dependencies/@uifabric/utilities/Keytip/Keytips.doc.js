import * as React from 'react';
import { KeytipsBasicExample } from './examples/Keytips.Basic.Example';
import { KeytipsButtonExample } from './examples/Keytips.Button.Example';
import { KeytipsCommandBarExample } from './examples/Keytips.CommandBar.Example';
import { KeytipsOverflowExample } from './examples/Keytips.Overflow.Example';
import { KeytipsDynamicExample } from './examples/Keytips.Dynamic.Example';
var KeytipsBasicCode = require('!raw-loader!office-ui-fabric-react/src/components/Keytip/examples/Keytips.Basic.Example.tsx');
var KeytipsButtonCode = require('!raw-loader!office-ui-fabric-react/src/components/Keytip/examples/Keytips.Button.Example.tsx');
var KeytipsCommandBarCode = require('!raw-loader!office-ui-fabric-react/src/components/Keytip/examples/Keytips.CommandBar.Example.tsx');
var KeytipsOverflowCode = require('!raw-loader!office-ui-fabric-react/src/components/Keytip/examples/Keytips.Overflow.Example.tsx');
var KeytipsDynamicCode = require('!raw-loader!office-ui-fabric-react/src/components/Keytip/examples/Keytips.Dynamic.Example.tsx');
export var KeytipsPageProps = {
    title: 'Keytips',
    componentName: 'Keytips',
    componentUrl: 'https://github.com/microsoft/fluentui/tree/master/packages/office-ui-fabric-react/src/components/Keytips',
    examples: [
        {
            title: 'Keytips on Buttons',
            code: KeytipsButtonCode,
            view: React.createElement(KeytipsButtonExample, null),
        },
        {
            title: 'Keytips in a CommandBar',
            code: KeytipsCommandBarCode,
            view: React.createElement(KeytipsCommandBarExample, null),
        },
        {
            title: 'Keytips in an OverflowWell',
            code: KeytipsOverflowCode,
            view: React.createElement(KeytipsOverflowExample, null),
        },
        {
            title: 'Keytips in Pivots',
            code: KeytipsBasicCode,
            view: React.createElement(KeytipsBasicExample, null),
        },
        {
            title: 'Dyanmically updating keytips',
            code: KeytipsDynamicCode,
            view: React.createElement(KeytipsDynamicExample, null),
        },
    ],
    overview: require('!raw-loader!office-ui-fabric-react/src/components/Keytip/docs/KeytipOverview.md'),
    bestPractices: '',
    dos: require('!raw-loader!office-ui-fabric-react/src/components/Keytip/docs/KeytipDos.md'),
    donts: require('!raw-loader!office-ui-fabric-react/src/components/Keytip/docs/KeytipDonts.md'),
    isHeaderVisible: true,
    isFeedbackVisible: true,
};
//# sourceMappingURL=Keytips.doc.js.map