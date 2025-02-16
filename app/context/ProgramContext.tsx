"use client";
import React, { createContext, useContext, ReactNode } from "react";
import useSWR from "swr";

export interface Program {
  ProgramID: number;
  ProgramIcerik: ProgramWithRecurring[];
}

export interface ProgramWithRecurring {
  bolgeID: string;
  allDay: boolean;
  borderColor: string;
  backgroundColor: string;
  title: string;
  daysOfWeek: string[];
  startTime: string;
  endTime: string;
}

export const ProgramContext = createContext<Program[] | undefined>(undefined);

export const ProgramContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { data, error, isLoading } = useSWR("/api/program", fetcher);

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (isLoading) {
    return <div>Loading..</div>;
  }

  return (
    <ProgramContext.Provider value={data}>{children}</ProgramContext.Provider>
  );
};

export const useProgramContext = () => {
  const program = useContext(ProgramContext);
  if (!program) {
    throw new Error("ProgramContext is undefined");
  }
  return program;
};

const fetcher = async () => {
  const response = await fetch("/api/program");
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  const programData: Program[] = await response.json();
  return programData;
};
