import * as React from "react";
import { TestLanguage } from "../TestLanguage";
import { INodes, ITreeState, ITreeProps } from "./FinalTreeInterface";
import TreeNode from "./FinalNode";

class Tree extends React.Component<ITreeProps, ITreeState> {
  constructor(props: ITreeProps) {
    super(props);
    this.state = {
      NodesList: this.props.childNodes,
      myNodes: null,
      currentNodes: [],
    };
  }

  componentDidMount() {
    this.onCheckDefaultChecked();
  }

  onCheckDefaultChecked = async (rootData?: INodes[]) => {
    let Nodes = this.props.childNodes;
    if (!rootData) {
      for (let i = 0; i < Nodes.length; i++) {
        let repo = Nodes[i].childNodes;
        if (Nodes[i].isIndeterminate) {
          Nodes[i] = { ...Nodes[i], isIndeterminate: false };
          this.setState({ myNodes: Nodes[i] });
        }
        for (let j = 0; j < repo.length; j++) {
          if (repo[j].isChecked) {
            this.onSetStateCurrentNodes(repo[j]);
            let result = await this.onCheckParentState(Nodes[i]);
            if (result) {
              Nodes[i] = {
                ...Nodes[i],
                isChecked: result[0],
                isIndeterminate: result[1],
              };
              if (result[0]) {
                this.onSetStateCurrentNodes(Nodes[i]);
              } else {
                this.onSetStateCurrentNodes(Nodes[i], "remove");
              }
            }
          }
          if (Nodes[i].isDisable) {
            repo[j] = {
              ...repo[j],
              isDisable: true,
            };
            this.setState({ myNodes: repo[i] });
          }
          if (Nodes[i].isChecked) {
            repo[j] = {
              ...repo[j],
              isChecked: true,
            };
            this.onSetStateCurrentNodes(repo[j]);
          }
        }
        if (Nodes[i].childNodes.length >= 1) {
          this.onCheckDefaultChecked(Nodes[i].childNodes);
        }
      }
    }
    if (rootData) {
      for (let i = 0; i < rootData.length; i++) {
        let repo = rootData[i].childNodes;
        if (rootData[i].isIndeterminate) {
          rootData[i] = { ...rootData[i], isIndeterminate: false };
          this.setState({ myNodes: rootData[i] });
        }
        for (let j = 0; j < repo.length; j++) {
          if (repo[j].isChecked) {
            this.onSetStateCurrentNodes(repo[j]);
            let result = await this.onCheckParentState(rootData[i]);
            if (result) {
              rootData[i] = {
                ...rootData[i],
                isChecked: result[0],
                isIndeterminate: result[1],
              };
              if (result[0]) {
                this.onSetStateCurrentNodes(rootData[i]);
              } else {
                this.onSetStateCurrentNodes(rootData[i], "remove");
              }
            }
          }
          if (rootData[i].isDisable) {
            repo[j] = {
              ...repo[j],
              isDisable: true,
            };
            this.setState({ myNodes: repo[i] });
          }
          if (rootData[i].isChecked) {
            repo[j] = {
              ...repo[j],
              isChecked: true,
            };
            this.onSetStateCurrentNodes(repo[j]);
          }
        }
        if (rootData[i].childNodes.length >= 1) {
          this.onCheckDefaultChecked(rootData[i].childNodes);
        }
      }
    }
  };

  onFindNodeInState = (node: INodes, loopData?: INodes[]) => {
    let currentNodes = this.state.NodesList;
    if (!loopData) {
      for (let i = 0; i < currentNodes.length; i++) {
        if (currentNodes[i].id !== node.id) {
          currentNodes[i].childNodes.length >= 1 &&
            this.onFindNodeInState(node, currentNodes[i].childNodes);
        } else {
          currentNodes[i] = node;
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
        }
      }
    }
    this.setState({ myNodes: node });
  };

  onExpandsTree = async (node: INodes) => {
    node = { ...node, isExpand: !node.isExpand };
    await this.onFindNodeInState(node);
  };

  onCheckedNode = async (node: INodes) => {
    node = { ...node, isChecked: !node.isChecked, isIndeterminate: false };
    await this.onCheckAllChild(node);
    await this.onFindNodeInState(node);
    if (node.parentNode) {
      await this.onCheckedParent(node);
    }
    if (node.isChecked) {
      await this.onSetStateCurrentNodes(node);
    } else {
      await this.onSetStateCurrentNodes(node, "remove");
    }
    this.props.onGetChecked &&
      this.props.onGetChecked([...new Set(this.state.currentNodes)]);
  };

