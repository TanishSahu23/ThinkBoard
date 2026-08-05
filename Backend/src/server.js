import express, { json, urlencoded } from "express" 
import dotenv from "dotenv"
import cors from "cors"
import path from "path"

import { connectDB } from "./config/db.js";
import notesRoutes from "./Routes/notesRoutes.js"
import rateLimiter from "./middleware/rateLimiter.js";
dotenv.config();

console.log(process.env.PORT);
console.log(process.env.MONGO_URL);

const app = express();
const PORT = process.env.PORT || 8080;
const __dirname = path.resolve()


//Middleware
if(process.env.NODE_ENV !== "production") {
    app.use(
        cors({
            origin: "http://localhost:5173"
    }))  //The cors middle ware must be before because we are sending response in rate limiting so we need cors in it
}


    app.use(express.json());
app.use(rateLimiter)


// Simple custom middleware
// app.use((req,res,next) =>  {
    //     console.log(`Req method is ${req.method} & Req url is ${req.url}`);
    //     next();
    // })

    
    
app.use("/api/notes", notesRoutes);

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname,"../Frontend/dist")))
    
    app.get("*",(req,res) => {
        res.sendFile(path.join(__dirname,"../Frontend","dist","index.html"))
    })    
}
connectDB().then(() => { // We are first connecting to database then only starting the app
    app.listen(PORT, () => {
        console.log("Server started on port:",PORT)
    });
});

