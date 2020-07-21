import * as React from "react";
import {
  IBreadNodesProps,
  BreadWrapper,
  SelectWrapper,
  IBreadNodes,
  ItemWrapper,
  INodeState,
} from "./BreadcumbStyle";
import { Icon } from "../@uifabric/icons/Icon";

class BreadNode extends React.Component<IBreadNodesProps, INodeState> {
  constructor(props: IBreadNodesProps) {
    super(props);
    this.state = {
      selectedItem: null,
    };
  }

  onRenderChildNode = (
    child: IBreadNodes[],
    parentNode?: IBreadNodes,
    onSelected?: (value: any) => void
  ) => {
    console.log(child);
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
                onSelected={onSelected}
              />
            );
          })}
        </div>
      );
    }
  };

  onRenderNode = (props: IBreadNodesProps) => {
    const onSelectOption = (e?: any) => {
      const { value } = e.target;
      let selectedItem = JSON.parse(value);
      props.onSelected && props.onSelected(selectedItem);
    };

    return (
      <ItemWrapper>
        <BreadWrapper>
          {props.child.length >= 2 ? (
            <SelectWrapper>
              <select
                defaultValue={props.label}
                id={`select-${props.label}`}
                onChange={onSelectOption}
              >
                <option disabled hidden>
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
        {this.onRenderChildNode(props.child, props, props.onSelected)}
      </ItemWrapper>
    );
  };

  render() {
    return <div>{this.onRenderNode(this.props)}</div>;
  }
}

export default BreadNode;
