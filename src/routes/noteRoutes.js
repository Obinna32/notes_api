const express = require("express");
const { protect } = require("../middleware/auth");
const { createNote, getNotes, getNote, updateNote, deleteNote } = require("../controllers/noteController");
const { validate, createNoteRules, updateNoteRules } = require("../middleware/validators");
const router = express.Router();

router.use(protect);

router.route("/").post(createNoteRules, validate,createNote).get(getNotes);

router.route("/:id").get(getNote).patch(updateNoteRules, validate, updateNote).delete(deleteNote);

module.exports = router;