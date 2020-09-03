import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row } from "react-bootstrap";
import SingleImage from "./SingleImage";
import update from "immutability-helper";

const Images = ( { imageObjectArray } ) => {
  const [imagesArray, setImagesArray] = useState([]);

  useEffect(() => {
    let tempImageArray = [];
    imageObjectArray.map((singleImageObject) => {
      let tempImageObject = {
        key: singleImageObject.key,
        images: singleImageObject.images,
        description: singleImageObject.description,
      };
      tempImageArray.push(tempImageObject);
    } );
    setImagesArray(tempImageArray);
  }, [imageObjectArray]);

  const moveImage = (dragIndex, dropIndex) => {
    const draggedImage = imagesArray[dragIndex];
    setImagesArray(
      update(imagesArray, {
        $splice: [
          [dragIndex, 1],
          [dropIndex, 0, draggedImage],
        ],
      } )
    );
  };

  const imageGrid = imagesArray.map((image, index) => (
    <SingleImage image = { image } moveImage = { moveImage } index = { index } />
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
