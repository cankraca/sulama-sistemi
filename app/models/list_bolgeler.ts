import { useEffect, useState } from "react";

interface Bolge {
    BolgeID: number;
    BolgeAdi: string;
    BolgeResmi: string;
    ResimAdi: string;
    Renk: string;
    OlusturulmaTarihi: Date;
    VanaID: number;
    ProgramID: number;
  }

  const useBolgelerData = () => {
    const [bolgeData, setBolgeData] = useState<Bolge[]>([]);
  
    useEffect(() => {
      fetch("/api/bolgeler")
        .then((response) => response.json())
        .then((json) => setBolgeData(json as Bolge[]))
        .catch((error) => console.error("Hata: ", error));
    }, []);
  
    return bolgeData;
  };

  export default useBolgelerData;