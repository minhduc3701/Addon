import * as React from 'react';
import { TextFieldBasicExample } from './examples/TextField.Basic.Example';
import { TextFieldBorderlessExample } from './examples/TextField.Borderless.Example';
import { TextFieldCustomRenderExample } from './examples/TextField.CustomRender.Example';
import { TextFieldErrorMessageExample } from './examples/TextField.ErrorMessage.Example';
import { TextFieldMultilineExample } from './examples/TextField.Multiline.Example';
import { TextFieldControlledExample } from './examples/TextField.Controlled.Example';
import { TextFieldPrefixAndSuffixExample } from './examples/TextField.PrefixAndSuffix.Example';
import { TextFieldStyledExample } from './examples/TextField.Styled.Example';
import { TextFieldMaskedExample } from './examples/TextField.Masked.Example';
var TextFieldBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/TextField/examples/TextField.Basic.Example.tsx');
var TextFieldBorderlessExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/TextField/examples/TextField.Borderless.Example.tsx');
var TextFieldCustomRenderExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/TextField/examples/TextField.CustomRender.Example.tsx');
var TextFieldErrorMessageExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/TextField/examples/TextField.ErrorMessage.Example.tsx');
var TextFieldMultilineExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/TextField/examples/TextField.Multiline.Example.tsx');
var TextFieldControlledExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/TextField/examples/TextField.Controlled.Example.tsx');
var TextFieldPrefixAndSuffixExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/TextField/examples/TextField.PrefixAndSuffix.Example.tsx');
var TextFieldStyledExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/TextField/examples/TextField.Styled.Example.tsx');
var TextFieldMaskedExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/TextField/examples/TextField.Masked.Example.tsx');
export var TextFieldPageProps = {
    title: 'TextField',
    componentName: 'TextField',
    componentUrl: 'https://github.com/microsoft/fluentui/tree/master/packages/office-ui-fabric-react/src/components/TextField',
    examples: [
        {
            title: 'Basic TextFields',
            code: TextFieldBasicExampleCode,
            view: React.createElement(TextFieldBasicExample, null),
        },
        {
            title: 'Controlled TextFields',
            code: TextFieldControlledExampleCode,
            view: React.createElement(TextFieldControlledExample, null),
        },
        {
            title: 'Multiline TextField',
            code: TextFieldMultilineExampleCode,
            view: React.createElement(TextFieldMultilineExample, null),
        },
        {
            title: 'Underlined and borderless TextFields',
            code: TextFieldBorderlessExampleCode,
            view: React.createElement(TextFieldBorderlessExample, null),
        },
        {
            title: 'Customizable Masked TextField',
            code: TextFieldMaskedExampleCode,
            view: React.createElement(TextFieldMaskedExample, null),
        },
        {
            title: 'TextField with prefix and/or suffix',
            code: TextFieldPrefixAndSuffixExampleCode,
            view: React.createElement(TextFieldPrefixAndSuffixExample, null),
        },
        {
            title: 'TextFields with custom rendering',
            code: TextFieldCustomRenderExampleCode,
            view: React.createElement(TextFieldCustomRenderExample, null),
        },
        {
            title: 'TextField error message variations',
            code: TextFieldErrorMessageExampleCode,
            view: React.createElement(TextFieldErrorMessageExample, null),
        },
        {
            title: 'TextField subcomponent styling',
            code: TextFieldStyledExampleCode,
            view: React.createElement(TextFieldStyledExample, null),
        },
    ],
    overview: require('!raw-loader!office-ui-fabric-react/src/components/TextField/docs/TextFieldOverview.md'),
    bestPractices: '',
    dos: require('!raw-loader!office-ui-fabric-react/src/components/TextField/docs/TextFieldDos.md'),
    donts: require('!raw-loader!office-ui-fabric-react/src/components/TextField/docs/TextFieldDonts.md'),
    isHeaderVisible: false,
    isFeedbackVisible: true,
    allowNativeProps: true,
    nativePropsElement: ['input', 'textarea'],
};
//# sourceMappingURL=TextField.doc.js.map