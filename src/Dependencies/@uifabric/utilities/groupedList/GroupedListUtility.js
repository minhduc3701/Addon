import { __spreadArrays } from "tslib";
/**
 * Takes an array of groups and returns a count of the groups and all descendant groups.
 * @param groups - The array of groups to count.
 */
export var GetGroupCount = function (groups) {
    var total = 0;
    if (groups) {
        var remainingGroups = __spreadArrays(groups);
        var currentGroup = void 0;
        while (remainingGroups && remainingGroups.length > 0) {
            ++total;
            currentGroup = remainingGroups.pop();
            if (currentGroup && currentGroup.children) {
                remainingGroups.push.apply(remainingGroups, currentGroup.children);
            }
        }
    }
    return total;
};
//# sourceMappingURL=GroupedListUtility.js.map