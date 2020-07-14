import * as React from "react";
import CheckBox from "./CheckBoxTree";
import { ITreeViewPropsExample, ITreeViewProps } from "./TreeViewInterface";
import { getValueProps, CheckboxPropsExample } from "./CheckBoxStyle";
import { TestLanguage } from "../TestLanguage";
import { root } from "calendar-custom/Calendar.scss";
import CheckboxBasicExample from "./TreeViewCheckBox";
import { ItemWrapper, RepoWrapper } from "./CheckBoxStyle";
import { Checkbox } from "./index.js";
import { Icon } from "../@uifabric/icons/Icon";

export interface TreeViewState {
  childList: getValueProps[];
  parentList: getValueProps[];
  checkedRepo: getValueProps | null;
  parentRepo: getValueProps | null;
  isEnough: getValueProps[];
  selectedOptions?: any;
}

export interface OptionsListProps {
  options: ITreeViewProps[];
  selectedOptions: any;
  onChange: any;
}

class TreeView extends React.Component<ITreeViewPropsExample, TreeViewState> {
  constructor(props: ITreeViewPropsExample) {
    super(props);
    this.state = {
      childList: [],
      parentList: [],
      checkedRepo: null,
      parentRepo: null,
      isEnough: [],
      selectedOptions: {},
    };
  }

  CheckBoxTree = (header: string, isDisable: boolean) => {
    return (
      <ItemWrapper
        theme={{
          darkMode: this.props.darkMode,
        }}
      >
        <Icon
          //   onClick={this.onHandleDisplayTree}
          iconName={`ChevronDown`}
          className="icon-rightArrow"
        />
        <Checkbox
          //   checked={this.state.checked}
          //   indeterminate={
          //     this.state.checked ? false : this.state.indeterminate
          //   }
          title={header}
          label={header}
          disabled={isDisable || false}
          //   onChange={this.onHandleCheck}
        />
      </ItemWrapper>
    );
  };

  // change child checked by func using !this.state.checked
  render() {
    return (
      <div>
        <h1>Toppings</h1>
        <CheckboxBasicExample
          header={"asdsd"}
          options={this.props.data}
          onChange={(selectedOptions: any) =>
            this.setState({ selectedOptions })
          }
          selectedOptions={this.state.selectedOptions}
        />
      </div>
    );
  }
}

export default TreeView;
