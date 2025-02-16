import { useVanalarContext } from "@/app/context/VanaContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Button, Table } from "react-bootstrap";
import { mutate } from "swr";

const VanalarInfo = (props: { bolgeId: number }) => {
  const bolgeVanalar = useVanalarContext().filter(
    (x) => x.BolgeID == props.bolgeId
  );

  const handleDeleteVanalar = async (id: number) => {
    try {
      const response = await fetch("/api/vanalar", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          VanaID: id,
        }),
      });
      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.error("Hata: ", error);
    } finally {
      mutate("/api/vanalar");
    }
  };

  return (
    <Table striped bordered hover style={{ textAlign: "center" }}>
      <thead>
        <tr>
          <th></th>
          <th>Vana Modeli</th>
          <th>Vana Çapı</th>
          <th>Su Akış Hızı</th>
          <th>Saniye Başı Akan Su Miktarı (Lt)</th>
          <th>Vana Sil</th>
        </tr>
      </thead>
      <tbody>
        {bolgeVanalar.length > 0 ? (
          bolgeVanalar.map((x) => (
            <tr>
              <td>{x.VanaID}</td>
              <td>{x.VanaModel}</td>
              <td>{x.VanaCapi.toFixed(2)} cm</td>
              <td>{x.SuAkisHizi.toFixed(2)} m/s</td>
              <td>{x.HacimselDebi.toFixed(2)} Lt</td>
              <td>
                {
                  <Button
                    variant="danger"
                    onClick={() => {
                      if (
                        window.confirm(
                          `Şeçili vanayı silmek istediğinizden emin misiniz?`
                        )
                      ) {
                        handleDeleteVanalar(x.VanaID);
                      }
                    }}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                }
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <th colSpan={5}>Kayıtlı Vana Bulunmamaktadır</th>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default VanalarInfo;
