import styled from "styled-components";
import { ITreeViewProps } from "./TreeViewInterface";

export interface getValueProps extends ITreeViewProps {
  isLastChild?: boolean;
  repo?: ITreeViewProps[];
  isEnough?: boolean | null;
}

export interface CheckboxPropsExample {
  header: string;
  isDisable?: boolean;
  isChecked?: boolean;
  repo?: ITreeViewProps[];
  darkMode?: string;
  getValue?: (data: getValueProps) => void;
  lastChild?: boolean;
  multilingual?: { textKey: string; context: string }[];
  data: any;
}
export interface CheckBoxState {
  checked: boolean;
  viewTree: boolean;
}

export const ItemWrapper = styled.div`
  display: flex;
  margin-bottom: 20px;
  .ms-Checkbox-checkbox {
    border-radius: 0;
    border-color: ${(props) => props.theme.darkMode === "dark" && "#ffffff"};
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
      color: ${(props) =>
        props.theme.darkMode === "dark" ? "#ffffff" : "#8f8e8c"};
    }
    .ms-Checkbox-checkbox {
      border-color: ${(props) => props.theme.darkMode === "dark" && "#ffffff"};
    }
    .ms-Checkbox-text {
      color: ${(props) =>
        props.theme.darkMode === "dark" ? "#ffffff" : "#333333"};
    }
  }
  .is-checked {
    .ms-Checkbox-checkbox {
      border-color: ${(props) =>
        props.theme.darkMode === "dark" ? "#0078d4" : "0"};
    }
    &:hover {
      .ms-Checkbox-checkbox {
        border-color: ${(props) =>
          props.theme.darkMode === "dark" && "rgb(0, 90, 158)"};
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
      }
    }
  }
`;

export const RepoWrapper = styled.div`
  margin: ${(props) =>
    props.theme.childRepo && props.theme.childRepo.length > 0
      ? "9px 0 9px 30px"
      : "9px 0 9px 50px"};
  .icon-rightArrow {
    display: ${(props) => (props.theme.lastChild ? "none" : "block")};
    font-size: 16px;
    line-height: 16px;
    padding-right: 13px;
    color: ${(props) =>
      props.theme.darkMode === "dark" ? "#ffffff" : "#8f8e8c"};
  }
  .ms-Checkbox-text {
    color: ${(props) =>
      !props.theme.disable && props.theme.darkMode !== "dark"
        ? "#333333"
        : props.theme.darkMode === "dark"
        ? "#ffffff"
        : "#A6A6A6"};
    font-weight: normal;
  }
  .ms-Checkbox-checkbox {
    border-color: ${(props) => props.theme.darkMode === "dark" && "#ffffff"};
  }
  .ms-Checkbox:hover {
    .ms-Checkbox-checkmark {
      color: ${(props) =>
        props.theme.darkMode === "dark" ? "#ffffff" : "#8f8e8c"};
    }
    .ms-Checkbox-checkbox {
      border-color: ${(props) => props.theme.darkMode === "dark" && "#ffffff"};
    }
    .ms-Checkbox-text {
      color: ${(props) =>
        props.theme.darkMode === "dark" ? "#ffffff" : "#333333"};
    }
  }
  .is-checked {
    .ms-Checkbox-checkbox {
      border-color: ${(props) =>
        props.theme.darkMode === "dark" ? "#0078d4" : "0"};
    }
    &:hover {
      .ms-Checkbox-checkbox {
        border-color: ${(props) =>
          props.theme.darkMode === "dark" && "rgb(0, 90, 158)"};
      }
    }
  }
`;
