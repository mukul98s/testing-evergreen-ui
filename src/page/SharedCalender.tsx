import React from "react";
import {
  Eventcalendar,
  getJson,
  toast,
  Button,
  setOptions,
  MbscCalendarEvent,
  MbscCalendarEventData,
} from "@mobiscroll/react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";

setOptions({
  theme: "ios",
  themeVariant: "dark",
});

export const SharedCalender = () => {
  const [myEvents, setEvents] = React.useState<MbscCalendarEvent[]>([]);

  React.useEffect(() => {
    getJson(
      "https://trial.mobiscroll.com/multi-events/",
      (events: MbscCalendarEvent[]) => {
        setEvents(events);
      },
      "jsonp"
    );
  }, []);

  const resp = {
    xsmall: {
      view: {
        schedule: {
          type: "day",
        },
      },
    },
    medium: {
      view: {
        schedule: {
          type: "day",
        },
      },
    },
  };

  const getCategory = (id: number) => {
    switch (id) {
      case 1:
        return {
          name: "Project X",
          color: "#ff825d",
        };
      case 2:
        return {
          name: "Stakeholder Mtg.",
          color: "#bd75d0",
        };
      case 3:
        return {
          name: "Status Update",
          color: "#7f9230",
        };
      case 4:
        return {
          name: "Information Sharing",
          color: "#f14590",
        };
      case 5:
        return {
          name: "Team Building",
          color: "#64cad4",
        };
      default:
        return {
          name: "",
          color: "",
        };
    }
  };

  const getParticipant = (id: number) => {
    switch (id) {
      case 1:
        return {
          name: "Lisa",
          img: "https://img.mobiscroll.com/demos/f1.png",
        };
      case 2:
        return {
          name: "Sharon",
          img: "https://img.mobiscroll.com/demos/f2.png",
        };
      case 3:
        return {
          name: "Emily",
          img: "https://img.mobiscroll.com/demos/f3.png",
        };
      case 4:
        return {
          name: "Rose",
          img: "https://img.mobiscroll.com/demos/f4.png",
        };
      case 5:
        return {
          name: "Matt",
          img: "https://img.mobiscroll.com/demos/m1.png",
        };
      case 6:
        return {
          name: "Rick",
          img: "https://img.mobiscroll.com/demos/m2.png",
        };
      case 7:
        return {
          name: "John",
          img: "https://img.mobiscroll.com/demos/m3.png",
        };
      case 8:
        return {
          name: "Ethan",
          img: "https://img.mobiscroll.com/demos/m4.png",
        };
      default:
        return {
          name: "",
          img: "",
        };
    }
  };

  const edit = () => {
    toast({ message: "Edit clicked" });
  };

  const renderScheduleEvent = React.useCallback<
    (data: MbscCalendarEventData) => any
  >((data: MbscCalendarEventData) => {
    console.log(data);
    const original = data.original!;
    const cat = getCategory(original.category);

    return data.allDay ? (
      <div
        style={{ background: cat.color }}
        className="md-custom-event-allday-title"
      >
        {data.title}
      </div>
    ) : (
      <div
        className="md-custom-event-cont"
        style={{
          borderLeft: "5px solid " + cat.color,
          background: cat.color,
        }}
      >
        <div className="md-custom-event-wrapper">
          <div
            style={{ background: cat.color }}
            className="md-custom-event-category"
          >
            {cat.name}
          </div>
          <div className="md-custom-event-details">
            <div className="md-custom-event-title">{data.title}</div>
            <div className="md-custom-event-time">
              {data.start} - {data.end}
            </div>
            <Button
              className="md-custom-event-btn"
              color="dark"
              variant="outline"
              onClick={edit}
            >
              Edit
            </Button>
            <div className="md-cutom-event-img-cont">
              {original.participants.map(function (p: any) {
                return (
                  <img
                    key={p}
                    className="md-custom-event-img"
                    src={getParticipant(p).img}
                    alt="Participant"
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }, []);

  return (
    <div className="md-switching-view-cont">
      <div className="md-switching-view-cal-cont">
        <Eventcalendar
          renderScheduleEvent={renderScheduleEvent}
          responsive={resp}
          data={myEvents}
        />
      </div>
    </div>
  );
};
