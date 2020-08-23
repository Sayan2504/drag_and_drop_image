import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { Col, Card, Image } from "react-bootstrap";

const type = "Image";

const SingleImage = ( { image, moveImage, index } ) => {
  const ref = useRef(null);

  const [{ isDragging }, drag] = useDrag({
    item: { type, id: image.id, index },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });

  const [, drop] = useDrop({
    accept: type,
    hover(item) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }
      moveImage(dragIndex, hoverIndex);
      item.index = hoverIndex;
    }
  });

  drag(drop(ref));

  return(
    <Col className="mt-3">
      <div className="hvrbox" ref = { ref } style= { { opacity: isDragging ? 0 : 1  } }>
        <Image src={image.photo.preview} alt="" fluid/>
        <div className="hvrbox-layer_top hvrbox-layer_scale">
          <div className="hvrbox-text">
            {image.description ? image.description : image.photo.text}
          </div>
        </div>
      </div>
    </Col>
  );
};

export default SingleImage;
