/**
 * Allows you to hoist static functions in components.
 * Created for the purpose of fixing broken static functions in classes
 * that utilize decorators.
 *
 * @public
 * @param source - The object where the methods are hoisted from.
 * @param dest - The object to hoist the methods onto.
 * @returns The dest object with methods added
 */
export function hoistStatics(source, dest) {
  for (var name_1 in source) {
    if (source.hasOwnProperty(name_1)) {
      // tslint:disable-next-line:no-any
      dest[name_1] = source[name_1];
    }
  }
  return dest;
}
//# sourceMappingURL=hoistStatics.js.map
