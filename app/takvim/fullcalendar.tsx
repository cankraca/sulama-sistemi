"use client";

import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import allLocales from "@fullcalendar/core/locales-all";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import React, { useState, useRef, useEffect } from "react";
import { EventImpl } from "@fullcalendar/core/internal";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "../styles/fullcalendar-style.css";
import { useBolgeContext } from "../context/BolgeContext";
import {
  ProgramWithRecurring,
  useProgramContext,
} from "../context/ProgramContext";
import { mutate } from "swr";
import TimeLine from "../components/program-components/timeline";
import NavBar from "../components/navbar";
import { useVanalarContext } from "../context/VanaContext";

interface MyEvent {
  bolgeID: string;
  title: string;
  color: string;
}

function HomeCalendar() {
  const [timeline, setTimeLine] = useState<number>(15);
  const [timelineForm, setTimelineForm] = useState<boolean>(false);
  const calendarRef = useRef<FullCalendar>(null);
  const initialEvents = useProgramContext();
  const bolgeData = useBolgeContext();
  const vanalar = useVanalarContext();

  useEffect(() => {
    const containerEl = document.querySelector("#bolgeler") as HTMLElement;

    const draggable = new Draggable(containerEl, {
      itemSelector: ".bolge",
      eventData: (eventEl) => {
        const event: MyEvent = {
          bolgeID: eventEl.id,
          title: eventEl.innerText,
          color: window.getComputedStyle(eventEl).backgroundColor,
        };

        console.log(event);
        return event;
      },
    });

    return () => {
      draggable.destroy();
    };
  }, []);

  const handleEventRemove = (info: EventImpl) => {
    info.remove();
  };

  const formatEvents = () => {
    if (calendarRef.current) {
      const myProgram: ProgramWithRecurring[] = [];
      const takvimListesi = calendarRef.current.getApi().getEvents();
      takvimListesi.map((x) =>
        myProgram.push({
          allDay: false,
          backgroundColor: x.backgroundColor,
          borderColor: x.borderColor,
          daysOfWeek: [x.start?.getDay().toString() ?? ""],
          endTime: x.endStr.split("T")[1],
          startTime: x.startStr.split("T")[1],
          title: x.title,
          bolgeID: x.extendedProps.bolgeID,
        })
      );
      return myProgram;
    }
    return [];
  };

  const handleUpdateCalendar = async () => {
    try {
      const response = await fetch("/api/program", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ProgramIcerik: formatEvents(),
        }),
      });

      const deleteResponse = await fetch("/api/program", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ProgramID: initialEvents.map((x) => x.ProgramID)[0],
        }),
      });
      const responseData = await response.json();
      const deleteResponseData = await deleteResponse.json();

      console.log(responseData);
      console.log(deleteResponseData);
    } catch (error) {
      console.error("Hata: ", error);
    } finally {
      alert("Sulama Programınız Güncellenmiştir!");
      mutate("/api/program");
    }
  };
  return (
    <>
      <NavBar />
      <div id="bolgeler">
        <div id="bolge-baslik">
          <strong>Bölgeler</strong>
        </div>
        {bolgeData.length > 0 ? (
          <>
            {bolgeData.map((bolge) => (
              <div
                id={bolge.BolgeID.toString()}
                className="bolge"
                style={{ backgroundColor: bolge.Renk }}
              >
                {bolge.BolgeAdi}
              </div>
            ))}
          </>
        ) : (
          <p style={{ textAlign: "center", marginTop: 20, color: "black" }}>
            Kayıtlı Bölge Bulunmamaktadır.
          </p>
        )}
      </div>
      <div id="takvim">
        <FullCalendar
          events={initialEvents.map((x) => x.ProgramIcerik)[0]}
          ref={calendarRef}
          eventContent={(eventInfo) => {
            const start = eventInfo.event.start;
            const end = eventInfo.event.end;
            const durationSeconds =
              start && end
                ? Math.floor((end.getTime() - start.getTime()) / 1000)
                : 0;
            const harcananSuLt = vanalar
              .filter((x) => x.BolgeID == eventInfo.event.extendedProps.bolgeID)
              .reduce((acc, i) => acc + i.HacimselDebi * durationSeconds, 1);

            return (
              <div className="event-wrapper">
                <div className="event-details">
                  <div>{eventInfo.timeText}</div>
                  <div>{eventInfo.event.title}</div>
                  <div>{harcananSuLt.toFixed(2)} Litre Su Harcanır</div>
                </div>

                <div>
                  <Button
                    size="sm"
                    variant="link"
                    onClick={() => {
                      if (
                        window.confirm(
                          `Şeçili bölgeyi silmek istediğinizden emin misiniz?`
                        )
                      ) {
                        handleEventRemove(eventInfo.event);
                      }
                    }}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                </div>
              </div>
            );
          }}
          // defaultTimedEventDuration={"00:45"}
          headerToolbar={{
            start: "title",
            end: "updateButton timelineButton",
          }}
          windowResizeDelay={100}
          handleWindowResize={true}
          plugins={[timeGridPlugin, interactionPlugin]}
          slotLabelFormat={{
            hour: "2-digit",
            minute: "2-digit",
          }}
          slotDuration={`00:${String("0" + timeline).slice(-2)}:00 `}
          editable={true}
          droppable={true}
          allDaySlot={false}
          // height={1000}
          forceEventDuration={true}
          dayHeaderFormat={{
            weekday: "long",
          }}
          locales={allLocales}
          locale={"tr"}
          //select={() => {}}
          customButtons={{
            timelineButton: {
              text: "Zaman Aralığı",
              click: () => {
                setTimelineForm(!timelineForm);
              },
            },
            updateButton: {
              text: "Sulama Programını Kaydet",
              click: () => {
                handleUpdateCalendar();
              },
            },
          }}
        />
      </div>
      <TimeLine
        timelineForm={timelineForm}
        setTimelineForm={setTimelineForm}
        timeline={timeline}
        setTimeLine={setTimeLine}
      />
    </>
  );
}

export default HomeCalendar;
