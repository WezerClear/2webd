import React, { useEffect, useState } from "react";
import "../App.css";

interface ArtObject {
  objectID: number;
  title: string;
  primaryImage: string;
}

const DisplayHighlight: React.FC = () => {
  const [artObjects, setArtObjects] = useState<ArtObject[]>([]);

  useEffect(() => {
    const fetchArtObjects = async () => {
      try {
        const objectIDs = [100, 200, 300, 400, 500];

        const objectsData: ArtObject[] = [];
        for (const id of objectIDs) {
          const objectResponse = await fetch(
            `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
          );
          if (!objectResponse.ok) {
            throw new Error("Failed to fetch object");
          }
          const objectData = await objectResponse.json();
          objectsData.push({
            objectID: objectData.objectID,
            title: objectData.title,
            primaryImage: objectData.primaryImage,
          });
        }
        setArtObjects(objectsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchArtObjects();
  }, []);

  return (
    <div className="App">
      <h1>Metropolitan Museum of Art</h1>
      <div className="art-list">
        {artObjects.map((artObject) => (
          <div key={artObject.objectID} className="art-item">
            <h3>{artObject.title}</h3>
            <img src={artObject.primaryImage} alt={artObject.title} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayHighlight;
