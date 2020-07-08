import * as React from "react";
import { Checkbox } from "./index.js";
import { Icon } from "../@uifabric/icons/Icon";
import { ItemWrapper, RepoWrapper } from "./CheckBoxStyle";
import { CheckboxPropsExample, CheckBoxState } from "./CheckBoxStyle";
import { TestLanguage } from "../TestLanguage";

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

  // checked for last child repo
  handleLastChild = async () => {
    if (this.props.lastChild) {
      await this.setState({
        checked: true,
      });
      !this.props.disable &&
        this.props.getValue &&
        this.props.getValue(this.props.value, this.state.checked);
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
      this.props.getValue(this.props.value, this.state.checked);
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
        {this.props.childRepo && //render child repo checkbox
          this.state.checked &&
          this.props.childRepo.map((item, index) => {
            let lastChild = false;
            let labelText = this.props.multilingual
              ? TestLanguage(item.label, this.props.multilingual)
              : item.label;
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
                  label={labelText}
                  value={item.label}
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
