import * as React from 'react';
import { ShimmerBasicExample } from './examples/Shimmer.Basic.Example';
import { ShimmerCustomElementsExample } from './examples/Shimmer.CustomElements.Example';
import { ShimmerLoadDataExample } from './examples/Shimmer.LoadData.Example';
import { ShimmerApplicationExample } from './examples/Shimmer.Application.Example';
import { ShimmerStylingExample } from './examples/Shimmer.Styling.Example';
var ShimmerBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Shimmer/examples/Shimmer.Basic.Example.tsx');
var ShimmerCustomExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Shimmer/examples/Shimmer.CustomElements.Example.tsx');
var ShimmerStylingExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Shimmer/examples/Shimmer.Styling.Example.tsx');
var ShimmerLoadDataExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Shimmer/examples/Shimmer.LoadData.Example.tsx');
var ShimmerApplicationExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Shimmer/examples/Shimmer.Application.Example.tsx');
export var ShimmerPageProps = {
    title: 'Shimmer',
    componentName: 'ShimmerExample',
    componentUrl: 'https://github.com/microsoft/fluentui/tree/master/packages/office-ui-fabric-react/src/components/Shimmer',
    examples: [
        {
            title: 'Shimmer with basic elements using the ~shimmerElements~ prop',
            code: ShimmerBasicExampleCode,
            view: React.createElement(ShimmerBasicExample, null),
        },
        {
            title: 'Shimmer with custom elements using the ~customElementsGroup~ prop',
            code: ShimmerCustomExampleCode,
            view: React.createElement(ShimmerCustomElementsExample, null),
        },
        {
            title: 'Shimmer swapping with the content it replaces',
            code: ShimmerLoadDataExampleCode,
            view: React.createElement(ShimmerLoadDataExample, null),
        },
        {
            title: 'Shimmered DetailsList simulating loading data asynchronously',
            code: ShimmerApplicationExampleCode,
            view: React.createElement(ShimmerApplicationExample, null),
        },
        {
            title: 'Shimmer styles customizations',
            code: ShimmerStylingExampleCode,
            view: React.createElement(ShimmerStylingExample, null),
        },
    ],
    overview: require('!raw-loader!office-ui-fabric-react/src/components/Shimmer/docs/ShimmerOverview.md'),
    dos: require('!raw-loader!office-ui-fabric-react/src/components/Shimmer/docs/ShimmerDos.md'),
    donts: require('!raw-loader!office-ui-fabric-react/src/components/Shimmer/docs/ShimmerDonts.md'),
    isHeaderVisible: true,
    isFeedbackVisible: true,
};
//# sourceMappingURL=Shimmer.doc.js.map