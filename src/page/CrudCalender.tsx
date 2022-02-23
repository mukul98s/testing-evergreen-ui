import React from "react";
import {
  Eventcalendar,
  snackbar,
  setOptions,
  Popup,
  Button,
  Input,
  Textarea,
  Switch,
  Datepicker,
  SegmentedGroup,
  SegmentedItem,
  MbscCalendarEvent,
  MbscEventcalendarView,
} from "@mobiscroll/react";
import { Pane, majorScale } from "evergreen-ui";

setOptions({
  theme: "ios",
  themeVariant: "dark",
});

const defaultEvents = [
  {
    id: 1,
    start: "2022-02-08T13:00",
    end: "2022-02-08T13:45",
    title: "Lunch @ Butcher's",
    description: "",
    allDay: false,
    free: true,
    color: "#009788",
  },
  {
    id: 2,
    start: "2022-02-23T15:00",
    end: "2022-02-23T16:00",
    title: "General orientation",
    description: "",
    allDay: false,
    free: false,
    color: "#ff9900",
  },
  {
    id: 3,
    start: "2022-02-22T18:00",
    end: "2022-02-22T22:00",
    title: "Dexter BD",
    description: "",
    allDay: false,
    free: true,
    color: "#3f51b5",
  },
  {
    id: 4,
    start: "2022-02-24T10:30",
    end: "2022-02-24T11:30",
    title: "Stakeholder mtg.",
    description: "",
    allDay: false,
    free: false,
    color: "#f44437",
  },
];
const viewSettings: MbscEventcalendarView = {
  schedule: { type: "week" },
};
const responsivePopup = {
  medium: {
    display: "anchored",
    width: 400,
    fullScreen: false,
    touchUi: false,
  },
};

const colorPopup = {
  medium: {
    display: "anchored",
    touchUi: false,
    buttons: [],
  },
};

const colors = [
  "#ffeb3c",
  "#ff9900",
  "#f44437",
  "#ea1e63",
  "#9c26b0",
  "#3f51b5",
  "",
  "#009788",
  "#4baf4f",
  "#7e5d4e",
];

