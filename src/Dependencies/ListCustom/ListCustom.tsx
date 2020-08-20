import * as React from "react";
import { ScrollablePane, ScrollbarVisibility } from "../ScrollablePane";
import { Sticky, StickyPositionType } from "../Sticky";
import { Selection, SelectionMode } from "../@uifabric/utilities/selection";
import {
  DetailsHeader,
  DetailsListLayoutMode,
  IColumn,
  IDetailsListProps,
  DetailsRow,
  IDetailsRowStyles,
  IDetailsHeaderStyles,
  DetailsRowFields,
  IDetailsRowFieldsProps,
} from "../DetailsList";
import { ShimmeredDetailsList } from "../DetailsList/ShimmeredDetailsList";
import { MarqueeSelection } from "../MarqueeSelection";
import {
  StateListWrapper,
  IListProps,
  IListStates,
  IColumn as IColumnCustom,
  IObjectFilter,
  MenuFilterWrapper,
} from "./ListStyle";
import {
  IContextualMenuProps,
  DirectionalHint,
  ContextualMenu,
  ContextualMenuItemType,
  IContextualMenuItem,
} from "../@uifabric/utilities/ContextualMenu copy";
import { Panel, PanelType } from "../Panel";
import { Checkbox } from "../Checkbox/index";
import FilterElement from "./filterPanel";
import { IGroup } from "../GroupedList/GroupedList.types";

const FILE_ICONS: { name: string }[] = [
  { name: "accdb" },
  { name: "audio" },
  { name: "code" },
  { name: "csv" },
  { name: "docx" },
  { name: "dotx" },
  { name: "mpp" },
  { name: "mpt" },
  { name: "model" },
  { name: "one" },
  { name: "onetoc" },
  { name: "potx" },
  { name: "ppsx" },
  { name: "pdf" },
  { name: "photo" },
  { name: "pptx" },
  { name: "presentation" },
  { name: "potx" },
  { name: "pub" },
  { name: "rtf" },
  { name: "spreadsheet" },
  { name: "txt" },
  { name: "vector" },
  { name: "vsdx" },
  { name: "vssx" },
  { name: "vstx" },
  { name: "xlsx" },
  { name: "xltx" },
  { name: "xsn" },
];

export class DetailsListDocumentsExample extends React.Component<
  IListProps,
  IListStates
