var REACT_LIFECYCLE_EXCLUSIONS = [
    'setState',
    'render',
    'componentWillMount',
    'UNSAFE_componentWillMount',
    'componentDidMount',
    'componentWillReceiveProps',
    'UNSAFE_componentWillReceiveProps',
    'shouldComponentUpdate',
    'componentWillUpdate',
    'getSnapshotBeforeUpdate',
    'UNSAFE_componentWillUpdate',
    'componentDidUpdate',
    'componentWillUnmount',
];
/**
 * Allows you to hoist methods, except those in an exclusion set from a source object into a destination object.
 *
 * @public
 * @param destination - The instance of the object to hoist the methods onto.
 * @param source - The instance of the object where the methods are hoisted from.
 * @param exclusions - (Optional) What methods to exclude from being hoisted.
 * @returns An array of names of methods that were hoisted.
 */
export function hoistMethods(
// tslint:disable-next-line:no-any
destination, 
// tslint:disable-next-line:no-any
source, exclusions) {
    if (exclusions === void 0) { exclusions = REACT_LIFECYCLE_EXCLUSIONS; }
    var hoisted = [];
    var _loop_1 = function (methodName) {
        if (typeof source[methodName] === 'function' &&
            destination[methodName] === undefined &&
            (!exclusions || exclusions.indexOf(methodName) === -1)) {
            hoisted.push(methodName);
            /* tslint:disable:no-function-expression */
            destination[methodName] = function () {
                source[methodName].apply(source, arguments);
            };
            /* tslint:enable */
        }
    };
    for (var methodName in source) {
        _loop_1(methodName);
    }
    return hoisted;
}
/**
 * Provides a method for convenience to unhoist hoisted methods.
 *
 * @public
 * @param source - The source object upon which methods were hoisted.
 * @param methodNames - An array of method names to unhoist.
 */
// tslint:disable-next-line:no-any
export function unhoistMethods(source, methodNames) {
    methodNames.forEach(function (methodName) { return delete source[methodName]; });
}
//# sourceMappingURL=hoist.js.map