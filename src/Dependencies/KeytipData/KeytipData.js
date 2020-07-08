import { __assign, __rest } from "tslib";
import { useKeytipData } from './useKeytipData';
/**
 * A small element to help the target component correctly read out its aria-describedby for its Keytip
 * {@docCategory Keytips}
 */
export var KeytipData = function (props) {
    var children = props.children, keytipDataProps = __rest(props, ["children"]);
    var _a = useKeytipData(keytipDataProps), targetElementAttributes = _a.targetElementAttributes, executeElementAttributes = _a.executeElementAttributes, ariaDescribedBy = _a.ariaDescribedBy;
    return children(__assign(__assign(__assign({}, targetElementAttributes), executeElementAttributes), { 'aria-describedby': ariaDescribedBy }));
};
//# sourceMappingURL=KeytipData.js.map