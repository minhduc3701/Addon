import React from "react";
import "./App.css";
import Breadcrumb from "../index";
import { IBreadNodesProps } from "../BreadcrumbStyle";

function App() {
  //<BreadcrumbGetData>
  const getSelectedBreadcrumb = (val: IBreadNodesProps[]): void => {
    console.log(val);
  };
  //</BreadcrumbGetData>

  const BreadcrumbData = [
    {
      id: "ad",
      label: "Add-on",
      src: "./aa",
      child: [
        {
          id: "365",
          label: "RC365",
          src: "./aa",
          child: [
            {
              id: "fe",
              label: "Frontend",
              src: "./aa",
              child: [
                {
                  id: "nmd",
                  label: "Đức",
                  src: "./xadan",
                  child: [
                    {
                      id: "tree",
                      label: "TreeView",
                      src: "./aa",
                      child: [
                        { id: "", label: "Node", src: "./aa", child: [] },
                      ],
                    },
                    { id: "cal", label: "Calendar", src: "./aa", child: [] },
                    { id: "btn", label: "Button", src: "./aa", child: [] },
                  ],
                },
              ],
            },
            { id: "be", label: "Backend Frontend", src: "./aa", child: [] },
          ],
        },
        { id: "fe2", label: "Frontend", src: "./aa", child: [] },
      ],
    },
  ];
  //   <BreadcrumbExample>
  return (
    <div className="App">
      <Breadcrumb
        child={BreadcrumbData}
        // <BreadcrumbDarkMode>
        darkMode="light"
        // </BreadcrumbDarkMode>
        onGetData={getSelectedBreadcrumb}
      />
    </div>
  );
}
// </BreadcrumbExample>

export default App;
