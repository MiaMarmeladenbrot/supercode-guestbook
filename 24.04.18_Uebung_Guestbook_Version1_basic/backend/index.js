import express from "express";
import cors from "cors";
import multer from "multer";
import { readEntries, writeEntries } from "./filesystem.js";

// create server
const app = express();

// cors middleware
app.use(cors());

// logging middleware
app.use((req, _, next) => {
  console.log("new request:", req.method, req.url);
  next();
});

// uploading middleware
app.use(express.static("uploads"));

// body parser middleware
app.use(express.json());

// * Endpoints
// GET all
// GET /api/v1/entries/
app.get("/api/v1/entries", (_, res) => {
  readEntries()
    .then((entries) => res.status(200).json(entries))
    .catch((err) =>
      res.status(500).json({ err, message: "Could not read all entries" })
    );
});

// //# UPLOAD
// // POST one file
// const upload = multer({ dest: "./uploads" });
// app.post("/api/v1/files/upload", upload.single("profileImg"), (req, res) => {
//   res.json({ fileName: req.file.filename });
// });

// POST one
// POST /api/v1/entries/
app.post("/api/v1/entries", (req, res) => {
  const newEntry = {
    id: Date.now(),
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    message: req.body.message,
    profileImg: req.body.profileImg,
  };

  readEntries()
    .then((entries) => [...entries, newEntry])
    .then((updatedEntries) => writeEntries(updatedEntries))
    .then((updatedEntries) => res.status(200).json(updatedEntries))
    .catch((err) =>
      res.status(500).json({ err, message: "Could not post new entry" })
    );
});

// port & port listener
const PORT = 4004;
app.listen(PORT, () => console.log("Server ready at port", PORT));
