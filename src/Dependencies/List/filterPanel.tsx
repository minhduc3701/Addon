import * as React from "react";
import {
  StateListWrapper,
  IListProps,
  IListStates,
  IFilterProps,
  PanelWrapper,
  IColumn as IColumnCustom,
} from "./ListStyle";
import { Dropdown, IDropdownOption } from "../Dropdown";
import { Checkbox } from "../Checkbox/index";
import Button from "../Button";
import { TextField } from "office-ui-fabric-react/lib/TextField";

class Breadcrumd extends React.Component<IFilterProps, any> {
  constructor(props: IFilterProps) {
    super(props);
    this.state = {
      type: undefined,
      value: undefined,
      result: [],
    };
  }

  onSelectDrop = (
    event: React.FormEvent<HTMLDivElement>,
    option?: IDropdownOption,
    index?: number
  ) => {
    if (option) {
      this.setState({
        type: option.key,
        value: this.state.value ? this.state.value : "",
      });
    }
  };

  onChangeInput = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string
  ) => {
    let currentType = this.state.type;
    if (newValue && currentType) {
      this.setState({
        value: newValue,
      });
    }
  };

  onCheckedBox = (
    ev?: React.FormEvent<HTMLElement | HTMLInputElement>,
    value?: string
  ) => {
    let currentValue = this.state.value;
    if (currentValue === value) {
      this.setState({ type: undefined, value: undefined });
    }
    if (currentValue !== value) {
      this.setState({ type: "boolean", value });
    }
  };

  onRenderCheckBox = (type: string): JSX.Element => {
    const options: IDropdownOption[] = [
      { key: "equal", text: "Equal" },
      { key: "notEqual", text: "Does not equal" },
      { key: "contains", text: "Contains" },
      { key: "notContains", text: "Does not contain" },
    ];
    switch (type) {
      case "boolean":
        return (
          <>
            <h4>Is done?</h4>
            <ul>
              <li>
                <Checkbox
                  title="Done"
                  label="Done"
                  checked={
                    this.state.type === "boolean" && this.state.value === "true"
                      ? true
                      : false
                  }
                  onChange={(e) => this.onCheckedBox(e, "true")}
                />
              </li>
              <li>
                <Checkbox
                  title="Processing"
                  label="Processing"
                  checked={
                    this.state.type && this.state.value === "false"
                      ? true
                      : false
                  }
                  onChange={(e) => this.onCheckedBox(e, "false")}
                />
              </li>
            </ul>
          </>
        );

      case "object":
        return <h1>a</h1>;

      default:
        return (
          <ul>
            <li>
              <Dropdown
                label="Operator"
                placeHolder="Select filter"
                options={options}
                onChange={this.onSelectDrop}
              />
            </li>
            <li>
              <TextField
                disabled={this.state.type ? false : true}
                label="Value"
                required
                onChange={this.onChangeInput}
                value={this.state.value}
              />
            </li>
          </ul>
        );
    }
  };

  onClearFilter = () => {
    this.setState({
      value: undefined,
    });
  };

  onSortByFilter = async () => {
    console.log("do");
    // let items = [...this.state.items];
    // let filterArr = [...this.state.filterBy];
    // let result = await items.filter((item) => {
    //   for (const keys in item) {
    //     let index = filterArr.findIndex(
    //       (filterItem) => filterItem === item[keys]
    //     );
    //     if (index !== -1) {
    //       return true;
    //     }
    //   }
    //   return false;
    // });
    // this.setState({
    //   filterResult: result,
    //   isPanelVisible: !this.state.isPanelVisible,
    //   filterBy: [],
    // });
  };

  render() {
    let { targetColumn } = this.props;
    console.log(this.props);
    return (
      <PanelWrapper>
        {targetColumn &&
          ["number", "string"].includes(targetColumn.data) &&
          this.onRenderCheckBox("numString")}
        {targetColumn &&
          targetColumn.data === "boolean" &&
          this.onRenderCheckBox("boolean")}
        {targetColumn &&
          targetColumn.data === "object" &&
          this.onRenderCheckBox("object")}
        <div className="btn-panel-group">
          <Button
            type="Primary"
            text="Apply"
            disabled={this.state.value ? false : true}
            onClick={
              this.state.type && this.state.value
                ? this.onSortByFilter
                : undefined
            }
          />
          <Button
            text="Clear all"
            styles={{ color: "#333333" }}
            onClick={this.onClearFilter}
          />
        </div>
      </PanelWrapper>
    );
  }
}

export default Breadcrumd;
