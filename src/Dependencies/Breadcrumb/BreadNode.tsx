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
import { Dropdown, IDropdownOption } from "../Dropdown";

class BreadNode extends React.Component<IBreadNodesProps, INodeState> {
  constructor(props: IBreadNodesProps) {
    super(props);
    this.state = {
      width: 0,
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
      event: React.MouseEvent<HTMLSpanElement> | React.FormEvent<HTMLDivElement>
    ) => void,
    onSelectedMobile?: (value: IBreadNodesProps) => void,
    onSelectRootMobile?: (value: IBreadNodesProps) => void
  ) => {
    return (
      <div style={{ display: "flex" }}>
        {node.map((item, index) => {
          return (
            <BreadNode
              key={index}
              id={item.id}
              child={item.child}
              text={item.text}
              data={item.data}
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
    const onChoiceItem = (
      e: React.MouseEvent<HTMLSpanElement>,
      value: IBreadNodesProps
    ) => {
      props.onSelected && props.onSelected(value);
      props.onClick && props.onClick(e);
    };

    const onChoiceItemMobile = (
      e: React.MouseEvent<HTMLSpanElement>,
      value: IBreadNodesProps
    ) => {
      console.log("do");
      props.onSelectedMobile &&
        value.child.length > 0 &&
        props.onSelectedMobile({ ...value });
      props.onClick && props.onClick(e);
    };

    const onHandleDropdown = (
      event: React.FormEvent<HTMLDivElement>,
      option?: IDropdownOption,
      index?: number
    ) => {
      props.onSelected &&
        option &&
        props.onSelected({
          ...option.data,
          parentNode: props,
        });
      props.onClick && props.onClick(event);
    };

    const onHandleDropdownMobile = (
      event: React.FormEvent<HTMLDivElement>,
      option?: IDropdownOption,
      index?: number
    ) => {
      props.onSelectedMobile &&
        option &&
        props.onSelectedMobile({
          ...option.data,
          parentNode: props,
        });
      props.onClick && props.onClick(event);
    };

    const onHandleDropdownMobileRoot = (
      event: React.FormEvent<HTMLDivElement>,
      option?: IDropdownOption,
      index?: number
    ) => {
      props.onSelectRootMobile &&
        option &&
        props.onSelectRootMobile({
          ...option.data,
          parentNode: props,
        });
      // props.onClick && props.onClick(event);
    };

    let isLast = false;
    if (props.mobileCurrentList) {
      let propsMobile = props.mobileCurrentList;
      for (let i = 0; i < propsMobile.length; i++) {
        if (propsMobile[i].isLast) {
          let index = props.child.findIndex(
            (node) => node.id === propsMobile[i].id
          );
          if (index !== -1) {
            isLast = true;
          }
        }
      }
    }

    let option: IDropdownOption[] = [];
    if (props.child) {
      let childNode = props.child;
      childNode.forEach((element) => {
        let item = {
          key: element.id,
          text: element.text,
          data: element,
        };
        option.push(item);
      });
    }
    let MobileOption: IDropdownOption[] = [];
    if (props.mobileCurrentList) {
      let childNode = props.mobileCurrentList;
      MobileOption.push({ key: "", text: "...", disabled: true, hidden: true });
      childNode.forEach((element) => {
        let item = {
          key: element.id,
          text: element.text,
          data: element,
        };
        MobileOption.push(item);
      });
    }

    let currentMobile = props.mobileCurrentList?.findIndex(
      (node) => node.id === props.id && !node.isLast
    );

    let indexParnet = props.mobileCurrentList?.findIndex(
      (node) => node.id === props.parentNode?.id
    );

    let itemInsideMobileList = props.mobileCurrentList?.findIndex(
      (node) => node.id === props.id
    );

    let mobileList = props.mobileCurrentList ? props.mobileCurrentList : [];
    let matching = mobileList.map((item) => {
      let index = props.child.findIndex(
        (node) => node.id === item.id && !item.isLast
      );
      return index;
    });

    let matchIndex = -1;
    if (matching.length > 0) {
      matchIndex = matching.findIndex((item) => item !== -1);
    }
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
                  className="label-btn"
                >
                  {props.text}
                </span>
                {props.child.length > 0 && (
                  <Icon className="ms-breadIcon" iconName="ChevronRight" />
                )}
              </ItemWrapper>
            )}
            {props.child.length > 1 && props.isSelected && (
              <ItemWrapper>
                <SelectWrapper theme={{ ...props, selectNode: selectNode }}>
                  <Dropdown
                    className="selectDrop"
                    placeholder={option[0].text}
                    options={option}
                    onChange={onHandleDropdown}
                  />
                </SelectWrapper>
                {props.child.findIndex((node) => node.isSelected) !== -1 &&
                  selectNode.length > 0 &&
                  selectNode[0].child.length > 0 && (
                    <Icon className="ms-breadIcon" iconName="ChevronRight" />
                  )}
              </ItemWrapper>
            )}
          </BreadWrapper>
          {((props.child.length < 2 &&
            selectNode &&
            selectNode.length < 1 &&
            props.mobileCurrentList &&
            props.mobileCurrentList.length < 1) ||
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
                    <Dropdown
                      defaultSelectedKey="..."
                      className="selectDrop-mobileRoot"
                      placeHolder="..."
                      options={MobileOption}
                      onChange={onHandleDropdownMobileRoot}
                    />
                  </SelectWrapper>
                  <Icon className="ms-breadIcon" iconName="ChevronRight" />
                </>
              )}

            {((!props.parentNode && currentMobile === -1) ||
              (props.parentNode &&
                props.parentNode.child.length === 1 &&
                indexParnet !== -1 &&
                currentMobile === -1)) && (
              <ItemWrapper theme={props.child}>
                <span
                  onClick={(e) => onChoiceItemMobile(e, props)}
                  className="label-btn"
                >
                  {props.text}
                </span>
                {(currentMobile !== -1 || !props.parentNode) && (
                  <Icon className="ms-breadIcon" iconName="ChevronRight" />
                )}
              </ItemWrapper>
            )}
            {itemInsideMobileList !== -1 &&
              props.child.length === 1 &&
              matchIndex === -1 && (
                <ItemWrapper theme={props.child[0]}>
                  <span
                    onClick={(e) => onChoiceItemMobile(e, props.child[0])}
                    className="label-btn"
                  >
                    {props.child[0].text}
                  </span>
                </ItemWrapper>
              )}
            {((props.child.length > 1 &&
              indexParnet === -1 &&
              matchIndex === -1) ||
              (indexParnet !== -1 &&
                matchIndex === -1 &&
                props.child.length > 1)) && (
              <>
                <SelectWrapper
                  theme={{
                    ...props,
                    selectNode: selectNode,
                    isLast,
                  }}
                >
                  {option.length > 0 && (
                    <Dropdown
                      className="selectDrop"
                      placeholder={option[0].text}
                      options={option}
                      onChange={onHandleDropdownMobile}
                    />
                  )}
                </SelectWrapper>
              </>
            )}
          </BreadWrapper>
          {matchIndex !== -1 &&
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
