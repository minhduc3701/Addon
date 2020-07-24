import * as React from "react";
import {
  IBreadNodesProps,
  BreadWrapper,
  SelectWrapper,
  IBreadNodes,
  ItemWrapper,
  INodeState,
  RowWrapper,
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
    currentSelectedNode?: IBreadNodes | null,
    theme?: string,
    selectedArr?: IBreadNodesProps[]
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
              currentSelectedNode={currentSelectedNode}
              theme={theme}
              selectedArr={selectedArr}
            />
          );
        })}
      </div>
    );
  };

  onRenderNode = (props: IBreadNodesProps) => {
    let selectNode = props.child.filter((node) => node.isSelected);
    const onSelectOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const { value } = e.target;
      let selectedItem = JSON.parse(value);
      props.onSelected &&
        props.onSelected({
          ...selectedItem,
          parentNode: props,
        });
      let item = document.getElementById(props.label);
      if (item) {
        item.style.width = `calc(${
          selectedItem.label.length * 14 + "px"
        } - 9px)`;
      }
    };

    return (
      <RowWrapper>
        <BreadWrapper theme={props}>
          {(((!props.parentNode || props.child.length <= 1) &&
            props.selectedArr?.findIndex(
              (node) => node.label === props.parentNode?.label
            ) === -1) ||
            (props.parentNode?.child.length === 1 &&
              props.child.length === 0)) && (
            <ItemWrapper>
              <a className="label-btn" href={props.src}>
                {props.label}
              </a>
              {!props.parentNode && (
                <Icon className="ms-breadIcon" iconName="ChevronRight" />
              )}
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
              {props.parentNode && props.parentNode.child.length >= 2 && (
                <Icon className="ms-breadIcon" iconName="ChevronRight" />
              )}
              <SelectWrapper theme={props}>
                <select
                  style={{
                    width: `${props.child[0].label.length * 14 + "px"}`,
                  }}
                  id={`${props.label}`}
                  onChange={onSelectOption}
                >
                  <option selected disabled hidden>
                    {props.child[0].label}
                  </option>
                  {props.child.map((item, index) => {
                    return (
                      <option
                        // id={item.label}
                        value={JSON.stringify(item)}
                        key={index}
                      >
                        {item.label}
                      </option>
                    );
                  })}
                </select>
              </SelectWrapper>
              {props.child.findIndex((node) => node.isSelected) !== -1 &&
                selectNode.length > 0 &&
                selectNode[0].child.length > 0 && (
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
            props.currentSelectedNode,
            props.theme,
            props.selectedArr
          )}
      </RowWrapper>
    );
  };
  render() {
    return <div>{this.onRenderNode(this.props)}</div>;
  }
}

export default BreadNode;
