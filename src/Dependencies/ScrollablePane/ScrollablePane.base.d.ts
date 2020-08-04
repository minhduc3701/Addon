import * as React from "react";
import { IScrollablePane, IScrollablePaneProps } from "./ScrollablePane.types";
import { Sticky } from "../Sticky";
export interface IScrollablePaneState {
  stickyTopHeight: number;
  stickyBottomHeight: number;
  scrollbarWidth: number;
  scrollbarHeight: number;
}
export declare class ScrollablePaneBase
  extends React.Component<IScrollablePaneProps, IScrollablePaneState>
  implements IScrollablePane {
  private _root;
  private _stickyAboveRef;
  private _stickyBelowRef;
  private _contentContainer;
  private _subscribers;
  private _stickies;
  private _mutationObserver;
  private _notifyThrottled;
  private _async;
  private _events;
  constructor(props: IScrollablePaneProps);
  readonly root: HTMLDivElement | null;
  readonly stickyAbove: HTMLDivElement | null;
  readonly stickyBelow: HTMLDivElement | null;
  readonly contentContainer: HTMLDivElement | null;
  componentDidMount(): void;
  componentWillUnmount(): void;
  shouldComponentUpdate(
    nextProps: IScrollablePaneProps,
    nextState: IScrollablePaneState
  ): boolean;
  componentDidUpdate(
    prevProps: IScrollablePaneProps,
    prevState: IScrollablePaneState
  ): void;
  render(): JSX.Element;
  setStickiesDistanceFromTop(): void;
  forceLayoutUpdate(): void;
  subscribe: (handler: Function) => void;
  unsubscribe: (handler: Function) => void;
  addSticky: (sticky: Sticky) => void;
  removeSticky: (sticky: Sticky) => void;
  sortSticky: (sticky: Sticky, sortAgain?: boolean | undefined) => void;
  updateStickyRefHeights: () => void;
  notifySubscribers: () => void;
  getScrollPosition: () => number;
  syncScrollSticky: (sticky: Sticky) => void;
  private _getScrollablePaneContext;
  private _checkStickyStatus;
  private _addToStickyContainer;
  private _removeStickyFromContainers;
  private _onWindowResize;
  private _getStickyContainerStyle;
  private _getScrollbarWidth;
  private _getScrollbarHeight;
  private _onScroll;
}