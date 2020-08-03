import styled from "styled-components";

export interface IListProps {
  darkMode?: string;
  columns?: IColumn[];
  items: any[];
}

export interface IListStates {
  items: any[];
  columns: IColumn[];
  filterResult: IColumn[];
  selectionDetails: any;
  contextualMenu?: any;
  isSortedDescending: boolean;
  currentColumn: IColumn | null;
  isPanelVisible: boolean;
  filterBy: string[];
  targetColumn?: IColumn;
  filter: { type?: string | number; value?: string };
  total: number;
  loading: boolean;
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
  isDisable?: boolean;
}

export interface IFilterProps {
  targetColumn: IColumn;
  items: any[];
  onGetItem?: (arr: any[]) => void;
}

export const StateListWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
  font-family: Segoe UI;
  position: relative;
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
  .ms-DetailsHeader {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding-top: 0;
    .ms-DetailsHeader-cell {
      cursor: pointer;
      height: 100%;
      .ms-DetailsHeader-cellTitle {
        height: 30px;
        align-items: center;
      }
      &:active {
        background: #f4f4f4;
      }
      &:hover {
        background: ${({ theme }) =>
          theme.contextualMenu ? "#ffffff" : "#f4f4f4"};
      }
    }
  }
  .ms-DetailsRow {
    cursor: pointer;
    .name-col {
      color: #212121;
    }
  }
  .ms-Check {
    cursor: pointer;
  }
`;

export const PanelWrapper = styled.div`
  ul {
    padding-top: 14px;
    padding-left: 0;
    margin-bottom: 33px;
    li {
      list-style: none;
      margin-bottom: 18.5px;
      .ms-Checkbox {
        .ms-Checkbox-checkbox {
          border-radius: 0;
        }
        .ms-Checkbox-text {
          color: #333333;
          font-weight: normal;
        }
      }
    }
  }
  .btn-panel-group {
    display: flex;
    button {
      margin-right: 10px;
      .ms-Button-label {
        font-weight: 600;
      }
    }
    .is-disabled {
      background: #c8c8c8 !important;
      .ms-Button-label {
        color: #ffffff !important;
      }
    }
  }
`;

export const CalendarWrapper = styled.div`
  padding: 18px 0 18px 0;
  .dayPicker_4cbef05b {
    box-shadow: none;
    width: 100%;
    .ms-DatePicker-holder {
      width: 100%;
      .ms-DatePicker-table {
        width: 100%;
      }
    }
  }
`;
