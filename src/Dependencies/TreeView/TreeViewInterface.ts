// <ITreeViewProps>
export interface ITreeViewProps {
  id: string;
  header: string;
  isDisable?: boolean;
  repo?: ITreeViewProps[];
  isChecked?: boolean;
  data?: any;
}
// </ITreeViewProps>

// <TreeViewProps>
export interface ITreeViewPropsExample {
  data: ITreeViewProps[];
  darkMode?: string;
  // onGetChecked?: (value: { label: string; checked: boolean }) => void;
  multilingual?: { textKey: string; context: string }[];
}
// </TreeViewProps>
