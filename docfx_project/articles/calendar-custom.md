# The calendar-custom is calendar custom from fluent ui calendar

## Installation

**with yarn (recommand)**

> yarn add file:src/Dependencies/calendar-custom

**with npm**

> npm install --save ./src/Dependencies/calendar-custom

## Usage

[!code-javascript[ImportCS](../../src/App.tsx?name=ImportCS)]

## The calendar-custom for what?

The calendar-custom for fluent ui to add more function into fluent ui calendar

- Dark mode
  [!code-javascript[DarkMode](../../src/App.tsx?name=DarkMode)]
- Get data from parent component
  [!code-javascript[getDate](../../src/App.tsx?name=getDate)]
- Multilingual
  [!code-javascript[Multilingual](../../src/App.tsx?name=Multilingual)]

  **Language Props**
  [!code-javascript[MultilingualProps](../../src/Dependencies/calendar-custom/Calendar.types.d.ts?name=MultilingualProps)]

- Visible switch choice mode between single choice and multiple choice
  [!code-javascript[ToggleSwitchMode](../../src/App.tsx?name=ToggleSwitchMode)]
- Display event,meting,..
  [!code-javascript[Event](../../src/App.tsx?name=Event)]

  **Events Props**
  [!code-javascript[EventProps](../../src/Dependencies/calendar-custom/CalenderStyle.ts?name=EventProps)]

  **Events Value**
  [!code-javascript[EventValue](../../src/Dependencies/calendar-custom/CalenderStyle.ts?name=EventValue)]

* Custom style calendar
* Choice Multiple date

## Example:

[!code-javascript[Main](../../src/App.tsx?name=ExampleUsingCalendar)]

**Example Props**
[!code-javascript[ExampleProps](../../src/Dependencies/calendar-custom/CalenderStyle.ts?name=ExampleProps)]
