const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
});

const iDs = new Set();
const users = [];
function generateUniqueObjectId() {
    let id;
    do {
        const timestamp = Math.floor(Date.now() / 1000).toString(16);
        const randomPart = [...Array(16)]
            .map(() => Math.floor(Math.random() * 16).toString(16))
            .join("");
        id = timestamp + randomPart;
    } while (iDs.has(id));
    iDs.add(id);
    return id;
}

function User(username, id) {
    this._id = id;
    this.username = username;
}

function Exercise(username, id, description, date, duration) {
    this.username = username;
    this.description = description;
    this.duration = duration;
    this.date = date;
    this._id = id;
}

function Log() {}

app.post("/api/users", function (req, res) {
    const { username } = req.body;

    try {
        const user = new User(username, generateUniqueObjectId());
        users.push(user);

        console.log(user);
        return res.json({ username: user.username, _id: user._id });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.get("/api/users", function (req, res) {
    return res.json(users);
});

app.post("/api/users/:_id/exercises", function (req, res) {
    const { _id } = req.params;
    const { description, duration, date } = req.body;
});

const listener = app.listen(process.env.PORT || 3000, () => {
    console.log("Your app is listening on port " + listener.address().port);
});
