import * as React from "react";
import CheckBox from "./CheckBox";
import { ITreeViewProps } from "./TreeViewBuildStyle";

interface ITreeViewPropsExample {
  data: ITreeViewProps[];
  darkMode?: string;
  onGetChecked?: (value: { label: string; checked: boolean }) => void;
}

class GroupedListBasicExample extends React.Component<ITreeViewPropsExample> {
  onCheckedValue = (val: string, checked: boolean) => {
    this.props.onGetChecked && this.props.onGetChecked({ label: val, checked });
  };

  render() {
    return (
      <div>
        {this.props.data &&
          this.props.data.map((item, index) => {
            return (
              <CheckBox
                darkMode={this.props.darkMode}
                label={item.label}
                key={index}
                disable={item.disable}
                childRepo={item.childRepo}
                getValue={this.onCheckedValue}
              />
            );
          })}
      </div>
    );
  }
}

export default GroupedListBasicExample;
