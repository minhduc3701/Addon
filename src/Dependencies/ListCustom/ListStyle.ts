import styled from "styled-components";
import {
  IContextualMenuProps,
  IContextualMenuItem,
} from "../@uifabric/utilities/ContextualMenu copy";

export interface IListProps {
  darkMode?: string;
  columns?: IColumn[];
  items: any[];
  onGetSelectionItem?: (selectionItems: any[]) => void;
}

export interface IListStates {
  items: any[];
  columns: IColumn[];
  filterItemsResult?: IColumn[];
  filterColumsResult?: IColumn[];
  selectionDetails: any;
  contextualMenu?: IContextualMenuProps;
  isSortedDescending: boolean;
  currentColumn: IColumn | null;
  isPanelVisible: boolean;
  filterBy: string[];
  targetColumn?: IColumn;
  filter: { type?: string | number; value?: string };
  total: number;
  loading: boolean;
  itemCount: number;
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
  priority?: number;
  isFilter?: boolean;
}

export interface IFilterProps {
  targetColumn: IColumn;
  items: any[];
  onGetItem?: (arr: any[], columns: IColumn[]) => void;
  columns: IColumn[];
  darkMode?: string;
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
  }
  .ms-DetailsHeader {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding-top: 0;
    .btn-closeFilter {
      &:hover {
        background: #f4f4f4;
        i {
          color: #c11818;
        }
      }
    }
    .ms-DetailsHeader-cell {
      cursor: pointer;
      height: 100%;
      &:hover {
        background: ${({ theme }) =>
          theme.darkMode === "dark" ? "#000000" : "#F4F4F4"};
      }
      .ms-DetailsHeader-cellTitle {
        height: 30px;
        align-items: center;
        color: ${({ theme }) =>
          theme.darkMode === "dark" ? "#ffffff" : "#333333"};
        i {
          font-size: 10px;
          color: ${({ theme }) =>
            theme.darkMode === "dark" ? "#D5D5D5" : "#666666"};
        }
      }
    }
  }
  .ms-DetailsRow {
    cursor: pointer;
    .name-col {
      color: ${({ theme }) =>
        theme.darkMode === "dark" ? "#ffffff" : "#212121"};
    }
    &:hover {
      background: ${({ theme }) =>
        theme.darkMode === "dark" ? "#000000" : "#F4F4F4"};
      color: ${({ theme }) => theme.darkMode === "dark" && "#ffffff"};
    }
  }
  .is-selected {
    background: ${({ theme }) =>
      theme.darkMode === "dark" ? "#445B6C" : "#F4F4F4"};
    span,
    i {
      color: ${({ theme }) =>
        theme.darkMode === "dark" && "#ffffff"} !important;
    }
  }
  .ms-Check {
    cursor: pointer;
  }
`;

// .ms-ScrollablePane--contentContainer::-webkit-scrollbar {
//   width: 10px;
// }
// .ms-ScrollablePane--contentContainer::-webkit-scrollbar-thumb {
//   background: ${({ theme }) =>
//     theme.darkMode === "dark" ? "#000000" : "#F4F4F4"};
// }

export const PanelWrapper = styled.div`
  p {
    color: ${({ theme }) => (theme === "dark" ? "#ffffff" : "#333333")};
    font-size: 17px;
  }
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
          border-color: ${({ theme }) =>
            theme === "dark" ? "#ffffff" : "rgb(50, 49, 48)"};
        }
        .ms-Checkbox-text {
          color: ${({ theme }) => (theme === "dark" ? "#ffffff" : "#333333")};
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
      background: ${({ theme }) =>
        theme === "dark" ? "#000000" : "#c8c8c8"} !important;
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

export const PanelContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

export const FilterColumnWrapper = styled.div`
  .ms-Dropdown-container {
    padding-bottom: 20px;
  }
  .label-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 5px;
    span {
      color: ${({ theme }) => (theme === "dark" ? "#ffffff" : "#000000")};
      cursor: default;
    }
    i {
      color: #0078d4;
      cursor: pointer;
      transtion: ease linear 0.3s;
      &:hover {
        font-size: 15px;
      }
    }
  }
  p {
    text-align: center;
    color: #0078d4;
    cursor: pointer;
  }
`;

export const DropAndTextWrapper = styled.div`
  .ms-TextField {
    .ms-TextField-wrapper {
      .ms-Label {
        color: red;
      }
    }
  }
`;
