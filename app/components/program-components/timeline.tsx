import React, { Dispatch, SetStateAction } from "react";
import { Button, Form, Modal } from "react-bootstrap";

const TimeLine = (props: {
  timelineForm: boolean;
  timeline: number;
  setTimeLine: Dispatch<SetStateAction<number>>;
  setTimelineForm: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <Modal
      show={props.timelineForm}
      onHide={() => props.setTimelineForm(!props.timelineForm)}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Yeni Zaman Aralığı Belirleyin</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Değer: {props.timeline} dakika</Form.Label>
            <Form.Range
              defaultValue={props.timeline}
              min={5}
              max={30}
              onChange={(e) => props.setTimeLine(parseInt(e.target.value))}
            ></Form.Range>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => props.setTimelineForm(!props.timelineForm)}>
          Kapat
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TimeLine;
