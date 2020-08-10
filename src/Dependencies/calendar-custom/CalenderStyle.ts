import styled from "styled-components";
import { ICalendarStrings } from "./Calendar.types";
import { IDayInfo } from "./CalendarDay";
// import { DayOfWeek } from "calendar-custom";

export enum DayOfWeek {
  Sunday = 0,
  Monday = 1,
  Tuesday = 2,
  Wednesday = 3,
  Thursday = 4,
  Friday = 5,
  Saturday = 6,
}
/**
 * The months
 * {@docCategory MonthOfYear}
 */
export enum MonthOfYear {
  January = 0,
  February = 1,
  March = 2,
  April = 3,
  May = 4,
  June = 5,
  July = 6,
  August = 7,
  September = 8,
  October = 9,
  November = 10,
  December = 11,
}
/**
 * First week of the year settings types
 * {@docCategory FirstWeekOfYear}
 */
export enum FirstWeekOfYear {
  FirstDay = 0,
  FirstFullWeek = 1,
  FirstFourDayWeek = 2,
}
/**
 * The supported date range types
 * {@docCategory DateRangeType}
 */
export enum DateRangeType {
  Day = 0,
  Week = 1,
  Month = 2,
  WorkWeek = 3,
}
export const DAYS_IN_WEEK = 7;

// <EventProps>
export interface eventExamples {
  [index: number]: { date: Date | string; event: EventValue };
}
// </EventProps>

// <EventValue>
enum EventValue {
  eventType1 = 1,
  eventType2,
  eventType3,
}
// </EventValue>

// <ExampleProps>
export interface ICalendarInlineExampleProps {
  isMonthPickerVisible?: boolean;
  autoNavigateOnSelection: boolean;
  showGoToToday: boolean;
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
  onSelectChanged?: (val: Date | { date: Date }[]) => void;
  multilingual?: ICalendarStrings;
  userEvent?: eventExamples;
  switchMode?: boolean;
}
// </ExampleProps>

export interface rangeDateExample {
  pickType: string;
  rangeBetween: { date: Date }[];
  selectedDate: Date | string;
  selectedDateRange: Date[];
  userEvent: { date: string | Date; event: number }[];
}

export interface ICalendarPropsFixed {
  onHighLight?: (day: IDayInfo, rangeDate: rangeDateExample) => string[];
  calendarData?: any;
}

// [Styled-component]

