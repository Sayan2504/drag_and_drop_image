import React, { useEffect, useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Card, Image } from "react-bootstrap";
import Selecto from "react-selecto";
import Moveable from "react-moveable";
import SingleImage from "./image";
import update from "immutability-helper";
import "./images.css";

const Images = ({ imgData }) => {
  const [images, setImages] = useState([]);
  const [targets, setTargets] = useState([]);
  const [frameMap] = useState(() => new Map());
  const moveableRef = useRef(null);
  const selectoRef = useRef(null);

  /*useEffect(() => {
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
  }, [imgData]);*/

  useEffect(() => {
    createImage(imgData);
  }, [imgData]);

  useEffect(() => {
    console.log(images);
  }, [images]);

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

  const createImage = (imgData) => {
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
  }

  const imgList = images.map((img, index) => (
    /*<Col sm={3} className="mt-3 imageCube">
      <div className="hvrbox">
        <Card>
          <Card.Header>
            <Image src={image.photo.preview} alt="" width="210" height="150"/>
            <p className="mt-2 mb-0 text-center">
              <strong>{image.photo.text}</strong>
            </p>
          </Card.Header>
        </Card>
        <div className="hvrbox-layer_top hvrbox-layer_scale">
          <div className="hvrbox-text">
            {image.description ? image.description : image.photo.text}
          </div>
        </div> 
      </div>
    </Col>*/
    <SingleImage image={img} moveImage={moveImage} index={index} selectoRef={selectoRef} />
  ));

  return (
    <Container className="p-5 elements selecto-area">
      <Selecto
        selectoref={selectoRef}
        dragContainer={".elements"}
        selectableTargets={[".selecto-area .imageCube"]}
        hitRate={90}
        selectByClick={true}
        selectFromInside={false}
        toggleContinueSelect={["shift"]}
        onSelect={(e) => {
          e.added.forEach((el) => {
            el.classList.add("selected");
            createImage(imgData);
          });
          e.removed.forEach((el) => {
            el.classList.remove("selected");
          });
        }}
      />
      <Row>{imgList}</Row>
    </Container>
  );
};



export default Images;