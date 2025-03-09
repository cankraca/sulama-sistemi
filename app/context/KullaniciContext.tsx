"use client";
import React, { createContext, useContext, ReactNode } from "react";
import useSWR from "swr";
export interface Kullanici {
  KullaniciID: number;
  Email: string;
  KullaniciAdi: string;
  Sehir: string;
  Ilce: string;
}

export const KullaniciContext = createContext<Kullanici | undefined>(undefined);

export const KullaniciContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { data, error, isLoading } = useSWR("/api/kullanici", fetcher);

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (isLoading) {
    return <div>Loading..</div>;
  }
  return (
    <KullaniciContext.Provider value={data}>
      {children}
    </KullaniciContext.Provider>
  );
};

export const useKullaniciContext = () => {
  const kullanici = useContext(KullaniciContext);
  if (!kullanici) {
    throw new Error("KullaniciContext is undefined");
  }
  return kullanici;
};

const fetcher = async () => {
  const response = await fetch("/api/kullanici");
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  const kullaniciData: Kullanici = await response.json();
  return kullaniciData;
};
