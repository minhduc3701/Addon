import { IStyle } from './IStyle';
export declare const InjectionMode: {
    /**
     * Avoids style injection, use getRules() to read the styles.
     */
    none: 0;
    /**
     * Inserts rules using the insertRule api.
     */
    insertNode: 1;
    /**
     * Appends rules using appendChild.
     */
    appendChild: 2;
};
export declare type InjectionMode = typeof InjectionMode[keyof typeof InjectionMode];
/**
 * CSP settings for the stylesheet
 */
export interface ICSPSettings {
    /**
     * Nonce to inject into script tag
     */
    nonce?: string;
}
/**
 * Stylesheet config.
 *
 * @public
 */
export interface IStyleSheetConfig {
    /**
     * Injection mode for how rules are inserted.
     */
    injectionMode?: InjectionMode;
    /**
     * Default 'displayName' to use for a className.
     * @defaultvalue 'css'
     */
    defaultPrefix?: string;
    /**
     * Defines the default direction of rules for auto-rtlifying things.
     * While typically this is represented as a DIR attribute in the markup,
     * the DIR is not enough to control whether padding goes on the left or
     * right. Use this to set the default direction when rules are registered.
     */
    rtl?: boolean;
    /**
     * Default 'namespace' to attach before the className.
     */
    namespace?: string;
    /**
     * CSP settings
     */
    cspSettings?: ICSPSettings;
    /**
     * Callback executed when a rule is inserted.
     */
    onInsertRule?: (rule: string) => void;
    /**
     * Initial value for classnames cache. Key is serialized css rules associated with a classname.
     */
    classNameCache?: {
        [key: string]: string;
    };
}
/**
 * Represents the state of styles registered in the page. Abstracts
 * the surface for adding styles to the stylesheet, exposes helpers
 * for reading the styles registered in server rendered scenarios.
 *
 * @public
 */
export declare class Stylesheet {
    private _lastStyleElement?;
    private _styleElement?;
    private _rules;
    private _preservedRules;
    private _config;
    private _rulesToInsert;
    private _counter;
    private _keyToClassName;
    private _onResetCallbacks;
    private _classNameToArgs;
    /**
     * Gets the singleton instance.
     */
    static getInstance(): Stylesheet;
    constructor(config?: IStyleSheetConfig);
    /**
     * Configures the stylesheet.
     */
    setConfig(config?: IStyleSheetConfig): void;
    /**
     * Configures a reset callback.
     *
     * @param callback - A callback which will be called when the Stylesheet is reset.
     */
    onReset(callback: () => void): void;
    /**
     * Generates a unique classname.
     *
     * @param displayName - Optional value to use as a prefix.
     */
    getClassName(displayName?: string): string;
    /**
     * Used internally to cache information about a class which was
     * registered with the stylesheet.
     */
    cacheClassName(className: string, key: string, args: IStyle[], rules: string[]): void;
    /**
     * Gets the appropriate classname given a key which was previously
     * registered using cacheClassName.
     */
    classNameFromKey(key: string): string | undefined;
    /**
     * Gets all classnames cache with the stylesheet.
     */
    getClassNameCache(): {
        [key: string]: string;
    };
    /**
     * Gets the arguments associated with a given classname which was
     * previously registered using cacheClassName.
     */
    argsFromClassName(className: string): IStyle[] | undefined;
    /**
     * Gets the arguments associated with a given classname which was
     * previously registered using cacheClassName.
     */
    insertedRulesFromClassName(className: string): string[] | undefined;
    /**
     * Inserts a css rule into the stylesheet.
     * @param preserve - Preserves the rule beyond a reset boundary.
     */
    insertRule(rule: string, preserve?: boolean): void;
    /**
     * Gets all rules registered with the stylesheet; only valid when
     * using InsertionMode.none.
     */
    getRules(includePreservedRules?: boolean): string;
    /**
     * Resets the internal state of the stylesheet. Only used in server
     * rendered scenarios where we're using InsertionMode.none.
     */
    reset(): void;
    resetKeys(): void;
    private _getStyleElement;
    private _createStyleElement;
    private _findPlaceholderStyleTag;
}
