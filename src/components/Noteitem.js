import noteContext from "../Context/Notes/noteContext";
import { useContext } from "react";
const Noteitem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note, updateNote } = props;
  return (
    <>
      <div className="col-md-4 my-3">
        <div
          className="card shadow-lg border-0"
          style={{ borderRadius: "15px", backgroundColor: "#fdfdfd" }}
        >
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="card-title fw-bold text-primary mb-0">
                <i className="fa fa-sticky-note me-2 text-warning"></i>
                {note.title}
              </h5>
              <div>
                <i
                  className="fa-solid fa-pen-to-square mx-2 text-success"
                  style={{ cursor: "pointer", fontSize: "1.2rem" }}
                  onClick={() => {
                    updateNote(note);
                  }}
                ></i>
                <i
                  className="fa-solid fa-trash mx-2 text-danger"
                  style={{ cursor: "pointer", fontSize: "1.2rem" }}
                  onClick={() => {
                    deleteNote(note._id);
                  }}
                ></i>
              </div>
            </div>

            <p className="card-text mt-3 text-muted">{note.description}</p>

            {note.tag && (
              <span
                className="badge rounded-pill text-white px-3 py-2"
                style={{ backgroundColor: "#212845" }}
              >
                #{note.tag}
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default Noteitem;
