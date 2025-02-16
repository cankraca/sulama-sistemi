import React from "react";
import HomeCalendar from "./fullcalendar";
import { ProgramContextProvider } from "../context/ProgramContext";
import { BolgeContextProvider } from "../context/BolgeContext";
import { VanalarContextProvider } from "../context/VanaContext";

const ZamanTakvimi = () => {
  return (
    <main>
      <BolgeContextProvider>
        <ProgramContextProvider>
          <VanalarContextProvider>
            <HomeCalendar />
          </VanalarContextProvider>
        </ProgramContextProvider>
      </BolgeContextProvider>
    </main>
  );
};

export default ZamanTakvimi;
