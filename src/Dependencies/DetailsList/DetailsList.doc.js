import * as React from 'react';
import { DetailsListBasicExample } from './examples/DetailsList.Basic.Example';
var DetailsListBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/DetailsList/examples/DetailsList.Basic.Example.tsx');
import { DetailsListAnimationExample } from './examples/DetailsList.Animation.Example';
var DetailsListAnimationExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/DetailsList/examples/DetailsList.Animation.Example.tsx');
import { DetailsListCompactExample } from './examples/DetailsList.Compact.Example';
var DetailsListCompactExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/DetailsList/examples/DetailsList.Compact.Example.tsx');
import { DetailsListCustomColumnsExample } from './examples/DetailsList.CustomColumns.Example';
var DetailsListCustomColumnsExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/DetailsList/examples/DetailsList.CustomColumns.Example.tsx');
import { DetailsListCustomRowsExample } from './examples/DetailsList.CustomRows.Example';
var DetailsListCustomRowsExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/DetailsList/examples/DetailsList.CustomRows.Example.tsx');
import { DetailsListCustomGroupHeadersExample } from './examples/DetailsList.CustomGroupHeaders.Example';
var DetailsListCustomGroupHeadersExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/DetailsList/examples/DetailsList.CustomGroupHeaders.Example.tsx');
import { DetailsListAdvancedExample } from './examples/DetailsList.Advanced.Example';
var DetailsListAdvancedExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/DetailsList/examples/DetailsList.Advanced.Example.tsx');
import { DetailsListGroupedExample } from './examples/DetailsList.Grouped.Example';
var DetailsListGroupedExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/DetailsList/examples/DetailsList.Grouped.Example.tsx');
import { DetailsListGroupedLargeExample } from './examples/DetailsList.Grouped.Large.Example';
var DetailsListGroupedLargeExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/DetailsList/examples/DetailsList.Grouped.Large.Example.tsx');
import { DetailsListDragDropExample } from './examples/DetailsList.DragDrop.Example';
var DetailsListDragDropExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/DetailsList/examples/DetailsList.DragDrop.Example.tsx');
import { DetailsListDocumentsExample } from './examples/DetailsList.Documents.Example';
var DetailsListDocumentsExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/DetailsList/examples/DetailsList.Documents.Example.tsx');
import { DetailsListNavigatingFocusExample } from './examples/DetailsList.NavigatingFocus.Example';
var DetailsListNavigatingFocusExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/DetailsList/examples/DetailsList.NavigatingFocus.Example.tsx');
import { ShimmerApplicationExample as DetailsListShimmerExample } from '../Shimmer/examples/Shimmer.Application.Example';
var DetailsListShimmerExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Shimmer/examples/Shimmer.Application.Example.tsx');
import { DetailsListCustomFooterExample } from './examples/DetailsList.CustomFooter.Example';
var DetailsListCustomFooterExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/DetailsList/examples/DetailsList.CustomFooter.Example.tsx');
export var DetailsListPageProps = {
    title: 'DetailsList',
    componentName: 'DetailsList',
    componentUrl: 'https://github.com/microsoft/fluentui/tree/master/packages/office-ui-fabric-react/src/components/DetailsList',
    examples: [
        {
            title: 'DetailsList with 500 documents, sorting, filtering, marquee selection, justified columns',
            code: DetailsListDocumentsExampleCode,
            view: React.createElement(DetailsListDocumentsExample, null),
        },
    ],
    overview: require('!raw-loader!office-ui-fabric-react/src/components/DetailsList/docs/DetailsListOverview.md'),
    bestPractices: '',
    dos: require('!raw-loader!office-ui-fabric-react/src/components/DetailsList/docs/DetailsListDos.md'),
    donts: require('!raw-loader!office-ui-fabric-react/src/components/DetailsList/docs/DetailsListDonts.md'),
    isHeaderVisible: true,
};
function generateProps(example) {
    return {
        title: example.title,
        componentName: 'DetailsList',
        componentUrl: 'https://github.com/microsoft/fluentui/tree/master/packages/office-ui-fabric-react/src/components/DetailsList',
        examples: [example],
        isHeaderVisible: false,
        isFeedbackVisible: true,
    };
}
export var DetailsListBasicPageProps = generateProps({
    title: 'Simple DetailsList with filtering and marquee selection',
    code: DetailsListBasicExampleCode,
    view: React.createElement(DetailsListBasicExample, null),
});
export var DetailsListAnimationPageProps = generateProps({
    title: 'DetailsList with Row animation when cell content changed',
    code: DetailsListAnimationExampleCode,
    view: React.createElement(DetailsListAnimationExample, null),
});
export var DetailsListCompactPageProps = generateProps({
    title: 'Compact DetailsList with filtering and marquee selection',
    code: DetailsListCompactExampleCode,
    view: React.createElement(DetailsListCompactExample, null),
});
export var DetailsListSimpleGroupedPageProps = generateProps({
    title: 'Simple grouped DetailsList',
    code: DetailsListGroupedExampleCode,
    view: React.createElement(DetailsListGroupedExample, null),
});
export var DetailsListLargeGroupedPageProps = generateProps({
    title: 'Large grouped DetailsList',
    code: DetailsListGroupedLargeExampleCode,
    view: React.createElement(DetailsListGroupedLargeExample, null),
});
export var DetailsListCustomColumnsPageProps = generateProps({
    title: 'Rendering custom item columns with sorting',
    code: DetailsListCustomColumnsExampleCode,
    view: React.createElement(DetailsListCustomColumnsExample, null),
});
export var DetailsListCustomRowsPageProps = generateProps({
    title: 'Rendering custom item rows',
    code: DetailsListCustomRowsExampleCode,
    view: React.createElement(DetailsListCustomRowsExample, null),
});
export var DetailsListCustomGroupHeadersPageProps = generateProps({
    title: 'Rendering custom group headers',
    code: DetailsListCustomGroupHeadersExampleCode,
    view: React.createElement(DetailsListCustomGroupHeadersExample, null),
});
export var DetailsListAdvancedPageProps = generateProps({
    title: 'Advanced DetailsList of 5000 items with variable row heights',
    code: DetailsListAdvancedExampleCode,
    view: React.createElement(DetailsListAdvancedExample, null),
});
export var DetailsListDragDropPageProps = generateProps({
    title: 'DetailsList supporting drag and drop',
    code: DetailsListDragDropExampleCode,
    view: React.createElement(DetailsListDragDropExample, null),
});
export var DetailsListNavigatingFocusPageProps = generateProps({
    title: 'Navigating to new content while preserving keyboard focus',
    code: DetailsListNavigatingFocusExampleCode,
    view: React.createElement(DetailsListNavigatingFocusExample, null),
});
export var DetailsListShimmerPageProps = generateProps({
    title: 'Shimmered DetailsList - usually shown while retrieving data',
    code: DetailsListShimmerExampleCode,
    view: React.createElement(DetailsListShimmerExample, null),
});
export var DetailsListCustomFooterPageProps = generateProps({
    title: 'Rendering custom DetailsList footer',
    code: DetailsListCustomFooterExampleCode,
    view: React.createElement(DetailsListCustomFooterExample, null),
});
//# sourceMappingURL=DetailsList.doc.js.map