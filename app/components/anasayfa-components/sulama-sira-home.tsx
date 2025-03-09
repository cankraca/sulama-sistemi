"use client";

import React, { useState, useEffect } from "react";
import "@/app/styles/ana-sayfa.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faForward,
  faBackward,
  faWifi,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useProgramContext } from "@/app/context/ProgramContext";
import { ProgramWithRecurring } from "@/app/context/ProgramContext";

const SulamaSira = () => {
  const weekDays = [
    "Pazartesi",
    "Salı",
    "Çarşamba",
    "Perşembe",
    "Cuma",
    "Cumartesi",
    "Pazar",
  ];

  const programContext = useProgramContext();

  // Safely access the program data, ensure it is initialized
  const program: ProgramWithRecurring[] =
    programContext[0]?.ProgramIcerik || [];

  const [previousEvent, setPreviousEvent] =
    useState<ProgramWithRecurring | null>(null);
  const [currentEvent, setCurrentEvent] = useState<ProgramWithRecurring | null>(
    null
  );
  const [nextEvent, setNextEvent] = useState<ProgramWithRecurring | null>(null);

  const now = new Date();
  const currentDay = now.getDay().toString(); // Current day (0 = Sunday, 1 = Monday, ...)
  const currentMinutes = now.getHours() * 60 + now.getMinutes(); // Current time in minutes

  // Filter today's events only if program is defined
  const todayEvents = program
    .filter((event) => event.daysOfWeek.includes(currentDay))
    .map((event) => {
      const [startHour, startMinute] = event.startTime.split(":").map(Number);
      const [endHour, endMinute] = event.endTime.split(":").map(Number);
      return {
        ...event,
        startMinutes: startHour * 60 + startMinute, // Convert start time to total minutes
        endMinutes: endHour * 60 + endMinute, // Convert end time to total minutes
      };
    });

  const getCurrentEvent = () => {
    const current = todayEvents.find((event) => {
      const { startMinutes, endMinutes } = event;
      return currentMinutes >= startMinutes && currentMinutes <= endMinutes; // Ensure current event is today
    });
    setCurrentEvent(current || null);
  };

  const getPreviousEvent = () => {
    const pastEvents = program.filter((event) => {
      const eventDay = Math.max(...event.daysOfWeek.map(Number));
      const [endHour, endMinute] = event.endTime.split(":").map(Number);
      const endMinutes = endHour * 60 + endMinute;

      return (
        eventDay < Number(currentDay) || // Events from any past day before today
        (eventDay === Number(currentDay) && endMinutes < currentMinutes) // Events that ended earlier today
      );
    });

    pastEvents.sort((a, b) => b.endTime.localeCompare(a.endTime)); // Get latest past event
    const prev = pastEvents.length > 0 ? pastEvents[0] : null;
    setPreviousEvent(prev);
  };

  const getNextEvent = () => {
    const futureEvents = program.filter((event) => {
      const [startHour, startMinute] = event.startTime.split(":").map(Number);
      const startMinutes = startHour * 60 + startMinute;

      return (
        (event.daysOfWeek.includes(currentDay) &&
          startMinutes > currentMinutes) || // Events starting later today
        event.daysOfWeek.some((day) => Number(day) > Number(currentDay))
      ); // Any event from future days
    });

    futureEvents.sort((a, b) => a.startTime.localeCompare(b.startTime)); // Get earliest future event
    const next = futureEvents.length > 0 ? futureEvents[0] : null;
    setNextEvent(next);
  };

  useEffect(() => {
    if (program.length > 0) {
      getCurrentEvent();
      getPreviousEvent();
      getNextEvent();
    }
  }, [program]);

  return (
    <div className="sulama-sira">
      {previousEvent ? (
        <p>
          <FontAwesomeIcon icon={faBackward} />{" "}
          {weekDays[parseInt(previousEvent.daysOfWeek[0]) - 1]} günü{" "}
          {previousEvent.title} bölgesinin {previousEvent.endTime.split("+")[0]}{" "}
          saatinde sulaması tamamlanmıştır.
        </p>
      ) : (
        <p>
          <FontAwesomeIcon icon={faBackward} /> Önceki sulama bilgisi
          bulunmamaktadır.
        </p>
      )}

      {currentEvent ? (
        <p>
          <FontAwesomeIcon icon={faWifi} /> Şu an sulama işlemi yapılan bölge:{" "}
          {currentEvent.title} ({currentEvent.startTime.split("+")[0]} -{" "}
          {currentEvent.endTime.split("+")[0]})
        </p>
      ) : (
        <p>
          <FontAwesomeIcon icon={faWifi} /> Şu an sulama işlemi yapılan bölge
          bulunmamaktadır.
        </p>
      )}

      {nextEvent ? (
        <p>
          <FontAwesomeIcon icon={faForward} />{" "}
          {weekDays[parseInt(nextEvent.daysOfWeek[0]) - 1]} günü{" "}
          {nextEvent.title} bölgesi {nextEvent.startTime.split("+")[0]} saatinde
          sulanmaya başlanacaktır.
        </p>
      ) : (
        <p>
          <FontAwesomeIcon icon={faForward} /> Gelecek sulama bilgisi
          bulunmamaktadır.
        </p>
      )}
      <div className="link-container">
        <Link href="/takvim" style={{ fontSize: 12, color: "white" }}>
          Programınızı görmek için tıklayınız...
        </Link>
      </div>
    </div>
  );
};

export default SulamaSira;
