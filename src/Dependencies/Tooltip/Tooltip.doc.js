import * as React from 'react';
import { TooltipCustomExample } from './examples/Tooltip.Custom.Example';
import { TooltipBasicExample } from './examples/Tooltip.Basic.Example';
import { TooltipDisplayExample } from './examples/Tooltip.Display.Example';
import { TooltipInteractiveExample } from './examples/Tooltip.Interactive.Example';
import { TooltipOverflowExample } from './examples/Tooltip.Overflow.Example';
import { TooltipAbsolutePositionExample } from './examples/Tooltip.AbsolutePosition.Example';
var TooltipBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Tooltip/examples/Tooltip.Basic.Example.tsx');
var TooltipDisplayExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Tooltip/examples/Tooltip.Display.Example.tsx');
var TooltipCustomExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Tooltip/examples/Tooltip.Custom.Example.tsx');
var TooltipInteractiveExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Tooltip/examples/Tooltip.Interactive.Example.tsx');
var TooltipOverflowExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Tooltip/examples/Tooltip.Overflow.Example.tsx');
var TooltipAbsolutePositionExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Tooltip/examples/Tooltip.AbsolutePosition.Example.tsx');
export var TooltipPageProps = {
    title: 'Tooltip',
    componentName: 'Tooltip',
    componentUrl: 'https://github.com/microsoft/fluentui/tree/master/packages/office-ui-fabric-react/src/components/Tooltip',
    examples: [
        {
            title: 'Default Tooltip',
            code: TooltipBasicExampleCode,
            view: React.createElement(TooltipBasicExample, null),
        },
        {
            title: 'Tooltip wrapping inline or inline-block elements',
            code: TooltipDisplayExampleCode,
            view: React.createElement(TooltipDisplayExample, null),
        },
        {
            title: 'Tooltip with custom content',
            code: TooltipCustomExampleCode,
            view: React.createElement(TooltipCustomExample, null),
        },
        {
            title: 'Tooltip with a closing delay',
            code: TooltipInteractiveExampleCode,
            view: React.createElement(TooltipInteractiveExample, null),
        },
        {
            title: 'Tooltip only on overflow',
            code: TooltipOverflowExampleCode,
            view: React.createElement(TooltipOverflowExample, null),
        },
        {
            title: 'Tooltip on absolutely-positioned element',
            code: TooltipAbsolutePositionExampleCode,
            view: React.createElement(TooltipAbsolutePositionExample, null),
        },
    ],
    overview: require('!raw-loader!office-ui-fabric-react/src/components/Tooltip/docs/TooltipOverview.md'),
    isHeaderVisible: true,
    isFeedbackVisible: true,
    allowNativeProps: true,
};
//# sourceMappingURL=Tooltip.doc.js.map