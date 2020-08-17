import React from "react";
// <DropdownImport>
import CustomDropdown from "../CustomDropdown";
// </DropdownImport>
import { IDropdownOption } from "../Dropdown.types";

const options: IDropdownOption[] = [
  {
    key: "option1",
    text:
      "option1option1option1option1option1option1option1option1option1option1option1option1",
  },
  { key: "option2", text: "option2", disabled: true },
  { key: "option3", text: "option3" },
];

function App() {
  // <DropdownExample>
  return (
    <div style={{ width: "300px" }}>
      <CustomDropdown
        placeholder="Select an option"
        label="Custom dropdown example"
        options={options}
        // <DropdownDarkMode>
        darkMode="dark"
        // </DropdownDarkMode>
        //<DropdownMultipleSelect>
        multiSelect={true}
        //</DropdownMultipleSelect>
      />
    </div>
  );
}
//</DropdownExample>

export default App;
