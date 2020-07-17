import styled from "styled-components";

// enum colorValue {
//   string,
// }

const hanldType = (theme: { type: string; darkMode: string }): string[] => {
  //   [textColor,backgroundColor,hoverColor,activeColor]
  switch (theme.type) {
    case "Primary":
      return ["#ffffff", "#0078D4", "#106EBE", "#005A9E"];

    default:
      return ["#212121", "#F4F4F4", "#EAEAEA", "#C8C8C8"];
  }
};

export const ButtonWrapper = styled.div`
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
    .ms-Button-label {
      color: ${({ theme }) =>
        theme.darkMode === "dark" ? "#D5D5D5" : "#a6a6a6"};
      font-weight: normal;
      opacity: 0.5;
    }
  }
`;