/**
 * Register a layer for a given host id
 * @param hostId Id of the layer host
 * @param layer Layer instance
 */
export declare function registerLayer(hostId: string, callback: () => void): void;
/**
 * Unregister a layer for a given host id
 * @param hostId Id of the layer host
 * @param layer Layer instance
 */
export declare function unregisterLayer(hostId: string, callback: () => void): void;
/**
 * Used for notifying applicable Layers that a host is available/unavailable and to re-evaluate Layers that
 * care about the specific host.
 */
export declare function notifyHostChanged(id: string): void;
/**
 * Sets the default target selector to use when determining the host in which
 * Layered content will be injected into. If not provided, an element will be
 * created at the end of the document body.
 *
 * Passing in a falsey value will clear the default target and reset back to
 * using a created element at the end of document body.
 */
export declare function setDefaultTarget(selector?: string): void;
/**
 * Get the default target selector when determining a host
 */
export declare function getDefaultTarget(): string | undefined;
