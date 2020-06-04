import React, { useEffect, useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
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
    //<Image key={img.photo.text} image={img} moveImage={moveImage} index={index} selectoRef={selectoRef}/>
    <div className="col-sm-3 mt-3 imageCube">
      <div className="hvrbox">
        <div className="card">
          <div className="card-header">
            <img src={image.photo.preview} alt="" width="210" height="150"/>
            <div className="mt-1 text-center">
              <strong>{image.photo.text}</strong>
            </div>
          </div>
        </div>
        <div className="hvrbox-layer_top hvrbox-layer_scale">
          <div className="hvrbox-text">
            {image.description ? image.description : image.photo.text}
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
          hitRate={100}
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