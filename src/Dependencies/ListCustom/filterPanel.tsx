import * as React from "react";
import {
  IFilterProps,
  PanelWrapper,
  CalendarWrapper,
  PanelContentWrapper,
  OptionAndTextWrapper,
  IFilterState,
} from "./ListStyle";
import { Dropdown, IDropdownOption } from "../Dropdown";
import { Checkbox } from "../Checkbox/index";
import Button from "../Button";
import { TextField } from "../TextField";
import CalenderInline from "../calendar-custom/CalenderInline";

class Breadcrumd extends React.Component<IFilterProps, IFilterState> {
  constructor(props: IFilterProps) {
    super(props);
    this.state = {
      type: undefined,
      value: undefined,
      result: [],
      resultColumns: [],
      operator: "",
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
        operator:
          typeof option.key !== "string"
            ? JSON.stringify(option.key)
            : option.key,
      });
    }
  };

  onChangeInput = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string
  ) => {
    let currentType = this.state.type;
    if (currentType) {
      this.setState({
        value: newValue?.toLocaleLowerCase(),
      });
    }
  };

  onCheckedBox = (
    ev?: React.FormEvent<HTMLElement | HTMLInputElement>,
    value?: boolean
  ) => {
    let currentValue = this.state.value;
    if (currentValue === value) {
      this.setState({ type: undefined, value: undefined });
    }
    if (currentValue !== value) {
      this.setState({ type: "boolean", value, operator: "eq" });
    }
  };

  onGetDataCalendar = (val: Date | { date: Date }[]): void => {
    if (Array.isArray(val) && val.length >= 2) {
      this.setState({
        type: "dateContains",
        operator: "contains",
        value: val,
      });
    }
    if (!Array.isArray(val)) {
      this.setState({
        type: "date",
        operator: "eq",
        value: val,
      });
    }
  };

  onApplyFilter = async () => {
    !this.props.loading && (await this.onSortByFilter());
    this.props.onGetFilterObject &&
      this.props.onGetFilterObject({
        columnKey: this.props.targetColumn.key,
        key: this.props.targetColumn.fieldName!,
        value:
          this.state.value || this.state.value === false
            ? this.state.value
            : "",
        operator: this.state.operator,
      });
    this.props.onGetItem && this.props.onGetItem(this.state.result);
  };

  onSubmitText = (e: React.KeyboardEvent) => {
    let { keyCode } = e;
    if (keyCode === 13 && this.state.type && this.state.value !== undefined) {
      this.onApplyFilter();
    }
  };

  onRenderCheckBox = (type: string): JSX.Element => {
    const options: { key: string; text: string }[] = [
      { key: "eq", text: "Equal" },
      { key: "ne", text: "Does not equal" },
      { key: "contains", text: "Contains" },
      { key: "not", text: "Does not contain" },
    ];
    switch (type) {
      case "boolean":
        return (
          <>
            <ul>
              <li>
                <Checkbox
                  title="Done"
                  label="Done"
                  checked={
                    this.state.type === "boolean" && this.state.value
                      ? true
                      : false
                  }
                  onChange={(e) => this.onCheckedBox(e, true)}
                />
              </li>
              <li>
                <Checkbox
                  title="Processing"
                  label="Processing"
                  checked={
                    this.state.type === "boolean" && !this.state.value
                      ? true
                      : false
                  }
                  onChange={(e) => this.onCheckedBox(e, false)}
                />
              </li>
            </ul>
          </>
        );

      case "date":
        return (
          <CalendarWrapper>
            <CalenderInline
              autoNavigateOnSelection={true} //required
              showGoToToday={false} //required
              highlightSelectedMonth={true}
              showMonthPickerAsOverlay={true}
              showWeekNumbers={false}
              showSixWeeksByDefault={false}
              onSelectChanged={this.onGetDataCalendar}
              switchMode={true}
              darkMode={this.props.darkMode}
            />
          </CalendarWrapper>
        );

      default:
        return (
          <OptionAndTextWrapper theme={this.props.darkMode}>
            <ul>
              <li>
                <Dropdown
                  label="Operator"
                  placeholder="Select filter"
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
                  value={
                    this.state.value && typeof this.state.value === "string"
                      ? this.state.value
                      : ""
                  }
                  styles={{
                    fieldGroup: {
                      backgroundColor:
                        this.props.darkMode === "dark" ? "#212121" : "#ffffff",
                    },
                    field: {
                      color:
                        this.props.darkMode === "dark" ? "#ffffff" : "#212121",
                    },
                  }}
                  onKeyDown={this.onSubmitText}
                />
              </li>
            </ul>
          </OptionAndTextWrapper>
        );
    }
  };

  onClearFilter = () => {
    this.setState({
      type: this.state.type === "boolean" ? undefined : this.state.type,
      value: undefined,
      result: [],
    });
  };

  onSortByFilter = async () => {
    let { targetColumn } = this.props;
    let items = [...this.props.items];
    let { type, value } = this.state;
    if (type && targetColumn?.fieldName) {
      let keyCol = targetColumn.fieldName;
      switch (type) {
        case "eq":
          let resultEqual = items.filter((item) => {
            let itemVal =
              typeof item[keyCol] === "string"
                ? item[keyCol].toLocaleLowerCase()
                : item[keyCol].toString();
            if (itemVal === value) {
              return true;
            }
            return false;
          });
          await this.setState({
            result: resultEqual,
          });
          break;

        case "ne":
          let resultNotEqual = items.filter((item) => {
            let itemVal =
              typeof item[keyCol] === "string"
                ? item[keyCol].toLocaleLowerCase()
                : item[keyCol].toString();
            if (itemVal !== value) {
              return true;
            }
            return false;
          });
          await this.setState({
            result: resultNotEqual,
          });
          break;
        case "contains":
          let resultContain = items.filter((item) => {
            let string =
              typeof item[keyCol] === "string"
                ? item[keyCol].toLocaleLowerCase()
                : item[keyCol].toString();
            if (string.indexOf(value) !== -1) {
              return true;
            }
            return false;
          });
          await this.setState({
            result: resultContain,
          });
          break;
        case "not":
          let resultNotContain = items.filter((item) => {
            let string =
              typeof item[keyCol] === "string"
                ? item[keyCol].toLocaleLowerCase()
                : item[keyCol].toString();
            if (string.indexOf(value) === -1) {
              return true;
            }
            return false;
          });
          await this.setState({
            result: resultNotContain,
          });
          break;

        case "date":
          let resultDate = items.filter((item) => {
            let selectedDate = new Date(item[keyCol]);
            if (
              Object.prototype.toString.call(value) === "[object Date]" &&
              selectedDate.setHours(0, 0, 0, 0).valueOf() === value?.valueOf()
            ) {
              return true;
            }
            return false;
          });
          await this.setState({
            result: resultDate,
          });
          break;

        case "dateContains":
          let resultDateContain = items.filter((item) => {
            let selectedDate = new Date(item[keyCol]);
            if (Array.isArray(value)) {
              let index = value?.findIndex(
                (val: { date: Date }) =>
                  val.date.valueOf() ===
                  selectedDate.setHours(0, 0, 0, 0).valueOf()
              );
              if (index !== -1) {
                return true;
              }
            }
            return false;
          });
          await this.setState({
            result: resultDateContain,
          });
          break;

        case "boolean":
          let resultBoolean = items.filter((item) => {
            if (item[keyCol] === value) {
              return true;
            }
            return false;
          });
          await this.setState({
            result: resultBoolean,
          });
          break;

        default:
          break;
      }
    }
  };

  render() {
    let { targetColumn } = this.props;
    // error when switch calendar and submit button
    return (
      <PanelContentWrapper>
        <PanelWrapper theme={this.props.darkMode}>
          {targetColumn &&
            ["number", "string"].includes(targetColumn.data) &&
            this.onRenderCheckBox("numString")}
          {targetColumn &&
            targetColumn.data === "boolean" &&
            this.onRenderCheckBox("boolean")}
          {targetColumn &&
            targetColumn.data === "date" &&
            this.onRenderCheckBox("date")}
          <div className="btn-panel-group">
            <Button
              type="Primary"
              text="Apply"
              disabled={
                (typeof this.state.value !== "object" && this.state.value) ||
                this.state.type === "boolean" ||
                (Array.isArray(this.state.value) &&
                  this.state.value.length >= 1) ||
                (typeof this.state.value === "object" && this.state.value)
                  ? false
                  : true
              }
              onClick={
                this.state.type && this.state.value !== undefined
                  ? this.onApplyFilter
                  : undefined
              }
              darkMode={this.props.darkMode}
            />
            <Button
              text="Clear all"
              onClick={this.onClearFilter}
              darkMode={this.props.darkMode}
            />
          </div>
        </PanelWrapper>
      </PanelContentWrapper>
    );
  }
}

export default Breadcrumd;
