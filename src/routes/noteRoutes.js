const express = require("express");
const { protect } = require("../middleware/auth");
const { createNote, getNotes, getNote } = require("../controllers/noteController");
const { validate, createNoteRules, updateNoteRules } = require("../models/Note");
const router = express.Router();

router.use(protect);

router.route("/").post(createNoteRules, validate,createNote).get(getNotes);

router.route("/:id").get(getNote)