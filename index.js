const express = require("express");
const morgan = require("morgan");
require("dotenv").config();
require("./db/db");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

const PORT = process.env.PORT;

app.use(cors());

app.use(morgan("dev"));
app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text()); // This will parse your file
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/api", require("./routes/route"));

app.get("/", (req, res) => res.render("pages/index"));
app.listen(PORT, () => console.log(`Listening on ${PORT}`));

// MONGO_URL=mongodb+srv://nishankadel:nishankadel@cluster0.2gjw7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
