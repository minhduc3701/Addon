import React from "react";
import { initializeIcons } from "../../@uifabric/icons";
import CheckBoxTree from "../TreeView";

initializeIcons();

function App() {
  // <TreeViewgetData>
  const getTreeView = (value: { label: string; checked: boolean }) => {
    console.log(value);
  };
  // </TreeViewgetData>

  const dataTreeView = [
    {
      label: "Inbox",
      childRepo: [
        {
          label: "Send Items",
          childRepo: [
            { label: "John Wick" },
            { label: "Lao Hac", disable: true },
          ],
        },
      ],
    },
    {
      label: "Draft",
      childRepo: [{ label: "New" }],
    },
    {
      label: "Delete Item",
    },
  ];

  // <TreeViewExample>
  return (
    <div className="App">
      <CheckBoxTree
        data={dataTreeView}
        // <TreeViewDarkMode>
        darkMode={"light"}
        // </TreeViewDarkMode>
        onGetChecked={getTreeView}
      />
    </div>
  );
}
// </TreeViewExample>

export default App;
