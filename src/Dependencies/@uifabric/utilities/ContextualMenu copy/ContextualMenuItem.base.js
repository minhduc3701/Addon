import { __assign, __extends } from "tslib";
import * as React from 'react';
import { hasSubmenu, getIsChecked } from '../../utilities/contextualMenu/index';
import { getRTL, initializeComponentRef } from '../../Utilities';
import { Icon } from '../../Icon';
var renderItemIcon = function (props) {
    var item = props.item, hasIcons = props.hasIcons, classNames = props.classNames;
    var iconProps = item.iconProps;
    if (!hasIcons) {
        return null;
    }
    if (item.onRenderIcon) {
        return item.onRenderIcon(props);
    }
    return React.createElement(Icon, __assign({}, iconProps, { className: classNames.icon }));
};
var renderCheckMarkIcon = function (_a) {
    var onCheckmarkClick = _a.onCheckmarkClick, item = _a.item, classNames = _a.classNames;
    var isItemChecked = getIsChecked(item);
    if (onCheckmarkClick) {
        // Ensures that the item is passed as the first argument to the checkmark click callback.
        var onClick = function (e) { return onCheckmarkClick(item, e); };
        return (React.createElement(Icon, { iconName: item.canCheck !== false && isItemChecked ? 'CheckMark' : '', className: classNames.checkmarkIcon, onClick: onClick }));
    }
    return null;
};
var renderItemName = function (_a) {
    var item = _a.item, classNames = _a.classNames;
    // tslint:disable:deprecation
    if (item.text || item.name) {
        return React.createElement("span", { className: classNames.label }, item.text || item.name);
    }
    // tslint:enable:deprecation
    return null;
};
var renderSecondaryText = function (_a) {
    var item = _a.item, classNames = _a.classNames;
    if (item.secondaryText) {
        return React.createElement("span", { className: classNames.secondaryText }, item.secondaryText);
    }
    return null;
};
var renderSubMenuIcon = function (_a) {
    var item = _a.item, classNames = _a.classNames, theme = _a.theme;
    if (hasSubmenu(item)) {
        return (React.createElement(Icon, __assign({ iconName: getRTL(theme) ? 'ChevronLeft' : 'ChevronRight' }, item.submenuIconProps, { className: classNames.subMenuIcon })));
    }
    return null;
};
var ContextualMenuItemBase = /** @class */ (function (_super) {
    __extends(ContextualMenuItemBase, _super);
    function ContextualMenuItemBase(props) {
        var _this = _super.call(this, props) || this;
        _this.openSubMenu = function () {
            var _a = _this.props, item = _a.item, openSubMenu = _a.openSubMenu, getSubmenuTarget = _a.getSubmenuTarget;
            if (getSubmenuTarget) {
                var submenuTarget = getSubmenuTarget();
                if (hasSubmenu(item) && openSubMenu && submenuTarget) {
                    openSubMenu(item, submenuTarget);
                }
            }
        };
        _this.dismissSubMenu = function () {
            var _a = _this.props, item = _a.item, dismissSubMenu = _a.dismissSubMenu;
            if (hasSubmenu(item) && dismissSubMenu) {
                dismissSubMenu();
            }
        };
        _this.dismissMenu = function (dismissAll) {
            var dismissMenu = _this.props.dismissMenu;
            if (dismissMenu) {
                dismissMenu(undefined /* ev */, dismissAll);
            }
        };
        initializeComponentRef(_this);
        return _this;
    }
    ContextualMenuItemBase.prototype.render = function () {
        var _a = this.props, item = _a.item, classNames = _a.classNames;
        return (React.createElement("div", { className: item.split ? classNames.linkContentMenu : classNames.linkContent },
            renderCheckMarkIcon(this.props),
            renderItemIcon(this.props),
            renderItemName(this.props),
            renderSecondaryText(this.props),
            renderSubMenuIcon(this.props)));
    };
    return ContextualMenuItemBase;
}(React.Component));
export { ContextualMenuItemBase };
//# sourceMappingURL=ContextualMenuItem.base.js.map