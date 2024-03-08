"use client";

import React, { useEffect, useState } from "react";
import BolgeEkleButton from "../components/bolge-ekle";
import "../styles/bolgeler.css";
import BolgeCard from "../components/bolge-card";
import useBolgelerData from "../models/list_bolgeler";

const Bolgeler = () => {
  const bolgeData = useBolgelerData();

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
              image={
                new File([bolge.BolgeResmi], bolge.ResimAdi, {
                  type: bolge.BolgeResmi.type,
                })
              }
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
