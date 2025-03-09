"use client";

import React from "react";
import BolgeEkleButton from "../components/bolgeler-components/bolge-ekle";
import { BolgeContextProvider } from "../context/BolgeContext";
import NavBar from "../components/navbar";
import { ProgramContextProvider } from "../context/ProgramContext";
import { VanalarContextProvider } from "../context/VanaContext";
import ListBolgeler from "./listBolgeler";

const Bolgeler = () => {
  return (
    <ProgramContextProvider>
      <BolgeContextProvider>
        <VanalarContextProvider>
          <main>
            <NavBar />
            <ListBolgeler />
            <BolgeEkleButton />
          </main>
        </VanalarContextProvider>
      </BolgeContextProvider>
    </ProgramContextProvider>
  );
};

export default Bolgeler;
