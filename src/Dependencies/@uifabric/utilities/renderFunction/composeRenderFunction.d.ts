import { IRenderFunction } from '../IRenderFunction';
/**
 * Composes two 'render functions' to produce a final render function that renders
 * the outer function, passing the inner function as 'default render'. The inner function
 * is then passed the original 'default render' prop.
 * @public
 */
export declare function composeRenderFunction<TProps>(outer: IRenderFunction<TProps>, inner: IRenderFunction<TProps>): IRenderFunction<TProps>;
