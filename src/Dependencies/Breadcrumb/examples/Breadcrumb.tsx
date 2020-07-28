import React from "react";
import "./App.css";
import Breadcrumb from "../index";

function App() {
  //<BreadcrumbGetData>
  const onClickActionBreadcrumb = () => {
    console.log("click");
  };
  //</BreadcrumbGetData>

  const BreadcrumbData = [
    {
      id: "ad",
      text: "Add-on",
      data: "./aa",
      child: [
        {
          id: "365",
          text: "RC365",
          data: "./aa",
          child: [
            {
              id: "fe",
              text: "Frontend",
              data: "./aa",
              child: [
                {
                  id: "nmd",
                  text: "Đức",
                  data: "./xadan",
                  child: [
                    {
                      id: "tree",
                      text: "TreeView",
                      data: "./aa",
                      child: [
                        { id: "", text: "Node", data: "./aa", child: [] },
                      ],
                    },
                    { id: "cal", text: "Calendar", data: "./aa", child: [] },
                    { id: "btn", text: "Button", data: "./aa", child: [] },
                  ],
                },
              ],
            },
            { id: "be", text: "Backend Frontend", data: "./aa", child: [] },
          ],
        },
        { id: "fe2", text: "Frontend", data: "./aa", child: [] },
      ],
    },
  ];
  //   <BreadcrumbExample>
  return (
    <div className="App">
      <Breadcrumb
        child={BreadcrumbData}
        // <BreadcrumbDarkMode>
        darkMode="dark"
        // </BreadcrumbDarkMode>
        onClick={onClickActionBreadcrumb}
      />
    </div>
  );
}
// </BreadcrumbExample>

export default App;