> {
  private _selection: Selection;
  constructor(props: IListProps) {
    super(props);
    this._selection = new Selection({
      onSelectionChanged: () => {
        this.setState({
          selectionDetails: this._getSelectionDetails(),
        });
      },
    });

    this.state = {
      items: [],
      columns: this.props.columns,
      selectionDetails: this._getSelectionDetails(),
      contextualMenu: undefined,
      isSortedDescending: false,
      isPanelVisible: false,
      currentColumn: null,
      filterBy: [],
      filterItemsResult: undefined,
      filterColumsResult: undefined,
      targetColumn: undefined,
      itemCount: 0,
      newFilterColumns: [],
      page: 1,
      isFiltered: false,
      order: undefined,
      filterData: [],
      groups: [],
      filterGroupResult: [],
    };
  }

  componentDidMount() {
    if (this.state.page === 1) {
      this.props.onGetItemsList &&
        this.props.onGetItemsList(this.state.page, this.props.itemCount);
      this.onSetDefaultColumns();
    }

    let processing = localStorage.getItem("processing");
    if (processing) {
      let val = JSON.parse(processing);
      let newCol = this.state.columns.filter((col) => val.includes(col.key));
      this.setState({
        newFilterColumns: val,
      });
      this.onSetDefaultColumns(newCol);
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps: IListProps) {
    this.onSetDefaultItems(nextProps.items);
  }

  // examples get data form server
  onGetItemLazy = async (itemCount: number, type?: string) => {
    if (!type) {
      await this.setState({
        page: this.state.page + 1,
      });
    }
    this.props.onGetItemsList &&
      this.state.page >= 1 &&
      this.props.onGetItemsList(
        this.state.page,
        itemCount,
        this.state.order,
        this.state.currentColumn?.fieldName
      );
  };

  onSetDefaultColumns = async (columnsSaved?: IColumnCustom[]) => {
    let dataColumn = columnsSaved ? columnsSaved : this.props.columns;
    let newColumns = await dataColumn.map((col) => {
      if (col.key !== "columnIcon") {
        return (col = {
          ...col,
          isResizable: col.isResizable || true,
          isCollapsible: col.isCollapsible || false, // scroll-x  = true if this true
          isSorted: col.isSorted || false,
          isSortedDescending: col.isSortedDescending || false,
          sortAscendingAriaLabel: "Sorted A to Z",
          sortDescendingAriaLabel: "Sorted Z to A",
          isPadded: col.isPadded || true,
          maxWidth: col.maxWidth || 450,
          isDisable: col.isDisable || false,
          priority: col.priority || 999,
          isFilter: false,
          onColumnClick: this.onHeaderClick,
        });
      } else {
        return col;
      }
    });
    newColumns.unshift({
      key: "columnIcon",
      name: "File Type",
      iconName: "Settings",
      className: "column-icon",
      iconClassName: "columnIcon-filter",
      isIconOnly: true,
      isResizable: false,
      priority: 0,
      fieldName: "icon",
      minWidth: 16,
      maxWidth: 16,
      onColumnClick: this.onRenderColumnFilter,
      onRender: (item: any) => {
        return (
          <span>
            <img src={item.iconName} />
          </span>
        );
      },
    });

    let currentGroups = [...this.props.groups];
    if (this.props.groups && this.props.groups.length > 0) {
      let groupsProps = this.props.groups;
      currentGroups.push({
        key: "lastGroup",
        name: "",
        startIndex:
          groupsProps[groupsProps.length - 1].startIndex +
          groupsProps[groupsProps.length - 1].count,
        count: 10,
        level: 1,
        hasMoreData: true,
        isShowingAll: true,
        isCollapsed: false,
      });
    }
    if (!columnsSaved) {
      await this.setState({
        columns: newColumns,
        itemCount: this.props.itemCount,
        groups: this.props.groups && currentGroups,
      });
    }
    if (columnsSaved) {
      await this.setState({
        filterColumsResult: newColumns,
        itemCount: this.props.itemCount,
        groups: this.props.groups && currentGroups,
      });
    }
  };

  onRenderColumnFilter = (
    ev: React.MouseEvent<HTMLElement>,
    column: IColumn
  ): void => {
    this.setState({
      contextualMenu: this._getContextualMenuFilterProps(ev, column),
      currentColumn: column,
    });
  };

  onHeaderClick = (
    ev: React.MouseEvent<HTMLElement>,
    column: IColumn
  ): void => {
    this.setState({
      contextualMenu: this._getContextualMenuProps(ev, column),
      currentColumn: column,
    });
  };

  onSetDefaultItems = async (itemsProps: any[]) => {
    let newItems = await itemsProps.map((item) => {
      let itemArr: string[] = [];
      if (item.fileName) {
        itemArr = item.fileName.split(".");
      }
      if (itemArr.length > 0) {
        let iconFile =
          FILE_ICONS.findIndex(
            (icon) => icon.name === itemArr[itemArr.length - 1]
          ) !== -1
            ? `https://static2.sharepointonline.com/files/fabric/assets/item-types/16/${
                itemArr[itemArr.length - 1]
              }.svg`
            : this.props.darkMode === "dark"
            ? `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAAeElEQVQ4je3SvQqAIBSG4aOG3ok4hIMu3f/S8h1psOuxpaAfDFsaoncSOTwiHEFrAArdJKWcQwh9dQBAqQWg5JxLSmm6wHev7nPOkTHGn5FmQClF1lqhtfbMPG73XSvAzNtRENHwCIgx1rD2L9T6gU8Ah0XaL8hrLVijOmvMGfWyAAAAAElFTkSuQmCC`
            : `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAAfElEQVQ4jWNkgAJjY+P/DHgABwfH1aNHj+rgVGBsbPwfFzA2Nv4fFBT038bG5gK6PiZ8tiKD+fPnM0hISOihG0K0AXx8fAyzZ89mFBER0bOxsTkOE2ch1gATExMYk5GBgcGCJAPOnDmDyzDivYALjBowLAxASUjICYRuAAC7eC/cDLXGlQAAAABJRU5ErkJggg==`;
        return (item = {
          ...item,
          iconName: item.iconName || iconFile,
          fileType: itemArr[itemArr.length - 1],
        });
      } else {
        return item;
      }
    });
    if (!this.state.isFiltered) {
      await this.setState({ items: newItems });
    }
  };

  onChoiceItemSort = (
    ev?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>,
    item?: IContextualMenuItem
  ): void => {
    if (item) {
      let currentKey = item?.key;
      const {
        columns,
        items,
        currentColumn,
        filterColumsResult,
        filterItemsResult,
      } = this.state;
      let columnToSort = filterColumsResult ? filterColumsResult : columns;
      let itemsToSort = items;
      const newColumns: IColumn[] = columnToSort.slice();
      if (currentColumn && currentKey !== "filterBy") {
        const currColumn: IColumn = newColumns.filter(
          (currCol) => currentColumn.key === currCol.key
        )[0];
        const sortList: any = {
          aToZ: [true],
          zToA: [false],
        };
        if (!this.props.loading) {
          newColumns.forEach((newCol: IColumn) => {
            if (newCol === currColumn) {
              currColumn.isSortedDescending = sortList[currentKey][0];
              currColumn.isSorted = true;
            } else {
              newCol.isSorted = false;
              newCol.isSortedDescending = false;
            }
          });
          let newItems = [];
          let result: any = [];
          let newGroups: IGroup[] = [];
          let filterGroup =
            this.state.filterGroupResult &&
            this.state.filterGroupResult.length > 0
              ? this.state.filterGroupResult
              : this.state.groups;
          if (this.props.groups) {
            if (filterGroup && filterGroup.length > 0) {
              filterGroup.forEach((gr) => {
                let currentItems = filterItemsResult
                  ? [...filterItemsResult]
                  : [...items];
                let childArr =
                  gr.key !== "lastGroup"
                    ? currentItems.splice(gr.startIndex, gr.count)
                    : currentItems.splice(gr.startIndex);
                let groupItems = _copyAndSort(
                  childArr,
                  currColumn.fieldName!,
                  currColumn.isSortedDescending
                );
                result = [...result, ...groupItems];
              });
              if (currColumn.fieldName === "name") {
                newGroups = _copyAndSort(
                  filterGroup,
                  "name",
                  currColumn.isSortedDescending
                );
              }
            }
          } else {
            newItems = _copyAndSort(
              itemsToSort,
              currColumn.fieldName!,
              currColumn.isSortedDescending
            );
          }
          if (!filterColumsResult) {
            this.setState({
              columns,
              filterColumsResult: newColumns,
              filterItemsResult: newItems.length > 0 ? newItems : result,
              contextualMenu: undefined,
              filterGroupResult: newGroups.length > 0 ? newGroups : filterGroup,
            });
          }
          if (filterColumsResult) {
            this.setState({
              filterColumsResult: newColumns,
              columns,
              filterItemsResult: newItems.length > 0 ? newItems : result,
              contextualMenu: undefined,
              filterGroupResult: newGroups.length > 0 ? newGroups : filterGroup,
            });
          }
        } else {
          newColumns.forEach((newCol: IColumn) => {
            if (newCol === currColumn) {
              currColumn.isSortedDescending = sortList[currentKey][0];
              currColumn.isSorted = true;
            } else {
              newCol.isSorted = false;
              newCol.isSortedDescending = false;
            }
          });
          this.setState({
            filterColumsResult: newColumns,
          });
          this.props.onGetQueryObject &&
            this.props.onGetQueryObject(
              {
                count: this.state.itemCount,
                order: sortList[currentKey][0] ? "asc" : "desc",
                key: currentColumn.fieldName!,
              },
              this.state.filterData
            );
        }
      }
      if (currentColumn && currentKey === "filterBy") {
        const currColumn: IColumn = newColumns.filter(
          (currCol) => currentColumn.key === currCol.key
        )[0];
        newColumns.forEach((newCol: IColumn) => {
          newCol.isSorted = false;
        });
        if (filterColumsResult) {
          this.setState({
            isPanelVisible: true,
            columns,
            filterColumsResult: newColumns,
            targetColumn: currColumn,
          });
        }
        if (!filterColumsResult) {
          this.setState({
            isPanelVisible: true,
            columns: newColumns,
            targetColumn: currColumn,
          });
        }
      }
    }
  };

  onSetVisiblePanel = () => {
    this.setState({
      isPanelVisible: !this.state.isPanelVisible,
      filterBy: [],
    });
  };

  onGetResultArr = async (itemsArr: any[], type?: string) => {
    let columnsArr = this.state.columns;
    let currentItem = this.state.items;
    let groupsProps = [...this.state.groups];
    if (!type) {
      let index = columnsArr.findIndex(
        (col) => col.key === this.state.targetColumn?.key
      );
      if (index !== -1) {
        columnsArr[index].isFilter = true;
      }
    }
    if (itemsArr && groupsProps) {
      let currentGroup = await groupsProps.map((gr) => {
        return (gr = { ...gr, count: 0, startIndex: 0, isCollapsed: false });
      });
      itemsArr.forEach((item) => {
        let index = currentItem.findIndex(
          (curItem) => curItem.key === item.key
        );
        if (index !== -1) {
          groupsProps.forEach((gr) => {
            if (index >= gr.startIndex && index < gr.startIndex + gr.count) {
              let indexCurGroup = currentGroup.findIndex(
                (doc) => doc.key === gr.key
              );
              if (indexCurGroup !== -1) {
                currentGroup[indexCurGroup].count =
                  currentGroup[indexCurGroup].count + 1;
              }
            }
          });
        }
      });
      let i = currentGroup.length;
      while (i--) {
        if (currentGroup[i].count === 0) {
          currentGroup.splice(i, 1);
        }
      }
      for (let i = 0; i < currentGroup.length; i++) {
        if (i > 0) {
          currentGroup[i].startIndex =
            currentGroup[i - 1].startIndex + currentGroup[i - 1].count;
        }
        if (i === 0) {
          currentGroup[i].startIndex = 0;
        }
      }
      this.setState({
        filterItemsResult: itemsArr,
        filterGroupResult: currentGroup ? currentGroup : this.state.groups,
      });
    }
    if (itemsArr && !groupsProps) {
      this.setState({
        filterItemsResult: itemsArr,
      });
    }
    this.setState({
      isPanelVisible: false,
    });
  };

  onScrollList = (event: React.MouseEvent<HTMLDivElement, UIEvent>): void => {
    let listItem: HTMLElement = document.getElementsByClassName(
      "ms-ScrollablePane--contentContainer"
    )[0] as HTMLElement;
    let currentColumn = [...this.state.columns];
    if (
      listItem &&
      Math.ceil(listItem?.scrollTop) ===
        listItem?.scrollHeight - listItem?.offsetHeight
    ) {
      !this.state.isFiltered && this.onGetItemLazy(this.state.itemCount);
      let index = currentColumn.findIndex((item) => item.isSorted);
      if (index !== -1) {
        currentColumn[index].isSorted = false;
        this.setState({ columns: currentColumn });
      }
    }
  };

  onCancelFilter = async (key: string) => {
    let columnsArr = [...this.state.columns];
    let columnsFilteredArr = this.state.filterColumsResult;
    let currentFilter = [...this.state.filterData];
    let index = currentFilter.findIndex((filter) => filter.columnKey === key);
    for (const i in columnsArr) {
      if (columnsArr[i].isFilter && columnsArr[i].key === key) {
        columnsArr[i] = { ...columnsArr[i], isFilter: false };
        break;
      }
    }
    if (columnsFilteredArr && columnsFilteredArr.length > 0) {
      for (const i in columnsFilteredArr) {
        if (
          columnsFilteredArr[i].isFilter &&
          columnsFilteredArr[i].key === key
        ) {
          columnsFilteredArr[i] = { ...columnsFilteredArr[i], isFilter: false };
          break;
        }
      }
    }
    if (index !== -1) {
      currentFilter.splice(index, 1);
    }
    if (currentFilter.length >= 1 && this.state.isFiltered) {
      let result = await this.onChangeFilterData(currentFilter);
      if (result.length > 0) {
        this.onGetResultArr(result, "remove");
        this.setState({
          filterItemsResult: result,
          filterData: currentFilter,
          columns: columnsArr,
        });
      }
    }
    if (currentFilter.length < 1) {
      await this.setState({
        isFiltered: false,
        page: 1,
        items: [],
        order: undefined,
        filterData: currentFilter,
        filterGroupResult: [],
        columns: columnsArr,
        filterColumsResult: undefined,
      });
    }
    this.props.onRemoveFilter &&
      this.props.onRemoveFilter(currentFilter.length);
    if (this.state.filterData.length > 0 && !this.state.isFiltered) {
      this.props.onGetFilterObject &&
        this.props.onGetFilterObject(this.state.filterData);
    }
    if (this.state.filterData.length < 1 && !this.state.isFiltered) {
      this.setState({ filterItemsResult: undefined });
      this.onGetItemLazy(this.state.itemCount, "remove");
    }
    localStorage.removeItem("processing");
  };

  onChangeFilterData = async (filterData: IObjectFilter[], data?: any[]) => {
    let items = [...this.state.items];
    filterData.forEach((doc) => {
      let filterData: any[] = [];
      switch (doc.operator) {
        case "eq":
          if (typeof doc.value === "boolean") {
            let resultBoolean = items.filter((item) => {
              if (item[doc.key] === doc.value) {
                return true;
              }
              return false;
            });
            filterData = [...filterData, ...resultBoolean];
          } else if (
            Object.prototype.toString.call(doc.value) === "[object Date]"
          ) {
            let resultDate = items.filter((item) => {
              let selectedDate = new Date(item[doc.key]);
              if (
                Object.prototype.toString.call(doc.value) === "[object Date]" &&
                selectedDate.setHours(0, 0, 0, 0).valueOf() ===
                  doc.value?.valueOf()
              ) {
                return true;
              }
              return false;
            });
            filterData = [...filterData, ...resultDate];
          } else {
            let resultEqual = items.filter((item) => {
              let itemVal =
                typeof item[doc.key] === "string"
                  ? item[doc.key].toLocaleLowerCase()
                  : item[doc.key].toString();
              if (itemVal === doc.value) {
                return true;
              }
              return false;
            });
            filterData = [...filterData, ...resultEqual];
          }
          break;

        case "ne":
          let resultNotEqual = items.filter((item) => {
            let itemVal =
              typeof item[doc.key] === "string"
                ? item[doc.key].toLocaleLowerCase()
                : item[doc.key].toString();
            if (itemVal !== doc.value) {
              return true;
            }
            return false;
          });
          filterData = [...filterData, ...resultNotEqual];
          break;

        case "contains":
          if (Object.prototype.toString.call(doc.value) === "[object Date]") {
            let resultDateContain = items.filter((item) => {
              let selectedDate = new Date(item[doc.key]);
              if (Array.isArray(doc.value)) {
                let index = doc.value?.findIndex(
                  (val: { date: Date }) =>
                    val.date.valueOf() ===
                    selectedDate.setHours(0, 0, 0, 0).valueOf()
                );
                if (index !== -1) {
                  return true;
                }
              }
              return false;
            });
            filterData = [...filterData, ...resultDateContain];
          } else {
            let resultContain = items.filter((item) => {
              let string =
                typeof item[doc.key] === "string"
                  ? item[doc.key].toLocaleLowerCase()
                  : item[doc.key].toString();
              if (string.indexOf(doc.value) !== -1) {
                return true;
              }
              return false;
            });
            filterData = [...filterData, ...resultContain];
          }
          break;

        case "not":
          let resultNotContain = items.filter((item) => {
            let string =
              typeof item[doc.key] === "string"
                ? item[doc.key].toLocaleLowerCase()
                : item[doc.key].toString();
            if (string.indexOf(doc.value) === -1) {
              return true;
            }
            return false;
          });
          filterData = [...filterData, ...resultNotContain];
          break;

        default:
          break;
      }
      items = filterData;
    });
    return items;
  };

  onGetFilterObj = async (obj: IObjectFilter) => {
    let currentFilter = [...this.state.filterData];
    let index = await currentFilter.findIndex(
      (filter) => filter.columnKey === obj.columnKey
    );
    if (index === -1) {
      currentFilter.push(obj);
      await this.setState({
        isFiltered: true,
        filterData: currentFilter,
      });
    }
    if (index !== -1) {
      currentFilter[index] = obj;
      await this.setState({
        isFiltered: true,
        filterData: currentFilter,
      });
    }
    this.props.onGetFilterObject &&
      this.props.loading &&
      this.props.onGetFilterObject(currentFilter);
  };

  public render() {
    const {
      columns,
      items,
      contextualMenu,
      isPanelVisible,
      targetColumn,
      filterItemsResult,
      filterColumsResult,
      groups,
      filterGroupResult,
    } = this.state;

    return (
      <StateListWrapper
        onScroll={this.onScrollList}
        theme={{ ...this.state, darkMode: this.props.darkMode }}
      >
        <ScrollablePane scrollbarVisibility={ScrollbarVisibility.auto}>
          {columns.length > 0 && (
            <MarqueeSelection selection={this._selection}>
              <ShimmeredDetailsList
                items={
                  // filterItemsResult && !this.props.loading
                  filterItemsResult ? filterItemsResult : items
                }
                compact={false}
                columns={
                  filterColumsResult && filterColumsResult.length > 0
                    ? filterColumsResult
                    : columns
                }
                groups={
                  filterGroupResult && filterGroupResult.length > 0
                    ? filterGroupResult
                    : groups
                }
                // enableShimmer={true}
                selectionMode={SelectionMode.multiple}
                // getKey={this._getKey}
                setKey="multiple"
                layoutMode={DetailsListLayoutMode.justified}
                isHeaderVisible={true}
                selection={this._selection}
                selectionPreservedOnEmptyClick={true}
                useFastIcons={false}
                onRenderRow={this._onRenderRow}
                onRenderDetailsHeader={this._onRenderDetailsHeader}
                onCancelFilter={(key: string) => this.onCancelFilter(key)}
              />
            </MarqueeSelection>
          )}
        </ScrollablePane>
        {contextualMenu && (
          <ContextualMenu
            onItemClick={this.onChoiceItemSort}
            {...contextualMenu}
            styles={{
              root: {
                background:
                  this.props.darkMode === "dark" ? "#212121" : "#ffffff",
                border: this.props.darkMode
                  ? "1px solid #000000"
                  : "transparent",
              },
              subComponentStyles: {
                menuItem: () => {
                  return {
                    root: [
                      {
                        color:
                          this.props.darkMode === "dark"
                            ? "#ffffff"
                            : "#212121",
                      },
                      {
                        selectors: {
                          ":hover": {
                            background:
                              this.props.darkMode === "dark"
                                ? "#445B6C"
                                : "#F4F4F4",
                            color:
                              this.props.darkMode === "dark"
                                ? "#ffffff"
                                : "#212121",
                          },
                          ":active": {
                            background:
                              this.props.darkMode === "dark"
                                ? "#445B6C"
                                : "#F4F4F4",
                            color:
                              this.props.darkMode === "dark"
                                ? "#ffffff"
                                : "#212121",
                          },
                        },
                      },
                    ],
                  };
                },
              },
            }}
          />
        )}
        <Panel
          isOpen={isPanelVisible}
          onDismiss={this.onSetVisiblePanel}
          headerText="Filter by"
          closeButtonAriaLabel="Close"
          isLightDismiss={true}
          customWidth={"321px"}
          type={PanelType.custom}
          styles={{
            headerText: {
              fontSize: "21px",
              color: this.props.darkMode === "dark" ? "#ffffff" : "#000000",
              fontWeight: "300",
            },
            subComponentStyles: {
              closeButton: {
                icon: {
                  fontSize: "15px",
                  color: this.props.darkMode === "dark" ? "#ffffff" : "#000000",
                  fontWeight: "normal",
                },
                rootHovered: {
                  background:
                    this.props.darkMode === "dark" ? "#000000" : "#F4F4F4",
                  color: this.props.darkMode === "dark" ? "#ffffff" : "#000000",
                },
                rootPressed: {
                  backgroundColor:
                    this.props.darkMode === "dark" ? "#333333" : "#c8c8c8",
                },
              },
            },
            content: {
              paddingLeft: "32px",
              height: "100%",
              paddingBottom: 0,
              background:
                this.props.darkMode === "dark" ? "#212121" : "#ffffff",
            },
            header: {
              paddingLeft: "32px",
            },
            contentInner: {
              height: "100%",
            },
            scrollableContent: {
              height: "100%",
            },
            commands: {
              margin: 0,
              paddingTop: "10px",
              background:
                this.props.darkMode === "dark" ? "#212121" : "#ffffff",
            },
          }}
        >
          {targetColumn && (
            <FilterElement
              targetColumn={targetColumn}
              items={filterItemsResult ? filterItemsResult : items}
              onGetItem={this.onGetResultArr}
              columns={columns}
              darkMode={this.props.darkMode}
              onGetFilterObject={this.onGetFilterObj}
              loading={this.props.loading}
            />
          )}
        </Panel>
      </StateListWrapper>
    );
  }

  private _onRenderDetailsHeader: IDetailsListProps["onRenderDetailsHeader"] = (
    props
  ) => {
    const customStyles: Partial<IDetailsHeaderStyles> = {};
    if (props) {
      let { darkMode } = this.props;
      customStyles.root = {
        height: "30px",
        color: darkMode === "dark" ? "#ffffff" : "#333333",
        background: darkMode === "dark" ? "#212121" : "#ffffff",
        borderBottom:
          darkMode === "dark" ? "1px solid #000000" : "1px solid #EAEAEA",
        paddingBottom: 0,
      };
      return (
        <Sticky stickyPosition={StickyPositionType.Header} isScrollSynced>
          <DetailsHeader
            {...props}
            styles={customStyles}
            ariaLabelForToggleAllGroupsButton={"Toggle selection"}
          />
        </Sticky>
      );
    }
    return null;
  };

  private _getContextualMenuProps(
    ev: React.MouseEvent<HTMLElement>,
    column: IColumn
  ): IContextualMenuProps {
    const items = [
      {
        key: "aToZ",
        name: "A to Z",
        canCheck: true,
      },
      {
        key: "zToA",
        name: "Z to A",
        canCheck: true,
      },
      {
        key: "divider_1",
        itemType: ContextualMenuItemType.Divider,
      },
      {
        key: "filterBy",
        name: "Filter By",
        canCheck: true,
        checked: column.isGrouped,
      },
    ];
    return {
      items: items,
      target: ev.currentTarget as HTMLElement,
      directionalHint: DirectionalHint.bottomLeftEdge,
      gapSpace: -5,
      // isBeakVisible: true,
      onDismiss: this._onContextualMenuDismissed,
    };
  }
  private _getContextualMenuFilterProps(
    ev: React.MouseEvent<HTMLElement>,
    column: IColumn
  ): IContextualMenuProps {
    let itemsFilter: {
      key: string;
      name: string;
      onRender?: (
        item: any,
        dismissMenu: (ev?: any, dismissAll?: boolean) => void
      ) => JSX.Element;
    }[] = [];
    let currentColumn = [...this.state.columns];
    currentColumn.forEach((col) => {
      if (col.key !== "columnIcon") {
        itemsFilter.push({ key: col.key, name: col.name });
      }
    });

    if (itemsFilter.length > 0) {
      for (let i = 0; i < itemsFilter.length; i++) {
        itemsFilter[i] = {
          ...itemsFilter[i],
          onRender: (
            item: any,
            dismissMenu: (ev?: any, dismissAll?: boolean) => void
          ) => {
            return (
              <MenuFilterWrapper theme={this.props.darkMode}>
                <Checkbox
                  checked={this.state.newFilterColumns.includes(item.key)}
                  onChange={(e) => this.onCheckFilter(e, itemsFilter[i].key)}
                  title={item.name}
                  label={item.name}
                />
              </MenuFilterWrapper>
            );
          },
        };
      }
    }

    return {
      items: itemsFilter,
      target: ev.currentTarget as HTMLElement,
      directionalHint: DirectionalHint.bottomLeftEdge,
      gapSpace: -5,
      onDismiss: this.onFilterColumn,
    };
  }

  onCheckFilter = (
    ev?: React.FormEvent<HTMLElement | HTMLInputElement>,
    itemKey?: string
  ) => {
    let currentFilterArr = [...this.state.newFilterColumns];
    if (itemKey) {
      let index = currentFilterArr.findIndex((doc) => doc === itemKey);
      if (index !== -1) {
        currentFilterArr.splice(index, 1);
        this.setState({ newFilterColumns: currentFilterArr });
      }
      if (index === -1) {
        currentFilterArr.push(itemKey);
        this.setState({ newFilterColumns: currentFilterArr });
      }
    }
  };

  onFilterColumn = (): void => {
    let currentColumn = [...this.state.columns];
    let arrColumnsFilter = [...this.state.newFilterColumns];
    let result = currentColumn.filter((col) => {
      if (
        arrColumnsFilter.includes(col.key) ||
        (arrColumnsFilter.length > 0 && col.key === "columnIcon")
      ) {
        return true;
      }
      return false;
    });
    this.setState({
      contextualMenu: undefined,
      filterColumsResult: result,
    });
    if (this.state.newFilterColumns.length > 0) {
      localStorage.setItem(
        "processing",
        JSON.stringify(this.state.newFilterColumns)
      );
    } else {
      localStorage.removeItem("processing");
      this.setState({
        filterColumsResult: undefined,
      });
    }
  };

  private _onContextualMenuDismissed = (): void => {
    this.setState({
      contextualMenu: undefined,
    });
  };

  private _getSelectionDetails(): void {
    const selectionItem = this._selection.getSelection();
    this.props.onGetSelectionItem &&
      this.props.onGetSelectionItem(selectionItem);
  }

  private _onRenderRow: IDetailsListProps["onRenderRow"] = (props) => {
    const customStyles: Partial<IDetailsRowStyles> = {};
    if (props) {
      let { darkMode } = this.props;
      if (props.item.isDisable) {
        customStyles.root = {
          color: darkMode === "dark" ? "#D5D5D5" : "#333333",
          background: darkMode === "dark" ? "#3c3c3c" : "#ffffff",
          borderBottom:
            darkMode === "dark" ? "1px solid transparent" : "1px solid #ffffff",
        };
      } else {
        customStyles.root = {
          color: darkMode === "dark" ? "#ffffff" : "#333333",
          background: darkMode === "dark" ? "#3c3c3c" : "#ffffff",
          borderBottom:
            darkMode === "dark" ? "1px solid transparent" : "1px solid #ffffff",
          // borderBottom:
          // darkMode === "dark" ? "1px solid #000000" : "1px solid #F4F4F4",
        };
      }
      return (
        <DetailsRow
          rowFieldsAs={this.renderRowFields}
          {...props}
          styles={customStyles}
        />
      );
    }
    return null;
  };

  renderRowFields = (props: IDetailsRowFieldsProps) => {
    const onRowFieldsClick = (item: any) => {
      this.props.onRowClick && this.props.onRowClick(item);
    };
    return (
      <span
        id={props.item.key}
        data-selection-disabled={true}
        onClick={() => onRowFieldsClick(props.item)}
      >
        <DetailsRowFields {...props} />
      </span>
    );
  };
}

function _copyAndSort<T>(
  items: T[],
  columnKey: string,
  isSortedDescending?: boolean
): T[] {
  const key = columnKey as keyof T;
  let item = items.find((node) => node[key]);
  let typeValue = item && typeof item[key];

  switch (typeValue) {
    case "number":
      return items
        .slice(0)
        .sort((a: T, b: T) =>
          (isSortedDescending ? a[key] < b[key] : a[key] > b[key])
            ? 1
            : a[key] === b[key]
            ? 0
            : -1
        );

    case "boolean":
      return items.slice(0).sort((a: T, b: T) => {
        return isSortedDescending
          ? a[key] === b[key]
            ? 0
            : a[key]
            ? -1
            : 1
          : a[key] === b[key]
          ? 0
          : a[key]
          ? 1
          : -1;
      });

    case "object":
      let isDateObject =
        item && Object.prototype.toString.call(item[key]) === "[object Date]";
      if (isDateObject) {
        return items.splice(0).sort((a: T, b: T) => {
          return (isSortedDescending ? a[key] < b[key] : a[key] > b[key])
            ? 1
            : a[key] === b[key]
            ? 0
            : -1;
        });
      } else {
        return items;
      }

    default:
      return items.slice(0).sort((a: T, b: T) => {
        if (a[key] === b[key]) {
          return 0;
        } else if (!a[key] || !b[key]) {
          return 1;
        } else if (isSortedDescending) {
          return a[key] < b[key] ? -1 : 1;
        } else {
          return a[key] < b[key] ? 1 : -1;
        }
      });
  }
}
