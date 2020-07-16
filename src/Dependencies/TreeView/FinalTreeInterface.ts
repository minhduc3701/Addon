import TreeView from "./TreeView";

export interface OptionsListProps {
  repo?: ITreeViewProps[];
  selectedRepo?: any;
  onChange?: any;
  onChangeParent?: any;
  theme?: string;
  parentNode?: ITreeViewProps;
  isChecked?: any;
  onChangeIsChecked?: any;
  selectedNode?: string[];
  onSelectedNode?: any;
  parentCheckNode?: string[];
  CheckForParent?: any;
  nodes?: TreeViewState;
}

export interface ITreeViewProps {
  id?: string;
  header?: string;
  isDisable?: boolean;
  childNodes?: ITreeViewProps[];
  isChecked?: boolean;
  isExpand?: boolean;
  isAllChildrenSelected?: boolean;
  parentNode?: ITreeViewProps;
  parentId?: string;
  data?: any;
  node?: ITreeViewProps;
  darkMode?: string;
  onExpand?: any;
  stateTree?: TreeViewState;
}

export interface ITreeViewPropsExample {
  childNodes: TreeViewState[];
  darkMode?: string;
  // onGetChecked?: (value: { label: string; checked: boolean }) => void;
  multilingual?: { textKey: string; context: string }[];
}

export interface TreeViewState {
  isChecked?: boolean;
  isExpand?: boolean;
  isAllChildSelected?: boolean;
  indeterminate?: boolean;
  isDisable?: boolean;
  darkMode?: string;
}

export interface IRenderNode extends TreeViewState {
  id?: string;
  key?: number;
  theme?: string;
  node?: any;
  idNode?: string;
  onExpandsNode?: any;
}

export interface ITreeViewPropsFIX {
  childNodes: ITreeViewProps[];
  darkMode?: string;
  // onGetChecked?: (value: { label: string; checked: boolean }) => void;
  multilingual?: { textKey: string; context: string }[];
}

export interface ITreeNodeState {
  childNodes?: ITreeNodeState[];
  header?: string;
  id?: string;
  indeterminate?: boolean;
  isAllChildSelected?: boolean;
  isChecked?: boolean;
  isDisable?: boolean;
  isExpand?: boolean;
  onExpandsNode?: any;
  parentNode?: ITreeNodeState | null;
  theme?: string;
  darkMode?: string;
}

// childNodes: (2) [{…}, {…}]
// header: "Chicken"
// id: "chicken-id"
// indeterminate: false
// isAllChildSelected: false
// isChecked: false
// isDisable: false
// isExpand: false
// onExpandsNode: isExpand => this.onExpands(isExpand)
// parentNode: null
// theme: "dark"

export interface ITreeProps {
  childNodes: INodes[];
  darkMode?: string;
  // onGetChecked?: (value: { label: string; checked: boolean }) => void;
  multilingual?: { textKey: string; context: string }[];
}

export interface ITreeState {
  NodesList: INodes[];
  myNodes: any;
}

export interface INodes {
  childNodes: INodes[];
  header?: string;
  id?: string;
  isIndeterminate?: boolean;
  isAllChildSelected?: boolean;
  isChecked?: boolean;
  isDisable?: boolean;
  isExpand?: boolean;
  parentNode?: ITreeNodeProps | null;
  theme?: string;
  node?: any;
  onExpands?: any;
  onChecked?: any;
}

export interface ITreeNodeProps {
  childNodes: INodes[];
  header?: string;
  id?: string;
  isIndeterminate?: boolean;
  isAllChildSelected?: boolean;
  isChecked?: boolean;
  isDisable?: boolean;
  isExpand?: boolean;
  parentNode?: ITreeNodeProps | null;
  theme?: string;
  node?: any;
  key?: string | number;
  onExpands?: any;
  onChecked?: any;
}
