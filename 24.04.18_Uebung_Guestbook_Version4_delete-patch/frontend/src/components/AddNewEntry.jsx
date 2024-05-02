import { useState } from "react";
import "./AddNewEntry.css";

const AddNewEntry = ({ setEntries }) => {
  // state for name input
  const [name, setName] = useState("");
  // state for surname input
  const [surname, setSurname] = useState("");
  // state for email input
  const [email, setEmail] = useState("");
  // state for message input
  const [message, setMessage] = useState("");
  // state for uploading profile img
  const [profileImg, setProfileImg] = useState();
  // state for validation error or empty input
  const [error, setError] = useState([]);

  const addNewEntry = (e) => {
    e.preventDefault();

    // error handling: empty inputs
    if (!name || !surname || !email || !message || !profileImg) {
      return setError("Please fill all inputs");
      // return window.alert("Please fill all inputs");
    }

    // Image-Datei zu Formular hinzufügen
    const formData = new FormData();
    formData.append("profileImg", profileImg, profileImg.name);
    console.log(profileImg);

    // POST one / Upload file
    fetch("http://localhost:4004/api/v1/files/upload", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const newEntry = {
          name,
          surname,
          email,
          message,
          profileImg: data.fileName,
        };
        return newEntry;
      })
      .then((newEntry) =>
        // POST one / new entry
        fetch("http://localhost:4004/api/v1/entries", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newEntry),
        })
      )
      .then((res) => res.json())
      .then((data) => {
        // error handling: non valid data
        if (data.message === "Please use valid data") {
          console.log(data);
          return setError(data);
        }
        setEntries(data);
        setName("");
        setSurname("");
        setEmail("");
        setMessage("");
      })
      .catch((err) => console.log(err));

    setError([]);
  };

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

      <input type="file" onChange={(e) => setProfileImg(e.target.files[0])} />

      <input
        type="text"
        placeholder="Your message"
        onChange={(e) => setMessage(e.target.value)}
        value={message}
      />

      <button onClick={addNewEntry}>Send</button>

      {/* error message for empty inputs */}
      {error?.length > 0 ? <p>{error}</p> : ""}

      {/* error message for invalid data */}
      {/* {error.errors?.length > 0 ? <p>{error.message}</p> : ""} */}
      {error.errors?.length > 0
        ? error.errors?.map((err, index) => (
            <p key={index}>
              Error: {err.msg} for {err.path}
            </p>
          ))
        : ""}
    </form>
  );
};

export default AddNewEntry;