export const CrudCalender: React.FC = () => {
  const [myEvents, setMyEvents] =
    React.useState<MbscCalendarEvent[]>(defaultEvents);
  const [tempEvent, setTempEvent] = React.useState<any>(null);
  const [isOpen, setOpen] = React.useState<boolean>(false);
  const [isEdit, setEdit] = React.useState<boolean>(false);
  const [anchor, setAnchor] = React.useState<any>(null);
  const [start, startRef] = React.useState<any>(null);
  const [end, endRef] = React.useState<any>(null);
  const [popupEventTitle, setTitle] = React.useState<string | undefined>("");
  const [popupEventDescription, setDescription] = React.useState<string>("");
  const [popupEventAllDay, setAllDay] = React.useState<boolean>(true);
  const [popupEventDate, setDate] = React.useState<any>([]);
  const [popupEventStatus, setStatus] = React.useState<string>("busy");
  const [mySelectedDate, setSelectedDate] = React.useState<any>(new Date());
  const [colorPickerOpen, setColorPickerOpen] = React.useState(false);
  const [colorAnchor, setColorAnchor] = React.useState<any>(null);
  const [selectedColor, setSelectedColor] = React.useState("");
  const [tempColor, setTempColor] = React.useState("");
  const colorPicker = React.useRef<any>();
  const colorButtons = React.useMemo<any>(
    () => [
      "cancel",
      {
        text: "Set",
        keyCode: "enter",
        handler: () => {
          setSelectedColor(tempColor);
          setColorPickerOpen(false);
        },
        cssClass: "mbsc-popup-button-primary",
      },
    ],
    [tempColor]
  );

  const saveEvent = React.useCallback<any>(() => {
    const newEvent = {
      id: tempEvent.id,
      title: popupEventTitle,
      description: popupEventDescription,
      start: popupEventDate[0],
      end: popupEventDate[1],
      allDay: popupEventAllDay,
      status: popupEventStatus,
      color: selectedColor,
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
    setSelectedDate(popupEventDate[0]);
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
    selectedColor,
  ]);

  const deleteEvent = React.useCallback(
    (event: any) => {
      const filteredEvents = myEvents.filter((item) => item.id !== event.id);
      setMyEvents(filteredEvents);
      setTimeout(() => {
        snackbar({
          button: {
            action: () => {
              setMyEvents([...filteredEvents, event]);
            },
            text: "Undo",
          },
          message: "Event deleted",
        });
      });
    },
    [myEvents]
  );

  const loadPopupForm = React.useCallback((event: MbscCalendarEvent) => {
    setTitle(event.title);
    setDescription(event.description);
    setDate([event.start, event.end]);
    setAllDay(event.allDay || false);
    setStatus(event.status || "busy");
  }, []);

  // handle popup form changes

  const titleChange = React.useCallback<any>((ev: any) => {
    setTitle(ev.target.value);
  }, []);

  const descriptionChange = React.useCallback<any>((ev: any) => {
    setDescription(ev.target.value);
  }, []);

  const allDayChange = React.useCallback<any>((ev: any) => {
    setAllDay(ev.target.checked);
  }, []);

  const dateChange = React.useCallback<any>((args: any) => {
    setDate(args.value);
  }, []);

  const statusChange = React.useCallback<any>((ev: any) => {
    setStatus(ev.target.value);
  }, []);

  const onDeleteClick = React.useCallback<any>(() => {
    deleteEvent(tempEvent);
    setOpen(false);
  }, [deleteEvent, tempEvent]);

  // scheduler options

  const onSelectedDateChange = React.useCallback<any>((event: any) => {
    setSelectedDate(event.date);
  }, []);

  const onEventClick = React.useCallback<any>(
    (args: any) => {
      setEdit(true);
      setTempEvent({ ...args.event });
      // fill popup form with event data
      loadPopupForm(args.event);
      setAnchor(args.domEvent.target);
      setOpen(true);
    },
    [loadPopupForm]
  );

  const onEventCreated = React.useCallback<any>(
    (args: any) => {
      setEdit(false);
      setTempEvent(args.event);
      // fill popup form with event data
      loadPopupForm(args.event);
      setAnchor(args.target);
      // open the popup
      setOpen(true);
    },
    [loadPopupForm]
  );

  const onEventDeleted = React.useCallback<any>(
    (args: any) => {
      deleteEvent(args.event);
    },
    [deleteEvent]
  );

  const onEventUpdated = React.useCallback<any>((args: any) => {
    // here you can update the event in your storage as well, after drag & drop or resize
    // ...
  }, []);

  // datepicker options
  const controls = React.useMemo<any>(
    () => (popupEventAllDay ? ["date"] : ["datetime"]),
    [popupEventAllDay]
  );
  const respSetting = React.useMemo<any>(
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
  const headerText = React.useMemo<string>(
    () => (isEdit ? "Edit event" : "New Event"),
    [isEdit]
  );
  const popupButtons = React.useMemo<any>(() => {
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

  const onClose = React.useCallback(() => {
    if (!isEdit) {
      // refresh the list, if add popup was canceled, to remove the temporary event
      setMyEvents([...myEvents]);
    }
    setOpen(false);
  }, [isEdit, myEvents]);

  const selectColor = React.useCallback((color) => {
    setTempColor(color);
  }, []);

  const openColorPicker = React.useCallback(
    (ev) => {
      selectColor(selectedColor || "");
      setColorAnchor(ev.currentTarget);
      setColorPickerOpen(true);
    },
    [selectColor, selectedColor]
  );

  const changeColor = React.useCallback(
    (ev) => {
      const color = ev.currentTarget.getAttribute("data-value");
      selectColor(color);
      if (!colorPicker.current.s.buttons.length) {
        setSelectedColor(color);
        setColorPickerOpen(false);
      }
    },
    [selectColor, setSelectedColor]
  );

  return (
    <Pane elevation={2} marginTop={majorScale(3)} height="600px">
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
        headerText={headerText}
        anchor={anchor}
        buttons={popupButtons}
        isOpen={isOpen}
        onClose={onClose}
        responsive={responsivePopup}
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
            value={popupEventDate[0]}
          />
          <div onClick={openColorPicker} className="event-color-c">
            <div className="event-color-label">Color</div>
            <div
              className="event-color"
              style={{ background: selectedColor }}
            ></div>
          </div>
          <SegmentedGroup onChange={statusChange}>
            <SegmentedItem value="busy" checked={popupEventStatus === "busy"}>
              Show as busy
            </SegmentedItem>
            <SegmentedItem value="free" checked={popupEventStatus === "free"}>
              Show as free
            </SegmentedItem>
          </SegmentedGroup>
          {isEdit ? (
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
          ) : null}
        </div>
      </Popup>
      <Popup
        display="bottom"
        contentPadding={false}
        showArrow={false}
        showOverlay={false}
        anchor={colorAnchor}
        isOpen={colorPickerOpen}
        buttons={colorButtons}
        responsive={colorPopup}
        ref={colorPicker}
      >
        <div className="crud-color-row">
          {colors.map((color, index) => {
            if (index < 5) {
              return (
                <div
                  key={index}
                  onClick={changeColor}
                  className={
                    "crud-color-c " + (tempColor === color ? "selected" : "")
                  }
                  data-value={color}
                >
                  <div
                    className="crud-color mbsc-icon mbsc-font-icon mbsc-icon-material-check"
                    style={{ background: color }}
                  ></div>
                </div>
              );
            } else return null;
          })}
        </div>
        <div className="crud-color-row">
          {colors.map((color, index) => {
            if (index >= 5) {
              return (
                <div
                  key={index}
                  onClick={changeColor}
                  className={
                    "crud-color-c " + (tempColor === color ? "selected" : "")
                  }
                  data-value={color}
                >
                  <div
                    className="crud-color mbsc-icon mbsc-font-icon mbsc-icon-material-check"
                    style={{ background: color }}
                  ></div>
                </div>
              );
            } else return null;
          })}
        </div>
      </Popup>
    </Pane>
  );
};
