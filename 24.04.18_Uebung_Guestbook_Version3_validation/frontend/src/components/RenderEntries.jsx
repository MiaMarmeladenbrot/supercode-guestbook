import "./RenderEntries.css";

const RenderEntries = ({ entries }) => {
  return (
    <section className="render-entries">
      {entries?.map((singleEntry, index) => (
        <div key={index}>
          <img src={`http://localhost:4004/${singleEntry.profileImg}`} alt="" />
          <article>
            <h3>{singleEntry.name}</h3>
            <a href={`mailto:${singleEntry.email}`}>
              <p>{singleEntry.email}</p>
            </a>
            <p>says:</p>
            <p>"{singleEntry.message}"</p>
          </article>
        </div>
      ))}
    </section>
  );
};

export default RenderEntries;
