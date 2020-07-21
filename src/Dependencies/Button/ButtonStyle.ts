import styled from "styled-components";

// <ButtonProps>
export interface IButtonExampleProps {
  disabled?: boolean;
  checked?: boolean;
  text: string;
  type?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  darkMode?: string;
  icon?: string;
  className?: string;
  styles?: { [key: string]: string };
}
// </ButtonProps>

const hanldType = (theme: { type: string; darkMode: string }): string[] => {
  //   [textColor,backgroundColor,hoverColor,activeColor,iconColor]
  switch (theme.type) {
    case "Primary":
      return ["#ffffff", "#0078D4", "#106EBE", "#005A9E", "#ffffff"];

    default:
      return ["#212121", "#F4F4F4", "#EAEAEA", "#C8C8C8", "#333333"];
  }
};
// ${({ theme }): any => console.log(theme.styles)};
export const ButtonWrapper = styled.div`
  ${({ theme }): string => {
    return theme.styles;
  }};
  .ms-Button {
    min-width: 80px;
    width: auto;
    height: 32px;
    border: none;
    border-radius: 0;
    background-color: ${({ theme }) =>
      theme.darkMode === "dark" ? "rgb(105, 175, 229)" : hanldType(theme)[1]};
    .ms-Button-label {
      color: ${({ theme }) =>
        theme.darkMode === "dark" ? "rgb(51, 51, 51)" : hanldType(theme)[0]};
      font-weight: normal;
    }
    .ms-Icon {
      margin: 0;
      padding-right: 5px;
      color: ${({ theme }) => theme.darkMode !== "dark" && hanldType(theme)[4]};
      font-weight: normal;
    }
    &:hover {
      background-color: ${({ theme }) =>
        theme.darkMode === "dark" ? "rgb(146, 197, 242)" : hanldType(theme)[2]};
      .ms-Button-label {
        color: ${({ theme }) => theme.darkMode === "dark" && "#3C3C3C"};
      }
    }
    &:active {
      background-color: ${({ theme }) =>
        theme.darkMode === "dark" ? "rgb(129, 188, 237)" : hanldType(theme)[3]};
    }
  }
  .is-disabled.ms-Button {
    background-color: ${({ theme }) =>
      theme.darkMode === "dark" ? "#212121" : "#f4f4f4"};
    .ms-Button-label,
    .ms-Icon {
      color: ${({ theme }) =>
        theme.darkMode === "dark" ? "#D5D5D5" : "#a6a6a6"};
      font-weight: normal;
      opacity: 0.5;
    }
  }
`;
