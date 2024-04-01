"use client";

import React, { useEffect, useState } from "react";
import BolgeEkleButton from "../components/bolge-ekle";
import "../styles/bolgeler.css";
import BolgeCard from "../components/bolge-card";
import useBolgelerData from "../models/list_bolgeler";

const Bolgeler = () => {
  const bolgeData = useBolgelerData();
  const [cards, setCards] = useState<React.JSX.Element[]>([]);

  useEffect(() => {
    const newCards = bolgeData.map((bolge) => (
      <BolgeCard
        key={bolge.BolgeID}
        id={bolge.BolgeID}
        title={bolge.BolgeAdi}
        description={bolge.OlusturulmaTarihi}
        image={bolge.BolgeResmi}
      />
    ));
    setCards(newCards);
  }, [bolgeData]);

  return (
    <main>
      <div id="sulama-bolgeler">
        {cards.length > 0 ? cards : <p>Kayıtlı Bölge Bulunmamaktadır.</p>}
      </div>
      <BolgeEkleButton />
    </main>
  );
};

export default Bolgeler;
