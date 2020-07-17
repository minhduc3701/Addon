import * as React from 'react';
import { Customizations } from './Customizations';
/**
 * Hook to get Customizations settings. It will trigger component state update on settings change observed.
 */
export function useCustomizationSettings(properties, scopeName, localSettings) {
    var _a = React.useState(Customizations.getSettings(properties, scopeName, localSettings)), settings = _a[0], setSettings = _a[1];
    var onCustomizationChange = React.useCallback(function () {
        var globalSettings = Customizations.getSettings(properties, scopeName, localSettings);
        setSettings(globalSettings);
    }, [properties, scopeName, localSettings]);
    React.useEffect(function () {
        Customizations.observe(onCustomizationChange);
        return function () { return Customizations.unobserve(onCustomizationChange); };
    }, [onCustomizationChange]);
    return settings;
}
//# sourceMappingURL=useCustomizationSettings.js.map