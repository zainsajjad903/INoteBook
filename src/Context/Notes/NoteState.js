import NoteContext from "./noteContext";
import { useState } from "react";
import { toast } from "react-toastify";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const [notes, setNotes] = useState([]);

  // Fetch all notes
  const getNotes = async () => {
    try {
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });

      const json = await response.json();

      if (response.ok && Array.isArray(json)) {
        setNotes(json);
      } else {
        setNotes([]);
        toast.error("Failed to fetch notes. Please log in again.");
      }
    } catch (error) {
      console.error("Error fetching notes:", error.message);
      toast.error("Something went wrong while fetching notes.");
    }
  };

  // Add a note
  const addNote = async (title, description, tag) => {
    try {
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ title, description, tag }),
      });

      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.error || "Failed to add note");
      }

      setNotes(notes.concat(json));
      toast.success("Note added successfully");
    } catch (error) {
      console.error("Error adding note:", error.message);
      toast.error("Could not add note.");
    }
  };

  // Delete a note
  const deleteNote = async (id) => {
    try {
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });

      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.error || "Failed to delete note");
      }

      setNotes(notes.filter((note) => note._id !== id));
      toast.success("Note deleted successfully");
    } catch (error) {
      console.error("Error deleting note:", error.message);
      toast.error("Could not delete note.");
    }
  };

  // Edit a note
  const editNote = async (id, title, description, tag) => {
    try {
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ title, description, tag }),
      });

      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.error || "Failed to update note");
      }

      let newNotes = JSON.parse(JSON.stringify(notes));
      for (let index = 0; index < newNotes.length; index++) {
        if (newNotes[index]._id === id) {
          newNotes[index].title = title;
          newNotes[index].description = description;
          newNotes[index].tag = tag;
          break;
        }
      }
      setNotes(newNotes);
      toast.success("Note updated successfully");
    } catch (error) {
      console.error("Error updating note:", error.message);
      toast.error("Could not update note.");
    }
  };

  return (
    <NoteContext.Provider
      value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
