import React from "react";
import HomeCalendar from "./fullcalendar";
import { ProgramContextProvider } from "../context/ProgramContext";
import { BolgeContextProvider } from "../context/BolgeContext";

const ZamanTakvimi = () => {
  return (
    <main>
      <BolgeContextProvider>
        <ProgramContextProvider>
          <HomeCalendar />
        </ProgramContextProvider>
      </BolgeContextProvider>
    </main>
  );
};

export default ZamanTakvimi;
