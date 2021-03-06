/**
 * Gets the rtl state of the page (returns true if in rtl.)
 *
 * @public
 */
export declare function getLanguage(): string | null;
/**
 * Sets the rtl state of the page (by adjusting the dir attribute of the html element.)
 *
 * @public
 */
export declare function setLanguage(language: string, avoidPersisting?: boolean): void;
