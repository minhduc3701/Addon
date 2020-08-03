import * as React from "react";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import { Toggle } from "office-ui-fabric-react/lib/Toggle";
import { Fabric } from "office-ui-fabric-react/lib/Fabric";
import { Announced } from "office-ui-fabric-react/lib/Announced";
import {
  DetailsList,
  DetailsListLayoutMode,
  Selection,
  SelectionMode,
  IColumn,
  IDetailsListProps,
  DetailsRow,
  IDetailsRowStyles,
} from "office-ui-fabric-react/lib/DetailsList";
import { MarqueeSelection } from "office-ui-fabric-react/lib/MarqueeSelection";
import { mergeStyleSets } from "office-ui-fabric-react/lib/Styling";
import {
  StateListWrapper,
  IListProps,
  IListStates,
  PanelWrapper,
  IColumn as IColumnCustom,
} from "./ListStyle";
import {
  IContextualMenuProps,
  IContextualMenuItem,
  DirectionalHint,
  ContextualMenu,
  ContextualMenuItemType,
} from "office-ui-fabric-react/lib/ContextualMenu";
import { Icon } from "../@uifabric/icons";
import { Panel, PanelType } from "office-ui-fabric-react/lib/Panel";
import { Checkbox } from "../Checkbox/index";
import Button from "../Button";
import { Dropdown, IDropdownOption } from "../Dropdown";
import FilterElement from "./filterPanel";

import { FontSizes } from "../@uifabric/styling";
import { Text } from "office-ui-fabric-react";

const classNames = mergeStyleSets({
  fileIconHeaderIcon: {
    padding: 0,
    fontSize: "16px",
  },
  fileIconCell: {
    textAlign: "center",
    selectors: {
      "&:before": {
        content: ".",
        display: "inline-block",
        verticalAlign: "middle",
        height: "100%",
        width: "0px",
        visibility: "hidden",
      },
    },
  },
  fileIconImg: {
    verticalAlign: "middle",
    maxHeight: "16px",
    maxWidth: "16px",
  },
  controlWrapper: {
    display: "flex",
    flexWrap: "wrap",
  },
  exampleToggle: {
    display: "inline-block",
    marginBottom: "10px",
    marginRight: "30px",
  },
  selectionDetails: {
    marginBottom: "20px",
  },
});
const controlStyles = {
  root: {
    margin: "0 30px 20px 0",
    maxWidth: "300px",
  },
};

export interface IListState {
  columns: IColumn[];
  items: IDocument[];
  selectionDetails: string;
  isModalSelection: boolean;
  isCompactMode: boolean;
  announcedMessage?: string;
}

export interface IDocument {
  key: string;
  name: string;
  value: string;
  iconName: string;
  fileType: string;
  modifiedBy: string;
  dateModified: string;
  dateModifiedValue: number;
  fileSize: string;
  fileSizeRaw: number;
  sharing: string;
}

