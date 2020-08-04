import * as React from 'react';
export interface IGroupedListCustomCheckboxExampleState {
}
export declare class GroupedListCustomCheckboxExample extends React.Component<{}, IGroupedListCustomCheckboxExampleState> {
    private _items;
    private _columns;
    private _groups;
    private _selection;
    constructor(props: {});
    render(): JSX.Element;
    private _onRenderHeader;
    private _onRenderGroupHeaderCheckbox;
    private _onRenderCell;
}
