import styled from "styled-components";
import { ISpinButtonProps } from "./SpinButton.types";

export interface ICustomSpinButton extends ISpinButtonProps {
  darkMode?: String;
}

export const SpinButtonWrapper = styled.div`
  i {
    color: ${({ theme }) =>
      theme.darkMode === "dark" ? "#ffffff" : "#323130"};
  }
  .ms-Button {
    cursor: pointer;
    border-radius: 0;
    background-color: ${({ theme }) =>
      theme.darkMode === "dark" ? "#333333" : "#ffffff"};
    &:hover {
      background-color: ${({ theme }) =>
        theme.darkMode === "dark" ? "#000000" : "#EAEAEA"};
    }
  }
  .is-disabled {
    opacity: 1;
    background-color: ${({ theme }) =>
      theme.darkMode === "dark" ? "#212121" : "#f4f4f4"};
  }
  .ms-spinButton-input {
    border-radius: 0;
    background-color: ${({ theme }) =>
      theme.darkMode === "dark" ? "#333333" : "#ffffff"};
    color: ${({ theme }) =>
      theme.darkMode === "dark" ? "#ffffff" : "#323130"};
    &:disabled {
      color: ${({ theme }) =>
        theme.darkMode === "dark" ? "#eaeaea" : "#A6A6A6"};
      background-color: ${({ theme }) =>
        theme.darkMode === "dark" ? "#212121" : "#f3f2f1"};
    }
  }
  .ms-Label {
    color: ${({ theme }) =>
      theme.darkMode === "dark" ? "#ffffff" : "#323130"};
    font-weight: bold;
    font-size: 12px;
  }
  .css-73 {
    padding-bottom: 15px;
  }
  .css-76 {
    border-color: ${({ theme }) =>
      theme.darkMode === "dark" ? "#ffffff" : "#323130"};
    opacity: ${({ theme }) => theme.disabled && "0.5"};
    &:after {
      border-radius: 0;
      border-color: ${({ theme }) =>
        theme.darkMode === "dark" ? " #a19f9d" : "#323130"};
      border: ${({ theme }) => theme.disabled && "0"};
    }
    &:hover:after {
      border-color: ${({ theme }) =>
        theme.darkMode === "dark" ? "#ffffff" : "#323130"};
    }
  }
  .css-175 {
    border-radius: 0;
    &:after {
      border: ${({ theme }) =>
        theme.darkMode === "dark" ? "1px solid #69afe5" : "1px solid #0078D4"};
      border-radius: 0;
    }
  }
`;

// border: ${({ theme }) =>
//   theme.darkMode === "dark" ? "1px solid #ffffff" : "1px solid #323130"};
