import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { Col, Image } from "react-bootstrap";
import "./styles.css";

const type = "Image";

const SingleImage = ( { image, moveImage, index } ) => {
  const imageRef = useRef(null);

  const [{ isDragging }, drag] = useDrag({
    item: { type, id: image.id, index },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });

  const [, drop] = useDrop({
    accept: type,
    hover(item) {
      if (!imageRef.current) {
        return;
      }
      const dragIndex = item.index;
      const dropIndex = index;

      if (dragIndex === dropIndex) {
        return;
      }
      moveImage(dragIndex, dropIndex);
      item.index = dropIndex;
    }
  } );

  drag(drop(imageRef));

  return(
    <Col className="pl-1 pr-1 p-2 tile-view">
      <div className="hvrbox" ref = { imageRef } style= { { opacity: isDragging ? 0.5 : 1  } } >
        <Image src={image.images} alt="" className="image-tile" fluid/>
        <div className="hvrbox-layer_top hvrbox-layer_scale">
          <div className="hvrbox-text">
            { image.description ? image.description : image.key }
          </div>
        </div>
      </div>
    </Col>
  );
};

export default SingleImage;
