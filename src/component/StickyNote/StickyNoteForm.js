import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import Logger from "../Logger";

const StickyNoteForm = ({ addNote }) => {
  const [data, setData] = useState({
    title: "",
    message: "",
  });

  function handle(e) {
    const newData = { ...data };
    newData[e.target.id] = e.target.value;
    setData(newData);
  }

  function submit(e) {
    e.preventDefault();
    Logger.warnLog("Submitting Note Form: " + data);
    addNote(data);
    setData({ title: "", message: "" });
  }

  return (
    <div className="component">
      <div className="form">
        <Form className="card" onSubmit={(e) => submit(e)}>
          <div className="form-field">
            <Form.Control
              id="title"
              onChange={(e) => handle(e)}
              value={data.title}
              placeholder="Title"
            ></Form.Control>
          </div>
          <div className="form-field">
            <Form.Control>
              <textarea
                rows="6"
                id="message"
                onChange={(e) => handle(e)}
                value={data.message}
                placeholder="Message..."
              ></textarea>
            </Form.Control>
          </div>
          <Button type="submit">Add Note</Button>
        </Form>
      </div>
    </div>
  );
};

export default StickyNoteForm;
