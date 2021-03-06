import * as React from 'react';
import { PanelBasicExample } from './examples/Panel.Basic.Example';
import { PanelConfirmDismissExample } from './examples/Panel.ConfirmDismiss.Example';
import { PanelControlledExample } from './examples/Panel.Controlled.Example';
import { PanelFooterExample } from './examples/Panel.Footer.Example';
import { PanelNavigationExample } from './examples/Panel.Navigation.Example';
import { PanelHandleDismissTargetExample } from './examples/Panel.HandleDismissTarget.Example';
import { PanelHiddenOnDismissExample } from './examples/Panel.HiddenOnDismiss.Example';
import { PanelLightDismissExample } from './examples/Panel.LightDismiss.Example';
import { PanelLightDismissCustomExample } from './examples/Panel.LightDismissCustom.Example';
import { PanelNonModalExample } from './examples/Panel.NonModal.Example';
import { PanelSizesExample } from './examples/Panel.Sizes.Example';
var PanelBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Panel/examples/Panel.Basic.Example.tsx');
var PanelSizesExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Panel/examples/Panel.Sizes.Example.tsx');
var PanelConfirmDismissExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Panel/examples/Panel.ConfirmDismiss.Example.tsx');
var PanelControlledExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Panel/examples/Panel.Controlled.Example.tsx');
var PanelHiddenOnDismissExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Panel/examples/Panel.HiddenOnDismiss.Example.tsx');
var PanelLightDismissExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Panel/examples/Panel.LightDismiss.Example.tsx');
var PanelLightDismissCustomExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Panel/examples/Panel.LightDismissCustom.Example.tsx');
var PanelNonModalExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Panel/examples/Panel.NonModal.Example.tsx');
var PanelFooterExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Panel/examples/Panel.Footer.Example.tsx');
var PanelNavigationExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Panel/examples/Panel.Navigation.Example.tsx');
var PanelHandleDismissTargetExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Panel/examples/Panel.HandleDismissTarget.Example.tsx');
export var PanelPageProps = {
    title: 'Panel',
    componentName: 'Panel',
    componentUrl: 'https://github.com/microsoft/fluentui/tree/master/packages/office-ui-fabric-react/src/components/Panel',
    examples: [
        {
            title: 'Basic',
            code: PanelBasicExampleCode,
            view: React.createElement(PanelBasicExample, null),
        },
        {
            title: 'Size options',
            code: PanelSizesExampleCode,
            view: React.createElement(PanelSizesExample, null),
        },
        {
            title: 'Panel - Footer',
            code: PanelFooterExampleCode,
            view: React.createElement(PanelFooterExample, null),
        },
        {
            title: 'Light dismiss',
            code: PanelLightDismissExampleCode,
            view: React.createElement(PanelLightDismissExample, null),
        },
        {
            title: 'Hidden on dismiss',
            code: PanelHiddenOnDismissExampleCode,
            view: React.createElement(PanelHiddenOnDismissExample, null),
        },
        {
            title: 'Controlled visibility',
            code: PanelControlledExampleCode,
            view: React.createElement(PanelControlledExample, null),
        },
        {
            title: 'Confirm dismiss',
            code: PanelConfirmDismissExampleCode,
            view: React.createElement(PanelConfirmDismissExample, null),
        },
        {
            title: 'Confirm light dismiss',
            code: PanelLightDismissCustomExampleCode,
            view: React.createElement(PanelLightDismissCustomExample, null),
        },
        {
            title: 'Non-modal',
            code: PanelNonModalExampleCode,
            view: React.createElement(PanelNonModalExample, null),
        },
        {
            title: 'Panel - Custom navigation',
            code: PanelNavigationExampleCode,
            view: React.createElement(PanelNavigationExample, null),
        },
        {
            title: 'Panel - Detect dismissal method',
            code: PanelHandleDismissTargetExampleCode,
            view: React.createElement(PanelHandleDismissTargetExample, null),
        },
    ],
    overview: require('!raw-loader!office-ui-fabric-react/src/components/Panel/docs/PanelOverview.md'),
    bestPractices: '',
    dos: require('!raw-loader!office-ui-fabric-react/src/components/Panel/docs/PanelDos.md'),
    donts: require('!raw-loader!office-ui-fabric-react/src/components/Panel/docs/PanelDonts.md'),
    isHeaderVisible: true,
    isFeedbackVisible: true,
    allowNativeProps: true,
};
//# sourceMappingURL=Panel.doc.js.map