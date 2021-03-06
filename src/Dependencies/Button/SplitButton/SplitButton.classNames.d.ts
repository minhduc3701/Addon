import { IButtonStyles } from '../Button.types';
export interface ISplitButtonClassNames {
    root?: string;
    icon?: string;
    splitButtonContainer?: string;
    flexContainer?: string;
    divider?: string;
}
export declare const getClassNames: (styles: IButtonStyles, disabled: boolean, expanded: boolean, checked: boolean, primaryDisabled?: boolean | undefined) => ISplitButtonClassNames;
