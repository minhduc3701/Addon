import styled from "styled-components";
import { ICheckboxProps } from "./index";
import { IIconProps } from "../@uifabric/icons/Icon.types";

// <CheckBoxProps>
export interface ICustomCheckBoxProps extends ICheckboxProps {
  darkMode?: string;
  icon?: IIconProps;
}
// </CheckBoxProps>

export const CheckBoxWrapper = styled.div`
  height: 100%; 
  .ms-Checkbox {
    .ms-Checkbox-label {
      .ms-Checkbox-checkbox {
        border-radius: 0;
        border-color: ${({ theme }) =>
          theme === "dark" ? "#ffffff" : "#333333"};
        .ms-Checkbox-checkmark {
          color: ${({ theme }) => (theme === "dark" ? "#333333" : "#ffffff")};
        }
        &:after {
          border-color: ${({ theme }) => theme === "dark" && "#69afe5"};
        }
        &:hover:after {
          border-color: ${({ theme }) => theme === "dark" && "#b3d6fc"};
        }
      }
      .ms-Checkbox-text {
        color: ${({ theme }) => (theme === "dark" ? "#ffffff" : "#333333")};
        font-weight: normal;
        margin: 0;
        padding: 5px 0;
      }
      .ms-icon-label {
        padding: 0 5px;
        color: ${({ theme }) => (theme === "dark" ? "#69afe5" : "#1196D1")};
        font-weight: normal;
      }
    }
    &:hover {
      .ms-Checkbox-checkbox {
        .ms-Checkbox-checkmark {
          color: ${({ theme }) => (theme === "dark" ? "#f4f4f4" : "#ffffff")};
        }
      }
    }
  }
  .is-disabled {
    .ms-Checkbox-label {
      .ms-Checkbox-checkbox {
        border-color: ${({ theme }) =>
          theme === "dark" ? "#c8c8c8" : "#C8C8C8"} !important;
        &:after {
          border-color: ${({ theme }) => theme === "dark" && "#c8c8c8"};
        }
        &:hover:after {
          border-color: ${({ theme }) => theme === "dark" && "#c8c8c8"};
        }
      }
      .ms-Checkbox-text {
        color: ${({ theme }) =>
          theme === "dark" ? "#eaeaea" : "#A6A6A6"} !important;
      }
      .ms-icon-label {
        padding: 0 5px;
        color: ${({ theme }) => (theme === "dark" ? "#eaeaea" : "#A6A6A6")};
        font-weight: normal;
      }
    }
  }
  .is-checked {
    .ms-Checkbox-label {
      .ms-Checkbox-checkbox {
        border-color: transparent;
        background-color: ${({ theme }) => theme === "dark" && "#69afe5"};
      }
    }
    &:hover {
      .ms-Checkbox-checkbox {
        background-color: ${({ theme }) => theme === "dark" && "#b3d6fc"};
        .ms-Checkbox-checkmark {
          color: ${({ theme }) => theme === "dark" && "#333333"};
        }
      }
    }
  }
  .is-disabled.is-checked {
    .ms-Checkbox-checkbox {
      background-color: ${({ theme }) =>
        theme === "dark" ? "#c8c8c8" : "#C8C8C8"};
    }
  }
`;
