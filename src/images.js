import React, { useEffect, useState, useRef } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Image from "./image";
import update from "immutability-helper";
import Selecto from "react-selecto";
import Moveable from "react-moveable";

const Images = ({ imgData }) => {
  const [images, setImages] = useState([]);
  const [targets, setTargets] = useState([]);
  // const [frameMap] = useState(() => new Map());
  // const moveableRef = useRef(null);
  // const selectoRef = useRef(null);

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

  useEffect(() => {
    console.log(targets);
  }, [targets]);

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
    <div className="container p-5 elements selecto-area">
      <Selecto
        dragContainer={".elements"}
        selectableTargets={[".selecto-area .imageCube"]}
        hitRate={100}
        selectByClick={true}
        selectFromInside={true}
        toggleContinueSelect={["shift"]}
        onSelect={(e) => {
          e.added.forEach((el) => {
            let t = [];
            t = targets.concat(el);
            setTargets(t);
            el.classList.add("selected");
          });
          e.removed.forEach((el) => {
            el.classList.remove("selected");
          });
        }}
      ></Selecto>
      <div className="row">{imgList}</div>
    </div>
  );
};

export default Images;