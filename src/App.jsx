import { useState } from "react";
import imageGallery from "./data/imageGallery";
import { Gallery } from "./pages/Gallery";
import "../src/pages/Gallery.css";
import { Header } from "./components/layout/Header";

const App = () => {
  const [images, setImages] = useState(imageGallery); // State for image gallery
  const [selectedImages, setSelectedImages] = useState([]); // State for selected images

  // Function to handle clicking on images to select/deselect them
  const handleImageClick = (id) => {
    setSelectedImages((prevSelectedImages) => {
      if (prevSelectedImages.includes(id)) {
        return prevSelectedImages.filter((imageId) => imageId !== id);
      } else {
        return [...prevSelectedImages, id];
      }
    });
  };

  // Function for handle delete 
  const handleDelete = () => {
    const updatedImages = images.filter(
      (image) => !selectedImages.includes(image.id)
    );
    setImages(updatedImages);
    setSelectedImages([]);
  };

  return (
    <>
      <Header selectedCount={selectedImages.length} onDelete={handleDelete} />
      <div className="gallery-wrap">
        <Gallery
          images={images}
          setImages={setImages}
          selectedImages={selectedImages}
          onImageClick={handleImageClick}
        />
      </div>
    </>
  );
};

export default App;
