"use client";

import React from "react";
import BolgeEkleButton from "../components/bolgeler-components/bolge-ekle";
import "../styles/bolgeler.css";
import BolgeCard from "../components/bolgeler-components/bolge-card";
import { useBolgeContext } from "../context/BolgeContext";
import NavBar from "../components/navbar";

const Bolgeler = () => {
  const bolgeData = useBolgeContext();

  return (
    <main>
      <NavBar />
      <div id="sulama-bolgeler">
        {bolgeData.length > 0 ? (
          bolgeData.map((bolge) => (
            <BolgeCard
              key={bolge.BolgeID}
              id={bolge.BolgeID}
              title={bolge.BolgeAdi}
              description={bolge.OlusturulmaTarihi}
              image={bolge.BolgeResmi}
            />
          ))
        ) : (
          <p>Kayıtlı Bölge Bulunmamaktadır.</p>
        )}
      </div>
      <BolgeEkleButton />
    </main>
  );
};

export default Bolgeler;
