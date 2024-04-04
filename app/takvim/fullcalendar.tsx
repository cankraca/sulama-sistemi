"use client";

import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import allLocales from "@fullcalendar/core/locales-all";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import React, { useState, useRef, useEffect } from "react";
import { EventImpl } from "@fullcalendar/core/internal";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "../styles/fullcalendar-style.css";
import { useBolgeContext } from "../context/BolgeContext";

interface MyEvent {
  id: string;
  title: string;
  color: string;
}

function HomeCalendar() {
  const [timeline, setTimeLine] = useState<number>(15);
  const [timelineForm, setTimelineForm] = useState<boolean>(false);
  const calendarRef = useRef<FullCalendar>(null);
  const bolgeData = useBolgeContext();

  useEffect(() => {
    const containerEl = document.querySelector("#bolgeler") as HTMLElement;

    const draggable = new Draggable(containerEl, {
      itemSelector: ".bolge",
      eventData: (eventEl) => {
        const event: MyEvent = {
          id: Math.floor(Math.random() * 1000).toString(),
          title: eventEl.innerText,
          color: window.getComputedStyle(eventEl).backgroundColor,
        };

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

  const handleUpdateCalendar = () => {
    if (calendarRef.current) {
      const getApi = calendarRef.current.getApi();
      console.log(getApi.getEvents().map((i) => i.toJSON()));
    }
  };
  return (
    <>
      <div id="bolgeler">
        <div id="bolge-baslik">
          <strong>Bölgeler</strong>
        </div>
        {bolgeData.length > 0 ? (
          <>
            {bolgeData.map((bolge) => (
              <div className="bolge" style={{ backgroundColor: bolge.Renk }}>
                {bolge.BolgeAdi}
              </div>
            ))}
          </>
        ) : (
          <p style={{ textAlign: "center", marginTop: 20 }}>
            Kayıtlı Bölge Bulunmamaktadır.
          </p>
        )}
      </div>
      <div id="takvim">
        <FullCalendar
          ref={calendarRef}
          eventContent={(eventInfo) => {
            return (
              <div className="event-wrapper">
                <div className="event-details">
                  <div>{eventInfo.timeText}</div>
                  <div>{eventInfo.event.title}</div>
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
          //events={{ events }}
          customButtons={{
            timelineButton: {
              text: "Zaman Aralığı",
              click: () => {
                setTimelineForm(!timelineForm);
              },
            },
            updateButton: {
              text: "Takvim Güncelle",
              click: () => {
                handleUpdateCalendar();
              },
            },
          }}
        />
      </div>
      <Modal
        show={timelineForm}
        onHide={() => setTimelineForm(!timelineForm)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Yeni Zaman Aralığı Belirleyin</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Değer: {timeline} dakika</Form.Label>
              <Form.Range
                defaultValue={timeline}
                min={5}
                max={30}
                onChange={(e) => setTimeLine(parseInt(e.target.value))}
              ></Form.Range>
            </Form.Group>
            <Button
              id="close-range-form"
              onClick={() => setTimelineForm(!timelineForm)}
            >
              Kapat
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default HomeCalendar;
