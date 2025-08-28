import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    note_title: {
        type: String,
        required: true,
        trim: true,
    },
    course_title: {
        type: String,
        required: true,
        trim: true,
    },
    course_id: {
        type: String,
        required: true,
        trim: true,
    },
    semistar: {
        type: Number,
        required: true,
        trim: true,
    },
    desc: {
        type: String,
        required: true,
        trim: true,
    },
    img_url: {
        type: String,
        required: true,
        trim: true,
    },
    file_url: {
        type: String, // store download link for paid users
        required: false,
        trim: true,
    }

});
export default mongoose.models.Notes || mongoose.model('Notes', noteSchema);