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
  onGetItemLazy = async (itemCount: number) => {
    await this.setState({
      page: this.state.page + 1,
    });
    this.props.onGetItemsList &&
      this.state.page > 1 &&
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
      await this.setState({
        columns: newColumns,
        itemCount: this.props.itemCount,
      });
    }
    if (columnsSaved) {
      await this.setState({
        filterColumsResult: newColumns,
        itemCount: this.props.itemCount,
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
    let a = newItems[0];
    type MyInterfaceItems = typeof a;
    if (this.state.page < 2) {
      await this.setState({ page: this.state.page + 1, items: newItems });
    } else {
      await this.setState({ items: newItems });
    }
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

  onGetResultArr = (itemsArr: any[]) => {
    let columnsArr = this.state.columns;
    let index = columnsArr.findIndex(
      (col) => col.key === this.state.targetColumn?.key
    );
    if (index !== -1) {
      columnsArr[index].isFilter = true;
    }

    if (itemsArr) {
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
    let columnsArr = this.state.columns;
    let currentFilter = [...this.state.filterData];
    let index = currentFilter.findIndex((filter) => filter.columnKey === key);
    columnsArr.forEach((col) => {
      if (col.isFilter && col.key === key) {
        col.isFilter = false;
      }
    });
    if (index !== -1) {
      currentFilter.splice(index, 1);
    }
    await this.setState({
      isFiltered: false,
      page: 1,
      items: [],
      order: undefined,
      filterData: currentFilter,
    });
    this.props.onRemoveFilter && this.props.onRemoveFilter();
    if (this.state.filterData.length > 0) {
      this.props.onGetFilterObject &&
        this.props.onGetFilterObject(this.state.filterData);
    } else {
      this.setState({ filterItemsResult: undefined });
      this.onGetItemLazy(this.state.itemCount);
    }
    localStorage.removeItem("processing");
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
                onCancelFilter={(key: string) => this.onCancelFilter(key)}
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
              items={items}
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
