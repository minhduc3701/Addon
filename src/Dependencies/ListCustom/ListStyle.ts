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
  onGetFilterObject?: (filterObject: IObjectFilter) => void;
  onRowClick?: () => void;
  onGetItemsList?: (page: number, itemsCount: number) => void;
  onRemoveFilter?: () => void;
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
  itemCount: number;
  newFilterColumns: any[];
  page: number;
  loading: boolean;
  isFiltered: boolean;
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
  onGetFilterObject?: any;
}

export interface IObjectFilter {
  columnKey: string;
  value: any;
  key: string;
  operator: string;
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
    display: inline-flex;
    align-items: center;
    justify-items: center;
    height: 100%;
  }
  .ms-DetailsHeader {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding-top: 0;
    .btn-closeFilter {
      i {
        padding-left: 0;
      }
      &:hover {
        background: ${({ theme }) =>
          theme.darkMode === "dark" ? "#000000" : "#f4f4f4"};
        i {
          color: #c11818;
        }
      }
    }
    .ms-DetailsHeader-cell {
      cursor: pointer;
      height: 100%;
      .ms-DetailsHeader-checkTooltip .ms-DetailsHeader-check {
        .ms-Check {
          .ms-Icon {
            color: ${({ theme }) => theme.darkMode === "dark" && "#ffffff"};
          }
          &::before {
            background: ${({ theme }) =>
              theme.darkMode === "dark" && "#212121"};
          }
        }
        .is-checked {
          .ms-Icon {
            color: ${({ theme }) =>
              theme.darkMode === "dark" && "#212121"} !important;
          }
          &::before {
            background: ${({ theme }) =>
              theme.darkMode === "dark" && "rgb(105, 175, 229)"} !important;
          }
        }
      }
      .columnIcon-filter {
        font-size: 12px !important;
      }
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
    width: 100%;
    .ms-DetailsRow-cell {
      .ms-DetailsRow-check {
        .ms-Check {
          .ms-Icon {
            color: ${({ theme }) => theme.darkMode === "dark" && "#ffffff"};
          }
          &::before {
            background: ${({ theme }) =>
              theme.darkMode === "dark" && "#212121"};
          }
        }
        .is-checked {
          .ms-Icon {
            color: ${({ theme }) =>
              theme.darkMode === "dark" && "#212121"} !important;
          }
          &::before {
            background: ${({ theme }) =>
              theme.darkMode === "dark" && "rgb(105, 175, 229)"} !important;
          }
        }
      }
    }
    .column-icon {
      padding-left: 8px;
    }
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
  .ms-ScrollablePane--contentContainer {
    .ms-DetailsList {
      overflow-x: hidden;
    }
  }
`;

// .ms-ScrollablePane--contentContainer::-webkit-scrollbar {
//   width: 10px;
// }
// .ms-ScrollablePane--contentContainer::-webkit-scrollbar-button {
//   color: red;
//   background-color: red;
//   border-color: red;
// }
// .ms-ScrollablePane--contentContainer::-webkit-scrollbar-button:horizontal:increment {
//   background-image: url(https://dl.dropboxusercontent.com/u/55165267/icon2.png);
// }
// .ms-ScrollablePane--contentContainer::-webkit-scrollbar-button:end:increment {
//   background-image: url(data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjE2cHgiIGhlaWdodD0iMTZweCIgdmlld0JveD0iMCAwIDQwNC4zMDggNDA0LjMwOSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDA0LjMwOCA0MDQuMzA5OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxnPgoJPHBhdGggZD0iTTAsMTAxLjA4aDQwNC4zMDhMMjAyLjE1MSwzMDMuMjI5TDAsMTAxLjA4eiIgZmlsbD0iIzAwMDAwMCIvPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=);
// }
// .ms-ScrollablePane--contentContainer::-webkit-scrollbar-button:start:decrement {
//   background-image: url(data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjE2cHgiIGhlaWdodD0iMTZweCIgdmlld0JveD0iMCAwIDI1NSAyNTUiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDI1NSAyNTU7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPGc+Cgk8ZyBpZD0iYXJyb3ctZHJvcC11cCI+CgkJPHBvbHlnb24gcG9pbnRzPSIwLDE5MS4yNSAxMjcuNSw2My43NSAyNTUsMTkxLjI1ICAgIiBmaWxsPSIjMDAwMDAwIi8+Cgk8L2c+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg==)
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

export const MenuFilterWrapper = styled.div`
  padding: 5px 0 5px 10px;
  .ms-Checkbox {
    .ms-Checkbox-label {
      .ms-Checkbox-checkbox {
        border-radius: 0;
        border-color: ${({ theme }) =>
          theme === "dark" ? "#ffffff" : "rgb(50, 49, 48)"};
      }
      .ms-Checkbox-text {
        color: ${({ theme }) => (theme === "dark" ? "#ffffff" : "#333333")};
      }
    }
  }
`;

export const OptionAndTextWrapper = styled.div`
  ul li {
    .ms-Dropdown-container {
      .ms-Dropdown-label {
        color: ${({ theme }) => (theme === "dark" ? "#ffffff" : "#000000")};
      }
      .ms-Dropdown-title {
        border-color: ${({ theme }) =>
          theme === "dark" ? "#ffffff" : "#212121"};
        background-color: ${({ theme }) =>
          theme === "dark" ? "#212121" : "#ffffff"};
        color: ${({ theme }) => (theme === "dark" ? "#ffffff" : "#000000")};
      }
    }
    .ms-TextField {
      .ms-Label {
        color: ${({ theme }) => (theme === "dark" ? "#ffffff" : "#000000")};
      }
      .ms-TextField-fieldGroup {
        border-color: ${({ theme }) => theme === "dark" && "#ffffff"};
        input:-webkit-autofill {
          -webkit-text-fill-color: ${({ theme }) =>
            theme === "dark" && "#ffffff"} !important;
          -webkit-box-shadow: ${({ theme }) =>
            theme === "dark" && "0 0 0 30px #212121 inset !important"};
        }
      }
    }
    .is-disabled {
      .ms-TextField-fieldGroup {
        border-color: ${({ theme }) => theme === "dark" && "rgb(96, 94, 92)"};
        input {
          background-color: ${({ theme }) => theme === "dark" && "#212121"};
        }
      }
    }
  }
`;