export const CalenderDarkMode = styled.div.attrs((props): any => ({
  className: "dayPicker_4cbef05b",
}))`
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.161);
  .ms-DatePicker-wrap{
    padding: ${(props) => !props.theme.showGoToToday && "0"};
    margin:0;
  }
  .ms-DatePicker-picker{
    height: auto;
    // max-height: 224px;
  }

  .goToday_4cbef05b{
    right: ${(props) => props.theme.showGoToToday && "0"};
  } 
  .ms-DatePicker-goToday{
    color:${(props) => props.theme.darkMode === "dark" && "#ffffff"};
  };
  box-sizing: border-box;
  .ms-DatePicker-dayPicker,
  .ms-DatePicker-frame,
  .ms-DatePicker-holder{
    background-color: ${(props) =>
      props.theme.darkMode === "dark" ? "rgb(27, 26, 25)" : ""};
      @media screen and (min-width: 460px){
        overflow: visible;
      }
      
  }
  .ms-DatePicker-frame, 
  .wrap_4cbef05b {
    min-height: 190px;
  }
  th,
  i {
    color: ${(props) =>
      props.theme.darkMode === "dark" ? "#ffffff" : "#212121"};
  }
  .weekday_4cbef05b {
    cursor: default;
  }
  .ms-DatePicker-day-button {
    cursor: pointer;
  }
  .ms-DatePicker-monthAndYear {
    width: 100%;
    text-align: left;
    padding: 4px 5px;
  }
  .js-showYearPicker {
    text-align: left;
  }
  .ms-DatePicker-holder {
    min-height: 210px;
    height:auto;
    padding: 12px;
  }
  .dayBackground_4cbef05b {
    border-radius: 0;
  }
  .currentYear_4cbef05b{
    padding 0 5px;
  }
  .monthAndYear_4cbef05b{
    padding:0;
  }
  .monthOption_4cbef05b:hover,
  .yearOption_4cbef05b:hover,
  .currentDecade_4cbef05b:hover,
  .currentYear_4cbef05b:hover,
  .monthAndYear_4cbef05b:hover,
  .nextMonth_4cbef05b:hover,
  .prevMonth_4cbef05b:hover,
  .prevYear_4cbef05b:hover, 
  .nextYear_4cbef05b:hover {
    border-radius: 0;
    background-color: ${(props) =>
      props.theme.darkMode === "dark" ? "#000000" : "#F4F4F4"};
    color: ${(props) =>
      props.theme.darkMode === "dark" ? "#ffffff" : "#212121"} !important;
  }
  .ms-DatePicker-day--highlighted.dayIsHighlighted_4cbef05b {
    background-color: ${(props) =>
      props.theme.darkMode === "dark" ? "#445b6c" : "#DEECF9"};
    color: ${(props) =>
      props.theme.darkMode === "dark" ? "#ffffff" : "#212121"};
    border-radius: 0;
  }
  .monthIsHighlighted_4cbef05b {
    background-color: ${(props) =>
      props.theme.darkMode === "dark" ? "#445B6C" : "#DEECF9"};
  }
  .headerToggleView_4cbef05b,
  .monthOption_4cbef05b,
  .monthAndYear_4cbef05b,
  .yearOption_4cbef05b,
  .ms-DatePicker-day--infocus,
  .headerToggleView_4cbef05b:hover {
    color: ${(props) =>
      props.theme.darkMode === "dark" ? "#ffffff" : "#212121"};
  }
  .dayWrapper_4cbef05b:hover {
    cursor: pointer;
    color: ${(props) =>
      props.theme.darkMode === "dark" ? "#ffffff" : "#212121"};
    background-color: ${(props) =>
      props.theme.darkMode === "dark" ? "#000000" : "#DEECF9"};
  }
  .multiple-highlight {
    background-color: ${(props) =>
      props.theme.darkMode === "dark" ? "#445b6c" : "#DEECF9"} !important;
    color: ${(props) =>
      props.theme.darkMode === "dark" ? "#ffffff" : "#212121"};
  }
  .eventType1-highLight{
    &:after{
      content:"";
      left:50%;
      bottom:2px;
      width:4px;
      height:4px;
      transform: translate(-50%);
      position:absolute;
      border-radius:50%;
      background-color: #05FF00;
    }
  }
  .eventType3-highLight{
    &:after{
      content:"";
      left:50%;
      bottom:2px;
      width:4px;
      height:4px;
      transform: translate(-50%);
      position:absolute;
      border-radius:50%;
      background-color: #FF0000;
    }
  }
  .eventType2-highLight{
    &:after{
      content:"";
      left:50%;
      bottom:2px;
      width:4px;
      height:4px;
      transform: translate(-50%);
      position:absolute;
      border-radius:50%;
      background-color: #FFE500;
    }
  }
  .is-checked{
    .ms-Checkbox-checkmark{
      color:white;
    }
  }
  .ms-DatePicker-day.ms-DatePicker-day--today{
    background-color: red;
  }
  .ms-DatePicker-Toggle{
    .ms-Checkbox-checkbox{
      border-color: ${(props) =>
        props.theme.darkMode === "dark" ? "#ffffff" : "#212121"};
    }
  }
`;

export const ToggleWrapper = styled.div`
  .ms-Toggle {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid;
    border-color: ${(props) =>
      props.theme === "dark" ? "#000000" : "#ECECEC"};
    padding: 15px 14px 14px 12px;
    background-color: ${(props) =>
      props.theme === "dark" ? "rgb(27, 26, 25)" : ""};
    margin-bottom: 0;
    .ms-Label {
      padding: 0;
      color: ${(props) => (props.theme === "dark" ? "#ffffff" : "#333333")};
      font-weight: normal;
    }
  }
`;
