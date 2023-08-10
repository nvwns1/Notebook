import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props)=>{
    const initialNotes = [
        {
          "_id": "64d1d573a52950ea9a44308c",
          "user": "64d0e2d2d070060395539812",
          "title": "this is titl2e",
          "description": "this is description2",
          "tag": "personal",
          "timeStamp": "2023-08-08T05:41:07.088Z",
          "__v": 0
        },
        {
          "_id": "64d1d95347a09c8fe9f450af",
          "user": "64d0e2d2d070060395539812",
          "title": "this is titl2e",
          "description": "this is description2",
          "tag": "personal",
          "timeStamp": "2023-08-08T05:57:39.326Z",
          "__v": 0
        },
        {
          "_id": "64d1db5347a09c8fe9f450b2",
          "user": "64d0e2d2d070060395539812",
          "title": "this is titl2e",
          "description": "this is description2",
          "tag": "personal",
          "timeStamp": "2023-08-08T06:06:11.091Z",
          "__v": 0
        },
        {
          "_id": "64d1d95347a09c8fe9f450af",
          "user": "64d0e2d2d070060395539812",
          "title": "this is titl2e",
          "description": "this is description2",
          "tag": "personal",
          "timeStamp": "2023-08-08T05:57:39.326Z",
          "__v": 0
        },
        {
          "_id": "64d1db5347a09c8fe9f450b2",
          "user": "64d0e2d2d070060395539812",
          "title": "this is titl2e",
          "description": "this is description2",
          "tag": "personal",
          "timeStamp": "2023-08-08T06:06:11.091Z",
          "__v": 0
        }
      ]
      const [notes, setNotes] = useState(initialNotes)

      //add a note
      const addNote = (title, description, tag)=>{

        //todo api call
      const  note = {
          "_id": "64d1db5347a09c8fe9f450b2",
          "user": "64d0e2d2d070060395539812",
          "title":title,
          "description": description,
          "tag": tag,
          "timeStamp": "2023-08-08T06:06:11.091Z",
          "__v": 0
        }
        setNotes(notes.concat(note))
      }

      //delete a note
const deleteNote = (id)=>{
  console.log("Deleting the note with id"+ id)
  const newNotes = notes.filter((note)=>{return note._id !== id})  
  setNotes(newNotes)  
}

      //edit
      const editNote = ()=>{
        
      }

    return (
        <NoteContext.Provider value={{notes, addNote, deleteNote, editNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState;