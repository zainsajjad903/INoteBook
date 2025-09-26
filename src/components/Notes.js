import noteContext from "../Context/Notes/noteContext";
import { useContext, useEffect, useRef, useState } from "react";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";

const Notes = () => {
  const context = useContext(noteContext);
  let navigate = useNavigate();
  const { notes, getNotes, editNote } = context;

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNotes();
    } else {
      navigate("/login");
    }

    //eslint-disable-next-line
  }, []);

  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setnote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });
  const updateNote = (currentNote) => {
    ref.current.click();
    setnote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  const handleClick = (e) => {
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
  };
  const onChange = (e) => {
    setnote({
      ...note,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <AddNote />
      <button
        type="button"
        ref={ref}
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#editModal"
      >
        Launch modal
      </button>

      <div
        className="modal fade"
        id="editModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div
            className="modal-content shadow-lg"
            style={{ borderRadius: "15px" }}
          >
            <div
              className="modal-header text-white"
              style={{ backgroundColor: "#212845" }}
            >
              <h5 className="modal-title fw-bold">
                <i className="fa fa-pen-to-square me-2"></i> Edit Note
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="etitle" className="form-label fw-semibold">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="etitle"
                  name="etitle"
                  value={note.etitle}
                  onChange={onChange}
                  placeholder="Edit your note title"
                />
              </div>

              <div className="mb-3">
                <label
                  htmlFor="edescription"
                  className="form-label fw-semibold"
                >
                  Description
                </label>
                <textarea
                  className="form-control"
                  id="edescription"
                  name="edescription"
                  value={note.edescription}
                  onChange={onChange}
                  rows="3"
                  placeholder="Edit your note description"
                ></textarea>
              </div>

              <div className="mb-3">
                <label htmlFor="etag" className="form-label fw-semibold">
                  Tag
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="etag"
                  name="etag"
                  value={note.etag}
                  onChange={onChange}
                  placeholder="Edit tag"
                />
              </div>
            </div>

            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                <i className="fa fa-times me-1"></i> Close
              </button>
              <button
                onClick={handleClick}
                type="button"
                className="btn btn-primary"
                style={{ backgroundColor: "#D6628D", border: "none" }}
              >
                <i className="fa fa-save me-1"></i> Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container my-4">
        <h2 className="fw-bold text-dark mb-4">📒 Your Notes</h2>
        <div className="row">
          {notes.length === 0 && (
            <div className="text-muted">No Notes To Display</div>
          )}
          {notes.map((note) => {
            if (!note) return null;
            return (
              <Noteitem key={note._id} updateNote={updateNote} note={note} />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Notes;
