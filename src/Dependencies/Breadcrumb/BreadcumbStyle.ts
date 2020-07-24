import styled from "styled-components";

export interface IBreadcrumdProps {
  child: IBreadNodes[];
  darkMode?: string;
  onGetData?: (value: IBreadNodes[]) => void;
  multilingual?: { textKey: string; context: string }[];
}

export interface IBreadNodes {
  label: string;
  src: string;
  child: IBreadNodes[];
  isSelected?: boolean;
}

export interface IBreadNodesProps {
  node?: IBreadNodes;
  child: IBreadNodes[];
  label: string;
  src: string;
  parentNode?: IBreadNodes | null;
  theme?: string;
  key?: string | number;
  isSelected?: boolean;
  currentSelectedNode?: IBreadNodes | null;
  selectedArr?: IBreadNodesProps[];
  onSelected?: (value: any) => void;
}

export interface IBreadcrumdStates {
  NodesList: IBreadNodes[];
  myNodes: IBreadNodes | null;
  currentNodes: IBreadNodesProps[];
}

export interface INodeState {
  selectedItem: IBreadNodes[] | null;
}

export const BreadWrapper = styled.div`
  font-weight: 350;
  font-size: 21px;
  display: flex;
  justify-content: center;
  align-items: center;
  .label-btn {
    max-width: 160px;
    padding: 5px;
    color: ${({ theme }) => (theme.theme === "dark" ? "#ffffff" : "#212121")};
    text-decoration: none;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 0 4px;
    &:hover {
      background-color: ${({ theme }) =>
        theme.theme === "dark" ? "#000000" : "#dadada"};
    }
  }
  .ms-breadIcon {
    color: ${({ theme }) => (theme.theme === "dark" ? "#445B6C" : "#666666")};
    font-size: 12px;
    cursor: default;
  }
`;

export const ItemWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const RowWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-height: 40px;
  flex-wrap: wrap;
`;

export const SelectWrapper = styled.div`
  margin: 0 4px;
  width: 100%;
  select {
    text-align-last: center;
    padding: 5px 0;
    max-width: 160px;
    -moz-appearance: none;
    -webkit-appearance: none;
    border: none;
    background-color: transparent;
    color: ${({ theme }) => (theme.theme === "dark" ? "#ffffff" : "#212121")};
    font-weight: 350;
    cursor: pointer;
    font-size: 21px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
      "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
      "Helvetica Neue", sans-serif;
    &::-ms-expand {
      display: none;
    }
    &:focus {
      outline: none;
    }
    &:hover {
      background-color: ${({ theme }) =>
        theme.theme === "dark" ? "#000000" : "#dadada"};
    }
    option {
      background-color: ${({ theme }) =>
        theme.theme === "dark" ? "rgb(27, 26, 25)" : "#ffffff"};
    }
  }
  select,
  option.selected {
    max-width: 160px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    display: initial;
  }
`;
