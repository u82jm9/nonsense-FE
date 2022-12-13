import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import dragonBallGif from "../../gifs/dragon_ball_form.gif";
import StickyNoteForm from "./StickyNoteForm";
import StickyNoteCard from "./StickyNoteCard";

const STICKY_NOTE_API_URL = "http://localhost:8088/demo/StickyNotes/";
function StickyNoteComponent() {
  const [stickyNotes, setStickyNotes] = useState([]);
  const [noteBeingedited, setNoteBeingEdited] = useState({
    stickyNoteId: "",
    title: "",
    message: "",
  });
  const [showForm, setShowForm] = useState(false);
  const [showGif, setShowGif] = useState(true);

  useEffect(() => {
    getStickyNotes();
    const timer = setTimeout(() => {
      setShowGif(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  async function getStickyNotes() {
    console.log("Getting all Sticky Notes!");
    try {
      let r = await axios.get(STICKY_NOTE_API_URL + "GetAll");
      console.log(r.data);
      setStickyNotes(r.data);
    } catch (err) {
      console.error(err);
    }
  }

  function addNewStickyNote(note) {
    console.log("Adding New Note.");
    return axios.post(STICKY_NOTE_API_URL + "AddNote", {
      title: note.title,
      message: note.message,
    });
  }

  function deleteStickyNote(note) {
    console.log("Deleting note!!");
    return axios.delete(
      STICKY_NOTE_API_URL + "DeleteNote/" + note.stickyNoteId
    );
  }

  function deleteAllNotes() {
    console.log("Deleting all notes!!!");
    return axios.delete(STICKY_NOTE_API_URL + "DeleteAllNotes");
  }

  function editStickyNote(note) {
    console.log("Edit note Service method");
    return axios.post(STICKY_NOTE_API_URL + "EditNote", {
      stickyNoteId: note.stickyNoteId,
      title: note.title,
      message: note.message,
    });
  }

  return (
    <div className="note-component">
      <h1>Sticky Notes!</h1>
      {showGif === true ? (
        <div className="display-gif">
          <img src={dragonBallGif} alt="Sweet leveling up gif!" />
        </div>
      ) : (
        <div>
          {showForm === true ? (
            <>
              <StickyNoteForm addNote={addNewStickyNote} />
              <Button
                onClick={() => {
                  setShowForm = false;
                }}
              >
                Hide Add Note
              </Button>
            </>
          ) : (
            <Button
              onClick={() => {
                setShowForm = true;
              }}
            >
              Add Note
            </Button>
          )}
          <Button
            onClick={() => {
              deleteAllNotes();
            }}
          >
            Delete All
          </Button>
          <div>
            {stickyNotes.map((note, i) => (
              <StickyNoteCard
                note={note}
                editNote={editStickyNote}
                deleteNote={deleteStickyNote}
                key={i}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default StickyNoteComponent;
