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
import {
  IObjectFilter,
  ISortObject,
} from "./Dependencies/ListCustom/ListStyle";
import axios from "axios";

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

  const onHandleSelection = (a: any[]) => {
    console.log(a);
  };
  const onHandleRowClick = () => {
    console.log("clicked");
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
    if ((isLoading && (!order || !fieldName)) || (page === 1 && !isLoading)) {
      setIsLoading(true);
      onCallApi(`?page=${page}&limit=${itemCount}`);
    }
    if (isLoading && order && fieldName) {
      onCallApi(
        `?sortBy=${fieldName}&order=${order}&page=${page}&limit=${itemCount}`
      );
    }
  };

  const onHandleFilterObject = (obj: IObjectFilter) => {
    axios(
      `https://5f2fcc046b05e900163bd050.mockapi.io/api/files?${obj.key}=${obj.value}`
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
  };

  const onHandleQueryObject = (
    sortObject: ISortObject,
    filterObj?: IObjectFilter
  ) => {
    if (!filterObj) {
      onHandleSort(
        `?sortBy=${sortObject.key}&order=${sortObject.order}&p=1&l=${sortObject.count}`
      );
    } else {
      onHandleSort(
        `?sortBy=${sortObject.key}&order=${sortObject.order}&${filterObj.key}=${filterObj.value}`
      );
    }
  };

  // <ExampleUsingCalendar>

  return (
    <div className="App">
      <div style={{ height: "250px", width: "900px", position: "relative" }}>
        <DetailsListDocumentsExample
          // columns={columns}
          loading={isLoading}
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
