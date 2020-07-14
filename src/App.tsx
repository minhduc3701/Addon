import React from "react";
import "./App.css";
import Languages from "./Component/Calender/languages.json";
// <ImportCS>
import Calendar from "calendar-custom/CalenderInline";
// </ImportCS>
import CalenderInline from "./Dependencies/calendar-custom/CalenderInline";
import { initializeIcons } from "./Dependencies/@uifabric/icons";
// <TreeViewImport>
import TreeView from "./Dependencies/TreeView/TreeViewCheckBox";
// </TreeViewImport>

import Button from "./Dependencies/Button";

initializeIcons();

function App() {
  const getTreeView = async (value: { label: string; checked: boolean }) => {
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
      header: "Pepperoni",
      id: "pepperoni-id",
      isChecked:false,
      repo: [
        {
          header: "Spicy",
          id: "spicy-id",
          repo: [],
      isChecked:false,
        },
        {
          header: "Regular",
          id: "regular-id",
          repo: [],
      isChecked:false,
        },
      ],
    },
    {
      header: "Chicken",
      id: "chicken-id",
      isChecked:false,
      repo: [
        {
          header: "Buffalo",
          id: "buffalo-id",
      isChecked:false,
          repo: [
            {
              header: "Mild",
              id: "mild-id",
      isChecked:false,
              repo: [],
            },
            {
              header: "Hot",
              id: "hot-id",
      isChecked:false,
              repo: [
                {
                  header: "Jalapeño",
                  id: "jalapeno-id",
                  repo: [],
      isChecked:true
                },
                {
                  header: "Cayenne",
                  id: "cayenne-id",
                  repo: [],
      isChecked:false,
                },
              ],
            },
          ],
        },
        {
          header: "BBQ",
          id: "bbq-id",
          repo: [],
      isChecked:false,
        },
      ],
    },
  ];

  const LanguagesTree = [
    {
      textKey: "Inbox",
      context: "Tin nhắn",
    },
    {
      textKey: "Send Items",
      context: "Đã gửi",
    },
    {
      textKey: "Delete Item",
      context: "Đã xóa",
    },
    {
      textKey: "Draft",
      context: "Nháp",
    },
    {
      textKey: "New",
      context: "Mới",
    },
  ];

  // <ExampleUsingCalendar>
  return (
    <div className="App">
      <CalenderInline
        autoNavigateOnSelection={true} //required
        showGoToToday={false} //required
        highlightSelectedMonth={true}
        showMonthPickerAsOverlay={true}
        showWeekNumbers={false}
        showSixWeeksByDefault={false}
        // <DarkMode>
        darkMode={"dark"}
        // </DarkMode>
        onSelectChanged={getDateRange}
        // <Multilingual>
        multilingual={Languages}
        // </Multilingual>
        // <Event>
        userEvent={data}
        // </Event>
        // <ToggleSwitchMode>
        switchMode={true}
        // </ToggleSwitchMode>
      />
      <TreeView
        data={toppingOptions}
        darkMode="dark"
        // onGetChecked={getTreeView}
        // multilingual={LanguagesTree}
      />
      <Button
        text="Button"
        onClick={() => console.log("click")}
        darkMode="dark"
        disabled={true}
        // type="Primary"
      />
    </div>
  );
}
// </ExampleUsingCalendar>

export default App;
