import * as React from "react";
import { GroupedList } from "office-ui-fabric-react/lib/GroupedList";
import {
  IColumn,
  DetailsRow,
  ISelection,
} from "office-ui-fabric-react/lib/DetailsList";
import { FocusZone } from "office-ui-fabric-react/lib/FocusZone";
import {
  Selection,
  SelectionMode,
  SelectionZone,
} from "office-ui-fabric-react/lib/Selection";
import { Toggle, IToggleStyles } from "office-ui-fabric-react/lib/Toggle";
import { useConst } from "@uifabric/react-hooks";
// import {
//   createListItems,
//   createGroups,
//   IExampleItem,
// } from "@uifabric/example-data";
import { initializeIcons } from "../../Dependencies/@uifabric/icons";
// const {
//   GroupedList,
//   IColumn,
//   DetailsRow,
//   FocusZone,
//   Selection,
//   SelectionMode,
//   SelectionZone,
//   Toggle,
//   IToggleStyles,
//   Fabric,
//   initializeIcons,
// } = 'office-ui-fabric-react/lib';
// const { useBoolean, useConst } = window.FabricReactHooks;
// const {
//   createListItems,
//   createGroups,
//   IExampleItem,
// } = window.FabricExampleData;

// Initialize icons in case this example uses them
initializeIcons();

const toggleStyles: Partial<IToggleStyles> = { root: { marginBottom: "20px" } };
const groupCount = 3;
const groupDepth = 3;
// const items = createListItems(Math.pow(groupCount, groupDepth + 1));
// const columns = Object.keys(items[0])
//   .slice(0, 3)
//   .map(
//     (key: string): IColumn => ({
//       key: key,
//       name: key,
//       fieldName: key,
//       minWidth: 300,
//     })
//   );

// const groups = createGroups(groupCount, groupDepth, 0, groupCount);

interface IState {
  isCompactMode: boolean;
}

const exampleItems = [{ key: "1" }, { key: "2" }];
const exampleGroup = [
  { key: "key1", name: "name1", startIndex: 0, count: 0 },
  { key: "key2", name: "name2", startIndex: 2, count: 2 },
];
const exampleColumn = [
  { key: "sas", name: "column1", minWidth: 3 },
  { key: "sas2", name: "column2", minWidth: 3 },
];

class GroupedListBasicExample extends React.Component<any, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      isCompactMode: false,
    };
  }
  // const [isCompactMode, { toggle: toggleIsCompactMode }] = useBoolean(false);
  // const selection = React.memo((): any => {
  //   const s = new Selection();
  //   s.setItems(items, true);
  //   return s;
  // });

  onChangeCompactMode = (): void => {
    let compactMode = this.state.isCompactMode;
    this.setState({
      isCompactMode: !compactMode,
    });
  };

  selection = React.memo((): any => {
    const s = new Selection();
    s.setItems(exampleItems, true);
    return s;
  });

  onRenderCell = (
    nestingDepth?: number,
    item?: any,
    index?: number
  ): JSX.Element => {
    let { isCompactMode } = this.state;
    return (
      <DetailsRow
        columns={exampleColumn}
        groupNestingDepth={nestingDepth}
        item={item}
        itemIndex={index!}
        // selection={this.selection}
        selectionMode={SelectionMode.multiple}
        compact={isCompactMode}
      />
    );
  };

  render() {
    let { isCompactMode } = this.state;
    const s = new Selection();
    console.log(s);
    return (
      <div>
        <FocusZone>
          <GroupedList
            items={exampleItems}
            onRenderCell={this.onRenderCell}
            selectionMode={SelectionMode.multiple}
            groups={exampleGroup}
            compact={isCompactMode}
          />
        </FocusZone>
      </div>
    );
  }
}

export default GroupedListBasicExample;
