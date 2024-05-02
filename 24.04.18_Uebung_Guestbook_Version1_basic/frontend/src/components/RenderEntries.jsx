import "./RenderEntries.css";

const RenderEntries = ({ entries }) => {
  return (
    <section className="render-entries">
      {entries?.map((singleEntry, index) => (
        <div key={index}>
          <h3>{singleEntry.name}</h3>

          <a href={`mailto:${singleEntry.email}`}>
            {" "}
            <p>{singleEntry.email}</p>
          </a>
          <p>says</p>
          <p>{singleEntry.message}</p>
        </div>
      ))}
    </section>
  );
};

export default RenderEntries;
