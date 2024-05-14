import React from "react";
import "@/app/styles/ana-sayfa.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faForward,
  faBackward,
  faWifi,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const SulamaSira = () => {
  return (
    <div className="sulama-sira">
      <p>
        {<FontAwesomeIcon icon={faBackward} />} 6 Mayıs 2024 tarihinde Bölge 3
        arazisinin 15:23'te sulaması tamamlanmıştır
      </p>
      <p>
        {<FontAwesomeIcon icon={faWifi} />} Şu an sulama işlemi yapılan bölge
        bulunmamaktadır
      </p>
      <p>
        {<FontAwesomeIcon icon={faForward} />} 9 Mayıs 2024 tarihinde Bölge 1
        arazisi 10:25'te sulanmaya başlanacaktır
      </p>
      <div className="link-container">
        <Link href="/takvim" style={{ fontSize: 12, color: "white" }}>
          Programınızı görmek için tıklayınız...
        </Link>
      </div>
    </div>
  );
};

export default SulamaSira;
