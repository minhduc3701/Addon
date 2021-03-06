import * as React from 'react';
import { OverlayDarkExample } from './examples/Overlay.Dark.Example';
import { OverlayLightExample } from './examples/Overlay.Light.Example';
var OverlayLightExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Overlay/examples/Overlay.Light.Example.tsx');
var OverlayDarkExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Overlay/examples/Overlay.Dark.Example.tsx');
export var OverlayPageProps = {
    title: 'Overlay',
    componentName: 'Overlay',
    componentUrl: 'https://github.com/microsoft/fluentui/tree/master/packages/office-ui-fabric-react/src/components/Overlay',
    examples: [
        {
            title: 'Light',
            code: OverlayLightExampleCode,
            view: React.createElement(OverlayLightExample, null),
        },
        {
            title: 'Dark',
            code: OverlayDarkExampleCode,
            view: React.createElement(OverlayDarkExample, null),
        },
    ],
    overview: require('!raw-loader!office-ui-fabric-react/src/components/Overlay/docs/OverlayOverview.md'),
    bestPractices: '',
    dos: require('!raw-loader!office-ui-fabric-react/src/components/Overlay/docs/OverlayDos.md'),
    donts: require('!raw-loader!office-ui-fabric-react/src/components/Overlay/docs/OverlayDonts.md'),
    isHeaderVisible: true,
    isFeedbackVisible: true,
    allowNativeProps: true,
};
//# sourceMappingURL=Overlay.doc.js.map