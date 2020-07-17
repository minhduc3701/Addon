import { __assign } from "tslib";
import * as React from 'react';
import { styled } from '../../Utilities';
import { ContextualMenuBase } from './ContextualMenu.base';
import { getStyles } from './ContextualMenu.styles';
// This is to prevent cyclic import with ContextualMenu.base.tsx.
var LocalContextualMenu;
function onRenderSubMenu(subMenuProps) {
    return React.createElement(LocalContextualMenu, __assign({}, subMenuProps));
}
LocalContextualMenu = styled(ContextualMenuBase, getStyles, function () {
    return {
        onRenderSubMenu: onRenderSubMenu,
    };
}, { scope: 'ContextualMenu' });
/**
 * ContextualMenu description
 */
export var ContextualMenu = LocalContextualMenu;
//# sourceMappingURL=ContextualMenu.js.map