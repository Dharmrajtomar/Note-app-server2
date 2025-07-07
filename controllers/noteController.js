const Note = require("../models/Note");

exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Failed to fetch notes" });
  }
};

exports.createNote = async (req, res) => {
  try {
    const { content } = req.body;
    const note = await Note.create({ userId: req.user.id, content });
    res.json(note);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Failed to create note" });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Note.findOneAndDelete({
      _id: id,
      userId: req.user.id,
    });
    if (!deleted) return res.status(404).json({ msg: "Note not found" });
    res.json({ msg: "Note deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Failed to delete note" });
  }
};
