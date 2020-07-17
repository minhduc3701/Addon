import { ISettings, ICustomizations } from './Customizations';
/**
 * Hook to get Customizations settings. It will trigger component state update on settings change observed.
 */
export declare function useCustomizationSettings(properties: string[], scopeName?: string, localSettings?: ICustomizations): ISettings;
