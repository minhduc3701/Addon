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
import { Icon } from "./Dependencies/@uifabric/icons/Icon";

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
      fieldName: "name",
      minWidth: 70,
      data: "number",
      onRender: (item: any) => {
        return (
          <div className="name-col">
            <img src={item.iconName} />
            <span>{item.name}</span>
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
        let option = {
          year: "numeric",
          month: "short",
          day: "2-digit",
          hour: "numeric",
          hour12: true,
          minute: "2-digit",
        };
        return (
          <span>
            {item.dateModified
              .toLocaleDateString("en-US", option)
              .replace(",", "")}
          </span>
        );
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
      fieldName: "sharingBy",
      minWidth: 70,
      maxWidth: 250,
      data: "string",
      onRender: (item: any) => {
        return (
          <div>
            {item.sharingBy && (
              <Icon
                iconName="People"
                style={{ width: "12px", height: "12px", paddingRight: "8px" }}
              />
            )}
            <span>{item.sharingBy}</span>
          </div>
        );
      },
    },
    {
      key: "column5",
      name: "File Size",
      fieldName: "fileSizeRaw",
      minWidth: 70,
      data: "object",
      onRender: (item: any) => {
        return <span>{item.fileSize}</span>;
      },
    },
  ];

  //     key: i.toString(),
  //     name: fileName,
  //     value: fileName,
  //     iconName: randomFileType.url,
  //     fileType: randomFileType.docType,
  //     modifiedBy: userName,
  //     dateModified: randomDate.dateFormatted,
  //     dateModifiedValue: randomDate.value,
  //     fileSize: randomFileSize.value,
  //     fileSizeRaw: randomFileSize.rawSize,
  //     sharing: `${fileName}--aaa`,
  //     isDisable: true,
  //     fileName: "feFile2.docx",

  const items = [
    {
      name: "Manchester United",
      status: true,
      key: "MUN",
      value: "MUN",
      iconName: "",
      modifiedBy: "Ole",
      dateModified: new Date("Jan 17 2008, 7:12 PM"),
      dateModifiedValue: 5302985205285,
      fileSize: "75 KB",
      fileSizeRaw: 75,
      fileType: "docx",
      sharingBy: "Đức",
      isDisable: true,
      fileName: "mun.docx",
    },
    {
      name: "Chelsea FC",
      status: false,
      key: "CHE",
      value: "CHE",
      iconName: "",
      modifiedBy: "Lampart",
      dateModified: new Date("Aug 11 2020, 3:12 AM"),
      dateModifiedValue: 2118911711214,
      fileSize: "115 KB",
      fileSizeRaw: 115,
      fileType: "audio",
      sharingBy: "Trung",
      isDisable: false,
      fileName: "chel.audio",
    },
    {
      name: "Liverpool FC",
      status: true,
      key: "LIV",
      value: "LIV",
      iconName: "",
      modifiedBy: "Kloop",
      dateModified: new Date("Dec 29 2018, 4:57 PM"),
      dateModifiedValue: 798788171881,
      fileSize: "80 KB",
      fileSizeRaw: 80,
      fileType: "csv",
      sharingBy: "Sâm",
      isDisable: false,
      fileName: "live.csv",
    },
    {
      name: "Spurs",
      status: false,
      key: "TOT",
      value: "TOT",
      iconName: "",
      modifiedBy: "Mourinho",
      dateModified: new Date("May 22 2020, 2:27 PM"),
      dateModifiedValue: 888278171718,
      fileSize: "24 KB",
      fileSizeRaw: 24,
      fileType: "photo",
      sharingBy: "Hoàng",
      isDisable: true,
      fileName: "tot.photo",
    },
    // {
    //   name: "e",
    //   key: "e",
    //   dateModified: 2312422,
    //   modifiedBy: "Ling",
    //   // fileSizeRaw: new Date("Nov 14 2020, 5:23 PM"),
    //   fileSizeRaw: 2310281,
    //   sharingBy: "GreenWood",
    //   fileName: "222.photo",
    // },
  ];

  // <ExampleUsingCalendar>
  return (
    <div className="App">
      <DetailsListDocumentsExample
        // columns={columns}
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
