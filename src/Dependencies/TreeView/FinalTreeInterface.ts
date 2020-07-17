import styled from "styled-components";

// <TreeViewProps>
export interface ITreeProps {
  childNodes: INodes[];
  darkMode?: string;
  onGetChecked?: (value: INodes[]) => void;
  multilingual?: { textKey: string; context: string }[];
}
// </TreeViewProps>

export interface ITreeState {
  NodesList: INodes[];
  myNodes: INodes | null;
  currentNodes: INodes[];
}

// <INodes>
export interface INodes {
  childNodes: INodes[];
  label: string;
  id: string;
  isIndeterminate?: boolean;
  isAllChildSelected?: boolean;
  isChecked?: boolean;
  isDisable?: boolean;
  isExpand?: boolean;
  parentNode?: INodes | null;
  theme?: string;
  node?: INodes;
  onExpands?: (node: INodes) => void;
  onChecked?: (node: INodes) => void;
  multilingual?: { textKey: string; context: string }[];
}
// </INodes>

export const ItemWrapper = styled.div`
  display: flex;
  margin-bottom: 20px;
  .ms-Checkbox {
    padding-left: ${({ theme }) => (theme.visibleIcon ? "0" : "29px")};
  }
  .ms-Checkbox-checkbox {
    border-radius: 0;
    border-color: ${(props) =>
      props.theme.darkMode === "dark" ? "#ffffff" : "#666666"};
  }
  .icon-rightArrow {
    font-size: 16px;
    color: ${(props) =>
      props.theme.darkMode === "dark" ? "#ffffff" : "#8f8e8c"};
    line-height: 16px;
    padding-right: 13px;
    cursor: pointer;
  }
  .ms-Checkbox-text {
    color: ${(props) =>
      props.theme.darkMode === "dark" ? "#ffffff" : "#333333"};
    font-weight: normal;
  }
  .is-disabled {
    pointer-events: none;
    .ms-Checkbox-checkbox {
      background-color: ${(props) =>
        props.theme.darkMode === "dark" ? "#212121" : "#e5e5e5"};
      border-color: ${(props) =>
        props.theme.darkMode === "dark" ? "#212121" : "#e5e5e5"};
    }
    .ms-Checkbox-text {
      color: ${(props) => props.theme.darkMode === "dark" && "#D5D5D5"};
    }
  }
  .ms-Checkbox:hover {
    .ms-Checkbox-checkmark {
      color: #ffffff;
    }
    .ms-Checkbox-checkbox {
      border-color: ${({ theme }) =>
        theme.darkMode === "dark" ? "#ffffff" : "#666666"};
      &::after {
        border-color: #0078d4;
      }
    }
    .ms-Checkbox-text {
      color: ${(props) =>
        props.theme.darkMode === "dark" ? "#ffffff" : "#333333"};
    }
  }
  .is-checked {
    .ms-Checkbox-checkbox {
      border-color: ${(props) =>
        props.theme.darkMode === "dark" ? "#0078d4" : "#0078D4"};
      &:hover {
        border-color: transparent;
        background-color: #0078d4;
      }
    }
    &:hover {
      .ms-Checkbox-checkbox {
        border-color: transparent;
        background-color: #0078d4;
      }
    }
  }
  .is-checked.is-disabled {
    .ms-Checkbox-checkbox {
      border-color: ${(props) =>
        props.theme.darkMode === "dark" ? "#212121" : "#e5e5e5"};
    }
    &:hover {
      .ms-Checkbox-checkbox {
        border-color: ${(props) =>
          props.theme.darkMode === "dark" ? "#212121" : "#e5e5e5"};
        border-color: transparent;
        background-color: #0078d4;
      }
    }
  }
`;
