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
  const handleOnDragEnd = (event) => {
    const { active, over } = event;

    if (active?.id && over?.id && active.id !== over.id) {
      setImages((currentImages) => {
        const oldIndex = currentImages.findIndex(
          (image) => image.id === active.id
        );
        const newIndex = currentImages.findIndex(
          (image) => image.id === over.id
        );
        const updatedImages = arrayMove(currentImages, oldIndex, newIndex);

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
