export interface ITreeViewProps {
  key?: number | string;
  label: string;
  disable?: boolean;
  childRepo?: ITreeViewProps[];
}
