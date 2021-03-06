import * as React from 'react';
import { FocusTrapZoneBoxExample } from './examples/FocusTrapZone.Box.Example';
var FocusTrapZoneBoxExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/FocusTrapZone/examples/FocusTrapZone.Box.Example.tsx');
import { FocusTrapZoneBoxCustomElementExample } from './examples/FocusTrapZone.Box.FocusOnCustomElement.Example';
var FocusTrapZoneBoxCustomElementExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/FocusTrapZone/examples/FocusTrapZone.Box.FocusOnCustomElement.Example.tsx');
import { FocusTrapZoneBoxClickExample } from './examples/FocusTrapZone.Box.Click.Example';
var FocusTrapZoneBoxClickExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/FocusTrapZone/examples/FocusTrapZone.Box.Click.Example.tsx');
import { FocusTrapZoneNestedExample } from './examples/FocusTrapZone.Nested.Example';
var FocusTrapZoneNestedExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/FocusTrapZone/examples/FocusTrapZone.Nested.Example.tsx');
import { FocusTrapZoneFocusZoneExample } from './examples/FocusTrapZone.FocusZone.Example';
var FocusTrapZoneFocusZoneExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/FocusTrapZone/examples/FocusTrapZone.FocusZone.Example.tsx');
import { FocusTrapZoneDialogInPanelExample } from './examples/FocusTrapZone.DialogInPanel.Example';
var FocusTrapZoneDialogInPanelExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/FocusTrapZone/examples/FocusTrapZone.DialogInPanel.Example.tsx');
export var FocusTrapZonePageProps = {
    title: 'FocusTrapZone',
    componentName: 'FocusTrapZone',
    componentUrl: 'https://github.com/microsoft/fluentui/tree/master/packages/office-ui-fabric-react/src/components/FocusTrapZone',
    examples: [
        {
            title: 'Simple box',
            code: FocusTrapZoneBoxExampleCode,
            view: React.createElement(FocusTrapZoneBoxExample, null),
        },
        {
            title: 'Simple box with focus on custom focusable element',
            code: FocusTrapZoneBoxCustomElementExampleCode,
            view: React.createElement(FocusTrapZoneBoxCustomElementExample, null),
        },
        {
            title: 'Simple box with clicking outside trap zone enabled',
            code: FocusTrapZoneBoxClickExampleCode,
            view: React.createElement(FocusTrapZoneBoxClickExample, null),
        },
        {
            title: 'Multiple nested FocusTrapZones',
            code: FocusTrapZoneNestedExampleCode,
            view: React.createElement(FocusTrapZoneNestedExample, null),
        },
        {
            title: 'FocusTrapZone with FocusZones',
            code: FocusTrapZoneFocusZoneExampleCode,
            view: React.createElement(FocusTrapZoneFocusZoneExample, null),
        },
        {
            title: 'A Dialog nested in a Panel',
            code: FocusTrapZoneDialogInPanelExampleCode,
            view: React.createElement(FocusTrapZoneDialogInPanelExample, null),
        },
    ],
    overview: require('!raw-loader!office-ui-fabric-react/src/components/FocusTrapZone/docs/FocusTrapZoneOverview.md'),
    bestPractices: '',
    dos: '',
    donts: '',
    isHeaderVisible: true,
    isFeedbackVisible: true,
    allowNativeProps: true,
};
//# sourceMappingURL=FocusTrapZone.doc.js.map