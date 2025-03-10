"use client";
import React, { useState, useEffect } from "react";
import { Button, Col, Form, Modal, Row, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/app/styles/fab-style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faTrash,
  faPlayCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useBolgeContext } from "@/app/context/BolgeContext";

interface ActiveTimer {
  id: number;
  bolge: string;
  remainingTime: number; // in seconds
  isRunning: boolean;
}

const HızlıSulaButton = () => {
  const [formVisibility, setFormVisibility] = useState<boolean>(false);
  const [selectedBolge, setSelectedBolge] = useState<string>("");
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const [activeTimers, setActiveTimers] = useState<ActiveTimer[]>([]);
  const bolgeData = useBolgeContext();

  // Timer update effect
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTimers((prevTimers) => {
        return prevTimers
          .map((timer) => {
            if (timer.isRunning && timer.remainingTime > 0) {
              return { ...timer, remainingTime: timer.remainingTime - 1 };
            }
            return timer;
          })
          .filter((timer) => {
            // Timer sıfırlandıysa alert ver ve sil
            if (timer.remainingTime === 0) {
              alert(`${timer.bolge} bölgesinin sulama süresi doldu!`);
              return false; // listeden silinsin
            }
            return true; // kalmaya devam etsin
          });
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Helper function to format seconds into HH:MM:SS
  const formatTime = (totalSeconds: number) => {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return `${h.toString().padStart(2, "0")}:${m
      .toString()
      .padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // Handle add new timer
  const handleStartIrrigation = () => {
    if (!selectedBolge) return alert("Lütfen bir bölge seçin!");

    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    if (totalSeconds <= 0) return alert("Geçerli bir süre girin!");

    const newTimer: ActiveTimer = {
      id: Date.now(),
      bolge: selectedBolge,
      remainingTime: totalSeconds,
      isRunning: true,
    };

    setActiveTimers((prev) => [...prev, newTimer]);
    // Form reset
    setSelectedBolge("");
    setHours(0);
    setMinutes(0);
    setSeconds(0);
  };

  // Toggle pause/resume
  const toggleTimer = (id: number) => {
    setActiveTimers((prev) =>
      prev.map((timer) =>
        timer.id === id ? { ...timer, isRunning: !timer.isRunning } : timer
      )
    );
  };

  // Delete timer with confirmation
  const deleteTimer = (id: number) => {
    const confirmed = window.confirm(
      "Sulamayı iptal etmek istediğinizden emin misiniz?"
    );
    if (confirmed) {
      setActiveTimers((prev) => prev.filter((timer) => timer.id !== id));
    }
  };

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
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Hızlı Sulama</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Form Alanı */}
          <Form.Group>
            <Form.Label>Sulanmak İstenen Bölge:</Form.Label>
            <Form.Select
              value={selectedBolge}
              onChange={(e) => setSelectedBolge(e.target.value)}
            >
              <option value="">Seçiniz</option>
              {bolgeData.map((bolge) => {
                // Eğer bölge zaten aktif sulamalarda varsa disable et
                const isAlreadyActive = activeTimers.some(
                  (timer) => timer.bolge === bolge.BolgeAdi
                );
                return (
                  <option
                    key={bolge.BolgeID}
                    value={bolge.BolgeAdi}
                    disabled={isAlreadyActive}
                  >
                    {bolge.BolgeAdi}{" "}
                    {isAlreadyActive ? "(Zaten Sulanıyor)" : ""}
                  </option>
                );
              })}
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
                <Form.Control
                  type="number"
                  value={hours}
                  onChange={(e) => setHours(Number(e.target.value))}
                  min={0}
                  max={24}
                />
              </Col>
              <Col sm={3}>
                <Form.Text>Dakika</Form.Text>
                <Form.Control
                  type="number"
                  value={minutes}
                  onChange={(e) => setMinutes(Number(e.target.value))}
                  min={0}
                  max={59}
                />
              </Col>
              <Col sm={3}>
                <Form.Text>Saniye</Form.Text>
                <Form.Control
                  type="number"
                  value={seconds}
                  onChange={(e) => setSeconds(Number(e.target.value))}
                  min={0}
                  max={59}
                />
              </Col>
            </Row>
          </Form.Group>

          <div style={{ margin: "20px 0" }}>
            <Button variant="success" onClick={handleStartIrrigation}>
              Sulamaya Başla!
            </Button>
          </div>

          {/* Anlık Sulamalar Tablosu */}
          <h5>Anlık Olarak Sulanan Bölgeler</h5>
          <Table striped bordered hover size="sm" className="text-center">
            <thead>
              <tr>
                <th>#</th>
                <th>Bölge</th>
                <th>Kalan Süre</th>
                <th>İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {activeTimers.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center">
                    Şu anda aktif sulama yok.
                  </td>
                </tr>
              ) : (
                activeTimers.map((timer, index) => (
                  <tr key={timer.id}>
                    <td>{index + 1}</td>
                    <td>{timer.bolge}</td>
                    <td>{formatTime(timer.remainingTime)}</td>
                    <td>
                      <Button
                        size="sm"
                        variant={timer.isRunning ? "warning" : "info"}
                        onClick={() => toggleTimer(timer.id)}
                      >
                        <FontAwesomeIcon
                          icon={timer.isRunning ? faPause : faPlayCircle}
                        />
                      </Button>{" "}
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => deleteTimer(timer.id)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default HızlıSulaButton;
