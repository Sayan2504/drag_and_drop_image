import React, { useState, useEffect } from "react";
import "./App.css";
import UploadForm from "./upload";
import Images from "./images";

const App = () => {
  const [data, setData] = useState([]);

  const addImages = (images, description) =>{
    let t = {
      images: images,
      description: description,
    };
    setData(data => data.concat(t));
  }

  useEffect(() => {
    console.log("useState", data);
  }, [data]);

  const imageList = data.map((item) => (
    <Images imgData={item}/>
  ));
  
  return (
    <div>
      <UploadForm onSubmit={addImages} />
      {imageList}
    </div>
  );
}

export default App;
