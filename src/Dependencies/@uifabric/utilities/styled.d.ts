import * as React from "react";
import { IStyleSet, IStyleFunctionOrObject } from "../styling";
export interface IPropsWithStyles<
  TStyleProps,
  TStyleSet extends IStyleSet<TStyleSet>
> {
  styles?: IStyleFunctionOrObject<TStyleProps, TStyleSet>;
}
export interface ICustomizableProps {
  /**
   * Name of scope, which can be targeted using the Customizer.
   */
  scope: string;
  /**
   * List of fields which can be customized.
   * @defaultvalue [ 'theme', 'styles' ]
   */
  fields?: string[];
}
export declare type StyleFunction<
  TStyleProps,
  TStyleSet
> = IStyleFunctionOrObject<TStyleProps, TStyleSet> & {
  /** Cache for all style functions. */
  __cachedInputs__: (
    | IStyleFunctionOrObject<TStyleProps, TStyleSet>
    | undefined
  )[];
  /** True if no styles prop or styles from Customizer is passed to wrapped component. */
  __noStyleOverride__: boolean;
};
/**
 * The styled HOC wrapper allows you to create a functional wrapper around a given component which will resolve
 * getStyles functional props, and mix customized props passed in using concatStyleSets.
 *
 * @example
 * ```tsx
 * export const Toggle = styled(
 *   ToggleBase,
 *   props => ({ root: { background: 'red' }})
 * );
 * ```
 * @param Component - The unstyled base component to render, which receives styles.
 * @param baseStyles - The styles which should be curried with the component.
 * @param getProps - A helper which provides default props.
 * @param customizable - An object which defines which props can be customized using the Customizer.
 * @param pure - A boolean indicating if the component should avoid re-rendering when props haven't changed.
 * Note that pure should not be used on components which allow children, or take in complex objects or
 * arrays as props which could mutate on every render.
 */
export declare function styled<
  TComponentProps extends IPropsWithStyles<TStyleProps, TStyleSet>,
  TStyleProps,
  TStyleSet extends IStyleSet<TStyleSet>
>(
  Component:
    | React.ComponentClass<TComponentProps>
    | React.FunctionComponent<TComponentProps>,
  baseStyles: IStyleFunctionOrObject<TStyleProps, TStyleSet>,
  getProps?: (props: TComponentProps) => Partial<TComponentProps>,
  customizable?: ICustomizableProps,
  pure?: boolean
): React.FunctionComponent<TComponentProps>;
