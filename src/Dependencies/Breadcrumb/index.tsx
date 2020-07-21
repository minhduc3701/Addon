import * as React from "react";
import {
  IBreadcrumdProps,
  IBreadcrumdStates,
  IBreadNodes,
} from "./BreadcumbStyle";
import BreadNode from "./BreadNode";

class Breadcrumd extends React.Component<IBreadcrumdProps, IBreadcrumdStates> {
  constructor(props: IBreadcrumdProps) {
    super(props);
    this.state = {
      NodesList: this.props.child,
      myNodes: null,
      currentNodes: [],
    };
  }

  onSelectedChild = (value: any, child?: IBreadNodes[]) => {
    let { NodesList } = this.state;
    if (!child) {
      for (let i = 0; i < NodesList.length; i++) {
        if (NodesList[i].child.length >= 1) {
          let nodeChild = NodesList[i].child;
          for (let j = 0; j < nodeChild.length; j++) {
            if (JSON.stringify(nodeChild[j]) === JSON.stringify(value)) {
              NodesList[i].isSelected = true;
              this.onSetState(nodeChild[j]);
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
            if (JSON.stringify(nodeChild[j]) === JSON.stringify(value)) {
              child[i].isSelected = true;
              this.onSetState(nodeChild[j]);
            }
          }
          if (child[i] !== value && child[i].child.length >= 1) {
            this.onSelectedChild(value, child[i].child);
          }
        }
      }
    }
  };

  onSetState = (value: IBreadNodes) => {
    let currentNodes = [...this.state.currentNodes];
    currentNodes.push(value);
    this.setState({
      currentNodes,
    });
  };

  render() {
    return (
      <div>
        {this.state.NodesList.map((item, index) => {
          return (
            <BreadNode
              child={item.child}
              key={index}
              label={item.label}
              src={item.src}
              theme={this.props.darkMode}
              isSelected={item.isSelected || false}
              onSelected={(value: any) => this.onSelectedChild(value)}
            />
          );
        })}
      </div>
    );
  }
}

export default Breadcrumd;
