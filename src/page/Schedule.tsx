import React, { useMemo, useState } from "react";
import {
  Eventcalendar,
  MbscCalendarEvent,
  MbscCellClickEvent,
  MbscCellHoverEvent,
  MbscEventcalendarView,
} from "@mobiscroll/react";
import { Heading, majorScale, Pane, Button } from "evergreen-ui";

import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import { EventDialog } from "../components/EventDialog";

type ThemeVariant = "dark" | "light" | "auto" | undefined;

const Schedule: React.FC = () => {
  const [theme, setTheme] = useState("ios");
  const [themeVariant, setThemeVariant] = useState<ThemeVariant>("auto");
  const [isShown, setIsShown] = useState(false);
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
      recurring: "FREQ=WEEKLY;UNTIL=2021-06-01;BYDAY=MO,FR",
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
    },
  ]);

  const view = useMemo<MbscEventcalendarView>(() => {
    return {
      calendar: { type: "month", labels: true },
      agenda: { type: "day" },
    };
  }, []);

  const onCellClick = (event: MbscCellClickEvent, inst: MbscCalendarEvent) => {
    console.log(inst);
  };

  const onCellHoverIn = (
    event: MbscCellHoverEvent,
    inst: MbscCalendarEvent
  ) => {};

  const onCellHoverOut = (
    event: MbscCellHoverEvent,
    inst: MbscCalendarEvent
  ) => {};

  const createEvent = () => {
    setIsShown(true);
  };

  return (
    <>
      <Pane border marginY={majorScale(2)}>
        <Eventcalendar
          data={events}
          actionableEvents
          clickToCreate
          view={view}
          theme={theme}
          themeVariant={themeVariant}
          dragToMove
          dragToCreate
          onCellClick={onCellClick}
          onCellHoverIn={onCellHoverIn}
          onCellHoverOut={onCellHoverOut}
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
          <EventDialog isShown={isShown} setIsShown={setIsShown} />
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
