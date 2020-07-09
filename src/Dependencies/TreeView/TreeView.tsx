import * as React from "react";
import CheckBox from "./CheckBoxTree";
import { ITreeViewPropsExample, ITreeViewProps } from "./TreeViewInterface";
import { TestLanguage } from "../TestLanguage";
import { group } from "console";

interface TreeViewState {
  groupCheck: string[];
  parentCheck: ITreeViewProps | null;
}

class TreeView extends React.Component<ITreeViewPropsExample, TreeViewState> {
  constructor(props: ITreeViewPropsExample) {
    super(props);
    this.state = {
      groupCheck: [],
      parentCheck: null,
    };
  }

  onCheckedValue = async (label: string, checked: boolean) => {
    let currentGroupCheck = [...this.state.groupCheck];
    if (checked) {
      currentGroupCheck.push(label);
      await this.setState({
        groupCheck: currentGroupCheck,
      });
    }
    if (!checked) {
      let index = currentGroupCheck.indexOf(label);
      currentGroupCheck.splice(index, 1);
      await this.setState({
        groupCheck: currentGroupCheck,
        parentCheck: null,
      });
    }
    this.onCheckParent();
    // this.onCheckParent(this.props.data);
    // this.props.onGetChecked && this.props.onGetChecked({ label: val, checked });
  };

  onCheckParent = () => {
    // let { groupCheck } = this.state;
    let itemRepo = this.props.data;
    let groupCheck = this.state.groupCheck;

    for (let i = 0; i < itemRepo.length; i++) {
      let child = itemRepo[i];
      if (child.childRepo && this.onCheckString(groupCheck, child)) {
        this.setState({
          parentCheck: child,
        });
      } else {
        console.log(child);
      }
    }
  };

  onCheckChildRepo = (childRepo: ITreeViewProps[]) => {
    let repo = childRepo;
    if (repo) {
      for (let i = 0; i < repo.length; i++) {
        // console.log(repo[i]);
        // console.log(repo[i].childRepo?.length);
        // console.log(this.state.groupCheck.length);
        if (repo[i].childRepo?.length === this.state.groupCheck.length) {
          console.log(repo[i]);
        }
      }
    }
  };

  onCheckString = (group: any, item: any) => {
    let repo = item.childRepo;
    for (let i = 0; i < repo.length; i++) {
      let index = group.indexOf(repo[i].label);
      if (index !== -1) {
        return true;
      }
    }
    return false;
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
                onCheckParent={this.state.parentCheck}
                // groupCheck={this.state.groupCheck}
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
