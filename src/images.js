import React, { useEffect, useState, useRef } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
// import Image from "./image";
// import Image2 from "./image2";
import update from "immutability-helper";
import Selecto from "react-selecto";
import Moveable from "react-moveable";

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
    // <Image2
    //   className="imageCube"
    //   image={img}
    //   moveImage={moveImage}
    //   index={index}
    // />
    <div className="col-sm-3 mt-3 imageCube">
      <div className="hvrbox">
        <div className="card">
          <div className="card-header">
            <img src={img.photo.preview} alt="" width="210" height="150" />
            <div className="mt-1 text-center">
              <strong>{img.photo.text}</strong>
            </div>
          </div>
        </div>
        <div className="hvrbox-layer_top hvrbox-layer_scale">
          <div className="hvrbox-text">
            {img.description ? img.description : img.photo.text}
          </div>
        </div>
      </div>
    </div>
  ));

  return (
    <div className="container p-5 elements selecto-area">
      <div className="row">
        <Moveable
          ref={moveableRef}
          draggable={true}
          target={targets}
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
        ></Moveable>
        <Selecto
          ref={selectoRef}
          dragContainer={".elements"}
          selectableTargets={[".selecto-area .imageCube"]}
          hitRate={0}
          selectByClick={true}
          selectFromInside={false}
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
      </div>
    </div>
  );
};

export default Images;