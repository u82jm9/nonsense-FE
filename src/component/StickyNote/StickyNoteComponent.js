import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import dragonBallGif from "../../gifs/dragon_ball_form.gif";
import StickyNoteForm from "./StickyNoteForm";
import StickyNoteCard from "./StickyNoteCard";

const STICKY_NOTE_API_URL = "http://localhost:8088/demo/StickyNotes/";
function StickyNoteComponent() {
  const [stickyNotes, setStickyNotes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showGif, setShowGif] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    getStickyNotes();
  }, []);

  async function getStickyNotes() {
    console.log("Getting all Sticky Notes!");
    try {
      let r = await axios.get(STICKY_NOTE_API_URL + "GetAll");
      console.log("Got Sticky Notes!");
      console.log(r.data);
      setStickyNotes(r.data);
    } catch (err) {
      console.error(err);
    }
  }

  async function editStickyNote(note) {
    console.log("Edit note Service method");
    console.log(note);
    try {
      await axios.post(STICKY_NOTE_API_URL + "EditNote", {
        stickyNoteId: note.stickyNoteId,
        title: note.title,
        messageMap: note.messageMap,
        complete: note.complete,
      });
      getStickyNotes();
    } catch (err) {
      console.error(err);
    }
  }

  async function deleteStickyNote(note) {
    console.log("Deleting note!!");
    try {
      await axios.delete(
        STICKY_NOTE_API_URL + "DeleteNote/" + note.stickyNoteId
      );
      getStickyNotes();
    } catch (err) {
      console.error(err);
    }
  }

  async function deleteAllNotes() {
    console.log("Deleting all notes!!!");
    try {
      await axios.delete(STICKY_NOTE_API_URL + "DeleteAllNotes");
      getStickyNotes();
    } catch (err) {
      console.error(err);
    }
  }

  async function createNewNote(data) {
    setShowGif(true);
    setShowForm(false);
    console.log("Creating new note!!");
    try {
      await axios.post(STICKY_NOTE_API_URL + "AddNote", {
        noteTitle: data.title,
        noteMessage: data.message,
        noteComplete: false,
      });
      getStickyNotes();
      setTimeout(() => {
        setShowGif(false);
      }, 2250);
    } catch (err) {
      console.error(err);
    }
  }

  const showAlertMessage = (message) => {
    setShowAlert(true);
    setAlertMessage(message);
    setTimeout(() => {
      setShowAlert(false);
      setAlertMessage("");
    }, 2000);
  };

  return (
    <div className="note-component">
      <h1>Sticky Notes!</h1>

      {showGif ? (
        <img src={dragonBallGif} alt="Sweet leveling up gif!" />
      ) : (
        <div>
          <div>
            <Button
              onClick={() => {
                console.log("Show Form");
                setShowForm(true);
              }}
            >
              Create Note
            </Button>
            <Button onClick={() => deleteAllNotes()}>Delete All</Button>
          </div>
          {showAlert ? (
            <div className="alert">
              <h1>{alertMessage}</h1>
              <Button
                className="dismiss-button"
                onClick={() => setShowAlert(false)}
              >
                X
              </Button>
            </div>
          ) : null}
          {showForm ? (
            <StickyNoteForm addNote={createNewNote} />
          ) : (
            <div>
              {stickyNotes.map((note, i) => (
                <StickyNoteCard
                  deleteNote={deleteStickyNote}
                  updateNote={editStickyNote}
                  note={note}
                  key={i}
                  showAlert={showAlertMessage}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default StickyNoteComponent;
