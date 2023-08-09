const express = require("express");
const fetchuser = require("../middleware/fetchUser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");
const router = express.Router();

//ROUTE 1: GET ALL NOTES : GET
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Some error occur");
  }
});

//ROUTE 2: ADD A NOTES : POST
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid name").isLength({ min: 3 }),
    body("description", "Password must be 5 character").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;

      //If there are errors, return bad request and errors
      const errors = validationResult(req);
      if (!errors.isEmpty) {
        return res.status(400).json({ errors: errors.array() });
      }

      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const saveNote = await note.save();

      res.json(saveNote);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Some error occur");
    }
  }
);

//ROUTE 3: UPDATE A NOTES : POST
router.post("/updatenote/:id", fetchuser, async (req, res) => {
    try {
        const {title, description, tag} = req.body;
        
        //create a newNote obj
        const newNote = {};
        if(title){newNote.title = title};
        if(description){newNote.description = description};
        if(tag){newNote.tag = tag};

        //find the note to be updated and update it
        let note =await Notes.findById(req.params.id);
        if(!note){
            return res.status(404).send('Not Found');
        }

        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed");
        }

        //find the note to be updated
         note = await Notes.findByIdAndUpdate(req.params.id,{$set: newNote}, {new:true})
        res.json(note)
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Some error occur");
    }
  });


//ROUTE 4: GET ALL NOTES : DELETE LOGIN REQUIRED
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
      
      //create a newNote obj

      //find the note to be deleted AND delete it
      let note =await Notes.findById(req.params.id);
      if(!note){
          return res.status(404).send('Not Found');
      }

      //allow deletion only uf user own this note
      if(note.user.toString() !== req.user.id){
          return res.status(401).send("Not Allowed");
      }

      //find the note to be updated
       note = await Notes.findByIdAndDelete(req.params.id)
      res.json({"success":"Note has been deleted"})
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Some error occur");
  }
});

module.exports = router;
