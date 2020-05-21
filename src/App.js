import React, { useState, useEffect } from "react";
import "./App.css";
import UploadForm from "./upload";
import Images from "./images";

const App = () => {
  const[description, setDescription] = useState("")
  const[image, setImage] = useState([])

  const addImages = (images, description) =>{
    setImage(prev => prev.concat({preview: images.preview, name: images.text}));
    setDescription(prev => prev.concat({description: description}));  
  }

  useEffect(() => {
    console.log("useState", image);
  }, [image]);
  
  return (
    <div>
      <UploadForm onSubmit={addImages}/> 
      <Images image={image} description={description}/>
    </div>       
  );
}

export default App;
