import Link from "next/link";
import React from "react";
import Image from "next/image";
import "../styles/navbar-style.css";
import logo from "../../public/haytek-logo.png";

const NavBar = () => {
  return (
    <nav>
      <Link href="/">
        <Image src={logo} alt="Logo"></Image>
      </Link>
      <Link href="/">Anasayfa</Link>
      <Link href="/takvim">Sulama Programı</Link>
      <Link href="/bolgeler">Bölgeler</Link>
    </nav>
  );
};

export default NavBar;
