import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row } from "react-bootstrap";
import SingleImageTile from "./ImageTile";
import update from "immutability-helper";

const ImagesGrid = ( { imageObjectArray } ) => {
  const [imagesArray, setImagesArray] = useState([]);

  useEffect(() => {
    let tempImageArray = imageObjectArray.map((singleImageObject) => {
      return {
        key: singleImageObject.key,
        images: singleImageObject.images,
        description: singleImageObject.description
      };
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
    <SingleImageTile key = { index } image = { image } moveImage = { moveImage } index = { index } />
  ));

  return (
    <Container className="pl-5 pr-5 pt-4 pb-4">
      <Row xs={1} md={3} lg={4}>
        { imageGrid }
      </Row>
    </Container>
  );
};

export default ImagesGrid;
