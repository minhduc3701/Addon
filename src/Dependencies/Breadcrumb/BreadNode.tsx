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
    theme?: string
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
      props.onSelected && props.onSelected(selectedItem);
      // let length = selectedItem.label.length * 14 + "px";
      // let item = document.getElementById(`${selectedItem.label} selected`);
      // let text = item?.clientWidth;
      // console.log(item);
      // if (item) {
      //   item.style.width = length;
      // }
    };

    console.log(selectNode[0]);

    return (
      <RowWrapper>
        <BreadWrapper theme={props}>
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
              {props.parentNode && props.parentNode.child.length >= 2 && (
                <Icon className="ms-breadIcon" iconName="ChevronRight" />
              )}
              <SelectWrapper theme={props}>
                <select
                  style={{
                    width: `${
                      props.currentSelectedNode &&
                      props.currentSelectedNode.label === props.label
                        ? props.child[0].label.length * 14 + "px"
                        : selectNode[0]
                        ? selectNode[0].label.length * 14 + "px"
                        : props.label.length * 14 + "px"
                    }`,
                  }}
                  id={`${props.label}`}
                  onChange={onSelectOption}
                >
                  <option selected disabled hidden>
                    {props.child[0].label}
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
            props.theme
          )}
      </RowWrapper>
    );
  };
  render() {
    return <div>{this.onRenderNode(this.props)}</div>;
  }
}

export default BreadNode;
