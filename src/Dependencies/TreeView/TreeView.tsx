import * as React from "react";
import CheckBox from "./CheckBoxTree";
import { ITreeViewPropsExample, ITreeViewProps } from "./TreeViewInterface";
import { getValueProps } from "./CheckBoxStyle";
import { TestLanguage } from "../TestLanguage";

interface TreeViewState {
  childList: getValueProps[];
  parentList: getValueProps[];
  checkedRepo: getValueProps | null;
  parentRepo: getValueProps | null;
  isEnough: getValueProps[];
}

class TreeView extends React.Component<ITreeViewPropsExample, TreeViewState> {
  constructor(props: ITreeViewPropsExample) {
    super(props);
    this.state = {
      childList: [],
      parentList: [],
      checkedRepo: null,
      parentRepo: null,
      isEnough: [],
    };
  }

  onGetData = async (data: getValueProps) => {
    //check parent and child
    this.setState({
      checkedRepo: data,
    });
    if (!data.isLastChild && data.isChecked) {
      this.onCheckChild(data);
      this.onCheckParent(data);
      let curretnCheck = [...new Set(this.state.isEnough)];
      curretnCheck.push(data);
      await this.setState({
        isEnough: curretnCheck,
      });
    }

    //check parent
    if (data.isLastChild && data.isChecked) {
      this.onCheckParent(data);
      let curretnCheck = [...new Set(this.state.isEnough)];
      curretnCheck.push(data);
      await this.setState({
        isEnough: curretnCheck,
      });
    }
    if (!data.isChecked) {
      await this.onUnCheck(data);
      this.onCheckParent(data);
    }
  };

  onUnCheck = (data: getValueProps) => {
    let currentCheck = [...this.state.isEnough];
    for (let i = 0; i < currentCheck.length; i++) {
      if (currentCheck[i].header === data.header) {
        let index = currentCheck.indexOf(currentCheck[i]);
        currentCheck.splice(index, 1);
        this.setState({ isEnough: currentCheck });
      }
    }
  };

  // check to parent
  onCheckParent = async (data: getValueProps | getValueProps[]) => {
    let rootData = this.props.data;
    if (!Array.isArray(data)) {
      for (let i = 0; i < rootData.length; i++) {
        if (rootData[i].repo) {
          let repoChild = rootData[i].repo!;
          for (let j = 0; j < repoChild.length; j++) {
            if (repoChild[j].header === data.header) {
              await this.onSetStateParent(rootData[i]);
              this.onCheckEnough(rootData[i]);
              break;
            }
            if (repoChild[j].header !== data.header && repoChild[j].repo) {
              this.onCheckParent(rootData[i].repo!);
            }
          }
        }
      }
    }
    if (Array.isArray(data)) {
      let { checkedRepo } = this.state;
      for (let i = 0; i < data.length; i++) {
        if (data[i].repo) {
          let repoChild = data[i].repo!;
          for (let j = 0; j < repoChild.length; j++) {
            if (repoChild[j].header === checkedRepo?.header) {
              await this.onSetStateParent(data[i]);
              await this.setState({
                parentRepo: data[i],
              });
              this.onCheckParentFormRoot(data[i]);
              this.onCheckEnough(data[i]);
              break;
            }
            if (
              repoChild[j].header !== checkedRepo?.header &&
              repoChild[j].repo
            ) {
              this.onCheckParent(repoChild[j].repo!);
            }
          }
        }
      }
    }
  };

  onCheckParentFormRoot = async (data: getValueProps) => {
    let rootData = this.props.data;
    let { parentRepo } = this.state;
    if (data) {
      for (let i = 0; i < rootData.length; i++) {
        if (rootData[i].header === parentRepo?.header) {
          await this.onSetStateParent(rootData[i]);
          this.onCheckEnough(rootData[i]);
          break;
        }
        if (rootData[i].header !== parentRepo?.header && rootData[i].repo) {
          this.onCheckParent(this.state.parentRepo!);
        }
      }
    }
  };

  // check node in parentlist with isEunogh arr
  onCheckEnough = (data: getValueProps) => {
    let parentList = this.state.parentList;
    let isEnough = this.state.isEnough;
    for (let i = 0; i < parentList.length; i++) {
      let repo = parentList[i].repo!;
      let count = 0;
      let result = null;
      for (let j = 0; j < repo.length; j++) {
        for (let k = 0; k < isEnough.length; k++) {
          if (repo[j].header === isEnough[k].header) {
            count++;
            let currentParent = [...this.state.parentList];
            let length = parentList[i].repo!.length;
            result = count === length ? true : false;
            let index = parentList.indexOf(data);
            if (index !== -1) {
              currentParent[index] = {
                ...currentParent[index],
                isEnough: result,
              };
              this.setState({
                parentList: currentParent,
              });
            }
          }
        }
      }
    }
  };

  // check to child
  onCheckChild = (data: getValueProps | getValueProps[]) => {
    let repo = Array.isArray(data) ? data : data.repo!;
    for (let i = 0; i < repo.length; i++) {
      if (repo[i].repo) {
        this.onSetState(repo[i]);
        this.onCheckChild(repo[i].repo!);
      }
      if (!repo[i].repo) {
        this.onSetState(repo[i]);
      }
    }
  };

  onSetStateParent = (data: any) => {
    let currentParentList = [...this.state.parentList];
    currentParentList.push(data);
    currentParentList = [...new Set(currentParentList)];
    this.setState({
      parentList: currentParentList,
    });
  };

  onSetState = (data: any) => {
    let currentChildList = [...this.state.childList];
    currentChildList.push(data);
    currentChildList = [...new Set(currentChildList)];
    this.setState({
      childList: currentChildList,
    });
  };

  // change child checked by func using !this.state.checked

  render() {
    console.log(this.state);
    return (
      <div>
        {this.props.data &&
          this.props.data.map((item, index) => {
            // check language
            let textLabel = this.props.multilingual
              ? TestLanguage(item.header, this.props.multilingual)
              : item.header;
            return (
              <CheckBox
                darkMode={this.props.darkMode}
                header={textLabel}
                data={item.data}
                key={index}
                // value={{header:}}
                isDisable={item.isDisable}
                repo={item.repo}
                multilingual={this.props.multilingual}
                getValue={this.onGetData}
              />
            );
          })}
      </div>
    );
  }
}

export default TreeView;
