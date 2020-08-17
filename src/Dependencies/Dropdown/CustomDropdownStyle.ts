import styled from "styled-components";
import { IDropdownProps } from "./Dropdown.types";

// <DropdownProps>
export interface ICustomDropdownProps extends IDropdownProps {
  darkMode?: string;
}
// </DropdownProps>

const onCheckDarkMode = (darkMode: string): boolean => {
  if (darkMode === "dark") {
    return true;
  }
  return false;
};

export const DropdownWrapper = styled.div`
  .ms-Dropdown-container {
    .ms-Label {
      color: ${({ theme }) => (onCheckDarkMode(theme) ? "#ffffff" : "#000000")};
    }
    .ms-Dropdown {
      .ms-Dropdown-title {
        border-radius: 0;
        border-color: ${({ theme }) =>
          onCheckDarkMode(theme) ? "#f4f4f4" : "#A6A6A6"};
        color: ${({ theme }) =>
          onCheckDarkMode(theme) ? "#ffffff" : "#333333"};
        background-color: ${({ theme }) =>
          onCheckDarkMode(theme) ? "#333333" : "#ffffff"};
        font-weight: normal;
        border-width: 1px;
      }
      .ms-Dropdown-caretDownWrapper {
        i {
          color: ${({ theme }) =>
            onCheckDarkMode(theme) ? "#ffffff" : "#666666"};
        }
      }
      &:focus:after {
        border-radius: 0;
        border-color: ${({ theme }) =>
          onCheckDarkMode(theme) ? "#b3d6fc" : "#005A9E"};
        border-width: 1px;
      }
      &:hover {
        .ms-Dropdown-title {
          border-color: ${({ theme }) =>
            onCheckDarkMode(theme) ? "#f4f4f4" : "#212121"};
          color: ${({ theme }) =>
            onCheckDarkMode(theme) ? "#ffffff" : "#000000"};
        }
        .ms-Dropdown-caretDownWrapper {
          i {
            color: ${({ theme }) =>
              onCheckDarkMode(theme) ? "#ffffff" : "#212121"};
          }
        }
      }
    }
    .is-disabled {
      pointer-events: none;
      .ms-Dropdown-title {
        background-color: ${({ theme }) =>
          onCheckDarkMode(theme) ? "#212121" : "#F4F4F4"};
        color: ${({ theme }) =>
          onCheckDarkMode(theme) ? "#eaeaea" : "#A6A6A6"};
      }
      .ms-Dropdown-caretDownWrapper {
        i {
          color: ${({ theme }) =>
            onCheckDarkMode(theme) ? "#eaeaea" : "#A6A6A6"};
        }
      }
    }
  }
`;
