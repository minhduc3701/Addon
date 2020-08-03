import React from "react";
import { initializeIcons } from "../../@uifabric/icons";
import Button from "../index";

initializeIcons();

function App() {
  return (
    // <ButtonExample>
    <div className="App">
      <Button
        text="Button"
        onClick={() => console.log("click")}
        // <ButtonDarkMode>
        darkMode="dark"
        // </ButtonDarkMode>
        disabled={false}
        // <ButtonType>
        type="Primary"
        // </ButtonType>
        // <ButtonIcon>
        icon="Delete"
        // </ButtonIcon>
      />
    </div>
    // </ButtonExample>
  );
}

export default App;
