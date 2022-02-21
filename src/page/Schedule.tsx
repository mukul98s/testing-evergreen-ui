import React, { useMemo, useState } from "react";
import {
  Eventcalendar,
  MbscCalendarEvent,
  MbscEventcalendarView,
} from "@mobiscroll/react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import { majorScale, Pane } from "evergreen-ui";

const Schedule: React.FC = () => {
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

  return (
    <Pane border marginY={majorScale(2)}>
      <Eventcalendar
        data={events}
        actionableEvents
        clickToCreate
        view={view}
        theme="ios"
        dragToMove
        dragToCreate
      />
    </Pane>
  );
};

export default Schedule;
