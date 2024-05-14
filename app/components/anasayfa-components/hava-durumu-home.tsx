import "@/app/styles/ana-sayfa.css";
import React from "react";
import Image from "next/image";
import sunny from "@/public/sunny.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faClock,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";

const HavaDurumu = () => {
  const currentDate = new Date();
  return (
    <div className="hava-durumu">
      <Image
        src={sunny}
        alt="Hava Durumu"
        width={100}
        height={100}
        style={{ pointerEvents: "none" }}
      />
      <div className="hava-durumu-bilgiler">
        <p style={{ fontWeight: "bold", fontSize: 30 }}>30 °C</p>
        <p>
          {<FontAwesomeIcon icon={faClock} />}{" "}
          {currentDate.getHours().toLocaleString()} :{" "}
          {currentDate.getMinutes().toLocaleString()}
        </p>
        <p> {<FontAwesomeIcon icon={faLocationDot} />} Burdur/Merkez</p>
        <p style={{ color: "red" }}>
          {" "}
          {<FontAwesomeIcon icon={faTriangleExclamation} />} 2 Saat Sonra Yağmur
          Bekleniyor!
        </p>
      </div>
    </div>
  );
};

export default HavaDurumu;
