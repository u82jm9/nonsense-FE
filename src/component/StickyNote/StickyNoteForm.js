import React, { useState } from "react";
import Logger from "../Logger";
import { Box, Button, FormControl, Input, FormLabel } from "@chakra-ui/react";

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
        <Box component="form" className="card">
          <FormControl className="form-field">
            <FormLabel>Title</FormLabel>
            <Input
              type="text"
              id="title"
              defaultValue={data.title}
              placeholder="Title"
              onChange={(e) => handle(e)}
            />
          </FormControl>
          <FormControl className="form-field">
            <FormLabel>Message</FormLabel>
            <Input
              type="text"
              id="message"
              placeholder="Message..."
              onChange={(e) => handle(e)}
            />
          </FormControl>
          <Button variant="contained" onClick={(e) => submit(e)}>
            Add Note!
          </Button>
        </Box>
        {/* <Form className="card" onSubmit={(e) => submit(e)}>
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
        </Form> */}
      </div>
    </div>
  );
};

export default StickyNoteForm;
