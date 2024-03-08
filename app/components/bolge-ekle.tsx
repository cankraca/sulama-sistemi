"use client";

import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/fab-style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const BolgeEkleButton = () => {
  const [formVisibility, setFormVisibility] = useState<boolean>(false);

  const handleAddNewRegion = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    try {
      const sulamaBolgeIsim = (
        document.getElementById("sulamaBolgeAdi") as HTMLInputElement
      ).value;
      const yeniBolgeRenk = document.getElementById(
        "bolgeRenk"
      ) as HTMLInputElement;
      const sulamaBolgeResimInput = document.getElementById(
        "sulamaBolgeResim"
      ) as HTMLInputElement;

      if (sulamaBolgeResimInput && sulamaBolgeResimInput.files) {
        const sulamaBolgeResim = sulamaBolgeResimInput.files[0];

        const response = await fetch("/api/bolgeler", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            BolgeAdi: sulamaBolgeIsim,
            BolgeResmi: new Blob([sulamaBolgeResim], {
              type: sulamaBolgeResim.type,
            }),
            ResimAdi: sulamaBolgeResim.name,
            Renk: yeniBolgeRenk.value,
          }),
        });
        const responseData = await response.json();
        console.log(responseData);
        if (response.ok) {
          console.log(responseData.message);
        } else {
          console.log("Hata: ", responseData.error);
        }
      }
    } catch (error) {
      console.log("Hata: ", error);
    } finally {
      setFormVisibility(false);
    }
  };
  return (
    <>
      <Button
        variant="primary"
        id="bolge-ekle-button"
        type="button"
        onClick={() => setFormVisibility(!formVisibility)}
      >
        <div>
          <FontAwesomeIcon icon={faPlus} />
          &nbsp; Bölge Ekle
        </div>
      </Button>
      <Modal
        onHide={() => setFormVisibility(!formVisibility)}
        show={formVisibility}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Yeni Bölge Ekle</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddNewRegion}>
            <Form.Group>
              <Form.Label>Bölge Adı:</Form.Label>
              <Form.Control
                id="sulamaBolgeAdi"
                type="text"
                placeholder="Bölge adını giriniz"
                required
              ></Form.Control>
            </Form.Group>
            <div style={{ marginBottom: "20px" }}></div>
            <Form.Group>
              <Form.Label>Bölge Resmi:</Form.Label>
              <Form.Control
                id="sulamaBolgeResim"
                type="file"
                accept=".png, .jpeg, .jpg"
              ></Form.Control>
            </Form.Group>
            <div style={{ marginBottom: "20px" }}></div>
            <Form.Group>
              <Form.Label>Bölge'nin Program Üzerindeki Rengi:</Form.Label>
              <Form.Control type="color" id="bolgeRenk"></Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit" id="add-region-button">
              Ekle
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default BolgeEkleButton;
