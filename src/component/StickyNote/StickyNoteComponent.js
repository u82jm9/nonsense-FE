import React from "react";
import dragonBallGif from "../../gifs/dragon_ball_form.gif";
import StickyNoteService from "../../services/StickyNoteService";
import StickyNoteForm from "./StickyNoteForm";
import { Button } from "react-bootstrap";
import StickyNoteCard from "./StickyNoteCard";

class StickyNoteComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stickyNotes: [],
      noteBeingEdited: { stickyNoteId: "", title: "", message: "" },
      showForm: false,
      updateNotes: false,
    };
    this.showAddForm = this.showAddForm.bind(this);
    this.addNewNote = this.addNewNote.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
    this.deleteAllNotes = this.deleteAllNotes.bind(this);
    this.editNote = this.editNote.bind(this);
    this.updateStickyNotes = this.updateStickyNotes.bind(this);
  }

  showAddForm() {
    this.setState({ showForm: !this.state.showForm });
    setTimeout(
      () => console.log("showAddForm method: " + this.state.showForm),
      50
    );
  }

  addNewNote(note) {
    StickyNoteService.addNewStickyNote(note);
    this.setState({ updateNotes: true });
    this.showAddForm();
  }

  deleteNote(note) {
    StickyNoteService.deleteStickyNote(note);
    this.setState({ updateNotes: true });
  }

  deleteAllNotes() {
    StickyNoteService.deleteAllNotes();
    this.setState({ updateNotes: true });
  }

  editNote(editedNote) {
    StickyNoteService.editStickyNote(editedNote);
    this.setState({ updateNotes: true });
  }

  updateStickyNotes() {
    setTimeout(() => {
      StickyNoteService.getStickyNotes().then((e) => {
        this.setState({ stickyNotes: e.data });
      });
    }, 200);
    setTimeout(() => {
      this.setState({ updateNotes: false });
    }, 2000);
  }

  componentDidMount() {
    this.updateStickyNotes();
  }

  componentDidUpdate() {
    if (this.state.updateNotes) {
      this.updateStickyNotes();
      setTimeout(() => {
        this.setState({ updateNotes: false });
      }, 2500);
    }
  }

  render() {
    return (
      <div className="component">
        {this.state.stickyNotes.length === 0 ? (
          <></>
        ) : (
          <div className="note-component">
            <h1>Sticky Notes!</h1>
            {this.state.updateNotes === true ? (
              <div className="display-gif">
                <img src={dragonBallGif} alt="Sweet leveling up gif!" />
              </div>
            ) : (
              <div className="">
                {this.state.showForm === true ? (
                  <>
                    <StickyNoteForm addNote={this.addNewNote} />
                    <Button
                      onClick={() => {
                        this.showAddForm();
                      }}
                    >
                      Hide Add Note
                    </Button>
                  </>
                ) : (
                  <Button
                    onClick={() => {
                      this.showAddForm();
                    }}
                  >
                    Add Note
                  </Button>
                )}
                <Button
                  onClick={() => {
                    this.deleteAllNotes();
                  }}
                >
                  Delete All
                </Button>
                <div>
                  {this.state.stickyNotes.map((note, i) => (
                    <StickyNoteCard
                      note={note}
                      editNote={this.editNote}
                      deleteNote={this.deleteNote}
                      key={i}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default StickyNoteComponent;
