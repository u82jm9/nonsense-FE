import React from "react";
import { Button } from "react-bootstrap";

const StickyNoteCard = ({ note, updateNote, deleteNote }) => {
  const handleClick = async (message) => {
    try {
      let updatedMessageMap = { ...note.messageMap };
      updatedMessageMap[message] = !updatedMessageMap[message];
      const updatedNote = await {
        ...note,
        messageMap: updatedMessageMap,
      };
      console.log(updatedNote);
      updateNote(updatedNote);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="card">
      <Button
        className="delete-button"
        onClick={() => {
          deleteNote(note);
        }}
      >
        X
      </Button>
      {note.complete ? (
        <div className="note-done">
          <h1>{note.title}</h1>
        </div>
      ) : (
        <div>
          <h1>{note.title}</h1>
        </div>
      )}

      <div>
        {Object.entries(note.messageMap).map(([message, done], i) =>
          done ? (
            <div
              onClick={() => {
                handleClick(message);
              }}
              key={i}
              className="note-task note-done"
            >
              <p>{message}</p>
            </div>
          ) : (
            <div
              onClick={() => {
                handleClick(message);
              }}
              key={i}
              className="note-task"
            >
              <p>{message}</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default StickyNoteCard;
