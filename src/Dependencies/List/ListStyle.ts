import styled from "styled-components";

export interface IListProps {
  darkMode?: string;
  columns: IColumn[];
  items: any[];
}

export interface IListStates {
  items: any[];
  columns: IColumn[];
  selectionDetails: any;
}

export interface IDocument {
  key: string;
  name: string;
  value: string;
  iconName: string;
  fileType: string;
  modifiedBy: string;
  dateModified: string;
  dateModifiedValue: number;
  fileSize: string;
  fileSizeRaw: number;
  sharing: string;
}

export interface IColumn {
  key: string;
  name: string;
  className?: string;
  iconClassName?: string;
  ariaLabel?: string;
  iconName?: string;
  isIconOnly?: boolean;
  fieldName?: string;
  minWidth: number;
  maxWidth?: number;
  onColumnClick?: (ev: React.MouseEvent<HTMLElement>, column: IColumn) => void;
  onRender?: (item?: any, index?: number, column?: IColumn) => any;
  isRowHeader?: boolean;
  isResizable?: boolean;
  isSorted?: boolean;
  isSortedDescending?: boolean;
  sortAscendingAriaLabel?: string;
  sortDescendingAriaLabel?: string;
  data?: any;
  isPadded?: boolean;
  isCollapsible?: boolean;
}

export const StateListWrapper = styled.div`
  width: 100%;
  font-family: Segoe UI;
  img {
    width: 18px;
    height: 18px;
    padding-right: 17px;
  }
  .ms-DetailsHeader-cellName {
    font-weight: normal;
    font-size: 12px;
    color: #333333;
  }
  .ms-List-cell {
    span {
      color: #212121;
    }
  }
`;
