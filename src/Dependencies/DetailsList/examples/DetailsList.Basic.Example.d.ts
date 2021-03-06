import * as React from 'react';
export interface IDetailsListBasicExampleItem {
    key: number;
    name: string;
    value: number;
}
export interface IDetailsListBasicExampleState {
    items: IDetailsListBasicExampleItem[];
    selectionDetails: string;
}
export declare class DetailsListBasicExample extends React.Component<{}, IDetailsListBasicExampleState> {
    private _selection;
    private _allItems;
    private _columns;
    constructor(props: {});
    render(): JSX.Element;
    private _getSelectionDetails;
    private _onFilter;
    private _onItemInvoked;
}
