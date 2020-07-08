import * as React from "react";
import { Calendar, DayOfWeek, DateRangeType } from "calendar-custom";
import {
  addDays,
  getDateRangeArray,
} from "office-ui-fabric-react/lib/utilities/dateMath/DateMath";
import { initializeIcons } from "office-ui-fabric-react/lib/Icons";
import { CalenderDarkMode, ToggleWrapper } from "./CalenderStyle";
import { Toggle } from "office-ui-fabric-react/lib/Toggle";
import {
  ICalendarStrings,
  ICalendarFormatDateCallbacks,
} from "office-ui-fabric-react/lib/components/Calendar/Calendar.types";
import { IDayInfo } from "office-ui-fabric-react/lib/components/Calendar/CalendarDay";

interface eventExamples {
  [index: number]: { date: Date | string; event: number };
}

export interface ICalendarInlineExampleProps {
  isMonthPickerVisible?: boolean;
  autoNavigateOnSelection: boolean;
  showGoToToday: boolean;
  // showNavigateButtons?: boolean;
  highlightCurrentMonth?: boolean;
  highlightSelectedMonth?: boolean;
  isDayPickerVisible?: boolean;
  showMonthPickerAsOverlay?: boolean;
  showWeekNumbers?: boolean;
  minDate?: Date;
  maxDate?: Date;
  restrictedDates?: Date[];
  showSixWeeksByDefault?: boolean;
  workWeekDays?: DayOfWeek[];
  firstDayOfWeek?: DayOfWeek;
  darkMode?: string;
  getDate?: any;
  multilingual?: ICalendarStrings;
  userEvent?: eventExamples;
  switchMode?: boolean;
}

const dayPickerStrings: ICalendarStrings = {
  months: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  shortMonths: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  days: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
  shortDays: ["S", "M", "T", "W", "T", "F", "S"],
  goToToday: "Go to today",
  weekNumberFormatString: "Week number {0}",
  prevMonthAriaLabel: "Previous month",
  nextMonthAriaLabel: "Next month",
  prevYearAriaLabel: "Previous year",
  nextYearAriaLabel: "Next year",
  prevYearRangeAriaLabel: "Previous year range",
  nextYearRangeAriaLabel: "Next year range",
  closeButtonAriaLabel: "Close",
};
const divStyle: React.CSSProperties = {
  height: "auto",
  display: "flex",
};
// const buttonStyle: React.CSSProperties = {
//   margin: "17px 10px 0 0",
// };

const dateTimeFormatterCallbacks: ICalendarFormatDateCallbacks = {
  formatMonthDayYear: (date: Date, strings?: ICalendarStrings) =>
    strings?.months[date.getMonth()] +
    " " +
    date.getDate() +
    ", " +
    date.getFullYear(),
  formatMonthYear: (date: Date, strings?: ICalendarStrings) =>
    date.getFullYear() + " " + strings?.months[date.getMonth()],
  formatDay: (date: Date) => date.getDate().toString(),
  formatYear: (date: Date) => date.getFullYear().toString(),
};

interface rangeDateExample {
  pickType: string;
  rangeBetween: { date: Date }[];
  selectedDate: Date | string;
  selectedDateRange: Date[];
  // userEvent: Array<{ date: string; event: number }>;
  userEvent: { date: string | Date; event: number }[];
}

export interface ICalendarPropsFixed {
  onHighLight?: (day: IDayInfo, rangeDate: rangeDateExample) => string[];
  calendarData?: any;
}

class CalendarInline extends React.Component<ICalendarInlineExampleProps, any> {
  constructor(props: ICalendarInlineExampleProps) {
    super(props);
    let state = {
      selectedDate: "",
      selectedDateRange: [],
      rangeBetween: [], //range between date
      pickType: "single",
      userEvent: this.props.userEvent,
    };
    this.state = state;
  }

  onHighLightClass = (day: IDayInfo, rangeDate: rangeDateExample) => {
    let { rangeBetween, userEvent } = rangeDate;
    let classHighLightIn: string = "ms-DatePicker-day--infocus ";
    let classHighLightOut: string = "ms-DatePicker-day--outfocus ";
    if (userEvent) {
      for (let i = 0; i < userEvent.length; i++) {
        if (day.key === userEvent[i].date.toString()) {
          switch (userEvent[i].event) {
            case 1:
              classHighLightIn = `${classHighLightIn} eventType1-highLight `;
              break;

            case 2:
              classHighLightIn = `${classHighLightIn} eventType2-highLight `;
              break;

            case 3:
              classHighLightIn = `${classHighLightIn} eventType3-highLight `;
              break;

            default:
              break;
          }
        }
      }
    }

    if (rangeBetween.length > 0 && rangeBetween) {
      for (let i = 0; i < rangeBetween.length; i++) {
        if (day.key === rangeBetween[i].date.toString()) {
          classHighLightIn = `multiple-highlight ${classHighLightIn} `;
          classHighLightOut = `multiple-highlight ${classHighLightOut} `;
        }
      }
    }
    return [classHighLightIn, classHighLightOut];
  };

