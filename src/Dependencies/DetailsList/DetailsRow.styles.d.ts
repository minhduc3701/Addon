import { IDetailsRowStyleProps, IDetailsRowStyles, ICellStyleProps } from './DetailsRow.types';
export declare const DetailsRowGlobalClassNames: {
    root: string;
    compact: string;
    cell: string;
    cellAnimation: string;
    cellCheck: string;
    check: string;
    cellMeasurer: string;
    listCellFirstChild: string;
    isContentUnselectable: string;
    isSelected: string;
    isCheckVisible: string;
    isRowHeader: string;
    fields: string;
};
export declare const DEFAULT_CELL_STYLE_PROPS: ICellStyleProps;
export declare const DEFAULT_ROW_HEIGHTS: {
    rowHeight: number;
    compactRowHeight: number;
};
export declare const getStyles: (props: IDetailsRowStyleProps) => IDetailsRowStyles;
