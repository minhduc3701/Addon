/**
 * Compares a to b and b to a.
 *
 * @public
 */
export declare function shallowCompare<TA extends any, TB extends any>(a: TA, b: TB): boolean;
/**
 * Makes a resulting merge of a bunch of objects. Pass in the target object followed by 1 or more
 * objects as arguments and they will be merged sequentially into the target. Note that this will
 * shallow merge; it will not create new cloned values for target members.
 *
 * @public
 * @param target - Target object to merge following object arguments into.
 * @param args - One or more objects that will be mixed into the target in the order they are provided.
 * @returns Resulting merged target.
 */
export declare function assign(target: any, ...args: any[]): any;
/**
 * Makes a resulting merge of a bunch of objects, but allows a filter function to be passed in to filter
 * the resulting merges. This allows for scenarios where you want to merge "everything except that one thing"
 * or "properties that start with data-". Note that this will shallow merge; it will not create new cloned
 * values for target members.
 *
 * @public
 * @param isAllowed - Callback to determine if the given propName is allowed in the result.
 * @param target - Target object to merge following object arguments into.
 * @param args - One or more objects that will be mixed into the target in the order they are provided.
 * @returns Resulting merged target.
 */
export declare function filteredAssign(isAllowed: (propName: string) => boolean, target: any, ...args: any[]): any;
/**
 * Takes an enum and iterates over each value of the enum (as a string), running the callback on each,
 * returning a mapped array.
 * @param theEnum - Enum to iterate over
 * @param callback - The first parameter the name of the entry, and the second parameter is the value
 * of that entry, which is the value you'd normally use when using the enum (usually a number).
 */
export declare function mapEnumByName<T>(theEnum: any, callback: (name?: string, value?: string | number) => T | undefined): (T | undefined)[] | undefined;
/**
 * Get all values in an object dictionary
 *
 * @param obj - The dictionary to get values for
 */
export declare function values<T>(obj: any): T[];
