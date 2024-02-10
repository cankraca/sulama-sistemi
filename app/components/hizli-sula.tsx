"use client";

import React from "react";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/fab-style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

const HızlıSulaButton = () => {
  return (
    <Button variant="primary" id="hizli-sula-button" type="button">
      <div>
        <FontAwesomeIcon icon={faPlay} />
        &nbsp; Hızlı Sulama
      </div>
    </Button>
  );
};

export default HızlıSulaButton;