const defaultColumns: IColumnCustom[] = [
  {
    key: "column1",
    name: "Name",
    fieldName: "name",
    minWidth: 70,
    maxWidth: 455,
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
    data: "object",
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
    maxWidth: 250,
    data: "number",
    onRender: (item: any) => {
      return <span>{item.fileSize}</span>;
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

export class DetailsListDocumentsExample extends React.Component<
  IListProps,
  IListStates
> {
  private _selection: Selection;
  // private _allItems: IDocument[];

  constructor(props: IListProps) {
    super(props);

    // this._allItems = _generateDocuments();

    this._selection = new Selection({
      onSelectionChanged: () => {
        this.setState({
          selectionDetails: this._getSelectionDetails(),
        });
      },
    });

    this.state = {
      items: this.props.items,
      columns: defaultColumns,
      selectionDetails: this._getSelectionDetails(),
      contextualMenu: undefined,
      isSortedDescending: false,
      isPanelVisible: false,
      currentColumn: null,
      filterBy: [],
      filterResult: [],
      targetColumn: undefined,
      filter: {
        type: undefined,
        value: undefined,
      },
    };
  }

  componentDidMount() {
    this.onSetDefaultColumns();
    this.onSetDefaultItems();
  }

  onSetDefaultColumns = async () => {
    let dataColumn = this.props.columns ? this.props.columns : defaultColumns;
    let newColumns = await dataColumn.map((col) => {
      return (col = {
        ...col,
        isResizable: col.isResizable || true,
        isCollapsible: col.isCollapsible || true,
        isSorted: col.isSorted || false,
        isSortedDescending: col.isSortedDescending || false,
        sortAscendingAriaLabel: "Sorted A to Z",
        sortDescendingAriaLabel: "Sorted Z to A",
        isPadded: col.isPadded || true,
        maxWidth: col.maxWidth || 450,
        isDisable: col.isDisable || false,
        onColumnClick: this.onHeaderClick,
      });
    });
    await this.setState({ columns: newColumns });
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

  onSetDefaultItems = async () => {
    let itemsProps = this.props.items;
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

  onChoiceItemSort = (item: any[], index: any, ev: MouseEvent) => {
    let { key } = index;
    const { columns, items, currentColumn } = this.state;
    const newColumns: IColumn[] = columns.slice();
    if (currentColumn && index.key !== "filterBy") {
      const currColumn: IColumn = newColumns.filter(
        (currCol) => currentColumn.key === currCol.key
      )[0];
      const sortList: any = {
        aToZ: [true],
        zToA: [false],
      };
      newColumns.forEach((newCol: IColumn) => {
        if (newCol === currColumn) {
          currColumn.isSortedDescending = sortList[key][0];
          currColumn.isSorted = true;
        } else {
          newCol.isSorted = false;
          newCol.isSortedDescending = false;
        }
      });
      const newItems = _copyAndSort(
        items,
        currColumn.fieldName!,
        currColumn.isSortedDescending
      );
      this.setState({
        columns: newColumns,
        items: newItems,
        contextualMenu: undefined,
      });
    }
    if (currentColumn && index.key === "filterBy") {
      const currColumn: IColumn = newColumns.filter(
        (currCol) => currentColumn.key === currCol.key
      )[0];
      newColumns.forEach((newCol: IColumn) => {
        newCol.isSorted = false;
      });
      this.setState({
        isPanelVisible: true,
        columns: newColumns,
        targetColumn: currColumn,
      });
    }
  };

  onSetVisiblePanel = () => {
    this.setState({
      isPanelVisible: !this.state.isPanelVisible,
      filterBy: [],
    });
  };

  onCheckedBox = (ev?: React.FormEvent<HTMLElement>, value?: string) => {
    let currentFilter = { ...this.state.filter };
    currentFilter = { type: "boolean", value };
    this.setState({ filter: currentFilter });
  };

  onSortByFilter = async () => {
    let items = [...this.state.items];
    let filterArr = [...this.state.filterBy];
    let result = await items.filter((item) => {
      for (const keys in item) {
        let index = filterArr.findIndex(
          (filterItem) => filterItem === item[keys]
        );
        if (index !== -1) {
          return true;
        }
      }
      return false;
    });
    this.setState({
      filterResult: result,
      isPanelVisible: !this.state.isPanelVisible,
      filterBy: [],
    });
  };

  onSelectDrop = (
    event: React.FormEvent<HTMLDivElement>,
    option?: IDropdownOption,
    index?: number
  ) => {
    if (option) {
      this.setState({
        filter: { ...this.state.filter, type: option.key },
      });
    }
  };

  onChangeInput = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string
  ) => {
    if (newValue) {
      this.setState({
        filter: { ...this.state.filter, value: newValue },
      });
    }
  };

  onRenderCheckBox = (type: string): JSX.Element => {
    let targetCol = this.state.targetColumn;
    const options: IDropdownOption[] = [
      { key: "equal", text: "Equal" },
      { key: "notEqual", text: "Does not equal" },
      { key: "contains", text: "Contains" },
      { key: "notContains", text: "Does not contain" },
    ];
    switch (type) {
      case "boolean":
        return (
          <>
            <h4>Is done?</h4>
            <ul>
              <li>
                <Checkbox
                  title="Done"
                  label="Done"
                  checked={
                    this.state.filter && this.state.filter.value === "true"
                      ? true
                      : false
                  }
                  onChange={(e) => this.onCheckedBox(e, "true")}
                />
              </li>
              <li>
                <Checkbox
                  title="Processing"
                  label="Processing"
                  checked={
                    this.state.filter && this.state.filter.value === "false"
                      ? true
                      : false
                  }
                  onChange={(e) => this.onCheckedBox(e, "false")}
                />
              </li>
            </ul>
          </>
        );

      case "object":
        return <h1>a</h1>;

      default:
        return (
          <ul>
            <li>
              <Dropdown
                label="Operator"
                placeHolder="Select filter"
                options={options}
                onChange={this.onSelectDrop}
              />
            </li>
            <li>
              <TextField label="Value" required onChange={this.onChangeInput} />
            </li>
          </ul>
        );
    }
  };

  public render() {
    const {
      columns,
      items,
      contextualMenu,
      isPanelVisible,
      filterResult,
      targetColumn,
    } = this.state;
    console.log(this.state);
    return (
      <StateListWrapper theme={this.state}>
        {columns.length > 0 && (
          <MarqueeSelection selection={this._selection}>
            <DetailsList
              items={filterResult.length > 0 ? filterResult : items}
              compact={false}
              columns={columns}
              selectionMode={SelectionMode.multiple}
              getKey={this._getKey}
              setKey="multiple"
              layoutMode={DetailsListLayoutMode.justified}
              isHeaderVisible={true}
              selection={this._selection}
              selectionPreservedOnEmptyClick={true}
              onItemInvoked={this._onItemInvoked}
              useFastIcons={false}
              onRenderRow={this._onRenderRow}
            />
          </MarqueeSelection>
        )}
        {contextualMenu && (
          <ContextualMenu
            onItemClick={this.onChoiceItemSort}
            {...contextualMenu}
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
              fontWeight: "300",
            },
            subComponentStyles: {
              closeButton: {
                icon: {
                  fontSize: "15px",
                  color: "#000000",
                  fontWeight: "normal",
                },
              },
            },
            content: {
              paddingLeft: "32px",
            },
            header: {
              paddingLeft: "32px",
            },
          }}
        >
          <FilterElement
            targetColumn={this.state.targetColumn}
            filter={this.state.filter}
            items={this.state.items}
          />
        </Panel>
      </StateListWrapper>
    );
  }

  // public componentDidUpdate(previousProps: any, previousState: IListState) {
  //   if (
  //     previousState.isModalSelection !== this.state.isModalSelection &&
  //     !this.state.isModalSelection
  //   ) {
  //     this._selection.setAllSelected(false);
  //   }
  // }

  private _getKey(item: any, index?: number): string {
    return item.key;
  }

  private _onChangeCompactMode = (
    ev: React.MouseEvent<HTMLElement>,
    checked: boolean
  ): void => {
    // this.setState({ isCompactMode: checked });
  };

  private _onChangeModalSelection = (
    ev: React.MouseEvent<HTMLElement>,
    checked: boolean
  ): void => {
    // this.setState({ isModalSelection: checked });
  };

  // private _onChangeText = (
  //   ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
  //   text: string
  // ): void => {
  //   this.setState({
  //     items: text
  //       ? this._allItems.filter((i) => i.name.toLowerCase().indexOf(text) > -1)
  //       : this._allItems,
  //   });
  // };

  private _getContextualMenuProps(
    ev: React.MouseEvent<HTMLElement>,
    column: IColumn
  ): IContextualMenuProps {
    const items = [
      {
        key: "aToZ",
        name: "A to Z",
        canCheck: true,
        // checked: column.isSorted && !column.isSortedDescending,
        // onClick: () => this._onSortColumn(column.key, false),
      },
      {
        key: "zToA",
        name: "Z to A",
        canCheck: true,
        // checked: column.isSorted && column.isSortedDescending,
        // onClick: () => this._onSortColumn(column.key, true),
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
        // onClick: () => this._onGroupByColumn(column),
      },
    ];
    // if (isGroupable(column.key)) {
    //   items.push({
    //     key: 'groupBy',
    //     name: 'Group by ' + column.name,
    //     iconProps: { iconName: 'GroupedDescending' },
    //     canCheck: true,
    //     checked: column.isGrouped,
    //     // onClick: () => this._onGroupByColumn(column),
    //   });
    // }
    return {
      items: items,
      target: ev.currentTarget as HTMLElement,
      directionalHint: DirectionalHint.bottomLeftEdge,
      gapSpace: -5,
      // isBeakVisible: true,
      onDismiss: this._onContextualMenuDismissed,
    };
  }

  private _onContextualMenuDismissed = (): void => {
    this.setState({
      contextualMenu: undefined,
    });
  };

  private _onItemInvoked(item: any): void {
    alert(`Item invoked: ${item.name}`);
  }

  private _getSelectionDetails(): string {
    const selectionCount = this._selection.getSelectedCount();

    switch (selectionCount) {
      case 0:
        return "No items selected";
      case 1:
        return (
          "1 item selected: " +
          (this._selection.getSelection()[0] as IDocument).name
        );
      default:
        return `${selectionCount} items selected`;
    }
  }

  private _onRenderRow: IDetailsListProps["onRenderRow"] = (props) => {
    const customStyles: Partial<IDetailsRowStyles> = {};
    if (props) {
      if (props.item.isDisable) {
        // Every other row renders with a different background color
        customStyles.root = { color: "#666666" };
      } else {
        customStyles.root = { color: "#212121" };
      }
      return <DetailsRow {...props} styles={customStyles} />;
    }
    return null;
  };

  private _onItemContextMenu = (
    item: any[],
    index: number,
    ev: MouseEvent
  ): boolean => {
    const contextualMenu: IContextualMenuProps = {
      target: ev.target as HTMLElement,
      items: [
        {
          key: "text",
          name: `${this._selection.getSelectedCount()} selected`,
        },
      ],
      onDismiss: () => {
        this.setState({
          contextualMenu: undefined,
        });
      },
    };

    if (index > -1) {
      this.setState({
        contextualMenu: contextualMenu,
      });
    }

    return false;
  };

  _onColumnClick = (
    ev: React.MouseEvent<HTMLElement> | MouseEvent,
    column?: IColumn
  ): void => {
    const { columns, items, currentColumn, isSortedDescending } = this.state;
    const newColumns: IColumn[] = columns.slice();
    const currColumn: IColumn = newColumns.filter((currCol) =>
      column ? column.key : currentColumn?.key === currCol.key
    )[0];
    newColumns.forEach((newCol: IColumn) => {
      if (newCol === currColumn) {
        currColumn.isSortedDescending = isSortedDescending;
        currColumn.isSorted = true;
      } else {
        newCol.isSorted = false;
        newCol.isSortedDescending = true;
      }
    });
    const newItems = _copyAndSort(
      items,
      currColumn.key,
      currColumn.isSortedDescending
    );
    // this.setState({
    //   columns: newColumns,
    //   items: newItems,
    //   contextualMenu: undefined,
    // });
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

function _generateDocuments() {
  const items: IDocument[] = [];
  for (let i = 0; i < 500; i++) {
    const randomDate = _randomDate(new Date(2012, 0, 1), new Date());
    const randomFileSize = _randomFileSize();
    const randomFileType = _randomFileIcon();
    let fileName = _lorem(2);
    fileName =
      fileName.charAt(0).toUpperCase() +
      fileName.slice(1).concat(`.${randomFileType.docType}`);
    let userName = _lorem(2);
    userName = userName
      .split(" ")
      .map((name: string) => name.charAt(0).toUpperCase() + name.slice(1))
      .join(" ");
    items.push({
      key: i.toString(),
      name: fileName,
      value: fileName,
      iconName: randomFileType.url,
      fileType: randomFileType.docType,
      modifiedBy: userName,
      dateModified: randomDate.dateFormatted,
      dateModifiedValue: randomDate.value,
      fileSize: randomFileSize.value,
      fileSizeRaw: randomFileSize.rawSize,
      sharing: `${fileName}--aaa`,
    });
  }
  return items;
}

function _randomDate(
  start: Date,
  end: Date
): { value: number; dateFormatted: string } {
  const date: Date = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
  return {
    value: date.valueOf(),
    dateFormatted: date.toLocaleDateString(),
  };
}

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

function _randomFileIcon(): { docType: string; url: string } {
  const docType: string =
    FILE_ICONS[Math.floor(Math.random() * FILE_ICONS.length)].name;
  return {
    docType,
    url: `https://static2.sharepointonline.com/files/fabric/assets/item-types/16/${docType}.svg`,
  };
}

function _randomFileSize(): { value: string; rawSize: number } {
  const fileSize: number = Math.floor(Math.random() * 100) + 30;
  return {
    value: `${fileSize} KB`,
    rawSize: fileSize,
  };
}

const LOREM_IPSUM = (
  "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut " +
  "labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut " +
  "aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore " +
  "eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt "
).split(" ");
let loremIndex = 0;
function _lorem(wordCount: number): string {
  const startIndex =
    loremIndex + wordCount > LOREM_IPSUM.length ? 0 : loremIndex;
  loremIndex = startIndex + wordCount;
  return LOREM_IPSUM.slice(startIndex, loremIndex).join(" ");
}
