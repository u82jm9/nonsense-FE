import axios from "axios";

const STICKY_NOTE_API_URL = "http://localhost:8088/demo/StickyNotes/";

class StickyNoteService {
  getStickyNotes() {
    console.log("Getting all Sticky Notes");
    return axios.get(STICKY_NOTE_API_URL + "GetAll");
  }

  addNewStickyNote(note) {
    console.log("Add note Service method");
    return axios.post(STICKY_NOTE_API_URL + "AddNote", {
      title: note.title,
      message: note.message,
    });
  }

  deleteStickyNote(note) {
    console.log("Delete note Service method");
    return axios.delete(
      STICKY_NOTE_API_URL + "DeleteNote/" + note.stickyNoteId
    );
  }

  deleteAllNotes() {
    console.log("Deleting all notes Service method");
    return axios.delete(STICKY_NOTE_API_URL + "DeleteAllNotes");
  }

  editStickyNote(note) {
    console.log("Edit note Service method");
    return axios.post(STICKY_NOTE_API_URL + "EditNote", {
      stickyNoteId: note.stickyNoteId,
      title: note.title,
      message: note.message,
    });
  }
}

export default new StickyNoteService();
