const mongoose=require("mongoose");

const PaperSchema= new mongoose.Schema({
    paperId: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("Paper", PaperSchema);