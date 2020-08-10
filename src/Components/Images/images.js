import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row } from "react-bootstrap";
import SingleImage from "./image";
import update from "immutability-helper";
import "./images.css";

const Images = ({ imgData }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    let temp = [];
    imgData.forEach((item) => {
      item.images.forEach((image) => {
        let t = {
          key: image.text,
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
    <SingleImage image={img} moveImage={moveImage} index={index} />
  ));

  return (
    <Container className="p-5 elements selecto-area">
      <Row>
        {imgList}
      </Row>
    </Container>
  );
};



export default Images;
