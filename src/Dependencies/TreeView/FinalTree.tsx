import * as React from "react";
import { Checkbox } from "./index.js";
import { Icon } from "../@uifabric/icons/Icon";
import { ItemWrapper, RepoWrapper } from "./CheckBoxStyle";
// import { TestLanguage } from "../TestLanguage";
import {
  TreeViewState,
  ITreeViewPropsExample,
  ITreeViewProps,
  INodeProps,
} from "./FinalTreeInterface";

class TreeNode extends React.Component<ITreeViewProps, TreeViewState> {
  constructor(props: ITreeViewProps) {
    super(props);
    this.state = {
      isChecked: this.props.isChecked || false,
      isExpand: false,
      isAllChildSelected: false,
      indeterminate: false,
      isDisable: this.props.isDisable || false,
      darkMode: this.props.darkMode,
    };
  }

  onRenderNode = (props: ITreeViewProps) => {
    return (
      <div>
        {props.childNodes?.map((item, index) => {
          item = { ...item, ...this.state };
          return (
            <ul key={index}>
              <ItemWrapper
                theme={{
                  darkMode: this.state.darkMode,
                }}
              >
                <Icon
                  iconName={item.isExpand ? `ChevronRight` : `ChevronDown`}
                  className="icon-rightArrow"
                />
                <Checkbox
                  title={item.header}
                  label={item.header}
                  disabled={item.isDisable}
                />
              </ItemWrapper>
              {item.childNodes &&
                item.childNodes.length > 0 &&
                // item.isExpand &&
                this.onRenderChildNode(item.childNodes)}
            </ul>
          );
        })}
      </div>
    );
  };

  onRenderChildNode = (props: ITreeViewProps[]) => {
    if (props && props.length > 0) {
      return (
        <ul>
          <TreeNode childNodes={props} darkMode={this.state.darkMode} />
        </ul>
      );
    }
  };

  render() {
    return (
      <div>
        {this.onRenderNode({
          ...this.props,
          stateTree: this.state,
          onExpand: (isExpand: boolean) => {
            this.setState({ isExpand });
          },
        })}
      </div>
    );
  }
}

export default TreeNode;
