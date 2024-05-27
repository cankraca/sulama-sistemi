import React from "react";
import { useBolgeContext } from "../context/BolgeContext";
import BolgeCard from "../components/bolgeler-components/bolge-card";
import "../styles/bolgeler.css";

const ListBolgeler = () => {
  const bolgeData = useBolgeContext();

  return (
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
        <p style={{ color: "black" }}>Kayıtlı Bölge Bulunmamaktadır.</p>
      )}
    </div>
  );
};

export default ListBolgeler;
