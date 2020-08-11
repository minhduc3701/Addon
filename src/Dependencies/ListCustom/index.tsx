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
import { Icon } from "../@uifabric/icons";
import { Panel, PanelType } from "../Panel";
import { Checkbox } from "../Checkbox/index";
import FilterElement from "./filterPanel";
import { ShimmerStylingExample } from "../Shimmer/examples/Shimmer.Styling.Example";

// <ListDefaultColumns>
const defaultColumns: IColumnCustom[] = [
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
        // hour: "numeric",
        // hour12: true,
        // minute: "2-digit",
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
// </ListDefaultColumns>
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
      columns: defaultColumns,
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
      page: 0,
      isFiltered: false,
      order: undefined,
      filterObject: undefined,
    };
  }

  componentDidMount() {
    let itemHeight = document.getElementById("listWrapper")?.clientHeight;
    let count = 0;
    if (itemHeight) {
      count = Math.floor(itemHeight / 43 + 1);
      this.setState({ itemCount: count });
      if (this.state.page < 1) {
        this.props.onGetItemsList &&
          this.props.onGetItemsList(this.state.page +1, count);
      this.setState({ page: this.state.page + 1 });
      }
      this.onSetDefaultColumns();
    }
    let processing = localStorage.getItem("processing");
    if (processing) {
      let val = JSON.parse(processing);
      let newCol = this.state.columns.filter((col) => val.includes(col.key));
      this.setState({
        newFilterColumns: val,
        // filterColumsResult: newCol,
      });
      this.onSetDefaultColumns(newCol);
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps: IListProps) {
    // if (this.state.page < 1) {
    //   this.setState({ page: this.state.page + 1 });
    // }
    this.onSetDefaultItems(nextProps.items);
  }

  // examples get data form server
  onGetItemLazy = async (itemCount: number, items?: any[]) => {
    await this.setState({
      page: this.state.page + 1,
    });
    this.props.onGetItemsList &&
      this.state.page > 0 &&
      this.props.onGetItemsList(
        this.state.page,
        itemCount,
        this.state.order,
        this.state.currentColumn?.fieldName
      );
  };

  onSetDefaultColumns = async (columnsSaved?: IColumnCustom[]) => {
    let dataColumn = columnsSaved
      ? columnsSaved
      : this.props.columns
      ? this.props.columns
      : defaultColumns;
    let newColumns = await dataColumn.map((col) => {
      if (col.key !== "columnIcon") {
        return (col = {
          ...col,
          isResizable: col.isResizable || true,
          isCollapsible: col.isCollapsible || true, // scroll-x  = true if this true
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
    if (!columnsSaved) {
      await this.setState({ columns: newColumns });
    }

    if (columnsSaved) {
      await this.setState({ filterColumsResult: newColumns });
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
      let itemArr = [];
      if (item.fileName) {
        itemArr = item.fileName.split(".");
      }
      if (itemArr.length > 0) {
        return (item = {
          ...item,
          iconName: `https://static2.sharepointonline.com/files/fabric/assets/item-types/16/${
            itemArr[itemArr.length - 1]
          }.svg`,
          fileType: itemArr[itemArr.length - 1],
        });
      } else {
        return item;
      }
    });
    await this.setState({ items: newItems });
  };

  onChoiceItemSort = (
    ev?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>,
    item?: IContextualMenuItem
  ): void => {
    if (item) {
      let currentKey = item?.key;
      const { columns, items, currentColumn, filterColumsResult } = this.state;
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
          const newItems = _copyAndSort(
            itemsToSort,
            currColumn.fieldName!,
            currColumn.isSortedDescending
          );
          if (!filterColumsResult) {
            this.setState({
              columns,
              filterColumsResult: newColumns,
              items: newItems,
              contextualMenu: undefined,
            });
          }
          if (filterColumsResult) {
            this.setState({
              filterColumsResult: newColumns,
              columns,
              items: newItems,
              contextualMenu: undefined,
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
              this.state.filterObject
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

  onGetResultArr = (arr: any[]) => {
    let columnsArr = this.state.columns;
    columnsArr.forEach((item) => {
      if (item.isFilter) {
        item.isFilter = false;
      }
    });
    let index = columnsArr.findIndex(
      (col) => col.key === this.state.targetColumn?.key
    );
    if (index !== -1) {
      columnsArr[index].isFilter = true;
    }

    if (arr) {
      this.setState({
        filterItemsResult: arr,
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

  onCancelFilter = async () => {
    let columnsArr = this.state.columns;
    columnsArr.forEach((item) => {
      if (item.isFilter) {
        item.isFilter = false;
      }
    });
    await this.setState({
      filterItemsResult: undefined,
      filterColumsResult: undefined,
      isFiltered: false,
      page: 0,
      items: [],
      order: undefined,
      filterObject: undefined,
    });
    this.props.onRemoveFilter && this.props.onRemoveFilter();
    this.onGetItemLazy(this.state.itemCount);
    localStorage.removeItem("processing");
  };

  onGetFilterObj = (obj: IObjectFilter) => {
    this.setState({ isFiltered: true, filterObject: obj });
    this.props.onGetFilterObject &&
      this.props.loading &&
      this.props.onGetFilterObject(obj);
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
    } = this.state;

    return (
      <StateListWrapper
        id="listWrapper"
        onScroll={this.onScrollList}
        theme={{ ...this.state, darkMode: this.props.darkMode }}
      >
        <ScrollablePane scrollbarVisibility={ScrollbarVisibility.auto}>
          {columns.length > 0 && (
            <MarqueeSelection selection={this._selection}>
              <ShimmeredDetailsList
                items={
                  filterItemsResult && !this.props.loading
                    ? filterItemsResult
                    : items
                }
                compact={false}
                columns={
                  filterColumsResult && filterColumsResult.length > 0
                    ? filterColumsResult
                    : columns
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
                onCancelFilter={this.onCancelFilter}
                // styles={{
                //   root: [
                //     {
                //       selectors: {
                //         ":after": {
                //           // backgroundColor: this.props.darkMode && "#212121",
                //           backgroundImage:
                //             "linear-gradient(transparent 30%, rgba(255, 255, 255, 0.4) 65%, rgb(27, 26, 25) 100%)",
                //         },
                //       },
                //     },
                //   ],
                // }}
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
                    this.props.darkMode === "dark" ? "#000000" : "#ffffff",
                  color: this.props.darkMode === "dark" ? "#ffffff" : "#000000",
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
              items={items}
              onGetItem={this.onGetResultArr}
              columns={columns}
              darkMode={this.props.darkMode}
              onGetFilterObject={this.onGetFilterObj}
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
          background: darkMode === "dark" ? "#212121" : "#ffffff",
          borderBottom:
            darkMode === "dark" ? "1px solid transparent" : "1px solid #ffffff",
        };
      } else {
        customStyles.root = {
          color: darkMode === "dark" ? "#ffffff" : "#333333",
          background: darkMode === "dark" ? "#212121" : "#ffffff",
          borderBottom:
            darkMode === "dark" ? "1px solid transparent" : "1px solid #ffffff",
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
