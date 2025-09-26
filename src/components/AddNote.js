import React from "react";
import noteContext from "../Context/Notes/noteContext";
import { useContext } from "react";
import { useState } from "react";

const AddNote = () => {
  const context = useContext(noteContext);
  const { addNote } = context;
  const [note, setnote] = useState({ title: "", description: "", tag: "" });

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setnote({ title: "", description: "", tag: "" });
  };
  const onChange = (e) => {
    setnote({
      ...note,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div
      className="d-flex justify-content-center align-items-start bg-light"
      style={{ paddingTop: "30px" }}
    >
      <div
        className="card shadow-lg text-dark"
        style={{
          width: "100%",
          maxWidth: "550px",
          borderRadius: "15px",
          backgroundColor: "#f9f9f9",
        }}
      >
        <div
          className="card-header text-white text-center fw-bold"
          style={{
            backgroundColor: "#D6628D",
            borderTopLeftRadius: "15px",
            borderTopRightRadius: "15px",
          }}
        >
          <h3 className="mb-0">
            <i className="fa fa-sticky-note me-2"></i> Add a Note
          </h3>
        </div>

        <div className="card-body">
          <form onSubmit={handleClick}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label fw-semibold">
                Enter Note Title
              </label>
              <input
                type="text"
                value={note.title}
                className="form-control form-control-lg"
                id="title"
                name="title"
                onChange={onChange}
                placeholder="Enter your note title"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="description" className="form-label fw-semibold">
                Description
              </label>
              <textarea
                value={note.description}
                className="form-control form-control-lg"
                id="description"
                name="description"
                onChange={onChange}
                placeholder="Write your note details"
                rows="3"
                required
              ></textarea>
            </div>

            <div className="mb-3">
              <label htmlFor="tag" className="form-label fw-semibold">
                Tag
              </label>
              <input
                type="text"
                value={note.tag}
                className="form-control form-control-lg"
                id="tag"
                name="tag"
                onChange={onChange}
                placeholder="Add a tag (optional)"
              />
            </div>

            <button
              type="submit"
              className="btn w-100 text-white fw-bold py-2"
              style={{ backgroundColor: "#212845", borderRadius: "10px" }}
            >
              <i className="fa fa-plus-circle me-2"></i> Add Note
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default AddNote;
