import React, { useState, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import UploadForm from "./UploadImageForm";
import ImageGallery from "./ImageGallery";

const App = () => {
  const [imageSet, setImageSet] = useState([]);

  const uploadImageSet = (images, description) => {
    let newImageSet = {
      images: images,
      description: description,
    };
    setImageSet((imageSet) => imageSet.concat(newImageSet));
  };

  return (
    <div>
      <UploadForm onSubmit = { uploadImageSet } />
      <DndProvider backend = { HTML5Backend } >
        <ImageGallery imageSet = { imageSet } />
      </DndProvider>
    </div>
  );
};

export default App;
