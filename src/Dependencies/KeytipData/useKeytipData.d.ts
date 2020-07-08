import { IKeytipDataProps } from './KeytipData.types';
export declare type KeytipDataOptions = IKeytipDataProps;
export interface IKeytipData {
    ariaDescribedBy: string | undefined;
    targetElementAttributes: {
        [key: string]: string | undefined;
    };
    executeElementAttributes: {
        [key: string]: string | undefined;
    };
}
export declare function useKeytipData(options: KeytipDataOptions): IKeytipData;
