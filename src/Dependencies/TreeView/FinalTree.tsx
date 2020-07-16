import * as React from "react";
import { Checkbox } from "./index.js";
import { Icon } from "../@uifabric/icons/Icon";
import { ItemWrapper, RepoWrapper } from "./CheckBoxStyle";
// import { TestLanguage } from "../TestLanguage";
import {
  IRenderNode,
  TreeViewState,
  INodes,
  ITreeState,
  ITreeProps,
} from "./FinalTreeInterface";
import TreeNode from "./FinalNode";

class Tree extends React.Component<ITreeProps, ITreeState> {
  constructor(props: ITreeProps) {
    super(props);
    this.state = {
      NodesList: this.props.childNodes,
      myNodes: null,
    };
  }

  onFindNodeInState = (node: any, loopData?: any) => {
    let currentNodes = this.state.NodesList;
    if (!loopData) {
      for (let i = 0; i < currentNodes.length; i++) {
        if (currentNodes[i].id !== node.id) {
          currentNodes[i].childNodes.length >= 1 &&
            this.onFindNodeInState(node, currentNodes[i].childNodes);
        } else {
          currentNodes[i] = node;
          this.setState({ myNodes: currentNodes[i] });
        }
      }
    }
    if (loopData) {
      for (let i = 0; i < loopData.length; i++) {
        if (loopData[i].id !== node.id) {
          loopData[i].childNodes.length >= 1 &&
            this.onFindNodeInState(node, loopData[i].childNodes);
        } else {
          loopData[i] = node;
          this.setState({ myNodes: loopData[i] });
        }
      }
    }
  };

  onExpandsTree = async (node: any) => {
    node = { ...node, isExpand: !node.isExpand };
    await this.onFindNodeInState(node);
    console.log(this.state.NodesList);
  };

  render() {
    return (
      <div>
        {this.state.NodesList?.map((item) => {
          return (
            <TreeNode
              isChecked={item.isChecked || false}
              isExpand={item.isExpand || false}
              isDisable={item.isDisable || false}
              header={item.header}
              isAllChildSelected={item.isAllChildSelected || false}
              isIndeterminate={item.isIndeterminate || false}
              childNodes={item.childNodes}
              key={item.id}
              node={item}
              parentNode={item.parentNode}
              theme={this.props.darkMode || ""}
              id={item.id}
              onExpands={(node: any) => this.onExpandsTree(node)}
            />
          );
        })}
      </div>
    );
  }
}

export default Tree;
