import React from "react";
import "./App.css";
import Languages from "./Component/Calender/languages.json";
// <ImportCS>
import Calendar from "calendar-custom/CalenderInline";
// </ImportCS>
import CalenderInline from "./Dependencies/calendar-custom/CalenderInline";
import { initializeIcons } from "./Dependencies/@uifabric/icons";
// <TreeViewImport>
import TreeView from "./Dependencies/TreeView/TreeView";
// </TreeViewImport>
// <ButtonImport>
import Button from "./Dependencies/Button";
// </ButtonImport>
import { INodes } from "./Dependencies/TreeView/FinalTreeInterface";
import Breadcrumb from "./Dependencies/Breadcrumb";

initializeIcons();

function App() {
  const getTreeView = async (value: INodes[]) => {
    console.log(value);
  };

  // <getDate>
  const getDateRange = (val: Date | Date[]): void => {
    console.log(val);
  };
  // </getDate>

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
      label: "Add-on",
      src: "./aa",
      child: [
        {
          label: "rc365",
          src: "./aa",
          child: [
            {
              label: "Frontend",
              src: "./aa",
              child: [
                { label: "TreeView", src: "./aa", child: [] },
                { label: "Calendar", src: "./aa", child: [] },
                { label: "Button", src: "./aa", child: [] },
              ],
            },
            { label: "Backend", src: "./aa", child: [] },
          ],
        },
      ],
    },
  ];

  // <ExampleUsingCalendar>
  return (
    <div className="App">
      <Breadcrumb child={BreadcrumbData} darkMode="dark" />
    </div>
  );
}
// </ExampleUsingCalendar>

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
