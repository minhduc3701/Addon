import * as React from "react";
import {
  IBreadNodesProps,
  BreadWrapper,
  SelectWrapper,
  IBreadNodes,
  ItemWrapper,
} from "./BreadcumbStyle";
import { Icon } from "../@uifabric/icons/Icon";

class BreadNode extends React.Component<IBreadNodesProps> {
  constructor(props: IBreadNodesProps) {
    super(props);
    this.state = {};
  }

  onRenderChildNode = (child: IBreadNodes[], parentNode?: IBreadNodes) => {
    if (child.length >= 1) {
      return (
        <div style={{ display: "flex" }}>
          {child.map((item, index) => {
            return (
              <BreadNode
                key={index}
                child={item.child}
                label={item.label}
                src={item.src}
                parentNode={parentNode}
                node={item}
                isSelected={item.isSelected || false}
              />
            );
          })}
        </div>
      );
    }
  };

  onRenderNode = (props: IBreadNodesProps) => {
    const onSelectOption = (e?: any, es?: any) => {
      console.log(e);
    };
    return (
      <ItemWrapper>
        <BreadWrapper>
          {props.child.length >= 2 ? (
            <SelectWrapper>
              <select
                id={`select-${props.label}`}
                onChange={() => onSelectOption(this)}
              >
                <option selected disabled hidden>
                  {props.label}
                </option>
                {props.child.map((item, index) => {
                  return (
                    <option value={JSON.stringify(item)} key={index}>
                      {item.label}
                    </option>
                  );
                })}
              </select>
            </SelectWrapper>
          ) : (
            <a className="label-btn" href={props.src}>
              {props.label}
            </a>
          )}
          {props.child.length >= 1 && (
            <Icon className="ms-breadIcon" iconName="ChevronRight" />
          )}
        </BreadWrapper>
        {this.onRenderChildNode(props.child, props)}
      </ItemWrapper>
    );
  };

  render() {
    return <div>{this.onRenderNode(this.props)}</div>;
  }
}

export default BreadNode;
