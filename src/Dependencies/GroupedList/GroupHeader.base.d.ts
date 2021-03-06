import * as React from 'react';
import { IGroupHeaderProps } from './GroupHeader.types';
export interface IGroupHeaderState {
    isCollapsed: boolean;
    isLoadingVisible: boolean;
}
export declare class GroupHeaderBase extends React.Component<IGroupHeaderProps, IGroupHeaderState> {
    static defaultProps: IGroupHeaderProps;
    private _classNames;
    constructor(props: IGroupHeaderProps);
    UNSAFE_componentWillReceiveProps(newProps: IGroupHeaderProps): void;
    render(): JSX.Element | null;
    private _onToggleCollapse;
    private _onToggleSelectGroupClick;
    private _onHeaderClick;
    private _defaultCheckboxRender;
    private _fastDefaultCheckboxRender;
    private _onRenderTitle;
}
