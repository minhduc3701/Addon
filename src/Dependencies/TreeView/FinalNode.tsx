import * as React from "react";
import { Checkbox } from "./index.js";
import { Icon } from "../@uifabric/icons/Icon";
import { ItemWrapper, RepoWrapper } from "./CheckBoxStyle";
import { ITreeNodeState, ITreeNodeProps, INodes } from "./FinalTreeInterface";

class TreeNode extends React.Component<ITreeNodeProps, any> {
  constructor(props: ITreeNodeProps) {
    super(props);
    this.state = {
      a: {},
    };
  }

  onRenderChildNode = (
    props: INodes[],
    theme?: string,
    parentNode?: ITreeNodeProps,
    onExpands?: any
  ) => {
    if (props.length > 0) {
      return (
        <ul>
          {props.map((item) => {
            return (
              <TreeNode
                isChecked={item.isChecked || false}
                isExpand={item.isExpand || false}
                isDisable={item.isDisable || false}
                header={item.header}
                isAllChildSelected={item.isAllChildSelected || false}
                isIndeterminate={item.isIndeterminate || false}
                childNodes={item.childNodes}
                key={item.id}
                node={item}
                parentNode={parentNode || null}
                theme={theme || ""}
                id={item.id}
                onExpands={onExpands}
              />
            );
          })}
        </ul>
      );
    }
  };

  onRenderNode = (props: ITreeNodeProps, theme?: string) => {
    const onHandleExpands = (node: INodes) => {
      props.onExpands(node);
    };

    return (
      <ul>
        <ItemWrapper
          theme={{
            darkMode: props.theme,
          }}
        >
          <Icon
            onClick={() => onHandleExpands(props)}
            iconName={props.isExpand ? `ChevronRight` : `ChevronDown`}
            className="icon-rightArrow"
          />
          <Checkbox
            checked={props.isChecked}
            indeterminate={props.isIndeterminate}
            title={props.header}
            label={props.header}
            disabled={props.isDisable}
          />
        </ItemWrapper>
        {props.isExpand &&
          this.onRenderChildNode(
            props.childNodes,
            theme,
            props,
            props.onExpands
          )}
      </ul>
    );
  };

  render() {
    return <div>{this.onRenderNode(this.props, this.props.theme)}</div>;
  }
}

export default TreeNode;
