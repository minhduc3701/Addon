import { IButtonStyles } from "../Button.types";
import { ITheme } from "../@uifabric/styling/index";

export declare const getStyles: (
  theme: ITheme,
  customStyles?: IButtonStyles | undefined,
  primary?: boolean | undefined
) => IButtonStyles;
