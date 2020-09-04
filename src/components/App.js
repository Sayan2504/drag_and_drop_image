import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import UploadForm from "./UploadImageForm";
import ImagesGrid from "./ImagesGrid";

const App = () => {
  const [imageObjectArray, setImageObjectArray] = useState([]);

  const uploadImageSet = (uploadedImages, description) => {
    let newImageObject = uploadedImages.map((singleUploadedImage) => {
      return {
        key: singleUploadedImage.key,
        images: singleUploadedImage.preview,
        description: description
      }
    } );
    setImageObjectArray((tempImageObjectArray) => tempImageObjectArray.concat(newImageObject));
  };

  return (
    <div>
      <UploadForm onSubmit = { uploadImageSet } />
      <DndProvider backend = { HTML5Backend } >
        <ImagesGrid imageObjectArray = { imageObjectArray } />
      </DndProvider>
    </div>
  );
};

export default App;
