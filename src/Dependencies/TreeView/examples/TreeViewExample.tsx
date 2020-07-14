import React from "react";
import { initializeIcons } from "../../@uifabric/icons";
import CheckBoxTree from "../TreeView";

initializeIcons();

function App() {
  // <TreeViewgetData>
  // const getTreeView = (value: { label: string; checked: boolean }) => {
  //   console.log(value);
  // };
  // </TreeViewgetData>

  const dataTreeView = [
    {
      header: "Inbox",
      repo: [
        {
          header: "Send Items",
          repo: [
            { header: "John Wick" },
            { header: "Lao Hac", isDisable: true },
          ],
        },
      ],
    },
    {
      header: "Draft",
      repo: [{ header: "New" }],
    },
    {
      header: "Delete Item",
    },
  ];

  // <TreeViewExample>
  return <div className="App"></div>;
}
// </TreeViewExample>

export default App;
// <CheckBoxTree
//   data={dataTreeView}
//   // <TreeViewDarkMode>
//   darkMode={"light"}
//   // </TreeViewDarkMode>
//   // onGetChecked={getTreeView}
// />
