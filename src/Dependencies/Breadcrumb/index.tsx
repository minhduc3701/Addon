import * as React from "react";
import {
  IBreadcrumdProps,
  IBreadcrumdStates,
  IBreadNodes,
  IBreadNodesProps,
  NodeWrapper,
} from "./BreadcrumbStyle";
import BreadNode from "./BreadNode";

class Breadcrumd extends React.Component<IBreadcrumdProps, IBreadcrumdStates> {
  constructor(props: IBreadcrumdProps) {
    super(props);
    this.state = {
      NodesList: [],
      myNodes: null,
      currentNodes: [],
      widthElement: 0,
      mobileList: [],
    };
  }

  componentDidMount() {
    this.setState({
      NodesList: this.isSelectedDefault(),
    });
  }

  isSelectedDefault = (childNode?: IBreadNodes[]) => {
    let nodeList = this.props.child;
    if (!childNode) {
      nodeList.forEach((item) => {
        item.isSelected = false;
        if (item.child.length > 0) {
          this.isSelectedDefault(item.child);
        }
      });
    }
    if (childNode) {
      childNode.forEach((item) => {
        item.isSelected = false;
        if (item.child.length > 0) {
          this.isSelectedDefault(item.child);
        }
      });
    }
    return nodeList;
  };

  onHandleOnChange = async (value: IBreadNodes) => {
    this.onSelectedChild(value);
  };

  onHandleOnChangeMobile = (value: IBreadNodes) => {
    let valueS = { ...value, isSelected: true };
    this.onSetStateMobile(valueS);
  };

  onSelectedChild = async (value: IBreadNodes, child?: IBreadNodes[]) => {
    let { NodesList } = this.state;
    this.setState({ myNodes: value });
    if (!child) {
      for (let i = 0; i < NodesList.length; i++) {
        if (NodesList[i].id === value.id) {
          NodesList[i].isSelected = true;
          await this.onSetDefaultOtherSelected(NodesList, value);
        }
        if (NodesList[i].id !== value.id && NodesList[i].child.length >= 1) {
          let nodeChild = NodesList[i].child;
          for (let j = 0; j < nodeChild.length; j++) {
            if (nodeChild[j].id === value.id) {
              nodeChild[j].isSelected = true;
              await this.onSetDefaultOtherSelected(nodeChild, value);
            }
          }
          if (NodesList[i] !== value && NodesList[i].child.length >= 1) {
            this.onSelectedChild(value, NodesList[i].child);
          }
        }
      }
    }
    if (child) {
      for (let i = 0; i < child.length; i++) {
        if (child[i].child.length >= 1) {
          let nodeChild = child[i].child;
          for (let j = 0; j < nodeChild.length; j++) {
            if (nodeChild[j].id === value.id) {
              nodeChild[j].isSelected = true;
              await this.onSetDefaultOtherSelected(nodeChild, value);
            }
          }
          if (child[i] !== value && child[i].child.length >= 1) {
            this.onSelectedChild(value, child[i].child);
          }
        }
      }
    }
  };

  onSetStateMobile = async (value: IBreadNodesProps) => {
    let currentMobileList = [...this.state.mobileList];
    let filterSibling = value.parentNode
      ? currentMobileList.findIndex(
          (node) =>
            node.parentNode && node.parentNode?.id === value.parentNode?.id
        )
      : -1;
    let indexValue = currentMobileList.findIndex(
      (node: IBreadNodesProps) => node.id === value.id
    );
    if (value.parentNode) {
      if (indexValue === -1 && filterSibling === -1) {
        let values =
          value.child.length === 0 ? { ...value, isLast: true } : value;
        currentMobileList.push(values);
        this.setState({
          mobileList: currentMobileList,
        });
      }
      if (filterSibling !== -1) {
        currentMobileList[filterSibling].child.length > 0 &&
          (await this.onRemoveChildOfSibling(currentMobileList[filterSibling]));
        let values =
          value.child.length === 0 ? { ...value, isLast: true } : value;
        currentMobileList[filterSibling] = values;
        this.setState({
          mobileList: currentMobileList,
        });
      }
    }
    if (!value.parentNode && indexValue === -1) {
      currentMobileList.push(value);
      this.setState({
        mobileList: currentMobileList,
      });
    }
  };

