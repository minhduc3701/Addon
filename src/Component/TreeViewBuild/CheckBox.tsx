import * as React from "react";
import { Checkbox } from "../../Dependencies/TreeView";
import { Icon } from "@fluentui/react/lib/Icon";
import { ItemWrapper, RepoWrapper } from "./CheckBoxStyle";
import { ITreeViewProps } from "./TreeViewBuildStyle";

interface CheckboxPropsExample {
  label: string;
  disable?: boolean;
  childRepo?: ITreeViewProps[];
  darkMode?: string;
  getValue?: (val: string, checked: boolean) => void;
  lastChild?: boolean;
}
interface CheckBoxState {
  checked: boolean;
}

class CheckboxBasicExample extends React.Component<
  CheckboxPropsExample,
  CheckBoxState
> {
  constructor(props: CheckboxPropsExample) {
    super(props);
    this.state = {
      checked: false,
    };
  }

  componentDidMount() {
    this.handleLastChild();
  }

  handleLastChild = async () => {
    if (this.props.lastChild) {
      await this.setState({
        checked: true,
      });
      !this.props.disable &&
        this.props.getValue &&
        this.props.getValue(this.props.label, this.state.checked);
    }
  };

  onHandleCheck = async () => {
    let current = this.state.checked;
    if (!this.props.disable) {
      await this.setState({
        checked: !current,
      });
    }
    this.props.getValue &&
      this.props.getValue(this.props.label, this.state.checked);
  };

  render() {
    return (
      <div>
        <ItemWrapper
          theme={{
            darkMode: this.props.darkMode,
          }}
        >
          {!this.props.lastChild && (
            <Icon
              onClick={this.onHandleCheck}
              iconName={this.state.checked ? `ChevronDown` : `ChevronRight`}
              className="icon-rightArrow"
            />
          )}
          <Checkbox
            checked={this.state.checked}
            title={this.props.label}
            label={this.props.label}
            disabled={this.props.disable || false}
            onChange={this.onHandleCheck}
          />
        </ItemWrapper>
        {this.props.childRepo &&
          this.state.checked &&
          this.props.childRepo.map((item, index) => {
            let lastChild = false;
            if (!item.childRepo) {
              lastChild = true;
            }
            return (
              <RepoWrapper
                key={index}
                theme={{
                  ...item,
                  darkMode: this.props.darkMode,
                  lastChild: lastChild,
                }}
              >
                <CheckboxBasicExample
                  getValue={this.props.getValue}
                  darkMode={this.props.darkMode}
                  label={item.label}
                  disable={item.disable}
                  childRepo={item.childRepo}
                  lastChild={lastChild}
                />
              </RepoWrapper>
            );
          })}
      </div>
    );
  }
}

export default CheckboxBasicExample;
