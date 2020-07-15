import * as React from "react";
import { Checkbox } from "./index.js";
import { Icon } from "../@uifabric/icons/Icon";
import { ItemWrapper, RepoWrapper } from "./CheckBoxStyle";
// import { TestLanguage } from "../TestLanguage";
import { IRenderNode, TreeViewState } from "./FinalTreeInterface";

class TreeNode extends React.Component<TreeViewState, any> {
  constructor(props: TreeViewState) {
    super(props);
    this.state = {
      id: this.props.id,
      header: this.props.header,
      parentNode: this.props,
      parentNodeId: this.props.id,
      isChecked: this.props.isChecked || false,
      isExpand: true,
      isAllChildSelected: false,
      childNodes: this.props.repo! || this.props.childNodes,
      indeterminate: false,
      isDisable: this.props.isDisable || false,
      node: this.props,
      theme: this.props.darkMode,
    };
  }

  onRenderNode = (props: IRenderNode) => {
    return (
      <div>
        {props.childNodes?.map((item, index) => {
          let state = {
            id: item.id,
            header: item.header,
            parentNode: props.node,
            parentNodeId: item.id,
            isChecked: item.isChecked || false,
            isExpand: true,
            isAllChildSelected: false,
            childNodes: item.repo! || item.childNodes,
            indeterminate: false,
            isDisable: item.isDisable || false,
            node: item,
            theme: item.darkMode,
          };
          return (
            <ul>
              <ItemWrapper
                theme={{
                  darkMode: props.theme,
                }}
              >
                <Icon
                  // onClick={() => onHandleDisplayTree(item.id)}
                  iconName={`ChevronDown`}
                  className="icon-rightArrow"
                />
                <Checkbox
                  // checked={selectedNode?.includes(item.id) ? true : false}
                  // indeterminate={parentCheckNode?.includes(item.id) ? true : false}
                  // indeterminate={onCheckChildCurrent(item)}
                  title={item.header}
                  label={item.header}
                  disabled={item.isDisable}
                  // onChange={() => handleCheckboxClicked(item.id)}
                />
              </ItemWrapper>
              {props.isExpand && this.onRenderChildNode(state, props.theme)}
            </ul>
          );
        })}
      </div>
    );
  };

  onRenderChildNode = (props: any, theme?: string) => {
    console.log(props);
    if (props && props.childNodes.length > 0) {
      return (
        <ul>
          <TreeNode childNodes={props.childNodes} darkMode={theme} />
        </ul>
      );
    }
  };

  render() {
    return <div>{this.onRenderNode(this.state)}</div>;
  }
}

export default TreeNode;
