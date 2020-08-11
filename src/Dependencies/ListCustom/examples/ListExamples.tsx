import React from "react";
import { initializeIcons } from "../../@uifabric/icons";
// <ListImport>
import { DetailsListDocumentsExample } from "../index";
// </ListImport>
import { IObjectFilter, ISortObject } from "../ListStyle";
import axios from "axios";

initializeIcons();

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
  //   </ListQueryObject>

  // <ListObjectGetData>
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

  //   </ListObjectGetData>

  //   <ListGetFilterObject>
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
  //   </ListGetFilterObject>

  //   <ListClearFilter>
  const onHandleCancelFilter = () => {
    setServerItems([]);
  };
  //   </ListClearFilter>

  // <ListExample>
  return (
    <div className="App">
      <div style={{ height: "250px", width: "900px", position: "relative" }}>
        <DetailsListDocumentsExample
          //   columns={columns}
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
