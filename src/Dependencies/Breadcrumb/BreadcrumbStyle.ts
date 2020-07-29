import styled from "styled-components";

// <BreadcrumbProps>
export interface IBreadcrumdProps {
  child: IBreadNodes[];
  darkMode?: string;
  multilingual?: { textKey: string; context: string }[];
  onClick?: (
    event: React.MouseEvent<HTMLSpanElement> | React.FormEvent<HTMLDivElement>
  ) => void;
}
// </BreadcrumbProps>
// <IBreadNodes>
export interface IBreadNodes {
  id: string | number;
  text: string;
  data: string;
  child: IBreadNodes[];
  isSelected?: boolean;
  // @defaultvalue false
  key?: string | number;
}
// </IBreadNodes>

export interface IBreadNodesProps {
  node?: IBreadNodes;
  child: IBreadNodes[];
  id: string | number;
  text: string;
  data: string;
  parentNode?: IBreadNodes | null;
  theme?: string;
  key?: string | number;
  isSelected?: boolean;
  currentSelectedNode?: IBreadNodes | null;
  selectedArr?: IBreadNodesProps[];
  onSelected?: (value: IBreadNodes) => void;
  onSelectedMobile?: (value: IBreadNodesProps) => void;
  onSelectRootMobile?: (value: IBreadNodesProps) => void;
  mobileCurrentList?: IBreadNodesProps[];
  onClick?: (
    event: React.MouseEvent<HTMLSpanElement> | React.FormEvent<HTMLDivElement>
  ) => void;
  isLast?: boolean;
}

export interface IBreadcrumdStates {
  NodesList: IBreadNodes[];
  myNodes: IBreadNodes | null;
  currentNodes: IBreadNodesProps[];
  widthElement: number;
  mobileList: any;
}

export interface INodeState {
  width: number;
}

export const BreadWrapper = styled.div`
  font-weight: 350;
  font-size: 21px;
  display: flex;
  justify-content: center;
  align-items: center;
  .label-btn {
    cursor: pointer;
    max-width: 160px;
    padding: 5px;
    color: ${({ theme }) => (theme.theme === "dark" ? "#ffffff" : "#212121")};
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
  font-weight: ${({ theme }) =>
    theme.child && theme.child.length === 0 ? "600" : "350"};
  .font-weight-bold {
    font-weight: 600;
  }
`;
export const RowWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-height: 40px;
  .is-mobile {
    display: none;
  }
  .is-pc {
    display: flex;
  }
  @media screen and (max-width: 599px) {
    .is-pc {
      display: none;
    }
    .is-mobile {
      display: flex;
    }
  }
`;

export const NodeWrapper = styled.div`
  @media screen and (max-width: 599px) {
    padding-bottom: 7px;
    overflow-x: auto;
    width: auto;
    display: flex;
    flex-direction: ${({ theme }) => (theme >= 410 ? "row-reverse" : "row")};
  }
`;

export const SelectWrapper = styled.div`
  margin: 0 4px;
  width: 100%;

  .ms-Dropdown-container {
    .ms-Dropdown {
      &:focus::after {
        border: none !important;
      }
      width: fit-content;
      .ms-Dropdown-title {
        padding: 0 4px;
        border: none;
        max-width: 160px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 21px;
        font-weight: 350;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
          "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
          "Helvetica Neue", sans-serif;
        color: #212121;
        font-weight: ${({ theme }) =>
          theme.isLast ||
          (theme.selectNode.length > 0 &&
            theme.selectNode[0].child.length === 0)
            ? "600"
            : "350"};
      }
      .ms-Dropdown-caretDownWrapper {
        display: none;
      }
    }
  }
`;

export const BreadNodeWrapper = styled.div`
  .display-mobile {
    display: none;
  }
  .display-pc {
    display: flex;
  }
  @media screen and (max-width: 599px) {
    .display-pc {
      display: none !important;
    }
    .display-mobile {
      display: flex;
    }
  }
`;
