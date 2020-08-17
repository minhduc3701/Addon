import * as React from "react";
import { Dropdown } from "./Dropdown";
import { DropdownWrapper, ICustomDropdownProps } from "./CustomDropdownStyle";

// const dropdownStyles: Partial<IDropdownStyles> = {
//   dropdown: { width: 'auto' },
// };
class CustomDropdown extends React.Component<ICustomDropdownProps> {
  render() {
    return (
      <DropdownWrapper theme={this.props.darkMode}>
        <Dropdown
          {...this.props}
          styles={{
            dropdownItemSelected: [
              {
                backgroundColor:
                  this.props.darkMode === "dark" ? "#000000" : "#edebe9",
                color: this.props.darkMode === "dark" ? "#ffffff" : "#333333",
              },
              {
                selectors: {
                  ":hover:focus": {
                    backgroundColor:
                      this.props.darkMode === "dark" ? "#000000" : "#F4F4F4",
                    color:
                      this.props.darkMode === "dark" ? "#ffffff" : "#333333",
                  },
                  ":focus": {
                    backgroundColor:
                      this.props.darkMode === "dark" ? "#000000" : "#F4F4F4",
                  },
                  ":active": {
                    backgroundColor:
                      this.props.darkMode === "dark" ? "#000000" : "#F4F4F4",
                    color:
                      this.props.darkMode === "dark" ? "#ffffff" : "#333333",
                  },
                },
              },
            ],
            dropdownItem: [
              {
                color: this.props.darkMode === "dark" ? "#ffffff" : "#212121",
              },
              {
                selectors: {
                  ":hover:focus": {
                    backgroundColor:
                      this.props.darkMode === "dark" ? "#212121" : "#F4F4F4",
                    color:
                      this.props.darkMode === "dark" ? "#ffffff" : "#333333",
                  },
                  ":active": {
                    backgroundColor:
                      this.props.darkMode === "dark" ? "#000000" : "#F4F4F4",
                    color:
                      this.props.darkMode === "dark" ? "#ffffff" : "#333333",
                  },
                  ":hover": {
                    backgroundColor:
                      this.props.darkMode === "dark" ? "#212121" : "#F4F4F4",
                    color:
                      this.props.darkMode === "dark" ? "#ffffff" : "#333333",
                  },
                },
              },
            ],
            dropdownItemDisabled: [
              {
                color: this.props.darkMode === "dark" ? "#eaeaea" : "#A6A6A6",
                opacity: this.props.darkMode === "dark" ? "0.5" : "1",
              },
            ],
          }}
          calloutProps={{
            backgroundColor:
              this.props.darkMode === "dark" ? "#333333" : "#ffffff",
          }}
        />
      </DropdownWrapper>
    );
  }
}

export default CustomDropdown;
