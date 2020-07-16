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
  };

  onCheckedNode = async (node: any) => {
    node = { ...node, isChecked: !node.isChecked };
    await this.onCheckAllChild(node);
    await this.onFindNodeInState(node);
    if (node.parentNode) {
      let result = await this.onCheckParentState(node);
      this.onCheckedParent(node);
    }
  };

  onCheckAllChild = (node: any, repo?: any[]) => {
    let childNodes = node.childNodes;
    if (!repo && node.isChecked) {
      for (let i = 0; i < childNodes.length; i++) {
        childNodes[i].isChecked = true;
        if (childNodes[i].childNodes.length >= 1) {
          this.onCheckAllChild(node, childNodes[i].childNodes);
        }
      }
    }
    if (repo && node.isChecked) {
      for (let i = 0; i < repo.length; i++) {
        repo[i].isChecked = true;
        if (repo[i].childNodes.length >= 1) {
          this.onCheckAllChild(node, repo[i].childNodes);
        }
      }
    }

    if (!repo && !node.isChecked) {
      for (let i = 0; i < childNodes.length; i++) {
        childNodes[i].isChecked = false;
        if (childNodes[i].childNodes.length >= 1) {
          this.onCheckAllChild(node, childNodes[i].childNodes);
        }
      }
    }
    if (repo && !node.isChecked) {
      for (let i = 0; i < repo.length; i++) {
        repo[i].isChecked = false;
        if (repo[i].childNodes.length >= 1) {
          this.onCheckAllChild(node, repo[i].childNodes);
        }
      }
    }
  };

  onCheckParentState = async (node: any) => {
    let count = 0;
    let length = node.parentNode.childNodes.length;
    let parentNode = node.parentNode.childNodes;
    for (let i = 0; i < parentNode.length; i++) {
      if (parentNode[i].isChecked) {
        count++;
      }
    }
    if (count === length) {
      return [true, false];
    }
    if (count < length && count > 0) {
      return [false, true];
    }
    if (count === 0) {
      return [false, false];
    }
  };

  onCheckedParent = (node: any, rootData?: any[]) => {
    let parent = node.parentNode;
    let Nodes = this.state.NodesList;
    if (!rootData) {
      for (let i = 0; i < Nodes.length; i++) {
        if (Nodes[i].id === parent.id) {
          console.log("if");
        }
        if (Nodes[i].id === parent.id && Nodes[i].childNodes.length >= 1) {
          this.onCheckedParent(node, Nodes[i].childNodes);
        }
      }
    }
    if (rootData) {
      for (let i = 0; i < rootData.length; i++) {
        if (rootData[i].id === parent.id) {
          console.log("if");
          console.log(rootData[i].id);
        }
        if (
          rootData[i].id === parent.id &&
          rootData[i].childNodes.length >= 1
        ) {
          this.onCheckedParent(node, rootData[i].childNodes);
        }
      }
    }
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
              onChecked={(node: any) => this.onCheckedNode(node)}
            />
          );
        })}
      </div>
    );
  }
}

export default Tree;