  onRemoveChildOfSibling = async (
    value: IBreadNodesProps,
    childArr?: IBreadNodesProps[]
  ) => {
    let currentMobileList = [...this.state.mobileList];
    let children = value.child;
    if (!childArr) {
      for (let i = 0; i < children.length; i++) {
        let index = currentMobileList.findIndex(
          (node) => node.id === children[i].id
        );
        if (index !== -1) {
          currentMobileList.splice(index, 1);
          await this.setState({ mobileList: currentMobileList });
        }
        if (children[i].child.length > 0) {
          await this.onRemoveChildOfSibling(value, children[i].child);
        }
      }
    }
    if (childArr) {
      for (let i = 0; i < childArr.length; i++) {
        let index = currentMobileList.findIndex(
          (node) => node.id === childArr[i].id
        );
        if (index !== -1) {
          currentMobileList.splice(index, 1);
          await this.setState({ mobileList: currentMobileList });
        }
        if (childArr[i].child.length > 0) {
          await this.onRemoveChildOfSibling(value, childArr[i].child);
        }
      }
    }
  };

  onSetDefaultOtherSelected = async (
    node: IBreadNodes[],
    value?: IBreadNodes
  ) => {
    if (value) {
      for (let i = 0; i < node.length; i++) {
        if (node[i].id !== value.id) {
          node[i].isSelected = false;
        }
        if (node[i].id !== value.id && node[i].child.length >= 1) {
          await this.onSetDefaultOtherSelected(node[i].child);
        }
      }
    }
    if (!value) {
      for (let i = 0; i < node.length; i++) {
        node[i].isSelected = false;
        if (node[i].child.length >= 1) {
          await this.onSetDefaultOtherSelected(node[i].child);
        }
      }
    }
  };

  onHandleSelectRoot = async (value: IBreadNodesProps) => {
    let currentMobileList = [...this.state.mobileList];
    let index = currentMobileList.findIndex((node) => node.id === value.id);
    if (index !== -1) {
      await this.onRemoveAllChild(value);
    }
  };

  onRemoveAllChild = async (
    value: IBreadNodesProps,
    childNode?: IBreadNodesProps[]
  ) => {
    let currentMobileList = [...this.state.mobileList];
    if (!childNode) {
      let child = value.child;
      for (let i = 0; i < child.length; i++) {
        let index = currentMobileList.findIndex(
          (node) => node.id === child[i].id
        );
        if (index !== -1) {
          currentMobileList.splice(index, 1);
          await this.setState({ mobileList: currentMobileList });
        }
        if (child[i].child.length > 0) {
          await this.onRemoveAllChild(value, child[i].child);
        }
      }
    }
    if (childNode) {
      for (let i = 0; i < childNode.length; i++) {
        let index = currentMobileList.findIndex(
          (node) => node.id === childNode[i].id
        );
        if (index !== -1) {
          currentMobileList.splice(index, 1);
          await this.setState({ mobileList: currentMobileList });
        }
        if (childNode[i].child.length > 0) {
          await this.onRemoveAllChild(value, childNode[i].child);
        }
      }
    }
  };

  render() {
    return (
      <NodeWrapper className="node-wrapper" theme={this.state.widthElement}>
        {this.state.NodesList.map((item, index) => {
          return (
            <BreadNode
              key={index}
              id={item.id}
              child={item.child}
              text={item.text}
              data={item.data}
              theme={this.props.darkMode}
              isSelected={item.isSelected || false}
              parentNode={null}
              currentSelectedNode={this.state.myNodes}
              onSelected={(value: IBreadNodes) => this.onHandleOnChange(value)}
              onSelectedMobile={(value: IBreadNodesProps) =>
                this.onHandleOnChangeMobile(value)
              }
              onSelectRootMobile={(value: IBreadNodesProps) =>
                this.onHandleSelectRoot(value)
              }
              mobileCurrentList={this.state.mobileList}
              onClick={this.props.onClick}
            />
          );
        })}
      </NodeWrapper>
    );
  }
}

export default Breadcrumd;
