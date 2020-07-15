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
  id: string;
  header: string;
  isDisable?: boolean;
  repo?: ITreeViewProps[];
  isChecked?: boolean;
  isExpand?: boolean;
  isAllChildrenSelected?: boolean;
  parentNode?: ITreeViewProps;
  data?: any;
  hasChild?: boolean;
}

export interface ITreeViewPropsExample {
  data: ITreeViewProps[];
  darkMode?: string;
  // onGetChecked?: (value: { label: string; checked: boolean }) => void;
  multilingual?: { textKey: string; context: string }[];
}

export interface CheckBoxState {
  checked?: boolean;
  viewTree?: boolean;
  indeterminate?: boolean;
  selectedRepo?: any;
  isChecked?: any;
  selectedNode?: string[];
  parentNode?: string[];
  parentAddCheck?: any;
}

export interface getValueProps extends ITreeViewProps {
  isLastChild?: boolean;
  repo?: ITreeViewProps[];
  isEnough?: boolean | null;
}

export interface CheckboxPropsExample {
  header?: string;
  isDisable?: boolean;
  isChecked?: any;
  repo?: ITreeViewProps[];
  darkMode?: string;
  getValue?: (data: getValueProps) => void;
  lastChild?: boolean;
  multilingual?: { textKey: string; context: string }[];
  data?: any;
  dataChecked?: TreeViewState;
  onChange?: any;
  selected?: any;
  options?: ITreeViewProps[];
  selectedOptions?: any;
}

export interface TreeViewState {
  id?: string;
  header?: string;
  parentNode?: TreeViewState | null;
  parentNodeId?: string;
  isChecked?: boolean;
  isExpand?: boolean;
  isAllChildSelected?: boolean;
  childNodes?: TreeViewState[];
  indeterminate?: boolean;
  isDisable?: boolean;
  data?: ITreeViewProps[];
  darkMode?: string;
  multilingual?: { textKey: string; context: string }[];
  repo?: ITreeViewProps[];
}

export interface IRenderNode extends TreeViewState {
  id?: string;
  key?: number;
  theme?: string;
  node?: TreeViewState;
  idNode?: string;
}
