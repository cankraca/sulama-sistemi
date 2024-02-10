import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import "../styles/bolgeler.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faTrash } from "@fortawesome/free-solid-svg-icons";

const BolgeCard = (props: { image: File; title: string }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  useEffect(() => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageUrl(reader.result as string);
    };
    reader.readAsDataURL(props.image);
  }, [props.image]);
  return (
    <Card
      onClick={() => {}}
      className="yeni-bolge-card"
      style={{
        width: 250,
        marginLeft: 20,
        marginBottom: 20,
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
        <Card.Text>Oluşturulma Tarihi, açıklama vs.</Card.Text>
      </Card.Body>
      <Card.Footer className="card-footer">
        <Button variant="link">
          <FontAwesomeIcon icon={faCircleInfo} />
        </Button>
        <Button variant="link">
          <FontAwesomeIcon icon={faTrash} />
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default BolgeCard;
