require('dotenv').config();
const express = require("express");

const cors = require("cors"); 
//package for communication between frontennd and backend if they are hosted on different addresses and are different websites

const fs = require("fs");   
//filesystem .... lets my javascript to work with files...creating, reading, deleting and updating files....my file in this case is database.json

const path = require("path");  
//the deal with this path thing is that if i move the project to a different folder, or pc that may or may not have a different OS, the hardcoded file path will no longer work and it will have a different path each time. but in path.join(__dirname, "database.json"), the __dirname always points to the folder where the file "database.JSON" is located. path.join() is a built-in function that joins the folder path with the file name to create a full path to the file.
 
const app = express(); // app stands for the "express application" that we're creating. so for example, app.get() means " my application, when someone wants something from me, do this...", app.listen() means "my application, when someone wants to talk to me, listen on this port for them to talk to me...". so app is like the main object that represents our backend server and we use it to define how our server behaves and responds to requests from clients. app is like an object representing my server.
const PORT = process.env.PORT || 3000;
const DB_PATH = path.join(__dirname, "database.json"); //_dirname means the folder where this file, in this case(database.JSON), is located. here the _dirname is the backend folder. so now, DP_PATH == backend/database.JSON




// ---------- Middleware ----------
//middleware is like a security system before an airport. it runs before my routes and checks if the requests are valid and allowed to access the routes. if they are valid, it lets them through to the routes. if not, it blocks them and sends an error response back to the client. so middleware is like a security system that checks requests before they reach the routes. 
//it read JSON, allow CORS, check authentication and log requests.

app.use(cors());  //allow other websites to communicate with this backend server. in this case, the frontend is hosted on a different address than the backend. so we need to allow communication between them. if they were hosted on the same address, we wouldn't need this.
app.use(express.json()); //the purpose of this command is to tell express to take JSON text formated files and understand and parse them into javascript objects. this is important because the frontend will send data to the backend in JSON format, and we need to be able to read that data as a javascript object in order to work with it. without this command, the backend would not understand the JSON data sent from the frontend and would not be able to process it correctly.
app.use(express.static(path.join(__dirname, "public"))); //look for static files like html, css files in the folder, "public"




// ---------- Helpers ----------
function readDatabase() {
    const raw = fs.readFileSync(DB_PATH, "utf-8");  //here, raw stores the text content of the database found by the address of DB_PATH and reads it as text. JSON is text format. readFileSync means read the file and return the content.
    return JSON.parse(raw);  //by parsing, we change the text into an object that we can work with in javascript. JSON.parse is a built-in function that converts JSON text into a javascript object.
}

function writeDatabase(data) {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 4), "utf-8"); //writeFileSync means write the given data into the file found by the address of DB_PATH. JSON.stringify is a built-in function that converts a javascript object into JSON text. the null and 4 are for formatting the JSON text with indentation for better readability.
}



// ---------- Routes ----------      
//Route means a path + an HTTP method    e.g GET /profile means when someone sends a GET request to the path /profile, do this...  e.g PATCH /profile means when someone sends a PATCH request to the path /profile, do this...

// GET /profile -> returns the current profile object

//when a browser opens, it sends a GET request to the server to get the profile data.
app.get("/profile", (req, res) => { 
    try {
        const db = readDatabase();
        res.json(db.profile);
    } catch (err) {
        console.error("Error reading profile:", err);
        res.status(500).json({ error: "Failed to read profile data." });
    }
});

// PATCH /profile -> updates any subset of {name, bio, coursework}
app.patch("/profile", (req, res) => {
    try {
        const db = readDatabase();
        const { name, bio, coursework } = req.body;

        //It's like writing:-
        // name = req.body.name;
        // bio = req.body.bio;
        // coursework = req.body.coursework;  

        if (typeof name === "string") db.profile.name = name;
        if (typeof bio === "string") db.profile.bio = bio;
        if (typeof coursework === "string") db.profile.coursework = coursework;

        writeDatabase(db);
        res.json(db.profile);
    } catch (err) {
        console.error("Error updating profile:", err);
        res.status(500).json({ error: "Failed to update profile data." });
    }
});

// ---------- Start server ----------
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Portfolio:   http://localhost:${PORT}/index.html`);
    console.log(`Admin page:  http://localhost:${PORT}/admin.html`);
});
