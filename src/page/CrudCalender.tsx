import {
  Eventcalendar,
  Select,
  setOptions,
  Popup,
  Button,
  Input,
  Textarea,
  Switch,
  Checkbox,
  Radio,
  RadioGroup,
  Datepicker,
  SegmentedGroup,
  SegmentedItem,
  formatDate,
  MbscCalendarEvent,
  MbscEventcalendarView,
} from "@mobiscroll/react";
import { Pane, majorScale } from "evergreen-ui";
import React, { useState, useEffect, useMemo, useCallback } from "react";

setOptions({
  theme: "ios",
  themeVariant: "dark",
});

const defaultEvents = [
  {
    id: 1,
    start: "2022-02-08T13:00",
    end: "2022-02-08T13:30",
    title: "Lunch @ Butcher's",
    description: "",
    allDay: false,
    status: "free",
    color: "#26c57d",
  },
  {
    id: 2,
    start: "2022-02-23T15:00",
    end: "2022-02-23T16:00",
    title: "General orientation",
    description: "",
    allDay: false,
    status: "busy",
    color: "#fd966a",
  },
  {
    id: 3,
    start: "2022-02-22T18:00",
    end: "2022-02-22T22:00",
    title: "Dexter BD",
    description: "",
    allDay: false,
    status: "free",
    color: "#37bbe4",
  },
  {
    id: 4,
    start: "2022-02-24T10:30",
    end: "2022-02-24T11:30",
    title: "Stakeholder mtg.",
    description: "",
    allDay: false,
    status: "busy",
    color: "#d00f0f",
  },
];

const viewSettings: MbscEventcalendarView = {
  schedule: {
    type: "week",
  },
};
const responsivePopup = {
  medium: {
    display: "anchored",
    width: 510,
    fullScreen: false,
    touchUi: false,
  },
};

const selectResponsive = {
  xsmall: {
    touchUi: true,
  },
  small: {
    touchUi: false,
  },
};

const days = [
  {
    name: "Sun",
    value: "SU",
    checked: true,
  },
  {
    name: "Mon",
    value: "MO",
    checked: false,
  },
  {
    name: "Tue",
    value: "TU",
    checked: false,
  },
  {
    name: "Wed",
    value: "WE",
    checked: false,
  },
  {
    name: "Thu",
    value: "TH",
    checked: false,
  },
  {
    name: "Fri",
    value: "FR",
    checked: false,
  },
  {
    name: "Sat",
    value: "SA",
    checked: false,
  },
];

const months = [
  {
    value: 1,
    text: "January",
  },
  {
    value: 2,
    text: "February",
  },
  {
    value: 3,
    text: "March",
  },
  {
    value: 4,
    text: "April",
  },
  {
    value: 5,
    text: "May",
  },
  {
    value: 6,
    text: "June",
  },
  {
    value: 7,
    text: "July",
  },
  {
    value: 8,
    text: "August",
  },
  {
    value: 9,
    text: "September",
  },
  {
    value: 10,
    text: "October",
  },
  {
    value: 11,
    text: "November",
  },
  {
    value: 12,
    text: "December",
  },
];

const dayInputProps = {
  className: "custom-repeat-input custom-repeat-select-nr",
  inputStyle: "outline",
};

const monthInputProps = {
  className: "custom-repeat-input custom-repeat-select-month",
  inputStyle: "outline",
};

const dateInputProps = {
  className: "custom-repeat-input custom-specific-date",
  inputStyle: "outline",
};

