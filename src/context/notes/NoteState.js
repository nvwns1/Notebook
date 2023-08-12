import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const initialNotes = [];
  const [notes, setNotes] = useState(initialNotes);

  //GET ALL NOTES
  const getNotes = async () => {
    try{
      const response = await fetch(`${host}/api/notes/fetchAllnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRkMGUyZDJkMDcwMDYwMzk1NTM5ODEyIn0sImlhdCI6MTY5MTgyNTgzNn0.ZMxMr3av5a0sUn7Ot-hZ9lJaplXRyZRQ6odqr2-NADg",
        },
      });
       //Check if the response indicates an error
       if (!response.ok) {
        throw new Error("Delete request Failed");
      }
      const json = await response.json();
      setNotes(json);
    }catch(error){
      //handles errors that may occur during the API call or response processing
      console.log("An error occured:", error);
    }
    
  };

  //ADD a NOTE
  const addNote = async (title, description, tag) => {
    try {
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-Token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRkMGUyZDJkMDcwMDYwMzk1NTM5ODEyIn0sImlhdCI6MTY5MTgzODgxNn0.yr-YZzMrDXEhvbtDycV03sH1jmqtVlCI2_nVdsmn9xE",
        },
        body: JSON.stringify({ title, description, tag }),
      });

      const note = await response.json();
      setNotes(notes.concat(note));
    } catch (error) {
      //handles errors that may occur during the API call or response processing
      console.log("An error occured:", error);
    }
  };

  //EDIT NOTE PART
  const editNote = async (id, title, description, tag) => {
    //API CALL: Send a POST request to the server to edit the note with the given ID
    try {
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRkMGUyZDJkMDcwMDYwMzk1NTM5ODEyIn0sImlhdCI6MTY5MTgyNTgzNn0.ZMxMr3av5a0sUn7Ot-hZ9lJaplXRyZRQ6odqr2-NADg",
        },
        body: JSON.stringify({ title, description, tag }),
      });
      //Check if the response indicates an error
      if (!response.ok) {
        throw new Error("Delete request Failed");
      }

      let newNotes = JSON.parse(JSON.stringify(notes));
      //logic to edit in client side
      for (let index = 0; index < newNotes.length; index++) {
        const element = newNotes[index];
        if (element._id === id) {
          newNotes[index].title = title;
          newNotes[index].description = description;
          newNotes[index].tag = tag;
          break;
        }
      }
      setNotes(newNotes);
    } catch (error) {
      //handles errors that may occur during the API call or response processing
      console.log("An error occured:", error);
    }
  };

  //DELETE a note
  const deleteNote = async (id) => {
    try {
      //API CALL: Send a DELETE request to the server to delete the note with the given ID
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRkMGUyZDJkMDcwMDYwMzk1NTM5ODEyIn0sImlhdCI6MTY5MTgyNTgzNn0.ZMxMr3av5a0sUn7Ot-hZ9lJaplXRyZRQ6odqr2-NADg",
        },
      });

      //Check if the response indicates an error
      if (!response.ok) {
        throw new Error("Delete request Failed");
      }

      //Update the notes array after successfully deleting the note
      const newNotes = notes.filter((note) => {
        //filter out the note with matching ID that was just Deleted
        return note._id !== id;
      });

      //update the state with the updated notes array
      setNotes(newNotes);
    } catch (error) {
      //handles errors that may occur during the API call or response processing
      console.log("An error occured:", error);
    }
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
