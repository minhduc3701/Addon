import * as React from "react";
import { Checkbox } from "./index.js";
import { Icon } from "../@uifabric/icons/Icon";
import { ItemWrapper, RepoWrapper } from "./CheckBoxStyle";
import { CheckboxPropsExample, CheckBoxState } from "./CheckBoxStyle";
import { TestLanguage } from "../TestLanguage";
import { ITreeViewProps } from "./TreeViewInterface";

class CheckboxBasicExample extends React.Component<
  CheckboxPropsExample,
  CheckBoxState
> {
  constructor(props: CheckboxPropsExample) {
    super(props);
    this.state = {
      checked: false,
      viewTree: false,
    };
  }

  onHandleCheck = async () => {
    let current = this.state.checked;
    if (!this.props.isDisable) {
      await this.setState({
        checked: !current,
      });
    }
    this.props.getValue &&
      this.props.getValue({
        isChecked: this.state.checked,
        header: this.props.header,
        isLastChild: this.props.repo ? false : true,
        repo: this.props.repo,
      });
  };

  onHandleDisplayTree = () => {
    let currentTreeView = this.state.viewTree;
    this.setState({
      viewTree: !currentTreeView,
    });
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
              onClick={this.onHandleDisplayTree}
              iconName={this.state.viewTree ? `ChevronDown` : `ChevronRight`}
              className="icon-rightArrow"
            />
          )}
          <Checkbox
            checked={this.state.checked}
            // indeterminate={true}
            title={this.props.header}
            label={this.props.header}
            disabled={this.props.isDisable || false}
            onChange={this.onHandleCheck}
          />
        </ItemWrapper>
        {this.props.repo && //render child repo checkbox
          this.state.viewTree &&
          this.props.repo.map((item, index) => {
            let lastChild = false;
            let labelText = this.props.multilingual
              ? TestLanguage(item.header, this.props.multilingual)
              : item.header;
            if (!item.repo) {
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
                  header={labelText}
                  data={item.data}
                  isDisable={item.isDisable}
                  repo={item.repo}
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
