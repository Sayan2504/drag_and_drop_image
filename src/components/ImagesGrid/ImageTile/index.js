import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { Col, Image } from "react-bootstrap";
import "./styles.css";

const type = "Image";

const SingleImageTile = ( { image, moveImage, index } ) => {
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
    <Col className="pl-1 pr-1 pt-2 tile-view" ref = { imageRef } style= { { opacity: isDragging ? 0.5 : 1  } } >
      <Image src={image.images} alt="" fluid className="tile-view__image"/>
      <div className="tile-view__description">
        <div className="tile-view__description-text">
          { image.description ? image.description : image.key }
        </div>
      </div>
    </Col>
  );
};

export default SingleImageTile;
