import React, { useState } from 'react';
import { ObjectDetail } from '../Components/Type';
import { useAllObjectsQuery } from '../Query/MuseumObjectQuery';
import "../App.css";


function ArtObjectDetail({ artObject }: { artObject: ObjectDetail }) {
  return (
    <div style={{ marginRight: '20px', marginBottom: '20px' }}>
      <div><h2>{artObject.title}</h2></div>
      <img
        src={artObject.primaryImage}
        alt={artObject.title}
        style={{ width: '200px', height: '200px' }}
      />
      <div>{artObject.artistDisplayName}</div>
      {/* Afficher d'autres détails si nécessaire */}
    </div>
  );
}

export default function AllArtObjectsPage() {
  const { data, isLoading, isError } = useAllObjectsQuery(); // Utiliser la fonction useAllObjectsQuery
  const [currentPage, setCurrentPage] = useState(1);

  if (isLoading) {
    return <div>Chargement en cours...</div>;
  }

  if (isError) {
    return <div>Erreur lors du chargement des objets d'art.</div>;
  }

  const artObjects: ObjectDetail[] = data || [];
  const objectsPerPage = 10;
  const indexOfLastObject = currentPage * objectsPerPage;
  const indexOfFirstObject = indexOfLastObject - objectsPerPage;
  const currentObjects = artObjects.slice(indexOfFirstObject, indexOfLastObject);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      {currentObjects.map((artObject) => (
        <ArtObjectDetail key={artObject.objectID} artObject={artObject} />
      ))}
      <div>
        <button onClick={prevPage} disabled={currentPage === 1}>
          Page précédente
        </button>
        <button onClick={nextPage} disabled={indexOfLastObject >= artObjects.length}>
          Page suivante
        </button>
      </div>
    </div>
  );
}
