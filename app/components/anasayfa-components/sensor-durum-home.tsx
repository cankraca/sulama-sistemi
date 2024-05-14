import React from "react";
import "@/app/styles/ana-sayfa.css";
import Image from "next/image";
import thermometer from "@/public/thermometer.png";

const SensorDurum = () => {
  return (
    <div className="sensor-durum">
      <Image
        src={thermometer}
        alt="Sensör"
        width={150}
        height={200}
        style={{ pointerEvents: "none" }}
      />
      <div className="sensor-bilgiler">
        <p>Toprak Nemi: %30</p>
        <p>Yağış Miktarı: 4mm</p>
        <p>Güneş Işığı: 12.000 lux</p>
        <p>Rüzgar Hızı: 3 m/s</p>
      </div>
    </div>
  );
};

export default SensorDurum;
