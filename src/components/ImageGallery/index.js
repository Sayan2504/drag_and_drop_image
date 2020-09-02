import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row } from "react-bootstrap";
import SingleImage from "./SingleImage";
import update from "immutability-helper";

const Images = ( { imageSet } ) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    let imageList = [];
    imageSet.map((imageObject) => {
      imageObject.images.map((image) => {
        let singleImageObject = {
          key: image.text,
          photo: image,
          description: imageObject.description,
        };
        imageList.push(singleImageObject);
      } );
    } );
    setImages(imageList);
  }, [imageSet]);

  const moveImage = (dragIndex, dropIndex) => {
    const draggedImage = images[dragIndex];
    setImages(
      update(images, {
        $splice: [
          [dragIndex, 1],
          [dropIndex, 0, draggedImage],
        ],
      } )
    );
  };

  const imageGrid = images.map((image, index) => (
    <SingleImage image = { image } moveImage = { moveImage } index= { index } />
  ));

  return (
    <Container className="p-5">
      <Row xs={1} md={3} lg={4}>
        { imageGrid }
      </Row>
    </Container>
  );
};

export default Images;
