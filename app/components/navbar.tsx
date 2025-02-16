"use client";

import Link from "next/link";
import React from "react";
import Image from "next/image";
import "../styles/navbar-style.css";
import logo from "../../public/haytek-logo.png";
import { Button } from "react-bootstrap";
import logOutAction from "../helpers/logoutAction";
import { useRouter, usePathname } from "next/navigation";
const NavBar = () => {
  const router = useRouter();
  const pathName = usePathname();
  return (
    <nav>
      <Link href="/anasayfa">
        <Image src={logo} alt="Logo" style={{ pointerEvents: "none" }} />
      </Link>
      <Link
        href="/anasayfa"
        className={pathName === "/anasayfa" ? "active-link" : ""}
      >
        Anasayfa
      </Link>
      <Link
        href="/takvim"
        className={pathName === "/takvim" ? "active-link" : ""}
      >
        Sulama Programı
      </Link>
      <Link
        href="/bolgeler"
        className={pathName === "/bolgeler" ? "active-link" : ""}
      >
        Bölgeler
      </Link>
      <div className="cikis-yap-button">
        <Button
          onClick={() => {
            logOutAction();
            router.refresh();
          }}
        >
          Çıkış Yap
        </Button>
      </div>
    </nav>
  );
};

export default NavBar;
