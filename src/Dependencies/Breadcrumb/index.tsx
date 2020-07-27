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
      NodesList: this.props.child,
      myNodes: null,
      currentNodes: [],
      widthElement: 0,
    };
  }

  componentDidMount() {
    let element: HTMLElement = document.getElementsByClassName(
      "node-wrapper"
    )[0] as HTMLElement;
    this.setState({
      widthElement: element.clientWidth,
    });
  }

  onSelectedChild = async (value: IBreadNodes, child?: IBreadNodes[]) => {
    let { NodesList } = this.state;
    this.setState({ myNodes: value });
    if (!child) {
      for (let i = 0; i < NodesList.length; i++) {
        if (NodesList[i].child.length >= 1) {
          let nodeChild = NodesList[i].child;
          for (let j = 0; j < nodeChild.length; j++) {
            if (nodeChild[j].id === value.id) {
              nodeChild[j].isSelected = true;
              await this.onSetDefaultOtherSelected(nodeChild, value);
              this.onSetState(value);
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
              this.onSetState(value);
            }
          }
          if (child[i] !== value && child[i].child.length >= 1) {
            this.onSelectedChild(value, child[i].child);
          }
        }
      }
    }
    let item: HTMLElement = document.getElementsByClassName(
      "node-wrapper"
    )[0] as HTMLElement;
    this.setState({
      widthElement: item.clientWidth,
    });
  };

  onSetDefaultOtherSelected = (node: IBreadNodes[], value?: IBreadNodes) => {
    if (value) {
      for (let i = 0; i < node.length; i++) {
        if (node[i].id !== value.id) {
          node[i].isSelected = false;
        }
        if (node[i].id !== value.id && node[i].child.length >= 1) {
          this.onSetDefaultOtherSelected(node[i].child);
        }
      }
    }
    if (!value) {
      for (let i = 0; i < node.length; i++) {
        node[i].isSelected = false;
        if (node[i].child.length >= 1) {
          this.onSetDefaultOtherSelected(node[i].child);
        }
      }
    }
  };

  onSetState = async (value: IBreadNodesProps) => {
    let currentNodes = [...this.state.currentNodes];
    let indexParent = currentNodes.findIndex(
      (node) => node.id === value.parentNode?.id
    );
    let index = currentNodes.findIndex((node) => node.id === value.id);
    let filterSibling = value.parentNode
      ? currentNodes.findIndex(
          (node) =>
            node.parentNode && node.parentNode?.id === value.parentNode?.id
        )
      : -1;

    if (indexParent === -1 && value.parentNode) {
      currentNodes.push(value.parentNode);
      await this.setState({ currentNodes });
    }
    if (value.child.length === 1) {
      currentNodes.push(value.child[0]);
      await this.setState({ currentNodes });
    }
    if (index === -1 && filterSibling === -1) {
      currentNodes.push(value);
      await this.setState({ currentNodes });
    }
    if (index !== -1 && filterSibling === -1) {
      currentNodes.splice(index, 1);
      await this.setState({ currentNodes });
    }
    if (value.parentNode && filterSibling !== -1) {
      currentNodes[filterSibling] = value;
      await this.setState({
        currentNodes,
      });
      await this.onRemoveSiblingChild(value);
    }
    if (
      currentNodes.findIndex(
        (node) => node.id === this.state.NodesList[0].id
      ) === -1
    ) {
      currentNodes.push(this.state.NodesList[0]);
      await this.setState({
        currentNodes,
      });
    }
    this.props.onGetData && this.props.onGetData(this.state.currentNodes);
  };

  onRemoveSiblingChild = (value: IBreadNodesProps) => {
    let currentNodes = [...this.state.currentNodes];
    let childFinded = [];
    if (value.parentNode) {
      let parentChild = value.parentNode.child;
      for (let i = 0; i < parentChild.length; i++) {
        if (parentChild[i].id !== value.id) {
          childFinded.push(parentChild[i]);
        }
      }
    }
    if (childFinded.length > 0) {
      for (let i = 0; i < childFinded.length; i++) {
        childFinded[i].child.forEach((item) => {
          let index = currentNodes.findIndex((node) => node.id === item.id);
          if (index !== -1) {
            currentNodes.splice(index, currentNodes.length - 1);
            this.setState({ currentNodes });
          }
        });
      }
    }
  };

  render() {
    return (
      <NodeWrapper className="node-wrapper" theme={this.state.widthElement}>
        {this.state.NodesList.map((item, index) => {
          return (
            <BreadNode
              id={item.id}
              child={item.child}
              key={index}
              label={item.label}
              src={item.src}
              theme={this.props.darkMode}
              isSelected={
                item.child.length === 1 ||
                item.child.findIndex((item) => item.isSelected) !== -1
                  ? true
                  : false
              }
              parentNode={null}
              currentSelectedNode={this.state.myNodes}
              selectedArr={this.state.currentNodes}
              onSelected={(value: IBreadNodes) => this.onSelectedChild(value)}
            />
          );
        })}
      </NodeWrapper>
    );
  }
}

export default Breadcrumd;
