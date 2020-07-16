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

export interface INodeProps extends TreeViewState, ITreeViewProps {}
