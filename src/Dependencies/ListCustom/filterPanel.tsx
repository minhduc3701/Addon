import * as React from "react";
import {
  IFilterProps,
  PanelWrapper,
  CalendarWrapper,
  PanelContentWrapper,
  OptionAndTextWrapper,
} from "./ListStyle";
import { Dropdown, IDropdownOption } from "../Dropdown";
import { Checkbox } from "../Checkbox/index";
import Button from "../Button";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import CalenderInline from "../calendar-custom/CalenderInline";

class Breadcrumd extends React.Component<IFilterProps, any> {
  constructor(props: IFilterProps) {
    super(props);
    this.state = {
      type: undefined,
      value: undefined,
      result: [],
      resultColumns: [],
      isFilterColumns: false,
      optionsFilterCol: [],
      filterColKey: [],
      operator: undefined,
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
        operator: option.key,
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
      this.setState({ type: "boolean", value, operator: "equal" });
    }
  };

  onGetDataCalendar = (val: Date | Date[]): void => {
    if (Array.isArray(val)) {
      this.setState({
        type: "dateContains",
        operator: "contains",
        value: val,
      });
    }
    if (!Array.isArray(val)) {
      let valueString = val.toJSON();
      this.setState({
        type: "date",
        operator: "equal",
        value: valueString,
      });
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
                    this.state.type === "boolean" && this.state.value
                      ? true
                      : false
                  }
                  disabled={this.state.isFilterColumns}
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
                  disabled={this.state.isFilterColumns}
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
                  value={this.state.value ? this.state.value : ""}
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
    let { items, targetColumn } = this.props;
    let { type, value } = this.state;
    if (type && targetColumn?.fieldName) {
      let keyCol = targetColumn.fieldName;
      switch (type) {
        case "equal":
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

        case "notEqual":
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
        case "notContains":
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
              selectedDate.setHours(0, 0, 0, 0).valueOf() === value.valueOf()
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
            let index = value.findIndex(
              (val: { date: Date }) =>
                val.date.valueOf() ===
                selectedDate.setHours(0, 0, 0, 0).valueOf()
            );
            if (index !== -1) {
              return true;
            }
            return false;
          });
          console.log(resultDateContain);
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

  onApplyFilter = async () => {
    await this.onSortByFilter();
    this.props.onGetFilterObject &&
      this.props.onGetFilterObject({
        columnKey: this.props.targetColumn.key,
        key: this.props.targetColumn.fieldName,
        value: this.state.value ? this.state.value : "",
        operator: this.state.operator,
      });
    this.props.onGetItem &&
      this.props.onGetItem(this.state.result, this.state.resultColumns);
  };

  render() {
    let { targetColumn } = this.props;
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
                (typeof this.state.value !== "object" &&
                  this.state.value &&
                  !this.state.isFilterColumns) ||
                (this.state.type === "boolean" &&
                  !this.state.isFilterColumns) ||
                (Array.isArray(this.state.value) &&
                  this.state.value.length >= 1 &&
                  !this.state.isFilterColumns) ||
                (typeof this.state.value === "object" &&
                  this.state.value &&
                  !this.state.isFilterColumns)
                  ? false
                  : true
              }
              onClick={
                this.state.type &&
                this.state.value !== undefined &&
                !this.state.isFilterColumns
                  ? this.onApplyFilter
                  : undefined
              }
              darkMode={this.props.darkMode}
            />
            <Button
              disabled={this.state.isFilterColumns}
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
