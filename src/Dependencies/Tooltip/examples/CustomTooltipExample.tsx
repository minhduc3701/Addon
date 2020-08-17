import React from "react";
// <TooltipImport>
import CustomToolTip from "../CustomToolTip";
// </TooltipImport>
import CustomCheckBox from "../../Checkbox/CustomCheckBox";

function App() {
  // <TooltipExample>
  return (
    <CustomToolTip
      // <TooltipDarkMode>
      darkMode="dark"
      // </TooltipDarkMode>
      content="Tooltip example"
    >
      <CustomCheckBox label="Check box" darkMode="dark" />
    </CustomToolTip>
  );
  // </TooltipExample>
}
export default App;
