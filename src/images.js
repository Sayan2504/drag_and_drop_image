import React, { useEffect, useState } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Image from "./image";
import update from "immutability-helper";

const Images = ({ imgData }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    let temp = [];
    imgData.forEach((item) => {
      item.images.forEach((image) => {
        let t = {
          photo: image,
          description: item.description,
        };
        temp.push(t);
      });
    });

    setImages(temp);
  }, [imgData]);

  const moveImage = (dragIndex, hoverIndex) => {
    const draggedImage = images[dragIndex];

    setImages(
      update(images, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, draggedImage],
        ],
      })
    );
  };

  const imgList = images.map((img, index) => (
    <Image image={img} moveImage={moveImage} index={index} />
  ));

  return (
    <div className="container">
      <div className="row">{imgList}</div>
    </div>
  );
};

export default Images;