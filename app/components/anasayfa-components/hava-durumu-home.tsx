"use client";
import "@/app/styles/ana-sayfa.css";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import earth from "@/public/earth.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faCalendarDays,
  faCloud,
  faDroplet,
} from "@fortawesome/free-solid-svg-icons";
import { useKullaniciContext } from "@/app/context/KullaniciContext";

const HavaDurumu = () => {
  const kullaniciContext = useKullaniciContext();
  const kullaniciSehir = kullaniciContext.Sehir;
  const kullaniciIlce = kullaniciContext.Ilce;

  // State'ler oluşturuluyor
  const [sıcaklık, setSıcaklık] = useState("Bilinmiyor");
  const [nem, setNem] = useState("Bilinmiyor");
  const [durum, setDurum] = useState("Bilinmiyor");

  // Hava durumu verilerini çekmek için useEffect hook'u
  useEffect(() => {
    async function fetchXMLData() {
      const url = "https://www.mgm.gov.tr/FTPDATA/analiz/SonDurumlarTumu.xml";

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const textData = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(textData, "text/xml");

        const merkezler = xmlDoc.getElementsByTagName("Merkezler");

        for (let i = 0; i < merkezler.length; i++) {
          const il = merkezler[i].getElementsByTagName("ili")[0].textContent;
          const ilce =
            merkezler[i].getElementsByTagName("ilcesi")[0].textContent;

          if (
            il === kullaniciSehir.toUpperCase() &&
            ilce === kullaniciIlce.toUpperCase()
          ) {
            setSıcaklık(
              merkezler[i].getElementsByTagName("tmp")[0].textContent ||
                "Bilinmiyor"
            );
            setNem(
              merkezler[i].getElementsByTagName("nem")[0].textContent ||
                "Bilinmiyor"
            );
            setDurum(
              merkezler[i].getElementsByTagName("Durum")[0].textContent ||
                "Bilinmiyor"
            );
            return;
          }
        }

        console.log("Hava Durumu verisi bulunamadı.");
      } catch (error) {
        console.error("Veri çekme hatası:", error);
      }
    }

    fetchXMLData();
  }, [kullaniciSehir, kullaniciIlce]); // Bu değerler değiştikçe tekrar veri çekme işlemi yapılır.

  const currentDate = new Date();
  return (
    <div className="hava-durumu">
      <Image
        src={earth}
        alt="Hava Durumu"
        width={100}
        height={100}
        style={{ pointerEvents: "none" }}
      />
      <div className="hava-durumu-bilgiler">
        <p style={{ fontWeight: "bold", fontSize: 30, color: "#ffc400" }}>
          {sıcaklık ? `${sıcaklık} °C` : "Yükleniyor..."}
        </p>
        <p>
          {<FontAwesomeIcon icon={faCalendarDays} />}{" "}
          {currentDate.toLocaleDateString("tr")}
        </p>
        <p>
          {<FontAwesomeIcon icon={faLocationDot} />}{" "}
          {`${kullaniciSehir}/${kullaniciIlce}`}
        </p>
        <p>
          {<FontAwesomeIcon icon={faDroplet} />} {nem}% (Nem)
        </p>
        <p>
          {<FontAwesomeIcon icon={faCloud} />} {durum}
        </p>
      </div>
    </div>
  );
};

export default HavaDurumu;
