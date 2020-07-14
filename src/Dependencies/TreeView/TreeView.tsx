import * as React from "react";
import CheckBox from "./CheckBoxTree";
import { ITreeViewPropsExample, ITreeViewProps } from "./TreeViewInterface";
import { getValueProps } from "./CheckBoxStyle";
import { TestLanguage } from "../TestLanguage";
import { root } from "calendar-custom/Calendar.scss";

export interface TreeViewState {
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
      let curretnCheck = [...new Set(this.state.isEnough)];
      curretnCheck.push(data);
      await this.setState({
        isEnough: curretnCheck,
      });
      await this.onCheckChild(data);
      await this.onCheckParentEnough();
      this.onCheckParent(data);
    }

    //check parent
    if (data.isLastChild && data.isChecked) {
      let curretnCheck = [...new Set(this.state.isEnough)];
      curretnCheck.push(data);
      await this.setState({
        isEnough: curretnCheck,
      });
      await this.onCheckParentEnough();
      this.onCheckAllParent(data);
    }
    if (!data.isChecked) {
      await this.onUnCheck(data);
    }
  };

  onCheckParentEnough = () => {
    let parentList = [...new Set(this.state.parentList)];
    let currentEnough = [...this.state.isEnough];
    // for (let i = 0; i < parentList.length; i++) {
    //   if (parentList[i].isEnough === true) {
    //     let data = {
    //       header: parentList[i].header,
    //       repo: parentList[i].repo,
    //       isChecked: true,
    //       isLastChild: false,
    //     };
    //     currentEnough.push(data);
    //     this.setState({
    //       isEnough: currentEnough,
    //     });
    //   }
    // }
  };

  onCheckAllParent = async (data: getValueProps | getValueProps[]) => {
    let rootData = this.props.data;
    if (!Array.isArray(data)) {
      let { checkedRepo, parentRepo } = this.state;
      for (let i = 0; i < rootData.length; i++) {
        if (rootData[i].header === data.header) {
          await this.onSetStateParent(rootData[i]);
        }
        if (rootData[i].header !== data.header && rootData[i].repo) {
          let repo = rootData[i].repo!;
          let currentRepo = parentRepo ? parentRepo : checkedRepo;
          for (let j = 0; j < repo.length; j++) {
            if (repo[j].header === currentRepo?.header) {
              this.onSetStateParent(rootData[i]);
              await this.onCheckEnough(rootData[i]);
            }
            if (repo[j].header !== currentRepo?.header && repo[j].repo) {
              this.onCheckAllParent(rootData[i].repo!);
            }
          }
        }
      }
    }
    if (Array.isArray(data)) {
      let { checkedRepo, parentRepo } = this.state;
      let currentRepo = parentRepo ? parentRepo : checkedRepo;
      for (let i = 0; i < data.length; i++) {
        let repo = data[i].repo!;
        if (repo) {
          for (let j = 0; j < repo.length; j++) {
            if (repo[j].header === currentRepo?.header) {
              await this.onSetStateParent(data[i]);
              await this.setState({
                parentRepo: data[i],
              });
              await this.onCheckEnough(data[i]);
              this.onCheckAllParent(data[i]);
            }
            if (repo[j].header !== currentRepo?.header && repo[j].repo) {
              this.onCheckAllParent(repo);
            }
          }
        }
      }
    }
  };

  onCheckParentListVsCheckRepo = () => {
    let currentParent = [...new Set(this.state.parentList)];
    let currentEnough = [...this.state.isEnough];
    for (let i = 0; i < currentParent.length; i++) {
      for (let j = 0; j < currentEnough.length; j++) {
        if (currentParent[i].header === currentEnough[j].header) {
          let index = currentParent.indexOf(currentParent[i]);
          if (index !== -1) {
            currentParent.splice(index, 1);
            this.setState({
              parentList: currentParent,
            });
          }
        }
      }
    }
  };

  onUnCheck = async (data: getValueProps) => {
    let currentCheck = [...this.state.isEnough];
    for (let i = 0; i < currentCheck.length; i++) {
      if (currentCheck[i].header === data.header) {
        let index = currentCheck.indexOf(currentCheck[i]);
        currentCheck.splice(index, 1);
        await this.setState({ isEnough: currentCheck });
      }
    }
    this.onCheckEnoughUnchecked(data);
  };

  onCheckEnoughUnchecked = (data: getValueProps) => {
    let currentParent = [...this.state.parentList];
    for (let i = 0; i < currentParent.length; i++) {
      let repo = currentParent[i].repo!;
      for (let j = 0; j < repo.length; j++) {
        if (repo[j].header === data.header && currentParent[i].isEnough) {
          currentParent[i].isEnough = false;
          this.onCheckEnoughUnchecked(currentParent[i]);
        }
      }
    }
    currentParent = [...new Set(currentParent)];
    this.setState({
      parentList: currentParent,
    });
    if (this.state.isEnough.length < 1) {
      this.setState({
        parentList: [],
        childList: [],
      });
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
              await this.onCheckEnough(rootData[i]);
              this.onCheckParentListVsCheckRepo();
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
              await this.onCheckParentFormRoot(data[i]);
              await this.onCheckEnough(data[i]);
              this.onCheckParentListVsCheckRepo();
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
          await this.onCheckEnough(rootData[i]);
          this.onCheckParentListVsCheckRepo();
          break;
        }
        if (rootData[i].header !== parentRepo?.header && rootData[i].repo) {
          this.onCheckParent(this.state.parentRepo!);
        }
      }
    }
  };

  // check node in parentlist with isEunogh arr
  onCheckEnough = (data: getValueProps | getValueProps[]) => {
    console.log(data);
    let parentList = [...new Set(this.state.parentList)];
    if (!Array.isArray(data)) {
      let isEnough = this.state.isEnough;
      for (let i = 0; i < parentList.length; i++) {
        let repo = parentList[i].repo!;
        for (let j = 0; j < repo.length; j++) {
          if (repo[j].repo) {
            let count = 0;
            let length = repo[j].repo?.length;
            for (let k = 0; k < isEnough.length; k++) {
              if (isEnough[k].header === repo[j].header) {
                count++;
              }
              if (isEnough[k].header !== repo[j].header && repo[j].repo) {
                this.onCheckEnough(repo[j].repo!);
              }
            }
            if (count === length) {
              let currentParent = [...new Set(this.state.parentList)];
              let index = currentParent.indexOf(repo[j]);
              let result = count === length ? true : false;
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
    }

    if (Array.isArray(data)) {
      let isEnough = this.state.isEnough;
      for (let i = 0; i < data.length; i++) {
        let repo = data[i].repo!;
        if (repo) {
          let count = 0;
          let length = data[i].repo?.length;
          for (let j = 0; j < repo.length; j++) {
            for (let k = 0; k < isEnough.length; k++) {
              if (repo[j].header === isEnough[k].header) {
                count++;
              }
              if (repo[j].header !== isEnough[k].header && repo[j].repo) {
                this.onCheckEnough(repo[j].repo!);
              }
            }
          }
          if (count === length) {
            let currentParent = [...new Set(this.state.parentList)];
            let index = currentParent.indexOf(data[i]);
            let result = count === length ? true : false;
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
                dataChecked={this.state}
              />
            );
          })}
      </div>
    );
  }
}

export default TreeView;
