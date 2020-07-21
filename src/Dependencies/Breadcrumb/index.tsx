import * as React from "react";
import { IBreadcrumdProps, IBreadcrumdStates } from "./BreadcumbStyle";
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
            />
          );
        })}
      </div>
    );
  }
}

export default Breadcrumd;
