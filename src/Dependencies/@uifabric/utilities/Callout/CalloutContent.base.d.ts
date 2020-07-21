import * as React from "react";
import { ICalloutProps } from "./Callout.types";
import { ICalloutPositionedInfo } from "../index";
export interface ICalloutState {
  positions?: ICalloutPositionedInfo;
  slideDirectionalClassName?: string;
  calloutElementRect?: ClientRect;
  heightOffset?: number;
}
export declare class CalloutContentBase extends React.Component<
  ICalloutProps,
  ICalloutState
> {
  static defaultProps: {
    preventDismissOnLostFocus: boolean;
    preventDismissOnScroll: boolean;
    preventDismissOnResize: boolean;
    isBeakVisible: boolean;
    beakWidth: number;
    gapSpace: number;
    minPagePadding: number;
    directionalHint: 7;
  };
  private _classNames;
  private _didSetInitialFocus;
  private _hostElement;
  private _calloutElement;
  private _targetWindow;
  private _bounds;
  private _positionAttempts;
  private _target;
  private _setHeightOffsetTimer;
  private _hasListeners;
  private _maxHeight;
  private _blockResetHeight;
  private _isMouseDownOnPopup;
  private _async;
  private _disposables;
  constructor(props: ICalloutProps);
  componentDidUpdate(): void;
  shouldComponentUpdate(
    newProps: ICalloutProps,
    newState: ICalloutState
  ): boolean;
  UNSAFE_componentWillMount(): void;
  componentWillUnmount(): void;
  UNSAFE_componentWillUpdate(newProps: ICalloutProps): void;
  componentDidMount(): void;
  render(): JSX.Element | null;
  dismiss: (
    ev?:
      | Event
      | React.MouseEvent<HTMLElement, MouseEvent>
      | React.KeyboardEvent<HTMLElement>
      | undefined
  ) => void;
  protected _dismissOnScroll: (ev: Event) => void;
  protected _dismissOnResize: (ev: Event) => void;
  protected _dismissOnLostFocus: (ev: Event) => void;
  protected _setInitialFocus: () => void;
  protected _onComponentDidMount: () => void;
  private _dismissOnClickOrScroll;
  private _addListeners;
  private _removeListeners;
  private _updateAsyncPosition;
  private _getBeakPosition;
  private _updatePosition;
  private _getBounds;
  private _getMaxHeight;
  private _arePositionsEqual;
  private _comparePositions;
  private _setTargetWindowAndElement;
  private _setHeightOffsetEveryFrame;
  private _didPositionPropsChange;
  private _getTarget;
  private _mouseDownOnPopup;
  private _mouseUpOnPopup;
}
