import Link from "next/link";
import React from "react";
import Image from "next/image";
import "../styles/navbar-style.css";
import logo from "../../public/haytek-logo.png";
import { Button } from "react-bootstrap";

const NavBar = () => {
  return (
    <nav>
      <Link href="/">
        <Image src={logo} alt="Logo" style={{ pointerEvents: "none" }} />
      </Link>
      <Link href="/">Anasayfa</Link>
      <Link href="/takvim">Sulama Programı</Link>
      <Link href="/bolgeler">Bölgeler</Link>
      <div className="cikis-yap-button">
        <Button>Çıkış Yap</Button>
      </div>
    </nav>
  );
};

export default NavBar;
