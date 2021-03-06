import { IFabricStyleProps, IFabricStyles } from './Fabric.types';
export interface IFabricClassNames {
    root: string;
    bodyThemed: string;
}
export declare const getStyles: (props: IFabricStyleProps) => IFabricStyles;
