import { useState } from "react";
import "./AddNewEntry.css";
import "./EditNewEntry.css";

const EditEntryForm = ({
  toggleEditForm,
  singleEntry,
  setEntries,
  setToggleEditForm,
}) => {
  // inputs enthalten ursprünglichen Wert aus den gefetchten Daten, damit diese Wert gleich in den Input-Feldern angezeigt und geändert werden können
  // state for name input
  const [name, setName] = useState(singleEntry.name);
  // state for surname input
  const [surname, setSurname] = useState(singleEntry.surname);
  // state for email input
  const [email, setEmail] = useState(singleEntry.email);
  // state for message input
  const [message, setMessage] = useState(singleEntry.message);
  // state for uploading profile img
  //   const [profileImg, setProfileImg] = useState();
  // state for validation error or empty input
  const [error, setError] = useState([]);

  // Func to edit a single entry
  const editEntry = (e) => {
    e.preventDefault();

    // error handling: empty inputs (without Profile IMG)
    if (!name || !surname || !email || !message) {
      return setError("Please fill all inputs");
      // return window.alert("Please fill all inputs");
    }

    // # noch implementieren: Bild updated, aber optional
    // Image-Datei zu Formular hinzufügen
    // const formData = new FormData();
    // formData.append("profileImg", profileImg, profileImg.name);
    // console.log(profileImg);

    // POST one / Upload file
    // fetch("http://localhost:4004/api/v1/files/upload", {
    //   method: "POST",
    //   body: formData,
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log(data);
    //     const updatedEntry = {
    //       name,
    //       surname,
    //       email,
    //       message,
    //       profileImg: data.fileName,
    //     };
    //     return updatedEntry;
    //   })
    // .then((updatedEntry) =>

    // Variable, um neue Daten zu speichern
    const updatedEntry = {
      name,
      surname,
      email,
      message,
      //   profileImg: data.fileName,
    };

    // PACTH one
    fetch(`http://localhost:4004/api/v1/entries/${singleEntry.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedEntry),
    })
      .then((res) => res.json())
      .then((data) => {
        // error handling: non valid data
        if (data.message === "Please use valid data") {
          console.log(data);
          return setError(data);
        }
        setEntries(data);
        setToggleEditForm(false);
      })
      .catch((err) => console.log(err));

    setError([]);
  };

  return (
    <form className={toggleEditForm ? "edit-entry show" : "edit-entry hide"}>
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

      <button onClick={editEntry}>Send</button>

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

export default EditEntryForm;
