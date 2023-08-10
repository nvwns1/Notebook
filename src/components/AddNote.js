import React, {useContext, useState} from 'react';
import noteContext from "../context/notes/noteContext"

export default function AddNote() {
    const context = useContext(noteContext);
    const { addNote} = context;
    const [note, setNote] = useState({title:"", description:"", tag:"default"})

    const handleClick = (e)=>{
        e.preventDefault()
        addNote(note.title, note.description, note.tag)
    }
    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }
  return (
    <div className="container">
    <h2>Add a Note</h2>
    <form className="my-3">
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <input
          type="text"
          className="form-control"
          id="title"
          name='title'
          aria-describedby="emailHelp"
          onChange={onChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="desc" className="form-label">
          Description
        </label>
        <input
          type="desc"
          className="form-control"
          id="desc"
          name='desc'
          onChange={onChange}
        />
      </div>
      <button type="submit" className="btn btn-primary" onClick={handleClick}>
        Add Note
      </button>
    </form>
    
  </div>
  )
}