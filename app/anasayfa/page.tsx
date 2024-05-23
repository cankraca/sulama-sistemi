import React from "react";
import HızlıSulaButton from "../components/anasayfa-components/hizli-sula";
import HavaDurumu from "../components/anasayfa-components/hava-durumu-home";
import HarcananSu from "../components/anasayfa-components/harcanan-su-home";
import SensorDurum from "../components/anasayfa-components/sensor-durum-home";
import SulamaSira from "../components/anasayfa-components/sulama-sira-home";
import NavBar from "../components/navbar";

const HomePage = () => {
  return (
    <main>
      <NavBar />
      <div className="ana-sayfa-view">
        <HavaDurumu />
        <HarcananSu />
        <SensorDurum />
        <SulamaSira />
      </div>

      <HızlıSulaButton />
    </main>
  );
};

export default HomePage;
