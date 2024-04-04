"use client";
import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";

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
  const [bolgeData, setBolgeData] = useState<Bolge[]>([]);

  useEffect(() => {
    fetch("/api/bolgeler")
      .then((response) => response.json())
      .then((json) => setBolgeData(json))
      .catch((error) => console.error("Hata: ", error));
  }, [bolgeData]);

  return (
    <BolgeContext.Provider value={bolgeData}>{children}</BolgeContext.Provider>
  );
};

export const useBolgeContext = () => {
  const bolge = useContext(BolgeContext);
  if (!bolge) {
    throw new Error("BolgeContext is undefined");
  }
  return bolge;
};