  onCheckAllChild = async (node: INodes, repo?: INodes[]) => {
    let childNodes = node.childNodes;
    if (!repo && node.isChecked) {
      for (let i = 0; i < childNodes.length; i++) {
        if (!childNodes[i].isDisable) {
          childNodes[i].isChecked = true;
          await this.onSetStateCurrentNodes(childNodes[i]);
        }
        if (childNodes[i].childNodes.length >= 1) {
          await this.onCheckAllChild(node, childNodes[i].childNodes);
        }
      }
    }
    if (repo && node.isChecked) {
      for (let i = 0; i < repo.length; i++) {
        if (!repo[i].isDisable) {
          repo[i].isChecked = true;
          await this.onSetStateCurrentNodes(repo[i]);
        }
        if (repo[i].childNodes.length >= 1) {
          await this.onCheckAllChild(node, repo[i].childNodes);
        }
      }
    }

    if (!repo && !node.isChecked) {
      for (let i = 0; i < childNodes.length; i++) {
        if (!childNodes[i].isDisable) {
          childNodes[i].isChecked = false;
          await this.onSetStateCurrentNodes(childNodes[i], "remove");
        }
        if (childNodes[i].childNodes.length >= 1) {
          await this.onCheckAllChild(node, childNodes[i].childNodes);
        }
      }
    }
    if (repo && !node.isChecked) {
      for (let i = 0; i < repo.length; i++) {
        if (!repo[i].isDisable) {
          repo[i].isChecked = false;
          await this.onSetStateCurrentNodes(repo[i], "remove");
        }
        if (repo[i].childNodes.length >= 1) {
          await this.onCheckAllChild(node, repo[i].childNodes);
        }
      }
    }
  };

  onCheckParentState = async (node: INodes) => {
    let count = 0;
    let length = node.childNodes.length;
    let parentNode = node.childNodes;
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
    // return boolean[] with [isChecked,isIndeterminate]
  };

  onCheckedParent = async (node: INodes, rootData?: INodes[]) => {
    let parent = node.parentNode!;
    let currentNodes = this.state.NodesList;
    if (parent && !rootData) {
      let result = await this.onCheckParentState(parent);
      for (let i = 0; i < currentNodes.length; i++) {
        if (currentNodes[i].id === parent.id) {
          if (result) {
            currentNodes[i] = {
              ...parent,
              isChecked: result[0],
              isIndeterminate: result[1],
            };
          }
          if (result && result[0]) {
            await this.onSetStateCurrentNodes(currentNodes[i]);
          } else {
            await this.onSetStateCurrentNodes(currentNodes[i], "remove");
          }
          if (currentNodes[i].parentNode) {
            await this.onCheckedParent(currentNodes[i]);
          }
        }
        if (
          currentNodes[i].id !== parent.id &&
          currentNodes[i].childNodes.length >= 1
        ) {
          await this.onCheckedParent(node, currentNodes[i].childNodes);
        }
      }
    }
    if (parent && rootData) {
      let result = await this.onCheckParentState(parent);
      for (let i = 0; i < rootData.length; i++) {
        if (rootData[i].id === parent.id) {
          if (result) {
            rootData[i] = {
              ...parent,
              isChecked: result[0],
              isIndeterminate: result[1],
            };
          }
          if (result && result[0]) {
            await this.onSetStateCurrentNodes(rootData[i]);
          } else {
            await this.onSetStateCurrentNodes(rootData[i], "remove");
          }
          if (rootData[i].parentNode) {
            await this.onCheckedParent(rootData[i]);
          }
        }
        if (
          rootData[i].id !== parent.id &&
          rootData[i].childNodes.length >= 1
        ) {
          await this.onCheckedParent(node, rootData[i].childNodes);
        }
      }
    }
  };

  onSetStateCurrentNodes = async (node: INodes, type?: string) => {
    let currentSelectNode = this.state.currentNodes;
    let index = currentSelectNode.findIndex((item) => item.id === node.id);
    if ((!type || type === "add") && index === -1) {
      currentSelectNode.push(node);
      await this.setState({
        currentNodes: currentSelectNode,
      });
    }
    if (type && type === "remove" && index !== -1) {
      currentSelectNode.splice(index, 1);
      await this.setState({
        currentNodes: currentSelectNode,
      });
    }
  };

  render() {
    return (
      <div>
        {this.state.NodesList?.map((item) => {
          let labelVal =
            this.props.multilingual && item.label
              ? TestLanguage(item.label, this.props.multilingual)
              : item.label;
          return (
            <TreeNode
              isChecked={item.isChecked || false}
              isExpand={item.isExpand || false}
              isDisable={item.isDisable || false}
              label={labelVal}
              isAllChildSelected={item.isAllChildSelected || false}
              isIndeterminate={item.isIndeterminate || false}
              childNodes={item.childNodes}
              key={item.id}
              node={item}
              parentNode={item.parentNode}
              theme={this.props.darkMode || ""}
              id={item.id}
              onExpands={(node: INodes) => this.onExpandsTree(node)}
              onChecked={(node: INodes) => this.onCheckedNode(node)}
              multilingual={this.props.multilingual}
            />
          );
        })}
      </div>
    );
  }
}

export default Tree;
