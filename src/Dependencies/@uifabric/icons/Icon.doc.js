import * as React from 'react';
import { IconBasicExample } from './examples/Icon.Basic.Example';
import { IconSvgExample } from './examples/Icon.Svg.Example';
import { IconColorExample } from './examples/Icon.Color.Example';
import { IconImageSheetExample } from './examples/Icon.ImageSheet.Example';
import { IconSvgFactoryExample } from './examples/Icon.SvgFactory.Example';
var IconBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Icon/examples/Icon.Basic.Example.tsx');
var IconSvgExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Icon/examples/Icon.Svg.Example.tsx');
var IconColorExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Icon/examples/Icon.Color.Example.tsx');
var IconImageSheetExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Icon/examples/Icon.ImageSheet.Example.tsx');
var IconSvgFactoryExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Icon/examples/Icon.SvgFactory.Example.tsx');
export var IconPageProps = {
    title: 'Icon',
    componentName: 'Icon',
    componentUrl: 'https://github.com/microsoft/fluentui/tree/master/packages/office-ui-fabric-react/src/components/Icon',
    examples: [
        {
            title: 'Icon',
            code: IconBasicExampleCode,
            view: React.createElement(IconBasicExample, null),
        },
        {
            title: 'Icon with custom color',
            code: IconColorExampleCode,
            view: React.createElement(IconColorExample, null),
        },
        {
            title: 'Icon using custom svg',
            code: IconSvgExampleCode,
            view: React.createElement(IconSvgExample, null),
        },
        {
            title: 'Icon using image sheet',
            code: IconImageSheetExampleCode,
            view: React.createElement(IconImageSheetExample, null),
        },
        {
            title: 'Icon using svg factory',
            code: IconSvgFactoryExampleCode,
            view: React.createElement(IconSvgFactoryExample, null),
        },
    ],
    overview: require('!raw-loader!office-ui-fabric-react/src/components/Icon/docs/IconOverview.md'),
    bestPractices: '',
    dos: require('!raw-loader!office-ui-fabric-react/src/components/Icon/docs/IconDos.md'),
    donts: require('!raw-loader!office-ui-fabric-react/src/components/Icon/docs/IconDonts.md'),
    isHeaderVisible: true,
    isFeedbackVisible: true,
    allowNativeProps: true,
};
//# sourceMappingURL=Icon.doc.js.map