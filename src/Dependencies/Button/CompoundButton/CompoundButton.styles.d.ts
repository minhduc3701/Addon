import { IButtonStyles } from "../Button.types";
import { ITheme } from "../../@uifabric/styling";
export declare const getStyles: (
  theme: ITheme,
  customStyles?: IButtonStyles | undefined,
  primary?: boolean | undefined
) => IButtonStyles;
