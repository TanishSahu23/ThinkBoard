import mongoose, { Mongoose } from 'mongoose'

//1- Create schema
const noteSchema = new mongoose.Schema(
    {
        title: {
            type:String,
            required:true
        },
        content: {
            type:String,
            required:true,
        },
    },
    {timestamps: true} //createdAt,updatedAt
)

const Note = mongoose.model("Note" ,noteSchema);

export default Note;