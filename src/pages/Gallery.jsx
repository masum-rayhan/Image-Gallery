import React, { useState } from "react";
import { closestCenter, DndContext } from "@dnd-kit/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faImages } from "@fortawesome/free-solid-svg-icons";
import { faSquare, faCheckSquare } from "@fortawesome/free-solid-svg-icons";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { DraggableImage } from "../components/DraggableImage";

export const Gallery = ({
  images,
  setImages,
  selectedImages,
  onImageClick,
}) => {

  // Function to handle the end of a drag and drop operation
  const handleOnDragEnd = (event) => {
    const { active, over } = event;

    if (active?.id && over?.id && active.id !== over.id) {
      setImages((currentImages) => {
        // Find the old and new indexes of the dragged images
        const oldIndex = currentImages.findIndex(
          (image) => image.id === active.id
        );
        const newIndex = currentImages.findIndex(
          (image) => image.id === over.id
        );
        // Rearrange the images array
        const updatedImages = arrayMove(currentImages, oldIndex, newIndex);

        // Update the selected state of images based on selectedImages array
        return updatedImages.map((image, index) => ({
          ...image,
          selected: selectedImages.includes(image.id),
        }));
      });
    }
  };

  return (
    <>
      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleOnDragEnd}
      >
        <SortableContext items={images} strategy={verticalListSortingStrategy}>
          {images.map(({ id, src }, index) => {
            return (
              <DraggableImage
                key={id}
                id={id}
                src={src}
                index={index}
                isSelected={selectedImages.includes(id)}
                onClick={onImageClick}
              />
            );
          })}
        </SortableContext>
      </DndContext>

      <button className="gallery-wrap add-images-button-container">
        <FontAwesomeIcon icon={faImage} className="add-images-icon" />
        <div className="add-images-text">Add Images</div>
      </button>
    </>
  );
};
