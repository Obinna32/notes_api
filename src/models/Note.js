const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true,
        maxlength: [100, "Title cannot exceed 100 characters"]
    },
    content: {
        type: String,
        default: "",
        maxlength: [50000, "Content cannot exceed 50000 characters"],
    },
    tags: [{ type: String, trim: true, lowercase: true}],
    isPinned: { type: Boolean, default: false},
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    }
},
{ timestamps: true}
);

noteSchema.index({ title: "text", content: "text"});

module.exports = mongoose.model("Note", noteSchema);