const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/contact", (req, res) => {
    const { Name, email, Message } = req.body;

    const data = `Name: ${Name}\nEmail: ${email}\nMessage: ${Message}\n-------------------\n`;

    fs.appendFile("contacts.txt", data, (err) => {
        if (err) {
            console.error("Failed to save message.");
            return res.status(500).send("Error saving message.");
        }
        res.send("Message received!");
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
