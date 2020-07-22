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

  onRenderSelectedNode = (
    node: IBreadNodes[],
    parentNode?: IBreadNodes,
    onSelected?: (value: any) => void,
    currentTree?: IBreadNodes[]
  ) => {
    return (
      <div style={{ display: "flex" }}>
        {node.map((item, index) => {
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
              currentTree={currentTree}
            />
          );
        })}
      </div>
    );
  };

  onRenderNode = (props: IBreadNodesProps) => {
    const onSelectOption = (e?: any) => {
      const { value } = e.target;
      let selectedItem = JSON.parse(value);
      props.onSelected && props.onSelected(selectedItem);
    };

    let selectNode = props.child.filter((node) => node.isSelected);
    return (
      <ItemWrapper>
        <BreadWrapper>
          {(!props.parentNode || props.child.length === 1) && (
            <ItemWrapper>
              <a className="label-btn" href={props.src}>
                {props.label}
              </a>
              <Icon className="ms-breadIcon" iconName="ChevronRight" />
            </ItemWrapper>
          )}
          {props.child.length > 1 && (
            <ItemWrapper>
              {props.parentNode && props.parentNode.child.length < 2 && (
                <ItemWrapper>
                  <a className="label-btn" href={props.src}>
                    {props.label}
                  </a>
                  <Icon className="ms-breadIcon" iconName="ChevronRight" />
                </ItemWrapper>
              )}
              <SelectWrapper>
                <select onChange={onSelectOption}>
                  {props.child.map((item, index) => {
                    return (
                      <option value={JSON.stringify(item)} key={index}>
                        {item.label}
                      </option>
                    );
                  })}
                </select>
              </SelectWrapper>
              {props.currentTree && props.currentTree.length < 1 && (
                <Icon className="ms-breadIcon" iconName="ChevronRight" />
              )}
            </ItemWrapper>
          )}
        </BreadWrapper>
        {((props.child.length < 2 && selectNode && selectNode.length < 1) ||
          (selectNode && selectNode.length >= 1)) &&
          this.onRenderSelectedNode(
            selectNode && selectNode.length >= 1 ? selectNode : props.child,
            props,
            props.onSelected,
            props.currentTree
          )}
      </ItemWrapper>
    );
  };
  render() {
    return <div>{this.onRenderNode(this.props)}</div>;
  }
}

export default BreadNode;
