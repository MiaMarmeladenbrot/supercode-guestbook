import { useEffect, useState } from "react";
import "./AddNewEntry.css";

const AddNewEntry = ({ entries, setEntries }) => {
  // state for name input
  const [name, setName] = useState("");
  // state for surname input
  const [surname, setSurname] = useState("");
  // state for email input
  const [email, setEmail] = useState("");
  // state for message input
  const [message, setMessage] = useState("");
  // state for uploading profile img
  //   const [profileImg, setProfileImg] = useState();

  // * Version ohne Image Upload - funktioniert!
  const addNewEntry = (e) => {
    e.preventDefault();

    // variable for entry-input-values
    const newEntry = {
      name,
      surname,
      email,
      message,
    };

    // POST one
    fetch("http://localhost:4004/api/v1/entries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEntry),
    })
      .then((res) => res.json())
      .then((data) => {
        setEntries(data);
        setName("");
        setSurname("");
        setEmail("");
        setMessage("");
      })
      .catch((err) => console.log(err));
  };

  // * Version mit Image Upload

  //   const addNewEntry = (e) => {
  //     e.preventDefault();

  //     // falls kein Profilbild vorhanden ist, einfach returnen
  //     if (!profileImg) return;

  //     const formData = new FormData();
  //     formData.append("profileImg", profileImg, profileImg.name);

  //     fetch("/api/v1/files/upload", {
  //       method: "POST",
  //       body: formData,
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         const newEntry = {
  //           name,
  //           surname,
  //           email,
  //           message,
  //           profileImg: data.fileName,
  //         };
  //         return newEntry;
  //       })
  //       .then((newEntry) =>
  //         fetch("http://localhost:4004/api/v1/entries", {
  //           method: "POST",
  //           headers: { "Content-Type": "application/json" },
  //           body: JSON.stringify(newEntry),
  //         })
  //       )
  //       .then((res) => res.json())
  //       .then((data) => setEntries(data))
  //       .catch((err) => console.log(err));

  //     setName("");
  //     setSurname("");
  //     setEmail("");
  //     setMessage("");
  //   };

  return (
    <form>
      <input
        type="text"
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      <input
        type="text"
        placeholder="Surname"
        onChange={(e) => setSurname(e.target.value)}
        value={surname}
      />
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />

      {/* <input type="file" onChange={(e) => setProfileImg(e.target.files[0])} /> */}

      <input
        type="text"
        placeholder="Your message"
        onChange={(e) => setMessage(e.target.value)}
        value={message}
      />

      <button onClick={addNewEntry}>Send</button>
    </form>
  );
};

export default AddNewEntry;
