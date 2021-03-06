import { IRefObject } from './createRef';
/**
 * BaseProps interface.
 *
 * @public
 * {@docCategory IBaseProps}
 */
export interface IBaseProps<T = any> {
    componentRef?: IRefObject<T>;
}
