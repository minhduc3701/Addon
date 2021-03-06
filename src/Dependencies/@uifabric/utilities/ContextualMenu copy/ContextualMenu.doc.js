import * as React from 'react';
import { ContextualMenuBasicExample } from './examples/ContextualMenu.Basic.Example';
import { ContextualMenuDefaultExample } from './examples/ContextualMenu.Default.Example';
import { ContextualMenuIconExample } from './examples/ContextualMenu.Icon.Example';
import { ContextualMenuIconSecondaryTextExample } from './examples/ContextualMenu.Icon.SecondaryText.Example';
import { ContextualMenuSubmenuExample } from './examples/ContextualMenu.Submenu.Example';
import { ContextualMenuSectionExample } from './examples/ContextualMenu.Section.Example';
import { ContextualMenuCheckmarksExample } from './examples/ContextualMenu.Checkmarks.Example';
import { ContextualMenuDirectionalExample } from './examples/ContextualMenu.Directional.Example';
import { ContextualMenuCustomizationExample } from './examples/ContextualMenu.Customization.Example';
import { ContextualMenuCustomizationWithNoWrapExample } from './examples/ContextualMenu.CustomizationWithNoWrap.Example';
import { ContextualMenuWithScrollBarExample } from './examples/ContextualMenu.ScrollBar.Example';
import { ContextualMenuWithCustomMenuItemExample } from './examples/ContextualMenu.CustomMenuItem.Example';
import { ContextualMenuWithCustomMenuListExample } from './examples/ContextualMenu.CustomMenuList.Example';
import { ContextualMenuHeaderExample } from './examples/ContextualMenu.Header.Example';
import { ContextualMenuPersistedExample } from './examples/ContextualMenu.Persisted.Example';
var ContextualMenuBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ContextualMenu/examples/ContextualMenu.Basic.Example.tsx');
var ContextualMenuDefaultExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ContextualMenu/examples/ContextualMenu.Default.Example.tsx');
var ContextualMenuPersistedExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ContextualMenu/examples/ContextualMenu.Persisted.Example.tsx');
var ContextualMenuIconExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ContextualMenu/examples/ContextualMenu.Icon.Example.tsx');
var ContextualMenuIconSecondaryTextExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ContextualMenu/examples/ContextualMenu.Icon.SecondaryText.Example.tsx');
var ContextualMenuSubmenuExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ContextualMenu/examples/ContextualMenu.Submenu.Example.tsx');
var ContextualMenuSectionExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ContextualMenu/examples/ContextualMenu.Section.Example.tsx');
var ContextualMenuCheckmarksExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ContextualMenu/examples/ContextualMenu.Checkmarks.Example.tsx');
var ContextualMenuDirectionalExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ContextualMenu/examples/ContextualMenu.Directional.Example.tsx');
var ContextualMenuCustomizationExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ContextualMenu/examples/ContextualMenu.Customization.Example.tsx');
var ContextualMenuCustomizationWithNoWrapExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ContextualMenu/examples/ContextualMenu.CustomizationWithNoWrap.Example.tsx');
var ContextualMenuWithScrollBarExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ContextualMenu/examples/ContextualMenu.ScrollBar.Example.tsx');
var ContextualMenuWithCustomMenuItemExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ContextualMenu/examples/ContextualMenu.CustomMenuItem.Example.tsx');
var ContextualMenuCustomMenuListExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ContextualMenu/examples/ContextualMenu.CustomMenuList.Example.tsx');
var ContextualMenuHeaderExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ContextualMenu/examples/ContextualMenu.Header.Example.tsx');
export var ContextualMenuPageProps = {
    title: 'ContextualMenu',
    componentName: 'ContextualMenu',
    componentUrl: 'https://github.com/microsoft/fluentui/tree/master/packages/office-ui-fabric-react/src/components/ContextualMenu',
    examples: [
        {
            title: 'Basic ContextualMenu',
            code: ContextualMenuBasicExampleCode,
            view: React.createElement(ContextualMenuBasicExample, null),
        },
        {
            title: 'Default ContextualMenu',
            code: ContextualMenuDefaultExampleCode,
            view: React.createElement(ContextualMenuDefaultExample, null),
        },
        {
            title: 'ContextualMenu which is persisted in the DOM',
            code: ContextualMenuPersistedExampleCode,
            view: React.createElement(ContextualMenuPersistedExample, null),
        },
        {
            title: 'ContextualMenu with icons',
            code: ContextualMenuIconExampleCode,
            view: React.createElement(ContextualMenuIconExample, null),
        },
        {
            title: 'ContextualMenu with icons and secondary text',
            code: ContextualMenuIconSecondaryTextExampleCode,
            view: React.createElement(ContextualMenuIconSecondaryTextExample, null),
        },
        {
            title: 'ContextualMenu with submenus',
            code: ContextualMenuSubmenuExampleCode,
            view: React.createElement(ContextualMenuSubmenuExample, null),
        },
        {
            title: 'ContextualMenu with section headers',
            code: ContextualMenuSectionExampleCode,
            view: React.createElement(ContextualMenuSectionExample, null),
        },
        {
            title: 'ContextualMenu with checkable menu items and toggleable split button',
            code: ContextualMenuCheckmarksExampleCode,
            view: React.createElement(ContextualMenuCheckmarksExample, null),
        },
        {
            title: 'ContextualMenu with beak and directional settings',
            code: ContextualMenuDirectionalExampleCode,
            view: React.createElement(ContextualMenuDirectionalExample, null),
        },
        {
            title: 'ContextualMenu with customized submenus',
            code: ContextualMenuCustomizationExampleCode,
            view: React.createElement(ContextualMenuCustomizationExample, null),
        },
        {
            title: 'ContextualMenu with customized submenus and noWrap attributes',
            code: ContextualMenuCustomizationWithNoWrapExampleCode,
            view: React.createElement(ContextualMenuCustomizationWithNoWrapExample, null),
        },
        {
            title: 'ContextualMenu with a scroll bar and fixed direction',
            code: ContextualMenuWithScrollBarExampleCode,
            view: React.createElement(ContextualMenuWithScrollBarExample, null),
        },
        {
            title: 'ContextualMenu with custom rendered menu items',
            code: ContextualMenuWithCustomMenuItemExampleCode,
            view: React.createElement(ContextualMenuWithCustomMenuItemExample, null),
        },
        {
            title: 'ContextualMenu with custom rendered menu list that renders a search box to filter menu items',
            code: ContextualMenuCustomMenuListExampleCode,
            view: React.createElement(ContextualMenuWithCustomMenuListExample, null),
        },
        {
            title: 'ContextualMenu with header',
            code: ContextualMenuHeaderExampleCode,
            view: React.createElement(ContextualMenuHeaderExample, null),
        },
    ],
    overview: require('!raw-loader!office-ui-fabric-react/src/components/ContextualMenu/docs/ContextualMenuOverview.md'),
    bestPractices: '',
    dos: require('!raw-loader!office-ui-fabric-react/src/components/ContextualMenu/docs/ContextualMenuDos.md'),
    donts: require('!raw-loader!office-ui-fabric-react/src/components/ContextualMenu/docs/ContextualMenuDonts.md'),
    isHeaderVisible: true,
    isFeedbackVisible: true,
};
//# sourceMappingURL=ContextualMenu.doc.js.map