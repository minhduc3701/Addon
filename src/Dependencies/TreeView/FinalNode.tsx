import * as React from "react";
import { Checkbox } from "../Checkbox/index";
import { Icon } from "../@uifabric/icons/Icon";
import { INodes, ItemWrapper } from "./FinalTreeInterface";
import { TestLanguage } from "../TestLanguage";

class TreeNode extends React.Component<INodes> {
  onRenderChildNode = (
    props: INodes[],
    theme?: string,
    parentNode?: INodes,
    onExpands?: (node: INodes) => void,
    onChecked?: (node: INodes) => void,
    multilingual?: { textKey: string; context: string }[]
  ) => {
    if (props.length > 0) {
      return (
        <ul>
          {props.map((item) => {
            if (item.childNodes.length >= 1) {
              let count = 0;
              let child = item.childNodes;
              let length = item.childNodes.length;
              for (let i = 0; i < child.length; i++) {
                if (child[i].isChecked) {
                  count++;
                }
              }
              if (count === length) {
                item.isChecked = true;
                item.isIndeterminate = false;
              }
              if (count < length && count > 0) {
                item.isChecked = false;
                item.isIndeterminate = true;
              }
              if (count === 0) {
                item.isChecked = false;
                item.isIndeterminate = false;
              }
            }

            let labelVal =
              multilingual && item.label
                ? TestLanguage(item.label, multilingual)
                : item.label;

            return (
              <TreeNode
                isChecked={item.isChecked || false}
                isExpand={item.isExpand || false}
                isDisable={item.isDisable || false}
                label={labelVal}
                isAllChildSelected={item.isAllChildSelected || false}
                isIndeterminate={item.isIndeterminate || false}
                childNodes={item.childNodes}
                key={item.id}
                node={item}
                parentNode={parentNode || null}
                theme={theme || ""}
                id={item.id}
                onExpands={onExpands}
                onChecked={onChecked}
                multilingual={multilingual}
              />
            );
          })}
        </ul>
      );
    }
  };

  onRenderNode = (props: INodes, theme?: string) => {
    const onHandleExpands = (node: INodes) => {
      props.onExpands && props.onExpands(node);
    };

    const onHandleCheck = (node: INodes) => {
      props.onChecked && props.onChecked(node);
    };

    return (
      <div>
        <ItemWrapper
          theme={{
            darkMode: props.theme,
            visibleIcon: props.childNodes.length >= 1 ? true : false,
          }}
        >
          {props.childNodes.length >= 1 && (
            <Icon
              onClick={() => onHandleExpands(props)}
              iconName={props.isExpand ? `ChevronRight` : `ChevronDown`}
              className="icon-rightArrow"
            />
          )}
          <Checkbox
            checked={props.isChecked}
            indeterminate={props.isIndeterminate}
            title={props.label}
            label={props.label}
            disabled={props.isDisable}
            onChange={() => onHandleCheck(props)}
          />
        </ItemWrapper>
        {props.isExpand &&
          this.onRenderChildNode(
            props.childNodes,
            theme,
            props,
            props.onExpands,
            props.onChecked,
            props.multilingual
          )}
      </div>
    );
  };

  render() {
    return <div>{this.onRenderNode(this.props, this.props.theme)}</div>;
  }
}

export default TreeNode;
