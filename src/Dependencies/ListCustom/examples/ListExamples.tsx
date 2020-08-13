import React from "react";
import { initializeIcons } from "../../@uifabric/icons";
// <ListImport>
import { ListCustom } from "../index";
// </ListImport>
import { IObjectFilter, ISortObject } from "../ListStyle";
import { Icon } from "../../@uifabric/icons";

initializeIcons();

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
    maxWidth: 250,
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
    maxWidth: 250,
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
    maxWidth: 250,
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
    maxWidth: 250,
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
    maxWidth: 250,
    data: "boolean",
    onRender: (item: any) => {
      return <span>{item.status ? "Done" : "Processing"}</span>;
    },
  },
];

function App() {
  const [serverItems, setServerItems] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  //   <ListSelected>
  const onHandleSelection = (selectedItems: any[]) => {
    console.log(selectedItems);
  };
  //   </ListSelected>
  //   <ListRowClick>
  const onHandleRowClick = (item: any) => {
    console.log("clicked");
    console.log(item);
  };
  //   </ListRowClick>

  // <ListQueryObject>
  const onHandleQueryObject = (
    sortObject: ISortObject,
    filterObj: IObjectFilter[]
  ) => {
    console.log(sortObject);
    console.log(filterObj);
  };
  //   </ListQueryObject>

  // <ListObjectGetData>
  const onGetDataList = (
    page: number,
    itemCount: number,
    order?: string,
    fieldName?: string
  ) => {
    console.log(page, itemCount, order, fieldName);
  };
  //   </ListObjectGetData>

  //   <ListGetFilterObject>
  const onHandleFilterObject = (obj: IObjectFilter[]) => {
    console.log(obj);
  };
  //   </ListGetFilterObject>

  //   <ListClearFilter>
  const onHandleCancelFilter = () => {
    setServerItems([]);
    setIsLoading(true);
  };
  //   </ListClearFilter>

  // <ListExample>
  return (
    <div className="App">
      <div style={{ height: "250px", width: "900px", position: "relative" }}>
        <ListCustom
          columns={defaultColumns}
          loading={isLoading}
          // <ListDarkMode>
          darkMode="dark"
          //   </ListDarkMode>
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
    // </ListExample>
  );
}

export default App;
// import React from "react";
// import { initializeIcons } from "../../@uifabric/icons";
// // <ListImport>
// import { ListCustom } from "../index";
// // </ListImport>
// import { IObjectFilter, ISortObject } from "../ListStyle";
// import axios from "axios";

// initializeIcons();

// function App() {
//   const [serverItems, setServerItems] = React.useState<any[]>([]);
//   const [isLoading, setIsLoading] = React.useState<boolean>(true);

//   //   <ListSelected>
//   const onHandleSelection = (selectedItems: any[]) => {
//     console.log(selectedItems);
//   };
//   //   </ListSelected>
//   //   <ListRowClick>
//   const onHandleRowClick = (item: any) => {
//     console.log("clicked");
//     console.log(item);
//   };
//   //   </ListRowClick>

//   // <ListQueryObject>
//   const onHandleQueryObject = (
//     sortObject: ISortObject,
//     filterObj?: IObjectFilter
//   ) => {
//     if (!filterObj) {
//       onHandleSort(
//         `?sortBy=${sortObject.key}&order=${sortObject.order}&p=1&l=${sortObject.count}`
//       );
//     } else {
//       onHandleSort(
//         `?sortBy=${sortObject.key}&order=${sortObject.order}&${filterObj.key}=${filterObj.value}`
//       );
//     }
//   };
//   const onHandleSort = (endpoint: string) => {
//     axios(`https://5f2fcc046b05e900163bd050.mockapi.io/api/files${endpoint}`)
//       .then((doc) => {
//         let res = doc.data;
//         setIsLoading(true);
//         res.forEach((item: any) => {
//           item.dateModified = new Date(item.dateModified);
//         });
//         setServerItems(res);
//       })
//       .catch((err) => console.log(err));
//   };
//   //   </ListQueryObject>

//   // <ListObjectGetData>
//   const onGetDataList = (
//     page: number,
//     itemCount: number,
//     order?: string,
//     fieldName?: string
//   ) => {
//     if ((isLoading && (!order || !fieldName)) || (page === 1 && !isLoading)) {
//       setIsLoading(true);
//       onCallApi(`?page=${page}&limit=${itemCount}`);
//     }
//     if (isLoading && order && fieldName) {
//       onCallApi(
//         `?sortBy=${fieldName}&order=${order}&page=${page}&limit=${itemCount}`
//       );
//     }
//   };

//   const onCallApi = (endpoint: string) => {
//     axios(`https://5f2fcc046b05e900163bd050.mockapi.io/api/files${endpoint}`)
//       .then((doc) => {
//         let res = doc.data;
//         let currentItem = [...serverItems];
//         res.forEach((item: any) => {
//           item.dateModified = new Date(item.dateModified);
//           currentItem.push(item);
//         });
//         if (serverItems.length === currentItem.length) {
//           setIsLoading(false);
//         }
//         setServerItems(currentItem);
//       })
//       .catch((err) => console.log(err));
//   };

//   //   </ListObjectGetData>

//   //   <ListGetFilterObject>
//   const onHandleFilterObject = (obj: IObjectFilter) => {
//     axios(
//       `https://5f2fcc046b05e900163bd050.mockapi.io/api/files?${obj.key}=${obj.value}`
//     )
//       .then((doc) => {
//         let res = doc.data;
//         let result: any[] = [];
//         setIsLoading(true);
//         res.forEach((item: any) => {
//           item.dateModified = new Date(item.dateModified);
//           result.push(item);
//         });
//         setServerItems(result);
//       })
//       .catch((err) => console.log(err));
//   };
//   //   </ListGetFilterObject>

//   //   <ListClearFilter>
//   const onHandleCancelFilter = () => {
//     setServerItems([]);
//     setIsLoading(true);
//   };
//   //   </ListClearFilter>

//   // <ListExample>
//   return (
//     <div className="App">
//       <div style={{ height: "250px", width: "900px", position: "relative" }}>
//         <ListCustom
//           //   columns={columns}
//           loading={isLoading}
//           // <ListDarkMode>
//           darkMode="dark"
//           //   </ListDarkMode>
//           items={serverItems}
//           onGetSelectionItem={onHandleSelection}
//           onGetFilterObject={onHandleFilterObject}
//           onRowClick={onHandleRowClick}
//           onGetItemsList={(
//             page: number,
//             itemCount: number,
//             order?: string,
//             fieldName?: string
//           ) => onGetDataList(page, itemCount, order, fieldName)}
//           onRemoveFilter={onHandleCancelFilter}
//           onGetQueryObject={onHandleQueryObject}
//         />
//       </div>
//     </div>
//     // </ListExample>
//   );
// }

// export default App;
