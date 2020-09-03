import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import UploadForm from "./UploadImageForm";
import ImageGallery from "./ImageGallery";

const App = () => {
  const [imageObjectArray, setImageObjectArray] = useState([]);

  const uploadImageSet = (uploadedImages, description) => {
    uploadedImages.map((singleUploadedImage) => {
      let newImageObject = {
        key: singleUploadedImage.key,
        images: singleUploadedImage.preview,
        description: description,
      };
    setImageObjectArray((tempImageObjectArray) => tempImageObjectArray.concat(newImageObject));
    });
  };

  return (
    <div>
      <UploadForm onSubmit = { uploadImageSet } />
      <DndProvider backend = { HTML5Backend } >
        <ImageGallery imageObjectArray = { imageObjectArray } />
      </DndProvider>
    </div>
  );
};

export default App;
