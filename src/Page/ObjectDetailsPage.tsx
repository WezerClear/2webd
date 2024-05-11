// ObjectDetailsPage.tsx

import React, { useEffect, useState } from 'react';

interface ObjectDetailsPageProps {
  objectId: string;
}

const ObjectDetailsPage: React.FC<ObjectDetailsPageProps> = ({ objectId }) => {
  const [objectDetails, setObjectDetails] = useState<any>(null);

  useEffect(() => {
    // Récupérer les détails de l'objet avec l'ID spécifié
    const fetchObjectDetails = async () => {
      try {
        const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectId}`);
        const data = await response.json();
        setObjectDetails(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des détails de l\'objet :', error);
      }
    };

    fetchObjectDetails();
  }, [objectId]);

  if (!objectDetails) {
    return <div>Chargement...</div>;
  }

  return (
    <div>
      <h1>{objectDetails.title}</h1>
      <p>Description : {objectDetails.description}</p>
      {/* Afficher d'autres détails de l'objet si nécessaire */}
    </div>
  );
};

export default ObjectDetailsPage;
