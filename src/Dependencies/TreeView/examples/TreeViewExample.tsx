import React from "react";
import { initializeIcons } from "../../@uifabric/icons";
// <TreeViewImport>
import TreeView from "../FinalTree";
// </TreeViewImport>
import { INodes } from "../FinalTreeInterface";

initializeIcons();

function App() {
  // <TreeViewgetData>
  const getTreeView = async (value: INodes[]) => {
    console.log(value);
  };
  // </TreeViewgetData>

  const toppingOptions = [
    {
      label: "Pepperoni",
      id: "pepperoni-id",
      childNodes: [
        {
          label: "Spicy",
          id: "spicy-id",
          childNodes: [],
        },
        {
          label: "Regular",
          id: "regular-id",
          childNodes: [],
        },
      ],
    },
    {
      label: "Chicken",
      id: "chicken-id",
      childNodes: [
        {
          label: "Buffalo",
          id: "buffalo-id",
          childNodes: [
            {
              label: "Mild",
              id: "mild-id",
              childNodes: [],
            },
            {
              label: "Hot",
              id: "hot-id",
              isChecked: true,
              childNodes: [
                {
                  label: "Jalapeño",
                  id: "jalapeno-id",
                  childNodes: [],
                },
                {
                  label: "Cayenne",
                  id: "cayenne-id",
                  childNodes: [],
                },
              ],
            },
          ],
        },
        {
          label: "BBQ",
          id: "bbq-id",
          childNodes: [],
        },
      ],
    },
  ];

  const LanguagesTree = [
    {
      textKey: "Spicy",
      context: "Cay",
    },
    {
      textKey: "Chicken",
      context: "Gà",
    },
    {
      textKey: "Hot",
      context: "Nóng",
    },
    {
      textKey: "BBQ",
      context: "Thịt Nướng",
    },
    {
      textKey: "Regular",
      context: "Truyền thống",
    },
  ];

  return (
    // <TreeViewExample>
    <div className="App">
      <TreeView
        childNodes={toppingOptions}
        // <TreeViewDarkMode>
        darkMode="dark"
        // </TreeViewDarkMode>
        onGetChecked={getTreeView}
        multilingual={LanguagesTree}
      />
    </div>
    // </TreeViewExample>
  );
}

export default App;
