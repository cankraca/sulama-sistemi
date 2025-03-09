"use client";

import "@/app/styles/ana-sayfa.css";
import React from "react";
import Image from "next/image";
import sprinkler from "@/public/sprinkler.png";
import { useProgramContext } from "@/app/context/ProgramContext";

const HarcananSu = () => {
  const programContext = useProgramContext();
  const toplamSure =
    programContext[0]?.ProgramIcerik.reduce(
      (sum, item) => sum + item.durationMinutes,
      0
    ) || 0;
  const toplamSuMiktarı =
    programContext[0]?.ProgramIcerik.reduce(
      (sum, item) => sum + item.waterConsumption,
      0
    ) || 0;
  return (
    <div className="harcanan-su">
      <Image
        src={sprinkler}
        alt="Su"
        width={125}
        height={100}
        style={{ pointerEvents: "none" }}
      />
      <div className="harcanan-su-bilgileri">
        <p style={{ fontSize: 20, fontWeight: "bold" }}>
          Harcanan Su Miktarı (Haftalık)
        </p>
        <p>Toplam Süre: {toplamSure} dakika</p>
        <p>Toplam Miktar: {(toplamSuMiktarı / 1000).toFixed(2)} m3</p>
      </div>
    </div>
  );
};

export default HarcananSu;
