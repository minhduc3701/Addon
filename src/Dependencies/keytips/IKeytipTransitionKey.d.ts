export declare enum KeytipTransitionModifier {
    shift,
    ctrl,
    alt,
    meta
}
export interface IKeytipTransitionKey {
    key: string;
    modifierKeys?: KeytipTransitionModifier[];
}
/**
 * Tests for equality between two IKeytipTransitionKeys.
 *
 * @param key1 - First IKeytipTransitionKey.
 * @param key2 - Second IKeytipTransitionKey.
 * @returns {boolean} T/F if the transition keys are equal.
 */
export declare function transitionKeysAreEqual(key1: IKeytipTransitionKey, key2: IKeytipTransitionKey): boolean;
/**
 * Tests if 'key' is present in 'keys'.
 *
 * @param keys - Array of IKeytipTransitionKey.
 * @param key - IKeytipTransitionKey to find in 'keys'.
 * @returns {boolean} T/F if 'keys' contains 'key'.
 */
export declare function transitionKeysContain(keys: IKeytipTransitionKey[], key: IKeytipTransitionKey): boolean;
