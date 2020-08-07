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
import { DetailsListDocumentsExample } from "./Dependencies/ListCustom";
import { Icon } from "./Dependencies/@uifabric/icons/Icon";
import { IObjectFilter } from "./Dependencies/ListCustom/ListStyle";
import axios from "axios";

initializeIcons();

function App() {
  // useState<IUser>({name: 'Jon'});
  const [serverItems, setServerItems] = React.useState<any[]>([]);

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
      data: "date",
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

  const items = [
    {
      name: "Manchester United",
      status: true,
      key: "MUN",
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
      iconName: "",
      modifiedBy: "Lampart",
      dateModified: new Date("Jan 17 2008, 7:00 AM"),
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
      iconName: "",
      modifiedBy: "Kloop",
      dateModified: new Date("Jan 18 2008, 4:57 AM"),
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
    {
      name: "Manchester United",
      status: true,
      key: "MUN2",
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
      key: "CHE2",
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
      key: "LIV2",
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
      key: "TOT2",
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
    {
      name: "Manchester United",
      status: true,
      key: "MUN3",
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
      key: "CHE3",
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
      key: "LIV3",
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
      key: "TOT3",
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
    {
      name: "Manchester United",
      status: true,
      key: "MUN4",
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
      key: "CHE4",
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
      key: "LIV4",
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
      key: "TOT4",
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
    {
      name: "Manchester United",
      status: true,
      key: "MUN5",
      iconName: "",
      modifiedBy: "Ole",
      dateModified: new Date("Jan 17 2008, 4:55 PM"),
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
      key: "CHE5",
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
      key: "LIV5",
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
      key: "TOT5",
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
    {
      name: "Manchester United",
      status: true,
      key: "MUN6",
      iconName: "",
      modifiedBy: "Ole",
      dateModified: new Date("Jan 17 2008, 8:30 AM"),
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
      key: "CHE6",
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
      key: "LIV6",
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
      key: "TOT6",
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
  ];

  const onHandleSelection = (a: any[]) => {
    console.log(a);
  };
  const onHandleRowClick = () => {
    console.log("clicked");
  };

  const onCallApi = (endpoint: string) => {
    axios(`https://5f2cb8bfffc88500167b90aa.mockapi.io/api/files${endpoint}`)
      .then((doc) => {
        let res = doc.data;
        let currentItem = [...serverItems];
        res.forEach((item: any) => {
          item.dateModified = new Date(item.dateModified);
          currentItem.push(item);
        });
        setServerItems(currentItem);
      })
      .catch((err) => console.log(err));
  };

  const onGetDataList = async (page: number, itemCount: number) => {
    onCallApi(`?page=${page}&limit=${itemCount}`);
  };

  const onHandleFilterObject = (obj: IObjectFilter) => {
    let { value, operator, key, columnKey } = obj;
    switch (operator) {
      case "contains":
        axios(
          `https://5f2cb8bfffc88500167b90aa.mockapi.io/api/files?${key}=${value}`
        )
          .then((doc) => {
            let res = doc.data;
            let result: any[] = [];
            res.forEach((item: any) => {
              item.dateModified = new Date(item.dateModified);
              result.push(item);
            });
            setServerItems(result);
          })
          .catch((err) => console.log(err));
        break;

      default:
        break;
    }
  };

  const onHanldeCancelFilter = () => {
    setServerItems([]);
  };

  console.log(serverItems);
  // console.log(loading);
  // console.log("render");

  // <ExampleUsingCalendar>
  return (
    <div className="App">
      <div style={{ height: "250px", width: "900px", position: "relative" }}>
        <DetailsListDocumentsExample
          // columns={columns}
          darkMode="dark"
          items={serverItems}
          onGetSelectionItem={onHandleSelection}
          onGetFilterObject={onHandleFilterObject}
          onRowClick={onHandleRowClick}
          onGetItemsList={(page: number, itemCount: number) =>
            onGetDataList(page, itemCount)
          }
          onRemoveFilter={onHanldeCancelFilter}
        />
      </div>
    </div>
  );
}
//</ExampleUsingCalendar>

export default App;

//  <CalenderInline
//         autoNavigateOnSelection={true} //required
//         showGoToToday={false} //required
//         highlightSelectedMonth={true}
//         showMonthPickerAsOverlay={true}
//         showWeekNumbers={false}
//         showSixWeeksByDefault={false}
//         // <DarkMode>
//         // darkMode={"dark"}
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