export const CrudCalender: React.FC = () => {
  const [myEvents, setMyEvents] = useState<MbscCalendarEvent[]>(defaultEvents);
  const [tempEvent, setTempEvent] = useState<any>(null);
  const [isOpen, setOpen] = useState<boolean>(false);
  const [isEdit, setEdit] = useState<boolean>(false);
  const [anchor, setAnchor] = useState<any>(null);
  const [start, startRef] = useState<any>(null);
  const [end, endRef] = useState<any>(null);
  const [popupEventTitle, setTitle] = useState<string | undefined>("");
  const [popupEventDescription, setDescription] = useState<string>("");
  const [popupEventAllDay, setAllDay] = useState<boolean>(true);
  const [popupEventDate, setDate] = useState<any>([]);
  const [popupEventStatus, setStatus] = useState<string>("busy");
  const [mySelectedDate, setSelectedDate] = useState<any>();

  // recurring editor data
  const [repeatData, setRepeatData] = useState([
    {
      value: "norepeat",
      text: "Does not repeat",
    },
    {
      value: "daily",
      text: "Daily",
    },
    {
      value: "weekly",
      text: "Weekly",
    },
    {
      value: "monthly",
      text: "Monthly",
    },
    {
      value: "yearly",
      text: "Yearly",
    },
    {
      value: "weekday",
      text: "Every weekday (Monday to Friday)",
    },
    {
      value: "custom",
      text: "Custom",
    },
  ]);
  const [selectedRepeat, setSelectedRepeat] = useState<string>("norepeat");
  const [repeatType, setRepeatType] = useState<string>("daily");
  const [repeatNr, setRepeatNr] = useState<string>("1");
  const [condition, setCondition] = useState<string>("never");
  const [untilDate, setUntilDate] = useState<string>();
  const [occurrences, setOccurrences] = useState<string>("1");
  const [selectedMonth, setMonth] = useState<number>(1);
  const [monthlyDays, setMonthlyDays] = useState<number[]>([1]);
  const [monthlyDay, setMonthlyDay] = useState<number>(1);
  const [yearlyDays, setYearlyDays] = useState<number[]>([1]);
  const [yearlyDay, setYearlyDay] = useState<number>(1);
  const [weekDays, setWeekDays] = useState<any>([...days]);

  // set custom values to default
  const resetCustomValues = useCallback(() => {
    setRepeatType("daily");
    setRepeatNr("1");
    setCondition("never");
    setOccurrences("1");
    setMonth(1);
    setMonthlyDay(1);
    setYearlyDay(1);
    const newWeekDays = [...days];
    for (let i = 0; i < newWeekDays.length; i++) {
      const day = newWeekDays[i];
      day.checked = day.value === "SU";
    }
    setWeekDays(newWeekDays);
    setSelectedRepeat("norepeat");
    setRepeatData(repeatData.filter((item) => item.value !== "custom-value"));
  }, [repeatData]);

  const navigateTo = useCallback(() => {
    const rec = tempEvent.recurring;
    const d = new Date(tempEvent.start);
    let nextYear = 0;

    // navigate the calendar to the correct view
    if (rec && rec.repeat === "yearly") {
      if (d.getMonth() + 1 > +rec.month && d.getDay() > +rec.day) {
        nextYear = 1;
      }
      setSelectedDate(
        new Date(d.getFullYear() + nextYear, rec.month - 1, rec.day)
      );
    } else {
      setSelectedDate(d);
    }
  }, [tempEvent]);

  const saveEvent = useCallback(() => {
    let recurringRule: any;
    const d = new Date(tempEvent.start);

    switch (selectedRepeat) {
      case "daily":
        recurringRule = { repeat: "daily" };
        break;
      case "weekly":
        recurringRule = {
          repeat: "weekly",
          weekDays: weekDays[d.getDay()].value,
        };
        break;
      case "monthly":
        recurringRule = { repeat: "monthly", day: d.getDate() };
        break;
      case "yearly":
        recurringRule = { repeat: "yearly", month: d.getMonth() + 1 };
        break;
      case "weekday":
        recurringRule = { repeat: "weekly", weekDays: "MO,TU,WE,TH,FR" };
        break;
      case "custom":
      case "custom-value":
        recurringRule = {
          repeat: repeatType,
          interval: repeatNr,
        };

        switch (repeatType) {
          case "weekly":
            recurringRule.weekDays = weekDays
              .filter((i: { checked: any }) => i.checked)
              .map((i: { value: any }) => i.value)
              .join(",");
            break;
          case "monthly":
            recurringRule.day = monthlyDay;
            break;
          case "yearly":
            recurringRule.day = yearlyDay;
            recurringRule.month = selectedMonth;
            break;

          default:
        }

        switch (condition) {
          case "until":
            recurringRule.until = untilDate;
            break;
          case "count":
            recurringRule.count = occurrences;
            break;
          default:
        }
        break;
      default:
    }

    const newEvent = {
      id: tempEvent.id,
      title: popupEventTitle,
      description: popupEventDescription,
      start: popupEventDate[0],
      end: popupEventDate[1],
      allDay: popupEventAllDay,
      status: popupEventStatus,
      color: tempEvent.color,
      recurring: recurringRule,
    };
    if (isEdit) {
      // update the event in the list
      const index = myEvents.findIndex((x) => x.id === tempEvent.id);
      const newEventList = [...myEvents];

      newEventList.splice(index, 1, newEvent);
      setMyEvents(newEventList);
      // here you can update the event in your storage as well
      // ...
    } else {
      // add the new event to the list
      setMyEvents([...myEvents, newEvent]);
      // here you can add the event to your storage as well
      // ...
    }
    // navigate the calendar
    navigateTo();
    // close the popup
    setOpen(false);
  }, [
    isEdit,
    myEvents,
    popupEventAllDay,
    popupEventDate,
    popupEventDescription,
    popupEventStatus,
    popupEventTitle,
    tempEvent,
    navigateTo,
    condition,
    monthlyDay,
    yearlyDay,
    occurrences,
    repeatNr,
    repeatType,
    selectedMonth,
    selectedRepeat,
    untilDate,
    weekDays,
  ]);

  const deleteEvent = useCallback(
    (event) => {
      setMyEvents(myEvents.filter((item) => item.id !== event.id));
    },
    [myEvents]
  );

  const loadPopupForm = useCallback(
    (event) => {
      const startDate = new Date(event.start);
      setTitle(event.title);
      setDescription(event.description);
      setDate([startDate, event.end]);
      setUntilDate(
        formatDate(
          "YYYY-MM-DD",
          new Date(
            startDate.getFullYear(),
            startDate.getMonth(),
            startDate.getDate() + 1
          )
        )
      );
      setAllDay(event.allDay || false);
      setStatus(event.status || "busy");

      const d = new Date(event.start);
      const weekday = d.getDay();
      const monthday = d.getDate();
      const newData = repeatData.slice(0);

      // update select texts by selected date
      for (let i = 0; i < newData.length; ++i) {
        var item = newData[i];
        switch (item.value) {
          case "weekly":
            item.text = "Weekly on " + days[weekday].name;
            break;
          case "monthly":
            item.text = "Monthly on day " + monthday;
            break;
          case "yearly":
            item.text =
              "Annually on " + months[d.getMonth()].text + " " + monthday;
            break;
          default:
        }
      }

      setRepeatData(newData);

      const rec = event.recurring;

      if (rec) {
        setRepeatType(rec.repeat);
        if (rec.interval) {
          // set custom text
          let customText = "";
          const nr = rec.interval;

          setRepeatNr(nr);

          switch (rec.repeat) {
            case "daily":
              customText = nr > 1 ? "Every " + nr + " days" : "Daily";
              break;
            case "weekly":
              const newWeekDays = [...days];
              const weekD = rec.weekDays.split(",");

              for (let i = 0; i < newWeekDays.length; i++) {
                const day = newWeekDays[i];
                day.checked = weekD.includes(day.value);
              }

              setWeekDays(newWeekDays);
              customText = nr > 1 ? "Every " + nr + " weeks" : "Weekly";
              customText +=
                " on " +
                newWeekDays
                  .filter((i) => i.checked)
                  .map((i) => i.name)
                  .join(", ");
              break;
            case "monthly":
              setMonthlyDay(rec.day);
              customText = nr > 1 ? "Every " + nr + " months" : "Monthly";
              customText += " on day " + rec.day;
              break;
            case "yearly":
              setYearlyDay(rec.day);
              setMonth(rec.month);
              customText = nr > 1 ? "Every " + nr + " years" : "Annualy";
              customText += " on " + months[rec.month - 1].text + " " + rec.day;
              break;
            default:
          }

          if (rec.until) {
            setCondition("until");
            setUntilDate(rec.until);
            customText +=
              " until " + formatDate("MMMM D, YYYY", new Date(rec.until));
          } else if (rec.count) {
            setCondition("count");
            setOccurrences(rec.count);
            customText += ", " + rec.count + " times";
          } else {
            setCondition("never");
          }

          // add custom value
          setRepeatData([
            ...repeatData,
            { value: "custom-value", text: customText },
          ]);
          // set custom value
          setSelectedRepeat("custom-value");
        } else if (rec.weekDays === "MO,TU,WE,TH,FR") {
          setSelectedRepeat("weekday");
        } else {
          setSelectedRepeat(rec.repeat);
        }
      } else {
        resetCustomValues();
      }
    },
    [repeatData, resetCustomValues]
  );

  // handle popup form changes

  const titleChange = useCallback((ev) => {
    setTitle(ev.target.value);
  }, []);

  const descriptionChange = useCallback((ev) => {
    setDescription(ev.target.value);
  }, []);

  const allDayChange = useCallback((ev) => {
    setAllDay(ev.target.checked);
  }, []);

  const dateChange = useCallback((args) => {
    setDate(args.value);
  }, []);

  const statusChange = useCallback((ev) => {
    setStatus(ev.target.value);
  }, []);

  const onDeleteClick = useCallback(() => {
    deleteEvent(tempEvent);
    setOpen(false);
  }, [deleteEvent, tempEvent]);

  // popuplate data for months
  const populateMonthDays = useCallback(
    (month, type) => {
      const day30 = [2, 4, 6, 9, 11];
      let newValues: number[] = [];

      for (let i = 1; i <= 31; i++) {
        if (
          !(i === 31 && day30.includes(month)) &&
          !(i === 30 && month === 2)
        ) {
          newValues.push(i);
        }
      }

      if (type === "monthly") {
        setMonthlyDays(newValues);
        setMonthlyDay(1);
      } else {
        setYearlyDays(newValues);
        setYearlyDay(1);
      }
    },
    [setMonthlyDays, setYearlyDays]
  );

  const repeatChange = useCallback((ev) => {
    setSelectedRepeat(ev.value);
  }, []);

  const repeatTypeChange = useCallback((ev) => {
    setRepeatType(ev.target.value);
  }, []);

  const repeatNrChange = useCallback((ev) => {
    setRepeatNr(ev.target.value);
  }, []);

  const conditionChange = useCallback((ev) => {
    setCondition(ev.target.value);
  }, []);

  const untilDateChange = useCallback((ev) => {
    setUntilDate(ev.value);
  }, []);

  const occurrancesChange = useCallback((ev) => {
    setOccurrences(ev.target.value);
  }, []);

  const monthsChange = useCallback(
    (ev) => {
      setMonth(ev.value);
      populateMonthDays(ev.value, "yearly");
    },
    [populateMonthDays]
  );

  const monthlyDayChange = useCallback((ev) => {
    setMonthlyDay(ev.value);
  }, []);

  const yearlyDayChange = useCallback((ev) => {
    setYearlyDay(ev.value);
  }, []);

  const weekDayChange = useCallback(
    (ev) => {
      weekDays.find(
        (i: { value: any }) => i.value === ev.target.value
      ).checked = ev.target.checked;
      setWeekDays([...weekDays]);
    },
    [weekDays]
  );

  // scheduler options

  const onSelectedDateChange = useCallback((event) => {
    setSelectedDate(event.date);
  }, []);

  const onEventClick = useCallback(
    (args) => {
      setEdit(true);
      setTempEvent({ ...args.event });
      // fill popup form with event data
      loadPopupForm(args.event);
      setAnchor(args.domEvent.target);
      setOpen(true);
    },
    [loadPopupForm]
  );

  const onEventCreated = useCallback(
    (args) => {
      setEdit(false);
      resetCustomValues();
      setTempEvent(args.event);
      // fill popup form with event data
      loadPopupForm(args.event);
      setAnchor(args.target);
      // open the popup
      setOpen(true);
    },
    [loadPopupForm, resetCustomValues]
  );

  const onEventDeleted = useCallback(
    (args) => {
      deleteEvent(args.event);
    },
    [deleteEvent]
  );

  const onEventUpdated = useCallback((args) => {
    // here you can update the event in your storage as well, after drag & drop or resize
    // ...
  }, []);

  // datepicker options
  const controls: any = useMemo(
    () => (popupEventAllDay ? ["calendar"] : ["calendar", "time"]),
    [popupEventAllDay]
  );
  const respSetting = useMemo(
    () =>
      popupEventAllDay
        ? {
            medium: {
              controls: ["calendar"],
              touchUi: false,
            },
          }
        : {
            medium: {
              controls: ["calendar", "time"],
              touchUi: false,
            },
          },
    [popupEventAllDay]
  );

  // popup options
  const headerText = useMemo(
    () => (isEdit ? "Edit event" : "New Event"),
    [isEdit]
  );
  const popupButtons = useMemo<any>(() => {
    if (isEdit) {
      return [
        "cancel",
        {
          handler: () => {
            saveEvent();
          },
          keyCode: "enter",
          text: "Save",
          cssClass: "mbsc-popup-button-primary",
        },
      ];
    } else {
      return [
        "cancel",
        {
          handler: () => {
            saveEvent();
          },
          keyCode: "enter",
          text: "Add",
          cssClass: "mbsc-popup-button-primary",
        },
      ];
    }
  }, [isEdit, saveEvent]);

  const onPopupClose = useCallback(() => {
    setRepeatData(repeatData.filter((item) => item.value !== "custom-value"));
    if (!isEdit) {
      // refresh the list, if add popup was canceled, to remove the temporary event
      setMyEvents([...myEvents]);
    }
    setOpen(false);
  }, [isEdit, myEvents, repeatData]);

  useEffect(() => {
    populateMonthDays(1, "monthly");
    setMonthlyDay(1);
    populateMonthDays(1, "yearly");
    setYearlyDay(1);
  }, [populateMonthDays]);

  return (
    <Pane border elevation={1} marginTop={majorScale(3)} height="600px">
      <Eventcalendar
        view={viewSettings}
        data={myEvents}
        clickToCreate="double"
        dragToCreate={true}
        dragToMove={true}
        dragToResize={true}
        selectedDate={mySelectedDate}
        onSelectedDateChange={onSelectedDateChange}
        onEventClick={onEventClick}
        onEventCreated={onEventCreated}
        onEventDeleted={onEventDeleted}
        onEventUpdated={onEventUpdated}
      />
      <Popup
        display="bottom"
        fullScreen={true}
        contentPadding={false}
        scrollLock={false}
        headerText={headerText}
        anchor={anchor}
        buttons={popupButtons}
        isOpen={isOpen}
        onClose={onPopupClose}
        responsive={responsivePopup}
        height={500}
      >
        <div className="mbsc-form-group">
          <Input label="Title" value={popupEventTitle} onChange={titleChange} />
          <Textarea
            label="Description"
            value={popupEventDescription}
            onChange={descriptionChange}
          />
        </div>
        <div className="mbsc-form-group">
          <Switch
            label="All-day"
            checked={popupEventAllDay}
            onChange={allDayChange}
          />
          <Input ref={startRef} label="Starts" />
          <Input ref={endRef} label="Ends" />
          <Datepicker
            select="range"
            controls={controls}
            touchUi={true}
            startInput={start}
            endInput={end}
            showRangeLabels={false}
            responsive={respSetting}
            onChange={dateChange}
            value={popupEventDate}
          />
          <Select
            data={repeatData}
            label="Repeats"
            value={selectedRepeat}
            responsive={selectResponsive}
            onChange={repeatChange}
          />
          {(selectedRepeat === "custom" ||
            selectedRepeat === "custom-value") && (
            <div>
              <div>
                <SegmentedGroup onChange={repeatTypeChange}>
                  <SegmentedItem value="daily" checked={repeatType === "daily"}>
                    Daily
                  </SegmentedItem>
                  <SegmentedItem
                    value="weekly"
                    checked={repeatType === "weekly"}
                  >
                    Weekly
                  </SegmentedItem>
                  <SegmentedItem
                    value="monthly"
                    checked={repeatType === "monthly"}
                  >
                    Monthly
                  </SegmentedItem>
                  <SegmentedItem
                    value="yearly"
                    checked={repeatType === "yearly"}
                  >
                    Yearly
                  </SegmentedItem>
                </SegmentedGroup>

                <div className="custom-repeat-settings">
                  Repeat every
                  <Input
                    className="custom-repeat-input"
                    min="1"
                    value={repeatNr}
                    onChange={repeatNrChange}
                    inputStyle="outline"
                  />
                  {repeatType === "daily" && <span>days</span>}
                  {repeatType === "weekly" && <span>weeks</span>}
                  {repeatType === "monthly" && (
                    <span>
                      months on day
                      <Select
                        className="custom-repeat-input custom-repeat-select-month"
                        data={monthlyDays}
                        value={monthlyDay}
                        onChange={monthlyDayChange}
                        inputProps={dayInputProps}
                      />
                    </span>
                  )}
                  {repeatType === "yearly" && (
                    <span>
                      years on
                      <Select
                        className="custom-repeat-input custom-repeat-select-nr"
                        data={months}
                        value={selectedMonth}
                        onChange={monthsChange}
                        inputProps={monthInputProps}
                      />
                      <Select
                        className="custom-repeat-input custom-repeat-select-month"
                        data={yearlyDays}
                        value={yearlyDay}
                        onChange={yearlyDayChange}
                        inputProps={dayInputProps}
                      />
                    </span>
                  )}
                  {repeatType === "daily" && (
                    <p className="custom-repeat-desc">
                      The event will be repeated every day or every x days,
                      depending on the value
                    </p>
                  )}
                  {repeatType === "weekly" && (
                    <p className="custom-repeat-desc">
                      The event will be repeated every x weeks on specific
                      weekdays
                    </p>
                  )}
                  {repeatType === "monthly" && (
                    <p className="custom-repeat-desc">
                      The event will be repeated every x month on specific day
                      of the month
                    </p>
                  )}
                  {repeatType === "yearly" && (
                    <p className="custom-repeat-desc">
                      The event will be repeated every x years on specific day
                      of a specific month
                    </p>
                  )}
                  {repeatType === "weekly" && (
                    <div className="custom-repeat-checkbox-cont">
                      {days.map((day) => {
                        return (
                          <Checkbox
                            value={day.value}
                            key={day.value}
                            checked={day.checked}
                            onChange={weekDayChange}
                          >
                            {day.name}
                          </Checkbox>
                        );
                      })}
                    </div>
                  )}
                  <div>Stop condition</div>
                  <div className="custom-condition-cont">
                    <RadioGroup>
                      <Radio
                        label="Never stop"
                        description="The event will repeat indefinitely"
                        checked={condition === "never"}
                        onChange={conditionChange}
                        value="never"
                      />
                      <Radio
                        checked={condition === "until"}
                        onChange={conditionChange}
                        value="until"
                      >
                        Run until a specific date
                        <Datepicker
                          inputProps={dateInputProps}
                          controls={["calendar"]}
                          display="anchored"
                          touchUi={false}
                          dateFormat="YYYY-MM-DD"
                          returnFormat="iso8601"
                          value={untilDate}
                          onChange={untilDateChange}
                          onOpen={() => setCondition("until")}
                        />
                        <span className="mbsc-description">
                          The event will run until it reaches a specific date
                        </span>
                      </Radio>
                      <Radio
                        checked={condition === "count"}
                        onChange={conditionChange}
                        value="count"
                      >
                        Run until it reaches
                        <Input
                          className="custom-repeat-input"
                          inputStyle="outline"
                          value={occurrences}
                          onChange={occurrancesChange}
                          onClick={() => setCondition("count")}
                        />
                        occurrences
                        <span className="mbsc-description">
                          The event will repeat until it reaches a certain
                          amount of occurrences
                        </span>
                      </Radio>
                    </RadioGroup>
                  </div>
                </div>
              </div>
            </div>
          )}
          <SegmentedGroup onChange={statusChange}>
            <SegmentedItem value="busy" checked={popupEventStatus === "busy"}>
              Show as busy
            </SegmentedItem>
            <SegmentedItem value="free" checked={popupEventStatus === "free"}>
              Show as free
            </SegmentedItem>
          </SegmentedGroup>
          {isEdit && (
            <div className="mbsc-button-group">
              <Button
                className="mbsc-button-block"
                color="danger"
                variant="outline"
                onClick={onDeleteClick}
              >
                Delete event
              </Button>
            </div>
          )}
        </div>
      </Popup>
    </Pane>
  );
};
