import * as React from 'react';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import { keytipMap } from 'office-ui-fabric-react/lib/components/Keytip/examples/KeytipSetup';
import { Modal } from 'office-ui-fabric-react/lib/Modal';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import { useBoolean, useConst } from '@uifabric/react-hooks';
var commandBarFarItemsProps = [
    {
        key: 'farItem1',
        text: 'Options',
        iconProps: {
            iconName: 'SortLines',
        },
        keytipProps: keytipMap.CommandButton3Keytip,
        subMenuProps: {
            items: [
                {
                    key: 'emailMessage',
                    text: 'Send Email',
                    iconProps: {
                        iconName: 'Mail',
                    },
                    keytipProps: keytipMap.SubmenuKeytip1,
                },
                {
                    key: 'calendarEvent',
                    text: 'Make Calendar Event',
                    iconProps: {
                        iconName: 'Calendar',
                    },
                    keytipProps: keytipMap.SubmenuKeytip2,
                    subMenuProps: {
                        items: [
                            {
                                key: 'testButton',
                                text: 'Add to Outlook',
                                keytipProps: keytipMap.SubmenuKeytip3,
                            },
                            {
                                key: 'testButton2',
                                text: 'Go to Bing',
                                keytipProps: keytipMap.SubmenuKeytip4,
                                href: 'http://www.bing.com',
                                target: '_blank',
                            },
                        ],
                    },
                },
                {
                    key: 'splitButtonTest',
                    text: 'Other...',
                    split: true,
                    keytipProps: keytipMap.SubmenuKeytip5,
                    subMenuProps: {
                        items: [
                            {
                                key: 'splitButtonSubMenu1',
                                text: 'Submenu Item w/o Keytip',
                            },
                            {
                                key: 'splitButtonSubMenu2',
                                text: 'Submenu Item w/o Keytip',
                            },
                        ],
                    },
                },
            ],
        },
    },
];
export var KeytipsCommandBarExample = function () {
    var _a = useBoolean(false), showModal = _a[0], toggleShowModal = _a[1].toggle;
    var _b = useBoolean(false), showMessageBar = _b[0], toggleShowMessageBar = _b[1].toggle;
    var commandBarItems = useConst(function () { return [
        {
            key: 'commandBarItem1',
            text: 'New',
            iconProps: {
                iconName: 'Add',
            },
            onClick: toggleShowModal,
            keytipProps: keytipMap.CommandButton1Keytip,
        },
        {
            key: 'commandBarItem2',
            text: 'Upload',
            iconProps: {
                iconName: 'Upload',
            },
            onClick: toggleShowMessageBar,
            keytipProps: keytipMap.CommandButton2Keytip,
        },
    ]; });
    return (React.createElement(React.Fragment, null,
        React.createElement(CommandBar, { items: commandBarItems, farItems: commandBarFarItemsProps }),
        showMessageBar && React.createElement(MessageBar, { messageBarType: MessageBarType.success }, "Success Uploading"),
        React.createElement(Modal, { isOpen: showModal, onDismiss: toggleShowModal, isBlocking: false },
            React.createElement("h3", null, "New Modal"))));
};
//# sourceMappingURL=Keytips.CommandBar.Example.js.map