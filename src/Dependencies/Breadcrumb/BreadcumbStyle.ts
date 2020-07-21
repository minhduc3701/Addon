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
  key: string | number;
  isSelected?: boolean;
  onSelected?: (value: any) => void;
}

export interface IBreadcrumdStates {
  NodesList: IBreadNodes[];
  myNodes: IBreadNodes | null;
  currentNodes: IBreadNodes[];
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
    width: auto;
    max-width: 160px;
    padding: 5px;
    color: #212121;
    text-decoration: none;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 0 4px;
    &:hover {
      background-color: #dadada;
    }
  }
  .ms-breadIcon {
    color: #666666;
    font-size: 12px;
    cursor: default;
  }
`;

export const SelectWrapper2 = styled.div`
  select {
    -moz-appearance: none;
    -webkit-appearance: none;
    &::-ms-expand {
      display: none;
    }
  }
  .selected-box {
    border: none;
    cursor: pointer;
    height: 40px;
    font-weight: 350;
    font-size: 21px;
    color: #212121;
    width: auto;
    max-width: 160px;
    &:hover {
      background-color: #dadada;
    }
    &:active {
      background-color: rgba(0, 0, 0, 0.125);
    }
  }
`;

export const ItemWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-height: 40px;
`;

// .selected-option {
//   border: none;
//   cursor: pointer;
//   background-color: #ffffff;
// }

export const SelectWrapper = styled.div`
  width: auto;
  margin: 0 4px;
  select {
    -moz-appearance: none;
    -webkit-appearance: none;
    border: none;
    color: #212121;
    font-weight: 350;
    font-size: 21px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
      "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
      "Helvetica Neue", sans-serif;
    &::-ms-expand {
      display: none;
    }
  }
`;
