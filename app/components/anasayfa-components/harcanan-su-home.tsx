import "@/app/styles/ana-sayfa.css";
import React from "react";
import Image from "next/image";
import sprinkler from "@/public/sprinkler.png";

const HarcananSu = () => {
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
        <p>Toplam süre: 560 dakika</p>
        <p>Toplam Miktar: 5 m3</p>
      </div>
    </div>
  );
};

export default HarcananSu;
