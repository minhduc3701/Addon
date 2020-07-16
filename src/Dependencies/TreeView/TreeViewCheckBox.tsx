import * as React from "react";
import { Checkbox } from "./index.js";
import { Icon } from "../@uifabric/icons/Icon";
import { ItemWrapper, RepoWrapper } from "./CheckBoxStyle";
import { CheckboxPropsExample, CheckBoxState } from "./CheckBoxStyle";
import { TestLanguage } from "../TestLanguage";
import { TreeViewState } from "./TreeView";
import { ITreeViewProps } from "./TreeViewInterface";

export interface OptionsListProps {
  repo: ITreeViewProps[];
  selectedRepo: any;
  onChange: any;
  onChangeParent: any;
  theme?: string;
  parentNode?: ITreeViewProps;
  isChecked?: any;
  onChangeIsChecked: any;
  selectedNode?: string[];
  onSelectedNode?: any;
  parentCheckNode?: string[];
  CheckForParent?: any;
  node?: any;
}

class CheckboxBasicExample extends React.Component<
  CheckboxPropsExample,
  CheckBoxState
> {
  constructor(props: CheckboxPropsExample) {
    super(props);
    this.state = {
      checked: false,
      handleCheck: null,
      viewTree: false,
      indeterminate: false,
      selectedRepo: {},
      isChecked: {},
      selectedNode: [],
      parentNode: [],
      parentAddCheck: null,
    };
  }
  onHandleCheck = async () => {
    let currentChecked = this.state.checked;
    if (!this.props.isDisable) {
      await this.setState({
        checked: !currentChecked,
      });
    }
    // this.props.getValue &&
    //   this.props.getValue({
    //     isChecked: this.state.checked,
    //     header: this.props.header,
    //     isLastChild: this.props.repo ? false : true,
    //     repo: this.props.repo,
    //   });
  };

  onHandleDisplayTree = () => {
    let currentTreeView = this.state.viewTree;
    this.setState({
      viewTree: !currentTreeView,
    });
  };

  OptionsList = ({
    parentNode,
    repo,
    selectedRepo,
    isChecked,
    onChange,
    onChangeIsChecked,
    onChangeParent,
    theme,
    onSelectedNode,
    selectedNode,
    parentCheckNode,
    CheckForParent,
    node,
  }: OptionsListProps) => {
    const handleCheckboxClicked = async (selectedId: string) => {
      // is currently selected
      if (isChecked[selectedId]) {
        // remove selected key from options list
        isChecked[selectedId].isChecked = true;
      } else {
        // is not currently selected
        isChecked[selectedId] = { isChecked: true };
      }
      // call onChange function given by parent
      await onChangeIsChecked(isChecked);
      onHandleSelectedNode(repo, selectedId, parentNode, node);
      if (parentNode) {
        onHandleParent(parentNode, node);
      }
    };

    const onHandleDisplayTree = (selectedId: string) => {
      // issue : selectedRepo !== isChecked
      if (selectedRepo[selectedId]) {
        delete selectedRepo[selectedId];
      } else {
        selectedRepo[selectedId] = {};
        if (!isChecked[selectedId]) {
          isChecked[selectedId] = { isChecked: false };
        }
      }
      onChange(selectedRepo);
      onChangeIsChecked(isChecked);
    };

    const handleSubOptionsListChange = (
      optionId: string,
      subRepo: ITreeViewProps[]
    ) => {
      // add sub selections to current optionId
      isChecked[optionId] = subRepo;
      onChangeIsChecked(isChecked);
    };

    const onHandleSelectedNode = (
      repo: ITreeViewProps[],
      id: string,
      parentNode?: ITreeViewProps,
      node?: any
    ) => {
      onSelectedNode(repo, id, parentNode, node);
    };

    const onHandleParent = (parentNode: ITreeViewProps, node?: any) => {
      onChangeParent(parentNode, node);
    };

    return (
      <div>
        {repo.map((item, index) => {
          return (
            <ul key={index}>
              <ItemWrapper
                theme={{
                  darkMode: theme,
                }}
              >
                <Icon
                  onClick={() => onHandleDisplayTree(item.id)}
                  iconName={
                    selectedRepo[item.id] ? `ChevronDown` : `ChevronRight`
                  }
                  className="icon-rightArrow"
                />
                <Checkbox
                  checked={selectedNode?.includes(item.id) ? true : false}
                  indeterminate={
                    parentCheckNode?.includes(item.id) ? true : false
                  }
                  // indeterminate={onCheckChildCurrent(item)}
                  title={item.header}
                  label={item.header}
                  disabled={item.isDisable || false}
                  onChange={() => handleCheckboxClicked(item.id)}
                />
              </ItemWrapper>
              {item.repo &&
                item.repo.length > 0 &&
                selectedRepo[item.id] &&
                this.OptionsList({
                  parentNode: item,
                  repo: item.repo,
                  selectedRepo: selectedRepo[item.id],
                  isChecked: isChecked[item.id],
                  onChange: (subRepo: ITreeViewProps[]) =>
                    handleSubOptionsListChange(item.id, subRepo),
                  onChangeIsChecked: (subRepo: ITreeViewProps[]) =>
                    handleSubOptionsListChange(item.id, subRepo),
                  onChangeParent: (parentNode: ITreeViewProps, node?: any) => {
                    onHandleParent(parentNode, node);
                  },
                  theme,
                  onSelectedNode: (
                    repo: ITreeViewProps[],
                    selectedNode: string,
                    parentNode?: ITreeViewProps,
                    node?: any
                  ) => {
                    onHandleSelectedNode(repo, selectedNode, parentNode, node);
                  },
                  selectedNode,
                  parentCheckNode,
                  node: {
                    parentNode,
                    repo,
                    selectedRepo,
                    isChecked,
                    onChange,
                    onChangeIsChecked,
                    onChangeParent,
                    theme,
                    onSelectedNode,
                    selectedNode,
                    parentCheckNode,
                    CheckForParent,
                  },
                })}
            </ul>
          );
        })}
      </div>
    );
  };

  onChangeSelectedState = (
    repo: ITreeViewProps[],
    id: string,
    parentNode?: ITreeViewProps,
    node?: any
  ) => {
    let currentSeleted = [...this.state.selectedNode];
    let currentParent = [...new Set(this.state.parentNode)];
    if (currentSeleted.includes(id)) {
      let index = currentSeleted.indexOf(id);
      currentSeleted.splice(index, 1);
      this.setState({
        selectedNode: currentSeleted,
      });
      if (parentNode && currentSeleted.includes(parentNode.id)) {
        // let currentParent = [...this.state.parentNode];
        let currentSeleted = [...new Set(this.state.selectedNode)];
        let index = currentSeleted.indexOf(parentNode.id);
        currentSeleted.splice(index, 1);
        this.setState({
          selectedNode: currentSeleted,
          // parentNode: currentParent,
        });
      }
      // if (node.parentNode && currentParent.includes(node.parentNode.id)) {
      //   let currentParent = [...new Set(this.state.parentNode)];
      //   let index = currentParent.indexOf(node.parentNode.id);
      //   currentParent.splice(index, 1);
      //   this.setState({
      //     parentNode: currentParent,
      //   });
      // }
      this.onRemoveAllChild(repo, id);
    } else {
      let index = currentParent.indexOf(parentNode?.id!);
      // currentParent.splice(index, 1);
      currentSeleted.push(id);
      currentSeleted = [...new Set(currentSeleted)];
      this.setState({
        parentNode: currentParent,
        selectedNode: currentSeleted,
      });
      this.onAddToState(repo, id);
    }
  };

  onRemoveAllChild = (repo: ITreeViewProps[], id?: string) => {
    if (id) {
      for (let i = 0; i < repo.length; i++) {
        if (repo[i].id === id) {
          let repoChild = repo[i].repo!;
          for (let j = 0; j < repoChild.length; j++) {
            let currentSeleted = [...this.state.selectedNode];
            if (currentSeleted.includes(repoChild[j].id)) {
              let index = currentSeleted.indexOf(repoChild[j].id);
              currentSeleted.splice(index, 1);
              this.setState({
                selectedNode: currentSeleted,
              });
            }
            if (repoChild[j]?.repo!.length > 0) {
              this.onRemoveAllChild(repoChild[j]?.repo!);
            }
          }
        }
      }
    }
    if (!id && repo) {
      for (let i = 0; i < repo.length; i++) {
        let currentSeleted = [...this.state.selectedNode];
        if (currentSeleted.includes(repo[i].id)) {
          let index = currentSeleted.indexOf(repo[i].id);
          currentSeleted.splice(index, 1);
          this.setState({
            selectedNode: currentSeleted,
          });
        }
        if (repo[i]?.repo!.length > 0) {
          this.onRemoveAllChild(repo[i]?.repo!);
        }
      }
    }
  };

  onAddToState = (repo: ITreeViewProps[], id?: string) => {
    if (id) {
      for (let i = 0; i < repo.length; i++) {
        if (repo[i].id === id) {
          let repoChild = repo[i].repo!;
          for (let j = 0; j < repoChild.length; j++) {
            let currentSeleted = [...this.state.selectedNode];
            currentSeleted.push(repoChild[j].id);
            currentSeleted = [...new Set(currentSeleted)];
            this.setState({
              selectedNode: currentSeleted,
            });
            if (repoChild[j]?.repo!.length > 0) {
              this.onAddToState(repoChild[j]?.repo!);
            }
          }
        }
      }
    }
    if (!id && repo) {
      for (let i = 0; i < repo.length; i++) {
        let currentSeleted = [...this.state.selectedNode];
        currentSeleted.push(repo[i].id);
        currentSeleted = [...new Set(currentSeleted)];
        this.setState({
          selectedNode: currentSeleted,
        });
        if (repo[i]?.repo!.length > 0) {
          this.onAddToState(repo[i]?.repo!);
        }
      }
    }
  };

  onCheckParentNode = (parentNode: ITreeViewProps, node?: any) => {
    let currentSeleted = [...this.state.selectedNode];
    let length = parentNode.repo?.length;
    let count = 0;
    let childRepo = parentNode.repo!;
    for (let i = 0; i < childRepo.length; i++) {
      if (currentSeleted.includes(childRepo[i].id)) {
        count++;
      } else {
        let currentParent = [...this.state.parentNode];
        currentParent.push(parentNode.id);
        currentParent = [...new Set(currentParent)];
        this.setState({
          parentNode: currentParent,
        });
      }
    }
    if (count === length) {
      let currentParent = [...new Set(this.state.parentNode)];
      if (node.parentNode) {
        currentParent.push(node.parentNode.id);
      }
      let index = currentParent.indexOf(parentNode.id);
      currentSeleted.push(parentNode.id);
      currentParent.splice(index, 1);
      currentSeleted = [...new Set(currentSeleted)];
      this.setState({
        parentNode: currentParent,
        selectedNode: currentSeleted,
      });
    }
    if (count === 0) {
      let currentParent = [...new Set(this.state.parentNode)];
      if (node.parentNode) {
        let indexNode = currentParent.indexOf(node.parentNode.id);
        currentParent.splice(indexNode, 1);
      }
      let index = currentParent.indexOf(parentNode.id);
      currentParent.splice(index, 1);
      this.setState({
        parentNode: currentParent,
      });
    }
  };
  render() {
    return (
      <div>
        {this.props.data &&
          this.OptionsList({
            repo: this.props.data,
            onChange: (selectedRepo: ITreeViewProps[]) =>
              this.setState({ selectedRepo }),
            onChangeIsChecked: (isChecked: ITreeViewProps[]) =>
              this.setState({ isChecked }),
            selectedRepo: this.state.selectedRepo,
            isChecked: this.state.isChecked,
            onChangeParent: (parentNode: ITreeViewProps, node?: any) => {
              this.onCheckParentNode(parentNode, node);
            },
            theme: this.props.darkMode,
            onSelectedNode: (
              repo: ITreeViewProps[],
              selectedId: string,
              parentNode?: ITreeViewProps,
              node?: any
            ) => {
              this.onChangeSelectedState(repo, selectedId, parentNode, node);
            },
            selectedNode: this.state.selectedNode,
            parentCheckNode: this.state.parentNode,
          })}
      </div>
    );
  }
}

export default CheckboxBasicExample;
