import * as React from 'react';
import { SpinButtonBasicExample } from './examples/SpinButton.Basic.Example';
import { SpinButtonBasicDisabledExample } from './examples/SpinButton.BasicDisabled.Example';
import { SpinButtonStatefulExample } from './examples/SpinButton.Stateful.Example';
import { SpinButtonBasicWithIconExample } from './examples/SpinButton.BasicWithIcon.Example';
import { SpinButtonBasicWithIconDisabledExample } from './examples/SpinButton.BasicWithIconDisabled.Example';
import { SpinButtonBasicWithEndPositionExample } from './examples/SpinButton.BasicWithEndPosition.Example';
import { SpinButtonCustomStyledExample } from './examples/SpinButton.CustomStyled.Example';
var SpinButtonBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/SpinButton/examples/SpinButton.Basic.Example.tsx');
var SpinButtonBasicDisabledExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/SpinButton/examples/SpinButton.BasicDisabled.Example.tsx');
var SpinButtonStatefulExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/SpinButton/examples/SpinButton.Stateful.Example.tsx');
var SpinButtonBasicWithIconExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/SpinButton/examples/SpinButton.BasicWithIcon.Example.tsx');
var SpinButtonBasicWithIconDisabledExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/SpinButton/examples/SpinButton.BasicWithIconDisabled.Example.tsx');
var SpinButtonBasicWithEndPositionExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/SpinButton/examples/SpinButton.BasicWithEndPosition.Example.tsx');
var SpinButtonCustomStyledExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/SpinButton/examples/SpinButton.CustomStyled.Example.tsx');
export var SpinButtonPageProps = {
    title: 'SpinButton',
    componentName: 'SpinButton',
    componentUrl: 'https://github.com/microsoft/fluentui/tree/master/packages/office-ui-fabric-react/src/components/SpinButton',
    examples: [
        {
            title: 'Basic SpinButton',
            code: SpinButtonBasicExampleCode,
            view: React.createElement(SpinButtonBasicExample, null),
        },
        {
            title: 'Basic Disabled SpinButton',
            code: SpinButtonBasicDisabledExampleCode,
            view: React.createElement(SpinButtonBasicDisabledExample, null),
        },
        {
            title: 'Stateful SpinButton',
            code: SpinButtonStatefulExampleCode,
            view: React.createElement(SpinButtonStatefulExample, null),
        },
        {
            title: 'Basic SpinButton With Icon',
            code: SpinButtonBasicWithIconExampleCode,
            view: React.createElement(SpinButtonBasicWithIconExample, null),
        },
        {
            title: 'Basic SpinButton With Icon Disabled',
            code: SpinButtonBasicWithIconDisabledExampleCode,
            view: React.createElement(SpinButtonBasicWithIconDisabledExample, null),
        },
        {
            title: 'Basic SpinButton With Icon and Positioned at the End',
            code: SpinButtonBasicWithEndPositionExampleCode,
            view: React.createElement(SpinButtonBasicWithEndPositionExample, null),
        },
        {
            title: 'Custom Styled SpinButton',
            code: SpinButtonCustomStyledExampleCode,
            view: React.createElement(SpinButtonCustomStyledExample, null),
        },
    ],
    overview: require('!raw-loader!office-ui-fabric-react/src/components/SpinButton/docs/SpinButtonOverview.md'),
    bestPractices: '',
    dos: require('!raw-loader!office-ui-fabric-react/src/components/SpinButton/docs/SpinButtonDos.md'),
    donts: require('!raw-loader!office-ui-fabric-react/src/components/SpinButton/docs/SpinButtonDonts.md'),
    isHeaderVisible: true,
    isFeedbackVisible: true,
};
//# sourceMappingURL=SpinButton.doc.js.map