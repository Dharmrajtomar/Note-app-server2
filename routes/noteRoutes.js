// routes/noteRoutes.js
const express = require("express");
const {
  getNotes,
  createNote,
  deleteNote,
} = require("../controllers/noteController");
const auth = require("../middleware/auth");
const router = express.Router();

// Protected Routes
router.get("/", auth, getNotes);
router.post("/", auth, createNote);
router.delete("/:id", auth, deleteNote);

module.exports = router;
