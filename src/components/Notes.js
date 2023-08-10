import {React, useContext} from 'react';
import noteContext from "../context/notes/noteContext";
import NoteItem from './NoteItem';
import AddNote from './AddNote';


export default function Notes(props) {
  const context = useContext(noteContext);
  const {notes, addNote} = context
  return (
    <>
    <AddNote />
    <div className='row my-3'>
        <h1>Your Note</h1>
    {notes.map((note)=>{
      return <NoteItem note={note}/>;
    })}</div>
    </>
  )
}
