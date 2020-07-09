import React from "react";
import "./App.css";
import Languages from "./Component/Calender/languages.json";
// <ImportCS>
import Calendar from "calendar-custom/CalenderInline";
// </ImportCS>
import { initializeIcons } from "./Dependencies/@uifabric/icons";
// <TreeViewImport>
import TreeView from "./Dependencies/TreeView/TreeView";
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

  const dataTreeView = [
    {
      label: "Inbox",
      childRepo: [
        {
          label: "Send Items",
          childRepo: [
            { label: "John Wick" },
            { label: "Lao Hac" },
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
      <Calendar
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
        data={dataTreeView}
        darkMode="dark"
        onGetChecked={getTreeView}
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
