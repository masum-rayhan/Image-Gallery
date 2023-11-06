import React, { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquare, faCheckSquare } from "@fortawesome/free-solid-svg-icons";

export const DraggableImage = ({
  id,
  src,
  index,
  isSelected, 
  onClick
}) => {

  // Using the `useSortable` hook to enable drag-and-drop functionality
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id,
      // selected: isSelected,
    });

    // Applying styles to the image container based on drag-and-drop transformations
  const style = {
    transition,
    transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : "",
  };

  // Function to handle image clicks and pass the image ID to the parent component
  const handleImageClick = () => {
    console.log('Image clicked with a single click');
    onClick(id);
  };

  return (
    <>
        <div
          ref={setNodeRef} // Reference for the draggable image element
          style={style}
          {...attributes} // Drag-and-drop attributes
          {...listeners} // Drag-and-drop event listeners
          className={`image-container ${index === 0 ? "featured-image" : ""} ${
            isSelected ? "selected" : ""
          }`}
          onClick={handleImageClick}
        >
          <div className="image-content">
            <img src={src} alt={`${id}`} className="image" />
            <div className="selection-overlay">
              <FontAwesomeIcon
                icon={isSelected ? faCheckSquare : faSquare}
                className={`selection-box ${isSelected ? "selected" : ""}`}
              />
            </div>
          </div>
      </div>
    </>
  );
};
