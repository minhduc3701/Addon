import * as React from "react";
import {
  IFilterProps,
  PanelWrapper,
  CalendarWrapper,
  PanelContentWrapper,
  FilterColumnWrapper,
} from "./ListStyle";
import { Dropdown, IDropdownOption } from "../Dropdown";
import { Checkbox } from "../Checkbox/index";
import Button from "../Button";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import CalenderInline from "calendar-custom/CalenderInline";
import { Icon } from "../@uifabric/icons";

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
    };
  }

  componentDidMount() {
    this.onGetOptionFromColumns();
  }

  onGetOptionFromColumns = async () => {
    let currentColumns = this.props.columns;
    let optionsFilter: IDropdownOption[] = [];
    await currentColumns.forEach((item) => {
      optionsFilter.push({
        key: item.key,
        text: item.name,
      });
    });
    if (optionsFilter.length > 0) {
      this.setState({
        optionsFilterCol: optionsFilter,
      });
    }
  };

  onSelectDrop = (
    event: React.FormEvent<HTMLDivElement>,
    option?: IDropdownOption,
    index?: number
  ) => {
    if (option) {
      this.setState({
        type: option.key,
        value: this.state.value ? this.state.value : "",
        // key
        // operator
      });
    }
  };

  onSelectDropColumnsFilter = (
    event: React.FormEvent<HTMLDivElement>,
    option?: IDropdownOption,
    index?: number
  ) => {
    if (option) {
      let currentResultCol = [...this.state.filterColKey];
      if (option.selected) {
        currentResultCol.push(option.key);
        this.setState({
          filterColKey: currentResultCol,
        });
      }
      if (!option.selected) {
        let index = currentResultCol.findIndex((col) => col === option.key);
        if (index !== -1) {
          currentResultCol.splice(index, 1);
          this.setState({
            filterColKey: currentResultCol,
          });
        }
      }
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
      this.setState({ type: "boolean", value });
    }
  };

  onGetDataCalendar = (val: Date | Date[]): void => {
    if (Array.isArray(val)) {
      this.setState({
        type: "dateContains",
        value: val,
      });
    }
    if (!Array.isArray(val)) {
      this.setState({
        type: "date",
        value: new Date(val),
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
          <ul>
            <li>
              <Dropdown
                label="Operator"
                placeHolder="Select filter"
                options={options}
                disabled={this.state.isFilterColumns}
                onChange={this.onSelectDrop}
              />
            </li>
            <li>
              <TextField
                disabled={
                  this.state.type && !this.state.isFilterColumns ? false : true
                }
                label="Value"
                required
                onChange={this.onChangeInput}
                value={this.state.value ? this.state.value : ""}
              />
            </li>
          </ul>
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
            if (
              Object.prototype.toString.call(value) === "[object Date]" &&
              item[keyCol].setHours(0, 0, 0, 0).valueOf() === value.valueOf()
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
            let index = value.findIndex(
              (val: { date: Date }) =>
                val.date.valueOf() ===
                item[keyCol].setHours(0, 0, 0, 0).valueOf()
            );
            if (index !== -1) {
              return true;
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

  onApplyFilter = async () => {
    await this.onSortByFilter();
    this.props.onGetItem &&
      this.props.onGetItem(this.state.result, this.state.resultColumns);
  };

  onFilterColumns = async () => {
    let currentColumns = [...this.props.columns];
    if (this.state.filterColKey.length > 0) {
      let newCol = currentColumns.filter((col) => {
        if (this.state.filterColKey.includes(col.key)) {
          return true;
        }
        return false;
      });
      await this.setState({
        resultColumns: newCol,
      });
      this.props.onGetItem &&
        this.props.onGetItem(this.state.result, this.state.resultColumns);
    } else {
      await this.setState({
        isFilterColumns: false,
        filterColKey: [],
      });
    }
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
        <FilterColumnWrapper theme={this.props.darkMode}>
          {!this.state.isFilterColumns && (
            <p onClick={() => this.setState({ isFilterColumns: true })}>
              Custom display by columns
            </p>
          )}
          {this.state.isFilterColumns &&
            this.state.optionsFilterCol.length > 0 && (
              <>
                <div className="label-row">
                  <span>Select columns</span>
                  <Icon
                    iconName={
                      this.state.filterColKey.length > 0
                        ? "SkypeCircleCheck"
                        : "StatusErrorFull"
                    }
                    style={{
                      color: `${
                        this.state.filterColKey.length > 0
                          ? "#0078d4"
                          : "#C8C8C8"
                      }`,
                    }}
                    onClick={this.onFilterColumns}
                  />
                </div>
                <Dropdown
                  onChange={this.onSelectDropColumnsFilter}
                  className="dropdown-filterCol"
                  options={this.state.optionsFilterCol}
                  multiSelect
                  placeHolder="Select options"
                />
              </>
            )}
        </FilterColumnWrapper>
      </PanelContentWrapper>
    );
  }
}

export default Breadcrumd;
