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

  const onHandleCancelFilter = (filterObjectLength: number) => {
    setServerItems([]);
    filterObjectLength < 1 && setIsLoading(true);
  };

  const onHandleQueryObject = async (
    sortObject: ISortObject,
    filterObj: IObjectFilter[]
  ) => {
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
      count: 4,
    },
    {
      key: "group1",
      name: "Group Items 2",
      startIndex: 4,
      count: 4,
      isCollapsed: true,
    },
    {
      key: "group2",
      name: "Group Items 3",
      startIndex: 8,
      count: 1,
      isCollapsed: true,
    },
    {
      key: "group3",
      name: "Group Items 4",
      startIndex: 9,
      count: 1,
      isCollapsed: true,
    },
    {
      key: "group4",
      name: "Group Items 5",
      startIndex: 10,
      count: 3,
      isCollapsed: true,
    },
  ];

  // <ExampleUsingCalendar>
  return (
    <div className="App">
      <div style={{ height: "500px", width: "900px", position: "relative" }}>
        <ListCustom
          columns={defaultColumns}
          loading={isLoading}
          groups={groups}
          darkMode="dark"
          items={serverItems}
          onGetSelectionItem={onHandleSelection}
          onGetFilterObject={onHandleFilterObject}
          onRowClick={onHandleRowClick}
          onGetItemsList={(
            page: number,
            itemCount: number,
            order?: string,
            fieldName?: string
          ) => onGetDataList(page, itemCount, order, fieldName)}
          onRemoveFilter={(filterObjectLength: number) =>
            onHandleCancelFilter(filterObjectLength)
          }
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
