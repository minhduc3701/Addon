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
import { ListCustom } from "./Dependencies/ListCustom";
import { Icon } from "./Dependencies/@uifabric/icons/Icon";
import {
  IObjectFilter,
  ISortObject,
} from "./Dependencies/ListCustom/ListStyle";
import axios from "axios";
import buildQuery from "odata-query";
import CustomCheckBox from "./Dependencies/Checkbox/CustomCheckBox";
import CustomToolTip from "./Dependencies/Tooltip/CustomToolTip";
import CustomDropdown from "./Dependencies/Dropdown/CustomDropdown";
import CustomTextField from "./Dependencies/TextField/CustomTextField";

initializeIcons();

function App() {
  // useState<IUser>({name: 'Jon'});
  const [serverItems, setServerItems] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

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

  const defaultColumns = [
    {
      key: "column1",
      name: "Name",
      fieldName: "name",
      minWidth: 70,
      maxWidth: 400,
      priority: 1,
      data: "string",
      onRender: (item: any) => {
        return (
          <div className="name-col">
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
      maxWidth: 300,
      priority: 3,
      data: "date",
      onRender: (item: any) => {
        let option = {
          year: "numeric",
          month: "short",
          day: "2-digit",
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
      maxWidth: 300,
      priority: 4,
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
      maxWidth: 300,
      data: "string",
      priority: 2,
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
      maxWidth: 300,
      data: "number",
      onRender: (item: any) => {
        return <span>{`${item.fileSizeRaw} KB`}</span>;
      },
    },
    {
      key: "column6",
      name: "Status",
      fieldName: "status",
      minWidth: 70,
      maxWidth: 300,
      data: "boolean",
      onRender: (item: any) => {
        return <span>{item.status ? "Done" : "Processing"}</span>;
      },
    },
  ];
  const onHandleSelection = (a: any[]) => {
    console.log(a);
  };
  const onHandleRowClick = (item: any) => {
    console.log("clicked");
    console.log(item);
  };

  const onHandleSort = (endpoint: string) => {
    axios(`https://5f2fcc046b05e900163bd050.mockapi.io/api/files${endpoint}`)
      .then((doc) => {
        let res = doc.data;
        setIsLoading(true);
        res.forEach((item: any) => {
          item.dateModified = new Date(item.dateModified);
        });
        setServerItems(res);
      })
      .catch((err) => console.log(err));
  };

  const onCallApi = (endpoint: string) => {
    axios(`https://5f2fcc046b05e900163bd050.mockapi.io/api/files${endpoint}`)
      .then((doc) => {
        let res = doc.data;
        let currentItem = [...serverItems];
        res.forEach((item: any) => {
          item.dateModified = new Date(item.dateModified);
          currentItem.push(item);
        });
        if (serverItems.length === currentItem.length) {
          setIsLoading(false);
        }
        setServerItems(currentItem);
      })
      .catch((err) => console.log(err));
  };

  const onGetDataList = (
    page: number,
    itemCount: number,
    order?: string,
    fieldName?: string
  ) => {
    if ((isLoading && (!order || !fieldName)) || (page === 0 && !isLoading)) {
      setIsLoading(true);
      onCallApi(`?page=${page}&limit=${itemCount}`);
      // onCallApi(buildQuery({ top: itemCount, skip: itemCount * page }));
      // onCallApi(`?$top=${itemCount}&$skip=${itemCount * page}`);
    }
    if (isLoading && order && fieldName) {
      // let expand = {
      //   [fieldName]: {
      //     top: itemCount,
      //     skip: itemCount * page,
      //     orderBy: `${fieldName} ${order}`,
      //   },
      // };
      // onCallApi(buildQuery({ expand });
      onCallApi(
        `?sortBy=${fieldName}&order=${order}&page=${page}&limit=${itemCount}`
        // `?$top=${itemCount}&$skip${itemCount * page}&$orderby=${fieldName}`
      );
    }
  };

  const onHandleFilterObject = async (obj: IObjectFilter[]) => {
    let endpoint: any[] = [];
    obj.forEach((filter) => {
      let { key, columnKey, value, operator } = filter;
      switch (operator) {
        case "contains":
          if (Array.isArray(value)) {
            let filterDateArr = {
              [key]: { ge: value[0].date, le: value[value.length - 1].date },
            };
            endpoint.push(filterDateArr);
          } else {
            let filterContains = { [key]: { contains: value } };
            endpoint.push(filterContains);
          }
          break;
        case "not":
          let filterNot = { not: { [key]: { contains: value } } };
          endpoint.push(filterNot);
          break;
        default:
          let filterDefault = { [key]: { [operator]: value } };
          endpoint.push(filterDefault);
          break;
      }
    });
    onFilterDataFromServer(buildQuery({ filter: endpoint }));
  };

  const onFilterDataFromServer = (endpoint: string) => {
    axios(
      `https://5f2fcc046b05e900163bd050.mockapi.io/api/files${endpoint}`
      // `https://5f2fcc046b05e900163bd050.mockapi.io/api/files?${obj.key}=${obj.value}`
    )
      .then((doc) => {
        let res = doc.data;
        let result: any[] = [];
        setIsLoading(true);
        res.forEach((item: any) => {
          item.dateModified = new Date(item.dateModified);
          result.push(item);
        });
        setServerItems(result);
      })
      .catch((err) => console.log(err));
  };

  const onHandleCancelFilter = () => {
    setServerItems([]);
    setIsLoading(true);
  };

  const onHandleQueryObject = async (
    sortObject: ISortObject,
    filterObj: IObjectFilter[]
  ) => {
    console.log(sortObject);
    console.log(filterObj);
    if (filterObj.length === 0) {
      onHandleSort(
        buildQuery({
          orderBy: [`${sortObject.key} ${sortObject.order}`],
        })
      );
      // onHandleSort(
      //   // `?sortBy=${sortObject.key}&order=${sortObject.order}&p=1&l=${sortObject.count}`
      // );
    } else {
      let filterQuery: any[] = [];
      let expand = {};
      await filterObj.forEach((filter) => {
        let { key, columnKey, value, operator } = filter;
        switch (operator) {
          case "contains":
            if (Array.isArray(value)) {
              let filterDateArr = {
                [key]: { ge: value[0].date, le: value[value.length - 1].date },
              };
              filterQuery.push(filterDateArr);
            } else {
              let filterContains = { [key]: { contains: value } };
              filterQuery.push(filterContains);
            }
            break;
          case "not":
            let filterNot = { not: { [key]: { contains: value } } };
            filterQuery.push(filterNot);
            break;
          default:
            let filterDefault = { [key]: { [operator]: value } };
            filterQuery.push(filterDefault);
            break;
        }
      });
      expand = {
        [sortObject.key]: {
          filter: filterQuery,
          orderBy: `${sortObject.key} ${sortObject.order}`,
        },
      };
      onHandleSort(buildQuery({ expand }));
      //   // onHandleSort(
      //   //   // `?sortBy=${sortObject.key}&order=${sortObject.order}&${filterObj.key}=${filterObj.value}`
      //   // );
    }
  };

  const options = [
    {
      key: "option1",
      text:
        "option1option1option1option1option1option1option1option1option1option1option1option1",
    },
    { key: "option2", text: "option2", disabled: true },
    { key: "option3", text: "option3" },
  ];

  const groups = [
    {
      key: "group0",
      isCollapsed: true,
      name: "Group Items 1",
      startIndex: 0,
      count: 2,
      level: 0,
    },
    {
      key: "group1",
      name: "Group Items 2",
      startIndex: 2,
      count: 2,
      level: 1,
      isCollapsed: true,
    },
    {
      key: "group2",
      name: "Group Items 3",
      startIndex: 4,
      count: 1,
      level: 0,
      isCollapsed: true,
    },
    {
      key: "lastGroup",
      name: "",
      startIndex: 5,
      count: 10,
      level: 0,
      hasMoreData: true,
      isShowingAll: true,
      isCollapsed: false,
    },
  ];

  const items = [
  {
    key: "1",
    dateModified: new Date("2019-11-26T03:06:54.908Z"),
    name: "Odell Stanton",
    status: false,
    modifiedBy: "Ashley",
    fileSizeRaw: 17861,
    sharingBy: "Chester",
    isDisable: true,
    fileName: "payment.hbci",
    group:{
      key:"group3",
      name:"Nhóm 3",
      level:0
    }
  },
  {
    key: "2",
    dateModified: new Date("2020-03-28T11:46:56.411Z"),
    name: "Austen Klein",
    status: true,
    modifiedBy: "Federico",
    fileSizeRaw: 93335,
    sharingBy: "Electa",
    isDisable: false,
    fileName: "collaboration_infrastructure.texinfo",
    group:{
      key:"group3",
      name:"Nhóm 3",
      level:0
    }
  },
  {
    key: "3",
    dateModified: new Date("2020-02-19T03:44:35.701Z"),
    name: "Addie Hilpert",
    status: true,
    modifiedBy: "Justine",
    fileSizeRaw: 34746,
    sharingBy: "Yasmeen",
    isDisable: true,
    fileName: "payment_rubber.pot"
  },
  {
    key: "4",
    dateModified: new Date("2019-09-05T19:19:28.160Z"),
    name: "Fernando Wuckert",
    status: false,
    modifiedBy: "Rodger",
    fileSizeRaw: 74242,
    sharingBy: "Adalberto",
    isDisable: true,
    fileName: "ssl.taglet"
  },
  {
    key: "5",
    dateModified: new Date("2020-06-07T21:35:30.984Z"),
    name: "Leila Hermiston",
    status: false,
    modifiedBy: "Joy",
    fileSizeRaw: 36842,
    sharingBy: "Deron",
    isDisable: true,
    fileName: "fork_reintermediate_concrete.adp"
  },
  {
    key: "6",
    dateModified: new Date("2020-02-02T10:05:13.900Z"),
    name: "Forest Mitchell",
    status: false,
    modifiedBy: "Laisha",
    fileSizeRaw: 79909,
    sharingBy: "Chase",
    isDisable: true,
    fileName: "quantifying_won_generic_frozen_computer.uvv",
    group:{
      key:"group1",
      name:"Nhóm 1",
      level:0
    }
  },
  {
    key: "7",
    dateModified: new Date("2020-08-03T08:15:08.692Z"),
    name: "Billie Fisher",
    status: true,
    modifiedBy: "Xzavier",
    fileSizeRaw: 84006,
    sharingBy: "Christelle",
    isDisable: false,
    fileName: "reciprocal_industrial_center.dmg",
    group:{
      key:"group1",
      name:"Nhóm 1",
      level:0
    }
  },
  {
    key: "8",
    dateModified: new Date("2020-04-22T15:08:52.540Z"),
    name: "Estevan Quigley I",
    status: false,
    modifiedBy: "Daisha",
    fileSizeRaw: 52346,
    sharingBy: "Mazie",
    isDisable: true,
    fileName: "sleek.cml",
    group:{
      key:"group3",
      name:"Nhóm 3",
      level:0
    }
  },
  {
    key: "9",
    dateModified: new Date("2020-07-01T11:47:17.625Z"),
    name: "Aimee Reynolds",
    status: true,
    modifiedBy: "Celestino",
    fileSizeRaw: 59509,
    sharingBy: "Alisha",
    isDisable: false,
    fileName: "reintermediate.fcs",
    group:{
      key:"group1",
      name:"Nhóm 1",
      level:0
    }
  },
  {
    key: "10",
    dateModified: new Date("2020-01-13T23:36:05.892Z"),
    name: "Jonatan Ortiz",
    status: false,
    modifiedBy: "Chelsie",
    fileSizeRaw: 39774,
    sharingBy: "Desmond",
    isDisable: true,
    fileName: "product.nnw"
  },
  {
    key: "11",
    dateModified: new Date("2019-10-24T02:54:48.134Z"),
    name: "Arlene Senger",
    status: false,
    modifiedBy: "Henry",
    fileSizeRaw: 93526,
    sharingBy: "Scottie",
    isDisable: true,
    fileName: "forward.f"
  },
  {
    key: "12",
    dateModified: new Date("2019-09-10T12:08:41.746Z"),
    name: "Aditya Carter",
    status: true,
    modifiedBy: "Wilfred",
    fileSizeRaw: 91190,
    sharingBy: "Greta",
    isDisable: false,
    fileName: "brand.sdw",
    group:{
      key:"group1",
      name:"Nhóm 1",
      level:0
    }
  },
  {
    key: "13",
    dateModified: new Date("2019-12-02T21:52:10.210Z"),
    name: "Mrs. Mitchel Mertz",
    status: true,
    modifiedBy: "Jeffrey",
    fileSizeRaw: 56000,
    sharingBy: "Darryl",
    isDisable: false,
    fileName: "port_somali_shilling.pm",
    group:{
      key:"group2",
      name:"Nhóm 2",
      level:0
    }
  },
  {
    key: "14",
    dateModified: new Date("2020-02-13T19:54:04.678Z"),
    name: "Dr. Griffin Price",
    status: false,
    modifiedBy: "Jadyn",
    fileSizeRaw: 34825,
    sharingBy: "Dejon",
    isDisable: true,
    fileName: "online_egypt_visionary.ktr",
    group:{
      key:"group2",
      name:"Nhóm 2",
      level:0
    }
  },
  {
    key: "15",
    dateModified: new Date("2019-12-14T11:42:56.519Z"),
    name: "Wallace Considine",
    status: false,
    modifiedBy: "Darrin",
    fileSizeRaw: 22649,
    sharingBy: "Gaylord",
    isDisable: true,
    fileName: "product_syrian_arab_republic.nnd"
  },
  {
    key: "16",
    dateModified: new Date("2019-11-02T21:46:46.501Z"),
    name: "Beth Medhurst",
    status: false,
    modifiedBy: "Christ",
    fileSizeRaw: 54079,
    sharingBy: "Minnie",
    isDisable: false,
    fileName: "firewall_auto_loan_account.nns"
  },
  {
    key: "17",
    dateModified: new Date("2019-08-29T19:09:43.717Z"),
    name: "Fatima Johnson",
    status: false,
    modifiedBy: "Eudora",
    fileSizeRaw: 48723,
    sharingBy: "Chesley",
    isDisable: false,
    fileName: "director.xaml"
  },
  {
    key: "18",
    dateModified: new Date("2020-06-04T01:22:34.690Z"),
    name: "Zane Jacobson",
    status: true,
    modifiedBy: "Mireya",
    fileSizeRaw: 50139,
    sharingBy: "Kendrick",
    isDisable: false,
    fileName: "calculating_refined_granite_salad_brand.onetmp"
  },
  {
    key: "19",
    dateModified: new Date("2020-08-08T02:46:34.235Z"),
    name: "Darrell McDermott",
    status: true,
    modifiedBy: "Augustus",
    fileSizeRaw: 18382,
    sharingBy: "Nicolas",
    isDisable: true,
    fileName: "engage_lithuania.uvvx",
    group:{
      key:"group2",
      name:"Nhóm 2",
      level:0
    }
  },
  {
    key: "20",
    dateModified: new Date("2020-01-09T00:39:51.996Z"),
    name: "Dr. Jeremie Balistreri",
    status: false,
    modifiedBy: "Della",
    fileSizeRaw: 98438,
    sharingBy: "Alford",
    isDisable: false,
    fileName: "national.cab",
    group:{
      key:"group1",
      name:"Nhóm 1",
      level:0
    }
  }
]

  // <ExampleUsingCalendar>
  return (
    <div className="App">
      <div style={{ height: "500px", width: "900px", position: "relative" }}>
        <ListCustom
          columns={defaultColumns}
          loading={isLoading}
          groups={groups}
          darkMode="dark"
          items={items}
          onGetSelectionItem={onHandleSelection}
          onGetFilterObject={onHandleFilterObject}
          onRowClick={onHandleRowClick}
          onGetItemsList={(
            page: number,
            itemCount: number,
            order?: string,
            fieldName?: string
          ) => onGetDataList(page, itemCount, order, fieldName)}
          onRemoveFilter={onHandleCancelFilter}
          onGetQueryObject={onHandleQueryObject}
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

//====================================================
// <CustomToolTip darkMode="dark" content="Tooltip nè...">
// <CustomCheckBox
//   label="Check box"
//   darkMode="dark"
//   // indeterminate={true}
//   // disabled
//   // icon={{ iconName: "Delete" }}
// />
// </CustomToolTip>
// <br />
// <div style={{ width: "300px" }}>
// <CustomDropdown
//   placeholder="Select an option"
//   label="Custom dropdown example"
//   options={options}
//   darkMode="dark"
//   multiSelect={true}
//   // disabled
// />
// </div>
// <br />
// <CustomTextField
// label="Standard"
// // multiline
// // rows={3}
// // disabled
// // prefix="https://"
// darkMode="dark"
// placeholder="Custom textfield"
// // errorMessage="Error message"
// iconProps={{ iconName: "Calendar" }}
// />
