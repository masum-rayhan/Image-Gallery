import { useState } from "react";
import imageGallery from "./data/imageGallery";
import { Gallery } from "./pages/Gallery";
import "../src/pages/Gallery.css";
import { Header } from "./components/layout/Header";

const App = () => {
  const [images, setImages] = useState(imageGallery);
  const [selectedImages, setSelectedImages] = useState([]);

  const handleImageClick = (id) => {
    setSelectedImages((prevSelectedImages) => {
      if (prevSelectedImages.includes(id)) {
        console.log('Image already selected, removing from selection');
        return prevSelectedImages.filter((imageId) => imageId !== id);
      } else {
        console.log('Image not selected, adding to selection');
        return [...prevSelectedImages, id];
      }
    });
  };

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
