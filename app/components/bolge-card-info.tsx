import { faCheck, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Dispatch, SetStateAction, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import Image from "next/image";
import "../styles/modal-style.css";

const BolgeCardInfo = (props: {
  bolgeId: number;
  bolgeAdi: string;
  bolgeResmi: string;
  bolgeDetailVisibility: boolean;
  setBolgeDetailVisibility: Dispatch<SetStateAction<boolean>>;
}) => {
  const [isAdDisabled, setIsAdDisabled] = useState<boolean>(true);
  return (
    <Modal
      dialogClassName="bolge-info"
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
          <Form.Group>
            <div className="bolge-ad-info">
              <Form.Label>Bölge Adı:</Form.Label>
              <Form.Control
                type="text"
                defaultValue={props.bolgeAdi}
                disabled={isAdDisabled}
              />
              <Button
                variant="primary"
                id="edit-bolge-ad-button"
                onClick={() => {
                  setIsAdDisabled(!isAdDisabled);
                }}
              >
                <FontAwesomeIcon
                  icon={isAdDisabled ? faPenToSquare : faCheck}
                ></FontAwesomeIcon>
              </Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default BolgeCardInfo;
