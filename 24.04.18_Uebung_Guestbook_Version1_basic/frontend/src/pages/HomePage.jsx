import { useEffect, useState } from "react";
import AddNewEntry from "../components/AddNewEntry";
import RenderEntries from "../components/RenderEntries";
import "./HomePage.css";

const HomePage = () => {
  // state for fetched entries
  const [entries, setEntries] = useState();

  useEffect(() => {
    fetch("http://localhost:4004/api/v1/entries")
      .then((res) => res.json())
      .then((data) => setEntries(data))
      .catch((err) => console.log(err));
  }, []);

  //   console.log(entries);

  return (
    <main>
      <h1>Guestbook</h1>
      <AddNewEntry entries={entries} setEntries={setEntries} />
      <RenderEntries entries={entries} />
    </main>
  );
};

export default HomePage;
