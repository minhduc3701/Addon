import * as React from 'react';
import { useConst, useConstCallback } from '@uifabric/react-hooks';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Callout } from 'office-ui-fabric-react/lib/Callout';
import { ContextualMenuItemType, } from 'office-ui-fabric-react/lib/ContextualMenu';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import * as stylesImport from './ContextualMenuExample.scss';
// tslint:disable-next-line:no-any
var styles = stylesImport;
export var ContextualMenuIconExample = function () {
    var _a = React.useState(false), showCallout = _a[0], setShowCallout = _a[1];
    var onShowCallout = useConstCallback(function () { return setShowCallout(true); });
    var onHideCallout = useConstCallback(function () { return setShowCallout(false); });
    var menuItems = useConst([
        {
            key: 'openInWord',
            text: 'Open in Word',
            onRenderIcon: function (props) {
                return (React.createElement("span", { className: styles.iconContainer },
                    React.createElement(Icon, { iconName: 'WordLogoFill16', className: styles.logoFillIcon }),
                    React.createElement(Icon, { iconName: 'WordLogo16', className: styles.logoIcon })));
            },
        },
        {
            key: 'newItem',
            iconProps: {
                iconName: 'Add',
            },
            text: 'New',
        },
        {
            key: 'upload',
            onClick: onShowCallout,
            iconProps: {
                iconName: 'Upload',
                style: {
                    color: 'salmon',
                },
            },
            text: 'Upload (Click for popup)',
            title: 'Upload a file',
        },
        {
            key: 'divider_1',
            itemType: ContextualMenuItemType.Divider,
        },
        {
            key: 'share',
            iconProps: {
                iconName: 'Share',
            },
            text: 'Share',
        },
        {
            key: 'print',
            iconProps: {
                iconName: 'Print',
            },
            text: 'Print',
        },
        {
            key: 'music',
            iconProps: {
                iconName: 'MusicInCollectionFill',
            },
            text: 'Music',
        },
    ]);
    var menuProps = useConst({
        shouldFocusOnMount: true,
        items: menuItems,
    });
    return (React.createElement("div", null,
        React.createElement(DefaultButton, { text: "Click for ContextualMenu", menuProps: menuProps }),
        showCallout && (React.createElement(Callout, { setInitialFocus: true, onDismiss: onHideCallout },
            React.createElement(DefaultButton, { onClick: onHideCallout, text: "Hello Popup" })))));
};
//# sourceMappingURL=ContextualMenu.Icon.Example.js.map