/**
 * Rectangle helper class.
 *
 * @public
 * {@docCategory Rectangle}
 */
export declare class Rectangle {
    top: number;
    bottom: number;
    left: number;
    right: number;
    constructor(left?: number, right?: number, top?: number, bottom?: number);
    /**
     * Calculated automatically by subtracting the right from left
     */
    readonly width: number;
    /**
     * Calculated automatically by subtracting the bottom from top.
     */
    readonly height: number;
    /**
     * Tests if another rect is approximately equal to this rect (within 4 decimal places.)
     */
    equals(rect: Rectangle): boolean;
}
