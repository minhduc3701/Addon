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
        // <ButtonStyle>
        styles={{ opacity: "1", height: "auto" }}
        // </ButtonStyle>
      />
    </div>
    // </ButtonExample>
  );
}

export default App;
