import React, { useState, useEffect } from "react";
import "./App.css";
import UploadForm from "./Components/Upload/upload";
import Images from "./Components/Images/images";

const App = () => {
  const [data, setData] = useState([]);

  const addImages = (images, description) => {
    let t = {
      images: images,
      description: description,
    };
    setData((data) => data.concat(t));
  };

  useEffect(() => {
    console.log("useState", data);
  }, [data]);

  return (
    <div>
      <UploadForm onSubmit={addImages} />
      <Images imgData={data}/> 
    </div>
  );
};

export default App;