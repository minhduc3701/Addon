import styled from "styled-components";
import { ITextFieldProps } from "./TextField.types";

// <TextFieldProps>
export interface ICustomTextFieldProps extends ITextFieldProps {
  darkMode?: string;
}
// </TextFieldProps>

export const TextFieldWrapper = styled.div`
  .ms-TextField {
    .ms-TextField-wrapper {
      .ms-Label {
        color: ${({ theme }) =>
          theme.darkMode === "dark" ? "#ffffff" : "#323130"};
      }
      .ms-TextField-fieldGroup {
        border-radius: 0;
        border-color: ${({ theme }) =>
          theme.darkMode === "dark" ? "#ffffff" : "#323130"};
        border-color: ${({ theme }) =>
          theme.errorMessage && theme.darkMode === "dark"
            ? "rgb(241, 112, 123) !important"
            : theme.errorMessage &&
              theme.darkMode !== "dark" &&
              "rgb(164, 38, 44) !important"};
        border-width: 1px;
        background-color: ${({ theme }) =>
          theme.darkMode === "dark" ? "#3b3b3b" : "#ffffff"};
        &:after {
          display: none;
        }
        .ms-TextField-prefix {
          background: ${({ theme }) => theme.darkMode === "dark" && "#212121"};
          color: ${({ theme }) => theme.darkMode === "dark" && "#bababa"};
        }
        input[type="text"],
        textarea[type="text"] {
          color: ${({ theme }) =>
            theme.darkMode === "dark" ? "#ffffff" : "#323130"};
        }
        i {
          color: ${({ theme }) =>
            theme.darkMode === "dark" ? "#ffffff" : "#323130"};
        }
      }
    }
    .ms-TextField-errorMessage {
      color: ${({ theme }) =>
        theme.errorMessage && theme.darkMode === "dark"
          ? "rgb(241, 112, 123) !important"
          : "rgb(164, 38, 44) !important"};
    }
  }
  .is-disabled {
    .ms-TextField-wrapper {
      .ms-Label {
        color: ${({ theme }) =>
          theme.darkMode === "dark" ? "#797775" : "#A6A6A6"};
      }
      .ms-TextField-fieldGroup {
        border-color: ${({ theme }) =>
          theme.darkMode === "dark" ? "#212121" : "#F4F4F4"};
        .ms-TextField-prefix {
          background-color: ${({ theme }) =>
            theme.darkMode === "dark" && "#212121"};
          span {
            color: ${({ theme }) => theme.darkMode === "dark" && "#eaeaea"};
            opacity: ${({ theme }) => theme.darkMode === "dark" && "0.5"};
          }
        }
        input,
        textarea {
          background-color: ${({ theme }) =>
            theme.darkMode === "dark" ? "#212121" : "#F4F4F4"};
        }
        input[type="text"],
        textarea[type="text"] {
          color: ${({ theme }) =>
            theme.darkMode === "dark" ? "#eaeaea" : "#A6A6A6"};
        }
        i {
          color: ${({ theme }) =>
            theme.darkMode === "dark" ? "#eaeaea" : "#A6A6A6"};
          opacity: ${({ theme }) => theme.darkMode === "dark" && "0.5"};
        }
      }
    }
  }
`;
