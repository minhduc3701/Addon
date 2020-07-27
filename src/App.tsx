import React from "react";
import "./App.css";
// import Languages from "./Component/Calender/languages.json";
// <ImportCS>
// import Calendar from "calendar-custom/CalenderInline";
// </ImportCS>
// import CalenderInline from "./Dependencies/calendar-custom/CalenderInline";
import { initializeIcons } from "./Dependencies/@uifabric/icons";
// <TreeViewImport>
// import TreeView from "./Dependencies/TreeView/TreeView";
// </TreeViewImport>
// <ButtonImport>
// import Button from "./Dependencies/Button";
// </ButtonImport>
import { INodes } from "./Dependencies/TreeView/FinalTreeInterface";
// <BreadcrumbImport>
import Breadcrumb from "./Dependencies/Breadcrumb";
// </BreadcrumbImport>
import { IBreadNodesProps } from "./Dependencies/Breadcrumb/BreadcrumbStyle";
import { DetailsListDocumentsExample } from "./Dependencies/StateList";

initializeIcons();

function App() {
  const getTreeView = (value: INodes[]) => {
    console.log(value);
  };

  // <getDate>
  const getDateRange = (val: Date | Date[]): void => {
    console.log(val);
  };
  // </getDate>

  const getSelectedBreadcrumb = (val: IBreadNodesProps[]): void => {
    console.log(val);
  };

  const onClickActionBreadcrumb = () => {
    console.log("click");
  };

  const data = [
    {
      date: "Mon Jul 06 2020 00:00:00 GMT+0700 (Indochina Time)",
      event: 2,
    },
    {
      date: "Tue Jun 16 2020 00:00:00 GMT+0700 (Indochina Time)",
      event: 1,
    },
    {
      date: "Thu Jul 16 2020 00:00:00 GMT+0700 (Indochina Time)",
      event: 1,
    },
    {
      date: "Wed Jul 22 2020 00:00:00 GMT+0700 (Indochina Time)",
      event: 3,
    },
  ];

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
                        { id: "no", label: "Node", src: "./aa", child: [] },
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
  // <ExampleUsingCalendar>
  return (
    <div className="App">
      <Breadcrumb
        child={BreadcrumbData}
        darkMode="light"
        onGetData={getSelectedBreadcrumb}
        onClick={onClickActionBreadcrumb}
      />
    </div>
  );
}
//</ExampleUsingCalendar>

export default App;
// <CalenderInline
//         autoNavigateOnSelection={true} //required
//         showGoToToday={false} //required
//         highlightSelectedMonth={true}
//         showMonthPickerAsOverlay={true}
//         showWeekNumbers={false}
//         showSixWeeksByDefault={false}
//         // <DarkMode>
//         darkMode={"dark"}
//         // </DarkMode>
//         onSelectChanged={getDateRange}
//         // <Multilingual>
//         multilingual={Languages}
//         // </Multilingual>
//         // <Event>
//         userEvent={data}
//         // </Event>
//         // <ToggleSwitchMode>
//         switchMode={true}
//         // </ToggleSwitchMode>
//       />
//       <TreeView
//         childNodes={toppingOptions}
//         darkMode="dark"
//         onGetChecked={getTreeView}
//         multilingual={LanguagesTree}
//       />
//       <Button
//         text="Button"
//         onClick={() => console.log("click")}
//         // darkMode="dark"
//         // disabled={true}
//         type="Primary"
//         icon="add"
//         styles={{ opacity: "1", height: "auto" }}
//       />
