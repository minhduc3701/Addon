// <ITreeViewProps>
export interface ITreeViewProps {
  key?: number | string;
  label: string;
  disable?: boolean;
  childRepo?: ITreeViewProps[];
}
// </ITreeViewProps>

// <TreeViewProps>
export interface ITreeViewPropsExample {
  data: ITreeViewProps[];
  darkMode?: string;
  onGetChecked?: (value: { label: string; checked: boolean }) => void;
  multilingual?: { textKey: string; context: string }[];
}
// </TreeViewProps>
