"use client";
import React, { createContext, useContext, ReactNode } from "react";
import useSWR from "swr";
export interface Vana {
  VanaID: number;
  VanaModel: string;
  VanaCapi: number;
  SuAkisHizi: number;
  HacimselDebi: number;
  BolgeID: number;
}

export const VanalarContext = createContext<Vana[] | undefined>(undefined);

export const VanalarContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { data, error, isLoading } = useSWR("/api/vanalar", fetcher);

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (isLoading) {
    return <div>Loading..</div>;
  }
  return (
    <VanalarContext.Provider value={data}>{children}</VanalarContext.Provider>
  );
};

export const useVanalarContext = () => {
  const vana = useContext(VanalarContext);
  if (!vana) {
    throw new Error("VanalarContext is undefined");
  }
  return vana;
};

const fetcher = async () => {
  const response = await fetch("/api/vanalar");
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  const vanaData: Vana[] = await response.json();
  return vanaData;
};