  onSelectDate = async (date: Date, dateRangeArray?: Date[]) => {
    let { selectedDateRange } = this.state;
    let arrDateRange = [...selectedDateRange];
    let currentVal = dateRangeArray && dateRangeArray[0];
    let firstDate = Date.parse(selectedDateRange[0]);
    let currentDate = Date.parse(dateRangeArray!.toLocaleString());
    let condition = currentDate < firstDate ? true : false;

    if (selectedDateRange.length === 0) {
      arrDateRange.push(currentVal);
      await this.setState({
        selectedDate: date,
        selectedDateRange: arrDateRange,
      });
    }
    if (selectedDateRange.length === 1 && condition) {
      arrDateRange.unshift(currentVal);
      await this.setState({
        selectedDate: date,
        selectedDateRange: arrDateRange,
      });
    }
    if (selectedDateRange.length > 0 && selectedDateRange.length < 2) {
      let arrConverted = [];
      arrDateRange.push(currentVal);
      let dateRange = this.getMoreDate(arrDateRange[0], arrDateRange[1]);
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
      };

      for (let i = 0; i < dateRange.length; i++) {
        let defaulVal = dateRange[i].date.toLocaleDateString(
          undefined,
          options
        );
        arrConverted.push(defaulVal);
      }
      await this.setState({
        selectedDate: date,
        selectedDateRange: arrDateRange,
        rangeBetween: dateRange,
      });
    }
    if (selectedDateRange.length >= 2) {
      let emptyArry = [];
      emptyArry.push(currentVal);
      await this.setState({
        selectedDate: date,
        rangeBetween: [],
        selectedDateRange: emptyArry,
      });
    }
    this.sentDate();
  };

  onSelectSingleDate = async (date: Date, dateRangeArray?: Date[]) => {
    await this.setState({
      selectedDate: date,
      selectedDateRange: dateRangeArray,
      rangeBetween: [],
    });
    this.sentDate();
  };

  // get all date between range of dates
  getMoreDate = (start: Date, end: Date) => {
    for (
      var arr = [], dt = new Date(start);
      dt <= end;
      dt.setDate(dt.getDate() + 1)
    ) {
      arr.push({ date: new Date(dt) });
    }
    return arr;
  };

  goPrevious = () => {
    const goPreviousSelectedDate = this.state.selectedDate || new Date();
    const dateRangeArray = getDateRangeArray(
      goPreviousSelectedDate,
      0,
      DayOfWeek.Sunday
    );
    let subtractFrom = dateRangeArray[0];
    let daysToSubtract = dateRangeArray.length;
    if (0 === DateRangeType.Month) {
      subtractFrom = new Date(
        subtractFrom.getFullYear(),
        subtractFrom.getMonth(),
        1
      );
      daysToSubtract = 1;
    }
    const newSelectedDate = addDays(subtractFrom, -daysToSubtract);
    return {
      goPreviousSelectedDate: newSelectedDate,
    };
  };

  goNext = () => {
    const goNextSelectedDate = this.state.selectedDate || new Date();
    const dateRangeArray = getDateRangeArray(
      goNextSelectedDate,
      0,
      DayOfWeek.Sunday
    );
    const newSelectedDate = addDays(dateRangeArray.pop()!, 1);

    return {
      goNextSelectedDate: newSelectedDate,
    };
  };

  onDismiss = (): void => {
    return this.state.selectedDate;
  };

  sentDate = () => {
    this.props.getDate(
      this.state.pickType === "multiple"
        ? this.state.rangeBetween
        : this.state.selectedDate
    );
  };

  onGetMode = async () => {
    await this.setState({
      pickType: this.state.pickType === "single" ? "multiple" : "single",
      rangeBetween: [],
    });
    this.sentDate();
  };

  render() {
    let { selectedDate, pickType } = this.state;
    return (
      <div style={divStyle}>
        <CalenderDarkMode theme={this.props}>
          {this.props.switchMode === true && (
            <ToggleWrapper theme={this.props.darkMode}>
              <Toggle label="Choose multiple days" onChange={this.onGetMode} />
            </ToggleWrapper>
          )}
          <Calendar
            onSelectDate={
              pickType === "single"
                ? this.onSelectSingleDate
                : this.onSelectDate
            }
            onDismiss={this.onDismiss}
            isMonthPickerVisible={this.props.isMonthPickerVisible}
            autoNavigateOnSelection={this.props.autoNavigateOnSelection}
            showGoToToday={this.props.showGoToToday}
            value={selectedDate}
            firstDayOfWeek={
              this.props.firstDayOfWeek
                ? this.props.firstDayOfWeek
                : DayOfWeek.Sunday
            }
            strings={this.props.multilingual || dayPickerStrings}
            highlightCurrentMonth={this.props.highlightCurrentMonth}
            highlightSelectedMonth={this.props.highlightSelectedMonth}
            isDayPickerVisible={this.props.isDayPickerVisible}
            showMonthPickerAsOverlay={this.props.showMonthPickerAsOverlay}
            showWeekNumbers={this.props.showWeekNumbers}
            minDate={this.props.minDate}
            maxDate={this.props.maxDate}
            restrictedDates={this.props.restrictedDates}
            showSixWeeksByDefault={this.props.showSixWeeksByDefault}
            workWeekDays={this.props.workWeekDays}
            dateTimeFormatter={dateTimeFormatterCallbacks}
            onHighLight={this.onHighLightClass}
            calendarData={this.state}
          />
          {/* {this.props.showNavigateButtons && (
            <div>
              <DefaultButton
                style={buttonStyle}
                onClick={this.goPrevious}
                text="Previous"
              />
              <DefaultButton
                style={buttonStyle}
                onClick={this.goNext}
                text="Next"
              />
            </div>
          )} */}
        </CalenderDarkMode>
      </div>
    );
  }
}

initializeIcons();
export default CalendarInline;
