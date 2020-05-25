import React, { useState, useEffect } from "react";
import "./App.css";
import { DndProvider } from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import UploadForm from "./upload";
import Images from "./images";
import update from "immutability-helper";

const App = () => {
  const [data, setData] = useState([]);

  const addImages = (images, description) => {
    let t = {
      images: images,
      description: description,
    };
    setData((data) => data.concat(t));
  };

  const moveImage = (dragIndex, hoverIndex) => {
    // Get the dragged element
    const draggedImage = data[dragIndex];
    console.log(data[dragIndex]);
    /*
      - copy the dragged image before hovered element (i.e., [hoverIndex, 0, draggedImage])
      - remove the previous reference of dragged element (i.e., [dragIndex, 1])
      - here we are using this update helper method from immutability-helper package
    */
    setData(
      update(data, {
        $splice: [[dragIndex, 1], [hoverIndex, 0, draggedImage]]
      })
    );
  };

  useEffect(() => {
    console.log("useState", data);
  }, [data]);

  return (
    <div>
      <UploadForm onSubmit={addImages} />
      <DndProvider backend={HTML5Backend}>
        <Images imgData={data} moveImage={moveImage} />
      </DndProvider>  
    </div>
  );
};

export default App;