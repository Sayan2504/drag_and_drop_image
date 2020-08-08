import React, { useEffect, useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Card, Image } from "react-bootstrap";
import Selecto from "react-selecto";
import Moveable from "react-moveable";
import "./images.css";

const Images = ({ imgData }) => {
  const [images, setImages] = useState([]);
  const [targets, setTargets] = useState([]);
  const [frameMap] = useState(() => new Map());
  const moveableRef = useRef(null);
  const selectoRef = useRef(null);

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

  useEffect(() => {
    console.log(images);
  }, [images]);

  const imgList = images.map((image) => (
    <Col sm={3} className="mt-3 imageCube">
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
    </Col>
  ));

  return (
    <Container className="p-5 elements selecto-area">
      <Row>
        <Moveable
          ref={moveableRef}
          draggable={true}
          target={targets}
          origin={false}
          onClickGroup={(e) => {
            selectoRef.current.clickTarget(e.inputEvent, e.inputTarget);
          }}

          onDragStart={(e) => {
            const target = e.target;
            if (!frameMap.has(target)) {
              frameMap.set(target, {
                translate: [0, 0],
              });
            }
            const frame = frameMap.get(target);
            e.set(frame.translate);
          }}

          onDrag={(e) => {
            const target = e.target;
            const frame = frameMap.get(target);
            frame.translate = e.beforeTranslate;
            target.style.transform = `translate(${frame.translate[0]}px, ${frame.translate[1]}px)`;
          }}

          onDragGroupStart={(e) => {
            e.events.forEach((ev) => {
              const target = ev.target;
              if (!frameMap.has(target)) {
                frameMap.set(target, {
                  translate: [0, 0],
                });
              }
              const frame = frameMap.get(target);
              ev.set(frame.translate);
            });
          }}

          onDragGroup={(e) => {
            e.events.forEach((ev) => {
              const target = ev.target;
              const frame = frameMap.get(target);
              frame.translate = ev.beforeTranslate;
              target.style.transform = `translate(${frame.translate[0]}px, ${frame.translate[1]}px)`;
            });
          }}

          onDragEnd={({ target, isDrag, clientX, clientY }) => {
            console.log("onDragEnd", target, isDrag);
          }}

        ></Moveable>
        <Selecto
          ref={selectoRef}
          dragContainer={".elements"}
          selectableTargets={[".selecto-area .imageCube"]}
          hitRate={90}
          selectByClick={true}
          selectFromInside={true}
          toggleContinueSelect={["shift"]}
          onDragStart={(e) => {
            const moveable = moveableRef.current;
            const target = e.inputEvent.target;
            if (
              moveable.isMoveableElement(target) ||
              targets.some((t) => t === target || t.contains(target))
            ) {
              e.stop();
            }
          }}
          onSelectEnd={(e) => {
            const moveable = moveableRef.current;
            setTargets(e.selected);

            if (e.isDragStart) {
              e.inputEvent.preventDefault();

              setTimeout(() => {
                moveable.dragStart(e.inputEvent);
              });
            }
          }}

        ></Selecto>
        {imgList}
      </Row>
    </Container>
  );
};



export default Images;
