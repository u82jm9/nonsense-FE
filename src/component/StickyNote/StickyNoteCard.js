import React, { useState } from "react";
import { Button } from "react-bootstrap";
import OutsideClickHandler from "react-outside-click-handler";

const StickyNoteCard = ({ note, updateNote, deleteNote }) => {
  const [editing, setEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(note.title);
  const [editedMessages, setEditedMessages] = useState(
    Object.keys(note.messageMap)
  );
  const [newMessage, setNewMessage] = useState("");
  const [rotate, setRotate] = useState(false);

  const handleDoubleClick = () => {
    setEditing(true);
    setRotate(!rotate);
  };
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

  const handleEditTitle = (e) => {
    setEditedTitle(e.target.value);
  };

  const handleEditMessage = (e, index) => {
    const newEditedMessages = [...editedMessages];
    newEditedMessages[index] = e.target.value;
    setEditedMessages(newEditedMessages);
  };

  const handleAddMessage = () => {
    setEditedMessages([...editedMessages, newMessage]);
    setNewMessage("");
  };

  const handleSave = async () => {
    try {
      const messageMap = {};
      editedMessages.forEach((message) => {
        messageMap[message] = note.messageMap[message] || false;
      });
      const updatedNote = {
        ...note,
        title: editedTitle,
        messageMap,
      };
      console.log(updatedNote);
      updateNote(updatedNote);
      setEditing(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      className={`card ${rotate ? "rotate" : ""}`}
      onDoubleClick={() => {
        setEditing(true);
        setRotate(true);
        setTimeout(() => {
          setRotate(false);
        }, 1000);
      }}
    >
      <OutsideClickHandler
        onOutsideClick={() => {
          if (editing) {
            setRotate(true);
            setTimeout(() => {
              setRotate(false);
            }, 1000);
          }
          setEditing(false);
        }}
      >
        <div>
          {editing ? (
            <div className="note-edit">
              <input
                type="text"
                value={editedTitle}
                onChange={handleEditTitle}
              />
              {editedMessages.map((message, index) => (
                <input
                  type="text"
                  key={index}
                  value={message}
                  onChange={(e) => handleEditMessage(e, index)}
                />
              ))}
              <Button onClick={handleAddMessage}>Add Task</Button>
              <Button onClick={handleSave}>Save</Button>
            </div>
          ) : (
            <div>
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
          )}
        </div>
      </OutsideClickHandler>
    </div>
  );
};

export default StickyNoteCard;
