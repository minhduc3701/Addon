import { ITheme } from "./ITheme";
export declare type GlobalClassNames<IStyles> = Record<keyof IStyles, string>;
/**
 * Checks for the `disableGlobalClassNames` property on the `theme` to determine if it should return `classNames`
 * Note that calls to this function are memoized.
 *
 * @param classNames - The collection of global class names that apply when the flag is false. Make sure to pass in
 * the same instance on each call to benefit from memoization.
 * @param theme - The theme to check the flag on
 * @param disableGlobalClassNames - Optional. Explicitly opt in/out of disabling global classnames. Defaults to false.
 */
export declare function getGlobalClassNames<T>(
  classNames: GlobalClassNames<T>,
  theme: ITheme,
  disableGlobalClassNames?: boolean
): GlobalClassNames<T>;
