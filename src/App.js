import React, { useState, useEffect } from "react";
import "./App.css";
import { DndProvider } from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import UploadForm from "./upload";
import Images from "./images";

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
      <DndProvider backend={HTML5Backend}>
        <Images imgData={data}/>
      </DndProvider>  
    </div>
  );
};

export default App;