import * as React from "react";
import {
  IBreadNodesProps,
  BreadWrapper,
  SelectWrapper,
  IBreadNodes,
  ItemWrapper,
  INodeState,
  RowWrapper,
  BreadNodeWrapper,
} from "./BreadcrumbStyle";
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
    onSelected?: (value: IBreadNodes) => void,
    currentSelectedNode?: IBreadNodes | null,
    theme?: string,
    mobileCurrentList?: IBreadNodesProps[],
    onClick?: (
      event:
        | React.MouseEvent<HTMLSpanElement>
        | React.ChangeEvent<HTMLSelectElement>
    ) => void,
    onSelectedMobile?: (value: IBreadNodesProps) => void,
    onSelectRootMobile?: (value: IBreadNodesProps) => void
  ) => {
    return (
      <div style={{ display: "flex" }}>
        {node.map((item, index) => {
          return (
            <BreadNode
              id={item.id}
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
              mobileCurrentList={mobileCurrentList}
              onClick={onClick}
              onSelectedMobile={onSelectedMobile}
              onSelectRootMobile={onSelectRootMobile}
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
      props.onClick && props.onClick(e);
    };

    const onChoiceItem = (
      e: React.MouseEvent<HTMLSpanElement>,
      value: IBreadNodesProps
    ) => {
      props.onSelected && props.onSelected(value);
      props.onClick && props.onClick(e);
    };

    const onSelectOptionOfMobile = (
      e: React.ChangeEvent<HTMLSelectElement>
    ) => {
      const { value } = e.target;
      let selectedItem = JSON.parse(value);
      props.onSelectedMobile &&
        props.onSelectedMobile({ ...selectedItem, parentNode: props });
      props.onClick && props.onClick(e);
      let item = document.getElementById(JSON.stringify(props.id));
      if (item) {
        item.style.width = `calc(${selectedItem.label.length * 14 + "px"} - ${
          selectedItem.label.length + "px"
        })`;
      }
    };

    const onChoiceItemMobile = (
      e: React.MouseEvent<HTMLSpanElement>,
      value: IBreadNodesProps
    ) => {
      props.onSelectedMobile && props.onSelectedMobile({ ...value });
      props.onClick && props.onClick(e);
    };

    const onHandleSelectRoot = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const { value } = e.target;
      let selectedItem = JSON.parse(value);
      props.onSelectRootMobile &&
        props.onSelectRootMobile({
          ...selectedItem,
        });
      props.onClick && props.onClick(e);
    };

    let currentMobile = props.mobileCurrentList?.findIndex(
      (node) => node.id === props.id
    );

    let currentParentMobile = props.mobileCurrentList?.findIndex(
      (node) => node.parentNode?.id === props.id && node.isSelected
    );

    return (
      <BreadNodeWrapper>
        <RowWrapper>
          <BreadWrapper theme={props} className="is-pc">
            {(!props.parentNode ||
              (!props.isSelected && selectNode.length === 0) ||
              (props.isSelected &&
                props.parentNode.isSelected &&
                props.parentNode.child.length <= 1)) && (
              <ItemWrapper theme={props.child}>
                <span
                  onClick={(e) => onChoiceItem(e, props)}
                  className="label-btn font-weight-bold"
                >
                  {props.label}
                </span>
                {props.child.length > 0 && (
                  <Icon className="ms-breadIcon" iconName="ChevronRight" />
                )}
              </ItemWrapper>
            )}
            {props.child.length > 1 && props.isSelected && (
              <ItemWrapper>
                <SelectWrapper theme={{ ...props, selectNode: selectNode }}>
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
                        <option value={JSON.stringify(item)} key={index}>
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
              props.mobileCurrentList,
              props.onClick,
              props.onSelectedMobile,
              props.onSelectRootMobile
            )}
        </RowWrapper>
        <RowWrapper>
          <BreadWrapper theme={props} className="is-mobile">
            {!props.parentNode &&
              props.mobileCurrentList &&
              props.mobileCurrentList.length >= 1 && (
                <>
                  <SelectWrapper theme={{ ...props, selectNode: selectNode }}>
                    <select
                      style={{
                        width: `30px`,
                      }}
                      value={"..."}
                      onChange={onHandleSelectRoot}
                    >
                      <option selected disabled hidden>
                        ...
                      </option>
                      {props.mobileCurrentList &&
                        props.mobileCurrentList.map((item, index) => {
                          return (
                            <option value={JSON.stringify(item)} key={index}>
                              {item.label}
                            </option>
                          );
                        })}
                    </select>
                  </SelectWrapper>
                  <Icon className="ms-breadIcon" iconName="ChevronRight" />
                </>
              )}
            {((!props.parentNode && currentMobile === -1) ||
              (props.parentNode &&
                props.parentNode.child.length === 1 &&
                currentMobile === -1)) && (
              <ItemWrapper theme={props.child}>
                <span
                  onClick={(e) => onChoiceItemMobile(e, props)}
                  className="label-btn font-weight-bold"
                >
                  {props.label}
                </span>
                {(currentMobile !== -1 || !props.parentNode) && (
                  <Icon className="ms-breadIcon" iconName="ChevronRight" />
                )}
              </ItemWrapper>
            )}
            {props.child.length > 1 &&
              currentParentMobile === -1 &&
              currentMobile !== -1 && (
                <>
                  <SelectWrapper theme={{ ...props, selectNode: selectNode }}>
                    <select
                      style={{
                        width: `calc(${
                          props.child[0].label.length * 14 + "px"
                        } - ${props.child[0].label.length + "px"})`,
                      }}
                      id={`${JSON.stringify(props.id)}`}
                      onChange={onSelectOptionOfMobile}
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
                  {currentMobile === -1 && (
                    <Icon className="ms-breadIcon" iconName="ChevronRight" />
                  )}
                </>
              )}
          </BreadWrapper>
          {currentMobile !== -1 &&
            currentParentMobile !== -1 &&
            this.onRenderSelectedNode(
              props.child,
              props,
              props.onSelected,
              props.currentSelectedNode,
              props.theme,
              props.mobileCurrentList,
              props.onClick,
              props.onSelectedMobile
            )}
        </RowWrapper>
      </BreadNodeWrapper>
    );
  };
  render() {
    return <div>{this.onRenderNode(this.props)}</div>;
  }
}

export default BreadNode;
