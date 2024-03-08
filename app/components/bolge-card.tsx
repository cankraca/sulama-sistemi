import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import "../styles/bolgeler.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faTrash } from "@fortawesome/free-solid-svg-icons";

const BolgeCard = (props: {
  id: number;
  image: File;
  title: string;
  description: Date;
}) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageUrl(reader.result as string);
    };

    reader.readAsDataURL(props.image);
  }, [props.image]);

  const handleDeleteArea = async () => {
    try {
      const response = await fetch("/api/bolgeler", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ BolgeID: props.id }),
      });
      const responseData = await response.json();

      console.log(responseData);
    } catch (error) {
      console.error("Hata: ", error);
    }
  };
  return (
    <Card
      onClick={() => {}}
      className="yeni-bolge-card"
      style={{
        width: 250,
        marginLeft: 35,
        marginBottom: 30,
        cursor: "pointer",
      }}
    >
      <Card.Header>
        {imageUrl && (
          <Card.Img
            variant="top"
            src={imageUrl}
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
        <Button variant="link">
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
  );
};

export default BolgeCard;
