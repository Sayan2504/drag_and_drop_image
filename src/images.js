import React, { useEffect } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Image from "./image";

const Images = ({ imgData }) => {
  const images = [];

  imgData.forEach((item) => {
    item.images.forEach((image) => {
      let t = {
        photo: image,
        description: item.description,
      };
      images.push(t);
    });
  });

  console.log(images);

  const imgList = images.map((img) => (
    <Image image={img}/>
  ));

  return (
    <div className="container">
      <div className="row">{imgList}</div>
    </div>
  );
};

export default Images;