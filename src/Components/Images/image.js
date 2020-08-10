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
    <Col sm={3} className="mt-3">
      <div className="hvrbox" ref={ref} style={{ opacity: isDragging ? 0.5 : 1 }}>
        <Card>
          <Card.Header>
            <Image src={image.photo.preview} alt="" width="210" height="150" />
            <div className="mt-1 text-center">
              <strong>{image.photo.text}</strong>
            </div>
          </Card.Header>
        </Card>
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
