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

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id,
      // selected: isSelected,
    });

  const style = {
    transition,
    transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : "",
  };

  const handleImageClick = () => {
    onClick(id);
  };

  return (
    <>
        <div
          ref={setNodeRef}
          style={style}
          {...attributes}
          {...listeners}
          className={`image-container ${index === 0 ? "featured-image" : ""} ${
            isSelected ? "selected" : ""
          }`}
          onClick={handleImageClick}
        >
          <div>
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
