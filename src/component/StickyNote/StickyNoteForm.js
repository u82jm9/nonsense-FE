import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

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
    console.log(data);
    addNote(data);
    setData({ title: "", message: "" });
  }

  return (
    <div className="component">
      <Form className="card form" onSubmit={(e) => submit(e)}>
        <div className="form-field">
          <Form.Group>
            <textarea
              rows="1"
              id="title"
              onChange={(e) => handle(e)}
              value={data.title}
              placeholder="Title"
            ></textarea>
          </Form.Group>
        </div>
        <div className="form-field">
          <Form.Group>
            <textarea
              rows="6"
              id="message"
              onChange={(e) => handle(e)}
              value={data.message}
              placeholder="Message..."
            ></textarea>
          </Form.Group>
        </div>
        <Button type="submit">Add Note</Button>
      </Form>
    </div>
  );
};

export default StickyNoteForm;
