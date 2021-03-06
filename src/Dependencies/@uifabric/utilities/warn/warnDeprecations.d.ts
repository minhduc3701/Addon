import { ISettingsMap } from './warn';
/**
 * Warns when a deprecated props are being used.
 *
 * @public
 * @param componentName - The name of the component being used.
 * @param props - The props passed into the component.
 * @param deprecationMap - The map of deprecations, where key is the prop name and the value is
 * either null or a replacement prop name.
 */
export declare function warnDeprecations<P>(componentName: string, props: P, deprecationMap: ISettingsMap<P>): void;
