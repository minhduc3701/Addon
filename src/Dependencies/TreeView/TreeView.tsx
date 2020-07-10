import * as React from "react";
import CheckBox from "./CheckBoxTree";
import { ITreeViewPropsExample, ITreeViewProps } from "./TreeViewInterface";
import { TestLanguage } from "../TestLanguage";
import { getEdgeChromiumNoHighContrastAdjustSelector } from "../common";

interface TreeViewState {
  groupCheck: string[];
  checkedTree: ITreeViewProps | null;
  uncheckParent: ITreeViewProps[];
  childCheckList: ITreeViewProps[];
  parentCheckList: ITreeViewProps[];
}

class TreeView extends React.Component<ITreeViewPropsExample, TreeViewState> {
  constructor(props: ITreeViewPropsExample) {
    super(props);
    this.state = {
      groupCheck: [],
      checkedTree: null,
      childCheckList: [],
      parentCheckList: [],
      uncheckParent: [],
    };
  }

  onCheckedValue = async (label: string, checked: boolean) => {
    let currentGroupCheck = [...this.state.groupCheck];
    if (checked) {
      currentGroupCheck.push(label);
      await this.setState({
        groupCheck: currentGroupCheck,
        uncheckParent: [],
      });
    }
    if (!checked) {
      let index = currentGroupCheck.indexOf(label);
      currentGroupCheck.splice(index, 1);
      await this.setState({
        groupCheck: currentGroupCheck,
        // checkedTree: null,
      });
      await this.onRemoveCheck(label);
      // await this.onRemoveParentCheck();
    }
    this.onFindCheckData();
    // this.onCheckParent(this.props.data);
    // this.props.onGetChecked && this.props.onGetChecked({ label: val, checked });
  };

  onRemoveCheck = (label: string) => {
    let { childCheckList, parentCheckList } = this.state;
    for (let i = 0; i < childCheckList.length; i++) {
      if (
        childCheckList[i].label === label &&
        childCheckList.indexOf(childCheckList[i]) !== -1
      ) {
        let index = childCheckList.indexOf(childCheckList[i]);
        let currentChildCheckList = [...this.state.childCheckList];
        currentChildCheckList.splice(index, 1);
        this.setState({
          childCheckList: currentChildCheckList,
        });
      }
    }
    for (let i = 0; i < parentCheckList.length; i++) {
      if (
        parentCheckList[i].label === label &&
        parentCheckList.indexOf(parentCheckList[i]) !== -1
      ) {
        let index = parentCheckList.indexOf(parentCheckList[i]);
        let currentParentCheckList = [...this.state.parentCheckList];
        currentParentCheckList.splice(index, 1);
        this.setState({
          parentCheckList: currentParentCheckList,
        });
      }
    }
  };

  onFindCheckData = async (data?: ITreeViewProps[]) => {
    let itemRepo = this.props.data;
    let groupCheck = this.state.groupCheck;

    if (!data) {
      for (let i = 0; i < itemRepo.length; i++) {
        let child = itemRepo[i];
        if (groupCheck.indexOf(child.label) !== -1) {
          await this.setState({
            checkedTree: child,
          });
          this.onCheckParent();
          this.onCheckChild(child);
        }
        if (groupCheck.indexOf(child.label) === -1 && child.childRepo) {
          this.onFindCheckData(child.childRepo);
        }
      }
    }

    if (data) {
      for (let i = 0; i < data.length; i++) {
        let child = data[i];
        if (groupCheck.indexOf(child.label) !== -1) {
          await this.setState({
            checkedTree: child,
          });
          this.onCheckParent();
          this.onCheckChild(child);
        }
        if (groupCheck.indexOf(child.label) === -1 && child.childRepo) {
          this.onFindCheckData(child.childRepo);
        }
      }
    }
  };

  onCheckChild = async (child: ITreeViewProps | ITreeViewProps[]) => {
    let repo = Array.isArray(child) ? child : child.childRepo;
    if (repo) {
      for (let i = 0; i < repo.length; i++) {
        if (!repo[i].childRepo) {
          let newCheckList = [...this.state.childCheckList];
          newCheckList.push(repo[i]);
          this.setState({
            childCheckList: newCheckList,
          });
        }
        if (repo[i].childRepo) {
          let newCheckList = [...this.state.childCheckList];
          newCheckList.push(repo[i]);
          this.setState({
            childCheckList: newCheckList,
          });
          this.onCheckChild(repo[i].childRepo!);
        }
      }
    }
  };

  onCheckParent = (data?: ITreeViewProps[]) => {
    let itemRepo = this.props.data;
    let checkTree = this.state.checkedTree;
    if (!data) {
      for (let i = 0; i < itemRepo.length; i++) {
        if (itemRepo[i].label === checkTree?.label) {
          let newCheckList = [...this.state.parentCheckList];
          newCheckList.push(itemRepo[i]);
          this.setState({
            parentCheckList: newCheckList,
          });
        }
        if (itemRepo[i].childRepo && itemRepo[i].label !== checkTree?.label) {
          let repoTree = itemRepo[i].childRepo!;
          for (let j = 0; j < repoTree.length; j++) {
            if (repoTree[j].label === checkTree?.label) {
              let newCheckList = [...this.state.parentCheckList];
              newCheckList.push(itemRepo[i]);
              this.setState({
                parentCheckList: newCheckList,
              });
            }
            if (
              repoTree[j].label !== checkTree?.label &&
              repoTree[j].childRepo
            ) {
              this.onCheckParent(itemRepo[i].childRepo);
            }
          }
        }
      }
    }
    if (data) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].label === checkTree?.label) {
          let newCheckList = [...this.state.parentCheckList];
          newCheckList.push(data[i]);
          this.setState({
            parentCheckList: newCheckList,
          });
        }
        if (data[i].childRepo && data[i].label !== checkTree?.label) {
          let repoTree = data[i].childRepo!;
          for (let j = 0; j < repoTree.length; j++) {
            if (repoTree[j].label === checkTree?.label) {
              let newCheckList = [...this.state.parentCheckList];
              newCheckList.push(data[i]);
              this.setState({
                parentCheckList: newCheckList,
              });
            }
            if (
              repoTree[j].label !== checkTree?.label &&
              repoTree[j].childRepo
            ) {
              this.onCheckParent(data[i].childRepo);
            }
          }
        }
      }
    }
  };

  render() {
    console.log(this.state.parentCheckList);
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
                onCheckParent={this.state.checkedTree}
                unCheckParent={this.state.uncheckParent}
                TreeChecked={{
                  child: this.state.childCheckList,
                  parent: this.state.parentCheckList,
                }}
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
