import {
  faCheck,
  faPenToSquare,
  faFloppyDisk,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Dispatch, SetStateAction, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import Image from "next/image";
import "@/app/styles/modal-style.css";
import VanalarInfo from "./vanalar-info";
import { mutate } from "swr";

const BolgeCardInfo = (props: {
  bolgeId: number;
  bolgeAdi: string;
  bolgeResmi: string;
  bolgeDetailVisibility: boolean;
  setBolgeDetailVisibility: Dispatch<SetStateAction<boolean>>;
}) => {
  const [isAdDisabled, setIsAdDisabled] = useState<boolean>(true);

  const updateBolgeAdi = async () => {
    try {
      const bolgeAdiText = document.getElementById(
        "bolgeAdiText"
      ) as HTMLInputElement;

      const response = await fetch("/api/bolgeler", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          BolgeAdi: bolgeAdiText.value,
          BolgeID: props.bolgeId,
        }),
      });

      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.error("Hata: ", error);
    } finally {
      mutate("/api/bolgeler");
      alert("Bölge adı güncellendi!");
    }
  };

  const handeAddVana = async () => {
    try {
      const vanaModel = document.getElementById(
        "vanaModel"
      ) as HTMLInputElement;
      const vanaCap = document.getElementById("vanaCap") as HTMLInputElement;

      const response = await fetch("/api/vanalar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          VanaModel: vanaModel.value,
          VanaCapi: vanaCap.value,
          BolgeID: props.bolgeId,
        }),
      });

      const responseData = await response.json();
      console.log(responseData);

      vanaModel.value = "";
      vanaCap.value = "";
    } catch (error) {
      console.error("Hata: ", error);
    } finally {
      mutate("/api/vanalar");
      setIsAdDisabled(true);
    }
  };

  return (
    <>
      <Modal
        size="xl"
        show={props.bolgeDetailVisibility}
        onHide={() => {
          props.setBolgeDetailVisibility(!props.bolgeDetailVisibility);
          setIsAdDisabled(true);
        }}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{props.bolgeAdi}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="bolge-resim-info">
              <Image
                src={"http://localhost:3000/" + props.bolgeResmi}
                alt="Resim bulunamadı"
                width={250}
                height={250}
                style={{ pointerEvents: "none" }}
              />
            </Form.Group>
            <div style={{ marginBottom: "50px" }}></div>
            <Row>
              <Col>
                <Form.Label>Bölge Adı:</Form.Label>
              </Col>
              <Col sm="8">
                <Form.Control
                  id="bolgeAdiText"
                  type="text"
                  defaultValue={props.bolgeAdi}
                  disabled={isAdDisabled}
                />
              </Col>
              <Col>
                <Button
                  variant="primary"
                  onClick={() => {
                    setIsAdDisabled(!isAdDisabled);
                  }}
                >
                  <FontAwesomeIcon
                    icon={isAdDisabled ? faPenToSquare : faCheck}
                  ></FontAwesomeIcon>
                </Button>
              </Col>
              <Col>
                <Button variant="dark" onClick={() => updateBolgeAdi()}>
                  <FontAwesomeIcon icon={faFloppyDisk} />
                </Button>
              </Col>
            </Row>
            <div style={{ marginBottom: "20px" }}></div>
            <Form.Group>
              <Form.Label>Vanalar: </Form.Label>
              <VanalarInfo bolgeId={props.bolgeId} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Form>
            <Row>
              <Col>
                <Form.Label>Vana Modeli:</Form.Label>
              </Col>
              <Col>
                <Form.Control id="vanaModel" type="text" required />
              </Col>
              <Col>
                <Form.Label>Vana Çapı (cm):</Form.Label>
              </Col>
              <Col>
                <Form.Control
                  id="vanaCap"
                  type="number"
                  min={0}
                  max={20}
                  step={0.1}
                  required
                />
              </Col>
              <Col>
                <Button variant="success" onClick={() => handeAddVana()}>
                  Yeni Vana Ekle
                </Button>
              </Col>
            </Row>
          </Form>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default BolgeCardInfo;
