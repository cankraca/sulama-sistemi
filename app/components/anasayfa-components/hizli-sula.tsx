"use client";
import React, { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/app/styles/fab-style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { useBolgeContext } from "@/app/context/BolgeContext";

const HızlıSulaButton = () => {
  const [formVisibility, setFormVisibility] = useState<boolean>(false);
  const bolgeData = useBolgeContext();

  return (
    <>
      <Button
        variant="primary"
        id="hizli-sula-button"
        type="button"
        onClick={() => setFormVisibility(!formVisibility)}
      >
        <div>
          <FontAwesomeIcon icon={faPlay} />
          &nbsp; Hızlı Sulama
        </div>
      </Button>
      <Modal
        onHide={() => setFormVisibility(!formVisibility)}
        show={formVisibility}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Hızlı Sulama</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Sulanmak İstenen Bölge:</Form.Label>
            <Form.Select>
              {bolgeData.map((bolge) => (
                <option key={bolge.BolgeID}>{bolge.BolgeAdi}</option>
              ))}
            </Form.Select>
          </Form.Group>

          <div style={{ marginBottom: "20px" }}></div>
          <Form.Group>
            <Row>
              <Form.Label column sm={2}>
                Süre:
              </Form.Label>
              <Col sm={3}>
                <Form.Text>Saat</Form.Text>
                <Form.Control type="number" defaultValue={0} min={0} max={24} />
              </Col>

              <Col sm={3}>
                <Form.Text>Dakika</Form.Text>
                <Form.Control type="number" min={0} defaultValue={0} max={60} />
              </Col>
              <Col sm={3}>
                <Form.Text>Saniye</Form.Text>
                <Form.Control type="number" min={0} defaultValue={0} max={60} />
              </Col>
            </Row>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success">Sulamaya Başla!</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default HızlıSulaButton;
