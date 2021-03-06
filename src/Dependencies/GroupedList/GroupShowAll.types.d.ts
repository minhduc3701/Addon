import { IStyle } from '../@uifabric/styling';
import { IGroupDividerProps } from './GroupedList.types';
import { IStyleFunctionOrObject } from '../@uifabric/utilities';
/**
 * {@docCategory GroupedList}
 */
export interface IGroupShowAllProps extends IGroupDividerProps {
    /**
     * Style function to be passed in to override the themed or default styles
     */
    styles?: IStyleFunctionOrObject<IGroupShowAllStyleProps, IGroupShowAllStyles>;
    /**
     * The Show All link text.
     * @defaultvalue 'Show All'
     */
    showAllLinkText?: string;
}
/**
 * {@docCategory GroupedList}
 */
export declare type IGroupShowAllStyleProps = Required<Pick<IGroupShowAllProps, 'theme'>>;
/**
 * {@docCategory GroupedList}
 */
export interface IGroupShowAllStyles {
    root: IStyle;
}
