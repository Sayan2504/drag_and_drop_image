import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
//import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Card, Image } from "react-bootstrap";

const type = "Image";

const SingleImage = ( { image, moveImage, index, selectoref } ) => {
  
  const ref = useRef(null);
  
  const [{ isDragging }, drag] = useDrag({
    //selectoref,
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
  console.log(ref);
  
  return(
    <Col sm={3} className="mt-3">
      <div className="hvrbox imageCube" ref={ref} style={{ opacity: isDragging ? 0.7 : 1 }}>
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
  );
}; 

export default SingleImage;