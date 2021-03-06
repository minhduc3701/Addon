import * as React from 'react';
import { LayerBasicExample } from './examples/Layer.Basic.Example';
import { LayerHostedExample } from './examples/Layer.Hosted.Example';
import { LayerCustomizedExample } from './examples/Layer.Customized.Example';
import { LayerNestedLayersExample } from './examples/Layer.NestedLayers.Example';
var LayerBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Layer/examples/Layer.Basic.Example.tsx');
var LayerHostedExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Layer/examples/Layer.Hosted.Example.tsx');
var LayerCustomizedExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Layer/examples/Layer.Customized.Example.tsx');
var LayerNestedLayersExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Layer/examples/Layer.NestedLayers.Example.tsx');
export var LayerPageProps = {
    title: 'Layer',
    componentName: 'Layer',
    componentUrl: 'https://github.com/microsoft/fluentui/tree/master/packages/office-ui-fabric-react/src/components/Layer',
    examples: [
        {
            title: 'Basic layered content',
            code: LayerBasicExampleCode,
            view: React.createElement(LayerBasicExample, null),
        },
        {
            title: 'Using LayerHost to control projection',
            code: LayerHostedExampleCode,
            view: React.createElement(LayerHostedExample, null),
        },
        {
            title: 'Using Customizer to control the default layer behavior',
            code: LayerCustomizedExampleCode,
            view: React.createElement(LayerCustomizedExample, null),
        },
        {
            title: 'Nested Layers Example',
            code: LayerNestedLayersExampleCode,
            view: React.createElement(LayerNestedLayersExample, null),
        },
    ],
    overview: require('!raw-loader!office-ui-fabric-react/src/components/Layer/docs/LayerOverview.md'),
    bestPractices: '',
    dos: require('!raw-loader!office-ui-fabric-react/src/components/Layer/docs/LayerDos.md'),
    donts: require('!raw-loader!office-ui-fabric-react/src/components/Layer/docs/LayerDonts.md'),
    isHeaderVisible: true,
    isFeedbackVisible: true,
};
//# sourceMappingURL=Layer.doc.js.map