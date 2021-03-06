import * as React from 'react';
import { IDetailsColumnProps } from './DetailsColumn.types';
/**
 * Component for rendering columns in a `DetailsList`.
 *
 * {@docCategory DetailsList}
 */
export declare class DetailsColumnBase extends React.Component<IDetailsColumnProps> {
    private _async;
    private _events;
    private _root;
    private _dragDropSubscription;
    private _classNames;
    constructor(props: IDetailsColumnProps);
    render(): JSX.Element;
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentDidUpdate(): void;
    private _onRenderColumnHeaderTooltip;
    private _onColumnClick;
    private _getColumnDragDropOptions;
    private _hasAccessibleLabel;
    private _renderAccessibleLabel;
    private _onDragStart;
    private _onDragEnd;
    private _updateHeaderDragInfo;
    private _onColumnContextMenu;
    private _onRootMouseDown;
    private _addDragDropHandling;
}
