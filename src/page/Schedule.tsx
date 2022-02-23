import React, { useState } from "react";
import {
  Eventcalendar,
  MbscCalendarEvent,
  MbscCellClickEvent,
  MbscEventcalendarView,
  toast,
  CalendarNav,
  SegmentedGroup,
  SegmentedItem,
  CalendarPrev,
  CalendarToday,
  CalendarNext,
} from "@mobiscroll/react";
import { Heading, majorScale, Pane, Button } from "evergreen-ui";

import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import { EventDialog } from "../components/EventDialog";
import { MbscCalendarColor } from "@mobiscroll/react/dist/src/core/shared/calendar-view/calendar-view";

type ThemeVariant = "dark" | "light" | "auto" | undefined;

const Schedule: React.FC = () => {
  const [theme, setTheme] = useState("ios");
  const [themeVariant, setThemeVariant] = useState<ThemeVariant>("auto");
  const [isShown, setIsShown] = useState(false);
  const [view, setView] = React.useState("month");

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [events, setEvents] = useState<MbscCalendarEvent[]>([
    {
      start: "2022-02-01",
      allDay: true,
      title: "exercise",
      recurring: {
        repeat: "daily",
        until: "2022-02-12",
      },
      // recurring rule as an exception
      recurringExceptionRule: {
        repeat: "monthly",
        day: 15,
      },
    },
    {
      start: "08:30",
      end: "10:00",
      title: "Meeting every Monday and Friday, except every second month's 3rd",
      recurring: "FREQ=WEEKLY;UNTIL=2022-06-01;BYDAY=MO,FR",
      recurringExceptionRule: "FREQ=MONTHLY;BYMONTHDAY=3;INTERVAL=2",
    },
    {
      start: new Date(),
      title: "My First Event",
      allDay: true,
    },
    {
      start: new Date(),
      title: "My Second Event",
      end: new Date(),
    },
  ]);

  const [calView, setCalView] = React.useState<MbscEventcalendarView>({
    calendar: { labels: true },
  });

  const onCellClick = (event: MbscCellClickEvent, inst: MbscCalendarEvent) => {
    toast({
      message: "you have click on an Event",
    });
  };

  const onEventClick = React.useCallback((event) => {
    toast({
      message: event.event.title,
    });
  }, []);

  const createEvent = () => {
    let guid = 0;
    setIsShown(true);
    const newEvent = {
      id: guid++,
      start: new Date(),
      end: new Date(),
      title: "I have create this event",
    };
    setEvents([...events, newEvent]);
  };

  const invalids = [
    {
      start: "12:00",
      end: "13:00",
      title: "Lunch break",
      type: "lunch",
      recurring: {
        repeat: "daily",
      },
    },
    {
      start: "18:00",
      end: "19:00",
      title: "Dinner Break",
      type: "Dinner",
      recurring: {
        repeat: "daily",
      },
    },
    {
      start: "06:00",
      end: "07:00",
      title: "Exercise",
      type: "Exercise",
      recurring: {
        repeat: "weekly",
        weekDays: "MO,WE,FR,SA",
      },
    },
  ];

  const onEventCreateFailed = React.useCallback((event) => {
    if (event.invalid.type === "lunch") {
      toast({
        message: "Can't create this task on lunch break.",
      });
    }
  }, []);

  const onEventUpdateFailed = React.useCallback((event) => {
    if (event.invalid.type === "lunch") {
      toast({
        message: "Can't schedule this task on lunch break.",
      });
    }
  }, []);

  const colors: MbscCalendarColor[] = [
    {
      date: "2022-02-20T00:00",
      background: "#f3c3d480",
    },
    {
      start: "2022-02-21T07:00",
      end: "2022-02-21T14:00",
      background: "#fde4c880",
    },
    {
      start: "2022-02-23T12:00",
      end: "2022-02-24T20:00",
      background: "#d5f1ea80",
    },
    {
      start: "2022-02-28T06:00",
      end: "2022-02-28T08:00",
      background: "#d5eaf780",
    },
    {
      start: "2022-03-04T00:00",
      end: "2022-03-07T00:00",
      allDay: true,
      background: "#e7ffe280",
    },
    {
      start: "2022-03-10T10:00",
      end: "2022-03-11T08:00",
      background: "#fbedd080",
    },
    {
      start: "08:00",
      end: "10:00",
      background: "#ffdbdb80",
      recurring: {
        repeat: "weekly",
        weekDays: "WE",
      },
    },
  ];

  const changeView = (event: any) => {
    let calView = {};

    switch (event.target.value) {
      case "year":
        calView = {
          calendar: { type: "year" },
        };
        break;
      case "month":
        calView = {
          calendar: { labels: true },
        };
        break;
      case "week":
        calView = {
          schedule: { type: "week" },
        };
        break;
      case "day":
        calView = {
          schedule: { type: "day" },
        };
        break;
      case "agenda":
        calView = {
          calendar: { type: "week" },
          agenda: { type: "week" },
        };
        break;
    }

    setView(event.target.value);
    setCalView(calView);
  };

  const customWithNavButtons = () => {
    return (
      <React.Fragment>
        <CalendarNav className="cal-header-nav" />
        <div className="cal-header-picker">
          <SegmentedGroup value={view} onChange={changeView}>
            <SegmentedItem value="year">Year</SegmentedItem>
            <SegmentedItem value="month">Month</SegmentedItem>
            <SegmentedItem value="week">Week</SegmentedItem>
            <SegmentedItem value="day">Day</SegmentedItem>
            <SegmentedItem value="agenda">Agenda</SegmentedItem>
          </SegmentedGroup>
        </div>
        <CalendarPrev className="cal-header-prev" />
        <CalendarToday className="cal-header-today" />
        <CalendarNext className="cal-header-next" />
      </React.Fragment>
    );
  };

  return (
    <>
      <EventDialog isShown={isShown} setIsShown={setIsShown} />
      <Pane border marginY={majorScale(2)} height="600px">
        <Eventcalendar
          renderHeader={customWithNavButtons}
          data={events}
          actionableEvents
          clickToCreate
          view={calView}
          theme={theme}
          themeVariant={themeVariant}
          dragToMove
          dragToCreate
          onCellClick={onCellClick}
          onClickEvent={onEventClick}
          invalid={invalids}
          onEventCreateFailed={onEventCreateFailed}
          onEventUpdateFailed={onEventUpdateFailed}
          colors={colors}
          cssClass="md-switching-view-cont"
        />
      </Pane>
      <Pane
        border
        elevation={2}
        margin={majorScale(2)}
        padding={majorScale(2)}
        display="flex"
        flexDirection="column"
        gap={majorScale(3)}
      >
        <Heading>Select Calender Theme</Heading>
        <Pane display="flex" gap={majorScale(2)}>
          <Button
            appearance="primary"
            intent="danger"
            onClick={() => setTheme("ios")}
          >
            iOS
          </Button>
          <Button
            appearance="primary"
            intent="danger"
            onClick={() => setTheme("windows")}
          >
            Windows
          </Button>
          <Button
            appearance="primary"
            intent="danger"
            onClick={() => setTheme("material")}
          >
            Material
          </Button>
        </Pane>

        <Heading>Select Color Theme </Heading>
        <Pane display="flex" gap={majorScale(2)}>
          <Button
            appearance="primary"
            intent="danger"
            onClick={() => setThemeVariant("dark")}
          >
            Dark
          </Button>
          <Button
            appearance="primary"
            intent="danger"
            onClick={() => setThemeVariant("light")}
          >
            Light
          </Button>
        </Pane>

        <Heading>CRUD Functions</Heading>
        <Pane display="flex" gap={majorScale(2)}>
          <Button appearance="primary" intent="danger" onClick={createEvent}>
            Create Event
          </Button>
          <Button appearance="primary" intent="danger"></Button>
          <Button appearance="primary" intent="danger"></Button>
          <Button appearance="primary" intent="danger"></Button>
        </Pane>
      </Pane>
    </>
  );
};

export default Schedule;
