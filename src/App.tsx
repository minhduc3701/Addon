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
import { DetailsListDocumentsExample } from "./Dependencies/List";
import iconSharing from "./Dependencies/List/Media/groupIcon.svg";

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
      text: "Add-on",
      data: "./aa",
      isSelected: true,
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
              isSelected: true,
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
                      isSelected: true,
                      child: [
                        { id: "no", text: "Node", data: "./aa", child: [] },
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
        { id: "fe2", text: "Frontend2", data: "./aa", child: [] },
      ],
    },
  ];

  const columns = [
    {
      key: "column1",
      name: "Name",
      minWidth: 70,
      data: "number",
      onRender: (item: any) => {
        return (
          <div>
            <img src={item.iconSrc} />
            <span>{item.fileName}</span>
          </div>
        );
      },
    },
    {
      key: "column2",
      name: "Date Modified",
      fieldName: "dateModified",
      minWidth: 70,
      maxWidth: 250,
      data: "number",
      onRender: (item: any) => {
        return <span>{item.dateModified}</span>;
      },
      isPadded: true,
    },
    {
      key: "column3",
      name: "Modified By",
      fieldName: "modifiedBy",
      minWidth: 70,
      maxWidth: 250,
      data: "string",
      onRender: (item: any) => {
        return <span>{item.modifiedBy}</span>;
      },
    },
    {
      key: "column4",
      name: "Sharing",
      minWidth: 70,
      maxWidth: 250,
      data: "string",
      onRender: (item: any) => {
        return (
          <div>
            <img
              style={{ width: "12px", height: "12px", paddingRight: "8px" }}
              src={iconSharing}
              alt={item.sharingBy + " file icon"}
            />
            <span>{item.sharingBy}</span>
          </div>
        );
      },
    },
    {
      key: "column5",
      name: "File Size",
      minWidth: 70,
      maxWidth: 250,
      data: "number",
      onRender: (item: any) => {
        return <span>{item.fileSizeRaw}</span>;
      },
    },
  ];

  const items = [
    {
      name: "a",
      key: "a",
      dateModified: 12397123,
      modifiedBy: "A Bền",
      fileSizeRaw: 4920,
      sharingBy: "Đức",
      fileName: "feFile2.xlsx",
    },
    {
      name: "b",
      key: "b",
      dateModified: 1002039,
      modifiedBy: "A Bền",
      fileSizeRaw: 33145,
      sharingBy: "A Hiếu",
      fileName: "feFile3.txt",
    },
    {
      name: "c",
      key: "c",
      dateModified: 2312422,
      modifiedBy: "A Sơn",
      fileSizeRaw: 1222,
      sharingBy: "A Bền",
      fileName: "feFisdasdasdasdadle4.audio",
    },
    {
      name: "d",
      key: "d",
      dateModified: 2312422,
      modifiedBy: "Jay",
      fileSizeRaw: 1222,
      sharingBy: "Rash",
      fileName: "asdsd.txt",
    },
    {
      name: "e",
      key: "e",
      dateModified: 2312422,
      modifiedBy: "Ling",
      fileSizeRaw: 1222,
      sharingBy: "GreenWood",
      fileName: "222.jpg",
    },
  ];

  // <ExampleUsingCalendar>
  return (
    <div className="App">
      <DetailsListDocumentsExample
        columns={columns}
        darkMode="dark"
        items={items}
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
// <Breadcrumb
// child={BreadcrumbData}
// darkMode="light"
// onClick={onClickActionBreadcrumb}
// />
