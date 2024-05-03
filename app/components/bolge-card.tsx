import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "../styles/bolgeler.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faTrash } from "@fortawesome/free-solid-svg-icons";
import BolgeCardInfo from "./bolge-card-info";
import { mutate } from "swr";

const BolgeCard = (props: {
  id: number;
  image: string;
  title: string;
  description: Date;
}) => {
  const [bolgeDetailVisibility, setBolgeDetailVisibility] =
    useState<boolean>(false);

  const handleDeleteArea = async () => {
    try {
      const imgResponse = await fetch("/api/upload", {
        method: "DELETE",
        body: JSON.stringify({ fileName: props.image }),
      });

      const response = await fetch("/api/bolgeler", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ BolgeID: props.id }),
      });

      const imgResData = imgResponse.json();
      const responseData = await response.json();

      console.log(imgResData);
      console.log(responseData);
    } catch (error) {
      console.error("Hata: ", error);
    } finally {
      mutate("/api/bolgeler");
    }
  };
  return (
    <>
      <Card
        className="yeni-bolge-card"
        style={{
          width: 250,
          marginLeft: 35,
          marginBottom: 30,
          cursor: "pointer",
        }}
      >
        <Card.Header>
          {props.image && (
            <Card.Img
              variant="top"
              src={props.image}
              style={{ height: 150, pointerEvents: "none" }}
            />
          )}
        </Card.Header>

        <Card.Body>
          <Card.Title>{props.title}</Card.Title>
          <Card.Text>
            {new Date(props.description).toLocaleString()} tarihinde oluşturuldu
          </Card.Text>
        </Card.Body>
        <Card.Footer className="card-footer">
          <Button
            variant="link"
            onClick={() => setBolgeDetailVisibility(!bolgeDetailVisibility)}
          >
            <FontAwesomeIcon icon={faCircleInfo} />
          </Button>
          <Button
            variant="link"
            onClick={() => {
              if (
                window.confirm(
                  `Şeçili bölgeyi silmek istediğinizden emin misiniz?`
                )
              ) {
                handleDeleteArea();
              }
            }}
          >
            <FontAwesomeIcon icon={faTrash} />
          </Button>
        </Card.Footer>
      </Card>
      <BolgeCardInfo
        bolgeId={props.id}
        bolgeResmi={props.image}
        bolgeAdi={props.title}
        bolgeDetailVisibility={bolgeDetailVisibility}
        setBolgeDetailVisibility={setBolgeDetailVisibility}
      />
    </>
  );
};

export default BolgeCard;
