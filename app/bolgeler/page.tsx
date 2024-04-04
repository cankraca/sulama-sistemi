"use client";

import React, { useEffect, useState } from "react";
import BolgeEkleButton from "../components/bolge-ekle";
import "../styles/bolgeler.css";
import BolgeCard from "../components/bolge-card";
import useBolgelerData from "../models/list_bolgeler";
import { useBolgeContext } from "../context/BolgeContext";

const Bolgeler = () => {
  const bolgeData = useBolgeContext();

  return (
    <main>
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
