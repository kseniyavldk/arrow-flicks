// RatingPopup.tsx
import React from "react";

interface RatingPopupProps {
  movieId: number;
  onClose: () => void;
}

const RatingPopup: React.FC<RatingPopupProps> = ({ movieId, onClose }) => {
  // Implement your rating functionality here
  return (
    <div>
      <h2>Rate this movie</h2>
      {/* Add your rating inputs and submit button */}
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default RatingPopup;
