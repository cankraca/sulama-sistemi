"use client";

import React from "react";
import "@/app/styles/portal.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import Image from "next/image";
import akilliSulama from "@/public/akilli-sulama.jpg";
import { useRouter } from "next/navigation";

const PortalSayfasi = () => {
  const router = useRouter();

  return (
    <div className="background-container">
      <Image src={akilliSulama} alt="Arkaplan" className="background-img" />
      <div className="content">
        <div className="left-div">
          <p className="baslik">Hoşgeldiniz!</p>
          <Button onClick={() => router.push("/login")}>
            Sisteme Giriş Yapmak İçin Tıklayın
          </Button>
        </div>
        <div className="right-div">
          <p className="baslik">Hakkımızda</p>
          <p style={{ textAlign: "justify" }}>
            Hayvancılık Sektöründe Dijital Teknolojiler Ortak Uygulama ve
            Araştırma Merkezi (HAYTEK O.U.A.M), Burdur Mehmet Akif Ersoy
            Üniversitesi bünyesinde faaliyet gösteren bir teknoloji transfer
            ofisidir. Üniversitede yapılan araştırma ve geliştirme çalışmalarını
            destekler ve bu çalışmaların sanayiye aktarılmasını sağlar. Bölgesel
            ve ulusal düzeyde sanayi işbirliklerini teşvik ederek ortak projeler
            geliştirir. Ayrıca, eğitim programları ve teknik danışmanlık
            hizmetleri sunarak üniversitenin bilimsel araştırma kapasitesini
            artırır. HAYTEK bünyesinde geliştirilen IoT tabanlı akıllı sulama
            sisteminde de tarım veya peyzaj sulamalarını web ortamında otomatize
            ederek hem bitki yetiştiricilerin hayatlarının kolaylaştırılması hem
            de su tasarrufunda önemli bir adım atılması hedeflenmiştir.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PortalSayfasi;
