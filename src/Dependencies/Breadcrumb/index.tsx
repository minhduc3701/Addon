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
      mySelectTree: [],
    };
  }

  onSelectedChild = async (value: IBreadNodes, child?: IBreadNodes[]) => {
    let { NodesList } = this.state;
    if (!child) {
      for (let i = 0; i < NodesList.length; i++) {
        if (NodesList[i].child.length >= 1) {
          let nodeChild = NodesList[i].child;
          for (let j = 0; j < nodeChild.length; j++) {
            if (nodeChild[j].label === value.label) {
              nodeChild[j].isSelected = true;
              await this.onSetDefaultSelected(nodeChild, value);
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
            if (nodeChild[j].label === value.label) {
              nodeChild[j].isSelected = true;
              await this.onSetDefaultSelected(nodeChild, value);
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

  onSetDefaultSelected = (node: IBreadNodes[], value: IBreadNodes) => {
    for (let i = 0; i < node.length; i++) {
      if (node[i].label !== value.label) {
        node[i].isSelected = false;
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

  onSetSeletedTree = async (value: IBreadNodes, childRepo?: IBreadNodes[]) => {
    // if (this.state.mySelectTree.length < 1) {
    this.setState({
      mySelectTree: [value],
    });
    // }
  };

  //doing with for in for
  // onCheckIncludes = async (value: IBreadNodes, childRepo?: IBreadNodes[]) => {
  //   let currentTree = this.state.mySelectTree;
  //   let result = false;
  //   if (!childRepo) {
  //     for (let i = 0; i < currentTree.length; i++) {
  //       if (currentTree[i].label === value.label) {
  //         console.log("find");
  //       }
  //       if (
  //         currentTree[i].label !== value.label &&
  //         currentTree[i].child.length >= 1
  //       ) {
  //         let child = currentTree[i].child;
  //         for (let j = 0; j < child.length; j++) {
  //           if (child[j].label === value.label) {
  //             console.log(currentTree[i]);
  //             console.log("find");
  //           }
  //           if (child[j].label !== value.label && child[j].child.length >= 1) {
  //             this.onCheckIncludes(value, child[j].child);
  //           }
  //         }
  //       }
  //     }
  //   }
  //   if (childRepo) {
  //     for (let i = 0; i < childRepo.length; i++) {
  //       if (childRepo[i].label === value.label) {
  //         console.log("find");
  //       }
  //       if (
  //         childRepo[i].label !== value.label &&
  //         childRepo[i].child.length >= 1
  //       ) {
  //         let child = childRepo[i].child;
  //         for (let j = 0; j < child.length; j++) {
  //           if (child[j].label === value.label) {
  //             console.log(childRepo[i]);
  //             console.log("find");
  //           }
  //           if (child[j].label !== value.label && child[j].child.length >= 1) {
  //             this.onCheckIncludes(value, child[j].child);
  //           }
  //         }
  //       }
  //     }
  //   }
  // };

  render() {
    console.log(this.state.NodesList);
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
              currentTree={this.state.mySelectTree}
              isSelected={item.child.length === 1 ? true : false}
              parentNode={null}
              onSelected={(value: any) => this.onSelectedChild(value)}
            />
          );
        })}
      </div>
    );
  }
}

export default Breadcrumd;
