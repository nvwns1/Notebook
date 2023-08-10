import React, { useContext } from "react";
import noteContext from '../context/notes/noteContext'

export default function NoteItem(props) {
  const context = useContext(noteContext)
  const { deleteNote } = context;
  const { note } = props;
  const id = note._id
  return (
<div className="col-md-3">
    <div className="card my-3">
      <div className="card-body">
        <h5 className="card-title">{note.title}</h5>
        <p className="card-text">
          {note.description}
        </p>
        <p>Edit</p>
        <button onClick={()=>{deleteNote(note._id)}}>Delete</button>
      </div>
      
    </div>
    </div>
  );
}
