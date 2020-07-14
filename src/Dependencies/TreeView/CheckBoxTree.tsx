import * as React from "react";
import { Checkbox } from "./index.js";
import { Icon } from "../@uifabric/icons/Icon";
import { ItemWrapper, RepoWrapper } from "./CheckBoxStyle";
import { CheckboxPropsExample, CheckBoxState } from "./CheckBoxStyle";
import { TestLanguage } from "../TestLanguage";
import { TreeViewState } from "./TreeView";

class CheckboxBasicExample extends React.Component<
  CheckboxPropsExample,
  CheckBoxState
> {
  constructor(props: CheckboxPropsExample) {
    super(props);
    this.state = {
      checked: false,
      handleCheck: null,
      viewTree: false,
      indeterminate: false,
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps: CheckboxPropsExample) {
    let { dataChecked } = nextProps;
    if (dataChecked && dataChecked.checkedRepo?.isChecked) {
      this.onCheckChild(dataChecked!);
      this.onCheckParent(dataChecked!);
      this.onCheckEmptyisEnough(dataChecked!);
    }
    if (dataChecked && !dataChecked.checkedRepo?.isChecked) {
      this.onCheckParent(dataChecked!);
      this.onCheckEmptyisEnough(dataChecked!);
    }
  }

  componentDidMount() {
    this.onCheckChild(this.props.dataChecked!);
    this.onCheckParent(this.props.dataChecked!);
    this.onCheckEmptyisEnough(this.props.dataChecked!);
  }

  onCheckEmptyisEnough = (data: TreeViewState) => {
    let { parentList, isEnough } = data;
    let currentParent = [...new Set(parentList)];
    for (let i = 0; i < currentParent.length; i++) {
      if (
        currentParent[i].header === this.props.header &&
        isEnough.length < 1
      ) {
        this.setState({
          checked: false,
          indeterminate: false,
        });
      }
      if (
        currentParent[i].header === this.props.header &&
        isEnough.length > 0
      ) {
        let count = 0;
        for (let j = 0; j < currentParent.length; j++) {
          let repo = currentParent[j].repo!;
          if (repo) {
            for (let k = 0; k < repo.length; k++) {
              for (let l = 0; l < isEnough.length; l++) {
                if (isEnough[l].header === repo[k].header) {
                  count++;
                }
              }
            }
            if (count === 0) {
              this.setState({
                checked: false,
                indeterminate: false,
              });
            }
          }
        }
      }
    }
  };

  onCheckChild = (data: TreeViewState) => {
    if (data.childList && data.childList.length > 0) {
      let repo = data.childList;
      for (let i = 0; i < repo.length; i++) {
        if (repo[i].header === this.props.header) {
          this.setState({
            checked: true,
            indeterminate: false,
          });
        }
      }
    }
  };

  onCheckParent = (data: TreeViewState) => {
    let { parentList } = data;
    let currentParent = [...new Set(parentList)];
    for (let i = 0; i < currentParent.length; i++) {
      if (
        currentParent[i].header === this.props.header &&
        currentParent[i].isEnough
      ) {
        this.setState({
          checked: true,
          indeterminate: false,
        });
      }
      if (
        currentParent[i].header === this.props.header &&
        !currentParent[i].isEnough
      ) {
        this.setState({
          checked: false,
          indeterminate: true,
        });
      }
    }
  };

  onHandleCheck = async () => {
    let currentChecked = this.state.checked;
    if (!this.props.isDisable) {
      await this.setState({
        checked: !currentChecked,
      });
    }
    // this.props.getValue &&
    //   this.props.getValue({
    //     isChecked: this.state.checked,
    //     header: this.props.header,
    //     isLastChild: this.props.repo ? false : true,
    //     repo: this.props.repo,
    //   });
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
            indeterminate={
              this.state.checked ? false : this.state.indeterminate
            }
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
                  // getValue={this.props.getValue}
                  darkMode={this.props.darkMode}
                  header={labelText}
                  data={item.data}
                  isDisable={item.isDisable}
                  repo={item.repo}
                  lastChild={lastChild}
                  dataChecked={this.props.dataChecked}
                />
              </RepoWrapper>
            );
          })}
      </div>
    );
  }
}

export default CheckboxBasicExample;
