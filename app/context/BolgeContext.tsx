"use client";
import React, { createContext, useContext, ReactNode } from "react";
import useSWR from "swr";
interface Bolge {
  BolgeID: number;
  BolgeAdi: string;
  BolgeResmi: string;
  ResimAdi: string;
  Renk: string;
  OlusturulmaTarihi: Date;
  VanaID: number;
  ProgramID: number;
}

export const BolgeContext = createContext<Bolge[] | undefined>(undefined);

export const BolgeContextProvider = ({ children }: { children: ReactNode }) => {
  const { data, error, isLoading } = useSWR("/api/bolgeler", fetcher);

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (isLoading) {
    return <div>Loading..</div>;
  }
  return <BolgeContext.Provider value={data}>{children}</BolgeContext.Provider>;
};

export const useBolgeContext = () => {
  const bolge = useContext(BolgeContext);
  if (!bolge) {
    throw new Error("BolgeContext is undefined");
  }
  return bolge;
};

const fetcher = async () => {
  const response = await fetch("/api/bolgeler");
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  const bolgeData: Bolge[] = await response.json();
  return bolgeData;
};
