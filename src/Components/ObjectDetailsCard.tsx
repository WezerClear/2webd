import React from "react";

interface ObjectDetailCardProps {
  objectDetails: {
    title: string;
    primaryImage: string;
    artist: string;
    objectDate: string;
    description: string;
    objectURL: string;
  };
}

const ObjectDetailCard: React.FC<ObjectDetailCardProps> = ({ objectDetails }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const backgroundColor = isHovered ? "#f0f0f0" : "#ffffff";

  return (
    <div
      style={{ backgroundColor }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="ObjectDetailCard"
    >
      <h2 className="Object-title">{objectDetails.title}</h2>
      <img
        src={objectDetails.primaryImage}
        alt={objectDetails.title}
        className="object-image"
      />
      <div className="object-info">
        <p><strong>Artist:</strong> {objectDetails.artist}</p>
        <p><strong>Date:</strong> {objectDetails.objectDate}</p>
        <p><strong>Description:</strong> {objectDetails.description}</p>
        <a href={objectDetails.objectURL} target="_blank" rel="noopener noreferrer">More Info</a>
      </div>
    </div>
  );
};

export default ObjectDetailCard;
