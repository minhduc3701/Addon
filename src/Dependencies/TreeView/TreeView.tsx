import * as React from "react";
import CheckBox from "./CheckBoxTree";
import { ITreeViewPropsExample } from "./TreeViewInterface";
import { TestLanguage } from "../TestLanguage";

class TreeView extends React.Component<ITreeViewPropsExample> {
  onCheckedValue = (val: string, checked: boolean) => {
    console.log({ [val]: checked });
    this.props.onGetChecked && this.props.onGetChecked({ label: val, checked });
  };

  render() {
    return (
      <div>
        {this.props.data &&
          this.props.data.map((item, index) => {
            // check language
            let textLabel = this.props.multilingual
              ? TestLanguage(item.label, this.props.multilingual)
              : item.label;
            return (
              <CheckBox
                darkMode={this.props.darkMode}
                label={textLabel}
                value={item.label}
                key={index}
                disable={item.disable}
                childRepo={item.childRepo}
                getValue={this.onCheckedValue}
                multilingual={this.props.multilingual}
              />
            );
          })}
      </div>
    );
  }
}

export default TreeView;
