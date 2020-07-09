import * as React from "react";
import CheckBox from "./CheckBoxTree";
import { ITreeViewPropsExample, ITreeViewProps } from "./TreeViewInterface";
import { TestLanguage } from "../TestLanguage";
import { group } from "console";

interface TreeViewState {
  groupCheck: { label: string }[];
}

class TreeView extends React.Component<ITreeViewPropsExample, TreeViewState> {
  constructor(props: ITreeViewPropsExample) {
    super(props);
    this.state = {
      groupCheck: [],
    };
  }

  onCheckedValue = async (label: string, checked: boolean) => {
    let currentGroupCheck = [...this.state.groupCheck];
    if (checked) {
      currentGroupCheck.push({ label });
      await this.setState({
        groupCheck: currentGroupCheck,
      });
    }
    if (!checked) {
      let index = currentGroupCheck.indexOf({ label });
      currentGroupCheck.splice(index, 1);
      await this.setState({
        groupCheck: currentGroupCheck,
      });
    }
    this.onCheckParent();
    // this.onCheckParent(this.props.data);
    // this.props.onGetChecked && this.props.onGetChecked({ label: val, checked });
  };

  // onCheckParent = (data: ITreeViewProps[] | undefined) => {
  //   let matchArr = [];
  //   if (data) {
  //     for (let i = 0; i < data.length; i++) {
  //       if (data[i].childRepo) {
  //         let dataRepo = data[i].childRepo ? data[i].childRepo : undefined;
  //         this.onCheckChild(dataRepo);
  //       } else {
  //         let index = this.state.groupCheck.indexOf(data[i].label);
  //         console.log(data[i].label);
  //         console.log(data[i].childRepo);
  //       }
  //     }
  //   }
  // };

  // onCheckChild = (dataRepo: ITreeViewProps[] | undefined) => {
  //   if (dataRepo) {
  //     for (let i = 0; i < dataRepo.length; i++) {
  //       if (dataRepo[i].childRepo) {
  //         let dataRepoChild = dataRepo[i].childRepo
  //           ? dataRepo[i].childRepo
  //           : undefined;
  //         this.onCheckParent(dataRepoChild);
  //       }
  //     }
  //   }
  // };

  onCheckParent = () => {
    // let { groupCheck } = this.state;
    let equal = false;
    let itemRepo = this.props.data;
    let groupCheck = JSON.stringify(this.state.groupCheck);

    for (let i = 0; i < itemRepo.length; i++) {
      let child = itemRepo[i];
      if (
        child.childRepo &&
        child.childRepo.length === this.state.groupCheck.length
      ) {
        console.log(child);
        equal = this.onCheckString(groupCheck, JSON.stringify(child.childRepo));
      }
    }
  };

  onCheckString = (group: string, item: string) => {
    if (group === item) {
      return true;
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
