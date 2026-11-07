const Note = require("../models/Note");
const AppError = require("../utils/AppError");

const ALLOWED_FIELDS = ["title", "content", "tags", "isPinned"];

exports.createNote = async (req, res) => {
    const { title, content, tags, isPinned } = req.body;
    const note = await Note.create({ title, content, tags, isPinned, owner: req.user._id});
    res.status(201).json({status: "success", data: { note }});
};

exports.getNotes = async (req, res) => {
    const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 10, 1), 50);
    const skip = (page - 1) * limit;

    const filter = { owner: req.user._id};

    if (req.query.tag) filter.tags = String(req.query.tag).toLowerCase();
    if (req.query.pinned !== undefined) filter.isPinned = req.query.pinned === "true";
    if(req.query.search) filter.$text = { $search: String(req.query.search)};

    const [notes, total] = await Promise.all([
        Note.find(filter).sort({ isPinned: -1, createdAt: -1}).skip(skip).limit(limit),
        Note.countDocuments(filter)
    ]);

    res.status(200).json({
        status: "success",
        results: notes.length,
        pagination: { page, limit, totalPages: Math.ceil(total/limit)},
        data: { notes }
    });
};

exports.getNote = async (req, res) => {
    const note = await Note.findOne({ _id: req.params.id, owner: req.user._id});
    if (!note) throw new AppError("No note found with that ID", 404);
    res.status(200).json({ status: "success", data: {note}});
};

exports.updateNote = async(req, res) => {
    const body = req.body ?? {};
    const updates = {};
    ALLOWED_FIELDS.forEach((field) => {
        if(body[field] !== undefined) updates[field] = body[field];
    });

    if (Object.keys(updates).length === 0){
        throw new AppError("Provide at least one field to update", 400);
    }

    const note = await Note.findByIdAndUpdate(
        {_id: req.params.id, owner: req.user._id},
        updates,
        {new: true, runValidators: true}
    );

    if (!note) throw new AppError("No note found with that ID", 404);
    res.status(200).json({status: "success", data: { note }});
};

exports.deleteNote = async (req, res) => {
    const note = await Note.findOneAndDelete({
        _id: req.params.id,
        owner: req.user._id
    });
    if (!note) throw new AppError("No note found with that ID", 404);
    res.status(204).send();
};