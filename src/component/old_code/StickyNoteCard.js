import React, { useState } from "react";
import { Button } from "react-bootstrap";
import OutsideClickHandler from "react-outside-click-handler";

const StickyNoteCard = ({ note, editNote, deleteNote }) => {
  const [editStickyNote, setEditStickyNote] = useState({ stickyNoteId: "" });

  function handleOnChange(e) {
    const tempNote = { ...editStickyNote };
    tempNote[e.target.id] = e.target.value;
    setEditStickyNote(tempNote);
  }

  return (
    <>
      <div className="card">
        <OutsideClickHandler
          onOutsideClick={() => {
            setEditStickyNote({ stickyNoteId: "" });
          }}
        >
          <Button
            className="delete-button"
            onClick={() => {
              deleteNote(note);
            }}
          >
            X
          </Button>
          <div
            onClick={() => {
              setEditStickyNote(note);
            }}
          >
            {editStickyNote.stickyNoteId === note.stickyNoteId ? (
              <>
                <input
                  type="text"
                  id="title"
                  onChange={(e) => handleOnChange(e)}
                  value={editStickyNote.title}
                />
              </>
            ) : (
              <h1>{note.title}</h1>
            )}
            {editStickyNote.stickyNoteId === note.stickyNoteId ? (
              <textarea
                type="text"
                id="message"
                rows={6}
                onChange={(e) => handleOnChange(e)}
                value={editStickyNote.message}
                placeholder={editStickyNote.message}
              />
            ) : (
              note.message.map((m, i) => {
                m.value ? (
                  <div
                    className="strike-through"
                    onClick={() => {
                      m.value = !m.value;
                    }}
                  >
                    <p key={i}>{m.key}</p>
                  </div>
                ) : (
                  <div
                    oncClick={() => {
                      m.value = !m.value;
                    }}
                  >
                    <p key={i}>{m.key}</p>
                  </div>
                );
              })
            )}
            <br />
            {editStickyNote.stickyNoteId === note.stickyNoteId ? (
              <>
                <Button
                  onClick={() => {
                    editNote(editStickyNote);
                    setTimeout(
                      () =>
                        setEditStickyNote({
                          stickyNoteId: "",
                          title: null,
                          message: null,
                        }),
                      50
                    );
                  }}
                >
                  Edit Note
                </Button>
              </>
            ) : (
              <></>
            )}
          </div>
        </OutsideClickHandler>
      </div>
    </>
  );
};

export default StickyNoteCard;
